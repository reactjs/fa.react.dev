---
link: "<link>"
---

<Intro>

[کامپوننت `<link>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) به شما اجازه می‌دهد از منابع خارجی مانند stylesheetها استفاده کنید یا سند را با متادادهٔ link annotate کنید.

```js
<link rel="icon" href="favicon.ico" />
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<link>` {/*link*/}

برای link کردن به منابع خارجی مانند stylesheetها، فونت‌ها و آیکون‌ها، یا برای annotate کردن سند با متادادهٔ link، [کامپوننت `<link>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) را رندر کنید. می‌توانید `<link>` را از هر کامپوننتی رندر کنید و ری‌اکت [در بیشتر موارد](#special-rendering-behavior) المان DOM مربوطه را در head سند قرار خواهد داد.

```js
<link rel="icon" href="favicon.ico" />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*props*/}

`<link>` از تمام [پراپس‌های رایج المان](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

* `rel`: یک رشته، الزامی. [رابطه با منبع](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel) را مشخص می‌کند. ری‌اکت [linkها با `rel="stylesheet"` را متفاوت از](#special-rendering-behavior) سایر linkها رفتار می‌کند.

این پراپس‌ها وقتی `rel="stylesheet"` اعمال می‌شوند:

* `precedence`: یک رشته. به ری‌اکت می‌گوید گرهٔ DOM `<link>` را نسبت به دیگران در `<head>` سند کجا رتبه‌بندی کند، که تعیین می‌کند کدام stylesheet می‌تواند دیگری را بازنویسی کند. ری‌اکت استنباط می‌کند که مقادیر precedence که ابتدا کشف می‌کند «پایین‌تر» و مقادیر precedence که بعداً کشف می‌کند «بالاتر» هستند. بسیاری از سیستم‌های استایل می‌توانند با استفاده از یک مقدار precedence منفرد به‌خوبی کار کنند زیرا قوانین استایل اتمی هستند. stylesheetهای با همان precedence با هم می‌روند چه `<link>` باشند چه تگ‌های `<style>` درون‌خطی چه با توابع [`preinit`](/reference/react-dom/preinit) بارگذاری شوند.
* `media`: یک رشته. stylesheet را به یک [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) خاص محدود می‌کند.
* `title`: یک رشته. نام یک [stylesheet جایگزین](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) را مشخص می‌کند.

این پراپس‌ها وقتی `rel="stylesheet"` اعمال می‌شوند اما [رفتار ویژهٔ ری‌اکت با stylesheetها](#special-rendering-behavior) را غیرفعال می‌کنند:

* `disabled`: یک مقدار بولی. stylesheet را غیرفعال می‌کند.
* `onError`: یک تابع. هنگام شکست بارگذاری stylesheet فراخوانی می‌شود.
* `onLoad`: یک تابع. هنگام اتمام بارگذاری stylesheet فراخوانی می‌شود.

این پراپس‌ها وقتی `rel="preload"` یا `rel="modulepreload"` اعمال می‌شوند:

* `as`: یک رشته. نوع منبع. مقادیر ممکن آن `audio`، `document`، `embed`، `fetch`، `font`، `image`، `object`، `script`، `style`، `track`، `video`، `worker` هستند.
* `imageSrcSet`: یک رشته. فقط وقتی `as="image"` قابل‌اعمال است. [مجموعهٔ منبع تصویر](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) را مشخص می‌کند.
* `imageSizes`: یک رشته. فقط وقتی `as="image"` قابل‌اعمال است. [اندازه‌های تصویر](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) را مشخص می‌کند.

این پراپس‌ها وقتی `rel="icon"` یا `rel="apple-touch-icon"` اعمال می‌شوند:

* `sizes`: یک رشته. [اندازه‌های آیکون](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

این پراپس‌ها در همهٔ موارد اعمال می‌شوند:

* `href`: یک رشته. URL منبع link‌شده.
*  `crossOrigin`: یک رشته. [سیاست CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) برای استفاده. مقادیر ممکن آن `anonymous` و `use-credentials` هستند. وقتی `as` روی `"fetch"` تنظیم شده الزامی است.
*  `referrerPolicy`: یک رشته. [هدر Referrer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#referrerpolicy) برای ارسال هنگام fetch. مقادیر ممکن آن `no-referrer-when-downgrade` (پیش‌فرض)، `no-referrer`، `origin`، `origin-when-cross-origin`، و `unsafe-url` هستند.
* `fetchPriority`: یک رشته. اولویت نسبی برای fetch منبع را پیشنهاد می‌دهد. مقادیر ممکن `auto` (پیش‌فرض)، `high`، و `low` هستند.
* `hrefLang`: یک رشته. زبان منبع link‌شده.
* `integrity`: یک رشته. یک هش رمزنگاری منبع، برای [تأیید اصالت آن](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
* `type`: یک رشته. نوع MIME منبع link‌شده.

پراپس‌هایی که استفاده از آن‌ها با ری‌اکت **توصیه نمی‌شود**:

* `blocking`: یک رشته. اگر روی `"render"` تنظیم شود، به مرورگر دستور می‌دهد تا stylesheet بارگذاری نشده، صفحه را رندر نکند. ری‌اکت کنترل دقیق‌تری با استفاده از ساسپنس ارائه می‌دهد.

#### رفتار رندر ویژه {/*special-rendering-behavior*/}

ری‌اکت همیشه المان DOM مربوط به کامپوننت `<link>` را در `<head>` سند قرار می‌دهد، بدون توجه به اینکه کجای درخت ری‌اکت رندر می‌شود. `<head>` تنها مکان معتبر برای وجود `<link>` در DOM است، با این حال مناسب و قابل‌ترکیب است اگر کامپوننتی که صفحهٔ خاصی را نمایش می‌دهد بتواند خودش کامپوننت‌های `<link>` را رندر کند.

چند استثنا برای این وجود دارد:

* اگر `<link>` یک پراپس `rel="stylesheet"` داشته باشد، باید یک پراپس `precedence` نیز داشته باشد تا این رفتار ویژه را دریافت کند. این به این دلیل است که ترتیب stylesheetها درون سند معنادار است، بنابراین ری‌اکت باید بداند چگونه این stylesheet را نسبت به دیگران مرتب کند، که با پراپس `precedence` مشخص می‌کنید. اگر پراپس `precedence` حذف شود، هیچ رفتار ویژه‌ای وجود ندارد.
* اگر `<link>` یک پراپس [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop) داشته باشد، هیچ رفتار ویژه‌ای وجود ندارد، زیرا در این حالت به سند اعمال نمی‌شود بلکه متاداده‌ای دربارهٔ بخش خاصی از صفحه را نمایش می‌دهد.
* اگر `<link>` یک پراپس `onLoad` یا `onError` داشته باشد، زیرا در آن حالت شما بارگذاری منبع link‌شده را به‌صورت دستی درون کامپوننت ری‌اکت خود مدیریت می‌کنید.

#### رفتار ویژه برای stylesheetها {/*special-behavior-for-stylesheets*/}

علاوه بر این، اگر `<link>` به یک stylesheet باشد (یعنی در پراپس‌هایش `rel="stylesheet"` دارد)، ری‌اکت به روش‌های زیر آن را ویژه رفتار می‌کند:

* کامپوننتی که `<link>` را رندر می‌کند هنگام بارگذاری stylesheet [suspend](/reference/react/Suspense) خواهد شد.
* اگر چندین کامپوننت linkهایی به همان stylesheet رندر کنند، ری‌اکت آن‌ها را de-duplicate کرده و فقط یک link را در DOM قرار می‌دهد. دو link اگر همان پراپس `href` را داشته باشند یکسان در نظر گرفته می‌شوند.

دو استثنا برای این رفتار ویژه وجود دارد:

* اگر link پراپس `precedence` نداشته باشد، هیچ رفتار ویژه‌ای وجود ندارد، زیرا ترتیب stylesheetها درون سند معنادار است، بنابراین ری‌اکت باید بداند چگونه این stylesheet را نسبت به دیگران مرتب کند، که با پراپس `precedence` مشخص می‌کنید.
* اگر هر یک از پراپس‌های `onLoad`، `onError`، یا `disabled` را ارائه کنید، هیچ رفتار ویژه‌ای وجود ندارد، زیرا این پراپس‌ها نشان می‌دهند که شما بارگذاری stylesheet را به‌صورت دستی درون کامپوننت خود مدیریت می‌کنید.

این رفتار ویژه با دو نکته همراه است:

* ری‌اکت تغییرات پراپس‌ها را پس از رندر شدن link نادیده می‌گیرد. (ری‌اکت در محیط توسعه اگر این اتفاق بیفتد هشدار می‌دهد.)
* ری‌اکت ممکن است link را در DOM نگه دارد حتی پس از unmount شدن کامپوننتی که آن را رندر کرده است.

---

## استفاده {/*usage*/}

### Link کردن به منابع مرتبط {/*linking-to-related-resources*/}

می‌توانید سند را با linkهایی به منابع مرتبط مانند یک آیکون، URL کانونیکال، یا pingback annotate کنید. ری‌اکت این متاداده را در `<head>` سند قرار می‌دهد بدون توجه به اینکه کجای درخت ری‌اکت رندر می‌شود.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function BlogPage() {
  return (
    <ShowRenderedHTML>
      <link rel="icon" href="favicon.ico" />
      <link rel="pingback" href="http://www.example.com/xmlrpc.php" />
      <h1>My Blog</h1>
      <p>...</p>
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>

### Link کردن به یک stylesheet {/*linking-to-a-stylesheet*/}

اگر کامپوننتی برای نمایش صحیح به یک stylesheet خاص وابسته است، می‌توانید یک link به آن stylesheet را درون کامپوننت رندر کنید. کامپوننت شما هنگام بارگذاری stylesheet [suspend](/reference/react/Suspense) خواهد شد. باید پراپس `precedence` را ارائه کنید، که به ری‌اکت می‌گوید این stylesheet را کجا نسبت به دیگران قرار دهد — stylesheetهای با precedence بالاتر می‌توانند آنهایی با precedence پایین‌تر را بازنویسی کنند.

<Note>
وقتی می‌خواهید از یک stylesheet استفاده کنید، می‌تواند مفید باشد تابع [preinit](/reference/react-dom/preinit) را فراخوانی کنید. فراخوانی این تابع ممکن است به مرورگر اجازه دهد بارگذاری stylesheet را زودتر از زمانی که فقط یک کامپوننت `<link>` رندر می‌کنید آغاز کند، مثلاً با ارسال یک [پاسخ HTTP Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103).
</Note>

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function SiteMapPage() {
  return (
    <ShowRenderedHTML>
      <link rel="stylesheet" href="sitemap.css" precedence="medium" />
      <p>...</p>
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>

### کنترل precedence stylesheet {/*controlling-stylesheet-precedence*/}

stylesheetها می‌توانند با هم تداخل داشته باشند، و وقتی این کار را می‌کنند، مرورگر با آن یکی که دیرتر در سند می‌آید می‌رود. ری‌اکت به شما اجازه می‌دهد ترتیب stylesheetها را با پراپس `precedence` کنترل کنید. در این مثال، سه کامپوننت stylesheetها را رندر می‌کنند، و آنهایی با همان precedence در `<head>` گروه‌بندی می‌شوند. 

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function HomePage() {
  return (
    <ShowRenderedHTML>
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent/>
      ...
    </ShowRenderedHTML>
  );
}

function FirstComponent() {
  return <link rel="stylesheet" href="first.css" precedence="first" />;
}

function SecondComponent() {
  return <link rel="stylesheet" href="second.css" precedence="second" />;
}

function ThirdComponent() {
  return <link rel="stylesheet" href="third.css" precedence="first" />;
}

```

</SandpackWithHTMLOutput>

توجه کنید خود مقادیر `precedence` دل‌خواه هستند و نام‌گذاری آن‌ها به شما بستگی دارد. ری‌اکت استنباط می‌کند که مقادیر precedence که ابتدا کشف می‌کند «پایین‌تر» و مقادیر precedence که بعداً کشف می‌کند «بالاتر» هستند.

### رندر de-duplicate شدهٔ stylesheet {/*deduplicated-stylesheet-rendering*/}

اگر همان stylesheet را از چندین کامپوننت رندر کنید، ری‌اکت فقط یک `<link>` در head سند قرار خواهد داد.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

export default function HomePage() {
  return (
    <ShowRenderedHTML>
      <Component />
      <Component />
      ...
    </ShowRenderedHTML>
  );
}

function Component() {
  return <link rel="stylesheet" href="styles.css" precedence="medium" />;
}
```

</SandpackWithHTMLOutput>

### Annotate کردن آیتم‌های خاص درون سند با linkها {/*annotating-specific-items-within-the-document-with-links*/}

می‌توانید از کامپوننت `<link>` با پراپس `itemProp` برای annotate کردن آیتم‌های خاص درون سند با linkهایی به منابع مرتبط استفاده کنید. در این حالت، ری‌اکت این annotationها را در `<head>` سند قرار *نمی‌دهد* بلکه آن‌ها را مانند هر کامپوننت ری‌اکت دیگری قرار می‌دهد.

```js
<section itemScope>
  <h3>Annotating specific items</h3>
  <link itemProp="author" href="http://example.com/" />
  <p>...</p>
</section>
```
