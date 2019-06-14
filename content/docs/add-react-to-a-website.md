---
id: add-react-to-a-website
title: Add React to a Website
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---


کم یا زیاد، هر اندازه که نیاز دارید از ری‌اکت استفاده کنید.

ری‌اکت از ابتدا برای الحاق شدن تدریجی طراحی شده، و "شما می توانید کم یا زیاد، هر اندازه که نیاز دارید از ری‌اکت استفاده کنید". شاید شما فقط میخواهید که ذره ای از خواص تعاملی را به صفحه موجود خود اضافه کنید. کامپوننت های ری‌اکت یک راه عالی برای این است.

بسیاری از وب‌‌سایت‌ها به صورت برنامه تک-صفحه نیستند و لازم هم نیست باشند. با چند خط کد و بدون ساخت ابزار، ری‌اکت را در قسمت کوچکی از وب‌سایت خود امتحان کنید، شما میتوانید در ادامه کم کم حضور آن را پر رنگ تر کنید، یا آن را در حد یک ابزارک پویا کوچک نگه دارید
---

- [در یک دقیقه ری‌اکت را اضافه کنید](#add-react-in-one-minute)
- [اختیاری: ری‌اکت را با jsx امتحان کنید](#optional-try-react-with-jsx) (no bundler necessary!)

## ری‌اکت را در یک دقیقه اضافه کنید {#add-react-in-one-minute}
در این قسمت ما به شما نشان خواهیم داد که چگونه یک کامپوننت ‌ری‌اکت را به صفحه HTML موجود اضافه کنید، شما میتوانید مراحل را در وبسایت خودتان دنبال کنید، یا یک صفحه HTML خالی برای تمرین بسازید.

هیچ ابزار و یا نصب موارد مورد نیاز پیچیده‌ای در کار نخواهد بود -- **برای تکمیل این بخش، شما فقط به ارتباط اینترنت، و یک دقیقه از زمان خود نیاز دارید**.

اختیاری: [نمونه کامل را دریافت کنید (2KB فشرده شده)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### گام ۱: یک محیط DOM به HTML اضافه کنید {#step-1-add-a-dom-container-to-the-html}
ابتدا، صفحه HTML که میخواهید ویرایش کنید را باز کنید. یک برچسب `<div>` برای مشخص کردن محلی که میخواهید چیزی از ری‌اکت نمایش دهید اضافه کنید. برای مثال:

```html{3}
<!-- ... existing HTML ... -->

<div id="like_button_container"></div>

<!-- ... existing HTML ... -->
```
ما به این `<div>` یک خوصیت `id` اختصاص دادیم. این به اجازه خواهد داد تا آن را از طریق کد JavaScript پیدا کرده و یک کامپوننت ری‌اکت درون آن نمایش دهیم.

>راهنمایی
>
>شما میتوانید یک "محل نمایش" مانند `<div>` در **هرچا** درون برچسب `<body>` قرار دهید. شما میتوانید هر تعداد که نیاز دارید محل نمایش DOM مستقل در یک صفحه داشته باشید. این فضاها معمولا خالی هستند -- ری‌اکت محتوای موجود خود را در این محفظه های DOM جایگزین خواهد کرد.
### گام ۲ : برچسب‌های اسکریپت را اضافه کنید {#step-2-add-the-script-tags}
بعد، سه برچسب `<script>` به صفحه HTML درست بعد از بستن برچسب `</body>` اضافه کنید:

```html{5,6,9}
  <!-- ... other HTML ... -->

  <!-- Load React. -->
  <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- Load our React component. -->
  <script src="like_button.js"></script>

</body>
```
دو برچسب ابتدایی ری‌اکت را بارگزاری می‌کند. سومی کد کامپوننت شما را بارگزاری خواهد کرد.

### گام ۳ : یک کامپوننت ری‌اکت بسازید {#step-3-create-a-react-component}

یک فایل با نام `like_button.js` در کنار صفحه HTML خود بسازید

 **[کد آغازین](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** را باز کنید و محتوای آن را در فایلی که ساخته اید کپی کنید.

>راهنمایی
>
>این کد یک کامپوننت ری‌اکت با نام `LikeButton` تعریف می کند. اگر هنوز کاملا متوجه این کارها  نمی‌وید نگران نباشید -- ما ساخت بلاک ری‌اکت را بعدا در [آموزش عملی](/tutorial/tutorial.html) و [راهنمای مفاهیم اصلی](/docs/hello-world.html) خودمان پوشش خواهیم داد.فعلا، بگذارید که این را رو صفحه نمایش دهیم!‍

بعد از **[کد آغازین](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)**, دو خط زیر را به انتهای `like_button.js` اضافه کنید:

```js{3,4}
// ... کدی آغازینی که کپی کردید ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```
این دو خط کد `<div>` که ما به HTML خود در مرحله اول اضافه کردیم را پیدا می‌کنید، و کامپوننت ری‌اکت دکمه "Like" را داخل آن نمایش خواهد داد.

### همین! {#thats-it}

از گام چهارم خبری نیست. **شما اولین کامپوننت ری‌اکت را به وب‌سایت خودتان اضافه کردید.**

بخش‌های بعدی را برای راهنمایی های بیشتر در مورد اضافه کردن ری‌اکت بررسی کنید.

**[کد اصلی کامل را مشاهده کنید](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[مثال کامل را دریافت نمایید (2KB فشرده شده)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### راهنمایی: استفاده مجدد از یک کامپوننت {#tip-reuse-a-component}

عموما، شما ممکن است که بخواهید کامپوننت ری‌اکت را در چند مکان در صفحه HTML نمایش دهید. اینجا یک مثال که دکمه "Like" را سه بار نمایش می‌دهد و مقداری دیتا به آن می‌افزاید وجود دارد:

[کد اصلی کامل این مثال را مشاهده نمایید](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[مثال کامل را دریافت نمایید (2KB فشرده شده)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>یادداشت
>
>این استراتژی بیشتر زمانی استفاده می‌شود که قسمتهای نیروگرفته از ری‌اکت در یک صفحه، از هم کاملا مجزا هستد. داخل کد ری‌اکت،راحت تر است که از [نوشتار کامپوننت](/docs/components-and-props.html#composing-components) به جای آن استفاده شود.

### راهنمایی: برای ارائه JavaScript را کوچک‌سازی کنید {#tip-minify-javascript-for-production}
قبل از اینکه وب‌سایت خود را برای ارائه منتشر کنید، مطلع باشید که JavaScript کوچک‌سازی نشده میتواند به طور قابل ملاحظه‌ای صفحه شما را برای کاربران کند نماید.

اگر اسکریپت های برنامه خود را کوچک‌سازی کرده‌اید، **سایت شما آماده ارائه خواهد شد** برای اطمینان بیشتر دقت کنید که HTML انتشار یافته ،نسخه‌ای از ری‌اکت که با `production.min.js` خاتمه می‌یابد را بارگزاری می‌کند:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

اگر برای کوچک سازی اسکریپت خود راهی در نظر ندارید, [این جا راهی برای راه اندازی وجود دارد](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## اختیاری: ری‌اکت را با JSX امتحان کنید {#optional-try-react-with-jsx}

در مثال‌های بالا، ما فقط بر روی ویژگی های که به طور اصلی توسط مرورگر پشتیبانی می‌شود تکیه کردیم. دلیل اینکه ما از تابع JavaScript برای صدازدن ری‌اکت برای نمایش چیزی که خواستیم استفاده کردیم این است:

```js
const e = React.createElement;

// Display a "Like" <button>
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```
اگرچه، ری‌اکت همچنین پیشنهاد می‌کند که از [JSX](/docs/introducing-jsx.html) به جای آن استفاده کنید:

```js
// Display a "Like" <button>
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```
این دو تکه کد با هم برابر هستند. در حالی که  **JSX [کاملا اختیاری است](/docs/react-without-jsx.html)**، بیشتر افراد آن را برای نوشتن کدهای رابط کاربری مقید می‌دانند -- هم برای ری‌اکت و هم برای سایر کتابخانه ها.

شما میتوانید توسط [این تبدیلگر](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) با JSX تعامل کرده و با آن آشنا شوید.

### خیلی زود JSX را امتحان کنید {#quickly-try-jsx}

سریع ترین راه برای امتحان کردن JSX در پروژه شما اضافه کردن این برچسب `<script>` در صفحه تان است:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
حالا شما میتوانید از JSX در هر برچسب `<script>` با اضافه کردن خصوصیت `type="text/babel"` استفاده کنید. اینجا [یک مثال از فایل HTML همراه با JSX](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) آورده شده که شما میتوانید آن را دریافت نموده و با آن بازی کنید.

این رویکرد برای آموزش و ساخت نمونه‌های ساده مناسب است. هرچند، این وب‌سایت شما را کند کرده و **برای ارائه کردن مناسب نیست**. وقتی کاملا آماده برای تحول بودید، این برچسب‌های `<script>` و خصوصیت های `type="text/babel"` جدیدی که ایجاد کردید را پاک کنید. به جای آن ، در قسمت بعد شما یک پیش پردازشگر JSX برای تبدیل خودکار تمامی برچسب‌های `<script>` خود راه اندازی خواهید کرد.

### به پروژه خود JSX اضافه کنید {#add-jsx-to-a-project}


اضافه کردن JSX به پروژه به ابزارهای پیچیده مانند تجمیع‌گر یا یک سرور توسعه احتیاجی ندارد. اساسا، اضافه کردن JSX **خیلی شبیه اضافه کردن پیش‌پردازشگر CSS می‌باشد.** تنها چیزی که نیاز دارید، نصب داشتن [Node.js](https://nodejs.org/) بر روی رایانه‌تان می‌باشد.
از طریق terminal وارد پوشه پروژه خود شوید، و این دو فرمان را آنجا کپی کنید:
Go to your project folder in the terminal, and paste these two commands:

1. **کام اول:** `npm init -y` را اجرا کنید  (اگر موفق نبود, [اینجا درستش کنید](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. **گام دوم:**  `npm install babel-cli@6 babel-preset-react-app@3` را اجرا نمایید

>نکته
>
>ما **از npm اینجا تنها برای نصب پیش‌پردازشگر JSX استفاده می‌کنیم;** شما به آن برای چیز دیگری نیاز نخواید داشت. هم ری‌اکت و هم کد برنامه میتواند بدون تغییر برچسب `<script>` باقی بمانند.

تبریک! شما یک **راه اندازی مناسب برای ارائه JSX** به پروژه‌تان اضافه نمودید.


### پیش‌پردازشگر JSX را اجرا کنید {#run-jsx-preprocessor}

یک پوشا با نام `src` بسازید و این فرمان ترمینال را دا محیط آن اجرا کنید:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>یادداشت
>
>`npx` یک اشتباه نوشتاری نیست -- این یک [ابزار اجرا کننده بسته است که همراه npm 5.2+ نصب می‌شود](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>اگر شما با پیغام خطایی با مضمون "You have mistakenly installed the `babel` package" مواجه شدید، ممکن است که [گام قبلی را](#add-jsx-to-a-project) را انجام نداده باشد. آن را در همین پوشه انجام داده، سپس دوباره تلاش نمایید.

منتظر پایان یافتن این نباشید -- این فرمان یک نگهبان خودکار برای JSX را شروع می‌کند.

اگر حالا شما توسط این **[کد آغازین JSX](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)** یک فایل با نام `src/like_button.js` ساخته اید، نگهبان یک فایل `like_button.js` پیش‌پردازش‌‌ شده با کد خالص JavaScript متناسب با مرورگر  خواهد ساخت. وقتی شما فایل اصلی را با JSX ویراش کنید، این تبدیل ها به صورت خودکار دوباره اجرا می‌شود.

بهتر است بدانید که، همچینین به شما اجازه خواهد داد تا از ویژگی های مدرن JavaScript مانند کلاس‌ها بدون نگرانی از ناتوانی مرورگرهای قدیمی استفاده کنید. این ابزاری که از آن استفاده میکنیم Babel نام دارد، و شما می‌توانید درباره آن در [این مستندات](https://babeljs.io/docs/en/babel-cli/) یاد بگیرید.

If you notice that you're getting comfortable with build tools and want them to do more for you, [the next section](/docs/create-a-new-react-app.html) describes some of the most popular and approachable toolchains. If not -- those script tags will do just fine!

اگر متوجه‌اید که با ابزارهای ساخت راحت هستید و میخواهید که آنها برایتان کار بیشتری انجام دهند، [بخش بعدی](/docs/create-a-new-react-app.html) برخی از محبوب‌ترین و قابل رویکرد ترین ابزارها را برایتان توضیح خواهد داد.اکر نه ---آن تگ‌های اسکریپتی به خوبی کار خواهد کرد!