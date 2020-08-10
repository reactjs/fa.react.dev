---
id: test-renderer
title: Test Renderer
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**ایمپورت**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 with npm
```

## بررسی اجمالی {#overview}

این پکیج یک رندر کننده ری‌اکت (renderer) را ارایه می‌کند که می‌توان از آن برای رندر کامپوننت‌های ری‌اکت به یک آبجکت جاوااسکریپت خالص، بدون وابستگی به DOM یا محیط native موبایل استفاده کرد. 

اساسا، این پکیج گرفتن یک اسنپ‌شات از سلسله مراتب پلفترم(مشابه درخت DOM) رندر شده توسط یک DOM ری‌اکت یا کامپوننت ری‌اکت نیتیو را بدون استفاده از مرورگر یا [jsdom](https://github.com/tmpvar/jsdom) آسان می‌کند.

مثال: 

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

شما می‌توانید از قابلیت تست اسنپ‌شات Jest برای ذخیره خودکار یک کپی از درخت JSON در یک فایل استفاده کنید و در تست‌هایتان بررسی کنید که تغییری نکرده باشد: [بیشتر در این مورد یاد بگیرید](https://jestjs.io/docs/en/snapshot-testing).

شما همچنین می‌توانید خروجی را جهت یافتن نودهای خاص پیموده و در مورد آن‌ها تست بسازید.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### نمونه TestRenderer {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## مرجع {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

یک نمونه `TestRenderer` همراه با پاس دادن یک المنت ری‌اکت بسازید. این از DOM واقعی استفاده نمی‌کند، اما همچنان درخت کامپوننت را در حافظه به طور کامل رندر می‌کند و شما می‌توانید در مورد آن تست بنویسید. یک [نمونه TestRenderer](#testrenderer-instance) باز می‌گرداند.

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

مانند [[متد] کمکی `act()` از `react-dom/test-utils`](/docs/test-utils.html#act)، `TestRenderer.act` هم یک کامپوننت برای تست‌ها (assertions) آماده می‌کند. از این ورژن `act()` برای دربر گرفتن فراخوانی‌ها به `TestRenderer.create` و `testRenderer.update` استفاده کنید.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
  root.update(<App value={2}/>);
})

// make assertions on root 
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

یک آبجکت که درخت رندر شده را نشان می‌دهد برمی‌گرداند. این درخت تنها نودهای خاص پلفترم مانند `<div>` یا `<View>` و props آن‌ها را شامل می‌شود، اما شامل هیچ کامپوننتی که نوشته کاربر باشد نیست. این برای [تست اسنپ‌شات](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) مفید است.

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

یک آبجکت که درخت رندر شده را نمایش می‌دهند برمی‌گرداند. نمایش بسیار جزئی‌تر از چیزی که `toJSON()` فراهم می‌کند است و شامل کامپوننت‌های نوشته شده توسط کاربر نیز می‌شود. شما احتمالا به این متد نیازی ندارید مگر اینکه کتابخانه تست خودتان را روی test renderer بنویسید.

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

درخت درون حافظه را با یک المنت root جدید دوباره رندر می‌کند. این یک به‌روزرسانی ری‌اکت در root را شبیه‌سازی می‌کند. اگر المنت جدید نوع و کلید یکسان با المنت قبلی داشت، درخت به‌روز خواهد شد. در غیراینصورت، دوباره یک درخت جدید ایجاد خواهد کرد.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

درخت درون حافظه را با اجرای رویدایدهای چرخه‌حیات مناسب نابود خواهد کرد.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

نمونه متناظر با المنت root را برمی‌گرداند. اگر المنت root یک کامپوننت تابعی باشد کار نمی‌کند چرا که آن‌ها نمونه ندارند.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

root آبجکت "test instance" که برای ایجاد تست‌ها در مورد نودهای خاص در درخت کاربردی است را برمی‌گرداند. شما می‌توانید برای پیدا کردن یک "test instances" دیگر در عمق‌های پایین‌تر از آن استفاده کنید.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

یک فرزند از نمونه‌های تست که `test(testInstance)` آن `true` برمی‌گرداند را پیدا می‌کند. اگر `test(testInstance)`، مقدار `true` را دقیقا برای یک نمونه تست برنگرداند، یک خطا رخ می‌دهد.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

یک فرزند از نمونه تست با `type` مد نظر را پیدا می‌کند. اگر دقیقا یک نمونه تست با `type` مد نظر موجود نباشد، یک خطا رخ می‌دهد.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

یک فرزند از نمونه تست با `props` مد نظر را پیدا می‌کند. اگر دقیقا یک نمونه تست با `props` مد نظر موجود نباشد، یک خطا رخ می‌دهد.


### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

تمامی فرزندان نمونه‌های تست که `test(testInstance)`، مقدار `true` برمی‌گرداند را پیدا می‌کند.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

تمامی فرزندان نمونه‌های تست با `type` مد نظر را پیدا می‌کند.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

تمامی فرزندان نمونه‌های تست با `props` مد نظر را پیدا می‌کند.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

نمونه کامپوننت متناظر با این نمونه تست است. تنها برای کامپوننت‌های کلاسی در دسترس است، چرا که کامپوننت‌های تابعی نمونه ندارند. این مقدار `this` درون کامپوننت داده شده را تطبیق می‌دهد.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

نوع کامپوننت متناظر با این نمونه تست است. برای مثال، یک کامپوننت `<Button />`، نوع `Button` دارد.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

props متناظر با این نمونه تست است. برای مثال، یک کامپوننت `<Button size="small" />`، `{size: 'small'}` را به عنوان props دارد.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

نمونه تست والد این نمونه تست است.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

نمونه تست فرزند این نمونه تست است.

## ایده‌ها {#ideas}

شما می‌توانید تابع `createNodeMock` را به عنوان یک ویزگی اختیاری به `TestRenderer.create` پاس دهید که اجازه ساخت mock refs شخصی‌سازی شده را می‌دهد.
`createNodeMock` المنت کنونی را می‌پذیر و باید یک آبجکت mock ref برگرداند.
این زمانی که یک کامپوننت که به refs متکی است را تست می‌کنید، کاربرد دارد.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```
