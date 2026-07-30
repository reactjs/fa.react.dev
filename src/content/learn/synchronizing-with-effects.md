---
title: 'همگام‌سازی با افکت‌ها'
---

<Intro>

برخی کامپوننت‌ها نیاز دارند با سیستم‌های خارجی همگام شوند. مثلاً، ممکن است بخواهید یک کامپوننت غیر ری‌اکتی را بر اساس استیت ری‌اکت کنترل کنید، یک اتصال سرور برقرار کنید، یا وقتی یک کامپوننت روی صفحه ظاهر می‌شود یک لاگ تحلیلی ارسال کنید. *افکت‌ها* به شما اجازه می‌دهند پس از رندر کدی را اجرا کنید تا بتوانید کامپوننت خود را با سیستمی خارج از ری‌اکت همگام کنید.

</Intro>

<YouWillLearn>

- افکت‌ها چه هستند
- افکت‌ها چگونه با رویدادها متفاوت‌اند
- چگونه یک افکت را در کامپوننت خود اعلام کنید
- چگونه از اجرای غیرضروری مجدد یک افکت اجتناب کنید
- چرا افکت‌ها در محیط توسعه دو بار اجرا می‌شوند و چگونه آن‌ها را رفع کنید

</YouWillLearn>

## افکت‌ها چه هستند و چگونه با رویدادها متفاوت‌اند؟ {/*what-are-effects-and-how-are-they-different-from-events*/}

قبل از رسیدن به افکت‌ها، باید با دو نوع منطق داخل کامپوننت‌های ری‌اکت آشنا باشید:

- **کد رندر** (معرفی‌شده در [توصیف رابط کاربری](/learn/describing-the-ui)) در سطح بالای کامپوننت شما زندگی می‌کند. اینجا جایی است که پراپس و استیت را می‌گیرید، آن‌ها را تبدیل می‌کنید، و JSXای را که می‌خواهید روی صفحه ببینید برمی‌گردانید. [کد رندر باید خالص باشد.](/learn/keeping-components-pure) مثل یک فرمول ریاضی، فقط باید نتیجه را _محاسبه_ کند، نه کار دیگری انجام دهد.

- **مدیریت‌کننده‌های رویداد** (معرفی‌شده در [افزودن تعامل](/learn/adding-interactivity)) توابع تودرتوی داخل کامپوننت‌های شما هستند که کارها را *انجام می‌دهند* نه فقط محاسبه. یک مدیریت‌کنندهٔ رویداد ممکن است یک فیلد ورودی را به‌روز کند، یک درخواست HTTP POST برای خرید یک محصول ثبت کند، یا کاربر را به صفحهٔ دیگری ببرد. مدیریت‌کننده‌های رویداد شامل [«عارضه‌های جانبی»](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) (آن‌ها استیت برنامه را تغییر می‌دهند) هستند که توسط یک اقدام خاص کاربر (مثلاً، یک کلیک دکمه یا تایپ) ایجاد شده.

گاهی این کافی نیست. به یک کامپوننت `ChatRoom` توجه کنید که هر بار که روی صفحه مرئی است باید به سرور چت متصل شود. اتصال به سرور یک محاسبهٔ خالص نیست (یک عارضهٔ جانبی است) پس نمی‌تواند در طول رندر رخ دهد. با این حال، هیچ رویداد خاص یگانه‌ای مثل کلیک وجود ندارد که باعث نمایش `ChatRoom` شود.

***افکت‌ها به شما اجازه می‌دهند عارضه‌های جانبیای را مشخص کنید که توسط خود رندر ایجاد شده‌اند، نه توسط یک رویداد خاص.** ارسال یک پیام در چت یک *رویداد* است زیرا مستقیماً توسط کلیک کاربر روی یک دکمهٔ خاص ایجاد می‌شود. با این حال، برقراری یک اتصال سرور یک *افکت* است زیرا باید بدون توجه به این که کدام تعامل باعث ظاهر شدن کامپوننت شده رخ دهد. افکت‌ها در پایان یک [commit](/learn/render-and-commit) پس از به‌روزرسانی صفحه اجرا می‌شوند. این زمان خوبی برای همگام کردن کامپوننت‌های ری‌اکت با یک سیستم خارجی (مثل شبکه یا یک کتابخانهٔ شخص ثالث) است.

<Note>

در اینجا و بعد در این متن، «افکت» با حرف بزرگ به تعریف خاص ری‌اکت بالا اشاره دارد، یعنی یک عارضهٔ جانبی که توسط رندر ایجاد شده. برای اشاره به مفهوم برنامه‌نویسی گسترده‌تر، می‌گوییم «عارضهٔ جانبی».

</Note>


## ممکن است به افکت نیاز نداشته باشید {/*you-might-not-need-an-effect*/}

**عجله نکنید که افکت‌ها را به کامپوننت‌های خود اضافه کنید.** در نظر داشته باشید که افکت‌ها عموماً برای «خروج» از کد ری‌اکت شما و همگام‌سازی با برخی سیستم‌های *خارجی* استفاده می‌شوند. این شامل APIهای مرورگر، ویجت‌های شخص ثالث، شبکه، و غیره می‌شود. اگر افکت شما فقط مقداری استیت را بر اساس استیت دیگری تنظیم می‌کند، [ممکن است به افکت نیاز نداشته باشید.](/learn/you-might-not-need-an-effect)

## چگونه یک افکت بنویسیم {/*how-to-write-an-effect*/}

برای نوشتن یک افکت، این سه گام را دنبال کنید:

1. **یک افکت اعلام کنید.** به‌طور پیش‌فرض، افکت شما پس از هر [commit](/learn/render-and-commit) اجرا می‌شود.
2. **وابستگی‌های افکت را مشخص کنید.** بیشتر افکت‌ها فقط باید *وقتی لازم است* مجدداً اجرا شوند نه بعد از هر رندر. مثلاً، یک انیمیشن محو شدن فقط باید وقتی یک کامپوننت ظاهر می‌شود فعال شود. اتصال و قطع اتصال به یک اتاق چت فقط باید وقتی کامپوننت ظاهر و ناپدید می‌شود، یا وقتی اتاق چت تغییر می‌کند رخ دهد. خواهید آموخت چگونه این را با مشخص کردن *وابستگی‌ها* کنترل کنید.
3. **در صورت نیاز پاک‌سازی اضافه کنید.** برخی افکت‌ها باید مشخص کنند چگونه متوقف شوند، برگردانده شوند، یا هر کاری که می‌کردند را پاک کنند. مثلاً، «connect» به «disconnect» نیاز دارد، «subscribe» به «unsubscribe» نیاز دارد، و «fetch» به «cancel» یا «ignore» نیاز دارد. خواهید آموخت چگونه این کار را با برگرداندن یک *تابع پاک‌سازی* انجام دهید.

بیایید نگاهی به هر یک از این گام‌ها به‌تفصیل بیندازیم.

### گام ۱: یک افکت اعلام کنید {/*step-1-declare-an-effect*/}

برای اعلام یک افکت در کامپوننت خود، [هوک `useEffect`](/reference/react/useEffect) را از ری‌اکت وارد کنید:

```js
import { useEffect } from 'react';
```

سپس، آن را در سطح بالای کامپوننت خود فراخوانی کنید و مقداری کد داخل افکت خود بگذارید:

```js {2-4}
function MyComponent() {
  useEffect(() => {
    // Code here will run after *every* render
  });
  return <div />;
}
```

هر بار که کامپوننت شما رندر می‌شود، ری‌اکت صفحه را به‌روز می‌کند و *سپس* کد داخل `useEffect` را اجرا می‌کند. به‌عبارت دیگر، **`useEffect` اجرای یک تکه کد را تا وقتی آن رندر روی صفحه منعکس شود «به‌تعویق می‌اندازد».**

بیایید ببینیم چگونه می‌توانید از یک افکت برای همگام‌سازی با یک سیستم خارجی استفاده کنید. به یک کامپوننت ری‌اکت `<VideoPlayer>` توجه کنید. خوب بود که با پاس دادن یک پراپ `isPlaying` به آن کنترل می‌کردید که در حال پخش است یا متوقف:

```js
<VideoPlayer isPlaying={isPlaying} />;
```

کامپوننت `VideoPlayer` سفارشی شما تگ [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) داخلی مرورگر را رندر می‌کند:

```js
function VideoPlayer({ src, isPlaying }) {
  // TODO: do something with isPlaying
  return <video src={src} />;
}
```

با این حال، تگ `<video>` مرورگر پراپ `isPlaying` ندارد. تنها راه کنترل آن این است که به‌صورت دستی متدهای [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) و [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) را روی عنصر DOM فراخوانی کنید. **لازم است مقدار پراپ `isPlaying`، که می‌گوید آیا ویدیو _باید_ در حال حاضر پخش شود، را با فراخوانی‌هایی مثل `play()` و `pause()` همگام کنید.**

ابتدا لازم است یک [رفرنس](/learn/manipulating-the-dom-with-refs) به گره DOM `<video>` بگیریم.

ممکن است وسوسه شوید که `play()` یا `pause()` را در طول رندر فراخوانی کنید، اما این درست نیست:

<Sandpack>

```js {expectedErrors: {'react-compiler': [7, 9]}}
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // Calling these while rendering isn't allowed.
  } else {
    ref.current.pause(); // Also, this crashes.
  }

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

دلیل اینکه این کد درست نیست این است که تلاش می‌کند در طول رندر کاری با گره DOM انجام دهد. در ری‌اکت، [رندر باید یک محاسبهٔ خالص](/learn/keeping-components-pure) از JSX باشد و نباید شامل عارضه‌های جانبی مثل تغییر DOM باشد.

علاوه بر این، وقتی `VideoPlayer` برای بار اول فراخوانی می‌شود، DOM آن هنوز وجود ندارد! هنوز هیچ گره DOMای برای فراخوانی `play()` یا `pause()` روی آن وجود ندارد، زیرا ری‌اکت نمی‌داند چه DOMای ایجاد کند تا وقتی شما JSX را برمی‌گردانید.

راه‌حل این است که **عارضهٔ جانبی را با `useEffect` بپیچید تا از محاسبهٔ رندر خارج شود:**

```js {6,12}
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
```

با بستن به‌روزرسانی DOM در یک افکت، به ری‌اکت اجازه می‌دهید ابتدا صفحه را به‌روز کند. سپس افکت شما اجرا می‌شود.

وقتی کامپوننت `VideoPlayer` شما رندر می‌شود (چه بار اول چه اگر مجدداً رندر شود)، چند چیز اتفاق می‌افتد. ابتدا، ری‌اکت صفحه را به‌روز می‌کند، و مطمئن می‌شود تگ `<video>` با پراپس درست در DOM است. سپس ری‌اکت افکت شما را اجرا می‌کند. در نهایت، افکت شما بسته به مقدار `isPlaying` فراخوانی `play()` یا `pause()` را انجام می‌دهد.

دکمهٔ Play/Pause را چندین بار بزنید و ببینید چگونه پخش‌کنندهٔ ویدیو با مقدار `isPlaying` همگام می‌ماند:

<Sandpack>

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

در این مثال، «سیستم خارجی» که با استیت ری‌اکت همگام کردید API رسانهٔ مرورگر بود. می‌توانید از رویکرد مشابهی برای بستن کد غیر ری‌اکت قدیمی (مثل افزونه‌های jQuery) در کامپوننت‌های اعلامی ری‌اکت استفاده کنید.

توجه کنید که کنترل یک پخش‌کنندهٔ ویدیو در عمل بسیار پیچیده‌تر است. فراخوانی `play()` ممکن است شکست بخورد، کاربر ممکن است با کنترل‌های داخلی مرورگر پخش یا توقف کند، و غیره. این مثال خیلی ساده و ناقص است.

<Pitfall>

به‌طور پیش‌فرض، افکت‌ها بعد از *هر* رندر اجرا می‌شوند. به همین دلیل کدی مثل این **یک حلقهٔ بی‌نهایت تولید می‌کند:**

```js
const [count, setCount] = useState(0);
useEffect(() => {
  setCount(count + 1);
});
```

افکت‌ها به‌عنوان یک *نتیجهٔ* رندر اجرا می‌شوند. تنظیم استیت *تحریک می‌کند* رندر را. تنظیم استیت بلافاصله در یک افکت مثل وصل کردن یک پریز برق به خودش است. افکت اجرا می‌شود، استیت را تنظیم می‌کند، که باعث رندر مجدد می‌شود، که باعث اجرای افکت می‌شود، دوباره استیت را تنظیم می‌کند، این باعث رندر مجدد دیگری می‌شود، و به همین ترتیب.

افکت‌ها عموماً باید کامپوننت‌های شما را با یک سیستم *خارجی* همگام کنند. اگر سیستم خارجی وجود ندارد و فقط می‌خواهید مقداری استیت را بر اساس استیت دیگری تنظیم کنید، [ممکن است به افکت نیاز نداشته باشید.](/learn/you-might-not-need-an-effect)

</Pitfall>

### گام ۲: وابستگی‌های افکت را مشخص کنید {/*step-2-specify-the-effect-dependencies*/}

به‌طور پیش‌فرض، افکت‌ها بعد از *هر* رندر اجرا می‌شوند. اغلب، این **آن چیزی نیست که می‌خواهید:**

- گاهی، کند است. همگام‌سازی با یک سیستم خارجی همیشه فوری نیست، پس ممکن است بخواهید از انجام آن اجتناب کنید مگر اینکه لازم باشد. مثلاً، نمی‌خواهید در هر فشردۀ کلید به سرور چت مجدداً متصل شوید.
- گاهی، اشتباه است. مثلاً، نمی‌خواهید در هر فشردۀ کلید انیمیشن محو شدن یک کامپوننت را فعال کنید. انیمیشن فقط باید یک بار وقتی کامپوننت برای بار اول ظاهر می‌شود پخش شود.

برای نشان دادن مسئله، در اینجا مثال قبلی با چند فراخوانی `console.log` و یک ورودی متن که استیت کامپوننت والد را به‌روز می‌کند آمده است. توجه کنید تایپ چگونه باعث اجرای مجدد افکت می‌شود:

<Sandpack>

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
input, button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

می‌توانید به ری‌اکت بگویید که **از اجرای غیرضروری مجدد افکت اجتناب کند** با مشخص کردن یک آرایه از *وابستگی‌ها* به‌عنوان آرگومان دوم به فراخوانی `useEffect`. با افزودن یک آرایه `[]` خالی به مثال بالا در خط ۱۴ شروع کنید:

```js {3}
  useEffect(() => {
    // ...
  }, []);
```

باید خطایی ببینید که می‌گوید `React Hook useEffect has a missing dependency: 'isPlaying'`:

<Sandpack>

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, []); // This causes an error

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
input, button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

مشکل این است که کد داخل افکت شما برای تصمیم‌گیری دربارهٔ کار درست *وابسته به* پراپ `isPlaying` است، اما این وابستگی به‌صراحت اعلام نشده. برای رفع این مسئله، `isPlaying` را به آرایهٔ وابستگی اضافه کنید:

```js {2,7}
  useEffect(() => {
    if (isPlaying) { // It's used here...
      // ...
    } else {
      // ...
    }
  }, [isPlaying]); // ...so it must be declared here!
```

حالا تمام وابستگی‌ها اعلام شده‌اند، پس خطایی وجود ندارد. مشخص کردن `[isPlaying]` به‌عنوان آرایهٔ وابستگی به ری‌اکت می‌گوید که باید از اجرای مجدد افکت شما اجتناب کند اگر `isPlaying` همانند رندر قبلی است. با این تغییر، تایپ در ورودی باعث اجرای مجدد افکت نمی‌شود، اما زدن Play/Pause می‌کند:

<Sandpack>

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
input, button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

آرایهٔ وابستگی می‌تواند شامل چندین وابستگی باشد. ری‌اکت فقط در صورتی از اجرای مجدد افکت اجتناب می‌کند که *همهٔ* وابستگی‌هایی که مشخص کرده‌اید دقیقاً همان مقادیر رندر قبلی را داشته باشند. ری‌اکت مقادیر وابستگی را با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. برای جزئیات به [مرجع `useEffect`](/reference/react/useEffect#reference) مراجعه کنید.

**توجه کنید که نمی‌توانید وابستگی‌هایتان را «انتخاب» کنید.** اگر وابستگی‌هایی که مشخص کرده‌اید با آنچه ری‌اکت بر اساس کد داخل افکت شما انتظار دارد تطابق نداشته باشد، خطای لینت خواهید گرفت. این به گرفتن بسیاری از باگ‌ها در کد شما کمک می‌کند. اگر نمی‌خواهید کدی مجدداً اجرا شود، [*کد افکت خود را ویرایش کنید* تا آن وابستگی را «نیاز» نداشته باشد.](/learn/lifecycle-of-reactive-effects#what-to-do-when-you-dont-want-to-re-synchronize)

<Pitfall>

رفتارها بدون آرایهٔ وابستگی و با آرایهٔ وابستگی *خالی* `[]` متفاوت‌اند:

```js {3,7,11}
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```

در گام بعدی نگاهی دقیق به اینکه «mount» چه معنایی دارد خواهیم داشت.

</Pitfall>

<DeepDive>

#### چرا رفرنس از آرایهٔ وابستگی حذف شد؟ {/*why-was-the-ref-omitted-from-the-dependency-array*/}

این افکت هم `ref` و هم `isPlaying` را استفاده می‌کند، اما فقط `isPlaying` به‌عنوان وابستگی اعلام شده:

```js {9}
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
```

این به‌دلیل آن است که شیء `ref` *هویت پایداری* دارد: ری‌اکت تضمین می‌کند [همیشه همان شیء را از همان فراخوانی `useRef` در هر رندر دریافت می‌کنید.](/reference/react/useRef#returns) این هرگز تغییر نمی‌کند، پس هرگز به‌خودی خود باعث اجرای مجدد افکت نمی‌شود. بنابراین، مهم نیست آن را وارد کنید یا نه. وارد کردنش هم اشکالی ندارد:

```js {9}
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying, ref]);
```

[توابع `set`](/reference/react/useState#setstate) برگردانده‌شده توسط `useState` هم هویت پایدار دارند، پس اغلب می‌بینید که از وابستگی‌ها حذف شده‌اند. اگر لینتر اجازه می‌دهد یک وابستگی را بدون خطا حذف کنید، این کار امن است.

حذف وابستگی‌های همیشه پایدار فقط وقتی کار می‌کند که لینتر بتواند «ببیند» که شیء پایدار است. مثلاً، اگر `ref` از کامپوننت والد پاس داده شده بود، مجبور بودید آن را در آرایهٔ وابستگی مشخص کنید. با این حال، این خوب است زیرا نمی‌توانید بدانید آیا کامپوننت والد همیشه همان رفرنس را پاس می‌دهد، یا یکی از چند رفرنس را به‌صورت شرطی پاس می‌دهد. پس افکت شما _وابسته می‌شد_ به اینکه کدام رفرنس پاس داده شده.

</DeepDive>

### گام ۳: در صورت نیاز پاک‌سازی اضافه کنید {/*step-3-add-cleanup-if-needed*/}

به یک مثال متفاوت توجه کنید. در حال نوشتن یک کامپوننت `ChatRoom` هستید که وقتی ظاهر می‌شود نیاز دارد به سرور چت متصل شود. یک API `createConnection()` به شما داده شده که شیئی با متدهای `connect()` و `disconnect()` برمی‌گرداند. چگونه کامپوننت را وقتی به کاربر نمایش داده می‌شود متصل نگه می‌دارید؟

ابتدا منطق افکت را بنویسید:

```js
useEffect(() => {
  const connection = createConnection();
  connection.connect();
});
```

اتصال به چت بعد از هر رندر مجدد کند خواهد بود، پس آرایهٔ وابستگی را اضافه کنید:

```js {4}
useEffect(() => {
  const connection = createConnection();
  connection.connect();
}, []);
```

**کد داخل افکت از هیچ پراپس یا استیتی استفاده نمی‌کند، پس آرایهٔ وابستگی شما `[]` (خالی) است. این به ری‌اکت می‌گوید فقط این کد را وقتی کامپوننت «مانت» می‌شود، یعنی برای بار اول روی صفحه ظاهر می‌شود، اجرا کند.**

بیایید اجرای این کد را امتحان کنیم:

<Sandpack>

```js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

```js src/chat.js
export function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
```

</Sandpack>

این افکت فقط هنگام مانت اجرا می‌شود، پس ممکن است انتظار داشته باشید `"✅ Connecting..."` یک بار در کنسول چاپ شود. **با این حال، اگر کنسول را بررسی کنید، `"✅ Connecting..."` دو بار چاپ می‌شود. چرا این اتفاق می‌افتد؟**

تصور کنید کامپوننت `ChatRoom` بخشی از یک اپلیکیشن بزرگ‌تر با بسیاری از صفحات متفاوت است. کاربر سفر خود را در صفحهٔ `ChatRoom` شروع می‌کند. کامپوننت مانت می‌شود و `connection.connect()` را فراخوانی می‌کند. سپس تصور کنید کاربر به صفحهٔ دیگری می‌رود—مثلاً، به صفحهٔ Settings. کامپوننت `ChatRoom` آنمانت می‌شود. در نهایت، کاربر روی Back کلیک می‌کند و `ChatRoom` دوباره مانت می‌شود. این یک اتصال دوم راه‌اندازی می‌کند—اما اتصال اول هرگز تخریب نشده بود! همان‌طور که کاربر در اپلیکیشن می‌چرخد، اتصال‌ها انباشته می‌شوند.

باگ‌هایی مثل این بدون آزمایش دستی گسترده آسان از دست می‌روند. برای کمک به یافتن سریع آن‌ها، در محیط توسعه ری‌اکت هر کامپوننت را بلافاصله پس از مانت اولیه‌اش یک بار مجدداً مانت می‌کند.

دیدن لاگ `"✅ Connecting..."` دو بار به شما کمک می‌کند مسئلهٔ واقعی را متوجه شوید: کد شما هنگام آنمانت شدن کامپوننت اتصال را نمی‌بندد.

برای رفع مسئله، یک *تابع پاک‌سازی* از افکت خود برگردانید:

```js {4-6}
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);
```

ری‌اکت تابع پاک‌سازی شما را هر بار قبل از اجرای مجدد افکت، و یک بار نهایی هنگام آنمانت شدن کامپوننت (حذف شدن) فراخوانی می‌کند. ببینیم وقتی تابع پاک‌سازی پیاده‌سازی شده چه اتفاقی می‌افتد:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

```js src/chat.js
export function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
```

</Sandpack>

حالا در محیط توسعه سه لاگ کنسول می‌گیرید:

1. `"✅ Connecting..."`
2. `"❌ Disconnected."`
3. `"✅ Connecting..."`

**این رفتار درست در محیط توسعه است.** با مانت مجدد کامپوننت، ری‌اکت تأیید می‌کند که دور شدن و برگشتن کد شما را نمی‌شکند. قطع اتصال و سپس اتصال مجدد دقیقاً همان چیزی است که باید رخ دهد! وقتی پاک‌سازی را به‌خوبی پیاده‌سازی می‌کنید، نباید تفاوت قابل‌مشاهده‌ای برای کاربر بین اجرای افکت یک بار و اجرای آن، پاک‌سازی، و دوباره اجرای آن وجود داشته باشد. یک جفت فراخوانی اضافی connect/disconnect وجود دارد زیرا ری‌اکت در حال کاوش کد شما برای باگ‌ها در محیط توسعه است. این طبیعی است—سعی نکنید آن را از بین ببرید!

**در محیط تولید، فقط `"✅ Connecting..."` یک بار چاپ می‌شود.** مانت مجدد کامپوننت‌ها فقط در محیط توسعه رخ می‌دهد تا به شما کمک کند افکت‌هایی که نیاز به پاک‌سازی دارند را پیدا کنید. می‌توانید [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) را خاموش کنید تا از رفتار محیط توسعه خارج شوید، اما توصیه می‌کنیم آن را روشن نگه دارید. این به شما اجازه می‌دهد بسیاری از باگ‌ها مثل مورد بالا را پیدا کنید.

## چگونه با اجرای دو بار افکت در محیط توسعه رفتار کنیم؟ {/*how-to-handle-the-effect-firing-twice-in-development*/}

ری‌اکت عمداً کامپوننت‌های شما را در محیط توسعه مجدداً مانت می‌کند تا باگ‌هایی مثل مثال آخر را پیدا کند. **سؤال درست این نیست که «چگونه یک افکت را یک بار اجرا کنیم»، بلکه «چگونه افکتم را طوری رفع کنم که بعد از مانت مجدد کار کند».**

عموماً، پاسخ پیاده‌سازی تابع پاک‌سازی است. تابع پاک‌سازی باید هر کاری که افکت می‌کرد را متوقف یا برگرداند. قانون سرانگشتی این است که کاربر نباید بتواند بین اجرای افکت یک بار (مثل محیط تولید) و یک توالی _راه‌انداری → پاک‌سازی → راه‌انداری_ (مثل محیط توسعه) تفاوتی تشخیص دهد.

بیشتر افکت‌هایی که خواهید نوشت در یکی از الگوهای رایج زیر جای می‌گیرند.

<Pitfall>

#### از رفرنس‌ها برای جلوگیری از اجرای افکت‌ها استفاده نکنید {/*dont-use-refs-to-prevent-effects-from-firing*/}

یک اشتباه رایج برای جلوگیری از اجرای دو بار افکت در محیط توسعه استفاده از یک `ref` برای جلوگیری از اجرای بیش از یک بار افکت است. مثلاً، می‌توانستید باگ بالا را با یک `useRef` «رفع» کنید:

```js {1,3-4}
  const connectionRef = useRef(null);
  useEffect(() => {
    // 🚩 This wont fix the bug!!!
    if (!connectionRef.current) {
      connectionRef.current = createConnection();
      connectionRef.current.connect();
    }
  }, []);
```

این باعث می‌شود `"✅ Connecting..."` را فقط یک بار در محیط توسعه ببینید، اما باگ را رفع نمی‌کند.

وقتی کاربر دور می‌شود، اتصال همچنان بسته نمی‌شود و وقتی برمی‌گردند، یک اتصال جدید ایجاد می‌شود. همان‌طور که کاربر در اپلیکیشن می‌چرخد، اتصال‌ها انباشته می‌شوند، همان‌طور که قبل از «رفع» می‌شد.

برای رفع باگ، کافی نیست که افکت را یک بار اجرا کنید. افکت باید بعد از مانت مجدد کار کند، که یعنی اتصال باید مثل راه‌حل بالا پاک‌سازی شود.

برای نحوه مدیریت الگوهای رایج به مثال‌های زیر نگاه کنید.

</Pitfall>

### کنترل ویجت‌های غیر ری‌اکت {/*controlling-non-react-widgets*/}

گاهی لازم است ویجت‌های رابط کاربری اضافه کنید که با ری‌اکت نوشته نشده‌اند. مثلاً، فرض کنید در حال افزودن یک کامپوننت نقشه به صفحهٔ خود هستید. این کامپوننت یک متد `setZoomLevel()` دارد، و می‌خواهید سطح زوم را با یک متغیر استیت `zoomLevel` در کد ری‌اکت خود همگام نگه دارید. افکت شما شبیه این خواهد بود:

```js
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
```

توجه کنید که در این مورد پاک‌سازی لازم نیست. در محیط توسعه، ری‌اکت افکت را دو بار فراخوانی می‌کند، اما این مشکل‌ساز نیست زیرا فراخوانی `setZoomLevel` دو بار با همان مقدار کاری انجام نمی‌دهد. ممکن است کمی کندتر باشد، اما این مهم نیست زیرا در محیط تولید به‌طور غیرضروری مجدداً مانت نمی‌شود.

برخی APIها ممکن است اجازه ندهند آن‌ها را دو بار پشت سر هم فراخوانی کنید. مثلاً، متد [`showModal`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) از عنصر [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) داخلی اگر دو بار فراخوانی شود خطا می‌اندازد. تابع پاک‌سازی را پیاده‌سازی کنید و آن را طوری بسازید که دیالوگ را ببندد:

```js {4}
useEffect(() => {
  const dialog = dialogRef.current;
  dialog.showModal();
  return () => dialog.close();
}, []);
```

در محیط توسعه، افکت شما `showModal()` را فراخوانی می‌کند، سپس بلافاصله `close()`، و سپس دوباره `showModal()`. این همان رفتار قابل‌مشاهده برای کاربر را دارد که فراخوانی `showModal()` یک بار، همان‌طور که در محیط تولید می‌دیدید.

### اشتراک در رویدادها {/*subscribing-to-events*/}

اگر افکت شما در چیزی مشترک می‌شود، تابع پاک‌سازی باید لغو اشتراک کند:

```js {6}
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

در محیط توسعه، افکت شما `addEventListener()` را فراخوانی می‌کند، سپس بلافاصله `removeEventListener()`، و سپس `addEventListener()` را دوباره با همان مدیریت‌کننده فراخوانی می‌کند. پس در یک زمان فقط یک اشتراک فعال وجود خواهد داشت. این همان رفتار قابل‌مشاهده برای کاربر را دارد که فراخوانی `addEventListener()` یک بار، مثل محیط تولید.

### فعال کردن انیمیشن‌ها {/*triggering-animations*/}

اگر افکت شما چیزی را به‌حرکت درمی‌آورد، تابع پاک‌سازی باید انیمیشن را به مقادیر اولیه بازگرداند:

```js {4-6}
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // Trigger the animation
  return () => {
    node.style.opacity = 0; // Reset to the initial value
  };
}, []);
```

در محیط توسعه، opacity به `1`، سپس به `0`، و سپس دوباره به `1` تنظیم می‌شود. این باید همان رفتار قابل‌مشاهده برای کاربر را داشته باشد که تنظیم مستقیم آن به `1`، که در محیط تولید رخ می‌داد. اگر از یک کتابخانهٔ انیمیشن شخص ثالث با پشتیبانی از tweening استفاده می‌کنید، تابع پاک‌سازی شما باید تایم‌لاین را به حالت اولیه‌اش بازگرداند.

### واکشی داده {/*fetching-data*/}

اگر افکت شما چیزی را واکشی می‌کند، تابع پاک‌سازی باید یا [واکشی را لغو کند](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) یا نتیجهٔ آن را نادیده بگیرد:

```js {2,6,13-15}
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```

نمی‌توانید یک درخواست شبکه‌ای که از قبل رخ داده را «برگردانید»، اما تابع پاک‌سازی شما باید اطمینان حاصل کند که واکشی که _دیگر مرتبط نیست_ به اپلیکیشن شما تأثیر نگذارد. اگر `userId` از `'Alice'` به `'Bob'` تغییر کند، پاک‌سازی اطمینان حاصل می‌کند که پاسخ `'Alice'` نادیده گرفته می‌شود حتی اگر بعد از `'Bob'` برسد.

**در محیط توسعه، دو واکشی در تب Network خواهید دید.** هیچ اشکالی در این نیست. با رویکرد بالا، افکت اول بلافاصله پاک‌سازی می‌شود پس کپی متغیر `ignore` آن روی `true` تنظیم خواهد شد. پس حتی اگر یک درخواست اضافی وجود داشته باشد، به‌لطف بررسی `if (!ignore)` روی استیت تأثیر نخواهد داشت.

**در محیط تولید، فقط یک درخواست خواهد بود.** اگر درخواست دوم در محیط توسعه شما را آزار می‌دهد، بهترین رویکرد استفاده از راه‌حلی است که درخواست‌ها را حذف تکرار می‌کند و پاسخ‌های آن‌ها را بین کامپوننت‌ها کش می‌کند:

```js
function TodoList() {
  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);
  // ...
```

این نه‌تنها تجربهٔ توسعه را بهبود می‌بخشد، بلکه اپلیکیشن شما را سریع‌تر حس می‌کند. مثلاً، کاربر وقتی دکمهٔ Back را می‌زند نباید منتظر بارگذاری مجدد برخی داده‌ها بماند زیرا کش خواهند شد. می‌توانید چنین کشی را خود بسازید یا یکی از بسیاری از جایگزین‌های واکشی دستی در افکت‌ها را استفاده کنید.

<DeepDive>

#### جایگزین‌های خوب برای واکشی داده در افکت‌ها چه هستند؟ {/*what-are-good-alternatives-to-data-fetching-in-effects*/}

نوشتن فراخوانی‌های `fetch` داخل افکت‌ها یک [روش محبوب برای واکشی داده](https://www.robinwieruch.de/react-hooks-fetch-data/) است، به‌ویژه در اپلیکیشن‌های کاملاً سمت کلاینت. با این حال، این یک رویکرد بسیار دستی است و معایب قابل‌توجهی دارد:

- **افکت‌ها روی سرور اجرا نمی‌شوند.** این یعنی HTML اولیهٔ رندرشدهٔ سرور فقط شامل یک استیت بارگذاری بدون داده خواهد بود. کامپیوتر کلاینت مجبور خواهد بود تمام جاوااسکریپت را دانلود کند و اپلیکیشن شما را رندر کند فقط برای کشف اینکه حالا نیاز به بارگذاری داده دارد. این خیلی کارآمد نیست.
- **واکشی مستقیم در افکت‌ها ایجاد «آبشارهای شبکه» را آسان می‌کند.** شما کامپوننت والد را رندر می‌کنید، آن برخی داده‌ها را واکشی می‌کند، کامپوننت‌های فرزند را رندر می‌کند، و سپس آن‌ها شروع به واکشی داده‌های خود می‌کنند. اگر شبکه خیلی سریع نیست، این به‌طور قابل‌توجهی کندتر از واکشی همهٔ داده‌ها به‌موازات است.
- **واکشی مستقیم در افکت‌ها عموماً یعنی داده را preload یا کش نمی‌کنید.** مثلاً، اگر کامپوننت آنمانت شود و سپس دوباره مانت شود، باید دوباره داده را واکشی کند.
- **خیلی ارگونومیک نیست.** مقداری کد دیگ‌بویلرپلیت در نوشتن فراخوانی‌های `fetch` به‌روشی که از باگ‌هایی مثل [شرایط رقابتی](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) رنج نبرد، دخیل است.

این لیست معایب خاص ری‌اکت نیست. برای واکشی داده هنگام مانت با هر کتابخانه‌ای اعمال می‌شود. مثل مسیریابی، واکشی داده برای انجام خوب بی‌اهیمت نیست، پس رویکردهای زیر را توصیه می‌کنیم:

- **اگر از یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) استفاده می‌کنید، از مکانیزم واکشی دادهٔ داخلی آن استفاده کنید.** فریم‌ورک‌های مدرن ری‌اکت مکانیزم‌های واکشی دادهٔ یکپارچه دارند که کارآمدند و از مشکلات بالا رنج نمی‌برند.
- **در غیر این صورت، استفاده یا ساخت یک کش سمت کلاینت را در نظر بگیرید.** راه‌حل‌های متن‌باز محبوب شامل [React Query](https://tanstack.com/query/latest)، [useSWR](https://swr.vercel.app/)، و [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) هستند. می‌توانید راه‌حل خودتان را هم بسازید، در این مورد زیر هود از افکت‌ها استفاده می‌کنید، اما منطقی برای حذف تکرار درخواست‌ها، کش پاسخ‌ها، و اجتناب از آبشارهای شبکه (با preload کردن داده یا بالا بردن نیازمندی‌های داده به مسیرها) اضافه می‌کنید.

اگر هیچ‌کدام از این رویکردها مناسب شما نیست، می‌توانید به واکشی مستقیم داده در افکت‌ها ادامه دهید.

</DeepDive>

### ارسال تحلیلات {/*sending-analytics*/}

به این کد که یک رویداد تحلیلی در بازدید صفحه ارسال می‌کند توجه کنید:

```js
useEffect(() => {
  logVisit(url); // Sends a POST request
}, [url]);
```

در محیط توسعه، `logVisit` برای هر URL دو بار فراخوانی می‌شود، پس ممکن است وسوسه شوید که سعی کنید آن را رفع کنید. **توصیه می‌کنیم این کد را همان‌طور که هست نگه دارید.** مثل مثال‌های قبلی، تفاوت رفتار *قابل‌مشاهده برای کاربر* بین اجرای یک بار و دو بار وجود ندارد. از نقطه نظر عملی، `logVisit` نباید در محیط توسعه کاری انجام دهد زیرا نمی‌خواهید لاگ‌ها از ماشین‌های توسعه معیارهای تولید را تحریف کنند. کامپوننت شما هر بار که فایلش را ذخیره می‌کنید مجدداً مانت می‌شود، پس به‌هرحال بازدیدهای اضافی در محیط توسعه لاگ می‌کند.

**در محیط تولید، لاگ‌های بازدید تکراری نخواهند بود.**

برای دیباگ رویدادهای تحلیلی که ارسال می‌کنید، می‌توانید اپلیکیشن خود را در یک محیط staging (که در حالت تولید اجرا می‌شود) مستقر کنید یا موقتاً از [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) و بررسی‌های مانت مجدد فقط-توسعه‌اش خارج شوید. همچنین می‌توانید تحلیلات را از مدیریت‌کننده‌های رویداد تغییر مسیر به‌جای افکت‌ها ارسال کنید. برای تحلیلات دقیق‌تر، [intersection observerها](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) می‌توانند به ردیابی اینکه کدام کامپوننت‌ها در viewport هستند و چقدر طولانی مرئی می‌مانند کمک کنند.

### یک افکت نیست: مقداردهی اپلیکیشن {/*not-an-effect-initializing-the-application*/}

برخی منطق فقط باید یک بار هنگام شروع اپلیکیشن اجرا شود. می‌توانید آن را خارج از کامپوننت‌های خود بگذارید:

```js {2-3}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

این تضمین می‌کند که چنین منطقی فقط یک بار بعد از بارگذاری صفحه توسط مرورگر اجرا شود.

### یک افکت نیست: خرید یک محصول {/*not-an-effect-buying-a-product*/}

گاهی، حتی اگر تابع پاک‌سازی بنویسید، راهی برای جلوگیری از عواقب قابل‌مشاهده برای کاربر از اجرای دو بار افکت وجود ندارد. مثلاً، شاید افکت شما یک درخواست POST مثل خرید یک محصول ارسال می‌کند:

```js {2-3}
useEffect(() => {
  // 🔴 Wrong: This Effect fires twice in development, exposing a problem in the code.
  fetch('/api/buy', { method: 'POST' });
}, []);
```

نمی‌خواهید محصول را دو بار بخرید. با این حال، این هم دلیلی است که نباید این منطق را در یک افکت بگذارید. چه می‌شود اگر کاربر به صفحهٔ دیگری برود و سپس Back را بزند؟ افکت شما دوباره اجرا می‌شود. شما نمی‌خواهید وقتی کاربر *بازدید* یک صفحه می‌کند محصول را بخرید؛ می‌خواهید وقتی کاربر دکمهٔ Buy را *کلیک* می‌کند آن را بخرید.

خرید توسط رندر ایجاد نمی‌شود؛ توسط یک تعامل خاص ایجاد می‌شود. فقط باید وقتی کاربر دکمه را می‌زند اجرا شود. **افکت را حذف کنید و درخواست `/api/buy` خود را به مدیریت‌کنندهٔ رویداد دکمهٔ Buy منتقل کنید:**

```js {2-3}
  function handleClick() {
    // ✅ Buying is an event because it is caused by a particular interaction.
    fetch('/api/buy', { method: 'POST' });
  }
```

**این نشان می‌دهد که اگر مانت مجدد منطق اپلیکیشن شما را بشکند، این عموماً باگ‌های موجود را فاش می‌کند.** از منظر کاربر، بازدید یک صفحه نباید با بازدید آن، کلیک روی یک لینک، و سپس زدن Back برای دیدن دوبارهٔ صفحه متفاوت باشد. ری‌اکت با مانت مجدد یک بار در محیط توسعه تأیید می‌کند که کامپوننت‌های شما به این اصل پایبند هستند.

## کنار هم گذاشتن همه چیز {/*putting-it-all-together*/}

این playground می‌تواند به شما کمک کند تا «حسی» از نحوهٔ کار افکت‌ها در عمل پیدا کنید.

این مثال از [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) برای زمان‌بندی یک لاگ کنسول با متن ورودی استفاده می‌کند تا سه ثانیه بعد از اجرای افکت ظاهر شود. تابع پاک‌سازی تایم‌اوت در انتظار را لغو می‌کند. با فشردن «Mount the component» شروع کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Unmount' : 'Mount'} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}
```

</Sandpack>

ابتدا سه لاگ خواهید دید: `Schedule "a" log`، `Cancel "a" log`، و دوباره `Schedule "a" log`. سه ثانیه بعد یک لاگ که می‌گوید `a` هم خواهد بود. همان‌طور که قبلاً آموختید، جفت schedule/cancel اضافی به‌دلیل آن است که ری‌اکت در محیط توسعه کامپوننت را یک بار مجدداً مانت می‌کند تا تأیید کند پاک‌سازی را به‌خوبی پیاده‌سازی کرده‌اید.

حالا ورودی را ویرایش کنید تا بگوید `abc`. اگر به‌اندازه کافی سریع این کار را بکنید، `Schedule "ab" log` را بلافاصله به‌دنبال آن `Cancel "ab" log` و `Schedule "abc" log` خواهید دید. **ری‌اکت همیشه افکت رندر قبلی را قبل از افکت رندر بعدی پاک‌سازی می‌کند.** به همین دلیل حتی اگر در ورودی سریع تایپ کنید، در یک زمان حداکثر یک تایم‌اوت زمان‌بندی شده است. ورودی را چند بار ویرایش کنید و کنسول را تماشا کنید تا حسی از نحوهٔ پاک‌سازی افکت‌ها پیدا کنید.

چیزی در ورودی تایپ کنید و سپس بلافاصله «Unmount the component» را بزنید. توجه کنید آنمانت شدن چگونه افکت آخرین رندر را پاک‌سازی می‌کند. در اینجا، آخرین تایم‌اوت را قبل از اینکه فرصت اجرا پیدا کند پاک می‌کند.

در نهایت، کامپوننت بالا را ویرایش کنید و تابع پاک‌سازی را کامنت کنید تا تایم‌اوت‌ها لغو نشوند. سعی کنید `abcde` را سریع تایپ کنید. انتظار دارید در سه ثانیه چه اتفاقی بیفتد؟ آیا `console.log(text)` داخل تایم‌اوت آخرین `text` را چاپ می‌کند و پنج لاگ `abcde` تولید می‌کند؟ امتحانش کنید تا شهودتان را بررسی کنید!

سه ثانیه بعد، باید توالی از لاگ‌ها (`a`، `ab`، `abc`، `abcd`، و `abcde`) را ببینید به‌جای پنج لاگ `abcde`. **هر افکت مقدار `text` را از رندر متناظرش «گرفته» است.** مهم نیست که استیت `text` تغییر کرده: یک افکت از رندری با `text = 'ab'` همیشه `'ab'` را خواهد دید. به‌عبارت دیگر، افکت‌ها از هر رندر از هم ایزوله‌اند. اگر کنجکاو هستید که این چگونه کار می‌کند، می‌توانید دربارهٔ [کلوژرها](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) بخوانید.

<DeepDive>

#### هر رندر افکت‌های خودش را دارد {/*each-render-has-its-own-effects*/}

می‌توانید `useEffect` را به‌عنوان «پیوست کردن» یک تکه رفتار به خروجی رندر در نظر بگیرید. به این افکت توجه کنید:

```js
export default function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to {roomId}!</h1>;
}
```

بیایید ببینیم دقیقاً چه اتفاقی می‌افتد وقتی کاربر در اپلیکیشن می‌چرخد.

#### رندر اولیه {/*initial-render*/}

کاربر `<ChatRoom roomId="general" />` را بازدید می‌کند. بیایید `roomId` را با `'general'` [جایگزینی ذهنی](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) کنیم:

```js
  // JSX for the first render (roomId = "general")
  return <h1>Welcome to general!</h1>;
```

**افکت *همچنین* بخشی از خروجی رندر است.** افکت رندر اول می‌شود:

```js
  // Effect for the first render (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the first render (roomId = "general")
  ['general']
```

ری‌اکت این افکت را اجرا می‌کند، که به اتاق چت `'general'` متصل می‌شود.

#### رندر مجدد با همان وابستگی‌ها {/*re-render-with-same-dependencies*/}

فرض کنید `<ChatRoom roomId="general" />` مجدداً رندر می‌شود. خروجی JSX همان است:

```js
  // JSX for the second render (roomId = "general")
  return <h1>Welcome to general!</h1>;
```

ری‌اکت می‌بیند که خروجی رندر تغییر نکرده، پس DOM را به‌روز نمی‌کند.

افکت رندر دوم مثل این است:

```js
  // Effect for the second render (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the second render (roomId = "general")
  ['general']
```

ری‌اکت `['general']` از رندر دوم را با `['general']` از رندر اول مقایسه می‌کند. **چون تمام وابستگی‌ها یکسان‌اند، ری‌اکت افکت رندر دوم را *نادیده می‌گیرد*.** هرگز فراخوانی نمی‌شود.

#### رندر مجدد با وابستگی‌های متفاوت {/*re-render-with-different-dependencies*/}

سپس، کاربر `<ChatRoom roomId="travel" />` را بازدید می‌کند. این بار، کامپوننت JSX متفاوتی برمی‌گرداند:

```js
  // JSX for the third render (roomId = "travel")
  return <h1>Welcome to travel!</h1>;
```

ری‌اکت DOM را به‌روز می‌کند تا `"Welcome to general"` به `"Welcome to travel"` تغییر کند.

افکت رندر سوم مثل این است:

```js
  // Effect for the third render (roomId = "travel")
  () => {
    const connection = createConnection('travel');
    connection.connect();
    return () => connection.disconnect();
  },
  // Dependencies for the third render (roomId = "travel")
  ['travel']
```

ری‌اکت `['travel']` از رندر سوم را با `['general']` از رندر دوم مقایسه می‌کند. یک وابستگی متفاوت است: `Object.is('travel', 'general')` برابر `false` است. افکت نمی‌تواند نادیده گرفته شود.

**قبل از اینکه ری‌اکت بتواند افکت رندر سوم را اعمال کند، لازم است آخرین افکتی که _اجرا شده_ بود را پاک‌سازی کند.** افکت رندر دوم نادیده گرفته شده بود، پس ری‌اکت لازم است افکت رندر اول را پاک‌سازی کند. اگر به رندر اول برگردید، خواهید دید که پاک‌سازی آن `disconnect()` را روی اتصالی که با `createConnection('general')` ایجاد شده بود فراخوانی می‌کند. این اپلیکیشن را از اتاق چت `'general'` قطع می‌کند.

بعد از آن، ری‌اکت افکت رندر سوم را اجرا می‌کند. این به اتاق چت `'travel'` متصل می‌شود.

#### آنمانت {/*unmount*/}

در نهایت، فرض کنید کاربر دور می‌شود، و کامپوننت `ChatRoom` آنمانت می‌شود. ری‌اکت تابع پاک‌سازی آخرین افکت را اجرا می‌کند. آخرین افکت از رندر سوم بود. پاک‌سازی رندر سوم اتصال `createConnection('travel')` را تخریب می‌کند. پس اپلیکیشن از اتاق `'travel'` قطع می‌شود.

#### رفتارهای فقط-توسعه {/*development-only-behaviors*/}

وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) روشن است، ری‌اکت هر کامپوننت را یک بار بعد از مانت مجدداً مانت می‌کند (استیت و DOM حفظ می‌شوند). این [کمک می‌کند افکت‌هایی که نیاز به پاک‌سازی دارند را پیدا کنید](#step-3-add-cleanup-if-needed) و باگ‌هایی مثل شرایط رقابتی را زود فاش کند. علاوه بر این، ری‌اکت افکت‌ها را هر بار که در محیط توسعه فایلی را ذخیره می‌کنید مجدداً مانت می‌کند. هر دوی این رفتارها فقط-توسعه هستند.

</DeepDive>

<Recap>

- برخلاف رویدادها، افکت‌ها توسط خود رندر ایجاد می‌شوند نه توسط یک تعامل خاص.
- افکت‌ها به شما اجازه می‌دهند یک کامپوننت را با یک سیستم خارجی (API شخص ثالث، شبکه، و غیره) همگام کنید.
- به‌طور پیش‌فرض، افکت‌ها بعد از هر رندر (از جمله رندر اولیه) اجرا می‌شوند.
- ری‌اکت از افکت اجتناب می‌کند اگر تمام وابستگی‌هایش همان مقادیر رندر قبلی را داشته باشند.
- شما نمی‌توانید وابستگی‌هایتان را «انتخاب» کنید. آن‌ها توسط کد داخل افکت تعیین می‌شوند.
- آرایهٔ وابستگی خالی (`[]`) به «مانت شدن» کامپوننت، یعنی اضافه شدن به صفحه، مربوط است.
- در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت کامپوننت‌ها را دو بار مانت می‌کند (فقط در محیط توسعه!) تا افکت‌های شما را تست استرس کند.
- اگر افکت شما به‌دلیل مانت مجدد می‌شکند، لازم است یک تابع پاک‌سازی پیاده‌سازی کنید.
- ری‌اکت تابع پاک‌سازی شما را قبل از اجرای بعدی افکت، و در طول آنمانت فراخوانی می‌کند.

</Recap>

<Challenges>

#### فوکوس کردن یک فیلد هنگام مانت {/*focus-a-field-on-mount*/}

در این مثال، فرم یک کامپوننت `<MyInput />` را رندر می‌کند.

از متد [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) ورودی استفاده کنید تا `MyInput` به‌طور خودکار وقتی روی صفحه ظاهر می‌شود فوکوس شود. یک پیاده‌سازی کامنت‌شده از قبل وجود دارد، اما خیلی خوب کار نمی‌کند. بفهمید چرا کار نمی‌کند، و آن را رفع کنید. (اگر با ویژگی `autoFocus` آشنا هستید، فرض کنید آن وجود ندارد: ما همان عملکرد را از صفر بازپیاده‌سازی می‌کنیم.)

<Sandpack>

```js src/MyInput.js active
import { useEffect, useRef } from 'react';

export default function MyInput({ value, onChange }) {
  const ref = useRef(null);

  // TODO: This doesn't quite work. Fix it.
  // ref.current.focus()

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('Taylor');
  const [upper, setUpper] = useState(false);
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} form</button>
      <br />
      <hr />
      {show && (
        <>
          <label>
            Enter your name:
            <MyInput
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={e => setUpper(e.target.checked)}
            />
            Make it uppercase
          </label>
          <p>Hello, <b>{upper ? name.toUpperCase() : name}</b></p>
        </>
      )}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>


برای تأیید اینکه راه‌حل شما کار می‌کند، «Show form» را بزنید و تأیید کنید که ورودی فوکوس را دریافت می‌کند (برجسته می‌شود و مکان‌نما داخل آن قرار می‌گیرد). «Hide form» و سپس دوباره «Show form» را بزنید. تأیید کنید ورودی دوباره برجسته می‌شود.

`MyInput` فقط باید _هنگام مانت_ فوکوس کند نه بعد از هر رندر. برای تأیید اینکه رفتار درست است، «Show form» را بزنید و سپس مکرراً چک‌باکس «Make it uppercase» را بزنید. کلیک روی چک‌باکس نباید ورودی بالای خود را فوکوس کند.

<Solution>

فراخوانی `ref.current.focus()` در طول رندر اشتباه است زیرا یک *عارضهٔ جانبی* است. عارضه‌های جانبی باید یا داخل یک مدیریت‌کنندهٔ رویداد قرار گیرند یا با `useEffect` اعلام شوند. در این مورد، عارضهٔ جانبی توسط ظاهر شدن کامپوننت _ایجاد می‌شود_ نه توسط هر تعامل خاص، پس منطقی است آن را در یک افکت بگذارید.

برای رفع اشتباه، فراخوانی `ref.current.focus()` را در یک اعلام افکت بپیچید. سپس، برای اطمینان از اینکه این افکت فقط هنگام مانت اجرا می‌شود نه بعد از هر رندر، آرایهٔ `[]` خالی را به آن اضافه کنید.

<Sandpack>

```js src/MyInput.js active
import { useEffect, useRef } from 'react';

export default function MyInput({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('Taylor');
  const [upper, setUpper] = useState(false);
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} form</button>
      <br />
      <hr />
      {show && (
        <>
          <label>
            Enter your name:
            <MyInput
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={upper}
              onChange={e => setUpper(e.target.checked)}
            />
            Make it uppercase
          </label>
          <p>Hello, <b>{upper ? name.toUpperCase() : name}</b></p>
        </>
      )}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

</Solution>

#### فوکوس شرطی یک فیلد {/*focus-a-field-conditionally*/}

این فرم دو کامپوننت `<MyInput />` را رندر می‌کند.

«Show form» را بزنید و توجه کنید که فیلد دوم به‌طور خودکار فوکوس می‌شود. این به‌دلیل آن است که هر دو کامپوننت `<MyInput />` سعی می‌کنند فیلد داخل خود را فوکوس کنند. وقتی `focus()` را برای دو فیلد ورودی پشت سر هم فراخوانی می‌کنید، آخرین فیلد همیشه «می‌برد».

فرض کنید می‌خواهید فیلد اول را فوکوس کنید. کامپوننت اول `MyInput` حالا یک پراپ بولی `shouldFocus` دریافت می‌کند که روی `true` تنظیم شده. منطق را تغییر دهید تا `focus()` فقط فراخوانی شود اگر پراپ `shouldFocus` دریافت‌شده توسط `MyInput` برابر `true` باشد.

<Sandpack>

```js src/MyInput.js active
import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
  const ref = useRef(null);

  // TODO: call focus() only if shouldFocus is true.
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  const [upper, setUpper] = useState(false);
  const name = firstName + ' ' + lastName;
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} form</button>
      <br />
      <hr />
      {show && (
        <>
          <label>
            Enter your first name:
            <MyInput
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              shouldFocus={true}
            />
          </label>
          <label>
            Enter your last name:
            <MyInput
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              shouldFocus={false}
            />
          </label>
          <p>Hello, <b>{upper ? name.toUpperCase() : name}</b></p>
        </>
      )}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

برای تأیید راه‌حل خود، «Show form» و «Hide form» را مکرراً بزنید. وقتی فرم ظاهر می‌شود، فقط ورودی *اول* باید فوکوس شود. این به‌دلیل آن است که کامپوننت والد ورودی اول را با `shouldFocus={true}` و ورودی دوم را با `shouldFocus={false}` رندر می‌کند. همچنین بررسی کنید که هر دو ورودی هنوز کار می‌کنند و می‌توانید در هر دو تایپ کنید.

<Hint>

شما نمی‌توانید یک افکت را به‌صورت شرطی اعلام کنید، اما افکت شما می‌تواند شامل منطق شرطی باشد.

</Hint>

<Solution>

منطق شرطی را داخل افکت بگذارید. لازم است `shouldFocus` را به‌عنوان یک وابستگی مشخص کنید زیرا از آن داخل افکت استفاده می‌کنید. (این یعنی اگر `shouldFocus` برخی ورودی‌ها از `false` به `true` تغییر کند، بعد از مانت فوکوس خواهد شد.)

<Sandpack>

```js src/MyInput.js active
import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (shouldFocus) {
      ref.current.focus();
    }
  }, [shouldFocus]);

  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
    />
  );
}
```

```js src/App.js hidden
import { useState } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  const [upper, setUpper] = useState(false);
  const name = firstName + ' ' + lastName;
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} form</button>
      <br />
      <hr />
      {show && (
        <>
          <label>
            Enter your first name:
            <MyInput
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              shouldFocus={true}
            />
          </label>
          <label>
            Enter your last name:
            <MyInput
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              shouldFocus={false}
            />
          </label>
          <p>Hello, <b>{upper ? name.toUpperCase() : name}</b></p>
        </>
      )}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

</Solution>

#### رفع یک بازه که دو بار اجرا می‌شود {/*fix-an-interval-that-fires-twice*/}

این کامپوننت `Counter` یک شمارنده نمایش می‌دهد که باید هر ثانیه افزایش یابد. هنگام مانت، [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) را فراخوانی می‌کند. این باعث می‌شود `onTick` هر ثانیه اجرا شود. تابع `onTick` شمارنده را افزایش می‌دهد.

با این حال، به‌جای یک بار در ثانیه، دو بار افزایش می‌یابد. چرا؟ علت باگ را پیدا کنید و رفعش کنید.

<Hint>

در نظر داشته باشید که `setInterval` یک ID بازه برمی‌گرداند، که می‌توانید به [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) پاس دهید تا بازه را متوقف کنید.

</Hint>

<Sandpack>

```js src/Counter.js active
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
    }

    setInterval(onTick, 1000);
  }, []);

  return <h1>{count}</h1>;
}
```

```js src/App.js hidden
import { useState } from 'react';
import Counter from './Counter.js';

export default function Form() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} counter</button>
      <br />
      <hr />
      {show && <Counter />}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

<Solution>

وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) روشن است (مثل سندباکس‌های روی این سایت)، ری‌اکت هر کامپوننت را یک بار در محیط توسعه مجدداً مانت می‌کند. این باعث می‌شود بازه دو بار راه‌اندازی شود، و به همین دلیل است که هر ثانیه شمارنده دو بار افزایش می‌یابد.

با این حال، رفتار ری‌اکت *علت* باگ نیست: باگ از قبل در کد وجود دارد. رفتار ری‌اکت باگ را قابل‌توجه‌تر می‌کند. علت واقعی این است که این افکت یک فرآیند را شروع می‌کند اما راهی برای پاک‌سازی آن فراهم نمی‌کند.

برای رفع این کد، ID بازه برگردانده‌شده توسط `setInterval` را ذخیره کنید، و یک تابع پاک‌سازی با [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) پیاده‌سازی کنید:

<Sandpack>

```js src/Counter.js active
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
    }

    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}
```

```js src/App.js hidden
import { useState } from 'react';
import Counter from './Counter.js';

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Show'} counter</button>
      <br />
      <hr />
      {show && <Counter />}
    </>
  );
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

در محیط توسعه، ری‌اکت همچنان کامپوننت شما را یک بار مجدداً مانت می‌کند تا تأیید کند پاک‌سازی را به‌خوبی پیاده‌سازی کرده‌اید. پس یک فراخوانی `setInterval`، بلافاصله به‌دنبال آن `clearInterval`، و دوباره `setInterval` خواهد بود. در محیط تولید، فقط یک فراخوانی `setInterval` خواهد بود. رفتار قابل‌مشاهده برای کاربر در هر دو مورد یکسان است: شمارنده یک بار در ثانیه افزایش می‌یابد.

</Solution>

#### رفع واکشی داخل یک افکت {/*fix-fetching-inside-an-effect*/}

این کامپونندا بیوگرافی شخص انتخاب‌شده را نمایش می‌دهد. این بیوگرافی را با فراخوانی یک تابع ناهمگام `fetchBio(person)` هنگام مانت و هر بار که `person` تغییر می‌کند بارگذاری می‌کند. آن تابع ناهمگام یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) برمی‌گرداند که در نهایت به یک رشته resolve می‌شود. وقتی واکشی تمام می‌شود، `setBio` را فراخوانی می‌کند تا آن رشته را زیر جعبهٔ انتخاب نمایش دهد.

<Sandpack>

{/* not the most efficient, but this validation is enabled in the linter only, so it's fine to ignore it here since we know what we're doing */}
```js {expectedErrors: {'react-compiler': [9]}} src/App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    setBio(null);
    fetchBio(person).then(result => {
      setBio(result);
    });
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```

```js src/api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '’s bio.');
    }, delay);
  })
}

```

</Sandpack>


در این کد یک باگ وجود دارد. با انتخاب «Alice» شروع کنید. سپس «Bob» و سپس بلافاصله بعد از آن «Taylor» را انتخاب کنید. اگر به‌اندازه کافی سریع این کار را بکنید، باگ را متوجه خواهید شد: Taylor انتخاب شده، اما پاراگراف زیر می‌گوید «This is Bob's bio.»

چرا این اتفاق می‌افتد؟ باگ را داخل این افکت رفع کنید.

<Hint>

اگر یک افکت چیزی را به‌صورت ناهمگام واکشی می‌کند، عموماً به پاک‌سازی نیاز دارد.

</Hint>

<Solution>

برای تحریک باگ، چیزها باید به این ترتیب رخ دهند:

- انتخاب `'Bob'` باعث `fetchBio('Bob')` می‌شود
- انتخاب `'Taylor'` باعث `fetchBio('Taylor')` می‌شود
- **واکشی `'Taylor'` *قبل از* واکشی `'Bob'` کامل می‌شود**
- افکت از رندر `'Taylor'` فراخوانی `setBio('This is Taylor’s bio')` را انجام می‌دهد
- واکشی `'Bob'` کامل می‌شود
- افکت از رندر `'Bob'` فراخوانی `setBio('This is Bob’s bio')` را انجام می‌دهد

به همین دلیل است که باگ‌هایی مثل این [شرایط رقابتی](https://en.wikipedia.org/wiki/Race_condition) نامیده می‌شوند زیرا دو عملیات ناهمگام با هم «رقابت» می‌کنند، و ممکن است به ترتیب غیرمنتظره‌ای برسند.

برای رفع این شرط رقابتی، یک تابع پاک‌سازی اضافه کنید:

<Sandpack>

{/* not the most efficient, but this validation is enabled in the linter only, so it's fine to ignore it here since we know what we're doing */}
```js {expectedErrors: {'react-compiler': [9]}} src/App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```

```js src/api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '’s bio.');
    }, delay);
  })
}

```

</Sandpack>

افکت هر رندر متغیر `ignore` خودش را دارد. در ابتدا، متغیر `ignore` روی `false` تنظیم شده. با این حال، اگر یک افکت پاک‌سازی شود (مثل وقتی شخص متفاوتی انتخاب می‌کنید)، متغیر `ignore` آن `true` می‌شود. پس حالا مهم نیست درخواست‌ها به چه ترتیبی کامل می‌شوند. فقط افکت آخرین شخص `ignore` روی `false` خواهد داشت، پس `setBio(result)` را فراخوانی می‌کند. افکت‌های گذشته پاک‌سازی شده‌اند، پس بررسی `if (!ignore)` از فراخوانی `setBio` توسط آن‌ها جلوگیری می‌کند:

- انتخاب `'Bob'` باعث `fetchBio('Bob')` می‌شود
- انتخاب `'Taylor'` باعث `fetchBio('Taylor')` می‌شود **و افکت قبلی (Bob) را پاک‌سازی می‌کند**
- واکشی `'Taylor'` *قبل از* واکشی `'Bob'` کامل می‌شود
- افقت از رندر `'Taylor'` فراخوانی `setBio('This is Taylor’s bio')` را انجام می‌دهد
- واکشی `'Bob'` کامل می‌شود
- افقت از رندر `'Bob'` **کاری انجام نمی‌دهد زیرا پرچم `ignore` آن روی `true` تنظیم شده بود**

علاوه بر نادیده گرفتن نتیجهٔ یک فراخوانی API قدیمی، می‌توانید از [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) برای لغو درخواست‌هایی که دیگر لازم نیست استفاده کنید. با این حال، به‌خودی خود این برای محافظت در برابر شرایط رقابتی کافی نیست. ممکن است گام‌های ناهمگام بیشتری بعد از واکشی زنجیره شوند، پس استفاده از یک پرچم صریح مثل `ignore` مطمئن‌ترین راه برای رفع این نوع مسئله است.

</Solution>

</Challenges>
