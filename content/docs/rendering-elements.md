---
id: rendering-elements
title: رندر کردن المنت‌ها
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

المنت‌ها (elements) کوچک‌ترین جزء تشکیل‌دهنده برنامه‌های ری‌اکتی هستند.

یک المنت آن‌ چیزی را که شما می‌خواهید روی صفحه ببینید توصیف میکند:

```js
const element = <h1>Hello, world</h1>;
```

برخلاف المنت‌های ‌DOM مرورگر، المنت‌های ری‌اکت اشیاء ساده‌ای هستند که ایجاد آن‌ها هزینه چندانی ندارد. وظیفه ری‌اکت DOM به‌روز رسانی DOM است و اطمینان از این‌که دقیقا با المنت‌های ری‌اکت یکسان باشد.

>**نکته:**
>
>ممکن است بعضی‌ها المنت‌ها را با "کامپوننت‌ها" (مفهومی که بیشتر جا افتاده‌است.) اشتباه بگیرند. ما کامپوننت‌ها را در [بخش بعدی](/docs/components-and-props.html) معرفی خواهیم‌کرد. المنت‌ها اجزائی هستند که کامپوننت‌ها از آن ساخته می‌شوند و ما به شما پیشنهاد می‌کنیم که پیش از رفتن به بخش بعدی، حتما این بخش را مطالعه کنید.

## رندر کردن یک المنت درون DOM {#rendering-an-element-into-the-dom}

فرض کنید یک `<div>` جایی در فایل HTML شما قرار دارد:

```html
<div id="root"></div>
```

ما این المنت‌ را یک DOM node "ریشه" نامگذاری می‌کنیم، به این دلیل‌ که هر چیزی که داخل آن قرار گیرد، توسط ری‌اکت DOM مدیریت می‌شود.

برنامه‌هایی که فقط با ری‌اکت ساخته می‌شوند، معمولا فقط یک DOM node ریشه دارند. اگر ری‌اکت را به یک برنامه موجود اضافه کنید، می‌توانید هر تعدادی از DOM node های ریشه‌ی ایزوله که بخواهید داشته‌باشید.

<<<<<<< HEAD
برای رندر کردن یک المنت ری‌اکت درون یک DOM node ریشه، هر دو را به [`ReactDOM.render()`](/docs/react-dom.html#render) بدهید:

`embed:rendering-elements/render-an-element.js`

[با CodePen امتحان کنید](codepen://rendering-elements/render-an-element)
=======
To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

این کد روی صفحه "Hello, world" را نمایش می‌دهد.

## به‌روز‌رسانی المنت رندر شده {#updating-the-rendered-element}

المنت‌های ری‌اکت [تغییر ناپدیر](https://en.wikipedia.org/wiki/Immutable_object) هستند. زمانی که یک المنت را ایجاد می‌کنید، دیگر قادر به تغییر فرزندان یا خصوصیات آن نخواهید بود. یک المنت را مانند یک فریم از یک فیلم تصور کنید که UI را در یک نقطه زمانی مشخص نشان می‌دهد.

<<<<<<< HEAD
با اطلاعاتی که تا این‌جا به‌دست آورده‌ایم، تنها راه به‌روز رسانی UI این است که یک المنت جدید ساخته و آن را به تابع [`ReactDOM.render()`](/docs/react-dom.html#render) بدهیم.
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

این مثال ساعت را درنظر بگیرید:

`embed:rendering-elements/update-rendered-element.js`

<<<<<<< HEAD
[با CodePen امتحان کنید](codepen://rendering-elements/update-rendered-element)

در این مثال تابع [`ReactDOM.render()`](/docs/react-dom.html#render) هربار توسط callback تابع [`()setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) فراخوانی می‌شود.
=======
**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

>**نکته:**
>
<<<<<<< HEAD
> در عمل، بیشتر برنامه‌های ری‌اکت تنها یک بار [`ReactDOM.render()`](/docs/react-dom.html#render) را فراخوانی می‌کنند. در بخش‌های بعدی یاد می‌گیریم که چگونه چنین کد‌هایی به صورت [کامپوننت‌های دارای state](/docs/state-and-lifecycle.html) کپسوله می‌شوند.
=======
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6
>
> از آن‌جا که هر بخش با استناد به موضوع‌های پیشین نوشته‌ شده‌است، پیشنهاد می‌کنیم هیچ موضوعی را از قلم نیندازید.

## ری‌اکت تنها چیز‌هایی که نیاز‌ هست را به‌روز رسانی می‌کند {#react-only-updates-whats-necessary}

ری‌اکت DOM المنت موردنظر و فرزندانش را با حالت پیشین آن مقایسه می‌کند و تنها به‌روز رسانی‌های DOM مورد نیاز را اعمال می‌کند تا ‌DOM را به وضعیت موردنظر برساند.

<<<<<<< HEAD
برای اطمینان، [مثال قبلی](codepen://rendering-elements/update-rendered-element) را با استفاده از ابزارهای مرورگر بررسی کنید:
=======
You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:
>>>>>>> df2673d1b6ec0cc6657fd58690bbf30fa1e6e0e6

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

با وجود این‌که ما هر ثانیه یک المنت که توصیف‌کننده کل UI است را ایجاد می‌کنیم، فقط node متنی که محتویاتش تغییر کرده‌است توسط ری‌اکت DOM به‌روز‌رسانی می‌شود.

براساس تجربه ما، تفکر درباره این‌که UI در یک زمان مشخص چگونه به نظر بیاید، به جای این‌که چگونه آن را در طول زمان تغییر دهیم، یک دسته کامل از باگ‌ها را از بین می‌برد.
