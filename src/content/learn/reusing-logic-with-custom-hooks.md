---
title: 'استفادهٔ مجدد از منطق با هوک‌های سفارشی'
---

<Intro>

ری‌اکت با چندین هوک داخلی مثل `useState`، `useContext`، و `useEffect` همراه است. گاهی آرزو می‌کنید که هوکی برای منظور خاص‌تری وجود داشت: مثلاً برای واکشی داده، برای پیگیری اینکه آیا کاربر آنلاین است یا نه، یا برای اتصال به یک اتاق چت. ممکن است این هوک‌ها را در ری‌اکت پیدا نکنید، اما می‌توانید هوک‌های خودتان را برای نیازهای اپلیکیشنتان بسازید.

</Intro>

<YouWillLearn>

- هوک‌های سفارشی چه هستند، و چگونه هوک خودتان را بنویسید
- چگونه منطق را بین کامپوننت‌ها استفادهٔ مجدد کنید
- چگونه هوک‌های سفارشی خود را نام‌گذاری و ساختار دهید
- چه زمانی و چرا هوک‌های سفارشی استخراج کنید

</YouWillLearn>

## هوک‌های سفارشی: اشتراک‌گذاری منطق بین کامپوننت‌ها {/*custom-hooks-sharing-logic-between-components*/}

تصور کنید در حال توسعهٔ اپلیکیشنی هستید که به‌شدت به شبکه وابسته است (همان‌طور که بیشتر اپلیکیشن‌ها هستند). می‌خواهید اگر اتصال شبکه کاربر در حین استفاده از اپلیکیشن شما به‌طور تصادفی قطع شد، به او هشدار دهید. چگونه این کار را انجام می‌دهید؟ به‌نظر می‌رسد در کامپوننتتان به دو چیز نیاز دارید:

1. یک تکه استیت که پیگیری می‌کند آیا شبکه آنلاین است یا نه.
2. یک افکت که به رویدادهای سراسری [`online`](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) و [`offline`](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) مشترک می‌شود، و آن استیت را به‌روز می‌کند.

این کار کامپوننت شما را با وضعیت شبکه [همگام](/learn/synchronizing-with-effects) نگه می‌دارد. ممکن است با چیزی شبیه این شروع کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

</Sandpack>

network را روشن و خاموش کنید، و توجه کنید این `StatusBar` چگونه در پاسخ به اقدامات شما به‌روز می‌شود.

حالا تصور کنید *همچنین* می‌خواهید از همان منطق در یک کامپوننت متفاوت استفاده کنید. می‌خواهید یک دکمهٔ Save پیاده‌سازی کنید که وقتی شبکه قطع است غیرفعال می‌شود و به‌جای «Save» نشان می‌دهد «Reconnecting...».

برای شروع، می‌توانید استیت `isOnline` و افکت را در `SaveButton` کپی و جای‌گذاری کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
```

</Sandpack>

تأیید کنید که اگر شبکه را خاموش کنید، دکمه ظاهرش را تغییر می‌دهد.

این دو کامپوننت به‌خوبی کار می‌کنند، اما تکرار منطق بین آن‌ها متأسفانه است. به‌نظر می‌رسد با وجود اینکه *ظاهر بصری* متفاوتی دارند، می‌خواهید منطق را بین آن‌ها استفادهٔ مجدد کنید.

### استخراج هوک سفارشی خود از یک کامپوننت {/*extracting-your-own-custom-hook-from-a-component*/}

تصور کنید برای لحظه‌ای، مشابه [`useState`](/reference/react/useState) و [`useEffect`](/reference/react/useEffect)، یک هوک داخلی `useOnlineStatus` وجود داشت. آن‌گاه هر دوی این کامپوننت‌ها می‌توانستند ساده شوند و می‌توانستید تکرار بین آن‌ها را حذف کنید:

```js {2,7}
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}
```

اگرچه چنین هوک داخلی‌ای وجود ندارد، می‌توانید آن را خودتان بنویسید. تابعی به نام `useOnlineStatus` اعلام کنید و تمام کد تکراری را از کامپوننت‌هایی که قبلاً نوشتید به داخل آن منتقل کنید:

```js {2-16}
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```

در پایان تابع، `isOnline` را برگردانید. این به کامپوننت‌های شما اجازه می‌دهد آن مقدار را بخوانند:

<Sandpack>

```js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
```

```js src/useOnlineStatus.js
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```

</Sandpack>

تأیید کنید که روشن و خاموش کردن شبکه هر دو کامپوننت را به‌روز می‌کند.

حالا کامپوننت‌های شما منطق تکراری زیادی ندارند. **مهم‌تر از آن، کد داخل آن‌ها توصیف می‌کند *چه می‌خواهند انجام دهند* (استفاده از وضعیت آنلاین!) نه *چگونه انجام دهند* (با اشتراک در رویدادهای مرورگر).**

وقتی منطق را در هوک‌های سفارشی استخراج می‌کنید، می‌توانید جزئیات پیچیدهٔ نحوهٔ برخورد با یک سیستم خارجی یا یک API مرورگر را پنهان کنید. کد کامپوننت‌های شما قصد شما را بیان می‌کند، نه پیاده‌سازی را.

### نام هوک‌ها همیشه با `use` شروع می‌شود {/*hook-names-always-start-with-use*/}

اپلیکیشن‌های ری‌اکت از کامپوننت‌ها ساخته می‌شوند. کامپوننت‌ها از هوک‌ها ساخته می‌شوند، چه داخلی چه سفارشی. احتمالاً اغلب از هوک‌های سفارشی که دیگران ساخته‌اند استفاده خواهید کرد، اما گهگاه ممکن است خودتان یکی بنویسید!

باید این قراردادهای نام‌گذاری را رعایت کنید:

1. **نام کامپوننت‌های ری‌اکت باید با یک حرف بزرگ شروع شود،** مثل `StatusBar` و `SaveButton`. کامپوننت‌های ری‌اکت همچنین باید چیزی را برگردانند که ری‌اکت می‌داند چگونه نمایش دهد، مثل یک تکه JSX.
2. **نام هوک‌ها باید با `use` شروع شود و سپس یک حرف بزرگ بیاید،** مثل [`useState`](/reference/react/useState) (داخلی) یا `useOnlineStatus` (سفارشی، مثل موردی که در صفحه بود). هوک‌ها می‌توانند مقادیر دلخواه برگردانند.

این قرارداد تضمین می‌کند که همیشه می‌توانید به یک کامپوننت نگاه کنید و بدانید استیت، افکت‌ها، و سایر ویژگی‌های ری‌اکت کجا ممکن است «پنهان» باشند. مثلاً، اگر فراخوانی تابع `getColor()` را داخل کامپوننت خود می‌بینید، می‌توانید مطمئن باشید که نمی‌تواند حاوی استیت ری‌اکت باشد زیرا نام آن با `use` شروع نمی‌شود. با این حال، فراخوانی تابعی مثل `useOnlineStatus()` به‌احتمال زیاد حاوی فراخوانی‌های هوک‌های دیگر داخلش است!

<Note>

اگر لینتر شما [برای ری‌اکت پیکربندی شده باشد،](/learn/editor-setup#linting) این قرارداد نام‌گذاری را اجرا می‌کند. به سندباکس بالا برگردید و `useOnlineStatus` را به `getOnlineStatus` تغییر نام دهید. توجه کنید که لینتر دیگر اجازه نمی‌دهد `useState` یا `useEffect` را داخل آن فراخوانی کنید. فقط هوک‌ها و کامپوننت‌ها می‌توانند هوک‌های دیگر را فراخوانی کنند!

</Note>

<DeepDive>

#### آیا تمام توابعی که در طول رندر فراخوانی می‌شوند باید با پیشوند use شروع شوند؟ {/*should-all-functions-called-during-rendering-start-with-the-use-prefix*/}

خیر. توابعی که هوک‌ها را *فراخوانی نمی‌کنند* لازم نیست خود *هوک* باشند.

اگر تابع شما هیچ هوکی فراخوانی نمی‌کند، از پیشوند `use` اجتناب کنید. در عوض، آن را به‌عنوان یک تابع معمولی *بدون* پیشوند `use` بنویسید. مثلاً، `useSorted` زیر هیچ هوکی فراخوانی نمی‌کند، پس به‌جای آن آن را `getSorted` بنامید:

```js
// 🔴 Avoid: A Hook that doesn't use Hooks
function useSorted(items) {
  return items.slice().sort();
}

// ✅ Good: A regular function that doesn't use Hooks
function getSorted(items) {
  return items.slice().sort();
}
```

این تضمین می‌کند که کد شما می‌تواند این تابع معمولی را هر جایی، از جمله در شرایط، فراخوانی کند:

```js
function List({ items, shouldSort }) {
  let displayedItems = items;
  if (shouldSort) {
    // ✅ It's ok to call getSorted() conditionally because it's not a Hook
    displayedItems = getSorted(items);
  }
  // ...
}
```

شما باید پیشوند `use` را به تابعی بدهید (و در نتیجه آن را به یک هوک تبدیل کنید) اگر از حداقل یک هوک داخلش استفاده می‌کند:

```js
// ✅ Good: A Hook that uses other Hooks
function useAuth() {
  return useContext(Auth);
}
```

از نظر فنی، این توسط ری‌اکت اجرا نمی‌شود. در اصل، می‌توانید هوکی بسازید که هوک‌های دیگر را فراخوانی نکند. این اغلب گیج‌کننده و محدودکننده است، بنابراین بهتر است از این الگو اجتناب کنید. با این حال، ممکن است موارد نادری باشد که مفید باشد. مثلاً، شاید تابع شما الان از هیچ هوکی استفاده نمی‌کند، اما قصد دارید در آینده فراخوانی‌های هوک به آن اضافه کنید. آن‌گاه منطقی است که آن را با پیشوند `use` نام‌گذاری کنید:

```js {3-4}
// ✅ Good: A Hook that will likely use some other Hooks later
function useAuth() {
  // TODO: Replace with this line when authentication is implemented:
  // return useContext(Auth);
  return TEST_USER;
}
```

سپس کامپوننت‌ها نخواهند توانست آن را به‌صورت شرطی فراخوانی کنند. این وقتی مهم می‌شود که واقعاً فراخوانی‌های هوک را داخلش اضافه می‌کنید. اگر قصد ندارید داخلش از هوک‌ها استفاده کنید (حالا یا بعداً)، آن را هوک نکنید.

</DeepDive>

### هوک‌های سفارشی به شما اجازه می‌دهند منطق استیت‌دار را به اشتراک بگذارید، نه خود استیت را {/*custom-hooks-let-you-share-stateful-logic-not-state-itself*/}

در مثال قبلی، وقتی شبکه را روشن و خاموش کردید، هر دو کامپوننت با هم به‌روز شدند. با این حال، اشتباه است فکر کنید یک متغیر استیت `isOnline` واحد بین آن‌ها به اشتراک گذاشته شده. به این کد نگاه کنید:

```js {2,7}
function StatusBar() {
  const isOnline = useOnlineStatus();
  // ...
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  // ...
}
```

این همان‌طور کار می‌کند که قبل از استخراج تکرار کار می‌کرد:

```js {2-5,10-13}
function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // ...
  }, []);
  // ...
}

function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // ...
  }, []);
  // ...
}
```

این دو متغیر استیت و افکت کاملاً مستقل هستند! آن‌ها اتفاقاً در همان زمان مقدار یکسانی داشتند زیرا شما آن‌ها را با همان مقدار خارجی (اینکه شبکه روشن است) همگام کردید.

برای نشان دادن بهتر این موضوع، به یک مثال متفاوت نیاز داریم. به این کامپوننت `Form` توجه کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p><b>Good morning, {firstName} {lastName}.</b></p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>

برای هر فیلد فرم مقداری منطق تکراری وجود دارد:

1. یک تکه استیت وجود دارد (`firstName` و `lastName`).
1. یک مدیریت‌کنندهٔ تغییر وجود دارد (`handleFirstNameChange` و `handleLastNameChange`).
1. یک تکه JSX وجود دارد که ویژگی‌های `value` و `onChange` را برای آن ورودی مشخص می‌کند.

می‌توانید منطق تکراری را در این هوک سفارشی `useFormInput` استخراج کنید:

<Sandpack>

```js
import { useFormInput } from './useFormInput.js';

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}
```

```js src/useFormInput.js active
import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}
```

```css
label { display: block; }
input { margin-left: 10px; }
```

</Sandpack>

توجه کنید که فقط *یک* متغیر استیت به نام `value` اعلام می‌کند.

با این حال، کامپوننت `Form` دو بار `useFormInput` را فراخوانی می‌کند:

```js
function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');
  // ...
```

به همین دلیل است که این مانند اعلام دو متغیر استیت مجزا کار می‌کند!

**هوک‌های سفارشی به شما اجازه می‌دهند *منطق استیت‌دار* را به اشتراک بگذارید نه *خود استیت* را. هر فراخوانی یک هوک کاملاً از هر فراخوانی دیگر همان هوک مستقل است.** به همین دلیل است که دو سندباکس بالا کاملاً معادل هستند. اگر دوست دارید، به بالا برگردید و آن‌ها را مقایسه کنید. رفتار قبل و بعد از استخراج یک هوک سفارشی یکسان است.

وقتی لازم می‌شود خود استیت را بین چند کامپوننت به اشتراک بگذارید، به‌جای آن آن را [بالا بیاورید و پایین ببرید](/learn/sharing-state-between-components).

## پاس دادن مقادیر واکنشی بین هوک‌ها {/*passing-reactive-values-between-hooks*/}

کد داخل هوک‌های سفارشی شما در هر رندر مجدد کامپوننت دوباره اجرا می‌شود. به همین دلیل، مانند کامپوننت‌ها، هوک‌های سفارشی [باید خالص باشند.](/learn/keeping-components-pure) کد هوک‌های سفارشی را به‌عنوان بخشی از بدنهٔ کامپوننت خود در نظر بگیرید!

چون هوک‌های سفارشی همراه با کامپوننت شما مجدداً رندر می‌شوند، همیشه آخرین پراپس و استیت را دریافت می‌کنند. برای دیدن معنای این، به این مثال اتاق چت توجه کنید. URL سرور یا اتاق چت را تغییر دهید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

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
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
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
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
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
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
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

export function showNotification(message, theme = 'dark') {
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

```json package.json hidden
{
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
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

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

وقتی `serverUrl` یا `roomId` را تغییر می‌دهید، افکت [به تغییرات شما «واکنش» نشان می‌دهد](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) و مجدداً همگام می‌شود. می‌توانید از پیام‌های کنسول بفهمید که چت هر بار که وابستگی‌های افکتتان را تغییر می‌دهید مجدداً متصل می‌شود.

حالا کد افکت را در یک هوک سفارشی منتقل کنید:

```js {2-13}
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

این به کامپوننت `ChatRoom` شما اجازه می‌دهد هوک سفارشی شما را بدون نگرانی دربارهٔ نحوهٔ کار داخلش فراخوانی کند:

```js {4-7}
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

این خیلی ساده‌تر به‌نظر می‌رسد! (اما همان کار را می‌کند.)

توجه کنید که منطق *همچنان* به تغییرات پراپس و استیت پاسخ می‌دهد. ویرایش URL سرور یا اتاق انتخاب‌شده را امتحان کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

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
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

```js src/useChatRoom.js
import { useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
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
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
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
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
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

export function showNotification(message, theme = 'dark') {
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

```json package.json hidden
{
  "dependencies": {
    "react": "latest",
    "react-dom": "latest",
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

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

توجه کنید چگونه مقدار بازگشتی یک هوک را می‌گیرید:

```js {2}
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
```

و آن را به‌عنوان ورودی به یک هوک دیگر پاس می‌دهید:

```js {6}
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
```

هر بار که کامپوننت `ChatRoom` شما مجدداً رندر می‌شود، آخرین `roomId` و `serverUrl` را به هوک شما پاس می‌دهد. به همین دلیل است که افکت شما هر بار که مقادیرشان بعد از یک رندر مجدد متفاوت باشد، مجدداً به چت متصل می‌شود. (اگر تا به حال با نرم‌افزار پردازش صوتی یا تصویری کار کرده‌اید، زنجیره کردن هوک‌ها مثل این ممکن است شما را یاد زنجیره کردن افکت‌های بصری یا صوتی بیندازد. انگار که خروجی `useState` «به درون» ورودی `useChatRoom` تغذیه می‌شود.)

### پاس دادن مدیریت‌کننده‌های رویداد به هوک‌های سفارشی {/*passing-event-handlers-to-custom-hooks*/}

<Wip>

این بخش یک **API آزمایشی که هنوز در نسخهٔ پایدار ری‌اکت منتشر نشده** را توصیف می‌کند.

</Wip>

همان‌طور که شروع به استفاده از `useChatRoom` در کامپوننت‌های بیشتری می‌کنید، ممکن است بخواهید به کامپوننت‌ها اجازه دهید رفتار آن را سفارشی کنند. مثلاً، در حال حاضر، منطق اینکه وقتی پیامی می‌رسد چه کار کنید به‌صورت سخت‌کد داخل هوک قرار دارد:

```js {9-11}
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

فرض کنید می‌خواهید این منطق را به کامپوننت خود برگردانید:

```js {7-9}
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });
  // ...
```

برای اینکه این کار کند، هوک سفارشی خود را تغییر دهید تا `onReceiveMessage` را به‌عنوان یکی از گزینه‌های نام‌دارش بپذیرد:

```js {1,10,13}
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onReceiveMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl, onReceiveMessage]); // ✅ All dependencies declared
}
```

این کار خواهد کرد، اما یک بهبود دیگر هم وجود دارد وقتی هوک سفارشی شما مدیریت‌کننده‌های رویداد را می‌پذیرد.

افزودن وابستگی به `onReceiveMessage` ایده‌آل نیست زیرا باعث می‌شود چت هر بار که کامپوننت مجدداً رندر می‌شود، مجدداً متصل شود. [این مدیریت‌کنندهٔ رویداد را در یک Effect Event بپیچید تا از وابستگی‌ها حذف شود:](/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props)

```js {1,4,5,15,18}
import { useEffect, useEffectEvent } from 'react';
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
}
```

حالا چت هر بار که کامپوننت `ChatRoom` مجدداً رندر می‌شود، مجدداً متصل نمی‌شود. در اینجا یک دمو کاملاً کارکن از پاس دادن یک مدیریت‌کنندهٔ رویداد به یک هوک سفارشی وجود دارد که می‌توانید با آن کار کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

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
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';
import { showNotification } from './notifications.js';

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}
```

```js src/useChatRoom.js
import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
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
  let intervalId;
  let messageCallback;
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
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
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
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

export function showNotification(message, theme = 'dark') {
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

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

توجه کنید چگونه دیگر لازم نیست بدانید `useChatRoom` *چگونه* کار می‌کند تا از آن استفاده کنید. می‌توانستید آن را به هر کامپوننت دیگری اضافه کنید، هر گزینه‌های دیگری را پاس دهید، و به همان شکل کار می‌کرد. این قدرت هوک‌های سفارشی است.

## چه زمانی از هوک‌های سفارشی استفاده کنیم {/*when-to-use-custom-hooks*/}

لازم نیست برای هر تکهٔ کوچک کد تکراری یک هوک سفارشی استخراج کنید. مقداری تکرار اشکالی ندارد. مثلاً، استخراج یک هوک `useFormInput` برای بستن یک فراخوانی تک `useState` مثل مثال قبل احتمالاً غیرضروری است.

با این حال، هر بار که افکتی می‌نویسید، در نظر بگیرید که آیا بستن آن در یک هوک سفارشی روشن‌تر خواهد بود. [باید خیلی کم به افکت‌ها نیاز داشته باشید،](/learn/you-might-not-need-an-effect) پس اگر در حال نوشتن یکی هستید، این به این معناست که باید «از ری‌اکت خارج شوید» تا با یک سیستم خارجی همگام شوید یا کاری انجام دهید که ری‌اکت API داخلی برایش ندارد. بستن آن در یک هوک سفارشی به شما اجازه می‌دهد قصدتان و نحوهٔ جریان داده از طریق آن را دقیقاً بیان کنید.

مثلاً، به یک کامپوننت `ShippingForm` توجه کنید که دو منوی کشویی نمایش می‌دهد: یکی فهرست شهرها را نشان می‌دهد، و دیگری فهرست مناطق شهر انتخاب‌شده. ممکن است با کدی شبیه این شروع کنید:

```js {3-16,20-35}
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  // This Effect fetches cities for a country
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
  }, [country]);

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  // This Effect fetches areas for the selected city
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
  }, [city]);

  // ...
```

اگرچه این کد کاملاً تکراری است، [درست است که این افکت‌ها از هم جدا نگه داشته شوند.](/learn/removing-effect-dependencies#is-your-effect-doing-several-unrelated-things) آن‌ها دو چیز متفاوت را همگام می‌کنند، پس نباید آن‌ها را در یک افکت ترکیب کنید. در عوض، می‌توانید کامپوننت `ShippingForm` بالا را با استخراج منطق مشترک بین آن‌ها در هوک `useData` خودتان ساده کنید:

```js {2-18}
function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
```

حالا می‌توانید هر دو افکت در کامپوننت‌های `ShippingForm` را با فراخوانی‌های `useData` جایگزین کنید:

```js {2,4}
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
```

استخراج یک هوک سفارشی جریان داده را صریح می‌کند. شما `url` را وارد می‌کنید و `data` را دریافت می‌کنید. با «پنهان کردن» افکت داخل `useData`، همچنین از اضافه شدن [وابستگی‌های غیرضروری](/learn/removing-effect-dependencies) به آن توسط کسی که روی کامپوننت `ShippingForm` کار می‌کند جلوگیری می‌کنید. با گذشت زمان، بیشتر افکت‌های اپلیکیشن شما در هوک‌های سفارشی خواهند بود.

<DeepDive>

#### هوک‌های سفارشی خود را روی موارد استفادهٔ سطح بالا و ملموس متمرکز نگه دارید {/*keep-your-custom-hooks-focused-on-concrete-high-level-use-cases*/}

با انتخاب نام هوک سفارشی خود شروع کنید. اگر در انتخاب یک نام روشن دچار مشکل می‌شوید، ممکن است به این معنا باشد که افکت شما بیش از حد به بقیهٔ منطق کامپوننت‌تان متصل است، و هنوز آمادهٔ استخراج نیست.

به‌طور ایده‌آل، نام هوک سفارشی شما باید آن‌قدر روشن باشد که حتی شخصی که اغلب کد نمی‌نویسد بتواند حدس خوبی دربارهٔ آن که هوک سفارشی شما چه می‌کند، چه می‌گیرد، و چه برمی‌گرداند بزند:

* ✅ `useData(url)`
* ✅ `useImpressionLog(eventName, extraData)`
* ✅ `useChatRoom(options)`

وقتی با یک سیستم خارجی همگام می‌کنید، نام هوک سفارشی شما ممکن است فنی‌تر باشد و از اصطلاحات خاص آن سیستم استفاده کند. این تا زمانی که برای فردی آشنا با آن سیستم روشن باشد خوب است:

* ✅ `useMediaQuery(query)`
* ✅ `useSocket(url)`
* ✅ `useIntersectionObserver(ref, options)`

**هوک‌های سفارشی را روی موارد استفادهٔ سطح بالا و ملموس متمرکز نگه دارید.** از ساخت و استفاده از هوک‌های «چرخهٔ حیات» سفارشی که به‌عنوان جایگزین و پوشش‌های راحتی برای خود API `useEffect` عمل می‌کنند اجتناب کنید:

* 🔴 `useMount(fn)`
* 🔴 `useEffectOnce(fn)`
* 🔴 `useUpdateEffect(fn)`

مثلاً، این هوک `useMount` تلاش می‌کند تضمین کند کدی فقط «هنگام مانت» اجرا شود:

```js {4-5,14-15}
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // 🔴 Avoid: using custom "lifecycle" Hooks
  useMount(() => {
    const connection = createConnection({ roomId, serverUrl });
    connection.connect();

    post('/analytics/event', { eventName: 'visit_chat' });
  });
  // ...
}

// 🔴 Avoid: creating custom "lifecycle" Hooks
function useMount(fn) {
  useEffect(() => {
    fn();
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'fn'
}
```

**هوک‌های «چرخهٔ حیات» سفارشی مثل `useMount` در پارادایم ری‌اکت خوب جا نمی‌گیرند.** مثلاً، این مثال کد یک اشتباه دارد (به تغییرات `roomId` یا `serverUrl` «واکنش» نشان نمی‌دهد)، اما لینتر در مورد آن به شما هشدار نخواهد داد زیرا لینتر فقط فراخوانی‌های مستقیم `useEffect` را بررسی می‌کند. او دربارهٔ هوک شما نخواهد دانست.

اگر در حال نوشتن یک افکت هستید، با استفاده از API ری‌اکت مستقیماً شروع کنید:

```js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // ✅ Good: two raw Effects separated by purpose

  useEffect(() => {
    const connection = createConnection({ serverUrl, roomId });
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]);

  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_chat', roomId });
  }, [roomId]);

  // ...
}
```

سپس، می‌توانید (اما لازم نیست) برای موارد استفادهٔ سطح بالای متفاوت هوک‌های سفارشی استخراج کنید:

```js
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // ✅ Great: custom Hooks named after their purpose
  useChatRoom({ serverUrl, roomId });
  useImpressionLog('visit_chat', { roomId });
  // ...
}
```

**یک هوک سفارشی خوب با محدود کردن کاری که انجام می‌دهد، کد فراخوان را اعلامی‌تر می‌کند.** مثلاً، `useChatRoom(options)` فقط می‌تواند به اتاق چت متصل شود، در حالی که `useImpressionLog(eventName, extraData)` فقط می‌تواند یک لاگ بازدید را به تحلیلات ارسال کند. اگر API هوک سفارشی شما موارد استفاده را محدود نمی‌کند و خیلی انتزاعی است، در درازمدت احتمالاً مشکلات بیشتری را از آن‌هایی که حل می‌کند ایجاد می‌کند.

</DeepDive>

### هوک‌های سفارشی به شما کمک می‌کنند به الگوهای بهتر مهاجرت کنید {/*custom-hooks-help-you-migrate-to-better-patterns*/}

افکت‌ها یک «دریزهٔ فرار» هستند: از آن‌ها وقتی استفاده می‌کنید که نیاز دارید «از ری‌اکت خارج شوید» و وقتی راه‌حل داخلی بهتری برای مورد استفادهٔ شما وجود ندارد. با گذشت زمان، هدف تیم ری‌اکت کاهش تعداد افکت‌ها در اپلیکیشن شما به حداقل با ارائه راه‌حل‌های خاص‌تر برای مشکلات خاص‌تر است. بستن افکت‌هایتان در هوک‌های سفارشی ارتقای کدتان را وقتی این راه‌حل‌ها در دسترس قرار می‌گیرند آسان‌تر می‌کند.

بیایید به این مثال برگردیم:

<Sandpack>

```js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
```

```js src/useOnlineStatus.js active
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```

</Sandpack>

در مثال بالا، `useOnlineStatus` با یک جفت [`useState`](/reference/react/useState) و [`useEffect`](/reference/react/useEffect) پیاده‌سازی شده است. با این حال، این بهترین راه‌حل ممکن نیست. تعدادی موارد لبه وجود دارد که در نظر نمی‌گیرد. مثلاً، فرض می‌کند که وقتی کامپوننت مانت می‌شود، `isOnline` از قبل `true` است، اما این ممکن است اشتباه باشد اگر شبکه از قبل قطع شده باشد. می‌توانید از API مرورگر [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) برای بررسی آن استفاده کنید، اما استفادهٔ مستقیم از آن روی سرور برای تولید HTML اولیه کار نخواهد کرد. به‌اختصار، این کد می‌تواند بهبود یابد.

ری‌اکت شامل یک API اختصاصی به نام [`useSyncExternalStore`](/reference/react/useSyncExternalStore) است که از همهٔ این مشکلات برای شما مراقبت می‌کند. در اینجا هوک `useOnlineStatus` شما، بازنویسی‌شده تا از این API جدید بهره ببرد، آمده است:

<Sandpack>

```js
import { useOnlineStatus } from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
```

```js src/useOnlineStatus.js active
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  );
}

```

</Sandpack>

توجه کنید چگونه **لازم نبود هیچ‌کدام از کامپوننت‌ها را تغییر دهید** تا این مهاجرت انجام شود:

```js {2,7}
function StatusBar() {
  const isOnline = useOnlineStatus();
  // ...
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  // ...
}
```

این دلیل دیگری برای این است که بستن افکت‌ها در هوک‌های سفارشی اغلب مفید است:

1. جریان داده به و از افکت‌هایتان را بسیار صریح می‌کنید.
2. به کامپوننت‌هایتان اجازه می‌دهید روی قصد تمرکز کنند نه روی پیاده‌سازی دقیق افکت‌هایتان.
3. وقتی ری‌اکت ویژگی‌های جدید اضافه می‌کند، می‌توانید آن افکت‌ها را بدون تغییر هیچ‌کدام از کامپوننت‌هایتان حذف کنید.

شبیه به یک [سیستم طراحی،](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) ممکن است پیدا کنید که استخراج اصطلاحات رایج از کامپوننت‌های اپلیکیشنتان به هوک‌های سفارشی مفید است. این کار کد کامپوننت‌های شما را روی قصد متمرکز نگه می‌دارد، و به شما اجازه می‌دهد از نوشتن افکت‌های خام خیلی اغلب اجتناب کنید. بسیاری از هوک‌های سفارشی عالی توسط جامعهٔ ری‌اکت نگهداری می‌شوند.

<DeepDive>

#### آیا ری‌اکت راه‌حل داخلی برای واکشی داده ارائه خواهد داد؟ {/*will-react-provide-any-built-in-solution-for-data-fetching*/}

امروزه، با API [`use`](/reference/react/use#streaming-data-from-server-to-client)، می‌توان داده را در رندر با پاس دادن یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) به `use` خواند:

```js {1,4,11}
import { use, Suspense } from "react";

function Message({ messagePromise }) {
  const messageContent = use(messagePromise);
  return <p>Here is the message: {messageContent}</p>;
}

export function MessageContainer({ messagePromise }) {
  return (
    <Suspense fallback={<p>⌛Downloading message...</p>}>
      <Message messagePromise={messagePromise} />
    </Suspense>
  );
}
```

ما هنوز در حال بررسی جزئیات هستیم، اما انتظار داریم در آینده، واکشی داده را به این شکل بنویسید:

```js {1,4,6}
import { use } from 'react';

function ShippingForm({ country }) {
  const cities = use(fetch(`/api/cities?country=${country}`));
  const [city, setCity] = useState(null);
  const areas = city ? use(fetch(`/api/areas?city=${city}`)) : null;
  // ...
```

اگر از هوک‌های سفارشی مثل `useData` بالا در اپلیکیشن خود استفاده کنید، برای مهاجرت به رویکرد نهایی پیشنهادی، تغییرات کمتری نسبت به زمانی نیاز خواهد بود که در هر کامپوننت به‌صورت دستی افکت خام می‌نویسید. با این حال، رویکرد قدیمی همچنان به‌خوبی کار خواهد کرد، پس اگر از نوشتن افکت‌های خام خوشحال هستید، می‌توانید به این کار ادامه دهید.

</DeepDive>

### بیش از یک راه برای انجام آن وجود دارد {/*there-is-more-than-one-way-to-do-it*/}

فرض کنید می‌خواهید یک انیمیشن محو شدن *از صفر* با استفاده از API مرورگر [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) پیاده‌سازی کنید. ممکن است با یک افکت شروع کنید که یک حلقهٔ انیمیشن راه‌اندازی می‌کند. در طول هر فریم انیمیشن، می‌توانستید opacity گره DOMی که [در یک رفرنس نگه می‌دارید](/learn/manipulating-the-dom-with-refs) را تا زمانی که به `1` برسد تغییر دهید. کد شما ممکن است مثل این شروع شود:

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';

function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const duration = 1000;
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

    function onFrame(now) {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // We still have more frames to paint
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, []);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
.welcome {
  opacity: 0;
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
}
```

</Sandpack>

برای خواناتر شدن کامپوننت، می‌توانید منطق را در یک هوک سفارشی `useFadeIn` استخراج کنید:

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```js src/useFadeIn.js
import { useEffect } from 'react';

export function useFadeIn(ref, duration) {
  useEffect(() => {
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

    function onFrame(now) {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // We still have more frames to paint
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () => stop();
  }, [ref, duration]);
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
.welcome {
  opacity: 0;
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
}
```

</Sandpack>

می‌توانستید کد `useFadeIn` را همان‌طور که هست نگه دارید، اما همچنین می‌توانستید آن را بیشتر بازسازی کنید. مثلاً، می‌توانستید منطق راه‌اندازی حلقهٔ انیمیشن را از `useFadeIn` در یک هوک سفارشی `useAnimationLoop` استخراج کنید:

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```js src/useFadeIn.js active
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useFadeIn(ref, duration) {
  const [isRunning, setIsRunning] = useState(true);

  useAnimationLoop(isRunning, (timePassed) => {
    const progress = Math.min(timePassed / duration, 1);
    ref.current.style.opacity = progress;
    if (progress === 1) {
      setIsRunning(false);
    }
  });
}

function useAnimationLoop(isRunning, drawFrame) {
  const onFrame = useEffectEvent(drawFrame);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const startTime = performance.now();
    let frameId = null;

    function tick(now) {
      const timePassed = now - startTime;
      onFrame(timePassed);
      frameId = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(frameId);
  }, [isRunning]);
}
```

```css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
.welcome {
  opacity: 0;
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
}
```

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

</Sandpack>

با این حال، *لازم نبود* این کار را بکنید. مانند توابع معمولی، در نهایت شما تصمیم می‌گیرید مرزها را بین بخش‌های مختلف کدتان کجا بکشید. همچنین می‌توانستید رویکرد بسیار متفاوتی بگیرید. به‌جای نگه داشتن منطق در افکت، می‌توانستید بیشتر منطق امری را داخل یک [کلاس](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) جاوااسکریپت منتقل کنید:

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import { useFadeIn } from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className="welcome" ref={ref}>
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```js src/useFadeIn.js active
import { useState, useEffect } from 'react';
import { FadeInAnimation } from './animation.js';

export function useFadeIn(ref, duration) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
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
    if (progress === 1) {
      this.stop();
    } else {
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
.welcome {
  opacity: 0;
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
}
```

</Sandpack>

افکت‌ها به شما اجازه می‌دهند ری‌اکت را به سیستم‌های خارجی متصل کنید. هر چه هماهنگی بیشتری بین افکت‌ها لازم باشد (مثلاً، برای زنجیره کردن چندین انیمیشن)، بیشتر منطقی می‌شود که آن منطق را *کاملاً* از افکت‌ها و هوک‌ها خارج کنید مثل سندباکس بالا. سپس، کدی که استخراج کرده‌اید *تبدیل می‌شود* به «سیستم خارجی». این به افکت‌های شما اجازه می‌دهد ساده بمانند زیرا فقط لازم است پیام‌هایی به سیستمی که خارج ری‌اکت منتقل کرده‌اید بفرستند.

مثال‌های بالا فرض می‌کنند که منطق محو شدن باید در جاوااسکریپت نوشته شود. با این حال، این انیمیشن محو شدن خاص هم ساده‌تر و هم بسیار کارآمدتر با یک [انیمیشن CSS ساده](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) پیاده‌سازی می‌شود:

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import './welcome.css';

function Welcome() {
  return (
    <h1 className="welcome">
      Welcome
    </h1>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  );
}
```

```css src/styles.css
label, button { display: block; margin-bottom: 20px; }
html, body { min-height: 300px; }
```

```css src/welcome.css active
.welcome {
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  animation: fadeIn 1000ms;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

```

</Sandpack>

گاهی، حتی به یک هوک هم نیازی ندارید!

<Recap>

- هوک‌های سفارشی به شما اجازه می‌دهند منطق را بین کامپوننت‌ها به اشتراک بگذارید.
- هوک‌های سفارشی باید با `use` شروع شوند و سپس یک حرف بزرگ بیاید.
- هوک‌های سفارشی فقط منطق استیت‌دار را به اشتراک می‌گذارند، نه خود استیت را.
- می‌توانید مقادیر واکنشی را از یک هوک به هوک دیگر پاس دهید، و آن‌ها به‌روز می‌مانند.
- تمام هوک‌ها هر بار که کامپوننت شما مجدداً رندر می‌شود، دوباره اجرا می‌شوند.
- کد هوک‌های سفارشی شما باید خالص باشد، مثل کد کامپوننتتان.
- مدیریت‌کننده‌های رویدادی که توسط هوک‌های سفارشی دریافت می‌شوند را در Effect Event بپیچید.
- هوک‌های سفارشی مثل `useMount` نسازید. منظور آن‌ها را خاص نگه دارید.
- این به شما بستگی دارد که چگونه و کجا مرزهای کدتان را انتخاب کنید.

</Recap>

<Challenges>

#### استخراج یک هوک `useCounter` {/*extract-a-usecounter-hook*/}

این کامپوننت از یک متغیر استیت و یک افکت برای نمایش عددی استفاده می‌کند که هر ثانیه افزایش می‌یابد. این منطق را در یک هوک سفارشی به نام `useCounter` استخراج کنید. هدف شما این است که پیاده‌سازی کامپوننت `Counter` دقیقاً مثل این به‌نظر برسد:

```js
export default function Counter() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}
```

لازم است هوک سفارشی خود را در `useCounter.js` بنویسید و آن را در فایل `App.js` وارد کنید.

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
// Write your custom Hook in this file!
```

</Sandpack>

<Solution>

کد شما باید مثل این باشد:

<Sandpack>

```js
import { useCounter } from './useCounter.js';

export default function Counter() {
  const count = useCounter();
  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
import { useState, useEffect } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}
```

</Sandpack>

توجه کنید که `App.js` دیگر نیازی به وارد کردن `useState` یا `useEffect` ندارد.

</Solution>

#### قابل‌پیکربندی کردن تأخیر شمارنده {/*make-the-counter-delay-configurable*/}

در این مثال، یک متغیر استیت `delay` وجود دارد که توسط یک اسلایدر کنترل می‌شود، اما مقدارش استفاده نمی‌شود. مقدار `delay` را به هوک سفارشی `useCounter` خود پاس دهید، و هوک `useCounter` را تغییر دهید تا از `delay` پاس‌داده‌شده به‌جای `1000` میلی‌ثانیه سخت‌کدشده استفاده کند.

<Sandpack>

```js
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter();
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}
```

```js src/useCounter.js
import { useState, useEffect } from 'react';

export function useCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return count;
}
```

</Sandpack>

<Solution>

`delay` را با `useCounter(delay)` به هوک خود پاس دهید. سپس، داخل هوک، به‌جای مقدار سخت‌کد `1000` از `delay` استفاده کنید. لازم است `delay` را به وابستگی‌های افکت خود اضافه کنید. این تضمین می‌کند که تغییر `delay` بازه را بازنشانی می‌کند.

<Sandpack>

```js
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
  const [delay, setDelay] = useState(1000);
  const count = useCounter(delay);
  return (
    <>
      <label>
        Tick duration: {delay} ms
        <br />
        <input
          type="range"
          value={delay}
          min="10"
          max="2000"
          onChange={e => setDelay(Number(e.target.value))}
        />
      </label>
      <hr />
      <h1>Ticks: {count}</h1>
    </>
  );
}
```

```js src/useCounter.js
import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}
```

</Sandpack>

</Solution>

#### استخراج `useInterval` از `useCounter` {/*extract-useinterval-out-of-usecounter*/}

در حال حاضر، هوک `useCounter` شما دو کار می‌کند. یک بازه راه‌اندازی می‌کند، و همچنین یک متغیر استیت را در هر تیک بازه افزایش می‌دهد. منطق راه‌اندازی بازه را در یک هوک مجزا به نام `useInterval` خارج کنید. این هوک باید دو آرگومان بگیرد: کالبک `onTick`، و `delay`. پس از این تغییر، پیاده‌سازی `useCounter` شما باید مثل این باشد:

```js
export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}
```

`useInterval` را در فایل `useInterval.js` بنویسید و آن را در فایل `useCounter.js` وارد کنید.

<Sandpack>

```js
import { useCounter } from './useCounter.js';

export default function Counter() {
  const count = useCounter(1000);
  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
import { useState, useEffect } from 'react';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
  return count;
}
```

```js src/useInterval.js
// Write your Hook here!
```

</Sandpack>

<Solution>

منطق داخل `useInterval` باید بازه را راه‌اندازی و پاک کند. لازم نیست کار دیگری انجام دهد.

<Sandpack>

```js
import { useCounter } from './useCounter.js';

export default function Counter() {
  const count = useCounter(1000);
  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}
```

```js src/useInterval.js active
import { useEffect } from 'react';

export function useInterval(onTick, delay) {
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [onTick, delay]);
}
```

</Sandpack>

توجه کنید که مقداری مشکل در این راه‌حل وجود دارد که در چالش بعدی آن را حل خواهید کرد.

</Solution>

#### رفع یک بازهٔ بازنشانی‌شونده {/*fix-a-resetting-interval*/}

در این مثال، *دو* بازهٔ مجزا وجود دارد.

کامپوننت `App` از `useCounter` استفاده می‌کند، که `useInterval` را فراخوانی می‌کند تا شمارنده را هر ثانیه به‌روز کند. اما کامپوننت `App` *همچنین* `useInterval` را فراخوانی می‌کند تا هر دو ثانیه به‌طور تصادفی رنگ پس‌زمینهٔ صفحه را به‌روز کند.

به‌نوعی، کالبکی که پس‌زمینهٔ صفحه را به‌روز می‌کند هرگز اجرا نمی‌شود. مقداری لاگ داخل `useInterval` اضافه کنید:

```js {2,5}
  useEffect(() => {
    console.log('✅ Setting up an interval with delay ', delay)
    const id = setInterval(onTick, delay);
    return () => {
      console.log('❌ Clearing an interval with delay ', delay)
      clearInterval(id);
    };
  }, [onTick, delay]);
```

آیا لاگ‌ها با آنچه انتظار دارید اتفاق بیفتد تطابق دارند؟ اگر به‌نظر می‌رسد برخی افکت‌هایتان به‌طور غیرضروری مجدداً همگام می‌شوند، می‌توانید حدس بزنید کدام وابستگی باعث آن می‌شود؟ آیا راهی برای [حذف آن وابستگی](/learn/removing-effect-dependencies) از افکت شما وجود دارد؟

پس از رفع مشکل، باید انتظار داشته باشید که پس‌زمینهٔ صفحه هر دو ثانیه به‌روز شود.

<Hint>

به‌نظر می‌رسد هوک `useInterval` شما یک شنوندهٔ رویداد را به‌عنوان آرگومان می‌پذیرد. آیا راهی به ذهنتان می‌رسد که آن شنوندهٔ رویداد را بپیچید تا لازم نباشد وابستگی افکت شما باشد؟

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
import { useCounter } from './useCounter.js';
import { useInterval } from './useInterval.js';

export default function Counter() {
  const count = useCounter(1000);

  useInterval(() => {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
    document.body.style.backgroundColor = randomColor;
  }, 2000);

  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}
```

```js src/useInterval.js
import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(onTick, delay) {
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => {
      clearInterval(id);
    };
  }, [onTick, delay]);
}
```

</Sandpack>

<Solution>

داخل `useInterval`، کالبک تیک را در یک Effect Event بپیچید، همان‌طور که [در بالای این صفحه](/learn/reusing-logic-with-custom-hooks#passing-event-handlers-to-custom-hooks) انجام دادید.

این به شما اجازه می‌دهد `onTick` را از وابستگی‌های افکت خود حذف کنید. افکت در هر رندر مجدد کامپوننت مجدداً همگام نخواهد شد، پس بازهٔ تغییر رنگ پس‌زمینهٔ صفحه هر ثانیه قبل از اینکه فرصت اجرا پیدا کند بازنشانی نخواهد شد.

با این تغییر، هر دو بازه همان‌طور که انتظار می‌رود کار می‌کنند و با هم تداخل ندارند:

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
import { useCounter } from './useCounter.js';
import { useInterval } from './useInterval.js';

export default function Counter() {
  const count = useCounter(1000);

  useInterval(() => {
    const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
    document.body.style.backgroundColor = randomColor;
  }, 2000);

  return <h1>Seconds passed: {count}</h1>;
}
```

```js src/useCounter.js
import { useState } from 'react';
import { useInterval } from './useInterval.js';

export function useCounter(delay) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  return count;
}
```

```js src/useInterval.js active
import { useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export function useInterval(callback, delay) {
  const onTick = useEffectEvent(callback);
  useEffect(() => {
    const id = setInterval(onTick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
```

</Sandpack>

</Solution>

#### پیاده‌سازی یک حرکت متوالی {/*implement-a-staggering-movement*/}

در این مثال، هوک `usePointerPosition()` موقعیت فعلی نشانگر را پیگیری می‌کند. مکان‌نما یا انگشت خود را روی ناحیهٔ پیش‌نمایش حرکت دهید و ببینید چگونه نقطهٔ قرمز حرکت شما را دنبال می‌کند. موقعیت آن در متغیر `pos1` ذخیره می‌شود.

در واقع، پنج (!) نقطهٔ قرمز متفاوت در حال رندر شدن هستند. شما آن‌ها را نمی‌بینید زیرا در حال حاضر همگی در همان موقعیت ظاهر می‌شوند. این چیزی است که باید رفع کنید. آنچه به‌جای آن می‌خواهید پیاده‌سازی کنید یک حرکت «متوالی» است: هر نقطه باید مسیر نقطهٔ قبلی را «دنبال» کند. مثلاً، اگر مکان‌نما را سریع حرکت دهید، نقطهٔ اول باید فوراً آن را دنبال کند، نقطهٔ دوم باید نقطهٔ اول را با تأخیر کوچکی دنبال کند، نقطهٔ سوم باید نقطهٔ دوم را دنبال کند، و به همین ترتیب.

لازم است هوک سفارشی `useDelayedValue` را پیاده‌سازی کنید. پیاده‌سازی فعلی آن `value` ارائه‌شده به آن را برمی‌گرداند. به‌جای آن، می‌خواهید مقدار `delay` میلی‌ثانیه قبل را برگردانید. ممکن است برای این کار به مقداری استیت و یک افکت نیاز داشته باشید.

پس از پیاده‌سازی `useDelayedValue`، باید ببینید نقاط یکی پس از دیگری حرکت می‌کنند.

<Hint>

لازم است `delayedValue` را به‌عنوان یک متغیر استیت داخل هوک سفارشی خود ذخیره کنید. وقتی `value` تغییر می‌کند، می‌خواهید یک افکت اجرا کنید. این افکت باید پس از `delay` مقدار `delayedValue` را به‌روز کند. ممکن است فراخوانی `setTimeout` مفید باشد.

آیا این افکت به پاک‌سازی نیاز دارد؟ چرا یا چرا نه؟

</Hint>

<Sandpack>

```js
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
  // TODO: Implement this Hook
  return value;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```

```js src/usePointerPosition.js
import { useState, useEffect } from 'react';

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}
```

```css
body { min-height: 300px; }
```

</Sandpack>

<Solution>

در اینجا یک نسخهٔ کارکن آمده است. شما `delayedValue` را به‌عنوان یک متغیر استیت نگه می‌دارید. وقتی `value` به‌روز می‌شود، افکت شما یک تایم‌اوت برای به‌روز کردن `delayedValue` زمان‌بندی می‌کند. به همین دلیل است که `delayedValue` همیشه از `value` واقعی «عقب» می‌ماند.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos3, 50);
  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

function Dot({ position, opacity }) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
```

```js src/usePointerPosition.js
import { useState, useEffect } from 'react';

export function usePointerPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}
```

```css
body { min-height: 300px; }
```

</Sandpack>

توجه کنید که این افکت *به* پاک‌سازی نیاز ندارد. اگر `clearTimeout` را در تابع پاک‌سازی فراخوانی می‌کردید، آن‌گاه هر بار که `value` تغییر می‌کرد، تایم‌اوت از قبل زمان‌بندی‌شده را بازنشانی می‌کرد. برای نگه داشتن حرکت پیوسته، می‌خواهید تمام تایم‌اوت‌ها اجرا شوند.

</Solution>

</Challenges>
