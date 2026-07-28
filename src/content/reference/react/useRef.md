---
title: useRef
---

<Intro>

`useRef` یک هوک ری‌اکت است که به شما اجازه می‌دهد به مقداری ارجاع دهید که برای رندر کردن لازم نیست.

```js
const ref = useRef(initialValue)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useRef(initialValue)` {/*useref*/}

برای اعلان یک [رفرنس](/learn/referencing-values-with-refs)، `useRef` را در بالاترین سطح کامپوننت خود فراخوانی کنید.

```js
import { useRef } from 'react';

function MyComponent() {
  const intervalRef = useRef(0);
  const inputRef = useRef(null);
  // ...
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `initialValue`: مقداری که می‌خواهید پراپرتی `current` شیء رفرنس در ابتدا داشته باشد. می‌تواند مقداری از هر نوعی باشد. این آرگومان پس از رندر اولیه نادیده گرفته می‌شود.

#### مقادیر بازگشتی {/*returns*/}

`useRef` شیئی با یک پراپرتی برمی‌گرداند:

* `current`: در ابتدا به `initialValue` که پاس داده‌اید تنظیم می‌شود. بعداً می‌توانید آن را به چیز دیگری تنظیم کنید. اگر شیء رفرنس را به‌عنوان ویژگی `ref` به یک نود JSX به ری‌اکت پاس بدهید، ری‌اکت پراپرتی `current` آن را تنظیم می‌کند.

در رندرهای بعدی، `useRef` همان شیء را برمی‌گرداند.

#### موارد احتیاط {/*caveats*/}

* می‌توانید پراپرتی `ref.current` را تغییر دهید. برخلاف استیت، این پراپرتی قابل‌تغییر (mutable) است. با این حال، اگر شیئی را نگه می‌دارد که برای رندر استفاده می‌شود (برای مثال، بخشی از استیت شما)، نباید آن شیء را تغییر دهید.
* هنگامی که پراپرتی `ref.current` را تغییر می‌دهید، ری‌اکت کامپوننت شما را دوباره رندر نمی‌کند. ری‌اکت از زمان تغییر آن آگاه نیست زیرا رفرنس یک شیء سادهٔ جاوااسکریپت است.
* هنگام رندر، `ref.current` را _نخوانده و نه بنویسید_، مگر برای [مقداردهی اولیه.](#avoiding-recreating-the-ref-contents) این کار رفتار کامپوننت شما را غیرقابل‌پیش‌بینی می‌کند.
* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **تابع کامپوننت شما را دو بار فراخوانی می‌کند** تا [به شما کمک کند ناخالصی‌های تصادفی را پیدا کنید.](/reference/react/useState#my-initializer-or-updater-function-runs-twice) این رفتار فقط مخصوص محیط توسعه است و بر production تأثیری ندارد. هر شیء رفرنس دو بار ایجاد می‌شود، اما یکی از نسخه‌ها دور انداخته می‌شود. اگر تابع کامپوننت شما خالص باشد (که باید باشد)، این نباید بر رفتار تأثیر بگذارد.

---

## استفاده {/*usage*/}

### ارجاع به یک مقدار با یک رفرنس {/*referencing-a-value-with-a-ref*/}

برای اعلان یک یا چند [رفرنس](/learn/referencing-values-with-refs)، `useRef` را در بالاترین سطح کامپوننت خود فراخوانی کنید.

```js [[1, 4, "intervalRef"], [3, 4, "0"]]
import { useRef } from 'react';

function Stopwatch() {
  const intervalRef = useRef(0);
  // ...
```

`useRef` یک <CodeStep step={1}>شیء رفرنس</CodeStep> با یک <CodeStep step={2}>پراپرتی `current`</CodeStep> برمی‌گرداند که در ابتدا به <CodeStep step={3}>مقدار اولیه</CodeStep> که ارائه کرده‌اید تنظیم شده است.

در رندرهای بعدی، `useRef` همان شیء را برمی‌گرداند. می‌توانید پراپرتی `current` آن را برای ذخیرهٔ اطلاعات و خواندن آن بعداً تغییر دهید. این ممکن است شما را به یاد [استیت](/reference/react/useState) بیندازد، اما تفاوتی مهم وجود دارد.

**تغییر یک رفرنس، رندر مجدد را موجب نمی‌شود.** این یعنی رفرنس‌ها برای ذخیرهٔ اطلاعاتی که بر خروجی بصری کامپوننت شما تأثیر ندارند، کاملاً مناسب هستند. برای مثال، اگر نیاز به ذخیرهٔ یک [شناسهٔ بازه (interval ID)](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) و بازیابی آن بعداً دارید، می‌توانید آن را در یک رفرنس قرار دهید. برای به‌روزرسانی مقدار درون رفرنس، باید به‌صورت دستی پراپرتی <CodeStep step={2}>`current`</CodeStep> آن را تغییر دهید:

```js [[2, 5, "intervalRef.current"]]
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000);
  intervalRef.current = intervalId;
}
```

بعداً می‌توانید آن شناسهٔ بازه را از رفرنس بخوانید تا بتوانید [آن بازه را پاک کنید](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):

```js [[2, 2, "intervalRef.current"]]
function handleStopClick() {
  const intervalId = intervalRef.current;
  clearInterval(intervalId);
}
```

با استفاده از یک رفرنس، اطمینان حاصل می‌کنید که:

- می‌توانید بین رندرهای مجدد **اطلاعاتی را ذخیره کنید** (برخلاف متغیرهای معمولی، که در هر رندر بازنشانی می‌شوند).
- تغییر آن **رندر مجدد موجب نمی‌شود** (برخلاف متغیرهای استیت، که رندر مجدد را موجب می‌شوند).
- **اطلاعات برای هر نسخه از کامپوننت شما محلی است** (برخلاف متغیرهای بیرون، که مشترک هستند).

تغییر یک رفرنس رندر مجدد موجب نمی‌شود، بنابراین رفرنس‌ها برای ذخیرهٔ اطلاعاتی که می‌خواهید روی صفحه نمایش دهید، مناسب نیستند. برای این کار از استیت استفاده کنید. دربارهٔ [انتخاب میان `useRef` و `useState`](/learn/referencing-values-with-refs#differences-between-refs-and-state) بیشتر بخوانید.

<Recipes titleText="نمونه‌هایی از ارجاع به یک مقدار با useRef" titleId="examples-value">

#### شمارندهٔ کلیک {/*click-counter*/}

این کامپوننت از یک رفرنس برای پیگیری تعداد دفعات کلیک روی دکمه استفاده می‌کند. توجه کنید که در اینجا استفاده از رفرنس به‌جای استیت اشکالی ندارد زیرا تعداد کلیک‌ها فقط در یک هندلر رویداد خوانده و نوشته می‌شود.

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

اگر `{ref.current}` را در JSX نمایش دهید، عدد هنگام کلیک به‌روزرسانی نمی‌شود. این به این دلیل است که تنظیم `ref.current` رندر مجدد موجب نمی‌شود. اطلاعاتی که برای رندر استفاده می‌شوند، باید به‌جای آن استیت باشند.

<Solution />

#### یک کرنومتر {/*a-stopwatch*/}

این مثال از ترکیبی از استیت و رفرنس استفاده می‌کند. هم `startTime` و هم `now` متغیرهای استیت هستند زیرا برای رندر استفاده می‌شوند. اما همچنین باید یک [شناسهٔ بازه](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) را نگه داریم تا بتوانیم بازه را با فشردن دکمه متوقف کنیم. چون شناسهٔ بازه برای رندر استفاده نمی‌شود، مناسب است که در یک رفرنس نگه داشته شود و به‌صورت دستی به‌روزرسانی شود.

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

<Solution />

</Recipes>

<Pitfall>

**هنگام رندر، `ref.current` را _نه بخوانید و نه بنویسید_.**

ری‌اکت انتظار دارد که بدنهٔ کامپوننت شما [مانند یک تابع خالص رفتار کند](/learn/keeping-components-pure):

- اگر ورودی‌ها ([پراپس](/learn/passing-props-to-a-component)، [استیت](/learn/state-a-components-memory) و [کانتکست](/learn/passing-data-deeply-with-context)) یکسان باشند، باید دقیقاً همان JSX را برگرداند.
- فراخوانی آن به ترتیب متفاوت یا با آرگومان‌های متفاوت نباید بر نتایج فراخوانی‌های دیگر تأثیر بگذارد.

خواندن یا نوشتن یک رفرنس **در حین رندر** این انتظارات را نقض می‌کند.

```js {expectedErrors: {'react-compiler': [4]}} {3-4,6-7}
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

می‌توانید رفرنس‌ها را **به‌جای آن از هندلرهای رویداد یا افکت‌ها** بخوانید یا بنویسید.

```js {4-5,9-10}
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```

اگر *مجبورید* چیزی را حین رندر [بخوانید یا بنویسید](/reference/react/useState#storing-information-from-previous-renders)، به‌جای آن [از استیت استفاده کنید](/reference/react/useState).

وقتی این قواعد را نقض می‌کنید، کامپوننت شما ممکن است همچنان کار کند، اما بیشتر ویژگی‌های جدیدی که به ری‌اکت اضافه می‌کنیم به این انتظارات تکیه می‌کنند. دربارهٔ [خالص نگه‌داشتن کامپوننت‌های خود بیشتر بخوانید.](/learn/keeping-components-pure#where-you-_can_-cause-side-effects)

</Pitfall>

---

### دستکاری DOM با یک رفرنس {/*manipulating-the-dom-with-a-ref*/}

استفاده از یک رفرنس برای دستکاری [DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) بسیار رایج است. ری‌اکت پشتیبانی داخلی برای این کار دارد.

ابتدا یک <CodeStep step={1}>شیء رفرنس</CodeStep> با <CodeStep step={3}>مقدار اولیه</CodeStep> `null` اعلان کنید:

```js [[1, 4, "inputRef"], [3, 4, "null"]]
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  // ...
```

سپس شیء رفرنس خود را به‌عنوان ویژگی `ref` به JSXِ نود DOM که می‌خواهید دستکاری کنید، پاس بدهید:

```js [[1, 2, "inputRef"]]
  // ...
  return <input ref={inputRef} />;
```

پس از آنکه ری‌اکت نود DOM را ایجاد کرده و آن را روی صفحه می‌گذارد، ری‌اکت پراپرتی <CodeStep step={2}>`current`</CodeStep> شیء رفرنس شما را به آن نود DOM تنظیم می‌کند. حالا می‌توانید به نود DOM `<input>` دسترسی داشته باشید و متدهایی مانند [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) را فراخوانی کنید:

```js [[2, 2, "inputRef.current"]]
  function handleClick() {
    inputRef.current.focus();
  }
```

هنگامی که نود از صفحه حذف می‌شود، ری‌اکت پراپرتی `current` را دوباره به `null` تنظیم می‌کند.

دربارهٔ [دستکاری DOM با رفرنس‌ها بیشتر بخوانید.](/learn/manipulating-the-dom-with-refs)

<Recipes titleText="نمونه‌هایی از دستکاری DOM با useRef" titleId="examples-dom">

#### فوکوس کردن یک ورودی متنی {/*focusing-a-text-input*/}

در این مثال، کلیک روی دکمه، ورودی را فوکوس می‌کند:

<Sandpack>

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

#### اسکرول یک تصویر به نمایان شدن {/*scrolling-an-image-into-view*/}

در این مثال، کلیک روی دکمه یک تصویر را به نمایان شدن اسکرول می‌کند. این مثال از یک رفرنس به نود DOM لیست استفاده می‌کند و سپس APIِ DOMِ [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) را فراخوانی می‌کند تا تصویری را که می‌خواهیم به آن اسکرول کنیم، پیدا کند.

<Sandpack>

```js
import { useRef } from 'react';

export default function CatFriends() {
  const listRef = useRef(null);

  function scrollToIndex(index) {
    const listNode = listRef.current;
    // This line assumes a particular DOM structure:
    const imgNode = listNode.querySelectorAll('li > img')[index];
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToIndex(0)}>
          Neo
        </button>
        <button onClick={() => scrollToIndex(1)}>
          Millie
        </button>
        <button onClick={() => scrollToIndex(2)}>
          Bella
        </button>
      </nav>
      <div>
        <ul ref={listRef}>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="Bella"
            />
          </li>
        </ul>
      </div>
    </>
  );
}
```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

<Solution />

#### پخش و توقف یک ویدئو {/*playing-and-pausing-a-video*/}

این مثال از یک رفرنس برای فراخوانی [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) و [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) روی یک نود DOM `<video>` استفاده می‌کند.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

<Solution />

#### در دسترس قرار دادن یک رفرنس برای کامپوننت خودتان {/*exposing-a-ref-to-your-own-component*/}

گاهی ممکن است بخواهید به کامپوننت والد اجازه دهید DOM درون کامپوننت شما را دستکاری کند. برای مثال، شاید در حال نوشتن یک کامپوننت `MyInput` هستید، اما می‌خواهید والد بتواند ورودی را فوکوس کند (که والد به آن دسترسی ندارد). می‌توانید یک `ref` در والد ایجاد کنید و `ref` را به‌عنوان پراپ به کامپوننت فرزند پاس بدهید. یک [راهنمای گام‌به‌گام](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes) را اینجا بخوانید.

<Sandpack>

```js
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
};

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### جلوگیری از بازایجاد محتویات رفرنس {/*avoiding-recreating-the-ref-contents*/}

ری‌اکت مقدار اولیهٔ رفرنس را یک‌بار ذخیره می‌کند و در رندرهای بعدی آن را نادیده می‌گیرد.

```js
function Video() {
  const playerRef = useRef(new VideoPlayer());
  // ...
```

اگرچه نتیجهٔ `new VideoPlayer()` تنها برای رندر اولیه استفاده می‌شود، همچنان در هر رندر این تابع را فراخوانی می‌کنید. این می‌تواند اگر اشیاء پرهزینه‌ای ایجاد کند، اتلاف منابع باشد.

برای حل این مشکل، می‌توانید رفرنس را به این شکل مقداردهی اولیه کنید:

```js
function Video() {
  const playerRef = useRef(null);
  if (playerRef.current === null) {
    playerRef.current = new VideoPlayer();
  }
  // ...
```

معمولاً نوشتن یا خواندن `ref.current` حین رندر مجاز نیست. با این حال، در این مورد اشکالی ندارد زیرا نتیجه همیشه یکسان است و شرط فقط هنگام مقداردهی اولیه اجرا می‌شود، بنابراین کاملاً قابل‌پیش‌بینی است.

<DeepDive>

#### چگونه از بررسی null هنگام مقداردهی useRef بعداً جلوگیری کنیم {/*how-to-avoid-null-checks-when-initializing-use-ref-later*/}

اگر از یک type checker استفاده می‌کنید و نمی‌خواهید همیشه `null` را بررسی کنید، می‌توانید الگویی مانند این را امتحان کنید:

```js
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }

  // ...
```

در اینجا خود `playerRef` قابل‌ null بودن است. با این حال، باید بتوانید type checker خود را متقاعد کنید که هیچ موردی وجود ندارد که در آن `getPlayer()` مقدار `null` برگرداند. سپس از `getPlayer()` در هندلرهای رویداد خود استفاده کنید.

</DeepDive>

---

## رفع اشکال {/*troubleshooting*/}

### نمی‌توانم به یک کامپوننت سفارشی رفرنس بگیرم {/*i-cant-get-a-ref-to-a-custom-component*/}

اگر سعی کنید یک `ref` را به کامپوننت خودتان مانند این پاس بدهید:

```js
const inputRef = useRef(null);

return <MyInput ref={inputRef} />;
```

ممکن است در کنسول خطایی دریافت کنید:

<ConsoleBlock level="error">

TypeError: Cannot read properties of null

</ConsoleBlock>

به‌طور پیش‌فرض، کامپوننت‌های خود شما رفرنس‌ها را برای نودهای DOM درونشان آشکار نمی‌کنند.

برای رفع این مشکل، کامپوننتی که می‌خواهید به آن رفرنس بگیرید را پیدا کنید:

```js
export default function MyInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
    />
  );
}
```

سپس `ref` را به لیست پراپس‌هایی که کامپوننت شما می‌پذیرد اضافه کنید و `ref` را به‌عنوان یک پراپ به [کامپوننت داخلی](/reference/react-dom/components/common) فرزند مربوطه پاس بدهید، مانند این:

```js {1,6}
function MyInput({ value, onChange, ref }) {
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
};

export default MyInput;
```

سپس کامپوننت والد می‌تواند به آن رفرنس بگیرد.

دربارهٔ [دسترسی به نودهای DOM کامپوننت دیگر بیشتر بخوانید.](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes)
