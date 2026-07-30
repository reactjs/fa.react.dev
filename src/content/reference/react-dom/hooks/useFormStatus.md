---
title: useFormStatus
---

<Intro>

`useFormStatus` یک هوک است که اطلاعات وضعیت آخرین ارسال فرم را به شما می‌دهد.

```js
const { pending, data, method, action } = useFormStatus();
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useFormStatus()` {/*use-form-status*/}

هوک `useFormStatus` اطلاعات وضعیت آخرین ارسال فرم را فراهم می‌کند.

```js {5},[[1, 6, "status.pending"]]
import { useFormStatus } from "react-dom";
import action from './actions';

function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending}>Submit</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
```

برای دریافت اطلاعات وضعیت، کامپوننت `Submit` باید داخل یک `<form>` رندر شود. این هوک اطلاعاتی مانند پراپرتی <CodeStep step={1}>`pending`</CodeStep> را برمی‌گرداند که به شما می‌گوید آیا فرم در حال ارسال است یا خیر.

در مثال بالا، `Submit` از این اطلاعات برای غیرفعال کردن فشردن دکمهٔ `<button>` در حین ارسال فرم استفاده می‌کند.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

`useFormStatus` هیچ پارامتری نمی‌گیرد.

#### مقدار برگشتی {/*returns*/}

یک شیء `status` با پراپرتی‌های زیر:

* `pending`: یک مقدار بولی. اگر `true` باشد، یعنی `<form>` والد در انتظار ارسال است. در غیر این صورت، `false`.

* `data`: یک شیء که [`رابط FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) را پیاده‌سازی می‌کند و شامل داده‌هایی است که `<form>` والد در حال ارسال آن‌هاست. اگر ارسال فعالی در جریان نباشد یا `<form>` والدی وجود نداشته باشد، مقدار آن `null` خواهد بود.

* `method`: یک مقدار رشته‌ای که یا `'get'` است یا `'post'`. این نشان می‌دهد که `<form>` والد در حال ارسال با [روش HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) از نوع `GET` یا `POST` است. به‌طور پیش‌فرض، یک `<form>` از روش `GET` استفاده می‌کند و می‌توان آن را با پراپرتی [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method) مشخص کرد.

[//]: # (Link to `<form>` documentation. "Read more on the `action` prop on `<form>`.")
* `action`: ارجاعی به تابعی که به پراپ `action` در `<form>` والد پاس داده شده است. اگر `<form>` والدی وجود نداشته باشد، این پراپرتی `null` است. اگر یک مقدار URI به پراپ `action` پاس داده شده باشد، یا پراپ `action`ای مشخص نشده باشد، `status.action` مقدار `null` خواهد داشت.

#### نکات {/*caveats*/}

* هوک `useFormStatus` باید از کامپوننتی فراخوانی شود که داخل یک `<form>` رندر می‌شود.
* `useFormStatus` فقط اطلاعات وضعیت را برای `<form>` والد برمی‌گرداند. این هوک اطلاعات وضعیت را برای هیچ `<form>`ای که در همان کامپوننت یا کامپوننت‌های فرزند رندر می‌شود، برنمی‌گرداند.

---

## نحوهٔ استفاده {/*usage*/}

### نمایش استیت در حال انتظار هنگام ارسال فرم {/*display-a-pending-state-during-form-submission*/}
برای نمایش یک استیت در حال انتظار (pending) هنگام ارسال فرم، می‌توانید هوک `useFormStatus` را در کامپوننتی که داخل یک `<form>` رندر می‌شود فراخوانی کنید و پراپرتی `pending` برگشتی را بخوانید.

در اینجا، ما از پراپرتی `pending` برای نشان دادن اینکه فرم در حال ارسال است استفاده می‌کنیم.

<Sandpack>

```js src/App.js
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function Form({ action }) {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}

export default function App() {
  return <Form action={submitForm} />;
}
```

```js src/actions.js hidden
export async function submitForm(query) {
    await new Promise((res) => setTimeout(res, 1000));
}
```
</Sandpack>

<Pitfall>

##### `useFormStatus` اطلاعات وضعیت را برای `<form>`ای که در همان کامپوننت رندر شده برنمی‌گرداند. {/*useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component*/}

هوک `useFormStatus` فقط اطلاعات وضعیت را برای `<form>` والد برمی‌گرداند، نه برای هیچ `<form>`ای که در همان کامپوننتِ فراخوان‌کنندهٔ هوک یا کامپوننت‌های فرزند رندر می‌شود.

```js
function Form() {
  // 🚩 `pending` هرگز true نخواهد شد
  // useFormStatus فرمی که در این کامپوننت رندر می‌شود را ردیابی نمی‌کند
  const { pending } = useFormStatus();
  return <form action={submit}></form>;
}
```

به‌جای این کار، `useFormStatus` را از داخل کامپوننتی فراخوانی کنید که داخل `<form>` قرار دارد.

```js
function Submit() {
  // ✅ `pending` از فرمی که کامپوننت Submit را در بر می‌گیرد مشتق می‌شود
  const { pending } = useFormStatus();
  return <button disabled={pending}>...</button>;
}

function Form() {
  // این همان <form>ای است که useFormStatus ردیابی می‌کند
  return (
    <form action={submit}>
      <Submit />
    </form>
  );
}
```

</Pitfall>

### خواندن داده‌های فرم در حال ارسال {/*read-form-data-being-submitted*/}

می‌توانید از پراپرتی `data` در اطلاعات وضعیت برگشتی از `useFormStatus` برای نمایش داده‌هایی که کاربر در حال ارسال آن‌هاست استفاده کنید.

در اینجا، فرمی داریم که در آن کاربران می‌توانند یک نام کاربری درخواست کنند. می‌توانیم از `useFormStatus` برای نمایش یک پیام وضعیت موقت که نام کاربری درخواست‌شده را تأیید می‌کند، استفاده کنیم.

<Sandpack>

```js src/UsernameForm.js active
import {useState, useMemo, useRef} from 'react';
import {useFormStatus} from 'react-dom';

export default function UsernameForm() {
  const {pending, data} = useFormStatus();

  return (
    <div>
      <h3>Request a Username: </h3>
      <input type="text" name="username" disabled={pending}/>
      <button type="submit" disabled={pending}>
        Submit
      </button>
      <br />
      <p>{data ? `Requesting ${data?.get("username")}...`: ''}</p>
    </div>
  );
}
```

```js src/App.js
import UsernameForm from './UsernameForm';
import { submitForm } from "./actions.js";
import {useRef} from 'react';

export default function App() {
  const ref = useRef(null);
  return (
    <form ref={ref} action={async (formData) => {
      await submitForm(formData);
      ref.current.reset();
    }}>
      <UsernameForm />
    </form>
  );
}
```

```js src/actions.js hidden
export async function submitForm(query) {
    await new Promise((res) => setTimeout(res, 2000));
}
```

```css
p {
    height: 14px;
    padding: 0;
    margin: 2px 0 0 0 ;
    font-size: 14px
}

button {
    margin-left: 2px;
}

```

</Sandpack>

---

## رفع اشکال {/*troubleshooting*/}

### `status.pending` هرگز `true` نمی‌شود {/*pending-is-never-true*/}

`useFormStatus` فقط اطلاعات وضعیت را برای `<form>` والد برمی‌گرداند.

اگر کامپوننتی که `useFormStatus` را فراخوانی می‌کند داخل یک `<form>` نباشد، `status.pending` همیشه `false` برمی‌گردد. بررسی کنید که `useFormStatus` در کامپوننتی فراخوانی شود که فرزند یک عنصر `<form>` است.

`useFormStatus` وضعیت `<form>`ای که در همان کامپوننت رندر می‌شود را ردیابی نمی‌کند. برای جزئیات بیشتر به [Pitfall](#useformstatus-will-not-return-status-information-for-a-form-rendered-in-the-same-component) مراجعه کنید.
