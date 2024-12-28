---
title: رندر کردن لیست
---

<Intro>

اغلب اوقات می‌خواهید چندین کامپوننت مشابه را از یک مجموعه داده نمایش دهید. می‌توانید از [متدهای آرایه جاوااسکریپت ](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array#)برای مدیریت یک آرایه از داده‌ها استفاده کنید. در این صفحه، از متدهای [filter()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) و [map()](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) همراه با React استفاده خواهید کرد تا آرایه داده‌های خود را فیلتر کرده و به آرایه‌ای از کامپوننت‌ها تبدیل کنید.
</Intro>

<YouWillLearn>

* چگونه کامپوننت‌ها را با استفاده از متد `()map` جاوااسکریپت از یک آرایه رندر کنیم
* چگونه فقط کامپوننت‌های خاص را با استفاده از متد `()filter` جاوااسکریپت رندر کنیم
* چه زمانی و چرا باید از کلیدهای React استفاده کنیم

</YouWillLearn>

## رندر کردن داده‌ها از آرایه‌ها {/*rendering-data-from-arrays*/}

فرض کنید یک لیست از محتوا دارید.

```js
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```

تنها تفاوت بین آیتم‌های این لیست، محتوای آنها یا داده‌هایشان است. هنگام ساخت رابط‌های کاربری، اغلب نیاز خواهید داشت که چندین نمونه از یک کامپوننت را با داده‌های مختلف نمایش دهید؛ از لیست نظرات گرفته تا گالری‌های تصاویر پروفایل. در این موارد، می‌توانید داده‌ها را در آبجکت‌ها و آرایه‌های جاوااسکریپت ذخیره کنید و از متدهایی مانند [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) و [`filter()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) برای رندر کردن لیستی از کامپوننت‌ها استفاده کنید.

در اینجا یک مثال کوتاه برای تولید یک لیست از آیتم‌ها از یک آرایه آورده شده است:

1. **داده‌ها** را به یک آرایه منتقل کنید

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. **اعضای** `people` را به یک آرایه جدید از نودهای JSX به نام `listItems` تبدیل کنید:

```js
const listItems = people.map(person => <li>{person}</li>);
```

3. **آرایه** `listItems` را در کامپوننت خود داخل یک `<ul>` بازگردانید:

```js
return <ul>{listItems}</ul>;
```

نتیجه نهایی این شد:

<Sandpack>

```js
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

```css
li { margin-bottom: 10px; }
```

</Sandpack>

توجه کنید که سندباکس بالا یک خطای کنسول نمایش می‌دهد:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

شما یاد می‌گیرید که چگونه این خطا را در ادامه این صفحه برطرف کنید. قبل از اینکه به آن برسیم، بیایید کمی ساختار به داده‌های خود اضافه کنیم.

## فیلتر کردن آرایه‌ای از آیتم‌ها {/*filtering-arrays-of-items*/}

این داده‌ها می‌توانند حتی بیشتر ساختاردهی شوند.

```js
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  name: 'Percy Lavon Julian',
  profession: 'chemist',  
}, {
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```

فرض کنید می‌خواهید روشی داشته باشید که فقط افرادی را که حرفه‌شان `'chemist'` است نمایش دهد. می‌توانید از متد `filter()` جاوااسکریپت برای بازگشت فقط این افراد استفاده کنید. این متد یک آرایه از آیتم‌ها را می‌گیرد، آنها را از طریق یک "آزمون" (یک تابع که `true` یا `false` را برمی‌گرداند) عبور می‌دهد و یک آرایه جدید از فقط آیتم‌هایی که آزمون را پشت سر گذاشته‌اند (و `true` برگشت داده‌اند) باز می‌گرداند.

شما فقط آیتم‌هایی را می‌خواهید که `profession` آنها `'chemist'` باشد. تابع "آزمون" برای این کار به شکل `(person) => person.profession === 'chemist'` خواهد بود. در اینجا نحوه ترکیب آن آمده است:

1. **یک آرایه جدید از افراد با حرفه "chemist" به نام `chemists` ایجاد کنید** با فراخوانی متد `filter()` بر روی آرایه `people` و فیلتر کردن بر اساس `person.profession === 'chemist'`:

```js
const chemists = people.filter(person =>
  person.profession === 'chemist'
);
```

2. حالا **بر روی** `chemists` از متد `map()` استفاده کنید:

```js {1,13}
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

3. در نهایت، **آرایه** `listItems` را از کامپوننت خود بازگردانید:

```js
return <ul>{listItems}</ul>;
```

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const listItems = chemists.map(person =>
    <li>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Pitfall>

توابع پیکانی به طور ضمنی عبارت بعد از `=>` را باز می‌گردانند، بنابراین نیازی به دستور `return` نبود.

```js
const listItems = chemists.map(person =>
  <li>...</li> // Implicit return!
);
```

اما **باید دستور `return` را به صورت صریح بنویسید اگر بعد از `=>` یک آکولاد `{` قرار گیرد!**

```js
const listItems = chemists.map(person => { // Curly brace
  return <li>...</li>;
});
```

توابع پیکانی که شامل `=> {` هستند به عنوان ["block body"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body) شناخته می‌شوند. این نوع توابع به شما اجازه می‌دهند که بیش از یک خط کد بنویسید، اما شما *باید* خودتان دستور `return` را بنویسید. اگر آن را فراموش کنید، هیچ چیزی بازگشت داده نخواهد شد!

</Pitfall>

## حفظ ترتیب آیتم‌های لیست با استفاده از `key` {/*keeping-list-items-in-order-with-key*/}

توجه کنید که همه‌ی سندباکس‌های بالا یک خطا در کنسول نمایش می‌دهند:

<ConsoleBlock level="error">

Warning: Each child in a list should have a unique "key" prop.

</ConsoleBlock>

شما باید به هر آیتم آرایه یک `key` بدهید — یک رشته یا عدد که آن را به طور منحصر به فرد در میان سایر آیتم‌ها در آن آرایه شناسایی کند:

```js
<li key={person.id}>...</li>
```

<Note>

المان‌های JSX که مستقیماً داخل یک فراخوانی `map()` قرار دارند همیشه به کلیدها نیاز دارند!

</Note>

کلیدها به React می‌گویند که هر کامپوننت مربوط به کدام آیتم آرایه است، تا بتواند آن‌ها را بعداً مطابقت دهد. این موضوع زمانی اهمیت پیدا می‌کند که آیتم‌های آرایه شما ممکن است جابجا شوند (برای مثال به دلیل مرتب‌سازی)، وارد شوند یا حذف شوند. یک `key` به‌خوبی انتخاب شده به React کمک می‌کند تا دقیقاً متوجه شود چه اتفاقی افتاده است و به‌روزرسانی‌های صحیحی را در درخت DOM انجام دهد.

به جای ایجاد کلیدها به صورت آنی، باید آن‌ها را در داده‌های خود گنجانید:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}</b>
          {' ' + person.profession + ' '}
          known for {person.accomplishment}
      </p>
    </li>
  );
  return <ul>{listItems}</ul>;
}
```

```js src/data.js active
export const people = [{
  id: 0, // Used in JSX as a key
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1, // Used in JSX as a key
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2, // Used in JSX as a key
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3, // Used in JSX as a key
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4, // Used in JSX as a key
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<DeepDive>

#### نمایش چندین نود DOM برای هر آیتم لیست {/*displaying-several-dom-nodes-for-each-list-item*/}

وقتی هر آیتم نیاز به رندر کردن چندین نود DOM داشته باشد، چه کار می‌کنید؟

سینتکس کوتاه [`<>...</>` Fragment](/reference/react/Fragment) به شما اجازه نمی‌دهد که کلیدی را ارسال کنید، بنابراین شما باید آن‌ها را یا در یک `<div>` واحد گروه‌بندی کنید، یا از سینتکس کمی بلندتر و [واضح‌تر `<Fragment>` استفاده کنید:](/reference/react/Fragment#rendering-a-list-of-fragments)

```js
import { Fragment } from 'react';

// ...

const listItems = people.map(person =>
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
);
```

فرگمنت‌ها از DOM ناپدید می‌شوند، بنابراین این کار یک لیست صاف از `<h1>`, `<p>`, `<h1>`, `<p>`, و به همین ترتیب تولید خواهد کرد.

</DeepDive>

### کجا باید `کلید` خود را بگیرید؟ {/*where-to-get-your-key*/}

منابع مختلف داده، منابع مختلفی برای کلیدها فراهم می‌کنند:

* **داده‌ها از یک پایگاه داده:** اگر داده‌های شما از یک پایگاه داده می‌آید، می‌توانید از کلیدها/شناسه‌های پایگاه داده استفاده کنید که به طور طبیعی منحصر به فرد هستند.
* **داده‌های تولید شده به صورت محلی:** اگر داده‌های شما به صورت محلی تولید و ذخیره می‌شود (مثلاً یادداشت‌ها در یک اپلیکیشن یادداشت‌برداری)، از یک شمارنده افزایشی، [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID) یا یک پکیج مانند [`uuid`](https://www.npmjs.com/package/uuid) هنگام ایجاد آیتم‌ها استفاده کنید.

### قوانین کلیدها {/*rules-of-keys*/}

* **کلیدها باید در میان دسته خود منحصر به فرد باشند.** اما استفاده از کلیدهای مشابه برای نودهای JSX در _آرایه‌های متفاوت_ اشکالی ندارد.
* **کلیدها نباید تغییر کنند** زیرا این کار هدف آنها را بی‌اثر می‌کند! از تولید آن‌ها در حین رندرینگ خودداری کنید.

### چرا React به کلیدها نیاز دارد؟ {/*why-does-react-need-keys*/}

تصور کنید که فایل‌ها در دسکتاپ شما نام نداشته باشند. در عوض، شما آنها را بر اساس ترتیبشان ارجاع می‌دهید — فایل اول، فایل دوم و به همین ترتیب. شاید به این موضوع عادت کنید، اما زمانی که یک فایل حذف شود، این موضوع گیج‌کننده می‌شود. فایل دوم به فایل اول تبدیل می‌شود، فایل سوم به فایل دوم و همینطور ادامه می‌یابد.

نام فایل‌ها در یک پوشه و کلیدهای JSX در یک آرایه هدف مشابهی دارند. آنها به ما این امکان را می‌دهند که یک آیتم را بین هم‌نیاکانش به طور منحصر به فرد شناسایی کنیم. یک کلید به‌خوبی انتخاب شده اطلاعات بیشتری نسبت به موقعیت داخل آرایه فراهم می‌کند. حتی اگر _موقعیت_ به دلیل مرتب‌سازی تغییر کند، کلید به React این امکان را می‌دهد که آیتم را در طول عمر آن شناسایی کند.

<Pitfall>

ممکن است وسوسه شوید که از ایندکس آیتم در آرایه به عنوان کلید آن استفاده کنید. در واقع، این همان چیزی است که React در صورتی که شما هیچ کلیدی مشخص نکنید، استفاده خواهد کرد. اما ترتیب رندر کردن آیتم‌ها با گذشت زمان تغییر خواهد کرد اگر یک آیتم وارد شود، حذف شود یا اگر آرایه دوباره مرتب شود. استفاده از شاخص به عنوان کلید اغلب منجر به باگ‌های ظریف و گیج‌کننده می‌شود.

به طور مشابه، از تولید کلیدها به صورت آنی خودداری کنید، مثلاً با `key={Math.random()}`. این کار باعث می‌شود که کلیدها هیچ وقت بین رندرها مطابقت نداشته باشند و منجر به بازسازی تمامی کامپوننت‌ها و DOM در هر بار رندر شود. این نه تنها کند است، بلکه هر ورودی کاربر در داخل آیتم‌های لیست را نیز از دست می‌دهد. در عوض، از یک شناسه ثابت مبتنی بر داده‌ها استفاده کنید.

توجه داشته باشید که کامپوننت‌های شما `key` را به عنوان یک پراپ دریافت نمی‌کنند. این فقط توسط React به عنوان یک راهنمایی استفاده می‌شود. اگر کامپوننت شما به یک شناسه نیاز دارد، باید آن را به عنوان یک پراپ جداگانه ارسال کنید: `<Profile key={id} userId={id} />`.

</Pitfall>

<Recap>

در این صفحه شما آموختید:

* چگونه داده‌ها را از کامپوننت‌ها خارج کرده و به ساختارهای داده‌ای مانند آرایه‌ها و اشیاء منتقل کنید.
* چگونه مجموعه‌هایی از کامپوننت‌های مشابه با استفاده از متد `map()` در جاوااسکریپت ایجاد کنید.
* چگونه آرایه‌هایی از آیتم‌های فیلتر شده با استفاده از متد `filter()` در جاوااسکریپت بسازید.
* چرا و چگونه باید برای هر کامپوننت در یک مجموعه `key` را تنظیم کنید تا React بتواند هر کدام را پیگیری کند حتی اگر موقعیت یا داده‌های آن‌ها تغییر کند.

</Recap>



<Challenges>

#### تقسیم یک لیست به دو بخش {/*splitting-a-list-in-two*/}

این مثال یک لیست از تمام افراد را نشان می‌دهد.

آن را تغییر دهید تا دو لیست جداگانه یکی پس از دیگری نمایش داده شود: **شیمیدان‌ها** و **بقیه افراد**. همانطور که قبلاً اشاره شد، می‌توانید تعیین کنید که آیا یک شخص شیمیدان است یا خیر با بررسی اینکه `person.profession === 'chemist'`.

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

<Solution>

شما می‌توانید از `filter()` دوبار استفاده کنید، دو آرایه جداگانه ایجاد کرده و سپس روی هر دو آنها `map` کنید:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <h2>Chemists</h2>
      <ul>
        {chemists.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
      <h2>Everyone Else</h2>
      <ul>
        {everyoneElse.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

در این راه‌حل، تماس‌های `map` به طور مستقیم داخل عناصر والد `<ul>` قرار گرفته‌اند، اما اگر این کار را بیشتر خوانا می‌بینید، می‌توانید برای آنها متغیرهایی معرفی کنید.

هنوز مقداری تکرار در لیست‌های رندر شده وجود دارد. شما می‌توانید بیشتر پیش بروید و قسمت‌های تکراری را در یک کامپوننت `<ListSection>` استخراج کنید:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );
  const everyoneElse = people.filter(person =>
    person.profession !== 'chemist'
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

یک خواننده بسیار دقیق ممکن است متوجه شود که با دو فراخوانی `filter`، حرفه هر شخص را دوبار بررسی می‌کنیم. بررسی یک ویژگی بسیار سریع است، بنابراین در این مثال مشکلی ندارد. اگر منطق شما پیچیده‌تر از این باشد، می‌توانید فراخوانی‌های `filter` را با یک حلقه جایگزین کنید که آرایه‌ها را به صورت دستی می‌سازد و هر شخص را تنها یک بار بررسی می‌کند.

در حقیقت، اگر `people` هیچ‌گاه تغییر نکند، می‌توانید این کد را از کامپوننت خود خارج کنید. از منظر React، چیزی که اهمیت دارد این است که در نهایت یک آرایه از نودهای JSX به آن بدهید. React اهمیتی نمی‌دهد که چگونه این آرایه را تولید کرده‌اید:

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

let chemists = [];
let everyoneElse = [];
people.forEach(person => {
  if (person.profession === 'chemist') {
    chemists.push(person);
  } else {
    everyoneElse.push(person);
  }
});

function ListSection({ title, people }) {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map(person =>
          <li key={person.id}>
            <img
              src={getImageUrl(person)}
              alt={person.name}
            />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

export default function List() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection
        title="Chemists"
        people={chemists}
      />
      <ListSection
        title="Everyone Else"
        people={everyoneElse}
      />
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
```

</Sandpack>

</Solution>

#### لیست‌های تو در تو در یک کامپوننت {/*nested-lists-in-one-component*/}

یک لیست از دستورالعمل‌ها از این آرایه بسازید! برای هر دستورالعمل در آرایه، نام آن را به صورت یک `<h2>` نمایش دهید و مواد لازم آن را در یک `<ul>` فهرست کنید.

<Hint>

این نیاز به تو در تو کردن دو فراخوانی `map` مختلف دارد.

</Hint>

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

در اینجا یکی از روش‌هایی که می‌توانید برای انجام آن استفاده کنید آورده شده است:

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

هر یک از `دستورالعمل‌ها` قبلاً شامل فیلد `id` است، بنابراین از آن برای `key` در حلقه خارجی استفاده می‌شود. هیچ ID‌ای برای حلقه زدن بر روی مواد لازم وجود ندارد. با این حال، منطقی است که فرض کنید نام همان ماده غذایی در یک دستورالعمل دو بار ذکر نخواهد شد، بنابراین نام آن می‌تواند به عنوان `key` استفاده شود. به طور جایگزین، می‌توانید ساختار داده را تغییر دهید تا ID اضافه کنید، یا از index به عنوان `key` استفاده کنید (با این هشدار که نمی‌توانید مواد لازم را به طور ایمن جابه‌جا کنید).

</Solution>

#### استخراج یک کامپوننت آیتم لیست {/*extracting-a-list-item-component*/}

این کامپوننت `RecipeList` شامل دو فراخوانی تو در تو از `map` است. برای ساده‌تر کردن آن، یک کامپوننت `Recipe` استخراج کنید که مقادیر `id`، `name` و `ingredients` را به عنوان پراپ می‌پذیرد. `key` خارجی را کجا قرار می‌دهید و چرا؟

<Sandpack>

```js src/App.js
import { recipes } from './data.js';

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

<Solution>

شما می‌توانید JSX مربوط به حلقه خارجی `map` را کپی کرده و در یک کامپوننت جدید به نام `Recipe` قرار دهید و آن JSX را بازگردانید. سپس می‌توانید `recipe.name` را به `name`، `recipe.id` را به `id` و به همین ترتیب تغییر دهید و آن‌ها را به عنوان پراپ به `Recipe` ارسال کنید:

<Sandpack>

```js
import { recipes } from './data.js';

function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}
```

```js src/data.js
export const recipes = [{
  id: 'greek-salad',
  name: 'Greek Salad',
  ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
  id: 'hawaiian-pizza',
  name: 'Hawaiian Pizza',
  ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
  id: 'hummus',
  name: 'Hummus',
  ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];
```

</Sandpack>

در اینجا، `<Recipe {...recipe} key={recipe.id} />` یک میانبر سینتکسی است که می‌گوید "تمام ویژگی‌های شیء `recipe` را به عنوان پراپ به کامپوننت `Recipe` ارسال کن". شما می‌توانید هر پراپ را به طور صریح هم بنویسید: `<Recipe id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} key={recipe.id} />`.

**توجه داشته باشید که `key` روی خود `<Recipe>` مشخص شده است نه روی `<div>` ریشه‌ای که از `Recipe` بازگردانده می‌شود.** این به این دلیل است که این `key` مستقیماً در زمینه آرایه اطراف مورد نیاز است. قبلاً شما یک آرایه از `<div>`ها داشتید که هر کدام به یک `key` نیاز داشتند، اما حالا یک آرایه از `<Recipe>`ها دارید. به عبارت دیگر، وقتی یک کامپوننت را استخراج می‌کنید، فراموش نکنید که `key` را خارج از JSX که کپی و جای‌گذاری کرده‌اید بگذارید.

</Solution>

#### لیست با یک جداکننده {/*list-with-a-separator*/}

این مثال یک هایکو مشهور از تاکیبانا هوکوشی را رندر می‌کند، به طوری که هر خط در یک تگ `<p>` قرار دارد. وظیفه شما این است که یک جداکننده `<hr />` بین هر پاراگراف وارد کنید. ساختار نهایی شما باید به این شکل باشد:

```js
<article>
  <p>I write, erase, rewrite</p>
  <hr />
  <p>Erase again, and then</p>
  <hr />
  <p>A poppy blooms.</p>
</article>
```

یک هایکو تنها سه خط دارد، اما راه‌حل شما باید با هر تعداد خط کار کند. توجه داشته باشید که عناصر `<hr />` تنها باید *بین* عناصر `<p>` ظاهر شوند، نه در ابتدای آن‌ها و نه در انتهای آن‌ها!

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, index) =>
        <p key={index}>
          {line}
        </p>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

(این یک مورد نادر است که استفاده از index به عنوان `key` قابل قبول است زیرا خطوط یک شعر هرگز جابه‌جا نمی‌شوند.)

<Hint>

شما باید یا `map` را به یک حلقه دستی تبدیل کنید، یا از یک Fragment استفاده کنید.

</Hint>

<Solution>

شما می‌توانید یک حلقه دستی بنویسید و به طور همزمان `<hr />` و `<p>...</p>` را به آرایه خروجی اضافه کنید:

<Sandpack>

```js
const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  let output = [];

  // Fill the output array
  poem.lines.forEach((line, i) => {
    output.push(
      <hr key={i + '-separator'} />
    );
    output.push(
      <p key={i + '-text'}>
        {line}
      </p>
    );
  });
  // Remove the first <hr />
  output.shift();

  return (
    <article>
      {output}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

استفاده از اندیس خط اصلی به عنوان `key` دیگر کار نمی‌کند زیرا اکنون هر جداکننده و پاراگراف در همان آرایه قرار دارند. با این حال، شما می‌توانید به هر کدام یک `key` متمایز بدهید با استفاده از پسوند، مثلاً `key={i + '-text'}`.

به طور جایگزین، می‌توانید مجموعه‌ای از Fragments را رندر کنید که شامل `<hr />` و `<p>...</p>` هستند. با این حال، سینتاکس میانبر `<>...</>` پشتیبانی از ارسال `key` را ندارد، بنابراین باید به صورت صریح از `<Fragment>` استفاده کنید:

<Sandpack>

```js
import { Fragment } from 'react';

const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export default function Poem() {
  return (
    <article>
      {poem.lines.map((line, i) =>
        <Fragment key={i}>
          {i > 0 && <hr />}
          <p>{line}</p>
        </Fragment>
      )}
    </article>
  );
}
```

```css
body {
  text-align: center;
}
p {
  font-family: Georgia, serif;
  font-size: 20px;
  font-style: italic;
}
hr {
  margin: 0 120px 0 120px;
  border: 1px dashed #45c3d8;
}
```

</Sandpack>

یادآوری: Fragments (که معمولاً به صورت `<> </>` نوشته می‌شوند) به شما این امکان را می‌دهند که گره‌های JSX را بدون افزودن `<div>` اضافی گروه‌بندی کنید!

</Solution>

</Challenges>
