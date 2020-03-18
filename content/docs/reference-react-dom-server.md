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


- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## مرجع {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```


یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک استرینگ HTML به شما باز خواهد گرداند. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

این مشابه [`renderToString`](#rendertostring) است. با این تفاوت که DOM attribute های اضافه (از قبیل `data-reactroot`) که ری‌اکت به طور داخلی استفاده می‌کند را نخواهد ساخت. این زمانی مفید است که قصد داشته باشید از ری‌اکت صرفا برای تولید صفحات استاتیک استفاده کنید. از طرف دیگر، حذف کردن attribute های اضافه، می‌تواند حجم بایت های شما را کاهش دهد.

اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToString`](#rendertostring) و در سمت کاربر از [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) استفاده کنید.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

یک المنت ری‌اکت را به شکل HTML اولیه اش، رندر کنید. ری‌اکت یک [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) را به شما باز خواهد گرداند که یک استرینگ HTML را تولید می‌کند. HTML ساخته شده با این متد دقیقا همانی خواهد بود که [`ReactDOMServer.renderToString`](#rendertostring) می‌توانست به شما بدهد. با این متد، شما HTML را در سرور ساخته و آن را با درخواست اولیه کاربر، برایش خواهید فرستاد. این باعث خواهد شد که صفحه شما سریعتر نمایش داده شود و موتورهای جستجو هم خواهند توانست برای SEO صفحات شما را واکاوی کنند.

اگر [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) را روی نودی که پیشتر در سرور ساخته شده است، فراخوانی کنید، ری‌اکت آن را همانطوری که بوده حفظ خواهد کرد. در عین حال اجازه خواهد داد تا event handler ها را به آن الصاق کنید. از همین رو، بارگذاری اولیه سریع تر انجام خواهد شد.  

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

اگر قصدتان این است که از ری‌اکت در سمت کاربر استفاده کنید تا HTML شما تعاملی شود، از این متد استفاده نکنید. بجایش، در سرور از [`renderToNodeStream`](#rendertonodestream) و در سمت کاربر از [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) استفاده کنید.

> توجه:
>
> منحصرا برای سرور! این API‌ در مرورگر کار نخواهد کرد.
>
>استریم باز گردانده شده از این متد، با اینگدینگ utf-8 خواهد بود. اگر به اینکدینگ  متفاوتی در استریم خود نیاز دارید، به پروژه هایی مانند [iconv-lite](https://www.npmjs.com/package/iconv-lite) سر بزنید که استریمی از نوع transform را برای تغییر اینکدینگ متن در اختیار شما قرار می‌دهد.
