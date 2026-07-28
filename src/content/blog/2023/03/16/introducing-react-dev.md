---
title: "معرفی react.dev"
author: Dan Abramov and Rachel Nabors
date: 2023/03/16
description: Today we are thrilled to launch react.dev, the new home for React and its documentation. In this post, we would like to give you a tour of the new site.
---

March 16, 2023 by [Dan Abramov](https://bsky.app/profile/danabra.mov) and [Rachel Nabors](https://twitter.com/rachelnabors)

---

<Intro>

امروز ما هیجان‌زده هستیم که [react.dev](https://react.dev) را، خانهٔ جدید برای ری‌اکت و مستندات آن، راه‌اندازی کنیم. در این پست، دوست داریم یک تور از سایت جدید به شما بدهیم.

</Intro>

---

## خلاصه {/*tldr*/}

* سایت جدید ری‌اکت ([react.dev](https://react.dev)) ری‌اکت مدرن را با کامپوننت‌های تابعی و هوک‌ها آموزش می‌دهد.
* ما نمودارها، تصاویر، چالش‌ها و بیش از ۶۰۰ مثال تعاملی جدید را اضافه کرده‌ایم.
* سایت مستندات قبلی ری‌اکت اکنون به [legacy.reactjs.org](https://legacy.reactjs.org) منتقل شده است.

## سایت جدید، دامنهٔ جدید، صفحهٔ اصلی جدید {/*new-site-new-domain-new-homepage*/}

اول، کمی کارهای خانه‌داری.

برای جشن گرفتن راه‌اندازی مستندات جدید و، مهم‌تر، برای جداسازی واضح محتوای قدیمی و جدید، ما به دامنهٔ کوتاهتر [react.dev](https://react.dev) منتقل شده‌ایم. دامنهٔ قدیمی [reactjs.org](https://reactjs.org) اکنون به اینجا redirect می‌شود.

مستندات قدیمی ری‌اکت اکنون در [legacy.reactjs.org](https://legacy.reactjs.org) آرشیو شده‌اند. همهٔ لینک‌های موجود به محتوای قدیمی به‌طور خودکار به آنجا redirect می‌شوند تا از «شکستن وب» جلوگیری شود، اما سایت legacy به‌روزرسانی‌های بیشتری دریافت نخواهد کرد.

باور کنید یا نه، ری‌اکت به‌زودی ده ساله می‌شود. در سال‌های جاوااسکریپتی، این مانند یک قرن کامل است! ما [صفحهٔ اصلی ری‌اکت را به‌روزرسانی کرده‌ایم](https://react.dev) تا منعکس کند چرا فکر می‌کنیم ری‌اکت امروز روشی عالی برای ساخت رابط‌های کاربری است، و راهنمایهای شروع به‌کار را به‌روزرسانی کرده‌ایم تا به‌طور برجسته‌تر به فریم‌ورک‌های مبتنی بر ری‌اکت مدرن اشاره کنند.

اگر هنوز صفحهٔ اصلی جدید را ندیده‌اید، آن را بررسی کنید!

## تمام‌کردن روی ری‌اکت مدرن با هوک‌ها {/*going-all-in-on-modern-react-with-hooks*/}

وقتی ما React Hooks را در ۲۰۱۸ منتشر کردیم، مستندات هوک‌ها فرض می‌کردند که خواننده با کامپوننت‌های کلاسی آشنا است. این به جامعه کمک کرد تا هوک‌ها را خیلی سریع اتخاذ کند، اما پس از مدتی مستندات قدیمی در خدمت‌رسانی به خوانندگان جدید ناموفق بود. خوانندگان جدید باید ری‌اکت را دو بار می‌آموختند: یک‌بار با کامپوننت‌های کلاسی و سپس یک‌بار دیگر با هوک‌ها.

**مستندات جدید ری‌اکت را با هوک‌ها از ابتدا آموزش می‌دهد.** مستندات به دو بخش اصلی تقسیم شده است:

* **[یادگیری ری‌اکت](/learn)** یک دورهٔ با-سرعت-خودتان است که ری‌اکت را از صفر آموزش می‌دهد.
* **[مرجع API](/reference/react)** جزئیات و مثال‌های استفاده برای هر API ری‌اکت را ارائه می‌دهد.

بیایید نگاهی دقیق‌تر به آنچه در هر بخش می‌توانید پیدا کنید بیندازیم.

<Note>

هنوز چند مورد استفادهٔ نادر از کامپوننت‌های کلاسی وجود دارد که هنوز معادل مبتنی بر هوک ندارند. کامپوننت‌های کلاسی همچنان پشتیبانی می‌شوند، و در بخش [Legacy API](/reference/react/legacy) سایت جدید مستندسازی شده‌اند.

</Note>

## شروع سریع {/*quick-start*/}

بخش یادگیری با صفحهٔ [شروع سریع](/learn) آغاز می‌شود. این یک تور مقدماتی کوتاه از ری‌اکت است. این سینتکس برای مفاهیمی مانند کامپوننت‌ها، پراپس و استیت را معرفی می‌کند، اما به جزئیات زیادی درباره نحوهٔ استفاده از آن‌ها وارد نمی‌شود.

اگر دوست دارید با انجام یاد بگیرید، ما توصیه می‌کنیم [آموزش دوز-بازی](/learn/tutorial-tic-tac-toe) را بعداً بررسی کنید. این شما را در ساخت یک بازی کوچک با ری‌اکت همراهی می‌کند، ضمن آنکه مهارت‌هایی را که هر روز استفاده خواهید کرد آموزش می‌دهد. در اینجا چیزی که خواهید ساخت آمده است:

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

```css src/styles.css
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.board-row:after {
  clear: both;
  content: '';
  display: table;
}

.status {
  margin-bottom: 10px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
```

</Sandpack>

ما همچنین دوست داریم [تفکر در ری‌اکت (Thinking in React)](/learn/thinking-in-react) را برجسته کنیم — این آموزشی است که ری‌اکت را برای بسیاری از ما «کلیک» کرد. **ما هر دوی این آموزش‌های کلاسیک را به‌روزرسانی کرده‌ایم تا از کامپوننت‌های تابعی و هوک‌ها استفاده کنند،** بنابراین به‌خوبی جدید هستند.

<Note>

مثال بالا یک *sandbox* است. ما sandboxهای زیادی — بیش از ۶۰۰! — در همه‌جا در سراسر سایت اضافه کرده‌ایم. می‌توانید هر sandboxی را ویرایش کنید، یا «Fork» را در گوشهٔ بالا-راست بزنید تا آن را در یک تب جداگانه باز کنید. sandboxها به شما اجازه می‌دهند به‌سرعت با APIهای ری‌اکت بازی کنید، ایده‌هایتان را کاوش کنید، و درک خود را بررسی کنید.

</Note>

## یادگیری ری‌اکت گام‌به‌گام {/*learn-react-step-by-step*/}

ما دوست داریم همهٔ افراد در سراسر جهان فرصت برابری برای یادگیری رایگان ری‌اکت با سرعت خود داشته باشند.

به همین دلیل بخش یادگیری مانند یک دورهٔ با-سرعت-خودتان تقسیم به فصل‌ها سازماندهی شده است. دو فصل اول مبانی ری‌اکت را توصیف می‌کنند. اگر با ری‌اکت تازه آشنا شده‌اید، یا می‌خواهید آن را در حافظهٔ خود تازه کنید، از اینجا شروع کنید:

- **[توصیف رابط کاربری](/learn/describing-the-ui)** آموزش می‌دهد چگونه اطلاعات را با کامپوننت‌ها نمایش دهید.
- **[افزودن تعامل](/learn/adding-interactivity)** آموزش می‌دهد چگونه صفحه را در پاسخ به ورودی کاربر به‌روزرسانی کنید.

دو فصل بعدی پیشرفته‌تر هستند، و بینش عمیق‌تری درباره بخش‌های پیچیده‌تر به شما می‌دهند:

- **[مدیریت استیت](/learn/managing-state)** آموزش می‌دهد چگونه منطق خود را با رشد پیچیدگی برنامه سازماندهی کنید.
- **[راه‌فرارها (Escape Hatches)](/learn/escape-hatches)** آموزش می‌دهد چگونه از ری‌اکت «بیرون بروید»، و چه زمانی معنادارترین کار این است.

هر فصل از چند صفحهٔ مرتبط تشکیل شده است. بیشتر این صفحات یک مهارت یا تکنیک خاص را آموزش می‌دهند — برای مثال، [نوشتن نشانه‌گذاری با JSX](/learn/writing-markup-with-jsx)، [به‌روزرسانی اشیاء در استیت](/learn/updating-objects-in-state)، یا [اشتراک استیت بین کامپوننت‌ها](/learn/sharing-state-between-components). برخی از صفحات روی توضیح یک ایده تمرکز دارند — مانند [رندر و commit](/learn/render-and-commit)، یا [استیت به‌عنوان یک snapshot](/learn/state-as-a-snapshot). و چند صفحه وجود دارند، مانند [شاید به افکت نیاز نداشته باشید](/learn/you-might-not-need-an-effect)، که پیشنهادات ما را بر اساس آنچه در طول این سال‌ها آموخته‌ایم به اشتراک می‌گذارند.

شما مجبور نیستید این فصل‌ها را به‌عنوان یک دنباله بخوانید. چه کسی برای این کار وقت دارد؟! اما می‌توانستید. صفحات در بخش یادگیری فقط به مفاهیمی معرفی‌شده توسط صفحات قبلی تکیه می‌کنند. اگر می‌خواهید آن را مانند یک کتاب بخوانید، پیش بروید!

### درک خود را با چالش‌ها بررسی کنید {/*check-your-understanding-with-challenges*/}

بیشتر صفحات در بخش یادگیری با چند چالش برای بررسی درک شما پایان می‌یابند. برای مثال، در اینجا چند چالش از صفحهٔ [رندر شرطی (Conditional Rendering)](/learn/conditional-rendering#challenges) آمده است.

شما مجبور نیستید همین الان آن‌ها را حل کنید! مگر آنکه *واقعاً* بخواهید.

<Challenges noTitle={true}>

#### نمایش یک آیکون برای آیتم‌های ناتمام با `? :` {/*show-an-icon-for-incomplete-items-with--*/}

از عملگر شرطی (`cond ? a : b`) برای رندر یک ❌ اگر `isPacked` برابر `true` نیست استفاده کنید.

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

#### نمایش اهمیت آیتم با `&&` {/*show-the-item-importance-with-*/}

در این مثال، هر `Item` یک پراپ `importance` عددی دریافت می‌کند. از عملگر `&&` برای رندر «_(Importance: X)_» به‌صورت ایتالیک استفاده کنید، اما فقط برای آیتم‌هایی که اهمیت غیر صفر دارند. فهرست آیتم‌های شما باید در نهایت شبیه این باشد:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

فراموش نکنید که یک فاصله بین دو برچسب اضافه کنید!

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

این باید کار را انجام دهد:

<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

توجه کنید که باید `importance > 0 && ...` را بنویسید نه `importance && ...` تا اگر `importance` برابر `0` باشد، `0` به‌عنوان نتیجه رندر نشود!

در این راه‌حل، از دو شرط جداگانه برای درج یک فاصله بین نام و برچسب اهمیت استفاده شده است. به‌طور جایگزین، می‌توانستید از یک فرگمنت با یک فاصلهٔ پیشوند استفاده کنید: `importance > 0 && <> <i>...</i></>` یا یک فاصله بلافاصله درون `<i>` اضافه کنید: `importance > 0 && <i> ...</i>`.

</Solution>

</Challenges>

دکمهٔ «نمایش راه‌حل» در گوشهٔ پایین-چپ را توجه کنید. این اگر می‌خواهید خودتان را بررسی کنید به‌درد می‌خورد!

### با نمودارها و تصاویر شهود بسازید {/*build-an-intuition-with-diagrams-and-illustrations*/}

وقتی نتوانستیم بفهمیم چگونه چیزی را با کد و کلمات به‌تنهایی توضیح دهیم، نمودارهایی اضافه کردیم که کمک می‌کنند مقداری شهود ارائه دهیم. برای مثال، در اینجا یکی از نمودارها از [حفظ و بازنشانی استیت](/learn/preserving-and-resetting-state) آمده است:

<Diagram name="preserving_state_diff_same_pt1" height={350} width={794} alt="Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.">

وقتی `section` به `div` تغییر می‌کند، `section` حذف و `div` جدید اضافه می‌شود

</Diagram>

شما همچنین برخی تصاویر را در سراسر مستندات خواهید دید — در اینجا یکی از [رنگ‌آمیزی صفحه توسط مرورگر](/learn/render-and-commit#epilogue-browser-paint) آمده است:

<Illustration alt="A browser painting 'still life with card element'." src="/images/docs/illustrations/i_browser-paint.png" />

ما با فروشندگان مرورگر تأیید کرده‌ایم که این تصویر ۱۰۰٪ از نظر علمی دقیق است.

## یک مرجع API دقیق و جدید {/*a-new-detailed-api-reference*/}

در [مرجع API](/reference/react)، هر API ری‌اکت اکنون یک صفحهٔ اختصاصی دارد. این شامل همهٔ انواع APIها می‌شود:

- هوک‌های داخلی مانند [`useState`](/reference/react/useState).
- کامپوننت‌های داخلی مانند [`<Suspense>`](/reference/react/Suspense).
- کامپوننت‌های داخلی مرورگر مانند [`<input>`](/reference/react-dom/components/input).
- APIهای فریم‌ورک-محور مانند [`renderToPipeableStream`](/reference/react-dom/server/renderToReadableStream).
- سایر APIهای ری‌اکت مانند [`memo`](/reference/react/memo).

خواهید دید که هر صفحهٔ API به حداقل دو بخش تقسیم شده است: *مرجع* و *استفاده*.

[مرجع](/reference/react/useState#reference) امضای رسمی API را با فهرست آرگومان‌ها و مقادیر بازگشتی‌اش توصیف می‌کند. این مختصر است، اما اگر با آن API آشنا نیستید ممکن است کمی انتزاعی احساس شود. این توصیف می‌کند که یک API چه می‌کند، اما نه چگونه از آن استفاده کنید.

[استفاده](/reference/react/useState#usage) نشان می‌دهد چرا و چگونه در عمل از این API استفاده می‌کنید، مانند آنکه یک همکار یا دوست توضیح دهد. این **سناریوهای کانونیکال برای نحوهٔ استفادهٔ مورد نظر هر API توسط تیم ری‌اکت** را نشان می‌دهد. ما snippetهای کدنویسی‌شده با رنگ، مثال‌هایی از استفادهٔ APIهای مختلف با هم، و دستورالعمل‌هایی که می‌توانید از آن‌ها کپی و پیست کنید اضافه کرده‌ایم:

<Recipes titleText="Basic useState examples" titleId="examples-basic">

#### شمارنده (عدد) {/*counter-number*/}

در این مثال، متغیر استیت `count` یک عدد را نگه می‌دارد. کلیک روی دکمه آن را افزایش می‌دهد.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      You pressed me {count} times
    </button>
  );
}
```

</Sandpack>

<Solution />

#### فیلد متنی (رشته) {/*text-field-string*/}

در این مثال، متغیر استیت `text` یک رشته را نگه می‌دارد. وقتی تایپ می‌کنید، `handleChange` آخرین مقدار ورودی را از المان DOM ورودی مرورگر می‌خواند، و `setText` را برای به‌روزرسانی استیت فراخوانی می‌کند. این به شما اجازه می‌دهد `text` فعلی را در زیر نمایش دهید.

<Sandpack>

```js
import { useState } from 'react';

export default function MyInput() {
  const [text, setText] = useState('hello');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <input value={text} onChange={handleChange} />
      <p>You typed: {text}</p>
      <button onClick={() => setText('hello')}>
        Reset
      </button>
    </>
  );
}
```

</Sandpack>

<Solution />

#### چک‌باکس (بولی) {/*checkbox-boolean*/}

در این مثال، متغیر استیت `liked` یک بولی را نگه می‌دارد. وقتی روی ورودی کلیک می‌کنید، `setLiked` متغیر استیت `liked` را با این که آیا چک‌باکس ورودی مرورگر تیک خورده است به‌روزرسانی می‌کند. متغیر `liked` برای رندر متن زیر چک‌باکس استفاده می‌شود.

<Sandpack>

```js
import { useState } from 'react';

export default function MyCheckbox() {
  const [liked, setLiked] = useState(true);

  function handleChange(e) {
    setLiked(e.target.checked);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={liked}
          onChange={handleChange}
        />
        I liked this
      </label>
      <p>You {liked ? 'liked' : 'did not like'} this.</p>
    </>
  );
}
```

</Sandpack>

<Solution />

#### فرم (دو متغیر) {/*form-two-variables*/}

می‌توانید بیش از یک متغیر استیت در همان کامپوننت تعریف کنید. هر متغیر استیت کاملاً مستقل است.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  return (
    <>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => setAge(age + 1)}>
        Increment age
      </button>
      <p>Hello, {name}. You are {age}.</p>
    </>
  );
}
```

```css
button { display: block; margin-top: 10px; }
```

</Sandpack>

<Solution />

</Recipes>

برخی صفحات API همچنین شامل [عیب‌یابی (Troubleshooting)](/reference/react/useEffect#troubleshooting) (برای مشکلات رایج) و [جایگزین‌ها (Alternatives)](https://18.react.dev/reference/react-dom/findDOMNode#alternatives) (برای APIهای منسوخ‌شده) هستند.

ما امیدواریم این رویکرد مرجع API را نه‌تنها به‌عنوان راهی برای جستجوی یک آرگومان مفید کند، بلکه به‌عنوان راهی برای دیدن همهٔ کارهای مختلفی که می‌توانید با هر API انجام دهید — و چگونه با دیگر APIها متصل می‌شود.

## چه چیزی در راه است؟ {/*whats-next*/}

این پایان تور کوچک ماست! نگاهی به وب‌سایت جدید بیندازید، ببینید چه چیزی را دوست دارید یا دوست ندارید، و بازخورد را در [issue tracker](https://github.com/reactjs/react.dev/issues) ما ادامه دهید.

ما اذعان می‌کنیم این پروژه مدت زیادی طول کشیده تا منتشر شود. ما می‌خواستیم یک نوار کیفیت بالا را که جامعهٔ ری‌اکت سزاوان آن است حفظ کنیم. در حین نوشتن این مستندات و ایجاد همهٔ مثال‌ها، ما اشتباهاتی در برخی توضیحات خودمان، باگ‌هایی در ری‌اکت، و حتی شکاف‌هایی در طراحی ری‌اکت پیدا کردیم که اکنون در حال کار برای رفع آن‌ها هستیم. ما امیدواریم مستندات جدید به ما کمک کند تا ری‌اکت خود را در آینده در نوار بالاتری نگه داریم.

ما بسیاری از درخواست‌های شما برای گسترش محتوا و کارکرد وب‌سایت را شنیده‌ایم، برای مثال:

- ارائهٔ نسخهٔ TypeScript برای همهٔ مثال‌ها؛
- ایجاد راهنماهای به‌روزرسانی‌شدهٔ کارایی، تست و دسترسی‌پذیری؛
- مستندسازی کامپوننت‌های سرور ری‌اکت (React Server Components) به‌صورت مستقل از فریم‌ورک‌هایی که از آن‌ها پشتیبانی می‌کنند؛
- کار با جامعهٔ بین‌المللی ما برای ترجمهٔ مستندات جدید؛
- افزودن قابلیت‌های مفقود به وب‌سایت جدید (برای مثال، RSS برای این بلاگ).

اکنون که [react.dev](https://react.dev/) منتشر شده، ما قادر خواهیم بود تمرکز خود را از «دنبال‌کردن» منابع آموزشی شخص ثالث ری‌اکت به افزودن اطلاعات جدید و بهبود بیشتر وب‌سایت جدیدمان تغییر دهیم.

ما فکر می‌کنیم هیچ‌وقت زمان بهتری برای یادگیری ری‌اکت نبوده است.

## چه کسانی روی این کار کردند؟ {/*who-worked-on-this*/}

در تیم ری‌اکت، [Rachel Nabors](https://twitter.com/rachelnabors/) پروژه را رهبری کرد (و تصاویر را ارائه داد)، و [Dan Abramov](https://bsky.app/profile/danabra.mov) برنامهٔ درسی را طراحی کرد. آن‌ها همچنین بیشتر محتوا را با هم به‌صورت مشترک نوشتند.

البته، هیچ پروژه‌ای به این بزرگی به‌صورت ایزوله اتفاق نمی‌افتد. ما افراد زیادی برای تشکر داریم!

[Sylwia Vargas](https://twitter.com/SylwiaVargas) مثال‌های ما را بازطراحی کرد تا فراتر از «foo/bar/baz» و بچه‌گربه‌ها باشد، و دانشمندان، هنرمندان و شهرهایی از سراسر جهان را نمایش دهد. [Maggie Appleton](https://twitter.com/Mappletons) دودل‌های ما را به یک سیستم نمودار واضح تبدیل کرد.

تشکر از [David McCabe](https://twitter.com/mcc_abe)، [Sophie Alpert](https://twitter.com/sophiebits)، [Rick Hanlon](https://twitter.com/rickhanlonii)، [Andrew Clark](https://twitter.com/acdlite) و [Matt Carroll](https://twitter.com/mattcarrollcode) برای مشارکت‌های نوشتاری اضافی. ما همچنین دوست داریم از [Natalia Tepluhina](https://twitter.com/n_tepluhina) و [Sebastian Markbåge](https://twitter.com/sebmarkbage) برای ایده‌ها و بازخوردشان تشکر کنیم.

تشکر از [Dan Lebowitz](https://twitter.com/lebo) برای طراحی سایت و [Razvan Gradinar](https://dribbble.com/GradinarRazvan) برای طراحی sandbox.

در جبههٔ توسعه، تشکر از [Jared Palmer](https://twitter.com/jaredpalmer) برای توسعهٔ نمونهٔ اولیه. تشکر از [Dane Grant](https://twitter.com/danecando) و [Dustin Goodman](https://twitter.com/dustinsgoodman) از [ThisDotLabs](https://www.thisdot.co/) برای پشتیبانیشان در توسعهٔ رابط کاربری. تشکر از [Ives van Hoorne](https://twitter.com/CompuIves)، [Alex Moldovan](https://twitter.com/alexnmoldovan)، [Jasper De Moor](https://twitter.com/JasperDeMoor) و [Danilo Woznica](https://twitter.com/danilowoz) از [CodeSandbox](https://codesandbox.io/) برای کارشان در یکپارچه‌سازی sandbox. تشکر از [Rick Hanlon](https://twitter.com/rickhanlonii) برای کار توسعه و طراحی نقطه‌ای، و ظرافت در رنگ‌ها و جزئیات ظریف‌تر. تشکر از [Harish Kumar](https://www.strek.in/) و [Luna Ruan](https://twitter.com/lunaruan) برای افزودن قابلیت‌های جدید به سایت و کمک به نگهداری آن.

تشکر فراوان از افرادی که وقت خود را داوطلبانه برای شرکت در برنامهٔ تست آلفا و بتا اختصاص دادند. اشتیاق و بازخورد ارزشمند شما به ما کمک کرد تا این مستندات را شکل دهیم. یک تشکر ویژه از تستر بتای ما، [Debbie O'Brien](https://twitter.com/debs_obrien)، که در React Conf 2021 سخنرانی درباره تجربهٔ استفاده‌اش از مستندات ری‌اکت ارائه داد.

در نهایت، تشکر از جامعهٔ ری‌اکت که الهام‌بخش این تلاش بودند. شما دلیل ما برای انجام این کار هستید، و ما امیدواریم مستندات جدید به شما کمک کند تا با ری‌اکت هر رابط کاربری که می‌خواهید بسازید.
