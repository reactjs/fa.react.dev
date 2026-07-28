---
title: prefetchDNS
---

<Intro>

`prefetchDNS` به شما اجازه می‌دهد IP سروری را که انتظار دارید منابع را از آن بارگذاری کنید، به‌صورت eager جستجو کنید.

```js
prefetchDNS("https://example.com");
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `prefetchDNS(href)` {/*prefetchdns*/}

برای جستجوی یک هاست، تابع `prefetchDNS` را از `react-dom` فراخوانی کنید.

```js
import { prefetchDNS } from 'react-dom';

function AppRoot() {
  prefetchDNS("https://example.com");
  // ...
}

```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

تابع prefetchDNS به مرورگر راهنمایی می‌دهد که باید آدرس IP یک سرور داده‌شده را جستجو کند. اگر مرورگر این کار را انجام دهد، می‌تواند بارگذاری منابع از آن سرور را تسریع کند.

#### پارامترها {/*parameters*/}

* `href`: یک رشته. URL سروری که می‌خواهید به آن متصل شوید.

#### مقدار برگشتی {/*returns*/}

`prefetchDNS` چیزی برنمی‌گرداند.

#### نکات {/*caveats*/}

* چندین فراخوانی `prefetchDNS` با همان سرور همان اثر یک فراخوانی را دارد.
* در مرورگر، می‌توانید `prefetchDNS` را در هر شرایطی فراخوانی کنید: هنگام رندر یک کامپوننت، در یک افکت، در یک رویداد، و غیره.
* در رندر سمت سرور یا هنگام رندر کامپوننت‌های سرور، `prefetchDNS` فقط در صورتی اثر دارد که هنگام رندر یک کامپوننت یا در یک کانتکست ناهمگام (async) که از رندر یک کامپوننت نشئت گرفته فراخوانی شود. هر فراخوانی دیگر نادیده گرفته می‌شود.
* اگر منابع خاصی را که نیاز خواهید داشت می‌دانید، می‌توانید به‌جای آن از [توابع دیگر](/reference/react-dom/#resource-preloading-apis) استفاده کنید که بلافاصله بارگذاری منابع را آغاز می‌کنند.
* هیچ فایده‌ای در prefetch کردن همان سروری که خود صفحهٔ وب روی آن میزبانی می‌شود وجود ندارد، زیرا تا زمانی که راهنمایی داده شود قبلاً جستجو شده است.
* در مقایسه با [`preconnect`](/reference/react-dom/preconnect)، `prefetchDNS` ممکن است بهتر باشد اگر در حال اتصال حدسی به تعداد زیادی دامنه هستید، که در این حالت سربار preconnectها ممکن است از منفعت آن بیشتر شود.

---

## نحوهٔ استفاده {/*usage*/}

### prefetch کردن DNS هنگام رندر {/*prefetching-dns-when-rendering*/}

اگر می‌دانید که فرزندان یک کامپوننت منابع خارجی را از آن هاست بارگذاری خواهند کرد، هنگام رندر کامپوننت `prefetchDNS` را فراخوانی کنید.

```js
import { prefetchDNS } from 'react-dom';

function AppRoot() {
  prefetchDNS("https://example.com");
  return ...;
}
```

### prefetch کردن DNS در یک رویداد {/*prefetching-dns-in-an-event-handler*/}

`prefetchDNS` را در یک رویداد پیش از انتقال به صفحه یا استیتی که منابع خارجی در آن لازم خواهد بود، فراخوانی کنید. این کار فرآیند را زودتر از زمانی که در حین رندر صفحه یا استیت جدید فراخوانی کنید، آغاز می‌کند.

```js
import { prefetchDNS } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    prefetchDNS('http://example.com');
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```
