---
title: "<input>"
---

<Intro>

[کامپوننت `<input>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) به شما اجازه می‌دهد انواع مختلفی از ورودی‌های فرم را رندر کنید.

```js
<input />
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<input>` {/*input*/}

برای نمایش یک ورودی، [کامپوننت `<input>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) را رندر کنید.

```js
<input name="myInput" />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*props*/}

`<input>` از تمام [پراپس‌های رایج المان](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

- [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): یک رشته یا تابع. `<form action>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند. وقتی یک URL به `action` پاس داده می‌شود، فرم مانند یک فرم استاندارد HTML رفتار خواهد کرد. وقتی یک تابع به `formAction` پاس داده می‌شود، تابع ارسال فرم را مدیریت خواهد کرد. به [`<form action>`](/reference/react-dom/components/form#props) مراجعه کنید.

شما می‌توانید یک ورودی را [کنترل‌شده کنید](#controlling-an-input-with-a-state-variable) با پاس‌دادن یکی از این پراپس‌ها:

* [`checked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#checked): یک مقدار بولی. برای یک ورودی چک‌باکس یا دکمهٔ رادیویی، کنترل می‌کند که آیا انتخاب شده است.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value): یک رشته. برای یک ورودی متنی، متن آن را کنترل می‌کند. (برای یک دکمهٔ رادیویی، داده‌های فرم آن را مشخص می‌کند.)

وقتی هرکدام از آن‌ها را پاس می‌دهید، باید یک هندلر `onChange` نیز پاس دهید که مقدار پاس‌شده را به‌روز می‌کند.

این پراپس‌های `<input>` فقط برای ورودی‌های غیرکنترلی (uncontrolled) مرتبط هستند:

* [`defaultChecked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultChecked): یک مقدار بولی. [مقدار اولیه](#providing-an-initial-value-for-an-input) را برای ورودی‌های `type="checkbox"` و `type="radio"` مشخص می‌کند.
* [`defaultValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultValue): یک رشته. [مقدار اولیه](#providing-an-initial-value-for-an-input) را برای یک ورودی متنی مشخص می‌کند.

این پراپس‌های `<input>` هم برای ورودی‌های غیرکنترلی و هم کنترلی مرتبط هستند:

* [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#accept): یک رشته. مشخص می‌کند که یک ورودی `type="file"` چه انواع فایلی را می‌پذیرد.
* [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#alt): یک رشته. متن جایگزین تصویر را برای یک ورودی `type="image"` مشخص می‌کند.
* [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#capture): یک رشته. رسانه (میکروفون، ویدیو یا دوربین) ضبط‌شده توسط یک ورودی `type="file"` را مشخص می‌کند.
* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete): یک رشته. یکی از [رفتارهای تکمیل خودکار](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values) ممکن را مشخص می‌کند.
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus): یک مقدار بولی. اگر `true` باشد، ری‌اکت المان را هنگام mount متمرکز می‌کند.
* [`dirname`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname): یک رشته. نام فیلد فرم را برای جهت‌گیری المان مشخص می‌کند.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled): یک مقدار بولی. اگر `true` باشد، ورودی تعاملی نخواهد بود و کمرنگ به‌نظر می‌رسد.
* `children`: `<input>` فرزندی نمی‌پذیرد.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form): یک رشته. `id` فرم `<form>` که این ورودی به آن تعلق دارد را مشخص می‌کند. اگر حذف شود، نزدیک‌ترین فرم والد است.
* [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): یک رشته. `<form action>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند.
* [`formEnctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formenctype): یک رشته. `<form enctype>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند.
* [`formMethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formmethod): یک رشته. `<form method>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند.
* [`formNoValidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formnovalidate): یک رشته. `<form noValidate>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند.
* [`formTarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formtarget): یک رشته. `<form target>` والد را برای `type="submit"` و `type="image"` بازنویسی می‌کند.
* [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#height): یک رشته. ارتفاع تصویر را برای `type="image"` مشخص می‌کند.
* [`list`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list): یک رشته. `id` مربوط به `<datalist>` با گزینه‌های تکمیل خودکار را مشخص می‌کند.
* [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max): یک عدد. حداکثر مقدار ورودی‌های عددی و datetime را مشخص می‌کند.
* [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength): یک عدد. حداکثر طول متن و سایر ورودی‌ها را مشخص می‌کند.
* [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min): یک عدد. حداقل مقدار ورودی‌های عددی و datetime را مشخص می‌کند.
* [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength): یک عدد. حداقل طول متن و سایر ورودی‌ها را مشخص می‌کند.
* [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#multiple): یک مقدار بولی. مشخص می‌کند که آیا چندین مقدار برای `<type="file"` و `type="email"` مجاز است.
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): یک رشته. نام این ورودی را که [با فرم ارسال می‌شود](#reading-the-input-values-when-submitting-a-form) مشخص می‌کند.
* `onChange`: یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). برای [ورودی‌های کنترلی](#controlling-an-input-with-a-state-variable) الزامی است. بلافاصله وقتی مقدار ورودی توسط کاربر تغییر می‌کند فعال می‌شود (مثلاً با هر فشردن کلید فعال می‌شود). مانند [رویداد `input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) مرورگر رفتار می‌کند.
* `onChangeCapture`: نسخه‌ای از `onChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). بلافاصله وقتی مقدار توسط کاربر تغییر می‌کند فعال می‌شود. به دلایل تاریخی، در ری‌اکت رایج است که به‌جای آن از `onChange` استفاده شود که مشابه کار می‌کند.
* `onInputCapture`: نسخه‌ای از `onInput` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). اگر یک ورودی در ارسال فرم اعتبارسنجی نشود فعال می‌شود. برخلاف رویداد بومی `invalid`، رویداد `onInvalid` در ری‌اکت بالا می‌رود (bubble).
* `onInvalidCapture`: نسخه‌ای از `onInvalid` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). پس از تغییر انتخاب درون `<input>` فعال می‌شود. ری‌اکت رویداد `onSelect` را گسترش می‌دهد تا برای انتخاب‌های خالی و هنگام ویرایش‌ها (که ممکن است بر انتخاب تأثیر بگذارد) نیز فعال شود.
* `onSelectCapture`: نسخه‌ای از `onSelect` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern): یک رشته. الگویی که `value` باید با آن مطابقت داشته باشد را مشخص می‌کند.
* [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder): یک رشته. با رنگی کمرنگ نمایش داده می‌شود وقتی مقدار ورودی خالی است.
* [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly): یک مقدار بولی. اگر `true` باشد، ورودی توسط کاربر قابل‌ویرایش نیست.
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#required): یک مقدار بولی. اگر `true` باشد، باید مقدار برای ارسال فرم ارائه شود.
* [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#size): یک عدد. مشابه تنظیم عرض است، اما واحد به کنترل بستگی دارد.
* [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#src): یک رشته. منبع تصویر را برای یک ورودی `type="image"` مشخص می‌کند.
* [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step): یک عدد مثبت یا رشتهٔ `'any'`. فاصلهٔ بین مقادیر معتبر را مشخص می‌کند.
* [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type): یک رشته. یکی از [انواع ورودی.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
* [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#width):  یک رشته. عرض تصویر را برای یک ورودی `type="image"` مشخص می‌کند.

#### نکات {/*caveats*/}

- چک‌باکس‌ها به `checked` (یا `defaultChecked`) نیاز دارند، نه `value` (یا `defaultValue`).
- اگر یک ورودی متنی پراپس `value` رشته‌ای دریافت کند، [به‌عنوان کنترلی در نظر گرفته می‌شود.](#controlling-an-input-with-a-state-variable)
- اگر یک چک‌باکس یا دکمهٔ رادیویی پراپس `checked` بولی دریافت کند، [به‌عنوان کنترلی در نظر گرفته می‌شود.](#controlling-an-input-with-a-state-variable)
- یک ورودی نمی‌تواند هم‌زمان هم کنترلی و هم غیرکنترلی باشد.
- یک ورودی نمی‌تواند در طول عمر خود بین کنترلی یا غیرکنترلی بودن جابجا شود.
- هر ورودی کنترلی به یک هندلر رویداد `onChange` نیاز دارد که مقدار پشتیبان آن را به‌طور همگام به‌روز می‌کند.

---

## استفاده {/*usage*/}

### نمایش ورودی‌های انواع مختلف {/*displaying-inputs-of-different-types*/}

برای نمایش یک ورودی، یک کامپوننت `<input>` رندر کنید. به‌طور پیش‌فرض، یک ورودی متنی خواهد بود. می‌توانید برای چک‌باکس `type="checkbox"`، برای دکمهٔ رادیویی `type="radio"`، یا [یکی از سایر انواع ورودی](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) را پاس دهید.

<Sandpack>

```js
export default function MyForm() {
  return (
    <>
      <label>
        Text input: <input name="myInput" />
      </label>
      <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" />
      </label>
      <hr />
      <p>
        Radio buttons:
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <label>
          <input type="radio" name="myRadio" value="option2" />
          Option 2
        </label>
        <label>
          <input type="radio" name="myRadio" value="option3" />
          Option 3
        </label>
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin: 5px; }
```

</Sandpack>

---

### ارائهٔ برچسب برای یک ورودی {/*providing-a-label-for-an-input*/}

معمولاً، هر `<input>` را درون یک تگ [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) قرار می‌دهید. این به مرورگر می‌گوید که این برچسب با آن ورودی مرتبط است. وقتی کاربر روی برچسب کلیک می‌کند، مرورگر به‌طور خودکار ورودی را متمرکز می‌کند. این برای دسترس‌پذیری نیز ضروری است: یک صفحه‌خوان برچسب را وقتی کاربر ورودی مرتبط را متمرکز می‌کند اعلام می‌کند.

اگر نمی‌توانید `<input>` را درون `<label>` تودرتو کنید، با پاس‌دادن همان ID به `<input id>` و [`<label htmlFor>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) آن‌ها را مرتبط کنید. برای جلوگیری از تداخل بین نمونه‌های متعدد یک کامپوننت، چنین ID‌ای را با [`useId`](/reference/react/useId) تولید کنید.

<Sandpack>

```js
import { useId } from 'react';

export default function Form() {
  const ageInputId = useId();
  return (
    <>
      <label>
        Your first name:
        <input name="firstName" />
      </label>
      <hr />
      <label htmlFor={ageInputId}>Your age:</label>
      <input id={ageInputId} name="age" type="number" />
    </>
  );
}
```

```css
input { margin: 5px; }
```

</Sandpack>

---

### ارائهٔ مقدار اولیه برای یک ورودی {/*providing-an-initial-value-for-an-input*/}

شما می‌توانید به‌صورت اختیاری مقدار اولیه‌ای را برای هر ورودی مشخص کنید. آن را به‌عنوان رشتهٔ `defaultValue` برای ورودی‌های متنی پاس دهید. چک‌باکس‌ها و دکمه‌های رادیویی باید مقدار اولیه را با `defaultChecked` بولی مشخص کنند.

<Sandpack>

```js
export default function MyForm() {
  return (
    <>
      <label>
        Text input: <input name="myInput" defaultValue="Some initial value" />
      </label>
      <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} />
      </label>
      <hr />
      <p>
        Radio buttons:
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <label>
          <input
            type="radio"
            name="myRadio"
            value="option2"
            defaultChecked={true} 
          />
          Option 2
        </label>
        <label>
          <input type="radio" name="myRadio" value="option3" />
          Option 3
        </label>
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin: 5px; }
```

</Sandpack>

---

### خواندن مقادیر ورودی هنگام ارسال فرم {/*reading-the-input-values-when-submitting-a-form*/}

یک [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) به دور ورودی‌های خود با یک [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) درون آن اضافه کنید. این هندلر رویداد `<form onSubmit>` شما را فراخوانی خواهد کرد. به‌طور پیش‌فرض، مرورگر داده‌های فرم را به URL فعلی ارسال کرده و صفحه را بازخوانی می‌کند. می‌توانید با فراخوانی `e.preventDefault()` این رفتار را بازنویسی کنید. داده‌های فرم را با [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) بخوانید.
<Sandpack>

```js
export default function MyForm() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Text input: <input name="myInput" defaultValue="Some initial value" />
      </label>
      <hr />
      <label>
        Checkbox: <input type="checkbox" name="myCheckbox" defaultChecked={true} />
      </label>
      <hr />
      <p>
        Radio buttons:
        <label><input type="radio" name="myRadio" value="option1" /> Option 1</label>
        <label><input type="radio" name="myRadio" value="option2" defaultChecked={true} /> Option 2</label>
        <label><input type="radio" name="myRadio" value="option3" /> Option 3</label>
      </p>
      <hr />
      <button type="reset">Reset form</button>
      <button type="submit">Submit form</button>
    </form>
  );
}
```

```css
label { display: block; }
input { margin: 5px; }
```

</Sandpack>

<Note>

به هر `<input>` یک `name` بدهید، مثلاً `<input name="firstName" defaultValue="Taylor" />`. نامی که مشخص کرده‌اید به‌عنوان کلید در داده‌های فرم استفاده خواهد شد، مثلاً `{ firstName: "Taylor" }`.

</Note>

<Pitfall>

به‌طور پیش‌فرض، یک `<button>` درون `<form>` بدون ویژگی `type` آن را ارسال می‌کند. این می‌تواند شگفت‌آور باشد! اگر یک کامپوننت `Button` اختصاصی ری‌اکت دارید، استفاده از [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) به‌جای `<button>` (بدون type) را در نظر بگیرید. سپس، برای صراحت، از `<button type="submit">` برای دکمه‌هایی استفاده کنید که *باید* فرم را ارسال کنند.

</Pitfall>

---

### کنترل یک ورودی با متغیر استیت {/*controlling-an-input-with-a-state-variable*/}

یک ورودی مانند `<input />` *غیرکنترلی* است. حتی اگر [مقدار اولیه‌ای پاس دهید](#providing-an-initial-value-for-an-input) مانند `<input defaultValue="Initial text" />`، JSX شما فقط مقدار اولیه را مشخص می‌کند. این کنترلی بر روی آنچه مقدار باید اکنون باشد ندارد.

**برای رندر یک ورودی _کنترلی_، پراپس `value` را به آن پاس دهید (یا `checked` برای چک‌باکس‌ها و رادیوها).** ری‌اکت ورودی را مجبور می‌کند همیشه `value`‌ای که پاس داده‌اید را داشته باشد. معمولاً، این کار را با تعریف یک [متغیر استیت](/reference/react/useState) انجام می‌دهید:

```js {2,6,7}
function Form() {
  const [firstName, setFirstName] = useState(''); // Declare a state variable...
  // ...
  return (
    <input
      value={firstName} // ...force the input's value to match the state variable...
      onChange={e => setFirstName(e.target.value)} // ... and update the state variable on any edits!
    />
  );
}
```

یک ورودی کنترلی منطقی است اگر به هر حال به استیت نیاز داشتید — مثلاً برای رندر مجدد رابط کاربری در هر ویرایش:

```js {2,9}
function Form() {
  const [firstName, setFirstName] = useState('');
  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </label>
      {firstName !== '' && <p>Your name is {firstName}.</p>}
      ...
```

این همچنین مفید است اگر می‌خواهید راه‌های متعددی برای تنظیم استیت ورودی ارائه دهید (مثلاً با کلیک روی یک دکمه):

```js {3-4,10-11,14}
function Form() {
  // ...
  const [age, setAge] = useState('');
  const ageAsNumber = Number(age);
  return (
    <>
      <label>
        Age:
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
```

`value`‌ای که به کامپوننت‌های کنترلی پاس می‌دهید نباید `undefined` یا `null` باشد. اگر نیاز دارید مقدار اولیه خالی باشد (مانند فیلد `firstName` در زیر)، متغیر استیت خود را به یک رشتهٔ خالی (`''`) مقداردهی اولیه کنید.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('20');
  const ageAsNumber = Number(age);
  return (
    <>
      <label>
        First name:
        <input
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="number"
        />
        <button onClick={() => setAge(ageAsNumber + 10)}>
          Add 10 years
        </button>
      </label>
      {firstName !== '' &&
        <p>Your name is {firstName}.</p>
      }
      {ageAsNumber > 0 &&
        <p>Your age is {ageAsNumber}.</p>
      }
    </>
  );
}
```

```css
label { display: block; }
input { margin: 5px; }
p { font-weight: bold; }
```

</Sandpack>

<Pitfall>

**اگر `value` را بدون `onChange` پاس دهید، تایپ در ورودی غیرممکن خواهد بود.** وقتی یک ورودی را با پاس‌دادن یک `value` کنترل می‌کنید، آن را *مجبور* می‌کنید همیشه مقداری که پاس داده‌اید را داشته باشد. بنابراین اگر یک متغیر استیت را به‌عنوان `value` پاس می‌دهید اما فراموش می‌کنید آن متغیر استیت را به‌طور همگام در طول هندلر رویداد `onChange` به‌روز کنید، ری‌اکت ورودی را پس از هر فشردن کلید به `value`‌ای که مشخص کرده‌اید بازگرداند.

</Pitfall>

---

### بهینه‌سازی رندر مجدد در هر فشردن کلید {/*optimizing-re-rendering-on-every-keystroke*/}

وقتی از یک ورودی کنترلی استفاده می‌کنید، استیت را در هر فشردن کلید تنظیم می‌کنید. اگر کامپوننتی که استیت شما را در بر دارد یک درخت بزرگ را دوباره رندر می‌کند، این می‌تواند کند شود. چند راه برای بهینه‌سازی عملکرد رندر مجدد وجود دارد.

مثلاً، فرض کنید با فرمی شروع می‌کنید که تمام محتوای صفحه را در هر فشردن کلید دوباره رندر می‌کند:

```js {5-8}
function App() {
  const [firstName, setFirstName] = useState('');
  return (
    <>
      <form>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </form>
      <PageContent />
    </>
  );
}
```

از آنجا که `<PageContent />` به استیت ورودی وابسته نیست، می‌توانید استیت ورودی را به کامپوننت خودش منتقل کنید:

```js {4,10-17}
function App() {
  return (
    <>
      <SignupForm />
      <PageContent />
    </>
  );
}

function SignupForm() {
  const [firstName, setFirstName] = useState('');
  return (
    <form>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} />
    </form>
  );
}
```

این عملکرد را به‌طور قابل‌توجهی بهبود می‌بخشد زیرا اکنون فقط `SignupForm` در هر فشردن کلید دوباره رندر می‌شود.

اگر راهی برای جلوگیری از رندر مجدد وجود ندارد (مثلاً اگر `PageContent` به مقدار ورودی جست‌وجو وابسته است)، [`useDeferredValue`](/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui) به شما اجازه می‌دهد ورودی کنترلی را حتی در میانهٔ یک رندر مجدد بزرگ پاسخگو نگه دارید.

---

## رفع اشکال {/*troubleshooting*/}

### ورودی متنی من هنگام تایپ در آن به‌روز نمی‌شود {/*my-text-input-doesnt-update-when-i-type-into-it*/}

اگر ورودی را با `value` اما بدون `onChange` رندر کنید، در کنسول خطایی خواهید دید:

```js
// 🔴 Bug: controlled text input with no onChange handler
<input value={something} />
```

<ConsoleBlock level="error">

You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

</ConsoleBlock>

همانطور که پیام خطا پیشنهاد می‌کند، اگر فقط می‌خواهید [*مقدار اولیه* را مشخص کنید،](#providing-an-initial-value-for-an-input) به‌جای آن `defaultValue` را پاس دهید:

```js
// ✅ Good: uncontrolled input with an initial value
<input defaultValue={something} />
```

اگر می‌خواهید [این ورودی را با یک متغیر استیت کنترل کنید،](#controlling-an-input-with-a-state-variable) یک هندلر `onChange` مشخص کنید:

```js
// ✅ Good: controlled input with onChange
<input value={something} onChange={e => setSomething(e.target.value)} />
```

اگر مقدار عمداً فقط‌خواندنی است، یک پراپس `readOnly` اضافه کنید تا خطا را خاموش کنید:

```js
// ✅ Good: readonly controlled input without on change
<input value={something} readOnly={true} />
```

---

### چک‌باکس من هنگام کلیک روی آن به‌روز نمی‌شود {/*my-checkbox-doesnt-update-when-i-click-on-it*/}

اگر چک‌باکس را با `checked` اما بدون `onChange` رندر کنید، در کنسول خطایی خواهید دید:

```js
// 🔴 Bug: controlled checkbox with no onChange handler
<input type="checkbox" checked={something} />
```

<ConsoleBlock level="error">

You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

</ConsoleBlock>

همانطور که پیام خطا پیشنهاد می‌کند، اگر فقط می‌خواهید [*مقدار اولیه* را مشخص کنید،](#providing-an-initial-value-for-an-input) به‌جای آن `defaultChecked` را پاس دهید:

```js
// ✅ Good: uncontrolled checkbox with an initial value
<input type="checkbox" defaultChecked={something} />
```

اگر می‌خواهید [این چک‌باکس را با یک متغیر استیت کنترل کنید،](#controlling-an-input-with-a-state-variable) یک هندلر `onChange` مشخص کنید:

```js
// ✅ Good: controlled checkbox with onChange
<input type="checkbox" checked={something} onChange={e => setSomething(e.target.checked)} />
```

<Pitfall>

برای چک‌باکس‌ها باید `e.target.checked` را به‌جای `e.target.value` بخوانید.

</Pitfall>

اگر چک‌باکس عمداً فقط‌خواندنی است، یک پراپس `readOnly` اضافه کنید تا خطا را خاموش کنید:

```js
// ✅ Good: readonly controlled input without on change
<input type="checkbox" checked={something} readOnly={true} />
```

---

### مکان‌نمای ورودی من در هر فشردن کلید به ابتدا می‌پرد {/*my-input-caret-jumps-to-the-beginning-on-every-keystroke*/}

اگر [یک ورودی را کنترل می‌کنید،](#controlling-an-input-with-a-state-variable) باید متغیر استیت آن را در طول `onChange` به مقدار ورودی از DOM به‌روز کنید.

نمی‌توانید آن را به چیزی غیر از `e.target.value` (یا `e.target.checked` برای چک‌باکس‌ها) به‌روز کنید:

```js
function handleChange(e) {
  // 🔴 Bug: updating an input to something other than e.target.value
  setFirstName(e.target.value.toUpperCase());
}
```

همچنین نمی‌توانید آن را به‌صورت ناهمگام به‌روز کنید:

```js
function handleChange(e) {
  // 🔴 Bug: updating an input asynchronously
  setTimeout(() => {
    setFirstName(e.target.value);
  }, 100);
}
```

برای رفع کد خود، آن را به‌طور همگام به `e.target.value` به‌روز کنید:

```js
function handleChange(e) {
  // ✅ Updating a controlled input to e.target.value synchronously
  setFirstName(e.target.value);
}
```

اگر این مشکل را حل نکرد، ممکن است ورودی در هر فشردن کلید از DOM حذف و دوباره اضافه شود. این می‌تواند اتفاق بیفتد اگر به‌طور تصادفی [استیت را در هر رندر مجدد بازنشانی می‌کنید](/learn/preserving-and-resetting-state)، مثلاً اگر ورودی یا یکی از والدینش همیشه ویژگی `key` متفاوتی دریافت کند، یا اگر تعریف‌های تابع کامپوننت را تودرتو کنید (که پشتیبانی نمی‌شود و باعث می‌شود کامپوننت «داخلی» همیشه یک درخت متفاوت در نظر گرفته شود).

---

### خطایی دریافت می‌کنم: «A component is changing an uncontrolled input to be controlled» {/*im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled*/}


اگر یک `value` به کامپوننت ارائه می‌دهید، باید در طول عمر خود رشته باقی بماند.

نمی‌توانید ابتدا `value={undefined}` و بعد `value="some string"` پاس دهید زیرا ری‌اکت نمی‌داند آیا می‌خواهید کامپوننت غیرکنترلی یا کنترلی باشد. یک کامپوننت کنترلی باید همیشه یک `value` رشته‌ای دریافت کند، نه `null` یا `undefined`.

اگر `value` شما از یک API یا متغیر استیت می‌آید، ممکن است به `null` یا `undefined` مقداردهی اولیه شده باشد. در این حالت، یا آن را در ابتدا به یک رشتهٔ خالی (`''`) تنظیم کنید، یا `value={someValue ?? ''}` را پاس دهید تا اطمینان حاصل شود `value` یک رشته است.

به‌طور مشابه، اگر `checked` را به یک چک‌باکس پاس می‌دهید، اطمینان حاصل کنید همیشه یک مقدار بولی است.
