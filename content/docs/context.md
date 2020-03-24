---
id: context
title: Context
permalink: docs/context.html
---

Context راهی را برای انتقال داده از بین درخت کامپوننت بدون نیاز به انتقال دستیه props به پایین در هر سطح فراهم می‌کند.

در یک اپلیکیشن معمول ری‌اکت, داده از طریق props از بالا به پایین (والدین به فرزند) منتقل می‌شود, اما این کار برای انواع خاصی از props ها (برای مثال: locale preference, تم رابط کاربری) که مورد نیاز بسیاری از کامپوننت ها در یک اپلیکیشن است می‌تواند سنگین باشد. Context راهی را برای به اشتراک گذاری مقادیری مانند این بدون نیاز به انتقال prop به صورت صریح از طریق هر سطح درخت فراهم می‌کند.

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

Context برای به اشتراک گذاری داده ای طراحی شده است که می‌تواند برای یک درخت از ری‌اکت کامپوننت ها به صورت عمومی در نظر گرفته شود٬ مانند کاربر تایید شده‌ی فعلی٬ زمینه٬ یا زبان ترجیحی. برای مثال٬ در کد زیر ما یک prop به نام "theme" را به صورت دستی برای style دادن کامپوننت Button انتقال می‌دهیم:

`embed:context/motivation-problem.js`

با استفاده از context, ما می‌توانیم از انتقال props بین المنت‌های میانی اجتناب کنیم:

`embed:context/motivation-solution.js`

## قبل از اینکه از Context استفاده کنید {#before-you-use-context}

Context در درجه اول زمانی استفاده می‌شود که برخی از داده‌ها باید توسط *بسیاری* از کامپوننت‌ها در سطح‌های مختلف تودرتویی در دسترس قرار بگیرند. از آن کم استفاده کنید چرا که استفاده مجدد کامپوننت را سخت‌تر می‌کند.

**اگر فقط می‌خواهید که از انتقال برخی از داده‌ها از بین بسیاری از سطح‌ها اجتناب کنید, [ترکیب‌بندی کامپوننت](/docs/composition-vs-inheritance.html) اغلب راه‌حلی ساده‌تر از context می‌باشد.**

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

انتقال propsهای `user` و `avatarSize` به پایین از بین بسیاری از سطح‌ها ممکن است زائد به نظر بیاید اگر در نهایت فقط کامپوننت `Avatar` است که به آن نیاز دارد. این نیز آزاردهنده است که هر زمانی که کامپوننت `Avatar` به تعداد بیشتری props از بالا احتیاج داشته باشد٬ شما باید آن‌ها را در تمامی سطح‌های میانی هم اضافه کنید.

یک راه حل برای این مسئله **بدون context** این است که [خود کامپوننت `Avatar` را به پایین انتقال دهیم](/docs/composition-vs-inheritance.html#containment) به طوری که کامپوننت‌های میانی نیازی به دانستن درمورد propsهای `user` یا `avatar` نداشته باشند:

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

این *وارونگی کنترل* در بسیاری از موارد می‌تواند کد شما را از طریق کاهش تعداد propsهایی که باید در اپلیکیشن خود انتقال دهید تمیزتر کند و کنترل بیشتری به کامپوننت‌های پایه می‌دهد.
با این حال٬ این کار در هر موردی تصمیم درست نیست: انتقال پیچیدگی بیشتر به بالا در درخت باعث پیچیده‌تر شدن کامپوننت‌های سطح-بالا می‌شود و ممکن است کامپوننت‌های سطح-پایین را مجبور کند انعطاف‌پذیرتر از آنچه که می‌خواهید شوند.

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

این الگو در بسیاری از مواردی که باید یک فرزند را از والدین نزدیک آن جدا کرد کافی است. در صورتی که فرزند نیاز به برقراری ارتباط با والدین قبل از رندر شدن را داشته باشد٬ شما می‌توانید این قضیه را با [رندر کردن propsها](/docs/render-props.html) ادامه دهید.

با این حال٬ گاهی‌اوقات یک داده‌ی یکسان باید توسط کامپوننت‌های زیادی در درخت٬ و سطح‌های تودرتوی مختلفی در دسترس قرار گیرد. Context اجازه پخش کردن همچین داده‌ای٬ و اجازه تغییر آن به تمام کامپوننت‌های زیرین را به شما می‌دهد. مثال‌های رایجی که استفاده از context ممکن است آسان‌تر از راه‌های جایگزین آن باشد شامل مدیریت locale فعلی٬ theme, یا داده حافظه نهان می‌باشد.

## API {#api}

### `React.createContext` {#reactcreatecontext}

```js
const MyContext = React.createContext(defaultValue);
```

کد بالا یک شیٔ context ایجاد می‌کند. وقتی ری‌اکت یک کامپوننتی را رندر می‌کند که به این شیء context subscribe می‌کند مقدار context فعلی را از نزدیک‌ترین `Provider` مطابق بالاتر از خود در درخت می‌خواند.

آرگومان `defaultValue` **فقط** زمانی استفاده می‌شود که یک کامپوننت در بالاتر از خود در درخت یک Provider مطابق نداشته باشد. این مورد می‌تواند برای تست کردن کامپوننت‌ها در انزوا بدون wrap کردن آن‌ها مفید باشد. توجه داشته باشید: انتقال `undefined` به عنوان مقدار Provider باعث نمی‌شود که کامپوننت‌های فرض شده از `defaultValue` استفاده کنند.

### `Context.Provider` {#contextprovider}

```js
<MyContext.Provider value={/* some value */}>
```

هر شئ context ای با یک کامپوننت ری‌اکتی Provider همراه می‌شود که به کامپوننت‌های مصرف‌کننده آن این اجازه را می‌دهد که تغییرات context را به اشتراک بگذارند.

یک prop به نام `value` را می‌پذیرد که به کامپوننت‌های مصرف‌کننده آن که نوادگان این Provider می‌باشند٬ انتقال یابد. یک Provider می‌تواند به چندین مصرف‌کننده متصل شود. Providerها می‌توانند به شکلی تودرتو شوند که valueها را در عمق درخت باطل کنند. 

هرزمانی که prop ‍‍‍‍`value` مربوط به Provider تغییر کند تمام مصرف‌کننده‌هایی که نوادگان یک Provider هستند دوباره رندر می‌شوند. Propagation از Provider تا نوادگان مصرف‌کننده آن (شامل [`.contextType`](#classcontexttype) و [`useContext`](/docs/hooks-reference.html#usecontext)) مشمول متد `shouldComponentUpdate` نیستند٬ بنابراین مصرف‌کننده آن حتی زمانی که جد کامپوننت یک به‌ روز‌رسانی را رد می‌کند٬ به روزرسانی می‌شود.

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

یک شیئ Context که با [`React.createContext()`](#reactcreatecontext) ایجاد شده است می‌تواند به ویژگی `contextType` در یک کلاس اختصاص یابد. این کار به شما اجازه می‌دهد که از نزدیک‌ترین مقدار `contextType` با استفاده از `this.context` استفاده کنید. شما می‌توانید به این قضیه در تمام متدهای چرخه‌حیات از جمله تابع رندر رجوع کنید.

> یادداشت:
>
> شما فقط می توانید با استفاده از این API در یک context واحد مشترک شوید. در صورت نیاز به خواندن بیش از یک مورد ، به [مصرف چندین Context](#consuming-multiple-contexts) مراجعه کنید .
>
> اگر از [syntax تجربی فیلدهای کلاس عمومی](https://babeljs.io/docs/plugins/transform-class-properties/) استفاده می کنید٬ می توانید از یک فیلد کلاس **استاتیک** استفاده کنید تا `contextType` خود را مقداردهی اولیه کنید.


```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* چیزی را بر اساس مقدار رندر کنید */
  }
}
```

### `Context.Consumer` {#contextconsumer}

```js
<MyContext.Consumer>
  {value => /* چیزی را بر اساس مقدار context رندر کنید */}
</MyContext.Consumer>
```

یک کامپوننت ری‌اکت که تغییرات context را به اشتراک می‌گذارد. این کار به شما اجازه می‌دهد که یک context را داخل [کامپوننت تابع](/docs/components-and-props.html#function-and-class-components) به اشتراک بگذارید.

نیاز به یک [کامپوننت به عنوان فرزند](/docs/render-props.html#using-props-other-than-render) دارد. تابع مقدار context فعلی را دریافت می‌کند و یک نود ری‌اکت برمی‌گرداند. آرگومان `value` ای که به تابع منتقل شده است با prop `value` نزدیک‌ترین Provider بالاتر در درخت برای این context برابر خواهد بود. اگر بالاتر هیچ Provider ای برای این context وجود نداشت٬ آرگومان `value` با `defaultValue` ای که به `createContext()` منتقل شد٬ برابر خواهد بود.

> یادداشت
>
> برای اطلاعات بیشتر در مورد الگوی 'تابع به عنوان فرزند'٬ [رندر کردن props ها](/docs/render-props.html) را ببینید.

### `Context.displayName` {#contextdisplayname}

شیئ context یک ویژگی از نوع رشته با نام `displayName` می‌پذیرد. DevTools ری‌اکت از این رشته استفاده می‌کند تا مشخص کند که چه چیزی را برای context نمایش دهد.

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

اغلب به روزرسانی context از کامپوننت‌ای که در جایی عمیق در کامپوننت درخت واقع شده لازم است. در این مورد شما می‌توانید یک تابع را از طریق context به پایین منتقل کنید تا به مصرف‌کنندگان اجازه به روزرسانی context را بدهید: 

**theme-context.js**
`embed:context/updating-nested-context-context.js`

**theme-toggler-button.js**
`embed:context/updating-nested-context-theme-toggler-button.js`

**app.js**
`embed:context/updating-nested-context-app.js`

### مصرف چندین context {#consuming-multiple-contexts}

برای این‌که رندر دوباره را سریع نگه داریم٬ ری‌اکت باید هر مصرف‌کننده context را به یک نود جداگانه در درخت تبدیل کند.

`embed:context/multiple-contexts.js`

اگر اغلب دو یا چندین مقادیر context باهم استفاده می‌شوند٬ بهتر است که ساختن یک کامپوننت رندر prop که هر دوی آن‌ها را فراهم می‌کند را در نظر بگیرید.

## هشدارها {#caveats}

به دلیل این‌که context از هویت مرجع برای مشخص کردن این‌که چه زمانی باید رندر دوباره صورت بگیرد استفاده می‌کند٬ به دلیل برخی خطاها ممکن است هنگامی که والدین Provider دوباره رندر می‌شوند در مصرف‌کنندگان آن رندر ناخواسته ایجاد کند. برای مثال٬ هر زمانی که Provider دوباره به خاطر ایجاد یک شیئ جدید  که همیشه برای `value` ایجاد می‌شود٬ رندر می‌شود کد زیر تمام مصرف‌کنندگان را دوباره رندر می‌کند:

`embed:context/reference-caveats-problem.js`


برای پی بردن به این موضوع٬ مقدار را به state والدین ببرید:
To get around this, lift the value into the parent's state:

`embed:context/reference-caveats-solution.js`

## API موروثی {#legacy-api}

> یادداشت
>
> ری‌اکت قبلا با یک API context آزمایشی منتشر شد. API قدیمی در تمام نسخه های ۱۶.x پشتیبانی خواهد شد٬ اما اپلیکیشن‌هایی که از آن استفاده می‌کنند باید به نسخه جدید migrate کنند. API موروثی در نسخه اصلی React در آینده حذف می شود. [اسناد context موروثی را اینجا](/docs/legacy-context.html) بخوانید.

