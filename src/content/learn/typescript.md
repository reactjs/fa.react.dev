---
title: استفاده از تایپ‌اسکریپت
re: https://github.com/reactjs/react.dev/issues/5960
---

<Intro>

تایپ‌اسکریپت یک روش پرطرفدار برای اضافه کردن تعریف type به کدهای جاوااسکریپت است. به‌صورت پیش‌فرض تایپ‌اسکریپت [از JSX پشتیبانی می‌کند](/learn/writing-markup-with-jsx) و با اضافه کردن بسته‌های [`@types/react`](https://www.npmjs.com/package/@types/react) و [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) به پروژه، پشتیبانی کامل از ری‌اکت وب را خواهید داشت.

</Intro>

<YouWillLearn>

* [استفاده از تایپ‌اسکریپت با کامپوننت‌های ری‌اکت](/learn/typescript#typescript-with-react-components)  
* [نمونه‌هایی از تعریف نوع در هوک‌ها](/learn/typescript#example-hooks)  
* [انواع پرکاربرد از `@types/react`](/learn/typescript#useful-types)  
* [منابع بیشتر برای یادگیری](/learn/typescript#further-learning)  

</YouWillLearn>

## نصب {/*installation*/}

تمامی [فریم‌ورک‌های سطح تولید (production-grade) ری‌اکت](/learn/start-a-new-react-project#full-stack-frameworks) از تایپ‌اسکریپت پشتیبانی می‌کنند. برای نصب، راهنمای اختصاصی هر فریم‌ورک را دنبال کنید:

- [Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Remix](https://remix.run/docs/en/1.19.2/guides/typescript)
- [Gatsby](https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/)
- [Expo](https://docs.expo.dev/guides/typescript/)

### افزودن تایپ‌اسکریپت به یک پروژه ری‌اکت موجود {/*adding-typescript-to-an-existing-react-project*/}

برای نصب آخرین نسخه از تعریف نوع‌های (types) ری‌اکت:

<TerminalBlock>
npm install --save-dev @types/react @types/react-dom
</TerminalBlock>

گزینه‌های زیر باید در فایل `tsconfig.json` تنظیم شوند:

1. `dom` باید در [`lib`](https://www.typescriptlang.org/tsconfig/#lib) گنجانده شود (نکته: اگر گزینه `lib` مشخص نشده باشد، `dom` به‌صورت پیش‌فرض شامل می‌شود).
2. [`jsx`](https://www.typescriptlang.org/tsconfig/#jsx) باید به یکی از گزینه‌های معتبر تنظیم شود. `preserve` برای اکثر برنامه‌ها کافی است.
  اگر در حال انتشار یک کتابخانه هستید، برای انتخاب مقدار مناسب به [مستندات `jsx`](https://www.typescriptlang.org/tsconfig/#jsx) مراجعه کنید.

## تایپ‌اسکریپت با کامپوننت‌های ری‌اکت {/*typescript-with-react-components*/}

<Note>

هر فایلی که شامل JSX است باید از پسوند `.tsx` استفاده کند. این یک پسوند مخصوص تایپ‌اسکریپت است که به تایپ‌اسکریپت می‌گوید این فایل شامل JSX است.

</Note>

نوشتن تایپ‌اسکریپت با ری‌اکت بسیار شبیه به نوشتن جاوااسکریپت با ری‌اکت است. تفاوت اصلی هنگام کار با یک کامپوننت این است که می‌توانید برای props کامپوننت خود type تعریف کنید. این نوع‌ها می‌توانند برای بررسی صحت و ارائه مستندات درخط در ویرایشگرها استفاده شوند.

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

این sandbox‌ها می‌توانند کد تایپ‌اسکریپت را اجرا کنند، اما بررسی‌کننده نوع را اجرا نمی‌کنند. این بدان معناست که می‌توانید sandbox‌های تایپ‌اسکریپت را برای یادگیری تغییر دهید، اما هیچ خطا یا هشدار نوعی دریافت نخواهید کرد. برای بررسی نوع، می‌توانید از [TypeScript Playground](https://www.typescriptlang.org/play) یا یک sandbox آنلاین کامل‌تر استفاده کنید.

</Note>

این نحو درخط ساده‌ترین روش برای ارائه نوع‌ها برای یک کامپوننت است، اگرچه وقتی شروع به داشتن چند فیلد برای توصیف می‌کنید، می‌تواند دشوار شود. به جای آن، می‌توانید از `interface` یا `type` برای توصیف props کامپوننت استفاده کنید:

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

type توصیف‌کننده props کامپوننت شما می‌تواند به سادگی یا پیچیدگی مورد نیاز شما باشد، اگرچه باید یک type شیء باشد که با `type` یا `interface` توصیف شده باشد. می‌توانید درباره نحوه توصیف اشیاء در تایپ‌اسکریپت در [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html) بیاموزید، اما ممکن است به استفاده از [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) برای توصیف یک prop که می‌تواند یکی از چند نوع مختلف باشد و راهنمای [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) برای موارد کاربرد پیشرفته‌تر علاقه‌مند باشید.


## نمونه‌های هوک {/*example-hooks*/}

تعریف نوع‌ها (types) از `@types/react` شامل نوع‌هایی (types) برای هوک‌های داخلی است، بنابراین می‌توانید بدون نیاز به تنظیمات اضافی از آن‌ها در کامپوننت‌های خود استفاده کنید. آن‌ها به گونه‌ای ساخته شده‌اند که کد نوشته شده در کامپوننت شما را در نظر می‌گیرند، بنابراین در بسیاری از مواقع [inferred types](https://www.typescriptlang.org/docs/handbook/type-inference.html) را دریافت خواهید کرد و در حالت ایده‌آل نیازی به مدیریت جزئیات ارائه نوع‌ها(typea) ندارید.

با این حال، می‌توانیم به چند نمونه از نحوه ارائه نوع‌ها برای هوک‌ها نگاهی بیندازیم.

### `useState` {/*typing-usestate*/}

[هوک `useState`](/reference/react/useState) از مقدار ارسال شده به عنوان state اولیه برای تعیین نوع مقدار استفاده مجدد می‌کند. برای مثال:

```ts
// استنباط نوع به عنوان "boolean"
const [enabled, setEnabled] = useState(false);
```

این کار نوع `boolean` را به `enabled` اختصاص می‌دهد، و `setEnabled` تابعی خواهد بود که یا یک آرگومان `boolean` یا تابعی که یک `boolean` برمی‌گرداند را می‌پذیرد. اگر می‌خواهید به صورت صریح نوعی را برای state ارائه دهید، می‌توانید با ارائه یک آرگومان نوع به فراخوانی `useState` این کار را انجام دهید:

```ts
// تنظیم صریح نوع به "boolean"
const [enabled, setEnabled] = useState<boolean>(false);
```

این در این مورد خیلی مفید نیست، اما یک مورد رایج که ممکن است بخواهید نوعی را ارائه دهید زمانی است که یک نوع اتحاد دارید. برای مثال، `status` در اینجا می‌تواند یکی از چند رشته مختلف باشد:

```ts
type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
```

یا، همانطور که در [اصول ساختاردهی state](/learn/choosing-the-state-structure#principles-for-structuring-state) توصیه شده است، می‌توانید state‌های مرتبط را به عنوان یک شیء گروه‌بندی کنید و امکانات مختلف را از طریق انواع شیء توصیف کنید:

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

### `useReducer` {/*typing-usereducer*/}

[هوک `useReducer`](/reference/react/useReducer) یک هوک پیچیده‌تر است که یک تابع reducer و یک state اولیه را می‌گیرد. نوع‌های تابع reducer از state اولیه استنباط می‌شوند. شما می‌توانید به صورت اختیاری یک آرگومان نوع به فراخوانی `useReducer` ارائه دهید تا نوعی را برای state فراهم کنید، اما اغلب بهتر است نوع را روی state اولیه تنظیم کنید:

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


ما از تایپ‌اسکریپت در چند جای کلیدی استفاده می‌کنیم:

 - `interface State` شکل state ریدیوسر را توصیف می‌کند.
 - `type CounterAction` اکشن‌های مختلفی که می‌توانند به ریدیوسر ارسال شوند را توصیف می‌کند.
 - `const initialState: State` نوعی را برای state اولیه فراهم می‌کند، و همچنین نوعی که به‌صورت پیش‌فرض توسط `useReducer` استفاده می‌شود.
 - `stateReducer(state: State, action: CounterAction): State` نوع‌ها را برای آرگومان‌های تابع ریدیوسر و مقدار برگشتی تنظیم می‌کند.

یک جایگزین صریح‌تر برای تنظیم نوع روی `initialState`، ارائه یک آرگومان نوع به `useReducer` است:

```ts
import { stateReducer, State } from './your-reducer-implementation';

const initialState = { count: 0 };

export default function App() {
  const [state, dispatch] = useReducer<State>(stateReducer, initialState);
}
```

### `useContext` {/*typing-usecontext*/}

[هوک `useContext`](/reference/react/useContext) تکنیکی برای انتقال داده در درخت کامپوننت بدون نیاز به انتقال props از طریق کامپوننت‌ها است. این هوک با ایجاد یک کامپوننت provider و اغلب با ایجاد یک هوک برای مصرف مقدار در یک کامپوننت فرزند استفاده می‌شود.

type مقدار ارائه شده توسط context از مقداری که به فراخوانی `createContext` ارسال می‌شود استنباط می‌شود:

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

این تکنیک زمانی کار می‌کند که یک مقدار پیش‌فرض منطقی داشته باشید - اما گاهی اوقات مواردی وجود دارد که ندارید، و در این موارد `null` می‌تواند به عنوان یک مقدار پیش‌فرض منطقی به نظر برسد. با این حال، برای اینکه سیستم نوع بتواند کد شما را درک کند، باید به صورت صریح `ContextShape | null` را روی `createContext` تنظیم کنید.

این باعث می‌شود که نیاز داشته باشید `| null` را در نوع برای مصرف‌کنندگان context حذف کنید. توصیه ما این است که هوک یک بررسی زمان اجرا برای وجود آن انجام دهد و در صورت عدم وجود، خطا پرتاب کند:

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

[کامپایلر ری‌اکت](/learn/react-compiler) به صورت خودکار مقادیر و توابع را ذخیره می‌کند، که نیاز به فراخوانی‌های دستی `useMemo` را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار ذخیره‌سازی استفاده کنید.

</Note>

هوک‌های [`useMemo`](/reference/react/useMemo) یک مقدار ذخیره شده را از فراخوانی تابع ایجاد/بازیابی می‌کنند، و تابع را فقط زمانی که وابستگی‌های ارسال شده به عنوان پارامتر دوم تغییر کنند، مجدداً اجرا می‌کنند. نتیجه فراخوانی هوک از مقدار برگشتی تابع در پارامتر اول استنباط می‌شود. می‌توانید با ارائه یک آرگومان نوع به هوک، صریح‌تر باشید.

```ts
// نوع visibleTodos از مقدار برگشتی filterTodos استنباط می‌شود
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```


### `useCallback` {/*typing-usecallback*/}

<Note>

[کامپایلر ری‌اکت](/learn/react-compiler) به صورت خودکار مقادیر و توابع را ذخیره می‌کند، که نیاز به فراخوانی‌های دستی `useCallback` را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار ذخیره‌سازی استفاده کنید.

</Note>

[`useCallback`](/reference/react/useCallback) یک مرجع پایدار به یک تابع را تا زمانی که وابستگی‌های ارسال شده به پارامتر دوم یکسان باشند، فراهم می‌کند. مانند `useMemo`، type تابع از مقدار برگشتی تابع در پارامتر اول استنباط می‌شود، و می‌توانید با ارائه یک آرگومان نوع به هوک، صریح‌تر باشید.


```ts
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```

هنگام کار در حالت سختگیرانه تایپ‌اسکریپت، `useCallback` نیاز به افزودن نوع‌ها برای پارامترهای callback شما دارد. این به این دلیل است که type callback از مقدار برگشتی تابع استنباط می‌شود، و بدون پارامترها نوع نمی‌تواند به طور کامل درک شود.

بسته به ترجیحات سبک کد شما، می‌توانید از توابع `*EventHandler` از نوع‌های ری‌اکت برای ارائه نوع برای event handler همزمان با تعریف callback استفاده کنید:

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

## انواع پرکاربرد {/*useful-types*/}

مجموعه گسترده‌ای از انواع وجود دارد که از بسته `@types/react` می‌آیند، وقتی با نحوه تعامل ری‌اکت و تایپ‌اسکریپت راحت هستید، ارزش خواندن دارند. می‌توانید آن‌ها را [در پوشه ری‌اکت در DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts) پیدا کنید. ما در اینجا به چند نوع رایج‌تر می‌پردازیم.

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

انواع زیادی از رویدادها در نوع‌های ری‌اکت ارائه شده است - لیست کامل را می‌توانید [اینجا](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/b580df54c0819ec9df62b0835a315dd48b8594a9/types/react/index.d.ts#L1247C1-L1373) پیدا کنید که بر اساس [رویدادهای پرکاربرد از DOM](https://developer.mozilla.org/en-US/docs/Web/Events) است.

هنگام تعیین نوعی (type) که به دنبال آن هستید، می‌توانید ابتدا به اطلاعات hover برای event handler که استفاده می‌کنید نگاه کنید، که type رویداد را نشان خواهد داد.

اگر نیاز به استفاده از رویدادی دارید که در این لیست نیست، می‌توانید از type `React.SyntheticEvent` استفاده کنید، که type پایه برای همه رویدادها است.

### فرزندان {/*typing-children*/}

دو مسیر رایج برای توصیف فرزندان یک کامپوننت وجود دارد. اولین مورد استفاده از type `React.ReactNode` است، که اتحادی از تمام انواع ممکن است که می‌توانند به عنوان فرزند در JSX ارسال شوند:

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

توجه داشته باشید که نمی‌توانید از تایپ‌اسکریپت برای توصیف اینکه فرزندان type خاصی از المنت‌های JSX هستند استفاده کنید، بنابراین نمی‌توانید از سیستم type برای توصیف کامپوننتی که فقط فرزندان `<li>` را می‌پذیرد استفاده کنید.

می‌توانید نمونه‌ای از هر دو `React.ReactNode` و `React.ReactElement` را با بررسی‌کننده type در [این TypeScript playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wChSB6CxYmAOmXRgDkIATJOdNJMGAZzgwAFpxAR+8YADswAVwGkZMJFEzpOjDKw4AFHGEEBvUnDhphwADZsi0gFw0mDWjqQBuUgF9yaCNMlENzgAXjgACjADfkctFnYkfQhDAEpQgD44AB42YAA3dKMo5P46C2tbJGkvLIpcgt9-QLi3AEEwMFCItJDMrPTTbIQ3dKywdIB5aU4kKyQQKpha8drhhIGzLLWODbNs3b3s8YAxKBQAcwXpAThMaGWDvbH0gFloGbmrgQfBzYpd1YjQZbEYARkB6zMwO2SHSAAlZlYIBCdtCRkZpHIrFYahQYQD8UYYFA5EhcfjyGYqHAXnJAsIUHlOOUbHYhMIIHJzsI0Qk4P9SLUBuRqXEXEwAKKfRZcNA8PiCfxWACecAAUgBlAAacFm80W-CU11U6h4TgwUv11yShjgJjMLMqDnN9Dilq+nh8pD8AXgCHdMrCkWisVoAet0R6fXqhWKhjKllZVVxMcavpd4Zg7U6Qaj+2hmdG4zeRF10uu-Aeq0LBfLMEe-V+T2L7zLVu+FBWLdLeq+lc7DYFf39deFVOotMCACNOCh1dq219a+30uC8YWoZsRyuEdjkevR8uvoVMdjyTWt4WiSSydXD4NqZP4AymeZE072ZzuUeZQKheQgA) ببینید.

### ویژگی‌های استایل {/*typing-style-props*/}

هنگام استفاده از استایل‌های درخط در ری‌اکت، می‌توانید از `React.CSSProperties` برای توصیف شیء ارسال شده به prop استایل استفاده کنید. این type اتحادی از تمام ویژگی‌های CSS ممکن است، و روش خوبی برای اطمینان از ارسال ویژگی‌های CSS معتبر به prop استایل و دریافت تکمیل خودکار در ویرایشگر شما است.

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

## یادگیری بیشتر {/*further-learning*/}

این راهنما مبانی استفاده از تایپ‌اسکریپت با ری‌اکت را پوشش داده است، اما موارد بیشتری برای یادگیری وجود دارد.
صفحات API جداگانه در مستندات ممکن است حاوی مستندات عمیق‌تری در مورد نحوه استفاده از آن‌ها با تایپ‌اسکریپت باشند.

ما منابع زیر را پیشنهاد می‌کنیم:

 - [راهنمای تایپ‌اسکریپت](https://www.typescriptlang.org/docs/handbook/) مستندات رسمی برای تایپ‌اسکریپت است و اکثر ویژگی‌های کلیدی زبان را پوشش می‌دهد.

 - [یادداشت‌های انتشار تایپ‌اسکریپت](https://devblogs.microsoft.com/typescript/) ویژگی‌های جدید را به صورت عمیق پوشش می‌دهند.

 - [راهنمای سریع تایپ‌اسکریپت ری‌اکت](https://react-typescript-cheatsheet.netlify.app/) یک راهنمای سریع نگهداری شده توسط جامعه برای استفاده از تایپ‌اسکریپت با ری‌اکت است، که بسیاری از موارد خاص مفید را پوشش می‌دهد و گستردگی بیشتری نسبت به این سند ارائه می‌دهد.

 - [دیسکورد جامعه تایپ‌اسکریپت](https://discord.com/invite/typescript) مکان عالی برای پرسیدن سوالات و دریافت کمک با مشکلات تایپ‌اسکریپت و ری‌اکت است.
