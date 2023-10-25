---
title: پاسخ به ورودی به کمک state
---

<Intro dir="rtl">
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
وقتی شما تعاملات رابط کاربری را طراحی می کنید،احتمالا به چگونگی *تغییرات* رابط کاربری در پاسخ به اقدامات کاربر فکر می کنید.فرمی را در نظر بگیرید که امکان ارسال یک پاسخ را به کاربر می دهد:
* وقتی شما چیزی داخل فرم تایپ می کنید،دکمه "ارسال" **فعال می شود.**
* وقتی شما دکمه "ارسال" را فشار می دهید،دکمه و فرم **غیرفعال میشوند.** و یک اسپینر **ظاهر می شود.**
* اگر درخواست شبکه موفقیت آمیز باشد،فرم **پنهان می شود،** و پیام "تشکر" **ظاهر می شود.**
* اگر درخواست شبکه ناموفق باشد، یک پیغام خطا **ظاهر می شود،** و فرم دوباره **فعال می شود**.

در **برنامه نویسی دستوری،** موارد فوق مستقیما با نحوه پیاده سازی تعامل توسط شما مرتبط است. شما ملزم هستید که دستورالعمل های دقیق برای دستکاری رابط کاربری بر اساس آنچه رخ می دهد را، بنویسید.روش دیگری برای تصور این موضوع این است که: فرض کنید که در کنار شخصی در یک ماشین سوار می شوید و قدم به قدم به او می گویید که کجا برود.


<Illustration src="/images/docs/illustrations/i_imperative-ui-programming.png"  alt="در خودرویی که توسط شخصی مضطرب به عنوان نماینده جاوااسکریپت رانده می شود، مسافری به راننده دستور می دهد تا دنباله ای از مسیریابی های قدم به قدم و پیچیده را اجرا کند." />

آنها نمی دانند که شما می خواهید به کجا بروید،آنها تنها دستورات شما را دنبال می کنند.(و اگر مسیرها را اشتباه بروید، به مقصد اشتباه می رسید!) به این روش،دستوری می گویند زیرا شما باید به هر المنت اعم از اسپینر و دکمه فرمان بدهید و به کامپیوتر بگویید که رابط کاربری را **چگونه** بروزرسانی کند.

در این مثال از برنامه نویسی رابط کاربری دستوری، فرم **بدون استفاده** از ری اکت ساخته می شود؛ و تنها از[DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) مرورگر استفاده می کند :

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
  // Pretend it's hitting the network.
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
در ری اکت، شما مجبور نیستید مستقیما رابط کاربری را دستکاری کنید--به این معنا که فعال کردن،غیرفعال کردن،نمایش، و یا پنهان کردن کامپوننتها را به طور مستقیم انجام نمی دهید. درعوض، شما **چیزی که می خواهید نمایش دهید را اعلام می کنید،** و ری اکت می فهمد چگونه رابط کاربری را بروزرسانی کند.فرض کنید که سوار تاکسی شوید و به جای آنکه به راننده بگویید دقیقا به کدام طرف بپیچد،بگویید که کجا می خواهید بروید.این وظیفه راننده است که شمارا به مقصد برساند، وممکن است حتی میانبرهایی را بلد باشد که شما در نظر نگرفته اید!

<Illustration src="/images/docs/illustrations/i_declarative-ui-programming.png" alt="در خودرویی که توسط ری اکت هدایت می شود،مسافری درخواست می کند که او را به مکان خاصی روی نقشه ببرند.ری اکت می فهمد که چگونه این کار را انجام دهد" />

## فکر کردن درباره رابط کاربری بصورت اعلانی {/*thinking-about-ui-declaratively*/}
 شما نحوه پیاده سازی یک فرم به صورت دستوری را بالاتر دیدید.برای درک بهتر نحوه تفکر در ری اکت، درزیر به پیاده سازی مجدد این رابط کاربری در ری اکت خواهید پرداخت :

1. state های بصری مختلف کامپوننت خود را **شناسایی کنید**
2. **تعیین کنید** چه چیزی باعث آن تغییرات state می شود.
3. state را در حافظه با استفاده از `useState` **نشان دهید**
4. هرگونه متغیر state غیرضروری را **حذف کنید**
5. event handler ها را برای مقداردهی state **متصل کنید**


### قدم اول : state های بصری مختلف کامپوننت خود را شناسایی کنید {/*step-1-identify-your-components-different-visual-states*/}
در علوم کامپیوتر،ممکن است درباره ["state machine"](https://en.wikipedia.org/wiki/ماشین_حالات_متناهی) که در یکی از چندین “states” قرار دارد بشنوید.اگر با یک طراح کار می کنید،ممکن است نمونه هایی برای "state های بصری" مختلف دیده باشید.React در تقاطع طراحی و علوم کامپیوتر قرار دارد، بنابراین هر دوی این ایده ها منابع الهام هستند.

ابتدا،شما نیاز دارید که تمام "state" های مختلف رابط کاربری را که کاربر ممکن است ببیند را بصری سازی کنید :

* **خالی**: فرم دارای یک دکمه "ارسال" غیرفعال است.
* **در حال تایپ**: فرم دارای یک دکمه "ارسال" فعال است.
* **در حال ارسال**: فرم کاملاً غیرفعال است.اسپینر نشان داده می شود.
* **موفقیت**: پیام "متشکرم" به جای فرم نمایش داده می شود.
* **خطا**: مانند در حال تایپ، اما با یک پیغام خطای اضافی.

درست مانند یک طراح، قبل از اینکه منطق را اضافه کنید، می خواهید برای state های مختلف "نمونه های اولیه" یا "نمونه" ایجاد کنید.برای مثال، در اینجا یک نمونه فقط برای بخش بصری فرم آورده شده است.این نمونه با یک prop به نام `status` با مقدار پیشفرض `'empty'` کنترل می شود:

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
شما می توانستید آن prop را هرچیزی بنامید، نام گذاری اهمیتی ندارد.`status = 'empty'`را به `status = 'success'` ویرایش کنید تا پیغام موفقیت ظاهر شود.نمونه سازی به شما اجازه می دهد قبل از وارد کردن منطق به کد،روی رابط کاربری تکرار انجام دهید. اینجا یک نمونه پیاده سازی بیشتر از همان کامپوننت وجود دارد که همچنان با `status` prop "کنترل می شود":

<Sandpack>

```js
export default function Form({
  // 'در حال ارسال','خطا','موفقیت' را امتحان امتحان کنید:
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

#### نمایش همزمان چند state بصری {/*displaying-many-visual-states-at-once*/}
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

صفحاتی مانند این اغلب به نام 'راهنمای سبک زنده'یا'کتاب های داستانی' شناخته می شوند.

</DeepDive>

### قدم دوم : تعیین کنید چه چیزی باعث آن تغییرات state می شود {/*step-2-determine-what-triggers-those-state-changes*/}

شما می توانید در پاسخ به دو نوع ورودی بروزرسانی های state را فعال کنید:
* **ورودی های کاربر** مانند کلیک یک دکمه، تایپ کردن در یک فیلد، پیمایش یک پیوند.
* **ورودی های کامپیوتر** مانند دریافت پاسخ از شبکه، اتمام زمان مقرر، بارگذاری یک تصویر.

<IllustrationBlock>
  <Illustration caption="ورودی کاربر" alt="A finger." src="/images/docs/illustrations/i_inputs1.png" />
  <Illustration caption="ورودی کامپیوتر" alt="Ones and zeroes." src="/images/docs/illustrations/i_inputs2.png" />
</IllustrationBlock>

در هر دو مورد، **شما باید برای بروزرسانی رابط کاربری [متغیرهای state](/learn/state-a-components-memory#anatomy-of-usestate) را تنظیم کنید.** برای فرمی که در حال توسعه آن هستید، نیاز به تغییر state در پاسخ به چند ورودی متفاوت دارید: 

* **تغییر ورودی متن** (کاربر) باید آن را از state *خالی* به *درحال تایپ* یا برعکس تغییر دهد، بسته به اینکه ورودی متن خالی است یا خیر.
* **کلیک بر روی دکمه ارسال** (کاربر) باید آن را به state در حال ارسال تغییر دهد.
* **پاسخ موفق شبکه** (کامپیوتر) باید آن را به state موفقیت تغییر دهد.
* **پاسخ ناموفق شبکه** (کامپیوتر) باید آن را به state *خطا* با پیغام خطای متناسب تغییر دهد.

<Note>

توجه کنید که ورودی های کاربر اغلب نیازمند [event handlers](/learn/responding-to-events) هستند!

</Note>
برای کمک به تصویر سازی این گردش کار، سعی کنید هر state را به عنوان یک دایره برچسب دار، و هر تغییر بین دو state را به عنوان یک پیکان ترسیم کنید.به این ترتیب می توانید چندین گردش کار را ترسیم کرده و باگ ها را قبل از پیاده سازی حل کنید.

<DiagramGroup>

<Diagram name="responding_to_input_flow" height={350} width={688} alt="Flow chart moving left to right with 5 nodes. The first node labeled 'empty' has one edge labeled 'start typing' connected to a node labeled 'typing'. That node has one edge labeled 'press submit' connected to a node labeled 'submitting', which has two edges. The left edge is labeled 'network error' connecting to a node labeled 'error'. The right edge is labeled 'network success' connecting to a node labeled 'success'.">

state های فرم

</Diagram>

</DiagramGroup>

### قدم سوم:  state را در حافظه با استفاده از `useState`نشان دهید {/*step-3-represent-the-state-in-memory-with-usestate*/}

حال شما باید state های بصری کامپوننت خود را در حافظه با [`useState`](/reference/react/useState) نشان دهید. سادگی کلید است: هر قطعه state یک "قطعه متحرک" است، و **شما کمترین تعداد "قطعه متحرک" ممکن را می خواهید.** پیچیدگی بیشتر به باگهای بیشتر منجر می شود!

با state ای شروع کنید که *حتما باید* وجود داشته باشد. مثلا شما به `answer` برای ذخیره ورودی، و به `error`(اگر موجود باشد) برای ذخیره آخرین error نیاز دارید:

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

### قدم چهارم: هرگونه متغیر غیرضروری state را حذف کنید {/*step-4-remove-any-non-essential-state-variables*/}
شما می خواهید از تکرار محتوای state جلوگیری کنید بنابراین فقط چیزی که ضروری است را دنبال می کنید. صرف زمان اندک روی بازسازی ساختار state باعث فهم ساده تر کامپوننت شما، کاهش تکرار، و اجتناب از معانی ناخواسته خواهد شد. هدف شما **جلوگیری از مواردی است که state موجود در حافظه رابط کاربری صحیحی که شما بخواهید کاربر ببیند را نمایش نمی دهد.** (مثلا، شما هرگز نمی خواهید که همزمان پیغام خطا نمایش داده شود و فیلد ورودی هم غیرفعال باشد، یا کاربر قادر به تصحیح خطا نباشد!)
اینجا تعدادی پرسش وجود دارد که می توانید درباره متغیرهای state بپرسید:


* **Does this state cause a paradox?** For example, `isTyping` and `isSubmitting` can't both be `true`. A paradox usually means that the state is not constrained enough. There are four possible combinations of two booleans, but only three correspond to valid states. To remove the "impossible" state, you can combine these into a `status` that must be one of three values: `'typing'`, `'submitting'`, or `'success'`.
* **Is the same information available in another state variable already?** Another paradox: `isEmpty` and `isTyping` can't be `true` at the same time. By making them separate state variables, you risk them going out of sync and causing bugs. Fortunately, you can remove `isEmpty` and instead check `answer.length === 0`.
* **Can you get the same information from the inverse of another state variable?** `isError` is not needed because you can check `error !== null` instead.

After this clean-up, you're left with 3 (down from 7!) *essential* state variables:

```js
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

You know they are essential, because you can't remove any of them without breaking the functionality.

<DeepDive>

#### Eliminating “impossible” states with a reducer {/*eliminating-impossible-states-with-a-reducer*/}

These three variables are a good enough representation of this form's state. However, there are still some intermediate states that don't fully make sense. For example, a non-null `error` doesn't make sense when `status` is `'success'`. To model the state more precisely, you can [extract it into a reducer.](/learn/extracting-state-logic-into-a-reducer) Reducers let you unify multiple state variables into a single object and consolidate all the related logic!

</DeepDive>

### Step 5: Connect the event handlers to set state {/*step-5-connect-the-event-handlers-to-set-state*/}

Lastly, create event handlers that update the state. Below is the final form, with all event handlers wired up:

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
  // Pretend it's hitting the network.
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

Although this code is longer than the original imperative example, it is much less fragile. Expressing all interactions as state changes lets you later introduce new visual states without breaking existing ones. It also lets you change what should be displayed in each state without changing the logic of the interaction itself.

<Recap>

* Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).
* When developing a component:
  1. Identify all its visual states.
  2. Determine the human and computer triggers for state changes.
  3. Model the state with `useState`.
  4. Remove non-essential state to avoid bugs and paradoxes.
  5. Connect the event handlers to set state.

</Recap>

<Challenges>

#### Add and remove a CSS class {/*add-and-remove-a-css-class*/}

Make it so that clicking on the picture *removes* the `background--active` CSS class from the outer `<div>`, but *adds* the `picture--active` class to the `<img>`. Clicking the background again should restore the original CSS classes.

Visually, you should expect that clicking on the picture removes the purple background and highlights the picture border. Clicking outside the picture highlights the background, but removes the picture border highlight.

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

This component has two visual states: when the image is active, and when the image is inactive:

* When the image is active, the CSS classes are `background` and `picture picture--active`.
* When the image is inactive, the CSS classes are `background background--active` and `picture`.

A single boolean state variable is enough to remember whether the image is active. The original task was to remove or add CSS classes. However, in React you need to *describe* what you want to see rather than *manipulate* the UI elements. So you need to calculate both CSS classes based on the current state. You also need to [stop the propagation](/learn/responding-to-events#stopping-propagation) so that clicking the image doesn't register as a click on the background.

Verify that this version works by clicking the image and then outside of it:

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

Alternatively, you could return two separate chunks of JSX:

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

Keep in mind that if two different JSX chunks describe the same tree, their nesting (first `<div>` → first `<img>`) has to line up. Otherwise, toggling `isActive` would recreate the whole tree below and [reset its state.](/learn/preserving-and-resetting-state) This is why, if a similar JSX tree gets returned in both cases, it is better to write them as a single piece of JSX.

</Solution>

#### Profile editor {/*profile-editor*/}

Here is a small form implemented with plain JavaScript and DOM. Play with it to understand its behavior:

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

This form switches between two modes: in the editing mode, you see the inputs, and in the viewing mode, you only see the result. The button label changes between "Edit" and "Save" depending on the mode you're in. When you change the inputs, the welcome message at the bottom updates in real time.

Your task is to reimplement it in React in the sandbox below. For your convenience, the markup was already converted to JSX, but you'll need to make it show and hide the inputs like the original does.

Make sure that it updates the text at the bottom, too!

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

You will need two state variables to hold the input values: `firstName` and `lastName`. You're also going to need an `isEditing` state variable that holds whether to display the inputs or not. You should _not_ need a `fullName` variable because the full name can always be calculated from the `firstName` and the `lastName`.

Finally, you should use [conditional rendering](/learn/conditional-rendering) to show or hide the inputs depending on `isEditing`.

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

Compare this solution to the original imperative code. How are they different?

</Solution>

#### Refactor the imperative solution without React {/*refactor-the-imperative-solution-without-react*/}

Here is the original sandbox from the previous challenge, written imperatively without React:

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

Imagine React didn't exist. Can you refactor this code in a way that makes the logic less fragile and more similar to the React version? What would it look like if the state was explicit, like in React?

If you're struggling to think where to start, the stub below already has most of the structure in place. If you start here, fill in the missing logic in the `updateDOM` function. (Refer to the original code where needed.)

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
    // TODO: show inputs, hide content
  } else {
    editButton.textContent = 'Edit Profile';
    // TODO: hide inputs, show content
  }
  // TODO: update text labels
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

The missing logic included toggling the display of inputs and content, and updating the labels:

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

The `updateDOM` function you wrote shows what React does under the hood when you set the state. (However, React also avoids touching the DOM for properties that have not changed since the last time they were set.)

</Solution>

</Challenges>
