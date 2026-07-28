---
title: captureOwnerStack
---

<Intro>

`captureOwnerStack` در محیط توسعه Owner Stack فعلی را می‌خواند و در صورت موجود بودن آن را به‌صورت رشته برمی‌گرداند.

```js
const stack = captureOwnerStack();
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `captureOwnerStack()` {/*captureownerstack*/}

برای دریافت Owner Stack فعلی، `captureOwnerStack` را فراخوانی کنید.

```js {5,5}
import * as React from 'react';

function Component() {
  if (process.env.NODE_ENV !== 'production') {
    const ownerStack = React.captureOwnerStack();
    console.log(ownerStack);
  }
}
```

#### پارامترها {/*parameters*/}

`captureOwnerStack` هیچ پارامتری نمی‌پذیرد.

#### مقادیر بازگشتی {/*returns*/}

`captureOwnerStack` مقدار `string | null` برمی‌گرداند.

Owner Stackها در موارد زیر موجود هستند:
- رندر کامپوننت
- افکت‌ها (مثلاً `useEffect`)
- هندلرهای رویداد ری‌اکت (مثلاً `<button onClick={...} />`)
- هندلرهای خطای ری‌اکت ([گزینه‌های React Root](/reference/react-dom/client/createRoot#parameters) `onCaughtError`، `onRecoverableError`، و `onUncaughtError`)

اگر هیچ Owner Stackای موجود نباشد، `null` برگردانده می‌شود (به [رفع اشکال: Owner Stack مقدار `null` است](#the-owner-stack-is-null) مراجعه کنید).

#### موارد احتیاط {/*caveats*/}

- Owner Stackها فقط در محیط توسعه در دسترس هستند. `captureOwnerStack` خارج از محیط توسعه همیشه `null` برمی‌گرداند.

<DeepDive>

#### Owner Stack در مقابل Component Stack {/*owner-stack-vs-component-stack*/}

Owner Stack با Component Stack موجود در هندلرهای خطای ری‌اکت مانند [`errorInfo.componentStack` در `onUncaughtError`](/reference/react-dom/client/hydrateRoot#error-logging-in-production) متفاوت است.

برای مثال، کد زیر را در نظر بگیرید:

<Sandpack>

```js src/App.js
import {Suspense} from 'react';

function SubComponent({disabled}) {
  if (disabled) {
    throw new Error('disabled');
  }
}

export function Component({label}) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <SubComponent key={label} disabled={label === 'disabled'} />
    </fieldset>
  );
}

function Navigation() {
  return null;
}

export default function App({children}) {
  return (
    <Suspense fallback="loading...">
      <main>
        <Navigation />
        {children}
      </main>
    </Suspense>
  );
}
```

```js src/index.js
import {captureOwnerStack} from 'react';
import {createRoot} from 'react-dom/client';
import App, {Component} from './App.js';
import './styles.css';

createRoot(document.createElement('div'), {
  onUncaughtError: (error, errorInfo) => {
    // The stacks are logged instead of showing them in the UI directly to
    // highlight that browsers will apply sourcemaps to the logged stacks.
    // Note that sourcemapping is only applied in the real browser console not
    // in the fake one displayed on this page.
    // Press "fork" to be able to view the sourcemapped stack in a real console.
    console.log(errorInfo.componentStack);
    console.log(captureOwnerStack());
  },
}).render(
  <App>
    <Component label="disabled" />
  </App>
);
```

```html public/index.html hidden
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p>Check the console output.</p>
  </body>
</html>
```

</Sandpack>

`SubComponent` خطایی پرتاب می‌کند.
Component Stackِ آن خطا خواهد بود

```
at SubComponent
at fieldset
at Component
at main
at React.Suspense
at App
```

با این حال، Owner Stack تنها می‌خواند

```
at Component
```

نه `App` و نه کامپوننت‌های DOM (مثلاً `fieldset`) در این Stack به‌عنوان Owner در نظر گرفته نمی‌شوند زیرا در «ایجاد» نود حاوی `SubComponent` نقشی نداشتند. `App` و کامپوننت‌های DOM فقط نود را فوروارد کردند. `App` فقط نود `children` را رندر کرد، برخلاف `Component` که نودی حاوی `SubComponent` از طریق `<SubComponent />` ایجاد کرد.

نه `Navigation` و نه `legend` اصلاً در Stack نیستند زیرا فقط خواهر/برادر یک نود حاوی `<SubComponent />` هستند.

`SubComponent` حذف شده زیرا از قبل بخشی از callstack است.

</DeepDive>

## استفاده {/*usage*/}

### بهبود یک overlay خطای سفارشی {/*enhance-a-custom-error-overlay*/}

```js [[1, 5, "console.error"], [4, 7, "captureOwnerStack"]]
import { captureOwnerStack } from "react";
import { instrumentedConsoleError } from "./errorOverlay";

const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
  originalConsoleError.apply(console, args);
  const ownerStack = captureOwnerStack();
  onConsoleError({
    // Keep in mind that in a real application, console.error can be
    // called with multiple arguments which you should account for.
    consoleMessage: args[0],
    ownerStack,
  });
};
```

اگر فراخوانی‌های <CodeStep step={1}>`console.error`</CodeStep> را برای هایلایت‌کردن آن‌ها در یک error overlay تله‌گذاری می‌کنید، می‌توانید <CodeStep step={2}>`captureOwnerStack`</CodeStep> را فراخوانی کنید تا Owner Stack را شامل شود.

<Sandpack>

```css src/styles.css
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}

label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }

#error-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  padding: 15px;
  opacity: 0.9;
  text-wrap: wrap;
  overflow: scroll;
}

.text-red {
  color: red;
}

.-mb-20 {
  margin-bottom: -20px;
}

.mb-0 {
  margin-bottom: 0;
}

.mb-10 {
  margin-bottom: 10px;
}

pre {
  text-wrap: wrap;
}

pre.nowrap {
  text-wrap: nowrap;
}

.hidden {
  display: none;  
}
```

```html public/index.html hidden
<!DOCTYPE html>
<html>
<head>
  <title>My app</title>
</head>
<body>
<!--
  Error dialog in raw HTML
  since an error in the React app may crash.
-->
<div id="error-dialog" class="hidden">
  <h1 id="error-title" class="text-red">Error</h1>
  <p>
    <pre id="error-body"></pre>
  </p>
  <h2 class="-mb-20">Owner Stack:</h4>
  <pre id="error-owner-stack" class="nowrap"></pre>
  <button
    id="error-close"
    class="mb-10"
    onclick="document.getElementById('error-dialog').classList.add('hidden')"
  >
    Close
  </button>
</div>
<!-- This is the DOM node -->
<div id="root"></div>
</body>
</html>

```

```js src/errorOverlay.js

export function onConsoleError({ consoleMessage, ownerStack }) {
  const errorDialog = document.getElementById("error-dialog");
  const errorBody = document.getElementById("error-body");
  const errorOwnerStack = document.getElementById("error-owner-stack");

  // Display console.error() message
  errorBody.innerText = consoleMessage;

  // Display owner stack
  errorOwnerStack.innerText = ownerStack;

  // Show the dialog
  errorDialog.classList.remove("hidden");
}
```

```js src/index.js active
import { captureOwnerStack } from "react";
import { createRoot } from "react-dom/client";
import App from './App';
import { onConsoleError } from "./errorOverlay";
import './styles.css';

const originalConsoleError = console.error;
console.error = function patchedConsoleError(...args) {
  originalConsoleError.apply(console, args);
  const ownerStack = captureOwnerStack();
  onConsoleError({
    // Keep in mind that in a real application, console.error can be
    // called with multiple arguments which you should account for.
    consoleMessage: args[0],
    ownerStack,
  });
};

const container = document.getElementById("root");
createRoot(container).render(<App />);
```

```js src/App.js
function Component() {
  return <button onClick={() => console.error('Some console error')}>Trigger console.error()</button>;
}

export default function App() {
  return <Component />;
}
```

</Sandpack>

## رفع اشکال {/*troubleshooting*/}

### Owner Stack مقدار `null` است {/*the-owner-stack-is-null*/}

فراخوانی `captureOwnerStack` خارج از یک تابع کنترل‌شده توسط ری‌اکت رخ داده است، مثلاً در یک کالبک `setTimeout`، پس از یک فراخوانی `fetch` یا در یک هندلر رویداد DOM سفارشی. در طول رندر، افکت‌ها، هندلرهای رویداد ری‌اکت، و هندلرهای خطای ری‌اکت (مثلاً `hydrateRoot#options.onCaughtError`) Owner Stackها باید موجود باشند.

در مثال زیر، کلیک روی دکمه یک Owner Stack خالی را لاگ می‌کند زیرا `captureOwnerStack` در طول یک هندلر رویداد DOM سفارشی فراخوانی شده است. Owner Stack باید زودتر ضبط شود، مثلاً با انتقال فراخوانی `captureOwnerStack` به بدنهٔ افکت.
<Sandpack>

```js
import {captureOwnerStack, useEffect} from 'react';

export default function App() {
  useEffect(() => {
    // Should call `captureOwnerStack` here.
    function handleEvent() {
      // Calling it in a custom DOM event handler is too late.
      // The Owner Stack will be `null` at this point.
      console.log('Owner Stack: ', captureOwnerStack());
    }

    document.addEventListener('click', handleEvent);

    return () => {
      document.removeEventListener('click', handleEvent);
    }
  })

  return <button>Click me to see that Owner Stacks are not available in custom DOM event handlers</button>;
}
```

</Sandpack>

### `captureOwnerStack` در دسترس نیست {/*captureownerstack-is-not-available*/}

`captureOwnerStack` فقط در buildهای توسعه صادر می‌شود. در buildهای production مقدار `undefined` خواهد بود. اگر `captureOwnerStack` در فایل‌هایی استفاده می‌شود که برای production و development باندل می‌شوند، باید به آن به‌صورت شرطی از طریق یک namespace import دسترسی پیدا کنید.

```js
// Don't use named imports of `captureOwnerStack` in files that are bundled for development and production.
import {captureOwnerStack} from 'react';
// Use a namespace import instead and access `captureOwnerStack` conditionally.
import * as React from 'react';

if (process.env.NODE_ENV !== 'production') {
  const ownerStack = React.captureOwnerStack();
  console.log('Owner Stack', ownerStack);
}
```
