---
script: "<script>"
---

<Intro>

[کامپوننت `<script>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) به شما اجازه می‌دهد یک اسکریپت به سند خود اضافه کنید.

```js
<script> alert("hi!") </script>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<script>` {/*script*/}

برای اضافه کردن اسکریپت‌های درون‌خطی (inline) یا خارجی به سند خود، [کامپوننت `<script>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) را رندر کنید. می‌توانید `<script>` را از هر کامپوننتی رندر کنید و ری‌اکت [در موارد خاص](#special-rendering-behavior) عنصر DOM مربوطه را در head سند قرار می‌دهد و اسکریپت‌های یکسان را یکتا می‌کند.

```js
<script> alert("hi!") </script>
<script src="script.js" />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<script>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

باید *یا* `children` داشته باشد یا پراپ `src`.

* `children`: یک رشته. کد منبع یک اسکریپت درون‌خطی.
* `src`: یک رشته. URL یک اسکریپت خارجی.

سایر پراپرتی‌های پشتیبانی‌شده:

* `async`: یک مقدار بولی. به مرورگر اجازه می‌دهد اجرای اسکریپت را تا زمانی که بقیهٔ سند پردازش شود به تعویق بیندازد — رفتار ترجیحی برای عملکرد.
*  `crossOrigin`: یک رشته. [سیاست CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) که باید استفاده شود. مقادیر ممکن آن `anonymous` و `use-credentials` هستند.
* `fetchPriority`: یک رشته. به مرورگر اجازه می‌دهد اسکریپت‌ها را بر اساس اولویت هنگام fetch همزمان چندین اسکریپت رتبه‌بندی کند. می‌تواند `"high"`، `"low"`، یا `"auto"` (پیش‌فرض) باشد.
* `integrity`: یک رشته. یک هش رمزنگاری‌شده از اسکریپت، برای [تأیید اصالت آن](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).
* `noModule`: یک مقدار بولی. اسکریپت را در مرورگرهایی که از ES modules پشتیبانی می‌کنند غیرفعال می‌کند — و امکان استفاده از یک اسکریپت fallback برای مرورگرهایی که پشتیبانی نمی‌کنند فراهم می‌سازد.
* `nonce`: یک رشته. یک [nonce رمزنگاری‌شده برای اجازه دادن به منبع](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) هنگام استفاده از یک Content Security Policy سخت‌گیرانه.
* `referrer`: یک رشته. مشخص می‌کند [چه هدر Referer ارسال شود](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#referrerpolicy) هنگام fetch کردن اسکریپت و هر منبعی که اسکریپت به‌نوبهٔ خود fetch می‌کند.
* `type`: یک رشته. مشخص می‌کند که آیا اسکریپت یک [اسکریپت کلاسیک، ES module، یا import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type) است.

پراپس‌هایی که [رفتار ویژهٔ ری‌اکت برای اسکریپت‌ها](#special-rendering-behavior) را غیرفعال می‌کنند:

* `onError`: یک تابع. هنگامی که اسکریپت بارگذاری نمی‌شود فراخوانی می‌شود.
* `onLoad`: یک تابع. هنگامی که بارگذاری اسکریپت تمام می‌شود فراخوانی می‌شود.

پراپس‌هایی که استفاده از آن‌ها با ری‌اکت **توصیه نمی‌شود**:

* `blocking`: یک رشته. اگر برابر `"render"` باشد، به مرورگر دستور می‌دهد تا زمانی که stylesheet بارگذاری نشده صفحه را رندر نکند. ری‌اکت با استفاده از ساسپنس کنترل دقیق‌تری فراهم می‌کند.
* `defer`: یک رشته. جلوی اجرای اسکریپت توسط مرورگر را تا زمان بارگذاری کامل سند می‌گیرد. با کامپوننت‌های استریمی رندرشده در سرور ناسازگار است. به‌جای آن از پراپ `async` استفاده کنید.

#### رفتار رندر ویژه {/*special-rendering-behavior*/}

ری‌اکت می‌تواند کامپوننت‌های `<script>` را به `<head>` سند منتقل کند و اسکریپت‌های یکسان را یکتا کند.

برای انتخاب این رفتار، پراپ‌های `src` و `async={true}` را ارائه کنید. ری‌اکت اسکریپت‌ها را اگر `src` یکسان داشته باشند یکتا می‌کند. پراپ `async` باید true باشد تا انتقال امن اسکریپت‌ها ممکن شود.

این رفتار ویژه با دو نکته همراه است:

* ری‌اکت تغییرات پراپس‌ها را پس از رندر شدن اسکریپت نادیده می‌گیرد. (ری‌اکت در محیط توسعه اگر این اتفاق بیفتد هشدار می‌دهد.)
* ری‌اکت ممکن است اسکریپت را حتی پس از unmount شدن کامپوننتی که آن را رندر کرده در DOM نگه دارد. (این هیچ اثری ندارد زیرا اسکریپت‌ها فقط یک‌بار هنگام درج در DOM اجرا می‌شوند.)

---

## نحوهٔ استفاده {/*usage*/}

### رندر یک اسکریپت خارجی {/*rendering-an-external-script*/}

اگر یک کامپوننت برای نمایش درست به اسکریپت‌های خاصی وابسته است، می‌توانید یک `<script>` در داخل کامپوننت رندر کنید.
با این حال، ممکن است کامپوننت پیش از اتمام بارگذاری اسکریپت commit شود.
می‌توانید پس از فعال شدن رویداد `load` به محتوای اسکریپت وابسته شوید، مثلاً با استفاده از پراپ `onLoad`.

ری‌اکت اسکریپت‌هایی که `src` یکسان دارند را یکتا می‌کند و فقط یکی از آن‌ها را در DOM درج می‌کند، حتی اگر چندین کامپوننت آن را رندر کنند.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

function Map({lat, long}) {
  return (
    <>
      <script async src="map-api.js" onLoad={() => console.log('script loaded')} />
      <div id="map" data-lat={lat} data-long={long} />
    </>
  );
}

export default function Page() {
  return (
    <ShowRenderedHTML>
      <Map />
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>

<Note>
وقتی می‌خواهید از یک اسکریپت استفاده کنید، می‌تواند مفید باشد تابع [preinit](/reference/react-dom/preinit) را فراخوانی کنید. فراخوانی این تابع ممکن است به مرورگر اجازه دهدfetch اسکریپت را زودتر از زمانی که فقط یک کامپوننت `<script>` رندر می‌کنید آغاز کند، مثلاً با ارسال یک [پاسخ HTTP Early Hints](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103).
</Note>

### رندر یک اسکریپت درون‌خطی {/*rendering-an-inline-script*/}

برای گنجاندن یک اسکریپت درون‌خطی، کامپوننت `<script>` را با کد منبع اسکریپت به‌عنوان children رندر کنید. اسکریپت‌های درون‌خطی یکتا نمی‌شوند یا به `<head>` سند منتقل نمی‌شوند.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';

function Tracking() {
  return (
    <script>
      ga('send', 'pageview');
    </script>
  );
}

export default function Page() {
  return (
    <ShowRenderedHTML>
      <h1>My Website</h1>
      <Tracking />
      <p>Welcome</p>
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>
