---
title: useState
---

<Intro>

`useState` یک هوک ری‌اکت است که به شما اجازه می‌دهد یک [متغیر استیت](/learn/state-a-components-memory) به کامپوننت خود اضافه کنید.

```js
const [state, setState] = useState(initialState)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useState(initialState)` {/*usestate*/}

برای تعریف یک [متغیر استیت](/learn/state-a-components-memory)، `useState` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
```

قرارداد این است که متغیرهای استیت را با نامی مانند `[something, setSomething]` و با استفاده از [دستوری‌سازی آرایه](https://javascript.info/destructuring-assignment) نام‌گذاری کنید.

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `initialState`: مقداری که می‌خواهید استیت ابتدا آن باشد. می‌تواند مقداری از هر نوعی باشد، اما برای توابع رفتار خاصی وجود دارد. این آرگومان بعد از رندر اولیه نادیده گرفته می‌شود.
  * اگر تابعی را به‌عنوان `initialState` ارسال کنید، آن را به‌عنوان _تابع مقداردهی اولیه_ در نظر می‌گیرد. این تابع باید خالص باشد، نباید آرگومانی بگیرد، و باید مقداری از هر نوعی را برگرداند. ری‌اکت تابع مقداردهی اولیهٔ شما را هنگام راه‌اندازی کامپوننت فراخوانی می‌کند و مقدار بازگشتی آن را به‌عنوان استیت اولیه ذخیره می‌کند. [یک مثال را در ادامه ببینید.](#avoiding-recreating-the-initial-state)

#### مقدار بازگشتی {/*returns*/}

`useState` آرایه‌ای با دقیقاً دو مقدار برمی‌گرداند:

1. استیت کنونی. در طول رندر اول، با `initialState` که ارسال کرده‌اید مطابقت خواهد داشت.
2. [تابع `set`](#setstate) که به شما اجازه می‌دهد استیت را به مقدار متفاوتی به‌روز کنید و یک رندر مجدد را فعال کنید.

#### نکات {/*caveats*/}

* `useState` یک هوک است، بنابراین فقط می‌توانید آن را **در سطح بالای کامپوننت** یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را درون حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.
* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **تابع مقداردهی اولیهٔ شما را دو بار فراخوانی می‌کند** تا به شما کمک کند [ناخالصی‌های تصادفی را پیدا کنید.](#my-initializer-or-updater-function-runs-twice) این رفتار فقط مخصوص محیط توسعه است و بر محیط تولید تأثیری ندارد. اگر تابع مقداردهی اولیهٔ شما خالص باشد (همان‌طور که باید باشد)، این موضوع نباید روی رفتار تأثیر بگذارد. نتیجهٔ یکی از فراخوانی‌ها نادیده گرفته خواهد شد.

---

### توابع `set`، مانند `setSomething(nextState)` {/*setstate*/}

تابع `set` که توسط `useState` برگردانده می‌شود به شما اجازه می‌دهد استیت را به مقدار متفاوتی به‌روز کنید و یک رندر مجدد را فعال کنید. می‌توانید استیت بعدی را مستقیماً ارسال کنید، یا تابعی که آن را از استیت قبلی محاسبه می‌کند:

```js
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
```

#### پارامترها {/*setstate-parameters*/}

* `nextState`: مقداری که می‌خواهید استیت آن باشد. می‌تواند مقداری از هر نوعی باشد، اما برای توابع رفتار خاصی وجود دارد.
  * اگر تابعی را به‌عنوان `nextState` ارسال کنید، آن را به‌عنوان _تابع به‌روزرسانی_ در نظر می‌گیرد. این تابع باید خالص باشد، باید استیت در انتظار را به‌عنوان تنها آرگومان خود بگیرد، و باید استیت بعدی را برگرداند. ری‌اکت تابع به‌روزرسانی شما را در یک صف قرار می‌دهد و کامپوننت شما را دوباره رندر می‌کند. در رندر بعدی، ری‌اکت استیت بعدی را با اعمال همهٔ توابع به‌روزرسانی در صف به استیت قبلی محاسبه می‌کند. [یک مثال را در ادامه ببینید.](#updating-state-based-on-the-previous-state)

#### مقدار بازگشتی {/*setstate-returns*/}

توابع `set` مقدار بازگشتی ندارند.

#### نکات {/*setstate-caveats*/}

* تابع `set` **فقط متغیر استیت را برای رندر *بعدی* به‌روز می‌کند**. اگر متغیر استیت را بعد از فراخوانی تابع `set` بخوانید، [هنوز مقدار قدیمی را دریافت می‌کنید](#ive-updated-the-state-but-logging-gives-me-the-old-value) که قبل از فراخوانی شما روی صفحه بود.

* اگر مقدار جدیدی که ارائه می‌دهید با `state` کنونی یکسان باشد (همان‌طور که با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) تعیین می‌شود)، ری‌اکت **رندر مجدد کامپوننت و فرزندانش را رد می‌کند.** این یک بهینه‌سازی است. اگرچه در برخی موارد ری‌اکت ممکن است همچنان قبل از رد کردن فرزندان نیاز به فراخوانی کامپوننت شما داشته باشد، اما نباید روی کد شما تأثیر بگذارد.

* ری‌اکت [به‌روزرسانی‌های استیت را دسته‌بندی می‌کند.](/learn/queueing-a-series-of-state-updates) صفحه را **پس از اجرای همهٔ کنترل‌کننده‌های رویداد** و فراخوانی توابع `set` توسط آن‌ها به‌روز می‌کند. این کار از رندرهای مجدد متعدد در طول یک رویداد جلوگیری می‌کند. در موارد نادر که نیاز دارید ری‌اکت را مجبور کنید صفحه را زودتر به‌روز کند، مثلاً برای دسترسی به DOM، می‌توانید از [`flushSync`](/reference/react-dom/flushSync) استفاده کنید.

* تابع `set` هویت پایداری دارد، بنابراین اغلب می‌بینید که از وابستگی‌های افکت حذف می‌شود، اما گنجاندن آن باعث نمی‌شود افکت اجرا شود. اگر لینتر اجازه می‌دهد یک وابستگی را بدون خطا حذف کنید، انجام این کار امن است. [دربارهٔ حذف وابستگی‌های افکت بیشتر بدانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

* فراخوانی تابع `set` *در حین رندر* فقط از درون کامپوننتی که در حال رندر است مجاز است. ری‌اکت خروجی آن را دور می‌ریزد و بلافاصله تلاش می‌کند آن را با استیت جدید دوباره رندر کند. این الگو به‌ندرت نیاز می‌شود، اما می‌توانید از آن برای **ذخیرهٔ اطلاعات از رندرهای قبلی** استفاده کنید. [یک مثال را در ادامه ببینید.](#storing-information-from-previous-renders)

* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **تابع به‌روزرسانی شما را دو بار فراخوانی می‌کند** تا به شما کمک کند [ناخالصی‌های تصادفی را پیدا کنید.](#my-initializer-or-updater-function-runs-twice) این رفتار فقط مخصوص محیط توسعه است و بر محیط تولید تأثیری ندارد. اگر تابع به‌روزرسانی شما خالص باشد (همان‌طور که باید باشد)، این موضوع نباید روی رفتار تأثیر بگذارد. نتیجهٔ یکی از فراخوانی‌ها نادیده گرفته خواهد شد.

---

## کاربرد {/*usage*/}

### افزودن استیت به یک کامپوننت {/*adding-state-to-a-component*/}

برای تعریف یک یا چند [متغیر استیت](/learn/state-a-components-memory)، `useState` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js [[1, 4, "age"], [2, 4, "setAge"], [3, 4, "42"], [1, 5, "name"], [2, 5, "setName"], [3, 5, "'Taylor'"]]
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
```

قرارداد این است که متغیرهای استیت را با نامی مانند `[something, setSomething]` و با استفاده از [دستوری‌سازی آرایه](https://javascript.info/destructuring-assignment) نام‌گذاری کنید.

`useState` آرایه‌ای با دقیقاً دو مورد برمی‌گرداند:

1. <CodeStep step={1}>استیت کنونی</CodeStep> این متغیر استیت، که ابتدا روی <CodeStep step={3}>استیت اولیه</CodeStep> که شما ارائه کرده‌اید تنظیم می‌شود.
2. <CodeStep step={2}>تابع `set`</CodeStep> که به شما اجازه می‌دهد در پاسخ به تعامل، آن را به هر مقدار دیگری تغییر دهید.

برای به‌روزرسانی چیزی که روی صفحه است، تابع `set` را با استیت بعدی فراخوانی کنید:

```js [[2, 2, "setName"]]
function handleClick() {
  setName('Robin');
}
```

ری‌اکت استیت بعدی را ذخیره می‌کند، کامپوننت شما را با مقادیر جدید دوباره رندر می‌کند، و UI را به‌روز می‌کند.

<Pitfall>

فراخوانی تابع `set` [استیت کنونی را در کد در حال اجرا **تغییر نمی‌دهد**](#ive-updated-the-state-but-logging-gives-me-the-old-value):

```js {3}
function handleClick() {
  setName('Robin');
  console.log(name); // Still "Taylor"!
}
```

فقط بر آنچه `useState` از رندر *بعدی* به بعد برمی‌گرداند تأثیر می‌گذارد.

</Pitfall>

<Recipes titleText="Basic useState examples" titleId="examples-basic">

#### Counter (number) {/*counter-number*/}

در این مثال، متغیر استیت `count` یک عدد را نگه می‌دارد. کلیک روی دکمه آن را افزایش می‌دهد.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

</Sandpack>

<Solution />

#### Text field (string) {/*text-field-string*/}

در این مثال، متغیر استیت `text` یک رشته را نگه می‌دارد. وقتی تایپ می‌کنید، `handleChange` آخرین مقدار ورودی را از المان DOM ورودی مرورگر می‌خواند، و برای به‌روزرسانی استیت `setText` را فراخوانی می‌کند. این به شما اجازه می‌دهد `text` کنونی را در زیر نمایش دهید.

<Sandpack>

```js
import { useState } from 'react';

export default function MyInput() {
  const [text, setText] = useState('hello');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <input value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
      <button onClick={() => setText('hello')}>
        Reset
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Checkbox (boolean) {/*checkbox-boolean*/}

در این مثال، متغیر استیت `liked` یک بولین را نگه می‌دارد. وقتی روی ورودی کلیک می‌کنید، `setLiked` متغیر استیت `liked` را با توجه به اینکه آیا ورودی چک‌باکس مرورگر تیک خورده است یا نه، به‌روز می‌کند. متغیر `liked` برای رندر متن زیر چک‌باکس استفاده می‌شود.

<Sandpack>

```js
import { useState } from 'react';

export default function MyCheckbox() {
  const [liked, setLiked] = useState(true);

  function handleChange(e) {
    setLiked(e.target.checked);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={liked}
          onChange={handleChange}
        />
        I liked this
      </label>
      <p>You {liked ? 'liked' : 'did not like'} this.</p>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Form (two variables) {/*form-two-variables*/}

می‌توانید بیش از یک متغیر استیت در همان کامپوننت تعریف کنید. هر متغیر استیت کاملاً مستقل است.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Updating state based on the previous state {/*updating-state-based-on-the-previous-state*/}

فرض کنید `age` برابر `42` است. این کنترل‌کننده سه بار `setAge(age + 1)` را فراخوانی می‌کند:

```js
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

با این حال، پس از یک کلیک، `age` فقط `43` خواهد بود نه `45`! این به این دلیل است که فراخوانی تابع `set` [متغیر استیت](/learn/state-as-a-snapshot) `age` را در کد در حال اجرا به‌روز نمی‌کند. بنابراین هر فراخوانی `setAge(age + 1)` به `setAge(43)` تبدیل می‌شود.

برای حل این مشکل، **می‌توانید به جای استیت بعدی، یک *تابع به‌روزرسانی*** به `setAge` ارسال کنید:

```js [[1, 2, "a", 0], [2, 2, "a + 1"], [1, 3, "a", 0], [2, 3, "a + 1"], [1, 4, "a", 0], [2, 4, "a + 1"]]
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

در اینجا، `a => a + 1` تابع به‌روزرسانی شماست. <CodeStep step={1}>استیت در انتظار</CodeStep> را می‌گیرد و <CodeStep step={2}>استیت بعدی</CodeStep> را از آن محاسبه می‌کند.

ری‌اکت توابع به‌روزرسانی شما را در یک [صف](/learn/queueing-a-series-of-state-updates) قرار می‌دهد. سپس، در رندر بعدی، آن‌ها را به همان ترتیب فراخوانی می‌کند:

1. `a => a + 1` مقدار `42` را به‌عنوان استیت در انتظار دریافت می‌کند و `43` را به‌عنوان استیت بعدی برمی‌گرداند.
1. `a => a + 1` مقدار `43` را به‌عنوان استیت در انتظار دریافت می‌کند و `44` را به‌عنوان استیت بعدی برمی‌گرداند.
1. `a => a + 1` مقدار `44` را به‌عنوان استیت در انتظار دریافت می‌کند و `45` را به‌عنوان استیت بعدی برمی‌گرداند.

هیچ به‌روزرسانی صف‌شدهٔ دیگری وجود ندارد، بنابراین ری‌اکت در نهایت `45` را به‌عنوان استیت کنونی ذخیره می‌کند.

طبق قرارداد، معمول است که آرگومان استیت در انتظار را با حرف اول نام متغیر استیت نام‌گذاری کنید، مانند `a` برای `age`. با این حال، می‌توانید آن را `prevAge` یا چیز دیگری که واضح‌تر می‌دانید بنامید.

ری‌اکت ممکن است در محیط توسعه [توابع به‌روزرسانی شما را دو بار فراخوانی کند](#my-initializer-or-updater-function-runs-twice) تا تأیید کند که آن‌ها [خالص](/learn/keeping-components-pure) هستند.

<DeepDive>

#### آیا استفاده از تابع به‌روزرسانی همیشه ترجیح داده می‌شود؟ {/*is-using-an-updater-always-preferred*/}

ممکن است توصیه‌ای بشنوید که همیشه کدی مانند `setAge(a => a + 1)` را بنویسید اگر استیتی که تنظیم می‌کنید از استیت قبلی محاسبه می‌شود. هیچ ضرری در این کار نیست، اما همیشه ضروری هم نیست.

در اکثر موارد، بین این دو روش تفاوتی وجود ندارد. ری‌اکت همیشه مطمئن می‌شود که برای اقدامات عمدی کاربر، مانند کلیک‌ها، متغیر استیت `age` قبل از کلیک بعدی به‌روز می‌شود. این بدان معناست که خطر وجود ندارد که یک کنترل‌کنندهٔ رویداد در ابتدای کنترل‌کنندهٔ رویداد، `age` «قدیمی» را ببیند.

با این حال، اگر چندین به‌روزرسانی در همان رویداد انجام می‌دهید، توابع به‌روزرسانی می‌توانند مفید باشند. اگر دسترسی به خود متغیر استیت ناپسند است نیز مفید هستند (ممکن است هنگام بهینه‌سازی رندرهای مجدد با این موضوع مواجه شوید).

اگر یکدستی را به نحوۀ کمی طولانی‌تر ترجیح می‌دهید، منطقی است که همیشه یک تابع به‌روزرسانی بنویسید اگر استیتی که تنظیم می‌کنید از استیت قبلی محاسبه می‌شود. اگر از استیت قبلی یک متغیر استیت *دیگر* محاسبه می‌شود، ممکن است بخواهید آن‌ها را در یک شیء ترکیب کنید و [از یک ردیوسر استفاده کنید.](/learn/extracting-state-logic-into-a-reducer)

</DeepDive>

<Recipes titleText="The difference between passing an updater and passing the next state directly" titleId="examples-updater">

#### Passing the updater function {/*passing-the-updater-function*/}

این مثال تابع به‌روزرسانی را ارسال می‌کند، بنابراین دکمهٔ «+3» کار می‌کند.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(a => a + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

#### Passing the next state directly {/*passing-the-next-state-directly*/}

این مثال تابع به‌روزرسانی را ارسال **نمی‌کند**، بنابراین دکمهٔ «+3» **همان‌طور که مورد نظر است کار نمی‌کند**.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [age, setAge] = useState(42);

  function increment() {
    setAge(age + 1);
  }

  return (
    <>
      <h1>Your age: {age}</h1>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <button onClick={() => {
        increment();
      }}>+1</button>
    </>
  );
}
```

```css
button { display: block; margin: 10px; font-size: 20px; }
h1 { display: block; margin: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### Updating objects and arrays in state {/*updating-objects-and-arrays-in-state*/}

می‌توانید اشیاء و آرایه‌ها را در استیت قرار دهید. در ری‌اکت، استیت فقط‌خواندنی در نظر گرفته می‌شود، بنابراین **باید به جای *تغییر* اشیاء موجود، آن‌ها را *جایگزین* کنید**. مثلاً اگر یک شیء `form` در استیت دارید، آن را تغییر ندهید:

```js
// 🚩 Don't mutate an object in state like this:
form.firstName = 'Taylor';
```

در عوض، با ایجاد یک شیء جدید، کل شیء را جایگزین کنید:

```js
// ✅ Replace state with a new object
setForm({
  ...form,
  firstName: 'Taylor'
});
```

برای کسب اطلاعات بیشتر، [به‌روزرسانی اشیاء در استیت](/learn/updating-objects-in-state) و [به‌روزرسانی آرایه‌ها در استیت](/learn/updating-arrays-in-state) را بخوانید.

<Recipes titleText="Examples of objects and arrays in state" titleId="examples-objects">

#### Form (object) {/*form-object*/}

در این مثال، متغیر استیت `form` یک شیء را نگه می‌دارد. هر ورودی یک کنترل‌کنندهٔ تغییر دارد که `setForm` را با استیت بعدی کل فرم فراخوانی می‌کند. دستور اسپرد `{ ...form }` تضمین می‌کند که شیء استیت جایگزین شود نه تغییر یابد.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [form, setForm] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  });

  return (
    <>
      <label>
        First name:
        <input
          value={form.firstName}
          onChange={e => {
            setForm({
              ...form,
              firstName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Last name:
        <input
          value={form.lastName}
          onChange={e => {
            setForm({
              ...form,
              lastName: e.target.value
            });
          }}
        />
      </label>
      <label>
        Email:
        <input
          value={form.email}
          onChange={e => {
            setForm({
              ...form,
              email: e.target.value
            });
          }}
        />
      </label>
      <p>
        {form.firstName}{' '}
        {form.lastName}{' '}
        ({form.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; }
```

</Sandpack>

<Solution />

#### Form (nested object) {/*form-nested-object*/}

در این مثال، استیت تودرتوتر است. وقتی استیت تودرتو را به‌روز می‌کنید، باید یک کپی از شیء‌ای که به‌روز می‌کنید، و همچنین هر اشیاء که در مسیر بالا آن را «شامل» می‌شوند، ایجاد کنید. برای کسب اطلاعات بیشتر [به‌روزرسانی یک شیء تودرتو](/learn/updating-objects-in-state#updating-a-nested-object) را بخوانید.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<Solution />

#### List (array) {/*list-array*/}

در این مثال، متغیر استیت `todos` یک آرایه را نگه می‌دارد. هر کنترل‌کنندهٔ دکمه، `setTodos` را با نسخهٔ بعدی آن آرایه فراخوانی می‌کند. دستورات اسپرد `[...todos]`، `todos.map()` و `todos.filter()` تضمین می‌کنند که آرایهٔ استیت جایگزین شود نه تغییر یابد.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(initialTodos);

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution />

#### Writing concise update logic with Immer {/*writing-concise-update-logic-with-immer*/}

اگر به‌روزرسانی آرایه‌ها و اشیاء بدون تغییر (mutation) خسته‌کننده به نظر می‌رسد، می‌توانید از کتابخانه‌ای مانند [Immer](https://github.com/immerjs/use-immer) برای کاهش کد تکراری استفاده کنید. Immer به شما اجازه می‌دهد کد مختصری بنویسید، گویی در حال تغییر اشیاء هستید، اما در پس‌زمینه به‌روزرسانی‌های تغییرناپذیر انجام می‌دهد:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Avoiding recreating the initial state {/*avoiding-recreating-the-initial-state*/}

ری‌اکت استیت اولیه را یک بار ذخیره می‌کند و در رندرهای بعدی آن را نادیده می‌گیرد.

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
```

اگرچه نتیجهٔ `createInitialTodos()` فقط برای رندر اولیه استفاده می‌شود، اما شما همچنان این تابع را در هر رندر فراخوانی می‌کنید. اگر آرایه‌های بزرگ ایجاد می‌کند یا محاسبات پرهزینه‌ای انجام می‌دهد، می‌تواند اتلاف منابع باشد.

برای حل این مشکل، می‌توانید **آن را به‌عنوان _تابع مقداردهی اولیه_** به `useState` ارسال کنید:

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
```

توجه کنید که `createInitialTodos` را ارسال می‌کنید، یعنی *خود تابع*، و نه `createInitialTodos()` که نتیجهٔ فراخوانی آن است. اگر تابعی را به `useState` ارسال کنید، ری‌اکت فقط در حین راه‌اندازی آن را فراخوانی می‌کند.

ری‌اکت ممکن است در محیط توسعه [توابع مقداردهی اولیهٔ شما را دو بار فراخوانی کند](#my-initializer-or-updater-function-runs-twice) تا تأیید کند که آن‌ها [خالص](/learn/keeping-components-pure) هستند.

<Recipes titleText="The difference between passing an initializer and passing the initial state directly" titleId="examples-initializer">

#### Passing the initializer function {/*passing-the-initializer-function*/}

این مثال تابع مقداردهی اولیه را ارسال می‌کند، بنابراین تابع `createInitialTodos` فقط در حین راه‌اندازی اجرا می‌شود. وقتی کامپوننت دوباره رندر می‌شود، مثلاً وقتی در ورودی تایپ می‌کنید، اجرا نمی‌شود.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Add</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

#### Passing the initial state directly {/*passing-the-initial-state-directly*/}

این مثال تابع مقداردهی اولیه را ارسال **نمی‌کند**، بنابراین تابع `createInitialTodos` در هر رندر اجرا می‌شود، مثلاً وقتی در ورودی تایپ می‌کنید. تفاوت قابل مشاهده‌ای در رفتار وجود ندارد، اما این کد کارایی کمتری دارد.

<Sandpack>

```js
import { useState } from 'react';

function createInitialTodos() {
  const initialTodos = [];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: 'Item ' + (i + 1)
    });
  }
  return initialTodos;
}

export default function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  const [text, setText] = useState('');

  return (
    <>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        setTodos([{
          id: todos.length,
          text: text
        }, ...todos]);
      }}>Add</button>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### Resetting state with a key {/*resetting-state-with-a-key*/}

شما اغلب ویژگی `key` را هنگام [رندر لیست‌ها](/learn/rendering-lists) مشاهده می‌کنید. با این حال، هدف دیگری هم دارد.

می‌توانید **استیت کامپوننت را با ارسال `key` متفاوت به یک کامپوننت بازنشانی کنید.** در این مثال، دکمهٔ Reset متغیر استیت `version` را تغییر می‌دهد، که ما آن را به‌عنوان `key` به `Form` ارسال می‌کنیم. وقتی `key` تغییر می‌کند، ری‌اکت کامپوننت `Form` (و همهٔ فرزندانش) را از ابتدا دوباره ایجاد می‌کند، بنابراین استیت آن بازنشانی می‌شود.

برای کسب اطلاعات بیشتر [حفظ و بازنشانی استیت](/learn/preserving-and-resetting-state) را بخوانید.

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [version, setVersion] = useState(0);

  function handleReset() {
    setVersion(version + 1);
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <Form key={version} />
    </>
  );
}

function Form() {
  const [name, setName] = useState('Taylor');

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Hello, {name}.</p>
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
```

</Sandpack>

---

### Storing information from previous renders {/*storing-information-from-previous-renders*/}

معمولاً، استیت را در کنترل‌کننده‌های رویداد به‌روز می‌کنید. با این حال، در موارد نادر ممکن است بخواهید استیت را در پاسخ به رندر تنظیم کنید — مثلاً ممکن است بخواهید متغیر استیتی را هنگام تغییر یک پراپ تغییر دهید.

در اکثر موارد، به این کار نیاز ندارید:

* **اگر مقداری که نیاز دارید کاملاً از پراپس فعلی یا استیت دیگر قابل محاسبه است، [آن استیت افزوده را کاملاً حذف کنید.](/learn/choosing-the-state-structure#avoid-redundant-state)** اگر نگران محاسبهٔ مکرر هستید، [هوک `useMemo`](/reference/react/useMemo) می‌تواند کمک کند.
* اگر می‌خواهید استیت کل درخت کامپوننت را بازنشانی کنید، [یک `key` متفاوت به کامپوننت خود ارسال کنید.](#resetting-state-with-a-key)
* اگر ممکن است، همهٔ استیت مرتبط را در کنترل‌کننده‌های رویداد به‌روز کنید.

در مورد نادر که هیچ‌کدام از این موارد اعمال نمی‌شود، الگویی وجود دارد که می‌توانید برای به‌روزرسانی استیت بر اساس مقادیری که تاکنون رندر شده‌اند، با فراخوانی یک تابع `set` در حین رندر کامپوننت، استفاده کنید.

در اینجا یک مثال آورده شده است. این کامپوننت `CountLabel` پراپ `count` ارسال‌شده به آن را نمایش می‌دهد:

```js src/CountLabel.js
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

فرض کنید می‌خواهید نشان دهید که آیا شمارنده از آخرین تغییر *افزایش یا کاهش* یافته است. پراپ `count` این را به شما نمی‌گوید — باید مقدار قبلی آن را پیگیری کنید. متغیر استیت `prevCount` را برای پیگیری آن اضافه کنید. یک متغیر استیت دیگر به نام `trend` اضافه کنید تا نگه دارد که آیا تعداد افزایش یافته یا کاهش. `prevCount` را با `count` مقایسه کنید، و اگر برابر نبودند، هم `prevCount` و هم `trend` را به‌روز کنید. اکنون می‌توانید هم پراپ count کنونی و هم *نحوهٔ تغییر آن از آخرین رندر* را نشان دهید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import CountLabel from './CountLabel.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <CountLabel count={count} />
    </>
  );
}
```

```js src/CountLabel.js active
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}
```

```css
button { margin-bottom: 10px; }
```

</Sandpack>

توجه کنید که اگر تابع `set` را در حین رندر فراخوانی می‌کنید، باید درون شرطی مانند `prevCount !== count` باشد، و باید فراخوانی مانند `setPrevCount(count)` درون آن شرط وجود داشته باشد. در غیر این صورت، کامپوننت شما در یک حلقه تا زمانی که کرش کند، دوباره رندر می‌شود. همچنین، فقط می‌توانید استیت کامپوننت *در حال رندر* را به این صورت به‌روز کنید. فراخوانی تابع `set` کامپوننت *دیگر* در حین رندر یک خطا است. در نهایت، فراخوانی `set` شما همچنان باید [استیت را بدون تغییر به‌روز کند](#updating-objects-and-arrays-in-state) — این بدان معنا نیست که می‌توانید سایر قوانین [توابع خالص](/learn/keeping-components-pure) را نقض کنید.

این الگو ممکن است درک آن دشوار باشد و معمولاً بهتر است از آن اجتناب شود. با این حال، از به‌روزرسانی استیت در یک افکت بهتر است. وقتی تابع `set` را در حین رندر فراخوانی می‌کنید، ری‌اکت آن کامپوننت را بلافاصله پس از خروج کامپوننت شما با یک عبارت `return` و قبل از رندر فرزندان، دوباره رندر می‌کند. به این ترتیب، فرزندان نیازی به دو بار رندر شدن ندارند. بقیهٔ تابع کامپوننت شما همچنان اجرا می‌شود (و نتیجه دور ریخته می‌شود). اگر شرط شما زیر همهٔ فراخوانی‌های هوک است، می‌توانید یک `return;` زودهنگام اضافه کنید تا رندر را زودتر ری‌استارت کنید.

---

## Troubleshooting {/*troubleshooting*/}

### I've updated the state, but logging gives me the old value {/*ive-updated-the-state-but-logging-gives-me-the-old-value*/}

فراخوانی تابع `set` **استیت را در کد در حال اجرا تغییر نمی‌دهد**:

```js {4,5,8}
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Request a re-render with 1
  console.log(count);  // Still 0!

  setTimeout(() => {
    console.log(count); // Also 0!
  }, 5000);
}
```

این به این دلیل است که [استیت‌ها مانند یک عکس‌الملی رفتار می‌کنند.](/learn/state-as-a-snapshot) به‌روزرسانی استیت یک رندر دیگر با مقدار استیت جدید درخواست می‌کند، اما بر متغیر جاوااسکریپتی `count` در کنترل‌کنندهٔ رویداد در حال اجرای شما تأثیری نمی‌گذارد.

اگر نیاز به استفاده از استیت بعدی دارید، می‌توانید آن را قبل از ارسال به تابع `set` در یک متغیر ذخیره کنید:

```js
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

---

### I've updated the state, but the screen doesn't update {/*ive-updated-the-state-but-the-screen-doesnt-update*/}

ری‌اکت **به‌روزرسانی شما را نادیده می‌گیرد اگر استیت بعدی با استیت قبلی برابر باشد،** همان‌طور که با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) تعیین می‌شود. این معمولاً وقتی رخ می‌دهد که یک شیء یا آرایه در استیت را مستقیماً تغییر می‌دهید:

```js
obj.x = 10;  // 🚩 Wrong: mutating existing object
setObj(obj); // 🚩 Doesn't do anything
```

شما یک شیء `obj` موجود را تغییر دادید و آن را به `setObj` برگرداندید، بنابراین ری‌اکت به‌روزرسانی را نادیده گرفت. برای رفع این مشکل، باید مطمئن شوید که همیشه [اشیاء و آرایه‌ها را در استیت _جایگزین_ می‌کنید به جای اینکه آن‌ها را _تغییر دهید_](#updating-objects-and-arrays-in-state):

```js
// ✅ Correct: creating a new object
setObj({
  ...obj,
  x: 10
});
```

---

### I'm getting an error: "Too many re-renders" {/*im-getting-an-error-too-many-re-renders*/}

ممکن است خطایی دریافت کنید که می‌گوید: `Too many re-renders. React limits the number of renders to prevent an infinite loop.`. معمولاً، این بدان معناست که شما به‌طور بدون قید و شرط *در حین رندر* استیت را تنظیم می‌کنید، بنابراین کامپوننت شما وارد یک حلقه می‌شود: رندر، تنظیم استیت (که باعث رندر می‌شود)، رندر، تنظیم استیت (که باعث رندر می‌شود)، و غیره. بسیار اغلب، این به دلیل اشتباه در مشخص کردن یک کنترل‌کنندهٔ رویداد رخ می‌دهد:

```js {1-2}
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

اگر نمی‌توانید علت این خطا را پیدا کنید، روی فلش کنار خطا در کنسول کلیک کنید و از طریق پشتهٔ جاوااسکریپت عبور کنید تا فراخوانی تابع `set` خاصی که مسئول خطا است را پیدا کنید.

---

### My initializer or updater function runs twice {/*my-initializer-or-updater-function-runs-twice*/}

در [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode)، ری‌اکت برخی از توابع شما را به جای یک بار، دو بار فراخوانی می‌کند:

```js {2,5-6,11-12}
function TodoList() {
  // This component function will run twice for every render.

  const [todos, setTodos] = useState(() => {
    // This initializer function will run twice during initialization.
    return createTodos();
  });

  function handleClick() {
    setTodos(prevTodos => {
      // This updater function will run twice for every click.
      return [...prevTodos, createTodo()];
    });
  }
  // ...
```

این مورد انتظار می‌رود و نباید کد شما را خراب کند.

این رفتار **فقط مخصوص محیط توسعه** به شما کمک می‌کند [کامپوننت‌ها را خالص نگه دارید.](/learn/keeping-components-pure) ری‌اکت نتیجهٔ یکی از فراخوانی‌ها را استفاده می‌کند و نتیجهٔ فراخوانی دیگر را نادیده می‌گیرد. تا زمانی که کامپوننت، تابع مقداردهی اولیه، و توابع به‌روزرسانی شما خالص باشند، این نباید روی منطق شما تأثیر بگذارد. با این حال، اگر به‌طور تصادفی ناخالص باشند، این به شما کمک می‌کند اشتباهات را متوجه شوید.

مثلاً، این تابع به‌روزرسانی ناخالص یک آرایه در استیت را تغییر می‌دهد:

```js {2,3}
setTodos(prevTodos => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo());
});
```

از آنجا که ری‌اکت تابع به‌روزرسانی شما را دو بار فراخوانی می‌کند، می‌بینید که todo دو بار اضافه شده است، بنابراین متوجه می‌شوید که اشتباهی وجود دارد. در این مثال، می‌توانید اشتباه را با [جایگزینی آرایه به جای تغییر آن](#updating-objects-and-arrays-in-state) اصلاح کنید:

```js {2,3}
setTodos(prevTodos => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()];
});
```

اکنون که این تابع به‌روزرسانی خالص است، فراخوانی آن یک بار اضافی تفاوتی در رفتار ایجاد نمی‌کند. به همین دلیل است که فراخوانی دو بار آن توسط ری‌اکت به شما کمک می‌کند اشتباهات را پیدا کنید. **فقط کامپوننت، تابع مقداردهی اولیه، و توابع به‌روزرسانی باید خالص باشند.** کنترل‌کننده‌های رویداد نیازی به خالص بودن ندارند، بنابراین ری‌اکت هرگز کنترل‌کننده‌های رویداد شما را دو بار فراخوانی نمی‌کند.

برای کسب اطلاعات بیشتر [خالص نگه داشتن کامپوننت‌ها](/learn/keeping-components-pure) را بخوانید.

---

### I'm trying to set state to a function, but it gets called instead {/*im-trying-to-set-state-to-a-function-but-it-gets-called-instead*/}

نمی‌توانید تابعی را به این صورت در استیت قرار دهید:

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

از آنجا که در حال ارسال یک تابع هستید، ری‌اکت فرض می‌کند که `someFunction` یک [تابع مقداردهی اولیه](#avoiding-recreating-the-initial-state) است، و `someOtherFunction` یک [تابع به‌روزرسانی](#updating-state-based-on-the-previous-state) است، بنابراین سعی می‌کند آن‌ها را فراخوانی کرده و نتیجه را ذخیره کند. برای *ذخیرهٔ* واقعی یک تابع، باید `() =>` را در هر دو مورد قبل از آن‌ها قرار دهید. سپس ری‌اکت توابعی که ارسال می‌کنید را ذخیره خواهد کرد.

```js {1,4}
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
