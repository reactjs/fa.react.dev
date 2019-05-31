---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

اگر ری‌اکت را از یک تگ `<script>` بارگذاری کنید، این APIهای سطح‌بالا روی `ReactDOM` به‌صورت سراسری در دسترس هستند. اگر از ES6 به‌همراه npm استفاده می‌کنید، می‌توانید `import ReactDOM from 'react-dom'` را بنویسید.
اگر از ES5 به‌همراه npm استفاده می‌کنید می‌توانید `var ReactDOM = require('react-dom')` را بنویسید.

## مرور کلی {#overview}

بسته‌ی `react-dom` متدهای مختص DOM را فراهم می‌کند که در سطح بالای برنامه شما قابل استفاده و در صورت نیاز  به عنوان راه فراری برای خارج شدن از مدل ری‌اکت هستند. بیشتر کامپوننت‌های شما نباید به این ماژول نیازی داشته باشند .

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### پشتیبانی مرورگر {#browser-support}


ری‌اکت همه‌ی مرورگرهای متداول، از جمله Internet Explorer 9 و بالاتر از آن را پشتیبانی می‌کند، اگرچه برای مرورگرهای قدیمی‌تر مانند IE 9 و IE 10 [به polyfillهایی احتیاج دارد](/docs/javascript-environment-requirements.html).

> توجه
>
> ما مرورگرهای قدیمی‌تر که متدهای ES5 را پشتیبانی نکنند، پشتیبانی نمی‌کنیم، اما احتمالا اپ‌های شما با استفاده از polyfillهایی مانند [es5-shim و es5-sham](https://github.com/es-shims/es5-shim) در صفحه، در مرورگرهای قدیمی‌تر هم کار کنند. تصمیم برای استفاده از آن‌ها با شماست.

* * *

## مرجع {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

یک المنت ری‌اکت را درون DOM در `container` مشخص‌شده رندر کنید و یک [مرجع](/docs/more-about-refs.html) به کامپوننت برگردانید (یا برای [کامپوننت‌های بدون state](/docs/components-and-props.html#functional-and-class-components) `null` برگردانید).

اگر المنت ری‌اکت از قبل درون `container` رندر شده بود، این تابع روی آن بروزرسانی انجام می‌دهد و فقط در صورت نیاز DOM را تغییر می‌دهد تا آخرین المنت ری‌اکت را برگرداند.

اگر تابع callback اختیاری ارائه شده باشد، بعد از رندر یا بروزرسانی کامپوننت اجرا خواهد شد.
ت
> توجه:
>
> `ReactDOM.render()` محتوای نود کانتینری که شما مشخص کرده‌اید را کنترل می‌کند. هرکدام از المنت‌های DOM موجود در اولین فراخوانی جایگزین می‌شوند. فراخوانی‌های بعدی از الگوریتم‌های مقایسه‌ی DOM در ری‌اکت برای بروزرسانی کارآمد استفاده می‌کنند.
>
> `ReactDOM.render()` نود کانتینر را تغییر نمی‌دهد (فقط فرزندان کانتینر را تغییر می‌دهد). ممکن است یک کامپوننت را، بدون بازنویسی فرزندان موجود در یک نود DOM موجود قرار دهد.
>
> `ReactDOM.render()` در حال حاضر یک مرجع به ریشه‌ی `ReactComponent` برمی‌گرداند. اگرچه استفاده‌کردن از این مقدار قدیمی است
> و چون نسخه‌های آینده‌ی ری‌اکت ممکن است در برخی موارد کامپوننت‌ها را به‌صورت غیرهمزمان رندر کنند، باید از آن اجتناب شود. اگر به یک مرجع به ریشه‌ی `ReactComponent` نیاز دارید، اتصال یک [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) به المنت ریشه به عنوان راه‌حل ترجیح داده می‌شود.
>
> استفاده از `ReactDOM.render()` برای hydrateکردن یک کانتینر رندرشده در سرور منسوخ شده است و در ری‌اکت ١٧ حذف خواهد شد. به جای آن از [`hydrate()`](#hydrate) استفاده کنید.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.

React expects that the rendered content is identical between the server and the client. It can patch up differences in text content, but you should treat mismatches as bugs and fix them. In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches. This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.

If a single element's attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the warning by adding `suppressHydrationWarning={true}` to the element. It only works one level deep, and is intended to be an escape hatch. Don't overuse it. Unless it's text content, React still won't attempt to patch it up, so it may remain inconsistent until future updates.

If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to `true` in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

Remember to be mindful of user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so if you render something different in the client-only pass, the transition can be jarring. However, if executed well, it may be beneficial to render a "shell" of the application on the server, and only show some of the extra widgets on the client. To learn how to do this without getting the markup mismatch issues, refer to the explanation in the previous paragraph.

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
