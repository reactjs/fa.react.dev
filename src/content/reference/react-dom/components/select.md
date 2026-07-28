---
title: "<select>"
---

<Intro>

[کامپوننت `<select>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) به شما اجازه می‌دهد یک select box با گزینه‌ها رندر کنید.

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<select>` {/*select*/}

برای نمایش یک select box، [کامپوننت `<select>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) را رندر کنید.

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*props*/}

`<select>` از تمام [پراپس‌های رایج المان](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

شما می‌توانید یک select box را [کنترل‌شده](#controlling-a-select-box-with-a-state-variable) کنید با پاس‌دادن پراپس `value`:

* `value`: یک رشته (یا آرایه‌ای از رشته‌ها برای [`multiple={true}`](#enabling-multiple-selection)). کنترل می‌کند کدام گزینه انتخاب شده است. هر رشتهٔ مقدار باید با `value` یکی از `<option>`‌های تودرتو درون `<select>` مطابقت داشته باشد.

وقتی `value` را پاس می‌دهید، باید یک هندلر `onChange` نیز پاس دهید که مقدار پاس‌شده را به‌روز می‌کند.

اگر `<select>` شما غیرکنترلی (uncontrolled) است، می‌توانید به‌جای آن پراپس `defaultValue` را پاس دهید:

* `defaultValue`: یک رشته (یا آرایه‌ای از رشته‌ها برای [`multiple={true}`](#enabling-multiple-selection)). [گزینهٔ انتخاب‌شدهٔ اولیه](#providing-an-initially-selected-option) را مشخص می‌کند.

این پراپس‌های `<select>` هم برای select box‌های غیرکنترلی و هم کنترلی مرتبط هستند:

* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#autocomplete): یک رشته. یکی از [رفتارهای تکمیل خودکار](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values) ممکن را مشخص می‌کند.
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#autofocus): یک مقدار بولی. اگر `true` باشد، ری‌اکت المان را هنگام mount متمرکز می‌کند.
* `children`: `<select>` کامپوننت‌های [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option)، [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) و [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) را به‌عنوان فرزند می‌پذیرد. می‌توانید کامپوننت‌های خودتان را نیز پاس دهید تا زمانی که در نهایت یکی از کامپوننت‌های مجاز را رندر کنند. اگر کامپوننت‌های خودتان را پاس می‌دهید که در نهایت تگ‌های `<option>` رندر می‌کنند، هر `<option>` که رندر می‌کنید باید یک `value` داشته باشد.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#disabled): یک مقدار بولی. اگر `true` باشد، select box تعاملی نخواهد بود و کمرنگ به‌نظر می‌رسد.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#form): یک رشته. `id` فرم `<form>` که این select box به آن تعلق دارد را مشخص می‌کند. اگر حذف شود، نزدیک‌ترین فرم والد است.
* [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#multiple): یک مقدار بولی. اگر `true` باشد، مرورگر اجازهٔ [انتخاب چندگانه](#enabling-multiple-selection) می‌دهد.
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#name): یک رشته. نام این select box را که [با فرم ارسال می‌شود](#reading-the-select-box-value-when-submitting-a-form) مشخص می‌کند.
* `onChange`: یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). برای [select box‌های کنترلی](#controlling-a-select-box-with-a-state-variable) الزامی است. بلافاصله وقتی کاربر گزینهٔ متفاوتی انتخاب می‌کند فعال می‌شود. مانند [رویداد `input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) مرورگر رفتار می‌کند.
* `onChangeCapture`: نسخه‌ای از `onChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). بلافاصله وقتی مقدار توسط کاربر تغییر می‌کند فعال می‌شود. به دلایل تاریخی، در ری‌اکت رایج است که به‌جای آن از `onChange` استفاده شود که مشابه کار می‌کند.
* `onInputCapture`: نسخه‌ای از `onInput` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). اگر یک ورودی در ارسال فرم اعتبارسنجی نشود فعال می‌شود. برخلاف رویداد بومی `invalid`، رویداد `onInvalid` در ری‌اکت بالا می‌رود (bubble).
* `onInvalidCapture`: نسخه‌ای از `onInvalid` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#required): یک مقدار بولی. اگر `true` باشد، باید مقدار برای ارسال فرم ارائه شود.
* [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#size): یک عدد. برای selectهای `multiple={true}`، تعداد ترجیحی آیتم‌های قابل‌مشاهدهٔ اولیه را مشخص می‌کند.

#### نکات {/*caveats*/}

- برخلاف HTML، پاس‌دادن ویژگی `selected` به `<option>` پشتیبانی نمی‌شود. به‌جای آن، برای select box‌های غیرکنترلی از [`<select defaultValue>`](#providing-an-initially-selected-option) و برای select box‌های کنترلی از [`<select value>`](#controlling-a-select-box-with-a-state-variable) استفاده کنید.
- اگر یک select box پراپس `value` دریافت کند، [به‌عنوان کنترلی در نظر گرفته می‌شود.](#controlling-a-select-box-with-a-state-variable)
- یک select box نمی‌تواند هم‌زمان هم کنترلی و هم غیرکنترلی باشد.
- یک select box نمی‌تواند در طول عمر خود بین کنترلی یا غیرکنترلی بودن جابجا شود.
- هر select box کنترلی به یک هندلر رویداد `onChange` نیاز دارد که مقدار پشتیبان آن را به‌طور همگام به‌روز می‌کند.

---

## استفاده {/*usage*/}

### نمایش یک select box با گزینه‌ها {/*displaying-a-select-box-with-options*/}

یک `<select>` با فهرستی از کامپوننت‌های `<option>` درون آن رندر کنید تا یک select box نمایش دهید. به هر `<option>` یک `value` بدهید که داده‌های ارسالی با فرم را نشان می‌دهد.

<Sandpack>

```js
export default function FruitPicker() {
  return (
    <label>
      Pick a fruit:
      <select name="selectedFruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </label>
  );
}
```

```css
select { margin: 5px; }
```

</Sandpack>  

---

### ارائهٔ برچسب برای یک select box {/*providing-a-label-for-a-select-box*/}

معمولاً، هر `<select>` را درون یک تگ [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) قرار می‌دهید. این به مرورگر می‌گوید که این برچسب با آن select box مرتبط است. وقتی کاربر روی برچسب کلیک می‌کند، مرورگر به‌طور خودکار select box را متمرکز می‌کند. این برای دسترس‌پذیری نیز ضروری است: یک صفحه‌خوان برچسب را وقتی کاربر select box را متمرکز می‌کند اعلام می‌کند.

اگر نمی‌توانید `<select>` را درون `<label>` تودرتو کنید، با پاس‌دادن همان ID به `<select id>` و [`<label htmlFor>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) آن‌ها را مرتبط کنید. برای جلوگیری از تداخل بین نمونه‌های متعدد یک کامپوننت، چنین ID‌ای را با [`useId`](/reference/react/useId) تولید کنید.

<Sandpack>

```js
import { useId } from 'react';

export default function Form() {
  const vegetableSelectId = useId();
  return (
    <>
      <label>
        Pick a fruit:
        <select name="selectedFruit">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <hr />
      <label htmlFor={vegetableSelectId}>
        Pick a vegetable:
      </label>
      <select id={vegetableSelectId} name="selectedVegetable">
        <option value="cucumber">Cucumber</option>
        <option value="corn">Corn</option>
        <option value="tomato">Tomato</option>
      </select>
    </>
  );
}
```

```css
select { margin: 5px; }
```

</Sandpack>


---

### ارائهٔ یک گزینهٔ انتخاب‌شدهٔ اولیه {/*providing-an-initially-selected-option*/}

به‌طور پیش‌فرض، مرورگر اولین `<option>` در فهرست را انتخاب می‌کند. برای انتخاب یک گزینهٔ متفاوت به‌صورت پیش‌فرض، `value` آن `<option>` را به‌عنوان `defaultValue` به المان `<select>` پاس دهید.

<Sandpack>

```js
export default function FruitPicker() {
  return (
    <label>
      Pick a fruit:
      <select name="selectedFruit" defaultValue="orange">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </label>
  );
}
```

```css
select { margin: 5px; }
```

</Sandpack>  

<Pitfall>

برخلاف HTML، پاس‌دادن ویژگی `selected` به یک `<option>` خاص پشتیبانی نمی‌شود.

</Pitfall>

---

### فعال کردن انتخاب چندگانه {/*enabling-multiple-selection*/}

برای اجازه دادن به کاربر برای انتخاب چند گزینه، `multiple={true}` را به `<select>` پاس دهید. در این حالت، اگر `defaultValue` را برای انتخاب گزینه‌های انتخاب‌شدهٔ اولیه نیز مشخص کنید، باید یک آرایه باشد.

<Sandpack>

```js
export default function FruitPicker() {
  return (
    <label>
      Pick some fruits:
      <select
        name="selectedFruit"
        defaultValue={['orange', 'banana']}
        multiple={true}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </label>
  );
}
```

```css
select { display: block; margin-top: 10px; width: 200px; }
```

</Sandpack>

---

### خواندن مقدار select box هنگام ارسال فرم {/*reading-the-select-box-value-when-submitting-a-form*/}

یک [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) به دور select box خود با یک [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) درون آن اضافه کنید. این هندلر رویداد `<form onSubmit>` شما را فراخوانی خواهد کرد. به‌طور پیش‌فرض، مرورگر داده‌های فرم را به URL فعلی ارسال کرده و صفحه را بازخوانی می‌کند. می‌توانید با فراخوانی `e.preventDefault()` این رفتار را بازنویسی کنید. داده‌های فرم را با [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) بخوانید.
<Sandpack>

```js
export default function EditPost() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });
    // You can generate a URL out of it, as the browser does by default:
    console.log(new URLSearchParams(formData).toString());
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // (!) This doesn't include multiple select values
    // Or you can get an array of name-value pairs.
    console.log([...formData.entries()]);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Pick your favorite fruit:
        <select name="selectedFruit" defaultValue="orange">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <label>
        Pick all your favorite vegetables:
        <select
          name="selectedVegetables"
          multiple={true}
          defaultValue={['corn', 'tomato']}
        >
          <option value="cucumber">Cucumber</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
      </label>
      <hr />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

```css
label, select { display: block; }
label { margin-bottom: 20px; }
```

</Sandpack>

<Note>

به `<select>` خود یک `name` بدهید، مثلاً `<select name="selectedFruit" />`. نامی که مشخص کرده‌اید به‌عنوان کلید در داده‌های فرم استفاده خواهد شد، مثلاً `{ selectedFruit: "orange" }`.

اگر از `<select multiple={true}>` استفاده می‌کنید، [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)‌ای که از فرم می‌خوانید شامل هر مقدار انتخاب‌شده به‌عنوان یک جفت نام-مقدار جداگانه خواهد بود. به کنسول‌ها در مثال بالا دقیق نگاه کنید.

</Note>

<Pitfall>

به‌طور پیش‌فرض، *هر* `<button>` درون `<form>` آن را ارسال می‌کند. این می‌تواند شگفت‌آور باشد! اگر یک کامپوننت `Button` اختصاصی ری‌اکت دارید، استفاده از [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) به‌جای `<button>` را در نظر بگیرید. سپس، برای صراحت، از `<button type="submit">` برای دکمه‌هایی استفاده کنید که *باید* فرم را ارسال کنند.

</Pitfall>

---

### کنترل یک select box با متغیر استیت {/*controlling-a-select-box-with-a-state-variable*/}

یک select box مانند `<select />` *غیرکنترلی* است. حتی اگر [مقدار انتخاب‌شدهٔ اولیه‌ای پاس دهید](#providing-an-initially-selected-option) مانند `<select defaultValue="orange" />`، JSX شما فقط مقدار اولیه را مشخص می‌کند، نه مقدار فعلی.

**برای رندر یک select box _کنترلی_، پراپس `value` را به آن پاس دهید.** ری‌اکت select box را مجبور می‌کند همیشه `value`‌ای که پاس داده‌اید را داشته باشد. معمولاً، شما یک select box را با تعریف یک [متغیر استیت](/reference/react/useState) کنترل می‌کنید:

```js {2,6,7}
function FruitPicker() {
  const [selectedFruit, setSelectedFruit] = useState('orange'); // Declare a state variable...
  // ...
  return (
    <select
      value={selectedFruit} // ...force the select's value to match the state variable...
      onChange={e => setSelectedFruit(e.target.value)} // ... and update the state variable on any change!
    >
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </select>
  );
}
```

این مفید است اگر می‌خواهید در پاسخ به هر انتخاب بخشی از رابط کاربری را دوباره رندر کنید.

<Sandpack>

```js
import { useState } from 'react';

export default function FruitPicker() {
  const [selectedFruit, setSelectedFruit] = useState('orange');
  const [selectedVegs, setSelectedVegs] = useState(['corn', 'tomato']);
  return (
    <>
      <label>
        Pick a fruit:
        <select
          value={selectedFruit}
          onChange={e => setSelectedFruit(e.target.value)}
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <hr />
      <label>
        Pick all your favorite vegetables:
        <select
          multiple={true}
          value={selectedVegs}
          onChange={e => {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            setSelectedVegs(values);
          }}
        >
          <option value="cucumber">Cucumber</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
      </label>
      <hr />
      <p>Your favorite fruit: {selectedFruit}</p>
      <p>Your favorite vegetables: {selectedVegs.join(', ')}</p>
    </>
  );
}
```

```css
select { margin-bottom: 10px; display: block; }
```

</Sandpack>

<Pitfall>

**اگر `value` را بدون `onChange` پاس دهید، انتخاب یک گزینه غیرممکن خواهد بود.** وقتی یک select box را با پاس‌دادن یک `value` کنترل می‌کنید، آن را *مجبور* می‌کنید همیشه مقداری که پاس داده‌اید را داشته باشد. بنابراین اگر یک متغیر استیت را به‌عنوان `value` پاس می‌دهید اما فراموش می‌کنید آن متغیر استیت را به‌طور همگام در طول هندلر رویداد `onChange` به‌روز کنید، ری‌اکت select box را پس از هر فشردن کلید به `value`‌ای که مشخص کرده‌اید بازگرداند.

برخلاف HTML، پاس‌دادن ویژگی `selected` به یک `<option>` خاص پشتیبانی نمی‌شود.

</Pitfall>
