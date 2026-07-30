---
title: ایمپورت و اکسپورت کردن کامپوننت‌ها
---

<Intro>

کاربرد اصلی کامپوننت‌ها قابلیت استفاده‌ی مجدد آن‌هاست: می‌توانید کامپوننت‌هایی بسازید که از کامپوننت‌های دیگر تشکیل شده‌اند. اما در کل بهتر است هر بخش را به یک کامپوننت تبدیل کنید چون پیمایش و بررسی آن‌ها برای شما آسان‌تر می‌شود.

</Intro>

<YouWillLearn>

* کامپوننت ریشه (root) چیست
* چگونه یک کامپوننت را ایمپورت یا اکسپورت کنیم
* چگونه از دستور `default` استفاده کنیم
* چگونه چندین کامپوننت که داخل یک فایل هستند را اکسپورت کنیم
* چگونه کامپوننت‌ها را در چندین فایل تقسیم کنیم

</YouWillLearn>

## فایل کامپوننت ریشه {/*the-root-component-file*/}

در بخش [اولین کامپوننت شما](/learn/your-first-component)، شما یک کامپوننت `Profile` ساختید و یک کامپوننت `Gallery` که داخل آن رندر می‌شود:

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

در این مثال، فایل کامپوننت ریشه `App.js` است. ممکن است این فایل در پروژه‌های مختلف مانند Next.js متفاوت باشد.

## اکسپورت و ایمپورت کردن یک کامپوننت {/*exporting-and-importing-a-component*/}

به‌عنوان مثال فرض کنید در یک لیست چند کامپوننت `Gallery` یا `Profile` داشته باشید. بهتر است داخل فایل کامپوننت اصلی نباشند و در کامپوننت‌های جداگانه‌ای قرار بگیرند.

1. یک فایل جاوااسکریپتی **بسازید** و آن را به یک کامپوننت تبدیل کنید.
2. در آن فایل، کامپوننت‌های خود را اکسپورت کنید (از [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) یا [named export](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) استفاده کنید).
3. همان کامپوننت را در هر فایلی که می‌خواهید از آن استفاده کنید ایمپورت کنید (استفاده از تکنیک ایمپورت [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) یا [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) exports).

خب، اینجا کامپوننت‌های `Profile` و `Gallery` را ساخته‌ایم و داخل فایل `App.js` ایمپورت کرده‌ایم و داریم از آن‌ها استفاده می‌کنیم. حال در دستور ایمپورت مربوط به کامپوننت `Gallery`، به‌جای `Gallery` نام آن را به `Gallery.js` تغییر دهید.

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js
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
     - کامپوننت `Profile` را صرفاً تعریف کرده و آن را اکسپورت نکرده است.
     - از کامپوننت `Gallery` به‌عنوان **default export** اکسپورت گرفته است.
2. `App.js`:
     - کامپوننت `Gallery` را به‌عنوان **default import** از `Gallery.js` ایمپورت کرده است.
     - کامپوننت اصلی یا `App` را به‌عنوان **default export** اکسپورت کرده است.


<Note>

ممکن است با فایل‌هایی مواجه شوید که پسوند `.js` را نداشته باشند:

```js 
import Gallery from './Gallery';
```

دو آدرس `'./Gallery.js'` یا `'./Gallery'` داخل ری‌اکت کار می‌کنند، هرچند مورد اول به سازوکار [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) نزدیک‌تر است.

</Note>

<DeepDive>

#### اکسپورت پیش‌فرض در برابر اکسپورت معمولی {/*default-vs-named-exports*/}

در اینجا دو راه اصلی وجود دارد که کامپوننت‌ها یا توابع یا متغیرهایمان را اکسپورت کنیم: default export و named export. تا اینجا در مثال‌ها از default export استفاده شده، اما از این به بعد می‌توانید از دستور named export هم استفاده کنید.

![Default and named exports](/images/docs/illustrations/i_import-export.svg)

اینکه چطور کامپوننت را ایمپورت کنید بستگی دارد به اینکه چطور آن را اکسپورت کنید. و اگر در جای خود استفاده نکنید به خطا برمی‌خورید.

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

زمانی که شما به‌صورت پیش‌فرض ایمپورت می‌کنید (default import)، می‌توانید هر اسمی را بعد از import به‌عنوان نام متغیر بنویسید، حتی می‌توانید مثلاً بنویسید `import Banana from './Button.js'`؛ ولی در سایر ایمپورت‌ها باید همان نامی را بنویسید که در همان فایل اکسپورت کرده‌اید.

**معمولاً از ایمپورت پیش‌فرض استفاده می‌شود، مخصوصاً زمانی که یک کامپوننت یا تابع داخل یک فایل داریم. و زمانی که در یک فایل چندین تابع یا کامپوننت دارید از ایمپورت معمولی (named import) استفاده می‌شود.** صرف‌نظر از اینکه از کدام روش استفاده می‌کنید، سعی کنید نام‌های مناسبی برای توابع و کامپوننت‌ها و ایمپورت‌ها انتخاب کنید. دستوری مانند `export default () => {}` مشکل‌زا است و حذف می‌شود.

</DeepDive>

## اکسپورت و ایمپورت کردن چند کامپوننت از یک فایل {/*exporting-and-importing-multiple-components-from-the-same-file*/}

برگردیم به مثال قبلی، فرض کنیم دو کامپوننت `Profile` و `Gallery` را داخل یک فایل داشته باشیم. نمی‌توانیم به‌صورت پیش‌فرض از هر دو اکسپورت بگیریم (export default). پس چه کار کنیم؟ از اکسپورت معمولی (named export) استفاده می‌کنیم. **در یک فایل فقط می‌توان یک export default داشت، ولی به تعداد دلخواه می‌توانید اکسپورت معمولی داشته باشید.**

<Note>

شاید پیش خود سوال کنید که از کدام استفاده کنید؟ برخی تیم‌ها فقط از export default استفاده می‌کنند و سایر توابع داخل فایل را با آن ادغام می‌کنند. یا از named export برای کل فایل استفاده می‌کنند. اینکه کدام بهتر است به خودتان بستگی دارد.

</Note>

ابتدا، کامپوننت `Profile` را که در فایل `Gallery.js` موجود است اکسپورت کنید (از کلمه‌ی کلیدی `default` استفاده نکنید):

```js
export function Profile() {
  // ...
}
```

سپس، کامپوننت `Profile` را از فایل `Gallery.js` به فایل `App.js` ایمپورت کنید (از علامت آکولاد استفاده کنید):

```js
import { Profile } from './Gallery.js';
```

و در آخر، کامپوننت `<Profile />` در کامپوننت `App` رندر می‌شود:

```js
export default function App() {
  return <Profile />;
}
```

حال در اینجا فایل `Gallery.js` دو export دارد: یک default export مربوط به کامپوننت `Gallery`، و یک named export مربوط به کامپوننت `Profile`. در فایل `App.js` هردوی آن‌ها ایمپورت می‌شوند. حال دستور `<Profile />` را به `<Gallery />` تغییر دهید و به مثال بازگردید:

<Sandpack>

```js src/App.js
import Gallery from './Gallery.js';
import { Profile } from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}
```

```js src/Gallery.js
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
  - کامپوننت `Profile` به‌عنوان **named export** که نام آن `Profile` است اکسپورت شده.
  - کامپوننت `Gallery` به‌عنوان **default export** اکسپورت شده است.
* `App.js`:
  - کامپوننت `Profile` به‌عنوان **named import** که نام آن `Profile` است در `Gallery.js` ایمپورت شده.
  - کامپوننت `Gallery` به‌عنوان **default import** در فایل `Gallery.js` ایمپورت شده.
  - کامپوننت `App` که کامپوننت ریشه است به‌عنوان **default export** اکسپورت شده است.

<Recap>

مواردی که در این صفحه یاد گرفتید:

* کامپوننت ریشه (root) چیست
* چگونه یک کامپوننت را export/import کنیم
* چه زمانی از export/import پیش‌فرض یا معمولی استفاده کنیم
* چگونه چندین کامپوننت که داخل یک فایل هستند را اکسپورت کنیم

</Recap>



<Challenges>

#### کامپوننت‌ها را به کامپوننت‌های کوچک‌تر تقسیم کنید {/*split-the-components-further*/}

در حال حاضر، فایل `Gallery.js` دو کامپوننت `Profile` و `Gallery` را اکسپورت می‌کند، که کمی گیج‌کننده است.

یک فایل با نام `Profile.js` بسازید و کامپوننت `Profile` را درون آن بیاورید و اکسپورت کنید. سپس در کامپوننت `App` همان را ایمپورت کنید.

هنگام استفاده از دستور export و import مطمئن شوید از کدام روش استفاده می‌کنید. برای این منظور جدول زیر را چک کنید:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

<Hint>

زمانی که کامپوننت‌ها را صدا می‌زنید، حتماً کامپوننت‌ها را import کنید. به نظر شما تا اینجا ما کامپوننت `Profile` را هم در فایل `Gallery.js` داریم؟

</Hint>

<Sandpack>

```js src/App.js
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

```js src/Gallery.js active
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

```js src/Profile.js
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

خب بسیار هم عالی! الان وقت آن رسیده که با نوع دیگری از export کار کنید.

<Solution>

این تکه کد از named export (دستور اکسپورت معمولی) استفاده کرده است:

<Sandpack>

```js src/App.js
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

```js src/Gallery.js
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

```js src/Profile.js
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

و همچنین کد زیر هم با default export (اکسپورت پیش‌فرض) نوشته شده است:

<Sandpack>

```js src/App.js
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

```js src/Gallery.js
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

```js src/Profile.js
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
