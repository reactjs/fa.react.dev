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
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```


## مرور کلی{#overview}

متدهای زیر هم در محیط مرورگر و هم سرور قابل استفاده هستند:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

این متدهای دیگر، وابسته به یک پکیج (`stream`) هستند که **فقط در سرور در دسترس است** و در مرورگر کار نخواهد کرد.


- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## مرجع {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```


<<<<<<< HEAD
یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک استرینگ HTML به شما باز خواهد گرداند. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

این مشابه [`renderToString`](#rendertostring) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

<<<<<<< HEAD
اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToString`](#rendertostring) و در سمت کاربر از [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) استفاده کنید.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
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
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) را به شما باز خواهد گرداند که یک استرینگ HTML را تولید می‌کند. HTML ساخته شده با این متد دقیقا همانی خواهد بود که [`ReactDOMServer.renderToString`](#rendertostring) می‌توانست به شما بدهد. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

<<<<<<< HEAD
اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

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
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
>استریم باز گردانده شده از این متد، با اینگدینگ utf-8 خواهد بود. اگر به اینکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر اینکدینگ متن در اختیار شما قرار می‌دهد.
