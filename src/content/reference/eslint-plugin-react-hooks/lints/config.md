---
title: config
---

<Intro>

[گزینه‌های پیکربندی](/reference/react-compiler/configuration) کامپایلر را اعتبارسنجی می‌کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

React Compiler گزینه‌های پیکربندی مختلفی را برای کنترل رفتار خود می‌پذیرد. این قانون تأیید می‌کند که پیکربندی شما از نام‌های گزینه و انواع مقدار صحیح استفاده می‌کند، و از شکست‌های خامس به‌دلیل اشتباه تایپی یا تنظیمات نادرست جلوگیری می‌کند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Unknown option name
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compileMode: 'all' // Typo: should be compilationMode
    }]
  ]
};

// ❌ Invalid option value
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'everything' // Invalid: use 'all' or 'infer'
    }]
  ]
};
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Valid compiler configuration
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'infer',
      panicThreshold: 'critical_errors'
    }]
  ]
};
```

## رفع اشکال {/*troubleshooting*/}

### پیکربندی به‌طور مورد انتظار کار نمی‌کند {/*config-not-working*/}

ممکن است پیکربندی کامپایلر شما اشتباه تایپی یا مقادیر نادرست داشته باشد:

```js
// ❌ Wrong: Common configuration mistakes
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // Typo in option name
      compilationMod: 'all',
      // Wrong value type
      panicThreshold: true,
      // Unknown option
      optimizationLevel: 'max'
    }]
  ]
};
```

برای گزینه‌های معتبر، [مستندات پیکربندی](/reference/react-compiler/configuration) را بررسی کنید:

```js
// ✅ Better: Valid configuration
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'all', // or 'infer'
      panicThreshold: 'none', // or 'critical_errors', 'all_errors'
      // Only use documented options
    }]
  ]
};
```
