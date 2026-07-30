---
title: immutability
---

<Intro>

تغییر پراپس، استیت و سایر مقادیری که [غیرقابل تغییرند](/reference/rules/components-and-hooks-must-be-pure#props-and-state-are-immutable) را اعتبارسنجی می‌کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

پراپس و استیت یک کامپوننت snapshotهای غیرقابل تغییر هستند. هرگز مستقیماً آن‌ها را تغییر ندهید. در عوض، پراپس‌های جدید را پایین بفرستید، و از تابع setter از `useState` استفاده کنید.

## نقض‌های رایج {/*common-violations*/}

### نامعتبر {/*invalid*/}

```js
// ❌ Array push mutation
function Component() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    items.push(4); // Mutating!
    setItems(items); // Same reference, no re-render
  };
}

// ❌ Object property assignment
function Component() {
  const [user, setUser] = useState({name: 'Alice'});

  const updateName = () => {
    user.name = 'Bob'; // Mutating!
    setUser(user); // Same reference
  };
}

// ❌ Sort without spreading
function Component() {
  const [items, setItems] = useState([3, 1, 2]);

  const sortItems = () => {
    setItems(items.sort()); // sort mutates!
  };
}
```

### معتبر {/*valid*/}

```js
// ✅ Create new array
function Component() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems([...items, 4]); // New array
  };
}

// ✅ Create new object
function Component() {
  const [user, setUser] = useState({name: 'Alice'});

  const updateName = () => {
    setUser({...user, name: 'Bob'}); // New object
  };
}
```

## رفع اشکال {/*troubleshooting*/}

### نیاز به افزودن آیتم‌ها به یک آرایه دارم {/*add-items-array*/}

تغییر آرایه‌ها با متدهایی مانند `push()` رندر مجدد را تحریک نمی‌کند:

```js
// ❌ Wrong: Mutating the array
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (id, text) => {
    todos.push({id, text});
    setTodos(todos); // Same array reference!
  };

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
```

به‌جای آن یک آرایهٔ جدید بسازید:

```js
// ✅ Better: Create a new array
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (id, text) => {
    setTodos([...todos, {id, text}]);
    // Or: setTodos(todos => [...todos, {id: Date.now(), text}])
  };

  return (
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
```

### نیاز به به‌روزرسانی objectهای تودرتو دارم {/*update-nested-objects*/}

تغییر ویژگی‌های تودرتو رندر مجدد را تحریک نمی‌کند:

```js
// ❌ Wrong: Mutating nested object
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Alice',
    settings: {
      theme: 'light',
      notifications: true
    }
  });

  const toggleTheme = () => {
    user.settings.theme = 'dark'; // Mutation!
    setUser(user); // Same object reference
  };
}
```

در هر سطحی که نیاز به به‌روزرسانی دارد spread کنید:

```js
// ✅ Better: Create new objects at each level
function UserProfile() {
  const [user, setUser] = useState({
    name: 'Alice',
    settings: {
      theme: 'light',
      notifications: true
    }
  });

  const toggleTheme = () => {
    setUser({
      ...user,
      settings: {
        ...user.settings,
        theme: 'dark'
      }
    });
  };
}
```
