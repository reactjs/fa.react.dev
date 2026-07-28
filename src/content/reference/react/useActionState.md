---
title: useActionState
---

<Intro>

`useActionState` یک هوک است که به شما اجازه می‌دهد استیت را بر اساس نتیجهٔ یک اکشن فرم به‌روزرسانی کنید.

```js
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

</Intro>

<Note>

در نسخه‌های اولیهٔ React Canary، این API بخشی از React DOM بود و `useFormState` نامیده می‌شد.

</Note>


<InlineToc />

---

## مرجع {/*reference*/}

### `useActionState(action, initialState, permalink?)` {/*useactionstate*/}

{/* TODO T164397693: link to actions documentation once it exists */}

برای ایجاد استیت کامپوننتی که [هنگام فراخوانی یک اکشن فرم](/reference/react-dom/components/form) به‌روزرسانی می‌شود، `useActionState` را در بالاترین سطح کامپوننت خود فراخوانی کنید. شما یک تابع اکشن فرم موجود و همچنین یک استیت اولیه را به `useActionState` پاس می‌دهید، و این هوک یک اکشن جدید که در فرم خود استفاده می‌کنید، به همراه آخرین استیت فرم و اینکه آیا اکشن هنوز در حالت pending است یا خیر را برمی‌گرداند. آخرین استیت فرم همچنین به تابعی که ارائه کرده‌اید پاس داده می‌شود.

```js
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}
```

استیت فرم مقداری است که توسط اکشن هنگام آخرین ارسال فرم بازگشده است. اگر فرم هنوز ارسال نشده است، این همان استیت اولیه‌ای است که پاس می‌دهید.

اگر با یک Server Function استفاده شود، `useActionState` اجازه می‌دهد پاسخ سرور از ارسال فرم حتی قبل از تکمیل hydration نمایش داده شود.

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `fn`: تابعی که هنگام ارسال فرم یا فشردن دکمه فراخوانی می‌شود. هنگام فراخوانی تابع، استیت قبلی فرم (در ابتدا `initialState` که پاس می‌دهید، سپس مقدار بازگشتی قبلی آن) به‌عنوان آرگومان اول آن دریافت می‌شود، و به دنبال آن آرگومان‌هایی که یک اکشن فرم معمولاً دریافت می‌کند.
* `initialState`: مقداری که می‌خواهید استیت در ابتدا داشته باشد. می‌تواند هر مقدار سریالایزپذیری باشد. این آرگومان پس از اولین فراخوانی اکشن نادیده گرفته می‌شود.
* **اختیاری** `permalink`: رشته‌ای حاوی URL یکتای صفحه‌ای که این فرم آن را تغییر می‌دهد. برای استفاده در صفحاتی با محتوای پویا (مثلاً فیدها) به همراه progressive enhancement: اگر `fn` یک [server function](/reference/rsc/server-functions) باشد و فرم قبل از بارگذاری باندل جاوااسکریپت ارسال شود، مرورگر به URL permalink مشخص‌شده هدایت می‌شود، نه URL صفحهٔ فعلی. اطمینان حاصل کنید که همان کامپوننت فرم در صفحهٔ مقصد رندر می‌شود (شامل همان اکشن `fn` و `permalink`) تا ری‌اکت بداند چگونه استیت را از طریق آن پاس بدهد. پس از hydration فرم، این پارامتر هیچ تأثیری ندارد.

{/* TODO T164397693: link to serializable values docs once it exists */}

#### مقادیر بازگشتی {/*returns*/}

`useActionState` یک آرایه با مقادیر زیر برمی‌گرداند:

1. استیت فعلی. در طول رندر اول، با `initialState`ای که پاس داده‌اید مطابقت خواهد داشت. پس از فراخوانی اکشن، با مقدار بازگشتی توسط اکشن مطابقت خواهد داشت.
2. یک اکشن جدید که می‌توانید آن را به‌عنوان پراپ `action` به کامپوننت `form` خود یا به‌عنوان پراپ `formAction` به هر کامپوننت `button` درون فرم پاس بدهید. این اکشن همچنین می‌تواند به‌صورت دستی درون [`startTransition`](/reference/react/startTransition) فراخوانی شود.
3. پرچم `isPending` که به شما می‌گوید آیا یک ترنزیشن pending وجود دارد یا خیر.

#### موارد احتیاط {/*caveats*/}

* هنگامی که با یک فریم‌ورک که React Server Components را پشتیبانی می‌کند استفاده می‌شود، `useActionState` به شما اجازه می‌دهد فرم‌ها را پیش از آنکه جاوااسکریپت روی کلاینت اجرا شود، تعاملی کنید. وقتی بدون Server Components استفاده می‌شود، معادل استیت محلی کامپوننت است.
* تابع پاس‌داده‌شده به `useActionState` یک آرگومان اضافی، یعنی استیت قبلی یا اولیه، را به‌عنوان آرگومان اول خود دریافت می‌کند. این امر امضای آن را متفاوت می‌کند نسبت به زمانی که مستقیماً به‌عنوان اکشن فرم بدون استفاده از `useActionState` استفاده می‌شد.

---

## استفاده {/*usage*/}

### استفاده از اطلاعات بازگشتی توسط یک اکشن فرم {/*using-information-returned-by-a-form-action*/}

برای دسترسی به مقدار بازگشتی یک اکشن از آخرین باری که فرم ارسال شده، `useActionState` را در بالاترین سطح کامپوننت خود فراخوانی کنید.

```js [[1, 5, "state"], [2, 5, "formAction"], [3, 5, "action"], [4, 5, "null"], [2, 8, "formAction"]]
import { useActionState } from 'react';
import { action } from './actions.js';

function MyComponent() {
  const [state, formAction] = useActionState(action, null);
  // ...
  return (
    <form action={formAction}>
      {/* ... */}
    </form>
  );
}
```

`useActionState` یک آرایه با موارد زیر برمی‌گرداند:

1. <CodeStep step={1}>استیت فعلی</CodeStep> فرم، که در ابتدا به <CodeStep step={4}>استیت اولیه</CodeStep>ای که ارائه کرده‌اید تنظیم شده، و پس از ارسال فرم به مقدار بازگشتی <CodeStep step={3}>اکشن</CodeStep>ای که ارائه کرده‌اید تنظیم می‌شود.
2. یک <CodeStep step={2}>اکشن جدید</CodeStep> که آن را به `<form>` به‌عنوان پراپ `action` آن پاس می‌دهید یا به‌صورت دستی درون `startTransition` فراخوانی می‌کنید.
3. یک <CodeStep step={1}>استیت pending</CodeStep> که می‌توانید در طول پردازش اکشن از آن استفاده کنید.

هنگامی که فرم ارسال می‌شود، تابع <CodeStep step={3}>اکشن</CodeStep>ای که ارائه کرده‌اید فراخوانی خواهد شد. مقدار بازگشتی آن به <CodeStep step={1}>استیت فعلی</CodeStep> جدید فرم تبدیل خواهد شد.

<CodeStep step={3}>اکشن</CodeStep>ای که ارائه می‌کنید همچنین یک آرگومان اول جدید دریافت می‌کند، یعنی <CodeStep step={1}>استیت فعلی</CodeStep> فرم. اولین باری که فرم ارسال می‌شود، این همان <CodeStep step={4}>استیت اولیه</CodeStep>ای خواهد بود که ارائه کرده‌اید، در حالی که در ارسال‌های بعدی، مقدار بازگشتی از آخرین باری که اکشن فراخوانی شده خواهد بود. سایر آرگومان‌ها مانند زمانی است که `useActionState` استفاده نشده بود.

```js [[3, 1, "action"], [1, 1, "currentState"]]
function action(currentState, formData) {
  // ...
  return 'next state';
}
```

<Recipes titleText="نمایش اطلاعات پس از ارسال یک فرم" titleId="display-information-after-submitting-a-form">

#### نمایش خطاهای فرم {/*display-form-errors*/}

برای نمایش پیام‌هایی مانند پیام خطا یا toast که توسط یک Server Function بازگشده است، اکشن را در یک فراخوانی به `useActionState` بپیچید.

<Sandpack>

```js src/App.js
import { useActionState, useState } from "react";
import { addToCart } from "./actions.js";

function AddToCartForm({itemID, itemTitle}) {
  const [message, formAction, isPending] = useActionState(addToCart, null);
  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">Add to Cart</button>
      {isPending ? "Loading..." : message}
    </form>
  );
}

export default function App() {
  return (
    <>
      <AddToCartForm itemID="1" itemTitle="JavaScript: The Definitive Guide" />
      <AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
    </>
  )
}
```

```js src/actions.js
"use server";

export async function addToCart(prevState, queryData) {
  const itemID = queryData.get('itemID');
  if (itemID === "1") {
    return "Added to cart";
  } else {
    // Add a fake delay to make waiting noticeable.
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    return "Couldn't add to cart: the item is sold out.";
  }
}
```

```css src/styles.css hidden
form {
  border: solid 1px black;
  margin-bottom: 24px;
  padding: 12px
}

form button {
  margin-right: 12px;
}
```
</Sandpack>

<Solution />

#### نمایش اطلاعات ساختاریافته پس از ارسال یک فرم {/*display-structured-information-after-submitting-a-form*/}

مقدار بازگشتی از یک Server Function می‌تواند هر مقدار سریالایزپذیری باشد. برای مثال، می‌تواند یک شیء باشد که شامل یک مقدار بولی نشان‌دهندهٔ موفقیت اکشن، یک پیام خطا، یا اطلاعات به‌روزرسانی‌شده است.

<Sandpack>

```js src/App.js
import { useActionState, useState } from "react";
import { addToCart } from "./actions.js";

function AddToCartForm({itemID, itemTitle}) {
  const [formState, formAction] = useActionState(addToCart, {});
  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button type="submit">Add to Cart</button>
      {formState?.success &&
        <div className="toast">
          Added to cart! Your cart now has {formState.cartSize} items.
        </div>
      }
      {formState?.success === false &&
        <div className="error">
          Failed to add to cart: {formState.message}
        </div>
      }
    </form>
  );
}

export default function App() {
  return (
    <>
      <AddToCartForm itemID="1" itemTitle="JavaScript: The Definitive Guide" />
      <AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
    </>
  )
}
```

```js src/actions.js
"use server";

export async function addToCart(prevState, queryData) {
  const itemID = queryData.get('itemID');
  if (itemID === "1") {
    return {
      success: true,
      cartSize: 12,
    };
  } else {
    return {
      success: false,
      message: "The item is sold out.",
    };
  }
}
```

```css src/styles.css hidden
form {
  border: solid 1px black;
  margin-bottom: 24px;
  padding: 12px
}

form button {
  margin-right: 12px;
}
```
</Sandpack>

<Solution />

</Recipes>

## رفع اشکال {/*troubleshooting*/}

### اکشن من دیگر نمی‌تواند داده‌های فرم ارسال‌شده را بخواند {/*my-action-can-no-longer-read-the-submitted-form-data*/}

هنگامی که یک اکشن را با `useActionState` می‌پیچید، یک آرگومان اضافی *به‌عنوان آرگومان اول* آن دریافت می‌کند. دادهٔ فرم ارسال‌شده بنابراین *آرگومان دوم* آن است به‌جای اولین آرگومان که معمولاً چنین است. آرگومان اول جدیدی که اضافه می‌شود، استیت فعلی فرم است.

```js
function action(currentState, formData) {
  // ...
}
```
