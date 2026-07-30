---
title: compilationMode
---

<Intro>

گزینهٔ `compilationMode` کنترل می‌کند که React Compiler چگونه تابع‌هایی که باید کامپایل شوند را انتخاب می‌کند.

</Intro>

```js
{
  compilationMode: 'infer' // or 'annotation', 'syntax', 'all'
}
```

<InlineToc />

---

## مرجع {/*reference*/}

### `compilationMode` {/*compilationmode*/}

استراتژی تعیین اینکه کدام تابع‌ها توسط React Compiler بهینه‌سازی شوند را کنترل می‌کند.

#### نوع {/*type*/}

```
'infer' | 'syntax' | 'annotation' | 'all'
```

#### مقدار پیش‌فرض {/*default-value*/}

`'infer'`

#### گزینه‌ها {/*options*/}

- **`'infer'`** (پیش‌فرض): کامپایلر از هیوریستیک‌های هوشمند برای شناسایی کامپوننت‌ها و هوک‌های ری‌اکت استفاده می‌کند:
  - تابع‌هایی که صریحاً با دایرکتیو `"use memo"` علامت‌گذاری شده‌اند
  - تابع‌هایی که نام‌گذاری کامپوننت (PascalCase) یا هوک (پیشوند `use`) دارند و JSX می‌سازند و/یا هوک‌های دیگر را فراخوانی می‌کنند

- **`'annotation'`**: فقط تابع‌هایی که صریحاً با دایرکتیو `"use memo"` علامت‌گذاری شده‌اند را کامپایل می‌کند. برای پذیرش تدریجی ایده‌آل است.

- **`'syntax'`**: فقط کامپوننت‌ها و هوک‌هایی که از سینتکس [component](https://flow.org/en/docs/react/component-syntax/) و [hook](https://flow.org/en/docs/react/hook-syntax/) فلو استفاده می‌کنند را کامپایل می‌کند.

- **`'all'`**: همهٔ تابع‌های سطح بالا را کامپایل می‌کند. توصیه نمی‌شود زیرا ممکن است تابع‌های غیر ری‌اکت را کامپایل کند.

#### ملاحظات {/*caveats*/}

- حالت `'infer'` نیاز دارد که تابع‌ها از قراردادهای نام‌گذاری ری‌اکت پیروی کنند تا شناسایی شوند
- استفاده از حالت `'all'` ممکن است با کامپایل کردن تابع‌های کمکی، به‌طور منفی بر عملکرد تأثیر بگذارد
- حالت `'syntax'` نیاز به Flow دارد و با TypeScript کار نمی‌کند
- صرف‌نظر از حالت، تابع‌هایی با دایرکتیو `"use no memo"` همیشه نادیده گرفته می‌شوند

---

## نحوهٔ استفاده {/*usage*/}

### حالت inference پیش‌فرض {/*default-inference-mode*/}

حالت پیش‌فرض `'infer'` برای بیشتر کدبیس‌هایی که از قراردادهای ری‌اکت پیروی می‌کنند به‌خوبی کار می‌کند:

```js
{
  compilationMode: 'infer'
}
```

با این حالت، این تابع‌ها کامپایل خواهند شد:

```js
// ✅ Compiled: Named like a component + returns JSX
function Button(props) {
  return <button>{props.label}</button>;
}

// ✅ Compiled: Named like a hook + calls hooks
function useCounter() {
  const [count, setCount] = useState(0);
  return [count, setCount];
}

// ✅ Compiled: Explicit directive
function expensiveCalculation(data) {
  "use memo";
  return data.reduce(/* ... */);
}

// ❌ Not compiled: Not a component/hook pattern
function calculateTotal(items) {
  return items.reduce((a, b) => a + b, 0);
}
```

### پذیرش تدریجی با حالت annotation {/*incremental-adoption*/}

برای مهاجرت تدریجی، از حالت `'annotation'` استفاده کنید تا فقط تابع‌های علامت‌گذاری‌شده کامپایل شوند:

```js
{
  compilationMode: 'annotation'
}
```

سپس به‌صورت صریح تابع‌هایی را که باید کامپایل شوند علامت‌گذاری کنید:

```js
// Only this function will be compiled
function ExpensiveList(props) {
  "use memo";
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// This won't be compiled without the directive
function NormalComponent(props) {
  return <div>{props.content}</div>;
}
```

### استفاده از حالت سینتکس فلو {/*flow-syntax-mode*/}

اگر کدبیس شما به‌جای TypeScript از فلو استفاده می‌کند:

```js
{
  compilationMode: 'syntax'
}
```

سپس از سینتکس کامپوننت فلو استفاده کنید:

```js
// Compiled: Flow component syntax
component Button(label: string) {
  return <button>{label}</button>;
}

// Compiled: Flow hook syntax
hook useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  return [count, setCount];
}

// Not compiled: Regular function syntax
function helper(data) {
  return process(data);
}
```

### خارج کردن تابع‌های خاص {/*opting-out*/}

صرف‌نظر از حالت کامپایل، از `"use no memo"` برای نادیده گرفتن کامپایل استفاده کنید:

```js
function ComponentWithSideEffects() {
  "use no memo"; // Prevent compilation

  // This component has side effects that shouldn't be memoized
  logToAnalytics('component_rendered');

  return <div>Content</div>;
}
```

---

## رفع اشکال {/*troubleshooting*/}

### کامپوننت در حالت infer کامپایل نمی‌شود {/*component-not-compiled-infer*/}

در حالت `'infer'`، مطمئن شوید کامپوننت شما از قراردادهای ری‌اکت پیروی می‌کند:

```js
// ❌ Won't be compiled: lowercase name
function button(props) {
  return <button>{props.label}</button>;
}

// ✅ Will be compiled: PascalCase name
function Button(props) {
  return <button>{props.label}</button>;
}

// ❌ Won't be compiled: doesn't create JSX or call hooks
function useData() {
  return window.localStorage.getItem('data');
}

// ✅ Will be compiled: calls a hook
function useData() {
  const [data] = useState(() => window.localStorage.getItem('data'));
  return data;
}
```
