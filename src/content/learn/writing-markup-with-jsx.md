---
title: نوشتن مارک‌آپ با JSX
---

<Intro>

*JSX* یک افزونه‌ی نحوی برای جاوااسکریپت است که به شما اجازه می‌دهد مارک‌آپی شبیه به HTML را درون یک فایل جاوااسکریپت بنویسید. اگرچه روش‌های دیگری برای نوشتن کامپوننت وجود دارد، اکثر توسعه‌دهندگان ری‌اکت اختصار JSX را ترجیح می‌دهند، و اکثر کدبیس‌ها از آن استفاده می‌کنند.

</Intro>

<YouWillLearn>

* چرا ری‌اکت مارک‌آپ را با منطق رندر ترکیب می‌کند
* JSX چگونه از HTML متفاوت است
* چگونه با JSX اطلاعات را نمایش دهیم

</YouWillLearn>

## JSX: قرار دادن مارک‌آپ در جاوااسکریپت {/*jsx-putting-markup-into-javascript*/}

وب بر پایه‌ی HTML، CSS و جاوااسکریپت ساخته شده است. برای بسیاری از سال‌ها، توسعه‌دهندگان وب محتوا را در HTML، طراحی را در CSS و منطق را در جاوااسکریپت نگه می‌داشتند—اغلب در فایل‌های جداگانه! محتوا در HTML مارک‌آپ می‌شد در حالی که منطق صفحه جداگانه در جاوااسکریپت زندگی می‌کرد:

<DiagramGroup>

<Diagram name="writing_jsx_html" height={237} width={325} alt="HTML markup with purple background and a div with two child tags: p and form. ">

HTML

</Diagram>

<Diagram name="writing_jsx_js" height={237} width={325} alt="Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.">

جاوااسکریپت

</Diagram>

</DiagramGroup>

اما هرچه وب تعامل‌پذیرتر شد، منطق به‌طور فزاینده‌ای محتوا را تعیین می‌کرد. جاوااسکریپت مسئول HTML بود! به همین دلیل است که **در ری‌اکت، منطق رندر و مارک‌آپ در همان جا—کامپوننت‌ها—زندگی می‌کنند.**

<DiagramGroup>

<Diagram name="writing_jsx_sidebar" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.">

کامپوننت ری‌اکت `Sidebar.js`

</Diagram>

<Diagram name="writing_jsx_form" height={330} width={325} alt="React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.">

کامپوننت ری‌اکت `Form.js`

</Diagram>

</DiagramGroup>

نگه‌داشتن منطق رندر و مارک‌آپ یک دکمه در کنار هم، تضمین می‌کند که آن‌ها در هر ویرایش با هم هماهنگ بمانند. در مقابل، جزئیات غیرمرتبط، مانند مارک‌آپ دکمه و مارک‌آپ یک نوار کناری، از یکدیگر ایزوله‌اند، که این کار را ایمن‌تر می‌سازد که هر کدام را به‌طور مستقل تغییر دهید.

هر کامپوننت ری‌اکت یک تابع جاوااسکریپت است که می‌تواند مقداری مارک‌آپ داشته باشد که ری‌اکت آن را در مرورگر رندر می‌کند. کامپوننت‌های ری‌اکت از یک افزونه‌ی نحوی به نام JSX برای نمایش آن مارک‌آپ استفاده می‌کنند. JSX خیلی شبیه HTML است، اما کمی سخت‌گیرانه‌تر است و می‌تواند اطلاعات پویا را نمایش دهد. بهترین راه برای درک این موضوع، تبدیل مقداری مارک‌آپ HTML به مارک‌آپ JSX است.

<Note>

JSX و ری‌اکت دو چیز جداگانه هستند. آن‌ها اغلب با هم استفاده می‌شوند، اما شما *می‌توانید* [به‌طور مستقل](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) از هم از آن‌ها استفاده کنید. JSX یک افزونه‌ی نحوی است، در حالی که ری‌اکت یک کتابخانه جاوااسکریپت است.

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

و می‌خواهید آن را در کامپوننت خود قرار دهید:

```js
export default function TodoList() {
  return (
    // ???
  )
}
```

اگر آن را همان‌طور که هست کپی و جای‌گذاری کنید، کار نخواهد کرد:


<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
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

این به‌این دلیل است که JSX سخت‌گیرانه‌تر است و چند قانون بیشتر نسبت به HTML دارد! اگر پیام‌های خطای بالا را بخوانید، شما را برای اصلاح مارک‌آپ راهنمایی می‌کنند، یا می‌توانید راهنمای زیر را دنبال کنید.

<Note>

بیشتر اوقات، پیام‌های خطای روی‌صفحه‌ی ری‌اکت به شما کمک می‌کنند تا مشکل کجاست پیدا کنید. اگر گیر کردید آن‌ها را بخوانید!

</Note>

## قوانین JSX {/*the-rules-of-jsx*/}

### ۱. یک عنصر ریشه‌ی منفرد برگردانید {/*1-return-a-single-root-element*/}

برای برگرداندن چند عنصر از یک کامپوننت، **آن‌ها را با یک تگ والد منفرد بپیچید.**

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


اگر نمی‌خواهید یک `<div>` اضافی به مارک‌آپ خود اضافه کنید، می‌توانید به‌جای آن `<>` و `</>` بنویسید:

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

این تگ خالی *[فرگمنت](/reference/react/Fragment)* نامیده می‌شود. فرگمنت‌ها به شما اجازه می‌دهند چیزها را بدون اینکه هیچ اثری در درخت HTML مرورگر بگذارند گروه‌بندی کنید.

<DeepDive>

#### چرا چند تگ JSX باید بپیچانده شوند؟ {/*why-do-multiple-jsx-tags-need-to-be-wrapped*/}

JSX شبیه HTML به نظر می‌رسد، اما زیر کاپوت به اشیاء جاوااسکریپت ساده تبدیل می‌شود. نمی‌توانید از یک تابع دو شیء برگردانید مگر اینکه آن‌ها را در یک آرایه بپیچید. این توضیح می‌دهد که چرا نمی‌توانید دو تگ JSX را بدون اینکه در یک تگ دیگر یا یک فرگمنت بپیچید برگردانید.

</DeepDive>

### ۲. همه‌ی تگ‌ها را ببندید {/*2-close-all-the-tags*/}

JSX نیازمند است که تگ‌ها به‌طور صریح بسته شوند: تگ‌های خودبسته مانند `<img>` باید به `<img />` تبدیل شوند، و تگ‌های پیچنده مانند `<li>oranges` باید به‌صورت `<li>oranges</li>` نوشته شوند.

این چگونگی بسته‌شدن تصویر و آیتم‌های لیست Hedy Lamarr است:

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

### ۳. camelCase <s>همه</s> بیشتر چیزها! {/*3-camelcase-salls-most-of-the-things*/}

JSX به جاوااسکریپت تبدیل می‌شود و ویژگی‌های نوشته‌شده در JSX به کلید اشیاء جاوااسکریپت تبدیل می‌شوند. در کامپوننت‌های خود، اغلب می‌خواهید آن ویژگی‌ها را در متغیرها بخوانید. اما جاوااسکریپت محدودیت‌هایی روی نام متغیرها دارد. برای مثال، نام آن‌ها نمی‌تواند شامل خط‌تیره باشد یا کلمات رزروشده مانند `class` باشد.

به همین دلیل، در ری‌اکت، بسیاری از ویژگی‌های HTML و SVG به‌صورت camelCase نوشته می‌شوند. برای مثال، به‌جای `stroke-width` از `strokeWidth` استفاده می‌کنید. از آنجا که `class` یک کلمه‌ی رزروشده است، در ری‌اکت به‌جای آن `className` می‌نویسید، که نام‌گذاری شده طبق [پراپرتی DOM مربوطه](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

```js {4}
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo"
/>
```

می‌توانید [همه‌ی این ویژگی‌ها را در فهرست پراپ‌های کامپوننت DOM پیدا کنید.](/reference/react-dom/components/common) اگر یکی را اشتباه نوشتید، نگران نباشید—ری‌اکت پیامی با اصلاح ممکن در [کنسول مرورگر](https://developer.mozilla.org/docs/Tools/Browser_Console) چاپ می‌کند.

<Pitfall>

به دلایل تاریخی، ویژگی‌های [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) و [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) مانند HTML با خط‌تیره نوشته می‌شوند.

</Pitfall>

### نکته‌ی حرفه‌ای: از یک مبدل JSX استفاده کنید {/*pro-tip-use-a-jsx-converter*/}

تبدیل همه‌ی این ویژگی‌ها در مارک‌آپ موجود می‌تواند خسته‌کننده باشد! پیشنهاد می‌کنیم از یک [مبدل](https://transform.tools/html-to-jsx) برای ترجمه‌ی HTML و SVG موجود به JSX استفاده کنید. مبدل‌ها در عمل بسیار مفیدند، اما همچنان ارزش دارد که بفهمید چه می‌گذرد تا بتوانید راحت به‌تنهایی JSX بنویسید.

در اینجا نتیجه‌ی نهایی شما آمده است:

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

اکنون می‌دانید چرا JSX وجود دارد و چگونه در کامپوننت‌ها از آن استفاده کنید:

* کامپوننت‌های ری‌اکت منطق رندر را همراه با مارک‌آپ گروه‌بندی می‌کنند چون آن‌ها مرتبط هستند.
* JSX شبیه HTML است، با چند تفاوت. در صورت نیاز می‌توانید از یک [مبدل](https://transform.tools/html-to-jsx) استفاده کنید.
* پیام‌های خطا اغلب شما را به جهت درست برای اصلاح مارک‌آپ هدایت می‌کنند.

</Recap>



<Challenges>

#### مقداری HTML را به JSX تبدیل کنید {/*convert-some-html-to-jsx*/}

این HTML در یک کامپوننت جای‌گذاری شده، اما JSX معتبری نیست. آن را اصلاح کنید:

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

اینکه این کار را دستی انجام دهید یا با استفاده از مبدل، به شما بستگی دارد!

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
