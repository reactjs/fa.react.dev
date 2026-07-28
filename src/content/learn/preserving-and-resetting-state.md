---
title: حفظ و بازنشانی استیت
---

<Intro>

استیت بین کامپوننت‌ها ایزوله است. React بر اساس مکان آن‌ها در درخت رابط کاربری پیگیری می‌کند که کدام استیت متعلق به کدام کامپوننت است. می‌توانید کنترل کنید که چه زمان استیت را حفظ کنید و چه زمان بین رندرهای مجدد آن را بازنشانی کنید.

</Intro>

<YouWillLearn>

* چه زمان React انتخاب می‌کند استیت را حفظ یا بازنشانی کند
* چگونه React را مجبور کنید استیت کامپوننت را بازنشانی کند
* چگونه کلیدها (keys) و تایپ‌ها بر حفظ یا عدم حفظ استیت تأثیر می‌گذارند

</YouWillLearn>

## استیت به موقعیتی در درخت رندر متصل است {/*state-is-tied-to-a-position-in-the-tree*/}

React برای ساختار کامپوننت در رابط کاربری شما [درخت‌های رندر](learn/understanding-your-ui-as-a-tree#the-render-tree) می‌سازد.

وقتی به یک کامپوننت استیت می‌دهید، ممکن است فکر کنید استیت «زندگی» می‌کند داخل کامپوننت. اما استیت در واقع داخل React نگه‌داری می‌شود. React هر قطعه از استیتی که نگه می‌دارد را با کامپوننت درست، بر اساس جایی که آن کامپوننت در درخت رندر قرار دارد مرتبط می‌کند.

اینجا، فقط یک تگ JSX `<Counter />` وجود دارد، اما در دو موقعیت متفاوت رندر می‌شود:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

این‌ها به‌صورت یک درخت این‌گونه به‌نظر می‌رسند:

<DiagramGroup>

<Diagram name="preserving_state_tree" height={248} width={395} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. Each of the children are labeled 'Counter' and both contain a state bubble labeled 'count' with value 0.">

درخت React

</Diagram>

</DiagramGroup>

**این‌ها دو شمارندهٔ جداگانه هستند زیرا هرکدام در موقعیت خودشان در درخت رندر می‌شوند.** معمولاً برای استفاده از React نیازی نیست دربارهٔ این موقعیت‌ها فکر کنید، اما می‌تواند مفید باشد که نحوهٔ کار آن را درک کنید.

در React، هر کامپوننت روی صفحه استیت کاملاً ایزوله‌ای دارد. مثلاً، اگر دو کامپوننت `Counter` را کنار هم رندر کنید، هرکدام استیت `score` و `hover` مستقل خودش را خواهد داشت.

هر دو شمارنده را کلیک کنید و توجه کنید که روی هم تأثیری ندارند:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

همان‌طور که می‌بینید، وقتی یک شمارنده به‌روزرسانی می‌شود، فقط استیت همان کامپوننت به‌روزرسانی می‌شود:


<DiagramGroup>

<Diagram name="preserving_state_increment" height={248} width={441} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 1. The state bubble of the right child is highlighted in yellow to indicate its value has updated.">

به‌روزرسانی استیت

</Diagram>

</DiagramGroup>


React استیت را تا زمانی که همان کامپوننت را در همان موقعیت در درخت رندر می‌کنید حفظ می‌کند. برای دیدن این، هر دو شمارنده را افزایش دهید، سپس کامپوننت دوم را با برداشتن تیک چک‌باکس «Render the second counter» حذف کنید، و سپس با تیک زدن دوباره آن را اضافه کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

توجه کنید که به‌محض اینکه رندر کردن شمارندهٔ دوم را متوقف می‌کنید، استیتش کاملاً ناپدید می‌شود. این به آن دلیل است که وقتی React یک کامپوننت را حذف می‌کند، استیت آن را نابود می‌کند.

<DiagramGroup>

<Diagram name="preserving_state_remove_component" height={253} width={422} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is missing, and in its place is a yellow 'poof' image, highlighting the component being deleted from the tree.">

حذف یک کامپوننت

</Diagram>

</DiagramGroup>

وقتی «Render the second counter» را تیک می‌زنید، یک `Counter` دوم و استیت آن از صفر (`score = 0`) مقداردهی اولیه شده و به DOM اضافه می‌شود.

<DiagramGroup>

<Diagram name="preserving_state_add_component" height={258} width={500} alt="Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The entire right child node is highlighted in yellow, indicating that it was just added to the tree.">

افزودن یک کامپوننت

</Diagram>

</DiagramGroup>

**React استیت یک کامپوننت را تا زمانی که در موقعیتش در درخت رابط کاربری رندر می‌شود حفظ می‌کند.** اگر حذف شود، یا کامپوننت متفاوتی در همان موقعیت رندر شود، React استیت آن را دور می‌ریزد.

## همان کامپوننت در همان موقعیت استیت را حفظ می‌کند {/*same-component-at-the-same-position-preserves-state*/}

در این مثال، دو تگ `<Counter />` متفاوت وجود دارد:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

وقتی چک‌باکس را تیک می‌زنید یا پاک می‌کنید، استیت شمارنده بازنشانی نمی‌شود. چه `isFancy` مقدار `true` باشد چه `false`، همیشه یک `<Counter />` به‌عنوان اولین فرزند `div` بازگشتی از کامپوننت ریشهٔ `App` دارید:

<DiagramGroup>

<Diagram name="preserving_state_same_component" height={461} width={600} alt="Diagram with two sections separated by an arrow transitioning between them. Each section contains a layout of components with a parent labeled 'App' containing a state bubble labeled isFancy. This component has one child labeled 'div', which leads to a prop bubble containing isFancy (highlighted in purple) passed down to the only child. The last child is labeled 'Counter' and contains a state bubble with label 'count' and value 3 in both diagrams. In the left section of the diagram, nothing is highlighted and the isFancy parent state value is false. In the right section of the diagram, the isFancy parent state value has changed to true and it is highlighted in yellow, and so is the props bubble below, which has also changed its isFancy value to true.">

به‌روزرسانی استیت `App` بازنشانی نمی‌کند `Counter` را زیرا `Counter` در همان موقعیت می‌ماند

</Diagram>

</DiagramGroup>


همان کامپوننت در همان موقعیت است، پس از دید React، این همان شمارنده است.

<Pitfall>

به یاد داشته باشید که **موقعیت در درخت رابط کاربری است — نه در markup JSX — که برای React اهمیت دارد!** این کامپوننت دو عبارت `return` با تگ‌های JSX `<Counter />` متفاوت داخل و خارج `if` دارد:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

ممکن است انتظار داشته باشید وقتی چک‌باکس را تیک می‌زنید استیت بازنشانی شود، اما نمی‌شود! این به آن دلیل است که **هر دوی این تگ‌های `<Counter />` در همان موقعیت رندر می‌شوند.** React نمی‌داند شما شرایط را کجا در تابع خود قرار می‌دهید. همهٔ چیزی که «می‌بیند» درختی است که برمی‌گردانید.

در هر دو مورد، کامپوننت `App` یک `<div>` با `<Counter />` به‌عنوان اولین فرزند برمی‌گرداند. برای React، این دو شمارنده «آدرس» یکسانی دارند: اولین فرزندِ اولین فرزندِ ریشه. این است که React چگونه آن‌ها را بین رندرهای قبلی و بعدی مطابقت می‌دهد، بدون توجه به اینکه چگونه منطق خود را ساختاردهی می‌کنید.

</Pitfall>

## کامپوننت‌های متفاوت در همان موقعیت استیت را بازنشانی می‌کنند {/*different-components-at-the-same-position-reset-state*/}

در این مثال، تیک زدن چک‌باکس `<Counter>` را با یک `<p>` جایگزین خواهد کرد:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>See you later!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

اینجا، شما بین _تایپ‌های_ کامپوننت متفاوت در همان موقعیت جابه‌جا می‌شوید. در ابتدا، اولین فرزند `<div>` حاوی یک `Counter` بود. اما وقتی یک `p` جایگزین کردید، React `Counter` را از درخت رابط کاربری حذف کرد و استیتش را نابود کرد.

<DiagramGroup>

<Diagram name="preserving_state_diff_pt1" height={290} width={753} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'p', highlighted in yellow.">

وقتی `Counter` به `p` تغییر می‌کند، `Counter` حذف و `p` اضافه می‌شود

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_pt2" height={290} width={753} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'p'. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, highlighted in yellow.">

هنگام جابه‌جایی به عقب، `p` حذف و `Counter` اضافه می‌شود

</Diagram>

</DiagramGroup>

همچنین، **وقتی یک کامپوننت متفاوت را در همان موقعیت رندر می‌کنید، استیت کل زیردرخت آن را بازنشانی می‌کند.** برای دیدن نحوهٔ کار این، شمارنده را افزایش دهید و سپس چک‌باکس را تیک بزنید:

<Sandpack>

```js
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
label {
  display: block;
  clear: both;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
  float: left;
}

.fancy {
  border: 5px solid gold;
  color: #ff6767;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

استیت شمارنده وقتی چک‌باکس را کلیک می‌کنید بازنشانی می‌شود. هرچند یک `Counter` رندر می‌کنید، اولین فرزند `div` از یک `section` به یک `div` تغییر می‌کند. وقتی `section` فرزند از DOM حذف شد، کل درخت زیر آن (شامل `Counter` و استیتش) هم نابود شد.

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt1" height={350} width={794} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.">

وقتی `section` به `div` تغییر می‌کند، `section` حذف و `div` جدید اضافه می‌شود

</Diagram>

</DiagramGroup>

<DiagramGroup>

<Diagram name="preserving_state_diff_same_pt2" height={350} width={794} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'div', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 0. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'section', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.">

هنگام جابه‌جایی به عقب، `div` حذف و `section` جدید اضافه می‌شود

</Diagram>

</DiagramGroup>

به‌عنوان یک قاعدهٔ کلی، **اگر می‌خواهید استیت را بین رندرهای مجدد حفظ کنید، ساختار درخت شما نیاز است از یک رندر به رندر دیگر «مطابقت داشته باشد».** اگر ساختار متفاوت باشد، استیت نابود می‌شود زیرا React هنگام حذف یک کامپوننت از درخت استیت را نابود می‌کند.

<Pitfall>

به همین دلیل است که نباید تعاریف تابع کامپوننت را تودرتو کنید.

اینجا، تابع کامپوننت `MyTextField` *داخل* `MyComponent` تعریف شده است:

<Sandpack>

```js {expectedErrors: {'react-compiler': [7]}}
import { useState } from 'react';

export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Clicked {counter} times</button>
    </>
  );
}
```

</Sandpack>


هر بار که دکمه را کلیک می‌کنید، استیت ورودی ناپدید می‌شود! این به آن دلیل است که یک تابع `MyTextField` *متفاوت* برای هر رندر `MyComponent` ساخته می‌شود. شما یک کامپوننت *متفاوت* را در همان موقعیت رندر می‌کنید، پس React تمام استیت زیرین را بازنشانی می‌کند. این به باگ و مشکلات عملکرد منجر می‌شود. برای پرهیز از این مشکل، **همیشه توابع کامپوننت را در سطح بالا تعریف کنید، و تعاریفشان را تودرتو نکنید.**

</Pitfall>

## بازنشانی استیت در همان موقعیت {/*resetting-state-at-the-same-position*/}

به‌طور پیش‌فرض، React استیت یک کامپوننت را تا زمانی که در همان موقعیت بماند حفظ می‌کند. معمولاً این دقیقاً همان چیزی است که می‌خواهید، پس به‌عنوان رفتار پیش‌فرض منطقی است. اما گاهی ممکن است بخواهید استیت یک کامپوننت را بازنشانی کنید. این اپلیکیشن را در نظر بگیرید که به دو بازیکن اجازه می‌دهد امتیازاتشان را در طول هر نوبت پیگیری کنند:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

در حال حاضر، وقتی بازیکن را تغییر می‌دهید، امتیاز حفظ می‌شود. دو `Counter` در همان موقعیت ظاهر می‌شوند، پس React آن‌ها را *همان* `Counter` می‌بیند که پراپ `person` آن تغییر کرده.

اما از نظر مفهومی، در این اپلیکیشن باید دو شمارندهٔ جداگانه باشند. ممکن است در همان مکان در رابط کاربری ظاهر شوند، اما یکی شمارنده‌ای برای Taylor است، و دیگری شمارنده‌ای برای Sarah.

دو راه برای بازنشانی استیت هنگام جابه‌جایی بین آن‌ها وجود دارد:

1. کامپوننت‌ها را در موقعیت‌های متفاوت رندر کنید
2. به هر کامپوننت یک هویت صریح با `key` بدهید


### گزینهٔ ۱: رندر کردن یک کامپوننت در موقعیت‌های متفاوت {/*option-1-rendering-a-component-in-different-positions*/}

اگر می‌خواهید این دو `Counter` مستقل باشند، می‌توانید آن‌ها را در دو موقعیت متفاوت رندر کنید:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

* در ابتدا، `isPlayerA` مقدار `true` است. پس موقعیت اول حاوی استیت `Counter` است، و دومی خالی است.
* وقتی دکمهٔ «Next player» را کلیک می‌کنید موقعیت اول پاک می‌شود اما دومی اکنون حاوی یک `Counter` است.

<DiagramGroup>

<Diagram name="preserving_state_diff_position_p1" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The only child, arranged to the left, is labeled Counter with a state bubble labeled 'count' and value 0. All of the left child is highlighted in yellow, indicating it was added.">

استیت اولیه

</Diagram>

<Diagram name="preserving_state_diff_position_p2" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'false'. The state bubble is highlighted in yellow, indicating that it has changed. The left child is replaced with a yellow 'poof' image indicating that it has been deleted and there is a new child on the right, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0.">

کلیک روی «next»

</Diagram>

<Diagram name="preserving_state_diff_position_p3" height={375} width={504} alt="Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The state bubble is highlighted in yellow, indicating that it has changed. There is a new child on the left, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is replaced with a yellow 'poof' image indicating that it has been deleted.">

کلیک دوباره روی «next»

</Diagram>

</DiagramGroup>

استیت هر `Counter` هر بار که از DOM حذف می‌شود نابود می‌گردد. به همین دلیل هر بار که دکمه را کلیک می‌کنید بازنشانی می‌شوند.

این راه‌حل وقتی راحت است که فقط چند کامپوننت مستقل در همان مکان رندر شده باشند. در این مثال، فقط دو کامپوننت دارید، پس دردسری نیست که هر دو را جداگانه در JSX رندر کنید.

### گزینهٔ ۲: بازنشانی استیت با یک کلید {/*option-2-resetting-state-with-a-key*/}

همچنین راه دیگر، عمومی‌تری برای بازنشانی استیت یک کامپوننت وجود دارد.

ممکن است `key`ها را هنگام [رندر لیست‌ها](/learn/rendering-lists#keeping-list-items-in-order-with-key) دیده باشید. کلیدها فقط برای لیست‌ها نیستند! می‌توانید از کلیدها استفاده کنید تا React بین هر کامپوننتی تمایز قائل شود. به‌طور پیش‌فرض، React از ترتیب داخل والد («first counter»، «second counter») برای تشخیص بین کامپوننت‌ها استفاده می‌کند. اما کلیدها به شما اجازه می‌دهند به React بگویید که این فقط شمارندهٔ *اول* یا *دوم* نیست، بلکه شمارندهٔ خاصی است — مثلاً شمارندهٔ *Taylor*. این‌گونه، React شمارندهٔ *Taylor* را هرجا در درخت ظاهر شود می‌شناسد!

در این مثال، دو `<Counter />` استیت را به اشتراک نمی‌گذارند حتی اگر در همان مکان در JSX ظاهر شوند:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

```css
h1 {
  font-size: 18px;
}

.counter {
  width: 100px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
}

.hover {
  background: #ffffd8;
}
```

</Sandpack>

جابه‌جایی بین Taylor و Sarah استیت را حفظ نمی‌کند. این به آن دلیل است که **به آن‌ها `key`های متفاوتی دادید:**

```js
{isPlayerA ? (
  <Counter key="Taylor" person="Taylor" />
) : (
  <Counter key="Sarah" person="Sarah" />
)}
```

مشخص کردن یک `key` به React می‌گوید که از خود `key` به‌عنوان بخشی از موقعیت استفاده کند، به‌جای ترتیبشان داخل والد. به همین دلیل، حتی اگر آن‌ها را در همان مکان در JSX رندر کنید، React آن‌ها را به‌عنوان دو شمارندهٔ متفاوت می‌بیند، و پس هرگز استیت را به اشتراک نمی‌گذارند. هر بار که یک شمارنده روی صفحه ظاهر می‌شود، استیتش ساخته می‌شود. هر بار که حذف می‌شود، استیتش نابود می‌گردد. جابه‌جایی بین آن‌ها استیتشان را بارها و بارها بازنشانی می‌کند.

<Note>

به یاد داشته باشید که کلیدها به‌طور سراسری یکتا نیستند. آن‌ها فقط موقعیت *داخل والد* را مشخص می‌کنند.

</Note>

### بازنشانی یک فرم با یک کلید {/*resetting-a-form-with-a-key*/}

بازنشانی استیت با یک کلید هنگام کار با فرم‌ها به‌ویژه مفید است.

در این اپلیکیشن چت، کامپوننت `<Chat>` حاوی استیت ورودی متنی است:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

چیزی را در ورودی تایپ کنید، و سپس «Alice» یا «Bob» را برای انتخاب گیرندهٔ متفاوت فشار دهید. متوجه خواهید شد که استیت ورودی حفظ می‌شود زیرا `<Chat>` در همان موقعیت در درخت رندر می‌شود.

**در بسیاری از اپلیکیشن‌ها، این ممکن است رفتار مطلوب باشد، اما نه در یک اپلیکیشن چت!** نمی‌خواهید به کاربر اجازه دهید پیامی که قبلاً تایپ کرده به‌خاطر یک کلیک تصادفی به شخص اشتباهی بفرستد. برای رفع این، یک `key` اضافه کنید:

```js
<Chat key={to.id} contact={to} />
```

این تضمین می‌کند وقتی گیرندهٔ متفاوتی انتخاب می‌کنید، کامپوننت `Chat` از صفر بازسازی می‌شود، شامل هر استیتی در درخت زیرین آن. React همچنین عناصر DOM را به‌جای استفادهٔ مجدد دوباره می‌سازد.

اکنون جابه‌جایی گیرنده همیشه فیلد متنی را پاک می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={contact => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  )
}

const contacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/Chat.js
import { useState } from 'react';

export default function Chat({ contact }) {
  const [text, setText] = useState('');
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={'Chat to ' + contact.name}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button>Send to {contact.email}</button>
    </section>
  );
}
```

```css
.chat, .contact-list {
  float: left;
  margin-bottom: 20px;
}
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li button {
  width: 100px;
  padding: 10px;
  margin-right: 10px;
}
textarea {
  height: 150px;
}
```

</Sandpack>

<DeepDive>

#### حفظ استیت برای کامپوننت‌های حذف‌شده {/*preserving-state-for-removed-components*/}

در یک اپلیکیشن چت واقعی، احتمالاً می‌خواهید وقتی کاربر گیرندهٔ قبلی را دوباره انتخاب می‌کند استیت ورودی را بازیابی کنید. چند راه برای نگه‌داشتن استیت «زنده» برای کامپوننتی که دیگر قابل‌مشاهده نیست وجود دارد:

- می‌توانید _همهٔ_ چت‌ها را به‌جای فقط چت فعلی رندر کنید، اما بقیه را با CSS پنهان کنید. چت‌ها از درخت حذف نمی‌شوند، پس استیت محلی آن‌ها حفظ می‌شود. این راه‌حل برای رابط‌های کاربری ساده عالی کار می‌کند. اما اگر درخت‌های پنهان بزرگ باشند و حاوی نودهای DOM زیادی باشند می‌تواند بسیار کند شود.
- می‌توانید [استیت را بالا ببرید](/learn/sharing-state-between-components) و پیام معلق را برای هر گیرنده در کامپوننت والد نگه دارید. این‌گونه، وقتی کامپوننت‌های فرزند حذف می‌شوند، اهمیتی ندارد، زیرا والد است که اطلاعات مهم را نگه می‌دارد. این رایج‌ترین راه‌حل است.
- همچنین ممکن است از منبع متفاوتی به‌ضافه استیت React استفاده کنید. مثلاً، احتمالاً می‌خواهید پیش‌نویس پیام حتی اگر کاربر به‌طور تصادفی صفحه را بست ماندگار باشد. برای پیاده‌سازی این، می‌توانید کامپوننت `Chat` را داشته باشید که استیتش را با خواندن از [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) مقداردهی اولیه کند، و پیش‌نویس‌ها را هم آنجا ذخیره کند.

بدون توجه به اینکه کدام استراتژی را انتخاب می‌کنید، یک چت _با Alice_ از نظر مفهومی متمایز از یک چت _با Bob_ است، پس منطقی است که یک `key` به درخت `<Chat>` بر اساس گیرندهٔ فعلی بدهید.

</DeepDive>

<Recap>

- React استیت را تا زمانی که همان کامپوننت در همان موقعیت رندر می‌شود حفظ می‌کند.
- استیت در تگ‌های JSX نگه‌داری نمی‌شود. با موقعیت درختی که آن JSX را در آن قرار می‌دهید مرتبط است.
- می‌توانید یک زیردرخت را مجبور کنید استیتش را با دادن کلید متفاوت بازنشانی کند.
- تعاریف کامپوننت را تودرتو نکنید، وگرنه به‌طور تصادفی استیت را بازنشانی می‌کنید.

</Recap>



<Challenges>

#### رفع متن ورودی ناپدیدشده {/*fix-disappearing-input-text*/}

این مثال وقتی دکمه را فشار می‌دهید پیامی نمایش می‌دهد. با این حال، فشار دادن دکمه همچنین به‌طور تصادفی ورودی را بازنشانی می‌کند. چرا این اتفاق می‌افتد؟ آن را برطرف کنید تا فشار دادن دکمه متن ورودی را بازنشانی نکند.

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      </div>
    );
  }
  return (
    <div>
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Show hint</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>

مشکل این است که `Form` در موقعیت‌های متفاوتی رندر می‌شود. در شاخهٔ `if`، دومین فرزند `<div>` است، اما در شاخهٔ `else`، اولین فرزند است. بنابراین، تایپ کامپوننت در هر موقعیت تغییر می‌کند. موقعیت اول بین نگه‌داشتن یک `p` و یک `Form` تغییر می‌کند، در حالی که موقعیت دوم بین نگه‌داشتن یک `Form` و یک `button` تغییر می‌نماید. React هر بار که تایپ کامپوننت تغییر می‌کند استیت را بازنشانی می‌کند.

ساده‌ترین راه‌حل متحد کردن شاخه‌هاست تا `Form` همیشه در همان موقعیت رندر شود:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      {showHint &&
        <p><i>Hint: Your favorite city?</i></p>
      }
      <Form />
      {showHint ? (
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      ) : (
        <button onClick={() => {
          setShowHint(true);
        }}>Show hint</button>
      )}
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>


از نظر فنی، می‌توانستید همچنین `null` را قبل از `<Form />` در شاخهٔ `else` اضافه کنید تا با ساختار شاخهٔ `if` مطابقت داشته باشد:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [showHint, setShowHint] = useState(false);
  if (showHint) {
    return (
      <div>
        <p><i>Hint: Your favorite city?</i></p>
        <Form />
        <button onClick={() => {
          setShowHint(false);
        }}>Hide hint</button>
      </div>
    );
  }
  return (
    <div>
      {null}
      <Form />
      <button onClick={() => {
        setShowHint(true);
      }}>Show hint</button>
    </div>
  );
}

function Form() {
  const [text, setText] = useState('');
  return (
    <textarea
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
```

```css
textarea { display: block; margin: 10px 0; }
```

</Sandpack>

این‌گونه، `Form` همیشه دومین فرزند است، پس در همان موقعیت می‌ماند و استیتش را حفظ می‌کند. اما این رویکرد بسیار کم‌تر بدیهی است و این ریسک را ایجاد می‌کند که شخص دیگری آن `null` را حذف کند.

</Solution>

#### جابه‌جایی دو فیلد فرم {/*swap-two-form-fields*/}

این فرم به شما اجازه می‌دهد نام و نام خانوادگی را وارد کنید. همچنین یک چک‌باکس دارد که کنترل می‌کند کدام فیلد اول می‌رود. وقتی چک‌باکس را تیک می‌زنید، فیلد «Last name» قبل از فیلد «First name» ظاهر می‌شود.

تقریباً کار می‌کند، اما یک باگ وجود دارد. اگر فیلد «First name» را پر کنید و چک‌باکس را تیک بزنید، متن در اولین ورودی (که اکنون «Last name» است) می‌ماند. آن را برطرف کنید تا متن ورودی *همچنین* وقتی ترتیب را معکوس می‌کنید جابه‌جا شود.

<Hint>

به نظر می‌رسد برای این فیلدها، موقعیتشان داخل والد کافی نیست. آیا راهی وجود دارد که به React بگویید چگونه استیت را بین رندرهای مجدد مطابقت دهد؟

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field label="Last name" /> 
        <Field label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field label="First name" /> 
        <Field label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

<Solution>

به هر دو کامپوننت `<Field>` در هر دو شاخهٔ `if` و `else` یک `key` بدهید. این به React می‌گوید چگونه استیت درست را برای هر `<Field>` «مطابقت دهد» حتی اگر ترتیبشان داخل والد تغییر کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';

export default function App() {
  const [reverse, setReverse] = useState(false);
  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={e => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );
  if (reverse) {
    return (
      <>
        <Field key="lastName" label="Last name" /> 
        <Field key="firstName" label="First name" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field key="firstName" label="First name" /> 
        <Field key="lastName" label="Last name" />
        {checkbox}
      </>
    );    
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <label>
      {label}:{' '}
      <input
        type="text"
        value={text}
        placeholder={label}
        onChange={e => setText(e.target.value)}
      />
    </label>
  );
}
```

```css
label { display: block; margin: 10px 0; }
```

</Sandpack>

</Solution>

#### بازنشانی یک فرم جزئیات {/*reset-a-detail-form*/}

این یک فهرست تماس قابل‌ویرایش است. می‌توانید جزئیات تماس انتخاب‌شده را ویرایش کنید و سپس یا «Save» را برای به‌روزرسانی فشار دهید، یا «Reset» را برای برگرداندن تغییرات.

وقتی تماس متفاوتی را انتخاب می‌کنید (مثلاً، Alice)، استیت به‌روزرسانی می‌شود اما فرم جزئیات تماس قبلی را نمایش می‌دهد. آن را برطرف کنید تا وقتی تماس انتخاب‌شده تغییر می‌کند فرم بازنشانی شود.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

`key={selectedId}` را به کامپوننت `EditContact` بدهید. این‌گونه، جابه‌جایی بین تماس‌های متفاوت فرم را بازنشانی می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ContactList from './ContactList.js';
import EditContact from './EditContact.js';

export default function ContactManager() {
  const [
    contacts,
    setContacts
  ] = useState(initialContacts);
  const [
    selectedId,
    setSelectedId
  ] = useState(0);
  const selectedContact = contacts.find(c =>
    c.id === selectedId
  );

  function handleSave(updatedData) {
    const nextContacts = contacts.map(c => {
      if (c.id === updatedData.id) {
        return updatedData;
      } else {
        return c;
      }
    });
    setContacts(nextContacts);
  }

  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={selectedId}
        onSelect={id => setSelectedId(id)}
      />
      <hr />
      <EditContact
        key={selectedId}
        initialData={selectedContact}
        onSave={handleSave}
      />
    </div>
  )
}

const initialContacts = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
```

```js src/ContactList.js
export default function ContactList({
  contacts,
  selectedId,
  onSelect
}) {
  return (
    <section>
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact.id);
            }}>
              {contact.id === selectedId ?
                <b>{contact.name}</b> :
                contact.name
              }
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
```

```js src/EditContact.js
import { useState } from 'react';

export default function EditContact({ initialData, onSave }) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  return (
    <section>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Email:{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: initialData.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        Save
      </button>
      <button onClick={() => {
        setName(initialData.name);
        setEmail(initialData.email);
      }}>
        Reset
      </button>
    </section>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li { display: inline-block; }
li button {
  padding: 10px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

</Solution>

#### پاک کردن یک تصویر هنگام بارگذاری {/*clear-an-image-while-its-loading*/}

وقتی «Next» را فشار می‌دهید، مرورگر شروع به بارگذاری تصویر بعدی می‌کند. با این حال، چون در همان تگ `<img>` نمایش داده می‌شود، به‌طور پیش‌فرض همچنان تصویر قبلی را می‌بینید تا تصویر بعدی بارگذاری شود. این ممکن است نامطلوب باشد اگر مهم باشد که متن همیشه با تصویر مطابقت داشته باشد. آن را تغییر دهید تا به‌محض اینکه «Next» را فشار می‌دهید، تصویر قبلی بلافاصله پاک شود.

<Hint>

آیا راهی وجود دارد که به React بگویید DOM را به‌جای استفادهٔ مجدد دوباره بسازد؟

</Hint>

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

<Solution>

می‌توانید یک `key` به تگ `<img>` بدهید. وقتی آن `key` تغییر می‌کند، React نود DOM `<img>` را از صفر بازسازی خواهد کرد. این باعث یک فلش کوتاه هنگام بارگذاری هر تصویر می‌شود، پس چیزی نیست که برای هر تصویر در اپلیکیشن خود بخواهید انجام دهید. اما اگر می‌خواهید اطمینان حاصل کنید تصویر همیشه با متن مطابقت داشته باشد منطقی است.

<Sandpack>

```js
import { useState } from 'react';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const hasNext = index < images.length - 1;

  function handleClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  let image = images[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h3>
        Image {index + 1} of {images.length}
      </h3>
      <img key={image.src} src={image.src} />
      <p>
        {image.place}
      </p>
    </>
  );
}

let images = [{
  place: 'Penang, Malaysia',
  src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
  place: 'Lisbon, Portugal',
  src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
  place: 'Bilbao, Spain',
  src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
  place: 'Valparaíso, Chile',
  src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
  place: 'Schwyz, Switzerland',
  src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
  place: 'Prague, Czechia',
  src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
  place: 'Ljubljana, Slovenia',
  src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
```

```css
img { width: 150px; height: 150px; }
```

</Sandpack>

</Solution>

#### رفع استیت اشتباه‌جا در فهرست {/*fix-misplaced-state-in-the-list*/}

در این فهرست، هر `Contact` استیتی دارد که تعیین می‌کند آیا «Show email» برای آن فشار داده شده. «Show email» را برای Alice فشار دهید، و سپس چک‌باکس «Show in reverse order» را تیک بزنید. متوجه خواهید شد که اکنون ایمیل _Taylor_ باز شده است، اما Alice — که به پایین منتقل شده — جمع شده به‌نظر می‌رسد.

آن را برطرف کنید تا استیت باز شده با هر تماس مرتبط باشد، بدون توجه به ترتیب انتخاب‌شده.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map((contact, i) =>
          <li key={i}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<Solution>

مشکل این است که این مثال از index به‌عنوان `key` استفاده می‌کرد:

```js
{displayedContacts.map((contact, i) =>
  <li key={i}>
```

با این حال، می‌خواهید استیت با _هر تماس خاص_ مرتبط باشد.

استفاده از شناسهٔ تماس به‌عنوان `key` به‌جای آن مشکل را برطرف می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
  const [reverse, setReverse] = useState(false);

  const displayedContacts = [...contacts];
  if (reverse) {
    displayedContacts.reverse();
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={reverse}
          onChange={e => {
            setReverse(e.target.checked)
          }}
        />{' '}
        Show in reverse order
      </label>
      <ul>
        {displayedContacts.map(contact =>
          <li key={contact.id}>
            <Contact contact={contact} />
          </li>
        )}
      </ul>
    </>
  );
}

const contacts = [
  { id: 0, name: 'Alice', email: 'alice@mail.com' },
  { id: 1, name: 'Bob', email: 'bob@mail.com' },
  { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
```

```js src/Contact.js
import { useState } from 'react';

export default function Contact({ contact }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p><b>{contact.name}</b></p>
      {expanded &&
        <p><i>{contact.email}</i></p>
      }
      <button onClick={() => {
        setExpanded(!expanded);
      }}>
        {expanded ? 'Hide' : 'Show'} email
      </button>
    </>
  );
}
```

```css
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
button {
  margin-right: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

استیت با موقعیت درخت مرتبط است. یک `key` به شما اجازه می‌دهد یک موقعیت نام‌گذاری‌شده به‌جای تکیه بر ترتیب مشخص کنید.

</Solution>

</Challenges>
