---
title: useReducer
---

<Intro>

`useReducer` یک هوک ری‌اکت است که به شما اجازه می‌دهد یک [ردیوسر](/learn/extracting-state-logic-into-a-reducer) به کامپوننت خود اضافه کنید.

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useReducer(reducer, initialArg, init?)` {/*usereducer*/}

برای مدیریت استیت کامپوننت خود با یک [ردیوسر](/learn/extracting-state-logic-into-a-reducer)، `useReducer` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `reducer`: تابع ردیوسر که نحوهٔ به‌روزرسانی استیت را مشخص می‌کند. باید خالص باشد، باید استیت و اکشن را به‌عنوان آرگومان بگیرد، و باید استیت بعدی را برگرداند. استیت و اکشن می‌توانند از هر نوعی باشند.
* `initialArg`: مقداری که استیت اولیه از آن محاسبه می‌شود. می‌تواند مقداری از هر نوعی باشد. نحوهٔ محاسبهٔ استیت اولیه از آن به آرگومان `init` بعدی بستگی دارد.
* **اختیاری** `init`: تابع مقداردهی اولیه که باید استیت اولیه را برگرداند. اگر مشخص نشده باشد، استیت اولیه روی `initialArg` تنظیم می‌شود. در غیر این صورت، استیت اولیه روی نتیجهٔ فراخوانی `init(initialArg)` تنظیم می‌شود.

#### مقدار بازگشتی {/*returns*/}

`useReducer` آرایه‌ای با دقیقاً دو مقدار برمی‌گرداند:

1. استیت کنونی. در طول رندر اول، روی `init(initialArg)` یا `initialArg` (اگر `init` وجود ندارد) تنظیم می‌شود.
2. [تابع `dispatch`](#dispatch) که به شما اجازه می‌دهد استیت را به مقدار متفاوتی به‌روز کنید و یک رندر مجدد را فعال کنید.

#### نکات {/*caveats*/}

* `useReducer` یک هوک است، بنابراین فقط می‌توانید آن را **در سطح بالای کامپوننت** یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را درون حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.
* تابع `dispatch` هویت پایداری دارد، بنابراین اغلب می‌بینید که از وابستگی‌های افکت حذف می‌شود، اما گنجاندن آن باعث نمی‌شود افکت اجرا شود. اگر لینتر اجازه می‌دهد یک وابستگی را بدون خطا حذف کنید، انجام این کار امن است. [دربارهٔ حذف وابستگی‌های افکت بیشتر بدانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)
* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **ردیوسر و تابع مقداردهی اولیهٔ شما را دو بار فراخوانی می‌کند** تا به شما کمک کند [ناخالصی‌های تصادفی را پیدا کنید.](#my-reducer-or-initializer-function-runs-twice) این رفتار فقط مخصوص محیط توسعه است و بر محیط تولید تأثیری ندارد. اگر ردیوسر و تابع مقداردهی اولیهٔ شما خالص باشند (همان‌طور که باید باشند)، این نباید روی منطق شما تأثیر بگذارد. نتیجهٔ یکی از فراخوانی‌ها نادیده گرفته می‌شود.

---

### تابع `dispatch` {/*dispatch*/}

تابع `dispatch` که توسط `useReducer` برگردانده می‌شود به شما اجازه می‌دهد استیت را به مقدار متفاوتی به‌روز کنید و یک رندر مجدد را فعال کنید. باید اکشن را به‌عنوان تنها آرگومان به تابع `dispatch` ارسال کنید:

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
  dispatch({ type: 'incremented_age' });
  // ...
```

ری‌اکت استیت بعدی را به نتیجهٔ فراخوانی تابع `reducer`‌ای که با `state` کنونی و اکشنی که به `dispatch` ارسال کرده‌اید ارائه کرده‌اید، تنظیم می‌کند.

#### پارامترها {/*dispatch-parameters*/}

* `action`: اکشنی که توسط کاربر انجام شده است. می‌تواند مقداری از هر نوعی باشد. طبق قرارداد، یک اکشن معمولاً یک شیء با ویژگی `type` است که آن را شناسایی می‌کند و به‌طور اختیاری، ویژگی‌های دیگری با اطلاعات اضافی.

#### مقدار بازگشتی {/*dispatch-returns*/}

توابع `dispatch` مقدار بازگشتی ندارند.

#### نکات {/*setstate-caveats*/}

* تابع `dispatch` **فقط متغیر استیت را برای رندر *بعدی* به‌روز می‌کند**. اگر متغیر استیت را بعد از فراخوانی تابع `dispatch` بخوانید، [هنوز مقدار قدیمی را دریافت می‌کنید](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) که قبل از فراخوانی شما روی صفحه بود.

* اگر مقدار جدیدی که ارائه می‌دهید با `state` کنونی یکسان باشد (همان‌طور که با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) تعیین می‌شود)، ری‌اکت **رندر مجدد کامپوننت و فرزندانش را رد می‌کند.** این یک بهینه‌سازی است. ری‌اکت ممکن است همچنان قبل از نادیده گرفتن نتیجه نیاز به فراخوانی کامپوننت شما داشته باشد، اما نباید روی کد شما تأثیر بگذارد.

* ری‌اکت [به‌روزرسانی‌های استیت را دسته‌بندی می‌کند.](/learn/queueing-a-series-of-state-updates) صفحه را **پس از اجرای همهٔ کنترل‌کننده‌های رویداد** و فراخوانی توابع `set` توسط آن‌ها به‌روز می‌کند. این کار از رندرهای مجدد متعدد در طول یک رویداد جلوگیری می‌کند. در موارد نادر که نیاز دارید ری‌اکت را مجبور کنید صفحه را زودتر به‌روز کند، مثلاً برای دسترسی به DOM، می‌توانید از [`flushSync`](/reference/react-dom/flushSync) استفاده کنید.

---

## کاربرد {/*usage*/}

### افزودن یک ردیوسر به یک کامپوننت {/*adding-a-reducer-to-a-component*/}

برای مدیریت استیت با یک [ردیوسر](/learn/extracting-state-logic-into-a-reducer)، `useReducer` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js [[1, 8, "state"], [2, 8, "dispatch"], [4, 8, "reducer"], [3, 8, "{ age: 42 }"]]
import { useReducer } from 'react';

function reducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

`useReducer` آرایه‌ای با دقیقاً دو مورد برمی‌گرداند:

1. <CodeStep step={1}>استیت کنونی</CodeStep> این متغیر استیت، که ابتدا روی <CodeStep step={3}>استیت اولیه</CodeStep> که شما ارائه کرده‌اید تنظیم می‌شود.
2. <CodeStep step={2}>تابع `dispatch`</CodeStep> که به شما اجازه می‌دهد در پاسخ به تعامل آن را تغییر دهید.

برای به‌روزرسانی چیزی که روی صفحه است، <CodeStep step={2}>`dispatch`</CodeStep> را با شیءای که نشان‌دهندهٔ کاری است که کاربر انجام داده و یک *اکشن* نامیده می‌شود، فراخوانی کنید:

```js [[2, 2, "dispatch"]]
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```

ری‌اکت استیت کنونی و اکشن را به <CodeStep step={4}>تابع ردیوسر</CodeStep> شما ارسال می‌کند. ردیوسر شما استیت بعدی را محاسبه کرده و برمی‌گرداند. ری‌اکت آن استیت بعدی را ذخیره می‌کند، کامپوننت شما را با آن رندر می‌کند، و UI را به‌روز می‌کند.

<Sandpack>

```js
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

`useReducer` بسیار شبیه [`useState`](/reference/react/useState) است، اما به شما اجازه می‌دهد منطق به‌روزرسانی استیت را از کنترل‌کننده‌های رویداد به یک تابع واحد در بیرون کامپوننت خود منتقل کنید. دربارهٔ [انتخاب بین `useState` و `useReducer`](/learn/extracting-state-logic-into-a-reducer#comparing-usestate-and-usereducer) بیشتر بخوانید.

---

### نوشتن تابع ردیوسر {/*writing-the-reducer-function*/}

یک تابع ردیوسر به این صورت تعریف می‌شود:

```js
function reducer(state, action) {
  // ...
}
```

سپس باید کدی را پر کنید که استیت بعدی را محاسبه کرده و برمی‌گرداند. طبق قرارداد، رایج است که آن را به‌صورت یک [عبارت `switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) بنویسید. برای هر `case` در `switch`، استیت بعدی را محاسبه کرده و برگردانید.

```js {4-7,10-13}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

اکشن‌ها می‌توانند هر شکلی داشته باشند. طبق قرارداد، رایج است که اشیاء با ویژگی `type` که اکشن را شناسایی می‌کند ارسال کنید. باید شامل حداقل اطلاعات لازم که ردیوسر برای محاسبهٔ استیت بعدی نیاز دارد باشد.

```js {5,9-12}
function Form() {
  const [state, dispatch] = useReducer(reducer, { name: 'Taylor', age: 42 });
  
  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    });
  }
  // ...
```

نام‌های نوع اکشن محلی به کامپوننت شما هستند. [هر اکشن یک تعامل واحد را توصیف می‌کند، حتی اگر منجر به تغییرات متعددی در داده‌ها شود.](/learn/extracting-state-logic-into-a-reducer#writing-reducers-well) شکل استیت دلخواه است، اما معمولاً یک شیء یا آرایه خواهد بود.

برای کسب اطلاعات بیشتر [استخراج منطق استیت به یک ردیوسر](/learn/extracting-state-logic-into-a-reducer) را بخوانید.

<Pitfall>

استیت فقط‌خواندنی است. هیچ شیء یا آرایه‌ای در استیت را تغییر ندهید:

```js {4,5}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // 🚩 Don't mutate an object in state like this:
      state.age = state.age + 1;
      return state;
    }
```

در عوض، همیشه اشیاء جدیدی از ردیوسر خود برگردانید:

```js {4-8}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Instead, return a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
```

برای کسب اطلاعات بیشتر [به‌روزرسانی اشیاء در استیت](/learn/updating-objects-in-state) و [به‌روزرسانی آرایه‌ها در استیت](/learn/updating-arrays-in-state) را بخوانید.

</Pitfall>

<Recipes titleText="Basic useReducer examples" titleId="examples-basic">

#### Form (object) {/*form-object*/}

در این مثال، ردیوسر یک شیء استیت با دو فیلد مدیریت می‌کند: `name` و `age`.

<Sandpack>

```js
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = { name: 'Taylor', age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: 'incremented_age' });
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed_name',
      nextName: e.target.value
    }); 
  }

  return (
    <>
      <input
        value={state.name}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>
        Increment age
      </button>
      <p>Hello, {state.name}. You are {state.age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

#### Todo list (array) {/*todo-list-array*/}

در این مثال، ردیوسر یک آرایه از کارها را مدیریت می‌کند. آرایه باید [بدون تغییر](/learn/updating-arrays-in-state) به‌روز شود.

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

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

<Solution />

#### Writing concise update logic with Immer {/*writing-concise-update-logic-with-immer*/}

اگر به‌روزرسانی آرایه‌ها و اشیاء بدون تغییر خسته‌کننده به نظر می‌رسد، می‌توانید از کتابخانه‌ای مانند [Immer](https://github.com/immerjs/use-immer#useimmerreducer) برای کاهش کد تکراری استفاده کنید. Immer به شما اجازه می‌دهد کد مختصری بنویسید، گویی در حال تغییر اشیاء هستید، اما در پس‌زمینه به‌روزرسانی‌های تغییرناپذیر انجام می‌دهد:

<Sandpack>

```js src/App.js
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex(t =>
        t.id === action.task.id
      );
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(
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

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
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

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution />

</Recipes>

---

### اجتناب از بازایجاد استیت اولیه {/*avoiding-recreating-the-initial-state*/}

ری‌اکت استیت اولیه را یک بار ذخیره می‌کند و در رندرهای بعدی آن را نادیده می‌گیرد.

```js
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, createInitialState(username));
  // ...
```

اگرچه نتیجهٔ `createInitialState(username)` فقط برای رندر اولیه استفاده می‌شود، اما شما همچنان این تابع را در هر رندر فراخوانی می‌کنید. اگر آرایه‌های بزرگ ایجاد می‌کند یا محاسبات پرهزینه‌ای انجام می‌دهد، می‌تواند اتلاف منابع باشد.

برای حل این مشکل، می‌توانید **آن را به‌عنوان _تابع مقداردهی اولیه_** به‌عنوان آرگومان سوم به `useReducer` ارسال کنید:

```js {6}
function createInitialState(username) {
  // ...
}

function TodoList({ username }) {
  const [state, dispatch] = useReducer(reducer, username, createInitialState);
  // ...
```

توجه کنید که `createInitialState` را ارسال می‌کنید، یعنی *خود تابع*، و نه `createInitialState()` که نتیجهٔ فراخوانی آن است. به این ترتیب، استیت اولیه بعد از راه‌اندازی دوباره ایجاد نمی‌شود.

در مثال بالا، `createInitialState` یک آرگومان `username` می‌گیرد. اگر تابع مقداردهی اولیهٔ شما برای محاسبهٔ استیت اولیه به هیچ اطلاعاتی نیاز ندارد، می‌توانید `null` را به‌عنوان آرگومان دوم به `useReducer` ارسال کنید.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly" titleId="examples-initializer">

#### Passing the initializer function {/*passing-the-initializer-function*/}

این مثال تابع مقداردهی اولیه را ارسال می‌کند، بنابراین تابع `createInitialState` فقط در حین راه‌اندازی اجرا می‌شود. وقتی کامپوننت دوباره رندر می‌شود، مثلاً وقتی در ورودی تایپ می‌کنید، اجرا نمی‌شود.

<Sandpack>

```js src/App.js hidden
import TodoList from './TodoList.js';

export default function App() {
  return <TodoList username="Taylor" />;
}
```

```js src/TodoList.js active
import { useReducer } from 'react';

function createInitialState(username) {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: username + "'s task #" + (i + 1)
    });
  }
  return {
    draft: '',
    todos: initialTodos,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed_draft': {
      return {
        draft: action.nextDraft,
        todos: state.todos,
      };
    };
    case 'added_todo': {
      return {
        draft: '',
        todos: [{
          id: state.todos.length,
          text: state.draft
        }, ...state.todos]
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
  const [state, dispatch] = useReducer(
    reducer,
    username,
    createInitialState
  );
  return (
    <>
      <input
        value={state.draft}
        onChange={e => {
          dispatch({
            type: 'changed_draft',
            nextDraft: e.target.value
          })
        }}
      />
      <button onClick={() => {
        dispatch({ type: 'added_todo' });
      }}>Add</button>
      <ul>
        {state.todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Passing the initial state directly {/*passing-the-initial-state-directly*/}

این مثال تابع مقداردهی اولیه را ارسال **نمی‌کند**، بنابراین تابع `createInitialState` در هر رندر اجرا می‌شود، مثلاً وقتی در ورودی تایپ می‌کنید. تفاوت قابل مشاهده‌ای در رفتار وجود ندارد، اما این کد کارایی کمتری دارد.

<Sandpack>

```js src/App.js hidden
import TodoList from './TodoList.js';

export default function App() {
  return <TodoList username="Taylor" />;
}
```

```js src/TodoList.js active
import { useReducer } from 'react';

function createInitialState(username) {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: username + "'s task #" + (i + 1)
    });
  }
  return {
    draft: '',
    todos: initialTodos,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed_draft': {
      return {
        draft: action.nextDraft,
        todos: state.todos,
      };
    };
    case 'added_todo': {
      return {
        draft: '',
        todos: [{
          id: state.todos.length,
          text: state.draft
        }, ...state.todos]
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function TodoList({ username }) {
  const [state, dispatch] = useReducer(
    reducer,
    createInitialState(username)
  );
  return (
    <>
      <input
        value={state.draft}
        onChange={e => {
          dispatch({
            type: 'changed_draft',
            nextDraft: e.target.value
          })
        }}
      />
      <button onClick={() => {
        dispatch({ type: 'added_todo' });
      }}>Add</button>
      <ul>
        {state.todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

## رفع اشکال {/*troubleshooting*/}

### من یک اکشن dispatch کرده‌ام، اما لاگ‌کردن مقدار استیت قدیمی را به من می‌دهد {/*ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/}

فراخوانی تابع `dispatch` **استیت را در کد در حال اجرا تغییر نمی‌دهد**:

```js {4,5,8}
function handleClick() {
  console.log(state.age);  // 42

  dispatch({ type: 'incremented_age' }); // Request a re-render with 43
  console.log(state.age);  // Still 42!

  setTimeout(() => {
    console.log(state.age); // Also 42!
  }, 5000);
}
```

این به این دلیل است که [استیت‌ها مانند یک عکس‌الملی رفتار می‌کنند.](/learn/state-as-a-snapshot) به‌روزرسانی استیت یک رندر دیگر با مقدار استیت جدید درخواست می‌کند، اما بر متغیر جاوااسکریپتی `state` در کنترل‌کنندهٔ رویداد در حال اجرای شما تأثیری نمی‌گذارد.

اگر نیاز به حدس زدن مقدار استیت بعدی دارید، می‌توانید با فراخوانی ردیوسر خودتان آن را به‌صورت دستی محاسبه کنید:

```js
const action = { type: 'incremented_age' };
dispatch(action);

const nextState = reducer(state, action);
console.log(state);     // { age: 42 }
console.log(nextState); // { age: 43 }
```

---

### من یک اکشن dispatch کرده‌ام، اما صفحه به‌روز نمی‌شود {/*ive-dispatched-an-action-but-the-screen-doesnt-update*/}

ری‌اکت **به‌روزرسانی شما را نادیده می‌گیرد اگر استیت بعدی با استیت قبلی برابر باشد،** همان‌طور که با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) تعیین می‌شود. این معمولاً وقتی رخ می‌دهد که یک شیء یا آرایه در استیت را مستقیماً تغییر می‌دهید:

```js {4-5,9-10}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // 🚩 Wrong: mutating existing object
      state.age++;
      return state;
    }
    case 'changed_name': {
      // 🚩 Wrong: mutating existing object
      state.name = action.nextName;
      return state;
    }
    // ...
  }
}
```

شما یک شیء `state` موجود را تغییر دادید و آن را برگرداندید، بنابراین ری‌اکت به‌روزرسانی را نادیده گرفت. برای رفع این مشکل، باید مطمئن شوید که همیشه در حال [به‌روزرسانی اشیاء در استیت](/learn/updating-objects-in-state) و [به‌روزرسانی آرایه‌ها در استیت](/learn/updating-arrays-in-state) به جای تغییر آن‌ها هستید:

```js {4-8,11-15}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      // ✅ Correct: creating a new object
      return {
        ...state,
        name: action.nextName
      };
    }
    // ...
  }
}
```

---

### بخشی از استیت ردیوسر من بعد از dispatch شدن نامشخص می‌شود {/*a-part-of-my-reducer-state-becomes-undefined-after-dispatching*/}

مطمئن شوید که هر شاخهٔ `case` هنگام برگرداندن استیت جدید **تمام فیلدهای موجود را کپی می‌کند**:

```js {5}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        ...state, // Don't forget this!
        age: state.age + 1
      };
    }
    // ...
```

بدون `...state` در بالا، استیت بعدی برگردانده‌شده فقط شامل فیلد `age` و هیچ چیز دیگر خواهد بود.

---

### کل استیت ردیوسر من بعد از dispatch شدن نامشخص می‌شود {/*my-entire-reducer-state-becomes-undefined-after-dispatching*/}

اگر استیت شما به‌طور غیرمنتظره `undefined` می‌شود، احتمالاً فراموش می‌کنید در یکی از caseها `state` را `return` کنید، یا نوع اکشن شما با هیچ‌کدام از عبارات `case` مطابقت ندارد. برای پیدا کردن دلیل، یک خطا در بیرون `switch` پرتاب کنید:

```js {10}
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ...
    }
    case 'edited_name': {
      // ...
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

همچنین می‌توانید از یک بررسی‌کنندهٔ نوع استاتیک مانند TypeScript برای گرفتن چنین اشتباهاتی استفاده کنید.

---

### من خطایی دریافت می‌کنم: «Too many re-renders» {/*im-getting-an-error-too-many-re-renders*/}

ممکن است خطایی دریافت کنید که می‌گوید: `Too many re-renders. React limits the number of renders to prevent an infinite loop.`. معمولاً، این بدان معناست که شما به‌طور بدون قید و شرط *در حین رندر* در حال dispatch کردن یک اکشن هستید، بنابراین کامپوننت شما وارد یک حلقه می‌شود: رندر، dispatch (که باعث رندر می‌شود)، رندر، dispatch (که باعث رندر می‌شود)، و غیره. بسیار اغلب، این به دلیل اشتباه در مشخص کردن یک کنترل‌کنندهٔ رویداد رخ می‌دهد:

```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

اگر نمی‌توانید علت این خطا را پیدا کنید، روی فلش کنار خطا در کنسول کلیک کنید و از طریق پشتهٔ جاوااسکریپت عبور کنید تا فراخوانی تابع `dispatch` خاصی که مسئول خطا است را پیدا کنید.

---

### تابع ردیوسر یا مقداردهی اولیهٔ من دو بار اجرا می‌شود {/*my-reducer-or-initializer-function-runs-twice*/}

در [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode)، ری‌اکت توابع ردیوسر و مقداردهی اولیهٔ شما را دو بار فراخوانی می‌کند. این نباید کد شما را خراب کند.

این رفتار **فقط مخصوص محیط توسعه** به شما کمک می‌کند [کامپوننت‌ها را خالص نگه دارید.](/learn/keeping-components-pure) ری‌اکت نتیجهٔ یکی از فراخوانی‌ها را استفاده می‌کند و نتیجهٔ فراخوانی دیگر را نادیده می‌گیرد. تا زمانی که کامپوننت، تابع مقداردهی اولیه، و توابع ردیوسر شما خالص باشند، این نباید روی منطق شما تأثیر بگذارد. با این حال، اگر به‌طور تصادفی ناخالص باشند، این به شما کمک می‌کند اشتباهات را متوجه شوید.

مثلاً، این تابع ردیوسر ناخالص یک آرایه در استیت را تغییر می‌دهد:

```js {4-6}
function reducer(state, action) {
  switch (action.type) {
    case 'added_todo': {
      // 🚩 Mistake: mutating state
      state.todos.push({ id: nextId++, text: action.text });
      return state;
    }
    // ...
  }
}
```

از آنجا که ری‌اکت تابع ردیوسر شما را دو بار فراخوانی می‌کند، می‌بینید که todo دو بار اضافه شده است، بنابراین متوجه می‌شوید که اشتباهی وجود دارد. در این مثال، می‌توانید اشتباه را با [جایگزینی آرایه به جای تغییر آن](/learn/updating-arrays-in-state#adding-to-an-array) اصلاح کنید:

```js {4-11}
function reducer(state, action) {
  switch (action.type) {
    case 'added_todo': {
      // ✅ Correct: replacing with new state
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextId++, text: action.text }
        ]
      };
    }
    // ...
  }
}
```

اکنون که این تابع ردیوسر خالص است، فراخوانی آن یک بار اضافی تفاوتی در رفتار ایجاد نمی‌کند. به همین دلیل است که فراخوانی دو بار آن توسط ری‌اکت به شما کمک می‌کند اشتباهات را پیدا کنید. **فقط کامپوننت، تابع مقداردهی اولیه، و توابع ردیوسر باید خالص باشند.** کنترل‌کننده‌های رویداد نیازی به خالص بودن ندارند، بنابراین ری‌اکت هرگز کنترل‌کننده‌های رویداد شما را دو بار فراخوانی نمی‌کند.

برای کسب اطلاعات بیشتر [خالص نگه داشتن کامپوننت‌ها](/learn/keeping-components-pure) را بخوانید.
