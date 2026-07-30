---
title: prerenderToNodeStream
---

<Intro>

`prerenderToNodeStream` یک درخت ری‌اکت را به یک رشتهٔ HTML استاتیک با استفاده از [Node.js Stream](https://nodejs.org/api/stream.html) رندر می‌کند.

```js
const {prelude} = await prerenderToNodeStream(reactNode, options?)
```

</Intro>

<InlineToc />

<Note>

این API مخصوص Node.js است. محیط‌هایی با [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) مانند Deno و runtimeهای edge مدرن باید به‌جای آن از [`prerender`](/reference/react-dom/static/prerender) استفاده کنند.

</Note>

---

## مرجع {/*reference*/}

### `prerenderToNodeStream(reactNode, options?)` {/*prerender*/}

برای رندر اپلیکیشن خود به HTML استاتیک، `prerenderToNodeStream` را فراخوانی کنید.

```js
import { prerenderToNodeStream } from 'react-dom/static';

// The route handler syntax depends on your backend framework
app.use('/', async (request, response) => {
  const { prelude } = await prerenderToNodeStream(<App />, {
    bootstrapScripts: ['/main.js'],
  });

  response.setHeader('Content-Type', 'text/plain');
  prelude.pipe(response);
});
```

در کلاینت، [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی کنید تا HTML تولیدشده توسط سرور تعاملی شود.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `reactNode`: یک گرهٔ ری‌اکت که می‌خواهید به HTML رندر شود. مثلاً یک گرهٔ JSX مانند `<App />`. انتظار می‌رود کل سند را نمایش دهد، بنابراین کامپوننت App باید تگ `<html>` را رندر کند.

* **اختیاری** `options`: یک شیء با گزینه‌های تولید استاتیک.
  * **اختیاری** `bootstrapScriptContent`: اگر مشخص شود، این رشته در یک تگ `<script>` درون‌خطی قرار می‌گیرد.
  * **اختیاری** `bootstrapScripts`: آرایه‌ای از URLهای رشته‌ای برای تگ‌های `<script>` که در صفحه emit شوند. از این برای include کردن `<script>` که [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی می‌کند استفاده کنید. اگر اصلاً نمی‌خواهید ری‌اکت را روی کلاینت اجرا کنید، آن را حذف کنید.
  * **اختیاری** `bootstrapModules`: مانند `bootstrapScripts`، اما به‌جای آن [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) emit می‌کند.
  * **اختیاری** `identifierPrefix`: یک پیشوند رشته‌ای که ری‌اکت برای IDهای تولیدشده توسط [`useId`](/reference/react/useId) استفاده می‌کند. برای جلوگیری از تداخل هنگام استفاده از چندین root در همان صفحه مفید است. باید همان پیشوندی باشد که به [`hydrateRoot`](/reference/react-dom/client/hydrateRoot#parameters) پاس داده شده است.
  * **اختیاری** `namespaceURI`: یک رشته با [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) ریشه برای stream. پیش‌فرض HTML معمولی است. برای SVG مقدار `'http://www.w3.org/2000/svg'` و برای MathML مقدار `'http://www.w3.org/1998/Math/MathML'` را پاس دهید.
  * **اختیاری** `onError`: یک کالبک که هر زمان که یک خطای سرور رخ می‌دهد فعال می‌شود، چه [قابل بازیابی](/reference/react-dom/server/renderToPipeableStream#recovering-from-errors-outside-the-shell) چه [غیرقابل بازیابی.](/reference/react-dom/server/renderToPipeableStream#recovering-from-errors-inside-the-shell) به‌طور پیش‌فرض، فقط `console.error` را فراخوانی می‌کند. اگر آن را برای [ثبت گزارش‌های خرابی](/reference/react-dom/server/renderToPipeableStream#logging-crashes-on-the-server) بازنویسی می‌کنید، مطمئن شوید همچنان `console.error` را فراخوانی می‌کنید. همچنین می‌توانید از آن برای [تنظیم کد وضعیت](/reference/react-dom/server/renderToPipeableStream#setting-the-status-code) قبل از emit شدن shell استفاده کنید.
  * **اختیاری** `progressiveChunkSize`: تعداد بایت‌ها در یک chunk. [اطلاعات بیشتر دربارهٔ heuristic پیش‌فرض.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)
  * **اختیاری** `signal`: یک [abort signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) که به شما اجازه می‌دهد [prerender را لغو کنید](#aborting-prerendering) و بقیه را در کلاینت رندر کنید.

#### مقادیر بازگشتی {/*returns*/}

`prerenderToNodeStream` یک Promise برمی‌گرداند:
- اگر رندر موفق باشد، Promise با شیء‌ای resolve می‌شود که شامل:
  - `prelude`: یک [Node.js Stream](https://nodejs.org/api/stream.html) از HTML. می‌توانید از این stream برای ارسال پاسخ به‌صورت chunks استفاده کنید، یا می‌توانید کل stream را در یک رشته بخوانید.
- اگر رندر ناموفق باشد، Promise رد (reject) می‌شود. [از این برای خروجی دادن یک shell جایگزین استفاده کنید.](/reference/react-dom/server/renderToPipeableStream#recovering-from-errors-inside-the-shell)

#### نکات {/*caveats*/}

`nonce` هنگام prerender یک گزینهٔ موجود نیست. nonceها باید برای هر درخواست یکتا باشند و اگر از nonceها برای امن‌سازی اپلیکیشن خود با [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) استفاده می‌کنید، include کردن مقدار nonce در خود prerender نامناسب و ناامن خواهد بود.

<Note>

### چه زمانی باید از `prerenderToNodeStream` استفاده کنم؟ {/*when-to-use-prerender*/}

API استاتیک `prerenderToNodeStream` برای تولید استاتیک سمت سرور (SSG) استفاده می‌شود. برخلاف `renderToString`، `prerenderToNodeStream` قبل از resolve شدن منتظر بارگذاری تمام داده‌ها می‌ماند. این آن را برای تولید HTML استاتیک برای یک صفحهٔ کامل، از جمله داده‌هایی که نیاز است با ساسپنس fetch شوند، مناسب می‌سازد. برای استریم کردن محتوا هنگام بارگذاری، از یک API رندر استریمی سمت سرور (SSR) مانند [renderToReadableStream](/reference/react-dom/server/renderToReadableStream) استفاده کنید.

</Note>

---

## استفاده {/*usage*/}

### رندر یک درخت ری‌اکت به یک stream از HTML استاتیک {/*rendering-a-react-tree-to-a-stream-of-static-html*/}

برای رندر درخت ری‌اکت خود به HTML استاتیک در یک [Node.js Stream](https://nodejs.org/api/stream.html)، `prerenderToNodeStream` را فراخوانی کنید:

```js [[1, 5, "<App />"], [2, 6, "['/main.js']"]]
import { prerenderToNodeStream } from 'react-dom/static';

// The route handler syntax depends on your backend framework
app.use('/', async (request, response) => {
  const { prelude } = await prerenderToNodeStream(<App />, {
    bootstrapScripts: ['/main.js'],
  });

  response.setHeader('Content-Type', 'text/plain');
  prelude.pipe(response);
});
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

این کار گوش‌دهنده‌های رویداد را به HTML استاتیک تولیدشده توسط سرور متصل می‌کند و آن را تعاملی می‌سازد.

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

app.use('/', async (request, response) => {
  const { prelude } = await prerenderToNodeStream(<App />, {
    bootstrapScripts: [assetMap['/main.js']]
  });

  response.setHeader('Content-Type', 'text/html');
  prelude.pipe(response);
});
```

از آنجا که سرور شما اکنون `<App assetMap={assetMap} />` را رندر می‌کند، باید آن را در کلاینت نیز با `assetMap` رندر کنید تا از خطاهای هیدریشن (Hydration) جلوگیری شود. می‌توانید `assetMap` را serialize کرده و به این شکل به کلاینت پاس دهید:

```js {9-10}
// You'd need to get this JSON from your build tooling.
const assetMap = {
  'styles.css': '/styles.123456.css',
  'main.js': '/main.123456.js'
};

app.use('/', async (request, response) => {
  const { prelude } = await prerenderToNodeStream(<App />, {
    // Careful: It's safe to stringify() this because this data isn't user-generated.
    bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,
    bootstrapScripts: [assetMap['/main.js']],
  });

  response.setHeader('Content-Type', 'text/html');
  prelude.pipe(response);
});
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

### رندر یک درخت ری‌اکت به یک رشتهٔ HTML استاتیک {/*rendering-a-react-tree-to-a-string-of-static-html*/}

برای رندر اپلیکیشن خود به یک رشتهٔ HTML استاتیک، `prerenderToNodeStream` را فراخوانی کنید:

```js
import { prerenderToNodeStream } from 'react-dom/static';

async function renderToString() {
  const {prelude} = await prerenderToNodeStream(<App />, {
    bootstrapScripts: ['/main.js']
  });

  return new Promise((resolve, reject) => {
    let data = '';
    prelude.on('data', chunk => {
      data += chunk;
    });
    prelude.on('end', () => resolve(data));
    prelude.on('error', reject);
  });
}
```

این خروجی HTML اولیهٔ غیرتعاملی کامپوننت‌های ری‌اکت شما را تولید خواهد کرد. در کلاینت، باید [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی کنید تا آن HTML تولیدشده توسط سرور را *هیدریشن* کرده و تعاملی سازد.

---

### انتظار برای بارگذاری تمام داده‌ها {/*waiting-for-all-data-to-load*/}

`prerenderToNodeStream` قبل از اتمام تولید HTML استاتیک و resolve شدن منتظر بارگذاری تمام داده‌ها می‌ماند. مثلاً، یک صفحهٔ پروفایل را در نظر بگیرید که یک cover، یک نوار کناری با دوستان و عکس‌ها، و فهرستی از پست‌ها را نشان می‌دهد:

```js
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

تصور کنید `<Posts />` نیاز به بارگذاری برخی داده‌ها دارد که مدتی طول می‌کشد. ایده‌آل این است که منتظر پست‌ها بمانید تا تمام شوند تا در HTML include شوند. برای این کار، می‌توانید از ساسپنس برای suspend روی داده‌ها استفاده کنید، و `prerenderToNodeStream` قبل از resolve شدن به HTML استاتیک منتظر اتمام محتوای suspend‌شده خواهد ماند.

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

### لغو prerendering {/*aborting-prerendering*/}

می‌توانید prerender را پس از یک timeout مجبور به «صرف‌نظر» کنید:

```js {2-5,11}
async function renderToString() {
  const controller = new AbortController();
  setTimeout(() => {
    controller.abort()
  }, 10000);

  try {
    // the prelude will contain all the HTML that was prerendered
    // before the controller aborted.
    const {prelude} = await prerenderToNodeStream(<App />, {
      signal: controller.signal,
    });
    //...
```

هر مرز ساسپنس با فرزندان ناقص در حالت fallback در prelude include خواهد شد.

---

## رفع اشکال {/*troubleshooting*/}

### stream من تا زمانی که کل اپلیکیشن رندر شود شروع نمی‌شود {/*my-stream-doesnt-start-until-the-entire-app-is-rendered*/}

پاسخ `prerenderToNodeStream` منتظر می‌ماند تا کل اپلیکیشن رندر را تمام کند، از جمله انتظار برای resolve شدن تمام مرزهای ساسپنس، قبل از resolve شدن. این برای تولید سایت استاتیک (SSG) به‌صورت از پیش طراحی شده و از استریم کردن محتوای بیشتر هنگام بارگذاری پشتیبانی نمی‌کند.

برای استریم کردن محتوا هنگام بارگذاری، از یک API رندر استریمی سمت سرور مانند [renderToPipeableStream](/reference/react-dom/server/renderToPipeableStream) استفاده کنید.
