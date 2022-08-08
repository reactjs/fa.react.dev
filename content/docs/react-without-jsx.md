---
id: react-without-jsx
title: ری‌اکت بدون JSX
permalink: docs/react-without-jsx.html
---

برای استفاده از ری‌اکت شما نیاز به JSX ندارید.استفاده نکردن از JSX در ری‌اکت هنگامی راحت‌تر است که نیاز به راه اندازی یک محیط تولید(build environment) ندارید.

هر المنت JSX فقط کدی (syntactic sugar) برای فراخوانی `React.createElement(component, props, ...children)` است. بنابراین هرکاری که با JSX می‌توانید انجام دهید، می شود با جاوااسکریپت ساده هم انجام داد.

برای مثال، این کد با JSX نوشته شده است:

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
```

که می‌توان همین کد را بدون نیاز به JSX کامپایل کرد:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
```

اگر کنجکاو هستید که نمونه های بیشتری از چگونگی تبدیل JSX به جاوا اسکریپت ببینید، می‌توانید از [کامپایلر آنلاین Babel](babel://jsx-simple-example) استفاده کنید.

کامپوننت هم می‌توان به صورت string باشد هم به صورت یک subclass از `React.Component` و یا یک تابع.

اگر از نوشتن `React.createElement` خسته شده اید، یک الگوی معمول این است که از اختصارنویسی استفاده نمایید:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

اگر شما از این اختصارنویسی در `React.createElement` استفاده نمایید، می‌تواند به اندازه استفاده نکردن از JSX در ری‌اکت راحت باشد.

در صورت نیاز، شما می‌توانید به انجمن‌هایی نظیر [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) و [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) که مثال‌های دیگر را در اختیارتان می‌گذارد مراجعه نمایید.

