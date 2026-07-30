---
title: gating
---

<Intro>

پیکربندی [حالت gating](/reference/react-compiler/gating) را اعتبارسنجی می‌کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

حالت gating به شما اجازه می‌دهد React Compiler را به‌تدریج با علامت‌گذاری کامپوننت‌های خاص برای بهینه‌سازی بپذیرید. این قانون تأیید می‌کند که پیکربندی gating شما معتبر است تا کامپایلر بداند کدام کامپوننت‌ها را پردازش کند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Missing required fields
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        importSpecifierName: '__experimental_useCompiler'
        // Missing 'source' field
      }
    }]
  ]
};

// ❌ Invalid gating type
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: '__experimental_useCompiler' // Should be object
    }]
  ]
};
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Complete gating configuration
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        importSpecifierName: 'isCompilerEnabled', // exported function name
        source: 'featureFlags' // module name
      }
    }]
  ]
};

// featureFlags.js
export function isCompilerEnabled() {
  // ...
}

// ✅ No gating (compile everything)
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      // No gating field - compiles all components
    }]
  ]
};
```
