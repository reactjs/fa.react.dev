---
title: useContext
---

<Intro>

`useContext` یک هوک ری‌اکت است که به شما اجازه می‌دهد [کانتکست](/learn/passing-data-deeply-with-context) را از کامپوننت خود بخوانید و در آن اشتراک کنید.

```js
const value = useContext(SomeContext)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useContext(SomeContext)` {/*usecontext*/}

برای خواندن و اشتراک در [کانتکست](/learn/passing-data-deeply-with-context)، `useContext` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js
import { useContext } from 'react';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // ...
```

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `SomeContext`: کانتکستی که قبلاً با [`createContext`](/reference/react/createContext) ایجاد کرده‌اید. خود کانتکست اطلاعات را نگه نمی‌دارد، فقط نوع اطلاعاتی را که می‌توانید ارائه یا از کامپوننت‌ها بخوانید نشان می‌دهد.

#### مقدار بازگشتی {/*returns*/}

`useContext` مقدار کانتکست را برای کامپوننت فراخوانی‌کننده برمی‌گرداند. این مقدار به‌عنوان `value`ای که به نزدیک‌ترین `SomeContext` بالای کامپوننت فراخوانی‌کننده در درخت ارسال شده تعیین می‌شود. اگر چنین providerای وجود نداشته باشد، مقدار بازگشتی `defaultValue`ای خواهد بود که برای آن کانتکست به [`createContext`](/reference/react/createContext) ارسال کرده‌اید. مقدار بازگشتی همیشه به‌روز است. ری‌اکت به‌طور خودکار کامپوننت‌هایی که مقداری از کانتکست را می‌خوانند، اگر تغییر کند، دوباره رندر می‌کند.

#### نکات {/*caveats*/}

* فراخوانی `useContext()` در یک کامپوننت تحت تأثیر provider‌هایی که از *همان* کامپوننت برگردانده شده‌اند قرار نمی‌گیرد. `<Context>` مربوطه **باید *بالای*** کامپوننتی باشد که `useContext()` را فراخوانی می‌کند.
* ری‌اکت **به‌طور خودکار رندر مجدد می‌کند** تمام فرزندانی که از یک کانتکست خاص استفاده می‌کنند را، از provider‌ای که `value` متفاوتی دریافت کرده شروع می‌کند. مقادیر قبلی و بعدی با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌شوند. رد کردن رندرهای مجدد با [`memo`](/reference/react/memo) مانع از دریافت مقادیر تازهٔ کانتکست توسط فرزندان نمی‌شود.
* اگر سیستم build شما ماژول‌های تکراری در خروجی تولید می‌کند (که می‌تواند با symlinkها رخ دهد)، این می‌تواند کانتکست را خراب کند. ارسال چیزی از طریق کانتکست فقط در صورتی کار می‌کند که `SomeContext`‌ای که برای ارائهٔ کانتکست استفاده می‌کنید و `SomeContext`‌ای که برای خواندن آن استفاده می‌کنید ***دقیقاً* یک شیء یکسان** باشند، همان‌طور که با مقایسهٔ `===` تعیین می‌شود.

---

## کاربرد {/*usage*/}


### ارسال داده به عمق درخت {/*passing-data-deeply-into-the-tree*/}

برای خواندن و اشتراک در [کانتکست](/learn/passing-data-deeply-with-context)، `useContext` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js [[2, 4, "theme"], [1, 4, "ThemeContext"]]
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ... 
```

`useContext` <CodeStep step={2}>مقدار کانتکست</CodeStep> را برای <CodeStep step={1}>کانتکست</CodeStep>‌ای که ارسال کرده‌اید برمی‌گرداند. برای تعیین مقدار کانتکست، ری‌اکت درخت کامپوننت را جستجو می‌کند و **نزدیک‌ترین provider کانتکست در بالا** را برای آن کانتکست خاص پیدا می‌کند.

برای ارسال کانتکست به یک `Button`، آن را یا یکی از کامپوننت‌های والدش را در provider کانتکست مربوطه بپیچید:

```js [[1, 3, "ThemeContext"], [2, 3, "\\"dark\\""], [1, 5, "ThemeContext"]]
function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

مهم نیست چند لایه کامپوننت بین provider و `Button` وجود دارد. وقتی یک `Button` در *هر کجا* درون `Form`، `useContext(ThemeContext)` را فراخوانی می‌کند، `"dark"` را به‌عنوان مقدار دریافت خواهد کرد.

<Pitfall>

`useContext()` همیشه به دنبال نزدیک‌ترین provider *بالای* کامپوننتی که آن را فراخوانی می‌کند می‌گردد. این به سمت بالا جستجو می‌کند و provider‌ها در کامپوننتی که `useContext()` را از آن فراخوانی می‌کنید **در نظر نمی‌گیرد**.

</Pitfall>

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

---

### به‌روزرسانی دادهٔ ارسال‌شده از طریق کانتکست {/*updating-data-passed-via-context*/}

اغلب، می‌خواهید کانتکست در طول زمان تغییر کند. برای به‌روزرسانی کانتکست، آن را با [استیت](/reference/react/useState) ترکیب کنید. یک متغیر استیت در کامپوننت والد تعریف کنید، و استیت کنونی را به‌عنوان <CodeStep step={2}>مقدار کانتکست</CodeStep> به provider ارسال کنید.

```js {2} [[1, 4, "ThemeContext"], [2, 4, "theme"], [1, 11, "ThemeContext"]]
function MyPage() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext value={theme}>
      <Form />
      <Button onClick={() => {
        setTheme('light');
      }}>
        Switch to light theme
      </Button>
    </ThemeContext>
  );
}
```

اکنون هر `Button`‌ای درون provider مقدار `theme` کنونی را دریافت خواهد کرد. اگر `setTheme` را برای به‌روزرسانی مقدار `theme`‌ای که به provider ارسال می‌کنید فراخوانی کنید، تمام کامپوننت‌های `Button` با مقدار جدید `'light'` رندر مجدد خواهند شد.

<Recipes titleText="Examples of updating context" titleId="examples-basic">

#### به‌روزرسانی یک مقدار از طریق کانتکست {/*updating-a-value-via-context*/}

در این مثال، کامپوننت `MyApp` یک متغیر استیت را نگه می‌دارد که سپس به provider `ThemeContext` ارسال می‌شود. تیک زدن چک‌باکس «Dark mode» استیت را به‌روز می‌کند. تغییر مقدار ارائه‌شده، تمام کامپوننت‌هایی که از آن کانتکست استفاده می‌کنند را دوباره رندر می‌کند.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext value={theme}>
      <Form />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </ThemeContext>
  )
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

توجه کنید که `value="dark"` رشتهٔ `"dark"` را ارسال می‌کند، اما `value={theme}` مقدار متغیر `theme` جاوااسکریپتی را با [آکولادهای JSX](/learn/javascript-in-jsx-with-curly-braces) ارسال می‌کند. آکولادها همچنین به شما اجازه می‌دهند مقادیر کانتکستی که رشته نیستند ارسال کنید.

<Solution />

#### به‌روزرسانی یک شیء از طریق کانتکست {/*updating-an-object-via-context*/}

در این مثال، یک متغیر استیت `currentUser` وجود دارد که یک شیء را نگه می‌دارد. شما `{ currentUser, setCurrentUser }` را در یک شیء واحد ترکیب می‌کنید و آن را از طریق کانتکست درون `value={}` ارسال می‌کنید. این به هر کامپوننت زیر، مانند `LoginButton`، اجازه می‌دهد هم `currentUser` و هم `setCurrentUser` را بخواند، و سپس در صورت نیاز `setCurrentUser` را فراخوانی کند.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <CurrentUserContext
      value={{
        currentUser,
        setCurrentUser
      }}
    >
      <Form />
    </CurrentUserContext>
  );
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <LoginButton />
    </Panel>
  );
}

function LoginButton() {
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  if (currentUser !== null) {
    return <p>You logged in as {currentUser.name}.</p>;
  }

  return (
    <Button onClick={() => {
      setCurrentUser({ name: 'Advika' })
    }}>Log in as Advika</Button>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}

.button {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}
```

</Sandpack>

<Solution />

#### کانتکست‌های متعدد {/*multiple-contexts*/}

در این مثال، دو کانتکست مستقل وجود دارد. `ThemeContext` تم کنونی را که یک رشته است ارائه می‌کند، در حالی که `CurrentUserContext` شیءای که کاربر کنونی را نشان می‌دهد نگه می‌دارد.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext value={theme}>
      <CurrentUserContext
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        <WelcomePanel />
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light')
            }}
          />
          Use dark mode
        </label>
      </CurrentUserContext>
    </ThemeContext>
  )
}

function WelcomePanel({ children }) {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ?
        <Greeting /> :
        <LoginForm />
      }
    </Panel>
  );
}

function Greeting() {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <p>You logged in as {currentUser.name}.</p>
  )
}

function LoginForm() {
  const {setCurrentUser} = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const canLogin = firstName.trim() !== '' && lastName.trim() !== '';
  return (
    <>
      <label>
        First name{': '}
        <input
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{': '}
        <input
        required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + ' ' + lastName
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### استخراج providerها به یک کامپوننت {/*extracting-providers-to-a-component*/}

با رشد برنامهٔ شما، انتظار می‌رود که یک «هرم» از کانتکست‌ها نزدیک به ریشهٔ برنامه‌تان داشته باشید. هیچ اشکالی در این وجود ندارد. با این حال، اگر از نظر زیبایی‌شناختی از تودرتو بودن خوشتان نمی‌آید، می‌توانید providerها را در یک کامپوننت واحد استخراج کنید. در این مثال، `MyProviders` «لوله‌کشی» را پنهان می‌کند و فرزندان ارسال‌شده به آن را درون providerهای لازم رندر می‌کند. توجه کنید که استیت `theme` و `setTheme` در خود `MyApp` نیاز است، بنابراین `MyApp` همچنان مالک آن قطعه از استیت است.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);
const CurrentUserContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <MyProviders theme={theme} setTheme={setTheme}>
      <WelcomePanel />
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  );
}

function MyProviders({ children, theme, setTheme }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeContext value={theme}>
      <CurrentUserContext
        value={{
          currentUser,
          setCurrentUser
        }}
      >
        {children}
      </CurrentUserContext>
    </ThemeContext>
  );
}

function WelcomePanel({ children }) {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ?
        <Greeting /> :
        <LoginForm />
      }
    </Panel>
  );
}

function Greeting() {
  const {currentUser} = useContext(CurrentUserContext);
  return (
    <p>You logged in as {currentUser.name}.</p>
  )
}

function LoginForm() {
  const {setCurrentUser} = useContext(CurrentUserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const canLogin = firstName !== '' && lastName !== '';
  return (
    <>
      <label>
        First name{': '}
        <input
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last name{': '}
        <input
        required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <Button
        disabled={!canLogin}
        onClick={() => {
          setCurrentUser({
            name: firstName + ' ' + lastName
          });
        }}
      >
        Log in
      </Button>
      {!canLogin && <i>Fill in both fields.</i>}
    </>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, disabled, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

```css
label {
  display: block;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### مقیاس‌پذیری با کانتکست و یک ردیوسر {/*scaling-up-with-context-and-a-reducer*/}

در برنامه‌های بزرگ‌تر، رایج است که کانتکست را با یک [ردیوسر](/reference/react/useReducer) ترکیب کنید تا منطق مرتبط با استیت از کامپوننت‌ها خارج شود. در این مثال، تمام «اتصالات» در `TasksContext.js` پنهان شده‌اند، که شامل یک ردیوسر و دو کانتکست مجزا است.

یک [راهنمای کامل](/learn/scaling-up-with-reducer-and-context) از این مثال را بخوانید.

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

export default function AddTask() {
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

<Solution />

</Recipes>

---

### تعیین یک مقدار پیش‌فرض جایگزین {/*specifying-a-fallback-default-value*/}

اگر ری‌اکت نتواند هیچ provider‌ای از آن <CodeStep step={1}>کانتکست</CodeStep> خاص در درخت والد پیدا کند، مقدار کانتکست برگردانده‌شده توسط `useContext()` با <CodeStep step={3}>مقدار پیش‌فرض</CodeStep>‌ای که هنگام [ایجاد آن کانتکست](/reference/react/createContext) مشخص کرده‌اید برابر خواهد بود:

```js [[1, 1, "ThemeContext"], [3, 1, "null"]]
const ThemeContext = createContext(null);
```

مقدار پیش‌فرض **هرگز تغییر نمی‌کند**. اگر می‌خواهید کانتکست را به‌روز کنید، آن را با استیت همان‌طور که [در بالا توضیح داده شد](#updating-data-passed-via-context) استفاده کنید.

اغلب، به جای `null`، مقدار معنادارتری وجود دارد که می‌توانید به‌عنوان پیش‌فرض استفاده کنید، مثلاً:

```js [[1, 1, "ThemeContext"], [3, 1, "light"]]
const ThemeContext = createContext('light');
```

به این ترتیب، اگر به‌طور تصادفی کامپوننتی را بدون provider مربوطه رندر کنید، خراب نمی‌شود. این همچنین به کامپوننت‌های شما کمک می‌کند تا در محیط تست بدون راه‌اندازی providerهای زیادی در تست‌ها خوب کار کنند.

در مثال زیر، دکمهٔ «Toggle theme» همیشه روشن است زیرا **بیرون از هر provider کانتکست تمی** است و مقدار تم پیش‌فرض کانتکست `'light'` است. مقدار تم پیش‌فرض را به `'dark'` ویرایش کنید.

<Sandpack>

```js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function MyApp() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <ThemeContext value={theme}>
        <Form />
      </ThemeContext>
      <Button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
        Toggle theme
      </Button>
    </>
  )
}

function Form({ children }) {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 10px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

---

### بازنویسی کانتکست برای بخشی از درخت {/*overriding-context-for-a-part-of-the-tree*/}

می‌توانید کانتکست را برای بخشی از درخت با پیچیدن آن بخش در یک provider با مقدار متفاوت بازنویسی کنید.

```js {3,5}
<ThemeContext value="dark">
  ...
  <ThemeContext value="light">
    <Footer />
  </ThemeContext>
  ...
</ThemeContext>
```

می‌توانید providerها را به هر تعداد که نیاز دارید تودرتو و بازنویسی کنید.

<Recipes titleText="Examples of overriding context">

#### بازنویسی یک تم {/*overriding-a-theme*/}

در اینجا، دکمهٔ *درون* `Footer` مقدار کانتکست متفاوتی (`"light"`) نسبت به دکمه‌های بیرون (`"dark"`) دریافت می‌کند.

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
      <ThemeContext value="light">
        <Footer />
      </ThemeContext>
    </Panel>
  );
}

function Footer() {
  return (
    <footer>
      <Button>Settings</Button>
    </footer>
  );
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
```

```css
footer {
  margin-top: 20px;
  border-top: 1px solid #aaa;
}

.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

<Solution />

#### عناوین تودرتو به‌طور خودکار {/*automatically-nested-headings*/}

می‌توانید هنگام تودرتو کردن providerهای کانتکست، اطلاعات را «انباشته» کنید. در این مثال، کامپوننت `Section` کانتکست `LevelContext` را که عمق تودرتوی بخش را مشخص می‌کند پیگیری می‌کند. این کانتکست `LevelContext` را از بخش والد می‌خواند، و `LevelContext` را با عددی یک بیشتر به فرزندانش ارائه می‌دهد. در نتیجه، کامپوننت `Heading` می‌تواند به‌طور خودکار بر اساس تعداد کامپوننت‌های `Section` که درون آن‌ها تودرتو شده تصمیم بگیرد که از کدام یک از تگ‌های `<h1>`، `<h2>`، `<h3>`، ... استفاده کند.

یک [راهنمای دقیق](/learn/passing-data-deeply-with-context) از این مثال را بخوانید.

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

<Solution />

</Recipes>

---

### بهینه‌سازی رندرهای مجدد هنگام ارسال اشیاء و توابع {/*optimizing-re-renders-when-passing-objects-and-functions*/}

می‌توانید هر مقداری را از طریق کانتکست ارسال کنید، از جمله اشیاء و توابع.

```js [[2, 10, "{ currentUser, login }"]] 
function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  function login(response) {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }

  return (
    <AuthContext value={{ currentUser, login }}>
      <Page />
    </AuthContext>
  );
}
```

در اینجا، <CodeStep step={2}>مقدار کانتکست</CodeStep> یک شیء جاوااسکریپتی با دو ویژگی است که یکی از آن‌ها یک تابع است. هر بار که `MyApp` دوباره رندر می‌شود (مثلاً هنگام به‌روزرسانی مسیر)، این یک شیء *متفاوت* خواهد بود که به یک تابع *متفاوت* اشاره می‌کند، بنابراین ری‌اکت همچنین باید تمام کامپوننت‌های عمیق در درخت که `useContext(AuthContext)` را فراخوانی می‌کنند دوباره رندر کند.

در برنامه‌های کوچک‌تر، این مشکل ایجاد نمی‌کند. با این حال، اگر داده‌های زیربنایی، مانند `currentUser`، تغییر نکرده است، نیازی به رندر مجدد آن‌ها نیست. برای کمک به ری‌اکت در بهره‌گیری از این واقعیت، می‌توانید تابع `login` را با [`useCallback`](/reference/react/useCallback) بپیچید و ایجاد شیء را در [`useMemo`](/reference/react/useMemo) بپیچید. این یک بهینه‌سازی عملکرد است:

```js {6,9,11,14,17}
import { useCallback, useMemo } from 'react';

function MyApp() {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback((response) => {
    storeCredentials(response.credentials);
    setCurrentUser(response.user);
  }, []);

  const contextValue = useMemo(() => ({
    currentUser,
    login
  }), [currentUser, login]);

  return (
    <AuthContext value={contextValue}>
      <Page />
    </AuthContext>
  );
}
```

در نتیجهٔ این تغییر، حتی اگر `MyApp` نیاز به رندر مجدد داشته باشد، کامپوننت‌هایی که `useContext(AuthContext)` را فراخوانی می‌کنند، مگر اینکه `currentUser` تغییر کرده باشد، نیازی به رندر مجدد نخواهند داشت.

دربارهٔ [`useMemo`](/reference/react/useMemo#skipping-re-rendering-of-components) و [`useCallback`](/reference/react/useCallback#skipping-re-rendering-of-components) بیشتر بخوانید.

---

## رفع اشکال {/*troubleshooting*/}

### کامپوننت من مقدار provider مرا نمی‌بیند {/*my-component-doesnt-see-the-value-from-my-provider*/}

چند راه رایج وجود دارد که این می‌تواند رخ دهد:

1. شما `<SomeContext>` را در همان کامپوننت (یا پایین‌تر)‌ای رندر می‌کنید که `useContext()` را فراخوانی می‌کنید. `<SomeContext>` را *بالا و بیرون* کامپوننتی که `useContext()` را فراخوانی می‌کند منتقل کنید.
2. ممکن است فراموش کرده باشید کامپوننت خود را با `<SomeContext>` بپیچید، یا ممکن است آن را در بخش متفاوتی از درخت نسبت به آنچه فکر می‌کردید قرار داده باشید. با استفاده از [React DevTools](/learn/react-developer-tools) بررسی کنید که آیا سلسله‌مراتب درست است.
3. ممکن است با مشکل build در ابزار خود مواجه شوید که باعث می‌شود `SomeContext`‌ای که از کامپوننت ارائه‌دهنده دیده می‌شود و `SomeContext`‌ای که توسط کامپوننت خواننده دیده می‌شود دو شیء متفاوت باشند. این می‌تواند مثلاً اگر از symlinkها استفاده می‌کنید رخ دهد. می‌توانید این را با اختصاص دادن آن‌ها به globalهایی مانند `window.SomeContext1` و `window.SomeContext2` و سپس بررسی اینکه `window.SomeContext1 === window.SomeContext2` در کنسول تأیید کنید. اگر یکسان نیستند، آن مشکل را در سطح ابزار build برطرف کنید.

### من همیشه `undefined` از کانتکستم دریافت می‌کنم با اینکه مقدار پیش‌فرض متفاوت است {/*i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different*/}

ممکن است یک provider بدون `value` در درخت داشته باشید:

```js {1,2}
// 🚩 Doesn't work: no value prop
<ThemeContext>
   <Button />
</ThemeContext>
```

اگر فراموش کنید `value` را مشخص کنید، مانند ارسال `value={undefined}` است.

همچنین ممکن است به اشتباه از یک نام پراپ متفاوت به اشتباه استفاده کرده باشید:

```js {1,2}
// 🚩 Doesn't work: prop should be called "value"
<ThemeContext theme={theme}>
   <Button />
</ThemeContext>
```

در هر دو مورد باید یک هشدار از ری‌اکت در کنسول ببینید. برای رفع آن‌ها، پراپ را `value` بنامید:

```js {1,2}
// ✅ Passing the value prop
<ThemeContext value={theme}>
   <Button />
</ThemeContext>
```

توجه کنید که [مقدار پیش‌فرض از فراخوانی `createContext(defaultValue)` شما](#specifying-a-fallback-default-value) فقط **اگر هیچ provider منطبقی در بالا وجود نداشته باشد** استفاده می‌شود. اگر کامپوننت `<SomeContext value={undefined}>`‌ای در جایی از درخت والد وجود داشته باشد، کامپوننتی که `useContext(SomeContext)` را فراخوانی می‌کند `undefined` را *به‌عنوان* مقدار کانتکست دریافت خواهد کرد.
