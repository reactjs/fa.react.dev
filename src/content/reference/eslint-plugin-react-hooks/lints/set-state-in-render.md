---
title: set-state-in-render
---

<Intro>

تنظیم استیت در طول رندر را اعتبارسنجی می‌کند، که می‌تواند رندرهای اضافی و حلقه‌های رندر بی‌نهایت بالقوه را تحریک کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

فراخوانی `setState` در طول رندر قبل از اتمام رندر فعلی، رندر دیگری را تحریک می‌کند. این یک حلقهٔ بی‌نهایت ایجاد می‌کند که اپ شما را crash می‌کند.

## نقض‌های رایج {/*common-violations*/}

### نامعتبر {/*invalid*/}

```js {expectedErrors: {'react-compiler': [4]}}
// ❌ setState directly in render
function Component({value}) {
  const [count, setCount] = useState(0);
  setCount(value); // Infinite loop!
  return <div>{count}</div>;
}
```

### معتبر {/*valid*/}

```js
// ✅ Derive during render
function Component({items}) {
  const sorted = [...items].sort(); // Just calculate it in render
  return <ul>{sorted.map(/*...*/)}</ul>;
}

// ✅ Set state in event handler
function Component() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

// ✅ Derive from props instead of setting state
function Component({user}) {
  const name = user?.name || '';
  const email = user?.email || '';
  return <div>{name}</div>;
}
```

## رفع اشکال {/*troubleshooting*/}

### می‌خواهم استیت را با یک پراپ هماهنگ کنم {/*clamp-state-to-prop*/}

یک مشکل رایج، تلاش برای "اصلاح" استیت بعد از رندر است. فرض کنید می‌خواهید یک شمارنده را از تجاوز به یک پراپ `max` نگه دارید:

```js
// ❌ Wrong: clamps during render
function Counter({max}) {
  const [count, setCount] = useState(0);

  if (count > max) {
    setCount(max);
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

به‌محض اینکه `count` از `max` تجاوز کند، یک حلقهٔ بی‌نهایت تحریک می‌شود.

در عوض، اغلب بهتر است این منطق را به event (جایی که استیت اول تنظیم می‌شود) منتقل کنید. مثلاً می‌توانید حداکثر را در لحظهٔ به‌روزرسانی استیت اعمال کنید:

```js
// ✅ Clamp when updating
function Counter({max}) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(current => Math.min(current + 1, max));
  };

  return <button onClick={increment}>{count}</button>;
}
```

حالا setter فقط در پاس به کلیک اجرا می‌شود، ری‌اکت رندر را به‌طور عادی تمام می‌کند، و `count` هرگز از `max` عبور نمی‌کند.
