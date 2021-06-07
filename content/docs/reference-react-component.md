---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

این صفحه شامل جزئیات دقیق منابع API ری‌اکت برای تعریف کامپوننت از جنس کلاس‌ است. فرض شده‌است که شما با مفاهیم بنادین ری‌اکت مانند [کامپوننت‌ها و Props](/docs/components-and-props.html) و [State و چرخه حیات](/docs/state-and-lifecycle.html) آشنا هستید. در غیر‌این‌صورت ابتدا آن‌ها را مطالعه نمایید.

## بررسی اجمالی {#overview}

ری‌اکت به شما اجازه می‌دهد تا کامپوننت‌ها را به عنوان کلاس یا تابع تعریف کنید. کامپوننت‌هایی که به عنوان کلاس تعریف می‌شوند در حال حاضر امکانات بیشتری را فراهم می‌کنند که در این صفحه با جزئیات کامل تشریح شده‌است. برای تعریف یک کلاس کامپوننت ری‌اکت شما به گسترش `React.Component` نیاز دارید:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

تنها متدی که شما *باید* در یک زیرکلاس `React.Component` تعریف کنید، [`render()`](#render) نام دارد. تمامی متدهای دیگر تشریح شده در این صفحه، اختیاری هستند.

**ما به شدت مخالف این هستیم که شما برای خودتان کلاس‌های کامپونت مادر ایجاد کنید**. در کاپوننت‌های ری‌اکت، [استفاده مجدد از کد بیشتر از طریق ترکیب قابل دستیابی است تا وراثت](/docs/composition-vs-inheritance.html).

>نکته:
>
>ری‌اکت شما را مجبور به استفاده از قوانین کلاس‌ها در ES6 نمی‌کند. اگر ترجیح می‌دهید که از این قوانین استفاده کنید، می‌توانید از ماژول `create-react-class` یا تجریدهای شخصی‌سازی شده مشابه استفاده نمایید. برای اطلاعات بیشتر به [Using React without ES6](/docs/react-without-es6.html) نگاهی بیاندازید.

### چرخه‌ی حیات کامپوننت {#the-component-lifecycle}

هر کامپوننت چندین "متد چرخه‌ی حیات" دارد که شما می‌توانید بازنویسی کنید تا در زمان‌های خاص فرآیند اجرا، کد شما اجرا شود. **شما می‌توانید از [این دیاگرام چرخه‌حیات](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) به عنوان راهنما استفاده کنید.** در لیست زیر، متدهای چرخه‌ی حیات رایج به صورت **برجسته** نشانه‌گذاری شده‌اند. باقی آن‌ها برای موارد نادر استفاده وجود دارند.

#### اجرای اولیه (Mounting) {#mounting}

این متدها به ترتیب زیر هنگام ایجاد یک نمونه از کامپوننت و درج آن در DOM صدا زده می‌شوند:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>نکته:
>
>این متدها موروثی در نظر گرفته می‌شوند و شما باید از آن‌ها در کد جدید [خودداری کنید](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### به‌روز رسانی {#updating}

یک به‌روز رسانی می‌تواند به وسیله تغییر دادن state یا props رخ دهد. این متدها هنگامی که یک کامپوننت دوباره رندر می‌شود به ترتیب زیر صدا زده می‌شوند:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>نکته:
>
>این متدها موروثی در نظر گرفته می‌شوند و شما باید از آن‌ها در کد جدید [خودداری کنید](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### نابود شدن (Unmounting) {#unmounting}

این متدها هنگامی که یک کامپوننت از DOM پاک می‌شود صدا زده می‌شوند:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### کنترل خطا {#error-handling}

این متدها هنگام بروز خطا در زمان رندر شدن، در یکی از متدهای چرخه‌ی حیات و یا در سازنده هر کدام از کامپوننت‌های فرزند صدا زده می‌شوند:

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### دیگر API‌ها {#other-apis}

همچنین هر کامپوننت API های دیگری نیز فراهم می‌کند:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### ویژگی‌های کلاس {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### ویژگی‌های Instance {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## مرجع {#reference}

### متدهای چرخه‌ی حیات رایج {#commonly-used-lifecycle-methods}

متدهای این بخش اکثریت قریب به اتفاق موارد کاربردی که شما هنگام ایجاد کامپوننت‌های ری‌اکت با آن‌ها مواجه می‌شوید را پوشش می‌دهد. **برای یک مرجع بصری، [این دیاگرام چرخه‌ی حیات](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) را بررسی کند.**

### `render()` {#render}

```javascript
render()
```

`render()` تنها متد ضروری در یک کلاس کامپوننت است.

هنگام فراخوانی، باید `this.props` و `this.state` را بررسی کند و یکی از موارد زیر را بازگرداند:

- **المنت‌های ری‌اکت.** معمولا با [JSX](/docs/introducing-jsx.html) ایجاد می‌شود. برای مثال، `<div />` و `<MyComponent />` المنت‌های ری‌اکت هستند که ری‌اکت را راهنمایی می‌کنند تا یک نود DOM، یا کامپوننت دیگری که توسط کاربر تعریف شده‌است را رندر کند.
- **آرایه‌ها و فرگمنت‌ها.** به شما اجازه می‌دهد تا چند المنت را از رندر بازگردانید. مستندات [فرگمنت‌ها](/docs/fragments.html) را برای اطلاعات بیشتر مطالعه کنید.
- **پرتال‌ها.** به شما اجازه می‌دهد تا فرزندان را در یک زیردرخت متفاوت DOM رندر کنید. مستندات [پرتال‌ها](/docs/portals.html) را برای اطلاعات بیشتر مطالعه کنید.
- **رشته متنی و اعداد.** این‌ها به عنوان نودهای متنی در DOM رندر می‌شوند.
- **متغیرهای بولی یا `null`.** چیزی رندر نمی‌کنند. (به طور کلی برای پشتیبانی از الگوی `return test && <Child />`، هنگامی که `test` یک متغیر بولی است وجود دارد.)

تابع `render()` باید خالص باشد، به این معنی که نباید state را تغییر دهد، هر بار که فراخوانی می‌شود نتیجه یکسان بازمی‌گرداند و به صورت مستقیم با مرورگر تعاملی ندارد.

اگر به تعامل با مرورگر نیاز دارید، عملیات خود را در `componentDidMount()` یا دیگر متدهای چرخه‌ی حیات انجام دهید. خالص نگه داشتن `render()` فکر کردن به کامپوننت‌ها را آسان‌تر می‌کند.

> نکته:
>
> تابع `render()` فراخوانی نخواهد شد، اگر [`shouldComponentUpdate()`](#shouldcomponentupdate) مقدار false را بازگرداند.```

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**اگر state را در ابتدا مقداردهی نمی‌کنید و متدها را bind نمی‌کنید، نیازی به پیاده‌سازی سازنده برای کامپوننت ری‌اکت خود نیست.**

سازنده‌ی یک کامپوننت ری‌اکت قبل از اجرای اولیه‌اش صدا زده می‌شود. هنگام پیاده‌سازی سازنده برای یک زیرکلاس `React.Component`، شما باید `super(props)` را قبل از هر قطعه کدی صدا بزنید. درغیراینصورت، `this.props` در سازنده undefined خواهد بود که می‌تواند باعث بروز باگ شود.

معمولا، سازنده‌ها تنها به دو دلیل در ری‌اکت استفاده می‌شوند:

* مقداردهی اولیه‌ی [state محلی](/docs/state-and-lifecycle.html) توسط انتصاب یک آبجکت به `this.state`.
* Bind کردن متدهای [event handler](/docs/handling-events.html) به یک instance.

شما **به هیچ عنوان نیابد `setState()` را در `constructor()`** صدا بزنید. برای این کار، اگر کامپوننت شما به استفاده از state محلی نیاز دارد، **state اولیه را مستقیما برابر `this.state`** در سازنده قرار دهید:

```js
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

سازنده تنها جایی‌است که باید `this.state` را مسقیما برابر مقداری قرار دهید. در دیگر متدها، نیاز دارید تا از `this.setState()` استفاده کنید.

از معرفی هرگونه تاثیر جانبی (side-effect) و یا ثبت اشتراک (subscription) در سازنده خودداری نمایید. برای چنین موارد، از `componentDidMount()` استفاده کنید.

>نکته:
>
>**از کپی کردن props در state خودداری نمایید! این یک اشتباه رایج است:**
>
>```js
>constructor(props) {
>  super(props);
>  // Don't do this!
>  this.state = { color: props.color };
>}
>```
>
>مشکل اینجاست که هردو کار غیرضروری است (شما می‌توانید مستقیما از `this.props.color` استفاده کنید )، و باگ ایجاد می‌کند (به‌روز رسانی‌های `color` در prop تاثیری بر روی state نمی‌گذارد).
>
>**تنها در صورتی که می‌خواهید عمدا به‌روز رسانی‌های prop را نادیده بگیرید از این الگو استفاده کنید.** در این صورت، منطقی است که prop را تغییر نام دهید که `initialColor` یا `defaultColor` صدا زده شود. در مواقع لزوم، می‌توانید یک کامپوننت را به وسیله [تغییر `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) به "reset" کردن state داخلی‌اش مجبور کنید.
>
>[پست وبلاگ مربوط به خودداری از state مشتق شده](/blog/2018/06/07/you-probably-dont-need-derived-state.html) را بخوانید تا در صورتی که فکر می‌کنید نیاز به وابستگی بعضی state ها به props دارید، چگونگی انجام دادن آن را یاد بگیرید.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

`componentDidMount()` فورا پس از اجرا و نصب اولیه‌ی یک کامپوننت (زمانی که در درخت درج می‌شود) صدا زده می‌شود. مقداردهی اولیه‌ای که نودهای DOM نیاز دارند باید اینجا باشد. در صورتی که نیاز دارید که از یک endpoint راه دور داده دریافت کنید، اینجا محل خوبی برای پیاده‌سازی درخواست‌‌های شبکه است.

این متد مکان خوبی برای تنظیم کردن هرگونه اشتراک است. اگر این‌کار را انجام می‌دهید، لغو اشتراک در `componentWillUnmount()` فراموش نکنید.

شما **ممکن است `setState()` را فورا** در `componentDidMount()` **صدا بزنید.** این باعث یک رندر اضافی می‌شود، اما قبل از اینکه مرورگر صفحه را بروز کند اتفاق می‌افتد و تضمین می‌کند که حتی با وجود اینکه `render()` در این مورد دو بار صدا زده خواهد شد، کاربر state واسطی را نخواهد دید. از این الگو با‌احتیاط استفاده کنید چرا که اغلب موارد باعث مشکلات کارایی خواهد شد. در عوض در اکثر موارد، شما باید بتوانید state اولیه را در `constructor()` مقداردهی کنید. به هر حال این‌کار می‌تواند برای مواردی مانند modal ها و یا tooltip ها، زمانی که شما نیاز به بررسی یک نود DOM قبل از رندر شدن چیزی که وابسته به ابعاد و مکانش است دارید، ضروری باشد.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` بلافاصله پس از رخ دادن هر به‌روز رسانی صدا زده می‌شود. این متد برای رندر اولیه صدا زده نمی‌شود.

از این فرصت برای انجام عملیات بر روی DOM در زمانی که کامپوننت بروز شده‌است استفاده کنید. همچنین مکان مناسبی برای انجام درخواست‌های شبکه،  مادامی که props فعلی را با props قبلی مقایسه می‌کنید می‌باشد (برای مثال درخواست شبکه در صورتی که props تغییری نکرده است ضروری نیست).

```js
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

شما ممکن است **`setState()` را فورا** در `componentDidUpdate()` **صدا بزنید** اما در نظر داشته باشید که مانند مثال بالا **باید در یک شرط قرار داشته باشد.** در غیر اینصورت شما در یک حلقه‌ی بی‌نهایت گرفتار خواهید شد. همچنین باعث رندر اضافی می‌شود که گرچه برای کاربر قابل مشاهده نیست، می‌تواند بر روی کارایی کامپوننت تاثیر گذارد. اگر تلاش می‌کنید تا بعضی state ها را به یک prop که از بالا می‌آید "mirror" کنید، استفاده مستقیم از prop را به عنوان جایگزین در نظر بگیرید. در مورد [چرا کپی کردن props در state باعث باگ می‌شود؟](/blog/2018/06/07/you-probably-dont-need-derived-state.html) بخوانید.

اگر کامپوننت شما چرخه‌ی حیات `getSnapshotBeforeUpdate()` را پیاده‌سازی می‌کند (که نادر است)، مقداری که برمی‌گرداند به عنوان پارامتر سوم "snapshot" به `componentDidUpdate()` پاس داده می‌شود. در غیر اینصورت این پارامتر undefined خواهد بود.

> نکته
>
> اگر [`shouldComponentUpdate()`](#shouldcomponentupdate) مقدار false بازگرداند، `componentDidUpdate()` اجرا نخواهد شد.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` بلافاصله قبل از اینکه یک کامپوننت نابود شود صدا زده می‌شود. هر گونه پاکسازی ضروری مانند غیرفعالسازی تایمرها، لغو درخواست‌های شبکه و یا لغو اشتراک‌های ایجاد شده در `componentDidMount()`، در این متد انجام می‌پذیرد.

در `componentWillUnmount()` **نباید `setState()` را صدا بزنید** چرا که کامپوننت هیچگاه دوباره رندر نخواهد شد. به محض اینکه یک instance کامپوننت نابود می‌شود، هرگز دوباره نصب و اجرا نخواهد شد.

* * *

### متدهای چرخه‌ی حیات با کاربرد کم {#rarely-used-lifecycle-methods}

متدهای این بخش به موارد استفاده غیررایج مربوط هستند. آن‌ها یک زمانی کاربردی بودند، اما کامپوننت‌های شما احتمالا نیازی به هیچ‌یک از آن‌ها نخواهند داشت. **شما می‌توانید اکثر این متدها را در [این دیاگرام چرخه‌ی حیات](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) ببینید. برای این منظور بر روی "Show less common lifecycles" در بالای ان کلیک کنید.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

با استفاده از `shouldComponentUpdate()` به ری‌اکت می‌فهمانید که خروجی کامپوننت متاثر از تغییر کنونی در state یا props نیست. رفتار پیش‌فرض این متد، رندر دوباره به ازای هر تغییر در state است، که در اکثریت قریب به اتفاق موارد شما باید به رفتار پیش‌فرض آن اعتماد کنید.

`shouldComponentUpdate()` قبل از رندر شدن در هنگام دریافت state یا props جدید صدا زده می‌شود. به طور پیش‌فرض مقدار `true` برمی‌گرداند. این متد هنگام رندر اولیه یا زمانی که `forceUpdate()` استفاده می‌شود صدا زده نمی‌شود.

این متد تنها به عنوان یک **[بهینه‌سازی کارایی](/docs/optimizing-performance.html)** وجود دارد. برای جلوگیری از یک رندر از آن استفاده نکنید چرا که باعث بروز باگ‌ها می‌شود. استفاده از **[`PureComponent`](/docs/react-api.html#reactpurecomponent) داخلی** را به جای نوشتن دستی `shouldComponentUpdate()` **در نظر بگیرید.** `PureComponent` یک مقایسه سطحی میان props و state انجام می‌دهد و شانس اینکه شما یک بروزرسانی ضروری را رد کنی کاهش می‌دهد.

اگر شما از نوشتن دستی آن مطمئن هستید، شما ممکن است `this.props` را با `nextProps` و `this.state` را با `nextState` مقایسه کنید و در صورتی که به‌روز رسانی می‌تواند رد شود با بازگرداندن `false` این مورد را به ری‌اکت اطلاع دهید. توجه داشته باشید که بازگرداندن `false`، کامپوننت‌‌های فرزند را در هنگام تغییرات state *آن‌ها*، از رندر شدن دوباره منع نمی‌کند.

ما استفاده از بررسی‌های برابری‌ عمیق (deep equality checks) یا `JSON.stringify()` را در `shouldComponentUpdate()` پیشنهاد نمی‌کنیم چرا که بسیار ناکارآمد است و به کارایی ضربه می‌زند.

در حال حاضر، اگر `shouldComponentUpdate()`، مقدار `false` بازگرداند، [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)، [`render()`](#render) و [`componentDidUpdate()`](#componentdidupdate) صدا زده نخواهند شد. در آینده ممکن است ری‌اکت با `shouldComponentUpdate()` به جای یک بخشنامه سختگیرانه، مانند یک راهنمایی رفتار کند و امکان دوباره رندر شدن کامپوننت در صورت بازگرداندن `false` همچنان موجود باشد.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` درست بعد از فراخوانی متد رندر، در هر دو حالت نصب و اجرای اولیه و به‌روز رسانی‌های بعد از آن صدا زده می‌شود. این متد باید یک آبجکت برای به‌روز رسانی state، و یا `null` برای عدم به‌روز رسانی بازگرداند.

این متد برای [موارد استفاده نادر](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) که state وابسته به تغییرات props در طول زمان است وجود دارد. برای مثال، ممکن است برای پیاده‌سازی یک کامپوننت `<Transition>` که فرزند قبلی و بعدی خود را برای تصمیم‌گیری اینکه برای کدام‌یک انیمیشن ورود و برای کدام‌یک انیمیشن خروج را اعمال کند مقایسه می‌کند، کاربردی باشد.

اشتقاق (deriving) state باعث طولانی‌تر شده کد می‌شود، و در نتیجه فکر کردن در مورد کامپوننت شما را سخت می‌کند.
[مطمئن شوید با جایگزین‌های ساده‌تر آشنا هستید:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* اگر نیاز به **انجام یک تاثیر جانبی (side effect)** (برای مثال fetch کردن داده یا اعمال انیمیشن) در پاسخ یک تغییر در props دارید، از متد چرخه‌ی حیات [`componentDidUpdate`](#componentdidupdate) به عنوان جایگزین استفاده کنید.

* اگر می‌خواهید **بعضی داده‌ها را فقط زمان تغییرات یک props محاسبه کنید**، [از یک memoization به عنوان جایگزین استفاده کنید](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* اگر می‌خواهید **بعضی state ها را زمان تغییرات یک prop "بازنشانی (reset)" کنید**، ساخت یک کامپوننت [کاملا کنترل شده](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) یا [کاملا کنترل نشده با یک `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) را به عنوان جایگزین در نظر بگیرید.

این متد به instance کامپوننت دسترسی ندارد. اگر مایل هستید، می‌توانید از بعضی کدها میان `getDerivedStateFromProps()` و دیگر متدهای کلاس برای استخراج توابع خالص props کامپوننت و state، خارج از تعریف کلاس دوباره استفاده کنید.

در نظر داشته باشید این متد بدون در نظر گرفتن دلیل، با *هر* رندر اجرا می‌شود. بنابراین با `UNSAFE_componentWillReceiveProps` که در آن، نه اجرای یک `setState` محلی، بلکه والد باعث یک رندر دوباره می‌شود، در تضاد است.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

<<<<<<< HEAD
`getSnapshotBeforeUpdate()` درست قبل از آخرین خروجی رندر شده‌ای که به DOM سپرده شده‌است صدا زده می‌شود و کامپوننت شما را توانا می‌سازد تا بعضی اطلاعات را (مانند اسکرول کردن مکان صفحه) قبل از اینکه بالقوه تغییر کند از DOM بگیرد. هر مقداری که توسط ین چرخه‌ی حیات بازگردد به عنوان یک پارامتر به `componentDidUpdate()` پاس داده خواهد شد.
=======
`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to `componentDidUpdate()`.
>>>>>>> 68e4efcf93b6e589355f6aa3cbc3f3c811c0ad37

این مورد استفاده رایج نیست، اما ممکن است در رابط‌کاربری‌هایی مانند صفحه‌ی چت که کنترل مکان اسکرول به شکلی خاص نیاز است، رخ دهد.

یک مقدار از snapshot (یا `null`) باید بازگردانده شود.

برای مثال:

`embed:react-component-reference/get-snapshot-before-update.js`

در مثال بالا، خواندن ویژگی `scrollHeight` در `getSnapshotBeforeUpdate` مهم است چرا که ممکن است تاخیرهایی بین فاز "رندر شدن" چرخه‌ی حیات (مانند `render`) و فاز "commit" چرخه‌ی حیات (مانند `getSnapshotBeforeUpdate` و `componentDidUpdate`) وجود داشته باشد.

* * *

### مرزهای خطا (error boundaries) {#error-boundaries}

[مرزهای خطا](/docs/error-boundaries.html) کامپوننت‌های ری‌اکت هستند که خطاهای جاوااسکریپت را هر جایی در درخت کامپوننت‌های فرزندشان می‌گیرند، آن خطا‌ها را در کنسول در قالب لاگ نشان می‌دهند و یک UI به جای درخت کامپوننتی که با خطا مواجه شده‌است، نمایش می‌دهد. مرزهای خطا هنگام رندر شدن، در متدهای چرخه‌ی حیات و در سازنده‌های تمام درخت کامپوننت‌های زیر خود، خطا ها را می‌گیرند.

یک کامپوننت از جنس کلاس در صورتی که هر یک از متدهای چرخه‌ی حیات `static getDerivedStateFromError()`، `componentDidCatch()` یا هردوی آن‌ها را پیاده‌سازی کند، یک مرز خطا می‌شود. به‌روز رسانی state از این متدهای چرخه‌ی حیات به شما اجازه می‌دهد تا خطاهای کنترل نشده‌ی جاوااسکریپتی در درخت زیر آن را بگیرید و یک رابط کاربری مناسب نمایش دهید.

از مرزهای خطا تنها برای بازیابی از خطاهای غیرقابل پیش‌بینی استفاده کنید، **برای کنترل جریان از آن‌ها استفاده نکنید.**

برای اطلاعات بیشتر، [*کنترل خطاها در ری‌اکت ۱۶*](/blog/2017/07/26/error-handling-in-react-16.html) را ببینید.

> نکته
> 
> مرزهای خطا تنها می‌توانند خطاهای کامپوننت‌های درخت **زیر** خودشان را بگیرند. یک مرز خطا نمی‌تواند خطای درون خودش را بگیرد.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

این چرخه‌ی حیات بعد از اینکه یک خطا توسط کامپوننت‌های زاده اولادش رخ داد صدا زده می‌شود.
خطایی که رخ داده است را به عنوان یک پارامتر دریافت می‌کند و باید یک مقدار برای به‌روز رسانی state بازگرداند.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

> نکته
>
> `getDerivedStateFromError()` در فاز "رندر شدن" صدا زده می‌شود، بنابراین تاثیرات جانبی مجاز نیستند.
برای آن موارد، از `componentDidCatch()` استفاده کنید.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

این چرخه‌ی حیات بعد از اینکه یک خطا توسط کامپوننت‌های زاده اولاد رخ دهد صدا زده می‌شود.
دو پارامتر دریافت می‌کند:

1. `error` - خطایی که رخ داده است.
2. `info` - یک آبجت با کلید `componentStack` شامل [اطلاعات در مورد اینکه در کدام کامپوننت خطا رخ داده است](/docs/error-boundaries.html#component-stack-traces).

`componentDidCatch()` در فاز "commit" صدا زده می‌شود، بنابراین تاثیرات جانبی مجاز هستند.
باید برای چیزهایی مانند لاگ کردن خطاها استفاده شود:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

نسخه‌های ساخته‌شده برای [محیط‌های] production (تولید) و development (توسعه) ری‌اکت تفاوت جزیی در چگونگی برخورد با خطا‌های `componentDidCatch()` دارند.

روی [محیط] توسعه، خطا‌ها به بالا حرکت می‌کنند تا به `window` برسند، به این معنی که هرکدام از `window.onerror` یا `window.addEventListener('error', callback)` در مسیر خطاهای که توسط `componentDidCatch()` گرفته شده‌اند، قرار می‌گیرند.

روی [محیط] تولید، در عوض خطا‌ها به بالا حرکت نمی‌کنند، به این معنی که هر error handler تنها خطاهایی را دریافت می‌کند که توسط `componentDidCatch()` تولید نشده‌اند.

> نکته
> 
> هنگام رویداد یک خطا، شما می‌توانید با صدا زدن `setState` یک UI به وسیله `componentDidCatch()` رندر کند، اما این در انتشارهای آینده منسوخ خواهد شد.
> از `static getDerivedStateFromError()` برای کنترل رندر کردن UI هنگام بروز خطا استفاده نمایید.

* * *

### متدهای چرخه‌ی حیات قدیمی {#legacy-lifecycle-methods}

متدهای چرخه‌ی حیات زیر به عنوان "قدیمی" نشانه گذاری شده‌اند. آن‌ها همچنان کار می‌کنند، اما ما استفاده از آن‌ها را در کدهای جدید پیشنهاد نمی‌کنیم. شما می‌توانید [در این مطلب وبلاگ](/blog/2018/03/27/update-on-async-rendering.html) در مورد مهاجرت از متدهای چرخه‌ی حیات قدیمی بیشتر یاد بگیرید.

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> نکته
>
> این چرخه‌ی حیات قبلا `componentWillMount` نام داشت. این اسم تا نسخه ۱۷ کار خواهد کرد. از [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) برای به‌روز رسانی خودکار کامپوننت‌هایتان استفاده کنید.

`UNSAFE_componentWillMount()` درست قبل از اجرای اولیه صدا زده می‌شود. قبل از `render()` صدا زده می‌شود، بنابراین صدا زدن `setState()` به صورت همزمان (synchronously) در این متد باعث رندر اضافه نخواهد شد. عموما، ما استفاده از `constructor()` را برای مقداردهی اولیه state پیشنهاد می‌کنیم.

از معرفی هرگونه تاثیر جانبی و یا ثبت اشتراک در این متد خودداری کنید. برای چنین موارد استفاده‌ای، از `componentDidMount()` استفاده کنید.

این تنها متد چرخه‌ی حیاتی است که در رندر شدن سمت سرور صدا زده می‌شود.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> نکته
>
> این چرخه‌ی حیات قبلا `componentWillReceiveProps` نام داشت. این نام تا نسخه ۱۷ کار خواهد کرد. برای به‌روز رسانی خودکار کامپوننت‌هایتان از [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) استفاده نمایید.

> نکته:
>
> استفاده از این متد چرخه‌ی حیات اغلب منجر به باگ‌ها و ناپایداری‌ها می‌شود
>
> * اگر نیاز به **انجام یک اثر جانبی** (برای مثال fetch کردن داده و یا اعمال انیمیشن) در پاسخ یک تغییر در props دارید، از چرخه‌ی حیات [`componentDidUpdate`](#componentdidupdate) به عنوان جایگزین استفاده نمایید.
> اگر از `componentWillReceiveProps` برای **محاسبه مجدد برخی داده‌ها زمانی که یک prop تغییر می‌کند** دارید استفاده می‌کردید، [از یک راهنمای memoization استفاده نمایید](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * اگر از `componentWillReceiveProps` برای **"بازنشانی" کردن بعضی state ها هنگام تغییر یک prop** استفاده می‌کردید، ایجاد یک کامپوننت [کاملا کنترل شده](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) یا [کاملا کنترل نشده با یک `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) به عنوان جایگزین را در نظر بگیرید.
>
> برای چنین مواردی، [پیشنهادهای این مطلب وبلاگ در مورد state مشتق شده را دنبال کنید](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` قبل از اینکه یک کامپوننت ایجاد شده props جدید دریافت کند صدا زده می‌شود. اگر نیاز به بروزرسانی state در پاسخ به تغییرات prop دارید (برای مثال reset کردن آن)، ممکن است `this.props` و `nextProps` را مقایسه کنید و یک تغییر state به وسیله `this.setState()` را در این متد انجام دهید.

توجه داشته باشید که اگر یک کامپوننت والد، دلیل دوباره رندر شدن کامپوننت شما باشد، حتی اگر props تغییری نکرده باشد، این متد صدا زده می‌شود. بنابراین اگر می‌خواهید تغییرات را کنترل کنید، از مقایسه مقدار فعلی و بعدی آن مطمئن شوید.

ری‌اکت `UNSAFE_componentWillReceiveProps()` را با props اولیه هنگام [اجرای اولیه](#mounting) صدا نمی‌زند. فقط زمانی این متد صدا زده می‌شود که بعضی از props کامپوننت احتمال تغییر داشته باشند.
صدا زدن `this.setState()` عموما باعث اجرای `UNSAFE_componentWillReceiveProps()` نمی‌شود.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> نکته
>
> این چرخه‌ی حیات قبلا `componentWillUpdate` نام داشت. این اسم تا نسخه ۱۷ کار می‌کند. برای به‌روز رسانی خودکار کامپوننت‌هایتان از [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) استفاده نمایید.

`UNSAFE_componentWillUpdate()` درست قبل از رندر شدن، زمانی که props یا state جدید دریافت می‌شوند صدا زده می‌شود. از این مورد به عنوان یک فرصت برای انجام آماده‌سازی‌های لازم قبل از به‌روز رسانی استفاده نمایید. این متد برای رندر اولیه صدا زده نمی‌شود.

توجه داشته باشید که نمی‌توانید `this.setState()` را اینجا صدا بزنید. همچنین نباید هیچ کار دیگری که باعث اجرای یک به‌روز رسانی برای یک کامپوننت ری‌اکت (مانند dispatch کردن یک اکشن ریداکس) می‌شود انجام دهید، پیش‌از آن‌که  `UNSAFE_componentWillUpdate()` مقداری را بازگرداند.

معمولا، این متد می‌تواند با `componentDidUpdate()` جایگزین شود. اگر شما در این متد چیزی را از DOM می‌خوانید (برای مثال ذخیره محل اسکرول)، می‌توانید آن منطق را به `getSnapshotBeforeUpdate()` منتقل کنید.

> نکته
>
> `UNSAFE_componentWillUpdate()` در صورتی که [`shouldComponentUpdate()`](#shouldcomponentupdate) مقدار false بازگرداند فراخوانی نمی‌شود.

* * *

## دیگر API ها {#other-apis-1}

برخلاف متدهای چرخه‌ی حیات بالا (که ری‌اکت برای شما صدا می‌زند)، متدهای زیر، متدهایی هستند که *شما* می‌توانید از کامپوننت‌هایتان صدا بزنید.

فقط دو تا از آن‌ها وجود دارد: `setState()` و `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater, [callback])
```

`setState()` تغییرات را در state کامپوننت درج می‌کند و به ری‌اکت می‌گوید که این کامپوننت و فزندانش نیاز به یک رندر دوباره با state بروز شده دارند. این متد اصلی است که شما برای به‌روز رسانی رابط کاربری در پاسخ به کنترل کننده‌های رویدادها (event handlers) و پاسخ‌های سرور استفاده می‌نمایید.

`setState()` را به عنوان یک *درخواست* و نه یک دستور برای به‌روز رسانی کامپوننت در نظر بگیرید. برای حس کردن کارایی بهتر، ری‌اکت ممکن است آن را به تاخیر بیاندازد، و سپس چندین کامپوننت را در یک لحظه بروز کند. ری‌اکت تضمین نمی‌کند که تغییرات state فورا اعمال شوند.

`setState()` همیشه در لحظه کامپوننت را بروز نمی‌کند. ممکن است تغییر را بسته‌بندی کرده و یا به تاخیر انداخته باشد. این موضوع خواندن `this.state` درست پس از صدا زدن `setState()` را به یک تله تبدیل کرده‌است. به جای اینکار، از `componentDidUpdate` یا یک `setState` callback (`setState(updater, callback)`) استفاده کنید، که اجرا شدن هر دو پس از اینکه به‌روز رسانی اعمال شده است، تضمین شده است. اگر نیاز به ست کردن state بر اساس state قبلی دارید، در مورد آرگومان `updater` در زیر بخوانید.

`setState()` همیشه منجر به یک رندر دوباره می‌شود مگر اینکه `shouldComponentUpdate()` مقدار `false` را بازگرداند. اگر در حال استفاده از آبجکت‌های قابل تغییر هستید و منطق رندرشدن شرطی نمی‌تواند در `shouldComponentUpdate()` پیاده‌سازی شود، صدا زدن `setState()` تنها زمانی که state جدید با state قبلی متفاوت است از رندر دوباره غیرضروری جلوگیری می‌کند.

اولین آگومان یک تابع `updater` با این تعریف است:

```javascript
(state, props) => stateChange
```

`state` یک مرجع برای state کامپوننت در زمانی که تغییرات اعمال می‌شوند، می‌باشد. نباید مستقیما تغییر کند. به جای این کار، تغییرات باید با ساخت یک آبجکت جدید بر اساس `state` و `props` ورودی بیان شوند. برای نمونه، فرض کنید می‌خواهیم یک مقدار در state را بر اساس `props.step` افزایش دهیم: 

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

ضمانت می‌شود که هر دو مقدار `state` و `props` دریافت شده در تابع updater به‌روز باشند. خروجی updater به طور سطحی با `state` ترکیب می‌شود.

دومین پارامتر `setState()` یک تابع callback اختیاری است که یک‌بار زمانی که `setState` به طور کامل اجرا شده و کامپوننت دوباره رندر شده‌است، اجرا می‌شود. معمولا ما استفاده از `componentDidUpdate()` را برای چنین منطق‌هایی پیشنهاد می‌کنیم.

شما ممکن است به شکل اختیاری یک آبجکت را به جای تابع به عنوان آرگومان اول `setState()` پاس دهید:

```javascript
setState(stateChange[, callback])
```

این یک ترکیب سطحی `stateChange` با state جدید را اجرا می‌کند. برای مثال، تنظیم مقدار آیتم‌های یک سبد خرید:

```javascript
this.setState({quantity: 2})
```

این شکل `setState()` نیز هم‌زمان است و چندین فراخوانی در یک چرخه ممکن است باعث دسته‌بندی با یک‌دیگر شود. برای مثال، اگر اقدام به افزایش مقدار یک آیتم در یک چرخه یکسان بیش از یک‌بار کنید، نتیجه برابر خواهد بود با:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

فراخوانی‌های متوالی باعث بازنشانی مقدارها از صدازدن‌های قبلی در چرخه یکسان خواهد شد، بنابراین مقدار تنها یکبار افزایش پیدا خواهد کرد. اگر state بعدی وابسته به state فعلی است، ما استفاده از شکل تابعی updater به جای این روش را پیشنهاد می‌کنیم:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

برای اطلاعات بیشتر موارد زیر را ببینید:

* [راهنمای State و چرخه‌ی حیات](/docs/state-and-lifecycle.html)
* [در اعماق: کی و چرا صدا زدن‌های `setState()` دسته‌بندی می‌شوند؟ ](https://stackoverflow.com/a/48610973/458193)
* [در اعماق: چرا `this.state` فورا به‌روز رسانی نمی‌شود؟ ](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

به طور پیش‌فرض، زمانی که state یا props کامپوننتتان تغییر می‌کند، کامپوننت شما دوباره رندر خواهد شد. اگر متد `render()` شما وابسته به دیگر داده‌ها است، شما می‌توانید به وسیله `forceUpdate()` به ری‌اکت بگویید که کامپوننت نیاز به رندر دوباره دارد.

صدازدن `forceUpdate()` باعث می‌شود `render()` کامپوننت، بدون توجه به نتیجه `shouldComponentUpdate()` صدا زده شود. اینکار باعث اجرای متدهای چرخه‌ی حیات عادی کامپوننت‌های فرزند، شامل متد `shouldComponentUpdate()` هر یک از فرزندان می‌‌شود. ری‌اکت همچنان فقط زمانی DOM را بروز می‌کند که markup تغییر کند.

در حالت عادی باید تلاش کنید تا از تمامی استفاده‌های `forceUpdate()` خودداری نمایید و در `render()` فقط از `this.props` و `this.state` داده‌ها را بخوانید.

* * *

## ویژگی‌های کلاس {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` می‌تواند به عنوان یک ویژگی خود کلاس کامپوننت، برای ست کردن props های پیش‌فرض کلاس تعریف شود. این برای props تعریف نشده استفاده می‌شود، اما نه برای props هایی که مقدار `null` دارند. برای مثال:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

اگر `props.color` فراهم نشده باشد، به طور پیش‌فرض با مقدار `'blue'` ست خواهد شد:

```js
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

اگر برای `props.color` مقدار `null` ست شده باشد، `null` باقی خواهد ماند:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

* * *

### `displayName` {#displayname}

رشته متنی `displayName` در پیام‌های عیب‌یابی استفاده می‌شوند. معمولا، شما نیازی به ست کردن صریح آن ندارید چرا که نام آن از اسم تابع یا کلاسی که کامپوننت را تعریف می‌کند گرفته می‌شود. اگر برای اهداف عیب‌یابی و یا هنگام ایجاد یک کامپوننت مرتبه بالاتر می‌خواهید نام متفاوتی را نمایش دهید، می‌توانید خودتان نام جدیدی را صریحا برای آن ست کنید. [نام نمایش را برای عیب‌یابی آسان پوشش دهید](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) را برای اطلاعات بیشتر ببینید.

* * *

## ویژگی‌های Instance {#instance-properties-1}

### `props` {#props}

`this.props` شامل props هایی است که توسط صدازننده این کامپوننت تعریف شده‌اند. [کامپوننت و Props](/docs/components-and-props.html) را برای آشنایی بیشتر با props ببینید.

به خصوص، `this.props.children` یک prop مخصوص است و معمولا به جای خود تگ، در تگ‌های فرند و در قالب JSX تعریف می‌شوند.

### `state` {#state}

state شامل داده‌های مشخص این کامپوننت است که ممکن است در طول زمان تغییر کند. state توسط کاربر تعریف می‌شود، و باید یک آبجکت ساده جاواساکریپتی باشد.

اگر بعضی مقادیر برای رندر کردن و یا جریان داده استفاده نمی‌شوند (برای مثال یک timer ID)، شما مجبور نیستید در state قرار دهید. چنین مقادیری می‌توانند به عنوان زمینه روی instance کامپوننت تعریف شوند.

[State و چرخه‌ی حیات](/docs/state-and-lifecycle.html) را برای اطلاعات بیشتر در مورد state ببینید.

هیچگاه `this.state` را مستقیما تغییر ندهید، چرا که صدا زدن `setState()` پس از آن ممکن است جایگزین تغییرات شما شود. با `this.state` طوری که تغییرناپذیر است رفتار کنید.