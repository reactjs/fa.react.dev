---
title: دایرکتیوها
---

<Intro>
دایرکتیوهای React Compiler لیترال‌های رشته‌ای خاصی هستند که کنترل می‌کنند آیا تابع‌های خاصی کامپایل می‌شوند یا نه.
</Intro>

```js
function MyComponent() {
  "use memo"; // Opt this component into compilation
  return <div>{/* ... */}</div>;
}
```

<InlineToc />

---

## مرور کلی {/*overview*/}

دایرکتیوهای React Compiler کنترل دقیقی روی اینکه کدام تابع‌ها توسط کامپایلر بهینه‌سازی شوند، فراهم می‌کنند. آن‌ها لیترال‌های رشته‌ای هستند که در ابتدای بدنهٔ یک تابع یا در بالای یک ماژول قرار می‌گیرند.

### دایرکتیوهای موجود {/*available-directives*/}

* **[`"use memo"`](/reference/react-compiler/directives/use-memo)** - یک تابع را برای کامپایل انتخاب می‌کند
* **[`"use no memo"`](/reference/react-compiler/directives/use-no-memo)** - یک تابع را از کامپایل خارج می‌کند

### مقایسهٔ سریع {/*quick-comparison*/}

| دایرکتیو | منظور | چه زمان استفاده کنید |
|-----------|---------|-------------|
| [`"use memo"`](/reference/react-compiler/directives/use-memo) | اجبار به کامپایل | هنگام استفاده از حالت `annotation` یا برای نادیده گرفتن هیوریستیک‌های حالت `infer` |
| [`"use no memo"`](/reference/react-compiler/directives/use-no-memo) | جلوگیری از کامپایل | دیباگ مشکلات یا کار با کد ناسازگار |

---

## نحوهٔ استفاده {/*usage*/}

### دایرکتیوهای سطح تابع {/*function-level*/}

دایرکتیوها را در ابتدای یک تابع قرار دهید تا کامپایل آن کنترل شود:

```js
// Opt into compilation
function OptimizedComponent() {
  "use memo";
  return <div>This will be optimized</div>;
}

// Opt out of compilation
function UnoptimizedComponent() {
  "use no memo";
  return <div>This won't be optimized</div>;
}
```

### دایرکتیوهای سطح ماژول {/*module-level*/}

دایرکتیوها را در بالای یک فایل قرار دهید تا بر همهٔ تابع‌های آن ماژول تأثیر بگذارد:

```js
// At the very top of the file
"use memo";

// All functions in this file will be compiled
function Component1() {
  return <div>Compiled</div>;
}

function Component2() {
  return <div>Also compiled</div>;
}

// Can be overridden at function level
function Component3() {
  "use no memo"; // This overrides the module directive
  return <div>Not compiled</div>;
}
```

### تعامل با حالت‌های کامپایل {/*compilation-modes*/}

دایرکتیوها بسته به [`compilationMode`](/reference/react-compiler/compilationMode) شما رفتار متفاوتی دارند:

* **حالت `annotation`**: فقط تابع‌های دارای `"use memo"` کامپایل می‌شوند
* **حالت `infer`**: کامپایلر تصمیم می‌گیرد چه چیزی کامپایل شود، دایرکتیوها تصمیمات را نادیده می‌گیرند
* **حالت `all`**: همه چیز کامپایل می‌شود، `"use no memo"` می‌تواند تابع‌های خاصی را مستثنی کند

---

## بهترین روش‌ها {/*best-practices*/}

### استفادهٔ کم از دایرکتیوها {/*use-sparingly*/}

دایرکتیوها راه فرار هستند. پیکربندی کامپایلر در سطح پروژه را ترجیح دهید:

```js
// ✅ Good - project-wide configuration
{
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'infer'
    }]
  ]
}

// ⚠️ Use directives only when needed
function SpecialCase() {
  "use no memo"; // Document why this is needed
  // ...
}
```

### مستندسازی استفاده از دایرکتیو {/*document-usage*/}

همیشه توضیح دهید چرا از یک دایرکتیو استفاده شده:

```js
// ✅ Good - clear explanation
function DataGrid() {
  "use no memo"; // TODO: Remove after fixing issue with dynamic row heights (JIRA-123)
  // Complex grid implementation
}

// ❌ Bad - no explanation
function Mystery() {
  "use no memo";
  // ...
}
```

### برنامه برای حذف {/*plan-removal*/}

دایرکتیوهای opt-out باید موقتی باشند:

1. دایرکتیو را با یک کامنت TODO اضافه کنید
2. یک issue برای پیگیری بسازید
3. مشکل زیرین را برطرف کنید
4. دایرکتیو را حذف کنید

```js
function TemporaryWorkaround() {
  "use no memo"; // TODO: Remove after upgrading ThirdPartyLib to v2.0
  return <ThirdPartyComponent />;
}
```

---

## الگوهای رایج {/*common-patterns*/}

### پذیرش تدریجی {/*gradual-adoption*/}

هنگام پذیرش React Compiler در یک کدبیس بزرگ:

```js
// Start with annotation mode
{
  compilationMode: 'annotation'
}

// Opt in stable components
function StableComponent() {
  "use memo";
  // Well-tested component
}

// Later, switch to infer mode and opt out problematic ones
function ProblematicComponent() {
  "use no memo"; // Fix issues before removing
  // ...
}
```


---

## رفع اشکال {/*troubleshooting*/}

برای مشکلات خاص با دایرکتیوها، بخش‌های رفع اشکال را در:

* [`"use memo"` رفع اشکال](/reference/react-compiler/directives/use-memo#troubleshooting)
* [`"use no memo"` رفع اشکال](/reference/react-compiler/directives/use-no-memo#troubleshooting)

### مشکلات رایج {/*common-issues*/}

1. **دایرکتیو نادیده گرفته می‌شود**: محل قرارگیری (باید اول باشد) و املای آن را بررسی کنید
2. **کامپایل همچنان انجام می‌شود**: تنظیم `ignoreUseNoForget` را بررسی کنید
3. **دایرکتیو ماژول کار نمی‌کند**: مطمئن شوید قبل از همهٔ importها است

---

## همچنین ببینید {/*see-also*/}

* [`compilationMode`](/reference/react-compiler/compilationMode) - پیکربندی چگونگی انتخاب کامپایلر برای بهینه‌سازی
* [`پیکربندی`](/reference/react-compiler/configuration) - گزینه‌های کامل پیکربندی کامپایلر
* [مستندات React Compiler](https://react.dev/learn/react-compiler) - راهنمای شروع به کار
