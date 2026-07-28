---
title: مدیریت استیت
---

<Intro>

با رشد برنامه‌تان، این کمک می‌کند که نسبت به اینکه استیت شما چگونه سازماندهی می‌شود و داده‌ها چگونه بین کامپوننت‌های شما جریان می‌یابند، آگاهانه‌تر برخورد کنید. استیت تکراری یا افزون منبع رایج باگ‌هاست. در این فصل، یاد می‌گیرید چگونه استیت خود را به‌خوبی ساختار دهید، چگونه منطق به‌روزرسانی استیت خود را قابل‌نگه‌داری نگه دارید، و چگونه استیت را بین کامپوننت‌های دوردست به اشتراک بگذارید.

</Intro>

<YouWillLearn isChapter={true}>

* [چگونه تغییرات UI را به‌عنوان تغییرات استیت در نظر بگیرید](/learn/reacting-to-input-with-state)
* [چگونه استیت را به‌خوبی ساختار دهید](/learn/choosing-the-state-structure)
* [چگونه استیت را «بالا ببرید» تا بین کامپوننت‌ها به اشتراک گذاشته شود](/learn/sharing-state-between-components)
* [چگونه کنترل کنید که استیت نگه داشته شود یا ریست شود](/learn/preserving-and-resetting-state)
* [چگونه منطق پیچیدهٔ استیت را در یک تابع تجمیع کنید](/learn/extracting-state-logic-into-a-reducer)
* [چگونه بدون «prop drilling» اطلاعات را منتقل کنید](/learn/passing-data-deeply-with-context)
* [چگونه مدیریت استیت را با رشد برنامه مقیاس‌پذیر کنید](/learn/scaling-up-with-reducer-and-context)

</YouWillLearn>

## واکنش به ورودی با استیت {/*reacting-to-input-with-state*/}

با ری‌اکت، شما UI را از کد به‌طور مستقیم تغییر نمی‌دهید. برای مثال، دستوراتی مانند «دکمه را غیرفعال کن»، «دکمه را فعال کن»، «پیام موفقیت را نشان بده» و غیره نمی‌نویسید. در عوض، UIی که می‌خواهید برای وضعیت‌های بصری متفاوت کامپوننت خود ببینید («initial state»، «typing state»، «success state») را توصیف می‌کنید، و سپس تغییرات استیت را در پاسخ به ورودی کاربر تحریک می‌کنید. این شبیه به این است که طراحان چگونه دربارهٔ UI فکر می‌کنند.

اینجا یک فرم آزمون با استفاده از ری‌اکت ساخته شده است. توجه کنید چگونه از متغیر استیت `status` برای تعیین اینکه آیا دکمهٔ submit را فعال یا غیرفعال کند، و آیا به‌جای آن پیام موفقیت را نشان دهد، استفاده می‌کند.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

```css
.Error { color: red; }
```

</Sandpack>

<LearnMore path="/learn/reacting-to-input-with-state">

**[واکنش به ورودی با استیت](/learn/reacting-to-input-with-state)** را بخوانید تا یاد بگیرید چگونه با ذهنیت مبتنی بر استیت با تعاملات برخورد کنید.

</LearnMore>

## انتخاب ساختار استیت {/*choosing-the-state-structure*/}

ساختاردهی خوب استیت می‌تواند تفاوت بین کامپوننتی که تغییر دادن و دیباگ کردنش لذت‌بخش است، و کامپوننتی که منبع دائمی باگ‌هاست باشد. مهم‌ترین اصل این است که استیت نباید شامل اطلاعات افزون یا تکراری باشد. اگر استیت غیرضروری وجود داشته باشد، به‌راحتی فراموش می‌شود که آن را به‌روزرسانی کنید، و باگ‌ها را معرفی می‌کند!

برای مثال، این فرم یک متغیر استیت `fullName` **افزون** دارد:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

می‌توانید آن را حذف کنید و کد را با محاسبهٔ `fullName` هنگام رندر شدن کامپوننت ساده کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

این ممکن است یک تغییر کوچک به‌نظر برسد، اما بسیاری از باگ‌ها در برنامه‌های ری‌اکت به این روش رفع می‌شوند.

<LearnMore path="/learn/choosing-the-state-structure">

**[انتخاب ساختار استیت](/learn/choosing-the-state-structure)** را بخوانید تا یاد بگیرید چگونه شکل استیت را برای جلوگیری از باگ‌ها طراحی کنید.

</LearnMore>

## اشتراک‌گذاری استیت بین کامپوننت‌ها {/*sharing-state-between-components*/}

گاهی، می‌خواهید استیت دو کامپوننت همیشه با هم تغییر کند. برای این کار، استیت را از هر دو حذف کنید، آن را به نزدیک‌ترین والد مشترکشان منتقل کنید، و سپس آن را از طریق پراپس‌ها به آن‌ها پاس دهید. این «lift state up» (بالا بردن استیت) نامیده می‌شود، و یکی از رایج‌ترین کارهایی است که هنگام نوشتن کد ری‌اکت انجام خواهید داد.

در این مثال، فقط یک پنل باید در هر زمان فعال باشد. برای دستیابی به این، به‌جای نگه‌داشتن استیت فعال درون هر پنل منفرد، کامپوننت والد استیت را نگه می‌دارد و پراپس‌های فرزندانش را مشخص می‌کند.

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/sharing-state-between-components">

**[اشتراک‌گذاری استیت بین کامپوننت‌ها](/learn/sharing-state-between-components)** را بخوانید تا یاد بگیرید چگونه استیت را بالا ببرید و کامپوننت‌ها را هم‌گام نگه دارید.

</LearnMore>

## نگه‌داشتن و ریست کردن استیت {/*preserving-and-resetting-state*/}

وقتی یک کامپوننت را دوباره رندر می‌کنید، ری‌اکت باید تصمیم بگیرد کدام بخش‌های درخت را نگه دارد (و به‌روزرسانی کند)، و کدام را دور بریزد یا از ابتدا دوباره ایجاد کند. در بیشتر موارد، رفتار خودکار ری‌اکت به‌اندازهٔ کافی خوب کار می‌کند. به‌طور پیش‌فرض، ری‌اکت بخش‌هایی از درخت که با درخت کامپوننت قبلاً رندرشده «تطابق» دارند را نگه می‌دارد.

با این حال، گاهی این همان چیزی نیست که می‌خواهید. در این برنامه چت، تایپ یک پیام و سپس تعویض گیرنده، ورودی را ریست نمی‌کند. این می‌تواند باعث شود کاربر به‌اشتباه پیامی را به شخص اشتباهی بفرستد:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

ری‌اکت به شما اجازه می‌دهد رفتار پیش‌فرض را نادیده بگیرید، و یک کامپوننت را *مجبور* کنید استیت خود را با پاس‌دادن یک `key` متفاوت به آن، مانند `<Chat key={email} />` ریست کند. این به ری‌اکت می‌گوید که اگر گیرنده متفاوت است، باید به‌عنوان یک کامپوننت `Chat` *متفاوتی* در نظر گرفته شود که باید از ابتدا با داده‌های جدید (و UIی مانند ورودی‌ها) دوباره ایجاد شود. حالا جابه‌جایی بین گیرنده‌ها فیلد ورودی را ریست می‌کند — حتی اگر همان کامپوننت را رندر کنید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.email} contact={to} />
    </div>
  )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.email}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<LearnMore path="/learn/preserving-and-resetting-state">

**[نگه‌داشتن و ریست کردن استیت](/learn/preserving-and-resetting-state)** را بخوانید تا با طول عمر استیت و نحوهٔ کنترل آن آشنا شوید.

</LearnMore>

## استخراج منطق استیت در یک ردیوسر {/*extracting-state-logic-into-a-reducer*/}

کامپوننت‌هایی با بسیاری از به‌روزرسانی‌های استیت پخش‌شده در بسیاری از مدیرکننده‌های رویداد می‌توانند طاقت‌فرسا شوند. برای این موارد، می‌توانید تمام منطق به‌روزرسانی استیت را خارج از کامپوننت خود در یک تابع منفرد، به‌نام «reducer» (ردیوسر) تجمیع کنید. مدیرکننده‌های رویداد شما موج می‌شوند زیرا فقط «actions» کاربر را مشخص می‌کنند. در انتهای فایل، تابع ردیوسر مشخص می‌کند که استیت باید چگونه در پاسخ به هر اکشن به‌روزرسانی شود!

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        onAddTask(text);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          onChange({
            ...task,
            done: e.target.checked
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<LearnMore path="/learn/extracting-state-logic-into-a-reducer">

**[استخراج منطق استیت در یک ردیوسر](/learn/extracting-state-logic-into-a-reducer)** را بخوانید تا یاد بگیرید چگونه منطق را در تابع ردیوسر تجمیع کنید.

</LearnMore>

## انتقال عمیق داده‌ها با کانتکست {/*passing-data-deeply-with-context*/}

معمولاً، اطلاعات را از یک کامپوننت والد به یک کامپوننت فرزند از طریق پراپس‌ها منتقل می‌کنید. اما پاس‌دادن پراپس‌ها می‌تواند ناراحت‌کننده شود اگر نیاز داشته باشید پراپسی را از بسیاری از کامپوننت‌ها عبور دهید، یا اگر بسیاری از کامپوننت‌ها به همان اطلاعات نیاز داشته باشند. کانتکست به کامپوننت والد اجازه می‌دهد اطلاعاتی را برای هر کامپوننتی در درخت زیر خود — بدون توجه به اینکه چقدر عمیق است — بدون پاس‌دادن صریح از طریق پراپس‌ها در دسترس قرار دهد.

اینجا، کامپوننت `Heading` سطح عنوان خود را با «پرسیدن» از نزدیک‌ترین `Section` برای سطحش تعیین می‌کند. هر `Section` سطح خود را با پرسیدن از `Section` والد و اضافه کردن یک به آن پیگیری می‌کند. هر `Section` اطلاعات را به همهٔ کامپوننت‌های زیر خود بدون پاس‌دادن پراپس‌ها فراهم می‌کند — این کار را از طریق کانتکست انجام می‌دهد.

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<LearnMore path="/learn/passing-data-deeply-with-context">

**[انتقال عمیق داده‌ها با کانتکست](/learn/passing-data-deeply-with-context)** را بخوانید تا دربارهٔ استفاده از کانتکست به‌عنوان جایگزینی برای پاس‌دادن پراپس‌ها یاد بگیرید.

</LearnMore>

## مقیاس‌پذیری با ردیوسر و کانتکست {/*scaling-up-with-reducer-and-context*/}

ردیوسرها به شما اجازه می‌دهند منطق به‌روزرسانی استیت یک کامپوننت را تجمیع کنید. کانتکست به شما اجازه می‌دهد اطلاعات را عمیقاً به کامپوننت‌های دیگر منتقل کنید. می‌توانید ردیوسرها و کانتکست را با هم ترکیب کنید تا استیت یک صفحهٔ پیچیده را مدیریت کنید.

با این رویکرد، یک کامپوننت والد با استیت پیچیده، آن را با یک ردیوسر مدیریت می‌کند. سایر کامپوننت‌ها در هر جایی از عمق درخت می‌توانند استیت آن را از طریق کانتکست بخوانند. آن‌ها همچنین می‌توانند اکشن‌هایی را dispatch کنند تا آن استیت را به‌روزرسانی کنند.

<Sandpack>

```js src/App.js
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}
```

```js src/TasksContext.js
import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/AddTask.js
import { useState, useContext } from 'react';
import { useTasksDispatch } from './TasksContext.js';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Add</button>
    </>
  );
}

let nextId = 3;
```

```js src/TaskList.js
import { useState, useContext } from 'react';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      {taskContent}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<LearnMore path="/learn/scaling-up-with-reducer-and-context">

**[مقیاس‌پذیری با ردیوسر و کانتکست](/learn/scaling-up-with-reducer-and-context)** را بخوانید تا یاد بگیرید چگونه مدیریت استیت در یک برنامهٔ در حال رشد، مقیاس‌پذیر می‌شود.

</LearnMore>

## گام بعدی چه هست؟ {/*whats-next*/}

به [واکنش به ورودی با استیت](/learn/reacting-to-input-with-state) بروید تا خواندن این فصل را صفحه به صفحه شروع کنید!

یا، اگر قبلاً با این موضوعات آشنا هستید، چرا دربارهٔ [راه‌های فرار](/learn/escape-hatches) نخوانید؟
