---
title: refs
---

<Intro>

استفادهٔ صحیح از refها را اعتبارسنجی می‌کند، بدون خواندن/نوشتن در طول رندر. بخش «pitfalls» در [نحوهٔ استفاده از `useRef()`](/reference/react/useRef#usage) را ببینید.

</Intro>

## جزئیات قانون {/*rule-details*/}

refها مقادیری را نگه می‌دارند که برای رندر استفاده نمی‌شوند. برخلاف استیت، تغییر یک ref رندر مجدد را تحریک نمی‌کند. خواندن یا نوشتن `ref.current` در طول رندر انتظارات ری‌اکت را می‌شکند. refها ممکن است هنگام تلاش برای خواندن آن‌ها مقداردهی اولیه نشده باشند، و مقادیرشان ممکن است قدیمی یا ناسازگار باشد.

## چگونه refها را تشخیص می‌دهد {/*how-it-detects-refs*/}

لینت این قوانین را فقط روی مقادیری که می‌داند ref هستند اعمال می‌کند. یک مقدار زمانی به‌عنوان ref استنباط می‌شود که کامپایلر هر یک از الگوهای زیر را ببیند:

- برگردانده‌شده از `useRef()` یا `React.createRef()`.

  ```js
  const scrollRef = useRef(null);
  ```

- یک شناسه با نام `ref` یا ختم‌شده به `Ref` که از `.current` می‌خواند یا به آن می‌نویسد.

  ```js
  buttonRef.current = node;
  ```

- پاس‌شده از طریق یک پراپ `ref` در JSX (مثلاً `<div ref={someRef} />`).

  ```jsx
  <input ref={inputRef} />
  ```

وقتی چیزی به‌عنوان ref علامت‌گذاری شد، آن استنباط از طریق انتساب‌ها، destructuring، یا فراخوانی‌های کمکی با مقدار دنبال می‌شود. این به لینت اجازه می‌دهد نقض‌ها را حتی وقتی `ref.current` داخل تابع دیگری که ref را به‌عنوان آرگومان دریافت کرده است، دسترسی می‌شود، ظاهر کند.

## نقض‌های رایج {/*common-violations*/}

- خواندن `ref.current` در طول رندر
- به‌روزرسانی `refs` در طول رندر
- استفاده از `refs` برای مقادیری که باید استیت باشند

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Reading ref during render
function Component() {
  const ref = useRef(0);
  const value = ref.current; // Don't read during render
  return <div>{value}</div>;
}

// ❌ Modifying ref during render
function Component({value}) {
  const ref = useRef(null);
  ref.current = value; // Don't modify during render
  return <div />;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Read ref in effects/handlers
function Component() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.offsetWidth); // OK in effect
    }
  });

  return <div ref={ref} />;
}

// ✅ Use state for UI values
function Component() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

// ✅ Lazy initialization of ref value
function Component() {
  const ref = useRef(null);

  // Initialize only once on first use
  if (ref.current === null) {
    ref.current = expensiveComputation(); // OK - lazy initialization
  }

  const handleClick = () => {
    console.log(ref.current); // Use the initialized value
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## رفع اشکال {/*troubleshooting*/}

### لینتر object سادهٔ من با `.current` را علامت‌گذاری کرد {/*plain-object-current*/}

هیوریستیک نام به‌عمد `ref.current` و `fooRef.current` را به‌عنوان refهای واقعی در نظر می‌گیرد. اگر در حال مدل‌سازی یک object container سفارشی هستید، نام متفاوتی انتخاب کنید (مثلاً `box`) یا مقدار قابل تغییر را به استیت منتقل کنید. تغییر نام از لینت اجتناب می‌کند زیرا کامپایلر از استنباط آن به‌عنوان ref متوقف می‌شود.
