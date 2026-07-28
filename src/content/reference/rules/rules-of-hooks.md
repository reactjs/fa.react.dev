---
title: قوانین هوک‌ها
---

<Intro>
هوک‌ها با استفاده از تابع‌های جاوااسکریپت تعریف می‌شوند، اما آن‌ها نوع خاصی از منطق رابط کاربری قابل استفادهٔ مجدد را با محدودیت‌هایی در مورد اینکه کجا می‌توانند فراخوانی شوند، نمایندگی می‌کنند.
</Intro>

<InlineToc />

---

##  هوک‌ها را فقط در سطح بالا فراخوانی کنید {/*only-call-hooks-at-the-top-level*/}

تابع‌هایی که نامشان با `use` شروع می‌شود در ری‌اکت [*هوک*](/reference/react) نامیده می‌شوند.

**هوک‌ها را داخل حلقه‌ها، شرط‌ها، تابع‌های تودرتو، یا بلاک‌های `try`/`catch`/`finally` فراخوانی نکنید.** در عوض، همیشه از هوک‌ها در سطح بالا تابع ری‌اکت خود، قبل از هر return زودهنگام استفاده کنید. فقط می‌توانید هوک‌ها را در حالی فراخوانی کنید که ری‌اکت در حال رندر یک تابع کامپوننت است:

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

فراخوانی هوک‌ها (تابع‌هایی که با `use` شروع می‌شوند) در هیچ مورد دیگری **پشتیبانی نمی‌شود**، مثلاً:

* 🔴 هوک‌ها را داخل شرط‌ها یا حلقه‌ها فراخوانی نکنید.
* 🔴 هوک‌ها را بعد از یک عبارت `return` شرطی فراخوانی نکنید.
* 🔴 هوک‌ها را در event handlerها فراخوانی نکنید.
* 🔴 هوک‌ها را در کامپوننت‌های کلاسی فراخوانی نکنید.
* 🔴 هوک‌ها را داخل تابع‌هایی که به `useMemo`، `useReducer` یا `useEffect` پاس داده می‌شوند فراخوانی نکنید.
* 🔴 هوک‌ها را داخل بلاک‌های `try`/`catch`/`finally` فراخوانی نکنید.

اگر این قوانین را بشکنید، ممکن است این خطا را ببینید.

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

function Bad() {
  try {
    // 🔴 Bad: inside try/catch/finally block (to fix, move it outside!)
    const [x, setX] = useState(0);
  } catch {
    const [x, setX] = useState(1);
  }
}
```

می‌توانید از [پلاگین `eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) برای گرفتن این اشتباهات استفاده کنید.

<Note>

[هوک‌های سفارشی](/learn/reusing-logic-with-custom-hooks) *ممکن است* سایر هوک‌ها را فراخوانی کنند (این کل منظورشان است). این کار می‌کند زیرا هوک‌های سفارشی نیز فرض می‌شوند فقط در حالی فراخوانی شوند که یک تابع کامپوننت در حال رندر است.

</Note>

---

## هوک‌ها را فقط از تابع‌های ری‌اکت فراخوانی کنید {/*only-call-hooks-from-react-functions*/}

هوک‌ها را از تابع‌های معمولی جاوااسکریپت فراخوانی نکنید. در عوض، می‌توانید:

✅ هوک‌ها را از کامپوننت‌های تابعی ری‌اکت فراخوانی کنید.
✅ هوک‌ها را از [هوک‌های سفارشی](/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component) فراخوانی کنید.

با پیروی از این قانون، تضمین می‌کنید که همهٔ منطق استیت‌دار در یک کامپوننت از کد منبع آن به‌وضوح قابل مشاهده است.

```js {2,5}
function FriendList() {
  const [onlineStatus, setOnlineStatus] = useOnlineStatus(); // ✅
}

function setOnlineStatus() { // ❌ Not a component or custom Hook!
  const [onlineStatus, setOnlineStatus] = useOnlineStatus();
}
```
