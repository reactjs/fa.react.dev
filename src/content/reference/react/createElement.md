---
title: createElement
---

<Intro>

`createElement` به شما اجازه می‌دهد یک المان ری‌اکت ایجاد کنید. این به‌عنوان جایگزینی برای نوشتن [JSX](/learn/writing-markup-with-jsx) عمل می‌کند.

```js
const element = createElement(type, props, ...children)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `createElement(type, props, ...children)` {/*createelement*/}

برای ایجاد یک المان ری‌اکت با `type`، `props`، و `children` داده‌شده، `createElement` را فراخوانی کنید.

```js
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello'
  );
}
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `type`: آرگومان `type` باید یک نوع کامپوننت معتبر ری‌اکت باشد. برای مثال، می‌تواند یک رشتهٔ نام تگ (مانند `'div'` یا `'span'`)، یا یک کامپوننت ری‌اکت (یک تابع، یک کلاس، یا یک کامپوننت خاص مانند [`Fragment`](/reference/react/Fragment)) باشد.

* `props`: آرگومان `props` باید یا یک شیء باشد یا `null`. اگر `null` پاس بدهید، مانند یک شیء خالی رفتار خواهد شد. ری‌اکت المانی با پراپس‌هایی مطابق با `props`ای که پاس داده‌اید ایجاد می‌کند. توجه کنید که `ref` و `key` از شیء `props` شما خاص هستند و به‌عنوان `element.props.ref` و `element.props.key` روی `element` بازگشتی *در دسترس نخواهند بود*. آن‌ها به‌عنوان `element.ref` و `element.key` در دسترس خواهند بود.

* **اختیاری** `...children`: صفر یا چند نود فرزند. آن‌ها می‌توانند هر نود ری‌اکتی باشند، شامل المان‌های ری‌اکت، رشته‌ها، اعداد، [پورتال‌ها](/reference/react-dom/createPortal)، نودهای خالی (`null`، `undefined`، `true`، و `false`)، و آرایه‌هایی از نودهای ری‌اکت.

#### مقادیر بازگشتی {/*returns*/}

`createElement` یک شیء المان ری‌اکت با چند پراپرتی برمی‌گرداند:

* `type`: همان `type`ای که پاس داده‌اید.
* `props`: همان `props`ای که پاس داده‌اید به‌جز `ref` و `key`.
* `ref`: همان `ref`ای که پاس داده‌اید. اگر وجود نداشته باشد، `null`.
* `key`: همان `key`ای که پاس داده‌اید، به رشته تبدیل شده. اگر وجود نداشته باشد، `null`.

معمولاً، شما المان را از کامپوننت خود برمی‌گردانید یا آن را به‌عنوان فرزند المان دیگری قرار می‌دهید. اگرچه ممکن است پراپرتی‌های المان را بخوانید، اما بهتر است پس از ایجاد هر المان را به‌صورت مبهم (opaque) در نظر بگیرید و فقط آن را رندر کنید.

#### موارد احتیاط {/*caveats*/}

* باید **با المان‌های ری‌اکت و پراپس‌های آن‌ها به‌عنوان [immutable](https://en.wikipedia.org/wiki/Immutable_object) رفتار کنید** و هرگز پس از ایجاد، محتویات آن‌ها را تغییر ندهید. در محیط توسعه، ری‌اکت المان بازگشتی و پراپرتی `props` آن را به‌صورت سطحی [freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) می‌کند تا این موضوع را اجبار کند.

* هنگامی که از JSX استفاده می‌کنید، **باید یک تگ را با حرف بزرگ شروع کنید تا کامپوننت سفارشی خودتان رندر شود.** به عبارت دیگر، `<Something />` معادل `createElement(Something)` است، اما `<something />` (حرف کوچک) معادل `createElement('something')` است (توجه کنید این یک رشته است، بنابراین به‌عنوان یک تگ HTML داخلی در نظر گرفته خواهد شد).

* فقط باید **فرزندان را به‌عنوان آرگومان‌های متعدد به `createElement` پاس بدهید اگر همگی به‌صورت ایستا شناخته‌شده باشند**، مانند `createElement('h1', {}, child1, child2, child3)`. اگر فرزندان شما پویا هستند، کل آرایه را به‌عنوان آرگومان سوم پاس بدهید: `createElement('ul', {}, listItems)`. این تضمین می‌کند که ری‌اکت در مورد [`key`های گمشده](/learn/rendering-lists#keeping-list-items-in-order-with-key) برای هر لیست پویا به شما هشدار می‌دهد. برای لیست‌های ایستا این ضروری نیست زیرا هرگز ترتیبشان تغییر نمی‌کند.

---

## استفاده {/*usage*/}

### ایجاد یک المان بدون JSX {/*creating-an-element-without-jsx*/}

اگر [JSX](/learn/writing-markup-with-jsx) را دوست ندارید یا نمی‌توانید در پروژهٔ خود از آن استفاده کنید، می‌توانید از `createElement` به‌عنوان جایگزین استفاده کنید.

برای ایجاد یک المان بدون JSX، `createElement` را با مقداری <CodeStep step={1}>type</CodeStep>، <CodeStep step={2}>props</CodeStep>، و <CodeStep step={3}>children</CodeStep> فراخوانی کنید:

```js [[1, 5, "'h1'"], [2, 6, "{ className: 'greeting' }"], [3, 7, "'Hello ',"], [3, 8, "createElement('i', null, name),"], [3, 9, "'. Welcome!'"]]
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello ',
    createElement('i', null, name),
    '. Welcome!'
  );
}
```

<CodeStep step={3}>فرزندان</CodeStep> اختیاری هستند، و می‌توانید به هر تعداد که نیاز دارید پاس بدهید (مثال بالا سه فرزند دارد). این کد یک سرتیتر `<h1>` با یک سلام نمایش خواهد داد. برای مقایسه، در اینجا همان مثال با JSX بازنویسی شده است:

```js [[1, 3, "h1"], [2, 3, "className=\\"greeting\\""], [3, 4, "Hello <i>{name}</i>. Welcome!"], [1, 5, "h1"]]
function Greeting({ name }) {
  return (
    <h1 className="greeting">
      Hello <i>{name}</i>. Welcome!
    </h1>
  );
}
```

برای رندر کامپوننت ری‌اکت خودتان، تابعی مانند `Greeting` را به‌عنوان <CodeStep step={1}>type</CodeStep> به‌جای رشته‌ای مانند `'h1'` پاس بدهید:

```js [[1, 2, "Greeting"], [2, 2, "{ name: 'Taylor' }"]]
export default function App() {
  return createElement(Greeting, { name: 'Taylor' });
}
```

با JSX، به این شکل خواهد بود:

```js [[1, 2, "Greeting"], [2, 2, "name=\\"Taylor\\""]]
export default function App() {
  return <Greeting name="Taylor" />;
}
```

در اینجا یک مثال کامل نوشته‌شده با `createElement` آورده شده است:

<Sandpack>

```js
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello ',
    createElement('i', null, name),
    '. Welcome!'
  );
}

export default function App() {
  return createElement(
    Greeting,
    { name: 'Taylor' }
  );
}
```

```css
.greeting {
  color: darkgreen;
  font-family: Georgia;
}
```

</Sandpack>

و در اینجا همان مثال نوشته‌شده با JSX آورده شده است:

<Sandpack>

```js
function Greeting({ name }) {
  return (
    <h1 className="greeting">
      Hello <i>{name}</i>. Welcome!
    </h1>
  );
}

export default function App() {
  return <Greeting name="Taylor" />;
}
```

```css
.greeting {
  color: darkgreen;
  font-family: Georgia;
}
```

</Sandpack>

هر دو سبک کدنویسی خوب هستند، بنابراین می‌توانید از هر کدام که برای پروژهٔ خود ترجیح می‌دهید استفاده کنید. مزیت اصلی استفاده از JSX در مقایسه با `createElement` این است که دیدن کدام تگ بسته‌شده با کدام تگ بازشده مطابقت دارد، آسان است.

<DeepDive>

#### یک المان ری‌اکت دقیقاً چیست؟ {/*what-is-a-react-element-exactly*/}

یک المان توصیفی سبک از بخشی از رابط کاربری است. برای مثال، هم `<Greeting name="Taylor" />` و هم `createElement(Greeting, { name: 'Taylor' })` شیئی مانند این تولید می‌کنند:

```js
// Slightly simplified
{
  type: Greeting,
  props: {
    name: 'Taylor'
  },
  key: null,
  ref: null,
}
```

**توجه کنید که ایجاد این شیء، کامپوننت `Greeting` را رندر نمی‌کند یا هیچ المان DOMای ایجاد نمی‌کند.**

یک المان ری‌اکت بیشتر شبیه یک توصیف است — دستوری برای ری‌اکت تا بعداً کامپوننت `Greeting` را رندر کند. با برگرداندن این شیء از کامپوننت `App` خود، به ری‌اکت می‌گویید در ادامه چه کاری انجام دهد.

ایجاد المان‌ها بسیار ارزان است، بنابراین نیازی نیست سعی کنید آن را بهینه کنید یا از آن اجتناب کنید.

</DeepDive>
