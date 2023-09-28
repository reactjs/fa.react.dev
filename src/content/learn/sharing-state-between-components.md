---
title: بین کامپوننت‌ها state  به اشتراک گذاشتن
---

<Intro>

گاهی اوقات، شما میخواهید که state دو کامپوننت همیشه با هم تغییر کند. برای انجام این کار، state را از هر دو کامپوننت حذف کنید، آن را به نزدیکترین والد مشترک آنها منتقل کنید، و سپس آن را از طریق props به آنها منتقل کنید. این به عنوان بالا بردن state شناخته میشود، و این یکی از متداول ترین کارهایی است که شما در حین نوشتن کد ری‌اکت انجام خواهید داد.

</Intro>

<YouWillLearn>

- چگونه state را با بالا بردن آن بین کامپوننت‌ها به اشتراک بگذارید
- کامپوننت‌ های کنترل شده و کنترل نشده چیست

</YouWillLearn>



## بالا بردن state با مثال {/*lifting-state-up-by-example*/}

در این مثال یک کامپوننت والد `Accordion` دو کامپوننت جداگانه `Panel` را رندر میکند:


* `Accordion`
    - `Panel`
    - `Panel`

هر کامپوننت `Panel` یک `isActive` state دارد که مشخص میکند که آیا محتوای آن قابل مشاهده است یا خیر.

برای هر دو کامپوننت `Panel` دکمه Show را فشار دهید:

<Sandpack>

```js
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

توجه کنید که فشار دادن دکمه یکی از پنل‌ها بر روی پنل دیگر تاثیری ندارد--آنها مستقل هستند.

<DiagramGroup>

<Diagram name="sharing_state_child" height={367} width={477} alt="Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Both Panel components contain isActive with value false.">


در ابتدا، `isActive` state هر `Panel` برابر `false` است، بنابراین هر دو به صورت فشرده نمایش داده میشوند.

</Diagram>

<Diagram name="sharing_state_child_clicked" height={367} width={480} alt="The same diagram as the previous, with the isActive of the first child Panel component highlighted indicating a click with the isActive value set to true. The second Panel component still contains value false." >

کلیک کردن روی دکمه هر `Panel` فقط state `isActive` آن `Panel` را به روز میکند.

</Diagram>

</DiagramGroup>

**اما حالا فرض کنید که میخواهید فقط یک پنل در هر زمان باز شود.** در این طراحی، باز کردن پنل دوم باید پنل اول را ببندد. چگونه این کار را انجام میدهید؟

برای هماهنگ کردن این دو پنل، شما باید state آنها را به یک کامپوننت والد در سه مرحله "بالا ببرید":

1. **حذف** state از کامپوننت‌های فرزند.
2. **انتقال** داده‌های ثابت از والد مشترک.
3. **اضافه کردن** state به والد مشترک و انتقال آن همراه با event handlers.

این به کامپوننت `Accordion` اجازه میدهد که هر دو `Panel` را هماهنگ کند و فقط یکی را در هر زمان باز کند.

###   قدم ۱: حذف state از کامپوننت‌های فرزند {/*step-1-remove-state-from-the-child-components*/}

شما کنترل `isActive` را به کامپوننت والد `Panel` میدهید. این به این معنی است که کامپوننت والد `isActive` را به عنوان یک prop به `Panel` منتقل میکند. با **حذف این خط** از کامپوننت `Panel` شروع کنید:

```js
const [isActive, setIsActive] = useState(false);
```


و به جای آن، `isActive` را به لیست prop های `Panel` اضافه کنید:


```js
function Panel({ title, children, isActive }) {
```

حالا کامپوننت والد `Panel` میتواند `isActive` را با [انتقال آن به عنوان prop](/learn/passing-props-to-a-component) کنترل کند. متقابلا، کامپوننت `Panel` دیگر کنترلی بر روی مقدار `isActive` ندارد--حالا این کار به عهده کامپوننت والد است!

### قدم ۲: انتقال داده‌های ثابت از والد مشترک {/*step-2-pass-hardcoded-data-from-the-common-parent*/}


برای بالا بردن state، شما باید نزدیکترین کامپوننت والد مشترک میان دو کامپوننت فرزند که میخواهید آن ها را هماهنگ کنید، پیدا کنید:

* `Accordion` *(نزدیک ترین والد مشترک)*
    - `Panel`
    - `Panel`

در این مثال، این کامپوننت `Accordion` است. از آنجایی که این کامپوننت بالاتر از هر دو پنل قرار دارد و میتواند prop های آنها را کنترل کند، این کامپوننت منبع اصلی برای اینکه کدام پنل در حال حاضر فعال است میباشد. کامپوننت `Accordion` را طوری تغییر دهید که مقدار ثابت `isActive` را (به عنوان مثال، `true`) به هر دو پنل منتقل کند:

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

سعی کنید مقادیر `isActive` را در کامپوننت `Accordion` ویرایش کنید و نتیجه را در صفحه مشاهده کنید.

### قدم ۳: اضافه کردن state به والد مشترک {/*step-3-add-state-to-the-common-parent*/}

بالا بردن state معمولا طبیعت آنچه را که به عنوان state ذخیره میکنید تغییر میدهد.

در این مثال، فقط یک پنل در هر زمان باید فعال باشد. این به این معنی است که کامپوننت والد مشترک `Accordion` باید اینکه کدام پنل فعال است را پیگیری کند. به جای یک مقدار `boolean`، میتوانید از یک عدد به عنوان ایندکس پنل فعال برای متغیر state استفاده کنید:

```js
const [activeIndex, setActiveIndex] = useState(0);
```

هنگامی که `activeIndex` برابر `0` است، پنل اول فعال است، و هنگامی که برابر `1` است، پنل دوم فعال است.

کلیک کردن روی دکمه "Show" در هر `Panel` باید ایندکس فعال در `Accordion` را تغییر دهد. یک `Panel` نمیتواند state `activeIndex` را مستقیما تغییر دهد زیرا در داخل `Accordion` تعریف شده است. کامپوننت `Accordion` باید به صورت صریح به کامپوننت `Panel` اجازه دهد که state آن را تغییر دهد با [انتقال یک event handler به عنوان prop](/learn/responding-to-events#passing-event-handlers-as-props):

```js
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
```

`<button>` داخل `Panel` اکنون از `onShow` prop به عنوان event handler کلیک استفاده میکند:

<Sandpack>

```js
import { useState } from 'react';

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel
        title="About"
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
```

```css
h3, p { margin: 5px 0px; }
.panel {
  padding: 10px;
  border: 1px solid #aaa;
}
```

</Sandpack>

این بالا بردن state را کامل میکند! انتقال state به کامپوننت والد مشترک به شما اجازه داد که دو پنل را هماهنگ کنید. استفاده از ایندکس فعال به جای دو پرچم "نمایش داده شده" اطمینان حاصل میکند که تنها یک پنل در یک زمان فعال است. و انتقال event handler به کامپوننت فرزند به آن اجازه میدهد که state والد را تغییر دهد.



<DiagramGroup>

<Diagram name="sharing_state_parent" height={385} width={487} alt="Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Accordion contains an activeIndex value of zero which turns into isActive value of true passed to the first Panel, and isActive value of false passed to the second Panel." >

در ابتدا ، `Accordion` `activeIndex` برابر `0` است ، بنابراین `Panel` اول `isActive = true` را دریافت می کند


</Diagram>

<Diagram name="sharing_state_parent_clicked" height={385} width={521} alt="The same diagram as the previous, with the activeIndex value of the parent Accordion component highlighted indicating a click with the value changed to one. The flow to both of the children Panel components is also highlighted, and the isActive value passed to each child is set to the opposite: false for the first Panel and true for the second one." >

هنگامی که `Accordion` `activeIndex` state به `1` تغییر میکند، `Panel` دوم `isActive = true` را دریافت میکند

</Diagram>

</DiagramGroup>

<DeepDive>

#### کامپوننت‌های کنترل شده و کنترل نشده {/*controlled-and-uncontrolled-components*/}

به طور معمول، یک کامپوننت با چند state محلی "کنترل نشده" نامیده میشود. به عنوان مثال، کامپوننت اصلی `Panel` با یک متغیر state `isActive` کنترل نشده است زیرا والد آن نمیتواند تاثیری بر روی فعال بودن یا نبودن پنل داشته باشد.

متقابلا ، میتوانید بگویید که یک کامپوننت "کنترل شده" است زمانی که اطلاعات مهم در آن توسط prop ها و نه state محلی آن هدایت میشوند. این به کامپوننت والد اجازه میدهد که رفتار آن را به طور کامل مشخص کند. کامپوننت نهایی `Panel` با `isActive` prop توسط کامپوننت `Accordion` کنترل میشود.

استفاده از کامپوننت های کنترل نشده درون کامپوننت های والدشان آسان تر است زیرا نیاز به کانفیگ کمتری دارند. اما زمانی که میخواهید آنها را با هم هماهنگ کنید، کمتر از کامپوننت های کنترل شده انعطاف‌ پذیر هستند. کامپوننت های کنترل شده حداکثر انعطاف‌ پذیری را دارند، اما نیاز به کانفیگ کامل تری از طرف کامپوننت های والد با prop ها را دارند.

در عمل، "کنترل شده" و "کنترل نشده" اصطلاحات فنی دقیقی نیستند--هر کامپوننت معمولاً مجموعه ای از state محلی و prop ها را دارد. با این حال، این یک روش مفید برای صحبت در مورد نحوه طراحی کامپوننت ها و قابلیت هایی است که ارائه می دهند.

هنگام نوشتن یک کامپوننت، در نظر داشته باشید که اطلاعاتی که در آن باید کنترل شده باشد (از طریق prop ها) و اطلاعاتی که باید کنترل نشده باشد (از طریق state) چیست. اما همیشه میتوانید نظر خود را تغییر دهید و بعداً بازطراحی کنید.

</DeepDive>

## یک منبع اصلی برای هر state {/*a-single-source-of-truth-for-each-state*/}

در یک برنامه ری‌اکت، بسیاری از کامپوننت‌ها state مخصوص به خود را دارند. برخی از state ممکن است "زندگی" خود را نزدیک به کامپوننت‌های برگ (کامپوننت‌های در پایین درخت) مانند ورودی‌ها داشته باشند. دیگر state ها ممکن است "زندگی" خود را نزدیک به بالای برنامه داشته باشد. به عنوان مثال، حتی کتابخانه‌های مسیریابی سمت-کلاینت معمولا با ذخیره مسیر فعلی در state ری‌اکت پیاده‌سازی میشوند و از طریق prop ها به پایین منتقل میشوند!

**برای هر قطعه state منحصر به فرد، شما کامپوننتی که "مالک" آن است را انتخاب خواهید کرد.** این اصل همچنین به عنوان داشتن یک ["منبع اصلی برای هر state".](https://en.wikipedia.org/wiki/Single_source_of_truth) شناخته میشود. این به این معنی نیست که همه state در یک مکان زندگی میکنند--اما برای هر قطعه state، یک کامپوننت خاص وجود دارد که آن قطعه اطلاعات را نگه میدارد. به جای تکرار state های مشترک بین کامپوننت ها، آنها را به والد مشترک خود بالا ببرید، و آنها را به کامپوننت های فرزندی که نیاز به آنها دارند، منتقل کنید.

برنامه شما هنگام کار بر روی آن تغییر خواهد کرد. معمول است که در حین کار بر روی آن، state را به پایین یا به بالا ببرید در حالی که هنوز در حال یافتن مکان زندگی هر قطعه state هستید. این ها همه بخشی از فرایند است!

برای دیدن اینکه این در عمل با چند کامپوننت دیگر چگونه است، [Thinking in React](/learn/thinking-in-react) را بخوانید.

<Recap>

* وقتی میخواهید دو کامپوننت را هماهنگ کنید، state آنها را به والد مشترک آنها منتقل کنید.
* سپس اطلاعات را از طریق prop ها از والد مشترک به پایین منتقل کنید.
* در نهایت، event handler ها را به پایین منتقل کنید تا کامپوننت های فرزند بتوانند state والد را تغییر دهند.
* مفید است که کامپوننت ها را به عنوان "کنترل شده" (توسط prop ها) یا "کنترل نشده" (توسط state) در نظر بگیرید.


</Recap>

<Challenges>

####  ورودی های هماهنگ {/*synced-inputs*/}

این دو ورودی مستقل هستند. آنها را هماهنگ کنید: ویرایش یک ورودی باید ورودی دیگر را با همان متن به روز کند، و بالعکس.

<Hint>

شما باید state آنها را به درون والد بالا ببرید.
</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function SyncedInputs() {
  return (
    <>
      <Input label="First input" />
      <Input label="Second input" />
    </>
  );
}

function Input({ label }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label>
      {label}
      {' '}
      <input
        value={text}
        onChange={handleChange}
      />
    </label>
  );
}
```

```css
input { margin: 5px; }
label { display: block; }
```

</Sandpack>

<Solution>

state متغیر `text` را به کامپوننت والد همراه با `handleChange` handler منتقل کنید. سپس آنها را به عنوان prop به هر دو کامپوننت `Input` منتقل کنید. این کار باعث میشود آنها هماهنگ شوند.

<Sandpack>

```js
import { useState } from 'react';

export default function SyncedInputs() {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Input
        label="First input"
        value={text}
        onChange={handleChange}
      />
      <Input
        label="Second input"
        value={text}
        onChange={handleChange}
      />
    </>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      {label}
      {' '}
      <input
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
```

```css
input { margin: 5px; }
label { display: block; }
```

</Sandpack>

</Solution>

#### فیلتر کردن یک لیست {/*filtering-a-list*/}

در این مثال ، `SearchBar` دارای `query` state خود است که ورودی متن را کنترل می کند. والد آن کامپوننت `FilterableList` یک `List` از آیتم ها را نمایش می دهد ، اما `query` را در نظر نمی گیرد.

از تابع `filterItems(foods, query)` برای فیلتر کردن لیست بر اساس کوئری استفاده کنید. برای تست تغییرات خود، بازبینی کنید که نوشتن "s" در ورودی تایپ کنید لیست را به "Sushi" ، "Shish kebab" و "Dim sum" فیلتر میکند.

توجه کنید که تابع `filterItems` از قبل پیاده‌سازی و import شده است، بنابراین شما نیازی به نوشتن آن ندارید!

<Hint>

شما باید `query` state و `handleChange` handler را از `SearchBar` حذف کنید و آنها را به `FilterableList` منتقل کنید. سپس آنها را به عنوان `query` و `onChange` props به `SearchBar` منتقل کنید.

</Hint>

<Sandpack>

```js
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  return (
    <>
      <SearchBar />
      <hr />
      <List items={foods} />
    </>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={handleChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody>
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

```js data.js
export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: 'Sushi',
  description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
  id: 1,
  name: 'Dal',
  description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
  id: 2,
  name: 'Pierogi',
  description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
  id: 3,
  name: 'Shish kebab',
  description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
  id: 4,
  name: 'Dim sum',
  description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];
```

</Sandpack>

<Solution>

`query` state را به بالا ببرید و به `FilterableList` منتقل کنید. `filterItems(foods, query)` را برای گرفتن لیست فیلتر شده فراخوانی کنید و آن را به `List` منتقل کنید. حالا تغییر ورودی کوئری در لیست نمایش داده میشود:


<Sandpack>

```js
import { useState } from 'react';
import { foods, filterItems } from './data.js';

export default function FilterableList() {
  const [query, setQuery] = useState('');
  const results = filterItems(foods, query);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <SearchBar
        query={query}
        onChange={handleChange}
      />
      <hr />
      <List items={results} />
    </>
  );
}

function SearchBar({ query, onChange }) {
  return (
    <label>
      Search:{' '}
      <input
        value={query}
        onChange={onChange}
      />
    </label>
  );
}

function List({ items }) {
  return (
    <table>
      <tbody> 
        {items.map(food => (
          <tr key={food.id}>
            <td>{food.name}</td>
            <td>{food.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

```js data.js
export function filterItems(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export const foods = [{
  id: 0,
  name: 'Sushi',
  description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
  id: 1,
  name: 'Dal',
  description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
  id: 2,
  name: 'Pierogi',
  description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
  id: 3,
  name: 'Shish kebab',
  description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
  id: 4,
  name: 'Dim sum',
  description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];
```

</Sandpack>

</Solution>

</Challenges>
