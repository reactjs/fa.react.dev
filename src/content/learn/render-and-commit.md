---
title: Render and Commit
---

<Intro>
قبل از اینکه اجزای شما روی صفحه نمایش نمایش داده شوند، باید توسط ری ‌‌اکت رندر شوند. درک مراحل این فرآیند به شما کمک خواهد کرد تا در مورد اجرای کد  فکر کنید و رفتار آن را توضیح دهید.
</Intro>

<YouWillLearn>

* رندرینگ در ری اکت چیست؟
*چه زمانی و چرا ری‌اکت یک کامپوننت را راندر میکند؟
*گامهایی که در نشان دادن یک کامپوننت روی صفحه برداشته می‌شوند
*چرا رندرینگ همیشه باعث تغییر در دام نمیشود (دامین ابجکت مدل)

</YouWillLearn>
<p dir="rtl">
تصور کنید که کامپوننت‌های شما در اشپزخانه پخته می‌شوند٬ مثل ساختن بشقاب‌های غذای خوشمزه از مواد اولیه.
در این سناریو ری‌اکت مثل یک گارسون است که درخواست مشتریان را تحویل می‌دهد و غذا آنها را تحویلشان می‌دهد.این فرآیند درخواست دادن و ارائه به یوآی سه مرحله دارد:

1. **Triggering** a render (رساندن سفارش مشتری به اشپزخانه)
2. **Rendering** the component (ساختن سفارش در اشپزخانه)
3. **Committing** to the DOM (گذاشتن سفارش روی میز مشتری)
</p>

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## Step 1: Trigger a render {/*step-1-trigger-a-render*/}

دو دلیل برای کامپوننت وجود دارد تا رندر شود:
1. It's the component's **initial render.**
2. The component's (or one of its ancestors') **state has been updated.**
۱-رندر اولیه ی کامپوننت
۲-استیت خود کامپوننت یا یکی از والدینش اپدیت شده است
### Initial render {/*initial-render*/}

زمانی که برنامه‌ی شما شروع می‌شود، باید اقدام به اجرای اولیه کنید. گاهی اوقات چارچوب‌ها و محیط‌های مجازی این کد را مخفی می‌کنند، اما این کار با فراخوانی [`createRoot`](/reference/react-dom/client/createRoot) باگرفتن گره DOM مورد نظر انجام می‌شود و سپس با فراخوانی متد `render` آن با کامپوننت شما:
<Sandpack>

```js index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

</Sandpack>

سعی کنید فراخوانی `root.render()` را کامنت کنید و مشاهده کنید که کامپوننت ناپدید می‌شود!
### Re-renders when state updates {/*re-renders-when-state-updates*/}

پس از اینکه کامپوننت ابتدا رندر شده باشد، می‌توانید با به روزرسانی وضعیت آن با استفاده از [تابع `set`](/reference/react/useState#setstate) رندرهای بیشتری را فراخوانی کنید. به‌روزرسانی وضعیت کامپوننت شما به طور خودکار یک رندر را در صف قرار می‌دهد. (می‌توانید این را تصور کنید که یک میهمان در یک رستوران پس از دادن سفارش اولیه‌اش، به ترتیب بر اساس وضعیت تشنگی یا گرسنگی خود، چای، دسر و انواع چیزهای دیگری سفارش می‌دهد.)
<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## Step 2: React renders your components {/*step-2-react-renders-your-components*/}
<p dir="rtl">
بعد از اجرای یک رندر، React اجزای شما را فراخوانی می‌کند تا بفهمد چه چیزی را در صفحه نمایش نشان دهد. **"رندر کردن" به معنای فراخوانی اجزای شما توسط React است.**

- **در رندر اولیه،** React اجزای ریشه (root) را فراخوانی خواهد کرد.
- **برای رندرهای بعدی،** React تابع کامپوننتی را که به روزرسانی وضعیت آن رندر را فراخوانی کرده است، فراخوانی می‌کند.

این فرآیند بازگشتی است: اگر کامپوننت به‌روزرسانی شده، کامپوننت دیگری را برگرداند، React بعدی را نیز رندر خواهد کرد، و اگر آن کامپوننت نیز چیزی را برگرداند، کامپوننت بعدی را رندر می‌کند و این عملیات تا زمانی ادامه دارد که کامپوننت‌های تو در تو دیگری نباشند و React دقیقاً بداند چه چیزی باید در صفحه نمایش نمایش داده شود.
</p>
<Sandpack>

```js Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```js index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>
<p drl='rtl'>

* **در زمان رندر اولیه،** React [عناصر DOM](https://developer.mozilla.org/docs/Web/API/Document/createElement) مربوط به `<section>`، `<h1>` و سه تگ `<img>` را ایجاد خواهد کرد.
* **در زمان رندر مجدد،** React ویژگی‌هایی از این عناصر را که از رندر قبلی تغییر کرده‌اند را محاسبه خواهد کرد. اما تا مرحله بعدی، یعنی مرحله commit، هیچ کاری با این اطلاعات انجام نخواهد داد.
</p>
<Pitfall>

رندر همیشه باید یک تابع خالص باشد [pure calculation](/learn/keeping-components-pure):
<p drl='rtl'>

* **ورودی‌ها یکسان، خروجی یکسان.** با توجه به ورودی‌های یکسان، یک کامپوننت همیشه باید JSX یکسانی را بازگرداند. (وقتی کسی یک سالاد با گوجه سفارش می‌دهد، نباید یک سالاد با پیاز دریافت کند!)
* **کامپوننت به کار خود ادامه می‌دهد.** آن باید هیچ شیء یا متغیری که قبل از رندر وجود داشته است را تغییر ندهد. (یک سفارش نباید سفارش دیگری را تغییر دهد.)
در غیر این صورت، ممکن است با مشکلات گیج‌کننده و رفتارهای پیش‌بینی‌نشده مواجه شوید هنگامی که کد شما به پیچیدگی رشد می‌کند. در هنگام توسعه در "حالت دقیق" (Strict Mode)، React تابع هر کامپوننت را دو بار فراخوانی می‌کند که می‌تواند به شناسایی اشتباهات ناشی از توابع ناخالص کمک کند.

</p>
</Pitfall>

<DeepDive>

#### Optimizing performance {/*optimizing-performance*/}
<p drl='rtl'>

رفتار پیش‌فرض که تمام کامپوننت‌ها درون کامپوننت به‌روز‌شده را رندر می‌کند، اگر کامپوننت به‌روز‌شده در درخت بسیار بالا باشد، برای بهینه‌سازی عملکرد مناسب نیست. اگر با مشکل عملکردی روبه‌رو شدید، چند رویکرد اختیاری برای حل آن در بخش [عملکرد](https://reactjs.org/docs/optimizing-performance.html) توصیف شده است. **پیش‌بینی نکنید وقتی بهینه‌سازی کنید!**

</p>

</DeepDive>

## Step 3: React commits changes to the DOM {/*step-3-react-commits-changes-to-the-dom*/}
<p drl='rtl'>

بعد از رندر (فراخوانی) کامپوننت‌های شما، React DOM را تغییر می‌دهد.

* **برای رندر اولیه،** React از API DOM [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) برای نمایش تمام عناصر DOMی استفاده می‌کند که ایجاد کرده است.
* **برای رندرهای مجدد،** React عملیات حداقلی لازم (محاسبه شده در هنگام رندر!) را اعمال می‌کند تا DOM با آخرین خروجی رندرینگ هماهنگ شود.

**React تنها زمانی DOM را تغییر می‌دهد که تفاوتی بین رندرها وجود داشته باشد.** به عنوان مثال، در اینجا یک کامپوننت است که با ویژگی‌های مختلفی که از والدینش منتقل می‌شود، هر ثانیه یک بار مجدداً رندر می‌شود. توجه کنید که می‌توانید متنی را به داخل `<input>` اضافه کنید و مقدار آن را به‌روز کنید، اما متن هنگام رندر مجدد کامپوننت ناپدید نمی‌شود:

</p>


<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
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
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>
<p drl='rtl'>

این کار به خاطر آن است که در این مرحله آخر، React تنها محتوای `<h1>` را با `time` جدید به‌روز می‌کند. این می‌بیند که `<input>` در JSX در همان مکانی ظاهر می‌شود که در دفعه گذشته بوده است، بنابراین React `<input>` - یا `value` آن را - تغییر نمی‌دهد!

</p>

## Epilogue: Browser paint {/*epilogue-browser-paint*/}

<p drl='rtl'>

بعد از اتمام عملیات رندر و به‌روزرسانی DOM توسط React، مرورگر صفحه را بازنقاشی می‌کند. اگرچه این فرآیند به نام "رندر مرورگر" شناخته می‌شود، ما در این مستندات به آن "پینت کردن" اشاره می‌کنیم تا ابهامی را که در طول مستندات ممکن است پیش آید، از بین ببریم.

</p>

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* هر به‌روزرسانی صفحه در یک اپلیکیشن React در سه مرحله انجام می‌شود:
  ۱. تریگر (Trigger)
  ۲. رندر (Render)
  ۳. اعمال (Commit)
* می‌توانید از حالت دقیق (Strict Mode) برای یافتن اشتباهات در کامپوننت‌های خود استفاده کنید.
* React اگر نتیجه رندرینگ مشابه زمان گذشته باشد، DOM را تغییر نمی‌دهد.


</Recap>

