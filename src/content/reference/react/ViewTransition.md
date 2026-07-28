---
title: <ViewTransition>
version: experimental
---

<Experimental>

**این API آزمایشی است و هنوز در یک نسخهٔ پایدار ری‌اکت در دسترس نیست.**

می‌توانید آن را با ارتقای پکیج‌های ری‌اکت به جدیدترین نسخهٔ آزمایشی امتحان کنید:

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

نسخه‌های آزمایشی ری‌اکت ممکن است شامل باگ باشند. از آن‌ها در production استفاده نکنید.

</Experimental>

<Intro>

`<ViewTransition>` به شما اجازه می‌دهد المان‌هایی که داخل یک ترنزیشن به‌روز می‌شوند را انیمیشن کنید.


```js
import {unstable_ViewTransition as ViewTransition} from 'react';

<ViewTransition>
  <div>...</div>
</ViewTransition>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<ViewTransition>` {/*viewtransition*/}

المان‌ها را در `<ViewTransition>` بپیچید تا وقتی داخل یک [ترنزیشن](/reference/react/useTransition) به‌روز می‌شوند، انیمیشن شوند. ری‌اکت از ابتکارات (heuristics) زیر استفاده می‌کند تا مشخص کند آیا یک View Transition برای یک انیمیشن فعال می‌شود:

- `enter`: اگر خود یک `ViewTransition` در این ترنزیشن درج شود، این حالت فعال می‌شود.
- `exit`: اگر خود یک `ViewTransition` در این ترنزیشن حذف شود، این حالت فعال می‌شود.
- `update`: اگر یک `ViewTransition` هر جهش DOM داخل خود داشته باشد که ری‌اکت در حال انجام آن است (مانند تغییر یک پراپس) یا اگر خود مرز `ViewTransition` به دلیل یک خواهرخواند (sibling) فوری تغییر اندازه یا موقعیت دهد. اگر `ViewTransition`‌های تودرتو وجود داشته باشند، جهش به آن‌ها اعمال می‌شود و نه به والد.
- `share`: اگر یک `ViewTransition` نام‌دار داخل یک زیردرخت حذف‌شده باشد و یک `ViewTransition` نام‌دار دیگر با همان نام بخشی از یک زیردرخت درج‌شده در همان ترنزیشن باشد، آن‌ها یک Shared Element Transition تشکیل می‌دهند و از حذف‌شده به درج‌شده انیمیشن می‌شود.

به‌طور پیش‌فرض، `<ViewTransition>` با یک cross-fade نرم (view transition پیش‌فرض مرورگر) انیمیشن می‌شود. می‌توانید انیمیشن را با ارائهٔ یک [View Transition Class](#view-transition-class) به کامپوننت `<ViewTransition>` سفارشی کنید. می‌توانید انیمیشن‌ها را برای هر نوع trigger سفارشی کنید (به [استایل‌دهی View Transitions](#styling-view-transitions) مراجعه کنید).

<DeepDive>

#### `<ViewTransition>` چگونه کار می‌کند؟ {/*how-does-viewtransition-work*/}

در زیرساخت، ری‌اکت `view-transition-name` را به استایل‌های inline نزدیک‌ترین نود DOM تودرتوی داخل کامپوننت `<ViewTransition>` اعمال می‌کند. اگر چندین نود DOM خواهرخواند مانند `<ViewTransition><div /><div /></ViewTransition>` وجود داشته باشد، ری‌اکت یک پسوند به نام اضافه می‌کند تا هر کدام را یکتا کند اما از نظر مفهومی آن‌ها بخشی از یک کل هستند. ری‌اکت این کار را به‌شکل eager انجام نمی‌دهد بلکه فقط در زمانی که آن مرز باید در یک انیمیشن شرکت کند.

ری‌اکت به‌طور خودکار `startViewTransition` را خودش در پس‌زمینه فراخوانی می‌کند بنابراین هرگز نباید این کار را خودتان انجام دهید. در واقع، اگر چیز دیگری روی صفحه در حال اجرای یک ViewTransition باشد، ری‌اکت آن را قطع می‌کند. بنابراین توصیه می‌شود از خود ری‌اکت برای هماهنگ‌سازی این‌ها استفاده کنید. اگر در گذشته روش‌های دیگری برای trigger کردن ViewTransition‌ها داشتید، توصیه می‌کنیم به روش داخلی مهاجرت کنید.

اگر ViewTransition‌های دیگری از ری‌اکت در حال اجرا هستند، ری‌اکت قبل از شروع بعدی منتظر می‌ماند تا آن‌ها تمام شوند. با این حال، مهم است که اگر چندین به‌روزرسانی در حالی که اولی در حال اجراست اتفاق بیفتند، همه در یک دسته‌بندی (Batching) می‌شوند. اگر A->B را شروع کنید. سپس در این مدت یک به‌روزرسانی برای رفتن به C و سپس D دریافت کنید. وقتی اولین انیمیشن A->B تمام شود، بعدی از B->D انیمیشن خواهد شد.

چرخهٔ حیات `getSnapshotBeforeUpdate` قبل از `startViewTransition` فراخوانی می‌شود و برخی `view-transition-name` در همان زمان به‌روز می‌شوند.

سپس ری‌اکت `startViewTransition` را فراخوانی می‌کند. داخل `updateCallback`، ری‌اکت:

- جهش‌های خود را به DOM اعمال می‌کند و useInsertionEffect‌ها را فراخوانی می‌کند.
- منتظر می‌ماند تا فونت‌ها بارگذاری شوند.
- componentDidMount، componentDidUpdate، useLayoutEffect و رفرنس‌ها را فراخوانی می‌کند.
- منتظر می‌ماند تا هر Navigation در انتظار تمام شود.
- سپس ری‌اکت هر تغییر در layout را اندازه‌گیری می‌کند تا ببیند کدام مرزها نیاز به انیمیشن دارند.

پس از resolve شدن Promise آمادهٔ `startViewTransition`، ری‌اکت `view-transition-name` را برمی‌گرداند. سپس ری‌اکت کالبک‌های `onEnter`، `onExit`، `onUpdate` و `onShare` را فراخوانی می‌کند تا کنترل برنامه‌نویسی دستی روی انیمیشن‌ها ممکن شود. این پس از آنکه انیمیشن‌های پیش‌فرض داخلی از قبل محاسبه شده‌اند اتفاق می‌افتد.

اگر یک `flushSync` در وسط این دنباله اتفاق بیفتد، ری‌اکت ترنزیشن را رد می‌کند زیرا به این وابسته است که بتواند به‌صورت همگام تکمیل شود.

پس از resolve شدن Promise پایان‌یافتهٔ `startViewTransition`، ری‌اکت `useEffect` را فراخوانی می‌کند. این کار از تداخل آن‌ها با عملکرد انیمیشن جلوگیری می‌کند. با این حال، این تضمینی نیست زیرا اگر یک `setState` دیگر در حالی که انیمیشن در حال اجراست اتفاق بیفتد، همچنان باید `useEffect` را زودتر فراخوانی کند تا تضمین‌های ترتیبی حفظ شوند.

</DeepDive>

#### پراپس {/*props*/}

به‌طور پیش‌فرض، `<ViewTransition>` با یک cross-fade نرم انیمیشن می‌شود. می‌توانید انیمیشن را سفارشی کنید، یا یک shared element transition را با این پراپس‌ها مشخص کنید:

* **اختیاری** `enter`: یک رشته یا شیء. [View Transition Class](#view-transition-class) برای اعمال هنگامی که enter فعال می‌شود.
* **اختیاری** `exit`: یک رشته یا شیء. [View Transition Class](#view-transition-class) برای اعمال هنگامی که exit فعال می‌شود.
* **اختیاری** `update`: یک رشته یا شیء. [View Transition Class](#view-transition-class) برای اعمال هنگامی که یک به‌روزرسانی فعال می‌شود.
* **اختیاری** `share`: یک رشته یا شیء. [View Transition Class](#view-transition-class) برای اعمال هنگامی که یک shared element فعال می‌شود.
* **اختیاری** `default`: یک رشته یا شیء. [View Transition Class](#view-transition-class) که وقتی هیچ پراپس فعال‌سازی منطبق دیگری یافت نمی‌شود استفاده می‌شود. 
* **اختیاری** `name`: یک رشته یا شیء. نام View Transition که برای shared element transitionها استفاده می‌شود. اگر ارائه نشود، ری‌اکت برای هر View Transition از یک نام یکتا استفاده می‌کند تا از انیمیشن‌های غیرمنتظره جلوگیری کند.

#### کالبک {/*events*/}

این کالبک‌ها به شما اجازه می‌دهند انیمیشن را به‌صورت دستوری با استفاده از APIهای [animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate) تنظیم کنید:

* **اختیاری** `onEnter`: یک تابع. ری‌اکت `onEnter` را پس از یک انیمیشن "enter" فراخوانی می‌کند.
* **اختیاری** `onExit`: یک تابع. ری‌اکت `onExit` را پس از یک انیمیشن "exit" فراخوانی می‌کند.
* **اختیاری** `onShare`:  یک تابع. ری‌اکت `onShare` را پس از یک انیمیشن "share" فراخوانی می‌کند.
* **اختیاری** `onUpdate`:  یک تابع. ری‌اکت `onUpdate` را پس از یک انیمیشن "update" فراخوانی می‌کند.

هر کالبک به‌عنوان آرگومان دریافت می‌کند:
- `element`: المان DOM که انیمیشن شده است.
- `types`: [Transition Types](/reference/react/addTransitionType) که در انیمیشن گنجانده شده‌اند.

### View Transition Class {/*view-transition-class*/}

View Transition Class نام کلاس(های) CSS است که توسط ری‌اکت در طول ترنزیشن هنگامی که ViewTransition فعال می‌شود اعمال می‌شود. می‌تواند یک رشته یا یک شیء باشد.
- `string`: کلاسی که روی المان‌های فرزند هنگام فعال شدن اضافه می‌شود. اگر `'none'` ارائه شود، هیچ کلاسی اضافه نخواهد شد.
- `object`: کلاس اضافه‌شده روی المان‌های فرزند، کلیدی خواهد بود که با نوع View Transition اضافه‌شده با `addTransitionType` مطابقت دارد. شیء همچنین می‌تواند یک `default` برای استفاده در صورت عدم یافتن نوع مطابق مشخص کند.

از مقدار `'none'` می‌توان برای جلوگیری از فعال شدن یک View Transition برای یک trigger خاص استفاده کرد.

### استایل‌دهی View Transitions {/*styling-view-transitions*/}

<Note>

در بسیاری از نمونه‌های اولیهٔ View Transitions در سراسر وب، دیده‌اید که از [`view-transition-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name) استفاده می‌کنند و سپس با استفاده از selectorهای `::view-transition-...(my-name)` آن را استایل‌دهی می‌کنند. ما این را برای استایل‌دهی توصیه نمی‌کنیم. در عوض، معمولاً توصیه می‌کنیم به‌جای آن از یک View Transition Class استفاده کنید.

</Note>

برای سفارشی کردن انیمیشن یک `<ViewTransition>` می‌توانید یک View Transition Class به یکی از پراپس‌های فعال‌سازی ارائه دهید. View Transition Class نام کلاس CSS است که ری‌اکت هنگامی که ViewTransition فعال می‌شود به المان‌های فرزند اعمال می‌کند.

برای مثال، برای سفارشی کردن یک انیمیشن "enter"، یک نام کلاس به پراپس `enter` ارائه دهید:


```js
<ViewTransition enter="slide-in">
```

وقتی `<ViewTransition>` یک انیمیشن "enter" را فعال می‌کند، ری‌اکت نام کلاس `slide-in` را اضافه می‌کند. سپس می‌توانید با استفاده از [view transition pseudo selectors](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API#pseudo-elements) به این کلاس ارجاع دهید تا انیمیشن‌های قابل استفادهٔ مجدد بسازید:

```css
::view-transition-group(.slide-in) {
  
}
::view-transition-old(.slide-in) {

}
::view-transition-new(.slide-in) {

}
```
در آینده، کتابخانه‌های CSS ممکن است انیمیشن‌های داخلی با استفاده از View Transition Classها اضافه کنند تا استفاده از آن‌ها آسان‌تر شود.

#### نکات {/*caveats*/}

- به‌طور پیش‌فرض، `setState` بلافاصله به‌روزرسانی می‌شود و `<ViewTransition>` را فعال نمی‌کند، فقط به‌روزرسانی‌هایی که در یک [ترنزیشن](/reference/react/useTransition) پیچیده شده‌اند. همچنین می‌توانید از [`<Suspense>`](/reference/react/Suspense) برای opt-in به یک ترنزیشن جهت [نمایش محتوا](/reference/react/Suspense#revealing-content-together-at-once) استفاده کنید.
- `<ViewTransition>` یک تصویر ایجاد می‌کند که می‌تواند جابجا، scale و cross-fade شود. برخلاف Layout Animationهایی که ممکن است در React Native یا Motion دیده باشید، این بدان معناست که هر المان فردی داخل آن موقعیت خود را انیمیشن نمی‌کند. این می‌تواند منجر به عملکرد بهتر و حس پیوسته‌تر، انیمیشن نرم‌تر در مقایسه با انیمیشن دادن به هر قطعهٔ فردی شود. با این حال، ممکن است پیوستگی را در چیزهایی که باید خودشان حرکت کنند از دست بدهد. بنابراین ممکن است در نتیجه نیاز باشد مرزهای `<ViewTransition>` بیشتری را به‌صورت دستی اضافه کنید.
- بسیاری از کاربران ممکن است ترجیح دهند انیمیشن‌هایی روی صفحه نداشته باشند. ری‌اکت به‌طور خودکار انیمیشن‌ها را برای این مورد غیرفعال نمی‌کند. توصیه می‌کنیم از media query `@media (prefers-reduced-motion)` برای غیرفعال کردن انیمیشن‌ها یا کاهش آن‌ها بر اساس ترجیح کاربر استفاده کنید. در آینده، کتابخانه‌های CSS ممکن است این را به‌صورت داخلی در presetهای خود داشته باشند.
- در حال حاضر، `<ViewTransition>` فقط در DOM کار می‌کند. ما در حال کار روی افزودن پشتیبانی برای React Native و سایر پلتفرم‌ها هستیم.

---


## استفاده {/*usage*/}

### انیمیشن یک المان در enter/exit {/*animating-an-element-on-enter*/}

ترنزیشن‌های Enter/Exit زمانی trigger می‌شوند که یک `<ViewTransition>` توسط یک کامپوننت در یک ترنزیشن اضافه یا حذف شود:

```js
function Child() {
  return <ViewTransition>Hi</ViewTransition>
}

function Parent() {
  const [show, setShow] = useState();
  if (show) {
    return <Child />;
  }
  return null;
}
```

وقتی `setShow` فراخوانی می‌شود، `show` به `true` سوییچ می‌کند و کامپوننت `Child` رندر می‌شود. وقتی `setShow` داخل `startTransition` فراخوانی می‌شود، و `Child` یک `ViewTransition` را قبل از هر نود DOM دیگری رندر می‌کند، یک انیمیشن `enter` trigger می‌شود. 

وقتی `show` دوباره به `false` سوییچ می‌کند، یک انیمیشن `exit` trigger می‌شود.

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video, children }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div
        className="link"
      >
        <Thumbnail video={video}></Thumbnail>

        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"

function Item() {
  return (
    <ViewTransition>
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>

      {showItem ? <Item /> : null}
    </>
  );
}
```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  }
]
```


```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

<Pitfall>

`<ViewTransition>` فقط اگر قبل از هر نود DOM قرار گیرد فعال می‌شود. اگر `Child` در عوض به این شکل بود، هیچ انیمیشنی trigger نمی‌شد:

```js [3, 5]
function Component() {
  return (
    <div>
      <ViewTransition>Hi</ViewTransition>
    </div>
  );
}
```

</Pitfall>

---
### انیمیشن یک المان مشترک (shared element) {/*animating-a-shared-element*/}

معمولاً، توصیه نمی‌کنیم یک نام به `<ViewTransition>` اختصاص دهید و در عوض اجازه دهید ری‌اکت یک نام خودکار به آن اختصاص دهد. دلیلی که ممکن است بخواهید نامی اختصاص دهید، انیمیشن بین کامپوننت‌های کاملاً متفاوت هنگامی است که یک درخت unmount می‌شود و درخت دیگری همزمان mount می‌شود. برای حفظ پیوستگی.

```js
<ViewTransition name={UNIQUE_NAME}>
  <Child />
</ViewTransition>
```

وقتی یک درخت unmount می‌شود و درخت دیگر mount می‌شود، اگر جفتی وجود داشته باشد که نام مشابه در درخت unmounting و درخت mounting وجود داشته باشد، آن‌ها انیمیشن "share" را در هر دو trigger می‌کنند. از سمت unmounting به سمت mounting انیمیشن می‌شود.

برخلاف انیمیشن exit/enter، این می‌تواند در عمق درخت حذف‌شده/mounted باشد. اگر یک `<ViewTransition>` همچنین برای exit/enter واجد شرایط باشد، انیمیشن "share" اولویت دارد.

اگر ترنزیشن ابتدا یک سمت را unmount کند و سپس منجر به نمایش یک fallback `<Suspense>` شود قبل از اینکه در نهایت نام جدید mount شود، هیچ shared element transition اتفاق نمی‌افتد.

<Sandpack>

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from "react";
import {Video, Thumbnail, FullscreenVideo} from "./Video";
import videos from "./data";

export default function Component() {
  const [fullscreen, setFullscreen] = useState(false);
  if (fullscreen) {
    return <FullscreenVideo
      video={videos[0]}
      onExit={() => startTransition(() => setFullscreen(false))}
    />
  }
  return <Video
    video={videos[0]}
    onClick={() => startTransition(() => setFullscreen(true))}
  />
}

```

```js src/Video.js
import {unstable_ViewTransition as ViewTransition} from "react";

const THUMBNAIL_NAME = "video-thumbnail"

export function Thumbnail({ video, children }) {
  return (
    <ViewTransition name={THUMBNAIL_NAME}>
      <div
        aria-hidden="true"
        tabIndex={-1}
        className={`thumbnail ${video.image}`}
      />
    </ViewTransition>
  );
}

export function Video({ video, onClick }) {
  return (
    <div className="video">
      <div className="link" onClick={onClick}>
        <Thumbnail video={video} />
        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}

export function FullscreenVideo({video, onExit}) {
  return (
    <div className="fullscreenLayout">
      <ViewTransition name={THUMBNAIL_NAME}>
        <div
          aria-hidden="true"
          tabIndex={-1}
          className={`thumbnail ${video.image} fullscreen`}
        />
        <button
          className="close-button"
          onClick={onExit}
        >
          ✖
        </button>
      </ViewTransition>
    </div>
  );
}
```


```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  }
]
```


```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.thumbnail.red {
  background-image: conic-gradient(at top right, #c76a15, #a6423a, #2b3491);
}
.thumbnail.fullscreen {
  height: 100%;
  width: 100%;
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
.fullscreenLayout {
  position: relative;
  height: 100%;
  width: 100%;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  color: black;
}
@keyframes progress-animation {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
```


```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>


<Note>

اگر هر یک از سمت‌های mounted یا unmounted یک جفت خارج از viewport باشد، هیچ جفتی تشکیل نمی‌شود. این تضمین می‌کند که وقتی چیزی scroll می‌شود، به داخل یا خارج viewport پرواز نکند. در عوض، به‌عنوان یک enter/exit معمولی به خودی خود رفتار می‌شود.

این در صورتی که همان نمونهٔ کامپوننت موقعیت را تغییر دهد، که یک "update" را trigger می‌کند، اتفاق نمی‌افتد. آن‌ها فارغ از اینکه یک موقعیت خارج از viewport باشد، انیمیشن می‌شوند.

در حال حاضر یک رفتار عجیب وجود دارد که اگر یک `<ViewTransition>` unmount شدهٔ عمیقاً تودرتو داخل viewport باشد اما سمت mounted داخل viewport نباشد، سمت unmount شده به‌عنوان انیمیشن "exit" خودش انیمیشن می‌شود حتی اگر عمیقاً تودرتو باشد به‌جای اینکه بخشی از انیمیشن والد باشد.

</Note>

<Pitfall>

مهم است که در کل اپلیکیشن همزمان فقط یک چیز با همان نام mount باشد. بنابراین مهم است که از namespaceهای یکتا برای نام استفاده کنید تا از تداخل جلوگیری شود. برای اطمینان از این کار ممکن است بخواهید یک ثابت در یک ماژول جداگانه اضافه کنید که import می‌کنید.

```js
export const MY_NAME = "my-globally-unique-name";
import {MY_NAME} from './shared-name';
...
<ViewTransition name={MY_NAME}>
```

</Pitfall>


---

### انیمیشن مرتب‌سازی مجدد آیتم‌ها در یک لیست {/*animating-reorder-of-items-in-a-list*/}


```js
items.map(item => <Component key={item.id} item={item} />)
```

هنگام مرتب‌سازی مجدد یک لیست، بدون به‌روزرسانی محتوا، انیمیشن "update" روی هر `<ViewTransition>` در لیست trigger می‌شود اگر آن‌ها خارج از یک نود DOM باشند. مشابه انیمیشن‌های enter/exit.

این بدان معناست که این کار انیمیشن را روی این `<ViewTransition>` trigger می‌کند:

```js
function Component() {
  return <ViewTransition><div>...</div></ViewTransition>;
}
```
<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div className="link">
        <Thumbnail video={video}></Thumbnail>
        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";

export default function Component() {
  const [orderedVideos, setOrderedVideos] = useState(videos);
  const reorder = () => {
    startTransition(() => {
      setOrderedVideos((prev) => {
        return [...prev.sort(() => Math.random() - 0.5)];
      });
    });
  };
  return (
    <>
      <button onClick={reorder}>🎲</button>
      <div className="listContainer">
        {orderedVideos.map((video, i) => {
          return (
            <ViewTransition key={video.title}>
              <Video video={video} />
            </ViewTransition>
          );
        })}
      </div>
    </>
  );
}
  

```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  },
  {
    id: '2',
    title: 'Second video',
    description: 'Video description',
    image: 'red',
  },
  {
    id: '3',
    title: 'Third video',
    description: 'Video description',
    image: 'green',
  },
  {
    id: '4',
    title: 'Fourth video',
    description: 'Video description',
    image: 'purple',
  }
]
```


```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.thumbnail.red {
  background-image: conic-gradient(at top right, #c76a15, #a6423a, #2b3491);
}
.thumbnail.green {
  background-image: conic-gradient(at top right, #c76a15, #388f7f, #2b3491);
}
.thumbnail.purple {
  background-image: conic-gradient(at top right, #c76a15, #575fb7, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```


```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

با این حال، این هر آیتم فردی را انیمیشن نمی‌کرد:

```js
function Component() {
  return <div><ViewTransition>...</ViewTransition></div>;
}
```
در عوض، هر `<ViewTransition>` والد cross-fade می‌شد. اگر هیچ `<ViewTransition>` والد وجود نداشته باشد، در آن صورت هیچ انیمیشنی وجود ندارد.

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div className="link">
        <Thumbnail video={video}></Thumbnail>
        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from "react";
import {Video} from "./Video";
import videos from "./data";

export default function Component() {
  const [orderedVideos, setOrderedVideos] = useState(videos);
  const reorder = () => {
    startTransition(() => {
      setOrderedVideos((prev) => {
        return [...prev.sort(() => Math.random() - 0.5)];
      });
    });
  };
  return (
    <>
      <button onClick={reorder}>🎲</button>
      <ViewTransition>
        <div className="listContainer">
          {orderedVideos.map((video, i) => {
            return <Video video={video} key={video.title} />;
          })}
        </div>
      </ViewTransition>
    </>
  );
}
  

```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  },
  {
    id: '2',
    title: 'Second video',
    description: 'Video description',
    image: 'red',
  },
  {
    id: '3',
    title: 'Third video',
    description: 'Video description',
    image: 'green',
  },
  {
    id: '4',
    title: 'Fourth video',
    description: 'Video description',
    image: 'purple',
  }
]
```


```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.thumbnail.red {
  background-image: conic-gradient(at top right, #c76a15, #a6423a, #2b3491);
}
.thumbnail.green {
  background-image: conic-gradient(at top right, #c76a15, #388f7f, #2b3491);
}
.thumbnail.purple {
  background-image: conic-gradient(at top right, #c76a15, #575fb7, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```


```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

این بدان معناست که ممکن است بخواهید از المان‌های wrapper در لیست‌هایی که می‌خواهید به کامپوننت اجازه دهید انیمیشن مرتب‌سازی مجدد خود را کنترل کند، اجتناب کنید:

```
items.map(item => <div><Component key={item.id} item={item} /></div>)
```

قانون بالا همچنین اعمال می‌شود اگر یکی از آیتم‌ها برای تغییر اندازه به‌روزرسانی شود، که سپس باعث می‌شود خواهرخواندها تغییر اندازه دهند، همچنین `<ViewTransition>` خواهرخواندهٔ آن انیمیشن می‌شود اما فقط اگر آن‌ها خواهرخوانده‌های فوری باشند.

این بدان معناست که در طول یک به‌روزرسانی، که باعث re-layout زیادی می‌شود، هر `<ViewTransition>` روی صفحه را به‌طور فردی انیمیشن نمی‌دهد. این کار منجر به انیمیشن‌های پرمخاطب زیادی می‌شود که از تغییر واقعی حواس‌پرتی ایجاد می‌کند. بنابراین ری‌اکت در مورد زمانی که یک انیمیشن فردی trigger می‌شود محتاط‌تر است.

<Pitfall>

مهم است که برای حفظ هویت هنگام مرتب‌سازی مجدد لیست‌ها به‌درستی از کلیدها استفاده کنید. ممکن است به نظر برسد می‌توانید از "name"، shared element transitionها، برای انیمیشن مرتب‌سازی مجدد استفاده کنید اما اگر یک سمت خارج از viewport باشد trigger نمی‌شود. برای انیمیشن یک مرتب‌سازی مجدد اغلب می‌خواهید نشان دهید که به یک موقعیت خارج از viewport رفته است.

</Pitfall>

---

### انیمیشن از محتوای Suspense {/*animating-from-suspense-content*/}

درست مانند هر ترنزیشن، ری‌اکت قبل از اجرای انیمیشن منتظر داده‌ها و CSS جدید (`<link rel="stylesheet" precedence="...">`) می‌ماند. علاوه بر این، ViewTransitionها همچنین تا ۵۰۰ms برای بارگذاری فونت‌های جدید قبل از شروع انیمیشن منتظر می‌مانند تا از flicker بعدی آن‌ها جلوگیری کنند. به همین دلیل، یک تصویر پیچیده در ViewTransition برای بارگذاری تصویر منتظر می‌ماند.

اگر داخل یک نمونهٔ مرز Suspense جدید باشد، ابتدا fallback نمایش داده می‌شود. پس از آنکه مرز Suspense کاملاً بارگذاری شد، `<ViewTransition>` را trigger می‌کند تا انیمیشن نمایش محتوا را انجام دهد.

در حال حاضر، این فقط برای ترنزیشن سمت کلاینت اتفاق می‌افتد. در آینده، این کار همچنین مرز Suspense را برای streaming SSR هنگامی که محتوا از سرور در طول بارگذاری اولیه suspend می‌شود، انیمیشن می‌کند.

دو روش برای انیمیشن مرزهای Suspense بسته به جایی که `<ViewTransition>` را قرار می‌دهید وجود دارد:

به‌روزرسانی:

```
<ViewTransition>
  <Suspense fallback={<A />}>
    <B />
  </Suspense>
</ViewTransition>
```
در این سناریو وقتی محتوا از A به B می‌رود، به‌عنوان یک "update" در نظر گرفته می‌شود و در صورت لزوم آن کلاس اعمال می‌شود. هم A و هم B همان view-transition-name را دریافت می‌کنند و بنابراین به‌طور پیش‌فرض به‌عنوان cross-fade عمل می‌کنند.

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video, children }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div className="link">
        <Thumbnail video={video}></Thumbnail>
        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}

export function VideoPlaceholder() {
  const video = {image: "loading"}
  return (
    <div className="video">
      <div className="link">
        <Thumbnail video={video}></Thumbnail>
        <div className="info">
          <div className="video-title loading" />
          <div className="video-description loading" />
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition,
  Suspense
} from 'react';
import {Video, VideoPlaceholder} from "./Video";
import {useLazyVideoData} from "./data"

function LazyVideo() {
  const video = useLazyVideoData();
  return (
    <Video video={video}/>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>
      {showItem ? (
        <ViewTransition>
          <Suspense fallback={<VideoPlaceholder />}>
            <LazyVideo />
          </Suspense>
        </ViewTransition>
      ) : null}
    </>
  );
}
```

```js src/data.js hidden
import {use} from "react";

let cache = null;

function fetchVideo() {
  if (!cache) {
    cache = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          title: 'First video',
          description: 'Video description',
          image: 'blue',
        });
      }, 1000);
    });
  }
  return cache;
}

export function useLazyVideoData() {
  return use(fetchVideo());
}
```


```css
#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.loading {
  background-image: linear-gradient(90deg, rgba(173, 216, 230, 0.3) 25%, rgba(135, 206, 250, 0.5) 50%, rgba(173, 216, 230, 0.3) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-title.loading {
  height: 20px;
  width: 80px;
  border-radius: 0.5rem;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
  border-radius: 0.5rem;
}
.video-description.loading {
  height: 15px;
  width: 100px;
}
```

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

Enter/Exit:

```
<Suspense fallback={<ViewTransition><A /></ViewTransition>}>
  <ViewTransition><B /></ViewTransition>
</Suspense>
```

در این سناریو، این دو نمونهٔ ViewTransition جداگانه هستند که هر کدام `view-transition-name` خود را دارند. این به‌عنوان یک "exit" از `<A>` و یک "enter" از `<B>` در نظر گرفته می‌شود.

بسته به جایی که انتخاب می‌کنید مرز `<ViewTransition>` را قرار دهید، می‌توانید افکت‌های متفاوتی ایجاد کنید.

---
### انصراف از یک انیمیشن {/*opting-out-of-an-animation*/}

گاهی اوقات شما در حال پیچیدن یک کامپوننت موجود بزرگ، مانند یک صفحهٔ کامل، هستید و می‌خواهید برخی به‌روزرسانی‌ها را، مانند تغییر تم، انیمیشن کنید. با این حال، نمی‌خواهید تمام به‌روزرسانی‌های داخل کل صفحه را به cross-fade هنگام به‌روزرسانی opt-in کند. به‌ویژه اگر به‌تدریج انیمیشن‌های بیشتری اضافه می‌کنید.

می‌توانید از کلاس "none" برای انصراف از یک انیمیشن استفاده کنید. با پیچیدن فرزندان خود در یک "none" می‌توانید انیمیشن‌ها را برای به‌روزرسانی‌های آن‌ها غیرفعال کنید در حالی که والد همچنان trigger می‌شود.

```js
<ViewTransition>
  <div className={theme}>
    <ViewTransition update="none">
      {children}
    </ViewTransition>
  </div>
</ViewTransition>
```

این فقط در صورتی انیمیشن می‌شود که تم تغییر کند و نه اگر فقط فرزندان به‌روز شوند. فرزندان همچنان می‌توانند با `<ViewTransition>` خود دوباره opt-in کنند اما حداقل دوباره دستی است.

---

### سفارشی‌سازی انیمیشن‌ها {/*customizing-animations*/}

به‌طور پیش‌فرض، `<ViewTransition>` شامل cross-fade پیش‌فرض از مرورگر است.

برای سفارشی‌سازی انیمیشن‌ها، می‌توانید پراپس‌هایی به کامپوننت `<ViewTransition>` ارائه دهید تا مشخص کنید از کدام انیمیشن‌ها استفاده شود، بر اساس نحوهٔ فعال شدن `<ViewTransition>`.

برای مثال، می‌توانیم انیمیشن cross fade پیش‌فرض را کند کنیم:

```js
<ViewTransition default="slow-fade">
  <Video />
</ViewTransition>
```

و slow-fade را در CSS با استفاده از view transition classes تعریف کنید:

```css
::view-transition-old(.slow-fade) {
    animation-duration: 500ms;
}

::view-transition-new(.slow-fade) {
    animation-duration: 500ms;
}
```

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video, children }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div
        className="link"
      >
        <Thumbnail video={video}></Thumbnail>

        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"

function Item() {
  return (
    <ViewTransition default="slow-fade">
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>

      {showItem ? <Item /> : null}
    </>
  );
}
```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  }
]
```


```css
::view-transition-old(.slow-fade) {
    animation-duration: 500ms;
}

::view-transition-new(.slow-fade) {
    animation-duration: 500ms;
}

#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

علاوه بر تنظیم `default`، می‌توانید پیکربندی‌هایی برای انیمیشن‌های `enter`، `exit`، `update` و `share` نیز ارائه دهید.

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video, children }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div
        className="link"
      >
        <Thumbnail video={video}></Thumbnail>

        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  useState,
  startTransition
} from 'react';
import {Video} from "./Video";
import videos from "./data"

function Item() {
  return (
    <ViewTransition enter="slide-in" exit="slide-out">
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          startTransition(() => {
            setShowItem((prev) => !prev);
          });
        }}
      >{showItem ? '➖' : '➕'}</button>

      {showItem ? <Item /> : null}
    </>
  );
}
```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  }
]
```


```css
::view-transition-old(.slide-in) {
  animation-name: slideOutRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-in) {
  animation-name: slideInRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-old(.slide-out) {
  animation-name: slideOutLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-out) {
  animation-name: slideInLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

### سفارشی‌سازی انیمیشن‌ها با types {/*customizing-animations-with-types*/}

می‌توانید از API [`addTransitionType`](/reference/react/addTransitionType) برای اضافه کردن یک نام کلاس به المان‌های فرزند هنگامی که یک نوع ترنزیشن خاص برای یک trigger فعال‌سازی خاص فعال می‌شود، استفاده کنید. این به شما اجازه می‌دهد انیمیشن را برای هر نوع ترنزیشن سفارشی کنید.

برای مثال، برای سفارشی کردن انیمیشن برای تمام navigationهای رو به جلو و رو به عقب:

```js
<ViewTransition default={{
  'navigation-back': 'slide-right',
  'navigation-forward': 'slide-left',
 }}>
  <div>...</div>
</ViewTransition>
 
// in your router:
startTransition(() => {
  addTransitionType('navigation-' + navigationType);
});
```

وقتی ViewTransition یک انیمیشن "navigation-back" را فعال می‌کند، ری‌اکت نام کلاس "slide-right" را اضافه می‌کند. وقتی ViewTransition یک انیمیشن "navigation-forward" را فعال می‌کند، ری‌اکت نام کلاس "slide-left" را اضافه می‌کند.

در آینده، routerها و کتابخانه‌های دیگر ممکن است پشتیبانی از انواع و استایل‌های استاندارد view-transition را اضافه کنند.

<Sandpack>

```js src/Video.js hidden
function Thumbnail({ video, children }) {
  return (
    <div
      aria-hidden="true"
      tabIndex={-1}
      className={`thumbnail ${video.image}`}
    />
  );
}

export function Video({ video }) {
  return (
    <div className="video">
      <div
        className="link"
      >
        <Thumbnail video={video}></Thumbnail>
        <div className="info">
          <div className="video-title">{video.title}</div>
          <div className="video-description">{video.description}</div>
        </div>
      </div>
    </div>
  );
}
```

```js
import {
  unstable_ViewTransition as ViewTransition,
  unstable_addTransitionType as addTransitionType,
  useState,
  startTransition,
} from "react";
import {Video} from "./Video";
import videos from "./data"

function Item() {
  return (
    <ViewTransition enter={
        {
          "add-video-back": "slide-in-back",
          "add-video-forward": "slide-in-forward"
        }
      }
      exit={
        {
          "remove-video-back": "slide-in-forward",
          "remove-video-forward": "slide-in-back"
        }
      }>
      <Video video={videos[0]}/>
    </ViewTransition>
  );
}

export default function Component() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
      <div className="button-container">
        <button
          onClick={() => {
            startTransition(() => {
              if (showItem) {
                addTransitionType("remove-video-back")
              } else {
                addTransitionType("add-video-back")
              }
              setShowItem((prev) => !prev);
            });
          }}
        >⬅️</button>
        <button
          onClick={() => {
            startTransition(() => {
              if (showItem) {
                addTransitionType("remove-video-forward")
              } else {
                addTransitionType("add-video-forward")
              }
              setShowItem((prev) => !prev);
            });
          }}
        >➡️</button>
      </div>
      {showItem ? <Item /> : null}
    </>
  );
}
```

```js src/data.js hidden
export default [
  {
    id: '1',
    title: 'First video',
    description: 'Video description',
    image: 'blue',
  }
]
```


```css
::view-transition-old(.slide-in-back) {
  animation-name: slideOutRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-in-back) {
  animation-name: slideInRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-old(.slide-out-back) {
  animation-name: slideOutLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-out-back) {
  animation-name: slideInLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-old(.slide-in-forward) {
  animation-name: slideOutLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-in-forward) {
  animation-name: slideInLeft;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-old(.slide-out-forward) {
  animation-name: slideOutRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

::view-transition-new(.slide-out-forward) {
  animation-name: slideInRight;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
}
button {
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f8ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
}
button:hover {
  border: 2px solid #ccc;
  background-color: #e0e8ff;
}
.button-container {
  display: flex;
}
.thumbnail {
  position: relative;
  aspect-ratio: 16 / 9;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  outline-offset: 2px;
  width: 8rem;
  vertical-align: middle;
  background-color: #ffffff;
  background-size: cover;
  user-select: none;
}
.thumbnail.blue {
  background-image: conic-gradient(at top right, #c76a15, #087ea4, #2b3491);
}
.video {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1em;
}
.video .link {
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
  gap: 0.125rem;
  outline-offset: 4px;
  cursor: pointer;
}
.video .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 8px;
  gap: 0.125rem;
}
.video .info:hover {
  text-decoration: underline;
}
.video-title {
  font-size: 15px;
  line-height: 1.25;
  font-weight: 700;
  color: #23272f;
}
.video-description {
  color: #5e687e;
  font-size: 13px;
}
```

```json package.json hidden
{
  "dependencies": {
    "react": "experimental",
    "react-dom": "experimental",
    "react-scripts": "latest"
  }
}
```

</Sandpack>

### ساخت routerهای فعال‌شده با View Transition {/*building-view-transition-enabled-routers*/}

ری‌اکت منتظر می‌ماند تا هر Navigation در انتظار تمام شود تا اطمینان حاصل کند که بازگردانی scroll در طول انیمیشن اتفاق می‌افتد. اگر Navigation روی ری‌اکت مسدود شده باشد، router شما باید در `useLayoutEffect` unblock کند زیرا `useEffect` منجر به بن‌بست (deadlock) می‌شود.

اگر یک `startTransition` از رویداد legacy popstate آغاز شود، مانند یک navigation "back"، باید به‌صورت همگام تمام شود تا اطمینان حاصل شود که بازگردانی scroll و فرم به‌درستی کار می‌کند. این در تضاد با اجرای یک انیمیشن View Transition است. بنابراین، ری‌اکت انیمیشن‌ها را از popstate رد می‌کند. در نتیجه انیمیشن‌ها برای دکمهٔ back اجرا نمی‌شوند. می‌توانید این را با ارتقای router خود به استفاده از Navigation API رفع کنید.

---

## عیب‌یابی {/*troubleshooting*/}

### `<ViewTransition>` من فعال نمی‌شود {/*my-viewtransition-is-not-activating*/}

`<ViewTransition>` فقط اگر قبل از هر نود DOM قرار گیرد فعال می‌شود:

```js [3, 5]
function Component() {
  return (
    <div>
      <ViewTransition>Hi</ViewTransition>
    </div>
  );
}
```

برای رفع، اطمینان حاصل کنید که `<ViewTransition>` قبل از هر نود DOM دیگری می‌آید:

```js [3, 5] 
function Component() {
  return (
    <ViewTransition>
      <div>Hi</div>
    </ViewTransition>
  );
}
```

### خطای "There are two `<ViewTransition name=%s>` components with the same name mounted at the same time." را دریافت می‌کنم {/*two-viewtransition-with-same-name*/}

این خطا زمانی رخ می‌دهد که دو کامپوننت `<ViewTransition>` با همان `name` همزمان mount شوند:


```js [3]
function Item() {
  // 🚩 All items will get the same "name".
  return <ViewTransition name="item">...</ViewTransition>;
}

function ItemList({items}) {
  return (
    <>
      {item.map(item => <Item key={item.id} />)}
    </>
  );
}
```

این باعث می‌شود View Transition خطا دهد. در محیط توسعه، ری‌اکت این مشکل را تشخیص می‌دهد تا آن را آشکار کند و دو خطا را log می‌کند:

<ConsoleBlockMulti>
<ConsoleLogLine level="error">

There are two `<ViewTransition name=%s>` components with the same name mounted at the same time. This is not supported and will cause View Transitions to error. Try to use a more unique name e.g. by using a namespace prefix and adding the id of an item to the name.
{'    '}at Item
{'    '}at ItemList

</ConsoleLogLine>

<ConsoleLogLine level="error">

The existing `<ViewTransition name=%s>` duplicate has this stack trace.
{'    '}at Item
{'    '}at ItemList

</ConsoleLogLine>
</ConsoleBlockMulti>

برای رفع، اطمینان حاصل کنید که در کل اپلیکیشن همزمان فقط یک `<ViewTransition>` با همان نام mount باشد با اطمینان از اینکه `name` یکتا است، یا با افزودن یک `id` به نام:

```js [3]
function Item({id}) {
  // ✅ All items will get the same "name".
  return <ViewTransition name={`item-${id}`}>...</ViewTransition>;
}

function ItemList({items}) {
  return (
    <>
      {item.map(item => <Item key={item.id} item={item} />)}
    </>
  );
}
```
