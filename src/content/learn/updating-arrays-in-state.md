---
title: به روز رسانی آرایه‌ها در State
---

<Intro>

آرایه‌ها در جاوا اسکریپت mutable (قابل تغییر مستقیم) هستند، اما توصیه می‌شود هنگامی که آنها را در state ذخیره می‌کنید، با آنها به شکل غیرقابل تغییر برخورد کنید. درست مانند object ها، هنگامی که می‌خواهید یک آرایه را در state ذخیره کنید، لازم است که یک آرایه جدید ساخته (یا یک آرایه موجود را کپی کنید)، و سپس state را ست کنید تا از آرایه جدید استفاده کنید.

</Intro>

<YouWillLearn>

- چگونه با state ری‌اکت به آرایه آیتم اضافه کرده، آیتم‌های موجود را حذف کرده یا تغییر دهیم
- چگونه یک object داخل یک آرایه را به روز رسانی کنیم
- چگونه به کمک Immer هنگام کپی کردن آرایه از تکرار زیاد جلوگیری کنیم

</YouWillLearn>

## به روز رسانی آرایه‌ها {/*updating-arrays-without-mutation*/}

در جاوا اسکریپت، آرایه‌ها تنها یک نوع دیگری از object هستند.  [مانند آبجکت‌ها](/learn/updating-objects-in-state)، **شما باید با آرایه‌ها به شکل read-only رفتار کنید.** این یعنی شما نباید آیتم‌های آرایه را به شکل `arr[0] = 'bird'` مقدار دهی مجدد کنید، و همچنین نباید از متد‌هایی که آرایه را mutate می‌کنند، همچون `push()` و `pop()` استفاده کنید.

در عوض، هر بار که می‌خواهید یک آرایه را به روز رسانی کنید، باید یک آرایه *جدید* را به تابع ست state خود بدهید. برای انجام این عمل، شما می‌توانید با فراخوانی متد‌های non-mutating همچون `filter()` و `map()` یک آرایه جدید از آرایه اصلی بسازید. سپس، می‌توانید state را با آرایه حاصل جدید ست کنید.

در اینجا یک جدول مرجع از عملیات‌های رایج بر روی آرایه‌ها را مشاهده می‌کنید. در هنگام کار کردن با آرایه‌ها در state ری‌اکت، باید از استفاده از متد‌های ستون سمت راست خودداری کرده، و در عوض از متد‌های ستون سمت چپ استفاده کنید:

|           | خودداری شود (آرایه را mutate می‌کند)           | ترجیح داده شود (آرایه جدید ایجاد می‌کند)                                        |
| --------- | ----------------------------------- | ------------------------------------------------------------------- |
| اضافه کردن    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax ([example](#adding-to-an-array)) |
| حذف کردن  | `pop`, `shift`, `splice`            | `filter`, `slice` ([example](#removing-from-an-array))              |
| جایگزین کردن | `splice`, `arr[i] = ...` assignment | `map` ([example](#replacing-items-in-an-array))                     |
| مرتب سازی   | `reverse`, `sort`                   | copy the array first ([example](#making-other-changes-to-an-array)) |

به عنوان یک جایگزین، شما می‌توانید [از Immer استفاده کنید](#write-concise-update-logic-with-immer) که به شما امکان استفاده از متد‌های هر دو ستون را می‌دهد.

<Pitfall>

متاسفانه، [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) و [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) با وجود نام‌گذاری مشابه تفاوت زیادی با یکدیگر دارند:

* `slice` به شما اجازه می‌دهد یک آرایه یا قسمتی از آن را کپی کنید.
* `splice` آرایه را **mutate می‌کند** (جهت افزودن یا حذف کردن آیتم‌ها).

در ری‌اکت، شما از `slice`  (بدون حرف `p`!) بسیار بیشتر استفاده می‌کنید چرا که شما نمی‌خواهید object ها یا آرایه‌های در state را mutate کنید. [به روز رسانی object ها](/learn/updating-objects-in-state) توضیح می‌دهد که mutation چیست و چرا برای state توصیه نمی‌شود.

</Pitfall>

### افزودن به آرایه {/*adding-to-an-array*/}

متد `push()` آرایه را mutate می‌کند، چیزی که شما آن را نمی‌خواهید:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

در عوض، باید یک آرایه *جدید* ایجاد کنید که شامل آیتم‌های فعلی آرایه *و* یک آیتم جدید در انتها است. برای انجام این عمل، چندین راه وجود دارد، اما آسان ترین راه این است که از سینتکس `...` [array spread (پخش آرایه)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) استفاده کنید:

```js
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

حال، کد به طرز صحیح عمل می‌کند:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

همچنین، سینتکس array spread به شما این امکان را می‌دهد که با قرار دادن آن پیش از آرایه اصلی `...artists`، آیتم را به ابتدای آرایه prepend کنید:

```js
setArtists([
  { id: nextId++, name: name },
  ...artists // Put old items at the end
]);
```

بدین‌گونه، عملگر spread می‌تواند کار متد `push()` را با افزودن به انتهای آرایه و کار `unshift()` را با افزودن به ابتدای آرایه انجام دهد. آن را در sandbox فوق امتحان کنید!

### حذف کردن از آرایه {/*removing-from-an-array*/}

آسان ترین راه برای حذف کردن یک آیتم از یک آرایه این است که آن را *فیلتر کنید*. به بیان دیگر، شما یک آرایه جدید ایجاد می‌کنید که آن آیتم را شامل نمی‌شود. برای انجام این عمل، از متد `filter` استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';

let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [artists, setArtists] = useState(
    initialArtists
  );

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

دکمه "Delete" را چند بار فشار داده و به click handler آن نگاه کنید.

```js
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

در اینجا، `artists.filter(a => a.id !== artist.id)` به معنی این است که "یک آرایه ایجاد کن که شامل `artist` هایی باشد که ID آنها با `artist.id` متفاوت است". به عبارتی دیگر، دکمه "Delete" هر artist  _همان_ artist را با فیلتر از آرایه خارج می‌کند، و سپس درخواست یک رندر مجدد با آرایه حاصل را می‌دهد. توجه کنید که `filter` آرایه اصلی را تغییر نمی‌دهد.

### تغییر دادن آرایه {/*transforming-an-array*/}

اگر می‌خواهید تعدادی از آیتم‌ها، یا تمامی آیتم‌های آرایه را تغییر دهید، می‌توانید از `map()` برای ایجاد یک آرایه **جدید** استفاده کنید. تابعی که به `map` می‌دهید می‌تواند تصمیم بگیرد که با هر آیتم آرایه، بر حسب داده یا شماره آن (یا هر دو) چه کند.

در این مثال، یک آرایه مختصات دو دایره و یک مربع را درون خود نگهداری می‌کند. هنگامی که دکمه را فشار می‌دهید، فقط دایره‌ها را به مقدار 50 پیکسل به پایین حرکت می‌دهد. این عمل با ایجاد یک آرایه جدید از داده‌ها توسط `map()` انجام می‌شود:

<Sandpack>

```js
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

```css
body { height: 300px; }
```

</Sandpack>

### جایگزین کردن آیتم در یک آرایه {/*replacing-items-in-an-array*/}

این که بخواهیم یک یا چند آیتم آرایه را جایگزین کنیم امری رایج است. مقدار دهی‌هایی مانند `arr[0] = 'bird'` آرایه اصلی را mutate می‌کنند، پس در عوض شما باید برای این کار نیز از  `map` استفاده کنید.

برای جایگزین کردن یک آیتم، با استفاده از  `map` یک آرایه جدید ایجاد کنید. داخل فراخوانی `map`، شما شماره جایگاه (index) آیتم را به عنوان آرگومان دوم دریافت می‌کنید. از آن برای تشخیص این استفاده کنید که آیتم اصلی (آرگومان اول) را بازگردانید یا مقدار دیگری را.

<Sandpack>

```js
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

### Insert (الحاق) کردن داخل یک آرایه {/*inserting-into-an-array*/}

گاهی اوقات، ممکن است که بخواهید یک آیتم را در یک موقعیت خاص به غیر از ابتدا یا انتهای آرایه insert کنید. برای انجام این عمل، می‌توانید از سینتکس `...` array spread به همراه متد `slice()` استفاده کنید. متد `slice()` به شما این امکان را می‌دهد که یک "slice (برش)" از آرایه را ببرید. برای insert کردن یک آیتم، شما آرایه ای ایجاد خواهید کرد که برش _قبل_ از نقطه insert کردن را spread می‌کند، سپس آیتم جدید را جایگذاری می‌کند و سپس باقی آرایه اصلی را قرار می‌دهد.

در این مثال، دکمه Insert همیشه در موقعیت `1` insert می‌کند:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye'},
  { id: 2, name: 'Louise Nevelson'},
];

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleClick}>
        Insert
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```

```css
button { margin-left: 5px; }
```

</Sandpack>

### اعمال تغییرات دیگر بر یک آرایه {/*making-other-changes-to-an-array*/}

برخی اعمال تنها با استفاده از سینتکس spread و متد‌های non-mutating مانند `map()` و `filter()` قابل انجام نیستند. برای مثال، ممکن است بخواهید که یک آرایه را معکوس کرده یا مرتب سازی کنید. متد‌های `reverse()` و `sort()` در جاوا اسکریپت آرایه اصلی را mutate می‌کنند، پس شما نمی‌توانید از آنها به طور مستقیم استفاده کنید.

**با این حال، شما می‌توانید ابتدا آرایه را کپی کرده، و سپس تغییرات را بر آن اعمال کنید.**

برای مثال:

<Sandpack>

```js
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' },
];

export default function List() {
  const [list, setList] = useState(initialList);

  function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <>
      <button onClick={handleClick}>
        Reverse
      </button>
      <ul>
        {list.map(artwork => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  );
}
```

</Sandpack>

در اینجا، شما ابتدا از سینتکس`[...list]` spread برای ایجاد یک کپی از آرایه اصلی استفاده می‌کنید. حال که یک کپی از آن دارید، می‌توانید از متد‌های mutating مانند `nextList.reverse()` یا `nextList.sort()` استفاده کنید، یا حتی آیتم‌ها را به شکل `nextList[0] = "something"` به طور مجزا مقدار دهی کنید.

با این حال، **حتی اگر آرایه را کپی کنید، نمی‌توانید آیتم‌های موجود در _داخل_ آن را به طور مستقیم mutate کنید.** این امر به خاطر آن است که عملیات کپی به طور سطحی انجام می‌شود--آرایه جدید همان آیتم‌هایی را شامل خواهد شد که در آرایه اصلی بودند. بنابراین، اگر شما یک object داخل آرایه کپی شده را تغییر دهید، در‌واقع دارید یک state موجود را mutate می‌کنید. برای مثال، چنین کدی مشکل دارد.

```js
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

گرچه `nextList` و `list` دو آرایه متفاوت هستند، **`nextList[0]` و `list[0]` به یک آبجکت اشاره می‌کنند.** بنابراین با تغییر دادن `nextList[0].seen`، شما دارید `list[0].seen` را نیز تغییر می‌دهید. این کار یک mutate کردن state است، که باید از انجام آن خودداری کنید! شما می‌توانید این مشکل را به طرز مشابهی با [بروزرسانی object های جاوا اسکریپت تو‌در‌تو](/learn/updating-objects-in-state#updating-a-nested-object) رفع کنید--بجای mutate کردن، آیتم‌هایی را که می‌خواهید تغییر دهید کپی کنید. چگونگی این کار را در بخش بعدی مشاهده می‌کنید.

## به روز رسانی object های داخل آرایه‌ها {/*updating-objects-inside-arrays*/}

Object ها _واقعا_ در "داخل" آرایه‌ها قرار ندارند. ممکن است که در کد به نظر برسد که "داخل" آنها هستند، اما هر object داخل آرایه خود یک مقدار مستقل است، که آرایه به آن "اشاره می‌کند". به این خاطر است که باید هنگام تغییر field های تو‌در‌تو مانند `list[0]` مراقب باشید. ممکن است آرایه artwork شخص دیگری به  همان آیتم آرایه اشاره کند!

**هنگام به روز رسانی state های تو‌در‌تو، باید از نقطه ای که می‌خواهید در آن تغییر ایجاد کنید تا بالاترین سطح کپی‌هایی ایجاد کنید.** بیاید ببینیم که این عمل چگونه اتفاق می‌افتد.

در این مثال، دو لیست artwork مجزا مقدار state اولیه یکسانی دارند. آنها باید از هم جدا باشند، اما بخاطر یک mutation، به طور اتفاقی state آنها یکسان شده است، و تیک زدن باکس در یک لیست بر لیست دیگر نیز تاثیر می‌گذارد.

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList];
    const artwork = yourNextList.find(
      a => a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

مشکل در کد مشابه زیر است:

```js
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // Problem: mutates an existing item
setMyList(myNextList);
```

علی‌رغم این که خود آرایه `myNextList` جدید است، *آیتم‌ها* همان آیتم‌های در آرایه اصلی `myList` هستند. بنابراین، تغییر دادن `artwork.seen` آیتم artwork *اصلی* را تغییر می‌دهد. این آیتم artwork در لیست `yourList` نیز وجود دارد، که باعث بروز باگ می‌شود. در نظر گرفتن چنین باگ‌هایی می‌تواند دشوار باشد، اما خوشبختانه اگر از mutate کردن state خودداری کنید این باگ‌ها بروز پیدا نمی‌کنند.

**شما می‌توانید با استفاده از `map`یک آیتم قدیمی را بدون mutate کردن با نسخه به روز رسانی شده اش جایگزین کنید.**

```js
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Create a *new* object with changes
    return { ...artwork, seen: nextSeen };
  } else {
    // No changes
    return artwork;
  }
}));
```

در اینجا `...` سینتکس object spread اسفاده شده برای [ساخت کپی از یک آبجکت](/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax) می‌باشد.

با استفاده از این روش، هیچ کدام از state های موجود mutate نمی‌شوند، و باگ برطرف می‌شود:

<Sandpack>

```js
import { useState } from 'react';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork => {
      if (artwork.id === artworkId) {
        // Create a *new* object with changes
        return { ...artwork, seen: nextSeen };
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

به طور کلی، **شما باید تنها object هایی را mutate کنید که تازه ایجاد شده اند.** اگر بخواهید یک artwork *جدید* را insert کنید، می‌توانید آن را mutate کنید، اما اگر با object ای که از قبل در state وجود داشته کار می‌کنید، باید ابتدا از آن یک کپی ایجاد کنید.

### به کمک Immer منطق به روز رسانی را به شکل مختصر بنویسید {/*write-concise-update-logic-with-immer*/}

به روز رسانی آرایه‌های تو‌در‌تو بدون mutation می‌تواند کمی تکراری شود. [درست مانند object ها](/learn/updating-objects-in-state#write-concise-update-logic-with-immer):

- به طور کلی، احتمالا شما به به روز رسانی state با عمق بیشتر از چند لایه نیاز پیدا نمی‌کنید. اگر object های state شما عمق بسیار زیادی دارند، توصیه می‌شود که [ساختار آنها را به طوری تغییر دهید](/learn/choosing-the-state-structure#avoid-deeply-nested-state) که هموار شوند.
- اگر نمی‌خواهید که ساختار state خود را تغییر دهید، می‌توانید از [Immer](https://github.com/immerjs/use-immer) استفاده کنید، که به شما امکان نوشتن به سینتکس mutate کننده و رایج را می‌دهد و خود در پشت صحنه ایجاد کپی را ترتیب می‌دهد.

در اینجا مثال لیست Art Bucket با Immer بازنویسی شده است:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

دقت کنید که با استفاده از Immer، چگونه **عملیات `artwork.seen = nextSeen` که مشابه mutation است درست کار می‌کند:**

```js
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

دلیل این امر آن است که شما state _اصلی_ را mutate نمی‌کنید، بلکه یک `draft` یا پیش‌نویس مخصوص که توسط Immer ایحاد شده را mutate می‌کنید. به طور مشابه، می‌توانید متد‌های mutate کننده مانند `push()` و `pop()` را بر محتوای `draft` اعمال کنید.

در پشت صحنه، Immer همیشه state آینده را از از اول و با توجه به تغییراتی که بر `draft` اعمال کرده اید می‌سازد. این امر event handler های شما را بسیار مختصر و بدون هیچ mutate کردنی نگه می‌دارد.

<Recap>

- شما می‌توانید آرایه‌ها را درون state قرار دهید، اما نمی‌توانید بر آنها تغییری اعمال کنید.
- بجای mutate کردن یک آرایه، یک نسخه *جدید* از آن ایجاد کنید، و state را به آن به روز رسانی کنید.
- شما می‌توانید از سینتکس `[...arr, newItem]` array spread برای ایجاد آرایه با آیتم‌های جدید استفاده کنید.
- شما می‌توانید از `filter()` و `map()` برای ایجاد آرایه‌های جدید با آیتم‌های فیلتر شده و تغییر یافته استفاده کنید.
- شما می‌توانید از Immer برای مختصر نگاه داشتن کد خود استفاده کنید.

</Recap>



<Challenges>

#### به روز رسانی یک آیتم در سبد خرید {/*update-an-item-in-the-shopping-cart*/}

منطق `handleIncreaseClick` را به طوری کامل کنید که فشردن "+" عدد مربوطه را افزایش دهد:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

شما می‌توانید از تابع `map` برای ایجاد یک آرایه جدید استفاده کنید، و سپس از سینتکس `...` object spread استفاده کنید تا از object یک کپی جدید ایجاد کرده و در آرایه جدید از آن استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### حذف یک آیتم از سبد خرید {/*remove-an-item-from-the-shopping-cart*/}

این سبد خرید یک دکمه "+" قابل استفاده دارد، اما دکمه "–" آن کار نمی‌کند. شما باید یک event handler به آن اضافه کنید به طوری که فشردن آن مقدار `count` کالای مربوطه را کاهش دهد. اگر هنگامی که مقدار count عدد 1 است دکمه "–" را فشار دهید، کالا باید به طور خودکار از سبد حذف شود. مطمئن شوید که هیچ گاه 0 نمایش داده نمی‌شود.

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

<Solution>

شما می‌توانید ابتدا از `map` برای ایجاد یک آرایه جدید استفاده کرده، و سپس از `filter` جهت حذف کردن کالا‌هایی که مقدار `count` آنها برابر با `0` است استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';

const initialProducts = [{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}];

export default function ShoppingCart() {
  const [
    products,
    setProducts
  ] = useState(initialProducts)

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }))
  }

  function handleDecreaseClick(productId) {
    let nextProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count - 1
        };
      } else {
        return product;
      }
    });
    nextProducts = nextProducts.filter(p =>
      p.count > 0
    );
    setProducts(nextProducts)
  }

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name}
          {' '}
          (<b>{product.count}</b>)
          <button onClick={() => {
            handleIncreaseClick(product.id);
          }}>
            +
          </button>
          <button onClick={() => {
            handleDecreaseClick(product.id);
          }}>
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
```

</Sandpack>

</Solution>

#### اصلاح mutation ها با استفاده از متد‌های non-mutative {/*fix-the-mutations-using-non-mutative-methods*/}

در این مثال، تمامی event handlers های داخل `App.js` از mutation استفاده می‌کنند. در نتیجه، ویرایش و حذف کردن todos به طور صحیح کار نمی‌کند. توابع `handleAddTodo`، `handleChangeTodo`، و `handleDeleteTodo` را بازنویسی کنید تا از متد‌های non-mutative استفاده کنند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution>

در تابع `handleAddTodo`، می‌توانید از سینتکس array spread استفاده کنید. در تابع `handleChangeTodo`، می‌توانید با استفاده از `map` یک آرایه جدید ایجاد کنید. در تابع `handleDeleteTodo`، می‌توانید با استفاده از `filter` یک آرایه جدید ایجاد کنید. حال لیست به طور صحیح کار می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        title: title,
        done: false
      }
    ]);
  }

  function handleChangeTodo(nextTodo) {
    setTodos(todos.map(t => {
      if (t.id === nextTodo.id) {
        return nextTodo;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    setTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

</Solution>


#### اصلاح mutation ها با استفاده از Immer {/*fix-the-mutations-using-immer*/}

این مثال مشابه چالش قبلی است. این بار، mutation ها را با استفاده از Immer اصلاح کنید. برای راحتی شما، `useImmer` از قبل import شده است، پس باید متغیر state `todos` را تغییر دهید تا از آن استفاده کنید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title) {
    todos.push({
      id: nextId++,
      title: title,
      done: false
    });
  }

  function handleChangeTodo(nextTodo) {
    const todo = todos.find(t =>
      t.id === nextTodo.id
    );
    todo.title = nextTodo.title;
    todo.done = nextTodo.done;
  }

  function handleDeleteTodo(todoId) {
    const index = todos.findIndex(t =>
      t.id === todoId
    );
    todos.splice(index, 1);
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution>

با استفاده از Immer، می‌توانید کد را به شکل mutative بنویسید، به شرطی که تنها قسمت‌هایی از `draft` که Immer در اختیارتان می‌گذارد را mutate کنید. در اینجا، تمامی mutation ها بر روی `draft` اعمال شده اند، بنابراین کد به درستی کار می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(draft => {
      const todo = draft.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    });
  }

  function handleDeleteTodo(todoId) {
    updateTodos(draft => {
      const index = draft.findIndex(t =>
        t.id === todoId
      );
      draft.splice(index, 1);
    });
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

شما همچنین می‌توانید روش‌های mutative و non-mutative را با Immer ترکیب کنید.

برای مثال، در این نسخه تابع `handleAddTodo` با mutate کردن `draft` Immer پیاده سازی شده است، در حالی که توابع `handleChangeTodo` و `handleDeleteTodo` از متد‌های non-mutative `map` و `filter` استفاده می‌کنند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo.js';
import TaskList from './TaskList.js';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos(draft => {
      draft.push({
        id: nextId++,
        title: title,
        done: false
      });
    });
  }

  function handleChangeTodo(nextTodo) {
    updateTodos(todos.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      } else {
        return todo;
      }
    }));
  }

  function handleDeleteTodo(todoId) {
    updateTodos(
      todos.filter(t => t.id !== todoId)
    );
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
```

```js src/AddTodo.js
import { useState } from 'react';

export default function AddTodo({ onAddTodo }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddTodo(title);
      }}>Add</button>
    </>
  )
}
```

```js src/TaskList.js
import { useState } from 'react';

export default function TaskList({
  todos,
  onChangeTodo,
  onDeleteTodo
}) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <Task
            todo={todo}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.title}
          onChange={e => {
            onChange({
              ...todo,
              title: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.title}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={e => {
          onChange({
            ...todo,
            done: e.target.checked
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </label>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

With Immer, you can pick the style that feels the most natural for each separate case.

</Solution>

</Challenges>
