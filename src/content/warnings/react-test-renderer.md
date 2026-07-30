---
title: هشدارهای منسوخ‌شدن react-test-renderer
---

## هشدار ReactTestRenderer.create() {/*reacttestrenderercreate-warning*/}

react-test-renderer منسوخ شده است. هشداری هنگام فراخوانی ReactTestRenderer.create() یا ReactShallowRender.render() فعال می‌شود. پکیج react-test-renderer همچنان روی NPM در دسترس خواهد بود اما نگهداری نخواهد شد و ممکن است با قابلیت‌های جدید ری‌اکت یا تغییرات در internals ری‌اکت بشکند.

تیم ری‌اکت مهاجرت تست‌هایتان به [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) یا [@testing-library/react-native](https://callstack.github.io/react-native-testing-library/docs/start/intro) را برای یک تجربهٔ تست مدرن و به‌خوبی پشتیبانی‌شده توصیه می‌کند.


## هشدار new ShallowRenderer() {/*new-shallowrenderer-warning*/}

پکیج react-test-renderer دیگر یک shallow renderer را در `react-test-renderer/shallow` صادر نمی‌کند. این صرفاً بسته‌بندی مجدد یک پکیج جداگانهٔ استخراج‌شدهٔ قبلی بود: `react-shallow-renderer`. بنابراین می‌توانید با نصب مستقیم آن، به همان روش از shallow renderer استفاده ادامه دهید. ببینید [Github](https://github.com/enzymejs/react-shallow-renderer) / [NPM](https://www.npmjs.com/package/react-shallow-renderer).
