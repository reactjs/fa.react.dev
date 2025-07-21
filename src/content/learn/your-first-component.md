---
title: Your First Component
---

<Intro>

*کامپوننت ها* یکی از مهمترین مباحث اصلی در ریکت است. آنها پایه و اساس رابط های کاربری هستند که مکان خوبی را برای سفر ریکتی شما فراهم میکند!

</Intro>

<YouWillLearn>

* کامپوننت چیست
* قوانین اجرا و پیاده سازی کامپوننت در ریکت به چه صورت است
* چطور اولین کامپوننت خود را بنویسید

</YouWillLearn>

## کامپوننت ها: بلوک های تشکیل دهنده یک UI {/*components-ui-building-blocks*/}

در وب, HTML به ما اجازه میدهد تا یک سند پیشرفته ای را توسط تگ هایی مانند `<h1>` و`<li>` بسازیم:

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

در این بخش ما یک بخشی را با تگ `article` مشخص کردیم و یک تگ `h1` داریم که داخل آن متن داریم. یک لیست بعد از آن داریم که با تگ `ol` مشخص کردیم و این لیست دارای سه آیتم است. کد مانند بالا مسلما دارای یکسری کد CSS برای استایل دهی و کد Javascript برای داینامیک بودن هست. مثل منو ها, لیست های کشویی و آکاردئونی, مودال ها یا هرآن چیزی که در صفحات وب مشاهده میکنید.

ریکت به شما اجازه میدهد بخش های سایتتان را داختل یک "کامپوننت" همراه با استایل و اسکریپت های مربوطه ذخیره کنید. در فهرست  **reusable UI elements for your app.** شما خواهید دید که یک کامپوننتی مانند `<TableOfContents />` را میتوانید در هر صفحه ای از آن استفاده کنید و سپس در پشت صفحه همین کامپوننت تبدیل به تگ هایی مانند `<h1>` و `<article>` شده است.

درست مانند تگ های HTML, شما میتوانید کامپوننت هارا برای همه صفحات بسازید, سفارشی سازی و ذخیره کنید. مانند همین داکیومنتی که الان درحال خواندن آن هستید متشکل از کامپوننت های React است.

```js
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Docs</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

همانطور که پروژه شما بزرگ و بزرگتر میشود, توجه خواهید کرد که بسیاری از دیزاین هایی که تبدیل به کامپوننت شدند را میتوانید در هرجایی از صفحات پروژه استفاده کنید و سرعت توسعه را بالا ببرید. همچنین میتوانید در پروژه های خود از کامپوننت یا کتابخانه های آماده ای که تیم React منتشر کرده اند مثل [Material UI.](https://material-ui.com/) و  [Chakra UI](https://chakra-ui.com/)  استفاده کنید.

##  تعریف یک کامپوننت {/*defining-a-component*/}

قبلا برای ساخت صفحات وب از تگ های HTML استفاده و برای داینامیک کردن آنها کد های جاوااسکریپتی نوشته میشد, که در زمان خود راه خوبی بود. ولی امروزه چون توی صفحات وب بخواهید اینتراکشن و پویایی بیشتری داشته باشند باید اسکریپت های بیشتری اضافه کنید. که React تعامل را اولویت قرار میدهد ولی هنوز از همان تکنولوژی استفاده میکند: **یک کامپوننت React تابع جاوااسکریپتی است که شما میتوانید تگ های HTML را در آن بنویسید**که به این صورت نوشته میشود (میتوانید مثال زیر را تغییر دهید)

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

```css
img { height: 200px; }
```

</Sandpack>

در اینجا به شما میگوییم که چگونه یک کامپوننت بسازید:

### قدم اول: خروجی گرفتن (Export) یک کامپوننت {/*step-1-export-the-component*/}

دستور `export default` یک پیشوند در زبان جاوااسکریپت است [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (نه فقط در React), به شما اجازه میدهد که تابع اصلی خود را در فایل خروجی بگیرید و در فایل دیگر import کنید. (درباره Import بدانید [Importing and Exporting Components](/learn/importing-and-exporting-components)!)

### قدم دوم: ساخت و تعریف توابع {/*step-2-define-the-function*/}

با دستور `function Profile() { }` شما میتوانید یک تابع جاوااسکریپتی با نام `Profile` تعریف کنید.

<Pitfall>

کامپوننت های React همان توابع معمولی در جاوااسکریپت هستند, با این تفاوت که باید  **حرف اول اسم آن از حروف بزرگ باشد** وگرنه ارور میدهد!

</Pitfall>

###  قدم سوم: اضافه کردن تگ HTML {/*step-3-add-markup*/}

کامپوننت زیر یک تگ `<img />` را به همراه اتریبیوت های `src` و `alt` برمیگرداند. `<img />` مانند HTML نوشته میشود ولی این یک دستور جاوااسکریپتی است! اسم این سینتکس [JSX](/learn/writing-markup-with-jsx) است, و به شما اجازه میدهد تا تگ های HTML را مستقیما در یک فایل جاوااسکریپت بنویسید.

دستور `return` را هم میتوان به این صورت در یک خط نوشت:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

اما اگر نمیتوانید کل تگ های HTML را در یک خط بنویسید فقط کافیست بعد از دستور return یک جفت پرانتز قرار بدهید و تگ هارا داخل آن بنویسید:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

بدون پرانتز, خط های بعد از دستور `return` [نادیده گرفته میشوند](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

##  استفاده از یک کامپوننت {/*using-a-component*/}

بعد از اینکه کامپونت `Profile` خود را ساخته اید, الان وقت آن رسیده که همان کامپوننت را در میان کامپوننت های دیگر قرار بدهید. به عنوان مثال شما میتوانید کامپوننت `Gallery` را به همراه چند کامپوننت `Profile` که داخل آن استفاده شده است را export کنید:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

### از دید مرورگر ها چه میگذرد {/*what-the-browser-sees*/}

به تفاوت های زیر توجه کنید:

* `<section>` با حرف کوچک شروع شده پس React میداند که این یک تگ HTML است.
* `<Profile />` با حرف بزرگ `P` شروع شده پس ریکت متوجه میشود که ما کامپوننتی به نام `Profile` داریم. پس باید رندر شود.

و کامپوننت Profile شامل یکسری تگ HTML است: `<img />`. و درآخر, کد زیر چیزی هست که مرورگر میبیند:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

###  قرار دادن کامپوننت داخل یک کامپوننت دیگر {/*nesting-and-organizing-components*/}

کامپوننت ها درواقع فانکشن های معمولی جاوااسکریپت هستند, پس شما میتوانید در یک فایل چند کامپوننت تعریف کنید که معمولا زمانی استفاده میشود که کامپوننت ها نسبتا کوچک یا باهم ربطی داشته باشند و اگر فایل شلوغ شد آنها را در فایل های جداگانه ای قرار بدهید. درباره انجام دادن آن و [دستور Import](/learn/importing-and-exporting-components) میتوانید مطالعه کنید.

چون کامپوننت `Profile` داخل کامپوننت `Gallery` هست و چندین بار هم تکرار شده, و همچنین کامپوننت `Gallery` یک کامپوننت والد یا **parent component** که کامپوننت `Gallery` که فرزندان خودش هست را اجرا یا رندر گیری میکند. این بخشی از جادو ریکت است: که میتوانید کامپوننت را یکبار تعریف کنید و هرچند باری که لازم داشتید صدا بزنید.

<Pitfall>

کامپوننت ها میتوانند کامپوننت های داخلی خود را رندر بگیرند, ولی به این مورد توجه کنید  **به هیچ وجه کامپوننت هارا تودرتو تعریف نکنید:**. مثلا:

```js {2-5}
export default function Gallery() {
   // 🔴 به هیچ وجه کامپوننتی داخل یک کامپوننت تعریف نشود
  function Profile() {
    // ...
  }
  // ...
}
```

کد بالا [کند است و ممکن است مشکلاتی به بار بیاورد](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) به جای آن, کامپوننت هارا زیر هم دیگر تعریف کنید. به این صورت:

```js {5-8}
export default function Gallery() {
  // ...
}

// ✅ تعریف کامپوننت زیر همدیگر
function Profile() {
  // ...
}
```

زمانی که لازم است داده هاای کامپوننت پدر به کامپوننت فرزند انتقال شود و بجای اینکه کامپوننت هارا داخل همدیگر تعریف کنیم, بهتر است از [props](/learn/passing-props-to-a-component) استفاده میکنیم.

</Pitfall>

<DeepDive>

####  استفاده از کامپوننت ها {/*components-all-the-way-down*/}

اپلیکیشن ریکتی شما از کامپوننت `root` شروع میشود. معمولا زمانی که یک پروژه جدید میسازید این کامپوننت ساخته میشود, مثلا اگر شما از [CodeSandbox](https://codesandbox.io/) یا [Create React App](https://create-react-app.dev/) استفاده میکنید, به طور پیش فرض داخل `src/App.js` تعریف شده. اگر از فریمورک [Next.js](https://nextjs.org/) استفاده میکنید, کامپوننت `root` داخل `pages/index.js` تعریف شده است.

اکثر برنامه های ریکتی از کامپوننت برای سازماندهی بخش های وبسایت استفاده میکنند. چه برای بخش های کوچکی مانند دکمه یا متن ها, چه برای بخش های بزرگتر صفحه مانند منو یا لیست کشویی.

<<<<<<< HEAD
اگر از [React-based frameworks](/learn/start-a-new-react-project) استفاده کنیم, نسبت به تعریف HTML, فرایند توسعه صفحات سریعتر پیش میرود.
=======
[React-based frameworks](/learn/creating-a-react-app) take this a step further. Instead of using an empty HTML file and letting React "take over" managing the page with JavaScript, they *also* generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.
>>>>>>> d52b3ec734077fd56f012fc2b30a67928d14cc73

همچنان بسیاری از وبسایت ها از React برای [داینامیک کردن صفحات](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) استفاده میشود. انها بجای یک کامپوننت root از کامپوننت بیشتر و ریزتری استفاده کردند. شما میتوانید هرچقدر که نیاز دارید از کتابخانه ریکت استفاده کنید.

</DeepDive>

<Recap>

شما اکنون برای اولین بار طعم React را چشیده اید! اجازه بدهید یکسری موارد را مرور کنیم:

* ریکت به شما اجازه میدهد کامپوننت های خود را, **که اجزایی هستند که میتوان چندین بار داخل اپلیکیشن استفاده کرد .** را توسعه دهید.
* در یک اپلیکیشن ریکتی, هر جایی از صفحه (دراینجا رابط کاربری) یک کامپوننت است.
* کامپوننت های ریکتی درواقع توابع معمولی جاوااسکریپتی هستند. البته باید :

  1. اسم آنها با حروف بزرگ شروع شود.
  2. کد JSX برگردانند.

</Recap>



<Challenges>

#### خروجی گرفتن (export) از کامپوننت {/*export-the-component*/}

کد زیر قاعدتا کار نخواهد کرد. چون کامپوننت اصلی (root) را اکسپورت نکرده ایم:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

برای رفع این مشکل, به راه حل زیر دقت کنید!

<Solution>

دستور `export default` را قبل از تابع اضافه کنید, مانند مثال زیر:

<Sandpack>

```js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/lICfvbD.jpg"
      alt="Aklilu Lemma"
    />
  );
}
```

```css
img { height: 181px; }
```

</Sandpack>

شاید برایتان سوال باشد که تنها دستور `export` برای حل مشکل بالا کافی بود. اگر درباره تفاوت های بین `export` و `export default` را نمیدانید, مقاله [import و export کردن یک کامپوننت](/learn/importing-and-exporting-components) بخوانید

</Solution>

#### رفع مشکل دستور return {/*fix-the-return-statement*/}

عبارت `return` در این کد اشتباه است. میتونی درستش کنی؟!

<Hint>

شاید شما در حین رفع مشکل این دستور به ارور "Unexpected token" برخورد کرده باشید. توجه کنید که حتما سمی کالن بعد از پرانتز بسته `() return` باشد. درغیراینصورت به ارور برخورد میکنید.

</Hint>


<Sandpack>

```js
export default function Profile() {
  return
    <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

<Solution>

برای رفع مشکل این کامپوننت, میتوانید دستور JSX را در یک خط تایپ کنید:

<Sandpack>

```js
export default function Profile() {
  return <img src="https://i.imgur.com/jA8hHMpm.jpg" alt="Katsuko Saruhashi" />;
}
```

```css
img { height: 180px; }
```

</Sandpack>

یا دستور JSX را مابین پرانتز باز و بسته بعد از `return` قرار بدهید:

<Sandpack>

```js
export default function Profile() {
  return (
    <img 
      src="https://i.imgur.com/jA8hHMpm.jpg" 
      alt="Katsuko Saruhashi" 
    />
  );
}
```

```css
img { height: 180px; }
```

</Sandpack>

</Solution>

#### ارور را تشخیص دهید {/*spot-the-mistake*/}

کامپوننت `Profile` را در اینجا تعریف کردیم و زمانی که داریم استفاده میکنیم به ما خطا میدهد! به این معنا است که ریکت, کامپوننت را با یک تگ HTML اشتباه گرفته!

<Sandpack>

```js
function profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <profile />
      <profile />
      <profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<Solution>

نامگذاری کامپونت های ریکتی حتما باید با حرف بزرگ شروع شود!

دستور `()function profile` را به `()function Profile` تغییر دهید, سپس `</ profile>` را `</ Profile>` تغییر دهید:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

</Solution>

#### یک کامپوننت بسازید! {/*your-own-component*/}

یک کامپوننتی را از پایه بنویسید. شما میتوانید هر اسمی را بدهید و هر JSX یی را return کنید. ایده ای ندارید؟ ابتدا یک کامپوننت با نام `Congratulations` بسازید و کاری کنید که کد JSX یی `<h1>Good job!</h1>` را برگرداند. فقط یادتان باشد حتما آن را export کنید!

<Sandpack>

```js
// اینجا کامپوننت خود را بنویسید

```

</Sandpack>

<Solution>

<Sandpack>

```js
export default function Congratulations() {
  return (
    <h1>Good job!</h1>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
