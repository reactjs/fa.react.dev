---
title: "مرور React Conf 2021"
author: Jesslyn Tannady and Rick Hanlon
date: 2021/12/17
description: Last week we hosted our 6th React Conf. In previous years, we've used the React Conf stage to deliver industry changing announcements such as React Native and React Hooks. This year, we shared our multi-platform vision for React, starting with the release of React 18 and gradual adoption of concurrent features.
---

December 17, 2021 by [Jesslyn Tannady](https://twitter.com/jtannady) and [Rick Hanlon](https://twitter.com/rickhanlonii)

---

<Intro>

هفتهٔ گذشته میزبان ششمین React Conf بودیم. در سال‌های گذشته، از صحنهٔ React Conf برای ارائهٔ اعلامیه‌های تغییردهندهٔ صنعت مانند [_React Native_](https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/) و [_React Hooks_](https://reactjs.org/docs/hooks-intro.html) استفاده کرده‌ایم. امسال، چشم‌انداز چندسکویی خود برای ری‌اکت را به اشتراک گذاشتیم، که با انتشار React 18 و پذیرش تدریجی قابلیت‌های همزمان آغاز می‌شود.

</Intro>

---

این اولین بار بود که React Conf به‌صورت آنلاین برگزار می‌شد، و به‌صورت رایگان پخش شد و به ۸ زبان مختلف ترجمه شد. شرکت‌کنندگانی از سراسر جهان به دیسکورد کنفرانس ما و رویداد پخش مجدد برای دسترسی‌پذیری در همهٔ مناطق زمانی پیوستند. بیش از ۵۰٬۰۰۰ نفر ثبت‌نام کردند، با بیش از ۶۰٬۰۰۰ بازدید از ۱۹ سخنرانی، و ۵٬۰۰۰ شرکت‌کننده در دیسکورد در طول هر دو رویداد.

تمام سخنرانی‌ها [برای پخش آنلاین در دسترس هستند](https://www.youtube.com/watch?v=FZ0cG47msEk&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa).

در اینجا خلاصه‌ای از آنچه در صحنه به اشتراک گذاشته شد آمده است:

## React 18 و قابلیت‌های همزمان {/*react-18-and-concurrent-features*/}

در سخنرانی اصلی، چشم‌انداز خود برای آیندهٔ ری‌اکت را که با React 18 آغاز می‌شود به اشتراک گذاشتیم.

React 18 رندرر همزمان (Concurrent) مورد انتظار و به‌روزرسانی‌های ساسپنس (Suspense) را بدون هیچ تغییر عمدهٔ شکستن‌کننده‌ای اضافه می‌کند. برنامه‌ها می‌توانند به React 18 ارتقا یابند و شروع به پذیرش تدریجی قابلیت‌های همزمان کنند با میزان تلاشی هم‌تراز با هر انتشار عمدهٔ دیگر.

**این بدان معنا است که حالت همزمان (concurrent mode) وجود ندارد، فقط قابلیت‌های همزمان (concurrent features).**

در سخنرانی اصلی، ما همچنین چشم‌انداز خود را برای ساسپنس (Suspense)، کامپوننت‌های سرور (Server Components)، گروه‌های کاری جدید ری‌اکت و چشم‌انداز بلندمدت چندسکویی خود برای React Native به اشتراک گذاشتیم.

سخنرانی اصلی کامل را از [Andrew Clark](https://twitter.com/acdlite)، [Juan Tejada](https://twitter.com/_jstejada)، [Lauren Tan](https://twitter.com/potetotes) و [Rick Hanlon](https://twitter.com/rickhanlonii) اینجا تماشا کنید:

<YouTubeIframe src="https://www.youtube.com/embed/FZ0cG47msEk" />

## React 18 برای توسعه‌دهندگان برنامه‌های کاربری {/*react-18-for-application-developers*/}

در سخنرانی اصلی، ما همچنین اعلام کردیم که React 18 RC اکنون برای امتحان در دسترس است. مشروط به دریافت بازخورد بیشتر، این دقیقاً همان نسخه‌ای از ری‌اکت است که اوایل سال آینده به‌صورت پایدار منتشر خواهیم کرد.

برای امتحان کردن React 18 RC، وابستگی‌های خود را ارتقا دهید:

```bash
npm install react@rc react-dom@rc
```

و به API جدید `createRoot` سوییچ کنید:

```js
// before
const container = document.getElementById('root');
ReactDOM.render(<App />, container);

// after
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);
```

برای یک دمو از ارتقا به React 18، به سخنرانی [Shruti Kapoor](https://twitter.com/shrutikapoor08) اینجا نگاهی بیندازید:

<YouTubeIframe src="https://www.youtube.com/embed/ytudH8je5ko" />

## رندر سرور استریمی با ساسپنس {/*streaming-server-rendering-with-suspense*/}

React 18 همچنین شامل بهبودهایی در کارایی رندر سمت سرور با استفاده از ساسپنس (Suspense) است.

رندر سرور استریمی به شما اجازه می‌دهد HTML را از کامپوننت‌های ری‌اکت روی سرور تولید کنید، و آن HTML را به کاربران خود استریم کنید. در React 18، می‌توانید از `Suspense` استفاده کنید تا برنامه‌تان را به واحدهای مستقل کوچک‌تری تقسیم کنید که می‌توانند مستقل از یکدیگر و بدون مسدود کردن بقیهٔ برنامه استریم شوند. این بدان معناست که کاربران محتوای شما را زودتر خواهند دید و می‌توانند خیلی سریع‌تر شروع به تعامل با آن کنند.

برای یک بررسی عمیق، به سخنرانی [Shaundai Person](https://twitter.com/shaundai) اینجا نگاهی بیندازید:

<YouTubeIframe src="https://www.youtube.com/embed/pj5N-Khihgc" />

## اولین گروه کاری ری‌اکت {/*the-first-react-working-group*/}

برای React 18، اولین گروه کاری خود را برای همکاری با گروهی از متخصصان، توسعه‌دهندگان، نگهداران کتابخانه‌ها و مدرسان ایجاد کردیم. ما با هم استراتژی پذیرش تدریجی خود را ایجاد کردیم و APIهای جدیدی مانند `useId`، `useSyncExternalStore` و `useInsertionEffect` را اصلاح کردیم.

برای یک مرور از این کار، به سخنرانی [Aakansha' Doshi](https://twitter.com/aakansha1216) نگاهی بیندازید:

<YouTubeIframe src="https://www.youtube.com/embed/qn7gRClrC9U" />

## ابزار توسعه‌دهندهٔ ری‌اکت {/*react-developer-tooling*/}

برای پشتیبانی از قابلیت‌های جدید در این انتشار، ما همچنین تیم تازه‌تشکیل‌شدهٔ React DevTools و یک Timeline Profiler جدید را برای کمک به توسعه‌دهندگان در دیباگ برنامه‌های ری‌اکتشان اعلام کردیم.

برای اطلاعات بیشتر و دمویی از قابلیت‌های جدید DevTools، به سخنرانی [Brian Vaughn](https://twitter.com/brian_d_vaughn) نگاهی بیندازید:

<YouTubeIframe src="https://www.youtube.com/embed/oxDfrke8rZg" />

## ری‌اکت بدون ممو {/*react-without-memo*/}

با نگاهی به آیندهٔ دورتر، [Xuan Huang (黄玄)](https://twitter.com/Huxpro) به‌روزرسانی‌ای از تحقیقات React Labs ما درباره یک کامپایلر مموری‌زیشن خودکار به اشتراک گذاشت. برای اطلاعات بیشتر و دمویی از نمونهٔ اولیهٔ کامپایلر، به این سخنرانی نگاهی بیندازید:

<YouTubeIframe src="https://www.youtube.com/embed/lGEMwh32soc" />

## سخنرانی اصلی مستندات ری‌اکت {/*react-docs-keynote*/}

[Rachel Nabors](https://twitter.com/rachelnabors) بخشی از سخنرانی‌ها درباره یادگیری و طراحی با ری‌اکت را با سخنرانی اصلی درباره سرمایه‌گذاری ما در مستندات جدید ری‌اکت ([که اکنون به‌عنوان react.dev منتشر شده](/blog/2023/03/16/introducing-react-dev)) آغاز کرد:

<YouTubeIframe src="https://www.youtube.com/embed/mneDaMYOKP8" />

## و بیشتر... {/*and-more*/}

**ما همچنین سخنرانی‌هایی درباره یادگیری و طراحی با ری‌اکت شنیدیم:**

* Debbie O'Brien: [چیزهایی که از مستندات جدید ری‌اکت یاد گرفتم](https://youtu.be/-7odLW_hG7s).
* Sarah Rainsberger: [یادگیری در مرورگر](https://youtu.be/5X-WEQflCL0).
* Linton Ye: [بازگشت سرمایهٔ طراحی با ری‌اکت](https://youtu.be/7cPWmID5XAk).
* Delba de Oliveira: [زمین‌بازی‌های تعاملی با ری‌اکت](https://youtu.be/zL8cz2W0z34).

**سخنرانی‌هایی از تیم‌های Relay، React Native و PyTorch:**

* Robert Balicki: [معرفی دوبارهٔ Relay](https://youtu.be/lhVGdErZuN4).
* Eric Rozell و Steven Moyes: [React Native Desktop](https://youtu.be/9L4FFrvwJwY).
* Roman Rädle: [یادگیری ماشین روی‌دستگاه برای React Native](https://youtu.be/NLj73vrc2I8)

**و سخنرانی‌هایی از جامعه درباره دسترسی‌پذیری، ابزارها و کامپوننت‌های سرور:**

* Daishi Kato: [React 18 برای کتابخانه‌های استور خارجی](https://youtu.be/oPfSC5bQPR8).
* Diego Haz: [ساختن کامپوننت‌های دسترسی‌پذیر در React 18](https://youtu.be/dcm8fjBfro8).
* Tafu Nakazaki: [کامپوننت‌های فرم ژاپنی دسترسی‌پذیر با ری‌اکت](https://youtu.be/S4a0QlsH0pU).
* Lyle Troxell: [ابزارهای رابط کاربری برای هنرمندان](https://youtu.be/b3l4WxipFsE).
* Helen Lin: [Hydrogen + React 18](https://youtu.be/HS6vIYkSNks).

## از شما سپاسگزاریم {/*thank-you*/}

این اولین سالی بود که خودمان کنفرانسی را برنامه‌ریزی می‌کردیم، و افراد زیادی هستند که باید از آن‌ها تشکر کنیم.

اول، از همهٔ سخنرانانمان سپاسگزاریم: [Aakansha Doshi](https://twitter.com/aakansha1216)، [Andrew Clark](https://twitter.com/acdlite)، [Brian Vaughn](https://twitter.com/brian_d_vaughn)، [Daishi Kato](https://twitter.com/dai_shi)، [Debbie O'Brien](https://twitter.com/debs_obrien)، [Delba de Oliveira](https://twitter.com/delba_oliveira)، [Diego Haz](https://twitter.com/diegohaz)، [Eric Rozell](https://twitter.com/EricRozell)، [Helen Lin](https://twitter.com/wizardlyhel)، [Juan Tejada](https://twitter.com/_jstejada)، [Lauren Tan](https://twitter.com/potetotes)، [Linton Ye](https://twitter.com/lintonye)، [Lyle Troxell](https://twitter.com/lyle)، [Rachel Nabors](https://twitter.com/rachelnabors)، [Rick Hanlon](https://twitter.com/rickhanlonii)، [Robert Balicki](https://twitter.com/StatisticsFTW)، [Roman Rädle](https://twitter.com/raedle)، [Sarah Rainsberger](https://twitter.com/sarah11918)، [Shaundai Person](https://twitter.com/shaundai)، [Shruti Kapoor](https://twitter.com/shrutikapoor08)، [Steven Moyes](https://twitter.com/moyessa)، [Tafu Nakazaki](https://twitter.com/hawaiiman0) و [Xuan Huang (黄玄)](https://twitter.com/Huxpro).

از همه کسانی که در ارائهٔ بازخورد درباره سخنرانی‌ها کمک کردند سپاسگزاریم، از جمله [Andrew Clark](https://twitter.com/acdlite)، [Dan Abramov](https://bsky.app/profile/danabra.mov)، [Dave McCabe](https://twitter.com/mcc_abe)، [Eli White](https://twitter.com/Eli_White)، [Joe Savona](https://twitter.com/en_JS)، [Lauren Tan](https://twitter.com/potetotes)، [Rachel Nabors](https://twitter.com/rachelnabors) و [Tim Yung](https://twitter.com/yungsters).

از [Lauren Tan](https://twitter.com/potetotes) برای راه‌اندازی دیسکورد کنفرانس و خدمت به‌عنوان مدیر دیسکورد ما سپاسگزاریم.

از [Seth Webster](https://twitter.com/sethwebster) برای بازخورد درباره جهت‌گیری کلی و اطمینان از تمرکز ما بر تنوع و شمول سپاسگزاریم.

از [Rachel Nabors](https://twitter.com/rachelnabors) برای پیشگامی در تلاش مدیریت ما، و از [Aisha Blake](https://twitter.com/AishaBlake) برای ایجاد راهنمای مدیریت ما، رهبری تیم مدیریت ما، آموزش مترجمان و مدیران، و کمک به مدیریت هر دو رویداد سپاسگزاریم.

از مدیران ما سپاسگزاریم: [Jesslyn Tannady](https://twitter.com/jtannady)، [Suzie Grange](https://twitter.com/missuze)، [Becca Bailey](https://twitter.com/beccaliz)، [Luna Wei](https://twitter.com/lunaleaps)، [Joe Previte](https://twitter.com/jsjoeio)، [Nicola Corti](https://twitter.com/Cortinico)، [Gijs Weterings](https://twitter.com/gweterings)، [Claudio Procida](https://twitter.com/claudiopro)، Julia Neumann، Mengdi Chen، Jean Zhang، Ricky Li و [Xuan Huang (黄玄)](https://twitter.com/Huxpro).

از [Manjula Dube](https://twitter.com/manjula_dube)، [Sahil Mhapsekar](https://twitter.com/apheri0) و Vihang Patel از [React India](https://www.reactindia.io/)، و [Jasmine Xie](https://twitter.com/jasmine_xby)، [QiChang Li](https://twitter.com/QCL15) و [YanLun Li](https://twitter.com/anneincoding) از [React China](https://twitter.com/ReactChina) برای کمک به مدیریت رویداد پخش مجدد ما و جذاب نگه‌داشتن آن برای جامعه سپاسگزاریم.

از Vercel برای انتشار [Virtual Event Starter Kit](https://vercel.com/virtual-event-starter-kit) خود سپاسگزاریم، که وب‌سایت کنفرانس بر پایهٔ آن ساخته شد، و از [Lee Robinson](https://twitter.com/leeerob) و [Delba de Oliveira](https://twitter.com/delba_oliveira) برای به اشتراک گذاشتن تجربه‌شان در برگزاری Next.js Conf.

از [Leah Silber](https://twitter.com/wifelette) برای به اشتراک گذاشتن تجربه‌اش در برگزاری کنفرانس‌ها، یادگیری‌هایش از برگزاری [RustConf](https://rustconf.com/)، و برای کتابش [Event Driven](https://leanpub.com/eventdriven/) و نصیحت‌هایی که برای برگزاری کنفرانس در آن است سپاسگزاریم.

از [Kevin Lewis](https://twitter.com/_phzn) و [Rachel Nabors](https://twitter.com/rachelnabors) برای به اشتراک گذاشتن تجربه‌شان در برگزاری Women of React Conf سپاسگزاریم.

از [Aakansha Doshi](https://twitter.com/aakansha1216)، [Laurie Barth](https://twitter.com/laurieontech)، [Michael Chan](https://twitter.com/chantastic) و [Shaundai Person](https://twitter.com/shaundai) برای نصیحت و ایده‌هایشان در طول برنامه‌ریزی سپاسگزاریم.

از [Dan Lebowitz](https://twitter.com/lebo) برای کمک به طراحی و ساخت وب‌سایت کنفرانس و بلیط‌ها سپاسگزاریم.

از Laura Podolak Waddell، Desmond Osei-Acheampong، Mark Rossi، Josh Toberman و دیگران در تیم Facebook Video Productions برای ضبط ویدیوهای سخنرانی اصلی و سخنرانی‌های کارکنان Meta سپاسگزاریم.

از شریک ما HitPlay برای کمک به سازماندهی کنفرانس، ویرایش همهٔ ویدیوها در استریم، ترجمهٔ همهٔ سخنرانی‌ها و مدیریت دیسکورد به چند زبان سپاسگزاریم.

در نهایت، از همهٔ شرکت‌کنندگانمان برای اینکه این کنفرانس ری‌اکت بزرگی ساختند سپاسگزاریم!
