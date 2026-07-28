---
title: قوانین هوک‌ها
---

احتمالاً به این دلیل اینجا هستید که پیام خطای زیر را دریافت کرده‌اید:

<ConsoleBlock level="error">

Hooks can only be called inside the body of a function component.

</ConsoleBlock>

سه دلیل رایج وجود دارد که ممکن است آن را ببینید:

1. ممکن است در حال **نقض قوانین هوک‌ها** باشید.
2. ممکن است **نسخه‌های ناهماهنگ** ری‌اکت و React DOM داشته باشید.
3. ممکن است **بیش از یک نسخه از ری‌اکت** در یک برنامه داشته باشید.

بیایید هر یک از این موارد را بررسی کنیم.

## نقض قوانین هوک‌ها {/*breaking-rules-of-hooks*/}

توابعی که نامشان با `use` شروع می‌شود در ری‌اکت [*هوک*](/reference/react) نامیده می‌شوند.

**هوک‌ها را داخل حلقه‌ها، شرط‌ها یا توابع تودرتو فراخوانی نکنید.** در عوض، همیشه از هوک‌ها در سطح بالای تابع ری‌اکت خود، پیش از هر return زودهنگام استفاده کنید. فقط می‌توانید هوک‌ها را هنگام رندر کردن یک کامپوننت تابعی فراخوانی کنید:

* ✅ آن‌ها را در سطح بالا در بدنهٔ یک [کامپوننت تابعی](/learn/your-first-component) فراخوانی کنید.
* ✅ آن‌ها را در سطح بالا در بدنهٔ یک [هوک سفارشی](/learn/reusing-logic-with-custom-hooks) فراخوانی کنید.

```js{2-3,8-9}
function Counter() {
  // ✅ Good: top-level in a function component
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ Good: top-level in a custom Hook
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

فراخوانی هوک‌ها (توابعی که با `use` شروع می‌شوند) در موارد دیگر **پشتیبانی نمی‌شود**، برای مثال:

* 🔴 هوک‌ها را داخل شرط‌ها یا حلقه‌ها فراخوانی نکنید.
* 🔴 هوک‌ها را پس از یک دستور `return` شرطی فراخوانی نکنید.
* 🔴 هوک‌ها را در مدیریت‌کننده‌های رویداد فراخوانی نکنید.
* 🔴 هوک‌ها را در کامپوننت‌های کلاسی فراخوانی نکنید.
* 🔴 هوک‌ها را داخل توابعی که به `useMemo`، `useReducer` یا `useEffect` پاس داده می‌شوند فراخوانی نکنید.

اگر این قوانین را نقض کنید، ممکن است این خطا را ببینید.

```js{3-4,11-12,20-21}
function Bad({ cond }) {
  if (cond) {
    // 🔴 Bad: inside a condition (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  for (let i = 0; i < 10; i++) {
    // 🔴 Bad: inside a loop (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad({ cond }) {
  if (cond) {
    return;
  }
  // 🔴 Bad: after a conditional return (to fix, move it before the return!)
  const theme = useContext(ThemeContext);
  // ...
}

function Bad() {
  function handleClick() {
    // 🔴 Bad: inside an event handler (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  const style = useMemo(() => {
    // 🔴 Bad: inside useMemo (to fix, move it outside!)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Bad extends React.Component {
  render() {
    // 🔴 Bad: inside a class component (to fix, write a function component instead of a class!)
    useEffect(() => {})
    // ...
  }
}
```

می‌توانید از [پلاگین `eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) برای گرفتن این اشتباهات استفاده کنید.

<Note>

[هوک‌های سفارشی](/learn/reusing-logic-with-custom-hooks) *ممکن است* هوک‌های دیگر را فراخوانی کنند (این کل هدف آن‌هاست). این کار می‌کند زیرا هوک‌های سفارشی نیز قرار است فقط هنگام رندر شدن یک کامپوننت تابعی فراخوانی شوند.

</Note>

## نسخه‌های ناهماهنگ ری‌اکت و React DOM {/*mismatching-versions-of-react-and-react-dom*/}

ممکن است از نسخه‌ای از `react-dom` (< 16.8.0) یا `react-native` (< 0.59) استفاده کنید که هنوز از هوک‌ها پشتیبانی نمی‌کند. می‌توانید `npm ls react-dom` یا `npm ls react-native` را در پوشهٔ برنامه خود اجرا کنید تا بررسی کنید از کدام نسخه استفاده می‌کنید. اگر بیش از یکی از آن‌ها را پیدا کردید، این ممکن است مشکلاتی ایجاد کند (بیشتر در ادامه).

## ری‌اکت تکراری {/*duplicate-react*/}

برای اینکه هوک‌ها کار کنند، import مربوط به `react` از کد برنامهٔ شما باید به همان ماژولی resolve شود که import مربوط به `react` از داخل پکیج `react-dom`.

اگر این importهای `react` به دو شیء export متفاوت resolve شوند، این هشدار را خواهید دید. این ممکن است رخ دهد اگر **به‌طور تصادفی با دو نسخه** از پکیج `react` مواجه شوید.

اگر از Node برای مدیریت پکیج‌ها استفاده می‌کنید، می‌توانید این بررسی را در پوشهٔ پروژهٔ خود اجرا کنید:

<TerminalBlock>

npm ls react

</TerminalBlock>

اگر بیش از یک ری‌اکت می‌بینید، باید بفهمید چرا این اتفاق می‌افتد و درخت وابستگی‌های خود را اصلاح کنید. برای مثال، شاید کتابخانه‌ای که استفاده می‌کنید به‌اشتباه `react` را به‌عنوان وابستگی (به‌جای peer dependency) مشخص کرده است. تا زمانی که آن کتابخانه اصلاح شود، [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/) یک راه‌حل ممکن است.

همچنین می‌توانید با اضافه کردن چند log و راه‌اندازی مجدد سرور توسعهٔ خود، این مشکل را دیباگ کنید:

```js
// Add this in node_modules/react-dom/index.js
window.React1 = require('react');

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
```

اگر `false` چاپ کرد ممکن است دو ری‌اکت داشته باشید و باید بفهمید چرا این اتفاق افتاده است. [این issue](https://github.com/facebook/react/issues/13991) شامل برخی دلایل رایجی است که انجمن با آن مواجه شده است.

این مشکل همچنین ممکن است هنگام استفاده از `npm link` یا معادل آن پیش بیاید. در آن حالت، باندلر شما ممکن است دو ری‌اکت را «ببیند» — یکی در پوشهٔ برنامه و یکی در پوشهٔ کتابخانه. با فرض اینکه `myapp` و `mylib` پوشه‌های خواهر هستند، یک رفع ممکن اجرای `npm link ../myapp/node_modules/react` از `mylib` است. این باید کتابخانه را وادار به استفاده از نسخهٔ ری‌اکت برنامه کند.

<Note>

به‌طور کلی، ری‌اکت از استفاده از چند نسخهٔ مستقل در یک صفحه پشتیبانی می‌کند (برای مثال، اگر یک برنامه و یک ویجت شخص ثالث هر دو از آن استفاده کنند). فقط زمانی می‌شکند که `require('react')` به‌طور متفاوتی بین کامپوننت و نسخهٔ `react-dom` که با آن رندر شده resolve شود.

</Note>

## دلایل دیگر {/*other-causes*/}

اگر هیچ‌کدام از این موارد کار نکرد، لطفاً در [این issue](https://github.com/facebook/react/issues/13991) نظر دهید و ما سعی می‌کنیم کمک کنیم. سعی کنید یک مثال بازتولید کوچک ایجاد کنید — ممکن است هنگام انجام آن مشکل را کشف کنید.
