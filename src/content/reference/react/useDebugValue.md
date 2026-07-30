---
title: useDebugValue
---

<Intro>

`useDebugValue` یک هوک ری‌اکت است که به شما اجازه می‌دهد برای یک هوک سفارشی، در [React DevTools](/learn/react-developer-tools) یک برچسب اضافه کنید.

```js
useDebugValue(value, format?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useDebugValue(value, format?)` {/*usedebugvalue*/}

`useDebugValue` را در سطح بالای [هوک سفارشی](/learn/reusing-logic-with-custom-hooks) خود فراخوانی کنید تا یک مقدار دیباگ قابل خواندن نمایش دهید:

```js
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `value`: مقداری که می‌خواهید در React DevTools نمایش دهید. می‌تواند هر نوعی داشته باشد.
* **اختیاری** `format`: یک تابع قالب‌بندی. هنگامی که کامپوننت بررسی (inspect) می‌شود، React DevTools تابع قالب‌بندی را با `value` به‌عنوان آرگومان فراخوانی می‌کند و سپس مقدار قالب‌بندی‌شدهٔ بازگشتی (که می‌تواند هر نوعی داشته باشد) را نمایش می‌دهد. اگر تابع قالب‌بندی را مشخص نکنید، خود `value` اصلی نمایش داده می‌شود.

#### مقادیر بازگشتی {/*returns*/}

`useDebugValue` چیزی باز نمی‌گرداند.

## استفاده {/*usage*/}

### افزودن برچسب به یک هوک سفارشی {/*adding-a-label-to-a-custom-hook*/}

`useDebugValue` را در سطح بالای [هوک سفارشی](/learn/reusing-logic-with-custom-hooks) خود فراخوانی کنید تا یک <CodeStep step={1}>مقدار دیباگ</CodeStep> قابل خواندن برای [React DevTools](/learn/react-developer-tools) نمایش دهید.

```js [[1, 5, "isOnline ? 'Online' : 'Offline'"]]
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

این کار به کامپوننت‌هایی که `useOnlineStatus` را صدا می‌زنند، هنگام بررسی (inspect) کردن، برچسبی مانند `OnlineStatus: "Online"` می‌دهد:

![نما از React DevTools که مقدار دیباگ را نمایش می‌دهد](/images/docs/react-devtools-usedebugvalue.png)

بدون فراخوانی `useDebugValue`، تنها داده‌های زیرین (در این مثال، `true`) نمایش داده می‌شد.

<Sandpack>

```js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

export default function App() {
  return <StatusBar />;
}
```

```js src/useOnlineStatus.js active
import { useSyncExternalStore, useDebugValue } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
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

<Note>

به همهٔ هوک‌های سفارشی مقدار دیباگ اضافه نکنید. این کار بیشتر برای هوک‌های سفارشی که بخشی از کتابخانه‌های مشترک هستند و ساختار داده‌ای درونی پیچیده‌ای دارند که بررسی آن دشوار است، ارزشمند است.

</Note>

---

### به تعویق انداختن قالب‌بندی یک مقدار دیباگ {/*deferring-formatting-of-a-debug-value*/}

همچنین می‌توانید یک تابع قالب‌بندی را به‌عنوان آرگومان دوم به `useDebugValue` ارسال کنید:

```js [[1, 1, "date", 18], [2, 1, "date.toDateString()"]]
useDebugValue(date, date => date.toDateString());
```

تابع قالب‌بندی شما <CodeStep step={1}>مقدار دیباگ</CodeStep> را به‌عنوان پارامتر دریافت می‌کند و باید یک <CodeStep step={2}>مقدار نمایشی قالب‌بندی‌شده</CodeStep> برگرداند. وقتی کامپوننت شما بررسی (inspect) می‌شود، React DevTools این تابع را فراخوانی کرده و نتیجهٔ آن را نمایش می‌دهد.

این کار به شما اجازه می‌دهد از اجرای منطق قالب‌بندی که احتمالاً پرهزینه است، جلوگیری کنید، مگر اینکه کامپوننت واقعاً در حال بررسی باشد. به‌عنوان مثال، اگر `date` یک مقدار از نوع Date باشد، این کار مانع از فراخوانی `toDateString()` روی آن در هر رندر می‌شود.
