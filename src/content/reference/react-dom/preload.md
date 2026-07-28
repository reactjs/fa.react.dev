---
title: preload
---

<Note>

[فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/creating-a-react-app) اغلب بارگذاری منابع را برای شما مدیریت می‌کنند، بنابراین ممکن است لازم نباشد خودتان این API را فراخوانی کنید. برای جزئیات به مستندات فریم‌ورک خود مراجعه کنید.

</Note>

<Intro>

`preload` به شما اجازه می‌دهد منبعی مانند stylesheet، فونت، یا اسکریپت خارجی را که انتظار دارید استفاده کنید، به‌صورت eager ( preorder ) بارگذاری کنید.

```js
preload("https://example.com/font.woff2", {as: "font"});
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `preload(href, options)` {/*preload*/}

برای پیش‌بارگذاری (preload) یک منبع، تابع `preload` را از `react-dom` فراخوانی کنید.

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/font.woff2", {as: "font"});
  // ...
}

```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

تابع `preload` به مرورگر راهنمایی می‌دهد که باید دانلود منبع داده‌شده را آغاز کند، که می‌تواند زمان را ذخیره کند.

#### پارامترها {/*parameters*/}

* `href`: یک رشته. URL منبعی که می‌خواهید دانلود کنید.
* `options`: یک شیء. شامل پراپرتی‌های زیر است:
  *  `as`: یک رشتهٔ الزامی. نوع منبع. [مقادیر ممکن](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#as) آن عبارت‌اند از: `audio`, `document`, `embed`, `fetch`, `font`, `image`, `object`, `script`, `style`, `track`, `video`, `worker`.
  *  `crossOrigin`: یک رشته. [سیاست CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) که باید استفاده شود. مقادیر ممکن آن `anonymous` و `use-credentials` هستند. این پراپرتی وقتی `as` برابر `"fetch"` باشد الزامی است.
  *  `referrerPolicy`: یک رشته. [هدر Referrer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#referrerpolicy) که هنگام fetch باید ارسال شود. مقادیر ممکن آن `no-referrer-when-downgrade` (پیش‌فرض)، `no-referrer`، `origin`، `origin-when-cross-origin`، و `unsafe-url` هستند.
  *  `integrity`: یک رشته. یک هش رمزنگاری‌شده از منبع، برای [تأیید اصالت آن](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
  *  `type`: یک رشته. نوع MIME منبع.
  *  `nonce`: یک رشته. یک [nonce رمزنگاری‌شده برای اجازه دادن به منبع](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) هنگام استفاده از یک Content Security Policy سخت‌گیرانه.
  *  `fetchPriority`: یک رشته. اولویت نسبی برای fetch کردن منبع را پیشنهاد می‌دهد. مقادیر ممکن `auto` (پیش‌فرض)، `high`، و `low` هستند.
  *  `imageSrcSet`: یک رشته. فقط برای استفاده با `as: "image"`. [مجموعهٔ منبع تصویر](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) را مشخص می‌کند.
  *  `imageSizes`: یک رشته. فقط برای استفاده با `as: "image"`. [اندازه‌های تصویر](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) را مشخص می‌کند.

#### مقدار برگشتی {/*returns*/}

`preload` چیزی برنمی‌گرداند.

#### نکات {/*caveats*/}

* چندین فراخوانی معادل `preload` همان اثر یک فراخوانی را دارد. فراخوانی‌های `preload` بر اساس قوانین زیر معادل در نظر گرفته می‌شوند:
  * دو فراخوانی اگر `href` یکسان داشته باشند معادل هستند، مگر:
  * اگر `as` برابر `image` باشد، دو فراخوانی اگر `href`، `imageSrcSet`، و `imageSizes` یکسان داشته باشند معادل هستند.
* در مرورگر، می‌توانید `preload` را در هر شرایطی فراخوانی کنید: هنگام رندر یک کامپوننت، در یک افکت، در یک رویداد، و غیره.
* در رندر سمت سرور یا هنگام رندر کامپوننت‌های سرور، `preload` فقط در صورتی اثر دارد که هنگام رندر یک کامپوننت یا در یک کانتکست ناهمگام (async) که از رندر یک کامپوننت نشئت گرفته فراخوانی شود. هر فراخوانی دیگر نادیده گرفته می‌شود.

---

## نحوهٔ استفاده {/*usage*/}

### پیش‌بارگذاری هنگام رندر {/*preloading-when-rendering*/}

اگر می‌دانید که یک کامپوننت یا فرزندان آن از یک منبع خاص استفاده خواهند کرد، هنگام رندر آن کامپوننت `preload` را فراخوانی کنید.

<Recipes titleText="نمونه‌های پیش‌بارگذاری">

#### پیش‌بارگذاری یک اسکریپت خارجی {/*preloading-an-external-script*/}

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/script.js", {as: "script"});
  return ...;
}
```

اگر می‌خواهید مرورگر بلافاصله اجرای اسکریپت را آغاز کند (به‌جای صرفاً دانلود آن)، از [`preinit`](/reference/react-dom/preinit) استفاده کنید. اگر می‌خواهید یک ماژول ESM را بارگذاری کنید، از [`preloadModule`](/reference/react-dom/preloadModule) استفاده کنید.

<Solution />

#### پیش‌بارگذاری یک stylesheet {/*preloading-a-stylesheet*/}

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/style.css", {as: "style"});
  return ...;
}
```

اگر می‌خواهید stylesheet بلافاصله در سند درج شود (یعنی مرورگر بلافاصله تجزیهٔ آن را آغاز کند به‌جای صرفاً دانلود آن)، از [`preinit`](/reference/react-dom/preinit) استفاده کنید.

<Solution />

#### پیش‌بارگذاری یک فونت {/*preloading-a-font*/}

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("https://example.com/style.css", {as: "style"});
  preload("https://example.com/font.woff2", {as: "font"});
  return ...;
}
```

اگر یک stylesheet را پیش‌بارگذاری می‌کنید، هوشمندانه است که هر فونتی که stylesheet به آن ارجاع می‌دهد را نیز پیش‌بارگذاری کنید. به این ترتیب، مرورگر می‌تواند پیش از آنکه stylesheet را دانلود و تجزیه کند، دانلود فونت را آغاز کند.

<Solution />

#### پیش‌بارگذاری یک تصویر {/*preloading-an-image*/}

```js
import { preload } from 'react-dom';

function AppRoot() {
  preload("/banner.png", {
    as: "image",
    imageSrcSet: "/banner512.png 512w, /banner1024.png 1024w",
    imageSizes: "(max-width: 512px) 512px, 1024px",
  });
  return ...;
}
```

هنگام پیش‌بارگذاری یک تصویر، گزینه‌های `imageSrcSet` و `imageSizes` به مرورگر کمک می‌کنند [تصویر با اندازهٔ درست برای اندازهٔ صفحه را fetch کند](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

<Solution />

</Recipes>

### پیش‌بارگذاری در یک رویداد {/*preloading-in-an-event-handler*/}

`preload` را در یک رویداد پیش از انتقال به صفحه یا استیتی که منابع خارجی در آن لازم خواهد بود، فراخوانی کنید. این کار فرآیند را زودتر از زمانی که در حین رندر صفحه یا استیت جدید فراخوانی کنید، آغاز می‌کند.

```js
import { preload } from 'react-dom';

function CallToAction() {
  const onClick = () => {
    preload("https://example.com/wizardStyles.css", {as: "style"});
    startWizard();
  }
  return (
    <button onClick={onClick}>Start Wizard</button>
  );
}
```
