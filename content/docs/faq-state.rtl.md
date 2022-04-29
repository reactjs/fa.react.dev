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

Calls to `setState` are asynchronous - don't rely on `this.state` to reflect the new value immediately after calling `setState`. Pass an updater function instead of an object if you need to compute values based on the current state (see below for details).

Example of code that will *not* behave as expected:

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

### How do I update state with values that depend on the current state?

Pass a function instead of an object to `setState` to ensure the call always uses the most updated version of state (see below).

### What is the difference between passing an object or a function in `setState`?

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

### When is `setState` asynchronous?

Currently, `setState` is asynchronous inside event handlers.

This ensures, for example, that if both `Parent` and `Child` call `setState` during a click event, `Child` isn't re-rendered twice. Instead, React "flushes" the state updates at the end of the browser event. This results in significant performance improvements in larger apps.

This is an implementation detail so avoid relying on it directly. In the future versions, React will batch updates by default in more cases.

### Why doesn't React update `this.state` synchronously?

As explained in the previous section, React intentionally "waits" until all components call `setState()` in their event handlers before starting to re-render. This boosts performance by avoiding unnecessary re-renders.

However, you might still be wondering why React doesn't just update `this.state` immediately without re-rendering.

There are two main reasons:

* This would break the consistency between `props` and `state`, causing issues that are very hard to debug.
* This would make some of the new features we're working on impossible to implement.

This [GitHub comment](https://github.com/facebook/react/issues/11527#issuecomment-360199710) dives deep into the specific examples.

### Should I use a state management library like Redux or MobX?

[Maybe.](https://redux.js.org/faq/general#when-should-i-use-redux)

It's a good idea to get to know React first, before adding in additional libraries. You can build quite complex applications using only React.
