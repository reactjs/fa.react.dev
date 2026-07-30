---
title: "React v18.0"
author: The React Team
date: 2022/03/08
description: React 18 is now available on npm! In our last post, we shared step-by-step instructions for upgrading your app to React 18. In this post, we'll give an overview of what's new in React 18, and what it means for the future.
---

March 29, 2022 by [The React Team](/community/team)

---

<Intro>

React 18 اکنون در npm در دسترس است! در آخرین پستمان، دستورالعمل‌های گام‌به‌گام برای [ارتقای برنامهٔ شما به React 18](/blog/2022/03/08/react-18-upgrade-guide) را به اشتراک گذاشتیم. در این پست، مروری بر آنچه در React 18 جدید است و معنای آن برای آینده ارائه می‌دهیم.

</Intro>

---

آخرین نسخهٔ عمدهٔ ما شامل بهبودهای خارج‌از-جعبه مانند دسته‌بندی خودکار (automatic batching)، APIهای جدیدی مانند startTransition و رندر استریمی سمت سرور با پشتیبانی از ساسپنس (Suspense) است.

بسیاری از قابلیت‌های React 18 بر پایهٔ رندرر همزمان (Concurrent) جدید ما ساخته شده‌اند، تغییری در پس‌زمینه که قابلیت‌های جدید قدرتمندی را آزاد می‌کند. ری‌اکت همزمان (Concurrent React) اختیاری است — فقط زمانی فعال می‌شود که از یک قابلیت همزمان استفاده کنید — اما ما فکر می‌کنیم تأثیر بزرگی بر نحوهٔ ساخت برنامه‌ها توسط افراد خواهد داشت.

ما سال‌ها در حال تحقیق و توسعهٔ پشتیبانی از همزمانی در ری‌اکت بوده‌ایم، و مراقبت اضافی به کار برده‌ایم تا مسیر پذیرش تدریجی برای کاربران موجود فراهم کنیم. تابستان گذشته، [گروه کاری React 18 را تشکیل دادیم](/blog/2021/06/08/the-plan-for-react-18) تا بازخوردی از متخصصان جامعه جمع‌آوری کنیم و تجربهٔ ارتقای روانی برای کل اکوسیستم ری‌اکت تضمین کنیم.

در صورت از دست دادن، ما خیلی از این چشم‌انداز را در React Conf 2021 به اشتراک گذاشتیم:

* در [سخنرانی اصلی](https://www.youtube.com/watch?v=FZ0cG47msEk&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa)، توضیح می‌دهیم که چگونه React 18 در رسالت ما برای آسان‌سازی ساخت تجربه‌های کاربری عالی توسط توسعه‌دهندگان جای می‌گیرد.
* [Shruti Kapoor](https://twitter.com/shrutikapoor08) [نحوهٔ استفاده از قابلیت‌های جدید در React 18 را نمایش داد](https://www.youtube.com/watch?v=ytudH8je5ko&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa&index=2)
* [Shaundai Person](https://twitter.com/shaundai) مروری بر [رندر سرور استریمی با ساسپنس](https://www.youtube.com/watch?v=pj5N-Khihgc&list=PLNG_1j3cPCaZZ7etkzWA7JfdmKWT0pMsa&index=3) به ما داد

در ادامه یک مرور کامل از آنچه در این انتشار انتظار می‌رود می‌آید، که با رندر همزمان (Concurrent Rendering) شروع می‌شود.

<Note>

برای کاربران React Native، React 18 در React Native با معماری جدید React Native منتشر خواهد شد. برای اطلاعات بیشتر، [سخنرانی اصلی React Conf را اینجا ببینید](https://www.youtube.com/watch?v=FZ0cG47msEk&t=1530s).

</Note>

## ری‌اکت همزمان (Concurrent React) چیست؟ {/*what-is-concurrent-react*/}

مهم‌ترین افزوده در React 18 چیزی است که امیدواریم هرگز مجبور نباشید درباره‌اش فکر کنید: همزمانی (concurrency). ما فکر می‌کنیم این برای توسعه‌دهندگان برنامه‌های کاربری تا حد زیادی درست است، هرچند داستان برای نگهداران کتابخانه ممکن است کمی پیچیده‌تر باشد.

همزمانی به‌معنای واقعی کلمه یک قابلیت نیست. این یک مکانیزم جدید پشت‌پرده است که به ری‌اکت اجازه می‌دهد چندین نسخه از رابط کاربری شما را همزمان آماده کند. می‌توانید همزمانی را به‌عنوان یک جزئیات پیاده‌سازی در نظر بگیرید — این به‌خاطر قابلیت‌هایی که آزاد می‌کند ارزشمند است. ری‌اکت در پیاده‌سازی داخلی خود از تکنیک‌های پیچیده‌ای مانند صف‌های اولویت و بافرهای چندگانه استفاده می‌کند. اما شما این مفاهیم را در هیچ‌کدام از APIهای عمومی ما نخواهید دید.

وقتی APIها را طراحی می‌کنیم، سعی می‌کنیم جزئیات پیاده‌سازی را از توسعه‌دهندگان پنهان کنیم. به‌عنوان یک توسعه‌دهندهٔ ری‌اکت، شما روی *آنچه* می‌خواهید تجربهٔ کاربری شبیه باشد تمرکز می‌کنید، و ری‌اکت *نحوهٔ* تحویل آن تجربه را مدیریت می‌کند. بنابراین ما انتظار نداریم توسعه‌دهندگان ری‌اکت بدانند همزمانی زیرپوست چگونه کار می‌کند.

با این حال، Concurrent React مهم‌تر از یک جزئیات پیاده‌سازی معمولی است — این یک به‌روزرسانی بنیادین به مدل رندر هسته ری‌اکت است. بنابراین در حالی که دانستن نحوهٔ کار همزمانی خیلی مهم نیست، شاید ارزشش را داشته باشد که بدانید این در سطح بالا چیست.

یک ویژگی کلیدی Concurrent React این است که رندر قابل قطع است. وقتی برای اولین بار به React 18 ارتقا می‌یابید، پیش از افزودن هر قابلیت همزمانی، به‌روزرسانی‌ها مانند نسخه‌های قبلی ری‌اکت رندر می‌شوند — در یک تراکنش واحد، غیرقابل‌قطع و همگام. با رندر همگام، وقتی یک به‌روزرسانی شروع به رندر می‌کند، هیچ‌چیز نمی‌تواند آن را تا زمانی که کاربر نتیجه را روی صفحه ببیند قطع کند.

در یک رندر همزمان، این همیشه این‌طور نیست. ری‌اکت ممکن است شروع به رندر یک به‌روزرسانی کند، در وسط متوقف شود، و سپس بعداً ادامه دهد. حتی ممکن است از یک رندر در حال انجام کلاً صرف‌نظر کند. ری‌اکت تضمین می‌کند که رابط کاربری حتی اگر رندر قطع شود یکنواخت به‌نظر می‌رسد. برای این کار، جهش‌های DOM را تا انتها، پس از ارزیابی کل درخت، به تعویق می‌اندازد. با این قابلیت، ری‌اکت می‌تواند صفحه‌های جدید را در پس‌زمینه بدون مسدود کردن نخ اصلی آماده کند. این بدان معناست که رابط کاربری می‌تواند حتی در وسط یک وظیفهٔ رندر بزرگ، فوراً به ورودی کاربر پاسخ دهد، و یک تجربهٔ کاربری روان ایجاد کند.

مثال دیگر استیت قابل‌استفادهٔ مجدد است. Concurrent React می‌تواند بخش‌هایی از رابط کاربری را از صفحه حذف کند، سپس آن‌ها را بعداً ضمن استفادهٔ مجدد از استیت قبلی اضافه کند. برای مثال، وقتی کاربر از یک صفحه به تب دیگری می‌رود و برمی‌گردد، ری‌اکت باید بتواند صفحهٔ قبلی را در همان استیتی که قبلاً بود بازگرداند. در یک نسخهٔ فرعی آینده، ما قصد داریم کامپوننت جدیدی به نام `<Offscreen>` اضافه کنیم که این الگو را پیاده‌سازی می‌کند. به‌طور مشابه، شما قادر خواهید بود از Offscreen برای آماده‌سازی رابط کاربری جدید در پس‌زمینه استفاده کنید تا پیش از آنکه کاربر آن را آشکار کند آماده باشد.

رندر همزمان یک ابزار قدرتمند جدید در ری‌اکت است و بیشتر قابلیت‌های جدید ما برای بهره‌گیری از آن ساخته شده‌اند، از جمله ساسپنس، ترنزیشن‌ها و رندر سرور استریمی. اما React 18 فقط آغاز آنچه قصد داریم بر این پایهٔ جدید بسازیم است.

## پذیرش تدریجی قابلیت‌های همزمان {/*gradually-adopting-concurrent-features*/}

از نظر فنی، رندر همزمان یک تغییر شکستن‌کننده است. چون رندر همزمان قابل قطع است، کامپوننت‌ها هنگام فعال بودن آن تا حدودی متفاوت رفتار می‌کنند.

در تست‌های ما، ما هزاران کامپوننت را به React 18 ارتقا داده‌ایم. آنچه یافتیم این است که تقریباً همهٔ کامپوننت‌های موجود با رندر همزمان «فقط کار می‌کنند»، بدون هیچ تغییری. با این حال، برخی از آن‌ها ممکن است به تلاش مهاجرت اضافی نیاز داشته باشند. هرچند تغییرات معمولاً کوچک هستند، شما همچنان قادر خواهید بود آن‌ها را با سرعت خودتان انجام دهید. رفتار رندر جدید در React 18 **فقط در بخش‌هایی از برنامهٔ شما که از قابلیت‌های جدید استفاده می‌کنند فعال است.**

استراتژی کلی ارتقا این است که برنامهٔ شما را بدون شکستن کد موجود روی React 18 اجرا کنید. سپس می‌توانید به‌تدریج شروع به افزودن قابلیت‌های همزمان با سرعت خودتان کنید. می‌توانید از [`<StrictMode>`](/reference/react/StrictMode) برای کمک به آشکار کردن باگ‌های مرتبط با همزمانی در طول توسعه استفاده کنید. حالت سخت‌گیرانه بر رفتار پروداکشن تأثیر نمی‌گذارد، اما در طول توسعه لاگ‌های هشداری اضافی ثبت می‌کند و توابعی را که انتظار می‌رود idempotent باشند دو بار فراخوانی می‌کند. این همه چیز را پیدا نخواهد کرد، اما در جلوگیری از رایج‌ترین انواع اشتباهات مؤثر است.

پس از ارتقا به React 18، شما قادر خواهید بود فوراً شروع به استفاده از قابلیت‌های همزمان کنید. برای مثال، می‌توانید از startTransition برای جابه‌جایی بین صفحه‌ها بدون مسدود کردن ورودی کاربر استفاده کنید. یا از useDeferredValue برای کاهش سرعت رندرهای مجدد گران استفاده کنید.

با این حال، در درازمدت، ما انتظار داریم روش اصلی افزودن همزمانی به برنامهٔ شما با استفاده از یک کتابخانه یا فریم‌ورک همزمان-فعال باشد. در بیشتر موارد، شما با APIهای همزمان به‌طور مستقیم تعامل نخواهید داشت. برای مثال، به‌جای آنکه توسعه‌دهندگان هر بار که به صفحهٔ جدیدی جابه‌جا می‌شوند startTransition را فراخوانی کنند، کتابخانه‌های مسیریاب به‌طور خودکار جابه‌جایی‌ها را در startTransform می‌پیچند.

ممکن است مدتی طول بکشد تا کتابخانه‌ها به نسخهٔ سازگار با همزمانی ارتقا یابند. ما APIهای جدیدی ارائه کرده‌ایم تا به کتابخانه‌ها برای بهره‌گیری از قابلیت‌های همزمان کمک کنیم. در این فاصله، لطفاً با نگهداران صبور باشید زیرا ما برای مهاجرت تدریجی اکوسیستم ری‌اکت تلاش می‌کنیم.

برای اطلاعات بیشتر، پست قبلی ما را ببینید: [چگونه به React 18 ارتقا یابیم](/blog/2022/03/08/react-18-upgrade-guide).

## ساسپنس در فریم‌ورک‌های داده {/*suspense-in-data-frameworks*/}

در React 18، شما می‌توانید شروع به استفاده از [ساسپنس (Suspense)](/reference/react/Suspense) برای دریافت داده در فریم‌ورک‌های opiniated مانند Relay، Next.js، Hydrogen یا Remix کنید. دریافت دادهٔ ad hoc با ساسپنس از نظر فنی ممکن است، اما همچنان به‌عنوان یک استراتژی عمومی توصیه نمی‌شود.

در آینده، ممکن است primitiveهای اضافی را افشا کنیم که دسترسی به داده‌هایتان را با ساسپنس راحت‌تر کند، شاید بدون استفاده از یک فریم‌ورک opiniated. با این حال، ساسپنس بهترین کار را زمانی می‌کند که عمیقاً در معماری برنامهٔ شما یکپارچه شده باشد: مسیریاب شما، لایهٔ دادهٔ شما و محیط رندر سرور شما. بنابراین حتی در درازمدت، ما انتظار داریم کتابخانه‌ها و فریم‌ورک‌ها نقش حیاتی در اکوسیستم ری‌اکت بازی کنند.

مانند نسخه‌های قبلی ری‌اکت، شما همچنین می‌توانید از ساسپنس برای تقسیم کد روی کلاینت با React.lazy استفاده کنید. اما چشم‌انداز ما برای ساسپنس همیشه دربارهٔ چیزهای بسیار بیشتری از بارگذاری کد بوده است — هدف این است که پشتیبانی از ساسپنس را گسترش دهیم تا در نهایت، همان fallback اعلامی ساسپنس بتواند هر عملیات ناهمگامی (بارگذاری کد، داده، تصاویر و غیره) را مدیریت کند.

## کامپوننت‌های سرور هنوز در حال توسعه هستند {/*server-components-is-still-in-development*/}

[**کامپوننت‌های سرور (Server Components)**](/blog/2020/12/21/data-fetching-with-react-server-components) قابلیتی آینده‌نگرانه است که به توسعه‌دهندگان اجازه می‌دهد برنامه‌هایی بسازند که سرور و کلاینت را پوشش می‌دهند، و تعامل غنی برنامه‌های سمت کلاینت را با کارایی بهبودیافتهٔ رندر سنتی سرور ترکیب می‌کند. کامپوننت‌های سرور ذاتیاً به Concurrent React متصل نیستند، اما به بهترین شکل با قابلیت‌های همزمان مانند ساسپنس و رندر سرور استریمی کار می‌کند.

کامپوننت‌های سرور هنوز آزمایشی هستند، اما ما انتظار داریم یک نسخهٔ اولیه را در یک انتشار فرعی 18.x منتشر کنیم. در این فاصله، ما با فریم‌ورک‌هایی مانند Next.js، Hydrogen و Remix کار می‌کنیم تا پروپوزال را پیش ببریم و آن را برای پذیرش گسترده آماده کنیم.

## چه چیزهایی در React 18 جدید است {/*whats-new-in-react-18*/}

### قابلیت جدید: دسته‌بندی خودکار (Automatic Batching) {/*new-feature-automatic-batching*/}

دسته‌بندی (Batching) زمانی است که ری‌اکت چندین به‌روزرسانی استیت را در یک رندر مجدد گروه‌بندی می‌کند تا کارایی بهتر شود. بدون دسته‌بندی خودکار، ما فقط به‌روزرسانی‌های داخل هندلرهای رویداد ری‌اکت را دسته‌بندی می‌کردیم. به‌روزرسانی‌های داخل پرامیس‌ها، setTimeout، هندلرهای رویداد بومی یا هر رویداد دیگری به‌صورت پیش‌فرض در ری‌اکت دسته‌بندی نمی‌شدند. با دسته‌بندی خودکار، این به‌روزرسانی‌ها به‌طور خودکار دسته‌بندی خواهند شد:


```js
// Before: only React events were batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);

// After: updates inside of timeouts, promises,
// native event handlers or any other event are batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);
```

برای اطلاعات بیشتر، این پست را درباره [دسته‌بندی خودکار برای رندرهای کمتر در React 18](https://github.com/reactwg/react-18/discussions/21) ببینید.

### قابلیت جدید: ترنزیشن‌ها (Transitions) {/*new-feature-transitions*/}

ترنزیشن مفهومی جدید در ری‌اکت است برای تمایز بین به‌روزرسانی‌های فوری و غیرفوری.

* **به‌روزرسانی‌های فوری** تعامل مستقیم را منعکس می‌کنند، مانند تایپ کردن، کلیک، فشار دادن و غیره.
* **به‌روزرسانی‌های ترنزیشن** رابط کاربری را از یک نما به نمای دیگر منتقل می‌کنند.

به‌روزرسانی‌های فوری مانند تایپ، کلیک یا فشار دادن، نیازمند پاسخ فوری برای مطابقت با شهود ما درباره نحوهٔ رفتار اشیاء فیزیکی هستند. در غیر این صورت «اشتباه» احساس می‌شوند. با این حال، ترنزیشن‌ها متفاوت هستند زیرا کاربر انتظار ندارد هر مقدار واسطه‌ای را روی صفحه ببیند.

برای مثال، وقتی یک فیلتر در یک dropdown انتخاب می‌کنید، انتظار دارید خود دکمهٔ فیلتر فوراً وقتی کلیک می‌کنید پاسخ دهد. با این حال، نتایج واقعی ممکن است جداگانه ترنزیشن کنند. یک تأخیر کوچک غیرقابل‌درک و اغلب انتظار می‌رود. و اگر فیلتر را دوباره پیش از اتمام رندر نتایج تغییر دهید، فقط به دیدن آخرین نتایج اهمیت می‌دهید.

معمولاً، برای بهترین تجربهٔ کاربری، یک ورودی کاربری واحد باید هم به یک به‌روزرسانی فوری و هم به یک به‌روزرسانی غیرفوری منجر شود. شما می‌توانید از API startTransition درون یک رویداد ورودی استفاده کنید تا به ری‌اکت اطلاع دهید کدام به‌روزرسانی‌ها فوری و کدام «ترنزیشن» هستند:


```js
import { startTransition } from 'react';

// Urgent: Show what was typed
setInputValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input);
});
```


به‌روزرسانی‌های پیچیده‌شده در startTransition به‌عنوان غیرفوری برخورد می‌شوند و اگر به‌روزرسانی‌های فوری‌تری مانند کلیک یا فشار کلید وارد شوند قطع خواهند شد. اگر یک ترنزیشن توسط کاربر قطع شود (برای مثال، با تایپ چند کاراکتر پشت سر هم)، ری‌اکت کار رندر قدیمی را که تمام نشده دور می‌ریزد و فقط آخرین به‌روزرسانی را رندر می‌کند.


* `useTransition`: هوکی برای شروع ترنزیشن‌ها، شامل یک مقدار برای پیگیری استیت در حال انجام.
* `startTransition`: روشی برای شروع ترنزیشن‌ها هنگامی که هوک نمی‌تواند استفاده شود.

ترنزیشن‌ها در رندر همزمان شرکت می‌کنند، که اجازه می‌دهد به‌روزرسانی قطع شود. اگر محتوا دوباره suspend شود، ترنزیشن‌ها همچنین به ری‌اکت می‌گویند به نمایش محتوای فعلی ضمن رندر محتوای ترنزیشن در پس‌زمینه ادامه دهد (برای اطلاعات بیشتر [RFC ساسپنس](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md) را ببینید).

[مستندات ترنزیشن‌ها را اینجا ببینید](/reference/react/useTransition).

### قابلیت‌های جدید ساسپنس {/*new-suspense-features*/}

ساسپنس به شما اجازه می‌دهد به‌صورت اعلامی استیت بارگذاری را برای بخشی از درخت کامپوننت مشخص کنید اگر هنوز برای نمایش آماده نیست:

```js
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

ساسپنس «استیت بارگذاری رابط کاربری» را به یک مفهوم اعلامی درجه‌یک در مدل برنامه‌نویسی ری‌اکت تبدیل می‌کند. این به ما اجازه می‌دهد قابلیت‌های سطح بالاتری بر پایهٔ آن بسازیم.

ما چند سال پیش نسخهٔ محدودی از ساسپنس را معرفی کردیم. با این حال، تنها مورد استفادهٔ پشتیبانی‌شده تقسیم کد با React.lazy بود، و اصلاً هنگام رندر روی سرور پشتیبانی نمی‌شد.

در React 18، ما پشتیبانی از ساسپنس روی سرور را اضافه کرده‌ایم و قابلیت‌های آن را با استفاده از قابلیت‌های رندر همزمان گسترش داده‌ایم.

ساسپنس در React 18 بهترین کار را هنگام ترکیب با API ترنزیشن می‌کند. اگر در طول یک ترنزیشن suspend شوید، ری‌اکت از جایگزینی محتوای از قبل قابل‌مشاهده با یک fallback جلوگیری می‌کند. در عوض، ری‌اکت رندر را تا زمانی که دادهٔ کافی بارگذاری شده باشد به تعویق می‌اندازد تا از یک استیت بارگذاری بد جلوگیری کند.

برای اطلاعات بیشتر، RFC [ساسپنس در React 18](https://github.com/reactjs/rfcs/blob/main/text/0213-suspense-in-react-18.md) را ببینید.

### APIهای جدید رندر کلاینت و سرور {/*new-client-and-server-rendering-apis*/}

در این انتشار ما از این فرصت استفاده کردیم تا APIهایی که برای رندر روی کلاینت و سرور افشا می‌کنیم را بازطراحی کنیم. این تغییرات به کاربران اجازه می‌دهد به استفاده از APIهای قدیمی در حالت React 17 ادامه دهند در حالی که به APIهای جدید در React 18 ارتقا می‌یابند.

#### React DOM Client {/*react-dom-client*/}

این APIهای جدید اکنون از `react-dom/client` صادر می‌شوند:

* `createRoot`: روش جدیدی برای ایجاد یک ریشه برای `render` یا `unmount`. به‌جای `ReactDOM.render` از آن استفاده کنید. قابلیت‌های جدید در React 18 بدون آن کار نمی‌کنند.
* `hydrateRoot`: روش جدیدی برای hydrate یک برنامهٔ رندر‌شده روی سرور. به‌جای `ReactDOM.hydrate` در همراهی با APIهای جدید React DOM Server از آن استفاده کنید. قابلیت‌های جدید در React 18 بدون آن کار نمی‌کنند.

هر دو `createRoot` و `hydrateRoot` یک گزینهٔ جدید به نام `onRecoverableError` می‌پذیرند در صورتی که می‌خواهید هنگام بازیابی ری‌اکت از خطاها در طول رندر یا hydration برای ثبت لاگ مطلع شوید. به‌صورت پیش‌فرض، ری‌اکت از [`reportError`](https://developer.mozilla.org/en-US/docs/Web/API/reportError) یا `console.error` در مرورگرهای قدیمی استفاده خواهد کرد.

[مستندات React DOM Client را اینجا ببینید](/reference/react-dom/client).

#### React DOM Server {/*react-dom-server*/}

این APIهای جدید اکنون از `react-dom/server` صادر می‌شوند و پشتیبانی کامل از استریم ساسپنس روی سرور دارند:

* `renderToPipeableStream`: برای استریم در محیط‌های Node.
* `renderToReadableStream`: برای محیط‌های اجرایی مدرن لبه (edge)، مانند Deno و Cloudflare workers.

روش موجود `renderToString` به کار خود ادامه می‌دهد اما دی‌کوريج شده است.

[مستندات React DOM Server را اینجا ببینید](/reference/react-dom/server).

### رفتارهای جدید حالت سخت‌گیرانه (Strict Mode) {/*new-strict-mode-behaviors*/}

در آینده، ما دوست داریم قابلیتی اضافه کنیم که به ری‌اکت اجازه می‌دهد بخش‌هایی از رابط کاربری را ضمن حفظ استیت اضافه و حذف کند. برای مثال، وقتی کاربر از یک صفحه به تب دیگری می‌رود و برمی‌گردد، ری‌اکت باید بتواند بلافاصله صفحهٔ قبلی را نمایش دهد. برای این کار، ری‌اکت درخت‌ها را با استفاده از همان استیت کامپوننت قبلی unmount و مجدداً mount می‌کند.

این قابلیت به برنامه‌های ری‌اکت کارایی بهتر خارج‌از-جعبه می‌دهد، اما نیازمند آن است که کامپوننت‌ها در برابر افکت‌هایی که چندین بار mount و از بین می‌روند مقاوم باشند. بیشتر افکت‌ها بدون هیچ تغییری کار خواهند کرد، اما برخی افکت‌ها فرض می‌کنند فقط یک بار mount یا از بین می‌روند.

برای کمک به آشکار کردن این مشکلات، React 18 یک بررسی فقط-توسعهٔ جدید به حالت سخت‌گیرانه (Strict Mode) اضافه می‌کند. این بررسی جدید به‌طور خودکار هر کامپوننت را unmount و مجدداً mount می‌کند، هر بار که کامپوننتی برای اولین بار mount می‌شود، و استیت قبلی را روی mount دوم بازگردانده می‌شود.

قبل از این تغییر، ری‌اکت کامپوننت را mount می‌کرد و افکت‌ها را ایجاد می‌کرد:

```
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
```


با حالت سخت‌گیرانه در React 18، ری‌اکت در حالت توسعه unmount و mount مجدد کامپوننت را شبیه‌سازی می‌کند:

```
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
* React simulates unmounting the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
* React simulates mounting the component with the previous state.
  * Layout effects are created.
  * Effects are created.
```

[مستندات تضمین استیت قابل‌استفادهٔ مجدد را اینجا ببینید](/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development).

### هوک‌های جدید {/*new-hooks*/}

#### useId {/*useid*/}

`useId` یک هوک جدید برای تولید شناسه‌های یکتا روی هم کلاینت و هم سرور است، ضمن جلوگیری از عدم تطابق‌های hydration. این عمدتاً برای کتابخانه‌های کامپوننت که با APIهای دسترسی‌پذیری یکپارچه می‌شوند و نیازمند شناسه‌های یکتا هستند مفید است. این مشکلی را که قبلاً در React 17 و پایین‌تر وجود داشت حل می‌کند، اما در React 18 حتی مهم‌تر است به‌دلیل نحوهٔ تحویل HTML خارج‌از-ترتیب توسط رندرر سرور استریمی جدید. [مستندات را اینجا ببینید](/reference/react/useId).

> Note
>
> `useId` برای تولید [کلیدها در یک فهرست](/learn/rendering-lists#where-to-get-your-key) **نیست**. کلیدها باید از داده‌های شما تولید شوند.

#### useTransition {/*usetransition*/}

`useTransition` و `startTransition` به شما اجازه می‌دهند برخی به‌روزرسانی‌های استیت را به‌عنوان غیرفوری علامت‌گذاری کنید. سایر به‌روزرسانی‌های استیت به‌صورت پیش‌فرض فوری در نظر گرفته می‌شوند. ری‌اکت به به‌روزرسانی‌های فوری (برای مثال، به‌روزرسانی یک ورودی متن) اجازه می‌دهد به‌روزرسانی‌های غیرفوری (برای مثال، رندر یک فهرست از نتایج جستجو) را قطع کند. [مستندات را اینجا ببینید](/reference/react/useTransition).

#### useDeferredValue {/*usedeferredvalue*/}

`useDeferredValue` به شما اجازه می‌دهد رندر مجدد بخش غیرفوری درخت را به تعویق بیندازید. این شبیه به debounce است، اما در مقایسه با آن چند مزیت دارد. هیچ تأخیر زمانی ثابتی وجود ندارد، بنابراین ری‌اکت رندر به تعویق‌افتاده را بلافاصله پس از آنکه اولین رندر روی صفحه منعکس شد امتحان می‌کند. رندر به تعویق‌افتاده قابل قطع است و ورودی کاربر را مسدود نمی‌کند. [مستندات را اینجا ببینید](/reference/react/useDeferredValue).

#### useSyncExternalStore {/*usesyncexternalstore*/}

`useSyncExternalStore` یک هوک جدید است که به استورهای خارجی اجازه می‌دهد با اجبار به‌روزرسانی‌های استور به‌صورت همگام، از خواندهای همزمان پشتیبانی کنند. این نیاز به useEffect را هنگام پیاده‌سازی اشتراک‌ها به منابع دادهٔ خارجی حذف می‌کند، و برای هر کتابخانه‌ای که با استیت خارج از ری‌اکت یکپارچه می‌شود توصیه می‌شود. [مستندات را اینجا ببینید](/reference/react/useSyncExternalStore).

> Note
>
> `useSyncExternalStore` برای استفاده توسط کتابخانه‌ها طراحی شده است، نه کد برنامهٔ کاربری.

#### useInsertionEffect {/*useinsertioneffect*/}

`useInsertionEffect` یک هوک جدید است که به کتابخانه‌های CSS-in-JS اجازه می‌دهد مشکلات کارایی تزریق استایل‌ها در رندر را برطرف کنند. مگر آنکه قبلاً یک کتابخانهٔ CSS-in-JS ساخته باشید، انتظار نداریم تا به حال از این استفاده کنید. این هوک پس از جهش DOM اجرا خواهد شد، اما قبل از آنکه افکت‌های چیدمان (layout effects) چیدمان جدید را بخوانند. این مشکلی را که قبلاً در React 17 و پایین‌تر وجود داشت حل می‌کند، اما در React 18 حتی مهم‌تر است زیرا ری‌اکت در طول رندر همزمان به مرورگر اجازه می‌دهد، و به آن فرصت محاسبهٔ دوبارهٔ چیدمان را می‌دهد. [مستندات را اینجا ببینید](/reference/react/useInsertionEffect).

> Note
>
> `useInsertionEffect` برای استفاده توسط کتابخانه‌ها طراحی شده است، نه کد برنامهٔ کاربری.

## چگونه ارتقا یابیم {/*how-to-upgrade*/}

برای دستورالعمل‌های گام‌به‌گام و فهرست کاملی از تغییرات شکستن‌کننده و قابل‌توجه، [چگونه به React 18 ارتقا یابیم](/blog/2022/03/08/react-18-upgrade-guide) را ببینید.

## گزارش تغییرات (Changelog) {/*changelog*/}

### React {/*react*/}

* افزودن `useTransition` و `useDeferredValue` برای جدا کردن به‌روزرسانی‌های فوری از ترنزیشن‌ها. ([#10426](https://github.com/facebook/react/pull/10426), [#10715](https://github.com/facebook/react/pull/10715), [#15593](https://github.com/facebook/react/pull/15593), [#15272](https://github.com/facebook/react/pull/15272), [#15578](https://github.com/facebook/react/pull/15578), [#15769](https://github.com/facebook/react/pull/15769), [#17058](https://github.com/facebook/react/pull/17058), [#18796](https://github.com/facebook/react/pull/18796), [#19121](https://github.com/facebook/react/pull/19121), [#19703](https://github.com/facebook/react/pull/19703), [#19719](https://github.com/facebook/react/pull/19719), [#19724](https://github.com/facebook/react/pull/19724), [#20672](https://github.com/facebook/react/pull/20672), [#20976](https://github.com/facebook/react/pull/20976) by [@acdlite](https://github.com/acdlite), [@lunaruan](https://github.com/lunaruan), [@rickhanlonii](https://github.com/rickhanlonii), and [@sebmarkbage](https://github.com/sebmarkbage))
* افزودن `useId` برای تولید شناسه‌های یکتا. ([#17322](https://github.com/facebook/react/pull/17322), [#18576](https://github.com/facebook/react/pull/18576), [#22644](https://github.com/facebook/react/pull/22644), [#22672](https://github.com/facebook/react/pull/22672), [#21260](https://github.com/facebook/react/pull/21260) by [@acdlite](https://github.com/acdlite), [@lunaruan](https://github.com/lunaruan), and [@sebmarkbage](https://github.com/sebmarkbage))
* افزودن `useSyncExternalStore` برای کمک به یکپارچه‌سازی کتابخانه‌های استور خارجی با ری‌اکت. ([#15022](https://github.com/facebook/react/pull/15022), [#18000](https://github.com/facebook/react/pull/18000), [#18771](https://github.com/facebook/react/pull/18771), [#22211](https://github.com/facebook/react/pull/22211), [#22292](https://github.com/facebook/react/pull/22292), [#22239](https://github.com/facebook/react/pull/22239), [#22347](https://github.com/facebook/react/pull/22347), [#23150](https://github.com/facebook/react/pull/23150) by [@acdlite](https://github.com/acdlite), [@bvaughn](https://github.com/bvaughn), and [@drarmstr](https://github.com/drarmstr))
* افزودن `startTransition` به‌عنوان نسخه‌ای از `useTransition` بدون بازخورد در حال انجام. ([#19696](https://github.com/facebook/react/pull/19696)  by [@rickhanlonii](https://github.com/rickhanlonii))
* افزودن `useInsertionEffect` برای کتابخانه‌های CSS-in-JS. ([#21913](https://github.com/facebook/react/pull/21913)  by [@rickhanlonii](https://github.com/rickhanlonii))
* ساسپنس افکت‌های چیدمان را هنگام ظاهر شدن مجدد محتوا مجدداً mount می‌کند.  ([#19322](https://github.com/facebook/react/pull/19322), [#19374](https://github.com/facebook/react/pull/19374), [#19523](https://github.com/facebook/react/pull/19523), [#20625](https://github.com/facebook/react/pull/20625), [#21079](https://github.com/facebook/react/pull/21079) by [@acdlite](https://github.com/acdlite), [@bvaughn](https://github.com/bvaughn), and [@lunaruan](https://github.com/lunaruan))
* `<StrictMode>` افکت‌ها را برای بررسی استیت قابل‌بازگردانی مجدداً اجرا می‌کند. ([#19523](https://github.com/facebook/react/pull/19523) , [#21418](https://github.com/facebook/react/pull/21418)  by [@bvaughn](https://github.com/bvaughn) and [@lunaruan](https://github.com/lunaruan))
* فرض بر این است که Symbolها همیشه در دسترس هستند. ([#23348](https://github.com/facebook/react/pull/23348)  by [@sebmarkbage](https://github.com/sebmarkbage))
* حذف پولیفیل `object-assign`. ([#23351](https://github.com/facebook/react/pull/23351)  by [@sebmarkbage](https://github.com/sebmarkbage))
* حذف API پشتیبانی‌نشدهٔ `unstable_changedBits`.  ([#20953](https://github.com/facebook/react/pull/20953)  by [@acdlite](https://github.com/acdlite))
* اجازه دادن به کامپوننت‌ها برای رندر کردن undefined. ([#21869](https://github.com/facebook/react/pull/21869)  by [@rickhanlonii](https://github.com/rickhanlonii))
* Flush همگام `useEffect` ناشی از رویدادهای گسسته مانند کلیک‌ها. ([#21150](https://github.com/facebook/react/pull/21150)  by [@acdlite](https://github.com/acdlite))
* `fallback={undefined}` در ساسپنس اکنون مانند `null` رفتار می‌کند و نادیده گرفته نمی‌شود. ([#21854](https://github.com/facebook/react/pull/21854)  by [@rickhanlonii](https://github.com/rickhanlonii))
* در نظر گرفتن همهٔ `lazy()` که به همان کامپوننت resolve می‌شوند به‌عنوان معادل. ([#20357](https://github.com/facebook/react/pull/20357)  by [@sebmarkbage](https://github.com/sebmarkbage))
* عدم patch کنسول در طول اولین رندر. ([#22308](https://github.com/facebook/react/pull/22308)  by [@lunaruan](https://github.com/lunaruan))
* بهبود استفاده از حافظه. ([#21039](https://github.com/facebook/react/pull/21039)  by [@bgirard](https://github.com/bgirard))
* بهبود پیام‌ها اگر string coercion خطا دهد (Temporal.*، Symbol و غیره) ([#22064](https://github.com/facebook/react/pull/22064)  by [@justingrant](https://github.com/justingrant))
* استفاده از `setImmediate` هنگام در دسترس بودن به‌جای `MessageChannel`. ([#20834](https://github.com/facebook/react/pull/20834)  by [@gaearon](https://github.com/gaearon))
* رفع عدم انتشار کانتکست (Context) درون درخت‌های suspend‌شده. ([#23095](https://github.com/facebook/react/pull/23095)  by [@gaearon](https://github.com/gaearon))
* رفع `useReducer` که پراپس نادرست را مشاهده می‌کرد با حذف مکانیزم bailout eager. ([#22445](https://github.com/facebook/react/pull/22445)  by [@josephsavona](https://github.com/josephsavona))
* رفع نادیده‌گرفته‌شدن `setState` در Safari هنگام افزودن iframeها. ([#23111](https://github.com/facebook/react/pull/23111)  by [@gaearon](https://github.com/gaearon))
* رفع یک کرش هنگام رندر `ZonedDateTime` در درخت. ([#20617](https://github.com/facebook/react/pull/20617)  by [@dimaqq](https://github.com/dimaqq))
* رفع یک کرش هنگام تنظیم document به `null` در تست‌ها. ([#22695](https://github.com/facebook/react/pull/22695)  by [@SimenB](https://github.com/SimenB))
* رفع عدم تحریک `onLoad` هنگام روشن بودن قابلیت‌های همزمان. ([#23316](https://github.com/facebook/react/pull/23316)  by [@gnoff](https://github.com/gnoff))
* رفع یک هشدار هنگام بازگرداندن `NaN` توسط یک selector.  ([#23333](https://github.com/facebook/react/pull/23333)  by [@hachibeeDI](https://github.com/hachibeeDI))
* رفع یک کرش هنگام تنظیم document به `null` در تست‌ها. ([#22695](https://github.com/facebook/react/pull/22695) by [@SimenB](https://github.com/SimenB))
* رفع سرآیند مجوز تولیدشده. ([#23004](https://github.com/facebook/react/pull/23004)  by [@vitaliemiron](https://github.com/vitaliemiron))
* افزودن `package.json` به‌عنوان یکی از نقاط ورودی. ([#22954](https://github.com/facebook/react/pull/22954)  by [@Jack](https://github.com/Jack-Works))
* اجازه دادن به suspend خارج از یک مرز ساسپنس. ([#23267](https://github.com/facebook/react/pull/23267)  by [@acdlite](https://github.com/acdlite))
* ثبت یک خطای قابل‌بازیابی هر زمان که hydration شکست بخورد. ([#23319](https://github.com/facebook/react/pull/23319)  by [@acdlite](https://github.com/acdlite))

### React DOM {/*react-dom*/}

* افزودن `createRoot` و `hydrateRoot`. ([#10239](https://github.com/facebook/react/pull/10239), [#11225](https://github.com/facebook/react/pull/11225), [#12117](https://github.com/facebook/react/pull/12117), [#13732](https://github.com/facebook/react/pull/13732), [#15502](https://github.com/facebook/react/pull/15502), [#15532](https://github.com/facebook/react/pull/15532), [#17035](https://github.com/facebook/react/pull/17035), [#17165](https://github.com/facebook/react/pull/17165), [#20669](https://github.com/facebook/react/pull/20669), [#20748](https://github.com/facebook/react/pull/20748), [#20888](https://github.com/facebook/react/pull/20888), [#21072](https://github.com/facebook/react/pull/21072), [#21417](https://github.com/facebook/react/pull/21417), [#21652](https://github.com/facebook/react/pull/21652), [#21687](https://github.com/facebook/react/pull/21687), [#23207](https://github.com/facebook/react/pull/23207), [#23385](https://github.com/facebook/react/pull/23385) by [@acdlite](https://github.com/acdlite), [@bvaughn](https://github.com/bvaughn), [@gaearon](https://github.com/gaearon), [@lunaruan](https://github.com/lunaruan), [@rickhanlonii](https://github.com/rickhanlonii), [@trueadm](https://github.com/trueadm), and [@sebmarkbage](https://github.com/sebmarkbage))
* افزودن hydration انتخابی. ([#14717](https://github.com/facebook/react/pull/14717), [#14884](https://github.com/facebook/react/pull/14884), [#16725](https://github.com/facebook/react/pull/16725), [#16880](https://github.com/facebook/react/pull/16880), [#17004](https://github.com/facebook/react/pull/17004), [#22416](https://github.com/facebook/react/pull/22416), [#22629](https://github.com/facebook/react/pull/22629), [#22448](https://github.com/facebook/react/pull/22448), [#22856](https://github.com/facebook/react/pull/22856), [#23176](https://github.com/facebook/react/pull/23176) by [@acdlite](https://github.com/acdlite), [@gaearon](https://github.com/gaearon), [@salazarm](https://github.com/salazarm), and [@sebmarkbage](https://github.com/sebmarkbage))
* افزودن `aria-description` به فهرست ویژگی‌های ARIA شناخته‌شده. ([#22142](https://github.com/facebook/react/pull/22142)  by [@mahyareb](https://github.com/mahyareb))
* افزودن رویداد `onResize` به عناصر ویدیویی. ([#21973](https://github.com/facebook/react/pull/21973)  by [@rileyjshaw](https://github.com/rileyjshaw))
* افزودن `imageSizes` و `imageSrcSet` به پراپس شناخته‌شده. ([#22550](https://github.com/facebook/react/pull/22550)  by [@eps1lon](https://github.com/eps1lon))
* اجازه دادن به children غیر-رشته‌ای `<option>` اگر `value` ارائه شده باشد.  ([#21431](https://github.com/facebook/react/pull/21431)  by [@sebmarkbage](https://github.com/sebmarkbage))
* رفع عدم اعمال استایل `aspectRatio`. ([#21100](https://github.com/facebook/react/pull/21100)  by [@gaearon](https://github.com/gaearon))
* هشدار اگر `renderSubtreeIntoContainer` فراخوانی شود. ([#23355](https://github.com/facebook/react/pull/23355)  by [@acdlite](https://github.com/acdlite))

### React DOM Server {/*react-dom-server-1*/}

* افزودن رندرر استریمی جدید. ([#14144](https://github.com/facebook/react/pull/14144), [#20970](https://github.com/facebook/react/pull/20970), [#21056](https://github.com/facebook/react/pull/21056), [#21255](https://github.com/facebook/react/pull/21255), [#21200](https://github.com/facebook/react/pull/21200), [#21257](https://github.com/facebook/react/pull/21257), [#21276](https://github.com/facebook/react/pull/21276), [#22443](https://github.com/facebook/react/pull/22443), [#22450](https://github.com/facebook/react/pull/22450), [#23247](https://github.com/facebook/react/pull/23247), [#24025](https://github.com/facebook/react/pull/24025), [#24030](https://github.com/facebook/react/pull/24030) by [@sebmarkbage](https://github.com/sebmarkbage))
* رفت providers کانتکست در SSR هنگام مدیریت چندین درخواست. ([#23171](https://github.com/facebook/react/pull/23171)  by [@frandiox](https://github.com/frandiox))
* بازگشت به رندر کلاینت هنگام عدم تطابق متن. ([#23354](https://github.com/facebook/react/pull/23354)  by [@acdlite](https://github.com/acdlite))
* منسوخ‌کردن `renderToNodeStream`. ([#23359](https://github.com/facebook/react/pull/23359)  by [@sebmarkbage](https://github.com/sebmarkbage))
* رفع یک لاگ خطای کاذب در رندرر سرور جدید. ([#24043](https://github.com/facebook/react/pull/24043)  by [@eps1lon](https://github.com/eps1lon))
* رفع یک باگ در رندرر سرور جدید. ([#22617](https://github.com/facebook/react/pull/22617)  by [@shuding](https://github.com/shuding))
* نادیده‌گرفتن مقادیر تابع و symbol درون عناصر سفارشی روی سرور. ([#21157](https://github.com/facebook/react/pull/21157)  by [@sebmarkbage](https://github.com/sebmarkbage))

### React DOM Test Utils {/*react-dom-test-utils*/}

* پرتاب هنگام استفاده از `act` در پروداکشن. ([#21686](https://github.com/facebook/react/pull/21686)  by [@acdlite](https://github.com/acdlite))
* پشتیبانی از غیرفعال‌سازی هشدارهای کاذب act با `global.IS_REACT_ACT_ENVIRONMENT`. ([#22561](https://github.com/facebook/react/pull/22561)  by [@acdlite](https://github.com/acdlite))
* گسترش هشدار act برای پوشش همهٔ APIهایی که ممکن است کار ری‌اکت زمان‌بندی کنند. ([#22607](https://github.com/facebook/react/pull/22607)  by [@acdlite](https://github.com/acdlite))
* دسته‌بندی به‌روزرسانی‌ها توسط `act`. ([#21797](https://github.com/facebook/react/pull/21797)  by [@acdlite](https://github.com/acdlite))
* حذف هشدار برای افکت‌های passive آویزان. ([#22609](https://github.com/facebook/react/pull/22609)  by [@acdlite](https://github.com/acdlite))

### React Refresh {/*react-refresh*/}

* پیگیری ریشه‌های mount‌شدهٔ دیرهنگام در Fast Refresh. ([#22740](https://github.com/facebook/react/pull/22740)  by [@anc95](https://github.com/anc95))
* افزودن فیلد `exports` به `package.json`. ([#23087](https://github.com/facebook/react/pull/23087)  by [@otakustay](https://github.com/otakustay))

### کامپوننت‌های سرور (آزمایشی) {/*server-components-experimental*/}

* افزودن پشتیبانی Server Context. ([#23244](https://github.com/facebook/react/pull/23244)  by [@salazarm](https://github.com/salazarm))
* افزودن پشتیبانی `lazy`. ([#24068](https://github.com/facebook/react/pull/24068)  by [@gnoff](https://github.com/gnoff))
* به‌روزرسانی webpack plugin برای webpack 5 ([#22739](https://github.com/facebook/react/pull/22739)  by [@michenly](https://github.com/michenly))
* رفع یک اشتباه در Node loader. ([#22537](https://github.com/facebook/react/pull/22537)  by [@btea](https://github.com/btea))
* استفاده از `globalThis` به‌جای `window` برای محیط‌های لبه (edge). ([#22777](https://github.com/facebook/react/pull/22777)  by [@huozhi](https://github.com/huozhi))
