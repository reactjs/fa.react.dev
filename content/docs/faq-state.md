---
id: faq-state
title: Component State
permalink: docs/faq-state.html
layout: docs
category: FAQ
---

### تابع `setState` چه کاری انجام می‌دهد؟ {#what-does-setstate-do}

تابع `setState(‍)` بروزرسانی ‍‍`state`یک کامپومننت را برنامه‌ریزی می‌کند. زمانی که state تغییر کند، کامپوننت با رندرِ مجدد پاسخ می‌دهد.

### چه تفاوتی بین `state` و `props` وجود دارد؟ {#what-is-the-difference-between-state-and-props}

[`props`](docs/components-and-props.html/)(مخفف کلمه «properties») و [`state`،](/docs/state-and-lifecycle.html) هر دو شی‌های جاوااسکریپت می‌باشند. با وجود اینکه هر دو حاوی اطلاعاتی هستند که خروجی رندر را تحت تاثیر قرار می‌دهند، یک تفاوت بسیار مهم دارند: `props` *به* کامپوننت منتقل می‌شود(مثل پارمتر تابع) در حالی که `state` در داخل کامپوننت مدیریت می‌شود(مثل متغیرهایی که در *داخل* یک تابع ایجاد می‌شوند.)

جهت مطالعه بیشتر به این منابع خوب درباره نحوه استفاده صحیح از `props` و `state` مراجعه کنید:
* [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)

### چرا ‍`setState` مقدار(value) اشتباهی به من می‌دهد؟ {#why-is-setstate-giving-me-the-wrong-value}

در ری‌اکت هر دوی `this.props` و ‍`this.state` نشانگر مقدارهای *رندر شده*، یعنی چیزی که در صفحه وجود دارد، هستند.

فراخوان‌های `setState` ناهم‌زمان(asynchronous) هستند، پس به `this.state` اتکا نکنید تا مقدار جدید شما را بلافاصله بعد از فراخواندن `setState` نمایش دهد. اگر نیاز به محاسبه مقدارها بر اساس state کنونی دارید، به جای شی، یک تابعِ بروزرسان به تابع `setState` ارسال کنید(برای جزيیات بیشتر به پایین نگاه کنید.)

مثال از کدی که طبق انتظار عمل *نخواهد* کرد:

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

راه حل این مشکل را در پایین می‌توانید پیدا کنید.

### چگونه می‌توانم state را با مقدارهایی که به state فعلی وابسته هستند، بروزرسانی کنم؟ {#how-do-i-update-state-with-values-that-depend-on-the-current-state}

برای اینکه مطمئن شوید بروزترین نسخهٔ state استفاده می‌شود، به تابع `setState` به جای شی، یک تابع ارسال کنید(در پایین نگاه کنید.)

### چه تفاوتی در ارسال تابع به جای شی در تابع `setState` وجود دارد؟ {#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate}

ارسال یک تابعِ بروزرسان به شما اجازه دسترسی به مقدار state فعلی در داخل بروزرسان را می‌دهد. از آنجایی که فراخوان‌های setState دسته‌ای هستند، باعث می‌شود که بروزرسانی‌ها به صورت زنجیری انجام شده و بدون ایجاد تداخل، یکی پس از دیگری بروزرسانی شوند.

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

[درباره `setState` بیشتر بیاموزید](/docs/react-component.html#setstate)

### چه زمانی `setState` ناهم‌زمان(asynchronous) است؟ {#when-is-setstate-asynchronous}

در حال حاضر `setState` در داخل event handlerها ناهم‌زمان است.

به عنوان نمونه این کار تضمین می‌کند که اگر هر دوی `Parent` و `Child` در هنگام رویدادِ کلیک، تابعِ `setState` را فراخوانی کنند، `Child` دو بار رندر نشود. ری‌اکت در عوض بروزرسانی‌های state را در پایان رویدادِ مرورگر، به صورت یکباره انجام می‌دهد. این کار باعث می‌گردد که در اپلیکشن‌های بزرگ‌تر عملکرد به صورت قابل توجهی بهبود یابد.

این جزيیاتی اجرایی است، بنابراین از تکیه مستقیم به آن دوری کنید. در نسخه‌های آتی، ری‌اکت `state` را در موارد بیشتری به صورت پیش‌فرض بروزرسانی خواهد کرد.

### چرا ری‌اکت به طور همزمان `this.state` را بروزرسانی نمی‌کند؟ {#why-doesnt-react-update-thisstate-synchronously}

همانطور که در بخش قبلی توضیح داده شد، ری‌اکت عمدا «منتظر می‌ماند» تا همه کامپوننت‌ها در event handlerهای خود، تابع `setState()` را قبل از آغاز رندرِ دوباره، فرا بخوانند. این کار با جلوگیری از رندرهای غیرضروری، باعث بهبود عملکرد می‌گردد.

با این وجود شاید باز برای شما سوال باشد که چرا ری‌اکت بلافاصله `this.state` را بدون رندرِ دوباره، بروزرسانی نمی‌کند.

دو دلیل عمده برای این کار وجود دارد:

* این کار یکپارچگی بین `props` و ‍`state` را از بین برده و باعث ایجاد مشکلاتی می‌گردد که عیب‌زدایی(debug) آن بسیار دشوار خواهد بود.
* این کار باعث می‌شود که پیاده‌سازی ویژگی‌های جدیدی که در حال کار بر روی آنها هستیم، غیرممکن گردد.

 این [ دیدگاه در گیت‌هاب ](https://github.com/facebook/react/issues/11527#issuecomment-360199710) موارد ویژه‌ای را با جزییات بیان می‌کند.

### آیا باید از یک کتابخانه مدیریت state مانند Redux یا MobX استفاده کنم؟ {#should-i-use-a-state-management-library-like-redux-or-mobx}

[شاید.](https://redux.js.org/faq/general#when-should-i-use-redux)

بهتر است که قبل از شروع یک کتابخانهٔ اضافی دیگر، ابتدا ری‌اکت را خوب یاد بگیرید. شما می‌توانید تنها با استفاده از ری‌اکت، اپلیکیشن‌های تقریبا پیچیده‌ای بسازید.
