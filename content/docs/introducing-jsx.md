---
id: introducing-jsx
title: معرفی JSX
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

تعریف متغیر زیر را در نظر بگیرید:

```js
const element = <h1>Hello, world!</h1>;
```

این قاعده بامزه نه یک رشته متنی و نه HTML است.

این JSX صدا زده می‌شود و. یک قاعده توسعه یافته برای جاوااسکریپت می‌باشد. ما استفاده از آن با ری‌اکت را برای تعریف اینکه رابط کاربری باید چه شکلی باشد پیشنهاد می‌کنیم. ممکن است JSX برای شما یک زبان قالب به نظر برسد اما تمام قدرت و امکانات جاوااسکریپت را شامل می‌شود.

JSX المنت‌های ری‌اکت را تولید می‌کند. ما در [بخش بعدی](/docs/rendering-elements.html) نحوه رنرد شدن آن‌ها در DOM را کاوش می‌کنیم. شما می‌توانید مفاهیم پایه‌ای مورد نیاز برای شروع با JSX را پایین‌تر پیدا کنید.

### چرا JSX؟ {#why-jsx}

ری‌اکت این حقیقت را که منطق رندر کردن ذاتا به منطق رابط کاربری مانند: چگونگی کنترل رویدادها، اینکه state در طول زمان چگونه تغییر می‌کند و اینکه داده چگونه برای نمایش آماده می‌شود متصل و وابسته است را پذیرفته‌است.

به جای جداسازی مصنوعی *تکنولوژی‌ها* با قراردادن نشانه‌گذاری و منطق در فایل‌های جداگانه، ری‌اکت با واحد‌هایی با وابستگی بسیار کم که "کامپوننت" نامیده می‌شوند و شامل هر دو هستند [*دغدغه‌ها را جدا کرده است*](https://en.wikipedia.org/wiki/Separation_of_concerns). ما در [بخش‌های آینده](/docs/components-and-props.html) به کامپوننت‌ها برمی‌گردیم اما اگر شما با قرار دادن نشانه‌گذاری در JS راحت نیستید، ممکن است [این گفتگو](https://www.youtube.com/watch?v=x7cQ3mrcKaY) شما را قانع کند.

ری‌اکت به استفاده از JSX [نیاز ندارد](/docs/react-without-jsx.html)، اما بیشتر مردم آن را به عنوان یک کمک بصری در زمان کار کردن با رابط کاربری درون کدهای جاوااسکریپت مفید می‌دانند. همچنین به ری‌اکت اجازه می‌دهد تا خطاها و تذکرهای کاربردی‌تری را نمایش دهد.

با کامل شدن آن بیایید شروع کنیم!

### قراردادن عبارات در JSX {#embedding-expressions-in-jsx}

در مثال زیر، ما یک متغیر به نام `name` تعریف می‌کنیم و سپس با قراردادن آن بین دو آکولاد، از آن در JSX استفاده می‌کنیم.

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

شما می‌توانید هر [عبارت جاوااسکریپت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) معتبری را بین آکولادها در JSX قرار دهید.
برای مثال، `2 + 2`، `user.firstName` یا `formatName(user)`، همه عبارات معتبر جاوااسکریپت هستند.

در مثال زیر، ما نتیجه صدازدن یک تابع جاوااسکریپت به نام `formatName(user)` را درون یک المنت `<h1>` قرار می‌دهیم.

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

ما JSX را در چند سطر برای خوانایی بالاتر تقسیم می‌کنیم. با اینکه ضروری نیست، اما ما پیشنهاد می‌کنیم هنگام انجام این کار، از پوشش در پرانتزها نیز برای جلوگیری از اشتباهات رایج [درج خودکار نقطه‌ویرگول(semicolon)](https://stackoverflow.com/q/2846283) استفاده نمایید.

### JSX نیز یک عبارت است {#jsx-is-an-expression-too}

بعد از کامپایل شدن، عبارات JSX به فراخوانی‌های معمولی توابع جاوااسکریپت تبدیل می‌شوند و به عنوان آبجکت‌های جاوااسکریپتی سنجیده می‌شوند.

این به این معنی است که شما می‌توانید از JSX درون گزاره‌های `if` و حلقه‌های `for` استفاده کنید، به یک متغیر منصوبش کنید، به عنوان یک آگومان قبولش کنید و یا آن را به عنوان نتیجه یک تابع برگردانید:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### تعیین کردن صفات با JSX {#specifying-attributes-with-jsx}

شمامی‌توانید از نشان نقل قول برای تعیین رشته‌های متنی به عنوان صفات استفاده کنید.

```js
const element = <div tabIndex="0"></div>;
```

همچنین می‌توانید از آکولاد برای قراردادن عبارت جاوااسکریپت درون یک صفت استفاده کنید:

```js
const element = <img src={user.avatarUrl}></img>;
```

زمانی که یک عبارت جاوااسکریپت را درون یک صفت قرار می‌دهید از نشان‌های نقل قول در دو طرف آکولادها استفاده نکنید. شما باید یا از نشان‌های نقل قول (برای مقادیر متنی) یا آکولادها (برای عبارات) استفاده کنید، اما نباید از هر دو برای یک صفت استفاده کنید.

>**تذکر:**
>
>از آنجایی که JSX به جاوااسکریپت بیشتر از HTML نزدیک است، DOM ری‌اکت به جای استفاده از نام‌های صفات HTML از نحوه نامگذاری `camelCase` استفاده می‌کند.
>
>برای مثال، `class` در JSX به [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) تبدیل می‌شود و `tabindex` به [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex) تبدیل می‌شود.

### تعیین کردن فرزندان در JSX {#specifying-children-with-jsx}

مانند XML، اگر یک تگ خالی است، می‌توانید فورا با `/>` آن را ببندید.

```js
const element = <img src={user.avatarUrl} />;
```

تگ‌های JSX می‌توانند شامل فرزند باشند:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX از حملات Injection جلوگیری می‌کند {#jsx-prevents-injection-attacks}

قراردادن ورودی کاربر در JSX ایمن است:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

DOM ری‌اکت، هر مقداری که قبل از رندر شدن آن قرارداده شده‌باشد را به صورت پیش‌فرض [رها می‌کند.](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html). بنابراین مطمئن می‌شود که شما هرگز نمی‌توانید چیزی که به صورت صریح در اپلیکیشن شما نوشته‌ نشده‌باشد را تزریق کنید. همه‌چیز قبل از رندر شدن به یک رشته متنی تبدیل می‌شود. این به جلوگیری از حملات [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) کمک می‌کند.

### JSX نمایانگر آبجکت‌ها است {#jsx-represents-objects}

Babel، JSX را به فراخوانی‌های `React.createElement()` کامپایل می‌کند.

این دو مثال زیر یکسان هستند:

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

`React.createElement()` تعداد کمی ارزیابی را برای کمک به نوشتن کد‌های بدون باگ اجرا می‌کند اما اساسا یک آبجکت مانند این تولید می‌کند:

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

این آبجکت‌ها "المنت‌های ری‌اکت" صدا زده می‌شوند. می‌توانید به آ‌ن‌ها به عنوان توضیح چیزی که می‌خواهید روی صفحه ببینید فکر کنید. ری‌اکت این آبجکت‌ها را می‌خواند و از آن‌ها برای ساخت DOM استفاده می‌کند و آن‌ها را به‌روز حفظ می‌کند.

ما در [بخش بعدی](/docs/rendering-elements.html) رندر شدن المنت‌های ری‌اکت در DOM را بررسی می‌کنیم.

>**راهنمایی:**
>
>ما استفاده از [تعریف زبان "Babel"](https://babeljs.io/docs/editors) را برای ویرایشگر مورد نظرتان پیشنهاد می‌کنیم که هم کدهای JSX و هم ES6 به درستی برجسته شوند.