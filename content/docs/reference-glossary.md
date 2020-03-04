---
id: glossary
title: Glossary of React Terms
layout: docs
category: Reference
permalink: docs/glossary.html

---

## نرم‌افزار تک-صفحه‌ای {#single-page-application}

یک نرم‌افزار-تک صفحه‌ای نرم‌افزاری است که یک صفحه HTML با تمامی دارایی‌های ضروری‌اش (مثل جاوا‌اسکریپت و سی اس اس) که برای اجرا شدن نرم‌افزار نیاز هست را بارگیری می‌کند. تمام فعل و انفعالاتی که در صفحه رخ می‌دهد و آنهایی که متعاقبا رخ می‌دهند دیگر به گردشی به دور سرور نیاز ندارند که به این معنیست که صفحه مجددا بارگیری نمی‌شود.

شاید یک برنامه تک صفحه‌ای با ری‌اکت بسازید، اما ری‌اکت یک نیاز ضروری نیست. ری‌کت میتواند برای بهبود قسمت کوچکی از وبسایت حاضر با تعامل اضافی استفاده شود. کد ری‌اکت می‌تواند به شکل مسالمت آمیزی با مارکاپ رندر شده سمت سرور توسط ربانی مثل PHP یا کتابخانه‌های سمت کاربر هم زیستی کند. در واقع، این دلیلیست که ری‌امت در فیس‌بوک استفاده می‌شود.

## ES6, ES2015, ES2016, و غیره {#es6-es2015-es2016-etc}

تمام این کلمات اختصاری به جدیدترین ورژن استاندارد‌های زبان ECMAScript رجوع می‌کند که زبان جاواسکریپت از آن پیاده‌سازی  شده است. ورژن ES6 (که به ES2015 معروف است ) چند ضمیمه به ورژن قبلی اضافه کرده است مانند: توابع پیکانی, کلاس‌ها, template literals, `let` و `const`. شما می‌توانید در مورد ورژن ها [اینجا](https://en.wikipedia.org/wiki/ECMAScript#Versions) اطلاعات بیشتری کسب کنید.

## کامپایلر‌ها {#compilers}

کامپایلر جاوااسکریپت کد جاوااسکریپت شما رو می‌گیرد، و آن‌را به حالت دیگری تبدیل می‌کند. یکی از مواردی که به طور عمومی مورد استفاده قرار می‌گیرد آنست که کد ES6 شما رو دریافت می‌کند و دست خط آن‌را به چیزی که مرورگر‌های قدیمی می‌فهمند تبدیل می‌کند.
[Babel](https://babeljs.io/) کامپایلری هست که عموما در ری‌اکت استفاده می‌شود.

## Bundlers {#bundlers}

Bundlerها کد جاوااسکریپت و سی‌اس‌اس از ماژول‌های جداگانه را می‌گیرند (معملا صدها ماژول) و آنها را در یک فایل جدید که برای مرورگرها بهتر بهینه سازی شده است ترکیب می‌کنند. برخی از Bundlerها در ری‌اکت اضافه شده است مانند [Webpack](https://webpack.js.org/) و [Browserify](http://browserify.org/).

## Package Managers {#package-managers}

Package managerها ابزارهایی هستند که به شما امکان می‌دهند تا وابستگی‌های پروژه را مدیریت کنید. [npm](https://www.npmjs.com/) و [Yarn](https://yarnpkg.com/) دو Package managerای هستند که عموما در نرم‌افزارهای ری‌اکت استفاده شده‌اند. هر دوی آنها به نوعی ارباب رجوع رجیستری بسته NPM هستند.

## CDN {#cdn}

CDN مخخف Content Delivery Network (شبکه تحویل‌دهی محتوا) است. CDNها محتوای کش شده یا ایستایی یک شبکه از سرور‌ها در سراسر دنیا را تحویل می‌دهند.

## JSX {#jsx}

JSX یک افزونه‌ی دست‌خط برای جاوااسکریپت است. به زبان template شبیه است ولی دارای تمام قدرت جاوااسکریپت می‌باشد. JSX توسط فراخوانی `React.createElement()` کامپایل می‌شود که یک شی جاوااسکریپتی ساده به نام "React elements" را باز می‌گرداند. برای دست‌یابی به معرفی JSX می‌توانید [این سند را ببینید](/docs/introducing-jsx.html) و آموزش عمیق‌تری در [اینجا](/docs/jsx-in-depth.html) پیدا کنید.

ری‌اکت Dom از نگارش شتری به‌جای نحوه نام گذاری در خصیصه‌های HTML برای نام گذاری خود استفاده می‌کند. برای مثال `tabindex` در JSX می‌شود `tabIndex`.
همچنین خصیصه `class` به شکل `className` نوشته می‌شود زیرا کلمه `class` در زبان جاوااسکریپت رزرو شده است.

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">My name is {name}!</h1>,
  document.getElementById('root')
);
```  

## [Elements](/docs/rendering-elements.html) {#elements}

elementهای ری‌اکت بلاک‌هایی هستند که نرم‌افزارهای ری‌امت را می‌سازند. فردی ممکن است elementها را با مفهموم گسترش یافته "کامپوننت" اشتباه بگیرد. یک المنت چیزی را که می‌خواهید در صفحه نمایش دهید را نشان می‌دهد. المان‌های ری‌اکت immutable هستند.

```js
const element = <h1>Hello, world</h1>;
```
معمولا، elementها مستقیما استفاده نمی‌شوند، ولی از کامپوننت ها برمی‌گردند.

## [Components](/docs/components-and-props.html) {#components}

کامپوننت‌های ری‌اکت کوچک، تکه‌های قابل استفاده کد هستند که یک element ری ‌اکت برمی‌گردانند تا در صفحه رندر شود. ساده‌ترین ورژن یک کامپوننت ری‌اکت یک تابع جاوااسکریپت ساده است که که یک element ری‌اکت باز می‌گرداند.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

همچنین کامپوننت‌ها می‌توانند کلاس‌های ES6 باشند:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

کامپوننت‌ها می‌توانند به تکه‌های مجزای عملکردی شکسته شوند و در کامپوننت‌های دیگر استفاده شوند. کامپوننت‌ها می‌توانند کامپوننت‌های دیگر، متن و عدد برگردانند، یک قانون خوب آنست که اگر کامپوننت شما چندین بار در UI مورد استفاده قرار گرفت (دکمه، پنل، آواتار)، یا به نوبه خودش به اندازه کافی پیچیده شده بود (نرم‌افزار،FeedStory، کامنت‌ها)، کاندید خوبی است برای اینکه به یک کامپوننت قابل استفاده مجدد تبدیل شود.
همچنین نام کامپوننت‌ها باید همیشه با حرف بزرگ شروع شود.(`<Wrapper/>` **نه** `<wrapper/>`). برای کسب اطلاعات بیشتر در مورد رندر شدن کامپوننت‌ها [این سند را مشاهده کنید](/docs/components-and-props.html#rendering-a-component). 

### [`props`](/docs/components-and-props.html) {#props}

`props` ورودی‌های کامپوننت ری‌اکت هستند. آنها داده‌هایی هستند که از کامپوننت پدر به کامپوننت فرزند انتقال پیدا می‌کنند.
به خاطر داشته باشید که`props`ها را فقط می‌توان خواند. نباید آنها را به هیچ طریقی تغییر داد:

```js
// Wrong!
props.number = 42;
```
اگر نیاز دارید مقداری را در پاسخ به ورودی کاربر یا شبکه تغییر دهید به جای آن از `state` استفاده کنید.

### `props.children` {#propschildren}

`props.children` در هر کامپوننتی قابل دسترسیست. شامل محتوای بین باز شدن و بسته شدن تگ یک کامپوننت است. برای مثال:

```js
<Welcome>Hello world!</Welcome>
```

متن `Hello world!` در `props.children` در کامپوننت `Welcome` در دسترس است:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

برای کامپوننت‌هایی که از کلاس استفاده می‌کنند از `this.props.children` استفاده کنید:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

A component needs `state` when some data associated with it changes over time. For example, a `Checkbox` component might need `isChecked` in its state, and a `NewsFeed` component might want to keep track of `fetchedPosts` in its state.

The most important difference between `state` and `props` is that `props` are passed from a parent component, but `state` is managed by the component itself. A component cannot change its `props`, but it can change its `state`.

For each particular piece of changing data, there should be just one component that "owns" it in its state. Don't try to synchronize states of two different components. Instead, [lift it up](/docs/lifting-state-up.html) to their closest shared ancestor, and pass it down as props to both of them.

## [Lifecycle Methods](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Controlled](/docs/forms.html#controlled-components) vs. [Uncontrolled Components](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Reconciliation](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".
