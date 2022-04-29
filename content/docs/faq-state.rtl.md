---
id: faq-state
title: State کامپوننت
permalink: docs/faq-state.html
layout: docs
category: FAQ
---
### تابع `setState` چه کاری انجام می‌دهد؟

`setState()` schedules an update to a component's `state` object. When state changes, the component responds by re-rendering.

تابع `setState(‍)` برنامه به‌روزرسانی ‍‍`state`یک کامپومننت را برنامه‌ریزی می‌کند. زمانی که state تغییر کند، کامپوننت با رندرِ مجدد پاسخ می‌دهد.

### What is the difference between `state` and `props`?
### چه تفاوتی بین `state` و `props` وجود دارد؟

[`props`](/docs/components-and-props.html) (short for "properties") and [`state`](/docs/state-and-lifecycle.html) are both plain JavaScript objects. While both hold information that influences the output of render, they are different in one important way: `props` get passed *to* the component (similar to function parameters) whereas `state` is managed *within* the component (similar to variables declared within a function).

[`props`](docs/components-and-props.html/)(مخفف کلمه «properties») و [`state`](/docs/state-and-lifecycle.html) هر دو شی‌های جاوااسکریپت هستند. با وجود اینکه هر دو حاوی اطلاعاتی هستند که خروجی رندر را تحت تاثیر قرار می‌دهند، یک تفاوت بسیار مهم دارند: `props` به کامپوننت منتقل می‌شود(مثل پارمتر تابع) در حالی که `state` در داخل کامپوننت مدیریت می‌شود(مثل متغیرهایی که در داخل یک تابع ایجاد می‌شوند).

Here are some good resources for further reading on when to use `props` vs `state`:

جهت مطالعه بیشتر به این منابع خوب درباره نحوه استفاده صحیح از `props` و `state` مراجعه کنید:

* [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)

### Why is `setState` giving me the wrong value?
### چرا ‍`setState` مقدار(value) اشتباهی به من می‌دهد؟

In React, both `this.props` and `this.state` represent the *rendered* values, i.e. what's currently on the screen.

در ری‌اکت هر دوی `this.props` و ‍`this.state` نشانگر مقدارهای رندر شده، یعنی چیزی که در صفحه وجود دارد، هستند.

Calls to `setState` are asynchronous - don't rely on `this.state` to reflect the new value immediately after calling `setState`. Pass an updater function instead of an object if you need to compute values based on the current state (see below for details).



Example of code that will *not* behave as expected:

یک مثال از کدی که طبق انتظار عمل *نخواهد* کرد:

```jsx
incrementCount() {
  // Note: this will *not* work as intended.
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // Let's say `this.state.count` starts at 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
  // When React re-renders the component, `this.state.count` will be 1, but you expected 3.

  // This is because `incrementCount()` function above reads from `this.state.count`,
  // but React doesn't update `this.state.count` until the component is re-rendered.
  // So `incrementCount()` ends up reading `this.state.count` as 0 every time, and sets it to 1.

  // The fix is described below!
}
```

See below for how to fix this problem.

راه حل این مشکل را در ادامه می‌توانید پیدا کنید.

### How do I update state with values that depend on the current state?

### چگونه می‌توانم state را با مقدارهایی که به state کنونی وابسته هستند، بروزرسانی کنم؟

Pass a function instead of an object to `setState` to ensure the call always uses the most updated version of state (see below).

برای اینکه مطمئن شوید بروزترین نسخهٔ state استفاده می‌شود(در پایین ببینید)، در `setState` به جای شی، یک تابع قرار دهید.

### What is the difference between passing an object or a function in `setState`?

### چه تفاوتی در قرار دادن تابع به جای شی در تابع `setState` وجود دارد؟

Passing an update function allows you to access the current state value inside the updater. Since `setState` calls are batched, this lets you chain updates and ensure they build on top of each other instead of conflicting:




```jsx
incrementCount() {
  this.setState((state) => {
    // Important: read `state` instead of `this.state` when updating.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // Let's say `this.state.count` starts at 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // If you read `this.state.count` now, it would still be 0.
  // But when React re-renders the component, it will be 3.
}
```

[Learn more about setState](/docs/react-component.html#setstate)

[درباره `setState` بیشتر بیاموزید](/docs/react-component.html#setstate)

### چه زمانی `setState` ناهم‌زمان(asynchronous) است؟

در حال حاضر `setState` در داخل event handlerها ناهم‌زمان است.

This ensures, for example, that if both `Parent` and `Child` call `setState` during a click event, `Child` isn't re-rendered twice. Instead, React "flushes" the state updates at the end of the browser event. This results in significant performance improvements in larger apps.

This is an implementation detail so avoid relying on it directly. In the future versions, React will batch updates by default in more cases.

### چرا ری‌اکت به طور همزمان `this.state` را بروزرسانی نمی‌کند؟

همانطور که در بخش قبلی توضیح داده شد، ری‌اکت عمدا «منتظر می‌ماند» تا همه کامپوننت‌ها در event handlerهای خود، تابع `setState()` را قبل از آغاز رندرِ دوباره، فرا بخوانند. این کار با جلوگیری از رندرهای غیرضروری، باعث بهبود عملکرد می‌گردد.

با این وجود شاید باز برای شما سوال باشد که چرا ری‌اکت بلافاصله `this.state` را بدون رندرِ دوباره، بروزرسانی نمی‌کند.

دو دلیل عمده برای این کار وجود دارد:

* این کار یکپارچگی بین `props` و ‍`state` را از بین برده و باعث ایجاد مشکلاتی می‌گردد که عیب‌زدایی(debug) آن بسیار دشوار خواهد بود.
* این کار باعث می‌شود که پیاده‌سازی ویژگی‌های جدیدی که در حال کار بر روی آنها هستیم، غیرممکن گردد.

 [این دیدگاه در گیت‌هاب ](https://github.com/facebook/react/issues/11527#issuecomment-360199710) موارد ویژه‌ای را با جزییات بیان می‌کند.

### آیا باید از یک کتابخانه مدیریت state مانند Redux یا MobX استفاده کنم؟

[شاید.](https://redux.js.org/faq/general#when-should-i-use-redux)

بهتر است که قبل از شروع یک کتابخانهٔ اضافی دیگر، ابتدا ری‌اکت را خوب یاد بگیرید. شما می‌توانید تنها با استفاده از ری‌اکت، اپلیکیشن‌های تقریبا پیچیده‌ای بسازید.