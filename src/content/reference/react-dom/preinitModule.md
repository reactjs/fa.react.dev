---
title: preinitModule
---

<Note>

[فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/creating-a-react-app) اغلب بارگذاری منابع را برای شما مدیریت می‌کنند، بنابراین ممکن است لازم نباشد خودتان این API را فراخوانی کنید. برای جزئیات به مستندات فریم‌ورک خود مراجعه کنید.

</Note>

<Intro>

`preinitModule` به شما اجازه می‌دهد یک ماژول ESM را به‌صورت eager fetch و ارزیابی کنید.

```js
preinitModule("https://example.com/module.js", {as: "script"});
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `preinitModule(href, options)` {/*preinitmodule*/}

برای preinit کردن یک ماژول ESM، تابع `preinitModule` را از `react-dom` فراخوانی کنید.

```js
import { preinitModule } from 'react-dom';

function AppRoot() {
  preinitModule("https://example.com/module.js", {as: "script"});
  // ...
}

```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

تابع `preinitModule` به مرورگر راهنمایی می‌دهد که باید دانلود و اجرای ماژول داده‌شده را آغاز کند، که می‌تواند زمان را ذخیره کند. ماژول‌هایی که `preinit` می‌کنید هنگامی که دانلودشان تمام شود اجرا می‌شوند.

#### پارامترها {/*parameters*/}

* `href`: یک رشته. URL ماژولی که می‌خواهید دانلود و اجرا کنید.
* `options`: یک شیء. شامل پراپرتی‌های زیر است:
  *  `as`: یک رشتهٔ الزامی. باید `'script'` باشد.
  *  `crossOrigin`: یک رشته. [سیاست CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) که باید استفاده شود. مقادیر ممکن آن `anonymous` و `use-credentials` هستند.
  *  `integrity`: یک رشته. یک هش رمزنگاری‌شده از ماژول، برای [تأیید اصالت آن](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
  *  `nonce`: یک رشته. یک [nonce رمزنگاری‌شده برای اجازه دادن به ماژول](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) هنگام استفاده از یک Content Security Policy سخت‌گیرانه.

#### مقدار برگشتی {/*returns*/}

`preinitModule` چیزی برنمی‌گرداند.

#### نکات {/*caveats*/}

* چندین فراخوانی `preinitModule` با همان `href` همان اثر یک فراخوانی را دارد.
* در مرورگر، می‌توانید `preinitModule` را در هر شرایطی فراخوانی کنید: هنگام رندر یک کامپوننت، در یک افکت، در یک رویداد، و غیره.
* در رندر سمت سرور یا هنگام رندر کامپوننت‌های سرور، `preinitModule` فقط در صورتی اثر دارد که هنگام رندر یک کامپوننت یا در یک کانتکست ناهمگام (async) که از رندر یک کامپوننت نشئت گرفته فراخوانی شود. هر فراخوانی دیگر نادیده گرفته می‌شود.

---

## نحوهٔ استفاده {/*usage*/}

### پیش‌بارگذاری هنگام رندر {/*preloading-when-rendering*/}

اگر می‌دانید که یک کامپوننت یا فرزندان آن از یک ماژول خاص استفاده خواهند کرد و با ارزیابی شدن ماژول و در نتیجه اثرگذار فوری آن پس از دانلود موافقید، هنگام رندر کامپوننت `preinitModule` را فراخوانی کنید.

```js
import { preinitModule } from 'react-dom';

function AppRoot() {
  preinitModule("https://example.com/module.js", {as: "script"});
  return ...;
}
```

اگر می‌خواهید مرورگر ماژول را دانلود کند اما بلافاصله اجرا نکند، از [`preloadModule`](/reference/react-dom/preloadModule) استفاده کنید. اگر می‌خواهید اسکریپتی را preinit کنید که یک ماژول ESM نیست، از [`preinit`](/reference/react-dom/preinit) استفاده کنید.

### پیش‌بارگذاری در یک رویداد {/*preloading-in-an-event-handler*/}

`preinitModule` را در یک رویداد پیش از انتقال به صفحه یا استیتی که ماژول در آن لازم خواهد بود، فراخوانی کنید. این کار فرآیند را زودتر از زمانی که در حین رندر صفحه یا استیت جدید فراخوانی کنید، آغاز می‌کند.

```js
import { preinitModule } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preinitModule("https://example.com/module.js", {as: "script"});
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```
