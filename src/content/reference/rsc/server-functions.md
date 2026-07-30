---
title: تابع‌های سرور
---

<RSC>

تابع‌های سرور برای استفاده در [کامپوننت‌های سرور ری‌اکت](/reference/rsc/server-components) هستند.

**نکته:** تا سپتامبر ۲۰۲۴، ما به همهٔ تابع‌های سرور می‌گفتیم «Server Actions». اگر یک تابع سرور به یک پراپ action پاس داده شود یا از داخل یک action فراخوانی شود، یک Server Action است، اما همهٔ تابع‌های سرور Server Action نیستند. نام‌گذاری در این مستندات به‌روزرسانی شده تا نشان دهد تابع‌های سرور می‌توانند برای چندین منظور استفاده شوند.

</RSC>

<Intro>

تابع‌های سرور به کامپوننت‌های کلاینت اجازه می‌دهند تابع‌های async که روی سرور اجرا می‌شوند را فراخوانی کنند.

</Intro>

<InlineToc />

<Note>

#### چگونه می‌توانم پشتیبانی از تابع‌های سرور را پیاده‌سازی کنم؟ {/*how-do-i-build-support-for-server-functions*/}

در حالی که تابع‌های سرور در React 19 پایدار هستند و بین نسخه‌های minor شکسته نمی‌شوند، APIهای زیرین که برای پیاده‌سازی تابع‌های سرور در یک باندلر یا فریمورک کامپوننت سرور ری‌اکت استفاده می‌شوند، از semver پیروی نمی‌کنند و ممکن است بین نسخه‌های minor در React 19.x تغییر کنند.

برای پشتیبانی از تابع‌های سرور به‌عنوان یک باندلر یا فریمورک، توصیه می‌کنیم به یک نسخهٔ خاص از ری‌اکت پایبند باشید، یا از نسخهٔ Canary استفاده کنید. ما به همکاری با باندلرها و فریمورک‌ها برای پایدار کردن APIهای مورد استفاده در پیاده‌سازی تابع‌های سرور در آینده ادامه خواهیم داد.

</Note>

وقتی یک تابع سرور با دایرکتیو [`"use server"`](/reference/rsc/use-server) تعریف می‌شود، فریمورک شما به‌طور خودکار یک ارجاع به تابع سرور می‌سازد، و آن ارجاع را به کامپوننت کلاینت منتقل می‌کند. وقتی این تابع روی کلاینت فراخوانی می‌شود، ری‌اکت یک درخواست به سرور می‌فرستد تا تابع را اجرا کند، و نتیجه را برمی‌گرداند.

تابع‌های سرور می‌توانند در کامپوننت‌های سرور ایجاد شوند و به‌عنوان پراپس به کامپوننت‌های کلاینت منتقل شوند، یا می‌توانند در کامپوننت‌های کلاینت وارد و استفاده شوند.

## نحوهٔ استفاده {/*usage*/}

### ایجاد یک تابع سرور از یک کامپوننت سرور {/*creating-a-server-function-from-a-server-component*/}

کامپوننت‌های سرور می‌توانند تابع‌های سرور را با دایرکتیو `"use server"` تعریف کنند:

```js [[2, 7, "'use server'"], [1, 5, "createNoteAction"], [1, 12, "createNoteAction"]]
// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';
    
    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}
```

وقتی ری‌اکت کامپوننت سرور `EmptyNote` را رندر می‌کند، یک ارجاع به تابع `createNoteAction` می‌سازد، و آن ارجاع را به کامپوننت کلاینت `Button` منتقل می‌کند. وقتی دکمه کلیک می‌شود، ری‌اکت یک درخواست به سرور می‌فرستد تا تابع `createNoteAction` را با ارجاع ارائه‌شده اجرا کند:

```js {5}
"use client";

export default function Button({onClick}) { 
  console.log(onClick); 
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}
  return <button onClick={() => onClick()}>Create Empty Note</button>
}
```

برای اطلاعات بیشتر، مستندات [`"use server"`](/reference/rsc/use-server) را ببینید.


### وارد کردن تابع‌های سرور از کامپوننت‌های کلاینت {/*importing-server-functions-from-client-components*/}

کامپوننت‌های کلاینت می‌توانند تابع‌های سرور را از فایل‌هایی که از دایرکتیو `"use server"` استفاده می‌کنند، وارد کنند:

```js [[1, 3, "createNote"]]
"use server";

export async function createNote() {
  await db.notes.create();
}

```

وقتی باندلر کامپوننت کلاینت `EmptyNote` را می‌سازد، یک ارجاع به تابع `createNote` در باندل ایجاد می‌کند. وقتی `button` کلیک می‌شود، ری‌اکت یک درخواست به سرور می‌فرستد تا تابع `createNote` را با استفاده از ارجاع ارائه‌شده اجرا کند:

```js [[1, 2, "createNote"], [1, 5, "createNote"], [1, 7, "createNote"]]
"use client";
import {createNote} from './actions';

function EmptyNote() {
  console.log(createNote);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNote'}
  <button onClick={() => createNote()} />
}
```

برای اطلاعات بیشتر، مستندات [`"use server"`](/reference/rsc/use-server) را ببینید.

### تابع‌های سرور با اکشن‌ها {/*server-functions-with-actions*/}

تابع‌های سرور می‌توانند از اکشن‌ها روی کلاینت فراخوانی شوند:

```js [[1, 3, "updateName"]]
"use server";

export async function updateName(name) {
  if (!name) {
    return {error: 'Name is required'};
  }
  await db.users.updateName(name);
}
```

```js [[1, 3, "updateName"], [1, 13, "updateName"], [2, 11, "submitAction"],  [2, 23, "submitAction"]]
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const [isPending, startTransition] = useTransition();

  const submitAction = async () => {
    startTransition(async () => {
      const {error} = await updateName(name);
      if (error) {
        setError(error);
      } else {
        setName('');
      }
    })
  }
  
  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending}/>
      {error && <span>Failed: {error}</span>}
    </form>
  )
}
```

این به شما اجازه می‌دهد با قرار دادن تابع سرور در یک اکشن روی کلاینت، به استیت `isPending` تابع سرور دسترسی پیدا کنید.

برای اطلاعات بیشتر، مستندات [فراخوانی یک تابع سرور خارج از `<form>`](/reference/rsc/use-server#calling-a-server-function-outside-of-form) را ببینید.

### تابع‌های سرور با اکشن‌های فرم {/*using-server-functions-with-form-actions*/}

تابع‌های سرور با قابلیت‌های جدید فرم در React 19 کار می‌کنند.

می‌توانید یک تابع سرور را به یک فرم منتقل کنید تا فرم به‌طور خودکار به سرور ارسال شود:


```js [[1, 3, "updateName"], [1, 7, "updateName"]]
"use client";

import {updateName} from './actions';

function UpdateName() {
  return (
    <form action={updateName}>
      <input type="text" name="name" />
    </form>
  )
}
```

وقتی ارسال فرم موفق می‌شود، ری‌اکت به‌طور خودکار فرم را reset می‌کند. می‌توانید `useActionState` را اضافه کنید تا به استیت در حال انجام، آخرین پاسخ، یا برای پشتیبانی از progressive enhancement دسترسی داشته باشید.

برای اطلاعات بیشتر، مستندات [تابع‌های سرور در فرم‌ها](/reference/rsc/use-server#server-functions-in-forms) را ببینید.

### تابع‌های سرور با `useActionState` {/*server-functions-with-use-action-state*/}

می‌توانید تابع‌های سرور را با `useActionState` برای حالت رایجی که فقط به استیت در حال انجام اکشن و آخرین پاسخ برگشتی نیاز دارید، فراخوانی کنید:

```js [[1, 3, "updateName"], [1, 6, "updateName"], [2, 6, "submitAction"], [2, 9, "submitAction"]]
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [state, submitAction, isPending] = useActionState(updateName, {error: null});

  return (
    <form action={submitAction}>
      <input type="text" name="name" disabled={isPending}/>
      {state.error && <span>Failed: {state.error}</span>}
    </form>
  );
}
```

وقتی از `useActionState` با تابع‌های سرور استفاده می‌کنید، ری‌اکت همچنین به‌طور خودکار ارسال‌های فرمی را که قبل از پایان hydration وارد شده‌اند، بازپخش می‌کند. این یعنی کاربران می‌توانند حتی قبل از hydration اپ با آن تعامل داشته باشند.

برای اطلاعات بیشتر، مستندات [`useActionState`](/reference/react/useActionState) را ببینید.

### ارتقای تدریجی با `useActionState` {/*progressive-enhancement-with-useactionstate*/}

تابع‌های سرور همچنین از progressive enhancement با آرگومان سوم `useActionState` پشتیبانی می‌کنند.

```js [[1, 3, "updateName"], [1, 6, "updateName"], [2, 6, "/name/update"], [3, 6, "submitAction"], [3, 9, "submitAction"]]
"use client";

import {updateName} from './actions';

function UpdateName() {
  const [, submitAction] = useActionState(updateName, null, `/name/update`);

  return (
    <form action={submitAction}>
      ...
    </form>
  );
}
```

وقتی <CodeStep step={2}>permalink</CodeStep> به `useActionState` ارائه می‌شود، ری‌اکت در صورتی که فرم قبل از بارگذاری باندل JavaScript ارسال شود، به URL ارائه‌شده redirect می‌کند.

برای اطلاعات بیشتر، مستندات [`useActionState`](/reference/react/useActionState) را ببینید.
