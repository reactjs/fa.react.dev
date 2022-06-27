---
id: dom-elements
title: المنت‌های DOM
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

به دلیل کارایی و سازگاری با مرورگرهای مختلف، ری‌اکت سیستم DOM خود را، مستقل از مرورگر پیاده‌سازی می‌کند. ما از این فرصت استفاده کردیم تا مقداری به زمختی های پیاده‌سازی DOM در مرورگر نظم دهیم.

در ری‌اکت، تمامی ویژگی‌ها و صفات DOM (از جلمه event handler ها) باید به صورت camelCase باشند. برای مثال، صفت `tabindex` در HTML با صفت `tabIndex` در ری‌اکت مطابقت دارد. استثناهایی که وجود دارند یکی صفات `aria-*` و دیگری صفات `data-*` هستند که باید با حروف کوچک نوشته بشوند. برای مثال `aria-label` همان `aria-label` باقی می‌ماند.

## تفاوت بین صفات {#differences-in-attributes}

صفاتی وجود دارند که عملکردشان در ری‌اکت با HTML متفاوت است:

### checked {#checked}

صفت `checked` در کامپوننت های `<input>` که از تیپ `checkbox` یا `radio` هستند قابل استفاده است. شما میتوانید از آن بدین شکل که وضعیت کامپوننت چک خورده باشد یا نه استفاده کنید. این برای ساختن کامپوننت‌های کنترل شده مناسب است. معادل کنترل نشده آن `defaultChecked` هست که فقط وضعیت چک خوردن همان اول کامپوننت را هنگام mount شدن بر عهده دارد.

### className {#classname}

برای اختصاص دادن یک کلاس CSS، از صفت `className` استفاده کنید. این در مورد همه المنت های معمول DOM و SVG مانند `<div>`، `<a>` و سایرین صدق می‌کند.

اگر از ری‌اکت برای Web Components (که البته رایج نیست) استفاده می‌کنید، صفت class را مورد استفاده قرار دهید.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

`dangerouslySetInnerHTML` جایگزین ری‌اکت برای `innerHTML` جهت استفاده در DOM مرورگر است. به طور کلی، قرار دادن HTML از داخل کد، کار پر خطریست، برای این‌که به‌راحتی  کاربران را در معرض حمله [تزریق اسکریپت از طریق وبگاه (XSS)](https://fa.wikipedia.org/wiki/%D8%AA%D8%B2%D8%B1%DB%8C%D9%82_%D8%A7%D8%B3%DA%A9%D8%B1%DB%8C%D9%BE%D8%AA_%D8%A7%D8%B2_%D8%B7%D8%B1%DB%8C%D9%82_%D9%88%D8%A8%DA%AF%D8%A7%D9%87) قرار می‌دهد. البته که می‌توانید مستقیما HTML را از طریق ری‌اکت وارد کنید، اما باید بنویسید `dangerouslySetInnerHTML` و یک شئ با کلید `__html` در آن قرار بدهید تا به خودتان یادآوری کنید که کار خطرناکی کرده‌اید. برای مثال:

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

رویداد `onChange` رفتاری که از او انتظار می‌رود را دارد: هر وقت که یک فیلد از فرم تغییر کند، این رویداد اجرا می‌شود. ما عمدا از رفتار آن، آن طور که در مرورگر تعریف شده تبعیت نمی کنیم، چون `onChange` نامی اشتباه برای رفتارش دارد و ری‌اکت برای مدیریت زنده ی اطلاعات وارد شده توسط کاربر به آن اتکا دارد.

### selected {#selected}

اگر می خواهید یک `<option>` را در حالت انتخاب‌شده قرار دهید، مقدار `value` آن را به مقدار `value` تگ `<select> بدهید.
 برای یافتن دستورالعمل با جزییات، به ["تگ select"](/docs/forms.html#the-select-tag) مراجعه کنید.

### style {#style}

>توجه
>
>بعضی مثال‌های این مستندات از `style` برای راحتی کار استفاده می‌کند، اما **استفاده کردن از صفت style به عنوان راهکار اصلی برای style دادن به المنت‌ها، عموما پیشنهاد نمی‌شود. ** در غالب موارد، [`className`](#classname) باید برای ارجاع دادن به کلاس‌های تعریف شده در یک CSS stylesheet خارجی استفاده شود. `style` معمولا در اپلیکیشن های ری‌اکت وقتی استفاده می‌شود که نیاز به اضافه کردن style های پویا در زمان render باشد. مراجعه کنید به [سوالات متداول: style دادن و CSS](/docs/faq-styling.html). صفت `style`، یک شئ جاوااسکریپت با ویژگی‌های camelCased قبول می‌کند، نه اینکه یک رشته CSS قبول کند. این با ویژگی `style` جاوااسکریپت در DOM سازگاری دارد، بهینه‌تر است و از حفره‌های امنیتی XSS جلوگیری می‌کند. برای مثال:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

به یاد داشته باشید که style ها به صورت اتوماتیک prefix ندارند. برای این‌که بتوانید مرورگرهای قدیمی را هم پشتیبانی کنید، باید ویژگی‌های مربوطه style را خودتان اضافه کنید:

```js
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```
کلیدهای style به صورت camelCase هستند تا با روشی که node به ویژگی‌های DOM از طریق جاوااسکریپت دسترسی پیدا می‌کند، سازگاری داشته‌باشد (مثال: `node.style.backgroundImage`). همه Vendor Prefix ها [به جز `ms`](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) باید با حرف بزرگ شروع بشوند. برای همین است که `WebkitTransition` در ابتدا یک "W" بزرگ دارد.

ری‌اکت به طور اتوماتیک یک پسوند "px" به برخی ویژگی‌های عددی style درخط (inline) اضافه می‌کند. اگر می‌خواهید واحدی غیر از "px" استفاده کنید، مقدار آن را به صورت یک رشته همراه با واحد مورد نظر وارد کنید. برای مثال:

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

البته همه ویژگی‌های style به رشته و پیکسل تبدیل نمی‌شوند. برخی از آنها بدون واحد باقی می‌مانند (مثلا `zoom`، `order` و `flex`). لیست کامل این ویژگی‌های بدون واحد در [اینجا](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) قابل مشاهده است.

### suppressContentEditableWarning {#suppresscontenteditablewarning}

معمولا، هر وقت که یک المنت والد به عنوان `contentEditable` علامت‌ گذاری می‌شود، هشداری داده می شود چون کار نخواهد کرد. این صفت باعث می‌شود تا آن هشدار مسکوت باقی بماند. از این استفاده نکنید، مگر اینکه یک کتابخانه ای دارید می‌سازید مثل [Draft.js](https://facebook.github.io/draft-js/) که خودش به صورت دستی `contentEditable` را مدیریت می‌کند.

### suppressHydrationWarning {#suppresshydrationwarning}

اگر از rendering سمت سروری ری‌اکت استفاده می‌کنید، در صورتی که محتوای render شده کلاینت با محتوای render شده سرور متفاوت باشد، هشداری دریافت می‌کنید. البته، در برخی موارد خیلی سخت است که دقیقا با همدیگر جور بشوند. برای مثال timestamp ها بین سرور و کلاینت متفاوت خواهند بود.

<<<<<<< HEAD
اگر شما `suppressHydrationWarning` را برای المنتی `true` کنید، ری‌اکت برای مغایرت‌های صفات و محتوای آن المنت به شما هشدار نخواهد داد. فقط تا یک سطح از عمق کار خواهد کرد، و این هم به منظور یک راه فرار است، زیاد از آن استفاده نکنید. شما می‌توانید در مورد hydration در [اسناد `ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) بیشتر بخوانید.
=======
If you set `suppressHydrationWarning` to `true`, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don't overuse it. You can read more about hydration in the [`ReactDOM.hydrateRoot()` documentation](/docs/react-dom-client.html#hydrateroot).
>>>>>>> c1c3d1db304adfa5446accb0312e60d515188414

### value {#value}

صفت `value` توسط کامپوننت های `<input>`، `<select>` و `<textarea>` پشتیبانی می‌شود. شما می‌توانید از آن برای تعیین مقدار یک کامپوننت استفاده کنید. این برای ساختن کامپوننت های کنترل‌شده مناسب است. `defaultValue` معادل غیر کنترلی آن است، که مقدار کامپوننت را در هنگام mount شدن تعیین می‌کند.

## تمام صفات HTML قابل پشتیبانی {#all-supported-html-attributes}

بعد از ری‌اکت ۱۶، هر صفت استاندارد [یا سفارشی](/blog/2017/09/08/dom-attributes-in-react-16.html)DOM کاملا پشتیبانی می‌شود.

AP‌Iای که ری‌اکت برای DOM ارائه کرده، همیشه با محوریت JavaScript بوده‌است. از آن‌جایی که کامپوننت‌های ری‌اکت معمولا هم prop‌های مربوط به DOM و همpropهای سفارشی را دریافت می‌کند، ری‌اکت از قانون camelCase استفاده می‌کند. درست مشابه APIهایی که DOM ارائه می‌کند:

```js
<div tabIndex={-1} />      // Just like node.tabIndex DOM API
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

شما می‌توانید صفات سفارشی را استفاده کنید تا وقتی که کاملا با حروف کوچک باشند.