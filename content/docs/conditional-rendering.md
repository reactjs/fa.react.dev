---
id: conditional-rendering
title: رندر شرطی
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

 در ری اکت، شما می‌توانید کامپوننت‌های مجزایی بسازید تا رفتار مورد نیاز شما را کپسوله سازی کنند. سپس می‌توانید بعضی از این کامپوننت‌ها را، بسته به state برنامه، رندر کنید .

رندر شرطی در ری اکت دقیقا مشابه «شرط‌ها» در جاوا‌اسکریپت کار میکند.
از عملگر‌های جاوااسکریپت مثل کلمه کلیدی  [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) یا عملگر شرطی  [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) برای ایجاد المنت‌هایی که state کنونی را نشان می‌دهند، استفاده کنید و بگذارید  ری اکت UI را بروزرسانی کند تا با این شرط ها منطبق شود.

این دو کامپوننت را در نظر بگیرید:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

 در ادامه ما یک کامپوننت تحت عنوان `Greeting`  می‌سازیم، که یکی از دو کامپوننت اشاره شده در بالا را بر حسب اینکه یک کاربر لاگین کرده یا خیر، نشان می‌دهد:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  //در خط زیر مقدار isLoggedIn را به true تغییر دهید‌‌(isLoggedIn={true}): 
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**کد بالا را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

در مثال بالا، هر بار یک پیام خوش آمد‌گویی متفاوت بر‌اساس مقدارprop ای که `isLoggedIn` نام دارد، رندر می‌شود.  

### متغیر‌های المان‌ها {#element-variables}

برای ذخیره سازی المان‌ها می‌توان از متغیرها کمک گرفت، استفاده از این روش باعث می‌شود تا بتوان بخشی از یک کامپوننت را به‌صورت شرطی، رندر کرده در حالیکه بقیه خروجی کامپوننت تغییری نمی‌کند.

این دو کامپوننت جدید رو در نظر بگیرید که به ترتیب نمایانگر دکمه ورود (Login) و خروج (Logout) هستند.

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

در مثال زیر، یک [ کامپوننتstateful](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) 
 به نام`LoginControl` می‌سازیم. 

این کامپوننت براساس state کنونی اش، یکی از کامپوننت‌های `<LoginButton />` یا`<LogoutButton />` را رندر می‌کند.

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

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**این کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

در حالیکه روش تعریف یک متغیر و استفاده از عبارت شرطی `if`، یک روش خوب برای رندر شرطی است؛ گاهی ممکن است شما نیاز به یک syntax کوتاه‌تر داشته باشید. چندین روش برای شرط های خطی در JSX وجود دارد که در زیر توضیح داده شده است: 

### If خطی بااستفاده از اپراتور && منطقی {#inline-if-with-logical--operator}

شما می‌توانید هر عبارتی (شامل عملگر ‍‍‍‍`&&` منطقی در جاوااسکریپت)‌را در JSX با استفاده از یک جفت `{}`،‌استفاده کنید:‌ر.ک. [embed any expressions in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx)؛ استفاده از این روش برای اضافه کردن یک المان به‌صورت شرطی، میتواند مفید باشد: 

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
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**این کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

این روش جواب می‌دهد چرا که در جاوااسکریپت، حاصل `true && عبارت` همیشه برابر است با `عبارت` و همچنین حاصل  `false && عبارت` ‍‍ همیشه برابر است با  `false`. بنابراین اگر شرط برابر با `true` باشد، المانی که بلافاصله بعد از عملگر `&&` قرار گرفته است در خروجی نمایش داده خواهد شد و اگر حاصل شرط برابر با`false` باشد،‌ری‌اکت این عبارت را نادیده می‌گیرد. 

### If-Else خطی با عملگر شرطی {#inline-if-else-with-conditional-operator}

روش دیگری که برای رندر شرطی المان‌ها به‌صورت خطی استفاده می‌شود،‌استفاده از عملگر شرطی جاوااسکریپت [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
 است.

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

از این روش همچنین می‌توان برای عبارات شرطی طولانی‌تر استفاده نمود، اگرچه که در اینصورت کمتر مشخص است که در کد نوشته شده چه اتفاقی افتاده است:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

درست مثل زبان جاوااسکریپت،انتخاب اینکه کدام روش مناسب است، به نظر شما و تیم شما بستگی دارد که کدام روش برای شما خوانا‌تر است.‌همچنین این نکته را در نظر داشته باشید که هرگاه شرط‌ها بیش از انداره پیچیده شدند،بهتر است که از روش [استخراج یک کامپوننت](/docs/components-and-props.html#extracting-components) استفاده کنید. 

### جلوگیری از رندر شدن یک کامپوننت {#preventing-component-from-rendering}

گاهی پیش می‌آید که بخواهید یک کامپوننت-حتی اگر توسط یک کامپوننت دیگر رندر شده باشد- خودش را مخفی کند. برای انجام این کار، عبارت `null` را به‌جای خروجی تابع رندر کامپوننت برگردانید.

در مثال زیر، کامپوننت `<WarningBanner />` بر‌اساس مقدار prop ای به‌نام `warn` رندر می‌شود. اگر مقدار این prop برابر با`false` باشد، در اینصورت این کامپوننت رندر نخواهد شد.  


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

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**این کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

برگرداندن مقدار `null`از متد `render` یک کامپوننت، نحوه فراخوانی و اجرای متد‌های lifecycle  کامپونتت را تحت تاثیر قرار نمی‌دهد.‌برای مثال متد `componentDidUpdate` همچنان فراخوانی خواهد شد. 