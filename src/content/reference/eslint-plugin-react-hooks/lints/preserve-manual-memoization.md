---
title: preserve-manual-memoization
---

<Intro>

تأیید می‌کند که memoization دستی موجود توسط کامپایلر حفظ می‌شود. React Compiler فقط در صورتی کامپوننت‌ها و هوک‌ها را کامپایل می‌کند که استنباط آن با [memoization دستی موجود مطابقت داشته یا فراتر رود](/learn/react-compiler/introduction#what-should-i-do-about-usememo-usecallback-and-reactmemo).

</Intro>

## جزئیات قانون {/*rule-details*/}

React Compiler فراخوانی‌های `useMemo`، `useCallback` و `React.memo` موجود شما را حفظ می‌کند. اگر چیزی را به‌صورت دستی memoize کرده‌اید، کامپایلر فرض می‌کند دلیل خوبی داشته‌اید و آن را حذف نمی‌کند. با این حال، وابستگی‌های ناقص مانع از اینکه کامپایلر جریان دادهٔ کد شما را درک کند و بهینه‌سازی‌های بیشتر اعمال کند، می‌شوند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Missing dependencies in useMemo
function Component({ data, filter }) {
  const filtered = useMemo(
    () => data.filter(filter),
    [data] // Missing 'filter' dependency
  );

  return <List items={filtered} />;
}

// ❌ Missing dependencies in useCallback
function Component({ onUpdate, value }) {
  const handleClick = useCallback(() => {
    onUpdate(value);
  }, [onUpdate]); // Missing 'value'

  return <button onClick={handleClick}>Update</button>;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Complete dependencies
function Component({ data, filter }) {
  const filtered = useMemo(
    () => data.filter(filter),
    [data, filter] // All dependencies included
  );

  return <List items={filtered} />;
}

// ✅ Or let the compiler handle it
function Component({ data, filter }) {
  // No manual memoization needed
  const filtered = data.filter(filter);
  return <List items={filtered} />;
}
```

## رفع اشکال {/*troubleshooting*/}

### آیا باید memoization دستی خود را حذف کنم؟ {/*remove-manual-memoization*/}

ممکن است تعجب کنید آیا React Compiler memoization دستی را غیرضروری می‌کند:

```js
// Do I still need this?
function Component({items, sortBy}) {
  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      return a[sortBy] - b[sortBy];
    });
  }, [items, sortBy]);

  return <List items={sorted} />;
}
```

اگر از React Compiler استفاده می‌کنید می‌توانید آن را به‌طور امن حذف کنید:

```js
// ✅ Better: Let the compiler optimize
function Component({items, sortBy}) {
  const sorted = [...items].sort((a, b) => {
    return a[sortBy] - b[sortBy];
  });

  return <List items={sorted} />;
}
```
