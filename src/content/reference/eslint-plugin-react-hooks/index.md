---
title: eslint-plugin-react-hooks
---

<Intro>

`eslint-plugin-react-hooks` قوانین ESLint را برای اجرای [قوانین ری‌اکت](/reference/rules) فراهم می‌کند.

</Intro>

این پلاگین به شما کمک می‌کند نقض قوانین ری‌اکت را در زمان build بگیرید، و تضمین می‌کند که کامپوننت‌ها و هوک‌های شما از قوانین ری‌اکت برای صحت و عملکرد پیروی کنند. لینت‌ها هم الگوهای بنیادی ری‌اکت (exhaustive-deps و rules-of-hooks) و هم مواردی که توسط React Compiler علامت‌گذاری شده‌اند را پوشش می‌دهند. تشخیص‌های React Compiler به‌طور خودکار توسط این پلاگین ESLint ظاهر می‌شوند، و می‌توانند حتی اگر اپ شما هنوز کامپایلر را نپذیرفته باشد استفاده شوند.

<Note>
وقتی کامپایلر یک تشخیص گزارش می‌کند، بدان معناست که کامپایلر توانست به‌صورت ایستا الگویی را شناسایی کند که پشتیبانی نمی‌شود یا قوانین ری‌اکت را می‌شکند. وقتی این را تشخیص می‌دهد، **به‌طور خودکار** از آن کامپوننت‌ها و هوک‌ها عبور می‌کند، در حالی که بقیهٔ اپ شما کامپایل‌شده باقی می‌ماند. این پوشش بهینهٔ بهینه‌سازی‌های امن که اپ شما را نمی‌شکند تضمین می‌کند.

آنچه این برای لینت‌کردن بدان معناست، این است که نیازی نیست همهٔ نقض‌ها را بلافاصله برطرف کنید. آن‌ها را با سرعت خودتان برطرف کنید تا به‌تدریج تعداد کامپوننت‌های بهینه‌شده افزایش یابد.
</Note>

## لینت‌های موجود {/*available-lints*/}

* [`component-hook-factories`](/reference/eslint-plugin-react-hooks/lints/component-hook-factories) - تابع‌های مرتبه بالاتری که کامپوننت‌ها یا هوک‌های تودرتو تعریف می‌کنند را اعتبارسنجی می‌کند
* [`config`](/reference/eslint-plugin-react-hooks/lints/config) - گزینه‌های پیکربندی کامپایلر را اعتبارسنجی می‌کند
* [`error-boundaries`](/reference/eslint-plugin-react-hooks/lints/error-boundaries) - استفاده از Error Boundaryها به‌جای try/catch برای خطاهای فرزند را اعتبارسنجی می‌کند
* [`exhaustive-deps`](/reference/eslint-plugin-react-hooks/lints/exhaustive-deps) - تأیید می‌کند که آرایه‌های وابستگی برای هوک‌های ری‌اکت شامل همهٔ وابستگی‌های لازم باشند
* [`gating`](/reference/eslint-plugin-react-hooks/lints/gating) - پیکربندی حالت gating را اعتبارسنجی می‌کند
* [`globals`](/reference/eslint-plugin-react-hooks/lints/globals) - انتساب/تغییر متغیرهای سراسری در طول رندر را اعتبارسنجی می‌کند
* [`immutability`](/reference/eslint-plugin-react-hooks/lints/immutability) - تغییر پراپس، استیت و سایر مقادیر غیرقابل تغییر را اعتبارسنجی می‌کند
* [`incompatible-library`](/reference/eslint-plugin-react-hooks/lints/incompatible-library) - استفاده از کتابخانه‌هایی که با memoization ناسازگارند را اعتبارسنجی می‌کند
* [`preserve-manual-memoization`](/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization) - تأیید می‌کند که memoization دستی موجود توسط کامپایلر حفظ می‌شود
* [`purity`](/reference/eslint-plugin-react-hooks/lints/purity) - با بررسی تابع‌های شناخته‌شدهٔ ناخالص، تأیید می‌کند که کامپوننت‌ها/هوک‌ها خالص هستند
* [`refs`](/reference/eslint-plugin-react-hooks/lints/refs) - استفادهٔ صحیح از refها را اعتبارسنجی می‌کند، بدون خواندن/نوشتن در طول رندر
* [`rules-of-hooks`](/reference/eslint-plugin-react-hooks/lints/rules-of-hooks) - تأیید می‌کند که کامپوننت‌ها و هوک‌ها از قوانین هوک‌ها پیروی می‌کنند
* [`set-state-in-effect`](/reference/eslint-plugin-react-hooks/lints/set-state-in-effect) - فراخوانی هم‌زمان setState در یک افکت را اعتبارسنجی می‌کند
* [`set-state-in-render`](/reference/eslint-plugin-react-hooks/lints/set-state-in-render) - تنظیم استیت در طول رندر را اعتبارسنجی می‌کند
* [`static-components`](/reference/eslint-plugin-react-hooks/lints/static-components) - تأیید می‌کند که کامپوننت‌ها استاتیک هستند، و در هر رندر دوباره ایجاد نمی‌شوند
* [`unsupported-syntax`](/reference/eslint-plugin-react-hooks/lints/unsupported-syntax) - سینتکسی که React Compiler پشتیبانی نمی‌کند را اعتبارسنجی می‌کند
* [`use-memo`](/reference/eslint-plugin-react-hooks/lints/use-memo) - استفاده از هوک `useMemo` بدون مقدار برگشتی را اعتبارسنجی می‌کند
