---
title: "<title>"
---

<Intro>

[کامپوننت `<title>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) به شما اجازه می‌دهد عنوان سند را مشخص کنید.

```js
<title>My Blog</title>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<title>` {/*title*/}

برای مشخص کردن عنوان سند، [کامپوننت `<title>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) را رندر کنید. می‌توانید `<title>` را از هر کامپوننتی رندر کنید و ری‌اکت همیشه عنصر DOM مربوطه را در head سند قرار می‌دهد.

```js
<title>My Blog</title>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<title>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

* `children`: `<title>` فقط متن را به‌عنوان فرزند می‌پذیرد. این متن عنوان سند خواهد شد. همچنین می‌توانید کامپوننت‌های خودتان را پاس دهید تا زمانی که فقط متن رندر کنند.

#### رفتار رندر ویژه {/*special-rendering-behavior*/}

ری‌اکت همیشه عنصر DOM مربوط به کامپوننت `<title>` را در `<head>` سند قرار می‌دهد، بدون توجه به اینکه کجای درخت ری‌اکت رندر شده است. `<head>` تنها مکان معتبر برای وجود `<title>` در DOM است، با این حال راحت‌تر است و قابلیت ترکیب‌پذیری را حفظ می‌کند اگر کامپوننتی که نمایانگر یک صفحهٔ خاص است بتواند `<title>` خودش را رندر کند.

دو استثنا وجود دارد:
* اگر `<title>` درون یک کامپوننت `<svg>` باشد، رفتار ویژه‌ای وجود ندارد، زیرا در این کانتکست نمایانگر عنوان سند نیست بلکه یک [حاشیه‌نویسی دسترس‌پذیری برای آن گرافیک SVG](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) است.
* اگر `<title>` پراپ [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) داشته باشد، رفتار ویژه‌ای وجود ندارد، زیرا در این حالت نمایانگر عنوان سند نیست بلکه متاداده دربارهٔ بخش خاصی از صفحه است.

<Pitfall>

فقط یک `<title>` را در هر زمان رندر کنید. اگر بیش از یک کامپوننت به‌طور همزمان یک تگ `<title>` رندر کند، ری‌اکت همهٔ آن عناوین را در head سند قرار می‌دهد. هنگامی که این اتفاق می‌افتد، رفتار مرورگرها و موتورهای جستجو تعریف‌نشده است.

</Pitfall>

---

## نحوهٔ استفاده {/*usage*/}

### تنظیم عنوان سند {/*set-the-document-title*/}

کامپوننت `<title>` را از هر کامپوننتی با متن به‌عنوان children آن رندر کنید. ری‌اکت یک نود DOM `<title>` در `<head>` سند قرار می‌دهد.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function ContactUsPage() {
  return (
    <ShowRenderedHTML>
      <title>My Site: Contact Us</title>
      <h1>Contact Us</h1>
      <p>Email us at support@example.com</p>
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>

### استفاده از متغیرها در عنوان {/*use-variables-in-the-title*/}

children کامپوننت `<title>` باید یک رشتهٔ متن واحد باشد. (یا یک عدد واحد یا یک شیء واحد با متد `toString`.) ممکن است واضح نباشد، اما استفاده از کروشه‌های JSX مانند این:

```js
<title>Results page {pageNumber}</title> // 🔴 Problem: This is not a single string
```

... در واقع باعث می‌شود کامپوننت `<title>` یک آرایهٔ دو عنصری به‌عنوان children خود بگیرد (رشتهٔ `"Results page"` و مقدار `pageNumber`). این کار باعث خطا می‌شود. به‌جای آن، از درج رشته‌ای (string interpolation) برای پاس دادن یک رشتهٔ واحد به `<title>` استفاده کنید:

```js
<title>{`Results page ${pageNumber}`}</title>
```
