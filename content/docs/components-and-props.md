---
id: components-and-props
title: کامپوننت‌‌ها و prop ها
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

کامپوننت‌ها به شما اجازه می‌دهند رابط کاربری را به بخش‌های مستقل قابل استفاده مجدد تبدیل کنید و این بخش‌ها را به صورت مجزا در نظر بگیرید. این صفحه مقدمه‌ای برای مفهوم کامپوننت به شما ارائه می‌دهد. شما می‌توانید API مربوط به کامپوننت ها و جزییات بیشتر را در این [لینک](/docs/react-component.html) مطالعه فرمایید.

از لحاظ مفهومی کامپوننت‌ها همانند توابع جاوا اسکریپت هستند. آنها ورودی‌های دلخواه خود (props) را دریافت می‌کنند و المنت‌هایی از ری‌اکت را تولید می‌کنند که توصیف کننده آنچه باید روی صفحه نمایان شود است.  


## کامپوننت‌هایی از جنس تابع و کلاس {#function-and-class-components}

ساده‌ترین راه برای تعریف کردن یک کامپوننت، نوشتن یک تابع جاوا اسکریپت است:


```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
این تابع یک کامپوننت قابل قبول ری‌اکت است زیرا یک قطعه ورودی قابل پردازش (props, کوچک شده properties به معنی متعلقات) همراه با اطلاعات دریافت می‌کند و یک المنت ری‌اکت تولید می‌کند.
به این نوع کامپوننت‌ها، «کامپوننت‌‌های تابع‌» گفته می‌شود زیرا آنها در واقعیت تابع‌هایی از جاوا اسکریپت هستند.



شما همچنین می‌توانید از کلاس‌های  [کلاس‌های ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) برای تعریف کامپوننت‌ها استفاده کنید:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

دو کامپوننت بالا از نظر ری‌اکت یکسان هستند.

کلاس‌ها ویژگی های منحصر بفرد دیگری نیز دارند که  [ در بخش‌های بعدی ](/docs/state-and-lifecycle.html)به آنها خواهیم پرداخت. تا آن زمان به دلیل اختصار از کامپوننت‌های تابع استفاده می‌کنیم .

## رندر کردن یک کامپوننت {#rendering-a-component}

پیش‌تر ما فقط با المنت‌هایی از ری‌اکت مواجه شدیم که بیانگر تگ‌های DOM بودند:

```js
const element = <div />;
```
اما المنت‌ها می‌توانند بیانگر کامپوننت‌‌هایی که از توسط کاربر تعریف شده نیز باشند:


```js
const element = <Welcome name="Sara" />;
```

زمانی که ری‌اکت با المنتی مواجه می‌شود که بیانگر یک کامپوننت تعریف شده توسط کاربر باشد، یک ورودی JSX واحد (object) را به عنوان ورودی دریافت می‌کند. ما این object را "props" می‌نامیم. 


برای مثال کد زیر "Hello, Sara" را بر روی صفحه رندر می‌کند:

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

بیایید مرور کنیم که در این مثال چه اتفاقی می‌افتد:

۱. ما تابع `ReactDOM.render()` را با المنت `<Welcome name="Sara" />` فرا می‌خوانیم.

۲. ری‌اکت کامپوننت `Welcome` را به همراه `{name: 'Sara'}` که در ورودی تابع به عنوان `props` تعریف شده است را پردازش می‌کند.

۳. کامپوننت `Welcome` ما در نتیجه یک المنت  تولید می‌کند که حاوی `<h1>Hello, Sara</h1>` است.

۴. DOM ری‌اکت به صورت بهینه DOM را به‌روزرسانی می‌کند تا  `<h1>Hello, Sara</h1>` را نمایش دهد.

>**نکته:** همیشه نام کامپوننت‌ها را با حروف بزرگ انگلیسی شروع کنید.
>
>ری‌اکت با کامپوننت‌هایی که با حروف کوچک انگلیسی شروع شده باشند همانند تگ‌های DOM برخورد می‌کند. برای مثال تگ `<div />` بیانگر یک تگ HTML است , اما `<Welcome />` بیانگر یک کامپوننت است و بنابرین لازم است `Welcome` در scope تابع کامپوننت ما باشد.
>
>برای اطلاعات بیشتر درباره این معاهده ، لطفا  [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) را مطالعه فرمایید.

## طراحی کامپوننت‌ها {#composing-components}

کامپوننت‌ها می‌توانند در خروجی خود به دیگر کامپوننت‌ها اشاره کنند. این به ما اجازه می‌دهد تا یک کامپوننت را برای هر سطحی از جزییات استفاده کنیم. در برنامه‌های ری‌اکتی یک دکمه، یک فرم، یک دیالوگ، و یک صفحه همگی به صورت کامپوننت بیان می‌شوند.

برای مثال ما می‌توانیم یک کامپوننت به نام `App` بسازیم که کامپوننت `Welcome` را بارها رندر می‌کند:


```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

معمولا، پروژه‌های تازه ری‌اکت دارای یک کامپوننت `App` واحد در بالاترین سطح هستند. اما اگر شما ری‌اکت را با پروژه‌ای موجود ادغام می‌کنید، می‌توانید از سطوح پایین به بالا طراحی کنید، برای مثال از یک کامپوننت کوچک مانند `Button` شروع کنید و تدریجا تا بالای سلسله مراتب view طراحی را ادامه دهید.


## استخراج کامپوننت‌ها {#extracting-components}

از این که کامپوننت‌ها را به کامپوننت‌های کوچک‌تر تبدیل کنید هراسان نباشید.

برای مثال این کامپوننت `Comment` را در نظر بگیرید:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

این کامپوننت `author` (یک object جاوا اسکریپت)، `text` (یک string)، و `date` (یک تاریخ) را به عنوان props دریافت می‌کند و یک کامنت (نظر) در یک شبکه اجتماعی توصیف می‌کند.

به علت آشیانه‌ای و تودرتو بودن این کامپوننت ، تغییر دادن آن می‌تواند دشوار باشد، و همچنین استفاده مجدد از اجزای مستقل آن آسان نیست. بیایید چند کامپوننت را از آن استخراج کنیم تا این دشواری‌ها را رفع کنیم.

در ابتدا `Avatar` را استخراج می‌نماییم:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

کامپوننت `Avatar` نیازی به دانستن اینکه قرار است در داخل یک کامپوننت `Comment` رندر شود ندارد. برای همین به prop آن بجای اسمی خاص نظیر `author` به آن اسمی عام نظیر `user` داده‌ایم.

ما پیشنهاد می‌کنیم که prop ها بدون درنظر گرفتن بستری که کامپوننت‌ها قرار است در آن استفاده شوند و از نگاه خود کامپوننت نام‌گذاری کنید.

حال می‌توانیم کامپوننت `Comment` را کمی ساده کنیم:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

سپس ما کامپوننت `UserInfo` را استخراج می‌کنیم که کامپوننت `Avatar` را در کنار اسم کاربر رندر می‌کند:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

این به ما کمک می‌کند تا کامپوننت `Comment` را حتی بیشتر از این ساده کنیم:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

استخراج کامپوننت‌ها شاید در ابتدا به نظر کار سختی بیاید، اما داشتن یک پالت از کامپوننت‌های قابل استفاده مجدد در اپ‌های بزرگتر بسیار به کار می‌آید. به عنوان یک قانون کلی در نظر داشته باشید که اگر قسمتی از رابط کاربری شما بارها استفاده شده است (نظیر `Button`, `Panel` , `Avatar`) و یا اینکه قسمتی از رابط کاربری پیچیدگی منحصر به فرد خود را دارد (نظیر `App`, `FeedStory`, `Comment`) آن قسمت کاندیدای مناسبی برای تبدیل شدن به یک کامپوننت قابل استفاده مجدد است.

## Propها فقط قابل خواندن هستند {#props-are-read-only}

بدون در نظر گرفتن اینکه شما یک کامپوننت را به عنوان  [یک تابع یا یک کلاس](#function-and-class-components) تعریف کرده‌اید، آن کامپوننت نباید هرگز propهای خودش را تغییر دهد.
این تابع `sum` را در نظر بگیرید:

```js
function sum(a, b) {
  return a + b;
}
```

اینگونه توابع  ["خالص یا pure"](https://en.wikipedia.org/wiki/Pure_function) نامیده می‌شوند زیرا سعی نمی‌کنند که ورودی خود را تغییر دهند و همیشه با ورودی‌های ثابت و مشخص خروجی‌های ثابتی را نمایش می‌دهند.

در نقطه متقابل این کامپوننت "ناخالص یا impure" است زیرا ورودی خود را تغییر می‌دهد:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

ری‌اکت خیلی منعطف است اما یک قانون سختگیرانه دارد:

**تمامی کامپوننت‌های ری‌اکت باید در نسبت با propهای خود همانند توابع خالص عمل کنند.**

البته رابط‌های کاربری اپ‌ها داینامیک هستند و با زمان تغییر می‌کنند. در [بخش بعدی](/docs/state-and-lifecycle.html)، ما یک مفهوم جدید به نام "state" را معرفی می‌کنیم. State به کامپوننت‌های ری‌اکت اجازه می‌دهد تا خروجی خود را با توجه به اعمال کاربر، پاسخ‌های دریافتی از شبکه، و هر چیز دیگر در زمان مورد نیاز بدون اینکه این قانون را نقض کنند تغییر دهند.

