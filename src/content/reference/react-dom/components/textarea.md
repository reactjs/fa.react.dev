---
title: "<textarea>"
---

<Intro>

[کامپوننت `<textarea>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) به شما اجازه می‌دهد یک ورودی متنی چندخطی رندر کنید.

```js
<textarea />
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<textarea>` {/*textarea*/}

برای نمایش یک text area، [کامپوننت `<textarea>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) را رندر کنید.

```js
<textarea name="postContent" />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس‌ها {/*props*/}

`<textarea>` از تمام [پراپس‌های رایج المان](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

شما می‌توانید یک text area را [کنترل‌شده](#controlling-a-text-area-with-a-state-variable) کنید با پاس‌دادن پراپس `value`:

* `value`: یک رشته. متن درون text area را کنترل می‌کند.

وقتی `value` را پاس می‌دهید، باید یک هندلر `onChange` نیز پاس دهید که مقدار پاس‌شده را به‌روز می‌کند.

اگر `<textarea>` شما غیرکنترلی (uncontrolled) است، می‌توانید به‌جای آن پراپس `defaultValue` را پاس دهید:

* `defaultValue`: یک رشته. [مقدار اولیه](#providing-an-initial-value-for-a-text-area) را برای یک text area مشخص می‌کند.

این پراپس‌های `<textarea>` هم برای text area‌های غیرکنترلی و هم کنترلی مرتبط هستند:

* [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autocomplete): یا `'on'` یا `'off'`. رفتار تکمیل خودکار را مشخص می‌کند.
* [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#autofocus): یک مقدار بولی. اگر `true` باشد، ری‌اکت المان را هنگام mount متمرکز می‌کند.
* `children`: `<textarea>` فرزندی نمی‌پذیرد. برای تنظیم مقدار اولیه، از `defaultValue` استفاده کنید.
* [`cols`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols): یک عدد. عرض پیش‌فرض را بر اساس میانگین عرض کاراکترها مشخص می‌کند. پیش‌فرض `20` است.
* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#disabled): یک مقدار بولی. اگر `true` باشد، ورودی تعاملی نخواهد بود و کمرنگ به‌نظر می‌رسد.
* [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#form): یک رشته. `id` فرم `<form>` که این ورودی به آن تعلق دارد را مشخص می‌کند. اگر حذف شود، نزدیک‌ترین فرم والد است.
* [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#maxlength): یک عدد. حداکثر طول متن را مشخص می‌کند.
* [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#minlength): یک عدد. حداقل طول متن را مشخص می‌کند.
* [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): یک رشته. نام این ورودی را که [با فرم ارسال می‌شود](#reading-the-textarea-value-when-submitting-a-form) مشخص می‌کند.
* `onChange`: یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). برای [text area‌های کنترلی](#controlling-a-text-area-with-a-state-variable) الزامی است. بلافاصله وقتی مقدار ورودی توسط کاربر تغییر می‌کند فعال می‌شود (مثلاً با هر فشردن کلید فعال می‌شود). مانند [رویداد `input`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) مرورگر رفتار می‌کند.
* `onChangeCapture`: نسخه‌ای از `onChange` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). بلافاصله وقتی مقدار توسط کاربر تغییر می‌کند فعال می‌شود. به دلایل تاریخی، در ری‌اکت رایج است که به‌جای آن از `onChange` استفاده شود که مشابه کار می‌کند.
* `onInputCapture`: نسخه‌ای از `onInput` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). اگر یک ورودی در ارسال فرم اعتبارسنجی نشود فعال می‌شود. برخلاف رویداد بومی `invalid`، رویداد `onInvalid` در ری‌اکت بالا می‌رود (bubble).
* `onInvalidCapture`: نسخه‌ای از `onInvalid` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/select_event): یک [تابع هندلر `Event`](/reference/react-dom/components/common#event-handler). پس از تغییر انتخاب درون `<textarea>` فعال می‌شود. ری‌اکت رویداد `onSelect` را گسترش می‌دهد تا برای انتخاب‌های خالی و هنگام ویرایش‌ها (که ممکن است بر انتخاب تأثیر بگذارد) نیز فعال شود.
* `onSelectCapture`: نسخه‌ای از `onSelect` که در [فاز capture](/learn/responding-to-events#capture-phase-events) فعال می‌شود.
* [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#placeholder): یک رشته. با رنگی کمرنگ نمایش داده می‌شود وقتی مقدار text area خالی است.
* [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#readonly): یک مقدار بولی. اگر `true` باشد، text area توسط کاربر قابل‌ویرایش نیست.
* [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#required): یک مقدار بولی. اگر `true` باشد، باید مقدار برای ارسال فرم ارائه شود.
* [`rows`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows): یک عدد. ارتفاع پیش‌فرض را بر اساس میانگین ارتفاع کاراکترها مشخص می‌کند. پیش‌فرض `2` است.
* [`wrap`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#wrap): یا `'hard'`، `'soft'`، یا `'off'`. مشخص می‌کند که متن باید هنگام ارسال فرم چگونه wrap شود.

#### نکات {/*caveats*/}

- پاس‌دادن فرزندانی مانند `<textarea>something</textarea>` مجاز نیست. [برای محتوای اولیه از `defaultValue` استفاده کنید.](#providing-an-initial-value-for-a-text-area)
- اگر یک text area پراپس `value` رشته‌ای دریافت کند، [به‌عنوان کنترلی در نظر گرفته می‌شود.](#controlling-a-text-area-with-a-state-variable)
- یک text area نمی‌تواند هم‌زمان هم کنترلی و هم غیرکنترلی باشد.
- یک text area نمی‌تواند در طول عمر خود بین کنترلی یا غیرکنترلی بودن جابجا شود.
- هر text area کنترلی به یک هندلر رویداد `onChange` نیاز دارد که مقدار پشتیبان آن را به‌طور همگام به‌روز می‌کند.

---

## استفاده {/*usage*/}

### نمایش یک text area {/*displaying-a-text-area*/}

برای نمایش یک text area، `<textarea>` را رندر کنید. می‌توانید با ویژگی‌های [`rows`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#rows) و [`cols`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#cols) اندازهٔ پیش‌فرض آن را مشخص کنید، اما به‌طور پیش‌فرض کاربر می‌تواند آن را تغییر اندازه دهد. برای غیرفعال کردن تغییر اندازه، می‌توانید `resize: none` را در CSS مشخص کنید.

<Sandpack>

```js
export default function NewPost() {
  return (
    <label>
      Write your post:
      <textarea name="postContent" rows={4} cols={40} />
    </label>
  );
}
```

```css
input { margin-left: 5px; }
textarea { margin-top: 10px; }
label { margin: 10px; }
label, textarea { display: block; }
```

</Sandpack>

---

### ارائهٔ برچسب برای یک text area {/*providing-a-label-for-a-text-area*/}

معمولاً، هر `<textarea>` را درون یک تگ [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) قرار می‌دهید. این به مرورگر می‌گوید که این برچسب با آن text area مرتبط است. وقتی کاربر روی برچسب کلیک می‌کند، مرورگر text area را متمرکز می‌کند. این برای دسترس‌پذیری نیز ضروری است: یک صفحه‌خوان برچسب را وقتی کاربر text area را متمرکز می‌کند اعلام می‌کند.

اگر نمی‌توانید `<textarea>` را درون `<label>` تودرتو کنید، با پاس‌دادن همان ID به `<textarea id>` و [`<label htmlFor>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) آن‌ها را مرتبط کنید. برای جلوگیری از تداخل بین نمونه‌های یک کامپوننت، چنین ID‌ای را با [`useId`](/reference/react/useId) تولید کنید.

<Sandpack>

```js
import { useId } from 'react';

export default function Form() {
  const postTextAreaId = useId();
  return (
    <>
      <label htmlFor={postTextAreaId}>
        Write your post:
      </label>
      <textarea
        id={postTextAreaId}
        name="postContent"
        rows={4}
        cols={40}
      />
    </>
  );
}
```

```css
input { margin: 5px; }
```

</Sandpack>

---

### ارائهٔ مقدار اولیه برای یک text area {/*providing-an-initial-value-for-a-text-area*/}

شما می‌توانید به‌صورت اختیاری مقدار اولیه‌ای را برای text area مشخص کنید. آن را به‌عنوان رشتهٔ `defaultValue` پاس دهید.

<Sandpack>

```js
export default function EditPost() {
  return (
    <label>
      Edit your post:
      <textarea
        name="postContent"
        defaultValue="I really enjoyed biking yesterday!"
        rows={4}
        cols={40}
      />
    </label>
  );
}
```

```css
input { margin-left: 5px; }
textarea { margin-top: 10px; }
label { margin: 10px; }
label, textarea { display: block; }
```

</Sandpack>

<Pitfall>

برخلاف HTML، پاس‌دادن متن اولیه مانند `<textarea>Some content</textarea>` پشتیبانی نمی‌شود.

</Pitfall>

---

### خواندن مقدار text area هنگام ارسال فرم {/*reading-the-text-area-value-when-submitting-a-form*/}

یک [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) به دور textarea خود با یک [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) درون آن اضافه کنید. این هندلر رویداد `<form onSubmit>` شما را فراخوانی خواهد کرد. به‌طور پیش‌فرض، مرورگر داده‌های فرم را به URL فعلی ارسال کرده و صفحه را بازخوانی می‌کند. می‌توانید با فراخوانی `e.preventDefault()` این رفتار را بازنویسی کنید. داده‌های فرم را با [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) بخوانید.
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

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Post title: <input name="postTitle" defaultValue="Biking" />
      </label>
      <label>
        Edit your post:
        <textarea
          name="postContent"
          defaultValue="I really enjoyed biking yesterday!"
          rows={4}
          cols={40}
        />
      </label>
      <hr />
      <button type="reset">Reset edits</button>
      <button type="submit">Save post</button>
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

به `<textarea>` خود یک `name` بدهید، مثلاً `<textarea name="postContent" />`. نامی که مشخص کرده‌اید به‌عنوان کلید در داده‌های فرم استفاده خواهد شد، مثلاً `{ postContent: "Your post" }`.

</Note>

<Pitfall>

به‌طور پیش‌فرض، *هر* `<button>` درون `<form>` آن را ارسال می‌کند. این می‌تواند شگفت‌آور باشد! اگر یک کامپوننت `Button` اختصاصی ری‌اکت دارید، استفاده از [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) به‌جای `<button>` را در نظر بگیرید. سپس، برای صراحت، از `<button type="submit">` برای دکمه‌هایی استفاده کنید که *باید* فرم را ارسال کنند.

</Pitfall>

---

### کنترل یک text area با متغیر استیت {/*controlling-a-text-area-with-a-state-variable*/}

یک text area مانند `<textarea />` *غیرکنترلی* است. حتی اگر [مقدار اولیه‌ای پاس دهید](#providing-an-initial-value-for-a-text-area) مانند `<textarea defaultValue="Initial text" />`، JSX شما فقط مقدار اولیه را مشخص می‌کند، نه مقدار فعلی.

**برای رندر یک text area _کنترلی_، پراپس `value` را به آن پاس دهید.** ری‌اکت text area را مجبور می‌کند همیشه `value`‌ای که پاس داده‌اید را داشته باشد. معمولاً، شما یک text area را با تعریف یک [متغیر استیت](/reference/react/useState) کنترل می‌کنید:

```js {2,6,7}
function NewPost() {
  const [postContent, setPostContent] = useState(''); // Declare a state variable...
  // ...
  return (
    <textarea
      value={postContent} // ...force the input's value to match the state variable...
      onChange={e => setPostContent(e.target.value)} // ... and update the state variable on any edits!
    />
  );
}
```

این مفید است اگر می‌خواهید در پاسخ به هر فشردن کلید بخشی از رابط کاربری را دوباره رندر کنید.

<Sandpack>

```js
import { useState } from 'react';
import MarkdownPreview from './MarkdownPreview.js';

export default function MarkdownEditor() {
  const [postContent, setPostContent] = useState('_Hello,_ **Markdown**!');
  return (
    <>
      <label>
        Enter some markdown:
        <textarea
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
      </label>
      <hr />
      <MarkdownPreview markdown={postContent} />
    </>
  );
}
```

```js src/MarkdownPreview.js
import { Remarkable } from 'remarkable';

const md = new Remarkable();

export default function MarkdownPreview({ markdown }) {
  const renderedHTML = md.render(markdown);
  return <div dangerouslySetInnerHTML={{__html: renderedHTML}} />;
}
```

```json package.json
{
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "remarkable": "2.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
textarea { display: block; margin-top: 5px; margin-bottom: 10px; }
```

</Sandpack>

<Pitfall>

**اگر `value` را بدون `onChange` پاس دهید، تایپ در text area غیرممکن خواهد بود.** وقتی یک text area را با پاس‌دادن یک `value` کنترل می‌کنید، آن را *مجبور* می‌کنید همیشه مقداری که پاس داده‌اید را داشته باشد. بنابراین اگر یک متغیر استیت را به‌عنوان `value` پاس می‌دهید اما فراموش می‌کنید آن متغیر استیت را به‌طور همگام در طول هندلر رویداد `onChange` به‌روز کنید، ری‌اکت text area را پس از هر فشردن کلید به `value`‌ای که مشخص کرده‌اید بازگرداند.

</Pitfall>

---

## رفع اشکال {/*troubleshooting*/}

### text area من هنگام تایپ در آن به‌روز نمی‌شود {/*my-text-area-doesnt-update-when-i-type-into-it*/}

اگر text area را با `value` اما بدون `onChange` رندر کنید، در کنسول خطایی خواهید دید:

```js
// 🔴 Bug: controlled text area with no onChange handler
<textarea value={something} />
```

<ConsoleBlock level="error">

You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

</ConsoleBlock>

همانطور که پیام خطا پیشنهاد می‌کند، اگر فقط می‌خواهید [*مقدار اولیه* را مشخص کنید،](#providing-an-initial-value-for-a-text-area) به‌جای آن `defaultValue` را پاس دهید:

```js
// ✅ Good: uncontrolled text area with an initial value
<textarea defaultValue={something} />
```

اگر می‌خواهید [این text area را با یک متغیر استیت کنترل کنید،](#controlling-a-text-area-with-a-state-variable) یک هندلر `onChange` مشخص کنید:

```js
// ✅ Good: controlled text area with onChange
<textarea value={something} onChange={e => setSomething(e.target.value)} />
```

اگر مقدار عمداً فقط‌خواندنی است، یک پراپس `readOnly` اضافه کنید تا خطا را خاموش کنید:

```js
// ✅ Good: readonly controlled text area without on change
<textarea value={something} readOnly={true} />
```

---

### مکان‌نمای text area من در هر فشردن کلید به ابتدا می‌پرد {/*my-text-area-caret-jumps-to-the-beginning-on-every-keystroke*/}

اگر [یک text area را کنترل می‌کنید،](#controlling-a-text-area-with-a-state-variable) باید متغیر استیت آن را در طول `onChange` به مقدار text area از DOM به‌روز کنید.

نمی‌توانید آن را به چیزی غیر از `e.target.value` به‌روز کنید:

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

اگر این مشکل را حل نکرد، ممکن است text area در هر فشردن کلید از DOM حذف و دوباره اضافه شود. این می‌تواند اتفاق بیفتد اگر به‌طور تصادفی [استیت را در هر رندر مجدد بازنشانی می‌کنید](/learn/preserving-and-resetting-state). مثلاً، این می‌تواند اتفاق بیفتد اگر text area یا یکی از والدینش همیشه ویژگی `key` متفاوتی دریافت کند، یا اگر تعریف‌های کامپوننت را تودرتو کنید (که در ری‌اکت مجاز نیست و باعث می‌شود کامپوننت «داخلی» در هر رندر مجدداً mount شود).

---

### خطایی دریافت می‌کنم: «A component is changing an uncontrolled input to be controlled» {/*im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled*/}


اگر یک `value` به کامپوننت ارائه می‌دهید، باید در طول عمر خود رشته باقی بماند.

نمی‌توانید ابتدا `value={undefined}` و بعد `value="some string"` پاس دهید زیرا ری‌اکت نمی‌داند آیا می‌خواهید کامپوننت غیرکنترلی یا کنترلی باشد. یک کامپوننت کنترلی باید همیشه یک `value` رشته‌ای دریافت کند، نه `null` یا `undefined`.

اگر `value` شما از یک API یا متغیر استیت می‌آید، ممکن است به `null` یا `undefined` مقداردهی اولیه شده باشد. در این حالت، یا آن را در ابتدا به یک رشتهٔ خالی (`''`) تنظیم کنید، یا `value={someValue ?? ''}` را پاس دهید تا اطمینان حاصل شود `value` یک رشته است.
