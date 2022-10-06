---
id: composition-vs-inheritance
title: ترکیب در مقابل وراثت
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

ری‌اکت دارای یک مدل ترکیبی (compostion) قدرتمند است. به همین دلیل برای افزایش امکان استفاده مجدد کد بین کامپوننت‌ها، ما استفاده از ترکیب را به جای ارث‌بری پیشنهاد می‌کنیم.

توسعه‌دهنگانی که تازه وارد دنیای ری‌اکت می‌شوند، هنگام مواجه با ارث‌بری دچار مشکلاتی می‌شوند. در این بخش، چند مورد از آن‌ها را بررسی و نشان می‌دهیم که چگونه با استفاده از ترکیب می‌توان آن‌ها را حل کرد.

## دربرگرفتن {#containment}

بعضی از کامپوننت‌ها اطلاعاتی از فرزند خود ندارند. این مورد در کامپوننت‌هایی مانند `Sidebar` یا `Dialog` که مانند یک قاب عمل می‌کنند، مرسوم است.

توصیه ما درمورد این کامپوننت‌ها، استفاده از prop مخصوص `children` است. به این وسیله کامپوننت المنت‌های فرزند خود را مستقیم به خروجی منتقل می‌کند:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

با این روش می توان یک JSX دلخواه را به عنوان فرزند درون آن‌ها قرار داد:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[روی CodePen امتحان کنید](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

هرچیزی که میان تگ `<FancyBorder>` قرار گیرد، از راه prop `children` در اختیار کامپوننت `FancyBorder` قرار می‌گیرد. از آن‌جا که کامپوننت `FancyBorder` مقدار `{props.children}` را میان یک `<div>` رندر می‌کند، در نتیجه المنت‌های پاس داده شده در خروجی نهایی ظاهر می‌شوند.

در مواردی نادر، ممکن است نیاز به پر کردن چند جای خالی در کامپوننت خود داشته‌باشید. در این حالت می‌توانید به جای `children`، بر اساس روش دلخواه خود عمل کنید:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

المنت‌های ری‌اکتی مانند `<Contacts />` و `<Chat />` فقط ‌آبجکت هستند، بنابراین شما می‌توانید آن‌ها را (مانند انواع دیگر دیتا) به عنوان prop [به کامپوننت‌های دیگر] پاس دهید. این روش ممکن است‌شما را یاد "slots" در دیگر کتابخانه‌ها بیاندازد. هیچ محدودیتی در پاس دادن prop در ری‌اکت نیست.

## تخصص {#specialization}

گاهی اوقات به ذهن ما می‌رسد که کامپوننت‌ها شکل ویژه‌ای از یک کامپوننت دیگر هستند. برای مثال، می‌توان گفت یک `WelcomeDialog` شکل ویژه‌ای از یک `Dialog` است.

در ری‌اکت، این قابلیت با ترکیب امکان‌پذیر می‌شود. به این ترتیب که یک کامپوننت جزیی، یک کامپوننت کلی‌تر را با تنظیم prop ها رندر می‌کند:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

ترکیب برای کامپوننت‌هایی که بر پایه کلاس نوشته‌شده‌اند نیز به خوبی کار می‌کند:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## پس ارث‌بری چه می‌شود؟ {#so-what-about-inheritance}

در Facebook ما از ری‌اکت برای ساخت هزاران کامپوننت استفاده می‌کنیم. اما هنوز موردی برای استفاده ارث‌بری پیدا نکرده‌ایم که آن را پیشنها کنیم.

با استفاده از prop و ترکیب کامپوننت‌ها، در طراحی ظاهر و عملکرد کامپوننت‌ها انعطاف‌پذیری لازم را خواهید داشت. به‌خاطر داشته‌باشید که کامپوننت‌ها می‌توانند prop های دلخواهی مثل مقادیر اولیه، المنت‌های ری‌اکت و یا توابع را دریافت کنند.

اگر نیاز دارید قابلیتی که مربوط به UI نمی‌شود را میان کامپوننت‌ها به اشتراک بگذارید، پیشنهاد ما ساخت یک ماژول جاوااسکریپت است. کامپوننت‌های شما می‌توانند آن تابع، آبجکت و یا یک کلاس را import کرده و بدون تغییر یا توسعه آن، از قابلیت‌های آن بهره ببرند.
