---
id: faq-styling
title: Styling and CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### چگونه می توانم کلاس های CSS را به کامپوننت ها اضافه کنم؟ {#how-do-i-add-css-classes-to-components}

یک رشته را به عنوان ویژگی به `className` دهید:

```jsx
render() {
  return <span className="menu navigation-menu">Menu</span>
}
```

این معمولی است که کلاس های CSS وابسته به props یا state کامپوننت باشند:

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menu</span>
}
```

> راهنما
> 
> اگر شما اغلب اوقات همچین کدی را می نویسید، پکیج [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) می تواند آن را ساده تر کند.

### آیا می توانم از استایل های درون خطی (inline styles) استفاده کنم؟ {#can-i-use-inline-styles}

بله، اسناد مربوط به طراحی ظاهر را [اینجا](/docs/dom-elements.html#style) ببینید.

### آیا استایل های درون خطی بد هستند؟ {#are-inline-styles-bad}

کلاس های CSS معمولاً عملکرد بهتری نسبت به استایل های درون خطی دارند.

### CSS-in-JS چیست؟ {#what-is-css-in-js}

"CSS-in-JS" اشاره دارد به یک الگو که در آن CSS توسط Javascript ترکیب شده است به جای اینکه داخل یک فایل خارجی تعریف شده باشند. مقایسه کتابخانه های CSS-in-JS را در [اینجا](https://github.com/MicheleBertoli/css-in-js) بخوانید.

_توجه داشته باشید که این عملکرد جزئی از ری اکت نمی باشد، بلکه توسط کتابخانه های شخص ثالث ارائه شده._ ری اکت هیچ نظری درباره نحوه ی تعریف استایل ها ندارد؛ اگر شک و شبهه ای دارید، یک نقطه شروع خوب این است که استایل های خود را درون فایل جداگانه `*.css` تعریف کرده و طبق معمول با استفاده از [`className`](/docs/dom-elements.html#classname) به آن ها مراجعه کنید.


### آیا می توانم با ری اکت انیمیشن انجام دهم؟ {#can-i-do-animations-in-react}

ری اکت میتواند برای قدرت بخشیدن به انیمیشن ها استفاده شود. به مثال های [React Transition Group](https://reactcommunity.org/react-transition-group/) و [React Motion](https://github.com/chenglou/react-motion) یا [React Spring](https://github.com/react-spring/react-spring)، نگاه بیاندازید.
