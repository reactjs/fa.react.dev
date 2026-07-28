---
title: useDeferredValue
---

<Intro>

`useDeferredValue` یک هوک ری‌اکت است که به شما اجازه می‌دهد به‌روزرسانی بخشی از UI را به تأخیر بیندازید.

```js
const deferredValue = useDeferredValue(value)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useDeferredValue(value, initialValue?)` {/*usedeferredvalue*/}

برای دریافت نسخهٔ به‌تأخیرافتادهٔ یک مقدار، `useDeferredValue` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `value`: مقداری که می‌خواهید به تأخیر بیندازید. می‌تواند هر نوعی داشته باشد.
* **اختیاری** `initialValue`: مقداری که در طول رندر اولیهٔ کامپوننت استفاده می‌شود. اگر این گزینه حذف شود، `useDeferredValue` در رندر اولیه به تأخیر نمی‌افتد، زیرا نسخهٔ قبلی از `value` وجود ندارد که به جای آن رندر شود.


#### مقدار بازگشتی {/*returns*/}

- `currentValue`: در طول رندر اولیه، مقدار به‌تأخیرافتاده برگردانده‌شده `initialValue` خواهد بود، یا همان مقداری که ارائه کرده‌اید. در طول به‌روزرسانی‌ها، ری‌اکت ابتدا یک رندر مجدد با مقدار قدیمی را امتحان می‌کند (بنابراین مقدار قدیمی را برمی‌گرداند)، و سپس یک رندر مجدد دیگر را در پس‌زمینه با مقدار جدید امتحان می‌کند (بنابراین مقدار به‌روزرسانی‌شده را برمی‌گرداند).

#### نکات {/*caveats*/}

- وقتی یک به‌روزرسانی درون یک ترنزیشن است، `useDeferredValue` همیشه `value` جدید را برمی‌گرداند و یک رندر به‌تأخیرافتاده ایجاد نمی‌کند، زیرا به‌روزرسانی از قبل به تأخیر افتاده است.

- مقادیری که به `useDeferredValue` ارسال می‌کنید باید یا مقادیر اولیه (مانند رشته‌ها و اعداد) یا اشیاء‌ای باشند که بیرون از رندر ایجاد شده‌اند. اگر یک شیء جدید در حین رندر ایجاد کنید و بلافاصله آن را به `useDeferredValue` ارسال کنید، در هر رندر متفاوت خواهد بود و باعث رندرهای مجدد غیرضروری در پس‌زمینه می‌شود.

- وقتی `useDeferredValue` مقدار متفاوتی دریافت می‌کند (مقایسه با [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is))، علاوه بر رندر کنونی (که در آن همچنان از مقدار قبلی استفاده می‌کند)، یک رندر مجدد در پس‌زمینه با مقدار جدید را زمان‌بندی می‌کند. رندر مجدد پس‌زمینه قابل قطع است: اگر به‌روزرسانی دیگری برای `value` وجود داشته باشد، ری‌اکت رندر مجدد پس‌زمینه را از ابتدا ری‌استارت می‌کند. مثلاً اگر کاربر سریع‌تر از اینکه نموداری که مقدار به‌تأخیرافتاده را دریافت می‌کند بتواند رندر مجدد کند، در ورودی تایپ کند، نمودار فقط بعد از اینکه کاربر تایپ را متوقف کرد، رندر مجدد می‌شود.

- `useDeferredValue` با [`<Suspense>`](/reference/react/Suspense) یکپارچه است. اگر به‌روزرسانی پس‌زمینه ناشی از یک مقدار جدید، UI را suspend کند، کاربر fallback را نمی‌بیند. آن‌ها مقدار به‌تأخیرافتادهٔ قدیمی را تا زمان بارگذاری داده‌ها می‌بینند.

- `useDeferredValue` به‌خودی‌خود از درخواست‌های شبکهٔ اضافی جلوگیری نمی‌کند.

- هیچ تأخیر ثابتی ناشی از خود `useDeferredValue` وجود ندارد. به‌محض اینکه ری‌اکت رندر مجدد اصلی را تمام کند، ری‌اکت بلافاصله شروع به کار روی رندر مجدد پس‌زمینه با مقدار جدید به‌تأخیرافتاده می‌کند. هر به‌روزرسانی ناشی از رویدادها (مانند تایپ) رندر مجدد پس‌زمینه را قطع می‌کند و روی آن اولویت پیدا می‌کند.

- رندر مجدد پس‌زمینه ناشی از `useDeferredValue` تا زمانی که روی صفحه commit نشود، افکت‌ها را فعال نمی‌کند. اگر رندر مجدد پس‌زمینه suspend شود، افکت‌های آن بعد از بارگذاری داده‌ها و به‌روزرسانی UI اجرا می‌شوند.

---

## کاربرد {/*usage*/}

### نمایش محتوای قدیمی در حین بارگذاری محتوای تازه {/*showing-stale-content-while-fresh-content-is-loading*/}

برای به تأخیر انداختن به‌روزرسانی بخشی از UI خود، `useDeferredValue` را در سطح بالای کامپوننت خود فراخوانی کنید.

```js [[1, 5, "query"], [2, 5, "deferredQuery"]]
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

در طول رندر اولیه، <CodeStep step={2}>مقدار به‌تأخیرافتاده</CodeStep> با <CodeStep step={1}>مقدار</CodeStep>‌ای که ارائه کرده‌اید یکسان خواهد بود.

در طول به‌روزرسانی‌ها، <CodeStep step={2}>مقدار به‌تأخیرافتاده</CodeStep> از آخرین <CodeStep step={1}>مقدار</CodeStep> «عقب می‌ماند». به‌طور خاص، ری‌اکت ابتدا بدون به‌روزرسانی مقدار به‌تأخیرافتاده رندر مجدد می‌کند، و سپس سعی می‌کند با مقدار جدید دریافت‌شده در پس‌زمینه رندر مجدد کند.

**بیایید یک مثال را مرور کنیم تا ببینیم چه زمانی این مفید است.**

<Note>

این مثال فرض می‌کند که از یک منبع دادهٔ فعال‌شده با ساسپنس استفاده می‌کنید:

- دریافت داده با فریم‌ورک‌های فعال‌شده با ساسپنس مانند [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) و [Next.js](https://nextjs.org/docs/app/getting-started/fetching-data#with-suspense)
- بارگذاری تنبل کد کامپوننت با [`lazy`](/reference/react/lazy)
- خواندن مقدار یک Promise با [`use`](/reference/react/use)

[دربارهٔ ساسپنس و محدودیت‌های آن بیشتر بدانید.](/reference/react/Suspense)

</Note>


در این مثال، کامپوننت `SearchResults` هنگام دریافت نتایج جستجو [suspend می‌شود](/reference/react/Suspense#displaying-a-fallback-while-content-is-loading). `"a"` را تایپ کنید، منتظر بمانید تا نتایج بارگذاری شوند، و سپس آن را به `"ab"` ویرایش کنید. نتایج `"a"` با fallback بارگذاری جایگزین می‌شوند.

<Sandpack>

```js src/App.js
import { Suspense, useState } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
```

```js src/SearchResults.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function SearchResults({ query }) {
  if (query === '') {
    return null;
  }
  const albums = use(fetchData(`/search?q=${query}`));
  if (albums.length === 0) {
    return <p>No matches for <i>"{query}"</i></p>;
  }
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/search?q=')) {
    return await getSearchResults(url.slice('/search?q='.length));
  } else {
    throw Error('Not implemented');
  }
}

async function getSearchResults(query) {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  const allAlbums = [{
    id: 13,
    title: 'Let It Be',
    year: 1970
  }, {
    id: 12,
    title: 'Abbey Road',
    year: 1969
  }, {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969
  }, {
    id: 10,
    title: 'The Beatles',
    year: 1968
  }, {
    id: 9,
    title: 'Magical Mystery Tour',
    year: 1967
  }, {
    id: 8,
    title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
    year: 1967
  }, {
    id: 7,
    title: 'Revolver',
    year: 1966
  }, {
    id: 6,
    title: 'Rubber Soul',
    year: 1965
  }, {
    id: 5,
    title: 'Help!',
    year: 1965
  }, {
    id: 4,
    title: 'Beatles For Sale',
    year: 1964
  }, {
    id: 3,
    title: 'A Hard Day\'s Night',
    year: 1964
  }, {
    id: 2,
    title: 'With The Beatles',
    year: 1963
  }, {
    id: 1,
    title: 'Please Please Me',
    year: 1963
  }];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter(album => {
    const lowerTitle = album.title.toLowerCase();
    return (
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.indexOf(' ' + lowerQuery) !== -1
    )
  });
}
```

```css
input { margin: 10px; }
```

</Sandpack>

یک الگوی UI جایگزین رایج، *به تأخیر انداختن* به‌روزرسانی لیست نتایج و نشان دادن نتایج قبلی تا زمان آماده شدن نتایج جدید است. `useDeferredValue` را فراخوانی کنید تا یک نسخهٔ به‌تأخیرافتاده از query را پایین ارسال کنید:

```js {3,11}
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

`query` بلافاصله به‌روز می‌شود، بنابراین ورودی مقدار جدید را نمایش می‌دهد. با این حال، `deferredQuery` تا زمانی که داده‌ها بارگذاری شوند مقدار قبلی خود را حفظ می‌کند، بنابراین `SearchResults` نتایج قدیمی را برای مدتی نشان می‌دهد.

در مثال زیر `"a"` را وارد کنید، منتظر بمانید تا نتایج بارگذاری شوند، و سپس ورودی را به `"ab"` ویرایش کنید. توجه کنید که به جای fallback ساسپنس، اکنون لیست نتایج قدیمی را تا زمان بارگذاری نتایج جدید می‌بینید:

<Sandpack>

```js src/App.js
import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

```js src/SearchResults.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function SearchResults({ query }) {
  if (query === '') {
    return null;
  }
  const albums = use(fetchData(`/search?q=${query}`));
  if (albums.length === 0) {
    return <p>No matches for <i>"{query}"</i></p>;
  }
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/search?q=')) {
    return await getSearchResults(url.slice('/search?q='.length));
  } else {
    throw Error('Not implemented');
  }
}

async function getSearchResults(query) {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  const allAlbums = [{
    id: 13,
    title: 'Let It Be',
    year: 1970
  }, {
    id: 12,
    title: 'Abbey Road',
    year: 1969
  }, {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969
  }, {
    id: 10,
    title: 'The Beatles',
    year: 1968
  }, {
    id: 9,
    title: 'Magical Mystery Tour',
    year: 1967
  }, {
    id: 8,
    title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
    year: 1967
  }, {
    id: 7,
    title: 'Revolver',
    year: 1966
  }, {
    id: 6,
    title: 'Rubber Soul',
    year: 1965
  }, {
    id: 5,
    title: 'Help!',
    year: 1965
  }, {
    id: 4,
    title: 'Beatles For Sale',
    year: 1964
  }, {
    id: 3,
    title: 'A Hard Day\'s Night',
    year: 1964
  }, {
    id: 2,
    title: 'With The Beatles',
    year: 1963
  }, {
    id: 1,
    title: 'Please Please Me',
    year: 1963
  }];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter(album => {
    const lowerTitle = album.title.toLowerCase();
    return (
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.indexOf(' ' + lowerQuery) !== -1
    )
  });
}
```

```css
input { margin: 10px; }
```

</Sandpack>

<DeepDive>

#### به تأخیر انداختن یک مقدار زیرپوستی چگونه کار می‌کند؟ {/*how-does-deferring-a-value-work-under-the-hood*/}

می‌توانید آن را به‌عنوان اتفاق‌افتاده در دو مرحله در نظر بگیرید:

1. **اولاً، ری‌اکت با `query` جدید (`"ab"`) اما با `deferredQuery` قدیمی (هنوز `"a"`) رندر مجدد می‌کند.** مقدار `deferredQuery` که به لیست نتایج ارسال می‌کنید، *به‌تأخیرافتاده* است: از مقدار `query` «عقب می‌ماند».

2. **در پس‌زمینه، ری‌اکت سعی می‌کند با *هر دو* `query` و `deferredQuery` به‌روزرسانی‌شده به `"ab"` رندر مجدد کند.** اگر این رندر مجدد کامل شود، ری‌اکت آن را روی صفحه نمایش می‌دهد. با این حال، اگر suspend شود (نتایج `"ab"` هنوز بارگذاری نشده‌اند)، ری‌اکت این تلاش رندر را رها می‌کند، و این رندر مجدد را بعد از بارگذاری داده‌ها دوباره امتحان می‌کند. کاربر مقدار به‌تأخیرافتادهٔ قدیمی را تا زمان آماده شدن داده‌ها خواهد دید.

رندر «پس‌زمینه» به‌تأخیرافتاده قابل قطع است. مثلاً اگر دوباره در ورودی تایپ کنید، ری‌اکت آن را رها کرده و با مقدار جدید ری‌استارت می‌کند. ری‌اکت همیشه از آخرین مقدار ارائه‌شده استفاده می‌کند.

توجه کنید که همچنان یک درخواست شبکه به ازای هر کلید فشار داده می‌شود. آنچه اینجا به تأخیر می‌افتد نمایش نتایج (تا زمان آماده شدن) است، نه خود درخواست‌های شبکه. حتی اگر کاربر به تایپ ادامه دهد، پاسخ‌ها برای هر کلید کش می‌شوند، بنابراین فشردن Backspace آنی است و دوباره fetch نمی‌کند.

</DeepDive>

---

### نشان دادن اینکه محتوا قدیمی است {/*indicating-that-the-content-is-stale*/}

در مثال بالا، هیچ نشان‌ای وجود ندارد که لیست نتایج برای آخرین query هنوز در حال بارگذاری است. اگر نتایج جدید مدتی طول بکشد تا بارگذاری شوند، این می‌تواند برای کاربر گیج‌کننده باشد. برای واضح‌تر کردن برای کاربر که لیست نتایج با آخرین query مطابقت ندارد، می‌توانید هنگام نمایش لیست نتایج قدیمی یک نشان بصری اضافه کنید:

```js {2}
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1,
}}>
  <SearchResults query={deferredQuery} />
</div>
```

با این تغییر، به‌محض اینکه شروع به تایپ می‌کنید، لیست نتایج قدیمی تا زمان بارگذاری لیست نتایج جدید کمی کم‌رنگ می‌شود. همچنین می‌توانید یک transition در CSS اضافه کنید تا کم‌رنگ شدن را به تأخیر بیندازید تا تدریجی به نظر برسد، مانند مثال زیر:

<Sandpack>

```js src/App.js
import { Suspense, useState, useDeferredValue } from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{
          opacity: isStale ? 0.5 : 1,
          transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
        }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

```js src/SearchResults.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function SearchResults({ query }) {
  if (query === '') {
    return null;
  }
  const albums = use(fetchData(`/search?q=${query}`));
  if (albums.length === 0) {
    return <p>No matches for <i>"{query}"</i></p>;
  }
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}
```

```js src/data.js hidden
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url.startsWith('/search?q=')) {
    return await getSearchResults(url.slice('/search?q='.length));
  } else {
    throw Error('Not implemented');
  }
}

async function getSearchResults(query) {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  const allAlbums = [{
    id: 13,
    title: 'Let It Be',
    year: 1970
  }, {
    id: 12,
    title: 'Abbey Road',
    year: 1969
  }, {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969
  }, {
    id: 10,
    title: 'The Beatles',
    year: 1968
  }, {
    id: 9,
    title: 'Magical Mystery Tour',
    year: 1967
  }, {
    id: 8,
    title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
    year: 1967
  }, {
    id: 7,
    title: 'Revolver',
    year: 1966
  }, {
    id: 6,
    title: 'Rubber Soul',
    year: 1965
  }, {
    id: 5,
    title: 'Help!',
    year: 1965
  }, {
    id: 4,
    title: 'Beatles For Sale',
    year: 1964
  }, {
    id: 3,
    title: 'A Hard Day\'s Night',
    year: 1964
  }, {
    id: 2,
    title: 'With The Beatles',
    year: 1963
  }, {
    id: 1,
    title: 'Please Please Me',
    year: 1963
  }];

  const lowerQuery = query.trim().toLowerCase();
  return allAlbums.filter(album => {
    const lowerTitle = album.title.toLowerCase();
    return (
      lowerTitle.startsWith(lowerQuery) ||
      lowerTitle.indexOf(' ' + lowerQuery) !== -1
    )
  });
}
```

```css
input { margin: 10px; }
```

</Sandpack>

---

### به تأخیر انداختن رندر مجدد برای بخشی از UI {/*deferring-re-rendering-for-a-part-of-the-ui*/}

همچنین می‌توانید از `useDeferredValue` به‌عنوان یک بهینه‌سازی عملکرد استفاده کنید. این زمانی مفید است که رندر مجدد بخشی از UI کند است، راه آسانی برای بهینه‌سازی آن وجود ندارد، و می‌خواهید از مسدود کردن بقیهٔ UI جلوگیری کنید.

تصور کنید یک فیلد متنی و یک کامپوننت (مانند یک نمودار یا لیست طولانی) دارید که با هر کلید رندر مجدد می‌شود:

```js
function App() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  );
}
```

ابتدا، `SlowList` را برای رد کردن رندر مجدد وقتی پراپس‌هایش یکسان هستند، بهینه کنید. برای این کار، [آن را در `memo` بپیچید:](/reference/react/memo#skipping-re-rendering-when-props-are-unchanged)

```js {1,3}
const SlowList = memo(function SlowList({ text }) {
  // ...
});
```

با این حال، این فقط زمانی کمک می‌کند که پراپس‌های `SlowList` با رندر قبلی *یکسان* باشند. مشکلی که اکنون با آن روبرو هستید این است که وقتی *متفاوت* هستند، و وقتی واقعاً نیاز به نمایش خروجی بصری متفاوت دارید، کند است.

به‌طور خاص، مشکل عملکرد اصلی این است که هر بار که در ورودی تایپ می‌کنید، `SlowList` پراپس‌های جدید دریافت می‌کند، و رندر مجدد کل درخت آن باعث می‌شود تایپ کردن کند به نظر برسد. در این مورد، `useDeferredValue` به شما اجازه می‌دهد به‌روزرسانی ورودی (که باید سریع باشد) را بر به‌روزرسانی لیست نتایج (که مجاز است کندتر باشد) اولویت دهید:

```js {3,7}
function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

این کار رندر مجدد `SlowList` را سریع‌تر نمی‌کند. با این حال، به ری‌اکت می‌گوید که رندر مجدد لیست می‌تواند اولویت‌اش کاهش یابد تا کلیدها را مسدود نکند. لیست از ورودی «عقب می‌ماند» و سپس «جبران می‌کند». مانند قبل، ری‌اکت سعی می‌کند لیست را در اسرع وقت به‌روز کند، اما از تایپ کاربر جلوگیری نمی‌کند.

<Recipes titleText="The difference between useDeferredValue and unoptimized re-rendering" titleId="examples">

#### Deferred re-rendering of the list {/*deferred-re-rendering-of-the-list*/}

در این مثال، هر آیتم در کامپوننت `SlowList` **به‌طور مصنوعی کند شده است** تا بتوانید ببینید چگونه `useDeferredValue` به شما اجازه می‌دهد ورودی را پاسخگو نگه دارید. در ورودی تایپ کنید و توجه کنید که تایپ سریع به نظر می‌رسد در حالی که لیست از آن «عقب می‌ماند».

<Sandpack>

```js
import { useState, useDeferredValue } from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

```js {expectedErrors: {'react-compiler': [19, 20]}} src/SlowList.js
import { memo } from 'react';

const SlowList = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default SlowList;
```

```css
.items {
  padding: 0;
}

.item {
  list-style: none;
  display: block;
  height: 40px;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<Solution />

#### Unoptimized re-rendering of the list {/*unoptimized-re-rendering-of-the-list*/}

در این مثال، هر آیتم در کامپوننت `SlowList` **به‌طور مصنوعی کند شده است**، اما `useDeferredValue` وجود ندارد.

توجه کنید که تایپ در ورودی بسیار کند به نظر می‌رسد. این به این دلیل است که بدون `useDeferredValue`، هر کلید لیست کامل را مجبور می‌کند بلافاصله به‌صورت غیرقابل قطع رندر مجدد شود.

<Sandpack>

```js
import { useState } from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={text} />
    </>
  );
}
```

```js {expectedErrors: {'react-compiler': [19, 20]}} src/SlowList.js
import { memo } from 'react';

const SlowList = memo(function SlowList({ text }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  let items = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return (
    <ul className="items">
      {items}
    </ul>
  );
});

function SlowItem({ text }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return (
    <li className="item">
      Text: {text}
    </li>
  )
}

export default SlowList;
```

```css
.items {
  padding: 0;
}

.item {
  list-style: none;
  display: block;
  height: 40px;
  padding: 5px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #aaa;
}
```

</Sandpack>

<Solution />

</Recipes>

<Pitfall>

این بهینه‌سازی نیازمند این است که `SlowList` در [`memo`](/reference/react/memo) پیچیده شود. این به این دلیل است که هر بار که `text` تغییر می‌کند، ری‌اکت باید بتواند کامپوننت والد را به‌سرعت رندر مجدد کند. در طول آن رندر مجدد، `deferredText` هنوز مقدار قبلی خود را دارد، بنابراین `SlowList` می‌تواند از رندر مجدد بپرد (پراپس‌هایش تغییر نکرده‌اند). بدون [`memo`](/reference/react/memo)، به هر حال باید رندر مجدد می‌شد، که نقطهٔ بهینه‌سازی را بی‌اثر می‌کرد.

</Pitfall>

<DeepDive>

#### به تأخیر انداختن یک مقدار با debouncing و throttling چه تفاوتی دارد؟ {/*how-is-deferring-a-value-different-from-debouncing-and-throttling*/}

دو تکنیک بهینه‌سازی رایج وجود دارد که ممکن است قبلاً در این سناریو از آن‌ها استفاده کرده باشید:

- *Debouncing* به این معناست که برای به‌روزرسانی لیست منتظر می‌مانید تا کاربر تایپ را متوقف کند (مثلاً برای یک ثانیه).
- *Throttling* به این معناست که لیست را هر چند وقت یک‌بار به‌روز می‌کنید (مثلاً حداکثر یک بار در ثانیه).

در حالی که این تکنیک‌ها در برخی موارد مفید هستند، `useDeferredValue` برای بهینه‌سازی رندر مناسب‌تر است زیرا با خود ری‌اکت عمیقاً یکپارچه است و با دستگاه کاربر سازگار می‌شود.

برخلاف debouncing یا throttling، نیازی به انتخاب هیچ تأخیر ثابتی ندارد. اگر دستگاه کاربر سریع است (مثلاً لپ‌تاپ قدرتمند)، رندر مجدد به‌تأخیرافتاده تقریباً بلافاصله اتفاق می‌افتد و قابل توجه نخواهد بود. اگر دستگاه کاربر کند است، لیست متناسب با کندی دستگاه از ورودی «عقب می‌ماند».

همچنین، برخلاف debouncing یا throttling، رندرهای مجدد به‌تأخیرافتاده‌ای که توسط `useDeferredValue` انجام می‌شوند به‌طور پیش‌فرض قابل قطع هستند. این بدان معناست که اگر ری‌اکت در وسط رندر مجدد یک لیست بزرگ است، اما کاربر کلید دیگری فشار می‌دهد، ری‌اکت آن رندر مجدد را رها می‌کند، کلید را مدیریت می‌کند، و سپس رندر در پس‌زمینه را دوباره شروع می‌کند. در مقابل، debouncing و throttling همچنان تجربه‌ای کند تولید می‌کنند زیرا *مسدودکننده* هستند: آنها صرفاً لحظه‌ای که در آن رندر کلیدها را مسدود می‌کند را به تأخیر می‌اندازند.

اگر کاری که در حال بهینه‌سازی آن هستید در حین رندر اتفاق نمی‌افتد، debouncing و throttling همچنان مفید هستند. مثلاً می‌توانند به شما اجازه دهند درخواست‌های شبکهٔ کمتری شلیک کنید. همچنین می‌توانید از این تکنیک‌ها با هم استفاده کنید.

</DeepDive>
