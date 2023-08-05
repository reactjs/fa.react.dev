---
title: پاسخگویی به رویداد‌ها
---

<Intro>

ری‌اکت به شما اجازه می‌دهد که به ‌JSX خود ‌*event handler*ها را اضافه. Event handlerها توابع خود شما هستند که در زمان پاسخگویی به تعاملاتی مانند کلیک کردن‌‌، hover کردن، تمرکز کردن روی input های فرم و دیگر چیزها فعال می‌شوند.

</Intro>

<YouWillLearn>

* روش های مختلف برای نوشتن یک event handler
* نحوه انتقال منطق مدیریت رویداد از کامپوننت پدر
* نحوه انتشار رویداد‌ها و چگونگی توقف آن‌ها

</YouWillLearn>

## اضافه کردن event handlerها {/*adding-event-handlers*/}

برای افزودن یک event handler، ابتدا یک تابع تعریف می‌کنید و سپس [آن را به عنوان props](/learn/passing-props-to-a-component) به تگ JSX مناسب پاس می‌دهید. به عنوان مثال، در اینجا دکمه ای وجود دارد که هنوز هیچ کاری انجام نمی دهد:

<Sandpack>

```js
export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}
```

</Sandpack>

با دنبال کردن این سه مرحله می توانید کاری کنید که وقتی کاربر کلیک می کند پیامی نشان دهد:

1. تابعی به نام `handleClick` *در داخل* کامپوننت `Button` خود تعریف کنید.
2. منطق را در داخل آن تابع پیاده سازی کنید (از `alert` برای نمایش پیام استفاده کنید).
3. `onClick={handleClick}` را به JSX المنت `<button>` اضافه کنید.

<Sandpack>

```js
export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

شما تابع `handleClick` را تعریف کردید و سپس [آن را به عنوان یک prop](/learn/passing-props-to-a-component) به `<button>` پاس دادید. `handleClick` یک **event handler** است. عملکردهای event handler:

* معمولاً *داخل* کامپوننت شما تعریف می شوند.
* نام هایی دارند که با `handle` شروع می شوند و به دنبال آن، نام رویداد می آید.

طبق قرارداد، نامگذاری event handlerها به این صورت رایج است که ابتدا `handle` و به دنبال آن نام رویداد می‌آید. اغلب `onClick={handleClick}`، `onMouseEnter={handleMouseEnter}`و غیره را خواهید دید.

از طرف دیگر، می توانید یک event handler به صورت درخط (inline) در JSX تعریف کنید:

```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

یا به طور خلاصه تر، استفاده از یک arrow function:

```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```

همه این مدل‌ها معادل هستند. event handler های درخط (inline) برای عملکردهای کوتاه مناسب هستند.

<Pitfall>

توابع پاس داده شده به event handlerها باید پاس داده شوند، نه اینکه فراخوانی شوند. مثلا:

| پاس دادن یک تابع (درست)             | فراخوانی یک تابع (نادرست)          |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |

تفاوت ظریف است. در مثال اول، تابع `handleClick` به عنوان یک event handler از نوع `onClick` پاس داده می‌شود. این به ری‌اکت می‌گوید که آن را به خاطر بسپارد و تنها زمانی که کاربر روی دکمه کلیک کرد، تابع شما را فراخوانی کند.

در مثال دوم، `()` در انتهای `()handleClick` تابع را *بلافاصله* در زمان [رندر کردن](/learn/render-and-commit)، بدون هیچ کلیکی فعال می کند. این به این دلیل است که جاوا اسکریپت در [JSX `{` و `}`](/learn/javascript-in-jsx-with-curly-braces) بلافاصله اجرا می شود.

هنگامی که کد را به صورت درخط (inline) می نویسید، همان دام به شکل دیگری خود را نشان می دهد:

| پاس دادن یک تابع (درست)                    | فراخوانی یک تابع (نادرست)         |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |


پاس دادن کدهای درخط (inline) مانند این، هنگام کلیک کردن فراخوانی نمی‌شود—هر بار که کامپوننت رندر می‌شود فراخوانی می‌شود:

```jsx
// This alert fires when the component renders, not when clicked!
<button onClick={alert('You clicked me!')}>
```

اگر می خواهید event handler خود را به صورت درخط (inline) تعریف کنید، آن را در یک تابع ناشناس مانند زیر قرار دهید:

```jsx
<button onClick={() => alert('You clicked me!')}>
```

این کار به جای اجرای کد داخل با هر رندر، تابعی ایجاد می کند که بعدا فراخوانی می شود.

در هر دو مورد، چیزی که می خواهید پاس دهید یک تابع است:

* `<button onClick={handleClick}>` تابع `handleClick` را پاس می‌دهد .
* `<button onClick={() => alert('...')}>` تابع `() => alert('...')` را پاس می‌دهد .

[درباره arrow functions بیشتر بخوانید.](https://javascript.info/arrow-functions-basics)

</Pitfall>

### خواندن props در event handlerها {/*reading-props-in-event-handlers*/}

از آنجایی که event handlerها در داخل یک کامپوننت تعریف می‌شوند، به propهای آن کامپوننت دسترسی دارند. در اینجا دکمه‌ای وجود دارد که با کلیک روی آن، یک هشدار با prop `message` خود نشان می دهد:

<Sandpack>

```js
function AlertButton({ message, children }) {
  return (
    <button onClick={() => alert(message)}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Playing!">
        Play Movie
      </AlertButton>
      <AlertButton message="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

این به دو دکمه اجازه می دهد پیام های متفاوتی را نشان دهند. امتحان کنید پیام های پاس داده شده به آنها را تغییر دهید.

### پاس دادن event handlerها به عنوان props {/*passing-event-handlers-as-props*/}

اغلب شما می خواهید که کامپوننت پدر، event handler فرزند را مشخص کند. دکمه‌ها را در نظر بگیرید: بسته به جایی که از کامپوننت `Button` استفاده می‌کنید، ممکن است بخواهید عملکرد متفاوتی را اجرا کنید—شاید یکی فیلمی را پخش کند و دیگری تصویری را آپلود کند.

برای انجام این کار، propی را که کامپوننت از پدر خود به عنوان event handler  دریافت می‌کند، پاس دهید:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

در اینجا، کامپوننت `Toolbar` یک `PlayButton` و یک `UploadButton` را رندر می‌کند:

- `handlePlayClick‍‍‍`، `PlayButton‍‍‍` را به‌عنوان `onClick` prop به `Button` داخل پاس می‌دهد.
- `UploadButton` هم `alert('Uploading!') <= ()` را به عنوان `onClick` prop به `Button` داخل پاس می‌دهد.

در نهایت، کامپوننت `Button` شما یک prop به نام `onClick` را می‌گیرد. آن را مستقیماً با `onClick={onClick}` به `<button>` داخلی مرورگر پاس می‌دهد. این به ری‌اکت می‌گوید که با کلیک، تابع پاس داده شده را فراخوانی کند.

اگر از [design system](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) استفاده می کنید، معمولاً کامپوننت‌هایی مانند دکمه ها دارای استایل هستند، اما رفتار را مشخص نمی کنند. در عوض، کامپوننت‌هایی مانند `PlayButton` و event handler `UploadButton` ها را به پایین پاس می‌دهند.

### نامگذاری propهای event handler {/*naming-event-handler-props*/}

اجزای داخلی مانند `<button>` و `<div>` فقط از  [نام‌ رویدادهای مرورگر](/reference/react-dom/components/common#common-props) مانند `onClick` پشتیبانی می‌کنند. با این حال، زمانی که کامپوننت‌های خود را می‌سازید، می‌توانید به هر نحوی که دوست دارید، propهای event handler  را نامگذاری کنید.

طبق قرارداد، propهای event handler باید با `on` شروع شوند و به دنبال آن یک حرف بزرگ بیاید.

به عنوان مثال، `onClick` prop کامپوننت `Button` را می‌توان `onSmash` نامید:

<Sandpack>

```js
function Button({ onSmash, children }) {
  return (
    <button onClick={onSmash}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div>
      <Button onSmash={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onSmash={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

در این مثال، `<button onClick={onSmash}>` نشان می دهد که `<button>` (حروف کوچک) مرورگر همچنان به یک prop به نام `onClick` نیاز دارد، اما نام prop دریافت شده توسط کامپوننت `Button` سفارشی شما، در اختیار شما است.

هنگامی که کامپوننت شما از تعاملات متعدد پشتیبانی می کند، ممکن است براساس مفاهیم خاص برنامه، propهای event handler را نامگذاری کنید. برای مثال، این کامپوننت event handler ،`Toolbar`های `onPlayMovie` و `onUploadImage` را دریافت می‌کند:

<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

توجه کنید که چگونه کامپوننت `App` نیازی به دانستن اینکه `Toolbar` *چه کاری* با `onPlayMovie` یا `onUploadImage` می‌خوهد انجام دهد، ندارد. این جزییات پیاده سازی `Toolbar` است. در اینجا، `Toolbar` آن‌ها را به‌عنوان کنترل‌کننده `onClick` به `Button`های خود پاس می‌دهد، اما بعداً می‌تواند آنها را با کلیک نیز فعال کند. نام‌گذاری ابزارها بر اساس مفاهیم خاص برنامه مانند `onPlayMovie` به شما این امکان را می‌دهد که نحوه استفاده از آنها را بتوانید بعداً تغییر دهید.

## انتشار رویداد {/*event-propagation*/}

event handlerها همچنین رویدادها را از هر فرزندی که ممکن است کامپوننت شما داشته باشد، دریافت می‌کنند. ما می گوییم که یک رویداد "حباب" یا "تکثیر" می‌شود به بالای درخت: از جایی که رویداد اتفاق افتاده شروع می شود، و سپس به بالای درخت می رود.

این `<div>` حاوی دو دکمه است. هم `<div>` *و* هم دکمه‌ها، کنترل کننده های `onClick` خود را دارند. فکر می‌کنید با کلیک روی یک دکمه، کدام کنترل کننده‌ها فعال می‌شوند؟

<Sandpack>

```js
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

اگر روی هر یک از دکمه‌ها کلیک کنید، `onClick` آن ابتدا اجرا می‌شود و سپس `onClick` المنت `<div>` پدر اجرا می‌شود. بنابراین دو پیام ظاهر می شود. اگر روی نوار ابزار کلیک کنید، فقط `onClick` المنت `<div>` پدر اجرا خواهد شد.

<Pitfall>

همه رویدادها در ری‌اکت منتشر می شوند به جز `onScroll` که فقط روی تگ JSX که به آن متصل شده کار می کند.

</Pitfall>

### توقف انتشار {/*stopping-propagation*/}

event handlerها یک **event object** را به عنوان تنها آرگومان خود دریافت می کند. طبق قرارداد، معمولا `e` نامیده می شود که مخفف "event" است. می توانید از این شی برای خواندن اطلاعات مربوط به رویداد استفاده کنید.

این event object همچنین به شما امکان می دهد انتشار را متوقف کنید. اگر می‌خواهید از رسیدن یک رویداد به کامپوننت‌های پدر جلوگیری کنید، باید `()e.stopPropagation` را مانند این کامپوننت `Button` فراخوانی کنید:

<Sandpack>

```js
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

```css
.Toolbar {
  background: #aaa;
  padding: 5px;
}
button { margin: 5px; }
```

</Sandpack>

وقتی روی دکمه‌ای کلیک می کنید:

1. ری‌اکت کنترل‌کننده `onClick`ی که به `<button>` پاس داده شده است را که فراخوانی می‌کند.
2. آن کنترل کننده که در `Button` تعریف شده است، کارهای زیر را انجام می دهد:
   * `()e.stopPropagation` را فراخوانی می کند و از بالا رفتن رویداد جلوگیری می‌کند.
   * تابع `onClick` را فراخوانی می کند، که propی است که از کامپوننت `Toolbar` پاس داده شده‌است.
3. این تابع، که در کامپوننت `Toolbar` تعریف شده است، هشدار خود دکمه را نمایش می دهد.
4. از آنجایی که انتشار متوقف شده، کنترل کننده `onClick` المنت `<div>` پدر اجرا *نمی شود*.

در نتیجه‌ی `()e.stopPropagation`، کلیک کردن روی دکمه‌ها فقط یک هشدار (از `<button>`) به جای دو مورد (از`<button>` و  `<div>` نوارابزار پدر ) را نشان می‌دهد. کلیک کردن روی یک دکمه با کلیک کردن روی نوار ابزار اطراف یکسان نیست، بنابراین توقف انتشار برای این رابط کاربری منطقی است.

<DeepDive>

#### ثبت رویدادهای فاز {/*capture-phase-events*/}

در موارد نادر، ممکن است لازم باشد همه رویدادهای المنت‌های فرزند را دریافت کنید، *حتی اگر انتشار آنها متوقف شود*. برای مثال، شاید بخواهید بدون در نظر گرفتن منطق انتشار، هر کلیک را برای تجزیه و تحلیل ثبت کنید. می توانید این کار را با افزودن `Capture` در انتهای نام رویداد انجام دهید:

```js
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

هر رویداد در سه فاز منتشر می شود:

1. به سمت پایین حرکت می‌کند و همه کنترل‌کننده‌های `onClickCapture` را فراخوانی می‌کند.
2. کنترل کننده `onClick` المنت کلیک شده را اجرا می کند.
3. به سمت بالا حرکت می کند و همه کنترل کننده های `onClick` را فرا می خواند.

capture eventها برای کدهایی مانند روترها یا تجزیه و تحلیل مفید هستند، اما احتمالاً از آنها در کد برنامه استفاده نخواهید کرد.

</DeepDive>

### پاس‌دادن کنترل‌کننده‌ها به ​​عنوان جایگزینی برای انتشار {/*passing-handlers-as-alternative-to-propagation*/}

توجه داشته باشید که چگونه این کنترل کننده کلیک، یک خط کد را اجرا می کند _و سپس_  `onClick` prop را که توسط پدر پاس داده شده است فراخوانی می کند:

```js {4,5}
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```

می‌توانید قبل از فراخوانی `onClick` event handler پدر، کد بیشتری به این کنترل‌کننده اضافه کنید. این الگو یک *جایگزین* برای انتشار فراهم می کند. به کامپوننت فرزند اجازه می دهد رویداد را مدیریت کند، در حالی که همچنین به کامپوننت پدر هم اجازه می دهد برخی رفتارهای اضافی را مشخص کند. برخلاف انتشار، این کار خودکار نیست. اما مزیت این الگو این است که می توانید به وضوح کل زنجیره کدی را که در نتیجه یک رویداد اجرا می شود دنبال کنید.

اگر به انتشار تکیه می‌کنید و ردیابی اینکه کدام کنترل‌کننده‌ها اجرا می‌شوند و چرا، دشوار است، این روش را امتحان کنید.

### جلوگیری از رفتار پیش‌فرض {/*preventing-default-behavior*/}

برخی از رویدادهای مرورگر دارای رفتار پیش‌فرض مرتبط با آنها هستند. به عنوان مثال، یک رویداد ارسال `<form>` که زمانی اتفاق می‌افتد که روی دکمه‌ای در داخل آن کلیک می‌شود، به‌طور پیش‌فرض کل صفحه را دوباره reload می‌کند:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

می‌توانید `()e.preventDefault` را روی event object فراخوانی کنید تا این اتفاق نیفتد:

<Sandpack>

```js
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('Submitting!');
    }}>
      <input />
      <button>Send</button>
    </form>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

`()e.stopPropagation` و `()e.preventDefault` را با هم اشتباه نگیرید. هر دو مفید هستند، اما ارتباطی به هم ندارند:

* [`()e.stopPropagation`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) همه event handler های متصل به tagهای بالا را متوقف می‌کند.
* [`()e.preventDefault` ](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) از رفتار پیش‌فرض مرورگر برای معدود رویدادهایی که دارای آن هستند جلوگیری می‌کند.

## آیا event handlerها می توانند عوارض جانبی داشته باشند؟ {/*can-event-handlers-have-side-effects*/}

قطعا! رویدادها بهترین مکان برای عوارض جانبی هستند.

برخلاف توابع rendering، نیازی نیست که event handlerها [خالص (pure)](/learn/keeping-components-pure) باشند، بنابراین مکان بسیار خوبی برای *تغییر* چیزها هستند—به عنوان مثال، تغییر مقدار ورودی در پاسخ به تایپ کردن، یا تغییر یک لیست در پاسخ به فشار دادن دکمه. با این حال، برای تغییر برخی اطلاعات، ابتدا به روشی برای ذخیره آن نیاز دارید. در ری‌اکت، این کار با استفاده از [state، حافظه یک کامپوننت](/learn/state-a-components-memory) انجام می شود که در صفحه بعد همه چیز را در مورد آن خواهید آموخت.

<Recap>

* می‌توانید با پاس‌دادن یک تابع به عنوان prop به المنتی مانند `<button>`، رویدادها را مدیریت کنید.
* event handlerها باید پاس داده شوند نه اینکه  **فراخوانی شوند!** `onClick={handleClick}`، نه `onClick={handleClick()}`.
* event handlerها در داخل یک کامپوننت تعریف شده اند، بنابراین می توانند به props دسترسی داشته باشند.
* شما می توانید یک event handler را در یک پدر تعریف کنید و آن را به عنوان یک prop به فرزند پاس دهید.
* می‌توانید propهای event handler خود را با نام‌هایی بر اساس مفاهیم خاص برنامه تعریف کنید.
* رویدادها به سمت بالا منتشر می شوند. برای جلوگیری از آن، `()e.stopPropagation` را در اولین آرگومان فراخوانی کنید.
* رویدادها ممکن است رفتار ناخواسته پیش فرض مرورگر را داشته باشند. برای جلوگیری از آن، `()e.preventDefault` را فراخوانی کنید.
* فراخوانی صریح یک event handler prop از یک کنترل‌کننده فرزند جایگزین خوبی برای انتشار است.

</Recap>



<Challenges>

#### درست کردن یک event handler {/*fix-an-event-handler*/}

با کلیک بر روی این دکمه، پس‌زمینه صفحه بین سفید و سیاه تغییر می‌کند. با این حال، وقتی روی آن کلیک می کنید، هیچ اتفاقی نمی افتد. مشکل را حل کنید. (نگران منطق داخل `handleClick` نباشید - این بخش درست خواهد بود.)
<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

<Solution>

مشکل این است که `<button onClick={handleClick()}>` تابع `handleClick` را در حین رندر کردن _فراخوانی می‌کند_ به جای اینکه آن را پاس دهد. با حذف فراخوانی `()` به گونه‌ای که `<button onClick={handleClick}>` باشد، مشکل برطرف می‌شود:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={handleClick}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

یا می‌توانید فراخوانی را در تابع دیگری بپیچید، مانند `<button onClick={() => handleClick()}>`:

<Sandpack>

```js
export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick={() => handleClick()}>
      Toggle the lights
    </button>
  );
}
```

</Sandpack>

</Solution>

#### وصل کردن رویدادها {/*wire-up-the-events*/}

این کامپوننت `ColorSwitch` یک دکمه را رندر می‌کند. قرار است رنگ صفحه را تغییر دهد. آن را به event handler `onChangeColor` prop که از پدر دریافت می‌کند، وصل کنید تا با کلیک روی دکمه، رنگ تغییر کند.

پس از انجام این کار، توجه کنید که با کلیک بر روی دکمه، شمارشگر کلیک صفحه نیز افزایش می یابد. همکار شما که کامپوننت پدر را نوشته است اصرار دارد که `onChangeColor` هیچ شمارنده‌ای را افزایش نمی‌دهد. چه اتفاقی می‌افتد؟ آن را طوری درست کنید که کلیک کردن روی دکمه *فقط* رنگ را تغییر دهد و شمارنده را افزایش _ندهد_ .

<Sandpack>

```js ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button>
      Change color
    </button>
  );
}
```

```js App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

<Solution>

ابتدا باید event handlerی مانند `<button onClick={onChangeColor}>` را اضافه کنید.

با این حال، این مشکل شمارنده افزایشی را مطرح می کند. اگر `onChangeColor` این کار را انجام ندهد، همانطور که همکارتان اصرار دارد، مشکل این است که این رویداد به بالا منتشر می‌شود و برخی از کنترل‌کننده‌های بالا این کار را انجام می‌دهند. برای حل این مشکل، باید انتشار را متوقف کنید. اما فراموش نکنید که همچنان باید `onChangeColor` را فراخوانی کنید.

<Sandpack>

```js ColorSwitch.js active
export default function ColorSwitch({
  onChangeColor
}) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onChangeColor();
    }}>
      Change color
    </button>
  );
}
```

```js App.js hidden
import { useState } from 'react';
import ColorSwitch from './ColorSwitch.js';

export default function App() {
  const [clicks, setClicks] = useState(0);

  function handleClickOutside() {
    setClicks(c => c + 1);
  }

  function getRandomLightColor() {
    let r = 150 + Math.round(100 * Math.random());
    let g = 150 + Math.round(100 * Math.random());
    let b = 150 + Math.round(100 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  function handleChangeColor() {
    let bodyStyle = document.body.style;
    bodyStyle.backgroundColor = getRandomLightColor();
  }

  return (
    <div style={{ width: '100%', height: '100%' }} onClick={handleClickOutside}>
      <ColorSwitch onChangeColor={handleChangeColor} />
      <br />
      <br />
      <h2>Clicks on the page: {clicks}</h2>
    </div>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
