---
title: اتخاذ تدریجی
---

<Intro>
کامپایلر ری‌اکت را می‌توان به‌صورت تدریجی اتخاذ کرد، که به شما اجازه می‌دهد ابتدا آن را روی بخش‌های خاصی از کدبیس خود امتحان کنید. این راهنما به شما نشان می‌دهد چگونه کامپایلر را به‌تدریج در پروژه‌های موجود استقرار دهید.
</Intro>

<YouWillLearn>

* چرا اتخاذ تدریجی توصیه می‌شود
* استفاده از Babel overrides برای اتخاذ مبتنی بر دایرکتوری
* استفاده از دایرکتیو "use memo" برای کامپایل opt-in
* استفاده از دایرکتیو "use no memo" برای خارج کردن کامپوننت‌ها
- پرچم‌های ویژگی زمان اجرا با gating
* پایش پیشرفت اتخاذ خود

</YouWillLearn>

## چرا اتخاذ تدریجی؟ {/*why-incremental-adoption*/}

کامپایلر ری‌اکت طوری طراحی شده که کل کدبیس شما را به‌طور خودکار بهینه کند، اما مجبور نیستید همه را یک‌باره اتخاذ کنید. اتخاذ تدریجی به شما کنترل روی فرآیند استقرار می‌دهد و اجازه می‌دهد پیش از گسترش به بقیه، کامپایلر را روی بخش‌های کوچکی از اپلیکیشن خود آزمایش کنید.

شروع کوچک به شما کمک می‌کند تا به بهینه‌سازی‌های کامپایلر اعتماد پیدا کنید. می‌توانید بررسی کنید که اپلیکیشن شما با کد کامپایل‌شده به‌درستی رفتار می‌کند، بهبودهای عملکرد را بسنجید و موارد استثنایی خاص کدبیس خود را شناسایی کنید. این رویکرد به‌ویژه برای اپلیکیشن‌های تولیدی که پایداری در آن‌ها حیاتی است ارزشمند است.

اتخاذ تدریجی همچنین آسان‌تر می‌کند نقض‌های قوانین ری‌اکت را که ممکن است کامپایلر پیدا کند برطرف کنید. به‌جای رفع نقض‌ها در سراسر کدبیس به‌یکباره، می‌توانید با گسترش پوشش کامپایلر به‌صورت سیستماتیک با آن‌ها مقابله کنید. این کار استقرار را قابل‌مدیریت نگه می‌دارد و خطر معرفی باگ را کاهش می‌دهد.

با کنترل اینکه کدام بخش‌های کد شما کامپایل می‌شوند، می‌توانید آزمون‌های A/B نیز اجرا کنید تا تأثیر واقعی بهینه‌سازی‌های کامپایلر را بسنجید. این داده‌ها به شما کمک می‌کند تصمیمات آگاهانه‌ای دربارهٔ اتخاذ کامل بگیرید و ارزش را به تیم خود نشان دهید.

## رویکردهایی برای اتخاذ تدریجی {/*approaches-to-incremental-adoption*/}

سه رویکرد اصلی برای اتخاذ تدریجی کامپایلر ری‌اکت وجود دارد:

1. **Babel overrides** - اعمال کامپایلر روی دایرکتوری‌های خاص
2. **Opt-in با "use memo"** - تنها کامپایل کامپوننت‌هایی که صریحاً opt-in می‌شوند
3. **Gating زمان اجرا** - کنترل کامپایل با پرچم‌های ویژگی

همهٔ رویکردها به شما اجازه می‌دهند پیش از استقرار کامل، کامپایلر را روی بخش‌های خاصی از اپلیکیشن خود آزمایش کنید.

## اتخاذ مبتنی بر دایرکتوری با Babel Overrides {/*directory-based-adoption*/}

گزینهٔ `overrides` در Babel به شما اجازه می‌دهد پلاگین‌های مختلفی را به بخش‌های مختلف کدبیس خود اعمال کنید. این برای اتخاذ تدریجی کامپایلر ری‌اکت دایرکتوری به دایرکتوری ایده‌آل است.

### پیکربندی پایه {/*basic-configuration*/}

با اعمال کامپایلر به یک دایرکتوری خاص شروع کنید:

```js
// babel.config.js
module.exports = {
  plugins: [
    // Global plugins that apply to all files
  ],
  overrides: [
    {
      test: './src/modern/**/*.{js,jsx,ts,tsx}',
      plugins: [
        'babel-plugin-react-compiler'
      ]
    }
  ]
};
```

### گسترش پوشش {/*expanding-coverage*/}

همان‌طور که اعتماد پیدا می‌کنید، دایرکتوری‌های بیشتری اضافه کنید:

```js
// babel.config.js
module.exports = {
  plugins: [
    // Global plugins
  ],
  overrides: [
    {
      test: ['./src/modern/**/*.{js,jsx,ts,tsx}', './src/features/**/*.{js,jsx,ts,tsx}'],
      plugins: [
        'babel-plugin-react-compiler'
      ]
    },
    {
      test: './src/legacy/**/*.{js,jsx,ts,tsx}',
      plugins: [
        // Different plugins for legacy code
      ]
    }
  ]
};
```

### با گزینه‌های کامپایلر {/*with-compiler-options*/}

همچنین می‌توانید گزینه‌های کامپایلر را برای هر override پیکربندی کنید:

```js
// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: './src/experimental/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    },
    {
      test: './src/production/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    }
  ]
};
```


## حالت Opt-in با "use memo" {/*opt-in-mode-with-use-memo*/}

برای حداکثر کنترل، می‌توانید از `compilationMode: 'annotation'` استفاده کنید تا تنها کامپوننت‌ها و هوک‌هایی کامپایل شوند که صریحاً با دایرکتیو `"use memo"` opt-in می‌شوند.

<Note>
این رویکرد به شما کنترل ریزدانه‌ای روی کامپوننت‌ها و هوک‌های منفرد می‌دهد. وقتی مفید است که بخواهید کامپایلر را روی کامپوننت‌های خاصی آزمایش کنید بدون اینکه کل دایرکتوری‌ها را تحت تأثیر قرار دهید.
</Note>

### پیکربندی حالت Annotation {/*annotation-mode-configuration*/}

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation',
    }],
  ],
};
```

### استفاده از دایرکتیو {/*using-the-directive*/}

`"use memo"` را به ابتدای توابعی که می‌خواهید کامپایل شوند اضافه کنید:

```js
function TodoList({ todos }) {
  "use memo"; // Opt this component into compilation

  const sortedTodos = todos.slice().sort();

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function useSortedData(data) {
  "use memo"; // Opt this hook into compilation

  return data.slice().sort();
}
```

با `compilationMode: 'annotation'`، باید:
- `"use memo"` را به هر کامپوننتی که می‌خواهید بهینه شود اضافه کنید
- `"use memo"` را به هر هوک سفارشی اضافه کنید
- به یاد داشته باشید آن را به کامپوننت‌های جدید اضافه کنید

این کار به شما کنترل دقیقی روی اینکه کدام کامپوننت‌ها کامپایل می‌شوند می‌دهد، در حالی که تأثیر کامپایلر را ارزیابی می‌کنید.

## پرچم‌های ویژگی زمان اجرا با Gating {/*runtime-feature-flags-with-gating*/}

گزینهٔ `gating` به شما اجازه می‌دهد کامپایل را در زمان اجرا با استفاده از پرچم‌های ویژگی کنترل کنید. این برای اجرای آزمون‌های A/B یا استقرار تدریجی کامپایلر بر اساس بخش‌های کاربری مفید است.

### Gating چگونه کار می‌کند {/*how-gating-works*/}

کامپایلر کد بهینه‌شده را در یک بررسی زمان اجرا می‌پیچد. اگر گیت `true` برگرداند، نسخهٔ بهینه‌شده اجرا می‌شود. در غیر این صورت، کد اصلی اجرا می‌شود.

### پیکربندی Gating {/*gating-configuration*/}

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        source: 'ReactCompilerFeatureFlags',
        importSpecifierName: 'isCompilerEnabled',
      },
    }],
  ],
};
```

### پیاده‌سازی پرچم ویژگی {/*implementing-the-feature-flag*/}

یک ماژول ایجاد کنید که تابع gating شما را صادر کند:

```js
// ReactCompilerFeatureFlags.js
export function isCompilerEnabled() {
  // Use your feature flag system
  return getFeatureFlag('react-compiler-enabled');
}
```

## رفع اشکال اتخاذ {/*troubleshooting-adoption*/}

اگر در طول اتخاذ با مشکلی مواجه شدید:

1. از `"use no memo"` برای خارج کردن موقت کامپوننت‌های مشکل‌ساز استفاده کنید
2. [راهنمای دیباگ](/learn/react-compiler/debugging) را برای مشکلات رایج بررسی کنید
3. نقض‌های قوانین ری‌اکت شناسایی‌شده به‌وسیلهٔ پلاگین ESLint را برطرف کنید
4. در نظر بگیرید از `compilationMode: 'annotation'` برای اتخاذ تدریجی‌تر استفاده کنید

## مراحل بعدی {/*next-steps*/}

- [راهنمای پیکربندی](/reference/react-compiler/configuration) را برای گزینه‌های بیشتر بخوانید
- دربارهٔ [تکنیک‌های دیباگ](/learn/react-compiler/debugging) بیاموزید
- [مرجع API](/reference/react-compiler/configuration) را برای تمام گزینه‌های کامپایلر بررسی کنید
