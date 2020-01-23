---
id: hooks-state
title: Using the Effect Hook
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

*Hookها* ضمیمه جدید ری‌اکت ۱۶.۸ هستند. آن‌ها به شما اجازه می‌دهند تا از state و سایر ویژگی‌های ری‌اکت بدون نوشتن class استفاده کنید.

*Effect Hook* به شما اجازه می‌دهد تا effectهای جانبی را در کامپوننت‌های تابعی نمایش دهید:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

این تکه کد با توجه به [مثال counter در صفحه قبلی است](/docs/hooks-state.html), ولی ما ویژگی جدیدی به آن افزودیم: ما title سند را با پیامی دستی تنظیم کردیم که تعداد کلیک‌ها را نشان می‌دهد.

دریافت دادها, تنظیم اشتراک(subscription), و تغییر دستی DOM مثال‌هایی از effectهای جانبی هستند. خواه نا خواه شما اینگونه عملیات را "effectهای جانبی"( یا تاثیرات ) خطاب می‌کردید, احتمالا قبلا آنها را در کامپوننت‌های خود اجرا کردید.

>نکته
>
>اگر با متدهای چرخه‌حیات ری‌اکت آشنا باشید, می‌توانید به `useEffect` به عنوان ترکیبی از `componentDidMount`, `componentDidUpdate`, و `componentWillUnmount` نگاه کنید.

در کامپوننت‌های React دو گونه effectجانبی وجود دارد: آنهایی که به پاک‌سازی نیاز دارند و آنهایی که به پاک‌سازی نیاز ندارند. بیاید به این تمیز نگاهی عمیق‌تر داشته باشیم.

## Effectهای بدون نیاز به پاکسازی {#effects-without-cleanup}

گاهی اوقات نیاز داریم تا **مقداری کد اضافه پس از آنکه ری‌اکت Dom را به‌روز رسانی کرد اجرا کنیم**. درخواست‌های درون شبکه، تغییرات دستی DOM، و گزارش‌گیری مثال‌هایی متداول از effectها هستند که نیازی به پاک‌سازی ندارند. زیرا می‌گوییم میتوانیم آنها را اجرا کنیم و فورا فراموششان کنیم. بییاید ببینیم که classها و Hookها چگونه این effectهای جانبی را بیان می‌کنند.

### مثالی با استفاده از Classها {#example-using-classes}

در کامپوننت‌های از نوع class ری‌اکت، متد `render` نباید خودش باعث effectهای جانبی باشد. اگر باشد خیلی زود است -- معمولا می‌خواهیم تا effectهای ما *بعد* از اینکه ری‌اکت DOM را به‌روز رسانی کرد اتفاق بیفتد.
به همین دلیل است که در ری‌اکت این effectهای جانبی را درون `componentDidMount` و `componentDidUpdate` قرار می‌دهیم.  بر‌می‌گردیم به مثالمان, در اینجا کامپوننت شمارش از نوع class ری‌اکت را داریم که title سند را درست بعد از آنکه ری‌اکت تغییرات را روی DOM اعمال کرد به‌روز رسانی می‌کند.

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

دقت کنید که چگونه **مجبوریم تا کد را در این دو متد چرخه‌حیات تکرار کنیم.**

زیرا در چندین مورد می‌خواهیم effect یکسانی را صرفنظر از اینکه کامپوننت فقط mount یا به‌روز رسانی شده است اعمال کنیم. به طور دقیق‌تر می‌خواهیم بعد از هر رندر اتفاق بیفتد -- ولی کاپوننت‌های از نوع class  ری‌اکت متدی به این شکل ندارند. می‌توانیم متد مجزایی اقتباس کنیم ولی همچنان مجبوریم در دو مکان صدایش کنیم.

حالا ببینیم چگونه می‌توانیم همین کار را با Hook `useEffect` انجام دهیم.

### Example Using Hooks {#example-using-hooks}

قبلا این مثال را در بالای صفحه مشاهده کردیم ، حالا می‌خواهیم نگاه دقیق‌تری به آن کنیم:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**`useEffect` چه کاری انجام می‌دهد?** با استفاده از این Hook, به ری‌اکت اعلام می‌کنید که کامپوننت شما بعد از رندر نیاز به انجام کاری دارد. ری‌اکت تابعی که شما به آن انتقال دادید را به خاطر خواهد آورد (که همان "effect" خودمان است) و بعد از به‌روز رسانی فراخوانی‌اش می‌کند. ما در این effect ، عنوان سند را تنظیم می‌کنیم، ولی می‌توانیم دریافت داده یا فراخوانی برخی از APIهای ضروری را انجام دهیم.

**چر`useEffect` درون کامپوننت فراخوانی می‌شود?** قراردادن `useEffect` به ما اجازه می‌دهد تا به state `count` (یا هر props دیگری) درست در درون effect دست‌رسی داشته باشیم. و برای خواندن آنها به API دیگری نیاز نداریم ــ زیرا همواره در scope تابع قرار دارند. Hookها از closureهای زبان جاوا اسکریپت ناشی می‌شوند و از تولید APIهای خاص ری‌اکت جلوگیری می‌کنند چرا که قبلا جاوااسکریپت این راه‌حل را ارایه داده است.

**آیا `useEffect` بعد از هر رندر اجرا می‌شود?** بله! به صورت پیش‌فرض, ‌`useEffect` در اولین رندر *و* بعد از هر به‌روز رسانی اجرا می‌شود. (بعدا در مورد اینکه چگونه [آن را شخصی‌سازی کنیم صحبت می‌کنیم](#tip-optimizing-performance-by-skipping-effects).) به جای اینکه به آن به عنوان مدت "به‌روز رسانی شدن" و "mountشدن" فکر کنید آسان‌تر است که به آن به عنوان effectی که بعد از هر رندر اتفاق می‌افتد فکر کنید. ری‌اکت تضمین می‌کند که در زمانی که effectها اجرا می‌شوند DOM به‌روز رسانی شده باشد.

### توضیحات مفصل {#detailed-explanation}

حالا که بیشتر در مورد این effectها می‌دانیم, این عبارات برای ما مفهوم بهتری پیدا می‌کنند:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

ما متغیر state `count` را ایجاد می‌کنیم، و بعد از آن به ری‌اکت می‌گوییم که میخوایم از effectی استفاده کنیم. یک تابع به Hook `useEffect` انتقال می‌دهیم. این تابعی که انتقال می‌دهیم effect ما *می‌باشد*. درون effect title سند را با استفاده از API مرورگر `document.title` قرار می‌دهیم. می‌توانیم آخرین مقدار `count` را درون effect داشته باشیم زیرا درون scope تابع ما قرار دارد. هنگامی که ری‌اکت کامپوننت‌مان را رندر می‌کند، effectمان را به یاد خواهد داشت، سپس effect را بعد از به‌روز رسانی DOM اجرا می‌کند. این عمل برای هر رندر حتی اولین رندر اتفاق می‌افتد.

توسعه‌دهندگان باتجربه می‌دانند که تابعی که به `useEffect` انتقال می‌دهیم در هر رندر متفاوت است. این عمدی است. در حقیقت، این چیزی است که به ما اجازه می‌دهد مقدار `count` را درون effect بخوانیم بدون آنکه نگران کهنه شدن آن باشیم. هر بار که مجددا رندر میکنیم یک effect ـمتفاوتـ برنامه ریزی می‌کنیم، که جایگزین قبلی می‌شود. به طریقی این باعث می‌شود که effectها شبیه به قسمتی از نتیجه رندر رفتار کنند -- هر effect "متعلق" به رندر مشخصی است. بعدا در این صفحه به وضوح می‌بینیم که چرا این اینقدر  [مفید است](#explanation-why-effects-run-on-each-update)

>نکته
>
> برخلاف `componentDidMount` یا `componentDidUpdate`، effectهایی که با `useEffect` برنامه‌ریزی می‌شوند مرورگر را از به‌روز رسانی صفحه باز نمی‌دارند. این باعث می‌شود نرم‌افزار شما حس responsive بهتری داشته باشد. اکثر effectها نیازی ندارند تا همگام اتفاق بیافتند.  در جاهای نادری که همگام اتفاق نمی‌افتند (مثل اندازگیری layout)، Hook مجزایی به نام [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) با APIای همسان از `useEffect` وجود دارد.


## Effects with Cleanup {#effects-with-cleanup}

قبلا، مشاهده کردیم که چگونه می‌توان effectهایی که نیاز به پاکسازی ندارد را بیان کرد. گرچه، برخی از effect ها به پاکسازی نیاز دارند. برای مثال، **شاید نیاز داشته باشیم تا برای منبع داده خارجی  subscription تنظیم کنیم**. در این مورد، برای جلوگیری از کمبود حافطه انجام پاکسازی مهم است! بیایید برای این کار Hookها و classها را با هم مقایسه کنیم.

### Example Using Classes {#example-using-classes-1}

در class ری‌اکت، معمولا subscription را در `componentDidMount` قرار می‌دهید، و در `componentWillUnmount` پاک‌سازی‌اش می‌کنید. برای مثال، فرض کنیم که ماژولی به نام `ChatAPI` داریم که به ما اجازه می‌دهد به وضعیت آنلاین بودن دوستان متصل شویم. در کلاس اینگونه متصل شده و وضعیت را نمایش می‌دهیم:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

توجه کنید که چگونه `componentDidMount` و `componentWillUnmount` روبه‌روی یک‌دیگر هستند. چرخه‌های حیات ما را مجبور می‌کنند که منطق را در بین‌شان تقسیم کنیم در حالی که هردوی آنها مرتبط به effect یکسانی هستند.

>توجه
>
> خوانندگان ریزبین متوجه می‌شوند که این مثال برای اینکه کامل باشد به `componentDidUpdate` نیاز دارد. فعلا این مطلب رو نادیده می‌گیریم ولی در [بخش بعدی](#explanation-why-effects-run-on-each-update) این صفحه به آن می‌پردازیم.

### مثال استفاده از Hookها {#example-using-hooks-1}

ببینم چگونه می‌شود این کامپوننت رو با استفاده از Hook ها نوشت.

شاید به این فکر می‌کنید که ما به effect مجزایی نیاز داشته باشیم تا این پاک‌سازی رو انجام دهیم. ولی کدی که برای اضافه کردن و پاک ردن subscription به `useEffect`ای که برای نگهداری آنها در کنار هم طراحی شده بسیار مرتبط است. اگر effect شما یک تابع بر‌گرداند، ری‌کت زمانی آن را اجرا میکند که موقع پاک‌سازی باشد:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**چرا از effect خود تابعی را برمی‌گردانیم?** یک مکانیزم پاک‌سازی و اختیاری در effectهاست. هر effect شاید یک تابع بازگرداند که به دنبالش پاک‌سازی را انجام دهد. این ما اجاره می‌دهد تا منطق اضافه کردن و پاک کردن subscriptions را در کنار هم نگه داریم. آنها جر یک effect هستند!

**چه زمانی ری‌اکت عمل پاک‌سازی effect را انجام می‌دهد?** ری‌اکت عمل پاک‌سازی را هنگامی که کامپوننت unmount می‌شود انجام می‌دهد. گرچه، همانطور که قبلا آموختیم، effectها در هر رندر اجرا می‌شوند و فقط یکبار رخ نمی‌هند. *همچنین* به این دلیلاست که ری‌کت قبل از اینکه effect را اجرا کند از رندر ثبلی پاک‌سازی می‌کند. در آینده بحث می‌کنیم که [چرا این کار از باگ جلوگیری می‌کند](#explanation-why-effects-run-on-each-update) و [و چگونه در صورت کاهش عمل‌کرد از این رفتار خودداری کنیم](#tip-optimizing-performance-by-skipping-effects).

>توجه
>
>نیازی نیست که تابعی که بر‌می‌گردانیم را حتما نام‌گذاری کنیم. در اینجا نامش را `cleanup` گذاشتیم تا مفهموم بهتری نشان دهد، ولی شما می‌توانید تابع arrow برگردانید یا چیز دیگری نام‌گذاری کنید.

## جمع‌بندی {#recap}

We've learned that `useEffect` lets us express different kinds of side effects after a component renders. Some effects might require cleanup so they return a function:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Other effects might not have a cleanup phase, and don't return anything.

```js
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

The Effect Hook unifies both use cases with a single API.

-------------

**If you feel like you have a decent grasp on how the Effect Hook works, or if you feel overwhelmed, you can jump to the [next page about Rules of Hooks](/docs/hooks-rules.html) now.**

-------------

## Tips for Using Effects {#tips-for-using-effects}

We'll continue this page with an in-depth look at some aspects of `useEffect` that experienced React users will likely be curious about. Don't feel obligated to dig into them now. You can always come back to this page to learn more details about the Effect Hook.

### Tip: Use Multiple Effects to Separate Concerns {#tip-use-multiple-effects-to-separate-concerns}

One of the problems we outlined in the [Motivation](/docs/hooks-intro.html#complex-components-become-hard-to-understand) for Hooks is that class lifecycle methods often contain unrelated logic, but related logic gets broken up into several methods. Here is a component that combines the counter and the friend status indicator logic from the previous examples:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

Note how the logic that sets `document.title` is split between `componentDidMount` and `componentDidUpdate`. The subscription logic is also spread between `componentDidMount` and `componentWillUnmount`. And `componentDidMount` contains code for both tasks.

So, how can Hooks solve this problem? Just like [you can use the *State* Hook more than once](/docs/hooks-state.html#tip-using-multiple-state-variables), you can also use several effects. This lets us separate unrelated logic into different effects:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

**Hooks let us split the code based on what it is doing** rather than a lifecycle method name. React will apply *every* effect used by the component, in the order they were specified.

### Explanation: Why Effects Run on Each Update {#explanation-why-effects-run-on-each-update}

If you're used to classes, you might be wondering why the effect cleanup phase happens after every re-render, and not just once during unmounting. Let's look at a practical example to see why this design helps us create components with fewer bugs.

[Earlier on this page](#example-using-classes-1), we introduced an example `FriendStatus` component that displays whether a friend is online or not. Our class reads `friend.id` from `this.props`, subscribes to the friend status after the component mounts, and unsubscribes during unmounting:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**But what happens if the `friend` prop changes** while the component is on the screen? Our component would continue displaying the online status of a different friend. This is a bug. We would also cause a memory leak or crash when unmounting since the unsubscribe call would use the wrong friend ID.

In a class component, we would need to add `componentDidUpdate` to handle this case:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Unsubscribe from the previous friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Subscribe to the next friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Forgetting to handle `componentDidUpdate` properly is a common source of bugs in React applications.

Now consider the version of this component that uses Hooks:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

It doesn't suffer from this bug. (But we also didn't make any changes to it.)

There is no special code for handling updates because `useEffect` handles them *by default*. It cleans up the previous effects before applying the next effects. To illustrate this, here is a sequence of subscribe and unsubscribe calls that this component could produce over time:

```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect
```

This behavior ensures consistency by default and prevents bugs that are common in class components due to missing update logic.

### Tip: Optimizing Performance by Skipping Effects {#tip-optimizing-performance-by-skipping-effects}

In some cases, cleaning up or applying the effect after every render might create a performance problem. In class components, we can solve this by writing an extra comparison with `prevProps` or `prevState` inside `componentDidUpdate`:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

This requirement is common enough that it is built into the `useEffect` Hook API. You can tell React to *skip* applying an effect if certain values haven't changed between re-renders. To do so, pass an array as an optional second argument to `useEffect`:

```js{3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

In the example above, we pass `[count]` as the second argument. What does this mean? If the `count` is `5`, and then our component re-renders with `count` still equal to `5`, React will compare `[5]` from the previous render and `[5]` from the next render. Because all items in the array are the same (`5 === 5`), React would skip the effect. That's our optimization.

When we render with `count` updated to `6`, React will compare the items in the `[5]` array from the previous render to items in the `[6]` array from the next render. This time, React will re-apply the effect because `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

This also works for effects that have a cleanup phase:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // Only re-subscribe if props.friend.id changes
```

In the future, the second argument might get added automatically by a build-time transformation.

>Note
>
>If you use this optimization, make sure the array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about [how to deal with functions](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) and [what to do when the array changes too often](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn't depend on *any* values from props or state, so it never needs to re-run. This isn't handled as a special case -- it follows directly from how the dependencies array always works.
>
>If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing `[]` as the second argument is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, there are usually [better](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [solutions](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) to avoid re-running effects too often. Also, don't forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.
>
>We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

## Next Steps {#next-steps}

Congratulations! This was a long page, but hopefully by the end most of your questions about effects were answered. You've learned both the State Hook and the Effect Hook, and there is a *lot* you can do with both of them combined. They cover most of the use cases for classes -- and where they don't, you might find the [additional Hooks](/docs/hooks-reference.html) helpful.

We're also starting to see how Hooks solve problems outlined in [Motivation](/docs/hooks-intro.html#motivation). We've seen how effect cleanup avoids duplication in `componentDidUpdate` and `componentWillUnmount`, brings related code closer together, and helps us avoid bugs. We've also seen how we can separate effects by their purpose, which is something we couldn't do in classes at all.

At this point you might be questioning how Hooks work. How can React know which `useState` call corresponds to which state variable between re-renders? How does React "match up" previous and next effects on every update? **On the next page we will learn about the [Rules of Hooks](/docs/hooks-rules.html) -- they're essential to making Hooks work.**
