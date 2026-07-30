---
title: "React v19"
author: The React Team
date: 2024/12/05
description: React 19 is now available on npm! In this post, we'll give an overview of the new features in React 19, and how you can adopt them.
---

05 دسامبر 2024 توسط [تیم ری‌اکت](/community/team)

---
<Note>

### React 19 اکنون پایدار است! {/*react-19-is-now-stable*/}

افزوده‌ها از زمانی که این پست در ابتدا با React 19 RC در آوریل به اشتراک گذاشته شد:

- **پیش‌گرم‌کردن درخت‌های ساسپندشده**: [بهبودهای ساسپنس](/blog/2024/04/25/react-19-upgrade-guide#improvements-to-suspense) را ببینید.
- **APIهای استاتیک React DOM**: [APIهای استاتیک جدید React DOM](#new-react-dom-static-apis) را ببینید.

_تاریخ این پست برای بازتاب تاریخ انتشار پایدار به‌روزرسانی شده است._

</Note>

<Intro>

React v19 اکنون در npm در دسترس است!

</Intro>

در [راهنمای ارتقا به React 19](/blog/2024/04/25/react-19-upgrade) ما، دستورالعمل‌های گام‌به‌گام برای ارتقای اپلیکیشن‌تان به React 19 را به اشتراک گذاشتیم. در این پست، نمای کلی از قابلیت‌های جدید React 19 و نحوهٔ پذیرش آن‌ها را ارائه می‌کنیم.

- [چه چیزهای جدیدی در React 19 وجود دارد](#whats-new-in-react-19)
- [بهبودها در React 19](#improvements-in-react-19)
- [نحوهٔ ارتقا](#how-to-upgrade)

برای فهرست تغییرات از بین‌برنده، [راهنمای ارتقا](/blog/2024/04/25/react-19-upgrade) را ببینید.

---

## چه چیزهای جدیدی در React 19 وجود دارد {/*whats-new-in-react-19*/}

### اکشن‌ها {/*actions*/}

یک مورد استفادهٔ رایج در اپلیکیشن‌های ری‌اکت، انجام یک جهش داده و سپس به‌روزرسانی استیت در پاسخ است. برای مثال، وقتی کاربر فرمی را برای تغییر نام خود ارسال می‌کند، یک درخواست API می‌دهید و سپس پاسخ را مدیریت می‌کنید. در گذشته، باید استیت‌های در حالت انتظار (pending)، خطاها، به‌روزرسانی‌های خوش‌بینانه و درخواست‌های متوالی را به‌صورت دستی مدیریت می‌کردید.

برای مثال، می‌توانستید استیت در حالت انتظار و خطا را در `useState` مدیریت کنید:

```js
// Before Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    } 
    redirect("/path");
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

در React 19، ما پشتیبانی از استفاده از توابع ناهمگام در ترنزیشن‌ها را برای مدیریت خودکار استیت‌های در حالت انتظار، خطاها، فرم‌ها و به‌روزرسانی‌های خوش‌بینانه اضافه می‌کنیم.

برای مثال، می‌توانید از `useTransition` برای مدیریت استیت در حالت انتظار استفاده کنید:

```js
// Using pending state from Actions
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      } 
      redirect("/path");
    })
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

ترنزیشن ناهمگام بلافاصله استیت `isPending` را به true تنظیم می‌کند، درخواست(های) ناهمگام را انجام می‌دهد و `isPending` را پس از هر ترنزیشنی به false تغییر می‌دهد. این به شما اجازه می‌دهد رابط کاربری فعلی را پاسخگو و تعاملی نگه دارید در حالی که داده‌ها در حال تغییر هستند.

<Note>

#### بر اساس قرارداد، توابعی که از ترنزیشن‌های ناهمگام استفاده می‌کنند «اکشن» (Actions) نامیده می‌شوند. {/*by-convention-functions-that-use-async-transitions-are-called-actions*/}

اکشن‌ها ارسال داده را به‌طور خودکار برای شما مدیریت می‌کنند:

- **استیت در حالت انتظار (Pending state)**: اکشن‌ها یک استیت در حالت انتظار فراهم می‌کنند که در ابتدای یک درخواست شروع می‌شود و به‌طور خودکار وقتی به‌روزرسانی استیت نهایی کامیت می‌شود بازنشانی می‌گردد.
- **به‌روزرسانی‌های خوش‌بینانه (Optimistic updates)**: اکشن‌ها از هوک جدید [`useOptimistic`](#new-hook-optimistic-updates) پشتیبانی می‌کنند تا بتوانید به کاربران بازخورد فوری نمایش دهید در حالی که درخواست‌ها در حال ارسال هستند.
- **مدیریت خطا**: اکشن‌ها مدیریت خطا فراهم می‌کنند تا بتوانید هنگام شکست یک درخواست Error Boundaryها را نمایش دهید و به‌روزرسانی‌های خوش‌بینانه را به‌طور خودکار به مقدار اصلی بازگردانید.
- **فرم‌ها**: عناصر `<form>` اکنون از ارسال توابع به پراپسهای `action` و `formAction` پشتیبانی می‌کنند. ارسال توابع به پراپسهای `action` به‌طور پیش‌فرض از اکشن‌ها استفاده می‌کند و فرم را پس از ارسال به‌طور خودکار بازنشانی می‌کند.

</Note>

با تکیه بر اکشن‌ها، React 19 هوک [`useOptimistic`](#new-hook-optimistic-updates) را برای مدیریت به‌روزرسانی‌های خوش‌بینانه، و هوک جدید [`React.useActionState`](#new-hook-useactionstate) را برای مدیریت موارد رایج اکشن‌ها معرفی می‌کند. در `react-dom` نیز [`<form>` Actions](#form-actions) را برای مدیریت خودکار فرم‌ها و [`useFormStatus`](#new-hook-useformstatus) را برای پشتیبانی از موارد رایج اکشن‌ها در فرم‌ها اضافه می‌کنیم.

در React 19، مثال بالا می‌تواند به این شکل ساده شود:

```js
// Using <form> Actions and useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

در بخش بعدی، هر یک از قابلیت‌های جدید اکشن در React 19 را بررسی می‌کنیم.

### هوک جدید: `useActionState` {/*new-hook-useactionstate*/}

برای آسان‌سازی موارد رایج برای اکشن‌ها، هوک جدیدی به نام `useActionState` اضافه کرده‌ایم:

```js
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName);
    if (error) {
      // You can return any result of the action.
      // Here, we return only the error.
      return error;
    }

    // handle success
    return null;
  },
  null,
);
```

`useActionState` یک تابع («اکشن») را می‌پذیرد و یک اکشن پیچیده‌شده برای فراخوانی بازمی‌گرداند. این کار می‌شود زیرا اکشن‌ها قابل ترکیب هستند. وقتی اکشن پیچیده‌شده فراخوانی می‌شود، `useActionState` آخرین نتیجهٔ اکشن را به‌عنوان `data` و استیت در حالت انتظار اکشن را به‌عنوان `pending` بازمی‌گرداند.

<Note>

`React.useActionState` در انتشارهای کاناری پیش‌تر `ReactDOM.useFormState` نامیده می‌شد، اما ما آن را تغییر نام داده‌ایم و `useFormState` را منسوخ کرده‌ایم.

برای اطلاعات بیشتر [#28491](https://github.com/facebook/react/pull/28491) را ببینید.

</Note>

برای اطلاعات بیشتر، مستندات [`useActionState`](/reference/react/useActionState) را ببینید.

### React DOM: اکشن‌های `<form>` {/*form-actions*/}

اکشن‌ها همچنین با قابلیت‌های جدید `<form>` در React 19 برای `react-dom` یکپارچه شده‌اند. ما پشتیبانی از ارسال توابع به‌عنوان پراپسهای `action` و `formAction` عناصر `<form>`، `<input>` و `<button>` را برای ارسال خودکار فرم‌ها با اکشن‌ها اضافه کرده‌ایم:

```js [[1,1,"actionFunction"]]
<form action={actionFunction}>
```

وقتی یک اکشن `<form>` موفق می‌شود، ری‌اکت به‌طور خودکار فرم را برای کامپوننت‌های uncontrolled بازنشانی می‌کند. اگر نیاز به بازنشانی دستی `<form>` دارید، می‌توانید API جدید `requestFormReset` در React DOM را فراخوانی کنید.

برای اطلاعات بیشتر، مستندات `react-dom` برای [`<form>`](/reference/react-dom/components/form)، [`<input>`](/reference/react-dom/components/input) و `<button>` را ببینید.

### React DOM: هوک جدید: `useFormStatus` {/*new-hook-useformstatus*/}

در سیستم‌های طراحی، رایج است که کامپوننت‌های طراحی نوشته می‌شوند که نیاز به دسترسی به اطلاعاتی دربارهٔ `<form>` که در آن قرار دارند دارند، بدون آنکه پراپسها را به کامپوننت پاس دهیم. این کار می‌تواند از طریق کانتکست انجام شود، اما برای آسان‌سازی مورد رایج، هوک جدید `useFormStatus` را اضافه کرده‌ایم:

```js [[1, 4, "pending"], [1, 5, "pending"]]
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```

`useFormStatus` استیت `<form>` والد را می‌خواند، به‌گونه‌ای که انگار فرم یک ارائه‌دهندهٔ کانتکست (Context provider) است.

برای اطلاعات بیشتر، مستندات `react-dom` برای [`useFormStatus`](/reference/react-dom/hooks/useFormStatus) را ببینید.

### هوک جدید: `useOptimistic` {/*new-hook-optimistic-updates*/}

یک الگوی رایج دیگر رابط کاربری هنگام انجام یک جهش داده، نمایش خوش‌بینانهٔ استیت نهایی در حین انجام درخواست ناهمگام است. در React 19، هوک جدیدی به نام `useOptimistic` را برای آسان‌سازی این کار اضافه می‌کنیم:

```js {2,6,13,19}
function ChangeName({currentName, onUpdateName}) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <p>
        <label>Change Name:</label>
        <input
          type="text"
          name="name"
          disabled={currentName !== optimisticName}
        />
      </p>
    </form>
  );
}
```

هوک `useOptimistic` بلافاصله `optimisticName` را در حالی که درخواست `updateName` در حال انجام است رندر می‌کند. وقتی به‌روزرسانی پایان می‌یابد یا خطا رخ می‌دهد، ری‌اکت به‌طور خودکار به مقدار `currentName` بازمی‌گردد.

برای اطلاعات بیشتر، مستندات [`useOptimistic`](/reference/react/useOptimistic) را ببینید.

### API جدید: `use` {/*new-feature-use*/}

در React 19 ما یک API جدید برای خواندن منابع در حین رندر معرفی می‌کنیم: `use`.

برای مثال، می‌توانید یک promise را با `use` بخوانید و ری‌اکت تا resolve شدن promise ساسپند می‌شود:

```js {1,5}
import {use} from 'react';

function Comments({commentsPromise}) {
  // `use` will suspend until the promise resolves.
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}

function Page({commentsPromise}) {
  // When `use` suspends in Comments,
  // this Suspense boundary will be shown.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  )
}
```

<Note>

#### `use` از promiseهای ایجادشده در رندر پشتیبانی نمی‌کند. {/*use-does-not-support-promises-created-in-render*/}

اگر سعی کنید یک promise ایجادشده در رندر را به `use` ارسال کنید، ری‌اکت هشدار می‌دهد:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.

</ConsoleLogLine>

</ConsoleBlockMulti>

برای رفع این موضوع، باید یک promise از یک کتابخانه یا فریم‌ورک مبتنی بر ساسپنس که از کش کردن promiseها پشتیبانی می‌کند ارسال کنید. در آینده قصد داریم قابلیت‌هایی را منتشر کنیم که کش کردن promiseها در رندر را آسان‌تر می‌سازد.

</Note>

همچنین می‌توانید کانتکست را با `use` بخوانید، که به شما اجازه می‌دهد کانتکست را به‌صورت شرطی — مثلاً پس از returnهای زودهنگام — بخوانید:

```js {1,11}
import {use} from 'react';
import ThemeContext from './ThemeContext'

function Heading({children}) {
  if (children == null) {
    return null;
  }
  
  // This would not work with useContext
  // because of the early return.
  const theme = use(ThemeContext);
  return (
    <h1 style={{color: theme.color}}>
      {children}
    </h1>
  );
}
```

API `use` را فقط می‌توان در رندر فراخوانی کرد، مشابه هوک‌ها. برخلاف هوک‌ها، `use` می‌تواند به‌صورت شرطی فراخوانی شود. در آینده قصد داریم روش‌های بیشتری برای مصرف منابع در رندر با `use` را پشتیبانی کنیم.

برای اطلاعات بیشتر، مستندات [`use`](/reference/react/use) را ببینید.

## APIهای استاتیک جدید React DOM {/*new-react-dom-static-apis*/}

ما دو API جدید به `react-dom/static` برای تولید سایت استاتیک افزوده‌ایم:
- [`prerender`](/reference/react-dom/static/prerender)
- [`prerenderToNodeStream`](/reference/react-dom/static/prerenderToNodeStream)

این APIهای جدید `renderToString` را با انتظار برای بارگذاری داده به‌منظور تولید HTML استاتیک بهبود می‌بخشند. آن‌ها برای کار با محیط‌های استریمی مانند Node.js Streams و Web Streams طراحی شده‌اند. برای مثال، در یک محیط Web Stream، می‌توانید یک درخت ری‌اکت را با `prerender` به HTML استاتیک pre-render کنید: 

```js
import { prerender } from 'react-dom/static';

async function handler(request) {
  const {prelude} = await prerender(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(prelude, {
    headers: { 'content-type': 'text/html' },
  });
}
```

APIهای Prerender پیش از بازگرداندن استریم HTML استاتیک، منتظر بارگذاری همهٔ داده‌ها می‌مانند. استریم‌ها می‌توانند به رشته تبدیل شوند، یا با یک پاسخ استریمی ارسال شوند. آن‌ها از محتوای استریمی هنگام بارگذاری پشتیبانی نمی‌کنند، که توسط [APIهای رندر سمت سرور موجود React DOM](/reference/react-dom/server) پشتیبانی می‌شود.

برای اطلاعات بیشتر، [APIهای استاتیک React DOM](/reference/react-dom/static) را ببینید.

## کامپوننت‌های سرور ری‌اکت {/*react-server-components*/}

### کامپوننت‌های سرور {/*server-components*/}

کامپوننت‌های سرور (Server Components) یک گزینهٔ جدید هستند که اجازه می‌دهند کامپوننت‌ها پیش از باندل‌شدن، در محیطی جدا از اپلیکیشن کلاینت یا سرور SSR شما، از پیش رندر شوند. این محیط جداگانه همان «سرور» در کامپوننت‌های سرور ری‌اکت است. کامپوننت‌های سرور می‌توانند یک‌بار در زمان build روی سرور CI شما اجرا شوند، یا می‌توانند برای هر درخواست با استفاده از یک وب‌سرور اجرا شوند.

React 19 شامل تمام قابلیت‌های کامپوننت‌های سرور ری‌اکت است که از کانال کاناری آمده‌اند. این بدان معناست که کتابخانه‌هایی که با کامپوننت‌های سرور منتشر می‌شوند اکنون می‌توانند React 19 را به‌عنوان یک peer dependency با یک [شرط export](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#react-server-conditional-exports) `react-server` هدف قرار دهند تا در فریم‌ورک‌هایی که از [معماری تمام‌استک ری‌اکت](/learn/creating-a-react-app#which-features-make-up-the-react-teams-full-stack-architecture-vision) پشتیبانی می‌کنند استفاده شوند.


<Note>

#### چگونه پشتیبانی از کامپوننت‌های سرور را بسازم؟ {/*how-do-i-build-support-for-server-components*/}

در حالی که کامپوننت‌های سرور ری‌اکت در React 19 پایدارند و بین نسخه‌های ماینور نمی‌شکنند، APIهای زیرین استفاده‌شده برای پیاده‌سازی یک باندلر یا فریم‌ورک کامپوننت‌های سرور ری‌اکت از semver پیروی نمی‌کنند و ممکن است بین نسخه‌های ماینور در React 19.x بشکنند.

برای پشتیبانی از کامپوننت‌های سرور ری‌اکت به‌عنوان یک باندلر یا فریم‌ورک، توصیه می‌کنیم به یک نسخهٔ خاص ری‌اکت پین کنید، یا از انتشار کاناری استفاده کنید. ما به همکاری با باندلرها و فریم‌ورک‌ها برای پایدارسازی APIهای استفاده‌شده برای پیاده‌سازی کامپوننت‌های سرور ری‌اکت در آینده ادامه خواهیم داد.

</Note>


برای اطلاعات بیشتر، مستندات [کامپوننت‌های سرور ری‌اکت](/reference/rsc/server-components) را ببینید.

### اکشن‌های سرور {/*server-actions*/}

اکشن‌های سرور (Server Actions) به کامپوننت‌های کلاینت اجازه می‌دهند توابع ناهمگام اجراشده روی سرور را فراخوانی کنند.

وقتی یک اکشن سرور با دستور `"use server"` تعریف می‌شود، فریم‌ورک شما به‌طور خودکار یک ارجاع به تابع سرور ایجاد می‌کند و آن ارجاع را به کامپوننت کلاینت ارسال می‌کند. وقتی آن تابع روی کلاینت فراخوانی می‌شود، ری‌اکت یک درخواست به سرور ارسال می‌کند تا تابع اجرا شود و نتیجه را بازمی‌گرداند.

<Note>

#### هیچ دستوری برای کامپوننت‌های سرور وجود ندارد. {/*there-is-no-directive-for-server-components*/}

یک سوءتفاهم رایج این است که کامپوننت‌های سرور با `"use server"` نشان داده می‌شوند، اما هیچ دستوری برای کامپوننت‌های سرور وجود ندارد. دستور `"use server"` برای اکشن‌های سرور استفاده می‌شود.

برای اطلاعات بیشتر، مستندات [دستورها (Directives)](/reference/rsc/directives) را ببینید.

</Note>

اکشن‌های سرور می‌توانند در کامپوننت‌های سرور ایجاد و به‌عنوان پراپس به کامپوننت‌های کلاینت ارسال شوند، یا می‌توانند در کامپوننت‌های کلاینت ایمپورت و استفاده شوند.

برای اطلاعات بیشتر، مستندات [اکشن‌های سرور ری‌اکت](/reference/rsc/server-functions) را ببینید.

## بهبودها در React 19 {/*improvements-in-react-19*/}

### `ref` به‌عنوان پراپس {/*ref-as-a-prop*/}

از React 19 به بعد، اکنون می‌توانید به `ref` به‌عنوان یک پراپس برای کامپوننت‌های تابعی دسترسی داشته باشید:

```js [[1, 1, "ref"], [1, 2, "ref", 45], [1, 6, "ref", 14]]
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}

//...
<MyInput ref={ref} />
```

کامپوننت‌های تابعی جدید دیگر به `forwardRef` نیاز نخواهند داشت، و ما یک کدماد برای به‌روزرسانی خودکار کامپوننت‌هایتان جهت استفاده از پراپس `ref` جدید منتشر خواهیم کرد. در نسخه‌های آتی، `forwardRef` را منسوخ و حذف خواهیم کرد.

<Note>

`ref`های ارسال‌شده به کلاس‌ها به‌عنوان پراپس ارسال نمی‌شوند زیرا به نمونهٔ کامپوننت ارجاع می‌دهند.

</Note>

### Diff برای خطاهای hydration {/*diffs-for-hydration-errors*/}

ما همچنین گزارش خطا برای خطاهای hydration در `react-dom` را بهبود دادیم. برای مثال، به‌جای لاگ‌کردن چندین خطا در حالت DEV بدون هیچ اطلاعاتی دربارهٔ عدم تطابق:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Warning: Text content did not match. Server: "Server" Client: "Client"
{'  '}at span
{'  '}at App

</ConsoleLogLine>

<ConsoleLogLine level="error">

Warning: An error occurred during hydration. The server HTML was replaced with client content in \<div\>.

</ConsoleLogLine>

<ConsoleLogLine level="error">

Warning: Text content did not match. Server: "Server" Client: "Client"
{'  '}at span
{'  '}at App

</ConsoleLogLine>

<ConsoleLogLine level="error">

Warning: An error occurred during hydration. The server HTML was replaced with client content in \<div\>.

</ConsoleLogLine>

<ConsoleLogLine level="error">

Uncaught Error: Text content does not match server-rendered HTML.
{'  '}at checkForUnmatchedText
{'  '}...

</ConsoleLogLine>

</ConsoleBlockMulti>

ما اکنون یک پیام واحد با diffِ عدم تطابق لاگ می‌کنیم:


<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Uncaught Error: Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if an SSR-ed Client Component used:{'\n'}
\- A server/client branch `if (typeof window !== 'undefined')`.
\- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
\- Date formatting in a user's locale which doesn't match the server.
\- External changing data without sending a snapshot of it along with the HTML.
\- Invalid HTML tag nesting.{'\n'}
It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.{'\n'}
https://react.dev/link/hydration-mismatch {'\n'}
{'  '}\<App\>
{'    '}\<span\>
{'+    '}Client
{'-    '}Server{'\n'}
{'  '}at throwOnHydrationMismatch
{'  '}...

</ConsoleLogLine>

</ConsoleBlockMulti>

### `<Context>` به‌عنوان ارائه‌دهنده {/*context-as-a-provider*/}

در React 19، می‌توانید `<Context>` را به‌عنوان یک ارائه‌دهنده به‌جای `<Context.Provider>` رندر کنید:


```js {5,7}
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}
```

ارائه‌دهنده‌های کانتکست جدید می‌توانند از `<Context>` استفاده کنند و ما یک کدماد برای تبدیل ارائه‌دهنده‌های موجود منتشر خواهیم کرد. در نسخه‌های آتی، `<Context.Provider>` را منسوخ خواهیم کرد.

### توابع پاکسازی برای رفرنس‌ها {/*cleanup-functions-for-refs*/}

ما اکنون از بازگرداندن یک تابع پاکسازی از کالبک‌های `ref` پشتیبانی می‌کنیم:

```js {7-9}
<input
  ref={(ref) => {
    // ref created

    // NEW: return a cleanup function to reset
    // the ref when element is removed from DOM.
    return () => {
      // ref cleanup
    };
  }}
/>
```

هنگام unmount شدن کامپوننت، ری‌اکت تابع پاکسازی بازگشت‌داده‌شده از کالبک `ref` را فراخوانی می‌کند. این برای رفرنس‌های DOM، رفرنس‌ها به کامپوننت‌های کلاسی، و `useImperativeHandle` کار می‌کند. 

<Note>

پیش‌تر، ری‌اکت توابع `ref` را هنگام unmount کردن کامپوننت با `null` فراخوانی می‌کرد. اگر `ref` شما یک تابع پاکسازی بازمی‌گرداند، ری‌اکت اکنون از این مرحله می‌گذرد.

در نسخه‌های آتی، فراخوانی رفرنس‌ها با `null` هنگام unmount کردن کامپوننت‌ها را منسوخ خواهیم کرد.

</Note>

به‌دلیل معرفی توابع پاکسازی رفرنس، بازگرداندن هر چیز دیگری از یک کالبک `ref` اکنون توسط TypeScript رد خواهد شد. رفع معمولاً این است که استفاده از بازگشت‌های ضمنی را متوقف کنید، برای مثال:

```diff [[1, 1, "("], [1, 1, ")"], [2, 2, "{", 15], [2, 2, "}", 1]]
- <div ref={current => (instance = current)} />
+ <div ref={current => {instance = current}} />
```

کد اصلی نمونهٔ `HTMLDivElement` را بازمی‌گرداند و TypeScript نمی‌دانست که آیا این _قرض_ است یک تابع پاکسازی باشد یا شما نمی‌خواسته‌اید تابع پاکسازی بازگردانید.

می‌توانید این الگو را با [`no-implicit-ref-callback-return`](https://github.com/eps1lon/types-react-codemod/#no-implicit-ref-callback-return) کدماد کنید.

### مقدار اولیهٔ `useDeferredValue` {/*use-deferred-value-initial-value*/}

ما یک گزینهٔ `initialValue` به `useDeferredValue` اضافه کرده‌ایم:

```js [[1, 1, "deferredValue"], [1, 4, "deferredValue"], [2, 4, "''"]]
function Search({deferredValue}) {
  // On initial render the value is ''.
  // Then a re-render is scheduled with the deferredValue.
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
````

وقتی <CodeStep step={2}>initialValue</CodeStep> ارائه شود، `useDeferredValue` آن را به‌عنوان `value` برای رندر اولیهٔ کامپوننت بازمی‌گرداند، و یک رندر مجدد در پس‌زمینه با <CodeStep step={1}>deferredValue</CodeStep> بازگشت‌داده‌شده زمان‌بندی می‌کند.

برای اطلاعات بیشتر، [`useDeferredValue`](/reference/react/useDeferredValue) را ببینید.

### پشتیبانی از فرادادهٔ سند {/*support-for-metadata-tags*/}

در HTML، تگ‌های فرادادهٔ سند مانند `<title>`، `<link>` و `<meta>` برای قرارگیری در بخش `<head>` سند رزرو شده‌اند. در ری‌اکت، ممکن است کامپوننتی که تصمیم می‌گیرد فرادادهٔ مناسب برای اپلیکیشن چیست، از محلی که `<head>` را رندر می‌کنید بسیار دور باشد، یا اصلاً ری‌اکت `<head>` را رندر نکند. در گذشته، این عناصر باید به‌صورت دستی در یک افکت، یا توسط کتابخانه‌هایی مانند [`react-helmet`](https://github.com/nfl/react-helmet) درج می‌شدند، و هنگام رندر سمت سرور یک اپلیکیشن ری‌اکت به مدیریت دقیقی نیاز داشتند. 

در React 19، ما پشتیبانی از رندر تگ‌های فرادادهٔ سند در کامپوننت‌ها را به‌صورت بومی اضافه می‌کنیم:

```js {5-8}
function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}
```

هنگام رندر این کامپوننت، ری‌اکت تگ‌های `<title>`، `<link>` و `<meta>` را می‌بیند و به‌طور خودکار آن‌ها را به بخش `<head>` سند بالا می‌برد. با پشتیبانی بومی از این تگ‌های فراداده، می‌توانیم اطمینان حاصل کنیم که با اپلیکیشن‌های صرفاً کلاینت، SSR استریمی و کامپوننت‌های سرور کار می‌کنند.

<Note>

#### ممکن است هنوز به یک کتابخانهٔ فراداده نیاز داشته باشید {/*you-may-still-want-a-metadata-library*/}

برای موارد استفادهٔ ساده، رندر فرادادهٔ سند به‌عنوان تگ ممکن است مناسب باشد، اما کتابخانه‌ها می‌توانند قابلیت‌های قدرتمندتری مانند بازنویسی فرادادهٔ عمومی با فرادادهٔ خاص بر اساس مسیر فعلی ارائه دهند. این قابلیت‌ها کار را برای فریم‌ورک‌ها و کتابخانه‌هایی مانند [`react-helmet`](https://github.com/nfl/react-helmet) برای پشتیبانی از تگ‌های فرادوده آسان‌تر می‌کند، نه آنکه جایگزین آن‌ها شود.

</Note>

برای اطلاعات بیشتر، مستندات [`<title>`](/reference/react-dom/components/title)، [`<link>`](/reference/react-dom/components/link) و [`<meta>`](/reference/react-dom/components/meta) را ببینید.

### پشتیبانی از استایل‌شیت‌ها {/*support-for-stylesheets*/}

استایل‌شیت‌ها، چه به‌صورت خارجی (`<link rel="stylesheet" href="...">`) چه inline (`<style>...</style>`)، به‌دلیل قواعد تقدم استایل، نیازمند موقعیت‌یابی دقیقی در DOM هستند. ساخت یک قابلیت استایل‌شیت که اجازهٔ ترکیب‌پذیری درون کامپوننت‌ها را بدهد دشوار است، بنابراین کاربران اغلب یا تمام استایل‌های خود را در فاصله‌ای دور از کامپوننت‌هایی که ممکن است به آن‌ها وابسته باشند بارگذاری می‌کنند، یا از یک کتابخانهٔ استایل استفاده می‌کنند که این پیچیدگی را کپسوله می‌کند.

در React 19، ما این پیچیدگی را برطرف کرده و یکپارچه‌سازی عمیق‌تری با رندر همزمان (Concurrent Rendering) در کلاینت و رندر استریمی در سرور با پشتیبانی داخلی از استایل‌شیت‌ها ارائه می‌کنیم. اگر `precedence` استایل‌شیت خود را به ری‌اکت بگویید، ترتیب درج استایل‌شیت در DOM را مدیریت می‌کند و اطمینان حاصل می‌کند که استایل‌شیت (در صورت خارجی‌بودن) پیش از آشکارکردن محتوایی که به آن قواعد استایل وابسته است، بارگذاری شده است.

```js {4,5,17}
function ComponentOne() {
  return (
    <Suspense fallback="loading...">
      <link rel="stylesheet" href="foo" precedence="default" />
      <link rel="stylesheet" href="bar" precedence="high" />
      <article class="foo-class bar-class">
        {...}
      </article>
    </Suspense>
  )
}

function ComponentTwo() {
  return (
    <div>
      <p>{...}</p>
      <link rel="stylesheet" href="baz" precedence="default" />  <-- will be inserted between foo & bar
    </div>
  )
}
```

در حین رندر سمت سرور، ری‌اکت استایل‌شیت را در `<head>` قرار می‌دهد که اطمینان حاصل می‌کند مرورگر تا زمان بارگذاری، paint نخواهد کرد. اگر استایل‌شیت پس از آنکه از قبل استریم را آغاز کرده‌ایم، دیر کشف شود، ری‌اکت اطمینان حاصل می‌کند که استایل‌شیت در `<head>` کلاینت پیش از آشکارکردن محتوای یک مرز ساسپنس که به آن استایل‌شیت وابسته است، درج شود.

در حین رندر سمت کلاینت، ری‌اکت پیش از کامیت رندر، منتظر بارگذاری استایل‌شیت‌های تازه رندرشده می‌ماند. اگر این کامپوننت را از چندین مکان در اپلیکیشن خود رندر کنید، ری‌اکت فقط یک‌بار استایل‌شیت را در سند درج می‌کند:

```js {5}
function App() {
  return <>
    <ComponentOne />
    ...
    <ComponentOne /> // won't lead to a duplicate stylesheet link in the DOM
  </>
}
```

برای کاربرانی که به بارگذاری دستی استایل‌شیت‌ها عادت دارند، این فرصتی است تا آن استایل‌شیت‌ها را در کنار کامپوننت‌هایی که به آن‌ها وابسته‌اند قرار دهید که امکان استدلال محلی بهتر و آسان‌تری برای اطمینان از بارگذاری فقط استایل‌شیت‌هایی که واقعاً به آن‌ها وابسته‌اید را فراهم می‌کند.

کتابخانه‌های استایل و یکپارچه‌سازی‌های استایل با باندلرها نیز می‌توانند این قابلیت جدید را به کار بگیرند، بنابراین حتی اگر مستقیماً استایل‌شیت‌های خود را رندر نکنید، با ارتقای ابزارهایتان به استفاده از این قابلیت بهره خواهند برد.

برای جزئیات بیشتر، مستندات [`<link>`](/reference/react-dom/components/link) و [`<style>`](/reference/react-dom/components/style) را بخوانید.

### پشتیبانی از اسکریپت‌های ناهمگام {/*support-for-async-scripts*/}

در HTML، اسکریپت‌های معمولی (`<script src="...">`) و اسکریپت‌های معوق‌شده (`<script defer="" src="...">`) به ترتیب سند بارگذاری می‌شوند که رندر این نوع اسکریپت‌ها در عمق درخت کامپوننت‌تان را چالش‌برانگیز می‌کند. با این حال، اسکریپت‌های ناهمگام (`<script async="" src="...">`) به ترتیب دلخواه بارگذاری می‌شوند.

در React 19 ما پشتیبانی بهتری برای اسکریپت‌های ناهمگام گنجانده‌ایم با اجازه به شما برای رندر آن‌ها در هر نقطه از درخت کامپوننت، درون کامپوننت‌هایی که واقعاً به اسکریپت وابسته‌اند، بدون نیاز به مدیریت جابجایی مجدد و حذف تکراری نمونه‌های اسکریپت.

```js {4,15}
function MyComponent() {
  return (
    <div>
      <script async={true} src="..." />
      Hello World
    </div>
  )
}

function App() {
  <html>
    <body>
      <MyComponent>
      ...
      <MyComponent> // won't lead to duplicate script in the DOM
    </body>
  </html>
}
```

در همهٔ محیط‌های رندر، اسکریپت‌های ناهمگام حذف تکراری می‌شوند تا ری‌اکت فقط یک‌بار اسکریپت را بارگذاری و اجرا کند حتی اگر توسط چندین کامپوننت متفاوت رندر شود.

در رندر سمت سرور، اسکریپت‌های ناهمگام در `<head>` گنجانده می‌شوند و پشت منابع بحرانی‌تری که paint را مسدود می‌کنند مانند استایل‌شیت‌ها، فونت‌ها و پیش‌بارگذاری‌های تصویر اولویت‌بندی می‌شوند.

برای جزئیات بیشتر، مستندات [`<script>`](/reference/react-dom/components/script) را بخوانید.

### پشتیبانی از پیش‌بارگذاری منابع {/*support-for-preloading-resources*/}

در حین بارگذاری اولیهٔ سند و در به‌روزرسانی‌های سمت کلاینت، آگاه‌کردن مرورگر از منابعی که احتمالاً باید در اولین فرصت بارگذاری شوند، می‌تواند تأثیر چشمگیری بر عملکرد صفحه داشته باشد.

React 19 شامل تعدادی API جدید برای بارگذاری و پیش‌بارگذاری منابع مرورگر است تا ساخت تجربه‌های عالی که توسط بارگذاری ناکارآمد منابع محدود نمی‌شوند، تا حد ممکن آسان شود.

```js
import { prefetchDNS, preconnect, preload, preinit } from 'react-dom'
function MyComponent() {
  preinit('https://.../path/to/some/script.js', {as: 'script' }) // loads and executes this script eagerly
  preload('https://.../path/to/font.woff', { as: 'font' }) // preloads this font
  preload('https://.../path/to/stylesheet.css', { as: 'style' }) // preloads this stylesheet
  prefetchDNS('https://...') // when you may not actually request anything from this host
  preconnect('https://...') // when you will request something but aren't sure what
}
```
```html
<!-- the above would result in the following DOM/HTML -->
<html>
  <head>
    <!-- links/scripts are prioritized by their utility to early loading, not call order -->
    <link rel="prefetch-dns" href="https://...">
    <link rel="preconnect" href="https://...">
    <link rel="preload" as="font" href="https://.../path/to/font.woff">
    <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">
    <script async="" src="https://.../path/to/some/script.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

این APIها می‌توانند برای بهینه‌سازی بارگذاری‌های اولیهٔ صفحه با انتقال کشف منابع اضافی مانند فونت‌ها از بارگذاری استایل‌شیت استفاده شوند. همچنین می‌توانند به‌روزرسانی‌های کلاینت را با prefetch کردن فهرستی از منابع استفاده‌شده توسط یک ناوبری مورد انتظار و سپس پیش‌بارگذاری eager آن منابع هنگام کلیک یا حتی hover، سریع‌تر کنند.

برای جزئیات بیشتر، [APIهای پیش‌بارگذاری منابع](/reference/react-dom#resource-preloading-apis) را ببینید.

### سازگاری با اسکریپت‌ها و افزونه‌های شخص ثالث {/*compatibility-with-third-party-scripts-and-extensions*/}

ما hydration را برای در نظر گرفتن اسکریپت‌های شخص ثالث و افزونه‌های مرورگر بهبود داده‌ایم.

هنگام hydration، اگر عنصری که روی کلاینت رندر می‌شود با عنصر یافت‌شده در HTML از سرور تطابق نداشته باشد، ری‌اکت یک رندر مجدد کلاینت را برای رفع محتوا اجبار می‌کند. پیش‌تر، اگر عنصری توسط اسکریپت‌های شخص ثالث یا افزونه‌های مرورگر درج شده بود، یک خطای عدم تطابق و رندر کلاینت را ایجاد می‌کرد.

در React 19، تگ‌های غیرمنتظره در `<head>` و `<body>` نادیده گرفته می‌شوند تا از خطاهای عدم تطابق جلوگیری شود. اگر ری‌اکت به‌دلیل یک عدم تطابق hydration نامرتبط نیاز به رندر مجدد کل سند داشته باشد، استایل‌شیت‌های درج‌شده توسط اسکریپت‌های شخص ثالث و افزونه‌های مرورگر را در جای خود نگه می‌دارد.

### گزارش خطای بهتر {/*error-handling*/}

ما مدیریت خطا در React 19 را بهبود دادیم تا از تکراری‌شدن جلوگیری شود و گزینه‌هایی برای مدیریت خطاهای دریافت‌شده و دریافت‌نشده ارائه شود. برای مثال، وقتی خطایی در رندر توسط یک Error Boundary دریافت می‌شود، پیش‌تر ری‌اکت خطا را دو بار پرتاب می‌کرد (یک‌بار برای خطای اصلی، سپس دوباره پس از شکست در بازیابی خودکار)، و سپس `console.error` را با اطلاعاتی دربارهٔ محل وقوع خطا فراخوانی می‌کرد. 

این منجر به سه خطا برای هر خطای دریافت‌شده می‌شد:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Uncaught Error: hit
{'  '}at Throws
{'  '}at renderWithHooks
{'  '}...

</ConsoleLogLine>

<ConsoleLogLine level="error">

Uncaught Error: hit<span className="ms-2 text-gray-30">{'    <--'} Duplicate</span>
{'  '}at Throws
{'  '}at renderWithHooks
{'  '}...

</ConsoleLogLine>

<ConsoleLogLine level="error">

The above error occurred in the Throws component:
{'  '}at Throws
{'  '}at ErrorBoundary
{'  '}at App{'\n'}
React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.

</ConsoleLogLine>

</ConsoleBlockMulti>

در React 19، ما یک خطای واحد با تمام اطلاعات خطا لاگ می‌کنیم:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Error: hit
{'  '}at Throws
{'  '}at renderWithHooks
{'  '}...{'\n'}
The above error occurred in the Throws component:
{'  '}at Throws
{'  '}at ErrorBoundary
{'  '}at App{'\n'}
React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
{'  '}at ErrorBoundary
{'  '}at App

</ConsoleLogLine>

</ConsoleBlockMulti>

علاوه بر این، ما دو گزینهٔ ریشهٔ جدید برای تکمیل `onRecoverableError` اضافه کرده‌ایم:

- `onCaughtError`: هنگامی که ری‌اکت خطایی را در یک Error Boundary دریافت می‌کند فراخوانی می‌شود.
- `onUncaughtError`: هنگامی که خطایی پرتاب می‌شود و توسط یک Error Boundary دریافت نمی‌شود فراخوانی می‌شود.
- `onRecoverableError`: هنگامی که خطایی پرتاب می‌شود و به‌طور خودکار بازیابی می‌گردد فراخوانی می‌شود.

برای اطلاعات بیشتر و مثال‌ها، مستندات [`createRoot`](/reference/react-dom/client/createRoot) و [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را ببینید.

### پشتیبانی از Custom Elements {/*support-for-custom-elements*/}

React 19 پشتیبانی کامل از custom elements اضافه می‌کند و تمام آزمون‌های [Custom Elements Everywhere](https://custom-elements-everywhere.com/) را با موفقیت گذرانده است.

در نسخه‌های گذشته، استفاده از Custom Elements در ری‌اکت دشوار بود زیرا ری‌اکت پراپسهای تشخیص‌داده‌نشده را به‌عنوان attribute به‌جای property در نظر می‌گرفت. در React 19، ما پشتیبانی از propertyها را با استراتژی زیر اضافه کرده‌ایم که روی کلاینت و در حین SSR کار می‌کند:

- **رندر سمت سرور**: پراپسهای ارسال‌شده به یک custom element اگر نوعشان یک مقدار اولیه مانند `string`، `number` باشد، یا مقدار `true` باشد، به‌عنوان attribute رندر می‌شوند. پراپسهای با انواع غیراولیه مانند `object`، `symbol`، `function`، یا مقدار `false` حذف خواهند شد.
- **رندر سمت کلاینت**: پراپسهایی که با یک property روی نمونهٔ Custom Element تطابق دارند به‌عنوان property اختصاص داده می‌شوند، در غیر این صورت به‌عنوان attribute اختصاص داده می‌شوند.

از [Joey Arhar](https://github.com/josepharhar) برای رهبری طراحی و پیاده‌سازی پشتیبانی از Custom Element در ری‌اکت سپاسگزاریم.


#### نحوهٔ ارتقا {/*how-to-upgrade*/}
برای دستورالعمل‌های گام‌به‌گام و فهرست کامل تغییرات از بین‌برنده و قابل‌توجه، [راهنمای ارتقا به React 19](/blog/2024/04/25/react-19-upgrade-guide) را ببینید.

_یادداشت: این پست در ابتدا در 25/04/2024 منتشر شد و با انتشار پایدار به 05/12/2024 به‌روزرسانی شده است._
