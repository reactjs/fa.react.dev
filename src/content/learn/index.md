---
title: شروع سریع
---

<Intro>

<<<<<<< HEAD
 به داکیومنت ری‌اکت خوش‌امدید. این صفحه  به شما مقدمه‌ای  به ۸۰ درصد از مفاهیم ری‌اکت که روزانه استفاده می‌کنید ٬می‌دهد.
=======
Welcome to the React documentation! This page will give you an introduction to 80% of the React concepts that you will use on a daily basis.
>>>>>>> 6ae99dddc3b503233291da96e8fd4b118ed6d682

</Intro>

<YouWillLearn>

- چطور کامپوننت ها را درست کنید و نست کنید
- چطور مارکاپ و استایل اضافه کنید
- چطور دیتا را نمایش دهید
- چطور شروط و لیست ها را رندر کنید
- چطور به رویدادها پاسخ دهید و اسکرین را اپدیت کنید
- چطور دیتا را بین دو کامپوننت به اشتراک بگذارید

</YouWillLearn>

## ایجاد و نست کامپوننت‌ها {/*components*/}

برنامه‌های React از *مؤلفه‌ها* ساخته می‌شوند. یک مؤلفه قطعه‌ای از رابط کاربری (UI) است که منطق و ظاهر خود را دارد. یک مؤلفه می‌تواند به اندازه یک دکمه کوچک یا به اندازه یک صفحه کامل باشد.

کامپوننت‌های ری‌اکت توابع جاوااسکریپتی هستند که مارک‌اپ برمیگردانند

```js
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

`MyButton` را تعریف کرده اید٬ میتوانید آن را درون کامپوننت دیگری استفاده کنید.حالا که شما ‍

```js {5}
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

`<MyButton />` با حرف بزرگ شروع می‌شود. پس از این طریق می‌دانید که یک کامپوننت ری‌اکت است. کامپوننت‌های ری اکت همیشه باید با حروف بزرگ شروع شوند٬ درصورتی که تگ‌های اچ‌تی‌ام ال با حروف کوچک.توجه کنید که 

به نتیجه نگاه کنید:

<Sandpack>

```js
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

</Sandpack>

کلمات کلیدی `export default` مؤلفه اصلی در این فایل را مشخص می‌کنند. اگر با بخشی از دستورات جاوااسکریپت آشنا نیستید، [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) و [javascript.info](https://javascript.info/import-export) منابع عالی برای مراجعه هستند.

## نوشتن markup با JSX {/*writing-markup-with-jsx*/}

نحوهٔ نشانه‌گذاری کدی که در بالا دیده‌اید، *JSX* نام دارد. استفاده از آن اختیاری است، اما بیشتر پروژه‌های React به دلیل راحتی‌اش از JSX استفاده می‌کنند. تمامی [ابزارهایی که ما برای توسعه محلی توصیه می‌کنیم](/learn/installation) از ابتدا JSX را پشتیبانی می‌کنند.

JSX سخت‌گیرانه‌تر از HTML است. شما باید تگ‌ها را مانند `<br />` ببندید. همچنین مؤلفه شما نمی‌تواند چندین تگ JSX را برگرداند. شما باید آن‌ها را درون یک والد مشترک، مثل `<div>...</div>` یا یک بسته‌بندی خالی `<>...</>` قرار دهید:

```js {3,6}
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

اگر بخواهید تعداد زیادی از کدهای HTML را به JSX تبدیل کنید، می‌توانید از یک [تبدیل‌کننده آنلاین](https://transform.tools/html-to-jsx) استفاده کنید.

## اضافه کردن استایل {/*adding-styles*/}

در React، شما یک کلاس CSS را با استفاده از `className` مشخص می‌کنید. این به همان شکلی کار می‌کند که ویژگی [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) در HTML کار می‌کند.

```js
<img className="avatar" />
```

سپس شما قوانین سی‌اس‌اس را در یک فایل جدا برای آن می‌نویسید

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

React تعیین نمی‌کند که چگونه فایل‌های CSS را اضافه کنید. در ساده‌ترین حالت، شما یک تگ [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) به HTML خود اضافه می‌کنید. اگر از یک ابزار ساخت یا یک چارچوب (framework) استفاده می‌کنید، به مستندات آن مراجعه کنید تا یاد بگیرید چگونه یک فایل CSS را به پروژه خود اضافه کنید.

## نمایش اطلاعات {/*displaying-data*/}

JSX به شما این امکان را می‌دهد که نشانه‌گذاری (markup) را در داخل جاوااسکریپت قرار دهید. کرلی بریسز به شما امکان می‌دهد که به جاوااسکریپت برگردید تا بتوانید یک متغیر از کد خود تعبیه کنید و آن را به کاربر نمایش دهید. به عنوان مثال، این دستور `user.name` را نمایش می‌دهد:

```js {3}
return (
  <h1>
    {user.name}
  </h1>
);
```

شما همچنین می‌توانید از ویژگی‌های JSX به جاوااسکریپت "بپریدید"، اما باید از کرلی بریسز به جای نقل‌قول استفاده کنید. به عنوان مثال، `className="avatar"` رشته `"avatar"` را به عنوان کلاس CSS منتقل می‌کند، اما `src={user.imageUrl}` مقدار متغیر جاوااسکریپت `user.imageUrl` را می‌خواند و سپس این مقدار را به عنوان ویژگی `src` منتقل می‌کند:

```js {3,4}
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

شما می‌توانید عبارات پیچیده‌تری را هم درون کرلی بریسز JSX قرار دهید، به عنوان مثال، [اتصال رشته](https://javascript.info/operators#string-concatenation-with-binary) را نیز می‌توانید انجام دهید:

<Sandpack>

```js
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

```css
.avatar {
  border-radius: 50%;
}

.large {
  border: 4px solid gold;
}
```

</Sandpack>

در مثال بالا، `style={{}}` نه نوعی دستور خاص است، بلکه یک شی `{}` معمولی درون کرلی بریسز JSX است. شما می‌توانید ویژگی `style` را استفاده کنید زمانی که استایل‌های شما به متغیرهای جاوااسکریپت وابسته هستند.

## Conditional rendering {/*conditional-rendering*/}

در React، نه ترکیب نحوی خاصی برای نوشتن شرایط وجود دارد. به جای آن، شما از تکنیک‌های همانند نوشتن کد جاوااسکریپت عمومی استفاده می‌کنید. به عنوان مثال، می‌توانید از دستور [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) برای اضافه کردن JSX به صورت شرطی استفاده کنید:

```js
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

اگر ترجیح می‌دهید کد خود را متداول‌تر نوشته نمایید، می‌توانید از [اپراتور شرطی `?`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) استفاده کنید. بر خلاف `if`، این اپراتور درون JSX کار می‌کند:

```js
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

وقتی شاخه `else` نیاز ندارید، همچنین می‌توانید از نحوه‌ی کوتاهتر [عبارت `&&` منطقی](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation) استفاده کنید:

```js
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

تمامی این روش‌ها نیز برای مشخص کردن ویژگی‌ها به صورت شرطی کار می‌کنند. اگر با برخی از این نحوه‌نویسی‌های جاوااسکریپت آشنا نیستید، می‌توانید با همیشه استفاده از `if...else` شروع کنید.

## نمایش لیست‌ها {/*rendering-lists*/}

برای رندر کردن لیست‌های مؤلفه‌ها، شما به ویژگی‌های جاوااسکریپت مانند [حلقه `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) و تابع [`map()` آرایه](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) اعتماد خواهید کرد.

برای مثال٬ فرض کنید ارایه ای از محصولات داریم:

```js
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```

در داخل مؤلفه‌تان، از تابع `map()` برای تبدیل یک آرایه از محصولات به یک آرایه از موارد `<li>` استفاده کنید:

```js
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```

توجه داشته باشید که موارد `<li>` دارای ویژگی `key` هستند. برای هر مورد در یک لیست، باید یک رشته یا یک عدد ارائه دهید که این مورد را به صورت منحصر به فرد میان همکاران خود شناسایی کند. معمولاً، یک کلید باید از داده‌های شما، مانند یک شناسه پایگاه‌داده، مشتق شود. React از کلیدهای شما برای شناختن چه اتفاقی می‌افتد، اگر بعداً موارد را درج، حذف یا مرتب‌سازی کنید.

<Sandpack>

```js
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

</Sandpack>

##  پاسخ‌دهی به وقایع {/*responding-to-events*/}

شما می‌توانید با تعریف توابع *دستگیرنده رویداد* درون مؤلفه‌های خود به رویدادها پاسخ دهید:

```js {2-4,7}
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

توجه داشته باشید که `onClick={handleClick}` پرانتز در انتهای خود ندارد! تابع دستگیرنده رویداد را *فراخوانی نکنید*: شما تنها باید آن را *پاس دهید*. React هنگامی که کاربر دکمه را کلیک می‌کند، تابع دستگیرنده رویداد شما را فراخوانی می‌کند.

## به روزرسانی صفحه {/*updating-the-screen*/}

بسیار اوقات، شما می‌خواهید مؤلفه‌تان برخی اطلاعات را "یادآوری" کند و نمایش دهد. به عنوان مثال، شاید بخواهید تعداد باری که یک دکمه کلیک شده را محاسبه کنید. برای انجام این کار، به مؤلفه‌تان *وضعیت* (state) اضافه کنید.

ابتدا، [`useState`](/reference/react/useState) را از React وارد کنید:

```js
import { useState } from 'react';
```

حالا می‌توانید یک *متغیر وضعیت* (state variable) را درون مؤلفه‌تان اعلام کنید:

```js
function MyButton() {
  const [count, setCount] = useState(0);
  // ...
```

از `useState` دو چیز دریافت خواهید کرد: وضعیت فعلی (`count`) و تابعی که به شما امکان به‌روزرسانی آن را می‌دهد (`setCount`). شما می‌توانید به آن‌ها هر نامی دهید، اما عرفا به نوشتن `[چیزی، setچیزی]` عمل می‌کنند.

اولین باری که دکمه نمایش داده می‌شود، `count` برابر با `0` خواهد بود چرا که شما `0` را به `useState()` پاس داده‌اید. وقتی می‌خواهید وضعیت را تغییر دهید، تابع `setCount()` را فراخوانی کنید و مقدار جدید را به آن بدهید. با کلیک بر روی این دکمه، شمارنده افزایش می‌یابد:

```js {5}
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

React تابع مؤلفه شما را دوباره فراخوانی خواهد کرد. این بار، `count` برابر با `1` خواهد بود. سپس به `2` خواهد رسید و به همین ترتیب.

اگر شما چندین بار همان مؤلفه را رندر کنید، هر کدام وضعیت خود را خواهند داشت. هر دکمه را به تنهایی کلیک کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

توجه داشته باشید که هر دکمه وضعیت `count` خود را "یاد می‌آورد" و بر روی دکمه‌های دیگر تأثیر نمی‌گذارد.

## استفاده از هوک‌ها {/*using-hooks*/}

توابعی که با `use` آغاز می‌شوند به نام *هوک‌ها* شناخته می‌شوند. `useState` یک هوک تعبیه‌شده است که توسط React ارائه شده است. شما می‌توانید هوک‌های دیگر تعبیه‌شده را در [مرجع API](/reference/react) پیدا کنید. همچنین می‌توانید هوک‌های خودتان را با ترکیب هوک‌های موجود بسازید.

هوک‌ها محدود‌تر از توابع دیگر هستند. شما تنها می‌توانید هوک‌ها را *در بالای* مؤلفه‌های خود (یا هوک‌های دیگر) فراخوانی کنید. اگر می‌خواهید `useState` را در یک شرط یا حلقه استفاده کنید، یک مؤلفه جدید استخراج کرده و آن را در آنجا قرار دهید.

## به اشتراک‌گذاری دیتا بین کامپوننت‌ها {/*sharing-data-between-components*/}

در مثال قبلی، هر `MyButton` وضعیت مستقل خود را داشت و هنگام کلیک بر روی هر دکمه، تنها `count` برای دکمه مورد نظر تغییر می‌کرد:

<DiagramGroup>

<Diagram name="sharing_data_child" height={367} width={407} alt="Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.">

از ابتدا، وضعیت `count` هر `MyButton` برابر با `0` است.

</Diagram>

<Diagram name="sharing_data_child_clicked" height={367} width={407} alt="The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero." >

اولین `MyButton` وضعیت `count` خود را به `1` به‌روز می‌کند.

</Diagram>

</DiagramGroup>

به هر حال، بسیار اوقات شما نیاز دارید که مؤلفه‌ها اطلاعات را *به اشتراک بگذارند و همواره همراه به‌روز شوند*.

برای اینکه هر دو مؤلفه `MyButton` از یک `count` مشترک نمایش دهند و همزمان به‌روز شوند، باید وضعیت را از دکمه‌های فردی به "بالا" به مؤلفه نزدیکتری انتقال دهید که تمام آن‌ها را شامل می‌شود.

در این مثال، مؤلفه `MyApp` است:

<DiagramGroup>

<Diagram name="sharing_data_parent" height={385} width={410} alt="Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero." >

Initially, `MyApp`'s `count` state is `0` and is passed down to both children

</Diagram>

<Diagram name="sharing_data_parent_clicked" height={385} width={410} alt="The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down." >

On click, `MyApp` updates its `count` state to `1` and passes it down to both children

</Diagram>

</DiagramGroup>

حالا وقتی بر روی هر دکمه کلیک می‌کنید، `count` در `MyApp` تغییر می‌کند، که باعث تغییر هر دو `count` در `MyButton` خواهد شد. اینجا چگونه می‌توانید این موضوع را در کد بیان کنید:

ابتدا، *وضعیت را به بالا انتقال دهید* از `MyButton` به `MyApp`:

```js {2-6,18}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  // ... we're moving code from here ...
}

```

سپس، *وضعیت را به پائین ارسال کنید* از `MyApp` به هر `MyButton`، همراه با دستگیرنده کلیک مشترک. شما می‌توانید اطلاعات را با استفاده از پرانتز زیگ‌زاگ JSX به `MyButton` منتقل کنید، به همان نحوی که قبلاً با تگ‌های تعبیه‌شده مانند `<img>` انجام داده‌اید:

```js {11-12}
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

اطلاعاتی که به این شکل به پائین ارسال می‌کنید _ویژگی‌ها_ (props) نامیده می‌شوند. اکنون مؤلفه `MyApp` حاوی وضعیت `count` و دستگیرنده رویداد `handleClick` است و *هر دوی آن‌ها را به عنوان ویژگی به هر یک از دکمه‌ها ارسال می‌کند*.

سرانجام، `MyButton` را تغییر دهید تا *ویژگی‌هایی که از مؤلفه والد خود به آن منتقل کرده‌اید را بخواند*:

```js {1,3}
function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

وقتی روی دکمه کلیک می‌کنید، دستگیرنده `onClick` فعال می‌شود. هر `onClick` ویژگی دکمه به تابع `handleClick` داخل `MyApp` تنظیم شده است، بنابراین کد داخل آن اجرا می‌شود. این کد `setCount(count + 1)` را فراخوانی می‌کند و متغیر وضعیت `count` را افزایش می‌دهد. مقدار جدید `count` به عنوان ویژگی به هر دکمه ارسال می‌شود، بنابراین همه آنها مقدار جدید را نمایش می‌دهند. این به نام "انتقال وضعیت به بالا" خوانده می‌شود. با انتقال وضعیت به بالا، شما آن را بین مؤلفه‌ها به اشتراک گذاشته‌اید.

<Sandpack>

```js
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

```css
button {
  display: block;
  margin-bottom: 5px;
}
```

</Sandpack>

## Next Steps {/*next-steps*/}

تا این لحظه، شما اصول اساسی نوشتن کد React را می‌شناسید!

برای قرار دادن آنها در عمل و ساخت اولین نرم‌افزار کوچک خود با React، [آموزش](/learn/tutorial-tic-tac-toe) را بررسی کنید.
