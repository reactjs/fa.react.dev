---
title: نوشتن نشانه‌گذاری با JSX
---

<Intro>

*JSX* یک گسترش سینتکسی برای جاوااسکریپت است که به شما امکان می‌دهد مارکاپ شبه-HTML را داخل یک فایل جاوااسکریپت بنویسید. اگرچه راه‌های دیگری برای نوشتن کامپوننت‌ها وجود دارد، بیشتر توسعه‌دهندگان ری‌اکت ایجاز JSX را ترجیح می‌دهند و بیشتر کدبیس‌ها از آن استفاده می‌کنند.

</Intro>

<YouWillLearn>

* چرا ری‌اکت نشانه‌گذاری را با منطق رندر ترکیب می‌کند
* تفاوت JSX با HTML در چیست
* چگونه اطلاعات را با JSX نمایش دهید

</YouWillLearn>

## JSX: قرار دادن نشانه‌گذاری در جاوااسکریپت {/*jsx-putting-markup-into-javascript*/}

وب بر پایه HTML، CSS و جاوااسکریپت ساخته شده است. سال‌ها توسعه‌دهندگان وب محتوا را در HTML، طراحی را در CSS و منطق را در جاوااسکریپت نگه می‌داشتند — که اغلب در فایل‌های جداگانه بود! محتوا داخل HTML نشانه‌گذاری می‌شد در حالی که منطق صفحه جداگانه در جاوااسکریپت زندگی می‌کرد:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="نشانه‌گذاری HTML با پس‌زمینه بنفش و یک div با دو تگ فرزند: p و form.">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="سه هندلر جاوااسکریپت با پس‌زمینه زرد: onSubmit، onLogin و onClick.">

JavaScript

</Diagram>

</DiagramGroup>

اما هرچه وب تعاملی‌تر شد، منطق به‌طور فزاینده‌ای محتوا را تعیین کرد. جاوااسکریپت مسئول HTML بود! به همین دلیل است که **در ری‌اکت، منطق رندر و نشانه‌گذاری در یک جا زندگی می‌کنند — کامپوننت‌ها.**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="کامپوننت ری‌اکت با HTML و جاوااسکریپت ترکیب‌شده از مثال‌های قبلی. نام تابع Sidebar است که تابع isLoggedIn را صدا می‌زند که به رنگ زرد هایلایت شده. داخل تابع که به رنگ بنفش هایلایت شده، تگ p از قبل و یک تگ Form که به کامپوننت نشان‌داده‌شده در نمودار بعدی ارجاع می‌دهد قرار دارد.">

`Sidebar.js` React component

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="کامپوننت ری‌اکت با HTML و جاوااسکریپت ترکیب‌شده از مثال‌های قبلی. نام تابع Form است که شامل دو هندلر onClick و onSubmit هایلایت‌شده به رنگ زرد است. بعد از هندلرها HTML هایلایت‌شده به رنگ بنفش قرار دارد. HTML شامل یک المنت form با یک المنت input تودرتو است که هر کدام یک پراپ onClick دارند.">

`Form.js` React component

</Diagram>

</DiagramGroup>

نگه داشتن منطق رندر یک دکمه و نشانه‌گذاری آن در کنار هم تضمین می‌کند که در هر ویرایش با هم همگام بمانند. در مقابل، جزئیاتی که نامرتبط‌اند، مثل نشانه‌گذاری دکمه و نشانه‌گذاری سایدبار، از هم جدا هستند و تغییر هر کدام به‌تنهایی امن‌تر می‌شود.

هر کامپوننت ری‌اکت یک تابع جاوااسکریپت است که ممکن است مقداری نشانه‌گذاری داشته باشد که ری‌اکت آن را در مرورگر رندر می‌کند. کامپوننت‌های ری‌اکت از یک گسترش سینتکسی به نام JSX برای نمایش آن نشانه‌گذاری استفاده می‌کنند. JSX خیلی شبیه HTML به نظر می‌رسد، اما کمی سخت‌گیرانه‌تر است و می‌تواند اطلاعات پویا را نمایش دهد. بهترین راه برای درک این موضوع، تبدیل مقداری نشانه‌گذاری HTML به نشانه‌گذاری JSX است.

<Note>

JSX و ری‌اکت دو چیز جداگانه هستند. آن‌ها اغلب با هم استفاده می‌شوند، اما شما *می‌توانید* [از آن‌ها مستقل از هم استفاده کنید](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) .JSX یک گسترش سینتکسی است، در حالی که ری‌اکت یک کتابخانه جاوااسکریپت است.

</Note>

## تبدیل HTML به JSX {/*converting-html-to-jsx*/}

فرض کنید مقداری HTML (کاملاً معتبر) دارید:

```html
<h1>Hedy Lamarr's Todos</h1>
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```

و می‌خواهید آن را داخل کامپوننت خود بگذارید:

```js
export default function TodoList() {
  return (
    // ؟؟؟
  )
}
```

اگر آن را همان‌طور کپی و پیست کنید، کار نخواهد کرد:


<Sandpack>

```js
export default function TodoList() {
  return (
    // این خیلی درست کار نمی‌کند!
    <h1>Hedy Lamarr's Todos</h1>
    <img 
      src="https://i.imgur.com/yXOvdOSs.jpg" 
      alt="Hedy Lamarr" 
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve the spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

دلیلش این است که JSX سخت‌گیرانه‌تر است و چند قانون بیشتر از HTML دارد! اگر پیام‌های خطای بالا را بخوانید، شما را به سمت رفع نشانه‌گذاری هدایت می‌کنند، یا می‌توانید راهنمای زیر را دنبال کنید.

<Note>

بیشتر اوقات، پیام‌های خطای روی صفحه ری‌اکت به شما کمک می‌کنند مشکل را پیدا کنید. اگر گیر کردید، آن‌ها را بخوانید!

</Note>

## قوانین JSX {/*the-rules-of-jsx*/}

### ۱. یک المنت ریشه واحد برگردانید {/*1-return-a-single-root-element*/}

برای برگرداندن چند المنت از یک کامپوننت، **آن‌ها را با یک تگ والد واحد بپیچید.**

برای مثال، می‌توانید از یک `<div>` استفاده کنید:

```js {1,11}
<div>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</div>
```


اگر نمی‌خواهید یک `<div>` اضافه به نشانه‌گذاری خود اضافه کنید، می‌توانید به‌جای آن `<>` و `</>` بنویسید:

```js {1,11}
<>
  <h1>Hedy Lamarr's Todos</h1>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
  >
  <ul>
    ...
  </ul>
</>
```

این تگ خالی *[فرگمنت](/reference/react/Fragment)* نامیده می‌شود. فرگمنت‌ها به شما امکان می‌دهند چیزها را گروه‌بندی کنید بدون اینکه ردی در درخت HTML مرورگر باقی بگذارند.

<DeepDive>

#### چرا چند تگ JSX باید پیچیده شوند؟ {/*why-do-multiple-jsx-tags-need-to-be-wrapped*/}

JSX شبیه HTML به نظر می‌رسد، اما در پس‌زمینه به آبجکت‌های ساده جاوااسکریپت تبدیل می‌شود. نمی‌توانید دو آبجکت را از یک تابع برگردانید مگر اینکه آن‌ها را در یک آرایه بپیچید. این توضیح می‌دهد که چرا نمی‌توانید دو تگ JSX را هم بدون پیچیدن در یک تگ دیگر یا یک فرگمنت برگردانید.

</DeepDive>

### ۲. همه تگ‌ها را ببندید {/*2-close-all-the-tags*/}

JSX نیاز دارد تگ‌ها به‌صراحت بسته شوند: تگ‌های خودبسته‌شونده مثل `<img>` باید به `<img />` تبدیل شوند و تگ‌های پوشاننده مثل `<li>oranges` باید به‌صورت `<li>oranges</li>` نوشته شوند.

تصویر هدی لامار و آیتم‌های فهرست به‌صورت بسته‌شده این‌طور به نظر می‌رسند:

```js {2-6,8-10}
<>
  <img 
    src="https://i.imgur.com/yXOvdOSs.jpg" 
    alt="Hedy Lamarr" 
    class="photo"
   />
  <ul>
    <li>Invent new traffic lights</li>
    <li>Rehearse a movie scene</li>
    <li>Improve the spectrum technology</li>
  </ul>
</>
```

### ۳. camelCase کردن <s>همه</s> بیشتر چیزها! {/*3-camelcase-salls-most-of-the-things*/}

JSX به جاوااسکریپت تبدیل می‌شود و صفت‌های نوشته‌شده در JSX به کلیدهای آبجکت‌های جاوااسکریپت تبدیل می‌شوند. در کامپوننت‌های خودتان، اغلب می‌خواهید آن صفت‌ها را در متغیرها بخوانید. اما جاوااسکریپت روی نام متغیرها محدودیت دارد. برای مثال، نام آن‌ها نمی‌تواند خط تیره داشته باشد یا کلمات رزرو شده مثل `class` باشد.

به همین دلیل است که در ری‌اکت، بسیاری از صفت‌های HTML و SVG به‌صورت camelCase نوشته می‌شوند. برای مثال، به‌جای `stroke-width` از `strokeWidth` استفاده می‌کنید. چون `class` یک کلمه رزرو شده است، در ری‌اکت به‌جای آن `className` می‌نویسید که از [پراپرتی متناظر DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) نام گرفته است:

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

می‌توانید همه این صفت‌ها را در [فهرست پراپ‌های کامپوننت DOM](/reference/react-dom/components/common) پیدا کنید. اگر یکی را اشتباه نوشتید، نگران نباشید — ری‌اکت پیامی با اصلاح احتمالی در [کنسول مرورگر](https://developer.mozilla.org/docs/Tools/Browser_Console) چاپ می‌کند.

<Pitfall>

به دلایل تاریخی، صفت‌های [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) و [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) مثل HTML با خط تیره نوشته می‌شوند.

</Pitfall>

### نکته حرفه‌ای: از مبدل JSX استفاده کنید {/*pro-tip-use-a-jsx-converter*/}

تبدیل همه این صفت‌ها در نشانه‌گذاری موجود می‌تواند خسته‌کننده باشد! توصیه می‌کنیم از یک [مبدل](https://transform.tools/html-to-jsx) برای ترجمه HTML و SVG موجود خود به JSX استفاده کنید. مبدل‌ها در عمل خیلی مفیدند، اما باز هم ارزش دارد بدانید چه اتفاقی می‌افتد تا بتوانید خودتان راحت JSX بنویسید.

نتیجه نهایی شما اینجاست:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img 
        src="https://i.imgur.com/yXOvdOSs.jpg" 
        alt="Hedy Lamarr" 
        className="photo" 
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px }
```

</Sandpack>

<Recap>

حالا می‌دانید چرا JSX وجود دارد و چگونه از آن در کامپوننت‌ها استفاده کنید:

* کامپوننت‌های ری‌اکت منطق رندر را همراه با نشانه‌گذاری گروه‌بندی می‌کنند چون به هم مرتبط‌اند.
* JSX شبیه HTML است، با چند تفاوت. اگر نیاز داشتید می‌توانید از یک [مبدل](https://transform.tools/html-to-jsx) استفاده کنید.
* پیام‌های خطا اغلب شما را در مسیر درست برای رفع نشانه‌گذاری‌تان قرار می‌دهند.

</Recap>



<Challenges>

#### تبدیل مقداری HTML به JSX {/*convert-some-html-to-jsx*/}

این HTML داخل یک کامپوننت پیست شده، اما JSX معتبری نیست. آن را رفع کنید:

<Sandpack>

```js
export default function Bio() {
  return (
    <div class="intro">
      <h1>Welcome to my website!</h1>
    </div>
    <p class="summary">
      You can find my thoughts here.
      <br><br>
      <b>And <i>pictures</b></i> of scientists!
    </p>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

این کار را دستی انجام دهید یا با مبدل، با خودتان است!

<Solution>

<Sandpack>

```js
export default function Bio() {
  return (
    <div>
      <div className="intro">
        <h1>Welcome to my website!</h1>
      </div>
      <p className="summary">
        You can find my thoughts here.
        <br /><br />
        <b>And <i>pictures</i></b> of scientists!
      </p>
    </div>
  );
}
```

```css
.intro {
  background-image: linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary {
  padding: 20px;
  border: 10px solid gold;
}
```

</Sandpack>

</Solution>

</Challenges>
