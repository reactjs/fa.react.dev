---
id: shallow-renderer
title: Shallow Renderer
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**Importing**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```

## مرور کلی {#overview}

هنگام نوشتن یونیت تست برای ری‌اکت، رندر کردن سطحی (shallow rendering) می‌تواند مفید باشد. هنگام رندر کردن سطحی، این امکان را پیدا می‌کنید که یک کامپوننت را فقط در یک سطح رندر کنید، این بدین معناست که دیگر نگران کامپوننت های فرزندش نخواهید بود، چون آنها رندر نخواهند شد. پس نتایج رندر مربوط به همان کامپوننت را می‌توانید تست کنید. برای انجام این کار، نیازی به DOM نخواهد بود.

به طور مثال اگر کامپوننت زیر را داشته باشید:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

آنگاه می‌توانید تست کنید:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```

رندر کردن سطحی، در حال حاضر محدودیت هایی دارد، از جمله اینکه از ref ها پشتیبانی نمی‌کند.

> توجه:
>
> توصیه می‌کنیم [Shallow Rendering API](https://airbnb.io/enzyme/docs/api/shallow.html) متعلق به Enzyme را ببینید که API سطح بالای مناسب‌تری را در اختیار شما قرار می‌دهد که همین کارکرد را دارد. 

## مرجع {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

این طور فرض کنید که shallowRenderer، " مکانی"  است برای رندر کردن کامپوننت مورد نظر شما، که خروجی کامپوننت شما را نمایش خواهد داد.

<<<<<<< HEAD
`shallowRenderer.render()` مشابه [`ReactDOM.render()`](/docs/react-dom.html#render) می‌باشد، اما نیازی به DOM  ندارد و فقط در یک سطح رندر را انجام می‌دهد. به همین خاطر می‌توانید یک کامپوننت را در انزوا، و فارغ از کارکرد کامپوننت های فرزندنش اجرا کنید.
=======
`shallowRenderer.render()` is similar to [`root.render()`](/docs/react-dom-client.html#createroot) but it doesn't require DOM and only renders a single level deep. This means you can test components isolated from how their children are implemented.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

پس از آنکه `shallowRenderer.render()` فراخوانی شد، با استفاده از `shallowRenderer.getRenderOutput()` می‌توانید خروجی رندر سطحی را مشاهده کنید.

سپس قادر خواهید بود تا نتایج خروجی را تست کنید.
