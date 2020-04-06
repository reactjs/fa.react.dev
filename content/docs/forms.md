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

المنت‌های فرم HTML در نحوه‌ی کارکرد با المنت‌های دیگر DOM در ری‌اکت تفاوت جزیی دارند، به این دلیل که المنت‌های فرم به صورت طبیعی مقداری state درونی ‌نگه‌داری ‌می‌کنند. برای مثال، این فرم که ‌به‌صورت HTML ساده نوشته شده است تنها یک نام دریافت ‌می‌کند:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

این فرم رفتار پیش فرض فرم HTML  که کاربر پس از ثبت فرم به صفحه‌‌ی جدید انتقال پیدا ‌می‌کند را داراست . اگر این رفتار را در ری‌اکت ‌می‌خواهید نیاز به انجام هیچ تغییری ندارید. اما در بیشتر موارد، مناسب است که یک تابع جاوااسکریپت داشته‌باشیم که ثبت فرم را انجام می‌دهد و به داده‌هایی که کاربر در فرم وارد کرده است دسترسی دارد. روش استاندارد پیاده سازی این رفتار تکنیکی به نام "کامپوننت‌های کنترل‌شده" ‌می‌باشد.

## کامپوننت‌های کنترل‌شده {#controlled-components}

در HTML، المنت‌های فرم مانند `<input>`, `<textarea>` و `<select>` , معمولا وضعیت داده وارد شده را در خود نگه ‌می‌دارند و بر اساس ورودی کاربر آن را به‌روز رسانی ‌می‌کنند. در ری‌اکت، معمولا وضعیت قابل‌تغییر در state کامپوننت‌ها ‌نگه‌داری ‌می‌شود، و فقط از طریق متد [`setState()`](/docs/react-component.html#setstate) به‌روز رسانی می‌شود.

ما ‌می‌توانیم با قرار دادن قابلیت state کامپوننت در ری‌اکت به عنوان "تنها منبع حقیقت" [single source of truth] این دو را با هم ترکیب کنیم. آنگاه کامپوننت ری‌اکتی که فرم را رندر می‌کند، مشخص کننده نحوه عملکرد فرم در قبال ورودی کاربر نیز ‌می‌باشد. یک المنت فرم ورودی داده که مقدارش توسط ری‌اکت به این صورت کنترل ‌می‌شود را "کامپوننت کنترل‌شده" ‌می‌نامند.

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

از آن‌جایی که خصوصیت value روی المنت فرم ما قرار گرفته‌است، مقدار نمایش داده‌شده همیشه `this.state.value` که باعث ‌می‌شود state ری‌اکت به عنوان منبع ‌نگه‌داری داده و وضعیت ‌باشد. از آن‌جایی که `handleChange` با هر فشردن کلید برای به‌روز رسانی state ری‌اکت اجرا می‌شود، مقدار نمایش داده‌شده هم با تایپ کردن کاربر به‌روز‌رسانی خواهد شد.

<<<<<<< HEAD
در یک کامپوننت کنترل‌شده، هر تغییر state یک تابع handler مرتبط خواهد داشت. این باعث سر راست شدن تغییر یا اعتبارسنجی ورودی کاربر خواهد شد. به عنوان مثال، اگر ما می‌خواستیم نوشتن نام‌ها را با حروف بزرگ اجباری کنیم، می توانستیم `handleChange` را به این صورت بنویسیم:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```
=======
With a controlled component, the input's value is always driven by the React state. While this means you have to type a bit more code, you can now pass the value to other UI elements too, or reset it from other event handlers.
>>>>>>> fa5e6e7a988b4cb465601e4c3beece321edeb812

## تگ textarea {#the-textarea-tag}

در HTML، یک المنت `<textarea>` مقدارش را بر اساس فرزندانش [متن بین تگ باز و بسته این المنت] تعریف می‌کند:

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

توجه کنید که `this.state.value` در تابع سازنده کلاس (constructor) مقدار دهی اولیه ‌می‌شود، بنابراین در ابتدا textarea با متنی درون آن نمایش داده می‌شود.

## تگ select {#the-select-tag}

در HTML، تگ `<select>` یک لیست کشویی می‌سازد. برای مثال، این HTML یک لیست کشویی از طعم‌ها را می‌سازد:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

توجه کنید که ابتدا گزینه Coconut  به خاطر خصوصیت `selected` انتخاب شده است. ری‌اکت به جای استفاده از خصوصیت `selected`، از خصوصیت `value` در تگ `select` ریشه استفاده ‌می‌کند. این روش در کامپوننت‌های کنترل‌شده راحت‌تر است زیرا شما تنها نیاز به به‌روزرسانی آن در یک مکان دارید. برای مثال:

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

در کل، این نوع ساختار باعث ‌می‌شود که `<input type="text">`, `<textarea>` و `<select>`، همگی بسیار مشابه کار کنند. همگی یک خصوصیت `value` دریافت ‌می‌کنند که ‌می‌توانید با استفاده از آن کامپوننت کنترل‌شده را پیاده سازی کنید.

> نکته
>
> شما ‌می‌توانید یک آرایه را به خصوصیت value پاس دهید که به شما اجازه انتخاب چندین گزینه در یک تگ select را می‌دهد:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## تگ file input {#the-file-input-tag}

در HTML، یک `<input type="file">`  به کاربر اجازه می‌دهد که یک یا چند فایل را از محل ذخیره‌سازی دستگاه خود انتخاب کند تا روی سرور بارگذاری شود یا توسط  [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) جاوااسکریپت روی آن کار شود.

```html
<input type="file" />
```

به دلیل اینکه مقدار این المنت فقط قابل‌خواندن ‌می‌باشد، این المنت در ری‌اکت یک کامپوننت **کنترل‌نشده** ‌می‌باشد. در مورد این کامپوننت همراه با دیگر کامپوننت‌های کنترل‌نشده [در بخش دیگری از این اسناد](/docs/uncontrolled-components.html#the-file-input-tag) درباره آن بحث شده‌است.

## کار با چندین ورودی {#handling-multiple-inputs}

زمانی که نیاز دارید چند فیلد ورودی `input` کنترل‌شده به کار ببرید، ‌می‌توانید یک خصوصیت `name` برای هر یک از المنت‌ها تعریف کنید و اجازه دهید که تابع handler بر اساس مقدار event.target.name تصمیم بگیرد که چه کاری انجام دهد.

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
    const value = target.name === 'isGoing' ? target.checked : target.value;
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

توجه داشته‌باشید که ما چگونه از قاعده نوشتن [computed property name](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) در ES6 برای به‌روز رسانی state با کلید مرتبط با نام ورودی داده‌شده استفاده کرده‌ایم:

```js{2}
this.setState({
  [name]: value
});
```

معادل با این کد در ES5 است:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```
همچنین از آن جایی که `setState()` ‌به‌صورت خودکار ‌می‌تواند [تغییرات جزیی state را به درون state فعلی ادغام کند](/docs/state-and-lifecycle.html#state-updates-are-merged), ما فقط نیاز داریم آن را با بخشی که تغییر کرده‌است فراخوانی کنیم.

## مقدار Null ورودی کنترل‌شده {#controlled-input-null-value}

قراردادن prop value روی یک [کامپوننت کنترل‌شده](/docs/forms.html#controlled-components) از تغییر ورودی توسط کاربر جلوگیری می‌کند، مگر اینکه شما بخواهید. اگر یک `value` روی ورودی قرار داده‌اید، اما هنوز قابل‌ ویرایش است، ممکن است `value` را تصادفا با `undefined` و یا `null` مقدار‌دهی کرده باشید.

نمونه کد زیر این [رفتار] را نشان ‌می‌دهد. (در ابتدا فیلد ورودی قفل است اما پس از زمانی کوتاه قابل‌تغییر ‌می‌شود.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## راه‌حل‌های جایگزین کامپوننت‌های کنترل‌شده {#alternatives-to-controlled-components}

در بعضی مواقع استفاده از کامپوننت‌های کنترل‌شده میتواند خسته‌کننده باشد، چون شما می‌بایست برای هر شکلی که داده‌ها تغییر می‌کنند یک event handler بنویسید و تمام وضعیت ورودی را به یک کامپوننت ری‌اکتی انتقال دهید. این می‌تواند مخصوصا زمانی که قصد دارید کد موجودتان را به ری‌اکت تبدیل کنید، یا برنامه ری‌اکتی را با یک کتابخانه غیرری‌اکتی ادغام کنید آزار دهنده شود. در چنین شرایطی شاید بهتر باشد به [کامپوننت‌های کنترل‌نشده](/docs/uncontrolled-components.html) نگاهی بیاندازید که یک تکنیک جایگزین برای پیاده سازی فرم های ورودی ‌می‌باشد.

## راه‌حل‌های تمام‌عیار {#fully-fledged-solutions}

اگر به دنبال یک راه‌حل کامل که شامل مواردی از قبیل اعتبار سنجی مقدار ورودی توسط کاربر، نظارت بر فیلد‌های مشاهده‌شده و کنترل نحوه ثبت فرم باشد، [Formik](https://jaredpalmer.com/formik) یکی از محبوب‌ترین گزینه‌ها ‌می‌باشد. با این حال، این راه‌حل بر اساس اصول کامپوننت‌های کنترل‌شده و مدیریت state ساخته شده است، پس از یادگیری آن غفلت نکنید.
