---
id: javascript-environment-requirements
title: پیش‌نیاز‌های محیط جاوااسکریپت
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
ری‌اکت 16 به مجموعه(Collection) های [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) و [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) وابسته است. اگر در برنامه خود از مرورگرها و دستگاه‌های قدیمی پشتیبانی می‌کنید که ممکن است هنوز این موارد را به طور پیش فرض ارائه ندهند(به عنوان مثال IE <11) یا دارای پیاده‌سازی های غیر سازگار هستند (به عنوان مثال IE 11)، اضافه کردن یک برنامه چندکاره سراسری(global polyfill) مانند [core-js](https://github.com/zloirock/core-js) یا [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) را به برنامه خود در نظر بگیرید.
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 957276e1e92bb48e5bb6b1c17fd0e7a559de0748

یک محیط چندکاره(polyfilled environment) برای ری‌اکت 16 با استفاده از core-js برای پشتیبانی از مرورگرهای قدیمی به صورت زیر است:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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