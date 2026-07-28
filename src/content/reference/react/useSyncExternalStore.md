---
title: useSyncExternalStore
---

<Intro>

`useSyncExternalStore` یک هوک ری‌اکت است که به شما اجازه می‌دهد به یک استور خارجی (external store) سابسکرایب شوید.

```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)` {/*usesyncexternalstore*/}

برای خواندن یک مقدار از یک استور دادهٔ خارجی، `useSyncExternalStore` را در بالاترین سطح کامپوننت خود فراخوانی کنید.

```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```

این هوک اسنپ‌شات داده‌های موجود در استور را برمی‌گرداند. باید دو تابع را به‌عنوان آرگومان پاس بدهید:

1. تابع `subscribe` باید به استور سابسکرایب شود و تابعی برگرداند که سابسکریپشن را لغو می‌کند.
2. تابع `getSnapshot` باید یک اسنپ‌شات از داده‌های استور را بخواند.

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `subscribe`: تابعی که یک آرگومان `callback` می‌پذیرد و آن را به استور سابسکرایب می‌کند. هنگامی که استور تغییر می‌کند، باید `callback` ارائه‌شده را فراخوانی کند که این امر موجب می‌شود ری‌اکت `getSnapshot` را دوباره فراخوانی کرده و (در صورت نیاز) کامپوننت را دوباره رندر کند. تابع `subscribe` باید تابعی برگرداند که سابسکریپشن را پاک می‌کند.

* `getSnapshot`: تابعی که اسنپ‌شاتی از داده‌های استور که توسط کامپوننت نیاز است را برمی‌گرداند. تا زمانی که استور تغییر نکرده، فراخوانی‌های مکرر `getSnapshot` باید همان مقدار را برگردانند. اگر استور تغییر کند و مقدار بازگشتی متفاوت باشد (با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is))، ری‌اکت کامپوننت را دوباره رندر می‌کند.

* **اختیاری** `getServerSnapshot`: تابعی که اسنپ‌شات اولیهٔ داده‌های استور را برمی‌گرداند. این تابع فقط هنگام رندر سرور و هنگام hydration محتوای رندرشدهٔ سرور روی کلاینت استفاده می‌شود. اسنپ‌شات سرور باید بین کلاینت و سرور یکسان باشد و معمولاً سریالایز شده و از سرور به کلاینت پاس داده می‌شود. اگر این آرگومان را حذف کنید، رندر کامپوننت روی سرور خطا پرتاب می‌کند.

#### مقادیر بازگشتی {/*returns*/}

اسنپ‌شات فعلی استور که می‌توانید در منطق رندر خود از آن استفاده کنید.

#### موارد احتیاط {/*caveats*/}

* اسنپ‌شات استور که توسط `getSnapshot` بازگشده باید غیرقابل‌تغییر (immutable) باشد. اگر استور زیرین داده‌های قابل‌تغییر دارد، در صورت تغییر داده‌ها یک اسنپ‌شات غیرقابل‌تغییر جدید برگردانید. در غیر این صورت، آخرین اسنپ‌شات کش‌شده را برگردانید.

* اگر در طول یک رندر مجدد، تابع `subscribe` متفاوتی پاس داده شود، ری‌اکت با استفاده از تابع `subscribe` تازه پاس‌داده‌شده دوباره به استور سابسکرایب می‌شود. می‌توانید با اعلان `subscribe` خارج از کامپوننت از این موضوع جلوگیری کنید.

* اگر استور در طول یک [به‌روزرسانی ترنزیشن غیرمسدودکننده](/reference/react/useTransition) تغییر کند، ری‌اکت به انجام آن به‌روزرسانی به‌صورت مسدودکننده بازمی‌گردد. به‌طور خاص، برای هر به‌روزرسانی ترنزیشن، ری‌اکت `getSnapshot` را برای بار دوم درست قبل از اعمال تغییرات روی DOM فراخوانی می‌کند. اگر مقدار متفاوتی از زمان فراخوانی اولیه برگرداند، ری‌اکت به‌روزرسانی را از ابتدا دوباره آغاز می‌کند، این بار به‌صورت یک به‌روزرسانی مسدودکننده اعمال می‌کند تا اطمینان حاصل شود هر کامپوننت روی صفحه همان نسخهٔ استور را منعکس می‌کند.

* توصیه نمی‌شود یک رندر را بر اساس مقدار استور بازگشتی از `useSyncExternalStore` _معلق (suspend)_ کنید. دلیل این امر آن است که تغییرات در استور خارجی نمی‌توانند به‌عنوان [به‌روزرسانی‌های ترنزیشن غیرمسدودکننده](/reference/react/useTransition) علامت‌گذاری شوند، بنابراین نزدیک‌ترین [`Suspense` fallback](/reference/react/Suspense) را فعال می‌کنند و محتوای از قبل رندرشده روی صفحه را با یک spinner بارگذاری جایگزین می‌کنند که معمولاً تجربهٔ کاربری بدی ایجاد می‌کند.

  برای مثال، موارد زیر منصرف‌شده‌اند:

  ```js
  const LazyProductDetailPage = lazy(() => import('./ProductDetailPage.js'));

  function ShoppingApp() {
    const selectedProductId = useSyncExternalStore(...);

    // ❌ Calling `use` with a Promise dependent on `selectedProductId`
    const data = use(fetchItem(selectedProductId))

    // ❌ Conditionally rendering a lazy component based on `selectedProductId`
    return selectedProductId != null ? <LazyProductDetailPage /> : <FeaturedProducts />;
  }
  ```

---

## استفاده {/*usage*/}

### سابسکرایب شدن به یک استور خارجی {/*subscribing-to-an-external-store*/}

بیشتر کامپوننت‌های ری‌اکت شما فقط داده‌ها را از [پراپس](/learn/passing-props-to-a-component)، [استیت](/reference/react/useState) و [کانتکست](/reference/react/useContext) خود می‌خوانند. با این حال، گاهی یک کامپوننت نیاز دارد داده‌ای را از استوری خارج از ری‌اکت که در طول زمان تغییر می‌کند، بخواند. این شامل موارد زیر می‌شود:

* کتابخانه‌های مدیریت استیت شخص ثالث که استیت را خارج از ری‌اکت نگه می‌دارند.
* APIهای مرورگر که یک مقدار قابل‌تغییر و رویدادهایی برای سابسکرایب شدن به تغییرات آن آشکار می‌کنند.

برای خواندن یک مقدار از یک استور دادهٔ خارجی، `useSyncExternalStore` را در بالاترین سطح کامپوننت خود فراخوانی کنید.

```js [[1, 5, "todosStore.subscribe"], [2, 5, "todosStore.getSnapshot"], [3, 5, "todos", 0]]
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```

این هوک <CodeStep step={3}>اسنپ‌شات</CodeStep> داده‌های موجود در استور را برمی‌گرداند. باید دو تابع را به‌عنوان آرگومان پاس بدهید:

1. <CodeStep step={1}>تابع `subscribe`</CodeStep> باید به استور سابسکرایب شود و تابعی برگرداند که سابسکریپشن را لغو می‌کند.
2. <CodeStep step={2}>تابع `getSnapshot`</CodeStep> باید یک اسنپ‌شات از داده‌ها را از استور بخواند.

ری‌اکت از این توابع برای نگه‌داشتن کامپوننت شما سابسکرایب‌شده به استور و رندر دوبارهٔ آن هنگام تغییرات استفاده می‌کند.

برای مثال، در سندباکس زیر، `todosStore` به‌عنوان یک استور خارجی پیاده‌سازی شده که داده‌ها را خارج از ری‌اکت ذخیره می‌کند. کامپوننت `TodosApp` با هوک `useSyncExternalStore` به آن استور خارجی متصل می‌شود.

<Sandpack>

```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

```js src/todoStore.js
// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
```

</Sandpack>

<Note>

در صورت امکان، توصیه می‌کنیم از استیت داخلی ری‌اکت با [`useState`](/reference/react/useState) و [`useReducer`](/reference/react/useReducer) استفاده کنید. APIِ `useSyncExternalStore` بیشتر زمانی مفید است که نیاز به یکپارچه‌سازی با کد غیرری‌اکنی موجود دارید.

</Note>

---

### سابسکرایب شدن به یک API مرورگر {/*subscribing-to-a-browser-api*/}

دلیل دیگری برای افزودن `useSyncExternalStore` این است که بخواهید به مقداری که توسط مرورگر آشکار شده و در طول زمان تغییر می‌کند، سابسکرایب شوید. برای مثال، فرض کنید می‌خواهید کامپوننت شما نمایش دهد که آیا اتصال شبکه فعال است یا خیر. مرورگر این اطلاعات را از طریق پراپرتی‌ای به‌نام [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) آشکار می‌کند.

این مقدار می‌تواند بدون اطلاع ری‌اکت تغییر کند، بنابراین باید آن را با `useSyncExternalStore` بخوانید.

```js
import { useSyncExternalStore } from 'react';

function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  // ...
}
```

برای پیاده‌سازی تابع `getSnapshot`، مقدار فعلی را از API مرورگر بخوانید:

```js
function getSnapshot() {
  return navigator.onLine;
}
```

سپس، باید تابع `subscribe` را پیاده‌سازی کنید. برای مثال، هنگامی که `navigator.onLine` تغییر می‌کند، مرورگر رویدادهای [`online`](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) و [`offline`](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) را روی شیء `window` شلیک می‌کند. باید آرگومان `callback` را به رویدادهای مربوطه سابسکرایب کنید، و سپس تابعی برگردانید که سابسکریپشن‌ها را پاک می‌کند:

```js
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

اکنون ری‌اکت می‌داند چگونه مقدار را از API خارجی `navigator.onLine` بخواند و چگونه به تغییرات آن سابسکرایب شود. دستگاه خود را از شبکه قطع کنید و توجه کنید که کامپوننت در پاسخ دوباره رندر می‌شود:

<Sandpack>

```js
import { useSyncExternalStore } from 'react';

export default function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

</Sandpack>

---

### استخراج منطق به یک هوک سفارشی {/*extracting-the-logic-to-a-custom-hook*/}

معمولاً `useSyncExternalStore` را مستقیماً در کامپوننت‌های خود نمی‌نویسید. در عوض، معمولاً آن را از هوک سفارشی خودتان فراخوانی می‌کنید. این به شما اجازه می‌دهد از همان استور خارجی در کامپوننت‌های مختلف استفاده کنید.

برای مثال، این هوک سفارشی `useOnlineStatus` پیگیری می‌کند که آیا شبکه آنلاین است یا خیر:

```js {3,6}
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  // ...
}

function subscribe(callback) {
  // ...
}
```

اکنون کامپوننت‌های مختلف می‌توانند `useOnlineStatus` را بدون تکرار پیاده‌سازی زیرین فراخوانی کنند:

<Sandpack>

```js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
```

```js src/useOnlineStatus.js
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

</Sandpack>

---

### افزودن پشتیبانی از رندر سرور {/*adding-support-for-server-rendering*/}

اگر اپلیکیشن ری‌اکت شما از [رندر سرور](/reference/react-dom/server) استفاده می‌کند، کامپوننت‌های ری‌اکت شما همچنین خارج از محیط مرورگر برای تولید HTML اولیه اجرا می‌شوند. این هنگام اتصال به یک استور خارجی چند چالش ایجاد می‌کند:

- اگر به یک API فقط مخصوص مرورگر متصل می‌شوید، کار نخواهد کرد زیرا این API روی سرور وجود ندارد.
- اگر به یک استور دادهٔ شخص ثالث متصل می‌شوید، باید داده‌های آن بین سرور و کلاینت مطابقت داشته باشند.

برای حل این مشکلات، یک تابع `getServerSnapshot` را به‌عنوان آرگومان سوم به `useSyncExternalStore` پاس بدهید:

```js {4,12-14}
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true; // Always show "Online" for server-generated HTML
}

function subscribe(callback) {
  // ...
}
```

تابع `getServerSnapshot` شبیه `getSnapshot` است، اما فقط در دو شرایط اجرا می‌شود:

- هنگام تولید HTML روی سرور اجرا می‌شود.
- هنگام [hydration](/reference/react-dom/client/hydrateRoot) روی کلاینت اجرا می‌شود، یعنی وقتی ری‌اکت HTML سرور را می‌گیرد و آن را تعاملی می‌کند.

این به شما اجازه می‌دهد مقدار اسنپ‌شات اولیه‌ای را ارائه دهید که پیش از تعاملی شدن اپلیکیشن استفاده خواهد شد. اگر مقدار اولیهٔ معناداری برای رندر سرور وجود ندارد، این آرگومان را حذف کنید تا [رندر را روی کلاینت اجبار کنید.](/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content)

<Note>

مطمئن شوید که `getServerSnapshot` در رندر اولیهٔ کلاینت دقیقاً همان داده‌ای را برمی‌گرداند که روی سرور برگردانده است. برای مثال، اگر `getServerSnapshot` روی سرور مقداری از محتوای استور از پیش پرشده را برگرداند، باید این محتوا را به کلاینت منتقل کنید. یک راه برای انجام این کار این است که هنگام رندر سرور یک تگ `<script>`_emit کنید که یک متغیر سراسری مانند `window.MY_STORE_DATA` را تنظیم می‌کند، و در `getServerSnapshot` روی کلاینت از آن متغیر سراسری بخوانید. استور خارجی شما باید دستورالعمل‌هایی دربارهٔ نحوهٔ انجام این کار ارائه دهد.

</Note>

---

## رفع اشکال {/*troubleshooting*/}

### خطایی دریافت می‌کنم: "The result of `getSnapshot` should be cached" {/*im-getting-an-error-the-result-of-getsnapshot-should-be-cached*/}

این خطا به این معناست که تابع `getSnapshot` شما هر بار که فراخوانی می‌شود یک شیء جدید برمی‌گرداند، برای مثال:

```js {2-5}
function getSnapshot() {
  // 🔴 Do not return always different objects from getSnapshot
  return {
    todos: myStore.todos
  };
}
```

ری‌اکت در صورتی که مقدار بازگشتی `getSnapshot` با بار قبلی متفاوت باشد، کامپوننت را دوباره رندر می‌کند. به همین دلیل، اگر همیشه مقدار متفاوتی برگردانید، وارد یک حلقهٔ بی‌نهایت می‌شوید و این خطا را دریافت می‌کنید.

شیء `getSnapshot` شما فقط باید در صورتی شیء متفاوتی برگرداند که چیزی واقعاً تغییر کرده باشد. اگر استور شما حاوی داده‌های غیرقابل‌تغییر است، می‌توانید آن داده‌ها را مستقیماً برگردانید:

```js {2-3}
function getSnapshot() {
  // ✅ You can return immutable data
  return myStore.todos;
}
```

اگر داده‌های استور شما قابل‌تغییر است، تابع `getSnapshot` شما باید یک اسنپ‌شات غیرقابل‌تغییر از آن برگرداند. این یعنی *باید* اشیاء جدیدی ایجاد کند، اما نباید این کار را برای هر فراخوانی انجام دهد. در عوض، باید آخرین اسنپ‌شات محاسبه‌شده را ذخیره کند، و اگر داده‌های استور تغییر نکرده، همان اسنپ‌شات بار قبلی را برگرداند. چگونگی تعیین اینکه آیا داده‌های قابل‌تغییر تغییر کرده‌اند به استور قابل‌تغییر شما بستگی دارد.

---

### تابع `subscribe` من بعد از هر رندر مجدد فراخوانی می‌شود {/*my-subscribe-function-gets-called-after-every-re-render*/}

این تابع `subscribe` *درون* یک کامپوننت تعریف شده، بنابراین در هر رندر مجدد متفاوت است:

```js {2-5}
function ChatIndicator() {
  // 🚩 Always a different function, so React will resubscribe on every re-render
  function subscribe() {
    // ...
  }
  
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  // ...
}
```
  
اگر تابع `subscribe` متفاوتی میان رندرهای مجدد پاس بدهید، ری‌اکت دوباره به استور شما سابسکرایب می‌شود. اگر این موضوع باعث مشکلات عملکردی می‌شود و می‌خواهید از سابسکرایب دوباره جلوگیری کنید، تابع `subscribe` را به بیرون منتقل کنید:

```js {1-4}
// ✅ Always the same function, so React won't need to resubscribe
function subscribe() {
  // ...
}

function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  // ...
}
```

همچنین می‌توانید `subscribe` را در [`useCallback`](/reference/react/useCallback) بپیچانید تا فقط هنگام تغییر برخی آرگومان‌ها دوباره سابسکرایب شود:

```js {2-5}
function ChatIndicator({ userId }) {
  // ✅ Same function as long as userId doesn't change
  const subscribe = useCallback(() => {
    // ...
  }, [userId]);
  
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  // ...
}
```
