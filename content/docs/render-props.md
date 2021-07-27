---
id: render-props
title: رندر props
permalink: docs/render-props.html
---

اصطلاح ["رندر prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) به تکنیکی برای به اشتراک گذاری کد بین اجزای ری اکت با استفاده از یک prop که مقدار آن یک تابع است اشاره دارد.

یک کامپوننت با رندر prop تابعی را می گیرد که یک عنصر ری اکت را برمی گرداند و به جای اجرای منطق رندر خود، آن را فراخوانی می کند.

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

کتابخانه هایی که از رندر استفاده می کنند شامل [React Router](https://reacttraining.com/react-router/web/api/Route/render-func)، [Downshift](https://github.com/paypal/downshift) و [Formik](https://github.com/jaredpalmer/formik) هستند.

در این سند، ما در مورد چرایی مفید بودن رندر propها و نحوه نوشتن آن توسط خودتان توضیح خواهیم داد.

## از رندر برای دغدغه های مقطعی استفاده کنید {#use-render-props-for-cross-cutting-concerns}

کامپوننت ها واحد اصلی استفاده مجدد کد در ری اکت هستند، اما همیشه نحوه به اشتراک گذاشتن حالت یا رفتاری که یک کامپوننت در سایر کامپوننت هایی که به همان حالت مشابه نیاز دارند، کاملاً مشخص نیست.

به عنوان مثال ، کامپوننت زیر موقعیت موس را در یک برنامه وب ردیابی می کند:

```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

همانطور که مکان نما به اطراف صفحه حرکت می کند، کامپوننت مختصات (x، y) خود را در `<p>` نمایش می دهد.

حال سوال این است: چگونه می توانیم از این رفتار در کامپوننت دیگری استفاده مجدد کنیم؟ به عبارت دیگر، اگر کامپوننت دیگری نیاز به دانستن موقعیت مکان نما دارد، آیا می توانیم آن رفتار را کپسوله کنیم تا بتوانیم به راحتی آن را با آن کامپوننت به اشتراک بگذاریم؟

از آنجایی که کامپوننت ها واحد اصلی استفاده مجدد کد در ری اکت هستند، بیایید سعی کنیم کمی کد را مجدداً ویرایش کنیم تا از کامپوننت `<Mouse>` که رفتاری را که ما برای استفاده مجدد در جاهای دیگر نیاز داریم در خود جای دهد.

```js
// ... شامل رفتار مورد نظر ما است <Mouse> کامپوننت 
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/* رندر کنیم؟ <p> اما چگونه چیزی غیر از... */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <>
        <h1>Move the mouse around!</h1>
        <Mouse />
      </>
    );
  }
}
```

اکنون کامپوننت `<Mouse>` تمام رفتارهای مرتبط با گوش دادن به رویدادهای `mousemove` و ذخیره موقعیت (x، y) مکان نما را دربرمی گیرد، اما هنوز بطور کامل قابل استفاده مجدد نیست.

به عنوان مثال ، فرض کنید ما یک کامپوننت `<Cat>` داریم که تصویر یک گربه را که در حال تعقیب موش است، رندر می کند. ما می توانیم از یک `<Cat mouse = {{x، y}}>` استفاده کنیم تا مختصات موش را به مولفه بگوییم تا بداند که کجا تصویر را روی صفحه قرار دهد.

به عنوان اولین پاس، ممکن است سعی کنید `<Cat>` را در داخل `<Mouse>` رندر کنید، مانند زیر:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          در اینجا عوض کنیم ... اما بعد <Cat> را برای <p> ما فقط می توانیم 
          جداگانه ایجاد کنیم <MouseWithSomethingElse> باید یک کامپوننت 
          <MouseWithCat> تا هر زمان که لازم است از آن استفاده کنیم، بنابراین
          هنوز قابل استفاده مجدد نیست
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```

این روش برای موارد خاص مفید خواهد بود، اما ما به هدف کپسوله کردن واقعی رفتار به روشی که قابل استفاده مجدد باشد نرسیده ایم. اکنون، هر زمان که مکان نما را برای استفاده متفاوت دیگر می خواهیم، باید یک کامپوننت جدید ایجاد کنیم (به عبارتی اساساً `<MouseWithCat>` دیگری) تا چیزی را که برای آن مورد استفاده لازم داریم، ارائه دهد.

اکنون زمانی است که رندر prop وارد می شود: به جای اینکه `<Cat>` را درون یک کامپوننت `<Mouse>` هارد کد کنید و خروجی رندر شده آن را تغییر دهید، می توانیم از `<Mouse>` به عنوان یک تابع prop استفاده کنیم برای اینکه به صورت پویا تعیین کند که چه چیزی در یک رندر prop، رندر شود.

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          ،رندر می کند <Mouse> به جای ارائه ثابت از آنچه
          .استفاده کنید تا به صورت پویا تعیین کند که چه چیزی رندر شود prop از رندر
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

اکنون، به جای کلون کردن کامپوننت `<Mouse>` و هاردکد کردن چیزهای دیگر در متد `رندر` آن برای حل یک مسئله خاص، ما یک `رندر` prop ارائه می دهیم که `<Mouse>` می تواند از آن استفاده کند تا تعیین کنید چه چیزی رندر شود.

به طور دقیق تر، ** رندرprop یک تابع است که از یک کامپوننت برای دانستن اینکه چه چیزی رندر شود استفاده می کند. **

این تکنیک رفتاری را که باید به اشتراک بگذاریم بسیار قابل حمل می کند. برای به دست آوردن چنین رفتاری، یک `<Mouse>` با یک `رندر` prop ارائه دهید که به آن بگوید با جریان (x ، y) مکان نما چه چیزی را رندر کند.

یک نکته جالب توجه در مورد رندر propها این است که شما می توانید بیشتر [کامپوننت های مرتبه بالاتر](/docs/higher-order-components.html) (HOC) را با استفاده از یک کامپوننت معمولی همراه با یک رندر prop اجرا کنید. به عنوان مثال، اگر ترجیح می دهید به جای کامپوننت `<Mouse>` یک `HOC `withMouse داشته باشید، می توانید به راحتی با استفاده از یک `<Mouse>` معمولی با یک رندر prop ایجاد کنید:

```js
// میخواهید، به راحتی می توانید HOC اگر به دلایلی
// یک عدد بسازید،prop با استفاده از یک کامپوننت معمولی همراه با یک رندر 
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```

بنابراین رندر prop امکان استفاده از هر دو الگو را فراهم می کند.

## استفاده از Props غیر از `رندر` {#using-props-other-than-render}

لازم به ذکر است که فقط به این دلیل که الگو "رندر props" نامیده می شود، برای استفاده از این الگو نیازی نیست که از یک prop با نام "رندر" استفاده کنید. در حقیقت، [* هر * prop كه تابعی باشد كه یك کامپوننت از آن برای دانستن آنچه كه باید رندر کند، استفاده می كند، از نظر فنی "رندر prop" است](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

اگرچه مثالهای بالا از `رندر` استفاده می کنند، ما به همین راحتی می توانیم از `children` prop استفاده کنیم!

```js
<Mouse children={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)}/>
```

و به یاد داشته باشید، `children` prop در واقع نیازی به نامگذاری در لیست "ویژگی ها" در عنصر JSX شما ندارد. در عوض، می توانید آن را مستقیماً * درون * عنصر قرار دهید!

```js
<Mouse>
  {mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```
این روش را در API [react-motion](https://github.com/chenglou/react-motion) مشاهده خواهید کرد.

از آنجا که این روش کمی غیرمعمول است، شما احتمالاً می خواهید صراحتا بگویید که هنگام طراحی API مانند این، `children`  باید تابعی در `propTypes` شما باشد.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## هشدارها {#caveats}

### هنگام استفاده از رندر prop با React.PureComponent مراقب باشید {#be-careful-when-using-render-props-with-reactpurecomponent}

اگر عملکردی را در یک متد `رندر` ایجاد کنید، استفاده از یک رندر prop می تواند مزیت حاصل از استفاده [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) را نفی کند. این بدان دلیل است که مقایسه سطحی prop همیشه برای props جدید `false` برمی گرداند و هر `رندر` در این حالت مقدار جدیدی برای پایه رندر ایجاد می کند.

به عنوان مثال ، با بخش `<Mouse>` خود از بالا ادامه می دهیم، اگر `<Mouse>` بجای `React.PureComponent`, `React.Component` را گسترش می داد ، مثال ما اینگونه بود:

```js
class Mouse extends React.PureComponent {
  // ... همان اجرای فوق
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>

        {/*
          prop این بد است! مقدار رندر
          .در هر رندر متفاوت خواهد بود
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

در این مثال، هر بار که `<MouseTracker>` رندر می شود، تابع جدیدی به عنوان مقدار `<Mouse render>` prop ایجاد می کند، بنابراین در وهله اول اثر `<Mouse>` گسترش دهنده `React.PureComponent` را نفی می کند! 

برای حل این مشکل، گاهی اوقات می توانید prop را به عنوان یک متد نمونه تعریف کنید، مانند این موارد:

```js
class MouseTracker extends React.Component {
  // `this.renderTheCat`،به عنوان یک متد نمونه تعریف شده
  // همیشه وقتی از `همان` عملکرد در رندر استفاده می کنیم به همان عملکرد اشاره می کند 
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

در مواردی که شما نمی توانید prop را به صورت ایستا تعریف کنید (به عنوان مثال زیرا شما باید propهای کامپوننت را ببندید و یا حالت خود را تغییر دهید) `<Mouse>` به جای آن باید "React.Component" را گسترش دهد.
