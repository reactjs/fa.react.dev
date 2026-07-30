---
title: استخراج منطق استیت در یک ردیوسر
---

<Intro>

کامپوننت‌هایی با بسیاری از به‌روزرسانی‌های استیت پخش‌شده در بسیاری از مدیریت‌کننده‌های رویداد می‌توانند طاقت‌فرسا شوند. برای این موارد، می‌توانید تمام منطق به‌روزرسانی استیت را خارج از کامپوننت خود در یک تابع واحد، به نام _ردیوسر_ (reducer) تجمیع کنید.

</Intro>

<YouWillLearn>

- تابع ردیوسر چیست
- چگونه `useState` را به `useReducer` بازسازی کنیم
- چه زمانی از ردیوسر استفاده کنید
- چگونه آن را به‌خوبی بنویسید

</YouWillLearn>

## تجمیع منطق استیت با یک ردیوسر {/*consolidate-state-logic-with-a-reducer*/}

همان‌طور که کامپوننت‌های شما در پیچیدگی رشد می‌کنند، می‌تواند سخت‌تر شود که با یک نگاه تمام روش‌های متفاوتی که استیت یک کامپوننت به‌روز می‌شود را ببینید. مثلاً، کامپوننت `TaskApp` زیر یک آرایه از `tasks` را در استیت نگه می‌دارد و از سه مدیریت‌کنندهٔ رویداد متفاوت برای افزودن، حذف، و ویرایش کارها استفاده می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTask(task) {
    setTasks(
      tasks.map((t) => {
        if (t.id === task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

هر یک از مدیریت‌کننده‌های رویداد آن `setTasks` را فراخوانی می‌کند تا استیت را به‌روز کند. همان‌طور که این کامپوننت رشد می‌کند، مقدار منطق استیت پخش‌شده در سراسر آن هم رشد می‌کند. برای کاهش این پیچیدگی و نگه داشتن تمام منطق در یک مکان با دسترسی آسان، می‌توانید آن منطق استیت را در یک تابع واحد خارج از کامپوننت خود منتقل کنید، **که «ردیوسر» نامیده می‌شود.**

ردیوسرها روش متفاوتی برای مدیریت استیت هستند. می‌توانید در سه گام از `useState` به `useReducer` مهاجرت کنید:

1. **منتقل کنید** از تنظیم استیت به دیسپچ کردن اکشن‌ها.
2. **بنویسید** یک تابع ردیوسر.
3. **استفاده کنید** از ردیوسر در کامپوننت خود.

### گام ۱: از تنظیم استیت به دیسپچ کردن اکشن‌ها منتقل شوید {/*step-1-move-from-setting-state-to-dispatching-actions*/}

مدیریت‌کننده‌های رویداد شما در حال حاضر با تنظیم استیت مشخص می‌کنند _چه کاری انجام دهند_:

```js
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ]);
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    })
  );
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId));
}
```

تمام منطق تنظیم استیت را حذف کنید. آنچه باقی می‌مانند سه مدیریت‌کنندهٔ رویداد است:

- `handleAddTask(text)` وقتی کاربر «Add» را می‌زند فراخوانی می‌شود.
- `handleChangeTask(task)` وقتی کاربر یک کار را تغییر می‌دهد یا «Save» را می‌زند فراخوانی می‌شود.
- `handleDeleteTask(taskId)` وقتی کاربر «Delete» را می‌زند فراخوانی می‌شود.

مدیریت استیت با ردیوسرها کمی متفاوت از تنظیم مستقیم استیت است. به‌جای اینکه با تنظیم استیت به ری‌اکت بگویید «چه کار کنید»، شما با دیسپچ کردن «اکشن‌ها» از مدیریت‌کننده‌های رویداد خود «کاربر چه کرد» را مشخص می‌کنید. (منطق به‌روزرسانی استیت جای دیگری خواهد بود!) پس به‌جای «تنظیم `tasks`» از طریق یک مدیریت‌کنندهٔ رویداد، شما یک اکشن «یک کار اضافه/تغییر/حذف شد» را دیسپچ می‌کنید. این قصد کاربر را توصیفی‌تر می‌کند.

```js
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
    task: task,
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
```

شیئی که به `dispatch` پاس می‌دهید «اکشن» نامیده می‌شود:

```js {3-7}
function handleDeleteTask(taskId) {
  dispatch(
    // "action" object:
    {
      type: 'deleted',
      id: taskId,
    }
  );
}
```

این یک شیء جاوااسکریپت معمولی است. شما تصمیم می‌گیرید چه چیزی در آن بگذارید، اما عموماً باید شامل حداقل اطلاعات دربارهٔ _آنچه رخ داد_ باشد. (تابع `dispatch` را خودتان در یک گام بعدی اضافه خواهید کرد.)

<Note>

یک شیء اکشن می‌تواند هر شکلی داشته باشد.

طبق قرارداد، رایج است که به آن یک `type` رشته‌ای بدهید که توصیف می‌کند چه اتفاقی افتاده، و هر اطلاعات اضافی را در فیلدهای دیگر پاس دهید. `type` به کامپوننت خاص است، پس در این مثال هم `'added'` هم `'added_task'` خوب است. نامی انتخاب کنید که بگوید چه اتفاقی افتاده!

```js
dispatch({
  // specific to component
  type: 'what_happened',
  // other fields go here
});
```

</Note>

### گام ۲: یک تابع ردیوسر بنویسید {/*step-2-write-a-reducer-function*/}

تابع ردیوسر جایی است که منطق استیت خود را می‌گذارید. این تابع دو آرگومان می‌گیرد، استیت کنونی و شیء اکشن، و استیت بعدی را برمی‌گرداند:

```js
function yourReducer(state, action) {
  // return next state for React to set
}
```

ری‌اکت استیت را به آنچه از ردیوسر برمی‌گردانید تنظیم خواهد کرد.

برای منتقل کردن منطق تنظیم استیت از مدیریت‌کننده‌های رویداد خود به یک تابع ردیوسر در این مثال، شما:

1. استیت کنونی (`tasks`) را به‌عنوان آرگومان اول اعلام کنید.
2. شیء `action` را به‌عنوان آرگومان دوم اعلام کنید.
3. استیت _بعدی_ را از ردیوسر برگردانید (که ری‌اکت استیت را به آن تنظیم خواهد کرد).

در اینجا تمام منطق تنظیم استیت که به یک تابع ردیوسر مهاجرت داده شده آمده است:

```js
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
```

چون تابع ردیوسر استیت (`tasks`) را به‌عنوان آرگومان می‌گیرد، می‌توانید آن را **خارج از کامپوننت خود اعلام کنید.** این سطح تورفتگی را کاهش می‌دهد و می‌تواند خواندن کدتان را آسان‌تر کند.

<Note>

کد بالا از دستورات if/else استفاده می‌کند، اما استفاده از [دستورات switch](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/switch) داخل ردیوسرها قرارداد است. نتیجه یکسان است، اما خواندن دستورات switch با یک نگاه می‌تواند آسان‌تر باشد.

ما در بقیهٔ این مستندات از آن‌ها به این شکل استفاده خواهیم کرد:

```js
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

توصیه می‌کنیم هر بلوک `case` را در آکولادهای `{` و `}` بپیچید تا متغیرهای اعلام‌شده داخل `case`های متفاوت با هم تداخل نداشته باشند. همچنین، یک `case` عموماً باید با `return` تمام شود. اگر `return` را فراموش کنید، کد «به case بعدی می‌افتد»، که می‌تواند منجر به اشتباهات شود!

اگر هنوز با دستورات switch راحت نیستید، استفاده از if/else کاملاً اشکالی ندارد.

</Note>

<DeepDive>

#### چرا ردیوسرها این‌طور نام‌گذاری شده‌اند؟ {/*why-are-reducers-called-this-way*/}

اگرچه ردیوسرها می‌توانند «مقدار» کد داخل کامپوننت شما را «کاهش» دهند، آن‌ها در واقع بر اساس عملکرد [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) نام‌گذاری شده‌اند که می‌توانید روی آرایه‌ها انجام دهید.

عملکرد `reduce()` به شما اجازه می‌دهد یک آرایه بگیرید و یک مقدار واحد را از چند مقدار «انباشته» کنید:

```
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
```

تابعی که به `reduce` پاس می‌دهید به‌عنوان «ردیوسر» شناخته می‌شود. این تابع _نتیجهٔ تا الان_ و _آیتم کنونی_ را می‌گیرد، سپس _نتیجهٔ بعدی_ را برمی‌گرداند. ردیوسرهای ری‌اکت نمونه‌ای از همان ایده هستند: آن‌ها _استیت تا الان_ و _اکشن_ را می‌گیرند، و _استیت بعدی_ را برمی‌گردانند. به این ترتیب، آن‌ها اکشن‌ها را در طول زمان به استیت انباشته می‌کنند.

حتی می‌توانستید از متد `reduce()` با یک `initialState` و یک آرایه از `actions` برای محاسبهٔ استیت نهایی با پاس دادن تابع ردیوسر خود به آن استفاده کنید:

<Sandpack>

```js src/index.js active
import tasksReducer from './tasksReducer.js';

let initialState = [];
let actions = [
  {type: 'added', id: 1, text: 'Visit Kafka Museum'},
  {type: 'added', id: 2, text: 'Watch a puppet show'},
  {type: 'deleted', id: 1},
  {type: 'added', id: 3, text: 'Lennon Wall pic'},
];

let finalState = actions.reduce(tasksReducer, initialState);

const output = document.getElementById('output');
output.textContent = JSON.stringify(finalState, null, 2);
```

```js src/tasksReducer.js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```html public/index.html
<pre id="output"></pre>
```

</Sandpack>

احتمالاً لازم نباشد این کار را خودتان انجام دهید، اما این شبیه به کاری است که ری‌اکت انجام می‌دهد!

</DeepDive>

### گام ۳: از ردیوسر در کامپوننت خود استفاده کنید {/*step-3-use-the-reducer-from-your-component*/}

در نهایت، لازم است `tasksReducer` را به کامپوننت خود متصل کنید. هوک `useReducer` را از ری‌اکت وارد کنید:

```js
import { useReducer } from 'react';
```

سپس می‌توانید `useState` را:

```js
const [tasks, setTasks] = useState(initialTasks);
```

با `useReducer` به این شکل جایگزین کنید:

```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

هوک `useReducer` شبیه `useState` است—باید یک استیت اولیه به آن پاس دهید و یک مقدار استیت‌دار و روشی برای تنظیم استیت (در این مورد، تابع dispatch) برمی‌گرداند. اما کمی متفاوت است.

هوک `useReducer` دو آرگومان می‌گیرد:

1. یک تابع ردیوسر
2. یک استیت اولیه

و برمی‌گرداند:

1. یک مقدار استیت‌دار
2. یک تابع dispatch (برای «دیسپچ» کردن اکشن‌های کاربر به ردیوسر)

حالا کاملاً متصل است! در اینجا، ردیوسر در پایین فایل کامپوننت اعلام شده است:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

اگر می‌خواهید، حتی می‌توانید ردیوسر را به یک فایل متفاوت منتقل کنید:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js src/tasksReducer.js
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
```

</Sandpack>

منطق کامپوننت می‌تواند آسان‌تر خوانده شود وقتی دغدغه‌ها را به این شکل جدا می‌کنید. حالا مدیریت‌کننده‌های رویداد فقط با دیسپچ کردن اکشن‌ها _آنچه رخ داد_ را مشخص می‌کنند، و تابع ردیوسر تعیین می‌کند _استیت چگونه به‌روز می‌شود_ در پاسخ به آن‌ها.

## مقایسهٔ `useState` و `useReducer` {/*comparing-usestate-and-usereducer*/}

ردیوسرها بی‌نقص نیستند! در اینجا چند روش برای مقایسهٔ آن‌ها آمده است:

- **اندازهٔ کد:** عموماً، با `useState` باید کد کمتری از ابتدا بنویسید. با `useReducer`، باید هم تابع ردیوسر را بنویسید _هم_ اکشن‌ها را دیسپچ کنید. با این حال، `useReducer` می‌تواند به کاهش کد کمک کند اگر بسیاری از مدیریت‌کننده‌های رویداد استیت را به‌شکل مشابهی تغییر دهند.
- **خوانایی:** `useState` وقتی به‌روزرسانی‌های استیت ساده هستند خیلی آسان خوانده می‌شود. وقتی پیچیده‌تر می‌شوند، می‌توانند کد کامپوننت شما را متورم کنند و اسکن کردن آن را دشوار کنند. در این مورد، `useReducer` به شما اجازه می‌دهد _چگونگی_ منطق به‌روزرسانی را از _آنچه رخ داد_ مدیریت‌کننده‌های رویداد به‌تمیزی جدا کنید.
- **دیباگ:** وقتی با `useState` باگی دارید، می‌تواند دشوار باشد بگویید _کجا_ استیت اشتباه تنظیم شده، و _چرا_. با `useReducer`، می‌توانید یک لاگ کنسول به ردیوسر خود اضافه کنید تا هر به‌روزرسانی استیت و _چرایی_ آن (به‌دلیل کدام `action`) را ببینید. اگر هر `action` درست باشد، خواهید دانست که اشتباه در منطق خود ردیوسر است. با این حال، باید کد بیشتری را نسبت به `useState` گام‌به‌گام طی کنید.
- **آزمایش:** ردیوسر یک تابع خالص است که به کامپوننت شما وابسته نیست. این یعنی می‌توانید آن را جداگانه و به‌صورت ایزوله آزمایش کنید. اگرچه عموماً بهتر است کامپوننت‌ها در محیط واقع‌بینانه‌تری آزمایش شوند، برای منطق پیچیدهٔ به‌روزرسانی استیت می‌تواند مفید باشد که تأیید کنید ردیوسر شما برای یک استیت اولیه و اکشن خاص، استیت خاصی برمی‌گرداند.
- **ترجیح شخصی:** برخی افراد ردیوسرها را دوست دارند، دیگران نه. این اشکالی ندارد. این مسئلهٔ ترجیح است. شما همیشه می‌توانید بین `useState` و `useReducer` به‌عقب و جلو تبدیل کنید: آن‌ها معادل هستند!

توصیه می‌کنیم از ردیوسر استفاده کنید اگر اغلب به‌دلیل به‌روزرسانی‌های نادرست استیت در برخی کامپوننت‌ها با باگ مواجه می‌شوید، و می‌خواهید ساختار بیشتری به کد آن وارد کنید. لازم نیست برای همه‌چیز از ردیوسرها استفاده کنید: آزادید آن‌ها را ترکیب کنید! حتی می‌توانید `useState` و `useReducer` را در همان کامپوننت استفاده کنید.

## نوشتن ردیوسرها به‌خوبی {/*writing-reducers-well*/}

هنگام نوشتن ردیوسرها این دو نکته را در نظر داشته باشید:

- **ردیوسرها باید خالص باشند.** شبیه [توابع به‌روزرسان استیت](/learn/queueing-a-series-of-state-updates)، ردیوسرها در طول رندر اجرا می‌شوند! (اکشن‌ها تا رندر بعدی در صف قرار می‌گیرند.) این یعنی ردیوسرها [باید خالص باشند](/learn/keeping-components-pure)—ورودی‌های یکسان همیشه به خروجی یکسان منجر می‌شوند. آن‌ها نباید درخواست بفرستند، تایم‌اوت زمان‌بندی کنند، یا هیچ عارضهٔ جانبی انجام دهند (عملیاتی که روی چیزهای خارج از کامپوننت تأثیر بگذارد). آن‌ها باید [اشیاء](/learn/updating-objects-in-state) و [آرایه‌ها](/learn/updating-arrays-in-state) را بدون جهش به‌روز کنند.
- **هر اکشن یک تعامل واحد کاربر را توصیف می‌کند، حتی اگر منجر به چندین تغییر در داده‌ها شود.** مثلاً، اگر کاربر «Reset» را روی فرمی با پنج فیلد که توسط یک ردیوسر مدیریت می‌شود بزند، معنادارتر است که یک اکشن `reset_form` دیسپچ کنید به‌جای پنج اکشن `set_field` مجزا. اگر هر اکشن را در یک ردیوسر لاگ کنید، آن لاگ باید آن‌قدر روشن باشد که بتوانید بازسازی کنید چه تعاملات یا پاسخ‌هایی به چه ترتیبی رخ دادند. این به دیباگ کمک می‌کند!

## نوشتن ردیوسرهای موجز با Immer {/*writing-concise-reducers-with-immer*/}

درست مثل [به‌روزرسانی اشیاء](/learn/updating-objects-in-state#write-concise-update-logic-with-immer) و [آرایه‌ها](/learn/updating-arrays-in-state#write-concise-update-logic-with-immer) در استیت معمولی، می‌توانید از کتابخانهٔ Immer برای موجزتر کردن ردیوسرها استفاده کنید. در اینجا، [`useImmerReducer`](https://github.com/immerjs/use-immer#useimmerreducer) به شما اجازه می‌دهد استیت را با `push` یا انتساب `arr[i] =` جهش دهید:

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
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

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
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
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
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
```

```js src/AddTask.js hidden
import { useState } from 'react';

export default function AddTask({onAddTask}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}
```

```js src/TaskList.js hidden
import { useState } from 'react';

export default function TaskList({tasks, onChangeTask, onDeleteTask}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({task, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
```

```css
button {
  margin: 5px;
}
li {
  list-style-type: none;
}
ul,
li {
  margin: 0;
  padding: 0;
}
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

ردیوسرها باید خالص باشند، پس نباید استیت را جهش دهند. اما Immer یک شیء `draft` خاص به شما فراهم می‌کند که جهش دادن آن امن است. در زیر هود، Immer یک کپی از استیت شما با تغییراتی که به `draft` دادید ایجاد می‌کند. به همین دلیل است که ردیوسرهای مدیریت‌شده توسط `useImmerReducer` می‌توانند آرگومان اول خود را جهش دهند و نیازی ندارند استیت را برگردانند.

<Recap>

- برای تبدیل از `useState` به `useReducer`:
  1. اکشن‌ها را از مدیریت‌کننده‌های رویداد دیسپچ کنید.
  2. یک تابع ردیوسر بنویسید که برای یک استیت و اکشن داده‌شده، استیت بعدی را برمی‌گرداند.
  3. `useState` را با `useReducer` جایگزین کنید.
- ردیوسرها نیازمند این هستند که کمی کد بیشتر بنویسید، اما به دیباگ و آزمایش کمک می‌کنند.
- ردیوسرها باید خالص باشند.
- هر اکشن یک تعامل واحد کاربر را توصیف می‌کند.
- اگر می‌خواهید ردیوسرها را به سبک جهش‌دهنده بنویسید از Immer استفاده کنید.

</Recap>

<Challenges>

#### دیسپچ کردن اکشن‌ها از مدیریت‌کننده‌های رویداد {/*dispatch-actions-from-event-handlers*/}

در حال حاضر، مدیریت‌کننده‌های رویداد در `ContactList.js` و `Chat.js` کامنت‌های `// TODO` دارند. به همین دلیل تایپ در ورودی کار نمی‌کند، و کلیک روی دکمه‌ها گیرندهٔ انتخاب‌شده را تغییر نمی‌دهد.

این دو `// TODO` را با کد برای `dispatch` کردن اکشن‌های متناظر جایگزین کنید. برای دیدن شکل و نوع مورد انتظار اکشن‌ها، ردیوسر در `messengerReducer.js` را بررسی کنید. ردیوسر از قبل نوشته شده پس لازم نیست آن را تغییر دهید. فقط لازم است اکشن‌ها را در `ContactList.js` و `Chat.js` دیسپچ کنید.

<Hint>

تابع `dispatch` از قبل در هر دوی این کامپوننت‌ها در دسترس است زیرا به‌عنوان یک پراپ پاس داده شده. پس باید `dispatch` را با شیء اکشن متناظر فراخوانی کنید.

برای بررسی شکل شیء اکشن، می‌توانید به ردیوسر نگاه کنید و ببینید کدام فیلدهای `action` انتظار می‌رود. مثلاً، case `changed_selection` در ردیوسر مثل این است:

```js
case 'changed_selection': {
  return {
    ...state,
    selectedId: action.contactId
  };
}
```

این یعنی شیء اکشن شما باید `type: 'changed_selection'` داشته باشد. همچنین `action.contactId` استفاده می‌شود، پس باید یک ویژگی `contactId` در اکشن خود وارد کنید.

</Hint>

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                // TODO: dispatch changed_selection
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          // TODO: dispatch edited_message
          // (Read the input value from e.target.value)
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

<Solution>

از کد ردیوسر، می‌توانید استنتاج کنید که اکشن‌ها باید مثل این باشند:

```js
// When the user presses "Alice"
dispatch({
  type: 'changed_selection',
  contactId: 1,
});

// When user types "Hello!"
dispatch({
  type: 'edited_message',
  message: 'Hello!',
});
```

در اینجا مثال به‌روزشده برای دیسپچ کردن پیام‌های متناظر آمده است:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

</Solution>

#### پاک کردن ورودی هنگام ارسال پیام {/*clear-the-input-on-sending-a-message*/}

در حال حاضر، زدن «Send» کاری نمی‌کند. یک مدیریت‌کنندهٔ رویداد به دکمهٔ «Send» اضافه کنید که:

1. یک `alert` با ایمیل گیرنده و پیام نشان دهد.
2. ورودی پیام را پاک کند.

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

<Solution>

چند راه برای انجام این کار در مدیریت‌کنندهٔ رویداد دکمهٔ «Send» وجود دارد. یک رویکرد این است که یک alert نشان دهید و سپس یک اکشن `edited_message` با `message` خالی دیسپچ کنید:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'edited_message',
            message: '',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

این کار می‌کند و ورودی را وقتی «Send» را می‌زنید پاک می‌کند.

با این حال، _از منظر کاربر_، ارسال یک پیام یک اکشن متفاوت از ویرایش فیلد است. برای منعکس کردن این، می‌توانستید به‌جای آن یک اکشن _جدید_ به نام `sent_message` ایجاد کنید، و آن را جداگانه در ردیوسر مدیریت کنید:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js active
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js active
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

رفتار نهایی یکسان است. اما در نظر داشته باشید که انواع اکشن عموماً باید «کاربر چه کرد» را توصیف کنند نه «چگونه می‌خواهید استیت تغییر کند». این کار را آسان‌تر می‌کند که بعداً ویژگی‌های بیشتری اضافه کنید.

با هر دو راه‌حل، مهم است که `alert` را داخل یک ردیوسر **نگذارید**. ردیوسر باید یک تابع خالص باشد—فقط باید استیت بعدی را محاسبه کند. نباید «کاری انجام دهد»، از جمله نمایش پیام به کاربر. آن باید در مدیریت‌کنندهٔ رویداد رخ دهد. (برای کمک به گرفتن اشتباهاتی مثل این، ری‌اکت در حالت سخت‌گیرانه (Strict Mode) ردیوسرهای شما را چندین بار فراخوانی می‌کند. به همین دلیل است که اگر یک alert در ردیوسر بگذارید، دو بار اجرا می‌شود.)

</Solution>

#### بازگرداندن مقادیر ورودی هنگام تعویض بین زبانه‌ها {/*restore-input-values-when-switching-between-tabs*/}

در این مثال، تعویض بین گیرنده‌های متفاوت همیشه ورودی متن را پاک می‌کند:

```js
case 'changed_selection': {
  return {
    ...state,
    selectedId: action.contactId,
    message: '' // Clears the input
  };
```

این به‌دلیل آن است که نمی‌خواهید یک پیش‌نویس پیام واحد را بین چند گیرنده به اشتراک بگذارید. اما بهتر بود اگر اپلیکیشن شما یک پیش‌نویس را برای هر مخاطب جداگانه «به‌یاد می‌آورد»، و آن‌ها را وقتی مخاطبین را تعویض می‌کنید بازگردانی می‌کرد.

وظیفهٔ شما این است که روشی که استیت ساختاردهی شده را تغییر دهید تا یک پیش‌نویس پیام جداگانه _به‌ازای هر مخاطب_ را به‌یاد بیاورید. لازم است چند تغییر به ردیوسر، استیت اولیه، و کامپوننت‌ها بدهید.

<Hint>

می‌توانید استیت خود را مثل این ساختاردهی کنید:

```js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor', // Draft for contactId = 0
    1: 'Hello, Alice', // Draft for contactId = 1
  },
};
```

سینتکس [ویژگی محاسبه‌شده](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names) `[key]: value` می‌تواند به شما در به‌روزرسانی شیء `messages` کمک کند:

```js
{
  ...state.messages,
  [id]: message
}
```

</Hint>

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.message;
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  message: 'Hello',
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      };
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      };
    }
    case 'sent_message': {
      return {
        ...state,
        message: '',
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

<Solution>

لازم است ردیوسر را به‌روز کنید تا یک پیش‌نویس پیام جداگانه به‌ازای هر مخاطب ذخیره و به‌روز کند:

```js
// When the input is edited
case 'edited_message': {
  return {
    // Keep other state like selection
    ...state,
    messages: {
      // Keep messages for other contacts
      ...state.messages,
      // But change the selected contact's message
      [state.selectedId]: action.message
    }
  };
}
```

همچنین کامپوننت `Messenger` را به‌روز می‌کنید تا پیام را برای مخاطب انتخاب‌شدهٔ کنونی بخواند:

```js
const message = state.messages[state.selectedId];
```

در اینجا راه‌حل کامل آمده است:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

شایان ذکر است که لازم نبود هیچ‌کدام از مدیریت‌کننده‌های رویداد را برای پیاده‌سازی این رفتار متفاوت تغییر دهید. بدون ردیوسر، مجبور بودید هر مدیریت‌کنندهٔ رویدادی که استیت را به‌روز می‌کند تغییر دهید.

</Solution>

#### پیاده‌سازی `useReducer` از صفر {/*implement-usereducer-from-scratch*/}

در مثال‌های قبلی، هوک `useReducer` را از ری‌اکت وارد کردید. این بار، _خود هوک `useReducer` را پیاده‌سازی می‌کنید!_ در اینجا یک اسکلت برای شروع شما آمده است. نباید بیش از ۱۰ خط کد نیاز داشته باشد.

برای آزمایش تغییراتتان، تایپ در ورودی را امتحان کنید یا یک مخاطب انتخاب کنید.

<Hint>

در اینجا یک طرح کلی دقیق‌تر از پیاده‌سازی آمده است:

```js
export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    // ???
  }

  return [state, dispatch];
}
```

به یاد بیاورید که تابع ردیوسر دو آرگومان می‌گیرد—استیت کنونی و شیء اکشن—و استیت بعدی را برمی‌گرداند. پیاده‌سازی `dispatch` شما باید چه کاری با آن انجام دهد؟

</Hint>

<Sandpack>

```js src/App.js
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/MyReact.js active
import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  // ???

  return [state, dispatch];
}
```

```js src/ContactList.js hidden
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js hidden
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

<Solution>

دیسپچ کردن یک اکشن، ردیوسر را با استیت کنونی و اکشن فراخوانی می‌کند، و نتیجه را به‌عنوان استیت بعدی ذخیره می‌کند. این چیزی است که در کد به‌نظر می‌رسد:

<Sandpack>

```js src/App.js
import { useReducer } from './MyReact.js';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  const message = state.messages[state.selectedId];
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```

```js src/messengerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
```

```js src/MyReact.js active
import { useState } from 'react';

export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

```js src/ContactList.js hidden
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

```js src/Chat.js hidden
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`Sending "${message}" to ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        Send to {contact.email}
      </button>
    </section>
  );
}
```

```css
.chat,
.contact-list {
  float: left;
  margin-bottom: 20px;
}
ul,
li {
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

اگرچه در بیشتر موارد مهم نیست، یک پیاده‌سازی کمی دقیق‌تر مثل این است:

```js
function dispatch(action) {
  setState((s) => reducer(s, action));
}
```

این به‌دلیل آن است که اکشن‌های دیسپچ‌شده تا رندر بعدی در صف قرار می‌گیرند، [شبیه به توابع به‌روزرسان.](/learn/queueing-a-series-of-state-updates)

</Solution>

</Challenges>
