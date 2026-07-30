---
title: globals
---

<Intro>

انتساب/تغییر متغیرهای سراسری در طول رندر را اعتبارسنجی می‌کند، که بخشی از تضمین [اینکه عوارض جانبی باید خارج از رندر اجرا شوند](/reference/rules/components-and-hooks-must-be-pure#side-effects-must-run-outside-of-render) است.

</Intro>

## جزئیات قانون {/*rule-details*/}

متغیرهای سراسری خارج از کنترل ری‌اکت وجود دارند. وقتی آن‌ها را در طول رندر تغییر می‌دهید، فرض ری‌اکت مبنی بر اینکه رندر خالص است را می‌شکنید. این می‌تواند باعث شود کامپوننت‌ها در توسعه در برابر production متفاوت رفتار کنند، Fast Refresh را بشکند، و اپ شما را برای بهینه‌سازی با قابلیت‌هایی مانند React Compiler غیرممکن سازد.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Global counter
let renderCount = 0;
function Component() {
  renderCount++; // Mutating global
  return <div>Count: {renderCount}</div>;
}

// ❌ Modifying window properties
function Component({userId}) {
  window.currentUser = userId; // Global mutation
  return <div>User: {userId}</div>;
}

// ❌ Global array push
const events = [];
function Component({event}) {
  events.push(event); // Mutating global array
  return <div>Events: {events.length}</div>;
}

// ❌ Cache manipulation
const cache = {};
function Component({id}) {
  if (!cache[id]) {
    cache[id] = fetchData(id); // Modifying cache during render
  }
  return <div>{cache[id]}</div>;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Use state for counters
function Component() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(c => c + 1);
  };

  return (
    <button onClick={handleClick}>
      Clicked: {clickCount} times
    </button>
  );
}

// ✅ Use context for global values
function Component() {
  const user = useContext(UserContext);
  return <div>User: {user.id}</div>;
}

// ✅ Synchronize external state with React
function Component({title}) {
  useEffect(() => {
    document.title = title; // OK in effect
  }, [title]);

  return <div>Page: {title}</div>;
}
```
