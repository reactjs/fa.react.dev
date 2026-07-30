---
title: "از رده‌خارج‌کردن Create React App"
author: Matt Carroll and Ricky Hanlon
date: 2025/02/14
description: Today, we’re deprecating Create React App for new apps, and encouraging existing apps to migrate to a framework, or to migrate to a build tool like Vite, Parcel, or RSBuild. We’re also providing docs for when a framework isn’t a good fit for your project, you want to build your own framework, or you just want to learn how React works by building a React app from scratch.
---

14 فوریهٔ 2025 توسط [Matt Carroll](https://twitter.com/mattcarrollcode) و [Ricky Hanlon](https://bsky.app/profile/ricky.fm)

---

<Intro>

امروز، ما [Create React App](https://create-react-app.dev/) را برای اپلیکیشن‌های جدید منسوخ می‌کنیم، و اپلیکیشن‌های موجود را تشویق می‌کنیم به یک [فریم‌ورک](#how-to-migrate-to-a-framework) مهاجرت کنند، یا به یک [ابزار build](#how-to-migrate-to-a-build-tool) مانند Vite، Parcel یا RSBuild مهاجرت کنند.

ما همچنین مستنداتی را فراهم می‌کنیم برای زمانی که فریم‌ورک برای پروژهٔ شما مناسب نیست، می‌خواهید فریم‌ورک خودتان را بسازید، یا فقط می‌خواهید با [ساخت یک اپلیکیشن ری‌اکت از صفر](/learn/build-a-react-app-from-scratch) بفهمید ری‌اکت چگونه کار می‌کند.

</Intro>

-----

وقتی ما Create React App را در سال 2016 منتشر کردیم، روش روشنی برای ساخت یک اپلیکیشن جدید ری‌اکت وجود نداشت.

برای ایجاد یک اپلیکیشن ری‌اکت، باید مجموعه‌ای از ابزارها را نصب می‌کردید و خودتان آن‌ها را به هم متصل می‌کردید تا از قابلیت‌های پایه‌ای مانند JSX، linting و hot reloading پشتیبانی کند. این کار به‌درستی انجام دادن بسیار دشوار بود، بنابراین [جامعه](https://github.com/react-boilerplate/react-boilerplate) [بویلرپلیت‌هایی](https://github.com/kriasoft/react-starter-kit) برای [راه‌اندازی‌های](https://github.com/erikras/react-redux-universal-hot-example) [معمول](https://github.com/gaearon/react-hot-boilerplate) [ایجاد کرد](https://github.com/petehunt/react-boilerplate). با این حال، بویلرپلیت‌ها به‌روزرسانی دشواری داشتند و تکثیر آن‌ها انتشار قابلیت‌های جدید را برای ری‌اکت دشوار می‌کرد.

Create React App با ترکیب چندین ابزار در یک پیکربندی پیشنهادی واحد، این مشکلات را حل کرد. این به اپلیکیشن‌ها روش ساده‌ای برای ارتقا به قابلیت‌های ابزاری جدید داد، و به تیم ری‌اکت اجازه داد تغییرات ابزاری غیربدیهی (پشتیبانی از Fast Refresh، قواعد lint ری‌اکت هوک‌ها) را به گسترده‌ترین مخاطب ممکن مستقر کند.

این مدل چنان محبوب شد که امروزه دسته‌ای کامل از ابزارها به این روش کار می‌کنند.

## منسوخ‌کردن Create React App {/*deprecating-create-react-app*/}

اگرچه Create React App شروع به کار را آسان می‌کند، [چند محدودیت](#limitations-of-build-tools) وجود دارد که ساخت اپلیکیشن‌های عملیاتی با کارایی بالا را دشوار می‌کند. در اصل، می‌توانیم این مشکلات را با عملاً تبدیل‌کردن آن به یک [فریم‌ورک](#why-we-recommend-frameworks) حل کنیم.

با این حال، از آنجا که Create React App در حال حاضر هیچ نگهدار فعالی ندارد، و فریم‌ورک‌های متعددی وجود دارند که از قبل این مشکلات را حل می‌کنند، تصمیم گرفته‌ایم Create React App را منسوخ کنیم.

از امروز، اگر یک اپلیکیشن جدید نصب کنید، یک هشدار منسوخ‌شدگی خواهید دید:

<ConsoleBlockMulti>
<ConsoleLogLine level="error">

create-react-app is deprecated.
{'\n\n'}
You can find a list of up-to-date React frameworks on react.dev
For more info see: react.dev/link/cra
{'\n\n'}
This error message will only be shown once per install.

</ConsoleLogLine>
</ConsoleBlockMulti>

ما همچنین یک اعلان منسوخ‌شدگی به [وب‌سایت](https://create-react-app.dev/) Create React App و [مخزن](https://github.com/facebook/create-react-app) گیت‌هاب آن افزوده‌ایم. Create React App در حالت نگهداری به کار خود ادامه خواهد داد، و ما نسخهٔ جدیدی از Create React App را برای کار با React 19 منتشر کرده‌ایم.

## نحوهٔ مهاجرت به یک فریم‌ورک {/*how-to-migrate-to-a-framework*/}
ما [ایجاد اپلیکیشن‌های جدید ری‌اکت](/learn/creating-a-react-app) را با یک فریم‌ورک توصیه می‌کنیم. همهٔ فریم‌ورک‌هایی که توصیه می‌کنیم از رندر سمت کلاینت ([CSR](https://developer.mozilla.org/en-US/docs/Glossary/CSR)) و اپلیکیشن‌های تک‌صفحه‌ای ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)) پشتیبانی می‌کنند، و می‌توانند بدون سرور روی یک CDN یا سرویس میزبانی استاتیک مستقر شوند.

برای اپلیکیشن‌های موجود، این راهنماها به شما در مهاجرت به یک SPA صرفاً کلاینت کمک می‌کنند:

* [راهنمای مهاجرت Create React App در Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/from-create-react-app)
* [راهنمای پذیرش فریم‌ورک React Router](https://reactrouter.com/upgrading/component-routes).
* [راهنمای مهاجرت Expo webpack به Expo Router](https://docs.expo.dev/router/migrate/from-expo-webpack/)

## نحوهٔ مهاجرت به یک ابزار build {/*how-to-migrate-to-a-build-tool*/}

اگر اپلیکیشن شما محدودیت‌های غیرعادی دارد، یا ترجیح می‌دهید این مشکلات را با ساخت فریم‌ورک خودتان حل کنید، یا فقط می‌خواهید بفهمید ری‌اکت از پایه چگونه کار می‌کند، می‌توانید راه‌اندازی سفارشی خود را با ری‌اکت با استفاده از Vite، Parcel یا Rsbuild بسازید.

برای اپلیکیشن‌های موجود، این راهنماها به شما در مهاجرت به یک ابزار build کمک می‌کنند:

* [راهنمای مهاجرت Create React App به Vite](https://www.robinwieruch.de/vite-create-react-app/)
* [راهنمای مهاجرت Create React App به Parcel](https://parceljs.org/migration/cra/)
* [راهنمای مهاجرت Create React App به Rsbuild](https://rsbuild.dev/guide/migration/cra)

برای کمک به شروع به کار با Vite، Parcel یا Rsbuild، ما مستندات جدیدی برای [ساخت یک اپلیکیشن ری‌اکت از صفر](/learn/build-a-react-app-from-scratch) اضافه کرده‌ایم.

<DeepDive>

#### آیا به فریم‌ورک نیاز دارم؟ {/*do-i-need-a-framework*/}

بیشتر اپلیکیشن‌ها از یک فریم‌ورک بهره می‌برند، اما موارد معتبری برای ساخت یک اپلیکیشن ری‌اکت از صفر وجود دارد. یک قانون سرانگشتی خوب این است که اگر اپلیکیشن شما به مسیریابی (routing) نیاز دارد، احتمالاً از یک فریم‌ورک بهره خواهید برد. 

درست مانند اینکه Svelte دارای Sveltekit است، Vue دارای Nuxt، و Solid دارای SolidStart است، [ری‌اکت استفاده از یک فریم‌ورک را توصیه می‌کند](#why-we-recommend-frameworks) که مسیریابی را به‌طور کامل با قابلیت‌هایی مانند fetch داده و تقسیم کد به‌صورت خارج‌ازجعبه یکپارچه می‌کند. این کار از درد سر نوشتن پیکربندی‌های پیچیده خودتان و عملاً ساخت یک فریم‌ورک خودتان جلوگیری می‌کند.

با این حال، همیشه می‌توانید یک [اپلیکیشن ری‌اکت را از صفر بسازید](/learn/build-a-react-app-from-scratch) با استفاده از یک ابزار build مانند Vite، Parcel یا Rsbuild.

</DeepDive>

برای کسب اطلاعات بیشتر دربارهٔ [محدودیت‌های ابزارهای build](#limitations-of-build-tools) و [دلیل توصیه ما به فریم‌ورک‌ها](#why-we-recommend-frameworks) به خواندن ادامه دهید.

## محدودیت‌های ابزارهای build {/*limitations-of-build-tools*/}

Create React App و ابزارهای build مشابه آن، شروع ساخت یک اپلیکیشن ری‌اکت را آسان می‌کنند. پس از اجرای `npx create-react-app my-app`، یک اپلیکیشن ری‌اکت کاملاً پیکربندی‌شده با یک سرور توسعه، linting و build عملیاتی دریافت می‌کنید.

برای مثال، اگر در حال ساخت یک ابزار مدیریت داخلی هستید، می‌توانید با یک صفحهٔ فرود شروع کنید:

```js
export default function App() {
  return (
    <div>
      <h1>Welcome to the Admin Tool!</h1>
    </div>
  )
}
```

این به شما اجازه می‌دهد بلافاصله کدنویسی در ری‌اکت را با قابلیت‌هایی مانند JSX، قواعد lint پیش‌فرض و یک باندلر برای اجرا در توسعه و عملیات آغاز کنید. با این حال، این راه‌اندازی ابزارهای لازم برای ساخت یک اپلیکیشن عملیاتی واقعی را ندارد.

بیشتر اپلیکیشن‌های عملیاتی به راه‌حل‌هایی برای مشکلی مانند مسیریابی، fetch داده و تقسیم کد نیاز دارند.

### مسیریابی {/*routing*/}

Create React App شامل یک راه‌حل مسیریابی خاص نیست. اگر تازه شروع کرده‌اید، یک گزینه استفاده از `useState` برای جابه‌جایی میان مسیرهاست. اما انجام این کار بدان معناست که نمی‌توانید لینک‌هایی به اپلیکیشن خود به اشتراک بگذارید — هر لینک به همان صفحه می‌رود — و ساختاردهی اپلیکیشن شما در طول زمان دشوار می‌شود:

```js
import {useState} from 'react';

import Home from './Home';
import Dashboard from './Dashboard';

export default function App() {
  // ❌ Routing in state does not create URLs
  const [route, setRoute] = useState('home');
  return (
    <div>
      {route === 'home' && <Home />}
      {route === 'dashboard' && <Dashboard />}
    </div>
  )
}
```

به همین دلیل است که بیشتر اپلیکیشن‌هایی که از Create React App استفاده می‌کنند، مسیریابی را با یک کتابخانهٔ مسیریابی مانند [React Router](https://reactrouter.com/) یا [Tanstack Router](https://tanstack.com/router/latest) اضافه می‌کنند. با یک کتابخانهٔ مسیریابی، می‌توانید مسیرهای بیشتری به اپلیکیشن اضافه کنید که نظراتی دربارهٔ ساختار اپلیکیشن شما ارائه می‌دهد، و اجازه می‌دهد لینک‌هایی به مسیرها به اشتراک بگذارید. برای مثال، با React Router می‌توانید مسیرها را تعریف کنید:

```js
import {RouterProvider, createBrowserRouter} from 'react-router';

import Home from './Home';
import Dashboard from './Dashboard';

// ✅ Each route has it's own URL
const router = createBrowserRouter([
  {path: '/', element: <Home />},
  {path: '/dashboard', element: <Dashboard />}
]);

export default function App() {
  return (
    <RouterProvider value={router} />
  )
}
```

با این تغییر، می‌توانید یک لینک به `/dashboard` به اشتراک بگذارید و اپلیکیشن به صفحهٔ داشبورد ناوبری می‌کند. هنگامی که یک کتابخانهٔ مسیریابی داشته باشید، می‌توانید قابلیت‌های بیشتری مانند مسیرهای تودرتو، محافظان مسیر و ترنزیشن‌های مسیر را اضافه کنید، که بدون یک کتابخانهٔ مسیریابی پیاده‌سازی دشواری دارند.

اینجا یک مصالحه انجام می‌شود: کتابخانهٔ مسیریابی پیچیدگی را به اپلیکیشن اضافه می‌کند، اما قابلیت‌هایی را نیز اضافه می‌کند که بدون آن پیاده‌سازی دشواری دارند.

### fetch داده {/*data-fetching*/}

یک مشکل رایج دیگر در Create React App، fetch داده است. Create React App شامل یک راه‌حل fetch دادهٔ خاص نیست. اگر تازه شروع کرده‌اید، یک گزینهٔ رایج استفاده از `fetch` در یک افکت برای بارگذاری داده است.

اما انجام این کار بدان معناست که داده پس از رندر کامپوننت fetch می‌شود، که می‌تواند منجر به آبشارهای شبکه‌ای (network waterfalls) شود. آبشارهای شبکه‌ای ناشی از fetch داده هنگام رندر اپلیکیشن شما به‌جای موازی در حالی که کد در حال دانلود است، ایجاد می‌شوند:

```js
export default function Dashboard() {
  const [data, setData] = useState(null);

  // ❌ Fetching data in a component causes network waterfalls
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  )
}
```

fetch در یک افکت بدان معناست که کاربر باید برای دیدن محتوا بیشتر منتظر بماند، حتی اگر داده می‌توانست زودتر fetch شود. برای حل این مشکل، می‌توانید از یک کتابخانهٔ fetch داده مانند [React Query](https://react-query.tanstack.com/)، [SWR](https://swr.vercel.app/)، [Apollo](https://www.apollographql.com/docs/react) یا [Relay](https://relay.dev/) استفاده کنید که گزینه‌هایی برای prefetch داده فراهم می‌کنند تا درخواست پیش از رندر کامپوننت آغاز شود.

این کتابخانه‌ها زمانی بهترین کار را دارند که با الگوی «loader» مسیریابی شما یکپارچه شوند تا وابستگی‌های داده در سطح مسیر مشخص شود، که اجازه می‌دهد روتر fetchهای داده شما را بهینه کند:

```js
export async function loader() {
  const response = await fetch(`/api/data`);
  const data = await response.json();
  return data;
}

// ✅ Fetching data in parallel while the code is downloading
export default function Dashboard({loaderData}) {
  return (
    <div>
      {loaderData.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  )
}
```

در بارگذاری اولیه، روتر می‌تواند داده را بلافاصله پیش از رندر مسیر fetch کند. هنگامی که کاربر در اپلیکیشن ناوبری می‌کند، روتر می‌تواند هم داده و هم مسیر را همزمان fetch کند، و fetchها را موازی کند. این زمان لازم برای دیدن محتوا روی صفحه را کاهش می‌دهد، و می‌تواند تجربهٔ کاربر را بهبود دهد.

با این حال، این نیازمند پیکربندی صحیح loaderها در اپلیکیشن شماست و پیچیدگی را با عملکرد معامله می‌کند.

### تقسیم کد {/*code-splitting*/}

یک مشکل رایج دیگر در Create React App، [تقسیم کد](https://www.patterns.dev/vanilla/bundle-splitting) است. Create React App شامل یک راه‌حل تقسیم کد خاص نیست. اگر تازه شروع کرده‌اید، ممکن است اصلاً به تقسیم کد فکر نکنید.

این بدان معناست که اپلیکیشن شما به‌عنوان یک باندل واحد منتشر می‌شود:

```txt
- bundle.js    75kb
```

اما برای عملکرد ایده‌آل، باید کد خود را به باندل‌های جداگانه «تقسیم» کنید تا کاربر فقط آنچه را نیاز دارد دانلود کند. این کار با فقط دانلود کدی که برای دیدن صفحه‌ای که در آن هستند نیاز دارند، زمان انتظار کاربر برای بارگذاری اپلیکیشن شما را کاهش می‌دهد.

```txt
- core.js      25kb
- home.js      25kb
- dashboard.js 25kb
```

یک روش برای تقسیم کد استفاده از `React.lazy` است. با این حال، این بدان معناست که کد تا رندر کامپوننت fetch نمی‌شود، که می‌تواند منجر به آبشارهای شبکه‌ای شود. یک راه‌حل بهینه‌تر استفاده از یک قابلیت روتر است که کد را به‌صورت موازی در حالی که کد در حال دانلود است fetch می‌کند. برای مثال، React Router یک گزینهٔ `lazy` فراهم می‌کند تا مشخص کند یک مسیر باید تقسیم کد شود و زمان بارگذاری آن بهینه شود:

```js
import Home from './Home';
import Dashboard from './Dashboard';

// ✅ Routes are downloaded before rendering
const router = createBrowserRouter([
  {path: '/', lazy: () => import('./Home')},
  {path: '/dashboard', lazy: () => import('Dashboard')}
]);
```

تقسیم کد بهینه‌شده به‌درستی انجام دادن آن دشوار است، و اشتباهاتی که می‌توانند باعث شوند کاربر کد بیشتری از نیاز دانلود کند، آسان رخ می‌دهند. این کار زمانی بهترین کار را دارد که با روتر و راه‌حل‌های بارگذاری داده شما یکپارچه شود تا کش را به حداکثر برساند، fetchها را موازی کند، و از الگوهای ["import on interaction"](https://www.patterns.dev/vanilla/import-on-interaction) پشتیبانی کند.

### و بیشتر... {/*and-more*/}

این‌ها تنها چند نمونه از محدودیت‌های Create React App هستند.

پس از آنکه مسیریابی، fetch داده و تقسیم کد را یکپارچه کردید، اکنون باید استیت‌های در حالت انتظار، قطع ناوبری، پیام‌های خطا به کاربر، و اعتبارسنجی مجدد داده را نیز در نظر بگیرید. دسته‌های کاملی از مشکلات وجود دارند که کاربران باید حل کنند، مانند:

<div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
  <ul>
    <li>دسترس‌پذیری</li>
    <li>بارگذاری دارایی</li>
    <li>احراز هویت</li>
    <li>کش</li>
  </ul>
  <ul>
    <li>مدیریت خطا</li>
    <li>جهش داده</li>
    <li>ناوبری‌ها</li>
    <li>به‌روزرسانی‌های خوش‌بینانه</li>
  </ul>
  <ul>
    <li>افزایش تدریجی (Progressive enhancement)</li>
    <li>رندر سمت سرور</li>
    <li>تولید سایت استاتیک</li>
    <li>استریم</li>
  </ul>
</div>

همهٔ این‌ها با هم کار می‌کنند تا بهینه‌ترین [توالی بارگذاری](https://www.patterns.dev/vanilla/loading-sequence) را ایجاد کنند.

حل هر یک از این مشکلات به‌صورت منفرد در Create React App می‌تواند دشوار باشد زیرا هر مشکل با دیگران در هم تنیده است و می‌تواند نیازمند تخصص عمیقی در حوزه‌های مسئله باشد که کاربران ممکن است با آن آشنا نباشند. برای حل این مشکلات، کاربران در نهایت راه‌حل‌های سفارشی خود را بر روی Create React App می‌سازند، که همان مشکلی بود که Create React App در ابتدا سعی در حل آن داشت.

## چرا فریم‌ورک‌ها را توصیه می‌کنیم {/*why-we-recommend-frameworks*/}

اگرچه می‌توانید همهٔ این قطعات را خودتان در یک ابزار build مانند Create React App، Vite یا Parcel حل کنید، انجام آن به‌خوبی دشوار است. درست مانند زمانی که خود Create React App چندین ابزار build را با هم یکپارچه کرد، شما به ابزاری نیاز دارید که همهٔ این قابلیت‌ها را با هم یکپارچه کند تا بهترین تجربه را به کاربران ارائه دهد.

این دسته از ابزارها که ابزارهای build، رندر، مسیریابی، fetch داده و تقسیم کد را یکپارچه می‌کنند، به‌عنوان «فریم‌ورک» شناخته می‌شوند — یا اگر ترجیح می‌دهید خود ری‌اکت را یک فریم‌ورک بنامید، ممکن است آن‌ها «metaframework» بنامید.

فریم‌ورک‌ها برای ارائهٔ تجربهٔ کاربری بسیار بهتر، برخی نظرات را دربارهٔ ساختاردهی اپلیکیشن شما تحمیل می‌کنند، به همان روشی که ابزارهای build برخی نظرات را برای آسان‌کردن ابزار تحمیل می‌کنند. به همین دلیل است که ما شروع به توصیه فریم‌ورک‌هایی مانند [Next.js](https://nextjs.org/)، [React Router](https://reactrouter.com/) و [Expo](https://expo.dev/) برای پروژه‌های جدید کرده‌ایم.

فریم‌ورک‌ها همان تجربهٔ شروع به کار Create React App را فراهم می‌کنند، اما همچنین راه‌حل‌هایی برای مشکلاتی که کاربران به هر حال در اپلیکیشن‌های عملیاتی واقعی باید حل کنند ارائه می‌دهند.

<DeepDive>

#### رندر سمت سرور اختیاری است {/*server-rendering-is-optional*/}

فریم‌ورک‌هایی که ما توصیه می‌کنیم همگی گزینهٔ ایجاد یک اپلیکیشن [رندر سمت کلاینت (CSR)](https://developer.mozilla.org/en-US/docs/Glossary/CSR) را فراهم می‌کنند.

در برخی موارد، CSR انتخاب درستی برای یک صفحه است، اما اغلب نیست. حتی اگر بیشتر اپلیکیشن شما سمت کلاینت باشد، اغلب صفحات منفردی وجود دارند که می‌توانند از قابلیت‌های رندر سمت سرور مانند [تولید سایت استاتیک (SSG)](https://developer.mozilla.org/en-US/docs/Glossary/SSG) یا [رندر سمت سرور (SSR)](https://developer.mozilla.org/en-US/docs/Glossary/SSR) بهره ببرند، برای مثال یک صفحهٔ شرایط خدمات، یا مستندات.

رندر سمت سرور به‌طور کلی جاوااسکریپت کمتری به کلاینت ارسال می‌کند، و یک سند HTML کامل که [First Contentful Paint (FCP)](https://web.dev/articles/fcp) سریع‌تری با کاهش [Total Blocking Time (TBD)](https://web.dev/articles/tbt) تولید می‌کند، که همچنین می‌تواند [Interaction to Next Paint (INP)](https://web.dev/articles/inp) را کاهش دهد. به همین دلیل است که [تیم کروم تشویق کرده است](https://web.dev/articles/rendering-on-the-web) توسعه‌دهندگان را برای در نظر گرفتن رندر استاتیک یا سمت سرور به‌جای یک رویکرد کامل سمت کلاینت برای دستیابی به بهترین عملکرد ممکن.

استفاده از سرور دارای مصالحه‌هایی است، و همیشه بهترین گزینه برای هر صفحه نیست. تولید صفحات روی سرور هزینهٔ اضافی دربردارد و تولید زمان می‌برد که می‌تواند [Time to First Byte (TTFB)](https://web.dev/articles/ttfb) را افزایش دهد. اپلیکیشن‌های با بهترین عملکرد قادرند استراتژی رندر صحیح را به‌صورت هر صفحه، بر اساس مصالحه‌های هر استراتژی انتخاب کنند.

فریم‌ورک‌ها گزینهٔ استفاده از یک سرور در هر صفحه را اگر مایل باشید فراهم می‌کنند، اما شما را به استفاده از سرور مجبور نمی‌کنند. این به شما اجازه می‌دهد استراتژی رندر صحیح را برای هر صفحه در اپلیکیشن خود انتخاب کنید.

#### کامپوننت‌های سرور چه؟ {/*server-components*/}

فریم‌ورک‌هایی که ما توصیه می‌کنیم همچنین شامل پشتیبانی از کامپوننت‌های سرور (Server Components) ری‌اکت هستند.

کامپوننت‌های سرور با انتقال مسیریابی و fetch داده به سرور به حل این مشکلات کمک می‌کنند، و اجازه می‌دهند تقسیم کد برای کامپوننت‌های کلاینت بر اساس داده‌ای که رندر می‌کنید، به‌جای فقط مسیر رندرشده، انجام شود، و مقدار جاوااسکریپت ارسالی را برای بهترین [توالی بارگذاری](https://www.patterns.dev/vanilla/loading-sequence) ممکن کاهش دهند.

کامپوننت‌های سرور نیازی به سرور ندارند. آن‌ها می‌توانند در زمان build روی سرور CI شما برای ایجاد یک اپلیکیشن تولید سایت استاتیک (SSG) اجرا شوند، یا در زمان اجرا روی یک وب‌سرور برای یک اپلیکیشن رندر سمت سرور (SSR).

برای اطلاعات بیشتر [معرفی کامپوننت‌های سرور ری‌اکت با اندازهٔ باندل صفر](/blog/2020/12/21/data-fetching-with-react-server-components) و [مستندات](/reference/rsc/server-components) را ببینید.

</DeepDive>

<Note>

#### رندر سمت سرور فقط برای SEO نیست {/*server-rendering-is-not-just-for-seo*/}

یک سوءتفاهم رایج این است که رندر سمت سرور فقط برای [SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO) است.

در حالی که رندر سمت سرور می‌تواند SEO را بهبود دهد، همچنین عملکرد را با کاهش مقدار جاوااسکریپتی که کاربر باید پیش از دیدن محتوا روی صفحه دانلود و parse کند، بهبود می‌بخشد.

به همین دلیل است که تیم کروم [توسعه‌دهندگان را تشویق کرده است](https://web.dev/articles/rendering-on-the-web) تا برای دستیابی به بهترین عملکرد ممکن، رندر استاتیک یا سمت سرور را به‌جای یک رویکرد کامل سمت کلاینت در نظر بگیرند.

</Note>

---

_از [Dan Abramov](https://bsky.app/profile/danabra.mov) برای ایجاد Create React App، و از [Joe Haddad](https://github.com/Timer)، [Ian Schmitz](https://github.com/ianschmitz)، [Brody McKee](https://github.com/mrmckeb) و [بسیاری دیگر](https://github.com/facebook/create-react-app/graphs/contributors) برای نگهداری Create React App در طول سال‌ها سپاسگزاریم. از [Brooks Lybrand](https://bsky.app/profile/brookslybrand.bsky.social)، [Dan Abramov](https://bsky.app/profile/danabra.mov)، [Devon Govett](https://bsky.app/profile/devongovett.bsky.social)، [Eli White](https://x.com/Eli_White)، [Jack Herrington](https://bsky.app/profile/jherr.dev)، [Joe Savona](https://x.com/en_JS)، [Lauren Tan](https://bsky.app/profile/no.lol)، [Lee Robinson](https://x.com/leeerob)، [Mark Erikson](https://bsky.app/profile/acemarke.dev)، [Ryan Florence](https://x.com/ryanflorence)، [Sophie Alpert](https://bsky.app/profile/sophiebits.com)، [Tanner Linsley](https://bsky.app/profile/tannerlinsley.com) و [Theo Browne](https://x.com/theo) برای بازبینی و ارائهٔ بازخورد بر این پست سپاسگزاریم._

