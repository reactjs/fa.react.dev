---
title: act
---

<Intro>

`act` یک راهنمای تست است که به‌روزرسانی‌های در حال انتظار ری‌اکت را پیش از انجام assertionها اعمال می‌کند.

```js
await act(async actFn)
```

</Intro>

برای آماده‌سازی یک کامپوننت جهت انجام assertionها، کدی که آن را رندر می‌کند و به‌روزرسانی‌ها را انجام می‌دهد درون یک فراخوانی `await act()` بپیچید. این کار باعث می‌شود تست شما به نحوی که ری‌اکت در مرورگر کار می‌کند نزدیک‌تر اجرا شود.

<Note>
ممکن است استفادهٔ مستقیم از `act()` کمی بیش از حد طولانی به نظر برسد. برای جلوگیری از برخی کدهای تکراری، می‌توانید از کتابخانه‌ای مانند [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) استفاده کنید که راهنماهای آن با `act()` پیچیده شده‌اند.
</Note>


<InlineToc />

---

## مرجع {/*reference*/}

### `await act(async actFn)` {/*await-act-async-actfn*/}

هنگام نوشتن تست‌های رابط کاربری، وظایفی مانند رندر، رویدادهای کاربر، یا دریافت داده را می‌توان به‌عنوان «واحدهایی» از تعامل با یک رابط کاربری در نظر گرفت. ری‌اکت راهنمایی به نام `act()` ارائه می‌دهد که اطمینان حاصل می‌کند تمام به‌روزرسانی‌های مربوط به این «واحدها» پیش از انجام هر assertion، پردازش و به DOM اعمال شده‌اند.

نام `act` از الگوی [Arrange-Act-Assert](https://wiki.c2.com/?ArrangeActAssert) آمده است.

```js {2,4}
it ('renders with button disabled', async () => {
  await act(async () => {
    root.render(<TestComponent />)
  });
  expect(container.querySelector('button')).toBeDisabled();
});
```

<Note>

پیشنهاد می‌کنیم از `act` به‌همراه `await` و یک تابع `async` استفاده کنید. اگرچه نسخهٔ همگام در بسیاری از موارد کار می‌کند، در همهٔ موارد کار نمی‌کند و به دلیل نحوهٔ زمان‌بندی به‌روزرسانی‌ها در ری‌اکت، پیش‌بینی زمانی که می‌توانید از نسخهٔ همگام استفاده کنید دشوار است.

در آینده نسخهٔ همگام را منسوخ کرده و حذف خواهیم کرد.

</Note>

#### پارامترها {/*parameters*/}

* `async actFn`: یک تابع ناهمگام که رندرها یا تعاملات مربوط به کامپوننت‌های در حال تست را می‌پیچد. هر به‌روزرسانی‌ای که درون `actFn` ایجاد می‌شود، به یک صف act درونی اضافه می‌شود که سپس برای پردازش و اعمال هرگونه تغییر به DOM با هم flush می‌شوند. از آنجا که این تابع ناهمگام است، ری‌اکت همچنین هر کدی که از مرز ناهمگام (async boundary) عبور می‌کند را اجرا کرده و هر به‌روزرسانی زمان‌بندی‌شده را flush می‌کند.

#### مقادیر بازگشتی {/*returns*/}

`act` چیزی باز نمی‌گرداند.

## استفاده {/*usage*/}

هنگام تست یک کامپوننت، می‌توانید از `act` برای انجام assertion دربارهٔ خروجی آن استفاده کنید.

به‌عنوان مثال، فرض کنید این کامپوننت `Counter` را داریم؛ نمونه‌های استفادهٔ زیر نشان می‌دهند چگونه آن را تست کنید:

```js
function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(prev => prev + 1);
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  )
}
```

### رندر کردن کامپوننت‌ها در تست‌ها {/*rendering-components-in-tests*/}

برای تست خروجی رندر یک کامپوننت، رندر را درون `act()` بپیچید:

```js  {10,12}
import {act} from 'react';
import ReactDOMClient from 'react-dom/client';
import Counter from './Counter';

it('can render and update a counter', async () => {
  container = document.createElement('div');
  document.body.appendChild(container);
  
  // ✅ Render the component inside act().
  await act(() => {
    ReactDOMClient.createRoot(container).render(<Counter />);
  });
  
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');
});
```

در اینجا یک کانتینر می‌سازیم، آن را به document اضافه می‌کنیم، و کامپوننت `Counter` را درون `act()` رندر می‌کنیم. این اطمینان حاصل می‌کند که کامپوننت پیش از انجام assertionها رندر شده و افکت‌های آن اعمال شده‌اند.

استفاده از `act` تضمین می‌کند که تمام به‌روزرسانی‌ها پیش از انجام assertionها اعمال شده‌اند.

### دیسپچ کردن رویدادها در تست‌ها {/*dispatching-events-in-tests*/}

برای تست رویدادها، دیسپچ رویداد را درون `act()` بپیچید:

```js {14,16}
import {act} from 'react';
import ReactDOMClient from 'react-dom/client';
import Counter from './Counter';

it.only('can render and update a counter', async () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  await act( async () => {
    ReactDOMClient.createRoot(container).render(<Counter />);
  });
  
  // ✅ Dispatch the event inside act().
  await act(async () => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

در اینجا کامپوننت را با `act` رندر می‌کنیم، و سپس رویداد را درون یک `act()` دیگر دیسپچ می‌کنیم. این اطمینان حاصل می‌کند که تمام به‌روزرسانی‌های ناشی از رویداد پیش از انجام assertionها اعمال شده‌اند.

<Pitfall>

فراموش نکنید که دیسپچ رویدادهای DOM تنها زمانی کار می‌کند که کانتینر DOM به document اضافه شده باشد. می‌توانید از کتابخانه‌ای مانند [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) برای کاهش کدهای تکراری استفاده کنید.

</Pitfall>

## عیب‌یابی {/*troubleshooting*/}

### خطای «The current testing environment is not configured to support act»(...) را دریافت می‌کنم {/*error-the-current-testing-environment-is-not-configured-to-support-act*/}

استفاده از `act` نیازمند تنظیم `global.IS_REACT_ACT_ENVIRONMENT=true` در محیط تست شماست. این برای اطمینان از آن است که `act` تنها در محیط درست استفاده شود.

اگر این مقدار سراسری را تنظیم نکنید، خطایی مانند زیر می‌بینید:

<ConsoleBlock level="error">

Warning: The current testing environment is not configured to support act(...)

</ConsoleBlock>

برای رفع این مشکل، این را به فایل راه‌اندازی سراسری (global setup) تست‌های ری‌اکت خود اضافه کنید:

```js
global.IS_REACT_ACT_ENVIRONMENT=true
```

<Note>

در چارچوب‌های تست مانند [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)، `IS_REACT_ACT_ENVIRONMENT` از قبل برای شما تنظیم شده است.

</Note>
