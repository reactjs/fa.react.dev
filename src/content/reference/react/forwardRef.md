---
title: forwardRef
---

<Deprecated>

در ری‌اکت ۱۹، `forwardRef` دیگر ضروری نیست. به‌جای آن `ref` را به‌عنوان پراپ پاس بدهید.

`forwardRef` در یک نسخهٔ آینده منسوخ خواهد شد. بیشتر [اینجا](/blog/2024/04/25/react-19#ref-as-a-prop) بدانید.

</Deprecated>

<Intro>

`forwardRef` به کامپوننت شما اجازه می‌دهد یک نود DOM را با یک [رفرنس](/learn/manipulating-the-dom-with-refs) به کامپوننت والد آشکار کند.

```js
const SomeComponent = forwardRef(render)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `forwardRef(render)` {/*forwardref*/}

برای آنکه کامپوننت شما یک رفرنس دریافت کرده و آن را به یک کامپوننت فرزند فوروارد کند، `forwardRef()` را فراخوانی کنید:

```js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `render`: تابع رندر برای کامپوننت شما. ری‌اکت این تابع را با پراپس و `ref`ای که کامپوننت شما از والدش دریافت کرده فراخوانی می‌کند. JSXای که برمی‌گردانید خروجی کامپوننت شما خواهد بود.

#### مقادیر بازگشتی {/*returns*/}

`forwardRef` یک کامپوننت ری‌اکت برمی‌گرداند که می‌توانید آن را در JSX رندر کنید. برخلاف کامپوننت‌های ری‌اکتی که به‌صورت توابع ساده تعریف می‌شوند، کامپوننتی که توسط `forwardRef` برگردانده می‌شود همچنین می‌تواند یک پراپ `ref` دریافت کند.

#### موارد احتیاط {/*caveats*/}

* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **تابع رندر شما را دو بار فراخوانی می‌کند** تا [به شما کمک کند ناخالصی‌های تصادفی را پیدا کنید.](/reference/react/useState#my-initializer-or-updater-function-runs-twice) این رفتار فقط مخصوص محیط توسعه است و بر production تأثیری ندارد. اگر تابع رندر شما خالص باشد (که باید باشد)، این نباید بر منطق کامپوننت شما تأثیر بگذارد. نتیجهٔ یکی از فراخوانی‌ها نادیده گرفته خواهد شد.


---

### تابع `render` {/*render-function*/}

`forwardRef` یک تابع رندر را به‌عنوان آرگومان می‌پذیرد. ری‌اکت این تابع را با `props` و `ref` فراخوانی می‌کند:

```js
const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <label>
      {props.label}
      <input ref={ref} />
    </label>
  );
});
```

#### پارامترها {/*render-parameters*/}

* `props`: پراپس‌هایی که توسط کامپوننت والد پاس داده شده‌اند.

* `ref`:  ویژگی `ref` که توسط کامپوننت والد پاس داده شده است. `ref` می‌تواند یک شیء یا یک تابع باشد. اگر کامپوننت والد رفرنسی پاس نداده باشد، `null` خواهد بود. باید `ref`ای که دریافت می‌کنید را یا به کامپوننت دیگری پاس بدهید، یا به [`useImperativeHandle`](/reference/react/useImperativeHandle) پاس بدهید.

#### مقادیر بازگشتی {/*render-returns*/}

`forwardRef` یک کامپوننت ری‌اکت برمی‌گرداند که می‌توانید آن را در JSX رندر کنید. برخلاف کامپوننت‌های ری‌اکتی که به‌صورت توابع ساده تعریف می‌شوند، کامپوننتی که توسط `forwardRef` برگردانده می‌شود می‌تواند یک پراپ `ref` بپذیرد.

---

## استفاده {/*usage*/}

### آشکار کردن یک نود DOM به کامپوننت والد {/*exposing-a-dom-node-to-the-parent-component*/}

به‌طور پیش‌فرض، نودهای DOM هر کامپوننت خصوصی هستند. با این حال، گاهی آشکار کردن یک نود DOM به والد مفید است — برای مثال، برای اجازه دادن به فوکوس کردن آن. برای این کار، تعریف کامپوننت خود را در `forwardRef()` بپیچید:

```js {3,11}
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} />
    </label>
  );
});
```

شما یک <CodeStep step={1}>رفرنس</CodeStep> را به‌عنوان آرگومان دوم پس از پراپس دریافت خواهید کرد. آن را به نود DOM که می‌خواهید آشکار کنید پاس بدهید:

```js {8} [[1, 3, "ref"], [1, 8, "ref", 30]]
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});
```

این به کامپوننت والد `Form` اجازه می‌دهد به <CodeStep step={2}>نود DOM `<input>`</CodeStep> آشکار شده توسط `MyInput` دسترسی پیدا کند:

```js [[1, 2, "ref"], [1, 10, "ref", 41], [2, 5, "ref.current"]]
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

این کامپوننت `Form` [یک رفرنس را](/reference/react/useRef#manipulating-the-dom-with-a-ref) به `MyInput` پاس می‌دهد. کامپوننت `MyInput` آن رفرنس را به تگ مرورگری `<input>` *فوروارد* می‌کند. در نتیجه، کامپوننت `Form` می‌تواند به آن نود DOM `<input>` دسترسی پیدا کرده و [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) را روی آن فراخوانی کند.

در نظر داشته باشید که آشکار کردن یک رفرنس به نود DOM درون کامپوننت شما، تغییر داخلی‌های کامپوننت شما را در آینده سخت‌تر می‌کند. شما معمولاً نودهای DOM را از کامپوننت‌های پایین‌سطحی قابل‌استفاده‌مجدد مانند دکمه‌ها یا ورودی‌های متنی آشکار می‌کنید، اما این کار را برای کامپوننت‌های سطح اپلیکیشن مانند یک آواتار یا یک نظر انجام نمی‌دهید.

<Recipes titleText="نمونه‌هایی از فوروارد کردن یک رفرنس">

#### فوکوس کردن یک ورودی متنی {/*focusing-a-text-input*/}

کلیک روی دکمه، ورودی را فوکوس می‌کند. کامپوننت `Form` یک رفرنس تعریف می‌کند و آن را به کامپوننت `MyInput` پاس می‌دهد. کامپوننت `MyInput` آن رفرنس را به `<input>` مرورگر فوروارد می‌کند. این به کامپوننت `Form` اجازه می‌دهد `<input>` را فوکوس کند.

<Sandpack>

```js
import { useRef } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```js src/MyInput.js
import { forwardRef } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default MyInput;
```

```css
input {
  margin: 5px;
}
```

</Sandpack>

<Solution />

#### پخش و توقف یک ویدئو {/*playing-and-pausing-a-video*/}

کلیک روی دکمه [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) و [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) را روی یک نود DOM `<video>` فراخوانی می‌کند. کامپوننت `App` یک رفرنس تعریف می‌کند و آن را به کامپوننت `MyVideoPlayer` پاس می‌دهد. کامپوننت `MyVideoPlayer` آن رفرنس را به نود مرورگری `<video>` فوروارد می‌کند. این به کامپوننت `App` اجازه می‌دهد `<video>` را پخش و متوقف کند.

<Sandpack>

```js
import { useRef } from 'react';
import MyVideoPlayer from './MyVideoPlayer.js';

export default function App() {
  const ref = useRef(null);
  return (
    <>
      <button onClick={() => ref.current.play()}>
        Play
      </button>
      <button onClick={() => ref.current.pause()}>
        Pause
      </button>
      <br />
      <MyVideoPlayer
        ref={ref}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
        width="250"
      />
    </>
  );
}
```

```js src/MyVideoPlayer.js
import { forwardRef } from 'react';

const VideoPlayer = forwardRef(function VideoPlayer({ src, type, width }, ref) {
  return (
    <video width={width} ref={ref}>
      <source
        src={src}
        type={type}
      />
    </video>
  );
});

export default VideoPlayer;
```

```css
button { margin-bottom: 10px; margin-right: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### فوروارد کردن یک رفرنس از طریق چندین کامپوننت {/*forwarding-a-ref-through-multiple-components*/}

به‌جای فوروارد کردن یک `ref` به یک نود DOM، می‌توانید آن را به کامپوننت خودتان مانند `MyInput` فوروارد کنید:

```js {1,5}
const FormField = forwardRef(function FormField(props, ref) {
  // ...
  return (
    <>
      <MyInput ref={ref} />
      ...
    </>
  );
});
```

اگر آن کامپوننت `MyInput` یک رفرنس را به `<input>` خود فوروارد کند، یک رفرنس به `FormField` آن `<input>` را به شما خواهد داد:

```js {2,5,10}
function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label="Enter your name:" ref={ref} isRequired={true} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

کامپوننت `Form` یک رفرنس تعریف می‌کند و آن را به `FormField` پاس می‌دهد. کامپوننت `FormField` آن رفرنس را به `MyInput` فوروارد می‌کند، که آن را به یک نود DOM مرورگری `<input>` فوروارد می‌کند. به این ترتیب `Form` به آن نود DOM دسترسی پیدا می‌کند.


<Sandpack>

```js
import { useRef } from 'react';
import FormField from './FormField.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form>
      <FormField label="Enter your name:" ref={ref} isRequired={true} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```js src/FormField.js
import { forwardRef, useState } from 'react';
import MyInput from './MyInput.js';

const FormField = forwardRef(function FormField({ label, isRequired }, ref) {
  const [value, setValue] = useState('');
  return (
    <>
      <MyInput
        ref={ref}
        label={label}
        value={value}
        onChange={e => setValue(e.target.value)} 
      />
      {(isRequired && value === '') &&
        <i>Required</i>
      }
    </>
  );
});

export default FormField;
```


```js src/MyInput.js
import { forwardRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default MyInput;
```

```css
input, button {
  margin: 5px;
}
```

</Sandpack>

---

### آشکار کردن یک imperative handle به جای یک نود DOM {/*exposing-an-imperative-handle-instead-of-a-dom-node*/}

به‌جای آشکار کردن کل نود DOM، می‌توانید یک شیء سفارشی، به نام *imperative handle*، با مجموعه‌ای محدودتر از متدها آشکار کنید. برای انجام این کار، باید یک رفرنس جداگانه برای نگه‌داشتن نود DOM تعریف کنید:

```js {2,6}
const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  // ...

  return <input {...props} ref={inputRef} />;
});
```

`ref`ای که دریافت کرده‌اید را به [`useImperativeHandle`](/reference/react/useImperativeHandle) پاس بدهید و مقداری را که می‌خواهید به `ref` آشکار کنید تعیین کنید:

```js {6-15}
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});
```

اگر کامپوننتی رفرنسی به `MyInput` بگیرد، تنها شیء `{ focus, scrollIntoView }` شما را به‌جای نود DOM دریافت خواهد کرد. این به شما اجازه می‌دهد اطلاعاتی که دربارهٔ نود DOM خود آشکار می‌کنید را به حداقل برسانید.

<Sandpack>

```js
import { useRef } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```js src/MyInput.js
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
});

export default MyInput;
```

```css
input {
  margin: 5px;
}
```

</Sandpack>

[دربارهٔ استفاده از imperative handleها بیشتر بخوانید.](/reference/react/useImperativeHandle)

<Pitfall>

**از رفرنس‌ها زیاده‌روی نکنید.** باید فقط از رفرنس‌ها برای رفتارهای *imperative* استفاده کنید که نمی‌توانید آن‌ها را به‌صورت پراپس بیان کنید: برای مثال، اسکرول به یک نود، فوکوس یک نود، راه‌اندازی یک انیمیشن، انتخاب متن، و غیره.

**اگر می‌توانید چیزی را به‌صورت یک پراپ بیان کنید، نباید از رفرنس استفاده کنید.** برای مثال، به‌جای آشکار کردن یک imperative handle مانند `{ open, close }` از یک کامپوننت `Modal`، بهتر است `isOpen` را به‌عنوان یک پراپ مانند `<Modal isOpen={isOpen} />` بپذیرید. [افکت‌ها](/learn/synchronizing-with-effects) می‌توانند به شما کمک کنند رفتارهای imperative را از طریق پراپس آشکار کنید.

</Pitfall>

---

## رفع اشکال {/*troubleshooting*/}

### کامپوننت من در `forwardRef` پیچیده شده، اما رفرنس به آن همیشه `null` است {/*my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null*/}

این معمولاً به این معناست که فراموش کرده‌اید از `ref`ای که دریافت کرده‌اید واقعاً استفاده کنید.

برای مثال، این کامپوننت با `ref` خود کاری انجام نمی‌دهد:

```js {1}
const MyInput = forwardRef(function MyInput({ label }, ref) {
  return (
    <label>
      {label}
      <input />
    </label>
  );
});
```

برای رفع این مشکل، `ref` را به یک نود DOM یا کامپوننت دیگری که می‌تواند رفرنس را بپذیرد پاس بدهید:

```js {1,5}
const MyInput = forwardRef(function MyInput({ label }, ref) {
  return (
    <label>
      {label}
      <input ref={ref} />
    </label>
  );
});
```

رفرنس به `MyInput` همچنین می‌تواند `null` باشد اگر برخی از منطق شرطی باشد:

```js {1,5}
const MyInput = forwardRef(function MyInput({ label, showInput }, ref) {
  return (
    <label>
      {label}
      {showInput && <input ref={ref} />}
    </label>
  );
});
```

اگر `showInput` مقدار `false` باشد، آنگاه رفرنس به هیچ نودی فوروارد نخواهد شد، و یک رفرنس به `MyInput` خالی باقی می‌ماند. این به‌ویژه اگر شرط درون کامپوننت دیگری پنهان شده باشد، به‌راحتی از قلم می‌افتد، مانند `Panel` در این مثال:

```js {5,7}
const MyInput = forwardRef(function MyInput({ label, showInput }, ref) {
  return (
    <label>
      {label}
      <Panel isExpanded={showInput}>
        <input ref={ref} />
      </Panel>
    </label>
  );
});
```
