---
title: هشدار پراپ ARIA نامعتبر
---

این هشدار فعال می‌شود اگر تلاش کنید یک عنصر DOM را با یک پراپ `aria-*` رندر کنید که در [مشخصات](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) وجود ندارد.

1. اگر احساس می‌کنید از یک پراپ معتبر استفاده می‌کنید، هجی را با دقت بررسی کنید. `aria-labelledby` و `aria-activedescendant` اغلب اشتباه هجی می‌شوند.

2. اگر `aria-role` نوشته‌اید، ممکن است منظورتان `role` بوده باشد.

3. در غیر این صورت، اگر در آخرین نسخهٔ React DOM هستید و تأیید کرده‌اید که از نام ویژگی معتبری که در مشخصات ARIA فهرست شده استفاده می‌کنید، لطفاً [یک خطا گزارش دهید](https://github.com/facebook/react/issues/new/choose).
