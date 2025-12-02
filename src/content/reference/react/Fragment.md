---
title: <Fragment> (<>...</>)
---

<Intro>


 تگ `<Fragment>`که اغلب به اینصورت `<>...</>` نمایش داده میشود،به شما اجازه میدهد  تا گروهی از المنت هارو بدون اینکه توی نود (node) بپیچانید نمایش دهید.  


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

  المنت هارو توی تگ `<Fragment>` بپیچانید تا آن ها را توی یک موقعیت  گروه بندی کنید، جایی که شما نیاز دارید که یک المنت داشته باشید.گروه بندی المنت ها در `<Fragment>` هیچ تاثیری روی نتیجه دام(DOM)شما ندارد؛دقیقا مثل اینکه المنت ها گروه بندی نشده است. تگ خالی جی اس اکس(jsx) `<></>` دقیقا کوتاه شده ی تگ `<Fragment></Fragment>` در اکثر مواقع است.

#### پراپس ها (Props) {/*props*/}
- **اختیاری** `key`: فرگمنت (Fragments) های تعریف شده به صورت `<Fragment>` میتوانند شامل [keys](/learn/rendering-lists#keeping-list-items-in-order-with-key) باشند.

#### هشدار ها {/*caveats*/}

- اگر میخواهید به فرگمنت ها (Fragments) `key` پاس بدهید, نمیتوانید از `<>...</>` استفاده کنید. ابتدا باید به صراحت `Fragment` را از `'react'` ایمپورت کرده و به صورت `<Fragment key={yourKey}>...</Fragment>` رندر میشود.

-  وقتی که از  `<><Child /></>` به `[<Child />]` میرویم یا وقتی که از `<><Child /></>` به `<Child />` یا برعکس ری اکت [استیت ها را بازنشانی نمیکند](/learn/preserving-and-resetting-state). این عمل فقط برای یک سطح غیر عمیق کار میکند: مثلا, شما از `<><><Child /></></>` به `<Child />` و استیت ها بازنشانی میشوند. برای اطلاعات بیشتر و درک عمیق تر میتوانید به  [اینجا](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b) مراجعه کنید.

---

## نحوه استفاده {/*usage*/}

### برگرداندن چندین المنت {/*returning-multiple-elements*/}

از `Fragment`, یا معادل آن `<>...</>` برای گروه بندی چندین المنت کنار یکدیگر استفاده کنید. شما میتوانید از آن برای قرار دادن چندین المنت در هر مکانی که یک المنت واحد وجود دارد استفاده کنید. برای مثال, یک کامپوننت فقط میتواند یک المنت را برگرداند, اما با استفاده از فرگمنت شما میتوانید  چندین المنت رو کنار هم گروه بندی کنید و سپس شما میتوانید به عنوان یک گروه از اون استفاده کنید :

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

فرگمنت ها (Fragments) خیلی مفید هستند چرا که گروه بندی کردن المنت ها هیچ تاثیری روی استایل و ساختار اصلی شما ندارد, برخلاف اینکه اگر شما المنت ها رو توی یک کانتینر دیگر مثل DOM المنت بپیچانید. اگر که شما این مثال رو با دیگر ابزاری های مرورگر بررسی کنید, متوجه خواهید شد که تمام  `<h1>` و `<article>` ها (DOM nodes) به صورت فرزند به وجود می آیند بدون اینکه حتی دورشون چیزی پیچانده باشیم:

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

#### چگونه یک فرگمنت (Fragments) بدون سینتکس خاصی استفاده کنیم؟ {/*how-to-write-a-fragment-without-the-special-syntax*/}

مثال بالا معادل ایمپورت کردن `Fragment` در ری اکت است:

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

معمولا به `<Fragment></Fragment>` احتیاج ندارید تا زمانی که بخواهید [به `Fragment` ها `key` پاس بدین.](#rendering-a-list-of-fragments)

</DeepDive>

---

### به یک متغیر چندین المنت پاس بدین {/*assigning-multiple-elements-to-a-variable*/}

مثل سایر المنت ها, شما میتوانید به فرگمنت ها متغیر اختصاص دهید, و اونجا رو به عنوان props پاس بدید:

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

### گروه بندی المنت ها با متن {/*grouping-elements-with-text*/}

میتوانید از `Fragment` استفاده کنید تا متن های کنار یکدیگر را با کامپوننت ها گروه بندی کنید:

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

### رندر کردن لیستی از فرگمنت ها (Fragments) {/*rendering-a-list-of-fragments*/}

اینجا نمونه ای از یک موقعیتی هست که شما نیاز دارید به جای `<></>`  از `Fragment` استفاده کنید. وقتی که شما [چندیدن تا المنت رو درون یک حلقه رندر می کنید](/learn/rendering-lists), شما نیاز دارید که به المنت `key` بدهید. اگر که المنت های درون حلقه (loop) در واقع Fragment هستند, شما باید از این قاعده JSX  برای  ترتیب المنت ها پیروی کنید و از ویژگی `key` استفاده کنید :

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
شما میتوانید DOM ها رو بررسی کنید و پی ببرید که هیچ المنتی دور فرگمنت فرزند شما پیچیده نشده است:

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
