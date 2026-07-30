---
title: "<form>"
---

<Intro>

[کامپوننت `<form>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) به شما اجازه می‌دهد کنترل‌های تعاملی برای ارسال اطلاعات ایجاد کنید.

```js
<form action={search}>
    <input name="query" />
    <button type="submit">Search</button>
</form>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<form>` {/*form*/}

برای ایجاد کنترل‌های تعاملی جهت ارسال اطلاعات، [کامپوننت `<form>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) را رندر کنید.

```js
<form action={search}>
    <input name="query" />
    <button type="submit">Search</button>
</form>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*props*/}

`<form>` از تمام [پراپس‌های رایج المان](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

[`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action): یک URL یا تابع. وقتی یک URL به `action` پاس داده می‌شود، فرم مانند کامپوننت فرم HTML رفتار خواهد کرد. وقتی یک تابع به `action` پاس داده می‌شود، تابع ارسال فرم را در یک ترنزیشن مدیریت خواهد کرد که از [الگوی پراپس Action](/reference/react/useTransition#exposing-action-props-from-components) پیروی می‌کند. تابع پاس‌داده‌شده به `action` ممکن است async باشد و با یک آرگومان منفرد شامل [داده‌های فرم](https://developer.mozilla.org/en-US/docs/Web/API/FormData) فرم ارسالی فراخوانی می‌شود. پراپس `action` می‌تواند با ویژگی `formAction` روی یک کامپوننت `<button>`، `<input type="submit">` یا `<input type="image">` بازنویسی شود.

#### نکات {/*caveats*/}

* وقتی یک تابع به `action` یا `formAction` پاس داده می‌شود، متد HTTP بدون توجه به مقدار پراپس `method` برابر POST خواهد بود.

---

## استفاده {/*usage*/}

### مدیریت ارسال فرم در کلاینت {/*handle-form-submission-on-the-client*/}

یک تابع به پراپس `action` فرم پاس دهید تا تابع هنگام ارسال فرم اجرا شود. [`formData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) به‌عنوان آرگومان به تابع پاس داده می‌شود تا بتوانید به داده‌های ارسالی توسط فرم دسترسی داشته باشید. این با [action HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action) معمول که فقط URL می‌پذیرد متفاوت است. پس از موفقیت تابع `action`، تمام المان‌های فیلد غیرکنترلی در فرم بازنشانی می‌شوند.

<Sandpack>

```js src/App.js
export default function Search() {
  function search(formData) {
    const query = formData.get("query");
    alert(`You searched for '${query}'`);
  }
  return (
    <form action={search}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
  );
}
```

</Sandpack>

### مدیریت ارسال فرم با یک Server Function {/*handle-form-submission-with-a-server-function*/}

یک `<form>` با یک ورودی و دکمهٔ submit رندر کنید. یک Server Function (تابعی که با [`'use server'`](/reference/rsc/use-server) علامت‌گذاری شده) به پراپس `action` فرم پاس دهید تا تابع هنگام ارسال فرم اجرا شود.

پاس‌دادن یک Server Function به `<form action>` به کاربران اجازه می‌دهد بدون فعال بودن JavaScript یا قبل از بارگذاری کد، فرم‌ها را ارسال کنند. این برای کاربرانی که اتصال یا دستگاه کندی دارند یا JavaScript را غیرفعال کرده‌اند مفید است و مشابه روش کار فرم‌ها وقتی یک URL به پراپس `action` پاس داده می‌شود است.

می‌توانید از فیلدهای فرم مخفی برای ارائهٔ داده‌ها به action `<form>` استفاده کنید. Server Function با داده‌های فیلد فرم مخفی به‌عنوان یک نمونه از [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) فراخوانی خواهد شد.

```jsx
import { updateCart } from './lib.js';

function AddToCart({productId}) {
  async function addToCart(formData) {
    'use server'
    const productId = formData.get('productId')
    await updateCart(productId)
  }
  return (
    <form action={addToCart}>
        <input type="hidden" name="productId" value={productId} />
        <button type="submit">Add to Cart</button>
    </form>

  );
}
```

به‌جای استفاده از فیلدهای فرم مخفی برای ارائهٔ داده‌ها به action `<form>`، می‌توانید متد <CodeStep step={1}>`bind`</CodeStep> را فراخوانی کنید تا آرگومان‌های اضافی به آن بدهید. این یک آرگومان جدید (<CodeStep step={2}>`productId`</CodeStep>) را به تابع علاوه بر <CodeStep step={3}>`formData`</CodeStep> که به‌عنوان آرگومان به تابع پاس داده می‌شود، bind می‌کند.

```jsx [[1, 8, "bind"], [2,8, "productId"], [2,4, "productId"], [3,4, "formData"]]
import { updateCart } from './lib.js';

function AddToCart({productId}) {
  async function addToCart(productId, formData) {
    "use server";
    await updateCart(productId)
  }
  const addProductToCart = addToCart.bind(null, productId);
  return (
    <form action={addProductToCart}>
      <button type="submit">Add to Cart</button>
    </form>
  );
}
```

وقتی `<form>` توسط یک [Server Component](/reference/rsc/use-client) رندر می‌شود، و یک [Server Function](/reference/rsc/server-functions) به پراپس `action` `<form>` پاس داده می‌شود، فرم به‌صورت [پیشرونده ارتقا یافته](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) است.

### نمایش یک حالت pending هنگام ارسال فرم {/*display-a-pending-state-during-form-submission*/}
برای نمایش یک حالت pending هنگام ارسال یک فرم، می‌توانید هوک `useFormStatus` را در کامپوننتی که در یک `<form>` رندر می‌شود فراخوانی کنید و ویژگی `pending` برگشتی را بخوانید.

در اینجا، ما از ویژگی `pending` برای نشان دادن اینکه فرم در حال ارسال است استفاده می‌کنیم.

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

برای کسب اطلاعات بیشتر دربارهٔ هوک `useFormStatus` به [مستندات مرجع](/reference/react-dom/hooks/useFormStatus) مراجعه کنید.

### به‌روزرسانی خوش‌بینانهٔ داده‌های فرم {/*optimistically-updating-form-data*/}
هوک `useOptimistic` راهی برای به‌روزرسانی خوش‌بینانه (optimistic) رابط کاربری قبل از اتمام یک عملیات پس‌زمینه مانند یک درخواست شبکه فراهم می‌کند. در زمینهٔ فرم‌ها، این تکنیک به پاسخگوتر شدن اپلیکیشن‌ها کمک می‌کند. وقتی کاربر فرمی را ارسال می‌کند، به‌جای انتظار برای پاسخ سرور برای منعکس کردن تغییرات، رابط کاربری بلافاصله با نتیجهٔ مورد انتظار به‌روز می‌شود.

مثلاً، وقتی کاربر پیامی را در فرم تایپ می‌کند و دکمهٔ «Send» را می‌زند، هوک `useOptimistic` اجازه می‌دهد پیام بلافاصله با برچسب «Sending...» در فهرست ظاهر شود، حتی قبل از اینکه پیام واقعاً به سرور ارسال شود. این رویکرد «خوش‌بینانه» حس سرعت و پاسخگویی می‌دهد. سپس فرم سعی می‌کند پیام را در پس‌زمینه واقعاً ارسال کند. وقتی سرور تأیید کرد پیام دریافت شده است، برچسب «Sending...» حذف می‌شود.

<Sandpack>



```js src/App.js
import { useOptimistic, useState, useRef } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessage }) {
  const formRef = useRef();
  async function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessage(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
```

```js src/actions.js
export async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
```

</Sandpack>

[//]: # 'Uncomment the next line, and delete this line after the `useOptimistic` reference documentation page is published'
[//]: # 'To learn more about the `useOptimistic` Hook see the [reference documentation](/reference/react/useOptimistic).'

### مدیریت خطاهای ارسال فرم {/*handling-form-submission-errors*/}

در برخی موارد تابع فراخوانی‌شده توسط پراپس `action` یک `<form>` خطا پرتاب می‌کند. می‌توانید این خطاها را با بپیچیدن `<form>` در یک Error Boundary مدیریت کنید. اگر تابع فراخوانی‌شده توسط پراپس `action` یک `<form>` خطا پرتاب کند، fallback برای error boundary نمایش داده خواهد شد.

<Sandpack>

```js src/App.js
import { ErrorBoundary } from "react-error-boundary";

export default function Search() {
  function search() {
    throw new Error("search error");
  }
  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <form action={search}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
    </ErrorBoundary>
  );
}

```

```json package.json hidden
{
  "dependencies": {
    "react": "19.0.0-rc-3edc000d-20240926",
    "react-dom": "19.0.0-rc-3edc000d-20240926",
    "react-scripts": "^5.0.0",
    "react-error-boundary": "4.0.3"
  },
  "main": "/index.js",
  "devDependencies": {}
}
```

</Sandpack>

### نمایش خطای ارسال فرم بدون JavaScript {/*display-a-form-submission-error-without-javascript*/}

نمایش پیام خطای ارسال فرم قبل از بارگذاری bundle JavaScript برای ارتقای پیشرونده نیازمند این است که:

1. `<form>` توسط یک [Server Component](/reference/rsc/use-client) رندر شود
1. تابع پاس‌داده‌شده به پراپس `action` `<form>` یک [Server Function](/reference/rsc/server-functions) باشد
1. از هوک `useActionState` برای نمایش پیام خطا استفاده شود

`useActionState` دو پارامتر می‌گیرد: یک [Server Function](/reference/rsc/server-functions) و یک استیت اولیه. `useActionState` دو مقدار برمی‌گرداند، یک متغیر استیت و یک action. action بازگشتی توسط `useActionState` باید به پراپس `action` فرم پاس داده شود. متغیر استیت بازگشتی توسط `useActionState` می‌تواند برای نمایش پیام خطا استفاده شود. مقدار بازگشتی توسط Server Function پاس‌داده‌شده به `useActionState` برای به‌روزرسانی متغیر استیت استفاده خواهد شد.

<Sandpack>

```js src/App.js
import { useActionState } from "react";
import { signUpNewUser } from "./api";

export default function Page() {
  async function signup(prevState, formData) {
    "use server";
    const email = formData.get("email");
    try {
      await signUpNewUser(email);
      alert(`Added "${email}"`);
    } catch (err) {
      return err.toString();
    }
  }
  const [message, signupAction] = useActionState(signup, null);
  return (
    <>
      <h1>Signup for my newsletter</h1>
      <p>Signup with the same email twice to see an error</p>
      <form action={signupAction} id="signup-form">
        <label htmlFor="email">Email: </label>
        <input name="email" id="email" placeholder="react@example.com" />
        <button>Sign up</button>
        {!!message && <p>{message}</p>}
      </form>
    </>
  );
}
```

```js src/api.js hidden
let emails = [];

export async function signUpNewUser(newEmail) {
  if (emails.includes(newEmail)) {
    throw new Error("This email address has already been added");
  }
  emails.push(newEmail);
}
```

</Sandpack>

اطلاعات بیشتر دربارهٔ به‌روزرسانی استیت از یک action فرم را در مستندات [`useActionState`](/reference/react/useActionState) ببینید

### مدیریت انواع ارسال متعدد {/*handling-multiple-submission-types*/}

فرم‌ها می‌توانند طوری طراحی شوند که چندین action ارسال را بر اساس دکمه‌ای که کاربر فشار می‌دهد مدیریت کنند. هر دکمه درون یک فرم می‌تواند با یک action یا رفتار متمایز با تنظیم پراپس `formAction` مرتبط شود.

وقتی کاربر یک دکمهٔ خاص را ضربه می‌زند، فرم ارسال می‌شود و یک action متناظر که توسط ویژگی‌ها و action آن دکمه تعریف شده اجرا می‌شود. مثلاً، یک فرم ممکن است به‌طور پیش‌فرض یک مقاله را برای بازبینی ارسال کند اما یک دکمهٔ جداگانه با `formAction` تنظیم‌شده برای ذخیرهٔ مقاله به‌عنوان پیش‌نویس داشته باشد.

<Sandpack>

```js src/App.js
export default function Search() {
  function publish(formData) {
    const content = formData.get("content");
    const button = formData.get("button");
    alert(`'${content}' was published with the '${button}' button`);
  }

  function save(formData) {
    const content = formData.get("content");
    alert(`Your draft of '${content}' has been saved!`);
  }

  return (
    <form action={publish}>
      <textarea name="content" rows={4} cols={40} />
      <br />
      <button type="submit" name="button" value="submit">Publish</button>
      <button formAction={save}>Save draft</button>
    </form>
  );
}
```

</Sandpack>
