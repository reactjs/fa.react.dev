---
title: Keeping Components Pure
---

<Intro>

تعدادی از توابع جاوااسکریپت *pure* هستند. Pure functionها تنها یک محاسبه را انجام می‌دهند. با کاملاً نوشتن اجزای کد خود به عنوان Pure functionها، می‌توانید از  اشکال مختلف باگ های گیج‌کننده و رفتارهای غیرقابل پیش‌بینی در کدتان  جلوگیری کنید.با این حال برای بهره‌مندی از این مزایا قوانینی وجود دارد که باید پیروی شود.

</Intro>

<YouWillLearn>

* purity چیست و چگونه به شما کمک می کند تا از باگ ها جلوگیری کنید
* چگونه کامپوننت ها را با دور نگه داشتن از تغییرات خارج از فاز رندر pure نگه داریم
* چگونه  از حالت Strict برای یافتن اشتباهات در کامپوننت ها استفاده کنیم

</YouWillLearn>

## Purity: کامپوننت ها به عنوان فرمول ها {/*purity-components-as-formulas*/}

در علوم کامپیوتر (و به ویژه دنیای برنامه نویسی تابعی)، [یک تابعpure](https://wikipedia.org/wiki/Pure_function) تابعی با ویژگی های زیر است:

* **سرش تو کار خودشه.** هیچ شی یا متغیری را که قبل از فراخوانی وجود داشته است تغییر نمی دهد.
* **ورودی های یکسان، خروجی یکسان.** با توجه به ورودی های یکسان، یک تابع pure همیشه باید همان نتیجه را برگرداند.

شاید قبلاً با یک مثال از توابع pure آشنا شده باشید: فرمول‌ها در ریاضی

این فرمول ریاضی را در نظر بگیرید: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

اگر <Math><MathI>x</MathI> = 2</Math> آنگاه <Math><MathI>y</MathI> = 4</Math>. همیشه. 

اگر <Math><MathI>x</MathI> = 3</Math> آنگاه <Math><MathI>y</MathI> = 6</Math>. همیشه. 

اگر <Math><MathI>x</MathI> = 3</Math>آنگاه <MathI>y</MathI> گاهی <Math>9</Math> یا <Math>–1</Math> یا <Math>2.5</Math> بسته به زمان روز یا وضعیت بازار سهام نخواهد بود.

اگر <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> و <Math><MathI>x</MathI> = 3</Math>آنگاه <MathI>y</MathI> همیشه <Math>6</Math>خواهد بود. 

اگر این را به یک تابع جاوا اسکریپت تبدیل کنیم، به این شکل خواهد بود:

```js
function double(number) {
  return 2 * number;
}
```

در مثال بالا، `double` یک **تابع pure است.** اگر به آن مقدار `3` را بدهید ، `6` برمی گرداند. همیشه.

ریکت حول این مفهوم طراحی شده است. **ریکت فرض می کند که هر کامپوننتی که می نویسید یک تابع pure است.** این بدان معنی است که کامپوننت های ریکتی که می نویسید باید همیشه همان JSX را با توجه به ورودی های یکسان برگردانند:

<Sandpack>

```js App.js
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```

</Sandpack>

وقتی `drinkers={2}` را به `Recipe` می‌دهید، JSX حاوی `2 cups of water` را برمی‌گرداند. همیشه.

اگر  `drinkers={4}` را بدهید، JSX حاوی `4 cups of water` را برمی‌گرداند. همیشه.

درست مثل یک فرمول ریاضی. 

تصور کنید کامپوننت‌هایتان مثل دستور غذا هستند: اگر دستور را دقیقا دنبال کنید و مواد جدیدی به آن اضافه نکنید، هر بار همان غذای خوشمزه را خواهید داشت. در ریکت این "غذای خوشمزه" همان JSX است که کامپوننت برای رندر[render](/learn/render-and-commit) شدن به ریکت تحویل می‌دهد.

<Illustration src="/images/docs/illustrations/i_puritea-recipe.png" alt="A tea recipe for x people: take x cups of water, add x spoons of tea and 0.5x spoons of spices, and 0.5x cups of milk" />

## عوارض جانبی: پیامدهای (غیر) عمدی {/*side-effects-unintended-consequences*/}

فرایند رندر ریکت همواره باید خالص (pure) باشد. یعنی کامپوننت‌ها فقط باید JSX خود را برگردانند و هیچ‌گونه تغییری در اشیاء یا متغیرهایی که قبل از رندر وجود داشته‌اند، ایجاد نکنند. این کار باعث ایجاد ناخالصی می‌شود!

در اینجا یک کامپوننت است که این قانون را زیر پا می گذارد:

<Sandpack>

```js
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

</Sandpack>

این کامپوننت یک متغیر به نام `guest` را می‌خواند و می‌نویسد که بیرون از خود کامپوننت تعریف شده است. این بدان معناست که **چند بارصدا زدن این کامپوننت ، JSX های مختلفی ایجاد خواهد کرد** واگر کامپوننت‌های دیگر هم متغیر `guest` را بخوانند، JSX آن‌ها نیز بر اساس زمان رندر آن‌ها تغییر خواهد کرد! که قابل پیش‌بینی نیست.

به فرمول خود برمی گردیم <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> الان با اینکه <Math><MathI>x</MathI> = 2</Math>نمی توانیم اعتماد کنیم که  <Math><MathI>y</MathI> = 4</Math>. تست های ما ممکن است شکست بخورند، کاربران ما گیج شوند، هواپیماها از آسمان سقوط کنند - می‌توانید ببینید که چگونه این امر منجر به باگ‌های گیج‌کننده می‌شود!

می‌توانید این کامپوننت را [با پاس دادن `guest` به عنوان prop برطرف کنید](/learn/passing-props-to-a-component):

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

</Sandpack>

اکنون کامپوننت شما خالص (pure) است، زیرا JSXای که برمی‌گرداند فقط به prop `guest` بستگی دارد.

به طور کلی، انتظار نداشته باشید که کامپوننت‌های شما به ترتیب خاصی رندر شوند. فرقی نمی‌کند که <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> را قبل یا بعد از <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math>فراخوانی کنید: هر دو فرمول بدون توجه به دیگری حل می‌شوند. به همین ترتیب، هر کامپوننت فقط باید "به خود فکر کند" و در طول رندر، سعی نکند با دیگران هماهنگ شود یا به آن‌ها وابسته باشد. رندر مثل یک امتحان مدرسه است: هر کامپوننت باید JSX خودش را به تنهایی محاسبه کند.

<DeepDive>

#### تشخیص محاسبات ناخالص با StrictMode {/*detecting-impure-calculations-with-strict-mode*/}

در ریکت، سه نوع ورودی وجود دارد که می‌توانید هنگام رندر آن‌ها را بخوانید، حتی اگر هنوز از همه آن‌ها استفاده نکرده باشید: [props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory) و [context.](/learn/passing-data-deeply-with-context) همیشه باید با این ورودی‌ها به صورت read-only رفتار کنید.

وقتی می‌خواهید در پاسخ به ورودی کاربر چیزی را *تغییر* دهید، به جای نوشتن در یک متغیر، باید از [set state](/learn/state-a-components-memory) استفاده کنید. هرگز نباید متغیرها یا اشیاء از پیش موجود را در حین رندر کامپوننت تغییر دهید.

ریکت در حالت "Strict Mode" در طول توسعه، تابع هر کامپوننت را دو بار فراخوانی می‌کند. **این کار به شناسایی کامپوننت‌هایی که این قوانین را نقض می‌کنند کمک می‌کند.**

توجه کنید که چگونه مثال اصلی به جای "مهمان #1"، "مهمان #2" و "مهمان #3"، "مهمان #2"، "مهمان #4" و "مهمان #6" را نمایش می‌داد. تابع اصلی نا خالص بود، بنابراین فراخوانی دو بار آن باعث خرابی می‌شد. اما نسخه خالص و اصلاح‌شده حتی اگر تابع هر بار دو بار فراخوانی شود، کار می‌کند. **توابع خالص فقط محاسبه می‌کنند، بنابراین فراخوانی دو بار آن‌ها هیچ چیزی را تغییر نمی‌دهد**—مانند فراخوانی دوبار `double(2)` یا حل دوبار معادله <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> مقدار <MathI>y</MathI> تغییر نمی‌کند. ورودی‌های یکسان، خروجی‌های یکسان. همیشه.

Strict Mode در حالت production هیچ تاثیری ندارد، بنابراین سرعت برنامه را برای کاربران شما کاهش نمی‌دهد. برای استفاده از Strict Mode، می‌توانید کامپوننت اصلی خود را در`<React.StrictMode>` بپیچید. برخی از فریمورک‌ها این کار را به صورت پیش فرض انجام می‌دهند.

</DeepDive>

### Local mutation: راز کوچک کامپوننت شما {/*local-mutation-your-components-little-secret*/}

در مثال بالا، مشکل این بود که کامپوننت یک متغیر *موجود* را در حین رندر تغییر می‌داد. این کار اغلب برای ترسناک‌تر شدن، **"mutation"** (جهش) نامیده می‌شود. توابع خالص Pure functions متغیرهایی خارج از محدوده خود یا اشیایی که قبل از فراخوانی ایجاد شده‌اند را تغییر نمی‌دهند – این کار آن‌ها را ناخالص می‌کند!!

با این حال، **کاملاً مجاز هستید متغیرها و اشیایی را که *به تازگی* در حین رندر ایجاد کرده‌اید، تغییر دهید.** در این مثال، شما یک آرایه خالی `[]` ایجاد می‌کنید، آن را به یک متغیر `cups` اختصاص می‌دهید و سپس دوازده فنجان را به آن `push` اضافه می‌کنید:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</Sandpack>

اگر متغیر `cups` یا آرایه `[]`خارج از تابع `TeaGathering` ایجاد شده بودند، این یک مشکل بزرگ می‌بود! شما با اضافه کردن آیتم‌ها به آن آرایه، یک شیء موجود را تغییر می‌دادید.

با این حال، مشکلی نیست چون آنها را *در همان رندر*، داخل`TeaGathering` ایجاد کرده‌اید. هیچ کدی خارج از `TeaGathering` هرگز متوجه این اتفاق نمی‌شود. این را **"local mutation"** (جهش محلی) می‌نامند – این مانند راز کوچک کامپوننت شماست.

##  کجا می توانید side effects ایجاد کنید {/*where-you-_can_-cause-side-effects*/}

در حالی که برنامه‌نویسی فانکشنال به شدت به خالصی (purity) تکیه می‌کند، در نهایت _چیزی_ باید تغییر کند. این تقریباً هدف اصلی برنامه‌نویسی است! این تغییرات، مانند به‌روزرسانی صفحه، شروع انیمیشن، تغییر داده، عوارض جانبی **side effects** نامیده می‌شوند. آن‌ها اتفاقاتی هستند که _در حاشیه_ رخ می‌دهند، نه در طول رندر.

در ریکت **عوارض جانبی معمولاً  داخل [event handlers](/learn/responding-to-events) تعلق دارند**.رویدادها توابعی هستند که ریکت هنگام انجام برخی اقدامات، مانند کلیک روی دکمه، اجرا می‌کند. اگرچه event handlerها داخل کامپوننت شما تعریف می‌شوند، اما در طول رندر اجرا نمی‌شوند. **بنابراین event handlerها نیازی به خالص بودن ندارند.**

اگر تمام گزینه‌های دیگر را بررسی کرده‌اید و نمی‌توانید event handler مناسب برای side effect خود پیدا کنید، همچنان می‌توانید آن را با فراخوانی [`useEffect`](/reference/react/useEffect) در کامپوننت خود به JSX برگردانده‌شده متصل کنید. این به ریکت می‌گوید که آن را بعداً، پس از رندر، زمانی که side effects مجاز هستند، اجرا کند.**با این حال، این رویکرد باید آخرین راه حل شما باشد.**

در صورت امکان، سعی کنید منطق خود را فقط با رندر بیان کنید. شگفت‌زده خواهید شد که این کار تا چه حد می‌تواند شما را جلو بیاندازد.

<DeepDive>

#### چرا ریکت به خالصی purity اهمیت می‌دهد؟ {/*why-does-react-care-about-purity*/}

نوشتن توابع خالص pure functions به مقداری عادت و انضباط نیاز دارد. اما همچنین فرصت‌های فوق‌العاده‌ای را به شما می‌دهد:

* کامپوننت‌های شما می‌توانند در محیط‌های مختلف اجرا شوند، مثلاً روی سرور! از آنجایی که آنها برای ورودی‌های یکسان نتایج یکسانی را برمی‌گردانند، یک کامپوننت می‌تواند به درخواست‌های کاربران زیادی پاسخ دهد.
* می‌توانید با اجتناب از رندر[skipping rendering](/reference/react/memo) کامپوننت‌هایی که ورودی‌هایش تغییر نکرده‌اند عملکرد را بهبود ببخشید. این کار امن است زیرا توابع خالص همیشه نتایج یکسانی را برمی‌گردانند، بنابراین می‌توان آن‌ها را در حافظه ذخیره کرد.
* اگر برخی از داده‌ها در وسط رندر یک درخت کامپوننت عمیق تغییر کنند، ریکت می‌تواند رندر را بدون هدر دادن وقت برای تکمیل رندر منسوخ شده، دوباره شروع کند. خالصی باعث می‌شود توقف محاسبه در هر زمانی ایمن باشد.

هر ویژگی جدید ریکت که ما در حال ساخت هستیم از خالصی بهره می‌برد. از بازیابی داده‌ها تا انیمیشن‌ها و عملکرد، خالص نگه داشتن کامپوننت‌ها، قدرت پارادایم ریکت را آشکار می‌کند.

</DeepDive>

<Recap>

یک کامپوننت باید خالص باشد، به این معنی که:
  * **کار خودش را می‌کند.** نباید هیچ شی یا متغیری را که قبل از رندر وجود داشته تغییر دهد.
  * **ورودی‌های یکسان، خروجی‌های یکسان** با داشتن ورودی‌های یکسان، یک کامپوننت همیشه باید همان JSX را برگرداند.
* رندر می‌تواند در هر زمانی اتفاق بیفتد بنابراین کامپوننت‌ها نباید به ترتیب رندر یکدیگر وابسته باشند.
* نباید هیچ یک از ورودی‌هایی که کامپوننت‌های شما برای رندر استفاده می‌کنند را تغییر دهید. این شامل props state و context می‌شود. برای به‌روزرسانی صفحه، به جای تغییر اشیاء از پیش موجود، از ["set" state](/learn/state-a-components-memory) استفاده کنید.
* تلاش کنید تا منطق کامپوننت خود را در JSX برگشتی‌تان بیان کنید. وقتی نیاز به "تغییر چیزها" دارید، معمولاً می‌خواهید این کار را در یک event handler انجام دهید. به‌عنوان آخرین راه حل، می‌توانید از`useEffect` استفاده کنید.
* نوشتن توابع خالص کمی تمرین می‌خواهد، اما قدرت پارادایم ریکت را آزاد می‌کند.

</Recap>


  
<Challenges>

#### ساعت خراب را تعمیر کنید {/*fix-a-broken-clock*/}

این کامپوننت سعی می‌کند کلاس CSS تگ`<h1>` را بین نیمه‌شب تا ساعت ۶ صبح به `"night"` و در تمام ساعات دیگر به `"day"` تنظیم کند. با این حال کار نمی‌کند. می‌توانید این کامپوننت را اصلاح کنید؟

می‌توانید با تغییر موقت منطقه زمانی کامپیوتر، بررسی کنید که آیا راه‌حل شما کار می‌کند یا خیر. وقتی زمان کنونی بین نیمه‌شب و ۶ صبح باشد، ساعت باید رنگ‌های معکوس داشته باشد.

<Hint>

رندر یک *محاسبه* است، نباید سعی کند "کاری" انجام دهد. آیا می‌توانید همین ایده را به شیوه‌ای متفاوت بیان کنید؟

</Hint>

<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById('time').className = 'night';
  } else {
    document.getElementById('time').className = 'day';
  }
  return (
    <h1 id="time">
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

<Solution>

با محاسبه`className` و قرار دادن آن در خروجی رندر می‌توانید این کامپوننت را اصلاح کنید:

<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = 'night';
  } else {
    className = 'day';
  }
  return (
    <h1 className={className}>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time} />
  );
}
```

```css
body > * {
  width: 100%;
  height: 100%;
}
.day {
  background: #fff;
  color: #222;
}
.night {
  background: #222;
  color: #fff;
}
```

</Sandpack>

در این مثال، عارضه جانبی (اصلاح DOM) اصلاً ضروری نبود. شما فقط باید JSX برگردانید.

</Solution>

#### اصلاح کردن یک پروفایل خراب {/*fix-a-broken-profile*/}

دو کامپوننت `Profile` در کنار هم با داده‌های مختلف رندر می‌شوند. "Collapse" را در اولین پروفایل، سپس "Expand" را کلیک کنید. متوجه خواهید شد که هر دو پروفایل اکنون یک شخص را نشان می‌دهند. این یک باگ است.

علت باگ را پیدا کرده و آن را برطرف کنید.

<Hint>

باگ در`Profile.js` قرار دارد. حتماً همه آن را از بالا به پایین بخوانید!

</Hint>

<Sandpack>

```js Profile.js
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```js Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  )
}
```

```js utils.js hidden
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

<Solution>

مشکل این است که کامپوننت `Profile` به یک متغیر از پیش موجود به نام`currentPerson` ذخیره میکند و کامپوننت‌های `Header` و`Avatar` از آن می‌خوانند. این باعث می‌شود *هر سه آنها* ناخالص و غیرقابل پیش‌بینی شوند.

برای رفع باگ، متغیر `currentPerson` را حذف کنید. در عوض، تمام اطلاعات را از `Profile` به `Header` و `Avatar` از طریق props ارسال کنید. باید یک prop `person` به هر دو کامپوننت اضافه کنید و آن را به پایین منتقل کنید.

<Sandpack>

```js Profile.js active
import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  )
}

function Header({ person }) {
  return <h1>{person.name}</h1>;
}

function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

```js Panel.js hidden
import { useState } from 'react';

export default function Panel({ children }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="panel">
      <button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </button>
      {open && children}
    </section>
  );
}
```

```js App.js
import Profile from './Profile.js';

export default function App() {
  return (
    <>
      <Profile person={{
        imageId: 'lrWQx8l',
        name: 'Subrahmanyan Chandrasekhar',
      }} />
      <Profile person={{
        imageId: 'MK3eW3A',
        name: 'Creola Katherine Johnson',
      }} />
    </>
  );
}
```

```js utils.js hidden
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; }
.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
  width: 200px;
}
h1 { margin: 5px; font-size: 18px; }
```

</Sandpack>

به یاد داشته باشید که ریکت تضمین نمی‌کند که توابع کامپوننت به ترتیب خاصی اجرا شوند، بنابراین نمی‌توانید با تنظیم متغیرها بین آنها ارتباط برقرار کنید. تمام ارتباطات باید از طریق props انجام شود.

</Solution>

#### اصلاح کردن story tray خراب {/*fix-a-broken-story-tray*/}

مدیرعامل شرکت از شما می‌خواهد که "stories" را به برنامه ساعت آنلاین خود اضافه کنید و شما نمی‌توانید رد کنید. شما یک کامپوننت `StoryTray` نوشته‌اید که لیستی از داستان‌ها `stories`را می‌پذیرد، به دنبال آن یک placeholder "ایجاد داستان" قرار می‌گیرد.

شما placeholder "ایجاد داستان" را با اضافه کردن یک داستان جعلی دیگر در انتهای آرایه `stories` که به عنوان prop دریافت می‌کنید، پیاده‌سازی کرده‌اید. اما به دلایلی، "ایجاد داستان" بیش از یک بار ظاهر می‌شود. مشکل را برطرف کنید.

<Sandpack>

```js StoryTray.js active
export default function StoryTray({ stories }) {
  stories.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

</Sandpack>

<Solution>

دقت کنید که هر زمان که ساعت به‌روزرسانی می‌شود، ایجاد داستان "Create Story" *دو بار* اضافه می‌شود. این به عنوان یک نشانه است که ما یک جهش (mutation) در حین رندر داریم - Strict Mode برای آشکارتر کردن این مشکلات، دو بار کامپوننت‌ها را فراخوانی می‌کند.

تابع `StoryTray` خالص نیست. با فراخوانی `push` بر روی آرایه `stories` دریافتی (یک prop!)، شی‌ای را که* قبل* از شروع رندر `StoryTray` ایجاد شده، تغییر می‌دهد. این باعث اشکال و غیرقابل پیش‌بینی بودن آن می‌شود.

ساده‌ترین راه حل این است که اصلاً آرایه را تغییر ندهید و  "Create Story"را جداگانه رندر کنید:

<Sandpack>

```js StoryTray.js active
export default function StoryTray({ stories }) {
  return (
    <ul>
      {stories.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
      <li>Create Story</li>
    </ul>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

به‌عنوان جایگزین، می‌توانید قبل از push یک آیتم به داخل آن، یک آرایه _جدید_ (با کپی کردن آرایه موجود) ایجاد کنید:

<Sandpack>

```js StoryTray.js active
export default function StoryTray({ stories }) {
  // Copy the array!
  let storiesToDisplay = stories.slice();

  // Does not affect the original array:
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story'
  });

  return (
    <ul>
      {storiesToDisplay.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState([...initialStories])
  let time = useTime();

  // HACK: Prevent the memory from growing forever while you read docs.
  // We're breaking our own rules here.
  if (stories.length > 100) {
    stories.length = 100;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <h2>It is {time.toLocaleTimeString()} now.</h2>
      <StoryTray stories={stories} />
    </div>
  );
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  margin-bottom: 20px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

این mutation شما را محلی و تابع رندر شما را خالص نگه می‌دارد. با این حال، همچنان باید مراقب باشید: برای مثال، اگر سعی کنید هر یک از آیتم های موجود در آرایه را تغییر دهید، باید آن آیتم را نیز clone کنید.

به یاد داشته باشید که به خاطر بسپارید که کدام عملیات روی آرایه‌ها آن را تغییر می‌دهند و کدام عملیات این کار را انجام نمی‌دهند. برای مثال، `push`, `pop`, `reverse`, و `sort` آرایه اصلی را تغییر خواهند داد، اما `slice`, `filter` و `map`  یک آرایه جدید ایجاد خواهند کرد.

</Solution>

</Challenges>
