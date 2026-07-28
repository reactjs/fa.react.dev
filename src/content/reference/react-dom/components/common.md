---
title: "کامپوننت‌های رایج (مانند <div>)"
---

<Intro>

تمام کامپوننت‌های داخلی مرورگر، مانند [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)، از برخی پراپس‌ها و رویدادهای رایج پشتیبانی می‌کنند.

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### کامپوننت‌های رایج (مانند `<div>`) {/*common*/}

```js
<div className="wrapper">Some content</div>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*common-props*/}

این پراپس‌های خاص ری‌اکت برای تمام کامپوننت‌های داخلی پشتیبانی می‌شوند:

* `children`: یک گرهٔ ری‌اکت (یک المان، یک رشته، یک عدد، [یک پورتال،](/reference/react-dom/createPortal) یک گرهٔ خالی مانند `null`، `undefined` و مقادیر بولی، یا یک آرایه از سایر گره‌های ری‌اکت). محتوای داخل کامپوننت را مشخص می‌کند. وقتی از JSX استفاده می‌کنید، معمولاً پراپس `children` را به‌صورت ضمنی با تودرتو کردن تگ‌هایی مانند `<div><span /></div>` مشخص می‌کنید.

* `dangerouslySetInnerHTML`: یک شیء به‌فرم `{ __html: '<p>some html</p>' }` که درون آن یک رشتهٔ HTML خام قرار دارد. ویژگی [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) گرهٔ DOM را بازنویسی کرده و HTML پاس‌شده را درون آن نمایش می‌دهد. باید با احتیاط فراوان از آن استفاده کنید! اگر HTML درون آن قابل اعتماد نباشد (مثلاً اگر بر پایهٔ داده‌های کاربر باشد)، ریسک ایجاد یک آسیب‌پذیری [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) را به‌همراه دارد. [اطلاعات بیشتر دربارهٔ استفاده از `dangerouslySetInnerHTML` را بخوانید.](#dangerously-setting-the-inner-html)

* `ref`: یک شیء رفرنس از [`useRef`](/reference/react/useRef) یا [`createRef`](/reference/react/createRef)، یا یک [تابع کالبک `ref`](#ref-callback)، یا یک رشته برای [رفرنس‌های قدیمی.](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) رفرنس شما با المان DOM این گره پر خواهد شد. [اطلاعات بیشتر دربارهٔ دستکاری DOM با رفرنس‌ها را بخوانید.](#manipulating-a-dom-node-with-a-ref)

* `suppressContentEditableWarning`: یک مقدار بولی. اگر `true` باشد، هشداری که ری‌اکت برای المان‌هایی که هم `children` و هم `contentEditable={true}` دارند نمایش می‌دهد (که معمولاً با هم کار نمی‌کنند) را خاموش می‌کند. اگر در حال ساخت یک کتابخانه ورودی متنی هستید که محتوای `contentEditable` را به‌صورت دستی مدیریت می‌کند، از این استفاده کنید.

* `suppressHydrationWarning`: یک مقدار بولی. اگر از [رندر سمت سرور](/reference/react-dom/server) استفاده می‌کنید، معمولاً وقتی سرور و کلاینت محتوای متفاوتی رندر می‌کنند هشداری نمایش داده می‌شود. در موارد نادر (مانند مهرهای زمانی)، تضمین تطابق دقیق بسیار سخت یا غیرممکن است. اگر `suppressHydrationWarning` را روی `true` تنظیم کنید، ری‌اکت دربارهٔ عدم تطابق در ویژگی‌ها و محتوای آن المان به شما هشدار نخواهد داد. این فقط یک سطح عمیق کار می‌کند و به‌عنوان یک راه فرار در نظر گرفته شده است. از آن زیاد‌استفاده نکنید. [دربارهٔ سرکوب خطاهای هیدریشن بخوانید.](/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors)

* `style`: یک شیء با استایل‌های CSS، مثلاً `{ fontWeight: 'bold', margin: 20 }`. مانند ویژگی [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) در DOM، نام ویژگی‌های CSS باید به‌صورت `camelCase` نوشته شوند، مثلاً `fontWeight` به‌جای `font-weight`. می‌توانید رشته یا عدد را به‌عنوان مقدار پاس دهید. اگر عددی مانند `width: 100` پاس دهید، ری‌اکت به‌طور خودکار `px` («پیکسل») را به مقدار اضافه می‌کند، مگر اینکه یک [ویژگی بدون واحد](https://github.com/facebook/react/blob/81d4ee9ca5c405dce62f64e61506b8e155f38d8d/packages/react-dom-bindings/src/shared/CSSProperty.js#L8-L57) باشد. توصیه می‌کنیم از `style` فقط برای استایل‌های پویایی که مقادیرشان را از پیش نمی‌دانید استفاده کنید. در غیر این صورت، اعمال کلاس‌های سادهٔ CSS با `className` کارآمدتر است. [اطلاعات بیشتر دربارهٔ `className` و `style`.](#applying-css-styles)

این پراپس‌های استاندارد DOM نیز برای تمام کامپوننت‌های داخلی پشتیبانی می‌شوند:

* [`accessKey`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey): یک رشته. میان‌بر صفحه‌کلید را برای المان مشخص می‌کند. [به‌طور کلی توصیه نمی‌شود.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey#accessibility_concerns)
* [`aria-*`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes): ویژگی‌های ARIA به شما اجازه می‌دهند اطلاعات درخت دسترس‌پذیری را برای این المان مشخص کنید. برای مرجع کامل به [ویژگی‌های ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) مراجعه کنید. در ری‌اکت، تمام نام‌های ویژگی ARIA دقیقاً همانند HTML هستند.
* [`autoCapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize): یک رشته. مشخص می‌کند که آیا ورودی کاربر باید بزرگ‌نویسی شود و چگونه.
* [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className): یک رشته. نام کلاس CSS المان را مشخص می‌کند. [اطلاعات بیشتر دربارهٔ اعمال استایل‌های CSS.](#applying-css-styles)
* [`contentEditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable): یک مقدار بولی. اگر `true` باشد، مرورگر به کاربر اجازه می‌دهد المان رندرشده را مستقیماً ویرایش کند. این برای پیاده‌سازی کتابخانه‌های ورودی متن غنی مانند [Lexical](https://lexical.dev/) استفاده می‌شود. ری‌اکت هشدار می‌دهد اگر سعی کنید فرزندان ری‌اکت را به المانی با `contentEditable={true}` پاس دهید، زیرا ری‌اکت پس از ویرایش‌های کاربر قادر به به‌روزرسانی محتوای آن نخواهد بود.
* [`data-*`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*): ویژگی‌های داده به شما اجازه می‌دهند داده‌های رشته‌ای را به المان پیوست کنید، مثلاً `data-fruit="banana"`. در ری‌اکت، این‌ها معمولاً استفاده نمی‌شوند زیرا معمولاً به‌جای آن داده‌ها را از پراپس یا استیت می‌خوانید.
* [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir): یا `'ltr'` یا `'rtl'`. جهت متن المان را مشخص می‌کند.
* [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable): یک مقدار بولی. مشخص می‌کند که آیا المان قابل کشیدن است. بخشی از [HTML Drag and Drop API.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
* [`enterKeyHint`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint): یک رشته. مشخص می‌کند که کدام عمل برای کلید Enter روی صفحه‌کلیدهای مجازی نمایش داده شود.
* [`htmlFor`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor): یک رشته. برای [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) و [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output)، به شما اجازه می‌دهد [برچسب را با یک کنترل مرتبط کنید.](/reference/react-dom/components/input#providing-a-label-for-an-input) همانند [ویژگی HTML `for`.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) ری‌اکت از نام‌های ویژگی استاندارد DOM (`htmlFor`) به‌جای نام‌های ویژگی HTML استفاده می‌کند.
* [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden): یک مقدار بولی یا یک رشته. مشخص می‌کند که آیا المان باید پنهان شود.
* [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id): یک رشته. یک شناسهٔ یکتا برای این المان مشخص می‌کند که می‌تواند بعداً برای یافتن آن یا اتصال آن به سایر المان‌ها استفاده شود. آن را با [`useId`](/reference/react/useId) تولید کنید تا از تداخل بین نمونه‌های متعدد همان کامپوننت جلوگیری شود.
* [`is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is): یک رشته. اگر مشخص شود، کامپوننت مانند یک [المان سفارشی](/reference/react-dom/components#custom-html-elements) رفتار خواهد کرد.
* [`inputMode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode): یک رشته. مشخص می‌کند چه نوع صفحه‌کلیدی نمایش داده شود (مثلاً متن، عدد یا تلفن).
* [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop): یک رشته. مشخص می‌کند که المان کدام ویژگی را برای خزشنده‌های داده‌های ساختاریافته نمایش می‌دهد.
* [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang): یک رشته. زبان المان را مشخص می‌کند.
* [`onAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event): یک [تابع هندلر `AnimationEvent`](#animationevent-handler). وقتی یک انیمیشن CSS کامل می‌شود فعال می‌شود.
* `onAnimationEndCapture`: نسخه‌ای از `onAnimationEnd` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event): یک [تابع هندلر `AnimationEvent`](#animationevent-handler). وقتی یک تکرار از یک انیمیشن CSS تمام شده و تکرار دیگر آغاز می‌شود فعال می‌شود.
* `onAnimationIterationCapture`: نسخه‌ای از `onAnimationIteration` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event): یک [تابع هندلر `AnimationEvent`](#animationevent-handler). وقتی یک انیمیشن CSS آغاز می‌شود فعال می‌شود.
* `onAnimationStartCapture`: `onAnimationStart`، اما در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onAuxClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی دکمهٔ غیراصلی نشانگر کلیک می‌شود فعال می‌شود.
* `onAuxClickCapture`: نسخه‌ای از `onAuxClick` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* `onBeforeInput`: یک [تابع هندلر `InputEvent`](#inputevent-handler). قبل از اینکه مقدار یک المان قابل‌ویرایش تغییر کند فعال می‌شود. ری‌اکت هنوز از رویداد بومی [`beforeinput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event) استفاده *نمی‌کند*، و در عوض سعی می‌کند آن را با رویدادهای دیگر پلی‌فیل کند.
* `onBeforeInputCapture`: نسخه‌ای از `onBeforeInput` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* `onBlur`: یک [تابع هندلر `FocusEvent`](#focusevent-handler). وقتی المان تمرکز را از دست می‌دهد فعال می‌شود. برخلاف رویداد بومی مرورگر [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event)، در ری‌اکت رویداد `onBlur` بالا می‌رود (bubble).
* `onBlurCapture`: نسخه‌ای از `onBlur` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی دکمهٔ اصلی روی دستگاه اشاره‌گر کلیک می‌شود فعال می‌شود.
* `onClickCapture`: نسخه‌ای از `onClick` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCompositionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event): یک [تابع هندلر `CompositionEvent`](#compositionevent-handler). وقتی یک [ویرایشگر روش ورودی](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) یک نشست composition جدید آغاز می‌کند فعال می‌شود.
* `onCompositionStartCapture`: نسخه‌ای از `onCompositionStart` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCompositionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event): یک [تابع هندلر `CompositionEvent`](#compositionevent-handler). وقتی یک [ویرایشگر روش ورودی](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) یک نشست composition را کامل یا لغو می‌کند فعال می‌شود.
* `onCompositionEndCapture`: نسخه‌ای از `onCompositionEnd` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCompositionUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event): یک [تابع هندلر `CompositionEvent`](#compositionevent-handler). وقتی یک [ویرایشگر روش ورودی](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) یک نویسهٔ جدید دریافت می‌کند فعال می‌شود.
* `onCompositionUpdateCapture`: نسخه‌ای از `onCompositionUpdate` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onContextMenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی کاربر سعی می‌کند یک منوی زمینه باز کند فعال می‌شود.
* `onContextMenuCapture`: نسخه‌ای از `onContextMenu` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCopy`](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event): یک [تابع هندلر `ClipboardEvent`](#clipboardevent-handler). وقتی کاربر سعی می‌کند چیزی را در کلیپ‌بورد کپی کند فعال می‌شود.
* `onCopyCapture`: نسخه‌ای از `onCopy` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/cut_event): یک [تابع هندلر `ClipboardEvent`](#clipboardevent-handler). وقتی کاربر سعی می‌کند چیزی را در کلیپ‌بورد برش دهد فعال می‌شود.
* `onCutCapture`: نسخه‌ای از `onCut` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* `onDoubleClick`: یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی کاربر دو بار کلیک می‌کند فعال می‌شود. معادل [رویداد `dblclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event) مرورگر است.
* `onDoubleClickCapture`: نسخه‌ای از `onDoubleClick` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDrag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). در حالی که کاربر در حال کشیدن چیزی است فعال می‌شود. 
* `onDragCapture`: نسخه‌ای از `onDrag` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDragEnd`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). وقتی کاربر کشیدن چیزی را متوقف می‌کند فعال می‌شود. 
* `onDragEndCapture`: نسخه‌ای از `onDragEnd` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDragEnter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). وقتی محتوای کشیده‌شده وارد یک هدف رها کردن معتبر می‌شود فعال می‌شود. 
* `onDragEnterCapture`: نسخه‌ای از `onDragEnter` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDragOver`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). روی یک هدف رها کردن معتبر در حالی که محتوای کشیده‌شده روی آن قرار دارد فعال می‌شود. باید در اینجا `e.preventDefault()` را فراخوانی کنید تا اجازهٔ رها کردن داده شود.
* `onDragOverCapture`: نسخه‌ای از `onDragOver` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDragStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). وقتی کاربر کشیدن یک المان را آغاز می‌کند فعال می‌شود.
* `onDragStartCapture`: نسخه‌ای از `onDragStart` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDrop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event): یک [تابع هندلر `DragEvent`](#dragevent-handler). وقتی چیزی روی یک هدف رها کردن معتبر رها می‌شود فعال می‌شود.
* `onDropCapture`: نسخه‌ای از `onDrop` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* `onFocus`: یک [تابع هندلر `FocusEvent`](#focusevent-handler). وقتی المان تمرکز دریافت می‌کند فعال می‌شود. برخلاف رویداد بومی مرورگر [`focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)، در ری‌اکت رویداد `onFocus` بالا می‌رود (bubble).
* `onFocusCapture`: نسخه‌ای از `onFocus` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onGotPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی یک المان به‌صورت برنامه‌نویسی‌شده یک نشانگر را capture می‌کند فعال می‌شود.
* `onGotPointerCaptureCapture`: نسخه‌ای از `onGotPointerCapture` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onKeyDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event): یک [تابع هندلر `KeyboardEvent`](#keyboardevent-handler). وقتی کلیدی فشرده می‌شود فعال می‌شود.
* `onKeyDownCapture`: نسخه‌ای از `onKeyDown` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onKeyPress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event): یک [تابع هندلر `KeyboardEvent`](#keyboardevent-handler). منسوخ‌شده. به‌جای آن از `onKeyDown` یا `onBeforeInput` استفاده کنید.
* `onKeyPressCapture`: نسخه‌ای از `onKeyPress` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onKeyUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event): یک [تابع هندلر `KeyboardEvent`](#keyboardevent-handler). وقتی کلیدی رها می‌شود فعال می‌شود.
* `onKeyUpCapture`: نسخه‌ای از `onKeyUp` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onLostPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی یک المان capture نشانگر را متوقف می‌کند فعال می‌شود.
* `onLostPointerCaptureCapture`: نسخه‌ای از `onLostPointerCapture` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onMouseDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر فشرده می‌شود فعال می‌شود.
* `onMouseDownCapture`: نسخه‌ای از `onMouseDown` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onMouseEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر وارد یک المان می‌شود فعال می‌شود. فاز capture ندارد. در عوض، `onMouseLeave` و `onMouseEnter` از المانی که در حال ترک آن است به المانی که در حال ورود به آن است انتشار می‌یابند.
* [`onMouseLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر از یک المان خارج می‌شود فعال می‌شود. فاز capture ندارد. در عوض، `onMouseLeave` و `onMouseEnter` از المانی که در حال ترک آن است به المانی که در حال ورود به آن است انتشار می‌یابند.
* [`onMouseMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر مختصاتش را تغییر می‌دهد فعال می‌شود.
* `onMouseMoveCapture`: نسخه‌ای از `onMouseMove` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onMouseOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر از یک المان خارج می‌شود، یا اگر وارد یک المان فرزند شود فعال می‌شود.
* `onMouseOutCapture`: نسخه‌ای از `onMouseOut` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onMouseUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event): یک [تابع هندلر `MouseEvent`](#mouseevent-handler). وقتی نشانگر رها می‌شود فعال می‌شود.
* `onMouseUpCapture`: نسخه‌ای از `onMouseUp` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPointerCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی مرورگر یک تعامل نشانگر را لغو می‌کند فعال می‌شود.
* `onPointerCancelCapture`: نسخه‌ای از `onPointerCancel` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPointerDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی یک نشانگر فعال می‌شود فعال می‌شود.
* `onPointerDownCapture`: نسخه‌ای از `onPointerDown` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPointerEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی نشانگر وارد یک المان می‌شود فعال می‌شود. فاز capture ندارد. در عوض، `onPointerLeave` و `onPointerEnter` از المانی که در حال ترک آن است به المانی که در حال ورود به آن است انتشار می‌یابند.
* [`onPointerLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی نشانگر از یک المان خارج می‌شود فعال می‌شود. فاز capture ندارد. در عوض، `onPointerLeave` و `onPointerEnter` از المانی که در حال ترک آن است به المانی که در حال ورود به آن است انتشار می‌یابند.
* [`onPointerMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی نشانگر مختصاتش را تغییر می‌دهد فعال می‌شود.
* `onPointerMoveCapture`: نسخه‌ای از `onPointerMove` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPointerOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی نشانگر از یک المان خارج می‌شود، اگر تعامل نشانگر لغو شود، و [چند دلیل دیگر](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event) فعال می‌شود.
* `onPointerOutCapture`: نسخه‌ای از `onPointerOut` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPointerUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event): یک [تابع هندلر `PointerEvent`](#pointerevent-handler). وقتی یک نشانگر دیگر فعال نیست فعال می‌شود.
* `onPointerUpCapture`: نسخه‌ای از `onPointerUp` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPaste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event): یک [تابع هندلر `ClipboardEvent`](#clipboardevent-handler). وقتی کاربر سعی می‌کند چیزی را از کلیپ‌بورد جای‌گذاری کند فعال می‌شود.
* `onPasteCapture`: نسخه‌ای از `onPaste` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onScroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک المان اسکرول شده است فعال می‌شود. این رویداد بالا نمی‌رود (bubble).
* `onScrollCapture`: نسخه‌ای از `onScroll` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): یک [تابع هندلر `Event`](#event-handler). پس از تغییر انتخاب درون یک المان قابل‌ویرایش مانند یک ورودی فعال می‌شود. ری‌اکت رویداد `onSelect` را گسترش می‌دهد تا برای المان‌های `contentEditable={true}` نیز کار کند. علاوه بر این، ری‌اکت آن را گسترش می‌دهد تا برای انتخاب‌های خالی و هنگام ویرایش‌ها (که ممکن است بر انتخاب تأثیر بگذارد) فعال شود.
* `onSelectCapture`: نسخه‌ای از `onSelect` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTouchCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event): یک [تابع هندلر `TouchEvent`](#touchevent-handler). وقتی مرورگر یک تعامل لمسی را لغو می‌کند فعال می‌شود.
* `onTouchCancelCapture`: نسخه‌ای از `onTouchCancel` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTouchEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event): یک [تابع هندلر `TouchEvent`](#touchevent-handler). وقتی یک یا چند نقطهٔ لمسی حذف می‌شوند فعال می‌شود.
* `onTouchEndCapture`: نسخه‌ای از `onTouchEnd` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTouchMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event): یک [تابع هندلر `TouchEvent`](#touchevent-handler). وقتی یک یا چند نقطهٔ لمسی جابجا می‌شوند فعال می‌شود.
* `onTouchMoveCapture`: نسخه‌ای از `onTouchMove` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTouchStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event): یک [تابع هندلر `TouchEvent`](#touchevent-handler). وقتی یک یا چند نقطهٔ لمسی قرار می‌گیرند فعال می‌شود.
* `onTouchStartCapture`: نسخه‌ای از `onTouchStart` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event): یک [تابع هندلر `TransitionEvent`](#transitionevent-handler). وقتی یک ترنزیشن CSS کامل می‌شود فعال می‌شود.
* `onTransitionEndCapture`: نسخه‌ای از `onTransitionEnd` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onWheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event): یک [تابع هندلر `WheelEvent`](#wheelevent-handler). وقتی کاربر دکمهٔ چرخ را می‌چرخاند فعال می‌شود.
* `onWheelCapture`: نسخه‌ای از `onWheel` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`role`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): یک رشته. نقش المان را برای فناوری‌های کمکی به‌طور صریح مشخص می‌کند.
* [`slot`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): یک رشته. نام slot را هنگام استفاده از shadow DOM مشخص می‌کند. در ری‌اکت، یک الگوی معادل معمولاً با پاس‌کردن JSX به‌عنوان پراپس به‌دست می‌آید، مثلاً `<Layout left={<Sidebar />} right={<Content />} />`.
* [`spellCheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck): یک مقدار بولی یا null. اگر به‌طور صریح روی `true` یا `false` تنظیم شود، بررسی املای را فعال یا غیرفعال می‌کند.
* [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex): یک عدد. رفتار پیش‌فرض دکمهٔ Tab را بازنویسی می‌کند. [از استفادهٔ مقادیری غیر از `-1` و `0` خودداری کنید.](https://www.tpgi.com/using-the-tabindex-attribute/)
* [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title): یک رشته. متن راهنمای ابزار (tooltip) را برای المان مشخص می‌کند.
* [`translate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate): یا `'yes'` یا `'no'`. پاس‌دادن `'no'` محتوای المان را از ترجمه شدن مستثنی می‌کند.

شما می‌توانید ویژگی‌های سفارشی را نیز به‌عنوان پراپس پاس کنید، مثلاً `mycustomprop="someValue"`. این می‌تواند هنگام یکپارچه‌سازی با کتابخانه‌های شخص ثالث مفید باشد. نام ویژگی سفارشی باید با حروف کوچک باشد و نباید با `on` شروع شود. مقدار به رشته تبدیل خواهد شد. اگر `null` یا `undefined` پاس دهید، ویژگی سفارشی حذف خواهد شد.

این رویدادها فقط برای المان‌های [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) فعال می‌شوند:

* [`onReset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک فرم بازنشانی (reset) می‌شود فعال می‌شود.
* `onResetCapture`: نسخه‌ای از `onReset` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSubmit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک فرم ارسال می‌شود فعال می‌شود.
* `onSubmitCapture`: نسخه‌ای از `onSubmit` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.

این رویدادها فقط برای المان‌های [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) فعال می‌شوند. برخلاف رویدادهای مرورگر، در ری‌اکت بالا می‌روند (bubble):

* [`onCancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event): یک [تابع هندلر `Event`](#event-handler). وقتی کاربر سعی می‌کند دیالوگ را ببندد فعال می‌شود.
* `onCancelCapture`: نسخه‌ای از `onCancel` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onClose`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک دیالوگ بسته شده است فعال می‌شود.
* `onCloseCapture`: نسخه‌ای از `onClose` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.

این رویدادها فقط برای المان‌های [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) فعال می‌شوند. برخلاف رویدادهای مرورگر، در ری‌اکت بالا می‌روند (bubble):

* [`onToggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement/toggle_event): یک [تابع هندلر `Event`](#event-handler). وقتی کاربر جزئیات را باز/بسته می‌کند فعال می‌شود.
* `onToggleCapture`: نسخه‌ای از `onToggle` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.

این رویدادها برای المان‌های [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)، [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)، [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object)، [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed)، [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) و [SVG `<image>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Image_Tag) فعال می‌شوند. برخلاف رویدادهای مرورگر، در ری‌اکت بالا می‌روند (bubble):

* `onLoad`: یک [تابع هندلر `Event`](#event-handler). وقتی منبع بارگذاری شده است فعال می‌شود.
* `onLoadCapture`: نسخه‌ای از `onLoad` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): یک [تابع هندلر `Event`](#event-handler). وقتی منبع نتوانست بارگذاری شود فعال می‌شود.
* `onErrorCapture`: نسخه‌ای از `onError` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.

این رویدادها برای منابعی مانند [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) و [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) فعال می‌شوند. برخلاف رویدادهای مرورگر، در ری‌اکت بالا می‌روند (bubble):

* [`onAbort`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event): یک [تابع هندلر `Event`](#event-handler). وقتی منبع به‌طور کامل بارگذاری نشده است، اما نه به‌دلیل یک خطا فعال می‌شود.
* `onAbortCapture`: نسخه‌ای از `onAbort` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCanPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event): یک [تابع هندلر `Event`](#event-handler). وقتی داده‌های کافی برای شروع پخش وجود دارد، اما نه برای پخش تا انتها بدون buffering فعال می‌شود.
* `onCanPlayCapture`: نسخه‌ای از `onCanPlay` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onCanPlayThrough`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event): یک [تابع هندلر `Event`](#event-handler). وقتی داده‌ها آنقدر کافی است که احتمالاً امکان شروع پخش بدون buffering تا انتها وجود دارد فعال می‌شود.
* `onCanPlayThroughCapture`: نسخه‌ای از `onCanPlayThrough` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onDurationChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event): یک [تابع هندلر `Event`](#event-handler). وقتی مدت‌زمان رسانه به‌روز شده است فعال می‌شود.
* `onDurationChangeCapture`: نسخه‌ای از `onDurationChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onEmptied`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event): یک [تابع هندلر `Event`](#event-handler). وقتی رسانه خالی شده است فعال می‌شود.
* `onEmptiedCapture`: نسخه‌ای از `onEmptied` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onEncrypted`](https://w3c.github.io/encrypted-media/#dom-evt-encrypted): یک [تابع هندلر `Event`](#event-handler). وقتی مرورگر با رسانهٔ رمزگذاری‌شده مواجه می‌شود فعال می‌شود.
* `onEncryptedCapture`: نسخه‌ای از `onEncrypted` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onEnded`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event): یک [تابع هندلر `Event`](#event-handler). وقتی پخش به این دلیل متوقف می‌شود که چیزی برای پخش باقی نمانده است فعال می‌شود.
* `onEndedCapture`: نسخه‌ای از `onEnded` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): یک [تابع هندلر `Event`](#event-handler). وقتی منبع نتوانست بارگذاری شود فعال می‌شود.
* `onErrorCapture`: نسخه‌ای از `onError` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onLoadedData`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event): یک [تابع هندلر `Event`](#event-handler). وقتی فریم فعلی پخش بارگذاری شده است فعال می‌شود.
* `onLoadedDataCapture`: نسخه‌ای از `onLoadedData` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onLoadedMetadata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event): یک [تابع هندلر `Event`](#event-handler). وقتی متاداده‌ها بارگذاری شده‌اند فعال می‌شود.
* `onLoadedMetadataCapture`: نسخه‌ای از `onLoadedMetadata` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onLoadStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event): یک [تابع هندلر `Event`](#event-handler). وقتی مرورگر بارگذاری منبع را آغاز کرده است فعال می‌شود.
* `onLoadStartCapture`: نسخه‌ای از `onLoadStart` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPause`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event): یک [تابع هندلر `Event`](#event-handler). وقتی رسانه متوقف شده است فعال می‌شود.
* `onPauseCapture`: نسخه‌ای از `onPause` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event): یک [تابع هندلر `Event`](#event-handler). وقتی رسانه دیگر متوقف نیست فعال می‌شود.
* `onPlayCapture`: نسخه‌ای از `onPlay` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onPlaying`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event): یک [تابع هندلر `Event`](#event-handler). وقتی رسانه شروع به پخش می‌کند یا پخش را از سر می‌گیرد فعال می‌شود.
* `onPlayingCapture`: نسخه‌ای از `onPlaying` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onProgress`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event): یک [تابع هندلر `Event`](#event-handler). به‌طور دوره‌ای در حالی که منبع در حال بارگذاری است فعال می‌شود.
* `onProgressCapture`: نسخه‌ای از `onProgress` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onRateChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event): یک [تابع هندلر `Event`](#event-handler). وقتی نرخ پخش تغییر می‌کند فعال می‌شود.
* `onRateChangeCapture`: نسخه‌ای از `onRateChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* `onResize`: یک [تابع هندلر `Event`](#event-handler). وقتی ویدیو اندازه‌اش را تغییر می‌دهد فعال می‌شود.
* `onResizeCapture`: نسخه‌ای از `onResize` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSeeked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک عملیات جست‌وجو کامل می‌شود فعال می‌شود.
* `onSeekedCapture`: نسخه‌ای از `onSeeked` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSeeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event): یک [تابع هندلر `Event`](#event-handler). وقتی یک عملیات جست‌وجو آغاز می‌شود فعال می‌شود.
* `onSeekingCapture`: نسخه‌ای از `onSeeking` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onStalled`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event): یک [تابع هندلر `Event`](#event-handler). وقتی مرورگر در انتظار داده‌ها است اما بارگذاری نمی‌شود فعال می‌شود.
* `onStalledCapture`: نسخه‌ای از `onStalled` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSuspend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event): یک [تابع هندلر `Event`](#event-handler). وقتی بارگذاری منبع معلق شده است فعال می‌شود.
* `onSuspendCapture`: نسخه‌ای از `onSuspend` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onTimeUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event): یک [تابع هندلر `Event`](#event-handler). وقتی زمان پخش فعلی به‌روز می‌شود فعال می‌شود.
* `onTimeUpdateCapture`: نسخه‌ای از `onTimeUpdate` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onVolumeChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event): یک [تابع هندلر `Event`](#event-handler). وقتی صدا تغییر کرده است فعال می‌شود.
* `onVolumeChangeCapture`: نسخه‌ای از `onVolumeChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event): یک [تابع هندلر `Event`](#event-handler). وقتی پخش به‌دلیل کمبود موقت داده‌ها متوقف شده است فعال می‌شود.
* `onWaitingCapture`: نسخه‌ای از `onWaiting` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.

#### نکات {/*common-caveats*/}

- نمی‌توانید همزمان هم `children` و هم `dangerouslySetInnerHTML` را پاس دهید.
- برخی رویدادها (مانند `onAbort` و `onLoad`) در مرورگر بالا نمی‌روند (bubble نمی‌شوند)، اما در ری‌اکت بالا می‌روند.

---

### تابع کالبک `ref` {/*ref-callback*/}

به‌جای یک شیء رفرنس (مانند آنچه [`useRef`](/reference/react/useRef#manipulating-the-dom-with-a-ref) برمی‌گرداند)، می‌توانید یک تابع را به ویژگی `ref` پاس دهید.

```js
<div ref={(node) => {
  console.log('Attached', node);

  return () => {
    console.log('Clean up', node)
  }
}}>
```

[یک نمونه از استفاده از کالبک `ref` را ببینید.](/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback)

وقتی گرهٔ DOM `<div>` به صفحه اضافه می‌شود، ری‌اکت کالبک `ref` شما را با گرهٔ DOM `node` به‌عنوان آرگومان فراخوانی می‌کند. وقتی آن گرهٔ DOM `<div>` حذف می‌شود، ری‌اکت تابع پاک‌سازی که از کالبک بازگردانده‌اید را فراخوانی می‌کند.

ری‌اکت همچنین کالبک `ref` شما را هر بار که یک کالبک `ref` *متفاوت* پاس می‌دهید فراخوانی می‌کند. در مثال بالا، `(node) => { ... }` در هر رندر یک تابع متفاوت است. وقتی کامپوننت شما مجدداً رندر می‌شود، تابع *قبلی* با `null` به‌عنوان آرگومان فراخوانی می‌شود و تابع *بعدی* با گرهٔ DOM فراخوانی می‌شود.

#### پارامترها {/*ref-callback-parameters*/}

* `node`: یک گرهٔ DOM. ری‌اکت گرهٔ DOM را هنگام اتصال رفرنس به شما پاس می‌دهد. مگر اینکه همان ارجاع تابع را برای کالبک `ref` در هر رندر پاس دهید، کالبک در هر رندر مجدد کامپوننت موقتاً پاک‌سازی و مجدداً ایجاد می‌شود.

<Note>

#### ری‌اکت ۱۹ توابع پاک‌سازی را برای کالبک‌های `ref` اضافه کرد. {/*react-19-added-cleanup-functions-for-ref-callbacks*/}

برای پشتیبانی از سازگاری به‌عقب، اگر تابع پاک‌سازی از کالبک `ref` بازگردانده نشود، `node` با `null` هنگام جدا شدن `ref` فراخوانی خواهد شد. این رفتار در نسخهٔ آینده حذف خواهد شد.

</Note>

#### مقادیر بازگشتی {/*returns*/}

* **اختیاری** `تابع پاک‌سازی`: وقتی `ref` جدا می‌شود، ری‌اکت تابع پاک‌سازی را فراخوانی می‌کند. اگر تابعی توسط کالبک `ref` بازگردانده نشود، ری‌اکت هنگام جدا شدن `ref` کالبک را دوباره با `null` به‌عنوان آرگومان فراخوانی می‌کند. این رفتار در نسخهٔ آینده حذف خواهد شد.

#### نکات {/*caveats*/}

* وقتی حالت سخت‌گیرانه (Strict Mode) روشن است، ری‌اکت **یک چرخهٔ اضافی setup+cleanup فقط در محیط توسعه** پیش از setup واقعی اول اجرا می‌کند. این یک آزمون فشاری است که تضمین می‌کند منطق پاک‌سازی شما منطق setup را «منعکس» می‌کند و آنچه setup انجام می‌دهد را متوقف یا معکوس می‌کند. اگر این مشکل‌ساز می‌شود، تابع پاک‌سازی را پیاده‌سازی کنید.
* وقتی یک کالبک `ref` *متفاوت* پاس می‌دهید، ری‌اکت تابع پاک‌سازی کالبک *قبلی* را در صورت وجود فراخوانی می‌کند. اگر تابع پاک‌سازی تعریف نشده باشد، کالبک `ref` با `null` به‌عنوان آرگومان فراخوانی خواهد شد. تابع *بعدی* با گرهٔ DOM فراخوانی می‌شود.

---

### شیء رویداد ری‌اکت {/*react-event-object*/}

هندلرهای رویداد شما یک *شیء رویداد ری‌اکت* دریافت خواهند کرد. این گاهی به‌عنوان «رویداد سنتتیک» (synthetic event) نیز شناخته می‌شود.

```js
<button onClick={e => {
  console.log(e); // React event object
}} />
```

این شیء از همان استاندارد رویدادهای DOM زیرین پیروی می‌کند، اما برخی ناسازگاری‌های مرورگر را اصلاح می‌کند.

برخی رویدادهای ری‌اکت مستقیماً به رویدادهای بومی مرورگر نگاشت نمی‌شوند. مثلاً در `onMouseLeave`، `e.nativeEvent` به یک رویداد `mouseout` اشاره می‌کند. نگاشت خاص بخشی از API عمومی نیست و ممکن است در آینده تغییر کند. اگر به هر دلیلی به رویداد بومی مرورگر نیاز دارید، آن را از `e.nativeEvent` بخوانید.

#### ویژگی‌ها {/*react-event-object-properties*/}

اشیاء رویداد ری‌اکت برخی از ویژگی‌های استاندارد [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) را پیاده‌سازی می‌کنند:

* [`bubbles`](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles): یک مقدار بولی. برمی‌گرداند که آیا رویداد در DOM بالا می‌رود (bubble). 
* [`cancelable`](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable): یک مقدار بولی. برمی‌گرداند که آیا رویداد قابل لغو است.
* [`currentTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget): یک گرهٔ DOM. گره‌ای که هندلر فعلی در درخت ری‌اکت به آن متصل است را برمی‌گرداند.
* [`defaultPrevented`](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented): یک مقدار بولی. برمی‌گرداند که آیا `preventDefault` فراخوانی شده است.
* [`eventPhase`](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase): یک عدد. برمی‌گرداند که رویداد در حال حاضر در کدام فاز است.
* [`isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted): یک مقدار بولی. برمی‌گرداند که آیا رویداد توسط کاربر آغاز شده است.
* [`target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target): یک گرهٔ DOM. گره‌ای که رویداد روی آن رخ داده (که می‌تواند یک فرزند دور باشد) را برمی‌گرداند.
* [`timeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp): یک عدد. زمان وقوع رویداد را برمی‌گرداند.

علاوه بر این، اشیاء رویداد ری‌اکت این ویژگی‌ها را ارائه می‌دهند:

* `nativeEvent`: یک [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) DOM. شیء رویداد اصلی مرورگر.

#### متدها {/*react-event-object-methods*/}

اشیاء رویداد ری‌اکت برخی از متدهای استاندارد [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) را پیاده‌سازی می‌کنند:

* [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault): عمل پیش‌فرض مرورگر برای رویداد را لغو می‌کند.
* [`stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation): انتشار رویداد در درخت ری‌اکت را متوقف می‌کند.

علاوه بر این، اشیاء رویداد ری‌اکت این متدها را ارائه می‌دهند:

* `isDefaultPrevented()`: یک مقدار بولی برمی‌گرداند که نشان می‌دهد آیا `preventDefault` فراخوانی شده است.
* `isPropagationStopped()`: یک مقدار بولی برمی‌گرداند که نشان می‌دهد آیا `stopPropagation` فراخوانی شده است.
* `persist()`: با React DOM استفاده نمی‌شود. با React Native، این را فراخوانی کنید تا ویژگی‌های رویداد پس از رویداد خوانده شوند.
* `isPersistent()`: با React DOM استفاده نمی‌شود. با React Native، برمی‌گرداند که آیا `persist` فراخوانی شده است.

#### نکات {/*react-event-object-caveats*/}

* مقادیر `currentTarget`، `eventPhase`، `target` و `type` مقادیری را منعکس می‌کنند که کد ری‌اکت شما انتظار دارد. در پس‌زمینه، ری‌اکت هندلرهای رویداد را در root متصل می‌کند، اما این در اشیاء رویداد ری‌اکت منعکس نمی‌شود. مثلاً `e.currentTarget` ممکن است با `e.nativeEvent.currentTarget` زیرین یکسان نباشد. برای رویدادهای پلی‌فیل‌شده، `e.type` (نوع رویداد ری‌اکت) ممکن است با `e.nativeEvent.type` (نوع زیرین) متفاوت باشد.

---

### تابع هندلر `AnimationEvent` {/*animationevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای [انیمیشن CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).

```js
<div
  onAnimationStart={e => console.log('onAnimationStart')}
  onAnimationIteration={e => console.log('onAnimationIteration')}
  onAnimationEnd={e => console.log('onAnimationEnd')}
/>
```

#### پارامترها {/*animationevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent):
  * [`animationName`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/animationName)
  * [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/elapsedTime)
  * [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/pseudoElement)

---

### تابع هندلر `ClipboardEvent` {/*clipboadevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).

```js
<input
  onCopy={e => console.log('onCopy')}
  onCut={e => console.log('onCut')}
  onPaste={e => console.log('onPaste')}
/>
```

#### پارامترها {/*clipboadevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`ClipboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent):

  * [`clipboardData`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent/clipboardData)

---

### تابع هندلر `CompositionEvent` {/*compositionevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای [ویرایشگر روش ورودی (IME)](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor).

```js
<input
  onCompositionStart={e => console.log('onCompositionStart')}
  onCompositionUpdate={e => console.log('onCompositionUpdate')}
  onCompositionEnd={e => console.log('onCompositionEnd')}
/>
```

#### پارامترها {/*compositionevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`CompositionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent):
  * [`data`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent/data)

---

### تابع هندلر `DragEvent` {/*dragevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

```js
<>
  <div
    draggable={true}
    onDragStart={e => console.log('onDragStart')}
    onDragEnd={e => console.log('onDragEnd')}
  >
    Drag source
  </div>

  <div
    onDragEnter={e => console.log('onDragEnter')}
    onDragLeave={e => console.log('onDragLeave')}
    onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
    onDrop={e => console.log('onDrop')}
  >
    Drop target
  </div>
</>
```

#### پارامترها {/*dragevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent):
  * [`dataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) نیز می‌شود:

  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
  * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
  * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
  * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
  * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
  * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
  * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
  * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
  * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
  * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
  * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
  * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `FocusEvent` {/*focusevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای تمرکز.

```js
<input
  onFocus={e => console.log('onFocus')}
  onBlur={e => console.log('onBlur')}
/>
```

[یک نمونه ببینید.](#handling-focus-events)

#### پارامترها {/*focusevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent):
  * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `Event` {/*event-handler*/}

یک نوع هندلر رویداد برای رویدادهای عمومی.

#### پارامترها {/*event-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) بدون ویژگی‌های اضافی.

---

### تابع هندلر `InputEvent` {/*inputevent-handler*/}

یک نوع هندلر رویداد برای رویداد `onBeforeInput`.

```js
<input onBeforeInput={e => console.log('onBeforeInput')} />
```

#### پارامترها {/*inputevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent):
  * [`data`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/data)

---

### تابع هندلر `KeyboardEvent` {/*keyboardevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای صفحه‌کلید.

```js
<input
  onKeyDown={e => console.log('onKeyDown')}
  onKeyUp={e => console.log('onKeyUp')}
/>
```

[یک نمونه ببینید.](#handling-keyboard-events)

#### پارامترها {/*keyboardevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent):
  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey)
  * [`charCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode)
  * [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)
  * [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
  * [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
  * [`locale`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/locale)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey)
  * [`location`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location)
  * [`repeat`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey)
  * [`which`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `MouseEvent` {/*mouseevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای ماوس.

```js
<div
  onClick={e => console.log('onClick')}
  onMouseEnter={e => console.log('onMouseEnter')}
  onMouseOver={e => console.log('onMouseOver')}
  onMouseDown={e => console.log('onMouseDown')}
  onMouseUp={e => console.log('onMouseUp')}
  onMouseLeave={e => console.log('onMouseLeave')}
/>
```

[یک نمونه ببینید.](#handling-mouse-events)

#### پارامترها {/*mouseevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent):
  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
  * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
  * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
  * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
  * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
  * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
  * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
  * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
  * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
  * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
  * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
  * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `PointerEvent` {/*pointerevent-handler*/}

یک نوع هندلر رویداد برای [رویدادهای نشانگر.](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

```js
<div
  onPointerEnter={e => console.log('onPointerEnter')}
  onPointerMove={e => console.log('onPointerMove')}
  onPointerDown={e => console.log('onPointerDown')}
  onPointerUp={e => console.log('onPointerUp')}
  onPointerLeave={e => console.log('onPointerLeave')}
/>
```

[یک نمونه ببینید.](#handling-pointer-events)

#### پارامترها {/*pointerevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent):
  * [`height`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height)
  * [`isPrimary`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary)
  * [`pointerId`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId)
  * [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType)
  * [`pressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure)
  * [`tangentialPressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tangentialPressure)
  * [`tiltX`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX)
  * [`tiltY`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY)
  * [`twist`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/twist)
  * [`width`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) نیز می‌شود:

  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
  * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
  * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
  * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
  * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
  * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
  * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
  * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
  * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
  * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
  * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
  * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `TouchEvent` {/*touchevent-handler*/}

یک نوع هندلر رویداد برای [رویدادهای لمسی.](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

```js
<div
  onTouchStart={e => console.log('onTouchStart')}
  onTouchMove={e => console.log('onTouchMove')}
  onTouchEnd={e => console.log('onTouchEnd')}
  onTouchCancel={e => console.log('onTouchCancel')}
/>
```

#### پارامترها {/*touchevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`TouchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent):
  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/altKey)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/ctrlKey)
  * [`changedTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/getModifierState)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/metaKey)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/shiftKey)
  * [`touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches)
  * [`targetTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches)
  
  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `TransitionEvent` {/*transitionevent-handler*/}

یک نوع هندلر رویداد برای رویدادهای ترنزیشن CSS.

```js
<div
  onTransitionEnd={e => console.log('onTransitionEnd')}
/>
```

#### پارامترها {/*transitionevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`TransitionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent):
  * [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/elapsedTime)
  * [`propertyName`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/propertyName)
  * [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/pseudoElement)

---

### تابع هندلر `UIEvent` {/*uievent-handler*/}

یک نوع هندلر رویداد برای رویدادهای عمومی UI.

```js
<div
  onScroll={e => console.log('onScroll')}
/>
```

#### پارامترها {/*uievent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent):
  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

### تابع هندلر `WheelEvent` {/*wheelevent-handler*/}

یک نوع هندلر رویداد برای رویداد `onWheel`.

```js
<div
  onWheel={e => console.log('onWheel')}
/>
```

#### پارامترها {/*wheelevent-handler-parameters*/}

* `e`: یک [شیء رویداد ری‌اکت](#react-event-object) با این ویژگی‌های اضافی [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent):
  * [`deltaMode`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode)
  * [`deltaX`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaX)
  * [`deltaY`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY)
  * [`deltaZ`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaZ)


  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) نیز می‌شود:

  * [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
  * [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
  * [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
  * [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
  * [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
  * [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
  * [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
  * [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
  * [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
  * [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
  * [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
  * [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
  * [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
  * [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
  * [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
  * [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)

  این شامل ویژگی‌های به‌ ارث‌رسیدهٔ [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) نیز می‌شود:

  * [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
  * [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

---

## استفاده {/*usage*/}

### اعمال استایل‌های CSS {/*applying-css-styles*/}

در ری‌اکت، شما یک کلاس CSS را با [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) مشخص می‌کنید. این مانند ویژگی `class` در HTML کار می‌کند:

```js
<img className="avatar" />
```

سپس قوانین CSS را برای آن در یک فایل CSS جداگانه می‌نویسید:

```css
/* In your CSS */
.avatar {
  border-radius: 50%;
}
```

ری‌اکت نحوهٔ افزودن فایل‌های CSS را دیکته نمی‌کند. در ساده‌ترین حالت، یک تگ [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) به HTML خود اضافه می‌کنید. اگر از یک ابزار build یا فریم‌ورک استفاده می‌کنید، به مستندات آن مراجعه کنید تا ببینید چگونه یک فایل CSS به پروژهٔ خود اضافه کنید.

گاهی، مقادیر استایل به داده‌ها وابسته هستند. از ویژگی `style` برای پاس‌کردن برخی استایل‌ها به‌صورت پویا استفاده کنید:

```js {3-6}
<img
  className="avatar"
  style={{
    width: user.imageSize,
    height: user.imageSize
  }}
/>
```


در مثال بالا، `style={{}}` یک سینتکس خاص نیست، بلکه یک شیء `{}` معمولی درون [آکولادهای JSX](/learn/javascript-in-jsx-with-curly-braces) `style={ }` است. ما توصیه می‌کنیم فقط زمانی از ویژگی `style` استفاده کنید که استایل‌های شما به متغیرهای JavaScript وابسته باشند.

<Sandpack>

```js src/App.js
import Avatar from './Avatar.js';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function App() {
  return <Avatar user={user} />;
}
```

```js src/Avatar.js active
export default function Avatar({ user }) {
  return (
    <img
      src={user.imageUrl}
      alt={'Photo of ' + user.name}
      className="avatar"
      style={{
        width: user.imageSize,
        height: user.imageSize
      }}
    />
  );
}
```

```css src/styles.css
.avatar {
  border-radius: 50%;
}
```

</Sandpack>

<DeepDive>

#### چگونه چند کلاس CSS را به‌صورت شرطی اعمال کنیم؟ {/*how-to-apply-multiple-css-classes-conditionally*/}

برای اعمال شرطی کلاس‌های CSS، باید رشتهٔ `className` را خودتان با استفاده از JavaScript تولید کنید.

مثلاً `className={'row ' + (isSelected ? 'selected': '')}` بسته به اینکه `isSelected` برابر `true` باشد یا نه، یا `className="row"` یا `className="row selected"` تولید می‌کند.

برای خوانایی بیشتر، می‌توانید از یک کتابخانهٔ کمکی کوچک مانند [`classnames`](https://github.com/JedWatson/classnames) استفاده کنید:

```js
import cn from 'classnames';

function Row({ isSelected }) {
  return (
    <div className={cn('row', isSelected && 'selected')}>
      ...
    </div>
  );
}
```

این به‌خصوص زمانی که چند کلاس شرطی دارید مفید است:

```js
import cn from 'classnames';

function Row({ isSelected, size }) {
  return (
    <div className={cn('row', {
      selected: isSelected,
      large: size === 'large',
      small: size === 'small',
    })}>
      ...
    </div>
  );
}
```

</DeepDive>

---

### دستکاری یک گرهٔ DOM با رفرنس {/*manipulating-a-dom-node-with-a-ref*/}

گاهی، باید گرهٔ DOM مرورگر مرتبط با یک تگ در JSX را به‌دست آورید. مثلاً اگر می‌خواهید یک `<input>` را وقتی روی دکمه‌ای کلیک می‌شود متمرکز کنید، باید [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) را روی گرهٔ DOM `<input>` مرورگر فراخوانی کنید.

برای به‌دست آوردن گرهٔ DOM مرورگر برای یک تگ، یک [رفرنس تعریف کنید](/reference/react/useRef) و آن را به‌عنوان ویژگی `ref` به آن تگ پاس دهید:

```js {7}
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);
  // ...
  return (
    <input ref={inputRef} />
    // ...
```

ری‌اکت پس از رندر شدن به صفحه، گرهٔ DOM را در `inputRef.current` قرار می‌دهد.

<Sandpack>

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

اطلاعات بیشتر دربارهٔ [دستکاری DOM با رفرنس‌ها](/learn/manipulating-the-dom-with-refs) و [مشاهدهٔ نمونه‌های بیشتر.](/reference/react/useRef#usage)

برای موارد استفادهٔ پیشرفته‌تر، ویژگی `ref` همچنین یک [تابع کالبک](#ref-callback) را نیز می‌پذیرد.

---

### تنظیم خطرناک HTML داخلی {/*dangerously-setting-the-inner-html*/}

شما می‌توانید یک رشتهٔ HTML خام را به این صورت به یک المان پاس دهید:

```js
const markup = { __html: '<p>some raw html</p>' };
return <div dangerouslySetInnerHTML={markup} />;
```

**این خطرناک است. همانند ویژگی [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) در DOM زیرین، باید با احتیاط فراوان عمل کنید! مگر اینکه markup از یک منبع کاملاً قابل اعتماد بیاید، معرفی یک آسیب‌پذیری [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) به این روش بدیهی است.**

مثلاً، اگر از یک کتابخانه Markdown استفاده می‌کنید که Markdown را به HTML تبدیل می‌کند، به این موضوع اعتماد دارید که parser آن حاوی باگ نباشد و کاربر فقط ورودی‌های خودش را می‌بیند، می‌توانید HTML حاصل را به این صورت نمایش دهید:

<Sandpack>

```js
import { useState } from 'react';
import MarkdownPreview from './MarkdownPreview.js';

export default function MarkdownEditor() {
  const [postContent, setPostContent] = useState('_Hello,_ **Markdown**!');
  return (
    <>
      <label>
        Enter some markdown:
        <textarea
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
      </label>
      <hr />
      <MarkdownPreview markdown={postContent} />
    </>
  );
}
```

```js src/MarkdownPreview.js active
import { Remarkable } from 'remarkable';

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return {__html: renderedHTML};
}

export default function MarkdownPreview({ markdown }) {
  const markup = renderMarkdownToHTML(markdown);
  return <div dangerouslySetInnerHTML={markup} />;
}
```

```json package.json
{
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "remarkable": "2.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
textarea { display: block; margin-top: 5px; margin-bottom: 10px; }
```

</Sandpack>

شیء `{__html}` باید تا حد امکان نزدیک به جایی که HTML تولید می‌شود ایجاد شود، مانند کاری که مثال بالا در تابع `renderMarkdownToHTML` انجام می‌دهد. این تضمین می‌کند که تمام HTML خام مورد استفاده در کد شما به‌طور صریح به این شکل علامت‌گذاری شده، و فقط متغیرهایی که انتظار دارید حاوی HTML باشند به `dangerouslySetInnerHTML` پاس داده می‌شوند. ایجاد شیء به‌صورت inline مانند `<div dangerouslySetInnerHTML={{__html: markup}} />` توصیه نمی‌شود.

برای درک اینکه چرا رندر کردن HTML دلخواه خطرناک است، کد بالا را با این جایگزین کنید:

```js {1-4,7,8}
const post = {
  // Imagine this content is stored in the database.
  content: `<img src="" onerror='alert("you were hacked")'>`
};

export default function MarkdownPreview() {
  // 🔴 SECURITY HOLE: passing untrusted input to dangerouslySetInnerHTML
  const markup = { __html: post.content };
  return <div dangerouslySetInnerHTML={markup} />;
}
```

کد جاسازی‌شده در HTML اجرا خواهد شد. یک هکر می‌تواند از این حفرهٔ امنیتی برای سرقت اطلاعات کاربر یا انجام اقداماتی از طرف او استفاده کند. **فقط از `dangerouslySetInnerHTML` با داده‌های قابل اعتماد و پاک‌سازی‌شده استفاده کنید.**

---

### مدیریت رویدادهای ماوس {/*handling-mouse-events*/}

این نمونه برخی [رویدادهای ماوس](#mouseevent-handler) رایج و زمان فعال شدن آن‌ها را نشان می‌دهد.

<Sandpack>

```js
export default function MouseExample() {
  return (
    <div
      onMouseEnter={e => console.log('onMouseEnter (parent)')}
      onMouseLeave={e => console.log('onMouseLeave (parent)')}
    >
      <button
        onClick={e => console.log('onClick (first button)')}
        onMouseDown={e => console.log('onMouseDown (first button)')}
        onMouseEnter={e => console.log('onMouseEnter (first button)')}
        onMouseLeave={e => console.log('onMouseLeave (first button)')}
        onMouseOver={e => console.log('onMouseOver (first button)')}
        onMouseUp={e => console.log('onMouseUp (first button)')}
      >
        First button
      </button>
      <button
        onClick={e => console.log('onClick (second button)')}
        onMouseDown={e => console.log('onMouseDown (second button)')}
        onMouseEnter={e => console.log('onMouseEnter (second button)')}
        onMouseLeave={e => console.log('onMouseLeave (second button)')}
        onMouseOver={e => console.log('onMouseOver (second button)')}
        onMouseUp={e => console.log('onMouseUp (second button)')}
      >
        Second button
      </button>
    </div>
  );
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>

---

### مدیریت رویدادهای نشانگر {/*handling-pointer-events*/}

این نمونه برخی [رویدادهای نشانگر](#pointerevent-handler) رایج و زمان فعال شدن آن‌ها را نشان می‌دهد.

<Sandpack>

```js
export default function PointerExample() {
  return (
    <div
      onPointerEnter={e => console.log('onPointerEnter (parent)')}
      onPointerLeave={e => console.log('onPointerLeave (parent)')}
      style={{ padding: 20, backgroundColor: '#ddd' }}
    >
      <div
        onPointerDown={e => console.log('onPointerDown (first child)')}
        onPointerEnter={e => console.log('onPointerEnter (first child)')}
        onPointerLeave={e => console.log('onPointerLeave (first child)')}
        onPointerMove={e => console.log('onPointerMove (first child)')}
        onPointerUp={e => console.log('onPointerUp (first child)')}
        style={{ padding: 20, backgroundColor: 'lightyellow' }}
      >
        First child
      </div>
      <div
        onPointerDown={e => console.log('onPointerDown (second child)')}
        onPointerEnter={e => console.log('onPointerEnter (second child)')}
        onPointerLeave={e => console.log('onPointerLeave (second child)')}
        onPointerMove={e => console.log('onPointerMove (second child)')}
        onPointerUp={e => console.log('onPointerUp (second child)')}
        style={{ padding: 20, backgroundColor: 'lightblue' }}
      >
        Second child
      </div>
    </div>
  );
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>

---

### مدیریت رویدادهای تمرکز {/*handling-focus-events*/}

در ری‌اکت، [رویدادهای تمرکز](#focusevent-handler) بالا می‌روند (bubble). می‌توانید از `currentTarget` و `relatedTarget` برای تشخیص اینکه آیا رویدادهای تمرکز یا از دست‌دادن تمرکز از بیرون المان والد نشأت گرفته‌اند استفاده کنید. این نمونه نحوهٔ تشخیص تمرکز روی یک فرزند، تمرکز المان والد، و نحوهٔ تشخیص ورود یا خروج تمرکز به/از کل زیردرخت را نشان می‌دهد.

<Sandpack>

```js
export default function FocusExample() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused parent');
        } else {
          console.log('focused child', e.target.name);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered parent');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused parent');
        } else {
          console.log('unfocused child', e.target.name);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left parent');
        }
      }}
    >
      <label>
        First name:
        <input name="firstName" />
      </label>
      <label>
        Last name:
        <input name="lastName" />
      </label>
    </div>
  );
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>

---

### مدیریت رویدادهای صفحه‌کلید {/*handling-keyboard-events*/}

این نمونه برخی [رویدادهای صفحه‌کلید](#keyboardevent-handler) رایج و زمان فعال شدن آن‌ها را نشان می‌دهد.

<Sandpack>

```js
export default function KeyboardExample() {
  return (
    <label>
      First name:
      <input
        name="firstName"
        onKeyDown={e => console.log('onKeyDown:', e.key, e.code)}
        onKeyUp={e => console.log('onKeyUp:', e.key, e.code)}
      />
    </label>
  );
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>
