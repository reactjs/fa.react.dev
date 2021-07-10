---
id: handling-events
title: مدیریت رویدادها
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

مدیریت رویدادها (Handling Events) در المنت‌های ری‌اکت بسیار شبیه به مدیریت رویدادها در المنت‌های DOM است. بعضی تفاوت‌های نحوی وجود دارد:

* رویدادهای ری‌اکت به جای حروف کوچک از نامگذاری camelCase استفاده می‌کنند.
* با JSX، به جای یک رشته متنی یک تابع به عنوان event handler پاس می‌دهید.

برای مثال، کد HTML:

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

کمی در ری‌اکت متفاوت است:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

تفاوت دیگر این است که برای جلوگیری از رفتار پیش فرض در React، نمی توانید `false` را برگردانید. شما باید صراحتا `preventDefault`  را فراخوانی کنید. به عنوان مثال ، با HTML ساده ، برای جلوگیری از رفتار پیش‌فرض ارسال فرم، می توانید بنویسید:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

در ری‌اکت می‌توانید این کد را جایگزین کنید:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

اینجا، `e` یک رویداد مصنوعی (synthetic) است. ری‌اکت این رویدادهای مصنوعی را بر اساس [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/) تعریف می‌کند، بنابراین نیازی نیست نگران سازگاری مرورگرهای مختلف باشید. رویدادهای ری‌اکت دقیقا شبیه به رویدادهای محلی کار نمی‌کنند. مرجع راهنمای [`SyntheticEvent`](/docs/events.html) را برای یادگیری بیشتر ببینید.

هنگام استفاده از ری‌اکت، عموما شما نیازی به فراخوانی `addEventListener` برای اضافه کردن listener ها به یک المنت DOM پس از ایجاد آن ندارید. به جای آن، فقط یک listener زمان رندر اولیه المنت فراهم کنید.

زمانی که شما با استفاده از [کلاس‌های ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) یک کامپوننت تعریف می‌کنید، یک متد روی کلاس بودن یک الگوی رایج برای یک event handler است. برای مثال، این کامپوننت `Toggle` یک کلید که به کاربر اجازه تغییر state به  "ON" و "OFF" می‌دهد را رندر می‌کند.

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // این بایندینگ برای اینکه `this` در callback کار کند ضروری است.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**این را روی CodePen امتحان کنید**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

شما باید در مورد معنی `this` در JSX callbacks دقت کنید. در جاوااسکریپت، متدهای کلاس به صورت پیش‌فرض [bind](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) نیستند. اگر شما bind کردن `this.handleClick` را فراموش کنید و آن را به `onClick` پاس دهید، `this` زمانی که تابع واقعا فراخوانی می‌شود `undefined` خواهد بود.

این رفتار مختص به ری‌اکت نیست. این جزئی از [چگونگی کارکرد توابع در جاوااسکریپت](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) است. عموما، اگر شما بدون `()` بعد از آن به یک تابع اشاره کنید، مانند `onClick={this.handleClick}`، شما باید آن متد را bind کنید.

اگر فراخوانی `bind` شما را آزار می‌دهد، دو راه برای دور زدن ان وجود دارد. اگر شما از [قاعده فیلدهای عمومی کلاس](https://babeljs.io/docs/plugins/transform-class-properties/) استفاده می‌کنید، می‌توانید از فیلدهای کلاس برای bind کردن صحیح callback ها استفاده کنید.

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

این قاعده به صورت پیش‌فرض در [Create React App](https://github.com/facebookincubator/create-react-app) فعال شده‌است.

اگر شما از قاعده فیلدهای کلاس استفاده نمی‌کنید، می‌توانید از یک [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) در callback استفاده کنید.

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

مشکل این قاعده این است که با هر بار رندر شدن `LoggingButton` یک callback متفاوت ایجاد می‌شود. در بیشتر موارد، این مشکلی ندارد. به هر حال، اگر این callback به عنوان یک prop به کامپوننت‌های پایین‌تر ارسال شود، آن کامپوننت‌ها ممکن است رندرهای اضافه را تجربه کنند. ما عموما bind کردن در سازنده (constructor) یا استفاده از قاعده فیلدهای کلاس را برای جلوگیری از بروز مشکلات عملکرد پیشنهاد می‌کنیم.

## پاس دادن آرگومان‌ها به Event Handlers ها {#passing-arguments-to-event-handlers}

در یک حلقه، این که بخواهیم یک پارامتر اضافه به یک event handler پاس بدهیم رایج است. برای مثال، اگر `id`، شناسه سطر باشد، هر دو کد زیر کار خواهند کرد:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

دو خط بالا با هم یکسان هستند و از [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) و [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) استفاده می‌کنند.

در هر دو حالت، `e` که نمایانگر رویداد ری‌اکت است به عنوان آرگومان دوم پس از ID پاس داده می‌شود. با یک arrow function، ما باید آن را صریحا ارسال کنیم، اما با `bind` کردن، هرگونه آگومان مورد نیازی به صورت خودکار ارسال می‌شود.
