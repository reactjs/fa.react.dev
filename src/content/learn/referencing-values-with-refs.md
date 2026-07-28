---
title: 'ارجاع به مقادیر با رفرنس'
---

<Intro>

وقتی می‌خواهید یک کامپوننت چیزی را «یادآوری» کند، اما نمی‌خواهید آن اطلاعات [رندرهای جدیدی را راه‌اندازی کند](/learn/render-and-commit)، می‌توانید از یک *رفرنس* استفاده کنید.

</Intro>

<YouWillLearn>

- چگونه یک رفرنس به کامپوننت خود اضافه کنید
- چگونه مقدار یک رفرنس را به‌روزرسانی کنید
- رفرنس‌ها چه تفاوتی با استیت دارند
- چگونه از رفرنس‌ها به‌صورت ایمن استفاده کنید

</YouWillLearn>

## افزودن یک رفرنس به کامپوننت خود {/*adding-a-ref-to-your-component*/}

شما می‌توانید با ایمپورت کردن هوک `useRef` از ری‌اکت، یک رفرنس به کامپوننت خود اضافه کنید:

```js
import { useRef } from 'react';
```

داخل کامپوننت، هوک `useRef` را فراخوانی کنید و مقدار اولیه‌ای که می‌خواهید به آن ارجاع دهید را به‌عنوان تنها آرگومان ارسال کنید. برای مثال، در اینجا یک رفرنس به مقدار `0` آمده است:

```js
const ref = useRef(0);
```

`useRef` یک شیء مانند زیر برمی‌گرداند:

```js
{ 
  current: 0 // The value you passed to useRef
}
```

<Illustration src="/images/docs/illustrations/i_ref.png" alt="An arrow with 'current' written on it stuffed into a pocket with 'ref' written on it." />

شما می‌توانید به مقدار فعلی آن رفرنس از طریق پراپرتی `ref.current` دسترسی داشته باشید. این مقدار عمداً قابل‌تغییر است، یعنی می‌توانید هم آن را بخوانید و هم در آن بنویسید. این مانند یک جیب مخفی در کامپوننت شماست که ری‌اکت آن را پیگیری نمی‌کند. (همین امر باعث می‌شود که رفرنس یک «دریچهٔ فرار» از جریان دادهٔ یک‌طرفهٔ ری‌اکت باشد — بیشتر دربارهٔ این در ادامه!)

در اینجا، یک دکمه در هر کلیک `ref.current` را افزایش می‌دهد:

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

</Sandpack>

رفرنس به یک عدد اشاره می‌کند، اما مانند [استیت](/learn/state-a-components-memory) می‌تواند به هر چیزی اشاره کند: یک رشته، یک شیء، یا حتی یک تابع. برخلاف استیت، رفرنس یک شیء سادهٔ جاوااسکریپت با پراپرتی `current` است که می‌توانید آن را بخوانید و تغییر دهید.

توجه داشته باشید که **کامپوننت با هر افزایش، مجدداً رندر نمی‌شود.** مانند استیت، رفرنس‌ها توسط ری‌اکت بین رندرهای مجدد حفظ می‌شوند. با این حال، تنظیم استیت یک کامپوننت را مجدداً رندر می‌کند. تغییر دادن یک رفرنس، این کار را نمی‌کند!

## مثال: ساخت یک کرونومتر {/*example-building-a-stopwatch*/}

شما می‌توانید رفرنس‌ها و استیت را در یک کامپوننت واحد ترکیب کنید. برای مثال، بیایید یک کرونومتر بسازیم که کاربر بتواند با فشردن یک دکمه آن را آغاز یا متوقف کند. برای نمایش اینکه از زمان فشردن «شروع» توسط کاربر چقدر گذشته است، باید پیگیری کنید که چه زمانی دکمهٔ شروع فشرده شده و زمان فعلی چیست. **این اطلاعات برای رندر استفاده می‌شوند، بنابراین آنها را در استیت نگه می‌دارید:**

```js
const [startTime, setStartTime] = useState(null);
const [now, setNow] = useState(null);
```

وقتی کاربر «شروع» را فشار می‌دهد، از [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval) برای به‌روزرسانی زمان هر ۱۰ میلی‌ثانیه استفاده خواهید کرد:

<Sandpack>

```js
import { useState } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
    </>
  );
}
```

</Sandpack>

وقتی دکمهٔ «توقف» فشرده می‌شود، باید interval موجود را لغو کنید تا متوقف شدن به‌روزرسانی متغیر استیت `now` را متوقف کند. می‌توانید این کار را با فراخوانی [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) انجام دهید، اما باید شناسهٔ interval که قبلاً توسط فراخوانی `setInterval` هنگام فشردن «شروع» بازگردانده شده را به آن بدهید. باید شناسهٔ interval را در جایی نگه دارید. **از آنجا که شناسهٔ interval برای رندر استفاده نمی‌شود، می‌توانید آن را در یک رفرنس نگه دارید:**

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
```

</Sandpack>

وقتی یک اطلاعات برای رندر استفاده می‌شود، آن را در استیت نگه دارید. وقتی یک اطلاعات فقط توسط مدیرکننده‌های رویداد لازم است و تغییر دادن آن نیازی به رندر مجدد ندارد، استفاده از رفرنس ممکن است کارآمدتر باشد.

## تفاوت‌های بین رفرنس و استیت {/*differences-between-refs-and-state*/}

شاید فکر کنید رفرنس‌ها کمتر از استیت «سخت‌گیرانه» به نظر می‌رسند — برای مثال، می‌توانید آنها را مستقیماً تغییر دهید به جای اینکه همیشه از یک تابع تنظیم‌کنندهٔ استیت استفاده کنید. اما در بیشتر موارد، می‌خواهید از استیت استفاده کنید. رفرنس‌ها یک «دریچهٔ فرار» هستند که اغلب به آن نیاز نخواهید داشت. در اینجا مقایسه‌ای بین استیت و رفرنس آورده شده است:

| رفرنس‌ها                                                                              | استیت                                                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `useRef(initialValue)` برمی‌گرداند `{ current: initialValue }`                            | `useState(initialValue)` مقدار فعلی متغیر استیت و یک تابع تنظیم‌کنندهٔ استیت را برمی‌گرداند ( `[value, setValue]`) |
| وقتی آن را تغییر می‌دهید، رندر مجدد راه‌اندازی نمی‌کند.                                         | وقتی آن را تغییر می‌دهید، رندر مجدد راه‌اندازی می‌کند.                                                                                    |
| قابل‌تغییر — می‌توانید مقدار `current` را خارج از فرایند رندر تغییر دهید و به‌روزرسانی کنید. | «غیرقابل‌تغییر» — باید از تابع تنظیم‌کنندهٔ استیت برای تغییر متغیرهای استیت و قراردادن یک رندر مجدد در صف استفاده کنید.                       |
| نباید مقدار `current` را در حین رندر بخوانید (یا بنویسید). | می‌توانید استیت را در هر زمانی بخوانید. با این حال، هر رندر [عکس فوری](/learn/state-as-a-snapshot) خود را از استیت دارد که تغییر نمی‌کند. |

در اینجا یک دکمهٔ شمارنده آورده شده که با استیت پیاده‌سازی شده است:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You clicked {count} times
    </button>
  );
}
```

</Sandpack>

چون مقدار `count` نمایش داده می‌شود، استفاده از یک مقدار استیت برای آن منطقی است. وقتی مقدار شمارنده با `setCount()` تنظیم می‌شود، ری‌اکت کامپوننت را مجدداً رندر می‌کند و صفحه برای انعکاس شمارش جدید به‌روزرسانی می‌شود.

اگر سعی می‌کردید این را با یک رفرنس پیاده‌سازی کنید، ری‌اکت هرگز کامپوننت را مجدداً رندر نمی‌کرد، بنابراین هرگز تغییر شمارنده را نمی‌دیدید! ببینید چگونه کلیک روی این دکمه **متن آن را به‌روزرسانی نمی‌کند**:

<Sandpack>

```js {expectedErrors: {'react-compiler': [13]}}
import { useRef } from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // This doesn't re-render the component!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick={handleClick}>
      You clicked {countRef.current} times
    </button>
  );
}
```

</Sandpack>

به همین دلیل خواندن `ref.current` در حین رندر به کد غیرقابل‌اعتماد منجر می‌شود. اگر به این نیاز دارید، به جای آن از استیت استفاده کنید.

<DeepDive>

#### useRef در داخل چگونه کار می‌کند؟ {/*how-does-use-ref-work-inside*/}

اگرچه هم `useState` و هم `useRef` توسط ری‌اکت ارائه شده‌اند، در اصل `useRef` می‌تواند _بر روی_ `useState` پیاده‌سازی شود. می‌توانید تصور کنید که در داخل ری‌اکت، `useRef` به این شکل پیاده‌سازی شده است:

```js
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

در طول رندر اول، `useRef` برمی‌گرداند `{ current: initialValue }`. این شیء توسط ری‌اکت ذخیره می‌شود، بنابراین در رندر بعدی همان شیء بازگردانده می‌شود. توجه کنید که تنظیم‌کنندهٔ استیت در این مثال استفاده نشده است. این کار غیرضروری است زیرا `useRef` همیشه باید همان شیء را بازگرداند!

ری‌اکت یک نسخهٔ داخلی از `useRef` ارائه می‌کند زیرا در عمل به اندازهٔ کافی رایج است. اما می‌توانید آن را مانند یک متغیر استیت معمولی بدون تنظیم‌کننده در نظر بگیرید. اگر با برنامه‌نویسی شیءگرا آشنا هستید، ممکن است رفرنس‌ها شما را به یاد فیلدهای نمونه (instance fields) بیندازند — اما به جای `this.something` می‌نویسید `somethingRef.current`.

</DeepDive>

## چه زمانی از رفرنس‌ها استفاده کنیم {/*when-to-use-refs*/}

معمولاً، وقتی کامپوننت شما نیاز دارد که از ری‌اکت «بیرون برود» و با APIهای خارجی ارتباط برقرار کند — اغلب یک API مرورگر که بر ظاهر کامپوننت تأثیر نمی‌گذارد — از یک رفرنس استفاده خواهید کرد. در اینجا چند مورد از این موقعیت‌های نادر آورده شده است:

- ذخیرهٔ [شناسه‌های timeout](https://developer.mozilla.org/docs/Web/API/setTimeout)
- ذخیره و دستکاری [عناصر DOM](https://developer.mozilla.org/docs/Web/API/Element)، که در [صفحهٔ بعد](/learn/manipulating-the-dom-with-refs) پوشش داده شده است
- ذخیرهٔ سایر اشیایی که برای محاسبهٔ JSX ضروری نیستند.

اگر کامپوننت شما باید مقداری را ذخیره کند، اما بر منطق رندر تأثیر نمی‌گذارد، رفرنس را انتخاب کنید.

## بهترین شیوه‌ها برای رفرنس‌ها {/*best-practices-for-refs*/}

پایبندی به این اصول باعث می‌شود کامپوننت‌های شما قابل‌پیش‌بینی‌تر شوند:

- **رفرنس‌ها را به‌عنوان یک دریچهٔ فرار در نظر بگیرید.** رفرنس‌ها هنگام کار با سیستم‌های خارجی یا APIهای مرورگر مفید هستند. اگر بیشتر منطق برنامه و جریان دادهٔ شما به رفرنس‌ها وابسته است، شاید بخواهید رویکرد خود را بازنگری کنید.
- **`ref.current` را در حین رندر نخوانید و ننویسید.** اگر اطلاعاتی در حین رندر لازم است، به جای آن از [استیت](/learn/state-a-components-memory) استفاده کنید. از آنجا که ری‌اکت نمی‌داند چه زمانی `ref.current` تغییر می‌کند، حتی خواندن آن در حین رندر رفتار کامپوننت شما را دشوار برای پیش‌بینی می‌کند. (تنها استثناء این، کدی مانند `if (!ref.current) ref.current = new Thing()` است که فقط یک بار در طول رندر اول رفرنس را تنظیم می‌کند.)

محدودیت‌های استیت ری‌اکت برای رفرنس‌ها اعمال نمی‌شود. برای مثال، استیت مانند یک [عکس فوری برای هر رندر](/learn/state-as-a-snapshot) عمل می‌کند و [به‌صورت همگام به‌روزرسانی نمی‌شود.](/learn/queueing-a-series-of-state-updates) اما وقتی مقدار فعلی یک رفرنس را تغییر می‌دهید، بلافاصله تغییر می‌کند:

```js
ref.current = 5;
console.log(ref.current); // 5
```

این به این دلیل است که **خود رفرنس یک شیء معمولی جاوااسکریپت است،** و در نتیجه مانند آن رفتار می‌کند.

همچنین هنگام کار با یک رفرنس نیازی نیست نگران [جلوگیری از تغییر (mutation)](/learn/updating-objects-in-state) باشید. تا زمانی که شیءای که تغییر می‌دهید برای رندر استفاده نمی‌شود، ری‌اکت اهمیتی نمی‌دهد که با رفرنس یا محتوای آن چه می‌کنید.

## رفرنس‌ها و DOM {/*refs-and-the-dom*/}

شما می‌توانید یک رفرنس را به هر مقداری اشاره دهید. با این حال، رایج‌ترین مورد استفاده برای یک رفرنس، دسترسی به یک عنصر DOM است. برای مثال، این کار برای تمرکز دادن برنامه‌نویسی‌شده به یک ورودی مفید است. وقتی یک رفرنس را به یک ویژگی `ref` در JSX ارسال می‌کنید، مانند `<div ref={myRef}>`، ری‌اکت عنصر DOM مربوطه را در `myRef.current` قرار می‌دهد. هنگامی که عنصر از DOM حذف می‌شود، ری‌اکت `myRef.current` را به `null` به‌روزرسانی می‌کند. می‌توانید درباره این در [دستکاری DOM با رفرنس‌ها](/learn/manipulating-the-dom-with-refs) بیشتر بخوانید.

<Recap>

- رفرنس‌ها یک دریچهٔ فرار برای نگه‌داشتن مقادیری هستند که برای رندر استفاده نمی‌شوند. شما اغلب به آنها نیاز نخواهید داشت.
- یک رفرنس یک شیء سادهٔ جاوااسکریپت با یک پراپرتی واحد به نام `current` است که می‌توانید آن را بخوانید یا تنظیم کنید.
- می‌توانید با فراخوانی هوک `useRef` از ری‌اکت بخواهید به شما یک رفرنس بدهد.
- مانند استیت، رفرنس‌ها به شما اجازه می‌دهند بین رندرهای مجدد یک کامپوننت اطلاعاتی را حفظ کنید.
- برخلاف استیت، تنظیم مقدار `current` رفرنس یک رندر مجدد را راه‌اندازی نمی‌کند.
- `ref.current` را در حین رندر نخوانید و ننویسید. این کار باعث می‌شود کامپوننت شما دشوار برای پیش‌بینی شود.

</Recap>



<Challenges>

#### رفع یک ورودی چت خراب {/*fix-a-broken-chat-input*/}

یک پیام تایپ کنید و «ارسال» را کلیک کنید. متوجه می‌شوید که قبل از دیدن هشدار «ارسال شد!» سه ثانیه تأخیر وجود دارد. در طول این تأخیر، می‌توانید یک دکمهٔ «لغو» را ببینید. روی آن کلیک کنید. این دکمهٔ «لغو» قرار است جلوی ظاهر شدن پیام «ارسال شد!» را بگیرد. این کار را با فراخوانی [`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) برای شناسهٔ timeout ذخیره‌شده در حین `handleSend` انجام می‌دهد. با این حال، حتی پس از کلیک روی «لغو»، پیام «ارسال شد!» همچنان ظاهر می‌شود. دلیل کار نکردن آن را پیدا کنید و آن را برطرف کنید.

<Hint>

متغیرهای معمولی مانند `let timeoutID` بین رندرهای مجدد «باقی نمی‌مانند» زیرا هر رندر، کامپوننت شما (و متغیرهای آن) را از ابتدا اجرا می‌کند (و مقداردهی می‌کند). آیا باید شناسهٔ timeout را در جای دیگری نگه دارید؟

</Hint>

<Sandpack>

```js {expectedErrors: {'react-compiler': [10]}}
import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timeoutID = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Undo
        </button>
      }
    </>
  );
}
```

</Sandpack>

<Solution>

هر بار که کامپوننت شما مجدداً رندر می‌شود (مانند وقتی استیت تنظیم می‌کنید)، تمام متغیرهای محلی از ابتدا مقداردهی می‌شوند. به همین دلیل نمی‌توانید شناسهٔ timeout را در یک متغیر محلی مانند `timeoutID` ذخیره کنید و سپس انتظار داشته باشید که مدیرکنندهٔ رویداد دیگری آن را در آینده «ببیند». به جای آن، آن را در یک رفرنس ذخیره کنید که ری‌اکت بین رندرها آن را حفظ می‌کند.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const timeoutRef = useRef(null);

  function handleSend() {
    setIsSending(true);
    timeoutRef.current = setTimeout(() => {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutRef.current);
  }

  return (
    <>
      <input
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        disabled={isSending}
        onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
      {isSending &&
        <button onClick={handleUndo}>
          Undo
        </button>
      }
    </>
  );
}
```

</Sandpack>

</Solution>


#### رفع کامپوننتی که رندر مجدد نمی‌شود {/*fix-a-component-failing-to-re-render*/}

این دکمه قرار است بین نمایش «روشن» و «خاموش» جابجا شود. با این حال، همیشه «خاموش» را نمایش می‌دهد. مشکل این کد چیست؟ آن را برطرف کنید.

<Sandpack>

```js {expectedErrors: {'react-compiler': [10]}}
import { useRef } from 'react';

export default function Toggle() {
  const isOnRef = useRef(false);

  return (
    <button onClick={() => {
      isOnRef.current = !isOnRef.current;
    }}>
      {isOnRef.current ? 'On' : 'Off'}
    </button>
  );
}
```

</Sandpack>

<Solution>

در این مثال، مقدار فعلی یک رفرنس برای محاسبهٔ خروجی رندر استفاده می‌شود: `{isOnRef.current ? 'On' : 'Off'}`. این نشانه‌ای بر این است که این اطلاعات نباید در یک رفرنس باشد، و در عوض باید در استیت قرار می‌گرفت. برای رفع آن، رفرنس را حذف کنید و به جای آن از استیت استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => {
      setIsOn(!isOn);
    }}>
      {isOn ? 'On' : 'Off'}
    </button>
  );
}
```

</Sandpack>

</Solution>

#### رفع debouncing {/*fix-debouncing*/}

در این مثال، تمام مدیرکننده‌های کلیک دکمه‌ها [«debounce» شده‌اند.](https://kettanaito.com/blog/debounce-vs-throttle) برای دیدن اینکه این یعنی چه، یکی از دکمه‌ها را فشار دهید. توجه کنید که چگونه پیام یک ثانیه بعد ظاهر می‌شود. اگر دکمه را در حین انتظار برای پیام فشار دهید، تایمر بازنشانی می‌شود. بنابراین اگر همین دکمه را سریع و چند بار کلیک کنید، پیام تا یک ثانیه *بعد* از توقف کلیک کردن ظاهر نخواهد شد. debouncing به شما اجازه می‌دهد برخی کنش‌ها را تا زمانی که کاربر «انجام کار را متوقف کند» به تعویق بیندازید.

این مثال کار می‌کند، اما نه کاملاً همان‌طور که در نظر گرفته شده. دکمه‌ها مستقل نیستند. برای دیدن مشکل، یکی از دکمه‌ها را کلیک کنید و سپس بلافاصله دکمهٔ دیگری را کلیک کنید. انتظار دارید که پس از یک تأخیر، پیام هر دو دکمه را ببینید. اما فقط پیام آخرین دکمه ظاهر می‌شود. پیام دکمهٔ اول گم می‌شود.

چرا دکمه‌ها با هم تداخل دارند؟ مشکل را پیدا کرده و برطرف کنید.

<Hint>

آخرین متغیر شناسهٔ timeout بین تمام کامپوننت‌های `DebouncedButton` مشترک است. به همین دلیل کلیک روی یک دکمه، timeout دکمهٔ دیگر را بازنشانی می‌کند. آیا می‌توانید یک شناسهٔ timeout جداگانه برای هر دکمه ذخیره کنید؟

</Hint>

<Sandpack>

```js
let timeoutID;

function DebouncedButton({ onClick, children }) {
  return (
    <button onClick={() => {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Spaceship launched!')}
      >
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Soup boiled!')}
      >
        Boil the soup
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Lullaby sung!')}
      >
        Sing a lullaby
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

<Solution>

متغیری مانند `timeoutID` بین تمام کامپوننت‌ها مشترک است. به همین دلیل کلیک روی دکمهٔ دوم، timeout معلق دکمهٔ اول را بازنشانی می‌کند. برای رفع این مشکل، می‌توانید timeout را در یک رفرنس نگه دارید. هر دکمه رفرنس خود را خواهد داشت، بنابراین با هم تداخل نخواهند داشت. توجه کنید که چگونه کلیک سریع روی دو دکمه، هر دو پیام را نمایش می‌دهد.

<Sandpack>

```js
import { useRef } from 'react';

function DebouncedButton({ onClick, children }) {
  const timeoutRef = useRef(null);
  return (
    <button onClick={() => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        onClick();
      }, 1000);
    }}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  return (
    <>
      <DebouncedButton
        onClick={() => alert('Spaceship launched!')}
      >
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Soup boiled!')}
      >
        Boil the soup
      </DebouncedButton>
      <DebouncedButton
        onClick={() => alert('Lullaby sung!')}
      >
        Sing a lullaby
      </DebouncedButton>
    </>
  )
}
```

```css
button { display: block; margin: 10px; }
```

</Sandpack>

</Solution>

#### خواندن آخرین استیت {/*read-the-latest-state*/}

در این مثال، پس از فشردن «ارسال»، تأخیر کوتاهی قبل از نمایش پیام وجود دارد. عبارت «سلام» را تایپ کنید، «ارسال» را بزنید و سپس به سرعت ورودی را دوباره ویرایش کنید. با وجود ویرایش‌های شما، هشدار همچنان «سلام» را نشان می‌دهد (که مقدار استیت [در زمان](/learn/state-as-a-snapshot#state-over-time) کلیک دکمه بود).

معمولاً، این رفتار همان چیزی است که در یک برنامه می‌خواهید. با این حال، ممکن است مواردی پیش بیاید که بخواهید برخی کدهای ناهمگام، *آخرین* نسخهٔ برخی استیت را بخوانند. آیا می‌توانید راهی بیابید تا هشدار متن ورودی *فعلی* را به جای آنچه در زمان کلیک بوده نمایش دهد؟

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + text);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
```

</Sandpack>

<Solution>

استیت [مانند یک عکس فوری](/learn/state-as-a-snapshot) کار می‌کند، بنابراین نمی‌توانید آخرین استیت را از یک عملیات ناهمگام مانند timeout بخوانید. با این حال، می‌توانید آخرین متن ورودی را در یک رفرنس نگه دارید. یک رفرنس قابل‌تغییر است، بنابراین می‌توانید پراپرتی `current` را در هر زمانی بخوانید. از آنجا که متن فعلی همچنین برای رندر استفاده می‌شود، در این مثال به *هم* یک متغیر استیت (برای رندر) *و* یک رفرنس (برای خواندن آن در timeout) نیاز دارید. باید مقدار رفرنس فعلی را به‌صورت دستی به‌روزرسانی کنید.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const textRef = useRef(text);

  function handleChange(e) {
    setText(e.target.value);
    textRef.current = e.target.value;
  }

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + textRef.current);
    }, 3000);
  }

  return (
    <>
      <input
        value={text}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}>
        Send
      </button>
    </>
  );
}
```

</Sandpack>

</Solution>

</Challenges>
