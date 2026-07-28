---
title: preinit
---

<Note>

[فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/creating-a-react-app) اغلب بارگذاری منابع را برای شما مدیریت می‌کنند، بنابراین ممکن است لازم نباشد خودتان این API را فراخوانی کنید. برای جزئیات به مستندات فریم‌ورک خود مراجعه کنید.

</Note>

<Intro>

`preinit` به شما اجازه می‌دهد یک stylesheet یا اسکریپت خارجی را به‌صورت eager fetch و ارزیابی کنید.

```js
preinit("https://example.com/script.js", {as: "script"});
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `preinit(href, options)` {/*preinit*/}

برای preinit کردن یک اسکریپت یا stylesheet، تابع `preinit` را از `react-dom` فراخوانی کنید.

```js
import { preinit } from 'react-dom';

function AppRoot() {
  preinit("https://example.com/script.js", {as: "script"});
  // ...
}

```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

تابع `preinit` به مرورگر راهنمایی می‌دهد که باید دانلود و اجرای منبع داده‌شده را آغاز کند، که می‌تواند زمان را ذخیره کند. اسکریپت‌هایی که `preinit` می‌کنید هنگامی که دانلودشان تمام شود اجرا می‌شوند. stylesheetهایی که preinit می‌کنید در سند درج می‌شوند، که باعث می‌شود بلافاصله اثر بگذارند.

#### پارامترها {/*parameters*/}

* `href`: یک رشته. URL منبعی که می‌خواهید دانلود و اجرا کنید.
* `options`: یک شیء. شامل پراپرتی‌های زیر است:
  *  `as`: یک رشتهٔ الزامی. نوع منبع. مقادیر ممکن آن `script` و `style` هستند.
  * `precedence`: یک رشته. برای stylesheetها الزامی است. مشخص می‌کند stylesheet نسبت به بقیه کجا درج شود. stylesheetهایی با اولویت بالاتر می‌توانند آن‌هایی با اولویت پایین‌تر را نادیده بگیرند. مقادیر ممکن `reset`، `low`، `medium`، `high` هستند.
  *  `crossOrigin`: یک رشته. [سیاست CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) که باید استفاده شود. مقادیر ممکن آن `anonymous` و `use-credentials` هستند.
  *  `integrity`: یک رشته. یک هش رمزنگاری‌شده از منبع، برای [تأیید اصالت آن](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
  *  `nonce`: یک رشته. یک [nonce رمزنگاری‌شده برای اجازه دادن به منبع](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) هنگام استفاده از یک Content Security Policy سخت‌گیرانه.
  *  `fetchPriority`: یک رشته. اولویت نسبی برای fetch کردن منبع را پیشنهاد می‌دهد. مقادیر ممکن `auto` (پیش‌فرض)، `high`، و `low` هستند.

#### مقدار برگشتی {/*returns*/}

`preinit` چیزی برنمی‌گرداند.

#### نکات {/*caveats*/}

* چندین فراخوانی `preinit` با همان `href` همان اثر یک فراخوانی را دارد.
* در مرورگر، می‌توانید `preinit` را در هر شرایطی فراخوانی کنید: هنگام رندر یک کامپوننت، در یک افکت، در یک رویداد، و غیره.
* در رندر سمت سرور یا هنگام رندر کامپوننت‌های سرور، `preinit` فقط در صورتی اثر دارد که هنگام رندر یک کامپوننت یا در یک کانتکست ناهمگام (async) که از رندر یک کامپوننت نشئت گرفته فراخوانی شود. هر فراخوانی دیگر نادیده گرفته می‌شود.

---

## نحوهٔ استفاده {/*usage*/}

### preinit کردن هنگام رندر {/*preiniting-when-rendering*/}

اگر می‌دانید که یک کامپوننت یا فرزندان آن از یک منبع خاص استفاده خواهند کرد و با ارزیابی شدن منبع و در نتیجه اثرگذار فوری آن پس از دانلود موافقید، هنگام رندر کامپوننت `preinit` را فراخوانی کنید.

<Recipes titleText="نمونه‌های preinit">

#### preinit کردن یک اسکریپت خارجی {/*preiniting-an-external-script*/}

```js
import { preinit } from 'react-dom';

function AppRoot() {
  preinit("https://example.com/script.js", {as: "script"});
  return ...;
}
```

اگر می‌خواهید مرورگر اسکریپت را دانلود کند اما بلافاصله اجرا نکند، از [`preload`](/reference/react-dom/preload) استفاده کنید. اگر می‌خواهید یک ماژول ESM را بارگذاری کنید، از [`preinitModule`](/reference/react-dom/preinitModule) استفاده کنید.

<Solution />

#### preinit کردن یک stylesheet {/*preiniting-a-stylesheet*/}

```js
import { preinit } from 'react-dom';

function AppRoot() {
  preinit("https://example.com/style.css", {as: "style", precedence: "medium"});
  return ...;
}
```

گزینهٔ `precedence` که الزامی است، به شما اجازه می‌دهد ترتیب stylesheetها درون سند را کنترل کنید. stylesheetهایی با اولویت بالاتر می‌توانند آن‌هایی با اولویت پایین‌تر را نادیده بگیرند.

اگر می‌خواهید stylesheet را دانلود کنید اما بلافاصله در سند درج نکنید، از [`preload`](/reference/react-dom/preload) استفاده کنید.

<Solution />

</Recipes>

### preinit کردن در یک رویداد {/*preiniting-in-an-event-handler*/}

`preinit` را در یک رویداد پیش از انتقال به صفحه یا استیتی که منابع خارجی در آن لازم خواهد بود، فراخوانی کنید. این کار فرآیند را زودتر از زمانی که در حین رندر صفحه یا استیت جدید فراخوانی کنید، آغاز می‌کند.

```js
import { preinit } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preinit("https://example.com/wizardStyles.css", {as: "style"});
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```
