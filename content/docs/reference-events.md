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

اگر فکر می‌کنید که در جایی باید رویداد ذاتی خود مرورگر را استفاده کنید، کافی است که `nativeEvent` را به عنوان یک attribute اضافه کنید تا به آن دسترسی یابید. رویداد‌های سینتتیک متفاوت از رویداد‌های ذاتی مرورگر هستند و تناظر یک به یک بین آن‌ها وجود ندارد. برای مثال در `onMouseLeave`، مقدار `event.nativeEvent` به رویداد `mouseout` اشاره دارد. این تناظر بخشی از API عمومی نیست و ممکن است هر موقعی تغییر کند. هر آبجکت `SyntheticEvent`، attribute های زیر دارد:

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
<<<<<<< HEAD
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
=======
> As of v17, `e.persist()` doesn't do anything because the `SyntheticEvent` is no longer [pooled](/docs/legacy-event-pooling.html).
>>>>>>> 255497f12fa00d231b5af5d5aa34fa5beffac9e4

> توجه:
>
<<<<<<< HEAD
> اگر می‌خواهید که به دارایی‌های رویداد، به طور غیرهمزمان دسترسی داشته باشید باید `event.persist()` را در رویداد فراخوانی کنید. این موجب خواهد شد که رویداد سینتاتیک از روند جمع‌آوری خارج شود و ارجاعات داده شده به آن رویداد در کد کاربر حفظ شود.
=======
> As of v0.14, returning `false` from an event handler will no longer stop event propagation. Instead, `e.stopPropagation()` or `e.preventDefault()` should be triggered manually, as appropriate.
>>>>>>> 255497f12fa00d231b5af5d5aa34fa5beffac9e4

## رویدادهای پشتیبانی شده {#supported-events}

ری‌اکت فرایند نرمال سازی را روی رویدادها انجام می دهد تا در مرورگرهای مختلف، ویژگی های یکسانی داشته باشند.

کنترل کنندگان رویدادهایی که در زیر می بینید، در فاز bubbling اجرا می شوند. اگر می خواهید که رویدادی در فاز capture اجرا شود، `Capture` را به نام رویداد اضافه کنید. مثلا بجای `onClick`، بنویسید `onClickCapture`.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [رویداد‌های صفحه‌کلید (Keyboard Events)](#keyboard-events)
- [رویداد‌های فکوس (Focus Events)](#focus-events)
- [رویداد‌های فرم (Form Events)](#form-events)
- [رویدادهای عمومی (Generic Events)](#generic-events)
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

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### رویداد‌های فرم (Form Events) {#form-events}

نام رویدادها

```
onChange onInput onInvalid onReset onSubmit 
```
برای اطلاعات بیشتر در مورد رویداد onChange، [Forms](/docs/forms.html) را ببینید.

* * *

### رویدادهای عمومی (Generic Events) {#generic-events}

نام رویدادها

```
onError onLoad
```

* * *

### رویداد‌های ماوس (Mouse Events) {#mouse-events}

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

<<<<<<< HEAD
ویژگی‌ها
=======
>Note
>
>Starting with React 17, the `onScroll` event **does not bubble** in React. This matches the browser behavior and prevents the confusion when a nested scrollable element fires events on a distant parent.

Properties:
>>>>>>> 255497f12fa00d231b5af5d5aa34fa5beffac9e4

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
