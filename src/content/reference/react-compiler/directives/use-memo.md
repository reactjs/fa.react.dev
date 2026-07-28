---
title: "use memo"
titleForTitleTag: "'use memo' directive"
---

<Intro>

`"use memo"` یک تابع را برای بهینه‌سازی توسط React Compiler علامت‌گذاری می‌کند.

</Intro>

<Note>

در بیشتر موارد، نیازی به `"use memo"` ندارید. این عمدتاً در حالت `annotation` نیاز است، جایی که باید به‌صورت صریح تابع‌ها را برای بهینه‌سازی علامت‌گذاری کنید. در حالت `infer`، کامپایلر به‌طور خودکار کامپوننت‌ها و هوک‌ها را با الگوی نام‌گذاری آنها (PascalCase برای کامپوننت‌ها، پیشوند `use` برای هوک‌ها) شناسایی می‌کند. اگر یک کامپوننت یا هوک در حالت `infer` کامپایل نمی‌شود، باید قرارداد نام‌گذاری آن را برطرف کنید، نه اینکه با `"use memo"` کامپایل را اجبار کنید.

</Note>

<InlineToc />

---

## مرجع {/*reference*/}

### `"use memo"` {/*use-memo*/}

`"use memo"` را در ابتدای یک تابع اضافه کنید تا آن را برای بهینه‌سازی توسط React Compiler علامت‌گذاری کنید.

```js {1}
function MyComponent() {
  "use memo";
  // ...
}
```

وقتی یک تابع حاوی `"use memo"` است، React Compiler در زمان build آن را تحلیل و بهینه‌سازی می‌کند. کامپایلر به‌طور خودکار مقادیر و کامپوننت‌ها را memoize می‌کند تا از محاسبات مجدد و رندرهای مجدد غیرضروری جلوگیری شود.

#### ملاحظات {/*caveats*/}

* `"use memo"` باید در همان ابتدای بدنهٔ تابع، قبل از هرگونه import یا کد دیگر باشد (کامنت‌ها مجاز هستند).
* دایرکتیو باید با کوتیشن جفتی یا تکی نوشته شود، نه backtick.
* دایرکتیو باید دقیقاً با `"use memo"` مطابقت کند.
* فقط اولین دایرکتیو در یک تابع پردازش می‌شود؛ دایرکتیوهای اضافی نادیده گرفته می‌شوند.
* اثر دایرکتیو بسته به تنظیم [`compilationMode`](/reference/react-compiler/compilationMode) شما متفاوت است.

### چگونه `"use memo"` تابع‌ها را برای بهینه‌سازی علامت‌گذاری می‌کند {/*how-use-memo-marks*/}

در یک اپ ری‌اکت که از React Compiler استفاده می‌کند، تابع‌ها در زمان build تحلیل می‌شوند تا تعیین شود آیا می‌توانند بهینه شوند. به‌طور پیش‌فرض، کامپایلر به‌طور خودکار استنباط می‌کند که کدام کامپوننت‌ها را memoize کند، اما این می‌تواند به تنظیم [`compilationMode`](/reference/react-compiler/compilationMode) شما بستگی داشته باشد اگر آن را تنظیم کرده باشید.

`"use memo"` به‌صورت صریح یک تابع را برای بهینه‌سازی علامت‌گذاری می‌کند، و رفتار پیش‌فرض را نادیده می‌گیرد:

* در حالت `annotation`: فقط تابع‌های دارای `"use memo"` بهینه می‌شوند
* در حالت `infer`: کامپایلر از هیوریستیک استفاده می‌کند، اما `"use memo"` بهینه‌سازی را اجبار می‌کند
* در حالت `all`: همه چیز به‌طور پیش‌فرض بهینه می‌شود، که `"use memo"` را زائد می‌کند

دایرکتیو یک مرز روشن در کدبیس شما بین کد بهینه‌شده و کد بهینه‌نشده ایجاد می‌کند، و کنترل دقیقی روی فرآیند کامپایل به شما می‌دهد.

### چه زمان از `"use memo"` استفاده کنیم {/*when-to-use*/}

باید در نظر بگیرید که از `"use memo"` استفاده کنید وقتی:

#### از حالت annotation استفاده می‌کنید {/*annotation-mode-use*/}
در `compilationMode: 'annotation'`، دایرکتیو برای هر تابعی که می‌خواهید بهینه شود، الزامی است:

```js
// ✅ This component will be optimized
function OptimizedList() {
  "use memo";
  // ...
}

// ❌ This component won't be optimized
function SimpleWrapper() {
  // ...
}
```

#### در حال پذیرش تدریجی React Compiler هستید {/*gradual-adoption*/}
با حالت `annotation` شروع کنید و به‌انتخاب کامپوننت‌های پایدار را بهینه کنید:

```js
// Start by optimizing leaf components
function Button({ onClick, children }) {
  "use memo";
  // ...
}

// Gradually move up the tree as you verify behavior
function ButtonGroup({ buttons }) {
  "use memo";
  // ...
}
```

---

## نحوهٔ استفاده {/*usage*/}

### کار با حالت‌های کامپایل مختلف {/*compilation-modes*/}

رفتار `"use memo"` بر اساس پیکربندی کامپایلر شما تغییر می‌کند:

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation' // or 'infer' or 'all'
    }]
  ]
};
```

#### حالت Annotation {/*annotation-mode-example*/}
```js
// ✅ Optimized with "use memo"
function ProductCard({ product }) {
  "use memo";
  // ...
}

// ❌ Not optimized (no directive)
function ProductList({ products }) {
  // ...
}
```

#### حالت Infer (پیش‌فرض) {/*infer-mode-example*/}
```js
// Automatically memoized because this is named like a Component
function ComplexDashboard({ data }) {
  // ...
}

// Skipped: Is not named like a Component
function simpleDisplay({ text }) {
  // ...
}
```

در حالت `infer`، کامپایلر به‌طور خودکار کامپوننت‌ها و هوک‌ها را با الگوی نام‌گذاری آنها (PascalCase برای کامپوننت‌ها، پیشوند `use` برای هوک‌ها) شناسایی می‌کند. اگر یک کامپوننت یا هوک در حالت `infer` کامپایل نمی‌شود، باید قرارداد نام‌گذاری آن را برطرف کنید، نه اینکه با `"use memo"` کامپایل را اجبار کنید.

---

## رفع اشکال {/*troubleshooting*/}

### تأیید بهینه‌سازی {/*verifying-optimization*/}

برای تأیید اینکه کامپوننت شما بهینه می‌شود:

1. خروجی کامپایل‌شده در build خود را بررسی کنید
2. از React DevTools برای بررسی نشان Memo ✨ استفاده کنید

### همچنین ببینید {/*see-also*/}

* [`"use no memo"`](/reference/react-compiler/directives/use-no-memo) - خروج از کامپایل
* [`compilationMode`](/reference/react-compiler/compilationMode) - پیکربندی رفتار کامپایل
* [React Compiler](/learn/react-compiler) - راهنمای شروع به کار
