---
id: react-api
title: API سطح بالای React
layout: docs
category: Reference
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

`React` نقطه‌ی ورود به کتابخانه‌ی ری‌اکت است. اگر شما React را از تگ `<script>` بارگذاری کنید، این APIهای سطح بالا از  `React` گلوبال قابل دسترسی هستند. اگر شما از ES6 ‌به‌همراه npm استفاده می‌کنید، می‌توانید بنویسید `import React from 'react'`. اگر از ES5 به‌همراه npm استفاده می‌کنید، می‌توانید بنویسید `var React = require('react')`.

## مرور کلی {#overview}

### کامپوننت‌ها {#components}

کامپوننت‌های ری‌اکت به شما اجازه می‌دهند تا رابط کاربری را به بخش‌های مستقل با قابلیت استفاده‌ی مجدد تقسیم کنید، و درمورد هر قسمت به صورت جداگانه فکر کنید. کامپوننت‌های ری‌اکت را می‌توان به عنوان زیرکلاسی برای `React.Component` یا `React.PureComponent` تعریف کرد.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

اکر شما از کلاس‌های ES6 استفاده نمی‌کنید، می‌توانید به جای آن از  `create-react-class` استفاده کنید. بخش [ری‌اکت بدون استفاده از ES6](/docs/react-without-es6.html) را برای آگاهی بیشتر ببینید.

کامپوننت‌های ری‌اکت می‌توانند به شکل تابع نیز تعریف شوند که می‌توان آن‌ها را با memo بسته‌بندی (wrap) کرد:

- [`React.memo`](#reactmemo)

### ایجاد المنت‌های ری‌اکت {#creating-react-elements}

ما پیشنهاد می‌کنیم برای توصیف رابط کاربری از [JSX](/docs/introducing-jsx.html) استفاده کنید. هر المنت JSX یک Syntactic sugar است برای صدا زدن [`()React.createElement`](#createelement). اگر از JSX استفاده کنید، معمولا متدهای زیر را به شکل مستقیم فراخوانی نخواهید کرد.

- [`()createElement`](#createelement)
- [`()createFactory`](#createfactory)

برای آگاهی بیشتر از بخش [ری‌اکت بدون استفاده از JSX](/docs/react-without-jsx.html) دیدن کنید.

### تبدیل المنت‌ها {#transforming-elements}

`React`، چندین API برای دست‌کاری کردن المنت‌ها فراهم می‌کند:

- [`()cloneElement`](#cloneelement)
- [`()isValidElement`](#isvalidelement)
- [`React.Children`](#reactchildren)

### فرگمنت‌ها {#fragments}

`React` همچنین برای یک کامپوننت، امکان رندر کردن چند المنت بدون استفاده از wrapper را فراهم می‌سازد.

- [`React.Fragment`](#reactfragment)

### Refs {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### تعلیق (Suspense) {#suspense}

Suspense به کامپوننت‌ها اجازه می‌دهد تا قبل از رندر شدن، برای چیزی «صبر» کنند. فعلا Suspense فقط یک مورد کاربرد را پشتیبانی می‌کند: [بارگذاری پویای کامپوننت‌ها با استفاده از `React.lazy`](/docs/code-splitting.html#reactlazy). در آینده، از مورد کاربردهای دیگری چون واکشی داده (data fetching) پشتیبانی خواهد کرد.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Transitions {#transitions}

*Transitions* یک ویژگی همروند (concurrent) جدیدی است که در React 18 معرفی شده است. آنها به شما اجازه می دهند به‌روزرسانی‌ها را به عنوان transition علامت گذاری کنید، که به React می گوید که می توان آنها را قطع کرد و از fallback در Suspense برای محتوای قابل مشاهده خودداری کرد.

- [`React.startTransition`](#starttransition)
- [`React.useTransition`](/docs/hooks-reference.html#usetransition)

### Hooks {#hooks}

*هوک‌ها* یک افزونه جدید در ری‌اکت ۱۶.۸ هستند. آن‌ها به شما این توانایی را می‌دهند که بدون نوشتن کلاس از state بهره ببرید. هوک‌ها یک [بخش توضیحات جدا](/docs/hooks-intro.html) و یک  مرجع API جدا دارند:

- [هوک‌های پایه](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [هوک‌های افزوده](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)
  - [`useDeferredValue`](/docs/hooks-reference.html#usedeferredvalue)
  - [`useTransition`](/docs/hooks-reference.html#usetransition)
  - [`useId`](/docs/hooks-reference.html#useid)
- [Library Hooks](/docs/hooks-reference.html#library-hooks)
  - [`useSyncExternalStore`](/docs/hooks-reference.html#usesyncexternalstore)
  - [`useInsertionEffect`](/docs/hooks-reference.html#useinsertioneffect)

* * *

## مرجع {#reference}

### `React.Component` {#reactcomponent}

`React.Component` کلاس پایه است برای کامپوننت‌های ری‌اکت وقتی به روش [ کلاس‌های ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) تعریف شده باشند:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

 [مرجع React.Component API](/docs/react-component.html) را برای لیستی از متدها و ویژگی‌های مربوط به کلاس پایه `React.Component` ببینید.

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` به [`React.Component`](#reactcomponent) شبیه است. تفاوت آن‌ها این است که [`React.Component`](#reactcomponent) تابع [`()shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate) را پیاده‌سازی نمی‌کند، ولی `React.PureComponent` آن‌را با یک قیاس سطحی props و state پیاده‌سازی می‌کند.

اگر تابع `render()` کامپوننت ری‌اکت شما، در صورت یکسان بودن props و state، خروجی یکسان تولید می‌کند، برای ارتقای کارایی در برخی از موارد می‌توانید از `React.PureComponent` استفاده کنید.

> نکته
>
> `shouldComponentUpdate()` در `React.PureComponent` فقط به صورت سطحی آبجکت‌ها را مقایسه می کند. اگر این آبجکت‌ها دارای ساختارهای داده پیچیده باشند، ممکن است برای تفاوت های عمیق تر، منفی کاذب ایجاد کند. `PureComponent` را فقط زمانی extend کنید که انتظار دارید دارای props و state ساده باشید، یا از [`forceUpdate()`](/docs/react-component.html#forceupdate) زمانی استفاده کنید که بدانید ساختارهای داده عمیق تغییر کرده‌اند. یا، استفاده از [آبجکت‌های غیرقابل تغییر] (https://immutable-js.com/) را برای تسهیل مقایسه سریع داده‌های تودرتو در نظر بگیرید.
>
> علاوه بر این، `shouldComponentUpdate()` در `React.PureComponent`، به‌روز شدن state و props را در کل زیردرخت کامپوننت درنظر نمی‌گیرد. پس مطمئن شوید که همه‌ی کامپوننت‌های فرزند نیز «pure» باشند.

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` یک [کامپوننت مرتبه بالا](/docs/higher-order-components.html) می‌باشد.

اگر کامپوننت شما در صورت گرفتن props یکسان، نتیجه‌ی یکسان تولید می‌کند، می‌توانید آن‌را در یک فراخوانی `React.memo`، wrap کنید تا با یادداشت‌برداری نتیجه، کارایی را بالا برید. این کار به آن معناست که ری‌اکت رندر کردن کامپوننت را در نظر نمی‌گیرد و آخرین نتایج رندرهای قبلی را درنظر می‌گیرد.

`React.memo` تنها تغییرات props را بررسی می‌کند. اگر کامپوننت شما درون `React.memo` قرار گرفته‌است و در آن از هوک‌های [`useState`](/docs/hooks-state.html)، [`useReducer`](/docs/hooks-reference.html#usereducer) یا [`useContext`](/docs/hooks-reference.html#usecontext) استفاده شده‌است، تغییر state یا context باعث رندر شدن مجدد می‌شود.

به صورت پیش‌فرض این فقط یک مقایسه سطحی بین اشیاء موجود در شیء props انجام می‌دهد. اگر می‌خواهید خودتان این مقایسه را کنترل کنید، می‌توانید یک تابع مقایسه شخصی‌سازی شده را به عنوان آرگومان دوم به این تابع بدهید.

```javascript
function MyComponent(props) {
  /* رندر با استفاده از props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

این روش فقط به عنوان **[بهینه‌سازی کارایی](/docs/optimizing-performance.html)** مورد استفاده است. برای «جلوگیری» از رندر، از آن استفاده نکنید، به خاطر آن‌که می‌تواند به خطا سرانجام یابد.

> نکته:
>
> برخلاف متد [`()shouldComponentUpdate`](/docs/react-component.html#shouldcomponentupdate) در کامپوننت‌های به شکل کلاس، تابع`areEqual` مقدار `true` را بازمی‌گرداند اگر propها یکسان باشند و `false` برمیگرداند اگر propها متفاوت باشند. این رفتاری عکس `shouldComponentUpdate`می‌باشد.

* * *

### `()createElement` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

ایجاد و برگرداندن یک [المنت ری‌اکت](/docs/rendering-elements.html) جدید با توجه به نوع (type) داده شده. آرگومان نوع داده شده می‌تواند رشته‌ی نام یک تگ (مثل `'div'` یا `'span'`)، یک نوع [کامپوننت ری‌اکت](/docs/components-and-props.html) (کلاس یا تابع)، یا یک نوع [فرگمنت ری‌اکت](#reactfragment) باشد.

کد نوشته شده با [JSX](/docs/introducing-jsx.html) تبدیل به حالتی می‌شود که از `React.createElement()` استفاده کند. شما در حالت معمول اگر از  JSX استفاده کنید به صورت مستقیم `React.createElement()` را فرا نمی‌خوانید. [ری‌اکت بدون استفاده از JSX](/docs/react-without-jsx.html) را برای یادگیری بیشتر ببینید.

* * *

### `()cloneElement` {#cloneelement}

```
React.cloneElement(
  element,
  [config],
  [...children]
)
```

شبیه‌سازی (clone) و برگرداندن یک المنت جدید ری‌اکت با استفاده از `element` به عنوان نقطه شروع جدید. `config` باید تمامی props های جدید، `key` یا `ref` را شامل شود. المنت جدید، دارای props المنت اصلی همراه با props جدید به شکل ترکیب شده سطحی می‌باشد. فرزندان جدید جایگزین فرزندان قبلی می‌شوند. `key` و `ref` المنت اصلی اگر `key` و `ref` جدید در `config` وجود نداشته باشد محفوظ می‌مانند.

`React.cloneElement()` تقریبا برابر است با:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

گرچه، این کار `ref`ها را محفوظ نگاه می‌دارد. این به آن معناست که اگر شما یک فرزند را با `ref` آن دریافت کنید، آن‌را به شکل اتفاقی از اجداد خود سرقت نمی‌کنید. شما `ref` یکسان متصل شده به المنت جدید خواهید داشت. `ref` و `key` جدید اگر وجود داشته باشند جایگزین قدیمی‌ها می‌شوند.

این API به عنوان جایگزینی برای `React.addons.cloneWithProps()` منسوخ شده معرفی شد.

* * *

### `()createFactory` {#createfactory}

```javascript
React.createFactory(type)
```

یک تابع برمی‌گرداند که المنت‌های ری‌اکت با نوع داده شده را تولید می‌کند. مثل [`()React.createElement`](#createelement)، آرگومان نوع داده شده می‌تواند رشته‌ی نام یک تگ (مثل `'div'` یا `'span'`)، یک نوع [کامپوننت ری‌اکت](/docs/components-and-props.html) (کلاس یا تابع)، یا یک نوع [فرگمنت ری‌اکت](#reactfragment) باشد.

این helper یک نوع قدیمی(legacy) محسوب می‌شود و ما شما را تشویق می‌کنیم که به صورت مستقیم از `React.createElement()` یا JSX استفاده کنید.

اگر از JSX استفاده کنید، معمولا `React.createFactory()` را مستقیما فراخوانی نخواهید کرد. [ری‌اکت بدون استفاده از JSX](/docs/react-without-jsx.html) را برای یادگیری بیشتر ببینید.

* * *

### `()isValidElement` {#isvalidelement}

```javascript
React.isValidElement(object)
```

بررسی میکند که آیا شیء مورد نظر، المنت ری‌اکت هست یا خیر. `true` یا `false` برمی‌گرداند.

* * *

### `React.Children` {#reactchildren}

`React.Children` ابزاری برای کار با ساختمان‌داده‌ی غیرشفاف`this.props.children` فراهم می‌کند.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

یک تابع روی هر فرزند immediate داخل `children` فرامی‌خواند که `this`  را به عنوان `thisArg` تنظیم می‌کند. اگر `children` یک آرایه باشد از آن میگذرد و تابع روی تک‌تک فرزند‌های درون آرایه اجرا می‌شود. اگر `children`، `null` یا `undefined` باشد، این متد به جای یک آرایه، `null` یا `undefined` برمی‌گرداند.

> نکته:
>
> اگر `children`، یک `فرگمنت` باشد به عنوان یک فرزند تنها با آن برخورد می‌شود و از آن نمی‌گذرد.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

مانند [`()React.Children.map`](#reactchildrenmap) است ولی آرایه‌ای برنمی‌گرداند.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

تعداد کامپوننت‌های موجود در `children` را برمی‌گرداند، برابر تعداد دفعاتی است که callback داده شده به `map` یا `forEach` فراخوانی شده است.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

بررسی می‌کند که آیا `children` فقط یک فرزند (المنت ری‌اکت) دارد و آن را برمی‌گرداند. در غیراین‌صورت این متد یک ارور برمی‌گرداند.

> نکته:
>
>`React.Children.only()`، مقدار برگردانده شده توسط  [`()React.Children.map`](#reactchildrenmap) را قبول نمی‌کند زیرا یک آرایه است نه یک المنت ری‌اکت.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

ساختمان‌ داده‌ی غیرشفاف `children` را به شکل یک آرایه‌ی مسطح با فرزندهایی که به هرکدام یک کلید اختصاص ‌داده شده برمی‌گرداند. کاربردی است اگر بخواهید مجموغه‌هایی از فرزندان را در متدهای رندر خود دستکاری کنید، مخصوصا اگر بخواهید `this.props.children` را قبل از پاس دادن به سطوح پایین‌تر، قطعه‌قطعه یا دوباره مرتب کنید.

> نکته:
>
> `React.Children.toArray()` در فرایند مسطح‌سازی لیست فرزندان، کلیدها را تغییر می‌دهد تا معنای آرایه‌های تودرتو حفظ شود. به این معنا که، `toArray`، هر کلید را پیشوندگذاری می‌کند تا کلید هر المنت به‌‌ همان آرایه‌ی واردشده‌ای محدود شود که دارای آن کلید بوده است .

* * *

### `React.Fragment` {#reactfragment}

کامپوننت `React.Fragment` به شما این توانایی را می‌دهد تا چندین المنت را در متد `render()` برگردانید، بدون آن‌که المنت DOM جدیدی بسازید:

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

 همچنین می‌توانید آن را به شکل خلاصه‌ی `<></>` نمایش دهید. برای آگاهی بیشتر، [ری‌اکت نسخه‌ی 16.2.0: پشتیبانی ارتقا یافته از فرگمنت‌ها](/blog/2017/11/28/react-v16.2.0-fragment-support.html) را ببینید.


### `React.createRef` {#reactcreateref}

`React.createRef` یک [ref](/docs/refs-and-the-dom.html) می‌سازد که می‌تواند با استفاده از خصوصیت ref به المنت متصل شود.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` یک کامپوننت ری‌اکت ایجاد می‌کند که خصوصیت [ref](/docs/refs-and-the-dom.html) دریافت شده را به کامپوننت زیرین در درخت فوروارد کند. این روش خیلی معمول نیست مگر در دو مورد:

* [فوروارد refها به کامپوننت‌های DOM](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [فوروارد refها در کامپوننت‌های مرتبه‌ بالا](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef`، یک تابع رندرکننده را به عنوان آرگومان می‌پذیرد. ری‌اکت این تابع را با `props` و `ref` به عنوان دو آرگومان صدا می‌زند. این تابع باید یک نود ری‌اکت برگرداند.

`embed:reference-react-forward-ref.js`

در مثال بالا، ری‌اکت، `ref`  داده شده به المنت `<FancyButton ref={ref}>` را به عنوان آرگومان دوم به تابع رندرکننده صدازده‌ شده درون  `React.forwardRef` می‌دهد. این تابع رندرکننده، `ref` را به المنت `<button ref={ref}>` انتقال می‌دهد.

در نتیجه، بعد از این‌که ری‌اکت، ref را متصل کرد، `ref.current` مستقیما به المنت DOM مربوط به `<button>` اشاره می‌کند.

برای آگاهی بیشتر، [فوروارد refها](/docs/forwarding-refs.html) را ببینید.

### `React.lazy` {#reactlazy}

`React.lazy()` به شما اجازه می‌دهد کامپوننتی تعریف کنید که به شکل پویا بارگذاری می‌شود. این کمک می‌کند تا حجم بسته‌ی نهایی(bundle) کاهش یابد تا بارگذاری کامپوننت‌هایی که در رندر ابتدایی استفاده نشده‌اند را به تعویق اندازد.

می‌توانید برای یادگیری نحوه‌ی استفاده از آن به [سند بخش‌بندی کد](/docs/code-splitting.html#reactlazy) بروید. ممکن است بخواهید [این مقاله](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) را بررسی کنید، که در مورد چگونگی استفاده از آن با جزئیاتی بیشتر توضیح داده است .

```js
// این کامپوننت به صورت پویا بارگذاری می‌شود
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

توجه کنید که کامپوننت‌های `lazy` نیازمند وجود یک کامپوننت `<React.Suspense>` در سطوح بالاتر درخت رندر هستند. این نحوه‌ی مشخص کردن یک loading indicator است.

### `React.Suspense` {#reactsuspense}

`React.Suspense` به شما امکان می‌دهد در صورتی که برخی از اجزای درخت زیر آن هنوز آماده رندر نیستند، نشانگر بارگذاری (loading indicator) را مشخص کنید. در آینده قصد داریم به `Suspense` اجازه دهیم سناریوهای بیشتری مانند fetch کردن داده را مدیریت کند. می‌توانید در این مورد در [نقشه راه ما](/blog/2018/11/27/react-16-roadmap.html) بخوانید.

امروزه، بارگذاری lazy کامپوننت‌ها **تنها** مورد استفاده است که توسط `<React.Suspense>` پشتیبانی می‌شود:

```js
// این کامپوننت به صورت پویا بارگذاری می‌شود
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

این قسمت در [راهنمای بخش‌بندی کد](/docs/code-splitting.html#reactlazy) توضیح داده شد‌ه‌است. توجه کنید که کامپوننت‌های `lazy` می‌توانند در اعماق یک درخت `Suspense` موجود باشند (نیازی نیست که تک‌تک آن‌ها را به این شکل wrap کنید) . بهترین تمرین این است که `<Suspense>` را جایی قرار دهید که میخواهید یک  loading indicator مشاهده کنید، اما `lazy()` را جایی قرار دهید که می‌خواهید کد را بخش‌بندی کنید.

> نکته
>
> برای محتوایی که قبلاً به کاربر نشان داده شده است، بازگشت به نشانگر بارگزاری (loading indicator) می‌تواند باعث سردرگمی شود. گاهی اوقات بهتر است در حالی که رابط کاربری جدید در حال آماده شدن است، رابط کاربری "قدیمی" نشان داده شود. برای انجام این کار، می‌توانید از APIهای transition جدید [`startTransition`](#starttransition) و [`useTransition`](/docs/hooks-reference.html#usetransition) برای علامت‌گذاری به‌روزرسانی‌ها به‌عنوان transition و جلوگیری از fallback های غیرمنتظره استفاده کنید.

#### `React.Suspense` در رندر سمت سرور {#reactsuspense-in-server-side-rendering}
در طول رندر سمت سرور، مرزهای Suspense به شما این امکان را می دهد که برنامه خود را در تکه‌های های کوچکتر با suspend کردن flush کنید.
هنگامی که یک کامپوننت به حالت تعلیق (suspend) در می‌آید، ما یک تسک با اولویت پایین را برنامه‌ریزی می‌کنیم تا fallback مربوط به نزدیک‌ترین مرز Suspense را رندر کنیم. اگر کامپوننت قبل از flush کردن از حالت تعلیق خارج شود، محتوای واقعی را ارسال می کنیم و fallback را دور می اندازیم.

<<<<<<< HEAD
#### `React.Suspense` در طول hydration {#reactsuspense-during-hydration}
مرزهای Suspense به این بستگی دارد که قبل از اینکه خودشان بتوانند hydrate شوند، مرزهای والدین آنها hydrate شوند، اما می توانند مستقل از مرزهای خواهر و برادر hydrate شوند. رویدادها (events) روی یک مرز (boundary) قبل از hydrate شدن آن باعث می‌شود تا این مرز
با اولویت بالاتر از مرزهای همسایه hydrate شود. [بیشتر بخوانید](https://github.com/reactwg/react-18/discussions/130)
=======
#### `React.Suspense` during hydration {#reactsuspense-during-hydration}
Suspense boundaries depend on their parent boundaries being hydrated before they can hydrate, but they can hydrate independently from sibling boundaries. Events on a boundary before it is hydrated will cause the boundary to hydrate at a higher priority than neighboring boundaries. [Read more](https://github.com/reactwg/react-18/discussions/130)
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f

### `React.startTransition` {#starttransition}

```js
React.startTransition(callback)
```
`React.startTransition` به شما امکان می‌دهد به‌روزرسانی‌های موجود در callback ارائه‌شده را به‌عنوان transition علامت‌گذاری کنید. این روش برای استفاده در مواقعی طراحی شده است که [`React.useTransition`](/docs/hooks-reference.html#usetransition) در دسترس نباشد.

> نکته:
>
> به‌روزرسانی‌ها در یک transition در مقابل به‌روزرسانی‌های با اولویت بالاتر مانند کلیک‌ تسلیم می‌شوند.
>
> به‌روزرسانی‌های در transition، برای محتوایی که مجدد معلق (suspend) شده‌اند دیگر fallback را نشان نمی‌دهند، و به کاربر اجازه می‌دهند در حین رندرشدن به‌روزرسانی به تعامل ادامه دهند.
>
> `React.startTransition` یک پرچم `isPending` ارائه نمی کند. برای ردیابی وضعیت معلق یک transition به [`React.useTransition`](/docs/hooks-reference.html#usetransition) مراجعه کنید.
