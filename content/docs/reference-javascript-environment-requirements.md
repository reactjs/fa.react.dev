---
id: javascript-environment-requirements
title: پیش‌نیاز‌های محیط جاوااسکریپت
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

ری‌اکت ۱۸ از تمام مرورگرهای مدرن (Edge، Firefox، Chrome، Safari و غیره) پشتیبانی می کند.

اگر از مرورگرها و دستگاه‌های قدیمی‌تری مانند اینترنت اکسپلورر که ویژگی‌های مرورگر مدرن را به‌صورت بومی ارائه نمی‌کنند یا پیاده‌سازی‌های ناسازگاری دارند، پشتیبانی می‌کنید، در برنامه همراه خود یک polyfill سراسری اضافه کنید.

در اینجا لیستی از ویژگی های مدرن مورد استفاده ری‌اکت ۱۸ آمده است:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

پلی‌فیل صحیح برای این ویژگی ها به محیط شما بستگی دارد. برای بسیاری از کاربران، می‌توانید تنظیمات [Browserlist](https://github.com/browserslist/browserslist) خود را پیکربندی کنید. برای دیگران، ممکن است نیاز داشته باشید که polyfillهایی مانند [`core-js`](https://github.com/zloirock/core-js) را مستقیماً ایمپورت کنید.
