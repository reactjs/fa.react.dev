---
title: useId
---

<Intro>

`useId` یک هوک ری‌اکت برای تولید شناسه‌های یکتا (ID) است که می‌توان آن‌ها را به ویژگی‌های دسترس‌پذیری (accessibility) پاس داد.

```js
const id = useId()
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useId()` {/*useid*/}

برای تولید یک شناسهٔ یکتا، `useId` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  // ...
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

`useId` هیچ پارامتری نمی‌پذیرد.

#### مقادیر بازگشتی {/*returns*/}

`useId` یک رشتهٔ شناسهٔ یکتا برمی‌گرداند که با این فراخوانی خاص `useId` در این کامپوننت خاص مرتبط است.

#### موارد احتیاط {/*caveats*/}

* `useId` یک هوک است، بنابراین فقط می‌توانید آن را **در بالاترین سطح کامپوننت خود** یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را درون حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.

* `useId` **نباید برای تولید کلیدها** در یک لیست استفاده شود. [کلیدها باید از داده‌های شما تولید شوند.](/learn/rendering-lists#where-to-get-your-key)

* `useId` در حال حاضر نمی‌تواند در [کامپوننت‌های سرور ناهمگام](/reference/rsc/server-components#async-components-with-server-components) استفاده شود.

---

## استفاده {/*usage*/}

<Pitfall>

**برای تولید کلیدها در یک لیست، `useId` را فراخوانی نکنید.** [کلیدها باید از داده‌های شما تولید شوند.](/learn/rendering-lists#where-to-get-your-key)

</Pitfall>

### تولید شناسه‌های یکتا برای ویژگی‌های دسترس‌پذیری {/*generating-unique-ids-for-accessibility-attributes*/}

برای تولید یک شناسهٔ یکتا، `useId` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js [[1, 4, "passwordHintId"]]
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  // ...
```

سپس می‌توانید <CodeStep step={1}>شناسهٔ تولیدشده</CodeStep> را به ویژگی‌های مختلف پاس بدهید:

```js [[1, 2, "passwordHintId"], [1, 3, "passwordHintId"]]
<>
  <input type="password" aria-describedby={passwordHintId} />
  <p id={passwordHintId}>
</>
```

**بیایید با یک مثال ببینیم چه زمانی این مفید است.**

[ویژگی‌های دسترس‌پذیری HTML](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) مانند [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) به شما اجازه می‌دهند مشخص کنید که دو تگ با یکدیگر مرتبط هستند. برای مثال، می‌توانید مشخص کنید که یک المان (مانند یک ورودی) توسط المان دیگری (مانند یک پاراگراف) توصیف می‌شود.

در HTML معمولی، این را به این شکل می‌نوشتید:

```html {5,8}
<label>
  Password:
  <input
    type="password"
    aria-describedby="password-hint"
  />
</label>
<p id="password-hint">
  The password should contain at least 18 characters
</p>
```

با این حال، هاردکد کردن شناسه‌ها به این شکل در ری‌اکت رویهٔ خوبی نیست. یک کامپوننت ممکن است بیش از یک بار روی صفحه رندر شود — اما شناسه‌ها باید یکتا باشند! به‌جای هاردکد کردن یک شناسه، یک شناسهٔ یکتا با `useId` تولید کنید:

```js {4,11,14}
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}
```

اکنون، حتی اگر `PasswordField` چندین بار روی صفحه ظاهر شود، شناسه‌های تولیدشده با هم تداخل نخواهند داشت.

<Sandpack>

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}

export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>
      <PasswordField />
    </>
  );
}
```

```css
input { margin: 5px; }
```

</Sandpack>

[این ویدئو را تماشا کنید](https://www.youtube.com/watch?v=0dNzNcuEuOo) تا تفاوت در تجربهٔ کاربری با فناوری‌های کمکی را ببینید.

<Pitfall>

با [رندر سرور](/reference/react-dom/server)، **`useId` نیاز به یک درخت کامپوننت یکسان روی سرور و کلاینت دارد**. اگر درختانی که روی سرور و کلاینت رندر می‌کنید دقیقاً مطابقت نداشته باشند، شناسه‌های تولیدشده مطابقت نخواهند داشت.

</Pitfall>

<DeepDive>

#### چرا useId بهتر از یک شمارندهٔ افزایشی است؟ {/*why-is-useid-better-than-an-incrementing-counter*/}

ممکن است تعجب کنید چرا `useId` بهتر از افزایش یک متغیر سراسری مانند `nextId++` است.

مزیت اصلی `useId` این است که ری‌اکت تضمین می‌کند با [رندر سرور](/reference/react-dom/server) کار می‌کند. در طول رندر سرور، کامپوننت‌های شما خروجی HTML تولید می‌کنند. بعداً، روی کلاینت، [hydration](/reference/react-dom/client/hydrateRoot) هندلرهای رویداد شما را به HTML تولیدشده متصل می‌کند. برای آنکه hydration کار کند، خروجی کلاینت باید با HTML سرور مطابقت داشته باشد.

تضمین این موضوع با یک شمارندهٔ افزایشی بسیار دشوار است زیرا ترتیبی که کامپوننت‌های کلاینت hydration می‌شوند ممکن است با ترتیبی که HTML سرور صادر شده مطابقت نداشته باشد. با فراخوانی `useId`، تضمین می‌کنید که hydration کار خواهد کرد و خروجی بین سرور و کلاینت مطابقت خواهد داشت.

درون ری‌اکت، `useId` از «مسیر والد» کامپوننت فراخواننده تولید می‌شود. به همین دلیل است که، اگر درخت کلاینت و سرور یکسان باشند، «مسیر والد» بدون توجه به ترتیب رندر مطابقت خواهد داشت.

</DeepDive>

---

### تولید شناسه‌ها برای چندین المان مرتبط {/*generating-ids-for-several-related-elements*/}

اگر نیاز به دادن شناسه‌ها به چندین المان مرتبط دارید، می‌توانید `useId` را برای تولید یک پیشوند مشترک برای آن‌ها فراخوانی کنید:

<Sandpack>

```js
import { useId } from 'react';

export default function Form() {
  const id = useId();
  return (
    <form>
      <label htmlFor={id + '-firstName'}>First Name:</label>
      <input id={id + '-firstName'} type="text" />
      <hr />
      <label htmlFor={id + '-lastName'}>Last Name:</label>
      <input id={id + '-lastName'} type="text" />
    </form>
  );
}
```

```css
input { margin: 5px; }
```

</Sandpack>

این به شما اجازه می‌دهد از فراخوانی `useId` برای هر المان منفردی که نیاز به شناسهٔ یکتا دارد اجتناب کنید.

---

### تعیین یک پیشوند مشترک برای همهٔ شناسه‌های تولیدشده {/*specifying-a-shared-prefix-for-all-generated-ids*/}

اگر چندین اپلیکیشن مستقل ری‌اکت را روی یک صفحهٔ واحد رندر می‌کنید، `identifierPrefix` را به‌عنوان یک گزینه به فراخوانی‌های [`createRoot`](/reference/react-dom/client/createRoot#parameters) یا [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) خود پاس بدهید. این تضمین می‌کند که شناسه‌های تولیدشده توسط دو اپلیکیشن متفاوت هرگز تداخل ندارند زیرا هر شناسهٔ تولیدشده با `useId` با پیشوند متمایزی که تعیین کرده‌اید شروع خواهد شد.

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <div id="root1"></div>
    <div id="root2"></div>
  </body>
</html>
```

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  console.log('Generated identifier:', passwordHintId)
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          aria-describedby={passwordHintId}
        />
      </label>
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}

export default function App() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
    </>
  );
}
```

```js src/index.js active
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './styles.css';

const root1 = createRoot(document.getElementById('root1'), {
  identifierPrefix: 'my-first-app-'
});
root1.render(<App />);

const root2 = createRoot(document.getElementById('root2'), {
  identifierPrefix: 'my-second-app-'
});
root2.render(<App />);
```

```css
#root1 {
  border: 5px solid blue;
  padding: 10px;
  margin: 5px;
}

#root2 {
  border: 5px solid green;
  padding: 10px;
  margin: 5px;
}

input { margin: 5px; }
```

</Sandpack>

---

### استفاده از همان پیشوند شناسه روی کلاینت و سرور {/*using-the-same-id-prefix-on-the-client-and-the-server*/}

اگر [چندین اپلیکیشن مستقل ری‌اکت را روی همان صفحه رندر می‌کنید](#specifying-a-shared-prefix-for-all-generated-ids)، و برخی از این اپلیکیشن‌ها روی سرور رندر می‌شوند، اطمینان حاصل کنید که `identifierPrefix`ای که به فراخوانی [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) در سمت کلاینت پاس می‌دهید همان `identifierPrefix`ای است که به [APIهای سرور](/reference/react-dom/server) مانند [`renderToPipeableStream`](/reference/react-dom/server/renderToPipeableStream) پاس می‌دهید.

```js
// Server
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(
  <App />,
  { identifierPrefix: 'react-app1' }
);
```

```js
// Client
import { hydrateRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = hydrateRoot(
  domNode,
  reactNode,
  { identifierPrefix: 'react-app1' }
);
```

اگر فقط یک اپلیکیشن ری‌اکت روی صفحه دارید، نیازی به پاس‌دادن `identifierPrefix` ندارید.
