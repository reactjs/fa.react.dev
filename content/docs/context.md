---
id: context
title: Context
permalink: docs/context.html
---

Context راهی را برای انتقال داده در درخت کامپوننت بدون نیاز به انتقال دستیه props به تمام سطح های پایینی فراهم می‌کند.

<<<<<<< HEAD
در یک اپلیکیشن معمولی ری‌اکت, داده از طریق props از بالا به پایین (والدین به فرزند) منتقل می‌شود, اما این کار برای انواع خاصی از props ها (برای مثال: locale preference, تم رابط کاربری) که مورد نیاز بسیاری از کامپوننت ها در یک اپلیکیشن است می‌تواند سنگین باشد. Context راهی را برای به اشتراک گذاری مقادیری مانند این بین کامپوننت‌ها بدون نیاز به انتقال prop صریحا‍ً‌ از هر سطح درخت فراهم می‌کند.
=======
In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.
>>>>>>> adfa67ad01b7e4c6114921cdf12e9e4cf1a1c786

- [چه موقع  باید از Context استفاده کرد](#when-to-use-context)
- [قبل از اینکه از Context استفاده کنید](#before-you-use-context)
- [API](#api)
  - [React.createContext](#reactcreatecontext)
  - [Context.Provider](#contextprovider)
  - [Class.contextType](#classcontexttype)
  - [Context.Consumer](#contextconsumer)
  - [Context.displayName](#contextdisplayname)
- [مثال ها](#examples)
  - [Context پویا](#dynamic-context)
  - [به‌روز‌رسانی Context از یک کامپوننت تودرتو](#updating-context-from-a-nested-component)
  - [مصرف چندین Context](#consuming-multiple-contexts)
- [هشدارها](#caveats)
- [API موروثی](#legacy-api)

## چه موقع  باید از Context استفاده کرد {#when-to-use-context}

Context برای به اشتراک گذاری داده ای طراحی شده است که می‌تواند برای درختی از ری‌اکت کامپوننت ها عمومی تلقی شود٬ مانند کاربر تایید شده‌ی فعلی٬ زمینه٬ یا زبان ترجیحی. برای مثال٬ ما در کد زیر یک prop به نام "theme" را به صورت دستی برای style دادن به کامپوننت Button انتقال می‌دهیم:

`embed:context/motivation-problem.js`

با استفاده از context, می‌توانیم از انتقال props از بین المنت‌های میانی دوری کنیم:

`embed:context/motivation-solution.js`

## قبل از اینکه از Context استفاده کنید {#before-you-use-context}

 در درجه اول Context زمانی استفاده می‌شود که برخی از داده‌ها باید توسط *بسیاری* از کامپوننت‌ها در سطح‌های مختلف تودرتویی در دسترس قرار بگیرند. از آنجایی که استفاده مجدد کامپوننت را سخت‌تر می‌کند٬ از آن کم استفاده کنید.

**اگر فقط می‌خواهید که از انتقال برخی از داده‌ها بین بسیاری از سطح‌ها اجتناب کنید, اغلب [composition کامپوننت](/docs/composition-vs-inheritance.html) راه‌حلی ساده‌تر از context می‌باشد.**

برای مثال٬ یک کامپوننت به نام `Page` را در نظر بگیرید که یک prop به نام `user` و `avatarSize` را چندین سطح به پایین منتقل می‌کند به طوری که کامپوننت‌های عمیقا تودرتو شده‌ی `Link` و `Avatar` بتوانند آن را بخوانند: 

```js
<Page user={user} avatarSize={avatarSize} />
// ... که رندر می‌کند ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... که رندر می‌کند ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... که رندر می‌کند ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

انتقال propهای `user` و `avatarSize` به پایین از بین بسیاری از سطح‌ها ممکن است زائد به نظر بیاید اگر در نهایت فقط کامپوننت `Avatar` است که به آن نیاز دارد. این نیز آزاردهنده است که هر زمانی که کامپوننت `Avatar` به تعداد بیشتری props از بالا احتیاج داشته باشد٬ شما باید آن‌ها را در تمامی سطح‌های میانی هم اضافه کنید.

یک راه حل برای این مسئله **بدون context** این است که [خود کامپوننت `Avatar` را به پایین انتقال دهیم](/docs/composition-vs-inheritance.html#containment) به طوری که کامپوننت‌های میانی نیازی به دانستن درمورد propهای `user` یا `avatar` نداشته باشند:

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// اکنون, داریم:
<Page user={user} avatarSize={avatarSize} />
// ... که رندر می‌کند ...
<PageLayout userLink={...} />
// ... که رندر می‌کند ...
<NavigationBar userLink={...} />
// ... که رندر می‌کند ...
{props.userLink}
```

با این تغییر٬ فقط بالاترین کامپوننت یعنی Page باید در مورد استفاده `user` و ‍`avatarsize` توسط کامپوننت‌های `Link` و `Avatar` بداند.

<<<<<<< HEAD
این *وارونگی کنترل* در بسیاری از موارد می‌تواند کد شما را از طریق کاهش تعداد propهایی که باید در اپلیکیشن خود انتقال دهید تمیزتر کند و کنترل بیشتری به کامپوننت‌های پایه می‌دهد.
با این حال٬ این کار در هر موردی تصمیم درست نیست: انتقال پیچیدگی بیشتر به بالا در درخت باعث پیچیده‌تر شدن کامپوننت‌های سطح-بالا می‌شود و ممکن است کامپوننت‌های سطح-پایین را مجبور به انعطاف‌پذیری بیشتر از آنچه که می‌خواهید کند.
=======
This *inversion of control* can make your code cleaner in many cases by reducing the amount of props you need to pass through your application and giving more control to the root components. Such inversion, however, isn't the right choice in every case; moving more complexity higher in the tree makes those higher-level components more complicated and forces the lower-level components to be more flexible than you may want.
>>>>>>> adfa67ad01b7e4c6114921cdf12e9e4cf1a1c786

شما برای یک کامپوننت محدود به یک فرزند نیستید. شما می‌توانید چندین فرزند٬ یا حتی چندین "slots" جداگانه برای فرزندان٬ [همانطور که در اینجا مستند شده است
](/docs/composition-vs-inheritance.html#containment)انتقال دهید:

```js
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

این الگو در بسیاری از مواردی که باید یک فرزند را از والدین نزدیک آن جدا کرد کافی است. در صورتی که فرزند قبل از رندر شدن نیاز به برقراری ارتباط با والدین را داشته باشد٬ شما می‌توانید این قضیه را با [render-props](/docs/render-props.html) ادامه دهید.

با این حال٬ گاهی‌اوقات یک داده‌ی یکسان باید توسط کامپوننت‌های زیادی در درخت٬ و سطح‌های تودرتوی مختلفی در دسترس قرار گیرد. Context اجازه پخش کردن همچین داده‌ای٬ و اجازه تغییر آن به تمام کامپوننت‌های زیرین را به شما می‌دهد. مثال‌های رایجی که استفاده از context در آن‌ها ممکن است آسان‌تر از راه‌های جایگزین آن باشد شامل مدیریت locale فعلی٬ زمینه, یا داده حافظه نهان می‌باشد.

## API {#api}

### `React.createContext` {#reactcreatecontext}

```js
const MyContext = React.createContext(defaultValue);
```

کد بالا یک شیٔ context ایجاد می‌کند. وقتی ری‌اکت یک کامپوننتی را رندر می‌کند که به این شیء context ارجاع می‌کند (subscribes)٬ مقدار context  حاضر را از نزدیکترین `Provider` مرتبط بالایی در درخت خواهد خواند.

<<<<<<< HEAD
آرگومان `defaultValue` **فقط** زمانی استفاده می‌شود که یک کامپوننت در بالاتر از خود در درخت یک Provider مطابق نداشته باشد. این مورد می‌تواند برای تست کردن کامپوننت‌ها در انزوا بدون wrap کردن آن‌ها مفید باشد. توجه داشته باشید: انتقال `undefined` به عنوان مقدار Provider باعث نمی‌شود که کامپوننت‌هایی که از آن استفاده می‌کنند از `defaultValue` استفاده کنند.
=======
The `defaultValue` argument is **only** used when a component does not have a matching Provider above it in the tree. This default value can be helpful for testing components in isolation without wrapping them. Note: passing `undefined` as a Provider value does not cause consuming components to use `defaultValue`.
>>>>>>> adfa67ad01b7e4c6114921cdf12e9e4cf1a1c786

### `Context.Provider` {#contextprovider}

```js
<MyContext.Provider value={/* یک مقداری */}>
```

هر شئ context ای با یک کامپوننت ری‌اکتی Provider همراه می‌شود که به کامپوننت‌های مصرف‌کننده آن این اجازه را می‌دهد که تغییرات context را به اشتراک بگذارند.

کامپوننت Provider یک prop به نام `value` را می‌پذیرد که به کامپوننت‌های مصرف‌کننده آن که نوادگان این Provider می‌باشند٬ انتقال یابد. Provider می‌تواند به چندین مصرف‌کننده متصل شود. Providerها می‌توانند به شکلی تودرتو شوند تا valueهایی را که در عمق درخت وجود دارند باطل کنند.. 

هرزمانی که prop ‍‍‍‍`value` مربوط به Provider تغییر کند تمام مصرف‌کننده‌هایی که نوادگان یک Provider هستند دوباره رندر می‌شوند. Propagation از Provider تا نوادگان مصرف‌کننده آن (شامل [`.contextType`](#classcontexttype) و [`useContext`](/docs/hooks-reference.html#usecontext)) مشمول متد `shouldComponentUpdate` نیستند٬ بنابراین حتی زمانی که جد کامپوننت یک به‌ روز‌رسانی را رد می‌کند٬ مصرف‌کننده آن به روزرسانی می‌شود.

تغییرات بوسیله مقایسه value های جدید و قدیم با استفاده از همان الگوریتم [`Object.is`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) مشخص می‌شوند.

> یادداشت
>
>نحوه تعیین تغییرات هنگام انتقال اشیاء به عنوان `value` می‌تواند مشکل‌ساز شود: [هشدارها](#caveats) را ببینید.

### `Class.contextType` {#classcontexttype}

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* با استفاده از مقدار MyContext یک اثرجانبی هنگام mount ایجاد کنید */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* چیزی را بر اساس مقدار MyContext رندر کنید */
  }
}
MyClass.contextType = MyContext;
```

<<<<<<< HEAD
یک شیئ Context که با [`React.createContext()`](#reactcreatecontext) ایجاد شده است می‌تواند به ویژگی `contextType` در یک کلاس اختصاص یابد. این کار به شما اجازه می‌دهد که از نزدیک‌ترین مقدار فعلی `contextType` با استفاده از `this.context` استفاده کنید. شما می‌توانید از این قضیه در تمام متدهای چرخه‌حیات از جمله تابع رندر استفاده کنید.
=======
The `contextType` property on a class can be assigned a Context object created by [`React.createContext()`](#reactcreatecontext). Using this property lets you consume the nearest current value of that Context type using `this.context`. You can reference this in any of the lifecycle methods including the render function.
>>>>>>> adfa67ad01b7e4c6114921cdf12e9e4cf1a1c786

> یادداشت:
>
> شما با استفاده از این API فقط می توانید در یک context واحد مشترک شوید. در صورت نیاز به خواندن بیش از یک مورد ، به [مصرف چندین Context](#consuming-multiple-contexts) مراجعه کنید .
>
> اگر از [syntax تجربی فیلدهای کلاس عمومی](https://babeljs.io/docs/plugins/transform-class-properties/) استفاده می کنید٬ می توانید از یک فیلد کلاس **استاتیک** برای مقداردهی اولیه `contextType` خود استفاده کنید.


```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* چیزی را بر اساس مقدار آن رندر کنید */
  }
}
```

### `Context.Consumer` {#contextconsumer}

```js
<MyContext.Consumer>
  {value => /* چیزی را بر اساس مقدار context رندر کنید */}
</MyContext.Consumer>
```

<<<<<<< HEAD
یک کامپوننت ری‌اکت که تغییرات context را به اشتراک می‌گذارد. این کار به شما اجازه می‌دهد که یک context را داخل [کامپوننت تابع](/docs/components-and-props.html#function-and-class-components) به اشتراک بگذارید.
=======
A React component that subscribes to context changes. Using this component lets you subscribe to a context within a [function component](/docs/components-and-props.html#function-and-class-components).
>>>>>>> adfa67ad01b7e4c6114921cdf12e9e4cf1a1c786

نیاز به یک [کامپوننت به عنوان فرزند](/docs/render-props.html#using-props-other-than-render) دارد. این تابع مقدار context فعلی را دریافت می‌کند و یک نود ری‌اکت برمی‌گرداند. آرگومان `value` ای که به تابع داده شده است با prop `value` نزدیک‌ترین Provider بالاتر از آن در درخت برای این context برابر خواهد بود. اگر در بالاتر هیچ Provider ای برای این context وجود نداشت٬ آرگومان `value` با `defaultValue` ای که به `createContext()` داده شد٬ برابر خواهد بود.

> یادداشت
>
> برای اطلاعات بیشتر در مورد الگوی 'تابع به عنوان فرزند'٬ [render props](/docs/render-props.html) را ببینید.

### `Context.displayName` {#contextdisplayname}

شیئ context یک ویژگی از نوع رشته با نام `displayName` می‌پذیرد. DevTools ری‌اکت از این رشته استفاده می‌کند تا مشخص کند که چه چیزی را برای عنوان context نمایش دهد.

به عنوان مثال٬ کامپوننت زیر در DevTools به صورت MyDisplayName ظاهر می‌شود:

```js{2}
const MyContext = React.createContext(/* یک مقداری */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```

## مثال ها {#examples}

### Context پویا {#dynamic-context}

یک مثال پیچیده‌تر با مقادیر پویا برای theme:

**theme-context.js**
`embed:context/theme-detailed-theme-context.js`

**themed-button.js**
`embed:context/theme-detailed-themed-button.js`

**app.js**
`embed:context/theme-detailed-app.js`

### به‌روز‌رسانی Context از یک کامپوننت تودرتو {#updating-context-from-a-nested-component}

اغلب به روزرسانی context از کامپوننت‌ای که در جایی عمیق در درخت واقع شده لازم است. در این مورد شما می‌توانید یک تابع را از طریق context به پایین منتقل کنید تا به مصرف‌کنندگان آن اجازه به روزرسانی context را بدهید: 

**theme-context.js**
`embed:context/updating-nested-context-context.js`

**theme-toggler-button.js**
`embed:context/updating-nested-context-theme-toggler-button.js`

**app.js**
`embed:context/updating-nested-context-app.js`

### مصرف چندین context {#consuming-multiple-contexts}

برای این‌که رندرشدن های مجدد را سریع نگه داریم٬ ری‌اکت باید هر مصرف‌کننده context را به یک نود جداگانه در درخت تبدیل کند.

`embed:context/multiple-contexts.js`

اگر دو یا چند مقدار از context زیاد با هم استفاده شدند، بهتر است در نظر داشته باشید که کامپوننت render propای خودتان ایجاد کنید که شامل هر دوی آنها شود.

## هشدارها {#caveats}

به دلیل این‌که context از هویت مرجع برای مشخص کردن این‌که چه زمانی باید رندر دوباره صورت بگیرد استفاده می‌کند٬ به دلیل برخی خطاها ممکن است هنگامی که والدین Provider دوباره رندر می‌شوند٬ در مصرف‌کنندگان آن  موجب رندر ناخواسته شود. برای مثال٬ هر زمانی که Provider دوباره به خاطر ایجاد یک شیئ جدید  که همیشه برای `value` ایجاد می‌شود٬ رندر می‌شود کد زیر تمام مصرف‌کنندگان را دوباره رندر می‌کند:

`embed:context/reference-caveats-problem.js`


برای پی بردن به این موضوع٬ مقدار را به state والدین ببرید:

`embed:context/reference-caveats-solution.js`

## API موروثی {#legacy-api}

> یادداشت
>
> ری‌اکت قبلا با یک API context آزمایشی منتشر شد. API قدیمی در تمام نسخه های ۱۶.x پشتیبانی خواهد شد٬ اما اپلیکیشن‌هایی که از آن استفاده می‌کنند باید به نسخه جدید ارتقاء دهند. API موروثی در نسخه اصلی React در آینده حذف می شود. [اسناد context موروثی را اینجا](/docs/legacy-context.html) بخوانید.
