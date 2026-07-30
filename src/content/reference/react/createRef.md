---
title: createRef
---

<Pitfall>

`createRef` بیشتر برای [کامپوننت‌های کلاسی](/reference/react/Component) استفاده می‌شود. کامپوننت‌های تابعی معمولاً به‌جای آن از [`useRef`](/reference/react/useRef) استفاده می‌کنند.

</Pitfall>

<Intro>

`createRef` یک آبجکت [رفرنس](/learn/referencing-values-with-refs) می‌سازد که می‌تواند هر مقدار دلخواهی را در خود نگه دارد.

```js
class MyInput extends Component {
  inputRef = createRef();
  // ...
}
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `createRef()` {/*createref*/}

`createRef` را فراخوانی کنید تا یک [رفرنس](/learn/referencing-values-with-refs) درون یک [کامپوننت کلاسی](/reference/react/Component) تعریف کنید.

```js
import { createRef, Component } from 'react';

class MyComponent extends Component {
  intervalRef = createRef();
  inputRef = createRef();
  // ...
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

`createRef` هیچ پارامتری نمی‌گیرد.

#### مقادیر بازگشتی {/*returns*/}

`createRef` یک آبجکت با یک ویژگی واحد باز می‌گرداند:

* `current`: در ابتدا، روی `null` تنظیم می‌شود. بعداً می‌توانید آن را به چیز دیگری تنظیم کنید. اگر آبجکت رفرنس را به‌عنوان ویژگی `ref` به یک نُد JSX به ری‌اکت ارسال کنید، ری‌اکت ویژگی `current` آن را تنظیم می‌کند.

#### نکات {/*caveats*/}

* `createRef` همیشه یک آبجکت *متفاوتی* باز می‌گرداند. این معادل است با اینکه خودتان `{ current: null }` را بنویسید.
* در یک کامپوننت تابعی، احتمالاً به‌جای آن [`useRef`](/reference/react/useRef) را می‌خواهید که همیشه یک آبجکت یکسان را باز می‌گرداند.
* `const ref = useRef()` معادل `const [ref, _] = useState(() => createRef(null))` است.

---

## استفاده {/*usage*/}

### تعریف یک رفرنس در یک کامپوننت کلاسی {/*declaring-a-ref-in-a-class-component*/}

برای تعریف یک رفرنس درون یک [کامپوننت کلاسی،](/reference/react/Component) `createRef` را فراخوانی کنید و نتیجهٔ آن را به یک فیلد کلاس اختصاص دهید:

```js {4}
import { Component, createRef } from 'react';

class Form extends Component {
  inputRef = createRef();

  // ...
}
```

اکنون اگر `ref={this.inputRef}` را به یک `<input>` در JSX خود ارسال کنید، ری‌اکت `this.inputRef.current` را با نُد DOM ورودی پر می‌کند. به‌عنوان مثال، در اینجا نحوهٔ ساخت دکمه‌ای که روی ورودی تمرکز (focus) می‌کند آمده است:

<Sandpack>

```js
import { Component, createRef } from 'react';

export default class Form extends Component {
  inputRef = createRef();

  handleClick = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>
          Focus the input
        </button>
      </>
    );
  }
}
```

</Sandpack>

<Pitfall>

`createRef` بیشتر برای [کامپوننت‌های کلاسی](/reference/react/Component) استفاده می‌شود. کامپوننت‌های تابعی معمولاً به‌جای آن از [`useRef`](/reference/react/useRef) استفاده می‌کنند.

</Pitfall>

---

## جایگزین‌ها {/*alternatives*/}

### مهاجرت از یک کلاس با `createRef` به یک تابع با `useRef` {/*migrating-from-a-class-with-createref-to-a-function-with-useref*/}

پیشنهاد می‌کنیم در کدهای جدید به‌جای [کامپوننت‌های کلاسی](/reference/react/Component) از کامپوننت‌های تابعی استفاده کنید. اگر کامپوننت‌های کلاسی موجودی دارید که از `createRef` استفاده می‌کنند، در اینجا نحوهٔ تبدیل آن‌ها آمده است. این کد اصلی است:

<Sandpack>

```js
import { Component, createRef } from 'react';

export default class Form extends Component {
  inputRef = createRef();

  handleClick = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <>
        <input ref={this.inputRef} />
        <button onClick={this.handleClick}>
          Focus the input
        </button>
      </>
    );
  }
}
```

</Sandpack>

وقتی [این کامپوننت را از کلاس به تابع تبدیل می‌کنید،](/reference/react/Component#alternatives) فراخوانی‌های `createRef` را با فراخوانی‌های [`useRef`](/reference/react/useRef) جایگزین کنید:

<Sandpack>

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>
