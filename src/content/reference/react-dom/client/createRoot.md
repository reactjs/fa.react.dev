---
title: createRoot
---

<Intro>

`createRoot` به شما اجازه می‌دهد یک root ایجاد کنید تا کامپوننت‌های ری‌اکت را درون یک گرهٔ DOM مرورگر نمایش دهید.

```js
const root = createRoot(domNode, options?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `createRoot(domNode, options?)` {/*createroot*/}

برای ایجاد یک root ری‌اکت جهت نمایش محتوا درون یک المان DOM مرورگر، `createRoot` را فراخوانی کنید.

```js
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
```

ری‌اکت یک root برای `domNode` ایجاد می‌کند و مدیریت DOM درون آن را به‌عهده می‌گیرد. پس از ایجاد یک root، باید [`root.render`](#root-render) را فراخوانی کنید تا یک کامپوننت ری‌اکت درون آن نمایش داده شود:

```js
root.render(<App />);
```

یک اپلیکیشن که به‌طور کامل با ری‌اکت ساخته شده معمولاً فقط یک فراخوانی `createRoot` برای کامپوننت ریشهٔ خود دارد. یک صفحه که از «sprinkles» ری‌اکت برای بخش‌هایی از صفحه استفاده می‌کند ممکن است به تعداد لازم root جداگانه داشته باشد.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `domNode`: یک [المان DOM.](https://developer.mozilla.org/en-US/docs/Web/API/Element) ری‌اکت یک root برای این المان DOM ایجاد می‌کند و به شما اجازه می‌دهد توابعی روی root فراخوانی کنید، مانند `render` برای نمایش محتوای رندرشدهٔ ری‌اکت.

* **اختیاری** `options`: یک شیء با گزینه‌ها برای این root ری‌اکت.

  * **اختیاری** `onCaughtError`: کالبکی که هنگام شکار خطا توسط یک Error Boundary توسط ری‌اکت فراخوانی می‌شود. با `error` شکارشده توسط Error Boundary و یک شیء `errorInfo` حاوی `componentStack` فراخوانی می‌شود.
  * **اختیاری** `onUncaughtError`: کالبکی که هنگام پرتاب یک خطا و عدم شکار آن توسط یک Error Boundary فراخوانی می‌شود. با `error` پرتاب‌شده و یک شیء `errorInfo` حاوی `componentStack` فراخوانی می‌شود.
  * **اختیاری** `onRecoverableError`: کالبکی که هنگام بازیابی خودکار خطاها توسط ری‌اکت فراخوانی می‌شود. با `error` پرتاب‌شده توسط ری‌اکت و یک شیء `errorInfo` حاوی `componentStack` فراخوانی می‌شود. برخی خطاهای قابل بازیابی ممکن است شامل علت اصلی خطا به‌صورت `error.cause` باشند.
  * **اختیاری** `identifierPrefix`: یک پیشوند رشته‌ای که ری‌اکت برای IDهای تولیدشده توسط [`useId`](/reference/react/useId) استفاده می‌کند. برای جلوگیری از تداخل هنگام استفاده از چندین root در همان صفحه مفید است.

#### مقادیر بازگشتی {/*returns*/}

`createRoot` یک شیء با دو متد برمی‌گرداند: [`render`](#root-render) و [`unmount`.](#root-unmount)

#### نکات {/*caveats*/}
* اگر اپلیکیشن شما server-rendered است، استفاده از `createRoot()` پشتیبانی نمی‌شود. به‌جای آن از [`hydrateRoot()`](/reference/react-dom/client/hydrateRoot) استفاده کنید.
* احتمالاً فقط یک فراخوانی `createRoot` در اپلیکیشن خود دارید. اگر از یک فریم‌ورک استفاده می‌کنید، ممکن است این فراخوانی را برای شما انجام دهد.
* وقتی می‌خواهید یک تکه JSX را در بخش متفاوتی از درخت DOM که فرزند کامپوننت شما نیست (مثلاً یک modal یا یک tooltip) رندر کنید، به‌جای `createRoot` از [`createPortal`](/reference/react-dom/createPortal) استفاده کنید.

---

### `root.render(reactNode)` {/*root-render*/`

برای نمایش یک تکه [JSX](/learn/writing-markup-with-jsx) («گرهٔ ری‌اکت») در گرهٔ DOM مرورگر root ری‌اکت، `root.render` را فراخوانی کنید.

```js
root.render(<App />);
```

ری‌اکت `<App />` را در `root` نمایش می‌دهد و مدیریت DOM درون آن را به‌عهده می‌گیرد.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*root-render-parameters*/}

* `reactNode`: یک *گرهٔ ری‌اکت* که می‌خواهید نمایش دهید. این معمولاً یک تکه JSX مانند `<App />` خواهد بود، اما می‌توانید یک المان ری‌اکت ساخته‌شده با [`createElement()`](/reference/react/createElement)، یک رشته، یک عدد، `null` یا `undefined` نیز پاس دهید.


#### مقادیر بازگشتی {/*root-render-returns*/}

`root.render` مقدار `undefined` برمی‌گرداند.

#### نکات {/*root-render-caveats*/}

* اولین باری که `root.render` را فراخوانی می‌کنید، ری‌اکت قبل از رندر کردن کامپوننت ری‌اکت درون آن، تمام محتوای HTML موجود در root ری‌اکت را پاک می‌کند.

* اگر گرهٔ DOM root شما شامل HTML تولیدشده توسط ری‌اکت روی سرور یا در طول build است، به‌جای آن از [`hydrateRoot()`](/reference/react-dom/client/hydrateRoot) استفاده کنید که گوش‌دهنده‌های رویداد را به HTML موجود متصل می‌کند.

* اگر `render` را بیش از یک بار روی همان root فراخوانی کنید، ری‌اکت DOM را در صورت لزوم به‌روز می‌کند تا JSX جدیدی که پاس داده‌اید را منعکس کند. ری‌اکت با [«تطبیق دادن»](/learn/preserving-and-resetting-state) درخت قبلی رندرشده تصمیم می‌گیرد کدام بخش‌های DOM قابل استفادهٔ مجدد هستند و کدام نیاز به بازسازی دارند. فراخوانی دوباره `render` روی همان root مشابه فراخوانی [تابع `set`](/reference/react/useState#setstate) روی کامپوننت ریشه است: ری‌اکت از به‌روزرسانی‌های غیرضروری DOM اجتناب می‌کند.

* اگرچه رندر کردن پس از شروع همگام است، `root.render(...)` این‌گونه نیست. این بدان معناست که کد پس از `root.render()` ممکن است قبل از فعال شدن هر افکتی (`useLayoutEffect`، `useEffect`) از آن رندر خاص اجرا شود. این معمولاً مشکلی نیست و به‌ندرت نیاز به تنظیم دارد. در موارد نادری که زمان‌بندی افکت مهم است، می‌توانید `root.render(...)` را در [`flushSync`](https://react.dev/reference/react-dom/flushSync) بپیچید تا اطمینان حاصل کنید رندر اولیه به‌طور کامل همگام اجرا می‌شود.
  
  ```js
  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
  // 🚩 The HTML will not include the rendered <App /> yet:
  console.log(document.body.innerHTML);
  ```

---

### `root.unmount()` {/*root-unmount*/}

برای تخریب یک درخت رندرشده درون یک root ری‌اکت، `root.unmount` را فراخوانی کنید.

```js
root.unmount();
```

یک اپلیکیشن که به‌طور کامل با ری‌اکت ساخته شده معمولاً هیچ فراخوانی به `root.unmount` نخواهد داشت.

این عمدتاً مفید است اگر گرهٔ DOM root ری‌اکت شما (یا هر یک از اجداد آن) ممکن است توسط کد دیگری از DOM حذف شود. مثلاً یک tab panel جی‌کوئری را تصور کنید که تب‌های غیرفعال را از DOM حذف می‌کند. اگر یک تب حذف شود، تمام محتوای درون آن (از جمله rootهای ری‌اکت درون) نیز از DOM حذف خواهند شد. در این حالت، باید با فراخوانی `root.unmount` به ری‌اکت بگویید که مدیریت محتوای root حذف‌شده را «متوقف» کند. در غیر این صورت، کامپوننت‌های درون root حذف‌شده نمی‌دانند که باید پاک‌سازی کنند و منابع سراسری مانند اشتراک‌ها (subscriptions) را آزاد کنند.

فراخوانی `root.unmount` تمام کامپوننت‌ها را در root unmount می‌کند و ری‌اکت را از گرهٔ DOM ریشه «جدا» می‌کند، شامل حذف هر گوش‌دهندهٔ رویداد یا استیت در درخت.


#### پارامترها {/*root-unmount-parameters*/}

`root.unmount` هیچ پارامتری نمی‌پذیرد.


#### مقادیر بازگشتی {/*root-unmount-returns*/}

`root.unmount` مقدار `undefined` برمی‌گرداند.

#### نکات {/*root-unmount-caveats*/}

* فراخوانی `root.unmount` تمام کامپوننت‌ها را در درخت unmount می‌کند و ری‌اکت را از گرهٔ DOM ریشه «جدا» می‌کند.

* پس از فراخوانی `root.unmount` نمی‌توانید دوباره `root.render` را روی همان root فراخوانی کنید. تلاش برای فراخوانی `root.render` روی یک root unmount‌شده خطای «Cannot update an unmounted root» پرتاب خواهد کرد. با این حال، می‌توانید پس از unmount شدن root قبلی برای همان گرهٔ DOM یک root جدید ایجاد کنید.

---

## استفاده {/*usage*/}

### رندر یک اپلیکیشن که به‌طور کامل با ری‌اکت ساخته شده {/*rendering-an-app-fully-built-with-react*/}

اگر اپلیکیشن شما به‌طور کامل با ری‌اکت ساخته شده، یک root واحد برای کل اپلیکیشن خود ایجاد کنید.

```js [[1, 3, "document.getElementById('root')"], [2, 4, "<App />"]]
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

معمولاً، فقط نیاز است این کد را یک بار در زمان راه‌اندازی اجرا کنید. این کار:

1. <CodeStep step={1}>گرهٔ DOM مرورگر</CodeStep> تعریف‌شده در HTML شما را پیدا می‌کند.
2. <CodeStep step={2}>کامپوننت ری‌اکت</CodeStep> برای اپلیکیشن شما را درون آن نمایش می‌دهد.

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <!-- This is the DOM node -->
    <div id="root"></div>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```js src/App.js
import { useState } from 'react';

export default function App() {
  return (
    <>
      <h1>Hello, world!</h1>
      <Counter />
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </button>
  );
}
```

</Sandpack>

**اگر اپلیکیشن شما به‌طور کامل با ری‌اکت ساخته شده، نباید نیاز به ایجاد rootهای بیشتر یا فراخوانی دوبارهٔ [`root.render`](#root-render) داشته باشید.**

از این پس، ری‌اکت DOM کل اپلیکیشن شما را مدیریت می‌کند. برای افزودن کامپوننت‌های بیشتر، [آن‌ها را درون کامپوننت `App` تودرتو کنید.](/learn/importing-and-exporting-components) وقتی نیاز به به‌روزرسانی رابط کاربری دارید، هر یک از کامپوننت‌های شما می‌تواند این کار را با [استفاده از استیت](/reference/react/useState) انجام دهد. وقتی نیاز به نمایش محتوای اضافی مانند یک modal یا یک tooltip بیرون از گرهٔ DOM دارید، [آن را با یک پورتال رندر کنید.](/reference/react-dom/createPortal)

<Note>

وقتی HTML شما خالی است، کاربر تا زمان بارگذاری و اجرای کد JavaScript اپلیکیشن یک صفحهٔ خالی می‌بیند:

```html
<div id="root"></div>
```

این می‌تواند بسیار کند به‌نظر برسد! برای حل این مشکل، می‌توانید HTML اولیه را از کامپوننت‌های خود [روی سرور یا در طول build تولید کنید.](/reference/react-dom/server) سپس بازدیدکنندگان شما می‌توانند قبل از بارگذاری هر کد JavaScript متنی را بخوانند، تصاویر را ببینند و روی لینک‌ها کلیک کنند. ما [استفاده از یک فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) را توصیه می‌کنیم که این بهینه‌سازی را به‌صورت پیش‌فرض انجام می‌دهد. بسته به زمان اجرای آن، این *server-side rendering (SSR)* یا *static site generation (SSG)* نامیده می‌شود.

</Note>

<Pitfall>

**اپلیکیشن‌هایی که از رندر سرور یا تولید استاتیک استفاده می‌کنند باید به‌جای `createRoot` از [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) استفاده کنند.** سپس ری‌اکت گره‌های DOM از HTML شما را *هیدریشن* (استفادهٔ مجدد) می‌کند به‌جای اینکه آن‌ها را تخریب و بازسازی کند.

</Pitfall>

---

### رندر یک صفحه که به‌طور جزئی با ری‌اکت ساخته شده {/*rendering-a-page-partially-built-with-react*/}

اگر صفحهٔ شما [به‌طور کامل با ری‌اکت ساخته نشده](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)، می‌توانید `createRoot` را چندین بار فراخوانی کنید تا برای هر تکهٔ سطح‌بالای رابط کاربری مدیریت‌شده توسط ری‌اکت یک root ایجاد کنید. می‌توانید با فراخوانی [`root.render`](#root-render) محتوای متفاوتی در هر root نمایش دهید.

در اینجا، دو کامپوننت ری‌اکت متفاوت در دو گرهٔ DOM تعریف‌شده در فایل `index.html` رندر می‌شوند:

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <nav id="navigation"></nav>
    <main>
      <p>This paragraph is not rendered by React (open index.html to verify).</p>
      <section id="comments"></section>
    </main>
  </body>
</html>
```

```js src/index.js active
import './styles.css';
import { createRoot } from 'react-dom/client';
import { Comments, Navigation } from './Components.js';

const navDomNode = document.getElementById('navigation');
const navRoot = createRoot(navDomNode); 
navRoot.render(<Navigation />);

const commentDomNode = document.getElementById('comments');
const commentRoot = createRoot(commentDomNode); 
commentRoot.render(<Comments />);
```

```js src/Components.js
export function Navigation() {
  return (
    <ul>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/about">About</NavLink>
    </ul>
  );
}

function NavLink({ href, children }) {
  return (
    <li>
      <a href={href}>{children}</a>
    </li>
  );
}

export function Comments() {
  return (
    <>
      <h2>Comments</h2>
      <Comment text="Hello!" author="Sophie" />
      <Comment text="How are you?" author="Sunil" />
    </>
  );
}

function Comment({ text, author }) {
  return (
    <p>{text} — <i>{author}</i></p>
  );
}
```

```css
nav ul { padding: 0; margin: 0; }
nav ul li { display: inline-block; margin-right: 20px; }
```

</Sandpack>

شما همچنین می‌توانید یک گرهٔ DOM جدید با [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) ایجاد کنید و آن را به‌صورت دستی به سند اضافه کنید.

```js
const domNode = document.createElement('div');
const root = createRoot(domNode); 
root.render(<Comment />);
document.body.appendChild(domNode); // You can add it anywhere in the document
```

برای حذف درخت ری‌اکت از گرهٔ DOM و پاک‌سازی تمام منابع استفاده‌شده توسط آن، [`root.unmount`](#root-unmount) را فراخوانی کنید.

```js
root.unmount();
```

این عمدتاً مفید است اگر کامپوننت‌های ری‌اکت شما درون اپلیکیشنی نوشته‌شده با یک فریم‌ورک متفاوت قرار دارند.

---

### به‌روزرسانی یک کامپوننت ریشه {/*updating-a-root-component*/}

می‌توانید `render` را بیش از یک بار روی همان root فراخوانی کنید. تا زمانی که ساختار درخت کامپوننت با آنچه قبلاً رندر شده مطابقت داشته باشد، ری‌اکت [استیت را حفظ می‌کند.](/learn/preserving-and-resetting-state) توجه کنید که چگونه می‌توانید در ورودی تایپ کنید، که به این معناست که به‌روزرسانی‌ها از فراخوانی‌های مکرر `render` هر ثانیه در این مثال مخرب نیستند:

<Sandpack>

```js src/index.js active
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.js';

const root = createRoot(document.getElementById('root'));

let i = 0;
setInterval(() => {
  root.render(<App counter={i} />);
  i++;
}, 1000);
```

```js src/App.js
export default function App({counter}) {
  return (
    <>
      <h1>Hello, world! {counter}</h1>
      <input placeholder="Type something here" />
    </>
  );
}
```

</Sandpack>

فراخوانی `render` چندین بار معمول نیست. معمولاً، کامپوننت‌های شما به‌جای آن [استیت را به‌روز می‌کنند](/reference/react/useState).

### ثبت خطا در محیط production {/*error-logging-in-production*/}

به‌طور پیش‌فرض، ری‌اکت تمام خطاها را در کنسول ثبت می‌کند. برای پیاده‌سازی گزارش خطای خودتان، می‌توانید هندلرهای خطای اختیاری root را به‌عنوان `onUncaughtError`، `onCaughtError` و `onRecoverableError` ارائه دهید:

```js [[1, 6, "onCaughtError"], [2, 6, "error", 1], [3, 6, "errorInfo"], [4, 10, "componentStack", 15]]
import { createRoot } from "react-dom/client";
import { reportCaughtError } from "./reportError";

const container = document.getElementById("root");
const root = createRoot(container, {
  onCaughtError: (error, errorInfo) => {
    if (error.message !== "Known error") {
      reportCaughtError({
        error,
        componentStack: errorInfo.componentStack,
      });
    }
  },
});
```

گزینهٔ <CodeStep step={1}>onCaughtError</CodeStep> یک تابع است که با دو آرگومان فراخوانی می‌شود:

1. <CodeStep step={2}>error</CodeStep> که پرتاب شده است.
2. یک شیء <CodeStep step={3}>errorInfo</CodeStep> که شامل <CodeStep step={4}>componentStack</CodeStep> خطا است.

همراه با `onUncaughtError` و `onRecoverableError`، می‌توانید سیستم گزارش خطای خودتان را پیاده‌سازی کنید:

<Sandpack>

```js src/reportError.js
function reportError({ type, error, errorInfo }) {
  // The specific implementation is up to you.
  // `console.error()` is only used for demonstration purposes.
  console.error(type, error, "Component Stack: ");
  console.error("Component Stack: ", errorInfo.componentStack);
}

export function onCaughtErrorProd(error, errorInfo) {
  if (error.message !== "Known error") {
    reportError({ type: "Caught", error, errorInfo });
  }
}

export function onUncaughtErrorProd(error, errorInfo) {
  reportError({ type: "Uncaught", error, errorInfo });
}

export function onRecoverableErrorProd(error, errorInfo) {
  reportError({ type: "Recoverable", error, errorInfo });
}
```

```js src/index.js active
import { createRoot } from "react-dom/client";
import App from "./App.js";
import {
  onCaughtErrorProd,
  onRecoverableErrorProd,
  onUncaughtErrorProd,
} from "./reportError";

const container = document.getElementById("root");
const root = createRoot(container, {
  // Keep in mind to remove these options in development to leverage
  // React's default handlers or implement your own overlay for development.
  // The handlers are only specfied unconditionally here for demonstration purposes.
  onCaughtError: onCaughtErrorProd,
  onRecoverableError: onRecoverableErrorProd,
  onUncaughtError: onUncaughtErrorProd,
});
root.render(<App />);
```

```js src/App.js
import { Component, useState } from "react";

function Boom() {
  foo.bar = "baz";
}

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function App() {
  const [triggerUncaughtError, settriggerUncaughtError] = useState(false);
  const [triggerCaughtError, setTriggerCaughtError] = useState(false);

  return (
    <>
      <button onClick={() => settriggerUncaughtError(true)}>
        Trigger uncaught error
      </button>
      {triggerUncaughtError && <Boom />}
      <button onClick={() => setTriggerCaughtError(true)}>
        Trigger caught error
      </button>
      {triggerCaughtError && (
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      )}
    </>
  );
}
```

</Sandpack>

## رفع اشکال {/*troubleshooting*/}

### من یک root ایجاد کرده‌ام، اما چیزی نمایش داده نمی‌شود {/*ive-created-a-root-but-nothing-is-displayed*/}

مطمئن شوید که فراموش نکرده‌اید اپلیکیشن خود را واقعاً در root *رندر* کنید:

```js {5}
import { createRoot } from 'react-dom/client';
import App from './App.js';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

تا زمانی که این کار را نکنید، چیزی نمایش داده نمی‌شود.

---

### خطایی دریافت می‌کنم: «You passed a second argument to root.render» {/*im-getting-an-error-you-passed-a-second-argument-to-root-render*/}

یک اشتباه رایج این است که گزینه‌های `createRoot` را به `root.render(...)` پاس می‌دهید:

<ConsoleBlock level="error">

Warning: You passed a second argument to root.render(...) but it only accepts one argument.

</ConsoleBlock>

برای رفع، گزینه‌های root را به `createRoot(...)` پاس دهید، نه به `root.render(...)`:
```js {2,5}
// 🚩 Wrong: root.render only takes one argument.
root.render(App, {onUncaughtError});

// ✅ Correct: pass options to createRoot.
const root = createRoot(container, {onUncaughtError}); 
root.render(<App />);
```

---

### خطایی دریافت می‌کنم: «Target container is not a DOM element» {/*im-getting-an-error-target-container-is-not-a-dom-element*/}

این خطا به این معناست که آنچه به `createRoot` پاس می‌دهید یک گرهٔ DOM نیست.

اگر مطمئن نیستید چه اتفاقی می‌افتد، سعی کنید آن را log کنید:

```js {2}
const domNode = document.getElementById('root');
console.log(domNode); // ???
const root = createRoot(domNode);
root.render(<App />);
```

مثلاً، اگر `domNode` برابر `null` است، به این معناست که [`getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) مقدار `null` برگردانده است. این اتفاق می‌افتد اگر در زمان فراخوانی شما هیچ گره‌ای در سند با ID داده‌شده وجود نداشته باشد. ممکن است چند دلیل برای آن وجود داشته باشد:

1. ID‌ای که جست‌وجو می‌کنید ممکن است با ID‌ای که در فایل HTML استفاده کرده‌اید متفاوت باشد. غلط‌های املایی را بررسی کنید!
2. تگ `<script>` باندل شما نمی‌تواند هیچ گرهٔ DOM‌ای که *بعد* از آن در HTML ظاهر می‌شود را «ببیند».

یک روش رایج دیگر برای دریافت این خطا نوشتن `createRoot(<App />)` به‌جای `createRoot(domNode)` است.

---

### خطایی دریافت می‌کنم: «Functions are not valid as a React child.» {/*im-getting-an-error-functions-are-not-valid-as-a-react-child*/}

این خطا به این معناست که آنچه به `root.render` پاس می‌دهید یک کامپوننت ری‌اکت نیست.

این ممکن است اتفاق بیفتد اگر `root.render` را با `Component` به‌جای `<Component />` فراخوانی کنید:

```js {2,5}
// 🚩 Wrong: App is a function, not a Component.
root.render(App);

// ✅ Correct: <App /> is a component.
root.render(<App />);
```

یا اگر یک تابع را به `root.render` پاس می‌دهید، به‌جای نتیجهٔ فراخوانی آن:

```js {2,5}
// 🚩 Wrong: createApp is a function, not a component.
root.render(createApp);

// ✅ Correct: call createApp to return a component.
root.render(createApp());
```

---

### HTML رندرشدهٔ سرور من از ابتدا بازسازی می‌شود {/*my-server-rendered-html-gets-re-created-from-scratch*/}

اگر اپلیکیشن شما server-rendered است و شامل HTML اولیهٔ تولیدشده توسط ری‌اکت است، ممکن است متوجه شوید که ایجاد یک root و فراخوانی `root.render` تمام آن HTML را حذف و سپس تمام گره‌های DOM را از ابتدا بازسازی می‌کند. این می‌تواند کندتر باشد، تمرکز و موقعیت اسکرول را بازنشانی کند، و ممکن است سایر ورودی‌های کاربر را از دست بدهد.

اپلیکیشن‌های server-rendered باید به‌جای `createRoot` از [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) استفاده کنند:

```js {1,4-7}
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(
  document.getElementById('root'),
  <App />
);
```

توجه کنید که API آن متفاوت است. به‌خصوص، معمولاً دیگر فراخوانی `root.render` وجود نخواهد داشت.
