---
style: "<style>"
---

<Intro>

[کامپوننت `<style>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) به شما اجازه می‌دهد stylesheetهای CSS درون‌خطی به سند خود اضافه کنید.

```js
<style>{` p { color: red; } `}</style>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<style>` {/*style*/}

برای اضافه کردن استایل‌های درون‌خطی به سند خود، [کامپوننت `<style>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) را رندر کنید. می‌توانید `<style>` را از هر کامپوننتی رندر کنید و ری‌اکت [در موارد خاص](#special-rendering-behavior) عنصر DOM مربوطه را در head سند قرار می‌دهد و استایل‌های یکسان را یکتا می‌کند.

```js
<style>{` p { color: red; } `}</style>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<style>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

* `children`: یک رشته، الزامی. محتوای stylesheet.
* `precedence`: یک رشته. به ری‌اکت می‌گوید که نود DOM `<style>` را کجا نسبت به بقیه در `<head>` سند رتبه‌بندی کند، که تعیین می‌کند کدام stylesheet می‌تواند دیگری را نادیده بگیرد. ری‌اکت استنباط می‌کند که مقادیر اولویتی که اول کشف می‌کند «پایین‌تر» و مقادیری که دیرتر کشف می‌کند «بالاتر» هستند. بسیاری از سیستم‌های استایل می‌توانند با یک مقدار اولویت واحد به‌خوبی کار کنند زیرا قوانین استایل اتمی هستند. stylesheetهایی با اولویت یکسان با هم می‌روند، چه تگ‌های `<link>` یا `<style>` درون‌خطی باشند یا با استفاده از توابع [`preinit`](/reference/react-dom/preinit) بارگذاری شده باشند.
* `href`: یک رشته. به ری‌اکت اجازه می‌دهد [استایل‌هایی که `href` یکسان دارند را یکتا کند](#special-rendering-behavior).
* `media`: یک رشته. stylesheet را به یک [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) خاص محدود می‌کند.
* `nonce`: یک رشته. یک [nonce رمزنگاری‌شده برای اجازه دادن به منبع](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) هنگام استفاده از یک Content Security Policy سخت‌گیرانه.
* `title`: یک رشته. نام یک [stylesheet جایگزین](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) را مشخص می‌کند.

پراپس‌هایی که استفاده از آن‌ها با ری‌اکت **توصیه نمی‌شود**:

* `blocking`: یک رشته. اگر برابر `"render"` باشد، به مرورگر دستور می‌دهد تا زمانی که stylesheet بارگذاری نشده صفحه را رندر نکند. ری‌اکت با استفاده از ساسپنس کنترل دقیق‌تری فراهم می‌کند.

#### رفتار رندر ویژه {/*special-rendering-behavior*/}

ری‌اکت می‌تواند کامپوننت‌های `<style>` را به `<head>` سند منتقل کند، stylesheetهای یکسان را یکتا کند، و هنگام بارگذاری stylesheet [معلق (suspend)](/reference/react/Suspense) شود.

برای انتخاب این رفتار، پراپ‌های `href` و `precedence` را ارائه کنید. ری‌اکت استایل‌ها را اگر `href` یکسان داشته باشند یکتا می‌کند. پراپ precedence به ری‌اکت می‌گوید که نود DOM `<style>` را کجا نسبت به بقیه در `<head>` سند رتبه‌بندی کند، که تعیین می‌کند کدام stylesheet می‌تواند دیگری را نادیده بگیرد.

این رفتار ویژه با سه نکته همراه است:

* ری‌اکت تغییرات پراپس‌ها را پس از رندر شدن استایل نادیده می‌گیرد. (ری‌اکت در محیط توسعه اگر این اتفاق بیفتد هشدار می‌دهد.)
* ری‌اکت هنگام استفاده از پراپ `precedence` همهٔ پراپس‌های اضافی را (به‌جز `href` و `precedence`) حذف می‌کند.
* ری‌اکت ممکن است استایل را حتی پس از unmount شدن کامپوننتی که آن را رندر کرده در DOM نگه دارد.

---

## نحوهٔ استفاده {/*usage*/}

### رندر یک stylesheet CSS درون‌خطی {/*rendering-an-inline-css-stylesheet*/}

اگر یک کامپوننت برای نمایش درست به استایل‌های CSS خاصی وابسته است، می‌توانید یک stylesheet درون‌خطی در داخل کامپوننت رندر کنید.

پراپ `href` باید stylesheet را به‌طور یکتا شناسایی کند، زیرا ری‌اکت stylesheetهایی که `href` یکسان دارند را یکتا می‌کند.
اگر پراپ `precedence` ارائه دهید، ری‌اکت stylesheetهای درون‌خطی را بر اساس ترتیب ظاهر شدن این مقادیر در درخت کامپوننت مرتب می‌کند.

stylesheetهای درون‌خطی هنگام بارگذاری مرزهای ساسپنس را فعال نمی‌کنند.
حتی اگر منابع ناهمگام مانند فونت‌ها یا تصاویر را بارگذاری کنند.

<SandpackWithHTMLOutput>

```js src/App.js active
import ShowRenderedHTML from './ShowRenderedHTML.js';
import { useId } from 'react';

function PieChart({data, colors}) {
  const id = useId();
  const stylesheet = colors.map((color, index) =>
    `#${id} .color-${index}: \{ color: "${color}"; \}`
  ).join();
  return (
    <>
      <style href={"PieChart-" + JSON.stringify(colors)} precedence="medium">
        {stylesheet}
      </style>
      <svg id={id}>
        …
      </svg>
    </>
  );
}

export default function App() {
  return (
    <ShowRenderedHTML>
      <PieChart data="..." colors={['red', 'green', 'blue']} />
    </ShowRenderedHTML>
  );
}
```

</SandpackWithHTMLOutput>
