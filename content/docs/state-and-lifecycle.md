---
id: state-and-lifecycle
title: state و lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

این صفحه مفهوم state و lifecycle را در یک کامپوننت ری‌اکتی معرفی می‌کند. برای مطالعه [مرجع API کامپوننت با جزئیات به اینجا](/docs/react-component.html) مراجعه کنید.

<<<<<<< HEAD
مثال ساعت را در [یکی از بخش‌های پیشین](/docs/rendering-elements.html#updating-the-rendered-element) در نظر بگیرید. در [رندر کردن المنت‌ها](/docs/rendering-elements.html#rendering-an-element-into-the-dom)، ما تنها یک راه برای به‌روز رسانی UI یاد گرفتیم. ما تابع `ReactDOM.render()` را فراخوانی می‌کنیم تا خروجی رندر شده را تغییر دهیم:
=======
Consider the ticking clock example from [one of the previous sections](/docs/rendering-elements.html#updating-the-rendered-element). In [Rendering Elements](/docs/rendering-elements.html#rendering-an-element-into-the-dom), we have only learned one way to update the UI. We call `root.render()` to change the rendered output:
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

```js{10}
const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

[**روی ‌CodePen امتحان کنید**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

در این بخش یاد می‌گیریم که چگونه کامپوننت `Clock` را واقعا قابل استفاده مجدد و کپسوله کنیم. به طوری که خودش تایمرش را تنظیم و هر ثانیه خودش را به‌روز رسانی کند.

می تونیم با کپسوله کردن ظاهر ساعت شروع کنیم:

```js{5-8,13}
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

[**روی ‌CodePen امتحان کنید**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

اگرچه، یک نیاز حیاتی را از دست می‌دهد: این که `Clock` یک تایمر را تنظیم و هر ثانیه UI را به‌روز‌ رسانی کند، که باید بخشی از جزئیات پیاده‌سازی خود `Clock` باشد.

ایده‌آل این است که ما یک بار `Clock` را بنویسیم و خودش به‌روز رسانی را انجام دهد:

```js{2}
root.render(<Clock />);
```

برای پیاده‌سازی آن، باید به کامپوننت `Clock` state اضافه کنیم.

state مشابه props است، اما خصوصی است و کاملا توسط کامپوننت کنترل می‌شود.

## تبدیل یک تابع به یک کلاس {#converting-a-function-to-a-class}

شما می‌توانید یک کامپوننت برپایه تابع را در پنج مرحله به یک کلاس تبدیل کنید:

1. یک [کلاس ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) بسازید، با همان نام که از `React.Component` ارث می‌برد.

2. یک متد خالی با نام `render()` به آن اضافه کنید.

3. بدنه تابع را به متد `render()` منتقل کنید.

4. در بدنه `render()` به‌جای `props`، `this.props` بنویسید.

5. آن‌چه از تعریف تابع خالی باقی مانده‌است را پاک کنید.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

حالا `Clock` به جای تابع، به صورت کلاس تعریف شده‌است.

هربار که به‌روز رسانی اتفاق می‌افتد، تابع `render` فراخوانی می‌شود. اما تا وقتی که ما `<Clock />` را درون همان DOM node رندر می‌کنیم، تنها یک نمونه از کلاس `Clock` استفاده خواهدشد. این باعث می‌شود ما قادر به استفاده از ویژگی‌های دیگری مانند state و توابع lifecycle باشیم.


## اضافه‌کردن state داخلی به یک کلاس {#adding-local-state-to-a-class}

ما در سه مرحله، `date` را از props به state انتقال می‌دهیم:

1. در تابع `render()`، `this.props.date` را با `this.state.date` جایگزین کنید:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. یک [سازنده کلاس](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) اضافه کنید که مقداردهی اولیه `this.state` را انجام می‌دهد:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

آگاه باشید که ما چگونه `props` را به سازنده پدر پاس می‌دهیم:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

کامپوننت‌های بر پایه کلاس باید همیشه سازنده پدر را با `props` فراخوانی کنند.

3. `date` را از props المنت `<Clock />` حذف کنید:

```js{2}
root.render(<Clock />);
```

ما بعدا کد مربوط به تایمر را به خود کامپوننت اضافه‌می کنیم.

نتیجه این شده‌است:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

در ادامه، `Clock` را طوری تغییر می‌دهیم که تایمر خودش را داشته‌باشد و خودش هر ثانیه به‌روز رسانی شود.

## افزودن توابع lifecycle به یک کلاس {#adding-lifecycle-methods-to-a-class}

در برنامه‌هایی با تعداد کامپوننت زیاد، بسیار اهمیت دارد که با از بین رفتن کامپوننت، منابعی که توسط آن اشغال شده‌بود نیز آزاد شود.

ما می خواهیم [یک تایمر](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) را برای اولین دفعه‌ای که `Clock` در DOM رندر می‌شود، تنظیم کنیم. در ری‌اکت به آن "mounting" گفته می‌شود.

همچنین می‌خواهیم هر زمان که DOM تولید شده توسط `Clock` حذف می‌شود، [تایمر را پاک کنیم](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval). در ری‌اکت به آن "unmounting" گفته می‌شود.

برای اجرای کد‌هایی زمان mount و unmount شدن یک کامپوننت، ما می توانیم توابع ویژه‌ای روی کامپوننت‌های بر پایه کلاس تعریف کنیم:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

به آن‌ها "توابع lifecycle" گفته می‌شود.

تابع `componentDidMount()` پس از رندر شدن خروجی کامپوننت توی DOM، اجرا می‌شود. اینجا محل  خوبی برای تنظیم یک تایمر است:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

دقت داشته‌باشید که چگونه ما شناسه تایمر را دقیقا روی `this` (`this.timerID`) ذخیره می‌کنیم.

در حالی که `this.props` توسط خود ری‌اکت تنظیم می‌شود و `this.state` کاربرد خاص خودش را دارد، شما آزاد هستید که برای ذخیره چیزی که نقشی در جریان داده‌ها ندارد (مانند شناسه تایمر)، به صورت دستی فیلد‌های دیگری به کلاس اضافه کنید.

ما تایمر را در تابع lifecycle `componentWillUnmount()` از کار می‌اندازیم:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

در آخر، ما تابعی با نام `tick()` پیاده‌سازی می‌کنیم که کامپوننت `Clock` هر ثانیه آن‌را فراخوانی می‌کند.

این [تابع] از `this.setState()` استفاده می کند تا به‌روز رسانی‌ها را روی state داخلی کامپوننت انجام دهد:

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

حالا ساعت هر ثانیه تغییر می‌کند.

بیایید به طور خلاصه جمع‌بندی کنیم که چه اتفاقی ره می‌دهد و به ترتیب چه توابعی فراخوانی می‌شوند:

<<<<<<< HEAD
1. زمانی که `<Clock />` به `ReactDOM.render()` پاس داده می‌شود، ری‌اکت سازنده کامپوننت `Clock` را فراخوانی می‌کند. از آن‌جایی که `Clock` زمان جاری را نمایش دهد، `this.state` را با شیء‌ای شامل زمان جاری مقداردهی اولیه می‌کند.
=======
1) When `<Clock />` is passed to `root.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

2. سپس ری‌اکت تابع `render()` کامپوننت `Clock` را فرا می‌خواند. این روشی است که ری‌اکت می‌فهمد چه چیزی باید روی صفجه نمایش‌داده شود. سپس ری‌اکت DOM را به‌روز رسانی و با خروجی رندر `Clock` تطبیق می‌دهد.

3. زمانی که خروجی `Clock` به DOM اضافه می‌شود، ری‌اکت تابع lifecycle `componentDidMount()` را فراخوانی می‌کند. درون آن، کامپوننت `Clock` از مرورگر می‌خواهد که یک تایمر تنظیم کند که هر ثانیه تابع `tick()` را فراخوانی کند.

4. مرورگر هر ثانیه تابع `tick()` را فرا می‌خواند. درون آن، کامپوننت `Clock` به‌روز رسانی UI را با فراخوانی تابع `setState()` همراه یک شیء شامل زمان جاری، زمان‌بندی می‌کند. ری‌اکت با کمک `setState()` متوجه می‌شود که state تغییر کرده‌است. و آن‌گاه برای اطلاع از آن‌چه باید روی صفحه نمایش‌ داده‌شود، تابع `render()` را فرا می‌خواند. این دفعه، مقدار `this.state.date` در تابع `render()` متفاوت خواهد بود و بنابراین خروجی رندر دارای زمان به‌روز رسانی شده خواهدبود. ری‌اکت DOM را بر همین اساس به‌روز‌ رسانی می‌کند.

5. اگر کامپوننت `Clock` از DOM حذف شود، ری‌اکت هم تابع lifecycle `componentWillUnmount()` را فرا می‌خواند و در نتیجه تایمر متوقف می‌شود.

## استفاده صحیح از state {#using-state-correctly}

سه چیز هست که باید درباره `setState()` بدانید:

### مستقیم state را تغییر ندهید {#do-not-modify-state-directly}

برای مثال، این کار باعث رندر مجدد یک کامپوننت نمی‌شود:

```js
// اشتباه
this.state.comment = 'Hello';
```

به جای آن از `setState()` استفاده کنید:

```js
// درست
this.setState({comment: 'Hello'});
```
تنها جایی که شما می‌توانید `this.state` را [مستقیم] مقدار‌دهی کنید، سازنده [کلاس] است.

### به‌روز رسانی state ممکن است غیرهمزمان باشد {#state-updates-may-be-asynchronous}

ممکن است ری‌اکت برای بهبود عملکرد، فراخوانی چند باره `setState()` را در یک به‌روز رسانی انجام دهد.

از آن‌جا که ممکن است `this.props` و `this.state` به صورت غیرهمزمان به‌روز ‌رسانی شوند، برای محاسبه وضعیت بعدی نباید روی مقادیر آن‌ها حساب کنید.

برای مثال، این کد ممکن است در به‌روز رسانی شمارنده دچار اشکال شود:

```js
// اشتباه
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

برای حل آن، شکل دوم تابع `setState()` را استفاده کنید که به جای یک شیء، یک تابع به عنوان ورودی می‌پذیرد. آن تابع هم state قبلی را به عنوان ورودی اول، و props مربوط به زمانی که تعییرات اعمال شده‌است را به عنوان ورودی دوم دریافت می‌کند.

```js
// درست
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

در بالا ما از [تابع arrow](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) استفاده کرده‌ایم، اما با تابع معمولی هم کار می‌کند:

```js
// درست
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### به‌روز رسانی‌های state ادغام‌شده هستند {#state-updates-are-merged}

وقتی شما `setState()` را فرا می‌خوانید، ری‌اکت آن شیء را در state فعلی ادغام می‌کند.

برای مثال، state شما ممکن است دارای چندین متغییر مستقل باشد:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

پس شما می‌توانید آن‌ها را جدا از هم، با فراخوانی‌های مجزای `setState()`، به‌روز رسانی کنید:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
این ادغام سطحی است، بنابراین `this.setState({comments})` تاثیری روی `this.state.posts` ندارد، اما کاملا `this.state.comments` را جایگزین می‌کند.

## داده به پایین جریان دارد {#the-data-flows-down}

نه کامپوننت پدر و نه کامپوننت فرزند از این‌که یک کامپوننت مشخص دارای state است یا نه خبری ندارند و نباید برای آن‌ها مهم باشد که به صورت تابع یا کلاس تعریف شده‌است.

به همین دلیل است که اغلب state را داخلی یا کپسوله‌شده خطاب می‌کنند. به غیر از کامپوننتی که مالک آن است و با آن کار می کند، توسط هیچ کامپوننت دیگری قابل دسترسی نیست.

یک کامپوننت ممکن است خودش انتخاب کند که state خود را به عنوان props به کامپوننت‌های فرزند انتقال دهد.

```js
<FormattedDate date={this.state.date} />
```

کامپوننت `FormattedDate` از props خود `date` را دریافت می‌کند و نخواهد فهمید که از state یا props `Clock` به دریافت کرده، یا با دست تایپ شده‌است.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

به این جریان داده عموما "یک طرفه" یا "بالا به پایین" گفته می‌شود. مالکیت هر state در دست یک کامپوننت مشخص است و هر داده یا UI که از آن state مشتق شده‌باشد، فقط کامپوننت‌های زیرین خود را در ساختار درختی تحت تاثیر قرار می‌دهد.

اگر یک درخت کامپوننت را به شکل آبشاری از props ها تصور کنید، state هر کامپوننت مانند منبعی اضافه از آب است که در نقطه‌ای دلخواه به آن متصل و به پایین جریان پیدا می‌کند.

برای نشان‌دادن این‌که تمام کامپوننت‌ها واقعا ایزوله هستند، ما می‌توانیم یک کامپوننت `App` بسازیم که سه کامپوننت `<Clock>` را رندر می‌کند.

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

هر `Clock` تایمر خودش را تنظیم و به طور مستقل به‌روز رسانی می‌کند.

در برنامه‌های ری‌اکتی، این‌که یک کامپوننت دارای state هست یا نه، به جزئیات طراحی آن کامپوننت مربوط می‌شود که ممکن است در طول زمان تغییر کند. شما می‌توانید کامپوننت‌های بدون state را درون کامپوننت های دارای state استفاده کنید و همچنین برعکس.
