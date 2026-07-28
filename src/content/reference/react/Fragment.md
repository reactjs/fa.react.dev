---
title: <Fragment> (<>...</>)
---

<Intro>

`<Fragment>`، که اغلب از طریق سینتکس `<>...</>` استفاده می‌شود، به شما اجازه می‌دهد المن‌ها را بدون یک نُد پیچاننده (wrapper) گروه‌بندی کنید.

```js
<>
  <OneChild />
  <AnotherChild />
</>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<Fragment>` {/*fragment*/}

المن‌ها را در `<Fragment>` بپیچید تا در موقعیت‌هایی که به یک المنت واحد نیاز دارید، آن‌ها را در کنار هم گروه‌بندی کنید. گروه‌بندی المن‌ها در `Fragment` هیچ تأثیری روی DOM حاصل ندارد؛ این همانند آن است که المن‌ها گروه‌بندی نشده باشند. تگ JSX خالی `<></>` در بیشتر موارد شکل کوتاه‌شدهٔ `<Fragment></Fragment>` است.

#### پراپس {/*props*/}

- **اختیاری** `key`: فرگمنت‌هایی که با سینتکس صریح `<Fragment>` تعریف می‌شوند می‌توانند [کلید](/learn/rendering-lists#keeping-list-items-in-order-with-key) داشته باشند.

#### نکات {/*caveats*/}

- اگر می‌خواهید `key` را به یک فرگمنت ارسال کنید، نمی‌توانید از سینتکس `<>...</>` استفاده کنید. باید `Fragment` را صریحاً از `'react'` import کنید و `<Fragment key={yourKey}>...</Fragment>` را رندر کنید.

- ری‌اکت [استیت را بازنشانی نمی‌کند](/learn/preserving-and-resetting-state) وقتی از رندر `<><Child /></>` به `[<Child />]` یا برعکس می‌روید، یا وقتی از رندر `<><Child /></>` به `<Child />` و برعکس می‌روید. این تنها تا یک سطح عمق کار می‌کند: به‌عنوان مثال، رفتن از `<><><Child /></></>` به `<Child />` استیت را بازنشانی می‌کند. معنای دقیق آن را [اینجا ببینید.](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)

---

## استفاده {/*usage*/}

### بازگرداندن چندین المنت {/*returning-multiple-elements*/}

از `Fragment` یا سینتکس معادل `<>...</>` برای گروه‌بندی چندین المنت در کنار هم استفاده کنید. می‌توانید از آن برای قرار دادن چندین المنت در هر مکانی که یک المنت واحد می‌تواند قرار بگیرد استفاده کنید. به‌عنوان مثال، یک کامپوننت تنها می‌تواند یک المنت بازگرداند، اما با استفاده از یک فرگمنت می‌توانید چندین المنت را در کنار هم گروه‌بندی کرده و سپس آن‌ها را به‌عنوان یک گروه بازگردانید:

```js {3,6}
function Post() {
  return (
    <>
      <PostTitle />
      <PostBody />
    </>
  );
}
```

فرگمنت‌ها مفید هستند زیرا گروه‌بندی المن‌ها با یک فرگمنت، برخلاف زمانی که المن‌ها را در یک کانتینر دیگر مانند یک نُد DOM می‌پیچید، هیچ تأثیری روی چیدمان یا استایل‌ها ندارد. اگر این نمونه را با ابزارهای مرورگر بررسی کنید، می‌بینید که تمام نُدهای DOM مربوط به `<h1>` و `<article>` به‌عنوان خواهر/برادر (sibling) ظاهر می‌شوند و هیچ پیچاننده‌ای دور آن‌ها نیست:

<Sandpack>

```js
export default function Blog() {
  return (
    <>
      <Post title="An update" body="It's been a while since I posted..." />
      <Post title="My new blog" body="I am starting a new blog!" />
    </>
  )
}

function Post({ title, body }) {
  return (
    <>
      <PostTitle title={title} />
      <PostBody body={body} />
    </>
  );
}

function PostTitle({ title }) {
  return <h1>{title}</h1>
}

function PostBody({ body }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
```

</Sandpack>

<DeepDive>

#### چگونه یک فرگمنت را بدون سینتکس ویژه بنویسیم؟ {/*how-to-write-a-fragment-without-the-special-syntax*/}

نمونهٔ بالا معادل import کردن `Fragment` از ری‌اکت است:

```js {1,5,8}
import { Fragment } from 'react';

function Post() {
  return (
    <Fragment>
      <PostTitle />
      <PostBody />
    </Fragment>
  );
}
```

معمولاً به این کار نیاز نخواهید داشت، مگر آنکه بخواهید [یک `key` به `Fragment` خود ارسال کنید.](#rendering-a-list-of-fragments)

</DeepDive>

---

### اختصاص چندین المنت به یک متغیر {/*assigning-multiple-elements-to-a-variable*/}

مانند هر المنت دیگری، می‌توانید المن‌های فرگمنت را به متغیرها اختصاص دهید، آن‌ها را به‌عنوان پراپس ارسال کنید و غیره:

```js
function CloseDialog() {
  const buttons = (
    <>
      <OKButton />
      <CancelButton />
    </>
  );
  return (
    <AlertDialog buttons={buttons}>
      Are you sure you want to leave this page?
    </AlertDialog>
  );
}
```

---

### گروه‌بندی المن‌ها با متن {/*grouping-elements-with-text*/}

می‌توانید از `Fragment` برای گروه‌بندی متن در کنار کامپوننت‌ها استفاده کنید:

```js
function DateRangePicker({ start, end }) {
  return (
    <>
      From
      <DatePicker date={start} />
      to
      <DatePicker date={end} />
    </>
  );
}
```

---

### رندر یک فهرست از فرگمنت‌ها {/*rendering-a-list-of-fragments*/}

در اینجا موقعیتی است که باید `Fragment` را صریحاً بنویسید، نه از سینتکس `<></>` استفاده کنید. وقتی [چندین المنت را در یک حلقه رندر می‌کنید](/learn/rendering-lists)، باید یک `key` به هر المنت اختصاص دهید. اگر المن‌های درون حلقه فرگمنت هستند، برای ارائهٔ ویژگی `key` باید از سینتکس معمول المن JSX استفاده کنید:

```js {3,6}
function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}
```

می‌توانید DOM را بررسی کنید تا تأیید کنید هیچ المن پیچاننده‌ای دور فرزندان فرگمنت وجود ندارد:

<Sandpack>

```js
import { Fragment } from 'react';

const posts = [
  { id: 1, title: 'An update', body: "It's been a while since I posted..." },
  { id: 2, title: 'My new blog', body: 'I am starting a new blog!' }
];

export default function Blog() {
  return posts.map(post =>
    <Fragment key={post.id}>
      <PostTitle title={post.title} />
      <PostBody body={post.body} />
    </Fragment>
  );
}

function PostTitle({ title }) {
  return <h1>{title}</h1>
}

function PostBody({ body }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
```

</Sandpack>
