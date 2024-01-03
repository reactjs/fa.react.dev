---
title: Importing and Exporting Components
---

<Intro>

کاربرد اصلی کامپوننت ها, قابلیت استفاده مجدد آنهاست: شما میتوانید کامپوننت هایی بسازید که متشکل از کامپوننت های دیگر هستند ولی درگل بهتر است که هربخشی را تبدیل به کامپوننت کنید چون اسکن کردن آنها توسط اجرا کننده آسان تر است.

</Intro>

<YouWillLearn>

* کامپوننت ریشه (root) چیست
* چگونه کامپوننتی را ایمپورت یا اکسپورت (import - export) کنیم
* از دستور default استفاده کنم
* چگونه چندین کامپوننت که داخل یک فایل هستند را export کنم.
* چگونه در چندین فایل کامپوننت هارا تقسیم کنم

</YouWillLearn>

## فایل کامپوننت اصلی {/*the-root-component-file*/}

در بخش [Your First Component](/learn/your-first-component), شما یک `Profile` کامپوننت ساختید و یک کامپوننت `Gallery` داخل آن رندر میشود:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

در این مثال, کامپوننت ریشه فایل `App.js` است. ممکن است این فایل در پروژه های مختلفی مانند NextJS متفاوت است

## ایمپورت و اکسپورت کردن کامپوننت ها {/*exporting-and-importing-a-component*/}

به عنوان مثال فرض کنید در یک لیست چند کامپوننت `Gallery` یا `Profile` داشته باشید. بهتر است داخل فایل کامپوننت اصلی نباشند و در کامپوننت های جداگانه ای قرار بدهید.

1. یک فایل جاوااسکریپتی **بسازید** و تبدیل به یک کامپوننت کنید
2. در آن فایل, کامپوننت های خود را اکسپورت کنید (از  [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) یا  [name export](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) کنید).
3. همان کامپوننت را در هر فایلی که میخواهید از آن استفاده کنید ایمپورت کنید (استفاده از تکنیک ایمپورت [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) یا [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) exports).

خب, اینجا کامپوننت های `Profile` و `Gallery` را ساخته ایم و داخل فایل `App.js` ایمپورت کردیم و داریم از آنها استفاده کنیم. حال در دستور ایمپورت مربوط به کامپوننت `Gallery`, بجای `Gallery` نام آن را به `Gallery.js` تغییر دهید

<Sandpack>

```js App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js Gallery.js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

به موارد زیر که به دو کامپوننت تقسیم شدند دقت کنید:

1. `Gallery.js`:
     - کامپوننت `Profile` را صرفا تعریف کرده و آن را اکسپورت نکرده
     - از کامپوننت `Gallery` به عنوان **default export.** اکسپورت گرفته
2. `App.js`:
     - کامپوننت `Gallery` را به عنوان **default import** از `Gallery.js` ایمپورت کرده
     - کامپوننت اصلی یا `App` را به عنوان **default export.** اکسپورت کرده


<Note>

ممکن است با فایل هایی مواجه بشوید که پسوند `.js` را نداشته باشند:

```js 
import Gallery from './Gallery';
```

دو آدرس `'./Gallery.js'` یا `'./Gallery'` داخل ریکت کار میکنند, اگر چه مورد اول به سازوکار [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) نزدیک تر است.

</Note>

<DeepDive>

#### دستور default و export {/*default-vs-named-exports*/}

در اینجا دو راه اصلی وجود دارد که کامپوننت ها یا توابع و یا متغیر هایمان را export کنیم: default export و export خالی. تا اینجا در مثال ها از default export استفاده شده اما از این به بعد شما میتوانید از دستور export خالی هم استفاده کنید.

![Default and named exports](/images/docs/illustrations/i_import-export.svg)

اینکه چطور کامپوننت را ایمپورت کنید بستگی دارد به اینکه چطور آن را اکسپورت کنید. و اگر در جای خود استفاده نکنید به ارور برمیخورید.

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

زمانی که شما به صورت پیش فرض ایمپورت میکنید (default import), شما میتوانید هر اسمی را بعد از import به عنوان نام متغیر بنویسید, حتی میتوانید مثلا بنویسید `import Banana from './Button.js'` ولی در ایمپورت هایی دیگر باید اسمی که در همان فایل اکسپورت کردید را بنویسید.

**معمولا از  ایمپورت پیش فرض استفاده میشود, مخصوصا زمانی که یک کامپوننت یا تابع داخل یک فایل داریم. و زمانی که از ایمپورت معمولی  (named import)  که در یک فایل چندین تابع یا کامپوننت داشته باشیم** صرف نظر از اینکه از کدام روش استفاده میکنید, سعی کنید نام های مناسبی برای توابع و کامپوننت ها و ایمپورت ها انتخاب کنید. دستوری مانند `export default () => {}` مشکل زا هست و حذف میشود.

</DeepDive>

## اکسپورت و ایمپورت کردن چند کامپوننت از یک فایل {/*exporting-and-importing-multiple-components-from-the-same-file*/}

برگردیم به مثال قبلی, فرض کنیم دو کامپوننت `Profile` و `Gallery` را داخل یک فایل داشته باشیم. نمیتوانیم به صورت پیش فرض از آنها اکسپورت بگیریم (export default). پس چکار کنیم؟ از اکسپورت معمولی (export) استفاده میکنیم. **در یک فایل فقط یک export default داشته باشد ولی به تعداد مدنظر میتوانید اکسپورت معمولی داشته باشید**

<Note>

شاید پیش خود سوال کنید که از کدام استفاده کنم؟ یکسری از تیم ها فقط از export default استفاده کنند و مابقی توابع داخل فایل را با آن ادغام کنند. یا از export سراسر فایل استفاده کنند. اینکه کدام بهتر است به خودتان بستگی دارد.

</Note>

ابتدا, کامپوننت `Profile` را که در فایل `Gallery.js` موجود است را به اکسپورت بگیرید (از کلمه کلیدی `default` استفاده نکنید):

```js
export function Profile() {
  // ...
}
```

سپس, کامپوننت `Profile` را از فایل `Gallery.js` به فایل `App.js` ایمپورت کنید (از علامت آکولاد استفاده کنید):

```js
import { Profile } from './Gallery.js';
```

و در آخر, کامپوننت `<Profile />` در کامپوننت `App` رندر میشود:

```js
export default function App() {
  return <Profile />;
}
```

حال در اینجا فایل `Gallery.js` دو export دارد: یک default export مربوط به کامپوننت `Gallery`, و یک named export مربوط به کامپوننت `Profile`. در فایل `App.js` هردوی آنها ایمپورت میشوند. حال دستور `<Profile />` را به `<Gallery />` تغییر بدهید و به مثال بازگردید:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js Gallery.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

حال شما از هر دو نوع از دستور export استفاده کردید:

* `Gallery.js`:
  - کامپوننت `Profile` به عنوان  **named export** که نام آن `Profile` است اکسپورت شده.
  - کامپوننت `Gallery` به عنوان  **default export** اکسپورت شده است
* `App.js`:
  - کامپوننت `Profile` به عنوان  **named import** که نام آن `Profile` است در `Gallery.js` ایمپورت شده.
  - کامپوننت `Gallery` به عنوان  **default import** در فایل `Gallery.js` ایمپورت شده.
  - کامپوننت `App` که کامپوننت ریشه است به عنوان  **default export** اکسپورت شده است.

<Recap>

مواردی که در این صفحه یاد گرفتید:

* کامپوننت اصلی (root) چیست
* چگونه یک کامپوننت را export/import کنیم
* چه زمانی از export/import پیش فرض یا معمولی استفاده کنیم
* چگونه چندین کامپوننت را که داخل یک فایل هستند را اکسپورت کنیم

</Recap>



<Challenges>

#### Split the components further {/*split-the-components-further*/}

Currently, `Gallery.js` exports both `Profile` and `Gallery`, which is a bit confusing.

Move the `Profile` component to its own `Profile.js`, and then change the `App` component to render both `<Profile />` and `<Gallery />` one after another.

You may use either a default or a named export for `Profile`, but make sure that you use the corresponding import syntax in both `App.js` and `Gallery.js`! You can refer to the table from the deep dive above:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

<Hint>

Don't forget to import your components where they are called. Doesn't `Gallery` use `Profile`, too?

</Hint>

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <div>
      <Profile />
    </div>
  );
}
```

```js Gallery.js active
// Move me to Profile.js!
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

After you get it working with one kind of exports, make it work with the other kind.

<Solution>

This is the solution with named exports:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import { Profile } from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js Gallery.js
import { Profile } from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
export function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

This is the solution with default exports:

<Sandpack>

```js App.js
import Gallery from './Gallery.js';
import Profile from './Profile.js';

export default function App() {
  return (
    <div>
      <Profile />
      <Gallery />
    </div>
  );
}
```

```js Gallery.js
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

</Solution>

</Challenges>
