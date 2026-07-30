---
title: رندر و کامیت
---

<Intro>

پیش از آنکه کامپوننت‌های شما روی صفحه نمایش داده شوند، باید توسط ری‌اکت رندر شوند. درک مراحل این فرایند به شما کمک می‌کند درباره‌ی نحوه‌ی اجرای کدتان فکر کنید و رفتار آن را توضیح دهید.

</Intro>

<YouWillLearn>

* رندر در ری‌اکت به چه معناست
* چه زمان و چرا ری‌اکت یک کامپوننت را رندر می‌کند
* مراحل درگیر در نمایش یک کامپوننت روی صفحه
* چرا رندر همیشه به‌روزرسانی DOM تولید نمی‌کند

</YouWillLearn>

تصور کنید کامپوننت‌های شما آشپزهایی در آشپزخانه هستند که با مواد اولیه غذاهای خوشمزه درست می‌کنند. در این سناریو، ری‌اکت گارسونی است که سفارش‌ها را از مشتریان دریافت و سفارش‌هایشان را برایشان می‌آورد. این فرایند درخواست و سرو کردن رابط کاربری شامل سه گام است:

1. **راه‌اندازی (Trigger)** یک رندر (تحویل دادن سفارش مهمان به آشپزخانه)
2. **رندر کردن** کامپوننت (آماده‌سازی سفارش در آشپزخانه)
3. **کامیت کردن** به DOM (قرار دادن سفارش روی میز)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## گام ۱: راه‌اندازی یک رندر {/*step-1-trigger-a-render*/}

دو دلیل برای رندر شدن یک کامپوننت وجود دارد:

1. این **رندر اولیه‌ی** کامپوننت است.
2. **استیت** کامپوننت (یا یکی از اجدادش) به‌روزرسانی شده است.

### رندر اولیه {/*initial-render*/}

هنگامی که اپلیکیشن شما شروع می‌شود، باید رندر اولیه را راه‌اندازی کنید. فریم‌ورک‌ها و سندباکس‌ها گاهی این کد را پنهان می‌کنند، اما این کار با فراخوانی [`createRoot`](/reference/react-dom/client/createRoot) با گره DOM هدف، و سپس فراخوانی متد `render` آن با کامپوننتتان انجام می‌شود:

<Sandpack>

```js src/index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js src/Image.js
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

فراخوانی `root.render()` را توضیح (comment) کنید و ببینید کامپوننت ناپدید می‌شود!

### رندرهای مجدد هنگام به‌روزرسانی استیت {/*re-renders-when-state-updates*/}

پس از آنکه کامپوننت ابتدا رندر شد، می‌توانید با به‌روزرسانی استیت آن با [تابع `set`](/reference/react/useState#setstate) رندرهای بیشتری را راه‌اندازی کنید. به‌روزرسانی استیت کامپوننت شما به‌طور خودکار یک رندر را در صف قرار می‌دهد. (می‌توانید این‌ها را به‌عنوان یک مهمان رستوران تصور کنید که پس از ثبت اولین سفارش، بسته به میزان تش یا گرسنگی، چای، دسر و انواع چیزهای دیگر سفارش می‌دهد.)

<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. The patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## گام ۲: ری‌اکت کامپوننت‌های شما را رندر می‌کند {/*step-2-react-renders-your-components*/}

پس از راه‌اندازی یک رندر، ری‌اکت کامپوننت‌های شما را فراخوانی می‌کند تا بفهمد چه چیزی روی صفحه نمایش داده شود. **«رندر کردن» یعنی ری‌اکت کامپوننت‌های شما را فراخوانی می‌کند.**

* **در رندر اولیه،** ری‌اکت کامپوننت ریشه را فراخوانی می‌کند.
* **در رندرهای بعدی،** ری‌اکت کامپوننت تابعی که به‌روزرسانی استیتش رندر را راه‌اندازی کرده فراخوانی می‌کند.

این فرایند بازگشتی است: اگر کامپوننت به‌روزرسانی‌شده کامپوننت دیگری را برگرداند، ری‌اکت در مرحله‌ی بعد _آن_ کامپوننت را رندر می‌کند، و اگر آن کامپوننت نیز چیزی برگرداند، در مرحله‌ی بعد _آن_ کامپوننت را رندر می‌کند، و الی آخر. این فرایند تا زمانی که کامپوننت‌های تودرتوی بیشتری نباشد ادامه می‌یابد و ری‌اکت دقیقاً می‌داند چه چیزی باید روی صفحه نمایش داده شود.

در مثال زیر، ری‌اکت `Gallery()` و `Image()` را چندین بار فراخوانی می‌کند:

<Sandpack>

```js src/Gallery.js active
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

```js src/index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **در طول رندر اولیه،** ری‌اکت [گره‌های DOM را می‌سازد](https://developer.mozilla.org/docs/Web/API/Document/createElement) برای `<section>`، `<h1>` و سه تگ `<img>`.
* **در طول یک رندر مجدد،** ری‌اکت محاسبه می‌کند کدام‌یک از پراپرتی‌هایشان، در صورت وجود، از رندر قبلی تغییر کرده‌اند. این کار تا گام بعدی، یعنی مرحله‌ی کامیت، با این اطلاعات کاری انجام نمی‌دهد.

<Pitfall>

رندر باید همیشه یک [محاسبه‌ی خالص](/learn/keeping-components-pure) باشد:

* **ورودی یکسان، خروجی یکسان.** با ورودی‌های یکسان، یک کامپوننت باید همیشه همان JSX را برگرداند. (وقتی کسی سالاد با گوجه‌فرنگی سفارش می‌دهد، نباید سالاد با پیاز دریافت کند!)
* **فقط به کار خودش می‌پردازد.** نباید هیچ شیء یا متغیری را که پیش از رندر وجود داشته تغییر دهد. (یک سفارش نباید سفارش هیچ‌کس دیگری را تغییر دهد.)

در غیر این صورت، ممکن است با رشد پیچیدگی کدبیس با باگ‌های گیج‌کننده و رفتار غیرقابل‌پیش‌بینی مواجه شوید. هنگام توسعه در «حالت سخت‌گیرانه (Strict Mode)»، ری‌اکت تابع هر کامپوننت را دو بار فراخوانی می‌کند، که می‌تواند به آشکار کردن اشتباهات ناشی از توابع ناخالص کمک کند.

</Pitfall>

<DeepDive>

#### بهینه‌سازی عملکرد {/*optimizing-performance*/}

رفتار پیش‌فرض رندر کردن همه‌ی کامپوننت‌های تودرتو درون کامپوننت به‌روزرسانی‌شده، اگر کامپوننت به‌روزرسانی‌شده خیلی بالاتر در درخت باشد، برای عملکرد بهینه نیست. اگر با مشکل عملکردی مواجه شدید، چند راه اختیاری برای حل آن در بخش [عملکرد](https://reactjs.org/docs/optimizing-performance.html) توضیح داده شده است. **زودتر از موعد بهینه‌سازی نکنید!**

</DeepDive>

## گام ۳: ری‌اکت تغییرات را به DOM کامیت می‌کند {/*step-3-react-commits-changes-to-the-dom*/}

پس از رندر کردن (فراخوانی) کامپوننت‌های شما، ری‌اکت DOM را تغییر می‌دهد.

* **برای رندر اولیه،** ری‌اکت از API DOM [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) استفاده می‌کند تا همه‌ی گره‌های DOM که ساخته روی صفحه قرار دهد.
* **برای رندرهای مجدد،** ری‌اکت حداقل عملیات‌های لازم (که هنگام رندر محاسبه شده‌اند!) را اعمال می‌کند تا DOM را با آخرین خروجی رندر هماهنگ کند.

**ری‌اکت فقط در صورتی گره‌های DOM را تغییر می‌دهد که تفاوتی بین رندرها وجود داشته باشد.** برای مثال، در اینجا کامپوننتی آمده که هر ثانیه با پراپس متفاوتی از سمت والدش رندر مجدد می‌شود. توجه کنید که می‌توانید مقداری متن داخل `<input>` وارد کنید، یعنی `value` آن را به‌روز کنید، اما هنگام رندر مجدد کامپوننت متن ناپدید نمی‌شود:

<Sandpack>

```js src/Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
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
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

این کار می‌کند چون در این آخرین گام، ری‌اکت فقط محتوای `<h1>` را با `time` جدید به‌روزرسانی می‌کند. می‌بیند که `<input>` در همان جایی که دفعه‌ی قبل در JSX ظاهر می‌شود، پس ری‌اکت به `<input>`—یا `value` آن—دست نمی‌زند!
## پایان‌بافت: رنگ‌آمیزی مرورگر {/*epilogue-browser-paint*/}

پس از پایان رندر و به‌روزرسانی DOM توسط ری‌اکت، مرورگر صفحه را دوباره رنگ‌آمیزی می‌کند. اگرچه این فرایند به‌عنوان «رندر مرورگر» شناخته می‌شود، ما در طول مستندات برای جلوگیری از سردرگمی به آن «رنگ‌آمیزی» می‌گوییم.

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* هر به‌روزرسانی صفحه در یک اپلیکیشن ری‌اکت در سه گام انجام می‌شود:
  1. راه‌اندازی (Trigger)
  2. رندر (Render)
  3. کامیت (Commit)
* می‌توانید از حالت سخت‌گیرانه (Strict Mode) برای یافتن اشتباهات در کامپوننت‌های خود استفاده کنید
* ری‌اکت در صورتی که نتیجه‌ی رندر با دفعه‌ی قبل یکسان باشد به DOM دست نمی‌زند

</Recap>

