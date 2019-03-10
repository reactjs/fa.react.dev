---
id: forms
title: فرم‌ها
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

المنت‌های فرم HTML در نحوه‌ی کارکرد با المنت‌های دیگر DOM در ری‌اکت تفاوت جزیی دارند، به این دلیل که در حالت طبیعی این المنت‌ها وضعیت ورودی خود را ‌به‌صورت داخلی ‌نگه‌داری ‌می‌کنند. برای مثال، این کد فرم که ‌به‌صورت HTML ساده نوشته شده است از کاربر یک نام دریافت ‌می‌کند:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

این فرم رفتار پیش فرض فرم HTML  که کاربر پس از ثبت فرم به صفحه‌‌ی جدید انتقال پیدا ‌می‌کند را داراست . اگر این رفتار را در ری‌اکت ‌می‌خواهید نیاز به انجام هیچ تغییری ندارید. اما در بسیاری از موارد راه‌حل مناسب‌ این است که یک تابع جاوا اسکریپت به مقادیر وارد شده توسط کاربر دسترسی داشته باشد و به عملیات ثبت فرم رسیدگی کند. روش استاندارد پیاده سازی این رفتار تکنیکی به نام "کامپوننت‌های کنترل‌شده" ‌می‌باشد.

## کامپوننت‌های کنترل‌شده {#controlled-components}

در HTML، المنت‌های فرم مانند `<input>`, `<textarea>` و `<select>` , معمولا وضعیت داده وارد شده را در خود نگه ‌می‌دارند و بر اساس ورودی کاربر آن را به‌روز رسانی ‌می‌کنند. در ری‌اکت، به طور معمول وضعیت قابل‌تغییر در state کامپوننت‌ها ‌نگه‌داری ‌می‌شود، و فقط از طریق متد [`setState()`](/docs/react-component.html#setstate) ‌می‌توان مقادیر ذخیره‌شده آن را بروز رسانی کرد.

ما ‌می‌توانیم با قرار دادن قابلیت state کامپوننت در ری‌اکت به عنوان "تنها منبع مرجع وضعیت" این دو قابلیت را با هم ترکیب کنیم. سپس کامپوننت ری‌اکتی که وظیفه رندر کردن یک فرم را دارد، مشخص کننده نحوه عملکرد فرم در قبال ورودی کاربر ‌می‌باشد. المنت ورودی داده در فرم که مقادیر وارد شده آن توسط ری‌اکت به این صورت کنترل ‌می‌شود را "کامپوننت کنترل‌شده" ‌می‌نامند.

به عنوان مثال، اگر بخواهیم در مثال قبل در زمان ثبت فرم، نام نمایش داده شود، ‌می‌توانیم فرم را ‌به‌صورت یک کامپوننت کنترل‌شده بنویسیم:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

از آنجایی که خصوصیت `value` در المنت فرم ما ست شده است، مقداری که نمایش داده ‌می‌شود همیشه مقداری که در `this.state.value` نگه داشته ‌می‌شود خواهد بود، که باعث ‌می‌شود state کامپوننت در ری‌اکت به عنوان منبع ‌نگه‌داری داده و وضعیت کامپوننت شود. همچنین به دلیل اینکه تابع `handleChange` پس از ورود هر کاراکتر توسط کاربر، اجرا ‌می‌شود و مقدار ذخیره‌شده در state ری‌اکت را بروز رسانی ‌می‌کند، مقدار نمایش داده شده در المنت هم به همراه تایپ کردن کاربر بروز رسانی ‌می‌شود.

در کامپوننت‌های کنترل‌شده، هر گونه عملیات تغییر و بروز رسانی state با یک تابع که چگونگی انجام این عملیات را تعریف ‌می‌کند در ارتباط است. این تابع روند تغییر و یا اعتبار سنجی ورودی کاربر را آسان ‌می‌کند. به عنوان مثال، اگر بخواهیم فیلد نام فقط با حروف بزرگ نمایش داده شود، تابع `handleChange` را به این صورت ‌می‌نویسیم:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## تگ textarea {#the-textarea-tag}

در HTML، متنی که در المنت `<textarea>` نمایش داده ‌می‌شود، بین تگ باز و بسته این المنت تعریف ‌می‌شود:

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

در عوض در ری‌اکت، تگ `<textarea>` از خصوصیت `value` برای این کار استفاده ‌می‌کند. با این روش، فر‌می‌ که دارای المنت `<textarea>` هست را ‌می‌توان خیلی شبیه به یک فرم با ورودی‌های تک‌خطی نوشت: 

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

توجه کنید که `this.state.value` در تابع سازنده کلاس(constructor) مقدار دهی اولیه ‌می‌شود، بنابراین المنت متن چند خطی، حاوی متن در رندر اولیه ‌می‌باشد.

## تگ select {#the-select-tag}

در HTML، تگ `<select>` یک لیست کشویی می‌سازد. برای مثال، کد HTML زیر یک لیست کشویی از طعم‌ها می‌سازد:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

توجه کنید که گزینه Coconut در رندر اولیه انتخاب شده است، چون که خصوصیت `selected` برای این المنت تعریف شده است. ری‌اکت به جای استفاده از خصوصیت `selected` در تگ `<option>`، از خصوصیت `value` در تگ `select` والد استفاده ‌می‌کند. این روش در کامپوننت‌های کنترل‌شده کار را راحت‌تر ‌می‌کند زیرا شما فقط باید آن را در یک مکان به کار ببرید. برای مثال:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

در کل، این نوع ساختار باعث ‌می‌شود که تمام المنت‌های `<input type="text">`, `<textarea>` و `<select>`، عملکرد بسیار مشابهی داشته باشند. به این صورت که همگی یک خصوصیت `value` دریافت ‌می‌کنند که ‌می‌توان با آن عملکرد کامپوننت کنترل‌شده را پیاده سازی کنید.

> نکته
>
> شما ‌می‌توانید یک آرایه از مقادیر به خصوصیت `value` ارسال کنید که به شما اجازه ‌می‌دهد لیست کشویی `select` بسازید که قابلیت انتخاب چند گزینه را دارد:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## تگ file input {#the-file-input-tag}

در HTML، کد `<input type="file">` فیلد ورودی ‌می‌سازد که به کاربر اجازه ‌می‌دهد یک یا چند فایل را از محل ذخیره‌سازی دستگاه کاربر انتخاب کند که پس از آن به یک سرور آپلود شود و یا از طریق  [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) جاوا اسکریپت بر روی فایل‌های انتخابی عملیاتی انجام شود.

```html
<input type="file" />
```

به دلیل اینکه مقدار این المنت فقط قابل‌خواندن ‌می‌باشد، این المنت در ری‌اکت یک کامپوننت **کنترل‌نشده** ‌می‌باشد. در مورد این کامپوننت و دیگر کامپوننت‌های کنترل‌نشده توضیحاتی در [بخش دیگری از این اسناد ](/docs/uncontrolled-components.html#the-file-input-tag) داده شده است.

## به کار بردن چند فیلد ورودی {#handling-multiple-inputs}

زمانی که نیاز دارید چند فیلد ورودی `input` کنترل‌شده به کار ببرید، ‌می‌توانید یک خصوصیت `name` برای هر یک از المنت‌ها تعریف کنید. سپس در تابعی که وظیفه بروز رسانی مقادیر و وضعیت را دارد ‌می‌توانید با بررسی مقدار `event.target.name` مشخص کنید کدام فیلد به‌روز شود.

برای مثال:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**کد را در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

توجه داشته باشید که چگونه از قابلیت [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) شیوه‌نگارش ES6 جهت به‌روز کردن مقدار ذخیره‌شده مرتبط با کلید هم‌نام با فیلد ورودی استفاده شده است:

```js{2}
this.setState({
  [name]: value
});
```

معادل عملیات بالا ‌به‌صورت کد ES5 به این صورت ‌می‌باشد:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```
همچنین از آن جایی که تابع `setState()` ‌به‌صورت خودکار ‌می‌تواند [تغییرات جزیی در وضعیت را با کل state ادغام کند](/docs/state-and-lifecycle.html#state-updates-are-merged), فقط لازم است قسمت‌های به‌روز شده را زمان صدا زدن این تابع ارسال کنیم.

## فیلد ورودی کنترل‌شده با مقدار Null {#controlled-input-null-value}

تعریف خصوصیت `value` با رشته ای از متن در یک [کامپوننت کنترل‌شده](/docs/forms.html#controlled-components) باعث جلوگیری از تغییر مقدار نمایش داده شده فیلد ورودی توسط کاربر ‌می‌شود مگر اینکه خودتان این عملکرد را نخواهید. اگر خصوصیت `value` را تعریف کرده باشید و فیلد ورودی هنوز قابل‌تغییر توسط کاربر ‌می‌باشد، ممکن است مقدار خصوصیت `value` را ‌به‌صورت تصادفی `undefined` و یا `null` ست کرده باشید.

نمونه کد زیر این [رفتار] را نشان ‌می‌دهد. (در ابتدا فیلد ورودی قفل است اما پس از زمانی کوتاه قابل‌تغییر ‌می‌شود.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## راه‌حل‌های جایگزین کامپوننت‌های کنترل‌شده {#alternatives-to-controlled-components}

در بعضی مواقع استفاده از کامپوننت‌های کنترل‌شده ممکن است خسته‌کننده باشد، چون که شما باید به ازای هر (event) که به هر شکل داده‌ها را تغییر ‌می‌دهد، یک تابع که وظیفه رسیدگی به این تغییرات را دارد بنویسید و به state نگه‌دارنده وضعیت فیلد‌های ورودی در ری‌اکت ارسال کنید. پیاده سازی این رفتار به مرور ‌می‌تواند آزار دهنده شود مخصوصا زمانی که قصد دارید کد پروژه موجودتان را به معادل ری‌اکت تبدیل کنید و یا برنامه توسعه یافته با ری‌اکت را با یک برنامه غیر ری‌اکتی ادغام کنید. در چنین مواردی شاید بهتر باشد از [کامپوننت‌های کنترل‌نشده](/docs/uncontrolled-components.html) استفاده کنید که یک تکنیک جایگزین برای پیاده سازی فیلد‌های ورودی فرم ‌می‌باشد.

## راه‌حل‌های تمام‌عیار {#fully-fledged-solutions}

اگر به دنبال یک راه‌حل کامل که شامل مواردی از قبیل اعتبار سنجی مقدار ورودی توسط کاربر، نظارت بر فیلد‌های طی‌شده و کنترل نحوه ثبت فرم باشد، [Formik](https://jaredpalmer.com/formik) یکی از محبوب‌ترین گزینه‌ها ‌می‌باشد. با این حال این راه‌حل بر اساس اصول کامپوننت‌های کنترل‌شده و مدیریت وضعیت state ساخته شده است. پس از یادگیری اون غفلت نکنید.
