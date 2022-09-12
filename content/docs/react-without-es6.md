---
id: react-without-es6
title: ری‌اکت بدون ES6
permalink: docs/react-without-es6.html
---

شما به صورت عادی یک کامپوننت ری‌اکت را به عنوان یک کلاس جاوااسکریپت ساده تعریف می‌کنید:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

اگر هنوز از ES6 استفاده نمی‌کنید، شاید به جای ان از ماژول `create-react-class` استفاده کنید:


```javascript
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

API کلاس‌های ES6 با کمی استثناءها مشابه `createReactClass()` است:

## تعریف Prop های پیش‌فرض {#declaring-default-props}

با توابع و کلاس‌های ES6، `defaultProps` به عنوان یک ویژگی روی خود کامپوننت تعریف می‌شوند.

```javascript
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

با `createReactClass()`، شما به تعریف `getDefaultProps()` به عنوان یک تابع روی آبجکت پاس داده شده نیاز دارید.

```javascript
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },

  // ...

});
```

## تنظیم State اولیه {#setting-the-initial-state}

در کلاس‌های ES6، شما می‌توانید state اولیه را با اختصاص دادن `this.state` در سازنده تعریف کنید:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

با `createReactClass()`، شما باید یک متد جداگانه `getInitialState` که state اولیه را بازمی‌گرداند فراهم کنید:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Autobinding {#autobinding}

در کامپوننت‌های ری‌اکت که به عنوان کلاس‌های ES6 تعریف شده‌اند، متدها از همان مفاهیم کلاس‌های ES6 معمولی پیروی می‌کنند. یعنی آن‌ها `this` را به طور خودکار به نمونه شی bind نمی‌کنند. شما باید صریحا از `.bind(this)` در سازنده استفاده کنید:

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

در `createReactClass()`، اینکار ضروری نیست چرا که خودش تمام متدهارا bind می‌کند:

```javascript
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

این یعنی نوشتن کلاس‌های ES6 همراه با کمی کد boilerplate برای مدیریت کننده‌های رویداد است، اما مزیت آن این است که عملکرد بهتری در اپلیکیشن‌های بزرک دارد.

<<<<<<< HEAD
اگر کد boilerplate برای شما جذاب نیست، می‌توانید پیشنهاد نحوی **experimental** در [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/) را در Babel فعال کنید:
=======
If the boilerplate code is too unattractive to you, you may use [ES2022 Class Properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) syntax:
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6


```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```

<<<<<<< HEAD
لطفا در نظر داشته باشید که قاعده بالا **experimental** است و ممکن است تغییر کند، یا ممکن است این پیشنهاد وارد زبان نشود.

اگر ترجیح می‌دهید که در امنیت باشید، چند انتخاب دارید:
=======
You also have a few other options:
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

* متدها را در سازنده bind کنید.
* از arrow function ها استفاده کنید، برای مثال `onClick={(e) => this.handleClick(e)}`.
* به استفاده از `createReactClass` ادامه دهید.

## Mixins {#mixins}

>**نکته:**
>
>ES6 بدون پشتیبانی از mixin منتشر شد. بنابراین، هنگامی که از ری‌اکت با کلاس‌های ES6 استفاده می‌کنید، mixin ها پشتیبانی نمی‌شوند.
>
>**همچنین ما به تعدادی مشکل در پایگاه‌های کد با استفاده از mixin ها برخوردیم، [و استفاده از آن‌ها در کدهای جدید را پیشنهاد نمی‌کنیم](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>این قسمت فقط برای ارجاع وجود دارد.

گاهی اوقات ممکن است کامپوننت‌های بسیار متفاوت بضعی عملکردهای رایج را با یکدیگر به اشتراک بگذارند. این‌ها گاهی [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern) خوانده می‌شوند. `createReactClass` به شما اجازه استفاده از سیستم سنتی `mixins` برای آن را می‌دهد.

یک مورد کاربرد رایج، یک کامپوننت که می‌خواهد خودش را در یک چرخه زمانی به‌روز کند است. استفاده از `setInterval()` ساده است، اما بسیار مهم است که زمانی که دیگر از interval خود استفاده نمی‌کنید آن را لغو کنید تا حافظه مصرف نکند. ری‌اکت [متدهای چرخه حیات](/docs/react-component.html#the-component-lifecycle) که به شما اجازه می‌دهد زمانی که یک کامپوننت  ایجاد و یا نابود می‌شود را بدانید فراهم کرده‌است. بیایید یک mixin ساده که از این متدها برای فراهم کردن یک تابع `setInterval()` آسان که به صورت خودکار زمانی که کامپوننت شما نابود می‌شود پاک می‌شود را ایجاد کنیم.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

const root = ReactDOM.createRoot(document.getElementById('example'));
root.render(<TickTock />);
```

اگر یک کامپوننت از چند mixin استفاده می‌کند و mixin های متفاوت یک متد چرخه حیات یکسان را تعریف می‌کنند، (برای مثال mixin های مختلف می‌خواهند کمی تمیزکاری پس از نابود شدن کامپوننت انجام دهند) همه متدهای چرخه حیات برای فراخوانی تضمین شده‌اند. متدهای mixin ها به همان ترتیبی که لیست شده‌اند، به دنبال صدا زدن یک متد روی کامپوننت اجرا می‌شوند.
