---
title: اولین کامپوننت شما
---

<Intro>

*کامپوننت‌ها* یکی از مفاهیم اصلی ری‌اکت هستند. آن‌ها بنیانی هستند که رابط‌های کاربری (UI) را روی آن می‌سازید، که آن‌ها را بهترین نقطه برای شروع سفر ری‌اکت شما می‌کند!

</Intro>

<YouWillLearn>

* یک کامپوننت چیست
* کامپوننت‌ها چه نقشی در یک اپلیکیشن ری‌اکت دارند
* چگونه اولین کامپوننت ری‌اکت خود را بنویسیم

</YouWillLearn>

## کامپوننت‌ها: بلوک‌های سازنده‌ی رابط کاربری {/*components-ui-building-blocks*/}

در وب، HTML به ما اجازه می‌دهد با مجموعه‌ای از تگ‌های داخلی مانند `<h1>` و `<li>` اسناد ساختاریافته‌ی غنی بسازیم:

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

این مارک‌آپ این مقاله `<article>`، عنوان آن `<h1>` و یک فهرست محتوا (به‌صورت مختصر) را به‌عنوان یک لیست مرتب `<ol>` نمایش می‌دهد. مارک‌آپی مانند این، در کنار CSS برای استایل و جاوااسکریپت برای تعامل‌پذیری، پشت هر نوار کناری، آواتار، مودال، دراپ‌داون—هر قطعه‌ی رابط کاربری که در وب می‌بینید قرار دارد.

ری‌اکت به شما اجازه می‌دهد مارک‌آپ، CSS و جاوااسکریپت خود را در «کامپوننت‌های» سفارشی، **عناصر رابط کاربری قابل‌استفاده‌ی مجدد برای اپلیکیشن شما**، ترکیب کنید. کد فهرست محتوایی که بالا دیدید می‌تواند به یک کامپوننت `<TableOfContents />` تبدیل شود که می‌توانید آن را در هر صفحه‌ای رندر کنید. در زیر کاپوت، آن همچنان از همان تگ‌های HTML مانند `<article>` و `<h1>` و غیره استفاده می‌کند.

دقیقاً مانند تگ‌های HTML، می‌توانید کامپوننت‌ها را ترکیب، مرتب و تودرتو کنید تا کل صفحات را طراحی کنید. برای مثال، صفحه‌ی مستندی که در حال خواندن آن هستید از کامپوننت‌های ری‌اکت ساخته شده است:

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

هرچه پروژه‌ی شما رشد می‌کند، متوجه می‌شوید که بسیاری از طراحی‌هایتان را می‌توان با استفاده‌ی مجدد از کامپوننت‌هایی که قبلاً نوشته‌اید ترکیب کرد، که توسعه را تسریع می‌کند. فهرست محتوای بالا می‌تواند با `<TableOfContents />` به هر صفحه‌ای اضافه شود! حتی می‌توانید پروژه‌ی خود را با هزاران کامپوننت به اشتراک‌گذاشته‌شده توسط جامعه‌ی متن‌باز ری‌اکت مانند [Chakra UI](https://chakra-ui.com/) و [Material UI](https://material-ui.com/) آغاز کنید.

## تعریف یک کامپوننت {/*defining-a-component*/}

به‌طور سنتی هنگام ساخت صفحات وب، توسعه‌دهندگان وب محتوای خود را مارک‌آپ می‌کردند و سپس با پاشیدن مقداری جاوااسکریپت تعامل را اضافه می‌کردند. این روش وقتی تعامل در وب یک ویژگی «دوست‌داشتنی» بود عالی کار می‌کرد. اکنون برای بسیاری از سایت‌ها و همه‌ی اپلیکیشن‌ها انتظار می‌رود. ری‌اکت تعامل‌پذیری را در اولویت قرار می‌دهد در حالی که هنوز از همان فناوری استفاده می‌کند: **یک کامپوننت ری‌اکت یک تابع جاوااسکریپت است که می‌توانید _روی آن مارک‌آپ بپاشید_.** این چیزی است که به نظر می‌رسد (می‌توانید مثال زیر را ویرایش کنید):

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

و این چگونگی ساخت یک کامپوننت است:

### گام ۱: اکسپورت کردن کامپوننت {/*step-1-export-the-component*/}

پیشوند `export default` یک [نحو استاندارد جاوااسکریپت](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) است (مختص ری‌اکت نیست). این به شما اجازه می‌دهد تابع اصلی را در یک فایل نشانه‌گذاری کنید تا بتوانید بعداً آن را از فایل‌های دیگر ایمپورت کنید. (بیشتر درباره‌ی ایمپورت در [ایمپورت و اکسپورت کردن کامپوننت‌ها](/learn/importing-and-exporting-components)!)

### گام ۲: تعریف تابع {/*step-2-define-the-function*/}

با `function Profile() { }` یک تابع جاوااسکریپت با نام `Profile` تعریف می‌کنید.

<Pitfall>

کامپوننت‌های ری‌اکت توابع جاوااسکریپت معمولی هستند، اما **نام آن‌ها باید با حرف بزرگ شروع شود** وگرنه کار نخواهند کرد!

</Pitfall>

### گام ۳: افزودن مارک‌آپ {/*step-3-add-markup*/}

کامپوننت یک تگ `<img />` با ویژگی‌های `src` و `alt` برمی‌گرداند. `<img />` مانند HTML نوشته شده، اما در واقع زیر کاپوت جاوااسکریپت است! این نحو [JSX](/learn/writing-markup-with-jsx) نامیده می‌شود، و به شما اجازه می‌دهد مارک‌آپ را درون جاوااسکریپت جاسازی کنید.

دستورات return می‌توانند همه در یک خط نوشته شوند، مانند این کامپوننت:

```js
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```

اما اگر مارک‌آپ شما همگی در همان خط کلمه‌ی کلیدی `return` نیست، باید آن را در یک جفت پرانتز بپیچید:

```js
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<Pitfall>

بدون پرانتز، هر کدی روی خطوط بعد از `return` [نادیده گرفته خواهد شد](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

</Pitfall>

## استفاده از یک کامپوننت {/*using-a-component*/}

اکنون که کامپوننت `Profile` خود را تعریف کردید، می‌توانید آن را درون کامپوننت‌های دیگر تودرتو کنید. برای مثال، می‌توانید یک کامپوننت `Gallery` را اکسپورت کنید که از چندین کامپوننت `Profile` استفاده می‌کند:

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

### آنچه مرورگر می‌بیند {/*what-the-browser-sees*/}

به تفاوت در بزرگ‌و‌کوچکی حروف توجه کنید:

* `<section>` با حروف کوچک نوشته شده، بنابراین ری‌اکت می‌داند که به یک تگ HTML ارجاع می‌دهیم.
* `<Profile />` با `P` بزرگ شروع می‌شود، بنابراین ری‌اکت می‌داند که می‌خواهیم از کامپوننتی به نام `Profile` استفاده کنیم.

و `Profile` حتی HTML بیشتری شامل می‌شود: `<img />`. در نهایت، این چیزی است که مرورگر می‌بیند:

```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

### تودرتو کردن و سازماندهی کامپوننت‌ها {/*nesting-and-organizing-components*/}

کامپوننت‌ها توابع جاوااسکریپت معمولی هستند، بنابراین می‌توانید چندین کامپوننت را در همان فایل نگه دارید. این وقتی کامپوننت‌ها نسبتاً کوچک یا به‌هم نزدیک‌اند، راحت است. اگر این فایل شلوغ شد، همیشه می‌توانید `Profile` را به یک فایل جداگانه منتقل کنید. به‌زودی در [صفحه‌ی مربوط به ایمپورت](/learn/importing-and-exporting-components) یاد می‌گیرید که چگونه این کار را انجام دهید.

از آنجا که کامپوننت‌های `Profile` درون `Gallery` رندر می‌شوند—حتی چندین بار!—می‌توانیم بگوییم `Gallery` یک **کامپوننت والد** است که هر `Profile` را به‌عنوان یک «فرزند» رندر می‌کند. این بخشی از جادوی ری‌اکت است: می‌توانید یک کامپوننت را یک‌بار تعریف کنید، و سپس در هر تعداد مکان و به هر تعداد بار که دوست دارید از آن استفاده کنید.

<Pitfall>

کامپوننت‌ها می‌توانند کامپوننت‌های دیگر را رندر کنند، اما **هرگز نباید تعریف آن‌ها را تودرتو کنید:**

```js {2-5}
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

قطعه‌ی بالا [بسیار کند است و باعث باگ می‌شود.](/learn/preserving-and-resetting-state#different-components-at-the-same-position-reset-state) در عوض، هر کامپوننت را در سطح بالا تعریف کنید:

```js {5-8}
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

وقتی یک کامپوننت فرزند به داده‌ای از والد نیاز دارد، به‌جای تودرتوسازی تعاریف، آن را [از طریق پراپس پاس بدهید](/learn/passing-props-to-a-component).

</Pitfall>

<DeepDive>

#### کامپوننت‌ها تا پایین درخت {/*components-all-the-way-down*/}

اپلیکیشن ری‌اکت شما با یک کامپوننت «ریشه» آغاز می‌شود. معمولاً این کامپوننت هنگام شروع یک پروژه‌ی جدید به‌صورت خودکار ایجاد می‌شود. برای مثال، اگر از [CodeSandbox](https://codesandbox.io/) استفاده می‌کنید یا از فریم‌ورک [Next.js](https://nextjs.org/) استفاده می‌کنید، کامپوننت ریشه در `pages/index.js` تعریف می‌شود. در این مثال‌ها، شما کامپوننت‌های ریشه را اکسپورت کرده‌اید.

اکثر اپلیکیشن‌های ری‌اکت تا پایین درخت از کامپوننت استفاده می‌کنند. این یعنی شما نه‌تنها از کامپوننت‌ها برای قطعات قابل‌استفاده‌ی مجدد مانند دکمه‌ها استفاده می‌کنید، بلکه برای قطعات بزرگ‌تری مانند نوارهای کناری، لیست‌ها و در نهایت صفحات کامل نیز بهره می‌برید! کامپوننت‌ها راهی مفید برای سازماندهی کد و مارک‌آپ رابط کاربری هستند، حتی اگر برخی از آن‌ها فقط یک‌بار استفاده شوند.

[فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/start-a-new-react-project) این کار را یک گام جلوتر می‌برند. به‌جای استفاده از یک فایل HTML خالی و اجازه دادن به ری‌اکت برای «به‌دست‌گرفتن» مدیریت صفحه با جاوااسکریپت، آن‌ها *همچنین* HTML را به‌صورت خودکار از کامپوننت‌های ری‌اکت شما تولید می‌کنند. این اجازه می‌دهد اپلیکیشن شما مقداری محتوا را پیش از بارگذاری کد جاوااسکریپت نمایش دهد.

با این حال، بسیاری از وب‌سایت‌ها فقط از ری‌اکت برای [افزودن تعامل به صفحات HTML موجود](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) استفاده می‌کنند. آن‌ها به‌جای یک کامپوننت ریشه‌ی واحد برای کل صفحه، کامپوننت‌های ریشه‌ی زیادی دارند. می‌توانید به همان اندازه که نیاز دارید—یا کم—از ری‌اکت استفاده کنید.

</DeepDive>

<Recap>

شما همین الان اولین چشمداشت خود را از ری‌اکت داشتید! بیایید چند نکته‌ی کلیدی را مرور کنیم.

* ری‌اکت به شما اجازه می‌دهد کامپوننت بسازید، **عناصر رابط کاربری قابل‌استفاده‌ی مجدد برای اپلیکیشن شما.**
* در یک اپلیکیشن ری‌اکت، هر قطعه‌ی رابط کاربری یک کامپوننت است.
* کامپوننت‌های ری‌اکت توابع جاوااسکریپت معمولی هستند، به‌جز:

  1. نام آن‌ها همیشه با حرف بزرگ شروع می‌شود.
  2. آن‌ها مارک‌آپ JSX را برمی‌گردانند.

</Recap>



<Challenges>

#### اکسپورت کردن کامپوننت {/*export-the-component*/}

این سندباکس کار نمی‌کند چون کامپوننت ریشه اکسپورت نشده است:

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

سعی کنید قبل از دیدن راه‌حل خودتان آن را اصلاح کنید!

<Solution>

`export default` را قبل از تعریف تابع به این شکل اضافه کنید:

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

ممکن است تعجب کنید چرا نوشتن `export` به‌تنهایی برای اصلاح این مثال کافی نیست. می‌توانید تفاوت بین `export` و `export default` را در [ایمپورت و اکسپورت کردن کامپوننت‌ها](/learn/importing-and-exporting-components) یاد بگیرید.

</Solution>

#### اصلاح دستور return {/*fix-the-return-statement*/}

چیزی درباره‌ی این دستور `return` درست نیست. می‌توانید آن را اصلاح کنید؟

<Hint>

ممکن است هنگام تلاش برای اصلاح این کد با خطای «Unexpected token» مواجه شوید. در این حالت، بررسی کنید که نقطه‌ویرگول *بعد* از پرانتز بسته ظاهر شود. رها کردن یک نقطه‌ویرگول داخل `return ( )` باعث خطا می‌شود.

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

می‌توانید این کامپوننت را با انتقال دستور return به یک خط به این شکل اصلاح کنید:

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

یا با پیچیدن مارک‌آپ JSX برگشتی در پرانتزهایی که بلافاصله پس از `return` باز می‌شوند:

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

#### پیدا کردن اشتباه {/*spot-the-mistake*/}

چیزی درباره‌ی نحوه‌ی تعریف و استفاده‌ی کامپوننت `Profile` اشتباه است. می‌توانید اشتباه را پیدا کنید؟ (سعی کنید به یاد بیاورید که ری‌اکت چگونه کامپوننت‌ها را از تگ‌های معمولی HTML تشخیص می‌دهد!)

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

نام کامپوننت‌های ری‌اکت باید با حرف بزرگ شروع شود.

`function profile()` را به `function Profile()` تغییر دهید، و سپس هر `<profile />` را به `<Profile />` تغییر دهید:

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

#### کامپوننت خودتان {/*your-own-component*/}

یک کامپوننت از صفر بنویسید. می‌توانید هر نام معتبری به آن بدهید و هر مارک‌آپی را برگردانید. اگر ایده‌ای ندارید، می‌توانید یک کامپوننت `Congratulations` بنویسید که `<h1>Good job!</h1>` را نمایش دهد. فراموش نکنید آن را اکسپورت کنید!

<Sandpack>

```js
// Write your component below!

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
