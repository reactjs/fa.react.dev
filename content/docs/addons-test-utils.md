---
id: test-utils
title: ابزارهای تست
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**ایمپورت کردن**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
```

## بررسی اجمالی {#overview}

`ReactTestUtils` عملیات تست کامپوننت‌های ری‌اکت را در فریموورک موردنظرتان ساده می‌کند. ما در فیسبوک از [Jest](https://facebook.github.io/jest/) برای تست کردن جاوااسکریپتی بدون دردسر استفاده می‌کنیم. برای اینکه یاد بگیرید از کجا شروع کنید از [React Tutorial](https://jestjs.io/docs/tutorial-react) سایت Jest استفاده نمایید.

> نکته:
>
> ما استفاده از [React Testing Library](https://testing-library.com/react) را پیش‌نهاد می‌کنیم، از آن‌جا که طراحی آن با هدف قادر ساختن و تشویق شما به نوشتن تست‌ به گونه‌ای است که کاربر نهایی کامپوننت شما را استفاده می‌کند.
>
> برای نسخه‌های ری‌اکت <= 16، کتابخانه [Enzyme](https://airbnb.io/enzyme/) بررسی، دستکاری و ارزیابی خروجی کامپوننت‌های ری‌اکت شما را ساده می‌کند.



 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## مرجع {#reference}

### `act()` {#act}

برای آماده‌سازی یک کامپوننت برای اثبات، کدی که آن را رندر و به‌روز رسانی می‌کند را درون یک فراخوانی `act()` قرار دهید. این‌کار باعث می‌شود تست شما به روش کارکرد ری‌اکت در مرورگر نزدیک‌تر شود.

>نکته
>
>اگر از `react-test-renderer` استفاده می‌کنید، یک خروجی `act` که به همین شکل رفتار می‌کند برایتان فراهم می‌کند.

برای مثال، اجازه دهید بگوییم این کامپوننت `Counter` را داریم:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
```

به این شکل آن را تست می‌کنیم:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.createRoot(container).render(<Counter />);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // Test second render and componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

- فراموش نکنید که توضیع (dispatch) رویداد‌های DOM تنها زمانی که DOM container به `document` اضافه شده‌باشد کار می‌کند. شما می‌توانید از یک کتابخانه مانند [React Testing Library](https://testing-library.com/react) برای کاهش کدهای تکراری (boilerplate) استفاده کنید.

- سند [دستورالعمل‌ها](/docs/testing-recipes.html) شامل اطلاعات بیشتری در مورد چگونگی رفتار `act()`، با مثال‌ها و کاربردها می‌باشد.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

یک ماژول کامپوننت mock شده به این متد پاس دهید تا آن را به متدهای سودمندی که به آن اجازه می‌دهند که به عنوان یک کامپوننت ساختگی ری‌اکت استفاده شود تبدیل کنید. به جای این‌که مثل همیشه رندر شود، کامپوننت یک `<div>` ساده (یا تگ دیگری اگر `mockTagName` فراهم شده باشد) خواهد شد که هر فرزندی را که فراهم شده‌‌باشد، دربر می‌گیرد.

> نکته:
>
> `mockComponent()` یک API قدیمی است. ما استفاده از [`jest.mock()`](https://jestjs.io/docs/tutorial-react-native#mock-native-modules-using-jestmock) به عنوان جایگزین توصیه می‌کنیم.

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

اگر `element` هر المنت ری‌اکتی باشد `true` برمی‌گرداند.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

اگر `element` یک المنت ری‌اکت که از نوع `componentClass` ری‌اکت است باشد، `true` بازمی‌گرداند.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

اگر `instance` یک کامپوننت DOM باشد (مانند یک `<div>` یا `<span>`) مقدار `true` برمی‌گرداند.

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

اگر `instance` یک کامپوننت تعریف شده توسط کاربر مانند یک کلاس یا یک تابع باشد، مقدار `true` را برمی‌گرداند.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

اگر `instance` یک کامپوننت از نوع `componentClass` ری‌اکت باشد مقدار `true` را برمی‌گرداند.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

از تمامی کامپوننت ها در `tree` عبور می‌کند و تمام کامپوننت‌هایی که `test(component)` آن‌ها مقدار `true` دارد را ذخیره می‌کند. به تنهایی کاربردی ندارد، اما به عنوان یک قدم اولیه برای دیگر ابزارهای تست استفاده می‌شود.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

تمامی المنت‌های DOM در کامپوننت‌های درخت رندر شده را که کامپوننت‌هایی هستند که نام کلاسشان با `className` برابر است را پیدا می‌کند.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

شبیه [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) است اما انتظار دارد که تنها یک نتیجه وجود داشته باشد، یا اگر هر تعدادی به غیر از یک نتیجه پیدا کند یک خطا می‌اندازد.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

تمامی المنت‌های DOM در کامپوننت‌های درخت رندر شده را که کامپوننت‌هایی هستند که نام تگشان با `tagName` برابر است را پیدا می‌کند.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

شبیه [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) است اما انتظار دارد که تنها یک نتیجه وجود داشته باشد، یا اگر هر تعدادی به غیر از یک نتیجه پیدا کند یک خطا می‌اندازد.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

تمامی instance های کامپوننت‌ها با نوع `componentClass` را پیدا می‌کند.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

مانند [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) است اما انتظار دارد که تنها یک نتیجه وجود داشته باشد، یا اگر هر تعدادی به غیر از یک نتیجه پیدا کند یک خطا باز می‌گرداند.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

یک المنت ری‌اکت را در یک نود DOM جدا شده در document رندر می‌کند. **این تابع یک DOM نیاز دارد.** معادل است با:

```js
const domContainer = document.createElement('div');
ReactDOM.createRoot(domContainer).render(element);
```

> نکته:
>
> شما به `window`، `window.document` و `window.document.createElement` **قبل** از اینکه `React` را ایمپورت کنید و با دسترسی عمومی نیاز خواهید داشت. در غیر اینصورت ری‌اکت فکر می‌کند که نمی‌تواند به DOM دسترسی پیدا کند و متدهایی مانند `setState` کار نخواهند کرد.

* * *

## دیگر ابزارها {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

توزیع یک رویداد روی یک نود DOM با `eventData` داده اختیاری برای رویداد شبیه‌سازی می‌کند.

`Simulate` یک متد برای [هر رویدادی که ری‌اکت می‌فهمد](/docs/events.html#supported-events) دارد.

**کلیک کردن روی یک المنت**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**تغییر مقدار یک فیلد ورودی و سپس فشردن ENTER.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> نکته
>
> شما باید هرگونه ویژگی رویدادی که در کامپوننتان استفاه می‌کنید (مانند keyCode, which, etc...) را فراهم کنید چرا که ری‌اکت هیچ یک از ان‌ها را برای شما ایجاد نمی‌کند.

* * *
