---
title: cache
canary: true
---

<RSC>

`cache` تنها برای استفاده با [کامپوننت‌های سرور ری‌اکت](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) است.

</RSC>

<Intro>

`cache` به شما اجازه می‌دهد نتیجهٔ یک واکشی داده یا محاسبه را کش (cache) کنید.

```js
const cachedFn = cache(fn);
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `cache(fn)` {/*cache*/}

برای ایجاد نسخه‌ای از یک تابع با قابلیت کش، `cache` را خارج از هر کامپوننتی فراخوانی کنید.

```js {4,7}
import {cache} from 'react';
import calculateMetrics from 'lib/metrics';

const getMetrics = cache(calculateMetrics);

function Chart({data}) {
  const report = getMetrics(data);
  // ...
}
```

هنگامی که `getMetrics` برای بار اول با `data` فراخوانی می‌شود، `getMetrics` تابع `calculateMetrics(data)` را اجرا کرده و نتیجه را در کش ذخیره می‌کند. اگر `getMetrics` دوباره با همان `data` فراخوانی شود، به جای اجرای دوبارهٔ `calculateMetrics(data)`، نتیجهٔ کش‌شده را برمی‌گرداند.

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

- `fn`: تابعی که می‌خواهید نتایج آن کش شوند. `fn` می‌تواند هر آرگومانی بپذیرد و هر مقداری را برگرداند.

#### مقادیر بازگشتی {/*returns*/}

`cache` نسخهٔ کش‌شده‌ای از `fn` با همان امضای نوع (type signature) برمی‌گرداند. در این فرایند، `fn` را فراخوانی نمی‌کند.

هنگام فراخوانی `cachedFn` با آرگومان‌های داده‌شده، ابتدا بررسی می‌کند که آیا نتیجه‌ای در کش وجود دارد یا خیر. اگر نتیجهٔ کش‌شده‌ای موجود باشد، آن را برمی‌گرداند. اگر نه، `fn` را با آن آرگومان‌ها فراخوانی می‌کند، نتیجه را در کش ذخیره کرده و آن را برمی‌گرداند. تنها زمانی که `fn` فراخوانی می‌شود، وقتی است که کش خطا بخورد (cache miss).

<Note>

بهینه‌سازیِ کش کردن مقادیر بازگشتی بر اساس ورودی‌ها، با نام [_مموری‌زیشن_](https://en.wikipedia.org/wiki/Memoization) شناخته می‌شود. ما به تابعی که از `cache` برمی‌گردد، تابع مموری‌شده (memoized function) می‌گوییم.

</Note>

#### موارد احتیاط {/*caveats*/}

[//]: # 'TODO: add links to Server/Client Component reference once https://github.com/reactjs/react.dev/pull/6177 is merged'

- ری‌اکت کش همهٔ توابع مموری‌شده را برای هر درخواست سرور، نامعتبر می‌کند.
- هر فراخوانی `cache` یک تابع جدید می‌سازد. این یعنی فراخوانی `cache` با همان تابع به دفعات، توابع مموری‌شدهٔ متفاوتی را برمی‌گرداند که کش مشترکی ندارند.
- `cachedFn` همچنین خطاها را هم کش می‌کند. اگر `fn` برای آرگومان‌های خاصی خطایی پرتاب کند، آن خطا کش می‌شود و هنگامی که `cachedFn` با همان آرگومان‌ها فراخوانی شود، همان خطا دوباره پرتاب می‌گردد.
- `cache` تنها برای استفاده در [کامپوننت‌های سرور](/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) است.

---

## استفاده {/*usage*/}

### کش کردن یک محاسبهٔ پرهزینه {/*cache-expensive-computation*/}

برای جلوگیری از کارهای تکراری از `cache` استفاده کنید.

```js [[1, 7, "getUserMetrics(user)"],[2, 13, "getUserMetrics(user)"]]
import {cache} from 'react';
import calculateUserMetrics from 'lib/user';

const getUserMetrics = cache(calculateUserMetrics);

function Profile({user}) {
  const metrics = getUserMetrics(user);
  // ...
}

function TeamReport({users}) {
  for (let user in users) {
    const metrics = getUserMetrics(user);
    // ...
  }
  // ...
}
```

اگر همان شیء `user` هم در `Profile` و هم در `TeamReport` رندر شود، این دو کامپوننت می‌توانند کار را با هم به اشتراک بگذارند و `calculateUserMetrics` را تنها یک بار برای آن `user` فراخوانی کنند.

فرض کنید `Profile` اول رندر می‌شود. این کامپوننت <CodeStep step={1}>`getUserMetrics`</CodeStep> را فراخوانی می‌کند و بررسی می‌کند آیا نتیجهٔ کش‌شده‌ای موجود است. چون اولین بار است که `getUserMetrics` با آن `user` فراخوانی می‌شود، کش خطا می‌دهد (cache miss). سپس `getUserMetrics` تابع `calculateUserMetrics` را با آن `user` فراخوانی می‌کند و نتیجه را در کش می‌نویسد.

هنگامی که `TeamReport` لیست `users` خود را رندر می‌کند و به همان شیء `user` می‌رسد، <CodeStep step={2}>`getUserMetrics`</CodeStep> را فراخوانی کرده و نتیجه را از کش می‌خواند.

<Pitfall>

##### فراخوانی توابع مموری‌شدهٔ متفاوت، از کش‌های متفاوتی می‌خواند. {/*pitfall-different-memoized-functions*/}

برای دسترسی به همان کش، کامپوننت‌ها باید همان تابع مموری‌شده را فراخوانی کنند.

```js [[1, 7, "getWeekReport"], [1, 7, "cache(calculateWeekReport)"], [1, 8, "getWeekReport"]]
// Temperature.js
import {cache} from 'react';
import {calculateWeekReport} from './report';

export function Temperature({cityData}) {
  // 🚩 Wrong: Calling `cache` in component creates new `getWeekReport` for each render
  const getWeekReport = cache(calculateWeekReport);
  const report = getWeekReport(cityData);
  // ...
}
```

```js [[2, 6, "getWeekReport"], [2, 6, "cache(calculateWeekReport)"], [2, 9, "getWeekReport"]]
// Precipitation.js
import {cache} from 'react';
import {calculateWeekReport} from './report';

// 🚩 Wrong: `getWeekReport` is only accessible for `Precipitation` component.
const getWeekReport = cache(calculateWeekReport);

export function Precipitation({cityData}) {
  const report = getWeekReport(cityData);
  // ...
}
```

در مثال بالا، <CodeStep step={2}>`Precipitation`</CodeStep> و <CodeStep step={1}>`Temperature`</CodeStep> هر کدام `cache` را فراخوانی می‌کنند تا یک تابع مموری‌شدهٔ جدید با جستجوی کش اختصاصی خود بسازند. اگر هر دو کامپوننت برای یک `cityData` یکسان رندر شوند، کار تکراری برای فراخوانی `calculateWeekReport` انجام می‌دهند.

علاوه بر این، `Temperature` هر بار که کامپوننت رندر می‌شود یک <CodeStep step={1}>تابع مموری‌شدهٔ جدید</CodeStep> می‌سازد که اجازهٔ اشتراک‌گذاری کش را نمی‌دهد.

برای بیشترین بهره از کش و کاهش کار، دو کامپوننت باید همان تابع مموری‌شده را برای دسترسی به همان کش فراخوانی کنند. در عوض، تابع مموری‌شده را در یک ماژول اختصاصی تعریف کنید که بتواند میان کامپوننت‌ها [`import` شود](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

```js [[3, 5, "export default cache(calculateWeekReport)"]]
// getWeekReport.js
import {cache} from 'react';
import {calculateWeekReport} from './report';

export default cache(calculateWeekReport);
```

```js [[3, 2, "getWeekReport", 0], [3, 5, "getWeekReport"]]
// Temperature.js
import getWeekReport from './getWeekReport';

export default function Temperature({cityData}) {
        const report = getWeekReport(cityData);
  // ...
}
```

```js [[3, 2, "getWeekReport", 0], [3, 5, "getWeekReport"]]
// Precipitation.js
import getWeekReport from './getWeekReport';

export default function Precipitation({cityData}) {
  const report = getWeekReport(cityData);
  // ...
}
```
در اینجا، هر دو کامپوننت <CodeStep step={3}>همان تابع مموری‌شده</CodeStep> را که از `./getWeekReport.js` صادر شده است فراخوانی می‌کنند تا از همان کش بخوانند و در آن بنویسند.
</Pitfall>

### اشتراک‌گذاری یک اسنپ‌شات از داده {/*take-and-share-snapshot-of-data*/}

برای اشتراک‌گذاری یک اسنپ‌شات از داده میان کامپوننت‌ها، `cache` را با یک تابع واکشی داده مانند `fetch` فراخوانی کنید. وقتی چندین کامپوننت همان واکشی داده را انجام می‌دهند، تنها یک درخواست صادر می‌شود و داده‌های بازگشتی کش شده و میان کامپوننت‌ها به اشتراک گذاشته می‌شوند. همهٔ کامپوننت‌ها در طول رندر سرور به همان اسنپ‌شات داده ارجاع می‌دهند.

```js [[1, 4, "city"], [1, 5, "fetchTemperature(city)"], [2, 4, "getTemperature"], [2, 9, "getTemperature"], [1, 9, "city"], [2, 14, "getTemperature"], [1, 14, "city"]]
import {cache} from 'react';
import {fetchTemperature} from './api.js';

const getTemperature = cache(async (city) => {
        return await fetchTemperature(city);
});

async function AnimatedWeatherCard({city}) {
        const temperature = await getTemperature(city);
        // ...
}

async function MinimalWeatherCard({city}) {
        const temperature = await getTemperature(city);
        // ...
}
```

اگر `AnimatedWeatherCard` و `MinimalWeatherCard` هر دو برای یک <CodeStep step={1}>شهر</CodeStep> یکسان رندر شوند، همان اسنپ‌شات داده را از <CodeStep step={2}>تابع مموری‌شده</CodeStep> دریافت می‌کنند.

اگر `AnimatedWeatherCard` و `MinimalWeatherCard` آرگومان‌های <CodeStep step={1}>شهر</CodeStep> متفاوتی به <CodeStep step={2}>`getTemperature`</CodeStep> بدهند، آنگاه `fetchTemperature` دو بار فراخوانی می‌شود و هر محل فراخوانی داده‌های متفاوتی دریافت می‌کند.

<CodeStep step={1}>شهر</CodeStep> به عنوان کلید کش عمل می‌کند.

<Note>

[//]: # 'TODO: add links to Server Components when merged.'

<CodeStep step={3}>رندر ناهمگام (Asynchronous rendering)</CodeStep> تنها برای کامپوننت‌های سرور پشتیبانی می‌شود.

```js [[3, 1, "async"], [3, 2, "await"]]
async function AnimatedWeatherCard({city}) {
        const temperature = await getTemperature(city);
        // ...
}
```
[//]: # 'TODO: add link and mention to use documentation when merged'
[//]: # 'To render components that use asynchronous data in Client Components, see `use` documentation.'

</Note>

### پیش‌بارگذاری داده {/*preload-data*/}

با کش کردن یک واکشی دادهٔ طولانی، می‌توانید کار ناهمگام را پیش از رندر کامپوننت آغاز کنید.

```jsx [[2, 6, "await getUser(id)"], [1, 17, "getUser(id)"]]
const getUser = cache(async (id) => {
  return await db.user.query(id);
});

async function Profile({id}) {
  const user = await getUser(id);
  return (
    <section>
      <img src={user.profilePic} />
      <h2>{user.name}</h2>
    </section>
  );
}

function Page({id}) {
  // ✅ Good: start fetching the user data
  getUser(id);
  // ... some computational work
  return (
    <>
      <Profile id={id} />
    </>
  );
}
```

هنگام رندر `Page`، کامپوننت <CodeStep step={1}>`getUser`</CodeStep> را فراخوانی می‌کند، اما توجه کنید که از دادهٔ بازگشتی استفاده نمی‌کند. این فراخوانی زودهنگام <CodeStep step={1}>`getUser`</CodeStep> پرس‌وجوی ناهمگام پایگاه داده را آغاز می‌کند که در حالی رخ می‌دهد که `Page` در حال انجام سایر کارهای محاسباتی و رندر فرزندان است.

هنگام رندر `Profile`، <CodeStep step={2}>`getUser`</CodeStep> را دوباره فراخوانی می‌کنیم. اگر فراخوانی اولیهٔ <CodeStep step={1}>`getUser`</CodeStep> از قبل برگشته و دادهٔ کاربر را کش کرده باشد، وقتی `Profile` <CodeStep step={2}>این داده را درخواست کرده و منتظر آن می‌ماند</CodeStep>، می‌تواند به سادگی از کش بخواند بدون آنکه فراخوانی رویه‌ای دوردست دیگری لازم باشد. اگر <CodeStep step={1}>درخواست دادهٔ اولیه</CodeStep> هنوز تکمیل نشده باشد، پیش‌بارگذاری داده با این الگو، تأخیر در واکشی داده را کاهش می‌دهد.

<DeepDive>

#### کش کردن کار ناهمگام {/*caching-asynchronous-work*/}

هنگام ارزیابی یک [تابع ناهمگام](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)، یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) برای آن کار دریافت می‌کنید. promise وضعیت آن کار (_pending_، _fulfilled_، _failed_) و نتیجهٔ نهایی settled را نگه می‌دارد.

در این مثال، تابع ناهمگام <CodeStep step={1}>`fetchData`</CodeStep> یک promise برمی‌گرداند که منتظر `fetch` است.

```js [[1, 1, "fetchData()"], [2, 8, "getData()"], [3, 10, "getData()"]]
async function fetchData() {
  return await fetch(`https://...`);
}

const getData = cache(fetchData);

async function MyComponent() {
  getData();
  // ... some computational work
  await getData();
  // ...
}
```

با فراخوانی <CodeStep step={2}>`getData`</CodeStep> برای بار اول، promise بازگشتی از <CodeStep step={1}>`fetchData`</CodeStep> کش می‌شود. جستجوهای بعدی سپس همان promise را برمی‌گردانند.

توجه کنید که فراخوانی اول <CodeStep step={2}>`getData`</CodeStep> از `await` استفاده نمی‌کند، اما <CodeStep step={3}>فراخوانی دوم</CodeStep> استفاده می‌کند. [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) یک عملگر جاوااسکریپت است که منتظر می‌ماند و نتیجهٔ settled شدهٔ promise را برمی‌گرداند. اولین فراخوانی <CodeStep step={2}>`getData`</CodeStep> صرفاً `fetch` را آغاز می‌کند تا promise برای جستجوی <CodeStep step={3}>`getData`</CodeStep> دوم کش شود.

اگر تا <CodeStep step={3}>فراخوانی دوم</CodeStep> promise هنوز _pending_ باشد، آنگاه `await` برای نتیجه مکث می‌کند. بهینه‌سازی این است که در حالی که منتظر `fetch` هستیم، ری‌اکت می‌تواند به کار محاسباتی ادامه دهد، و در نتیجه زمان انتظار <CodeStep step={3}>فراخوانی دوم</CodeStep> کاهش می‌یابد.

اگر promise از قبل settled شده باشد، چه به خطا چه به نتیجهٔ _fulfilled_، `await` آن مقدار را بلافاصله برمی‌گرداند. در هر دو حالت، بهرهٔ عملکردی وجود دارد.
</DeepDive>

<Pitfall>

##### فراخوانی یک تابع مموری‌شده خارج از یک کامپوننت از کش استفاده نمی‌کند. {/*pitfall-memoized-call-outside-component*/}

```jsx [[1, 3, "getUser"]]
import {cache} from 'react';

const getUser = cache(async (userId) => {
  return await db.user.query(userId);
});

// 🚩 Wrong: Calling memoized function outside of component will not memoize.
getUser('demo-id');

async function DemoProfile() {
  // ✅ Good: `getUser` will memoize.
  const user = await getUser('demo-id');
  return <Profile user={user} />;
}
```

ری‌اکت تنها در یک کامپوننت به تابع مموری‌شده دسترسی کش می‌دهد. هنگام فراخوانی <CodeStep step={1}>`getUser`</CodeStep> خارج از یک کامپوننت، تابع ارزیابی می‌شود اما از کش نمی‌خواند و آن را به‌روزرسانی نمی‌کند.

این به این دلیل است که دسترسی به کش از طریق یک [کانتکست](/learn/passing-data-deeply-with-context) فراهم می‌شود که تنها از یک کامپوننت قابل دسترسی است.

</Pitfall>

<DeepDive>

#### چه زمانی باید از `cache`، [`memo`](/reference/react/memo) یا [`useMemo`](/reference/react/useMemo) استفاده کنم؟ {/*cache-memo-usememo*/}

همهٔ APIهای ذکرشده مموری‌زیشن را ارائه می‌کنند، اما تفاوت در این است که قصد دارند چه چیزی را مموری کنند، چه کسی به کش دسترسی دارد و کش چه زمانی نامعتبر می‌شود.

#### `useMemo` {/*deep-dive-use-memo*/}

به طور کلی، برای کش کردن یک محاسبهٔ پرهزینه در یک کامپوننت کلاینت میان رندرها، باید از [`useMemo`](/reference/react/useMemo) استفاده کنید. برای مثال، مموری‌زیشن یک تبدیل از داده درون یک کامپوننت.

```jsx {expectedErrors: {'react-compiler': [4]}} {4}
'use client';

function WeatherReport({record}) {
  const avgTemp = useMemo(() => calculateAvg(record), record);
  // ...
}

function App() {
  const record = getRecord();
  return (
    <>
      <WeatherReport record={record} />
      <WeatherReport record={record} />
    </>
  );
}
```
در این مثال، `App` دو `WeatherReport` با همان record رندر می‌کند. حتی اگر هر دو کامپوننت کار یکسانی انجام دهند، نمی‌توانند کار را به اشتراک بگذارند. کش `useMemo` تنها محلی به کامپوننت است.

با این حال، `useMemo` تضمین می‌کند که اگر `App` دوباره رندر شود و شیء `record` تغییر نکند، هر نمونهٔ کامپوننت از کار صرف‌نظر کرده و از مقدار مموری‌شدهٔ `avgTemp` استفاده می‌کند. `useMemo` تنها آخرین محاسبهٔ `avgTemp` را با وابستگی‌های داده‌شده کش می‌کند.

#### `cache` {/*deep-dive-cache*/}

به طور کلی، باید از `cache` در کامپوننت‌های سرور برای مموری‌زیشن کاری استفاده کنید که می‌تواند میان کامپوننت‌ها به اشتراک گذاشته شود.

```js [[1, 12, "<WeatherReport city={city} />"], [3, 13, "<WeatherReport city={city} />"], [2, 1, "cache(fetchReport)"]]
const cachedFetchReport = cache(fetchReport);

function WeatherReport({city}) {
  const report = cachedFetchReport(city);
  // ...
}

function App() {
  const city = "Los Angeles";
  return (
    <>
      <WeatherReport city={city} />
      <WeatherReport city={city} />
    </>
  );
}
```
با بازنویسی مثال قبلی برای استفاده از `cache`، در این حالت <CodeStep step={3}>نمونهٔ دوم `WeatherReport`</CodeStep> می‌تواند از کار تکراری صرف‌نظر کند و از همان کش <CodeStep step={1}>اولین `WeatherReport`</CodeStep> بخواند. تفاوت دیگر با مثال قبلی این است که `cache` برای <CodeStep step={2}>مموری‌زیشن واکشی‌های داده</CodeStep> نیز توصیه می‌شود، برخلاف `useMemo` که تنها باید برای محاسبات استفاده شود.

در حال حاضر، `cache` تنها باید در کامپوننت‌های سرور استفاده شود و کش میان درخواست‌های سرور نامعتبر می‌شود.

#### `memo` {/*deep-dive-memo*/}

برای جلوگیری از رندر دوبارهٔ یک کامپوننت در صورتی که پراپس آن تغییر نکرده، باید از [`memo`](reference/react/memo) استفاده کنید.

```js
'use client';

function WeatherReport({record}) {
  const avgTemp = calculateAvg(record);
  // ...
}

const MemoWeatherReport = memo(WeatherReport);

function App() {
  const record = getRecord();
  return (
    <>
      <MemoWeatherReport record={record} />
      <MemoWeatherReport record={record} />
    </>
  );
}
```

در این مثال، هر دو کامپوننت `MemoWeatherReport` هنگام رندر اول `calculateAvg` را فراخوانی می‌کنند. با این حال، اگر `App` دوباره رندر شود بدون اینکه `record` تغییر کند، هیچ‌کدام از پراپس‌ها تغییر نکرده و `MemoWeatherReport` دوباره رندر نخواهد شد.

در مقایسه با `useMemo`، `memo` رندر کامپوننت را بر اساس پراپس مموری می‌کند، نه بر اساس محاسبات خاص. مشابه `useMemo`، کامپوننت مموری‌شده تنها آخرین رندر را با آخرین مقادیر پراپس کش می‌کند. به‌محض تغییر پراپس، کش نامعتبر شده و کامپوننت دوباره رندر می‌شود.

</DeepDive>

---

## رفع اشکال {/*troubleshooting*/}

### تابع مموری‌شدهٔ من همچنان اجرا می‌شود با اینکه با همان آرگومان‌ها فراخوانی‌اش کرده‌ام {/*memoized-function-still-runs*/}

به موارد احتیاط پیش‌تر ذکرشده مراجعه کنید:
* [فراخوانی توابع مموری‌شدهٔ متفاوت از کش‌های متفاوتی می‌خواند.](#pitfall-different-memoized-functions)
* [فراخوانی یک تابع مموری‌شده خارج از یک کامپوننت از کش استفاده نمی‌کند.](#pitfall-memoized-call-outside-component)

اگر هیچ‌کدام از موارد بالا صدق نکند، ممکن است مشکل از نحوهٔ بررسی کش توسط ری‌اکت برای وجود یک چیز باشد.

اگر آرگومان‌های شما [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) نیستند (مثلاً اشیاء، توابع، آرایه‌ها)، مطمئن شوید همان مرجع شیء را پاس می‌دهید.

هنگام فراخوانی یک تابع مموری‌شده، ری‌اکت آرگومان‌های ورودی را بررسی می‌کند تا ببیند آیا نتیجه‌ای از قبل کش شده است. ری‌اکت برای تعیین cache hit از برابری سطحی (shallow equality) آرگومان‌ها استفاده می‌کند.

```js
import {cache} from 'react';

const calculateNorm = cache((vector) => {
  // ...
});

function MapMarker(props) {
  // 🚩 Wrong: props is an object that changes every render.
  const length = calculateNorm(props);
  // ...
}

function App() {
  return (
    <>
      <MapMarker x={10} y={10} z={10} />
      <MapMarker x={10} y={10} z={10} />
    </>
  );
}
```

در این حالت، دو `MapMarker` به نظر می‌رسد کار یکسانی انجام می‌دهند و `calculateNorm` را با همان مقدار `{x: 10, y: 10, z:10}` فراخوانی می‌کنند. حتی اگر اشیاء شامل همان مقادیر باشند، آن‌ها همان مرجع شیء نیستند، زیرا هر کامپوننت شیء `props` خودش را می‌سازد.

ری‌اکت برای بررسی cache hit، [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) را روی ورودی فراخوانی می‌کند.

```js {3,9}
import {cache} from 'react';

const calculateNorm = cache((x, y, z) => {
  // ...
});

function MapMarker(props) {
  // ✅ Good: Pass primitives to memoized function
  const length = calculateNorm(props.x, props.y, props.z);
  // ...
}

function App() {
  return (
    <>
      <MapMarker x={10} y={10} z={10} />
      <MapMarker x={10} y={10} z={10} />
    </>
  );
}
```

یک راه برای حل این مشکل می‌تواند پاس‌دادن ابعاد بردار به `calculateNorm` باشد. این کار می‌کند چون خود ابعاد primitives هستند.

راه‌حل دیگر می‌تواند پاس‌دادن خود شیء بردار به عنوان یک پراپ به کامپوننت باشد. باید همان شیء را به هر دو نمونهٔ کامپوننت پاس بدهیم.

```js {3,9,14}
import {cache} from 'react';

const calculateNorm = cache((vector) => {
  // ...
});

function MapMarker(props) {
  // ✅ Good: Pass the same `vector` object
  const length = calculateNorm(props.vector);
  // ...
}

function App() {
  const vector = [10, 10, 10];
  return (
    <>
      <MapMarker vector={vector} />
      <MapMarker vector={vector} />
    </>
  );
}
```
