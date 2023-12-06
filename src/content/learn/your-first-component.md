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

## تعریف یک کامپوونت {/*defining-a-component*/}

قبلا برای ساخت صفحات وب از تگ های HTML استفاده و برای داینامیک کردن آنها کد های جاوااسکریپتی نوشته میشد, که در زمان خود راه خوبی بود. ولی امروزه چون توی صفحات وب میخواهیم اینتراکشن و پویای بیشتری داشته باشند باید اسکریپت های بیشتری اضافه کنیم. که React تعامل را اولویت قرار میدهد ولی هنوز از همان تکنولوژی استفاده میکند: **یک کامپوننت React تابع جاوااسکریپتی است که شما میتوانید تگ های HTML را در آن بنویسید**که به این صورت نوشته میشود (میتوانید مثال زیر را تغییر دهید)

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

نحوه ساخت کامپوننت:

### قدم اول: خروجی گرفتن (Export) یک کامپوننت {/*step-1-export-the-component*/}
 
دستور `export default` یک پیشوند در زبان جاوااسکریپت است [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (نه فقط در React), به شما اجازه میدهد که تابع اصلی خود را در فایل مشخص کنید و در فایل دیگر import کنید. (درباره Import بدانید [Importing and Exporting Components](/learn/importing-and-exporting-components)!)

### قدم دوم: ساخت و تعریف توابع {/*step-2-define-the-function*/}

با دستور `function Profile() { }` شما میتوانید یک تابع جاوااسکریپتی با نام `Profile` تعریف کنید.

<Pitfall>

کامپوننت های React همان توابع معمولی در جاوااسکریپت هستند, با این تفاوت که باید  **حرف اول اسم آن از حروف بزرگ باشد** وگرنه ارور میدهد!

</Pitfall>

### قدم سوم: اضافه کردن تگ HTML {/*step-3-add-markup*/}

کامپوننت زیر یک تگ `<img />` را به همراه اتریبیوت های `src` و `alt` برمیگرداند. `<img />` مانند HTML نوشته میشود ولی این یک دستور جاوااسکریپتی است! این سینتکس [JSX](/learn/writing-markup-with-jsx) نام دارد, و به شما اجازه میدهد تا تگ های HTML را مستقیما در یک فایل جاوااسکریپت بنویسید.

دستور return را هم میتوان به این صورت در یک خط نوشت:

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

## استفاده از یک کامپوننت {/*using-a-component*/}

بعد از اینکه کامپونت `Profile` خود را ساخته اید, الان وقت آن است که همان کامپوننت را در میان کامپوننت های دیگر قرار بدهید. به عنوان مثال شما میتوانید کامپوننت `Gallery` را به همراه چند کامپوننت `Profile` که داخل آن استفاده شده است را export بگیرید:

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

### قرار دادن کامپوننت داخل یک کامپوننت دیگر {/*nesting-and-organizing-components*/}

کامپوننت ها درواقع فانکشن های معمولی جاوااسکریپت هستند, پس شما میتوانید در یک فایل چند کامپوننت تعریف کنید که معمولا زمانی استفاده میشود که کامپوننت ها نسبتا کوچک یا باهم ربطی داشته باشند و اگر فایل شلوغ شد آنها را در فایل های جداگانه ای قرار بدهید. درباره انجام دادن آن و [دستور Import](/learn/importing-and-exporting-components) میتوانید مطالعه کنید.

چون کامپوننت `Profile` داخل کامپوننت `Gallery` هست و چند باری هم تکرار شده, بنابراین کامپوننت `Gallery` یک کامپوننت والد یا **parent component** که کامپوننت `Gallery` که فرزندان خودش هست را اجرا یا رندر گیری میکند. این بخشی از جادو ریکت است: که میتوانید کامپوننت را یکبار تعریف کنید و هرچند باری که لازم داشتید صدا بزنید.

<Pitfall>

کامپوننت ها میتوانند کامپوننت های داختلی خود را رندر بگیرند, اما **به هیچ وجه کامپوننت هارا تودرتو تعریف نکنید:**

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

#### Components all the way down {/*components-all-the-way-down*/}

اپلیکیشن ریکتی شما از کامپوننت `root` شروع میشود. معمولا زمانی که یک پروژه جدید میسازید این کامپوننت ساخته میشود, مثلا اگر شما از [CodeSandbox](https://codesandbox.io/) یا [Create React App](https://create-react-app.dev/) استفاده میکنید, به طور پیش فرض داخل `src/App.js` تعریف شده. اگر از فریمورک [Next.js](https://nextjs.org/) استفاده میکنید, کامپوننت `root` داخل `pages/index.js` تعریف شده است.

Most React apps use components all the way down. This means that you won't only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

[React-based frameworks](/learn/start-a-new-react-project) take this a step further. Instead of using an empty HTML file and letting React "take over" managing the page with JavaScript, they *also* generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to [add interactivity to existing HTML pages.](/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page) They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

</DeepDive>

<Recap>

You've just gotten your first taste of React! Let's recap some key points.

* React lets you create components, **reusable UI elements for your app.**
* In a React app, every piece of UI is a component.
* React components are regular JavaScript functions except:

  1. Their names always begin with a capital letter.
  2. They return JSX markup.

</Recap>



<Challenges>

#### Export the component {/*export-the-component*/}

This sandbox doesn't work because the root component is not exported:

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

Try to fix it yourself before looking at the solution!

<Solution>

Add `export default` before the function definition like so:

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

You might be wondering why writing `export` alone is not enough to fix this example. You can learn the difference between `export` and `export default` in [Importing and Exporting Components.](/learn/importing-and-exporting-components)

</Solution>

#### Fix the return statement {/*fix-the-return-statement*/}

Something isn't right about this `return` statement. Can you fix it?

<Hint>

You may get an "Unexpected token" error while trying to fix this. In that case, check that the semicolon appears *after* the closing parenthesis. Leaving a semicolon inside `return ( )` will cause an error.

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

You can fix this component by moving the return statement to one line like so:

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

Or by wrapping the returned JSX markup in parentheses that open right after `return`:

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

#### Spot the mistake {/*spot-the-mistake*/}

Something's wrong with how the `Profile` component is declared and used. Can you spot the mistake? (Try to remember how React distinguishes components from the regular HTML tags!)

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

React component names must start with a capital letter.

Change `function profile()` to `function Profile()`, and then change every `<profile />` to `<Profile />`:

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

#### Your own component {/*your-own-component*/}

Write a component from scratch. You can give it any valid name and return any markup. If you're out of ideas, you can write a `Congratulations` component that shows `<h1>Good job!</h1>`. Don't forget to export it!

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
