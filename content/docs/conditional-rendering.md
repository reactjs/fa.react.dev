---
id: conditional-rendering
title: رندر کردن شرطی
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

 در ری اکت، شما می‌توانید کامپوننت‌های مجزایی بسازید که رفتار مورد نیاز شما را کپسوله سازی کنند. سپس می‌توانید فقط بعضی از این کامپوننت‌ها را بسته به state برنامه رندر کنید .

رندر کردن شرطی در ری‌اکت همان‌طور کار می‌کند که شرط‌ها در جاوا‌اسکریپت کار می‌کنند. از عملگرهای جاوااسکریپت مانند [if](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) یا [عملگر شرطی (conditional operator)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) برای ساختن المنت‌هایی که نمایانگر state کنونی هستند، استفاده کنید و بگذارید ری‌اکت UI را به‌روز رسانی کند تا با آن‌ها منطبق شود.

این دو کامپوننت را در نظر بگیرید:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

 در ادامه ما یک کامپوننت `Greeting` می‌سازیم که یکی از این کامپوننت‌ها را بسته به اینکه کاربر لاگین شده‌است نشان می‌هد:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

<<<<<<< HEAD
ReactDOM.render(
  // تغییر isLoggedIn={true} را امتحان کنید 
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
>>>>>>> 37cf98d075de3133b5ae69fe80fbecb6a742530a
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

این مثال بر اساس مقدار prop با نام `isLoggedIn` یک [پیام] خوش‌آمد گویی متفاوتی را رندر می‌کند.  

### متغیر‌های المنت {#element-variables}

شما می‌توانید از متغییرها برای ذخیره کردن المنت‌ها استفاده کنید. این به شما کمک می‌کند تا بتوانید بخشی از یک کامپوننت را به‌صورت شرطی، رندر کرده، درحالی‌که بقیه خروجی کامپوننت تغییری نمی‌کند.

این دو کامپوننت جدید را در نظر بگیرید که نمایانگر دکمه‌های ورود (Login) و خروج (Logout) هستند.

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

در مثال زیر، یک [کامپوننت دارای state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) به نام `LoginControl` می‌سازیم.

این [کامپوننت] یا `<LoginButton />` یا `<LogoutButton />` را براساس state کنونی رندر خواهد کرد. همچنین، یک `<Greeting />` از مثال را قبل رندر می‌کند:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```

[**روی ‌CodePen امتحان کنید**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

درحالی‌که تعریف یک متغیر و استفاده از عبارت شرطی `if`، یک روش خوب برای رندرکردن شرطی است؛ گاهی ممکن است شما بخواهید یک syntax کوتاه‌تر داشته باشید. چندین روش برای شرط های خطی در JSX وجود دارد که در زیر توضیح داده شده است: 

### if خطی با استفاده از عملگر منطقی && {#inline-if-with-logical--operator}

شما می‌توانید [هر expression را در JSX به صورت توکار](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) با قراردادن در آکولاد بنویسید. این مورد شامل عملگر منطقی `&&` هم می‌شود. کاربرد آن برای اضافه‌کردن شرطی یک المنت است:

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```

[**روی CodePen استفاده کنید**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

این روش جواب می‌دهد چرا که در جاوااسکریپت، حاصل `true && expression` همیشه برابر است با `expression` و همچنین حاصل  `false && expression` ‍‍ همیشه برابر است با  `false`.

بنابراین اگر شرط برابر با `true` باشد، المنتی که بلافاصله بعد از عملگر `&&` قرار گرفته است در خروجی نمایش داده خواهد شد و اگر حاصل شرط برابر با`false` باشد،‌ ری‌اکت این عبارت را نادیده می‌گیرد. 

توجه داشته باشید بازگرداندن یک عبارت falsy مانع رندر شدن المنت بعد از `&&` می‌شود، اما مقدار عبارت falsy را باز می‌گرداند. در مثال زیر، `<div>0</div>` از متد render باز گردانده می‌شود.

```javascript{2,5}
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### if-else خطی با عملگر شرطی {#inline-if-else-with-conditional-operator}

روش دیگر رندر شرطی المنت‌ها به‌صورت خطی،‌ استفاده از عملگر شرطی جاوااسکریپت [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) است.

در مثال زیر ما از این روش استفاده می‌کنیم تا متن کوتاهی را به‌صورت شرطی رندر کنیم.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

از این روش همچنین می‌توان برای عبارات شرطی طولانی‌تر استفاده نمود، اگرچه که در اینصورت کمتر مشخص است که **[**در کد نوشته شده**]** چه اتفاقی افتاده است:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

درست مثل جاوااسکریپت، انتخاب اینکه کدام روش مناسب است، به نظر شما و تیم شما بستگی دارد که کدام روش برای شما خوانا‌تر است.‌ همچنین به یاد داشته باشید که هرگاه شرط‌ها بیش از اندازه پیچیده شدند،ممکن است زمان خوبی باشه که [یک کامپوننت استخراج کنید](https://reactjs.org/docs/components-and-props.html#extracting-components). 
### جلوگیری از رندر شدن کامپوننت {#preventing-component-from-rendering}

در موارد نادر، ممکن است شما بخواهید یک کامپوننت - حتی اگر توسط یک کامپوننت دیگر رندر شده باشد - خودش را مخفی کند. برای انجام این کار، `null` را به‌جای خروجی رندر برگردانید.

در مثال زیر، کامپوننت `<WarningBanner />` بر‌اساس مقدار prop ای به‌نام `warn` رندر می‌شود. اگر مقدار این prop برابر با`false` باشد، در این‌صورت این کامپوننت رندر نمی‌شود.  


```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);
```

[**روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

برگرداندن مقدار `null` از متد `render` یک کامپوننت، اجرای متد‌های چرخه حیاط کامپوننت را تحت تاثیر قرار نمی‌دهد.‌ برای مثال `componentDidUpdate` همچنان فراخوانی خواهد شد. 
