---
title: panicThreshold
---

<Intro>

گزینهٔ `panicThreshold` کنترل می‌کند که React Compiler چگونه با خطاها در طول کامپایل رفتار می‌کند.

</Intro>

```js
{
  panicThreshold: 'none' // Recommended
}
```

<InlineToc />

---

## مرجع {/*reference*/}

### `panicThreshold` {/*panicthreshold*/}

تعیین می‌کند که آیا خطاهای کامپایل باید build را شکست دهند یا از بهینه‌سازی صرف‌نظر کنند.

#### نوع {/*type*/}

```
'none' | 'critical_errors' | 'all_errors'
```

#### مقدار پیش‌فرض {/*default-value*/}

`'none'`

#### گزینه‌ها {/*options*/}

- **`'none'`** (پیش‌فرض، توصیه‌شده): کامپوننت‌هایی که نمی‌توانند کامپایل شوند را نادیده بگیر و build را ادامه بده
- **`'critical_errors'`**: build فقط در خطاهای بحرانی کامپایلر شکست بخورد
- **`'all_errors'`**: build در هر تشخیص کامپایلر شکست بخورد

#### ملاحظات {/*caveats*/}

- buildهای production همیشه باید از `'none'` استفاده کنند
- شکست build از ساخته شدن اپلیکیشن شما جلوگیری می‌کند
- کامپایلر با `'none'` به‌طور خودکار کد مشکل‌دار را شناسایی و نادیده می‌گیرد
- آستانه‌های بالاتر فقط در طول توسعه برای دیباگ مفید هستند

---

## نحوهٔ استفاده {/*usage*/}

### پیکربندی production (توصیه‌شده) {/*production-configuration*/}

برای buildهای production، همیشه از `'none'` استفاده کنید. این مقدار پیش‌فرض است:

```js
{
  panicThreshold: 'none'
}
```

این تضمین می‌کند:
- build شما هرگز به دلیل مشکلات کامپایلر شکست نمی‌خورد
- کامپوننت‌هایی که نمی‌توانند بهینه شوند، به‌طور عادی اجرا می‌شوند
- بیشترین تعداد کامپوننت‌ها بهینه می‌شوند
- استقرارهای production پایدار

### دیباگ در توسعه {/*development-debugging*/}

به‌طور موقت از آستانه‌های سخت‌گیرانه‌تر برای یافتن مشکلات استفاده کنید:

```js
const isDevelopment = process.env.NODE_ENV === 'development';

{
  panicThreshold: isDevelopment ? 'critical_errors' : 'none',
  logger: {
    logEvent(filename, event) {
      if (isDevelopment && event.kind === 'CompileError') {
        // ...
      }
    }
  }
}
```
