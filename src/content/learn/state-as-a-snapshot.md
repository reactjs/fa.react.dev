---
title: استیت به عنوان یک عکس
---

<Intro>

متغیرهای استیت ممکن است مانند متغیرهای معمولی جاوااسکریپت به نظر بیایند که شما میتوانید از آنها بخوانید یا آنها را تغییر دهید.اما متغیرهای استیت بیشتر شبیه یک عکس گرفته شده عمل میکنند. ست کردن آنها لزومااستیت متغیرهایی که داشتید را عوض نخواهد کرد بلکه به جای این باعث ریرندر می شود.

</Intro>

<YouWillLearn>

*چطور ست کردن استیت باعث تریگر دوباره رندر شدن می شود
*چه زمانی و چطور استیت تغییر می‌کند
*چرا استیت بالافاصله اپدیت نمیشود وقتی آن را ست میکنید
*چطور هندل کننده های ایونت به اسنپ شات یا عکسی از استیت دسترسی دارند

</YouWillLearn>

## Setting state triggers renders {/*setting-state-triggers-renders*/}

ممکن است تصور کنید که رابط کاربری شما به صورت مستقیم به واکنش به رویداد کاربر مثل یک کلیک تغییر می‌کند. در ری‌اکت این یکمی متفاوت از این مدل ذهنی عمل می‌کند. در صفحه قبل، دیدید که [تنظیم وضعیت درخواستی برای رندر مجدد](/learn/render-and-commit#step-1-trigger-a-render) از سوی ری اکت دارد. این بدان معناست که برای واکنش رابط به رویداد، شما باید *وضعیت را به‌روز کنید*.

در این مثال، زمانی که دکمه "ارسال" را فشار می‌دهید، `setIsSent(true)` به ری‌اکت می‌گوید که واسط کاربری را مجدداً رندر کند:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('Hi!');
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

function sendMessage(message) {
  // ...
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

در زیر توضیح داده شده است چه اتفاقی رخ می‌دهد زمانی که دکمه را کلیک می‌کنید:

 1. `onSubmit` اجرا می‌شود.
2. `setIsSent(true)` مقدار `isSent` را به `true` تنظیم می‌کند و یک رندر جدید در صف قرار می‌دهد.
3. ری‌اکت مؤلفه را بر اساس مقدار جدید `isSent` مجدداً رندر می‌کند.

بیایید نگاه نزدیک‌تری به رابطه بین وضعیت و رندر کردن بیندازیم.

## Rendering takes a snapshot in time {/*rendering-takes-a-snapshot-in-time*/}

["رندر کردن"](/learn/render-and-commit#step-2-react-renders-your-components) به معنای فراخوانی React از مؤلفه شما است، که یک تابع است. JSX که از آن تابع بازمی‌گردانید، مانند یک نمای کلی از رابط کاربری در زمان است. ویژگی‌ها، کنترل‌گرهای رویداد و متغیرهای محلی آن همگی **با استفاده از وضعیت آن در زمان رندر، محاسبه شده‌اند.**

برخلاف یک عکس یا قطعه فیلم، "نمای کلی" رابط کاربری که شما باز می‌گردانید، تعاملی است. این شامل منطقی مانند کنترل‌گرهای رویداد می‌شود که مشخص می‌کنند واکنش به ورودی‌ها چگونه خواهد بود. React صفحه را برای تطابق با این نمای کلی به‌روز می‌کند و کنترل‌گرهای رویداد را متصل می‌کند. به عبارت دیگر، فشار دادن یک دکمه باعث فعال‌سازی کنترل‌گر کلیک از JSX شما می‌شود.

زمانی که React یک مؤلفه را مجدداً رندر می‌کند:

1. React دوباره تابع شما را فراخوانی می‌کند.
2. تابع شما یک نمای کلی JSX جدید را باز می‌گرداند.
3. سپس React صفحه را به‌روز می‌کند تا با نمای کلی ای که شما بازگردانده‌اید، همخوانی داشته باشد.

<IllustrationBlock sequential>
    <Illustration caption="React executing the function" src="/images/docs/illustrations/i_render1.png" />
    <Illustration caption="Calculating the snapshot" src="/images/docs/illustrations/i_render2.png" />
    <Illustration caption="Updating the DOM tree" src="/images/docs/illustrations/i_render3.png" />
</IllustrationBlock>

به عنوان حافظه‌ی یک تابع، استیت مانند یک متغیر معمولی نیست که بعد از بازگشت تابع شما ناپدید شود. در واقع، استیت به واقعیت در ری‌اکت وجود دارد - گویی روی یک قفسه قرار دارد! - خارج از تابع شما. زمانی که ری‌اکت مؤلفه شما را فراخوانی می‌کند، یک نمای کلی از وضعیت برای آن رندر خاص به شما ارائه می‌دهد. تابع شما نیز با مجموعه تازه‌ای از ویژگی‌ها و کنترل‌گرهای رویداد در جی اس اکس خود، همگی محاسبه شده، یک نمای کلی از رابط کاربری باز می‌گرداند.**using the state values from that render!**

<IllustrationBlock sequential>
  <Illustration caption="You tell React to update the state" src="/images/docs/illustrations/i_state-snapshot1.png" />
  <Illustration caption="React updates the state value" src="/images/docs/illustrations/i_state-snapshot2.png" />
  <Illustration caption="React passes a snapshot of the state value into the component" src="/images/docs/illustrations/i_state-snapshot3.png" />
</IllustrationBlock>

در اینجا یک آزمایش کوچک برای نمایش به شما نحوه کار می‌کند. در این مثال، شما ممکن است انتظار داشته باشید با کلیک بر روی دکمه "+3" شمارنده سه بار افزایش پیدا کند چرا که سه بار زیر  را فراخوانی می‌کند.`setNumber(number + 1)`

See what happens when you click the "+3" button:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

توجه داشته باشید که `number` فقط یک بار در هر کلیک افزایش پیدا می‌کند!

**تنظیم وضعیت فقط آن را برای رندر *بعدی* تغییر می‌دهد.** در زمان رندر اول، `number` برابر با `0` بود. به همین دلیل، در دستگیری رویداد `onClick` *آن رندر*، مقدار `number` هنوز `0` است حتی بعد از فراخوانی `setNumber(number + 1)`:

```js
<button onClick={() => {
  setNumber(number + 1);
  setNumber(number + 1);
  setNumber(number + 1);
}}>+3</button>
```

در اینجا آنچه کنترل‌گر کلیک دکمه به ری‌اکت می‌گوید به شرح زیر است:

1. `setNumber(number + 1)`: `number` برابر با `0` است بنابراین `setNumber(0 + 1)` فراخوانی می‌شود.
    - React آماده می‌شود تا `number` را در رندر بعدی به `1` تغییر دهد.
2. `setNumber(number + 1)`: `number` برابر با `0` است بنابراین `setNumber(0 + 1)` فراخوانی می‌شود.
    - React آماده می‌شود تا `number` را در رندر بعدی به `1` تغییر دهد.
3. `setNumber(number + 1)`: `number` برابر با `0` است بنابراین `setNumber(0 + 1)` فراخوانی می‌شود.
    - React آماده می‌شود تا `number` را در رندر بعدی به `1` تغییر دهد.

گرچه سه بار `setNumber(number + 1)` را فراخوانی کردید، اما در دستگیری رویداد *این رندر* همیشه `number` برابر با `0` است، بنابراین وضعیت را سه بار به `1` تنظیم می‌کنید. به همین دلیل است که پس از اتمام کنترل‌گر رویداد شما، React مؤلفه را با `number` برابر با `1` مجدداً رندر می‌کند به جای `3`.

همچنین می‌توانید این موضوع را با جایگذاری ذهنی متغیرهای وضعیت با مقادیر آن‌ها در کدتان تصور کنید. از آنجا که متغیر وضعیت `number` در *این رندر* برابر با `0` است، کنترل‌گر رویداد آن به این صورت به نظر می‌رسد:

```js
<button onClick={() => {
  setNumber(0 + 1);
  setNumber(0 + 1);
  setNumber(0 + 1);
}}>+3</button>
```

برای رندر بعدی، `number` برابر با `1` است، بنابراین کنترل‌گر کلیک *آن رندر* به این صورت به نظر می‌رسد:

```js
<button onClick={() => {
  setNumber(1 + 1);
  setNumber(1 + 1);
  setNumber(1 + 1);
}}>+3</button>
```

به همین دلیل است که با کلیک دوباره بر روی دکمه، شمارنده به `2` تنظیم می‌شود، سپس در کلیک بعدی به `3` و به همین ترتیب.

## State over time {/*state-over-time*/}

خب این جالب بود. حالا سعی کنید حدس بزنید چه اتفاقی می‌افتد اگر این دکمه را فشار دهید:

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        alert(number);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

اگر از روش جایگذاری متغیرها که قبلاً توضیح داده شد، استفاده کنید، می‌توانید حدس بزنید که پنجره اعلان "0" را نشان می‌دهد:

```js
setNumber(0 + 5);
alert(0);
```

اما اگر یک تایمر را در حالت هشدار قرار دهید، بنابراین آن فقط _پس از_ رندر شدن مجدد کامپوننت فعال می شود، چه؟ آیا می گوید "۰" یا "۵"؟ حدس بزنید!

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 5);
        setTimeout(() => {
          alert(number);
        }, 3000);
      }}>+5</button>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
h1 { display: inline-block; margin: 10px; width: 30px; text-align: center; }
```

</Sandpack>

شگفت‌آور نیست؟ اگر از روش جایگذاری استفاده کنید، می‌توانید "نمای کلی" از وضعیتی که به پنجره اعلان منتقل شده را ببینید.

```js
setNumber(0 + 5);
setTimeout(() => {
  alert(0);
}, 3000);
```

وضعیتی که در ری‌اکت ذخیره شده است ممکن است توسط زمانی که پنجره اعلان اجرا می‌شود تغییر کرده باشد، اما برای اجرای اعلان از یک نمای کلی از وضعیت در زمان تعامل کاربر با آن استفاده شده است!

**مقدار یک متغیر وضعیت هیچ‌گاه در داخل یک رندر تغییر نمی‌کند،** حتی اگر کد کنترل‌گر رویداد آن به صورت ناهمزمان باشد. در دستگیری رویداد `onClick *آن رندر*`، مقدار `number` به همان `0` باقی می‌ماند حتی بعد از اینکه `setNumber(number + 5)` فراخوانی شده باشد. مقدار آن زمانی ثابت شد که React با فراخوانی مؤلفه شما "نمای کلی" از رابط کاربری را به دست آورد.

در ادامه مثالی از چگونگی کمتر شدن اشتباهات زمان بندی در کنترل‌گرهای رویدادتان داریم. در زیر یک فرم وجود دارد که با تأخیر پنج ثانیه پیامی ارسال می‌کند. تصور کنید این سناریو:

1. شما دکمه "ارسال" را فشار می‌دهید و پیام "سلام" را به الیس ارسال می‌کنید.
2. قبل از پایان تأخیر پنج ثانیه، مقدار فیلد "به" را به "باب" تغییر می‌دهید.

شما چه انتظاری از نمایش پنجره اعلان دارید؟ آیا انتظار دارید عبارت "شما به الیس گفته‌اید سلام" نمایش داده شود؟ یا آیا انتظار دارید عبارت "شما به باب گفته‌اید سلام" نمایش داده شود؟ بر اساس آنچه می‌دانید حدس بزنید، سپس آن را امتحان کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>

**React مقادیر وضعیت را در داخل کنترل‌گرهای رویداد یک رندر "ثابت" نگه می‌دارد.** نیازی به نگرانی از اینکه وضعیت در حال اجرا تغییر کرده است یا نه ندارید.

اما اگر می‌خواهید قبل از یک رندر مجدد وضعیت را بخوانید، می‌خواهید از یک [تابع به‌روزکننده وضعیت](/learn/queueing-a-series-of-state-updates) استفاده کنید که در صفحه بعد توضیح داده شده است!

<Recap dir='rtl'>

* تنظیم وضعیت درخواستی برای یک رندر جدید است.
* React وضعیت را خارج از مؤلفه شما ذخیره می‌کند، گویی روی یک قفسه قرار دارد.
* زمانی که `useState` را فراخوانی می‌کنید، React به شما یک نمای کلی از وضعیت می‌دهد *برای آن رندر*.
* متغیرها و کنترل‌گرهای رویداد از رندر به رندر "باقی نمی‌مانند". هر رندر کنترل‌گرهای رویداد خود را دارد.
* هر رندر (و توابع داخل آن) همیشه نمای کلی از وضعیت را می‌بیند که React به *آن رندر* داده است.
* می‌توانید به ذهنی وضعیت را در کنترل‌گرهای رویداد جایگزین کنید، به مانند اینکه در مورد JSX رندر شده فکر می‌کنید.
* کنترل‌گرهای رویدادی که در گذشته ایجاد شده‌اند، مقادیر وضعیت را از رندری که در آن ایجاد شدند دارند.

</Recap>



<Challenges>

#### Implement a traffic light {/*implement-a-traffic-light*/}

اینجا یک مؤلفه چراغ عبور پیاده‌روی است که هنگام فشار دادن دکمه فعال می‌شود:

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

یک `alert` به کنترل‌گر کلیک اضافه کنید. زمانی که چراغ سبز است و می‌گوید "پیاده‌روی"، با کلیک بر روی دکمه باید عبارت "پایان پیاده‌روی بعدی است" نمایش داده شود. زمانی که چراغ قرمز است و می‌گوید "توقف"، با کلیک بر روی دکمه باید عبارت "پیاده‌روی بعدی است" نمایش داده شود.

آیا این تفاوتی ایجاد می‌کند که آیا `alert` را قبل از یا پس از فراخوانی `setWalk` قرار دهید؟

<Solution>

 شما باید اینجور باشد`alert` 

<Sandpack>

```js
import { useState } from 'react';

export default function TrafficLight() {
  const [walk, setWalk] = useState(true);

  function handleClick() {
    setWalk(!walk);
    alert(walk ? 'Stop is next' : 'Walk is next');
  }

  return (
    <>
      <button onClick={handleClick}>
        Change to {walk ? 'Stop' : 'Walk'}
      </button>
      <h1 style={{
        color: walk ? 'darkgreen' : 'darkred'
      }}>
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  );
}
```

```css
h1 { margin-top: 20px; }
```

</Sandpack>

آیا اینکه آیا `alert` را قبل یا بعد از فراخوانی `setWalk` قرار دهید تفاوتی نمی‌کند. مقدار `walk` در آن رندر "ثابت" است. فراخوانی `setWalk` تنها برای رندر *بعدی* آن تغییر می‌دهد، اما بر کنترل‌گر رویداد رندر قبلی تأثیر نمی‌گذارد.

این خط در ابتدا ممکن است متناقض به نظر برسد:

```js
alert(walk ? 'Stop is next' : 'Walk is next');
```

اما اگر آن را به صورت زیر بخوانید، منطقی خواهد بود: "اگر چراغ راه پیاده‌روی 'اکنون پیاده‌روی کنید' را نشان دهد، پیام باید 'توقف بعدی است' باشد." متغیر `walk` در داخل کنترل‌گر رویداد شما با مقدار `walk` در آن رندر تطابق دارد و تغییر نمی‌کند.

می‌توانید این موضوع را با استفاده از روش جایگذاری تأیید کنید. زمانی که `walk` برابر با `true` است، شما این نتیجه را خواهید گرفت:

```js
<button onClick={() => {
  setWalk(false);
  alert('Stop is next');
}}>
  Change to Stop
</button>
<h1 style={{color: 'darkgreen'}}>
  Walk
</h1>
```

بنابراین با کلیک بر روی "تغییر به توقف" یک رندر با `walk` تنظیم شده به `false` در صف قرار می‌گیرد و "توقف بعدی است" را نمایش می‌دهد.

</Solution>

</Challenges>
