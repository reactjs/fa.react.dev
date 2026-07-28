---
meta: "<meta>"
---

<Intro>

[کامپوننت `<meta>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) به شما اجازه می‌دهد متاداده‌هایی به سند اضافه کنید.

```js
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<meta>` {/*meta*/}

برای اضافه کردن متاداده‌های سند، [کامپوننت `<meta>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) را رندر کنید. می‌توانید `<meta>` را از هر کامپوننتی رندر کنید و ری‌اکت همیشه عنصر DOM مربوطه را در head سند قرار می‌دهد.

```js
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<meta>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

باید *دقیقاً یکی* از پراپس‌های زیر را داشته باشد: `name`، `httpEquiv`، `charset`، `itemProp`. کامپوننت `<meta>` بسته به اینکه کدام یک از این پراپس‌ها مشخص شده باشد، کار متفاوتی انجام می‌دهد.

* `name`: یک رشته. [نوع متاداده](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name)ای که باید به سند ضمیمه شود را مشخص می‌کند.
* `charset`: یک رشته. مجموعهٔ کاراکترهای استفاده‌شده توسط سند را مشخص می‌کند. تنها مقدار معتبر `"utf-8"` است.
* `httpEquiv`: یک رشته. یک دستورالعمل برای پردازش سند مشخص می‌کند.
* `itemProp`: یک رشته. متاداده‌هایی دربارهٔ یک مورد خاص درون سند به‌جای سند به‌عنوان یک کل مشخص می‌کند.
* `content`: یک رشته. هنگام استفاده با پراپ‌های `name` یا `itemProp`، متاداده‌ای که باید ضمیمه شود را مشخص می‌کند، و هنگام استفاده با پراپ `httpEquiv`، رفتار دستورالعمل را مشخص می‌کند.

#### رفتار رندر ویژه {/*special-rendering-behavior*/}

ری‌اکت همیشه عنصر DOM مربوط به کامپوننت `<meta>` را در `<head>` سند قرار می‌دهد، بدون توجه به اینکه کجای درخت ری‌اکت رندر شده است. `<head>` تنها مکان معتبر برای وجود `<meta>` در DOM است، با این حال راحت‌تر است و قابلیت ترکیب‌پذیری را حفظ می‌کند اگر کامپوننتی که نمایانگر یک صفحهٔ خاص است بتواند خودش کامپوننت‌های `<meta>` را رندر کند.

یک استثنا وجود دارد: اگر `<meta>` پراپ [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) داشته باشد، رفتار ویژه‌ای وجود ندارد، زیرا در این حالت نمایانگر متاداده دربارهٔ سند نیست بلکه متاداده دربارهٔ بخش خاصی از صفحه است.

---

## نحوهٔ استفاده {/*usage*/}

### حاشیه‌نویسی سند با متاداده {/*annotating-the-document-with-metadata*/}

می‌توانید سند را با متاداده‌هایی مانند کلیدواژه‌ها، خلاصه، یا نام نویسنده حاشیه‌نویسی کنید. ری‌اکت این متاداده‌ها را در `<head>` سند قرار می‌دهد، بدون توجه به اینکه کجای درخت ری‌اکت رندر شده باشند.

```html
<meta name="author" content="John Smith" />
<meta name="keywords" content="React, JavaScript, semantic markup, html" />
<meta name="description" content="API reference for the <meta> component in React DOM" />
```

می‌توانید کامپوننت `<meta>` را از هر کامپوننتی رندر کنید. ری‌اکت یک نود DOM `<meta>` در `<head>` سند قرار می‌دهد.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function SiteMapPage() {
  return (
    <ShowRenderedHTML>
      <meta name="keywords" content="React" />
      <meta name="description" content="A site map for the React website" />
      <h1>Site Map</h1>
      <p>...</p>
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>

### حاشیه‌نویسی موارد خاص درون سند با متاداده {/*annotating-specific-items-within-the-document-with-metadata*/}

می‌توانید از کامپوننت `<meta>` با پراپ `itemProp` برای حاشیه‌نویسی موارد خاصی درون سند با متاداده استفاده کنید. در این حالت، ری‌اکت این حاشیه‌نویسی‌ها را در `<head>` سند قرار *نمی‌دهد* بلکه مانند هر کامپوننت ری‌اکتی دیگری آن‌ها را قرار می‌دهد.

```js
<section itemScope>
  <h3>Annotating specific items</h3>
  <meta itemProp="description" content="API reference for using <meta> with itemProp" />
  <p>...</p>
</section>
```
