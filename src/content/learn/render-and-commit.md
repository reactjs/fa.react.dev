---
title: Render and Commit
---

<Intro>
قبل از اینکه اجزای شما روی صفحه نمایش نمایش داده شوند، باید توسط ری ‌‌اکت رندر شوند. درک مراحل این فرآیند به شما کمک خواهد کرد تا در مورد اجرای کد  فکر کنید و رفتار آن را توضیح دهید.
</Intro>

<YouWillLearn>

* رندرینگ در ری اکت چیست؟
*چه زمانی و چرا ری‌اکت یک کامپوننت را راندر میکند؟
*گامهایی که در نشان دادن یک کامپوننت روی صفحه برداشته می‌شوند
*چرا رندرینگ همیشه باعث تغییر در دام نمیشود (دامین ابجکت مدل)

</YouWillLearn>
<p dir="rtl">
تصور کنید که کامپوننت‌های شما در اشپزخانه پخته می‌شوند٬ مثل ساختن بشقاب‌های غذای خوشمزه از مواد اولیه.
در این سناریو ری‌اکت مثل یک گارسون است که درخواست مشتریان را تحویل می‌دهد و غذا آنها را تحویلشان می‌دهد.این فرآیند درخواست دادن و ارائه به یوآی سه مرحله دارد:

1. **Triggering** a render (رساندن سفارش مشتری به اشپزخانه)
2. **Rendering** the component (ساختن سفارش در اشپزخانه)
3. **Committing** to the DOM (گذاشتن سفارش روی میز مشتری)
</p>

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

## Step 1: Trigger a render {/*step-1-trigger-a-render*/}

دو دلیل برای کامپوننت وجود دارد تا رندر شود:
1. It's the component's **initial render.**
2. The component's (or one of its ancestors') **state has been updated.**
۱-رندر اولیه ی کامپوننت
۲-استیت خود کامپوننت یا یکی از والدینش اپدیت شده است
### Initial render {/*initial-render*/}

زمانی که برنامه‌ی شما شروع می‌شود، باید اقدام به اجرای اولیه کنید. گاهی اوقات چارچوب‌ها و محیط‌های مجازی این کد را مخفی می‌کنند، اما این کار با فراخوانی [`createRoot`](/reference/react-dom/client/createRoot) باگرفتن گره DOM مورد نظر انجام می‌شود و سپس با فراخوانی متد `render` آن با کامپوننت شما:
<Sandpack>

```js index.js active
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

```js Image.js
export default function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

</Sandpack>

سعی کنید فراخوانی `root.render()` را کامنت کنید و مشاهده کنید که کامپوننت ناپدید می‌شود!
### Re-renders when state updates {/*re-renders-when-state-updates*/}

پس از اینکه کامپوننت ابتدا رندر شده باشد، می‌توانید با به روزرسانی وضعیت آن با استفاده از [تابع `set`](/reference/react/useState#setstate) رندرهای بیشتری را فراخوانی کنید. به‌روزرسانی وضعیت کامپوننت شما به طور خودکار یک رندر را در صف قرار می‌دهد. (می‌توانید این را تصور کنید که یک میهمان در یک رستوران پس از دادن سفارش اولیه‌اش، به ترتیب بر اساس وضعیت تشنگی یا گرسنگی خود، چای، دسر و انواع چیزهای دیگری سفارش می‌دهد.)
<IllustrationBlock sequential>
  <Illustration caption="State update..." alt="React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!" src="/images/docs/illustrations/i_rerender1.png" />
  <Illustration caption="...triggers..." alt="React returns to the Component Kitchen and tells the Card Chef they need a pink Card." src="/images/docs/illustrations/i_rerender2.png" />
  <Illustration caption="...render!" alt="The Card Chef gives React the pink Card." src="/images/docs/illustrations/i_rerender3.png" />
</IllustrationBlock>

## Step 2: React renders your components {/*step-2-react-renders-your-components*/}
<p dir="rtl">
بعد از اجرای یک رندر، React اجزای شما را فراخوانی می‌کند تا بفهمد چه چیزی را در صفحه نمایش نشان دهد. **"رندر کردن" به معنای فراخوانی اجزای شما توسط React است.**

- **در رندر اولیه،** React اجزای ریشه (root) را فراخوانی خواهد کرد.
- **برای رندرهای بعدی،** React تابع کامپوننتی را که به روزرسانی وضعیت آن رندر را فراخوانی کرده است، فراخوانی می‌کند.

این فرآیند بازگشتی است: اگر کامپوننت به‌روزرسانی شده، کامپوننت دیگری را برگرداند، React بعدی را نیز رندر خواهد کرد، و اگر آن کامپوننت نیز چیزی را برگرداند، کامپوننت بعدی را رندر می‌کند و این عملیات تا زمانی ادامه دارد که کامپوننت‌های تو در تو دیگری نباشند و React دقیقاً بداند چه چیزی باید در صفحه نمایش نمایش داده شود.
</p>
<Sandpack>

```js Gallery.js active
export default function Gallery() {
  return (
    <section>
      <h1>Inspiring Sculptures</h1>
      <Image />
      <Image />
      <Image />
    </section>
  );
}

function Image() {
  return (
    <img
      src="https://i.imgur.com/ZF6s192.jpg"
      alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}
```

```js index.js
import Gallery from './Gallery.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Gallery />);
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

* **During the initial render,** React will [create the DOM nodes](https://developer.mozilla.org/docs/Web/API/Document/createElement) for `<section>`, `<h1>`, and three `<img>` tags. 
* **During a re-render,** React will calculate which of their properties, if any, have changed since the previous render. It won't do anything with that information until the next step, the commit phase.

<Pitfall>

Rendering must always be a [pure calculation](/learn/keeping-components-pure):

* **Same inputs, same output.** Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
* **It minds its own business.** It should not change any objects or variables that existed before rendering. (One order should not change anyone else's order.)

Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in "Strict Mode", React calls each component's function twice, which can help surface mistakes caused by impure functions.

</Pitfall>

<DeepDive>

#### Optimizing performance {/*optimizing-performance*/}

The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the [Performance](https://reactjs.org/docs/optimizing-performance.html) section. **Don't optimize prematurely!**

</DeepDive>

## Step 3: React commits changes to the DOM {/*step-3-react-commits-changes-to-the-dom*/}

After rendering (calling) your components, React will modify the DOM. 

* **For the initial render,** React will use the [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API to put all the DOM nodes it has created on screen. 
* **For re-renders,** React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

**React only changes the DOM nodes if there's a difference between renders.** For example, here is a component that re-renders with different props passed from its parent every second. Notice how you can add some text into the `<input>`, updating its `value`, but the text doesn't disappear when the component re-renders:

<Sandpack>

```js Clock.js active
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```

```js App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  return (
    <Clock time={time.toLocaleTimeString()} />
  );
}
```

</Sandpack>

This works because during this last step, React only updates the content of `<h1>` with the new `time`. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn't touch the `<input>`—or its `value`!
## Epilogue: Browser paint {/*epilogue-browser-paint*/}

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as "browser rendering", we'll refer to it as "painting" to avoid confusion throughout the docs.

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

<Recap>

* Any screen update in a React app happens in three steps:
  1. Trigger
  2. Render
  3. Commit
* You can use Strict Mode to find mistakes in your components
* React does not touch the DOM if the rendering result is the same as last time

</Recap>

