---
title: createContext
---

<Intro>

`createContext` به شما اجازه می‌دهد یک [کانتکست](/learn/passing-data-deeply-with-context) ایجاد کنید که کامپوننت‌ها می‌توانند آن را فراهم یا بخوانند.

```js
const SomeContext = createContext(defaultValue)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `createContext(defaultValue)` {/*createcontext*/}

برای ایجاد یک کانتکست، `createContext` را خارج از هر کامپوننتی فراخوانی کنید.

```js
import { createContext } from 'react';

const ThemeContext = createContext('light');
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `defaultValue`: مقداری که می‌خواهید کانتکست داشته باشد وقتی هیچ پروایدر کانتکست منطبقی در درخت بالای کامپوننتی که کانتکست را می‌خواند وجود ندارد. اگر هیچ مقدار پیش‌فرض معناداری ندارید، `null` تعیین کنید. مقدار پیش‌فرض به‌عنوان یک fallback «آخرین راه‌حل» در نظر گرفته می‌شود. این مقدار ایستا است و هرگز در طول زمان تغییر نمی‌کند.

#### مقادیر بازگشتی {/*returns*/}

`createContext` یک شیء کانتکست برمی‌گرداند.

**خود شیء کانتکست هیچ اطلاعاتی نگه نمی‌دارد.** این نشان می‌دهد کدام کانتکست را کامپوننت‌های دیگر می‌خوانند یا فراهم می‌کنند. معمولاً، شما از [`SomeContext`](#provider) در کامپوننت‌های بالاتر برای تعیین مقدار کانتکست استفاده می‌کنید، و [`useContext(SomeContext)`](/reference/react/useContext) را در کامپوننت‌های پایین‌تر برای خواندن آن فراخوانی می‌کنید. شیء کانتکست چند پراپرتی دارد:

* `SomeContext` به شما اجازه می‌دهد مقدار کانتکست را به کامپوننت‌ها فراهم کنید.
* `SomeContext.Consumer` روشی جایگزین و به‌ندرت استفاده‌شده برای خواندن مقدار کانتکست است.
* `SomeContext.Provider` روشی قدیمی برای فراهم‌کردن مقدار کانتکست قبل از ری‌اکت ۱۹ است.

---

### پروایدر `SomeContext` {/*provider*/}

کامپوننت‌های خود را در یک پروایدر کانتکست بپیچید تا مقدار این کانتکست را برای همهٔ کامپوننت‌های درونش تعیین کنید:

```js
function App() {
  const [theme, setTheme] = useState('light');
  // ...
  return (
    <ThemeContext value={theme}>
      <Page />
    </ThemeContext>
  );
}
```

<Note>

از ری‌اکت ۱۹، می‌توانید `<SomeContext>` را به‌عنوان یک پروایدر رندر کنید. 

در نسخه‌های قدیمی‌تر ری‌اکت، از `<SomeContext.Provider>` استفاده کنید.

</Note>

#### پراپس {/*provider-props*/}

* `value`: مقداری که می‌خواهید به همهٔ کامپوننت‌هایی که این کانتکست را درون این پروایدر می‌خوانند، بدون توجه به عمق، پاس بدهید. مقدار کانتکست می‌تواند از هر نوعی باشد. کامپوننتی که [`useContext(SomeContext)`](/reference/react/useContext) را درون پروایدر فراخوانی می‌کند، `value` نزدیک‌ترین پروایدر کانتکست منطبق بالای خود را دریافت می‌کند.

---

### `SomeContext.Consumer` {/*consumer*/}

قبل از آنکه `useContext` وجود داشته باشد، یک روش قدیمی‌تر برای خواندن کانتکست وجود داشت:

```js
function Button() {
  // 🟡 Legacy way (not recommended)
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button className={theme} />
      )}
    </ThemeContext.Consumer>
  );
}
```

اگرچه این روش قدیمی هنوز کار می‌کند، **کدهای تازه‌نوشته‌شده باید کانتکست را با [`useContext()`](/reference/react/useContext) بخوانند:**

```js
function Button() {
  // ✅ Recommended way
  const theme = useContext(ThemeContext);
  return <button className={theme} />;
}
```

#### پراپس {/*consumer-props*/}

* `children`: یک تابع. ری‌اکت تابعی که پاس می‌دهید را با مقدار کانتکست فعلی که توسط همان الگوریتمی که [`useContext()`](/reference/react/useContext) استفاده می‌کند تعیین شده، فراخوانی می‌کند، و نتیجه‌ای که از این تابع برمی‌گردانید را رندر می‌کند. ری‌اکت همچنین هر زمان کانتکست از کامپوننت‌های والد تغییر کند، این تابع را دوباره اجرا کرده و UI را به‌روزرسانی می‌کند.

---

## استفاده {/*usage*/}

### ایجاد کانتکست {/*creating-context*/}

کانتکست به کامپوننت‌ها اجازه می‌دهد [اطلاعاتی را عمیقاً پاس بدهند](/learn/passing-data-deeply-with-context) بدون آنکه پراپس را به‌صورت صریح پاس بدهند.

برای ایجاد یک یا چند کانتکست، `createContext` را خارج از هر کامپوننتی فراخوانی کنید.

```js [[1, 3, "ThemeContext"], [1, 4, "AuthContext"], [3, 3, "'light'"], [3, 4, "null"]]
import { createContext } from 'react';

const ThemeContext = createContext('light');
const AuthContext = createContext(null);
```

`createContext` یک <CodeStep step={1}>شیء کانتکست</CodeStep> برمی‌گرداند. کامپوننت‌ها می‌توانند کانتکست را با پاس‌دادن آن به [`useContext()`](/reference/react/useContext) بخوانند:

```js [[1, 2, "ThemeContext"], [1, 7, "AuthContext"]]
function Button() {
  const theme = useContext(ThemeContext);
  // ...
}

function Profile() {
  const currentUser = useContext(AuthContext);
  // ...
}
```

به‌طور پیش‌فرض، مقادیری که دریافت می‌کنند همان <CodeStep step={3}>مقادیر پیش‌فرض</CodeStep>ای خواهد بود که هنگام ایجاد کانتکست‌ها تعیین کرده‌اید. با این حال، این به‌تنهایی مفید نیست زیرا مقادیر پیش‌فرض هرگز تغییر نمی‌کنند.

کانتکست مفید است زیرا می‌توانید **مقادیر پویای دیگر را از کامپوننت‌های خود فراهم کنید:**

```js {8-9,11-12}
function App() {
  const [theme, setTheme] = useState('dark');
  const [currentUser, setCurrentUser] = useState({ name: 'Taylor' });

  // ...

  return (
    <ThemeContext value={theme}>
      <AuthContext value={currentUser}>
        <Page />
      </AuthContext>
    </ThemeContext>
  );
}
```

اکنون کامپوننت `Page` و هر کامپوننتی درون آن، بدون توجه به عمق، مقادیر کانتکست پاس‌داده‌شده را «خواهند دید». اگر مقادیر کانتکست پاس‌داده‌شده تغییر کنند، ری‌اکت کامپوننت‌هایی که کانتکست را می‌خوانند نیز دوباره رندر می‌کند.

[دربارهٔ خواندن و فراهم‌کردن کانتکست بیشتر بخوانید و مثال‌ها را ببینید.](/reference/react/useContext)

---

### ایمپورت و اکسپورت کانتکست از یک فایل {/*importing-and-exporting-context-from-a-file*/}

اغلب، کامپوننت‌هایی در فایل‌های مختلف نیاز به دسترسی به همان کانتکست دارند. به همین دلیل است که اعلان کانتکست‌ها در یک فایل جداگانه رایج است. سپس می‌توانید از عبارت [`export`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) برای در دسترس قرار دادن کانتکست برای فایل‌های دیگر استفاده کنید:

```js {4-5}
// Contexts.js
import { createContext } from 'react';

export const ThemeContext = createContext('light');
export const AuthContext = createContext(null);
```

کامپوننت‌هایی که در فایل‌های دیگر اعلان شده‌اند سپس می‌توانند از عبارت [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) برای خواندن یا فراهم‌کردن این کانتکست استفاده کنند:

```js {2}
// Button.js
import { ThemeContext } from './Contexts.js';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
}
```

```js {2}
// App.js
import { ThemeContext, AuthContext } from './Contexts.js';

function App() {
  // ...
  return (
    <ThemeContext value={theme}>
      <AuthContext value={currentUser}>
        <Page />
      </AuthContext>
    </ThemeContext>
  );
}
```

این مشابه [ایمپورت و اکسپورت کامپوننت‌ها](/learn/importing-and-exporting-components) کار می‌کند.

---

## رفع اشکال {/*troubleshooting*/}

### راهی برای تغییر مقدار کانتکست پیدا نمی‌کنم {/*i-cant-find-a-way-to-change-the-context-value*/}


کدی مانند این مقدار کانتکست *پیش‌فرض* را تعیین می‌کند:

```js
const ThemeContext = createContext('light');
```

این مقدار هرگز تغییر نمی‌کند. ری‌اکت تنها در صورتی که نتواند پروایدر منطبقی در بالا پیدا کند، از این مقدار به‌عنوان fallback استفاده می‌کند.

برای آنکه کانتکست در طول زمان تغییر کند، [استیت اضافه کنید و کامپوننت‌ها را در یک پروایدر کانتکست بپیچید.](/reference/react/useContext#updating-data-passed-via-context)
