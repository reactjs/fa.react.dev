---
title: 'آموزش: Tic-Tac-Toe'
---

<Intro>

در طول این آموزش، یک بازی دوز کوچک خواهید ساخت. این آموزش فرض نمی‌کند که شما از قبل دانشی درباره ری‌اکت دارید. تکنیک‌هایی که در این آموزش یاد می‌گیرید، برای ساخت هر اپ ری‌اکت اساسی هستند و درک کامل آن به شما درک عمیقی از ری‌اکت خواهد داد.

</Intro>

<Note>

این آموزش برای افرادی طراحی شده است که ترجیح می‌دهند با **انجام دادن** یاد بگیرند و می‌خواهند به سرعت چیزی ملموس بسازند. اگر ترجیح می‌دهید هر مفهوم را گام به گام یاد بگیرید، با [توصیف رابط کاربری](/learn/describing-the-ui) شروع کنید.

</Note>

آموزش به چندین بخش تقسیم شده است:

- [راه‌اندازی برای آموزش](#setup-for-the-tutorial) به شما **نقطه شروعی** برای دنبال کردن آموزش ارائه می‌دهد.
- [مرور کلی](#overview) به شما **اصول اولیه** ری‌اکت را آموزش می‌دهد: کامپوننت‌ها، props و state.
- [تکمیل بازی](#completing-the-game) به شما **رایج‌ترین تکنیک‌ها** در توسعه ری‌اکت را آموزش می‌دهد.
- [افزودن سفر در زمان](#adding-time-travel) به شما **بینش عمیق‌تری** از نقاط قوت منحصربه‌فرد ری‌اکت می‌دهد.

### چه چیزی می‌سازید؟ {/*what-are-you-building*/}

در این آموزش، یک بازی تیک‌تاک‌تو تعاملی با ری‌اکت می‌سازید.

می‌توانید ببینید که وقتی کارتان تمام شد، چگونه به نظر می‌رسد:

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

اگر کد هنوز برای شما قابل فهم نیست یا با نحو کد آشنا نیستید، نگران نباشید! هدف این آموزش این است که به شما کمک کند ری‌اکت و نحو آن را بفهمید.

ما توصیه می‌کنیم که قبل از ادامه آموزش، بازی دوز بالا را بررسی کنید. یکی از قابلیت‌هایی که متوجه خواهید شد این است که یک لیست شماره‌گذاری‌شده در سمت راست صفحه بازی وجود دارد. این لیست تاریخچه‌ای از تمام حرکاتی که در بازی انجام شده را نشان می‌دهد و با پیشرفت بازی به‌روزرسانی می‌شود.

پس از اینکه با بازی کامل‌شده دوز بازی کردید، به پایین اسکرول کنید. در این آموزش با یک قالب ساده‌تر شروع خواهید کرد. گام بعدی ما این است که شما را آماده کنیم تا بتوانید ساخت بازی را آغاز کنید.

## راه‌اندازی برای آموزش {/*setup-for-the-tutorial*/}

در ویرایشگر کد زنده زیر، روی **Fork** در گوشه بالا-راست کلیک کنید تا ویرایشگر در یک تب جدید با استفاده از وب‌سایت CodeSandbox باز شود. CodeSandbox به شما اجازه می‌دهد کد را در مرورگر خود بنویسید و پیش‌نمایشی از نحوه مشاهده اپ توسط کاربران‌تان را ببینید. تب جدید باید یک مربع خالی و کد ابتدایی این آموزش را نمایش دهد.

<Sandpack>

```js src/App.js
export default function Square() {
  return <button className="square">X</button>;
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

<Note>

شما همچنین می‌توانید این آموزش را با استفاده از محیط توسعه محلی خود دنبال کنید. برای انجام این کار، باید:

1. [Node.js](https://nodejs.org/en/) را نصب کنید.
۱. در تب CodeSandbox که قبلاً باز کردید، دکمه گوشه بالا-چپ را فشار دهید تا منو باز شود، سپس در آن منو گزینه **Download Sandbox** را انتخاب کنید تا یک آرشیو از فایل‌ها را به‌صورت محلی دانلود کنید.
1. فایل فشرده را از حالت فشرده خارج کنید، سپس یک ترمینال باز کرده و `cd` به دایرکتوری که از حالت فشرده خارج کردید بروید.
1. وابستگی‌ها را با `npm install` نصب کنید.
1. `npm start` را اجرا کنید تا یک سرور محلی راه‌اندازی شود و دستورات را دنبال کنید تا کد را در مرورگر ببینید.

اگر گیر کردید، اجازه ندهید این موضوع شما را متوقف کند! به‌جای آن به‌صورت آنلاین ادامه دهید و بعداً دوباره یک راه‌اندازی محلی را امتحان کنید.

</Note>

## مرور کلی {/*overview*/}

حالا که آماده‌اید، بیایید مروری بر ری‌اکت داشته باشیم!

### بررسی کد شروع {/*inspecting-the-starter-code*/}

در CodeSandbox سه بخش اصلی مشاهده خواهید کرد:

![CodeSandbox با کد آغازین](../images/tutorial/react-starter-code-codesandbox.png)

<<<<<<< HEAD
1. بخش _Files_ با لیستی از فایل‌ها مانند `App.js`، `index.js`، `styles.css` در پوشه `src` و یک پوشه به نام `public`
1. ویرایشگر _کد_ که در آن کد منبع فایل انتخاب‌شده خود را مشاهده خواهید کرد
1. بخش _مرورگر_ که در آن خواهید دید کدی که نوشته‌اید چگونه نمایش داده می‌شود.
=======
1. The _Files_ section with a list of files like `App.js`, `index.js`, `styles.css` in `src` folder and a folder called `public`
1. The _code editor_ where you'll see the source code of your selected file
1. The _browser_ section where you'll see how the code you've written will be displayed
>>>>>>> a1ddcf51a08cc161182b90a24b409ba11289f73e

فایل `App.js` باید در بخش _Files_ انتخاب شود. محتوای آن فایل در _ویرایشگر کد_ باید به صورت زیر باشد:

```jsx
export default function Square() {
  return <button className="square">X</button>;
}
```

بخش _مرورگر_ باید مربعی با یک X در آن نمایش دهد، مانند این:

![x-filled square](../images/tutorial/x-filled-square.png)

حالا بیایید نگاهی به فایل‌های کد آغازین بیندازیم.

#### `App.js` {/*appjs*/}

کد در `App.js` یک _کامپوننت_ ایجاد می‌کند. در ری‌اکت، یک کامپوننت قطعه‌ای از کد قابل استفاده مجدد است که بخشی از رابط کاربری را نمایش می‌دهد. کامپوننت‌ها برای رندر، مدیریت و به‌روزرسانی المنت‌های رابط کاربری در برنامه شما استفاده می‌شوند. بیایید خط به خط به کامپوننت نگاه کنیم تا ببینیم چه اتفاقی می‌افتد:

```js {1}
export default function Square() {
  return <button className="square">X</button>;
}
```

خط اول یک تابع به نام `Square` تعریف می‌کند. کلمه کلیدی `export` در جاوااسکریپت این تابع را در خارج از این فایل قابل دسترسی می‌کند. کلمه کلیدی `default` به فایل‌های دیگر که از کد شما استفاده می‌کنند می‌گوید که این تابع اصلی در فایل شما است.

```js {2}
export default function Square() {
  return <button className="square">X</button>;
}
```

خط دوم یک دکمه را برمی‌گرداند. کلمه کلیدی `return` در جاوااسکریپت به این معناست که هر چیزی که بعد از آن می‌آید به عنوان یک مقدار به فراخوان تابع برگردانده می‌شود. `<button>` یک *المنت JSX* است. یک المنت JSX ترکیبی از کد جاوااسکریپت و تگ‌های HTML است که توصیف می‌کند چه چیزی را می‌خواهید نمایش دهید. `className="square"` یک ویژگی دکمه یا *prop* است که به CSS می‌گوید چگونه دکمه را استایل دهد. `X` متنی است که داخل دکمه نمایش داده می‌شود و `</button>` المنت JSX را می‌بندد تا نشان دهد که هر محتوای بعدی نباید داخل دکمه قرار گیرد.

#### `styles.css` {/*stylescss*/}

روی فایلی که با `styles.css` برچسب‌گذاری شده است در بخش _Files_ از CodeSandbox کلیک کنید. این فایل، استایل‌های برنامه ری‌اکت شما را تعریف می‌کند. دو _CSS selector_ اول (`*` و `body`) استایل بخش‌های بزرگی از برنامه شما را تعریف می‌کنند، در حالی که سلکتور `.square` استایل هر کامپوننتی را که ویژگی `className` روی `square` تنظیم شده باشد، تعریف می‌کند. در کد شما، این با دکمه‌ای از کامپوننت Square در فایل `App.js` مطابقت دارد.

#### `index.js` {/*indexjs*/}

روی فایلی که با برچسب `index.js` در بخش _Files_ در CodeSandbox قرار دارد کلیک کنید. شما در طول این آموزش این فایل را ویرایش نخواهید کرد، اما این فایل پل ارتباطی بین کامپوننتی است که در فایل `App.js` ایجاد کرده‌اید و مرورگر وب است.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';
```

خطوط ۱-۵ تمام قطعات لازم را کنار هم می‌آورند:

* ری‌اکت
* کتابخانه ری‌اکت برای ارتباط با مرورگرهای وب (React DOM)
* استایل‌ها برای کامپوننت‌های شما
* کامپوننتی که در `App.js` ایجاد کرده‌اید.

باقی‌مانده فایل تمام قطعات را کنار هم قرار می‌دهد و محصول نهایی را در `index.html` در پوشه `public` وارد می‌کند.

### ساخت تخته {/*building-the-board*/}

بیایید به `App.js` برگردیم. اینجا جایی است که بقیهٔ آموزش را در آن سپری خواهید کرد.

در حال حاضر، صفحه فقط یک مربع است، اما شما به نه مربع نیاز دارید! اگر فقط سعی کنید مربع خود را کپی و جای‌گذاری کنید تا دو مربع بسازید، به این صورت:

```js {2}
export default function Square() {
  return <button className="square">X</button><button className="square">X</button>;
}
```

این خطا را دریافت می‌کنید:

<ConsoleBlock level="error">

/src/App.js: المنت‌های JSX مجاور باید در یک تگ محصورکننده قرار گیرند. آیا می‌خواهید از یک فرگمنت JSX `<>...</>` استفاده کنید؟

</ConsoleBlock>

کامپوننت‌های ری‌اکت باید یک المنت JSX واحد برگردانند و نه چند المنت JSX مجاور مانند دو دکمه. برای رفع این مشکل می‌توانید از *فرگمنت‌ها* (`<>` و `</>`) برای محصور کردن چند المنت JSX مجاور به این صورت استفاده کنید:

```js {3-6}
export default function Square() {
  return (
    <>
      <button className="square">X</button>
      <button className="square">X</button>
    </>
  );
}
```

اکنون باید ببینید:

![دو مربع پر شده با X](../images/tutorial/two-x-filled-squares.png)

عالی! حالا فقط باید چند بار کپی-پیست کنید تا نه مربع اضافه شود و...

![نه مربع پر شده با X در یک خط](../images/tutorial/nine-x-filled-squares.png)

اوه نه! مربع‌ها همه در یک خط قرار دارند، نه به صورت شبکه‌ای که برای تخته‌مان نیاز داریم. برای رفع این مشکل، باید مربع‌هایتان را با استفاده از `div`ها به ردیف‌ها گروه‌بندی کنید و چند کلاس CSS اضافه کنید. در همین حین، به هر مربع یک شماره بدهید تا مطمئن شوید که می‌دانید هر مربع کجا نمایش داده می‌شود.

در فایل `App.js`، کامپوننت `Square` را به این شکل به‌روزرسانی کنید:

```js {3-19}
export default function Square() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```

CSS تعریف‌شده در `styles.css`، divها را با `className` `board-row` استایل می‌دهد. حالا که کامپوننت‌های خود را با `div`های استایل‌شده به ردیف‌ها گروه‌بندی کرده‌اید، تخته دوز خود را دارید:

![tic-tac-toe board filled with numbers 1 through 9](../images/tutorial/number-filled-board.png)

اما اکنون یک مشکل دارید. کامپوننت شما با نام `Square` دیگر واقعاً یک مربع نیست. بیایید با تغییر نام آن به `Board` این مشکل را برطرف کنیم:

```js {1}
export default function Board() {
  //...
}
```

در این مرحله، کد شما باید به این شکل باشد:

<Sandpack>

```js
export default function Board() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
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

<Note>

پیسسس... این خیلی تایپ کردن می‌خواهد! اشکالی ندارد که کد را از این صفحه کپی و پیست کنید. با این حال، اگر به دنبال یک چالش کوچک هستید، توصیه می‌کنیم فقط کدی را کپی کنید که حداقل یک بار خودتان به‌صورت دستی تایپ کرده‌اید.

</Note>

### انتقال داده از طریق props {/*passing-data-through-props*/}

در مرحله بعد، می‌خواهید با کلیک کاربر روی مربع، مقدار آن را از خالی به "X" تغییر دهید. با توجه به نحوه ساختن برد تا اینجا، باید کدی که مربع را به‌روزرسانی می‌کند را نه بار کپی-پیست کنید (یک بار برای هر مربع)! به جای کپی-پیست، معماری کامپوننت ری‌اکت به شما اجازه می‌دهد یک کامپوننت قابل استفاده مجدد ایجاد کنید تا از کدهای تکراری و نامرتب جلوگیری شود.

ابتدا، خطی که مربع اول شما را تعریف می‌کند (`<button className="square">1</button>`) از کامپوننت `Board` خود به یک کامپوننت جدید `Square` کپی کنید:

```js {1-3}
function Square() {
  return <button className="square">1</button>;
}

export default function Board() {
  // ...
}
```

سپس کامپوننت Board را به‌روزرسانی می‌کنید تا آن کامپوننت `Square` را با استفاده از سینتکس JSX رندر کنید:

```js {5-19}
// ...
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

توجه کنید که برخلاف `div`های مرورگر، کامپوننت‌های خودتان `Board` و `Square` باید با حرف بزرگ شروع شوند.

بیایید نگاهی بیندازیم:

![one-filled board](../images/tutorial/board-filled-with-ones.png)

اوه نه! شما مربع‌های شماره‌دار قبلی خود را از دست داده‌اید. اکنون هر مربع "1" را نشان می‌دهد. برای رفع این مشکل، از *props* استفاده خواهید کرد تا مقداری که هر مربع باید داشته باشد را از کامپوننت والد (`Board`) به کامپوننت فرزند (`Square`) منتقل کنید.

کامپوننت `Square` را به‌روزرسانی کنید تا ویژگی `value` را که از `Board` ارسال می‌کنید، بخواند.

```js {1}
function Square({ value }) {
  return <button className="square">1</button>;
}
```

`function Square({ value })` نشان می‌دهد که کامپوننت Square می‌تواند یک prop به نام `value` پاس داده شود.

حالا می‌خواهید آن `value` را به جای `1` درون هر مربع نمایش دهید. سعی کنید این کار را به این صورت انجام دهید:

```js {2}
function Square({ value }) {
  return <button className="square">value</button>;
}
```

اوه، این چیزی نیست که می‌خواستید:

![value-filled board](../images/tutorial/board-filled-with-value.png)

شما می‌خواستید متغیر جاوااسکریپت به نام `value` را از کامپوننت خود رندر کنید، نه کلمه "value". برای "فرار به جاوااسکریپت" از JSX، به آکولاد نیاز دارید. آکولادها را در اطراف `value` در JSX اضافه کنید به این صورت:

```js {2}
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```

فعلاً باید یک برد خالی ببینید:

![empty board](../images/tutorial/empty-board.png)

این به این دلیل است که کامپوننت `Board` هنوز ویژگی `value` را به هر کامپوننت `Square` که رندر می‌کند، ارسال نکرده است. برای رفع این مشکل، ویژگی `value` را به هر کامپوننت `Square` که توسط کامپوننت `Board` رندر می‌شود، اضافه می‌کنید:

```js {5-7,10-12,15-17}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```

حالا باید دوباره یک گرید از اعداد ببینید:

![tic-tac-toe board filled with numbers 1 through 9](../images/tutorial/number-filled-board.png)

کد به‌روزشده شما باید به این صورت باشد:

<Sandpack>

```js src/App.js
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
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

### ساخت یک کامپوننت تعاملی {/*making-an-interactive-component*/}

بیایید کامپوننت `Square` را با یک `X` زمانی که روی آن کلیک می‌کنید پر کنیم. یک تابع به نام `handleClick` درون `Square` تعریف کنید. سپس، `onClick` را به props المنت JSX دکمه‌ای که از `Square` برگردانده می‌شود اضافه کنید:

```js {2-4,9}
function Square({ value }) {
  function handleClick() {
    console.log('clicked!');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```

اگر اکنون روی یک مربع کلیک کنید، باید یک لاگ با عنوان `"clicked!"` را در تب _Console_ در بخش _Browser_ در CodeSandbox ببینید. کلیک کردن روی مربع بیش از یک بار، `"clicked!"` را دوباره لاگ می‌کند. لاگ‌های مکرر کنسول با همان پیام، خطوط بیشتری در کنسول ایجاد نمی‌کنند. در عوض، یک شمارنده افزایشی در کنار اولین لاگ `"clicked!"` خود خواهید دید.

<Note>

اگر این آموزش را با استفاده از محیط توسعه محلی خود دنبال می‌کنید، باید کنسول مرورگر خود را باز کنید. به عنوان مثال، اگر از مرورگر Chrome استفاده می‌کنید، می‌توانید با استفاده از میانبر صفحه‌کلید **Shift + Ctrl + J** (در ویندوز/لینوکس) یا **Option + ⌘ + J** (در macOS) کنسول را مشاهده کنید.

</Note>

به عنوان گام بعدی، می‌خواهید کامپوننت Square "به خاطر بسپارد" که کلیک شده است و آن را با علامت "X" پر کند. برای "به خاطر سپردن" چیزها، کامپوننت‌ها از *state* استفاده می‌کنند.

ری‌اکت یک تابع ویژه به نام `useState` ارائه می‌دهد که می‌توانید از کامپوننت خود آن را فراخوانی کنید تا به آن اجازه دهید چیزهایی را "به خاطر بسپارد". بیایید مقدار فعلی `Square` را در state ذخیره کنیم و زمانی که `Square` کلیک شد، آن را تغییر دهیم.

`useState` را در بالای فایل import کنید. ویژگی `value` را از کامپوننت `Square` حذف کنید. به جای آن، یک خط جدید در ابتدای `Square` اضافه کنید که `useState` را فراخوانی کند. این باید یک متغیر state به نام `value` برگرداند:

```js {1,3,4}
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    //...
```

`value` مقدار را ذخیره می‌کند و `setValue` تابعی است که می‌توان از آن برای تغییر مقدار استفاده کرد. `null` که به `useState` ارسال می‌شود به عنوان مقدار اولیه برای این متغیر state استفاده می‌شود، بنابراین `value` در اینجا با `null` شروع می‌شود.

از آنجا که کامپوننت `Square` دیگر props را نمی‌پذیرد، باید prop `value` را از هر نه کامپوننت Square که توسط کامپوننت Board ایجاد شده‌اند، حذف کنید:

```js {6-8,11-13,16-18}
// ...
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

حالا با کلیک بر روی `Square`، یک "X" نمایش داده خواهد شد. event handler `console.log("clicked!");` را با `setValue('X');` جایگزین کنید. اکنون کامپوننت `Square` شما به این شکل است:

```js {5}
function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```

با فراخوانی این تابع `set` از یک هندلر `onClick`، به ری‌اکت می‌گویید که هر زمان که روی `Square` کلیک شد، آن `<button>` را دوباره رندر کند. پس از به‌روزرسانی، `value` در `Square` به `'X'` تغییر خواهد کرد، بنابراین "X" را روی صفحه بازی خواهید دید. روی هر مربع کلیک کنید و "X" باید نمایش داده شود:

![adding xes to board](../images/tutorial/tictac-adding-x-s.gif)

هر مربع دارای state خود است: `value` ذخیره‌شده در هر مربع کاملاً مستقل از دیگران است. وقتی یک تابع `set` را در یک کامپوننت فراخوانی می‌کنید، ری‌اکت به‌طور خودکار کامپوننت‌های فرزند داخل آن را نیز به‌روزرسانی می‌کند.

پس از اعمال تغییرات فوق، کد شما به این شکل خواهد بود:

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
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

### ابزارهای توسعه‌دهنده ری‌اکت {/*react-developer-tools*/}

ابزارهای توسعه ری‌اکت به شما اجازه می‌دهند تا props و state کامپوننت‌های ری‌اکت خود را بررسی کنید. می‌توانید تب ابزارهای توسعه ری‌اکت را در پایین بخش _مرورگر_ در CodeSandbox پیدا کنید.

![React DevTools در CodeSandbox](../images/tutorial/codesandbox-devtools.png)

برای بررسی یک کامپوننت خاص روی صفحه، از دکمه‌ای که در گوشه بالا سمت چپ React DevTools قرار دارد، استفاده کنید:

![انتخاب کامپوننت‌ها در صفحه با React DevTools](../images/tutorial/devtools-select.gif)

<Note>

برای توسعه محلی، React DevTools به‌عنوان یک افزونه مرورگر برای [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)، [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) و [Edge](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) در دسترس است. آن را نصب کنید و زبانه *Components* در ابزارهای توسعه‌دهنده مرورگر شما برای سایت‌هایی که از React استفاده می‌کنند ظاهر خواهد شد.

</Note>

## تکمیل بازی {/*completing-the-game*/}

تا اینجا، شما تمام اجزای پایه‌ای برای بازی دوز خود را دارید. برای داشتن یک بازی کامل، اکنون باید به‌صورت متناوب "X" و "O" را روی صفحه قرار دهید و به روشی برای تعیین برنده نیاز دارید.

### بالابردن state {/*lifting-state-up*/}

در حال حاضر، هر کامپوننت `Square` بخشی از state بازی را نگه‌داری می‌کند. برای بررسی برنده در یک بازی دوز، `Board` باید به‌نوعی از state هر یک از ۹ کامپوننت `Square` آگاه باشد.

چگونه به این موضوع نزدیک می‌شوید؟ در ابتدا، ممکن است حدس بزنید که `Board` باید از هر `Square` برای وضعیت آن `Square` "بپرسد". اگرچه این روش از نظر فنی در ری‌اکت ممکن است، اما ما آن را توصیه نمی‌کنیم زیرا کد دشوار برای فهمیدن، مستعد خطا و سخت برای بازسازی می‌شود. در عوض، بهترین روش این است که وضعیت بازی را در کامپوننت والد `Board` ذخیره کنید به جای اینکه در هر `Square` باشد. کامپوننت `Board` می‌تواند به هر `Square` بگوید چه چیزی را نمایش دهد با ارسال یک prop، مانند زمانی که یک عدد را به هر Square ارسال کردید.

**برای جمع‌آوری داده از چندین فرزند، یا برای ارتباط دو کامپوننت فرزند با یکدیگر، state مشترک را در کامپوننت والد آن‌ها اعلام کنید. کامپوننت والد می‌تواند آن state را از طریق props به فرزندان منتقل کند. این کار باعث می‌شود که کامپوننت‌های فرزند با یکدیگر و با والد خود هماهنگ باشند.**

بالا بردن state به یک کامپوننت والد معمولاً زمانی انجام می‌شود که کامپوننت‌های ری‌اکت بازآرایی می‌شوند.

بیایید از این فرصت استفاده کنیم و آن را امتحان کنیم. کامپوننت `Board` را ویرایش کنید تا یک متغیر state به نام `squares` اعلام کند که به‌طور پیش‌فرض یک آرایه شامل ۹ مقدار null مربوط به ۹ مربع است:

```js {3}
// ...
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    // ...
  );
}
```

`Array(9).fill(null)` یک آرایه با نه المنت ایجاد می‌کند و هر کدام از آن‌ها را به `null` تنظیم می‌کند. فراخوانی `useState()` در اطراف آن یک متغیر state `squares` اعلام می‌کند که در ابتدا به آن آرایه تنظیم شده است. هر ورودی در آرایه به مقدار یک مربع مربوط می‌شود. وقتی بعداً تخته را پر می‌کنید، آرایه `squares` به این شکل خواهد بود:

```jsx
['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
```

اکنون کامپوننت `Board` شما باید ویژگی `value` را به هر `Square` که رندر می‌کند، منتقل کند:

```js {6-8,11-13,16-18}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
```

در مرحله بعد، کامپوننت `Square` را ویرایش خواهید کرد تا ویژگی `value` را از کامپوننت Board دریافت کند. این کار نیاز به حذف ردیابی حالت‌دار خود کامپوننت Square برای `value` و ویژگی `onClick` دکمه دارد:

```js {1,2}
function Square({value}) {
  return <button className="square">{value}</button>;
}
```

در این مرحله باید یک صفحه خالی از بازی دوز را ببینید:

![empty board](../images/tutorial/empty-board.png)

و کد شما باید به این شکل باشد:

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
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

هر مربع اکنون یک prop `value` دریافت خواهد کرد که یا `'X'`، `'O'` یا `null` برای مربع‌های خالی خواهد بود.

سپس، باید تغییر دهید که وقتی یک `Square` کلیک می‌شود چه اتفاقی می‌افتد. کامپوننت `Board` اکنون نگهداری می‌کند که کدام مربع‌ها پر شده‌اند. شما باید راهی ایجاد کنید تا `Square` بتواند state کامپوننت `Board` را به‌روزرسانی کند. از آنجا که state به کامپوننتی که آن را تعریف کرده خصوصی است، نمی‌توانید state کامپوننت `Board` را مستقیماً از `Square` به‌روزرسانی کنید.

در عوض، شما یک تابع را از کامپوننت `Board` به کامپوننت `Square` ارسال می‌کنید و `Square` آن تابع را زمانی که یک مربع کلیک می‌شود، فراخوانی خواهد کرد. شما با تابعی که کامپوننت `Square` هنگام کلیک شدن فراخوانی می‌کند، شروع خواهید کرد. شما آن تابع را `onSquareClick` می‌نامید:

```js {3}
function Square({ value }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
```

سپس، تابع `onSquareClick` را به props کامپوننت `Square` اضافه می‌کنید:

```js {1}
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
```

اکنون شما ویژگی `onSquareClick` را به تابعی در کامپوننت `Board` که آن را `handleClick` نام‌گذاری خواهید کرد، متصل می‌کنید. برای اتصال `onSquareClick` به `handleClick`، یک تابع به ویژگی `onSquareClick` از اولین کامپوننت `Square` ارسال خواهید کرد:

```js {7}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        //...
  );
}
```

در نهایت، شما تابع `handleClick` را درون کامپوننت Board تعریف خواهید کرد تا آرایه `squares` که وضعیت برد شما را نگه می‌دارد، به‌روزرسانی کنید:

```js {4-8}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    // ...
  )
}
```

تابع `handleClick` یک کپی از آرایه `squares` (`nextSquares`) با متد Array جاوااسکریپت `slice()` ایجاد می‌کند. سپس، `handleClick` آرایه `nextSquares` را به‌روزرسانی می‌کند تا `X` را به اولین مربع (ایندکس `[0]`) اضافه کند.

فراخوانی تابع `setSquares` به ری‌اکت اطلاع می‌دهد که state کامپوننت تغییر کرده است. این باعث می‌شود که کامپوننت‌هایی که از state `squares` (`Board`) استفاده می‌کنند، به همراه کامپوننت‌های فرزند آن (کامپوننت‌های `Square` که تخته را تشکیل می‌دهند) دوباره رندر شوند.

<Note>

جاوااسکریپت از [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) پشتیبانی می‌کند، به این معنا که یک تابع داخلی (مثلاً `handleClick`) به متغیرها و توابع تعریف‌شده در یک تابع خارجی (مثلاً `Board`) دسترسی دارد. تابع `handleClick` می‌تواند state `squares` را بخواند و متد `setSquares` را فراخوانی کند زیرا هر دو در داخل تابع `Board` تعریف شده‌اند.

</Note>

حالا می‌توانید Xها را به صفحه اضافه کنید... اما فقط به مربع بالا سمت چپ. تابع `handleClick` شما به‌صورت ثابت برای به‌روزرسانی شاخص مربع بالا سمت چپ (`0`) تنظیم شده است. بیایید `handleClick` را به‌روزرسانی کنیم تا بتواند هر مربعی را به‌روزرسانی کند. یک آرگومان `i` به تابع `handleClick` اضافه کنید که شاخص مربعی که باید به‌روزرسانی شود را بگیرد:

```js {4,6}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return (
    // ...
  )
}
```

سپس، باید آن `i` را به `handleClick` منتقل کنید. می‌توانید سعی کنید ویژگی `onSquareClick` مربع را به‌طور مستقیم در JSX به `handleClick(0)` تنظیم کنید، اما این کار نخواهد کرد:

```jsx
<Square value={squares[0]} onSquareClick={handleClick(0)} />
```

دلیل کار نکردن این است. فراخوانی `handleClick(0)` بخشی از رندر کامپوننت برد خواهد بود. چون `handleClick(0)` با فراخوانی `setSquares`، state کامپوننت برد را تغییر می‌دهد، کل کامپوننت برد دوباره رندر خواهد شد. اما این باعث می‌شود که `handleClick(0)` دوباره اجرا شود و به یک حلقه بی‌نهایت منجر شود:

<ConsoleBlock level="error">

تعداد زیادی رندر انجام شده است. ری‌اکت تعداد رندرها را محدود می‌کند تا از ایجاد حلقهٔ بی‌نهایت جلوگیری کند.

</ConsoleBlock>

چرا این مشکل زودتر رخ نداده بود؟

وقتی که `onSquareClick={handleClick}` را ارسال می‌کردید، تابع `handleClick` را به عنوان یک prop ارسال می‌کردید. شما آن را فراخوانی نمی‌کردید! اما اکنون شما آن تابع را بلافاصله فراخوانی می‌کنید--به پرانتزها در `handleClick(0)` توجه کنید--و به همین دلیل است که زودتر اجرا می‌شود. شما نمی‌خواهید `handleClick` را فراخوانی کنید تا زمانی که کاربر کلیک کند!

می‌توانید این مشکل را با ایجاد تابعی مانند `handleFirstSquareClick` که `handleClick(0)` را فراخوانی می‌کند، تابعی مانند `handleSecondSquareClick` که `handleClick(1)` را فراخوانی می‌کند و به همین ترتیب، حل کنید. شما این توابع را به‌عنوان props مانند `onSquareClick={handleFirstSquareClick}` ارسال می‌کنید (به‌جای فراخوانی). این کار حلقه بی‌نهایت را حل می‌کند.

با این حال، تعریف نه تابع مختلف و نام‌گذاری هر یک از آن‌ها بسیار پرحرفی است. در عوض، بیایید این کار را انجام دهیم:

```js {6}
export default function Board() {
  // ...
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        // ...
  );
}
```

به نحوۀ جدید `() =>` توجه کنید. در اینجا، `() => handleClick(0)` یک *تابع پیکانی* است که روشی کوتاه‌تر برای تعریف توابع است. وقتی مربع کلیک می‌شود، کد بعد از "پیکان" `=>` اجرا می‌شود و `handleClick(0)` را فراخوانی می‌کند.

حالا باید هشت مربع دیگر را به‌روزرسانی کنید تا `handleClick` را از توابع پیکانی که ارسال می‌کنید، فراخوانی کنند. مطمئن شوید که آرگومان هر فراخوانی `handleClick` با شاخص مربع صحیح مطابقت داشته باشد:

```js {6-8,11-13,16-18}
export default function Board() {
  // ...
  return (
    <>
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
};
```

اکنون می‌توانید با کلیک بر روی هر مربع روی تخته، دوباره X‌ها را اضافه کنید:

![filling the board with X](../images/tutorial/tictac-adding-x-s.gif)

اما این بار تمام مدیریت state توسط کامپوننت `Board` انجام می‌شود!

کد شما باید به این صورت باشد:

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

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
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

اکنون که مدیریت state در کامپوننت `Board` شما قرار دارد، کامپوننت والد `Board` props را به کامپوننت‌های فرزند `Square` ارسال می‌کند تا به درستی نمایش داده شوند. با کلیک بر روی `Square`، کامپوننت فرزند `Square` اکنون از کامپوننت والد `Board` می‌خواهد که state بورد را به‌روزرسانی کند. وقتی state `Board` تغییر می‌کند، هم کامپوننت `Board` و هم هر کامپوننت فرزند `Square` به‌طور خودکار رندر می‌شوند. نگه‌داشتن state تمام مربع‌ها در کامپوننت `Board` به آن اجازه می‌دهد تا در آینده برنده را تعیین کند.

بیایید مرور کنیم که وقتی کاربر روی مربع بالا سمت چپ در صفحه شما کلیک می‌کند تا یک `X` به آن اضافه کند، چه اتفاقی می‌افتد:

۱. کلیک کردن روی مربع بالا سمت چپ تابعی را اجرا می‌کند که `button` به عنوان prop `onClick` از `Square` دریافت کرده است. کامپوننت `Square` آن تابع را به عنوان prop `onSquareClick` از `Board` دریافت کرده است. کامپوننت `Board` آن تابع را مستقیماً در JSX تعریف کرده است. این تابع `handleClick` را با آرگومان `0` فراخوانی می‌کند.
1. `handleClick` از آرگومان (`0`) برای به‌روزرسانی اولین المنت آرایهٔ `squares` از `null` به `X` استفاده می‌کند.
وضعیت `squares` کامپوننت `Board` به‌روزرسانی شد، بنابراین `Board` و تمام فرزندانش دوباره رندر می‌شوند. این باعث می‌شود ویژگی `value` کامپوننت `Square` با شاخص `0` از `null` به `X` تغییر کند.

در نهایت، کاربر می‌بیند که مربع بالا سمت چپ پس از کلیک کردن از حالت خالی به داشتن `X` تغییر کرده است.

<Note>

ویژگی `onClick` المنت DOM `<button>` معنای خاصی برای ری‌اکت دارد زیرا یک کامپوننت داخلی است. برای کامپوننت‌های سفارشی مانند Square، نام‌گذاری به عهده شماست. می‌توانید هر نامی به ویژگی `onSquareClick` کامپوننت `Square` یا تابع `handleClick` کامپوننت `Board` بدهید و کد به همان صورت کار خواهد کرد. در ری‌اکت، به‌طور متعارف از نام‌های `onSomething` برای ویژگی‌هایی که نمایانگر رویدادها هستند و `handleSomething` برای تعریف توابعی که آن رویدادها را مدیریت می‌کنند، استفاده می‌شود.

</Note>

### چرا تغییرناپذیری مهم است {/*why-immutability-is-important*/}

توجه کنید که در `handleClick`، شما `.slice()` را فراخوانی می‌کنید تا یک کپی از آرایه `squares` ایجاد کنید به جای اینکه آرایه موجود را تغییر دهید. برای توضیح دلیل این کار، باید درباره عدم تغییرپذیری و اهمیت یادگیری آن صحبت کنیم.

به طور کلی دو رویکرد برای تغییر داده وجود دارد. رویکرد اول این است که داده را با تغییر مستقیم مقادیر آن _تغییر_ دهید. رویکرد دوم این است که داده را با یک نسخه جدید که تغییرات مورد نظر را دارد جایگزین کنید. اینجا مثالی است از اینکه اگر آرایه `squares` را تغییر دهید، چگونه به نظر می‌رسد:

```jsx
const squares = [null, null, null, null, null, null, null, null, null];
squares[0] = 'X';
// Now `squares` is ["X", null, null, null, null, null, null, null, null];
```

و اینجا مثالی است از اینکه اگر داده‌ها را بدون تغییر آرایهٔ `squares` تغییر دهید، چگونه به نظر می‌رسد:

```jsx
const squares = [null, null, null, null, null, null, null, null, null];
const nextSquares = ['X', null, null, null, null, null, null, null, null];
// Now `squares` is unchanged, but `nextSquares` first element is 'X' rather than `null`
```

نتیجه یکسان است، اما با تغییر ندادن مستقیم (تغییر ندادن داده‌های زیربنایی)، چندین مزیت کسب می‌کنید.

تغییرناپذیری پیاده‌سازی قابلیت‌های پیچیده را بسیار آسان‌تر می‌کند. در ادامه این آموزش، شما یک قابلیت "سفر در زمان" پیاده‌سازی خواهید کرد که به شما اجازه می‌دهد تاریخچه بازی را مرور کرده و به حرکات گذشته "برگردید". این قابلیت مختص بازی‌ها نیست--توانایی لغو و انجام مجدد برخی اقدامات یک نیاز معمول برای اپ‌ها است. اجتناب از تغییر مستقیم داده به شما اجازه می‌دهد نسخه‌های قبلی داده را دست‌نخورده نگه دارید و بعداً از آن‌ها استفاده کنید.

مزیت دیگری نیز برای تغییرناپذیری وجود دارد. به‌طور پیش‌فرض، تمام کامپوننت‌های فرزند به‌صورت خودکار زمانی که state کامپوننت والد تغییر می‌کند، دوباره رندر می‌شوند. این شامل کامپوننت‌های فرزندی می‌شود که تحت تأثیر تغییر قرار نگرفته‌اند. اگرچه رندر مجدد به‌خودی‌خود برای کاربر قابل‌مشاهده نیست (نباید به‌طور فعال سعی کنید از آن اجتناب کنید!)، ممکن است بخواهید به دلایل عملکردی، رندر مجدد بخشی از درخت که به‌وضوح تحت تأثیر قرار نگرفته است را نادیده بگیرید. تغییرناپذیری مقایسه اینکه آیا داده‌های کامپوننت تغییر کرده‌اند یا نه را بسیار ارزان می‌کند. می‌توانید درباره اینکه ری‌اکت چگونه انتخاب می‌کند که چه زمانی یک کامپوننت را دوباره رندر کند، در [مرجع API `memo`](/reference/react/memo) بیشتر بیاموزید.

### نوبت‌گیری {/*taking-turns*/}

اکنون زمان آن رسیده است که یک نقص عمده در این بازی دوز را برطرف کنیم: "O"ها نمی‌توانند روی صفحه علامت‌گذاری شوند.

شما اولین حرکت را به‌طور پیش‌فرض "X" تنظیم خواهید کرد. بیایید با افزودن یک state دیگر به کامپوننت Board این را پیگیری کنیم:

```js {2}
function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  // ...
}
```

هر بار که یک بازیکن حرکت می‌کند، `xIsNext` (یک بولین) تغییر می‌کند تا تعیین شود کدام بازیکن بعدی است و وضعیت بازی ذخیره می‌شود. شما تابع `Board` مربوط به `handleClick` را به‌روزرسانی خواهید کرد تا مقدار `xIsNext` را تغییر دهد:

```js {7,8,9,10,11,13}
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    //...
  );
}
```

اکنون، با کلیک بر روی مربع‌های مختلف، آن‌ها بین `X` و `O` جابجا می‌شوند، همان‌طور که باید!

اما صبر کنید، یک مشکل وجود دارد. سعی کنید چندین بار روی همان مربع کلیک کنید:

![O overwriting an X](../images/tutorial/o-replaces-x.gif)

`X` توسط یک `O` بازنویسی شده است! در حالی که این می‌تواند پیچش بسیار جالبی به بازی اضافه کند، فعلاً به قوانین اصلی پایبند می‌مانیم.

وقتی یک مربع را با `X` یا `O` علامت‌گذاری می‌کنید، ابتدا بررسی نمی‌کنید که آیا مربع قبلاً دارای مقدار `X` یا `O` است یا خیر. می‌توانید این مشکل را با *بازگشت زودهنگام* برطرف کنید. بررسی خواهید کرد که آیا مربع قبلاً دارای `X` یا `O` است. اگر مربع قبلاً پر شده باشد، در تابع `return` زودهنگام `handleClick` خواهید کرد--قبل از اینکه سعی کند وضعیت تخته را به‌روزرسانی کند.

```js {2,3,4}
function handleClick(i) {
  if (squares[i]) {
    return;
  }
  const nextSquares = squares.slice();
  //...
}
```

اکنون شما فقط می‌توانید `X` یا `O` را به مربع‌های خالی اضافه کنید! در اینجا کد شما در این مرحله باید به این شکل باشد:

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
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

### اعلام برنده {/*declaring-a-winner*/}

حالا که بازیکنان می‌توانند نوبت بگیرند، می‌خواهید نشان دهید که چه زمانی بازی برنده شده و دیگر نوبتی برای انجام وجود ندارد. برای این کار، یک تابع کمکی به نام `calculateWinner` اضافه خواهید کرد که یک آرایه از ۹ مربع می‌گیرد، برنده را بررسی می‌کند و به‌طور مناسب `'X'`، `'O'`، یا `null` را برمی‌گرداند. نگران تابع `calculateWinner` نباشید؛ این تابع خاص ری‌اکت نیست:

```js src/App.js
export default function Board() {
  //...
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
    [2, 4, 6]
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

<Note>

مهم نیست که `calculateWinner` را قبل یا بعد از `Board` تعریف کنید. بیایید آن را در انتها قرار دهیم تا هر بار که کامپوننت‌های خود را ویرایش می‌کنید، نیازی به پیمایش از روی آن نداشته باشید.

</Note>

شما `calculateWinner(squares)` را در تابع `Board` کامپوننت `handleClick` فراخوانی خواهید کرد تا بررسی کنید آیا یک بازیکن برنده شده است. می‌توانید این بررسی را همزمان با بررسی اینکه آیا کاربر روی مربعی که قبلاً دارای `X` یا `O` است کلیک کرده، انجام دهید. ما می‌خواهیم در هر دو حالت زودتر بازگردیم:

```js {2}
function handleClick(i) {
  if (squares[i] || calculateWinner(squares)) {
    return;
  }
  const nextSquares = squares.slice();
  //...
}
```

برای اطلاع دادن به بازیکنان از پایان بازی، می‌توانید متنی مانند "برنده: X" یا "برنده: O" نمایش دهید. برای این کار، یک بخش `status` به کامپوننت `Board` اضافه خواهید کرد. وضعیت برنده را نمایش می‌دهد اگر بازی تمام شده باشد و اگر بازی در حال انجام باشد، نوبت بازیکن بعدی را نمایش خواهید داد:

```js {3-9,13}
export default function Board() {
  // ...
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        // ...
  )
}
```

تبریک! اکنون شما یک بازی دوز کارآمد دارید. و همچنین اصول اولیه ری‌اکت را هم یاد گرفته‌اید. بنابراین _شما_ برنده واقعی هستید. اینجا کدی است که باید به این شکل باشد:

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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

## افزودن سفر در زمان {/*adding-time-travel*/}

به عنوان یک تمرین نهایی، بیایید امکان "بازگشت به گذشته" به حرکات قبلی در بازی را ایجاد کنیم.

### ذخیره تاریخچه حرکات {/*storing-a-history-of-moves*/}

اگر آرایهٔ `squares` را تغییر دهید، پیاده‌سازی تایم تراول بسیار دشوار خواهد بود.

با این حال، شما از `slice()` برای ایجاد یک نسخه جدید از آرایه `squares` پس از هر حرکت استفاده کردید و آن را به‌عنوان غیرقابل تغییر در نظر گرفتید. این به شما اجازه می‌دهد تا هر نسخه گذشته از آرایه `squares` را ذخیره کنید و بین نوبت‌هایی که قبلاً اتفاق افتاده‌اند جابه‌جا شوید.

شما آرایه‌های گذشته `squares` را در آرایه دیگری به نام `history` ذخیره خواهید کرد، که آن را به عنوان یک متغیر state جدید ذخیره می‌کنید. آرایه `history` نمایانگر تمام وضعیت‌های بورد، از اولین تا آخرین حرکت است و شکلی مانند این دارد:

```jsx
[
  // Before first move
  [null, null, null, null, null, null, null, null, null],
  // After first move
  [null, null, null, null, 'X', null, null, null, null],
  // After second move
  [null, null, null, null, 'X', null, null, null, 'O'],
  // ...
]
```

### بالا بردن state، دوباره {/*lifting-state-up-again*/}

اکنون یک کامپوننت سطح بالا جدید به نام `Game` خواهید نوشت تا لیستی از حرکات گذشته را نمایش دهد. در اینجا، state `history` را قرار خواهید داد که شامل تاریخچه کامل بازی است.

قرار دادن state در کامپوننت `Game` به شما اجازه می‌دهد تا state را از کامپوننت فرزند `Board` حذف کنید. همان‌طور که state را از کامپوننت `Board` به کامپوننت `Game` "بالا بردید"، اکنون آن را از `Game` به کامپوننت سطح بالا `Board` بالا می‌برید. این کار به کامپوننت `Board` کنترل کامل بر داده‌های `history` می‌دهد و به آن اجازه می‌دهد تا به @@INLN_10@@ دستور دهد که نوبت‌های قبلی را از @@INLN_11@@ رندر کند.

ابتدا، یک کامپوننت `Game` با `export default` اضافه کنید. بگذارید کامپوننت `Board` و مقداری مارک‌آپ را رندر کند:

```js {1,5-16}
function Board() {
  // ...
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
```

توجه داشته باشید که شما کلمات کلیدی `export default` را قبل از اعلان `function Board() {` حذف کرده و آن‌ها را قبل از اعلان `function Game() {` اضافه می‌کنید. این به فایل `index.js` شما می‌گوید که از کامپوننت `Game` به عنوان کامپوننت سطح بالا به جای کامپوننت `Board` استفاده کند. `div`های اضافی که توسط کامپوننت `Game` بازگردانده می‌شوند، فضایی برای اطلاعات بازی که بعداً به برد اضافه خواهید کرد، ایجاد می‌کنند.

به کامپوننت `Game` مقداری state اضافه کنید تا بازیکن بعدی و تاریخچه حرکات را دنبال کند:

```js {2-3}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // ...
```

توجه کنید که `[Array(9).fill(null)]` یک آرایه با یک آیتم است که خود آن یک آرایه از ۹ `null` می‌باشد.

برای رندر مربع‌ها برای حرکت فعلی، می‌خواهید آرایه مربع‌های آخر را از `history` بخوانید. برای این کار نیازی به `useState` ندارید--شما قبلاً اطلاعات کافی برای محاسبه آن در حین رندر دارید.

```js {4}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  // ...
```

سپس، یک تابع `handlePlay` درون کامپوننت `Game` ایجاد کنید که توسط کامپوننت `Board` برای به‌روزرسانی بازی فراخوانی شود. `xIsNext`، `currentSquares` و `handlePlay` را به‌عنوان props به کامپوننت `Board` ارسال کنید:

```js {6-8,13}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // TODO
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        //...
  )
}
```

بیایید کامپوننت `Board` را به‌طور کامل توسط propsهایی که دریافت می‌کند کنترل کنیم. کامپوننت `Board` را تغییر دهید تا سه props بگیرد: `xIsNext`، `squares`، و یک تابع جدید `onPlay` که `Board` می‌تواند با آرایه به‌روزشدهٔ squares هنگام حرکت بازیکن فراخوانی کند. سپس، دو خط اول تابع `Board` که `useState` را فراخوانی می‌کنند حذف کنید:

```js {1}
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //...
  }
  // ...
}
```

حالا فراخوانی‌های `setSquares` و `setXIsNext` را در `handleClick` در کامپوننت `Board` با یک فراخوانی به تابع جدید `onPlay` جایگزین کنید تا کامپوننت `Game` بتواند هنگام کلیک کاربر روی یک مربع، `Board` را به‌روزرسانی کند:

```js {12}
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  //...
}
```

کامپوننت `Board` به‌طور کامل توسط propsهایی که از کامپوننت `Game` به آن ارسال می‌شود کنترل می‌شود. شما باید تابع `handlePlay` را در کامپوننت `Game` پیاده‌سازی کنید تا بازی دوباره کار کند.

هنگام فراخوانی، `handlePlay` باید چه کاری انجام دهد؟ به یاد داشته باشید که Board قبلاً `setSquares` را با یک آرایه به‌روزشده فراخوانی می‌کرد؛ اکنون آرایه به‌روزشدهٔ `squares` را به `onPlay` ارسال می‌کند.

تابع `handlePlay` نیاز دارد که state مربوط به `Game` را به‌روزرسانی کند تا یک رندر مجدد را تحریک کند، اما دیگر تابع `setSquares` را ندارید که بتوانید فراخوانی کنید--شما اکنون از متغیر state `history` برای ذخیره این اطلاعات استفاده می‌کنید. شما می‌خواهید `history` را با افزودن آرایه به‌روزرسانی‌شده `squares` به‌عنوان یک ورودی جدید در تاریخچه به‌روزرسانی کنید. همچنین می‌خواهید `xIsNext` را تغییر دهید، همان‌طور که Board قبلاً انجام می‌داد:

```js {4-5}
export default function Game() {
  //...
  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }
  //...
}
```

اینجا، `[...history, nextSquares]` یک آرایه جدید ایجاد می‌کند که شامل تمام آیتم‌های `history` است و سپس `nextSquares` را دنبال می‌کند. (می‌توانید `...history` [*spread syntax*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) را به‌عنوان "تمام آیتم‌های `history` را شمارش کن" بخوانید.)

برای مثال، اگر `history` برابر `[[null,null,null], ["X",null,null]]` و `nextSquares` برابر `["X",null,"O"]` باشد، آنگاه آرایه جدید `[...history, nextSquares]` برابر `[[null,null,null], ["X",null,null], ["X",null,"O"]]` خواهد بود.

در این مرحله، شما state را به کامپوننت `Game` منتقل کرده‌اید و رابط کاربری باید به‌طور کامل کار کند، درست همان‌طور که قبل از بازسازی بود. در اینجا کد باید به این شکل باشد:

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
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
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

### نمایش حرکات گذشته {/*showing-the-past-moves*/}

از آنجا که شما تاریخچه بازی دوز را ضبط می‌کنید، اکنون می‌توانید فهرستی از حرکات گذشته را به بازیکن نمایش دهید.

المنت‌های ری‌اکت مانند `<button>` اشیاء معمولی جاوااسکریپت هستند؛ شما می‌توانید آن‌ها را در برنامه خود منتقل کنید. برای رندر چندین آیتم در ری‌اکت، می‌توانید از یک آرایه از المنت‌های ری‌اکت استفاده کنید.

شما در حال حاضر یک آرایه از `history` حرکت‌ها در state دارید، بنابراین اکنون باید آن را به یک آرایه از المنت‌های ری‌اکت تبدیل کنید. در جاوااسکریپت، برای تبدیل یک آرایه به آرایه‌ای دیگر، می‌توانید از [متد آرایه `map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) استفاده کنید.

```jsx
[1, 2, 3].map((x) => x * 2) // [2, 4, 6]
```

شما از `map` برای تبدیل `history` حرکات خود به المنت‌های ری‌اکت که دکمه‌هایی روی صفحه نمایش را نشان می‌دهند، استفاده خواهید کرد و لیستی از دکمه‌ها برای "پرش" به حرکات گذشته نمایش خواهید داد. بیایید `map` را در کامپوننت Game انجام دهیم:

```js {11-13,15-27,35}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
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
```

می‌توانید ببینید که کد شما باید به چه شکلی باشد. توجه داشته باشید که باید یک خطا در کنسول ابزارهای توسعه‌دهنده مشاهده کنید که می‌گوید:

<ConsoleBlock level="warning">
هشدار: هر فرزند در یک آرایه یا iterator باید یک ویژگی "key" یکتا داشته باشد. متد رندر `Game` را بررسی کنید.
</ConsoleBlock>
  
این خطا را در بخش بعدی رفع خواهید کرد.

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
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
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

هنگامی که درون تابعی که به `history` ارسال کرده‌اید، در حال پیمایش آرایه `map` هستید، آرگومان `squares` از هر المنت `history` عبور می‌کند و آرگومان `move` از هر ایندکس آرایه عبور می‌کند: `0`، `1`، `2`، …. (در بیشتر موارد، به المنت‌های واقعی آرایه نیاز دارید، اما برای رندر لیستی از حرکات فقط به ایندکس‌ها نیاز خواهید داشت.)

برای هر حرکت در تاریخچه بازی دوز، یک آیتم لیست `<li>` ایجاد می‌کنید که حاوی یک دکمه `<button>` است. دکمه دارای یک event handler `onClick` است که تابعی به نام `jumpTo` را فراخوانی می‌کند (که هنوز آن را پیاده‌سازی نکرده‌اید).

فعلاً باید لیستی از حرکات انجام‌شده در بازی و یک خطا در کنسول ابزارهای توسعه‌دهنده ببینید. بیایید درباره معنای خطای "کلید" صحبت کنیم.

### انتخاب یک کلید {/*picking-a-key*/}

وقتی یک لیست را رندر می‌کنید، ری‌اکت مقداری اطلاعات درباره هر آیتم رندر شده لیست ذخیره می‌کند. وقتی لیست را به‌روزرسانی می‌کنید، ری‌اکت باید تعیین کند چه چیزی تغییر کرده است. ممکن است آیتم‌هایی را اضافه، حذف، جابه‌جا یا به‌روزرسانی کرده باشید.

تصور کنید که از

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

به

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

علاوه بر شمارش‌های به‌روزرسانی‌شده، یک انسان که این را می‌خواند احتمالاً می‌گوید که شما ترتیب الکسا و بن را جابه‌جا کرده‌اید و کلودیا را بین الکسا و بن قرار داده‌اید. با این حال، ری‌اکت یک برنامه کامپیوتری است و نمی‌داند که شما چه قصدی داشتید، بنابراین باید یک ویژگی _key_ برای هر آیتم لیست مشخص کنید تا هر آیتم لیست را از همتایانش متمایز کنید. اگر داده‌های شما از یک پایگاه داده بود، می‌توانستید از شناسه‌های پایگاه داده الکسا، بن و کلودیا به عنوان کلید استفاده کنید.

```js {1}
<li key={user.id}>
  {user.name}: {user.taskCount} tasks left
</li>
```

هنگامی که یک لیست دوباره رندر می‌شود، ری‌اکت کلید هر آیتم لیست را می‌گیرد و در آیتم‌های لیست قبلی به دنبال کلید مشابه می‌گردد. اگر لیست فعلی کلیدی داشته باشد که قبلاً وجود نداشته، ری‌اکت یک کامپوننت ایجاد می‌کند. اگر لیست فعلی کلیدی را نداشته باشد که در لیست قبلی وجود داشته، ری‌اکت کامپوننت قبلی را از بین می‌برد. اگر دو کلید مطابقت داشته باشند، کامپوننت مربوطه جابه‌جا می‌شود.

کلیدها به ری‌اکت درباره هویت هر کامپوننت اطلاع می‌دهند، که به ری‌اکت اجازه می‌دهد تا بین رندرهای مجدد، state را حفظ کند. اگر کلید یک کامپوننت تغییر کند، کامپوننت نابود شده و با یک state جدید دوباره ایجاد می‌شود.

`key` یک ویژگی خاص و رزرو شده در ری‌اکت است. وقتی یک المنت ایجاد می‌شود، ری‌اکت ویژگی `key` را استخراج کرده و کلید را مستقیماً روی المنت بازگشتی ذخیره می‌کند. حتی اگر `key` به نظر برسد که به عنوان props ارسال شده است، ری‌اکت به طور خودکار از `key` برای تصمیم‌گیری در مورد اینکه کدام کامپوننت‌ها را به‌روزرسانی کند، استفاده می‌کند. هیچ راهی برای یک کامپوننت وجود ندارد که بپرسد چه `key` توسط والدش مشخص شده است.

**توصیه می‌شود که هنگام ساخت لیست‌های پویا، حتماً کلیدهای مناسبی اختصاص دهید.** اگر کلید مناسبی ندارید، ممکن است بخواهید داده‌های خود را به گونه‌ای بازسازی کنید که کلید مناسب داشته باشید.

اگر هیچ کلیدی مشخص نشود، ری‌اکت یک خطا گزارش می‌دهد و به‌طور پیش‌فرض از ایندکس آرایه به‌عنوان کلید استفاده می‌کند. استفاده از ایندکس آرایه به‌عنوان کلید در هنگام تلاش برای تغییر ترتیب آیتم‌های یک لیست یا درج/حذف آیتم‌های لیست مشکل‌ساز است. ارسال صریح `key={i}` خطا را خاموش می‌کند اما همان مشکلات ایندکس‌های آرایه را دارد و در بیشتر موارد توصیه نمی‌شود.

کلیدها نیازی به یکتایی جهانی ندارند؛ آن‌ها فقط باید بین کامپوننت‌ها و هم‌سطح‌هایشان منحصربه‌فرد باشند.

### پیاده‌سازی سفر در زمان {/*implementing-time-travel*/}

در تاریخچه بازی دوز، هر حرکت گذشته دارای یک شناسه منحصربه‌فرد است: این شناسه شماره ترتیبی حرکت است. حرکات هرگز دوباره مرتب، حذف یا در وسط درج نمی‌شوند، بنابراین استفاده از شاخص حرکت به عنوان کلید ایمن است.

در تابع `Game`، می‌توانید کلید را به‌عنوان `<li key={move}>` اضافه کنید و اگر بازی رندرشده را مجدداً بارگذاری کنید، خطای "key" ری‌اکت باید ناپدید شود:

```js {4}
const moves = history.map((squares, move) => {
  //...
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  );
});
```

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
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    // TODO
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

قبل از اینکه بتوانید `jumpTo` را پیاده‌سازی کنید، نیاز دارید که کامپوننت `Game` پیگیری کند که کاربر در حال مشاهده کدام مرحله است. برای این کار، یک متغیر state جدید به نام `currentMove` تعریف کنید که به‌طور پیش‌فرض برابر با `0` باشد.

```js {4}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[history.length - 1];
  //...
}
```

سپس، تابع `jumpTo` را درون `Game` به‌روزرسانی کنید تا آن `currentMove` را به‌روزرسانی کند. همچنین اگر عددی که در حال تغییر `true` به آن هستید زوج باشد، `currentMove` را به `xIsNext` تنظیم کنید.

```js {4-5}
export default function Game() {
  // ...
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
  //...
}
```

اکنون دو تغییر در تابع `Game` مربوط به `handlePlay` ایجاد خواهید کرد که هنگام کلیک بر روی یک مربع فراخوانی می‌شود.

- اگر به "زمان گذشته برگردید" و سپس از آن نقطه حرکت جدیدی انجام دهید، فقط می‌خواهید تاریخچه را تا آن نقطه نگه دارید. به جای افزودن `nextSquares` بعد از همه آیتم‌ها (`...` spread syntax) در `history`، آن را بعد از همه آیتم‌ها در `history.slice(0, currentMove + 1)` اضافه می‌کنید تا فقط آن بخش از تاریخچه قدیمی را نگه دارید.
- هر بار که حرکتی انجام می‌شود، باید `currentMove` را به آخرین ورودی تاریخچه به‌روزرسانی کنید.

```js {2-4}
function handlePlay(nextSquares) {
  const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCurrentMove(nextHistory.length - 1);
  setXIsNext(!xIsNext);
}
```

در نهایت، شما کامپوننت `Game` را تغییر خواهید داد تا حرکت انتخاب‌شده فعلی را رندر کند، به جای اینکه همیشه حرکت نهایی را رندر کند.

```js {5}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  // ...
}
```

اگر روی هر مرحله‌ای در تاریخچه بازی کلیک کنید، صفحه بازی دوز باید بلافاصله به‌روزرسانی شود تا نشان دهد که صفحه پس از وقوع آن مرحله چگونه به نظر می‌رسید.

<Sandpack>

```js src/App.js
import { useState } from 'react';

function Square({value, onSquareClick}) {
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
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
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

### پاک‌سازی نهایی {/*final-cleanup*/}

اگر به کد با دقت نگاه کنید، ممکن است متوجه شوید که `xIsNext === true` زمانی که `currentMove` زوج است و `xIsNext === false` زمانی که `currentMove` فرد است. به عبارت دیگر، اگر مقدار `currentMove` را بدانید، همیشه می‌توانید بفهمید که `xIsNext` چه باید باشد.

هیچ دلیلی وجود ندارد که هر دوی این‌ها را در state ذخیره کنید. در واقع، همیشه سعی کنید از state تکراری اجتناب کنید. ساده‌سازی آنچه در state ذخیره می‌کنید، خطاها را کاهش می‌دهد و کد شما را قابل‌فهم‌تر می‌کند. `Game` را تغییر دهید تا `xIsNext` را به‌عنوان یک متغیر state جداگانه ذخیره نکند و به‌جای آن بر اساس `currentMove` آن را محاسبه کند:

```js {4,11,15}
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
  // ...
}
```

دیگر نیازی به اعلان state `xIsNext` یا فراخوانی‌های `setXIsNext` ندارید. اکنون، حتی اگر در هنگام کدنویسی کامپوننت‌ها اشتباهی کنید، هیچ احتمالی برای ناهماهنگ شدن `xIsNext` با `currentMove` وجود ندارد.

### جمع‌بندی {/*wrapping-up*/}

تبریک! شما یک بازی دوز ساخته‌اید که:

- به شما اجازه می‌دهد تا بازی دوز را انجام دهید،
- نشان می‌دهد که چه زمانی یک بازیکن بازی را برده است،
- تاریخچه یک بازی را در حین پیشرفت بازی ذخیره می‌کند،
- به بازیکنان اجازه می‌دهد تاریخچهٔ بازی را مرور کرده و نسخه‌های قبلی صفحهٔ بازی را مشاهده کنند.

کار عالی! امیدواریم اکنون احساس کنید که درک مناسبی از نحوه کار ری‌اکت دارید.

نتیجه نهایی را اینجا ببینید:

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

اگر زمان اضافی دارید یا می‌خواهید مهارت‌های جدید ری‌اکت خود را تمرین کنید، در اینجا چند ایده برای بهبود بازی دوز آورده شده است که به ترتیب افزایش سختی فهرست شده‌اند:

1. فقط برای حرکت فعلی، به جای دکمه، "شما در حرکت شماره ..." را نمایش دهید.
1. `Board` را بازنویسی کنید تا به جای کدنویسی ثابت، از دو حلقه برای ساخت مربع‌ها استفاده شود.
1. یک دکمه تغییر وضعیت اضافه کنید که به شما اجازه می‌دهد حرکات را به ترتیب صعودی یا نزولی مرتب‌سازی کنید.
1. وقتی کسی برنده می‌شود، سه مربعی که باعث برد شده‌اند را برجسته کنید (و وقتی هیچ‌کس برنده نمی‌شود، پیامی درباره نتیجه تساوی نمایش دهید).
مکان هر حرکت را در قالب (ردیف، ستون) در فهرست تاریخچه حرکات نمایش دهید.

در طول این آموزش، با مفاهیم ری‌اکت از جمله المنت‌ها، کامپوننت‌ها، props و state آشنا شدید. حالا که دیدید این مفاهیم هنگام ساخت یک بازی چگونه کار می‌کنند، به [تفکر در ری‌اکت](/learn/thinking-in-react) مراجعه کنید تا ببینید همین مفاهیم ری‌اکت هنگام ساخت رابط کاربری یک اپ چگونه عمل می‌کنند.
