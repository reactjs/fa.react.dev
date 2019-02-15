---
id: hooks-intro
title: معرفی هوک‌ها
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

<p dir="rtl"><em>Hook</em>ها قابلیتی جدید در React 16.8 هستند. آنها امکان استفاده از state و دیگر قابلیت&zwnj;های react را بدون نیاز به نوشتن کلاس به شما می&zwnj;دهند.</p>

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

<p dir="rtl">تابع جدید &#8234;<code>&#8236;useState&#8234;</code>&#8236; اولین &#8234;“&#8236;Hook&#8234;“&#8236;ای است که یاد می&zwnj;گیریم، البته این مثال تنها یک نمایش اجمالی است&#8235;.&#8236; در صورتی که آن را در نیافتید نگران نباشید&#8235;!&#8236;</p>


<p dir="rtl"><b>شما می&zwnj;توانید برای  شروع یادگیری Hookها از <a href="/docs/hooks-overview.html">صفحه&zwnj;ی بعد</a> شروع کنید.</b>
در این صفحه، ما به ذکر دلایلمان برای افزودن هوک&zwnj;ها به react و اینکه آن&zwnj;ها چگونه می&zwnj;توانند به شما کمک کنند تا برنامه&zwnj;های خوبی بنویسید، می&zwnj;پردازیم.</p>


<blockquote dir="rtl">
<p>نکته</p>
<p>ری&zwnj;اکت ۱۶.۸.۰ اولین نسخه منتشر شده است که از هوک&zwnj;ها پشتیبانی می&zwnj;کند. هنگام ارتقاع، فراموش نکنید همه&zwnj;ی پکیج&zwnj;ها شامل React DOM را آپدیت نمایید. React Native در نسخه&zwnj;ی بعدی پایدار از هوک&zwnj;ها پشتیبانی خواهد کرد. </p>
</blockquote>

<h2 dir="rtl" id="video-introduction"><a href="#video-introduction" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path>
</svg></a>معرفی ویدیویی </h2>

<p dir="rtl">در کنفرانس ۲۰۱۸ react، سوفیا آلپرت(Sophie Alpert) و دن آبرامف(Dan Abramov) هوک&zwnj;ها را معرفی کردند. بعد از آن رایان فلورنس (Ryan Florence) نشان داد که چگونه می&zwnj;توان به منظور استفاده از آنها[هوک&zwnj;ها] یک اپلیکیشن را بازنویسی&#8234;(&#8236;refactor&#8234;)&#8236; کرد. ویدیوی زیر را ببینید:</p>

<br>

<div dir="rtl">
          <div class="gatsby-resp-iframe-wrapper" style="padding-bottom: 56.30769230769231%; position: relative; height: 0; overflow: hidden;">
            <iframe src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen="" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          "></iframe>
          </div>
          </div>

<h2 dir="rtl" id="no-breaking-changes"><a href="#no-breaking-changes" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>بدون ایجاد خلل در دیگر قسمت&zwnj;ها </h2>

<p dir="rtl">قبل از اینکه ادامه دهیم، توجه کنید که هوک&zwnj;ها:</p>

<ul dir="rtl">
<li><strong>کاملا اختیاری.</strong> شما می&zwnj;توانید هوک&zwnj;ها را  بدون نیاز به دوباره نوشتن کدهای قبلی، در چند کامپوننت جدید امتحان کنید. ولی شما در صورت عدم تمایل،&zwnj; مجبور به فراگیریی یا استفاده از هوک&zwnj;ها کنید.</li>
<li><strong>۱۰۰٪&zwnj; سازگاری با قبل.</strong> هوک&zwnj;ها با دیگر قسمت&zwnj;&zwnj;ها سازگار می&zwnj;باشد.</li>
<li><strong>قابل استفاده از هم&zwnj;اکنون.</strong> هوک ها هم اکنون از نسخه&zwnj;ی ۱۶.۸.۰ قابل استفاده هستند.</li>
</ul>

<p dir="rtl"><strong>هیچ برنامه&zwnj;ای برای حذف کلاس&zwnj;ها از ری&zwnj;اکت وجود ندارد.</strong> شما می&zwnj;توانید برای مطالعه&zwnj;ی بیشتر در رابطه با راهکار&zwnj;&zwnj;های تطبیق تدریجی با هوک&zwnj;ها از <a href="#gradual-adoption-strategy">بخش پایین</a> همین صفحه استفاده کنید.</p>

<p dir="rtl"><strong>هوک&zwnj;ها جایگزینی برای دانش و فهم شما از ری&zwnj;اکت نیستند.</strong> در عوض، هوک&zwnj;ها یک رابط برنامه&zwnj;ی کاربردی &#8234;(&#8236;API&#8234;)&#8236; صریح&zwnj;تر برای مفاهیم ری&zwnj;اکتی که از قبل می&zwnj;دانید فراهم می&zwnj;کنند: props ،state ،context ،ref و lifecycle. همان&zwnj;طور که بعدا نشان خواهیم داد، هوک&zwnj;ها روشی جدید و قدرتمند برای تلفیق آن&zwnj;ها ارایه می&zwnj;کنند.</p>

<p dir="rtl"><strong>اگر هم&zwnj;اکنون می&zwnj;خواهید یادگیری هوک&zwnj;ها را شروع کنید، <a href="/docs/hooks-overview.html">مستقیم به صفحه&zwnj;ی بعد بروید!</a></strong> البته می&zwnj;توانید مطالعه&zwnj;ی این صفحه را ادامه دهید و با دلایلی که هوک&zwnj;ها را به ری&zwnj;اکت اضافه کردیم و اینکه چگونه بدون بازنویسی اپلیکیشن&zwnj;های قبلی از آن&zwnj;ها استفاده خواهیم کرد، آشنا شوید.</p>

<h2 dir="rtl" id="motivation"><a href="#motivation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>انگیزه </h2>

<h3 dir="rtl" id="its-hard-to-reuse-stateful-logic-between-components"><a href="#its-hard-to-reuse-stateful-logic-between-components" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>استفاده&zwnj;ی مجدد از منطق دارای state در بین کامپوننت&zwnj;ها دشوار است </h3>

<p dir="rtl">ری&zwnj;اکت راهی برای &#8234;“&#8236;چسباندن&#8234;”&#8236; یک رفتار  قابل استفاده&zwnj;ی مجدد یه یک کامپوننت را فراهم نمی&zwnj;کند (برای مثال اتصال به یک store). اگر شما مدتی با ری&zwnj;اکت کار کرده باشید، ممکن است با الگوهایی مانند <a href="/docs/render-props.html">render props</a> و <a href="/docs/higher-order-components.html">higher-order components</a> آشنا باشید که سعی در حل این مسیله دارند.  اما این الگوها شما را مجبور به تغییر ساختار مجدد کامپوننتتان هنگام استفاده&zwnj; از آن&zwnj;ها می&zwnj;کنند، که این مسیله می&zwnj;تواند مایه&zwnj;ی زحمت و سخت&zwnj;تر شدن فهم کد باشد. اگر به یک اپلیکیشن ری&zwnj;اکت نوعی در React DevTools نگاه کنید، احتمالا با “wrapper hell”ای از کامپوننت&zwnj;ها مواجه می&zwnj;شوید. کامپوننت&zwnj;هایی که با لایه&zwnj;هایی از providerها، consumerها، HOCها، render props و دیگر کامپوننت&zwnj;هایی که به تجرید کمک می&zwnj;کنند، احاطه شده&zwnj;اند.  در حالی که ما می&zwnj;توانیم <a href="https://github.com/facebook/react-devtools/pull/503">آن&zwnj;ها را در DevTools فیلتر کنیم</a>، این [مشکل] به یک مسیله&zwnj;ی بنیادین اشاره دارد: ری&zwnj;اکت باید عناصری ابتدایی برای به اشتراک گذاری منطق دارای state فراهم کند.</p>

<p dir="rtl">با استفاده از هوک&zwnj;ها، شما می&zwnj;توانید بخش منطق دارای state را از یک کامپوننت استخراج کنید، بطوری که بطور مستقل بتواند مورد آزمایش و استفاده&zwnj;ی مجدد قرار گیرد. <strong>هوک ها به شما اجازه می&zwnj;دهند که بدون ایجاد تغییر در سلسله مراتب کامپوننت&zwnj;هایتان، از منطق دارای state مجددا استفاده نمایید.</strong> این کار باعث تسهیل در به اشتراک&zwnj;گذاری هوک&zwnj;ها بین کامپوننت&zwnj;های مختلف یا بین جامعه&#8234;]&#8236;ی ری&zwnj;اکت&#8234;[&#8236; می&zwnj;شود.</p>

<p dir="rtl">ما در این رابطه بیشتر در  <a href="/docs/hooks-custom.html">هوک مخصوص خود را بسازید</a> بحث خواهیم کرد.</p>

<h3 dir="rtl" id="complex-components-become-hard-to-understand"><a href="#complex-components-become-hard-to-understand" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>فهم کامپوننت&zwnj;های پیچیده دشوارتر می&zwnj;شود </h3>

<p dir="rtl">ما معمولا مجبور به نگه&zwnj;داری از کامپوننت&zwnj;هایی بودیم که در بدو شروع ساده بودند اما تبدیل به یک وضع آشفته&zwnj;ی غیرقابل مهار از منطق&zwnj;های دارای state و side effectها شدند. هر lifecycle متشکل از مخلوطی از منطق&zwnj;های غیر مرتبط است. برای مثال، یک کامپوننت ممکن است  در<code class="gatsby-code-text">componentDidMount</code> و <code class="gatsby-code-text">componentDidUpdate</code> به دریافت داده بپردازد. درحالی&zwnj;که همان تابع می&zwnj;تواند دارای منطقی غیر مرتبط باشد که به اضافه کردن event listenerها می&zwnj;پردازد، و در متد <code class="gatsby-code-text">componentWillUnmount</code> آن&zwnj;ها [event listenerها] را پاکسازی (cleanup) می&zwnj;کند. کدهایی که متقابلا به هم مرتبط هستند [مثل اضافه و پاک&zwnj;سازی event listener]  از یکدیگر جدا هستند، ولی کدهایی که کاملا غیر مرتبط&zwnj;اند [اضافه کردنevent listener و دریافت داده] در یک متد نوشته می&zwnj;شوند. که این  احتمال خطا و باگ  و ناسازگاری را بیشتر می&zwnj;کند. </p>

<p dir="rtl">در بسیاری از موارد امکان این وجود ندارد که بتوانیم این کامپوننت&zwnj;ها را به اجزای کوچکتر تقسیم کنیم، زیرا منطق دارای state در همه جا وجود دارد. همچنین تست کردن آن&zwnj;ها دشوار است. این یکی از دلایلی است که بسیاری از افراد ترجیح می&zwnj;دهند تا ری&zwnj;اکت را با یک کتابخانه&zwnj;ی مدیریت state دیگری ترکیب کنند. اگرچه، معمولا باعث اضافه&zwnj;شدن مقدار زیادی تجرید می&zwnj;شود و  شما را مجبور می&zwnj;کند بین تعداد زیادی از فایل&zwnj;ها جابه&zwnj;جا شوید که خود باعث مشکل&zwnj;تر شدن استفاده&zwnj;ی مجدد از کامپوننت&zwnj;ها می&zwnj;گردد.</p>

<p dir="rtl">برای حل این مسیله، <strong>هوک&zwnj;ها به شما اجازه می&zwnj;دهند یک کامپوننت را به توابع کوچکتری تقسیم کنید که مبنای آن ارتباط اجزایشان است (مثلا اضافه کردن یک اشتراک &#8234;(&#8236;subscription&#8234;)&#8236; یا دریافت داده)</strong>، نه تقسیم بر اساس متدهای lifecycle&#8234;.&#8236; همچنین می&zwnj;توانید برای  مدیریت state محلی از یک reducer کمک بگیرید تا بیشتر مطابق با پیش&zwnj;بینی شما باشد.</p>

<p dir="rtl">در این باره در
<a href="/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns">استفاده از Effect Hook</a> بیشتر بحث خواهیم کرد.</p>

<h3 dir="rtl" id="classes-confuse-both-people-and-machines"><a href="#classes-confuse-both-people-and-machines" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>کلاس&zwnj;ها هم انسان و هم کامپیوتر را گیج می&zwnj;کنند </h3>

<p dir="rtl">علاوه بر دشوار کردن قابلیت استفاده مجدد از کد و نظم آن، دریافتیم که کلاس&zwnj;ها می&zwnj;توانند مانع بزرگی در یادگیری ری&zwnj;اکت باشند. شما باید یادبگیرید که  <code class="gatsby-code-text">this</code> چگونه در جاوااسکریپت کار می&zwnj;کند، که با نحوه&zwnj;ی کار کردش در اکثر زبان&zwnj;ها بسیار متفاوت است. شما باید به یاد داشته باشید تا event handlerها را bind کنید. بدون <a href="https://babeljs.io/docs/en/babel-plugin-transform-class-properties/">syntax proposals</a>، کد بسیار طولانی خواهد بود. آدم&zwnj;ها می&zwnj;توانند props، state، و جریان بالا به پایین داده را کاملا دریابند ولی هنوز  با کلاس&zwnj;ها کلنجار بروند. برتری کامپوننت از جنس تابع یا کلاس در ری&zwnj;اکت و موارد استفاده از آن&zwnj;ها باعث اختلاف نظر است، حتی در میان دولوپرهای با تجربه&zwnj;ی ری&zwnj;اکت.</p>

<p dir="rtl">بعلاوه، ری&zwnj;اکت ۵ سال است که عرضه شده است، و ما می&zwnj;خواهیم در ۵ سال آینده مطرح باشد. همانطور که <a href="https://svelte.technology/">Svelte</a>، <a href="https://angular.io/">Angular</a>،<a href="https://glimmerjs.com/">Glimmer</a>و دیگران نشان می&zwnj;دهند، <a href="https://en.wikipedia.org/wiki/Ahead-of-time_compilation">کامپایل پیش از موعد</a> کامپوننت&zwnj;ها، پتانسیل قابلیت&zwnj;های زیادی را دارد. بالاخص اگر به تمپلت&zwnj;ها مححدود نباشد. ما اخیرا  با
<a href="https://github.com/facebook/react/issues/7323">component folding</a> بوسیله&zwnj;ی <a href="https://prepack.io/">Prepack</a>&zwnj; &zwnj;آزمایشاتی را انجام دادیم که شاهد نتایج  سریع و امیدوارکننده  بوده&zwnj;ایم&#8235;.&#8236; اگرچه دریافتیم که کامپوننت&zwnj;های کلاسی می&zwnj;توانند ناخواسته باعث افزایش الگوهایی می&zwnj;شوند که چنین بهینه&zwnj;سازی&zwnj;هایی را بدتر می&zwnj;کنند&#8235;.&#8236;  کلاس&zwnj;ها برای ابزارهای امروزی نیز مشکلاتی ایجاد می&zwnj;کنند&#8235;.&#8236; برای مثال، کلاس&zwnj;ها به خوبی کم&zwnj;حجم(minify) نمی&zwnj;شوند، آن&zwnj;ها با عث می&zwnj;شوند تا hot reloading شکننده و نامطمین شود&#8235;.&#8236; ما می&zwnj;خواهیم APIای را ارایه دهیم که به کد امکان بهینه&zwnj;سازی شدن بیشتری بدهد&#8235;.&#8236;</p>

<p dir="rtl">برای حل این مشکلات، <strong>هوک&zwnj;ها به شما اجازه می&zwnj;دهند تا از بیشتر قابلیت&zwnj;های ری&zwnj;اکت بدون کلاس&zwnj;ها بهره ببرید.</strong> مفهوما، همیشه کامپوننت&zwnj;های ری&zwnj;اکت بیشتر به توابع نزدیک&zwnj;تر بوده&zwnj;اند. هوک&zwnj;ها بدون آنکه روح کاربردی ری&zwnj;اکت را فداکند، توابع را شامل می&zwnj;شوند. هوک&zwnj;ها امکان دسترسی به راههای &zwnj;فرار دستوری می&zwnj;دهند و شما را مجبور به یادگیری تکنیک&zwnj;های پیچیده&zwnj;ی توابع یا برنامه&zwnj;نویسی ری&zwnj;اکتیو نمی&zwnj;کند.</p>

<blockquote dir="rtl">
<p>مثال&zwnj;ها</p>
<p><a href="/docs/hooks-overview.html">نگاه اجمالی به هوک&zwnj;</a> نقطه&zwnj;ی شروع مناسبی برای یادگیری Hookهاست.</p>
</blockquote>

<h2 dir="rtl" id="gradual-adoption-strategy"><a href="#gradual-adoption-strategy" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>استراتژی تطبیق تدریجی</h2>

<blockquote dir="rtl">
<p><strong>خلاصه: هیچ برنامه&zwnj;ای برای حذف کلاس ها از ری&zwnj;اکت وجود ندارد&#8235;.&#8236;.</strong></p>
</blockquote>

<p dir="rtl">ما می&zwnj;دانیم که دولوپرهای ری&zwnj;اکت بر روی عرضه&zwnj;ی محصولات تمرکز دارند و وقتی برای نگاه کردن و مطالعه&zwnj;ی هر  API جدیدی را که منتشر می&zwnj;شود، ندارند. هوک&zwnj;ها بسیار جدید هستند، و شاید برای یادگیری و بهره&zwnj;گیری از آن&zwnj;ها بهتر باشد تا برای مثال&zwnj;ها و آموزش&zwnj;های بیشتر صبر کنید.</p>

<p dir="rtl">همچنین اطلاع داریم که انتظارات برای اضافه کردن دستورات پایه&zwnj;ی جدید به ری&zwnj;اکت بسیار بالاست. ما برای خواننده&zwnj;های کنجکاو یک <a href="https://github.com/reactjs/rfcs/pull/68">RFC با جزییات</a> آماده کرده&zwnj;ایم که با عمق بیشتری به انگیزه&zwnj;ها می&zwnj;پردازد، و دید  بیشتری بر تصصمیمات جزیی تصمیم&zwnj;گیری&zwnj;ها و  تصمیمات مرتبط قبلی فراهم می&zwnj;کند.  </p>

<p dir="rtl">&#8235;<strong>&#8236;اساسا، هوک ها در کنار کدهای نوشته&zwnj;شده از قبل کار خواهند کرد، پس شما می&zwnj;توانید بصورت تدریجی از آن&zwnj;ها بهره گیرید</strong> ما این API آزمایشی را برای این به اشتراک  می&zwnj;گذاریم تا بتوانیم از بازخوردهای افراد در جامعه که برای شکل دادن به آینده&zwnj;ی ری&zwnj;اکت مشتاق هستند بهره گیریم. — and we will iterate on Hooks in the open.</p>

<p dir="rtl">در انتها، هیچ عجله&zwnj;ای برای مهاجرت به هوک&zwnj;ها وجود ندارد. ما پیشنهاد می&zwnj;کنیم از هرگونه &#8234;“&#8236;بازنویسی بزرگ&#8234;”&#8236; بپرهیزید، مخصوصا برای کامپوننت&zwnj;های کلاسی موجود و پیچیده. برای &#8234;“&#8236;تفکر مبتنی بر هوک&zwnj;ها&#8234;”&#8236; مقداری تامل نیاز است.  تجربه&zwnj;ی ما این است که ابتدا بهترین کار تمرین و کار با هوک&zwnj;ها در کامپوننت&zwnj;های جدید و غیرحیاتی است، و اطمینان بخشیدن از اینکه همه&zwnj;ی افراد تیم شما با آن&zwnj;ها ارتباط برقرار کرده&zwnj;اند. بعد از اینکه هوک&zwnj;ها را امتحان کردید، لطفا<a href="https://github.com/facebook/react/issues/new">بازخوردهای خود را برای ما بفرستید</a> ، چه مثبت و چه منفی.</p>

<h2 dir="rtl" id="frequently-asked-questions"><a href="#frequently-asked-questions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>سوالات متداول </h2>

<p dir="rtl">ما یک <a href="/docs/hooks-faq.html">صفحه پرسش و پاسخ متداول از hookها</a> فراهم کرده ایم که  اکثر سوالات رایج در مورد هوک&zwnj;ها را پاسخ&zwnj; می&zwnj;دهد.</p>