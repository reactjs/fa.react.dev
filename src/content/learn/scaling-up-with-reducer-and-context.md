---
title: مقیاس‌پذیری با ردیوسر و کانتکست
---

<Intro>

ردیوسرها به شما اجازه می‌دهند منطق به‌روزرسانی استیت یک کامپوننت را تجمیع کنید. کانتکست به شما اجازه می‌دهد اطلاعات را عمیقاً به کامپوننت‌های دیگر منتقل کنید. می‌توانید ردیوسرها و کانتکست را با هم ترکیب کنید تا استیت یک صفحهٔ پیچیده را مدیریت کنید.

</Intro>

<YouWillLearn>

* چگونه یک ردیوسر را با کانتکست ترکیب کنید
* چگونه از پاس‌دادن استیت و dispatch از طریق پراپس‌ها جلوگیری کنید
* چگونه منطق کانتکست و استیت را در یک فایل جداگانه نگه دارید

</YouWillLearn>

## ترکیب ردیوسر با کانتکست {/*combining-a-reducer-with-context*/}

در این مثال از [مقدمه‌ای بر ردیوسرها](/learn/extracting-state-logic-into-a-reducer)، استیت توسط یک ردیوسر مدیریت می‌شود. تابع ردیوسر شامل تمام منطق به‌روزرسانی استیت است و در انتهای این فایل تعریف شده است:

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
      <h1>Day off in Kyoto</h1>
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
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/AddTask.js
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

```js src/TaskList.js
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

یک ردیوسر کمک می‌کند مدیرکننده‌های رویداد کوتاه و موج نگه داشته شوند. با این حال، با رشد برنامه‌تان، ممکن است به مشکل دیگری بربخورید. **در حال حاضر، استیت `tasks` و تابع `dispatch` فقط در کامپوننت `TaskApp` در بالاترین سطح در دسترس هستند.** برای اینکه به کامپوننت‌های دیگر اجازه دهید لیست tasks را بخوانند یا تغییر دهند، باید استیت فعلی و مدیرکننده‌های رویدادی که آن را تغییر می‌دهند را به‌صورت پراپس به پایین [پاس دهید](/learn/passing-props-to-a-component).

برای مثال، `TaskApp` لیست tasks و مدیرکننده‌های رویداد را به `TaskList` پاس می‌دهد:

```js
<TaskList
  tasks={tasks}
  onChangeTask={handleChangeTask}
  onDeleteTask={handleDeleteTask}
/>
```

و `TaskList` مدیرکننده‌های رویداد را به `Task` پاس می‌دهد:

```js
<Task
  task={task}
  onChange={onChangeTask}
  onDelete={onDeleteTask}
/>
```

در مثال کوچکی مانند این، این روش خوب کار می‌کند، اما اگر ده‌ها یا صدها کامپوننت در میان وجود داشته باشد، پاس‌دادن همهٔ استیت و توابع می‌تواند بسیار کلافه‌کننده باشد!

به همین دلیل، به‌عنوان جایگزینی برای پاس‌دادن آن‌ها از طریق پراپس، ممکن است بخواهید هم استیت `tasks` و هم تابع `dispatch` را [در کانتکست قرار دهید.](/learn/passing-data-deeply-with-context) **این‌طور، هر کامپوننتی زیر `TaskApp` در درخت می‌تواند tasks را بخواند و اکشن‌ها را dispatch کند بدون «prop drilling» تکراری.**

در اینجا نحوهٔ ترکیب یک ردیوسر با کانتکست آمده است:

1. کانتکست را **ایجاد** کنید.
2. استیت و dispatch را **در** کانتکست قرار دهید.
3. از کانتکست در هر جایی از درخت **استفاده** کنید.

### مرحلهٔ ۱: ایجاد کانتکست {/*step-1-create-the-context*/}

هوک `useReducer` استیت `tasks` فعلی و تابع `dispatch` که به شما اجازه می‌دهد آن‌ها را به‌روزرسانی کنید را برمی‌گرداند:

```js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

برای پاس‌دادن آن‌ها به پایین درخت، [ایجاد](/learn/passing-data-deeply-with-context#step-2-use-the-context) دو کانتکست جداگانه می‌کنید:

- `TasksContext` لیست فعلی tasks را فراهم می‌کند.
- `TasksDispatchContext` تابعی را فراهم می‌کند که به کامپوننت‌ها اجازه می‌دهد اکشن‌ها را dispatch کنند.

آن‌ها را از یک فایل جداگانه اکسپورت کنید تا بعداً بتوانید از فایل‌های دیگر ایمپورت کنید:

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
      <h1>Day off in Kyoto</h1>
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
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/TasksContext.js active
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

```js src/AddTask.js
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

```js src/TaskList.js
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

اینجا، شما `null` را به‌عنوان مقدار پیش‌فرض به هر دو کانتکست پاس می‌دهید. مقادیر واقعی توسط کامپوننت `TaskApp` فراهم خواهند شد.

### مرحلهٔ ۲: قرار دادن استیت و dispatch در کانتکست {/*step-2-put-state-and-dispatch-into-context*/}

حالا می‌توانید هر دو کانتکست را در کامپوننت `TaskApp` خود ایمپورت کنید. `tasks` و `dispatch` برگردانده‌شده توسط `useReducer()` را بردارید و آن‌ها را به کل درخت زیر [فراهم کنید](/learn/passing-data-deeply-with-context#step-3-provide-the-context):

```js {4,7-8}
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        ...
      </TasksDispatchContext>
    </TasksContext>
  );
}
```

فعلاً، اطلاعات را هم از طریق پراپس و هم در کانتکست پاس می‌دهید:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

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
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask
          onAddTask={handleAddTask}
        />
        <TaskList
          tasks={tasks}
          onChangeTask={handleChangeTask}
          onDeleteTask={handleDeleteTask}
        />
      </TasksDispatchContext>
    </TasksContext>
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
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/TasksContext.js
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

```js src/AddTask.js
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

```js src/TaskList.js
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

در مرحلهٔ بعد، پاس‌دادن پراپس را حذف خواهید کرد.

### مرحلهٔ ۳: استفاده از کانتکست در هر جایی از درخت {/*step-3-use-context-anywhere-in-the-tree*/}

حالا نیازی به پاس‌دادن لیست tasks یا مدیرکننده‌های رویداد به پایین درخت ندارید:

```js {4-5}
<TasksContext value={tasks}>
  <TasksDispatchContext value={dispatch}>
    <h1>Day off in Kyoto</h1>
    <AddTask />
    <TaskList />
  </TasksDispatchContext>
</TasksContext>
```

در عوض، هر کامپوننتی که به لیست tasks نیاز دارد می‌تواند آن را از `TasksContext` بخواند:

```js {2}
export default function TaskList() {
  const tasks = useContext(TasksContext);
  // ...
```

برای به‌روزرسانی لیست tasks، هر کامپوننت می‌تواند تابع `dispatch` را از کانتکست بخواند و آن را فراخوانی کند:

```js {3,9-13}
export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
```

**کامپوننت `TaskApp` هیچ مدیرکنندهٔ رویدادی را به پایین پاس نمی‌دهد، و `TaskList` نیز هیچ مدیرکنندهٔ رویدادی را به کامپوننت `Task` پاس نمی‌دهد.** هر کامپوننت کانتکستی که نیاز دارد را می‌خواند:

<Sandpack>

```js src/App.js
import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext>
    </TasksContext>
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

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
```

```js src/TasksContext.js
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

```js src/AddTask.js
import { useState, useContext } from 'react';
import { TasksDispatchContext } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
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

```js src/TaskList.js active
import { useState, useContext } from 'react';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
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
  const dispatch = useContext(TasksDispatchContext);
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

**استیت همچنان در کامپوننت `TaskApp` در بالاترین سطح «زندگی می‌کند» و با `useReducer` مدیریت می‌شود.** اما `tasks` و `dispatch` آن حالا با ایمپورت و استفاده از این کانتکست‌ها برای هر کامپوننت در پایین درخت در دسترس هستند.

## انتقال همهٔ سیم‌کشی‌ها به یک فایل واحد {/*moving-all-wiring-into-a-single-file*/}

لازم نیست این کار را انجام دهید، اما می‌توانید با انتقال هم ردیوسر و هم کانتکست به یک فایل واحد، کامپوننت‌ها را بیشتر از شلوغی خلاص کنید. در حال حاضر، `TasksContext.js` فقط شامل دو تعریف کانتکست است:

```js
import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);
```

این فایل در شرف شلوغ شدن است! ردیوسر را به همان فایل منتقل می‌کنید. سپس یک کامپوننت جدید `TasksProvider` را در همان فایل تعریف می‌کنید. این کامپوننت تمام تکه‌ها را به هم وصل می‌کند:

1. استیت را با یک ردیوسر مدیریت می‌کند.
2. هر دو کانتکست را به کامپوننت‌های زیر فراهم می‌کند.
3. [`children` را به‌عنوان یک پراپس می‌گیرد](/learn/passing-props-to-a-component#passing-jsx-as-children) تا بتوانید JSX را به آن پاس دهید.

```js
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}
```

**این تمام پیچیدگی و سیم‌کشی را از کامپوننت `TaskApp` شما حذف می‌کند:**

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
import { createContext, useReducer } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

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
import { TasksDispatchContext } from './TasksContext.js';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
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
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
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
  const dispatch = useContext(TasksDispatchContext);
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

همچنین می‌توانید توابعی که از کانتکست _استفاده_ می‌کنند را از `TasksContext.js` اکسپورت کنید:

```js
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

وقتی یک کامپوننت نیاز دارد کانتکست را بخواند، می‌تواند این کار را از طریق این توابع انجام دهد:

```js
const tasks = useTasks();
const dispatch = useTasksDispatch();
```

این رفتار را به هیچ وجه تغییر نمی‌دهد، اما به شما اجازه می‌دهد بعداً این کانتکست‌ها را بیشتر تقسیم کنید یا مقداری منطق به این توابع اضافه کنید. **حالا تمام سیم‌کشی کانتکست و ردیوسر در `TasksContext.js` است. این کار کامپوننت‌ها را تمیز و بدون شلوغی نگه می‌دارد، و روی آنچه نمایش می‌دهند متمرکز می‌کند نه روی اینکه داده را از کجا می‌گیرند:**

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
import { useState } from 'react';
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

```js src/TaskList.js active
import { useState } from 'react';
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

می‌توانید `TasksProvider` را به‌عنوان بخشی از صفحه که می‌داند چگونه با tasks کار کند، `useTasks` را به‌عنوان راهی برای خواندن آن‌ها، و `useTasksDispatch` را به‌عنوان راهی برای به‌روزرسانی آن‌ها از هر کامپوننتی در پایین درخت در نظر بگیرید.

<Note>

توابعی مانند `useTasks` و `useTasksDispatch` *[Custom Hooks](/learn/reusing-logic-with-custom-hooks)* (هوک‌های سفارشی) نامیده می‌شوند. اگر نام تابع شما با `use` شروع شود، به‌عنوان یک هوک سفارشی در نظر گرفته می‌شود. این به شما اجازه می‌دهد از هوک‌های دیگر، مانند `useContext`، درون آن استفاده کنید.

</Note>

با رشد برنامه‌تان، ممکن است بسیاری از جفت‌های کانتکست-ردیوسر مانند این داشته باشید. این یک روش قدرتمند برای مقیاس‌پذیری برنامه‌تان و [بالا بردن استیت (lift state up)](/learn/sharing-state-between-components) بدون کار زیاد هر زمان که می‌خواهید به داده‌های عمیق در درخت دسترسی داشته باشید، است.

<Recap>

- می‌توانید ردیوسر را با کانتکست ترکیب کنید تا به هر کامپوننتی اجازه دهید استیت بالای خود را بخواند و به‌روزرسانی کند.
- برای فراهم کردن استیت و تابع dispatch به کامپوننت‌های زیر:
  1. دو کانتکست ایجاد کنید (یکی برای استیت و یکی برای توابع dispatch).
  2. هر دو کانتکست را از کامپوننتی که از ردیوسر استفاده می‌کند فراهم کنید.
  3. از هر کدام از کانتکست‌ها در کامپوننت‌هایی که نیاز به خواندن آن‌ها دارند استفاده کنید.
- می‌توانید با انتقال تمام سیم‌کشی به یک فایل، کامپوننت‌ها را بیشتر از شلوغی خلاص کنید.
  - می‌توانید کامپوننتی مانند `TasksProvider` که کانتکست را فراهم می‌کند اکسپورت کنید.
  - همچنین می‌توانید هوک‌های سفارشی مانند `useTasks` و `useTasksDispatch` را برای خواندن آن اکسپورت کنید.
- می‌توانید بسیاری از جفت‌های کانتکست-ردیوسر مانند این در برنامه‌تان داشته باشید.

</Recap>
