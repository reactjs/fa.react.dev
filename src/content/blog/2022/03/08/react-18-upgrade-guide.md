---
title: "چگونه به React 18 ارتقا یابیم"
author: Rick Hanlon
date: 2022/03/08
description: As we shared in the release post, React 18 introduces features powered by our new concurrent renderer, with a gradual adoption strategy for existing applications. In this post, we will guide you through the steps for upgrading to React 18.
---

March 08, 2022 by [Rick Hanlon](https://twitter.com/rickhanlonii)

---

<Intro>

همان‌طور که در [پست انتشار](/blog/2022/03/29/react-v18) به اشتراک گذاشتیم، React 18 قابلیت‌هایی را معرفی می‌کند که توسط رندرر همزمان (Concurrent) جدید ما نیرو می‌گیرند، با استراتژی پذیرش تدریجی برای برنامه‌های موجود. در این پست، شما را در مراحل ارتقا به React 18 راهنمایی می‌کنیم.

لطفاً هر مشکلی را که هنگام ارتقا به React 18 با آن روبه‌رو می‌شوید [گزارش کنید](https://github.com/facebook/react/issues/new/choose).

</Intro>

<Note>

برای کاربران React Native، React 18 در یک نسخهٔ آیندهٔ React Native منتشر خواهد شد. این به این دلیل است که React 18 برای بهره‌مندی از قابلیت‌های جدید ارائه‌شده در این پست بلاگ به معماری جدید React Native وابسته است. برای اطلاعات بیشتر، [سخنرانی اصلی React Conf را اینجا ببینید](https://www.youtube.com/watch?v=FZ0cG47msEk&t=1530s).

</Note>

---

## نصب {/*installing*/}

برای نصب آخرین نسخهٔ ری‌اکت:

```bash
npm install react react-dom
```

یا اگر از yarn استفاده می‌کنید:

```bash
yarn add react react-dom
```

## به‌روزرسانی‌های APIهای رندر سمت کلاینت {/*updates-to-client-rendering-apis*/}

وقتی برای اولین بار React 18 را نصب می‌کنید، یک هشدار در کنسول خواهید دید:

<ConsoleBlock level="error">

ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

</ConsoleBlock>

React 18 یک API ریشه (root) جدید معرفی می‌کند که ارگونومی بهتری برای مدیریت ریشه‌ها ارائه می‌دهد. API ریشهٔ جدید همچنین رندرر همزمان (Concurrent) جدید را فعال می‌کند، که به شما اجازه می‌دهد در قابلیت‌های همزمان شرکت کنید.

```js
// Before
import { render } from 'react-dom';
const container = document.getElementById('app');
render(<App tab="home" />, container);

// After
import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
```

ما همچنین `unmountComponentAtNode` را به `root.unmount` تغییر داده‌ایم:

```js
// Before
unmountComponentAtNode(container);

// After
root.unmount();
```

ما همچنین کالبک را از render حذف کرده‌ایم، زیرا معمولاً هنگام استفاده از ساسپنس (Suspense) نتیجهٔ مورد انتظار را ندارد:

```js
// Before
const container = document.getElementById('app');
render(<App tab="home" />, container, () => {
  console.log('rendered');
});

// After
function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('rendered');
  });

  return <App tab="home" />
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<AppWithCallbackAfterRender />);
```

<Note>

هیچ جایگزین یک‌به‌یک برای API کالبک render قدیمی وجود ندارد — این به مورد استفادهٔ شما بستگی دارد. برای اطلاعات بیشتر، پست گروه کاری درباره [جایگزینی render با createRoot](https://github.com/reactwg/react-18/discussions/5) را ببینید.

</Note>

در نهایت، اگر برنامه‌تان از رندر سمت سرور با hydration استفاده می‌کند، `hydrate` را به `hydrateRoot` ارتقا دهید:

```js
// Before
import { hydrate } from 'react-dom';
const container = document.getElementById('app');
hydrate(<App tab="home" />, container);

// After
import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = hydrateRoot(container, <App tab="home" />);
// Unlike with createRoot, you don't need a separate root.render() call here.
```

برای اطلاعات بیشتر، [بحث گروه کاری را اینجا ببینید](https://github.com/reactwg/react-18/discussions/5).

<Note>

**اگر برنامهٔ شما پس از ارتقا کار نمی‌کند، بررسی کنید که آیا در `<StrictMode>` پیچیده شده است.** [حالت سخت‌گیرانه (Strict Mode) در React 18 سخت‌گیرانه‌تر شده است](#updates-to-strict-mode)، و ممکن است همهٔ کامپوننت‌های شما در برابر بررسی‌های جدیدی که در حالت توسعه اضافه می‌کند مقاوم نباشند. اگر حذف Strict Mode برنامهٔ شما را اصلاح می‌کند، می‌توانید آن را در طول ارتقا حذف کنید، و سپس (یا در بالای درخت کامپوننت یا برای بخشی از آن) پس از رفع مشکلاتی که به آن‌ها اشاره می‌کند، دوباره اضافه‌اش کنید.

</Note>

## به‌روزرسانی‌های APIهای رندر سمت سرور {/*updates-to-server-rendering-apis*/}

در این انتشار، ما APIهای `react-dom/server` خود را برای پشتیبانی کامل از ساسپنس (Suspense) روی سرور و Streaming SSR بازطراحی می‌کنیم. به‌عنوان بخشی از این تغییرات، ما API استریمی قدیمی Node را منسوخ می‌کنیم، که از استریم تدریجی ساسپنس روی سرور پشتیبانی نمی‌کند.

استفاده از این API اکنون هشدار خواهد داد:

* `renderToNodeStream`: **منسوخ‌شده ⛔️️**

در عوض، برای استریم در محیط‌های Node، از این استفاده کنید:
* `renderToPipeableStream`: **جدید ✨**

ما همچنین یک API جدید برای پشتیبانی از Streaming SSR با ساسپنس برای محیط‌های اجرایی مدرن لبه (edge)، مانند Deno و Cloudflare workers معرفی می‌کنیم:
* `renderToReadableStream`: **جدید ✨**

APIهای زیر به کار خود ادامه خواهند داد، اما با پشتیبانی محدود از ساسپنس:
* `renderToString`: **محدود** ⚠️
* `renderToStaticMarkup`: **محدود** ⚠️

در نهایت، این API برای رندر ایمیل‌ها به کار خود ادامه خواهد داد:
* `renderToStaticNodeStream`

برای اطلاعات بیشتر دربارهٔ تغییرات APIهای رندر سرور، پست گروه کاری درباره [ارتقا به React 18 روی سرور](https://github.com/reactwg/react-18/discussions/22)، یک [بررسی عمیق بر معماری جدید SSR با ساسپنس](https://github.com/reactwg/react-18/discussions/37) و سخنرانی [Shaundai Person](https://twitter.com/shaundai) درباره [رندر سرور استریمی با ساسپنس](https://www.youtube.com/watch?v=pj5N-Khihgc) در React Conf 2021 را ببینید.

## به‌روزرسانی‌های تعاریف TypeScript {/*updates-to-typescript-definitions*/}

اگر پروژهٔ شما از TypeScript استفاده می‌کند، باید وابستگی‌های `@types/react` و `@types/react-dom` خود را به آخرین نسخه‌ها ارتقا دهید. تایپ‌های جدید امن‌تر هستند و مشکلاتی را که قبلاً توسط چک‌کنندهٔ تایپ نادیده گرفته می‌شد، شناسایی می‌کنند. قابل‌توجه‌ترین تغییر این است که پراپ `children` اکنون هنگام تعریف پراپس باید به‌صورت صریح فهرست شود، برای مثال:

```typescript{3}
interface MyButtonProps {
  color: string;
  children?: React.ReactNode;
}
```

برای فهرست کامل تغییرات فقط-تایپ، [pull request تایپ‌های React 18](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210) را ببینید. این به نمونه‌های رفع مشکل در تایپ‌های کتابخانه‌ها پیوند دارد تا ببینید چگونه کدتان را تنظیم کنید. می‌توانید از [اسکریپت مهاجرت خودکار](https://github.com/eps1lon/types-react-codemod) برای کمک به انتقال سریع‌تر کد برنامه‌تان به تایپ‌های جدید و امن‌تر استفاده کنید.

اگر باگی در تایپ‌ها پیدا کردید، لطفاً یک issue در مخزن DefinitelyTyped [ثبت کنید](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/new?category=issues-with-a-types-package).

## دسته‌بندی خودکار (Automatic Batching) {/*automatic-batching*/}

React 18 با انجام دسته‌بندی (Batching) بیشتر به‌صورت پیش‌فرض، بهبودهای کارایی خارج‌از-جعبه اضافه می‌کند. دسته‌بندی (Batching) زمانی است که ری‌اکت چندین به‌روزرسانی استیت را در یک رندر مجدد گروه‌بندی می‌کند تا کارایی بهتر شود. قبل از React 18، ما فقط به‌روزرسانی‌های داخل هندلرهای رویداد ری‌اکت را دسته‌بندی می‌کردیم. به‌روزرسانی‌های داخل پرامیس‌ها، setTimeout، هندلرهای رویداد بومی، یا هر رویداد دیگری به‌صورت پیش‌فرض در ری‌اکت دسته‌بندی نمی‌شدند:

```js
// Before React 18 only React events were batched

function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);
```


شروع از React 18 با `createRoot`، همهٔ به‌روزرسانی‌ها به‌طور خودکار دسته‌بندی خواهند شد، مهم نیست از کجا منشأ می‌گیرند. این بدان معناست که به‌روزرسانی‌های داخل timeoutها، پرامیس‌ها، هندلرهای رویداد بومی یا هر رویداد دیگر به همان روش به‌روزرسانی‌های داخل رویدادهای ری‌اکت دسته‌بندی خواهند شد:

```js
// After React 18 updates inside of timeouts, promises,
// native event handlers or any other event are batched.

function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}

setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);
```

این یک تغییر شکستن‌کننده است، اما انتظار داریم منجر به کار کمتر برای رندر، و در نتیجه کارایی بهتر در برنامه‌های شما شود. برای انصراف از دسته‌بندی خودکار، می‌توانید از `flushSync` استفاده کنید:

```js
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag(f => !f);
  });
  // React has updated the DOM by now
}
```

برای اطلاعات بیشتر، [بررسی عمیق دسته‌بندی خودکار (Automatic Batching)](https://github.com/reactwg/react-18/discussions/21) را ببینید.

## APIهای جدید برای کتابخانه‌ها {/*new-apis-for-libraries*/}

در گروه کاری React 18 با نگهداران کتابخانه‌ها کار کردیم تا APIهای جدید مورد نیاز برای پشتیبانی از رندر همزمان (Concurrent) برای موارد استفادهٔ خاص حوزه‌هایی مانند استایل‌ها و استورهای خارجی ایجاد کنیم. برای پشتیبانی از React 18، ممکن است برخی کتابخانه‌ها نیاز به سوییچ به یکی از APIهای زیر داشته باشند:

* `useSyncExternalStore` یک هوک جدید است که به استورهای خارجی اجازه می‌دهد با اجبار به‌روزرسانی‌های استور به‌صورت همگام، از خواندهای همزمان پشتیبانی کنند. این API جدید برای هر کتابخانه‌ای که با استیت خارج از ری‌اکت یکپارچه می‌شود توصیه می‌شود. برای اطلاعات بیشتر، [پست مرور useSyncExternalStore](https://github.com/reactwg/react-18/discussions/70) و [جزئیات API useSyncExternalStore](https://github.com/reactwg/react-18/discussions/86) را ببینید.
* `useInsertionEffect` یک هوک جدید است که به کتابخانه‌های CSS-in-JS اجازه می‌دهد مشکلات کارایی تزریق استایل‌ها در رندر را برطرف کنند. مگر آنکه قبلاً یک کتابخانهٔ CSS-in-JS ساخته باشید، انتظار نداریم تا به حال از این استفاده کنید. این هوک پس از جهش DOM اجرا خواهد شد، اما قبل از آنکه افکت‌های چیدمان (layout effects) چیدمان جدید را بخوانند. این مشکلی را که قبلاً در React 17 و پایین‌تر وجود داشت حل می‌کند، اما در React 18 حتی مهم‌تر است زیرا ری‌اکت در طول رندر همزمان به مرورگر اجازه می‌دهد، و به آن فرصت محاسبهٔ دوبارهٔ چیدمان را می‌دهد. برای اطلاعات بیشتر، [راهنمای ارتقای کتابخانه برای `<style>`](https://github.com/reactwg/react-18/discussions/110) را ببینید.

React 18 همچنین APIهای جدیدی برای رندر همزمان مانند `startTransition`، `useDeferredValue` و `useId` معرفی می‌کند، که ما دربارهٔ آن‌ها در [پست انتشار](/blog/2022/03/29/react-v18) بیشتر به اشتراک می‌گذاریم.

## به‌روزرسانی‌های حالت سخت‌گیرانه (Strict Mode) {/*updates-to-strict-mode*/}

در آینده، ما دوست داریم قابلیتی اضافه کنیم که به ری‌اکت اجازه می‌دهد بخش‌هایی از رابط کاربری را ضمن حفظ استیت اضافه و حذف کند. برای مثال، وقتی کاربر از یک صفحه به تب دیگری می‌رود و برمی‌گردد، ری‌اکت باید بتواند بلافاصله صفحهٔ قبلی را نمایش دهد. برای این کار، ری‌اکت درخت‌ها را با استفاده از همان استیت کامپوننت قبلی unmount و مجدداً mount می‌کند.

این قابلیت به ری‌اکت کارایی بهتر خارج‌از-جعبه می‌دهد، اما نیازمند آن است که کامپوننت‌ها در برابر افکت‌هایی که چندین بار mount و از بین می‌روند مقاوم باشند. بیشتر افکت‌ها بدون هیچ تغییری کار خواهند کرد، اما برخی افکت‌ها فرض می‌کنند فقط یک بار mount یا از بین می‌روند.

برای کمک به آشکار کردن این مشکلات، React 18 یک بررسی فقط-توسعهٔ جدید به حالت سخت‌گیرانه (Strict Mode) اضافه می‌کند. این بررسی جدید به‌طور خودکار هر کامپوننت را unmount و مجدداً mount می‌کند، هر بار که کامپوننتی برای اولین بار mount می‌شود، و استیت قبلی را روی mount دوم بازگردانده می‌شود.

قبل از این تغییر، ری‌اکت کامپوننت را mount می‌کرد و افکت‌ها را ایجاد می‌کرد:

```
* React mounts the component.
    * Layout effects are created.
    * Effect effects are created.
```

با حالت سخت‌گیرانه در React 18، ری‌اکت در حالت توسعه unmount و mount مجدد کامپوننت را شبیه‌سازی می‌کند:

```
* React mounts the component.
    * Layout effects are created.
    * Effect effects are created.
* React simulates unmounting the component.
    * Layout effects are destroyed.
    * Effects are destroyed.
* React simulates mounting the component with the previous state.
    * Layout effect setup code runs
    * Effect setup code runs
```

برای اطلاعات بیشتر، پست‌های گروه کاری درباره [افزودن استیت قابل‌استفادهٔ مجدد به StrictMode](https://github.com/reactwg/react-18/discussions/19) و [نحوهٔ پشتیبانی از استیت قابل‌استفادهٔ مجدد در افکت‌ها](https://github.com/reactwg/react-18/discussions/18) را ببینید.

## پیکربندی محیط تست خود {/*configuring-your-testing-environment*/}

وقتی برای اولین بار تست‌های خود را برای استفاده از `createRoot` به‌روز می‌کنید، ممکن است این هشدار را در کنسول تست خود ببینید:

<ConsoleBlock level="error">

The current testing environment is not configured to support act(...)

</ConsoleBlock>

برای رفع این مشکل، `globalThis.IS_REACT_ACT_ENVIRONMENT` را پیش از اجرای تست به `true` تنظیم کنید:

```js
// In your test setup file
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
```

هدف این فلگ این است که به ری‌اکت بگوید در محیطی شبیه تست واحد اجرا می‌شود. ری‌اکت هشدارهای مفیدی را ثبت می‌کند اگر فراموش کنید یک به‌روزرسانی را با `act` بپیچید.

همچنین می‌توانید فلگ را به `false` تنظیم کنید تا به ری‌اکت بگویید `act` لازم نیست. این می‌تواند برای تست‌های سرتاسری (end-to-end) که یک محیط مرورگر کامل را شبیه‌سازی می‌کنند مفید باشد.

در نهایت، ما انتظار داریم کتابخانه‌های تست این کار را به‌صورت خودکار برای شما پیکربندی کنند. برای مثال، [نسخهٔ بعدی React Testing Library پشتیبانی داخلی برای React 18 دارد](https://github.com/testing-library/react-testing-library/issues/509#issuecomment-917989936) بدون نیاز به پیکربندی اضافی.

[اطلاعات بیشتر دربارهٔ API تست `act` و تغییرات مرتبط](https://github.com/reactwg/react-18/discussions/102) در گروه کاری در دسترس است.

## توقف پشتیبانی از Internet Explorer {/*dropping-support-for-internet-explorer*/}

در این انتشار، ری‌اکت پشتیبانی از Internet Explorer را متوقف می‌کند، که [در ۱۵ ژوئن ۲۰۲۲ از پشتیبانی خارج می‌شود](https://blogs.windows.com/windowsexperience/2021/05/19/the-future-of-internet-explorer-on-windows-10-is-in-microsoft-edge). ما این تغییر را اکنون انجام می‌دهیم زیرا قابلیت‌های جدید معرفی‌شده در React 18 با استفاده از قابلیت‌های مرورگر مدرن مانند microtasks ساخته شده‌اند که نمی‌توانند به‌طور کافی در IE پولیفیل شوند.

اگر نیاز به پشتیبانی از Internet Explorer دارید، توصیه می‌کنیم با React 17 بمانید.

## منسوخ‌شدگی‌ها {/*deprecations*/}

* `react-dom`: `ReactDOM.render` منسوخ شده است. استفاده از آن هشدار می‌دهد و برنامهٔ شما را در حالت React 17 اجرا می‌کند.
* `react-dom`: `ReactDOM.hydrate` منسوخ شده است. استفاده از آن هشدار می‌دهد و برنامهٔ شما را در حالت React 17 اجرا می‌کند.
* `react-dom`: `ReactDOM.unmountComponentAtNode` منسوخ شده است.
* `react-dom`: `ReactDOM.renderSubtreeIntoContainer` منسوخ شده است.
* `react-dom/server`: `ReactDOMServer.renderToNodeStream` منسوخ شده است.

## سایر تغییرات شکستن‌کننده {/*other-breaking-changes*/}

* **زمان‌بندی یکنواخت useEffect**: ری‌اکت اکنون همیشه تابع‌های افکت را به‌صورت همگام flush می‌کند اگر به‌روزرسانی در طول یک رویداد ورودی گسستهٔ کاربر مانند کلیک یا keydown راه‌اندازی شده باشد. قبلاً، این رفتار همیشه قابل پیش‌بینی یا یکنواخت نبود.
* **خطاهای hydration سخت‌گیرانه‌تر**: عدم تطابق‌های hydration به‌دلیل محتوای متنی مفقود یا اضافی اکنون به‌جای هشدار مانند خطا رفتار می‌شوند. ری‌اکت دیگر تلاش نمی‌کند گره‌های منفرد را با درج یا حذف یک گره روی کلاینت برای تطابق با نشانه‌گذاری سرور «اصلاح» کند، و در عوض به رندر کلاینت تا نزدیک‌ترین مرز `<Suspense>` در درخت بازمی‌گردد. این امر تضمین می‌کند که درخت hydrated یکنواخت است و از حفره‌های احتمالی حریم خصوصی و امنیتی که می‌تواند ناشی از عدم تطابق‌های hydration باشد جلوگیری می‌کند.
* **درخت‌های ساسپنس (Suspense) همیشه یکنواخت هستند:** اگر کامپوننتی قبل از افزودن کامل به درخت suspend شود، ری‌اکت آن را در حالت ناقص به درخت اضافه نمی‌کند یا افکت‌هایش را اجرا نمی‌کند. در عوض، ری‌اکت درخت جدید را به‌طور کامل دور می‌ریزد، منتظر می‌ماند تا عملیات ناهمگام به پایان برسد، و سپس رندر را از نو امتحان می‌کند. ری‌اکت تلاش مجدد رندر را به‌صورت همزمان و بدون مسدود کردن مرورگر انجام می‌دهد.
* **افکت‌های چیدمان (Layout Effects) با ساسپنس**: وقتی یک درخت دوباره suspend می‌شود و به fallback بازمی‌گردد، ری‌اکت اکنون افکت‌های چیدمان را پاک می‌کند، و سپس آن‌ها را هنگام نمایش دوبارهٔ محتوای داخل مرز بازسازی می‌کند. این مشکلی را که مانع از اندازه‌گیری صحیح چیدمان توسط کتابخانه‌های کامپوننت هنگام استفاده با ساسپنس می‌شد اصلاح می‌کند.
* **نیازمندی‌های جدید محیط JS**: ری‌اکت اکنون به قابلیت‌های مرورگرهای مدرن از جمله `Promise`، `Symbol` و `Object.assign` وابسته است. اگر از مرورگرها و دستگاه‌های قدیمی مانند Internet Explorer که قابلیت‌های مرورگر مدرن را به‌صورت بومی ارائه نمی‌کنند یا پیاده‌سازی‌های ناقص دارند پشتیبانی می‌کنید، در نظر بگیرید که یک پولیفیل جهانی در برنامهٔ باندل‌شدهٔ خود قرار دهید.

## سایر تغییرات قابل‌توجه {/*other-notable-changes*/}

### React {/*react*/}

* **کامپوننت‌ها اکنون می‌توانند `undefined` را رندر کنند:** ری‌اکت دیگر اگر `undefined` را از کامپوننتی بازگردانید هشدار نمی‌دهد. این کار مقادیر بازگشتی مجاز کامپوننت را با مقادیری که در وسط درخت کامپوننت مجاز هستند یکنواخت می‌کند. پیشنهاد می‌کنیم از یک linter برای جلوگیری از اشتباهاتی مانند فراموش کردن عبارت `return` قبل از JSX استفاده کنید.
* **در تست‌ها، هشدارهای `act` اکنون اختیاری هستند:** اگر در حال اجرای تست‌های سرتاسری (end-to-end) هستید، هشدارهای `act` غیرضروری هستند. ما یک مکانیزم [اختیاری](https://github.com/reactwg/react-18/discussions/102) معرفی کرده‌ایم تا بتوانید آن‌ها را فقط برای تست‌های واحدی که مفید و سودمند هستند فعال کنید.
* **هیچ هشدار دربارهٔ `setState` روی کامپوننت‌های unmount‌شده:** قبلاً، ری‌اکت هنگام فراخوانی `setState` روی کامپوننت unmount‌شده درباره نشت حافظه هشدار می‌داد. این هشدار برای اشتراک‌ها اضافه شده بود، اما افراد عمدتاً در سناریوهایی با آن روبه‌رو می‌شدند که تنظیم استیت در آنجا مشکلی ندارد، و راه‌حل‌های جایگزین کد را بدتر می‌کنند. ما این هشدار را [حذف کرده‌ایم](https://github.com/facebook/react/pull/22114).
* **عدم سرکوب لاگ‌های کنسول:** وقتی از حالت سخت‌گیرانه (Strict Mode) استفاده می‌کنید، ری‌اکت هر کامپوننت را دو بار رندر می‌کند تا به شما در یافتن عوارض جانبی غیرمنتظره کمک کند. در React 17، ما لاگ‌های کنسول را برای یکی از دو رندر سرکوب می‌کردیم تا لاگ‌ها آسان‌تر خوانده شوند. در پاسخ به [بازخورد جامعه](https://github.com/facebook/react/issues/21783) که این گیج‌کننده است، ما سرکوب را حذف کرده‌ایم. در عوض، اگر React DevTools نصب کرده‌اید، رندرهای لاگ دوم به‌صورت خاکستری نمایش داده خواهند شد، و یک گزینه (که به‌صورت پیش‌فرض خاموش است) برای سرکوب کامل آن‌ها وجود خواهد داشت.
* **بهبود استفاده از حافظه:** ری‌اکت اکنون فیلدهای داخلی بیشتری را هنگام unmount پاک می‌کند، که تأثیر نشت‌های حافظهٔ برطرف‌نشده‌ای که ممکن است در کد برنامهٔ شما وجود داشته باشد را کمتر می‌کند.

### React DOM Server {/*react-dom-server*/}

* **`renderToString`:** هنگام suspend روی سرور دیگر خطا نمی‌دهد. در عوض، HTML fallback را برای نزدیک‌ترین مرز `<Suspense>` ساطع می‌کند و سپس رندر همان محتوا را روی کلاینت امتحان می‌کند. همچنان توصیه می‌شود به یک API استریمی مانند `renderToPipeableStream` یا `renderToReadableStream` سوییچ کنید.
* **`renderToStaticMarkup`:** هنگام suspend روی سرور دیگر خطا نمی‌دهد. در عوض، HTML fallback را برای نزدیک‌ترین مرز `<Suspense>` ساطع می‌کند.

## گزارش تغییرات (Changelog) {/*changelog*/}

می‌توانید [گزارش تغییرات کامل را اینجا ببینید](https://github.com/facebook/react/blob/main/CHANGELOG.md).
