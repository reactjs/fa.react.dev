---
title: lazy
---

<Intro>

`lazy` به شما اجازه می‌دهد بارگذاری کد کامپوننت را تا زمانی که برای بار اول رندر می‌شود، به تعویق بیندازید.

```js
const SomeComponent = lazy(load)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `lazy(load)` {/*lazy*/}

برای اعلان یک کامپوننت ری‌اکت با بارگذاری تنبل (Lazy Loading)، `lazy` را خارج از کامپوننت‌های خود فراخوانی کنید:

```js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `load`: تابعی که یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا یک *thenable* دیگر (شیئی شبیه Promise با متد `then`) برمی‌گرداند. ری‌اکت `load` را تا زمانی که برای اولین بار تلاش کنید کامپوننت بازگشتی را رندر کنید، فراخوانی نمی‌کند. پس از آنکه ری‌اکت برای اولین بار `load` را فراخوانی کرد، منتظر می‌ماند تا حل شود، و سپس `.default` مقدار حل‌شده را به‌عنوان یک کامپوننت ری‌اکت رندر می‌کند. هم Promise بازگشتی و هم مقدار حل‌شدهٔ Promise کش می‌شوند، بنابراین ری‌اکت `load` را بیش از یک بار فراخوانی نمی‌کند. اگر Promise رد (reject) شود، ری‌اکت دلیل رد را برای نزدیک‌ترین مرز خطا (Error Boundary) `throw` می‌کند تا مدیریت شود.

#### مقادیر بازگشتی {/*returns*/}

`lazy` یک کامپوننت ری‌اکت برمی‌گرداند که می‌توانید آن را در درخت خود رندر کنید. تا زمانی که کد کامپوننت lazy هنوز در حال بارگذاری است، تلاش برای رندر آن *معلق (suspend)* خواهد شد. از [`<Suspense>`](/reference/react/Suspense) برای نمایش یک نشانگر بارگذاری هنگام بارگذاری استفاده کنید.

---

### تابع `load` {/*load*/}

#### پارامترها {/*load-parameters*/}

`load` هیچ پارامتری نمی‌پذیرد.

#### مقادیر بازگشتی {/*load-returns*/}

باید یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا یک *thenable* دیگر (شیئی شبیه Promise با متد `then`) برگردانید. این باید در نهایت به شیئی حل شود که پراپرتی `.default` آن یک نوع کامپوننت معتبر ری‌اکت باشد، مانند یک تابع، [`memo`](/reference/react/memo)، یا یک کامپوننت [`forwardRef`](/reference/react/forwardRef).

---

## استفاده {/*usage*/}

### بارگذاری تنبل کامپوننت‌ها با Suspense {/*suspense-for-code-splitting*/}

معمولاً، کامپوننت‌ها را با اعلان ایستای [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) ایمپورت می‌کنید:

```js
import MarkdownPreview from './MarkdownPreview.js';
```

برای به تعویق انداختن بارگذاری کد این کامپوننت تا زمانی که برای بار اول رندر شود، این ایمپورت را با این جایگزین کنید:

```js
import { lazy } from 'react';

const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
```

این کد به [`import()` پویا](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) تکیه می‌کند که ممکن است به پشتیبانی باندلر یا فریم‌ورک شما نیاز داشته باشد. استفاده از این الگو نیازمند آن است که کامپوننت lazyای که ایمپورت می‌کنید به‌عنوان اکسپورت `default` صادر شده باشد.

اکنون که کد کامپوننت شما به‌صورت تقاضا بارگذاری می‌شود، همچنین باید تعیین کنید چه چیزی باید هنگام بارگذاری نمایش داده شود. می‌توانید این کار را با پیچیدن کامپوننت lazy یا هر یک از والدین آن در یک مرز [`<Suspense>`](/reference/react/Suspense) انجام دهید:

```js {1,4}
<Suspense fallback={<Loading />}>
  <h2>Preview</h2>
  <MarkdownPreview />
</Suspense>
```

در این مثال، کد `MarkdownPreview` تا زمانی که تلاش نکنید آن را رندر کنید، بارگذاری نخواهد شد. اگر `MarkdownPreview` هنوز بارگذاری نشده باشد، `Loading` به‌جای آن نمایش داده خواهد شد. تیک‌زدن کادر را امتحان کنید:

<Sandpack>

```js src/App.js
import { useState, Suspense, lazy } from 'react';
import Loading from './Loading.js';

const MarkdownPreview = lazy(() => delayForDemo(import('./MarkdownPreview.js')));

export default function MarkdownEditor() {
  const [showPreview, setShowPreview] = useState(false);
  const [markdown, setMarkdown] = useState('Hello, **world**!');
  return (
    <>
      <textarea value={markdown} onChange={e => setMarkdown(e.target.value)} />
      <label>
        <input type="checkbox" checked={showPreview} onChange={e => setShowPreview(e.target.checked)} />
        Show preview
      </label>
      <hr />
      {showPreview && (
        <Suspense fallback={<Loading />}>
          <h2>Preview</h2>
          <MarkdownPreview markdown={markdown} />
        </Suspense>
      )}
    </>
  );
}

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}
```

```js src/Loading.js
export default function Loading() {
  return <p><i>Loading...</i></p>;
}
```

```js src/MarkdownPreview.js
import { Remarkable } from 'remarkable';

const md = new Remarkable();

export default function MarkdownPreview({ markdown }) {
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{__html: md.render(markdown)}}
    />
  );
}
```

```json package.json hidden
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "remarkable": "2.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
label {
  display: block;
}

input, textarea {
  margin-bottom: 10px;
}

body {
  min-height: 200px;
}
```

</Sandpack>

این دمو با یک تأخیر مصنوعی بارگذاری می‌شود. دفعهٔ بعد که تیک کادر را بردارید و دوباره بزنید، `Preview` کش شده خواهد بود، بنابراین حالت بارگذاری وجود نخواهد داشت. برای دیدن دوبارهٔ حالت بارگذاری، روی «Reset» در سندباکس کلیک کنید.

[دربارهٔ مدیریت حالت‌های بارگذاری با Suspense بیشتر بدانید.](/reference/react/Suspense)

---

## رفع اشکال {/*troubleshooting*/}

### استیت کامپوننت `lazy` من به‌طور غیرمنتظره بازنشانی می‌شود {/*my-lazy-components-state-gets-reset-unexpectedly*/}

کامپوننت‌های `lazy` را *درون* کامپوننت‌های دیگر اعلان نکنید:

```js {4-5}
import { lazy } from 'react';

function Editor() {
  // 🔴 Bad: This will cause all state to be reset on re-renders
  const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
  // ...
}
```

در عوض، همیشه آن‌ها را در بالاترین سطح ماژول خود اعلان کنید:

```js {3-4}
import { lazy } from 'react';

// ✅ Good: Declare lazy components outside of your components
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function Editor() {
  // ...
}
```
