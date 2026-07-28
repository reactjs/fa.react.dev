---
title: "APIهای قدیمی ری‌اکت"
---

<Intro>

این APIها از پکیج `react` صادر می‌شوند، اما استفاده از آن‌ها در کدهای تازه‌نوشته‌شده توصیه نمی‌شود. برای جایگزین‌های پیشنهادی، به صفحهٔ اختصاصی هر API که لینک شده مراجعه کنید.

</Intro>

---

## APIهای قدیمی {/*legacy-apis*/}

* [`Children`](/reference/react/Children) به شما اجازه می‌دهد JSX دریافتی به‌عنوان پراپ `children` را دستکاری و تبدیل کنید. [جایگزین‌ها را ببینید.](/reference/react/Children#alternatives)
* [`cloneElement`](/reference/react/cloneElement) به شما اجازه می‌دهد یک المنت ری‌اکت را با استفاده از المنت دیگری به‌عنوان نقطهٔ شروع بسازید. [جایگزین‌ها را ببینید.](/reference/react/cloneElement#alternatives)
* [`Component`](/reference/react/Component) به شما اجازه می‌دهد یک کامپوننت ری‌اکت را به‌صورت کلاس جاوااسکریپت تعریف کنید. [جایگزین‌ها را ببینید.](/reference/react/Component#alternatives)
* [`createElement`](/reference/react/createElement) به شما اجازه می‌دهد یک المنت ری‌اکت بسازید. معمولاً به‌جای آن از JSX استفاده می‌کنید.
* [`createRef`](/reference/react/createRef) یک آبجکت رفرنس می‌سازد که می‌تواند هر مقدار دلخواهی را در خود نگه دارد. [جایگزین‌ها را ببینید.](/reference/react/createRef#alternatives)
* [`forwardRef`](/reference/react/forwardRef) به کامپوننت شما اجازه می‌دهد یک نُد DOM را با یک [رفرنس](/learn/manipulating-the-dom-with-refs) به کامپوننت والد افشا کند.
* [`isValidElement`](/reference/react/isValidElement) بررسی می‌کند که آیا یک مقدار یک المنت ری‌اکت هست یا نه. معمولاً به‌همراه [`cloneElement`](/reference/react/cloneElement) استفاده می‌شود.
* [`PureComponent`](/reference/react/PureComponent) شبیه [`Component`](/reference/react/Component) است، اما با پراپس یکسان از رندر مجدد می‌پرد. [جایگزین‌ها را ببینید.](/reference/react/PureComponent#alternatives)

---

## APIهای حذف‌شده {/*removed-apis*/}

این APIها در ری‌اکت ۱۹ حذف شده‌اند:

* [`createFactory`](https://18.react.dev/reference/react/createFactory): به‌جای آن از JSX استفاده کنید.
* کامپوننت‌های کلاسی: [`static contextTypes`](https://18.react.dev//reference/react/Component#static-contexttypes): به‌جای آن از [`static contextType`](#static-contexttype) استفاده کنید.
* کامپوننت‌های کلاسی: [`static childContextTypes`](https://18.react.dev//reference/react/Component#static-childcontexttypes): به‌جای آن از [`static contextType`](#static-contexttype) استفاده کنید.
* کامپوننت‌های کلاسی: [`static getChildContext`](https://18.react.dev//reference/react/Component#getchildcontext): به‌جای آن از [`Context`](/reference/react/createContext#provider) استفاده کنید.
* کامپوننت‌های کلاسی: [`static propTypes`](https://18.react.dev//reference/react/Component#static-proptypes): به‌جای آن از یک سیستم نوع مانند [TypeScript](https://www.typescriptlang.org/) استفاده کنید.
* کامپوننت‌های کلاسی: [`this.refs`](https://18.react.dev//reference/react/Component#refs): به‌جای آن از [`createRef`](/reference/react/createRef) استفاده کنید.
