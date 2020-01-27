---
id: hooks-state
title: Using the Effect Hook
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

*Hookها* ضمیمه جدید ری‌اکت ۱۶.۸ هستند. آن‌ها به شما اجازه می‌دهند تا از state و سایر ویژگی‌های ری‌اکت بدون نوشتن class استفاده کنید.

*هوک effect* به شما اجازه می‌دهد تا اثرات جانبی را در کامپوننت‌های تابعی نمایش دهید:

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

دریافت داده، ایجاد یک subscription و تغییر دستی DOM مثال‌هایی از اثرهای جانبی هستند. خواه نا خواه شما این‌گونه عملیات را "اثرهای جانبی" (یا اثرها) خطاب می‌کردید، که احتمالا آن‌ها را قبلا در کامپوننت‌های خود اجرا کردید.

>نکته
>
>اگر با متدهای چرخه‌حیات ری‌اکت آشنا باشید، می‌توانید به `useEffect` به عنوان ترکیبی از `componentDidMount`، `componentDidUpdate` و `componentWillUnmount` نگاه کنید.

در کامپوننت‌های React دو گونه effect جانبی وجود دارد: آن‌هایی که به پاک‌سازی نیاز دارند و آن‌هایی که به پاک‌سازی نیاز ندارند. بیاید به این تفاوت نگاهی عمیق‌تر داشته باشیم.

## اثرهایی بدون نیاز به پاک‌سازی {#effects-without-cleanup}

گاهی اوقات نیاز داریم **پس از آنکه ری‌اکت Dom را به‌روز رسانی کرد، کدی را اجرا کنیم**. درخواست‌های بر بستر شبکه، تغییرات دستی DOM و لاگ زدن مثال‌هایی متداول از اثرهایی هستند که نیازی به پاک‌سازی ندارند. از این جهت که می‌توانیم آن‌ها را اجرا کرده و فورا فراموششان کنیم. بیایید مقایسه کنیم که چگونه کلاس‌ها و هوک‌ها به ما اجازه بیان این گونه اثرهای جانبی را می‌دهند.

### مثالی با استفاده از کلاس‌ها {#example-using-classes}

در کامپوننت‌های از نوع کلاس ری‌اکت، متد `render` نباید خودش باعث اثرهای جانبی باشد. اگر باشد خیلی زود است -- معمولا می‌خواهیم تا اثرهای ما *بعد* از این‌که ری‌اکت DOM را به‌روز رسانی کرد اتفاق بیفتد.
به همین دلیل است که در ری‌اکت این اثرهای جانبی را درون `componentDidMount` و `componentDidUpdate` قرار می‌دهیم.  بر‌می‌گردیم به مثالمان, در اینجا کامپوننت شمارش از نوع کلاس ری‌اکت را داریم که title سند را درست بعد از آنکه ری‌اکت تغییرات را روی DOM اعمال کرد به‌روز رسانی می‌کند.

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

زیرا در چندین مورد می‌خواهیم اثر یکسانی را صرفنظر از اینکه کامپوننت فقط mount یا به‌روز رسانی شده است اعمال کنیم. به طور دقیق‌تر می‌خواهیم بعد از هر رندر اتفاق بیفتد -- ولی کاپوننت‌های از نوع class  ری‌اکت متدی به این شکل ندارند. می‌توانیم متد مجزایی استخراج کنیم ولی همچنان مجبوریم در دو جا آن را فراخوانی کنیم.

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

ما متغیر state `count` را ایجاد می‌کنیم، و بعد از آن به ری‌اکت می‌گوییم که می‌خوایم از effectی استفاده کنیم. یک تابع به Hook `useEffect` انتقال می‌دهیم. این تابعی که انتقال می‌دهیم effect ما *می‌باشد*. درون effect title سند را با استفاده از API مرورگر `document.title` قرار می‌دهیم. می‌توانیم آخرین مقدار `count` را درون effect داشته باشیم زیرا درون scope تابع ما قرار دارد. هنگامی که ری‌اکت کامپوننت‌مان را رندر می‌کند، effectمان را به یاد خواهد داشت، سپس effect را بعد از به‌روز رسانی DOM اجرا می‌کند. این عمل برای هر رندر حتی اولین رندر اتفاق می‌افتد.

توسعه‌دهندگان باتجربه می‌دانند که تابعی که به `useEffect` انتقال می‌دهیم در هر رندر متفاوت است. این عمدی است. در حقیقت، این چیزی است که به ما اجازه می‌دهد مقدار `count` را درون effect بخوانیم بدون آنکه نگران کهنه شدن آن باشیم. هر بار که مجددا رندر می‌کنیم یک effect ـمتفاوتـ برنامه ریزی می‌کنیم، که جایگزین قبلی می‌شود. به طریقی این باعث می‌شود که effectها شبیه به قسمتی از نتیجه رندر رفتار کنند -- هر effect "متعلق" به رندر مشخصی است. بعدا در این صفحه به وضوح می‌بینیم که چرا این اینقدر  [مفید است](#explanation-why-effects-run-on-each-update)

>نکته
>
> برخلاف `componentDidMount` یا `componentDidUpdate`، effectهایی که با `useEffect` برنامه‌ریزی می‌شوند مرورگر را از به‌روز رسانی صفحه باز نمی‌دارند. این باعث می‌شود نرم‌افزار شما حس responsive بهتری داشته باشد. اکثر effectها نیازی ندارند تا همگام اتفاق بیافتند.  در جاهای نادری که همگام اتفاق بیافتند (مثل اندازگیری layout)، Hook مجزایی به نام [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) با APIای همسان از `useEffect` وجود دارد.


## Effects with Cleanup {#effects-with-cleanup}

قبلا، مشاهده کردیم که چگونه می‌توان effectهایی که نیاز به پاکسازی ندارد را بیان کرد. گرچه، برخی از effect ها به پاکسازی نیاز دارند. برای مثال، **شاید نیاز داشته باشیم تا برای منبع داده خارجی  subscription تنظیم کنیم**. در این مورد، برای جلوگیری از کمبود حافظه انجام پاکسازی مهم است! بیایید برای این کار Hookها و کلاس‌ها را با هم مقایسه کنیم.

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
> خوانندگان ریزبین متوجه می‌شوند که این مثال برای اینکه کامل باشد به `componentDidUpdate` نیاز دارد. فعلا این مطلب را نادیده می‌گیریم ولی در [بخش بعدی](#explanation-why-effects-run-on-each-update) این صفحه به آن می‌پردازیم.

### مثال استفاده از Hookها {#example-using-hooks-1}

ببینم چگونه می‌شود این کامپوننت را با استفاده از Hook ها نوشت.

شاید به این فکر می‌کنید که ما به effect مجزایی نیاز داشته باشیم تا این پاک‌سازی را انجام دهیم. ولی کدی که برای اضافه کردن و پاک ردن subscription به `useEffect`ای که برای نگهداری آنها در کنار هم طراحی شده بسیار مرتبط است. اگر effect شما یک تابع بر‌گرداند، ری‌کت زمانی آن را اجرا می‌کند که موقع پاک‌سازی باشد:

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

**چرا از effect خود تابعی را برمی‌گردانیم?** یک مکانیزم پاک‌سازی و اختیاری در effectهاست. هر effect شاید یک تابع بازگرداند که به دنبالش پاک‌سازی را انجام دهد. این به ما اجازه می‌دهد تا منطق اضافه کردن و پاک کردن subscriptions را در کنار هم نگه داریم. آنها جز یک effect هستند!

**چه زمانی ری‌اکت عمل پاک‌سازی effect را انجام می‌دهد?** ری‌اکت عمل پاک‌سازی را هنگامی که کامپوننت unmount می‌شود انجام می‌دهد. گرچه، همانطور که قبلا آموختیم، effectها نه‌تنها یک بار بلکه در هر رندر اجرا می‌شوند. *همچنین* به این دلیل است که ری‌کت قبل از اینکه effect را اجرا کند از رندر قبلی پاک‌سازی می‌کند. در آینده بحث می‌کنیم که [چرا این کار از باگ جلوگیری می‌کند](#explanation-why-effects-run-on-each-update) و [و چگونه در صورت کاهش عمل‌کرد از این رفتار خودداری کنیم](#tip-optimizing-performance-by-skipping-effects).

>توجه
>
>نیازی نیست که تابعی که بر‌می‌گردانیم را حتما نام‌گذاری کنیم. در اینجا نامش را `cleanup` گذاشتیم تا مفهموم بهتری نشان دهد، ولی شما می‌توانید تابع arrow شکل برگردانید یا چیز دیگری نام‌گذاری کنید.

## جمع‌بندی {#recap}

تا اینجا آموختیم که `useEffect` به ما اجازه می‌دهد تا انواع مختلفی از effectهای جانبی را بعد از رندر شدن کامپوننت بیان کنیم. شاید برخی از effectها به پاک‌سازی نیاز داشته باشند که یک تابع برمی‌گردانند :

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

باقی effectها شاید فاز پاک‌سازی نداشته باشند، و هیچ چیزی برنگردانند.

```js
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
```

Effect Hook این دو مورد را با یک API یکی می‌کند.

-------------

**اگر احساس کردید که به درک مناسب تری از Effect Hook و نحوه کار آن نیاز دارید, یا احساس سردرگمی کردید, می‌توانید به صفحه بعدی [قوانین Hookها](/docs/hooks-rules.html) بروید.**

-------------

## نکته هایی برای استفاده از Effectها {#tips-for-using-effects}

ما این صفحه را با پرداختن به جنبه‌هایی از `useEffect` که کاربران با تجربه ری‌اکت در باره‌اش کنجکاو هستند ادامه می‌دهیم. خودتون رو ملزم نکنید که در آن غرق شوید. همیشه می‌توانید به این صفحه مراجعه کنید و در مورد Hook Effect دقیق‌تر بیاموزید.

### نکته: از چند Effect برای جدا کردن مهم‌ها استفاده کنید.{#tip-use-multiple-effects-to-separate-concerns}

یکی از مشکلاتی که در [Motivation](/docs/hooks-intro.html#complex-components-become-hard-to-understand) Hookها نمایان شد این بود که گاهی اوقات کامپوننت‌های کلاس مانند غالبا شامل منطق نامرتبطی هستند, ولی درحقیقت منطق مرتبط در چندین متد شکسته شده است. در اینجا کامپوننتی هست که منطق شاخص شمارش و وضعیت دوستان را در مثال قبل با هم ترکیب می‌کند:

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

توجه کنید که چطور منطقی که `document.title` را قرار می‌دهد بین `componentDidMount` و `componentDidUpdate` تقسیم شده است. منطق subscription نیز همان‌طور بین `componentDidMount` و `componentWillUnmount` تقسیم شده است. و `componentDidMount` شامل کد هر دو امر است.

پسِ hookها چگونه این مشکل را برطرف می‌کنند? همان‌طور که [می‌توانید از Hook *State* بیش از یک بار استفاده کنید](/docs/hooks-state.html#tip-using-multiple-state-variables), همچنین می‌توانید چندین effect داشته باشید. که به شما امکان می‌دهد تا منطق‌های نامرتبط را بین چندین effect جدا کنید:

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

**Hookها اجازه می‌دهند تا کد را با توجه به کاری که می‌کند جدا کنیم** درست برعکس متدهای چرخه حیات. ری‌اکت تمام effectهایی که کامپوننت از آنها استفاده می‌کند را به ترتیبی که مشخص شده‌اند اعمال می‌کند.

### توضیح: چرا Effectها در هر به‌روز رسانی اجرا می‌شوند؟ {#explanation-why-effects-run-on-each-update}

اگر قبلا از کلاس استفاده می‌کردید، متعجب هستید که چرا فاز effect پاک‌سازی به جای اینکه فقط یک‌بار در حین unmount اتفاق بیافتد در هر رندر رخ می‌دهد. پس بگذارید که در این مثال خاص توضیح دهیم که چرا این طراحی به ما کمک می‌کند تا باگ‌های کمتری داشته باشیم.

[قبلا در این صفحه](#example-using-classes-1), مثالی زدیم از کامپوننت `FriendStatus` که به ما نشان می‌داد وضعیت دوستان آنلاین هست یا خیر . کلاس ما `friend.id` را از `this.props` خوانده, و بعد از mount شدن کامپوننت، subscribe می‌کند و در حین unsubscribe, unmount می‌کند:

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

**ولی چه اتفاقی می‌افتد در حالی که کامپوننت روی صفحه است props `friend` تغییر کند** ? کامپوننت ما وضعیت آنلاین بودن دوست دیگری را نشان می‌دهد و این یک باگ است.همچنین ممکن است باعث کمبود حافظه و خرابی شود چرا که عمل  unsubscribe با آی‌دی دوست دیگری رخ می‌دهد.

در کامپوننت کلاس مانند برای کنترل این مورد از `componentDidUpdate` استفاده می‌کردیم:

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

فراموش کردن استفاده درست از `componentDidUpdate` منبع باگ در برنامه‌‌های ری‌اکت است.

حالا ورژنی از این کامپوننت که از Hookها استفاده می‌کند را تجسم کنید:

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

از این باگ رنج نمی‌برد. (ولی تغییری هم روی آن اعمال نکردیم.)

کد خاصی برای به‌روز رسانی نداریم زیرا `useEffect` به طور پیش فرض این کار را می‌کند. effectهای قبلی را پاک‌سازی می‌کند و effect بعدی را اعمال می‌کند. برای نشان دادن این، در اینجا توالی‌ای از فراخوانی subscribe و unsubscribe وجود دارد که کامپوننت میتواند در طول زمان تولید کند:

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

این رفتار ثباتی را به صورت پیش‌فرض تضمین می‌کند و از باگ‌هایی که به دلیل فراموش کردن منطق به‌روز رسانی بوجود می‌آید جلوگیری می‌کند.

### نکته: بهینه‌سازی عملکرد باپریدن از Effect {#tip-optimizing-performance-by-skipping-effects}

در برخی موارد، پاک‌سازی یا اعمال effect بعد از هر رندر ممکن است مشکل عملکردی ایجاد کند. در کامپوننت‌های کلاس مانند مشکل را با نوشتن مقایسه‌ای با `prevProps` یا `prevState` در `componentDidUpdate` حل می‌کنیم.

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```
این نیازمندی به اندازه‌ کافی معمول است که درون ساختار API `useEffect` ساخته شده است. می‌توانید به ری‌اکت بگویید اگر مقادیر خاصی بین رندر مجدد تغییری نداشته است از اعمال effect خوداری کن. برای این کار یک آرایه به عنوان آرگومان دوم به `useEffect` انتقال می‌دهیم.

```js{3}
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

در مثال بالا, `[count]` را به عنوان آرگومان دوم انتقال می‌دهیم. این به چه معنی‌ست?  اگر `count` برابر `5` باشد, و کامپوننت ما دوباره با مقدار `count` که برابر `5` است رندر شود, ری‌اکت `[5]` از رندر قبلی را با `[5]` از رندر بعدی مقایسه می‌کند. چون تمام موارد در آرایه مثل هم هستن(`5 === 5`), ری‌اکت از اعمال این effect خودداری می‌کند.  که این بهینه‌سازی ماست.

وقتی  با مقدار `count` که به `6` به‌روز رسانی شده رندر می‌کنیم، ری‌اکت مقدار آرایه `[5]`  در آیتم قبلی و  `[6]` در رندر بعدی را مقایسه می‌کند. این سری، ری‌اکت effect را مجدد اعمال می‌کند زیرا `5 !== 6`. اگر چند متغییر در آرایه باشد ری‌اکت effect را در صورتی که حتی یکی از آنها متفاوت باشد اعمال می‌کند.

که این شامل Effectهایی که فاز پاک‌سازی دارند نیز می‌باشد:

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

در آینده ممکن است، آرگومان دوم هنگام انتقالات ساخت (build) به شکل خودکار اضافه شود.

>توجه
>
>اگر از این بهینه سازی استفاده می‌کنید، مطمين شوید که **تمام مقادیر از scope کامپوننت (مثل props و state) که در طول زمان تغییر می‌کنند و توسط effect استفاده می‌شوند در آرایه حضور دارند**. در غیر این صورت، کد شما مقادیر کهنه رندر قبلی را reference خواهد داد. بیشتر بیاموزید که [چگونه میتوان با توابع کار کرد](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) و [چکار کنیم اگر آرایه اکثرا دچار تغییر شود](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often).
>
>اگر می‌خواهید که یک effect را فقط یکبار اجرا و پاکسازی کنید (در mount و unmount)، می‌توانید یک آرایه خالی (`[]`) به عنوان آرگومان دوم انتقال دهید. این به ری‌اکت اعلام می‌کند که effect شما هیچ یک از مقادیر state یا props وابسته نیست، بنابراین به اجرای مجدد نیازی ندارد. این به عنوان موردی خاص بررسی نمی‌شود -- به طور مستقیم از چگونگی عملکرد آرایه dependencies پیروی می کند.
>
>اگر آرایه خالی انتقال دهید(`[]`)، propها و state درون effect همیشه مقادیر اولیه خود را خواهند داشت. هنگامی که `[]` به عنوان آرگومان دوم انتقال می‌دهید از لحاظ فکری شبیه به مدل `componentDidMount` و `componentWillUnmount` است، معمولا [راه](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [حل](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) بهتری برای جلوگیری از رندر‌های مکرر وجود دارد. همچنین، فراموش نکنید که ری‌اکت `useEffect` را تا زمانی که مرورگر تصویر را مشخص کند به تاخیر می‌اندازد،پس کار از محکم کاری عیب نمی‌کند.
>
>ما توصیه می‌کنیم که از قوانین [`exhaustive-deps`](https://github.com/facebook/react/issues/14920)به عنوان بخشی از پکیج [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) استفاده کنید. اگر از dependencies درست استفاده نکنید به شما هشدار می‌دهد و راه حل را توصیه می‌کند.

## ‌گام‌های بعدی {#next-steps}

تبریک میگوییم! این صفحه طولانی بود،ولی خوشبختانه اکثر سوالات شما در مورد effectها پاسخ داده شد. شما هر دوی State Hook و Effect Hook را آموختید، و کارهای *زیادی* با ترکیب این دو می‌توانید انجام دهید. آنها اکثر موارد استفاده در کلاس‌ها را پوشش می‌دهند -- و اگر ندادند ، احتمالا [Hookهای اضافی](/docs/hooks-reference.html) مفید هستند.

همچنین می‌توانیم ببینیم که Hookها چگونه مشکلات مشخص شده در [Motivation](/docs/hooks-intro.html#motivation) را حل می‌کنند. دیدم که effectپاک‌سازی چگونه از دوباره کاری در `componentDidUpdate` و `componentWillUnmount` جلوگیری می‌کند. کدهای مرتبط را نزدیک هم قرار می‌دهد، و کمک می‌کند از باگ جلوگیری کنیم. همچنین دیدیم که چطور می‌توان effectها را با توجه به هدفشان از هم جدا کرد، که چیزیست که در کلاس‌ها اصلا نمی‌توانستیم انجام دهیم.


در این نقطه شاید برایتان این سوال پیش آمده باشد که Hookها چگونه کار می‌کنند. چگونه ری‌اکت میداند که کدام فراخوانی از `useState` به کدام متغییر state در هر رندر پاسخ می‌دهد. چگونه ری‌اکت در هر به‌روز رسانی effectقبلی و بعدی را "match up" می‌کند ؟ **در صفحه بعد به [قوانین Hookها](/docs/hooks-rules.html) خواهیم پرداخت-- زیرا برای کار کردن Hookها ضروریست.**
