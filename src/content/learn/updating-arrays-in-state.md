---
title: به روز رسانی آرایه‌ها در State
---

<Intro>

آرایه‌ها در جاوااسکریپت mutable (قابل تغییر مستقیم) هستند، اما توصیه می‌شود هنگامی که آن‌ها را در state ذخیره می‌کنید، با آن‌ها به شکل غیرقابل تغییر برخورد کنید. درست مانند object‌ها، هنگامی که می‌خواهید یک آرایه را در state ذخیره کنید، لازم است که یک آرایه جدید بسازید (یا یک آرایه موجود را کپی کنید)، و سپس state را به آرایه جدید تنظیم کنید تا از آن استفاده شود.

</Intro>

<YouWillLearn>

- چگونه با state ری‌اکت به آرایه آیتم اضافه کرده، آیتم‌های موجود را حذف کرده یا تغییر دهیم
- چگونه یک object داخل یک آرایه را به روز رسانی کنیم
- چگونه به کمک Immer هنگام کپی کردن آرایه از تکرار زیاد جلوگیری کنیم

</YouWillLearn>

## به روز رسانی آرایه‌ها {/*updating-arrays-without-mutation*/}

در جاوااسکریپت، آرایه‌ها نوعی object هستند. [مانند object‌ها](/learn/updating-objects-in-state)، **باید با آرایه‌ها در state به‌صورت فقط‌خواندنی رفتار کنید.** این یعنی نباید آیتم‌های یک آرایه را با `arr[0] = 'bird'` دوباره مقداردهی کنید، و همچنین نباید از متدهایی که آرایه را تغییر می‌دهند، مانند `push()` و `pop()`، استفاده کنید.

در عوض، هر بار که می‌خواهید یک آرایه را به‌روزرسانی کنید، باید یک آرایه *جدید* را به تابع تنظیم state خود بدهید. برای این کار می‌توانید با فراخوانی متدهای بدون تغییر (non-mutating) مانند `filter()` و `map()` یک آرایه جدید از آرایه اصلی بسازید. سپس می‌توانید state را به آرایه جدید تنظیم کنید.

در اینجا یک جدول مرجع از عملیات‌های رایج بر روی آرایه‌ها را مشاهده می‌کنید. در هنگام کار کردن با آرایه‌ها در state ری‌اکت، باید از استفاده از متد‌های ستون سمت راست خودداری کرده، و در عوض از متد‌های ستون سمت چپ استفاده کنید:

|           | خودداری شود (آرایه را تغییر می‌دهد)           | ترجیح داده شود (آرایه جدید ایجاد می‌کند)                                        |
| --------- | ----------------------------------- | ------------------------------------------------------------------- |
| اضافه کردن    | `push`, `unshift`                   | `concat`, `[...arr]` spread syntax ([مثال](#adding-to-an-array)) |
| حذف کردن  | `pop`, `shift`, `splice`            | `filter`, `slice` ([example](#removing-from-an-array))              |
| جایگزین کردن | `splice`, `arr[i] = ...` assignment | `map` ([example](#replacing-items-in-an-array))                     |
| مرتب سازی   | `reverse`, `sort`                   | ابتدا از آرایه کپی بگیرید ([example](#making-other-changes-to-an-array)) |

به‌عنوان جایگزین می‌توانید [از Immer استفاده کنید](#write-concise-update-logic-with-immer) که امکان استفاده از متدهای هر دو ستون را فراهم می‌کند.

<Pitfall>

متاسفانه، [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) و [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) با وجود نام‌گذاری مشابه تفاوت زیادی با یکدیگر دارند:

* `slice` به شما امکان می‌دهد یک آرایه یا بخشی از آن را کپی کنید.
* `splice` آرایه را **تغییر می‌دهد** (برای افزودن یا حذف آیتم‌ها).

در ری‌اکت، شما از `slice`  (بدون حرف `p`!) بسیار بیشتر استفاده می‌کنید چرا که شما نمی‌خواهید object ها یا آرایه‌های در state را mutate کنید. [به روز رسانی object ها](/learn/updating-objects-in-state) توضیح می‌دهد که mutation چیست و چرا برای state توصیه نمی‌شود.

</Pitfall>

### افزودن به آرایه {/*adding-to-an-array*/}

متد `push()` آرایه را تغییر می‌دهد، که مطلوب نیست:

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

در عوض، باید یک آرایه *جدید* ایجاد کنید که شامل آیتم‌های فعلی *و* یک آیتم جدید در انتها باشد. برای انجام این کار، چندین راه وجود دارد، اما آسان‌ترین راه این است که از سینتکس `...` [array spread (پخش آرایه)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) استفاده کنید:

```js
setArtists( // Replace the state
  [ // with a new array
    ...artists, // that contains all the old items
    { id: nextId++, name: name } // and one new item at the end
  ]
);
```

حالا کد به‌درستی کار می‌کند:

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

همچنین، عملگر spread آرایه این امکان را به شما می‌دهد که با قرار دادن آیتم پیش از `...artists`، آن را به ابتدای آرایه اضافه کنید:

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

در اینجا، `artists.filter(a => a.id !== artist.id)` به این معنی است که "یک آرایه ایجاد کن که شامل `artists`ای باشد که ID آن‌ها با `artist.id` متفاوت است". به بیان دیگر، دکمه "Delete" هر artist _همان_ artist را از آرایه فیلتر می‌کند و سپس درخواست یک رندر مجدد با آرایه حاصل می‌دهد. توجه کنید که `filter` آرایه اصلی را تغییر نمی‌دهد.

### تغییر دادن آرایه {/*transforming-an-array*/}

اگر می‌خواهید تعدادی از آیتم‌ها یا تمامی آیتم‌های آرایه را تغییر دهید، می‌توانید از `map()` برای ایجاد یک آرایه **جدید** استفاده کنید. تابعی که به `map` می‌دهید می‌تواند بر اساس داده یا اندیس هر آیتم (یا هر دو) تصمیم بگیرد که چه کند.

در این مثال، یک آرایه مختصات دو دایره و یک مربع را نگه می‌دارد. هنگامی که دکمه را فشار می‌دهید، فقط دایره‌ها را به اندازهٔ 50 پیکسل به پایین حرکت می‌دهد. این کار با ایجاد یک آرایهٔ جدید از داده‌ها توسط `map()` انجام می‌شود:

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

این که بخواهیم یک یا چند آیتم را در آرایه جایگزین کنیم، امری رایج است. مقداردهی‌هایی مانند `arr[0] = 'bird'` آرایه اصلی را تغییر می‌دهند، پس در عوض باید برای این کار نیز از `map` استفاده کنید.

برای جایگزین کردن یک آیتم، با استفاده از `map` یک آرایهٔ جدید ایجاد کنید. در فراخوانی `map`، اندیس آیتم (آرگومان دوم) را دریافت می‌کنید. از این اندیس استفاده کنید تا مشخص کنید آیتم اصلی (آرگومان اول) را بازگردانید یا مقدار دیگری را.

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

### الحاق در یک آرایه {/*inserting-into-an-array*/}

گاهی اوقات ممکن است بخواهید یک آیتم را در موقعیتی خاص که نه در ابتدا و نه در انتهای آرایه است، الحاق کنید. برای انجام این کار، می‌توانید از سینتکس گسترش آرایه `...` همراه با متد `slice()` استفاده کنید. متد `slice()` به شما این امکان را می‌دهد که یک "slice (برش)" از آرایه جدا کنید. برای الحاق یک آیتم، آرایه‌ای می‌سازید که ابتدا برش _قبل_ از نقطهٔ الحاق را گسترش می‌دهد، سپس آیتم جدید را قرار می‌دهد و در نهایت باقی آرایه اصلی را اضافه می‌کند.

در این مثال، دکمهٔ الحاق همیشه آیتم را در اندیس `1` الحاق می‌کند:

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

برخی اعمال تنها با استفاده از سینتکس spread و متدهای non-mutating مانند `map()` و `filter()` قابل انجام نیستند. برای مثال، ممکن است بخواهید یک آرایه را معکوس یا مرتب کنید. متدهای `reverse()` و `sort()` در جاوااسکریپت آرایه اصلی را تغییر می‌دهند، بنابراین نمی‌توانید مستقیماً از آن‌ها استفاده کنید.

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

با این حال، **حتی اگر آرایه را کپی کنید، نمی‌توانید آیتم‌های موجود در _داخل_ آن را به طور مستقیم تغییر دهید.** این به این دلیل است که کپی به‌صورت سطحی انجام می‌شود--آرایهٔ جدید همان آیتم‌های آرایهٔ اصلی را در بر خواهد داشت. بنابراین، اگر یک object داخل آرایه کپی‌شده را تغییر دهید، در واقع در حال تغییر state موجود هستید. برای مثال، چنین کدی مشکل ایجاد می‌کند.

```js
const nextList = [...list];
nextList[0].seen = true; // Problem: mutates list[0]
setList(nextList);
```

گرچه `nextList` و `list` دو آرایهٔ متفاوت هستند، **`nextList[0]` و `list[0]` به یک object اشاره می‌کنند.** بنابراین با تغییر دادن `nextList[0].seen`، در واقع `list[0].seen` را هم تغییر می‌دهید. این یک تغییر state است و باید از آن اجتناب کنید! می‌توانید این مشکل را مشابه [به‌روزرسانی object های تو‌در‌تو در جاوااسکریپت](/learn/updating-objects-in-state#updating-a-nested-object)--به‌جای تغییر مستقیم، آیتم‌هایی را که می‌خواهید تغییر دهید کپی کنید. در ادامه روش این کار را می‌بینید.

## به‌روزرسانی object‌های داخل آرایه‌ها {/*updating-objects-inside-arrays*/}

objectها _واقعا_ در "داخل" آرایه‌ها قرار ندارند. ممکن است در کد چنین به نظر برسد، اما هر object داخل آرایه یک مقدار مستقل است که آرایه به آن "اشاره" می‌کند. به همین دلیل هنگام تغییر فیلدهای تو‌در‌تو مانند `list[0]` باید مراقب باشید؛ ممکن است آرایهٔ artwork شخص دیگری به همان آیتم اشاره کند!

**هنگام به‌روزرسانی state‌های تو‌در‌تو، باید از همان نقطه‌ای که می‌خواهید تغییر دهید تا بالاترین سطح، کپی‌هایی ایجاد کنید.** بیایید ببینیم این کار چگونه انجام می‌شود.

در این مثال، دو لیست artwork جداگانه state اولیه یکسانی دارند. آن‌ها باید از هم مستقل باشند، اما به دلیل یک تغییر، state آن‌ها به‌طور تصادفی مشترک شده است، و انتخاب یک چک‌باکس در یک لیست بر لیست دیگر نیز تأثیر می‌گذارد:

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

در اینجا `...` سینتکس object spread است که برای [ایجاد یک کپی از یک object](/learn/updating-objects-in-state#copying-objects-with-the-spread-syntax) استفاده می‌شود.

با استفاده از این روش، هیچ‌یک از state‌های موجود تغییر داده نمی‌شوند و باگ برطرف می‌شود:

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

به‌طور کلی، **باید فقط objectهایی را تغییر دهید که تازه ایجاد شده‌اند.** اگر بخواهید یک artwork *جدید* را الحاق کنید، می‌توانید آن را تغییر دهید؛ اما اگر با objectی سروکار دارید که از قبل در state وجود دارد، باید ابتدا از آن یک کپی بسازید.

### به کمک Immer منطق به‌روزرسانی را به شکل مختصر بنویسید {/*write-concise-update-logic-with-immer*/}

به‌روزرسانی آرایه‌های تو‌در‌تو بدون تغییر می‌تواند کمی تکراری شود. [درست مانند objectها](/learn/updating-objects-in-state#write-concise-update-logic-with-immer):

- به‌طور کلی، معمولاً نیازی به به‌روزرسانی state در عمقی بیش از چند لایه ندارید. اگر objectهای state شما بسیار عمیق هستند، بهتر است [ساختارشان را به گونه‌ای تغییر دهید](/learn/choosing-the-state-structure#avoid-deeply-nested-state) که مسطح شوند.
- اگر نمی‌خواهید ساختار state خود را تغییر دهید، می‌توانید از [Immer](https://github.com/immerjs/use-immer) استفاده کنید؛ این کتابخانه به شما اجازه می‌دهد با سینتکس رایج اما تغییر‌دهنده کد بنویسید و در پس‌زمینه نسخه‌های کپی را برایتان ایجاد می‌کند.

در اینجا مثال Art Bucket List با Immer بازنویسی شده است:

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

دقت کنید که با استفاده از Immer، **عملیاتی مانند `artwork.seen = nextSeen` که یک تغییر (mutation) به حساب می‌آید، اکنون بدون مشکل است:**

```js
updateMyTodos(draft => {
  const artwork = draft.find(a => a.id === artworkId);
  artwork.seen = nextSeen;
});
```

دلیل این امر آن است که شما state _اصلی_ را تغییر نمی‌دهید، بلکه یک `draft` (پیش‌نویس) ویژه که توسط Immer ایجاد شده است را تغییر می‌دهید. به همین ترتیب، می‌توانید متدهای تغییر‌دهنده‌ای مانند `push()` و `pop()` را روی محتوای `draft` اعمال کنید.

در پشت صحنه، Immer همیشه state بعدی را با توجه به تغییراتی که روی `draft` اعمال کرده‌اید از ابتدا می‌سازد. این کار event&nbsp;handlerهای شما را بسیار مختصر نگه می‌دارد، بدون آن‌که state را تغییر دهید.

<Recap>

- شما می‌توانید آرایه‌ها را درون state قرار دهید، اما نمی‌توانید آن‌ها را تغییر دهید.  
- به‌جای تغییر یک آرایه، یک نسخهٔ *جدید* از آن ایجاد کنید و state را به آن به‌روزرسانی کنید.  
- می‌توانید از سینتکس spread آرایه `[...arr, newItem]` برای ایجاد آرایه‌ای با آیتم‌های جدید استفاده کنید.  
- می‌توانید از `filter()` و `map()` برای ایجاد آرایه‌های جدید با آیتم‌های فیلترشده یا تغییر‌یافته استفاده کنید.  
- می‌توانید از Immer برای مختصر نگه‌داشتن کد خود استفاده کنید.

</Recap>



<Challenges>

#### به‌روزرسانی یک آیتم در سبد خرید {/*update-an-item-in-the-shopping-cart*/}

منطق `handleIncreaseClick` را طوری تکمیل کنید که با فشردن "+" عدد مربوطه افزایش یابد::

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

می‌توانید با استفاده از تابع `map` یک آرایهٔ جدید ایجاد کنید و سپس از سینتکس object spread `...` برای ایجاد یک کپی از object تغییر‌یافته جهت آرایهٔ جدید بهره بگیرید:

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

این سبد خرید یک دکمه "+" قابل استفاده دارد، اما دکمه "–" آن کار نمی‌کند. باید یک event handler به آن اضافه کنید تا با فشردن آن، مقدار `count` کالای مربوطه کاهش یابد. اگر زمانی که این مقدار برابر 1 باشد دکمه "–" را فشار دهید، کالا باید به‌طور خودکار از سبد حذف شود. مطمئن شوید که هیچ‌گاه 0 نمایش داده نمی‌شود.

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

می‌توانید ابتدا از `map` برای ایجاد یک آرایهٔ جدید استفاده کنید، و سپس با `filter` کالاهایی را حذف کنید که مقدار `count` آن‌ها برابر با `0` است:

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

#### اصلاح تغییرها با استفاده از متدهای غیرتغییردهنده {/*fix-the-mutations-using-non-mutative-methods*/}

در این مثال، همهٔ event handlerها در `App.js` از تغییر (mutation) استفاده می‌کنند. در نتیجه، ویرایش و حذف todoها به‌درستی کار نمی‌کند. توابع `handleAddTodo`، `handleChangeTodo` و `handleDeleteTodo` را بازنویسی کنید تا از متدهای غیرتغییردهنده استفاده کنند:

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

در تابع `handleAddTodo` می‌توانید از سینتکس spread آرایه استفاده کنید. در تابع `handleChangeTodo` نیز با استفاده از `map` یک آرایهٔ جدید ایجاد کنید. در تابع `handleDeleteTodo` می‌توانید با بهره‌گیری از `filter` یک آرایهٔ جدید بسازید. اکنون لیست به‌درستی کار می‌کند:

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


#### اصلاح تغییرها با استفاده از Immer {/*fix-the-mutations-using-immer*/}

این مثال مشابه چالش قبلی است. این بار، تغییرها را با استفاده از Immer اصلاح کنید. برای راحتی شما، `useImmer` از قبل import شده است، پس باید متغیر state `todos` را تغییر دهید تا از آن استفاده کنید.

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

با استفاده از Immer، می‌توانید کد را به‌صورت تغییرپذیر بنویسید، به شرط آن‌که تنها بخش‌هایی از `draft` را تغییر دهید که Immer در اختیارتان می‌گذارد. در اینجا تمام تغییرها روی `draft` انجام شده‌اند؛ بنابراین کد به‌درستی کار می‌کند:

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

شما همچنین می‌توانید روش‌های تغییرپذیر و غیرتغییردهنده را با Immer ترکیب کنید.

برای مثال، در این نسخه، تابع `handleAddTodo` با تغییر دادن `draft`ِ Immer پیاده‌سازی شده است، در حالی‌که توابع `handleChangeTodo` و `handleDeleteTodo` از متدهای غیرتغییردهندهٔ `map` و `filter` استفاده می‌کنند:

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
