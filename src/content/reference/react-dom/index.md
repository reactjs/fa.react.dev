---
title: APIهای React DOM
---

<Intro>

پکیج `react-dom` شامل متدهایی است که فقط برای اپلیکیشن‌های وب (که در محیط DOM مرورگر اجرا می‌شوند) پشتیبانی می‌شوند. این متدها برای React Native پشتیبانی نمی‌شوند.

</Intro>

---

## APIها {/*apis*/}

این APIها را می‌توانید از کامپوننت‌های خود import کنید. این‌ها به‌ندرت استفاده می‌شوند:

* [`createPortal`](/reference/react-dom/createPortal) به شما اجازه می‌دهد کامپوننت‌های فرزند را در بخش متفاوتی از درخت DOM رندر کنید.
* [`flushSync`](/reference/react-dom/flushSync) به شما اجازه می‌دهد ری‌اکت را مجبور کنید یک به‌روزرسانی استیت را اعمال کرده و DOM را به‌صورت همگام به‌روزرسانی کنید.

## APIهای پیش‌بارگذاری منابع {/*resource-preloading-apis*/}

از این APIها می‌توان برای سریع‌تر کردن اپلیکیشن‌ها با پیش‌بارگذاری منابعی مانند اسکریپت‌ها، stylesheetها و فونت‌ها به‌محض اینکه می‌دانید به آن‌ها نیاز دارید، استفاده کرد، مثلاً پیش از پیمایش به صفحه‌ای دیگر که منابع در آن استفاده خواهند شد.

[فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/creating-a-react-app) اغلب بارگذاری منابع را برای شما مدیریت می‌کنند، بنابراین ممکن است لازم نباشد خودتان این APIها را فراخوانی کنید. برای جزئیات به مستندات فریم‌ورک خود مراجعه کنید.

* [`prefetchDNS`](/reference/react-dom/prefetchDNS) به شما اجازه می‌دهد آدرس IP یک نام دامنهٔ DNS را که انتظار دارید به آن متصل شوید، پیش‌بارگذاری کنید.
* [`preconnect`](/reference/react-dom/preconnect) به شما اجازه می‌دهد به سروری که انتظار دارید منابعی را از آن درخواست کنید متصل شوید، حتی اگر هنوز نمی‌دانید به چه منابعی نیاز خواهید داشت.
* [`preload`](/reference/react-dom/preload) به شما اجازه می‌دهد یک stylesheet، فونت، تصویر، یا اسکریپت خارجی را که انتظار دارید استفاده کنید، fetch کنید.
* [`preloadModule`](/reference/react-dom/preloadModule) به شما اجازه می‌دهد یک ماژول ESM را که انتظار دارید استفاده کنید، fetch کنید.
* [`preinit`](/reference/react-dom/preinit) به شما اجازه می‌دهد یک اسکریپت خارجی را fetch و ارزیابی کنید، یا یک stylesheet را fetch و در سند درج کنید.
* [`preinitModule`](/reference/react-dom/preinitModule) به شما اجازه می‌دهد یک ماژول ESM را fetch و ارزیابی کنید.

---

## نقاط ورود {/*entry-points*/}

پکیج `react-dom` دو نقطهٔ ورود اضافی فراهم می‌کند:

* [`react-dom/client`](/reference/react-dom/client) شامل APIهایی برای رندر کامپوننت‌های ری‌اکت روی کلاینت (در مرورگر) است.
* [`react-dom/server`](/reference/react-dom/server) شامل APIهایی برای رندر کامپوننت‌های ری‌اکت روی سرور است.

---

## APIهای حذف‌شده {/*removed-apis*/}

این APIها در ری‌اکت ۱۹ حذف شده‌اند:

* [`findDOMNode`](https://18.react.dev/reference/react-dom/findDOMNode): [جایگزین‌ها](https://18.react.dev/reference/react-dom/findDOMNode#alternatives) را ببینید.
* [`hydrate`](https://18.react.dev/reference/react-dom/hydrate): به‌جای آن از [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) استفاده کنید.
* [`render`](https://18.react.dev/reference/react-dom/render): به‌جای آن از [`createRoot`](/reference/react-dom/client/createRoot) استفاده کنید.
* [`unmountComponentAtNode`](https://18.react.dev/reference/react-dom/unmountComponentAtNode): به‌جای آن از [`root.unmount()`](/reference/react-dom/client/createRoot#root-unmount) استفاده کنید.
* [`renderToNodeStream`](https://18.react.dev/reference/react-dom/server/renderToNodeStream): به‌جای آن از APIهای [`react-dom/server`](/reference/react-dom/server) استفاده کنید.
* [`renderToStaticNodeStream`](https://18.react.dev/reference/react-dom/server/renderToStaticNodeStream): به‌جای آن از APIهای [`react-dom/server`](/reference/react-dom/server) استفاده کنید.
