---
id: tutorial
title: "آموزش: مقدمه‌ای بر ری‌اکت"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

فرض این آموزش بر این است که شما هیچ دانش قبلی از ری‌اکت ندارید.

## قبل از اینکه آموزش را شروع کنیم {#before-we-start-the-tutorial}

در طول این آموزش، ما یک بازی کوچک خواهیم ساخت. **ممکن است قصد داشته باشید که از خواندن آن صرف‌نظر کنید، چون‌که شما قصد بازی‌سازی ندارید، اما به آن فرصتی دهید**. تکنیک‌های مورد استفاده در این آموزش، مبانی ساخت هر برنامه ری‌اکت است و تبحر در آن می‌تواند به شما درک عمیقی از ری‌اکت دهد.

>نکته
>
>این آموزش برای افرادی طراحی شده که ترجیح می‌دهند به صورت پروژه‌محور و با حل مثال‌ها، مباحث را بیاموزند. در صورتی که تمایل دارید مسائل را از پایه بیاموزید به [راهنمای گام‌به‌گام ری‌اکت](/docs/hello-world.html) رجوع کنید. شاید برای شما این آموزش و راهنمای گام‌به‌گام مکمل هم‌دیگر باشند.

این آموزش به چند بخش تقسیم می‌شود:

* [آماده‌سازی](#setup-for-the-tutorial): آماده‌سازی سیستم و نصب ابزارهای مورد نیاز
* [بررسی اجمالی](#overview): یادگیری **مفاهیم اصلی**  ری‌اکت مثل کامپوننت‌ها، props و state
* [کامل کردن بازی](#completing-the-game): یادگیری **مهم‌ترین تکنیک‌های برنامه‌نویسی** ری‌اکت
* [اضافه کردن دکمه‌ی برگشت](#adding-time-travel): یک **دید عمیق‌تر** به توانایی‌های منحصر به فرد ری‌اکت.

برای دریافت نکات و یادگیری بهتر، خوب است که به جای خواندن و تمام کردن همه‌ی بخش‌های این آموزش، آن‌ها را مرور و تمرین و تکرار کنید هرچند که ممکن است اینکار باعث شود که مقدار بخش‌های کم‌تری را در طول زمان معینی بخوانید ولی این کار را بسیار به شما توصیه می‌کنیم.

### چه خواهیم ساخت؟ {#what-are-we-building}

در این آموزش، با استفاده از ری‌اکت در نهایت یک بازی tic-tac-toe یا همان دوز با رابط تعاملی می‌سازیم.

می‌توانید کد نهایی بازی را از **[نتیجه‌ی نهایی](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)** بررسی کنید. اگر چیزی متوجه نشدید و نحوه‌ی نگارش کدها برایتان ناآشنا بود نگران نباشید به زودی آشنا خواهید شد و بدانید که هدف این آموزش این‌است که درک خوبی از ری‌اکت و نحوه‌ی نگارش آن به دست آورید.

شدیدا توصیه می‌شود قبل شروع این آموزش، به خود بازی نگاهی بیندازید. یکی از ویژگی‌هایی که باید به آن توجه کنید لیست عددهایی است که در سمت راست بازی نمایش داده می‌شوند. این‌ها یک تاریخچه از حرکت‌هایی بازی را نشان می‌دهند و در طول بازی تغییر میکند.

حالا اگر با این بازی آشنایی دارید می‌توانید آن را ببندید. ما ابتدا از قالب ساده‌تری شروع می‌کنیم و در مرحله‌ی بعد شما را آماده می‌کنیم تا شروع به ساخت بازی کنید.

### پبش‌نیاز‌ها {#prerequisites}

در این آموزش فرض شده که شما مهارت‌هایی در زمینه‌ی HTML و جاوا اسکریپ دارید ولی در غیر این صورت اگر از یک زبان برنامه‌نویسی دیگری می‌آیید هم نباید برایتان مشکلی پیش بیایید. ما همچنین فرض می‌کنیم که شما با مفاهیم برنامه‌نویسی همچون توابع، شیءها، آرایه‌ها، و کمی کلاس‌ها آشنایی دارید.

اگر نیاز به کمی دوره کردن دستورات جاوااسکریپت دارید، پیشنهاد می‌کنیم [این راهنما](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) را مطالعه کنید. توجه داشته باشید که ما همچنین از برخی امکانات ES6 (نسخه‌ی اخیر جاوااسکریپت) استفاده خواهیم کرد همچون [توابع Arrow ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)، [کلاس‌ها](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) و عبارات [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) و [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). شما همچنین می‌توانید از طریق [Babel REPL](babel://es5-syntax-example) چک کنید که کدهای ES6 به چه چیزهایی تبدیل می‌شوند.

## آماده‌سازی  {#setup-for-the-tutorial}

دو راه برای کامل‌کردن این آموزش دارید: می‌توانید کد را در مرورگر خود بنویسید یا یک محیط توسعه لوکال روی رایانه خود آماده کنید.

### روش ۱: نوشتن و اجرای کدها در مرورگر {#setup-option-1-write-code-in-the-browser}

این سریع‌ترین راه برای شروع به یادگیری است!

ابتدا **[کد اولیه](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** را در تب جدید مرورگر باز کنید. یک بازی(البته ناقص) و در سمت دیگر کدهای ری‌اکت را خواهید دید. حالا شما می‌توانید کد‌ها رو تغییر داده و کدهای خودتان را اجرا کنید.

اکنون می‌توانید روش دوم را رد کنید و به بخش **[نمای کلی](#overview)** رفته تا یک نگاهی کلی به ری‌اکت بیندازید.

### روش ۲: راه‌اندازی محیط محلی یا لوکال ری‌اکت {#setup-option-2-local-development-environment}

کاملا اختیاری و برای این آموزش الزامی نیست.

<br>

<details>

<summary><b>اختیاری: دستورات برای دنبال‌کردن آموزش به صورت لوکال با استفاده از ویرایش‌گر متن مورد انتخابتون</b></summary>

این روش نیازمند صرف توان و زمان بیش‌تری برای راه‌اندازی است اما در عوض به شما این اجازه را می‌دهد که با ویرایش‌گر دلخواهتان کدها را ویرایش کنید. در این‌جا این مراحل را باید دنبال کنید:

1.  ابتدا اطمینان حاصل کنید که یک نسخه‌ی اخیر [Node.js](https://nodejs.org/fa/) را بر روی سیستم نصب دارید.
2.   [راهنمای ایجاد یک پروژه‌ی ری‌اکت](/docs/create-a-new-react-app.html#create-react-app) را دنبال کنید تا یک پروژه جدید بسازید.

``` bash
npx create-react-app my-app
```

3. تمامی فایل‌های داخل پوشه‌ی `src/` پروژه‌ی ایجاد شده را پاک کنید.

> نکته:
>
>**به جای پاک کردن کل پوشه‌ی `src` فقط سورس‌کدهای داخل آن را پاک کنید.** در مرحله‌ی بعد آن‌ها را با فایل‌های مورد نظرمان جایگزین خواهیم کرد.

```bash
cd my-app
cd src

# اگر از لینوکس یا مک استفاده می‌کنید:
rm -f *

# یا اگر برروی ویندوز هستید:
del *

# بعد به پوشه‌ی پروژه بر می‌گردیم:
cd ..
```

4. در پوشه‌ی `src/` یک فایل با نام ‍`index.css` و با محتویات [این کد CSS](https://codepen.io/gaearon/pen/oWWQNa?editors=0100) ایجاد کنید.

5. در پوشه‌ی `src/` یک فایل دیگر به نام `index.js` با متحویات [این کد جاوااسکریپت](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) ایجاد کنید.

۶. این سه خط را به بالای `index.js` اضافه کنید:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
```

حالا اگر `npm start` را در پوشه‌ی پروژه اجرا و در مرورگر `http://localhost:3000` را باز کنید، باید یک بازی tic-tac-toe خالی ببینید.

برای تنظیم رنگ‌بندی کدها (syntax highlighting) ویرایش‌گر خود، ما دنبال‌کردن [این دستورالعمل‌ها](https://babeljs.io/docs/editors/) را پیشنهاد می‌کنیم.

</details>

### کمک، به مشکل برخوردم کردم! {#help-im-stuck}

اگر به مشکل برخوردید به [منابع کمکی کامیونیتی](/community/support.html) رجوع کنید. به خصوص [Reactiflux Chat](https://discord.gg/reactiflux) می‌تواند روشی سریع برای کمک گرفتن باشد. اگر جوابی دریافت نکردید، یا پیشرفتی حاصل نشد، یک [issue](https://github.com/reactjs/fa.reactjs.org/issues/new) ثبت کنید و ما به شما کمک خواهیم کرد.

## نمای کلی {#overview}

حالا که آماده‌اید بیایید یک دید کلی از ری‌اکت به دست آوریم.

### ری‌اکت چیست؟ {#what-is-react}

ری‌اکت یک کتابخانه کارآمد و انعطاف‌پذیر برای جاوااسکریپت است که به شما این اجازه را می‌دهد که از تکه‌های کوچک و ساده رابط کاربری‌های پیچیده بسازید. این تکه‌های کوچک کامپوننت‌ها(components) نام دارند.

در ری‌اکت چند نوع کامپوننت وجود دارد که با زیر کلاس `React.Component` شروع می‌کنیم:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>لیست خرید برای {this.props.name}</h1>
        <ul>
          <li>اینستاگرام</li>
          <li>واتس‌اپ</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// برای استفاده از کامپوننت ساخته شده میتوان برای مثال آن را به این صورت تعریف کرد: <ShoppingList name="Mark" />
```

به زودی به بخش‌های جالب تگ‌های XML مانند‌ هم می‌رسیم. ما با استفاده از کامپوننت‌ها به ری‌اکت توضیح می‌دهیم که میخواهیم چه چیزی باید روی صفحه نمایان شود. وقتی که داده‌های ما دچار تغییر شود، ری‌اکت به صورت کارآمد کامپوننت‌های ما را به‌روزرسانی و دوباره رندر می‌کند.

در این جا Shopping List **از کلاس کامپوننت ری‌اکت** یا در اصل **از نوعی کامپوننت ری‌اکت** است.  در ری‌اکت هر کامپوننت میتواند پارامترهایی را هنگام فراخوانی دریافت کند که به آن‌ها `props` (کوتاه شده‌ی "properties" به معنی "ویژگی‌ها") گفته می‌شود و سلسله‌مراتبی از چشم‌اندازهایی که باید بر روی صفحه نمایش داده شوند از طریق متد `render` برگشت می‌دهد.

متد `render` *توضیحاتی* مربوط به عناصری که می‌خواهیم بر روی صفحه‌نمایش ببینیم را بر می‌گرداند و سپس ری‌اکت توضیحات را دریافت کرده و نتیجه را بر روی صفحه نمایش می‌دهد. در اصل متد `render` یک **المنت ری‌اکت** بر می‌گرداند که توضیح مختصری درباره‌ی آن‌چیزی که باید رندر شود، در بردارد. اکثر برنامه‌نویسان ری‌اکت همچون کد بالا از "JSX" برای مشخص کردن و قرار دادن عناصر استفاده می‌کنند که باعث می‌شود نوشتن ساختار تگ‌ها آسان‌تر شود. برای مثال در JSX به جای ساخت المنت با دستور`React.createElement("div")` از `<div />` استفاده می‌شود. این کدهای شبه XML در زمان تحلیل به نوع اصلی و اشیاء جاوااسکریپت تبدیل می‌گردند. برای مثال در متد `render` مثال بالا می‌توان از این کد استفاده کرد:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[مشاهده‌ی کد کاملا گسترش یافته.](babel://tutorial-expanded-version)

اگر کنجکاو هستید `createElement()` در [مرجع API](/docs/react-api.html#createelement) با جزئیات بیشتری توضیح داده شده است ولی در این آموزش از آن استفاده نخواهیم کرد و با JSX ادامه خواهیم داد.

در JSX نیز شما می‌توانید از تمام قدرت جاوااسکریپت بهره‌مند شوید، تنها کافی است *هر* [عبارت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions) جاوااسکریپتی که میخواهید را درون آکولاد قرار دهید. هر المنت ری‌اکت دراصل یک شیء جاوااسکریپت است که می‌تواند در یک متغیر ذخیره شود یا به نقاط مختلف برنامه پاس داده‌شوند.

در بالا کامپوننت `ShoppingList` تنها چند کامپوننت توکار DOM مثل `<div />` و `<li />` را رندر می‌کند. اما شما می‌توانید کاپوننت‌های سفارشی ری‌اکت ساخته و رندر کنید. برای مثال ما می‌توانیم با نوشتن `<ShoppingList />` به کل لیست خرید ارجاع دهیم. در ری‌اکت همه کامپونتت‌ها محصور شده و به صورت مستقل عمل می‌کنند. همین ویژگی به شما اجازه می‌دهد از کامپوننت‌های ساده رابط‌های گرافیکی پیچیده بسازید.

### بررسی کد اولیه {#inspecting-the-starter-code}

اگر ری‌اکت را **از طریق مرورگر** اجرا می‌کنید، **[کد اولیه](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** را در یک تب جدید باز کنید و در صورتی که ری‌اکت را به صورت **محلی** نصب کرده‌اید در پوشه‌ی پروژه‌ی خود `src/index.js` را با ویرایش‌گر دلخواه خود باز کنید.(شما قبلا در طول [راه‌اندازی محیط لوکال](#setup-option-2-local-development-environment) این فایل را ایجاد کرده بودید)

این کد اولیه پایه‌ی اصلی بازی ماست و ما بازی را بر روی آن پیاده‌سازی می‌کنیم. ما قبلا کدهای CSS مورد نیاز را برای شما قرار داده‌ایم تا شما فقط روی یادگیری ری‌اکت و برنامه‌نویسی بازی tic-tac-toe تمرکز کنید.

با کمی نگاه و بررسی کد‌ها متوجه خواهید شد که در آن سه کامپوننت ری‌اکت وجود دارد:

* Square
* Board
* Game

کامپوننت Square یک `<button>` رندر می‌کند و هر کامپوننت Board، نُه Square را رندر می‌کند. کامپوننت Game هم یک  Board  به همراه مقادیر اولیه که بعدا آن‌ها را تغییر می‌دهیم رندر می‌کند. فعلا در این کد هیچ کامپوننت تعاملی و فعالی وجود ندارد.

### گذر دادن اطلاعات از طریق Props {#passing-data-through-props}

وقت آن رسیده تا شروع به کامل کردن کد اولیه کنیم. کاری که در ابتدا انجام می‌دهیم آن است که مقداری داده را از کامپوننت Board به Square انتقال دهیم.

شدیدا به شما توصیه می‌کنیم که به جای کپی پیست کردن کدها، آن‌ها را تایپ کنید. این ترفند به شما کمک می‌کند که درک بهتری از ری‌اکت و مفاهیم آن پیدا کرده و حافظه عضلانیتان را نیز تقویت کنید.

اکنون در متد `renderSquare` کد را به صورت زیر تغییر می‌دهیم تا یک prop به نام `value` را به Square بفرستیم:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}
```

حال برای نمایش مقدار value در مربع‌ها ‍‍‍‍`{this.props.value}‍` را جایگزین `{/* TODO /*}` می‌کنیم. در نهایت کلاس Square ما به این شکل خواهد بود:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

قبل از اعمال تغییرات:

![React Devtools](../images/tutorial/tictac-empty.png)

بعد اعمال: شما باید عددی را در هر مربع در خروجی رندرشده ببینید.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[مشاهده‌ی کد کامل تا اینجا](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

تبریک، شما یک prop را از کامپوننت Board والد به یک کامپوننت  Square فرزند انتقال دادید. عبور دادنpropها نحوه جریان اطلاعات در برنامه‌های ری‌اکتی است. از والد به فرزند.

### ساخت یک کامپوننت تعاملی {#making-an-interactive-component}

بیایید کاری کنیم که وقتی روی هر کامپوننت Square کلیک شد، روی آن "X" را نمایش داده شود.
ابتدا تگ button را که از کامپوننت Square برگشت داده می‌شود را تغییر می‌دهیم:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { console.log('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

اگر اکنون بر روی یک مربع کلیک کنید، باید 'click' را در کنسول devtools مرورگر خود مشاهده کنید.

>نکته
>
>در اینجا و از این به بعد برای اینکه در تایپ کردن صرفه‌جویی کرده و [سردگمی هنگام کار با `this` ](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) خلاص شویم در کنترل رخدادها و مانند کد پایین از [توابع Arrow](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) استفاده می‌کنیم:
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => console.log('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
> دقت کنید با استفاده از `onClick={() => console.log('click')}` *یک تابع* را به عنوان prop `onClick` این دکمه قرار داده‌ایم پس ری‌اکت تنها بعد از هر کلیک این تابع را اجرا خواهد کرد. فراموش‌کردن `() =>` و نوشتن `onClick={console.log('click')}` یک اشتباه بسیار رایج است که باعث می‌شود هر زمانی که ری‌اکت کامپوننت را دوباره رندر می‌کند پیاممان نشان داده شود.

به عنوان مرحله‌ی بعدی، می‌خواهیم کامپوننت Square "به خاطر بسپارد" که کلیک می‌شود و علامت  "X" نمایش دهد. برای اینکه کامپوننتی چیزی را به خاطر بسپارد از **state** استفاده می‌کنیم.

برای استفاده از state، ابتدا باید `this.state` را در constructor آن تعریف کنیم. `this.state` باید به عنوان خصوصی (private) برای کامپوننت ری‌اکتی که در آن تعریف شده است در نظر گرفته شود. حال بیایید مقدار فعلی Square را در `this.state` ذخیره کرده و هر زمان که روی آن‌ها کلیک شد آن را تغییر دهیم.

ابتدا متد constructor را به منظور مقدار دهی اولیه state ایجاد می‌کنیم:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => console.log('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>نکته
>
>در [کلاس‌های جاوااسکریپت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)، باید همیشه در هنگام ساخت constructor یک کلاس که از یک کلاس دیگر منشعب می‌شود(ارث می‌برد)، `super` را صدا بزنیم. پس همه‌ی کامپوننت‌های ری‌اکت که نیازمند به متد `constructor` هستند باید با صدازدن `super(props)` شروع شوند.

اکنون متد `render` Square را طوری تغییری ‌می‌دهیم تا زمانی که کلیک شد مقدار فعلی state را نمایش دهد:

* در تگ `<button>` عبارت `this.props.value` را با `this.state.value` جایگزین کنید.
* عبارت `onClick={...}` را با ` onClick={() => this.setState({value='X'})}` جایگزین کنید.
* برای خوانایی بیش تر propهای `className` و `onClick` را در خط های جداگانه قرار دهید.

بعد از این تغییرات باید تگ ‍`<button>` که از متد `render` Square برگشت داده می‌شود چیزی شبیه به این باشد:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

با صدا زدن `this.setState` از کنترلر `onClick` واقع در متد `render` Square، به ری‌اکت می‌گوییم هر زمانی که ‍`<button>` کلیک شد، Square را دوباره رندر کند. بعد از به‌روزرسانی مقدار `this.state.value` Square برابر `'X'`خواهدشد تا `X` بر روی صفحه بازی ظاهر می‌شود. اگر روی هر Square کلیک کنید ، X باید نشان داده شود.

وقتی که متد `setState` را درون یک کامپوننت صدا می‌زنید، ری‌اکت به صورت اتوماتیک کامپوننت‌های فرزند درون آن را نیز دوباره به‌روزرسانی می‌کند.

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### ابزارهای برنامه‌نویسان {#developer-tools}

  افزونه‌ی React Devtools را برای [کروم](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) یا [فایرفاکس](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) نصب کنید. این افزونه به شما اجازه می‌دهد کامپوننت‌های ری‌اکت را در قسمت developer tools مرورگر خود مشاهده و بازبینی کنید. [در اکثر مرورگرها با فشردن دکمه‌ی F12 وارد قسمت برنامه نویسان خواهید شد.]

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

با استفاده از افزونه React DevTools میتوانید propها و stateهای هر کامپوننت را چک و مورد بررسی قرار دهید.

بعد از نصب افزونه با راست‌کلیک‌کردن روی هر المنت درون صفحه و انتخاب گزینه‌ی Inspect صفحه‌ی developer tools باز شده و تب‌های ری‌اکت ("⚛️ Components" و  "⚛️ Profiler") در آخرین تب در سمت راست ظاهر می‌شود. از "⚛️ Components" برای بررسی درخت کامپوننت‌ها استفاده کنید.

**اما برای این که این افزونه با CodePen هم کار کند نیازمند چند کار کوچک هستیم:**

1. ثبت نام یا ورود کرده و در صورت ثبت نام ایمیل خود را تایید کنید (این کار به منظور جلوگیری از هرزنامه یا اسپم است).
2. روی دکمه‌ی Fork کلیک کنید.
3. روی Change View کلیک کرده و Debug mode را انتخاب کنید.
4. در تب جدید باز شده، developer tools باید دارای تب مخصوص ری‌اکت باشد.

## کامل‌کردن بازی {#completing-the-game}

ما در حال حاضر قطعات اصلی ساخت بازی‌مان را در اختیار داریم و چیزی که هم‌اکنون نیاز داریم این است که روی صفحه‌ی بازی به نوبت "X" و "O" قرار بگیرد و در مرحله‌ی بعد نیاز به راهی داریم تا بتوانیم برنده‌ی بازی را تعیین کنیم.

### بالا بردن state (انتقال state به کامپوننت‌های بالا‌تر) {#lifting-state-up}

هم اکنون هر Square یک state مربوط به خودش را نگه می‌دارد. برای یافتن برنده ما نیازمندیم مقدارهای همه مربع ها را در یک جا داشته باشیم.

شاید تصور کنید Board باید از هر Square مقدار state را بپرسد و در مکانی ذخیره کند. با اینکه این حالت در ری‌اکت امکان پذیر است اما پیشنهاد می‌کنیم که از آن استفاده نکنید زیرا که باعث سخت شدن فهم کد، مستعد به افزایش باگ‌ها، سخت شدن دوباره‌نویسی و بهبود کد می‌شود. در عوض ما می‌توانیم که حالت و موقعیت بازی را به جای درون هر Square در کامپوننت والدشان یعنی Board ذخیره کنیم. بنابراین Board با فرستادن یک prop به هر Square به او می‌گوید که  چه چیزی را باید نمایش دهد. شبیه به کاری که برای  [فرستادن یک عدد به Square‌ها](#passing-data-through-props) انجام داده بودیم.

**برای جمع کردن داده‌ها از چند کامپوننت فرزند یا داشتن دو کامپوننت فرزند که با هم تعامل و ارتباط داشته باشند نیاز به اعلام state به اشتراک گذاشته‌شده‌یشان در کامپوننت والدشان داریم. کامپوننت والد state را با استفاده از عبوردادن props به فرزندانش منتقل می‌کند. این کار کامپوننت‌های فرزند را با یکدیگر و با کامپوننت والد هماهنگ می کند.**

در اینگونه موارد انتقال state به کامپوننت والد (بالا بردن state) بسیار رایج است، پس بیایید از این فرصت برای امتحانش استفاده کنیم.

یک constructor به Board اضافه می‌کنیم و مقدار اولیه state برای Board را یک آرایه با ۹ عضو (مربوط به ۹ مربع بازی) که مقادیر همگی null است قرار دهید.

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }
```

در طول بازی، آرایه `this.state.squares` چیزی شبیه زیر می‌باشد:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

هم اکنون متد `renderSquare` کامپوننت Board به این صورت است:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

در ابتدا، [prop به نام `value` از طرف Board به هر Square برای نمایش ۰ تا ۸ فرستاده می‌شد](#passing-data-through-props) اما در مرحله‌ی قبل علاوه براین که "X" را جایگزین عدد کردیم مقدار هر Square را نیز  [بر اساس state خودش](#making-an-interactive-component) قرار دادیم. به همین دلیل است که Square هم‌اکنون prop به نام `value` که از طرف Board به آن ارسال می‌شود را نادیده می‌گیرد.

الان دوباره از مکانیزم انتقال prop استفاده خواهیم کرد. ابتدا باید در کلاس Board تغییراتی دهیم تا به هر Square مقدار مخصوصش (`'X'`، `'O'` یا `null`) را بفرستد. ما پیش از این آرایه‌ی `squares` را در متد constructor مربوط به Board تعریف کرده‌ایم و الان تنها نیاز است تغییراتی را در متد `renderSquare` کلاس Board ایجاد کنیم تا از آن بخواند:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

هر Square یک prop به نام `value` دریافت می‌کند که دارای یکی از مقادیر `'X'`، `'O'`، یا `null` برای مربع‌های خالی است.

در مرحله‌ی بعد نیاز داریم فرآیندی که هنگام کلیک یک مربع اجرا می‌شود را تغییر دهیم. هم اکنون Board، لیست مقدار مربع‌ها را در خود نگه می‌دارد و کاری که باید انجام دهیم این است که راهی ایجاد کنیم تا در هنگام بازی Square‌ها بتوانند مقدار state بورد را به روز کنند. توجه کنید که state‌ها به صورت خصوصی هستند و از کامپوننت‌های دیگر قابل دسترسی و تغییر نیستند.

اما به جای آن می‌توانیم تابعی را(برای تغییر state مربع‌ها) از Board به Square فرستاده تا Square هر وقت لازم داشت (در این‌جا کلیک) آن را صدا بزند. پس متد `renderSquare` را به شکل زیر تغییر می‌دهیم:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

> نکته
>
>برای خوانایی بیش‌تر، المنتی که تابع برمی‌گرداند را در خط‌های جداگانه می‌نویسیم و آن‌های را درون پرانتز قرار می‌دهیم تا جاوااسکریپت یک سمی‌کالن را به بعد از `return` اضافه نکند و کد ما را از کار نیندازد.

حالا دو prop از Board به Square می‌فرستیم: `value` و `onClick`. prop به نام  `onClick` یک تابع است که Square می‌تواند هر وقت کلیک شد آن را اجرا کند. تغییرات زیر را در Square ایجاد می‌کنیم:

* جایگزین کردن `this.state.value` با `this.props.value` در متد `render` مربوط به Square
* جایگزین کردن `this.setState()` با `this.props.onClick()` در متد `render` مربوط به Square
* حذف `constructor` از Square چون که Square دیگر حالت بازی را در خود ذخیره نمی‌کند

بعد از این تغییرات، کد کامپوننت Square شبیه به این می‌باشد:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

وقتی که یک Square کلیک شد تابع `onClick` که از Board می‌آید، صدا زده می‌شود. در این‌جا مروری بر چگونگی بدست آمدن این رخداد می‌کنیم:

<<<<<<< HEAD
1. prop به نام `onClick` در کامپوننت `<button>` که از پیش تعریف شده در DOM است برای ری‌اکت به این معناست که یک شنونده برای رویداد کلیک(click event listener) برای او تعریف کن.
2. وقتی که دکمه کلیک شد، ری‌اکت کنترل کننده‌ی رویداد `onClick` که در متد `render()` کامپوننت Square تعریف شده را صدا می‌زند.
3. کنترل کننده‌ی رویداد در زمان کلیک `this.props.onClick()` را صدا می‌زند. این prop از طرف Board تعریف شده بود.
4. از آنجایی که کامپوننت Board `onClick={() => this.handleClick(i)}` را به هر Square می‌فرستد، Square دستور `this.handleClick(i)` را در هنگام کلیک شدنش اجرا می‌کند.
5. چون هنوز متد `handleClick()` را نساخته‌ایم، کد ما کرش خواهد کرد و اگر روی یک مربع کلیک کنید بر روی صفحه خطایی شبیه به "this.handleClick is not a function" پدیدار می‌شود.
=======
1. The `onClick` prop on the built-in DOM `<button>` component tells React to set up a click event listener.
2. When the button is clicked, React will call the `onClick` event handler that is defined in Square's `render()` method.
3. This event handler calls `this.props.onClick()`. The Square's `onClick` prop was specified by the Board.
4. Since the Board passed `onClick={() => this.handleClick(i)}` to Square, the Square calls the Board's `handleClick(i)` when clicked.
5. We have not defined the `handleClick()` method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like "this.handleClick is not a function".
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb

>نکته
>
>المنت `<button>` به دلیل اینکه یک کامپوننت از پیش ساخته شده (built-in) در DOM است، صفت `onClick` برای ری‌اکت معنای ویژه‌ای دارد (که یک کنترل کننده‌ی رویداد ایجاد برای کلیک ایجاد می‌کند). اما در کامپوننت‌های سفارشی مثل Square، نام‌گذاری‌اش دست شماست. ما می‌توانیم هر اسمی را به prop به اسم `onClick` یا متد `handleClick` بدهیم و کاملا همان کار را انجام دهد. در ری‌اکت مرسوم است که برای prop‌هایی که نماینده‌ی یک رویداد هستند از `on[رویداد]` و برای توابعی که به یک رویداد رسیدگی می‌کنند از `handle[رویداد]` استفاده می‌شود.

همان طور که گفته شد اگر روی Square کلیک کنید به دلیل نبود متد `handleClick`، خطایی دریافت خواهید کرد. حالا زمان آن رسیده که آن را اضافه می‌کنیم:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

بعد از انجام این تغییرات شما دوباره قادر خواهید بود با کلیک بر روی هر مربع، آن‌ها را پر کنید، شبیه به چیزی که قبلا داشتیم ولی با این تفاوت که این بار state به جای Square در Board ذخیره می‌شود و وقتی که state کامپوننت Board تغییر می‌کند، همه‌ی کامپوننت‌های Square به صورت اتوماتیک دوباره رندر می‌شوند. نگهداری state همه‌ی مربع‌ها در Board به ما اجازه می‌دهد که بعدا بتوانیم برنده را مشخص کنیم.

از آن جایی که کامپوننت‌های Square دیگر state نگهداری نمی‌کنند، در زمان نیاز مقدارها را از Board گرفته و در زمان کلیک به Board اطلاع می‌دهند. در اصطلاح ری‌اکت به Square **کامپوننت کنترل‌شده** می‌گویند. Board کنترل کامل بر روی آن‌ها دارد.

به متد `handleClick` نگاه کنید. ما با فراخوانی متد `.slice()` یک کپی از آرایه‌ی `squares` درست می‌کنیم تا آن را به جای آرایه فعلی تغییر دهیم. در بخش بعدی دلیل این کار را توضیح خواهیم داد.

### چرا تغییرناپذیری (Immutability) مهم است؟ {#why-immutability-is-important}

در مثال قبلی دیدید که به جای تغییر دادن مستقیم آرایه‌ی `squares` پیشنهاد دادیم با استفاده از متد `.slice()` یک کپی از آن تهیه کرده و بعد از انجام تغییرات آن را با متغیر اصلی تعویض کنید. در این بخش به تغییرناپذیری (Immutability) و ضرورت و برتری انجام این کار می‌پردازیم.

به طور کلی دو روش برای تغییر مقدار یک داده وجود دارد. روش اول این است که مقادیر داده را به صورت مسقیم دگرگون کنیم تا داده *تغییر (mutate)* کند. روش دوم این است که داده را با یک کپی جدید که دارای تغییرات دلخواه است تعویض ‌کنیم.

#### تغییر داده با Mutation (تغییر مستقیم) {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};
player.score = 2;
// اکنون مقدار متغیر تغییر کرده است
```

#### تغییر داده بدون Mutation (تغییر به وسیله تعویض) {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Jeff'};

var newPlayer = Object.assign({}, player, {score: 2});
// اکنون متغیر اصلی تغییر نکرده بلکه متغیر جدید از روی اصلی کپی و بعد تغییر پیدا کرده است

<<<<<<< HEAD
// اگر از نسخه‌ی جدید جاوااسکریپت استفاده می‌کنید می‌توانید اینطور نیز بنویسید
=======
// Or if you are using object spread syntax, you can write:
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb
// var newPlayer = {...player, score: 2};
```

همان‌طور که مشاهده میکنید نتیجه هر دو یکسان است اما با انجام ندادن mutation و تغییر داده به صورت مستقیم چندین مزیت را که در زیر شرح داده شده است، بدست می آوریم.

#### ساخت امکانات پیچیده آسان می‌شود {#complex-features-become-simple}

تغییرناپذیری (Immutability) پیاده‌سازی ویژگی‌های پیچیده را بسیار ساده‌تر می‌کند. بعداً در این آموزش، ما یک ویژگی "سفر در زمان" را پیاده‌سازی می‌کنیم که به ما امکان می‌دهد تاریخچه بازی tic-tac-toe را مرور کرده و به حرکتهای قبلی "بازگشت" بزنیم. این قابلیت مختص بازی‌ها نیست - توانایی باطل‌کردن و دوباره انجام‌دادن برخی از اقدامات یک الزام رایج در برنامه‌هاست. اجتناب از تغییر مستقیم داده‌ها (Mutation) به ما اجازه می‌دهد نسخه‌های قبلی تاریخ بازی را دست نخورده نگه‌داریم و بعداً از آن‌ها استفاده کنیم.

#### تشخیص تغییرات {#detecting-changes}

تشخیص تغییرات در اشیایی که صورت مستقیم تغییر می‌کند بسیار سخت است (منظور از اشیاء همان objects در برنامه‌نویسی شی‌گراست). در این روش نیاز است شئ خود را با کپی‌های نسخه‌ی قبلی خودش و کل درخت شئ مقایسه شود. [برای مثال باید تمام propertiesهای دو شئ جدید و قدیم به صورت درختی (چون هر property میتواند خود دربرگیرنده چند property دیگر باشد) هم مقایسه شوند].

اما تشخیص تغییرات در اشیاء تغییرناپذیر به صورت قابل توجهی ساده‌تر است. اگر آدرس حافظه‌ای که شئ مورد نظرمان در آن قرار دارد با نسخه‌ی قبلی تفاوت داشته باشد، پس آن تغییر کرده.

#### تعیین زمان رندر دوباره برای ری‌اکت {#determining-when-to-re-render-in-react}

فایده اصلی استفاده از Immutability امکان ساخت _pure components_ است. زیرا که تشخیص تغییرات در این نوع بسیار ساده است. ری‌اکت می‌تواند زمانی که تغییری ایجاد شد آن را شناسایی کرده و کامپوننت‌های دچار تغییر را دوباره رندر می‌کند.

شما می‌توانید درباره‌ی متد `shouldComponentUpdate()` و چگونگی ساخت *pure components* از [اینجا](/docs/optimizing-performance.html#examples) اطلاعات کسب کنید. [همان طور که گفته شد تشخیص تغییرات در داده‌های Mutable بسیار سخت است و باعث کندی صفحه می‌شود. بنابر این ری‌اکت همیشه stateها را Immutable فرض می‌کند. به همین دلیل اگر کد بالا را به صورت mutable تغییر می‌دادیم state آن تغییر میکرد اما ری‌اکت متوجه آن نمی‌شد و صفحه را دوباره رندر نمی‌کرد.]

### کامپوننت‌های تابعی {#function-components}

اکنون Square را به یک **کامپوننت تابعی (Function Component)** تبدیل می‌کنیم.

در ری‌اکت، **کامپوننت تابعی** راهی ساده برای ساخت کامپونننت‌های بدون  state و آن‌هایی که تنها متد `render` دارد است. به صورت خلاصه برای ساخت کامپوننت‌های ساده و مختصر از کامپونت تابعی استفاده می‌کنیم. تنها کافی‌ست به جای ساخت کلاسی که از `React.Components` ارث می‌برد یک تابع بنویسیم که `props` را در ورودی دریافت و کد نیاز به رندر را برگرداند. نوشتن کامپوننت تابعی بسیار ساده‌تر از کلاس‌هاست و کامپوننت‌های زیادی را می‌توان به این صورت نوشت.

کلاس Square را با این تابع جایگزین کنید:

```javascript
function Square(props) {
 return (
   <button className="square" onClick={props.onClick}>
     {props.value}
   </button>
 );
}
```

توجه داشته باشید که در این تبدیل نیاز است تمام `this.props`ها را با `props` جایگزین کنیم.

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

> نکته
>
> دقت کنید که وقتی ما Square را به یک کامپوننت تابعی تبدیل کردیم، همچنین عبارت `onClick={() => this.props.onClick()}` را به `onClick={props.onClick}` تغییر دادیم. (به نبود پرانتز در *هر دو طرف* دقت کنید)

### چرخش نوبت {#taking-turns}

ما اکنون نیاز داریم نقضی واضح را در بازی را بر طرف کنیم: هیچگاه "O"ها روی تخته بازی مشخص نمی‌شوند.

اولین حرکت را به صورت پیش‌فرض "X" قرار می‌دهیم. این کار می‌تواند با مقدار دادن اولیه یک state انجام شود. پس آن را در constructor کلاس Board قرار می‌دهیم.

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

هر وقت که مخاطب حرکتی را انجام می‌دهد، متغیر `xIsNext`(که از نوع boolean است) وارون می‌گردد تا مشخص کند نوبت نفر بعدی‌ست. بعد از آن state بازی سیو می‌شود. پس این تغییرات را در متد `handleClick` کلاس Board انجام می‌دهیم تا در زمان کلیک آن را وارون کند:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

با این تغییرات، با هر حرکت نوبت "X"ها و "O"ها تغییر می‌کند و عوض می‌شود. میتوانید امتحان کنید!

بیایید متن "status" را هم در متد `render` بورد عوض کنیم تا به کاربر نشان دهد که حرکت بعدی نوبت کیست:

```javascript{2}
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // بقیه تغییری نمی‌کند
```

بعد از این تغییرات، کامپوننت بوردتان باید به این صورت باشد:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### تعیین برنده {#declaring-a-winner}

اکنون که نشان می‌دهیم نوبت کدام بازیکن است ، وقت آن است زمانی که کسی برنده می‌شود و دیگر نوبت کسی نیست را نیز نشان دهیم. این تابع کمکی را در آخر فایل‌تان اضافه کنید:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

با توجه به آرایه ای از 9 مربع ، این تابع برنده را بررسی می کند و در صورت لزوم ‘X’، ‘O’، یا null را برمی گرداند.

برای چک کردن برنده(و اینکه اصلا کسی برنده شده یا نه) در متد `render` بُرد `calculateWinner(squares)` را صدا می‌زنیم. اگر کسی برنده شده باشد، می‌توانیم متنی مشابه "Winner: X" و یا "Winner: O" روی صفحه نمایش دهیم. پس معرف `status` را در متد `render` کلاس Board با این کد جایگزین می‌کنیم:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // بقیه تغییری نمی‌کند
```

حالا می‌توانیم تغییراتی را در متد handleClick کلاس Board ایجاد کنیم تا با نادیده گرفتن یک کلیک در صورت برنده شدن بازی توسط یکی از دو بازیکن یا اگر مربع در حال حاضر پر شده باشد، زود بازگردد:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

تبریک! شما در حال حاضر یک بازی tic-tac-toe دارید. و هم‌زمان اصول اولیه React را نیز آموخته‌اید. بنابراین احتمالاً *شما* برنده واقعی اینجا هستید.

## اضافه کردن قابلیت ماشین زمان {#adding-time-travel}

به عنوان آخرین تمرین، بیایید "بازگشت به عقب در زمان" به حرکت‌های قبلی را در بازی پیاده سازی کنیم.

### ذخیره‌ی تاریخچه‌ی حرکت‌ها {#storing-a-history-of-moves}

اگر در گذشته آرایه‌ی `squares` را به صورت تغییریافته (Mutation) تعریف کرده بودیم، اکنون پیاده‌سازی ماشین زمان بسیار سخت می‌شد.

با این وجود ما بعد از هر حرکت در بازی ابتدا با استفاده `slice()` یک کپی از آرایه‌ی `squares` گرفته و با آن [به صورت تغییرناپذیر (Immutable) رفتار می‌کردیم](#why-immutability-is-important). این کار اجازه می‌دهد تمامی نسخه‌های قبلی آن را ذخیره کنیم و بتوانیم در بین گام‌های برداشته شده در بازی حرکت کنیم.

تمام نسخه‌های قبلی `squares` را در آرایه‌ای دیگر به نام `history` ذخیره می‌کنیم. پس آرایه‌ی `history` تمام state های کلاس Board را از ابتدا تا آخرین حرکت را دربر خواهد داشت و چیزی شبیه به این خواهد شد:

```javascript
history = [
  // قبل از اولین حرکت
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // بعد از یک حرکت
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // بعد از دومین حرکت
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

اکنون باید تصمیم بگیریم که آرایه‌ی `history` در state کدام کامپوننت باید قرار گیرد.

### بالا بردن دوباره‌ی state {#lifting-state-up-again}

ما نیاز داریم کامپوننت سطح بالای Game لیست تمامی حرکت‌های گذشته را نمایش دهد. برای این کار او نیاز به دسترسی به آرایه‌ی `history` نیاز دارد. پس بهتر است آن را در خود Game قرار دهیم.

قرار دادن `history` به صورت state در کامپوننت Game به ما اجازه می‌دهد تا state به نام `squares` را از فرزندش یعنی Board حذف کنیم. دقیقا شبیه به بخش ["بالا بردن state"](#lifting-state-up) که از Square به Board انتقال داده بودیم، الآن آن را از Board به کامپوننت بالا رده‌ یعنی Game انتقال می‌دهیم. این کار به Game اجازه می‌دهد تا کنترل کامل بر روی داده‌ Board داشته باشد و به Board بگوید تا حرکت‌های قبلی را از `history` رندر کند.

ابتدا نیاز داریم state اولیه را در constructor کامپوننت Game مقدار دهی کنیم:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

در مرحله‌ی بعد کاری می‌کنیم تا prop های به نام `squares` و `onClick` را کامپوننت Board از کامپوننت Game دریافت کند. از آنجا که ما یک کنترل کننده‌ی کلیک برای تعداد زیادی Square داریم، نیاز است تا مکان هر یک از آن‌ها را نیز به کنترلر `onClick` بفرستیم تا نشان دهد که کدام مربع کلیک شده است. در اینجا چند مرحله برای تغییر دادن کامپونت Board لازم است:

* حذف متد `constructor` از Board
* جایگزین کردن `this.state.squares[i]` با `this.props.squares[i]`
* جایگزین کردن `this.handleClick(i)` با `this.props.onClick(i)` در متد `renderSquare` بورد.

هم‌اکنون کلاس Board باید به این صورت باشد:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

همچنین باید در متد `render` کامپوننت Game تغییراتی بدهیم تا از آخرین عضو متغیر `history` برای مشخص کردن و نمایش حالت بازی استفاده کند:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

از آنجایی که Game حالت بازی را رندر می‌کند. می‌توانیم کدهای اضافی را از متد `render` کلاس Board پاک کنیم. بعد از پاکسازی، تابع `render` کلاس Board باید چیزی شبیه به این شود:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

در نهایت، ما نیاز داریم متد `handleClick` را از کامپوننت Board به کامپوننت Game منتقل کنیم. همچنین نیاز داریم کمی آن را تغییر دهیم زیرا که ساختار state کامپوننتGame کمی متفاوت است. در متد `handleClick` کامپوننت Game ورودی‌های جدید تاریخچه را به `history` الحاق می‌کنیم.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

> نکته
>
> برخلاف متد `push()` آرایه‌ها که احتمالا با آن بیشتر آشنایی دارید، متد `concat()` آرایه‌ی اصلی را تغییر نمی‌دهد، پس ما آن را به `push()` ترجیح می‌دهیم.

در این‌جا کامپوننت Board تنها به متدهای `renderSquare` و `render` نیاز دارد. state بازی و متد `handleClick` باید در کامپوننت Game قرار گرفته باشند.

**[مشاهده‌ی کد کامل در این لحظه](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### نمایش حرکت‌های قبلی {#showing-the-past-moves}

از آنجا که ما تاریخچه بازی tic-tac-toe را ضبط می کنیم، اکنون می توانیم آن را به عنوان لیستی از حرکات گذشته به بازیکن نشان دهیم.

پیشتر متوجه شدیم که المنت‌های ری‌اکت، اشیاء (object) جاوا اسکریپت درجه یک هستند. ما می توانیم آنها را در برنامه های خود منتقل کنیم. برای رندر چندین آیتم در ری‌اکت، می توانیم از آرایه ای از المنت‌های ری‌اکت استفاده کنیم.

در جاوا اسکریپت ، آرایه ها [دارای متد `map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) هستند که معمولاً برای نگاشت داده‌ها به داده‌های دیگر استفاده می‌شود ، به عنوان مثال:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
```

با استفاده از متد `map`، می‌توانیم سابقه حرکت خود را به المنت‌های ری‌اکت که به صورت دکمه‌هایی روی صفحه نمایانگرهستند نگاشت کنیم، و لیستی از دکمه‌ها را برای "پرش" به حرکت‌های قبلی نمایش دهیم.

بیایید در متد `render` کامپوننت Game، بر روی `history` عملیات `map` را اجرا کنیم:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

<<<<<<< HEAD
بدین صورت، برای هر حرکت در بازی یک ایتم لیست `<li>` درست می‌شود که یک دکمه‌ی `<button>` را دربر دارد. کنترلر `onClick` این دکمه، متد `this.justTo()` را صدا می‌زند که هنوز آن را پیاده‌سازی نکرده‌ایم. ما در حال حاضر باید لیستی از حرکت‌های بازی و این هشدار را در developer tools مرورگرمان ببینیم:
=======
As we iterate through `history` array, `step` variable refers to the current `history` element value, and `move` refers to the current `history` element index. We are only interested in `move` here, hence `step` is not getting assigned to anything.

For each move in the tic-tac-toe game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb

>  Warning:
>  Each child in an array or iterator should have a unique “key” prop. Check the render method of “Game”.

حال بیایید ببینیم دلیل این هشدار چیست.

### برگزیدن یک کلید (key) {#picking-a-key}

وقتی لیستی را رندر می‌کنیم، ری‌اکت اطلاعاتی در مورد هر ایتم لیست ارائه شده ذخیره می‌کند. وقتی لیستی را به‌روز می‌کنیم‌، ری‌اکت باید تعیین کند که چه‌چیزی تغییر کرده است. ما می‌توانستیم آیتم‌های لیست را اضافه، حذف، مرتب یا به روز کرده باشیم.

فرض کنید این لیست را:

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

به این لیست تبدیل کنیم:

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

علاوه بر شمارش‌های به‌روز‌شده، انسانی که این مطلب را بخواند احتمالاً می‌گوید که ما ترتیب Alexa و Ben را عوض کرده و Claudia را بین Alexa و Ben قرار داده‌ایم. اما از آن جایی که ری‌اکت که یک برنامه‌ی کامپیوتری است نمی‌تواند بفهمد چه چیزی اضافه شده‌است. پس نیاز داریم برای این که هر عضو از دیگری متمایز شود، برایشان یک ویژگی *key* تعریف کنیم که مخصوص خودش باشد (منحصر به فرد باشد). در این جا یک گزینه می‌تواند استفاده از مقادیر `alexa` , `ben` و یا `claudia` باشد. اگر این اطلاعات از یک دیتابیس است می‌توانیم آی‌دی (شناسه) آن‌ها را به عنوان key استفاده کنیم.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

هنگامی که یک لیست دوباره رندر می‌شود، ری‌اکت کلید (key) هر آیتم لیست را می‌گیرد و ‌آیتم‌های لیست قبلی را برای یک کلید منطبق جستجو می‌کند. اگر لیست فعلی دارای کلیدی است که قبلاً وجود نداشت، ری‌اکت یک کامپوننت ایجاد می‌کند. اگر لیست فعلی فاقد کلیدی باشد که در لیست قبلی وجود داشت، ری‌اکت کامپوننت قبلی را از بین می‌برد. اگر دو کلید مطابقت داشته باشند، کامپوننت مربوطه منتقل می‌شود. کلیدها در مورد هویت هر کامپوننت به ری‌اکت می‌گویند که به ری‌اکت اجازه می‌دهد بین رندرهای مجدد state را حفظ کند. اگر کلید یک کامپوننت تغییر کند ، کامپوننت از بین می‌رود و با یک state جدید دوباره ایجاد می‌شود.

`key` یک property خاص و رزرو شده در ری‌اکت‌ است (به علاوه‌ی `ref` که یک ویژگی پیشرفته‌ست). هنگامی که یک المنت ایجاد می شود‌، ری‌اکت property به نام `key` را استخراج می‌کند و کلید را مستقیماً روی المنت بازگشتی ذخیره می کند. با اینکه `key` به نظر می‌رسد که متعلق به `props` است‌، نمی توان با استفاده از `this.props.key` به `key` اشاره کرد. ری‌اکت به طور خودکار از `key` برای تصمیم گیری در مورد به‌روزرسانی کامپوننت‌ها استفاده می‌کند. یک کامپوننت نمی‌تواند در مورد `key` خود سوال کند و از آن مطلع شود.

**شدیدا توصیه می‌شود که اگر با لیست‌های داینامیک (تغییر می‌کنند و جا به جا می‌شوند) کار می‌کنید از key مناسب برای هر لیست استفاده کنید.** اگر کلید مناسب ندارید، ممکن است بخواهید داده های خود را تجدید ساختار کنید تا این کار را انجام دهید.

اگر در لیست‌ها ویژگی key را مقدار دهی نکنید، ری‌اکت هشداری خواهد داد و به صورت پیش‌فرض از مکان (اندیس آرایه) هر عضو آن لیست به عنوان key استفاده می‌کند. و این کار می‌تواند بسیار در جابه‌جا، اضافه یا حذف عضو مشکل‌ساز باشد. توجه داشته باشید که هرچند که می‌توانیم با قرار دادن `key={i}` (i اندیس آرایه است) هشدار از بین ببریم اما مشکلات یکسان مثل اندیس آرایه همچنان باقی‌ست و در بیش‌تر موارد توصیه نمی‌شود.

نیازی به خاص بودن کلیدها در کل به صورت جهانی نیست و تنها خاص بودن بین برادر/خواهرهایشان کفایت می‌کند.

### پیاده‌سازی ماشین زمان {#implementing-time-travel}

در تاریخچه‌ی بازی، هر حرکت گذشته یک شناسه‌ی منحصر به فرد دارد و آن نیز مرتبه‌ی آن حرکت است. حرکتها هرگز دوباره مرتب نمی‌شوند، حذف نمی‌شوند یا در وسط قرار داده نمی‌شوند، پس استفاده از مرتبه‌ی حرکت به عنوان key امن است و مشکلی ندارد.

برای اینکه هشدار نبود key از بین برود در متد `render` کامپوننت Game، می‌توانیم key را برابر `{move}` بگذاریم:


```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

با کلیک بر روی هر یک از دکمه‌ها، خطایی به معنای نبود متد `jumpTo` ظاهر می‌شود. بعدا این متد را نیز خواهیم ساخت اما قبل از آن نیاز داریم تا یک state به نام `stepNumber` برای نمایش تعداد گام‌هایی که حرکت انجام گرفته تعریف کنیم.

ابتدا، state به صورت `stepNumber: 0` را به منظور دادن مقدار اولیه در `constructor` کامپوننت Game اضافه می‌کنیم.

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

در مرحله‌ی بعد متد `jumpTo` را به منظور به‌روزرسانی کردن `stepNumber` تعریف می‌کنیم. و همچنین برای اینکه نوبت افراد به‌هم نخورد، اگر گام مورد نظر زوج بود متغیر `xIsNext` برابر true می‌کنیم.

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // این متد تغییری نمی‌کند
  }
```

<<<<<<< HEAD
حال در متد `handleClick` کلاس Game که موقع کلید روی مربع‌ها فعال می‌شود، تغییراتی می‌دهیم.
=======
Notice in `jumpTo` method, we haven't updated `history` property of the state. That is because state updates are merged or in more simple words React will update only the properties mentioned in `setState` method leaving the remaining state as is. For more info **[see the documentation](/docs/state-and-lifecycle.html#state-updates-are-merged)**.

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb

state به نام `stepNumber` که ما اضافه کرده‌ایم منعکس‌کننده حرکت نشان داده‌شده در حال حاضر به کاربر است. پس از انجام یک حرکت جدید ، باید `stepNumber` را با افزودن `stepNumber: history.length` به عنوان بخشی از آرگومان `this.setState` به روز کنیم. این اطمینان می‌دهد که ما بعد از انجام یک حرکت جدید ، همان حرکت را نشان نمی‌دهیم.

<<<<<<< HEAD
ما هم‌چنین به جای خواندن متغیر `this.state.history` آن را با `this.state.history.slice(0, this.state.stepNumber + 1)` عوض می‌کنیم. این تضمین می‌کند که اگر "به عقب برگردیم" و سپس از آن نقطه حرکت جدیدی انجام دهیم ، تمام تاریخ "آینده" را که اکنون نادرست شده‌است دور می‌اندازیم.
=======
We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now be incorrect.
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

در نهایت ، ما متد `render` کامپوننت Game را از این‌که همیشه آخرین حرکت را رندر کند به رندر حرکت انتخاب شده فعلی مطابق stepNumber تغییر می دهیم:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // بقیه بدون تغییر باقی می‌ماند
```

اگر روی هر مرحله از تاریخچه بازی کلیک کنیم، تخته tic-tac-toe باید فوراً به روز شود تا نشان دهد که صفحه بعد از آن مرحله چگونه بوده است.

**[مشاهده‌ی کد کامل در این مرحله](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### جمع‌بندی {#wrapping-up}

 تبریک! یک بازی tic-tac-toe ساختید که:

* به کاربر اجازه می‌دهد tic-tac-toe بازی کند،
* برنده را مشخص و نمایش می‌دهد،
* روند بازی را ذخیره می‌کند،
* می‌گذارد کاربر تاریخچه‌ی بازی را بررسی و به گام‌های انجام داده برگردد.

بسیار خب، امیدواریم درک خوبی از نحوه‌ی کارکرد با ری‌اکت به دست آورده باشید.

نتیجه نهایی را اینجا ببینید: **[نتیجه نهایی](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

اگر وقت اضافه دارید و یا می‌خواهید مهارت خودتان را در ری‌اکت تمرین کنید، در اینجا چند ایده برای بهبودهایی که می توانید در بازی tic-tac-toe ایجاد کنید به ترتیب افزایش دشواری ذکر شده است:

1. نمایش مکان حرکت انجام شده در لیست تاریچه‌ی حرکات
2. درشت شدن (Bold) شدن حرکت جاری در لیست حرکات
3. بازنویسی Board تا از دو حلقه (مثل for) به جای نوشتن دستی  همه‌ی مربع‌ها استفاده کند.
4. درست کردن یک دکمه که حرکات را به صورت صعودی یا نزولی مرتب کند.
5. وقتی که کسی برنده شد، سه مربع که باعث این برد بودند را برجسته کند.
6. هنگامی که هیچ کس برنده نمی‌شود ، پیامی در مورد نتیجه تساوی نشان دهید.

در طول این آموزش با مفاهیم اصلی ری‌اکت همچون المنت‌ها، کامپوننت‌ها، props و state آشنا شدید. برای اطلاع بیش‌تر درباره هر یک از موضوعات می‌توانید به [مستندات ری‌اکت](/docs/hello-world.html). برای اطلاع بیش‌تر درباره‌ی تعریف کامپوننت‌‌ها [مرجع API برای `React.Component`](/docs/react-component.html) را بررسی کنید.
