---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

اگر ری‌اکت را با تگ `<script>` بارگیری کنید، این APIهای سطح بالا در `ReactDOM` به صورت عمومی در دسترس هستن. اگر از ES6 با npm استفاده می‌کنید، می‌توانید بنویسید `import ReactDOM from 'react-dom'`.
اگر از ES5 با npm استفاده می‌کنید ،می‌توانید بنویسید `var ReactDOM = require('react-dom')`.

## مرور کلی {#overview}

بسته `react-dom` متدهای خاصی از DOM را فراهم می‌کند که در صورت نیاز میتوان در سطح بالایی از اپلیکیشن شما به عنوان راه فراری از مدل React استفاده کرد. بیشتر کامپوننت‌های شما نیازی ندارد که از این moduleها استفاده کنند.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### پشتیبانی مرورگر {#browser-support}

React از تمام مرورگرهای معروف پشتیبانی می‌کند، که شامل Internet Explorer 9 و بالاتر می‌شود، گرچه برای مرورگرهای قدیمی مثل IE 9 و IE 10 [به مکمل‌ها(polyfills) نیاز است](/docs/javascript-environment-requirements.html).

> توجه
>
> ما از مرورگرهای قدیمی که از متدهای ES5 پشتیبانی نمی‌کنند پشتیبانی نمی‌کنیم، ولی متوجه می‌شوید که برنامه شما در این مرورگرها کار می‌کنند، اگر مکمل‌هایی مثل [es5-shim و es5-sham](https://github.com/es-shims/es5-shim) را در صفحه وارد کنید. در انتخاب این مسیر فقط به خودتان متکی هستید.

* * *

## مرجع {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

یک المان React را درون DOM برای `container` فراهم شده رندر می‌کند و یک [ارجاع](/docs/more-about-refs.html) به کامپوننت بر‌میگرداند. ( یا برای [کامپوننت‌های بی‌state](/docs/components-and-props.html#function-and-class-components) ، `null` برمی‌گرداند).

اگر المان React قبلا در  `container` رندر شده بود، React یک به‌روزرسانی جدید رویش اجرا می‌کند و فقط زمانی DOM را تغییر(mutate) می‌دهد که ضروری باشد تا بر آخرین المان React بازتاب پیدا کند.

اگر callback دلخواهی فراهم شده بود، بعد از اینکه کامپوننت رندر یا به‌روزرسانی شد اجرا می‌شود.

> Note:
>
> `ReactDOM.render()` محتوای نود container که به داخل آن می‌فرستید را کنترل می کند. هنگامی که برای اولین بار فراخوانی می‌شود هر المنتی که داخلش باشد جایگزین می‌شود. ولی در سایر فراخوانی‌ها برای بهینه بودن به‌روزرسانی از الگوریتم اختلاف‌یاب React استفاده می‌شود (React’s DOM diffing algorithm).
>
> `ReactDOM.render()` نود اصلی را تغییر نمیدهد (فقط بچه‌های container را تغییر می‌دهد). شاید ممکن باشد که کامپوننتی را درون نودی که قبلا وجود داشته وارد کرد بدون اینکه نیاز به بازنویسی نودهای زیر شاخه(children) باشد.
>
> `ReactDOM.render()` در حال حاضر یک ارجاع از ریشه بدل(instance) `ReactComponent` برمی‌گرداند. با این حال با این حال استفاده از این مقدار برگشتی نوعی میراث است و باید از آن پرهیز شود زیرا در ورژن‌های آینده React شاید برخی کامپوننت‌ها در گاهی اوقات ناهمگام رندر شوند.اگر شما به مرجع بدل ریشه `ReactComponent` نیاز داشتید، بهترین راه حل آن است که یک [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) به ریشه المنت وصل کنید.
>
> استفاده از `ReactDOM.render()` برای hydrate کردن رندر شدن container سمت سرور منسوخ شده است و در ورژن ۱۷ React پاک خواهد شد. به جای آن از [`()hydrate`](#hydrate) استفاده کنید.
>
* * *

### `()hydrate` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

مثل [`()render`](#render) است، ولی برای hydrate کردن یک container که محتوای HTML آن توسط [`ReactDOMServer`](/docs/react-dom-server.html) رنده شده است استفاده می‌شود. React تلاش می‌کند تا event listenerهایی به (markups)نشانه‌گذاری‌های موجود متصل کند.

React توقع دارد که محتوای رنده شده بین سرور و کاربر همسان باشند. React میتواند اختلافات را در متن محتوا وصله کند، ولی شما باید با عدم تطابق به عنوان باگ نگاه کنید و آنها را رفع کنید. در حالت توسعه React این عدم تطابق را در مدت hydration به ما هشدار می‌دهد. هیچ تضمینی وجود ندارد که اختلاف‌های attribute در مواردی که عدم تطابق داریم وصله شوند. از این جهت برای عملکرد بهتر مهم است زیرا در اکثر نرم‌افزارها، عدم تطابق نادر است، و راست‌آزمایی نشانه‌گذاری‌ها میتواند از این نظر بسیار گران باشد.

اگر یک attribute متعلق به المنت یا محتوای متن به صورت اجتناب ناپذیری بین سرور و کاربر متفاوت باشد (برای مثال  timestamp)، شما شاید با اعمال `suppressHydrationWarning={true}` روی المنت این هشدار را ساکت کنید. این فقط تا یک لایه عمق کار می‌کند، و دریچه فراری در نظر گرفته شده است. خیلی از آن استفاده نکنید. مگر محتوا متن باشد، React همچنان برای وصله کردن آن تلاشی نمی‌کند،  در نتیجه تا به‌روزرسانی آتی ناسازگار باقی می‌ماند.

اگر نیاز دارید تا از عمد چیز متفاوتی سمت سرور یا کاربر رندر کنید، می‌توانید از روش رندر کردن دو-گذری استفاده کنید. کامپوننت‌هایی که چیز متفاوتی سمت کاربر رندر می‌کنند می‌توانند stateای شبیه به `this.state.isClient` را بخوانند، که می‌توانید آن را در `componentDidMount()` برابر `true` قرار دهید. به این طریق در گذر اولیه رندر، همان محتوای سمت سرور رندر می‌شود، از عدم تطابق جلوگیری می‌شود، ولی یک گذر همگام درست بعد از hydration اتفاق می‌افتد. توجه کنید که در این روش کامپوننت‌های شما کم سرعت می‌شوند زیرا باید دوبار رندر شوند، پس با دقت استفاده کنید.

نسبت به اتصال ضعیف کاربر توجه داشته باشید. کد JavaScript می‌تواند خیلی دیرتر از HTML اولیه رندر شود، پس اگر چیز متفاوتی در گذر فقط-کاربر رندر کنید، انتقال می‌تواند نامطلوب باشد. گرچه، اگر به خوبی اجرا شود، می‌تواند برای رندر شدن "shell" نرم‌افزار روی سرور مفید باشد، و فقط چند ابزارک سمت کاربر را نشان می‌دهد. برای اینکه بدانید این کار بدون اینکه درچار مشکل تطابق شوید چطور انجام می‌شود، به توضیحات پاراگراف قبلی مراجعه کنید.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns `true` if a component was unmounted and `false` if there was no component to unmount.

* * *

### `findDOMNode()` {#finddomnode}

> Note:
>
> `findDOMNode` is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction. [It has been deprecated in `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. **In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode` at all.**

When a component renders to `null` or `false`, `findDOMNode` returns `null`. When a component renders to a string, `findDOMNode` returns a text DOM node containing that value. As of React 16, a component may return a fragment with multiple children, in which case `findDOMNode` will return the DOM node corresponding to the first non-empty child.

> Note:
>
> `findDOMNode` only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling `findDOMNode()` in `render()` on a component that has yet to be created) an exception will be thrown.
>
> `findDOMNode` cannot be used on function components.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).
