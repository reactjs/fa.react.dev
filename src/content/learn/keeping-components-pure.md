---
title: خالص نگه‌داشتن کامپوننت‌ها
---

<Intro>

برخی از توابع جاوااسکریپت *خالص (pure)* هستند. توابع خالص فقط یک محاسبه انجام می‌دهند و هیچ چیز بیشتر. با نوشتن سخت‌گیرانهٔ کامپوننت‌های خود به‌عنوان توابع خالص، می‌توانید از دسته‌ای کامل از باگ‌های گیج‌کننده و رفتار غیرقابل پیش‌بینی هنگام رشد پایگاه کد خود جلوگیری کنید. برای به‌دست آوردن این مزایا، با این حال، چند قانون وجود دارد که باید رعایت کنید.

</Intro>

<YouWillLearn>

* خلوص چیست و چگونه به شما کمک می‌کند از باگ‌ها جلوگیری کنید
* چگونه کامپوننت‌ها را با دور نگه‌داشتن تغییرات از مرحلهٔ رندر، خالص نگه دارید
* چگونه از حالت سخت‌گیرانه (Strict Mode) برای یافتن اشتباهات در کامپوننت‌های خود استفاده کنید

</YouWillLearn>

## خلوص: کامپوننت‌ها به‌عنوان فرمول {/*purity-components-as-formulas*/}

در علوم کامپیوتر (و به‌ویژه دنیای برنامه‌نویسی تابعی)، [یک تابع خالص](https://wikipedia.org/wiki/Pure_function) تابعی با ویژگی‌های زیر است:

* **فقط به کار خودش می‌پردازد.** هیچ شیء یا متغیری که قبل از فراخوانی‌اش وجود داشته را تغییر نمی‌دهد.
* **ورودی یکسان، خروجی یکسان.** با توجه به ورودی‌های یکسان، یک تابع خالص باید همیشه همان نتیجه را برگرداند.

شاید قبلاً با یک مثال از توابع خالص آشنا باشید: فرمول‌ها در ریاضی.

این فرمول ریاضی را در نظر بگیرید: <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>.

اگر <Math><MathI>x</MathI> = 2</Math> آنگاه <Math><MathI>y</MathI> = 4</Math>. همیشه.

اگر <Math><MathI>x</MathI> = 3</Math> آنگاه <Math><MathI>y</MathI> = 6</Math>. همیشه.

اگر <Math><MathI>x</MathI> = 3</Math>، <MathI>y</MathI> گاهی <Math>9</Math> یا <Math>–1</Math> یا <Math>2.5</Math> نخواهد بود بسته به زمان روز یا وضعیت بازار بورس.

اگر <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> و <Math><MathI>x</MathI> = 3</Math>، <MathI>y</MathI> _همیشه_ <Math>6</Math> خواهد بود.

اگر این را به یک تابع جاوااسکریپت تبدیل می‌کردیم، شبیه این می‌شد:

```js
function double(number) {
  return 2 * number;
}
```

در مثال بالا، `double` یک **تابع خالص** است. اگر `3` را به آن پاس دهید، `6` برمی‌گرداند. همیشه.

ری‌اکت حول این مفهوم طراحی شده است. **ری‌اکت فرض می‌کند که هر کامپوننتی که می‌نویسید یک تابع خالص است.** این بدان معناست که کامپوننت‌های ری‌اکتی که می‌نویسید باید با توجه به ورودی‌های یکسان همیشه همان JSX را برگردانند:

<Sandpack>

```js src/App.js
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

وقتی `drinkers={2}` را به `Recipe` پاس می‌دهید، JSXی شامل `2 cups of water` برمی‌گرداند. همیشه.

اگر `drinkers={4}` پاس دهید، JSXی شامل `4 cups of water` برمی‌گرداند. همیشه.

درست مانند یک فرمول ریاضی.

می‌توانید کامپوننت‌های خود را به‌عنوان دستور پخت در نظر بگیرید: اگر به آن‌ها پایبند باشید و در طول فرآیند پخت مواد جدیدی معرفی نکنید، هر بار همان غذا را دریافت می‌کنید. آن «غذا» همان JSX است که کامپوننت برای [رندر کردن](/learn/render-and-commit) به ری‌اکت ارائه می‌دهد.

<Illustration src="/images/docs/illustrations/i_puritea-recipe.png" alt="A tea recipe for x people: take x cups of water, add x spoons of tea and 0.5x spoons of spices, and 0.5x cups of milk" />

## عوارض جانبی: پیامدهای (نا)خواسته {/*side-effects-unintended-consequences*/}

فرآیند رندر ری‌اکت باید همیشه خالص باشد. کامپوننت‌ها باید فقط JSX خود را *برگردانند*، و نه *تغییر دهند* هیچ شیء یا متغیری که قبل از رندر وجود داشته — این کار آن‌ها را ناخالص می‌کند!

اینجا کامپوننتی است که این قانون را نقض می‌کند:

<Sandpack>

```js {expectedErrors: {'react-compiler': [5]}}
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

این کامپوننت یک متغیر `guest` که خارج از آن تعریف شده را می‌خواند و می‌نویسد. این بدان معناست که **فراخوانی این کامپوننت چندین بار JSX متفاوتی تولید می‌کند!** و علاوه بر این، اگر کامپوننت‌های _دیگری_ `guest` را بخوانند، آن‌ها هم بسته به اینکه کِی رندر شده‌اند، JSX متفاوتی تولید می‌کنند! این قابل پیش‌بینی نیست.

برگردیم به فرمول خودمان <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math>، حالا حتی اگر <Math><MathI>x</MathI> = 2</Math> باشد، نمی‌توانیم اعتماد کنیم که <Math><MathI>y</MathI> = 4</Math>. تست‌های ما ممکن است شکست بخورند، کاربران ما گیج می‌شوند، هواپیماها از آسمان می‌افتند — می‌توانید ببینید چگونه این به باگ‌های گیج‌کننده منجر می‌شود!

می‌توانید این کامپوننت را با [پاس‌دادن `guest` به‌عنوان یک پراپس](/learn/passing-props-to-a-component) اصلاح کنید:

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

حالا کامپوننت شما خالص است، زیرا JSX که برمی‌گرداند فقط به پراپس `guest` وابسته است.

به‌طور کلی، نباید انتظار داشته باشید که کامپوننت‌های شما به هر ترتیب خاصی رندر شوند. اهمیتی ندارد که <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> را قبل یا بعد از <Math><MathI>y</MathI> = 5<MathI>x</MathI></Math> فراخوانی کنید: هر دو فرمول مستقل از یکدیگر حل می‌شوند. به همان روش، هر کامپوننت باید فقط «به فکر خودش باشد»، و در طول رندر تلاش نکند با دیگران هماهنگ شود یا به آن‌ها وابسته باشد. رندر مانند یک امتحان مدرسه است: هر کامپوننت باید JSX را به‌تنهایی محاسبه کند!

<DeepDive>

#### تشخیص محاسبات ناخالص با حالت سخت‌گیرانه {/*detecting-impure-calculations-with-strict-mode*/}

اگرچه ممکن است هنوز از همهٔ آن‌ها استفاده نکرده باشید، در ری‌اکت سه نوع ورودی وجود دارد که می‌توانید هنگام رندر بخوانید: [پراپس‌ها](/learn/passing-props-to-a-component)، [استیت](/learn/state-a-components-memory) و [کانتکست.](/learn/passing-data-deeply-with-context) همیشه باید با این ورودی‌ها به‌عنوان فقط‌خواندنی رفتار کنید.

وقتی می‌خواهید در پاسخ به ورودی کاربر چیزی را *تغییر دهید*، باید به‌جای نوشتن در یک متغیر، [استیت را تنظیم کنید](/learn/state-a-components-memory). هرگز نباید هنگام رندر شدن کامپوننت، متغیرها یا اشیاء ازپیش‌موجود را تغییر دهید.

ری‌اکت یک «حالت سخت‌گیرانه (Strict Mode)» ارائه می‌کند که در آن در طول توسعه، تابع هر کامپوننت را دو بار فراخوانی می‌کند. **با فراخوانی توابع کامپوننت دو بار، حالت سخت‌گیرانه کمک می‌کند کامپوننت‌هایی که این قوانین را نقض می‌کنند پیدا کند.**

توجه کنید که مثال اصلی به‌جای «Guest #1»، «Guest #2» و «Guest #3»، «Guest #2»، «Guest #4» و «Guest #6» را نمایش داد. تابع اصلی ناخالص بود، بنابراین فراخوانی دو بار آن را خراب کرد. اما نسخهٔ خالص اصلاح‌شده حتی اگر تابع هر بار دو بار فراخوانی شود هم کار می‌کند. **توابع خالص فقط محاسبه می‌کنند، بنابراین فراخوانی آن‌ها دو بار چیزی را تغییر نمی‌دهد** — درست مانند اینکه فراخوانی `double(2)` دو بار چیزی که برگردانده می‌شود را تغییر نمی‌دهد، و حل کردن <Math><MathI>y</MathI> = 2<MathI>x</MathI></Math> دو بار، <MathI>y</MathI> را تغییر نمی‌دهد. ورودی یکسان، خروجی یکسان. همیشه.

حالت سخت‌گیرانه در محیط تولید تأثیری ندارد، بنابراین برنامه را برای کاربران شما کند نمی‌کند. برای انتخاب حالت سخت‌گیرانه، می‌توانید کامپوننت ریشهٔ خود را در `<React.StrictMode>` بپیچید. برخی فریمورک‌ها این کار را به‌طور پیش‌فرض انجام می‌دهند.

</DeepDive>

### تغییر محلی: راز کوچک کامپوننت شما {/*local-mutation-your-components-little-secret*/}

در مثال بالا، مشکل این بود که کامپوننت هنگام رندر یک متغیر *ازپیش‌موجود* را تغییر داد. این اغلب **«mutation»** (جهش) نامیده می‌شود تا کمی ترسناک‌تر به‌نظر برسد. توابع خالص متغیرهای خارج از اسکوپ تابع یا اشیایی که قبل از فراخوانی ایجاد شده‌اند را تغییر نمی‌دهند — این کار آن‌ها را ناخالص می‌کند!

با این حال، **تغییر دادن متغیرها و اشیایی که *هم‌اکنون* در طول رندر ایجاد کرده‌اید کاملاً مشکلی ندارد.** در این مثال، یک آرایه `[]` ایجاد می‌کنید، آن را به متغیر `cups` اختصاص می‌دهید، و سپس یک جفت فنجان را به آن `push` می‌کنید:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  const cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

</Sandpack>

اگر متغیر `cups` یا آرایه `[]` خارج از تابع `TeaGathering` ایجاد شده بودند، این یک مشکل بزرگ می‌بود! شما با push کردن آیتم‌ها به آن آرایه، یک شیء *ازپیش‌موجود* را تغییر می‌دادید.

با این حال، مشکلی نیست زیرا آن‌ها را *در طول همان رندر*، درون `TeaGathering` ایجاد کرده‌اید. هیچ کد خارج از `TeaGathering` هرگز نخواهد فهمید که این اتفاق افتاده است. این **«local mutation» (تغییر محلی)** نامیده می‌شود — مانند راز کوچک کامپوننت شماست.

## کجا می‌توانید عوارض جانبی ایجاد کنید {/*where-you-_can_-cause-side-effects*/}

با این که برنامه‌نویسی تابعی به‌شدت به خلوص تکیه می‌کند، در نهایت، در جایی، _چیزی_ باید تغییر کند. این تا حدودی هدف برنامه‌نویسی است! این تغییرات — به‌روزرسانی صفحه، شروع یک انیمیشن، تغییر داده‌ها — **عوارض جانبی (side effects)** نامیده می‌شوند. آن‌ها چیزهایی هستند که _«در کنار»_ اتفاق می‌افتند، نه در طول رندر.

در ری‌اکت، **عوارض جانبی معمولاً درون [مدیرکننده‌های رویداد](/learn/responding-to-events) جای می‌گیرند.** مدیرکننده‌های رویداد توابعی هستند که ری‌اکت هنگام انجام برخی اقدامات اجرا می‌کند — برای مثال، وقتی روی یک دکمه کلیک می‌کنید. حتی اگر مدیرکننده‌های رویداد درون کامپوننت شما تعریف می‌شوند، در طول رندر اجرا *نمی‌شوند*! **بنابراین مدیرکننده‌های رویداد نیازی ندارند خالص باشند.**

اگر همهٔ گزینه‌های دیگر را امتحان کرده‌اید و نتوانسته‌اید مدیرکنندهٔ رویداد مناسبی برای عارضهٔ جانبی خود پیدا کنید، همچنان می‌توانید آن را به JSX برگردانده‌شده خود با یک فراخوانی [`useEffect`](/reference/react/useEffect) در کامپوننت خود متصل کنید. این به ری‌اکت می‌گوید که آن را بعداً، بعد از رندر، هنگامی که عوارض جانبی مجاز هستند اجرا کند. **با این حال، این رویکرد باید آخرین راه‌حل شما باشد.**

وقتی ممکن است، سعی کنید منطق خود را تنها با رندر بیان کنید. شگفت‌زده می‌شوید که این تا کجا می‌تواند شما را ببرد!

<DeepDive>

#### چرا ری‌اکت به خلوص اهمیت می‌دهد؟ {/*why-does-react-care-about-purity*/}

نوشتن توابع خالص نیاز به مقداری عادت و نظم دارد. اما فرصت‌های شگفت‌انگیزی را نیز باز می‌کند:

* کامپوننت‌های شما می‌توانند در محیط متفاوتی اجرا شوند — برای مثال، روی سرور! چون برای ورودی‌های یکسان همان نتیجه را برمی‌گردانند، یک کامپوننت می‌تواند به درخواست‌های بسیاری از کاربران خدمت کند.
* می‌توانید با [نادیده‌گرفتن رندر](/reference/react/memo) کامپوننت‌هایی که ورودی‌هایشان تغییر نکرده، عملکرد را بهبود ببخشید. این بی‌خطر است زیرا توابع خالص همیشه همان نتایج را برمی‌گردانند، بنابراین بی‌خطر است که آن‌ها را کش (cache) کنند.
* اگر برخی داده‌ها در میانهٔ رندر یک درخت کامپوننتی عمیق تغییر کنند، ری‌اکت می‌تواند رندر را بدون اتلاف وقت برای اتمام رندر قدیمی دوباره شروع کند. خلوص این را بی‌خطر می‌کند که در هر زمان از محاسبه دست بکشید.

هر قابلیت جدید ری‌اکت که می‌سازیم از خلوص بهره می‌برد. از fetch داده تا انیمیشن‌ها تا عملکرد، خالص نگه‌داشتن کامپوننت‌ها قدرت پارادایم ری‌اکت را باز می‌کند.

</DeepDive>

<Recap>

* یک کامپوننت باید خالص باشد، یعنی:
  * **فقط به کار خودش می‌پردازد.** نباید هیچ شیء یا متغیری که قبل از رندر وجود داشته را تغییر دهد.
  * **ورودی یکسان، خروجی یکسان.** با توجه به ورودی‌های یکسان، یک کامپوننت باید همیشه همان JSX را برگرداند.
* رندر می‌تواند در هر زمان اتفاق بیفتد، بنابراین کامپوننت‌ها نباید به ترتیب رندر یکدیگر وابسته باشند.
* نباید هیچ‌کدام از ورودی‌هایی که کامپوننت‌های شما برای رندر استفاده می‌کنند را تغییر دهید. این شامل پراپس‌ها، استیت و کانتکست می‌شود. برای به‌روزرسانی صفحه، به‌جای تغییر اشیاء ازپیش‌موجود، استیت را [«تنظیم»](/learn/state-a-components-memory) کنید.
* تلاش کنید منطق کامپوننت خود را در JSX که برمی‌گردانید بیان کنید. وقتی نیاز به «تغییر دادن چیزها» دارید، معمولاً می‌خواهید این کار را در یک مدیرکنندهٔ رویداد انجام دهید. به‌عنوان آخرین راه‌حل، می‌توانید از `useEffect` استفاده کنید.
* نوشتن توابع خالص کمی تمرین می‌برد، اما قدرت پارادایم ری‌اکت را باز می‌کند.

</Recap>


  
<Challenges>

#### تعمیر یک ساعت خراب {/*fix-a-broken-clock*/}

این کامپوننت تلاش می‌کند کلاس CSS `<h1>` را در زمان بین نیمه‌شب تا شش ساعت اول صبح به `"night"` و در همهٔ زمان‌های دیگر به `"day"` تنظیم کند. با این حال، کار نمی‌کند. می‌توانید این کامپوننت را تعمیر کنید؟

می‌توانید با تغییر موقت منطقهٔ زمانی کامپیوتر، تأیید کنید که راه‌حل شما کار می‌کند. وقتی زمان فعلی بین نیمه‌شب تا شش صبح است، ساعت باید رنگ‌های معکوس داشته باشد!

<Hint>

رندر یک *محاسبه* است، نباید تلاش کند چیزهایی را «انجام دهد». می‌توانید همان ایده را متفاوت بیان کنید؟

</Hint>

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  const hours = time.getHours();
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

```js src/App.js hidden
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

می‌توانید این کامپوننت را با محاسبهٔ `className` و گنجاندن آن در خروجی رندر تعمیر کنید:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  const hours = time.getHours();
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

```js src/App.js hidden
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

در این مثال، عارضهٔ جانبی (تغییر DOM) اصلاً ضروری نبود. فقط نیاز بود JSX برگردانید.

</Solution>

#### تعمیر یک پروفایل خراب {/*fix-a-broken-profile*/}

دو کامپوننت `Profile` با داده‌های متفاوت کنار هم رندر می‌شوند. روی پروفایل اول «Collapse» و سپس «Expand» را بزنید. متوجه می‌شوید که هر دو پروفایل اکنون یک شخص را نشان می‌دهند. این یک باگ است.

علت باگ را پیدا کنید و آن را تعمیر دهید.

<Hint>

کد باگ‌دار در `Profile.js` است. مطمئن شوید که آن را از بالا به پایین می‌خوانید!

</Hint>

<Sandpack>

```js {expectedErrors: {'react-compiler': [7]}} src/Profile.js
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

```js src/Panel.js hidden
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

```js src/App.js
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

```js src/utils.js hidden
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

مشکل این است که کامپوننت `Profile` در متغیر ازپیش‌موجودی به نام `currentPerson` می‌نویسد، و کامپوننت‌های `Header` و `Avatar` از آن می‌خوانند. این کار *هر سه* را ناخالص و دشوار برای پیش‌بینی می‌کند.

برای رفع باگ، متغیر `currentPerson` را حذف کنید. در عوض، تمام اطلاعات را از `Profile` به `Header` و `Avatar` از طریق پراپس‌ها منتقل کنید. باید یک پراپس `person` به هر دو کامپوننت اضافه کنید و آن را تا انتها پاس دهید.

<Sandpack>

```js src/Profile.js active
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

```js src/Panel.js hidden
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

```js src/App.js
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

```js src/utils.js hidden
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

به یاد داشته باشید که ری‌اکت تضمین نمی‌کند که توابع کامپوننت به هیچ ترتیب خاصی اجرا شوند، بنابراین نمی‌توانید با تنظیم متغیرها با آن‌ها ارتباط برقرار کنید. تمام ارتباط باید از طریق پراپس‌ها انجام شود.

</Solution>

#### تعمیر یک سینی داستان خراب {/*fix-a-broken-story-tray*/}

مدیرعامل شرکت شما از شما می‌خواهد «داستان‌هایی» به برنامهٔ ساعت آنلاین خود اضافه کنید، و نمی‌توانید نه بگویید. یک کامپوننت `StoryTray` نوشته‌اید که فهرستی از `stories` را می‌پذیرد، و به دنبال آن یک placeholder «Create Story» قرار می‌دهد.

شما placeholder «Create Story» را با push کردن یک داستان جعلی دیگر به انتهای آرایه `stories` که به‌عنوان پراپس دریافت می‌کنید پیاده‌سازی کرده‌اید. اما به‌نوعی، «Create Story» بیش از یک بار ظاهر می‌شود. این مشکل را رفع کنید.

<Sandpack>

```js src/StoryTray.js active
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

```js {expectedErrors: {'react-compiler': [16]}} src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

const initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  const [stories, setStories] = useState([...initialStories])
  const time = useTime();

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

توجه کنید که هر بار که ساعت به‌روزرسانی می‌شود، «Create Story» *دو بار* اضافه می‌شود. این به‌عنوان یک سرنخ به ما می‌گوید که در طول رندر یک mutation داشته‌ایم — حالت سخت‌گیرانه کامپوننت‌ها را دو بار فراخوانی می‌کند تا این مشکلات قابل‌توجه‌تر شوند.

تابع `StoryTray` خالص نیست. با فراخوانی `push` روی آرایه `stories` دریافت‌شده (یک پراپس!)، شیئی را که *قبل از* شروع رندر `StoryTray` ایجاد شده تغییر می‌دهد. این کار آن را باگ‌دار و بسیار دشوار برای پیش‌بینی می‌کند.

ساده‌ترین راه‌حل این است که اصلاً به آرایه دست نزنید، و «Create Story» را جداگانه رندر کنید:

<Sandpack>

```js src/StoryTray.js active
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

```js {expectedErrors: {'react-compiler': [16]}} src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

const initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  const [stories, setStories] = useState([...initialStories])
  const time = useTime();

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

همچنین می‌توانید یک آرایه _جدید_ (با کپی کردن آرایهٔ موجود) قبل از push کردن یک آیتم به آن ایجاد کنید:

<Sandpack>

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  // Copy the array!
  const storiesToDisplay = stories.slice();

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

```js {expectedErrors: {'react-compiler': [16]}} src/App.js hidden
import { useState, useEffect } from 'react';
import StoryTray from './StoryTray.js';

const initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  const [stories, setStories] = useState([...initialStories])
  const time = useTime();

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

این کار mutation شما را محلی نگه می‌دارد و تابع رندر شما را خالص. با این حال، همچنان باید مراقب باشید: برای مثال، اگر سعی می‌کردید هر یک از آیتم‌های موجود آرایه را تغییر دهید، باید آن آیتم‌ها را هم clone می‌کردید.

مفید است که به یاد داشته باشید کدام عملیات روی آرایه‌ها آن‌ها را تغییر می‌دهند، و کدام نه. برای مثال، `push`، `pop`، `reverse` و `sort` آرایهٔ اصلی را تغییر می‌دهند، اما `slice`، `filter` و `map` یک آرایهٔ جدید ایجاد می‌کنند.

</Solution>

</Challenges>
