---
title: "'use client'"
titleForTitleTag: "'use client' directive"
---

<RSC>

`'use client'` برای استفاده با [کامپوننت‌های سرور ری‌اکت](/reference/rsc/server-components) است.

</RSC>


<Intro>

`'use client'` به شما اجازه می‌دهد کدی را که روی کلاینت اجرا می‌شود، علامت‌گذاری کنید.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `'use client'` {/*use-client*/}

`'use client'` را در بالای یک فایل اضافه کنید تا ماژول و وابستگی‌های انتقالی آن به‌عنوان کد کلاینت علامت‌گذاری شوند.

```js {1}
'use client';

import { useState } from 'react';
import { formatDate } from './formatters';
import Button from './button';

export default function RichTextEditor({ timestamp, text }) {
  const date = formatDate(timestamp);
  // ...
  const editButton = <Button />;
  // ...
}
```

وقتی یک فایل با `'use client'` علامت‌گذاری شده از یک کامپوننت سرور وارد (import) می‌شود، [باندلرهای سازگار](/learn/start-a-new-react-project#full-stack-frameworks) با وارد کردن ماژول، آن را به‌عنوان مرزی بین کد اجرا شونده روی سرور و کد اجرا شونده روی کلاینت در نظر می‌گیرند.

از آنجا که `formatDate` و `Button` وابستگی‌های `RichTextEditor` هستند، صرف‌نظر از اینکه ماژول‌هایشان حاوی دایرکتیو `'use client'` باشند یا نه، روی کلاینت ارزیابی می‌شوند. توجه کنید که یک ماژول واحد ممکن است وقتی از کد سرور وارد می‌شود روی سرور، و وقتی از کد کلاینت وارد می‌شود روی کلاینت ارزیابی شود.

#### ملاحظات {/*caveats*/}

* `'use client'` باید در همان ابتدای فایل، بالاتر از هرگونه import یا کد دیگر قرار گیرد (کامنت‌ها مجاز هستند). باید با کوتیشن تکی یا جفتی نوشته شوند، اما نه با backtick.
* وقتی یک ماژول `'use client'` از یک ماژول کلاینت‌رندر دیگر وارد می‌شود، دایرکتیو تأثیری ندارد.
* وقتی ماژول یک کامپوننت حاوی دایرکتیو `'use client'` است، هر استفاده از آن کامپوننت تضمین می‌شود که یک کامپوننت کلاینت باشد. با این حال، یک کامپوننت همچنان ممکن است روی کلاینت ارزیابی شود، حتی اگر دایرکتیو `'use client'` نداشته باشد.
        * استفاده از یک کامپوننت در صورتی کامپوننت کلاینت در نظر گرفته می‌شود که در ماژولی با دایرکتیو `'use client'` تعریف شده باشد، یا وابستگی انتقالی ماژولی باشد که دایرکتیو `'use client'` دارد. در غیر این صورت، یک کامپوننت سرور است.
* کدی که برای ارزیابی روی کلاینت علامت‌گذاری شده، محدود به کامپوننت‌ها نیست. همهٔ کدی که بخشی از زیردرخت ماژول کلاینت است، به کلاینت ارسال و توسط آن اجرا می‌شود.
* وقتی یک ماژول ارزیابی‌شده روی سرور مقادیری را از یک ماژول `'use client'` وارد می‌کند، آن مقادیر باید یا یک کامپوننت ری‌اکت باشند یا [مقادیر پراپس سریالایز قابل پشتیبانی](#passing-props-from-server-to-client-components) تا بتوانند به یک کامپوننت کلاینت منتقل شوند. هر مورد استفادهٔ دیگری استثنا پرتاب می‌کند.

### چگونه `'use client'` کد کلاینت را علامت‌گذاری می‌کند {/*how-use-client-marks-client-code*/}

در یک اپ ری‌اکت، کامپوننت‌ها اغلب به فایل‌های جداگانه، یا [ماژول‌ها](/learn/importing-and-exporting-components#exporting-and-importing-a-component) تقسیم می‌شوند.

برای اپ‌هایی که از کامپوننت‌های سرور ری‌اکت استفاده می‌کنند، اپ به‌طور پیش‌فرض روی سرور رندر می‌شود. `'use client'` یک مرز سرور-کلاینت در [درخت وابستگی ماژول](/learn/understanding-your-ui-as-a-tree#the-module-dependency-tree) معرفی می‌کند، و عملاً یک زیردرخت از ماژول‌های کلاینت می‌سازد.

برای توضیح بهتر، اپ کامپوننت‌های سرور ری‌اکت زیر را در نظر بگیرید.

<Sandpack>

```js src/App.js
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}

```

```js src/FancyText.js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
```

```js src/InspirationGenerator.js
'use client';

import { useState } from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = useState(0);
  const quote = inspirations[index];
  const next = () => setIndex((index + 1) % inspirations.length);

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
```

```js src/Copyright.js
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}
```

```js src/inspirations.js
export default [
  "Don’t let yesterday take up too much of today.” — Will Rogers",
  "Ambition is putting a ladder against the sky.",
  "A joy that's shared is a joy made double.",
];
```

```css
.fancy {
  font-family: 'Georgia';
}
.title {
  color: #007AA3;
  text-decoration: underline;
}
.cursive {
  font-style: italic;
}
.small {
  font-size: 10px;
}
```

</Sandpack>

در درخت وابستگی ماژول این اپ نمونه، دایرکتیو `'use client'` در `InspirationGenerator.js` آن ماژول و تمام وابستگی‌های انتقالی آن را به‌عنوان ماژول‌های کلاینت علامت‌گذاری می‌کند. زیردرخت آغاز شده از `InspirationGenerator.js` اکنون به‌عنوان ماژول‌های کلاینت علامت‌گذاری شده است.

<Diagram name="use_client_module_dependency" height={250} width={545} alt="A tree graph with the top node representing the module 'App.js'. 'App.js' has three children: 'Copyright.js', 'FancyText.js', and 'InspirationGenerator.js'. 'InspirationGenerator.js' has two children: 'FancyText.js' and 'inspirations.js'. The nodes under and including 'InspirationGenerator.js' have a yellow background color to signify that this sub-graph is client-rendered due to the 'use client' directive in 'InspirationGenerator.js'.">
`'use client'` درخت وابستگی ماژول اپ کامپوننت‌های سرور ری‌اکت را تقسیم می‌کند، و `InspirationGenerator.js` و تمام وابستگی‌های آن را به‌عنوان کلاینت‌رندر علامت‌گذاری می‌کند.
</Diagram>

در حین رندر، فریمورک کامپوننت ریشه را روی سرور رندر می‌کند و از [درخت رندر](/learn/understanding-your-ui-as-a-tree#the-render-tree) عبور می‌کند، و از ارزیابی هر کدی که از کد علامت‌گذاری شدهٔ کلاینت وارد شده، صرف‌نظر می‌کند.

سپس بخش سرور‌رندر شدهٔ درخت رندر به کلاینت ارسال می‌شود. کلاینت، با کد کلاینت خودش دانلود شده، سپس رندر باقی‌ماندهٔ درخت را تکمیل می‌کند.

<Diagram name="use_client_render_tree" height={250} width={500} alt="A tree graph where each node represents a component and its children as child components. The top-level node is labelled 'App' and it has two child components 'InspirationGenerator' and 'FancyText'. 'InspirationGenerator' has two child components, 'FancyText' and 'Copyright'. Both 'InspirationGenerator' and its child component 'FancyText' are marked to be client-rendered.">
درخت رندر برای اپ کامپوننت‌های سرور ری‌اکت. `InspirationGenerator` و کامپوننت فرزندش `FancyText` کامپوننت‌هایی هستند که از کد علامت‌گذاری‌شدهٔ کلاینت export شده‌اند و به‌عنوان کامپوننت‌های کلاینت در نظر گرفته می‌شوند.
</Diagram>

تعاریف زیر را معرفی می‌کنیم:

* **کامپوننت‌های کلاینت** کامپوننت‌هایی در یک درخت رندر هستند که روی کلاینت رندر می‌شوند.
* **کامپوننت‌های سرور** کامپوننت‌هایی در یک درخت رندر هستند که روی سرور رندر می‌شوند.

با کار روی اپ نمونه، `App`، `FancyText` و `Copyright` همگی روی سرور رندر می‌شوند و به‌عنوان کامپوننت سرور در نظر گرفته می‌شوند. از آنجا که `InspirationGenerator.js` و وابستگی‌های انتقالی آن به‌عنوان کد کلاینت علامت‌گذاری شده‌اند، کامپوننت `InspirationGenerator` و کامپوننت فرزندش `FancyText` کامپوننت کلاینت هستند.

<DeepDive>
#### چگونه `FancyText` هم یک کامپوننت سرور و هم یک کامپوننت کلاینت است؟ {/*how-is-fancytext-both-a-server-and-a-client-component*/}

با تعاریف بالا، کامپوننت `FancyText` هم یک کامپوننت سرور و هم یک کامپوننت کلاینت است، چگونه ممکن است؟

اول، بگذارید روشن کنیم که واژهٔ «کامپوننت» خیلی دقیق نیست. در اینجا فقط دو روش برای فهمیدن «کامپوننت» وجود دارد:

1. یک «کامپوننت» می‌تواند به **تعریف کامپوننت** اشاره کند. در بیشتر موارد این یک تابع خواهد بود.

```js
// This is a definition of a component
function MyComponent() {
  return <p>My Component</p>
}
```

2. یک «کامپوننت» همچنین می‌تواند به **استفادهٔ کامپوننت** از تعریف آن اشاره کند.
```js
import MyComponent from './MyComponent';

function App() {
  // This is a usage of a component
  return <MyComponent />;
}
```

اغلب، این عدم دقت هنگام توضیح مفاهیم مهم نیست، اما در این مورد مهم است.

وقتی ما دربارهٔ کامپوننت‌های سرور یا کلاینت صحبت می‌کنیم، منظور ما استفاده‌های کامپوننت است.

* اگر کامپوننت در ماژولی با دایرکتیو `'use client'` تعریف شده باشد، یا کامپوننت در یک کامپوننت کلاینت وارد و فراخوانی شده باشد، آن استفاده از کامپوننت یک کامپوننت کلاینت است.
* در غیر این صورت، استفاده از کامپوننت یک کامپوننت سرور است.


<Diagram name="use_client_render_tree" height={150} width={450} alt="A tree graph where each node represents a component and its children as child components. The top-level node is labelled 'App' and it has two child components 'InspirationGenerator' and 'FancyText'. 'InspirationGenerator' has two child components, 'FancyText' and 'Copyright'. Both 'InspirationGenerator' and its child component 'FancyText' are marked to be client-rendered.">یک درخت رندر، استفاده‌های کامپوننت را نشان می‌دهد.</Diagram>

برگشت به سؤال `FancyText`، می‌بینیم که تعریف کامپوننت دایرکتیو `'use client'` ندارد و دو استفاده دارد.

استفاده از `FancyText` به‌عنوان فرزند `App`، آن استفاده را به‌عنوان یک کامپوننت سرور علامت‌گذاری می‌کند. وقتی `FancyText` در `InspirationGenerator` وارد و فراخوانی می‌شود، آن استفاده از `FancyText` یک کامپوننت کلاینت است، زیرا `InspirationGenerator` حاوی دایرکتیو `'use client'` است.

این بدان معناست که تعریف کامپوننت `FancyText` هم روی سرور ارزیابی می‌شود و هم توسط کلاینت دانلود می‌شود تا استفادهٔ کامپوننت کلاینت آن را رندر کند.

</DeepDive>

<DeepDive>

#### چرا `Copyright` یک کامپوننت سرور است؟ {/*why-is-copyright-a-server-component*/}

چون `Copyright` به‌عنوان فرزند کامپوننت کلاینت `InspirationGenerator` رندر می‌شود، ممکن است از اینکه یک کامپوننت سرور است متعجب شوید.

به یاد بیاورید که `'use client'` مرز بین کد سرور و کلاینت را روی _درخت وابستگی ماژول_ تعریف می‌کند، نه درخت رندر.

<Diagram name="use_client_module_dependency" height={200} width={500} alt="A tree graph with the top node representing the module 'App.js'. 'App.js' has three children: 'Copyright.js', 'FancyText.js', and 'InspirationGenerator.js'. 'InspirationGenerator.js' has two children: 'FancyText.js' and 'inspirations.js'. The nodes under and including 'InspirationGenerator.js' have a yellow background color to signify that this sub-graph is client-rendered due to the 'use client' directive in 'InspirationGenerator.js'.">
`'use client'` مرز بین کد سرور و کلاینت را روی درخت وابستگی ماژول تعریف می‌کند.
</Diagram>

در درخت وابستگی ماژول، می‌بینیم که `App.js`، `Copyright` را از ماژول `Copyright.js` وارد و فراخوانی می‌کند. از آنجا که `Copyright.js` دایرکتیو `'use client'` ندارد، استفاده از کامپوننت روی سرور رندر می‌شود. `App` روی سرور رندر می‌شود زیرا کامپوننت ریشه است.

کامپوننت‌های کلاینت می‌توانند کامپوننت‌های سرور را رندر کنند، زیرا می‌توانید JSX را به‌عنوان پراپس منتقل کنید. در این مورد، `InspirationGenerator`، `Copyright` را به‌عنوان [فرزندان](/learn/passing-props-to-a-component#passing-jsx-as-children) دریافت می‌کند. با این حال، ماژول `InspirationGenerator` هرگز مستقیماً ماژول `Copyright` را وارد نمی‌کند و نه کامپوننت را فراخوانی می‌کند، همهٔ این کارها توسط `App` انجام می‌شود. در واقع، کامپوننت `Copyright` کاملاً قبل از شروع رندر `InspirationGenerator` اجرا می‌شود.

نکتهٔ کلیدی این است که یک رابطهٔ رندر والد-فرزندی بین کامپوننت‌ها، تضمین نمی‌کند که محیط رندر یکسانی داشته باشند.

</DeepDive>

### چه زمان از `'use client'` استفاده کنیم {/*when-to-use-use-client*/}

با `'use client'`، می‌توانید تعیین کنید چه زمانی کامپوننت‌ها کامپوننت کلاینت هستند. از آنجا که کامپوننت‌های سرور پیش‌فرض هستند، در اینجا مرور کوتاهی از مزایا و محدودیت‌های کامپوننت‌های سرور آورده شده تا تعیین کنید چه زمانی چیزی را به‌عنوان کلاینت‌رندر علامت‌گذاری کنید.

برای ساده‌سازی، ما دربارهٔ کامپوننت‌های سرور صحبت می‌کنیم، اما همان اصول برای همهٔ کد در اپ شما که روی سرور اجرا می‌شود نیز اعمال می‌شود.

#### مزایای کامپوننت‌های سرور {/*advantages*/}
* کامپوننت‌های سرور می‌توانند میزان کد ارسالی و اجراشده توسط کلاینت را کاهش دهند. فقط ماژول‌های کلاینت توسط کلاینت باندل و ارزیابی می‌شوند.
* کامپوننت‌های سرور از اجرا روی سرور سود می‌برند. آن‌ها می‌توانند به سیستم‌فایل محلی دسترسی داشته باشند و ممکن است برای fetch داده‌ها و درخواست‌های شبکه با تأخیر کمتری مواجه شوند.

#### محدودیت‌های کامپوننت‌های سرور {/*limitations*/}
* کامپوننت‌های سرور نمی‌توانند از تعامل پشتیبانی کنند، زیرا event handlerها باید توسط یک کلاینت ثبت و راه‌اندازی شوند.
        * مثلاً event handlerهایی مانند `onClick` فقط می‌توانند در کامپوننت‌های کلاینت تعریف شوند.
* کامپوننت‌های سرور نمی‌توانند از بیشتر هوک‌ها استفاده کنند.
        * وقتی کامپوننت‌های سرور رندر می‌شوند، خروجی آن‌ها در واقع یک فهرست از کامپوننت‌ها برای کلاینت است که رندر کند. کامپوننت‌های سرور پس از رندر در حافظه باقی نمی‌مانند و نمی‌توانند استیت خودشان را داشته باشند.

### انواع سریالایز بازگشتی از کامپوننت‌های سرور {/*serializable-types*/}

مانند هر اپ ری‌اکت، کامپوننت‌های والد داده‌ها را به کامپوننت‌های فرزند منتقل می‌کنند. از آنجا که آن‌ها در محیط‌های متفاوتی رندر می‌شوند، انتقال داده از یک کامپوننت سرور به یک کامپوننت کلاینت نیاز به توجه اضافه دارد.

مقادیر پراپس منتقل‌شده از یک کامپوننت سرور به کامپوننت کلاینت باید سریالایز باشند.

پراپس سریالایز شامل موارد زیر است:
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
* [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)های ساده: آن‌هایی که با [object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) ایجاد شده‌اند، با ویژگی‌های سریالایز
* تابع‌هایی که [تابع سرور](/reference/rsc/server-functions) هستند
* elementهای کامپوننت کلاینت یا سرور (JSX)
* [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)ها

به‌طور خاص، موارد زیر پشتیبانی نمی‌شوند:
* [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)هایی که از ماژول‌های علامت‌گذاری‌شدهٔ کلاینت export نشده‌اند یا با [`'use server'`](/reference/rsc/use-server) علامت‌گذاری نشده‌اند
* [Class](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Classes_in_JavaScript)ها
* objectهایی که نمونه‌ای از هر کلاسی هستند (به جز موارد ذکرشده) یا objectهایی با [prototype null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)
* symbolهایی که به‌صورت سراسری ثبت نشده‌اند، مثلاً `Symbol('my new symbol')`


## نحوهٔ استفاده {/*usage*/}

### ساختن با تعامل و استیت {/*building-with-interactivity-and-state*/}

<Sandpack>

```js src/App.js
'use client';

import { useState } from 'react';

export default function Counter({initialValue = 0}) {
  const [countValue, setCountValue] = useState(initialValue);
  const increment = () => setCountValue(countValue + 1);
  const decrement = () => setCountValue(countValue - 1);
  return (
    <>
      <h2>Count Value: {countValue}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </>
  );
}
```

</Sandpack>

از آنجا که `Counter` هم به هوک `useState` و هم به event handler برای افزایش یا کاهش مقدار نیاز دارد، این کامپوننت باید یک کامپوننت کلاینت باشد و در بالای آن به دایرکتیو `'use client'` نیاز دارد.

در مقابل، کامپوننتی که UI را بدون تعامل رندر می‌کند، نیازی ندارد که یک کامپوننت کلاینت باشد.

```js
import { readFile } from 'node:fs/promises';
import Counter from './Counter';

export default async function CounterContainer() {
  const initialValue = await readFile('/path/to/counter_value');
  return <Counter initialValue={initialValue} />
}
```

مثلاً کامپوننت والد `Counter`، یعنی `CounterContainer`، نیازی به `'use client'` ندارد زیرا تعاملی نیست و از استیت استفاده نمی‌کند. علاوه بر این، `CounterContainer` باید یک کامپوننت سرور باشد زیرا از سیستم‌فایل محلی روی سرور می‌خواند، که فقط در یک کامپوننت سرور امکان‌پذیر است.

همچنین کامپوننت‌هایی وجود دارند که از هیچ قابلیت سرور یا کلاینت‌اختصاصی استفاده نمی‌کنند و می‌توانند نسبت به اینکه کجا رندر می‌شوند بی‌تفاوت باشند. در مثال قبلی ما، `FancyText` چنین کامپوننتی است.

```js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
```

در این مورد، ما دایرکتیو `'use client'` را اضافه نمی‌کنیم، که باعث می‌شود _خروجی_ `FancyText` (به‌جای کد منبع آن) وقتی از یک کامپوننت سرور ارجاع می‌شود، به مرورگر ارسال شود. همان‌طور که در مثال اپ Inspirations قبلی نشان داده شد، `FancyText` بسته به اینکه کجا وارد و استفاده می‌شود، هم به‌عنوان یک کامپوننت سرور و هم کلاینت استفاده می‌شود.

اما اگر خروجی HTML `FancyText` نسبت به کد منبع آن (شامل وابستگی‌ها) بزرگ بود، ممکن است کارآمدتر باشد که آن را همیشه به یک کامپوننت کلاینت تبدیل کنید. کامپوننت‌هایی که یک رشتهٔ طولانی مسیر SVG برمی‌گردانند، یکی از مواردی است که ممکن است کارآمدتر باشد تا کامپوننت را به یک کامپوننت کلاینت تبدیل کنید.

### استفاده از APIهای کلاینت {/*using-client-apis*/}

اپ ری‌اکت شما ممکن است از APIهای اختصاصی کلاینت استفاده کند، مانند APIهای مرورگر برای ذخیره‌سازی وب، دستکاری صدا و تصویر، و سخت‌افزار دستگاه، در میان [موارد دیگر](https://developer.mozilla.org/en-US/docs/Web/API).

در این مثال، کامپوننت از [APIهای DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) برای دستکاری یک المنت [`canvas`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) استفاده می‌کند. از آنجا که این APIها فقط در مرورگر در دسترس هستند، باید به‌عنوان یک کامپوننت کلاینت علامت‌گذاری شود.

```js
'use client';

import {useRef, useEffect} from 'react';

export default function Circle() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    context.reset();
    context.beginPath();
    context.arc(100, 75, 50, 0, 2 * Math.PI);
    context.stroke();
  });
  return <canvas ref={ref} />;
}
```

### استفاده از کتابخانه‌های شخص ثالث {/*using-third-party-libraries*/}

اغلب در یک اپ ری‌اکت، از کتابخانه‌های شخص ثالث برای مدیریت الگوهای رایج UI یا منطق استفاده می‌کنید.

این کتابخانه‌ها ممکن است به هوک‌های کامپوننت یا APIهای کلاینت وابسته باشند. کامپوننت‌های شخص ثالث که از هر یک از APIهای ری‌اکت زیر استفاده می‌کنند باید روی کلاینت اجرا شوند:
* [createContext](/reference/react/createContext)
* هوک‌های [`react`](/reference/react/hooks) و [`react-dom`](/reference/react-dom/hooks)، به‌جز [`use`](/reference/react/use) و [`useId`](/reference/react/useId)
* [forwardRef](/reference/react/forwardRef)
* [memo](/reference/react/memo)
* [startTransition](/reference/react/startTransition)
* اگر از APIهای کلاینت استفاده می‌کنند، مثلاً درج DOM یا نماهای بومی پلتفرم

اگر این کتابخانه‌ها برای سازگاری با کامپوننت‌های سرور ری‌اکت به‌روزرسانی شده‌اند، آن‌ها از قبل شامل علامت‌گذاری‌های `'use client'` خود هستند، که به شما اجازه می‌دهد مستقیماً از کامپوننت‌های سرور خود استفاده کنید. اگر کتابخانه‌ای به‌روزرسانی نشده، یا اگر کامپوننتی به پراپس‌هایی مانند event handler نیاز دارد که فقط روی کلاینت قابل تعیین هستند، ممکن است لازم باشد فایل کامپوننت کلاینت خودتان را بین کامپوننت کلاینت شخص ثالث و کامپوننت سروری که می‌خواهید از آن استفاده کنید، اضافه کنید.

[TODO]: <> (Troubleshooting - need use-cases)
