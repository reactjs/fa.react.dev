---
id: dom-elements
title: المنت های DOM
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

ری‌اکت دارای سیستم DOM مستقل از مرورگر برای کارایی و سازگاری با مرورگر هاست.
 از این فرصت استفاده کردیم تا مقداری زمختی های پیاده سازی DOM مرورگر را مرتب و منظم کنیم.

در ری‌اکت، تمامی ویژگی ها و صفات DOM (از جلمه event handlers) باید به صورت camelCased باشند. برای مثال، صفت HTML `tabindex` با صفت `tabIndex` در ری‌اکت مطابقت دارد. استثناهایی که وجود دارند یکی صفات `aria-*` و دیگری صفات `data-*` هستند که باید 
با حروف کوچک نوشته بشوند. برای مثال `aria-label` همان `aria-label` باقی می‌ماند.

## تفاوت بین صفات {#differences-in-attributes}

صفاتی وجود دارند که عملکردشون در ری‌اکت با HTML متفاوت است:

### checked {#checked}

صفت `checked` در کامپوننت های `<input>` که از تیپ `checkbox` یا `radio` هستند قابل استفاده است. شما میتوانید از آن بدین شکل که وضعیت کامپوننت چک خورده باشد یا نه استفاده کنید. این برای ساختن کامپوننت های قابل کنترل مناسب است. معادل غیر کنترلی آن `defaultChecked` هست که فقط وضعیت چک خوردن همان اول کامپوننت را هنگام سوار شدن بر عهده دارد.

### className {#classname}

برای اختصاص دادن یک کلاس CSS، از صفت `className` استفاده کنید. این در مورد همه المنت های معمول DOM و SVG مانند `<div>`، `<a>` و سایرین صدق می‌کند.

اگر با ری‌اکت از وب کامپوننتس (که البته رایج نیست) استفاده می‌کنید، صفت `class` را مورد استفاده قرار دهید.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` جایگزین ری‌اکت برای `innerHTML` جهت استفاده در DOM مرورگر است. به طور کلی، قرار دادن HTML از داخل کد، کار پر خطریست، برای اینکه به راحتی  کاربران را در معرض حمله [تزریق اسکریپت از طریق وبگاه](https://fa.wikipedia.org/wiki/%D8%AA%D8%B2%D8%B1%DB%8C%D9%82_%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA_%D8%A7%D8%B2_%D8%B7%D8%B1%DB%8C%D9%82_%D9%88%D8%A8%DA%AF%D8%A7%D9%87) قرار می‌دهد. البته که میتوانید مستقیما HTML را از طریق ری‌اکت وارد کنید، اما باید بنویسید `dangerouslySetInnerHTML` و یک شئ با کلید `__html` در آن قرار بدهید تا به خودتان یادآوری کنید که کار خطرناکی کرده اید.

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

از اونجایی که `for` کلمه رزرو شده ای در جاوااسکریپت هست، المنت های ری‌اکت از `htmlFor` استفاده میکنند.

### onChange {#onchange}

رویداد `onChange` رفتاری که از او انتظار میرود را دارد: هر وقت که یک مکان درون فرم تغییر کند، این رویداد به صدا در میاید. ما مخصوصا از رفتار موجود مرورگر استفاده نمی‌کنیم، چون `onChange` یک اشتباه لغتیست برای کاری که انجام میدهد و اینکه ری‌اکت به این رویداد برای رسیدگی بی‌درنگ به ورودی کاربر تکیه می‌کند.

### selected {#selected}

صفت `selected` توسط کامپوننت های `<option>` پشتیبانی می‌شود. شما می‌توانید از آن برای تعیین اینکه کامپوننت انتخاب شده یا نه استفاده کنید. این برای ساختن کامپوننت های کنترل مناسب است.

### style {#style}

>یادداشت
>
>بعضی مثال ها در این مستندات از `style` برای راحتی کار استفاده می‌کنند، اما
**استفاده کردن از صفت `style` به عنوان راهکار اصلی چیدمان المنت ها، عموما پیشنهاد نمی‌شود.** در غالب موارد، [`className`](#classname) باید برای ارجاع دادن به کلاس های تعریف شده در یک CSS stylesheet خارجی استفاده شود. `style` معمولا در اپلیکیشن های ری‌اکت وقتی استفاده می‌شود که نیاز به اضافه کردن چیدمان های دینامیک در زمان render باشد. مراجعه کنید به [FAQ: Styling and CSS](/docs/faq-styling.html).

صفت `style`، یک شئ جاوااسکریپت با ویژگی های camelCased قبول می‌کند، نه اینکه یک رشته CSS قبول کند. این با ویژگی `style` جاوااسکریپت در DOM سازگاری دارد، بهینه تر است و از منافذ حمله XSS جلوگیری می‌کند. برای مثال:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

به یاد داشته باشید که چیدمان ها به صورت اتوماتیک prefix ندارند. برای اینکه بتوانید مرورگرهای قدیمی را هم پشتیبانی کنید، باید ویژگی های مربوطه چیدمان را خودتان اضافه کنید.

```js
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```
کلیدهای چیدمان به صورت camelCased هستند که این موضوع برای سازگاری داشتن با طریقه دستیابی به ویژگی‌های node های DOM از طریق  جاوااسکریپت هست (به عنوان نمونه: `node.style.backgroundImage`). همه Vendor Prefix ها [به جز `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) باید با حرف بزرگ شروع بشوند. برای همین است که `WebkitTransition` در ابتدا یک "W" بزرگ دارد.

ری‌اکت به طور اتوماتیک یک پسوند "px" به برخی ویژگی‌های عددی درون-خطی چیدمان اضافه می‌کند. اگر می‌خواهید واحدی غیر از "px" استفاده کنید، مقدار آن را به صورت یک رشته همراه با واحد مورد نظر وارد کنید. برای مثال:

```js
// Result style: '10px'
<div style={{ height: 10 }}>
  Hello World!
</div>

// Result style: '10%'
<div style={{ height: '10%' }}>
  Hello World!
</div>
```

البته همه ویژگی‌های چیدمان به رشته های پیکسلی تبدیل نمی‌شوند. برخی از آنها بدون واحد باقی می‌مانند (مثلا `zoom`, `order`, `flex`). لیست کامل این ویژگی‌های بدون واحد در [اینجا](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) قابل مشاهده است.

### suppressContentEditableWarning {#suppresscontenteditablewarning}

معمولا، هر وفت که یک المنت والد به عنوان `contentEditable` علامت‌ گذاری می‌شود، هشداری به صدا در می‌آید، چون مشکل ساز خواهد شد. این صفت باعث می‌شود تا آن هشدار مسکوت باقی بماند. از این استفاده نکنید، مگر اینکه یک کتابخانه ای دارید می‌سازید مثل [Draft.js](https://facebook.github.io/draft-js/) که خودش به صورت دستی `contentEditable` را مدیریت می‌کند.

### suppressHydrationWarning {#suppresshydrationwarning}

اگر از rendering درون-سروری ری‌اکت استفاده می‌کنید، در صورتی که محتوای render شده سرویس گیرنده با محتوای render شده سرور متفاوت باشد، هشداری دریافت می‌کنید.
البته، در برخی موارد خیلی سخت است که دقیقا با همدیگر جور بشوند. برای مثال مهر زمان ها بین سرور و سرویس گیرنده متفاوت خواهند بود.

اگر شما `suppressHydrationWarning` را برای المنتی `true` کنید، ری‌اکت برای مغایرت های صفات و محتوای آن المنت به شما هشدار نخواهد داد. فقط تا یک سطح عمق کار خواهد کرد، و این هم به منظور یک راه فرار است، زیاد از آن استفاده نکنید. شما می‌توانید در مورد hydration بیشتر بخوانید [`ReactDOM.hydrate()` documentation](/docs/react-dom.html#hydrate).

### value {#value}

صفت `value` توسط کامپوننت های `<input>` و `<textarea>` پشتیبانی می‌شود. شما می‌توانید از آن برای تعیین مقدار یک کامپوننت استفاده کنید. این برای ساختن کامپوننت های کنترل مناسب است. `defaultValue` معادل غیر کنترلی آن است، که مقدار کامپوننت را در هنگام سوار شدن تعیین می‌کند.

## تمام صفات HTML قابل پشتیبانی {#all-supported-html-attributes}

بعد از ری‌اکت ۱۶، هر صفت DOM استاندارد [یا شخصی ساز](/blog/2017/09/08/dom-attributes-in-react-16.html) کاملا پشتیبانی می‌شود.

ری‌اکت همیشه یک API حول جاوااسکریپت برای DOM ارائه کرده است. از آنجایی که کامپوننت های ری‌اکت معمولا prop های شخصی-ساز و مربوط به DOM را دریافت می‌کنند، ری‌اکت از عرف camelCased که در API های DOM وجود دارد استفاده می‌کند.

```js
<div tabIndex="-1" />      // Just like node.tabIndex DOM API
<div className="Button" /> // Just like node.className DOM API
<input readOnly={true} />  // Just like node.readOnly DOM API
```

این prop ها شبیه صفات HTML همگون خود کار می‌کنند، به استثناء موارد خاص که در بالا ذکر شده اند.

برخی از صفات DOM که توسط ری‌اکت پشتیبانی می‌شوند عبارتند از:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

به همین ترتیب، تمام صفات SVG کاملا پشتیبانی می‌شوند:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

شما می‌توانید صفات شخصی-ساز را استفاده کنید تا وقتی که کاملا با حروف کوچک باشند.
