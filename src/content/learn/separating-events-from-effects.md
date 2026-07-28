---
title: 'تفکیک رویدادها از افکت‌ها'
---

<Intro>

هندلرهای رویداد فقط وقتی دوباره اجرا می‌شوند که همان تعامل را دوباره انجام دهید. برخلاف هندلرهای رویداد، افکت‌ها هنگامی دوباره همگام می‌شوند که برخی مقادیری که می‌خوانند، مانند یک پراپ یا متغیر استیت، با زمان رندر قبلی متفاوت باشد. گاهی همچنین می‌خواهید ترکیبی از هر دو رفتار را داشته باشید: افکتی که در پاسخ به برخی مقادیر اما نه بقیه دوباره اجرا شود. این صفحه به شما می‌آموزد که چگونه این کار را انجام دهید.

</Intro>

<YouWillLearn>

- چگونه بین هندلر رویداد و افکت انتخاب کنید
- چرا افکت‌ها واکنش‌گرا هستند و هندلرهای رویداد نیستند
- چه کنید وقتی می‌خواهید بخشی از کد افکت‌تان واکنش‌گرا نباشد
- Effect Eventها چیستند و چگونه آن‌ها را از افکت‌هایتان استخراج کنید
- چگونه آخرین پراپس و استیت را از افکت‌ها با Effect Eventها بخوانید

</YouWillLearn>

## انتخاب بین هندلرهای رویداد و افکت‌ها {/*choosing-between-event-handlers-and-effects*/}

ابتدا بیایید تفاوت بین هندلرهای رویداد و افکت‌ها را مرور کنیم.

تصور کنید در حال پیاده‌سازی کامپوننت اتاق چت هستید. نیازمندی‌های شما به این شکل است:

1. کامپوننت شما باید به‌طور خودکار به اتاق چت انتخاب‌شده متصل شود.
1. وقتی روی دکمهٔ «Send» کلیک می‌کنید، باید پیامی به چت بفرستد.

فرض کنید کد آن‌ها را پیاده‌سازی کرده‌اید، اما مطمئن نیستید کجا قرار دهید. آیا باید از هندلرهای رویداد یا افکت‌ها استفاده کنید؟ هر بار که نیاز به پاسخ به این سؤال دارید، [*چرا* کد باید اجرا شود را در نظر بگیرید.](/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events)

### هندلرهای رویداد در پاسخ به تعاملات خاص اجرا می‌شوند {/*event-handlers-run-in-response-to-specific-interactions*/}

از دید کاربر، ارسال پیام باید *به این دلیل* رخ دهد که دکمهٔ خاص «Send» کلیک شده. کاربر نسبتاً ناراحت خواهد شد اگر پیامش را در هر زمان دیگری یا به هر دلیل دیگری بفرستید. به همین دلیل ارسال پیام باید یک هندلر رویداد باشد. هندلرهای رویداد به شما اجازه می‌دهند تعاملات خاص را مدیریت کنید:

```js {4-6}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function handleSendClick() {
    sendMessage(message);
  }
  // ...
  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}
```

با یک هندلر رویداد، می‌توانید مطمئن باشید که `sendMessage(message)` *فقط* اگر کاربر دکمه را فشار دهد اجرا می‌شود.

### افکت‌ها هر زمان که همگام‌سازی نیاز باشد اجرا می‌شوند {/*effects-run-whenever-synchronization-is-needed*/}

به یاد داشته باشید که همچنین باید کامپوننت را به اتاق چت متصل نگه دارید. آن کد کجا می‌رود؟

*دلیل* اجرای این کد تعامل خاصی نیست. مهم نیست چرا یا چگونه کاربر به صفحهٔ اتاق چت پیمایش کرده. حالا که آن را می‌بیند و می‌تواند با آن تعامل کند، کامپوننت باید به سرور چت انتخاب‌شده متصل بماند. حتی اگر کامپوننت اتاق چت صفحهٔ اولیهٔ اپلیکیشن شما باشد، و کاربر اصلاً هیچ تعاملی انجام نداده باشد، *هنوز* باید متصل شوید. به همین دلیل این یک افکت است:

```js {3-9}
function ChatRoom({ roomId }) {
  // ...
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```

با این کد، می‌توانید مطمئن باشید که همیشه یک اتصال فعال به سرور چت انتخاب‌شدهٔ فعلی وجود دارد، *بدون توجه* به تعاملات خاص انجام‌شده توسط کاربر. چه کاربر فقط اپلیکیشن شما را باز کرده باشد، اتاق متفاوتی انتخاب کرده باشد، یا به صفحهٔ دیگری پیمایش کرده و برگشته باشد، افکت شما تضمین می‌کند که کامپوننت *همگام باقی بماند* با اتاق انتخاب‌شدهٔ فعلی، و [هرگاه ضروری باشد دوباره متصل شود.](/learn/lifecycle-of-reactive-effects#why-synchronization-may-need-to-happen-more-than-once)

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  function handleSendClick() {
    sendMessage(message);
  }

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>Send</button>
    </>
  );
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
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
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
```

```js src/chat.js
export function sendMessage(message) {
  console.log('🔵 You sent: ' + message);
}

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
input, select { margin-right: 20px; }
```

</Sandpack>

## مقادیر واکنش‌گرا و منطق واکنش‌گرا {/*reactive-values-and-reactive-logic*/}

به‌طور شهودی، می‌توانید بگویید که هندلرهای رویداد همیشه «دستی» تحریک می‌شوند، مثلاً با کلیک روی یک دکمه. افکت‌ها، از طرف دیگر، «خودکار» هستند: آن‌ها هر چند بار که لازم باشد برای همگام ماندن اجرا و دوباره اجرا می‌شوند.

راه دقیق‌تری برای فکر کردن دربارهٔ این موضوع وجود دارد.

پراپس، استیت، و متغیرهای تعریف‌شده داخل بدنهٔ کامپوننت شما <CodeStep step={2}>مقادیر واکنش‌گرا (reactive values)</CodeStep> نامیده می‌شوند. در این مثال، `serverUrl` یک مقدار واکنش‌گرا نیست، اما `roomId` و `message` هستند. آن‌ها در جریان دادهٔ رندر شرکت می‌کنند:

```js [[2, 3, "roomId"], [2, 4, "message"]]
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // ...
}
```

مقادیر واکنش‌گرا مانند این می‌توانند به دلیل یک رندر مجدد تغییر کنند. مثلاً، کاربر ممکن است `message` را ویرایش کند یا `roomId` متفاوتی در یک dropdown انتخاب کند. هندلرهای رویداد و افکت‌ها به تغییرات به‌طور متفاوتی پاسخ می‌دهند:

- **منطق داخل هندلرهای رویداد *واکنش‌گرا نیست.*** مگر اینکه کاربر همان تعامل (مثلاً یک کلیک) را دوباره انجام دهد، دوباره اجرا نخواهد شد. هندلرهای رویداد می‌توانند مقادیر واکنش‌گرا را بدون «واکنش» به تغییراتشان بخوانند.
- **منطق داخل افکت‌ها *واکنش‌گرا است.*** اگر افکت شما یک مقدار واکنش‌گرا را می‌خواند، [باید آن را به‌عنوان یک وابستگی مشخص کنید.](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) سپس، اگر یک رندر مجدد باعث شود آن مقدار تغییر کند، React منطق افکت شما را با مقدار جدید دوباره اجرا خواهد کرد.

بیایید مثال قبلی را دوباره ببینیم تا این تفاوت را روشن کنیم.

### منطق داخل هندلرهای رویداد واکنش‌گرا نیست {/*logic-inside-event-handlers-is-not-reactive*/}

به این خط کد نگاه کنید. آیا این منطق باید واکنش‌گرا باشد یا نه؟

```js [[2, 2, "message"]]
    // ...
    sendMessage(message);
    // ...
```

از دید کاربر، **تغییر `message` به این معنا _نیست_ که می‌خواهد پیامی بفرستد.** فقط به این معناست که کاربر در حال تایپ است. به عبارت دیگر، منطقی که پیام می‌فرستد نباید واکنش‌گرا باشد. نباید فقط به این دلیل که <CodeStep step={2}>مقدار واکنش‌گرا</CodeStep> تغییر کرده، دوباره اجرا شود. به همین دلیل متعلق به هندلر رویداد است:

```js {2}
  function handleSendClick() {
    sendMessage(message);
  }
```

هندلرهای رویداد واکنش‌گرا نیستند، پس `sendMessage(message)` فقط وقتی کاربر دکمهٔ Send را کلیک می‌کند اجرا خواهد شد.

### منطق داخل افکت‌ها واکنش‌گرا است {/*logic-inside-effects-is-reactive*/}

اکنون بیایید به این خطوط برگردیم:

```js [[2, 2, "roomId"]]
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // ...
```

از دید کاربر، **تغییر `roomId` *به این معناست* که می‌خواهد به اتاق متفاوتی متصل شود.** به عبارت دیگر، منطق اتصال به اتاق باید واکنش‌گرا باشد. *می‌خواهید* این خطوط کد با <CodeStep step={2}>مقدار واکنش‌گرا</CodeStep> «همراه شوند»، و اگر آن مقدار متفاوت باشد دوباره اجرا شوند. به همین دلیل متعلق به یک افکت است:

```js {2-3}
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
```

افکت‌ها واکنش‌گرا هستند، پس `createConnection(serverUrl, roomId)` و `connection.connect()` برای هر مقدار متمایز `roomId` اجرا خواهند شد. افکت شما اتصال چت را با اتاق انتخاب‌شدهٔ فعلی همگام نگه می‌دارد.

## استخراج منطق غیر واکنش‌گرا از افکت‌ها {/*extracting-non-reactive-logic-out-of-effects*/}

وقتی می‌خواهید منطق واکنش‌گرا را با منطق غیر واکنش‌گرا ترکیب کنید، چیزها پیچیده‌تر می‌شوند.

مثلاً، تصور کنید می‌خواهید وقتی کاربر به چت متصل می‌شود یک اعلان نمایش دهید. تم (theme) فعلی (تیره یا روشن) را از پراپس می‌خوانید تا بتوانید اعلان را با رنگ درست نمایش دهید:

```js {1,4-6}
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    // ...
```

با این حال، `theme` یک مقدار واکنش‌گرا است (می‌تواند در نتیجهٔ رندر مجدد تغییر کند)، و [هر مقدار واکنش‌گرا که توسط یک افکت خوانده می‌شود باید به‌عنوان وابستگی‌اش تعریف شود.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) اکنون باید `theme` را به‌عنوان وابستگی افکت خود مشخص کنید:

```js {5,11}
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ All dependencies declared
  // ...
```

با این مثال کار کنید و ببینید آیا می‌توانید مشکل این تجربهٔ کاربری را پیدا کنید:

<Sandpack>

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

```js
import { useState, useEffect } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
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
label { display: block; margin-top: 10px; }
```

</Sandpack>

وقتی `roomId` تغییر می‌کند، چت همان‌طور که انتظار دارید دوباره متصل می‌شود. اما از آنجا که `theme` هم یک وابستگی است، چت *همچنین* هر بار که بین تم تیره و روشن جابه‌جا می‌شوید دوباره متصل می‌شود. این خوب نیست!

به عبارت دیگر، *نمی‌خواهید* این خط واکنش‌گرا باشد، حتی اگر داخل یک افکت (که واکنش‌گرا است) است:

```js
      // ...
      showNotification('Connected!', theme);
      // ...
```

به راهی نیاز دارید تا این منطق غیر واکنش‌گرا را از افکت واکنش‌گرای اطرافش جدا کنید.

### تعریف یک Effect Event {/*declaring-an-effect-event*/}

<Wip>

این بخش یک **API آزمایشی را توصیف می‌کند که هنوز در نسخهٔ پایدار React منتشر نشده است.**

</Wip>

برای استخراج این منطق غیر واکنش‌گرا از افکت خود از یک هوک خاص به نام [`useEffectEvent`](/reference/react/experimental_useEffectEvent) استفاده کنید:

```js {1,4-6}
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```

اینجا، `onConnected` یک *Effect Event* نامیده می‌شود. این بخشی از منطق افکت شماست، اما بسیار شبیه به یک هندلر رویداد رفتار می‌کند. منطق داخل آن واکنش‌گرا نیست، و همیشه آخرین مقادیر پراپس و استیت شما را «می‌بیند».

اکنون می‌توانید Effect Event `onConnected` را از داخل افکت خود فراخوانی کنید:

```js {2-4,9,13}
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

این مشکل را حل می‌کند. توجه کنید که باید `theme` را از فهرست وابستگی‌های افکت خود *حذف* می‌کردید، زیرا دیگر در افکت استفاده نمی‌شود. همچنین نیازی نیست `onConnected` را به آن *اضافه* کنید، زیرا **Effect Eventها واکنش‌گرا نیستند و باید از وابستگی‌ها حذف شوند.**

بررسی کنید که رفتار جدید همان‌طور که انتظار دارید کار می‌کند:

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

```js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```

```js src/notifications.js hidden
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
label { display: block; margin-top: 10px; }
```

</Sandpack>

می‌توانید Effect Eventها را بسیار شبیه به هندلرهای رویداد تصور کنید. تفاوت اصلی این است که هندلرهای رویداد در پاسخ به تعاملات کاربر اجرا می‌شوند، در حالی که Effect Eventها توسط شما از افکت‌ها تحریک می‌شوند. Effect Eventها به شما اجازه می‌دهند «زنجیره» را بین واکنش‌گرایی افکت‌ها و کدی که نباید واکنش‌گرا باشد بشکنید.

### خواندن آخرین پراپس و استیت با Effect Eventها {/*reading-latest-props-and-state-with-effect-events*/}

<Wip>

این بخش یک **API آزمایشی را توصیف می‌کند که هنوز در نسخهٔ پایدار React منتشر نشده است.**

</Wip>

Effect Eventها به شما اجازه می‌دهند الگوهای بسیاری را که در آن‌ها ممکن است وسوسه شوید linter وابستگی را سرکوب کنید، برطرف کنید.

مثلاً، فرض کنید افکتی برای ثبت بازدیدهای صفحه دارید:

```js
function Page() {
  useEffect(() => {
    logVisit();
  }, []);
  // ...
}
```

بعداً چند مسیر به سایت خود اضافه می‌کنید. اکنون کامپوننت `Page` شما یک پراپ `url` با مسیر فعلی دریافت می‌کند. می‌خواهید `url` را به‌عنوان بخشی از فراخوانی `logVisit` عبور دهید، اما linter وابستگی شکایت می‌کند:

```js {1,3}
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'url'
  // ...
}
```

فکر کنید می‌خواهید کد چه کند. *می‌خواهید* برای URLهای مختلف یک بازدید جداگانه ثبت کنید زیرا هر URL یک صفحهٔ متفاوت را نمایندگی می‌کند. به عبارت دیگر، این فراخوانی `logVisit` *باید* نسبت به `url` واکنش‌گرا باشد. به همین دلیل، در این مورد، پیروی از linter وابستگی و اضافه کردن `url` به‌عنوان وابستگی منطقی است:

```js {4}
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```

اکنون فرض کنید می‌خواهید تعداد آیتم‌های سبد خرید را همراه با هر بازدید صفحه شامل کنید:

```js {2-3,6}
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```

شما از `numberOfItems` داخل افکت استفاده کردید، پس linter از شما می‌خواهد آن را به‌عنوان وابستگی اضافه کنید. با این حال، *نمی‌خواهید* فراخوانی `logVisit` نسبت به `numberOfItems` واکنش‌گرا باشد. اگر کاربر چیزی به سبد خرید اضافه کند، و `numberOfItems` تغییر کند، این *به این معنا نیست* که کاربر صفحه را دوباره بازدید کرده. به عبارت دیگر، *بازدید صفحه*، به نوعی، یک «رویداد» است. در یک لحظهٔ دقیق از زمان رخ می‌دهد.

کد را به دو بخش تقسیم کنید:

```js {5-7,10}
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```

اینجا، `onVisit` یک Effect Event است. کد داخل آن واکنش‌گرا نیست. به همین دلیل می‌توانید از `numberOfItems` (یا هر مقدار واکنش‌گرای دیگری!) استفاده کنید بدون نگرانی دربارهٔ اینکه باعث اجرای مجدد کد اطراف روی تغییرات شود.

از طرف دیگر، خود افکت واکنش‌گرا باقی می‌ماند. کد داخل افکت از پراپ `url` استفاده می‌کند، پس افکت پس از هر رندر مجدد با `url` متفاوت دوباره اجرا خواهد شد. این، به نوبهٔ خود، Effect Event `onVisit` را فراخوانی خواهد کرد.

در نتیجه، `logVisit` را برای هر تغییر `url` فراخوانی خواهید کرد، و همیشه آخرین `numberOfItems` را می‌خوانید. با این حال، اگر `numberOfItems` به‌تنهایی تغییر کند، این باعث نمی‌شود هیچ‌کدام از کد دوباره اجرا شود.

<Note>

شاید تعجب کنید آیا می‌توانستید `onVisit()` را بدون آرگومان فراخوانی کنید، و `url` را داخل آن بخوانید:

```js {2,6}
  const onVisit = useEffectEvent(() => {
    logVisit(url, numberOfItems);
  });

  useEffect(() => {
    onVisit();
  }, [url]);
```

این کار می‌کرد، اما بهتر است این `url` را به‌طور صریح به Effect Event عبور دهید. **با عبور دادن `url` به‌عنوان یک آرگومان به Effect Event خود، می‌گویید که بازدید صفحه‌ای با `url` متفاوت یک «رویداد» جداگانه از دید کاربر تشکیل می‌دهد.** `visitedUrl` یک *بخش* از «رویدادی» است که رخ داده:

```js {1-2,6}
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]);
```

از آنجا که Effect Event شما به‌طور صریح `visitedUrl` را «می‌خواهد»، اکنون نمی‌توانید به‌طور تصادفی `url` را از وابستگی‌های افکت حذف کنید. اگر وابستگی `url` را حذف کنید (که باعث می‌شود بازدیدهای صفحهٔ متمایز به‌عنوان یکی شمرده شوند)، linter دربارهٔ آن به شما هشدار خواهد داد. می‌خواهید `onVisit` نسبت به `url` واکنش‌گرا باشد، پس به‌جای خواندن `url` داخل (که واکنش‌گرا نباشد)، آن را *از* افکت خود عبور می‌دهید.

این به‌ویژه وقتی منطق ناهمزمانی داخل افکت وجود دارد مهم می‌شود:

```js {6,8}
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    setTimeout(() => {
      onVisit(url);
    }, 5000); // Delay logging visits
  }, [url]);
```

اینجا، `url` داخل `onVisit` به *آخرین* `url` (که ممکن است قبلاً تغییر کرده باشد) اشاره دارد، اما `visitedUrl` به `url` ای اشاره دارد که در اصل باعث اجرای این افکت (و این فراخوانی `onVisit`) شده است.

</Note>

<DeepDive>

#### آیا به‌جای آن سرکوب linter وابستگی مشکلی ندارد؟ {/*is-it-okay-to-suppress-the-dependency-linter-instead*/}

در کدبیس‌های موجود، ممکن است گاهی ببینید که قاعدهٔ lint مثل این سرکوب شده:

```js {expectedErrors: {'react-compiler': [8]}} {7-9}
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
    // 🔴 Avoid suppressing the linter like this:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  // ...
}
```

پس از اینکه `useEffectEvent` به بخشی پایدار از React تبدیل شود، توصیه می‌کنیم **هرگز linter را سرکوب نکنید**.

نقطهٔ ضعف اول سرکوب قاعده این است که React دیگر وقتی افکت شما نیاز به «واکنش» به یک وابستگی واکنش‌گرای جدید که به کدتان اضافه کرده‌اید دارد، به شما هشدار نخواهد داد. در مثال قبلی، `url` را به وابستگی‌ها *افزودید* زیرا React به یاد شما آورد. اگر linter را غیرفعال کنید، دیگر چنین یادآوری‌هایی برای هیچ ویرایش آیندهٔ آن افکت نخواهید داشت. این به باگ منجر می‌شود.

در اینجا مثالی از یک باگ گیج‌کننده ناشی از سرکوب linter آمده است. در این مثال، تابع `handleMove` قرار است مقدار متغیر استیت `canMove` فعلی را بخواند تا تصمیم بگیرد آیا نقطه باید نشانگر را دنبال کند یا نه. با این حال، `canMove` همیشه داخل `handleMove` مقدار `true` است.

آیا می‌توانید ببینید چرا؟

<Sandpack>

```js {expectedErrors: {'react-compiler': [16]}}
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
```

```css
body {
  height: 200px;
}
```

</Sandpack>


مشکل این کد در سرکوب linter وابستگی است. اگر سرکوب را حذف کنید، می‌بینید که این افکت باید به تابع `handleMove` وابسته باشد. این منطقی است: `handleMove` داخل بدنهٔ کامپوننت تعریف شده، که آن را یک مقدار واکنش‌گرا می‌کند. هر مقدار واکنش‌گرا باید به‌عنوان وابستگی مشخص شود، یا می‌تواند به مرور زمان کهنه شود!

نویسندهٔ کد اصلی به React «دروغ گفته» با گفتن اینکه افکت به هیچ مقدار واکنش‌گرایی وابسته نیست (`[]`). به همین دلیل React پس از تغییر `canMove` (و `handleMove` با آن) افکت را دوباره همگام نکرد. چون React افکت را دوباره همگام نکرد، `handleMove` پیوست‌شده به‌عنوان listener همان تابع `handleMove` است که در طول رندر اولیه ساخته شده. در طول رندر اولیه، `canMove` مقدار `true` داشت، به همین دلیل `handleMove` از رندر اولیه برای همیشه آن مقدار را خواهد دید.

**اگر هرگز linter را سرکوب نکنید، هرگز مشکلاتی با مقادیر کهنه نخواهید دید.**

با `useEffectEvent`، نیازی به «دروغ گفتن» به linter نیست، و کد همان‌طور که انتظار دارید کار می‌کند:

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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const onMove = useEffectEvent(e => {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <label>
        <input type="checkbox"
          checked={canMove}
          onChange={e => setCanMove(e.target.checked)}
        />
        The dot is allowed to move
      </label>
      <hr />
      <div style={{
        position: 'absolute',
        backgroundColor: 'pink',
        borderRadius: '50%',
        opacity: 0.6,
        transform: `translate(${position.x}px, ${position.y}px)`,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
      }} />
    </>
  );
}
```

```css
body {
  height: 200px;
}
```

</Sandpack>

این به این معنا نیست که `useEffectEvent` *همیشه* راه‌حل درست است. فقط باید آن را به خطوط کدی که نمی‌خواهید واکنش‌گرا باشند اعمال کنید. در sandbox بالا، نمی‌خواستید کد افکت نسبت به `canMove` واکنش‌گرا باشد. به همین دلیل استخراج یک Effect Event منطقی بود.

برای جوانب‌بدین‌سنگین دیگرِ درست به‌جای سرکوب linter، [حذف وابستگی‌های افکت](/learn/removing-effect-dependencies) را بخوانید.

</DeepDive>

### محدودیت‌های Effect Eventها {/*limitations-of-effect-events*/}

<Wip>

این بخش یک **API آزمایشی را توصیف می‌کند که هنوز در نسخهٔ پایدار React منتشر نشده است.**

</Wip>

Effect Eventها در نحوهٔ استفاده از آن‌ها بسیار محدودند:

* **فقط از داخل افکت‌ها آن‌ها را فراخوانی کنید.**
* **هرگز آن‌ها را به کامپوننت‌ها یا هوک‌های دیگر عبور ندهید.**

مثلاً، یک Effect Event را مثل این تعریف و عبور ندهید:

```js {4-6,8}
function Timer() {
  const [count, setCount] = useState(0);

  const onTick = useEffectEvent(() => {
    setCount(count + 1);
  });

  useTimer(onTick, 1000); // 🔴 Avoid: Passing Effect Events

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, callback]); // Need to specify "callback" in dependencies
}
```

در عوض، همیشه Effect Eventها را مستقیماً کنار افکت‌هایی که از آن‌ها استفاده می‌کنند تعریف کنید:

```js {10-12,16,21}
function Timer() {
  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount(count + 1);
  }, 1000);
  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback();
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick(); // ✅ Good: Only called locally inside an Effect
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]); // No need to specify "onTick" (an Effect Event) as a dependency
}
```

Effect Eventها «قطعات» غیر واکنش‌گرای کد افکت شما هستند. باید کنار افکتی که از آن‌ها استفاده می‌کند باشند.

<Recap>

- هندلرهای رویداد در پاسخ به تعاملات خاص اجرا می‌شوند.
- افکت‌ها هر زمان که همگام‌سازی نیاز باشد اجرا می‌شوند.
- منطق داخل هندلرهای رویداد واکنش‌گرا نیست.
- منطق داخل افکت‌ها واکنش‌گرا است.
- می‌توانید منطق غیر واکنش‌گرا را از افکت‌ها به Effect Eventها منتقل کنید.
- فقط از داخل افکت‌ها Effect Eventها را فراخوانی کنید.
- Effect Eventها را به کامپوننت‌ها یا هوک‌های دیگر عبور ندهید.

</Recap>

<Challenges>

#### رفع متغیری که به‌روزرسانی نمی‌شود {/*fix-a-variable-that-doesnt-update*/}

این کامپوننت `Timer` یک متغیر استیت `count` را نگه می‌دارد که هر ثانیه افزایش می‌یابد. مقداری که با آن افزایش می‌یابد در متغیر استیت `increment` ذخیره شده. می‌توانید متغیر `increment` را با دکمه‌های به‌علاوه و منهای کنترل کنید.

با این حال، بدون توجه به اینکه چند بار روی دکمهٔ به‌علاوه کلیک می‌کنید، شمارنده هنوز هر ثانیه یکی یکی افزایش می‌یابد. این کد چه مشکلی دارد؟ چرا `increment` داخل کد افکت همیشه برابر `1` است؟ اشتباه را پیدا کرده و آن را برطرف کنید.

<Hint>

برای رفع این کد، کافی است از قواعد پیروی کنید.

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


```js {expectedErrors: {'react-compiler': [14]}}
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
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

<Solution>

مانند همیشه، وقتی به دنبال باگ در افکت‌ها هستید، با جستجوی سرکوب‌های linter شروع کنید.

اگر comment سرکوب را حذف کنید، React به شما می‌گوید که کد این افکت به `increment` وابسته است، اما شما به React «دروغ گفته‌اید» با ادعای اینکه این افکت به هیچ مقدار واکنش‌گرایی وابسته نیست (`[]`). `increment` را به آرایهٔ وابستگی اضافه کنید:

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
import { useState, useEffect } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);

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

اکنون، وقتی `increment` تغییر می‌کند، React افکت شما را دوباره همگام می‌کند، که interval را دوباره راه‌اندازی خواهد کرد.

</Solution>

#### رفع شمارندهٔ یخ‌زده {/*fix-a-freezing-counter*/}

این کامپوننت `Timer` یک متغیر استیت `count` را نگه می‌دارد که هر ثانیه افزایش می‌یابد. مقداری که با آن افزایش می‌یابد در متغیر استیت `increment` ذخیره شده، که می‌توانید آن را با دکمه‌های به‌علاوه و منهای کنترل کنید. مثلاً، دکمهٔ به‌علاوه را نه بار فشار دهید، و توجه کنید که `count` اکنون هر ثانیه به‌جای یکی ده‌تا ده‌تا افزایش می‌یابد.

یک مشکل کوچک با این رابط کاربری وجود دارد. ممکن است توجه کنید که اگر دکمه‌های به‌علاوه یا منهای را سریع‌تر از یک بار در ثانیه فشار دهید، خود تایمر به نظر می‌رسد متوقف می‌شود. فقط پس از گذشت یک ثانیه از آخرین باری که هر دکمه را فشار داده‌اید از سر می‌گیرد. پیدا کنید چرا این اتفاق می‌افتد، و مشکل را برطرف کنید تا تایمر در *هر* ثانیه بدون وقفه تیک بزند.

<Hint>

به نظر می‌رسد افکتی که تایمر را راه‌اندازی می‌کند به مقدار `increment` «واکنش» نشان می‌دهد. آیا خطی که از مقدار `increment` فعلی برای فراخوانی `setCount` استفاده می‌کند واقعاً باید واکنش‌گرا باشد؟

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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);

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

<Solution>

مشکل این است که کد داخل افکت از متغیر استیت `increment` استفاده می‌کند. از آنجا که این یک وابستگی افکت شماست، هر تغییر در `increment` باعث می‌شود افکت دوباره همگام شود، که باعث می‌شود interval پاک شود. اگر interval را هر بار قبل از اینکه فرصت اجرا پیدا کند پاک کنید، به نظر می‌رسد تایمر متوقف شده است.

برای حل مشکل، یک Effect Event `onTick` از افکت استخراج کنید:

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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);
    return () => {
      clearInterval(id);
    };
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

از آنجا که `onTick` یک Effect Event است، کد داخل آن واکنش‌گرا نیست. تغییر `increment` هیچ افکتی را تحریک نمی‌کند.

</Solution>

#### رفع تأخیر غیرقابل تنظیم {/*fix-a-non-adjustable-delay*/}

در این مثال، می‌توانید تأخیر interval را سفارشی کنید. این در یک متغیر استیت `delay` ذخیره شده که با دو دکمه به‌روزرسانی می‌شود. با این حال، حتی اگر دکمهٔ «plus 100 ms» را تا وقتی `delay` به ۱۰۰۰ میلی‌ثانیه (یعنی یک ثانیه) برسد فشار دهید، متوجه می‌شوید که تایمر هنوز خیلی سریع (هر ۱۰۰ میلی‌ثانیه) افزایش می‌یابد. انگار تغییرات `delay` شما نادیده گرفته می‌شوند. باگ را پیدا کرده و برطرف کنید.

<Hint>

کد داخل Effect Eventها واکنش‌گرا نیست. آیا مواردی وجود دارد که _بخواهید_ فراخوانی `setInterval` دوباره اجرا شود؟

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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  const onMount = useEffectEvent(() => {
    return setInterval(() => {
      onTick();
    }, delay);
  });

  useEffect(() => {
    const id = onMount();
    return () => {
      clearInterval(id);
    }
  }, []);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
      <p>
        Increment delay:
        <button disabled={delay === 100} onClick={() => {
          setDelay(d => d - 100);
        }}>–100 ms</button>
        <b>{delay} ms</b>
        <button onClick={() => {
          setDelay(d => d + 100);
        }}>+100 ms</button>
      </p>
    </>
  );
}
```


```css
button { margin: 10px; }
```

</Sandpack>

<Solution>

مشکل مثال بالا این است که یک Effect Event به نام `onMount` را بدون توجه به اینکه کد واقعاً باید چه کار کند استخراج کرده. باید فقط به دلیل خاصی Effect Eventها را استخراج کنید: وقتی می‌خواهید بخشی از کدتان را غیر واکنش‌گرا کنید. با این حال، فراخوانی `setInterval` *باید* نسبت به متغیر استیت `delay` واکنش‌گرا باشد. اگر `delay` تغییر کند، می‌خواهید interval را از ابتدا راه‌اندازی کنید! برای رفع این کد، تمام کد واکنش‌گرا را به داخل افکت برگردانید:

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
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [delay, setDelay] = useState(100);

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, delay);
    return () => {
      clearInterval(id);
    }
  }, [delay]);

  return (
    <>
      <h1>
        Counter: {count}
        <button onClick={() => setCount(0)}>Reset</button>
      </h1>
      <hr />
      <p>
        Increment by:
        <button disabled={increment === 0} onClick={() => {
          setIncrement(i => i - 1);
        }}>–</button>
        <b>{increment}</b>
        <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>
      </p>
      <p>
        Increment delay:
        <button disabled={delay === 100} onClick={() => {
          setDelay(d => d - 100);
        }}>–100 ms</button>
        <b>{delay} ms</b>
        <button onClick={() => {
          setDelay(d => d + 100);
        }}>+100 ms</button>
      </p>
    </>
  );
}
```

```css
button { margin: 10px; }
```

</Sandpack>

به‌طور کلی، باید به توابعی مانند `onMount` که روی *زمان‌بندی* به‌جای *هدف* یک قطعه کد تمرکز می‌کنند مشکوک باشید. ممکن است در ابتدا «توصیفی‌تر» به‌نظر برسد اما نیت شما را مبهم می‌کند. به‌عنوان یک قاعدهٔ کلی، Effect Eventها باید به چیزی که از دید *کاربر* رخ می‌دهد اشاره کنند. مثلاً، `onMessage`، `onTick`، `onVisit`، یا `onConnected` نام‌های Effect Event خوبی هستند. کد داخل آن‌ها احتمالاً نیازی به واکنش‌گرا بودن ندارد. از طرف دیگر، `onMount`، `onUpdate`، `onUnmount`، یا `onAfterRender` آن‌قدر عمومی هستند که به‌راحتی می‌توان به‌طور تصادفی کدی که *باید* واکنش‌گرا باشد در آن‌ها قرار داد. به همین دلیل باید Effect Eventهای خود را بر اساس *اینکه کاربر فکر می‌کند چه اتفاقی افتاده* نام‌گذاری کنید، نه وقتی که برخی کد اتفاقاً اجرا شده.

</Solution>

#### رفع اعلان به تأخیر افتاده {/*fix-a-delayed-notification*/}

وقتی به اتاق چت می‌پیوندید، این کامپوننت یک اعلان نمایش می‌دهد. با این حال، اعلان را بلافاصله نمایش نمی‌دهد. در عوض، اعلان به‌طور مصنوعی دو ثانیه به تأخیر می‌افتد تا کاربر فرصت نگاه اطراف رابط کاربری را داشته باشد.

این تقریباً کار می‌کند، اما یک باگ وجود دارد. dropdown را از «general» به «travel» و سپس به «music» خیلی سریع تغییر دهید. اگر به‌اندازهٔ کافی سریع انجام دهید، دو اعلان خواهید دید (همان‌طور که انتظار می‌رفت!) اما *هر دو* می‌گویند «Welcome to music».

آن را برطرف کنید تا وقتی از «general» به «travel» و سپس به «music» خیلی سریع جابه‌جا می‌شوید، دو اعلان ببینید، اولی «Welcome to travel» و دومی «Welcome to music». (به‌عنوان چالش اضافی، با فرض اینکه *قبلاً* کاری کرده‌اید اعلان‌ها اتاق‌های درست را نشان دهند، کد را طوری تغییر دهید که فقط اعلان دومی نمایش داده شود.)

<Hint>

افکت شما می‌داند به کدام اتاق متصل شده. آیا اطلاعاتی وجود دارد که ممکن است بخواهید به Effect Event خود عبور دهید؟

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

```js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Welcome to ' + roomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected();
      }, 2000);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```

```js src/notifications.js hidden
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
label { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution>

داخل Effect Event شما، `roomId` مقدار *زمانی است که Effect Event فراخوانی شده.*

Effect Event شما با یک تأخیر دو ثانیه‌ای فراخوانی می‌شود. اگر به‌سرعت از اتاق travel به اتاق music جابه‌جا می‌شوید، تا زمانی که اعلان اتاق travel نمایش داده شود، `roomId` از قبل `"music"` است. به همین دلیل هر دو اعلان می‌گویند «Welcome to music».

برای رفع مشکل، به‌جای خواندن *آخرین* `roomId` داخل Effect Event، آن را به یک پارامتر Effect Event خود تبدیل کنید، مانند `connectedRoomId` زیر. سپس `roomId` را از افکت خود با فراخوانی `onConnected(roomId)` عبور دهید:

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

```js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(connectedRoomId => {
    showNotification('Welcome to ' + connectedRoomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```

```js src/notifications.js hidden
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
label { display: block; margin-top: 10px; }
```

</Sandpack>

افکتی که `roomId` آن روی `"travel"` تنظیم شده بود (پس به اتاق `"travel"` متصل شد) اعلان را برای `"travel"` نمایش می‌دهد. افکتی که `roomId` آن روی `"music"` تنظیم شده بود (پس به اتاق `"music"` متصل شد) اعلان را برای `"music"` نمایش می‌دهد. به عبارت دیگر، `connectedRoomId` از افکت شما (که واکنش‌گرا است) می‌آید، در حالی که `theme` همیشه از آخرین مقدار استفاده می‌کند.

برای حل چالش اضافی، شناسهٔ timeout اعلان را ذخیره کنید و در تابع پاکسازی افکت خود آن را پاک کنید:

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

```js
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(connectedRoomId => {
    showNotification('Welcome to ' + connectedRoomId, theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    let notificationTimeoutId;
    connection.on('connected', () => {
      notificationTimeoutId = setTimeout(() => {
        onConnected(roomId);
      }, 2000);
    });
    connection.connect();
    return () => {
      connection.disconnect();
      if (notificationTimeoutId !== undefined) {
        clearTimeout(notificationTimeoutId);
      }
    };
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
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
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/chat.js
export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  let connectedCallback;
  let timeout;
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event, callback) {
      if (connectedCallback) {
        throw Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}
```

```js src/notifications.js hidden
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
label { display: block; margin-top: 10px; }
```

</Sandpack>

این تضمین می‌کند که اعلان‌های از قبل زمان‌بندی‌شده (اما هنوز نمایش‌داده‌نشده) وقتی اتاق‌ها را تغییر می‌دهید لغو شوند.

</Solution>

</Challenges>
