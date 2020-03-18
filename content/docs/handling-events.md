---
id: handling-events
title: کار با رویدادها
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

کار با رویدادها در ری‌اکت همانندِ کار با رویدادها در المنت‌هایِ DOM است. تنها چند تفاوتِ سینتکسی هست:

* نامگذاریِ رویدادهایِ ری‌اکت به camelCase است، بر خلافِ نامگذاریِ lowercase در رویدادهایِ DOM.
* با استفاده از JSX، برایِ رسیدگی به رویداد یک تابع پاس داده می‌شود، به جایِ یک رشته.

برایِ مثال، کدِ HTML زیر

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

در ری‌اکت به این فرم خواهد بود:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

تفاوتِ دیگر این است که نمی‌توان برایِ جلوگیری از رفتارِ پیش‌فرض `false` برگرداند. در عوض باید صریحانه `preventDefault` را صدا زد.
برایِ نمونه، در HTML برایِ جلوگیری از باز شدنِ لینک در صفحه‌یِ جدید به طورِ پیش‌فرض، می‌توان چنین کرد:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

در ری‌اکت، اما شیوه دیگر است:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

در این‌جا، `e` یک رویدادِ نحوی (سینتکسی) است. ری‌اکت این رویدادهایِ نحوی را بر اساسِ [استانداردِ W3C](https://www.w3.org/TR/DOM-Level-3-Events/) تعریف می‌کند، پس نیاز نیست بابتِ سازگاری با مرورگرها نگران بود.
برایِ آگاهیِ بیشتر به بخشِ [`رویدادهایِ نحوی`](/docs/events.html) نگاهی بیندازید.

هنگامِ استفاده از ری‌اکت قاعدتاً نباید نیازی باشد `addEventListener` را فرابخوانیم تا به یک المنتِ DOM هنگامِ ایجاد شدن یک شنونده بیفزاییم. در عوض می‌توان در آغاز، هنگامی که المنت رندر می‌شود، یک شنونده تأمین کرد

هنگامِ تعریفِ یک کامپوننت با استفاده از یک [کلاسِ ES6](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)، یک الگویِ متداول تعریفِ رسنده‌یِ رویداد (event handler) به صورتِ یک متدِ کلاس است.
در نمونه‌یِ زیر، کامپوننتِ `Toggle` یک دکمه رندر می‌کند که کاربر می‌تواند آن را خاموش یا روشن کند.

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called.

This is not React-specific behavior; it is a part of [how functions work in JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method.

If calling `bind` annoys you, there are two ways you can get around this. If you are using the experimental [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/), you can use class fields to correctly bind callbacks:

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

This syntax is enabled by default in [Create React App](https://github.com/facebookincubator/create-react-app).

If you aren't using class fields syntax, you can use an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in the callback:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

The problem with this syntax is that a different callback is created each time the `LoggingButton` renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

## Passing Arguments to Event Handlers {#passing-arguments-to-event-handlers}

Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, if `id` is the row ID, either of the following would work:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

The above two lines are equivalent, and use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) respectively.

In both cases, the `e` argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with `bind` any further arguments are automatically forwarded.
