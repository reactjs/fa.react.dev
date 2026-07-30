---
title: unstable_addTransitionType
version: experimental
---

<Experimental>

**این API آزمایشی است و هنوز در نسخهٔ پایدار ری‌اکت در دسترس نیست.**

شما می‌توانید آن را با ارتقای پکیج‌های ری‌اکت به جدیدترین نسخهٔ آزمایشی امتحان کنید:

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

نسخه‌های آزمایشی ری‌اکت ممکن است حاوی باگ باشند. از آن‌ها در محیط تولید استفاده نکنید.

</Experimental>

<Intro>

`unstable_addTransitionType` به شما اجازه می‌دهد علت یک ترنزیشن را مشخص کنید.


```js
startTransition(() => {
  unstable_addTransitionType('my-transition-type');
  setState(newState);
});
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `addTransitionType` {/*addtransitiontype*/}

#### پارامترها {/*parameters*/}

- `type`: نوع ترنزیشنی که باید اضافه شود. این می‌تواند هر رشته‌ای باشد.

#### مقادیر بازگشتی {/*returns*/}

`startTransition` چیزی باز نمی‌گرداند.

#### نکات {/*caveats*/}

- اگر چندین ترنزیشن با هم ترکیب شوند، همهٔ انواع ترنزیشن جمع‌آوری می‌شوند. همچنین می‌توانید بیش از یک نوع به یک ترنزیشن اضافه کنید.
- انواع ترنزیشن پس از هر commit بازنشانی می‌شوند. این یعنی یک `<Suspense>` که fallback نمایش می‌دهد، نوع‌ها را پس از یک `startTransition` مرتبط می‌کند، اما آشکارسازی محتوا این کار را نمی‌کند.

---

## استفاده {/*usage*/}

### افزودن علت یک ترنزیشن {/*adding-the-cause-of-a-transition*/}

`addTransitionType` را درون `startTransition` صدا بزنید تا علت یک ترنزیشن را نشان دهید:

``` [[1, 6, "unstable_addTransitionType"], [2, 5, "startTransition", [3, 6, "'submit-click'"]]
import { startTransition, unstable_addTransitionType } from 'react';

function Submit({action) {
  function handleClick() {
    startTransition(() => {
      unstable_addTransitionType('submit-click');
      action();
    });
  }

  return <button onClick={handleClick}>Click me</button>;
}

```

وقتی <CodeStep step={1}>addTransitionType</CodeStep> را درون محدودهٔ <CodeStep step={2}>startTransition</CodeStep> صدا می‌زنید، ری‌اکت <CodeStep step={3}>submit-click</CodeStep> را به‌عنوان یکی از علل ترنزیشن مرتبط می‌کند.

در حال حاضر، انواع ترنزیشن می‌توانند برای سفارشی‌سازی انیمیشن‌های مختلف بر اساس آنچه باعث ترنزیشن شده، استفاده شوند. شما سه روش مختلف برای استفاده از آن‌ها در اختیار دارید:

- [سفارشی‌سازی انیمیشن‌ها با استفاده از انواع view transition مرورگر](#customize-animations-using-browser-view-transition-types)
- [سفارشی‌سازی انیمیشن‌ها با استفاده از کلاس `View Transition`](#customize-animations-using-view-transition-class)
- [سفارشی‌سازی انیمیشن‌ها با استفاده از رویدادهای `ViewTransition`](#customize-animations-using-viewtransition-events) 

در آینده، قصد داریم از موارد استفادهٔ بیشتری برای استفاده از علت یک ترنزیشن پشتیبانی کنیم.

---
### سفارشی‌سازی انیمیشن‌ها با استفاده از انواع view transition مرورگر {/*customize-animations-using-browser-view-transition-types*/}

وقتی یک [`ViewTransition`](/reference/react/ViewTransition) از یک ترنزیشن فعال می‌شود، ری‌اکت تمام انواع ترنزیشن را به‌عنوان [انواع view transition](https://www.w3.org/TR/css-view-transitions-2/#active-view-transition-pseudo-examples) مرورگر به المنت اضافه می‌کند.

این به شما اجازه می‌دهد انیمیشن‌های مختلفی را بر اساس اسکوپ‌های CSS سفارشی کنید:

```js [11]
function Component() {
  return (
    <ViewTransition>
      <div>Hello</div>
    </ViewTransition>
  );
}

startTransition(() => {
  unstable_addTransitionType('my-transition-type');
  setShow(true);
});
```

```css
:root:active-view-transition-type(my-transition-type) {
  &::view-transition-...(...) {
    ...
  }
}
```

---

### سفارشی‌سازی انیمیشن‌ها با استفاده از کلاس `View Transition` {/*customize-animations-using-view-transition-class*/}

می‌توانید با ارسال یک آبجکت به کلاس View Transition، انیمیشن‌های یک `ViewTransition` فعال‌شده را بر اساس نوع سفارشی کنید:

```js
function Component() {
  return (
    <ViewTransition enter={{
      'my-transition-type': 'my-transition-class',
    }}>
      <div>Hello</div>
    </ViewTransition>
  );
}

// ...
startTransition(() => {
  unstable_addTransitionType('my-transition-type');
  setState(newState);
});
```

اگر چندین نوع تطابق داشته باشند، با هم ترکیب می‌شوند. اگر هیچ نوعی تطابق نداشته باشد، به‌جای آن ورودی ویژهٔ «default» استفاده می‌شود. اگر هر نوعی مقدار «none» داشته باشد، آن نوع برنده می‌شود و ViewTransition غیرفعال می‌شود (هیچ نامی به آن اختصاص داده نمی‌شود).

این‌ها می‌توانند با پراپ‌های enter/exit/update/layout/share بر اساس نوع محرک و نوع ترنزیشن تطابق داده شوند.

```js
<ViewTransition enter={{
  'navigation-back': 'enter-right',
  'navigation-forward': 'enter-left',
}}
exit={{
  'navigation-back': 'exit-right',
  'navigation-forward': 'exit-left',
}}>
```

---

### سفارشی‌سازی انیمیشن‌ها با استفاده از رویدادهای `ViewTransition` {/*customize-animations-using-viewtransition-events*/}

می‌توانید با استفاده از رویدادهای View Transition، انیمیشن‌های یک `ViewTransition` فعال‌شده را به‌صورت دستوری (imperative) و بر اساس نوع سفارشی کنید:

```
<ViewTransition onUpdate={(inst, types) => {
  if (types.includes('navigation-back')) {
    ...
  } else if (types.includes('navigation-forward')) {
    ...
  } else {
    ...
  }
}}>
```

این به شما اجازه می‌دهد انیمیشن‌های دستوری متفاوتی را بر اساس علت انتخاب کنید.

---

## عیب‌یابی {/*troubleshooting*/}

### TODO {/*todo2*/}
