---
title: <StrictMode>
---


<Intro>

`<StrictMode>` به شما اجازه می‌دهد اشکالات رایج در کامپوننت‌های خود را در اوایل توسعه پیدا کنید.


```js
<StrictMode>
  <App />
</StrictMode>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<StrictMode>` {/*strictmode*/}

از `StrictMode` برای فعال‌سازی رفتارها و هشدارهای توسعهٔ اضافی برای درخت کامپوننت درون آن استفاده کنید:

```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

حالت سخت‌گیرانه (Strict Mode) رفتارهای زیر را که فقط مخصوص توسعه هستند فعال می‌کند:

- کامپوننت‌های شما [یک بار اضافی رندر مجدد می‌شوند](#fixing-bugs-found-by-double-rendering-in-development) تا اشکالات ناشی از رندر ناخالص را پیدا کنند.
- افکت‌های کامپوننت‌های شما [یک بار اضافی اجرا می‌شوند](#fixing-bugs-found-by-re-running-effects-in-development) تا اشکالات ناشی از پاکسازی نبودن افکت را پیدا کنند.
- کالبک‌های رفرنس کامپوننت‌های شما [یک بار اضافی اجرا می‌شوند](#fixing-bugs-found-by-re-running-ref-callbacks-in-development) تا اشکالات ناشی از پاکسازی نبودن رفرنس را پیدا کنند.
- کامپوننت‌های شما [برای استفاده از APIهای منسوخ بررسی می‌شوند.](#fixing-deprecation-warnings-enabled-by-strict-mode)

#### پراپس {/*props*/}

`StrictMode` هیچ پراپسی نمی‌پذیرد.

#### نکات {/*caveats*/}

* هیچ راهی برای خروج از حالت سخت‌گیرانه (Strict Mode) درون درختی که با `<StrictMode>` پیچیده شده وجود ندارد. این به شما اطمینان می‌دهد که تمام کامپوننت‌های درون `<StrictMode>` بررسی می‌شوند. اگر دو تیم که روی یک محصول کار می‌کنند در مورد ارزشمند بودن این بررسی‌ها توافق نداشته باشند، باید یا به توافق برسند یا `<StrictMode>` را در درخت پایین‌تر ببرند.

---

## کاربرد {/*usage*/}

### فعال کردن حالت سخت‌گیرانه برای کل برنامه {/*enabling-strict-mode-for-entire-app*/}

حالت سخت‌گیرانه (Strict Mode) بررسی‌های اضافی مخصوص توسعه را برای کل درخت کامپوننت درون کامپوننت `<StrictMode>` فعال می‌کند. این بررسی‌ها به شما کمک می‌کنند اشکالات رایج در کامپوننت‌های خود را در اوایل فرآیند توسعه پیدا کنید.


برای فعال‌سازی حالت سخت‌گیرانه برای کل برنامه‌تان، کامپوننت ریشهٔ خود را هنگام رندر کردن با `<StrictMode>` بپیچید:

```js {6,8}
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

توصیه می‌کنیم کل برنامهٔ خود را در حالت سخت‌گیرانه بپیچید، به‌ویژه برای برنامه‌های تازه ایجاد شده. اگر از فریم‌ورکی استفاده می‌کنید که [`createRoot`](/reference/react-dom/client/createRoot) را برای شما فراخوانی می‌کند، مستندات آن را برای نحوهٔ فعال‌سازی حالت سخت‌گیرانه بررسی کنید.

اگرچه بررسی‌های حالت سخت‌گیرانه **فقط در محیط توسعه اجرا می‌شوند**، اما به شما کمک می‌کنند اشکالاتی را که از قبل در کد شما وجود دارند اما تولید مجدد قابل اعتماد آن‌ها در محیط تولید دشوار است، پیدا کنید. حالت سخت‌گیرانه به شما اجازه می‌دهد اشکالات را قبل از اینکه کاربران گزارش دهند برطرف کنید.

<Note>

حالت سخت‌گیرانه بررسی‌های زیر را در محیط توسعه فعال می‌کند:

- کامپوننت‌های شما [یک بار اضافی رندر مجدد می‌شوند](#fixing-bugs-found-by-double-rendering-in-development) تا اشکالات ناشی از رندر ناخالص را پیدا کنند.
- افکت‌های کامپوننت‌های شما [یک بار اضافی اجرا می‌شوند](#fixing-bugs-found-by-re-running-effects-in-development) تا اشکالات ناشی از پاکسازی نبودن افکت را پیدا کنند.
- کالبک‌های رفرنس کامپوننت‌های شما [یک بار اضافی اجرا می‌شوند](#fixing-bugs-found-by-re-running-ref-callbacks-in-development) تا اشکالات ناشی از پاکسازی نبودن رفرنس را پیدا کنند.
- کامپوننت‌های شما [برای استفاده از APIهای منسوخ بررسی می‌شوند.](#fixing-deprecation-warnings-enabled-by-strict-mode)

**تمام این بررسی‌ها فقط مخصوص توسعه هستند و بر نسخهٔ تولید تأثیری ندارند.**

</Note>

---

### فعال کردن حالت سخت‌گیرانه برای بخشی از برنامه {/*enabling-strict-mode-for-a-part-of-the-app*/}

همچنین می‌توانید حالت سخت‌گیرانه را برای هر بخشی از برنامه‌تان فعال کنید:

```js {7,12}
import { StrictMode } from 'react';

function App() {
  return (
    <>
      <Header />
      <StrictMode>
        <main>
          <Sidebar />
          <Content />
        </main>
      </StrictMode>
      <Footer />
    </>
  );
}
```

در این مثال، بررسی‌های حالت سخت‌گیرانه روی کامپوننت‌های `Header` و `Footer` اجرا نخواهند شد. با این حال، روی `Sidebar` و `Content`، و همچنین تمام کامپوننت‌های درون آن‌ها، فارغ از عمق، اجرا خواهند شد.

<Note>

وقتی `StrictMode` برای بخشی از برنامه فعال است، ری‌اکت فقط رفتارهایی را فعال می‌کند که در محیط تولید ممکن هستند. مثلاً اگر `<StrictMode>` در ریشهٔ برنامه فعال نباشد، در mount اولیه [افکت‌ها را یک بار اضافی اجرا نخواهد کرد](#fixing-bugs-found-by-re-running-effects-in-development)، زیرا این کار باعث می‌شود افکت‌های فرزند بدون افکت‌های والد دو بار اجرا شوند، که در محیط تولید نمی‌تواند رخ دهد.

</Note>

---

### رفع اشکالاتی که با رندر دوگانه در توسعه یافت شده‌اند {/*fixing-bugs-found-by-double-rendering-in-development*/}

[ری‌اکت فرض می‌کند که هر کامپوننتی که می‌نویسید یک تابع خالص است.](/learn/keeping-components-pure) این بدان معناست که کامپوننت‌های ری‌اکتی که می‌نویسید باید با توجه به ورودی‌های یکسان (پراپس، استیت، و کانتکست) همیشه همان JSX را برگردانند.

کامپوننت‌هایی که این قانون را نقض می‌کنند به‌طور غیرقابل پیش‌بینی رفتار می‌کنند و باعث اشکال می‌شوند. برای کمک به پیدا کردن کد ناخالص تصادفی، حالت سخت‌گیرانه برخی از توابع شما (فقط آن‌هایی که باید خالص باشند) را **در محیط توسعه دو بار فراخوانی می‌کند.** این شامل موارد زیر است:

- بدنهٔ تابع کامپوننت شما (فقط منطق سطح بالا، بنابراین کد درون کنترل‌کننده‌های رویداد را شامل نمی‌شود)
- توابعی که به [`useState`](/reference/react/useState)، [توابع `set`](/reference/react/useState#setstate)، [`useMemo`](/reference/react/useMemo)، یا [`useReducer`](/reference/react/useReducer) ارسال می‌کنید
- برخی متدهای کامپوننت کلاسی مانند [`constructor`](/reference/react/Component#constructor)، [`render`](/reference/react/Component#render)، [`shouldComponentUpdate`](/reference/react/Component#shouldcomponentupdate) ([کل لیست را ببینید](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects))

اگر یک تابع خالص باشد، اجرای دو بار آن رفتارش را تغییر نمی‌دهد زیرا یک تابع خالص هر بار همان نتیجه را تولید می‌کند. با این حال، اگر یک تابع ناخالص باشد (مثلاً داده‌ای که دریافت می‌کند را تغییر می‌دهد)، اجرای دو بار آن معمولاً قابل توجه است (این همان چیزی است که آن را ناخالص می‌کند!) این به شما کمک می‌کند زودهنگام اشکال را پیدا و برطرف کنید.

**در اینجا مثالی برای نشان دادن اینکه چگونه رندر دوگانه در حالت سخت‌گیرانه به شما کمک می‌کند زودهنگام اشکالات را پیدا کنید، آورده شده است.**

این کامپوننت `StoryTray` یک آرایه از `stories` می‌گیرد و یک آیتم «Create Story» در انتها اضافه می‌کند:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

```js src/App.js
import { useState } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState(initialStories)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <StoryTray stories={stories} />
    </div>
  );
}
```

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  const items = stories;
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul>
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

در کد بالا اشتباهی وجود دارد. با این حال، تشخیص آن آسان نیست زیرا خروجی اولیه درست به نظر می‌رسد.

اگر کامپوننت `StoryTray` چندین بار رندر مجدد شود، این اشتباه قابل توجه‌تر خواهد شد. مثلاً بیایید `StoryTray` را طوری بسازیم که هر بار که موس را روی آن می‌برید، با رنگ پس‌زمینهٔ متفاوتی رندر مجدد شود:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```js src/App.js
import { useState } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState(initialStories)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <StoryTray stories={stories} />
    </div>
  );
}
```

```js src/StoryTray.js active
import { useState } from 'react';

export default function StoryTray({ stories }) {
  const [isHover, setIsHover] = useState(false);
  const items = stories;
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    >
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

توجه کنید که هر بار که موس را روی کامپوننت `StoryTray` می‌برید، «Create Story» دوباره به لیست اضافه می‌شود. قصد کد این بود که یک بار در انتها اضافه شود. اما `StoryTray` مستقیماً آرایهٔ `stories` را از پراپس تغییر می‌دهد. هر بار که `StoryTray` رندر می‌شود، «Create Story» را دوباره در انتهای همان آرایه اضافه می‌کند. به عبارت دیگر، `StoryTray` یک تابع خالص نیست — اجرای چندبارهٔ آن نتایج متفاوتی تولید می‌کند.

برای رفع این مشکل، می‌توانید یک کپی از آرایه تهیه کنید، و به جای اصل آن، آن کپی را تغییر دهید:

```js {2}
export default function StoryTray({ stories }) {
  const items = stories.slice(); // Clone the array
  // ✅ Good: Pushing into a new array
  items.push({ id: 'create', label: 'Create Story' });
```

این کار [تابع `StoryTray` را خالص می‌کند.](/learn/keeping-components-pure) هر بار که فراخوانی می‌شود، فقط یک کپی جدید از آرایه را تغییر می‌دهد، و بر هیچ شیء یا متغیر خارجی تأثیری نمی‌گذارد. این اشکال را حل می‌کند، اما باید کامپوننت را بیشتر رندر مجدد می‌کردید تا مشخص شود رفتارش مشکلی دارد.

**در مثال اصلی، اشکال آشکار نبود. اکنون بیایید کد اصلی (دارای اشکال) را در `<StrictMode>` بپیچیم:**

<Sandpack>

```js src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js src/App.js
import { useState } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState(initialStories)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <StoryTray stories={stories} />
    </div>
  );
}
```

```js src/StoryTray.js active
export default function StoryTray({ stories }) {
  const items = stories;
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul>
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

**حالت سخت‌گیرانه *همیشه* تابع رندر شما را دو بار فراخوانی می‌کند، بنابراین می‌توانید فوراً اشتباه را ببینید** («Create Story» دو بار ظاهر می‌شود). این به شما اجازه می‌دهد چنین اشتباهاتی را زود در فرآیند متوجه شوید. وقتی کامپوننت خود را برای رندر در حالت سخت‌گیرانه اصلاح می‌کنید، *همچنین* بسیاری از اشکالات احتمالی آینده در محیط تولید مانند قابلیت hover قبلی را نیز برطرف می‌کنید:

<Sandpack>

```js src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js src/App.js
import { useState } from 'react';
import StoryTray from './StoryTray.js';

let initialStories = [
  {id: 0, label: "Ankit's Story" },
  {id: 1, label: "Taylor's Story" },
];

export default function App() {
  let [stories, setStories] = useState(initialStories)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <StoryTray stories={stories} />
    </div>
  );
}
```

```js src/StoryTray.js active
import { useState } from 'react';

export default function StoryTray({ stories }) {
  const [isHover, setIsHover] = useState(false);
  const items = stories.slice(); // Clone the array
  items.push({ id: 'create', label: 'Create Story' });
  return (
    <ul
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => setIsHover(false)}
      style={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    >
      {items.map(story => (
        <li key={story.id}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
```

```css
ul {
  margin: 0;
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}

li {
  border: 1px solid #aaa;
  border-radius: 6px;
  float: left;
  margin: 5px;
  padding: 5px;
  width: 70px;
  height: 100px;
}
```

</Sandpack>

بدون حالت سخت‌گیرانه، تشخیص اشکال تا زمانی که رندرهای مجدد بیشتری اضافه می‌کردید آسان نبود. حالت سخت‌گیرانه همان اشکال را فوراً آشکار کرد. حالت سخت‌گیرانه به شما کمک می‌کند اشکالات را قبل از اینکه آن‌ها را به تیم و کاربرانتان ببرید، پیدا کنید.

[دربارهٔ خالص نگه داشتن کامپوننت‌ها بیشتر بخوانید.](/learn/keeping-components-pure)

<Note>

اگر [React DevTools](/learn/react-developer-tools) را نصب کرده‌اید، هر فراخوانی `console.log` در حین فراخوانی رندر دوم کمی کم‌رنگ‌تر ظاهر خواهد شد. React DevTools همچنین تنظیمی (که به‌صورت پیش‌فرض خاموش است) برای سرکوب کامل آن‌ها ارائه می‌دهد.

</Note>

---

### رفع اشکالاتی که با اجرای مجدد افکت‌ها در توسعه یافت شده‌اند {/*fixing-bugs-found-by-re-running-effects-in-development*/}

حالت سخت‌گیرانه همچنین می‌تواند به پیدا کردن اشکالات در [افکت‌ها](/learn/synchronizing-with-effects) کمک کند.

هر افکت دارای مقداری کد راه‌اندازی است و ممکن است مقداری کد پاکسازی داشته باشد. معمولاً، ری‌اکت هنگام *mount* شدن کامپوننت (افزوده شدن به صفحه) راه‌اندازی را فراخوانی می‌کند و هنگام *unmount* شدن کامپوننت (حذف شدن از صفحه) پاکسازی را فراخوانی می‌کند. سپس ری‌اکت اگر وابستگی‌هایش از آخرین رندر تغییر کرده باشد، پاکسازی و راه‌اندازی را دوباره فراخوانی می‌کند.

وقتی حالت سخت‌گیرانه روشن است، ری‌اکت همچنین **یک چرخهٔ اضافی setup+cleanup را در محیط توسعه برای هر افکت اجرا می‌کند.** این ممکن است تعجب‌آور به نظر برسد، اما به آشکار کردن اشکالات ظریفی که دستی گرفتن آن‌ها دشوار است کمک می‌کند.

**در اینجا مثالی برای نشان دادن اینکه چگونه اجرای مجدد افکت‌ها در حالت سخت‌گیرانه به شما کمک می‌کند زودهنگام اشکالات را پیدا کنید، آورده شده است.**

این مثالی را در نظر بگیرید که یک کامپوننت را به یک چت متصل می‌کند:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
  }, []);
  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
let connections = 0;

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      connections++;
      console.log('Active connections: ' + connections);
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      connections--;
      console.log('Active connections: ' + connections);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

در این کد مشکلی وجود دارد، اما ممکن است بلافاصله مشخص نباشد.

برای آشکارتر شدن مشکل، بیایید یک قابلیت پیاده‌سازی کنیم. در مثال زیر، `roomId` ثابت نیست. در عوض، کاربر می‌تواند `roomId` که می‌خواهد به آن متصل شود را از یک منوی کشویی انتخاب کند. روی «Open chat» کلیک کنید و سپس اتاق‌های چت مختلف را یکی‌یکی انتخاب کنید. تعداد اتصال‌های فعال را در کنسول پیگیری کنید:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
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
let connections = 0;

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      connections++;
      console.log('Active connections: ' + connections);
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      connections--;
      console.log('Active connections: ' + connections);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

متوجه می‌شوید که تعداد اتصال‌های باز همیشه در حال افزایش است. در یک برنامهٔ واقعی، این باعث مشکلات عملکرد و شبکه می‌شود. مشکل این است که [افکت شما تابع پاکسازی ندارد:](/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed)

```js {4}
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);
```

اکنون که افکت شما بعد از خود «پاکسازی» می‌کند و اتصال‌های قدیمی را تخریب می‌کند، نشت حل شد. با این حال، توجه کنید که مشکل تا زمانی که قابلیت‌های بیشتری (منوی کشویی) اضافه نکردید آشکار نشد.

**در مثال اصلی، اشکال آشکار نبود. اکنون بیایید کد اصلی (دارای اشکال) را در `<StrictMode>` بپیچیم:**

<Sandpack>

```js src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

export default function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
  }, []);
  return <h1>Welcome to the {roomId} room!</h1>;
}
```

```js src/chat.js
let connections = 0;

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      connections++;
      console.log('Active connections: ' + connections);
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      connections--;
      console.log('Active connections: ' + connections);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

**با حالت سخت‌گیرانه، فوراً متوجه می‌شوید که مشکلی وجود دارد** (تعداد اتصال‌های فعال به ۲ می‌پرد). حالت سخت‌گیرانه یک چرخهٔ اضافی setup+cleanup را برای هر افکت اجرا می‌کند. این افکت هیچ منطق پاکسازی ندارد، بنابراین یک اتصال اضافی ایجاد می‌کند اما آن را تخریب نمی‌کند. این یک اشاره است که شما تابع پاکسازی را از قلم انداخته‌اید.

حالت سخت‌گیرانه به شما اجازه می‌دهد چنین اشتباهاتی را زود در فرآیند متوجه شوید. وقتی افکت خود را با افزودن تابع پاکسازی در حالت سخت‌گیرانه اصلاح می‌کنید، *همچنین* بسیاری از اشکالات احتمالی آینده در محیط تولید مانند منوی کشویی قبلی را نیز برطرف می‌کنید:

<Sandpack>

```js src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

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
let connections = 0;

export function createConnection(serverUrl, roomId) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
      connections++;
      console.log('Active connections: ' + connections);
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
      connections--;
      console.log('Active connections: ' + connections);
    }
  };
}
```

```css
input { display: block; margin-bottom: 20px; }
button { margin-left: 10px; }
```

</Sandpack>

توجه کنید که تعداد اتصال‌های فعال در کنسول دیگر در حال افزایش نیست.

بدون حالت سخت‌گیرانه، تشخیص اینکه افکت شما نیاز به پاکسازی داشت آسان نبود. با اجرای *setup → cleanup → setup* به جای *setup* برای افکت شما در محیط توسعه، حالت سخت‌گیرانه منطق پاکسازی مفقود را قابل توجه‌تر کرد.

[دربارهٔ پیاده‌سازی پاکسازی افکت بیشتر بخوانید.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

---
### رفع اشکالاتی که با اجرای مجدد کالبک‌های رفرنس در توسعه یافت شده‌اند {/*fixing-bugs-found-by-re-running-ref-callbacks-in-development*/}

حالت سخت‌گیرانه همچنین می‌تواند به پیدا کردن اشکالات در [کالبک رفرنس](/learn/manipulating-the-dom-with-refs) کمک کند.

هر کالبک `ref` دارای مقداری کد راه‌اندازی است و ممکن است مقداری کد پاکسازی داشته باشد. معمولاً، ری‌اکت هنگام *ایجاد* المان (افزوده شدن به DOM) راه‌اندازی را فراخوانی می‌کند و هنگام *حذف* المان (حذف شدن از DOM) پاکسازی را فراخوانی می‌کند.

وقتی حالت سخت‌گیرانه روشن است، ری‌اکت همچنین **یک چرخهٔ اضافی setup+cleanup را در محیط توسعه برای هر کالبک `ref` اجرا می‌کند.** این ممکن است تعجب‌آور به نظر برسد، اما به آشکار کردن اشکالات ظریفی که دستی گرفتن آن‌ها دشوار است کمک می‌کند.

این مثال را در نظر بگیرید که به شما اجازه می‌دهد یک حیوان انتخاب کنید و سپس به یکی از آن‌ها اسکرول کنید. توجه کنید وقتی از «Cats» به «Dogs» سوییچ می‌کنید، لاگ‌های کنسول نشان می‌دهند که تعداد حیوانات در لیست همچنان در حال افزایش است، و دکمه‌های «Scroll to» کار نمی‌کنند:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
// ❌ Not using StrictMode.
root.render(<App />);
```

```js src/App.js active
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');

  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  const cats = catList.filter(c => c.type === cat)

  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        <span>Scroll to:</span>{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>
      <div>
        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                  // 🚩 No cleanup, this is a bug!
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }

  return catList;
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>


**این یک اشکال محیط تولید است!** از آنجا که کالبک رفرنس حیوانات را در پاکسازی از لیست حذف نمی‌کند، لیست حیوانات همچنان در حال افزایش است. این یک نشت حافظه است که می‌تواند در یک برنامهٔ واقعی باعث مشکلات عملکرد شود، و رفتار برنامه را خراب می‌کند.

مشکل این است که کالبک رفرنس بعد از خود پاکسازی نمی‌کند:

```js {6-8}
<li
  ref={node => {
    const list = itemsRef.current;
    const item = {animal, node};
    list.push(item);
    return () => {
      // 🚩 No cleanup, this is a bug!
    }
  }}
</li>
```

اکنون بیایید کد اصلی (دارای اشکال) را در `<StrictMode>` بپیچیم:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import {StrictMode} from 'react';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
// ✅ Using StrictMode.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js src/App.js active
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');

  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  const cats = catList.filter(c => c.type === cat)

  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        <span>Scroll to:</span>{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>
      <div>
        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                  // 🚩 No cleanup, this is a bug!
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }

  return catList;
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

**با حالت سخت‌گیرانه، فوراً متوجه می‌شوید که مشکلی وجود دارد**. حالت سخت‌گیرانه یک چرخهٔ اضافی setup+cleanup را برای هر کالبک رفرنس اجرا می‌کند. این کالبک رفرنس هیچ منطق پاکسازی ندارد، بنابراین رفرنس‌ها را اضافه می‌کند اما آن‌ها را حذف نمی‌کند. این یک اشاره است که شما تابع پاکسازی را از قلم انداخته‌اید.

حالت سخت‌گیرانه به شما اجازه می‌دهد زودهنگام اشتباهات در کالبک‌های رفرنس را پیدا کنید. وقتی کالبک خود را با افزودن تابع پاکسازی در حالت سخت‌گیرانه اصلاح می‌کنید، *همچنین* بسیاری از اشکالات احتمالی آینده در محیط تولید مانند اشکال «Scroll to» قبلی را نیز برطرف می‌کنید:

<Sandpack>

```js src/index.js
import { createRoot } from 'react-dom/client';
import {StrictMode} from 'react';
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById("root"));
// ✅ Using StrictMode.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js src/App.js active
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef([]);
  const [catList, setCatList] = useState(setupCatList);
  const [cat, setCat] = useState('neo');

  function scrollToCat(index) {
    const list = itemsRef.current;
    const {node} = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  const cats = catList.filter(c => c.type === cat)

  return (
    <>
      <nav>
        <button onClick={() => setCat('neo')}>Neo</button>
        <button onClick={() => setCat('millie')}>Millie</button>
      </nav>
      <hr />
      <nav>
        <span>Scroll to:</span>{cats.map((cat, index) => (
          <button key={cat.src} onClick={() => scrollToCat(index)}>
            {index}
          </button>
        ))}
      </nav>
      <div>
        <ul>
          {cats.map((cat) => (
            <li
              key={cat.src}
              ref={(node) => {
                const list = itemsRef.current;
                const item = {cat: cat, node};
                list.push(item);
                console.log(`✅ Adding cat to the map. Total cats: ${list.length}`);
                if (list.length > 10) {
                  console.log('❌ Too many cats in the list!');
                }
                return () => {
                  list.splice(list.indexOf(item));
                  console.log(`❌ Removing cat from the map. Total cats: ${itemsRef.current.length}`);
                }
              }}
            >
              <img src={cat.src} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'neo', src: "https://placecats.com/neo/320/240?" + i});
  }
  for (let i = 0; i < 10; i++) {
    catList.push({type: 'millie', src: "https://placecats.com/millie/320/240?" + i});
  }

  return catList;
}

```

```css
div {
  width: 100%;
  overflow: hidden;
}

nav {
  text-align: center;
}

button {
  margin: .25rem;
}

ul,
li {
  list-style: none;
  white-space: nowrap;
}

li {
  display: inline;
  padding: 0.5rem;
}
```

</Sandpack>

اکنون در mount اولیه در StrictMode، کالبک‌های رفرنس همگی راه‌اندازی، پاکسازی، و دوباره راه‌اندازی می‌شوند:

```
...
✅ Adding animal to the map. Total animals: 10
...
❌ Removing animal from the map. Total animals: 0
...
✅ Adding animal to the map. Total animals: 10
```

**این مورد انتظار می‌رود.** حالت سخت‌گیرانه تأیید می‌کند که کالبک‌های رفرنس به‌درستی پاکسازی می‌شوند، بنابراین اندازه هرگز از مقدار مورد انتظار فراتر نمی‌رود. پس از رفع اشکال، هیچ نشت حافظه‌ای وجود ندارد، و تمام قابلیت‌ها همان‌طور که انتظار می‌رود کار می‌کنند.

بدون حالت سخت‌گیرانه، تشخیص اشکال تا زمانی که در برنامه کلیک می‌کردید تا قابلیت‌های خراب را متوجه شوید آسان نبود. حالت سخت‌گیرانه اشکالات را فوراً، قبل از اینکه آن‌ها را به محیط تولید ببرید، آشکار کرد.

---
### رفع هشدارهای منسوخ‌شدگی که توسط حالت سخت‌گیرانه فعال شده‌اند {/*fixing-deprecation-warnings-enabled-by-strict-mode*/}

ری‌اکت هشدار می‌دهد اگر کامپوننتی در هر کجای درخت `<StrictMode>` از یکی از این APIهای منسوخ استفاده کند:

* متدهای چرخهٔ حیات `UNSAFE_` کلاسی مانند [`UNSAFE_componentWillMount`](/reference/react/Component#unsafe_componentwillmount). [جایگزین‌ها را ببینید.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#migrating-from-legacy-lifecycles)

این APIها عمدتاً در [کامپوننت‌های کلاسی](/reference/react/Component) قدیمی استفاده می‌شدند، بنابراین به‌ندرت در برنامه‌های مدرن ظاهر می‌شوند.
