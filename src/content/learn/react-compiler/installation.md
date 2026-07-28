---
title: نصب
---

<Intro>
این راهنما به شما کمک می‌کند تا کامپایلر ری‌اکت را در اپلیکیشن ری‌اکت خود نصب و پیکربندی کنید.
</Intro>

<YouWillLearn>

* چگونگی نصب کامپایلر ری‌اکت
* پیکربندی پایه برای ابزارهای بیلد مختلف
* چگونگی بررسی کارکرد تنظیمات خود

</YouWillLearn>

## پیش‌نیازها {/*prerequisites*/}

کامپایلر ری‌اکت طوری طراحی شده که بهترین کارکرد را با ری‌اکت ۱۹ داشته باشد، اما از ری‌اکت ۱۷ و ۱۸ نیز پشتیبانی می‌کند. دربارهٔ [سازگاری نسخهٔ ری‌اکت](/reference/react-compiler/target) بیشتر بدانید.

<Note>
کامپایلر ری‌اکت در حال حاضر در مرحلهٔ RC قرار دارد. آن را با استفاده از تگ `@rc` نصب کنید تا آخرین نسخهٔ release candidate را دریافت کنید.
</Note>

## نصب {/*installation*/}

کامپایلر ری‌اکت را به‌عنوان یک `devDependency` نصب کنید:

<TerminalBlock>
npm install -D babel-plugin-react-compiler@rc
</TerminalBlock>

یا با Yarn:

<TerminalBlock>
yarn add -D babel-plugin-react-compiler@rc
</TerminalBlock>

یا با pnpm:

<TerminalBlock>
pnpm install -D babel-plugin-react-compiler@rc
</TerminalBlock>

## راه‌اندازی پایه {/*basic-setup*/}

کامپایلر ری‌اکت طوری طراحی شده که به‌طور پیش‌فرض و بدون هیچ پیکربندی کار کند. با این حال، اگر نیاز به پیکربندی آن در شرایط خاص دارید (برای مثال، برای نسخه‌های ری‌اکت پایین‌تر از ۱۹)، به [مرجع گزینه‌های کامپایلر](/reference/react-compiler/configuration) مراجعه کنید.

فرآیند راه‌اندازی به ابزار بیلد شما بستگی دارد. کامپایلر ری‌اکت شامل یک پلاگین Babel است که با خط لوله بیلد شما یکپارچه می‌شود.

<Pitfall>
کامپایلر ری‌اکت باید **اول** در خط لوله پلاگین Babel شما اجرا شود. کامپایلر برای تحلیل مناسب به اطلاعات منبع اصلی نیاز دارد، بنابراین باید کد شما را پیش از سایر تبدیلات پردازش کند.
</Pitfall>

### Babel {/*babel*/}

فایل `babel.config.js` خود را ایجاد یا به‌روزرسانی کنید:

```js {3}
module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // must run first!
    // ... other plugins
  ],
  // ... other config
};
```

### Vite {/*vite*/}

اگر از Vite استفاده می‌کنید، می‌توانید پلاگین را به vite-plugin-react اضافه کنید:

```js {3,9}
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
```

متناوباً، اگر پلاگین Babel جداگانه‌ای برای Vite ترجیح می‌دهید:

<TerminalBlock>
npm install -D vite-plugin-babel
</TerminalBlock>

```js {2,11}
// vite.config.js
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
```

### Next.js {/*usage-with-nextjs*/}

برای اطلاعات بیشتر به [مستندات Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/reactCompiler) مراجعه کنید.

### React Router {/*usage-with-react-router*/}
`vite-plugin-babel` را نصب کنید و پلاگین Babel کامپایلر را به آن اضافه کنید:

<TerminalBlock>
{`npm install vite-plugin-babel`}
</TerminalBlock>

```js {3-4,16}
// vite.config.js
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { reactRouter } from "@react-router/dev/vite";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
});
```

### Webpack {/*usage-with-webpack*/}

یک لودر Webpack جامعه‌محور [اکنون در اینجا موجود است](https://github.com/SukkaW/react-compiler-webpack).

### Expo {/*usage-with-expo*/}

برای فعال‌سازی و استفاده از کامپایلر ری‌اکت در اپلیکیشن‌های Expo به [مستندات Expo](https://docs.expo.dev/guides/react-compiler/) مراجعه کنید.

### Metro (React Native) {/*usage-with-react-native-metro*/}

React Native از Babel از طریق Metro استفاده می‌کند، بنابراین برای دستورالعمل نصب به بخش [استفاده با Babel](#babel) مراجعه کنید.

### Rspack {/*usage-with-rspack*/}

برای فعال‌سازی و استفاده از کامپایلر ری‌اکت در اپلیکیشن‌های Rspack به [مستندات Rspack](https://rspack.dev/guide/tech/react#react-compiler) مراجعه کنید.

### Rsbuild {/*usage-with-rsbuild*/}

برای فعال‌سازی و استفاده از کامپایلر ری‌اکت در اپلیکیشن‌های Rsbuild به [مستندات Rsbuild](https://rsbuild.dev/guide/framework/react#react-compiler) مراجعه کنید.


## یکپارچه‌سازی ESLint {/*eslint-integration*/}

کامپایلر ری‌اکت شامل یک قانون ESLint است که به شناسایی کدی که نمی‌تواند بهینه شود کمک می‌کند. وقتی قانون ESLint خطایی را گزارش می‌کند، به این معنی است که کامپایلر از بهینه‌سازی آن کامپوننت یا هوک خاص صرف‌نظر خواهد کرد. این کار امن است: کامپایلر به بهینه‌سازی سایر بخش‌های کدبیس شما ادامه می‌دهد. نیازی نیست تمام نقض‌ها را فوراً برطرف کنید. آن‌ها را با سرعت خودتان برطرف کنید تا به‌تدریج تعداد کامپوننت‌های بهینه‌شده را افزایش دهید.

پلاگین ESLint را نصب کنید:

<TerminalBlock>
npm install -D eslint-plugin-react-hooks@rc
</TerminalBlock>

اگر هنوز eslint-plugin-react-hooks را پیکربندی نکرده‌اید، [دستورالعمل‌های نصب در readme](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#installation) را دنبال کنید. قانون کامپایلر در آخرین RC به‌طور پیش‌فرض فعال است، بنابراین به پیکربندی اضافی نیاز نیست.

قانون ESLint انجام می‌دهد:
- شناسایی نقض‌های [قوانین ری‌اکت](/reference/rules)
- نشان دادن اینکه کدام کامپوننت‌ها نمی‌توانند بهینه شوند
- ارائهٔ پیام‌های خطای مفید برای رفع مشکلات

## تنظیمات خود را بررسی کنید {/*verify-your-setup*/}

پس از نصب، بررسی کنید که کامپایلر ری‌اکت به‌درستی کار می‌کند.

### بررسی React DevTools {/*check-react-devtools*/}

کامپوننت‌هایی که به‌وسیلهٔ کامپایلر ری‌اکت بهینه شده‌اند یک نشان «Memo ✨» در React DevTools نمایش می‌دهند:

1. افزونه مرورگر [ابزار توسعه‌دهندگان ری‌اکت](/learn/react-developer-tools) را نصب کنید
2. اپلیکیشن خود را در حالت توسعه باز کنید
3. React DevTools را باز کنید
4. به دنبال ایموجی ✨ در کنار نام کامپوننت‌ها بگردید

اگر کامپایلر در حال کار است:
- کامپوننت‌ها یک نشان «Memo ✨» در React DevTools نمایش می‌دهند
- محاسبات سنگین به‌طور خودکار مموری‌زیشن می‌شوند
- نیازی به `useMemo` دستی نیست

### بررسی خروجی بیلد {/*check-build-output*/}

همچنین می‌توانید با بررسی خروجی بیلد خود تأیید کنید که کامپایلر در حال اجراست. کد کامپایل‌شده شامل منطق مموری‌زیشن خودکاری خواهد بود که کامپایلر به‌طور خودکار اضافه می‌کند.

```js
import { c as _c } from "react/compiler-runtime";
export default function MyApp() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div>Hello World</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}

```

## رفع اشکال {/*troubleshooting*/}

### خارج کردن کامپوننت‌های خاص {/*opting-out-specific-components*/}

اگر کامپوننتی پس از کامپایل مشکلاتی ایجاد می‌کند، می‌توانید به‌طور موقت با استفاده از دایرکتیو `"use no memo"` آن را خارج کنید:

```js
function ProblematicComponent() {
  "use no memo";
  // Component code here
}
```

این به کامپایلر می‌گوید که از بهینه‌سازی این کامپوننت خاص صرف‌نظر کند. باید مشکل اساسی را برطرف کنید و پس از رفع، دایرکتیو را حذف کنید.

برای کمک بیشتر به رفع اشکال، [راهنمای دیباگ](/learn/react-compiler/debugging) را ببینید.

## مراحل بعدی {/*next-steps*/}

اکنون که کامپایلر ری‌اکت را نصب کرده‌اید، بیشتر بدانید دربارهٔ:

- [سازگاری نسخهٔ ری‌اکت](/reference/react-compiler/target) برای ری‌اکت ۱۷ و ۱۸
- [گزینه‌های پیکربندی](/reference/react-compiler/configuration) برای سفارشی‌کردن کامپایلر
- [استراتژی‌های اتخاذ تدریجی](/learn/react-compiler/incremental-adoption) برای کدبیس‌های موجود
- [تکنیک‌های دیباگ](/learn/react-compiler/debugging) برای رفع اشکال مشکلات
- [راهنمای کامپایل کتابخانه‌ها](/reference/react-compiler/compiling-libraries) برای کامپایل کتابخانه ری‌اکت خود
