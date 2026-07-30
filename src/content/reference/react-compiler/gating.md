---
title: gating
---

<Intro>

گزینهٔ `gating` کامپایل شرطی را فعال می‌کند، و به شما اجازه می‌دهد کنترل کنید چه زمان از کد بهینه‌شده در runtime استفاده می‌شود.

</Intro>

```js
{
  gating: {
    source: 'my-feature-flags',
    importSpecifierName: 'shouldUseCompiler'
  }
}
```

<InlineToc />

---

## مرجع {/*reference*/}

### `gating` {/*gating*/}

گیتینگ فلگ ویژگی runtime برای تابع‌های کامپایل‌شده را پیکربندی می‌کند.

#### نوع {/*type*/}

```
{
  source: string;
  importSpecifierName: string;
} | null
```

#### مقدار پیش‌فرض {/*default-value*/}

`null`

#### ویژگی‌ها {/*properties*/}

- **`source`**: مسیر ماژول برای import کردن فلگ ویژگی
- **`importSpecifierName`**: نام تابع export شده برای import

#### ملاحظات {/*caveats*/}

- تابع gating باید یک boolean برگرداند
- هم نسخهٔ کامپایل‌شده و هم نسخهٔ اصلی اندازهٔ باندل را افزایش می‌دهند
- import به هر فایل با تابع‌های کامپایل‌شده اضافه می‌شود

---

## نحوهٔ استفاده {/*usage*/}

### راه‌اندازی اولیهٔ فلگ ویژگی {/*basic-setup*/}

1. یک ماژول فلگ ویژگی بسازید:

```js
// src/utils/feature-flags.js
export function shouldUseCompiler() {
  // your logic here
  return getFeatureFlag('react-compiler-enabled');
}
```

2. کامپایلر را پیکربندی کنید:

```js
{
  gating: {
    source: './src/utils/feature-flags',
    importSpecifierName: 'shouldUseCompiler'
  }
}
```

3. کامپایلر کد گیت‌شده تولید می‌کند:

```js
// Input
function Button(props) {
  return <button>{props.label}</button>;
}

// Output (simplified)
import { shouldUseCompiler } from './src/utils/feature-flags';

const Button = shouldUseCompiler()
  ? function Button_optimized(props) { /* compiled version */ }
  : function Button_original(props) { /* original version */ };
```

توجه کنید که تابع gating یک‌بار در زمان ماژول ارزیابی می‌شود، بنابراین وقتی باندل JS تجزیه و ارزیابی شد، انتخاب کامپوننت برای بقیهٔ جلسهٔ مرورگر ثابت می‌ماند.

---

## رفع اشکال {/*troubleshooting*/}

### فلگ ویژگی کار نمی‌کند {/*flag-not-working*/}

تأیید کنید که ماژول فلگ شما تابع صحیح را export می‌کند:

```js
// ❌ Wrong: Default export
export default function shouldUseCompiler() {
  return true;
}

// ✅ Correct: Named export matching importSpecifierName
export function shouldUseCompiler() {
  return true;
}
```

### خطاهای import {/*import-errors*/}

تأیید کنید که مسیر source صحیح است:

```js
// ❌ Wrong: Relative to babel.config.js
{
  source: './src/flags',
  importSpecifierName: 'flag'
}

// ✅ Correct: Module resolution path
{
  source: '@myapp/feature-flags',
  importSpecifierName: 'flag'
}

// ✅ Also correct: Absolute path from project root
{
  source: './src/utils/flags',
  importSpecifierName: 'flag'
}
```
