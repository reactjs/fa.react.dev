---
title: "کامپایلر ری‌اکت RC"
author: Lauren Tan and Mofei Zhang
date: 2025/04/21
description: We are releasing the compiler's first Release Candidate (RC) today.

---

21 آوریل 2025 توسط [Lauren Tan](https://x.com/potetotes) و [Mofei Zhang](https://x.com/zmofei).

---

<Intro>

تیم ری‌اکت هیجان‌زده است که به‌روزرسانی‌های جدیدی را به اشتراک بگذارد:

</Intro>

1. ما امروز کامپایلر ری‌اکت RC را در آماده‌سازی برای انتشار پایدار کامپایلر منتشر می‌کنیم.
2. ما `eslint-plugin-react-compiler` را با `eslint-plugin-react-hooks` ادغام می‌کنیم.
3. ما پشتیبانی از swc را اضافه کرده‌ایم و با oxc برای پشتیبانی از ساخت‌های بدون Babel همکاری می‌کنیم.

---

[کامپایلر ری‌اکت (React Compiler)](https://react.dev/learn/react-compiler) ابزاری در زمان build است که اپلیکیشن ری‌اکت شما را از طریق مموری‌زیشن خودکار بهینه می‌کند. سال گذشته، ما [بتای اول](https://react.dev/blog/2024/10/21/react-compiler-beta-release) کامپایلر ری‌اکت را منتشر کردیم و بازخورد و مشارکت‌های زیادی دریافت کردیم. ما از دستاوردهایی که از کسانی که کامپایلر را پذیرفته‌اند دیده‌ایم هیجان‌زده‌ایم (به مطالعات موردی از [Sanity Studio](https://github.com/reactwg/react-compiler/discussions/33) و [Wakelet](https://github.com/reactwg/react-compiler/discussions/52) نگاه کنید) و به سوی یک انتشار پایدار کار می‌کنیم.

ما امروز نخستین Release Candidate (RC) کامپایلر را منتشر می‌کنیم. RC در نظر گرفته شده تا نسخه‌ای پایدار و نزدیک به نهایی از کامپایلر باشد، و برای امتحان در محیط عملیاتی امن است.

## کامپایلر ری‌اکت RC را امروز استفاده کنید {/*use-react-compiler-rc-today*/}
برای نصب RC:

npm
<TerminalBlock>
{`npm install --save-dev --save-exact babel-plugin-react-compiler@rc`}
</TerminalBlock>

pnpm
<TerminalBlock>
{`pnpm add --save-dev --save-exact babel-plugin-react-compiler@rc`}
</TerminalBlock>

yarn
<TerminalBlock>
{`yarn add --dev --exact babel-plugin-react-compiler@rc`}
</TerminalBlock>

به‌عنوان بخشی از RC، ما کار با کامپایلر ری‌اکت را برای افزودن به پروژه‌های شما آسان‌تر کرده‌ایم و بهینه‌سازی‌هایی به نحوهٔ تولید مموری‌زیشن توسط کامپایلر افزوده‌ایم. کامپایلر ری‌اکت اکنون از optional chainها و اندیس‌های آرایه به‌عنوان وابستگی پشتیبانی می‌کند. ما در حال کاوش هستیم که چگونه وابستگی‌های بیشتری مانند بررسی‌های برابری و درج رشته‌ای را استنتاج کنیم. این بهبودها در نهایت منجر به رندر مجدد کمتر و رابط‌های کاربری پاسخگوتر می‌شود.

ما همچنین از جامعه شنیده‌ایم که اعتبارسنجی ref-in-render گاهی مثبت کاذب دارد. از آنجا که به‌عنوان یک فلسفهٔ کلی می‌خواهیم بتوانید به‌طور کامل به پیام‌های خطا و راهنمایی‌های کامپایلر اعتماد کنید، ما آن را برای اکنون به‌طور پیش‌فرض غیرفعال می‌کنیم. ما به کار برای بهبود این اعتبارسنجی ادامه خواهیم داد، و آن را در یک انتشار بعدی دوباره فعال خواهیم کرد.

می‌توانید جزئیات بیشتر دربارهٔ استفاده از کامپایلر را در [مستندات ما](https://react.dev/learn/react-compiler) بیابید.

## بازخورد {/*feedback*/}
در دورهٔ RC، ما همهٔ کاربران ری‌اکت را تشویق می‌کنیم کامپایلر را امتحان کنند و در مخزن ری‌اکت بازخورد ارائه دهند. لطفاً در صورت مواجهه با هرگونه باگ یا رفتار غیرمنتظره، [یک issue باز کنید](https://github.com/facebook/react/issues). اگر سؤال یا پیشنهاد عمومی دارید، لطفاً آن‌ها را در [گروه کاری کامپایلر ری‌اکت](https://github.com/reactwg/react-compiler/discussions) ارسال کنید.

## سازگاری با گذشته {/*backwards-compatibility*/}
همان‌طور که در اعلام بتا ذکر شد، کامپایلر ری‌اکت با React 17 و بالاتر سازگار است. اگر هنوز روی React 19 نیستید، می‌توانید با مشخص‌کردن یک target حداقل در پیکربندی کامپایلر، و افزودن `react-compiler-runtime` به‌عنوان یک وابستگی، از کامپایلر ری‌اکت استفاده کنید. می‌توانید مستندات این را [اینجا](https://react.dev/learn/react-compiler#using-react-compiler-with-react-17-or-18) بیابید.

## مهاجرت از eslint-plugin-react-compiler به eslint-plugin-react-hooks {/*migrating-from-eslint-plugin-react-compiler-to-eslint-plugin-react-hooks*/}
اگر از قبل eslint-plugin-react-compiler را نصب کرده‌اید، اکنون می‌توانید آن را حذف کرده و از `eslint-plugin-react-hooks@rc` استفاده کنید. بسیار سپاسگزاریم از [@michaelfaith](https://bsky.app/profile/michael.faith) برای مشارکت در این بهبود!

برای نصب:

npm
<TerminalBlock>
{`npm install --save-dev eslint-plugin-react-hooks@rc`}
</TerminalBlock>

pnpm
<TerminalBlock>
{`pnpm add --save-dev eslint-plugin-react-hooks@rc`}
</TerminalBlock>

yarn
<TerminalBlock>
{`yarn add --dev eslint-plugin-react-hooks@rc`}
</TerminalBlock>

```js
// eslint.config.js
import * as reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Flat Config (eslint 9+)
  reactHooks.configs.recommended,

  // Legacy Config
  reactHooks.configs['recommended-latest']
];
```

برای فعال‌کردن قاعدهٔ کامپایلر ری‌اکت، `'react-hooks/react-compiler': 'error'` را به پیکربندی ESLint خود اضافه کنید.

لینتر نیازی به نصب‌بودن کامپایلر ندارد، بنابراین هیچ خطری در ارتقای eslint-plugin-react-hooks وجود ندارد. ما به همه توصیه می‌کنیم امروز ارتقا یابند.

## پشتیبانی از swc (آزمایشی) {/*swc-support-experimental*/}
کامپایلر ری‌اکت می‌تواند روی [چندین ابزار build](/learn/react-compiler#installation) مانند Babel، Vite و Rsbuild نصب شود.

علاوه بر آن ابزارها، ما با Kang Dongyoon ([@kdy1dev](https://x.com/kdy1dev)) از تیم [swc](https://swc.rs/) برای افزودن پشتیبانی اضافی از کامپایلر ری‌اکت به‌عنوان یک افزونهٔ swc همکاری کرده‌ایم. در حالی که این کار هنوز تمام نشده، عملکرد build Next.js اکنون باید به‌طور قابل‌توجه سریع‌تر باشد وقتی [کامپایلر ری‌اکت در اپلیکیشن Next.js شما فعال است](https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler).

ما توصیه می‌کنیم برای بهترین عملکرد build از Next.js [15.3.1](https://github.com/vercel/next.js/releases/tag/v15.3.1) یا بالاتر استفاده کنید.

کاربران Vite می‌توانند به استفاده از [vite-plugin-react](https://github.com/vitejs/vite-plugin-react) برای فعال‌سازی کامپایلر، با افزودن آن به‌عنوان یک [افزونهٔ Babel](https://react.dev/learn/react-compiler#usage-with-vite) ادامه دهند. ما همچنین با تیم [oxc](https://oxc.rs/) برای [افزودن پشتیبانی از کامپایلر](https://github.com/oxc-project/oxc/issues/10048) کار می‌کنیم. هنگامی که [rolldown](https://github.com/rolldown/rolldown) به‌طور رسمی منتشر و در Vite پشتیبانی شد و پشتیبانی oxc برای کامپایلر ری‌اکت اضافه شد، ما مستندات را با اطلاعاتی دربارهٔ نحوهٔ مهاجرت به‌روزرسانی خواهیم کرد.

## ارتقای کامپایلر ری‌اکت {/*upgrading-react-compiler*/}
کامپایلر ری‌اکت زمانی بهترین کار را می‌کند که مموری‌زیشن خودکار اعمال‌شده صرفاً برای عملکرد باشد. نسخه‌های آتی کامپایلر ممکن است نحوهٔ اعمال مموری‌زیشن را تغییر دهند، برای مثال ممکن است دانه‌دانه‌تر و دقیق‌تر شود.

با این حال، از آنجا که کد محصول گاهی ممکن است [قواعد ری‌اکت](https://react.dev/reference/rules) را به روش‌هایی که همیشه در جاوااسکریپت به‌صورت استاتیک قابل‌تشخیص نیست بشکند، تغییر مموری‌زیشن گهگاه می‌تواند نتایج غیرمنتظره‌ای داشته باشد. برای مثال، یک مقدار از قبل مموری‌شده ممکن است به‌عنوان یک وابستگی برای یک useEffect جایی در درخت کامپوننت استفاده شود. تغییر نحوه یا اینکه آیا این مقدار مموری‌زیشن می‌شود یا خیر، می‌تواند باعث اجرای بیش از حد یا کمتر از حدِ آن useEffect شود. در حالی که ما [useEffect را فقط برای همگام‌سازی توصیه می‌کنیم](https://react.dev/learn/synchronizing-with-effects)، پایگاه کد شما ممکن است useEffectهایی داشته باشد که موارد استفادهٔ دیگری را پوشش می‌دهد، مانند افکت‌هایی که باید فقط در پاسخ به تغییر مقادیر خاص اجرا شوند.

به‌عبارت دیگر، تغییر مموری‌زیشن ممکن است در شرایط نادر باعث رفتار غیرمنتظره شود. به همین دلیل، ما توصیه می‌کنیم از قواعد ری‌اکت پیروی کنید و آزمون سرتاسری مداوم اپلیکیشن خود را به کار ببرید تا بتوانید با اطمینان کامپایلر را ارتقا دهید و هرگونه نقض قواعد ری‌اکت که ممکن است باعث مشکلات شود را شناسایی کنید.

اگر پوشش آزمون خوبی ندارید، ما توصیه می‌کنیم کامپایلر را به یک نسخهٔ دقیق (مثلاً `19.1.0`) به‌جای یک بازهٔ SemVer (مثلاً `^19.1.0`) پین کنید. می‌توانید این کار را با ارسال flagهای `--save-exact` (npm/pnpm) یا `--exact` (yarn) هنگام ارتقای کامپایلر انجام دهید. سپس باید هر ارتقای کامپایلر را به‌صورت دستی انجام دهید، با توجه به بررسی اینکه اپلیکیشن شما همچنان به‌درستی کار می‌کند.

## نقشهٔ راه به سوی پایدار {/*roadmap-to-stable*/}
*این یک نقشهٔ راه نهایی نیست و ممکن است تغییر کند.*

پس از یک دورهٔ دریافت بازخورد نهایی از جامعه روی RC، ما انتشار پایدار کامپایلر را برنامه‌ریزی می‌کنیم.

* ✅ آزمایشی (Experimental): در React Conf 2024 منتشر شد، عمدتاً برای بازخورد از توسعه‌دهندگان اپلیکیشن.
* ✅ بتای عمومی (Public Beta): از امروز در دسترس، برای بازخورد از نویسندگان کتابخانه.
* ✅ Release Candidate (RC): کامپایلر ری‌اکت برای اکثریت اپلیکیشن‌ها و کتابخانه‌های پیرو قاعده بدون مشکل کار می‌کند.
* General Availability: پس از دورهٔ بازخورد نهایی از جامعه.

پس از انتشار پایدار، ما قصد داریم بهینه‌سازی‌ها و بهبودهای بیشتری به کامپایلر اضافه کنیم. این شامل هم بهبودهای مستمر مموری‌زیشن خودکار، و هم بهینه‌سازی‌های کاملاً جدید با حداقل یا بدون تغییر در کد محصول می‌شود. هر ارتقا به بهبود عملکرد و مدیریت بهتر الگوهای متنوع جاوااسکریپت و ری‌اکت ادامه خواهد داد.

---

از [Joe Savona](https://x.com/en_JS)، [Jason Bonta](https://x.com/someextent)، [Jimmy Lai](https://x.com/feedthejim) و [Kang Dongyoon](https://x.com/kdy1dev) (@kdy1dev) برای بازبینی و ویرایش این پست سپاسگزاریم.
