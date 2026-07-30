---
title: target
---

<Intro>

گزینهٔ `target` مشخص می‌کند که کامپایلر باید برای کدام نسخهٔ ری‌اکت کد تولید کند.

</Intro>

```js
{
  target: '19' // or '18', '17'
}
```

<InlineToc />

---

## مرجع {/*reference*/}

### `target` {/*target*/}

سازگاری نسخهٔ ری‌اکت برای خروجی کامپایل‌شده را پیکربندی می‌کند.

#### نوع {/*type*/}

```
'17' | '18' | '19'
```

#### مقدار پیش‌فرض {/*default-value*/}

`'19'`

#### مقادیر معتبر {/*valid-values*/}

- **`'19'`**: target ری‌اکت ۱۹ (پیش‌فرض). نیازی به runtime اضافی نیست.
- **`'18'`**: target ری‌اکت ۱۸. نیاز به پکیج `react-compiler-runtime` دارد.
- **`'17'`**: target ری‌اکت ۱۷. نیاز به پکیج `react-compiler-runtime` دارد.

#### ملاحظات {/*caveats*/}

- همیشه از مقادیر رشته‌ای استفاده کنید، نه اعداد (مثلاً `'17'` نه `17`)
- نسخه‌های patch را شامل نشوید (مثلاً `'18'` نه `'18.2.0'`)
- ری‌اکت ۱۹ شامل APIهای runtime کامپایلر داخلی است
- ری‌اکت ۱۷ و ۱۸ نیاز به نصب `react-compiler-runtime@rc` دارند

---

## نحوهٔ استفاده {/*usage*/}

### هدف‌گیری ری‌اکت ۱۹ (پیش‌فرض) {/*targeting-react-19*/}

برای ری‌اکت ۱۹، نیازی به پیکربندی خاصی نیست:

```js
{
  // defaults to target: '19'
}
```

کامپایلر از APIهای runtime داخلی ری‌اکت ۱۹ استفاده می‌کند:

```js
// Compiled output uses React 19's native APIs
import { c as _c } from 'react/compiler-runtime';
```

### هدف‌گیری ری‌اکت ۱۷ یا ۱۸ {/*targeting-react-17-or-18*/}

برای پروژه‌های ری‌اکت ۱۷ و ری‌اکت ۱۸، به دو مرحله نیاز دارید:

1. نصب پکیج runtime:

```bash
npm install react-compiler-runtime@rc
```

2. پیکربندی target:

```js
// For React 18
{
  target: '18'
}

// For React 17
{
  target: '17'
}
```

کامپایلر برای هر دو نسخه از runtime polyfill استفاده می‌کند:

```js
// Compiled output uses the polyfill
import { c as _c } from 'react-compiler-runtime';
```

---

## رفع اشکال {/*troubleshooting*/}

### خطاهای runtime دربارهٔ نبود runtime کامپایلر {/*missing-runtime*/}

اگر خطاهایی مانند "Cannot find module 'react/compiler-runtime'" می‌بینید:

1. نسخهٔ ری‌اکت خود را بررسی کنید:
   ```bash
   npm why react
   ```

2. اگر از ری‌اکت ۱۷ یا ۱۸ استفاده می‌کنید، runtime را نصب کنید:
   ```bash
   npm install react-compiler-runtime@rc
   ```

3. مطمئن شوید target با نسخهٔ ری‌اکت شما مطابقت دارد:
   ```js
   {
     target: '18' // Must match your React major version
   }
   ```

### پکیج runtime کار نمی‌کند {/*runtime-not-working*/}

مطمئن شوید پکیج runtime:

1. در پروژهٔ شما نصب شده (نه به‌صورت سراسری)
2. در وابستگی‌های `package.json` شما فهرست شده
3. نسخهٔ صحیح است (تگ `@rc`)
4. در `devDependencies` نیست (در runtime نیاز است)

### بررسی خروجی کامپایل‌شده {/*checking-output*/}

برای تأیید اینکه runtime صحیح استفاده می‌شود، به import متفاوت توجه کنید (`react/compiler-runtime` برای داخلی، پکیج مستقل `react-compiler-runtime` برای ۱۷/۱۸):

```js
// For React 19 (built-in runtime)
import { c } from 'react/compiler-runtime'
//                      ^

// For React 17/18 (polyfill runtime)
import { c } from 'react-compiler-runtime'
//                      ^
```
