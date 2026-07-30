---
title: درک رابط کاربری به‌صورت یک درخت
---

<Intro>

اپلیکیشن ری‌اکت شما با کامپوننت‌های زیادی که داخل هم تودرتو شده‌اند شکل می‌گیرد. ری‌اکت چگونه ساختار کامپوننتی اپلیکیشن شما را پیگیری می‌کند؟

ری‌اکت، و بسیاری از کتابخانه‌های رابط کاربری دیگر، رابط کاربری را به‌صورت یک درخت مدل می‌کنند. فکر کردن به اپلیکیشن به‌صورت یک درخت برای درک رابطه‌ی بین کامپوننت‌ها مفید است. این درک به شما در رفع اشکال مفاهیم آینده مانند عملکرد و مدیریت استیت کمک می‌کند.

</Intro>

<YouWillLearn>

* ری‌اکت چگونه ساختارهای کامپوننتی را «می‌بیند»
* درخت رندر چیست و برای چه چیزی مفید است
* درخت وابستگی ماژول چیست و برای چه چیزی مفید است

</YouWillLearn>

## رابط کاربری شما به‌صورت یک درخت {/*your-ui-as-a-tree*/}

درخت‌ها مدلی از رابطه‌ی بین آیتم‌ها هستند و رابط کاربری غالباً با ساختارهای درختی نمایش داده می‌شود. برای مثال، مرورگرها از ساختارهای درختی برای مدل‌سازی HTML ([DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction)) و CSS ([CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model)) استفاده می‌کنند. پلتفرم‌های موبایل نیز از درخت‌ها برای نمایش سلسله‌مراتب نما (view) خود استفاده می‌کنند.

<Diagram name="preserving_state_dom_tree" height={193} width={864} alt="Diagram with three sections arranged horizontally. In the first section, there are three rectangles stacked vertically, with labels 'Component A', 'Component B', and 'Component C'. Transitioning to the next pane is an arrow with the React logo on top labeled 'React'. The middle section contains a tree of components, with the root labeled 'A' and two children labeled 'B' and 'C'. The next section is again transitioned using an arrow with the React logo on top labeled 'React DOM'. The third and final section is a wireframe of a browser, containing a tree of 8 nodes, which has only a subset highlighted (indicating the subtree from the middle section).">

ری‌اکت از کامپوننت‌های شما یک درخت رابط کاربری می‌سازد. در این مثال، درخت رابط کاربری سپس برای رندر شدن به DOM استفاده می‌شود.
</Diagram>

مانند مرورگرها و پلتفرم‌های موبایل، ری‌اکت نیز از ساختارهای درختی برای مدیریت و مدل‌سازی رابطه‌ی بین کامپوننت‌ها در یک اپلیکیشن ری‌اکت استفاده می‌کند. این درخت‌ها ابزارهای مفیدی برای درک نحوه‌ی جریان داده در یک اپلیکیشن ری‌اکت و نحوه‌ی بهینه‌سازی رندر و حجم اپلیکیشن هستند.

## درخت رندر {/*the-render-tree*/}

یکی از ویژگی‌های اصلی کامپوننت‌ها، قابلیت ترکیب کامپوننت‌هایی از کامپوننت‌های دیگر است. همان‌طور که [کامپوننت‌ها را تودرتو می‌کنیم](/learn/your-first-component#nesting-and-organizing-components)، مفهوم کامپوننت‌های والد و فرزند را داریم، که در آن هر کامپوننت والد ممکن است خود فرزند کامپوننت دیگری باشد.

هنگامی که یک اپلیکیشن ری‌اکت را رندر می‌کنیم، می‌توانیم این رابطه را در یک درخت مدل‌سازی کنیم که به آن درخت رندر می‌گویند.

در اینجا یک اپلیکیشن ری‌اکت آمده که نقل‌قول‌های الهام‌بخش رندر می‌کند.

<Sandpack>

```js src/App.js
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}

```

```js src/FancyText.js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
```

```js src/InspirationGenerator.js
import * as React from 'react';
import quotes from './quotes';
import FancyText from './FancyText';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const quote = quotes[index];
  const next = () => setIndex((index + 1) % quotes.length);

  return (
    <>
      <p>Your inspirational quote is:</p>
      <FancyText text={quote} />
      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
```

```js src/Copyright.js
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}
```

```js src/quotes.js
export default [
  "Don’t let yesterday take up too much of today.” — Will Rogers",
  "Ambition is putting a ladder against the sky.",
  "A joy that's shared is a joy made double.",
  ];
```

```css
.fancy {
  font-family: 'Georgia';
}
.title {
  color: #007AA3;
  text-decoration: underline;
}
.cursive {
  font-style: italic;
}
.small {
  font-size: 10px;
}
```

</Sandpack>

<Diagram name="render_tree" height={250} width={500} alt="Tree graph with five nodes. Each node represents a component. The root of the tree is App, with two arrows extending from it to 'InspirationGenerator' and 'FancyText'. The arrows are labelled with the word 'renders'. 'InspirationGenerator' node also has two arrows pointing to nodes 'FancyText' and 'Copyright'.">

ری‌اکت یک *درخت رندر*، یعنی یک درخت رابط کاربری، از کامپوننت‌های رندرشده می‌سازد.


</Diagram>

از اپلیکیشن نمونه، می‌توانیم درخت رندر بالا را بسازیم.

این درخت از گره‌هایی تشکیل شده که هر کدام یک کامپوننت را نمایش می‌دهند. `App`, `FancyText`, `Copyright`، که نام بردیم، همگی گره‌هایی در درخت ما هستند.

گره ریشه در درخت رندر ری‌اکت، [کامپوننت ریشه](/learn/importing-and-exporting-components#the-root-component-file) اپلیکیشن است. در این حالت، کامپوننت ریشه `App` است و این اولین کامپوننتی است که ری‌اکت رندر می‌کند. هر فلش در درخت از یک کامپوننت والد به یک کامپوننت فرزند اشاره می‌کند.

<DeepDive>

#### تگ‌های HTML در درخت رندر کجا هستند؟ {/*where-are-the-html-elements-in-the-render-tree*/}

متوجه خواهید شد که در درخت رندر بالا، اشاره‌ای به تگ‌های HTML که هر کامپوننت رندر می‌کند نشده است. این به‌این دلیل است که درخت رندر فقط از [کامپوننت‌های](learn/your-first-component#components-ui-building-blocks) ری‌اکت تشکیل شده است.

ری‌اکت، به‌عنوان یک فریم‌ورک رابط کاربری، مستقل از پلتفرم است. در react.dev، نمونه‌هایی را نشان می‌دهیم که به وب رندر می‌شوند، که از مارک‌آپ HTML به‌عنوان عناصر پایه‌ی رابط کاربری استفاده می‌کند. اما یک اپلیکیشن ری‌اکت می‌تواند به همان راحتی به یک پلتفرم موبایل یا دسکتاپ رندر شود، که ممکن است از عناصر پایه‌ی متفاوتی مانند [UIView](https://developer.apple.com/documentation/uikit/uiview) یا [FrameworkElement](https://learn.microsoft.com/en-us/dotnet/api/system.windows.frameworkelement?view=windowsdesktop-7.0) استفاده کند.

این عناصر پایه‌ی رابط کاربریِ پلتفرم، بخشی از ری‌اکت نیستند. درخت‌های رندر ری‌اکت می‌توانند بدون توجه به اینکه اپلیکیشن شما به چه پلتفرمی رندر می‌شود، بینشی درباره‌ی اپلیکیشن ری‌اکت ما ارائه کنند.

</DeepDive>

یک درخت رندر نشان‌دهنده‌ی یک پاس رندر منفرد از یک اپلیکیشن ری‌اکت است. با [رندر شرطی](/learn/conditional-rendering)، یک کامپوننت والد ممکن است بسته به داده‌های پاس‌داده‌شده، فرزندان متفاوتی رندر کند.

می‌توانیم اپلیکیشن را به‌روزرسانی کنیم تا به‌صورت شرطی یا یک نقل‌قول الهام‌بخش یا یک رنگ رندر کند.

<Sandpack>

```js src/App.js
import FancyText from './FancyText';
import InspirationGenerator from './InspirationGenerator';
import Copyright from './Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}

```

```js src/FancyText.js
export default function FancyText({title, text}) {
  return title
    ? <h1 className='fancy title'>{text}</h1>
    : <h3 className='fancy cursive'>{text}</h3>
}
```

```js src/Color.js
export default function Color({value}) {
  return <div className="colorbox" style={{backgroundColor: value}} />
}
```

```js src/InspirationGenerator.js
import * as React from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';
import Color from './Color';

export default function InspirationGenerator({children}) {
  const [index, setIndex] = React.useState(0);
  const inspiration = inspirations[index];
  const next = () => setIndex((index + 1) % inspirations.length);

  return (
    <>
      <p>Your inspirational {inspiration.type} is:</p>
      {inspiration.type === 'quote'
      ? <FancyText text={inspiration.value} />
      : <Color value={inspiration.value} />}

      <button onClick={next}>Inspire me again</button>
      {children}
    </>
  );
}
```

```js src/Copyright.js
export default function Copyright({year}) {
  return <p className='small'>©️ {year}</p>;
}
```

```js src/inspirations.js
export default [
  {type: 'quote', value: "Don’t let yesterday take up too much of today.” — Will Rogers"},
  {type: 'color', value: "#B73636"},
  {type: 'quote', value: "Ambition is putting a ladder against the sky."},
  {type: 'color', value: "#256266"},
  {type: 'quote', value: "A joy that's shared is a joy made double."},
  {type: 'color', value: "#F9F2B4"},
];
```

```css
.fancy {
  font-family: 'Georgia';
}
.title {
  color: #007AA3;
  text-decoration: underline;
}
.cursive {
  font-style: italic;
}
.small {
  font-size: 10px;
}
.colorbox {
  height: 100px;
  width: 100px;
  margin: 8px;
}
```
</Sandpack>

<Diagram name="conditional_render_tree" height={250} width={561} alt="Tree graph with six nodes. The top node of the tree is labelled 'App' with two arrows extending to nodes labelled 'InspirationGenerator' and 'FancyText'. The arrows are solid lines and are labelled with the word 'renders'. 'InspirationGenerator' node also has three arrows. The arrows to nodes 'FancyText' and 'Color' are dashed and labelled with 'renders?'. The last arrow points to the node labelled 'Copyright' and is solid and labelled with 'renders'.">

با رندر شرطی، در رندرهای مختلف، درخت رندر ممکن است کامپوننت‌های متفاوتی رندر کند.

</Diagram>

در این مثال، بسته به اینکه `inspiration.type` چیست، ممکن است `<FancyText>` یا `<Color>` را رندر کنیم. درخت رندر ممکن است برای هر پاس رندر متفاوت باشد.

اگرچه درخت‌های رندر ممکن است در پاس‌های رندر متفاوت باشند، این درخت‌ها عموماً برای شناسایی اینکه *کامپوننت‌های سطح‌بالا* و *کامپوننت‌های برگ* در یک اپلیکیشن ری‌اکت کدام‌اند مفید هستند. کامپوننت‌های سطح‌بالا کامپوننت‌هایی هستند که به کامپوننت ریشه نزدیک‌ترند و بر عملکرد رندر همه‌ی کامپوننت‌های زیر خود تأثیر می‌گذارند و اغلب پیچیده‌ترین هستند. کامپوننت‌های برگ نزدیک پایین درخت هستند و فرزندی ندارند و غالباً به‌طور مکرر رندر می‌شوند.

شناسایی این دسته‌بندی‌های کامپوننت‌ها برای درک جریان داده و عملکرد اپلیکیشن شما مفید است.

## درخت وابستگی ماژول {/*the-module-dependency-tree*/}

رابطه‌ی دیگری که در یک اپلیکیشن ری‌اکت می‌توان با یک درخت آن را مدل کرد، وابستگی ماژول‌های یک اپلیکیشن است. همان‌طور که [کامپوننت‌ها و منطق خود را](/learn/importing-and-exporting-components#exporting-and-importing-a-component) در فایل‌های جداگانه تقسیم می‌کنیم، [ماژول‌های JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) می‌سازیم که ممکن است در آن‌ها کامپوننت، تابع یا ثابت اکسپورت کنیم.

هر گره در درخت وابستگی ماژول یک ماژول است و هر شاخه نشان‌دهنده‌ی یک دستور `import` در آن ماژول است.

اگر اپلیکیشن الهام‌بخش قبلی را برداریم، می‌توانیم یک درخت وابستگی ماژول، یا به‌اختصار درخت وابستگی، بسازیم.

<Diagram name="module_dependency_tree" height={250} width={658} alt="A tree graph with seven nodes. Each node is labelled with a module name. The top level node of the tree is labelled 'App.js'. There are three arrows pointing to the modules 'InspirationGenerator.js', 'FancyText.js' and 'Copyright.js' and the arrows are labelled with 'imports'. From the 'InspirationGenerator.js' node, there are three arrows that extend to three modules: 'FancyText.js', 'Color.js', and 'inspirations.js'. The arrows are labelled with 'imports'.">

درخت وابستگی ماژول برای اپلیکیشن الهام‌بخش.

</Diagram>

گره ریشه‌ی درخت، ماژول ریشه است، که به آن فایل نقطه‌ی ورود (entrypoint) نیز می‌گویند. این غالباً ماژیولی است که حاوی کامپوننت ریشه است.

در مقایسه با درخت رندر همان اپلیکیشن، ساختارهایی مشابه وجود دارد اما چند تفاوت قابل‌توجه هم هست:

* گره‌هایی که درخت را تشکیل می‌دهند، ماژول‌ها را نمایش می‌دهند، نه کامپوننت‌ها.
* ماژول‌های غیرکامپوننتی، مانند `inspirations.js`، نیز در این درخت نمایش داده می‌شوند. درخت رندر فقط کامپوننت‌ها را پوشش می‌دهد.
* `Copyright.js` زیر `App.js` قرار می‌گیرد اما در درخت رندر، `Copyright`، یعنی کامپوننت، به‌عنوان فرزند `InspirationGenerator` ظاهر می‌شود. این به‌این دلیل است که `InspirationGenerator` JSX را به‌عنوان [پراپس فرزندان](/learn/passing-props-to-a-component#passing-jsx-as-children) می‌پذیرد، بنابراین `Copyright` را به‌عنوان یک کامپوننت فرزند رندر می‌کند اما ماژول آن را ایمپورت نمی‌کند.

درخت‌های وابستگی برای تعیین اینکه چه ماژول‌هایی برای اجرای اپلیکیشن ری‌اکت شما ضروری هستند مفیدند. هنگام ساخت یک اپلیکیشن ری‌اکت برای پروداکشن، معمولاً یک مرحله‌ی بیلد وجود دارد که تمام جاوااسکریپت لازم را برای ارسال به کلاینت باندل می‌کند. ابزار مسئول این کار [باندلر](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Overview#the_modern_tooling_ecosystem) نامیده می‌شود، و باندلرها از درخت وابستگی استفاده می‌کنند تا تعیین کنند چه ماژول‌هایی باید گنجانده شوند.

هرچه اپلیکیشن شما رشد می‌کند، اغلب حجم باندل هم افزایش می‌یابد. حجم باندل بزرگ برای کلاینت دانلود و اجرا کردن پرهزینه است. حجم باندل بزرگ می‌تواند زمان رسم رابط کاربری شما را به‌تعویق بیندازد. درک درخت وابستگی اپلیکیشن شما می‌تواند در رفع اشکال این مسائل کمک کند.

[comment]: <> (perhaps we should also deep dive on conditional imports)

<Recap>

* درخت‌ها روشی رایج برای نمایش رابطه‌ی بین موجودیت‌ها هستند. آن‌ها غالباً برای مدل‌سازی رابط کاربری استفاده می‌شوند.
* درخت‌های رندر، رابطه‌ی تودرتوی بین کامپوننت‌های ری‌اکت را در طول یک رندر منفرد نمایش می‌دهند.
* با رندر شرطی، درخت رندر ممکن است در رندرهای مختلف تغییر کند. با مقادیر پراپس متفاوت، کامپوننت‌ها ممکن است کامپوننت‌های فرزند متفاوتی رندر کنند.
* درخت‌های رندر کمک می‌کنند شناسایی کنیم کامپوننت‌های سطح‌بالا و برگ کدام‌اند. کامپوننت‌های سطح‌بالا بر عملکرد رندر همه‌ی کامپوننت‌های زیر خود تأثیر می‌گذارند و کامپوننت‌های برگ غالباً به‌طور مکرر رندر می‌شوند. شناسایی آن‌ها برای درک و رفع اشکال عملکرد رندر مفید است.
* درخت‌های وابستگی، وابستگی‌های ماژول را در یک اپلیکیشن ری‌اکت نمایش می‌دهند.
* درخت‌های وابستگی توسط ابزارهای بیلد برای باندل کردن کد لازم جهت ارسال اپلیکیشن استفاده می‌شوند.
* درخت‌های وابستگی برای رفع اشکال حجم‌های باندل بزرگ که زمان رنگ‌آمیزی (paint) را کند می‌کنند و فراهم کردن فرصت‌هایی برای بهینه‌سازی کدی که باندل می‌شود، مفیدند.

</Recap>

[TODO]: <> (Add challenges)
