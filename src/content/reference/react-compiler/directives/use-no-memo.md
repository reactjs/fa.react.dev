---
title: "use no memo"
titleForTitleTag: "'use no memo' directive"
---

<Intro>

`"use no memo"` مانع می‌شود که یک تابع توسط React Compiler بهینه شود.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `"use no memo"` {/*use-no-memo*/}

`"use no memo"` را در ابتدای یک تابع اضافه کنید تا از بهینه‌سازی توسط React Compiler جلوگیری شود.

```js {1}
function MyComponent() {
  "use no memo";
  // ...
}
```

وقتی یک تابع حاوی `"use no memo"` است، React Compiler در طول بهینه‌سازی کلاً آن را نادیده می‌گیرد. این به‌عنوان راه فرار موقتی هنگام دیباگ یا هنگام کار با کدی که به‌درستی با کامپایلر کار نمی‌کند، مفید است.

#### ملاحظات {/*caveats*/}

* `"use no memo"` باید در همان ابتدای بدنهٔ تابع، قبل از هرگونه import یا کد دیگر باشد (کامنت‌ها مجاز هستند).
* دایرکتیو باید با کوتیشن جفتی یا تکی نوشته شود، نه backtick.
* دایرکتیو باید دقیقاً با `"use no memo"` یا نام مستعار آن `"use no forget"` مطابقت کند.
* این دایرکتیو بر همهٔ حالت‌های کامپایل و دایرکتیوهای دیگر تقدم دارد.
* این به‌عنوان یک ابزار دیباگ موقت در نظر گرفته شده، نه یک راه‌حل دائمی.

### چگونه `"use no memo"` از بهینه‌سازی خارج می‌شود {/*how-use-no-memo-opts-out*/}

React Compiler کد شما را در زمان build تحلیل می‌کند تا بهینه‌سازی‌ها را اعمال کند. `"use no memo"` یک مرز صریح ایجاد می‌کند که به کامپایلر می‌گوید یک تابع را کلاً نادیده بگیر.

این دایرکتیو بر همهٔ تنظیمات دیگر تقدم دارد:
* در حالت `all`: تابع به‌رغم تنظیم سراسری نادیده گرفته می‌شود
* در حالت `infer`: تابع نادیده گرفته می‌شود، حتی اگر هیوریستیک آن را بهینه کند

کامپایلر با این تابع‌ها به‌گونه‌ای رفتار می‌کند که انگار React Compiler فعال نیست، و آن‌ها را دقیقاً همان‌طور که نوشته شده‌اند رها می‌کند.

### چه زمان از `"use no memo"` استفاده کنیم {/*when-to-use*/}

`"use no memo"` باید به‌ندرت و موقتاً استفاده شود. سناریوهای رایج شامل موارد زیر است:

#### دیباگ مشکلات کامپایلر {/*debugging-compiler*/}
وقتی مشکوک هستید که کامپایلر باعث مشکلات می‌شود، موقتاً بهینه‌سازی را غیرفعال کنید تا مشکل را ایزوله کنید:

```js
function ProblematicComponent({ data }) {
  "use no memo"; // TODO: Remove after fixing issue #123

  // Rules of React violations that weren't statically detected
  // ...
}
```

#### ادغام با کتابخانهٔ شخص ثالث {/*third-party*/}
هنگام ادغام با کتابخانه‌هایی که ممکن است با کامپایلر سازگار نباشند:

```js
function ThirdPartyWrapper() {
  "use no memo";

  useThirdPartyHook(); // Has side effects that compiler might optimize incorrectly
  // ...
}
```

---

## نحوهٔ استفاده {/*usage*/}

دایرکتیو `"use no memo"` در ابتدای بدنهٔ یک تابع قرار می‌گیرد تا مانع از بهینه‌سازی آن تابع توسط React Compiler شود:

```js
function MyComponent() {
  "use no memo";
  // Function body
}
```

دایرکتیو همچنین می‌تواند در بالای یک فایل قرار گیرد تا بر همهٔ تابع‌های آن ماژول تأثیر بگذارد:

```js
"use no memo";

// All functions in this file will be skipped by the compiler
```

`"use no memo"` در سطح تابع بر دایرکتیو سطح ماژول تقدم دارد.

---

## رفع اشکال {/*troubleshooting*/}

### دایرکتیو از کامپایل جلوگیری نمی‌کند {/*not-preventing*/}

اگر `"use no memo"` کار نمی‌کند:

```js
// ❌ Wrong - directive after code
function Component() {
  const data = getData();
  "use no memo"; // Too late!
}

// ✅ Correct - directive first
function Component() {
  "use no memo";
  const data = getData();
}
```

همچنین بررسی کنید:
* املای - باید دقیقاً `"use no memo"` باشد
* کوتیشن‌ها - باید از کوتیشن تکی یا جفتی استفاده شود، نه backtick

### بهترین روش‌ها {/*best-practices*/}

**همیشه توضیح دهید چرا** بهینه‌سازی را غیرفعال می‌کنید:

```js
// ✅ Good - clear explanation and tracking
function DataProcessor() {
  "use no memo"; // TODO: Remove after fixing rule of react violation
  // ...
}

// ❌ Bad - no explanation
function Mystery() {
  "use no memo";
  // ...
}
```

### همچنین ببینید {/*see-also*/}

* [`"use memo"`](/reference/react-compiler/directives/use-memo) - انتخاب برای کامپایل
* [React Compiler](/learn/react-compiler) - راهنمای شروع به کار
