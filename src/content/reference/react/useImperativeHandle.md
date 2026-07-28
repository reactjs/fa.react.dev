---
title: useImperativeHandle
---

<Intro>

`useImperativeHandle` یک هوک ری‌اکت است که به شما اجازه می‌دهد handleای که به‌عنوان [رفرنس](/learn/manipulating-the-dom-with-refs) آشکار می‌شود را سفارشی کنید.

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useImperativeHandle(ref, createHandle, dependencies?)` {/*useimperativehandle*/}

برای سفارشی‌سازی handle رفرنسی که کامپوننت آشکار می‌کند، `useImperativeHandle` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);
  // ...
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `ref`: `ref`ای که به‌عنوان پراپ به کامپوننت `MyInput` دریافت کرده‌اید.

* `createHandle`: تابعی که هیچ آرگومانی نمی‌پذیرد و handle رفرنسی که می‌خواهید آشکار کنید را برمی‌گرداند. آن handle رفرنس می‌تواند هر نوعی داشته باشد. معمولاً شما شیئی با متدهایی که می‌خواهید آشکار کنید برمی‌گردانید.

* **اختیاری** `dependencies`: لیست تمام مقادیر واکنش‌گرا (reactive) که درون کد `createHandle` به آن‌ها ارجاع شده است. مقادیر واکنش‌گرا شامل پراپس، استیت، و تمام متغیرها و توابعی است که به‌طور مستقیم درون بدنهٔ کامپوننت شما اعلان شده‌اند. اگر linter شما [برای ری‌اکت پیکربندی شده باشد](/learn/editor-setup#linting)، بررسی می‌کند که هر مقدار واکنش‌گرا به‌درستی به‌عنوان وابستگی تعیین شده باشد. لیست وابستگی‌ها باید تعداد آیتم ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی‌اش با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. اگر یک رندر مجدد منجر به تغییر برخی وابستگی‌ها شود، یا اگر این آرگومان را حذف کنید، تابع `createHandle` شما دوباره اجرا خواهد شد و handle تازه‌ایجادشده به رفرنس اختصاص خواهد یافت.

<Note>

از ری‌اکت ۱۹، [`ref` به‌عنوان یک پراپ در دسترس است.](/blog/2024/12/05/react-19#ref-as-a-prop) در ری‌اکت ۱۸ و نسخه‌های قبلی، لازم بود `ref` را از [`forwardRef`](/reference/react/forwardRef) دریافت کنید.

</Note>

#### مقادیر بازگشتی {/*returns*/}

`useImperativeHandle` مقدار `undefined` برمی‌گرداند.

---

## استفاده {/*usage*/}

### آشکار کردن یک handle رفرنس سفارشی به کامپوننت والد {/*exposing-a-custom-ref-handle-to-the-parent-component*/}

برای آشکار کردن یک نود DOM به المان والد، پراپ `ref` را به نود پاس بدهید.

```js {2}
function MyInput({ ref }) {
  return <input ref={ref} />;
};
```

با کد بالا، [یک رفرنس به `MyInput` نود DOM `<input>` را دریافت خواهد کرد.](/learn/manipulating-the-dom-with-refs) با این حال، می‌توانید به‌جای آن یک مقدار سفارشی آشکار کنید. برای سفارشی‌سازی handle آشکارشده، `useImperativeHandle` را در بالاترین سطح کامپوننت خود فراخوانی کنید:

```js {4-8}
import { useImperativeHandle } from 'react';

function MyInput({ ref }) {
  useImperativeHandle(ref, () => {
    return {
      // ... your methods ...
    };
  }, []);

  return <input />;
};
```

توجه کنید که در کد بالا، `ref` دیگر به `<input>` پاس داده نمی‌شود.

برای مثال، فرض کنید نمی‌خواهید کل نود DOM `<input>` را آشکار کنید، اما می‌خواهید دو متد آن را آشکار کنید: `focus` و `scrollIntoView`. برای این کار، DOM مرورگر واقعی را در یک رفرنس جداگانه نگه دارید. سپس از `useImperativeHandle` استفاده کنید تا handleای فقط با متدهایی که می‌خواهید کامپوننت والد فراخوانی کند آشکار کنید:

```js {7-14}
import { useRef, useImperativeHandle } from 'react';

function MyInput({ ref }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input ref={inputRef} />;
};
```

اکنون، اگر کامپوننت والد رفرنسی به `MyInput` بگیرد، قادر خواهد بود متدهای `focus` و `scrollIntoView` را روی آن فراخوانی کند. با این حال، دسترسی کاملی به نود DOM `<input>` زیرین نخواهد داشت.

<Sandpack>

```js
import { useRef } from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form>
      <MyInput placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```js src/MyInput.js
import { useRef, useImperativeHandle } from 'react';

function MyInput({ ref, ...props }) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      scrollIntoView() {
        inputRef.current.scrollIntoView();
      },
    };
  }, []);

  return <input {...props} ref={inputRef} />;
};

export default MyInput;
```

```css
input {
  margin: 5px;
}
```

</Sandpack>

---

### آشکار کردن متدهای imperative خودتان {/*exposing-your-own-imperative-methods*/}

متدهایی که از طریق یک imperative handle آشکار می‌کنید نیازی نیست دقیقاً با متدهای DOM مطابقت داشته باشند. برای مثال، این کامپوننت `Post` یک متد `scrollAndFocusAddComment` را از طریق یک imperative handle آشکار می‌کند. این به والد `Page` اجازه می‌دهد هنگامی که روی دکمه کلیک می‌کنید لیست نظرات را اسکرول کند *و* فیلد ورودی را فوکوس کند:

<Sandpack>

```js
import { useRef } from 'react';
import Post from './Post.js';

export default function Page() {
  const postRef = useRef(null);

  function handleClick() {
    postRef.current.scrollAndFocusAddComment();
  }

  return (
    <>
      <button onClick={handleClick}>
        Write a comment
      </button>
      <Post ref={postRef} />
    </>
  );
}
```

```js src/Post.js
import { useRef, useImperativeHandle } from 'react';
import CommentList from './CommentList.js';
import AddComment from './AddComment.js';

function Post({ ref }) {
  const commentsRef = useRef(null);
  const addCommentRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      scrollAndFocusAddComment() {
        commentsRef.current.scrollToBottom();
        addCommentRef.current.focus();
      }
    };
  }, []);

  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  );
};

export default Post;
```


```js src/CommentList.js
import { useRef, useImperativeHandle } from 'react';

function CommentList({ ref }) {
  const divRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      scrollToBottom() {
        const node = divRef.current;
        node.scrollTop = node.scrollHeight;
      }
    };
  }, []);

  let comments = [];
  for (let i = 0; i < 50; i++) {
    comments.push(<p key={i}>Comment #{i}</p>);
  }

  return (
    <div className="CommentList" ref={divRef}>
      {comments}
    </div>
  );
}

export default CommentList;
```

```js src/AddComment.js
import { useRef, useImperativeHandle } from 'react';

function AddComment({ ref }) {
  return <input placeholder="Add comment..." ref={ref} />;
}

export default AddComment;
```

```css
.CommentList {
  height: 100px;
  overflow: scroll;
  border: 1px solid black;
  margin-top: 20px;
  margin-bottom: 20px;
}
```

</Sandpack>

<Pitfall>

**از رفرنس‌ها زیاده‌روی نکنید.** باید فقط از رفرنس‌ها برای رفتارهای *imperative* استفاده کنید که نمی‌توانید آن‌ها را به‌صورت پراپس بیان کنید: برای مثال، اسکرول به یک نود، فوکوس یک نود، راه‌اندازی یک انیمیشن، انتخاب متن، و غیره.

**اگر می‌توانید چیزی را به‌صورت یک پراپ بیان کنید، نباید از رفرنس استفاده کنید.** برای مثال، به‌جای آشکار کردن یک imperative handle مانند `{ open, close }` از یک کامپوننت `Modal`، بهتر است `isOpen` را به‌عنوان یک پراپ مانند `<Modal isOpen={isOpen} />` بپذیرید. [افکت‌ها](/learn/synchronizing-with-effects) می‌توانند به شما کمک کنند رفتارهای imperative را از طریق پراپس آشکار کنید.

</Pitfall>
