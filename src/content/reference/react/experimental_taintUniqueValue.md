---
title: experimental_taintUniqueValue
version: experimental
---

<Experimental>

**این API آزمایشی است و هنوز در نسخهٔ پایدار ری‌اکت در دسترس نیست.**

می‌توانید آن را با ارتقای پکیج‌های ری‌اکت به آخرین نسخهٔ آزمایشی امتحان کنید:

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

نسخه‌های آزمایشی ری‌اکت ممکن است حاوی باگ باشند. از آن‌ها در production استفاده نکنید.

این API فقط درون [کامپوننت‌های سرور ری‌اکت](/reference/rsc/use-client) در دسترس است.

</Experimental>


<Intro>

`taintUniqueValue` به شما اجازه می‌دهد از پاس‌داده‌شدن مقادیر یکتا مانند گذرواژه‌ها، کلیدها، یا توکن‌ها به کامپوننت‌های کلاینت جلوگیری کنید.

```js
taintUniqueValue(errMessage, lifetime, value)
```

برای جلوگیری از پاس‌داده‌شدن یک شیء حاوی داده‌های حساس، به [`taintObjectReference`](/reference/react/experimental_taintObjectReference) مراجعه کنید.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `taintUniqueValue(message, lifetime, value)` {/*taintuniquevalue*/}

`taintUniqueValue` را با یک گذرواژه، توکن، کلید یا هش فراخوانی کنید تا آن را به‌عنوان چیزی که نباید به‌همین شکل به کلاینت پاس داده شود، در ری‌اکت ثبت کنید:

```js
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(
  'Do not pass secret keys to the client.',
  process,
  process.env.SECRET_KEY
);
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `message`: پیامی که می‌خواهید اگر `value` به یک کامپوننت کلاینت پاس داده شود نمایش داده شود. این پیام به‌عنوان بخشی از خطایی که در صورت پاس‌داده‌شدن `value` به یک کامپوننت کلاینت پرتاب می‌شود نمایش داده خواهد شد.

* `lifetime`: هر شیئی که نشان می‌دهد `value` باید چقدر tainted باشد. تا زمانی که این شیء هنوز وجود دارد، `value` از ارسال به هر کامپوننت کلاینتی مسدود خواهد شد. برای مثال، پاس‌دادن `globalThis` مقدار را برای طول عمر یک اپلیکیشن مسدود می‌کند. `lifetime` معمولاً شیئی است که پراپرتی‌هایش شامل `value` هستند.

* `value`: یک رشته، bigint یا TypedArray. `value` باید یک دنبالهٔ یکتای از کاراکترها یا بایت‌ها با آنتروپی بالا مانند یک توکن رمزنگاری، کلید خصوصی، هش، یا یک گذرواژهٔ بلند باشد. `value` از ارسال به هر کامپوننت کلاینتی مسدود خواهد شد.

#### مقادیر بازگشتی {/*returns*/}

`experimental_taintUniqueValue` مقدار `undefined` برمی‌گرداند.

#### موارد احتیاط {/*caveats*/}

* استخراج مقادیر جدید از مقادیر tainted می‌تواند حفاظت tainting را به خطر بیندازد. مقادیر جدیدی که با بزرگ‌کردن حروف مقادیر tainted، ترکیب کردن مقادیر رشته‌ای tainted در یک رشتهٔ بزرگ‌تر، تبدیل مقادیر tainted به base64، زیررشته‌گرفتن از مقادیر tainted، و دیگر تبدیل‌های مشابه ایجاد می‌شوند tainted نیستند، مگر آنکه به‌صراحت `taintUniqueValue` را روی این مقادیر تازه‌ایجادشده فراخوانی کنید.
* از `taintUniqueValue` برای محافظت از مقادیر کم‌آنتروپی مانند کدهای PIN یا شماره‌های تلفن استفاده نکنید. اگر هر مقداری در یک درخواست توسط مهاجم کنترل شود، می‌تواند با شمارش همهٔ مقادیر ممکن راز، استنباط کند کدام مقدار tainted است.

---

## استفاده {/*usage*/}

### جلوگیری از پاس‌داده‌شدن یک توکن به کامپوننت‌های کلاینت {/*prevent-a-token-from-being-passed-to-client-components*/}

برای اطمینان از اینکه اطلاعات حساسی مانند گذرواژه‌ها، توکن‌های نشست، یا سایر مقادیر یکتا به‌طور تصادفی به کامپوننت‌های کلاینت پاس داده نمی‌شوند، تابع `taintUniqueValue` لایه‌ای از حفاظت ارائه می‌دهد. وقتی یک مقدار tainted می‌شود، هر تلاش برای پاس‌دادن آن به یک کامپوننت کلاینت منجر به یک خطا خواهد شد.

آرگومان `lifetime` مدت زمانی را که مقدار tainted باقی می‌ماند تعریف می‌کند. برای مقادیری که باید به‌طور نامحدود tainted باقی بمانند، اشیایی مانند [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) یا `process` می‌توانند به‌عنوان آرگومان `lifetime` عمل کنند. این اشیاء طول عمری دارند که کل مدت اجرای اپلیکیشن شما را در بر می‌گیرد.

```js
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(
  'Do not pass a user password to the client.',
  globalThis,
  process.env.SECRET_KEY
);
```

اگر طول عمر مقدار tainted به یک شیء گره خورده است، `lifetime` باید شیئی باشد که مقدار را در بر می‌گیرد. این تضمین می‌کند که مقدار tainted برای طول عمر شیء دربرگیرنده محافظت شده باقی بماند.

```js
import {experimental_taintUniqueValue} from 'react';

export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintUniqueValue(
    'Do not pass a user session token to the client.',
    user,
    user.session.token
  );
  return user;
}
```

در این مثال، شیء `user` به‌عنوان آرگومان `lifetime` عمل می‌کند. اگر این شیء در یک کش سراسری ذخیره شود یا توسط درخواست دیگری قابل‌دسترسی باشد، توکن نشست tainted باقی می‌ماند.

<Pitfall>

**صرفاً برای امنیت به tainting تکیه نکنید.** Tainting یک مقدار، هر مقدار مشتق‌شدهٔ ممکن را مسدود نمی‌کند. برای مثال، ایجاد یک مقدار جدید با بزرگ‌کردن حروف یک رشتهٔ tainted، مقدار جدید را tainted نمی‌کند.


```js
import {experimental_taintUniqueValue} from 'react';

const password = 'correct horse battery staple';

experimental_taintUniqueValue(
  'Do not pass the password to the client.',
  globalThis,
  password
);

const uppercasePassword = password.toUpperCase() // `uppercasePassword` is not tainted
```

در این مثال، ثابت `password` tainted است. سپس `password` برای ایجاد یک مقدار جدید `uppercasePassword` با فراخوانی متد `toUpperCase` روی `password` استفاده می‌شود. `uppercasePassword` تازه‌ایجادشده tainted نیست.

سایر روش‌های مشابه استخراج مقادیر جدید از مقادیر tainted مانند ترکیب‌کردن آن در یک رشتهٔ بزرگ‌تر، تبدیل به base64، یا برگرداندن یک زیررشته، مقادیر غیر tainted ایجاد می‌کنند.

tainting فقط از اشتباهات ساده مانند پاس‌دادن صریح مقادیر راز به کلاینت محافظت می‌کند. اشتباهات در فراخوانی `taintUniqueValue` مانند استفاده از یک استور سراسری خارج از ری‌اکت، بدون شیء lifetime مربوطه، می‌تواند باعث شود مقدار tainted غیر tainted شود. tainting یک لایهٔ حفاظتی است؛ یک اپلیکیشن امن دارای چندین لایهٔ حفاظتی، APIهای به‌خوبی طراحی‌شده، و الگوهای ایزوله‌سازی است.

</Pitfall>

<DeepDive>

#### استفاده از `server-only` و `taintUniqueValue` برای جلوگیری از نشت رازها {/*using-server-only-and-taintuniquevalue-to-prevent-leaking-secrets*/}

اگر در محیط کامپوننت‌های سروری هستید که به کلیدهای خصوصی یا گذرواژه‌هایی مانند گذرواژه‌های پایگاه‌داده دسترسی دارد، باید مراقب باشید که آن را به یک کامپوننت کلاینت پاس ندهید.

```js
export async function Dashboard(props) {
  // DO NOT DO THIS
  return <Overview password={process.env.API_PASSWORD} />;
}
```

```js
"use client";

import {useEffect} from '...'

export async function Overview({ password }) {
  useEffect(() => {
    const headers = { Authorization: password };
    fetch(url, { headers }).then(...);
  }, [password]);
  ...
}
```

این مثال توکن API راز را به کلاینت نشت می‌دهد. اگر این توکن API بتواند برای دسترسی به داده‌هایی که این کاربر خاص نباید به آن‌ها دسترسی داشته باشد استفاده شود، می‌تواند منجر به نقض داده شود.

[comment]: <> (TODO: Link to `server-only` docs once they are written)

ایده‌آل آن است که رازهایی مانند این در یک فایل هلپر واحد انتزاع شوند که فقط می‌تواند توسط ابزارهای دادهٔ مورد اعتماد روی سرور ایمپورت شود. هلپر حتی می‌تواند با [`server-only`](https://www.npmjs.com/package/server-only) تگ شود تا اطمینان حاصل شود که این فایل روی کلاینت ایمپورت نمی‌شود.

```js
import "server-only";

export function fetchAPI(url) {
  const headers = { Authorization: process.env.API_PASSWORD };
  return fetch(url, { headers });
}
```

گاهی در طول بازطراحی اشتباهاتی رخ می‌دهد و ممکن است همهٔ همکاران شما از این موضوع آگاه نباشند. 
برای محافظت در برابر وقوع این اشتباهات در آینده می‌توانیم گذرواژهٔ واقعی را «taint» کنیم:

```js
import "server-only";
import {experimental_taintUniqueValue} from 'react';

experimental_taintUniqueValue(
  'Do not pass the API token password to the client. ' +
    'Instead do all fetches on the server.'
  process,
  process.env.API_PASSWORD
);
```

اکنون هر زمان کسی سعی کند این گذرواژه را به یک کامپوننت کلاینت پاس بدهد، یا گذرواژه را با یک Server Function به کامپوننت کلاینت بفرستد، خطایی با پیامی که هنگام فراخوانی `taintUniqueValue` تعریف کرده‌اید پرتاب خواهد شد.

</DeepDive>

---
