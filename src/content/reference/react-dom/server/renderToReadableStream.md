---
title: renderToReadableStream
---

<Intro>

`renderToReadableStream` یک درخت ری‌اکت را به یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) رندر می‌کند.

```js
const stream = await renderToReadableStream(reactNode, options?)
```

</Intro>

<InlineToc />

<Note>

این API به [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) وابسته است. برای Node.js، به‌جای آن از [`renderToPipeableStream`](/reference/react-dom/server/renderToPipeableStream) استفاده کنید.

</Note>

---

## مرجع {/*reference*/}

### `renderToReadableStream(reactNode, options?)` {/*rendertoreadablestream*/}

برای رندر درخت ری‌اکت خود به‌صورت HTML در یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)، `renderToReadableStream` را فراخوانی کنید.

```js
import { renderToReadableStream } from 'react-dom/server';

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

در کلاینت، [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی کنید تا HTML تولیدشده توسط سرور تعاملی شود.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `reactNode`: یک گرهٔ ری‌اکت که می‌خواهید به HTML رندر شود. مثلاً یک المان JSX مانند `<App />`. انتظار می‌رود کل سند را نمایش دهد، بنابراین کامپوننت `App` باید تگ `<html>` را رندر کند.

* **اختیاری** `options`: یک شیء با گزینه‌های streaming.
  * **اختیاری** `bootstrapScriptContent`: اگر مشخص شود، این رشته در یک تگ `<script>` درون‌خطی قرار می‌گیرد.
  * **اختیاری** `bootstrapScripts`: آرایه‌ای از URLهای رشته‌ای برای تگ‌های `<script>` که در صفحه emit شوند. از این برای include کردن `<script>` که [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی می‌کند استفاده کنید. اگر اصلاً نمی‌خواهید ری‌اکت را روی کلاینت اجرا کنید، آن را حذف کنید.
  * **اختیاری** `bootstrapModules`: مانند `bootstrapScripts`، اما به‌جای آن [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) emit می‌کند.
  * **اختیاری** `identifierPrefix`: یک پیشوند رشته‌ای که ری‌اکت برای IDهای تولیدشده توسط [`useId`](/reference/react/useId) استفاده می‌کند. برای جلوگیری از تداخل هنگام استفاده از چندین root در همان صفحه مفید است. باید همان پیشوندی باشد که به [`hydrateRoot`](/reference/react-dom/client/hydrateRoot#parameters) پاس داده شده است.
  * **اختیاری** `namespaceURI`: یک رشته با [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) ریشه برای stream. پیش‌فرض HTML معمولی است. برای SVG مقدار `'http://www.w3.org/2000/svg'` و برای MathML مقدار `'http://www.w3.org/1998/Math/MathML'` را پاس دهید.
  * **اختیاری** `nonce`: یک رشتهٔ [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) برای اجازه دادن به اسکریپت‌ها برای [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
  * **اختیاری** `onError`: یک کالبک که هر زمان که یک خطای سرور رخ می‌دهد فعال می‌شود، چه [قابل بازیابی](#recovering-from-errors-outside-the-shell) چه [غیرقابل بازیابی.](#recovering-from-errors-inside-the-shell) به‌طور پیش‌فرض، فقط `console.error` را فراخوانی می‌کند. اگر آن را برای [ثبت گزارش‌های خرابی](#logging-crashes-on-the-server) بازنویسی می‌کنید، مطمئن شوید همچنان `console.error` را فراخوانی می‌کنید. همچنین می‌توانید از آن برای [تنظیم کد وضعیت](#setting-the-status-code) قبل از emit شدن shell استفاده کنید.
  * **اختیاری** `progressiveChunkSize`: تعداد بایت‌ها در یک chunk. [اطلاعات بیشتر دربارهٔ heuristic پیش‌فرض.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)
  * **اختیاری** `signal`: یک [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) که به شما اجازه می‌دهد [رندر سمت سرور را لغو کنید](#aborting-server-rendering) و بقیه را در کلاینت رندر کنید.


#### مقادیر بازگشتی {/*returns*/}

`renderToReadableStream` یک Promise برمی‌گرداند:

- اگر رندر [shell](#specifying-what-goes-into-the-shell) موفق باشد، آن Promise با یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) resolve می‌شود.
- اگر رندر shell ناموفق باشد، Promise رد (reject) می‌شود. [از این برای خروجی دادن یک shell جایگزین استفاده کنید.](#recovering-from-errors-inside-the-shell)

stream بازگشتی یک ویژگی اضافی دارد:

* `allReady`: یک Promise که وقتی تمام رندر کامل شود resolve می‌شود، شامل هر دو [shell](#specifying-what-goes-into-the-shell) و تمام [محتوای](#streaming-more-content-as-it-loads) اضافی. می‌توانید `await stream.allReady` را پیش از بازگرداندن یک پاسخ [برای خزشگرها و تولید استاتیک](#waiting-for-all-content-to-load-for-crawlers-and-static-generation) انجام دهید. اگر این کار را بکنید، هیچ بارگذاری پیشرونده‌ای دریافت نخواهید کرد. stream حاوی HTML نهایی خواهد بود.

---

## استفاده {/*usage*/}

### رندر یک درخت ری‌اکت به‌صورت HTML در یک Readable Web Stream {/*rendering-a-react-tree-as-html-to-a-readable-web-stream*/}

برای رندر درخت ری‌اکت خود به‌صورت HTML در یک [Readable Web Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)، `renderToReadableStream` را فراخوانی کنید:

```js [[1, 4, "<App />"], [2, 5, "['/main.js']"]]
import { renderToReadableStream } from 'react-dom/server';

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

در کنار <CodeStep step={1}>کامپوننت ریشه</CodeStep>، باید فهرستی از <CodeStep step={2}>مسیرهای `<script>` بوت‌استرپ</CodeStep> ارائه کنید. کامپوننت ریشهٔ شما باید **کل سند از جمله تگ `<html>` ریشه را برگرداند.**

مثلاً، ممکن است به این شکل باشد:

```js [[1, 1, "App"]]
export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css"></link>
        <title>My app</title>
      </head>
      <body>
        <Router />
      </body>
    </html>
  );
}
```

ری‌اکت [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) و تگ‌های <CodeStep step={2}>`<script>` بوت‌استرپ</CodeStep> شما را در stream HTML حاصله تزریق می‌کند:

```html [[2, 5, "/main.js"]]
<!DOCTYPE html>
<html>
  <!-- ... HTML from your components ... -->
</html>
<script src="/main.js" async=""></script>
```

در کلاینت، اسکریپت بوت‌استرپ شما باید [کل `document` را با فراخوانی `hydrateRoot` هیدریشن کند:](/reference/react-dom/client/hydrateRoot#hydrating-an-entire-document)

```js [[1, 4, "<App />"]]
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App />);
```

این کار گوش‌دهنده‌های رویداد را به HTML تولیدشده توسط سرور متصل می‌کند و آن را تعاملی می‌سازد.

<DeepDive>

#### خواندن مسیرهای assetهای CSS و JS از خروجی build {/*reading-css-and-js-asset-paths-from-the-build-output*/}

URLهای نهایی asset (مانند فایل‌های JavaScript و CSS) اغلب پس از build هش می‌شوند. مثلاً به‌جای `styles.css` ممکن است با `styles.123456.css` مواجه شوید. هش کردن نام فایل‌های asset استاتیک تضمین می‌کند که هر build متفاوت از همان asset یک نام فایل متفاوت خواهد داشت. این مفید است زیرا به شما اجازه می‌دهد کش long-term را برای assetهای استاتیک به‌طور امن فعال کنید: فایلی با نام مشخص هرگز محتوایش تغییر نخواهد کرد.

با این حال، اگر URLهای asset را تا پس از build نمی‌دانید، راهی برای قرار دادن آن‌ها در کد منبع ندارید. مثلاً hardcoding `"/styles.css"` در JSX مانند قبل کار نخواهد کرد. برای نگه‌داشتن آن‌ها بیرون از کد منبع، کامپوننت ریشهٔ شما می‌تواند نام فایل‌های واقعی را از یک map که به‌عنوان پراپس پاس شده می‌خواند:

```js {1,6}
export default function App({ assetMap }) {
  return (
    <html>
      <head>
        <title>My app</title>
        <link rel="stylesheet" href={assetMap['styles.css']}></link>
      </head>
      ...
    </html>
  );
}
```

در سرور، `<App assetMap={assetMap} />` را رندر کنید و `assetMap` خود را با URLهای asset پاس دهید:

```js {1-5,8,9}
// You'd need to get this JSON from your build tooling, e.g. read it from the build output.
const assetMap = {
  'styles.css': '/styles.123456.css',
  'main.js': '/main.123456.js'
};

async function handler(request) {
  const stream = await renderToReadableStream(<App assetMap={assetMap} />, {
    bootstrapScripts: [assetMap['/main.js']]
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

از آنجا که سرور شما اکنون `<App assetMap={assetMap} />` را رندر می‌کند، باید آن را در کلاینت نیز با `assetMap` رندر کنید تا از خطاهای هیدریشن (Hydration) جلوگیری شود. می‌توانید `assetMap` را serialize کرده و به این شکل به کلاینت پاس دهید:

```js {9-10}
// You'd need to get this JSON from your build tooling.
const assetMap = {
  'styles.css': '/styles.123456.css',
  'main.js': '/main.123456.js'
};

async function handler(request) {
  const stream = await renderToReadableStream(<App assetMap={assetMap} />, {
    // Careful: It's safe to stringify() this because this data isn't user-generated.
    bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,
    bootstrapScripts: [assetMap['/main.js']],
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

در مثال بالا، گزینهٔ `bootstrapScriptContent` یک تگ `<script>` درون‌خطی اضافی اضافه می‌کند که متغیر `window.assetMap` سراسری را روی کلاینت تنظیم می‌کند. این به کد کلاینت اجازه می‌دهد همان `assetMap` را بخواند:

```js {4}
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```

هم کلاینت و هم سرور `App` را با همان پراپس `assetMap` رندر می‌کنند، بنابراین خطای هیدریشن وجود نخواهد داشت.

</DeepDive>

---

### استریم کردن محتوای بیشتر هنگام بارگذاری {/*streaming-more-content-as-it-loads*/}

استریم کردن به کاربر اجازه می‌دهد محتوا را حتی قبل از اینکه تمام داده‌ها روی سرور بارگذاری شده باشند ببیند. مثلاً، یک صفحهٔ پروفایل را در نظر بگیرید که یک cover، یک نوار کناری با دوستان و عکس‌ها، و فهرستی از پست‌ها را نشان می‌دهد:

```js
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Sidebar>
        <Friends />
        <Photos />
      </Sidebar>
      <Posts />
    </ProfileLayout>
  );
}
```

تصور کنید بارگذاری داده‌ها برای `<Posts />` مدتی طول می‌کشد. ایده‌آل این است که بقیهٔ محتوای صفحهٔ پروفایل را بدون انتظار برای پست‌ها به کاربر نشان دهید. برای این کار، [ `Posts` را در یک مرز `<Suspense>` بپیچید:](/reference/react/Suspense#displaying-a-fallback-while-content-is-loading)

```js {9,11}
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Sidebar>
        <Friends />
        <Photos />
      </Sidebar>
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  );
}
```

این به ری‌اکت می‌گوید که streaming HTML را قبل از بارگذاری داده‌های `Posts` آغاز کند. ری‌اکت ابتدا HTML برای fallback بارگذاری (`PostsGlimmer`) را ارسال می‌کند، و سپس وقتی `Posts` بارگذاری داده‌هایش را تمام کرد، ری‌اکت بقیهٔ HTML را همراه با یک تگ `<script>` درون‌خطی که fallback بارگذاری را با آن HTML جایگزین می‌کند ارسال می‌کند. از دید کاربر، صفحه ابتدا با `PostsGlimmer` ظاهر می‌شود و بعداً با `Posts` جایگزین می‌گردد.

شما می‌توانید برای ایجاد یک توالی بارگذاری دقیق‌تر، [مرزهای `<Suspense>` را تودرتو کنید](/reference/react/Suspense#revealing-nested-content-as-it-loads):

```js {5,13}
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Suspense fallback={<BigSpinner />}>
        <Sidebar>
          <Friends />
          <Photos />
        </Sidebar>
        <Suspense fallback={<PostsGlimmer />}>
          <Posts />
        </Suspense>
      </Suspense>
    </ProfileLayout>
  );
}
```


در این مثال، ری‌اکت می‌تواند streaming صفحه را حتی زودتر آغاز کند. فقط `ProfileLayout` و `ProfileCover` باید ابتدا رندر را تمام کنند زیرا در هیچ مرز `<Suspense>` بپیچیده نشده‌اند. با این حال، اگر `Sidebar`، `Friends` یا `Photos` نیاز به بارگذاری داده‌هایی داشته باشند، ری‌اکت به‌جای آن HTML برای fallback `BigSpinner` را ارسال می‌کند. سپس، هرچه داده‌های بیشتری در دسترس قرار بگیرد، محتوای بیشتری تا زمانی که همهٔ آن‌ها قابل‌مشاهده شوند نمایان خواهد شد.

استریم کردن نیازی به انتظار برای بارگذاری خود ری‌اکت در مرورگر یا تعاملی شدن اپلیکیشن شما ندارد. محتوای HTML از سرور قبل از بارگذاری هر یک از تگ‌های `<script>` به‌صورت پیشرونده نمایان خواهد شد.

[اطلاعات بیشتر دربارهٔ نحوهٔ کار streaming HTML.](https://github.com/reactwg/react-18/discussions/37)

<Note>

**فقط منابع دادهٔ فعال‌ساز ساسپنس، کامپوننت Suspense را فعال می‌کنند.** این موارد شامل:

- دریافت داده با فریم‌ورک‌های فعال‌ساز ساسپنس مانند [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) و [Next.js](https://nextjs.org/docs/getting-started/react-essentials)
- بارگذاری تنبل (Lazy Loading) کد کامپوننت با [`lazy`](/reference/react/lazy)
- خواندن مقدار یک Promise با [`use`](/reference/react/use)

ساسپنس **تشخیص نمی‌دهد** که چه زمانی داده‌ها درون یک افکت یا هندلر رویداد دریافت می‌شوند.

روش دقیق بارگذاری داده‌ها در کامپوننت `Posts` در بالا به فریم‌ورک شما بستگی دارد. اگر از یک فریم‌ورک فعال‌ساز ساسپنس استفاده می‌کنید، جزئیات را در مستندات دریافت دادهٔ آن خواهید یافت.

دریافت دادهٔ فعال‌ساز ساسپنس بدون استفاده از یک فریم‌ورک opinionated هنوز پشتیبانی نمی‌شود. الزامات برای پیاده‌سازی یک منبع دادهٔ فعال‌ساز ساسپنس ناپایدار و بدون مستند هستند. یک API رسمی برای یکپارچه‌سازی منابع داده با ساسپنس در نسخهٔ آیندهٔ ری‌اکت منتشر خواهد شد. 

</Note>

---

### مشخص کردن آنچه در shell قرار می‌گیرد {/*specifying-what-goes-into-the-shell*/}

بخشی از اپلیکیشن شما که بیرون از هر مرز `<Suspense>` قرار دارد *shell* نامیده می‌شود:

```js {3-5,13,14}
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Suspense fallback={<BigSpinner />}>
        <Sidebar>
          <Friends />
          <Photos />
        </Sidebar>
        <Suspense fallback={<PostsGlimmer />}>
          <Posts />
        </Suspense>
      </Suspense>
    </ProfileLayout>
  );
}
```

این اولین حالت بارگذاری که کاربر ممکن است ببیند را تعیین می‌کند:

```js {3-5,13
<ProfileLayout>
  <ProfileCover />
  <BigSpinner />
</ProfileLayout>
```

اگر کل اپلیکیشن را در یک مرز `<Suspense>` در ریشه بپیچانید، shell فقط شامل آن spinner خواهد بود. با این حال، این تجربهٔ کاربری مطلوبی نیست زیرا دیدن یک spinner بزرگ روی صفحه می‌تواند کندتر و آزاردهنده‌تر از انتظار کمی بیشتر و دیدن چیدمان واقعی به‌نظر برسد. به همین دلیل معمولاً می‌خواهید مرزهای `<Suspense>` را طوری قرار دهید که shell *حداقلی اما کامل* به‌نظر برسد — مانند یک اسکلتون از کل چیدمان صفحه.

فراخوانی async به `renderToReadableStream` به‌محض اینکه کل shell رندر شود با یک `stream` resolve می‌گردد. معمولاً، streaming را با ایجاد و بازگرداندن یک پاسخ با آن `stream` آغاز می‌کنید:

```js {5}
async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

تا زمانی که `stream` بازگردانده می‌شود، کامپوننت‌ها در مرزهای `<Suspense>` تودرتو ممکن است همچنان در حال بارگذاری داده‌ها باشند.

---

### ثبت گزارش خرابی‌ها روی سرور {/*logging-crashes-on-the-server*/}

به‌طور پیش‌فرض، تمام خطاها روی سرور در کنسول ثبت می‌شوند. می‌توانید این رفتار را برای ثبت گزارش‌های خرابی بازنویسی کنید:

```js {4-7}
async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/main.js'],
    onError(error) {
      console.error(error);
      logServerCrashReport(error);
    }
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}
```

اگر یک پیاده‌سازی سفارشی `onError` ارائه می‌دهید، فراموش نکنید که همچنان خطاها را در کنسول مانند بالا ثبت کنید.

---

### بازیابی از خطاهای داخل shell {/*recovering-from-errors-inside-the-shell*/}

در این مثال، shell شامل `ProfileLayout`، `ProfileCover` و `PostsGlimmer` است:

```js {3-5,7-8}
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  );
}
```

اگر خطایی هنگام رندر این کامپوننت‌ها رخ دهد، ری‌اکت HTML معناداری برای ارسال به کلاینت نخواهد داشت. فراخوانی `renderToReadableStream` خود را در یک `try...catch` بپیچید تا به‌عنوان آخرین راه‌حل، HTML جایگزینی که به رندر سمت سرور وابسته نیست ارسال کنید:

```js {2,13-18}
async function handler(request) {
  try {
    const stream = await renderToReadableStream(<App />, {
      bootstrapScripts: ['/main.js'],
      onError(error) {
        console.error(error);
        logServerCrashReport(error);
      }
    });
    return new Response(stream, {
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'content-type': 'text/html' },
    });
  }
}
```

اگر هنگام تولید shell خطایی وجود داشته باشد، هم `onError` و هم بلوک `catch` شما فعال می‌شوند. از `onError` برای گزارش خطا و از بلوک `catch` برای ارسال سند HTML جایگزین استفاده کنید. HTML جایگزین شما لزوماً یک صفحهٔ خطا نیست. به‌جای آن، می‌توانید یک shell جایگزین include کنید که اپلیکیشن شما را فقط روی کلاینت رندر می‌کند.

---

### بازیابی از خطاهای بیرون shell {/*recovering-from-errors-outside-the-shell*/}

در این مثال، کامپوننت `<Posts />` در `<Suspense>` بپیچیده شده است بنابراین *بخشی از* shell نیست:

```js {6}
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  );
}
```

اگر خطایی در کامپوننت `Posts` یا جایی درون آن رخ دهد، ری‌اکت سعی می‌کند [از آن بازیابی کند:](/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content)

1. fallback بارگذاری برای نزدیک‌ترین مرز `<Suspense>` (`PostsGlimmer`) را در HTML emit می‌کند.
2. از تلاش برای رندر محتوای `Posts` روی سرور «صرف‌نظر» می‌کند.
3. وقتی کد JavaScript روی کلاینت بارگذاری می‌شود، ری‌اکت رندر `Posts` را روی کلاینت *دوباره امتحان* می‌کند.

اگر تلاش مجدد برای رندر `Posts` روی کلاینت *هم* ناموفق باشد، ری‌اکت خطا را روی کلاینت پرتاب می‌کند. مانند تمام خطاهای پرتاب‌شده در طول رندر، [نزدیک‌ترین مرز خطای والد](/reference/react/Component#static-getderivedstatefromerror) تعیین می‌کند که چگونه خطا به کاربر ارائه شود. در عمل، این بدان معناست که کاربر یک نشانگر بارگذاری را تا زمانی که مطمئن شود خطا غیرقابل بازیابی است خواهد دید.

اگر تلاش مجدد برای رندر `Posts` روی کلاینت موفق باشد، fallback بارگذاری از سرور با خروجی رندر کلاینت جایگزین خواهد شد. کاربر متوجه نخواهد شد که خطای سروری وجود داشته است. با این حال، کالبک `onError` سرور و کالبک‌های [`onRecoverableError`](/reference/react-dom/client/hydrateRoot#hydrateroot) کلاینت فعال می‌شوند تا شما از خطا مطلع شوید.

---

### تنظیم کد وضعیت {/*setting-the-status-code*/}

استریم کردن یک tradeoff معرفی می‌کند. می‌خواهید streaming صفحه را تا حد امکان زود آغاز کنید تا کاربر زودتر محتوا را ببیند. با این حال، وقتی streaming را آغاز می‌کنید، دیگر نمی‌توانید کد وضعیت پاسخ را تنظیم کنید.

با [تقسیم اپلیکیشن خود](#specifying-what-goes-into-the-shell) به shell (بالای تمام مرزهای `<Suspense>`) و بقیهٔ محتوا، قبلاً بخشی از این مشکل را حل کرده‌اید. اگر shell خطا کند، بلوک `catch` شما اجرا می‌شود که به شما اجازه می‌دهد کد وضعیت خطا را تنظیم کنید. در غیر این صورت، می‌دانید که اپلیکیشن ممکن است روی کلاینت بازیابی شود، بنابراین می‌توانید «OK» ارسال کنید.

```js {11}
async function handler(request) {
  try {
    const stream = await renderToReadableStream(<App />, {
      bootstrapScripts: ['/main.js'],
      onError(error) {
        console.error(error);
        logServerCrashReport(error);
      }
    });
    return new Response(stream, {
      status: 200,
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'content-type': 'text/html' },
    });
  }
}
```

اگر کامپوننتی *بیرون* shell (یعنی داخل یک مرز `<Suspense>`) خطا پرتاب کند، ری‌اکت رندر را متوقف نخواهد کرد. این بدان معناست که کالبک `onError` فعال خواهد شد، اما کد شما بدون ورود به بلوک `catch` به اجرا ادامه خواهد داد. این به این دلیل است که ری‌اکت سعی می‌کند از آن خطا روی کلاینت بازیابی کند، [همانطور که در بالا توضیح داده شد.](#recovering-from-errors-outside-the-shell)

با این حال، اگر مایل هستید، می‌توانید از این واقعیت که چیزی خطا داده برای تنظیم کد وضعیت استفاده کنید:

```js {3,7,13}
async function handler(request) {
  try {
    let didError = false;
    const stream = await renderToReadableStream(<App />, {
      bootstrapScripts: ['/main.js'],
      onError(error) {
        didError = true;
        console.error(error);
        logServerCrashReport(error);
      }
    });
    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'content-type': 'text/html' },
    });
  }
}
```

این فقط خطاهای بیرون shell که هنگام تولید محتوای اولیهٔ shell رخ داده‌اند را شکار می‌کند، بنابراین جامع نیست. اگر دانستن اینکه آیا خطایی برای محتوایی رخ داده است حیاتی است، می‌توانید آن را به shell منتقل کنید.

---

### مدیریت خطاهای مختلف به روش‌های مختلف {/*handling-different-errors-in-different-ways*/}

شما می‌توانید [زیرکلاس‌های `Error` خودتان را بسازید](https://javascript.info/custom-errors) و از عملگر [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) برای بررسی اینکه کدام خطا پرتاب شده استفاده کنید. مثلاً، می‌توانید یک `NotFoundError` سفارشی تعریف کنید و آن را از کامپوننت خود پرتاب کنید. سپس می‌توانید خطا را در `onError` ذخیره کنید و بسته به نوع خطا قبل از بازگرداندن پاسخ کار متفاوتی انجام دهید:

```js {2-3,5-15,22,28,33}
async function handler(request) {
  let didError = false;
  let caughtError = null;

  function getStatusCode() {
    if (didError) {
      if (caughtError instanceof NotFoundError) {
        return 404;
      } else {
        return 500;
      }
    } else {
      return 200;
    }
  }

  try {
    const stream = await renderToReadableStream(<App />, {
      bootstrapScripts: ['/main.js'],
      onError(error) {
        didError = true;
        caughtError = error;
        console.error(error);
        logServerCrashReport(error);
      }
    });
    return new Response(stream, {
      status: getStatusCode(),
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: getStatusCode(),
      headers: { 'content-type': 'text/html' },
    });
  }
}
```

در نظر داشته باشید که وقتی shell را emit می‌کنید و streaming را آغاز می‌کنید، نمی‌توانید کد وضعیت را تغییر دهید.

---

### انتظار برای بارگذاری تمام محتوا برای خزشگرها و تولید استاتیک {/*waiting-for-all-content-to-load-for-crawlers-and-static-generation*/}

استریم کردن تجربهٔ کاربری بهتری ارائه می‌دهد زیرا کاربر می‌تواند محتوا را هر زمان که در دسترس قرار می‌گیرد ببیند.

با این حال، وقتی یک خزشگر از صفحهٔ شما بازدید می‌کند، یا اگر در حال تولید صفحات در زمان build هستید، ممکن است بخواهید ابتدا اجازه دهید تمام محتوا بارگذاری شود و سپس خروجی HTML نهایی را به‌جای نمایان شدن پیشرونده تولید کنید.

می‌توانید با await کردن Promise `stream.allReady` برای بارگذاری تمام محتوا انتظار کنید:

```js {12-15}
async function handler(request) {
  try {
    let didError = false;
    const stream = await renderToReadableStream(<App />, {
      bootstrapScripts: ['/main.js'],
      onError(error) {
        didError = true;
        console.error(error);
        logServerCrashReport(error);
      }
    });
    let isCrawler = // ... depends on your bot detection strategy ...
    if (isCrawler) {
      await stream.allReady;
    }
    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { 'content-type': 'text/html' },
    });
  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'content-type': 'text/html' },
    });
  }
}
```

یک بازدیدکنندهٔ عادی stream از محتوای به‌تدریج بارگذاری‌شده دریافت خواهد کرد. یک خزشگر پس از بارگذاری تمام داده‌ها خروجی HTML نهایی را دریافت خواهد کرد. با این حال، این همچنین بدان معناست که خزشگر باید برای *تمام* داده‌ها انتظار کند، که برخی از آن‌ها ممکن است بارگذاری کند یا خطا دهند. بسته به اپلیکیشن شما، می‌توانید انتخاب کنید که shell را نیز به خزشگرها ارسال کنید.

---

### لغو رندر سمت سرور {/*aborting-server-rendering*/}

می‌توانید رندر سمت سرور را پس از یک timeout مجبور به «صرف‌نظر» کنید:

```js {3,4-6,9}
async function handler(request) {
  try {
    const controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, 10000);

    const stream = await renderToReadableStream(<App />, {
      signal: controller.signal,
      bootstrapScripts: ['/main.js'],
      onError(error) {
        didError = true;
        console.error(error);
        logServerCrashReport(error);
      }
    });
    // ...
```

ری‌اکت fallbackهای بارگذاری باقی‌مانده را به‌عنوان HTML flush می‌کند و سعی می‌کند بقیه را روی کلاینت رندر کند.
