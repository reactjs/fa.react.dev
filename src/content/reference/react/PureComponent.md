---
title: PureComponent
---

<Pitfall>

پیشنهاد می‌کنیم کامپوننت‌ها را به‌صورت تابع تعریف کنید، نه کلاس. [نحوهٔ مهاجرت را ببینید.](#alternatives)

</Pitfall>

<Intro>

`PureComponent` شبیه [`Component`](/reference/react/Component) است، اما برای پراپس و استیت یکسان از رندر مجدد می‌پرد. کامپوننت‌های کلاسی همچنان توسط ری‌اکت پشتیبانی می‌شوند، اما استفاده از آن‌ها در کدهای جدید را توصیه نمی‌کنیم.

```js
class Greeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `PureComponent` {/*purecomponent*/}

برای نادیده گرفتن رندر مجدد یک کامپوننت کلاسی با پراپس و استیت یکسان، به‌جای [`Component`](/reference/react/Component) از `PureComponent` ارث ببرید:

```js
import { PureComponent } from 'react';

class Greeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

`PureComponent` یک زیرکلاس از `Component` است و [تمام APIهای `Component`](/reference/react/Component#reference) را پشتیبانی می‌کند. ارث بردن از `PureComponent` معادل تعریف یک متد سفارشی [`shouldComponentUpdate`](/reference/react/Component#shouldcomponentupdate) است که پراپس و استیت را به‌صورت سطحی (shallow) مقایسه می‌کند.


[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

---

## استفاده {/*usage*/}

### نادیده گرفتن رندر مجدد غیرضروری برای کامپوننت‌های کلاسی {/*skipping-unnecessary-re-renders-for-class-components*/}

ری‌اکت معمولاً هر بار که والد یک کامپوننت دوباره رندر می‌شود، آن کامپوننت را دوباره رندر می‌کند. به‌عنوان یک بهینه‌سازی، می‌توانید کامپوننتی بسازید که ری‌اکت هنگامی که والد آن دوباره رندر می‌شود، آن را مجدداً رندر نکند، به‌شرطی که پراپس و استیت جدیدش با پراپس و استیت قدیمی یکسان باشد. [کامپوننت‌های کلاسی](/reference/react/Component) می‌توانند با ارث بردن از `PureComponent` به این رفتار opt-in کنند:

```js {1}
class Greeting extends PureComponent {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

یک کامپوننت ری‌اکت همواره باید دارای [منطق رندر خالص](/learn/keeping-components-pure) باشد. این یعنی باید در صورتی که پراپس، استیت و کانتکست آن تغییر نکرده‌اند، خروجی یکسانی بازگرداند. با استفاده از `PureComponent`، به ری‌اکت می‌گویید که کامپوننت شما با این نیازمندی مطابقت دارد، بنابراین تا زمانی که پراپس و استیت آن تغییر نکرده‌اند، ری‌اکت نیازی به رندر مجدد ندارد. با این حال، اگر کانتکستی که کامپوننت از آن استفاده می‌کند تغییر کند، کامپوننت شما همچنان مجدداً رندر می‌شود.

در این نمونه، توجه کنید که کامپوننت `Greeting` هر بار که `name` تغییر می‌کند مجدداً رندر می‌شود (زیرا این یکی از پراپس‌های آن است)، اما هنگامی که `address` تغییر می‌کند، رندر مجدد نمی‌شود (زیرا به‌عنوان پراپس به `Greeting` ارسال نمی‌شود):

<Sandpack>

```js
import { PureComponent, useState } from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{this.props.name && ', '}{this.props.name}!</h3>;
  }
}

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}
```

```css
label {
  display: block;
  margin-bottom: 16px;
}
```

</Sandpack>

<Pitfall>

پیشنهاد می‌کنیم کامپوننت‌ها را به‌صورت تابع تعریف کنید، نه کلاس. [نحوهٔ مهاجرت را ببینید.](#alternatives)

</Pitfall>

---

## جایگزین‌ها {/*alternatives*/}

### مهاجرت از یک کامپوننت کلاسی `PureComponent` به یک تابع {/*migrating-from-a-purecomponent-class-component-to-a-function*/}

پیشنهاد می‌کنیم در کدهای جدید به‌جای [کامپوننت‌های کلاسی](/reference/react/Component) از کامپوننت‌های تابعی استفاده کنید. اگر کامپوننت‌های کلاسی موجودی دارید که از `PureComponent` استفاده می‌کنند، در اینجا نحوهٔ تبدیل آن‌ها آمده است. این کد اصلی است:

<Sandpack>

```js
import { PureComponent, useState } from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3>Hello{this.props.name && ', '}{this.props.name}!</h3>;
  }
}

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}
```

```css
label {
  display: block;
  margin-bottom: 16px;
}
```

</Sandpack>

وقتی [این کامپوننت را از کلاس به تابع تبدیل می‌کنید،](/reference/react/Component#alternatives) آن را در [`memo`](/reference/react/memo) بپیچید:

<Sandpack>

```js
import { memo, useState } from 'react';

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}
```

```css
label {
  display: block;
  margin-bottom: 16px;
}
```

</Sandpack>

<Note>

برخلاف `PureComponent`، [`memo`](/reference/react/memo) استیت جدید و قدیمی را مقایسه نمی‌کند. در کامپوننت‌های تابعی، صدا زدن [تابع `set`](/reference/react/useState#setstate) با همان استیت [به‌طور پیش‌فرض از رندر مجدد جلوگیری می‌کند،](/reference/react/memo#updating-a-memoized-component-using-state) حتی بدون `memo`.

</Note>
