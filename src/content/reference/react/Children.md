---
title: Children
---

<Pitfall>

استفاده از `Children` رایج نیست و می‌تواند منجر به کد شکننده شود. [جایگزین‌های رایج را ببینید.](#alternatives)

</Pitfall>

<Intro>

`Children` به شما اجازه می‌دهد JSX‌ای را که به‌عنوان [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) دریافت کرده‌اید دستکاری و تبدیل کنید.

```js
const mappedChildren = Children.map(children, child =>
  <div className="Row">
    {child}
  </div>
);

```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `Children.count(children)` {/*children-count*/}

برای شمارش تعداد فرزندان در ساختار دادهٔ `children`، `Children.count(children)` را فراخوانی کنید.

```js src/RowList.js active
import { Children } from 'react';

function RowList({ children }) {
  return (
    <>
      <h1>Total rows: {Children.count(children)}</h1>
      ...
    </>
  );
}
```

[مثال‌های بیشتری را در ادامه ببینید.](#counting-children)

#### پارامترها {/*children-count-parameters*/}

* `children`: مقدار [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) که توسط کامپوننت شما دریافت شده است.

#### مقدار بازگشتی {/*children-count-returns*/}

تعداد گره‌های درون این `children`.

#### نکات {/*children-count-caveats*/}

- گره‌های خالی (`null`، `undefined`، و بولین‌ها)، رشته‌ها، اعداد، و [المان‌های ری‌اکت](/reference/react/createElement) به‌عنوان گره‌های منفرد شمرده می‌شوند. آرایه‌ها به‌عنوان گره‌های منفرد شمرده نمی‌شوند، اما فرزندان آن‌ها شمرده می‌شوند. **پیمایش عمیق‌تر از المان‌های ری‌اکت نمی‌رود:** آن‌ها رندر نمی‌شوند، و فرزندانشان پیمایش نمی‌شوند. [فرگمنت‌ها](/reference/react/Fragment) پیمایش نمی‌شوند.

---

### `Children.forEach(children, fn, thisArg?)` {/*children-foreach*/}

برای اجرای کدی برای هر فرزند در ساختار دادهٔ `children`، `Children.forEach(children, fn, thisArg?)` را فراخوانی کنید.

```js src/RowList.js active
import { Children } from 'react';

function SeparatorList({ children }) {
  const result = [];
  Children.forEach(children, (child, index) => {
    result.push(child);
    result.push(<hr key={index} />);
  });
  // ...
```

[مثال‌های بیشتری را در ادامه ببینید.](#running-some-code-for-each-child)

#### پارامترها {/*children-foreach-parameters*/}

* `children`: مقدار [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) که توسط کامپوننت شما دریافت شده است.
* `fn`: تابعی که می‌خواهید برای هر فرزند اجرا کنید، مشابه به کالبک [متد `forEach` آرایه](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). با فرزند به‌عنوان آرگومان اول و اندیس آن به‌عنوان آرگومان دوم فراخوانی می‌شود. اندیس از `0` شروع می‌شود و در هر فراخوانی افزایش می‌یابد.
* **اختیاری** `thisArg`: [مقدار `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) که تابع `fn` باید با آن فراخوانی شود. اگر حذف شود، `undefined` است.

#### مقدار بازگشتی {/*children-foreach-returns*/}

`Children.forEach` مقدار `undefined` برمی‌گرداند.

#### نکات {/*children-foreach-caveats*/}

- گره‌های خالی (`null`، `undefined`، و بولین‌ها)، رشته‌ها، اعداد، و [المان‌های ری‌اکت](/reference/react/createElement) به‌عنوان گره‌های منفرد شمرده می‌شوند. آرایه‌ها به‌عنوان گره‌های منفرد شمرده نمی‌شوند، اما فرزندان آن‌ها شمرده می‌شوند. **پیمایش عمیق‌تر از المان‌های ری‌اکت نمی‌رود:** آن‌ها رندر نمی‌شوند، و فرزندانشان پیمایش نمی‌شوند. [فرگمنت‌ها](/reference/react/Fragment) پیمایش نمی‌شوند.

---

### `Children.map(children, fn, thisArg?)` {/*children-map*/}

برای نگاشت یا تبدیل هر فرزند در ساختار دادهٔ `children`، `Children.map(children, fn, thisArg?)` را فراخوانی کنید.

```js src/RowList.js active
import { Children } from 'react';

function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

[مثال‌های بیشتری را در ادامه ببینید.](#transforming-children)

#### پارامترها {/*children-map-parameters*/}

* `children`: مقدار [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) که توسط کامپوننت شما دریافت شده است.
* `fn`: تابع نگاشت، مشابه به کالبک [متد `map` آرایه](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). با فرزند به‌عنوان آرگومان اول و اندیس آن به‌عنوان آرگومان دوم فراخوانی می‌شود. اندیس از `0` شروع می‌شود و در هر فراخوانی افزایش می‌یابد. باید یک گره ری‌اکت از این تابع برگردانید. این می‌تواند یک گره خالی (`null`، `undefined`، یا یک بولین)، یک رشته، یک عدد، یک المان ری‌اکت، یا یک آرایه از گره‌های دیگر ری‌اکت باشد.
* **اختیاری** `thisArg`: [مقدار `this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) که تابع `fn` باید با آن فراخوانی شود. اگر حذف شود، `undefined` است.

#### مقدار بازگشتی {/*children-map-returns*/}

اگر `children` مقدار `null` یا `undefined` باشد، همان مقدار را برمی‌گرداند.

در غیر این صورت، یک آرایه تخت شامل گره‌هایی که از تابع `fn` برگردانده‌اید برمی‌گرداند. آرایهٔ برگردانده‌شده شامل تمام گره‌هایی که برگردانده‌اید به جز `null` و `undefined` خواهد بود.

#### نکات {/*children-map-caveats*/}

- گره‌های خالی (`null`، `undefined`، و بولین‌ها)، رشته‌ها، اعداد، و [المان‌های ری‌اکت](/reference/react/createElement) به‌عنوان گره‌های منفرد شمرده می‌شوند. آرایه‌ها به‌عنوان گره‌های منفرد شمرده نمی‌شوند، اما فرزندان آن‌ها شمرده می‌شوند. **پیمایش عمیق‌تر از المان‌های ری‌اکت نمی‌رود:** آن‌ها رندر نمی‌شوند، و فرزندانشان پیمایش نمی‌شوند. [فرگمنت‌ها](/reference/react/Fragment) پیمایش نمی‌شوند.

- اگر یک المان یا آرایه‌ای از المان‌ها با کلیدها از `fn` برگردانید، **کلیدهای المان‌های برگردانده‌شده به‌طور خودکار با کلید آیتم اصلی مربوطه از `children` ترکیب می‌شوند.** وقتی چندین المان را از `fn` در یک آرایه برمی‌گردانید، کلیدهای آن‌ها فقط نیاز است که به‌صورت محلی در میان خود منحصر به فرد باشند.

---

### `Children.only(children)` {/*children-only*/}


برای تأیید اینکه `children` یک المان واحد ری‌اکت را نشان می‌دهد، `Children.only(children)` را فراخوانی کنید.

```js
function Box({ children }) {
  const element = Children.only(children);
  // ...
```

#### پارامترها {/*children-only-parameters*/}

* `children`: مقدار [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) که توسط کامپوننت شما دریافت شده است.

#### مقدار بازگشتی {/*children-only-returns*/}

اگر `children` [یک المان معتبر است](/reference/react/isValidElement)، آن المان را برمی‌گرداند.

در غیر این صورت، یک خطا پرتاب می‌کند.

#### نکات {/*children-only-caveats*/}

- این متد همیشه **اگر یک آرایه (مانند مقدار بازگشتی `Children.map`) را به‌عنوان `children` ارسال کنید، خطا پرتاب می‌کند.** به عبارت دیگر، آن را الزام می‌کند که `children` یک المان واحد ری‌اکت باشد، نه یک آرایه با یک المان واحد.

---

### `Children.toArray(children)` {/*children-toarray*/}

برای ایجاد یک آرایه از ساختار دادهٔ `children`، `Children.toArray(children)` را فراخوانی کنید.

```js src/ReversedList.js active
import { Children } from 'react';

export default function ReversedList({ children }) {
  const result = Children.toArray(children);
  result.reverse();
  // ...
```

#### پارامترها {/*children-toarray-parameters*/}

* `children`: مقدار [پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) که توسط کامپوننت شما دریافت شده است.

#### مقدار بازگشتی {/*children-toarray-returns*/}

یک آرایه تخت از المان‌ها در `children` برمی‌گرداند.

#### نکات {/*children-toarray-caveats*/}

- گره‌های خالی (`null`، `undefined`، و بولین‌ها) در آرایهٔ برگردانده‌شده حذف می‌شوند. **کلیدهای المان‌های برگردانده‌شده از کلیدهای المان‌های اصلی و سطح تودرتوی و موقعیت آن‌ها محاسبه می‌شود.** این تضمین می‌کند که تسطیح آرایه تغییراتی در رفتار معرفی نمی‌کند.

---

## کاربرد {/*usage*/}

### تبدیل فرزندان {/*transforming-children*/}

برای تبدیل JSX فرزندانی که کامپوننت شما [به‌عنوان پراپ `children` دریافت می‌کند](/learn/passing-props-to-a-component#passing-jsx-as-children)، `Children.map` را فراخوانی کنید:

```js {6,10}
import { Children } from 'react';

function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

در مثال بالا، `RowList` هر فرزندی که دریافت می‌کند را در یک ظرف `<div className="Row">` می‌پیچد. مثلاً فرض کنید کامپوننت والد سه تگ `<p>` را به‌عنوان پراپ `children` به `RowList` ارسال می‌کند:

```js
<RowList>
  <p>This is the first item.</p>
  <p>This is the second item.</p>
  <p>This is the third item.</p>
</RowList>
```

سپس، با پیاده‌سازی `RowList` در بالا، نتیجهٔ نهایی رندرشده به این شکل خواهد بود:

```js
<div className="RowList">
  <div className="Row">
    <p>This is the first item.</p>
  </div>
  <div className="Row">
    <p>This is the second item.</p>
  </div>
  <div className="Row">
    <p>This is the third item.</p>
  </div>
</div>
```

`Children.map` شبیه به [تبدیل آرایه‌ها با `map()`](/learn/rendering-lists) است. تفاوت این است که ساختار دادهٔ `children` *مات* در نظر گرفته می‌شود. این بدان معناست که حتی اگر گاهی یک آرایه باشد، نباید فرض کنید یک آرایه یا هر نوع دادهٔ خاص دیگری است. به همین دلیل است که اگر نیاز به تبدیل آن دارید باید از `Children.map` استفاده کنید.

<Sandpack>

```js
import RowList from './RowList.js';

export default function App() {
  return (
    <RowList>
      <p>This is the first item.</p>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </RowList>
  );
}
```

```js src/RowList.js active
import { Children } from 'react';

export default function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

<DeepDive>

#### چرا پراپ children همیشه یک آرایه نیست؟ {/*why-is-the-children-prop-not-always-an-array*/}

در ری‌اکت، پراپ `children` یک ساختار دادهٔ *مات* در نظر گرفته می‌شود. این بدان معناست که نباید به نحوهٔ ساختار آن تکیه کنید. برای تبدیل، فیلتر، یا شمارش فرزندان، باید از متدهای `Children` استفاده کنید.

در عمل، ساختار دادهٔ `children` اغلب به‌صورت داخلی به‌عنوان یک آرایه نمایش داده می‌شود. با این حال، اگر فقط یک فرزند وجود داشته باشد، ری‌اکت یک آرایهٔ اضافی ایجاد نمی‌کند زیرا این کار منجر به سربار حافظهٔ غیرضروری می‌شود. تا زمانی که از متدهای `Children` به جای introspect مستقیم پراپ `children` استفاده می‌کنید، کد شما حتی اگر ری‌اکت نحوهٔ پیاده‌سازی واقعی ساختار داده را تغییر دهد، خراب نخواهد شد.

حتی وقتی `children` یک آرایه است، `Children.map` رفتار خاص مفیدی دارد. مثلاً `Children.map` [کلیدها](/learn/rendering-lists#keeping-list-items-in-order-with-key) روی المان‌های برگردانده‌شده را با کلیدهای روی `children`‌ای که به آن ارسال کرده‌اید ترکیب می‌کند. این تضمین می‌کند که فرزندان JSX اصلی حتی اگر مانند مثال بالا پیچیده شوند، کلیدهای خود را «از دست نمی‌دهند».

</DeepDive>

<Pitfall>

ساختار دادهٔ `children` **شامل خروجی رندرشدهٔ کامپوننت‌هایی که به‌عنوان JSX ارسال می‌کنید نمی‌شود.** در مثال زیر، `children` دریافت‌شده توسط `RowList` فقط شامل دو آیتم است نه سه:

1. `<p>This is the first item.</p>`
2. `<MoreRows />`

به همین دلیل در این مثال فقط دو پوشش ردیف تولید می‌شود:

<Sandpack>

```js
import RowList from './RowList.js';

export default function App() {
  return (
    <RowList>
      <p>This is the first item.</p>
      <MoreRows />
    </RowList>
  );
}

function MoreRows() {
  return (
    <>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </>
  );
}
```

```js src/RowList.js
import { Children } from 'react';

export default function RowList({ children }) {
  return (
    <div className="RowList">
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

**هیچ راهی برای گرفتن خروجی رندرشدهٔ یک کامپوننت داخلی** مانند `<MoreRows />` هنگام دستکاری `children` وجود ندارد. به همین دلیل [معمولاً بهتر است از یکی از راه‌حل‌های جایگزین استفاده کنید.](#alternatives)

</Pitfall>

---

### اجرای کدی برای هر فرزند {/*running-some-code-for-each-child*/}

برای پیمایش هر فرزند در ساختار دادهٔ `children`، `Children.forEach` را فراخوانی کنید. این متد هیچ مقداری برنمی‌گرداند و مشابه [متد `forEach` آرایه](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) است. می‌توانید از آن برای اجرای منطق سفارشی مانند ساخت آرایهٔ خودتان استفاده کنید.

<Sandpack>

```js
import SeparatorList from './SeparatorList.js';

export default function App() {
  return (
    <SeparatorList>
      <p>This is the first item.</p>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </SeparatorList>
  );
}
```

```js src/SeparatorList.js active
import { Children } from 'react';

export default function SeparatorList({ children }) {
  const result = [];
  Children.forEach(children, (child, index) => {
    result.push(child);
    result.push(<hr key={index} />);
  });
  result.pop(); // Remove the last separator
  return result;
}
```

</Sandpack>

<Pitfall>

همان‌طور که قبلاً ذکر شد، هیچ راهی برای گرفتن خروجی رندرشدهٔ یک کامپوننت داخلی هنگام دستکاری `children` وجود ندارد. به همین دلیل [معمولاً بهتر است از یکی از راه‌حل‌های جایگزین استفاده کنید.](#alternatives)

</Pitfall>

---

### شمارش فرزندان {/*counting-children*/}

برای محاسبهٔ تعداد فرزندان، `Children.count(children)` را فراخوانی کنید.

<Sandpack>

```js
import RowList from './RowList.js';

export default function App() {
  return (
    <RowList>
      <p>This is the first item.</p>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </RowList>
  );
}
```

```js src/RowList.js active
import { Children } from 'react';

export default function RowList({ children }) {
  return (
    <div className="RowList">
      <h1 className="RowListHeader">
        Total rows: {Children.count(children)}
      </h1>
      {Children.map(children, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.RowListHeader {
  padding-top: 5px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

<Pitfall>

همان‌طور که قبلاً ذکر شد، هیچ راهی برای گرفتن خروجی رندرشدهٔ یک کامپوننت داخلی هنگام دستکاری `children` وجود ندارد. به همین دلیل [معمولاً بهتر است از یکی از راه‌حل‌های جایگزین استفاده کنید.](#alternatives)

</Pitfall>

---

### تبدیل فرزندان به یک آرایه {/*converting-children-to-an-array*/}

برای تبدیل ساختار دادهٔ `children` به یک آرایهٔ معمولی جاوااسکریپت، `Children.toArray(children)` را فراخوانی کنید. این به شما اجازه می‌دهد آرایه را با متدهای آرایهٔ داخلی مانند [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)، [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)، یا [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) دستکاری کنید.

<Sandpack>

```js
import ReversedList from './ReversedList.js';

export default function App() {
  return (
    <ReversedList>
      <p>This is the first item.</p>
      <p>This is the second item.</p>
      <p>This is the third item.</p>
    </ReversedList>
  );
}
```

```js src/ReversedList.js active
import { Children } from 'react';

export default function ReversedList({ children }) {
  const result = Children.toArray(children);
  result.reverse();
  return result;
}
```

</Sandpack>

<Pitfall>

همان‌طور که قبلاً ذکر شد، هیچ راهی برای گرفتن خروجی رندرشدهٔ یک کامپوننت داخلی هنگام دستکاری `children` وجود ندارد. به همین دلیل [معمولاً بهتر است از یکی از راه‌حل‌های جایگزین استفاده کنید.](#alternatives)

</Pitfall>

---

## جایگزین‌ها {/*alternatives*/}

<Note>

این بخش جایگزین‌های API `Children` (با C بزرگ) را توصیف می‌کند که به این شکل ایمپورت می‌شود:

```js
import { Children } from 'react';
```

آن را با [استفاده از پراپ `children`](/learn/passing-props-to-a-component#passing-jsx-as-children) (c کوچک) که خوب و تشویق‌شده است، اشتباه نگیرید.

</Note>

### در معرض قرار دادن چندین کامپوننت {/*exposing-multiple-components*/}

دستکاری فرزندان با متدهای `Children` اغلب منجر به کد شکننده می‌شود. وقتی فرزندانی را به یک کامپوننت در JSX ارسال می‌کنید، معمولاً انتظار ندارید کامپوننت فرزندان منفرد را دستکاری یا تبدیل کند.

وقتی می‌توانید، سعی کنید از استفادهٔ متدهای `Children` اجتناب کنید. مثلاً اگر می‌خواهید هر فرزند `RowList` در `<div className="Row">` پیچیده شود، یک کامپوننت `Row` صادر کنید، و هر ردیف را به‌صورت دستی مانند زیر در آن بپیچید:

<Sandpack>

```js
import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList>
      <Row>
        <p>This is the first item.</p>
      </Row>
      <Row>
        <p>This is the second item.</p>
      </Row>
      <Row>
        <p>This is the third item.</p>
      </Row>
    </RowList>
  );
}
```

```js src/RowList.js
export function RowList({ children }) {
  return (
    <div className="RowList">
      {children}
    </div>
  );
}

export function Row({ children }) {
  return (
    <div className="Row">
      {children}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

برخلاف استفاده از `Children.map`، این رویکرد هر فرزند را به‌طور خودکار نمی‌پیچد. **با این حال، این رویکرد در مقایسه با [مثال قبلی با `Children.map`](#transforming-children) مزیت قابل توجهی دارد زیرا حتی اگر به استخراج کامپوننت‌های بیشتری ادامه دهید کار می‌کند.** مثلاً اگر کامپوننت `MoreRows` خود را استخراج کنید، همچنان کار می‌کند:

<Sandpack>

```js
import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList>
      <Row>
        <p>This is the first item.</p>
      </Row>
      <MoreRows />
    </RowList>
  );
}

function MoreRows() {
  return (
    <>
      <Row>
        <p>This is the second item.</p>
      </Row>
      <Row>
        <p>This is the third item.</p>
      </Row>
    </>
  );
}
```

```js src/RowList.js
export function RowList({ children }) {
  return (
    <div className="RowList">
      {children}
    </div>
  );
}

export function Row({ children }) {
  return (
    <div className="Row">
      {children}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

این با `Children.map` کار نمی‌کرد زیرا `<MoreRows />` را به‌عنوان یک فرزند منفرد (و یک ردیف منفرد) «می‌دید».

---

### پذیرش یک آرایه از اشیاء به‌عنوان پراپ {/*accepting-an-array-of-objects-as-a-prop*/}

همچنین می‌توانید به‌طور صریح یک آرایه را به‌عنوان پراپ ارسال کنید. مثلاً این `RowList` یک آرایه `rows` را به‌عنوان پراپ می‌پذیرد:

<Sandpack>

```js
import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList rows={[
      { id: 'first', content: <p>This is the first item.</p> },
      { id: 'second', content: <p>This is the second item.</p> },
      { id: 'third', content: <p>This is the third item.</p> }
    ]} />
  );
}
```

```js src/RowList.js
export function RowList({ rows }) {
  return (
    <div className="RowList">
      {rows.map(row => (
        <div className="Row" key={row.id}>
          {row.content}
        </div>
      ))}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}
```

</Sandpack>

از آنجا که `rows` یک آرایهٔ معمولی جاوااسکریپت است، کامپوننت `RowList` می‌تواند از متدهای آرایهٔ داخلی مانند [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) روی آن استفاده کند.

این الگو به‌ویژه زمانی مفید است که می‌خواهید بتوانید اطلاعات بیشتری را به‌عنوان داده‌های ساختاریافته همراه با فرزندان ارسال کنید. در مثال زیر، کامپوننت `TabSwitcher` یک آرایه از اشیاء را به‌عنوان پراپ `tabs` دریافت می‌کند:

<Sandpack>

```js
import TabSwitcher from './TabSwitcher.js';

export default function App() {
  return (
    <TabSwitcher tabs={[
      {
        id: 'first',
        header: 'First',
        content: <p>This is the first item.</p>
      },
      {
        id: 'second',
        header: 'Second',
        content: <p>This is the second item.</p>
      },
      {
        id: 'third',
        header: 'Third',
        content: <p>This is the third item.</p>
      }
    ]} />
  );
}
```

```js src/TabSwitcher.js
import { useState } from 'react';

export default function TabSwitcher({ tabs }) {
  const [selectedId, setSelectedId] = useState(tabs[0].id);
  const selectedTab = tabs.find(tab => tab.id === selectedId);
  return (
    <>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setSelectedId(tab.id)}
        >
          {tab.header}
        </button>
      ))}
      <hr />
      <div key={selectedId}>
        <h3>{selectedTab.header}</h3>
        {selectedTab.content}
      </div>
    </>
  );
}
```

</Sandpack>

برخلاف ارسال فرزندان به‌عنوان JSX، این رویکرد به شما اجازه می‌دهد برخی داده‌های اضافی مانند `header` را با هر آیتم مرتبط کنید. از آنجا که در حال کار با `tabs` به‌طور مستقیم هستید، و آن یک آرایه است، نیازی به متدهای `Children` ندارید.

---

### فراخوانی یک render prop برای سفارشی‌سازی رندر {/*calling-a-render-prop-to-customize-rendering*/}

به جای تولید JSX برای هر آیتم منفرد، می‌توانید تابعی را ارسال کنید که JSX برمی‌گرداند، و آن تابع را در صورت لزوم فراخوانی کنید. در این مثال، کامپوننت `App` یک تابع `renderContent` را به کامپوننت `TabSwitcher` ارسال می‌کند. کامپوننت `TabSwitcher`، `renderContent` را فقط برای تب انتخاب‌شده فراخوانی می‌کند:

<Sandpack>

```js
import TabSwitcher from './TabSwitcher.js';

export default function App() {
  return (
    <TabSwitcher
      tabIds={['first', 'second', 'third']}
      getHeader={tabId => {
        return tabId[0].toUpperCase() + tabId.slice(1);
      }}
      renderContent={tabId => {
        return <p>This is the {tabId} item.</p>;
      }}
    />
  );
}
```

```js src/TabSwitcher.js
import { useState } from 'react';

export default function TabSwitcher({ tabIds, getHeader, renderContent }) {
  const [selectedId, setSelectedId] = useState(tabIds[0]);
  return (
    <>
      {tabIds.map((tabId) => (
        <button
          key={tabId}
          onClick={() => setSelectedId(tabId)}
        >
          {getHeader(tabId)}
        </button>
      ))}
      <hr />
      <div key={selectedId}>
        <h3>{getHeader(selectedId)}</h3>
        {renderContent(selectedId)}
      </div>
    </>
  );
}
```

</Sandpack>

یک پراپ مانند `renderContent` یک *render prop* نامیده می‌شود زیرا یک پراپ است که نحوهٔ رندر یک قطعه از رابط کاربری را مشخص می‌کند. با این حال، هیچ چیز خاصی دربارهٔ آن نیست: این یک پراپ معمولی است که اتفاقاً یک تابع است.

render propها توابع هستند، بنابراین می‌توانید اطلاعات را به آن‌ها ارسال کنید. مثلاً این کامپوننت `RowList`، `id` و `index` هر ردیف را به render prop‌ با نام `renderRow` ارسال می‌کند، که از `index` برای برجسته کردن ردیف‌های زوج استفاده می‌کند:

<Sandpack>

```js
import { RowList, Row } from './RowList.js';

export default function App() {
  return (
    <RowList
      rowIds={['first', 'second', 'third']}
      renderRow={(id, index) => {
        return (
          <Row isHighlighted={index % 2 === 0}>
            <p>This is the {id} item.</p>
          </Row> 
        );
      }}
    />
  );
}
```

```js src/RowList.js
import { Fragment } from 'react';

export function RowList({ rowIds, renderRow }) {
  return (
    <div className="RowList">
      <h1 className="RowListHeader">
        Total rows: {rowIds.length}
      </h1>
      {rowIds.map((rowId, index) =>
        <Fragment key={rowId}>
          {renderRow(rowId, index)}
        </Fragment>
      )}
    </div>
  );
}

export function Row({ children, isHighlighted }) {
  return (
    <div className={[
      'Row',
      isHighlighted ? 'RowHighlighted' : ''
    ].join(' ')}>
      {children}
    </div>
  );
}
```

```css
.RowList {
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 5px;
}

.RowListHeader {
  padding-top: 5px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
}

.Row {
  border: 2px dashed black;
  padding: 5px;
  margin: 5px;
}

.RowHighlighted {
  background: #ffa;
}
```

</Sandpack>

این مثال دیگری از نحوهٔ همکاری کامپوننت‌های والد و فرزند بدون دستکاری فرزندان است.

---

## رفع اشکال {/*troubleshooting*/}

### من یک کامپوننت سفارشی ارسال می‌کنم، اما متدهای `Children` نتیجهٔ رندر آن را نشان نمی‌دهند {/*i-pass-a-custom-component-but-the-children-methods-dont-show-its-render-result*/}

فرض کنید دو فرزند را مانند این به `RowList` ارسال می‌کنید:

```js
<RowList>
  <p>First item</p>
  <MoreRows />
</RowList>
```

اگر `Children.count(children)` را درون `RowList` انجام دهید، `2` دریافت می‌کنید. حتی اگر `MoreRows` 10 آیتم متفاوت رندر کند، یا اگر `null` برگرداند، `Children.count(children)` همچنان `2` خواهد بود. از دیدگاه `RowList`، فقط JSX‌ای را که دریافت کرده «می‌بیند». داخل کامپوننت `MoreRows` را «نمی‌بیند».

این محدودیت استخراج یک کامپوننت را دشوار می‌کند. به همین دلیل [جایگزین‌ها](#alternatives) به استفاده از `Children` ترجیح داده می‌شوند.
