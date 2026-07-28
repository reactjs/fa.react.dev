---
title: experimental_taintObjectReference
version: experimental
---

<Experimental>

**این API آزمایشی است و هنوز در نسخهٔ پایدار ری‌اکت در دسترس نیست.**

شما می‌توانید آن را با ارتقای پکیج‌های ری‌اکت به جدیدترین نسخهٔ آزمایشی امتحان کنید:

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

نسخه‌های آزمایشی ری‌اکت ممکن است حاوی باگ باشند. از آن‌ها در محیط تولید استفاده نکنید.

این API تنها در React Server Components در دسترس است.

</Experimental>


<Intro>

`taintObjectReference` به شما اجازه می‌دهد از ارسال یک نمونهٔ آبجکت خاص (مانند یک آبجکت `user`) به یک کامپوننت کلاینت جلوگیری کنید.

```js
experimental_taintObjectReference(message, object);
```

برای جلوگیری از ارسال کلید، هش یا توکن، به [`taintUniqueValue`](/reference/react/experimental_taintUniqueValue) مراجعه کنید.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `taintObjectReference(message, object)` {/*taintobjectreference*/}

`taintObjectReference` را با یک آبجکت صدا بزنید تا آن را نزد ری‌اکت به‌عنوان چیزی ثبت کنید که نباید به‌صورت همان‌گونه به کلاینت ارسال شود:

```js
import {experimental_taintObjectReference} from 'react';

experimental_taintObjectReference(
  'Do not pass ALL environment variables to the client.',
  process.env
);
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `message`: پیامی که می‌خواهید در صورتی که آبجکت به یک کامپوننت کلاینت ارسال شود نمایش داده شود. این پیام به‌عنوان بخشی از خطایی که در صورت ارسال آبجکت به یک کامپوننت کلاینت پرتاب می‌شود، نمایش داده خواهد شد.

* `object`: آبجکتی که باید آلوده (tainted) شود. توابع و نمونه‌های کلاس می‌توانند به‌عنوان `object` به `taintObjectReference` ارسال شوند. توابع و کلاس‌ها از قبل از ارسال به کامپوننت‌های کلاینت مسدود شده‌اند، اما پیام خطای پیش‌فرض ری‌اکت با آنچه در `message` تعریف کرده‌اید جایگزین می‌شود. وقتی یک نمونهٔ خاص از یک Typed Array به‌عنوان `object` به `taintObjectReference` ارسال می‌شود، سایر کپی‌های آن Typed Array آلوده نخواهند شد.

#### مقادیر بازگشتی {/*returns*/}

`experimental_taintObjectReference` مقدار `undefined` باز می‌گرداند.

#### نکات {/*caveats*/}

- بازسازی یا کلون کردن یک آبجکت آلوده، یک آبجکت جدیدِ غیر آلوده می‌سازد که ممکن است حاوی داده‌های حساس باشد. به‌عنوان مثال، اگر یک آبجکت `user` آلوده دارید، `const userInfo = {name: user.name, ssn: user.ssn}` یا `{...user}` آبجکت‌های جدیدی می‌سازند که آلوده نیستند. `taintObjectReference` تنها در برابر اشتباهات ساده هنگامی که آبجکت بدون تغییر به یک کامپوننت کلاینت ارسال می‌شود، محافظت می‌کند.

<Pitfall>

**فقط به آلوده‌سازی برای امنیت تکیه نکنید.** آلوده کردن یک آبجکت از نشت هر مقدار مشتق‌شدهٔ ممکن جلوگیری نمی‌کند. به‌عنوان مثال، کلون یک آبجکت آلوده یک آبجکت جدیدِ غیر آلوده می‌سازد. استفاده از داده‌های یک آبجکت آلوده (مانند `{secret: taintedObj.secret}`) یک مقدار یا آبجکت جدید می‌سازد که آلوده نیست. آلوده‌سازی یک لایه محافظت است؛ یک برنامهٔ امن دارای چندین لایه محافظت، APIهای به‌طراحی‌شدهٔ خوب و الگوهای ایزوله‌سازی است.

</Pitfall>

---

## استفاده {/*usage*/}

### جلوگیری از رسیدنٔ ناخواستهٔ داده‌های کاربر به کلاینت {/*prevent-user-data-from-unintentionally-reaching-the-client*/}

یک کامپوننت کلاینت هرگز نباید آبجکت‌هایی که داده‌های حساس حمل می‌کنند را بپذیرد. در حال ایده‌آل، توابع دریافت داده نباید داده‌ای را افشا کنند که کاربر فعلی نباید به آن‌ها دسترسی داشته باشد. گاهی هنگام بازآفرینی (refactoring) اشتباهاتی رخ می‌دهد. برای محافظت در برابر بروز این اشتباهات در آینده، می‌توانیم آبجکت کاربر را در API داده‌های خود «آلوده» کنیم.

```js
import {experimental_taintObjectReference} from 'react';

export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client. ' +
      'Instead, pick off the specific properties you need for this use case.',
    user,
  );
  return user;
}
```

اکنون هر زمان کسی سعی کند این آبجکت را به یک کامپوننت کلاینت ارسال کند، خطایی همراه با پیام خطای ارسال‌شده پرتاب می‌شود.

<DeepDive>

#### محافظت در برابر نشت‌ها در دریافت داده {/*protecting-against-leaks-in-data-fetching*/}

اگر در حال اجرای یک محیط Server Components هستید که به داده‌های حساس دسترسی دارد، باید مراقب باشید که آبجکت‌ها را مستقیماً ارسال نکنید:

```js
// api.js
export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  return user;
}
```

```js
import { getUser } from 'api.js';
import { InfoCard } from 'components.js';

export async function Profile(props) {
  const user = await getUser(props.userId);
  // DO NOT DO THIS
  return <InfoCard user={user} />;
}
```

```js
// components.js
"use client";

export async function InfoCard({ user }) {
  return <div>{user.name}</div>;
}
```

در حال ایده‌آل، `getUser` نباید داده‌ای را که کاربر فعلی نباید به آن دسترسی داشته باشد افشا کند. برای جلوگیری از ارسال آبجکت `user` به یک کامپوننت کلاینت در آینده، می‌توانیم آبجکت کاربر را «آلوده» کنیم:


```js
// api.js
import {experimental_taintObjectReference} from 'react';

export async function getUser(id) {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;
  experimental_taintObjectReference(
    'Do not pass the entire user object to the client. ' +
      'Instead, pick off the specific properties you need for this use case.',
    user,
  );
  return user;
}
```

اکنون اگر کسی سعی کند آبجکت `user` را به یک کامپوننت کلاینت ارسال کند، خطایی همراه با پیام خطای ارسال‌شده پرتاب می‌شود.

</DeepDive>
