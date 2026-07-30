---
title: کامپوننت‌های سرور
---

<RSC>

کامپوننت‌های سرور برای استفاده در [کامپوننت‌های سرور ری‌اکت](/learn/start-a-new-react-project#full-stack-frameworks) هستند.

</RSC>

<Intro>

کامپوننت‌های سرور نوع جدیدی از کامپوننت هستند که پیش از باندل شدن، در محیطی جدا از اپ کلاینت یا سرور SSR شما، رندر می‌شوند.

</Intro>

این محیط جداگانه، همان «سرور» در کامپوننت‌های سرور ری‌اکت است. کامپوننت‌های سرور می‌توانند یک‌بار در زمان build روی سرور CI شما اجرا شوند، یا می‌توانند برای هر درخواست با استفاده از یک وب‌سرور اجرا شوند.

<InlineToc />

<Note>

#### چگونه می‌توانم پشتیبانی از کامپوننت‌های سرور را پیاده‌سازی کنم؟ {/*how-do-i-build-support-for-server-components*/}

در حالی که کامپوننت‌های سرور ری‌اکت در React 19 پایدار هستند و بین نسخه‌های minor شکسته نمی‌شوند، APIهای زیرین که برای پیاده‌سازی یک باندلر یا فریمورک کامپوننت سرور ری‌اکت استفاده می‌شوند، از semver پیروی نمی‌کنند و ممکن است بین نسخه‌های minor در React 19.x تغییر کنند.

برای پشتیبانی از کامپوننت‌های سرور ری‌اکت به‌عنوان یک باندلر یا فریمورک، توصیه می‌کنیم به یک نسخهٔ خاص از ری‌اکت پایبند باشید، یا از نسخهٔ Canary استفاده کنید. ما به همکاری با باندلرها و فریمورک‌ها برای پایدار کردن APIهای مورد استفاده در پیاده‌سازی کامپوننت‌های سرور ری‌اکت در آینده ادامه خواهیم داد.

</Note>

### کامپوننت‌های سرور بدون سرور {/*server-components-without-a-server*/}
کامپوننت‌های سرور می‌توانند در زمان build اجرا شوند تا از سیستم‌فایل بخوانند یا محتوای استاتیک را fetch کنند، بنابراین به وب‌سرور نیاز نیست. مثلاً ممکن است بخواهید داده‌های استاتیک را از یک سیستم مدیریت محتوا بخوانید.

بدون کامپوننت‌های سرور، معمول است که داده‌های استاتیک را در کلاینت با یک افکت fetch کنید:
```js
// bundle.js
import marked from 'marked'; // 35.9K (11.2K gzipped)
import sanitizeHtml from 'sanitize-html'; // 206K (63.3K gzipped)

function Page({page}) {
  const [content, setContent] = useState('');
  // NOTE: loads *after* first page render.
  useEffect(() => {
    fetch(`/api/content/${page}`).then((data) => {
      setContent(data.content);
    });
  }, [page]);

  return <div>{sanitizeHtml(marked(content))}</div>;
}
```
```js
// api.js
app.get(`/api/content/:page`, async (req, res) => {
  const page = req.params.page;
  const content = await file.readFile(`${page}.md`);
  res.send({content});
});
```

این الگو به این معناست که کاربران باید ۷۵ کیلوبایت (فشرده‌شده) کتابخانهٔ اضافی را دانلود و تجزیه کنند، و برای دریافت داده‌ها پس از بارگذاری صفحه منتظر یک درخواست دوم بمانند، فقط برای رندر کردن محتوای استاتیکی که در طول عمر صفحه تغییر نخواهد کرد.

با کامپوننت‌های سرور، می‌توانید این کامپوننت‌ها را یک‌بار در زمان build رندر کنید:

```js
import marked from 'marked'; // Not included in bundle
import sanitizeHtml from 'sanitize-html'; // Not included in bundle

async function Page({page}) {
  // NOTE: loads *during* render, when the app is built.
  const content = await file.readFile(`${page}.md`);

  return <div>{sanitizeHtml(marked(content))}</div>;
}
```

سپس می‌توان خروجی رندرشده را به صورت سمت سرور (SSR) به HTML تبدیل کرد و در یک CDN بارگذاری نمود. وقتی اپ بارگذاری می‌شود، کلاینت کامپوننت `Page` اصلی، یا کتابخانه‌های سنگین برای رندر کردن markdown را نخواهد دید. کلاینت فقط خروجی رندرشده را می‌بیند:

```js
<div><!-- html for markdown --></div>
```

این یعنی محتوا در طول اولین بارگذاری صفحه قابل مشاهده است، و باندل شامل کتابخانه‌های سنگین مورد نیاز برای رندر محتوای استاتیک نمی‌شود.

<Note>

ممکن است متوجه شوید که کامپوننت سرور بالا یک تابع async است:

```js
async function Page({page}) {
  //...
}
```

کامپوننت‌های Async یک قابلیت جدید کامپوننت‌های سرور هستند که به شما اجازه می‌دهند در حین رندر `await` کنید.

بخش [کامپوننت‌های async با کامپوننت‌های سرور](#async-components-with-server-components) را در ادامه ببینید.

</Note>

### کامپوننت‌های سرور با سرور {/*server-components-with-a-server*/}
کامپوننت‌های سرور همچنین می‌توانند در طول درخواست یک صفحه روی یک وب‌سرور اجرا شوند، که به شما اجازه می‌دهد بدون نیاز به ساختن یک API به لایهٔ داده‌تان دسترسی داشته باشید. آن‌ها قبل از باندل شدن اپلیکیشن رندر می‌شوند، و می‌توانند داده و JSX را به عنوان پراپس به کامپوننت‌های کلاینت منتقل کنند.

بدون کامپوننت‌های سرور، معمول است که داده‌های پویا را در کلاینت در یک افکت fetch کنید:

```js
// bundle.js
function Note({id}) {
  const [note, setNote] = useState('');
  // NOTE: loads *after* first render.
  useEffect(() => {
    fetch(`/api/notes/${id}`).then(data => {
      setNote(data.note);
    });
  }, [id]);

  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

function Author({id}) {
  const [author, setAuthor] = useState('');
  // NOTE: loads *after* Note renders.
  // Causing an expensive client-server waterfall.
  useEffect(() => {
    fetch(`/api/authors/${id}`).then(data => {
      setAuthor(data.author);
    });
  }, [id]);

  return <span>By: {author.name}</span>;
}
```
```js
// api
import db from './database';

app.get(`/api/notes/:id`, async (req, res) => {
  const note = await db.notes.get(id);
  res.send({note});
});

app.get(`/api/authors/:id`, async (req, res) => {
  const author = await db.authors.get(id);
  res.send({author});
});
```

با کامپوننت‌های سرور، می‌توانید داده‌ها را بخوانید و در کامپوننت رندر کنید:

```js
import db from './database';

async function Note({id}) {
  // NOTE: loads *during* render.
  const note = await db.notes.get(id);
  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

async function Author({id}) {
  // NOTE: loads *after* Note,
  // but is fast if data is co-located.
  const author = await db.authors.get(id);
  return <span>By: {author.name}</span>;
}
```

سپس باندلر داده‌ها، کامپوننت‌های سرور رندرشده و کامپوننت‌های کلاینت پویا را در یک باندل ترکیب می‌کند. به صورت اختیاری، آن باندل می‌تواند به صورت سمت سرور (SSR) رندر شود تا HTML اولیه برای صفحه ساخته شود. وقتی صفحه بارگذاری می‌شود، مرورگر کامپوننت‌های اصلی `Note` و `Author` را نمی‌بیند؛ فقط خروجی رندرشده به کلاینت ارسال می‌شود:

```js
<div>
  <span>By: The React Team</span>
  <p>React 19 is...</p>
</div>
```

کامپوننت‌های سرور می‌توانند با re-fetch شدن از سرور، که در آنجا می‌توانند به داده‌ها دسترسی داشته و دوباره رندر شوند، پویا شوند. این معماری جدید اپلیکیشن، مدل ذهنی سادهٔ «درخواست/پاسخ» اپلیکیشن‌های چندصفحه‌ای مبتنی بر سرور را با تعامل روان اپلیکیشن‌های تک‌صفحه‌ای مبتنی بر کلاینت ترکیب می‌کند، و بهترین هر دو دنیا را در اختیار شما قرار می‌دهد.

### افزودن تعامل به کامپوننت‌های سرور {/*adding-interactivity-to-server-components*/}

کامپوننت‌های سرور به مرورگر ارسال نمی‌شوند، بنابراین نمی‌توانند از APIهای تعاملی مانند `useState` استفاده کنند. برای افزودن تعامل به کامپوننت‌های سرور، می‌توانید آن‌ها را با کامپوننت کلاینت با استفاده از دایرکتیو `"use client"` ترکیب کنید.

<Note>

#### هیچ دایرکتیوی برای کامپوننت‌های سرور وجود ندارد. {/*there-is-no-directive-for-server-components*/}

یک برداشت اشتباه رایج این است که کامپوننت‌های سرور با `"use server"` نشان داده می‌شوند، اما هیچ دایرکتیوی برای کامپوننت‌های سرور وجود ندارد. دایرکتیو `"use server"` برای تابع‌های سرور استفاده می‌شود.

برای اطلاعات بیشتر، مستندات [دایرکتیوها](/reference/rsc/directives) را ببینید.

</Note>


در مثال زیر، کامپوننت سرور `Notes` یک کامپوننت کلاینت `Expandable` را وارد می‌کند که از استیت برای تغییر استیت `expanded` خود استفاده می‌کند:
```js
// Server Component
import Expandable from './Expandable';

async function Notes() {
  const notes = await db.notes.getAll();
  return (
    <div>
      {notes.map(note => (
        <Expandable key={note.id}>
          <p note={note} />
        </Expandable>
      ))}
    </div>
  )
}
```
```js
// Client Component
"use client"

export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
    </div>
  )
}
```

این کار با این روش انجام می‌شود که ابتدا `Notes` به‌عنوان یک کامپوننت سرور رندر می‌شود، و سپس به باندلر دستور داده می‌شود که یک باندل برای کامپوننت کلاینت `Expandable` بسازد. در مرورگر، کامپوننت‌های کلاینت خروجی کامپوننت‌های سرور را به‌عنوان پراپس دریافت می‌کنند:

```js
<head>
  <!-- the bundle for Client Components -->
  <script src="bundle.js" />
</head>
<body>
  <div>
    <Expandable key={1}>
      <p>this is the first note</p>
    </Expandable>
    <Expandable key={2}>
      <p>this is the second note</p>
    </Expandable>
    <!--...-->
  </div>
</body>
```

### کامپوننت‌های async با کامپوننت‌های سرور {/*async-components-with-server-components*/}

کامپوننت‌های سرور روش جدیدی برای نوشتن کامپوننت‌ها با استفاده از async/await معرفی می‌کنند. وقتی در یک کامپوننت async عمل `await` انجام می‌دهید، ری‌اکت ساسپنس می‌شود و قبل از ادامهٔ رندر منتظر حلول promise می‌ماند. این کار با پشتیبانی از streaming برای ساسپنس، از مرزهای سرور/کلاینت عبور می‌کند.

حتی می‌توانید یک promise روی سرور بسازید، و آن را روی کلاینت await کنید:

```js
// Server Component
import db from './database';

async function Page({id}) {
  // Will suspend the Server Component.
  const note = await db.notes.get(id);

  // NOTE: not awaited, will start here and await on the client.
  const commentsPromise = db.comments.get(note.id);
  return (
    <div>
      {note}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
```

```js
// Client Component
"use client";
import {use} from 'react';

function Comments({commentsPromise}) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const comments = use(commentsPromise);
  return comments.map(commment => <p>{comment}</p>);
}
```

محتوای `note` داده‌های مهمی برای رندر صفحه است، بنابراین آن را روی سرور `await` می‌کنیم. نظرات پایین صفحه‌اند و اولویت پایین‌تری دارند، بنابراین promise را روی سرور آغاز می‌کنیم، و روی کلاینت با API `use` منتظر آن می‌مانیم. این کار باعث ساسپنس روی کلاینت می‌شود، بدون اینکه رندر محتوای `note` را مسدود کند.

از آنجا که کامپوننت‌های async روی کلاینت پشتیبانی نمی‌شوند، ما promise را با `use` await می‌کنیم.
