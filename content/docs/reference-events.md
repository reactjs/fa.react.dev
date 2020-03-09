---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

این صفحه، مرجع `SyntheticEvent` می‌باشد که بخشی از سیستم رویدادهای ری‌اکت (React's Event System) را تشکیل می‌دهد. برای یادگیری بیشتر، [Handling Events](/docs/handling-events.html) را ببینید.

  ## مرور کلی {#overview}

`SyntheticEvent` روکشی است بر رویدادهای ذاتی خود مرورگر که در تمام مرورگر‌ها کار می‌کند. کنترل کننده‌های رویداد (event handlers) شما instance  هایی از `SyntheticEvent` دریافت خواهند کرد. رابط آن همانند رویدادهای ذاتی مرورگر است و شامل `stopPropagation()` و `preventDefault()` هم هست. با این تفاوت که رویدادها در تمام مرورگر‌ها عین هم کار می‌کنند.

اگر فکر می‌کنید که در جایی باید رویداد ذاتی خود مرورگر را استفاده کنید، کافی است که `nativeEvent` را به عنوان یک attribute اضافه کنید تا به آن دسترسی یابید. هر آبجکت `SyntheticEvent`، attribute های زیر دارد:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```
 
> توجه:
>
> از نسخه ی ۰/۱۴، بازگشت دادن `false`  از یک کنترل کننده ی رویداد، مانع انتشار یک رویداد نمی شود. بجای آن، `e.stopPropagation()`  یا `e.preventDefault()` ، هر کدام به درخور موقعیت باید اجرا شوند<div class=""></div>

###  جمع آوری رویداد (event-pooling) {#event-pooling}
`SyntheticEvent` جمع آوری می‌شود. یعنی اینکه آبجکت `SyntheticEvent` پس از آنکه callback اش فراخوانی شد، تمام دارایی‌های خود را از دست خواهد داد و استفاده ی مجدد خواهد شد.
این  به خاطر ارتقای کارکرد است.
از همین رو، شما نمی توانید به طور غیرهمزمان (asynchronous) به رویداد دسترسی داشته باشید.


```javascript
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // کار نخواهد کرد. this.state.clickEvent فقط حاوی متغیرهای تهی خواهد بود.
  this.setState({clickEvent: event});

  // همچنان قادر خواهید بود که دارایی‌های رویداد را صادر کنید
  this.setState({eventType: event.type});
}
```

> توجه:
>
> اگر می‌خواهید که به دارایی‌های رویداد، به طور غیرهمزمان دسترسی داشته باشید باید `event.persist()` را در رویداد فراخوانی کنید. این موجب خواهد شد که رویداد سینتاتیک از روند جمع‌آوری خارج شود و ارجاعات داده شده به آن رویداد در کد کاربر حفظ شود.

## رویدادهای پشتیبانی شده {#supported-events}

ری‌اکت فرایند نرمال سازی را روی رویدادها انجام می دهد تا در مرورگرهای مختلف، ویژگی های یکسانی داشته باشند.

کنترل کنندگان رویدادهایی که در زیر می بینید، در فاز bubbling اجرا می شوند. اگر می خواهید که رویدادی در فاز capture اجرا شود، `Capture` را به نام رویداد اضافه کنید. مثلا بجای `onClick`، بنویسید `onClickCapture`.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
<<<<<<< HEAD
- [رویداد‌های صفحه‌کلید (Keyboard Events)](#keyboard-events)
- [رویداد‌های فکوس (Focus Events)](#focus-events)
- [رویداد‌های فرم (Form Events)](#form-events)
- [رویداد‌های ماوس (Mouse Events)](#mouse-events)
- [رویداد‌های اشاره‌گر (Pointer Events)](#pointer-events)
- [رویداد‌های انتخاب (Selection Events)](#selection-events)
- [رویداد‌های لمسی (Touch Events)](#touch-events)
- [رویداد‌های رابط کاربری (UI Events)](#ui-events)
- [رویداد‌های اسکرول ماوس (Wheel Events)](#wheel-events)
- [رویداد‌های مدیا (Media Events)](#media-events)
- [رویداد‌های تصویر (Image Events)](#image-events)
- [رویداد‌های انیمیشن (Animation Events)](#animation-events)
- [رویداد‌های انتقال (Transition Events)](#transition-events)
- [دیگر رویداد‌ها](#other-events)
=======
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

* * *

## مرجع {#reference}

### (Clipboard Events) {#clipboard-events}

نام رویدادها

```
onCopy onCut onPaste
```

ویژگی‌ها

```javascript
DOMDataTransfer clipboardData
```

* * *

### Composition Events {#composition-events}

نام رویدادها

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

ویژگی‌ها

```javascript
string data

```

* * *

### رویداد‌های صفحه‌کلید (Keyboard Events) {#keyboard-events}

نام رویدادها

```
onKeyDown onKeyPress onKeyUp
```

ویژگی‌ها

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

`key` می‌تواند هر کدام از متغیرهای ذکر شده در [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) را داشته باشد. 

* * *

### رویداد‌های فکوس (Focus Events) {#focus-events}

نام رویدادها

```
onFocus onBlur
```

رویدادهای فوق برای تمام المنت‌های React DOM کار خواهد کرد و نه فقط المنت‌های فرم.

ویژگی‌ها

```javascript
DOMEventTarget relatedTarget
```

* * *

### رویداد‌های فرم (Form Events) {#form-events}

نام رویدادها

```
onChange onInput onInvalid onReset onSubmit 
```
برای اطلاعات بیشتر در مورد رویداد onChange، [Forms](/docs/forms.html) را ببینید.

* * *

<<<<<<< HEAD
### رویداد‌های ماوس (Mouse Events) {#mouse-events}
=======
### Generic Events {#generic-events}

Event names:

```
onError onLoad
```

* * *

### Mouse Events {#mouse-events}
>>>>>>> fb382ccb13e30e0d186b88ec357bb51e91de6504

نام رویدادها

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

رویدادهای `onMouseEnter`  و  `onMouseLeave` از المنت ترک شده به المنت وارد شده تکثیر می‌شوند. آنها فاز capture ندارند و bubbling معمول هم در آنها اتفاق نمی افتد.

ویژگی‌ها

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### رویداد‌های اشاره‌گر (Pointer Events) {#pointer-events}

نام رویدادها

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

رویدادهای `onPointerEnter`  و  `onPointerLeave`  از المنت ترک شده به المنت وارد شده تکثیر می‌شوند. آنها فاز capture ندارند و bubbling معمول هم در آنها اتفاق نمی افتد.

ویژگی‌ها

طبق [W3 spec](https://www.w3.org/TR/pointerevents/)، رویدادهای متعلق به نشانگر ماوس، رویدادهای مربوط به ماوس ([Mouse Events](#mouse-events)) را با ویژگی‌های زیر توسعه می‌دهند.

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

نکته ای در مورد پشتیبانی در مرورگرهای مختلف:

رویدادهای متعلق به نشانگر ماوس در تمام مرورگرها پشتیبانی نمی شوند. در زمان نوشتن این مقاله مرورگرهایی که از آن پشتیبانی می‌کنند عبارتند از: کروم، فایرفاکس، اج، و اینترنت اکسپلورر. ری‌اکت تعمدا از کد جایگزین برای پشتیبانی در مرورگرهای دیگر استفاده نمی کند، چون این کد باعث افزایش چشمگیر حجم `react-dom` می‌شود.

اگر اپلیکیشن شما نیازمند رویدادهای نشانگر ماوس است، توصیه می‌کنیم که از کدهای جایگزین third party استفاده کنید.
 

* * *

### رویداد‌های انتخاب (Selection Events) {#selection-events}

نام رویدادها

```
onSelect
```

* * *

### رویداد‌های لمسی (Touch Events) {#touch-events}

نام رویدادها

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

ویژگی‌ها

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### رویداد‌های رابط کاربری (UI Events) {#ui-events}

نام رویدادها

```
onScroll
```

ویژگی‌ها

```javascript
number detail
DOMAbstractView view
```

* * *

### رویداد‌های اسکرول ماوس (Wheel Events) {#wheel-events}

نام رویدادها

```
onWheel
```

ویژگی‌ها

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### رویداد‌های مدیا (Media Events) {#media-events}

نام رویدادها

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### رویداد‌های تصویر (Image Events) {#image-events}

نام رویدادها

```
onLoad onError
```

* * *

### رویداد‌های انیمیشن (Animation Events) {#animation-events}

نام رویدادها

```
onAnimationStart onAnimationEnd onAnimationIteration
```

ویژگی‌ها

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### رویداد‌های انتقال (Transition Events) {#transition-events}

نام رویدادها

```
onTransitionEnd
```

ویژگی‌ها

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### دیگر رویداد‌ها {#other-events}

نام رویدادها

```
onToggle
```
