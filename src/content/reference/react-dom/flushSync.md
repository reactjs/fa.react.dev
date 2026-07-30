---
title: flushSync
---

<Pitfall>

استفاده از `flushSync` رایج نیست و می‌تواند به عملکرد اپلیکیشن شما آسیب بزند.

</Pitfall>

<Intro>

`flushSync` به شما اجازه می‌دهد ری‌اکت را مجبور کنید هر به‌روزرسانی داخل کالبک ارائه‌شده را به‌صورت همگام (synchronous) اعمال کند. این کار تضمین می‌کند که DOM بلافاصله به‌روزرسانی می‌شود.

```js
flushSync(callback)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `flushSync(callback)` {/*flushsync*/}

برای مجبور کردن ری‌اکت به اعمالِ همگامِ کارهای معوق و به‌روزرسانی DOM، `flushSync` را فراخوانی کنید.

```js
import { flushSync } from 'react-dom';

flushSync(() => {
  setSomething(123);
});
```

در بیشتر موارد، می‌توان از `flushSync` چشم‌پوشی کرد. از `flushSync` به‌عنوان آخرین راه‌حل استفاده کنید.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}


* `callback`: یک تابع. ری‌اکت بلافاصله این کالبک را فراخوانی می‌کند و هر به‌روزرسانی درون آن را به‌صورت همگام اعمال می‌کند. همچنین ممکن است کارهای معوق، افکت‌ها، یا به‌روزرسانی‌های داخل افکت‌ها را نیز اعمال کند. اگر یک به‌روزرسانی در نتیجهٔ این فراخوانی `flushSync` معلق (suspend) شود، ممکن است fallbackها دوباره نمایش داده شوند.

#### مقدار برگشتی {/*returns*/}

`flushSync` مقدار `undefined` برمی‌گرداند.

#### نکات {/*caveats*/}

* `flushSync` می‌تواند به‌طور چشمگیری به عملکرد آسیب بزند. کم‌استفاده کنید.
* `flushSync` ممکن است مرزهای ساسپنس معوق را مجبور کند استیت `fallback` خود را نمایش دهند.
* `flushSync` ممکن است افکت‌های معوق را اجرا کند و هر به‌روزرسانی درون آن‌ها را پیش از بازگشت، به‌صورت همگام اعمال کند.
* `flushSync` ممکن است برای اعمال به‌روزرسانی‌های داخل کالبک، به‌روزرسانی‌هایی خارج از کالبک را نیز اعمال کند. برای مثال، اگر به‌روزرسانی‌های معوقی از یک کلیک وجود داشته باشد، ری‌اکت ممکن است آن‌ها را پیش از اعمال به‌روزرسانی‌های داخل کالبک، اعمال کند.

---

## نحوهٔ استفاده {/*usage*/}

### اعمال به‌روزرسانی‌ها برای یکپارچه‌سازی با شخص ثالث {/*flushing-updates-for-third-party-integrations*/}

هنگام یکپارچه‌سازی با کد شخص ثالث مانند APIهای مرورگر یا کتابخانه‌های رابط کاربری، ممکن است لازم باشد ری‌اکت را مجبور به اعمال به‌روزرسانی‌ها کنید. از `flushSync` برای مجبور کردن ری‌اکت به اعمالِ همگامِ <CodeStep step={1}>به‌روزرسانی‌های استیت</CodeStep> داخل کالبک استفاده کنید:

```js [[1, 2, "setSomething(123)"]]
flushSync(() => {
  setSomething(123);
});
// By this line, the DOM is updated.
```

این کار تضمین می‌کند که تا زمان اجرای خط بعدی کد، ری‌اکت DOM را به‌روز کرده است.

**استفاده از `flushSync` رایج نیست و استفادهٔ مکرر از آن می‌تواند به‌طور چشمگیری به عملکرد اپلیکیشن شما آسیب بزند.** اگر اپلیکیشن شما فقط از APIهای ری‌اکت استفاده می‌کند و با کتابخانه‌های شخص ثالث یکپارچه نمی‌شود، `flushSync` نباید لازم باشد.

با این حال، می‌تواند برای یکپارچه‌سازی با کد شخص ثالث مانند APIهای مرورگر مفید باشد.

برخی APIهای مرورگر انتظار دارند نتایج داخل کالبک‌ها تا پایان کالبک به‌صورت همگام در DOM نوشته شوند، تا مرورگر بتواند کاری با DOM رندرشده انجام دهد. در بیشتر موارد، ری‌اکت این کار را به‌طور خودکار برای شما انجام می‌دهد. اما در برخی موارد ممکن است لازم باشد یک به‌روزرسانی همگام را اجبار کنید.

برای مثال، API مرورگر `onbeforeprint` به شما اجازه می‌دهد صفحه را بلافاصله پیش از باز شدن دیالوگ چاپ تغییر دهید. این برای اعمال استایل‌های چاپ سفارشی که به سند اجازه می‌دهند برای چاپ بهتر نمایش داده شود، مفید است. در مثال زیر، شما از `flushSync` داخل کالبک `onbeforeprint` برای «اعمال» فوری استیت ری‌اکت در DOM استفاده می‌کنید. سپس، تا زمان باز شدن دیالوگ چاپ، `isPrinting` مقدار «yes» را نمایش می‌دهد:

<Sandpack>

```js src/App.js active
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export default function PrintApp() {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      flushSync(() => {
        setIsPrinting(true);
      })
    }

    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    }
  }, []);

  return (
    <>
      <h1>isPrinting: {isPrinting ? 'yes' : 'no'}</h1>
      <button onClick={() => window.print()}>
        Print
      </button>
    </>
  );
}
```

</Sandpack>

بدون `flushSync`، دیالوگ چاپ `isPrinting` را به‌صورت «no» نمایش می‌دهد. این به این دلیل است که ری‌اکت به‌روزرسانی‌ها را به‌صورت ناهمگام (asynchronous) دسته‌بندی (Batching) می‌کند و دیالوگ چاپ پیش از به‌روزرسانی استیت نمایش داده می‌شود.

<Pitfall>

`flushSync` می‌تواند به‌طور چشمگیری به عملکرد آسیب بزند و ممکن است به‌طور غیرمنتظره مرزهای ساسپنس معوق را مجبور به نمایش استیت fallback خود کند.

در بیشتر موارد، می‌توان از `flushSync` چشم‌پوشی کرد، بنابراین از `flushSync` به‌عنوان آخرین راه‌حل استفاده کنید.

</Pitfall>

---

## رفع اشکال {/*troubleshooting*/}

### خطای «flushSync was called from inside a lifecycle method» را دریافت می‌کنم {/*im-getting-an-error-flushsync-was-called-from-inside-a-lifecycle-method*/}


ری‌اکت نمی‌تواند در میانهٔ یک رندر `flushSync` را اجرا کند. اگر این کار را بکنید، هیچ اتفاقی نمی‌افتد و یک هشدار دریافت می‌کنید:

<ConsoleBlock level="error">

Warning: flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.

</ConsoleBlock>

این شامل فراخوانی `flushSync` در موارد زیر می‌شود:

- رندر کردن یک کامپوننت.
- هوک‌های `useLayoutEffect` یا `useEffect`.
- روش‌های چرخهٔ حیات کامپوننت‌های کلاسی.

برای مثال، فراخوانی `flushSync` در یک افکت هیچ اثری نخواهد داشت و هشدار می‌دهد:

```js
import { useEffect } from 'react';
import { flushSync } from 'react-dom';

function MyComponent() {
  useEffect(() => {
    // 🚩 Wrong: calling flushSync inside an effect
    flushSync(() => {
      setSomething(newValue);
    });
  }, []);

  return <div>{/* ... */}</div>;
}
```

برای رفع این مشکل، معمولاً باید فراخوانی `flushSync` را به یک رویداد منتقل کنید:

```js
function handleClick() {
  // ✅ Correct: flushSync in event handlers is safe
  flushSync(() => {
    setSomething(newValue);
  });
}
```


اگر انتقال به یک رویداد دشوار است، می‌توانید `flushSync` را در یک میکروتسک (microtask) به تعویق بیندازید:

```js {3,7}
useEffect(() => {
  // ✅ Correct: defer flushSync to a microtask
  queueMicrotask(() => {
    flushSync(() => {
      setSomething(newValue);
    });
  });
}, []);
```

این کار به رندر فعلی اجازه می‌دهد تمام شود و یک رندر همگام دیگر را برای اعمال به‌روزرسانی‌ها زمان‌بندی کند.

<Pitfall>

`flushSync` می‌تواند به‌طور چشمگیری به عملکرد آسیب بزند، اما این الگو خاص برای عملکرد بدتر هم است. پیش از فراخوانی `flushSync` در یک میکروتسک به‌عنوان راه فرار، تمام گزینه‌های دیگر را امتحان کنید.

</Pitfall>
