---
title: پاسخگویی به رویدادها
---

<Intro>

ری‌اکت به شما اجازه می‌دهد *مدیرکننده‌های رویداد (event handler)* را به JSX خود اضافه کنید. مدیرکننده‌های رویداد توابع شما هستند که در پاسخ به تعاملاتی مانند کلیک کردن، هاور کردن، فوکوس کردن روی inputهای فرم و چیزهای دیگر اجرا می‌شوند.

</Intro>

<YouWillLearn>

* روش‌های مختلف برای نوشتن یک مدیرکنندهٔ رویداد
* نحوهٔ انتقال منطق مدیریت رویداد از کامپوننت والد
* نحوهٔ انتشار رویدادها و چگونگی توقف آن‌ها

</YouWillLearn>
## افزودن مدیرکننده‌های رویداد {/*adding-event-handlers*/}


برای افزودن یک مدیرکنندهٔ رویداد، ابتدا یک تابع تعریف می‌کنید و سپس [آن را به‌عنوان پراپس](/learn/passing-props-to-a-component) به تگ JSX مناسب پاس می‌دهید. به‌عنوان مثال، در اینجا دکمه‌ای وجود دارد که هنوز هیچ کاری انجام نمی‌دهد:

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
با دنبال کردن این سه مرحله می‌توانید کاری کنید که وقتی کاربر کلیک می‌کند پیامی نشان دهد:

1. تابعی به نام `handleClick` را *درون* کامپوننت `Button` خود تعریف کنید.
2. منطق را درون آن تابع پیاده‌سازی کنید (از `alert` برای نمایش پیام استفاده کنید).
3. `onClick={handleClick}` را به عنصر JSX `<button>` اضافه کنید.


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

شما تابع `handleClick` را تعریف کردید و سپس [آن را به‌عنوان یک پراپس](/learn/passing-props-to-a-component) به `<button>` پاس دادید. `handleClick` یک **مدیرکنندهٔ رویداد** است. ویژگی‌های مدیرکننده‌های رویداد:

* معمولاً *درون* کامپوننت شما تعریف می‌شوند.
* نام‌هایی دارند که با `handle` شروع می‌شوند و به دنبال آن نام رویداد می‌آید.

طبق قرارداد، نام‌گذاری مدیرکننده‌های رویداد به این صورت رایج است که ابتدا `handle` و به دنبال آن نام رویداد می‌آید. اغلب `onClick={handleClick}`، `onMouseEnter={handleMouseEnter}` و غیره را خواهید دید.

از طرف دیگر، می‌توانید یک مدیرکنندهٔ رویداد را به‌صورت درخط (inline) در JSX تعریف کنید:


```jsx
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```

یا به‌طور خلاصه‌تر، با استفاده از یک arrow function:


```jsx
<button onClick={() => {
  alert('You clicked me!');
}}>
```


همهٔ این مدل‌ها معادل هستند. مدیرکننده‌های رویداد درخط (inline) برای عملکردهای کوتاه مناسب هستند.

<Pitfall>

توابع پاس‌داده‌شده به مدیرکننده‌های رویداد باید پاس داده شوند، نه اینکه فراخوانی شوند. مثلاً:

| passing a function (correct)     | calling a function (incorrect)     |
| -------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>` | `<button onClick={handleClick()}>` |


تفاوت ظریف است. در مثال اول، تابع `handleClick` به‌عنوان یک مدیرکنندهٔ رویداد از نوع `onClick` پاس داده می‌شود. این به ری‌اکت می‌گوید که آن را به خاطر بسپارد و تنها زمانی که کاربر روی دکمه کلیک کرد، تابع شما را فراخوانی کند.

در مثال دوم، `()` در انتهای `handleClick()` تابع را *بلافاصله* در زمان [رندر کردن](/learn/render-and-commit)، بدون هیچ کلیکی فعال می‌کند. این به این دلیل است که جاوااسکریپت در [JSX `{` و `}`](/learn/javascript-in-jsx-with-curly-braces) بلافاصله اجرا می‌شود.

هنگامی که کد را به‌صورت درخط (inline) می‌نویسید، همان دام به شکل دیگری خود را نشان می‌دهد:


| passing a function (correct)            | calling a function (incorrect)    |
| --------------------------------------- | --------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>` |


پاس‌دادن کدهای درخط (inline) مانند این، هنگام کلیک کردن فراخوانی نمی‌شود — هر بار که کامپوننت رندر می‌شود فراخوانی می‌شود:


```jsx
// This alert fires when the component renders, not when clicked!
<button onClick={alert('You clicked me!')}>
```


اگر می‌خواهید مدیرکنندهٔ رویداد خود را به‌صورت درخط (inline) تعریف کنید، آن را در یک تابع ناشناس مانند زیر قرار دهید:

```jsx
<button onClick={() => alert('You clicked me!')}>
```


این کار به‌جای اجرای کد درون با هر رندر، تابعی ایجاد می‌کند که بعداً فراخوانی می‌شود.

در هر دو مورد، چیزی که می‌خواهید پاس دهید یک تابع است:

* `<button onClick={handleClick}>` تابع `handleClick` را پاس می‌دهد.
* `<button onClick={() => alert('...')}>` تابع `() => alert('...')` را پاس می‌دهد.

[دربارهٔ arrow functionها بیشتر بخوانید.](https://javascript.info/arrow-functions-basics)

</Pitfall>

### خواندن پراپس‌ها در مدیرکننده‌های رویداد {/*reading-props-in-event-handlers*/}

از آنجا که مدیرکننده‌های رویداد درون یک کامپوننت تعریف می‌شوند، به پراپس‌های آن کامپوننت دسترسی دارند. در اینجا دکمه‌ای وجود دارد که با کلیک روی آن، یک هشدار با پراپس `message` خود نشان می‌دهد:

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

این به دو دکمه اجازه می‌دهد پیام‌های متفاوتی نشان دهند. امتحان کنید پیام‌های پاس‌داده‌شده به آن‌ها را تغییر دهید.

### پاس‌دادن مدیرکننده‌های رویداد به‌عنوان پراپس {/*passing-event-handlers-as-props*/}

اغلب شما می‌خواهید که کامپوننت والد، مدیرکنندهٔ رویداد فرزند را مشخص کند. دکمه‌ها را در نظر بگیرید: بسته به جایی که از کامپوننت `Button` استفاده می‌کنید، ممکن است بخواهید عملکرد متفاوتی را اجرا کنید — شاید یکی فیلمی را پخش کند و دیگری تصویری را آپلود کند.

برای انجام این کار، پراپسی را که کامپوننت از والد خود به‌عنوان مدیرکنندهٔ رویداد دریافت می‌کند، پاس دهید:

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

- `PlayButton`، `handlePlayClick` را به‌عنوان پراپس `onClick` به `Button` درون خود پاس می‌دهد.
- `UploadButton` هم `() => alert('Uploading!')` را به‌عنوان پراپس `onClick` به `Button` درون خود پاس می‌دهد.

در نهایت، کامپوننت `Button` شما پراپسی به نام `onClick` را می‌گیرد. آن را مستقیماً با `onClick={onClick}` به `<button>` داخلی مرورگر پاس می‌دهد. این به ری‌اکت می‌گوید که با کلیک، تابع پاس‌داده‌شده را فراخوانی کند.

اگر از [design system](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) استفاده می‌کنید، معمولاً کامپوننت‌هایی مانند دکمه‌ها دارای استایل هستند، اما رفتار را مشخص نمی‌کنند. در عوض، کامپوننت‌هایی مانند `PlayButton` و `UploadButton` مدیرکننده‌های رویداد را به پایین پاس می‌دهند.


### نام‌گذاری پراپس‌های مدیرکنندهٔ رویداد {/*naming-event-handler-props*/}

اجزای داخلی مانند `<button>` و `<div>` فقط از [نام رویدادهای مرورگر](/reference/react-dom/components/common#common-props) مانند `onClick` پشتیبانی می‌کنند. با این حال، زمانی که کامپوننت‌های خود را می‌سازید، می‌توانید به هر نحوی که دوست دارید، پراپس‌های مدیرکنندهٔ رویداد را نام‌گذاری کنید.

طبق قرارداد، پراپس‌های مدیرکنندهٔ رویداد باید با `on` شروع شوند و به دنبال آن یک حرف بزرگ بیاید.

به‌عنوان مثال، پراپس `onClick` کامپوننت `Button` را می‌توان `onSmash` نامید:
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

در این مثال، `<button onClick={onSmash}>` نشان می‌دهد که `<button>` (با حروف کوچک) مرورگر همچنان به یک پراپس به نام `onClick` نیاز دارد، اما نام پراپس دریافت‌شده توسط کامپوننت `Button` سفارشی شما، در اختیار شماست.

هنگامی که کامپوننت شما از تعاملات متعدد پشتیبانی می‌کند، ممکن است بر اساس مفاهیم خاص برنامه، پراپس‌های مدیرکنندهٔ رویداد را نام‌گذاری کنید. برای مثال، این کامپوننت `Toolbar` پراپس‌های مدیرکنندهٔ رویداد `onPlayMovie` و `onUploadImage` را دریافت می‌کند:
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


توجه کنید که چگونه کامپوننت `App` نیازی به دانستن اینکه `Toolbar` *چه کاری* با `onPlayMovie` یا `onUploadImage` می‌خواهد انجام دهد، ندارد. این جزئیات پیاده‌سازی `Toolbar` است. در اینجا، `Toolbar` آن‌ها را به‌عنوان مدیرکنندهٔ `onClick` به `Button`های خود پاس می‌دهد، اما بعداً می‌تواند آن‌ها را با کلیک نیز فعال کند. نام‌گذاری ابزارها بر اساس مفاهیم خاص برنامه مانند `onPlayMovie` به شما این امکان را می‌دهد که نحوهٔ استفاده از آن‌ها را بتوانید بعداً تغییر دهید.

<Note>

مطمئن شوید که از تگ‌های HTML مناسب برای مدیرکننده‌های رویداد خود استفاده می‌کنید. برای مثال، برای مدیریت کلیک‌ها، از [`<button onClick={handleClick}>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) به‌جای `<div onClick={handleClick}>` استفاده کنید. استفاده از یک `<button>` واقعی مرورگر، رفتارهای داخلی مرورگر مانند پیمایش با صفحه‌کلید را فعال می‌کند. اگر سبک پیش‌فرض مرورگر برای دکمه را دوست ندارید و می‌خواهید آن را بیشتر شبیه یک لینک یا عنصر UI متفاوت کنید، می‌توانید با CSS به آن دست یابید. [دربارهٔ نوشتن نشانه‌گذاری دسترس‌پذیر بیشتر بخوانید.](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

</Note>


## انتشار رویداد {/*event-propagation*/}

مدیرکننده‌های رویداد همچنین رویدادها را از هر فرزندی که ممکن است کامپوننت شما داشته باشد، دریافت می‌کنند. ما می‌گوییم که یک رویداد «حباب» یا «تکثیر» می‌شود به بالای درخت: از جایی که رویداد اتفاق افتاده شروع می‌شود، و سپس به بالای درخت می‌رود.

این `<div>` حاوی دو دکمه است. هم `<div>` *و* هم دکمه‌ها، مدیرکننده‌های `onClick` خود را دارند. فکر می‌کنید با کلیک روی یک دکمه، کدام مدیرکننده‌ها فعال می‌شوند؟

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

اگر روی هر یک از دکمه‌ها کلیک کنید، `onClick` آن ابتدا اجرا می‌شود و سپس `onClick` عنصر `<div>` والد اجرا می‌شود. بنابراین دو پیام ظاهر می‌شود. اگر روی نوار ابزار کلیک کنید، فقط `onClick` عنصر `<div>` والد اجرا خواهد شد.

<Pitfall>

همهٔ رویدادها در ری‌اکت منتشر می‌شوند به جز `onScroll` که فقط روی تگ JSX که به آن متصل شده کار می‌کند.

</Pitfall>

### توقف انتشار {/*stopping-propagation*/}

مدیرکننده‌های رویداد یک **event object** را به‌عنوان تنها آرگومان خود دریافت می‌کنند. طبق قرارداد، معمولاً `e` نامیده می‌شود که مخفف «event» است. می‌توانید از این شی برای خواندن اطلاعات مربوط به رویداد استفاده کنید.

این event object همچنین به شما امکان می‌دهد انتشار را متوقف کنید. اگر می‌خواهید از رسیدن یک رویداد به کامپوننت‌های والد جلوگیری کنید، باید `e.stopPropagation()` را مانند این کامپوننت `Button` فراخوانی کنید:
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

وقتی روی دکمه‌ای کلیک می‌کنید:

1. ری‌اکت مدیرکنندهٔ `onClick`ی که به `<button>` پاس داده شده است را فراخوانی می‌کند.
2. آن مدیرکننده که در `Button` تعریف شده است، کارهای زیر را انجام می‌دهد:
   * `e.stopPropagation()` را فراخوانی می‌کند و از بالا رفتن رویداد جلوگیری می‌کند.
   * تابع `onClick` را فراخوانی می‌کند، که پراپسی است که از کامپوننت `Toolbar` پاس داده شده است.
3. این تابع، که در کامپوننت `Toolbar` تعریف شده است، هشدار خود دکمه را نمایش می‌دهد.
4. از آنجا که انتشار متوقف شده، مدیرکنندهٔ `onClick` عنصر `<div>` والد اجرا *نمی‌شود*.

در نتیجهٔ `e.stopPropagation()`، کلیک کردن روی دکمه‌ها فقط یک هشدار (از `<button>`) به‌جای دو مورد (از `<button>` و `<div>` نوارابزار والد) را نشان می‌دهد. کلیک کردن روی یک دکمه با کلیک کردن روی نوار ابزار اطراف یکسان نیست، بنابراین توقف انتشار برای این رابط کاربری منطقی است.

<DeepDive>

#### ثبت رویدادهای فاز capture {/*capture-phase-events*/}

در موارد نادر، ممکن است لازم باشد همهٔ رویدادهای عناصر فرزند را دریافت کنید، *حتی اگر انتشار آن‌ها متوقف شود*. برای مثال، شاید بخواهید بدون در نظر گرفتن منطق انتشار، هر کلیک را برای تجزیه و تحلیل ثبت کنید. می‌توانید این کار را با افزودن `Capture` در انتهای نام رویداد انجام دهید:


```js
<div onClickCapture={() => { /* this runs first */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

هر رویداد در سه فاز منتشر می‌شود:

1. به سمت پایین حرکت می‌کند و همهٔ مدیرکننده‌های `onClickCapture` را فراخوانی می‌کند.
2. مدیرکنندهٔ `onClick` عنصر کلیک‌شده را اجرا می‌کند.
3. به سمت بالا حرکت می‌کند و همهٔ مدیرکننده‌های `onClick` را فراخوانی می‌کند.

رویدادهای capture برای کدهایی مانند روترها یا تجزیه و تحلیل مفید هستند، اما احتمالاً از آن‌ها در کد برنامه استفاده نخواهید کرد.

</DeepDive>

### پاس‌دادن مدیرکننده‌ها به‌عنوان جایگزینی برای انتشار {/*passing-handlers-as-alternative-to-propagation*/}

توجه داشته باشید که چگونه این مدیرکنندهٔ کلیک، یک خط کد را اجرا می‌کند _و سپس_ پراپس `onClick` را که توسط والد پاس داده شده است فراخوانی می‌کند:


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

می‌توانید قبل از فراخوانی مدیرکنندهٔ رویداد `onClick` والد، کد بیشتری به این مدیرکننده اضافه کنید. این الگو یک *جایگزین* برای انتشار فراهم می‌کند. به کامپوننت فرزند اجازه می‌دهد رویداد را مدیریت کند، در حالی که همچنین به کامپوننت والد هم اجازه می‌دهد برخی رفتارهای اضافی را مشخص کند. برخلاف انتشار، این کار خودکار نیست. اما مزیت این الگو این است که می‌توانید به‌وضوح کل زنجیره کدی را که در نتیجهٔ یک رویداد اجرا می‌شود دنبال کنید.

اگر به انتشار تکیه می‌کنید و ردیابی اینکه کدام مدیرکننده‌ها اجرا می‌شوند و چرا، دشوار است، این روش را امتحان کنید.

### جلوگیری از رفتار پیش‌فرض {/*preventing-default-behavior*/}

برخی از رویدادهای مرورگر دارای رفتار پیش‌فرض مرتبط با آن‌ها هستند. به‌عنوان مثال، یک رویداد ارسال `<form>` که زمانی اتفاق می‌افتد که روی دکمه‌ای درون آن کلیک می‌شود، به‌طور پیش‌فرض کل صفحه را دوباره reload می‌کند:

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

می‌توانید `e.preventDefault()` را روی event object فراخوانی کنید تا این اتفاق نیفتد:

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

`e.stopPropagation()` و `e.preventDefault()` را با هم اشتباه نگیرید. هر دو مفید هستند، اما ارتباطی به هم ندارند:

* [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) همهٔ مدیرکننده‌های رویداد متصل به تگ‌های بالاتر را متوقف می‌کند.
* [`e.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) از رفتار پیش‌فرض مرورگر برای معدود رویدادهایی که دارای آن هستند جلوگیری می‌کند.

## آیا مدیرکننده‌های رویداد می‌توانند عوارض جانبی داشته باشند؟ {/*can-event-handlers-have-side-effects*/}

قطعاً! رویدادها بهترین مکان برای عوارض جانبی هستند.

برخلاف توابع رندر، نیازی نیست که مدیرکننده‌های رویداد [خالص (pure)](/learn/keeping-components-pure) باشند، بنابراین مکان بسیار خوبی برای *تغییر* چیزها هستند — به‌عنوان مثال، تغییر مقدار ورودی در پاسخ به تایپ کردن، یا تغییر یک لیست در پاسخ به فشار دادن دکمه. با این حال، برای تغییر برخی اطلاعات، ابتدا به روشی برای ذخیرهٔ آن نیاز دارید. در ری‌اکت، این کار با استفاده از [استیت، حافظهٔ یک کامپوننت](/learn/state-a-components-memory) انجام می‌شود که در صفحهٔ بعد همه چیز را در مورد آن خواهید آموخت.

<Recap>

* می‌توانید با پاس‌دادن یک تابع به‌عنوان پراپس به عنصری مانند `<button>`، رویدادها را مدیریت کنید.
* مدیرکننده‌های رویداد باید پاس داده شوند نه اینکه **فراخوانی شوند!** `onClick={handleClick}`، نه `onClick={handleClick()}`.
* مدیرکننده‌های رویداد درون یک کامپوننت تعریف شده‌اند، بنابراین می‌توانند به پراپس‌ها دسترسی داشته باشند.
* شما می‌توانید یک مدیرکنندهٔ رویداد را در یک والد تعریف کنید و آن را به‌عنوان یک پراپس به فرزند پاس دهید.
* می‌توانید پراپس‌های مدیرکنندهٔ رویداد خود را با نام‌هایی بر اساس مفاهیم خاص برنامه تعریف کنید.
* رویدادها به سمت بالا منتشر می‌شوند. برای جلوگیری از آن، `e.stopPropagation()` را در اولین آرگومان فراخوانی کنید.
* رویدادها ممکن است رفتار ناخواستهٔ پیش‌فرض مرورگر را داشته باشند. برای جلوگیری از آن، `e.preventDefault()` را فراخوانی کنید.
* فراخوانی صریح یک پراپس مدیرکنندهٔ رویداد از یک مدیرکنندهٔ فرزند جایگزین خوبی برای انتشار است.

</Recap>

<Challenges>



#### درست کردن یک مدیرکنندهٔ رویداد {/*fix-an-event-handler*/}

با کلیک بر روی این دکمه، پس‌زمینهٔ صفحه بین سفید و سیاه تغییر می‌کند. با این حال، وقتی روی آن کلیک می‌کنید، هیچ اتفاقی نمی‌افتد. مشکل را حل کنید. (نگران منطق درون `handleClick` نباشید — این بخش درست خواهد بود.)

<Sandpack>

```js {expectedErrors: {'react-compiler': [5, 7]}}
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

مشکل این است که `<button onClick={handleClick()}>` تابع `handleClick` را در حین رندر کردن _فراخوانی می‌کند_ به‌جای اینکه آن را پاس دهد. با حذف فراخوانی `()` به گونه‌ای که `<button onClick={handleClick}>` باشد، مشکل برطرف می‌شود:

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

این کامپوننت `ColorSwitch` یک دکمه را رندر می‌کند. قرار است رنگ صفحه را تغییر دهد. آن را به پراپس مدیرکنندهٔ رویداد `onChangeColor` که از والد دریافت می‌کند، وصل کنید تا با کلیک روی دکمه، رنگ تغییر کند.

پس از انجام این کار، توجه کنید که با کلیک بر روی دکمه، شمارشگر کلیک صفحه نیز افزایش می‌یابد. همکار شما که کامپوننت والد را نوشته است اصرار دارد که `onChangeColor` هیچ شمارنده‌ای را افزایش نمی‌دهد. چه اتفاقی می‌افتد؟ آن را طوری درست کنید که کلیک کردن روی دکمه *فقط* رنگ را تغییر دهد و شمارنده را افزایش _ندهد_.
<Sandpack>

```js src/ColorSwitch.js active
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

```js src/App.js hidden
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

ابتدا باید مدیرکنندهٔ رویدادی مانند `<button onClick={onChangeColor}>` را اضافه کنید.

با این حال، این مشکل شمارندهٔ افزایشی را مطرح می‌کند. اگر `onChangeColor` این کار را انجام ندهد، همان‌طور که همکارتان اصرار دارد، مشکل این است که این رویداد به بالا منتشر می‌شود و برخی از مدیرکننده‌های بالا این کار را انجام می‌دهند. برای حل این مشکل، باید انتشار را متوقف کنید. اما فراموش نکنید که همچنان باید `onChangeColor` را فراخوانی کنید.

<Sandpack>

```js src/ColorSwitch.js active
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

```js src/App.js hidden
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
