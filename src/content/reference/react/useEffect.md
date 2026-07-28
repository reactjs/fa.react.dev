---
title: useEffect
---

<Intro>

`useEffect` یک هوک ری‌اکت است که به شما اجازه می‌دهد یک کامپوننت را [با یک سیستم خارجی همگام کنید.](/learn/synchronizing-with-effects)

```js
useEffect(setup, dependencies?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useEffect(setup, dependencies?)` {/*useeffect*/}

برای اعلان یک افکت، `useEffect` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `setup`: تابعی با منطق افکت شما. تابع setup شما همچنین می‌تواند به‌صورت اختیاری یک تابع *cleanup* برگرداند. وقتی کامپوننت شما به DOM اضافه می‌شود، ری‌اکت تابع setup شما را اجرا می‌کند. پس از هر رندر مجدد با وابستگی‌های تغییر یافته، ری‌اکت ابتدا تابع cleanup را (اگر ارائه کرده‌اید) با مقادیر قدیمی اجرا می‌کند، و سپس تابع setup شما را با مقادیر جدید اجرا می‌کند. پس از حذف کامپوننت شما از DOM، ری‌اکت تابع cleanup شما را اجرا می‌کند.
 
* **اختیاری** `dependencies`: فهرست تمام مقادیر reactive که داخل کد `setup` ارجاع داده شده‌اند. مقادیر reactive شامل پراپس، استیت و تمام متغیرها و توابعی است که مستقیماً داخل بدنهٔ کامپوننت شما اعلان شده‌اند. اگر linter شما [برای ری‌اکت پیکربندی شده باشد،](/learn/editor-setup#linting) تأیید می‌کند که هر مقدار reactive به‌درستی به‌عنوان یک وابستگی مشخص شده است. فهرست وابستگی‌ها باید تعداد آیتم ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی آن با استفاده از مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. اگر این آرگومان را حذف کنید، افکت شما پس از هر رندر مجدد کامپوننت دوباره اجرا می‌شود. [تفاوت بین ارسال یک آرایه از وابستگی‌ها، یک آرایهٔ خالی و بدون وابستگی اصلاً را ببینید.](#examples-dependencies)

#### مقدار بازگشتی {/*returns*/}

`useEffect` مقدار `undefined` را برمی‌گرداند.

#### نکات {/*caveats*/}

* `useEffect` یک هوک است، بنابراین فقط می‌توانید آن را **در بالاترین سطح کامپوننت** خود یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را داخل حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.

* اگر **در تلاش برای همگام‌سازی با یک سیستم خارجی نیستید،** [احتمالاً به افکت نیاز ندارید.](/learn/you-might-not-need-an-effect)

* وقتی حالت سخت‌گیرانه (Strict Mode) فعال است، ری‌اکت **یک چرخهٔ اضافی setup+cleanup فقط در محیط توسعه** قبل از setup واقعی اول اجرا می‌کند. این یک تست فشار است که تضمین می‌کند منطق cleanup شما با منطق setup «تطابق» دارد و آنچه setup انجام می‌دهد را متوقف یا خنثی می‌کند. اگر این باعث مشکلی می‌شود، [تابع cleanup را پیاده‌سازی کنید.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

* اگر برخی از وابستگی‌های شما اشیاء یا توابعی هستند که داخل کامپوننت تعریف شده‌اند، خطر وجود دارد که **باعث شوند افکت بیشتر از نیاز دوباره اجرا شود.** برای رفع این مشکل، وابستگی‌های [object](#removing-unnecessary-object-dependencies) و [function](#removing-unnecessary-function-dependencies) غیرضروری را حذف کنید. همچنین می‌توانید [به‌روزرسانی‌های استیت](#updating-state-based-on-previous-state-from-an-effect) و [منطق non-reactive](#reading-the-latest-props-and-state-from-an-effect) را خارج از افکت خود استخراج کنید.

* اگر افکت شما ناشی از یک تعامل (مانند کلیک) نبوده است، ری‌اکت عموماً اجازه می‌دهد مرورگر **ابتدا صفحهٔ به‌روز شده را paint کند و سپس افکت شما را اجرا کند.** اگر افکت شما کاری بصری انجام می‌دهد (مثلاً موقعیت‌دهی یک tooltip) و تأخیر قابل‌توجه است (مثلاً flicker می‌زند)، `useEffect` را با [`useLayoutEffect`](/reference/react/useLayoutEffect) جایگزین کنید.

* اگر افکت شما ناشی از یک تعامل (مانند کلیک) است، **ری‌اکت ممکن است افکت شما را قبل از اینکه مرورگر صفحهٔ به‌روز شده را paint کند، اجرا کند.** این کار تضمین می‌کند که نتیجهٔ افکت توسط سیستم رویداد قابل مشاهده باشد. معمولاً این همان‌طور که انتظار می‌رود کار می‌کند. با این حال، اگر باید کار را تا بعد از paint به تأخیر بیندازید، مانند یک `alert()`، می‌توانید از `setTimeout` استفاده کنید. برای اطلاعات بیشتر به [reactwg/react-18/128](https://github.com/reactwg/react-18/discussions/128) مراجعه کنید.

* حتی اگر افکت شما ناشی از یک تعامل (مانند کلیک) بوده باشد، **ری‌اکت ممکن است اجازه دهد مرورگر قبل از پردازش به‌روزرسانی‌های استیت داخل افکت شما، صفحه را مجدداً paint کند.** معمولاً این همان‌طور که انتظار می‌رود کار می‌کند. با این حال، اگر باید مرورگر را از paint مجدد صفحه منع کنید، باید `useEffect` را با [`useLayoutEffect`](/reference/react/useLayoutEffect) جایگزین کنید.

* افکت‌ها **فقط روی کلاینت اجرا می‌شوند.** آن‌ها در طول رندر سمت سرور اجرا نمی‌شوند.

---

## استفاده {/*usage*/}

### اتصال به یک سیستم خارجی {/*connecting-to-an-external-system*/}

برخی کامپوننت‌ها باید هنگام نمایش روی صفحه، به شبکه، یک API مرورگر یا یک کتابخانهٔ شخص ثالث متصل بمانند. این سیستم‌ها توسط ری‌اکت کنترل نمی‌شوند، بنابراین *خارجی* نامیده می‌شوند.

برای [اتصال کامپوننت خود به یک سیستم خارجی،](/learn/synchronizing-with-effects) `useEffect` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js [[1, 8, "const connection = createConnection(serverUrl, roomId);"], [1, 9, "connection.connect();"], [2, 11, "connection.disconnect();"], [3, 13, "[serverUrl, roomId]"]]
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
    connection.connect();
        return () => {
      connection.disconnect();
        };
  }, [serverUrl, roomId]);
  // ...
}
```

باید دو آرگومان به `useEffect` ارسال کنید:

1. یک *setup function* با <CodeStep step={1}>setup code</CodeStep> که به آن سیستم متصل می‌شود.
   - این تابع باید یک *cleanup function* با <CodeStep step={2}>cleanup code</CodeStep> برگرداند که از آن سیستم قطع می‌شود.
2. یک <CodeStep step={3}>list of dependencies</CodeStep> که شامل هر مقداری از کامپوننت شما است که داخل این توابع استفاده شده است.

**ری‌اکت توابع setup و cleanup شما را هر بار که لازم است فراخوانی می‌کند، که ممکن است چند بار اتفاق بیفتد:**

1. <CodeStep step={1}>setup code</CodeStep> شما وقتی کامپوننت شما به صفحه اضافه می‌شود *(mounts)* اجرا می‌گردد.
2. پس از هر رندر مجدد کامپوننت شما که در آن <CodeStep step={3}>dependencies</CodeStep> تغییر کرده‌اند:
   - ابتدا، <CodeStep step={2}>cleanup code</CodeStep> شما با پراپس و استیت قدیمی اجرا می‌شود.
   - سپس، <CodeStep step={1}>setup code</CodeStep> شما با پراپس و استیت جدید اجرا می‌شود.
3. <CodeStep step={2}>cleanup code</CodeStep> شما یک بار نهایی پس از حذف کامپوننت شما از صفحه *(unmounts)* اجرا می‌شود.

**این دنباله را برای مثال بالا نشان می‌دهیم.**  

وقتی کامپوننت `ChatRoom` بالا به صفحه اضافه می‌شود، به اتاق گفتگو با `serverUrl` و `roomId` اولیه متصل می‌شود. اگر `serverUrl` یا `roomId` در نتیجهٔ یک رندر مجدد تغییر کنند (مثلاً اگر کاربر یک اتاق گفتگوی متفاوت در dropdown انتخاب کند)، افکت شما *از اتاق قبلی قطع می‌شود و به اتاق بعدی متصل می‌گردد.* وقتی کامپوننت `ChatRoom` از صفحه حذف می‌شود، افکت شما یک بار آخر قطع می‌شود.

**برای [کمک به یافتن باگ‌ها،](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) در محیط توسعه ری‌اکت <CodeStep step={1}>setup</CodeStep> و <CodeStep step={2}>cleanup</CodeStep> را یک بار اضافی قبل از <CodeStep step={1}>setup</CodeStep> اجرا می‌کند.** این یک تست فشار است که تأیید می‌کند منطق افکت شما به‌درستی پیاده‌سازی شده است. اگر این کار باعث مشکلات قابل مشاهده می‌شود، تابع cleanup شما برخی منطق‌ها را از دست می‌دهد. تابع cleanup باید آنچه تابع setup در حال انجام آن بود را متوقف یا خنثی کند. قاعدهٔ کلی این است که کاربر نباید بتواند بین فراخوانی یک‌بارهٔ setup (مانند production) و دنبالهٔ *setup* → *cleanup* → *setup* (مانند development) تفاوتی قائل شود. [راه‌حل‌های رایج را ببینید.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

**سعی کنید [هر افکت را به‌عنوان یک فرآیند مستقل بنویسید](/learn/lifecycle-of-reactive-effects#each-effect-represents-a-separate-synchronization-process) و [در هر لحظه فقط یک چرخهٔ setup/cleanup را در نظر بگیرید.](/learn/lifecycle-of-reactive-effects#thinking-from-the-effects-perspective)** نباید مهم باشد که کامپوننت شما در حال mount، به‌روزرسانی یا unmount است. وقتی منطق cleanup شما به‌درستی با منطق setup «تطابق» دارد، افکت شما در برابر اجرای setup و cleanup به‌اندازهٔ نیاز مقاوم است.

<Note>

یک افکت به شما اجازه می‌دهد کامپوننت خود را با برخی سیستم‌های خارجی [همگام نگه دارید](/learn/synchronizing-with-effects) (مانند یک سرویس چت). در اینجا، *سیستم خارجی* به هر قطعه کدی گفته می‌شود که توسط ری‌اکت کنترل نمی‌شود، مانند:

* یک تایمر مدیریت‌شده با <CodeStep step={1}>[`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)</CodeStep> و <CodeStep step={2}>[`clearInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)</CodeStep>.
* یک اشتراک رویداد با استفاده از <CodeStep step={1}>[`window.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)</CodeStep> و <CodeStep step={2}>[`window.removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)</CodeStep>.
* یک کتابخانه انیمیشن شخص ثالث با API‌ای مانند <CodeStep step={1}>`animation.start()`</CodeStep> و <CodeStep step={2}>`animation.reset()`</CodeStep>.

**اگر به هیچ سیستم خارجی متصل نمی‌شوید، [احتمالاً به افکت نیاز ندارید.](/learn/you-might-not-need-an-effect)**

</Note>

<Recipes titleText="Examples of connecting to an external system" titleId="examples-connecting">

#### اتصال به یک سرور چت {/*connecting-to-a-chat-server*/}

در این مثال، کامپوننت `ChatRoom` از یک افکت برای اتصال به یک سیستم خارجی تعریف‌شده در `chat.js` استفاده می‌کند. دکمهٔ "Open chat" را فشار دهید تا کامپوننت `ChatRoom` ظاهر شود. این sandbox در حالت development اجرا می‌شود، بنابراین یک چرخهٔ اضافی connect-and-disconnect وجود دارد، همان‌طور که [اینجا توضیح داده شده است.](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) با استفاده از dropdown و input، `roomId` و `serverUrl` را تغییر دهید و ببینید چگونه افکت مجدداً به چت متصل می‌شود. دکمهٔ "Close chat" را فشار دهید تا ببینید افکت یک بار آخر قطع می‌شود.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
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

<Solution />

#### گوش دادن به یک رویداد سراسری مرورگر {/*listening-to-a-global-browser-event*/}

در این مثال، سیستم خارجی خود DOM مرورگر است. معمولاً event listener‌ها را با JSX مشخص می‌کنید، اما نمی‌توانید به این روش به شیء سراسری [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) گوش دهید. یک افکت به شما اجازه می‌دهد به شیء `window` متصل شوید و به رویدادهای آن گوش دهید. گوش دادن به رویداد `pointermove` به شما اجازه می‌دهد موقعیت cursor (یا انگشت) را ردیابی کنید و نقطهٔ قرمز را برای حرکت با آن به‌روز کنید.

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
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
  );
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### راه‌اندازی یک انیمیشن {/*triggering-an-animation*/}

در این مثال، سیستم خارجی کتابخانهٔ انیمیشن در `animation.js` است. این کتابخانه یک کلاس جاوااسکریپت به نام `FadeInAnimation` ارائه می‌دهد که یک نود DOM را به‌عنوان آرگومان می‌گیرد و متدهای `start()` و `stop()` را برای کنترل انیمیشن در اختیار می‌گذارد. این کامپوننت [از یک رفرنس استفاده می‌کند](/learn/manipulating-the-dom-with-refs) تا به نود DOM زیرین دسترسی داشته باشد. افکت نود DOM را از رفرنس می‌خواند و هنگامی که کامپوننت ظاهر می‌شود، به‌طور خودکار انیمیشن را برای آن نود راه‌اندازی می‌کند.

<Sandpack>

```js
import { useState, useEffect, useRef } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome() {
  const ref = useRef(null);

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(1000);
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

<Solution />

#### کنترل یک modal dialog {/*controlling-a-modal-dialog*/}

در این مثال، سیستم خارجی DOM مرورگر است. کامپوننت `ModalDialog` یک element [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) را رندر می‌کند. این کامپوننت از یک افکت برای همگام‌سازی پراپس `isOpen` با فراخوانی‌های متد [`showModal()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) و [`close()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close) استفاده می‌کند.

<Sandpack>

```js
import { useState } from 'react';
import ModalDialog from './ModalDialog.js';

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>
        Open dialog
      </button>
      <ModalDialog isOpen={show}>
        Hello there!
        <br />
        <button onClick={() => {
          setShow(false);
        }}>Close</button>
      </ModalDialog>
    </>
  );
}
```

```js src/ModalDialog.js active
import { useEffect, useRef } from 'react';

export default function ModalDialog({ isOpen, children }) {
  const ref = useRef();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}>{children}</dialog>;
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### ردیابی visibility المان {/*tracking-element-visibility*/}

در این مثال، سیستم خارجی دوباره DOM مرورگر است. کامپوننت `App` یک لیست طولانی، سپس یک کامپوننت `Box`، و سپس یک لیست طولانی دیگر نمایش می‌دهد. لیست را به پایین scroll کنید. توجه کنید که وقتی تمام کامپوننت `Box` به‌طور کامل در viewport قابل مشاهده است، رنگ پس‌زمینه به مشکی تغییر می‌کند. برای پیاده‌سازی این کار، کامپوننت `Box` از یک افکت برای مدیریت یک [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) استفاده می‌کند. این API مرورگر شما را مطلع می‌کند وقتی المان DOM در viewport قابل مشاهده است.

<Sandpack>

```js
import Box from './Box.js';

export default function App() {
  return (
    <>
      <LongSection />
      <Box />
      <LongSection />
      <Box />
      <LongSection />
    </>
  );
}

function LongSection() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Item #{i} (keep scrolling)</li>);
  }
  return <ul>{items}</ul>
}
```

```js src/Box.js active
import { useRef, useEffect } from 'react';

export default function Box() {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      }
    }, {
       threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }} />
  );
}
```

</Sandpack>

<Solution />

</Recipes>

---

### پیچاندن افکت‌ها در هوک‌های سفارشی {/*wrapping-effects-in-custom-hooks*/}

افکت‌ها یک ["escape hatch":](/learn/escape-hatches) هستند: از آن‌ها استفاده می‌کنید وقتی نیاز دارید "خارج از ری‌اکت قدم بزنید" و وقتی راه‌حل داخلی بهتری برای مورد استفادهٔ شما وجود ندارد. اگر متوجه شدید اغلب نیاز به نوشتن دستی افکت‌ها دارید، معمولاً این نشانه‌ای است که باید برخی [هوک‌های سفارشی](/learn/reusing-logic-with-custom-hooks) را برای رفتارهای رایجی که کامپوننت‌های شما به آن‌ها وابسته‌اند، استخراج کنید.

برای مثال، این هوک سفارشی `useChatRoom` منطق افکت شما را پشت یک API اعلانی‌تر «پنهان» می‌کند:

```js {1,11}
function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```

سپس می‌توانید از آن از هر کامپوننتی مانند این استفاده کنید:

```js {4-7}
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });
  // ...
```

همچنین هوک‌های سفارشی فوق‌العاده‌ای برای هر منظوری در اکوسیستم ری‌اکت در دسترس هستند.

[دربارهٔ پیچاندن افکت‌ها در هوک‌های سفارشی بیشتر بدانید.](/learn/reusing-logic-with-custom-hooks)

<Recipes titleText="Examples of wrapping Effects in custom Hooks" titleId="examples-custom-hooks">

#### هوک سفارشی `useChatRoom` {/*custom-usechatroom-hook*/}

این مثال با یکی از [نمونه‌های قبلی](#examples-connecting) یکسان است، اما منطق به یک هوک سفارشی استخراج شده است.

<Sandpack>

```js
import { useState } from 'react';
import { useChatRoom } from './useChatRoom.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
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

```js src/useChatRoom.js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]);
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

<Solution />

#### هوک سفارشی `useWindowListener` {/*custom-usewindowlistener-hook*/}

این مثال با یکی از [نمونه‌های قبلی](#examples-connecting) یکسان است، اما منطق به یک هوک سفارشی استخراج شده است.

<Sandpack>

```js
import { useState } from 'react';
import { useWindowListener } from './useWindowListener.js';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useWindowListener('pointermove', (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  });

  return (
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
  );
}
```

```js src/useWindowListener.js
import { useState, useEffect } from 'react';

export function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
}
```

```css
body {
  min-height: 300px;
}
```

</Sandpack>

<Solution />

#### هوک سفارشی `useIntersectionObserver` {/*custom-useintersectionobserver-hook*/}

این مثال با یکی از [نمونه‌های قبلی](#examples-connecting) یکسان است، اما منطق به‌طور جزئی به یک هوک سفارشی استخراج شده است.

<Sandpack>

```js
import Box from './Box.js';

export default function App() {
  return (
    <>
      <LongSection />
      <Box />
      <LongSection />
      <Box />
      <LongSection />
    </>
  );
}

function LongSection() {
  const items = [];
  for (let i = 0; i < 50; i++) {
    items.push(<li key={i}>Item #{i} (keep scrolling)</li>);
  }
  return <ul>{items}</ul>
}
```

```js src/Box.js active
import { useRef, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver.js';

export default function Box() {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
   if (isIntersecting) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} style={{
      margin: 20,
      height: 100,
      width: 100,
      border: '2px solid black',
      backgroundColor: 'blue'
    }} />
  );
}
```

```js src/useIntersectionObserver.js
import { useState, useEffect } from 'react';

export function useIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const div = ref.current;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setIsIntersecting(entry.isIntersecting);
    }, {
       threshold: 1.0
    });
    observer.observe(div);
    return () => {
      observer.disconnect();
    }
  }, [ref]);

  return isIntersecting;
}
```

</Sandpack>

<Solution />

</Recipes>

---

### کنترل یک ویجت غیر ری‌اکتی {/*controlling-a-non-react-widget*/}

گاهی اوقات، می‌خواهید یک سیستم خارجی را با برخی پراپس یا استیت‌های کامپوننت خود همگام نگه دارید.

برای مثال، اگر یک ویجت نقشهٔ شخص ثالث یا یک کامپوننت پخش‌کنندهٔ ویدئو دارید که بدون ری‌اکت نوشته شده است، می‌توانید از یک افکت برای فراخوانی متدهایی روی آن استفاده کنید که استیت آن را با استیت فعلی کامپوننت ری‌اکت شما مطابقت می‌دهد. این افکت یک نمونه از کلاس `MapWidget` تعریف‌شده در `map-widget.js` ایجاد می‌کند. وقتی پراپس `zoomLevel` کامپوننت `Map` را تغییر می‌دهید، افکت `setZoom()` را روی نمونهٔ کلاس فراخوانی می‌کند تا آن را همگام نگه دارد:

<Sandpack>

```json package.json hidden
{
  "dependencies": {
    "leaflet": "1.9.1",
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

```js src/App.js
import { useState } from 'react';
import Map from './Map.js';

export default function App() {
  const [zoomLevel, setZoomLevel] = useState(0);
  return (
    <>
      Zoom level: {zoomLevel}x
      <button onClick={() => setZoomLevel(zoomLevel + 1)}>+</button>
      <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
      <hr />
      <Map zoomLevel={zoomLevel} />
    </>
  );
}
```

```js src/Map.js active
import { useRef, useEffect } from 'react';
import { MapWidget } from './map-widget.js';

export default function Map({ zoomLevel }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    const map = mapRef.current;
    map.setZoom(zoomLevel);
  }, [zoomLevel]);

  return (
    <div
      style={{ width: 200, height: 200 }}
      ref={containerRef}
    />
  );
}
```

```js src/map-widget.js
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export class MapWidget {
  constructor(domNode) {
    this.map = L.map(domNode, {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      touchZoom: false,
      zoomSnap: 0.1
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
    this.map.setView([0, 0], 0);
  }
  setZoom(level) {
    this.map.setZoom(level);
  }
}
```

```css
button { margin: 5px; }
```

</Sandpack>

در این مثال، تابع cleanup لازم نیست زیرا کلاس `MapWidget` فقط نود DOM که به آن ارسال شده بود را مدیریت می‌کند. پس از حذف کامپوننت ری‌اکت `Map` از درخت، هم نود DOM و هم نمونهٔ کلاس `MapWidget` به‌طور خودکار توسط موتور جاوااسکریپت مرورگر garbage-collect می‌شوند.

---

### fetch داده‌ها با افکت‌ها {/*fetching-data-with-effects*/}

می‌توانید از یک افکت برای fetch داده‌ها برای کامپوننت خود استفاده کنید. توجه داشته باشید که [اگر از یک فریم‌ورک استفاده می‌کنید،](/learn/start-a-new-react-project#full-stack-frameworks) استفاده از مکانیزم fetch دادهٔ فریم‌ورک شما بسیار کارآمدتر از نوشتن دستی افکت‌ها خواهد بود.

اگر می‌خواهید داده‌ها را به‌صورت دستی از یک افکت fetch کنید، کد شما ممکن است به این شکل باشد:

```js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);

  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    };
  }, [person]);

  // ...
```

به متغیر `ignore` توجه کنید که با `false` مقداردهی شده و در حین cleanup به `true` تنظیم می‌شود. این کار تضمین می‌کند [کد شما از "race conditions" رنج نمی‌برد:](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) پاسخ‌های شبکه ممکن است به ترتیب متفاوتی از آنچه ارسال کرده‌اید برسند.

<Sandpack>

{/* TODO(@poteto) - investigate potential false positives in react compiler validation */}
```js {expectedErrors: {'react-compiler': [9]}} src/App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```

```js src/api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '’s bio.');
    }, delay);
  })
}
```

</Sandpack>

همچنین می‌توانید با استفاده از سینتکس [`async` / `await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) بازنویسی کنید، اما همچنان باید یک تابع cleanup ارائه کنید:

<Sandpack>

```js src/App.js
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    async function startFetching() {
      setBio(null);
      const result = await fetchBio(person);
      if (!ignore) {
        setBio(result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? 'Loading...'}</i></p>
    </>
  );
}
```

```js src/api.js hidden
export async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '’s bio.');
    }, delay);
  })
}
```

</Sandpack>

نوشتن fetch داده‌ها به‌طور مستقیم در افکت‌ها تکراری می‌شود و افزودن بهینه‌سازی‌هایی مانند caching و رندر سمت سرور را بعداً دشوار می‌سازد. [استفاده از یک هوک سفارشی — چه خودتان چه نگهداری‌شده توسط جامعه — آسان‌تر است.](/learn/reusing-logic-with-custom-hooks#when-to-use-custom-hooks)

<DeepDive>

#### جایگزین‌های خوب برای fetch داده‌ها در افکت‌ها چه هستند؟ {/*what-are-good-alternatives-to-data-fetching-in-effects*/}

نوشتن فراخوانی‌های `fetch` داخل افکت‌ها یک [روش محبوب برای fetch داده‌ها](https://www.robinwieruch.de/react-hooks-fetch-data/) است، به‌ویژه در اپلیکیشن‌های کاملاً سمت کلاینت. با این حال، این یک رویکرد بسیار دستی است و معایب قابل‌توجهی دارد:

- **افکت‌ها روی سرور اجرا نمی‌شوند.** این بدان معناست که HTML اولیهٔ رندر شدهٔ سرور فقط شامل یک استیت loading بدون داده خواهد بود. کامپیوتر کلاینت باید تمام جاوااسکریپت را دانلود کرده و اپلیکیشن شما را رندر کند تا کشف کند که حالا نیاز به بارگذاری داده‌ها دارد. این کار چندان کارآمد نیست.

- **fetch مستقیم در افکت‌ها ایجاد "network waterfalls" را آسان می‌کند.** شما کامپوننت والد را رندر می‌کنید، آن برخی داده‌ها را fetch می‌کند، کامپوننت‌های فرزند را رندر می‌کند، و سپس آن‌ها شروع به fetch داده‌های خود می‌کنند. اگر شبکه خیلی سریع نیست، این به‌طور قابل‌توجهی کندتر از fetch کردن تمام داده‌ها به‌صورت موازی است.

- **fetch مستقیم در افکت‌ها معمولاً به این معناست که داده‌ها را preload یا cache نمی‌کنید.** برای مثال، اگر کامپوننت unmount و سپس دوباره mount شود، باید داده‌ها را دوباره fetch کند.

- **خیلی ارگونومیک نیست.** کد boilerplate زیادی هنگام نوشتن فراخوانی‌های `fetch` به روشی که از باگ‌هایی مانند [race conditions](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect) رنج نمی‌برد، درگیر است.

این لیست معایب مختص ری‌اکت نیست. برای fetch داده‌ها در mount با هر کتابخانه‌ای اعمال می‌شود. مانند routing، fetch داده‌ها برای انجام خوب آن بدیهی نیست، بنابراین رویکردهای زیر را توصیه می‌کنیم:

- **اگر از یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks) استفاده می‌کنید، از مکانیزم fetch دادهٔ داخلی آن استفاده کنید.** فریم‌ورک‌های مدرن ری‌اکت مکانیزم‌های fetch دادهٔ یکپارچه‌ای دارند که کارآمد هستند و از مشکلات بالا رنج نمی‌برند.

- **در غیر این صورت، در نظر بگیرید از یک cache سمت کلاینت استفاده کنید یا یکی بسازید.** راه‌حل‌های متن‌باز محبوب شامل [React Query](https://tanstack.com/query/latest/)، [useSWR](https://swr.vercel.app/) و [React Router 6.4+](https://beta.reactrouter.com/en/main/start/overview) هستند. می‌توانید راه‌حل خود را نیز بسازید، در این صورت از افکت‌ها در زیر استفاده می‌کنید اما همچنین منطقی برای حذف تکراری درخواست‌ها، cache کردن پاسخ‌ها، و اجتناب از network waterfalls (با preload داده‌ها یا انتقال نیازمندی‌های داده به route‌ها) اضافه می‌کنید.

اگر هیچ‌یک از این رویکردها برای شما مناسب نیست، می‌توانید به fetch مستقیم داده‌ها در افکت‌ها ادامه دهید.

</DeepDive>

---

### مشخص کردن وابستگی‌های reactive {/*specifying-reactive-dependencies*/}

**توجه داشته باشید که نمی‌توانید وابستگی‌های افکت خود را "انتخاب" کنید.** هر <CodeStep step={2}>reactive value</CodeStep> که توسط کد افکت شما استفاده می‌شود باید به‌عنوان یک وابستگی اعلان شود. لیست وابستگی‌های افکت شما توسط کد اطراف آن تعیین می‌شود:

```js [[2, 1, "roomId"], [2, 2, "serverUrl"], [2, 5, "serverUrl"], [2, 5, "roomId"], [2, 8, "serverUrl"], [2, 8, "roomId"]]
function ChatRoom({ roomId }) { // This is a reactive value
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // This is a reactive value too

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads these reactive values
    connection.connect();
    return () => connection.disconnect();
  }, [serverUrl, roomId]); // ✅ So you must specify them as dependencies of your Effect
  // ...
}
```

اگر `serverUrl` یا `roomId` تغییر کنند، افکت شما با استفاده از مقادیر جدید مجدداً به چت متصل می‌شود.

**[مقادیر reactive](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) شامل پراپس و تمام متغیرها و توابعی است که مستقیماً داخل کامپوننت شما اعلان شده‌اند.** از آنجا که `roomId` و `serverUrl` مقادیر reactive هستند، نمی‌توانید آن‌ها را از وابستگی‌ها حذف کنید. اگر سعی کنید آن‌ها را حذف کنید و [linter شما به‌درستی برای ری‌اکت پیکربندی شده باشد،](/learn/editor-setup#linting) linter این را به‌عنوان یک اشتباه که باید برطرف کنید علامت‌گذاری می‌کند:

```js {8}
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // 🔴 React Hook useEffect has missing dependencies: 'roomId' and 'serverUrl'
  // ...
}
```

**برای حذف یک وابستگی، باید [به linter "ثابت کنید" که *لازم نیست* یک وابستگی باشد.](/learn/removing-effect-dependencies#removing-unnecessary-dependencies)** برای مثال، می‌توانید `serverUrl` را از کامپوننت خود خارج کنید تا ثابت کنید که reactive نیست و در رندر مجدد تغییر نمی‌کند:

```js {1,8}
const serverUrl = 'https://localhost:1234'; // Not a reactive value anymore

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
}
```

اکنون که `serverUrl` یک مقدار reactive نیست (و در یک رندر مجدد نمی‌تواند تغییر کند)، نیازی نیست یک وابستگی باشد. **اگر کد افکت شما از هیچ مقدار reactive استفاده نمی‌کند، لیست وابستگی‌های آن باید خالی باشد (`[]`):**

```js {1,2,9}
const serverUrl = 'https://localhost:1234'; // Not a reactive value anymore
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

[یک افکت با وابستگی‌های خالی](/learn/lifecycle-of-reactive-effects#what-an-effect-with-empty-dependencies-means) زمانی که هر یک از پراپس یا استیت کامپوننت شما تغییر کند، دوباره اجرا نمی‌شود.

<Pitfall>

اگر یک کدبیس موجود دارید، ممکن است برخی افکت‌ها داشته باشید که linter را مانند این سرکوب می‌کنند:

```js {3-4}
useEffect(() => {
  // ...
  // 🔴 Avoid suppressing the linter like this:
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
```

**وقتی وابستگی‌ها با کد مطابقت ندارند، خطر بالایی برای ایجاد باگ وجود دارد.** با سرکوب linter، شما در مورد مقادیری که افکت شما به آن‌ها وابسته است به ری‌اکت "دروغ" می‌گویید. [در عوض، ثابت کنید آن‌ها غیرضروری هستند.](/learn/removing-effect-dependencies#removing-unnecessary-dependencies)

</Pitfall>

<Recipes titleText="Examples of passing reactive dependencies" titleId="examples-dependencies">

#### ارسال یک آرایه وابستگی {/*passing-a-dependency-array*/}

اگر وابستگی‌ها را مشخص کنید، افکت شما **پس از رندر اولیه _و_ پس از رندرهای مجدد با وابستگی‌های تغییر یافته** اجرا می‌شود.

```js {3}
useEffect(() => {
  // ...
}, [a, b]); // Runs again if a or b are different
```

در مثال زیر، `serverUrl` و `roomId` [مقادیر reactive](/learn/lifecycle-of-reactive-effects#effects-react-to-reactive-values) هستند، بنابراین هر دو باید به‌عنوان وابستگی مشخص شوند. در نتیجه، انتخاب یک اتاق متفاوت در dropdown یا ویرایش input سرور URL باعث اتصال مجدد چت می‌شود. با این حال، از آنجا که `message` در افکت استفاده نمی‌شود (و بنابراین یک وابستگی نیست)، ویرایش پیام باعث اتصال مجدد به چت نمی‌شود.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
      <label>
        Your message:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
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
        <button onClick={() => setShow(!show)}>
          {show ? 'Close chat' : 'Open chat'}
        </button>
      </label>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId}/>}
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
input { margin-bottom: 10px; }
button { margin-left: 5px; }
```

</Sandpack>

<Solution />

#### ارسال یک آرایه وابستگی خالی {/*passing-an-empty-dependency-array*/}

اگر افکت شما واقعاً از هیچ مقدار reactive استفاده نمی‌کند، فقط **پس از رندر اولیه** اجرا می‌شود.

```js {3}
useEffect(() => {
  // ...
}, []); // Does not run again (except once in development)
```

**حتی با وابستگی‌های خالی، setup و cleanup [یک بار اضافی در محیط توسعه اجرا می‌شوند](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) تا به شما در یافتن باگ‌ها کمک کنند.**


در این مثال، هر دو `serverUrl` و `roomId` hardcode شده‌اند. از آنجا که آن‌ها خارج از کامپوننت اعلان شده‌اند، مقادیر reactive نیستند و بنابراین وابستگی نیستند. لیست وابستگی خالی است، بنابراین افکت در رندرهای مجدد دوباره اجرا نمی‌شود.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'music';

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <label>
        Your message:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>
      {show && <hr />}
      {show && <ChatRoom />}
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

</Sandpack>

<Solution />


#### ارسال هیچ آرایه وابستگی اصلاً {/*passing-no-dependency-array-at-all*/}

اگر هیچ آرایه وابستگی ارسال نکنید، افکت شما **پس از هر تک‌رندر (و رندر مجدد)** کامپوننت شما اجرا می‌شود.

```js {3}
useEffect(() => {
  // ...
}); // Always runs again
```

در این مثال، افکت هنگام تغییر `serverUrl` و `roomId` دوباره اجرا می‌شود، که منطقی است. با این حال، هنگام تغییر `message` نیز *دوباره* اجرا می‌شود، که احتمالاً نامطلوب است. به این دلیل معمولاً آرایه وابستگی را مشخص می‌کنید.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }); // No dependency array at all

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={serverUrl}
          onChange={e => setServerUrl(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
      <label>
        Your message:{' '}
        <input value={message} onChange={e => setMessage(e.target.value)} />
      </label>
    </>
  );
}

export default function App() {
  const [show, setShow] = useState(false);
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
        <button onClick={() => setShow(!show)}>
          {show ? 'Close chat' : 'Open chat'}
        </button>
      </label>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId}/>}
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
input { margin-bottom: 10px; }
button { margin-left: 5px; }
```

</Sandpack>

<Solution />

</Recipes>

---

### به‌روزرسانی استیت بر اساس استیت قبلی از یک افکت {/*updating-state-based-on-previous-state-from-an-effect*/}

وقتی می‌خواهید استیت را بر اساس استیت قبلی از یک افکت به‌روز کنید، ممکن است با مشکلی مواجه شوید:

```js {6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1); // You want to increment the counter every second...
    }, 1000)
    return () => clearInterval(intervalId);
  }, [count]); // 🚩 ... but specifying `count` as a dependency always resets the interval.
  // ...
}
```

از آنجا که `count` یک مقدار reactive است، باید در لیست وابستگی‌ها مشخص شود. با این حال، این باعث می‌شود افکت هر بار که `count` تغییر می‌کند، cleanup و دوباره setup شود. این ایده‌آل نیست.

برای رفع این مشکل، [state updater `c => c + 1`](/reference/react/useState#updating-state-based-on-the-previous-state) را به `setCount` ارسال کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(c => c + 1); // ✅ Pass a state updater
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); // ✅ Now count is not a dependency

  return <h1>{count}</h1>;
}
```

```css
label {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}

body {
  min-height: 150px;
}
```

</Sandpack>

اکنون که به‌جای `count + 1`، `c => c + 1` ارسال می‌کنید، [افکت شما دیگر نیازی به وابستگی به `count` ندارد.](/learn/removing-effect-dependencies#are-you-reading-some-state-to-calculate-the-next-state) در نتیجهٔ این رفع مشکل، دیگر هر بار که `count` تغییر می‌کند، نیازی به cleanup و setup مجدد interval نخواهد بود.

---


### حذف وابستگی‌های object غیرضروری {/*removing-unnecessary-object-dependencies*/}

اگر افکت شما به یک object یا تابعی که در حین رندر ایجاد شده وابسته است، ممکن است بیش از حد اجرا شود. برای مثال، این افکت پس از هر رندر مجدد اتصال برقرار می‌کند زیرا object `options` [برای هر رندر متفاوت است:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {6-9,12,15}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = { // 🚩 This object is created from scratch on every re-render
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options); // It's used inside the Effect
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```

از استفاده از یک object ایجاد شده در حین رندر به‌عنوان وابستگی اجتناب کنید. در عوض، object را داخل افکت ایجاد کنید:

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

اکنون که object `options` را داخل افکت ایجاد می‌کنید، افکت خود فقط به رشتهٔ `roomId` وابسته است.

با این رفع مشکل، تایپ در input چت را مجدداً متصل نمی‌کند. برخلاف یک object که دوباره ایجاد می‌شود، یک رشته مانند `roomId` تغییر نمی‌کند مگر اینکه آن را به مقدار دیگری تنظیم کنید. [دربارهٔ حذف وابستگی‌ها بیشتر بخوانید.](/learn/removing-effect-dependencies)

---

### حذف وابستگی‌های function غیرضروری {/*removing-unnecessary-function-dependencies*/}

اگر افکت شما به یک object یا تابعی که در حین رندر ایجاد شده وابسته است، ممکن است بیش از حد اجرا شود. برای مثال، این افکت پس از هر رندر مجدد اتصال برقرار می‌کند زیرا تابع `createOptions` [برای هر رندر متفاوت است:](/learn/removing-effect-dependencies#does-some-reactive-value-change-unintentionally)

```js {4-9,12,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() { // 🚩 This function is created from scratch on every re-render
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions(); // It's used inside the Effect
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🚩 As a result, these dependencies are always different on a re-render
  // ...
```

به‌خودی‌خود، ایجاد یک تابع از صفر در هر رندر مجدد مشکلی نیست. نیازی به بهینه‌سازی آن ندارید. با این حال، اگر از آن به‌عنوان وابستگی افکت خود استفاده کنید، باعث می‌شود افکت شما پس از هر رندر مجدد دوباره اجرا شود.

از استفاده از یک تابع ایجاد شده در حین رندر به‌عنوان وابستگی اجتناب کنید. در عوض، آن را داخل افکت اعلان کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

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

اکنون که تابع `createOptions` را داخل افکت تعریف می‌کنید، افکت خود فقط به رشتهٔ `roomId` وابسته است. با این رفع مشکل، تایپ در input چت را مجدداً متصل نمی‌کند. برخلاف یک تابع که دوباره ایجاد می‌شود، یک رشته مانند `roomId` تغییر نمی‌کند مگر اینکه آن را به مقدار دیگری تنظیم کنید. [دربارهٔ حذف وابستگی‌ها بیشتر بخوانید.](/learn/removing-effect-dependencies)

---

### خواندن آخرین پراپس و استیت از یک افکت {/*reading-the-latest-props-and-state-from-an-effect*/}

<Wip>

این بخش یک **API آزمایشی را توصیف می‌کند که هنوز در یک نسخهٔ پایدار ری‌اکت منتشر نشده است.**

</Wip>

به‌طور پیش‌فرض، وقتی یک مقدار reactive را از یک افکت می‌خوانید، باید آن را به‌عنوان وابستگی اضافه کنید. این کار تضمین می‌کند که افکت شما به هر تغییر آن مقدار "واکنش" نشان می‌دهد. برای بیشتر وابستگی‌ها، این رفتاری است که می‌خواهید.

**با این حال، گاهی اوقات می‌خواهید *آخرین* پراپس و استیت را از یک افکت بخوانید بدون "واکنش" نشان دادن به آن‌ها.** برای مثال، تصور کنید می‌خواهید تعداد آیتم‌های موجود در سبد خرید را برای هر بازدید صفحه ثبت کنید:

```js {3}
function Page({ url, shoppingCart }) {
  useEffect(() => {
    logVisit(url, shoppingCart.length);
  }, [url, shoppingCart]); // ✅ All dependencies declared
  // ...
}
```

**اگر می‌خواهید پس از هر تغییر `url` یک بازدید صفحه جدید ثبت کنید، اما *نه* اگر فقط `shoppingCart` تغییر کند چه؟** نمی‌توانید `shoppingCart` را از وابستگی‌ها حذف کنید بدون اینکه [قوانین reactivity](#specifying-reactive-dependencies) را نقض کنید. با این حال، می‌توانید بیان کنید که *نمی‌خواهید* یک قطعه کد به تغییرات "واکنش" نشان دهد حتی اگر از داخل یک افکت فراخوانی می‌شود. یک *Effect Event* با هوک [`useEffectEvent`](/reference/react/experimental_useEffectEvent) [اعلان کنید](/learn/separating-events-from-effects#declaring-an-effect-event) و کد خواندن `shoppingCart` را به داخل آن منتقل کنید:

```js {2-4,7,8}
function Page({ url, shoppingCart }) {
  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, shoppingCart.length)
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ All dependencies declared
  // ...
}
```

**Effect Event‌ها reactive نیستند و همیشه باید از وابستگی‌های افکت شما حذف شوند.** این همان چیزی است که به شما اجازه می‌دهد کد non-reactive (که در آن می‌توانید آخرین مقدار برخی پراپس و استیت‌ها را بخوانید) را داخل آن‌ها قرار دهید. با خواندن `shoppingCart` داخل `onVisit`، اطمینان حاصل می‌کنید که `shoppingCart` افکت شما را دوباره اجرا نمی‌کند.

[دربارهٔ نحوه تفکیک کد reactive و non-reactive توسط Effect Event‌ها بیشتر بخوانید.](/learn/separating-events-from-effects#reading-latest-props-and-state-with-effect-events)


---

### نمایش محتوای متفاوت روی سرور و کلاینت {/*displaying-different-content-on-the-server-and-the-client*/}

اگر اپلیکیشن شما از رندر سمت سرور استفاده می‌کند (یا [مستقیماً](/reference/react-dom/server) یا از طریق یک [فریم‌ورک](/learn/start-a-new-react-project#full-stack-frameworks))، کامپوننت شما در دو محیط متفاوت رندر می‌شود. روی سرور، برای تولید HTML اولیه رندر می‌شود. روی کلاینت، ری‌اکت کد رندر را دوباره اجرا می‌کند تا بتواند event handler‌های خود را به آن HTML متصل کند. به این دلیل، برای [کار کردن hydration](/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)، خروجی رندر اولیهٔ شما باید روی کلاینت و سرور یکسان باشد.

در موارد نادر، ممکن است نیاز داشته باشید محتوای متفاوتی روی کلاینت نمایش دهید. برای مثال، اگر اپلیکیشن شما برخی داده‌ها را از [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) می‌خواند، نمی‌تواند این کار را روی سرور انجام دهد. در اینجا نحوه پیاده‌سازی این کار آمده است:


{/* TODO(@poteto) - investigate potential false positives in react compiler validation */}
```js {expectedErrors: {'react-compiler': [5]}}
function MyComponent() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (didMount) {
    // ... return client-only JSX ...
  }  else {
    // ... return initial JSX ...
  }
}
```

در حالی که اپلیکیشن در حال بارگذاری است، کاربر خروجی رندر اولیه را خواهد دید. سپس، وقتی بارگذاری و hydrate شد، افکت شما اجرا می‌شود و `didMount` را به `true` تنظیم می‌کند، که یک رندر مجدد را trigger می‌کند. این کار به خروجی رندر فقط-کلاینت سوییچ می‌کند. افکت‌ها روی سرور اجرا نمی‌شوند، به این دلیل است که `didMount` در طول رندر اولیهٔ سرور `false` بود.

از این الگو با احتیاط استفاده کنید. در نظر داشته باشید که کاربران با اتصال کند، محتوای اولیه را برای مدت نسبتاً طولانی — به‌طور بالقوه، چندین ثانیه — خواهند دید، بنابراین نمی‌خواهید تغییرات ناگهانی به ظاهر کامپوننت خود ایجاد کنید. در بسیاری از موارد، می‌توانید با نمایش مشروط چیزهای متفاوت با CSS از نیاز به این کار اجتناب کنید.

---

## عیب‌یابی {/*troubleshooting*/}

### افکت من هنگام mount کامپوننت دو بار اجرا می‌شود {/*my-effect-runs-twice-when-the-component-mounts*/}

وقتی حالت سخت‌گیرانه (Strict Mode) فعال است، در محیط توسعه، ری‌اکت setup و cleanup را یک بار اضافی قبل از setup واقعی اجرا می‌کند.

این یک تست فشار است که تأیید می‌کند منطق افکت شما به‌درستی پیاده‌سازی شده است. اگر این باعث مشکلات قابل مشاهده می‌شود، تابع cleanup شما برخی منطق‌ها را از دست می‌دهد. تابع cleanup باید آنچه تابع setup در حال انجام آن بود را متوقف یا خنثی کند. قاعدهٔ کلی این است که کاربر نباید بتواند بین فراخوانی یک‌بارهٔ setup (مانند production) و دنبالهٔ setup → cleanup → setup (مانند development) تفاوتی قائل شود.

دربارهٔ [نحوه کمک این کار به یافتن باگ‌ها](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed) و [نحوه رفع منطق خود](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) بیشتر بخوانید.

---

### افکت من پس از هر رندر مجدد اجرا می‌شود {/*my-effect-runs-after-every-re-render*/}

ابتدا، بررسی کنید که فراموش نکرده‌اید آرایه وابستگی را مشخص کنید:

```js {3}
useEffect(() => {
  // ...
}); // 🚩 No dependency array: re-runs after every render!
```

اگر آرایه وابستگی را مشخص کرده‌اید اما افکت شما همچنان در یک حلقه دوباره اجرا می‌شود، این به این دلیل است که یکی از وابستگی‌های شما در هر رندر مجدد متفاوت است.

می‌توانید این مشکل را با log کردن دستی وابستگی‌های خود به کنسول عیب‌یابی کنید:

```js {5}
  useEffect(() => {
    // ..
  }, [serverUrl, roomId]);

  console.log([serverUrl, roomId]);
```

سپس می‌توانید روی آرایه‌های مختلف از رندرهای مجدد در کنسول راست‌کلیک کرده و "Store as a global variable" را برای هر دو انتخاب کنید. با فرض اینکه اولی به‌عنوان `temp1` و دومی به‌عنوان `temp2` ذخیره شده است، سپس می‌توانید از کنسول مرورگر برای بررسی اینکه آیا هر وابستگی در هر دو آرایه یکسان است استفاده کنید:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

وقتی وابستگی که در هر رندر مجدد متفاوت است را پیدا کردید، معمولاً می‌توانید آن را به یکی از این روش‌ها رفع کنید:

- [به‌روزرسانی استیت بر اساس استیت قبلی از یک افکت](#updating-state-based-on-previous-state-from-an-effect)
- [حذف وابستگی‌های object غیرضروری](#removing-unnecessary-object-dependencies)
- [حذف وابستگی‌های function غیرضروری](#removing-unnecessary-function-dependencies)
- [خواندن آخرین پراپس و استیت از یک افکت](#reading-the-latest-props-and-state-from-an-effect)

به‌عنوان آخرین راه‌حل (اگر این روش‌ها کمک نکردند)، ایجاد آن را با [`useMemo`](/reference/react/useMemo#memoizing-a-dependency-of-another-hook) یا [`useCallback`](/reference/react/useCallback#preventing-an-effect-from-firing-too-often) (برای توابع) بپیچید.

---

### افکت من در یک چرخهٔ بی‌نهایت به اجرای مجدد ادامه می‌دهد {/*my-effect-keeps-re-running-in-an-infinite-cycle*/}

اگر افکت شما در یک چرخهٔ بی‌نهایت اجرا می‌شود، این دو چیز باید درست باشند:

- افکت شما در حال به‌روزرسانی برخی استیت‌ها است.
- آن استیت منجر به یک رندر مجدد می‌شود، که باعث می‌شود وابستگی‌های افکت تغییر کنند.

قبل از شروع رفع مشکل، از خود بپرسید آیا افکت شما در حال اتصال به یک سیستم خارجی (مانند DOM، شبکه، یک ویجت شخص ثالث و غیره) است. چرا افکت شما نیاز به تنظیم استیت دارد؟ آیا با آن سیستم خارجی همگام می‌شود؟ یا در حال تلاش برای مدیریت جریان داده‌های اپلیکیشن خود با آن هستید؟

اگر سیستم خارجی وجود ندارد، در نظر بگیرید آیا [حذف کامل افکت](/learn/you-might-not-need-an-effect) منطق شما را ساده‌تر می‌کند.

اگر واقعاً با یک سیستم خارجی همگام می‌شوید، فکر کنید چرا و تحت چه شرایطی افکت شما باید استیت را به‌روز کند. آیا چیزی تغییر کرده که بر خروجی بصری کامپوننت شما تأثیر می‌گذارد؟ اگر نیاز به ردیابی برخی داده‌ها که توسط رندر استفاده نمی‌شوند دارید، یک [رفرنس](/reference/react/useRef#referencing-a-value-with-a-ref) (که رندر مجدد را trigger نمی‌کند) ممکن است مناسب‌تر باشد. بررسی کنید افکت شما استیت را (و رندر مجدد را trigger می‌کند) بیش از نیاز به‌روز نمی‌کند.

در نهایت، اگر افکت شما در زمان مناسب استیت را به‌روز می‌کند، اما همچنان یک حلقه وجود دارد، این به این دلیل است که به‌روزرسانی استیت منجر به تغییر یکی از وابستگی‌های افکت می‌شود. [دربارهٔ نحوه عیب‌یابی تغییرات وابستگی بخوانید.](/reference/react/useEffect#my-effect-runs-after-every-re-render)

---

### منطق cleanup من با وجود اینکه کامپوننت من unmount نشده اجرا می‌شود {/*my-cleanup-logic-runs-even-though-my-component-didnt-unmount*/}

تابع cleanup نه‌تنها در حین unmount، بلکه قبل از هر رندر مجدد با وابستگی‌های تغییر یافته اجرا می‌شود. علاوه بر این، در محیط توسعه، ری‌اکت [setup+cleanup را یک بار اضافی بلافاصله پس از mount کامپوننت اجرا می‌کند.](#my-effect-runs-twice-when-the-component-mounts)

اگر کد cleanup بدون کد setup مربوطه دارید، معمولاً این یک code smell است:

```js {2-5}
useEffect(() => {
  // 🔴 Avoid: Cleanup logic without corresponding setup logic
  return () => {
    doSomething();
  };
}, []);
```

منطق cleanup شما باید با منطق setup "متقارن" باشد و باید آنچه setup انجام داده را متوقف یا خنثی کند:

```js {2-3,5}
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
```

[ببینید چگونه چرخهٔ حیات افکت با چرخهٔ حیات کامپوننت متفاوت است.](/learn/lifecycle-of-reactive-effects#the-lifecycle-of-an-effect)

---

### افکت من کاری بصری انجام می‌دهد و قبل از اجرای آن یک flicker می‌بینم {/*my-effect-does-something-visual-and-i-see-a-flicker-before-it-runs*/}

اگر افکت شما باید مرورگر را از [paint کردن صفحه](/learn/render-and-commit#epilogue-browser-paint) منع کند، `useEffect` را با [`useLayoutEffect`](/reference/react/useLayoutEffect) جایگزین کنید. توجه داشته باشید که **این برای اکثریت قاطع افکت‌ها نباید لازم باشد.** فقط زمانی به این نیاز دارید که اجرای افکت شما قبل از paint مرورگر حیاتی است: برای مثال، برای اندازه‌گیری و موقعیت‌دهی یک tooltip قبل از اینکه کاربر آن را ببیند.
