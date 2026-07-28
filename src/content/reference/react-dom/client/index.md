---
title: APIهای کلاینت React DOM
---

<Intro>

APIهای `react-dom/client` به شما اجازه می‌دهند کامپوننت‌های ری‌اکت را روی کلاینت (در مرورگر) رندر کنید. این APIها معمولاً در سطح بالای اپلیکیشن شما برای راه‌اندازی درخت ری‌اکت استفاده می‌شوند. یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) ممکن است آن‌ها را برای شما فراخوانی کند. بیشتر کامپوننت‌های شما نیازی به import یا استفاده از آن‌ها ندارند.

</Intro>

---

## APIهای کلاینت {/*client-apis*/}

* [`createRoot`](/reference/react-dom/client/createRoot) به شما اجازه می‌دهد یک root برای نمایش کامپوننت‌های ری‌اکت داخل یک نود DOM مرورگر ایجاد کنید.
* [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) به شما اجازه می‌دهد کامپوننت‌های ری‌اکت را داخل یک نود DOM مرورگر که محتوای HTML آن قبلاً توسط [`react-dom/server`](/reference/react-dom/server) تولید شده، نمایش دهید.

---

## پشتیبانی مرورگر {/*browser-support*/}

ری‌اکت از همهٔ مرورگرهای محبوب، از جمله Internet Explorer 9 و بالاتر پشتیبانی می‌کند. برای مرورگرهای قدیمی مانند IE 9 و IE 10 برخی polyfillها لازم هستند.
