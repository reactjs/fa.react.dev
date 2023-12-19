---
title: رندر و کامیت
---

<Intro>

قبل از اینکه اجزای شما در صفحه نمایش داده شوند، آنها باید توسط ری‌اکت رندر شوند. درک مراحل این فرآیند به شما کمک می‌کند تا درباره اجرای کد خود فکر کنید و رفتار آن را توضیح دهید.

</Intro>

<YouWillLearn>

* معنای رندر کردن در ری‌اکت
* زمان و دلیل رندر شدن یک کامپوننت در ری‌اکت
* مراحل درگیر در نمایش یک کامپوننت در صفحه نمایش
* دلیل اینکه رندر کردن همیشه به به‌روزرسانی دام
 منجر نمی‌شود

</YouWillLearn>

تصور کنید که اجزای شما مانند آشپزها در آشپزخانه هستند که از مواد اولیه غذاهای خوشمزه تدارک می‌بینند. در این سناریو، ری‌اکت همانقدر که پیشخدمت است که درخواست‌ها را از مشتریان می‌گیرد و سفارشاتشان را به آن‌ها می‌آورد. این فرآیند درخواست و ارائه رابط کاربری سه مرحله دارد:

1. **فراخوانی** یک رندر (رساندن سفارش مشتری به اشپزخانه)
2. **رندر کردن** کامپوننت (اماده کردن سفارش در اشپزخانه)
3. **رساندن** به دام (گذاشتن سفارش روی میز)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## قدم اول: فراخوانی یک رندر {/*step-1-trigger-a-render*/}

دو دلیل برای یک کامپوننت برای رندر هست:

1. است **رندر اولیه**
2. کامپوننت  (یا یکی از نیاکان آن) **حالت اپدیت شده است**

### رندر اولیه {/*initial-render*/}

هنگامی که برنامه‌ی شما شروع به اجرا می‌شود، شما باید فرآیند رندر اولیه را آغاز کنید. گاهی اوقات چارچوب‌ها و محیط‌های ماسباکس این کد را پنهان می‌کنند، اما این کار با فراخوانی [`createRoot`](/reference/react-dom/client/createRoot) با گره DOM هدف انجام می‌شود، سپس با فراخوانی متد `render` آن با کامپوننت شما:

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

سعی کنید کد فراخوانی root.render() را کامنت کنید و ببینید که چگونه کامپوننت ناپدید میشود!

### دوباره رندر شدن زمانی که حالت تغییر می‌کند {/*re-renders-when-state-updates*/}

پس از اینکه کامپوننت ابتدایی رندر شده است، می‌توانید با به‌روزرسانی وضعیت آن با استفاده از [تابع `set`](/reference/react/useState#setstate) رندرهای بیشتری را فراخوانی کنید. به‌روزرسانی وضعیت کامپوننت شما به‌صورت خودکار یک رندر را در صف قرار می‌دهد. (می‌توانید این را تصور کنید که یک مشتری رستوران پس از سفارش اول، به تبلیغ چای، دسر و انواع دیگر از چیزها علاقه دارد، به تبع وضعیت تشنگی یا گرسنگی خود.)


<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

##  قدم دوم: ری‌اکت کامپوننت شما را دوباره رندر میکند {/*step-2-react-renders-your-components*/}

پس از اینکه یک رندر فراخوانی می‌شود، ری‌اکت کامپوننت‌های شما را فراخوانی می‌کند تا بفهمد چه چیزی باید در صفحه نمایش داده شود. **"رندر کردن" به معنای فراخوانی React از کامپوننت‌های شما است.**

* **در رندر اولیه،** ری‌اکت کامپوننت ریشه را فراخوانی می‌کند.
* **برای رندرهای بعدی،** ری‌اکت تابع کامپوننت را فراخوانی می‌کند که به‌روزرسانی وضعیت آن رندر را آغاز کرده است.

این فرآیند بازگشتی است: اگر کامپوننت به‌روزرسانی‌شده کامپوننت دیگری را برگرداند، ری‌اکت بعدی را رندر می‌کند و اگر آن کامپوننت هم چیزی برگرداند، بعدی را رندر می‌کند و به همین ترتیب. این فرآیند ادامه پیدا می‌کند تا زمانی که کامپوننت‌های تو در تو بیشتری وجود نداشته باشند و ری‌اکت دقیقاً بداند چه چیزی باید در صفحه نمایش داده شود.

در مثال زیر، ری‌اکت چند بار `Gallery()` و `Image()` را فراخوانی می‌کند:


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

* **در رندر اولیه،** ری‌اکت [گره‌های DOM](https://developer.mozilla.org/docs/Web/API/Document/createElement) برای `<section>`، `<h1>` و سه تگ `<img>` ایجاد می‌کند.
* **در یک رندر مجدد،** ری‌اکت محاسبه می‌کند که ویژگی‌های آن‌ها، اگر هرکدام تغییر کرده باشد، از زمان رندر قبلی چه تغییراتی کرده‌اند. این اطلاعات را تا مرحلهٔ بعد، یعنی مرحلهٔ commit، استفاده نخواهد کرد.

<Pitfall>

رندر کردن همیشه باید یک [محاسبه خالص](/learn/keeping-components-pure) باشد:

* **ورودی‌های یکسان، خروجی یکسان.** با دادن ورودی‌های یکسان، یک کامپوننت همیشه باید به همان JSX بازگردد. (وقتی کسی یک سالاد با گوجه می‌سفارش دهد، نباید یک سالاد با پیاز دریافت کند!)
* **به کار خود توجه می‌کند.** نباید هیچ‌گونه تغییری در اشیاء یا متغیرهایی که قبل از رندر وجود داشته‌اند، ایجاد کند. (یک سفارش نباید سفارش دیگری را تغییر دهد.)

در غیر این صورت، ممکن است با مشکلات گیج‌کننده و رفتارهای پیش‌بینی‌ناپذیر در حالی که کد شما پیچیده می‌شود، روبرو شوید. هنگام توسعه در "حالت دقیق"، ری‌اکت هر تابع کامپوننت را دو بار فراخوانی می‌کند که می‌تواند به کشف اشتباهات ناشی از توابع ناخالص کمک کند.

</Pitfall>

<DeepDive>

#### بهینه‌سازی عملکرد {/*optimizing-performance*/}

رفتار پیش‌فرض که همه کامپوننت‌های تو در تو درون کامپوننت به‌روزرسانی‌شده را رندر می‌کند، اگر کامپوننت به‌روزرسانی‌شده در ارتفاع درخت بسیار بالا باشد، به لحاظ عملکرد بهینه نیست. اگر به یک مشکل عملکرد برخورد کردید، چندین راه برای حل آن در بخش [عملکرد](https://reactjs.org/docs/optimizing-performance.html) توصیف شده‌اند. **پیش بهینه‌سازی نکنید تا زمانی که ضروری نشده باشد!**

</DeepDive>

##  قدم سوم: ری‌اکت تغییرات را در دام اعمال می‌کند {/*step-3-react-commits-changes-to-the-dom*/}

پس از رندر (فراخوانی) کامپوننت‌های شما، ری اکت DOM را تغییر می‌دهد.

* **برای رندر اولیه،** ری اکت از API DOM [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) برای قرار دادن تمام گره‌های DOMی که ایجاد کرده است روی صفحه نمایش استفاده می‌کند.
* **برای رندرهای مجدد،** ری اکت عملیات ضروری حداقل را (هنگام رندر!) اجرا می‌کند تا DOM با آخرین خروجی رندرینگ هماهنگ شود.

**React تنها زمانی گره‌های DOM را تغییر می‌دهد که تفاوتی بین رندرها وجود داشته باشد.** به عنوان مثال، در زیر یک کامپوننت است که هر ثانیه با ویژگی‌های مختلف از والدینش دوباره رندر می‌شود. توجه کنید چگونه می‌توانید متنی را به `<input>` اضافه کنید و مقدار آن را به‌روزرسانی کنید، اما متن وقتی که کامپوننت دوباره رندر می‌شود ناپدید نمی‌شود:

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

این کار به این دلیل کار می‌کند که در این مرحله آخر، React تنها محتوای `<h1>` را با `time` جدید به‌روزرسانی می‌کند. این می‌بیند که `<input>` در JSX در همان مکانی که قبلاً بوده است ظاهر شده است، بنابراین React به `<input>` - یا `value` آن - دست نمی‌زند!

## ختام: نقاشی مرورگر {/*epilogue-browser-paint*/}

پس از انجام رندر و به‌روزرسانی DOM توسط React، مرورگر صفحه نمایش را نقاشی می‌کند. اگرچه این فرآیند به نام "رندر مرورگر" شناخته می‌شود، ما در این مستندات به آن "نقاشی" می‌گوییم تا از ابهام جلوگیری شود.

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* هر به‌روزرسانی صفحه در یک اپلیکیشن React در سه مرحله انجام می‌شود:
  1. فعال کردن
  2. رندر
  3. Commit
* می‌توانید از حالت دقیق استفاده کنید تا اشتباهات در کامپوننت‌های خود را پیدا کنید.
* اگر نتیجه رندرینگ همانند زمان گذشته باشد، React به DOM دست نمی‌زند.

</Recap>

