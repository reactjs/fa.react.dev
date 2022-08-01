---
id: javascript-environment-requirements
title: پیش‌نیاز‌های محیط جاوااسکریپت
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
ری‌اکت 16 به مجموعه(Collection) های [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) و [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) وابسته است. اگر در برنامه خود از مرورگرها و دستگاه‌های قدیمی پشتیبانی می‌کنید که ممکن است هنوز این موارد را به طور پیش فرض ارائه ندهند(به عنوان مثال IE <11) یا دارای پیاده‌سازی های غیر سازگار هستند (به عنوان مثال IE 11)، اضافه کردن یک برنامه چندکاره سراسری(global polyfill) مانند [core-js](https://github.com/zloirock/core-js) را به برنامه خود در نظر بگیرید.

یک محیط چندکاره(polyfilled environment) برای ری‌اکت 16 با استفاده از core-js برای پشتیبانی از مرورگرهای قدیمی به صورت زیر است:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

ری‌اکت همچنین به `requestAnimationFrame` وابستگی دارد(حتی در محیط تست).
شما می‌توانید از پکیج [raf](https://www.npmjs.com/package/raf) برای حل وابستگی `requestAnimationFrame` استفاده کنید :

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> 8223159395aae806f8602de35e6527d35260acfb
