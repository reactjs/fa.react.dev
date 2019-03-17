---
id: lists-and-keys
title: لیست ها و کلید ها
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

ابتدا اجازه دهید به بررسی نحوه تبدیل لیست ها در جاوا اسکریپت بپردازیم.

با توجه به کد زیر،ما از تابع[`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) استفاده میکنیم  تا آرایه ی `numbers` را گرفته و  مقادیرش را دوبرابر کند.  


آرایه ی جدیدی که توسط `map()` برگشته را به متغیر `doubled`اختصاص میدهیم و آن را چاپ میکنیم.


```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

این کد آرایه ی`[2, 4, 6, 8, 10]` را چاپ میکند.

در ری اکت هم تغییر آرایه ها به لیست [المنت ها](/docs/rendering-elements.html) تقریبا یکسان است. 

### رندر کردن کامپوننت های چندگانه {#rendering-multiple-components}

میتوانید با استفاده از آکولاد`{}`، مجموعه ای از المنت ها را بسازید و [آن ها را در JSX درج کنید](/docs/introducing-jsx.html#embedding-expressions-in-jsx) .

در قسمت زیر ما با استفاده از تابع [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)  در جاوااسکریپت،در آرایه ی `numbers`حلقه میزنیم. 
برای هر آیتم یک `<li>` برمیگردانیم  و در نهایت  نتیجه ی آرایه ی المان ها را به `listItems` اختصاص میدهیم. :

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

کل آرایه ی `listItems` را درون یک المنت `<ul>` قرار میدهیم و [آن را در DOM رندر میکنیم](/docs/rendering-elements.html#rendering-an-element-into-the-dom):  

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**در کدپن امتحان کنید**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)


این کد یک لیست گلوله ای از اعداد بین ۱ تا ۵ را نشان میدهد.

###  کامپوننت لیست ساده {#basic-list-component}

معمولا لیست هارا درون یک [کامپوننت](/docs/components-and-props.html) رندر میکنیم.

میتوانیم مثال قبلی را طوری بیهنه سازی کنیم که یک کامپوننت  آرایه ای از `numbers` را بگیرد و لیستی از المنت هارا خروجی بدهد. 

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

وقتی این کد را اجرا کنید، با این هشداری مواجه میشیوید که برای آیتم های لیست یک کلید لازم است.""کلید" یک  ویژگی خاص از جنس رشته است که وقتی لیست المنت درست میکنید،باید آن را include کنید. 
در بخش بعدی دلیل اهمیت آن را توضیح میدهیم.

اجازه دهید به آیتم های لیستمان در `numbers.map()`،  یک `کلید` اختصاص دهیم و مشکل نبودن این کلید را حل کنیم.

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

کلیدها در ری اکت  به شناسایی این که کدام آیتم ها تغییر کرده اند، اضافه و یا حذف شده اند کمک میکند. کلیدها باید به المنت های داخل آرایه داده شوند تا به المنت ها یک شناسه ی ثابت بدهند. 

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

بهترین راه برای انتخاب یک کلید،استفاده از یک رشته است که یک لیست آیتم را در میان برادرانش به صورت یکتا تعیین میکند. 
اغلب از ID های اطلاعات خودتان به عنوان کلید استفاده میکنید.
```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

زمانی که برای آیتم های رندر شده یک شناسه ی ثابت نداشته باشید،میتوانید از شاخص آیتم به عنوان کلید برای چاره ی آخر استفاده کنید: 

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  // فقط زمانی این کار را انجام دهید که آیتم ها شناسه ی پایداری ندارند
  <li key={index}>
    {todo.text}
  </li>
);
```

اگر ممکن است ترتیب آیتم ها تغییر کند،پیشنهاد نمیکنیم که برای کلیدها از شاخص استفاده کنید.زیرا ممکن است تاثیر منفی ای بر عملکرد بگذارد و حتی باعث ایجاد مشکلاتی در state های کامپوننت بشود. 
مقاله ی رابین پوکرنی را در مورد [توضیح مفصل در مورد تاثیر منفی استفاده از شاخص به عنوان یک کلید](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) بخوانید. 

اگر علاقه مندید بیشتر بدانید مقاله ی [توضیح مفصل در مورد اینکه چرا کلید ضروری است](/docs/reconciliation.html#recursing-on-children) را بخوانید. 

### استخراج کامپوننت ها با کلید {#extracting-components-with-keys}

فقط زمانی استفاده از کلید ها درست است که از آرایه های احاطه شده استفاده میکنیم. 

برای مثال اگر یک کامپوننت لیست آیتم را[استخراج](/docs/components-and-props.html#extracting-components) کنید،بهتر است کلید را در `<ListItem />` نگاه دارید تا در `<li>` داخل خود`ListItem`  

**مثال: استفاده ی اشتباه از کلید**
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

**مثال: استفاده ی صحیح از کلید**

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

یک قاعده خوب این است که المنت های داخل `map()` کلید های لازم را دارند.

###  کلیدها فقط باید در میان فرزندان یکتا باشند {#keys-must-only-be-unique-among-siblings}

کلیدهایی که در آرایه ها استفاده میشوند باید در میان فرزندانشان یکتا باشند.
اگرچه احتیاجی نیست که به صورت عمومی یکتا باشند.
وقتی دو نوع آرایه مختلف تولید میکنیم میتوانیم از کلید های یکسان استفاده کنیم: 

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

کلیدها به عنوان یک راهنما در ری اکت استفاده میشوند،اما در کامپوننت هایتان منتقل نمیشوند.
اگر به همان کلید در کامپوننتتان احتیاج دارید،به طور صریح آن را به عنوان یک prop با یک نام متفاوت منتقل کنید.

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

در مثال بالا، کامپوننت `Post` میتواند `props.id` را بخواند،اما `props.key` را نه.

### جاسازی map() در JSX  {#embedding-map-in-jsx}

در مثال بالا، متغیر `listItems` را جداگانه اعلام کردیم و آن را در JSX قرار دادیم:

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

 [جاسازی هر عبارت](/docs/introducing-jsx.html#embedding-expressions-in-jsx) JSX  را در آکولاد اجازه میدهد، به طوری که میتوانیم نتیجه ی را `map()` وارد کنیم:

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

گاهی اوقات این کار باعث واضح تر شدن کد میشود،اما این سبک نیز می تواند بد استفاده شود. مانند جاوا اسکریپت، به شما این امکان را می دهد که تصمیم بگیرید که آیا می ارزد که یک متغیر را برای خوانایی بهتر استخراج کنید یا نه. در نظر داشته باشید که اگر بدنه `map ()` بیش از حد تو در تو قرار باشد، ممکن است زمان مناسب برای[استخراج عناصر](/docs/components-and-props.html#extracting-components)  باشد.
