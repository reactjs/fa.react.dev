---
id: forwarding-refs
title: فوروارد کردن ref ها
permalink: docs/forwarding-refs.html
---

<<<<<<< HEAD
ref فوروارد کردن یک تکنیک برای ارسال خودکار یک  [ref](/docs/refs-and-the-dom.html) از طریق یک کامپوننت به فرزندانش می‌باشد. این کار معمولا برای بسیاری از کامپوننت‌ها در اپلیکیشن لازم نیست. به هر حال، در بعضی از کامپوننت‌ها، به خصوص در کامپوننت‌های کتابخانه‌ای با قابلیت استفاده مجدد می‌تواند مفید باشد. رایج‌ترین حالات ممکن در ادامه شرح داده شده‌اند.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Manipulating the DOM with Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
> - [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

Ref forwarding is a technique for automatically passing a [ref](/docs/refs-and-the-dom.html) through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries. The most common scenarios are described below.
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

## فوروارد کردن ref ها به کامپوننت‌های DOM {#forwarding-refs-to-dom-components}

یک کامپوننت `FancyButton` که المنت محلی `button` در DOM را رندر می‌کند در نظر بگیرید:
`embed:forwarding-refs/fancy-button-simple.js`

کامپوننت‌های ری‌اکت جزئیات پیاده سازی، شامل خروجی رندر شده خود را پنهان می‌کنند. کامپوننت‌های دیگر که از `FancyButton` استفاده می‌کنند، معمولا به [بدست آوردن یک ref](/docs/refs-and-the-dom.html) به المنت DOM `button` داخلی **نیازی نخواهند داشت** و این به علت جلوگیری از تکیه بیش از اندازه کامپوننت‌ها به ساختار DOM یک‌دیگر خوب است.

اگرچه چنین کپسوله‌سازی برای کامپوننت‌هایی در سطح اپ مانند `FeedStory` یا `Comment` مطلوب است، برای کامپوننت‌های کوچک که قابلیت استفاده مجدد بسیار زیادی دارند مانند `FancyButton` یا `MyTextInput` نامناسب می‌باشد. این کامپوننت‌ها میل به استفاده شدن در اپ به یک شیوه مشابه به عنوان یک `button` و `input` معمولی DOM دارند و دسترسی به نودهای DOM آن ها برای مدیریت انیمیشن‌ها، focus و selection ممکن است اجتناب ناپذیر باشد.

**فوروارد کردن ref یک قابلیت انتخابی است که به بعضی کامپوننت ها اجازه گرفتن یک `ref` و انتقال آن به فرزندان (به عبارت دیگر, "فوروارد کردن" آن) را می‌دهد.**

در مثال زیر، `FancyButton` از `React.forwardRef` برای گرفتن `ref` که به آن منتقل شده استفاده می‌کند، و سپس آن را به `button` DOM که رندر می‌کند فوروارد می‌کند.

`embed:forwarding-refs/fancy-button-simple-ref.js`

با این روش، کامپوننت‌هایی که از `FancyButton` استفاده می‌کنند، می‌توانند یک ref به نود `button` در DOM بگیرند و در صورت نیاز، به همان شکلی که از یک `button` در DOM مستقیما استفاده می کنند، از این کامپوننت نیز بهره ببرند.

در زیر، یک توضیح مرحله به مرحله از آن‌چه در مثال بالا اتفاق افتاده است را مشاهده می‌نمایید:

1. ما با فراخوانی `React.createRef` و اختصاص آن به متغیر `ref` یک [ref ری‌اکت](/docs/refs-and-the-dom.html) ایجاد می‌کنیم.
1. با مشخص کردن `ref` به عنوان یک خصوصیت JSX، آن را به `<FancyButton ref={ref}>` منتقل می‌کنیم.
1. ری‌اکت آن `ref` را به عنوان آرگومان دوم تابع `(props, ref) => ...` درون `forwardRef` پاس می‌دهد.
1. ما این آرگومان `ref` را با تعیین کردن آن به عنوان یک خصوصیت JSX به `<button ref={ref}>` فوروارد می‌کنیم.
1. وقتی که ref متصل شده‌است، `ref.current` به نود `<button>` در DOM اشاره می‌کند.


>نکته
>
>آرگومان دوم `ref` فقط زمانی که یک کامپوننت را با `React.forwardRef` فراخوانی کنید موجود است. کامپوننت‌های تابعی و بر پایه کلاس معمولی،  آرگومان `ref` را دریافت نمی‌کنند و ref در props نیز در دسترس نمی‌باشد.
>
>فوروارد کردن ref محدود به کامپوننت‌های DOM نیست. شما می‌توانید ref ها را به instance های کامپوننت‌های بر پایه کلاس نیز فوروارد کنید.

## نکته برای نگهدارندگان کتابخانه کامپوننت‌ها {#note-for-component-library-maintainers}

**زمانی که شما شروع به استفاده از `forwardRef` در کامپوننت یک کتابخانه می‌کنید، باید به عنوان یک تغییر مخرب با آن رفتار کنید و یک ورژن major جدید از کتابخانه خود منتشر نمایید.** به این علت که کتابخانه شما، یک رفتار متفاوت قابل توجه (مانند چیزی که ref به آن تخصیص داده شده و چه type هایی export شده‌اند) خواهد داشت و باعث تخریب برنامه‌ها و کتابخانه‌های دیگر که به رفتار قدیمی وابسته هستند می‌شود.


استفاده از `React.forwardRef` مشروط به این‌که وجود داشته‌باشد نیز به دلیل یکسان پیشنهاد نمی‌شود: چرا که چگونگی رفتار کتابخانه شما را تغییر می دهد و برنامه کاربرانتان را زمانی که ری‌اکت خود را ارتقا می‌دهد خراب می‌کند.

## فوروارد کردن ref ها در کامپوننت‌های مرتبه بالاتر {#forwarding-refs-in-higher-order-components}

این تکنیک در [کامپوننت های مرتبه بالاتر](/docs/higher-order-components.html) (شناخته شده به نام HOC ها) نیز، می تواند مفید باشد. بیایید با یک مثال از HOC که prop های کامپوننت را در کنسول، نمایش می‌دهد شروع کنیم:
`embed:forwarding-refs/log-props-before.js`

کامپوننت مرتبه بالاتر "logProps" کل `props` را به کامپوننتی که پوشش داده‌است منتقل می‌کند، بنابراین خروجی رندر شده یکسان خواهد بود. برای مثال، می‌توانیم از این HOC برای مشاهده تمامی prop هایی که به کامپوننت "fancy button" ما منتقل شده‌است استفاده کنیم:
`embed:forwarding-refs/fancy-button.js`


فقط یک اخطار در مورد مثال بالا وجود دارد: ref ها منتقل نمی‌شوند. به علت اینکه `ref` یک prop نیست. مانند `key`، توسط ری‌اکت به شکل متفاوتی کنترل می‌شود. اگر شما یک ref به HOC اضافه کنید، ref به جای کامپوننت دربر گیرنده، به بیرونی ترین کامپوننت پوشاننده (container) اشاره می کند.
این به این معناست که ref تعیین شده برای `FancyButton`، در اصل به کامپوننت `LogProps` متصل خواهد شد:
`embed:forwarding-refs/fancy-button-ref.js`

خوشبختانه، با استفاده از API های `React.forwardRef`، می توانیم به طور صریح ref ها را به کامپوننت داخلی `FancyButton` فوروارد کنیم. `React.forwardRef` یک تابع رندر که پارامترهای  `props` و `ref` را دریافت می‌کند و یک نود ری‌اکت را به عنوان خروجی می‌دهد را می‌پذیرد. برای مثال:
`embed:forwarding-refs/log-props-after.js`

## نمایش یک نام سفارشی در DevTools {#displaying-a-custom-name-in-devtools}

`React.forwardRef` یک تابع رندر می‌پذیرد. React DevTools از این تابع برای بررسی اینکه چه چیزی را برای کامپوننت ref forwarding نمایش دهد استفاده می‌کند.

برای مثال، کامپوننت زیر به عنوان "*ForwardRef*" در DevTools ظاهر می‌شود:

`embed:forwarding-refs/wrapped-component.js`

اگر شما تابع رندر را نامگذاری کنید، DevTools نام آن‌را نیز به‌کار می‌برد. (برای مثال  "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

شما حتی می‌توانید ویژگی `displayName` تابع را تنظیم کنید تا کامپوننتی که پوشش می‌دهید را شامل شود:

`embed:forwarding-refs/customized-display-name.js`
