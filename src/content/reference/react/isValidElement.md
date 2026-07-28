---
title: isValidElement
---

<Intro>

`isValidElement` بررسی می‌کند که آیا یک مقدار یک المنت ری‌اکت هست یا نه.

```js
const isElement = isValidElement(value)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `isValidElement(value)` {/*isvalidelement*/}

`isValidElement(value)` را فراخوانی کنید تا بررسی کنید که آیا `value` یک المنت ری‌اکت هست یا نه.

```js
import { isValidElement, createElement } from 'react';

// ✅ React elements
console.log(isValidElement(<p />)); // true
console.log(isValidElement(createElement('p'))); // true

// ❌ Not React elements
console.log(isValidElement(25)); // false
console.log(isValidElement('Hello')); // false
console.log(isValidElement({ age: 42 })); // false
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `value`: `value`ای که می‌خواهید بررسی کنید. می‌تواند هر مقداری با هر نوعی باشد.

#### مقادیر بازگشتی {/*returns*/}

`isValidElement` در صورتی که `value` یک المنت ری‌اکت باشد، `true` برمی‌گرداند. در غیر این صورت، `false` برمی‌گرداند.

#### نکات {/*caveats*/}

* **فقط [تگ‌های JSX](/learn/writing-markup-with-jsx) و آبجکت‌هایی که توسط [`createElement`](/reference/react/createElement) بازگشته‌اند، المنت ری‌اکت محسوب می‌شوند.** به‌عنوان مثال، حتی‌اگر عددی مانند `42` یک *نُد* معتبر ری‌اکت است (و می‌تواند از یک کامپوننت بازگردانده شود)، یک المنت معتبر ری‌اکت نیست. آرایه‌ها و پورتال‌هایی که با [`createPortal`](/reference/react-dom/createPortal) ساخته می‌شوند نیز *خودشان* المنت ری‌اکت محسوب نمی‌شوند.

---

## استفاده {/*usage*/}

### بررسی اینکه آیا چیزی یک المنت ری‌اکت هست یا نه {/*checking-if-something-is-a-react-element*/}

`isValidElement` را فراخوانی کنید تا بررسی کنید آیا یک مقدار یک *المنت ری‌اکت* هست یا نه.

المن‌های ری‌اکت عبارت‌اند از:

- مقادیری که با نوشتن یک [تگ JSX](/learn/writing-markup-with-jsx) تولید می‌شوند
- مقادیری که با فراخوانی [`createElement`](/reference/react/createElement) تولید می‌شوند

برای المن‌های ری‌اکت، `isValidElement` مقدار `true` برمی‌گرداند:

```js
import { isValidElement, createElement } from 'react';

// ✅ JSX tags are React elements
console.log(isValidElement(<p />)); // true
console.log(isValidElement(<MyComponent />)); // true

// ✅ Values returned by createElement are React elements
console.log(isValidElement(createElement('p'))); // true
console.log(isValidElement(createElement(MyComponent))); // true
```

هر مقدار دیگری، مانند رشته‌ها، اعداد، یا آبجکت‌ها و آرایه‌های دلخواه، المن‌ ری‌اکت نیستند.

برای آن‌ها، `isValidElement` مقدار `false` برمی‌گرداند:

```js
// ❌ These are *not* React elements
console.log(isValidElement(null)); // false
console.log(isValidElement(25)); // false
console.log(isValidElement('Hello')); // false
console.log(isValidElement({ age: 42 })); // false
console.log(isValidElement([<div />, <div />])); // false
console.log(isValidElement(MyComponent)); // false
```

بسیار نادر است که به `isValidElement` نیاز داشته باشید. این متد بیشتر زمانی کاربرد دارد که در حال فراخوانی یک API دیگر هستید که *فقط* المن‌ها را می‌پذیرد (مانند کاری که [`cloneElement`](/reference/react/cloneElement) می‌کند) و می‌خواهید هنگامی که آرگومان شما یک المنت ری‌اکت نیست، از بروز خطا جلوگیری کنید.

مگر اینکه دلیل بسیار خاصی برای افزودن بررسی `isValidElement` داشته باشید، احتمالاً به آن نیازی ندارید.

<DeepDive>

#### المن‌های ری‌اکت در برابر نُدهای ری‌اکت {/*react-elements-vs-react-nodes*/}

هنگام نوشتن یک کامپوننت، می‌توانید هر نوع *نُد ری‌اکت* را از آن بازگردانید:

```js
function MyComponent() {
  // ... you can return any React node ...
}
```

یک نُد ری‌اکت می‌تواند یکی از موارد زیر باشد:

- یک المنت ری‌اکت ساخته‌شده مانند `<div />` یا `createElement('div')`
- یک پورتال ساخته‌شده با [`createPortal`](/reference/react-dom/createPortal)
- یک رشته
- یک عدد
- `true`, `false`, `null`, یا `undefined` (که نمایش داده نمی‌شوند)
- یک آرایه از نُدهای ری‌اکت دیگر

**توجه کنید که `isValidElement` بررسی می‌کند که آیا آرگومان یک *المنت ری‌اکت* هست یا نه، نه اینکه آیا یک نُد ری‌اکت هست.** به‌عنوان مثال، `42` یک المنت معتبر ری‌اکت نیست. با این حال، یک نُد کاملاً معتبر ری‌اکت است:

```js
function MyComponent() {
  return 42; // It's ok to return a number from component
}
```

به همین دلیل نباید از `isValidElement` به‌عنوان راهی برای بررسی اینکه آیا چیزی می‌تواند رندر شود یا نه، استفاده کنید.

</DeepDive>
