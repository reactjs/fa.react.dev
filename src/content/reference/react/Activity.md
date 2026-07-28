---
title: <Activity>
version: canary
---

<Canary>

**API `<Activity />` در حال حاضر فقط در کانال‌های Canary و Experimental ری‌اکت در دسترس است.**

[دربارهٔ کانال‌های انتشار ری‌اکت اینجا بیشتر بدانید.](/community/versioning-policy#all-release-channels)

</Canary>

<Intro>

`<Activity>` به شما اجازه می‌دهد UI و استیت داخلی فرزندانش را پنهان و بازیابی کنید.

```js
<Activity mode={visibility}>
  <Sidebar />
</Activity>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<Activity>` {/*activity*/}

می‌توانید از Activity برای پنهان کردن بخشی از برنامه‌تان استفاده کنید:

```js [[1, 1, "\\"hidden\\""], [2, 2, "<Sidebar />"], [3, 1, "\\"visible\\""]]
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

وقتی یک مرز Activity <CodeStep step={1}>پنهان (hidden)</CodeStep> است، ری‌اکت <CodeStep step={2}>فرزندان</CodeStep> آن را با استفاده از ویژگی CSS `display: "none"` از نظر بصری پنهان می‌کند. همچنین افکت‌های آن‌ها را تخریب می‌کند و هر اشتراک فعالی را پاکسازی می‌نماید.

در حالی که پنهان است، فرزندان همچنان در پاسخ به پراپس جدید رندر مجدد می‌شوند، اگرچه با اولویت کمتری نسبت به بقیهٔ محتوا.

وقتی مرز دوباره <CodeStep step={3}>مشخص (visible)</CodeStep> می‌شود، ری‌اکت فرزندان را با استیت قبلی بازیابی‌شده آشکار می‌کند و افکت‌های آن‌ها را دوباره ایجاد می‌کند.

به این ترتیب، می‌توان Activity را به‌عنوان سازوکاری برای رندر «فعالیت پس‌زمینه» در نظر گرفت. به جای دور ریختن کامل محتوایی که احتمالاً دوباره مشخص می‌شود، می‌توانید از Activity برای حفظ و بازیابی UI و استیت داخلی آن محتوا استفاده کنید، در حالی که مطمئن می‌شوید محتوای پنهان شما عوارض جانبی ناخواسته ندارد.

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

* `children`: UI که قصد دارید نشان دهید و پنهان کنید.
* `mode`: یک مقدار رشته‌ای، یا `'visible'` یا `'hidden'`. اگر حذف شود، پیش‌فرض `'visible'` است.

#### نکات {/*caveats*/}

- اگر یک Activity درون یک [ViewTransition](/reference/react/ViewTransition) رندر می‌شود، و در نتیجهٔ به‌روزرسانی ناشی از [startTransition](/reference/react/startTransition) مشخص می‌شود، انیمیشن `enter` مربوط به ViewTransition را فعال می‌کند. اگر پنهان شود، انیمیشن `exit` آن را فعال می‌کند.

---

## کاربرد {/*usage*/}

### بازیابی استیت کامپوننت‌های پنهان {/*restoring-the-state-of-hidden-components*/}

در ری‌اکت، وقتی می‌خواهید یک کامپوننت را به‌صورت شرطی نشان دهید یا پنهان کنید، معمولاً آن را بر اساس آن شرط mount یا unmount می‌کنید:

```jsx
{isShowingSidebar && (
  <Sidebar />
)}
```

اما unmount کردن یک کامپوننت استیت داخلی آن را تخریب می‌کند، که همیشه چیز مورد نظر شما نیست.

وقتی به جای آن از یک مرز Activity برای پنهان کردن یک کامپوننت استفاده می‌کنید، ری‌اکت استیت آن را برای بعد «ذخیره» می‌کند:

```jsx
<Activity mode={isShowingSidebar ? "visible" : "hidden"}>
  <Sidebar />
</Activity>
```

این کار امکان پنهان کردن و سپس بازیابی کامپوننت‌ها در استیت قبلی را فراهم می‌کند.

مثال زیر یک نوار کناری با یک بخش قابل بسط دارد. می‌توانید «Overview» را بزنید تا سه زیرمجموعهٔ زیر آن آشکار شود. ناحیهٔ اصلی برنامه نیز دکمه‌ای دارد که نوار کناری را پنهان و نشان می‌دهد.

بخش Overview را باز کنید، و سپس نوار کناری را ببندید و دوباره باز کنید:

<Sandpack>

```js src/App.js active
import { useState } from 'react';
import Sidebar from './Sidebar.js';

export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <>
      {isShowingSidebar && (
        <Sidebar />
      )}

      <main>
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Toggle sidebar
        </button>
        <h1>Main content</h1>
      </main>
    </>
  );
}
```

```js src/Sidebar.js
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <nav>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        Overview
        <span className={`indicator ${isExpanded ? 'down' : 'right'}`}>
          &#9650;
        </span>
      </button>

      {isExpanded && (
        <ul>
          <li>Section 1</li>
          <li>Section 2</li>
          <li>Section 3</li>
        </ul>
      )}
    </nav>
  );
}
```

```css
body { height: 275px; margin: 0; }
#root {
  display: flex;
  gap: 10px;
  height: 100%;
}
nav {
  padding: 10px;
  background: #eee;
  font-size: 14px;
  height: 100%;
}
main {
  padding: 10px;
}
p {
  margin: 0;
}
h1 {
  margin-top: 10px;
}
.indicator {
  margin-left: 4px;
  display: inline-block;
  rotate: 90deg;
}
.indicator.down {
  rotate: 180deg;
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

</Sandpack>

بخش Overview همیشه به‌صورت جمع‌شده شروع می‌شود. چون وقتی `isShowingSidebar` به `false` تبدیل می‌شود، نوار کناری را unmount می‌کنیم، تمام استیت داخلی آن از بین می‌رود.

این یک مورد استفادهٔ عالی برای Activity است. می‌توانیم استیت داخلی نوار کناری را حفظ کنیم، حتی وقتی به‌صورت بصری پنهان می‌شود.

بیایید رندر شرطی نوار کناری خود را با یک مرز Activity جایگزین کنیم:

```jsx {7,9}
// Before
{isShowingSidebar && (
  <Sidebar />
)}

// After
<Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
  <Sidebar />
</Activity>
```

و رفتار جدید را بررسی کنید:

<Sandpack>

```js src/App.js active
import { unstable_Activity as Activity, useState } from 'react';
import Sidebar from './Sidebar.js';

export default function App() {
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <>
      <Activity mode={isShowingSidebar ? 'visible' : 'hidden'}>
        <Sidebar />
      </Activity>

      <main>
        <button onClick={() => setIsShowingSidebar(!isShowingSidebar)}>
          Toggle sidebar
        </button>
        <h1>Main content</h1>
      </main>
    </>
  );
}
```

```js src/Sidebar.js
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <nav>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        Overview
        <span className={`indicator ${isExpanded ? 'down' : 'right'}`}>
          &#9650;
        </span>
      </button>

      {isExpanded && (
        <ul>
          <li>Section 1</li>
          <li>Section 2</li>
          <li>Section 3</li>
        </ul>
      )}
    </nav>
  );
}
```

```css
body { height: 275px; margin: 0; }
#root {
  display: flex;
  gap: 10px;
  height: 100%;
}
nav {
  padding: 10px;
  background: #eee;
  font-size: 14px;
  height: 100%;
}
main {
  padding: 10px;
}
p {
  margin: 0;
}
h1 {
  margin-top: 10px;
}
.indicator {
  margin-left: 4px;
  display: inline-block;
  rotate: 90deg;
}
.indicator.down {
  rotate: 180deg;
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

</Sandpack>

استیت داخلی نوار کناری ما اکنون بازیابی می‌شود، بدون اینکه تغییری در پیاده‌سازی آن ایجاد شده باشد.

---

### بازیابی DOM کامپوننت‌های پنهان {/*restoring-the-dom-of-hidden-components*/}

از آنجا که مرزهای Activity فرزندان خود را با `display: none` پنهان می‌کنند، DOM فرزندانشان نیز هنگام پنهان شدن حفظ می‌شود. این کار آن‌ها را برای حفظ استیت گذرا در بخش‌هایی از UI که کاربر احتمالاً دوباره با آن‌ها تعامل خواهد داشت، عالی می‌کند.

در این مثال، تب Contact یک `<textarea>` دارد که کاربر می‌تواند در آن پیامی وارد کند. اگر متنی وارد کنید، به تب Home بروید، و سپس به تب Contact برگردید، پیام پیش‌نویس از بین می‌رود:

<Sandpack>

```js src/App.js 
import { useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Contact from './Contact.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'contact'}
        onClick={() => setActiveTab('contact')}
      >
        Contact
      </TabButton>

      <hr />

      {activeTab === 'home' && <Home />}
      {activeTab === 'contact' && <Contact />}
    </>
  );
}
```

```js src/TabButton.js
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Contact.js active
export default function Contact() {
  return (
    <div>
      <p>Send me a message!</p>

      <textarea />

      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </div>
  );
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
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

</Sandpack>

این به این دلیل است که ما `Contact` را به‌طور کامل در `App` unmount می‌کنیم. وقتی تب Contact unmount می‌شود، استیت داخلی DOM المان `<textarea>` از بین می‌رود.

اگر به استفاده از یک مرز Activity برای نشان دادن و پنهان کردن تب فعال برویم، می‌توانیم استیت DOM هر تب را حفظ کنیم. متنی وارد کنید و دوباره تب‌ها را عوض کنید، و می‌بینید که پیام پیش‌نویس دیگر بازنشانی نمی‌شود:

<Sandpack>

```js src/App.js active
import { useState, unstable_Activity as Activity } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Contact from './Contact.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('contact');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'contact'}
        onClick={() => setActiveTab('contact')}
      >
        Contact
      </TabButton>

      <hr />

      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'contact' ? 'visible' : 'hidden'}>
        <Contact />
      </Activity>
    </>
  );
}
```

```js src/TabButton.js
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Contact.js 
export default function Contact() {
  return (
    <div>
      <p>Send me a message!</p>

      <textarea />

      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </div>
  );
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
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

</Sandpack>

باز هم، مرز Activity به ما اجازه داد استیت داخلی تب Contact را بدون تغییر در پیاده‌سازی آن حفظ کنیم.

---

### پیش‌رندر محتوایی که احتمالاً مشخص می‌شود {/*pre-rendering-content-thats-likely-to-become-visible*/}

تاکنون دیدیم که چگونه Activity می‌تواند محتوایی را که کاربر با آن تعامل داشته پنهان کند، بدون اینکه استیت گذرای آن محتوا را دور بریزد.

اما می‌توان از مرزهای Activity برای _آماده‌سازی_ محتوایی که کاربر هنوز برای اولین بار ندیده است نیز استفاده کرد:

```jsx [[1, 1, "\\"hidden\\""]]
<Activity mode="hidden">
  <SlowComponent />
</Activity>
```

وقتی یک مرز Activity در رندر اولیهٔ خود <CodeStep step={1}>پنهان (hidden)</CodeStep> است، فرزندان آن روی صفحه قابل مشاهده نخواهند بود — اما همچنان _رندر می‌شوند_، اگرچه با اولویت کمتری نسبت به محتوای قابل مشاهده، و بدون mount کردن افکت‌هایشان.

این _پیش‌رندر_ به فرزندان اجازه می‌دهد هر کد یا داده‌ای که نیاز دارند را از پیش بارگذاری کنند، تا بعداً، وقتی مرز Activity مشخص می‌شود، فرزندان سریع‌تر با زمان‌های بارگذاری کاهش‌یافته ظاهر شوند.

بیایید به یک مثال نگاه کنیم.

در این دمو، تب Posts مقداری داده بارگذاری می‌کند. اگر آن را بزنید، یک fallback ساسپنس را می‌بینید که در حین دریافت داده‌ها نمایش داده می‌شود:

<Sandpack>

```js src/App.js
import { useState, Suspense } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Posts from './Posts.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'posts'}
        onClick={() => setActiveTab('posts')}
      >
        Posts
      </TabButton>

      <hr />

      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'posts' && <Posts />}
      </Suspense>
    </>
  );
}
```

```js src/TabButton.js hidden
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Posts.js
import { use } from 'react';
import { fetchData } from './data.js';

export default function Posts() {
  const posts = use(fetchData('/posts'));

  return (
    <ul className="items">
      {posts.map(post =>
        <li className="item" key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/posts')) {
    return await getPosts();
  } else {
    throw Error('Not implemented');
  }
}

async function getPosts() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  let posts = [];
  for (let i = 0; i < 10; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1)
    });
  }
  return posts;
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
video { width: 300px; margin-top: 10px; aspect-ratio: 16/9; }
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

</Sandpack>

این به این دلیل است که `App` تا زمانی که تب `Posts` فعال نشود، آن را mount نمی‌کند.

اگر `App` را به‌روز کنیم تا از یک مرز Activity برای نشان دادن و پنهان کردن تب فعال استفاده کند، `Posts` هنگام اولین بارگذاری برنامه پیش‌رندر می‌شود و می‌تواند داده‌هایش را قبل از مشخص شدن دریافت کند.

اکنون تب Posts را کلیک کنید:

<Sandpack>

```js src/App.js
import { useState, Suspense, unstable_Activity as Activity } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Posts from './Posts.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'posts'}
        onClick={() => setActiveTab('posts')}
      >
        Posts
      </TabButton>

      <hr />

      <Suspense fallback={<h1>🌀 Loading...</h1>}>
        <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
          <Home />
        </Activity>
        <Activity mode={activeTab === 'posts' ? 'visible' : 'hidden'}>
          <Posts />
        </Activity>
      </Suspense>
    </>
  );
}
```

```js src/TabButton.js hidden
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Posts.js
import { use } from 'react';
import { fetchData } from './data.js';

export default function Posts() {
  const posts = use(fetchData('/posts'));

  return (
    <ul className="items">
      {posts.map(post =>
        <li className="item" key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/posts')) {
    return await getPosts();
  } else {
    throw Error('Not implemented');
  }
}

async function getPosts() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  let posts = [];
  for (let i = 0; i < 10; i++) {
    posts.push({
      id: i,
      title: 'Post #' + (i + 1)
    });
  }
  return posts;
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
video { width: 300px; margin-top: 10px; aspect-ratio: 16/9; }
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

</Sandpack>

`Posts` به لطف مرز Activity پنهان، توانست خود را برای رندر سریع‌تر آماده کند.

---

پیش‌رندر کامپوننت‌ها با مرزهای Activity پنهان روش قدرتمندی برای کاهش زمان‌های بارگذاری بخش‌هایی از UI است که کاربر احتمالاً بعداً با آن‌ها تعامل خواهد داشت.

<Note>

**فقط منابع دادهٔ فعال‌شده با ساسپنس در حین پیش‌رندر دریافت می‌شوند.** این منابع شامل موارد زیر هستند:

- دریافت داده با فریم‌ورک‌های فعال‌شده با ساسپنس مانند [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) و [Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
- بارگذاری تنبل کد کامپوننت با [`lazy`](/reference/react/lazy)
- خواندن مقدار یک Promise کش‌شده با [`use`](/reference/react/use)

Activity داده‌ای را که درون یک افکت دریافت می‌شود **شناسایی نمی‌کند**.

روش دقیق بارگذاری داده در کامپوننت `Posts` بالا به فریم‌ورک شما بستگی دارد. اگر از یک فریم‌ورک فعال‌شده با ساسپنس استفاده می‌کنید، جزئیات را در مستندات دریافت دادهٔ آن پیدا خواهید کرد.

دریافت دادهٔ فعال‌شده با ساسپنس بدون استفاده از یک فریم‌ورک نظر‌بخش هنوز پشتیبانی نمی‌شود. الزامات پیاده‌سازی یک منبع دادهٔ فعال‌شده با ساسپنس ناپایدار و مستند نشده‌اند. یک API رسمی برای یکپارچه‌سازی منابع داده با ساسپنس در نسخهٔ آیندهٔ ری‌اکت منتشر خواهد شد.

</Note>

---

### تسریع تعاملات در حین بارگذاری صفحه {/*speeding-up-interactions-during-page-load*/}

ری‌اکت شامل یک بهینه‌سازی عملکرد زیرپوستی به نام Selective Hydration است. این بهینه‌سازی با هیدراته کردن HTML اولیهٔ برنامه‌تان _در قطعات_ کار می‌کند و امکان می‌دهد برخی کامپوننت‌ها حتی اگر کامپوننت‌های دیگر روی صفحه هنوز کد یا داده‌هایشان را بارگذاری نکرده باشند، تعاملی شوند.

مرزهای ساسپنس در Selective Hydration مشارکت می‌کنند، زیرا به‌طور طبیعی درخت کامپوننت شما را به واحدهایی تقسیم می‌کنند که از یکدیگر مستقل هستند:

```jsx
function Page() {
  return (
    <>
      <MessageComposer />

      <Suspense fallback="Loading chats...">
        <Chats />
      </Suspense>
    </>
  )
}
```

در اینجا، `MessageComposer` می‌تواند در طول رندر اولیهٔ صفحه به‌طور کامل هیدراته شود، حتی قبل از اینکه `Chats` mount شود و شروع به دریافت داده‌هایش کند.

بنابراین با شکستن درخت کامپوننت به واحدهای مجزا، ساسپنس به ری‌اکت اجازه می‌دهد HTML رندر‌شده در سرور برنامه‌تان را به‌صورت قطعه‌قطعه هیدراته کند و امکان می‌دهد بخش‌هایی از برنامه‌تان در سریع‌ترین زمان ممکن تعاملی شوند.

اما صفحاتی که از ساسپنس استفاده نمی‌کنند چطور؟

این مثال تب‌ها را در نظر بگیرید:

```jsx
function Page() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <TabButton onClick={() => setActiveTab('home')}>
        Home
      </TabButton>
      <TabButton onClick={() => setActiveTab('video')}>
        Video
      </TabButton>

      {activeTab === 'home' && (
        <Home />
      )}
      {activeTab === 'video' && (
        <Video />
      )}
    </>
  )
}
```

در اینجا، ری‌اکت باید کل صفحه را یکباره هیدراته کند. اگر `Home` یا `Video` کندتر رندر شوند، می‌توانند باعث شوند دکمه‌های تب در حین هیدراته شدن بی‌پاسخ به نظر برسند.

افزودن ساسپنس حول تب فعال این مشکل را حل می‌کرد:

```jsx {13,20}
function Page() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <TabButton onClick={() => setActiveTab('home')}>
        Home
      </TabButton>
      <TabButton onClick={() => setActiveTab('video')}>
        Video
      </TabButton>

      <Suspense fallback={<Placeholder />}>
        {activeTab === 'home' && (
          <Home />
        )}
        {activeTab === 'video' && (
          <Video />
        )}
      </Suspense>
    </>
  )
}
```

...اما همچنین UI را تغییر می‌داد، زیرا fallback `Placeholder` در رندر اولیه نمایش داده می‌شد.

در عوض، می‌توانیم از Activity استفاده کنیم. از آنجا که مرزهای Activity فرزندانشان را نشان می‌دهند و پنهان می‌کنند، به‌طور طبیعی درخت کامپوننت را به واحدهای مستقل تقسیم می‌کنند. و درست مانند ساسپنس، این ویژگی به آن‌ها اجازه می‌دهد در Selective Hydration مشارکت کنند.

بیایید مثال خود را به‌روز کنیم تا از مرزهای Activity حول تب فعال استفاده کند:

```jsx {13-18}
function Page() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <TabButton onClick={() => setActiveTab('home')}>
        Home
      </TabButton>
      <TabButton onClick={() => setActiveTab('video')}>
        Video
      </TabButton>

      <Activity mode={activeTab === "home" ? "visible" : "hidden"}>
        <Home />
      </Activity>
      <Activity mode={activeTab === "video" ? "visible" : "hidden"}>
        <Video />
      </Activity>
    </>
  )
}
```

اکنون HTML اولیهٔ رندر‌شده در سرور ما مانند نسخهٔ اصلی به نظر می‌رسد، اما به لطف Activity، ری‌اکت می‌تواند دکمه‌های تب را قبل از اینکه حتی `Home` یا `Video` را mount کند، هیدراته کند.

---

بنابراین، علاوه بر پنهان کردن و نشان دادن محتوا، مرزهای Activity به بهبود عملکرد برنامه‌تان در حین هیدراته شدن کمک می‌کنند با این که به ری‌اکت می‌گویند کدام بخش‌های صفحه می‌توانند به‌طور مستقل تعاملی شوند.

و حتی اگر صفحهٔ شما هرگز بخشی از محتوایش را پنهان نکند، همچنان می‌توانید مرزهای Activity همیشه قابل‌مشاهده اضافه کنید تا عملکرد هیدراته شدن را بهبود ببخشید:

```jsx
function Page() {
  return (
    <>
      <Post />

      <Activity>
        <Comments />
      </Activity>
    </>
  );
} 
```

---

## رفع اشکال {/*troubleshooting*/}

### کامپوننت‌های پنهان من عوارض جانبی ناخواسته دارند {/*my-hidden-components-have-unwanted-side-effects*/}

یک مرز Activity محتوای خود را با تنظیم `display: none` روی فرزندانش و پاکسازی هر افکتی که دارند، پنهان می‌کند. بنابراین، اکثر کامپوننت‌های خوش‌رفتار ری‌اکت که عوارض جانبی‌شان را به‌درستی پاکسازی می‌کنند، در برابر پنهان شدن توسط Activity مقاوم خواهند بود.

اما شرایطی _وجود دارد_ که در آن‌ها یک کامپوننت پنهان متفاوت از یک کامپوننت unmount‌شده رفتار می‌کند. به‌طور خاص، از آنجا که DOM یک کامپوننت پنهان تخریب نمی‌شود، هر عارضهٔ جانبی ناشی از آن DOM باقی می‌ماند، حتی پس از پنهان شدن کامپوننت.

به‌عنوان مثال، یک تگ `<video>` را در نظر بگیرید. معمولاً نیاز به هیچ پاکسازی ندارد، زیرا حتی اگر در حال پخش یک ویدیو باشید، unmount کردن تگ، پخش ویدیو و صدا را در مرورگر متوقف می‌کند. ویدیو را پخش کنید و سپس در این دمو Home را بزنید:

<Sandpack>

```js src/App.js active
import { useState } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>

      <hr />

      {activeTab === 'home' && <Home />}
      {activeTab === 'video' && <Video />}
    </>
  );
}
```

```js src/TabButton.js hidden
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Video.js 
export default function Video() {
  return (
    <video
      // 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
      controls
      playsInline
    />

  );
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
video { width: 300px; margin-top: 10px; aspect-ratio: 16/9; }
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

</Sandpack>

ویدیو همان‌طور که انتظار می‌رود متوقف می‌شود.

اکنون، فرض کنید می‌خواستیم کد زمانی را که کاربر آخرین بار تماشا کرده حفظ کنیم، تا وقتی به ویدیو برمی‌گردد، از ابتدا دوباره شروع نشود.

این یک مورد استفادهٔ عالی برای Activity است!

بیایید `App` را به‌روز کنیم تا به جای unmount کردن، تب غیرفعال را با یک مرز Activity پنهان کند، و ببینیم این دمو این بار چگونه رفتار می‌کند:

<Sandpack>

```js src/App.js active
import { useState, unstable_Activity as Activity } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>

      <hr />

      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'video' ? 'visible' : 'hidden'}>
        <Video />
      </Activity>
    </>
  );
}
```

```js src/TabButton.js hidden
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Video.js 
export default function Video() {
  return (
    <video
      controls
      playsInline
      // 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    />

  );
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
video { width: 300px; margin-top: 10px; aspect-ratio: 16/9; }
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

</Sandpack>

وای! ویدیو و صدا حتی پس از پنهان شدن همچنان پخش می‌شوند، زیرا المان `<video>` تب همچنان در DOM است.

برای رفع این مشکل، می‌توانیم یک افکت با تابع پاکسازی که ویدیو را متوقف می‌کند اضافه کنیم:

```jsx {2,4-10,14}
export default function VideoTab() {
  const ref = useRef();

  useLayoutEffect(() => {
    const videoRef = ref.current;

    return () => {
      videoRef.pause()
    }
  }, []);

  return (
    <video
      ref={ref}
      controls
      playsInline
      src="..."
    />

  );
}
```

ما به جای `useEffect` از `useLayoutEffect` استفاده می‌کنیم زیرا از نظر مفهومی کد پاکسازی به پنهان شدن بصری UI کامپوننت مرتبط است. اگر از یک افکت معمولی استفاده می‌کردیم، کد می‌توانست توسط (مثلاً) یک مرز ساسپنس دوباره متوقف‌شونده یا یک View Transition به تأخیر بیفتد.

بیایید رفتار جدید را ببینیم. ویدیو را پخش کنید، به تب Home بروید، سپس به تب Video برگردید:

<Sandpack>

```js src/App.js active
import { useState, unstable_Activity as Activity } from 'react';
import TabButton from './TabButton.js';
import Home from './Home.js';
import Video from './Video.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <>
      <TabButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
      >
        Home
      </TabButton>
      <TabButton
        isActive={activeTab === 'video'}
        onClick={() => setActiveTab('video')}
      >
        Video
      </TabButton>

      <hr />

      <Activity mode={activeTab === 'home' ? 'visible' : 'hidden'}>
        <Home />
      </Activity>
      <Activity mode={activeTab === 'video' ? 'visible' : 'hidden'}>
        <Video />
      </Activity>
    </>
  );
}
```

```js src/TabButton.js hidden
export default function TabButton({ onClick, children, isActive }) {
  if (isActive) {
    return <b>{children}</b>
  }

  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```js src/Home.js
export default function Home() {
  return (
    <p>Welcome to my profile!</p>
  );
}
```

```js src/Video.js 
import { useRef, useLayoutEffect } from 'react';

export default function Video() {
  const ref = useRef();

  useLayoutEffect(() => {
    const videoRef = ref.current

    return () => {
      videoRef.pause()
    };
  }, [])

  return (
    <video
      ref={ref}
      controls
      playsInline
      // 'Big Buck Bunny' licensed under CC 3.0 by the Blender foundation. Hosted by archive.org
      src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    />

  );
}
```

```css
body { height: 275px; }
button { margin-right: 10px }
b { display: inline-block; margin-right: 10px; }
.pending { color: #777; }
video { width: 300px; margin-top: 10px; aspect-ratio: 16/9; }
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

</Sandpack>

عالی کار می‌کند! تابع پاکسازی ما تضمین می‌کند که ویدیو اگر تا به حال توسط یک مرز Activity پنهان شود، متوقف می‌شود، و حتی بهتر، از آنجا که تگ `<video>` هرگز تخریب نمی‌شود، کد زمانی حفظ می‌شود، و خود ویدیو نیازی به مقداردهی یا بارگذاری مجدد ندارد وقتی کاربر برای ادامهٔ تماشا برمی‌گردد.

این یک مثال عالی از استفاده از Activity برای حفظ استیت گذرای DOM برای بخش‌هایی از UI است که پنهان می‌شوند، اما کاربر احتمالاً به‌زودی دوباره با آن‌ها تعامل خواهد داشت.

---

مثال ما نشان می‌دهد که برای تگ‌های خاصی مانند `<video>`، unmount کردن و پنهان کردن رفتار متفاوتی دارند. اگر یک کامپوننت DOMی رندر می‌کند که عارضهٔ جانبی دارد، و می‌خواهید از آن عارضهٔ جانبی هنگام پنهان شدن توسط یک مرز Activity جلوگیری کنید، یک افکت با تابع بازگشتی برای پاکسازی آن اضافه کنید.

شایع‌ترین موارد این از تگ‌های زیر خواهند بود:

  - `<video>`
  - `<audio>`
  - `<iframe>`

با این حال، معمولاً اکثر کامپوننت‌های ری‌اکت شما باید از قبل در برابر پنهان شدن توسط یک مرز Activity مقاوم باشند. و از نظر مفهومی، باید Activityهای «پنهان» را به‌عنوان unmount‌شده در نظر بگیرید.

برای کشف زودهنگام سایر افکت‌هایی که پاکسازی مناسب ندارند، که نه‌تنها برای مرزهای Activity بلکه برای بسیاری از رفتارهای دیگر در ری‌اکت مهم است، توصیه می‌کنیم از [`<StrictMode>`](/reference/react/StrictMode) استفاده کنید.

---


### کامپوننت‌های پنهان من افکت‌هایی دارند که اجرا نمی‌شوند {/*my-hidden-components-have-effects-that-arent-running*/}

وقتی یک `<Activity>` «پنهان» است، تمام افکت‌های فرزندانش پاکسازی می‌شوند. از نظر مفهومی، فرزندان unmount می‌شوند، اما ری‌اکت استیت آن‌ها را برای بعد ذخیره می‌کند. این یک ویژگی Activity است زیرا به این معناست که اشتراک‌ها برای بخش‌های پنهان UI فعال نخواهند بود، که مقدار کار لازم برای محتوای پنهان را کاهش می‌دهد.

اگر به mount شدن یک افکت برای پاکسازی عوارض جانبی یک کامپوننت تکیه می‌کنید، افکت را بازنویسی کنید تا کار را در تابع پاکسازی بازگشتی انجام دهد.

برای یافتن زودهنگام افکت‌های مشکل‌ساز، توصیه می‌کنیم [`<StrictMode>`](/reference/react/StrictMode) را اضافه کنید که به‌طور زودهنگام unmount و mountهای Activity را برای گرفتن هر عارضهٔ جانبی غیرمنتظره انجام می‌دهد.
