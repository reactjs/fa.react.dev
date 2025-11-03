---
title: gating
<<<<<<< HEAD
=======
version: rc
>>>>>>> 11cb6b591571caf5fa2a192117b6a6445c3f2027
---

<Intro>

Validates configuration of [gating mode](/reference/react-compiler/gating).

</Intro>

<<<<<<< HEAD
=======
<Note>

This rule is available in `eslint-plugin-react-hooks` v6.

</Note>

>>>>>>> 11cb6b591571caf5fa2a192117b6a6445c3f2027
## Rule Details {/*rule-details*/}

Gating mode lets you gradually adopt React Compiler by marking specific components for optimization. This rule ensures your gating configuration is valid so the compiler knows which components to process.

### Invalid {/*invalid*/}

Examples of incorrect code for this rule:

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

### Valid {/*valid*/}

Examples of correct code for this rule:

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
