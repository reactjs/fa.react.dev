---
id: code-splitting
title: تکه تکه کردن کد
permalink: docs/code-splitting.html
---

## بسته بندی کردن (bundling) {#bundling}

در بیشتر برنامه های ری‌اکت فایل ها توسط ابزار هایی مثل [Webpack](https://webpack.js.org/) یا [Browserify](http://browserify.org/) بسته بندی می شوند

پروسه ی bundle کردن به این شکل است که فایل های import شده دنبال می شود و همه ی آنها در یک فایل با نام "bundle" ادغام می شوند. این فایل bundle می تواند در صفحه ی وب بارگزاری شود تا کل برنامه را به یکباره اجرا کند.

#### مثال {#example}

**App:**

```js
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

**Bundle:**

```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

> نکته:
>
> bundle های شما در نهایت با این نمونه تفاوت زیادی خواهد داشت.

اگر شما از [Gatsby](https://www.gatsbyjs.org/) ،[Next.js](https://github.com/zeit/next.js/) ،[Create React App](https://github.com/facebookincubator/create-react-app) یا ابزار های مشابه استفاده می کنید، بطور پیشفرض Webpack تنظیم شده است تا برنامه ی شما را بسته بندی (bundle) کند.

در غیر این صورت، لازم است که پروسه ی بسته بندی را خودتان تنظیم و راه اندازی کنید. برای نمونه راهنمایی های [نصب](https://webpack.js.org/guides/installation/) و
[شروع به کار](https://webpack.js.org/guides/getting-started/) را از مستندات Webpack مشاهده کنید.

## تکه تکه کردن کد {#code-splitting}

بسته بندی بسیار خوب است، اما همواره با رشد و بزرگ شدن برنامه تان، فایل bundle شما نیز بزرگ می شود. به ویژه اگر شما از کتابخانه های جانبی استفاده کنید. 
لازم است که همیشه چشمتان به کد هایی باشد که به فایل bundle تان اضافه می کنید در این صورت فایل فوق بصورت تصادفی بسیار بزرگ نمی شود که باعث شود برنامه ی شما زمان زیادی برای لود شدن بگیرد.

برای جلوگیری از درگیر شدن با مشکلات bundle بزرگ، بهتر است که قبل از ایجاد مشکل شروع به "تکه تکه" کردن فایل bundle تان کنید.
 [تکه تکه کردن کد](https://webpack.js.org/guides/code-splitting/) امکانی است که توسط کتابخانه های بسته بندی کننده مثل Webpack و Browserify (توسط
[factor-bundle](https://github.com/browserify/factor-bundle)) پشتیبانی می شود به این صورت که می توانند چندین فایل bundle ایجاد کنند که هنگام اجرای برنامه بصورت پویا لود شوند.

تکه تکه کردن برنامه تان به شما کمک می کند که تنها چیز هایی که در حال حاضر کاربر نیاز دارد را به روش "lazy-load" بارگیری کنید که به صورت رویایی کارایی برنامه ی شما را افزایش می دهد. در این صورت در حالی که شما مقدار کلی کد خود را در برنامه کاهش نداده اید، از بارگیری کدی که ممکن است کاربر اصلا به آن نیاز نداشته باشد جلوگیری می کنید و مقدار کد مورد نیاز در بارگیری اولیه را کاهش می دهید.



## `import()` {#import}

بهترین راه برای شروع استفاده از تکه تکه کردن کد در برنامه تان استفاده از سینتکس `import()` پویا است.


**قبل:**

```js
import { add } from './math';

console.log(add(16, 26));
```

**بعد:**

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

هنگامی که Webpack با این سینکتس برخورد می کند، بصورت خودکار شروع به تکه تکه کردن کد برنامه ی شما می کند. اگر شما از Create React App استفاده می کنید، این در حال حاضر برای شما پیکربندی شده است و شما می توانید همین حالا [از اینجا شروع به استفاده از آن کنید](https://facebook.github.io/create-react-app/docs/code-splitting). همچنین بصورت پیشفرض توسط [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import) نیز پشتیبانی می شود.

اگر شما Webpack را خودتان پیکربندی و راه اندازی کرده اید، ممکن است بخواهید [راهنمای تکه تکه کردن کد Webpack](https://webpack.js.org/guides/code-splitting/) را بخوانید. پیکربندی Webpack شما احتمالا چیزی [شبیه به این](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269) باشد.

هنگام استفاده از [Babel](https://babeljs.io/)، شما باید اطمینان حاصل کنید که بابل می تواند سینتکس import پویا را parse کند ولی آن را تغییر ندهد. در این راستا شما به [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import) نیاز خواهید داشت.


## `React.lazy` {#reactlazy}

> نکته:
>
> `React.lazy` و Suspense هنوز برای رندر کردن در سمت سرور در دسترس نیست. اگر شما می خواهید کد تان را در یک برنامه ی رندر شونده در سمت سرور تکه تکه کنید، ما به شما [Loadable Components](https://github.com/gregberge/loadable-components) را پیشنهاد می کنیم که [راهنمای خوبی برای تکه تکه کردن bundle در رندر سمت سرور](https://loadable-components.com/docs/server-side-rendering/) دارد.

تابع `React.lazy` به شما اجازه می دهد که یک import پویا را به عنوان یک component معمولی رندر کنید.

**قبل:**


```js
import OtherComponent from './OtherComponent';
```

**بعد:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

هنگامی که کامپوننت فوق رندر می شود، بصورت خودکار فایل bundle ای که حاوی `OtherComponent` است را لود می کند.

`React.lazy` یک تابع به عنوان ورودی می گیرد که یک import() پویا را صدا می کند. که یک promise برمیگرداند که resolves آن یک ماژول با خروجی default ای است که حاوی یک کامپوننت ری‌اکت است.

### Suspense {#suspense}

ما باید در فاصله ی زمانی ای که `MyComponent` رندر شده است ولی هنوز `OtherComponent` را بارگیری نکرده است، یک محتوا - همانند نشانگر بارگیری - تا زمان لود `OtherComponent` نمایش دهیم. این کار توسط کامپوننت `Suspense` انجام می گیرد.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

prop `fallback` هر المان ری‌اکتی که شما می خواهید در بازه ی صبر کردن تا بارگیری کامپوننت اصلی رندر کنید را به عنوان ورودی می پذیرد. شما می توانید هر جایی کامپوننت `Suspense` را در بالای کامپوننت lazy قرار دهید. حتی شما می توانید چندین کامپوننت lazy را داخل یک کامپوننت `Suspense` قرار دهید.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### مرز های خطا (Error Boundaries)‌ {#error-boundaries}

اگر یک ماژول در هنگام بارگیری با مشکل مواجه شود (برای مثال، به خاطر مشکلات شبکه)، خطا می دهد. شما می توانید خطا های اینچنینی را هندل کنید که تجربه کاربری خوبی را نشان داده و بازیابی را با [مرز های خطا](/docs/error-boundaries.html) مدیریت کنید. هنگامی که مرز خطای تان را ساختید، شما می توانید از آن در هر جایی در بالای کامپوننت lazy تان برای نمایش حالت خطا هنگامی که مشکلی در شبکه وجود دارد، استفاده کنید.

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## تکه تکه کردن کد بصورت مسیر محور {#route-based-code-splitting}

تشخیص اینکه در کدام سطح از برنامه تان از تکه تکه کردن کد استفاده کنید می تواند کمی مشکل باشد. شما می خواهید اطمینان حاصل کنید که جاهایی را انتخاب کنید که bundle ها را بصورت مساوری تقسیم کنید، اما تجربه ی کاربر را مختل نکنید.

یکی از جاهای خوب برای شروع با مسیر (route) هاست. بیشتر افراد در وب از page transitions ها استفاده کرده اند که مقداری زمان می برد تا بارگیری شوند. شما نیز می توانید کل صفحه را به یکباره دوباره رندر کنید تا کاربران نتوانند با سایر المان های صفحه در همان لحظه تعامل کنند.

اینجا یک مثال از چگونگی راه اندازی تکه تکه کردن کد بر پایه ی مسیر (route-based code splitting) در داخل برنامه تان با استفاده از کتابخانه هایی مثل [React Router](https://reacttraining.com/react-router/) با `React.lazy` را مشاهده می کنید.

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## export های نامگذاری شده {#named-exports}

در حال حاضر `React.lazy` صرفا export های پیشفرض را پشتیبانی می کند، اگر ماژولی که شما می خواهید import کنید از export نامگذاری شده استفاده می کند، شما می توانید یک ماژول میانجی ایجاد کنید که آن را بصورت پیشفرض export می کند. این تضمین می کند که ساختار درختی برنامه همچنان بصورت صحیح کار می کند  و شما کامپوننت بلا استفاده ای را درخواست نکرده اید.

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```js
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```

```js
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
