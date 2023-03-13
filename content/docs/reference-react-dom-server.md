---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

آبجکت `ReactDOMServer` این امکان را فراهم می‌کند تا کامپوننت های خود را به حالت استاتیک رندر کنید. این معمولا در سرور  Node استفاده می‌شود.

```js
// ES modules
import * as ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## مرور کلی{#overview}

<<<<<<< HEAD
این متدها فقط در **محیط‌های دارای [Node.js Streams](https://nodejs.dev/learn/nodejs-streams) در دسترس هستند:**
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.org/api/stream.html):**
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (کنارگذاشته‌شده)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

این متدها فقط در **محیط‌های دارای [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) موجود هستند** (این شامل مرورگرها، Deno، و برخی ران‌تایم‌های edge مدرن است):

- [`renderToReadableStream()`](#rendertoreadablestream)

متدهای زیر را می‌توان در محیط‌هایی که از استریم پشتیبانی نمی‌کنند استفاده کرد:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

## مرجع {#reference}

### `renderToPipeableStream()` {#rendertopipeablestream}

> Try the new React documentation for [`renderToPipeableStream`](https://beta.reactjs.org/reference/react-dom/server/renderToPipeableStream).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

یک المنت React را به HTML اولیه آن رندر می‌کند. یک استریم را که دارای متد `pipe(res)` برای لوله‌سازی خروجی و `abort()` برای لغو درخواست برمی‌گرداند. به طور کامل از تعلیق (suspense) و استریم HTML با بلاک‌های محتوای "تأخیر افتاده" که بعداً از طریق تگ‌های`<script>` این‌لاین ظاهر می‌شوند، پشتیبانی می‌کند. [بیشتر بخوانید](https://github.com/reactwg/react-18/discussions/37)

اگر [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) را روی گره‌ای (node) که قبلاً این نشانه‌گذاری ارائه‌شده توسط سرور را دارد، فراخوانی کنید، React آن را حفظ می‌کند و فقط کنترل‌کننده‌های رویداد (event handlers) را پیوست می‌کند و به شما این امکان برای داشتن یک تجربه اولین لود کارآمد را خواهد داد.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // محتوای بالای تمام مرزهای Suspense آماده است.
      // اگر قبل از شروع استریم، مشکلی رخ داده باشد، کد خطا را به طور مناسب تنظیم می کنیم.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // قبل از اینکه بتوانیم پوسته (shell) را تکمیل کنیم، مشکلی رخ داده است، بنابراین یک پوسته (shell) جایگزین منتشر می کنیم.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // اگر نمی خواهید استریم داشته باشید، به جای onShellReady از این استفاده کنید.
      // این پس از آماده شدن کل محتوای صفحه فعال می شود.
      // می توانید از آن برای خزنده‌ها (crawlers) یا تولید استاتیک استفاده کنید.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

[لیست کامل گزینه‌ها](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#63) را ببینید.

> نکته:
>
> این یک API ویژه Node.js است. محیط‌های دارای [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)، مانند Deno و رانتایم‌های edge مدرن، باید به جای آن از [`renderToReadableStream`](#rendertoreadablestream) استفاده کنند.
>

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

> Try the new React documentation for [`renderToReadableStream`](https://beta.reactjs.org/reference/react-dom/server/renderToReadableStream).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

یک المنت React را به HTML اولیه آن ارسال می کند. یک Promise را برمی‌گرداند که به یک [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) حل (resolve) می‌شود. به طور کامل از Suspense و استریم HTML پشتیبانی می کند. [بیشتر بخوانید](https://github.com/reactwg/react-18/discussions/127)

اگر [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) را روی گره‌ای (node) که قبلاً این نشانه‌گذاری ارائه‌شده توسط سرور را دارد، فراخوانی کنید، React آن را حفظ می‌کند و فقط کنترل‌کننده‌های رویداد (event handlers) را پیوست می‌کند و به شما این امکان برای داشتن یک تجربه اولین لود کارآمد را خواهد داد.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // این برای منتظر ماندن است تا تمام مرزهای Suspense آماده شوند.
  // اگر می‌خواهید به جای استریم، کل HTML را بافر کنید، می‌توانید این خط را از حالت نظر خارج کنید.
  // می توانید از این برای خزنده‌ها (crawlers) یا تولید استاتیک استفاده کنید:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```

به [لیست کامل گزینه‌ها](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35) مراجعه کنید.

> نکته:
>
> این API به [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) بستگی دارد. برای Node.js، به جای آن از [`renderToPipeableStream`](#rendertopipeablestream) استفاده کنید.
>

* * *

### `renderToNodeStream()`  (کنارگذاشته‌شده) {#rendertonodestream}

> Try the new React documentation for [`renderToNodeStream`](https://beta.reactjs.org/reference/react-dom/server/renderToNodeStream).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر می‌کند. ری‌اکت یک [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) را به شما باز خواهد گرداند که یک استرینگ HTML را به عنوان خروجی می‌دهد. HTML ساخته شده با این متد دقیقا همانی خواهد بود که [`ReactDOMServer.renderToString`](#rendertostring) می‌توانست به شما بدهد. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) را روی گره‌ای (node) که قبلاً این نشانه‌گذاری ارائه‌شده توسط سرور را دارد، فراخوانی کنید، React آن را حفظ می‌کند و فقط کنترل‌کننده‌های رویداد (event handlers) را پیوست می‌کند و به شما این امکان برای داشتن یک تجربه اولین لود کارآمد را خواهد داد.

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
>استریم باز گردانده شده از این متد، یک استریم بایت با انکدینگ utf-8 خواهد بود. اگر به انکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر انکدینگ متن در اختیار شما قرار می‌دهد.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

> Try the new React documentation for [`renderToStaticNodeStream`](https://beta.reactjs.org/reference/react-dom/server/renderToStaticNodeStream).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

این مشابه [`renderToNodeStream`](#rendertonodestream) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

HTML ساخته شده توسط این استریم دقیقا همانی است که [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) می‌توانست برای شما بسازد.

اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سمت سرور از [`renderToNodeStream`](#rendertonodestream) و در سمت کاربر از [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) استفاده کنید.

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
>استریم باز گردانده شده از این متد، یک استریم بایت با انکدینگ utf-8 خواهد بود. اگر به انکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر انکدینگ متن در اختیار شما قرار می‌دهد.

* * *

### `renderToString()` {#rendertostring}

> Try the new React documentation for [`renderToString`](https://beta.reactjs.org/reference/react-dom/server/renderToString).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToString(element)
```

یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک استرینگ HTML به شما باز خواهد گرداند. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  

> نکته
>
> این API پشتیبانی محدودی از Suspense دارد و از استریم پشتیبانی نمی‌کند.
>
> در سرور، توصیه می شود به جای آن از [`renderToPipeableStream`](#rendertopipeablestream) (برای Node.js) یا [`renderToReadableStream`](#rendertoreadablestream) (برای استریم‌های های وب) استفاده کنید.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

> Try the new React documentation for [`renderToStaticMarkup`](https://beta.reactjs.org/reference/react-dom/server/renderToStaticMarkup).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

این مشابه [`renderToString`](#rendertostring) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToString`](#rendertostring) و در سمت کاربر از [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) استفاده کنید.
