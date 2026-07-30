---
title: هشدار پراپ ناشناخته
---

هشدار unknown-prop زمانی فعال می‌شود که تلاش کنید یک عنصر DOM را با پراپی رندر کنید که توسط ری‌اکت به‌عنوان یک ویژگی/صفت قانونی DOM شناخته نمی‌شود. باید مطمئن شوید که عناصر DOM شما پراپس کاذبی که پرسه می‌زنند ندارند.

چند دلیل محتمل وجود دارد که این هشدار ممکن است ظاهر شود:

1. آیا از `{...props}` یا `cloneElement(element, props)` استفاده می‌کنید؟ هنگام کپی کردن پراپس به یک کامپوننت فرزند، باید مطمئن شوید که به‌طور تصادفی پراپسهایی که فقط برای کامپوننت والد در نظر گرفته شده بودند را پاس نمی‌کنید. راه‌حل‌های رایج برای این مشکل را در ادامه ببینید.

2. شما در حال استفاده از یک صفت DOM غیر استاندارد روی یک نود DOM بومی هستید، شاید برای نمایش داده‌های سفارشی. اگر سعی می‌کنید داده‌های سفارشی را به یک عنصر DOM استاندارد ضمیمه کنید، در نظر بگیرید از یک صفت دادهٔ سفارشی (custom data attribute) استفاده کنید، همان‌طور که [روی MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) توضیح داده شده است.

3. ری‌اکت هنوز صفتی که مشخص کردید را تشخیص نمی‌دهد. این احتمالاً در نسخهٔ آیندهٔ ری‌اکت اصلاح خواهد شد. ری‌اکت به شما اجازه می‌دهد بدون هشدار آن را پاس دهید اگر نام صفت را با حروف کوچک بنویسید.

4. شما در حال استفاده از یک کامپوننت ری‌اکت بدون حرف بزرگ هستید، برای مثال `<myButton />`. ری‌اکت آن را به‌عنوان یک تگ DOM تفسیر می‌کند زیرا تبدیل JSX ری‌اکت از قرارداد حروف بزرگ/کوچک برای تشخیص کامپوننت‌های تعریف‌شدهٔ کاربر از تگ‌های DOM استفاده می‌کند. برای کامپوننت‌های ری‌اکت خود، از PascalCase استفاده کنید. برای مثال، به جای `<myButton />` بنویسید `<MyButton />`.

---

اگر این هشدار را به این دلیل می‌گیرید که پراپسهایی مانند `{...props}` پاس می‌دهید، کامپوننت والد شما باید هر پراپی که برای کامپوننت والد در نظر گرفته شده و نه برای کامپوننت فرزند در نظر گرفته شده را «مصرف» کند. مثال:

**بد:** پراپ `layout` غیرمنتظره به تگ `div` پاس داده می‌شود.

```js
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // BAD! Because you know for sure "layout" is not a prop that <div> understands.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // BAD! Because you know for sure "layout" is not a prop that <div> understands.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**خوب:** از نحو spread می‌توان برای بیرون کشیدن متغیرها از پراپس استفاده کرد، و باقی‌ماندهٔ پراپس را در یک متغیر قرار داد.

```js
function MyDiv(props) {
  const { layout, ...rest } = props
  if (layout === 'horizontal') {
    return <div {...rest} style={getHorizontalStyle()} />
  } else {
    return <div {...rest} style={getVerticalStyle()} />
  }
}
```

**خوب:** همچنین می‌توانید پراپس را به یک شیء جدید تخصیص دهید و کلیدهایی که از آن‌ها استفاده می‌کنید را از شیء جدید حذف کنید. مطمئن شوید پراپس را از شیء `this.props` اصلی حذف نکنید، زیرا آن شیء باید غیرقابل‌تغییر در نظر گرفته شود.

```js
function MyDiv(props) {
  const divProps = Object.assign({}, props);
  delete divProps.layout;

  if (props.layout === 'horizontal') {
    return <div {...divProps} style={getHorizontalStyle()} />
  } else {
    return <div {...divProps} style={getVerticalStyle()} />
  }
}
```
