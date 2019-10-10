---
id: introducing-jsx
title: Introducing JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

تعریف متغیر زیر را در نظر بگیرید

```js
const element = <h1>Hello, world!</h1>;
```

<div dir="rtl"> <p>یک تگ عجیب که نه html هست و نه string</p> </div>


  این JSX نامیده می شود که یک افزونه سینتکس برای جاوا اسکریپت هست . ما توصیه می کنیم برای ری اکت از این استفاده شود تا مشخص شود که رابط کاربری چگونه باید باشد . JSX ممکن است زبان قالبی را برای شما تداعی کند ولی این به صورت کامل از جاوا اسکریپت قدرت گرفته است .


 JSX  "المنت های " ری اکت را تولید می کند  . ما در بخش بعد به موضوع رندر این در DOM خواهیم پرداخت [بخش بعدی](/docs/rendering-elements.html).در ادامه, شما ملزومات JSX را برای شروع خواهید آموخت.

### چرا JSX? {#why-jsx}

ری اکت این  واقعیت که منطق رندر  ذاتا متصل به دیگر منطق های رابط کاربری است را می پذیرد : چگونه رویداد ها مدیریت می شوند, چگونه state ها تغییر می کنند, و چگونه داده برای نمایش در صفحه آماده می شود .

به جای جدا سازی  *تکنولوژی ها* با قرار دادن نشانه گذاری ها و منطق ها در فایل های جداگانه, ری اکت  [separates *concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) با واحد های آزاد همراهی که "کامپوننت " نامیده می شوند هر دو را در نظر می گیرد. ما به مبحث کامپوننت می پردازیم در [بخش بعدی](/docs/components-and-props.html), اما اگر شما هنوز با نشانه گذاری در js راحت نیستید , [این سخنرانی](https://www.youtube.com/watch?v=x7cQ3mrcKaY) می تواند شما را راه بندازد.

ری اکت [نیازی نیست لزوما](/docs/react-without-jsx.html) از JSX استفاده می کند, اما خیلی از مردم آن را  به عنوان یک  کمک رسان دیداری یاری کننده می دانند وقتی که با رابط  کاربری در جاوااسکریپت کار می کنند . آن همچنین به ری اکت اجازه می دهد تا ارور های مفید و warning های بیشتری را نمایش دهد .

با این حال بیایید شروع کنیم .

### قرار دادن عبارات در JSX  {#embedding-expressions-in-jsx}

در مثال زیر, ما یک متغیر به نام `name` داریم و از آن در JSX استفاده می کنیم  با قرار آن در پرانتز:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

شما می توانید [عبارات جاوا اسکریپتی ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)  را در پرانتز قرار دهید . برای نمونه, `2 + 2`, `user.firstName`, یا `formatName(user)` عبارات جاوااسکریپتی درستی هستند.

در مثال زیر , ما نتیجه فراخوانی تابع را , `formatName(user)`, در یک تگ  `<h1>`  قرار داده ایم.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

ما برای خوانایی بیشتر , JSX را در خطوط جداگانه قرار داده ایم. در حالی که این الزامی نیست ,هنگام انجام این کار , ما همچنین پیشنهاد می کنیم که این را در پرانتز قرار دهید تا از  مشکلات مثل این جلوگیری شود [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

### JSX هم یک عبارت است{#jsx-is-an-expression-too}

بعد از کامپایل شدن, عبارات JSX به تابع های معمول جاوااسکریپت و object های جاوا اسکریپتی معین تبدیل می شوند.

این بدان معناست که شما می توانید از JSX در `if` و`for` استفاده کنید, آن را به یک متغیر اختصاص دهید, آن را به عنوان آرگومان قبول کنید, و از یک تابع آن را برگردانید:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### مشخص کردن خصوصیت ها با JSX  {#specifying-attributes-with-jsx}

شما ممکن است از نقل قول برای مشخص کردن  string به عنوان خصوصیت استفاده کنید:

```js
const element = <div tabIndex="0"></div>;
```

شما ممکن است از پرانتز  برای  قرار دادن عبارت جاوااسکریپت  در یک خصوصیت استفاده کنید :

```js
const element = <img src={user.avatarUrl}></img>;
```

نقل قول را دور پررانتز قرار ندهید وقتی که یک عبارت جاوااسکریپت را به عنوان یک خصوصیت قرار می دهید . شما باید از نقل قول  (برای مقادیر string ) یا پرانتز  (برای عبارات) استفاده کنید , اما از هر دو  دریک جا استفاده نکنید.

>**اخطار:**
>
>تا الان JSX  به جاوااسکریپت نزدیک تر بوده تا HTML, DOM ری اکت از قرارداد `camelCase` برای نام گزاری ویژگی ها به جای نام های موجود  برای خصوصیات HTML , استفاده می کند.
>
>برای نمونه, `class` می شود [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) در JSX, و `tabindex` می شود [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### مشخص کردن فرزند ها با JSX {#specifying-children-with-jsx}

اگر یک تگ خالی بود , شما خیلی سریع باید آن را  با `/>` ببندید, همانند XML:

```js
const element = <img src={user.avatarUrl} />;
```

تگ های JSX ممکن است فرزندانی داشته باشند:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX از حملات injection جلوگیری می کند{#jsx-prevents-injection-attacks}

 مطمئن است که ورودی کاربر را در JSX قرار دهیم:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

به صورت پیش فرض, DOM  ری اکت  [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) مقادیر را قبل از رندر کردن آن ها در JSX قرار می دهد. بنابراین این اطمینان می دهد که شما, نمی توانید هیچ وقت چیزی را به کدتان تزریق کنید که در برنامه شما, به طور صریح وجود نداشته باشد. همه چیز قبل از شروع رندر به string تبدیل می شود. این کمک می کند برای جلو گیری ازحملات [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting).

### نمایش اشیا JSX {#jsx-represents-objects}


Babel , JSX را به این فراخوانی تابع `React.createElement()` تبدیل می کند .


این مثال ها هر دو یکسان هستند:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` کمی ارزیابی انجام می دهد برای اینکه به شما کمک کند کد هایی با خطای کمتر بنویسید ولی اساسا یک شی شبیه این را می سازد:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

این اشیا  "عناصر ری اکت " نامیده می شوند . شما می توانید به عنوان توصیف از چیزی که در صفحه مشاهده می کنید به آن فکر کنید    . ری اکت این اشیا را می خواند و از آن ها برای شکل دادن به DOM  و آپدیت آن استفاده می کند.

در بخش بعد ما رندر عناصر ری اکت را در DOM بررسی خواهیم کرد.

>**نکته:**
>
>ما توصیه می کنیم که از["Babel" language definition](https://babeljs.io/docs/editors) برای ادیتور مد نظرتان استفاده کنید که این کدهای  JSX و ES6 را به درستی برجسته کرده است . این وبسایت از این  [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) الگوهای رنگی که با سینتکس مطابق است استفاده می کند.
