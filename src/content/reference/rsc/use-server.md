---
title: "'use server'"
titleForTitleTag: "'use server' directive"
---

<RSC>

`'use server'` برای استفاده با [کامپوننت‌های سرور ری‌اکت](/reference/rsc/server-components) است.

</RSC>


<Intro>

`'use server'` تابع‌های سمت سرور را علامت‌گذاری می‌کند که می‌توانند از کد سمت کلاینت فراخوانی شوند.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `'use server'` {/*use-server*/}

`'use server'` را در بالای بدنهٔ یک تابع async اضافه کنید تا تابع به‌عنوان قابل فراخوانی توسط کلاینت علامت‌گذاری شود. ما به این تابع‌ها [_تابع سرور_](/reference/rsc/server-functions) می‌گوییم.

```js {2}
async function addToCart(data) {
  'use server';
  // ...
}
```

وقتی یک تابع سرور روی کلاینت فراخوانی می‌شود، یک درخواست شبکه به سرور می‌فرستد که شامل یک نسخهٔ سریالایزشده از هر آرگومان پاس‌داده‌شده است. اگر تابع سرور مقداری برگرداند، آن مقدار سریالایز شده و به کلاینت برمی‌گردد.

به‌جای علامت‌گذاری جداگانهٔ تابع‌ها با `'use server'`، می‌توانید دایرکتیو را در بالای یک فایل اضافه کنید تا همهٔ exportهای درون آن فایل به‌عنوان تابع‌های سرور علامت‌گذاری شوند که می‌توانند هر جایی استفاده شوند، از جمله در کد کلاینت.

#### ملاحظات {/*caveats*/}
* `'use server'` باید در همان ابتدای تابع یا ماژول باشد؛ بالاتر از هر کد دیگری شامل importها (کامنت‌های بالای دایرکتیو مجاز هستند). باید با کوتیشن تکی یا جفتی نوشته شوند، نه backtick.
* `'use server'` فقط می‌تواند در فایل‌های سمت سرور استفاده شود. تابع‌های سرور حاصل می‌توانند از طریق پراپس به کامپوننت‌های کلاینت منتقل شوند. [انواع پشتیبانی‌شده برای سریالایزیشن](#serializable-parameters-and-return-values) را ببینید.
* برای وارد کردن یک تابع سرور از [کد کلاینت](/reference/rsc/use-client)، دایرکتیو باید در سطح ماژول استفاده شود.
* از آنجا که فراخوانی‌های شبکهٔ زیرین همیشه async هستند، `'use server'` فقط می‌تواند روی تابع‌های async استفاده شود.
* همیشه آرگومان‌های تابع‌های سرور را به‌عنوان ورودی غیرقابل‌اعتماد در نظر بگیرید و هر تغییرات (mutation) را تأیید هویت کنید. [ملاحظات امنیتی](#security) را ببینید.
* تابع‌های سرور باید در یک [ترنزیشن](/reference/react/useTransition) فراخوانی شوند. تابع‌های سروری که به [`<form action>`](/reference/react-dom/components/form#props) یا [`formAction`](/reference/react-dom/components/input#props) پاس داده می‌شوند، به‌طور خودکار در یک ترنزیشن فراخوانی می‌شوند.
* تابع‌های سرور برای mutationهایی طراحی شده‌اند که استیت سمت سرور را به‌روزرسانی می‌کنند؛ برای fetch داده‌ها توصیه نمی‌شوند. بر این اساس، فریمورک‌هایی که تابع‌های سرور را پیاده‌سازی می‌کنند معمولاً یک اکشن را در هر لحظه پردازش می‌کنند و روشی برای cache کردن مقدار برگشتی ندارند.

### ملاحظات امنیتی {/*security*/}

آرگومان‌های تابع‌های سرور کاملاً تحت کنترل کلاینت هستند. برای امنیت، همیشه آن‌ها را به‌عنوان ورودی غیرقابل‌اعتماد در نظر بگیرید، و مطمئن شوید که آرگومان‌ها را به‌درستی اعتبارسنجی و escape کنید.

در هر تابع سرور، مطمئن شوید که کاربر واردشده اجازهٔ انجام آن اکشن را دارد.

<Wip>

برای جلوگیری از ارسال داده‌های حساس از یک تابع سرور، APIهای آزمایشی taint وجود دارند که از پاس داده شدن مقادیر و objectهای یکتا به کد کلاینت جلوگیری می‌کنند.

[experimental_taintUniqueValue](/reference/react/experimental_taintUniqueValue) و [experimental_taintObjectReference](/reference/react/experimental_taintObjectReference) را ببینید.

</Wip>

### آرگومان‌ها و مقادیر برگشتی سریالایز {/*serializable-parameters-and-return-values*/}

از آنجا که کد کلاینت تابع سرور را از طریق شبکه فراخوانی می‌کند، هر آرگومان پاس‌داده‌شده باید سریالایز باشد.

در اینجا انواع پشتیبانی‌شده برای آرگومان‌های تابع سرور آورده شده است:

* Primitiveها
        * [string](https://developer.mozilla.org/en-US/docs/Glossary/String)
        * [number](https://developer.mozilla.org/en-US/docs/Glossary/Number)
        * [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
        * [boolean](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)
        * [undefined](https://developer.mozilla.org/en-US/docs/Glossary/Undefined)
        * [null](https://developer.mozilla.org/en-US/docs/Glossary/Null)
        * [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)، فقط symbolهایی که از طریق [`Symbol.for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for) در رجیستری global Symbol ثبت شده‌اند
* Iterableهای حاوی مقادیر سریالایز
        * [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
        * [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
        * [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
        * [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
        * [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) و [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
* [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
* نمونه‌های [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)های ساده: آن‌هایی که با [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) ایجاد شده‌اند، با ویژگی‌های سریالایز
* تابع‌هایی که تابع سرور هستند
* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)ها

به‌طور خاص، موارد زیر پشتیبانی نمی‌شوند:
* elementهای ری‌اکت، یا [JSX](/learn/writing-markup-with-jsx)
* تابع‌ها، شامل تابع‌های کامپوننت یا هر تابع دیگری که تابع سرور نیست
* [Class](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)ها
* objectهایی که نمونه‌ای از هر کلاسی هستند (به جز موارد ذکرشده) یا objectهایی با [prototype null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)
* symbolهایی که به‌صورت سراسری ثبت نشده‌اند، مثلاً `Symbol('my new symbol')`
* eventها از event handlerها


مقادیر برگشتی سریالایز پشتیبانی‌شده همان [پراپس سریالایز](/reference/rsc/use-client#serializable-types) برای یک کامپوننت کلاینت مرزی هستند.


## نحوهٔ استفاده {/*usage*/}

### تابع‌های سرور در فرم‌ها {/*server-functions-in-forms*/}

معمول‌ترین مورد استفادهٔ تابع‌های سرور، فراخوانی تابع‌هایی است که داده‌ها را تغییر می‌دهند. در مرورگر، [المنت فرم HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) روش سنتی برای یک کاربر جهت ثبت یک تغییر است. با کامپوننت‌های سرور ری‌اکت، ری‌اکت پشتیبانی کلاس‌یک از تابع‌های سرور به‌عنوان اکشن در [فرم‌ها](/reference/react-dom/components/form) معرفی می‌کند.

در اینجا یک فرم است که به یک کاربر اجازه می‌دهد نام کاربری درخواست کند.

```js [[1, 3, "formData"]]
// App.js

async function requestUsername(formData) {
  'use server';
  const username = formData.get('username');
  // ...
}

export default function App() {
  return (
    <form action={requestUsername}>
      <input type="text" name="username" />
      <button type="submit">Request</button>
    </form>
  );
}
```

در این مثال `requestUsername` یک تابع سرور است که به یک `<form>` پاس داده شده. وقتی کاربر این فرم را ثبت می‌کند، یک درخواست شبکه به تابع سرور `requestUsername` انجام می‌شود. وقتی یک تابع سرور در یک فرم فراخوانی می‌شود، ری‌اکت <CodeStep step={1}>[FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)</CodeStep> فرم را به‌عنوان آرگومان اول به تابع سرور تأمین می‌کند.

با انتقال یک تابع سرور به `action` فرم، ری‌اکت می‌تواند فرم را به‌صورت [تدریجی ارتقا](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) دهد. این یعنی فرم‌ها می‌توانند قبل از بارگذاری باندل JavaScript ثبت شوند.

#### مدیریت مقادیر برگشتی در فرم‌ها {/*handling-return-values*/}

در فرم درخواست نام کاربری، ممکن است این احتمال باشد که یک نام کاربری در دسترس نباشد. `requestUsername` باید به ما بگوید که آیا ناموفق بوده یا نه.

برای به‌روزرسانی UI بر اساس نتیجهٔ یک تابع سرور در حالی که از progressive enhancement پشتیبانی می‌کنید، از [`useActionState`](/reference/react/useActionState) استفاده کنید.

```js
// requestUsername.js
'use server';

export default async function requestUsername(formData) {
  const username = formData.get('username');
  if (canRequest(username)) {
    // ...
    return 'successful';
  }
  return 'failed';
}
```

```js {4,8}, [[2, 2, "'use client'"]]
// UsernameForm.js
'use client';

import { useActionState } from 'react';
import requestUsername from './requestUsername';

function UsernameForm() {
  const [state, action] = useActionState(requestUsername, null, 'n/a');

  return (
    <>
      <form action={action}>
        <input type="text" name="username" />
        <button type="submit">Request</button>
      </form>
      <p>Last submission request returned: {state}</p>
    </>
  );
}
```

توجه کنید که مانند بیشتر هوک‌ها، `useActionState` فقط می‌تواند در <CodeStep step={1}>[کد کلاینت](/reference/rsc/use-client)</CodeStep> فراخوانی شود.

### فراخوانی یک تابع سرور خارج از `<form>` {/*calling-a-server-function-outside-of-form*/}

تابع‌های سرور endpointهای سرور در دسترس هستند و می‌توانند در هر کجای کد کلاینت فراخوانی شوند.

وقتی از یک تابع سرور خارج از یک [فرم](/reference/react-dom/components/form) استفاده می‌کنید، تابع سرور را در یک [ترنزیشن](/reference/react/useTransition) فراخوانی کنید، که به شما اجازه می‌دهد یک نشانگر بارگذاری نمایش دهید، [به‌روزرسانی‌های استیت خوش‌بینانه](/reference/react/useOptimistic) را نشان دهید، و خطاهای غیرمنتظره را مدیریت کنید. فرم‌ها به‌طور خودکار تابع‌های سرور را در ترنزیشن‌ها می‌پیچند.

```js {9-12}
import incrementLike from './actions';
import { useState, useTransition } from 'react';

function LikeButton() {
  const [isPending, startTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(0);

  const onClick = () => {
    startTransition(async () => {
      const currentCount = await incrementLike();
      setLikeCount(currentCount);
    });
  };

  return (
    <>
      <p>Total Likes: {likeCount}</p>
      <button onClick={onClick} disabled={isPending}>Like</button>;
    </>
  );
}
```

```js
// actions.js
'use server';

let likeCount = 0;
export default async function incrementLike() {
  likeCount++;
  return likeCount;
}
```

برای خواندن مقدار برگشتی یک تابع سرور، باید promise برگردانده‌شده را `await` کنید.
