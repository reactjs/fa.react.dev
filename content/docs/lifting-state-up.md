---
id: lifting-state-up
title: انتقال state به بالا
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

اغلب، تغییر یک داده، منجر به واکنش چندین کامپوننت می‌شود. پیشنهاد ما انتقال state مشترک میان آن‌ها به نزدیک‌ترین کامپوننت بالادستی است که آن‌هار در بر دارد. بیایید با هم ببینیم در عمل چگونه کار می‌کند.
در این بخش، ما یک دماسنج می‌سازیم که محاسبه می‌کند در دمای داده شده به آن آب جوش آمده است یا خیر.

ما با کامپوننتی شروع خواهیم کرد که به آن `BoilingVerdict` می‌گویند.
این کامپوننت `celsius` را به عنوان prop دریافت می‌کند و درصورت کافی بودن آن برای به جوش آوردن آب آن را چاپ می‌کند.

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

سپس کامپوننتی به عنوان `Calculator` ایجاد می‌کنیم.
که آن یک `<input>` را رندر می‌کند که به شما اجازه می‌دهد دما را وارد کنید و مقدار آن را در `this.state.temperature` نگهداری کنید.

به علاوه  `BoilingVerdict` را برای مقدار اولیه input رندر می‌کند.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**درCodePen امتحان کنید**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## افزودن input دوم {#adding-a-second-input}

نیاز جدید ما این است که برای ورودی سلیسوس یک مقدار فارنهایت فراهم کنیم. که با هم همگام باشند.

ما می‌توانیم با استخراج کردن کامپوننت `TemperatureInput` از `Calculator` شروع کنیم.
 یک prop جدید به نام `scale` به آن اضافه می‌کنیم که می‌تواند `"c"` یا `"f"` باشد.

```js{1-4,19,22}
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
ما حالا می‌توانیم `Calculator` را در دو دمای مجزا رندر کنیم.

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

ما در حال حاضر دو input داریم که اگر شما در یکی از آنها دما وارد کنید، دیگری آپدیت نمی‌شود.
که با نیاز ما در تناقض است: ما می‌خواهیم با هم همگام باشند.

همچنین نمی‌توانیم `BoilingVerdict` از `Calculator` را نمایش دهیم. 
`Calculator` دمای کنونی را نمی‌داند زیرا در `TemperatureInput` مخفی است.

## نوشتن تابع تبدیل {#writing-conversion-functions}

در ابتدا ما دو تابع می‌نویسیم که دما را از سیلسیوس به فارنهایت و برعکس تبدیل کند:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

این دو تابع اعداد را تبدیل می‌کنند. ما دو تابع خواهیم نوشت که `temperature` از جنس string و تابع تبدیل را به عنوان آرگومان دریافت می‌کند و یک string برمی‌گرداند. ما از آن برای محاسبه مقدار یک input باتوجه به مقدار input دیگر استفاده می‌کنیم.

که این روی مقدار نامعتبر `temperature`، string خالی برمی‌گرداند و خروجی را تا سه رقم اعشار رند می‌کند:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

برای مثال، `tryConvert('abc', toCelsius)`، string خالی برمی‌گرداند و `tryConvert('10.22', toFahrenheit)`، string `'50.396'` را برمی‌گرداند.

## انتقال state به بالا {#lifting-state-up}

در حال حاضر، هر دو کامپوننت `TemperatureInput` به صورت جداگانه مقادیر خود را در state محلی خود نگهداری می‌کنند.

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```
گرچه، می‌خواهیم که این دو input با هم همگام باشند. هنگامی که مقدار input سلیسیوس را به‌روز می‌کنیم، مقدار تبدیل شده فارنهایت نیز باید منعکس شود، و برعکس.

در React ، به اشتراک گذاری state به صورت حرکت دادن آن به نزدیک‌ترین جد کامپوننتی که به آن نیاز دارد است. به این "انتقال state به بالا" گفته می‌شود. ما state محلی `TemperatureInput`را پاک می‌کنیم و به جای آن در `Calculator` می‌بریم.

اگر `Calculator` state به اشتراک گذاشته شده را ازآن خود کند، به "منبع حقیقت" برای هر دو input تبدیل می‌شود. و اینها را برای داشتن مقادیر نامتناقض آگاه می‌کند. از آنجایی که propهای هر دو کامپوننت `TemperatureInput` از کامپوننت پدری یکسان به اسم `Calculator` می‌آیند، هر دو input همیشه با هم همگام هستند.

بیایید قدم به قدم ببینیم که چگونه کار می‌کند.

اول، `this.state.temperature` را با مقدار `this.props.temperature` در کامپوننت `TemperatureInput` جایگزین می‌کنیم. فعلا فرض می‌کنیم که `this.props.temperature` قبلا وجود داشته است، گرچه در آینده باید آن را به `Calculator` انتقال بدهیم:

```js{3}
  render() {
    // قبلا : const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

ما می‌دانیم که [propsها فقط خواندنی هستند](/docs/components-and-props.html#props-are-read-only). هنگامی که `temperature` در state محلی بود، `TemperatureInput` فقط می‌توانست `this.setState()` را برای تغییرش صدا کند. گرچه حالا `temperature` از پدر به عنوان props می‌آید `TemperatureInput` هیچ کنترلی روی آن ندارد.

در React این مسله معمولا با تبدیل کامپوننت به "کنترل شده" حل می‌شود. درست مثل DOM که `<input>` prop، `value` و `onChange` را قبول می‌کند، پس `TemperatureInput` شخصی ما نیز می‌تواند propهای `temperature` و `onTemperatureChange` را از پدر خودش `Calculator` قبول کند. 


حالا، وقتی که `TemperatureInput` بخواهد دمای خودش را به‌روز رسانی کند، می‌تواند `this.props.onTemperatureChange` را صدا کند.

```js{3}
  handleChange(e) {
    // قبلا : this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>توجه:
>
>propهای  `temperature` یا `onTemperatureChange`هیچ مفهوم خاصی در کامپوننت شخصی ندارند. ما هر چه بخواهیم می‌توانیم نامگذاری کنیم, مانند `value` و `onChange` که قراردادی، مرسوم هستند.

propهای `onTemperatureChange` و `temperature` توسط پدرشان فراهم خواهند شد. که تغییرات را در state محلی خودش رسیدگی می‌کند، سبب رندر مجدد جفت inputها می‌شود. خیلی زود به پیاده‌سازی `Calculator` نگاه می‌اندازیم.

قبل از اینکه به تغییرات داخل `Calculator` بپردازیم، بیایید تغییراتی که روی `TemperatureInput`داده‌ایم را جمع بندی کنیم. ما state محلی را از آن پاک کردیم، و به جای خواندن از `this.state.temperature`، اکنون از `this.props.temperature` می‌خوانیم .وقتی می‌خواهیم تغییری بدهیم به جای صدا کردن `this.setState()` اکنون `this.props.onTemperatureChange()` را صدا می‌کنیم، که توسط `Calculator` فراهم شده است.

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

حالا بیایید به کامپوننت `Calculator` برگردیم.

ما مقادیر `temperature` و `scale` inputها را در state داخلی‌اش ذخیره می‌کنیم. این همان stateای هست که از inputها "به بالا" انتقال دادیم که برای هر دوی آنها به عنوان "منبع حقیقت" عمل می‌کند. این کمترین تمثالی از تمام داده‌ای است که برای رندر input به آن نیاز  داریم .

برای مثال، اگر ما ۳۷ را در input سلیسیوس وارد کنیم، state کامپوننت `Calculator` می‌شود:

```js
{
  temperature: '37',
  scale: 'c'
}
```
اگر بعدا فارنهایت را به ۲۱۲ تغییر دهیم، state `Calculator` خواهد بود:

```js
{
  temperature: '212',
  scale: 'f'
}
```

ما می‌توانیم که مقدار هر دو input را ذخیره کنیم ولی به نظر می‌رسد که ضروری نباشد.
همین کافیست که مقدار input که آخرین بار تغییر کرده به همراه scale که نماینده‌ آن است ذخیره شود. سپس می‌توانیم مقدار input را به تنهایی با `temperature` و `scale` استنتاج کنیم.

inputها با هم همگام هستند زیرا مقادیرشان از state یکسانی محاسبه می‌شود.

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

حالا اهمیتی ندارد که کدام یک از inputها را ویرایش کنید، `this.state.temperature` و `this.state.scale` در `Calculator` به‌روز رسانی می‌شوند. یکی از inputها که مقدار بگیرد هر ورودی کاربر محفوظ می‌شود و input دیگر با توجه به آن مقدارش محاسبه می‌شود.

بیایید آنچه در ویرایش input اتفاق می‌افتد را با هم جمع‌بندی کنیم.

* React تابعی که به عنوان `onChange` روی DOM `<input>` مشخص شده است را صدا می‌کند. در این مورد متد `handleChange` در کامپوننت `TemperatureInput` می‌باشد.
* متد `handleChange` در کامپوننت `TemperatureInput` ، `this.props.onTemperatureChange()` را با مقدار جدیدش صدا می‌زند. که propاش, شامل `onTemperatureChange` می‌باشد، که توسط کامپوننت پدر که همان `Calculator` است فراهم شده است.

* قبلا که رندر شد `Calculator` مشخص کرد که `onTemperatureChange` ای که برای `TemperatureInput` سلیسوس بود متدی به‌نام `handleCelsiusChange` در `Calculator` است و `onTemperatureChange`ای که برای فارنهایت بود متدی به‌نام `handleFahrenheitChange` در `Calculator` است. پس این دو متد از Calculator بسته به اینکه کدام input ویرایش شده است فراخوانی می‌شود.

<<<<<<< HEAD
* درون این متدها, کامپوننت `Calculator` با درخواست `this.setState()` از React میخواهد با مقدار جدید input  و scale کنونی input که تازه ویرایش شده خودش را دوباره رندر کند. 
* React متد `render` کامپوننت `Calculator` را فراخوانی می‌کند تا بفهمد که UI به چه شکل باید باشد. مقدار هر دو input با توجه به دمای کنونی و scale فعال دوباره محاسبه می‌شود. تبدیل دما در اینجا انجام می‌شود.
* React متد `render` هر یک از کامپوننت‌های `TemperatureInput` با propهای جدیدی که `Calculator` مشخص کرده است صدا می‌زند. و. و می‌فهمد که UI هر یک به چه شکل باید باشد.
* React متد `render` از کامپوننت`BoilingVerdict` را صدا می‌زند, و دمای سلیسوس را به عنوان prop ارسال می‌کند.
* React DOM ، DOM را با حکم جوش به‌روز رسانی می‌کند تا مقادیر ورودی مورد نظر را تطبیق دهد. inputای که درحال حاضر ویرایش کردیم مقدار خودش را می‌گیرد و input دیگر دمای خودش را بعد از تبدیل به‌روز رسانی می‌کند.
=======
* React calls the function specified as `onChange` on the DOM `<input>`. In our case, this is the `handleChange` method in the `TemperatureInput` component.
* The `handleChange` method in the `TemperatureInput` component calls `this.props.onTemperatureChange()` with the new desired value. Its props, including `onTemperatureChange`, were provided by its parent component, the `Calculator`.
* When it previously rendered, the `Calculator` had specified that `onTemperatureChange` of the Celsius `TemperatureInput` is the `Calculator`'s `handleCelsiusChange` method, and `onTemperatureChange` of the Fahrenheit `TemperatureInput` is the `Calculator`'s `handleFahrenheitChange` method. So either of these two `Calculator` methods gets called depending on which input we edited.
* Inside these methods, the `Calculator` component asks React to re-render itself by calling `this.setState()` with the new input value and the current scale of the input we just edited.
* React calls the `Calculator` component's `render` method to learn what the UI should look like. The values of both inputs are recomputed based on the current temperature and the active scale. The temperature conversion is performed here.
* React calls the `render` methods of the individual `TemperatureInput` components with their new props specified by the `Calculator`. It learns what their UI should look like.
* React calls the `render` method of the `BoilingVerdict` component, passing the temperature in Celsius as its props.
* React DOM updates the DOM with the boiling verdict and to match the desired input values. The input we just edited receives its current value, and the other input is updated to the temperature after conversion.
>>>>>>> 2ef0ee1e4fc4ce620dce1f3e0530471195dc64d1

هر به روز رسانی این مراحل را طی می‌کند تا در نهایت این دو input با هم همگام باشند.


## درس‌هایی که آموختیم {#lessons-learned}

باید برای هر داده‌ای که در React تغییر می‌کند یک "منبع حقیقت" وجود داشته باشد. معمولا state در ابتدا به کامپوننت برای رندر مجدد اضافه می‌شود. و اگر کامپوننت دیگری به‌آن نیاز داشت، شما می‌توانید آن را به بالا و نزدیکترین جد مشترک انتقال دهید. به جای اینکه سعی کنید state را بین کامپوننت های مختلف همگام کنید، باید به حالت [جریان داده از بالا-به-پایین](/docs/state-and-lifecycle.html#the-data-flows-down) تکیه کنید.

بالا بردن state شامل نوشتن بیشتر "boilerplate" نسبت به روش binding دو-طرفه است، ولی به عنوان مزیت، هزینه کمتری برای پیدا کردن و کپسوله کردن باگ‌ها دارد. از آنجایی که هر state در برخی کامپوننت‌ها "زندگی"  می‌کند و آن کامپوننت به تنهایی می‌تواند آن را تغییر دهد، سطح وسیعی از باگ‌ها به طور چشم‌گیری کاهش پیدا می‌کند. علاوه بر این ، شما می‌توانید منطق سفارشی برای رد یا انتقال ورودی کاربر پیاده سازی کنید.


اگر چیزی می‌توانست از props یا state ناشی شود ، احتمالا نباید در state باشد. برای مثال ، به جای ذخیره کردن `celsiusValue` و `fahrenheitValue`، ما فقط آخرین `temperature` و `scale` تغییر کرده را ذخیزه می‌کنیم. مقدار سایز inputها می‌تواند در متد `render()` محاسبه شود. این به ما امکان می دهد بدون از دست دادن دقت در ورودی کاربر ، سایر فیلد‌ها را پاک یا رند کنیم.
وقتی می‌بینید چیزی در UI اشتباه است, می‌تواند از  [ابزار توسعه React](https://github.com/facebook/react/tree/master/packages/react-devtools) برای بازرسی propها استفاده کنید و در درخت اینقدر بالا بروید تا کامپوننتی که مسول به‌روز رسانی state هست را پیدا کنید. این به شما امکان میدهد  تا باگ‌ها را تا منبع دنبال کنید.

<img src="../images/docs/react-devtools-state.gif" alt="Monitoring State in React DevTools" max-width="100%" height="100%">