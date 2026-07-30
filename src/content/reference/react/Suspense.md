---
title: <Suspense>
---

<Intro>

`<Suspense>` به شما اجازه می‌دهد یک fallback را تا زمانی که فرزندانش بارگذاری را تمام کرده‌اند نمایش دهید.


```js
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<Suspense>` {/*suspense*/}

#### پراپس {/*props*/}
* `children`: رابط کاربری واقعی که قصد دارید رندر کنید. اگر `children` در حین رندر suspend شود، مرز Suspense به رندر `fallback` سوییچ خواهد کرد.
* `fallback`: یک رابط کاربری جایگزین برای رندر به‌جای رابط کاربری واقعی اگر هنوز بارگذاری آن تمام نشده است. هر نود معتبر ری‌اکت پذیرفته می‌شود، اگرچه در عمل، fallback یک view placeholder سبک‌وزن مانند یک loading spinner یا skeleton است. ساسپنس به‌طور خودکار به `fallback` سوییچ می‌کند وقتی `children` suspend می‌شود، و به `children` برمی‌گردد وقتی داده‌ها آماده هستند. اگر `fallback` در حین رندر suspend شود، نزدیک‌ترین مرز Suspense والد را فعال می‌کند.

#### نکات {/*caveats*/}

- ری‌اکت هیچ استیتی را برای رندرهایی که قبل از توانایی mount برای اولین بار suspend شده‌اند، حفظ نمی‌کند. وقتی کامپوننت بارگذاری شد، ری‌اکت رندر درخت suspend شده را از ابتدا دوباره امتحان می‌کند.
- اگر ساسپنس در حال نمایش محتوا برای درخت بود، اما سپس دوباره suspend شد، `fallback` دوباره نشان داده خواهد شد مگر اینکه به‌روزرسانی باعث آن توسط [`startTransition`](/reference/react/startTransition) یا [`useDeferredValue`](/reference/react/useDeferredValue) باشد.
- اگر ری‌اکت نیاز داشته باشد محتوای از قبل قابل مشاهده را پنهان کند زیرا دوباره suspend شده، [layout Effect‌ها](/reference/react/useLayoutEffect) را در درخت محتوا پاک‌سازی می‌کند. وقتی محتوا آماده نمایش دوباره است، ری‌اکت layout Effect‌ها را دوباره فعال می‌کند. این تضمین می‌کند که Effect‌هایی که layout DOM را اندازه‌گیری می‌کنند سعی نمی‌کنند این کار را در حالی که محتوا پنهان است انجام دهند.
- ری‌اکت شامل بهینه‌سازی‌های زیرساختی مانند *Streaming Server Rendering* و *Selective Hydration* است که با ساسپنس یکپارچه شده‌اند. برای کسب اطلاعات بیشتر [یک نمای کلی معماری](https://github.com/reactwg/react-18/discussions/37) را بخوانید و [یک گفتگوی فنی](https://www.youtube.com/watch?v=pj5N-Khihgc) را تماشا کنید.

---

## استفاده {/*usage*/}

### نمایش یک fallback در حالی که محتوا در حال بارگذاری است {/*displaying-a-fallback-while-content-is-loading*/}

می‌توانید هر بخشی از اپلیکیشن خود را با یک مرز Suspense بپیچید:

```js [[1, 1, "<Loading />"], [2, 2, "<Albums />"]]
<Suspense fallback={<Loading />}>
  <Albums />
</Suspense>
```

ری‌اکت <CodeStep step={1}>loading fallback</CodeStep> شما را تا زمانی که تمام کد و داده‌های مورد نیاز <CodeStep step={2}>فرزندان</CodeStep> بارگذاری شده باشند، نمایش می‌دهد.

در مثال زیر، کامپوننت `Albums` هنگام fetch لیست آلبوم‌ها *suspend* می‌شود. تا زمانی که آمادهٔ رندر باشد، ری‌اکت نزدیک‌ترین مرز Suspense بالاتر را سوییچ می‌کند تا fallback — کامپوننت `Loading` شما — را نمایش دهد. سپس، وقتی داده‌ها بارگذاری شدند، ری‌اکت fallback `Loading` را پنهان کرده و کامپوننت `Albums` را با داده‌ها رندر می‌کند.

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ArtistPage from './ArtistPage.js';

export default function App() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  } else {
    return (
      <button onClick={() => setShow(true)}>
        Open The Beatles artist page
      </button>
    );
  }
}
```

```js src/ArtistPage.js active
import { Suspense } from 'react';
import Albums from './Albums.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Albums artistId={artist.id} />
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else {
    throw Error('Not implemented');
  }
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

</Sandpack>

<Note>

**فقط منابع دادهٔ فعال‌شده با Suspense کامپوننت Suspense را فعال می‌کنند.** آن‌ها شامل:

- fetch داده‌ها با فریم‌ورک‌های فعال‌شده با Suspense مانند [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) و [Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
- بارگذاری تنبل (Lazy Loading) کد کامپوننت با [`lazy`](/reference/react/lazy)
- خواندن مقدار یک Promise cache شده با [`use`](/reference/react/use)

ساسپنس **تشخیص نمی‌دهد** وقتی داده‌ها داخل یک افکت یا event handler fetch می‌شوند.

روش دقیق بارگذاری داده‌ها در کامپوننت `Albums` بالا به فریم‌ورک شما بستگی دارد. اگر از یک فریم‌ورک فعال‌شده با Suspense استفاده می‌کنید، جزئیات را در مستندات fetch دادهٔ آن پیدا خواهید کرد.

fetch دادهٔ فعال‌شده با Suspense بدون استفاده از یک فریم‌ورک opiniated هنوز پشتیبانی نمی‌شود. نیازمندی‌های پیاده‌سازی یک منبع دادهٔ فعال‌شده با Suspense ناپایدار و بدون مستند هستند. یک API رسمی برای یکپارچه‌سازی منابع داده با ساسپنس در یک نسخهٔ آیندهٔ ری‌اکت منتشر خواهد شد. 

</Note>

---

### نمایش محتوا با هم در یک لحظه {/*revealing-content-together-at-once*/}

به‌طور پیش‌فرض، کل درخت داخل ساسپنس به‌عنوان یک واحد واحد در نظر گرفته می‌شود. برای مثال، حتی اگر *فقط یکی* از این کامپوننت‌ها در انتظار برخی داده‌ها suspend شود، *همه* آن‌ها با هم با loading indicator جایگزین می‌شوند:

```js {2-5}
<Suspense fallback={<Loading />}>
  <Biography />
  <Panel>
    <Albums />
  </Panel>
</Suspense>
```

سپس، پس از آنکه همهٔ آن‌ها آمادهٔ نمایش شدند، همگی با هم در یک لحظه ظاهر می‌شوند.

در مثال زیر، هم `Biography` و هم `Albums` برخی داده‌ها را fetch می‌کنند. با این حال، زیرا آن‌ها تحت یک مرز Suspense واحد گروه‌بندی شده‌اند، این کامپوننت‌ها همیشه با هم در یک زمان "pop in" می‌شوند.

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ArtistPage from './ArtistPage.js';

export default function App() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  } else {
    return (
      <button onClick={() => setShow(true)}>
        Open The Beatles artist page
      </button>
    );
  }
}
```

```js src/ArtistPage.js active
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<Loading />}>
        <Biography artistId={artist.id} />
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
  );
}
```

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

```css
.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
```

</Sandpack>

کامپوننت‌هایی که داده‌ها را بارگذاری می‌کنند لازم نیست فرزندان مستقیم مرز Suspense باشند. برای مثال، می‌توانید `Biography` و `Albums` را به یک کامپوننت جدید `Details` منتقل کنید. این رفتار را تغییر نمی‌دهد. `Biography` و `Albums` همان نزدیک‌ترین مرز Suspense والد را به اشتراک می‌گذارند، بنابراین نمایش آن‌ها با هم هماهنگ است.

```js {2,8-11}
<Suspense fallback={<Loading />}>
  <Details artistId={artist.id} />
</Suspense>

function Details({ artistId }) {
  return (
    <>
      <Biography artistId={artistId} />
      <Panel>
        <Albums artistId={artistId} />
      </Panel>
    </>
  );
}
```

---

### نمایش محتوای تودرتو هنگام بارگذاری {/*revealing-nested-content-as-it-loads*/}

وقتی یک کامپوننت suspend می‌شود، نزدیک‌ترین کامپوننت Suspense والد fallback را نمایش می‌دهد. این به شما اجازه می‌دهد چندین کامپوننت Suspense را تودرتو کنید تا یک دنبالهٔ بارگذاری ایجاد کنید. fallback هر مرز Suspense با در دسترس قرار گرفتن سطح بعدی محتوا پر خواهد شد. برای مثال، می‌توانید به لیست آلبوم fallback خودش را بدهید:

```js {3,7}
<Suspense fallback={<BigSpinner />}>
  <Biography />
  <Suspense fallback={<AlbumsGlimmer />}>
    <Panel>
      <Albums />
    </Panel>
  </Suspense>
</Suspense>
```

با این تغییر، نمایش `Biography` نیازی به "منتظر ماندن" برای بارگذاری `Albums` ندارد.

دنباله خواهد بود:

1. اگر `Biography` هنوز بارگذاری نشده، `BigSpinner` به‌جای کل ناحیهٔ محتوا نمایش داده می‌شود.
2. وقتی بارگذاری `Biography` تمام شد، `BigSpinner` با محتوا جایگزین می‌شود.
3. اگر `Albums` هنوز بارگذاری نشده، `AlbumsGlimmer` به‌جای `Albums` و والد آن `Panel` نمایش داده می‌شود.
4. در نهایت، وقتی بارگذاری `Albums` تمام شد، `AlbumsGlimmer` را جایگزین می‌کند.

<Sandpack>

```js src/App.js hidden
import { useState } from 'react';
import ArtistPage from './ArtistPage.js';

export default function App() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  } else {
    return (
      <button onClick={() => setShow(true)}>
        Open The Beatles artist page
      </button>
    );
  }
}
```

```js src/ArtistPage.js active
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Suspense fallback={<BigSpinner />}>
        <Biography artistId={artist.id} />
        <Suspense fallback={<AlbumsGlimmer />}>
          <Panel>
            <Albums artistId={artist.id} />
          </Panel>
        </Suspense>
      </Suspense>
    </>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

function AlbumsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
  );
}
```

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

```css
.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-panel {
  border: 1px dashed #aaa;
  background: linear-gradient(90deg, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 100%);
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-line {
  display: block;
  width: 60%;
  height: 20px;
  margin: 10px;
  border-radius: 4px;
  background: #f0f0f0;
}
```

</Sandpack>

مرزهای Suspense به شما اجازه می‌دهند هماهنگ کنید کدام بخش‌های رابط کاربری شما همیشه باید با هم در یک زمان "pop in" کنند، و کدام بخش‌ها باید به‌تدریج محتوای بیشتری را در یک دنباله از استیت‌های بارگذاری نمایش دهند. می‌توانید مرزهای Suspense را در هر جایی از درخت اضافه، منتقل یا حذف کنید بدون تأثیر بر بقیهٔ رفتار اپلیکیشن شما.

مرز Suspense را دور هر کامپوننت قرار ندهید. مرزهای Suspense نباید از دنبالهٔ بارگذاری که می‌خواهید کاربر تجربه کند دانه‌دانه‌تر باشند. اگر با یک طراح کار می‌کنید، از او بپرسید استیت‌های بارگذاری باید کجا قرار گیرند — احتمالاً آن‌ها را از قبل در wireframeهای طراحی خود گنجانده است.

---

### نمایش محتوای قدیمی در حالی که محتوای جدید در حال بارگذاری است {/*showing-stale-content-while-fresh-content-is-loading*/}

در این مثال، کامپوننت `SearchResults` هنگام fetch نتایج جستجو suspend می‌شود. `"a"` را تایپ کنید، برای نتایج منتظر بمانید، و سپس آن را به `"ab"` ویرایش کنید. نتایج برای `"a"` با loading fallback جایگزین خواهند شد.

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
    setTimeout(resolve, 500);
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

یک الگوی رابط کاربری جایگزین رایج این است که به‌روزرسانی لیست را *به تأخیر بیندازید* و نمایش نتایج قبلی را تا زمانی که نتایج جدید آماده شوند ادامه دهید. هوک [`useDeferredValue`](/reference/react/useDeferredValue) به شما اجازه می‌دهد یک نسخهٔ به تأخیر افتادهٔ query را پایین بفرستید: 

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

`query` بلافاصله به‌روز می‌شود، بنابراین input مقدار جدید را نمایش خواهد داد. با این حال، `deferredQuery` مقدار قبلی خود را تا زمانی که داده‌ها بارگذاری شده باشند حفظ می‌کند، بنابراین `SearchResults` برای مدتی نتایج قدیمی را نشان می‌دهد.

برای روشن‌تر کردن برای کاربر، می‌توانید یک نمایش بصری اضافه کنید وقتی لیست نتایج قدیمی نمایش داده می‌شود:

```js {2}
<div style={{
  opacity: query !== deferredQuery ? 0.5 : 1 
}}>
  <SearchResults query={deferredQuery} />
</div>
```

در مثال زیر `"a"` را وارد کنید، برای بارگذاری نتایج منتظر بمانید، و سپس input را به `"ab"` ویرایش کنید. توجه کنید چگونه به‌جای fallback ساسپنس، اکنون لیست نتایج قدیمی کم‌رنگ را تا زمانی که نتایج جدید بارگذاری شده‌اند می‌بینید:


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
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}
```

```js src/SearchResults.js hidden
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
    setTimeout(resolve, 500);
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

<Note>

هم مقادیر به تأخیر افتاده و هم [ترنزیشن‌ها](#preventing-already-revealed-content-from-hiding) به شما اجازه می‌دهند از نمایش fallback ساسپنس به نفع indicatorهای inline اجتناب کنید. ترنزیشن‌ها کل به‌روزرسانی را به‌عنوان غیرفوری علامت‌گذاری می‌کنند بنابراین معمولاً توسط فریم‌ورک‌ها و کتابخانه‌های router برای navigation استفاده می‌شوند. مقادیر به تأخیر افتاده، از سوی دیگر، بیشتر در کد اپلیکیشن مفید هستند که می‌خواهید بخشی از رابط کاربری را به‌عنوان غیرفوری علامت‌گذاری کنید و اجازه دهید از بقیهٔ رابط کاربری "عقب‌تر" باشد.

</Note>

---

### جلوگیری از پنهان شدن محتوای از قبل نمایش‌داده‌شده {/*preventing-already-revealed-content-from-hiding*/}

وقتی یک کامپوننت suspend می‌شود، نزدیک‌ترین مرز Suspense والد به نمایش fallback سوییچ می‌کند. این می‌تواند منجر به یک تجربهٔ کاربری ناخوشایند شود اگر در حال نمایش برخی محتوا بوده است. این دکمه را امتحان کنید:

<Sandpack>

```js src/App.js
import { Suspense, useState } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');

  function navigate(url) {
    setPage(url);
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout>
      {content}
    </Layout>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Layout.js
export default function Layout({ children }) {
  return (
    <div className="layout">
      <section className="header">
        Music Browser
      </section>
      <main>
        {children}
      </main>
    </div>
  );
}
```

```js src/IndexPage.js
export default function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  );
}
```

```js src/ArtistPage.js
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function AlbumsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

```css
main {
  min-height: 200px;
  padding: 10px;
}

.layout {
  border: 1px solid black;
}

.header {
  background: #222;
  padding: 10px;
  text-align: center;
  color: white;
}

.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-panel {
  border: 1px dashed #aaa;
  background: linear-gradient(90deg, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 100%);
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-line {
  display: block;
  width: 60%;
  height: 20px;
  margin: 10px;
  border-radius: 4px;
  background: #f0f0f0;
}
```

</Sandpack>

وقتی دکمه را فشار دادید، کامپوننت `Router` به‌جای `IndexPage`، `ArtistPage` را رندر کرد. یک کامپوننت داخل `ArtistPage` suspend شد، بنابراین نزدیک‌ترین مرز Suspense شروع به نمایش fallback کرد. نزدیک‌ترین مرز Suspense نزدیک root بود، بنابراین کل layout سایت با `BigSpinner` جایگزین شد.

برای جلوگیری از این کار، می‌توانید به‌روزرسانی استیت navigation را به‌عنوان یک *ترنزیشن* با [`startTransition`:](/reference/react/startTransition) علامت‌گذاری کنید:

```js {5,7}
function Router() {
  const [page, setPage] = useState('/');

  function navigate(url) {
    startTransition(() => {
      setPage(url);      
    });
  }
  // ...
```

این به ری‌اکت می‌گوید که ترنزیشن استیت فوری نیست، و بهتر است به‌جای پنهان کردن هر محتوای از قبل نمایش‌داده‌شده، صفحهٔ قبلی را نمایش دهیم. اکنون کلیک روی دکمه برای بارگذاری `Biography` "منتظر می‌ماند":

<Sandpack>

```js src/App.js
import { Suspense, startTransition, useState } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout>
      {content}
    </Layout>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Layout.js
export default function Layout({ children }) {
  return (
    <div className="layout">
      <section className="header">
        Music Browser
      </section>
      <main>
        {children}
      </main>
    </div>
  );
}
```

```js src/IndexPage.js
export default function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  );
}
```

```js src/ArtistPage.js
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function AlbumsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

```css
main {
  min-height: 200px;
  padding: 10px;
}

.layout {
  border: 1px solid black;
}

.header {
  background: #222;
  padding: 10px;
  text-align: center;
  color: white;
}

.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-panel {
  border: 1px dashed #aaa;
  background: linear-gradient(90deg, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 100%);
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-line {
  display: block;
  width: 60%;
  height: 20px;
  margin: 10px;
  border-radius: 4px;
  background: #f0f0f0;
}
```

</Sandpack>

یک ترنزیشن برای بارگذاری *همه* محتوا منتظر نمی‌ماند. فقط به‌اندازهٔ کافی منتظر می‌ماند تا از پنهان شدن محتوای از قبل نمایش‌داده‌شده جلوگیری کند. برای مثال، `Layout` وب‌سایت از قبل نمایش داده شده بود، بنابراین پنهان کردن آن پشت یک loading spinner بد خواهد بود. با این حال، مرز `Suspense` تودرتو دور `Albums` جدید است، بنابراین ترنزیشن برای آن منتظر نمی‌ماند.

<Note>

انتظار می‌رود routerهای فعال‌شده با Suspense به‌روزرسانی‌های navigation را به‌طور پیش‌فرض در ترنزیشن‌ها بپیچند.

</Note>

---

### نشان دادن اینکه یک ترنزیشن در حال انجام است {/*indicating-that-a-transition-is-happening*/}

در مثال بالا، وقتی روی دکمه کلیک می‌کنید، هیچ نمایش بصری وجود ندارد که نشان دهد یک navigation در حال انجام است. برای افزودن یک indicator، می‌توانید [`startTransition`](/reference/react/startTransition) را با [`useTransition`](/reference/react/useTransition) جایگزین کنید که به شما یک مقدار boolean `isPending` می‌دهد. در مثال زیر، برای تغییر استایل header وب‌سایت در حالی که یک ترنزیشن در حال انجام است استفاده می‌شود:

<Sandpack>

```js src/App.js
import { Suspense, useState, useTransition } from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState('/');
  const [isPending, startTransition] = useTransition();

  function navigate(url) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate={navigate} />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending={isPending}>
      {content}
    </Layout>
  );
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}
```

```js src/Layout.js
export default function Layout({ children, isPending }) {
  return (
    <div className="layout">
      <section className="header" style={{
        opacity: isPending ? 0.7 : 1
      }}>
        Music Browser
      </section>
      <main>
        {children}
      </main>
    </div>
  );
}
```

```js src/IndexPage.js
export default function IndexPage({ navigate }) {
  return (
    <button onClick={() => navigate('/the-beatles')}>
      Open The Beatles artist page
    </button>
  );
}
```

```js src/ArtistPage.js
import { Suspense } from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage({ artist }) {
  return (
    <>
      <h1>{artist.name}</h1>
      <Biography artistId={artist.id} />
      <Suspense fallback={<AlbumsGlimmer />}>
        <Panel>
          <Albums artistId={artist.id} />
        </Panel>
      </Suspense>
    </>
  );
}

function AlbumsGlimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
```

```js src/Albums.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Albums({ artistId }) {
  const albums = use(fetchData(`/${artistId}/albums`));
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

```js src/Biography.js
import {use} from 'react';
import { fetchData } from './data.js';

export default function Biography({ artistId }) {
  const bio = use(fetchData(`/${artistId}/bio`));
  return (
    <section>
      <p className="bio">{bio}</p>
    </section>
  );
}
```

```js src/Panel.js
export default function Panel({ children }) {
  return (
    <section className="panel">
      {children}
    </section>
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
  if (url === '/the-beatles/albums') {
    return await getAlbums();
  } else if (url === '/the-beatles/bio') {
    return await getBio();
  } else {
    throw Error('Not implemented');
  }
}

async function getBio() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return `The Beatles were an English rock band, 
    formed in Liverpool in 1960, that comprised 
    John Lennon, Paul McCartney, George Harrison 
    and Ringo Starr.`;
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 3000);
  });

  return [{
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
}
```

```css
main {
  min-height: 200px;
  padding: 10px;
}

.layout {
  border: 1px solid black;
}

.header {
  background: #222;
  padding: 10px;
  text-align: center;
  color: white;
}

.bio { font-style: italic; }

.panel {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-panel {
  border: 1px dashed #aaa;
  background: linear-gradient(90deg, rgba(221,221,221,1) 0%, rgba(255,255,255,1) 100%);
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}

.glimmer-line {
  display: block;
  width: 60%;
  height: 20px;
  margin: 10px;
  border-radius: 4px;
  background: #f0f0f0;
}
```

</Sandpack>

---

### بازنشانی مرزهای Suspense در navigation {/*resetting-suspense-boundaries-on-navigation*/}

در طول یک ترنزیشن، ری‌اکت از پنهان کردن محتوای از قبل نمایش‌داده‌شده اجتناب می‌کند. با این حال، اگر به یک route با پارامترهای متفاوت navigation کنید، ممکن است بخواهید به ری‌اکت بگویید این محتوای *متفاوتی* است. می‌توانید این را با یک `key` بیان کنید:

```js
<ProfilePage key={queryParams.id} />
```

تصور کنید در حال navigation در صفحهٔ پروفایل یک کاربر هستید، و چیزی suspend می‌شود. اگر آن به‌روزرسانی در یک ترنزیشن پیچیده شده باشد، fallback را برای محتوای از قبل قابل مشاهده trigger نمی‌کند. این رفتار مورد انتظار است.

با این حال، اکنون تصور کنید در حال navigation بین دو پروفایل کاربر متفاوت هستید. در آن حالت، نمایش fallback منطقی است. برای مثال، timeline یک کاربر *محتوای متفاوتی* از timeline کاربر دیگر است. با مشخص کردن یک `key`، اطمینان حاصل می‌کنید که ری‌اکت پروفایل‌های کاربران متفاوت را به‌عنوان کامپوننت‌های متفاوت در نظر می‌گیرد، و مرزهای Suspense را در طول navigation بازنشانی می‌کند. routerهای یکپارچه با Suspense باید این کار را به‌طور خودکار انجام دهند.

---

### ارائهٔ fallback برای خطاهای سرور و محتوای فقط-کلاینت {/*providing-a-fallback-for-server-errors-and-client-only-content*/}

اگر از یکی از [APIهای streaming server rendering](/reference/react-dom/server) استفاده می‌کنید (یا یک فریم‌ورک که به آن‌ها وابسته است)، ری‌اکت همچنین از مرزهای `<Suspense>` شما برای مدیریت خطاها روی سرور استفاده می‌کند. اگر یک کامپوننت روی سرور خطایی پرتاب کند، ری‌اکت رندر سرور را قطع نمی‌کند. در عوض، نزدیک‌ترین کامپوننت `<Suspense>` بالاتر از آن را پیدا کرده و fallback آن (مانند یک spinner) را در HTML تولید‌شدهٔ سرور قرار می‌دهد. کاربر در ابتدا یک spinner خواهد دید.

روی کلاینت، ری‌اکت سعی می‌کند همان کامپوننت را دوباره رندر کند. اگر روی کلاینت نیز خطا دهد، ری‌اکت خطا را پرتاب کرده و نزدیک‌ترین [error boundary](/reference/react/Component#static-getderivedstatefromerror) را نمایش می‌دهد. با این حال، اگر روی کلاینت خطا ندهد، ری‌اکت خطا را به کاربر نمایش نمی‌دهد زیرا محتوا در نهایت با موفقیت نمایش داده شد.

می‌توانید از این کار برای opt-out برخی کامپوننت‌ها از رندر روی سرور استفاده کنید. برای این کار، در محیط سرور خطا پرتاب کنید و سپس آن‌ها را در یک مرز `<Suspense>` بپیچید تا HTML آن‌ها با fallback جایگزین شود:

```js
<Suspense fallback={<Loading />}>
  <Chat />
</Suspense>

function Chat() {
  if (typeof window === 'undefined') {
    throw Error('Chat should only render on the client.');
  }
  // ...
}
```

HTML سرور شامل loading indicator خواهد بود. این توسط کامپوننت `Chat` روی کلاینت جایگزین خواهد شد.

---

## عیب‌یابی {/*troubleshooting*/}

### چگونه از جایگزینی رابط کاربری با یک fallback در طول یک به‌روزرسانی جلوگیری کنم؟ {/*preventing-unwanted-fallbacks*/}

جایگزینی رابط کاربری قابل مشاهده با یک fallback یک تجربهٔ کاربری ناخوشایند ایجاد می‌کند. این می‌تواند اتفاق بیفتد وقتی یک به‌روزرسانی باعث می‌شود یک کامپوننت suspend شود، و نزدیک‌ترین مرز Suspense در حال نمایش محتوا به کاربر است.

برای جلوگیری از وقوع این کار، [به‌روزرسانی را با `startTransition` به‌عنوان غیرفوری علامت‌گذاری کنید](#preventing-already-revealed-content-from-hiding). در طول یک ترنزیشن، ری‌اکت تا زمانی که داده‌های کافی بارگذاری شده باشد منتظر می‌ماند تا از ظاهر شدن یک fallback ناخواسته جلوگیری کند:

```js {2-3,5}
function handleNextPageClick() {
  // If this update suspends, don't hide the already displayed content
  startTransition(() => {
    setCurrentPage(currentPage + 1);
  });
}
```

این کار از پنهان کردن محتوای موجود جلوگیری می‌کند. با این حال، هر مرز `Suspense` تازه رندر شده همچنان بلافاصله fallback‌ها را نمایش می‌دهد تا از مسدود کردن رابط کاربری جلوگیری کند و به کاربر اجازه دهد محتوا را همان‌طور که در دسترس قرار می‌گیرد ببیند.

**ری‌اکت فقط در طول به‌روزرسانی‌های غیرفوری از fallback‌های ناخواسته جلوگیری می‌کند**. اگر نتیجهٔ یک به‌روزرسانی فوری باشد، رندر را به تأخیر نمی‌اندازد. باید با یک API مانند [`startTransition`](/reference/react/startTransition) یا [`useDeferredValue`](/reference/react/useDeferredValue) opt-in کنید.

اگر router شما با ساسپنس یکپارچه است، باید به‌روزرسانی‌های خود را به‌طور خودکار در [`startTransition`](/reference/react/startTransition) بپیچد.
