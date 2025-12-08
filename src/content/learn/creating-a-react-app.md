---
title: ایجاد یک اپلیکیشن ری‌اکت
---

<Intro>

اگر می‌خواهید یک اپلیکیشن یا وب‌سایت جدید با ری‌اکت بسازید، توصیه می‌کنیم کار خود را با یک فریم‌ورک شروع کنید.

</Intro>

اگر اپلیکیشن شما محدودیت‌هایی دارد که توسط فریم‌ورک‌های موجود به خوبی پوشش داده نمی‌شوند، یا ترجیح می‌دهید فریم‌ورک خودتان را بسازید، یا فقط می‌خواهید اصول اولیه یک اپلیکیشن ری‌اکت را یاد بگیرید، می‌توانید [یک اپلیکیشن ری‌اکت را از پایه بسازید](/learn/build-a-react-app-from-scratch).

## فریم‌ورک‌های فول‌استک {/*full-stack-frameworks*/}

این فریم‌ورک‌های پیشنهادی از تمام قابلیت‌هایی که برای دیپلوی و مقیاس‌دهی اپلیکیشن خود در محیط پروداکشن نیاز دارید پشتیبانی می‌کنند. آن‌ها جدیدترین قابلیت‌های ری‌اکت را ادغام کرده‌اند و از معماری ری‌اکت بهره می‌برند.

<Note>

#### فریم‌ورک‌های فول‌استک به سرور نیاز ندارند. {/*react-frameworks-do-not-require-a-server*/}

تمام فریم‌ورک‌های معرفی‌شده در این صفحه از رندر سمت کلاینت ([CSR](https://developer.mozilla.org/en-US/docs/Glossary/CSR))، اپلیکیشن‌های تک‌صفحه‌ای ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)) و تولید سایت استاتیک ([SSG](https://developer.mozilla.org/en-US/docs/Glossary/SSG)) پشتیبانی می‌کنند. این اپلیکیشن‌ها می‌توانند بدون نیاز به سرور روی یک [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN) یا سرویس میزبانی استاتیک مستقر شوند. علاوه بر این، این فریم‌ورک‌ها به شما اجازه می‌دهند که در صورت نیاز، رندر سمت سرور را به صورت انتخابی و در سطح هر مسیر اضافه کنید.

این موضوع به شما امکان می‌دهد که کار را با یک اپلیکیشن صرفاً کلاینتی شروع کنید، و اگر نیازهای شما بعداً تغییر کرد، بتوانید برای مسیرهای مشخصی ویژگی‌های سمت سرور را فعال کنید، بدون آنکه نیاز به بازنویسی کل اپلیکیشن داشته باشید. برای پیکربندی استراتژی رندر، به مستندات فریم‌ورک خود مراجعه کنید.

</Note>

### Next.js (App Router) {/*nextjs-app-router*/}

**[App Router در Next.js](https://nextjs.org/docs) یک فریم‌ورک ری‌اکت است که از معماری ری‌اکت به طور کامل بهره می‌برد تا اپلیکیشن‌های فول‌استک ری‌اکت را امکان‌پذیر کند.**


<TerminalBlock>
npx create-next-app@latest
</TerminalBlock>

Next.js توسط [Vercel](https://vercel.com/) نگهداری می‌شود. شما می‌توانید یک [اپلیکیشن Next.js را مستقر کنید](https://nextjs.org/docs/app/building-your-application/deploying) روی هر ارائه‌دهنده‌ی میزبانی که از Node.js یا کانتینرهای Docker پشتیبانی کند، یا روی سرور خودتان. Next.js همچنین از [خروجی استاتیک](https://nextjs.org/docs/app/building-your-application/deploying/static-exports) پشتیبانی می‌کند که به سرور نیازی ندارد.

### React Router (v7) {/*react-router-v7*/}

**[React Router](https://reactrouter.com/start/framework/installation) محبوب‌ترین کتابخانه مسیردهی برای ری‌اکت است و می‌تواند همراه با Vite برای ایجاد یک فریم‌ورک فول‌استک ری‌اکت استفاده شود.** این فریم‌ورک بر استفاده از APIهای استاندارد وب تأکید دارد و چندین [قالب آماده برای استقرار](https://github.com/remix-run/react-router-templates) روی محیط‌ها و پلتفرم‌های مختلف جاوااسکریپت ارائه می‌دهد.

برای ایجاد یک پروژه‌ی جدید فریم‌ورک React Router، دستور زیر را اجرا کنید:

<TerminalBlock>
npx create-react-router@latest
</TerminalBlock>

React Router توسط [Shopify](https://www.shopify.com) نگهداری می‌شود.

### Expo (برای اپلیکیشن‌های نیتیو) {/*expo*/}

**[Expo](https://expo.dev/) یک فریم‌ورک ری‌اکت است که به شما اجازه می‌دهد اپلیکیشن‌های یونیورسال اندروید، iOS و وب را با رابط‌های کاربری واقعاً نیتیو بسازید.** این فریم‌ورک یک SDK برای [React Native](https://reactnative.dev/) فراهم می‌کند که استفاده از بخش‌های نیتیو را ساده‌تر می‌سازد. برای ایجاد یک پروژه‌ی جدید با Expo، دستور زیر را اجرا کنید:

<TerminalBlock>
npx create-expo-app@latest
</TerminalBlock>

اگر در Expo تازه‌کار هستید، [آموزش Expo](https://docs.expo.dev/tutorial/introduction/) را بررسی کنید.

Expo توسط [شرکت Expo](https://expo.dev/about) نگهداری می‌شود. ساخت اپلیکیشن با Expo رایگان است، و شما می‌توانید اپ‌ها را بدون هیچ محدودیتی در فروشگاه‌های Google و Apple منتشر کنید. علاوه بر این، Expo سرویس‌های ابری پولی اختیاری نیز ارائه می‌دهد.


## سایر فریم‌ورک‌ها {/*other-frameworks*/}

فریم‌ورک‌های دیگری نیز وجود دارند که در حال حرکت به سمت چشم‌انداز فول‌استک ری‌اکت هستند:

<<<<<<< HEAD
- [TanStack Start (نسخه بتا)](https://tanstack.com/): فریم‌ورک TanStack Start یک فریم‌ورک فول‌استک ری‌اکت است که توسط TanStack Router پشتیبانی می‌شود. این فریم‌ورک رندر سمت سرور (SSR) کامل، استریمینگ، فانکشن‌های سمت سرور، باندلینگ و امکانات بیشتر را با استفاده از ابزارهایی مانند Nitro و Vite فراهم می‌کند.
- [RedwoodJS](https://redwoodjs.com/): فریم‌ورک Redwood یک فریم‌ورک فول‌استک ری‌اکت است که با تعداد زیادی پکیج و پیکربندی از پیش نصب‌شده ارائه می‌شود و ساخت اپلیکیشن‌های وب فول‌استک را آسان می‌کند.
=======
- [TanStack Start (Beta)](https://tanstack.com/start/): TanStack Start is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more using tools like Nitro and Vite.
- [RedwoodSDK](https://rwsdk.com/): Redwood is a full stack React framework with lots of pre-installed packages and configuration that makes it easy to build full-stack web applications.
>>>>>>> e22544e68d6fffda33332771efe27034739f35a4

<DeepDive>

#### چه ویژگی‌هایی چشم‌انداز معماری فول‌استک تیم ری‌اکت را تشکیل می‌دهند؟ {/*which-features-make-up-the-react-teams-full-stack-architecture-vision*/}

باندلر App Router در Next.js مشخصات رسمی [کامپوننت‌های سمت سرور ری‌اکت](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) را به طور کامل پیاده‌سازی کرده است. این ویژگی به شما اجازه می‌دهد که کامپوننت‌های زمان-بیلد، صرفاً-سمت-سرور، و تعاملی را در یک درخت ری‌اکت ترکیب کنید.

برای مثال، می‌توانید یک کامپوننت صرفاً-سمت-سرور را به صورت یک تابع `async` بنویسید که از پایگاه داده یا یک فایل بخواند. سپس می‌توانید داده‌ها را به کامپوننت‌های تعاملی خود انتقال دهید:

```js
// This component runs *only* on the server (or during the build).
async function Talks({ confId }) {
  // 1. You're on the server, so you can talk to your data layer. API endpoint not required.
  const talks = await db.Talks.findAll({ confId });

  // 2. Add any amount of rendering logic. It won't make your JavaScript bundle larger.
  const videos = talks.map(talk => talk.video);

  // 3. Pass the data down to the components that will run in the browser.
  return <SearchableVideoList videos={videos} />;
}
```

App Router در Next.js همچنین [واکشی داده همراه با Suspense](/blog/2022/03/29/react-v18#suspense-in-data-frameworks) را یکپارچه می‌کند. این ویژگی به شما اجازه می‌دهد برای بخش‌های مختلف رابط کاربری خود، مستقیماً در درخت ری‌اکت حالت بارگذاری (مانند یک اسکلت‌نمایشگر) مشخص کنید:

```js
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

Server Components و Suspense ویژگی‌های خود ری‌اکت هستند، نه Next.js. با این حال، پیاده‌سازی آن‌ها در سطح فریم‌ورک نیازمند همکاری و کار غیرساده‌ای است. در حال حاضر، App Router در Next.js کامل‌ترین پیاده‌سازی این قابلیت‌ها را دارد. تیم ری‌اکت در حال همکاری با توسعه‌دهندگان باندلرها است تا این ویژگی‌ها را در نسل بعدی فریم‌ورک‌ها ساده‌تر کنند.

</DeepDive>

## شروع از صفر {/*start-from-scratch*/}

اگر اپلیکیشن شما محدودیت‌هایی دارد که توسط فریم‌ورک‌های موجود به‌خوبی پشتیبانی نمی‌شوند، یا ترجیح می‌دهید فریم‌ورک مخصوص به خود را بسازید، یا فقط می‌خواهید اصول اولیه یک اپلیکیشن ری‌اکت را یاد بگیرید، گزینه‌های دیگری برای شروع یک پروژه ری‌اکت از صفر وجود دارد.

شروع از صفر انعطاف‌پذیری بیشتری به شما می‌دهد، اما مستلزم آن است که خودتان انتخاب کنید از چه ابزارهایی برای روتینگ، واکشی داده و الگوهای رایج دیگر استفاده کنید. این کار بسیار شبیه ساختن فریم‌ورک خودتان است، به جای استفاده از یک فریم‌ورک آماده. [فریم‌ورک‌هایی که ما توصیه می‌کنیم](#full-stack-frameworks) راه‌حل‌های داخلی برای این مسائل دارند.   

اگر می‌خواهید راه‌حل‌های خودتان را بسازید، به راهنمای ما برای [ساخت یک اپلیکیشن ری‌اکت از صفر](/learn/build-a-react-app-from-scratch) مراجعه کنید تا با نحوه راه‌اندازی یک پروژه ری‌اکت جدید با استفاده از ابزاری مانند [Vite](https://vite.dev/)، [Parcel](https://parceljs.org/) یا [RSbuild](https://rsbuild.dev/) آشنا شوید.

-----

_اگر شما نویسنده یک فریم‌ورک هستید و علاقه‌مندید که نامتان در این صفحه ذکر شود، [به ما اطلاع دهید](https://github.com/reactjs/react.dev/issues/new?assignees=&labels=type%3A+framework&projects=&template=3-framework.yml&title=%5BFramework%5D%3A+)._
