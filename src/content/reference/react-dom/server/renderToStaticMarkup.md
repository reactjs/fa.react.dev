---
title: renderToStaticMarkup
---

<Intro>

`renderToStaticMarkup` یک درخت غیرتعاملی ری‌اکت را به یک رشتهٔ HTML رندر می‌کند.

```js
const html = renderToStaticMarkup(reactNode, options?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `renderToStaticMarkup(reactNode, options?)` {/*rendertostaticmarkup*/}

روی سرور، `renderToStaticMarkup` را فراخوانی کنید تا اپلیکیشن خود را به HTML رندر کنید.

```js
import { renderToStaticMarkup } from 'react-dom/server';

const html = renderToStaticMarkup(<Page />);
```

این متد خروجی HTML غیرتعاملی کامپوننت‌های ری‌اکت شما را تولید می‌کند.

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `reactNode`: یک نود ری‌اکت که می‌خواهید به HTML رندر کنید. مثلاً یک نود JSX مانند `<Page />`.
* **اختیاری** `options`: یک شیء برای رندر سرور.
  * **اختیاری** `identifierPrefix`: یک پیشوند رشته‌ای که ری‌اکت برای شناسه‌های تولیدشده توسط [`useId`](/reference/react/useId) استفاده می‌کند. برای جلوگیری از تداخل هنگام استفاده از چندین root در همان صفحه مفید است.

#### مقدار برگشتی {/*returns*/}

یک رشتهٔ HTML.

#### نکات {/*caveats*/}

* خروجی `renderToStaticMarkup` را نمی‌توان هیدریت کرد.

* `renderToStaticMarkup` از ساسپنس به‌طور محدود پشتیبانی می‌کند. اگر یک کامپوننت معلق (suspend) شود، `renderToStaticMarkup` بلافاصله fallback آن را به‌عنوان HTML ارسال می‌کند.

* `renderToStaticMarkup` در مرورگر کار می‌کند، اما استفاده از آن در کد کلاینت توصیه نمی‌شود. اگر نیاز دارید یک کامپوننت را در مرورگر به HTML رندر کنید، [HTML را با رندر کردن آن در یک نود DOM به‌دست آورید.](/reference/react-dom/server/renderToString#removing-rendertostring-from-the-client-code)

---

## نحوهٔ استفاده {/*usage*/}

### رندر یک درخت غیرتعاملی ری‌اکت به‌صورت HTML به یک رشته {/*rendering-a-non-interactive-react-tree-as-html-to-a-string*/}

`renderToStaticMarkup` را فراخوانی کنید تا اپلیکیشن خود را به یک رشتهٔ HTML رندر کنید که می‌توانید همراه پاسخ سرور خود ارسال کنید:

```js {5-6}
import { renderToStaticMarkup } from 'react-dom/server';

// The route handler syntax depends on your backend framework
app.use('/', (request, response) => {
  const html = renderToStaticMarkup(<Page />);
  response.send(html);
});
```

این کار خروجی اولیهٔ HTML غیرتعاملی کامپوننت‌های ری‌اکت شما را تولید می‌کند.

<Pitfall>

این متد **HTML غیرتعاملی که نمی‌تواند هیدریت شود** رندر می‌کند. این اگر می‌خواهید از ری‌اکت به‌عنوان یک تولیدکنندهٔ صفحهٔ استاتیک ساده استفاده کنید، یا اگر در حال رندر محتوای کاملاً استاتیکی مانند ایمیل‌ها هستید مفید است.

اپلیکیشن‌های تعاملی باید از [`renderToString`](/reference/react-dom/server/renderToString) روی سرور و [`hydrateRoot`](/reference/react-dom/client/hydrateRoot) روی کلاینت استفاده کنند.

</Pitfall>
