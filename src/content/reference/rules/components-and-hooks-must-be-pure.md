---
title: کامپوننت‌ها و هوک‌ها باید خالص باشند
---

<Intro>
تابع‌های خالص فقط یک محاسبه انجام می‌دهند و بس. این کار کد شما را آسان‌تر برای درک و دیباگ می‌کند، و به ری‌اکت اجازه می‌دهد کامپوننت‌ها و هوک‌های شما را به‌درستی به‌طور خودکار بهینه‌سازی کند.
</Intro>

<Note>
این صفحهٔ مرجع موضوعات پیشرفته را پوشش می‌دهد و نیاز به آشنایی با مفاهیم پوشش‌داده‌شده در صفحهٔ [نگه‌داشتن کامپوننت‌ها خالص](/learn/keeping-components-pure) دارد.
</Note>

<InlineToc />

### چرا خالص بودن اهمیت دارد؟ {/*why-does-purity-matter*/}

یکی از مفاهیم کلیدی که ری‌اکت را به _ری‌اکت_ می‌کند، _خالص بودن_ است. یک کامپوننت یا هوک خالص، آن است که:

* **Idempotent** – شما [همیشه هر بار نتیجهٔ یکسانی دریافت می‌کنید](/learn/keeping-components-pure#purity-components-as-formulas) وقتی آن را با ورودی‌های یکسان اجرا می‌کنید — پراپس، استیت، کانتکست برای ورودی‌های کامپوننت؛ و آرگومان‌ها برای ورودی‌های هوک.
* **در رندر عارضه جانبی ندارد** – کد با عوارض جانبی باید [**به‌طور جداگانه از رندر](#how-does-react-run-your-code) اجرا شود. مثلاً به‌عنوان یک [event handler](/learn/responding-to-events) — جایی که کاربر با رابط کاربری تعامل می‌کند و باعث به‌روزرسانی آن می‌شود؛ یا به‌عنوان یک [افکت](/reference/react/useEffect) — که بعد از رندر اجرا می‌شود.
* **مقادیر غیر محلی را تغییر نمی‌دهد**: کامپوننت‌ها و هوک‌ها باید [هرگز مقادیری که به‌صورت محلی ایجاد نشده‌اند را در رندر تغییر ندهند](#mutation).

وقتی رندر خالص نگه داشته می‌شود، ری‌اکت می‌تواند درک کند که چگونه اولویت‌بندی کند کدام به‌روزرسانی‌ها برای دیدن اول توسط کاربر مهم‌ترند. این به‌دلیل خالص بودن رندر ممکن می‌شود: از آنجا که کامپوننت‌ها [در رندر](#how-does-react-run-your-code) عارضه جانبی ندارند، ری‌اکت می‌تواند رندر کامپوننت‌هایی که برای به‌روزرسانی به‌اندازه مهم نیستند را متوقف کند، و فقط وقتی نیاز است بعداً به آن‌ها برگردد.

به‌طور مشخص، این بدان معناست که منطق رندر می‌تواند چندین بار اجرا شود به روشی که به ری‌اکت اجازه می‌دهد به کاربر شما تجربهٔ کاربری خوشایندی بدهد. اما اگر کامپوننت شما یک عارضه جانبی ردیابی‌نشده داشته باشد — مانند تغییر مقدار یک متغیر سراسری [در حین رندر](#how-does-react-run-your-code) — وقتی ری‌اکت کد رندر شما را دوباره اجرا می‌کند، عوارض جانبی شما به روشی تحریک می‌شوند که با آنچه می‌خواهید مطابقت ندارد. این اغلب به باگ‌های غیرمنتظره‌ای منجر می‌شود که می‌تواند تجربهٔ کاربر از اپ شما را تخریب کند. می‌توانید یک [نمونه از این موضوع را در صفحهٔ نگه‌داشتن کامپوننت‌ها خالص ببینید](/learn/keeping-components-pure#side-effects-unintended-consequences).

#### ری‌اکت چگونه کد شما را اجرا می‌کند؟ {/*how-does-react-run-your-code*/}

ری‌اکت اعلانی است: شما به ری‌اکت می‌گویید _چه چیزی_ رندر شود، و ری‌اکت _چگونه_ بهترین روش برای نمایش آن به کاربر را پیدا می‌کند. برای این کار، ری‌اکت چند مرحله دارد که در آن‌ها کد شما را اجرا می‌کند. نیازی نیست برای استفادهٔ خوب از ری‌اکت دربارهٔ همهٔ این مراحل بدانید. اما در سطح بالا، باید بدانید چه کدی در _رندر_ اجرا می‌شود، و چه چیزی خارج از آن اجرا می‌شود.

_رندر_ به محاسبهٔ اینکه نسخهٔ بعدی رابط کاربری شما چگونه باید باشد، اشاره دارد. بعد از رندر، [افکت‌ها](/reference/react/useEffect) _flush_ می‌شوند (یعنی اجرا می‌شوند تا زمانی که دیگری باقی نماند) و ممکن است محاسبه را به‌روزرسانی کنند اگر افکت‌ها بر layout تأثیر داشته باشند. ری‌اکت این محاسبهٔ جدید را می‌گیرد و آن را با محاسبهٔ استفاده‌شده برای ایجاد نسخهٔ قبلی رابط کاربری شما مقایسه می‌کند، سپس فقط حداقل تغییرات لازم را به [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (آنچه کاربر شما در واقع می‌بیند) _commit_ می‌کند تا آن را به نسخهٔ آخر برساند.

<DeepDive>

#### چگونه تشخیص دهیم کد در رندر اجرا می‌شود {/*how-to-tell-if-code-runs-in-render*/}

یک هیوریستیک سریع برای تشخیص اینکه کد در طول رندر اجرا می‌شود، بررسی جایی است که قرار دارد: اگر در سطح بالا مانند مثال زیر نوشته شده باشد، احتمال خوبی وجود دارد که در طول رندر اجرا شود.

```js {2}
function Dropdown() {
  const selectedItems = new Set(); // created during render
  // ...
}
```

Event handlerها و افکت‌ها در رندر اجرا نمی‌شوند:

```js {4}
function Dropdown() {
  const selectedItems = new Set();
  const onSelect = (item) => {
    // this code is in an event handler, so it's only run when the user triggers this
    selectedItems.add(item);
  }
}
```

```js {4}
function Dropdown() {
  const selectedItems = new Set();
  useEffect(() => {
    // this code is inside of an Effect, so it only runs after rendering
    logForAnalytics(selectedItems);
  }, [selectedItems]);
}
```
</DeepDive>

---

## کامپوننت‌ها و هوک‌ها باید idempotent باشند {/*components-and-hooks-must-be-idempotent*/}

کامپوننت‌ها باید همیشه نسبت به ورودی‌هایشان — پراپس، استیت و کانتکست — خروجی یکسانی برمی‌گردانند. این به‌عنوان _idempotency_ شناخته می‌شود. [Idempotency](https://en.wikipedia.org/wiki/Idempotence) اصطلاحی است که در برنامه‌نویسی تابعی رایج شده است. به این ایده اشاره دارد که شما [همیشه هر بار نتیجهٔ یکسانی دریافت می‌کنید](learn/keeping-components-pure) وقتی آن قطعه کد را با ورودی‌های یکسان اجرا می‌کنید.

این بدان معناست که _همهٔ_ کدی که [در طول رندر](#how-does-react-run-your-code) اجرا می‌شود نیز باید idempotent باشد تا این قانون برقرار بماند. مثلاً این خط کد idempotent نیست (و در نتیجه کامپوننت نیز idempotent نیست):

```js {2}
function Clock() {
  const time = new Date(); // 🔴 Bad: always returns a different result!
  return <span>{time.toLocaleString()}</span>
}
```

`new Date()` idempotent نیست زیرا همیشه تاریخ فعلی را برمی‌گرداند و هر بار که فراخوانی می‌شود نتیجه‌اش را تغییر می‌دهد. وقتی کامپوننت بالا را رندر می‌کنید، زمان نمایش‌داده‌شده روی صفحه روی زمانی که کامپوننت رندر شده، گیر می‌کند. به‌طور مشابه، تابع‌هایی مانند `Math.random()` نیز idempotent نیستند، زیرا هر بار که فراخوانی می‌شوند نتایج متفاوتی برمی‌گردانند، حتی وقتی ورودی‌ها یکسان باشند.

این بدان معنا نیست که نباید از تابع‌های غیر idempotent مانند `new Date()` _اصلاً_ استفاده کنید — فقط باید از استفاده از آن‌ها [در طول رندر](#how-does-react-run-your-code) اجتناب کنید. در این مورد، می‌توانیم آخرین تاریخ را با این کامپوننت با استفاده از یک [افکت](/reference/react/useEffect) _هماهنگ_ کنیم:

<Sandpack>

```js
import { useState, useEffect } from 'react';

function useTime() {
  // 1. Keep track of the current date's state. `useState` receives an initializer function as its
  //    initial state. It only runs once when the hook is called, so only the current date at the
  //    time the hook is called is set first.
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    // 2. Update the current date every second using `setInterval`.
    const id = setInterval(() => {
      setTime(new Date()); // ✅ Good: non-idempotent code no longer runs in render
    }, 1000);
    // 3. Return a cleanup function so we don't leak the `setInterval` timer.
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Clock() {
  const time = useTime();
  return <span>{time.toLocaleString()}</span>;
}
```

</Sandpack>

با پیچیدن فراخوانی غیر idempotent `new Date()` در یک افکت، آن محاسبه را [به خارج از رندر](#how-does-react-run-your-code) منتقل می‌کند.

اگر نیازی به هماهنگ کردن برخی استیت‌های خارجی با ری‌اکت ندارید، می‌توانید در صورت نیاز به به‌روزرسانی فقط در پاسخ به تعامل کاربر، از یک [event handler](/learn/responding-to-events) نیز استفاده کنید.

---

## عوارض جانبی باید خارج از رندر اجرا شوند {/*side-effects-must-run-outside-of-render*/}

[عوارض جانبی](/learn/keeping-components-pure#side-effects-unintended-consequences) نباید [در رندر](#how-does-react-run-your-code) اجرا شوند، زیرا ری‌اکت می‌تواند کامپوننت‌ها را چندین بار رندر کند تا بهترین تجربهٔ کاربری ممکن را بسازد.

<Note>
عوارض جانبی اصطلاحی گسترده‌تر از افکت‌ها است. افکت‌ها به‌طور خاص به کدی اشاره دارند که در `useEffect` پیچیده شده، در حالی که عارضه جانبی اصطلاحی عمومی برای کدی است که هر اثر قابل مشاهده‌ای به‌جز نتیجهٔ اصلی برگرداندن یک مقدار به فراخوان‌کننده دارد.

عوارض جانبی معمولاً داخل [event handlerها](/learn/responding-to-events) یا افکت‌ها نوشته می‌شوند. اما هرگز در طول رندر.
</Note>

در حالی که رندر باید خالص نگه داشته شود، عوارض جانبی در نقطه‌ای برای اینکه اپ شما کار جالبی انجام دهد، مانند نمایش چیزی روی صفحه، ضروری هستند! نکتهٔ کلیدی این قانون این است که عوارض جانبی نباید [در رندر](#how-does-react-run-your-code) اجرا شوند، زیرا ری‌اکت می‌تواند کامپوننت‌ها را چندین بار رندر کند. در بیشتر موارد، از [event handlerها](learn/responding-to-events) برای مدیریت عوارض جانبی استفاده می‌کنید. استفاده از یک event handler صریحاً به ری‌اکت می‌گوید که این کد نیازی به اجرا در طول رندر ندارد، و رندر را خالص نگه می‌دارد. اگر همهٔ گزینه‌ها را امتحان کرده‌اید — و فقط به‌عنوان آخرین راه‌حل — می‌توانید عوارض جانبی را با استفاده از `useEffect` نیز مدیریت کنید.

### چه زمان تغییر (mutation) مجاز است؟ {/*mutation*/}

#### تغییر محلی {/*local-mutation*/}
یک مثال رایج از عارضه جانبی، تغییر (mutation) است، که در جاوااسکریپت به تغییر مقدار یک مقدار غیر [primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) اشاره دارد. به‌طور کلی، در حالی که تغییر در ری‌اکت اصطلاحی نیست، تغییر _محلی_ کاملاً خوب است:

```js {2,7}
function FriendList({ friends }) {
  const items = []; // ✅ Good: locally created
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    ); // ✅ Good: local mutation is okay
  }
  return <section>{items}</section>;
}
```

نیازی به کج‌کردن کد خود برای اجتناب از تغییر محلی نیست. [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) نیز می‌تواند برای اختصار در اینجا استفاده شود، اما هیچ اشکالی در ایجاد یک آرایهٔ محلی و سپس push کردن آیتم‌ها به آن [در طول رندر](#how-does-react-run-your-code) وجود ندارد.

با وجود اینکه به نظر می‌رسد `items` را تغییر می‌دهیم، نکتهٔ کلیدی این است که این کد فقط _به‌صورت محلی_ این کار را انجام می‌دهد — تغییر وقتی کامپوننت دوباره رندر می‌شود، "به یاد نمی‌آورد". به عبارت دیگر، `items` فقط تا زمانی که کامپوننت وجود دارد باقی می‌ماند. از آنجا که `items` همیشه هر بار که `<FriendList />` رندر می‌شود _دوباره ایجاد می‌شود_، کامپوننت همیشه نتیجهٔ یکسانی برمی‌گرداند.

از سوی دیگر، اگر `items` خارج از کامپوننت ایجاد شده بود، مقادیر قبلی خود را نگه می‌داشت و تغییرات را به یاد می‌آورد:

```js {1,7}
const items = []; // 🔴 Bad: created outside of the component
function FriendList({ friends }) {
  for (let i = 0; i < friends.length; i++) {
    const friend = friends[i];
    items.push(
      <Friend key={friend.id} friend={friend} />
    ); // 🔴 Bad: mutates a value created outside of render
  }
  return <section>{items}</section>;
}
```

وقتی `<FriendList />` دوباره اجرا می‌شود، هر بار که آن کامپوننت اجرا می‌شود `friends` را به `items` اضافه می‌کنیم، که منجر به نتایج تکراری متعدد می‌شود. این نسخه از `<FriendList />` عوارض جانبی قابل مشاهده‌ای [در طول رندر](#how-does-react-run-your-code) دارد و **قانون را می‌شکند**.

#### مقداردهی اولیه تنبل {/*lazy-initialization*/}

مقداردهی اولیه تنبل نیز با وجود اینکه کاملاً "خالص" نیست، خوب است:

```js {2}
function ExpenseForm() {
  SuperCalculator.initializeIfNotReady(); // ✅ Good: if it doesn't affect other components
  // Continue rendering...
}
```

#### تغییر DOM {/*changing-the-dom*/}

عوارض جانبی که مستقیماً برای کاربر قابل مشاهده هستند، در منطق رندر کامپوننت‌های ری‌اکت مجاز نیستند. به عبارت دیگر، صرفاً فراخوانی یک تابع کامپوننت نباید به‌خودی خود تغییری روی صفحه ایجاد کند.

```js {2}
function ProductDetailPage({ product }) {
  document.title = product.title; // 🔴 Bad: Changes the DOM
}
```

یک راه برای رسیدن به نتیجهٔ مطلوب به‌روزرسانی `document.title` خارج از رندر، [هماهنگ کردن کامپوننت با `document`](/learn/synchronizing-with-effects) است.

تا زمانی که فراخوانی یک کامپوننت چندین بار امن است و بر رندر سایر کامپوننت‌ها تأثیر نمی‌گذارد، ری‌اکت اهمیتی نمی‌دهد که آیا در معنای دقیق برنامه‌نویسی تابعی ۱۰۰٪ خالص است یا نه. مهم‌تر این است که [کامپوننت‌ها باید idempotent باشند](/reference/rules/components-and-hooks-must-be-pure).

---

## پراپس و استیت غیرقابل تغییرند {/*props-and-state-are-immutable*/}

پراپس و استیت یک کامپوننت [snapshot](learn/state-as-a-snapshot)های غیرقابل تغییر هستند. هرگز مستقیماً آن‌ها را تغییر ندهید. در عوض، پراپس‌های جدید را پایین بفرستید، و از تابع setter از `useState` استفاده کنید.

می‌توانید به مقادیر پراپس و استیت به‌عنوان snapshotهایی که بعد از رندر به‌روزرسانی می‌شوند، فکر کنید. به این دلیل، متغیرهای پراپس یا استیت را مستقیماً تغییر نمی‌دهید: در عوض پراپس‌های جدید را منتقل می‌کنید، یا از تابع setter ارائه‌شده استفاده می‌کنید تا به ری‌اکت بگویید استیت نیاز دارد دفعهٔ بعد که کامپوننت رندر می‌شود به‌روزرسانی شود.

### پراپس را تغییر ندهید {/*props*/}
پراپس‌ها غیرقابل تغییرند زیرا اگر آن‌ها را تغییر دهید، اپلیکیشن خروجی ناسازگار تولید می‌کند، که ممکن است دیباگ آن سخت باشد زیرا ممکن است بسته به شرایط کار کند یا نکند.

```js {expectedErrors: {'react-compiler': [2]}} {2}
function Post({ item }) {
  item.url = new Url(item.url, base); // 🔴 Bad: never mutate props directly
  return <Link url={item.url}>{item.title}</Link>;
}
```

```js {2}
function Post({ item }) {
  const url = new Url(item.url, base); // ✅ Good: make a copy instead
  return <Link url={url}>{item.title}</Link>;
}
```

### استیت را تغییر ندهید {/*state*/}
`useState` متغیر استیت و یک setter برای به‌روزرسانی آن استیت برمی‌گرداند.

```js
const [stateVariable, setter] = useState(0);
```

به‌جای به‌روزرسانی متغیر استیت به‌صورت درجا، باید آن را با استفاده از تابع setter که توسط `useState` برگردانده شده به‌روزرسانی کنیم. تغییر مقادیر روی متغیر استیت باعث نمی‌شود کامپوننت به‌روزرسانی شود، و کاربران شما با یک رابط کاربری قدیمی مواجه می‌شوند. استفاده از تابع setter به ری‌اکت اطلاع می‌دهد که استیت تغییر کرده، و ما باید یک رندر مجدد برای به‌روزرسانی رابط کاربری در صف بگذاریم.

```js {expectedErrors: {'react-compiler': [2, 5]}} {5}
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    count = count + 1; // 🔴 Bad: never mutate state directly
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

```js {5}
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // ✅ Good: use the setter function returned by useState
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

---

## مقادیر برگشتی و آرگومان‌های هوک‌ها غیرقابل تغییرند {/*return-values-and-arguments-to-hooks-are-immutable*/}

وقتی مقادیر به یک هوک پاس داده شدند، نباید آن‌ها را تغییر دهید. مانند پراپس در JSX، مقادیر وقتی به یک هوک پاس داده می‌شوند، غیرقابل تغییر می‌شوند.

```js {expectedErrors: {'react-compiler': [4]}} {4}
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);
  if (icon.enabled) {
    icon.className = computeStyle(icon, theme); // 🔴 Bad: never mutate hook arguments directly
  }
  return icon;
}
```

```js {3}
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);
  const newIcon = { ...icon }; // ✅ Good: make a copy instead
  if (icon.enabled) {
    newIcon.className = computeStyle(icon, theme);
  }
  return newIcon;
}
```

یک اصل مهم در ری‌اکت _استدلال محلی_ است: توانایی درک اینکه یک کامپوننت یا هوک چه می‌کند با نگاه کردن به کد آن به‌صورت ایزوله. هوک‌ها باید وقتی فراخوانی می‌شوند مانند "جعبه‌های سیاه" در نظر گرفته شوند. مثلاً یک هوک سفارشی ممکن است از آرگومان‌هایش به‌عنوان وابستگی‌ها برای memoize کردن مقادیر درونش استفاده کرده باشد:

```js {4}
function useIconStyle(icon) {
  const theme = useContext(ThemeContext);

  return useMemo(() => {
    const newIcon = { ...icon };
    if (icon.enabled) {
      newIcon.className = computeStyle(icon, theme);
    }
    return newIcon;
  }, [icon, theme]);
}
```

اگر آرگومان‌های هوک را تغییر دهید، memoization هوک سفارشی نادرست می‌شود، بنابراین مهم است که از این کار اجتناب کنید.

```js {4}
style = useIconStyle(icon);         // `style` is memoized based on `icon`
icon.enabled = false;               // Bad: 🔴 never mutate hook arguments directly
style = useIconStyle(icon);         // previously memoized result is returned
```

```js {4}
style = useIconStyle(icon);         // `style` is memoized based on `icon`
icon = { ...icon, enabled: false }; // Good: ✅ make a copy instead
style = useIconStyle(icon);         // new value of `style` is calculated
```

به‌طور مشابه، مهم است که مقادیر برگشتی هوک‌ها را تغییر ندهید، زیرا ممکن است memoize شده باشند.

---

## مقادیر بعد از پاس داده شدن به JSX غیرقابل تغییرند {/*values-are-immutable-after-being-passed-to-jsx*/}

مقادیر را پس از استفاده در JSX تغییر ندهید. تغییر را به قبل از ایجاد JSX منتقل کنید.

وقتی از JSX در یک عبارت استفاده می‌کنید، ری‌اکت ممکن است JSX را قبل از اتمام رندر کامپوننت با اشتیاق ارزیابی کند. این بدان معناست که تغییر مقادیر پس از پاس داده شدن به JSX می‌تواند به رابط‌های کاربری قدیمی منجر شود، زیرا ری‌اکت نمی‌فهمد که خروجی کامپوننت را به‌روزرسانی کند.

```js {expectedErrors: {'react-compiler': [4]}} {4}
function Page({ colour }) {
  const styles = { colour, size: "large" };
  const header = <Header styles={styles} />;
  styles.size = "small"; // 🔴 Bad: styles was already used in the JSX above
  const footer = <Footer styles={styles} />;
  return (
    <>
      {header}
      <Content />
      {footer}
    </>
  );
}
```

```js {4}
function Page({ colour }) {
  const headerStyles = { colour, size: "large" };
  const header = <Header styles={headerStyles} />;
  const footerStyles = { colour, size: "small" }; // ✅ Good: we created a new value
  const footer = <Footer styles={footerStyles} />;
  return (
    <>
      {header}
      <Content />
      {footer}
    </>
  );
}
```
