---
title:  هشدار PropTypes را فراخوانی نکنید
layout: single
permalink: warnings/dont-call-proptypes.html
---

> نکته:
>
> `React.PropTypes` از ری اکت v15.5 به پکیج دیگری منتقل شده است. لطفا به جای آن از  [`prop-types` استفاده کنید](https://www.npmjs.com/package/prop-types).
>
>ما [یک codemod اسکریپت](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) برای تبدیل خودکار ارائه می دهیم.

در نسخه اصلی ری اکت در آینده ، کدی که عملکردهای اعتبار سنجی PropType را اجرا می کند در مرحله تولید حذف می شود . هنگامی که این اتفاق می افتد ، هر کدی که این توابع را به صورت دستی فراخوانی می کند (که در تولید حذف نشده است) خطا ایجاد می کند.

### تعریف PropTypes مشکلی ندارد {#declaring-proptypes-is-still-fine}

استفاده عادی از PropTypes هنوز پشتیبانی می شود:

```javascript
Button.propTypes = {
  highlighted: PropTypes.bool
};
```

اینجا هیچ چیز تغییر نمی کند.

### Proptypes ها را مستقیما فراخوانی نکنید {#dont-call-proptypes-directly}

استفاده از PropTypes به هر روش دیگری به جز حاشیه نویسی کامپوننت های ری اکت با آنها دیگر پشتیبانی نمی شود:

```javascript
var apiShape = PropTypes.shape({
  body: PropTypes.object,
  statusCode: PropTypes.number.isRequired
}).isRequired;

// Not supported!
var error = apiShape(json, 'response');
```

اگر شما مثل این وابسته به استفاده از PropTypes هستید, ما شما را تشویق به استفاده یا ایجاد یک فورک میکنیم (  مانند [این](https://github.com/aackerman/PropTypes) [دو](https://github.com/developit/proptypes) پکیج).

اگر هشدار را برطرف نکنید ، این کد در مرحله تولید با ری اکت 16 خراب می شود

### اگر مستقیماً PropTypes را فراخوانی نمی کنید اما همچنان هشدار می گیرید {#if-you-dont-call-proptypes-directly-but-still-get-the-warning}

رد پشته تولید شده توسط اخطار را بررسی کنید. کامپوننت مسئول فراخوانی مستقیم PropTypes  را پیدا خواهید کرد. احتمالا, این مشکل به دلیل PropTypes شخص ثالث است که PropTypes ری اکت را دربرگرفته است، برای مثال:

```js
Button.propTypes = {
  highlighted: ThirdPartyPropTypes.deprecated(
    PropTypes.bool,
    'Use `active` prop instead'
  )
}
```

در این مورد، `ThirdPartyPropTypes.deprecated` یک دربرگیرنده است که `PropTypes.bool` را فراخوانی می کند. این الگو به خودی خود خوب است اما باعث ایجاد مثبت کاذب مثبت می شود زیرا ری اکت فکر می کند که شما مستقیماً  PropTypes را فراخوانی میکنید. بخش بعدی نحوه رفع این مشکل برای پیاده سازی یک کتابخانه مثل `ThirdPartyPropTypes` را توضیح می دهد . اگر این کتابخانه ای نیست که شما نوشته اید, میتوانید برای آن یک پرونده مشکل باز کنید.

### رفع مثبت کاذب در PropTypes شخص ثالث {#fixing-the-false-positive-in-third-party-proptypes}

اگر شما نویسنده یک کتابخانه شخص ثالث PropTypes ری اکت  هستید و به استفاده کنندگان اجازه می دهید PropTypes را دربربگیرند, آنها ممکن است ببینند که این هشدار از کتابخانه شما می آید. این به این دلیل اتفاق می افتد که ری اکت نمی تواند آخرین آرگومان "مخفی" ارسال شده برای فراخوانی دستی PropTypes را ببیند [این ارسال می شود](https://github.com/facebook/react/pull/7132).

در اینجا نحوه رفع آن آمده است. ما از `deprecated` استفاده می کنیم به عنوان مثال [react-bootstrap/react-prop-types](https://github.com/react-bootstrap/react-prop-types/blob/0d1cd3a49a93e513325e3258b28a82ce7d38e690/src/deprecated.js) . پیاده سازی فعلی  فقط آرگومان های   `props`, `propName`, و `componentName` را می فرستد:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}
```

به منظور رفع مثبت کاذب، مطمئن شوید **همه** آرگومان ها را به PropTypes دربرگرفته شده منتقل می کنید. این با استفاده از ES6 آسان است نشانه گذاری `...rest` :

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) { // Note ...rest here
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // and here
  };
}
```

با این کار هشدار ساکت می شود.