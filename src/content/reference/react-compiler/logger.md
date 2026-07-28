---
title: logger
---

<Intro>

گزینهٔ `logger` لاگ‌گیری سفارشی برای رویدادهای React Compiler در طول کامپایل فراهم می‌کند.

</Intro>

```js
{
  logger: {
    logEvent(filename, event) {
      console.log(`[Compiler] ${event.kind}: ${filename}`);
    }
  }
}
```

<InlineToc />

---

## مرجع {/*reference*/}

### `logger` {/*logger*/}

لاگ‌گیری سفارشی برای پیگیری رفتار کامپایلر و دیباگ مشکلات پیکربندی می‌کند.

#### نوع {/*type*/}

```
{
  logEvent: (filename: string | null, event: LoggerEvent) => void;
} | null
```

#### مقدار پیش‌فرض {/*default-value*/}

`null`

#### متدها {/*methods*/}

- **`logEvent`**: برای هر رویداد کامپایلر با نام فایل و جزئیات رویداد فراخوانی می‌شود

#### انواع رویداد {/*event-types*/}

- **`CompileSuccess`**: تابع با موفقیت کامپایل شد
- **`CompileError`**: تابع به دلیل خطا نادیده گرفته شد
- **`CompileDiagnostic`**: اطلاعات تشخیصی غیربحرانی
- **`CompileSkip`**: تابع به دلایل دیگر نادیده گرفته شد
- **`PipelineError`**: خطای کامپایل غیرمنتظره
- **`Timing`**: اطلاعات زمان‌بندی عملکرد

#### ملاحظات {/*caveats*/}

- ساختار رویداد ممکن است بین نسخه‌ها تغییر کند
- کدبیس‌های بزرگ ورودی‌های لاگ زیادی تولید می‌کنند

---

## نحوهٔ استفاده {/*usage*/}

### لاگ‌گیری اولیه {/*basic-logging*/}

موفقیت و شکست کامپایل را پیگیری کنید:

```js
{
  logger: {
    logEvent(filename, event) {
      switch (event.kind) {
        case 'CompileSuccess': {
          console.log(`✅ Compiled: ${filename}`);
          break;
        }
        case 'CompileError': {
          console.log(`❌ Skipped: ${filename}`);
          break;
        }
        default: {}
      }
    }
  }
}
```

### لاگ‌گیری خطای دقیق {/*detailed-error-logging*/}

اطلاعات خاصی دربارهٔ شکست‌های کامپایل دریافت کنید:

```js
{
  logger: {
    logEvent(filename, event) {
      if (event.kind === 'CompileError') {
        console.error(`\nCompilation failed: ${filename}`);
        console.error(`Reason: ${event.detail.reason}`);

        if (event.detail.description) {
          console.error(`Details: ${event.detail.description}`);
        }

        if (event.detail.loc) {
          const { line, column } = event.detail.loc.start;
          console.error(`Location: Line ${line}, Column ${column}`);
        }

        if (event.detail.suggestions) {
          console.error('Suggestions:', event.detail.suggestions);
        }
      }
    }
  }
}
```

