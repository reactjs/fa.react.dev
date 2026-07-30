---
title: rules-of-hooks
---

<Intro>

تأیید می‌کند که کامپوننت‌ها و هوک‌ها از [قوانین هوک‌ها](/reference/rules/rules-of-hooks) پیروی می‌کنند.

</Intro>

## جزئیات قانون {/*rule-details*/}

ری‌اکت برای حفظ صحیح استیت بین رندرها به ترتیبی که هوک‌ها فراخوانی می‌شوند تکیه می‌کند. هر بار که کامپوننت شما رندر می‌شود، ری‌اکت انتظار دارد دقیقاً همان هوک‌ها به‌دقیقاً همان ترتیب فراخوانی شوند. وقتی هوک‌ها به‌صورت شرطی یا در حلقه‌ها فراخوانی می‌شوند، ری‌اکت ردیابی اینکه کدام استیت به کدام فراخوانی هوک مربوط است را از دست می‌دهد، که منجر به باگ‌هایی مانند عدم تطابق استیت و خطاهای «Rendered fewer/more hooks than expected» می‌شود.

## نقض‌های رایج {/*common-violations*/}

این الگوها قوانین هوک‌ها را نقض می‌کنند:

- **هوک‌ها در شرط‌ها** (`if`/`else`، سه‌تایی، `&&`/`||`)
- **هوک‌ها در حلقه‌ها** (`for`، `while`، `do-while`)
- **هوک‌ها بعد از return زودهنگام**
- **هوک‌ها در callbackها/event handlerها**
- **هوک‌ها در تابع‌های async**
- **هوک‌ها در متدهای کلاس**
- **هوک‌ها در سطح ماژول**

<Note>

### هوک `use` {/*use-hook*/}

هوک `use` با سایر هوک‌های ری‌اکت متفاوت است. می‌توانید آن را به‌صورت شرطی و در حلقه‌ها فراخوانی کنید:

```js
// ✅ `use` can be conditional
if (shouldFetch) {
  const data = use(fetchPromise);
}

// ✅ `use` can be in loops
for (const promise of promises) {
  results.push(use(promise));
}
```

با این حال، `use` همچنان محدودیت‌هایی دارد:
- نمی‌تواند در try/catch پیچیده شود
- باید داخل یک کامپوننت یا هوک فراخوانی شود

بیشتر بدانید: [مرجع API `use`](/reference/react/use)

</Note>

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Hook in condition
if (isLoggedIn) {
  const [user, setUser] = useState(null);
}

// ❌ Hook after early return
if (!data) return <Loading />;
const [processed, setProcessed] = useState(data);

// ❌ Hook in callback
<button onClick={() => {
  const [clicked, setClicked] = useState(false);
}}/>

// ❌ `use` in try/catch
try {
  const data = use(promise);
} catch (e) {
  // error handling
}

// ❌ Hook at module level
const globalState = useState(0); // Outside component
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
function Component({ isSpecial, shouldFetch, fetchPromise }) {
  // ✅ Hooks at top level
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  if (!isSpecial) {
    return null;
  }

  if (shouldFetch) {
    // ✅ `use` can be conditional
    const data = use(fetchPromise);
    return <div>{data}</div>;
  }

  return <div>{name}: {count}</div>;
}
```

## رفع اشکال {/*troubleshooting*/}

### می‌خواهم داده‌ها را بر اساس برخی شرایط fetch کنم {/*conditional-data-fetching*/}

سعی می‌کنید useEffect را به‌صورت شرطی فراخوانی کنید:

```js
// ❌ Conditional hook
if (isLoggedIn) {
  useEffect(() => {
    fetchUserData();
  }, []);
}
```

هوک را به‌صورت بدون قید و شرط فراخوانی کنید، شرط را داخل هوک بررسی کنید:

```js
// ✅ Condition inside hook
useEffect(() => {
  if (isLoggedIn) {
    fetchUserData();
  }
}, [isLoggedIn]);
```

<Note>

روش‌های بهتری برای fetch داده‌ها نسبت به استفاده از useEffect وجود دارد. برای fetch داده‌ها React Query، useSWR یا React Router 6.4+ را در نظر بگیرید. این راه‌حل‌ها deduplication درخواست‌ها، caching پاسخ‌ها، و اجتناب از waterfallهای شبکه را مدیریت می‌کنند.

بیشتر بدانید: [Fetch داده‌ها](/learn/synchronizing-with-effects#fetching-data)

</Note>

### برای سناریوهای مختلف به استیت متفاوتی نیاز دارم {/*conditional-state-initialization*/}

سعی می‌کنید استیت را به‌صورت شرطی مقداردهی اولیه کنید:

```js
// ❌ Conditional state
if (userType === 'admin') {
  const [permissions, setPermissions] = useState(adminPerms);
} else {
  const [permissions, setPermissions] = useState(userPerms);
}
```

همیشه useState را فراخوانی کنید، مقدار اولیه را به‌صورت شرطی تنظیم کنید:

```js
// ✅ Conditional initial value
const [permissions, setPermissions] = useState(
  userType === 'admin' ? adminPerms : userPerms
);
```
