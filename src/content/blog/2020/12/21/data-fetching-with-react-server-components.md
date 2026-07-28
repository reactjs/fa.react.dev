---
title: "معرفی کامپوننت‌های سرور ری‌اکت (React Server Components) با اندازهٔ باندل صفر"
author: Dan Abramov, Lauren Tan, Joseph Savona, and Sebastian Markbage
date: 2020/12/21
description: 2020 has been a long year. As it comes to an end we wanted to share a special Holiday Update on our research into zero-bundle-size React Server Components.
---

December 21, 2020 by [Dan Abramov](https://bsky.app/profile/danabra.mov), [Lauren Tan](https://twitter.com/potetotes), [Joseph Savona](https://twitter.com/en_JS), and [Sebastian Markbåge](https://twitter.com/sebmarkbage)

---

<Intro>

سال ۲۰۲۰ سالی طولانی بود. وقتی به پایان می‌رسد، دوست داشتیم یک به‌روزرسانی ویژهٔ تعطیلات درباره تحقیقاتمان روی **کامپوننت‌های سرور ری‌اکت (React Server Components)** با اندازهٔ باندل صفر به اشتراک بگذاریم.

</Intro>

---

برای معرفی کامپوننت‌های سرور ری‌اکت، یک سخنرانی و یک دمو آماده کرده‌ایم. اگر مایل هستید، می‌توانید آن‌ها را در طول تعطیلات بررسی کنید، یا بعداً وقتی کار در سال جدید از سر گرفته می‌شود.

<YouTubeIframe src="https://www.youtube.com/embed/TQQPAU21ZUw" />

**کامپوننت‌های سرور ری‌اکت هنوز در مرحلهٔ تحقیق و توسعه هستند.** ما این کار را در راستای شفافیت و برای دریافت بازخورد اولیه از جامعهٔ ری‌اکت به اشتراک می‌گذاریم. زمان زیادی برای این کار وجود خواهد داشت، بنابراین **احساس نکنید که باید همین الان همه چیز را دنبال کنید!**

اگر می‌خواهید آن‌ها را بررسی کنید، توصیه می‌کنیم به ترتیب زیر پیش بروید:

۱. **سخنرانی را تماشا کنید** تا دربارهٔ کامپوننت‌های سرور ری‌اکت بیاموزید و دمو را ببینید.

۲. **[دمو را کلون کنید](http://github.com/reactjs/server-components-demo)** تا با کامپوننت‌های سرور ری‌اکت روی کامپیوتر خودتان کار کنید.

۳. **[RFC را بخوانید (که در انتها سوال‌های متداول دارد)](https://github.com/reactjs/rfcs/pull/188)** برای یک تحلیل فنی عمیق‌تر و ارائهٔ بازخورد.

ما مشتاقانه منتظر شنیدن نظرات شما در RFC یا در پاسخ‌ها به حساب توییتری [@reactjs](https://twitter.com/reactjs) هستیم. تعطیلات خوبی داشته باشید، در امان بمانید و سال دیگر می‌بینیمتان!
