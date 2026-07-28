---
title: "خلاصهٔ React Conf 2024"
author: Ricky Hanlon
date: 2024/05/22
description: Last week we hosted React Conf 2024, a two-day conference in Henderson, Nevada where 700+ attendees gathered in-person to discuss the latest in UI engineering. In this post, we'll summarize the talks and announcements from the event.
---

22 مه 2024 توسط [Ricky Hanlon](https://twitter.com/rickhanlonii).

---

<Intro>

هفتهٔ گذشته میزبان React Conf 2024 بودیم، کنفرانسی دو روزه در هندرسون، نوادا که بیش از 700 شرکت‌کننده به‌صورت حضوری گرد هم آمدند تا دربارهٔ جدیدترین اخبار مهندسی رابط کاربری بحث کنند. این نخستین کنفرانس حضوری ما از سال 2019 بود و هیجان‌زده بودیم که توانستیم جامعه را دوباره گرد هم بیاوریم.

</Intro>

---

در React Conf 2024، ما [React 19 RC](/blog/2024/12/05/react-19)، [بتای معماری جدید React Native](https://github.com/reactwg/react-native-new-architecture/discussions/189) و یک انتشار آزمایشی از [کامپایلر ری‌اکت (React Compiler)](/learn/react-compiler) را اعلام کردیم. جامعه نیز صحنه را در دست گرفت تا [React Router v7](https://remix.run/blog/merging-remix-and-react-router)، [کامپوننت‌های سرور جهان‌شمول (Universal Server Components)](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=20765s) در Expo Router، کامپوننت‌های سرور ری‌اکت در [RedwoodJS](https://redwoodjs.com/blog/rsc-now-in-redwoodjs) و بسیاری موارد دیگر را اعلام کند.

کل استریم‌های [روز اول](https://www.youtube.com/watch?v=T8TZQ6k4SLE) و [روز دوم](https://www.youtube.com/watch?v=0ckOUBiuxVY) به‌صورت آنلاین در دسترس هستند. در این پست، سخنرانی‌ها و اعلامیه‌های رویداد را خلاصه می‌کنیم.

## روز اول {/*day-1*/}

_[استریم کامل روز اول را اینجا ببینید.](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=973s)_

برای آغاز روز اول، CTO متا [Andrew "Boz" Bosworth](https://www.threads.net/@boztank) پیامی خوش‌آمدگویی به اشتراک گذاشت و سپس [Seth Webster](https://twitter.com/sethwebster) — که سازمان ری‌اکت در متا را مدیریت می‌کند — و مجری ما [Ashley Narcisse](https://twitter.com/_darkfadr) معرفی شدند.

در سخنرانی کلیدی روز اول، [Joe Savona](https://twitter.com/en_JS) اهداف و چشم‌انداز ری‌اکت را برای آسان‌سازیِ ساخت تجربه‌های کاربری عالی برای همه به اشتراک گذاشت. [Lauren Tan](https://twitter.com/potetotes) پس از او با «وضعیت ری‌اکت» ادامه داد و اعلام کرد ری‌اکت در سال 2023 بیش از 1 میلیارد بار دانلود شده است و 37% از توسعه‌دهندگان جدید برنامه‌نویسی را با ری‌اکت یاد می‌گیرند. در پایان، کار جامعهٔ ری‌اکت را برجسته کرد که ری‌اکت را به آن چیزی که هست تبدیل کرده است.

برای اطلاعات بیشتر، این سخنرانی‌های جامعه را در ادامهٔ کنفرانس ببینید:

- [Vanilla React](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=5542s) از [Ryan Florence](https://twitter.com/ryanflorence)
- [React Rhythm & Blues](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=12728s) از [Lee Robinson](https://twitter.com/leeerob)
- [RedwoodJS, now with React Server Components](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=26815s) از [Amy Dutton](https://twitter.com/selfteachme)
- [Introducing Universal React Server Components in Expo Router](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=20765s) از [Evan Bacon](https://twitter.com/Baconbrix)

در ادامهٔ سخنرانی کلیدی، [Josh Story](https://twitter.com/joshcstory) و [Andrew Clark](https://twitter.com/acdlite) قابلیت‌های جدید React 19 را به اشتراک گذاشتند و React 19 RC را که آمادهٔ آزمایش در محیط عملیاتی است اعلام کردند. همهٔ قابلیت‌ها را در [پست انتشار React 19](/blog/2024/12/05/react-19) ببینید، و برای بررسی عمیق قابلیت‌های جدید این سخنرانی‌ها را ببینید:

- [What's new in React 19](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=8880s) از [Lydia Hallie](https://twitter.com/lydiahallie)
- [React Unpacked: A Roadmap to React 19](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=10112s) از [Sam Selikoff](https://twitter.com/samselikoff)
- [React 19 Deep Dive: Coordinating HTML](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=24916s) از [Josh Story](https://twitter.com/joshcstory)
- [Enhancing Forms with React Server Components](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=25280s) از [Aurora Walberg Scharff](https://twitter.com/aurorascharff)
- [React for Two Computers](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=18825s) از [Dan Abramov](https://bsky.app/profile/danabra.mov)
- [And Now You Understand React Server Components](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=11256s) از [Kent C. Dodds](https://twitter.com/kentcdodds)

در نهایت، سخنرانی کلیدی را با [Joe Savona](https://twitter.com/en_JS)، [Sathya Gunasekaran](https://twitter.com/_gsathya) و [Mofei Zhang](https://twitter.com/zmofei) به پایان رساندیم که اعلام کردند کامپایلر ری‌اکت اکنون [متن‌باز](https://github.com/facebook/react/pull/29061) شده است و یک نسخهٔ آزمایشی از کامپایلر ری‌اکت را برای امتحان به اشتراک گذاشتند.

برای اطلاعات بیشتر دربارهٔ استفاده از کامپایلر و نحوهٔ کار آن، [مستندات](/learn/react-compiler) و این سخنرانی‌ها را ببینید:

- [Forget About Memo](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=12020s) از [Lauren Tan](https://twitter.com/potetotes)
- [React Compiler Deep Dive](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=9313s) از [Sathya Gunasekaran](https://twitter.com/_gsathya) و [Mofei Zhang](https://twitter.com/zmofei)

کل سخنرانی کلیدی روز اول را اینجا ببینید:

<YouTubeIframe src="https://www.youtube.com/embed/T8TZQ6k4SLE?t=973s" />

## روز دوم {/*day-2*/}

_[استریم کامل روز دوم را اینجا ببینید.](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=1720s)_

برای آغاز روز دوم، [Seth Webster](https://twitter.com/sethwebster) پیامی خوش‌آمدگویی به اشتراک گذاشت، سپس تشکر از [Eli White](https://x.com/Eli_White) و معرفی توسط افسر ارشد ویبز (Vibes) ما [Ashley Narcisse](https://twitter.com/_darkfadr) انجام شد.

در سخنرانی کلیدی روز دوم، [Nicola Corti](https://twitter.com/cortinico) وضعیت React Native را به اشتراک گذاشت، از جمله 78 میلیون دانلود در سال 2023. او همچنین اپلیکیشن‌هایی که از React Native استفاده می‌کنند را برجسته کرد، از جمله بیش از 2000 صفحه استفاده‌شده در داخل متا؛ صفحهٔ جزئیات محصول در Facebook Marketplace که روزانه بیش از 2 میلیارد بار بازدید می‌شود؛ و بخشی از منوی استارت Microsoft Windows و برخی قابلیت‌ها در تقریباً هر محصول Microsoft Office در موبایل و دسکتاپ.

نیکولا همچنین تمام کاری را که جامعه برای پشتیبانی از React Native انجام می‌دهد — از جمله کتابخانه‌ها، فریم‌ورک‌ها و پلتفرم‌های متعدد — برجسته کرد. برای اطلاعات بیشتر، این سخنرانی‌های جامعه را ببینید:

- [Extending React Native beyond Mobile and Desktop Apps](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=5798s) از [Chris Traganos](https://twitter.com/chris_trag) و [Anisha Malde](https://twitter.com/anisha_malde)
- [Spatial computing with React](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=22525s) از [Michał Pierzchała](https://twitter.com/thymikee)

[Riccardo Cipolleschi](https://twitter.com/cipolleschir) سخنرانی کلیدی روز دوم را با اعلام اینکه معماری جدید React Native اکنون در فاز بتا است و آمادهٔ پذیرش در اپلیکیشن‌های عملیاتی است ادامه داد. او قابلیت‌ها و بهبودهای جدید در معماری جدید را به اشتراک گذاشت و نقشهٔ راه آیندهٔ React Native را بیان کرد. برای اطلاعات بیشتر ببینید:

- [Cross Platform React](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=26569s) از [Olga Zinoveva](https://github.com/SlyCaptainFlint) و [Naman Goel](https://twitter.com/naman34)

در ادامهٔ سخنرانی کلیدی، نیکولا اعلام کرد که اکنون برای همهٔ اپلیکیشن‌های جدید ایجادشده با React Native توصیه می‌کنیم با فریم‌ورکی مانند Expo آغاز کنید. همراه با این تغییر، او صفحهٔ اصلی جدید React Native و مستندات جدید شروع‌به‌کار را نیز اعلام کرد. می‌توانید راهنمای جدید شروع‌به‌کار را در [مستندات React Native](https://reactnative.dev/docs/next/environment-setup) ببینید.

در نهایت، برای پایان سخنرانی کلیدی، [Kadi Kraman](https://twitter.com/kadikraman) آخرین قابلیت‌ها و بهبودهای Expo و نحوهٔ شروع توسعه با React Native با استفاده از Expo را به اشتراک گذاشت.

کل سخنرانی کلیدی روز دوم را اینجا ببینید:

<YouTubeIframe src="https://www.youtube.com/embed/0ckOUBiuxVY?t=1720s" />

## پرسش و پاسخ {/*q-and-a*/}

تیم‌های ری‌اکت و React Native نیز هر روز را با یک جلسهٔ پرسش و پاسخ به پایان رساندند:

- [React Q&A](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=27518s) با میزبانی [Michael Chan](https://twitter.com/chantastic)
- [React Native Q&A](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=27935s) با میزبانی [Jamon Holmgren](https://twitter.com/jamonholmgren)

## و بیشتر... {/*and-more*/}

ما همچنین سخنرانی‌هایی دربارهٔ دسترس‌پذیری، گزارش خطا، CSS و موارد دیگر شنیدیم:

- [Demystifying accessibility in React apps](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=20655s) از [Kateryna Porshnieva](https://twitter.com/krambertech)
- [Pigment CSS, CSS in the server component age](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=21696s) از [Olivier Tassinari](https://twitter.com/olivtassinari)
- [Real-time React Server Components](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=24070s) از [Sunil Pai](https://twitter.com/threepointone)
- [Let's break React Rules](https://www.youtube.com/watch?v=T8TZQ6k4SLE&t=25862s) از [Charlotte Isambert](https://twitter.com/c_isambert)
- [Solve 100% of your errors](https://www.youtube.com/watch?v=0ckOUBiuxVY&t=19881s) از [Ryan Albrecht](https://github.com/ryan953)

## سپاسگزاریم {/*thank-you*/}

از همهٔ کارکنان، سخنرانان و شرکت‌کنندگانی که React Conf 2024 را ممکن کردند سپاسگزاریم. افراد بیش از حدی برای فهرست‌کردن وجود دارند، اما می‌خواهیم از چند نفر به‌طور خاص تشکر کنیم.

از [Barbara Markiewicz](https://twitter.com/barbara_markie)، تیم [Callstack](https://www.callstack.com/) و [Matt Carroll](https://twitter.com/mattcarrollcode) — مدیر حمایت توسعه‌دهندگان تیم ری‌اکت — برای کمک به برنامه‌ریزی کل رویداد سپاسگزاریم؛ و از [Sunny Leggett](https://zeroslopeevents.com/about) و همه از [Zero Slope](https://zeroslopeevents.com) برای کمک به سازماندهی رویداد.

از [Ashley Narcisse](https://twitter.com/_darkfadr) به‌خاطر مجری‌گری و افسر ارشد ویبز بودن سپاسگزاریم؛ و از [Michael Chan](https://twitter.com/chantastic) و [Jamon Holmgren](https://twitter.com/jamonholmgren) برای میزبانی جلسات پرسش و پاسخ.

از [Seth Webster](https://twitter.com/sethwebster) و [Eli White](https://x.com/Eli_White) به‌خاطر خوش‌آمدگویی هر روز و ارائهٔ جهت برای ساختار و محتوا سپاسگزاریم؛ و از [Tom Occhino](https://twitter.com/tomocchino) به‌خاطر پیوستن به ما با پیامی ویژه در جشن پایانی.

از [Ricky Hanlon](https://www.youtube.com/watch?v=FxTZL2U-uKg&t=1263s) به‌خاطر ارائهٔ بازخورد دقیق روی سخنرانی‌ها، کار روی طراحی اسلایدها و به‌طور کلی پر کردن شکاف‌ها و توجه به جزئیات سپاسگزاریم.

از [Callstack](https://www.callstack.com/) به‌خاطر ساخت وب‌سایت کنفرانس؛ و از [Kadi Kraman](https://twitter.com/kadikraman) و تیم [Expo](https://expo.dev/) به‌خاطر ساخت اپلیکیشن موبایل کنفرانس سپاسگزاریم.

از همهٔ حامیانی که این رویداد را ممکن کردند سپاسگزاریم: [Remix](https://remix.run/)، [Amazon](https://developer.amazon.com/apps-and-games?cmp=US_2024_05_3P_React-Conf-2024&ch=prtnr&chlast=prtnr&pub=ref&publast=ref&type=org&typelast=org)، [MUI](https://mui.com/)، [Sentry](https://sentry.io/for/react/?utm_source=sponsored-conf&utm_medium=sponsored-event&utm_campaign=frontend-fy25q2-evergreen&utm_content=logo-reactconf2024-learnmore)، [Abbott](https://www.jobs.abbott/software)، [Expo](https://expo.dev/)، [RedwoodJS](https://redwoodjs.com/) و [Vercel](https://vercel.com).

از تیم AV به‌خاطر تصاویر، صحنه و صدا؛ و از هتل Westin به‌خاطر میزبانی ما سپاسگزاریم.

از همهٔ سخنرانانی که دانش و تجربیات خود را با جامعه به اشتراک گذاشتند سپاسگزاریم.

در نهایت، از همهٔ کسانی که به‌صورت حضوری و آنلاین شرکت کردند تا نشان دهند چه چیزی ری‌اکت را به ری‌اکت تبدیل می‌کند سپاسگزاریم. ری‌اکت فراتر از یک کتابخانه است، یک جامعه است، و الهام‌بخش بود که ببینیم همه گرد هم می‌آیند تا با هم به اشتراک بگذارند و یاد بگیرند.

تا دفعهٔ بعد!

