---
title: 'دستکاری DOM با رفرنس‌ها'
---

<Intro>

ری‌اکت به‌طور خودکار [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) را به‌روزرسانی می‌کند تا با خروجی رندر شما مطابقت داشته باشد، بنابراین کامپوننت‌های شما اغلب نیازی به دستکاری آن نخواهند داشت. با این حال، گاهی ممکن است نیاز به دسترسی به عناصر DOM مدیریت‌شده توسط ری‌اکت داشته باشید — مثلاً برای فوکوس کردن یک نود، اسکرول کردن به آن، یا اندازه‌گیری اندازه و موقعیتش. هیچ راه داخلی برای انجام این کارها در ری‌اکت وجود ندارد، بنابراین برای دسترسی به نود DOM به یک *رفرنس* نیاز دارید.

</Intro>

<YouWillLearn>

- چگونه با ویژگی `ref` به یک نود DOM مدیریت‌شده توسط ری‌اکت دسترسی پیدا کنید
- ویژگی JSX به‌نام `ref` چگونه با هوک `useRef` مرتبط است
- چگونه به نود DOM یک کامپوننت دیگر دسترسی پیدا کنید
- در چه مواردی تغییر DOM مدیریت‌شده توسط ری‌اکت بی‌خطر است

</YouWillLearn>

## گرفتن رفرنس به نود {/*getting-a-ref-to-the-node*/}

برای دسترسی به یک نود DOM مدیریت‌شده توسط ری‌اکت، ابتدا هوک `useRef` را ایمپورت کنید:

```js
import { useRef } from 'react';
```

سپس از آن برای تعریف یک رفرنس درون کامپوننت خود استفاده کنید:

```js
const myRef = useRef(null);
```

در نهایت، رفرنس خود را به‌عنوان ویژگی `ref` به تگ JSXی که می‌خواهید نود DOM آن را بگیرید، پاس دهید:

```js
<div ref={myRef}>
```

هوک `useRef` یک شیء با یک ویژگی به‌نام `current` برمی‌گرداند. در ابتدا، `myRef.current` برابر `null` خواهد بود. وقتی ری‌اکت یک نود DOM برای این `<div>` می‌سازد، رفرنسی به این نود را در `myRef.current` قرار می‌دهد. سپس می‌توانید از [مدیرکننده‌های رویداد](/learn/responding-to-events) خود به این نود DOM دسترسی داشته باشید و از [APIهای داخلی مرورگر](https://developer.mozilla.org/docs/Web/API/Element) تعریف‌شده روی آن استفاده کنید.

```js
// You can use any browser APIs, for example:
myRef.current.scrollIntoView();
```

### مثال: فوکوس کردن یک ورودی متنی {/*example-focusing-a-text-input*/}

در این مثال، کلیک روی دکمه، ورودی را فوکوس می‌کند:

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

برای پیاده‌سازی این کار:

1. `inputRef` را با هوک `useRef` تعریف کنید.
2. آن را به‌صورت `<input ref={inputRef}>` پاس دهید. این به ری‌اکت می‌گوید که **این نود DOM مربوط به `<input>` را در `inputRef.current` قرار دهد.**
3. در تابع `handleClick`، نود DOM ورودی را از `inputRef.current` بخوانید و [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) را با `inputRef.current.focus()` روی آن فراخوانی کنید.
4. مدیرکننده رویداد `handleClick` را با `onClick` به `<button>` پاس دهید.

با این‌که دستکاری DOM رایج‌ترین مورد استفاده برای رفرنس‌هاست، هوک `useRef` می‌تواند برای ذخیره چیزهای دیگر خارج از ری‌اکت، مانند ID تایمرها نیز استفاده شود. مانند استیت، رفرنس‌ها بین رندرها باقی می‌مانند. رفرنس‌ها مانند متغیرهای استیت هستند، با این تفاوت که تنظیم آن‌ها باعث رندر مجدد نمی‌شود. درباره رفرنس‌ها در [ارجاع به مقادیر با رفرنس‌ها.](/learn/referencing-values-with-refs) بیشتر بخوانید.

### مثال: اسکرول به یک عنصر {/*example-scrolling-to-an-element*/}

می‌توانید بیش از یک رفرنس در یک کامپوننت داشته باشید. در این مثال، یک کاروسل سه‌تصویری وجود دارد. هر دکمه با فراخوانی متد [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) مرورگر روی نود DOM مربوطه، یک تصویر را در مرکز قرار می‌دهد:

<Sandpack>

```js
import { useRef } from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <>
      <nav>
        <button onClick={handleScrollToFirstCat}>
          Neo
        </button>
        <button onClick={handleScrollToSecondCat}>
          Millie
        </button>
        <button onClick={handleScrollToThirdCat}>
          Bella
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placecats.com/neo/300/200"
              alt="Neo"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/millie/200/200"
              alt="Millie"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placecats.com/bella/199/200"
              alt="Bella"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

<DeepDive>

#### نحوهٔ مدیریت یک لیست از رفرنس‌ها با استفاده از کالبک رفرنس {/*how-to-manage-a-list-of-refs-using-a-ref-callback*/}

در مثال‌های بالا، تعداد رفرنس‌ها از پیش تعریف شده است. با این حال، گاهی ممکن است برای هر آیتم لیست به یک رفرنس نیاز داشته باشید و ندانید چند آیتم خواهید داشت. چیزی شبیه این **کار نمی‌کند**:

```js
<ul>
  {items.map((item) => {
    // Doesn't work!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```

دلیل این است که **هوک‌ها فقط باید در بالاترین سطح کامپوننت شما فراخوانی شوند.** نمی‌توانید `useRef` را در یک حلقه، در یک شرط، یا درون فراخوانی `map()` استفاده کنید.

یک راه دور زدن این مشکل این است که یک رفرنس واحد به عنصر والدشان بگیرید، و سپس از متدهای دستکاری DOM مانند [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) برای «یافتن» نودهای فرزند منفرد از آن استفاده کنید. با این حال، این روش شکننده است و اگر ساختار DOM شما تغییر کند، ممکن است خراب شود.

راه‌حل دیگر این است که **یک تابع به ویژگی `ref` پاس دهید.** این کار [کالبک رفرنس](/reference/react-dom/components/common#ref-callback) نامیده می‌شود. ری‌اکت کالبک رفرنس شما را با نود DOM زمانی که باید رفرنس را تنظیم کند فراخوانی می‌کند، و تابع پاک‌سازی برگشتی از کالبک را زمانی که باید آن را پاک کند فراخوانی می‌کند. این به شما اجازه می‌دهد آرایه یا یک [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) خودتان را نگه دارید، و با شاخص یا نوعی ID به هر رفرنس دسترسی داشته باشید.

این مثال نشان می‌دهد چگونه می‌توانید از این رویکرد برای اسکرول به یک نود دلخواه در یک لیست طولانی استفاده کنید:

<Sandpack>

```js
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[8])}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                map.set(cat, node);

                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat.imageUrl} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catCount = 10;
  const catList = new Array(catCount)
  for (let i = 0; i < catCount; i++) {
    let imageUrl = '';
    if (i < 5) {
      imageUrl = "https://placecats.com/neo/320/240";
    } else if (i < 8) {
      imageUrl = "https://placecats.com/millie/320/240";
    } else {
      imageUrl = "https://placecats.com/bella/320/240";
    }
    catList[i] = {
      id: i,
      imageUrl,
    };
  }
  return catList;
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

در این مثال، `itemsRef` یک نود DOM منفرد نگه نمی‌دارد. در عوض، یک [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) از ID آیتم به نود DOM را نگه می‌دارد. ([رفرنس‌ها می‌توانند هر مقداری را نگه دارند!](/learn/referencing-values-with-refs)) [کالبک `ref`](/reference/react-dom/components/common#ref-callback) روی هر آیتم لیست، از به‌روزرسانی Map مراقبت می‌کند:

```js
<li
  key={cat.id}
  ref={node => {
    const map = getMap();
    // Add to the Map
    map.set(cat, node);

    return () => {
      // Remove from the Map
      map.delete(cat);
    };
  }}
>
```

این به شما اجازه می‌دهد بعداً نودهای DOM منفرد را از Map بخوانید.

<Note>

وقتی حالت سخت‌گیرانه (Strict Mode) فعال است، کالبک‌های رفرنس در محیط توسعه دو بار اجرا می‌شوند.

دربارهٔ [نحوه کمک این موضوع به یافتن باگ‌ها](/reference/react/StrictMode#fixing-bugs-found-by-re-running-ref-callbacks-in-development) در کالبک رفرنس‌ها بیشتر بخوانید.

</Note>

</DeepDive>

## دسترسی به نودهای DOM کامپوننت دیگر {/*accessing-another-components-dom-nodes*/}

<Pitfall>
رفرنس‌ها یک راه فرار (escape hatch) هستند. دستکاری دستی نودهای DOM کامپوننت _دیگر_ می‌تواند کد شما را شکننده کند.
</Pitfall>

می‌توانید رفرنس‌ها را از کامپوننت والد به کامپوننت‌های فرزند [دقیقاً مانند هر پراپس دیگر](/learn/passing-props-to-a-component) پاس دهید.

```js {3-4,9}
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

function MyForm() {
  const inputRef = useRef(null);
  return <MyInput ref={inputRef} />
}
```

در مثال بالا، یک رفرنس در کامپوننت والد، `MyForm`، ایجاد شده و به کامپوننت فرزند، `MyInput`، پاس داده می‌شود. سپس `MyInput` این رفرنس را به `<input>` پاس می‌دهد. چون `<input>` یک [کامپوننت داخلی](/reference/react-dom/components/common) است، ری‌اکت ویژگی `.current` رفرنس را به عنصر DOM `<input>` تنظیم می‌کند.

`inputRef` ایجادشده در `MyForm` اکنون به عنصر DOM `<input>` برگردانده‌شده توسط `MyInput` اشاره می‌کند. یک مدیرکننده کلیک ایجادشده در `MyForm` می‌تواند به `inputRef` دسترسی داشته باشد و `focus()` را برای فوکوس روی `<input>` فراخوانی کند.

<Sandpack>

```js
import { useRef } from 'react';

function MyInput({ ref }) {
  return <input ref={ref} />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<DeepDive>

#### نمایان کردن زیرمجموعه‌ای از API با یک هندل دستوری {/*exposing-a-subset-of-the-api-with-an-imperative-handle*/}

در مثال بالا، رفرنس پاس‌داده‌شده به `MyInput` به عنصر ورودی اصلی DOM منتقل می‌شود. این به کامپوننت والد اجازه می‌دهد `focus()` را روی آن فراخوانی کند. با این حال، این به کامپوننت والد اجازه می‌دهد کار دیگری هم بکند — مثلاً سبک‌های CSS آن را تغییر دهد. در موارد نادر، ممکن است بخواهید قابلیت‌های نمایان‌شده را محدود کنید. می‌توانید این کار را با [`useImperativeHandle`](/reference/react/useImperativeHandle) انجام دهید:

<Sandpack>

```js
import { useRef, useImperativeHandle } from "react";

function MyInput({ ref }) {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input ref={realInputRef} />;
};

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}
```

</Sandpack>

اینجا، `realInputRef` درون `MyInput` نود واقعی DOM ورودی را نگه می‌دارد. با این حال، [`useImperativeHandle`](/reference/react/useImperativeHandle) به ری‌اکت دستور می‌دهد شیء خاص خودتان را به‌عنوان مقدار رفرنس به کامپوننت والد ارائه کند. بنابراین `inputRef.current` درون کامپوننت `Form` فقط متد `focus` را خواهد داشت. در این حالت، «هندل» رفرنس، نود DOM نیست، بلکه شیء سفارشی است که درون فراخوانی [`useImperativeHandle`](/reference/react/useImperativeHandle) ایجاد می‌کنید.

</DeepDive>

## وقتی ری‌اکت رفرنس‌ها را متصل می‌کند {/*when-react-attaches-the-refs*/}

در ری‌اکت، هر به‌روزرسانی به [دو مرحله](/learn/render-and-commit#step-3-react-commits-changes-to-the-dom) تقسیم می‌شود:

* در طول **رندر،** ری‌اکت کامپوننت‌های شما را فراخوانی می‌کند تا بفهمد چه چیزی باید روی صفحه باشد.
* در طول **کامیت،** ری‌اکت تغییرات را روی DOM اعمال می‌کند.

به‌طور کلی، شما [نمی‌خواهید](/learn/referencing-values-with-refs#best-practices-for-refs) در طول رندر به رفرنس‌ها دسترسی داشته باشید. این برای رفرنس‌هایی که نودهای DOM را نگه می‌دارند نیز صدق می‌کند. در طول رندر اول، نودهای DOM هنوز ایجاد نشده‌اند، بنابراین `ref.current` برابر `null` خواهد بود. و در طول رندر به‌روزرسانی‌ها، نودهای DOM هنوز به‌روزرسانی نشده‌اند. بنابراین برای خواندن آن‌ها زود است.

ری‌اکت `ref.current` را در طول کامیت تنظیم می‌کند. قبل از به‌روزرسانی DOM، ری‌اکت مقادیر `ref.current` تحت‌تأثیر را به `null` تنظیم می‌کند. پس از به‌روزرسانی DOM، ری‌اکت بلافاصله آن‌ها را به نودهای DOM مربوطه تنظیم می‌کند.

**معمولاً از مدیرکننده‌های رویداد به رفرنس‌ها دسترسی خواهید داشت.** اگر می‌خواهید کاری با یک رفرنس انجام دهید، اما رویداد خاصی برای انجام آن وجود ندارد، ممکن است به یک افکت نیاز داشته باشید. درباره افکت‌ها در صفحات بعدی بحث خواهیم کرد.

<DeepDive>

#### فلاش هم‌زمان به‌روزرسانی‌های استیت با flushSync {/*flushing-state-updates-synchronously-with-flush-sync*/}

کدی مانند این را در نظر بگیرید که یک todo جدید اضافه می‌کند و صفحه را به آخرین فرزند لیست اسکرول می‌کند. توجه کنید که چگونه، به‌نوعی، همیشه به todoیی اسکرول می‌کند که *دقیقاً قبل از* آخرین مورد اضافه‌شده بوده است:

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```

</Sandpack>

مشکل در این دو خط است:

```js
setTodos([ ...todos, newTodo]);
listRef.current.lastChild.scrollIntoView();
```

در ری‌اکت، [به‌روزرسانی‌های استیت در صف قرار می‌گیرند.](/learn/queueing-a-series-of-state-updates) معمولاً این همان چیزی است که می‌خواهید. با این حال، در اینجا باعث مشکلی می‌شود زیرا `setTodos` بلافاصله DOM را به‌روزرسانی نمی‌کند. بنابراین زمانی که لیست را به آخرین عنصرش اسکرول می‌کنید، todo هنوز اضافه نشده است. به همین دلیل اسکرول همیشه یک آیتم «عقب‌تر» می‌ماند.

برای رفع این مشکل، می‌توانید ری‌اکت را مجبور کنید که DOM را به‌صورت هم‌زمان به‌روزرسانی (یا «فلاش») کند. برای این کار، `flushSync` را از `react-dom` ایمپورت کنید و **به‌روزرسانی استیت** را درون یک فراخوانی `flushSync` بپیچید:

```js
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
listRef.current.lastChild.scrollIntoView();
```

این به ری‌اکت دستور می‌دهد که بلافاصله پس از اجرای کد پیچیده‌شده در `flushSync`، DOM را به‌صورت هم‌زمان به‌روزرسانی کند. در نتیجه، آخرین todo تا زمانی که سعی می‌کنید به آن اسکرول کنید، در DOM خواهد بود:

<Sandpack>

```js
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };
    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}
```

</Sandpack>

</DeepDive>

## بهترین شیوه‌ها برای دستکاری DOM با رفرنس‌ها {/*best-practices-for-dom-manipulation-with-refs*/}

رفرنس‌ها یک راه فرار هستند. فقط زمانی باید از آن‌ها استفاده کنید که مجبورید «از ری‌اکت خارج شوید». مثال‌های رایج آن شامل مدیریت فوکوس، موقعیت اسکرول، یا فراخوانی APIهای مرورگری است که ری‌اکت آن‌ها را نمایان نمی‌کند.

اگر به اقدامات غیرمخرب مانند فوکوس کردن و اسکرول پایبند باشید، نباید با هیچ مشکلی مواجه شوید. با این حال، اگر سعی کنید DOM را به‌صورت دستی **تغییر دهید**، ممکن است با تغییراتی که ری‌اکت در حال اعمال آن‌ها است تداخل پیدا کنید.

برای روشن کردن این مشکل، این مثال شامل یک پیام خوش‌آمدگویی و دو دکمه است. دکمه اول با استفاده از [رندر شرطی](/learn/conditional-rendering) و [استیت](/learn/state-a-components-memory)، حضور آن را تغییر می‌دهد، همان‌طور که معمولاً در ری‌اکت انجام می‌دهید. دکمه دوم با استفاده از [API به‌نام `remove()` DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) آن را به‌زور از DOM و خارج از کنترل ری‌اکت حذف می‌کند.

چند بار «Toggle with setState» را امتحان کنید. پیام باید ناپدید شده و دوباره ظاهر شود. سپس «Remove from the DOM» را بزنید. این آن را به‌زور حذف می‌کند. در نهایت، «Toggle with setState» را بزنید:

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```

```css
p,
button {
  display: block;
  margin: 10px;
}
```

</Sandpack>

پس از اینکه عنصر DOM را به‌صورت دستی حذف کردید، تلاش برای استفاده از `setState` برای نمایش دوبارهٔ آن منجر به خرابی می‌شود. دلیلش این است که شما DOM را تغییر داده‌اید، و ری‌اکت نمی‌داند چگونه به درستی به مدیریت آن ادامه دهد.

**از تغییر نودهای DOM مدیریت‌شده توسط ری‌اکت خودداری کنید.** تغییر دادن، اضافه کردن فرزند به، یا حذف فرزند از عناصری که توسط ری‌اکت مدیریت می‌شوند می‌تواند به نتایج بصری ناسازگار یا خرابی‌هایی مانند بالا منجر شود.

با این حال، این به‌معنای این نیست که اصلاً نمی‌توانید این کار را بکنید. این کار نیاز به احتیاط دارد. **می‌توانید به‌طور بی‌خطر بخش‌هایی از DOM را که ری‌اکت _دلیلی_ برای به‌روزرسانی‌شان ندارد تغییر دهید.** مثلاً، اگر یک `<div>` در JSX همیشه خالی باشد، ری‌اکت دلیلی برای دست‌زدن به لیست فرزندانش نخواهد داشت. بنابراین، اضافه یا حذف کردن دستی عناصر در آنجا بی‌خطر است.

<Recap>

- رفرنس‌ها یک مفهوم عمومی هستند، اما اغلب از آن‌ها برای نگه‌داشتن عناصر DOM استفاده می‌کنید.
- با پاس دادن `<div ref={myRef}>` به ری‌اکت دستور می‌دهید که یک نود DOM را در `myRef.current` قرار دهد.
- معمولاً از رفرنس‌ها برای اقدامات غیرمخرب مانند فوکوس، اسکرول، یا اندازه‌گیری عناصر DOM استفاده می‌کنید.
- یک کامپوننت به‌طور پیش‌فرض نودهای DOM خود را نمایان نمی‌کند. می‌توانید با استفاده از پراپس `ref` نمایان کردن یک نود DOM را انتخاب کنید.
- از تغییر نودهای DOM مدیریت‌شده توسط ری‌اکت خودداری کنید.
- اگر نودهای DOM مدیریت‌شده توسط ری‌اکت را تغییر می‌دهید، بخش‌هایی را تغییر دهید که ری‌اکت دلیلی برای به‌روزرسانی‌شان ندارد.

</Recap>



<Challenges>

#### پخش و توقف ویدیو {/*play-and-pause-the-video*/}

در این مثال، دکمه یک متغیر استیت را برای جابه‌جایی بین حالت پخش و توقف تغییر می‌دهد. با این حال، برای پخش یا توقف واقعی ویدیو، تغییر استیت کافی نیست. همچنین باید [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) و [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) را روی عنصر DOM مربوط به `<video>` فراخوانی کنید. یک رفرنس به آن اضافه کنید و دکمه را کارآمد کنید.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video width="250">
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

برای یک چالش اضافی، دکمهٔ «Play» را با این که ویدیو در حال پخش است یا خیر هم‌گام نگه دارید، حتی اگر کاربر روی ویدیو راست‌کلیک کند و آن را با استفاده از کنترل‌های رسانه داخلی مرورگر پخش کند. ممکن است برای این کار بخواهید به `onPlay` و `onPause` روی ویدیو گوش دهید.

<Solution>

یک رفرنس تعریف کنید و آن را روی عنصر `<video>` قرار دهید. سپس بسته به استیت بعدی، `ref.current.play()` و `ref.current.pause()` را در مدیرکننده رویداد فراخوانی کنید.

<Sandpack>

```js
import { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  )
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

برای مدیریت کنترل‌های داخلی مرورگر، می‌توانید مدیرکننده‌های `onPlay` و `onPause` را به عنصر `<video>` اضافه کنید و `setIsPlaying` را از آن‌ها فراخوانی کنید. این‌طور، اگر کاربر ویدیو را با استفاده از کنترل‌های مرورگر پخش کند، استیت مطاباقاً تنظیم می‌شود.

</Solution>

#### فوکوس کردن فیلد جستجو {/*focus-the-search-field*/}

کاری کنید که کلیک روی دکمهٔ «Search»، فوکوس را در فیلد قرار دهد.

<Sandpack>

```js
export default function Page() {
  return (
    <>
      <nav>
        <button>Search</button>
      </nav>
      <input
        placeholder="Looking for something?"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

یک رفرنس به ورودی اضافه کنید، و `focus()` را روی نود DOM آن برای فوکوس کردن فراخوانی کنید:

<Sandpack>

```js
import { useRef } from 'react';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <button onClick={() => {
          inputRef.current.focus();
        }}>
          Search
        </button>
      </nav>
      <input
        ref={inputRef}
        placeholder="Looking for something?"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

</Solution>

#### اسکرول یک کاروسل تصویر {/*scrolling-an-image-carousel*/}

این کاروسل تصویر یک دکمهٔ «Next» دارد که تصویر فعال را تغییر می‌دهد. کاری کنید که گالری روی کلیک، به‌صورت افقی به تصویر فعال اسکرول کند. می‌خواهید [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) را روی نود DOM تصویر فعال فراخوانی کنید:

```js
node.scrollIntoView({
  behavior: 'smooth',
  block: 'nearest',
  inline: 'center'
});
```

<Hint>

برای این تمرین نیازی به داشتن رفرنس به هر تصویر ندارید. داشتن رفرنس به تصویر فعال فعلی، یا به خود لیست کافی باید باشد. از `flushSync` استفاده کنید تا مطمئن شوید DOM *قبل از* اسکرول به‌روزرسانی شده است.

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function CatFriends() {
  const [index, setIndex] = useState(0);
  return (
    <>
      <nav>
        <button onClick={() => {
          if (index < catList.length - 1) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={
                  index === i ?
                    'active' :
                    ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catCount = 10;
const catList = new Array(catCount);
for (let i = 0; i < catCount; i++) {
  const bucket = Math.floor(Math.random() * catCount) % 2;
  let imageUrl = '';
  switch (bucket) {
    case 0: {
      imageUrl = "https://placecats.com/neo/250/200";
      break;
    }
    case 1: {
      imageUrl = "https://placecats.com/millie/250/200";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://placecats.com/bella/250/200";
      break;
    }
  }
  catList[i] = {
    id: i,
    imageUrl,
  };
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}

img {
  padding: 10px;
  margin: -10px;
  transition: background 0.2s linear;
}

.active {
  background: rgba(0, 100, 150, 0.4);
}
```

</Sandpack>

<Solution>

می‌توانید یک `selectedRef` تعریف کنید، و سپس آن را فقط به‌صورت شرطی به تصویر فعلی پاس دهید:

```js
<li ref={index === i ? selectedRef : null}>
```

وقتی `index === i`، یعنی تصویر، تصویر انتخاب‌شده است، `<li>` رفرنس `selectedRef` را دریافت می‌کند. ری‌اکت مطمئن می‌شود که `selectedRef.current` همیشه به نود DOM درست اشاره کند.

توجه کنید که فراخوانی `flushSync` برای مجبور کردن ری‌اکت به به‌روزرسانی DOM قبل از اسکرول لازم است. در غیر این صورت، `selectedRef.current` همیشه به آیتم قبلاً انتخاب‌شده اشاره می‌کرد.

<Sandpack>

```js
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';

export default function CatFriends() {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  return (
    <>
      <nav>
        <button onClick={() => {
          flushSync(() => {
            if (index < catList.length - 1) {
              setIndex(index + 1);
            } else {
              setIndex(0);
            }
          });
          selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }}>
          Next
        </button>
      </nav>
      <div>
        <ul>
          {catList.map((cat, i) => (
            <li
              key={cat.id}
              ref={index === i ?
                selectedRef :
                null
              }
            >
              <img
                className={
                  index === i ?
                    'active'
                    : ''
                }
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catCount = 10;
const catList = new Array(catCount);
for (let i = 0; i < catCount; i++) {
  const bucket = Math.floor(Math.random() * catCount) % 2;
  let imageUrl = '';
  switch (bucket) {
    case 0: {
      imageUrl = "https://placecats.com/neo/250/200";
      break;
    }
    case 1: {
      imageUrl = "https://placecats.com/millie/250/200";
      break;
    }
    case 2:
    default: {
      imageUrl = "https://placecats.com/bella/250/200";
      break;
    }
  }
  catList[i] = {
    id: i,
    imageUrl,
  };
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}

img {
  padding: 10px;
  margin: -10px;
  transition: background 0.2s linear;
}

.active {
  background: rgba(0, 100, 150, 0.4);
}
```

</Sandpack>

</Solution>

#### فوکوس کردن فیلد جستجو با کامپوننت‌های جداگانه {/*focus-the-search-field-with-separate-components*/}

کاری کنید که کلیک روی دکمهٔ «Search»، فوکوس را در فیلد قرار دهد. توجه کنید که هر کامپوننت در یک فایل جداگانه تعریف شده است و نباید از آن فایل خارج شود. چگونه آن‌ها را به هم وصل می‌کنید؟

<Hint>

برای نمایان کردن یک نود DOM از کامپوننت خودتان مانند `SearchInput` باید `ref` را به‌عنوان یک پراپس پاس دهید.

</Hint>

<Sandpack>

```js src/App.js
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  return (
    <>
      <nav>
        <SearchButton />
      </nav>
      <SearchInput />
    </>
  );
}
```

```js src/SearchButton.js
export default function SearchButton() {
  return (
    <button>
      Search
    </button>
  );
}
```

```js src/SearchInput.js
export default function SearchInput() {
  return (
    <input
      placeholder="Looking for something?"
    />
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

باید یک پراپس `onClick` به `SearchButton` اضافه کنید، و `SearchButton` آن را به `<button>` مرورگر پاس دهد. همچنین یک رفرنس را به `<SearchInput>` پاس می‌دهید که آن را به `<input>` واقعی منتقل کرده و پر می‌کند. در نهایت، در مدیرکننده کلیک، `focus` را روی نود DOM ذخیره‌شده درون آن رفرنس فراخوانی می‌کنید.

<Sandpack>

```js src/App.js
import { useRef } from 'react';
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <SearchButton onClick={() => {
          inputRef.current.focus();
        }} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  );
}
```

```js src/SearchButton.js
export default function SearchButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Search
    </button>
  );
}
```

```js src/SearchInput.js
export default function SearchInput({ ref }) {
  return (
    <input
      ref={ref}
      placeholder="Looking for something?"
    />
  );
}
```

```css
button { display: block; margin-bottom: 10px; }
```

</Sandpack>

</Solution>

</Challenges>
