---
title: صف بندی مجموعه ای از بروزرسانی های State
---

<Intro>

مقداردهی یک متغیر state، باعث ارسال درخواست برای رندر شدن صفحه می&zwnj;شود. اما گاهی اوقات ممکن است بخواهید قبل از اینکه رندر بعدی را در صف قرار دهید چندین عملیات روی مقدار یک متغیر state انجام دهید. برای انجام این کار درک مفهوم بروزرسانی&zwnj;های دسته&zwnj;ای یک متغیر state به شما کمک خواهد کرد.

</Intro>

<YouWillLearn dir='rtl'>

* مفهوم "دسته&zwnj;بندی" چیست و چطور ری&zwnj;اکت با استفاده از آن چندین بروزرسانی state را پردازش می&zwnj;کند
* چطور می&zwnj;توان چند بروزرسانی یک متغییر state را طی یک رندر انجام داد

</YouWillLearn>

## بروزرسانی&zwnj;های دسته&zwnj;ای state در ری&zwnj;اکت {/*react-batches-state-updates*/}

ممکن است انتظار داشته باشید که با کلیک بر روی دکمه <span dir='ltr'>"+3"</span> شمارنده سه واحد افزایش یابد زیرا `setNumber(number + 1)` را سه بار فراخوانی می&zwnj;کند:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

با این حال، همانطور که ممکن است از بخش قبل به خاطر داشته باشید، [در هر رندر مقدار state ثابت است](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time)، بنابراین مقدار `number` همیشه در اولین رندرِ حاصل از اجرای کنترل رویداد کلیک  `0` است، فارغ از این که چند بار `setNumber(1)` را فراخوانی کنید:

```js
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```

اما لازم است در اینجا به یک نکته&zwnj;ی دیگر توجه داشته باشیم. **ری&zwnj;اکت پردازش بروزرسانی state را بعد از اجرای *تمام* کدهای داخل کنترل کننده&zwnj;ی رویداد انجام می&zwnj;دهد.** به همین دلیل است که رندر مجدد تنها *بعد از* تمام فراخوانی&zwnj;های `setNumber()` اتفاق می&zwnj;افتد.

این ممکن است شما را به یاد گارسونی بیاندازد که در رستوران در حال گرفتن یک سفارش است. گارسون با ذکر اولین غذا توسط شما به سمت آشپزخانه نمی&zwnj;دود! در عوض، آن&zwnj;ها به شما اجازه می&zwnj;دهند که شفارشتان را تمام کنید، آن را تغییر دهید، و حتی سفارش سایر افراد حاضر در میز را نیز دریافت می&zwnj;کند.

<Illustration src="/images/docs/illustrations/i_react-batching.png"  alt="An elegant cursor at a restaurant places and order multiple times with React, playing the part of the waiter. After she calls setState() multiple times, the waiter writes down the last one she requested as her final order." />

این به شما این امکان را می&zwnj;دهد که چندین متغییر state را بدون انجام [رندرهای مجدد](/learn/render-and-commit#re-renders-when-state-updates) زیاد  بروزرسانی کنید--حتی از چندین کامپوننت متفاوت--. اما باعث این هم می&zwnj;شود که UI تا _بعد_ از اجرای کامل کنترل کننده رویداد، و تمام کدهای داخل آن بروزرسانی نشود. این رفتار، که به عنوان **دسته&zwnj;بندی** نیز شناخته می&zwnj;شود، باعث خیلی سریع&zwnj;تر اجرا شدن برنامه&zwnj;ی ری&zwnj;اکت شما می&zwnj;گردد. همچنین از مواجه شدن با بروزرسانده که در آن&zwnj;ها فقط برخی متغییر&zwnj;ها بروزرسانی می&zwnj;شوند جلوگیری می&zwnj;کند.ی&zwnj;های "نیمه کاره&zwnj;ی" گیج کنن

**ری&zwnj;اکت مدیریت *چند رویداد* مانند چند بار کلیک کردن عمدی و پشت سر هم را دسته&zwnj;بندی نمی&zwnj;کند**--مدیریت هر رویداد به صورت جداگانه انجام می&zwnj;شود. مطمئن باشید ری&zwnj;اکت تنها زمانی دسته&zwnj;بندی را انجام می&zwnj;دهد که استفاده از آن کاملا ایمن باشد. این به عنوان مثال تضمین می&zwnj;کند که اگر اولین کلیک یک فرم را غیر فعال کرد، کلیک دوم آن را دوباره ارسال نکند.

## انجام چند بروزرسانی روی یک state قبل از رندر بعدی {/*updating-the-same-state-multiple-times-before-the-next-render*/}

این یک استفاده&zwnj;ی غیر معمول است، اما اگر می&zwnj;خواهید یک متغییر state را قبل از رندر بعدی، چند بار بروزرسانی کنید، به جای ارسال *مقدار بعدی state* مثل `setNumber(number + 1)`، می&zwnj;توانید *تابعی* را ارسال کنید تا مقدار بعدی state را بر اساس مقدار قبلی آن که در صف هست محاسبه کند، مثل `setNumber(n => n + 1)`. این راهی است تا به ری&zwnj;اکت بگوییم "با مقدار state کاری انجام بده" به جای آن که جایگزینش کنی.

حالا شمارنده را افزایش دهید:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

در اینجا `n => n + 1` یک **تابع بروزرسانی** نامیده می&zwnj;شود. زمانی که شما آن را به یک تنظیم کننده&zwnj;ی state ارسال می&zwnj;کنید:

1. ری&zwnj;اکت این تابع را در صف قرار می&zwnj;دهد تا پس از اجرای سایر کدهای کنترل کننده&zwnj;ی رویداد پردازش شود.
2. در رندر بعدی ری&zwnj;اکت صف را تا اتنها پیمایش می&zwnj;کند و state آپدیت شده&zwnj;ی نهایی را به شما می&zwnj;دهد.

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

در اینجا نحوه&zwnj;ی عملکرد ری&zwnj;اکت، هنگام پیمایش این خطوط کد در کنترل کننده&zwnj;ی رویداد اجرا می&zwnj;شوند آمده است:

1. `setNumber(n => n + 1)`: `n => n + 1` یک تابع است. ری&zwnj;اکت آن را به یک صف اضافه می&zwnj;کند.
1. `setNumber(n => n + 1)`: `n => n + 1` یک تابع است. ری&zwnj;اکت آن را به یک صف اضافه می&zwnj;کند.
1. `setNumber(n => n + 1)`: `n => n + 1` یک تابع است. ری&zwnj;اکت آن را به یک صف اضافه می&zwnj;کند.

زمانی که شما `useState` را فراخوانی می&zwnj;کنید، در رندر بعدی، ری&zwnj;اکت به صف مراجعه می&zwnj;کند. مقدار قبلی `number` برابر `0` است، پس این همان چیزی است که ری&zwnj;اکت به عنوان اولین مقدار به عنوان آرگومان `n` به تابع بروزرسانی ارسال می&zwnj;کند. سپس ری&zwnj;اکت مقدار بازگشتی از تابع بروزرسانی را دریافت می&zwnj;کند و آن را به عنوان آرگومان `n`به تابع بروزرسانی بعدی ارسال می&zwnj;کند، و به همین ترتیب تا اتنها ادامه می&zwnj;دهد:

|  queued update | `n` | returns |
|--------------|---------|-----|
| `n => n + 1` | `0` | `0 + 1 = 1` |
| `n => n + 1` | `1` | `1 + 1 = 2` |
| `n => n + 1` | `2` | `2 + 1 = 3` |

ری&zwnj;اکت `3` را به عنوان مقدار نهایی ذخیره می&zwnj;کند و آن را از `useState` برمی&zwnj;گرداند.

به همین دلیل است که کلیک کردن روی دکمه&zwnj;ی <span dir="ltr">"+3"</span> در مثال بالا مقدار را به درستی 3 واحد افزایش می&zwnj;دهد.
### چه اتفاقی خواهد افتاد اگر state را بعد از جایگزینی بروزرسانی کنید {/*what-happens-if-you-update-state-after-replacing-it*/}

در مورد کنترل کننده&zwnj;ی زیر چطور؟ به نظر شما در رندر بعدی `number` چه مقداری خواهد داشت؟

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

چیزی که کنترل کننده&zwnj;ی رویداد در مثال بالا به ری&zwnj;اکت می&zwnj;گوید انجام بدهد به صورت زیر است:

1. `setNumber(number + 5)`: مقدار `number` برابر `0` است، بنابراین `setNumber(number + 5)` همان <br/>`setNumber(0 + 5)` است و ری&zwnj;اکت *"جایگزینی با `5`"* را به صف اضافه می&zwnj;کند.
2. `setNumber(n => n + 1)`: `n => n + 1` یک تابع بروزرسانی است. ری&zwnj;اکت  *این تابع* را به صف اضافه می&zwnj;کند.

در رندر بعدی، ری&zwnj;اکت صف state را پیماش می&zwnj;کند:

|   queued update       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |

ری&zwnj;اکت مقدار `6` را به عنوان نتیجه&zwnj;ی نهایی ذخیره می&zwnj;کند و آن را از `useState` بر می&zwnj;گرداند. 

<Note>

شاید متوجه شده باشید که `setState(5)` در واقع شبیه `setState(n => 5)` عمل می&zwnj;کند، اما `n` در آن استفاده نشده است!

</Note>

### چه اتفاقی خواهد افتاد اگر state را بعد از بروزرسانی با تابع، جایگزین کنید {/*what-happens-if-you-replace-state-after-updating-it*/}

بیایید یک مثال دیگر را امتحان کنیم. به نظر شما در رندر بعدی `number` چه مقداری خواهد داشت؟

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
      }}>Increase the number</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

در زیر نحوه&zwnj;ی عملکرد ری&zwnj;اکت هنگام اجرای کدهای تابع کنترل کننده&zwnj;ی رویداد مثال بالا آمده است:

1. `setNumber(number + 5)`: مقدار `number` برابر `0` است، پس `setNumber(number + 5)` با `setNumber(0 + 5)` یکسان است. ری&zwnj;اکت *"جایگزینی با `5`"* را به صف این state اضافه می&zwnj;کند.
2. `setNumber(n => n + 1)`: `n => n + 1` یک تابع بروزرسانی است. ری&zwnj;اکت *این تابع* را به صف اضافه می&zwnj;کند.
3. `setNumber(42)`: ری&zwnj;اکت *"جایگزینی با `42`"* را به صف اضافه می&zwnj;کند.

در رندر بعدی, ری&zwnj;اکت صف state را پیمایش می&zwnj;کند:

|   queued update       | `n` | returns |
|--------------|---------|-----|
| "replace with `5`" | `0` (unused) | `5` |
| `n => n + 1` | `5` | `5 + 1 = 6` |
| "replace with `42`" | `6` (unused) | `42` |

سپس ری&zwnj;اکت `42` را به عنوان نتیجه نهایی ذخیره می&zwnj;کند و آن را از `useState` برمی&zwnj;گرداند.

به طور خلاصه، پارامتری که به `setNumber` ارسال می&zwnj;کنید، به یکی از دو حالت زیر منجر خواهد شد:

* **یک تابع بروزرسانی:** (به عنوان مثال `n => n + 1`) به صف اضافه می شود.
* **هر مقدار دیگری:** (به عنوان مثال عدد `5`) سبب اضافه شدن "جایگزینی با `5`" به صف می&zwnj;شود و هر آنچه از قبل در صف قرار گرفته است را بی&zwnj;اثر می&zwnj;کند.

پس از اجرای کنترل کننده&zwnj;ی رویداد، ری&zwnj;اکت یک رندر مجدد را راه انداری می&zwnj;کند. طی این رندر مجدد ، ری&zwnj;اکت صف را پردازش خواهد کرد. تابع بروزرسانی در حین رندر اجرا می&zwnj;شود، بنابراین **توابع بروزرسانی باید [خالص](/learn/keeping-components-pure) باشند** و فقط *نتیجه را برگردانند*. سعی نکنید state را از داخل توابع بروزرسانی مقداردهی کنید یا از سایر کنترل کننده&zwnj;های جانبی مانند `useState()‍` استفاده کنید. در حالت Strict Mode، ری&zwnj;اکت هر تابع بروزرسانی را دو بار اجرا می&zwnj;کند(اما نتیجه دوم را نادیده می&zwnj;گیرد) تا به شما در یافتن اشتباهات کمک کند.

### قرارداد&zwnj;های نام&zwnj;گذاری {/*naming-conventions*/}

معمولا آرگومان تابع بروزرسانی را با حروف اول متغییر state مربوطه نام&zwnj;گذاری می&zwnj;کنند:

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

اگر کد طولانی&zwnj;تر را ترجیح می&zwnj;دهید، یکی دیگر از شیوه&zwnj;های رایج، تکرار نام کامل متغییر state است، مثلا `setEnabled(enabled => !enabled)`، یا استفاده از پیشوند مثل `setEnabled(prevEnabled => !prevEnabled)`.

<Recap>

* بروزرسانی یک state مقدار آن را در رندر فعلی تغییر نمی&zwnj;دهد، اما برای یک رندر جدید درخواست می&zwnj;دهد.
* ری&zwnj;اکت بروزرسانی state را پس از پایان اجرای کنترل کننده&zwnj;های رویداد پردازش می&zwnj;کند، به این دسته&zwnj;بندی می&zwnj;گویند.
* برای چند بار بروزرسانی یک state در وقوع یک رویداد می&zwnj;توانید از تابع بروزرسانی مثل `setNumber(n => n + 1)` استفاده کنید.

</Recap>



<Challenges>

#### شمارنده درخواست را درست کنید {/*fix-a-request-counter*/}

شما در حال کار روی یک برنامه&zwnj;ی بازار هنری هستید که به کاربر امکان می&zwnj;دهد چندین سفارش را برای یک کالای هنری به طور همزمان ارسال کند. هر بار که کاربر دکمه&zwnj;ی "خرید" را فشار می&zwnj;دهد, شمارنده&zwnj;ی "در انتظار" باید یک واحد افزایش یابد. بعد از سه ثانیه باید شمارنده&zwnj;ی "در انتظار" کاهش یابد و شمارنده&zwnj;ی "کامل شده" افزایش یابد.

با این حال شمارنده&zwnj;ی "در انتظار" طوری که مورد نظر ما است رفتار نمی&zwnj;کند. وقتی "خرید" را فشار می&zwnj;دهید، به `-1` کاهش می&zwnj;یابد (که نباید امکان&zwnj;پذیر باشد!). و اگر دو بار سریع کلیک کنید، شاهد رفتار غیرقابل پیش&zwnj;بینی از هر دو شمارنده خواهید بود.

چرا این اتفاق می&zwnj;افتد؟ هر دو شمارنده را درست کنید.
<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCompleted(completed + 1);
  }

  return (
    <div dir="rtl">
      <h3>
        در انتظار: {pending}
      </h3>
      <h3>
        کامل شده: {completed}
      </h3>
      <button onClick={handleClick}>
        خرید     
      </button>
    </div>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

<Solution>

در تابع کنترل رویداد `handleClick` مقادیر `pending` و `completed` برابر با زمانی است که رویداد کلیک اتفاق افتاده است. در اولین رندر، `pending` برابر `0` است، در نتیجه `setPending(pending - 1)` معادل `setPending(-1)` خواهد بود، که اشتباه است. از آنجایی که می&zwnj;خواهید شمارنده&zwnj;ها را *زیاد* یا *کم* کنید، هنگام کلیک می&zwnj;توانید به جای بروزرسانی متغییر state با مقدار مشخص از توابع بروزرسانی استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function RequestTracker() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  async function handleClick() {
    setPending(p => p + 1);
    await delay(3000);
    setPending(p => p - 1);
    setCompleted(c => c + 1);
  }

  return (
    <div dir="rtl">
      <h3>
        در انتظار: {pending}
      </h3>
      <h3>
        کامل شده: {completed}
      </h3>
      <button onClick={handleClick}>
        خرید     
      </button>
    </div>
  );
}

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

</Sandpack>

این تضمین می&zwnj;کند که وقتی یک شمارنده را افزایش یا کاهش می&zwnj;دهید، این کار را در رابطه با آخرین مقدار state آن انجام دهید، نه مقداری که در زمان کلیک داشته است.

</Solution>

#### صف state را خودتان پیاده&zwnj;سازی کنید {/*implement-the-state-queue-yourself*/}

در این چالش، بخش کوچکی از ری&zwnj;اکت را دوباره از ابتدا پیاده&zwnj;سازی خواهید کرد! آنقدر&zwnj;ها هم که به نظر می&zwnj;رسد سخت نیست.

اگر به قسمت ویرایشگر کد که کمی پایین&zwnj;تر است بروید، متوجه خواهید شده که **چهار تست موردی** در آنجا وجود دارد. آن&zwnj;ها با مثال&zwnj;هایی که در این صفحه دیدم مطابقت دارند. وظیفه شما این است که تابع `getFinalState` را طوری پیاده&zwnj;سازی کنید که مقدار بازگشت داده شده برای هریک از موارد تست منجر به نتیجه&zwnj;ی صحیح شود. اگر آن را به درستی پیاده سازی کنید، هر چهار تست عبارت صحیح را نشان خواهند داد.

شما دو آرگومان دریافت خواهید کرد: `baseState` که مقدار اولیه state است (مثل `0`)، و `queue` که آرایه&zwnj;ای است شامل ترکیبی از اعداد (مثلا `5`) و توابع بروزرسانی (مثل `n => n + 1`) با همان ترتیبی که به صف اضافه شده&zwnj;اند.

کار شما این است که state نهایی را برگردانید، درست مانند جداولی که قبل&zwnj;تر در این صفحه دیدید!

<Hint>

اگر احساس می&zwnj;کنید گیر کردید، با ساختار زیر شروع کنید:

```js
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // TODO: apply the updater function
    } else {
      // TODO: replace the state
    }
  }

  return finalState;
}
```

کد&zwnj;های از قلم افتاده را شما بنویسید!

</Hint>

<Sandpack>

```js processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  // TODO: do something with the queue...

  return finalState;
}
```

```js App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <div dir="rtl">
      <p><span style={{display: "inline-block"}}>مقدار اولیه state: </span><b>{baseState}</b></p>
      <p>صف: <b>[{queue.join(', ')}]</b></p>
      <p>نتیجه&zwnj;ی مورد انتظار: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        نتیجه&zwnj;ی کار شما: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'صحیح' :
          'اشتباه'
        })
      </p>
    </div>
  );
}
```

</Sandpack>

<Solution>

این همان الگوریتم دقیقی است که در این صفحه توضیح داده شد و ری&zwnj;اکت برای محاسبه&zwnj;ی مقدار نهایی state از آن استفاده می&zwnj;کند: 

<Sandpack>

```js processQueue.js active
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // Apply the updater function.
      finalState = update(finalState);
    } else {
      // Replace the next state.
      finalState = update;
    }
  }

  return finalState;
}
```

```js App.js
import { getFinalState } from './processQueue.js';

function increment(n) {
  return n + 1;
}
increment.toString = () => 'n => n+1';

export default function App() {
  return (
    <>
      <TestCase
        baseState={0}
        queue={[1, 1, 1]}
        expected={1}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          increment,
          increment,
          increment
        ]}
        expected={3}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
        ]}
        expected={6}
      />
      <hr />
      <TestCase
        baseState={0}
        queue={[
          5,
          increment,
          42,
        ]}
        expected={42}
      />
    </>
  );
}

function TestCase({
  baseState,
  queue,
  expected
}) {
  const actual = getFinalState(baseState, queue);
  return (
    <div dir="rtl">
      <p><span style={{display: "inline-block"}}>مقدار اولیه state:</span> <b>{baseState}</b></p>
      <p>صف: <b>[{queue.join(', ')}]</b></p>
      <p>نتیجه&zwnj;ی مورد انتظار: <b>{expected}</b></p>
      <p style={{
        color: actual === expected ?
          'green' :
          'red'
      }}>
        نتیجه&zwnj;ی کار شما: <b>{actual}</b>
        {' '}
        ({actual === expected ?
          'صحیح' :
          'اشتباه'
        })
      </p>
    </div>
  );
}
```

</Sandpack>

اکنون می&zwnj;دانید که این بخش از ری&zwnj;اکت چطور کار می&zwnj;کند!

</Solution>

</Challenges>