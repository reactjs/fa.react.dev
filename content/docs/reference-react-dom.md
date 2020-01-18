---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<p dir="rtl">
اگر React را با استفاده از `<script>` بارگیری می کنید، این API های سطح بالا در همه جا بر روی **ReactDOM** در دسترس هستند. اگر از ES6 با npm استفاده می کنید، می توانید `import ReactDOM from 'react-dom'` را وارد کنید. اگر از ES5 با npm استفاده می کنید نیز `var ReactDOM = require('react-dom')` را بنویسید.
</p>
  
<h2 dir="rtl">بررسی اجمالی {#overview}</h2>
<p dir="rtl">
بسته `react-dom` روش هایی خاص برای مدیریت و کار با پرونده را فراهم می کند که می تواند در بالاترین سطح برنامه ها استفاده شود و به عنوان یک راه برای جلوگیری از استفاده از ماژول `React` است.
بیشتر اجزای برنامه شما نیازی به استفاده از این ماژول ندارد.
</p>

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

<h3 dir="rtl">پشتیبانی مرورگر {#browser-support}</h3>
<p dir="rtl">
ری اکت از کلیه مرورگرهای محبوب، از جمله Internet Explorer 9 و بالاتر پشتیبانی می کند، اگرچه [چند پیش نیاز دارد](/docs/javascript-Environment-Requires.html) تا برای مرورگرهای قدیمی مانند IE 9 و IE 10 به خوبی عمل کند.

> نکته
>
> ما از مرورگرهای قدیمی كه از روشهای ES5 پشتیبانی نمی كنند پشتیبانی نمی كنیم، اما شما ممكن است متوجه شوید که در صورتی که برنامه شما شامل پیش نیاز هایی مانند [es5-shim و es5-sham](https://github.com/es-shims/es5-shim) باشد برنامه های شما در مرورگرهای قدیمی نیز به خوبی كار کند. اگر تصمیم دارید این را انتخاب کنید، مسئولیت آن با خودتان است.
</p>

<h2 dir="rtl">ارجاع {#reference}</h2>

<h3 dir="rtl">`render()` {#render}</h3>

```javascript
ReactDOM.render(element, container[, callback])
```
<p dir="rtl">
یک عنصر React را به DOM در ظرف قرار دهید و یک [مرجع](/docs/more-about-refs.html) به مؤلفه (یا برگشت مقدار `null` برای [اجزای بی تاب](/docs/components-and-props.html#function-and-class-components)) بازگردانی کنید.

اگر عنصر React قبلاً در ظرف قرار داده شده باشد، این یک به روزرسانی را روی آن انجام می دهد و فقط در صورت لزوم DOM را تغییر می دهد تا آخرین عنصر React را منعکس کند.

اگر مقدار پاسخ که یک مقدار اختیاری است را ارائه داده باشید، پس از ارائه یا به روزرسانی مؤلفه، اجرا خواهد شد.
 

> نکته:
>
> `ReactDOM.render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `ReactDOM.render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) to the root element.
>
> Using `ReactDOM.render()` to hydrate a server-rendered container is deprecated and will be removed in React 17. Use [`hydrate()`](#hydrate) instead.
</p>

* * *

<h3 dir="rtl">`hydrate()` {#hydrate}</h3>

```javascript
ReactDOM.hydrate(element, container[, callback])
```

<p dir="rtl">
Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.

ری اکت انتظار دارد که محتوای ارائه شده بین سرور و کلاینت یکسان باشد. این می تواند اختلافات در متن را برطرف کند، اما باید ناسازگاری ها را با اشکال در نظر بگیرید و آنها را برطرف کنید. در حالت توسعه، React در مورد عدم تطابق هشدار می دهد. هیچ تضمینی وجود ندارد که اختلاف ویژگی ها در صورت عدم تطابق در آنها برطرف شود. این امر به دلایل عملکرد بسیار مهم است زیرا در اکثر برنامه ها، عدم تطابق نادر است، بنابراین اعتبار و اهمیت دادن به همه نشانه گذاری ها بسیار گران قیمت است.

If a single element's attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the warning by adding `suppressHydrationWarning={true}` to the element. It only works one level deep, and is intended to be an escape hatch. Don't overuse it. Unless it's text content, React still won't attempt to patch it up, so it may remain inconsistent until future updates.

If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to `true` in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

Remember to be mindful of user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so if you render something different in the client-only pass, the transition can be jarring. However, if executed well, it may be beneficial to render a "shell" of the application on the server, and only show some of the extra widgets on the client. To learn how to do this without getting the markup mismatch issues, refer to the explanation in the previous paragraph.
</p>

* * *

<h3 dir="rtl">`unmountComponentAtNode()` {#unmountcomponentatnode}</h3>

```javascript
ReactDOM.unmountComponentAtNode(container)
```

<p dir="rtl">
یک مؤلفه React نصب شده را از DOM جدا کرده و بررسی کننده رویداد و وضعیت آن را تمیز کنید. اگر هیچ مؤلفه ای در ظرف نصب نشده باشد، فراخوانی این عملکرد هیچ کاری نمی کند. این عملکرد مقدار صحیح را برمیگرداند اگر مؤلفه برچیده شود و در صورت عدم وجود مؤلفه ای مقدار "نادرست" را می گرداند.
</p>

* * *

<h3 dir="rtl">`findDOMNode()` {#finddomnode}</h3>
<p dir="rtl">

> توجه داشته باشید:
> 
> متد findDOMNode یک دریچه فرار است که برای دسترسی به گره DOM استفاده می شود. در بیشتر موارد، استفاده از این دریچه فرار از آن منع می شود زیرا انتزاع مؤلفه را سوراخ می کند. [این در "StrictMode" منسوخ شده است.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
</p>

```javascript
ReactDOM.findDOMNode(component)
```

<p dir="rtl">
اگر این مؤلفه در DOM نصب شده باشد ، این عنصر DOM مرورگر بومی را برمی گرداند. این روش برای خواندن مقادیر خارج از DOM مانند مقادیر شکل فرم و انجام اندازه گیری DOM مفید است. **در بیشتر موارد، شما می توانید یک گره به DOM متصل کنید و از استفاده از "findDOMNode" خودداری کنید.**

هنگامی که یک جزء را بصورت "null" یا "false"و findDOMNode ظاهر می شود و `null` را برمی گرداند. وقتی یک جزء به عنوان یک رشته ظاهر می شود `findDOMNode` یک عنصر متنی را که شامل متن است برمیگرداند.
همانطور که از React 16، یک مؤلفه می تواند قطعه ای را به همراه چند فرزند برگرداند، در این صورت "findDOMNode" گره DOM را که مربوط به اولین فرزند غیر خالی است، باز می گرداند.

> نکته:
>
> `findDOMNode` only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling `findDOMNode()` in `render()` on a component that has yet to be created) an exception will be thrown.
>
> `findDOMNode` cannot be used on function components.
</p>

* * *

<h3 dir="rtl">`createPortal()` {#createportal}</h3>

```javascript
ReactDOM.createPortal(child, container)
```

<p dir="rtl">
ایجاد یک پرتال. پورتال ها راهی برای [دادن اجزای فرزند به گره DOM که در خارج از سلسله مراتب از مؤلفه DOM وجود دارد ارائه می دهد](/docs/portalals.html).
</p>
