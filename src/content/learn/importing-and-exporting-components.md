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

#### Default vs named exports {/*default-vs-named-exports*/}

There are two primary ways to export values with JavaScript: default exports and named exports. So far, our examples have only used default exports. But you can use one or both of them in the same file. **A file can have no more than one _default_ export, but it can have as many _named_ exports as you like.**

![Default and named exports](/images/docs/illustrations/i_import-export.svg)

How you export your component dictates how you must import it. You will get an error if you try to import a default export the same way you would a named export! This chart can help you keep track:

| Syntax           | Export statement                           | Import statement                          |
| -----------      | -----------                                | -----------                               |
| Default  | `export default function Button() {}` | `import Button from './Button.js';`     |
| Named    | `export function Button() {}`         | `import { Button } from './Button.js';` |

When you write a _default_ import, you can put any name you want after `import`. For example, you could write `import Banana from './Button.js'` instead and it would still provide you with the same default export. In contrast, with named imports, the name has to match on both sides. That's why they are called _named_ imports!

**People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.** Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like `export default () => {}`, are discouraged because they make debugging harder.

</DeepDive>

## Exporting and importing multiple components from the same file {/*exporting-and-importing-multiple-components-from-the-same-file*/}

What if you want to show just one `Profile` instead of a gallery? You can export the `Profile` component, too. But `Gallery.js` already has a *default* export, and you can't have _two_ default exports. You could create a new file with a default export, or you could add a *named* export for `Profile`. **A file can only have one default export, but it can have numerous named exports!**

<Note>

To reduce the potential confusion between default and named exports, some teams choose to only stick to one style (default or named), or avoid mixing them in a single file. Do what works best for you!

</Note>

First, **export** `Profile` from `Gallery.js` using a named export (no `default` keyword):

```js
export function Profile() {
  // ...
}
```

Then, **import** `Profile` from `Gallery.js` to `App.js` using a named import (with the curly braces):

```js
import { Profile } from './Gallery.js';
```

Finally, **render** `<Profile />` from the `App` component:

```js
export default function App() {
  return <Profile />;
}
```

Now `Gallery.js` contains two exports: a default `Gallery` export, and a named `Profile` export. `App.js` imports both of them. Try editing `<Profile />` to `<Gallery />` and back in this example:

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

Now you're using a mix of default and named exports:

* `Gallery.js`:
  - Exports the `Profile` component as a **named export called `Profile`.**
  - Exports the `Gallery` component as a **default export.**
* `App.js`:
  - Imports `Profile` as a **named import called `Profile`** from `Gallery.js`.
  - Imports `Gallery` as a **default import** from `Gallery.js`.
  - Exports the root `App` component as a **default export.**

<Recap>

On this page you learned:

* What a root component file is
* How to import and export a component
* When and how to use default and named imports and exports
* How to export multiple components from the same file

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
