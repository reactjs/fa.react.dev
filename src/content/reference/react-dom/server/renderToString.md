---
title: renderToString
---

<Pitfall>

`renderToString` از استریم (streaming) یا انتظار برای داده‌ها پشتیبانی نمی‌کند. [جایگزین‌ها را ببینید.](#alternatives)

</Pitfall>

<Intro>

`renderToString` یک درخت ری‌اکت را به یک رشتهٔ HTML رندر می‌کند.

```js
const html = renderToString(reactNode, options?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `renderToString(reactNode, options?)` {/*rendertostring*/}

روی سرور، `renderToString` را فراخوانی کنید تا اپلیکیشن خود را به HTML رندر کنید.

```js
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />);
```

روی کلاینت، [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی کنید تا HTML تولیدشده توسط سرور تعاملی شود.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `reactNode`: یک نود ری‌اکت که می‌خواهید به HTML رندر کنید. مثلاً یک نود JSX مانند `<App />`.

* **اختیاری** `options`: یک شیء برای رندر سرور.
  * **اختیاری** `identifierPrefix`: یک پیشوند رشته‌ای که ری‌اکت برای شناسه‌های تولیدشده توسط [`useId`](/reference/react/useId) استفاده می‌کند. برای جلوگیری از تداخل هنگام استفاده از چندین root در همان صفحه مفید است. باید همان پیشوندی باشد که به [`hydrateRoot`](/reference/react-dom/client/hydrateRoot#parameters) پاس داده شده است.

#### مقدار برگشتی {/*returns*/}

یک رشتهٔ HTML.

#### نکات {/*caveats*/}

* `renderToString` از ساسپنس به‌طور محدود پشتیبانی می‌کند. اگر یک کامپوننت معلق (suspend) شود، `renderToString` بلافاصله fallback آن را به‌عنوان HTML ارسال می‌کند.

* `renderToString` در مرورگر کار می‌کند، اما استفاده از آن در کد کلاینت [توصیه نمی‌شود.](#removing-rendertostring-from-the-client-code)

---

## نحوهٔ استفاده {/*usage*/}

### رندر یک درخت ری‌اکت به‌صورت HTML به یک رشته {/*rendering-a-react-tree-as-html-to-a-string*/}

`renderToString` را فراخوانی کنید تا اپلیکیشن خود را به یک رشتهٔ HTML رندر کنید که می‌توانید همراه پاسخ سرور خود ارسال کنید:

```js {5-6}
import { renderToString } from 'react-dom/server';

// The route handler syntax depends on your backend framework
app.use('/', (request, response) => {
  const html = renderToString(<App />);
  response.send(html);
});
```

این کار خروجی اولیهٔ HTML غیرتعاملی کامپوننت‌های ری‌اکت شما را تولید می‌کند. روی کلاینت، باید [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) را فراخوانی کنید تا آن HTML تولیدشده توسط سرور را *هیدریشن (Hydration)* کنید و تعاملی کنید.


<Pitfall>

`renderToString` از استریم یا انتظار برای داده‌ها پشتیبانی نمی‌کند. [جایگزین‌ها را ببینید.](#alternatives)

</Pitfall>

---

## جایگزین‌ها {/*alternatives*/}

### مهاجرت از `renderToString` به رندر استریمی روی سرور {/*migrating-from-rendertostring-to-a-streaming-method-on-the-server*/}

`renderToString` بلافاصله یک رشته برمی‌گرداند، بنابراین از استریم محتوا هنگام بارگذاری پشتیبانی نمی‌کند.

هنگامی که امکان‌پذیر است، توصیه می‌کنیم از این جایگزین‌های کامل استفاده کنید:

* اگر از Node.js استفاده می‌کنید، [`renderToPipeableStream`](/reference/react-dom/server/renderToPipeableStream) را به کار ببرید.
* اگر از Deno یا یک runtime مرزی (edge) مدرن با [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) استفاده می‌کنید، [`renderToReadableStream`](/reference/react-dom/server/renderToReadableStream) را به کار ببرید.

اگر محیط سرور شما از streamها پشتیبانی نمی‌کند، می‌توانید به استفاده از `renderToString` ادامه دهید.

---

### مهاجرت از `renderToString` به prerender استاتیک روی سرور {/*migrating-from-rendertostring-to-a-static-prerender-on-the-server*/}

`renderToString` بلافاصله یک رشته برمی‌گرداند، بنابراین از انتظار برای بارگذاری داده‌ها برای تولید HTML استاتیک پشتیبانی نمی‌کند.

توصیه می‌کنیم از این جایگزین‌های کامل استفاده کنید:

* اگر از Node.js استفاده می‌کنید، [`prerenderToNodeStream`](/reference/react-dom/static/prerenderToNodeStream) را به کار ببرید.
* اگر از Deno یا یک runtime مرزی (edge) مدرن با [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) استفاده می‌کنید، [`prerender`](/reference/react-dom/static/prerender) را به کار ببرید.

اگر محیط تولید سایت استاتیک شما از streamها پشتیبانی نمی‌کند، می‌توانید به استفاده از `renderToString` ادامه دهید.

---

### حذف `renderToString` از کد کلاینت {/*removing-rendertostring-from-the-client-code*/}

گاهی `renderToString` در کلاینت برای تبدیل یک کامپوننت به HTML استفاده می‌شود.

```js {1-2}
// 🚩 Unnecessary: using renderToString on the client
import { renderToString } from 'react-dom/server';

const html = renderToString(<MyIcon />);
console.log(html); // For example, "<svg>...</svg>"
```

import کردن `react-dom/server` **روی کلاینت** به‌طور غیرضروری اندازهٔ باندل شما را افزایش می‌دهد و باید از آن پرهیز کنید. اگر نیاز دارید یک کامپوننت را در مرورگر به HTML رندر کنید، از [`createRoot`](/reference/react-dom/client/createRoot) استفاده کنید و HTML را از DOM بخوانید:

```js
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

const div = document.createElement('div');
const root = createRoot(div);
flushSync(() => {
  root.render(<MyIcon />);
});
console.log(div.innerHTML); // For example, "<svg>...</svg>"
```

فراخوانی [`flushSync`](/reference/react-dom/flushSync) لازم است تا DOM پیش از خواندن پراپرتی [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) آن به‌روزرسانی شود.

---

## رفع اشکال {/*troubleshooting*/}

### وقتی یک کامپوننت معلق می‌شود، HTML همیشه شامل fallback است {/*when-a-component-suspends-the-html-always-contains-a-fallback*/}

`renderToString` به‌طور کامل از ساسپنس پشتیبانی نمی‌کند.

اگر کامپوننتی معلق شود (مثلاً چون با [`lazy`](/reference/react/lazy) تعریف شده یا داده fetch می‌کند)، `renderToString` برای resolve شدن محتوای آن منتظر نمی‌ماند. به‌جای آن، `renderToString` نزدیک‌ترین مرز [`<Suspense>`](/reference/react/Suspense) بالای آن را پیدا می‌کند و پراپ `fallback` آن را در HTML رندر می‌کند. محتوا تا زمان بارگذاری کد کلاینت ظاهر نخواهد شد.

برای حل این مشکل، از یکی از [راه‌حل‌های استریمی توصیه‌شده](#alternatives) استفاده کنید. برای رندر سمت سرور، آن‌ها می‌توانند محتوا را هنگام resolve شدن روی سرور به‌صورت تکه‌ای استریم کنند تا کاربر ببیند صفحه پیش از بارگذاری کد کلاینت به‌تدریج پر می‌شود. برای تولید سایت استاتیک، آن‌ها می‌توانند پیش از تولید HTML استاتیک، برای resolve شدن همهٔ محتوا منتظر بمانند.
