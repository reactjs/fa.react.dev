---
title: 'چرخهٔ حیات افکت‌های واکنشی'
---

<Intro>

افکت‌ها چرخهٔ حیات متفاوتی نسبت به کامپوننت‌ها دارند. کامپوننت‌ها ممکن است مانت (mount) شوند، به‌روز شوند یا آنمانت (unmount) شوند. یک افکت تنها می‌تواند دو کار انجام دهد: شروع به همگام‌سازی چیزی کند، و سپس بعداً همگام‌سازی را متوقف کند. این چرخه می‌تواند چندین بار اتفاق بیفتد اگر افکت شما به پراپس و استیت‌ای که در طول زمان تغییر می‌کنند وابسته باشد. ری‌اکت یک قانون لینتر فراهم می‌کند تا بررسی کند که وابستگی‌های افکتتان را به‌درستی مشخص کرده‌اید. این کار باعث می‌شود افکت شما با آخرین پراپس و استیت همگام بماند.

</Intro>

<YouWillLearn>

- چرخهٔ حیات یک افکت چگونه با چرخهٔ حیات یک کامپوننت متفاوت است
- چگونه دربارهٔ هر افکت به‌طور جداگانه و مستقل فکر کنید
- چه زمانی افکت شما نیاز به همگام‌سازی مجدد دارد، و چرا
- وابستگی‌های افکت شما چگونه تعیین می‌شوند
- واکنشی (reactive) بودن یک مقدار به چه معناست
- آرایهٔ وابستگیِ خالی به چه معناست
- چگونه ری‌اکت با یک لینتر تأیید می‌کند که وابستگی‌هایتان درست هستند
- وقتی با لینتر موافق نیستید چه کاری باید انجام دهید

</YouWillLearn>

## چرخهٔ حیات یک افکت {/*the-lifecycle-of-an-effect*/}

هر کامپوننت ری‌اکت از همان چرخهٔ حیات می‌گذرد:

- یک کامپوننت زمانی که به صفحه اضافه می‌شود _مانت_ می‌شود.
- یک کامپوننت زمانی که پراپس یا استیت جدیدی دریافت می‌کند، _به‌روز_ می‌شود، معمولاً در پاسخ به یک تعامل.
- یک کامپوننت زمانی که از صفحه حذف می‌شود _آنمانت_ می‌شود.

**این راه خوبی برای فکر کردن دربارهٔ کامپوننت‌هاست، اما درباره افکت‌ها _این‌طور نیست_.** در عوض، سعی کنید دربارهٔ هر افکت به‌صورت مستقل از چرخهٔ حیات کامپوننتتان فکر کنید. یک افکت توصیف می‌کند که چگونه یک [سیستم خارجی را همگام کنید](/learn/synchronizing-with-effects) با پراپس و استیت کنونی. هر کد تغییر می‌کند، همگام‌سازی باید کمتر یا بیشتر اتفاق بیفتد.

برای روشن کردن این نکته، به این افکت که کامپوننت شما را به یک سرور چت متصل می‌کند توجه کنید:

```js
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
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

بدنهٔ افکت شما مشخص می‌کند چگونه **شروع به همگام‌سازی کنید:**

```js {2-3}
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
```

تابع پاک‌سازی‌ای که افکت شما برمی‌گرداند مشخص می‌کند چگونه **همگام‌سازی را متوقف کنید:**

```js {5}
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
    // ...
```

به‌طور شهودی، ممکن است فکر کنید ری‌اکت زمانی که کامپوننت مانت می‌شود **شروع به همگام‌سازی می‌کند** و زمانی که کامپوننت آنمانت می‌شود **همگام‌سازی را متوقف می‌کند**. اما این همهٔ ماجرا نیست! گاهی، ممکن است لازم باشد **همگام‌سازی را چندین بار شروع و متوقف کنید** در حالی که کامپوننت همچنان مانت باقی مانده است.

ببینید _چرا_ این کار لازم است، _چه زمانی_ اتفاق می‌افتد، و _چگونه_ می‌توانید این رفتار را کنترل کنید.

<Note>

برخی افکت‌ها اصلاً تابع پاک‌سازی برنمی‌گردانند. [بیشتر اوقات،](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development) می‌خواهید یکی را برگردانید — اما اگر برنگردانید، ری‌اکت طوری رفتار می‌کند که گویی یک تابع پاک‌سازی خالی برگردانده‌اید.

</Note>

### چرا همگام‌سازی ممکن است بیش از یک بار لازم باشد {/*why-synchronization-may-need-to-happen-more-than-once*/}

تصور کنید این کامپوننت `ChatRoom` یک پراپ `roomId` دریافت می‌کند که کاربر آن را در یک منوی کشویی انتخاب می‌کند. فرض کنید در ابتدا کاربر اتاق `"general"` را به‌عنوان `roomId` انتخاب می‌کند. اپلیکیشن شما اتاق چت `"general"` را نمایش می‌دهد:

```js {3}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* "general" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```

پس از نمایش رابط کاربری، ری‌اکت افکت شما را اجرا می‌کند تا **شروع به همگام‌سازی کند.** این افکت به اتاق `"general"` متصل می‌شود:

```js {3,4}
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "general" room
    connection.connect();
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
  }, [roomId]);
  // ...
```

تا اینجا همه‌چیز خوب است.

بعداً، کاربر یک اتاق متفاوت در منوی کشویی انتخاب می‌کند (مثلاً `"travel"`). ابتدا، ری‌اکت رابط کاربری را به‌روز می‌کند:

```js {1}
function ChatRoom({ roomId /* "travel" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```

فکر کنید چه اتفاقی باید بعد بیفتد. کاربر می‌بیند که `"travel"` اتاق چت انتخاب‌شده در رابط کاربری است. اما افکتی که بار آخر اجرا شده همچنان به اتاق `"general"` متصل است. **پراپ `roomId` تغییر کرده، بنابراین کاری که افکت قبلاً انجام داده (اتصال به اتاق `"general"`) دیگر با رابط کاربری تطابق ندارد.**

در این نقطه، می‌خواهید ری‌اکت دو کار انجام دهد:

1. همگام‌سازی با `roomId` قدیمی را متوقف کند (قطع اتصال از اتاق `"general"`)
2. همگام‌سازی با `roomId` جدید را شروع کند (اتصال به اتاق `"travel"`)

**خوشبختانه، شما قبلاً به ری‌اکت یاد داده‌اید چگونه هر دوی این کارها را انجام دهد!** بدنهٔ افکت شما مشخص می‌کند چگونه شروع به همگام‌سازی کنید، و تابع پاک‌سازی شما مشخص می‌کند چگونه همگام‌سازی را متوقف کنید. تنها کاری که ری‌اکت اکنون باید بکند این است که آن‌ها را به‌ترتیب درست و با پراپس و استیت درست فراخوانی کند. ببینیم دقیقاً چگونه این اتفاق می‌افتد.

### چگونه ری‌اکت افکت شما را مجدداً همگام می‌کند {/*how-react-re-synchronizes-your-effect*/}

به یاد بیاورید که کامپوننت `ChatRoom` شما مقدار جدیدی برای پراپ `roomId` خود دریافت کرده است. قبلاً `"general"` بود، و اکنون `"travel"` است. ری‌اکت باید افکت شما را مجدداً همگام کند تا شما را به یک اتاق متفاوت متصل کند.

برای **متوقف کردن همگام‌سازی،** ری‌اکت تابع پاک‌سازی‌ای را که افکت شما بعد از اتصال به اتاق `"general"` برگردانده فراخوانی می‌کند. از آنجا که `roomId` برابر `"general"` بود، تابع پاک‌سازی از اتاق `"general"` قطع اتصال می‌کند:

```js {6}
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "general" room
    connection.connect();
    return () => {
      connection.disconnect(); // Disconnects from the "general" room
    };
    // ...
```

سپس ری‌اکت افکتی را که در طول این رندر ارائه کرده‌اید اجرا می‌کند. این بار، `roomId` برابر `"travel"` است، پس **شروع به همگام‌سازی** با اتاق چت `"travel"` می‌کند (تا زمانی که تابع پاک‌سازی آن نیز در نهایت فراخوانی شود):

```js {3,4}
function ChatRoom({ roomId /* "travel" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Connects to the "travel" room
    connection.connect();
    // ...
```

به‌لطف این، اکنون به همان اتاقی متصل هستید که کاربر در رابط کاربری انتخاب کرده است. فاجعه دفع شد!

هر بار بعد از اینکه کامپوننت شما با `roomId` متفاوتی مجدداً رندر می‌شود، افکت شما مجدداً همگام می‌شود. مثلاً، فرض کنید کاربر `roomId` را از `"travel"` به `"music"` تغییر می‌دهد. ری‌اکت دوباره با فراخوانی تابع پاک‌سازی افکت **همگام‌سازی افکت شما را متوقف می‌کند** (قطع اتصال شما از اتاق `"travel"`). سپس با اجرای بدنهٔ آن با پراپ `roomId` جدید، دوباره **شروع به همگام‌سازی می‌کند** (اتصال شما به اتاق `"music"`).

در نهایت، وقتی کاربر به یک صفحهٔ متفاوت می‌رود، `ChatRoom` آنمانت می‌شود. حالا اصلاً نیازی نیست متصل بمانید. ری‌اکت برای آخرین بار **همگام‌سازی افکت شما را متوقف می‌کند** و شما را از اتاق چت `"music"` قطع می‌کند.

### فکر کردن از منظر افکت {/*thinking-from-the-effects-perspective*/}

بیایید همهٔ آنچه از منظر کامپوننت `ChatRoom` اتفاق افتاده را مرور کنیم:

1. `ChatRoom` با `roomId` تنظیم‌شده به `"general"` مانت شد
1. `ChatRoom` با `roomId` تنظیم‌شده به `"travel"` به‌روز شد
1. `ChatRoom` با `roomId` تنظیم‌شده به `"music"` به‌روز شد
1. `ChatRoom` آنمانت شد

در طول هر یک از این نقاط در چرخهٔ حیات کامپوننت، افکت شما کارهای متفاوتی انجام داد:

1. افکت شما به اتاق `"general"` متصل شد
1. افکت شما از اتاق `"general"` قطع اتصال کرد و به اتاق `"travel"` متصل شد
1. افکت شما از اتاق `"travel"` قطع اتصال کرد و به اتاق `"music"` متصل شد
1. افکت شما از اتاق `"music"` قطع اتصال کرد

حالا بیایید فکر کنیم چه اتفاقی از منظر خود افکت افتاده است:

```js
  useEffect(() => {
    // Your Effect connected to the room specified with roomId...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      // ...until it disconnected
      connection.disconnect();
    };
  }, [roomId]);
```

ساختار این کد ممکن است شما را ترغیب کند تا آنچه رخ داده را به‌صورت توالیِ دوره‌های زمانیِ غیرهم‌پوشان ببینید:

1. افکت شما به اتاق `"general"` متصل شد (تا زمانی که قطع اتصال کرد)
1. افکت شما به اتاق `"travel"` متصل شد (تا زمانی که قطع اتصال کرد)
1. افکت شما به اتاق `"music"` متصل شد (تا زمانی که قطع اتصال کرد)

قبلاً، از منظر کامپوننت فکر می‌کردید. وقتی از منظر کامپوننت نگاه می‌کردید، وسوسه‌انگیز بود که افکت‌ها را به‌عنوان «کالبک‌ها» یا «رویدادهای چرخهٔ حیات» بدانید که در یک زمان خاص، مثل «بعد از یک رندر» یا «قبل از آنمانت» اجرا می‌شوند. این روش تفکر خیلی سریع پیچیده می‌شود، بنابراین بهتر است از آن اجتناب کنید.

**در عوض، همیشه روی یک چرخهٔ شروع/تک‌تک در یک زمان تمرکز کنید. نباید مهم باشد که یک کامپوننت در حال مانت شدن، به‌روز شدن، یا آنمانت شدن است. تنها کاری که باید بکنید این است که توصیف کنید چگونه همگام‌سازی را شروع کنید و چگونه آن را متوقف کنید. اگر این کار را خوب انجام دهید، افکت شما در برابر شروع و توقف به هر تعداد بار که لازم است مقاوم خواهد بود.**

این ممکن است شما را یاد این بیندازد که وقتی منطق رندری را که JSX ایجاد می‌کند می‌نویسید، فکر نمی‌کنید که آیا کامپوننت در حال مانت یا به‌روز شدن است. شما توصیف می‌کنید چه چیزی باید روی صفحه باشد، و ری‌اکت [بقیه را تشخیص می‌دهد.](/learn/reacting-to-input-with-state)

### چگونه ری‌اکت تأیید می‌کند که افکت شما می‌تواند مجدداً همگام شود {/*how-react-verifies-that-your-effect-can-re-synchronize*/}

در اینجا یک مثال زنده است که می‌توانید با آن کار کنید. دکمهٔ «Open chat» را بزنید تا کامپوننت `ChatRoom` مانت شود:

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

توجه کنید وقتی کامپوننت برای بار اول مانت می‌شود، سه لاگ می‌بینید:

1. `✅ Connecting to "general" room at https://localhost:1234...` *(فقط در محیط توسعه)*
1. `❌ Disconnected from "general" room at https://localhost:1234.` *(فقط در محیط توسعه)*
1. `✅ Connecting to "general" room at https://localhost:1234...`

دو لاگ اول فقط در محیط توسعه هستند. در محیط توسعه، ری‌اکت همیشه هر کامپوننت را یک بار مجدداً مانت می‌کند.

**ری‌اکت با اجبار افکت به انجام این کار بلافاصله در محیط توسعه، تأیید می‌کند که افکت شما می‌تواند مجدداً همگام شود.** این ممکن است شما را یاد این بیندازد که یک در را یک بار اضافه باز و بسته می‌کنید تا بررسی کنید قفل در کار می‌کند. ری‌اکت در محیط توسعه یک بار اضافه افکت شما را شروع و متوقف می‌کند تا بررسی کند [تابع پاک‌سازی آن را به‌خوبی پیاده‌سازی کرده‌اید.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

دلیل اصلی اینکه افکت شما در عمل مجدداً همگام می‌شود این است که برخی داده‌هایی که استفاده می‌کند تغییر کرده‌اند. در سندباکس بالا، اتاق چت انتخاب‌شده را تغییر دهید. توجه کنید که وقتی `roomId` تغییر می‌کند، افکت شما چگونه مجدداً همگام می‌شود.

با این حال، موارد غیرعادی‌تری هم وجود دارد که در آن‌ها همگام‌سازی مجدد لازم است. مثلاً، در سندباکس بالا `serverUrl` را در حالی که چت باز است ویرایش کنید. توجه کنید افکت چگونه در پاسخ به ویرایش‌های شما در کد مجدداً همگام می‌شود. در آینده، ری‌اکت ممکن است ویژگی‌های بیشتری اضافه کند که به همگام‌سازی مجدد وابسته هستند.

### چگونه ری‌اکت می‌فهمد که باید افکت را مجدداً همگام کند {/*how-react-knows-that-it-needs-to-re-synchronize-the-effect*/}

ممکن است تعجب کنید چگونه ری‌اکت فهمید که افکت شما پس از تغییر `roomId` نیاز به همگام‌سازی مجدد دارد. این به‌دلیل آن است که *شما به ری‌اکت گفته‌اید* که کد آن به `roomId` وابسته است، با قرار دادن آن در [فهرست وابستگی‌ها:](/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies)

```js {1,3,8}
function ChatRoom({ roomId }) { // The roomId prop may change over time
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads roomId 
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]); // So you tell React that this Effect "depends on" roomId
  // ...
```

نحوهٔ کار این‌طور است:

1. شما می‌دانستید `roomId` یک پراپ است، یعنی می‌تواند در طول زمان تغییر کند.
2. شما می‌دانستید که افکت شما `roomId` را می‌خواند (بنابراین منطق آن به مقداری وابسته است که بعداً ممکن است تغییر کند).
3. به همین دلیل آن را به‌عنوان وابستگی افکت خود مشخص کردید (تا وقتی `roomId` تغییر می‌کند، مجدداً همگام شود).

هر بار بعد از اینکه کامپوننت شما مجدداً رندر می‌شود، ری‌اکت به آرایهٔ وابستگی‌هایی که ارسال کرده‌اید نگاه می‌کند. اگر هر یک از مقادیر در آرایه با مقدار در همان مکان در رندر قبلی متفاوت باشد، ری‌اکت افکت شما را مجدداً همگام می‌کند.

مثلاً، اگر در طول رندر اول `["general"]` ارسال کرده باشید، و بعد در طول رندر بعدی `["travel"]` ارسال کنید، ری‌اکت `"general"` و `"travel"` را مقایسه می‌کند. این‌ها مقادیر متفاوتی هستند (با [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌شوند)، بنابراین ری‌اکت افکت شما را مجدداً همگام می‌کند. از طرف دیگر، اگر کامپوننت شما مجدداً رندر شود اما `roomId` تغییر نکرده باشد، افکت شما به همان اتاق متصل باقی می‌ماند.

### هر افکت یک فرآیند همگام‌سازی مجزا را نمایندگی می‌کند {/*each-effect-represents-a-separate-synchronization-process*/}

مقاومت کنید در برابر اضافه کردن منطق نامرتبط به افکتتان صرفاً به این دلیل که این منطق باید هم‌زمان با افکتی که قبلاً نوشته‌اید اجرا شود. مثلاً، فرض کنید می‌خواهید یک رویداد تحلیلی (analytics) را وقتی کاربر از اتاق بازدید می‌کند ارسال کنید. شما از قبل افکتی دارید که به `roomId` وابسته است، پس ممکن است وسوسه شوید که فراخوانی تحلیلی را آنجا اضافه کنید:

```js {3}
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```

اما تصور کنید بعداً یک وابستگی دیگر به این افکت اضافه می‌کنید که نیاز به برقراری مجدد اتصال دارد. اگر این افکت مجدداً همگام شود، برای همان اتاق `logVisit(roomId)` را هم فراخوانی می‌کند، که این را نخواسته بودید. ثبت بازدید **یک فرآیند مجزا** از اتصال است. آن‌ها را به‌عنوان دو افکت مجزا بنویسید:

```js {2-4}
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    // ...
  }, [roomId]);
  // ...
}
```

**هر افکت در کد شما باید یک فرآیند همگام‌سازی مجزا و مستقل را نمایندگی کند.**

در مثال بالا، حذف کردن یک افکت منطق افکت دیگر را خراب نمی‌کرد. این نشان خوبی است که آن‌ها چیزهای متفاوتی را همگام می‌کنند، و بنابراین جدا کردنشان معنا داشت. از طرف دیگر، اگر یک منطق منسجم را به افکت‌های مجزا تقسیم کنید، کد ممکن است «تمیزتر» به‌نظر برسد اما [سخت‌تر برای نگهداری](/learn/you-might-not-need-an-effect#chains-of-computations) خواهد بود. به همین دلیل باید فکر کنید که آیا فرآیندها یکسان یا مجزا هستند، نه اینکه آیا کد تمیزتر به‌نظر می‌رسد.

## افکت‌ها به مقادیر واکنشی «واکنش» نشان می‌دهند {/*effects-react-to-reactive-values*/}

افکت شما دو متغیر (`serverUrl` و `roomId`) را می‌خواند، اما فقط `roomId` را به‌عنوان وابستگی مشخص کرده‌اید:

```js {5,10}
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
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

چرا `serverUrl` لازم نیست وابستگی باشد؟

این به‌دلیل آن است که `serverUrl` هرگز به‌دلیل یک رندر مجدد تغییر نمی‌کند. مهم نیست کامپوننت چند بار و چرا مجدداً رندر می‌شود، همیشه همان است. از آنجا که `serverUrl` هرگز تغییر نمی‌کند، مشخص کردن آن به‌عنوان وابستگی بی‌معناست. بعد از همه، وابستگی‌ها فقط وقتی کاری انجام می‌دهند که در طول زمان تغییر کنند!

از طرف دیگر، `roomId` ممکن است در یک رندر مجدد متفاوت باشد. **پراپس، استیت، و سایر مقادیر اعلام‌شده داخل کامپوننت _واکنشی_ هستند زیرا در طول رندر محاسبه می‌شوند و در جریان دادهٔ ری‌اکت مشارکت دارند.**

اگر `serverUrl` یک متغیر استیت بود، واکنشی می‌بود. مقادیر واکنشی باید در وابستگی‌ها گنجانده شوند:

```js {2,5,10}
function ChatRoom({ roomId }) { // Props change over time
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // State may change over time

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Your Effect reads props and state
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // So you tell React that this Effect "depends on" on props and state
  // ...
}
```

با گنجاندن `serverUrl` به‌عنوان وابستگی، اطمینان حاصل می‌کنید که افکت پس از تغییر آن مجدداً همگام می‌شود.

در این سندباکس، اتاق چت انتخاب‌شده را تغییر دهید یا URL سرور را ویرایش کنید:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
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

هر بار که یک مقدار واکنشی مثل `roomId` یا `serverUrl` را تغییر می‌دهید، افکت مجدداً به سرور چت متصل می‌شود.

### افکت با وابستگی‌های خالی به چه معناست {/*what-an-effect-with-empty-dependencies-means*/}

اگر هم `serverUrl` و هم `roomId` را به‌بیرون از کامپوننت منتقل کنید چه اتفاقی می‌افتد؟

```js {1,2}
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```

حالا کد افکت شما از *هیچ* مقدار واکنشی استفاده نمی‌کند، بنابراین وابستگی‌هایش می‌توانند خالی باشند (`[]`).

اگر از منظر کامپوننت فکر کنید، آرایهٔ وابستگی خالی `[]` به این معناست که این افکت فقط وقتی کامپوننت مانت می‌شود به اتاق چت متصل می‌شود، و فقط وقتی کامپوننت آنمانت می‌شود قطع اتصال می‌کند. (در نظر داشته باشید که ری‌اکت در محیط توسعه همچنان [آن را یک بار اضافه مجدداً همگام](#how-react-verifies-that-your-effect-can-re-synchronize) می‌کند تا منطق شما را تست استرس کند.)


<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []);
  return <h1>Welcome to the {roomId} room!</h1>;
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

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

با این حال، اگر [از منظر افکت فکر کنید،](#thinking-from-the-effects-perspective) اصلاً نیازی نیست دربارهٔ مانت و آنمانت شدن فکر کنید. آنچه مهم است این است که مشخص کرده‌اید افکتتان برای شروع و توقف همگام‌سازی چه می‌کند. امروز، هیچ وابستگی واکنشی ندارد. اما اگر تا به حال بخواهید کاربر در طول زمان `roomId` یا `serverUrl` را تغییر دهد (و آن‌ها واکنشی شوند)، کد افکت شما تغییر نخواهد کرد. فقط باید آن‌ها را به وابستگی‌ها اضافه کنید.

### تمام متغیرهای اعلام‌شده در بدنهٔ کامپوننت واکنشی هستند {/*all-variables-declared-in-the-component-body-are-reactive*/}

پراپس و استیت تنها مقادیر واکنشی نیستند. مقادیری که از آن‌ها محاسبه می‌کنید هم واکنشی هستند. اگر پراپس یا استیت تغییر کند، کامپوننت شما مجدداً رندر می‌شود، و مقادیری که از آن‌ها محاسبه شده‌اند هم تغییر می‌کنند. به همین دلیل است که تمام متغیرهای بدنهٔ کامپوننت که توسط افکت استفاده می‌شوند باید در فهرست وابستگی‌های افکت باشند.

فرض کنید کاربر می‌تواند سرور چت را در منوی کشویی انتخاب کند، اما همچنین می‌تواند یک سرور پیش‌فرض را در تنظیمات پیکربندی کند. فرض کنید شما استیت تنظیمات را در یک [کانتکست](/learn/scaling-up-with-reducer-and-context) قرار داده‌اید، پس `settings` را از آن کانتکست می‌خوانید. حالا `serverUrl` را بر اساس سرور انتخاب‌شده از پراپس و سرور پیش‌فرض محاسبه می‌کنید:

```js {3,5,10}
function ChatRoom({ roomId, selectedServerUrl }) { // roomId is reactive
  const settings = useContext(SettingsContext); // settings is reactive
  const serverUrl = selectedServerUrl ?? settings.defaultServerUrl; // serverUrl is reactive
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // Your Effect reads roomId and serverUrl
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // So it needs to re-synchronize when either of them changes!
  // ...
}
```

در این مثال، `serverUrl` نه یک پراپ است نه یک متغیر استیت. یک متغیر معمولی است که در طول رندر محاسبه می‌کنید. اما چون در طول رندر محاسبه می‌شود، می‌تواند به‌دلیل یک رندر مجدد تغییر کند. به همین دلیل است که واکنشی است.

**تمام مقادیر داخل کامپوننت (از جمله پراپس، استیت، و متغیرهای بدنهٔ کامپوننت) واکنشی هستند. هر مقدار واکنشی می‌تواند در یک رندر مجدد تغییر کند، بنابراین باید مقادیر واکنشی را به‌عنوان وابستگی‌های افکت وارد کنید.**

به‌عبارت دیگر، افکت‌ها به تمام مقادیر از بدنهٔ کامپوننت «واکنش» نشان می‌دهند.

<DeepDive>

#### آیا مقادیر سراسری یا قابل‌تغییر می‌توانند وابستگی باشند؟ {/*can-global-or-mutable-values-be-dependencies*/}

مقادیر قابل‌تغییر (از جمله متغیرهای سراسری) واکنشی نیستند.

**یک مقدار قابل‌تغییر مثل [`location.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) نمی‌تواند وابستگی باشد.** این مقدار قابل‌تغییر است، پس می‌تواند در هر زمانی کاملاً خارج از جریان دادهٔ رندر ری‌اکت تغییر کند. تغییر آن باعث رندر مجدد کامپوننت شما نمی‌شود. بنابراین، حتی اگر آن را در وابستگی‌ها مشخص کنید، ری‌اکت *نمی‌فهمد* که باید افکت را وقتی تغییر می‌کند مجدداً همگام کند. این همچنین قوانین ری‌اکت را نقض می‌کند زیرا خواندن داده‌های قابل‌تغییر در طول رندر (که زمان محاسبهٔ وابستگی‌هاست) [خالص بودن رندر را](/learn/keeping-components-pure) نقض می‌کند. در عوض، باید یک مقدار قابل‌تغییر خارجی را با [`useSyncExternalStore`](/learn/you-might-not-need-an-effect#subscribing-to-an-external-store) بخوانید و در آن مشترک شوید.

**یک مقدار قابل‌تغییر مثل [`ref.current`](/reference/react/useRef#reference) یا چیزهایی که از آن می‌خوانید هم نمی‌توانند وابستگی باشند.** شیء رفرنس برگردانده‌شده توسط خود `useRef` می‌تواند وابستگی باشد، اما ویژگی `current` آن عمداً قابل‌تغییر است. این به شما اجازه می‌دهد [بدون ایجاد رندر مجدد چیزی را پیگیری کنید.](/learn/referencing-values-with-refs) اما چون تغییر آن باعث رندر مجدد نمی‌شود، یک مقدار واکنشی نیست، و ری‌اکت نمی‌فهمد که باید افکت شما را وقتی تغییر می‌کند مجدداً اجرا کند.

همان‌طور که در ادامهٔ این صفحه خواهید آموخت، یک لینتر به‌طور خودکار این مشکلات را بررسی می‌کند.

</DeepDive>

### ری‌اکت تأیید می‌کند که هر مقدار واکنشی را به‌عنوان وابستگی مشخص کرده‌اید {/*react-verifies-that-you-specified-every-reactive-value-as-a-dependency*/}

اگر لینتر شما [برای ری‌اکت پیکربندی شده باشد،](/learn/editor-setup#linting) بررسی می‌کند که هر مقدار واکنشی که توسط کد افکت شما استفاده می‌شود به‌عنوان وابستگی آن اعلام شده باشد. مثلاً، این یک خطای لینت است زیرا هم `roomId` و هم `serverUrl` واکنشی هستند:

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) { // roomId is reactive
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // serverUrl is reactive

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- Something's wrong here!

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

این ممکن است شبیه یک خطای ری‌اکت به‌نظر برسد، اما در واقع ری‌اکت به یک باگ در کد شما اشاره می‌کند. هم `roomId` و هم `serverUrl` ممکن است در طول زمان تغییر کنند، اما شما فراموش می‌کنید افکت خود را وقتی تغییر می‌کنند مجدداً همگام کنید. شما حتی پس از اینکه کاربر مقادیر متفاوتی در رابط کاربری انتخاب می‌کند، به `roomId` و `serverUrl` اولیه متصل باقی می‌مانید.

برای رفع باگ، پیشنهاد لینتر را دنبال کنید و `roomId` و `serverUrl` را به‌عنوان وابستگی‌های افکت خود مشخص کنید:

```js {9}
function ChatRoom({ roomId }) { // roomId is reactive
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // serverUrl is reactive
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]); // ✅ All dependencies declared
  // ...
}
```

این رفع را در سندباکس بالا امتحان کنید. تأیید کنید که خطای لینتر از بین رفته، و چت وقتی لازم است مجدداً متصل می‌شود.

<Note>

در برخی موارد، ری‌اکت *می‌داند* که یک مقدار هرگز تغییر نمی‌کند حتی اگر داخل کامپوننت اعلام شده باشد. مثلاً، [تابع `set`](/reference/react/useState#setstate) برگردانده‌شده از `useState` و شیء رفرنس برگردانده‌شده توسط [`useRef`](/reference/react/useRef) *پایدار* هستند — تضمین شده که در یک رندر مجدد تغییر نمی‌کنند. مقادیر پایدار واکنشی نیستند، پس می‌توانید آن‌ها را از فهرست حذف کنید. گنجاندن آن‌ها مجاز است: آن‌ها تغییر نمی‌کنند، پس فرقی نمی‌کند.

</Note>

### وقتی نمی‌خواهید مجدداً همگام کنید چه کنید {/*what-to-do-when-you-dont-want-to-re-synchronize*/}

در مثال قبلی، خطای لینت را با فهرست کردن `roomId` و `serverUrl` به‌عنوان وابستگی رفع کردید.

**با این حال، می‌توانید در عوض به لینتر «ثابت کنید» که این مقادیر مقادیر واکنشی نیستند،** یعنی *نمی‌توانند* در نتیجهٔ یک رندر مجدد تغییر کنند. مثلاً، اگر `serverUrl` و `roomId` به رندر وابسته نیستند و همیشه مقادیر یکسانی دارند، می‌توانید آن‌ها را به‌بیرون از کامپوننت منتقل کنید. حالا نیازی ندارند وابستگی باشند:

```js {1,2,11}
const serverUrl = 'https://localhost:1234'; // serverUrl is not reactive
const roomId = 'general'; // roomId is not reactive

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```

همچنین می‌توانید آن‌ها را *داخل افکت* منتقل کنید. آن‌ها در طول رندر محاسبه نمی‌شوند، پس واکنشی نیستند:

```js {3,4,10}
function ChatRoom() {
  useEffect(() => {
    const serverUrl = 'https://localhost:1234'; // serverUrl is not reactive
    const roomId = 'general'; // roomId is not reactive
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ All dependencies declared
  // ...
}
```

**افکت‌ها بلوک‌های کد واکنشی هستند.** وقتی مقادیری که داخل آن‌ها می‌خوانید تغییر می‌کنند، مجدداً همگام می‌شوند. برخلاف مدیریت‌کننده‌های رویداد که فقط یک بار در هر تعامل اجرا می‌شوند، افکت‌ها هر بار که همگام‌سازی لازم است اجرا می‌شوند.

**شما نمی‌توانید وابستگی‌هایتان را «انتخاب» کنید.** وابستگی‌هایتان باید هر [مقدار واکنشی](#all-variables-declared-in-the-component-body-are-reactive) که در افکت می‌خوانید را شامل شوند. لینتر این را اجرا می‌کند. گاهی این ممکن است به مشکلاتی مثل حلقه‌های بی‌نهایت و همگام‌سازی بیش از حد افکت منجر شود. این مشکلات را با سرکوب لینتر رفع نکنید! در عوض، این کارها را امتحان کنید:

* **بررسی کنید که افکت شما یک فرآیند همگام‌سازی مستقل را نمایندگی می‌کند.** اگر افکت شما چیزی را همگام نمی‌کند، [ممکن است غیرضروری باشد.](/learn/you-might-not-need-an-effect) اگر چند چیز مستقل را همگام می‌کند، [آن را تقسیم کنید.](#each-effect-represents-a-separate-synchronization-process)

* **اگر می‌خواهید آخرین مقدار پراپس یا استیت را بدون «واکنش» به آن و همگام‌سازی مجدد افکت بخوانید،** می‌توانید افکت خود را به یک بخش واکنشی (که در افکت نگه می‌دارید) و یک بخش غیرواکنشی (که به چیزی به نام _Effect Event_ استخراج می‌کنید) تقسیم کنید. [دربارهٔ جدا کردن رویدادها از افکت‌ها بخوانید.](/learn/separating-events-from-effects)

* **از تکیه بر اشیاء و توابع به‌عنوان وابستگی اجتناب کنید.** اگر اشیاء و توابع را در طول رندر ایجاد می‌کنید و سپس از یک افکت می‌خوانید، در هر رندر متفاوت خواهند بود. این باعث می‌شود افکت شما هر بار مجدداً همگام شود. [دربارهٔ حذف وابستگی‌های غیرضروری از افکت‌ها بیشتر بخوانید.](/learn/removing-effect-dependencies)

<Pitfall>

لینتر دوست شماست، اما قدرت‌هایش محدود است. لینتر فقط می‌داند چه زمانی وابستگی‌ها *اشتباه* هستند. او *بهترین* راه را برای حل هر مورد نمی‌داند. اگر لینتر یک وابستگی پیشنهاد می‌کند، اما اضافه کردن آن یک حلقه ایجاد می‌کند، این به این معنا نیست که باید لینتر را نادیده گرفت. باید کد داخل (یا خارج) افکت را تغییر دهید تا آن مقدار واکنشی نباشد و *نیازی* به وابستگی نباشد.

اگر یک کدبیس موجود دارید، ممکن است برخی افکت‌هایی داشته باشید که لینتر را به این شکل سرکوب می‌کنند:

```js {3-4}
useEffect(() => {
  // ...
  // 🔴 Avoid suppressing the linter like this:
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, []);
```

در [صفحات](/learn/separating-events-from-effects) [بعدی](/learn/removing-effect-dependencies)، خواهید آموخت چگونه این کد را بدون نقض قوانین رفع کنید. همیشه ارزش رفع کردن دارد!

</Pitfall>

<Recap>

- کامپوننت‌ها می‌توانند مانت، به‌روز، و آنمانت شوند.
- هر افکت چرخهٔ حیات مجزایی از کامپوننت اطرافش دارد.
- هر افکت یک فرآیند همگام‌سازی مجزا را توصیف می‌کند که می‌تواند *شروع* و *توقف* شود.
- وقتی افکت‌ها را می‌نویسید و می‌خوانید، از منظر هر افکت مجزا فکر کنید (چگونه همگام‌سازی را شروع و متوقف کنید) تا از منظر کامپوننت (چگونه مانت، به‌روز، یا آنمانت می‌شود).
- مقادیر اعلام‌شده داخل بدنهٔ کامپوننت «واکنشی» هستند.
- مقادیر واکنشی باید افکت را مجدداً همگام کنند زیرا می‌توانند در طول زمان تغییر کنند.
- لینتر تأیید می‌کند که تمام مقادیر واکنشی استفاده‌شده داخل افکت به‌عنوان وابستگی مشخص شده‌اند.
- تمام خطاهای اعلام‌شده توسط لینتر قانونی هستند. همیشه راهی برای رفع کد بدون نقض قوانین وجود دارد.

</Recap>

<Challenges>

#### رفع اتصال مجدد در هر فشردۀ کلید {/*fix-reconnecting-on-every-keystroke*/}

در این مثال، کامپوننت `ChatRoom` وقتی کامپوننت مانت می‌شود به اتاق چت متصل می‌شود، وقتی آنمانت می‌شود قطع اتصال می‌کند، و وقتی اتاق چت متفاوتی انتخاب می‌کنید مجدداً متصل می‌شود. این رفتار درست است، پس باید آن را به کار وارده نگه دارید.

با این حال، یک مشکل وجود دارد. هر بار که در ورودی جعبهٔ پیام در پایین تایپ می‌کنید، `ChatRoom` *همچنین* مجدداً به چت متصل می‌شود. (می‌توانید این را با پاک کردن کنسول و تایپ در ورودی متوجه شوید.) مشکل را رفع کنید تا این اتفاق نیفتد.

<Hint>

ممکن است لازم باشد یک آرایهٔ وابستگی برای این افکت اضافه کنید. چه وابستگی‌هایی باید آنجا باشند؟

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  });

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
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

<Solution>

این افکت اصلاً آرایهٔ وابستگی نداشت، پس بعد از هر رندر مجدد، مجدداً همگام می‌شد. ابتدا، یک آرایهٔ وابستگی اضافه کنید. سپس، مطمئن شوید که هر مقدار واکنشی استفاده‌شده توسط افکت در آرایه مشخص شده است. مثلاً، `roomId` واکنشی است (زیرا یک پراپ است)، پس باید در آرایه گنجانده شود. این تضمین می‌کند که وقتی کاربر اتاق متفاوتی انتخاب می‌کند، چت مجدداً متصل می‌شود. از طرف دیگر، `serverUrl` خارج از کامپوننت تعریف شده است. به همین دلیل نیازی ندارد در آرایه باشد.

<Sandpack>

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
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

</Solution>

#### روشن و خاموش کردن همگام‌سازی {/*switch-synchronization-on-and-off*/}

در این مثال، یک افکت به رویداد [`pointermove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event) ویندو مشترک می‌شود تا یک نقطهٔ صورتی‌رنگ را روی صفحه حرکت دهد. نشانگر را روی ناحیهٔ پیش‌نمایش حرکت دهید (یا اگر روی دستگاه موبایل هستید صفحه را لمس کنید)، و ببینید چگونه نقطهٔ صورتی حرکت شما را دنبال می‌کند.

همچنین یک چک‌باکس وجود دارد. تیک زدن چک‌باکس متغیر استیت `canMove` را تغییر می‌دهد، اما این متغیر استیت در هیچ جای کد استفاده نمی‌شود. وظیفهٔ شما این است که کد را تغییر دهید تا وقتی `canMove` برابر `false` است (چک‌باکس تیک‌خورده نیست)، نقطه باید از حرکت متوقف شود. بعد از اینکه چک‌باکس را دوباره روشن کنید (و `canMove` را به `true` تنظیم کنید)، نقطه باید دوباره حرکت را دنبال کند. به‌عبارت دیگر، اینکه نقطه می‌تواند حرکت کند یا نه باید با این که چک‌باکس تیک‌خورده یا نه همگام بماند.

<Hint>

شما نمی‌توانید یک افکت را به‌صورت شرطی اعلام کنید. با این حال، کد داخل افکت می‌تواند از شرط‌ها استفاده کند!

</Hint>

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
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

<Solution>

یک راه‌حل این است که فراخوانی `setPosition` را در یک شرط `if (canMove) { ... }` بپیچید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

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

به‌عنوان جایگزین، می‌توانید منطق *اشتراک در رویداد* را در یک شرط `if (canMove) { ... }` بپیچید:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    if (canMove) {
      window.addEventListener('pointermove', handleMove);
      return () => window.removeEventListener('pointermove', handleMove);
    }
  }, [canMove]);

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

در هر دوی این موارد، `canMove` یک متغیر واکنشی است که داخل افکت می‌خوانید. به همین دلیل باید در فهرست وابستگی‌های افکت مشخص شود. این تضمین می‌کند که افکت بعد از هر تغییر در مقدارش مجدداً همگام شود.

</Solution>

#### بررسی یک باگ مقدار کهنه {/*investigate-a-stale-value-bug*/}

در این مثال، نقطهٔ صورتی باید وقتی چک‌باکس روشن است حرکت کند، و وقتی چک‌باکس خاموش است متوقف شود. منطق این کار قبلاً پیاده‌سازی شده: مدیریت‌کنندهٔ رویداد `handleMove` متغیر استیت `canMove` را بررسی می‌کند.

با این حال، به‌نظر می‌رسد که متغیر استیت `canMove` داخل `handleMove` به‌نوعی «کهنه» است: همیشه `true` است، حتی بعد از اینکه چک‌باکس را خاموش می‌کنید. چگونه این ممکن است؟ اشتباه را در کد پیدا کنید و رفعش کنید.

<Hint>

اگر می‌بینید یک قانون لینتر سرکوب شده، سرکوب را حذف کنید! اشتباهات معمولاً آنجا هستند.

</Hint>

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

<Solution>

مشکل کد اصلی سرکوب کردن لینتر وابستگی بود. اگر سرکوب را حذف کنید، خواهید دید که این افکت به تابع `handleMove` وابسته است. این منطقی است: `handleMove` داخل بدنهٔ کامپوننت اعلام شده، که آن را یک مقدار واکنشی می‌کند. هر مقدار واکنشی باید به‌عنوان وابستگی مشخص شود، وگرنه ممکن است در طول زمان کهنه شود!

نویسندهٔ کد اصلی به ری‌اکت «دروغ گفته» با ادعا اینکه افکت به هیچ مقدار واکنشی وابسته نیست (`[]`). به همین دلیل ری‌اکت بعد از اینکه `canMove` تغییر کرد (و `handleMove` با آن)، افکت را مجدداً همگام نکرد. چون ری‌اکت افکت را مجدداً همگام نکرد، `handleMove` پیوست‌شده به‌عنوان شنونده همان تابع `handleMove` است که در طول رندر اول ایجاد شده بود. در طول رندر اول، `canMove` برابر `true` بود، به همین دلیل `handleMove` از رندر اول برای همیشه آن مقدار را خواهد دید.

**اگر هرگز لینتر را سرکوب نکنید، هرگز مشکلاتی با مقادیر کهنه نخواهید دید.** چند راه متفاوت برای حل این باگ وجود دارد، اما همیشه باید با حذف سرکوب لینتر شروع کنید. سپس کد را تغییر دهید تا خطای لینت رفع شود.

می‌توانید وابستگی‌های افکت را به `[handleMove]` تغییر دهید، اما چون این یک تابع تازه‌تعریف‌شده برای هر رندر خواهد بود، بهتر است آرایهٔ وابستگی‌ها را کلاً حذف کنید. سپس افکت *بعد از هر رندر مجدد* مجدداً همگام خواهد شد:

<Sandpack>

```js
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
  });

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

این راه‌حل کار می‌کند، اما ایده‌آل نیست. اگر `console.log('Resubscribing')` را داخل افکت قرار دهید، خواهید دید که بعد از هر رندر مجدد دوباره مشترک می‌شود. مشترک شدن مجدد سریع است، اما همچنان خوب بود که آن را این‌قدر زیاد انجام نمی‌دادید.

یک رفع بهتر این است که تابع `handleMove` را *داخل* افکت منتقل کنید. سپس `handleMove` یک مقدار واکنشی نخواهد بود، و افکت شما به یک تابع وابسته نخواهد بود. در عوض، به `canMove` وابسته خواهد بود که کد شما اکنون آن را از داخل افکت می‌خواند. این با رفتاری که می‌خواستید تطابق دارد، زیرا افکت شما اکنون با مقدار `canMove` همگام خواهد ماند:

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e) {
      if (canMove) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

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

اضافه کردن `console.log('Resubscribing')` به داخل بدنهٔ افکت را امتحان کنید و توجه کنید که اکنون فقط وقتی چک‌باکس را تغییر می‌دهید (`canMove` تغییر می‌کند) یا کد را ویرایش می‌کنید، دوباره مشترک می‌شود. این آن را بهتر از رویکرد قبلی می‌کند که همیشه دوباره مشترک می‌شد.

یک رویکرد عمومی‌تر برای این نوع مشکل را در [جدا کردن رویدادها از افکت‌ها](/learn/separating-events-from-effects) خواهید آموخت.

</Solution>

#### رفع یک سوییچ اتصال {/*fix-a-connection-switch*/}

در این مثال، سرویس چت در `chat.js` دو API متفاوت را در اختیار می‌گذارد: `createEncryptedConnection` و `createUnencryptedConnection`. کامپوننت ریشهٔ `App` به کاربر اجازه می‌دهد انتخاب کند که از رمزنگاری استفاده کند یا نه، و سپس متد API متناظر را به کامپوننت فرزند `ChatRoom` به‌عنوان پراپ `createConnection` پاس می‌دهد.

توجه کنید که در ابتدا، لاگ‌های کنسول می‌گویند اتصال رمزنگاری‌شده نیست. تیک چک‌باکس را روشن کنید: اتفاقی نمی‌افتد. با این حال، اگر بعد از آن اتاق انتخاب‌شده را تغییر دهید، چت مجدداً متصل می‌شود *و* رمزنگاری را فعال می‌کند (همان‌طور که از پیام‌های کنسول خواهید دید). این یک باگ است. باگ را رفع کنید تا تغییر چک‌باکس *همچنین* باعث شود چت مجدداً متصل شود.

<Hint>

سرکوب کردن لینتر همیشه مشکوک است. آیا این می‌تواند یک باگ باشد؟

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
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
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        createConnection={isEncrypted ?
          createEncryptedConnection :
          createUnencryptedConnection
        }
      />
    </>
  );
}
```

```js {expectedErrors: {'react-compiler': [8]}} src/ChatRoom.js active
import { useState, useEffect } from 'react';

export default function ChatRoom({ roomId, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createEncryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)');
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '... (unencrypted)');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    }
  };
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

اگر سرکوب لینتر را حذف کنید، یک خطای لینت خواهید دید. مشکل این است که `createConnection` یک پراپ است، پس یک مقدار واکنشی است. این می‌تواند در طول زمان تغییر کند! (و واقعاً باید — وقتی کاربر چک‌باکس را تیک می‌زند، کامپوننت والد مقدار متفاوتی از پراپ `createConnection` را پاس می‌دهد.) به همین دلیل باید یک وابستگی باشد. آن را در فهرست وارد کنید تا باگ را رفع کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
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
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        createConnection={isEncrypted ?
          createEncryptedConnection :
          createUnencryptedConnection
        }
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';

export default function ChatRoom({ roomId, createConnection }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, createConnection]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createEncryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)');
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '... (unencrypted)');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    }
  };
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

این که `createConnection` یک وابستگی است درست است. با این حال، این کد کمی شکننده است زیرا کسی می‌تواند کامپوننت `App` را ویرایش کند تا یک تابع inline را به‌عنوان مقدار این پراپ پاس کند. در آن صورت، مقدار آن هر بار که کامپوننت `App` مجدداً رندر می‌شود متفاوت خواهد بود، پس افکت ممکن است بیش از حد مجدداً همگام شود. برای اجتناب از این کار، می‌توانید به‌جای آن `isEncrypted` را پاس دهید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);
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
          checked={isEncrypted}
          onChange={e => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        isEncrypted={isEncrypted}
      />
    </>
  );
}
```

```js src/ChatRoom.js active
import { useState, useEffect } from 'react';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted }) {
  useEffect(() => {
    const createConnection = isEncrypted ?
      createEncryptedConnection :
      createUnencryptedConnection;
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]);

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
export function createEncryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)');
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
    }
  };
}

export function createUnencryptedConnection(roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '... (unencrypted)');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
    }
  };
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

در این نسخه، کامپوننت `App` یک پراپ بولین به‌جای یک تابع پاس می‌دهد. داخل افکت، تصمیم می‌گیرید از کدام تابع استفاده کنید. چون هم `createEncryptedConnection` و هم `createUnencryptedConnection` خارج از کامپوننت اعلام شده‌اند، واکنشی نیستند، و نیازی ندارند وابستگی باشند. بیشتر دربارهٔ این در [حذف وابستگی‌های افکت](/learn/removing-effect-dependencies) خواهید آموخت.

</Solution>

#### پر کردن یک زنجیره از جعبه‌های انتخاب {/*populate-a-chain-of-select-boxes*/}

در این مثال، دو جعبهٔ انتخاب وجود دارد. یک جعبهٔ انتخاب به کاربر اجازه می‌دهد یک سیاره انتخاب کند. جعبهٔ انتخاب دیگر به کاربر اجازه می‌دهد یک مکان *روی آن سیاره* را انتخاب کند. جعبهٔ دوم هنوز کار نمی‌کند. وظیفهٔ شما این است که آن را طوری بسازید که مکان‌های روی سیارهٔ انتخاب‌شده را نمایش دهد.

نگاه کنید چگونه جعبهٔ انتخاب اول کار می‌کند. این جعبه، استیت `planetList` را با نتیجهٔ فراخوانی API `"/planets"` پر می‌کند. شناسهٔ سیارهٔ انتخاب‌شدهٔ فعلی در متغیر استیت `planetId` نگهداری می‌شود. باید پیدا کنید کجا کمی کد اضافه کنید تا متغیر استیت `placeList` با نتیجهٔ فراخوانی API `"/planets/" + planetId + "/places"` پر شود.

اگر این را درست پیاده‌سازی کنید، انتخاب یک سیاره باید فهرست مکان‌ها را پر کند. تغییر یک سیاره باید فهرست مکان‌ها را تغییر دهد.

<Hint>

اگر دو فرآیند همگام‌سازی مستقل دارید، باید دو افکت مجزا بنویسید.

</Hint>

<Sandpack>

```js src/App.js
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

export default function Page() {
  const [planetList, setPlanetList] = useState([])
  const [planetId, setPlanetId] = useState('');

  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchData('/planets').then(result => {
      if (!ignore) {
        console.log('Fetched a list of planets.');
        setPlanetList(result);
        setPlanetId(result[0].id); // Select the first planet
      }
    });
    return () => {
      ignore = true;
    }
  }, []);

  return (
    <>
      <label>
        Pick a planet:{' '}
        <select value={planetId} onChange={e => {
          setPlanetId(e.target.value);
        }}>
          {planetList.map(planet =>
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          )}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select value={placeId} onChange={e => {
          setPlaceId(e.target.value);
        }}>
          {placeList.map(place =>
            <option key={place.id} value={place.id}>{place.name}</option>
          )}
        </select>
      </label>
      <hr />
      <p>You are going to: {placeId || '???'} on {planetId || '???'} </p>
    </>
  );
}
```

```js src/api.js hidden
export function fetchData(url) {
  if (url === '/planets') {
    return fetchPlanets();
  } else if (url.startsWith('/planets/')) {
    const match = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
    if (!match || !match[1] || !match[1].length) {
      throw Error('Expected URL like "/planets/earth/places". Received: "' + url + '".');
    }
    return fetchPlaces(match[1]);
  } else throw Error('Expected URL like "/planets" or "/planets/earth/places". Received: "' + url + '".');
}

async function fetchPlanets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 'earth',
        name: 'Earth'
      }, {
        id: 'venus',
        name: 'Venus'
      }, {
        id: 'mars',
        name: 'Mars'        
      }]);
    }, 1000);
  });
}

async function fetchPlaces(planetId) {
  if (typeof planetId !== 'string') {
    throw Error(
      'fetchPlaces(planetId) expects a string argument. ' +
      'Instead received: ' + planetId + '.'
    );
  }
  return new Promise(resolve => {
    setTimeout(() => {
      if (planetId === 'earth') {
        resolve([{
          id: 'laos',
          name: 'Laos'
        }, {
          id: 'spain',
          name: 'Spain'
        }, {
          id: 'vietnam',
          name: 'Vietnam'        
        }]);
      } else if (planetId === 'venus') {
        resolve([{
          id: 'aurelia',
          name: 'Aurelia'
        }, {
          id: 'diana-chasma',
          name: 'Diana Chasma'
        }, {
          id: 'kumsong-vallis',
          name: 'Kŭmsŏng Vallis'        
        }]);
      } else if (planetId === 'mars') {
        resolve([{
          id: 'aluminum-city',
          name: 'Aluminum City'
        }, {
          id: 'new-new-york',
          name: 'New New York'
        }, {
          id: 'vishniac',
          name: 'Vishniac'
        }]);
      } else throw Error('Unknown planet ID: ' + planetId);
    }, 1000);
  });
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

<Solution>

دو فرآیند همگام‌سازی مستقل وجود دارد:

- جعبهٔ انتخاب اول با فهرست دور دست سیاره‌ها همگام است.
- جعبهٔ انتخاب دوم با فهرست دور دست مکان‌ها برای `planetId` فعلی همگام است.

به همین دلیل منطقی است که آن‌ها را به‌عنوان دو افکت مجزا توصیف کنید. در اینجا مثالی از نحوهٔ انجام این کار آمده است:

<Sandpack>

```js src/App.js
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

export default function Page() {
  const [planetList, setPlanetList] = useState([])
  const [planetId, setPlanetId] = useState('');

  const [placeList, setPlaceList] = useState([]);
  const [placeId, setPlaceId] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchData('/planets').then(result => {
      if (!ignore) {
        console.log('Fetched a list of planets.');
        setPlanetList(result);
        setPlanetId(result[0].id); // Select the first planet
      }
    });
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    if (planetId === '') {
      // Nothing is selected in the first box yet
      return;
    }

    let ignore = false;
    fetchData('/planets/' + planetId + '/places').then(result => {
      if (!ignore) {
        console.log('Fetched a list of places on "' + planetId + '".');
        setPlaceList(result);
        setPlaceId(result[0].id); // Select the first place
      }
    });
    return () => {
      ignore = true;
    }
  }, [planetId]);

  return (
    <>
      <label>
        Pick a planet:{' '}
        <select value={planetId} onChange={e => {
          setPlanetId(e.target.value);
        }}>
          {planetList.map(planet =>
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          )}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select value={placeId} onChange={e => {
          setPlaceId(e.target.value);
        }}>
          {placeList.map(place =>
            <option key={place.id} value={place.id}>{place.name}</option>
          )}
        </select>
      </label>
      <hr />
      <p>You are going to: {placeId || '???'} on {planetId || '???'} </p>
    </>
  );
}
```

```js src/api.js hidden
export function fetchData(url) {
  if (url === '/planets') {
    return fetchPlanets();
  } else if (url.startsWith('/planets/')) {
    const match = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
    if (!match || !match[1] || !match[1].length) {
      throw Error('Expected URL like "/planets/earth/places". Received: "' + url + '".');
    }
    return fetchPlaces(match[1]);
  } else throw Error('Expected URL like "/planets" or "/planets/earth/places". Received: "' + url + '".');
}

async function fetchPlanets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 'earth',
        name: 'Earth'
      }, {
        id: 'venus',
        name: 'Venus'
      }, {
        id: 'mars',
        name: 'Mars'        
      }]);
    }, 1000);
  });
}

async function fetchPlaces(planetId) {
  if (typeof planetId !== 'string') {
    throw Error(
      'fetchPlaces(planetId) expects a string argument. ' +
      'Instead received: ' + planetId + '.'
    );
  }
  return new Promise(resolve => {
    setTimeout(() => {
      if (planetId === 'earth') {
        resolve([{
          id: 'laos',
          name: 'Laos'
        }, {
          id: 'spain',
          name: 'Spain'
        }, {
          id: 'vietnam',
          name: 'Vietnam'        
        }]);
      } else if (planetId === 'venus') {
        resolve([{
          id: 'aurelia',
          name: 'Aurelia'
        }, {
          id: 'diana-chasma',
          name: 'Diana Chasma'
        }, {
          id: 'kumsong-vallis',
          name: 'Kŭmsŏng Vallis'        
        }]);
      } else if (planetId === 'mars') {
        resolve([{
          id: 'aluminum-city',
          name: 'Aluminum City'
        }, {
          id: 'new-new-york',
          name: 'New New York'
        }, {
          id: 'vishniac',
          name: 'Vishniac'
        }]);
      } else throw Error('Unknown planet ID: ' + planetId);
    }, 1000);
  });
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

این کد کمی تکراری است. با این حال، این دلیل خوبی برای ترکیب آن در یک افکت واحد نیست! اگر این کار را می‌کردید، باید وابستگی‌های هر دو افکت را در یک فهرست ترکیب می‌کردید، و سپس تغییر سیاره باعث می‌شد فهرست تمام سیاره‌ها دوباره واکشی شود. افکت‌ها ابزاری برای استفادهٔ مجدد کد نیستند.

در عوض، برای کاهش تکرار، می‌توانید بخشی از منطق را در یک هوک سفارشی مثل `useSelectOptions` زیر استخراج کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useSelectOptions } from './useSelectOptions.js';

export default function Page() {
  const [
    planetList,
    planetId,
    setPlanetId
  ] = useSelectOptions('/planets');

  const [
    placeList,
    placeId,
    setPlaceId
  ] = useSelectOptions(planetId ? `/planets/${planetId}/places` : null);

  return (
    <>
      <label>
        Pick a planet:{' '}
        <select value={planetId} onChange={e => {
          setPlanetId(e.target.value);
        }}>
          {planetList?.map(planet =>
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          )}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select value={placeId} onChange={e => {
          setPlaceId(e.target.value);
        }}>
          {placeList?.map(place =>
            <option key={place.id} value={place.id}>{place.name}</option>
          )}
        </select>
      </label>
      <hr />
      <p>You are going to: {placeId || '...'} on {planetId || '...'} </p>
    </>
  );
}
```

```js src/useSelectOptions.js
import { useState, useEffect } from 'react';
import { fetchData } from './api.js';

export function useSelectOptions(url) {
  const [list, setList] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  useEffect(() => {
    if (url === null) {
      return;
    }

    let ignore = false;
    fetchData(url).then(result => {
      if (!ignore) {
        setList(result);
        setSelectedId(result[0].id);
      }
    });
    return () => {
      ignore = true;
    }
  }, [url]);
  return [list, selectedId, setSelectedId];
}
```

```js src/api.js hidden
export function fetchData(url) {
  if (url === '/planets') {
    return fetchPlanets();
  } else if (url.startsWith('/planets/')) {
    const match = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
    if (!match || !match[1] || !match[1].length) {
      throw Error('Expected URL like "/planets/earth/places". Received: "' + url + '".');
    }
    return fetchPlaces(match[1]);
  } else throw Error('Expected URL like "/planets" or "/planets/earth/places". Received: "' + url + '".');
}

async function fetchPlanets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 'earth',
        name: 'Earth'
      }, {
        id: 'venus',
        name: 'Venus'
      }, {
        id: 'mars',
        name: 'Mars'        
      }]);
    }, 1000);
  });
}

async function fetchPlaces(planetId) {
  if (typeof planetId !== 'string') {
    throw Error(
      'fetchPlaces(planetId) expects a string argument. ' +
      'Instead received: ' + planetId + '.'
    );
  }
  return new Promise(resolve => {
    setTimeout(() => {
      if (planetId === 'earth') {
        resolve([{
          id: 'laos',
          name: 'Laos'
        }, {
          id: 'spain',
          name: 'Spain'
        }, {
          id: 'vietnam',
          name: 'Vietnam'        
        }]);
      } else if (planetId === 'venus') {
        resolve([{
          id: 'aurelia',
          name: 'Aurelia'
        }, {
          id: 'diana-chasma',
          name: 'Diana Chasma'
        }, {
          id: 'kumsong-vallis',
          name: 'Kŭmsŏng Vallis'        
        }]);
      } else if (planetId === 'mars') {
        resolve([{
          id: 'aluminum-city',
          name: 'Aluminum City'
        }, {
          id: 'new-new-york',
          name: 'New New York'
        }, {
          id: 'vishniac',
          name: 'Vishniac'
        }]);
      } else throw Error('Unknown planet ID: ' + planetId);
    }, 1000);
  });
}
```

```css
label { display: block; margin-bottom: 10px; }
```

</Sandpack>

تبِ `useSelectOptions.js` را در سندباکس بررسی کنید تا ببینید چگونه کار می‌کند. به‌طور ایده‌آل، بیشتر افکت‌ها در اپلیکیشن شما در نهایت باید با هوک‌های سفارشی جایگزین شوند، چه توسط شما نوشته شوند چه توسط جامعه. هوک‌های سفارشی منطق همگام‌سازی را پنهان می‌کنند، تا کامپوننت فراخوان چیزی دربارهٔ افکت نداند. همان‌طور که به کار روی اپلیکیشن خود ادامه می‌دهید، مجموعه‌ای از هوک‌ها برای انتخاب توسعه خواهید داد، و در نهایت خیلی کم لازم باشد در کامپوننت‌هایتان افکت بنویسید.

</Solution>

</Challenges>
