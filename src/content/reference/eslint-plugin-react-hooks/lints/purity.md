---
title: purity
---

<Intro>

با بررسی اینکه تابع‌های شناخته‌شدهٔ ناخالص را فراخوانی نمی‌کنند، تأیید می‌کند که [کامپوننت‌ها/هوک‌ها خالص هستند](/reference/rules/components-and-hooks-must-be-pure).

</Intro>

## جزئیات قانون {/*rule-details*/}

کامپوننت‌های ری‌اکت باید تابع‌های خالص باشند - با پراپس یکسان، همیشه باید همان JSX را برگردانند. وقتی کامپوننت‌ها در طول رندر از تابع‌هایی مانند `Math.random()` یا `Date.now()` استفاده می‌کنند، هر بار خروجی متفاوتی تولید می‌کنند، و فرضیات ری‌اکت را می‌شکنند و باعث باگ‌هایی مانند عدم تطابق hydration، memoization نادرست، و رفتار غیرقابل پیش‌بینی می‌شوند.

## نقض‌های رایج {/*common-violations*/}

به‌طور کلی، هر API که برای ورودی‌های یکسان مقدار متفاوتی برمی‌گرداند، این قانون را نقض می‌کند. نمونه‌های معمول شامل موارد زیر است:

- `Math.random()`
- `Date.now()` / `new Date()`
- `crypto.randomUUID()`
- `performance.now()`

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Math.random() in render
function Component() {
  const id = Math.random(); // Different every render
  return <div key={id}>Content</div>;
}

// ❌ Date.now() for values
function Component() {
  const timestamp = Date.now(); // Changes every render
  return <div>Created at: {timestamp}</div>;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Stable IDs from initial state
function Component() {
  const [id] = useState(() => crypto.randomUUID());
  return <div key={id}>Content</div>;
}
```

## رفع اشکال {/*troubleshooting*/}

### نیاز به نمایش زمان فعلی دارم {/*current-time*/}

فراخوانی `Date.now()` در طول رندر کامپوننت شما را ناخالص می‌کند:

```js {expectedErrors: {'react-compiler': [3]}}
// ❌ Wrong: Time changes every render
function Clock() {
  return <div>Current time: {Date.now()}</div>;
}
```

در عوض، [تابع ناخالص را به خارج از رندر منتقل کنید](/reference/rules/components-and-hooks-must-be-pure#components-and-hooks-must-be-idempotent):

```js
function Clock() {
  const [time, setTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Current time: {time}</div>;
}
```
