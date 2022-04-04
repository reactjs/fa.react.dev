---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<<<<<<< HEAD
اگر ری‌اکت را با تگ `<script>` بارگذاری کنید، این APIهای سطح بالا در `ReactDOM` به صورت عمومی در دسترس هستن. اگر از ES6 با npm استفاده می‌کنید، می‌توانید بنویسید `import ReactDOM from 'react-dom'`.
اگر از ES5 با npm استفاده می‌کنید ،می‌توانید بنویسید `var ReactDOM = require('react-dom')`.
=======
The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## مرور کلی {#overview}

<<<<<<< HEAD
بسته `react-dom` متدهای خاصی از DOM را فراهم می‌کند که در صورت نیاز می‌توان در سطح بالایی از اپلیکیشن شما به عنوان راه فراری از مدل ری‌اکت استفاده کرد. بیشتر کامپوننت‌های شما نیازی ندارند که از این ماژول‌ها استفاده کنند.
=======
The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### پشتیبانی مرورگر {#browser-support}

<<<<<<< HEAD
ری‌اکت از تمام مرورگرهای معروف پشتیبانی می‌کند، که شامل Internet Explorer 9 و بالاتر می‌شود، گرچه برای مرورگرهای قدیمی مثل IE 9 و IE 10 [به مکمل‌ها(polyfills) نیاز است](/docs/javascript-environment-requirements.html).
=======
React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> توجه
>
<<<<<<< HEAD
> ما از مرورگرهای قدیمی که از متدهای ES5 پشتیبانی نمی‌کنند پشتیبانی نمی‌کنیم، ولی متوجه میشوید که اگر از مکمل‌هایی مثل [es5-shim و es5-sham](https://github.com/es-shims/es5-shim) استفاده کنید برنامه‌های شما در این مرورگرهای قدیمی کار می‌کنند. اما پیامد آن به عهده خودتان است.
* * *
=======
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

## مرجع {#reference}

### `createPortal()` {#createportal}

```javascript
createPortal(child, container)
```

<<<<<<< HEAD
یک المنت ری‌اکت را درون container داده‌شده رندر می‌کند و یک [reference](/docs/more-about-refs.html) به آن کامپوننت (یا null برای [کامپوننت‌های بدون state](/docs/components-and-props.html#function-and-class-components)) باز می‌گرداند.
=======
Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This method is useful for being able to read the result of those updates immediately.

> Note:
> 
> `flushSync` can have a significant impact on performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}
```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#function-and-class-components)).
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1


اگر المت ری‌اکت قبلا درون `container` رندر شده می‌بود، این دستور یک بروزرسانی روی آن انجام می‌داد و DOM را فقط در صورت لزوم تغغیر (mutate) می‌هد تا آخرین المنت ری‌اکت منعکس شود.

<<<<<<< HEAD
اگر callback دلخواهی داشتیم، بعد از اینکه کامپوننت رندر یا به‌روزرسانی شد اجرا می‌شود.
=======
> Note:
>
> `render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/refs-and-the-dom.html#callback-refs) to the root element.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](#hydrateroot) instead.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> توجه:
>
> `ReactDOM.render()` محتوای نود container که به داخل آن می‌فرستید را کنترل می کند. هنگامی که برای اولین بار فراخوانی می‌شود هر المنتی که داخلش باشد جایگزین می‌شود. ولی در سایر فراخوانی‌های بعدی برای بهینه بودن به‌روزرسانی از الگوریتم (React’s DOM diffing) استفاده می‌شود.
>
> `ReactDOM.render()` نود اصلی را تغییر نمیدهد (فقط فرزنده‌های container را تغییر می‌دهد). شاید ممکن باشد که کامپوننتی را درون نودی که قبلا وجود داشته وارد کرد بدون اینکه نیاز به بازنویسی نودهای زیر شاخه(children) باشد.
>
> `ReactDOM.render()` در حال حاضر یک reference از ریشه instance `ReactComponent` برمی‌گرداند. با این حال استفاده از این مقدار برگشتی سنتی است و باید از آن پرهیز شود زیرا در ورژن‌های آینده ری‌اکت شاید برخی کامپوننت‌ها در گاهی اوقات ناهمگام رندر شوند.اگر شما به مرجع instance ریشه `ReactComponent` نیاز داشتید، بهترین راه حل آن است که یک [callback ref](/docs/refs-and-the-dom.html#callback-refs) به ریشه المنت وصل کنید.
>
> استفاده از `ReactDOM.render()` برای hydrate کردن یک container که سمت سرور رندر شده‌است، منسوخ شده است و در ورژن ۱۷ ری‌اکت پاک خواهد شد. به جای آن از [`()hydrate`](#hydrate) استفاده کنید.
* * *

### `()hydrate` {#hydrate}

```javascript
hydrate(element, container[, callback])
```

<<<<<<< HEAD
مثل [`()render`](#render) است، ولی برای hydrate کردن یک container که محتوای HTML آن توسط [`ReactDOMServer`](/docs/react-dom-server.html) رنده شده است استفاده می‌شود. ری‌اکت تلاش می‌کند به همان المان‌های رندر شده‌ی موجود، event listener هایی را اضافه کند.
=======
> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

ری‌اکت توقع دارد که محتوای رنده شده بین سرور و کاربر همسان باشند. ری‌اکت میتواند اختلافات را در متن محتوا وصله کند، ولی شما باید با عدم تطابق به عنوان باگ نگاه کنید و آنها را رفع کنید. در حالت توسعه، ری‌اکت این عدم تطابق را در مدت hydration به ما هشدار می‌دهد. هیچ تضمینی وجود ندارد که تفاوت‌های بین attribute در مواردی که عدم تطابق داریم وصله شوند. از این جهت برای عملکرد بهتر مهم است زیرا در اکثر نرم‌افزارها، عدم تطابق نادر است، و راست‌آزمایی markups میتواند از این نظر بسیار گران باشد.

اگر یک attribute متعلق به المنت یا محتوای متن به صورت اجتناب ناپذیری بین سرور و کاربر متفاوت باشد (برای مثال  timestamp)، شما شاید با اعمال `suppressHydrationWarning={true}` روی المنت این هشدار را ساکت کنید. این فقط تا عمق یک لایه کار می‌کند، و دریچه فراری در نظر گرفته شده است. خیلی از آن استفاده نکنید. مگر محتوا متن باشد، همچنین ری‌اکت نیز برای وصله کردن آن تلاشی نمی‌کند،  در نتیجه تا به‌روزرسانی آتی ناسازگار باقی می‌ماند.

اگر نیاز دارید تا از عمد چیز متفاوتی سمت سرور یا کاربر رندر کنید، می‌توانید از روش رندر کردن دو-گذری استفاده کنید. کامپوننت‌هایی که چیز متفاوتی سمت کاربر رندر می‌کنند می‌توانند stateای شبیه به `this.state.isClient` را بخوانند، که می‌توانید آن را در `componentDidMount()` برابر `true` قرار دهید. به این طریق در گذر اولیه رندر، همان محتوای سمت سرور رندر می‌شود، از عدم تطابق جلوگیری می‌شود، ولی یک گذر همگام درست بعد از hydration اتفاق می‌افتد. توجه کنید که در این روش کامپوننت‌های شما کم سرعت می‌شوند زیرا باید دوبار رندر شوند، پس با دقت استفاده کنید.

به تجربه‌کاربری هنگامی که سرعت اتصال کم است هم توجه کنید. کد جاوااسکریپت ممکن است خیلی بعدتر از رندر اولیه HTML بارگذاری شود، بنابراین اگر شما در آن زمان چیز متفاوتی [از HTML ارسال شده] رندر می‌کنید، این تغییر می‌تواند نامطلوب باشد. گرچه، اگر به خوبی اجرا شود، می‌تواند برای رندر شدن "shell" نرم‌افزار روی سرور مفید باشد، و فقط چند ابزارک سمت کاربر را نشان می‌دهد. برای اینکه بدانید این کار بدون اینکه درچار مشکل تطابق شوید چطور انجام می‌شود، به توضیحات پاراگراف قبلی مراجعه کنید.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
unmountComponentAtNode(container)
```

<<<<<<< HEAD
یک کامپوننت mount شده ری‌اکت را از DOM حذف و تمام event handler ها و state آن را پاک می‌کند. اگر هیچ کامپوننتی در mount container نشده باشد، فراخوانی این تابع هیچ کاری نمی‌کند. مقدار `true` را برای کامپوننت‌هایی که mount شدن و  مقدار `false` را در زمانی که هیچ کامپوننتی mount نشده باشد برمی‌گرداند.
=======
> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `()findDOMNode` {#finddomnode}

> توجه:
> `findDOMNode`  یک راه فرار است که برای دسترسی به DOM نود زیرین استفاده می‌شود. در بیشتر موارد، استفاده از این راه فرار پیش‌نهاد نمی‌شود. زیرا نفوذی به [لایه] abstraction کامپوننت است. این قابلیت [در `StrictMode` منسوخ شده است.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
این متد برای خواندن مقادیر خارج از DOM، مانند مقادیر فیلد‌های فرم و انجام بررسی‌های DOM مفید است. در **بیشتر موارد، شما می‌توانید یک ref به نود DOM متصل کنید و در کل از استفاده‌ی `findDOMNode` بپرهیزید.**


هنگامی که کامپوننت  `null` یا `false` رندر می‌کند `findDOMNode` مقدار `null` برمی‌گرداند. و هنگامی که کامپوننت متن رندر میکند `findDOMNode` یک DOM نود متنی شامل آن مقدار برمی‌گرداند. از از ری‌اکت ۱۶، یک کامپوننت شاید یک fragment با تعدادی فرزند درونش را رندر کند که در این صورت `findDOMNode` یک نود DOM متناظر با اولین فرزند غیر خالی را برمی‌گرداند.

> توجه:
>
> `findDOMNode` فقط روی کامپوننت‌هایی که mount شده اند کار می‌کنند (که آن کامپوننت در جای خود در DOM قرار گرفته است). اگر سعی کنید که آن را در کامپوننت فراخوانی کنید که هنوز در صفحه mount نشده است (مثل فراخوانی  `findDOMNode()` در `render()` روی کامپوننتی که هنوز ایجاد نشده است) به exception میخورید.
>
> `findDOMNode` در کامپوننت‌های تابعی کار نمی‌کند.

* * *
<<<<<<< HEAD

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```
یک پورتال ایجاد می‌کنند. پورتال‌ها راهی فراهم می‌کند تا [فرزنده‌ها را درون DOM نود بیرون سلسله مراتب DOM قرار دهید](/docs/portals.html).
=======
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1
