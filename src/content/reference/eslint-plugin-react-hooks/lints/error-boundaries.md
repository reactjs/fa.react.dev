---
title: error-boundaries
---

<Intro>

استفاده از Error Boundaryها به‌جای try/catch برای خطاهای کامپوننت‌های فرزند را اعتبارسنجی می‌کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

بلاک‌های try/catch نمی‌توانند خطاهایی که در طول فرآیند رندر ری‌اکت رخ می‌دهند را بگیرند. خطاهای پرتاب‌شده در متدهای رندر یا هوک‌ها از درخت کامپوننت بالا می‌روند. فقط [Error Boundaryها](/reference/react/Component#catching-rendering-errors-with-an-error-boundary) می‌توانند این خطاها را بگیرند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js {expectedErrors: {'react-compiler': [4]}}
// ❌ Try/catch won't catch render errors
function Parent() {
  try {
    return <ChildComponent />; // If this throws, catch won't help
  } catch (error) {
    return <div>Error occurred</div>;
  }
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Using error boundary
function Parent() {
  return (
    <ErrorBoundary>
      <ChildComponent />
    </ErrorBoundary>
  );
}
```

## رفع اشکال {/*troubleshooting*/}

### چرا لینتر به من می‌گوید که `use` را در `try`/`catch` نپیچانم؟ {/*why-is-the-linter-telling-me-not-to-wrap-use-in-trycatch*/}

هوک `use` در معنای سنتی خطا پرتاب نمی‌کند، بلکه اجرای کامپوننت را suspend می‌کند. وقتی `use` با یک promise در حالت pending مواجه می‌شود، کامپوننت را suspend می‌کند و به ری‌اکت اجازه می‌دهد یک fallback نمایش دهد. فقط ساسپنس و Error Boundaryها می‌توانند این موارد را مدیریت کنند. لینتر در مورد `try`/`catch` اطراف `use` هشدار می‌دهد تا از سردرگمی جلوگیری کند، زیرا بلاک `catch` هرگز اجرا نخواهد شد.

```js {expectedErrors: {'react-compiler': [5]}}
// ❌ Try/catch around `use` hook
function Component({promise}) {
  try {
    const data = use(promise); // Won't catch - `use` suspends, not throws
    return <div>{data}</div>;
  } catch (error) {
    return <div>Failed to load</div>; // Unreachable
  }
}

// ✅ Error boundary catches `use` errors
function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <DataComponent promise={fetchData()} />
      </Suspense>
    </ErrorBoundary>
  );
}
```
