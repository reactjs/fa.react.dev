---
title: استفاده از TypeScript
re: https://github.com/reactjs/react.dev/issues/5960
---

<Intro>

تایپ‌اسکریپت یک روش پرطرفدار برای اضافه کردن تعریف type به کدهای جاوااسکریپت است. به‌صورت پیش‌فرض تایپ‌اسکریپت [از JSX پشتیبانی می‌کند](/learn/writing-markup-with-jsx) و با اضافه کردن [`@types/react`](https://www.npmjs.com/package/@types/react) و [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) به پروژه، پشتیبانی کامل از React Web را خواهید داشت.

</Intro>

<YouWillLearn>

<<<<<<< HEAD
* [TypeScript با کامپوننت‌های ری‌اکت](/learn/typescript#typescript-with-react-components)
* [نمونه‌هایی از تایپینگ با هوک‌ها](/learn/typescript#example-hooks)
* [typeهای پرکاربرد از `@types/react`](/learn/typescript#useful-types)
* [منابع بیشتر برای یادگیری](/learn/typescript#further-learning)  
=======
* [TypeScript with React Components](/learn/typescript#typescript-with-react-components)
* [Examples of typing with Hooks](/learn/typescript#example-hooks)
* [Common types from `@types/react`](/learn/typescript#useful-types)
* [Further learning locations](/learn/typescript#further-learning)
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

</YouWillLearn>

## نصب {/*installation*/}

<<<<<<< HEAD
تمامی [فریم‌ورک‌های سطح تولید ری‌اکت](/learn/start-a-new-react-project#full-stack-frameworks) از TypeScript پشتیبانی می‌کنند. برای نصب، راهنمای اختصاصی هر فریم‌ورک را دنبال کنید:
=======
All [production-grade React frameworks](/learn/creating-a-react-app#full-stack-frameworks) offer support for using TypeScript. Follow the framework specific guide for installation:
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

- [Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Remix](https://remix.run/docs/en/1.19.2/guides/typescript)
- [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [Expo](https://docs.expo.dev/guides/typescript/)

### افزودن TypeScript به یک پروژه React موجود {/*adding-typescript-to-an-existing-react-project*/}

برای نصب آخرین نسخه از تعاریف type ری‌اکت:

<TerminalBlock>
npm install --save-dev @types/react @types/react-dom
</TerminalBlock>

گزینه‌های کامپایلر زیر باید در `tsconfig.json` شما تنظیم شوند:

<<<<<<< HEAD
1. `dom` باید در [`lib`](https://www.typescriptlang.org/tsconfig/#lib) گنجانده شود (نکته: اگر گزینه‌ای برای `lib` مشخص نشده باشد، `dom` به‌صورت پیش‌فرض گنجانده می‌شود).
2. [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx) باید به یکی از گزینه‌های معتبر تنظیم شود. `preserve` برای اکثر برنامه‌ها کافی است.
اگر در حال انتشار یک کتابخانه هستید، برای انتخاب مقدار مناسب به [مستندات `jsx`](https://www.typescriptlang.org/tsconfig/#jsx) مراجعه کنید.
=======
1. `dom` must be included in [`lib`](https://www.typescriptlang.org/tsconfig/#lib) (Note: If no `lib` option is specified, `dom` is included by default).
2. [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx) must be set to one of the valid options. `preserve` should suffice for most applications.
  If you're publishing a library, consult the [`jsx` documentation](https://www.typescriptlang.org/tsconfig/#jsx) on what value to choose.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

## TypeScript با کامپوننت‌های ری‌اکت {/*typescript-with-react-components*/}

<Note>

هر فایلی که شامل JSX است باید از پسوند `.tsx` استفاده کند. این یک پسوند مخصوص TypeScript است که به TypeScript می‌گوید این فایل شامل JSX است.

</Note>

نوشتن TypeScript با ری‌اکت بسیار شبیه به نوشتن جاوااسکریپت با ری‌اکت است. تفاوت اصلی هنگام کار با یک کامپوننت این است که می‌توانید برای props کامپوننت خود type تعریف کنید. این typeها می‌توانند برای بررسی صحت و ارائه مستندات درخط در ویرایشگرها استفاده شوند.

با استفاده از [کامپوننت `MyButton`](/learn#components) از راهنمای [شروع سریع](/learn)، می‌توانیم یک type برای توصیف `title` دکمه اضافه کنیم:

<Sandpack>

```tsx src/App.tsx active
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```
</Sandpack>

<Note>

این sandboxها می‌توانند کد تایپ‌اسکریپت را اجرا کنند، اما type-checker را اجرا نمی‌کنند. این بدان معناست که می‌توانید sandboxهای تایپ‌اسکریپت را برای یادگیری تغییر دهید، اما هیچ خطا یا هشدار type دریافت نخواهید کرد. برای بررسی type، می‌توانید از [TypeScript Playground](https://www.typescriptlang.org/play) یا یک sandbox آنلاین کامل‌تر استفاده کنید.

</Note>

این نحوه‌ی نوشتن درون‌خطی (inline syntax) ساده‌ترین روش برای ارائه type‌ها برای یک کامپوننت است، اگرچه وقتی شروع به داشتن چند فیلد برای توصیف می‌کنید، می‌تواند دشوار شود. به جای آن، می‌توانید از `interface` یا `type` برای توصیف props کامپوننت استفاده کنید:

<Sandpack>

```tsx src/App.tsx active
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a disabled button" disabled={true}/>
    </div>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

type ای که برای props کامپوننت تعریف می‌کنید می‌تواند بسته به نیازتان ساده یا پیچیده باشد، اما باید حتماً یک نوع شیء باشد که با `type` یا `interface` مشخص شده است. می‌توانید درباره نحوه توصیف اشیاء در TypeScript در [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) بیاموزید، اما ممکن است بخواهید از [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) برای توصیف propهایی استفاده کنید که می‌توانند یکی از چند type مختلف باشند، و همچنین راهنمای [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) را برای موارد کاربرد پیشرفته‌تر مطالعه کنید.


## مثال‌های هوک {/*example-hooks*/}

<<<<<<< HEAD
تعریف typeها از `@types/react` شامل typeهایی برای هوک‌های داخلی است، بنابراین می‌توانید بدون نیاز به تنظیمات اضافی از آن‌ها در کامپوننت‌های خود استفاده کنید. آن‌ها به گونه‌ای ساخته شده‌اند که کد نوشته شده در کامپوننت شما را در نظر می‌گیرند، بنابراین در بسیاری از مواقع [inferred types](https://www.typescriptlang.org/docs/handbook/type-inference.html) را دریافت خواهید کرد و در حالت ایده‌آل نیازی به مدیریت جزئیات ارائه typeها ندارید.
=======
The type definitions from `@types/react` include types for the built-in Hooks, so you can use them in your components without any additional setup. They are built to take into account the code you write in your component, so you will get [inferred types](https://www.typescriptlang.org/docs/handbook/type-inference.html) a lot of the time and ideally do not need to handle the minutiae of providing the types.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

با این حال، می‌توانیم به چند نمونه از نحوه ارائه typeها برای هوک‌ها نگاهی بیندازیم.

### `useState` {/*typing-usestate*/}

[هوک `useState`](/reference/react/useState) از مقدار ارسال‌شده به‌عنوان state اولیه برای تعیین اینکه نوع مقدار چه باید باشد، استفاده مجدد می‌کند. برای مثال:

```ts
// استنباط نوع به عنوان "boolean"
const [enabled, setEnabled] = useState(false);
```

این کار type `boolean` را به `enabled` اختصاص می‌دهد، و `setEnabled` تابعی خواهد بود که یا یک آرگومان `boolean` یا تابعی که یک `boolean` برمی‌گرداند را می‌پذیرد. اگر می‌خواهید به صورت صریح typeی را برای state ارائه دهید، می‌توانید با ارائه یک آرگومان type به فراخوانی `useState` این کار را انجام دهید:

```ts
<<<<<<< HEAD
// تنظیم صریح نوع به "boolean"
=======
// Explicitly set the type to "boolean"
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0
const [enabled, setEnabled] = useState<boolean>(false);
```

این در این مورد خیلی مفید نیست، اما یک مورد رایج که ممکن است بخواهید یک type ارائه دهید زمانی است که یک union type دارید. برای مثال، `status` در اینجا می‌تواند یکی از چند رشته مختلف باشد:

```ts
type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
```

یا، همان‌طور که در [اصول ساختاردهی state](/learn/choosing-the-state-structure#principles-for-structuring-state) توصیه شده است، می‌توانید stateهای مرتبط را به‌صورت یک شیء گروه‌بندی کنید و امکانات مختلف را از طریق object typeها توصیف کنید:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

### `useReducer` {/*typing-usereducer*/}

[هوک `useReducer`](/reference/react/useReducer) یک هوک پیچیده‌تر است که یک تابع reducer و یک state اولیه را می‌گیرد. typeهای تابع reducer از state اولیه استنباط می‌شوند. شما می‌توانید به صورت اختیاری یک آرگومان type به فراخوانی `useReducer` ارائه دهید تا typeی را برای state فراهم کنید، اما اغلب بهتر است type را روی state اولیه تنظیم کنید:

<Sandpack>

```tsx src/App.tsx active
import {useReducer} from 'react';

interface State {
   count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>


ما در چند جای کلیدی از TypeScript استفاده می‌کنیم:

- `interface State` شکل state ریدوسر را توصیف می‌کند.
- `type CounterAction` اکشن‌های مختلفی که می‌توانند به ردیوسر ارسال شوند را توصیف می‌کند.
- `const initialState: State` یک type برای state اولیه فراهم می‌کند، و همچنین typeی که به‌صورت پیش‌فرض توسط `useReducer` استفاده می‌شود.
- `stateReducer(state: State, action: CounterAction): State` typeها را برای آرگومان‌های تابع ریدیوسر و مقدار برگشتی تنظیم می‌کند.

یک جایگزین صریح‌تر برای تنظیم type روی `initialState`، ارائه یک آرگومان type به `useReducer` است:

```ts
import { stateReducer, State } from './your-reducer-implementation';

const initialState = { count: 0 };

export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}
```

### `useContext` {/*typing-usecontext*/}

[هوک `useContext`](/reference/react/useContext) تکنیکی برای انتقال داده در درخت کامپوننت بدون نیاز به انتقال props از طریق کامپوننت‌ها است. این هوک با ایجاد یک کامپوننت provider و اغلب با ایجاد یک هوک برای مصرف مقدار در یک کامپوننت فرزند استفاده می‌شود.

type مقدار ارائه‌شده توسط context از مقداری که به فراخوانی `createContext` ارسال می‌شود، استنباط می‌شود:

<Sandpack>

```tsx src/App.tsx active
import { createContext, useContext, useState } from 'react';

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext value={theme}>
      <MyComponent />
    </ThemeContext>
  )
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  )
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

<<<<<<< HEAD
این تکنیک زمانی کار می‌کند که یک مقدار پیش‌فرض منطقی داشته باشید - اما گاهی اوقات مواردی وجود دارد که ندارید، و در این موارد `null` می‌تواند به عنوان یک مقدار پیش‌فرض منطقی به نظر برسد. با این حال، برای اینکه type-system بتواند کد شما را درک کند، باید به صورت صریح `ContextShape | null` را روی `createContext` تنظیم کنید.
=======
This technique works when you have a default value which makes sense - but there are occasionally cases when you do not, and in those cases `null` can feel reasonable as a default value. However, to allow the type-system to understand your code, you need to explicitly set `ContextShape | null` on the `createContext`.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

این باعث می‌شود که نیاز داشته باشید `| null` را در type برای مصرف‌کنندگان context حذف کنید. توصیه ما این است که هوک یک بررسی زمان اجرا برای وجود آن انجام دهد و در صورت عدم وجود، خطا پرتاب کند:

```js {5, 16-20}
import { createContext, useContext, useState, useMemo } from 'react';

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  kind: string
};

// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}

export default function MyApp() {
  const object = useMemo(() => ({ kind: "complex" }), []);

  return (
    <Context value={object}>
      <MyComponent />
    </Context>
  )
}

function MyComponent() {
  const object = useGetComplexObject();

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
}
```

### `useMemo` {/*typing-usememo*/}

<Note>

<<<<<<< HEAD
[کامپایلر ری‌اکت](/learn/react-compiler) به صورت خودکار مقادیر و توابع را ممویزه می‌کند، که نیاز به فراخوانی‌های دستی `useMemo` را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار ممویزه‌سازی استفاده کنید.

</Note>

هوک‌های [`useMemo`](/reference/react/useMemo) یک مقدار ذخیره‌شده را از فراخوانی تابع ایجاد/بازیابی می‌کنند و تابع را فقط زمانی که وابستگی‌های ارسال‌شده به‌عنوان پارامتر دوم تغییر کنند، مجدداً اجرا می‌کنند. نتیجه فراخوانی هوک از مقدار برگشتی تابع در پارامتر اول استنباط می‌شود. می‌توانید با ارائه یک آرگومان type به هوک، صریح‌تر باشید.
=======
[React Compiler](/learn/react-compiler) automatically memoizes values and functions, reducing the need for manual `useMemo` calls. You can use the compiler to handle memoization automatically.

</Note>

The [`useMemo`](/reference/react/useMemo) Hooks will create/re-access a memorized value from a function call, re-running the function only when dependencies passed as the 2nd parameter are changed. The result of calling the Hook is inferred from the return value from the function in the first parameter. You can be more explicit by providing a type argument to the Hook.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

```ts
// نوع visibleTodos از مقدار برگشتی filterTodos استنباط می‌شود
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```


### `useCallback` {/*typing-usecallback*/}

<Note>

<<<<<<< HEAD
[کامپایلر ری‌اکت](/learn/react-compiler) به صورت خودکار مقادیر و توابع را ممویزه می‌کند، که نیاز به فراخوانی‌های دستی `useCallback` را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار ممویزه‌سازی استفاده کنید.

</Note>

[`useCallback`](/reference/react/useCallback) یک مرجع پایدار به یک تابع را تا زمانی که وابستگی‌های ارسال‌شده به پارامتر دوم یکسان باشند، فراهم می‌کند. مانند `useMemo`، type تابع از مقدار برگشتی تابع در پارامتر اول استنباط می‌شود، و می‌توانید با ارائه یک آرگومان type به هوک، صریح‌تر باشید.
=======
[React Compiler](/learn/react-compiler) automatically memoizes values and functions, reducing the need for manual `useCallback` calls. You can use the compiler to handle memoization automatically.

</Note>

The [`useCallback`](/reference/react/useCallback) provide a stable reference to a function as long as the dependencies passed into the second parameter are the same. Like `useMemo`, the function's type is inferred from the return value of the function in the first parameter, and you can be more explicit by providing a type argument to the Hook.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0


```ts
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```

هنگام کار در حالت سختگیرانه TypeScript، `useCallback` نیاز به افزودن typeها برای پارامترهای callback شما دارد. این به این دلیل است که type callback از مقدار برگشتی تابع استنباط می‌شود، و بدون پارامترها type نمی‌تواند به طور کامل درک شود.

<<<<<<< HEAD
بسته به ترجیحات سبک کد شما، می‌توانید از توابع `*EventHandler` از typeهای ری‌اکت برای ارائه type برای event handler همزمان با تعریف callback استفاده کنید:
=======
Depending on your code-style preferences, you could use the `*EventHandler` functions from the React types to provide the type for the event handler at the same time as defining the callback:
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

```ts
import { useState, useCallback } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, [setValue])

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```

## typeهای پرکاربرد {/*useful-types*/}

مجموعه گسترده‌ای از typeها وجود دارد که از بسته `@types/react` می‌آیند، وقتی با نحوه تعامل ری‌اکت و تایپ‌اسکریپت راحت هستید، ارزش خواندن دارند. می‌توانید آن‌ها را [در پوشه ری‌اکت در DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts) پیدا کنید. ما در اینجا به چند type رایج‌تر می‌پردازیم.

### رویدادهای DOM {/*typing-dom-events*/}

هنگام کار با رویدادهای DOM در ری‌اکت، type رویداد اغلب می‌تواند از event handler استنباط شود. با این حال، وقتی می‌خواهید تابعی را برای ارسال به یک event handler استخراج کنید، باید به صورت صریح type رویداد را تنظیم کنید.

<Sandpack>

```tsx src/App.tsx active
import { useState } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```

```js src/App.js hidden
import AppTSX from "./App.tsx";
export default App = AppTSX;
```

</Sandpack>

انواع زیادی از رویدادها در typeهای ری‌اکت ارائه شده است - لیست کامل را می‌توانید [اینجا](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b580df54c0819ec9df62b0835a315dd48b8594a9/types/react/index.d.ts#L1247C1-L1373) پیدا کنید که بر اساس [رویدادهای پرکاربرد از DOM](https://developer.mozilla.org/en-US/docs/Web/Events) است.

هنگام تعیین type که به دنبال آن هستید، می‌توانید ابتدا به اطلاعات hover برای event handler که استفاده می‌کنید نگاه کنید، که type رویداد را نشان خواهد داد.

اگر نیاز به استفاده از رویدادی دارید که در این لیست نیست، می‌توانید از type `React.SyntheticEvent` استفاده کنید که type پایه برای همه رویدادها است.

### فرزندان {/*typing-children*/}

دو مسیر رایج برای توصیف فرزندان یک کامپوننت وجود دارد. اولین مورد استفاده از type `React.ReactNode` است، که اتحادی از تمام typeهای ممکن است که می‌توانند به عنوان فرزند در JSX ارسال شوند:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```

این یک تعریف بسیار گسترده از فرزندان است. دومین مورد استفاده از type `React.ReactElement` است، که فقط شامل المنت‌های JSX است و نه مقادیر اولیه جاوااسکریپت مانند رشته‌ها یا اعداد:

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
```

<<<<<<< HEAD
توجه داشته باشید که نمی‌توانید از تایپ‌اسکریپت برای توصیف اینکه فرزندان type خاصی از المنت‌های JSX هستند استفاده کنید، بنابراین نمی‌توانید از سیستم type برای توصیف کامپوننتی که فقط فرزندان `<li>` را می‌پذیرد استفاده کنید.
=======
Note, that you cannot use TypeScript to describe that the children are a certain type of JSX elements, so you cannot use the type-system to describe a component which only accepts `<li>` children.
>>>>>>> 2534424ec6c433cc2c811d5a0bd5a65b75efa5f0

می‌توانید نمونه‌ای از هر دو `React.ReactNode` و `React.ReactElement` را با type-checker در [این TypeScript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wChSB6CxYmAOmXRgDkIATJOdNJMGAZzgwAFpxAR+8YADswAVwGkZMJFEzpOjDKw4AFHGEEBvUnDhphwADZsi0gFw0mDWjqQBuUgF9yaCNMlENzgAXjgACjADfkctFnYkfQhDAEpQgD44AB42YAA3dKMo5P46C2tbJGkvLIpcgt9-QLi3AEEwMFCItJDMrPTTbIQ3dKywdIB5aU4kKyQQKpha8drhhIGzLLWODbNs3b3s8YAxKBQAcwXpAThMaGWDvbH0gFloGbmrgQfBzYpd1YjQZbEYARkB6zMwO2SHSAAlZlYIBCdtCRkZpHIrFYahQYQD8UYYFA5EhcfjyGYqHAXnJAsIUHlOOUbHYhMIIHJzsI0Qk4P9SLUBuRqXEXEwAKKfRZcNA8PiCfxWACecAAUgBlAAacFm80W-CU11U6h4TgwUv11yShjgJjMLMqDnN9Dilq+nh8pD8AXgCHdMrCkWisVoAet0R6fXqhWKhjKllZVVxMcavpd4Zg7U6Qaj+2hmdG4zeRF10uu-Aeq0LBfLMEe-V+T2L7zLVu+FBWLdLeq+lc7DYFf39deFVOotMCACNOCh1dq219a+30uC8YWoZsRyuEdjkevR8uvoVMdjyTWt4WiSSydXD4NqZP4AymeZE072ZzuUeZQKheQgA) ببینید.

### ویژگی‌های style {/*typing-style-props*/}

هنگام استفاده از استایل‌های درخط در ری‌اکت، می‌توانید از `React.CSSProperties` برای توصیف شیء ارسال‌شده به prop @@INLN_1@@ استفاده کنید. این type اتحادی از تمام ویژگی‌های ممکن CSS است و روشی خوب برای اطمینان از ارسال ویژگی‌های معتبر CSS به prop @@INLN_2@@ و دریافت تکمیل خودکار در ویرایشگر شما است.

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

## یادگیری بیشتر {/*further-learning*/}

این راهنما مبانی استفاده از TypeScript با ری‌اکت را پوشش داده است، اما موارد بیشتری برای یادگیری وجود دارد.
صفحات جداگانه API در مستندات ممکن است حاوی مستندات عمیق‌تری در مورد نحوه استفاده از آن‌ها با TypeScript باشند.

ما منابع زیر را توصیه می‌کنیم:

- [راهنمای TypeScript](https://www.typescriptlang.org/docs/handbook/) مستندات رسمی برای TypeScript است و اکثر قابلیت‌های کلیدی زبان را پوشش می‌دهد.

- [یادداشت‌های انتشار TypeScript](https://devblogs.microsoft.com/typescript/) قابلیت‌های جدید را به‌طور عمیق پوشش می‌دهند.

- [راهنمای سریع TypeScript ری‌اکت](https://react-typescript-cheatsheet.netlify.app/) یک راهنمای سریع نگهداری‌شده توسط جامعه برای استفاده از TypeScript با ری‌اکت است که بسیاری از موارد خاص مفید را پوشش می‌دهد و گستردگی بیشتری نسبت به این سند ارائه می‌دهد.

- [دیسکورد جامعه TypeScript](https://discord.com/invite/typescript) مکان عالی برای پرسیدن سوالات و دریافت کمک با مشکلات TypeScript و ری‌اکت است.
