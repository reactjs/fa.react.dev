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


<<<<<<< HEAD
## مرور کلی{#overview}

متدهای زیر هم در محیط مرورگر و هم سرور قابل استفاده هستند:
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.dev/learn/nodejs-streams):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
این متدهای دیگر، وابسته به یک پکیج (`stream`) هستند که **فقط در سرور در دسترس است** و در مرورگر کار نخواهد کرد.


- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## مرجع {#reference}
=======
## Reference {#reference}
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

<<<<<<< HEAD

یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک استرینگ HTML به شما باز خواهد گرداند. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  
=======
Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

<<<<<<< HEAD
این مشابه [`renderToString`](#rendertostring) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToString`](#rendertostring) و در سمت کاربر از [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) استفاده کنید.
=======
Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

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
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

* * *

### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) را به شما باز خواهد گرداند که یک استرینگ HTML را تولید می‌کند. HTML ساخته شده با این متد دقیقا همانی خواهد بود که [`ReactDOMServer.renderToString`](#rendertostring) می‌توانست به شما بدهد. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
>استریم باز گردانده شده از این متد، با اینگدینگ utf-8 خواهد بود. اگر به اینکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر اینکدینگ متن در اختیار شما قرار می‌دهد.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

این مشابه [`renderToNodeStream`](#rendertonodestream) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

HTML ساخته شده توسط این استریم دقیقا همانی است که [`ReactDOMServer.renderToStaticMarkup`](#rendertostaticmarkup) می‌توانست برای شما بسازد.

<<<<<<< HEAD
اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToNodeStream`](#rendertonodestream) و در سمت کاربر از [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) استفاده کنید.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
<<<<<<< HEAD
>استریم باز گردانده شده از این متد، با اینگدینگ utf-8 خواهد بود. اگر به اینکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر اینکدینگ متن در اختیار شما قرار می‌دهد.
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 841d3d1b75491ce153a53d1887ab020458090bbd
