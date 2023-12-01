---
title: پاسخ به ورودی به کمک state
---

<Intro>
ری اکت یک روش اعلانی برای ایجاد تغییر در رابط کاربری فراهم کرده است.به جای دستکاری مستقیم
هر بخش رابط کاربری به تنهایی،شما state های متفاوتی را که کامپوننت مورد نظرتان می تواند داشته
باشد تعریف کرده،و در پاسخ به ورودی کاربر بین آنها جا به جا شوید.این روش مشابه
دیدگاه طراحان درباره رابط کاربری است.

</Intro>

<YouWillLearn>

* تفاوت برنامه نویسی رابط کاربری اعلانی و برنامه نویسی رابط کاربری دستوری
* برشمردن state های بصری که کامپوننت شما می تواند داشته باشد
* چگونه تغییرات بین state های بصری مختلف را از طریق کد اجرا کنیم؟

</YouWillLearn>

## چگونه رابط کاربری اعلانی با دستوری مقایسه می شود {/*how-declarative-ui-compares-to-imperative*/}

وقتی شما تعاملات رابط کاربری را طراحی می کنید،احتمالا به چگونگی *تغییرات* رابط کاربری در پاسخ به اقدامات کاربر فکر می کنید.فرمی را در نظر بگیرید که امکان ارسال پاسخی را به کاربر می دهد:

* وقتی شما چیزی داخل فرم تایپ می کنید،دکمه "ارسال" **فعال می شود.**
* وقتی شما دکمه "ارسال" را فشار می دهید،دکمه و فرم **غیرفعال میشوند.** و یک اسپینر **ظاهر می شود.**
* اگر درخواست شبکه موفقیت آمیز باشد،فرم **پنهان شده،** و پیام "تشکر" **ظاهر می شود.**
* اگر درخواست شبکه ناموفق باشد، یک پیغام خطا **ظاهر شده،** و فرم دوباره **فعال می شود**.

در **برنامه نویسی دستوری،** موارد فوق مستقیما با نحوه پیاده سازی تعامل توسط شما مرتبط است. شما ملزم هستید که دستورالعمل های دقیق برای دستکاری رابط کاربری بر اساس آنچه رخ می دهد را، بنویسید.روش دیگری برای تصور این موضوع این است که: فرض کنید که در کنار شخصی در یک ماشین سوار می شوید و قدم به قدم به او می گویید که کجا برود.

<Illustration src="/images/docs/illustrations/i_imperative-ui-programming.png"  alt="In a car driven by an anxious-looking person representing JavaScript, a passenger orders the driver to execute a sequence of complicated turn by turn navigations." />

او نمی داند که شما می خواهید به کجا بروید،و تنها دستورات شما را دنبال می کند.(و اگر مسیرها را اشتباه بگیرید، به مقصد اشتباه می رسید!) به این روش،دستوری می گویند زیرا شما باید به هر المنت اعم از اسپینر و دکمه فرمان بدهید و به کامپیوتر بگویید که رابط کاربری را **چگونه** بروزرسانی کند.

در این مثال از برنامه نویسی رابط کاربری دستوری، فرم **بدون استفاده** از ری اکت ساخته می شود؛ و تنها از [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) مرورگر استفاده می کند :

<Sandpack>

```js index.js active
async function handleFormSubmit(e) {
  e.preventDefault();
  disable(textarea);
  disable(button);
  show(loadingMessage);
  hide(errorMessage);
  try {
    await submitForm(textarea.value);
    show(successMessage);
    hide(form);
  } catch (err) {
    show(errorMessage);
    errorMessage.textContent = err.message;
  } finally {
    hide(loadingMessage);
    enable(textarea);
    enable(button);
  }
}

function handleTextareaChange() {
  if (textarea.value.length === 0) {
    disable(button);
  } else {
    enable(button);
  }
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

function enable(el) {
  el.disabled = false;
}

function disable(el) {
  el.disabled = true;
}

function submitForm(answer) {
  // فرض کنید که درخواست به شبکه ارسال می شود.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() == 'istanbul') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      }
    }, 1500);
  });
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <h2>City quiz</h2>
  <p>
    What city is located on two continents?
  </p>
  <textarea id="textarea"></textarea>
  <br />
  <button id="button" disabled>Submit</button>
  <p id="loading" style="display: none">Loading...</p>
  <p id="error" style="display: none; color: red;"></p>
</form>
<h1 id="success" style="display: none">That's right!</h1>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
</style>
```

</Sandpack>

دستکاری رابط کاربری به شکل دستوری برای مثالهای خاص به خوبی عمل می کند،اما مدیریت آن در سیستمهای پیچیده تر بطور تصاعدی دشوارتر می شود.بروزرسانی صفحه ای پر از فرم های مختلف مانند این مورد را در نظر بگیرید.اضافه کردن یک المنت جدید رابط کاربری یا یک تعامل جدید نیازمند بررسی دقیق کدهای موجود است که مطمئن شوید باگ جدیدی تولید نکرده اید (مثلا فراموش کردن نمایش دادن یا پنهان کردن چیزی).

ری اکت به وجود آمد تااین مشکل را حل کند.

در ری اکت، شما مجبور نیستید مستقیما رابط کاربری را دستکاری کنید--به این معنا که فعال کردن،غیرفعال کردن،نمایش، و یا پنهان کردن کامپوننتها را به طور مستقیم انجام نمی دهید. درعوض، شما **چیزی که می خواهید نمایش دهید را اعلام می کنید،** و ری اکت می فهمد چگونه رابط کاربری را بروزرسانی کند.فرض کنید که سوار تاکسی شوید و به جای آنکه به راننده بگویید دقیقا به کدام طرف بپیچد،بگویید که کجا می خواهید بروید.این وظیفه راننده است که شما را به مقصد برساند، وممکن است حتی میانبرهایی را بلد باشد که شما در نظر نگرفته اید!

<Illustration src="/images/docs/illustrations/i_declarative-ui-programming.png" alt="In a car driven by React, a passenger asks to be taken to a specific place on the map. React figures out how to do that." />

## فکر کردن درباره رابط کاربری بصورت اعلانی {/*thinking-about-ui-declaratively*/}

 شما نحوه پیاده سازی یک فرم به صورت دستوری را بالاتر دیدید.برای درک بهتر نحوه تفکر در ری اکت، درزیر به پیاده سازی مجدد این رابط کاربری در ری اکت خواهید پرداخت :

1. state های بصری مختلف کامپوننت خود را **شناسایی کنید**
2. **تعیین کنید** چه چیزی باعث آن تغییرات state می شود
3. state را در حافظه با استفاده از `useState` **نشان دهید**
4. هرگونه متغیر state غیرضروری را **حذف کنید**
5. event handler ها را برای مقداردهی state **متصل کنید**

### قدم اول : state های بصری مختلف کامپوننت خود را شناسایی کنید {/*step-1-identify-your-components-different-visual-states*/}

در علوم کامپیوتر،ممکن است درباره ["state machine"](https://en.wikipedia.org/wiki/ماشین_حالات_متناهی) که در یکی از چندین “states” قرار دارد بشنوید.اگر با یک طراح کار می کنید،ممکن است نمونه هایی برای "state های بصری" مختلف دیده باشید.ری اکت در تقاطع طراحی و علوم کامپیوتر قرار دارد، بنابراین هر دوی این ایده ها منابع الهام هستند.

ابتدا،شما نیاز دارید که تمام "state" های مختلف رابط کاربری را که کاربر ممکن است ببیند را بصری سازی کنید :

* **خالی**: فرم دارای یک دکمه "ارسال" غیرفعال است.
* **در حال تایپ**: فرم دارای یک دکمه "ارسال" فعال است.
* **در حال ارسال**: فرم کاملاً غیرفعال است.اسپینر نمایش داده می شود.
* **موفقیت**: پیام "متشکرم" به جای فرم نمایش داده می شود.
* **خطا**: مانند در حال تایپ، اما با یک پیغام خطای اضافی.

درست مانند یک طراح، قبل از اینکه منطق را اضافه کنید می خواهید برای state های مختلف "نمونه های اولیه" یا "نمونه" ایجاد کنید.برای مثال، در اینجا یک نمونه فقط برای بخش بصری فرم آورده شده است.این نمونه با یک prop به نام `status` با مقدار پیشفرض `'empty'` کنترل می شود:

<Sandpack>

```js
export default function Form({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}
```

</Sandpack>

شما می توانستید آن prop را هرچیزی بنامید، نام گذاری اهمیتی ندارد.`status = 'empty'` را به `status = 'success'` ویرایش کنید تا پیغام موفقیت ظاهر شود.نمونه سازی به شما اجازه می دهد قبل از وارد کردن منطق به کد روی رابط کاربری تکرار انجام دهید. اینجا یک نمونه پیاده سازی بیشتر از همان کامپوننت وجود دارد که همچنان با `status` prop " کنترل می شود":

<Sandpack>

```js
export default function Form({
  // 'submitting', 'error', 'success' را امتحان کنید:
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}
```

```css
.Error { color: red; }
```

</Sandpack>

<DeepDive>

#### نمایش همزمان چندین state بصری {/*displaying-many-visual-states-at-once*/}

اگر یک کامپوننت دارای تعداد زیادی state های بصری باشد،نمایش همه آنها در یک صفحه راحت تر خواهد بود :

<Sandpack>

```js App.js active
import Form from './Form.js';

let statuses = [
  'empty',
  'typing',
  'submitting',
  'success',
  'error',
];

export default function App() {
  return (
    <>
      {statuses.map(status => (
        <section key={status}>
          <h4>Form ({status}):</h4>
          <Form status={status} />
        </section>
      ))}
    </>
  );
}
```

```js Form.js
export default function Form({ status }) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <form>
      <textarea disabled={
        status === 'submitting'
      } />
      <br />
      <button disabled={
        status === 'empty' ||
        status === 'submitting'
      }>
        Submit
      </button>
      {status === 'error' &&
        <p className="Error">
          Good guess but a wrong answer. Try again!
        </p>
      }
    </form>
  );
}
```

```css
section { border-bottom: 1px solid #aaa; padding: 20px; }
h4 { color: #222; }
body { margin: 0; }
.Error { color: red; }
```

</Sandpack>

صفحاتی مانند این اغلب به نام 'living styleguides' یا 'storybooks' شناخته می شوند.

</DeepDive>

### قدم دوم : تعیین کنید چه چیزی باعث آن تغییرات state می شود {/*step-2-determine-what-triggers-those-state-changes*/}

شما می توانید در پاسخ به دو نوع ورودی بروزرسانی های state را فعال کنید:

* **ورودی های کاربر**، مانند کلیک یک دکمه، تایپ کردن در یک فیلد، پیمایش یک پیوند.
* **ورودی های کامپیوتر**، مانند دریافت پاسخ از شبکه، اتمام زمان مقرر، بارگذاری یک تصویر.

<IllustrationBlock>
  <Illustration caption="Human inputs" alt="A finger." src="/images/docs/illustrations/i_inputs1.png" />
  <Illustration caption="Computer inputs" alt="Ones and zeroes." src="/images/docs/illustrations/i_inputs2.png" />
</IllustrationBlock>

در هر دو مورد، **شما باید برای بروزرسانی رابط کاربری [متغیرهای state](/learn/state-a-components-memory#anatomy-of-usestate) را تنظیم کنید.** برای فرمی که در حال توسعه آن هستید، نیاز به تغییر state در پاسخ به چند ورودی متفاوت دارید: 

* **تغییر ورودی متن** (کاربر) باید آن را از state *خالی* به *درحال تایپ* یا برعکس تغییر دهد، بسته به اینکه ورودی متن خالی است یا خیر.
* **کلیک بر روی دکمه ارسال** (کاربر) باید آن را به state *در حال ارسال* تغییر دهد.
* **پاسخ موفق شبکه** (کامپیوتر) باید آن را به state *موفقیت* تغییر دهد.
* **پاسخ ناموفق شبکه** (کامپیوتر) باید آن را به state *خطا* با پیغام خطای متناسب تغییر دهد.

<Note>

توجه کنید که ورودی های کاربر اغلب نیازمند [event handler](/learn/responding-to-events) ها هستند!

</Note>

برای کمک به تصویر سازی این گردش کار، سعی کنید هر state را به عنوان یک دایره برچسب دار، و هر تغییر بین دو state را به عنوان یک پیکان ترسیم کنید.به این ترتیب می توانید چندین گردش کار را ترسیم کرده و باگ ها را قبل از پیاده سازی حل کنید.

<DiagramGroup>

<Diagram name="responding_to_input_flow" height={350} width={688} alt="Flow chart moving left to right with 5 nodes. The first node labeled 'empty' has one edge labeled 'start typing' connected to a node labeled 'typing'. That node has one edge labeled 'press submit' connected to a node labeled 'submitting', which has two edges. The left edge is labeled 'network error' connecting to a node labeled 'error'. The right edge is labeled 'network success' connecting to a node labeled 'success'.">

state های فرم

</Diagram>

</DiagramGroup>

### قدم سوم:  state را در حافظه با استفاده از `useState` نشان دهید {/*step-3-represent-the-state-in-memory-with-usestate*/}

حال شما باید state های بصری کامپوننت خود را در حافظه با [`useState`](/reference/react/useState) نشان دهید. سادگی کلید است: هر قطعه state یک "قطعه متحرک" است، و **شما کمترین تعداد "قطعه متحرک" ممکن را می خواهید.** پیچیدگی بیشتر به باگهای بیشتر منجر می شود!

با state ای شروع کنید که *حتما باید* وجود داشته باشد. مثلا، شما به `answer` برای ذخیره ورودی، و به `error`(اگر موجود باشد) برای ذخیره آخرین error نیاز دارید:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
```

سپس، شما نیاز به یک متغیر state دارید که نمایانگر state های بصری که می خواهید نمایش داده شوند باشد. معمولا بیش از یک راه برای نمایش آن در حافظه وجود دارد،پس شما باید با آن آزمایش کنید.

اگر شما در تلاش هستید که به سرعت به بهترین راه دست یابید با افزودن تعداد کافی state آغاز کنید که *قطعا* مطمئن باشید تمام حالات بصری ممکن پوشش داده شده است:

```js
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

احتمالا اولین ایده شما بهترین نخواهد بود، اما اشکالی ندارد--بازسازی state بخشی از فرایند است!

### قدم چهارم: هرگونه متغیر state  غیرضروری را حذف کنید {/*step-4-remove-any-non-essential-state-variables*/}

شما می خواهید از تکرار محتوای state جلوگیری کنید بنابراین فقط چیزی که ضروری است را دنبال می کنید. صرف زمان اندک روی بازسازی ساختار state باعث فهم ساده تر کامپوننت شما، کاهش تکرار، و اجتناب از معانی ناخواسته خواهد شد. هدف شما **جلوگیری از مواردی است که state موجود در حافظه، رابط کاربری صحیحی که شما بخواهید کاربر ببیند را نمایش نمی دهد.** (مثلا، شما هرگز نمی خواهید که همزمان پیغام خطا نمایش داده شود و فیلد ورودی هم غیرفعال باشد، یا کاربر قادر به تصحیح خطا نباشد!)

اینجا تعدادی پرسش وجود دارد که می توانید درباره متغیرهای state بپرسید:

* **آیا این state باعث تناقض می شود؟** مثلا، `isTyping` و `isSubmitting` نمیتوانند همزمان `true` باشند. یک تناقض معمولا به این معناست که یک state به اندازه کافی محدود نیست. چهار ترکیب ممکن از دو مقدار بولین وجود دارد، اما تنها سه مورد با state های معتبر مطابقت دارند. برای حذف state "غیرممکن"، می توانید این موارد را در یک `status` ترکیب کنید که باید یکی از این سه مقادیر باشد: `'typing'`، `'submitting'`، یا `'success'`.
* **آیا همان اطلاعات از قبل در state دیگری موجود است؟** یک تناقض دیگر: `isEmpty` و `isTyping` نمی توانند همزمان `true` باشند. با جدا کردن آن ها به عنوان متغیرهای state، خطر عدم هماهنگی بین آنها و تولید باگ وجود دارد. خوشبختانه، شما می توانید `isEmpty` را حذف کنید و به جای آن `answer.length === 0` را بررسی کنید.
* **آیا می توانید همان اطلاعات را از معکوس یک متغیر state دیگر به دست آورید؟** نیازی به `isError` نیست زیرا شما می توانید `error !== null` را به جای آن بررسی کنید.

با جمع بندی این بخش، شما به سه متغیر state *ضروری* محدود شده اید (کاهش یافته از 7!):

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'.
```

شما می‌دانید که این سه متغیر ضروری هستند چرا که نمی‌توانید هیچ‌کدام از آن‌ها را  بدون اینکه عملکرد برنامه را دچار مشکل کنید حذف کنید.

<DeepDive>

#### حذف state های "غیرممکن" با استفاده از یک reducer {/*eliminating-impossible-states-with-a-reducer*/}

این سه متغیر نمایانگری مناسب از state این فرم هستند. اگرچه هنوز برخی از state های میانی وجود دارند که کاملا منطقی نیستند. مثلا، وقتی که `status` `'success'` است یک `error` غیر null منطقی نیست. برای مدلسازی دقیقتر state، شما می توانید [آن را به یک reducer منتقل کنید.](/learn/extracting-state-logic-into-a-reducer) Reducer ها به شما این امکان را می دهند که چندین متغیر state را در یک شی واحد ترکیب کنید و تمامی منطق مربوطه را یکپارچه سازید!

</DeepDive>

### قدم پنجم: event handler ها را برای مقداردهی state متصل کنید {/*step-5-connect-the-event-handlers-to-set-state*/}

در نهایت، event handler هایی را ایجاد کنید که state را بروزرسانی کند. در زیر فرم نهایی، با تمامی event handler های متصل موجود است:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // فرض کنید که درحال ارتباط با شبکه است.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

```css
.Error { color: red; }
```

</Sandpack>

با وجود اینکه این کد طولانی تر از مثال دستوری اصلی است، اما به مراتب حساسیت کمتری دارد. تشریح همه تعاملها به عنوان تغییرات state بعدا به شما اجازه معرفی state های جدید بصری را بدون تاثیر روی موارد موجود می دهد. همچنین به شما اجازه می دهد هرآنچه که باید در هر state نمایش داده شود را بدون تغییر منطق تعامل تغییر دهید.

<Recap>

* برنامه نویسی اعلانی به معنای توصیف رابط کاربری برای هر state بصری به جای مدیریت جزئیات رابط کاربری است (دستوری).
* هنگام توسعه یک کامپوننت:
  1. تمامی state های بصری آن را شناسایی کنید.
  2. تغییرات state توسط عاملهای انسانی و کامپیوتری را تعیین کنید.
  3. state را با استفاده از `useState` مدل کنید.
  4. state های غیرضروری را به منظور اجتناب از باگها و تناقضات حذف کنید.
  5. event handler ها را برای تنظیم state متصل کنید.

</Recap>

<Challenges>

#### حذف و اضافه کردن یک کلاس CSS {/*add-and-remove-a-css-class*/}

طوری برنامه ریزی کنید که با کلیک روی تصویر کلاس CSS `background--active` از `<div>` بیرونی *حذف شود*، اما کلاس `picture--active` به `<img>` *اضافه شود*.کلیک مجدد برروی پس زمینه باید کلاسهای اصلی CSS را بازیابی کند.

از نظر بصری، انتظار می رود که با کلیک روی تصویر، پس زمینه بنفش حذف شود و حاشیه تصویر برجسته شود. کلیک خارج از تصویر باعث برجسته سازی پس زمینه می شود، اما برجستگی حاشیه تصویر را حذف می کند.

<Sandpack>

```js
export default function Picture() {
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }

.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}

.background--active {
  background: #a6b5ff;
}

.picture {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}

.picture--active {
  border: 5px solid #a6b5ff;
}
```

</Sandpack>

<Solution>

این کامپوننت دو نوع state بصری دارد: زمانی که تصویر فعال است، و زمانی که تصویر غیرفعال است:

* زمانی که تصویر فعال است، کلاسهای CSS، `background` و `picture picture--active` هستند.
* زمانی که تصویر غیرفعال است، کلاسهای CSS، `background background--active` و `picture` هستند.

یک متغیر state بولین به تنهایی کافی است تا فعال یا غیرفعال بودن تصویر را نگهداری کند. وظیفه اصلی حذف یا اضافه کردن کلاسهای CSS بود. اگرچه، در ری اکت شما نیاز دارید به جای آنکه المنت های رابط کاربری را *دستکاری کنید* آنچه که می خواهید ببینید را *توصیف کنید*. بنابراین لازم است که هر دو کلاس CSS را براساس state فعلی محاسبه کنید. همچنین شما باید [انتشار را متوقف کنید](/learn/responding-to-events#stopping-propagation) تا کلیک روی تصویر به عنوان کلیک بر روی پس زمینه ثبت نگردد.

بررسی کنید که این نسخه با کلیک بر روی تصویر و سپس خارج از آن کار می‌کند:

<Sandpack>

```js
import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = 'background';
  let pictureClassName = 'picture';
  if (isActive) {
    pictureClassName += ' picture--active';
  } else {
    backgroundClassName += ' background--active';
  }

  return (
    <div
      className={backgroundClassName}
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={e => {
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }

.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}

.background--active {
  background: #a6b5ff;
}

.picture {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 5px solid transparent;
}

.picture--active {
  border: 5px solid #a6b5ff;
}
```

</Sandpack>

از سوی دیگر، شما می توانید دو قطعه جداگانه از JSX را برگردانید:

<Sandpack>

```js
import { useState } from 'react';

export default function Picture() {
  const [isActive, setIsActive] = useState(false);
  if (isActive) {
    return (
      <div
        className="background"
        onClick={() => setIsActive(false)}
      >
        <img
          className="picture picture--active"
          alt="Rainbow houses in Kampung Pelangi, Indonesia"
          src="https://i.imgur.com/5qwVYb1.jpeg"
          onClick={e => e.stopPropagation()}
        />
      </div>
    );
  }
  return (
    <div className="background background--active">
      <img
        className="picture"
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
        onClick={() => setIsActive(true)}
      />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }

.background {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}

.background--active {
  background: #a6b5ff;
}

.picture {
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 5px solid transparent;
}

.picture--active {
  border: 5px solid #a6b5ff;
}
```

</Sandpack>

بخاطر داشته باشید که اگر دو قطعه مختلف JSX یک درخت مشابه را توصیف کنند، تودرتویی آنها (اولین `<div>` → اولین `<img>`) باید منظم باشد.درغیراینصورت، تغییر وضعیت `isActive` باعث بازسازی کل زیردرخت شده و [state آن را بازنشانی می کند.](/learn/preserving-and-resetting-state) به این دلیل است که اگر یک درخت JSX مشابه در هردو حالت بازگردانده شود، بهتر است آنها را به عنوان یک قطعه JSX واحد بنویسید.

</Solution>

#### ویرایشگر پروفایل {/*profile-editor*/}

در زیر یک فرم کوچک با استفاده از جاوااسکریپت خام و DOM پیاده سازی شده است. با آن بازی کنید تا رفتار آن را درک کنید:

<Sandpack>

```js index.js active
function handleFormSubmit(e) {
  e.preventDefault();
  if (editButton.textContent === 'Edit Profile') {
    editButton.textContent = 'Save Profile';
    hide(firstNameText);
    hide(lastNameText);
    show(firstNameInput);
    show(lastNameInput);
  } else {
    editButton.textContent = 'Edit Profile';
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }
}

function handleFirstNameChange() {
  firstNameText.textContent = firstNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function handleLastNameChange() {
  lastNameText.textContent = lastNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <label>
    First name:
    <b id="firstNameText">Jane</b>
    <input
      id="firstNameInput"
      value="Jane"
      style="display: none">
  </label>
  <label>
    Last name:
    <b id="lastNameText">Jacobs</b>
    <input
      id="lastNameInput"
      value="Jacobs"
      style="display: none">
  </label>
  <button type="submit" id="editButton">Edit Profile</button>
  <p><i id="helloText">Hello, Jane Jacobs!</i></p>
</form>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
label { display: block; margin-bottom: 20px; }
</style>
```

</Sandpack>

این فرم بین دو حالت جابجا می‌شود: در حالت ویرایش، ورودی‌ها را مشاهده می‌کنید و در حالت مشاهده، تنها نتیجه را مشاهده می‌کنید. عنوان دکمه براساس حالتی که در آن قرار دارید بین "Edit" و "Save" تغییر می کند. وقتی که ورودی ها را تغییر می دهید، پیام خوشامدگویی در پایین، به شکل بلادرنگ بروزرسانی می شود.

وظیفه شما این است که آن را در محیط تستی ری اکت زیر دوباره پیاده سازی کنید. برای راحتی شما، نشانه گذاری از قبل به JSX تبدیل شده است، اما شما باید ورودی ها را مانند نسخه اصلی نمایش داده و پنهان کنید.

مطمئن شوید که متن پایین را هم بروزرسانی کند!

<Sandpack>

```js
export default function EditProfile() {
  return (
    <form>
      <label>
        First name:{' '}
        <b>Jane</b>
        <input />
      </label>
      <label>
        Last name:{' '}
        <b>Jacobs</b>
        <input />
      </label>
      <button type="submit">
        Edit Profile
      </button>
      <p><i>Hello, Jane Jacobs!</i></p>
    </form>
  );
}
```

```css
label { display: block; margin-bottom: 20px; }
```

</Sandpack>

<Solution>

شما به دو متغیر state برای نگهداری مقادیر ورودی نیاز خواهی داشت: `firstName` و `lastName`. همچنین شما به یک متغیر state `isEditing` نیاز دارید که نگهدارنده وضعیت نمایش یا عدم نمایش ورودی ها باشد. شما _نباید_ به یک متغیر `fullName` نیاز داشته باشید چرا که نام کامل همیشه از `firstName` و `lastName` به دست می آید.

درنهایت، شما باید از [رندر کردن شرطی](/learn/conditional-rendering) برای نمایش یا مخفی کردن ورودی ها براساس `isEditing` استفاده کنید.

<Sandpack>

```js
import { useState } from 'react';

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Jacobs');

  return (
    <form onSubmit={e => {
      e.preventDefault();
      setIsEditing(!isEditing);
    }}>
      <label>
        First name:{' '}
        {isEditing ? (
          <input
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value)
            }}
          />
        ) : (
          <b>{firstName}</b>
        )}
      </label>
      <label>
        Last name:{' '}
        {isEditing ? (
          <input
            value={lastName}
            onChange={e => {
              setLastName(e.target.value)
            }}
          />
        ) : (
          <b>{lastName}</b>
        )}
      </label>
      <button type="submit">
        {isEditing ? 'Save' : 'Edit'} Profile
      </button>
      <p><i>Hello, {firstName} {lastName}!</i></p>
    </form>
  );
}
```

```css
label { display: block; margin-bottom: 20px; }
```

</Sandpack>

این راه حل را با کد دستوری اصلی مقایسه کنید. چقدر تفاوت دارند؟

</Solution>

#### راه حل دستوری را بدون استفاده از ری اکت بازسازی کنید {/*refactor-the-imperative-solution-without-react*/}

در زیر محیط تستی اصلی از چالش قبلی آورده شده، که به شکل دستوری و بدون ری اکت نوشته شده است:

<Sandpack>

```js index.js active
function handleFormSubmit(e) {
  e.preventDefault();
  if (editButton.textContent === 'Edit Profile') {
    editButton.textContent = 'Save Profile';
    hide(firstNameText);
    hide(lastNameText);
    show(firstNameInput);
    show(lastNameInput);
  } else {
    editButton.textContent = 'Edit Profile';
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }
}

function handleFirstNameChange() {
  firstNameText.textContent = firstNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function handleLastNameChange() {
  lastNameText.textContent = lastNameInput.value;
  helloText.textContent = (
    'Hello ' +
    firstNameInput.value + ' ' +
    lastNameInput.value + '!'
  );
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <label>
    First name:
    <b id="firstNameText">Jane</b>
    <input
      id="firstNameInput"
      value="Jane"
      style="display: none">
  </label>
  <label>
    Last name:
    <b id="lastNameText">Jacobs</b>
    <input
      id="lastNameInput"
      value="Jacobs"
      style="display: none">
  </label>
  <button type="submit" id="editButton">Edit Profile</button>
  <p><i id="helloText">Hello, Jane Jacobs!</i></p>
</form>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
label { display: block; margin-bottom: 20px; }
</style>
```

</Sandpack>

تصور کنید ری اکت وجود نداشت. آیا می توانید این کد را به گونه ای بازسازی کنید که منطق با حساسیت کمتر و بیشتر شبیه نسخه ری اکت شود؟اگر مانند ری اکت state به صورت صریح باشد، به چه شکل خواهد بود؟

اگر برای شروع درحال تقلا هستید، بخش زیر هم اکنون بیشتر ساختار را در خود جای داده است. اگر از اینجا شروع می کنید، منطق جاافتاده در تابع `updateDOM` را تکمیل کنید. (برای اطلاعات بیشتر به کد اصلی مراجعه کنید.)

<Sandpack>

```js index.js active
let firstName = 'Jane';
let lastName = 'Jacobs';
let isEditing = false;

function handleFormSubmit(e) {
  e.preventDefault();
  setIsEditing(!isEditing);
}

function handleFirstNameChange(e) {
  setFirstName(e.target.value);
}

function handleLastNameChange(e) {
  setLastName(e.target.value);
}

function setFirstName(value) {
  firstName = value;
  updateDOM();
}

function setLastName(value) {
  lastName = value;
  updateDOM();
}

function setIsEditing(value) {
  isEditing = value;
  updateDOM();
}

function updateDOM() {
  if (isEditing) {
    editButton.textContent = 'Save Profile';
    // TODO: نمایش ورودی ها، مخفی کردن محتوا
  } else {
    editButton.textContent = 'Edit Profile';
    // TODO: نمایش محتوا، مخفی کردن ورودی ها
  }
  // TODO: بروزسانی عناوین متن
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <label>
    First name:
    <b id="firstNameText">Jane</b>
    <input
      id="firstNameInput"
      value="Jane"
      style="display: none">
  </label>
  <label>
    Last name:
    <b id="lastNameText">Jacobs</b>
    <input
      id="lastNameInput"
      value="Jacobs"
      style="display: none">
  </label>
  <button type="submit" id="editButton">Edit Profile</button>
  <p><i id="helloText">Hello, Jane Jacobs!</i></p>
</form>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
label { display: block; margin-bottom: 20px; }
</style>
```

</Sandpack>

<Solution>

منطق جاافتاده شامل تغییر نمایش ورودی ها و محتوا، و بروزرسانی عناوین بود:

<Sandpack>

```js index.js active
let firstName = 'Jane';
let lastName = 'Jacobs';
let isEditing = false;

function handleFormSubmit(e) {
  e.preventDefault();
  setIsEditing(!isEditing);
}

function handleFirstNameChange(e) {
  setFirstName(e.target.value);
}

function handleLastNameChange(e) {
  setLastName(e.target.value);
}

function setFirstName(value) {
  firstName = value;
  updateDOM();
}

function setLastName(value) {
  lastName = value;
  updateDOM();
}

function setIsEditing(value) {
  isEditing = value;
  updateDOM();
}

function updateDOM() {
  if (isEditing) {
    editButton.textContent = 'Save Profile';
    hide(firstNameText);
    hide(lastNameText);
    show(firstNameInput);
    show(lastNameInput);
  } else {
    editButton.textContent = 'Edit Profile';
    hide(firstNameInput);
    hide(lastNameInput);
    show(firstNameText);
    show(lastNameText);
  }
  firstNameText.textContent = firstName;
  lastNameText.textContent = lastName;
  helloText.textContent = (
    'Hello ' +
    firstName + ' ' +
    lastName + '!'
  );
}

function hide(el) {
  el.style.display = 'none';
}

function show(el) {
  el.style.display = '';
}

let form = document.getElementById('form');
let editButton = document.getElementById('editButton');
let firstNameInput = document.getElementById('firstNameInput');
let firstNameText = document.getElementById('firstNameText');
let lastNameInput = document.getElementById('lastNameInput');
let lastNameText = document.getElementById('lastNameText');
let helloText = document.getElementById('helloText');
form.onsubmit = handleFormSubmit;
firstNameInput.oninput = handleFirstNameChange;
lastNameInput.oninput = handleLastNameChange;
```

```js sandbox.config.json hidden
{
  "hardReloadOnChange": true
}
```

```html public/index.html
<form id="form">
  <label>
    First name:
    <b id="firstNameText">Jane</b>
    <input
      id="firstNameInput"
      value="Jane"
      style="display: none">
  </label>
  <label>
    Last name:
    <b id="lastNameText">Jacobs</b>
    <input
      id="lastNameInput"
      value="Jacobs"
      style="display: none">
  </label>
  <button type="submit" id="editButton">Edit Profile</button>
  <p><i id="helloText">Hello, Jane Jacobs!</i></p>
</form>

<style>
* { box-sizing: border-box; }
body { font-family: sans-serif; margin: 20px; padding: 0; }
label { display: block; margin-bottom: 20px; }
</style>
```

</Sandpack>

تابع `updateDOM` که نوشتید نشان می دهد وقتی که شما state را ست می کنید ری اکت در پس زمینه چه کاری انجام می دهد. (اگرچه، ری اکت از تغییر prop های DOM که پس از آخرین مرتبه ست شدن تغییری نداشته اند اجتناب می کند.) 


</Solution>

</Challenges>
