---
title: "راهنمای ارتقا به React 19"
author: Ricky Hanlon
date: 2024/04/25
description: The improvements added to React 19 require some breaking changes, but we've worked to make the upgrade as smooth as possible and we don't expect the changes to impact most apps. In this post, we will guide you through the steps for upgrading apps and libraries to React 19.
---

25 آوریل 2024 توسط [Ricky Hanlon](https://twitter.com/rickhanlonii)

---


<Intro>

بهبودهای افزوده‌شده به React 19 نیازمند برخی تغییرات از بین‌برنده (breaking changes) است، اما تلاش کرده‌ایم ارتقا را تا حد امکان هموار کنیم و انتظار نداریم این تغییرها روی بیشتر اپلیکیشن‌ها اثر بگذارد.

</Intro>

<Note>

#### React 18.3 نیز منتشر شده است {/*react-18-3*/}

برای کمک به هموارتر شدن ارتقا به React 19، انتشار `react@18.3` را منتشر کرده‌ایم که با 18.2 یکسان است اما هشدارهایی برای APIهای منسوخ‌شده و سایر تغییرات موردنیاز برای React 19 را اضافه می‌کند.

توصیه می‌کنیم ابتدا به React 18.3 ارتقا یابید تا پیش از ارتقا به React 19، هرگونه مشکل را شناسایی کنید.

برای فهرست تغییرات 18.3، [یادداشت‌های انتشار](https://github.com/facebook/react/blob/main/CHANGELOG.md#1830-april-25-2024) را ببینید.

</Note>

در این پست، شما را در مراحل ارتقا به React 19 راهنمایی می‌کنیم:

- [نصب](#installing)
- [کدمادها](#codemods)
- [تغییرات از بین‌برنده](#breaking-changes)
- [منسوخ‌شدگی‌های جدید](#new-deprecations)
- [تغییرات قابل‌توجه](#notable-changes)
- [تغییرات TypeScript](#typescript-changes)
- [گزارش تغییرات](#changelog)

اگر مایل به کمک در آزمایش React 19 هستید، مراحل این راهنمای ارتقا را دنبال کنید و [هر مشکلی را که با آن روبه‌رو شدید گزارش کنید](https://github.com/facebook/react/issues/new?assignees=&labels=React+19&projects=&template=19.md&title=%5BReact+19%5D). برای فهرست قابلیت‌های جدید افزوده‌شده به React 19، [پست انتشار React 19](/blog/2024/12/05/react-19) را ببینید.

---
## نصب {/*installing*/}

<Note>

#### ترنسفرم جدید JSX اکنون الزامی است {/*new-jsx-transform-is-now-required*/}

ما در سال 2020 یک [ترنسفرم جدید JSX](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) را برای بهبود اندازهٔ باندل و استفاده از JSX بدون ایمپورت کردن ری‌اکت معرفی کردیم. در React 19، بهبودهای اضافی مانند استفاده از رفرنس به‌عنوان پراپس و بهبود سرعت JSX را اضافه می‌کنیم که نیازمند ترنسفرم جدید است.

اگر ترنسفرم جدید فعال نباشد، این هشدار را خواهید دید:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform

</ConsoleLogLine>

</ConsoleBlockMulti>


انتظار داریم بیشتر اپلیکیشن‌ها تحت تأثیر قرار نگیرند زیرا این ترنسفرم از قبل در بیشتر محیط‌ها فعال است. برای دستورالعمل‌های دستی دربارهٔ نحوهٔ ارتقا، لطفاً [پست اعلامیه](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) را ببینید.

</Note>


برای نصب آخرین نسخهٔ ری‌اکت و React DOM:

```bash
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
```

یا، اگر از Yarn استفاده می‌کنید:

```bash
yarn add --exact react@^19.0.0 react-dom@^19.0.0
```

اگر از TypeScript استفاده می‌کنید، باید تایپ‌ها را نیز به‌روز کنید.
```bash
npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0
```

یا، اگر از Yarn استفاده می‌کنید:
```bash
yarn add --exact @types/react@^19.0.0 @types/react-dom@^19.0.0
```

ما همچنین یک کدماد برای رایج‌ترین جایگزینی‌ها ارائه کرده‌ایم. [تغییرات TypeScript](#typescript-changes) زیر را ببینید.

## کدمادها {/*codemods*/}

برای کمک به ارتقا، با تیم [codemod.com](https://codemod.com) همکاری کرده‌ایم تا کدمادهایی را منتشر کنیم که کد شما را به‌طور خودکار برای بسیاری از APIها و الگوهای جدید React 19 به‌روز می‌کنند.

همهٔ کدمادها در [مخزن `react-codemod`](https://github.com/reactjs/react-codemod) در دسترس هستند و تیم Codemod به کمک نگهداری کدمادها پیوسته است. برای اجرای این کدمادها، توصیه می‌کنیم از دستور `codemod` به‌جای `react-codemod` استفاده کنید زیرا سریع‌تر اجرا می‌شود، مهاجرت‌های کد پیچیده‌تر را بهتر مدیریت می‌کند و پشتیبانی بهتری از TypeScript ارائه می‌دهد.


<Note>

#### اجرای همهٔ کدمادهای React 19 {/*run-all-react-19-codemods*/}

تمام کدمادهای فهرست‌شده در این راهنما را با دستور پخت‌ونمک (recipe) `codemod` برای React 19 اجرا کنید:

```bash
npx codemod@latest react/19/migration-recipe
```

این دستور کدمادهای زیر را از `react-codemod` اجرا می‌کند:
- [`replace-reactdom-render`](https://github.com/reactjs/react-codemod?tab=readme-ov-file#replace-reactdom-render) 
- [`replace-string-ref`](https://github.com/reactjs/react-codemod?tab=readme-ov-file#replace-string-ref)
- [`replace-act-import`](https://github.com/reactjs/react-codemod?tab=readme-ov-file#replace-act-import)
- [`replace-use-form-state`](https://github.com/reactjs/react-codemod?tab=readme-ov-file#replace-use-form-state) 
- [`prop-types-typescript`](https://github.com/reactjs/react-codemod#react-proptypes-to-prop-types)

این شامل تغییرات TypeScript نیست. [تغییرات TypeScript](#typescript-changes) زیر را ببینید.

</Note>

تغییراتی که شامل کدماد هستند، دستور را در زیر دارند.

برای فهرست همهٔ کدمادهای در دسترس، [مخزن `react-codemod`](https://github.com/reactjs/react-codemod) را ببینید.

## تغییرات از بین‌برنده {/*breaking-changes*/}

### خطاهای رندر دیگر دوباره پرتاب نمی‌شوند {/*errors-in-render-are-not-re-thrown*/}

در نسخه‌های قبلی ری‌اکت، خطاهایی که در حین رندر پرتاب می‌شدند، دریافت و دوباره پرتاب می‌شدند. در حالت DEV، همچنین در `console.error` لاگ می‌کردیم که منجر به لاگ‌های خطای تکراری می‌شد.

در React 19، [نحوهٔ مدیریت خطاها را بهبود داده‌ایم](/blog/2024/12/05/react-19#error-handling) تا با عدم پرتاب مجدد، از تکراری‌شدن جلوگیری شود:

- **خطاهای غیرقابل دریافت (Uncaught Errors)**: خطاهایی که توسط یک مرز خطا (Error Boundary) دریافت نمی‌شوند، به `window.reportError` گزارش می‌شوند.
- **خطاهای دریافت‌شده (Caught Errors)**: خطاهایی که توسط یک مرز خطا دریافت می‌شوند، به `console.error` گزارش می‌شوند.

این تغییر نباید روی بیشتر اپلیکیشن‌ها اثر بگذارد، اما اگر گزارش خطای عملیاتی شما به پرتاب دوبارهٔ خطاها وابسته است، ممکن است نیاز به به‌روزرسانی مدیریت خطای خود داشته باشید. برای پشتیبانی از این موضوع، متدهای جدیدی به `createRoot` و `hydrateRoot` برای مدیریت خطای سفارشی افزوده‌ایم:

```js [[1, 2, "onUncaughtError"], [2, 5, "onCaughtError"]]
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    // ... log error report
  },
  onCaughtError: (error, errorInfo) => {
    // ... log error report
  }
});
```

برای اطلاعات بیشتر، مستندات [`createRoot`](https://react.dev/reference/react-dom/client/createRoot) و [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) را ببینید.


### حذف APIهای منسوخ‌شدهٔ ری‌اکت {/*removed-deprecated-react-apis*/}

#### حذف‌شده: `propTypes` و `defaultProps` برای توابع {/*removed-proptypes-and-defaultprops*/}
`PropTypes` در [آوریل 2017 (v15.5.0)](https://legacy.reactjs.org/blog/2017/04/07/react-v15.5.0.html#new-deprecation-warnings) منسوخ شدند.

در React 19، بررسی‌های `propType` را از بستهٔ ری‌اکت حذف می‌کنیم و استفاده از آن‌ها به‌صورت بی‌صدا نادیده گرفته خواهد شد. اگر از `propTypes` استفاده می‌کنید، توصیه می‌کنیم به TypeScript یا راه‌حل دیگری برای بررسی نوع مهاجرت کنید.

ما همچنین `defaultProps` را از کامپوننت‌های تابعی به‌نفع پارامترهای پیش‌فرض ES6 حذف می‌کنیم. کامپوننت‌های کلاسی همچنان از `defaultProps` پشتیبانی خواهند کرد زیرا جایگزین ES6 برای آن‌ها وجود ندارد.

```js
// Before
import PropTypes from 'prop-types';

function Heading({text}) {
  return <h1>{text}</h1>;
}
Heading.propTypes = {
  text: PropTypes.string,
};
Heading.defaultProps = {
  text: 'Hello, world!',
};
```
```ts
// After
interface Props {
  text?: string;
}
function Heading({text = 'Hello, world!'}: Props) {
  return <h1>{text}</h1>;
}
```

<Note>

با دستور زیر `propTypes` را به TypeScript کدماد کنید:

```bash
npx codemod@latest react/prop-types-typescript
```

</Note>

#### حذف‌شده: کانتکست قدیمی با `contextTypes` و `getChildContext` {/*removed-removing-legacy-context*/}

کانتکست قدیمی در [اکتبر 2018 (v16.6.0)](https://legacy.reactjs.org/blog/2018/10/23/react-v-16-6.html) منسوخ شد.

کانتکست قدیمی فقط در کامپوننت‌های کلاسی با APIهای `contextTypes` و `getChildContext` در دسترس بود، و به‌دلیل باگ‌های ظریفی که به‌سادگی نادیده گرفته می‌شدند، با `contextType` جایگزین شد. در React 19، کانتکست قدیمی را حذف می‌کنیم تا ری‌اکت را کمی کوچک‌تر و سریع‌تر کنیم.

اگر همچنان از کانتکست قدیمی در کامپوننت‌های کلاسی استفاده می‌کنید، باید به API جدید `contextType` مهاجرت کنید:

```js {5-11,19-21}
// Before
import PropTypes from 'prop-types';

class Parent extends React.Component {
  static childContextTypes = {
    foo: PropTypes.string.isRequired,
  };

  getChildContext() {
    return { foo: 'bar' };
  }

  render() {
    return <Child />;
  }
}

class Child extends React.Component {
  static contextTypes = {
    foo: PropTypes.string.isRequired,
  };

  render() {
    return <div>{this.context.foo}</div>;
  }
}
```

```js {2,7,9,15}
// After
const FooContext = React.createContext();

class Parent extends React.Component {
  render() {
    return (
      <FooContext value='bar'>
        <Child />
      </FooContext>
    );
  }
}

class Child extends React.Component {
  static contextType = FooContext;

  render() {
    return <div>{this.context}</div>;
  }
}
```

#### حذف‌شده: رفرنس‌های رشته‌ای {/*removed-string-refs*/}
رفرنس‌های رشته‌ای در [مارس 2018 (v16.3.0)](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html) منسوخ شدند.

کامپوننت‌های کلاسی پیش از آنکه با کالبک‌های رفرنس جایگزین شوند، از رفرنس‌های رشته‌ای پشتیبانی می‌کردند که [دلایل متعددی](https://github.com/facebook/react/issues/1373) علیه آن وجود داشت. در React 19، رفرنس‌های رشته‌ای را حذف می‌کنیم تا ری‌اکت را ساده‌تر و قابل‌فهم‌تر کنیم.

اگر همچنان از رفرنس‌های رشته‌ای در کامپوننت‌های کلاسی استفاده می‌کنید، باید به کالبک‌های رفرنس مهاجرت کنید:

```js {4,8}
// Before
class MyComponent extends React.Component {
  componentDidMount() {
    this.refs.input.focus();
  }

  render() {
    return <input ref='input' />;
  }
}
```

```js {4,8}
// After
class MyComponent extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return <input ref={input => this.input = input} />;
  }
}
```

<Note>

رفرنس‌های رشته‌ای را با کالبک‌های `ref` کدماد کنید:

```bash
npx codemod@latest react/19/replace-string-ref
```

</Note>

#### حذف‌شده: کارخانه‌های الگوی ماژولی {/*removed-module-pattern-factories*/}
کارخانه‌های الگوی ماژولی در [اوت 2019 (v16.9.0)](https://legacy.reactjs.org/blog/2019/08/08/react-v16.9.0.html#deprecating-module-pattern-factories) منسوخ شدند.

این الگو به‌ندرت استفاده می‌شد و پشتیبانی از آن باعث می‌شد ری‌اکت کمی بزرگ‌تر و کُندتر از حد لازم باشد. در React 19، پشتیبانی از کارخانه‌های الگوی ماژولی را حذف می‌کنیم و باید به توابع معمولی مهاجرت کنید:

```js
// Before
function FactoryComponent() {
  return { render() { return <div />; } }
}
```

```js
// After
function FactoryComponent() {
  return <div />;
}
```

#### حذف‌شده: `React.createFactory` {/*removed-createfactory*/}
`createFactory` در [فوریهٔ 2020 (v16.13.0)](https://legacy.reactjs.org/blog/2020/02/26/react-v16.13.0.html#deprecating-createfactory) منسوخ شد.

استفاده از `createFactory` پیش از پشتیبانی گسترده از JSX رایج بود، اما امروزه به‌ندرت استفاده می‌شود و می‌توان آن را با JSX جایگزین کرد. در React 19، `createFactory` را حذف می‌کنیم و باید به JSX مهاجرت کنید:

```js
// Before
import { createFactory } from 'react';

const button = createFactory('button');
```

```js
// After
const button = <button />;
```

#### حذف‌شده: `react-test-renderer/shallow` {/*removed-react-test-renderer-shallow*/}

در React 18، `react-test-renderer/shallow` را به‌روزرسانی کردیم تا [react-shallow-renderer](https://github.com/enzymejs/react-shallow-renderer) را دوباره اکسپورت کند. در React 19، `react-test-render/shallow` را حذف می‌کنیم تا نصب مستقیم بسته ترجیح داده شود:

```bash
npm install react-shallow-renderer --save-dev
```
```diff
- import ShallowRenderer from 'react-test-renderer/shallow';
+ import ShallowRenderer from 'react-shallow-renderer';
```

<Note>

##### لطفاً رندر سطحی (shallow rendering) را بازنگری کنید {/*please-reconsider-shallow-rendering*/}

رندر سطحی به internals ری‌اکت وابسته است و می‌تواند شما را از ارتقاهای آینده بازدارد. توصیه می‌کنیم آزمایش‌های خود را به [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) یا [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro) منتقل کنید. 

</Note>

### حذف APIهای منسوخ‌شدهٔ React DOM {/*removed-deprecated-react-dom-apis*/}

#### حذف‌شده: `react-dom/test-utils` {/*removed-react-dom-test-utils*/}

ما `act` را از `react-dom/test-utils` به بستهٔ `react` منتقل کرده‌ایم:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.

</ConsoleLogLine>

</ConsoleBlockMulti>

برای رفع این هشدار، می‌توانید `act` را از `react` ایمپورت کنید:

```diff
- import {act} from 'react-dom/test-utils'
+ import {act} from 'react';
```

تمام توابع دیگر `test-utils` حذف شده‌اند. این ابزارها رایج نبودند و وابستگی به جزئیات پیاده‌سازی سطح‌پایینِ کامپوننت‌ها و ری‌اکت را بیش از حد آسان می‌کردند. در React 19، این توابع هنگام فراخوانی خطا می‌دهند و اکسپورت‌های آن‌ها در نسخهٔ آینده حذف خواهد شد.

برای جایگزینی‌ها، [صفحهٔ هشدار](https://react.dev/warnings/react-dom-test-utils) را ببینید.

<Note>

`ReactDOMTestUtils.act` را با دستور زیر به `React.act` کدماد کنید:

```bash
npx codemod@latest react/19/replace-act-import
```

</Note>

#### حذف‌شده: `ReactDOM.render` {/*removed-reactdom-render*/}

`ReactDOM.render` در [مارس 2022 (v18.0.0)](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) منسوخ شد. در React 19، `ReactDOM.render` را حذف می‌کنیم و باید به استفاده از [`ReactDOM.createRoot`](https://react.dev/reference/react-dom/client/createRoot) مهاجرت کنید:

```js
// Before
import {render} from 'react-dom';
render(<App />, document.getElementById('root'));

// After
import {createRoot} from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

<Note>

`ReactDOM.render` را به `ReactDOMClient.createRoot` کدماد کنید:

```bash
npx codemod@latest react/19/replace-reactdom-render
```

</Note>

#### حذف‌شده: `ReactDOM.hydrate` {/*removed-reactdom-hydrate*/}

`ReactDOM.hydrate` در [مارس 2022 (v18.0.0)](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) منسوخ شد. در React 19، `ReactDOM.hydrate` را حذف می‌کنیم و باید به استفاده از [`ReactDOM.hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) مهاجرت کنید،

```js
// Before
import {hydrate} from 'react-dom';
hydrate(<App />, document.getElementById('root'));

// After
import {hydrateRoot} from 'react-dom/client';
hydrateRoot(document.getElementById('root'), <App />);
```

<Note>

`ReactDOM.hydrate` را به `ReactDOMClient.hydrateRoot` کدماد کنید:

```bash
npx codemod@latest react/19/replace-reactdom-render
```

</Note>

#### حذف‌شده: `unmountComponentAtNode` {/*removed-unmountcomponentatnode*/}

`ReactDOM.unmountComponentAtNode` در [مارس 2022 (v18.0.0)](https://react.dev/blog/2022/03/08/react-18-upgrade-guide) منسوخ شد. در React 19، باید به استفاده از `root.unmount()` مهاجرت کنید.


```js
// Before
unmountComponentAtNode(document.getElementById('root'));

// After
root.unmount();
```

برای اطلاعات بیشتر، `root.unmount()` را برای [`createRoot`](https://react.dev/reference/react-dom/client/createRoot#root-unmount) و [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot#root-unmount) ببینید.

<Note>

`unmountComponentAtNode` را به `root.unmount` کدماد کنید:

```bash
npx codemod@latest react/19/replace-reactdom-render
```

</Note>

#### حذف‌شده: `ReactDOM.findDOMNode` {/*removed-reactdom-finddomnode*/}

`ReactDOM.findDOMNode` در [اکتبر 2018 (v16.6.0)](https://legacy.reactjs.org/blog/2018/10/23/react-v-16-6.html#deprecations-in-strictmode) منسوخ شد.

ما `findDOMNode` را حذف می‌کنیم زیرا یک راه فرار قدیمی بود که اجرای آن کُند بود، در برابر بازطراحی شکننده بود، فقط اولین فرزند را بازمی‌گرداند و سطوح انتزاع را می‌شکست (برای اطلاعات بیشتر [اینجا](https://legacy.reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage) را ببینید). می‌توانید `ReactDOM.findDOMNode` را با [رفرنس‌های DOM](/learn/manipulating-the-dom-with-refs) جایگزین کنید:

```js
// Before
import {findDOMNode} from 'react-dom';

function AutoselectingInput() {
  useEffect(() => {
    const input = findDOMNode(this);
    input.select()
  }, []);

  return <input defaultValue="Hello" />;
}
```

```js
// After
function AutoselectingInput() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.select();
  }, []);

  return <input ref={ref} defaultValue="Hello" />
}
```

## منسوخ‌شدگی‌های جدید {/*new-deprecations*/}

### منسوخ‌شده: `element.ref` {/*deprecated-element-ref*/}

React 19 از [رفرنس به‌عنوان پراپس](/blog/2024/12/05/react-19#ref-as-a-prop) پشتیبانی می‌کند، بنابراین `element.ref` را به‌نفع `element.props.ref` منسوخ می‌کنیم.

دسترسی به `element.ref` هشدار خواهد داد:

<ConsoleBlockMulti>

<ConsoleLogLine level="error">

Accessing element.ref is no longer supported. ref is now a regular prop. It will be removed from the JSX Element type in a future release.

</ConsoleLogLine>

</ConsoleBlockMulti>

### منسوخ‌شده: `react-test-renderer` {/*deprecated-react-test-renderer*/}

ما `react-test-renderer` را منسوخ می‌کنیم زیرا محیط رندرر اختصاصی خودش را پیاده‌سازی می‌کند که با محیط استفاده‌شده توسط کاربران مطابقت ندارد، آزمایش جزئیات پیاده‌سازی را ترویج می‌کند و به introspection از internals ری‌اکت وابسته است.

رندرر آزمایشی پیش از آنکه راهکارهای آزمایشی قابل‌اعتمادتری مانند [React Testing Library](https://testing-library.com) در دسترس باشند، ساخته شد، و اکنون توصیه می‌کنیم به‌جای آن از یک کتابخانهٔ آزمایشی مدرن استفاده کنید.

در React 19، `react-test-renderer` یک هشدار منسوخ‌شدگی لاگ می‌کند و به رندر همزمان (concurrent) تغییر یافته است. ما توصیه می‌کنیم آزمایش‌های خود را به [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) یا [@testing-library/react-native](https://testing-library.com/docs/react-native-testing-library/intro) منتقل کنید تا تجربهٔ آزمایشی مدرن و به‌خوبی پشتیبانی‌شده‌ای داشته باشید.

## تغییرات قابل‌توجه {/*notable-changes*/}

### تغییرات حالت سخت‌گیرانه (Strict Mode) {/*strict-mode-improvements*/}

React 19 شامل چندین رفع و بهبود برای حالت سخت‌گیرانه (Strict Mode) است.

هنگام رندر دوگانه در حالت سخت‌گیرانه در حالت توسعه، `useMemo` و `useCallback` نتایج مموری‌شدهٔ رندر اول را در رندر دوم استفادهٔ مجدد می‌کنند. کامپوننت‌هایی که از قبل با حالت سخت‌گیرانه سازگارند نباید تفاوتی در رفتار ببینند.

مانند همهٔ رفتارهای حالت سخت‌گیرانه، این قابلیت‌ها طراحی شده‌اند تا باگ‌های کامپوننت‌های شما را به‌صورت پیش‌فعال در حین توسعه آشکار کنند تا بتوانید پیش از ارسال به محیط عملیاتی آن‌ها را رفع کنید. برای مثال، در حین توسعه، حالت سخت‌گیرانه توابع کالبک رفرنس را در mount اولیه دو بار فراخوانی می‌کند تا شبیه‌سازی کند وقتی یک کامپوننت mountشده با fallback ساسپنس جایگزین می‌شود چه اتفاقی می‌افتد.

### بهبودهای ساسپنس {/*improvements-to-suspense*/}

در React 19، وقتی یک کامپوننت ساسپند می‌شود، ری‌اکت بلافاصله fallbackِ نزدیک‌ترین مرز ساسپنس را بدون انتظار برای رندر کل درخت خواهرخوانده کامیت می‌کند. پس از کامیت fallback، ری‌اکت یک رندر دیگر برای خواهرخوانده‌های ساسپندشده زمان‌بندی می‌کند تا درخواست‌های تنبل در بقیهٔ درخت را «پیش‌گرم» کند:

<Diagram name="prerender" height={162} width={1270} alt="Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Both Panel components contain isActive with value false.">

پیش‌تر، هنگام ساسپندشدن یک کامپوننت، خواهرخوانده‌های ساسپندشده رندر می‌شدند و سپس fallback کامیت می‌شد.

</Diagram>

<Diagram name="prewarm" height={162} width={1270} alt="The same diagram as the previous, with the isActive of the first child Panel component highlighted indicating a click with the isActive value set to true. The second Panel component still contains value false." >

در React 19، هنگام ساسپندشدن یک کامپوننت، fallback کامیت می‌شود و سپس خواهرخوانده‌های ساسپندشده رندر می‌شوند.

</Diagram>

این تغییر بدان معناست که fallbackهای ساسپنس سریع‌تر نمایش داده می‌شوند، در حالی که همچنان درخواست‌های تنبل در درخت ساسپندشده گرم می‌شوند.

### ساخت‌های UMD حذف شدند {/*umd-builds-removed*/}

UMD در گذشته به‌طور گسترده به‌عنوان راهی مناسب برای بارگذاری ری‌اکت بدون مرحلهٔ build استفاده می‌شد. اکنون جایگزین‌های مدرنی برای بارگذاری ماژول‌ها به‌عنوان اسکریپت در سندهای HTML وجود دارد. از React 19 به بعد، ری‌اکت دیگر ساخت‌های UMD تولید نخواهد کرد تا پیچیدگی فرایند آزمایش و انتشار آن کاهش یابد.

برای بارگذاری React 19 با یک تگ اسکریپت، توصیه می‌کنیم از یک CDN مبتنی بر ESM مانند [esm.sh](https://esm.sh/) استفاده کنید.

```html
<script type="module">
  import React from "https://esm.sh/react@19/?dev"
  import ReactDOMClient from "https://esm.sh/react-dom@19/client?dev"
  ...
</script>
```

### کتابخانه‌های وابسته به internals ری‌اکت ممکن است مانع ارتقا شوند {/*libraries-depending-on-react-internals-may-block-upgrades*/}

این انتشار شامل تغییراتی در internals ری‌اکت است که ممکن است بر کتابخانه‌هایی تأثیر بگذارد که درخواست‌های ما برای عدم استفاده از internals مانند `SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` را نادیده می‌گیرند. این تغییرات برای اعمال بهبودها در React 19 ضروری هستند و کتابخانه‌هایی که از راهنمایی‌های ما پیروی می‌کنند را نمی‌شکنند.

بر اساس [سیاست نسخه‌بندی](https://react.dev/community/versioning-policy#what-counts-as-a-breaking-change) ما، این به‌روزرسانی‌ها به‌عنوان تغییرات از بین‌برنده فهرست نشده‌اند، و ما مستنداتی برای نحوهٔ ارتقای آن‌ها ارائه نمی‌کنیم. توصیه این است که هر کدی که به internals وابسته است را حذف کنید.

برای بازتاب تأثیر استفاده از internals، پسوند `SECRET_INTERNALS` را به موارد زیر تغییر نام داده‌ایم:

`_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`

در آینده به‌طور تهاجمی‌تری دسترسی به internals از ری‌اکت را مسدود خواهیم کرد تا از استفاده بازداریم و مطمئن شویم کاربران از ارتقا باز نمی‌مانند.

## تغییرات TypeScript {/*typescript-changes*/}

### حذف تایپ‌های منسوخ‌شدهٔ TypeScript {/*removed-deprecated-typescript-types*/}

ما تایپ‌های TypeScript را بر اساس APIهای حذف‌شده در React 19 پاک‌سازی کرده‌ایم. برخی از تایپ‌های حذف‌شده به بسته‌های مرتبط‌تر منتقل شده‌اند و دیگر نیازی به توصیف رفتار ری‌اکت نیستند.

<Note>
ما [`types-react-codemod`](https://github.com/eps1lon/types-react-codemod/) را برای مهاجرت بیشترِ تغییرات از بین‌برندهٔ مرتبط با تایپ منتشر کرده‌ایم:

```bash
npx types-react-codemod@latest preset-19 ./path-to-app
```

اگر دسترسی نامطمئن زیادی به `element.props` دارید، می‌توانید این کدماد اضافی را اجرا کنید:

```bash
npx types-react-codemod@latest react-element-default-any-props ./path-to-your-react-ts-files
```

</Note>

برای فهرست جایگزینی‌های پشتیبانی‌شده، [`types-react-codemod`](https://github.com/eps1lon/types-react-codemod/) را ببینید. اگر فکر می‌کنید کدمادی گم شده است، می‌توانید آن را در [فهرست کدمادهای گم‌شدهٔ React 19](https://github.com/eps1lon/types-react-codemod/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22React+19%22+label%3Aenhancement) پیگیری کنید.


### پاکسازی رفرنس الزامی است {/*ref-cleanup-required*/}

_این تغییر در پیش‌تنظیم کدماد `react-19` به‌نام [`no-implicit-ref-callback-return
`](https://github.com/eps1lon/types-react-codemod/#no-implicit-ref-callback-return) گنجانده شده است._

به‌دلیل معرفی توابع پاکسازی رفرنس، بازگرداندن هر چیز دیگری از یک کالبک رفرنس اکنون توسط TypeScript رد خواهد شد. رفع معمولاً این است که استفاده از بازگشت‌های ضمنی را متوقف کنید:

```diff [[1, 1, "("], [1, 1, ")"], [2, 2, "{", 15], [2, 2, "}", 1]]
- <div ref={current => (instance = current)} />
+ <div ref={current => {instance = current}} />
```

کد اصلی نمونهٔ `HTMLDivElement` را بازمی‌گرداند و TypeScript نمی‌دانست که آیا این قرار است یک تابع پاکسازی باشد یا خیر.

### `useRef` نیازمند یک آرگومان است {/*useref-requires-argument*/}

_این تغییر در پیش‌تنظیم کدماد `react-19` به‌نام [`refobject-defaults`](https://github.com/eps1lon/types-react-codemod/#refobject-defaults) گنجانده شده است._

یک شکایت دیرینه دربارهٔ نحوهٔ کار TypeScript و ری‌اکت، `useRef` بوده است. ما تایپ‌ها را تغییر داده‌ایم به‌طوری که `useRef` اکنون نیازمند یک آرگومان است. این کار امضای تایپ آن را به‌طور قابل‌توجهی ساده می‌کند. اکنون بیشتر شبیه `createContext` رفتار خواهد کرد.

```ts
// @ts-expect-error: Expected 1 argument but saw none
useRef();
// Passes
useRef(undefined);
// @ts-expect-error: Expected 1 argument but saw none
createContext();
// Passes
createContext(undefined);
```

این اکنون بدان معناست که همهٔ رفرنس‌ها قابل‌تغییر (mutable) هستند. دیگر با مشکل عدم توانایی تغییر یک رفرنس به‌دلیل مقداردهی اولیهٔ آن با `null` روبه‌رو نخواهید شد:

```ts
const ref = useRef<number>(null);

// Cannot assign to 'current' because it is a read-only property
ref.current = 1;
```

`MutableRef` اکنون به‌نفع یک تایپ تک `RefObject` که `useRef` همیشه بازمی‌گرداند، منسوخ شده است:

```ts
interface RefObject<T> {
  current: T
}

declare function useRef<T>: RefObject<T>
```

`useRef` همچنان یک overload راحت برای `useRef<T>(null)` دارد که به‌طور خودکار `RefObject<T | null>` بازمی‌گرداند. برای تسهیل مهاجرت به‌دلیل آرگومان الزامی برای `useRef`، یک overload راحت برای `useRef(undefined)` اضافه شده است که به‌طور خودکار `RefObject<T | undefined>` بازمی‌گرداند.

برای گفتگوهای پیشین دربارهٔ این تغییر، [[RFC] Make all refs mutable](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/64772) را ببینید.

### تغییرات تایپ TypeScript برای `ReactElement` {/*changes-to-the-reactelement-typescript-type*/}

_این تغییر در کدماد [`react-element-default-any-props`](https://github.com/eps1lon/types-react-codemod#react-element-default-any-props) گنجانده شده است._

پراپس عناصر ری‌اکت اکنون اگر عنصر به‌صورت `ReactElement` تایپ شده باشد، به‌جای `any` به‌طور پیش‌فرض `unknown` است. اگر یک آرگومان تایپ به `ReactElement` ارسال کنید، این روی شما اثر ندارد:

```ts
type Example2 = ReactElement<{ id: string }>["props"];
//   ^? { id: string }
```

اما اگر به مقدار پیش‌فرض تکیه داشتید، اکنون باید `unknown` را مدیریت کنید:

```ts
type Example = ReactElement["props"];
//   ^? Before, was 'any', now 'unknown'
```

شما تنها در صورتی به این نیاز دارید که کد قدیمی زیادی داشته باشید که به دسترسی نامطمئن به پراپس عنصر وابسته است. introspection عنصر صرفاً به‌عنوان یک راه فرار وجود دارد و باید صریحاً مشخص کنید که دسترسی پراپس شما نامطمئن است با یک `any` صریح.

### فضای نام JSX در TypeScript {/*the-jsx-namespace-in-typescript*/}
این تغییر در پیش‌تنظیم کدماد `react-19` به‌نام [`scoped-jsx`](https://github.com/eps1lon/types-react-codemod#scoped-jsx) گنجانده شده است

یک درخواست دیرینه، حذف فضای نام سراسری `JSX` از تایپ‌های ما به‌نفع `React.JSX` است. این کار به جلوگیری از آلودگی تایپ‌های سراسری کمک می‌کند که از تضاد میان کتابخانه‌های مختلف رابط کاربری که از JSX استفاده می‌کنند جلوگیری می‌کند.

اکنون باید augmentation ماژول فضای نام JSX را در `declare module "...."` بپیچید:

```diff
// global.d.ts
+ declare module "react" {
    namespace JSX {
      interface IntrinsicElements {
        "my-element": {
          myElementProps: string;
        };
      }
    }
+ }
```

مشخص‌کنندهٔ دقیق ماژول به runtime JSX که در `compilerOptions` از `tsconfig.json` خود مشخص کرده‌اید بستگی دارد:

- برای `"jsx": "react-jsx"` این `react/jsx-runtime` خواهد بود.
- برای `"jsx": "react-jsxdev"` این `react/jsx-dev-runtime` خواهد بود.
- برای `"jsx": "react"` و `"jsx": "preserve"` این `react` خواهد بود.

### تایپ‌گذاری بهتر `useReducer` {/*better-usereducer-typings*/}

`useReducer` اکنون به‌لطف [@mfp22](https://github.com/mfp22) استنتاج تایپ بهبودیافته‌ای دارد.

با این حال، این نیازمند یک تغییر از بین‌برنده بود که در آن `useReducer` تایپ کامل ردیوسر را به‌عنوان پارامتر تایپ قبول نمی‌کند، بلکه به‌جای آن یا هیچ‌کدام را نمی‌پذیرد (و به تایپ زمینه‌ای تکیه می‌کند) یا هم تایپ استیت و هم تایپ اکشن را نیاز دارد.

بهترین رویهٔ جدید این است که آرگومان‌های تایپ را به `useReducer` ارسال *نکنید*.
```diff
- useReducer<React.Reducer<State, Action>>(reducer)
+ useReducer(reducer)
```
این ممکن است در موارد حاشیه‌ای کار نکند، در آنجا می‌توانید استیت و اکشن را به‌صورت صریح با ارسال `Action` در یک tuple تایپ کنید:
```diff
- useReducer<React.Reducer<State, Action>>(reducer)
+ useReducer<State, [Action]>(reducer)
```
اگر ردیوسر را به‌صورت inline تعریف می‌کنید، تشویق می‌کنیم به‌جای آن پارامترهای تابع را annotate کنید:
```diff
- useReducer<React.Reducer<State, Action>>((state, action) => state)
+ useReducer((state: State, action: Action) => state)
```
این همان کاری است که باید انجام دهید اگر ردیوسر را خارج از فراخوانی `useReducer` منتقل کنید:

```ts
const reducer = (state: State, action: Action) => state;
```

## گزارش تغییرات {/*changelog*/}

### سایر تغییرات از بین‌برنده {/*other-breaking-changes*/}

- **react-dom**: خطا برای URLهای جاوااسکریپتی در `src` و `href` [#26507](https://github.com/facebook/react/pull/26507)
- **react-dom**: حذف `errorInfo.digest` از `onRecoverableError` [#28222](https://github.com/facebook/react/pull/28222)
- **react-dom**: حذف `unstable_flushControlled` [#26397](https://github.com/facebook/react/pull/26397)
- **react-dom**: حذف `unstable_createEventHandle` [#28271](https://github.com/facebook/react/pull/28271)
- **react-dom**: حذف `unstable_renderSubtreeIntoContainer` [#28271](https://github.com/facebook/react/pull/28271)
- **react-dom**: حذف `unstable_runWithPriority` [#28271](https://github.com/facebook/react/pull/28271)
- **react-is**: حذف متدهای منسوخ‌شده از `react-is` [28224](https://github.com/facebook/react/pull/28224)

### سایر تغییرات قابل‌توجه {/*other-notable-changes*/}

- **react**: دسته‌بندی (Batching) laneهای sync، default و continuous [#25700](https://github.com/facebook/react/pull/25700)
- **react**: عدم پیش‌رندر خواهرخوانده‌های کامپوننت ساسپندشده [#26380](https://github.com/facebook/react/pull/26380)
- **react**: تشخیص حلقه‌های به‌روزرسانی بی‌نهایت ناشی از به‌روزرسانی‌های فاز رندر [#26625](https://github.com/facebook/react/pull/26625)
- **react-dom**: ترنزیشن‌ها در popstate اکنون همگام هستند [#26025](https://github.com/facebook/react/pull/26025)
- **react-dom**: حذف هشدار افکت چیدمان در حین SSR [#26395](https://github.com/facebook/react/pull/26395)
- **react-dom**: هشدار و عدم تنظیم رشتهٔ خالی برای src/href (به‌جز تگ‌های anchor) [#28124](https://github.com/facebook/react/pull/28124)

برای فهرست کامل تغییرات، لطفاً [گزارش تغییرات](https://github.com/facebook/react/blob/main/CHANGELOG.md#1900-december-5-2024) را ببینید.

---

از [Andrew Clark](https://twitter.com/acdlite)، [Eli White](https://twitter.com/Eli_White)، [Jack Pope](https://github.com/jackpope)، [Jan Kassens](https://github.com/kassens)، [Josh Story](https://twitter.com/joshcstory)، [Matt Carroll](https://twitter.com/mattcarrollcode)، [Noah Lemen](https://twitter.com/noahlemen)، [Sophie Alpert](https://twitter.com/sophiebits) و [Sebastian Silbermann](https://twitter.com/sebsilbermann) برای بازبینی و ویرایش این پست سپاسگزاریم.
