---
id: hooks-rules
title: Rules of Hooks
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hookها* ضمیمه جدید ری‌اکت ۱۶.۸ هستند. آن‌ها به شما اجازه می‌دهند تا از state و سایر ویژگی‌های ری‌اکت بدون نوشتن کلاس استفاده کنید.

Hookها توابع جاوااسکریپت هستند، ولی هنگامی که از آنها استفاده می‌کنید باید از دو قانون تبعیت کنید. ما یک [پلاگین آستر](https://www.npmjs.com/package/eslint-plugin-react-hooks) برای اجرای خودکار این قوانین برای شما فراهم کردیم.


### Hookها را فقط در بالاترین سطح فراخوانی کنید{#only-call-hooks-at-the-top-level}

**Hookها را درون لوپ، شرط، یا توابع در هم تنیده فراخوانی نکنید** به جای آن، همیشه آنها را در بالاترین سطح توابع ری‌اکت فراخوانی کنید. با پیروی از این قوانین، مطمین می‌شوید که Hookها هنگامی که در یک کامپوننت رندر می‌شوند به یک ترتیب فراخوانی می‌شوند. این چیزیست که به ری‌اکت اجازه می‌دهد state hookها را بین چندین فراخوانی از `useState` و `useEffect` حفظ کند.

### Hookها را فقط در توابع ری‌اکتی فراخوانی کنید {#only-call-hooks-from-react-functions}

**Hookها را در توابع عادی جاوااسکریپت فراخوانی نکنید.** به جای آن، می‌توانید:

* ✅ Hookها را در توابع ری‌اکت فراخوانی کنید.
* ✅ Hookها را از Hookها فراخوانی کنید (در صفحه بعدی در موردشان خواهیم [آموخت](/docs/hooks-custom.html)).

با پیروی از این قوانین، متوجه می‌شوید که تمام منطق stateful به وضوح در منبع کد یک کامپوننت قابل مشاهده است.

## پلاگین ESLint {#eslint-plugin}

ما پلاگینی منتشر کردیم که به آن[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) گفته می‌شود و این دو قانون را اجباری می‌کند. اگر دوست داشتید می‌توانید این پلاگین را به پروژه خود اضافه کنید.

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```js
// Your ESLint configuration
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

در آینده قصد داریم تا این پلاگین را به صورت پیش فرض در Create React App و ابزارهای مشابه وارد کنیم.
**اکنون شما میتوانید به پیج صفحه بعد که آموزش [نوشتن Hook شخصی](/docs/hooks-custom.html) را می‌دهد جهش داشته باشید.** در ادامه در این پیج می‌خواهیم توضیح دهیم که علت این قوانین چیست.

## توضیح {#explanation}

همانطور که در قبل [آموختیم](/docs/hooks-state.html#tip-using-multiple-state-variables)، می توانیم از چندین هوک State و Effect در یک کامپوننت استفاده کنیم.

```js
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

پس ری‌اکت چگونه می‌فهمد که چه stateای به چه فراخوانی از `useState` مرتبط است؟ جواب این‌است که **ری‌اکت به ترتیبی که Hookها فراخوانی می‌شود تکیه می‌کند**. مثال ما کار می‌کند زیرا ترتیب فراخوانی Hookها در هر رندر یکسان است:

```js
// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

// ...
```

تا زمانی که ترتیب فراخوانی Hookها بین رندرها یکسان است، ری‌اکت می‌تواند برخی از state های محلی را با هر یک از آنها مرتبط کند. ولی چه می‌شود وقتی که ما Hookای را درون شرطی فراخوانی می‌کنیم (برای مثال، تاثیر `persistForm`).


```js
  // 🔴 We're breaking the first rule by using a Hook in a condition
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

شرط `name !== ''` در اولین رندر صحیح است، پس این Hook را اجرا می‌کنیم. گرچه، در رندر بعدی کاربر ممکن است فرم را خالی کرده باشد و شرط را ناصحیح قرار دهد. و حالا در طول رندر این Hook از رویش میپریم، فراخوانی‌های Hook متفاوت می‌شود:

```js
useState('Mary')           // 1. Read the name state variable (argument is ignored)
// useEffect(persistForm)  // 🔴 This Hook was skipped!
useState('Poppins')        // 🔴 2 (but was 3). Fail to read the surname state variable
useEffect(updateTitle)     // 🔴 3 (but was 4). Fail to replace the effect
```

ری‌اکت نمی‌داند که چه چیزی را برای دومین Hook `useState` برگرداند. ری‌اکت توقع دارد که دومین فراخوانی درست مثل رندر قبلی Hook در این کامپوننت به افکت `persistForm` مرتبط باشد، ولی اینگونه نیست. از اینجا به بعد، تمامی Hookهای بعد از Hookای که ما از رویش پریدیم یکی به بعدی منتقل می‌شود و منجر به باگ می‌گردد.

**به همین دلیل است که Hookها باید در بالاترین سطح کامپوننت فراخوانی شوند.** اگر بخواهیم Hookرا بر اساس شرطی اجرا کنیم می‌توانیم شرط را *درون* Hookمان قرار دهیم:

```js
  useEffect(function persistForm() {
    // 👍 We're not breaking the first rule anymore
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```
**توجه داشته باشید که اگر این پلاگین آستری که [فراهم](https://www.npmjs.com/package/eslint-plugin-react-hooks) کردیم را نصب کنید دیگر نیاز نیست نگران این مشکلات باشید** ولی الان می‌دانید که *چرا* Hookها اینگونه کار می‌کنند، و این قوانین از چه مشکلاتی جلوگیری می‌کند.

## گام‌های بعدی {#next-steps}

درنهایت، آماده هستیم تا در مورد [نوشتن Hook شخصی خودمان](/docs/hooks-custom.html) بیاموزیم! Hookهای شخصی اجازه می‌دهند تا چندین Hook که ری‌اکت فراهم کرده را باهم ترکیب کنید و انتزاع خود را داشته باشید، و از همان منطق stateful بین کامپوننت‌ها مجددا استفاده کنید.
