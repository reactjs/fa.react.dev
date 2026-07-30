---
title: use
---

<Intro>

`use` یک API ری‌اکت است که به شما اجازه می‌دهد مقدار یک منبع مانند یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا [کانتکست](/learn/passing-data-deeply-with-context) را بخوانید.

```js
const value = use(resource);
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `use(resource)` {/*use*/}

برای خواندن مقدار یک منبع مانند یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا [کانتکست](/learn/passing-data-deeply-with-context)، `use` را در کامپوننت خود فراخوانی کنید.

```jsx
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
```

برخلاف هوک‌های ری‌اکت، `use` می‌تواند درون حلقه‌ها و عبارات شرطی مانند `if` فراخوانی شود. مانند هوک‌های ری‌اکت، تابعی که `use` را فراخوانی می‌کند باید یک کامپوننت یا هوک باشد.

هنگامی که با یک Promise فراخوانی می‌شود، APIِ `use` با [`Suspense`](/reference/react/Suspense) و [مرزهای خطا (error boundaries)](/reference/react/Component#catching-rendering-errors-with-an-error-boundary) یکپارچه می‌شود. کامپوننتی که `use` را فراخوانی می‌کند تا زمانی که Promise پاس‌داده‌شده به `use` در حالت pending است، *معلق (suspend)* می‌شود. اگر کامپوننتی که `use` را فراخوانی می‌کند در یک مرز Suspense پیچیده شده باشد، fallback نمایش داده خواهد شد. هنگامی که Promise حل شد، fallback ساسپنس با کامپوننت‌های رندرشده با استفاده از داده‌های بازگشتی از APIِ `use` جایگزین می‌شود. اگر Promise پاس‌داده‌شده به `use` رد (reject) شود، fallback نزدیک‌ترین مرز خطا نمایش داده خواهد شد.

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `resource`: این منبع داده‌ای است که می‌خواهید مقداری را از آن بخوانید. یک منبع می‌تواند یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا یک [کانتکست](/learn/passing-data-deeply-with-context) باشد.

#### مقادیر بازگشتی {/*returns*/}

APIِ `use` مقداری را که از منبع خوانده شده برمی‌گرداند، مانند مقدار حل‌شدهٔ یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا [کانتکست](/learn/passing-data-deeply-with-context).

#### موارد احتیاط {/*caveats*/}

* APIِ `use` باید درون یک کامپوننت یا یک هوک فراخوانی شود.
* هنگام واکشی داده در یک [کامپوننت سرور](/reference/rsc/server-components)، `async` و `await` را به `use` ترجیح دهید. `async` و `await` رندر را از نقطه‌ای که `await` فراخوانی شده از سر می‌گیرند، در حالی که `use` پس از حل شدن داده‌ها کامپوننت را دوباره رندر می‌کند.
* ایجاد Promises در [کامپوننت‌های سرور](/reference/rsc/server-components) و پاس‌دادن آن‌ها به [کامپوننت‌های کلاینت](/reference/rsc/use-client) را به ایجاد Promises در کامپوننت‌های کلاینت ترجیح دهید. Promises ایجادشده در کامپوننت‌های کلاینت در هر رندر دوباره ایجاد می‌شوند. Promises پاس‌داده‌شده از یک کامپوننت سرور به یک کامپوننت کلاینت میان رندرهای مجدد پایدار هستند. [این مثال را ببینید](#streaming-data-from-server-to-client).

---

## استفاده {/*usage*/}

### خواندن کانتکست با `use` {/*reading-context-with-use*/}

هنگامی که یک [کانتکست](/learn/passing-data-deeply-with-context) به `use` پاس داده می‌شود، مانند [`useContext`](/reference/react/useContext) کار می‌کند. در حالی که `useContext` باید در بالاترین سطح کامپوننت شما فراخوانی شود، `use` می‌تواند درون شرطی‌هایی مانند `if` و حلقه‌هایی مانند `for` فراخوانی شود. `use` بر `useContext` ترجیح داده می‌شود زیرا انعطاف‌پذیرتر است.

```js [[2, 4, "theme"], [1, 4, "ThemeContext"]]
import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ... 
```

`use` <CodeStep step={2}>مقدار کانتکست</CodeStep> را برای <CodeStep step={1}>کانتکست</CodeStep>ای که پاس داده‌اید برمی‌گرداند. برای تعیین مقدار کانتکست، ری‌اکت درخت کامپوننت را جستجو می‌کند و **نزدیک‌ترین پروایدر کانتکست بالاتر** را برای آن کانتکست خاص پیدا می‌کند.

برای پاس‌دادن کانتکست به یک `Button`، آن را یا یکی از کامپوننت‌های والدش را در پروایدر کانتکست مربوطه بپیچید.

```js [[1, 3, "ThemeContext"], [2, 3, "\\"dark\\""], [1, 5, "ThemeContext"]]
function MyPage() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  );
}

function Form() {
  // ... renders buttons inside ...
}
```

مهم نیست چند لایه کامپوننت میان پروایدر و `Button` وجود دارد. وقتی یک `Button` *در هر جایی* درون `Form` تابع `use(ThemeContext)` را فراخوانی می‌کند، مقدار `"dark"` را دریافت خواهد کرد.

برخلاف [`useContext`](/reference/react/useContext)، <CodeStep step={2}>`use`</CodeStep> می‌تواند در شرطی‌ها و حلقه‌هایی مانند <CodeStep step={1}>`if`</CodeStep> فراخوانی شود.

```js [[1, 2, "if"], [2, 3, "use"]]
function HorizontalRule({ show }) {
  if (show) {
    const theme = use(ThemeContext);
    return <hr className={theme} />;
  }
  return false;
}
```

<CodeStep step={2}>`use`</CodeStep> از درون یک عبارت <CodeStep step={1}>`if`</CodeStep> فراخوانی می‌شود، که به شما اجازه می‌دهد مقادیر را به‌صورت شرطی از یک کانتکست بخوانید.

<Pitfall>

مانند `useContext`، `use(context)` همیشه به دنبال نزدیک‌ترین پروایدر کانتکست *بالاتر از* کامپوننتی که آن را فراخوانی می‌کند می‌گردد. این تابع به سمت بالا جستجو می‌کند و پروایدرهای کانتکست در کامپوننتی که از آن `use(context)` را فراخوانی می‌کنید را **در نظر نمی‌گیرد**.

</Pitfall>

<Sandpack>

```js
import { createContext, use } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button show={true}>Sign up</Button>
      <Button show={false}>Log in</Button>
    </Panel>
  );
}

function Panel({ title, children }) {
  const theme = use(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {children}
      </button>
    );
  }
  return false
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

### استریم داده از سرور به کلاینت {/*streaming-data-from-server-to-client*/}

داده‌ها می‌توانند با پاس‌دادن یک Promise به‌عنوان پراپ از یک <CodeStep step={1}>کامپوننت سرور</CodeStep> به یک <CodeStep step={2}>کامپوننت کلاینت</CodeStep> از سرور به کلاینت استریم شوند.

```js [[1, 4, "App"], [2, 2, "Message"], [3, 7, "Suspense"], [4, 8, "messagePromise", 30], [4, 5, "messagePromise"]]
import { fetchMessage } from './lib.js';
import { Message } from './message.js';

export default function App() {
  const messagePromise = fetchMessage();
  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

سپس <CodeStep step={2}>کامپوننت کلاینت</CodeStep> <CodeStep step={4}>Promiseای را که به‌عنوان پراپ دریافت کرده</CodeStep> می‌گیرد و آن را به APIِ <CodeStep step={5}>`use`</CodeStep> پاس می‌دهد. این به <CodeStep step={2}>کامپوننت کلاینت</CodeStep> اجازه می‌دهد مقدار را از <CodeStep step={4}>Promise</CodeStep>ای که در ابتدا توسط کامپوننت سرور ایجاد شده بود بخواند.

```js [[2, 6, "Message"], [4, 6, "messagePromise"], [4, 7, "messagePromise"], [5, 7, "use"]]
// message.js
'use client';

import { use } from 'react';

export function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}
```
چون <CodeStep step={2}>`Message`</CodeStep> در <CodeStep step={3}>[`Suspense`](/reference/react/Suspense)</CodeStep> پیچیده شده، تا زمانی که Promise حل نشود، fallback نمایش داده خواهد شد. هنگامی که Promise حل شد، مقدار توسط APIِ <CodeStep step={5}>`use`</CodeStep> خوانده می‌شود و کامپوننت <CodeStep step={2}>`Message`</CodeStep> جایگزین fallback ساسپنس می‌شود.

<Sandpack>

```js src/message.js active
"use client";

import { use, Suspense } from "react";

function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}

export function MessageContainer({ messagePromise }) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

```js src/App.js hidden
import { useState } from "react";
import { MessageContainer } from "./message.js";

function fetchMessage() {
  return new Promise((resolve) => setTimeout(resolve, 1000, "⚛️"));
}

export default function App() {
  const [messagePromise, setMessagePromise] = useState(null);
  const [show, setShow] = useState(false);
  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  if (show) {
    return <MessageContainer messagePromise={messagePromise} />;
  } else {
    return <button onClick={download}>Download message</button>;
  }
}
```

```js src/index.js hidden
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// TODO: update this example to use
// the Codesandbox Server Component
// demo environment once it is created
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

</Sandpack>

<Note>

هنگام پاس‌دادن یک Promise از یک کامپوننت سرور به یک کامپوننت کلاینت، مقدار حل‌شدهٔ آن باید برای انتقال میان سرور و کلاینت سریالایزپذیر باشد. انواع داده‌ مانند توابع سریالایزپذیر نیستند و نمی‌توانند مقدار حل‌شدهٔ چنین Promiseای باشند.

</Note>


<DeepDive>

#### آیا باید یک Promise را در یک کامپوننت سرور یا کلاینت حل کنم؟ {/*resolve-promise-in-server-or-client-component*/}

یک Promise می‌تواند از یک کامپوننت سرور به یک کامپوننت کلاینت پاس داده شود و در کامپوننت کلاینت با APIِ `use` حل شود. همچنین می‌توانید Promise را در یک کامپوننت سرور با `await` حل کنید و داده‌های مورد نیاز را به‌عنوان پراپ به کامپوننت کلاینت پاس بدهید.

```js
export default async function App() {
  const messageContent = await fetchMessage();
  return <Message messageContent={messageContent} />
}
```

اما استفاده از `await` در یک [کامپوننت سرور](/reference/rsc/server-components) رندر آن را تا پایان عبارت `await` مسدود می‌کند. پاس‌دادن یک Promise از یک کامپوننت سرور به یک کامپوننت کلاینت از مسدود شدن رندر کامپوننت سرور توسط Promise جلوگیری می‌کند.

</DeepDive>

### برخورد با Promises رد‌شده {/*dealing-with-rejected-promises*/}

در برخی موارد ممکن است Promiseای به `use` پاس داده شده رد شود. می‌توانید Promises رد‌شده را به یکی از این روش‌ها مدیریت کنید:

1. [نمایش یک خطا به کاربران با یک مرز خطا.](#displaying-an-error-to-users-with-error-boundary)
2. [ارائهٔ یک مقدار جایگزین با `Promise.catch`](#providing-an-alternative-value-with-promise-catch)

<Pitfall>
`use` نمی‌تواند در یک بلوک try-catch فراخوانی شود. به‌جای بلوک try-catch [کامپوننت خود را در یک مرز خطا بپیچید](#displaying-an-error-to-users-with-error-boundary)، یا [یک مقدار جایگزین برای استفاده با متد `.catch` Promise ارائه دهید](#providing-an-alternative-value-with-promise-catch).
</Pitfall>

#### نمایش یک خطا به کاربران با یک مرز خطا {/*displaying-an-error-to-users-with-error-boundary*/}

اگر می‌خواهید هنگام رد شدن یک Promise خطایی را به کاربران خود نمایش دهید، می‌توانید از یک [مرز خطا](/reference/react/Component#catching-rendering-errors-with-an-error-boundary) استفاده کنید. برای استفاده از مرز خطا، کامپوننتی را که در آن APIِ `use` را فراخوانی می‌کنید در یک مرز خطا بپیچید. اگر Promise پاس‌داده‌شده به `use` رد شود، fallback مرز خطا نمایش داده خواهد شد.

<Sandpack>

```js src/message.js active
"use client";

import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function MessageContainer({ messagePromise }) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <Suspense fallback={<p>⌛Downloading message...</p>}>
        <Message messagePromise={messagePromise} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Message({ messagePromise }) {
  const content = use(messagePromise);
  return <p>Here is the message: {content}</p>;
}
```

```js src/App.js hidden
import { useState } from "react";
import { MessageContainer } from "./message.js";

function fetchMessage() {
  return new Promise((resolve, reject) => setTimeout(reject, 1000));
}

export default function App() {
  const [messagePromise, setMessagePromise] = useState(null);
  const [show, setShow] = useState(false);
  function download() {
    setMessagePromise(fetchMessage());
    setShow(true);
  }

  if (show) {
    return <MessageContainer messagePromise={messagePromise} />;
  } else {
    return <button onClick={download}>Download message</button>;
  }
}
```

```js src/index.js hidden
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// TODO: update this example to use
// the Codesandbox Server Component
// demo environment once it is created
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```json package.json hidden
{
  "dependencies": {
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-scripts": "^5.0.0",
    "react-error-boundary": "4.0.3"
  },
  "main": "/index.js"
}
```
</Sandpack>

#### ارائهٔ یک مقدار جایگزین با `Promise.catch` {/*providing-an-alternative-value-with-promise-catch*/}

اگر می‌خواهید هنگام رد شدن Promise پاس‌داده‌شده به `use` یک مقدار جایگزین ارائه دهید، می‌توانید از متد <CodeStep step={1}>[`catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)</CodeStep> Promise استفاده کنید.

```js [[1, 6, "catch"],[2, 7, "return"]]
import { Message } from './message.js';

export default function App() {
  const messagePromise = new Promise((resolve, reject) => {
    reject();
  }).catch(() => {
    return "no new message found.";
  });

  return (
    <Suspense fallback={<p>waiting for message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

برای استفاده از متد <CodeStep step={1}>`catch`</CodeStep> Promise، <CodeStep step={1}>`catch`</CodeStep> را روی شیء Promise فراخوانی کنید. <CodeStep step={1}>`catch`</CodeStep> یک آرگومان می‌پذیرد: تابعی که یک پیام خطا به‌عنوان آرگومان می‌گیرد. هر چه توسط تابع پاس‌داده‌شده به <CodeStep step={1}>`catch`</CodeStep> <CodeStep step={2}>برگردانده شود</CodeStep> به‌عنوان مقدار حل‌شدهٔ Promise استفاده خواهد شد.

---

## رفع اشکال {/*troubleshooting*/}

### "Suspense Exception: This is not a real error!" {/*suspense-exception-error*/}

شما یا `use` را خارج از یک کامپوننت ری‌اکت یا تابع هوک فراخوانی می‌کنید، یا `use` را در یک بلوک try–catch فراخوانی می‌کنید. اگر `use` را درون یک بلوک try–catch فراخوانی می‌کنید، کامپوننت خود را در یک مرز خطا بپیچید، یا `catch` Promise را فراخوانی کنید تا خطا را بگیرید و Promise را با مقدار دیگری حل کنید. [این مثال‌ها را ببینید](#dealing-with-rejected-promises).

اگر `use` را خارج از یک کامپوننت ری‌اکت یا تابع هوک فراخوانی می‌کنید، فراخوانی `use` را به یک کامپوننت ری‌اکت یا تابع هوک منتقل کنید.

```jsx
function MessageComponent({messagePromise}) {
  function download() {
    // ❌ the function calling `use` is not a Component or Hook
    const message = use(messagePromise);
    // ...
```

در عوض، `use` را خارج از هر کلوشر کامپوننتی فراخوانی کنید، جایی که تابعی که `use` را فراخوانی می‌کند یک کامپوننت یا هوک باشد.

```jsx
function MessageComponent({messagePromise}) {
  // ✅ `use` is being called from a component. 
  const message = use(messagePromise);
  // ...
```
