---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

بسته `react-dom` متدهای مخصوص DOM را ارائه می‌کند که می‌توانند در سطح بالای برنامه شما و به عنوان یک دریچه فرار برای خارج شدن از مدل React در صورت نیاز استفاده شوند.

```js
import * as ReactDOM from 'react-dom';
```

اگر از ES5 با npm استفاده می کنید، می توانید بنویسید:

```js
var ReactDOM = require('react-dom');
```

بسته `react-dom` همچنین ماژول‌های مخصوص برنامه‌های کلاینت و سرور را ارائه می‌کند:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)

## مرور کلی {#overview}

بسته `react-dom` این متدها را export می‌کند:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)

این متدهای `react-dom` نیز export می‌شوند، اما به عنوان منسوخ‌شده در نظر گرفته می‌شوند:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> نکته: 
> 
> هر دو `render` و`hydrate` با [متدهای کلاینت](/docs/react-dom-client.html) جدید در React 18 جایگزین شده‌اند. این متدها به شما هشدار می‌دهند که برنامه شما طوری رفتار می‌کند که گویی React 17 را اجرا می‌کند (یادگیری بیشتر [اینجا](https://reactjs.org/link/switch-to-createroot)).

### پشتیبانی مرورگر {#browser-support}

React از همه مرورگرهای مدرن پشتیبانی می‌کند، اگرچه [برخی پلی‌فیل‌ها](/docs/javascript-environment-requirements.html) برای نسخه‌های قدیمی‌تر لازم است.

> توجه
>
> ما از مرورگرهای قدیمی‌تری که از متدهای ES5 یا microtask  پشتیبانی نمی‌کنند، مانند اینترنت اکسپلورر پشتیبانی نمی‌کنیم. اگر پلی‌فیل‌هایی مانند [es5-shim و es5-sham](https://github.com/es-shims/es5-shim) در صفحه گنجانده شود، ممکن است متوجه شوید که برنامه‌های شما در مرورگرهای قدیمی‌تر کار می‌کنند، اما شما اگر این راه را انتخاب کردید، باید به تنهایی ادامه دهید.

## مرجع {#reference}

### `createPortal()` {#createportal}

> Try the new React documentation for [`createPortal`](https://beta.reactjs.org/reference/react-dom/createPortal).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
createPortal(child, container)
```

یک پورتال ایجاد می کند. پورتال ها راهی برای [رندر children به یک گره (node) در DOM که خارج از سلسله مراتب کامپوننت DOM وجود دارد](/docs/portals.html) ارائه می دهند.

### `flushSync()` {#flushsync}

> Try the new React documentation for [`flushSync`](https://beta.reactjs.org/reference/react-dom/flushSync).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
flushSync(callback)
```

React را اجبار کنید تا به‌روزرسانی‌های موجود در کال‌بک ارائه‌شده را به‌طور همزمان فلاش کند. این تضمین می کند که DOM بلافاصله به روز می شود.

```javascript
// این به‌روزرسانی state را مجبور کنید همزمان (sync) باشد.
flushSync(() => {
  setCount(count + 1);
});
// در این مرحله، DOM به روز می شود.
```

> نکته:
> 
> `flushSync` می تواند به طور قابل توجهی به عملکرد آسیب برساند. کم استفاده کنید.
> 
> `flushSync` ممکن است مرزهای Suspense معلق را مجبور کند که وضعیت `fallback` خود را نشان دهند.
> 
> `flushSync` همچنین ممکن است افکت‌های معلق را اجرا کند و به‌روزرسانی‌های موجود را قبل از بازگشت به‌طور همزمان اعمال کند.
> 
> `flushSync` همچنین ممکن است در صورت لزوم، به‌روزرسانی‌های در خارج از callback را برای فلاش به‌روزرسانی‌های در داخل callback را نیز فلاش کند. به عنوان مثال، اگر به‌روزرسانی‌های معلقی از یک کلیک وجود داشته باشد، React ممکن است آن‌ها را قبل از فلاش به‌روزرسانی‌های داخل callback فلاش کند.

## Legacy Reference {#legacy-reference}
### `render()` {#render}

> Try the new React documentation for [`render`](https://beta.reactjs.org/reference/react-dom/render).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
render(element, container[, callback])
```

> نکته:
>
> `render` با `createRoot` در React 18 جایگزین شده است. برای اطلاعات بیشتر به [createRoot](/docs/react-dom-client.html#createroot) مراجعه کنید.

یک المنت React درون DOM را در `container` ارائه‌شده رندر می‌کند و یک [reference](/docs/more-about-refs.html) به کامپوننت را برمی‌گرداند  (یا `null` را برای [کامپوننت‌های بدون state](/docs/components-and-props.html#function-and-class-components) برمی‌گرداند).

اگر المت ری‌اکت قبلا درون `container` رندر شده می‌بود، این دستور یک بروزرسانی روی آن انجام می‌داد و DOM را فقط در صورت لزوم تغغیر (mutate) می‌هد تا آخرین المنت ری‌اکت منعکس شود.

اگر callback دلخواهی داشتیم، بعد از اینکه کامپوننت رندر یا به‌روزرسانی شد اجرا می‌شود.

> توجه:
>
> `render()` محتوای نود container که به داخل آن می‌فرستید را کنترل می کند. هنگامی که برای اولین بار فراخوانی می‌شود هر المنتی که داخلش باشد جایگزین می‌شود. ولی در سایر فراخوانی‌های بعدی برای بهینه بودن به‌روزرسانی از الگوریتم (React’s DOM diffing) استفاده می‌شود.
>
> `render()` نود container را تغییر نمیدهد (فقط فرزنده‌های container را تغییر می‌دهد). شاید ممکن باشد که کامپوننتی را درون نودی که قبلا وجود داشته وارد کرد بدون اینکه نیاز به بازنویسی نودهای زیر شاخه(children) باشد.
>
> `render()` در حال حاضر یک reference از ریشه instance `ReactComponent` برمی‌گرداند. با این حال استفاده از این مقدار برگشتی منسوخ‌شده است
>و باید از آن پرهیز شود زیرا در ورژن‌های آینده ری‌اکت شاید برخی کامپوننت‌ها در گاهی اوقات async رندر شوند.اگر شما به مرجع instance ریشه `ReactComponent` نیاز داشتید، بهترین راه حل آن است که یک 
>[callback ref](/docs/refs-and-the-dom.html#callback-refs) به المنت ریشه وصل کنید.
>
> استفاده از `render()` برای hydrate کردن یک container که سمت سرور رندر شده‌است، منسوخ شده است. به جای آن از [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) استفاده کنید.

* * *

### `hydrate()` {#hydrate}

> Try the new React documentation for [`hydrate`](https://beta.reactjs.org/reference/react-dom/hydrate).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
hydrate(element, container[, callback])
```

> نکته:
>
> `hydrate` با `hydrateRoot` در React 18 جایگزین شده است. برای اطلاعات بیشتر به [hydrateRoot](/docs/react-dom-client.html#hydrateroot) مراجعه کنید.

مثل [`render()`](#render) است، ولی برای hydrate کردن یک container که محتوای HTML آن توسط [`ReactDOMServer`](/docs/react-dom-server.html) رنده شده است استفاده می‌شود. ری‌اکت تلاش می‌کند به همان المان‌های رندر شده‌ی موجود، event listener هایی را اضافه کند.

ری‌اکت توقع دارد که محتوای رنده شده بین سرور و کاربر همسان باشند. ری‌اکت میتواند اختلافات را در متن محتوا وصله کند، ولی شما باید با عدم تطابق به عنوان باگ نگاه کنید و آنها را رفع کنید. در حالت توسعه، ری‌اکت این عدم تطابق را در مدت hydration به ما هشدار می‌دهد. هیچ تضمینی وجود ندارد که تفاوت‌های بین attribute در مواردی که عدم تطابق داریم وصله شوند. از این جهت برای عملکرد بهتر مهم است زیرا در اکثر نرم‌افزارها، عدم تطابق نادر است، و راست‌آزمایی markups میتواند از این نظر بسیار گران باشد.

اگر یک attribute متعلق به المنت یا محتوای متن به صورت اجتناب ناپذیری بین سرور و کاربر متفاوت باشد (برای مثال  timestamp)، شما شاید با اعمال `suppressHydrationWarning={true}` روی المنت این هشدار را ساکت کنید. این فقط تا عمق یک لایه کار می‌کند، و دریچه فراری در نظر گرفته شده است. خیلی از آن استفاده نکنید. مگر محتوا متن باشد، همچنین ری‌اکت نیز برای وصله کردن آن تلاشی نمی‌کند،  در نتیجه تا به‌روزرسانی آتی ناسازگار باقی می‌ماند.

اگر نیاز دارید تا از عمد چیز متفاوتی سمت سرور یا کاربر رندر کنید، می‌توانید از روش رندر کردن دو-گذری استفاده کنید. کامپوننت‌هایی که چیز متفاوتی سمت کاربر رندر می‌کنند می‌توانند stateای شبیه به `this.state.isClient` را بخوانند، که می‌توانید آن را در `componentDidMount()` برابر `true` قرار دهید. به این طریق در گذر اولیه رندر، همان محتوای سمت سرور رندر می‌شود، از عدم تطابق جلوگیری می‌شود، ولی یک گذر همگام درست بعد از hydration اتفاق می‌افتد. توجه کنید که در این روش کامپوننت‌های شما کم سرعت می‌شوند زیرا باید دوبار رندر شوند، پس با دقت استفاده کنید.

به تجربه‌کاربری هنگامی که سرعت اتصال کم است هم توجه کنید. کد جاوااسکریپت ممکن است خیلی بعدتر از رندر اولیه HTML بارگذاری شود، بنابراین اگر شما در آن زمان چیز متفاوتی [از HTML ارسال شده] رندر می‌کنید، این تغییر می‌تواند نامطلوب باشد. گرچه، اگر به خوبی اجرا شود، می‌تواند برای رندر شدن "shell" نرم‌افزار روی سرور مفید باشد، و فقط چند ابزارک سمت کاربر را نشان می‌دهد. برای اینکه بدانید این کار بدون اینکه درچار مشکل تطابق شوید چطور انجام می‌شود، به توضیحات پاراگراف قبلی مراجعه کنید.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

> Try the new React documentation for [`unmountComponentAtNode`](https://beta.reactjs.org/reference/react-dom/unmountComponentAtNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
unmountComponentAtNode(container)
```

> نکته:
>
> `unmountComponentAtNode` با `root.unmount()` در React 18 جایگزین شده است. برای اطلاعات بیشتر به [createRoot](/docs/react-dom-client.html#createroot) مراجعه کنید.

یک کامپوننت mount شده ری‌اکت را از DOM حذف و تمام event handler ها و state آن را پاک می‌کند. اگر هیچ کامپوننتی در mount container نشده باشد، فراخوانی این تابع هیچ کاری نمی‌کند. مقدار `true` را برای کامپوننت‌هایی که mount شدن و  مقدار `false` را در زمانی که هیچ کامپوننتی mount نشده باشد برمی‌گرداند.

* * *

### `()findDOMNode` {#finddomnode}

<<<<<<< HEAD
> توجه:
> `findDOMNode`  یک راه فرار است که برای دسترسی به DOM نود زیرین استفاده می‌شود. در بیشتر موارد، استفاده از این راه فرار پیش‌نهاد نمی‌شود. زیرا نفوذی به [لایه] abstraction کامپوننت است. این قابلیت [در `StrictMode` منسوخ شده است.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
=======
> Try the new React documentation for [`findDOMNode`](https://beta.reactjs.org/reference/react-dom/findDOMNode).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

> Note:
>
> `findDOMNode` is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction. [It has been deprecated in `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
>>>>>>> ba290ad4e432f47a2a2f88d067dacaaa161b5200

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
