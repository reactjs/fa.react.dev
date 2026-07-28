---
title: preconnect
---

<Intro>

`preconnect` به شما اجازه می‌دهد به‌صورت eager به سروری که انتظار دارید منابع را از آن بارگذاری کنید، متصل شوید.

```js
preconnect("https://example.com");
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `preconnect(href)` {/*preconnect*/}

برای preconnect کردن به یک هاست، تابع `preconnect` را از `react-dom` فراخوانی کنید.

```js
import { preconnect } from 'react-dom';

function AppRoot() {
  preconnect("https://example.com");
  // ...
}

```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

تابع `preconnect` به مرورگر راهنمایی می‌دهد که باید یک اتصال به سرور داده‌شده باز کند. اگر مرورگر این کار را انجام دهد، می‌تواند بارگذاری منابع از آن سرور را تسریع کند.

#### پارامترها {/*parameters*/}

* `href`: یک رشته. URL سروری که می‌خواهید به آن متصل شوید.


#### مقدار برگشتی {/*returns*/}

`preconnect` چیزی برنمی‌گرداند.

#### نکات {/*caveats*/}

* چندین فراخوانی `preconnect` با همان سرور همان اثر یک فراخوانی را دارد.
* در مرورگر، می‌توانید `preconnect` را در هر شرایطی فراخوانی کنید: هنگام رندر یک کامپوننت، در یک افکت، در یک رویداد، و غیره.
* در رندر سمت سرور یا هنگام رندر کامپوننت‌های سرور، `preconnect` فقط در صورتی اثر دارد که هنگام رندر یک کامپوننت یا در یک کانتکست ناهمگام (async) که از رندر یک کامپوننت نشئت گرفته فراخوانی شود. هر فراخوانی دیگر نادیده گرفته می‌شود.
* اگر منابع خاصی را که نیاز خواهید داشت می‌دانید، می‌توانید به‌جای آن از [توابع دیگر](/reference/react-dom/#resource-preloading-apis) استفاده کنید که بلافاصله بارگذاری منابع را آغاز می‌کنند.
* هیچ فایده‌ای در preconnect کردن به همان سروری که خود صفحهٔ وب روی آن میزبانی می‌شود وجود ندارد، زیرا تا زمانی که راهنمایی داده شود قبلاً به آن متصل شده است.

---

## نحوهٔ استفاده {/*usage*/}

### preconnect کردن هنگام رندر {/*preconnecting-when-rendering*/}

اگر می‌دانید که فرزندان یک کامپوننت منابع خارجی را از آن هاست بارگذاری خواهند کرد، هنگام رندر کامپوننت `preconnect` را فراخوانی کنید.

```js
import { preconnect } from 'react-dom';

function AppRoot() {
  preconnect("https://example.com");
  return ...;
}
```

### preconnect کردن در یک رویداد {/*preconnecting-in-an-event-handler*/}

`preconnect` را در یک رویداد پیش از انتقال به صفحه یا استیتی که منابع خارجی در آن لازم خواهد بود، فراخوانی کنید. این کار فرآیند را زودتر از زمانی که در حین رندر صفحه یا استیت جدید فراخوانی کنید، آغاز می‌کند.

```js
import { preconnect } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preconnect('http://example.com');
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```
