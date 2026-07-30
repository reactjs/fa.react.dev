---
title: راه‌های فرار
---

<Intro>

برخی از کامپوننت‌های شما ممکن است نیاز داشته باشند با سیستم‌های خارج از ری‌اکت کنترل شوند و هم‌گام شوند. برای مثال، ممکن است بخواهید با استفاده از API مرورگر یک ورودی را فوکوس کنید، یک پخش‌کنندهٔ ویدیویی که بدون ری‌اکت پیاده‌سازی شده را پخش و متوقف کنید، یا به یک سرور راه‌دور متصل شوید و به پیام‌های آن گوش دهید. در این فصل، راه‌های فراری را یاد می‌گیرید که به شما اجازه می‌دهند از ری‌اکت «خارج شوید» و به سیستم‌های خارجی متصل شوید. بیشتر منطق برنامه و جریان دادهٔ شما نباید به این قابلیت‌ها تکیه کند.

</Intro>

<YouWillLearn isChapter={true}>

* [چگونه اطلاعات را بدون رندر مجدد «به خاطر بسپارید»](/learn/referencing-values-with-refs)
* [چگونه به عناصر DOM مدیریت‌شده توسط ری‌اکت دسترسی پیدا کنید](/learn/manipulating-the-dom-with-refs)
* [چگونه کامپوننت‌ها را با سیستم‌های خارجی هم‌گام کنید](/learn/synchronizing-with-effects)
* [چگونه افکت‌های غیرضروری را از کامپوننت‌های خود حذف کنید](/learn/you-might-not-need-an-effect)
* [چگونه چرخهٔ حیات یک افکت با چرخهٔ حیات یک کامپوننت متفاوت است](/learn/lifecycle-of-reactive-effects)
* [چگونه از re-trigger شدن افکت‌ها توسط برخی مقادیر جلوگیری کنید](/learn/separating-events-from-effects)
* [چگونه افکت خود را کم‌تر دوباره اجرا کنید](/learn/removing-effect-dependencies)
* [چگونه منطق را بین کامپوننت‌ها به اشتراک بگذارید](/learn/reusing-logic-with-custom-hooks)

</YouWillLearn>

## ارجاع به مقادیر با رفرنس‌ها {/*referencing-values-with-refs*/}

وقتی می‌خواهید یک کامپوننت مقداری اطلاعات را «به خاطر بسپارد»، اما نمی‌خواهید آن اطلاعات [رندرهای جدیدی را تحریک کند](/learn/render-and-commit)، می‌توانید از یک *رفرنس* استفاده کنید:

```js
const ref = useRef(0);
```

مانند استیت، رفرنس‌ها توسط ری‌اکت بین رندرهای مجدد نگه داشته می‌شوند. با این حال، تنظیم استیت یک کامپوننت را دوباره رندر می‌کند. تغییر دادن یک رفرنس این کار را نمی‌کند! می‌توانید از طریق ویژگی `ref.current` به مقدار فعلی آن رفرنس دسترسی داشته باشید.

<Sandpack>

```js
import { useRef } from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
```

</Sandpack>

یک رفرنس مانند یک جیب مخفی از کامپوننت شماست که ری‌اکت آن را ردیابی نمی‌کند. برای مثال، می‌توانید از رفرنس‌ها برای ذخیرهٔ [timeout IDs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value)، [عناصر DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element) و سایر اشیایی که بر خروجی رندر کامپوننت تأثیری ندارند استفاده کنید.

<LearnMore path="/learn/referencing-values-with-refs">

**[ارجاع به مقادیر با رفرنس‌ها](/learn/referencing-values-with-refs)** را بخوانید تا یاد بگیرید چگونه از رفرنس‌ها برای به خاطر سپردن اطلاعات استفاده کنید.

</LearnMore>

## دستکاری DOM با رفرنس‌ها {/*manipulating-the-dom-with-refs*/}

ری‌اکت به‌طور خودکار DOM را به‌روزرسانی می‌کند تا با خروجی رندر شما مطابقت داشته باشد، بنابراین کامپوننت‌های شما اغلب نیازی به دستکاری آن نخواهند داشت. با این حال، گاهی ممکن است نیاز به دسترسی به عناصر DOM مدیریت‌شده توسط ری‌اکت داشته باشید — مثلاً برای فوکوس کردن یک نود، اسکرول به آن، یا اندازه‌گیری اندازه و موقعیتش. هیچ راه داخلی برای انجام این کارها در ری‌اکت وجود ندارد، بنابراین برای دسترسی به نود DOM به یک رفرنس نیاز دارید. برای مثال، کلیک روی دکمه، ورودی را با استفاده از یک رفرنس فوکوس می‌کند:

<Sandpack>

```js
import { useRef } from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```

</Sandpack>

<LearnMore path="/learn/manipulating-the-dom-with-refs">

**[دستکاری DOM با رفرنس‌ها](/learn/manipulating-the-dom-with-refs)** را بخوانید تا یاد بگیرید چگونه به عناصر DOM مدیریت‌شده توسط ری‌اکت دسترسی پیدا کنید.

</LearnMore>

## هم‌گام‌سازی با افکت‌ها {/*synchronizing-with-effects*/}

برخی کامپوننت‌ها نیاز دارند با سیستم‌های خارجی هم‌گام شوند. برای مثال، ممکن است بخواهید یک کامپوننت غیر ری‌اکتی را بر اساس استیت ری‌اکت کنترل کنید، یک اتصال سرور برقرار کنید، یا وقتی یک کامپوننت روی صفحه ظاهر می‌شود یک لاگ تحلیلی ارسال کنید. برخلاف مدیرکننده‌های رویداد، که به شما اجازه می‌دهند رویدادهای خاصی را مدیریت کنید، *افکت‌ها* به شما اجازه می‌دهند مقداری کد را بعد از رندر اجرا کنید. از آن‌ها برای هم‌گام‌سازی کامپوننت خود با یک سیستم خارج از ری‌اکت استفاده کنید.

چند بار پخش/توقف را بزنید و ببینید چگونه پخش‌کنندهٔ ویدیو با مقدار پراپس `isPlaying` هم‌گام می‌ماند:

<Sandpack>

```js
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```

```css
button { display: block; margin-bottom: 20px; }
video { width: 250px; }
```

</Sandpack>

بسیاری از افکت‌ها همچنین بعد از خودشان «پاک‌سازی» می‌کنند. برای مثال، یک افکتی که یک اتصال به سرور چت برقرار می‌کند باید یک *تابع پاک‌سازی* برگرداند که به ری‌اکت می‌گوید چگونه کامپوننت شما را از آن سرور قطع کند:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the chat!</h1>;
}
```

```js src/chat.js
export function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
```

</Sandpack>

در محیط توسعه، ری‌اکت افکت شما را یک بار اضافی بلافاصله اجرا و پاک‌سازی می‌کند. به همین دلیل می‌بینید که `"✅ Connecting..."` دو بار چاپ می‌شود. این کار تضمین می‌کند که تابع پاک‌سازی را پیاده‌سازی کردن را فراموش نکنید.

<LearnMore path="/learn/synchronizing-with-effects">

**[هم‌گام‌سازی با افکت‌ها](/learn/synchronizing-with-effects)** را بخوانید تا یاد بگیرید چگونه کامپوننت‌ها را با سیستم‌های خارجی هم‌گام کنید.

</LearnMore>

## شاید به افکت نیاز نداشته باشید {/*you-might-not-need-an-effect*/}

افکت‌ها راهی برای خروج از پارادایم ری‌اکت هستند. آن‌ها به شما اجازه می‌دهند از ری‌اکت «خارج شوید» و کامپوننت‌هایتان را با یک سیستم خارجی هم‌گام کنید. اگر هیچ سیستم خارجی در کار نیست (برای مثال، اگر می‌خواهید هنگام تغییر برخی پراپس‌ها یا استیت‌ها، استیت یک کامپوننت را به‌روزرسانی کنید)، نباید به افکت نیاز داشته باشید. حذف افکت‌های غیرضروری کد شما را دنبال‌کردنی‌تر، سریع‌تر در اجرا و کم‌تر مستعد خطا می‌کند.

دو مورد رایج وجود دارد که در آن‌ها به افکت نیاز ندارید:
- **برای تبدیل داده‌ها جهت رندر به افکت نیاز ندارید.**
- **برای مدیریت رویدادهای کاربر به افکت نیاز ندارید.**

برای مثال، برای تنظیم برخی استیت‌ها بر اساس استیت‌های دیگر به افکت نیاز ندارید:

```js {expectedErrors: {'react-compiler': [8]}} {5-9}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
  // ...
}
```

در عوض، تا جایی که می‌توانید هنگام رندر محاسبه کنید:

```js {4-5}
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

با این حال، برای هم‌گام‌سازی با سیستم‌های خارجی *به* افکت نیاز دارید.

<LearnMore path="/learn/you-might-not-need-an-effect">

**[شاید به افکت نیاز نداشته باشید](/learn/you-might-not-need-an-effect)** را بخوانید تا یاد بگیرید چگونه افکت‌های غیرضروری را حذف کنید.

</LearnMore>

## چرخهٔ حیات افکت‌های واکنشی {/*lifecycle-of-reactive-effects*/}

افکت‌ها چرخهٔ حیات متفاوتی از کامپوننت‌ها دارند. کامپوننت‌ها ممکن است mount شوند، به‌روزرسانی شوند یا unmount شوند. یک افکت فقط می‌تواند دو کار انجام دهد: شروع به هم‌گام‌سازی چیزی کند، و بعداً هم‌گام‌سازی آن را متوقف کند. این چرخه می‌تواند چندین بار اتفاق بیفتد اگر افکت شما به پراپس‌ها و استیت‌هایی وابسته باشد که در طول زمان تغییر می‌کنند.

این افکت به مقدار پراپس `roomId` وابسته است. پراپس‌ها *مقادیر واکنشی (reactive)* هستند، یعنی می‌توانند در یک رندر مجدد تغییر کنند. توجه کنید که افکت اگر `roomId` تغییر کند *دوباره هم‌گام‌سازی* می‌شود (و دوباره به سرور متصل می‌شود):

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

ری‌اکت یک قانون linter فراهم می‌کند تا بررسی کند که وابستگی‌های افکت خود را به‌درستی مشخص کرده‌اید. اگر فراموش کنید `roomId` را در فهرست وابستگی‌ها در مثال بالا مشخص کنید، linter آن باگ را به‌طور خودکار پیدا می‌کند.

<LearnMore path="/learn/lifecycle-of-reactive-effects">

**[چرخهٔ حیات افکت‌های واکنشی](/learn/lifecycle-of-reactive-effects)** را بخوانید تا یاد بگیرید چرخهٔ حیات یک افکت چگونه با چرخهٔ حیات یک کامپوننت متفاوت است.

</LearnMore>

## جدا کردن رویدادها از افکت‌ها {/*separating-events-from-effects*/}

<Wip>

این بخش یک **API آزمایشی است که هنوز در نسخهٔ پایدار ری‌اکت منتشر نشده است**.

</Wip>

مدیرکننده‌های رویداد فقط زمانی دوباره اجرا می‌شوند که همان تعامل را دوباره انجام دهید. برخلاف مدیرکننده‌های رویداد، افکت‌ها اگر هر یک از مقادیری که می‌خوانند، مانند پراپس‌ها یا استیت‌ها، با رندر قبلی متفاوت باشد، دوباره هم‌گام می‌شوند. گاهی، شما ترکیبی از هر دو رفتار را می‌خواهید: یک افکت که در پاسخ به برخی مقادیر دوباره اجرا شود اما نه دیگران.

تمام کد درون افکت‌ها *واکنشی* است. اگر مقدار واکنشی که می‌خواند به‌دلیل یک رندر مجدد تغییر کرده باشد، دوباره اجرا می‌شود. برای مثال، این افکت اگر `roomId` یا `theme` تغییر کرده باشد دوباره به چت متصل می‌شود:

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

این ایده‌آل نیست. می‌خواهید فقط در صورتی دوباره به چت متصل شوید که `roomId` تغییر کرده باشد. تغییر `theme` نباید باعث اتصال مجدد به چت شود! کد خواندن `theme` را از افکت خود به یک *Effect Event* منتقل کنید:

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

کد درون Effect Eventها واکنشی نیست، بنابراین تغییر `theme` دیگر باعث اتصال مجدد افکت شما نمی‌شود.

<LearnMore path="/learn/separating-events-from-effects">

**[جدا کردن رویدادها از افکت‌ها](/learn/separating-events-from-effects)** را بخوانید تا یاد بگیرید چگونه از re-trigger شدن افکت‌ها توسط برخی مقادیر جلوگیری کنید.

</LearnMore>

## حذف وابستگی‌های افکت {/*removing-effect-dependencies*/}

وقتی یک افکت می‌نویسید، linter بررسی می‌کند که هر مقدار واکنشی (مانند پراپس‌ها و استیت‌ها) که افکت می‌خواند را در فهرست وابستگی‌های افکت خود قرار داده‌اید. این کار تضمین می‌کند که افکت شما با آخرین پراپس‌ها و استیت‌های کامپوننت هم‌گام بماند. وابستگی‌های غیرضروری ممکن است باعث شوند افکت شما خیلی زیاد اجرا شود، یا حتی یک حلقهٔ بی‌نهایت ایجاد کند. نحوهٔ حذف آن‌ها به مورد بستگی دارد.

برای مثال، این افکت به شیء `options` وابسته است که هر بار ورودی را ویرایش می‌کنید دوباره ساخته می‌شود:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

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

نمی‌خواهید هر بار که شروع به تایپ یک پیام در آن چت می‌کنید، چت دوباره متصل شود. برای رفع این مشکل، ایجاد شیء `options` را درون افکت منتقل کنید تا افکت فقط به رشتهٔ `roomId` وابسته باشد:

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

توجه کنید که با ویرایش فهرست وابستگی برای حذف وابستگی `options` شروع نکردید. این اشتباه would بود. در عوض، کد اطراف را تغییر دادید تا وابستگی *غیرضروری* شود. فهرست وابستگی را به‌عنوان فهرستی از تمام مقادیر واکنشی که توسط کد افکت شما استفاده می‌شوند در نظر بگیرید. شما عمداً انتخاب نمی‌کنید که چه چیزی در آن فهرست قرار گیرد. فهرست کد شما را توصیف می‌کند. برای تغییر فهرست وابستگی، کد را تغییر دهید.

<LearnMore path="/learn/removing-effect-dependencies">

**[حذف وابستگی‌های افکت](/learn/removing-effect-dependencies)** را بخوانید تا یاد بگیرید چگونه افکت خود را کم‌تر دوباره اجرا کنید.

</LearnMore>

## استفادهٔ مجدد از منطق با هوک‌های سفارشی {/*reusing-logic-with-custom-hooks*/}

ری‌اکت با هوک‌های داخلی مانند `useState`، `useContext` و `useEffect` همراه می‌شود. گاهی، آرزو می‌کنید که هوکی برای هدفی خاص‌تر وجود داشت: برای مثال، برای fetch داده، برای پیگیری اینکه آیا کاربر آنلاین است یا خیر، یا برای اتصال به یک اتاق چت. برای این کار، می‌توانید هوک‌های خودتان را برای نیازهای برنامه‌تان ایجاد کنید.

در این مثال، هوک سفارشی `usePointerPosition` موقعیت نشانگر را پیگیری می‌کند، در حالی که هوک سفارشی `useDelayedValue` مقداری را برمی‌گرداند که از مقداری که پاس داده‌اید به اندازهٔ تعداد معینی میلی‌ثانیه «عقب‌تر» است. نشانگر را روی ناحیهٔ پیش‌نمایش sandbox حرکت دهید تا یک مسیر متحرک از نقطه‌ها که نشانگر را دنبال می‌کنند ببینید:

<Sandpack>

```js
import { usePointerPosition } from './usePointerPosition.js';
import { useDelayedValue } from './useDelayedValue.js';

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 50);
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

```js src/useDelayedValue.js
import { useState, useEffect } from 'react';

export function useDelayedValue(value, delay) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}
```

```css
body { min-height: 300px; }
```

</Sandpack>

می‌توانید هوک‌های سفارشی ایجاد کنید، آن‌ها را با هم ترکیب کنید، داده‌ها را بین آن‌ها منتقل کنید، و از آن‌ها بین کامپوننت‌ها استفادهٔ مجدد کنید. با رشد برنامه‌تان، افکت‌های کمتری را به‌صورت دستی می‌نویسید زیرا می‌توانید از هوک‌های سفارشی که قبلاً نوشته‌اید استفادهٔ مجدد کنید. همچنین هوک‌های سفارشی عالی زیادی توسط جامعهٔ ری‌اکت نگهداری می‌شوند.

<LearnMore path="/learn/reusing-logic-with-custom-hooks">

**[استفادهٔ مجدد از منطق با هوک‌های سفارشی](/learn/reusing-logic-with-custom-hooks)** را بخوانید تا یاد بگیرید چگونه منطق را بین کامپوننت‌ها به اشتراک بگذارید.

</LearnMore>

## گام بعدی چه هست؟ {/*whats-next*/}

به [ارجاع به مقادیر با رفرنس‌ها](/learn/referencing-values-with-refs) بروید تا خواندن این فصل را صفحه به صفحه شروع کنید!
