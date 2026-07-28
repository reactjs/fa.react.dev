---
title: پیکربندی
---

<Intro>

این صفحه همهٔ گزینه‌های پیکربندی موجود در React Compiler را فهرست می‌کند.

</Intro>

<Note>

برای بیشتر اپ‌ها، گزینه‌های پیش‌فرض باید به‌صورت پیش‌فرض کار کنند. اگر نیاز خاصی دارید، می‌توانید از این گزینه‌های پیشرفته استفاده کنید.

</Note>

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler', {
        // compiler options
      }
    ]
  ]
};
```

---

## کنترل کامپایل {/*compilation-control*/}

این گزینه‌ها کنترل می‌کنند که کامپایلر *چه چیزی* را بهینه‌سازی می‌کند و *چگونه* کامپوننت‌ها و هوک‌هایی که باید کامپایل شوند را انتخاب می‌کند.

* [`compilationMode`](/reference/react-compiler/compilationMode) استراتژی انتخاب تابع‌ها برای کامپایل را کنترل می‌کند (مثلاً همهٔ تابع‌ها، فقط تابع‌های علامت‌گذاری‌شده، یا تشخیص هوشمندانه).

```js
{
  compilationMode: 'annotation' // Only compile "use memo" functions
}
```

---

## سازگاری نسخه {/*version-compatibility*/}

پیکربندی نسخهٔ ری‌اکت تضمین می‌کند که کامپایلر کدی سازگار با نسخهٔ ری‌اکت شما تولید می‌کند.

[`target`](/reference/react-compiler/target) مشخص می‌کند که از کدام نسخهٔ ری‌اکت استفاده می‌کنید (۱۷، ۱۸ یا ۱۹).

```js
// For React 18 projects
{
  target: '18' // Also requires react-compiler-runtime package
}
```

---

## مدیریت خطا {/*error-handling*/}

این گزینه‌ها کنترل می‌کنند که کامپایلر چگونه به کدی که از [قوانین ری‌اکت](/reference/rules) پیروی نمی‌کند، پاسخ می‌دهد.

[`panicThreshold`](/reference/react-compiler/panicThreshold) تعیین می‌کند که آیا build شکست بخورد یا کامپوننت‌های مشکل‌دار نادیده گرفته شوند.

```js
// Recommended for production
{
  panicThreshold: 'none' // Skip components with errors instead of failing the build
}
```

---

## دیباگ {/*debugging*/}

گزینه‌های لاگ‌گیری و تحلیل به شما کمک می‌کنند تا درک کنید کامپایلر چه کار می‌کند.

[`logger`](/reference/react-compiler/logger) لاگ‌گیری سفارشی برای رویدادهای کامپایل فراهم می‌کند.

```js
{
  logger: {
    logEvent(filename, event) {
      if (event.kind === 'CompileSuccess') {
        console.log('Compiled:', filename);
      }
    }
  }
}
```

---

## فلگ‌های ویژگی {/*feature-flags*/}

کامپایل شرطی به شما اجازه می‌دهد کنترل کنید چه زمان از کد بهینه‌شده استفاده می‌شود.

[`gating`](/reference/react-compiler/gating) فلگ‌های ویژگی runtime را برای A/B testing یا rollout تدریجی فعال می‌کند.

```js
{
  gating: {
    source: 'my-feature-flags',
    importSpecifierName: 'isCompilerEnabled'
  }
}
```

---

## الگوهای رایج پیکربندی {/*common-patterns*/}

### پیکربندی پیش‌فرض {/*default-configuration*/}

برای بیشتر اپلیکیشن‌های React 19، کامپایلر بدون پیکربندی کار می‌کند:

```js
// babel.config.js
module.exports = {
  plugins: [
    'babel-plugin-react-compiler'
  ]
};
```

### پروژه‌های React 17/18 {/*react-17-18*/}

نسخه‌های قدیمی‌تر ری‌اکت به پکیج runtime و پیکربندی target نیاز دارند:

```bash
npm install react-compiler-runtime@rc
```

```js
{
  target: '18' // or '17'
}
```

### پذیرش تدریجی {/*incremental-adoption*/}

با دایرکتوری‌های خاص شروع کنید و به‌تدریج گسترش دهید:

```js
{
  compilationMode: 'annotation' // Only compile "use memo" functions
}
```

