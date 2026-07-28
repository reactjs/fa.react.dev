---
title: cloneElement
---

<Pitfall>

استفاده از `cloneElement` رایج نیست و می‌تواند منجر به کد شکننده شود. [جایگزین‌های رایج را ببینید.](#alternatives)

</Pitfall>

<Intro>

`cloneElement` به شما اجازه می‌دهد یک المان جدید ری‌اکت را با استفاده از المان دیگری به‌عنوان نقطهٔ شروع ایجاد کنید.

```js
const clonedElement = cloneElement(element, props, ...children)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `cloneElement(element, props, ...children)` {/*cloneelement*/}

برای ایجاد یک المان ری‌اکت بر اساس `element`، اما با `props` و `children` متفاوت، `cloneElement` را فراخوانی کنید:

```js
import { cloneElement } from 'react';

// ...
const clonedElement = cloneElement(
  <Row title="Cabbage">
    Hello
  </Row>,
  { isHighlighted: true },
  'Goodbye'
);

console.log(clonedElement); // <Row title="Cabbage" isHighlighted={true}>Goodbye</Row>
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `element`: آرگومان `element` باید یک المان معتبر ری‌اکت باشد. برای مثال، می‌تواند یک نود JSX مانند `<Something />`، نتیجهٔ فراخوانی [`createElement`](/reference/react/createElement)، یا نتیجهٔ یک فراخوانی دیگر `cloneElement` باشد.

* `props`: آرگومان `props` باید یا یک شیء باشد یا `null`. اگر `null` پاس بدهید، المان شبیه‌سازی‌شده همهٔ `element.props` اصلی را نگه می‌دارد. در غیر این صورت، برای هر پراپ در شیء `props`، المان بازگشتی مقدار از `props` را بر مقدار از `element.props` «ترجیح» خواهد داد. سایر پراپس‌ها از `element.props` اصلی پر خواهند شد. اگر `props.key` یا `props.ref` را پاس بدهید، آن‌ها جایگزین موارد اصلی خواهند شد.

* **اختیاری** `...children`: صفر یا چند نود فرزند. آن‌ها می‌توانند هر نود ری‌اکتی باشند، شامل المان‌های ری‌اکت، رشته‌ها، اعداد، [پورتال‌ها](/reference/react-dom/createPortal)، نودهای خالی (`null`، `undefined`، `true`، و `false`)، و آرایه‌هایی از نودهای ری‌اکت. اگر هیچ آرگومان `...children`ای پاس ندهید، `element.props.children` اصلی نگه داشته می‌شود.

#### مقادیر بازگشتی {/*returns*/}

`cloneElement` یک شیء المان ری‌اکت با چند پراپرتی برمی‌گرداند:

* `type`: همان `element.type`.
* `props`: نتیجهٔ ادغام سطحی `element.props` با پراپس‌های نادیده‌گیرنده‌ای که پاس داده‌اید.
* `ref`: `element.ref` اصلی، مگر آنکه توسط `props.ref` نادیده گرفته شده باشد.
* `key`: `element.key` اصلی، مگر آنکه توسط `props.key` نادیده گرفته شده باشد.

معمولاً شما المان را از کامپوننت خود برمی‌گردانید یا آن را به‌عنوان فرزند المان دیگری قرار می‌دهید. اگرچه ممکن است پراپرتی‌های المان را بخوانید، اما بهتر است پس از ایجاد هر المان را به‌صورت مبهم (opaque) در نظر بگیرید و فقط آن را رندر کنید.

#### موارد احتیاط {/*caveats*/}

* شبیه‌سازی یک المان **المان اصلی را تغییر نمی‌دهد.**

* فقط باید **فرزندان را به‌عنوان آرگومان‌های متعدد به `cloneElement` پاس بدهید اگر همگی به‌صورت ایستا شناخته‌شده باشند**، مانند `cloneElement(element, null, child1, child2, child3)`. اگر فرزندان شما پویا هستند، کل آرایه را به‌عنوان آرگومان سوم پاس بدهید: `cloneElement(element, null, listItems)`. این تضمین می‌کند که ری‌اکت در مورد [`key`های گمشده](/learn/rendering-lists#keeping-list-items-in-order-with-key) برای هر لیست پویا به شما هشدار می‌دهد. برای لیست‌های ایستا این ضروری نیست زیرا هرگز ترتیبشان تغییر نمی‌کند.

* `cloneElement` ردیابی جریان داده را سخت‌تر می‌کند، بنابراین **در عوض [جایگزین‌ها](#alternatives) را امتحان کنید.**

---

## استفاده {/*usage*/}

### نادیده‌گرفتن پراپس‌های یک المان {/*overriding-props-of-an-element*/}

برای نادیده‌گرفتن پراپس‌های یک <CodeStep step={1}>المان ری‌اکت</CodeStep>، آن را با <CodeStep step={2}>پراپس‌هایی که می‌خواهید نادیده بگیرید</CodeStep> به `cloneElement` پاس بدهید:

```js [[1, 5, "<Row title=\\"Cabbage\\" />"], [2, 6, "{ isHighlighted: true }"], [3, 4, "clonedElement"]]
import { cloneElement } from 'react';

// ...
const clonedElement = cloneElement(
  <Row title="Cabbage" />,
  { isHighlighted: true }
);
```

در اینجا، <CodeStep step={3}>المان شبیه‌سازی‌شده</CodeStep> نهایی `<Row title="Cabbage" isHighlighted={true} />` خواهد بود.

**بیایید با یک مثال ببینیم چه زمانی مفید است.**

یک کامپوننت `List` را تصور کنید که [`children`](/learn/passing-props-to-a-component#passing-jsx-as-children) خود را به‌عنوان یک لیست از ردیف‌های قابل‌انتخاب با یک دکمهٔ «Next» که تغییر می‌دهد کدام ردیف انتخاب شده، رندر می‌کند. کامپوننت `List` نیاز دارد `Row` انتخاب‌شده را متفاوت رندر کند، بنابراین هر فرزند `<Row>` که دریافت کرده را شبیه‌سازی می‌کند و یک پراپ اضافی `isHighlighted: true` یا `isHighlighted: false` اضافه می‌کند:

```js {6-8}
export default function List({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isHighlighted: index === selectedIndex 
        })
      )}
```

فرض کنید JSX اصلی که توسط `List` دریافت شده به این شکل باشد:

```js {2-4}
<List>
  <Row title="Cabbage" />
  <Row title="Garlic" />
  <Row title="Apple" />
</List>
```

با شبیه‌سازی فرزندانش، `List` می‌تواند اطلاعات اضافی به هر `Row` درونش پاس بدهد. نتیجه به این شکل است:

```js {4,8,12}
<List>
  <Row
    title="Cabbage"
    isHighlighted={true} 
  />
  <Row
    title="Garlic"
    isHighlighted={false} 
  />
  <Row
    title="Apple"
    isHighlighted={false} 
  />
</List>
```

توجه کنید که چگونه فشردن «Next» استیت `List` را به‌روزرسانی می‌کند و یک ردیف متفاوت را هایلایت می‌کند:

<Sandpack>

```js
import List from './List.js';
import Row from './Row.js';
import { products } from './data.js';

export default function App() {
  return (
    <List>
      {products.map(product =>
        <Row
          key={product.id}
          title={product.title} 
        />
      )}
    </List>
  );
}
```

```js src/List.js active
import { Children, cloneElement, useState } from 'react';

export default function List({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isHighlighted: index === selectedIndex 
        })
      )}
      <hr />
      <button onClick={() => {
        setSelectedIndex(i =>
          (i + 1) % Children.count(children)
        );
      }}>
        Next
      </button>
    </div>
  );
}
```

```js src/Row.js
export default function Row({ title, isHighlighted }) {
  return (
    <div className={[
      'Row',
      isHighlighted ? 'RowHighlighted' : ''
    ].join(' ')}>
      {title}
    </div>
  );
}
```

```js src/data.js
export const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

```css
.List {
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

.RowHighlighted {
  background: #ffa;
}

button {
  height: 40px;
  font-size: 20px;
}
```

</Sandpack>

به‌طور خلاصه، `List` المان‌های `<Row />` که دریافت کرده بود را شبیه‌سازی کرد و یک پراپ اضافی به آن‌ها اضافه کرد.

<Pitfall>

شبیه‌سازی فرزندان تشخیص نحوهٔ جریان داده در اپلیکیشن شما را سخت می‌کند. یکی از [جایگزین‌ها](#alternatives) را امتحان کنید.

</Pitfall>

---

## جایگزین‌ها {/*alternatives*/}

### پاس‌دادن داده با یک render prop {/*passing-data-with-a-render-prop*/}

به‌جای استفاده از `cloneElement`، در نظر بگیرید یک *render prop* مانند `renderItem` را بپذیرید. در اینجا، `List` پراپ `renderItem` را دریافت می‌کند. `List` برای هر آیتم `renderItem` را فراخوانی می‌کند و `isHighlighted` را به‌عنوان آرگومان پاس می‌دهد:

```js {1,7}
export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
```

پراپ `renderItem` یک «render prop» نامیده می‌شود زیرا یک پراپ است که نحوهٔ رندر چیزی را تعیین می‌کند. برای مثال، می‌توانید یک پیاده‌سازی `renderItem` پاس بدهید که یک `<Row>` با مقدار `isHighlighted` داده‌شده رندر می‌کند:

```js {3,7}
<List
  items={products}
  renderItem={(product, isHighlighted) =>
    <Row
      key={product.id}
      title={product.title}
      isHighlighted={isHighlighted}
    />
  }
/>
```

نتیجهٔ نهایی همانند `cloneElement` است:

```js {4,8,12}
<List>
  <Row
    title="Cabbage"
    isHighlighted={true} 
  />
  <Row
    title="Garlic"
    isHighlighted={false} 
  />
  <Row
    title="Apple"
    isHighlighted={false} 
  />
</List>
```

با این حال، به‌وضوح می‌توانید ردیابی کنید که مقدار `isHighlighted` از کجا می‌آید.

<Sandpack>

```js
import List from './List.js';
import Row from './Row.js';
import { products } from './data.js';

export default function App() {
  return (
    <List
      items={products}
      renderItem={(product, isHighlighted) =>
        <Row
          key={product.id}
          title={product.title}
          isHighlighted={isHighlighted}
        />
      }
    />
  );
}
```

```js src/List.js active
import { useState } from 'react';

export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
      <hr />
      <button onClick={() => {
        setSelectedIndex(i =>
          (i + 1) % items.length
        );
      }}>
        Next
      </button>
    </div>
  );
}
```

```js src/Row.js
export default function Row({ title, isHighlighted }) {
  return (
    <div className={[
      'Row',
      isHighlighted ? 'RowHighlighted' : ''
    ].join(' ')}>
      {title}
    </div>
  );
}
```

```js src/data.js
export const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

```css
.List {
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

.RowHighlighted {
  background: #ffa;
}

button {
  height: 40px;
  font-size: 20px;
}
```

</Sandpack>

این الگو بر `cloneElement` ترجیح داده می‌شود زیرا صریح‌تر است.

---

### پاس‌دادن داده از طریق کانتکست {/*passing-data-through-context*/}

یک جایگزین دیگر برای `cloneElement`، [پاس‌دادن داده از طریق کانتکست](/learn/passing-data-deeply-with-context) است.


برای مثال، می‌توانید [`createContext`](/reference/react/createContext) را فراخوانی کنید تا یک `HighlightContext` تعریف کنید:

```js
export const HighlightContext = createContext(false);
```

کامپوننت `List` شما می‌تواند هر آیتمی که رندر می‌کند را در یک پروایدر `HighlightContext` بپیچد:

```js {8,10}
export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return (
          <HighlightContext key={item.id} value={isHighlighted}>
            {renderItem(item)}
          </HighlightContext>
        );
      })}
```

با این رویکرد، `Row` اصلاً نیازی به دریافت پراپ `isHighlighted` ندارد. در عوض، کانتکست را می‌خواند:

```js src/Row.js {2}
export default function Row({ title }) {
  const isHighlighted = useContext(HighlightContext);
  // ...
```

این به کامپوننت فراخوان اجازه می‌دهد بدون دانستن یا نگرانی دربارهٔ پاس‌دادن `isHighlighted` به `<Row>` عمل کند:

```js {4}
<List
  items={products}
  renderItem={product =>
    <Row title={product.title} />
  }
/>
```

در عوض، `List` و `Row` منطق هایلایت‌کردن را از طریق کانتکست هماهنگ می‌کنند.

<Sandpack>

```js
import List from './List.js';
import Row from './Row.js';
import { products } from './data.js';

export default function App() {
  return (
    <List
      items={products}
      renderItem={(product) =>
        <Row title={product.title} />
      }
    />
  );
}
```

```js src/List.js active
import { useState } from 'react';
import { HighlightContext } from './HighlightContext.js';

export default function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return (
          <HighlightContext
            key={item.id}
            value={isHighlighted}
          >
            {renderItem(item)}
          </HighlightContext>
        );
      })}
      <hr />
      <button onClick={() => {
        setSelectedIndex(i =>
          (i + 1) % items.length
        );
      }}>
        Next
      </button>
    </div>
  );
}
```

```js src/Row.js
import { useContext } from 'react';
import { HighlightContext } from './HighlightContext.js';

export default function Row({ title }) {
  const isHighlighted = useContext(HighlightContext);
  return (
    <div className={[
      'Row',
      isHighlighted ? 'RowHighlighted' : ''
    ].join(' ')}>
      {title}
    </div>
  );
}
```

```js src/HighlightContext.js
import { createContext } from 'react';

export const HighlightContext = createContext(false);
```

```js src/data.js
export const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

```css
.List {
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

.RowHighlighted {
  background: #ffa;
}

button {
  height: 40px;
  font-size: 20px;
}
```

</Sandpack>

[دربارهٔ پاس‌دادن داده از طریق کانتکست بیشتر بدانید.](/reference/react/useContext#passing-data-deeply-into-the-tree)

---

### استخراج منطق به یک هوک سفارشی {/*extracting-logic-into-a-custom-hook*/}

یک رویکرد دیگر که می‌توانید امتحان کنید این است که منطق «غیربصری» را به هوک خودتان استخراج کنید، و از اطلاعات بازگشتی از هوک خود برای تصمیم‌گیری دربارهٔ نحوهٔ رندر استفاده کنید. برای مثال، می‌توانید یک هوک سفارشی `useList` مانند این بنویسید:

```js
import { useState } from 'react';

export default function useList(items) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function onNext() {
    setSelectedIndex(i =>
      (i + 1) % items.length
    );
  }

  const selected = items[selectedIndex];
  return [selected, onNext];
}
```

سپس می‌توانید مانند این از آن استفاده کنید:

```js {2,9,13}
export default function App() {
  const [selected, onNext] = useList(products);
  return (
    <div className="List">
      {products.map(product =>
        <Row
          key={product.id}
          title={product.title}
          isHighlighted={selected === product}
        />
      )}
      <hr />
      <button onClick={onNext}>
        Next
      </button>
    </div>
  );
}
```

جریان داده صریح است، اما استیت درون هوک سفارشی `useList` است که می‌توانید از هر کامپوننتی از آن استفاده کنید:

<Sandpack>

```js
import Row from './Row.js';
import useList from './useList.js';
import { products } from './data.js';

export default function App() {
  const [selected, onNext] = useList(products);
  return (
    <div className="List">
      {products.map(product =>
        <Row
          key={product.id}
          title={product.title}
          isHighlighted={selected === product}
        />
      )}
      <hr />
      <button onClick={onNext}>
        Next
      </button>
    </div>
  );
}
```

```js src/useList.js
import { useState } from 'react';

export default function useList(items) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  function onNext() {
    setSelectedIndex(i =>
      (i + 1) % items.length
    );
  }

  const selected = items[selectedIndex];
  return [selected, onNext];
}
```

```js src/Row.js
export default function Row({ title, isHighlighted }) {
  return (
    <div className={[
      'Row',
      isHighlighted ? 'RowHighlighted' : ''
    ].join(' ')}>
      {title}
    </div>
  );
}
```

```js src/data.js
export const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

```css
.List {
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

.RowHighlighted {
  background: #ffa;
}

button {
  height: 40px;
  font-size: 20px;
}
```

</Sandpack>

این رویکرد به‌ویژه اگر بخواهید این منطق را میان کامپوننت‌های مختلف استفاده مجدد کنید، مفید است.
