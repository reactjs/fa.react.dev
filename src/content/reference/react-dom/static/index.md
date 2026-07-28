---
title: APIهای استاتیک React DOM
---

<Intro>

APIهای `react-dom/static` به شما اجازه می‌دهند HTML استاتیک برای کامپوننت‌های ری‌اکت تولید کنید. آن‌ها در مقایسه با APIهای استریمی قابلیت‌های محدودی دارند. یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) ممکن است آن‌ها را برای شما فراخوانی کند. بیشتر کامپوننت‌های شما نیازی به import یا استفاده از آن‌ها ندارند.

</Intro>

---

## APIهای استاتیک برای Web Streams {/*static-apis-for-web-streams*/}

این متدها فقط در محیط‌هایی با [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) قابل دسترسی هستند، که شامل مرورگرها، Deno، و برخی runtimeهای مرزی (edge) مدرن می‌شود:

* [`prerender`](/reference/react-dom/static/prerender) یک درخت ری‌اکت را به HTML استاتیک با یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) رندر می‌کند.


---

## APIهای استاتیک برای Node.js Streams {/*static-apis-for-nodejs-streams*/}

این متدها فقط در محیط‌هایی با [Node.js Streams](https://nodejs.org/api/stream.html) قابل دسترسی هستند:

* [`prerenderToNodeStream`](/reference/react-dom/static/prerenderToNodeStream) یک درخت ری‌اکت را به HTML استاتیک با یک [Node.js Stream](https://nodejs.org/api/stream.html) رندر می‌کند.

