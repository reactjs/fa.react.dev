---
title: نصب
---

<Intro>
این راهنما به شما کمک می‌کند تا کامپایلر React را در برنامه React خود نصب و پیکربندی کنید.
</Intro>

<YouWillLearn>

* نحوهٔ نصب کامپایلر ری‌اکت
* پیکربندی پایه برای ابزارهای بیلد مختلف
* چگونه اطمینان حاصل کنید که تنظیمات شما کار می‌کند

</YouWillLearn>

## پیش‌نیازها {/*prerequisites*/}

کامپایلر ری‌اکت برای کار با ری‌اکت 19 طراحی شده است، اما از ری‌اکت 17 و 18 نیز پشتیبانی می‌کند. درباره [سازگاری نسخه‌های ری‌اکت](/reference/react-compiler/target) بیشتر بدانید.

<Note>
کامپایلر ری‌اکت در حال حاضر در RC است. برای دریافت آخرین نسخه کاندید انتشار، از تگ `@rc` استفاده کنید.
</Note>

## نصب {/*installation*/}

کامپایلر ری‌اکت را به عنوان یک `devDependency` نصب کنید:

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

کامپایلر ری‌اکت به‌طور پیش‌فرض بدون نیاز به هیچ تنظیماتی کار می‌کند. با این حال، اگر نیاز به پیکربندی آن در شرایط خاص دارید (برای مثال، برای هدف‌گذاری نسخه‌های ری‌اکت پایین‌تر از 19)، به [مرجع گزینه‌های کامپایلر](/reference/react-compiler/configuration) مراجعه کنید.

فرآیند راه‌اندازی به ابزار ساخت شما بستگی دارد. کامپایلر ری‌اکت شامل یک پلاگین Babel است که با خط لوله ساخت شما یکپارچه می‌شود.

<Pitfall>
کامپایلر ری‌اکت باید **ابتدا** در خط لوله پلاگین Babel شما اجرا شود. کامپایلر به اطلاعات منبع اصلی برای تحلیل صحیح نیاز دارد، بنابراین باید قبل از سایر تغییرات کد شما را پردازش کند.
</Pitfall>

### بابل {/*babel*/}

`babel.config.js` خود را ایجاد یا به‌روزرسانی کنید:

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

اگر از Vite استفاده می‌کنید، می‌توانید پلاگین را به vite-plugin-react اضافه کنید.

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

به‌طور جایگزین، اگر یک پلاگین Babel جداگانه برای Vite ترجیح می‌دهید:

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

لطفاً برای اطلاعات بیشتر به [مستندات Next.js](https://nextjs.org/docs/app/api-reference/next-config-js/reactCompiler) مراجعه کنید.

### React Router {/*usage-with-react-router*/}
`vite-plugin-babel` را نصب کنید و پلاگین کامپایلر Babel را به آن اضافه کنید:

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

یک لودر webpack جامعه‌محور [اکنون اینجا در دسترس است](https://github.com/SukkaW/react-compiler-webpack).

### Expo {/*usage-with-expo*/}

لطفاً به [مستندات Expo](https://docs.expo.dev/guides/react-compiler/) مراجعه کنید تا کامپایلر ری‌اکت را در اپلیکیشن‌های Expo فعال کرده و استفاده کنید.

### Metro (ری‌اکت نیتیو) {/*usage-with-react-native-metro*/}

ری‌اکت نیتیو از Babel از طریق Metro استفاده می‌کند، بنابراین برای دستورالعمل‌های نصب به بخش [Usage with Babel](#babel) مراجعه کنید.

### Rspack {/*usage-with-rspack*/}

لطفاً به [مستندات Rspack](https://rspack.dev/guide/tech/react#react-compiler) مراجعه کنید تا کامپایلر ری‌اکت را در برنامه‌های Rspack فعال کرده و استفاده کنید.

### Rsbuild {/*usage-with-rsbuild*/}

لطفاً به [مستندات Rsbuild](https://rsbuild.dev/guide/framework/react#react-compiler) مراجعه کنید تا کامپایلر ری‌اکت را در برنامه‌های Rsbuild فعال کرده و استفاده کنید.


## یکپارچه‌سازی ESLint {/*eslint-integration*/}

کامپایلر ری‌اکت شامل یک قانون ESLint است که به شناسایی کدی که نمی‌تواند بهینه‌سازی شود کمک می‌کند. وقتی قانون ESLint خطایی گزارش می‌دهد، به این معنی است که کامپایلر از بهینه‌سازی آن کامپوننت یا هوک خاص صرف‌نظر خواهد کرد. این کار ایمن است: کامپایلر به بهینه‌سازی سایر بخش‌های کد شما ادامه خواهد داد. نیازی نیست که بلافاصله همه تخلفات را برطرف کنید. با سرعت خودتان به آن‌ها رسیدگی کنید تا به‌تدریج تعداد کامپوننت‌های بهینه‌شده را افزایش دهید.

پلاگین ESLint را نصب کنید:

<TerminalBlock>
npm install -D eslint-plugin-react-hooks@rc
</TerminalBlock>

اگر هنوز eslint-plugin-react-hooks را پیکربندی نکرده‌اید، [دستورالعمل‌های نصب در readme](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#installation) را دنبال کنید. قانون کامپایلر به‌طور پیش‌فرض در آخرین نسخه RC فعال است، بنابراین نیازی به پیکربندی اضافی نیست.

قانون ESLint به این صورت عمل خواهد کرد:
- تخلفات از [قوانین ری‌اکت](/reference/rules) را شناسایی کنید
- نشان دهید کدام کامپوننت‌ها نمی‌توانند بهینه شوند
- پیام‌های خطای مفیدی برای رفع مشکلات فراهم کنید

## تنظیمات خود را تأیید کنید {/*verify-your-setup*/}

پس از نصب، اطمینان حاصل کنید که کامپایلر React به درستی کار می‌کند.

### بررسی React DevTools {/*check-react-devtools*/}

کامپوننت‌هایی که توسط کامپایلر ری‌اکت بهینه‌سازی شده‌اند، نشان "Memo ✨" را در React DevTools نمایش خواهند داد:

۱. افزونه مرورگر [React Developer Tools](/learn/react-developer-tools) را نصب کنید
برنامه خود را در حالت توسعه باز کنید
3. ابزارهای توسعه ری‌اکت را باز کنید
4. به دنبال ایموجی ✨ در کنار نام کامپوننت‌ها بگردید.

اگر کامپایلر در حال کار است:
- کامپوننت‌ها در React DevTools نشان "Memo ✨" را نمایش خواهند داد.
- محاسبات پرهزینه به‌طور خودکار به‌خاطر سپرده می‌شوند.
- نیازی به `useMemo` به‌صورت دستی نیست

### بررسی خروجی بیلد {/*check-build-output*/}

شما همچنین می‌توانید با بررسی خروجی بیلد، اطمینان حاصل کنید که کامپایلر در حال اجرا است. کد کامپایل‌شده شامل منطق memoization خودکار خواهد بود که کامپایلر به‌طور خودکار اضافه می‌کند.

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

## عیب‌یابی {/*troubleshooting*/}

### انصراف از کامپوننت‌های خاص {/*opting-out-specific-components*/}

اگر یک کامپوننت پس از کامپایل باعث ایجاد مشکلاتی می‌شود، می‌توانید به‌طور موقت آن را با استفاده از دستور `"use no memo"` غیرفعال کنید:

```js
function ProblematicComponent() {
  "use no memo";
  // Component code here
}
```

این به کامپایلر می‌گوید که بهینه‌سازی را برای این کامپوننت خاص نادیده بگیرد. شما باید مشکل اصلی را برطرف کنید و پس از حل آن، این دستور را حذف کنید.

برای کمک بیشتر در رفع اشکال، به [راهنمای اشکال‌زدایی](/learn/react-compiler/debugging) مراجعه کنید.

## مراحل بعدی {/*next-steps*/}

حالا که کامپایلر ری‌اکت را نصب کرده‌اید، بیشتر بیاموزید دربارهٔ:

- [سازگاری نسخه ری‌اکت](/reference/react-compiler/target) برای React 17 و 18
- [گزینه‌های پیکربندی](/reference/react-compiler/configuration) برای سفارشی کردن کامپایلر
- [استراتژی‌های پذیرش تدریجی](/learn/react-compiler/incremental-adoption) برای کدبیس‌های موجود
- [تکنیک‌های اشکال‌زدایی](/learn/react-compiler/debugging) برای عیب‌یابی مشکلات
- [راهنمای کامپایل کتابخانه‌ها](/reference/react-compiler/compiling-libraries) برای کامپایل کتابخانه ری‌اکت شما