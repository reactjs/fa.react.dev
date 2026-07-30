---
title: memo
---

<Intro>

`memo` به شما اجازه می‌دهد از رندر دوبارهٔ یک کامپوننت زمانی که پراپس‌های آن تغییر نکرده‌اند، صرف‌نظر کنید.

```
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) به‌طور خودکار معادل `memo` را روی همهٔ کامپوننت‌ها اعمال می‌کند و نیاز به مموری‌زیشن دستی را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار مموری‌زیشن کامپوننت‌ها استفاده کنید.

</Note>

<InlineToc />

---

## مرجع {/*reference*/}

### `memo(Component, arePropsEqual?)` {/*memo*/}

یک کامپوننت را در `memo` بپیچانید تا نسخهٔ *مموری‌شدهٔ* آن کامپوننت را به‌دست آورید. این نسخهٔ مموری‌شده از کامپوننت شما معمولاً هنگامی که کامپوننت والد دوباره رندر می‌شود، تا زمانی که پراپس‌هایش تغییر نکرده باشند، دوباره رندر نمی‌شود. اما ری‌اکت همچنان ممکن است آن را دوباره رندر کند: مموری‌زیشن یک بهینه‌سازی عملکرد است، نه یک تضمین.

```js
import { memo } from 'react';

const SomeComponent = memo(function SomeComponent(props) {
  // ...
});
```

[مثال‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `Component`: کامپوننتی که می‌خواهید مموری‌زیشن کنید. `memo` این کامپوننت را تغییر نمی‌دهد، بلکه در عوض یک کامپوننت جدید و مموری‌شده برمی‌گرداند. هر کامپوننت معتبر ری‌اکت، شامل توابع و کامپوننت‌های [`forwardRef`](/reference/react/forwardRef)، پذیرفته می‌شود.

* **اختیاری** `arePropsEqual`: تابعی که دو آرگومان می‌پذیرد: پراپس‌های قبلی کامپوننت، و پراپس‌های جدید آن. این تابع باید `true` را برگرداند اگر پراپس‌های قدیمی و جدید برابر باشند: یعنی اگر کامپوننت با پراپس‌های جدید همان خروجی را رندر کند و همان‌گونه رفتار کند که با پراپس‌های قدیمی. در غیر این صورت باید `false` برگرداند. معمولاً این تابع را تعیین نمی‌کنید. به‌طور پیش‌فرض، ری‌اکت هر پراپ را با [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند.

#### مقادیر بازگشتی {/*returns*/}

`memo` یک کامپوننت جدید ری‌اکت برمی‌گرداند. این کامپوننت مانند کامپوننت ارائه‌شده به `memo` رفتار می‌کند، با این تفاوت که ری‌اکت هنگام رندر دوبارهٔ والد، لزوماً آن را دوباره رندر نمی‌کند، مگر آنکه پراپس‌هایش تغییر کرده باشند.

---

## استفاده {/*usage*/}

### صرف‌نظر از رندر دوباره هنگامی که پراپس‌ها تغییر نکرده‌اند {/*skipping-re-rendering-when-props-are-unchanged*/}

ری‌اکت معمولاً هر زمان که والد یک کامپوننت دوباره رندر شود، آن کامپوننت را دوباره رندر می‌کند. با `memo`، می‌توانید کامپوننتی بسازید که ری‌اکت هنگام رندر دوبارهٔ والد، تا زمانی که پراپس‌های جدیدش با پراپس‌های قدیمی یکسان باشند، آن را دوباره رندر نکند. چنین کامپوننتی *مموری‌شده* (memoized) گفته می‌شود.

برای مموری‌زیشن یک کامپوننت، آن را در `memo` بپیچانید و از مقدار بازگشتی به جای کامپوننت اصلی خود استفاده کنید:

```js
const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

export default Greeting;
```

یک کامپوننت ری‌اکت باید همیشه دارای [منطق رندر خالص](/learn/keeping-components-pure) باشد. این یعنی اگر پراپس‌ها، استیت و کانتکست آن تغییر نکرده باشند، باید همان خروجی را برگرداند. با استفاده از `memo`، به ری‌اکت می‌گویید که کامپوننت شما با این نیاز مطابقت دارد، بنابراین تا زمانی که پراپس‌هایش تغییر نکرده باشند، نیازی به رندر دوباره نیست. حتی با `memo`، اگر استیت خود کامپوننت تغییر کند یا کانتکستی که استفاده می‌کند تغییر کند، کامپوننت شما دوباره رندر می‌شود.

در این مثال، توجه کنید که کامپوننت `Greeting` هر زمان که `name` تغییر کند (زیرا این یکی از پراپس‌هایش است) دوباره رندر می‌شود، اما هنگامی که `address` تغییر کند، این اتفاق نمی‌افتد (زیرا به‌عنوان پراپ به `Greeting` پاس داده نمی‌شود):

<Sandpack>

```js
import { memo, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3>Hello{name && ', '}{name}!</h3>;
});
```

```css
label {
  display: block;
  margin-bottom: 16px;
}
```

</Sandpack>

<Note>

**باید تنها به `memo` به‌عنوان یک بهینه‌سازی عملکرد تکیه کنید.** اگر کدتان بدون آن کار نمی‌کند، مشکل زمینه‌ای را پیدا کرده و ابتدا آن را برطرف کنید. سپس می‌توانید برای بهبود عملکرد `memo` را اضافه کنید.

</Note>

<DeepDive>

#### آیا باید `memo` را همه‌جا اضافه کنید؟ {/*should-you-add-memo-everywhere*/}

اگر اپلیکیشن شما مانند این سایت است و بیشتر تعاملات درشت هستند (مانند جایگزینی یک صفحه یا یک بخش کامل)، معمولاً مموری‌زیشن ضروری نیست. از طرف دیگر، اگر اپلیکیشن شما بیشتر شبیه یک ویرایشگر طراحی است و بیشتر تعاملات ریزدانه هستند (مانند جابجایی اشکال)، ممکن است متوجه شوید مموری‌زیشن بسیار کمک‌کننده است.

بهینه‌سازی با `memo` تنها زمانی ارزش دارد که کامپوننت شما اغلب با همان پراپس‌های دقیق دوباره رندر می‌شود و منطق رندر دوبارهٔ آن پرهزینه است. اگر هنگام رندر دوبارهٔ کامپوننت شما تأخیر محسوسی وجود ندارد، `memo` ضروری نیست. در نظر داشته باشید که اگر پراپس‌های پاس داده‌شده به کامپوننت شما *همیشه متفاوت* هستند، `memo` کاملاً بی‌فایده است؛ مثلاً اگر یک شیء یا تابع ساده‌ای که هنگام رندر تعریف شده را پاس بدهید. به همین دلیل است که اغلب باید از [`useMemo`](/reference/react/useMemo#skipping-re-rendering-of-components) و [`useCallback`](/reference/react/useCallback#skipping-re-rendering-of-components) همراه با `memo` استفاده کنید.

در سایر موارد، هیچ سودی در پیچیدن یک کامپوننت در `memo` نیست. آسیب قابل‌توجهی هم وجود ندارد، بنابراین برخی تیم‌ها انتخاب می‌کنند به موارد فردی فکر نکنند و تا حد امکان مموری‌زیشن کنند. نقطهٔ ضعف این رویکرد این است که خوانایی کد کاهش می‌یابد. همچنین، همهٔ مموری‌زیشن‌ها مؤثر نیستند: یک مقدار واحد که «همیشه جدید» است، برای شکستن مموری‌زیشن یک کامپوننت کامل کافی است.

**در عمل، می‌توانید با پیروی از چند اصل، بسیاری از مموری‌زیشن‌ها را غیرضروری کنید:**

1. وقتی یک کامپوننت به‌صورت بصری کامپوننت‌های دیگر را می‌پوشاند، بگذارید [JSX را به‌عنوان children بپذیرد.](/learn/passing-props-to-a-component#passing-jsx-as-children) به این ترتیب، وقتی کامپوننت پوشاننده استیت خودش را به‌روزرسانی می‌کند، ری‌اکت می‌داند که فرزندانش نیازی به رندر دوباره ندارند.
1. استیت محلی را ترجیح دهید و [بالا بردن استیت](/learn/sharing-state-between-components) را بیش از حد ضرورت انجام ندهید. برای مثال، استیت گذرایی مانند فرم‌ها و اینکه آیا یک آیتم هاور شده است را در بالای درخت خود یا در یک کتابخانهٔ استیت سراسری نگه ندارید.
1. [منطق رندر خود را خالص نگه دارید.](/learn/keeping-components-pure) اگر رندر دوبارهٔ یک کامپوننت باعث مشکل می‌شود یا یکی از موارد مصنوعات بصری قابل‌توجه تولید می‌کند، این یک باگ در کامپوننت شماست! به جای افزودن مموری‌زیشن، باگ را برطرف کنید.
1. از [افکت‌های غیرضروری که استیت را به‌روزرسانی می‌کنند](/learn/you-might-not-need-an-effect) اجتناب کنید. بیشتر مشکلات عملکرد در اپلیکیشن‌های ری‌اکت ناشی از زنجیره‌ای از به‌روزرسانی‌ها است که از افکت‌ها سرچشمه می‌گیرند و باعث می‌شوند کامپوننت‌های شما بارها و بارها رندر شوند.
1. سعی کنید [وابستگی‌های غیرضروری را از افکت‌های خود حذف کنید.](/learn/removing-effect-dependencies) برای مثال، به‌جای مموری‌زیشن، اغلب ساده‌تر است که یک شیء یا تابع را درون افکت یا خارج از کامپوننت منتقل کنید.

اگر یک تعامل خاص همچنان کند به‌نظر می‌رسد، [از پروفایلر ابزارهای توسعه‌دهنده ری‌اکت](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) استفاده کنید تا ببینید کدام کامپوننت‌ها بیشترین بهره را از مموری‌زیشن می‌برند و در صورت لزوم مموری‌زیشن را اضافه کنید. این اصول اشکال‌زدایی و درک کامپوننت‌های شما را آسان‌تر می‌کنند، بنابراین در هر صورتی بهتر است از آن‌ها پیروی کنید. در درازمدت، ما در حال پژوهش روی [انجام مموری‌زیشن ریزدانه به‌صورت خودکار](https://www.youtube.com/watch?v=lGEMwh32soc) هستیم تا این مسئله را برای همیشه حل کنیم.

</DeepDive>

---

### به‌روزرسانی یک کامپوننت مموری‌شده با استفاده از استیت {/*updating-a-memoized-component-using-state*/}

حتی وقتی یک کامپوننت مموری‌شده است، هنگامی که استیت خودش تغییر کند، دوباره رندر می‌شود. مموری‌زیشن فقط به پراپس‌هایی مربوط است که از والد به کامپوننت پاس داده می‌شوند.

<Sandpack>

```js
import { memo, useState } from 'react';

export default function MyApp() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log('Greeting was rendered at', new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('Hello');
  return (
    <>
      <h3>{greeting}{name && ', '}{name}!</h3>
      <GreetingSelector value={greeting} onChange={setGreeting} />
    </>
  );
});

function GreetingSelector({ value, onChange }) {
  return (
    <>
      <label>
        <input
          type="radio"
          checked={value === 'Hello'}
          onChange={e => onChange('Hello')}
        />
        Regular greeting
      </label>
      <label>
        <input
          type="radio"
          checked={value === 'Hello and welcome'}
          onChange={e => onChange('Hello and welcome')}
        />
        Enthusiastic greeting
      </label>
    </>
  );
}
```

```css
label {
  display: block;
  margin-bottom: 16px;
}
```

</Sandpack>

اگر یک متغیر استیت را به مقدار فعلی‌اش تنظیم کنید، ری‌اکت حتی بدون `memo` از رندر دوبارهٔ کامپوننت شما صرف‌نظر می‌کند. ممکن است همچنان یک فراخوانی اضافی از تابع کامپوننت خود را ببینید، اما نتیجه دور انداخته می‌شود.

---

### به‌روزرسانی یک کامپوننت مموری‌شده با استفاده از کانتکست {/*updating-a-memoized-component-using-a-context*/}

حتی وقتی یک کامپوننت مموری‌شده است، هنگامی که کانتکستی که استفاده می‌کند تغییر کند، دوباره رندر می‌شود. مموری‌زیشن فقط به پراپس‌هایی مربوط است که از والد به کامپوننت پاس داده می‌شوند.

<Sandpack>

```js
import { createContext, memo, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const [theme, setTheme] = useState('dark');

  function handleClick() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext value={theme}>
      <button onClick={handleClick}>
        Switch theme
      </button>
      <Greeting name="Taylor" />
    </ThemeContext>
  );
}

const Greeting = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  const theme = useContext(ThemeContext);
  return (
    <h3 className={theme}>Hello, {name}!</h3>
  );
});
```

```css
label {
  display: block;
  margin-bottom: 16px;
}

.light {
  color: black;
  background-color: white;
}

.dark {
  color: white;
  background-color: black;
}
```

</Sandpack>

برای آنکه کامپوننت شما تنها هنگام تغییر _بخشی_ از یک کانتکست دوباره رندر شود، کامپوننت خود را به دو بخش تقسیم کنید. آنچه را که نیاز دارید از کانتکست در کامپوننت بیرونی بخوانید، و آن را به‌عنوان پراپ به یک فرزند مموری‌شده پاس دهید.

---

### به حداقل رساندن تغییرات پراپس {/*minimizing-props-changes*/}

هنگامی که از `memo` استفاده می‌کنید، کامپوننت شما هر بار که هر پراپ با مقدار قبلی خود *از نظر سطحی برابر نباشد*، دوباره رندر می‌شود. این یعنی ری‌اکت هر پراپ در کامپوننت شما را با مقدار قبلی‌اش با مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. توجه کنید که `Object.is(3, 3)` مقدار `true` است، اما `Object.is({}, {})` مقدار `false` است.


برای بیشترین بهره از `memo`، دفعات تغییر پراپس‌ها را به حداقل برسانید. برای مثال، اگر پراپ یک شیء است، با استفاده از [`useMemo`:](/reference/react/useMemo) از ایجاد دوبارهٔ آن شیء توسط کامپوننت والد در هر بار جلوگیری کنید:

```js {5-8}
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);

  const person = useMemo(
    () => ({ name, age }),
    [name, age]
  );

  return <Profile person={person} />;
}

const Profile = memo(function Profile({ person }) {
  // ...
});
```

یک راه بهتر برای به حداقل رساندن تغییرات پراپس این است که مطمئن شوید کامپوننت حداقل اطلاعات ضروری را در پراپس‌هایش می‌پذیرد. برای مثال، می‌تواند به جای یک شیء کامل، مقادیر منفرد بپذیرد:

```js {4,7}
function Page() {
  const [name, setName] = useState('Taylor');
  const [age, setAge] = useState(42);
  return <Profile name={name} age={age} />;
}

const Profile = memo(function Profile({ name, age }) {
  // ...
});
```

حتی مقادیر منفرد نیز گاهی می‌توانند به مقادیری که کمتر تغییر می‌کنند، نگاشت شوند. برای مثال، در اینجا یک کامپوننت یک مقدار بولی نشان‌دهندهٔ وجود یک مقدار را به جای خود مقدار می‌پذیرد:

```js {3}
function GroupsLanding({ person }) {
  const hasGroups = person.groups !== null;
  return <CallToAction hasGroups={hasGroups} />;
}

const CallToAction = memo(function CallToAction({ hasGroups }) {
  // ...
});
```

هنگامی که نیاز به پاس‌دادن یک تابع به کامپوننت مموری‌شده دارید، یا آن را خارج از کامپوننت خود تعریف کنید تا هرگز تغییر نکند، یا از [`useCallback`](/reference/react/useCallback#skipping-re-rendering-of-components) برای کش کردن تعریف آن میان رندرهای مجدد استفاده کنید.

---

### تعیین یک تابع مقایسهٔ سفارشی {/*specifying-a-custom-comparison-function*/}

در موارد نادر، به حداقل رساندن تغییرات پراپس‌های یک کامپوننت مموری‌شده ممکن است غیرعملی باشد. در این حالت، می‌توانید یک تابع مقایسهٔ سفارشی ارائه دهید که ری‌اکت به جای برابری سطحی از آن برای مقایسهٔ پراپس‌های قدیمی و جدید استفاده می‌کند. این تابع به‌عنوان آرگومان دوم به `memo` پاس داده می‌شود. این تابع باید تنها در صورتی `true` برگرداند که پراپس‌های جدید همان خروجی پراپس‌های قدیمی را تولید کنند؛ در غیر این صورت باید `false` برگرداند.

```js {3}
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
```

اگر این کار را می‌کنید، از پنل Performance در ابزارهای توسعه‌دهندهٔ مرورگر خود استفاده کنید تا مطمئن شوید تابع مقایسهٔ شما در واقع سریع‌تر از رندر دوبارهٔ کامپوننت است. ممکن است تعجب کنید.

هنگام انجام اندازه‌گیری‌های عملکردی، مطمئن شوید که ری‌اکت در حالت production اجرا می‌شود.

<Pitfall>

اگر یک پیاده‌سازی سفارشی `arePropsEqual` ارائه می‌دهید، **باید هر پراپ، از جمله توابع را مقایسه کنید.** توابع اغلب بر پراپس‌ها و استیت کامپوننت‌های والد [بسته‌بندی می‌شوند (closure)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures). اگر `true` را هنگامی که `oldProps.onClick !== newProps.onClick` برگردانید، کامپوننت شما درون هندلر `onClick` خود همچنان پراپس‌ها و استیت از یک رندر قبلی را «می‌بیند» و این منجر به باگ‌های بسیار گیج‌کننده‌ای می‌شود.

از انجام بررسی‌های برابری عمیق درون `arePropsEqual` اجتناب کنید، مگر آنکه ۱۰۰٪ مطمئن باشید ساختار داده‌ای که با آن کار می‌کنید عمق محدود و شناخته‌شده‌ای دارد. **بررسی‌های برابری عمیق می‌توانند به‌شدت کند شوند** و اگر کسی بعداً ساختار داده را تغییر دهد، می‌توانند اپلیکیشن شما را برای چندین ثانیه متوقف کنند.

</Pitfall>

---

### اگر از React Compiler استفاده می‌کنم، آیا همچنان به React.memo نیاز دارم؟ {/*react-compiler-memo*/}

هنگامی که [React Compiler](/learn/react-compiler) را فعال می‌کنید، معمولاً دیگر به `React.memo` نیاز ندارید. کامپایلر به‌طور خودکار رندر دوبارهٔ کامپوننت را برای شما بهینه می‌کند.

نحوهٔ کار آن به این شکل است:

**بدون React Compiler**، برای جلوگیری از رندرهای مجدد غیرضروری به `React.memo` نیاز دارید:

```js
// Parent re-renders every second
function Parent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>Seconds: {seconds}</h1>
      <ExpensiveChild name="John" />
    </>
  );
}

// Without memo, this re-renders every second even though props don't change
const ExpensiveChild = memo(function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');
  return <div>Hello, {name}!</div>;
});
```

**با فعال‌بودن React Compiler**، همان بهینه‌سازی به‌طور خودکار رخ می‌دهد:

```js
// No memo needed - compiler prevents re-renders automatically
function ExpensiveChild({ name }) {
  console.log('ExpensiveChild rendered');
  return <div>Hello, {name}!</div>;
}
```

در اینجا بخش کلیدی چیزی است که React Compiler تولید می‌کند:

```js {6-12}
function Parent() {
  const $ = _c(7);
  const [seconds, setSeconds] = useState(0);
  // ... other code ...

  let t3;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = <ExpensiveChild name="John" />;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  // ... return statement ...
}
```

به خطوط هایلایت‌شده توجه کنید: کامپایلر `<ExpensiveChild name="John" />` را در یک بررسی کش می‌پیچد. چون پراپ `name` همیشه `"John"` است، این JSX یک‌بار ایجاد شده و در هر رندر دوبارهٔ والد استفاده مجدد می‌شود. این دقیقاً همان کاری است که `React.memo` انجام می‌دهد - از رندر دوبارهٔ فرزند هنگامی که پراپس‌هایش تغییر نکرده‌اند، جلوگیری می‌کند.

React Compiler به‌طور خودکار:
1. پیگیری می‌کند که پراپ `name` پاس داده‌شده به `ExpensiveChild` تغییر نکرده است
2. از JSX قبلاً ایجادشده برای `<ExpensiveChild name="John" />` استفاده مجدد می‌کند
3. از رندر دوبارهٔ `ExpensiveChild` به‌کلی صرف‌نظر می‌کند

این یعنی **می‌توانید هنگام استفاده از React Compiler، `React.memo` را با خیال راحت از کامپوننت‌های خود حذف کنید**. کامپایلر همان بهینه‌سازی را به‌طور خودکار ارائه می‌دهد و کد شما را تمیزتر و آسان‌تر برای نگهداری می‌کند.

<Note>

بهینه‌سازی کامپایلر در واقع جامع‌تر از `React.memo` است. این بهینه‌سازی همچنین مقادیر میانی و محاسبات پرهزینه را درون کامپوننت‌های شما مموری می‌کند، مشابه ترکیب `React.memo` با `useMemo` در سراسر درخت کامپوننت شما.

</Note>

---

## رفع اشکال {/*troubleshooting*/}
### کامپوننت من هنگامی که یک پراپ شیء، آرایه یا تابع است، دوباره رندر می‌شود {/*my-component-rerenders-when-a-prop-is-an-object-or-array*/}

ری‌اکت پراپس‌های قدیمی و جدید را با برابری سطحی مقایسه می‌کند: یعنی بررسی می‌کند که آیا هر پراپ جدید از نظر مرجع با پراپ قدیمی برابر است یا خیر. اگر هر بار که والد دوباره رندر می‌شود یک شیء یا آرایهٔ جدید بسازید، حتی اگر عناصر منفرد هر کدام یکسان باشند، ری‌اکت همچنان آن را تغییر کرده در نظر می‌گیرد. به‌طور مشابه، اگر هنگام رندر کامپوننت والد یک تابع جدید بسازید، ری‌اکت آن را تغییر کرده در نظر می‌گیرد حتی اگر تابع همان تعریف را داشته باشد. برای جلوگیری از این موضوع، [پراپس‌ها را ساده کنید یا در کامپوننت والد مموری‌زیشن کنید](#minimizing-props-changes).
