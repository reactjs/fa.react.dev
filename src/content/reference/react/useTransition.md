---
title: useTransition
---

<Intro>

`useTransition` یک هوک ری‌اکت است که به شما اجازه می‌دهد بخشی از رابط کاربری را در پس‌زمینه رندر کنید.

```js
const [isPending, startTransition] = useTransition()
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useTransition()` {/*usetransition*/}

`useTransition` را در بالاترین سطح کامپوننت خود فراخوانی کنید تا برخی به‌روزرسانی‌های استیت را به‌عنوان ترنزیشن علامت‌گذاری کنید.

```js
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ...
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

`useTransition` هیچ پارامتری نمی‌گیرد.

#### مقدار بازگشتی {/*returns*/}

`useTransition` یک آرایه با دقیقاً دو آیتم برمی‌گرداند:

1. فلگ `isPending` که به شما می‌گوید آیا یک ترنزیشن در حال انتظار وجود دارد یا خیر.
2. [`startTransition` function](#starttransition) که به شما اجازه می‌دهد به‌روزرسانی‌ها را به‌عنوان ترنزیشن علامت‌گذاری کنید.

---

### `startTransition(action)` {/*starttransition*/}

تابع `startTransition` که توسط `useTransition` برگردانده می‌شود به شما اجازه می‌دهد یک به‌روزرسانی را به‌عنوان ترنزیشن علامت‌گذاری کنید.

```js {6,8}
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

<Note>
#### توابعی که در `startTransition` فراخوانی می‌شوند «Action» نامیده می‌شوند. {/*functions-called-in-starttransition-are-called-actions*/}

تابع ارسال‌شده به `startTransition` یک «Action» نامیده می‌شود. طبق قرارداد، هر کالبکی که داخل `startTransition` فراخوانی می‌شود (مانند یک پراپ کالبک) باید `action` نام‌گذاری شود یا شامل پسوند "Action" باشد:

```js {1,9}
function SubmitButton({ submitAction }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await submitAction();
        });
      }}
    >
      Submit
    </button>
  );
}

```

</Note>



#### پارامترها {/*starttransition-parameters*/}

* `action`: تابعی که برخی استیت‌ها را با فراخوانی یک یا چند [`set` functions](/reference/react/useState#setstate) به‌روز می‌کند. ری‌اکت `action` را بلافاصله بدون پارامتر فراخوانی می‌کند و تمام به‌روزرسانی‌های استیتی که به‌صورت همگام در طول فراخوانی تابع `action` برنامه‌ریزی شده‌اند را به‌عنوان ترنزیشن علامت‌گذاری می‌کند. هر فراخوانی async که در `action` await شده باشد در ترنزیشن گنجانده می‌شود، اما در حال حاضر نیاز دارد که هر `set` function پس از `await` در یک `startTransition` اضافی پیچیده شود (به [عیب‌یابی](#react-doesnt-treat-my-state-update-after-await-as-a-transition) مراجعه کنید). به‌روزرسانی‌های استیتی که به‌عنوان ترنزیشن علامت‌گذاری شده‌اند [غیرمسدودکننده](#marking-a-state-update-as-a-non-blocking-transition) خواهند بود و [loading indicatorهای ناخواسته نمایش داده نخواهند شد](#preventing-unwanted-loading-indicators).

#### مقدار بازگشتی {/*starttransition-returns*/}

`startTransition` چیزی را برنمی‌گرداند.

#### نکات {/*starttransition-caveats*/}

* `useTransition` یک هوک است، بنابراین فقط می‌توان آن را داخل کامپوننت‌ها یا هوک‌های سفارشی فراخوانی کرد. اگر نیاز به شروع یک ترنزیشن در جای دیگری دارید (مثلاً از یک کتابخانهٔ داده)، به‌جای آن [`startTransition`](/reference/react/startTransition) مستقل را فراخوانی کنید.

* فقط اگر به `set` function آن استیت دسترسی دارید، می‌توانید یک به‌روزرسانی را در یک ترنزیشن بپیچید. اگر می‌خواهید یک ترنزیشن را در پاسخ به برخی پراپس یا مقدار یک هوک سفارشی شروع کنید، به‌جای آن [`useDeferredValue`](/reference/react/useDeferredValue) را امتحان کنید.

* تابعی که به `startTransition` ارسال می‌کنید بلافاصله فراخوانی می‌شود و تمام به‌روزرسانی‌های استیتی که هنگام اجرای آن اتفاق می‌افتند را به‌عنوان ترنزیشن علامت‌گذاری می‌کند. اگر مثلاً سعی کنید به‌روزرسانی‌های استیت را در یک `setTimeout` انجام دهید، به‌عنوان ترنزیشن علامت‌گذاری نخواهند شد.

* باید هر به‌روزرسانی استیت را پس از هر درخواست async در یک `startTransition` دیگر بپیچید تا آن‌ها را به‌عنوان ترنزیشن علامت‌گذاری کنید. این یک محدودیت شناخته‌شده است که در آینده رفع خواهد شد (به [عیب‌یابی](#react-doesnt-treat-my-state-update-after-await-as-a-transition) مراجعه کنید).

* تابع `startTransition` یک هویت پایدار دارد، بنابراین اغلب می‌بینید که از وابستگی‌های افکت حذف می‌شود، اما گنجاندن آن باعث اجرای افکت نمی‌شود. اگر linter به شما اجازه دهد یک وابستگی را بدون خطا حذف کنید، این کار امن است. [دربارهٔ حذف وابستگی‌های افکت بیشتر بدانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

* یک به‌روزرسانی استیت که به‌عنوان ترنزیشن علامت‌گذاری شده باشد توسط سایر به‌روزرسانی‌های استیت قطع می‌شود. برای مثال، اگر یک کامپوننت نمودار را داخل یک ترنزیشن به‌روز کنید، اما سپس شروع به تایپ در یک input کنید در حالی که نمودار در وسط یک رندر مجدد است، ری‌اکت کار رندر را روی کامپوننت نمودار پس از مدیریت به‌روزرسانی input بازراه‌اندازی می‌کند.

* به‌روزرسانی‌های ترنزیشن را نمی‌توان برای کنترل inputهای متنی استفاده کرد.

* اگر چندین ترنزیشن در حال انجام وجود داشته باشد، ری‌اکت در حال حاضر آن‌ها را با هم دسته‌بندی (Batching) می‌کند. این یک محدودیت است که ممکن است در یک نسخهٔ آینده حذف شود.

## استفاده {/*usage*/}

### انجام به‌روزرسانی‌های غیرمسدودکننده با Actions {/*perform-non-blocking-updates-with-actions*/}

`useTransition` را در بالای کامپوننت خود فراخوانی کنید تا Actions را ایجاد کنید و به استیت pending دسترسی پیدا کنید:

```js [[1, 4, "isPending"], [2, 4, "startTransition"]]
import {useState, useTransition} from 'react';

function CheckoutForm() {
  const [isPending, startTransition] = useTransition();
  // ...
}
```

`useTransition` یک آرایه با دقیقاً دو آیتم برمی‌گرداند:

1. <CodeStep step={1}>فلگ `isPending`</CodeStep> که به شما می‌گوید آیا یک ترنزیشن در حال انتظار وجود دارد یا خیر.
2. <CodeStep step={2}>تابع `startTransition`</CodeStep> که به شما اجازه می‌دهد یک Action ایجاد کنید.

برای شروع یک ترنزیشن، یک تابع مانند این به `startTransition` ارسال کنید:

```js
import {useState, useTransition} from 'react';
import {updateQuantity} from './api';

function CheckoutForm() {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);

  function onSubmit(newQuantity) {
    startTransition(async function () {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  }
  // ...
}
```

تابع ارسال‌شده به `startTransition` «Action» نامیده می‌شود. می‌توانید داخل یک Action استیت را به‌روز کنید و (به‌صورت اختیاری) side effect‌ها را انجام دهید، و کار در پس‌زمینه بدون مسدود کردن تعاملات کاربر روی صفحه انجام می‌شود. یک ترنزیشن می‌تواند شامل چندین Action باشد، و در حالی که یک ترنزیشن در حال انجام است، رابط کاربری شما پاسخگو باقی می‌ماند. برای مثال، اگر کاربر روی یک tab کلیک کند اما سپس تغییر عقیده دهد و روی tab دیگری کلیک کند، کلیک دوم بلافاصله مدیریت می‌شود بدون منتظر ماندن برای تکمیل به‌روزرسانی اول.

برای ارائهٔ بازخورد به کاربر دربارهٔ ترنزیشن‌های در حال انجام، استیت `isPending` در اولین فراخوانی `startTransition` به `true` سوییچ می‌کند، و تا زمانی که تمام Actions تکمیل شوند و استیت نهایی به کاربر نمایش داده شود، `true` باقی می‌ماند. ترنزیشن‌ها تضمین می‌کنند که side effect‌ها در Actions به ترتیب تکمیل شوند تا از [loading indicatorهای ناخواسته جلوگیری شود](#preventing-unwanted-loading-indicators)، و می‌توانید در حالی که ترنزیشن در حال انجام است با `useOptimistic` بازخورد فوری ارائه دهید.

<Recipes titleText="The difference between Actions and regular event handling">

#### به‌روزرسانی کمیت در یک Action {/*updating-the-quantity-in-an-action*/}

در این مثال، تابع `updateQuantity` یک درخواست به سرور برای به‌روزرسانی کمیت آیتم در سبد خرید را شبیه‌سازی می‌کند. این تابع *به‌طور مصنوعی کند شده است* تا حداقل یک ثانیه طول بکشد تا درخواست تکمیل شود.

کمیت را چندین بار به‌سرعت به‌روز کنید. توجه کنید که استیت pending "Total" در حالی که هر درخواستی در حال انجام است نمایش داده می‌شود، و "Total" فقط پس از تکمیل درخواست نهایی به‌روز می‌شود. زیرا به‌روزرسانی در یک Action است، "quantity" می‌تواند در حالی که درخواست در حال انجام است همچنان به‌روز شود.

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "beta",
    "react-dom": "beta"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async newQuantity => {
    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}
```

```js src/Item.js
import { startTransition } from "react";

export default function Item({action}) {
  function handleChange(event) {
    // To expose an action prop, await the callback in startTransition.
    startTransition(async () => {
      await action(event.target.value);
    })
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        onChange={handleChange}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
```

```js src/Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Total({quantity, isPending}) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  )
}
```

```js src/api.js
export async function updateQuantity(newQuantity) {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
```

```css
.item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.item label {
  flex: 1;
  text-align: right;
}

.item input {
  margin-left: 4px;
  width: 60px;
  padding: 4px;
}

.total {
  height: 50px;
  line-height: 25px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
```

</Sandpack>

این یک مثال پایه برای نشان دادن نحوهٔ کار Actions است، اما این مثال درخواست‌هایی که خارج از ترتیب تکمیل می‌شوند را مدیریت نمی‌کند. هنگام به‌روزرسانی کمیت چندین بار، ممکن است درخواست‌های قبلی بعد از درخواست‌های بعدی تمام شوند که باعث می‌شود کمیت خارج از ترتیب به‌روز شود. این یک محدودیت شناخته‌شده است که در آینده رفع خواهد شد (به [عیب‌یابی](#my-state-updates-in-transitions-are-out-of-order) در ادامه مراجعه کنید).

برای موارد استفادهٔ رایج، ری‌اکت انتزاع‌های داخلی مانند زیر را ارائه می‌دهد:
- [`useActionState`](/reference/react/useActionState)
- [`<form>` actions](/reference/react-dom/components/form)
- [Server Functions](/reference/rsc/server-functions)

این راه‌حل‌ها ترتیب درخواست را برای شما مدیریت می‌کنند. هنگام استفاده از ترنزیشن‌ها برای ساخت هوک‌های سفارشی خود یا کتابخانه‌هایی که ترنزیشن‌های استیت async را مدیریت می‌کنند، کنترل بیشتری روی ترتیب درخواست دارید، اما باید آن را خودتان مدیریت کنید.

<Solution />

#### به‌روزرسانی کمیت بدون یک Action {/*updating-the-users-name-without-an-action*/}

در این مثال، تابع `updateQuantity` همچنین یک درخواست به سرور برای به‌روزرسانی کمیت آیتم در سبد خرید را شبیه‌سازی می‌کند. این تابع *به‌طور مصنوعی کند شده است* تا حداقل یک ثانیه طول بکشد تا درخواست تکمیل شود.

کمیت را چندین بار به‌سرعت به‌روز کنید. توجه کنید که استیت pending "Total" در حالی که هر درخواستی در حال انجام است نمایش داده می‌شود، اما "Total" چندین بار برای هر باری که "quantity" کلیک شده به‌روز می‌شود:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "beta",
    "react-dom": "beta"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const onUpdateQuantity = async newQuantity => {
    // Manually set the isPending State.
    setIsPending(true);
    const savedQuantity = await updateQuantity(newQuantity);
    setIsPending(false);
    setQuantity(savedQuantity);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Item onUpdateQuantity={onUpdateQuantity}/>
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}

```

```js src/Item.js
export default function Item({onUpdateQuantity}) {
  function handleChange(event) {
    onUpdateQuantity(event.target.value);
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        onChange={handleChange}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
```

```js src/Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Total({quantity, isPending}) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  )
}
```

```js src/api.js
export async function updateQuantity(newQuantity) {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
```

```css
.item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.item label {
  flex: 1;
  text-align: right;
}

.item input {
  margin-left: 4px;
  width: 60px;
  padding: 4px;
}

.total {
  height: 50px;
  line-height: 25px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
```

</Sandpack>

یک راه‌حل رایج برای این مشکل جلوگیری از تغییرات کاربر در حالی که کمیت در حال به‌روزرسانی است:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "beta",
    "react-dom": "beta"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const onUpdateQuantity = async event => {
    const newQuantity = event.target.value;
    // Manually set the isPending state.
    setIsPending(true);
    const savedQuantity = await updateQuantity(newQuantity);
    setIsPending(false);
    setQuantity(savedQuantity);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Item isPending={isPending} onUpdateQuantity={onUpdateQuantity}/>
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}

```

```js src/Item.js
export default function Item({isPending, onUpdateQuantity}) {
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        disabled={isPending}
        onChange={onUpdateQuantity}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
```

```js src/Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Total({quantity, isPending}) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  )
}
```

```js src/api.js
export async function updateQuantity(newQuantity) {
  return new Promise((resolve, reject) => {
    // Simulate a slow network request.
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
```

```css
.item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.item label {
  flex: 1;
  text-align: right;
}

.item input {
  margin-left: 4px;
  width: 60px;
  padding: 4px;
}

.total {
  height: 50px;
  line-height: 25px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
```

</Sandpack>

این راه‌حل باعث می‌شود اپلیکیشن کند به‌نظر برسد، زیرا کاربر باید هر بار که کمیت را به‌روز می‌کند منتظر بماند. امکان دارد مدیریت پیچیده‌تر دستی اضافه شود تا به کاربر اجازه دهد در حالی که کمیت در حال به‌روزرسانی است با رابط کاربری تعامل داشته باشد، اما Actions این مورد را با یک API داخلی ساده مدیریت می‌کنند.

<Solution />

</Recipes>

---

### در معرض قرار دادن پراپ `action` از کامپوننت‌ها {/*exposing-action-props-from-components*/}

می‌توانید یک پراپ `action` را از یک کامپوننت در معرض قرار دهید تا به یک والد اجازه دهید یک Action را فراخوانی کند.

برای مثال، این کامپوننت `TabButton` منطق `onClick` خود را در یک پراپ `action` می‌پیچد:

```js {8-12}
export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button onClick={() => {
      startTransition(async () => {
        // await the action that's passed in.
        // This allows it to be either sync or async.
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```

از آنجا که کامپوننت والد استیت خود را داخل `action` به‌روز می‌کند، آن به‌روزرسانی استیت به‌عنوان ترنزیشن علامت‌گذاری می‌شود. این بدان معناست که می‌توانید روی "Posts" کلیک کنید و سپس بلافاصله روی "Contact" کلیک کنید و این کار تعاملات کاربر را مسدود نمی‌کند:

<Sandpack>

```js
import { useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        action={() => setTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}
```

```js src/TabButton.js active
import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={async () => {
      startTransition(async () => {
        // await the action that's passed in.
        // This allows it to be either sync or async.
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```

```js src/AboutTab.js
export default function AboutTab() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js {expectedErrors: {'react-compiler': [19, 20]}} src/PostsTab.js
import { memo } from 'react';

const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowPost({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Post #{index + 1}
    </li>
  );
}

export default PostsTab;
```

```js src/ContactTab.js
export default function ContactTab() {
  return (
    <>
      <p>
        You can find me online here:
      </p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}
```

```css
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
```

</Sandpack>

<Note>

هنگام در معرض قرار دادن یک پراپ `action` از یک کامپوننت، باید آن را داخل ترنزیشن `await` کنید.

این کار به کالبک `action` اجازه می‌دهد همگام یا ناهمگام باشد بدون نیاز به یک `startTransition` اضافی برای پیچاندن `await` در action.

</Note>

---

### نمایش یک استیت بصری pending {/*displaying-a-pending-visual-state*/}

می‌توانید از مقدار boolean `isPending` که توسط `useTransition` برگردانده می‌شود استفاده کنید تا به کاربر نشان دهید یک ترنزیشن در حال انجام است. برای مثال، دکمهٔ tab می‌تواند یک استیت بصری "pending" خاص داشته باشد:

```js {4-6}
function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  // ...
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  // ...
```

توجه کنید چگونه کلیک روی "Posts" اکنون پاسخگوتر حس می‌شود زیرا دکمهٔ tab بلافاصله به‌روز می‌شود:

<Sandpack>

```js
import { useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <>
      <TabButton
        isActive={tab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        action={() => setTab('posts')}
      >
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </>
  );
}
```

```js src/TabButton.js active
import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```

```js src/AboutTab.js
export default function AboutTab() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js {expectedErrors: {'react-compiler': [19, 20]}} src/PostsTab.js
import { memo } from 'react';

const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log('[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />');

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowPost({ index }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Post #{index + 1}
    </li>
  );
}

export default PostsTab;
```

```js src/ContactTab.js
export default function ContactTab() {
  return (
    <>
      <p>
        You can find me online here:
      </p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}
```

```css
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
```

</Sandpack>

---

### جلوگیری از loading indicatorهای ناخواسته {/*preventing-unwanted-loading-indicators*/}

در این مثال، کامپوننت `PostsTab` با استفاده از [use](/reference/react/use) برخی داده‌ها را fetch می‌کند. وقتی روی tab "Posts" کلیک می‌کنید، کامپوننت `PostsTab` *suspend* می‌شود، که باعث می‌شود نزدیک‌ترین loading fallback ظاهر شود:

<Sandpack>

```js
import { Suspense, useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton
        isActive={tab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        action={() => setTab('posts')}
      >
        Posts
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense>
  );
}
```

```js src/TabButton.js
export default function TabButton({ action, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }
  return (
    <button onClick={() => {
      action();
    }}>
      {children}
    </button>
  );
}
```

```js src/AboutTab.js hidden
export default function AboutTab() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/PostsTab.js hidden
import {use} from 'react';
import { fetchData } from './data.js';

function PostsTab() {
  const posts = use(fetchData('/posts'));
  return (
    <ul className="items">
      {posts.map(post =>
        <Post key={post.id} title={post.title} />
      )}
    </ul>
  );
}

function Post({ title }) {
  return (
    <li className="item">
      {title}
    </li>
  );
}

export default PostsTab;
```

```js src/ContactTab.js hidden
export default function ContactTab() {
  return (
    <>
      <p>
        You can find me online here:
      </p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}
```


```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/posts')) {
    return await getPosts();
  } else {
    throw Error('Not implemented');
  }
}

async function getPosts() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  let posts = [];
  for (let i = 0; i < 500; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1)
    });
  }
  return posts;
}
```

```css
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
```

</Sandpack>

پنهان کردن کل container tab برای نمایش یک loading indicator منجر به تجربهٔ کاربری ناخوشایندی می‌شود. اگر `useTransition` را به `TabButton` اضافه کنید، می‌توانید به‌جای آن استیت pending را در دکمهٔ tab نمایش دهید.

توجه کنید که کلیک روی "Posts" دیگر کل container tab را با یک spinner جایگزین نمی‌کند:

<Sandpack>

```js
import { Suspense, useState } from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const [tab, setTab] = useState('about');
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      <TabButton
        isActive={tab === 'about'}
        action={() => setTab('about')}
      >
        About
      </TabButton>
      <TabButton
        isActive={tab === 'posts'}
        action={() => setTab('posts')}
      >
        Posts
      </TabButton>
      <TabButton
        isActive={tab === 'contact'}
        action={() => setTab('contact')}
      >
        Contact
      </TabButton>
      <hr />
      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />}
    </Suspense>
  );
}
```

```js src/TabButton.js active
import { useTransition } from 'react';

export default function TabButton({ action, children, isActive }) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>
  }
  if (isPending) {
    return <b className="pending">{children}</b>;
  }
  return (
    <button onClick={() => {
      startTransition(async () => {
        await action();
      });
    }}>
      {children}
    </button>
  );
}
```

```js src/AboutTab.js hidden
export default function AboutTab() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/PostsTab.js hidden
import {use} from 'react';
import { fetchData } from './data.js';

function PostsTab() {
  const posts = use(fetchData('/posts'));
  return (
    <ul className="items">
      {posts.map(post =>
        <Post key={post.id} title={post.title} />
      )}
    </ul>
  );
}

function Post({ title }) {
  return (
    <li className="item">
      {title}
    </li>
  );
}

export default PostsTab;
```

```js src/ContactTab.js hidden
export default function ContactTab() {
  return (
    <>
      <p>
        You can find me online here:
      </p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}
```


```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/posts')) {
    return await getPosts();
  } else {
    throw Error('Not implemented');
  }
}

async function getPosts() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  let posts = [];
  for (let i = 0; i < 500; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1)
    });
  }
  return posts;
}
```

```css
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
```

</Sandpack>

[دربارهٔ استفاده از ترنزیشن‌ها با ساسپنس بیشتر بخوانید.](/reference/react/Suspense#preventing-already-revealed-content-from-hiding)

<Note>

ترنزیشن‌ها فقط به‌اندازهٔ کافی "منتظر" می‌مانند تا از پنهان شدن محتوای *از قبل نمایش‌داده‌شده* (مانند container tab) جلوگیری کنند. اگر tab Posts یک [مرز `<Suspense>` تودرتو داشت،](/reference/react/Suspense#revealing-nested-content-as-it-loads) ترنزیشن برای آن "منتظر" نمی‌ماند.

</Note>

---

### ساخت یک router فعال‌شده با Suspense {/*building-a-suspense-enabled-router*/}

اگر در حال ساخت یک فریم‌ورک ری‌اکت یا یک router هستید، توصیه می‌کنیم navigationهای صفحه را به‌عنوان ترنزیشن علامت‌گذاری کنید.

```js {3,6,8}
function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }
  // ...
```

این کار به سه دلیل توصیه می‌شود:

- [ترنزیشن‌ها قابل قطع هستند،](#marking-a-state-update-as-a-non-blocking-transition) که به کاربر اجازه می‌دهد بدون منتظر ماندن برای تکمیل رندر مجدد کلیک کند و دور شود.
- [ترنزیشن‌ها از loading indicatorهای ناخواسته جلوگیری می‌کنند،](#preventing-unwanted-loading-indicators) که کاربر را از پرش‌های ناگهانی هنگام navigation اجتناب می‌کند.
- [ترنزیشن‌ها منتظر تمام actions در حال انتظار می‌مانند](#perform-non-blocking-updates-with-actions) که به کاربر اجازه می‌دهد منتظر بماند تا side effect‌ها قبل از نمایش صفحهٔ جدید تکمیل شوند.

در اینجا یک نمونهٔ router ساده‌شده با استفاده از ترنزیشن‌ها برای navigation آمده است.

<Sandpack>

```js src/App.js
import { Suspense, useState, useTransition } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending}>
      {content}
    </Layout>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Layout.js
export default function Layout({ children, isPending }) {
  return (
    <div className="layout">
      <section className="header" style={{
        opacity: isPending ? 0.7 : 1
      }}>
        Music Browser
      </section>
      <main>
        {children}
      </main>
    </div>
  );
}
```

```js src/IndexPage.js
export default function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  );
}
```

```js src/ArtistPage.js
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function AlbumsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band,
    formed in Liverpool in 1960, that comprised
    John Lennon, Paul McCartney, George Harrison
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
    id: 13,
    title: 'Let It Be',
    year: 1970
  }, {
    id: 12,
    title: 'Abbey Road',
    year: 1969
  }, {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969
  }, {
    id: 10,
    title: 'The Beatles',
    year: 1968
  }, {
    id: 9,
    title: 'Magical Mystery Tour',
    year: 1967
  }, {
    id: 8,
    title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
    year: 1967
  }, {
    id: 7,
    title: 'Revolver',
    year: 1966
  }, {
    id: 6,
    title: 'Rubber Soul',
    year: 1965
  }, {
    id: 5,
    title: 'Help!',
    year: 1965
  }, {
    id: 4,
    title: 'Beatles For Sale',
    year: 1964
  }, {
    id: 3,
    title: 'A Hard Day\'s Night',
    year: 1964
  }, {
    id: 2,
    title: 'With The Beatles',
    year: 1963
  }, {
    id: 1,
    title: 'Please Please Me',
    year: 1963
  }];
}
```

```css
main {
  min-height: 200px;
  padding: 10px;
}

.layout {
  border: 1px solid black;
}

.header {
  background: #222;
  padding: 10px;
  text-align: center;
  color: white;
}

.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-panel {
  border: 1px dashed #aaa;
  background: linear-gradient(90deg, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 100%);
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-line {
  display: block;
  width: 60%;
  height: 20px;
  margin: 10px;
  border-radius: 4px;
  background: #f0f0f0;
}
```

</Sandpack>

<Note>

انتظار می‌رود routerهای [فعال‌شده با Suspense](/reference/react/Suspense) به‌روزرسانی‌های navigation را به‌طور پیش‌فرض در ترنزیشن‌ها بپیچند.

</Note>

---

### نمایش یک خطا به کاربران با یک error boundary {/*displaying-an-error-to-users-with-error-boundary*/}

اگر تابع ارسال‌شده به `startTransition` خطا پرتاب کند، می‌توانید یک خطا را با یک [error boundary](/reference/react/Component#catching-rendering-errors-with-an-error-boundary) به کاربر نمایش دهید. برای استفاده از یک error boundary، کامپوننتی که در آن `useTransition` را فراخوانی می‌کنید را در یک error boundary بپیچید. پس از آنکه تابع ارسال‌شده به `startTransition` خطا داد، fallback برای error boundary نمایش داده می‌شود.

<Sandpack>

```js src/AddCommentContainer.js active
import { useTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";

export function AddCommentContainer() {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <AddCommentButton />
    </ErrorBoundary>
  );
}

function addComment(comment) {
  // For demonstration purposes to show Error Boundary
  if (comment == null) {
    throw new Error("Example Error: An error thrown to trigger error boundary");
  }
}

function AddCommentButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => {
        startTransition(() => {
          // Intentionally not passing a comment
          // so error gets thrown
          addComment();
        });
      }}
    >
      Add comment
    </button>
  );
}
```

```js src/App.js hidden
import { AddCommentContainer } from "./AddCommentContainer.js";

export default function App() {
  return <AddCommentContainer />;
}
```

```js src/index.js hidden
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```json package.json hidden
{
  "dependencies": {
    "react": "19.0.0-rc-3edc000d-20240926",
    "react-dom": "19.0.0-rc-3edc000d-20240926",
    "react-scripts": "^5.0.0",
    "react-error-boundary": "4.0.3"
  },
  "main": "/index.js"
}
```
</Sandpack>

---

## عیب‌یابی {/*troubleshooting*/}

### به‌روزرسانی یک input در یک ترنزیشن کار نمی‌کند {/*updating-an-input-in-a-transition-doesnt-work*/}

نمی‌توانید از یک ترنزیشن برای یک متغیر استیت که یک input را کنترل می‌کند استفاده کنید:

```js {4,10}
const [text, setText] = useState('');
// ...
function handleChange(e) {
  // ❌ Can't use Transitions for controlled input state
  startTransition(() => {
    setText(e.target.value);
  });
}
// ...
return <input value={text} onChange={handleChange} />;
```

این به این دلیل است که ترنزیشن‌ها غیرمسدودکننده هستند، اما به‌روزرسانی یک input در پاسخ به رویداد change باید به‌صورت همگام انجام شود. اگر می‌خواهید یک ترنزیشن را در پاسخ به تایپ اجرا کنید، دو گزینه دارید:

1. می‌توانید دو متغیر استیت جداگانه اعلان کنید: یکی برای استیت input (که همیشه به‌صورت همگام به‌روز می‌شود)، و یکی که در یک ترنزیشن به‌روز می‌شود. این کار به شما اجازه می‌دهد با استفاده از استیت همگام input را کنترل کنید، و متغیر استیت ترنزیشن (که از input "عقب‌تر" خواهد بود) را به بقیهٔ منطق رندر خود ارسال کنید.
2. همچنین می‌توانید یک متغیر استیت داشته باشید، و [`useDeferredValue`](/reference/react/useDeferredValue) را اضافه کنید که از مقدار واقعی "عقب‌تر" خواهد بود. این کار رندرهای مجدد غیرمسدودکننده را trigger می‌کند تا به‌طور خودکار به مقدار جدید "برسد".

---

### ری‌اکت به‌روزرسانی استیت من را به‌عنوان یک ترنزیشن در نظر نمی‌گیرد {/*react-doesnt-treat-my-state-update-as-a-transition*/}

هنگام پیچیدن یک به‌روزرسانی استیت در یک ترنزیشن، مطمئن شوید که *در طول* فراخوانی `startTransition` اتفاق می‌افتد:

```js
startTransition(() => {
  // ✅ Setting state *during* startTransition call
  setPage('/about');
});
```

تابعی که به `startTransition` ارسال می‌کنید باید همگام باشد. نمی‌توانید یک به‌روزرسانی را مانند این به‌عنوان ترنزیشن علامت‌گذاری کنید:

```js
startTransition(() => {
  // ❌ Setting state *after* startTransition call
  setTimeout(() => {
    setPage('/about');
  }, 1000);
});
```

در عوض، می‌توانید این کار را انجام دهید:

```js
setTimeout(() => {
  startTransition(() => {
    // ✅ Setting state *during* startTransition call
    setPage('/about');
  });
}, 1000);
```

---

### ری‌اکت به‌روزرسانی استیت من پس از `await` را به‌عنوان ترنزیشن در نظر نمی‌گیرد {/*react-doesnt-treat-my-state-update-after-await-as-a-transition*/}

هنگام استفاده از `await` داخل یک تابع `startTransition`، به‌روزرسانی‌های استیتی که پس از `await` اتفاق می‌افتند به‌عنوان ترنزیشن علامت‌گذاری نمی‌شوند. باید به‌روزرسانی‌های استیت را پس از هر `await` در یک فراخوانی `startTransition` بپیچید:

```js
startTransition(async () => {
  await someAsyncFunction();
  // ❌ Not using startTransition after await
  setPage('/about');
});
```

با این حال، این کار به‌جای آن کار می‌کند:

```js
startTransition(async () => {
  await someAsyncFunction();
  // ✅ Using startTransition *after* await
  startTransition(() => {
    setPage('/about');
  });
});
```

این یک محدودیت جاوااسکریپت به دلیل از دست دادن scope کانتکست async توسط ری‌اکت است. در آینده، وقتی [AsyncContext](https://github.com/tc39/proposal-async-context) در دسترس باشد، این محدودیت حذف خواهد شد.

---

### می‌خواهم `useTransition` را از خارج یک کامپوننت فراخوانی کنم {/*i-want-to-call-usetransition-from-outside-a-component*/}

نمی‌توانید `useTransition` را خارج یک کامپوننت فراخوانی کنید زیرا یک هوک است. در این حالت، به‌جای آن از متد مستقل [`startTransition`](/reference/react/startTransition) استفاده کنید. این به همان روش کار می‌کند، اما نشانگر `isPending` را ارائه نمی‌دهد.

---

### تابعی که به `startTransition` ارسال می‌کنم بلافاصله اجرا می‌شود {/*the-function-i-pass-to-starttransition-executes-immediately*/}

اگر این کد را اجرا کنید، 1، 2، 3 را چاپ می‌کند:

```js {1,3,6}
console.log(1);
startTransition(() => {
  console.log(2);
  setPage('/about');
});
console.log(3);
```

**انتظار می‌رود که 1، 2، 3 چاپ شود.** تابعی که به `startTransition` ارسال می‌کنید به تأخیر نمی‌افتد. برخلاف `setTimeout` مرورگر، کالبک را بعداً اجرا نمی‌کند. ری‌اکت تابع شما را بلافاصله اجرا می‌کند، اما هر به‌روزرسانی استیتی که *در حال اجرای آن* برنامه‌ریزی می‌شود به‌عنوان ترنزیشن علامت‌گذاری می‌شود. می‌توانید تصور کنید که این کار مانند این کار می‌کند:

```js
// A simplified version of how React works

let isInsideTransition = false;

function startTransition(scope) {
  isInsideTransition = true;
  scope();
  isInsideTransition = false;
}

function setState() {
  if (isInsideTransition) {
    // ... schedule a Transition state update ...
  } else {
    // ... schedule an urgent state update ...
  }
}
```

### به‌روزرسانی‌های استیت من در ترنزیشن‌ها خارج از ترتیب هستند {/*my-state-updates-in-transitions-are-out-of-order*/}

اگر داخل `startTransition` از `await` استفاده کنید، ممکن است ببینید که به‌روزرسانی‌ها خارج از ترتیب اتفاق می‌افتند.

در این مثال، تابع `updateQuantity` یک درخواست به سرور برای به‌روزرسانی کمیت آیتم در سبد خرید را شبیه‌سازی می‌کند. این تابع *به‌طور مصنوعی هر درخواست دیگر را پس از قبلی برمی‌گرداند* تا race condition برای درخواست‌های شبکه را شبیه‌سازی کند.

سعی کنید کمیت را یک بار به‌روز کنید، سپس آن را چندین بار به‌سرعت به‌روز کنید. ممکن است total نادرست را ببینید:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "beta",
    "react-dom": "beta"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState, useTransition } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  // Store the actual quantity in separate state to show the mismatch.
  const [clientQuantity, setClientQuantity] = useState(1);

  const updateQuantityAction = newQuantity => {
    setClientQuantity(newQuantity);

    // Access the pending state of the transition,
    // by wrapping in startTransition again.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total clientQuantity={clientQuantity} savedQuantity={quantity} isPending={isPending} />
    </div>
  );
}

```

```js src/Item.js
import {startTransition} from 'react';

export default function Item({action}) {
  function handleChange(e) {
    // Update the quantity in an Action.
    startTransition(async () => {
      await action(e.target.value);
    });
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        onChange={handleChange}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
```

```js src/Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Total({ clientQuantity, savedQuantity, isPending }) {
  return (
    <div className="total">
      <span>Total:</span>
      <div>
        <div>
          {isPending
            ? "🌀 Updating..."
            : `${intl.format(savedQuantity * 9999)}`}
        </div>
        <div className="error">
          {!isPending &&
            clientQuantity !== savedQuantity &&
            `Wrong total, expected: ${intl.format(clientQuantity * 9999)}`}
        </div>
      </div>
    </div>
  );
}
```

```js src/api.js
let firstRequest = true;
export async function updateQuantity(newName) {
  return new Promise((resolve, reject) => {
    if (firstRequest === true) {
      firstRequest = false;
      setTimeout(() => {
        firstRequest = true;
        resolve(newName);
        // Simulate every other request being slower
      }, 1000);
    } else {
      setTimeout(() => {
        resolve(newName);
      }, 50);
    }
  });
}
```

```css
.item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.item label {
  flex: 1;
  text-align: right;
}

.item input {
  margin-left: 4px;
  width: 60px;
  padding: 4px;
}

.total {
  height: 50px;
  line-height: 25px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.total div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.error {
  color: red;
}
```

</Sandpack>


هنگام کلیک چند بار، ممکن است درخواست‌های قبلی بعد از درخواست‌های بعدی تمام شوند. وقتی این اتفاق می‌افتد، ری‌اکت در حال حاضر راهی برای دانستن ترتیب مورد نظر ندارد. این به این دلیل است که به‌روزرسانی‌ها به‌صورت async برنامه‌ریزی می‌شوند، و ری‌اکت کانتکست ترتیب را در سراسر مرز async از دست می‌دهد.

این مورد انتظار می‌رود، زیرا Actions داخل یک ترنزیشن ترتیب اجرا را تضمین نمی‌کنند. برای موارد استفادهٔ رایج، ری‌اکت انتزاع‌های سطح بالاتری مانند [`useActionState`](/reference/react/useActionState) و [`<form>` actions](/reference/react-dom/components/form) را ارائه می‌دهد که ترتیب‌بندی را برای شما مدیریت می‌کنند. برای موارد استفادهٔ پیشرفته، باید منطق queuing و abort خود را پیاده‌سازی کنید تا این کار را مدیریت کنید.


نمونهٔ `useActionState` که ترتیب اجرا را مدیریت می‌کند:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "beta",
    "react-dom": "beta"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState, useActionState } from "react";
import { updateQuantity } from "./api";
import Item from "./Item";
import Total from "./Total";

export default function App({}) {
  // Store the actual quantity in separate state to show the mismatch.
  const [clientQuantity, setClientQuantity] = useState(1);
  const [quantity, updateQuantityAction, isPending] = useActionState(
    async (prevState, payload) => {
      setClientQuantity(payload);
      const savedQuantity = await updateQuantity(payload);
      return savedQuantity; // Return the new quantity to update the state
    },
    1 // Initial quantity
  );

  return (
    <div>
      <h1>Checkout</h1>
      <Item action={updateQuantityAction}/>
      <hr />
      <Total clientQuantity={clientQuantity} savedQuantity={quantity} isPending={isPending} />
    </div>
  );
}

```

```js src/Item.js
import {startTransition} from 'react';

export default function Item({action}) {
  function handleChange(e) {
    // Update the quantity in an Action.
    startTransition(() => {
      action(e.target.value);
    });
  }
  return (
    <div className="item">
      <span>Eras Tour Tickets</span>
      <label htmlFor="name">Quantity: </label>
      <input
        type="number"
        onChange={handleChange}
        defaultValue={1}
        min={1}
      />
    </div>
  )
}
```

```js src/Total.js
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export default function Total({ clientQuantity, savedQuantity, isPending }) {
  return (
    <div className="total">
      <span>Total:</span>
      <div>
        <div>
          {isPending
            ? "🌀 Updating..."
            : `${intl.format(savedQuantity * 9999)}`}
        </div>
        <div className="error">
          {!isPending &&
            clientQuantity !== savedQuantity &&
            `Wrong total, expected: ${intl.format(clientQuantity * 9999)}`}
        </div>
      </div>
    </div>
  );
}
```

```js src/api.js
let firstRequest = true;
export async function updateQuantity(newName) {
  return new Promise((resolve, reject) => {
    if (firstRequest === true) {
      firstRequest = false;
      setTimeout(() => {
        firstRequest = true;
        resolve(newName);
        // Simulate every other request being slower
      }, 1000);
    } else {
      setTimeout(() => {
        resolve(newName);
      }, 50);
    }
  });
}
```

```css
.item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.item label {
  flex: 1;
  text-align: right;
}

.item input {
  margin-left: 4px;
  width: 60px;
  padding: 4px;
}

.total {
  height: 50px;
  line-height: 25px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.total div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.error {
  color: red;
}
```

</Sandpack>
