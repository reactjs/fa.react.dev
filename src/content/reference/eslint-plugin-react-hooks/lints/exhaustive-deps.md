---
title: exhaustive-deps
---

<Intro>

تأیید می‌کند که آرایه‌های وابستگی برای هوک‌های ری‌اکت شامل همهٔ وابستگی‌های لازم باشند.

</Intro>

## جزئیات قانون {/*rule-details*/}

هوک‌های ری‌اکت مانند `useEffect`، `useMemo` و `useCallback` آرایه‌های وابستگی را می‌پذیرند. وقتی یک مقدار که داخل این هوک‌ها ارجاع داده شده در آرایهٔ وابستگی گنجانده نشده، ری‌اکت افکت را دوباره اجرا نمی‌کند یا وقتی آن وابستگی تغییر می‌کند مقدار را دوباره محاسبه نمی‌کند. این باعث closureهای قدیمی می‌شود که در آن هوک از مقادیر قدیمی استفاده می‌کند.

## نقض‌های رایج {/*common-violations*/}

این خطا اغلب زمانی رخ می‌دهد که سعی می‌کنید ری‌اکت را دربارهٔ وابستگی‌ها فریب دهید تا کنترل کنید چه زمان یک افکت اجرا شود. افکت‌ها باید کامپوننت شما را با سیستم‌های خارجی هماهنگ کنند. آرایهٔ وابستگی به ری‌اکت می‌گوید افکت از چه مقادیری استفاده می‌کند، بنابراین ری‌اکت می‌داند چه زمان دوباره هماهنگ‌سازی کند.

اگر خودتان را در حال مبارزه با لینتر یافتید، احتمالاً باید کد خود را بازسازی کنید. برای یادگیری نحوهٔ این کار، [حذف وابستگی‌های افکت](/learn/removing-effect-dependencies) را ببینید.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Missing dependency
useEffect(() => {
  console.log(count);
}, []); // Missing 'count'

// ❌ Missing prop
useEffect(() => {
  fetchUser(userId);
}, []); // Missing 'userId'

// ❌ Incomplete dependencies
useMemo(() => {
  return items.sort(sortOrder);
}, [items]); // Missing 'sortOrder'
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ All dependencies included
useEffect(() => {
  console.log(count);
}, [count]);

// ✅ All dependencies included
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

## رفع اشکال {/*troubleshooting*/}

### افزودن یک وابستگی تابع باعث حلقه‌های بی‌نهایت می‌شود {/*function-dependency-loops*/}

یک افکت دارید، اما در هر رندر یک تابع جدید ایجاد می‌کنید:

```js
// ❌ Causes infinite loop
const logItems = () => {
  console.log(items);
};

useEffect(() => {
  logItems();
}, [logItems]); // Infinite loop!
```

در بیشتر موارد، نیازی به افکت ندارید. در عوض تابع را در جایی که عمل اتفاق می‌افتد فراخوانی کنید:

```js
// ✅ Call it from the event handler
const logItems = () => {
  console.log(items);
};

return <button onClick={logItems}>Log</button>;

// ✅ Or derive during render if there's no side effect
items.forEach(item => {
  console.log(item);
});
```

اگر واقعاً به افکت نیاز دارید (مثلاً برای subscribe شدن به چیزی خارجی)، وابستگی را پایدار کنید:

```js
// ✅ useCallback keeps the function reference stable
const logItems = useCallback(() => {
  console.log(items);
}, [items]);

useEffect(() => {
  logItems();
}, [logItems]);

// ✅ Or move the logic straight into the effect
useEffect(() => {
  console.log(items);
}, [items]);
```

### اجرای یک افکت فقط یک‌بار {/*effect-on-mount*/}

می‌خواهید یک افکت را یک‌بار در mount اجرا کنید، اما لینتر دربارهٔ وابستگی‌های گمشده شکایت می‌کند:

```js
// ❌ Missing dependency
useEffect(() => {
  sendAnalytics(userId);
}, []); // Missing 'userId'
```

یا وابستگی را شامل کنید (توصیه‌شده) یا اگر واقعاً نیاز به اجرای یک‌بار دارید از یک ref استفاده کنید:

```js
// ✅ Include dependency
useEffect(() => {
  sendAnalytics(userId);
}, [userId]);

// ✅ Or use a ref guard inside an effect
const sent = useRef(false);

useEffect(() => {
  if (sent.current) {
    return;
  }

  sent.current = true;
  sendAnalytics(userId);
}, [userId]);
```

## گزینه‌ها {/*options*/}

این قانون یک شیء گزینه‌ها را می‌پذیرد:

```js
{
  "rules": {
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "(useMyCustomHook|useAnotherHook)"
    }]
  }
}
```

- `additionalHooks`: Regex برای هوک‌هایی که باید برای وابستگی‌های جامع بررسی شوند
