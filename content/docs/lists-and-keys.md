---
id: lists-and-keys
title: لیست‌ها و کلید‌‌ها
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

ابتدا اجازه دهید به بررسی نحوه تبدیل لیست‌ها در جاوا‌اسکریپت بپردازیم.

با توجه به کد زیر، ما از تابع[`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) استفاده می‌کنیم  تا آرایه‌‌ای از اعداد با نام  `numbers` را گرفته و مقادیرش را دو برابر کند. آرایه‌ی جدیدی که توسط `map()` برگشته را به متغیر `doubled`اختصاص می‌دهیم و آن را چاپ می‌کنیم.


```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

این کد `[2, 4, 6, 8, 10]` را در کنسول چاپ می‌کند.

در ری‌اکت تبدیل آرایه‌ها به لیستی از [المنت‌ها](/docs/rendering-elements.html) به صورت مشابه انجام می‌شود.

### رندر کردن چندین کامپوننت‌ {#rendering-multiple-components}

می‌توانید با استفاده از آکولاد `{}`، مجموعه‌ای از المنت‌ها را بسازید و [آن‌ها را در JSX درج کنید](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

در قسمت زیر ما با استفاده از تابع [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  در جاوا‌اسکریپت، بر‌روی آرایه‌ ی‌ `numbers`حلقه می‌زنیم. 
برای هر آیتم یک المنت `<li>` برمی‌گردانیم و در نهایت  نتیجه‌ی آرایه‌ی المان‌ها را به `listItems` اختصاص می‌دهیم. :

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

کل آرایه‌ی `listItems` را درون یک المنت `<ul>` قرار می‌دهیم و [آن را در DOM رندر می‌کنیم](/docs/rendering-elements.html#rendering-an-element-into-the-dom):  

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)


این کد یک لیست گلوله‌ای از اعداد بین ۱ تا ۵ را نشان می‌دهد.

###  کامپوننت لیست ساده {#basic-list-component}

معمولا شما لیست‌ها را درون یک [کامپوننت](/docs/components-and-props.html) رندر خواهید کرد.

می‌توانیم مثال قبلی را طوری بیهنه‌سازی کنیم که یک کامپوننت آرایه‌ ی `numbers` را بگیرد و لیستی از المنت‌ها را باز گرداند. 

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

وقتی این کد را اجرا کنید، با این هشدار مواجه می‌شوید که برای آیتم‌های لیست یک key لازم است. “key” یک ویژگی خاص از جنس رشته است که وقتی لیستی از المنت‌ها درست می‌کنید، باید از آن استفاده کنید. در بخش بعدی دلیل اهمیت آن را توضیح می‌دهیم.

بیاید به آیتم‌های لیست خود در `numbers.map()`،  یک `key` اختصاص دهیم و مشکل نبودن این `key` را حل کنیم.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## کلیدها {#keys}

کلیدها در ری‌اکت به شناسایی این که کدام آیتم‌ها تغییر کرده‌اند، اضافه و یا حذف شده اند کمک میکند. کلیدها باید به المنت‌های داخل آرایه داده شوند تا به المنت‌ها یک شناسه ی ثابت بدهند. 

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

بهترین راه برای انتخاب یک کلید، استفاده از یک رشته است که یک مورد از لیست را میان برادرانش متمایز می‌کند. اغلب شما از IDهای داده خود به عنوان کلید استفاده خواهید کرد.
```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

زمانی که برای آیتم‌های رندر شده یک شناسه ثابت نداشته‌باشید، شما می‌توانید به عنوان آخرین راه چاره از index آیتم به عنوان کلید استفاده کنید:
```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  // فقط زمانی این کار را انجام دهید که آیتم ها شناسه ی پایداری ندارند
  <li key={index}>
    {todo.text}
  </li>
);
```

اگر ممکن است ترتیب آیتم‌ها تغییر کند، پیشنهاد نمی‌کنیم که برای کلیدها از شاخص استفاده کنید. زیرا ممکن است تاثیر منفی‌ای بر عملکرد بگذارد و حتی باعث ایجاد مشکلاتی در state کامپوننت شود. 
مقاله رابین پوکرنی (Robin Pokorny) که توضیحی مفصل در مورد [تاثیر منفی استفاده از شاخص به عنوان یک کلید](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) است را بخوانید.

اگر علاقه‌مندید بیشتر بدانید مقاله ی [توضیح مفصل در مورد اینکه چرا کلید ضروری است](/docs/reconciliation.html#recursing-on-children) را بخوانید. 


### استخراج کامپوننت‌ها با کلید {#extracting-components-with-keys}

استفاده از keyها زمانی معنی می‌دهد که [کد] در یک آرایه احاطه شده‌باشد.


برای مثال اگر یک تکه از کد را به عنوان کامپوننت ListItem [جدا](/docs/components-and-props.html#extracting-components) کنید، باید کلید را روی کامپوننت‌های `<listitem />`قرار دهید، نه روی المنت `<li>` که درون خود ListItem است.

**مثال: استفاده‌ی اشتباه از کلید**
```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
   // اشتباه! اینجا احتیاجی به مشخص کردن کلید نیست: 
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // اشتباه! اینجا باید کلید مشخص میشد:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**مثال: استفاده‌ی صحیح از کلید**

```javascript{2,3,9,10}
function ListItem(props) { 
  // صحیح!اینجا احتیاجی به مشخص کردن کلید نیست:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

یک قاعده خوب این است که المنت‌های داخل فراخوانی`map()` نیاز به کلید دارند.

###  کلید‌ها فقط باید میان همتایان خود یکتا باشند {#keys-must-only-be-unique-among-siblings}

کلید‌هایی که در آرایه‌ها استفاده می‌شوند باید در میان فرزندانشان یکتا باشند.
اگرچه احتیاجی نیست که به صورت عمومی یکتا باشند.
وقتی دو نوع آرایه مختلف تولید می‌کنیم می‌توانیم از کلید‌های یکسان استفاده کنیم: 

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

ری‌اکت از keyها به عنوان یک راهنما استفاده می‌کند، اما به کامپوننت‌های شما داده نمی‌شوند.
اگر به همان کلید در کامپوننت خود احتیاج دارید، به صورت آشکار آن‌را به عنوان یک prop با یک نام متفاوت پاس دهید.

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

در مثال بالا، کامپوننت `Post` می‌تواند `props.id` را بخواند، اما `props.key` را نه.

### جاسازی map() در JSX  {#embedding-map-in-jsx}

در مثال بالا، ما متغیر `listItems` را جداگانه تعریف کردیم و آن‌را در JSX قرار دادیم:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX اجازه [استفاده توکار هر expression ](/docs/introducing-jsx.html#embedding-expressions-in-jsx) را در آکولادها می‌دهد بنابراین می‌توان نتیجه `map()` را درخط (inline) نوشت:
 
```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

گاهی اوقات این‌کار باعث واضح‌تر شدن کد میشود، اما این سبک نیز می‌تواند بد استفاده شود. همانند جاوااسکریپت، تصمیم اینکه یک متغیر را برای خوانایی بهتر استخراج کنید یا نه، به شما بستگی دارد. به خاطر داشته باشید که اگر بدنه `map()` بیش از حد تودرتو شد، ممکن است زمان خوبی باشد که از آن [یک کامپوننت استخراج کنید](/docs/components-and-props.html#extracting-components).
                                                                                      

