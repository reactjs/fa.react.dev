---
title: کامپوننت
---

<Pitfall>

توصیه می‌کنیم کامپوننت‌ها را به‌جای کلاس، به‌صورت تابع تعریف کنید. [نحوهٔ مهاجرت را ببینید.](#alternatives)

</Pitfall>

<Intro>

`Component` کلاس پایه برای کامپوننت‌های ری‌اکت است که به‌صورت [کلاس‌های جاوااسکریپت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) تعریف می‌شوند. کامپوننت‌های کلاسی هنوز توسط ری‌اکت پشتیبانی می‌شوند، اما توصیه نمی‌کنیم از آن‌ها در کدهای جدید استفاده کنید.

```js
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `Component` {/*component*/}

برای تعریف یک کامپوننت ری‌اکت به‌صورت کلاس، از کلاس داخلی `Component` ارث‌بری کنید و یک [`render` method:](#render) تعریف کنید:

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

فقط متد `render` الزامی است و سایر متدها اختیاری هستند.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

---

### `context` {/*context*/}

[کانتکست](/learn/passing-data-deeply-with-context) یک کامپوننت کلاسی از طریق `this.context` در دسترس است. این مقدار فقط زمانی در دسترس است که با استفاده از [`static contextType`](#static-contexttype) مشخص کنید *کدام* کانتکست را می‌خواهید دریافت کنید.

یک کامپوننت کلاسی می‌تواند در هر لحظه فقط یک کانتکست را بخواند.

```js {2,5}
class Button extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {this.props.children}
      </button>
    );
  }
}

```

<Note>

خواندن `this.context` در کامپوننت‌های کلاسی معادل [`useContext`](/reference/react/useContext) در کامپوننت‌های تابعی است.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-context-from-a-class-to-a-function)

</Note>

---

### `props` {/*props*/}

پراپس‌هایی که به یک کامپوننت کلاسی ارسال می‌شوند از طریق `this.props` در دسترس هستند.

```js {3}
class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

<Greeting name="Taylor" />
```

<Note>

خواندن `this.props` در کامپوننت‌های کلاسی معادل [اعلان پراپس](/learn/passing-props-to-a-component#step-2-read-props-inside-the-child-component) در کامپوننت‌های تابعی است.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-simple-component-from-a-class-to-a-function)

</Note>

---

### `state` {/*state*/}

استیت یک کامپوننت کلاسی از طریق `this.state` در دسترس است. فیلد `state` باید یک شیء باشد. استیت را مستقیماً تغییر ندهید. اگر می‌خواهید استیت را تغییر دهید، `setState` را با استیت جدید فراخوانی کنید.

```js {2-4,7-9,18}
class Counter extends Component {
  state = {
    age: 42,
  };

  handleAgeChange = () => {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleAgeChange}>
        Increment age
        </button>
        <p>You are {this.state.age}.</p>
      </>
    );
  }
}
```

<Note>

تعریف `state` در کامپوننت‌های کلاسی معادل فراخوانی [`useState`](/reference/react/useState) در کامپوننت‌های تابعی است.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-state-from-a-class-to-a-function)

</Note>

---

### `constructor(props)` {/*constructor*/}

[کانستراکتور](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) قبل از اینکه کامپوننت کلاسی شما *mount* شود (به صفحه اضافه شود) اجرا می‌گردد. معمولاً یک کانستراکتور در ری‌اکت فقط برای دو هدف استفاده می‌شود. این متد به شما اجازه می‌دهد استیت را اعلان کنید و متدهای کلاس را به نمونهٔ کلاس [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) کنید:

```js {2-6}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // ...
  }
```

اگر از سینتکس مدرن جاوااسکریپت استفاده می‌کنید، کانستراکتورها به‌ندرت نیاز می‌شوند. در عوض، می‌توانید این کد بالا را با استفاده از [سینتکس public class field](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) بازنویسی کنید که هم توسط مرورگرهای مدرن و هم ابزارهایی مانند [Babel](https://babeljs.io/) پشتیبانی می‌شود:

```js {2,4}
class Counter extends Component {
  state = { counter: 0 };

  handleClick = () => {
    // ...
  }
```

کانستراکتور نباید شامل هیچ side effect یا اشتراکی باشد.

#### پارامترها {/*constructor-parameters*/}

* `props`: پراپس‌های اولیهٔ کامپوننت.

#### مقدار بازگشتی {/*constructor-returns*/}

`constructor` نباید چیزی را برگرداند.

#### نکات {/*constructor-caveats*/}

* هیچ side effect یا اشتراکی را در کانستراکتور اجرا نکنید. در عوض، برای این کار از [`componentDidMount`](#componentdidmount) استفاده کنید.

* داخل یک کانستراکتور، باید قبل از هر دستور دیگری `super(props)` را فراخوانی کنید. اگر این کار را نکنید، `this.props` در حین اجرای کانستراکتور `undefined` خواهد بود که می‌تواند گیج‌کننده باشد و باعث باگ شود.

* کانستراکتور تنها مکانی است که می‌توانید [`this.state`](#state) را مستقیماً مقداردهی کنید. در تمام متدهای دیگر، باید به‌جای آن از [`this.setState()`](#setstate) استفاده کنید. `setState` را در کانستراکتور فراخوانی نکنید.

* هنگام استفاده از [رندر سمت سرور،](/reference/react-dom/server) کانستراکتور نیز روی سرور اجرا می‌شود و سپس متد [`render`](#render) فراخوانی می‌گردد. با این حال، متدهای چرخهٔ حیات مانند `componentDidMount` یا `componentWillUnmount` روی سرور اجرا نمی‌شوند.

* وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، ری‌اکت در محیط توسعه `constructor` را دو بار فراخوانی می‌کند و سپس یکی از نمونه‌ها را دور می‌ریزد. این کار به شما کمک می‌کند تا side effect‌های تصادفی که باید از `constructor` خارج شوند را متوجه شوید.

<Note>

معادل دقیقی برای `constructor` در کامپوننت‌های تابعی وجود ندارد. برای اعلان استیت در یک کامپوننت تابعی، [`useState`](/reference/react/useState) را فراخوانی کنید. برای جلوگیری از محاسبهٔ مجدد استیت اولیه، [یک تابع به `useState` ارسال کنید.](/reference/react/useState#avoiding-recreating-the-initial-state)

</Note>

---

### `componentDidCatch(error, info)` {/*componentdidcatch*/}

اگر `componentDidCatch` را تعریف کنید، ری‌اکت آن را زمانی فراخوانی می‌کند که یک کامپوننت فرزند (از جمله فرزندان دور) هنگام رندر خطایی پرتاب کند. این کار به شما اجازه می‌دهد آن خطا را در محیط production به یک سرویس گزارش‌گیری خطا ثبت کنید.

معمولاً این متد همراه با [`static getDerivedStateFromError`](#static-getderivedstatefromerror) استفاده می‌شود که به شما اجازه می‌دهد استیت را در پاسخ به یک خطا به‌روز کنید و یک پیام خطا به کاربر نمایش دهید. کامپوننتی که این متدها را دارد *error boundary* نامیده می‌شود.

[یک نمونه ببینید.](#catching-rendering-errors-with-an-error-boundary)

#### پارامترها {/*componentdidcatch-parameters*/}

* `error`: خطایی که پرتاب شده است. در عمل، معمولاً یک نمونه از [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) خواهد بود اما این تضمین وجود ندارد زیرا جاوااسکریپت اجازه می‌دهد هر مقداری را [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) کنید، از جمله رشته‌ها یا حتی `null`.

* `info`: یک شیء حاوی اطلاعات اضافی دربارهٔ خطا. فیلد `componentStack` آن شامل یک stack trace با کامپوننتی که خطا را پرتاب کرده و همچنین نام‌ها و محل منبع تمام کامپوننت‌های والد آن است. در محیط production، نام کامپوننت‌ها minify شده خواهند بود. اگر گزارش خطای production راه‌اندازی کرده‌اید، می‌توانید با استفاده از sourcemap‌ها کامپوننت stack را همان‌طور که برای stack خطاهای معمول جاوااسکریپت انجام می‌دهید، decode کنید.

#### مقدار بازگشتی {/*componentdidcatch-returns*/}

`componentDidCatch` نباید چیزی را برگرداند.

#### نکات {/*componentdidcatch-caveats*/}

* در گذشته، رایج بود که `setState` را داخل `componentDidCatch` فراخوانی می‌کردند تا رابط کاربری را به‌روز کرده و پیام خطای fallback را نمایش دهند. این روش به‌نفع تعریف [`static getDerivedStateFromError`](#static-getderivedstatefromerror) منسوخ شده است.

* نسخه‌های production و development ری‌اکت در نحوهٔ مدیریت خطاها توسط `componentDidCatch` کمی متفاوت هستند. در محیط توسعه، خطاها به `window` بالا می‌روند، به این معنی که هر `window.onerror` یا `window.addEventListener('error', callback)` خطاهایی را که توسط `componentDidCatch` گرفته شده‌اند، قطع می‌کند. در محیط production، خطاها بالا نمی‌روند، به این معنی که هر error handler اجدادی فقط خطاهایی را دریافت می‌کند که به‌طور صریح توسط `componentDidCatch` گرفته نشده‌اند.

<Note>

هنوز معادل مستقیمی برای `componentDidCatch` در کامپوننت‌های تابعی وجود ندارد. اگر می‌خواهید از ایجاد کامپوننت‌های کلاسی اجتناب کنید، یک کامپوننت `ErrorBoundary` تک‌مانند بالا بنویسید و در کل اپلیکیشن خود از آن استفاده کنید. همچنین می‌توانید از پکیج [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) استفاده کنید که این کار را برای شما انجام می‌دهد.

</Note>

---

### `componentDidMount()` {/*componentdidmount*/}

اگر متد `componentDidMount` را تعریف کنید، ری‌اکت آن را زمانی فراخوانی می‌کند که کامپوننت شما *(mount)* به صفحه اضافه شده است. این مکان رایجی برای شروع fetch داده‌ها، راه‌اندازی اشتراک‌ها، یا دستکاری ندهای DOM است.

اگر `componentDidMount` را پیاده‌سازی می‌کنید، معمولاً برای جلوگیری از باگ‌ها باید متدهای چرخهٔ حیات دیگر را نیز پیاده‌سازی کنید. برای مثال، اگر `componentDidMount` برخی استیت‌ها یا پراپس‌ها را می‌خواند، باید [`componentDidUpdate`](#componentdidupdate) را نیز برای مدیریت تغییرات آن‌ها پیاده‌سازی کنید، و [`componentWillUnmount`](#componentwillunmount) را برای پاک‌سازی کاری که `componentDidMount` انجام می‌داد.

```js {6-8}
class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  // ...
}
```

[نمونه‌های بیشتر را ببینید.](#adding-lifecycle-methods-to-a-class-component)

#### پارامترها {/*componentdidmount-parameters*/}

`componentDidMount` هیچ پارامتری نمی‌گیرد.

#### مقدار بازگشتی {/*componentdidmount-returns*/}

`componentDidMount` نباید چیزی را برگرداند.

#### نکات {/*componentdidmount-caveats*/}

- وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، در محیط توسعه ری‌اکت `componentDidMount` را فراخوانی می‌کند، سپس بلافاصله [`componentWillUnmount`](#componentwillunmount) را فراخوانی می‌کند، و دوباره `componentDidMount` را فراخوانی می‌کند. این کار به شما کمک می‌کند متوجه شوید اگر فراموش کرده‌اید `componentWillUnmount` را پیاده‌سازی کنید یا اگر منطق آن کاملاً با آنچه `componentDidMount` انجام می‌دهد «تطابق» ندارد.

- اگرچه می‌توانید بلافاصله [`setState`](#setstate) را در `componentDidMount` فراخوانی کنید، اما بهتر است در صورت امکان از این کار اجتناب کنید. این کار یک رندر اضافه را ایجاد می‌کند، اما قبل از اینکه مرورگر صفحه را به‌روز کند اتفاق می‌افتد. این کار تضمین می‌کند که با وجود اینکه [`render`](#render) در این حالت دو بار فراخوانی می‌شود، کاربر استیت میانی را نخواهد دید. با احتیاط از این الگو استفاده کنید زیرا اغلب باعث مشکلات عملکرد می‌شود. در بیشتر موارد، باید بتوانید استیت اولیه را در [`constructor`](#constructor) مقداردهی کنید. با این حال، برای مواردی مانند modal‌ها و tooltip‌ها که نیاز دارید قبل از رندر چیزی که به اندازه یا موقعیت یک نود DOM وابسته است، آن نود را اندازه‌گیری کنید، ممکن است ضروری باشد.

<Note>

برای بسیاری از موارد استفاده، تعریف `componentDidMount`، `componentDidUpdate` و `componentWillUnmount` با هم در کامپوننت‌های کلاسی معادل فراخوانی [`useEffect`](/reference/react/useEffect) در کامپوننت‌های تابعی است. در موارد نادر که اجرای کد قبل از paint مرورگر مهم است، [`useLayoutEffect`](/reference/react/useLayoutEffect) تطابق بهتری دارد.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

</Note>

---

### `componentDidUpdate(prevProps, prevState, snapshot?)` {/*componentdidupdate*/}

اگر متد `componentDidUpdate` را تعریف کنید، ری‌اکت آن را بلافاصله پس از آنکه کامپوننت شما با پراپس یا استیت به‌روز شده مجدداً رندر شده است، فراخوانی می‌کند. این متد برای رندر اولیه فراخوانی نمی‌شود.

می‌توانید از آن برای دستکاری DOM پس از یک به‌روزرسانی استفاده کنید. این مکان رایجی برای انجام درخواست‌های شبکه نیز هست، به‌شرطی که پراپس‌های فعلی را با پراپس‌های قبلی مقایسه کنید (مثلاً اگر پراپس‌ها تغییر نکرده‌اند ممکن است یک درخواست شبکه لازم نباشد). معمولاً آن را همراه با [`componentDidMount`](#componentdidmount) و [`componentWillUnmount`:](#componentwillunmount) استفاده می‌کنید:

```js {10-18}
class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  // ...
}
```

[نمونه‌های بیشتر را ببینید.](#adding-lifecycle-methods-to-a-class-component)


#### پارامترها {/*componentdidupdate-parameters*/}

* `prevProps`: پراپس‌ها قبل از به‌روزرسانی. `prevProps` را با [`this.props`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.

* `prevState`: استیت قبل از به‌روزرسانی. `prevState` را با [`this.state`](#state) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.

* `snapshot`: اگر [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) را پیاده‌سازی کرده‌اید، `snapshot` شامل مقداری خواهد بود که از آن متد برگردانده‌اید. در غیر این صورت، `undefined` خواهد بود.

#### مقدار بازگشتی {/*componentdidupdate-returns*/}

`componentDidUpdate` نباید چیزی را برگرداند.

#### نکات {/*componentdidupdate-caveats*/}

- اگر [`shouldComponentUpdate`](#shouldcomponentupdate) تعریف شده باشد و `false` برگرداند، `componentDidUpdate` فراخوانی نمی‌شود.

- منطق داخل `componentDidUpdate` معمولاً باید در شرط‌هایی که `this.props` را با `prevProps` و `this.state` را با `prevState` مقایسه می‌کنند، پیچیده شود. در غیر این صورت، خطر ایجاد حلقه‌های بی‌نهایت وجود دارد.

- اگرچه می‌توانید بلافاصله [`setState`](#setstate) را در `componentDidUpdate` فراخوانی کنید، اما بهتر است در صورت امکان از این کار اجتناب کنید. این کار یک رندر اضافه را ایجاد می‌کند، اما قبل از اینکه مرورگر صفحه را به‌روز کند اتفاق می‌افتد. این کار تضمین می‌کند که با وجود اینکه [`render`](#render) در این حالت دو بار فراخوانی می‌شود، کاربر استیت میانی را نخواهد دید. این الگو اغلب باعث مشکلات عملکرد می‌شود، اما ممکن است برای موارد نادری مانند modal‌ها و tooltip‌ها که نیاز دارید قبل از رندر چیزی که به اندازه یا موقعیت یک نود DOM وابسته است، آن نود را اندازه‌گیری کنید، ضروری باشد.

<Note>

برای بسیاری از موارد استفاده، تعریف `componentDidMount`، `componentDidUpdate` و `componentWillUnmount` با هم در کامپوننت‌های کلاسی معادل فراخوانی [`useEffect`](/reference/react/useEffect) در کامپوننت‌های تابعی است. در موارد نادر که اجرای کد قبل از paint مرورگر مهم است، [`useLayoutEffect`](/reference/react/useLayoutEffect) تطابق بهتری دارد.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

</Note>
---

### `componentWillMount()` {/*componentwillmount*/}

<Deprecated>

این API از `componentWillMount` به [`UNSAFE_componentWillMount`](#unsafe_componentwillmount) تغییر نام داده است. نام قدیری منسوخ شده است. در یک نسخهٔ major آینده ری‌اکت، فقط نام جدید کار خواهد کرد.

برای به‌روزرسانی خودکار کامپوننت‌های خود، [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) را اجرا کنید.

</Deprecated>

---

### `componentWillReceiveProps(nextProps)` {/*componentwillreceiveprops*/}

<Deprecated>

این API از `componentWillReceiveProps` به [`UNSAFE_componentWillReceiveProps`](#unsafe_componentwillreceiveprops) تغییر نام داده است. نام قدیمی منسوخ شده است. در یک نسخهٔ major آینده ری‌اکت، فقط نام جدید کار خواهد کرد.

برای به‌روزرسانی خودکار کامپوننت‌های خود، [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) را اجرا کنید.

</Deprecated>

---

### `componentWillUpdate(nextProps, nextState)` {/*componentwillupdate*/}

<Deprecated>

این API از `componentWillUpdate` به [`UNSAFE_componentWillUpdate`](#unsafe_componentwillupdate) تغییر نام داده است. نام قدیمی منسوخ شده است. در یک نسخهٔ major آینده ری‌اکت، فقط نام جدید کار خواهد کرد.

برای به‌روزرسانی خودکار کامپوننت‌های خود، [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) را اجرا کنید.

</Deprecated>

---

### `componentWillUnmount()` {/*componentwillunmount*/}

اگر متد `componentWillUnmount` را تعریف کنید، ری‌اکت آن را قبل از اینکه کامپوننت شما *(unmount)* از صفحه حذف شود، فراخوانی می‌کند. این مکان رایجی برای لغو fetch داده‌ها یا حذف اشتراک‌ها است.

منطق داخل `componentWillUnmount` باید با منطق داخل [`componentDidMount`](#componentdidmount) «تطابق» داشته باشد. برای مثال، اگر `componentDidMount` یک اشتراک راه‌اندازی می‌کند، `componentWillUnmount` باید آن اشتراک را پاک‌سازی کند. اگر منطق پاک‌سازی در `componentWillUnmount` شما برخی پراپس‌ها یا استیت‌ها را می‌خواند، معمولاً باید [`componentDidUpdate`](#componentdidupdate) را نیز پیاده‌سازی کنید تا منابع (مانند اشتراک‌ها) مربوط به پراپس‌ها و استیت‌های قدیمی را پاک‌سازی کنید.

```js {20-22}
class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  // ...
}
```

[نمونه‌های بیشتر را ببینید.](#adding-lifecycle-methods-to-a-class-component)

#### پارامترها {/*componentwillunmount-parameters*/}

`componentWillUnmount` هیچ پارامتری نمی‌گیرد.

#### مقدار بازگشتی {/*componentwillunmount-returns*/}

`componentWillUnmount` نباید چیزی را برگرداند.

#### نکات {/*componentwillunmount-caveats*/}

- وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، در محیط توسعه ری‌اکت [`componentDidMount`](#componentdidmount) را فراخوانی می‌کند، سپس بلافاصله `componentWillUnmount` را فراخوانی می‌کند، و دوباره `componentDidMount` را فراخوانی می‌کند. این کار به شما کمک می‌کند متوجه شوید اگر فراموش کرده‌اید `componentWillUnmount` را پیاده‌سازی کنید یا اگر منطق آن کاملاً با آنچه `componentDidMount` انجام می‌دهد «تطابق» ندارد.

<Note>

برای بسیاری از موارد استفاده، تعریف `componentDidMount`، `componentDidUpdate` و `componentWillUnmount` با هم در کامپوننت‌های کلاسی معادل فراخوانی [`useEffect`](/reference/react/useEffect) در کامپوننت‌های تابعی است. در موارد نادر که اجرای کد قبل از paint مرورگر مهم است، [`useLayoutEffect`](/reference/react/useLayoutEffect) تطابق بهتری دارد.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

</Note>

---

### `forceUpdate(callback?)` {/*forceupdate*/}

یک کامپوننت را مجبور به رندر مجدد می‌کند.

معمولاً این کار لازم نیست. اگر متد [`render`](#render) کامپوننت شما فقط از [`this.props`](#props)، [`this.state`](#state) یا [`this.context`](#context) می‌خواند، هنگامی که [`setState`](#setstate) را داخل کامپوننت یا یکی از والدین آن فراخوانی می‌کنید، به‌طور خودکار مجدداً رندر خواهد شد. با این حال، اگر متد `render` کامپوننت شما مستقیماً از یک منبع دادهٔ خارجی می‌خواند، باید به ری‌اکت بگویید که هنگام تغییر آن منبع داده، رابط کاربری را به‌روز کند. این کاری است که `forceUpdate` به شما اجازه می‌دهد انجام دهید.

سعی کنید از تمام استفاده‌های `forceUpdate` اجتناب کنید و در `render` فقط از `this.props` و `this.state` بخوانید.

#### پارامترها {/*forceupdate-parameters*/}

* **اختیاری** `callback` اگر مشخص شده باشد، ری‌اکت `callback` ارائه‌شده توسط شما را پس از commit شدن به‌روزرسانی فراخوانی می‌کند.

#### مقدار بازگشتی {/*forceupdate-returns*/}

`forceUpdate` چیزی را برنمی‌گرداند.

#### نکات {/*forceupdate-caveats*/}

- اگر `forceUpdate` را فراخوانی کنید، ری‌اکت بدون فراخوانی [`shouldComponentUpdate`](#shouldcomponentupdate) مجدداً رندر می‌کند.

<Note>

خواندن یک منبع دادهٔ خارجی و وادار کردن کامپوننت‌های کلاسی به رندر مجدد در پاسخ به تغییرات آن با `forceUpdate`، در کامپوننت‌های تابعی توسط [`useSyncExternalStore`](/reference/react/useSyncExternalStore) جایگزین شده است.

</Note>

---

### `getSnapshotBeforeUpdate(prevProps, prevState)` {/*getsnapshotbeforeupdate*/}

اگر `getSnapshotBeforeUpdate` را پیاده‌سازی کنید، ری‌اکت آن را بلافاصله قبل از به‌روزرسانی DOM توسط ری‌اکت فراخوانی می‌کند. این متد به کامپوننت شما اجازه می‌دهد تا اطلاعاتی را از DOM (مثلاً موقعیت scroll) قبل از اینکه احتمالاً تغییر کند، ثبت کند. هر مقداری که توسط این متد چرخهٔ حیات برگردانده شود، به‌عنوان پارامتر به [`componentDidUpdate`](#componentdidupdate) ارسال می‌شود.

برای مثال، می‌توانید از آن در یک رابط کاربری مانند یک گفتگوی متنی که نیاز دارد موقعیت scroll خود را هنگام به‌روزرسانی حفظ کند، استفاده کنید:

```js {7-15,17}
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

در مثال بالا، مهم است که ویژگی `scrollHeight` مستقیماً در `getSnapshotBeforeUpdate` خوانده شود. خواندن آن در [`render`](#render)، [`UNSAFE_componentWillReceiveProps`](#unsafe_componentwillreceiveprops) یا [`UNSAFE_componentWillUpdate`](#unsafe_componentwillupdate) امن نیست زیرا یک شکاف زمانی احتمالی بین فراخوانی این متدها و به‌روزرسانی DOM توسط ری‌اکت وجود دارد.

#### پارامترها {/*getsnapshotbeforeupdate-parameters*/}

* `prevProps`: پراپس‌ها قبل از به‌روزرسانی. `prevProps` را با [`this.props`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.

* `prevState`: استیت قبل از به‌روزرسانی. `prevState` را با [`this.state`](#state) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.

#### مقدار بازگشتی {/*getsnapshotbeforeupdate-returns*/}

باید یک مقدار snapshot از هر نوعی که می‌خواهید یا `null` برگردانید. مقداری که برگردانده‌اید به‌عنوان آرگومان سوم به [`componentDidUpdate`](#componentdidupdate) ارسال می‌شود.

#### نکات {/*getsnapshotbeforeupdate-caveats*/}

- اگر [`shouldComponentUpdate`](#shouldcomponentupdate) تعریف شده باشد و `false` برگرداند، `getSnapshotBeforeUpdate` فراخوانی نمی‌شود.

<Note>

در حال حاضر، معادلی برای `getSnapshotBeforeUpdate` در کامپوننت‌های تابعی وجود ندارد. این مورد استفاده بسیار نادر است، اما اگر به آن نیاز دارید، فعلاً باید یک کامپوننت کلاسی بنویسید.

</Note>

---

### `render()` {/*render*/}

متد `render` تنها متد الزامی در یک کامپوننت کلاسی است.

متد `render` باید مشخص کند چه چیزی می‌خواهید روی صفحه ظاهر شود، برای مثال:

```js {4-6}
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

ری‌اکت ممکن است `render` را در هر لحظه فراخوانی کند، بنابراین نباید فرض کنید که در زمان خاصی اجرا می‌شود. معمولاً متد `render` باید یک قطعه [JSX](/learn/writing-markup-with-jsx) برگرداند، اما چند [نوع بازگشتی دیگر](#render-returns) (مانند رشته‌ها) نیز پشتیبانی می‌شوند. برای محاسبهٔ JSX بازگشتی، متد `render` می‌تواند [`this.props`](#props)، [`this.state`](#state) و [`this.context`](#context) را بخواند.

باید متد `render` را به‌صورت یک تابع خالص بنویسید، به این معنی که اگر پراپس، استیت و کانتکست یکسان باشند، باید همان نتیجه را برگرداند. همچنین نباید شامل side effect‌ها (مانند راه‌اندازی اشتراک‌ها) باشد یا با APIهای مرورگر تعامل داشته باشد. side effect‌ها باید در event handler‌ها یا متدهایی مانند [`componentDidMount`](#componentdidmount) اتفاق بیفتند.

#### پارامترها {/*render-parameters*/}

`render` هیچ پارامتری نمی‌گیرد.

#### مقدار بازگشتی {/*render-returns*/}

`render` می‌تواند هر نود معتبر ری‌اکت را برگرداند. این شامل elementهای ری‌اکت مانند `<div />`، رشته‌ها، اعداد، [پورتال‌ها](/reference/react-dom/createPortal)، ندهای خالی (`null`، `undefined`، `true` و `false`) و آرایه‌هایی از ندهای ری‌اکت می‌شود.

#### نکات {/*render-caveats*/}

- `render` باید به‌صورت یک تابع خالص از پراپس، استیت و کانتکست نوشته شود. نباید side effect داشته باشد.

- اگر [`shouldComponentUpdate`](#shouldcomponentupdate) تعریف شده باشد و `false` برگرداند، `render` فراخوانی نمی‌شود.

- وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، ری‌اکت در محیط توسعه `render` را دو بار فراخوانی می‌کند و سپس یکی از نتایج را دور می‌ریزد. این کار به شما کمک می‌کند تا side effect‌های تصادفی که باید از متد `render` خارج شوند را متوجه شوید.

- هیچ تناظر یک‌به‌یک بین فراخوانی `render` و فراخوانی متعاقب `componentDidMount` یا `componentDidUpdate` وجود ندارد. برخی از نتایج فراخوانی `render` ممکن است توسط ری‌اکت در صورت صلاحدید دور انداخته شوند.

---

### `setState(nextState, callback?)` {/*setstate*/}

برای به‌روزرسانی استیت کامپوننت ری‌اکت خود `setState` را فراخوانی کنید.

```js {8-10}
class Form extends Component {
  state = {
    name: 'Taylor',
  };

  handleNameChange = (e) => {
    const newName = e.target.value;
    this.setState({
      name: newName
    });
  }

  render() {
    return (
      <>
        <input value={this.state.name} onChange={this.handleNameChange} />
        <p>Hello, {this.state.name}.</p>
      </>
    );
  }
}
```

`setState` تغییرات را در استیت کامپوننت صف می‌کند. به ری‌اکت می‌گوید که این کامپوننت و فرزندانش باید با استیت جدید مجدداً رندر شوند. این روش اصلی به‌روزرسانی رابط کاربری در پاسخ به تعاملات است.

<Pitfall>

فراخوانی `setState` استیت فعلی را در کدی که در حال اجرا است **تغییر نمی‌دهد**:

```js {6}
function handleClick() {
  console.log(this.state.name); // "Taylor"
  this.setState({
    name: 'Robin'
  });
  console.log(this.state.name); // Still "Taylor"!
}
```

فقط بر آنچه `this.state` از رندر *بعدی* به بعد برمی‌گرداند تأثیر می‌گذارد.

</Pitfall>

همچنین می‌توانید یک تابع به `setState` ارسال کنید. این کار به شما اجازه می‌دهد استیت را بر اساس استیت قبلی به‌روز کنید:

```js {2-6}
  handleIncreaseAge = () => {
    this.setState(prevState => {
      return {
        age: prevState.age + 1
      };
    });
  }
```

لازم نیست این کار را انجام دهید، اما اگر می‌خواهید استیت را چند بار در طول یک رویداد به‌روز کنید، مفید است.

#### پارامترها {/*setstate-parameters*/}

* `nextState`: یک شیء یا یک تابع.
  * اگر یک شیء به‌عنوان `nextState` ارسال کنید، به‌صورت سطحی با `this.state` ادغام می‌شود.
  * اگر یک تابع به‌عنوان `nextState` ارسال کنید، به‌عنوان یک _updater function_ در نظر گرفته می‌شود. باید خالص باشد، استیت و پراپس‌های در انتظار را به‌عنوان آرگومان بگیرد و شیءای را که به‌صورت سطحی با `this.state` ادغام می‌شود، برگرداند. ری‌اکت updater function شما را در یک صف قرار می‌دهد و کامپوننت شما را مجدداً رندر می‌کند. در رندر بعدی، ری‌اکت استیت بعدی را با اعمال تمام updaterهای صف‌شده روی استیت قبلی محاسبه می‌کند.

* **اختیاری** `callback`: اگر مشخص شده باشد، ری‌اکت `callback` ارائه‌شده توسط شما را پس از commit شدن به‌روزرسانی فراخوانی می‌کند.

#### مقدار بازگشتی {/*setstate-returns*/}

`setState` چیزی را برنمی‌گرداند.

#### نکات {/*setstate-caveats*/}

- به `setState` به‌عنوان یک *درخواست* به‌جای یک دستور فوری برای به‌روزرسانی کامپوننت فکر کنید. وقتی چندین کامپوننت در پاسخ به یک رویداد استیت خود را به‌روز می‌کنند، ری‌اکت به‌روزرسانی‌های آن‌ها را دسته‌بندی (Batching) می‌کند و آن‌ها را در یک پاس در پایان رویداد با هم مجدداً رندر می‌کند. در موارد نادر که نیاز دارید یک به‌روزرسانی استیت خاص را به‌صورت همگام اعمال کنید، می‌توانید آن را در [`flushSync`](/reference/react-dom/flushSync) بپیچید، اما این کار ممکن است به عملکرد آسیب برساند.

- `setState` بلافاصله `this.state` را به‌روز نمی‌کند. این کار خواندن `this.state` بلافاصله پس از فراخوانی `setState` را به یک مشکل بالقوه تبدیل می‌کند. در عوض، از [`componentDidUpdate`](#componentdidupdate) یا آرگومان `callback` در setState استفاده کنید، که هر دو تضمین می‌شوند پس از اعمال به‌روزرسانی اجرا شوند. اگر نیاز دارید استیت را بر اساس استیت قبلی تنظیم کنید، می‌توانید یک تابع به `nextState` ارسال کنید همان‌طور که در بالا توضیح داده شد.

<Note>

فراخوانی `setState` در کامپوننت‌های کلاسی مشابه فراخوانی یک [`set` function](/reference/react/useState#setstate) در کامپوننت‌های تابعی است.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-state-from-a-class-to-a-function)

</Note>

---

### `shouldComponentUpdate(nextProps, nextState, nextContext)` {/*shouldcomponentupdate*/}

اگر `shouldComponentUpdate` را تعریف کنید، ری‌اکت آن را فراخوانی می‌کند تا مشخص کند آیا می‌توان از رندر مجدد صرف‌نظر کرد.

اگر مطمئن هستید که می‌خواهید آن را دستی بنویسید، می‌توانید `this.props` را با `nextProps` و `this.state` را با `nextState` مقایسه کنید و `false` برگردانید تا به ری‌اکت بگویید به‌روزرسانی را می‌توان صرف‌نظر کرد.

```js {6-18}
class Rectangle extends Component {
  state = {
    isHovered: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.position.x === this.props.position.x &&
      nextProps.position.y === this.props.position.y &&
      nextProps.size.width === this.props.size.width &&
      nextProps.size.height === this.props.size.height &&
      nextState.isHovered === this.state.isHovered
    ) {
      // Nothing has changed, so a re-render is unnecessary
      return false;
    }
    return true;
  }

  // ...
}

```

ری‌اکت `shouldComponentUpdate` را قبل از رندر هنگام دریافت پراپس یا استیت جدید فراخوانی می‌کند. پیش‌فرض آن `true` است. این متد برای رندر اولیه یا هنگام استفاده از [`forceUpdate`](#forceupdate) فراخوانی نمی‌شود.

#### پارامترها {/*shouldcomponentupdate-parameters*/}

- `nextProps`: پراپس‌های بعدی که کامپوننت قرار است با آن‌ها رندر شود. `nextProps` را با [`this.props`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.
- `nextState`: استیت بعدی که کامپوننت قرار است با آن رندر شود. `nextState` را با [`this.state`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.
- `nextContext`: کانتکست بعدی که کامپوننت قرار است با آن رندر شود. `nextContext` را با [`this.context`](#context) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است. فقط اگر [`static contextType`](#static-contexttype) را مشخص کرده باشید در دسترس است.

#### مقدار بازگشتی {/*shouldcomponentupdate-returns*/}

اگر می‌خواهید کامپوننت مجدداً رندر شود، `true` برگردانید. این رفتار پیش‌فرض است.

برای گفتن به ری‌اکت که می‌توان از رندر مجدد صرف‌نظر کرد، `false` برگردانید.

#### نکات {/*shouldcomponentupdate-caveats*/}

- این متد *فقط* به‌عنوان یک بهینه‌سازی عملکرد وجود دارد. اگر کامپوننت شما بدون آن خراب می‌شود، ابتدا آن را برطرف کنید.

- در نظر بگیرید به‌جای نوشتن `shouldComponentUpdate` به‌صورت دستی، از [`PureComponent`](/reference/react/PureComponent) استفاده کنید. `PureComponent` پراپس‌ها و استیت را به‌صورت سطحی مقایسه می‌کند و احتمال صرف‌نظر از یک به‌روزرسانی لازم را کاهش می‌دهد.

- توصیه نمی‌کنیم در `shouldComponentUpdate` بررسی‌های تساوی عمیق انجام دهید یا از `JSON.stringify` استفاده کنید. این کار عملکرد را غیرقابل پیش‌بینی می‌کند و وابسته به ساختار داده‌های هر پراپس و استیت می‌شود. در بهترین حالت، خطر ایجاد مکث‌های چندثانیه‌ای در اپلیکیشن خود را به‌خطر می‌اندازید، و در بدترین حالت خطر از کار افتادن آن را.

- برگرداندن `false` از رندر مجدد کامپوننت‌های فرزند هنگام تغییر استیت *آن‌ها* جلوگیری نمی‌کند.

- برگرداندن `false` *تضمین نمی‌کند* که کامپوننت مجدداً رندر نخواهد شد. ری‌اکت از مقدار بازگشتی به‌عنوان یک راهنما استفاده می‌کند اما ممکن است همچنان تصمیم بگیرد کامپوننت شما را به دلایل دیگر مجدداً رندر کند.

<Note>

بهینه‌سازی کامپوننت‌های کلاسی با `shouldComponentUpdate` مشابه بهینه‌سازی کامپوننت‌های تابعی با [`memo`](/reference/react/memo) است. کامپوننت‌های تابعی همچنین بهینه‌سازی دقیق‌تری را با [`useMemo`](/reference/react/useMemo) ارائه می‌دهند.

</Note>

---

### `UNSAFE_componentWillMount()` {/*unsafe_componentwillmount*/}

اگر `UNSAFE_componentWillMount` را تعریف کنید، ری‌اکت آن را بلافاصله پس از [`constructor`](#constructor) فراخوانی می‌کند. این متد فقط به دلایل تاریخی وجود دارد و نباید در هیچ کد جدیدی استفاده شود. در عوض، از یکی از جایگزین‌ها استفاده کنید:

- برای مقداردهی اولیه استیت، [`state`](#state) را به‌عنوان یک class field اعلان کنید یا `this.state` را داخل [`constructor`](#constructor) تنظیم کنید.
- اگر نیاز به اجرای یک side effect یا راه‌اندازی یک اشتراک دارید، آن منطق را به [`componentDidMount`](#componentdidmount) منتقل کنید.

[نمونه‌هایی از مهاجرت از چرخه‌های حیات ناامن را ببینید.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples)

#### پارامترها {/*unsafe-componentwillmount-parameters*/}

`UNSAFE_componentWillMount` هیچ پارامتری نمی‌گیرد.

#### مقدار بازگشتی {/*unsafe_componentwillmount-returns*/}

`UNSAFE_componentWillMount` نباید چیزی را برگرداند.

#### نکات {/*unsafe_componentwillmount-caveats*/}

- اگر کامپوننت [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) یا [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) را پیاده‌سازی کند، `UNSAFE_componentWillMount` فراخوانی نمی‌شود.

- با وجود نام‌گذاری آن، `UNSAFE_componentWillMount` تضمین نمی‌کند که کامپوننت *mount* شود اگر اپلیکیشن شما از قابلیت‌های مدرن ری‌اکت مانند [`Suspense`](/reference/react/Suspense) استفاده کند. اگر یک تلاش رندر suspend شود (مثلاً به این دلیل که کد برخی کامپوننت‌های فرزند هنوز بارگذاری نشده است)، ری‌اکت درخت در حال انجام را دور می‌ریزد و در تلاش بعدی سعی می‌کند کامپوننت را از ابتدا بسازد. به این دلیل این متد «ناامن» است. کدی که به mount وابسته است (مانند اضافه کردن یک اشتراک) باید در [`componentDidMount`](#componentdidmount) قرار گیرد.

- `UNSAFE_componentWillMount` تنها متد چرخهٔ حیات است که در طول [رندر سمت سرور](/reference/react-dom/server) اجرا می‌شود. برای تمام مقاصد عملی، با [`constructor`](#constructor) یکسان است، بنابراین باید برای این نوع منطق به‌جای آن از `constructor` استفاده کنید.

<Note>

فراخوانی [`setState`](#setstate) داخل `UNSAFE_componentWillMount` در یک کامپوننت کلاسی برای مقداردهی اولیه استیت، معادل ارسال آن استیت به‌عنوان استیت اولیه به [`useState`](/reference/react/useState) در یک کامپوننت تابعی است.

</Note>

---

### `UNSAFE_componentWillReceiveProps(nextProps, nextContext)` {/*unsafe_componentwillreceiveprops*/}

اگر `UNSAFE_componentWillReceiveProps` را تعریف کنید، ری‌اکت آن را زمانی فراخوانی می‌کند که کامپوننت پراپس‌های جدیدی دریافت کند. این متد فقط به دلایل تاریخی وجود دارد و نباید در هیچ کد جدیدی استفاده شود. در عوض، از یکی از جایگزین‌ها استفاده کنید:

- اگر نیاز به **اجرای یک side effect** (مثلاً fetch داده‌ها، اجرای یک انیمیشن، یا مقداردهی مجدد یک اشتراک) در پاسخ به تغییرات پراپس دارید، آن منطق را به [`componentDidUpdate`](#componentdidupdate) منتقل کنید.
- اگر نیاز به **اجتناب از محاسبهٔ مجدد برخی داده‌ها فقط هنگام تغییر یک پراپس دارید،** به‌جای آن از یک [memoization helper](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) استفاده کنید.
- اگر نیاز به **«reset» کردن برخی استیت‌ها هنگام تغییر یک پراپس دارید،** در نظر بگیرید کامپوننت را [fully controlled](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) یا [fully uncontrolled with a key](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) کنید.
- اگر نیاز به **«تنظیم» برخی استیت‌ها هنگام تغییر یک پراپس دارید،** بررسی کنید آیا می‌توانید تمام اطلاعات لازم را فقط از پراپس‌ها در حین رندر محاسبه کنید. اگر نمی‌توانید، به‌جای آن از [`static getDerivedStateFromProps`](/reference/react/Component#static-getderivedstatefromprops) استفاده کنید.

[نمونه‌هایی از مهاجرت از چرخه‌های حیات ناامن را ببینید.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)

#### پارامترها {/*unsafe_componentwillreceiveprops-parameters*/}

- `nextProps`: پراپس‌های بعدی که کامپوننت قرار است از کامپوننت والد خود دریافت کند. `nextProps` را با [`this.props`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.
- `nextContext`: کانتکست بعدی که کامپوننت قرار است از نزدیک‌ترین provider دریافت کند. `nextContext` را با [`this.context`](#context) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است. فقط اگر [`static contextType`](#static-contexttype) را مشخص کرده باشید در دسترس است.

#### مقدار بازگشتی {/*unsafe_componentwillreceiveprops-returns*/}

`UNSAFE_componentWillReceiveProps` نباید چیزی را برگرداند.

#### نکات {/*unsafe_componentwillreceiveprops-caveats*/}

- اگر کامپوننت [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) یا [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) را پیاده‌سازی کند، `UNSAFE_componentWillReceiveProps` فراخوانی نمی‌شود.

- با وجود نام‌گذاری آن، `UNSAFE_componentWillReceiveProps` تضمین نمی‌کند که کامپوننت *آن* پراپس‌ها را دریافت کند اگر اپلیکیشن شما از قابلیت‌های مدرن ری‌اکت مانند [`Suspense`](/reference/react/Suspense) استفاده کند. اگر یک تلاش رندر suspend شود (مثلاً به این دلیل که کد برخی کامپوننت‌های فرزند هنوز بارگذاری نشده است)، ری‌اکت درخت در حال انجام را دور می‌ریزد و در تلاش بعدی سعی می‌کند کامپوننت را از ابتدا بسازد. تا زمان تلاش رندر بعدی، پراپس‌ها ممکن است متفاوت باشند. به این دلیل این متد «ناامن» است. کدی که باید فقط برای به‌روزرسانی‌های commit شده اجرا شود (مانند reset یک اشتراک) باید در [`componentDidUpdate`](#componentdidupdate) قرار گیرد.

- `UNSAFE_componentWillReceiveProps` به این معنی نیست که کامپوننت پراپس‌های *متفاوتی* نسبت به دفعهٔ قبل دریافت کرده است. باید خودتان `nextProps` و `this.props` را مقایسه کنید تا بررسی کنید چه چیزی تغییر کرده است.

- ری‌اکت `UNSAFE_componentWillReceiveProps` را با پراپس‌های اولیه در حین mount فراخوانی نمی‌کند. این متد فقط در صورتی فراخوانی می‌شود که برخی از پراپس‌های کامپوننت قرار است به‌روز شوند. برای مثال، فراخوانی [`setState`](#setstate) معمولاً `UNSAFE_componentWillReceiveProps` را داخل همان کامپوننت trigger نمی‌کند.

<Note>

فراخوانی [`setState`](#setstate) داخل `UNSAFE_componentWillReceiveProps` در یک کامپوننت کلاسی برای «تنظیم» استیت، معادل [فراخوانی `set` function از `useState` در حین رندر](/reference/react/useState#storing-information-from-previous-renders) در یک کامپوننت تابعی است.

</Note>

---

### `UNSAFE_componentWillUpdate(nextProps, nextState)` {/*unsafe_componentwillupdate*/}


اگر `UNSAFE_componentWillUpdate` را تعریف کنید، ری‌اکت آن را قبل از رندر با پراپس یا استیت جدید فراخوانی می‌کند. این متد فقط به دلایل تاریخی وجود دارد و نباید در هیچ کد جدیدی استفاده شود. در عوض، از یکی از جایگزین‌ها استفاده کنید:

- اگر نیاز به اجرای یک side effect (مثلاً fetch داده‌ها، اجرای یک انیمیشن، یا مقداردهی مجدد یک اشتراک) در پاسخ به تغییرات پراپس یا استیت دارید، آن منطق را به [`componentDidUpdate`](#componentdidupdate) منتقل کنید.
- اگر نیاز به خواندن برخی اطلاعات از DOM (مثلاً برای ذخیرهٔ موقعیت scroll فعلی) دارید تا بتوانید بعداً از آن در [`componentDidUpdate`](#componentdidupdate) استفاده کنید، به‌جای آن آن را داخل [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) بخوانید.

[نمونه‌هایی از مهاجرت از چرخه‌های حیات ناامن را ببینید.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples)

#### پارامترها {/*unsafe_componentwillupdate-parameters*/}

- `nextProps`: پراپس‌های بعدی که کامپوننت قرار است با آن‌ها رندر شود. `nextProps` را با [`this.props`](#props) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.
- `nextState`: استیت بعدی که کامپوننت قرار است با آن رندر شود. `nextState` را با [`this.state`](#state) مقایسه کنید تا مشخص شود چه چیزی تغییر کرده است.

#### مقدار بازگشتی {/*unsafe_componentwillupdate-returns*/}

`UNSAFE_componentWillUpdate` نباید چیزی را برگرداند.

#### نکات {/*unsafe_componentwillupdate-caveats*/}

- اگر [`shouldComponentUpdate`](#shouldcomponentupdate) تعریف شده باشد و `false` برگرداند، `UNSAFE_componentWillUpdate` فراخوانی نمی‌شود.

- اگر کامپوننت [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) یا [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) را پیاده‌سازی کند، `UNSAFE_componentWillUpdate` فراخوانی نمی‌شود.

- پشتیبانی نمی‌شود از فراخوانی [`setState`](#setstate) (یا هر متدی که منجر به فراخوانی `setState` می‌شود، مانند dispatch کردن یک Redux action) در طول `componentWillUpdate`.

- با وجود نام‌گذاری آن، `UNSAFE_componentWillUpdate` تضمین نمی‌کند که کامپوننت به‌روز *خواهد* شد اگر اپلیکیشن شما از قابلیت‌های مدرن ری‌اکت مانند [`Suspense`](/reference/react/Suspense) استفاده کند. اگر یک تلاش رندر suspend شود (مثلاً به این دلیل که کد برخی کامپوننت‌های فرزند هنوز بارگذاری نشده است)، ری‌اکت درخت در حال انجام را دور می‌ریزد و در تلاش بعدی سعی می‌کند کامپوننت را از ابتدا بسازد. تا زمان تلاش رندر بعدی، پراپس‌ها و استیت ممکن است متفاوت باشند. به این دلیل این متد «ناامن» است. کدی که باید فقط برای به‌روزرسانی‌های commit شده اجرا شود (مانند reset یک اشتراک) باید در [`componentDidUpdate`](#componentdidupdate) قرار گیرد.

- `UNSAFE_componentWillUpdate` به این معنی نیست که کامپوننت پراپس یا استیت *متفاوتی* نسبت به دفعهٔ قبل دریافت کرده است. باید خودتان `nextProps` را با `this.props` و `nextState` را با `this.state` مقایسه کنید تا بررسی کنید چه چیزی تغییر کرده است.

- ری‌اکت `UNSAFE_componentWillUpdate` را با پراپس‌ها و استیت اولیه در حین mount فراخوانی نمی‌کند.

<Note>

معادل مستقیمی برای `UNSAFE_componentWillUpdate` در کامپوننت‌های تابعی وجود ندارد.

</Note>

---

### `static contextType` {/*static-contexttype*/}

اگر می‌خواهید [`this.context`](#context-instance-field) را از کامپوننت کلاسی خود بخوانید، باید مشخص کنید کدام کانتکست نیاز به خواندن دارد. کانتکستی که به‌عنوان `static contextType` مشخص می‌کنید باید یک مقدار باشد که قبلاً توسط [`createContext`](/reference/react/createContext) ایجاد شده است.

```js {2}
class Button extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {this.props.children}
      </button>
    );
  }
}
```

<Note>

خواندن `this.context` در کامپوننت‌های کلاسی معادل [`useContext`](/reference/react/useContext) در کامپوننت‌های تابعی است.

[نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-context-from-a-class-to-a-function)

</Note>

---

### `static defaultProps` {/*static-defaultprops*/}

می‌توانید `static defaultProps` را تعریف کنید تا پراپس‌های پیش‌فرض کلاس را تنظیم کنید. آن‌ها برای پراپس‌های `undefined` و پراپس‌های ناموجود استفاده می‌شوند، اما برای پراپس‌های `null` استفاده نمی‌شوند.

برای مثال، در اینجا نحوهٔ تعریف اینکه پراپس `color` باید به‌طور پیش‌فرض `'blue'` باشد آمده است:

```js {2-4}
class Button extends Component {
  static defaultProps = {
    color: 'blue'
  };

  render() {
    return <button className={this.props.color}>click me</button>;
  }
}
```

اگر پراپس `color` ارائه نشود یا `undefined` باشد، به‌طور پیش‌فرض به `'blue'` تنظیم می‌شود:

```js
<>
  {/* this.props.color is "blue" */}
  <Button />

  {/* this.props.color is "blue" */}
  <Button color={undefined} />

  {/* this.props.color is null */}
  <Button color={null} />

  {/* this.props.color is "red" */}
  <Button color="red" />
</>
```

<Note>

تعریف `defaultProps` در کامپوننت‌های کلاسی مشابه استفاده از [مقادیر پیش‌فرض](/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop) در کامپوننت‌های تابعی است.

</Note>

---

### `static getDerivedStateFromError(error)` {/*static-getderivedstatefromerror*/}

اگر `static getDerivedStateFromError` را تعریف کنید، ری‌اکت آن را زمانی فراخوانی می‌کند که یک کامپوننت فرزند (از جمله فرزندان دور) هنگام رندر خطایی پرتاب کند. این کار به شما اجازه می‌دهد به‌جای پاک کردن رابط کاربری، یک پیام خطا نمایش دهید.

معمولاً این متد همراه با [`componentDidCatch`](#componentdidcatch) استفاده می‌شود که به شما اجازه می‌دهد گزارش خطا را به یک سرویس analytics ارسال کنید. کامپوننتی که این متدها را دارد *error boundary* نامیده می‌شود.

[یک نمونه ببینید.](#catching-rendering-errors-with-an-error-boundary)

#### پارامترها {/*static-getderivedstatefromerror-parameters*/}

* `error`: خطایی که پرتاب شده است. در عمل، معمولاً یک نمونه از [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) خواهد بود اما این تضمین وجود ندارد زیرا جاوااسکریپت اجازه می‌دهد هر مقداری را [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) کنید، از جمله رشته‌ها یا حتی `null`.

#### مقدار بازگشتی {/*static-getderivedstatefromerror-returns*/}

`static getDerivedStateFromError` باید استیتی را برگرداند که به کامپوننت می‌گوید پیام خطا را نمایش دهد.

#### نکات {/*static-getderivedstatefromerror-caveats*/}

* `static getDerivedStateFromError` باید یک تابع خالص باشد. اگر می‌خواهید یک side effect انجام دهید (مثلاً فراخوانی یک سرویس analytics)، باید [`componentDidCatch`](#componentdidcatch) را نیز پیاده‌سازی کنید.

<Note>

هنوز معادل مستقیمی برای `static getDerivedStateFromError` در کامپوننت‌های تابعی وجود ندارد. اگر می‌خواهید از ایجاد کامپوننت‌های کلاسی اجتناب کنید، یک کامپوننت `ErrorBoundary` تک‌مانند بالا بنویسید و در کل اپلیکیشن خود از آن استفاده کنید. همچنین می‌توانید از پکیج [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) استفاده کنید که این کار را برای شما انجام می‌دهد.

</Note>

---

### `static getDerivedStateFromProps(props, state)` {/*static-getderivedstatefromprops*/}

اگر `static getDerivedStateFromProps` را تعریف کنید، ری‌اکت آن را بلافاصله قبل از فراخوانی [`render`](#render) فراخوانی می‌کند، هم در mount اولیه و هم در به‌روزرسانی‌های بعدی. این متد باید یک شیء برای به‌روزرسانی استیت برگرداند، یا `null` برای به‌روزرسانی نکردن.

این متد برای [موارد استفادهٔ نادر](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) وجود دارد که در آن استیت به تغییرات پراپس در طول زمان وابسته است. برای مثال، این کامپوننت `Form` استیت `email` را هنگام تغییر پراپس `userID` reset می‌کند:

```js {7-18}
class Form extends Component {
  state = {
    email: this.props.defaultEmail,
    prevUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.userID !== state.prevUserID) {
      return {
        prevUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }

  // ...
}
```

توجه داشته باشید که این الگو نیاز دارد یک مقدار قبلی پراپس (مانند `userID`) را در استیت (مانند `prevUserID`) نگه دارید.

<Pitfall>

استنتاج استیت منجر به کد طولانی می‌شود و درک کامپوننت‌های شما را دشوار می‌سازد. [مطمئن شوید با جایگزین‌های ساده‌تر آشنا هستید:](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

- اگر نیاز به **اجرای یک side effect** (مثلاً fetch داده‌ها یا یک انیمیشن) در پاسخ به تغییر در پراپس دارید، به‌جای آن از متد [`componentDidUpdate`](#componentdidupdate) استفاده کنید.
- اگر می‌خواهید **برخی داده‌ها را فقط هنگام تغییر یک پراپس محاسبه کنید،** [به‌جای آن از یک memoization helper استفاده کنید.](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)
- اگر می‌خواهید **برخی استیت‌ها را هنگام تغییر یک پراپس «reset» کنید،** در نظر بگیرید کامپوننت را [fully controlled](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) یا [fully uncontrolled with a key](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) کنید.

</Pitfall>

#### پارامترها {/*static-getderivedstatefromprops-parameters*/}

- `props`: پراپس‌های بعدی که کامپوننت قرار است با آن‌ها رندر شود.
- `state`: استیت بعدی که کامپوننت قرار است با آن رندر شود.

#### مقدار بازگشتی {/*static-getderivedstatefromprops-returns*/}

`static getDerivedStateFromProps` یک شیء برای به‌روزرسانی استیت برمی‌گرداند، یا `null` برای به‌روزرسانی نکردن.

#### نکات {/*static-getderivedstatefromprops-caveats*/}

- این متد در *هر* رندر فعال می‌شود، صرف‌نظر از علت. این با [`UNSAFE_componentWillReceiveProps`](#unsafe_cmoponentwillreceiveprops) متفاوت است، که فقط زمانی فعال می‌شود که والد باعث رندر مجدد شود و نه در نتیجهٔ یک `setState` محلی.

- این متد به نمونهٔ کامپوننت دسترسی ندارد. اگر می‌خواهید، می‌توانید با استخراج توابع خالص از پراپس‌ها و استیت کامپوننت خارج از تعریف کلاس، برخی کدها را بین `static getDerivedStateFromProps` و سایر متدهای کلاس بازاستفاده کنید.

<Note>

پیاده‌سازی `static getDerivedStateFromProps` در یک کامپوننت کلاسی معادل [فراخوانی `set` function از `useState` در حین رندر](/reference/react/useState#storing-information-from-previous-renders) در یک کامپوننت تابعی است.

</Note>

---

## استفاده {/*usage*/}

### تعریف یک کامپوننت کلاسی {/*defining-a-class-component*/}

برای تعریف یک کامپوننت ری‌اکت به‌صورت کلاس، از کلاس داخلی `Component` ارث‌بری کنید و یک [`render` method:](#render) تعریف کنید:

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

ری‌اکت متد [`render`](#render) شما را هر بار که نیاز به فهمیدن چه چیزی روی صفحه نمایش داده شود، فراخوانی می‌کند. معمولاً از آن برخی [JSX](/learn/writing-markup-with-jsx) برمی‌گردانید. متد `render` شما باید یک [تابع خالص](https://en.wikipedia.org/wiki/Pure_function) باشد: فقط باید JSX را محاسبه کند.

مشابه [کامپوننت‌های تابعی،](/learn/your-first-component#defining-a-component) یک کامپوننت کلاسی می‌تواند [با پراپس از کامپوننت والد خود اطلاعات دریافت کند](/learn/your-first-component#defining-a-component). با این حال، سینتکس خواندن پراپس متفاوت است. برای مثال، اگر کامپوننت والد `<Greeting name="Taylor" />` را رندر کند، می‌توانید پراپس `name` را از [`this.props`](#props) بخوانید، مانند `this.props.name`:

<Sandpack>

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default function App() {
  return (
    <>
      <Greeting name="Sara" />
      <Greeting name="Cahal" />
      <Greeting name="Edite" />
    </>
  );
}
```

</Sandpack>

توجه داشته باشید که هوک‌ها (توابعی که با `use` شروع می‌شوند، مانند [`useState`](/reference/react/useState)) در داخل کامپوننت‌های کلاسی پشتیبانی نمی‌شوند.

<Pitfall>

توصیه می‌کنیم کامپوننت‌ها را به‌جای کلاس، به‌صورت تابع تعریف کنید. [نحوهٔ مهاجرت را ببینید.](#migrating-a-simple-component-from-a-class-to-a-function)

</Pitfall>

---

### افزودن استیت به یک کامپوننت کلاسی {/*adding-state-to-a-class-component*/}

برای افزودن [استیت](/learn/state-a-components-memory) به یک کلاس، یک شیء را به یک ویژگی به نام [`state`](#state) اختصاص دهید. برای به‌روزرسانی استیت، [`this.setState`](#setstate) را فراخوانی کنید.

<Sandpack>

```js
import { Component } from 'react';

export default class Counter extends Component {
  state = {
    name: 'Taylor',
    age: 42,
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange = () => {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
        <input
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button onClick={this.handleAgeChange}>
          Increment age
        </button>
        <p>Hello, {this.state.name}. You are {this.state.age}.</p>
      </>
    );
  }
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack> 

<Pitfall>

توصیه می‌کنیم کامپوننت‌ها را به‌جای کلاس، به‌صورت تابع تعریف کنید. [نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-state-from-a-class-to-a-function)

</Pitfall>

---

### افزودن متدهای چرخهٔ حیات به یک کامپوننت کلاسی {/*adding-lifecycle-methods-to-a-class-component*/}

چند متد خاص وجود دارد که می‌توانید روی کلاس خود تعریف کنید.

اگر متد [`componentDidMount`](#componentdidmount) را تعریف کنید، ری‌اکت آن را زمانی فراخوانی می‌کند که کامپوننت شما *(mount)* به صفحه اضافه شده است. ری‌اکت [`componentDidUpdate`](#componentdidupdate) را پس از آنکه کامپوننت شما به دلیل تغییر پراپس یا استیت مجدداً رندر می‌شود، فراخوانی می‌کند. ری‌اکت [`componentWillUnmount`](#componentwillunmount) را پس از حذف *(unmount)* کامپوننت شما از صفحه فراخوانی می‌کند.

اگر `componentDidMount` را پیاده‌سازی می‌کنید، معمولاً برای جلوگیری از باگ‌ها باید هر سه چرخهٔ حیات را پیاده‌سازی کنید. برای مثال، اگر `componentDidMount` برخی استیت‌ها یا پراپس‌ها را می‌خواند، باید `componentDidUpdate` را نیز برای مدیریت تغییرات آن‌ها پیاده‌سازی کنید، و `componentWillUnmount` را برای پاک‌سازی کاری که `componentDidMount` انجام می‌داد.

برای مثال، این کامپوننت `ChatRoom` یک اتصال چت را با پراپس و استیت همگام نگه می‌دارد:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js src/ChatRoom.js active
import { Component } from 'react';
import { createConnection } from './chat.js';

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  setupConnection() {
    this.connection = createConnection(
      this.state.serverUrl,
      this.props.roomId
    );
    this.connection.connect();    
  }

  destroyConnection() {
    this.connection.disconnect();
    this.connection = null;
  }

  render() {
    return (
      <>
        <label>
          Server URL:{' '}
          <input
            value={this.state.serverUrl}
            onChange={e => {
              this.setState({
                serverUrl: e.target.value
              });
            }}
          />
        </label>
        <h1>Welcome to the {this.props.roomId} room!</h1>
      </>
    );
  }
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

توجه داشته باشید که در محیط توسعه وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، ری‌اکت `componentDidMount` را فراخوانی می‌کند، بلافاصله `componentWillUnmount` را فراخوانی می‌کند، و سپس دوباره `componentDidMount` را فراخوانی می‌کند. این کار به شما کمک می‌کند متوجه شوید اگر فراموش کرده‌اید `componentWillUnmount` را پیاده‌سازی کنید یا اگر منطق آن کاملاً با آنچه `componentDidMount` انجام می‌دهد «تطابق» ندارد.

<Pitfall>

توصیه می‌کنیم کامپوننت‌ها را به‌جای کلاس، به‌صورت تابع تعریف کنید. [نحوهٔ مهاجرت را ببینید.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

</Pitfall>

---

### گرفتن خطاهای رندر با یک error boundary {/*catching-rendering-errors-with-an-error-boundary*/}

به‌طور پیش‌فرض، اگر اپلیکیشن شما در حین رندر خطایی پرتاب کند، ری‌اکت رابط کاربری آن را از صفحه حذف می‌کند. برای جلوگیری از این کار، می‌توانید بخشی از رابط کاربری خود را در یک *error boundary* بپیچید. یک error boundary یک کامپوننت خاص است که به شما اجازه می‌دهد به‌جای بخشی که خراب شده، برخی رابط کاربری fallback را نمایش دهید — برای مثال، یک پیام خطا.

برای پیاده‌سازی یک کامپوننت error boundary، باید [`static getDerivedStateFromError`](#static-getderivedstatefromerror) را ارائه کنید که به شما اجازه می‌دهد استیت را در پاسخ به یک خطا به‌روز کنید و یک پیام خطا به کاربر نمایش دهید. همچنین می‌توانید به‌صورت اختیاری [`componentDidCatch`](#componentdidcatch) را پیاده‌سازی کنید تا منطق اضافی اضافه کنید، برای مثال، خطا را به یک سرویس analytics ثبت کنید.

با [`captureOwnerStack`](/reference/react/captureOwnerStack) می‌توانید Owner Stack را در حین توسعه وارد کنید.

```js {9-12,14-27}
import * as React from 'react';

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
    logErrorToMyService(
      error,
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      info.componentStack,
      // Warning: `captureOwnerStack` is not available in production.
      React.captureOwnerStack(),
    );
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
```

سپس می‌توانید بخشی از درخت کامپوننت خود را با آن بپیچید:

```js {1,3}
<ErrorBoundary fallback={<p>Something went wrong</p>}>
  <Profile />
</ErrorBoundary>
```

اگر `Profile` یا کامپوننت فرزند آن خطایی پرتاب کند، `ErrorBoundary` آن خطا را «می‌گیرد»، یک رابط کاربری fallback با پیام خطایی که ارائه کرده‌اید نمایش می‌دهد، و یک گزارش خطای production به سرویس گزارش خطای شما ارسال می‌کند.

لازم نیست هر کامپوننت را در یک error boundary جداگانه بپیچید. هنگامی که به [دانه‌بندی error boundary‌ها](https://www.brandondail.com/posts/fault-tolerance-react) فکر می‌کنید، در نظر بگیرید کجا نمایش یک پیام خطا منطقی است. برای مثال، در یک اپلیکیشن پیام‌رسانی، منطقی است که یک error boundary دور لیست گفتگوها قرار گیرد. همچنین منطقی است که یکی دور هر پیام فردی قرار گیرد. با این حال، قرار دادن یک boundary دور هر آواتار منطقی نیست.

<Note>

در حال حاضر هیچ راهی برای نوشتن یک error boundary به‌عنوان یک کامپوننت تابعی وجود ندارد. با این حال، لازم نیست کلاس error boundary را خودتان بنویسید. برای مثال، می‌توانید به‌جای آن از [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) استفاده کنید.

</Note>

---

## جایگزین‌ها {/*alternatives*/}

### مهاجرت یک کامپوننت ساده از کلاس به تابع {/*migrating-a-simple-component-from-a-class-to-a-function*/}

معمولاً به‌جای آن [کامپوننت‌ها را به‌صورت تابع تعریف می‌کنید](/learn/your-first-component#defining-a-component).

برای مثال، فرض کنید در حال تبدیل این کامپوننت کلاسی `Greeting` به یک تابع هستید:

<Sandpack>

```js
import { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default function App() {
  return (
    <>
      <Greeting name="Sara" />
      <Greeting name="Cahal" />
      <Greeting name="Edite" />
    </>
  );
}
```

</Sandpack>

یک تابع به نام `Greeting` تعریف کنید. اینجا جایی است که بدنهٔ تابع `render` خود را به آن منتقل می‌کنید.

```js
function Greeting() {
  // ... move the code from the render method here ...
}
```

به‌جای `this.props.name`، پراپس `name` را [با استفاده از سینتکس destructuring](/learn/passing-props-to-a-component) تعریف کنید و مستقیماً آن را بخوانید:

```js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

در اینجا یک نمونهٔ کامل آمده است:

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <>
      <Greeting name="Sara" />
      <Greeting name="Cahal" />
      <Greeting name="Edite" />
    </>
  );
}
```

</Sandpack>

---

### مهاجرت یک کامپوننت با استیت از کلاس به تابع {/*migrating-a-component-with-state-from-a-class-to-a-function*/}

فرض کنید در حال تبدیل این کامپوننت کلاسی `Counter` به یک تابع هستید:

<Sandpack>

```js
import { Component } from 'react';

export default class Counter extends Component {
  state = {
    name: 'Taylor',
    age: 42,
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange = (e) => {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
        <input
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button onClick={this.handleAgeChange}>
          Increment age
        </button>
        <p>Hello, {this.state.name}. You are {this.state.age}.</p>
      </>
    );
  }
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

با اعلان یک تابع با [متغیرهای استیت](/reference/react/useState#adding-state-to-a-component) لازم شروع کنید:

```js {4-5}
import { useState } from 'react';

function Counter() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  // ...
```

سپس، event handler‌ها را تبدیل کنید:

```js {5-7,9-11}
function Counter() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAgeChange() {
    setAge(age + 1);
  }
  // ...
```

در نهایت، تمام ارجاعات شروع‌شده با `this` را با متغیرها و توابعی که در کامپوننت خود تعریف کرده‌اید، جایگزین کنید. برای مثال، `this.state.age` را با `age` جایگزین کنید، و `this.handleNameChange` را با `handleNameChange` جایگزین کنید.

در اینجا یک کامپوننت کاملاً تبدیل‌شده آمده است:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAgeChange() {
    setAge(age + 1);
  }

  return (
    <>
      <input
        value={name}
        onChange={handleNameChange}
      />
      <button onClick={handleAgeChange}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  )
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

---

### مهاجرت یک کامپوننت با متدهای چرخهٔ حیات از کلاس به تابع {/*migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function*/}

فرض کنید در حال تبدیل این کامپوننت کلاسی `ChatRoom` با متدهای چرخهٔ حیات به یک تابع هستید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js src/ChatRoom.js active
import { Component } from 'react';
import { createConnection } from './chat.js';

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  setupConnection() {
    this.connection = createConnection(
      this.state.serverUrl,
      this.props.roomId
    );
    this.connection.connect();    
  }

  destroyConnection() {
    this.connection.disconnect();
    this.connection = null;
  }

  render() {
    return (
      <>
        <label>
          Server URL:{' '}
          <input
            value={this.state.serverUrl}
            onChange={e => {
              this.setState({
                serverUrl: e.target.value
              });
            }}
          />
        </label>
        <h1>Welcome to the {this.props.roomId} room!</h1>
      </>
    );
  }
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

ابتدا، بررسی کنید که [`componentWillUnmount`](#componentwillunmount) شما نقطهٔ مقابل [`componentDidMount`](#componentdidmount) باشد. در مثال بالا، این درست است: اتصالی را که `componentDidMount` راه‌اندازی می‌کند، قطع می‌کند. اگر چنین منطقی وجود ندارد، ابتدا آن را اضافه کنید.

سپس، بررسی کنید که متد [`componentDidUpdate`](#componentdidupdate) شما تغییرات هر پراپس و استیتی که در `componentDidMount` استفاده می‌کنید را مدیریت می‌کند. در مثال بالا، `componentDidMount`، `setupConnection` را فراخوانی می‌کند که `this.state.serverUrl` و `this.props.roomId` را می‌خواند. به این دلیل است که `componentDidUpdate` بررسی می‌کند آیا `this.state.serverUrl` و `this.props.roomId` تغییر کرده‌اند، و در صورت تغییر اتصال را reset می‌کند. اگر منطق `componentDidUpdate` شما وجود ندارد یا تغییرات تمام پراپس‌ها و استیت‌های مربوطه را مدیریت نمی‌کند، ابتدا آن را برطرف کنید.

در مثال بالا، منطق داخل متدهای چرخهٔ حیات کامپوننت را به یک سیستم خارج از ری‌اکت (یک سرور چت) متصل می‌کند. برای اتصال یک کامپوننت به یک سیستم خارجی، [این منطق را به‌صورت یک افکت توصیف کنید:](/reference/react/useEffect#connecting-to-an-external-system)

```js {6-12}
import { useState, useEffect } from 'react';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);

  // ...
}
```

این فراخوانی [`useEffect`](/reference/react/useEffect) معادل منطق داخل متدهای چرخهٔ حیات بالا است. اگر متدهای چرخهٔ حیات شما چند کار نامرتبط انجام می‌دهند، [آن‌ها را به چند افکت مستقل تقسیم کنید.](/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things) در اینجا یک نمونهٔ کامل وجود دارد که می‌توانید با آن کار کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

<Note>

اگر کامپوننت شما با هیچ سیستم خارجی همگام نمی‌شود، [ممکن است به یک افکت نیاز نداشته باشید.](/learn/you-might-not-need-an-effect)

</Note>

---

### مهاجرت یک کامپوننت با کانتکست از کلاس به تابع {/*migrating-a-component-with-context-from-a-class-to-a-function*/}

در این مثال، کامپوننت‌های کلاسی `Panel` و `Button` [کانتکست](/learn/passing-data-deeply-with-context) را از [`this.context`:](#context) می‌خوانند:

<Sandpack>

```js
import { createContext, Component } from 'react';

const ThemeContext = createContext(null);

class Panel extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'panel-' + theme;
    return (
      <section className={className}>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </section>
    );    
  }
}

class Button extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {this.props.children}
      </button>
    );
  }
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>

هنگام تبدیل آن‌ها به کامپوننت‌های تابعی، `this.context` را با فراخوانی‌های [`useContext`](/reference/react/useContext) جایگزین کنید:

<Sandpack>

```js
import { createContext, useContext } from 'react';

const ThemeContext = createContext(null);

function Panel({ title, children }) {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}

export default function MyApp() {
  return (
    <ThemeContext value="dark">
      <Form />
    </ThemeContext>
  )
}
```

```css
.panel-light,
.panel-dark {
  border: 1px solid black;
  border-radius: 4px;
  padding: 20px;
}
.panel-light {
  color: #222;
  background: #fff;
}

.panel-dark {
  color: #fff;
  background: rgb(23, 32, 42);
}

.button-light,
.button-dark {
  border: 1px solid #777;
  padding: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

.button-dark {
  background: #222;
  color: #fff;
}

.button-light {
  background: #fff;
  color: #222;
}
```

</Sandpack>
