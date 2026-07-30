---
title: 'حذف وابستگی‌های افکت'
---

<Intro>

وقتی یک افکت می‌نویسید، لینتر بررسی می‌کند که آیا هر مقدار واکنش‌گرا (مثل پراپس و استیت) که افکت می‌خواند را در فهرست وابستگی‌های افکت خود قرار داده‌اید یا نه. این کار تضمین می‌کند که افکت شما با جدیدترین پراپس و استیت کامپوننت هماهنگ بماند. وابستگی‌های غیرضروری ممکن است باعث شوند افکت شما بیش از حد اجرا شود، یا حتی یک حلقه بی‌نهایت ایجاد کند. این راهنما را دنبال کنید تا وابستگی‌های غیرضروری را از افکت‌های خود بررسی و حذف کنید.

</Intro>

<YouWillLearn>

- چگونه حلقه‌های بی‌نهایت وابستگی افکت را برطرف کنیم
- وقتی می‌خواهیم یک وابستگی را حذف کنیم چه کاری باید انجام دهیم
- چگونه یک مقدار را از افکت بخوانیم بدون اینکه به آن «واکنش» نشان دهیم
- چگونه و چرا باید از وابستگی‌های شیء و تابع اجتناب کنیم
- چرا خاموش کردن لینتر وابستگی خطرناک است، و به جای آن چه باید کرد

</YouWillLearn>

## وابستگی‌ها باید با کد مطابقت داشته باشند {/*dependencies-should-match-the-code*/}

وقتی یک افکت می‌نویسید، ابتدا مشخص می‌کنید که چگونه هر کاری را که می‌خواهید افکت انجام دهد [شروع و متوقف](/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect) کنید:

```js {5-7}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
        // ...
}
```

سپس، اگر وابستگی‌های افکت را خالی بگذارید (`[]`)، لینتر وابستگی‌های درست را پیشنهاد می‌دهد:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- Fix the mistake here!
  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

آن‌ها را بر اساس آنچه لینتر می‌گوید پر کنید:

```js {6}
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
}
```

[افکت‌ها به مقادیر واکنش‌گرا «واکنش» نشان می‌دهند.](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) از آنجا که `roomId` یک مقدار واکنش‌گرا است (می‌تواند به دلیل رندر مجدد تغییر کند)، لینتر بررسی می‌کند که آیا آن را به عنوان یک وابستگی مشخص کرده‌اید یا نه. اگر `roomId` مقدار متفاوتی دریافت کند، ری‌اکت افکت شما را مجدداً هماهنگ می‌کند. این تضمین می‌کند که چت به اتاق انتخاب‌شده متصل می‌ماند و به منوی کشویی «واکنش» نشان می‌دهد:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

### برای حذف یک وابستگی، ثابت کنید که وابستگی نیست {/*to-remove-a-dependency-prove-that-its-not-a-dependency*/}

توجه داشته باشید که نمی‌توانید وابستگی‌های افکت خود را «انتخاب» کنید. هر <CodeStep step={2}>مقدار واکنش‌گرا</CodeStep> که توسط کد افکت شما استفاده می‌شود باید در فهرست وابستگی‌های شما اعلام شود. فهرست وابستگی‌ها توسط کد اطراف آن تعیین می‌شود:

```js [[2, 3, "roomId"], [2, 5, "roomId"], [2, 8, "roomId"]]
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) { // This is a reactive value
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads that reactive value
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ So you must specify that reactive value as a dependency of your Effect
  // ...
}
```

[مقادیر واکنش‌گرا](/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive) شامل پراپس و تمام متغیرها و توابعی می‌شوند که مستقیماً درون کامپوننت شما اعلام شده‌اند. از آنجا که `roomId` یک مقدار واکنش‌گرا است، نمی‌توانید آن را از فهرست وابستگی‌ها حذف کنید. لینتر اجازه نمی‌دهد:

```js {8}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'roomId'
  // ...
}
```

و لینتر درست می‌گفت! از آنجا که `roomId` ممکن است در طول زمان تغییر کند، این یک باگ در کد شما ایجاد می‌کند.

**برای حذف یک وابستگی، به لینتر «ثابت کنید» که نیازی نیست وابستگی باشد.** مثلاً می‌توانید `roomId` را از کامپوننت خود خارج کنید تا ثابت کنید که واکنش‌گرا نیست و در رندرهای مجدد تغییر نمی‌کند:

```js {2,9}
const serverUrl = 'https://localhost:1234';
const roomId = 'music'; // Not a reactive value anymore

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
}
```

حالا که `roomId` یک مقدار واکنش‌گرا نیست (و در رندر مجدد تغییر نمی‌کند)، نیازی نیست وابستگی باشد:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'music';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

به همین دلیل اکنون می‌توانید یک [فهرست وابستگی خالی (`[]`) مشخص کنید.](/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means) افکت شما دیگر *واقعاً* به هیچ مقدار واکنش‌گرایی وابسته نیست، بنابراین *واقعاً* نیازی ندارد که هنگام تغییر پراپس یا استیت کامپوننت مجدداً اجرا شود.

### برای تغییر وابستگی‌ها، کد را تغییر دهید {/*to-change-the-dependencies-change-the-code*/}

شاید در روند کار خود الگویی را متوجه شده‌اید:

1. ابتدا، **کد** افکت خود یا نحوه اعلام مقادیر واکنش‌گرای خود را تغییر می‌دهید.
2. سپس، از لینتر پیروی می‌کنید و وابستگی‌ها را تنظیم می‌کنید تا **با کدی که تغییر داده‌اید مطابقت داشته باشند.**
3. اگر از فهرست وابستگی‌ها راضی نیستید، **به مرحله اول برمی‌گردید** (و کد را دوباره تغییر می‌دهید).

آخرین بخش مهم است. **اگر می‌خواهید وابستگی‌ها را تغییر دهید، ابتدا کد اطراف را تغییر دهید.** می‌توانید فهرست وابستگی‌ها را به عنوان [فهرستی از تمام مقادیر واکنش‌گرای استفاده‌شده توسط کد افکت خود در نظر بگیرید.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) شما *انتخاب* نمی‌کنید که چه چیزی در آن فهرست قرار گیرد. این فهرست کد شما را *توصیف* می‌کند. برای تغییر فهرست وابستگی‌ها، کد را تغییر دهید.

این ممکن است شبیه حل یک معادله به نظر برسد. ممکن است با یک هدف شروع کنید (مثلاً حذف یک وابستگی)، و باید کدی را که با آن هدف مطابقت دارد «پیدا» کنید. همه پیدا کردن حل معادلات سرگرم‌کننده نیست، و همین را می‌توان درباره نوشتن افکت‌ها گفت! خوشبختانه، فهرستی از دستورالعمل‌های رایج وجود دارد که می‌توانید در ادامه امتحان کنید.

<Pitfall>

اگر یک کدبیس موجود دارید، ممکن است برخی افکت‌هایی داشته باشید که لینتر را به این صورت خاموش می‌کنند:

```js {3-4}
useEffect(() => {
  // ...
  // 🔴 Avoid suppressing the linter like this:
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
```

**وقتی وابستگی‌ها با کد مطابقت ندارند، خطر بسیار بالایی برای ایجاد باگ وجود دارد.** با خاموش کردن لینتر، در مورد مقادیری که افکت شما به آن‌ها وابسته است به ری‌اکت «دروغ» می‌گویید.

به جای این کار، از تکنیک‌های زیر استفاده کنید.

</Pitfall>

<DeepDive>

#### چرا خاموش کردن لینتر وابستگی این‌قدر خطرناک است؟ {/*why-is-suppressing-the-dependency-linter-so-dangerous*/}

خاموش کردن لینتر منجر به باگ‌های بسیار غیرشهودی می‌شود که یافتن و رفع آن‌ها دشوار است. در اینجا یک مثال آورده شده است:

<Sandpack>

```js {expectedErrors: {'react-compiler': [14]}}
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  function onTick() {
        setCount(count + increment);
  }

  useEffect(() => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Every second, increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
    </>
  );
}
```

```css
button { margin: 10px; }
```

</Sandpack>

فرض کنید می‌خواستید افکت را «فقط هنگام مانت شدن» اجرا کنید. خوانده‌اید که [وابستگی‌های خالی (`[]`)](/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means) این کار را انجام می‌دهند، بنابراین تصمیم گرفتید لینتر را نادیده بگیرید و `[]` را به عنوان وابستگی‌ها به‌اجبار مشخص کنید.

این شمارنده قرار بود هر ثانیه به اندازه‌ای که با دو دکمه قابل تنظیم است افزایش یابد. با این حال، از آنجا که به ری‌اکت «دروغ» گفتید که این افکت به چیزی وابسته نیست، ری‌اکت برای همیشه از تابع `onTick` از رندر اولیه استفاده می‌کند. [در آن رندر،](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) `count` برابر `0` و `increment` برابر `1` بود. به همین دلیل `onTick` از آن رندر همیشه `setCount(0 + 1)` را هر ثانیه فراخوانی می‌کند، و شما همیشه `1` را می‌بینید. باگ‌هایی مثل این هنگامی که در چند کامپوننت پخش شده‌اند، سخت‌تر رفع می‌شوند.

همیشه راه‌حل بهتری از نادیده گرفتن لینتر وجود دارد! برای رفع این کد، باید `onTick` را به فهرست وابستگی‌ها اضافه کنید. (برای اطمینان از اینکه بازه فقط یک‌بار راه‌اندازی می‌شود، [از `onTick` یک Effect Event بسازید.](/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events))

**توصیه می‌کنیم خطای لینت وابستگی را به عنوان یک خطای کامپایل در نظر بگیرید. اگر آن را خاموش نکنید، هرگز باگ‌هایی مثل این نخواهید دید.** بقیه این صفحه جایگزین‌هایی برای این مورد و موارد دیگر را مستند می‌کند.

</DeepDive>

## حذف وابستگی‌های غیرضروری {/*removing-unnecessary-dependencies*/}

هر بار که وابستگی‌های افکت را برای بازتاب کد تنظیم می‌کنید، به فهرست وابستگی‌ها نگاه کنید. آیا منطقی است که افکت هنگام تغییر هر یک از این وابستگی‌ها مجدداً اجرا شود؟ گاهی اوقات، پاسخ «نه» است:

* ممکن است بخواهید *بخش‌های متفاوتی* از افکت خود را تحت شرایط متفاوتی اجرا کنید.
* ممکن است بخواهید فقط *آخرین مقدار* برخی وابستگی‌ها را بخوانید به جای اینکه به تغییرات آن «واکنش» نشان دهید.
* ممکن است یک وابستگی *به‌طور غیرعمدی* خیلی زیاد تغییر کند، زیرا یک شیء یا تابع است.

برای پیدا کردن راه‌حل درست، باید به چند سؤال درباره افکت خود پاسخ دهید. بیایید آن‌ها را بررسی کنیم.

### آیا این کد باید به یک مدیریت‌کننده رویداد منتقل شود؟ {/*should-this-code-move-to-an-event-handler*/}

اولین چیزی که باید به آن فکر کنید این است که آیا این کد اصلاً باید یک افکت باشد یا نه.

یک فرم را تصور کنید. هنگام ارسال، متغیر استیت `submitted` را روی `true` تنظیم می‌کنید. باید یک درخواست POST ارسال کنید و یک اعلان نمایش دهید. این منطق را داخل افکتی قرار داده‌اید که به `true` شدن `submitted` «واکنش» نشان می‌دهد:

```js {6-8}
function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!');
    }
  }, [submitted]);

  function handleSubmit() {
    setSubmitted(true);
  }

  // ...
}
```

بعداً، می‌خواهید پیام اعلان را بر اساس تم فعلی استایل دهید، بنابراین تم فعلی را می‌خوانید. از آنجا که `theme` در بدنه کامپوننت اعلام شده است، یک مقدار واکنش‌گرا است، بنابراین آن را به عنوان وابستگی اضافه می‌کنید:

```js {3,9,11}
function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!', theme);
    }
  }, [submitted, theme]); // ✅ All dependencies declared

  function handleSubmit() {
    setSubmitted(true);
  }  

  // ...
}
```

با این کار، یک باگ ایجاد کرده‌اید. تصور کنید ابتدا فرم را ارسال می‌کنید و سپس بین تم‌های تاریک و روشن جابه‌جا می‌شوید. `theme` تغییر خواهد کرد، افکت مجدداً اجرا می‌شود، و بنابراین همان اعلان را دوباره نمایش می‌دهد!

**مشکل اینجا این است که این کد اصلاً نباید یک افکت باشد.** می‌خواهید این درخواست POST را ارسال کنید و اعلان را در پاسخ به *ارسال فرم* نمایش دهید، که یک تعامل خاص است. برای اجرای کدی در پاسخ به تعامل خاص، آن منطق را مستقیماً در مدیریت‌کننده رویداد مربوطه قرار دهید:

```js {6-7}
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ Good: Event-specific logic is called from event handlers
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }  

  // ...
}
```

حالا که کد در یک مدیریت‌کننده رویداد است، واکنش‌گرا نیست—بنابراین فقط هنگام ارسال فرم توسط کاربر اجرا می‌شود. بیشتر درباره [انتخاب بین مدیریت‌کننده‌های رویداد و افکت‌ها](/learn/separating-events-from-effects#reactive-values-and-reactive-logic) و [نحوه حذف افکت‌های غیرضروری](/learn/you-might-not-need-an-effect) بخوانید.

### آیا افکت شما چند کار نامرتبط انجام می‌دهد؟ {/*is-your-effect-doing-several-unrelated-things*/}

سؤال بعدی که باید از خود بپرسید این است که آیا افکت شما چند کار نامرتبط انجام می‌دهد یا نه.

تصور کنید در حال ایجاد یک فرم حمل‌ونقل هستید که کاربر باید شهر و منطقه خود را انتخاب کند. فهرست `cities` را از سرور بر اساس `country` انتخاب‌شده fetch می‌کنید تا در یک منوی کشویی نمایش دهید:

```js
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ All dependencies declared

  // ...
```

این یک مثال خوب از [fetch کردن داده در یک افکت است.](/learn/you-might-not-need-an-effect#fetching-data) شما استیت `cities` را با شبکه بر اساس پراپ `country` هماهنگ می‌کنید. نمی‌توانید این کار را در یک مدیریت‌کننده رویداد انجام دهید زیرا باید به‌محض نمایش `ShippingForm` و هر زمان که `country` تغییر می‌کند fetch کنید (مهم نیست کدام تعامل باعث آن می‌شود).

حالا فرض کنید یک جعبه انتخاب دوم برای مناطق شهر اضافه می‌کنید که باید `areas` را برای `city` انتخاب‌شده فعلی fetch کند. ممکن است با اضافه کردن یک فراخوانی `fetch` دوم برای فهرست مناطق داخل همان افکت شروع کنید:

```js {15-24,28}
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 Avoid: A single Effect synchronizes two independent processes
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ All dependencies declared

  // ...
```

با این حال، از آنجا که افکت اکنون از متغیر استیت `city` استفاده می‌کند، مجبور بوده‌اید `city` را به فهرست وابستگی‌ها اضافه کنید. این، به نوبه خود، مشکلی ایجاد کرد: هنگامی که کاربر شهر متفاوتی را انتخاب می‌کند، افکت مجدداً اجرا می‌شود و `fetchCities(country)` را فراخوانی می‌کند. در نتیجه، فهرست شهرها را بارها به‌طور غیرضروری دوباره fetch می‌کنید.

**مشکل این کد این است که شما دو چیز متفاوت نامرتبط را هماهنگ می‌کنید:**

1. می‌خواهید استیت `cities` را با شبکه بر اساس پراپ `country` هماهنگ کنید.
1. می‌خواهید استیت `areas` را با شبکه بر اساس استیت `city` هماهنگ کنید.

منطق را به دو افکت تقسیم کنید، که هر کدام به پراپسی واکنش نشان می‌دهند که باید با آن هماهنگ شوند:

```js {19-33}
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ All dependencies declared

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]); // ✅ All dependencies declared

  // ...
```

حالا افکت اول فقط در صورتی مجدداً اجرا می‌شود که `country` تغییر کند، در حالی که افکت دوم هنگام تغییر `city` مجدداً اجرا می‌شود. آن‌ها را بر اساس هدف جدا کرده‌اید: دو چیز متفاوت توسط دو افکت مجزا هماهنگ می‌شوند. دو افکت مجزا دو فهرست وابستگی مجزا دارند، بنابراین به‌طور غیرعمدی یکدیگر را فعال نمی‌کنند.

کد نهایی از نسخه اصلی طولانی‌تر است، اما تقسیم این افکت‌ها همچنان درست است. [هر افکت باید یک فرآیند هماهنگ‌سازی مستقل را نمایندگی کند.](/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process) در این مثال، حذف یک افکت منطق افکت دیگر را خراب نمی‌کند. این بدان معناست که آن‌ها *چیزهای متفاوتی را هماهنگ می‌کنند*، و تقسیم آن‌ها خوب است. اگر نگران تکرار هستید، می‌توانید این کد را با [استخراج منطق تکراری به یک هوک سفارشی](/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks) بهبود ببخشید.

### آیا در حال خواندن استیتی برای محاسبه استیت بعدی هستید؟ {/*are-you-reading-some-state-to-calculate-the-next-state*/}

این افکت متغیر استیت `messages` را هر بار که یک پیام جدید می‌رسد با یک آرایه جدید ایجاد‌شده به‌روزرسانی می‌کند:

```js {2,6-8}
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    // ...
```

از `messages` برای [ایجاد یک آرایه جدید](/learn/updating-arrays-in-state) که با تمام پیام‌های موجود شروع می‌شود و پیام جدید را در انتها اضافه می‌کند، استفاده می‌کند. با این حال، از آنجا که `messages` یک مقدار واکنش‌گراست که توسط یک افکت خوانده می‌شود، باید وابستگی باشد:

```js {7,10}
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```

و واکنش‌گرا کردن `messages` به یک وابستگی، مشکلی را ایجاد می‌کند.

هر بار که پیامی دریافت می‌کنید، `setMessages()` باعث می‌شود کامپوننت با یک آرایه `messages` جدید که شامل پیام دریافت‌شده است، مجدداً رندر شود. با این حال، از آنجا که این افکت اکنون به `messages` وابسته است، این کار *همچنین* افکت را مجدداً هماهنگ می‌کند. بنابراین هر پیام جدید باعث می‌شود چت دوباره متصل شود. کاربر این را دوست نخواهد داشت!

برای رفع این مشکل، `messages` را داخل افکت نخوانید. به جای آن، یک [تابع به‌روزرسانی‌کننده (updater function)](/reference/react/useState#updating-state-based-on-the-previous-state) به `setMessages` ارسال کنید:

```js {7,10}
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

**توجه کنید که افکت شما حالا اصلاً متغیر `messages` را نمی‌خواند.** فقط باید یک تابع به‌روزرسانی‌کننده مثل `msgs => [...msgs, receivedMessage]` ارسال کنید. ری‌اکت [تابع به‌روزرسانی‌کننده شما را در یک صف قرار می‌دهد](/learn/queueing-a-series-of-state-updates) و آرگومان `msgs` را در رندر بعدی به آن ارائه می‌دهد. به همین دلیل افکت خود دیگر نیازی به وابستگی به `messages` ندارد. در نتیجه این رفع، دریافت یک پیام چت دیگر باعث نمی‌شود چت دوباره متصل شود.

### آیا می‌خواهید مقداری را بدون «واکنش» به تغییرات آن بخوانید؟ {/*do-you-want-to-read-a-value-without-reacting-to-its-changes*/}

<Wip>

این بخش یک **API آزمایشی توصیف می‌کند که هنوز در نسخه پایدار ری‌اکت منتشر نشده است.**

</Wip>

فرض کنید می‌خواهید وقتی کاربر پیام جدیدی دریافت می‌کند صدایی پخش کنید، مگر اینکه `isMuted` برابر `true` باشد:

```js {3,10-12}
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    // ...
```

از آنجا که افکت شما اکنون از `isMuted` در کد خود استفاده می‌کند، باید آن را به وابستگی‌ها اضافه کنید:

```js {10,15}
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]); // ✅ All dependencies declared
  // ...
```

مشکل این است که هر بار `isMuted` تغییر می‌کند (مثلاً وقتی کاربر دکمه «بی‌صدا» را فشار می‌دهد)، افکت مجدداً هماهنگ می‌شود و دوباره به چت متصل می‌شود. این تجربه کاربری مطلوبی نیست! (در این مثال، حتی خاموش کردن لینتر هم کار نمی‌کند—اگر این کار را بکنید، `isMuted` با مقدار قدیمی خود «گیر می‌کند».)

برای حل این مشکل، باید منطقی را که نباید واکنش‌گرا باشد از افکت استخراج کنید. نمی‌خواهید این افکت به تغییرات `isMuted` «واکنش» نشان دهد. [این قطعه منطق غیر واکنش‌گرا را به یک Effect Event منتقل کنید:](/learn/separating-events-from-effects#declaring-an-effect-event)

```js {1,7-12,18,21}
import { useState, useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

Effect Event‌ها به شما اجازه می‌دهند یک افکت را به بخش‌های واکنش‌گرا (که باید به مقادیر واکنش‌گرا مثل `roomId` و تغییراتشان «واکنش» نشان دهند) و بخش‌های غیر واکنش‌گرا (که فقط آخرین مقادیر خود را می‌خوانند، مثل `onMessage` که `isMuted` را می‌خواند) تقسیم کنید. **حالا که `isMuted` را داخل یک Effect Event می‌خوانید، نیازی نیست وابستگی افکت شما باشد.** در نتیجه، چت هنگام روشن و خاموش کردن تنظیم «بی‌صدا» مجدداً متصل نمی‌شود، که مشکل اصلی را حل می‌کند!

#### بسته‌بندی یک مدیریت‌کننده رویداد از پراپس {/*wrapping-an-event-handler-from-the-props*/}

ممکن است وقتی کامپوننت شما یک مدیریت‌کننده رویداد را به عنوان پراپ دریافت می‌کند، با مشکل مشابهی روبرو شوید:

```js {1,8,11}
function ChatRoom({ roomId, onReceiveMessage }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onReceiveMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId, onReceiveMessage]); // ✅ All dependencies declared
  // ...
```

فرض کنید کامپوننت والد در هر رندر یک تابع `onReceiveMessage` *متفاوت* ارسال می‌کند:

```js {3-5}
<ChatRoom
  roomId={roomId}
  onReceiveMessage={receivedMessage => {
    // ...
  }}
/>
```

از آنجا که `onReceiveMessage` یک وابستگی است، باعث می‌شود افکت پس از هر رندر مجدد والد، مجدداً هماهنگ شود. این کار باعث می‌شود دوباره به چت متصل شود. برای حل این مشکل، فراخوانی را در یک Effect Event بسته‌بندی کنید:

```js {4-6,12,15}
function ChatRoom({ roomId, onReceiveMessage }) {
  const [messages, setMessages] = useState([]);

  const onMessage = useEffectEvent(receivedMessage => {
    onReceiveMessage(receivedMessage);
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

Effect Event‌ها واکنش‌گرا نیستند، بنابراین نیازی نیست آن‌ها را به عنوان وابستگی مشخص کنید. در نتیجه، چت دیگر مجدداً متصل نمی‌شود حتی اگر کامپوننت والد تابعی را ارسال کند که در هر رندر مجدد متفاوت است.

#### جدا کردن کد واکنش‌گرا و غیر واکنش‌گرا {/*separating-reactive-and-non-reactive-code*/}

در این مثال، می‌خواهید هر بار `roomId` تغییر می‌کند یک بازدید را ثبت کنید. می‌خواهید `notificationCount` فعلی را در هر ثبت وارد کنید، اما *نمی‌خواهید* تغییر `notificationCount` یک رویداد ثبت را فعال کند.

راه‌حل دوباره جدا کردن کد غیر واکنش‌گرا به یک Effect Event است:

```js {2-4,7}
function Chat({ roomId, notificationCount }) {
  const onVisit = useEffectEvent(visitedRoomId => {
    logVisit(visitedRoomId, notificationCount);
  });

  useEffect(() => {
    onVisit(roomId);
  }, [roomId]); // ✅ All dependencies declared
  // ...
}
```

می‌خواهید منطق شما نسبت به `roomId` واکنش‌گرا باشد، بنابراین `roomId` را داخل افکت می‌خوانید. با این حال، نمی‌خواهید تغییر `notificationCount` یک بازدید اضافی ثبت کند، بنابراین `notificationCount` را داخل Effect Event می‌خوانید. [درباره خواندن آخرین پراپس و استیت از افکت‌ها با استفاده از Effect Event‌ها بیشتر یاد بگیرید.](/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)

### آیا مقدار واکنش‌گرایی به‌طور غیرعمدی تغییر می‌کند؟ {/*does-some-reactive-value-change-unintentionally*/}

گاهی اوقات، *می‌خواهید* افکت شما به یک مقدار خاص «واکنش» نشان دهد، اما آن مقدار بیشتر از آنچه دوست دارید تغییر می‌کند—و ممکن است هیچ تغییر واقعی از دید کاربر را بازتاب ندهد. مثلاً، فرض کنید یک شیء `options` در بدنه کامپوننت خود ایجاد می‌کنید، و سپس آن شیء را از داخل افکت می‌خوانید:

```js {3-6,9}
function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    // ...
```

این شیء در بدنه کامپوننت اعلام شده است، بنابراین یک [مقدار واکنش‌گرا است.](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) وقتی چنین مقدار واکنش‌گرایی را داخل یک افکت می‌خوانید، آن را به عنوان وابستگی اعلام می‌کنید. این تضمین می‌کند که افکت شما به تغییراتش «واکنش» نشان می‌دهد:

```js {3,6}
  // ...
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```

اعلام کردن آن به عنوان وابستگی مهم است! این تضمین می‌کند، مثلاً، اگر `roomId` تغییر کند، افکت شما با `options` جدید مجدداً به چت متصل شود. با این حال، در کد بالا مشکل دیگری هم وجود دارد. برای دیدن آن، در sandbox زیر در ورودی تایپ کنید، و ببینید در کنسول چه اتفاقی می‌افتد:

<Sandpack>

```js {expectedErrors: {'react-compiler': [10]}}
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // Temporarily disable the linter to demonstrate the problem
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js src/chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

در sandbox بالا، ورودی فقط متغیر استیت `message` را به‌روزرسانی می‌کند. از دید کاربر، این نباید بر اتصال چت تأثیر بگذارد. با این حال، هر بار `message` را به‌روزرسانی می‌کنید، کامپوننت شما مجدداً رندر می‌شود. وقتی کامپوننت شما مجدداً رندر می‌شود، کد داخل آن دوباره از ابتدا اجرا می‌شود.

یک شیء `options` جدید در هر رندر مجدد کامپوننت `ChatRoom` از ابتدا ایجاد می‌شود. ری‌اکت می‌بیند که شیء `options` یک *شیء متفاوت* از شیء `options` ایجاد‌شده در طول رندر قبلی است. به همین دلیل افکت شما (که به `options` وابسته است) را مجدداً هماهنگ می‌کند، و چت هنگام تایپ دوباره متصل می‌شود.

**این مشکل فقط بر اشیاء و توابع تأثیر می‌گذارد. در جاوااسکریپت، هر شیء و تابع جدید ایجاد‌شده متمایز از همه دیگران در نظر گرفته می‌شود. مهم نیست که محتویات داخل آن‌ها ممکن است یکسان باشد!**

```js {7-8}
// During the first render
const options1 = { serverUrl: 'https://localhost:1234', roomId: 'music' };

// During the next render
const options2 = { serverUrl: 'https://localhost:1234', roomId: 'music' };

// These are two different objects!
console.log(Object.is(options1, options2)); // false
```

**وابستگی‌های شیء و تابع می‌توانند باعث شوند افکت شما بیش از آنچه نیاز دارید مجدداً هماهنگ شود.** 

به همین دلیل، هر زمان که ممکن است، باید سعی کنید از اشیاء و توابع به عنوان وابستگی‌های افکت خود اجتناب کنید. به جای آن، سعی کنید آن‌ها را به خارج کامپوننت منتقل کنید، داخل افکت قرار دهید، یا مقادیر primitive را از آن‌ها استخراج کنید.

#### اشیاء و توابع استاتیک را به خارج کامپوننت منتقل کنید {/*move-static-objects-and-functions-outside-your-component*/}

اگر شیء به هیچ پراپس و استیتی وابسته نیست، می‌توانید آن شیء را به خارج کامپوننت منتقل کنید:

```js {1-4,13}
const options = {
  serverUrl: 'https://localhost:1234',
  roomId: 'music'
};

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
```

به این ترتیب، به لینتر *ثابت می‌کنید* که واکنش‌گرا نیست. نمی‌تواند در نتیجه رندر مجدد تغییر کند، بنابراین نیازی نیست وابستگی باشد. حالا رندر مجدد `ChatRoom` باعث نمی‌شود افکت شما مجدداً هماهنگ شود.

این برای توابع هم کار می‌کند:

```js {1-6,12}
function createOptions() {
  return {
    serverUrl: 'https://localhost:1234',
    roomId: 'music'
  };
}

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
```

از آنجا که `createOptions` خارج از کامپوننت شما اعلام شده است، یک مقدار واکنش‌گرا نیست. به همین دلیل نیازی نیست در وابستگی‌های افکت شما مشخص شود، و چرا هرگز باعث نمی‌شود افکت شما مجدداً هماهنگ شود.

#### اشیاء و توابع پویا را به داخل افکت منتقل کنید {/*move-dynamic-objects-and-functions-inside-your-effect*/}

اگر شیء شما به یک مقدار واکنش‌گرا وابسته است که ممکن است در نتیجه رندر مجدد تغییر کند، مثل پراپ `roomId`، نمی‌توانید آن را به *خارج* کامپوننت بکشید. با این حال، می‌توانید ایجاد آن را به *داخل* کد افکت خود منتقل کنید:

```js {7-10,11,14}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

حالا که `options` داخل افکت شما اعلام شده است، دیگر وابستگی افکت شما نیست. به جای آن، تنها مقدار واکنش‌گرای استفاده‌شده توسط افکت شما `roomId` است. از آنجا که `roomId` یک شیء یا تابع نیست، می‌توانید مطمئن باشید که *به‌طور غیرعمدی* متفاوت نخواهد بود. در جاوااسکریپت، اعداد و رشته‌ها بر اساس محتوایشان مقایسه می‌شوند:

```js {7-8}
// During the first render
const roomId1 = 'music';

// During the next render
const roomId2 = 'music';

// These two strings are the same!
console.log(Object.is(roomId1, roomId2)); // true
```

به لطف این رفع، چت دیگر هنگام ویرایش ورودی مجدداً متصل نمی‌شود:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom roomId={roomId} />
    </>
  );
}
```

```js src/chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

با این حال، هنگامی که منوی کشویی `roomId` را تغییر می‌دهید، همان‌طور که انتظار دارید، *دوباره* متصل می‌شود.

این برای توابع هم کار می‌کند:

```js {7-12,14}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() {
      return {
        serverUrl: serverUrl,
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

می‌توانید توابع خود را برای گروه‌بندی قطعات منطق داخل افکت بنویسید. تا زمانی که آن‌ها را *داخل* افکت خود نیز اعلام کنید، مقادیر واکنش‌گرا نیستند، و بنابراین نیازی نیست وابستگی‌های افکت شما باشند.

#### مقادیر primitive را از اشیاء بخوانید {/*read-primitive-values-from-objects*/}

گاهی اوقات، ممکن است یک شیء از پراپس دریافت کنید:

```js {1,5,8}
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```

خطر اینجا این است که کامپوننت والد شیء را در طول رندر ایجاد می‌کند:

```js {3-6}
<ChatRoom
  roomId={roomId}
  options={{
    serverUrl: serverUrl,
    roomId: roomId
  }}
/>
```

این کار باعث می‌شود افکت شما هر بار که کامپوننت والد مجدداً رندر می‌شود، دوباره متصل شود. برای رفع این مشکل، اطلاعات را از شیء *خارج* افکت بخوانید، و از داشتن وابستگی‌های شیء و تابع اجتناب کنید:

```js {4,7-8,12}
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

منطق کمی تکراری می‌شود (شما برخی مقادیر را از یک شیء خارج افکت می‌خوانید، و سپس یک شیء با همان مقادیر داخل افکت ایجاد می‌کنید). اما این کار بسیار صریح می‌کند که افکت شما *واقعاً* به چه اطلاعاتی وابسته است. اگر یک شیء به‌طور غیرعمدی توسط کامپوننت والد دوباره ایجاد شود، چت مجدداً متصل نمی‌شود. با این حال، اگر `options.roomId` یا `options.serverUrl` واقعاً متفاوت باشند، چت مجدداً متصل می‌شود.

#### مقادیر primitive را از توابع محاسبه کنید {/*calculate-primitive-values-from-functions*/}

همین رویکرد می‌تواند برای توابع کار کند. مثلاً، فرض کنید کامپوننت والد تابعی را ارسال می‌کند:

```js {3-8}
<ChatRoom
  roomId={roomId}
  getOptions={() => {
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }}
/>
```

برای اجتناب از واکنش‌گرا کردن آن به یک وابستگی (و باعث شدن اتصال مجدد در رندرهای مجدد)، آن را خارج افکت فراخوانی کنید. این کار مقادیر `roomId` و `serverUrl` را به شما می‌دهد که شیء نیستند، و می‌توانید از داخل افکت خود بخوانید:

```js {1,4}
function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions();
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

این فقط برای توابع [خالص (pure)](/learn/keeping-components-pure) کار می‌کند زیرا فراخوانی آن‌ها در طول رندر ایمن است. اگر تابع شما یک مدیریت‌کننده رویداد است، اما نمی‌خواهید تغییراتش افکت شما را مجدداً هماهنگ کند، [آن را به جای آن در یک Effect Event بسته‌بندی کنید.](#do-you-want-to-read-a-value-without-reacting-to-its-changes)

<Recap>

- وابستگی‌ها باید همیشه با کد مطابقت داشته باشند.
- وقتی از وابستگی‌های خود راضی نیستید، آنچه باید ویرایش کنید کد است.
- خاموش کردن لینتر منجر به باگ‌های بسیار گیج‌کننده می‌شود، و باید همیشه از آن اجتناب کنید.
- برای حذف یک وابستگی، باید به لینتر «ثابت کنید» که ضروری نیست.
- اگر برخی کدها باید در پاسخ به تعامل خاصی اجرا شوند، آن کد را به یک مدیریت‌کننده رویداد منتقل کنید.
- اگر بخش‌های متفاوتی از افکت شما باید به دلایل متفاوت مجدداً اجرا شوند، آن را به چند افکت تقسیم کنید.
- اگر می‌خواهید بر اساس استیت قبلی، استیتی را به‌روزرسانی کنید، یک تابع به‌روزرسانی‌کننده ارسال کنید.
- اگر می‌خواهید آخرین مقدار را بدون «واکنش» به آن بخوانید، یک Effect Event از افکت خود استخراج کنید.
- در جاوااسکریپت، اشیاء و توابع متفاوت در نظر گرفته می‌شوند اگر در زمان‌های متفاوتی ایجاد شده باشند.
- سعی کنید از وابستگی‌های شیء و تابع اجتناب کنید. آن‌ها را به خارج کامپوننت یا داخل افکت منتقل کنید.

</Recap>

<Challenges>

#### رفع یک بازه بازنشانی‌شده {/*fix-a-resetting-interval*/}

این افکت یک بازه راه‌اندازی می‌کند که هر ثانیه تیک می‌زند. اتفاق عجیبی را متوجه شده‌اید: به نظر می‌رسد بازه هر بار که تیک می‌زند تخریب و دوباره ایجاد می‌شود. کد را طوری رفع کنید که بازه دائماً دوباره ایجاد نشود.

<Hint>

به نظر می‌رسد کد این افکت به `count` وابسته است. آیا راهی وجود دارد که این وابستگی لازم نباشد؟ باید راهی برای به‌روزرسانی استیت `count` بر اساس مقدار قبلی آن بدون اضافه کردن وابستگی به آن مقدار وجود داشته باشد.

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ Creating an interval');
    const id = setInterval(() => {
      console.log('⏰ Interval tick');
      setCount(count + 1);
    }, 1000);
    return () => {
      console.log('❌ Clearing an interval');
      clearInterval(id);
    };
  }, [count]);

  return <h1>Counter: {count}</h1>
}
```

</Sandpack>

<Solution>

می‌خواهید استیت `count` را از داخل افکت روی `count + 1` به‌روزرسانی کنید. با این حال، این کار باعث می‌شود افکت شما به `count` وابسته شود، که با هر تیک تغییر می‌کند، و به همین دلیل بازه شما در هر تیک دوباره ایجاد می‌شود.

برای حل این مشکل، از [تابع به‌روزرسانی‌کننده](/reference/react/useState#updating-state-based-on-the-previous-state) استفاده کنید و به جای `setCount(count + 1)`، `setCount(c => c + 1)` بنویسید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ Creating an interval');
    const id = setInterval(() => {
      console.log('⏰ Interval tick');
      setCount(c => c + 1);
    }, 1000);
    return () => {
      console.log('❌ Clearing an interval');
      clearInterval(id);
    };
  }, []);

  return <h1>Counter: {count}</h1>
}
```

</Sandpack>

به جای خواندن `count` داخل افکت، یک دستور `c => c + 1` («این عدد را افزایش بده!») به ری‌اکت ارسال می‌کنید. ری‌اکت آن را در رندر بعدی اعمال می‌کند. و از آنجا که دیگر نیازی به خواندن مقدار `count` داخل افکت ندارید، می‌توانید وابستگی‌های افکت خود را خالی (`[]`) نگه دارید. این کار از ایجاد مجدد بازه در هر تیک توسط افکت شما جلوگیری می‌کند.

</Solution>

#### رفع یک انیمیشن مجدداً فعال‌شده {/*fix-a-retriggering-animation*/}

در این مثال، وقتی «نمایش» را فشار می‌دهید، یک پیام خوش‌آمد محو می‌شود. انیمیشن یک ثانیه طول می‌کشد. وقتی «حذف» را فشار می‌دهید، پیام خوش‌آمد بلافاصله ناپدید می‌شود. منطق انیمیشن محو شدن در فایل `animation.js` به صورت یک [حلقه انیمیشن](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) جاوااسکریپت ساده پیاده‌سازی شده است. نیازی به تغییر آن منطق ندارید. می‌توانید آن را به عنوان یک کتابخانه شخص ثالث در نظر بگیرید. افکت شما یک نمونه از `FadeInAnimation` برای نود DOM ایجاد می‌کند، و سپس `start(duration)` یا `stop()` را برای کنترل انیمیشن فراخوانی می‌کند. `duration` با یک اسلایدر کنترل می‌شود. اسلایدر را تنظیم کنید و ببینید انیمیشن چگونه تغییر می‌کند.

این کد از قبل کار می‌کند، اما چیزی وجود دارد که می‌خواهید تغییر دهید. در حال حاضر، وقتی اسلایدری که متغیر استیت `duration` را کنترل می‌کند حرکت می‌دهید، انیمیشن را مجدداً فعال می‌کند. رفتار را تغییر دهید تا افکت به متغیر `duration` «واکنش» نشان ندهد. وقتی «نمایش» را فشار می‌دهید، افکت باید از `duration` فعلی روی اسلایدر استفاده کند. با این حال، حرکت دادن خود اسلایدر نباید به‌خودی‌خود انیمیشن را مجدداً فعال کند.

<Hint>

آیا خطی از کد داخل افکت وجود دارد که نباید واکنش‌گرا باشد؟ چگونه می‌توان کد غیر واکنش‌گرا را از افکت خارج کرد؟

</Hint>

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js
import { useState, useEffect, useRef } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome({ duration }) {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [duration]);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Welcome
    </h1>
  );
}

export default function App() {
  const [duration, setDuration] = useState(1000);
  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        <input
          type="range"
          min="100"
          max="3000"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        <br />
        Fade in duration: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  );
}
```

```js src/animation.js
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    if (this.duration === 0) {
      // Jump to end immediately
      this.onProgress(1);
    } else {
      this.onProgress(0);
      // Start animating
      this.startTime = performance.now();
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
```

</Sandpack>

<Solution>

افکت شما باید آخرین مقدار `duration` را بخواند، اما نمی‌خواهید به تغییرات `duration` «واکنش» نشان دهد. از `duration` برای شروع انیمیشن استفاده می‌کنید، اما شروع انیمیشن واکنش‌گرا نیست. خط کد غیر واکنش‌گرا را به یک Effect Event استخراج کنید، و آن تابع را از افکت خود فراخوانی کنید.

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js
import { useState, useEffect, useRef } from 'react';
import { FadeInAnimation } from './animation.js';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

function Welcome({ duration }) {
  const ref = useRef(null);

  const onAppear = useEffectEvent(animation => {
    animation.start(duration);
  });

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    onAppear(animation);
    return () => {
      animation.stop();
    };
  }, []);

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    >
      Welcome
    </h1>
  );
}

export default function App() {
  const [duration, setDuration] = useState(1000);
  const [show, setShow] = useState(false);

  return (
    <>
      <label>
        <input
          type="range"
          min="100"
          max="3000"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
        />
        <br />
        Fade in duration: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  );
}
```

```js src/animation.js
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  start(duration) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    this.onProgress(progress);
    if (progress < 1) {
      // We still have more frames to paint
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
```

</Sandpack>

Effect Event‌هایی مثل `onAppear` واکنش‌گرا نیستند، بنابراین می‌توانید `duration` را داخل آن بخوانید بدون اینکه انیمیشن مجدداً فعال شود.

</Solution>

#### رفع یک چت مجدداً متصل‌شونده {/*fix-a-reconnecting-chat*/}

در این مثال، هر بار «تغییر تم» را فشار می‌دهید، چت مجدداً متصل می‌شود. چرا این اتفاق می‌افتد؟ اشتباه را رفع کنید تا چت فقط وقتی URL سرور را ویرایش می‌کنید یا اتاق چت متفاوتی را انتخاب می‌کنید، مجدداً متصل شود.

`chat.js` را به عنوان یک کتابخانه شخص ثالث خارجی در نظر بگیرید: می‌توانید برای بررسی API آن به آن مراجعه کنید، اما آن را ویرایش نکنید.

<Hint>

بیش از یک راه برای رفع این مشکل وجود دارد، اما در نهایت می‌خواهید از داشتن یک شیء به عنوان وابستگی اجتناب کنید.

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle theme
      </button>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom options={options} />
    </div>
  );
}
```

```js src/ChatRoom.js active
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}
```

```js src/chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
label, button { display: block; margin-bottom: 5px; }
.dark { background: #222; color: #eee; }
```

</Sandpack>

<Solution>

افکت شما مجدداً در حال اجرا است زیرا به شیء `options` وابسته است. اشیاء می‌توانند به‌طور غیرعمدی دوباره ایجاد شوند، باید هر زمان که ممکن است از آن‌ها به عنوان وابستگی افکت‌های خود اجتناب کنید.

کمتر تهاجمی‌ترین رفع این است که `roomId` و `serverUrl` را دقیقاً خارج افکت بخوانید، و سپس افکت را به آن مقادیر primitive (که نمی‌توانند به‌طور غیرعمدی تغییر کنند) وابسته کنید. داخل افکت، یک شیء ایجاد کنید و آن را به `createConnection` ارسال کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle theme
      </button>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom options={options} />
    </div>
  );
}
```

```js src/ChatRoom.js active
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {
  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return <h1>Welcome to the {options.roomId} room!</h1>;
}
```

```js src/chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
label, button { display: block; margin-bottom: 5px; }
.dark { background: #222; color: #eee; }
```

</Sandpack>

حتی بهتر است که پراپ `options` شیء را با پراپ‌های مشخص‌تر `roomId` و `serverUrl` جایگزین کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle theme
      </button>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        serverUrl={serverUrl}
      />
    </div>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ roomId, serverUrl }) {
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}
```

```css
label, button { display: block; margin-bottom: 5px; }
.dark { background: #222; color: #eee; }
```

</Sandpack>

پایبندی به پراپس primitive هر زمان که ممکن است، بهینه‌سازی کامپوننت‌های شما را بعداً آسان‌تر می‌کند.

</Solution>

#### رفع یک چت مجدداً متصل‌شونده، دوباره {/*fix-a-reconnecting-chat-again*/}

این مثال به چت با یا بدون رمزنگاری متصل می‌شود. کادر تأیید را تغییر دهید و به پیام‌های متفاوت در کنسول هنگام روشن و خاموش بودن رمزنگاری توجه کنید. اتاق را تغییر دهید امتحان کنید. سپس، تغییر تم را امتحان کنید. وقتی به یک اتاق چت متصل هستید، هر چند ثانیه پیام‌های جدیدی دریافت می‌کنید. بررسی کنید که رنگ آن‌ها با تمی که انتخاب کرده‌اید مطابقت داشته باشد.

در این مثال، چت هر بار که سعی می‌کنید تم را تغییر دهید، مجدداً متصل می‌شود. این را رفع کنید. پس از رفع، تغییر تم نباید باعث اتصال مجدد چت شود، اما تغییر تنظیمات رمزنگاری یا تغییر اتاق باید باعث اتصال مجدد شود.

هیچ کدی در `chat.js` را تغییر ندهید. به جز این، می‌توانید هر کدی را تا زمانی که به همان رفتار منجر شود تغییر دهید. مثلاً، ممکن است پیدا کنید که تغییر اینکه کدام پراپس ارسال می‌شوند مفید باشد.

<Hint>

شما دو تابع ارسال می‌کنید: `onMessage` و `createConnection`. هر دو هر بار که `App` مجدداً رندر می‌شود از ابتدا ایجاد می‌شوند. آن‌ها هر بار مقادیر جدید در نظر گرفته می‌شوند، به همین دلیل افکت شما را مجدداً فعال می‌کنند.

یکی از این توابع یک مدیریت‌کننده رویداد است. آیا راهی می‌دانید که یک مدیریت‌کننده رویداد را در یک افکت فراخوانی کنید بدون اینکه به مقادیر جدید تابع مدیریت‌کننده رویداد «واکنش» نشان دهید؟ این کار به درد بخور خواهد بود!

تابع دیگر فقط برای ارسال برخی استیت به یک متد API واردشده وجود دارد. آیا این تابع واقعاً ضروری است؟ چه اطلاعات اساسی در حال ارسال است؟ ممکن است نیاز باشد برخی import‌ها را از `App.js` به `ChatRoom.js` منتقل کنید.

</Hint>

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest",
    "toastify-js": "1.12.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';
import { showNotification } from './notifications.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        onMessage={msg => {
          showNotification('New message: ' + msg, isDark ? 'dark' : 'light');
        }}
        createConnection={() => {
          const options = {
            serverUrl: 'https://localhost:1234',
            roomId: roomId
          };
          if (isEncrypted) {
            return createEncryptedConnection(options);
          } else {
            return createUnencryptedConnection(options);
          }
        }}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function ChatRoom({ roomId, createConnection, onMessage }) {
  useEffect(() => {
    const connection = createConnection();
    connection.on('message', (msg) => onMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [createConnection, onMessage]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createEncryptedConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '" room... (encrypted)');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

export function createUnencryptedConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room (unencrypted)...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}
```

```js src/notifications.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
```

```css
label, button { display: block; margin-bottom: 5px; }
```

</Sandpack>

<Solution>

بیش از یک راه درست برای حل این مشکل وجود دارد، اما در اینجا یک راه‌حل ممکن آورده شده است.

در مثال اصلی، تغییر تم باعث می‌شد توابع `onMessage` و `createConnection` متفاوتی ایجاد و ارسال شوند. از آنجا که افکت به این توابع وابسته بود، چت هر بار که تم را تغییر می‌دادید، مجدداً متصل می‌شد.

برای رفع مشکل با `onMessage`، باید آن را در یک Effect Event بسته‌بندی کنید:

```js {1,2,6}
export default function ChatRoom({ roomId, createConnection, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    // ...
```

برخلاف پراپ `onMessage`، Effect Event با نام `onReceiveMessage` واکنش‌گرا نیست. به همین دلیل نیازی نیست وابستگی افکت شما باشد. در نتیجه، تغییرات `onMessage` باعث نمی‌شود چت مجدداً متصل شود.

نمی‌توانید همین کار را با `createConnection` انجام دهید زیرا *باید* واکنش‌گرا باشد. *می‌خواهید* افکت مجدداً فعال شود اگر کاربر بین اتصال رمزنگاری‌شده و غیر رمزنگاری‌شده جابه‌جا شود، یا اگر کاربر اتاق فعلی را تغییر دهد. با این حال، از آنجا که `createConnection` یک تابع است، نمی‌توانید بررسی کنید که آیا اطلاعاتی که می‌خواند *واقعاً* تغییر کرده یا نه. برای حل این مشکل، به جای ارسال `createConnection` از کامپوننت `App`، مقادیر خام `roomId` و `isEncrypted` را ارسال کنید:

```js {2-3}
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
        onMessage={msg => {
          showNotification('New message: ' + msg, isDark ? 'dark' : 'light');
        }}
      />
```

حالا می‌توانید تابع `createConnection` را به *داخل* افکت منتقل کنید به جای اینکه آن را از `App` ارسال کنید:

```js {1-4,6,10-20}
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }
    // ...
```

پس از این دو تغییر، افکت شما دیگر به هیچ مقدار تابعی وابسته نیست:

```js {1,8,10,21}
export default function ChatRoom({ roomId, isEncrypted, onMessage }) { // Reactive values
  const onReceiveMessage = useEffectEvent(onMessage); // Not reactive

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId // Reading a reactive value
      };
      if (isEncrypted) { // Reading a reactive value
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }

    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]); // ✅ All dependencies declared
```

در نتیجه، چت فقط زمانی که چیزی معنادار (`roomId` یا `isEncrypted`) تغییر می‌کند، مجدداً متصل می‌شود:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest",
    "toastify-js": "1.12.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

import { showNotification } from './notifications.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <label>
        <input
          type="checkbox"
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
        onMessage={msg => {
          showNotification('New message: ' + msg, isDark ? 'dark' : 'light');
        }}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }

    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createEncryptedConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '" room... (encrypted)');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}

export function createUnencryptedConnection({ serverUrl, roomId }) {
  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }
  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room (unencrypted)...');
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    },
    on(event, callback) {
      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }
      messageCallback = callback;
    },
  };
}
```

```js src/notifications.js
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function showNotification(message, theme) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: 'top',
    position: 'right',
    style: {
      background: theme === 'dark' ? 'black' : 'white',
      color: theme === 'dark' ? 'white' : 'black',
    },
  }).showToast();
}
```

```css
label, button { display: block; margin-bottom: 5px; }
```

</Sandpack>

</Solution>

</Challenges>
