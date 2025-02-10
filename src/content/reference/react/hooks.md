---
title: "هوک‌های داخلی ری‌اکت"
---

<Intro>

*هوک‌ها* به شما اجازه می‌دهند از ویژگی‌های مختلف ری‌اکت در کامپوننت‌های خود استفاده کنید. شما می‌توانید از هوک‌های داخلی استفاده کنید یا آن‌ها را ترکیب کنید تا هوک‌های مخصوص خود را بسازید. این صفحه لیست تمام هوک‌های داخلی در ری‌اکت را نمایش می‌دهد.

</Intro>

---

## هوک‌های State {/*state-hooks*/}

*State* به یک کامپوننت اجازه می‌دهد [اطلاعاتی مانند ورودی کاربر را "به خاطر بسپارد."](/learn/state-a-components-memory) برای مثال، یک کامپوننت فرم می‌تواند از state برای ذخیره مقدار ورودی استفاده کند، در حالی که یک گالری تصاویر می‌تواند از state برای ذخیره شاخص عکس انتخابی استفاده کند.

برای افزودن state به یک کامپوننت، از یکی از این هوک‌ها استفاده کنید:

* [`useState`](/reference/react/useState) یک متغیر state اعلام می‌کند که می‌توانید مستقیماً آن را به‌روزرسانی کنید.
* [`useReducer`](/reference/react/useReducer) یک متغیر state اعلام می‌کند که منطق به‌روزرسانی آن درون [تابع reducer](/learn/extracting-state-logic-into-a-reducer) قرار دارد.

```js
function ImageGallery() {
  const [index, setIndex] = useState(0);
  // ...
```

---

## هوک‌های Context {/*context-hooks*/}

*Context* به یک کامپوننت اجازه می‌دهد [اطلاعاتی از والدین دور دریافت کند بدون اینکه آن ها را به عنوان props ارسال کند.](/learn/passing-props-to-a-component) برای مثال، کامپوننت سطح بالای برنامه شما می‌تواند تم فعلی رابط کاربری را به تمام کامپوننت‌های زیرین ارسال کند، مهم نیست چقدر عمیق باشند.

* [`useContext`](/reference/react/useContext) یک context را می‌خواند و به آن اشتراک می‌دهد.

```js
function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

---

## هوک‌های Ref {/*ref-hooks*/}

*Ref ها* به یک کامپوننت اجازه می‌دهند [اطلاعاتی را نگهداری کنند که برای رندرینگ استفاده نمی‌شوند،](/learn/referencing-values-with-refs) مانند یک نود DOM یا یک شناسه تایم‌اوت. بر خلاف state، به‌روزرسانی یک ref کامپوننت شما را مجدداً رندر نمی‌کند. Ref ها یک "راه خروج" از پارادایم ری‌اکت هستند. آن‌ها زمانی مفید هستند که نیاز به کار با سیستم‌های غیر ری‌اکتی داشته باشید، مانند APIهای مرورگر داخلی.

* [`useRef`](/reference/react/useRef) یک ref اعلام می‌کند. شما می‌توانید هر مقداری را در آن نگه دارید، اما اغلب برای نگهداری یک نود DOM استفاده می‌شود.
* [`useImperativeHandle`](/reference/react/useImperativeHandle) به شما اجازه می‌دهد refی را که توسط کامپوننت شما نمایش داده می‌شود سفارشی کنید. این به ندرت استفاده می‌شود.

```js
function Form() {
  const inputRef = useRef(null);
  // ...
```

---

## هوک‌های Effect {/*effect-hooks*/}

*Effect ها* به یک کامپوننت اجازه می‌دهند [با سیستم‌های خارجی ارتباط برقرار کرده و همگام شوند.](/learn/synchronizing-with-effects) این شامل مدیریت شبکه، DOM مرورگر، انیمیشن‌ها، ویجت‌های نوشته شده با کتابخانه‌های رابط کاربری مختلف و دیگر کدهای غیر ری‌اکتی می‌شود.

* [`useEffect`](/reference/react/useEffect) یک کامپوننت را به یک سیستم خارجی متصل می‌کند.

```js
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  // ...
```

Effect ها یک "راه خروج" از پارادایم ری‌اکت هستند. از Effect ها برای مدیریت جریان داده‌های برنامه خود استفاده نکنید. اگر با سیستم خارجی ارتباط ندارید، [ممکن است نیازی به Effect نداشته باشید.](/learn/you-might-not-need-an-effect)

دو نوع استفاده نادر از `useEffect` وجود دارد که تفاوت‌هایی در زمان‌بندی دارند:

* [`useLayoutEffect`](/reference/react/useLayoutEffect) قبل از اینکه مرورگر صفحه را بازپخش کند، اجرا می‌شود. شما می‌توانید در اینجا layout را اندازه‌گیری کنید.
* [`useInsertionEffect`](/reference/react/useInsertionEffect) قبل از اینکه ری‌اکت تغییراتی در DOM ایجاد کند، اجرا می‌شود. کتابخانه‌ها می‌توانند در این مرحله CSS دینامیک را درج کنند.

---

## هوک‌های Performance {/*performance-hooks*/}

یک روش معمول برای بهینه‌سازی عملکرد رندرینگ، پرهیز از کارهای غیر ضروری است. برای مثال، شما می‌توانید به ری‌اکت بگویید که از یک محاسبه کش شده استفاده کند یا اگر داده‌ها از آخرین رندر تغییر نکرده‌اند، رندر را پرش کند.

برای پرهیز از محاسبات و رندرینگ‌های غیر ضروری، از یکی از این هوک‌ها استفاده کنید:

- [`useMemo`](/reference/react/useMemo) به شما اجازه می‌دهد نتیجه یک محاسبه پرهزینه را کش کنید.
- [`useCallback`](/reference/react/useCallback) به شما اجازه می‌دهد تعریف یک تابع را قبل از ارسال آن به یک کامپوننت بهینه‌سازی شده کش کنید.

```js
function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

گاهی اوقات، شما نمی‌توانید رندرینگ را پرش کنید زیرا صفحه واقعاً نیاز به به‌روزرسانی دارد. در این صورت، شما می‌توانید عملکرد را با جدا کردن به‌روزرسانی‌های مسدودکننده که باید همگام باشند (مانند تایپ کردن درون یک ورودی) از به‌روزرسانی‌های غیر مسدودکننده که نیاز به مسدود کردن رابط کاربری ندارند (مانند به‌روزرسانی یک نمودار)، بهبود بخشید.

برای اولویت‌بندی رندرینگ، از یکی از این هوک‌ها استفاده کنید:

- [`useTransition`](/reference/react/useTransition) به شما اجازه می‌دهد یک تغییر حالت را غیر مسدودکننده علامت‌گذاری کرده و اجازه دهید به‌روزرسانی‌های دیگر آن را قطع کنند.
- [`useDeferredValue`](/reference/react/useDeferredValue) به شما اجازه می‌دهد به‌روزرسانی قسمت غیر حیاتی رابط کاربری را به تأخیر بیاندازید و اجازه دهید بخش‌های دیگر ابتدا به‌روزرسانی شوند.

---

## هوک‌های Resource {/*resource-hooks*/}

*Resource ها* می‌توانند توسط یک کامپوننت بدون اینکه بخشی از state آن‌ها باشند مورد استفاده قرار گیرند. برای مثال، یک کامپوننت می‌تواند یک پیام را از یک Promise بخواند یا اطلاعات استایل را از یک context بخواند.

برای خواندن یک مقدار از یک منبع، از این هوک استفاده کنید:

- [`use`](/reference/react/use) به شما اجازه می‌دهد مقدار یک منبع را بخوانید مانند [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا [context](/learn/passing-data-deeply-with-context).

```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```

---

## سایر هوک‌ها {/*other-hooks*/}

این هوک‌ها بیشتر برای نویسندگان کتابخانه مفید هستند و به‌طور معمول در کد برنامه استفاده نمی‌شوند.

- [`useDebugValue`](/reference/react/useDebugValue) به شما اجازه می‌دهد برچسب خود را برای هوک مخصوص خود در DevTools ری‌اکت سفارشی کنید.
- [`useId`](/reference/react/useId) به یک کامپوننت اجازه می‌دهد یک ID یکتایی با خود داشته باشد. معمولاً با APIهای دسترسی پذیری استفاده می‌شود.
- [`useSyncExternalStore`](/reference/react/useSyncExternalStore) به یک کامپوننت اجازه می‌دهد به یک فروشگاه خارجی مشترک شود.

---

## هوک‌های مخصوص خودتان {/*your-own-hooks*/}

شما همچنین می‌توانید [هوک‌های سفارشی خود را به عنوان توابع JavaScript تعریف کنید.](/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component)