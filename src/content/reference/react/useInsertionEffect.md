---
title: useInsertionEffect
---

<Pitfall>

`useInsertionEffect` برای نویسندگان کتابخانه‌های CSS-in-JS است. مگر آنکه روی یک کتابخانهٔ CSS-in-JS کار کنید و به مکانی برای تزریق استایل‌ها نیاز داشته باشید، احتمالاً به‌جای آن [`useEffect`](/reference/react/useEffect) یا [`useLayoutEffect`](/reference/react/useLayoutEffect) را می‌خواهید.

</Pitfall>

<Intro>

`useInsertionEffect` اجازه می‌دهد المن‌ها پیش از آنکه هر افکت چیدمانی (layout Effect) اجرا شود، در DOM درج کنید.

```js
useInsertionEffect(setup, dependencies?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useInsertionEffect(setup, dependencies?)` {/*useinsertioneffect*/}

`useInsertionEffect` را فراخوانی کنید تا پیش از آنکه افکت‌هایی که ممکن است نیاز به خواندن چیدمان داشته باشند اجرا شوند، استایل‌ها را درج کنید:

```js
import { useInsertionEffect } from 'react';

// Inside your CSS-in-JS library
function useCSS(rule) {
  useInsertionEffect(() => {
    // ... inject <style> tags here ...
  });
  return rule;
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `setup`: تابعی با منطق افکت شما. تابع setup شما همچنین می‌تواند به‌صورت اختیاری یک تابع *پاکسازی* (cleanup) برگرداند. وقتی کامپوننت شما به DOM اضافه می‌شود، اما پیش از آنکه هر افکت چیدمانی اجرا شود، ری‌اکت تابع setup شما را اجرا می‌کند. پس از هر رندر مجدد با وابستگی‌های تغییر یافته، ری‌اکت ابتدا تابع پاکسازی را (اگر ارائه کرده‌اید) با مقادیر قدیمی اجرا می‌کند، و سپس تابع setup شما را با مقادیر جدید اجرا می‌کند. وقتی کامپوننت شما از DOM حذف می‌شود، ری‌اکت تابع پاکسازی شما را اجرا می‌کند.
 
* **اختیاری** `dependencies`: فهرست تمام مقادیر واکنش‌گرا (reactive) که درون کد `setup` به آن‌ها ارجاع داده شده است. مقادیر واکنش‌گرا شامل پراپس، استیت و تمام متغیرها و توابعی است که مستقیماً در بدنهٔ کامپوننت شما تعریف شده‌اند. اگر linter شما [برای ری‌اکت پیکربندی شده باشد](/learn/editor-setup#linting)، تأیید می‌کند که هر مقدار واکنش‌گرا به‌درستی به‌عنوان یک وابستگی مشخص شده است. فهرست وابستگی‌ها باید تعداد آیتم ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی آن با استفاده از الگوریتم مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. اگر وابستگی‌ها را اصلاً مشخص نکنید، افکت شما پس از هر رندر مجدد کامپوننت دوباره اجرا می‌شود.

#### مقادیر بازگشتی {/*returns*/}

`useInsertionEffect` مقدار `undefined` باز می‌گرداند.

#### نکات {/*caveats*/}

* افکت‌ها تنها در کلاینت اجرا می‌شوند. آن‌ها در طول رندر سرور اجرا نمی‌شوند.
* نمی‌توانید از درون `useInsertionEffect` استیت را به‌روزرسانی کنید.
* تا زمانی که `useInsertionEffect` اجرا می‌شود، رفرنس‌ها هنوز متصل نشده‌اند.
* `useInsertionEffect` ممکن است پیش یا پس از به‌روزرسانی DOM اجرا شود. نباید به به‌روزرسانی DOM در زمان خاصی تکیه کنید.
* برخلاف سایر انواع افکت‌ها که برای هر افکت ابتدا پاکسازی و سپس setup را اجرا می‌کنند، `useInsertionEffect` پاکسازی و setup را یک کامپوننت در هر بار اجرا می‌کند. این کار منجر به «در هم تنیدگی» (interleaving) توابع پاکسازی و setup می‌شود.
---

## استفاده {/*usage*/}

### تزریق استایل‌های پویا از کتابخانه‌های CSS-in-JS {/*injecting-dynamic-styles-from-css-in-js-libraries*/}

به‌طور سنتی، شما کامپوننت‌های ری‌اکت را با استفاده از CSS ساده استایل‌دهی می‌کردید.

```js
// In your JS file:
<button className="success" />

// In your CSS file:
.success { color: green; }
```

برخی تیم‌ها ترجیح می‌دهند به‌جای نوشتن فایل‌های CSS، استایل‌ها را مستقیماً در کد جاوااسکریپت بنویسند. این معمولاً نیازمند استفاده از یک کتابخانه یا ابزار CSS-in-JS است. سه رویکرد رایج برای CSS-in-JS وجود دارد:

1. استخراج ایستا به فایل‌های CSS با یک کامپایلر
2. استایل‌های inline، مانند `<div style={{ opacity: 1 }}>`
3. تزریق در زمان اجرا (Runtime) تگ‌های `<style>`

اگر از CSS-in-JS استفاده می‌کنید، ترکیبی از دو رویکرد اول را پیشنهاد می‌کنیم (فایل‌های CSS برای استایل‌های ایستا، استایل‌های inline برای استایل‌های پویا). **تزریق تگ `<style>` در زمان اجرا را به دو دلیل توصیه نمی‌کنیم:**

1. تزریق در زمان اجرا مرورگر را مجبور می‌کند استایل‌ها را بسیار بیشتر دوباره محاسبه کند.
2. تزریق در زمان اجرا می‌تواند اگر در زمان اشتباهی از چرخهٔ حیات ری‌اکت اتفاق بیفتد بسیار کند باشد.

مشکل اول قابل حل نیست، اما `useInsertionEffect` به شما کمک می‌کند مشکل دوم را حل کنید.

`useInsertionEffect` را فراخوانی کنید تا پیش از آنکه هر افکت چیدمانی اجرا شود، استایل‌ها را درج کنید:

```js {4-11}
// Inside your CSS-in-JS library
let isInserted = new Set();
function useCSS(rule) {
  useInsertionEffect(() => {
    // As explained earlier, we don't recommend runtime injection of <style> tags.
    // But if you have to do it, then it's important to do in useInsertionEffect.
    if (!isInserted.has(rule)) {
      isInserted.add(rule);
      document.head.appendChild(getStyleForRule(rule));
    }
  });
  return rule;
}

function Button() {
  const className = useCSS('...');
  return <div className={className} />;
}
```

مانند `useEffect`، `useInsertionEffect` روی سرور اجرا نمی‌شود. اگر نیاز دارید روی سرور جمع‌آوری کنید که کدام قانون‌های CSS استفاده شده‌اند، می‌توانید این کار را در طول رندر انجام دهید:

```js {1,4-6}
let collectedRulesSet = new Set();

function useCSS(rule) {
  if (typeof window === 'undefined') {
    collectedRulesSet.add(rule);
  }
  useInsertionEffect(() => {
    // ...
  });
  return rule;
}
```

[دربارهٔ ارتقای کتابخانه‌های CSS-in-JS با تزریق در زمان اجرا به `useInsertionEffect` بیشتر بخوانید.](https://github.com/reactwg/react-18/discussions/110)

<DeepDive>

#### چرا این بهتر از تزریق استایل‌ها در طول رندر یا useLayoutEffect است؟ {/*how-is-this-better-than-injecting-styles-during-rendering-or-uselayouteffect*/}

اگر در طول رندر استایل‌ها را درج کنید و ری‌اکت در حال پردازش یک [به‌روزرسانی غیرمسدودکننده](/reference/react/useTransition#perform-non-blocking-updates-with-actions) باشد، مرورگر در هر فریم هنگام رندر یک درخت کامپوننت استایل‌ها را دوباره محاسبه می‌کند، که می‌تواند **بسیار کند** باشد.

`useInsertionEffect` بهتر از درج استایل‌ها در طول [`useLayoutEffect`](/reference/react/useLayoutEffect) یا [`useEffect`](/reference/react/useEffect) است زیرا تضمین می‌کند تا زمانی که سایر افکت‌ها در کامپوننت‌های شما اجرا می‌شوند، تگ‌های `<style>` از قبل درج شده‌اند. در غیر این صورت، محاسبات چیدمان در افکت‌های معمولی به دلیل استایل‌های قدیمی اشتباه می‌شد.

</DeepDive>
