---
title: APIهای React DOM سرور
---

<Intro>

APIهای `react-dom/server` به شما اجازه می‌دهند کامپوننت‌های ری‌اکت را به‌صورت سمت سرور به HTML رندر کنید. این APIها فقط روی سرور در سطح بالای اپلیکیشن شما برای تولید HTML اولیه استفاده می‌شوند. یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) ممکن است آن‌ها را برای شما فراخوانی کند. بیشتر کامپوننت‌های شما نیازی به import یا استفاده از آن‌ها ندارند.

</Intro>

---

## APIهای سرور برای Node.js Streams {/*server-apis-for-nodejs-streams*/}

این متدها فقط در محیط‌هایی با [Node.js Streams](https://nodejs.org/api/stream.html) قابل دسترسی هستند:

* [`renderToPipeableStream`](/reference/react-dom/server/renderToPipeableStream) یک درخت ری‌اکت را به یک [Node.js Stream](https://nodejs.org/api/stream.html) قابل pipe رندر می‌کند.

---

## APIهای سرور برای Web Streams {/*server-apis-for-web-streams*/}

این متدها فقط در محیط‌هایی با [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) قابل دسترسی هستند، که شامل مرورگرها، Deno، و برخی runtimeهای مرزی (edge) مدرن می‌شود:

* [`renderToReadableStream`](/reference/react-dom/server/renderToReadableStream) یک درخت ری‌اکت را به یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) رندر می‌کند.

---

## APIهای سرور قدیمی برای محیط‌های بدون استریم {/*legacy-server-apis-for-non-streaming-environments*/}

این متدها می‌توانند در محیط‌هایی که از streamها پشتیبانی نمی‌کنند استفاده شوند:

* [`renderToString`](/reference/react-dom/server/renderToString) یک درخت ری‌اکت را به یک رشته رندر می‌کند.
* [`renderToStaticMarkup`](/reference/react-dom/server/renderToStaticMarkup) یک درخت غیرتعاملی ری‌اکت را به یک رشته رندر می‌کند.

آن‌ها در مقایسه با APIهای استریمی، قابلیت‌های محدودی دارند.
