---
title: 'شاید به افکت نیاز نداشته باشید'
---

<Intro>

افکت‌ها یک راه فرار از پارادایم React هستند. آن‌ها به شما اجازه می‌دهند از React «بیرون بروید» و کامپوننت‌هایتان را با برخی سیستم‌های خارجی مانند یک ویجت غیر-React، شبکه، یا DOM مرورگر همگام کنید. اگر هیچ سیستم خارجی درگیر نیست (مثلاً اگر می‌خواهید وقتی برخی پراپس‌ها یا استیت تغییر می‌کنند استیت یک کامپوننت را به‌روزرسانی کنید)، نباید به افکت نیاز داشته باشید. حذف افکت‌های غیرضروری باعث می‌شود کد شما پیگیری آسان‌تر، اجرای سریع‌تر و کم‌تر مستعد خطا شود.

</Intro>

<YouWillLearn>

* چرا و چگونه افکت‌های غیرضروری را از کامپوننت‌های خود حذف کنید
* چگونه محاسبات پرهزینه را بدون افکت کش (cache) کنید
* چگونه استیت کامپوننت را بدون افکت بازنشانی و تنظیم کنید
* چگونه منطق را بین هندلرهای رویداد به اشتراک بگذارید
* کدام منطق باید به هندلرهای رویداد منتقل شود
* چگونه کامپوننت‌های والد را دربارهٔ تغییرات آگاه کنید

</YouWillLearn>

## نحوهٔ حذف افکت‌های غیرضروری {/*how-to-remove-unnecessary-effects*/}

دو مورد رایج وجود دارد که در آن‌ها به افکت نیاز ندارید:

* **برای تبدیل داده‌ها جهت رندر به افکت نیاز ندارید.** مثلاً فرض کنید می‌خواهید پیش از نمایش، یک فهرست را فیلتر کنید. شاید وسوسه شوید افکتی بنویسید که وقتی فهرست تغییر می‌کند یک متغیر استیت را به‌روزرسانی کند. با این حال، این ناکارآمد است. وقتی استیت را به‌روزرسانی می‌کنید، React ابتدا توابع کامپوننت شما را فراخوانی می‌کند تا محاسبه کند چه چیزی باید روی صفحه باشد. سپس React این تغییرات را به DOM [«کامیت»](/learn/render-and-commit) می‌کند و صفحه را به‌روزرسانی می‌نماید. سپس React افکت‌های شما را اجرا می‌کند. اگر افکت شما *هم* بلافاصله استیت را به‌روزرسانی کند، این کل فرایند را از ابتدا دوباره آغاز می‌کند! برای پرهیز از پاس‌های رندر غیرضروری، تمام داده‌ها را در بالاترین سطح کامپوننت‌هایتان تبدیل کنید. آن کد هر زمان که پراپس یا استیت شما تغییر کند، به‌طور خودکار دوباره اجرا خواهد شد.
* **برای مدیریت رویدادهای کاربر به افکت نیاز ندارید.** مثلاً فرض کنید می‌خواهید وقتی کاربر محصولی را می‌خرد، یک درخواست POST به `/api/buy` بفرستید و یک اعلان نمایش دهید. در هندلر رویداد کلیک دکمهٔ Buy، دقیقاً می‌دانید چه اتفاقی افتاده. تا زمانی که یک افکت اجرا می‌شود، نمی‌دانید کاربر *چه* کرده است (مثلاً کدام دکمه کلیک شده). به همین دلیل معمولاً رویدادهای کاربر را در هندلرهای رویداد مربوطه مدیریت می‌کنید.

شما *به* افکت‌ها نیاز دارید تا با سیستم‌های خارجی [همگام شوید](/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events). مثلاً می‌توانید افکتی بنویسید که یک ویجت jQuery را با استیت React همگام نگه دارد. همچنین می‌توانید با افکت‌ها داده fetch کنید: مثلاً می‌توانید نتایج جستجو را با کوئری جستجوی فعلی همگام کنید. در نظر داشته باشید که [فریم‌ورک‌های](/learn/start-a-new-react-project#full-stack-frameworks) مدرن مکانیزم‌های fetch دادهٔ داخلی کارآمدتری از نوشتن افکت مستقیم در کامپوننت‌ها ارائه می‌دهند.

برای کمک به کسب شهود درست، بیایید چند مثال عینی رایج را ببینیم!

### به‌روزرسانی استیت بر اساس پراپس یا استیت {/*updating-state-based-on-props-or-state*/}

فرض کنید کامپوننتی با دو متغیر استیت دارید: `firstName` و `lastName`. می‌خواهید با اتصال آن‌ها یک `fullName` محاسبه کنید. علاوه بر این، می‌خواهید `fullName` هر زمان که `firstName` یا `lastName` تغییر می‌کنند به‌روزرسانی شود. اولین غریزهٔ شما ممکن است اضافه کردن یک متغیر استیت `fullName` و به‌روزرسانی آن در یک افکت باشد:

```js {expectedErrors: {'react-compiler': [8]}} {5-9}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

این از آنچه لازم است پیچیده‌تر است. همچنین ناکارآمد است: یک پاس رندر کامل با مقدار کهنهٔ `fullName` انجام می‌دهد، سپس بلافاصله با مقدار به‌روزرسانی‌شده دوباره رندر می‌کند. متغیر استیت و افکت را حذف کنید:

```js {4-5}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

**وقتی چیزی را می‌توان از پراپس یا استیت موجود محاسبه کرد، [آن را در استیت قرار ندهید.](/learn/choosing-the-state-structure#avoid-redundant-state) در عوض، آن را حین رندر محاسبه کنید.** این کار کد شما را سریع‌تر (از به‌روزرسانی‌های «آبشاری» اضافی پرهیز می‌کنید)، ساده‌تر (برخی کد را حذف می‌کنید)، و کم‌تر مستعد خطا می‌کند (از باگ‌های ناشی از ناهمگام شدن متغیرهای استیت مختلف با یکدیگر پرهیز می‌کنید). اگر این رویکرد برایتان تازه است، [Thinking in React](/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state) توضیح می‌دهد چه چیزی باید در استیت قرار گیرد.

### کش کردن محاسبات پرهزینه {/*caching-expensive-calculations*/}

این کامپوننت `visibleTodos` را با گرفتن `todos` که از پراپس دریافت می‌کند و فیلتر کردن آن‌ها بر اساس پراپ `filter` محاسبه می‌کند. ممکن است وسوسه شوید نتیجه را در استیت ذخیره و از یک افکت به‌روزرسانی کنید:

```js {expectedErrors: {'react-compiler': [7]}} {4-8}
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```

مانند مثال قبلی، این هم غیرضروری و ناکارآمد است. ابتدا استیت و افکت را حذف کنید:

```js {3-4}
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```

معمولاً این کد مشکلی ندارد! اما شاید `getFilteredTodos()` کند است یا `todos` زیادی دارید. در این صورت نمی‌خواهید `getFilteredTodos()` را دوباره محاسبه کنید اگر برخی متغیرهای استیت نامرتبط مانند `newTodo` تغییر کرده باشند.

می‌توانید یک محاسبهٔ پرهزینه را با پیچیدن آن در یک هوک [`useMemo`](/reference/react/useMemo) کش (یا [«مموری‌زیشن»](https://en.wikipedia.org/wiki/Memoization)) کنید:

<Note>

[React Compiler](/learn/react-compiler) می‌تواند به‌طور خودکار محاسبات پرهزینه را برایتان مموری‌زیشن کند و نیاز به `useMemo` دستی را در بسیاری از موارد از بین ببرد.

</Note>

```js {5-8}
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```

یا به‌صورت یک خط نوشته شود:

```js {5-6}
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
  // ...
}
```

**این به React می‌گوید که نمی‌خواهید تابع درونی دوباره اجرا شود مگر اینکه `todos` یا `filter` تغییر کرده باشند.** React مقدار بازگشتی `getFilteredTodos()` را حین رندر اولیه به خاطر می‌سپارد. در رندرهای بعدی، بررسی می‌کند که آیا `todos` یا `filter` متفاوت هستند. اگر مثل دفعهٔ قبل باشند، `useMemo` آخرین نتیجه‌ای که ذخیره کرده را برمی‌گرداند. اما اگر متفاوت باشند، React تابع درونی را دوباره فراخوانی می‌کند (و نتیجه‌اش را ذخیره می‌نماید).

تابعی که در [`useMemo`](/reference/react/useMemo) می‌پیچید حین رندر اجرا می‌شود، پس این فقط برای [محاسبات خالص](/learn/keeping-components-pure) کار می‌کند.

<DeepDive>

#### چگونه بفهمیم یک محاسبه پرهزینه است؟ {/*how-to-tell-if-a-calculation-is-expensive*/}

به‌طور کلی، مگر اینکه هزاران شیء بسازید یا روی آن‌ها حلقه بزنید، احتمالاً پرهزینه نیست. اگر می‌خواهید مطمئن‌تر شوید، می‌توانید یک console log اضافه کنید تا زمان صرف‌شده در یک قطعه کد را اندازه بگیرید:

```js {1,3}
console.time('filter array');
const visibleTodos = getFilteredTodos(todos, filter);
console.timeEnd('filter array');
```

تعاملی که اندازه می‌گیرید را انجام دهید (مثلاً تایپ در ورودی). سپس لاگ‌هایی مانند `filter array: 0.15ms` را در کنسول می‌بینید. اگر کل زمان لاگ‌شده به مقدار قابل‌توجهی می‌رسد (مثلاً `1ms` یا بیشتر)، ممکن است مموری‌زیشن آن محاسبه منطقی باشد. به‌عنوان آزمایش، می‌توانید محاسبه را در `useMemo` بپیچید تا بررسی کنید آیا کل زمان لاگ‌شده برای آن تعامل کاهش یافته یا نه:

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter); // Skipped if todos and filter haven't changed
}, [todos, filter]);
console.timeEnd('filter array');
```

`useMemo` *اولین* رندر را سریع‌تر نمی‌کند. فقط کمک می‌کند از کار غیرضروری در به‌روزرسانی‌ها پرهیز کنید.

در نظر داشته باشید که ماشین شما احتمالاً سریع‌تر از ماشین کاربرانتان است، پس ایدهٔ خوبی است که عملکرد را با کندسازی مصنوعی آزمایش کنید. مثلاً Chrome گزینهٔ [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) را برای این کار ارائه می‌دهد.

همچنین توجه داشته باشید که اندازه‌گیری عملکرد در توسعه دقیق‌ترین نتایج را نمی‌دهد. (مثلاً وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) روشن است، هر کامپوننت را دو بار به‌جای یک بار رندر می‌بینید.) برای گرفتن دقیق‌ترین زمان‌بندی‌ها، اپلیکیشن خود را برای پروداکشن build کنید و روی دستگاهی مانند دستگاه کاربران خود آزمایش کنید.

</DeepDive>

### بازنشانی کل استیت وقتی یک پراپ تغییر می‌کند {/*resetting-all-state-when-a-prop-changes*/}

این کامپوننت `ProfilePage` یک پراپ `userId` دریافت می‌کند. صفحه شامل یک ورودی کامنت است و از یک متغیر استیت `comment` برای نگه‌داشتن مقدارش استفاده می‌کنید. یک روز متوجه مشکل می‌شوید: وقتی از یک پروفایل به پروفایل دیگری می‌روید، استیت `comment` بازنشانی نمی‌شود. در نتیجه، به‌راحتی ممکن است به‌اشتباه روی پروفایل کاربر اشتباهی کامنت ثبت کنید. برای رفع مشکل، می‌خواهید متغیر استیت `comment` را هر زمان که `userId` تغییر می‌کند پاک کنید:

```js {expectedErrors: {'react-compiler': [6]}} {4-7}
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('');

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('');
  }, [userId]);
  // ...
}
```

این ناکارآمد است زیرا `ProfilePage` و فرزندانش ابتدا با مقدار کهنه رندر می‌شوند، سپس دوباره رندر می‌شوند. همچنین پیچیده است زیرا باید این کار را در *هر* کامپوننتی که استیتی داخل `ProfilePage` دارد انجام دهید. مثلاً اگر رابط کاربری کامنت تودرتو باشد، می‌خواهید استیت کامنت تودرتو را هم پاک کنید.

در عوض، می‌توانید با دادن یک کلید (key) صریح به React بگویید که پروفایل هر کاربر از نظر مفهومی یک پروفایل _متفاوت_ است. کامپوننت خود را به دو بخش تقسیم کنید و یک ویژگی `key` را از کامپوننت بیرونی به کامپوننت درونی عبور دهید:

```js {5,11-12}
export default function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('');
  // ...
}
```

معمولاً React هنگام رندر شدن همان کامپوننت در همان نقطه استیت را حفظ می‌کند. **با عبور دادن `userId` به‌عنوان یک `key` به کامپوننت `Profile`، از React می‌خواهید دو کامپوننت `Profile` با `userId` متفاوت را به‌عنوان دو کامپوننت متفاوت در نظر بگیرد که نباید هیچ استیتی را به اشتراک بگذارند.** هر زمان که کلید (که آن را `userId` تنظیم کرده‌اید) تغییر کند، React دوباره DOM را بازسازی می‌کند و [استیت](/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key) کامپوننت `Profile` و تمام فرزندانش را بازنشانی می‌نماید. اکنون فیلد `comment` هنگام پیمایش بین پروفایل‌ها به‌طور خودکار پاک می‌شود.

توجه کنید که در این مثال، فقط کامپوننت بیرونی `ProfilePage` export شده و برای سایر فایل‌های پروژه قابل‌مشاهده است. کامپوننت‌هایی که `ProfilePage` را رندر می‌کنند نیازی ندارد کلید را به آن عبور دهند: آن‌ها `userId` را به‌عنوان یک پراپ عادی عبور می‌دهند. این که `ProfilePage` آن را به‌عنوان یک `key` به کامپوننت درونی `Profile` عبور می‌دهد، یک جزئیات پیاده‌سازی است.

### تنظیم بخشی از استیت وقتی یک پراپ تغییر می‌کند {/*adjusting-some-state-when-a-prop-changes*/}

گاهی ممکن است بخواهید هنگام تغییر یک پراپ، بخشی از استیت را بازنشانی یا تنظیم کنید، اما نه همهٔ آن.

این کامپوننت `List` فهرستی از `items` را به‌عنوان پراپ دریافت می‌کند و آیتم انتخاب‌شده را در متغیر استیت `selection` نگه می‌دارد. می‌خواهید `selection` را هر زمان که پراپ `items` آرایهٔ متفاوتی دریافت می‌کند به `null` بازنشانی کنید:

```js {expectedErrors: {'react-compiler': [7]}} {5-8}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null);
  }, [items]);
  // ...
}
```

این هم ایده‌آل نیست. هر بار که `items` تغییر می‌کند، `List` و کامپوننت‌های فرزندش ابتدا با مقدار `selection` کهنه رندر می‌شوند. سپس React DOM را به‌روزرسانی می‌کند و افکت‌ها را اجرا می‌نماید. در نهایت، فراخوانی `setSelection(null)` باعث رندر مجدد دیگری از `List` و کامپوننت‌های فرزندش می‌شود و کل این فرایند را دوباره آغاز می‌کند.

ابتدا افکت را حذف کنید. در عوض، استیت را مستقیماً حین رندر تنظیم کنید:

```js {5-11}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```

[ذخیرهٔ اطلاعات از رندرهای قبلی](/reference/react/useState#storing-information-from-previous-renders) به این شکل می‌تواند درکش را سخت کند، اما از به‌روزرسانی همان استیت در یک افکت بهتر است. در مثال بالا، `setSelection` مستقیماً حین یک رندر فراخوانی می‌شود. React بلافاصله پس از خروج `List` با یک عبارت `return` دوباره آن را رندر می‌کند. React هنوز فرزندان `List` را رندر نکرده یا DOM را به‌روزرسانی نکرده است، پس این به فرزندان `List` اجازه می‌دهد از رندر مقدار `selection` کهنه پرهیز کنند.

وقتی حین رندر یک کامپوننت را به‌روزرسانی می‌کنید، React JSX بازگشتی را دور می‌ریزد و بلافاصله رندر را دوباره امتحان می‌کند. برای پرهیز از تلاش‌های مجدد آبشاری بسیار کند، React فقط به شما اجازه می‌دهد حین یک رندر استیت *همان* کامپوننت را به‌روزرسانی کنید. اگر حین یک رندر استیت کامپوننت دیگری را به‌روزرسانی کنید، خطا خواهید دید. شرطی مانند `items !== prevItems` برای پرهیز از حلقه‌ها ضروری است. می‌توانید استیت را به این شکل تنظیم کنید، اما هرگونه عوارض جانبی دیگر (مانند تغییر DOM یا تنظیم timeout) باید در هندلرهای رویداد یا افکت‌ها بماند تا [کامپوننت‌ها خالص بمانند.](/learn/keeping-components-pure)

**اگرچه این الگو از افکت کارآمدتر است، اکثر کامپوننت‌ها نباید به آن نیاز داشته باشند.** بدون توجه به اینکه چگونه انجامش می‌دهید، تنظیم استیت بر اساس پراپس یا استیت دیگر، جریان دادهٔ شما را برای فهمیدن و دیباگ کردن دشوارتر می‌کند. همیشه بررسی کنید آیا می‌توانید به‌جای آن [همهٔ استیت را با یک کلید بازنشانی کنید](#resetting-all-state-when-a-prop-changes) یا [همه را حین رندر محاسبه کنید](#updating-state-based-on-props-or-state). مثلاً به‌جای ذخیره (و بازنشانی) *آیتم* انتخاب‌شده، می‌توانید *شناسهٔ آیتم* انتخاب‌شده را ذخیره کنید:

```js {3-5}
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```

اکنون اصلاً نیازی به «تنظیم» استیت نیست. اگر آیتم با شناسهٔ انتخاب‌شده در فهرست باشد، انتخاب‌شده می‌ماند. اگر نباشد، `selection` محاسبه‌شده حین رندر `null` خواهد بود زیرا هیچ آیتم منطبقی پیدا نشد. این رفتار متفاوت است، اما می‌توان گفت بهتر است زیرا اکثر تغییرات `items` انتخاب را حفظ می‌کنند.

### به اشتراک‌گذاری منطق بین هندلرهای رویداد {/*sharing-logic-between-event-handlers*/}

فرض کنید صفحهٔ محصولی با دو دکمه (Buy و Checkout) دارید که هر دو به شما اجازه می‌دهند آن محصول را بخرید. می‌خواهید هر بار که کاربر محصول را در سبد قرار می‌دهد اعلانی نمایش دهید. فراخوانی `showNotification()` در هندلرهای کلیک هر دو دکمه تکراری به‌نظر می‌رسد پس شاید وسوسه شوید این منطق را در یک افکت قرار دهید:

```js {2-7}
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```

این افکت غیرضروری است. همچنین به احتمال زیاد باعث باگ می‌شود. مثلاً فرض کنید اپلیکیشن شما سبد خرید را بین بارگذاری مجدد صفحه «به خاطر می‌سپارد». اگر یک محصول را به سبد اضافه کنید و صفحه را رفرش کنید، اعلان دوباره ظاهر می‌شود. هر بار که صفحهٔ آن محصول را رفرش می‌کنید ظاهر خواهد شد. این به آن دلیل است که `product.isInCart` هنگام بارگذاری صفحه قبلاً `true` خواهد بود، پس افکت بالا `showNotification()` را فراخوانی می‌کند.

**وقتی مطمئن نیستید برخی کد باید در افکت باشد یا در هندلر رویداد، از خود بپرسید *چرا* این کد باید اجرا شود. از افکت‌ها فقط برای کدی استفاده کنید که *به این دلیل* که کامپوننت به کاربر نمایش داده شده باید اجرا شود.** در این مثال، اعلان باید ظاهر شود زیرا کاربر *دکمه را فشار داده*، نه به این دلیل که صفحه نمایش داده شده! افکت را حذف کنید و منطق مشترک را در تابعی قرار دهید که از هر دو هندلر رویداد فراخوانی می‌شود:

```js {2-6,9,13}
function ProductPage({ product, addToCart }) {
  // ✅ Good: Event-specific logic is called from event handlers
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

این هم افکت غیرضروری را حذف می‌کند و هم باگ را برطرف می‌سازد.

### ارسال یک درخواست POST {/*sending-a-post-request*/}

این کامپوننت `Form` دو نوع درخواست POST ارسال می‌کند. هنگام mount شدن یک رویداد تحلیلی ارسال می‌کند. وقتی فرم را پر می‌کنید و دکمهٔ Submit را کلیک می‌کنید، یک درخواست POST به نقطهٔ پایانی `/api/register` ارسال خواهد شد:

```js {5-8,10-16}
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```

بیایید همان معیارهای مثال قبل را اعمال کنیم.

درخواست POST تحلیلی باید در یک افکت باقی بماند. این به این دلیل است که _دلیل_ ارسال رویداد تحلیلی این است که فرم نمایش داده شده. (در توسعه دو بار اجرا می‌شود، اما [اینجا را ببینید](/learn/synchronizing-with-effects#sending-analytics) برای نحوهٔ برخورد با آن.)

با این حال، درخواست POST به `/api/register` ناشی از _نمایش داده شدن_ فرم نیست. فقط می‌خواهید درخواست را در یک لحظهٔ خاص از زمان ارسال کنید: وقتی کاربر دکمه را فشار می‌دهد. باید فقط در _آن تعامل خاص_ اتفاق بیفتد. افکت دوم را حذف کنید و آن درخواست POST را به هندلر رویداد منتقل کنید:

```js {12-13}
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```

وقتی انتخاب می‌کنید برخی منطق را در هندلر رویداد یا افکت قرار دهید، سؤال اصلی که باید پاسخ دهید این است که از دید کاربر _چه نوع منطقی_ است. اگر این منطق ناشی از یک تعامل خاص است، آن را در هندلر رویداد نگه دارید. اگر ناشی از _دیدن_ کامپوننت روی صفحه توسط کاربر است، آن را در افکت نگه دارید.

### زنجیره‌های محاسباتی {/*chains-of-computations*/}

گاهی ممکن است وسوسه شوید افکت‌هایی را زنجیر کنید که هرکدام بخشی از استیت را بر اساس استیت دیگر تنظیم می‌کنند:

```js {7-29}
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```

دو مشکل با این کد وجود دارد.

مشکل اول این است که بسیار ناکارآمد است: کامپوننت (و فرزندانش) باید بین هر فراخوانی `set` در زنجیره دوباره رندر شوند. در مثال بالا، در بدترین حالت (`setCard` → رندر → `setGoldCardCount` → رندر → `setRound` → رندر → `setIsGameOver` → رندر) سه رندر مجدد غیرضروری از درخت زیرین وجود دارد.

مشکل دوم این است که حتی اگر کند نباشد، با تکامل کد، با مواردی مواجه می‌شوید که «زنجیره‌ای» که نوشته‌اید با نیازمندی‌های جدید نمی‌سازد. تصور کنید در حال افزودن راهی برای پیمایش تاریخچهٔ حرکات بازی هستید. این کار را با به‌روزرسانی هر متغیر استیت به مقداری از گذشته انجام می‌دهید. با این حال، تنظیم استیت `card` به مقداری از گذشته زنجیرهٔ افکت را دوباره تحریک می‌کند و داده‌ای که نمایش می‌دهید را تغییر می‌دهد. چنین کدی اغلب خشک و شکننده است.

در این مورد، بهتر است آنچه را می‌توانید حین رندر محاسبه کنید، و استیت را در هندلر رویداد تنظیم کنید:

```js {6-7,14-26}
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ Calculate all the next state in the event handler
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```

این بسیار کارآمدتر است. همچنین اگر راهی برای مشاهدهٔ تاریخچهٔ بازی پیاده‌سازی می‌کنید، اکنون می‌توانید هر متغیر استیت را به حرکتی از گذشته تنظیم کنید بدون زنجیرهٔ افکتی را تحریک کنید که هر مقدار دیگر را تنظیم می‌نماید. اگر نیاز به استفادهٔ مجدد از منطق بین چند هندلر رویداد دارید، می‌توانید یک [تابع استخراج کنید](#sharing-logic-between-event-handlers) و آن را از آن هندلرها فراخوانی کنید.

به یاد داشته باشید که داخل هندلرهای رویداد، [استیت مانند یک عکس فوری رفتار می‌کند.](/learn/state-as-a-snapshot) مثلاً حتی بعد از فراخوانی `setRound(round + 1)`، متغیر `round` مقدار زمانی که کاربر دکمه را کلیک کرده را منعکس می‌کند. اگر نیاز به استفاده از مقدار بعدی برای محاسبات دارید، آن را به‌صورت دستی مانند `const nextRound = round + 1` تعریف کنید.

در برخی موارد، *نمی‌توانید* استیت بعدی را مستقیماً در هندلر رویداد محاسبه کنید. مثلاً فرمی با چند dropdown تصور کنید که گزینه‌های dropdown بعدی به مقدار انتخاب‌شدهٔ dropdown قبلی بستگی دارد. در این حالت، یک زنجیره از افکت‌ها مناسب است زیرا در حال همگام‌سازی با شبکه هستید.

### مقداردهی اولیهٔ اپلیکیشن {/*initializing-the-application*/}

برخی منطق فقط باید هنگام بارگذاری اپلیکیشن یک بار اجرا شود.

شاید وسوسه شوید آن را در افکتی در کامپوننت سطح بالا قرار دهید:

```js {2-6}
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```

با این حال، به‌سرعت کشف خواهید کرد که [در توسعه دو بار اجرا می‌شود.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) این می‌تواند باعث مشکلاتی شود — مثلاً شاید توکن احراز هویت را نامعتبر کند زیرا تابع برای دو بار فراخوانی طراحی نشده. به‌طور کلی، کامپوننت‌های شما باید در برابر mount مجدد مقاوم باشند. این شامل کامپوننت سطح بالای `App` شما هم می‌شود.

اگرچه در عمل در پروداکشن هرگز mount مجدد نمی‌شود، پیروی از همان محدودیت‌ها در همهٔ کامپوننت‌ها جابجایی و استفادهٔ مجدد از کد را آسان‌تر می‌کند. اگر برخی منطق باید *یک بار در هر بارگذاری اپلیکیشن* اجرا شود نه *یک بار در هر mount کامپوننت*، یک متغیر سطح بالا اضافه کنید تا پیگیری کند آیا قبلاً اجرا شده:

```js {1,5-6,10}
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```

همچنین می‌توانید آن را حین مقداردهی اولیهٔ ماژول و پیش از رندر اپلیکیشن اجرا کنید:

```js {1,5}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
   // ✅ Only runs once per app load
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```

کد در سطح بالا یک بار هنگام import شدن کامپوننت شما اجرا می‌شود — حتی اگر در نهایت رندر نشود. برای پرهیز از کندی یا رفتار غافلگیرکننده هنگام import کردن کامپوننت‌های دلخواه، از این الگو بیش‌از‌حد استفاده نکنید. منطق مقداردهی اولیهٔ اپلیکیشن‌گسترده را به ماژول‌های کامپوننت ریشه مانند `App.js` یا نقطهٔ ورود اپلیکیشن خود محدود کنید.

### آگاه کردن کامپوننت‌های والد دربارهٔ تغییرات استیت {/*notifying-parent-components-about-state-changes*/}

فرض کنید در حال نوشتن کامپوننت `Toggle` با یک استیت داخلی `isOn` هستید که می‌تواند `true` یا `false` باشد. چند راه مختلف برای toggle کردن آن وجود دارد (با کلیک یا کشیدن). می‌خواهید هر زمان که استیت داخلی `Toggle` تغییر می‌کند کامپوننت والد را آگاه کنید، پس یک رویداد `onChange` را نمایش می‌دهید و آن را از یک افکت فراخوانی می‌کنید:

```js {4-7}
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
```

مانند قبل، این ایده‌آل نیست. `Toggle` ابتدا استیت خود را به‌روزرسانی می‌کند، و React صفحه را به‌روزرسانی می‌نماید. سپس React افکت را اجرا می‌کند که تابع `onChange` عبور داده‌شده از یک کامپوننت والد را فراخوانی می‌کند. اکنون کامپوننت والد استیت خودش را به‌روزرسانی خواهد کرد و یک پاس رندر دیگر را آغاز می‌نماید. بهتر است همه‌چیز را در یک پاس انجام دهید.

افکت را حذف کنید و در عوض استیت *هر دو* کامپوننت را در همان هندلر رویداد به‌روزرسانی کنید:

```js {5-7,11,16,18}
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```

با این رویکرد، هم کامپوننت `Toggle` و هم کامپوننت والدش استیت خود را حین رویداد به‌روزرسانی می‌کنند. React [به‌روزرسانی‌ها را از کامپوننت‌های مختلف دسته‌بندی (Batching) می‌کند](/learn/queueing-a-series-of-state-updates)، پس فقط یک پاس رندر خواهد بود.

همچنین ممکن است بتوانید کلاً استیت را حذف کنید و در عوض `isOn` را از کامپوننت والد دریافت کنید:

```js {1,2}
// ✅ Also good: the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```

[«بالا بردن استیت»](/learn/sharing-state-between-components) به کامپوننت والد اجازه می‌دهد با toggle کردن استیت خودش، کنترل کاملی روی `Toggle` داشته باشد. این یعنی کامپوننت والد باید منطق بیشتری را در خود جای دهد، اما در مجموع استیت کمتری برای نگرانی خواهد بود. هر زمان که سعی می‌کنید دو متغیر استیت متفاوت را همگام نگه دارید، به‌جای آن بالا بردن استیت را امتحان کنید!

### عبور دادن داده به والد {/*passing-data-to-the-parent*/}

این کامپوننت `Child` برخی داده‌ها را fetch می‌کند و سپس آن‌ها را در یک افکت به کامپوننت `Parent` عبور می‌دهد:

```js {9-14}
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
```

در React، داده‌ها از کامپوننت‌های والد به فرزندانشان جریان می‌یابند. وقتی چیزی اشتباه روی صفحه می‌بینید، می‌توانید با صعود در زنجیرهٔ کامپوننت ردیابی کنید که اطلاعات از کجا می‌آید تا زمانی که کامپوننتی را پیدا کنید که پراپ اشتباه عبور می‌دهد یا استیت اشتباه دارد. وقتی کامپوننت‌های فرزند استیت کامپوننت‌های والدشان را در افکت‌ها به‌روزرسانی می‌کنند، جریان داده بسیار دشوار برای ردیابی می‌شود. از آنجا که هم فرزند و هم والد به همان داده نیاز دارند، بگذارید کامپوننت والد آن داده را fetch کند و آن را *به پایین* به فرزند عبور دهد:

```js {4-5}
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ Good: Passing data down to the child
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
```

این ساده‌تر است و جریان داده را قابل پیش‌بینی نگه می‌دارد: داده از والد به فرزند پایین جریان می‌یابد.

### اشتراک در یک فروشگاه خارجی {/*subscribing-to-an-external-store*/}

گاهی کامپوننت‌های شما ممکن است نیاز داشته باشند به برخی داده‌های خارج از استیت React مشترک شوند. این داده‌ها می‌توانند از یک کتابخانه شخص ثالث یا یک API داخلی مرورگر باشند. از آنجا که این داده‌ها می‌توانند بدون اطلاع React تغییر کنند، باید کامپوننت‌های خود را به‌صورت دستی در آن اشتراک کنید. این اغلب با یک افکت انجام می‌شود، مثلاً:

```js {2-17}
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

اینجا کامپوننت به یک فروشگاه دادهٔ خارجی (در این مورد، API مرورگر `navigator.onLine`) مشترک می‌شود. از آنجا که این API روی سرور وجود ندارد (پس نمی‌تواند برای HTML اولیه استفاده شود)، ابتدا استیت روی `true` تنظیم می‌شود. هر زمان که مقدار آن فروشگاه داده در مرورگر تغییر کند، کامپوننت استیت خود را به‌روزرسانی می‌کند.

اگرچه استفاده از افکت‌ها برای این کار رایج است، React یک هوک هدفمند برای اشتراک در یک فروشگاه خارجی دارد که به‌جای آن ترجیح داده می‌شود. افکت را حذف کنید و آن را با فراخوانی [`useSyncExternalStore`](/reference/react/useSyncExternalStore) جایگزین کنید:

```js {11-16}
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```

این رویکرد کمتر مستعد خطا از همگام‌سازی دستی داده‌های قابل‌تغییر به استیت React با یک افکت است. معمولاً یک هوک سفارشی مانند `useOnlineStatus()` بالا را می‌نویسید تا نیازی نباشد این کد را در کامپوننت‌های جداگانه تکرار کنید. [دربارهٔ اشتراک در فروشگاه‌های خارجی از کامپوننت‌های React بیشتر بخوانید.](/reference/react/useSyncExternalStore)

### Fetch داده {/*fetching-data*/}

بسیاری از اپلیکیشن‌ها از افکت‌ها برای شروع fetch داده استفاده می‌کنند. نوشتن یک افکت fetch داده مانند این بسیار رایج است:

```js {5-10}
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

شما *نمی‌خواهید* این fetch را به یک هندلر رویداد منتقل کنید.

این ممکن است با مثال‌های قبلی که در آن‌ها باید منطق را در هندلرهای رویداد قرار می‌دادید در تناقض به‌نظر برسد! با این حال، در نظر بگیرید که *رویداد تایپ* دلیل اصلی fetch نیست. ورودی‌های جستجو اغلب از URL پر می‌شوند، و کاربر ممکن است بدون لمس ورودی به عقب و جلو برود.

اهمیت ندارد که `page` و `query` از کجا می‌آیند. تا زمانی که این کامپوننت قابل‌مشاهده است، می‌خواهید `results` را با داده‌های شبکه برای `page` و `query` فعلی [همگام](/learn/synchronizing-with-effects) نگه دارید. به همین دلیل این یک افکت است.

با این حال، کد بالا یک باگ دارد. تصور کنید `"hello"` را سریع تایپ می‌کنید. سپس `query` از `"h"` به `"he"`، `"hel"`، `"hell"`، و `"hello"` تغییر خواهد کرد. این fetch‌های جداگانه را آغاز می‌کند، اما هیچ تضمینی دربارهٔ ترتیب رسیدن پاسخ‌ها وجود ندارد. مثلاً ممکن است پاسخ `"hell"` *بعد از* پاسخ `"hello"` برسد. از آنجا که `setResults()` را آخر فراخوانی می‌کند، نتایج جستجوی اشتباه را نمایش خواهید داد. این یک [«شرط مسابقه» (Race Condition)](https://en.wikipedia.org/wiki/Race_condition) نامیده می‌شود: دو درخواست متفاوت با هم «مسابقه» دادند و به ترتیبی متفاوت از آنچه انتظار داشتید رسیدند.

**برای رفع شرط مسابقه، باید [یک تابع پاکسازی اضافه کنید](/learn/synchronizing-with-effects#fetching-data) تا پاسخ‌های کهنه نادیده گرفته شوند:**

```js {5,7,9,11-13}
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

این تضمین می‌کند که وقتی افکت شما داده fetch می‌کند، تمام پاسخ‌ها به‌جز آخرین درخواست نادیده گرفته خواهند شد.

مدیریت شروط مسابقه تنها دشواری پیاده‌سازی fetch داده نیست. همچنین ممکن است بخواهید دربارهٔ کش کردن پاسخ‌ها (تا کاربر بتواند روی Back کلیک کند و صفحهٔ قبلی را بلافاصله ببیند)، نحوهٔ fetch داده روی سرور (تا HTML رندر‌شدهٔ اولیهٔ سرور شامل محتوای fetch‌شده به‌جای یک spinner باشد)، و نحوهٔ پرهیز از آبشارهای شبکه (تا یک فرزند بتواند داده fetch کند بدون منتظر ماندن برای هر والد) فکر کنید.

**این مشکلات برای هر کتابخانهٔ UI اعمال می‌شود، نه فقط React. حل آن‌ها ساده نیست، به همین دلیل [فریم‌ورک‌های](/learn/start-a-new-react-project#full-stack-frameworks) مدرن مکانیزم‌های fetch دادهٔ داخلی کارآمدتری از fetch داده در افکت‌ها ارائه می‌دهند.**

اگر از فریم‌ورک استفاده نمی‌کنید (و نمی‌خواهید خودتان بسازید) اما می‌خواهید fetch داده از افکت‌ها را راحت‌تر کنید، استخراج منطق fetch خود را در یک هوک سفارشی مانند این مثال در نظر بگیرید:

```js {4}
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setData(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url]);
  return data;
}
```

احتمالاً همچنین می‌خواهید مقداری منطق برای مدیریت خطا و پیگیری اینکه آیا محتوا در حال بارگذاری است اضافه کنید. می‌توانید چنین هوکی را خودتان بسازید یا از یکی از راه‌حل‌های فراوان موجود در اکوسیستم React استفاده کنید. **اگرچه این به‌تنهایی به‌اندازهٔ استفاده از مکانیزم fetch دادهٔ داخلی یک فریم‌ورک کارآمد نخواهد بود، انتقال منطق fetch داده به یک هوک سفارشی، اتخاذ یک استراتژی fetch دادهٔ کارآمد را بعداً آسان‌تر می‌کند.**

به‌طور کلی، هر زمان که مجبور به نوشتن افکت می‌شوید، مراقب باشید کی می‌توانید قطعه‌ای از قابلیت را در یک هوک سفارشی با API اعلامی‌تر و هدفمندتر مانند `useData` بالا استخراج کنید. هرچه فراخوانی `useEffect` خام کمتری در کامپوننت‌های خود داشته باشید، نگهداشت اپلیکیشن برایتان آسان‌تر خواهد بود.

<Recap>

- اگر چیزی را می‌توانید حین رندر محاسبه کنید، به افکت نیاز ندارید.
- برای کش محاسبات پرهزینه، به‌جای `useEffect` از `useMemo` استفاده کنید.
- برای بازنشانی استیت کل درخت کامپوننت، یک `key` متفاوت به آن عبور دهید.
- برای بازنشانی بخش خاصی از استیت در پاسخ به تغییر یک پراپ، آن را حین رندر تنظیم کنید.
- کدی که *به این دلیل* که کامپوننت نمایش داده شده اجرا می‌شود باید در افکت‌ها باشد، بقیه باید در رویدادها باشد.
- اگر نیاز به به‌روزرسانی استیت چندین کامپوننت دارید، بهتر است در یک رویداد واحد انجام شود.
- هر زمان که سعی می‌کنید متغیرهای استیت را در کامپوننت‌های مختلف همگام کنید، بالا بردن استیت را در نظر بگیرید.
- می‌توانید با افکت‌ها داده fetch کنید، اما باید پاکسازی را پیاده‌سازی کنید تا از شروط مسابقه پرهیز کنید.

</Recap>

<Challenges>

#### تبدیل داده بدون افکت {/*transform-data-without-effects*/}

`TodoList` زیر فهرستی از todoها را نمایش می‌دهد. وقتی چک‌باکس «Show only active todos» تیک می‌خورد، todoهای تکمیل‌شده در فهرست نمایش داده نمی‌شوند. بدون توجه به اینکه کدام todoها قابل‌مشاهده هستند، پانویس تعداد todoهایی که هنوز تکمیل نشده‌اند را نمایش می‌دهد.

این کامپوننت را با حذف تمام استیت و افکت‌های غیرضروری ساده کنید.

<Sandpack>

```js {expectedErrors: {'react-compiler': [12, 16, 20]}}
import { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [activeTodos, setActiveTodos] = useState([]);
  const [visibleTodos, setVisibleTodos] = useState([]);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    setActiveTodos(todos.filter(todo => !todo.completed));
  }, [todos]);

  useEffect(() => {
    setVisibleTodos(showActive ? activeTodos : todos);
  }, [showActive, todos, activeTodos]);

  useEffect(() => {
    setFooter(
      <footer>
        {activeTodos.length} todos left
      </footer>
    );
  }, [activeTodos]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      {footer}
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

<Hint>

اگر چیزی را می‌توانید حین رندر محاسبه کنید، به استیت یا افکتی که آن را به‌روزرسانی می‌کند نیاز ندارید.

</Hint>

<Solution>

در این مثال فقط دو بخش استیت ضروری وجود دارد: فهرست `todos` و متغیر استیت `showActive` که نشان می‌دهد آیا چک‌باکس تیک خورده یا نه. تمام متغیرهای استیت دیگر [اضافی](/learn/choosing-the-state-structure#avoid-redundant-state) هستند و می‌توانند به‌جای آن حین رندر محاسبه شوند. این شامل `footer` می‌شود که می‌توانید مستقیماً آن را در JSX اطرافش قرار دهید.

نتیجهٔ شما باید در نهایت چیزی شبیه به این شود:

<Sandpack>

```js
import { useState } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
      <footer>
        {activeTodos.length} todos left
      </footer>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

</Solution>

#### کش یک محاسبه بدون افکت {/*cache-a-calculation-without-effects*/}

در این مثال، فیلتر کردن todoها در تابع جداگانه‌ای به نام `getVisibleTodos()` استخراج شده است. این تابع حاوی یک فراخوانی `console.log()` درون خود است که کمک می‌کند متوجه شوید کی فراخوانی می‌شود. «Show only active todos» را toggle کنید و توجه کنید که باعث می‌شود `getVisibleTodos()` دوباره اجرا شود. این مورد انتظار است زیرا todoهای قابل‌مشاهده وقتی toggle می‌کنید کدام را نمایش دهید تغییر می‌کنند.

وظیفهٔ شما حذف افکتی است که فهرست `visibleTodos` را در کامپوننت `TodoList` دوباره محاسبه می‌کند. با این حال، باید مطمئن شوید که `getVisibleTodos()` *دوباره* اجرا نمی‌شود (و پس هیچ لاگی چاپ نمی‌کند) وقتی در ورودی تایپ می‌کنید.

<Hint>

یک راه‌حل اضافه کردن فراخوانی `useMemo` برای کش کردن todoهای قابل‌مشاهده است. همچنین یک راه‌حل دیگر کم‌تر بدیهی وجود دارد.

</Hint>

<Sandpack>

```js {expectedErrors: {'react-compiler': [11]}}
import { useState, useEffect } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(getVisibleTodos(todos, showActive));
  }, [todos, showActive]);

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

<Solution>

متغیر استیت و افکت را حذف کنید، و به‌جای آن یک فراخوانی `useMemo` برای کش کردن نتیجهٔ فراخوانی `getVisibleTodos()` اضافه کنید:

<Sandpack>

```js {expectedErrors: {'react-compiler': [8]}}
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');
  const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );

  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

با این تغییر، `getVisibleTodos()` فقط اگر `todos` یا `showActive` تغییر کنند فراخوانی می‌شود. تایپ در ورودی فقط متغیر استیت `text` را تغییر می‌دهد، پس فراخوانی `getVisibleTodos()` را تحریک نمی‌کند.

همچنین راه‌حل دیگری وجود دارد که به `useMemo` نیاز ندارد. از آنجا که متغیر استیت `text` نمی‌تواند روی فهرست todoها تأثیر بگذارد، می‌توانید فرم `NewTodo` را در یک کامپوننت جداگانه استخراج کنید و متغیر استیت `text` را درون آن قرار دهید:

<Sandpack>

```js
import { useState, useMemo } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const visibleTodos = getVisibleTodos(todos, showActive);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function NewTodo({ onAdd }) {
  const [text, setText] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        Add
      </button>
    </>
  );
}
```

```js src/todos.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() was called ${++calls} times`);
  const activeTodos = todos.filter(todo => !todo.completed);
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}

export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
```

```css
label { display: block; }
input { margin-top: 10px; }
```

</Sandpack>

این رویکرد هم نیازمندی‌ها را برآورده می‌کند. وقتی در ورودی تایپ می‌کنید، فقط متغیر استیت `text` به‌روزرسانی می‌شود. از آنجا که متغیر استیت `text` در کامپوننت فرزند `NewTodo` است، کامپوننت والد `TodoList` دوباره رندر نمی‌شود. به همین دلیل `getVisibleTodos()` وقتی تایپ می‌کنید فراخوانی نمی‌شود. (اگر `TodoList` به دلیل دیگری دوباره رندر شود همچنان فراخوانی می‌شد.)

</Solution>

#### بازنشانی استیت بدون افکت {/*reset-state-without-effects*/}

این کامپوننت `EditContact` یک شیء تماس به شکل `{ id, name, email }` به‌عنوان پراپ `savedContact` دریافت می‌کند. فیلدهای ورودی نام و ایمیل را ویرایش کنید. وقتی Save را فشار می‌دهید، دکمهٔ تماس بالای فرم به نام ویرایش‌شده به‌روزرسانی می‌شود. وقتی Reset را فشار می‌دهید، هر تغییر معلق در فرم دور ریخته می‌شود. با این رابط کاربری کار کنید تا حس آن را دریافت کنید.

وقتی با دکمه‌های بالا تماسی را انتخاب می‌کنید، فرم بازنشانی می‌شود تا جزئیات آن تماس را منعکس کند. این با یک افکت داخل `EditContact.js` انجام می‌شود. این افکت را حذف کنید. راه دیگری برای بازنشانی فرم وقتی `savedContact.id` تغییر می‌کند پیدا کنید.

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        savedContact={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js hidden
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js {expectedErrors: {'react-compiler': [8, 9]}} src/EditContact.js active
import { useState, useEffect } from 'react';

export default function EditContact({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  useEffect(() => {
    setName(savedContact.name);
    setEmail(savedContact.email);
  }, [savedContact]);

  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Hint>

خوب می‌شد اگر راهی بود تا به React بگوییم وقتی `savedContact.id` متفاوت است، فرم `EditContact` از نظر مفهومی _فرم تماس متفاوتی_ است و نباید استیت را حفظ کند. آیا چنین راهی را به یاد می‌آورید؟

</Hint>

<Solution>

کامپوننت `EditContact` را به دو بخش تقسیم کنید. تمام استیت فرم را به کامپوننت درونی `EditForm` منتقل کنید. کامپوننت بیرونی `EditContact` را export کنید، و کاری کنید که `savedContact.id` را به‌عنوان `key` به کامپوننت درونی `EditForm` عبور دهد. در نتیجه، کامپوننت درونی `EditForm` هر بار که تماس متفاوتی انتخاب می‌کنید تمام استیت فرم را بازنشانی می‌کند و DOM را بازسازی می‌نماید.

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        savedContact={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js hidden
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js active
import { useState } from 'react';

export default function EditContact(props) {
  return (
    <EditForm
      {...props}
      key={props.savedContact.id}
    />
  );
}

function EditForm({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

</Solution>

#### ثبت یک فرم بدون افکت {/*submit-a-form-without-effects*/}

این کامپوننت `Form` به شما اجازه می‌دهد پیامی به دوستتان بفرستید. وقتی فرم را ثبت می‌کنید، متغیر استیت `showForm` روی `false` تنظیم می‌شود. این یک افکت فراخوانی `sendMessage(message)` را تحریک می‌کند که پیام را می‌فرستد (می‌توانید آن را در کنسول ببینید). پس از ارسال پیام، یک دیالوگ «Thank you» با دکمهٔ «Open chat» می‌بینید که به شما اجازه می‌دهد به فرم برگردید.

کاربران اپلیکیشن شما پیام‌های بسیار زیادی می‌فرستند. برای سخت‌تر کردن چت کمی، تصمیم گرفته‌اید دیالوگ «Thank you» را *اول* به‌جای فرم نمایش دهید. متغیر استیت `showForm` را طوری تغییر دهید که به‌جای `true` روی `false` مقداردهی اولیه شود. به‌محض اینکه این تغییر را انجام می‌دهید، کنسول نشان می‌دهد که یک پیام خالی ارسال شده. چیزی در این منطق اشتباه است!

علت ریشه‌ای این مشکل چیست؟ و چگونه می‌توانید آن را برطرف کنید؟

<Hint>

آیا پیام باید _به این دلیل_ که کاربر دیالوگ «Thank you» را دید ارسال شود؟ یا برعکس؟

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!showForm) {
      sendMessage(message);
    }
  }, [showForm, message]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('Sending message: ' + message);
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

<Solution>

متغیر استیت `showForm` تعیین می‌کند که آیا فرم نمایش داده شود یا دیالوگ «Thank you». با این حال، شما پیام را به این دلیل که دیالوگ «Thank you» _نمایش داده شد_ نمی‌فرستید. می‌خواهید پیام را بفرستید زیرا کاربر _فرم را ثبت کرده است._ افکت گمراه‌کننده را حذف کنید و فراخوانی `sendMessage` را درون هندلر رویداد `handleSubmit` منتقل کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Form() {
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setShowForm(false);
    sendMessage(message);
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <button onClick={() => {
          setMessage('');
          setShowForm(true);
        }}>
          Open chat
        </button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit" disabled={message === ''}>
        Send
      </button>
    </form>
  );
}

function sendMessage(message) {
  console.log('Sending message: ' + message);
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

توجه کنید که در این نسخه، فقط _ثبت فرم_ (که یک رویداد است) باعث می‌شود پیام ارسال شود. فارغ از اینکه `showForm` ابتدا روی `true` یا `false` تنظیم شده، به‌خوبی کار می‌کند. (آن را روی `false` تنظیم کنید و توجه کنید هیچ پیام اضافی در کنسول نیست.)

</Solution>

</Challenges>
