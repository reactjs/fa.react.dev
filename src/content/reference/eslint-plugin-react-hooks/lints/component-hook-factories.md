---
title: component-hook-factories
---

<Intro>

تابع‌های مرتبه بالاتری که کامپوننت‌ها یا هوک‌های تودرتو تعریف می‌کنند را اعتبارسنجی می‌کند. کامپوننت‌ها و هوک‌ها باید در سطح ماژول تعریف شوند.

</Intro>

## جزئیات قانون {/*rule-details*/}

تعریف کامپوننت‌ها یا هوک‌ها داخل تابع‌های دیگر در هر فراخوانی نمونه‌های جدیدی ایجاد می‌کند. ری‌اکت هر کدام را به‌عنوان یک کامپوننت کاملاً متفاوت در نظر می‌گیرد، و کل درخت کامپوننت را تخریب و دوباره ایجاد می‌کند، همهٔ استیت‌ها را از دست می‌دهد، و باعث مشکلات عملکردی می‌شود.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js {expectedErrors: {'react-compiler': [14]}}
// ❌ Factory function creating components
function createComponent(defaultValue) {
  return function Component() {
    // ...
  };
}

// ❌ Component defined inside component
function Parent() {
  function Child() {
    // ...
  }

  return <Child />;
}

// ❌ Hook factory function
function createCustomHook(endpoint) {
  return function useData() {
    // ...
  };
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Component defined at module level
function Component({ defaultValue }) {
  // ...
}

// ✅ Custom hook at module level
function useData(endpoint) {
  // ...
}
```

## رفع اشکال {/*troubleshooting*/}

### به رفتار پویای کامپوننت نیاز دارم {/*dynamic-behavior*/}

ممکن است فکر کنید به یک factory برای ایجاد کامپوننت‌های سفارشی‌شده نیاز دارید:

```js
// ❌ Wrong: Factory pattern
function makeButton(color) {
  return function Button({children}) {
    return (
      <button style={{backgroundColor: color}}>
        {children}
      </button>
    );
  };
}

const RedButton = makeButton('red');
const BlueButton = makeButton('blue');
```

به‌جای آن [JSX را به‌عنوان فرزندان](/learn/passing-props-to-a-component#passing-jsx-as-children) پاس دهید:

```js
// ✅ Better: Pass JSX as children
function Button({color, children}) {
  return (
    <button style={{backgroundColor: color}}>
      {children}
    </button>
  );
}

function App() {
  return (
    <>
      <Button color="red">Red</Button>
      <Button color="blue">Blue</Button>
    </>
  );
}
```
