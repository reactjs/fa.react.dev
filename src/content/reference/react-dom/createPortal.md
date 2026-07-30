---
title: createPortal
---

<Intro>

`createPortal` به شما اجازه می‌دهد برخی فرزندان را در بخش متفاوتی از DOM رندر کنید.


```js
<div>
  <SomeComponent />
  {createPortal(children, domNode, key?)}
</div>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `createPortal(children, domNode, key?)` {/*createportal*/}

برای ایجاد یک پورتال، `createPortal` را فراخوانی کنید، و برخی JSX و گرهٔ DOM که باید در آن رندر شود را پاس دهید:

```js
import { createPortal } from 'react-dom';

// ...

<div>
  <p>This child is placed in the parent div.</p>
  {createPortal(
    <p>This child is placed in the document body.</p>,
    document.body
  )}
</div>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

یک پورتال فقط قرارگیری فیزیکی گرهٔ DOM را تغییر می‌دهد. در هر طریق دیگر، JSX‌ای که در پورتال رندر می‌کنید به‌عنوان گرهٔ فرزند کامپوننت ری‌اکت که آن را رندر می‌کند عمل می‌کند. مثلاً، فرزند می‌تواند به کانتکست ارائه‌شده توسط درخت والد دسترسی داشته باشد، و رویدادها از فرزندان به والدین بر اساس درخت ری‌اکت بالا می‌روند.

#### پارامترها {/*parameters*/}

* `children`: هر چیزی که با ری‌اکت قابل رندر باشد، مانند یک تکه JSX (مثلاً `<div />` یا `<SomeComponent />`)، یک [فرگمنت](/reference/react/Fragment) (`<>...</>`)، یک رشته یا عدد، یا آرایه‌ای از این‌ها.

* `domNode`: یک گرهٔ DOM، مانند آنهایی که توسط `document.getElementById()` برگردانده می‌شوند. گره باید از قبل وجود داشته باشد. پاس‌دادن گرهٔ DOM متفاوت در طول یک به‌روزرسانی باعث بازسازی محتوای پورتال می‌شود.

* **اختیاری** `key`: یک رشته یا عدد یکتا که به‌عنوان [کلید](/learn/rendering-lists#keeping-list-items-in-order-with-key) پورتال استفاده می‌شود.

#### مقادیر بازگشتی {/*returns*/}

`createPortal` یک گرهٔ ری‌اکت برمی‌گرداند که می‌تواند در JSX include شود یا از یک کامپوننت ری‌اکت بازگردانده شود. اگر ری‌اکت آن را در خروجی رندر پیدا کند، `children` ارائه‌شده را درون `domNode` ارائه‌شده قرار می‌دهد.

#### نکات {/*caveats*/}

* رویدادها از پورتال‌ها بر اساس درخت ری‌اکت نه درخت DOM انتشار می‌یابند. مثلاً، اگر داخل یک پورتال کلیک کنید، و پورتال در `<div onClick>` بپیچیده شده باشد، آن هندلر `onClick` فعال خواهد شد. اگر این مشکل‌ساز می‌شود، یا انتشار رویداد را از درون پورتال متوقف کنید، یا خود پورتال را در درخت ری‌اکت به بالا منتقل کنید.

---

## استفاده {/*usage*/}

### رندر در بخش متفاوتی از DOM {/*rendering-to-a-different-part-of-the-dom*/}

*پورتال‌ها* به کامپوننت‌های شما اجازه می‌دهند برخی از فرزندانشان را در مکان متفاوتی در DOM رندر کنند. این به بخشی از کامپوننت شما اجازه می‌دهد از هر کانتینری که ممکن است در آن باشد «فرار» کند. مثلاً، یک کامپوننت می‌تواند یک دیالوگ modal یا tooltipی را نمایش دهد که بالاتر و بیرون از بقیهٔ صفحه ظاهر می‌شود.

برای ایجاد یک پورتال، نتیجهٔ `createPortal` را با <CodeStep step={1}>برخی JSX</CodeStep> و <CodeStep step={2}>گرهٔ DOM که باید در آن قرار گیرد</CodeStep> رندر کنید:

```js [[1, 8, "<p>This child is placed in the document body.</p>"], [2, 9, "document.body"]]
import { createPortal } from 'react-dom';

function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  );
}
```

ری‌اکت گره‌های DOM برای <CodeStep step={1}>JSX‌ای که پاس داده‌اید</CodeStep> را درون <CodeStep step={2}>گرهٔ DOM که ارائه کرده‌اید</CodeStep> قرار می‌دهد.

بدون پورتال، دومین `<p>` درون `<div>` والد قرار می‌گرفت، اما پورتال آن را به [`document.body`](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) «دوربری» کرد:

<Sandpack>

```js
import { createPortal } from 'react-dom';

export default function MyComponent() {
  return (
    <div style={{ border: '2px solid black' }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  );
}
```

</Sandpack>

توجه کنید که پاراگراف دوم چطور به‌صورت بصری بیرون از `<div>` والد با border ظاهر می‌شود. اگر ساختار DOM را با ابزارهای توسعه‌دهنده بررسی کنید، خواهید دید که دومین `<p>` مستقیماً درون `<body>` قرار گرفته است:

```html {4-6,9}
<body>
  <div id="root">
    ...
      <div style="border: 2px solid black">
        <p>This child is placed inside the parent div.</p>
      </div>
    ...
  </div>
  <p>This child is placed in the document body.</p>
</body>
```

یک پورتال فقط قرارگیری فیزیکی گرهٔ DOM را تغییر می‌دهد. در هر طریق دیگر، JSX‌ای که در پورتال رندر می‌کنید به‌عنوان گرهٔ فرزند کامپوننت ری‌اکت که آن را رندر می‌کند عمل می‌کند. مثلاً، فرزند می‌تواند به کانتکست ارائه‌شده توسط درخت والد دسترسی داشته باشد، و رویدادها همچنان از فرزندان به والدین بر اساس درخت ری‌اکت بالا می‌روند.

---

### رندر یک دیالوگ modal با یک پورتال {/*rendering-a-modal-dialog-with-a-portal*/}

می‌توانید از پورتال برای ایجاد یک دیالوگ modal که بالای بقیهٔ صفحه شناور است استفاده کنید، حتی اگر کامپوننتی که دیالوگ را احضار می‌کند داخل کانتینری با `overflow: hidden` یا سایر استایل‌هایی که با دیالوگ تداخل دارند باشد.

در این مثال، دو کانتینر استایل‌هایی دارند که دیالوگ modal را مختل می‌کنند، اما آن یکی که در پورتال رندر می‌شود تحت تأثیر قرار نمی‌گیرد زیرا، در DOM، modal درون المان‌های JSX والد قرار ندارد.

<Sandpack>

```js src/App.js active
import NoPortalExample from './NoPortalExample';
import PortalExample from './PortalExample';

export default function App() {
  return (
    <>
      <div className="clipping-container">
        <NoPortalExample  />
      </div>
      <div className="clipping-container">
        <PortalExample />
      </div>
    </>
  );
}
```

```js src/NoPortalExample.js
import { useState } from 'react';
import ModalContent from './ModalContent.js';

export default function NoPortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal without a portal
      </button>
      {showModal && (
        <ModalContent onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
```

```js src/PortalExample.js active
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent.js';

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
```

```js src/ModalContent.js
export default function ModalContent({ onClose }) {
  return (
    <div className="modal">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```


```css src/styles.css
.clipping-container {
  position: relative;
  border: 1px solid #aaa;
  margin-bottom: 12px;
  padding: 12px;
  width: 250px;
  height: 80px;
  overflow: hidden;
}

.modal {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  background-color: white;
  border: 2px solid rgb(240, 240, 240);
  border-radius: 12px;
  position:  absolute;
  width: 250px;
  top: 70px;
  left: calc(50% - 125px);
  bottom: 70px;
}
```

</Sandpack>

<Pitfall>

مهم است مطمئن شوید که اپلیکیشن شما هنگام استفاده از پورتال‌ها دسترس‌پذیر است. مثلاً، ممکن است نیاز داشته باشید تمرکز صفحه‌کلید را مدیریت کنید تا کاربر بتواند به‌طور طبیعی تمرکز را به و از پورتال جابجا کند.

هنگام ایجاد modalها از [WAI-ARIA Modal Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal) پیروی کنید. اگر از یک پکیج community استفاده می‌کنید، اطمینان حاصل کنید که دسترس‌پذیر است و از این دستورالعمل‌ها پیروی می‌کند.

</Pitfall>

---

### رندر کامپوننت‌های ری‌اکت در markup سرور غیرری‌اکتی {/*rendering-react-components-into-non-react-server-markup*/}

پورتال‌ها می‌توانند مفید باشند اگر root ری‌اکت شما فقط بخشی از یک صفحهٔ استاتیک یا server-rendered باشد که با ری‌اکت ساخته نشده. مثلاً، اگر صفحهٔ شما با یک فریم‌ورک سرور مانند Rails ساخته شده، می‌توانید در مناطق استاتیک مانند نوارهای کناری، مناطق تعاملی ایجاد کنید. در مقایسه با داشتن [چندین root ری‌اکت جداگانه](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react)، پورتال‌ها به شما اجازه می‌دهند اپلیکیشن را به‌عنوان یک درخت ری‌اکت منفرد با استیت مشترک در نظر بگیرید حتی اگر بخش‌های آن به بخش‌های متفاوتی از DOM رندر می‌شوند.

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <h1>Welcome to my hybrid app</h1>
    <div class="parent">
      <div class="sidebar">
        This is server non-React markup
        <div id="sidebar-content"></div>
      </div>
      <div id="root"></div>
    </div>
  </body>
</html>
```

```js src/index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

```js src/App.js active
import { createPortal } from 'react-dom';

const sidebarContentEl = document.getElementById('sidebar-content');

export default function App() {
  return (
    <>
      <MainContent />
      {createPortal(
        <SidebarContent />,
        sidebarContentEl
      )}
    </>
  );
}

function MainContent() {
  return <p>This part is rendered by React</p>;
}

function SidebarContent() {
  return <p>This part is also rendered by React!</p>;
}
```

```css
.parent {
  display: flex;
  flex-direction: row;
}

#root {
  margin-top: 12px;
}

.sidebar {
  padding:  12px;
  background-color: #eee;
  width: 200px;
  height: 200px;
  margin-right: 12px;
}

#sidebar-content {
  margin-top: 18px;
  display: block;
  background-color: white;
}

p {
  margin: 0;
}
```

</Sandpack>

---

### رندر کامپوننت‌های ری‌اکت در گره‌های DOM غیرری‌اکتی {/*rendering-react-components-into-non-react-dom-nodes*/}

شما همچنین می‌توانید از پورتال برای مدیریت محتوای یک گرهٔ DOM که بیرون از ری‌اکت مدیریت می‌شود استفاده کنید. مثلاً، فرض کنید در حال یکپارچه‌سازی با یک ویجت نقشهٔ غیرری‌اکتی هستید و می‌خواهید محتوای ری‌اکت را درون یک popup رندر کنید. برای این کار، یک متغیر استیت `popupContainer` را برای ذخیرهٔ گرهٔ DOM که قرار است در آن رندر کنید تعریف کنید:

```js
const [popupContainer, setPopupContainer] = useState(null);
```

وقتی ویجت شخص ثالث را ایجاد می‌کنید، گرهٔ DOM برگردانده‌شده توسط ویجت را ذخیره کنید تا بتوانید در آن رندر کنید:

```js {5-6}
useEffect(() => {
  if (mapRef.current === null) {
    const map = createMapWidget(containerRef.current);
    mapRef.current = map;
    const popupDiv = addPopupToMapWidget(map);
    setPopupContainer(popupDiv);
  }
}, []);
```

این به شما اجازه می‌دهد از `createPortal` برای رندر محتوای ری‌اکت در `popupContainer` استفاده کنید به‌محض اینکه در دسترس قرار گرفت:

```js {3-6}
return (
  <div style={{ width: 250, height: 250 }} ref={containerRef}>
    {popupContainer !== null && createPortal(
      <p>Hello from React!</p>,
      popupContainer
    )}
  </div>
);
```

در اینجا یک مثال کامل وجود دارد که می‌توانید با آن کار کنید:

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

{/* TODO(@poteto) - fixed by https://github.com/facebook/react/pull/34462. need a new release */}
```js {expectedErrors: {'react-compiler': [15]}} src/App.js
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createMapWidget, addPopupToMapWidget } from './map-widget.js';

export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [popupContainer, setPopupContainer] = useState(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <div style={{ width: 250, height: 250 }} ref={containerRef}>
      {popupContainer !== null && createPortal(
        <p>Hello from React!</p>,
        popupContainer
      )}
    </div>
  );
}
```

```js src/map-widget.js
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export function createMapWidget(containerDomNode) {
  const map = L.map(containerDomNode);
  map.setView([0, 0], 0);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  return map;
}

export function addPopupToMapWidget(map) {
  const popupDiv = document.createElement('div');
  L.popup()
    .setLatLng([0, 0])
    .setContent(popupDiv)
    .openOn(map);
  return popupDiv;
}
```

```css
button { margin: 5px; }
```

</Sandpack>
