---
title: use-memo
---

<Intro>

استفاده از هوک `useMemo` بدون مقدار برگشتی را اعتبارسنجی می‌کند. برای اطلاعات بیشتر [مستندات `useMemo`](/reference/react/useMemo) را ببینید.

</Intro>

## جزئیات قانون {/*rule-details*/}

`useMemo` برای محاسبه و کش کردن مقادیر سنگین است، نه برای عوارض جانبی. بدون مقدار برگشتی، `useMemo` مقدار `undefined` برمی‌گرداند، که هدف آن را بی‌اثر می‌کند و احتمالاً نشان می‌دهد در حال استفاده از هوک اشتباه هستید.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js {expectedErrors: {'react-compiler': [3]}}
// ❌ No return value
function Component({ data }) {
  const processed = useMemo(() => {
    data.forEach(item => console.log(item));
    // Missing return!
  }, [data]);

  return <div>{processed}</div>; // Always undefined
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Returns computed value
function Component({ data }) {
  const processed = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]);

  return <div>{processed}</div>;
}
```

## رفع اشکال {/*troubleshooting*/}

### نیاز به اجرای عوارض جانبی وقتی وابستگی‌ها تغییر می‌کنند دارم {/*side-effects*/}

ممکن است سعی کنید از `useMemo` برای عوارض جانبی استفاده کنید:

{/* TODO(@poteto) fix compiler validation to check for unassigned useMemos */}
```js {expectedErrors: {'react-compiler': [4]}}
// ❌ Wrong: Side effects in useMemo
function Component({user}) {
  // No return value, just side effect
  useMemo(() => {
    analytics.track('UserViewed', {userId: user.id});
  }, [user.id]);

  // Not assigned to a variable
  useMemo(() => {
    return analytics.track('UserViewed', {userId: user.id});
  }, [user.id]);
}
```

اگر عارضه جانبی باید در پاسخ به تعامل کاربر رخ دهد، بهترین کار این است که عارضه جانبی را با event همراه کنید:

```js
// ✅ Good: Side effects in event handlers
function Component({user}) {
  const handleClick = () => {
    analytics.track('ButtonClicked', {userId: user.id});
    // Other click logic...
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

اگر عارضه جانبی استیت ری‌اکت را با برخی استیت‌های خارجی هماهنگ می‌کند (یا برعکس)، از `useEffect` استفاده کنید:

```js
// ✅ Good: Synchronization in useEffect
function Component({theme}) {
  useEffect(() => {
    localStorage.setItem('preferredTheme', theme);
    document.body.className = theme;
  }, [theme]);

  return <div>Current theme: {theme}</div>;
}
```
