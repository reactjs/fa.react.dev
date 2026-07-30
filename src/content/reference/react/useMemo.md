---
title: useMemo
---

<Intro>

`useMemo` یک هوک ری‌اکت است که به شما اجازه می‌دهد نتیجهٔ یک محاسبه را بین رندرهای مجدد cache کنید.

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) به‌طور خودکار مقادیر و توابع را مموری‌زیشن می‌کند، که نیاز به فراخوانی‌های دستی `useMemo` را کاهش می‌دهد. می‌توانید از compiler برای مدیریت خودکار مموری‌زیشن استفاده کنید.

</Note>

<InlineToc />

---

## مرجع {/*reference*/}

### `useMemo(calculateValue, dependencies)` {/*usememo*/}

`useMemo` را در بالاترین سطح کامپوننت خود فراخوانی کنید تا یک محاسبه را بین رندرهای مجدد cache کنید:

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `calculateValue`: تابعی که مقداری که می‌خواهید cache کنید را محاسبه می‌کند. باید خالص باشد، نباید آرگومان بگیرد، و باید مقداری از هر نوعی را برگرداند. ری‌اکت تابع شما را در طول رندر اولیه فراخوانی می‌کند. در رندرهای بعدی، اگر `dependencies` از آخرین رندر تغییر نکرده باشند، ری‌اکت همان مقدار را دوباره برمی‌گرداند. در غیر این صورت، `calculateValue` را فراخوانی می‌کند، نتیجهٔ آن را برمی‌گرداند، و آن را ذخیره می‌کند تا بعداً قابل استفادهٔ مجدد باشد.

* `dependencies`: فهرست تمام مقادیر reactive که داخل کد `calculateValue` ارجاع داده شده‌اند. مقادیر reactive شامل پراپس، استیت و تمام متغیرها و توابعی است که مستقیماً داخل بدنهٔ کامپوننت شما اعلان شده‌اند. اگر linter شما [برای ری‌اکت پیکربندی شده باشد،](/learn/editor-setup#linting) تأیید می‌کند که هر مقدار reactive به‌درستی به‌عنوان یک وابستگی مشخص شده است. فهرست وابستگی‌ها باید تعداد آیتم ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی آن با استفاده از مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند.

#### مقدار بازگشتی {/*returns*/}

در رندر اولیه، `useMemo` نتیجهٔ فراخوانی `calculateValue` بدون آرگومان را برمی‌گرداند.

در رندرهای بعدی، یا یک مقدار ذخیره‌شده از آخرین رندر را برمی‌گرداند (اگر وابستگی‌ها تغییر نکرده‌اند)، یا دوباره `calculateValue` را فراخوانی می‌کند، و نتیجه‌ای که `calculateValue` برگردانده را برمی‌گرداند.

#### نکات {/*caveats*/}

* `useMemo` یک هوک است، بنابراین فقط می‌توانید آن را **در بالاترین سطح کامپوننت** خود یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را داخل حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.
* در حالت سخت‌گیرانه (Strict Mode)، ری‌اکت **تابع محاسبهٔ شما را دو بار فراخوانی می‌کند** تا [به شما کمک کند ناخالصی‌های تصادفی را پیدا کنید.](#my-calculation-runs-twice-on-every-re-render) این رفتار فقط مربوط به توسعه است و بر production تأثیر نمی‌گذارد. اگر تابع محاسبهٔ شما خالص است (همان‌طور که باید باشد)، این کار نباید بر منطق شما تأثیر بگذارد. نتیجهٔ یکی از فراخوانی‌ها نادیده گرفته خواهد شد.
* ری‌اکت **مقدار cache شده را دور نمی‌ریزد مگر اینکه دلیل خاصی برای این کار وجود داشته باشد.** برای مثال، در محیط توسعه، ری‌اکت cache را هنگامی که فایل کامپوننت خود را ویرایش می‌کنید دور می‌ریزد. هم در توسعه و هم در production، ری‌اکت cache را دور می‌ریزد اگر کامپوننت شما در طول mount اولیه suspend شود. در آینده، ری‌اکت ممکن است قابلیت‌های بیشتری اضافه کند که از دور ریختن cache بهره می‌برند — برای مثال، اگر ری‌اکت در آینده پشتیبانی داخلی برای لیست‌های مجازی‌سازی‌شده اضافه کند، منطقی خواهد بود که cache را برای آیتم‌هایی که از viewport جدول مجازی‌سازی‌شده scroll خارج می‌شوند دور بریزد. این کار نباید مشکلی ایجاد کند اگر فقط به‌عنوان یک بهینه‌سازی عملکرد به `useMemo` تکیه کنید. در غیر این صورت، یک [متغیر استیت](/reference/react/useState#avoiding-recreating-the-initial-state) یا یک [رفرنس](/reference/react/useRef#avoiding-recreating-the-ref-contents) ممکن است مناسب‌تر باشد.

<Note>

cache کردن مقادیر بازگشتی به این روش همچنین به‌عنوان [*memoization*](https://en.wikipedia.org/wiki/Memoization) شناخته می‌شود، به این دلیل این هوک `useMemo` نامیده می‌شود.

</Note>

---

## استفاده {/*usage*/}

### صرف‌نظر از محاسبات مجدد پرهزینه {/*skipping-expensive-recalculations*/}

برای cache کردن یک محاسبه بین رندرهای مجدد، آن را در یک فراخوانی `useMemo` در بالاترین سطح کامپوننت خود بپیچید:

```js [[3, 4, "visibleTodos"], [1, 4, "() => filterTodos(todos, tab)"], [2, 4, "[todos, tab]"]]
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

باید دو چیز به `useMemo` ارسال کنید:

1. یک <CodeStep step={1}>calculation function</CodeStep> که هیچ آرگومانی نمی‌گیرد، مانند `() =>`، و چیزی که می‌خواهید محاسبه کنید را برمی‌گرداند.
2. یک <CodeStep step={2}>list of dependencies</CodeStep> که شامل هر مقداری داخل کامپوننت شما است که در محاسبه‌تان استفاده شده است.

در رندر اولیه، <CodeStep step={3}>مقدار</CodeStep> که از `useMemo` دریافت می‌کنید نتیجهٔ فراخوانی <CodeStep step={1}>محاسبه</CodeStep> شما خواهد بود.

در هر رندر بعدی، ری‌اکت <CodeStep step={2}>وابستگی‌ها</CodeStep> را با وابستگی‌هایی که در آخرین رندر ارسال کرده‌اید مقایسه می‌کند. اگر هیچ‌کدام از وابستگی‌ها تغییر نکرده باشند (با [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه شده)، `useMemo` مقداری را که قبلاً محاسبه کرده‌اید برمی‌گرداند. در غیر این صورت، ری‌اکت محاسبهٔ شما را دوباره اجرا و مقدار جدید را برمی‌گرداند.

به عبارت دیگر، `useMemo` یک نتیجهٔ محاسبه را بین رندرهای مجدد تا زمانی که وابستگی‌هایش تغییر کنند، cache می‌کند.

**بیایید یک مثال را مرور کنیم تا ببینیم چه زمانی این کار مفید است.**

به‌طور پیش‌فرض، ری‌اکت کل بدنهٔ کامپوننت شما را هر بار که مجدداً رندر می‌کند دوباره اجرا می‌کند. برای مثال، اگر این `TodoList` استیت خود را به‌روز کند یا پراپس‌های جدیدی از والد خود دریافت کند، تابع `filterTodos` دوباره اجرا خواهد شد:

```js {2}
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab);
  // ...
}
```

معمولاً این مشکل‌ساز نیست زیرا بیشتر محاسبات بسیار سریع هستند. با این حال، اگر در حال فیلتر یا تبدیل یک آرایهٔ بزرگ هستید، یا برخی محاسبات پرهزینه انجام می‌دهید، ممکن است بخواهید اگر داده‌ها تغییر نکرده‌اند از انجام مجدد آن صرف‌نظر کنید. اگر هم `todos` و `tab` مانند آخرین رندر یکسان هستند، پیچاندن محاسبه در `useMemo` مانند قبل به شما اجازه می‌دهد `visibleTodos` که قبلاً محاسبه کرده‌اید را بازاستفاده کنید.

این نوع cache کردن *[memoization](https://en.wikipedia.org/wiki/Memoization)* نامیده می‌شود.

<Note>

**باید فقط به‌عنوان یک بهینه‌سازی عملکرد به `useMemo` تکیه کنید.** اگر کد شما بدون آن کار نمی‌کند، مشکل زیرین را پیدا کرده و ابتدا آن را رفع کنید. سپس می‌توانید برای بهبود عملکرد `useMemo` اضافه کنید.

</Note>

<DeepDive>

#### چگونه تشخیص دهیم یک محاسبه پرهزینه است؟ {/*how-to-tell-if-a-calculation-is-expensive*/}

به‌طور کلی، مگر اینکه در حال ایجاد یا حلقه روی هزاران object باشید، احتمالاً پرهزینه نیست. اگر می‌خواهید اطمینان بیشتری داشته باشید، می‌توانید یک console log اضافه کنید تا زمان صرف‌شده در یک قطعه کد را اندازه‌گیری کنید:

```js {1,3}
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```

تعاملی که در حال اندازه‌گیری آن هستید را انجام دهید (مثلاً تایپ در input). سپس logهایی مانند `filter array: 0.15ms` را در کنسول خود خواهید دید. اگر کل زمان log شده به مقدار قابل‌توجهی می‌رسد (مثلاً `1ms` یا بیشتر)، ممکن است منطقی باشد که آن محاسبه را مموری‌زیشن کنید. به‌عنوان یک آزمایش، می‌توانید محاسبه را در `useMemo` بپیچید تا بررسی کنید آیا کل زمان log شده برای آن تعامل کاهش یافته است یا خیر:

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab); // Skipped if todos and tab haven't changed
}, [todos, tab]);
console.timeEnd('filter array');
```

`useMemo` رندر *اول* را سریع‌تر نمی‌کند. فقط به شما کمک می‌کند از کار غیرضروری در به‌روزرسانی‌ها صرف‌نظر کنید.

در نظر داشته باشید که ماشین شما احتمالاً سریع‌تر از ماشین کاربران شماست، بنابراین ایدهٔ خوبی است که عملکرد را با یک کندسازی مصنوعی تست کنید. برای مثال، Chrome یک گزینهٔ [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) برای این کار ارائه می‌دهد.

همچنین توجه داشته باشید که اندازه‌گیری عملکرد در محیط توسعه به شما دقیق‌ترین نتایج را نمی‌دهد. (برای مثال، وقتی [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode) فعال است، می‌بینید که هر کامپوننت به‌جای یک بار، دو بار رندر می‌شود.) برای دریافت دقیق‌ترین زمان‌سنجی‌ها، اپلیکیشن خود را برای production بسازید و روی دستگاهی مانند دستگاه کاربران خود تست کنید.

</DeepDive>

<DeepDive>

#### آیا باید `useMemo` را همه‌جا اضافه کنید؟ {/*should-you-add-usememo-everywhere*/}

اگر اپلیکیشن شما مانند این سایت است، و بیشتر تعاملات درشت هستند (مانند جایگزینی یک صفحه یا یک بخش کامل)، مموری‌زیشن معمولاً غیرضروری است. از سوی دیگر، اگر اپلیکیشن شما بیشتر مانند یک ویرایشگر طراحی است، و بیشتر تعاملات دانه‌دانه هستند (مانند حرکت دادن شکل‌ها)، ممکن است متوجه شوید مموری‌زیشن بسیار مفید است.

بهینه‌سازی با `useMemo` فقط در چند مورد ارزشمند است:

- محاسبه‌ای که در `useMemo` قرار می‌دهید به‌طور قابل‌توجهی کند است، و وابستگی‌هایش به‌ندرت تغییر می‌کنند.
- آن را به‌عنوان یک پراپ به یک کامپوننت پیچیده‌شده در [`memo`](/reference/react/memo) ارسال می‌کنید. می‌خواهید اگر مقدار تغییر نکرده از رندر مجدد صرف‌نظر کنید. مموری‌زیشن به کامپوننت شما اجازه می‌دهد فقط وقتی وابستگی‌ها یکسان نیستند مجدداً رندر شود.
- مقداری که ارسال می‌کنید بعداً به‌عنوان وابستگی برخی هوک‌ها استفاده می‌شود. برای مثال، شاید مقدار محاسبهٔ `useMemo` دیگری به آن وابسته باشد. یا شاید از این مقدار در [`useEffect`](/reference/react/useEffect) وابسته هستید.

هیچ فایده‌ای در پیچاندن یک محاسبه در `useMemo` در موارد دیگر وجود ندارد. هیچ ضرر قابل‌توجهی هم در انجام این کار نیست، بنابراین برخی تیم‌ها انتخاب می‌کنند که به موارد فردی فکر نکنند و تا حد ممکن مموری‌زیشن کنند. نقطهٔ ضعف این رویکرد این است که کد کمتر خوانا می‌شود. همچنین، نه تمام مموری‌زیشن‌ها مؤثرند: یک مقدار واحد که "همیشه جدید" است کافی است تا مموری‌زیشن یک کامپوننت کامل را بشکند.

**در عمل، می‌توانید با پیروی از چند اصل، بسیاری از مموری‌زیشن‌ها را غیرضروری کنید:**

1. وقتی یک کامپوننت به‌صورت بصری سایر کامپوننت‌ها را می‌پیچد، اجازه دهید [JSX را به‌عنوان children بپذیرد.](/learn/passing-props-to-a-component#passing-jsx-as-children) به این ترتیب، وقتی کامپوننت wrapper استیت خود را به‌روز می‌کند، ری‌اکت می‌داند که فرزندانش نیازی به رندر مجدد ندارند.
1. استیت محلی را ترجیح دهید و [استیت را](/learn/sharing-state-between-components) بیشتر از حد لازم بالا نبرید. برای مثال، استیت گذرایی مانند فرم‌ها و اینکه آیا یک آیتم hover شده است را در بالای درخت خود یا در یک کتابخانهٔ استیت سراسری نگه ندارید.
1. [منطق رندر](/learn/keeping-components-pure) خود را خالص نگه دارید. اگر رندر مجدد یک کامپوننت باعث مشکل می‌شود یا برخی artifactهای بصری قابل‌توجه تولید می‌کند، این یک باگ در کامپوننت شماست! به‌جای افزودن مموری‌زیشن، باگ را رفع کنید.
1. از [افکت‌های غیرضروری که استیت را به‌روز می‌کنند](/learn/you-might-not-need-an-effect) اجتناب کنید. بیشتر مشکلات عملکرد در اپلیکیشن‌های ری‌اکت ناشی از زنجیره‌های به‌روزرسانی است که از افکت‌ها سرچشمه می‌گیرند و باعث می‌شوند کامپوننت‌های شما بارها و بارها رندر شوند.
1. سعی کنید [وابستگی‌های غیرضروری را از افکت‌های خود حذف کنید.](/learn/removing-effect-dependencies) برای مثال، به‌جای مموری‌زیشن، اغلب ساده‌تر است که یک object یا یک تابع را داخل یک افکت یا خارج از کامپوننت منتقل کنید.

اگر یک تعامل خاص همچنان کند به‌نظر می‌رسد، [از profiler ابزارهای توسعه‌دهندهٔ ری‌اکت استفاده کنید](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) تا ببینید کدام کامپوننت‌ها بیشترین بهره را از مموری‌زیشن می‌برند، و در صورت نیاز مموری‌زیشن اضافه کنید. این اصول کامپوننت‌های شما را برای عیب‌یابی و درک آسان‌تر می‌کنند، بنابراین به هر حال خوب است که از آن‌ها پیروی کنید. در درازمدت، ما در حال تحقیق روی [انجام مموری‌زیشن دانه‌دانه به‌صورت خودکار](https://www.youtube.com/watch?v=lGEMwh32soc) هستیم تا این مشکل را برای همیشه حل کنیم.

</DeepDive>

<Recipes titleText="The difference between useMemo and calculating a value directly" titleId="examples-recalculation">

#### صرف‌نظر از محاسبهٔ مجدد با `useMemo` {/*skipping-recalculation-with-usememo*/}

در این مثال، پیاده‌سازی `filterTodos` **به‌طور مصنوعی کند شده است** تا بتوانید ببینید چه اتفاقی می‌افتد وقتی برخی توابع جاوااسکریپتی که در حین رندر فراخوانی می‌کنید واقعاً کند هستند. سعی کنید tabها را سوییچ کنید و تم را toggle کنید.

سوییچ کردن tabها کند حس می‌شود زیرا `filterTodos` کند شده را مجبور به اجرای مجدد می‌کند. این مورد انتظار می‌رود زیرا `tab` تغییر کرده است، و بنابراین کل محاسبه *نیاز* به اجرای مجدد دارد. (اگر کنجکاو هستید چرا دو بار اجرا می‌شود، [اینجا](#my-calculation-runs-twice-on-every-re-render) توضیح داده شده است.)

تم را toggle کنید. **به‌لطف `useMemo`، با وجود کندسازی مصنوعی، سریع است!** فراخوانی کند `filterTodos` صرف‌نظر شد زیرا هم `todos` و هم `tab` (که به‌عنوان وابستگی به `useMemo` ارسال می‌کنید) از آخرین رندر تغییر نکرده‌اند.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

```

{/* TODO(@poteto) - investigate potential false positives in react compiler validation */}
```js {expectedErrors: {'react-compiler': [5]}} src/TodoList.js active
import { useMemo } from 'react';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  return (
    <div className={theme}>
      <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  console.log('[ARTIFICIALLY SLOW] Filtering ' + todos.length + ' todos for "' + tab + '" tab.');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

<Solution />

#### همیشه محاسبهٔ یک مقدار {/*always-recalculating-a-value*/}

در این مثال، پیاده‌سازی `filterTodos` نیز **به‌طور مصنوعی کند شده است** تا بتوانید ببینید چه اتفاقی می‌افتد وقتی برخی توابع جاوااسکریپتی که در حین رندر فراخوانی می‌کنید واقعاً کند هستند. سعی کنید tabها را سوییچ کنید و تم را toggle کنید.

برخلاف مثال قبلی، toggle کردن تم نیز اکنون کند است! این به این دلیل است که **هیچ فراخوانی `useMemo` در این نسخه وجود ندارد،** بنابراین `filterTodos` کند شده در هر رندر مجدد فراخوانی می‌شود. حتی اگر فقط `theme` تغییر کرده باشد فراخوانی می‌شود.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

```

```js src/TodoList.js active
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <ul>
        <p><b>Note: <code>filterTodos</code> is artificially slowed down!</b></p>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  console.log('[ARTIFICIALLY SLOW] Filtering ' + todos.length + ' todos for "' + tab + '" tab.');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

با این حال، در اینجا همان کد **با حذف کندسازی مصنوعی** آمده است. آیا نبود `useMemo` قابل‌توجه حس می‌شود یا خیر؟

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}

```

```js src/TodoList.js active
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ?
              <s>{todo.text}</s> :
              todo.text
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  console.log('Filtering ' + todos.length + ' todos for "' + tab + '" tab.');

  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

اغلب، کد بدون مموری‌زیشن به‌خوبی کار می‌کند. اگر تعاملات شما به‌اندازهٔ کافی سریع هستند، ممکن است به مموری‌زیشن نیاز نداشته باشید.

می‌توانید سعی کنید تعداد آیتم‌های todo را در `utils.js` افزایش دهید و ببینید رفتار چگونه تغییر می‌کند. این محاسبهٔ خاص از ابتدا خیلی پرهزینه نبود، اما اگر تعداد todoها به‌طور قابل‌توجهی رشد کند، بیشتر سربار در رندر مجدد خواهد بود تا در فیلتر کردن. در ادامه بخوانید تا ببینید چگونه می‌توانید رندر مجدد را با `useMemo` بهینه کنید.

<Solution />

</Recipes>

---

### صرف‌نظر از رندر مجدد کامپوننت‌ها {/*skipping-re-rendering-of-components*/}

در برخی موارد، `useMemo` همچنین می‌تواند به شما کمک کند عملکرد رندر مجدد کامپوننت‌های فرزند را بهینه کنید. برای روشن کردن این موضوع، فرض کنید این کامپوننت `TodoList`، `visibleTodos` را به‌عنوان یک پراپ به کامپوننت فرزند `List` ارسال می‌کند:

```js {5}
export default function TodoList({ todos, tab, theme }) {
  // ...
  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  );
}
```

متوجه شده‌اید که toggle کردن پراپ `theme` اپلیکیشن را برای لحظه‌ای فریز می‌کند، اما اگر `<List />` را از JSX خود حذف کنید، سریع حس می‌شود. این به شما می‌گوید که ارزش دارد کامپوننت `List` را بهینه کنید.

**به‌طور پیش‌فرض، وقتی یک کامپوننت مجدداً رندر می‌شود، ری‌اکت تمام فرزندان آن را به‌صورت بازگشتی مجدداً رندر می‌کند.** به این دلیل است که وقتی `TodoList` با یک `theme` متفاوت مجدداً رندر می‌شود، کامپوننت `List` *همچنین* مجدداً رندر می‌شود. این برای کامپوننت‌هایی که نیاز به محاسبهٔ زیادی برای رندر مجدد ندارند خوب است. اما اگر تأیید کرده‌اید که یک رندر مجدد کند است، می‌توانید با پیچیدن آن در [`memo`:](/reference/react/memo) به `List` بگویید وقتی پراپس‌هایش مانند آخرین رندر هستند از رندر مجدد صرف‌نظر کند:

```js {3,5}
import { memo } from 'react';

const List = memo(function List({ items }) {
  // ...
});
```

**با این تغییر، `List` از رندر مجدد صرف‌نظر خواهد کرد اگر تمام پراپس‌هایش مانند آخرین رندر *یکسان* باشند.** اینجاست که cache کردن محاسبه مهم می‌شود! تصور کنید `visibleTodos` را بدون `useMemo` محاسبه کرده‌اید:

```js {2-3,6-7}
export default function TodoList({ todos, tab, theme }) {
  // Every time the theme changes, this will be a different array...
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      {/* ... so List's props will never be the same, and it will re-render every time */}
      <List items={visibleTodos} />
    </div>
  );
}
```

**در مثال بالا، تابع `filterTodos` همیشه یک آرایهٔ *متفاوت* ایجاد می‌کند،** مشابه اینکه literal object `{}` همیشه یک object جدید ایجاد می‌کند. معمولاً این مشکل‌ساز نیست، اما به این معناست که پراپس‌های `List` هرگز یکسان نخواهند بود، و بهینه‌سازی [`memo`](/reference/react/memo) شما کار نخواهد کرد. اینجاست که `useMemo` به‌کار می‌آید:

```js {2-3,5,9-10}
export default function TodoList({ todos, tab, theme }) {
  // Tell React to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  );
  return (
    <div className={theme}>
      {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  );
}
```


**با پیچاندن محاسبهٔ `visibleTodos` در `useMemo`، اطمینان حاصل می‌کنید که بین رندرهای مجدد مقدار *یکسانی* دارد** (تا زمانی که وابستگی‌ها تغییر کنند). *لازم نیست* یک محاسبه را در `useMemo` بپیچید مگر اینکه برای دلیل خاصی این کار را انجام دهید. در این مثال، دلیل این است که آن را به یک کامپوننت پیچیده‌شده در [`memo`](/reference/react/memo) ارسال می‌کنید، و این به آن اجازه می‌دهد از رندر مجدد صرف‌نظر کند. چند دلیل دیگر برای افزودن `useMemo` وجود دارد که در ادامهٔ این صفحه توضیح داده شده است.

<DeepDive>

#### مموری‌زیشن ندهای JSX فردی {/*memoizing-individual-jsx-nodes*/}

به‌جای پیچیدن `List` در [`memo`](/reference/react/memo)، می‌توانید نود JSX `<List />` خود را در `useMemo` بپیچید:

```js {3,6}
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
  return (
    <div className={theme}>
      {children}
    </div>
  );
}
```

رفتار یکسان خواهد بود. اگر `visibleTodos` تغییر نکرده باشد، `List` مجدداً رندر نخواهد شد.

یک نود JSX مانند `<List items={visibleTodos} />` یک object مانند `{ type: List, props: { items: visibleTodos } }` است. ایجاد این object بسیار ارزان است، اما ری‌اکت نمی‌داند آیا محتوای آن مانند دفعهٔ قبل است یا خیر. به این دلیل است که به‌طور پیش‌فرض، ری‌اکت کامپوننت `List` را مجدداً رندر می‌کند.

با این حال، اگر ری‌اکت دقیقاً همان JSX را مانند رندر قبلی ببیند، سعی نمی‌کند کامپوننت شما را مجدداً رندر کند. این به این دلیل است که ندهای JSX [immutable](https://en.wikipedia.org/wiki/Immutable_object) هستند. یک object نود JSX نمی‌توانست در طول زمان تغییر کند، بنابراین ری‌اکت می‌داند که صرف‌نظر از رندر مجدد امن است. با این حال، برای این کار، نود باید *در واقع همان object* باشد، نه اینکه صرفاً در کد یکسان به‌نظر برسد. این همان کاری است که `useMemo` در این مثال انجام می‌دهد.

پیچاندن دستی ندهای JSX در `useMemo` راحت نیست. برای مثال، نمی‌توانید این کار را به‌صورت شرطی انجام دهید. معمولاً به این دلیل کامپوننت‌ها را با [`memo`](/reference/react/memo) می‌پیچید به‌جای ندهای JSX.

</DeepDive>

<Recipes titleText="The difference between skipping re-renders and always re-rendering" titleId="examples-rerendering">

#### صرف‌نظر از رندر مجدد با `useMemo` و `memo` {/*skipping-re-rendering-with-usememo-and-memo*/}

در این مثال، کامپوننت `List` **به‌طور مصنوعی کند شده است** تا بتوانید ببینید چه اتفاقی می‌افتد وقتی یک کامپوننت ری‌اکت که در حال رندر آن هستید واقعاً کند است. سعی کنید tabها را سوییچ کنید و تم را toggle کنید.

سوییچ کردن tabها کند حس می‌شود زیرا `List` کند شده را مجبور به رندر مجدد می‌کند. این مورد انتظار می‌رود زیرا `tab` تغییر کرده است، و بنابراین باید انتخاب جدید کاربر را روی صفحه منعکس کنید.

سپس، toggle کردن تم را امتحان کنید. **به‌لطف `useMemo` همراه با [`memo`](/reference/react/memo)، با وجود کندسازی مصنوعی سریع است!** `List` از رندر مجدد صرف‌نظر کرد زیرا آرایهٔ `visibleTodos` از آخرین رندر تغییر نکرده است. آرایهٔ `visibleTodos` تغییر نکرده زیرا هم `todos` و هم `tab` (که به‌عنوان وابستگی به `useMemo` ارسال می‌کنید) از آخرین رندر تغییر نکرده‌اند.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/TodoList.js active
import { useMemo } from 'react';
import List from './List.js';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  return (
    <div className={theme}>
      <p><b>Note: <code>List</code> is artificially slowed down!</b></p>
      <List items={visibleTodos} />
    </div>
  );
}
```

```js {expectedErrors: {'react-compiler': [5, 6]}} src/List.js
import { memo } from 'react';

const List = memo(function List({ items }) {
  console.log('[ARTIFICIALLY SLOW] Rendering <List /> with ' + items.length + ' items');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.completed ?
            <s>{item.text}</s> :
            item.text
          }
        </li>
      ))}
    </ul>
  );
});

export default List;
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

<Solution />

#### همیشه رندر مجدد یک کامپوننت {/*always-re-rendering-a-component*/}

در این مثال، پیاده‌سازی `List` نیز **به‌طور مصنوعی کند شده است** تا بتوانید ببینید چه اتفاقی می‌افتد وقتی برخی کامپوننت‌های ری‌اکت که در حال رندر آن‌ها هستید واقعاً کند هستند. سعی کنید tabها را سوییچ کنید و تم را toggle کنید.

برخلاف مثال قبلی، toggle کردن تم نیز اکنون کند است! این به این دلیل است که **هیچ فراخوانی `useMemo` در این نسخه وجود ندارد،** بنابراین `visibleTodos` همیشه یک آرایهٔ متفاوت است، و کامپوننت `List` کند شده نمی‌تواند از رندر مجدد صرف‌نظر کند.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/TodoList.js active
import List from './List.js';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <p><b>Note: <code>List</code> is artificially slowed down!</b></p>
      <List items={visibleTodos} />
    </div>
  );
}
```

```js {expectedErrors: {'react-compiler': [5, 6]}} src/List.js
import { memo } from 'react';

const List = memo(function List({ items }) {
  console.log('[ARTIFICIALLY SLOW] Rendering <List /> with ' + items.length + ' items');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.completed ?
            <s>{item.text}</s> :
            item.text
          }
        </li>
      ))}
    </ul>
  );
});

export default List;
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

با این حال، در اینجا همان کد **با حذف کندسازی مصنوعی** آمده است. آیا نبود `useMemo` قابل‌توجه حس می‌شود یا خیر؟

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { createTodos } from './utils.js';
import TodoList from './TodoList.js';

const todos = createTodos();

export default function App() {
  const [tab, setTab] = useState('all');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setTab('all')}>
        All
      </button>
      <button onClick={() => setTab('active')}>
        Active
      </button>
      <button onClick={() => setTab('completed')}>
        Completed
      </button>
      <br />
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <TodoList
        todos={todos}
        tab={tab}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/TodoList.js active
import List from './List.js';
import { filterTodos } from './utils.js'

export default function TodoList({ todos, theme, tab }) {
  const visibleTodos = filterTodos(todos, tab);
  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  );
}
```

```js src/List.js
import { memo } from 'react';

function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.completed ?
            <s>{item.text}</s> :
            item.text
          }
        </li>
      ))}
    </ul>
  );
}

export default memo(List);
```

```js src/utils.js
export function createTodos() {
  const todos = [];
  for (let i = 0; i < 50; i++) {
    todos.push({
      id: i,
      text: "Todo " + (i + 1),
      completed: Math.random() > 0.5
    });
  }
  return todos;
}

export function filterTodos(todos, tab) {
  return todos.filter(todo => {
    if (tab === 'all') {
      return true;
    } else if (tab === 'active') {
      return !todo.completed;
    } else if (tab === 'completed') {
      return todo.completed;
    }
  });
}
```

```css
label {
  display: block;
  margin-top: 10px;
}

.dark {
  background-color: black;
  color: white;
}

.light {
  background-color: white;
  color: black;
}
```

</Sandpack>

اغلب، کد بدون مموری‌زیشن به‌خوبی کار می‌کند. اگر تعاملات شما به‌اندازهٔ کافی سریع هستند، به مموری‌زیشن نیاز ندارید.

در نظر داشته باشید که باید ری‌اکت را در حالت production اجرا کنید، [ابزارهای توسعه‌دهندهٔ ری‌اکت](/learn/react-developer-tools) را غیرفعال کنید، و از دستگاه‌هایی مشابه دستگاه‌های کاربران اپلیکیشن خود استفاده کنید تا درک واقع‌بینانه‌ای از آنچه در واقع اپلیکیشن شما را کند می‌کند به‌دست آورید.

<Solution />

</Recipes>

---

### جلوگیری از اجرای بیش‌ازحد یک افکت {/*preventing-an-effect-from-firing-too-often*/}

گاهی اوقات، ممکن است بخواهید از یک مقدار داخل یک [افکت](/learn/synchronizing-with-effects) استفاده کنید:

```js {4-7,10}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = {
    serverUrl: 'https://localhost:1234',
    roomId: roomId
  }

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    // ...
```

این یک مشکل ایجاد می‌کند. [هر مقدار reactive باید به‌عنوان یک وابستگی افکت شما اعلان شود.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) با این حال، اگر `options` را به‌عنوان وابستگی اعلان کنید، باعث می‌شود افکت شما دائماً به اتاق گفتگو متصل شود:


```js {5}
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🔴 Problem: This dependency changes on every render
  // ...
```

برای حل این مشکل، می‌توانید objectی که نیاز دارید از یک افکت فراخوانی کنید را در `useMemo` بپیچید:

```js {4-9,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = useMemo(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ Only changes when options changes
  // ...
```

این تضمین می‌کند که object `options` بین رندرهای مجدد یکسان است اگر `useMemo` object cache شده را برگرداند.

با این حال، از آنجا که `useMemo` یک بهینه‌سازی عملکرد است، نه یک تضمین معنایی، ری‌اکت ممکن است مقدار cache شده را دور بریزد اگر [دلیل خاصی برای این کار وجود داشته باشد](#caveats). این کار همچنین باعث می‌شود افکت دوباره اجرا شود، **بنابراین حتی بهتر است نیاز به یک وابستگی تابع را با انتقال object خود به *داخل* افکت حذف کنید:**

```js {5-8,13}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = { // ✅ No need for useMemo or object dependencies!
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    }

    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only changes when roomId changes
  // ...
```

اکنون کد شما ساده‌تر است و به `useMemo` نیاز ندارد. [دربارهٔ حذف وابستگی‌های افکت بیشتر بدانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)


### مموری‌زیشن یک وابستگی هوک دیگر {/*memoizing-a-dependency-of-another-hook*/}

فرض کنید یک محاسبه دارید که به یک object ایجاد‌شده به‌طور مستقیم در بدنهٔ کامپوننت وابسته است:

```js {2}
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body
  // ...
```

وابستگی به یک object مانند این نقطهٔ مموری‌زیشن را بی‌اثر می‌کند. وقتی یک کامپوننت مجدداً رندر می‌شود، تمام کدهای مستقیماً داخل بدنهٔ کامپوننت دوباره اجرا می‌شوند. **خطوط کد ایجادکنندهٔ object `searchOptions` نیز در هر رندر مجدد اجرا خواهند شد.** از آنجا که `searchOptions` یک وابستگی فراخوانی `useMemo` شما است، و هر بار متفاوت است، ری‌اکت می‌داند که وابستگی‌ها متفاوت هستند، و هر بار `searchItems` را دوباره محاسبه می‌کند.

برای رفع این مشکل، می‌توانید object `searchOptions` را *خودش* قبل از ارسال به‌عنوان وابستگی مموری‌زیشن کنید:

```js {2-4}
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ Only changes when text changes

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // ✅ Only changes when allItems or searchOptions changes
  // ...
```

در مثال بالا، اگر `text` تغییر نکرده باشد، object `searchOptions` نیز تغییر نخواهد کرد. با این حال، یک رفع بهتر این است که اعلان object `searchOptions` را به *داخل* تابع محاسبهٔ `useMemo` منتقل کنید:

```js {3}
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes
  // ...
```

اکنون محاسبهٔ شما مستقیماً به `text` وابسته است (که یک رشته است و نمی‌تواند "به‌طور تصادفی" متفاوت شود).

---

### مموری‌زیشن یک تابع {/*memoizing-a-function*/}

فرض کنید کامپوننت `Form` در [`memo`](/reference/react/memo) پیچیده شده است. می‌خواهید یک تابع را به‌عنوان پراپ به آن ارسال کنید:

```js {2-7}
export default function ProductPage({ productId, referrer }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }

  return <Form onSubmit={handleSubmit} />;
}
```

درست مانند اینکه `{}` یک object متفاوت ایجاد می‌کند، اعلان‌های تابع مانند `function() {}` و expressionهایی مانند `() => {}` در هر رندر مجدد یک تابع *متفاوت* تولید می‌کنند. به‌خودی‌خود، ایجاد یک تابع جدید مشکل‌ساز نیست. این چیزی نیست که از آن اجتناب کنید! با این حال، اگر کامپوننت `Form` مموری‌زیشن شده است، احتمالاً می‌خواهید وقتی هیچ پراپسی تغییر نکرده از رندر مجدد آن صرف‌نظر کنید. یک پراپ که *همیشه* متفاوت است نقطهٔ مموری‌زیشن را بی‌اثر می‌کند.

برای مموری‌زیشن یک تابع با `useMemo`، تابع محاسبهٔ شما باید تابع دیگری را برگرداند:

```js {2-3,8-9}
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails
      });
    };
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```

این نامنظم به‌نظر می‌رسد! **مموری‌زیشن توابع به‌اندازه‌ای رایج است که ری‌اکت یک هوک داخلی مختص آن دارد. به‌جای `useMemo` توابع خود را در [`useCallback`](/reference/react/useCallback) بپیچید** تا از نوشتن یک تابع تودرتوی اضافی اجتناب کنید:

```js {2,7}
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```

دو مثال بالا کاملاً معادل هستند. تنها فایدهٔ `useCallback` این است که به شما اجازه می‌دهد از نوشتن یک تابع تودرتوی اضافی داخل آن اجتناب کنید. هیچ کار دیگری انجام نمی‌دهد. [دربارهٔ `useCallback` بیشتر بخوانید.](/reference/react/useCallback)

---

## عیب‌یابی {/*troubleshooting*/}

### محاسبهٔ من در هر رندر مجدد دو بار اجرا می‌شود {/*my-calculation-runs-twice-on-every-re-render*/}

در [حالت سخت‌گیرانه (Strict Mode)](/reference/react/StrictMode)، ری‌اکت برخی از توابع شما را به‌جای یک بار، دو بار فراخوانی می‌کند:

```js {2,5,6}
function TodoList({ todos, tab }) {
  // This component function will run twice for every render.

  const visibleTodos = useMemo(() => {
    // This calculation will run twice if any of the dependencies change.
    return filterTodos(todos, tab);
  }, [todos, tab]);

  // ...
```

این مورد انتظار می‌رود و نباید کد شما را بشکند.

این رفتار **فقط-توسعه** به شما کمک می‌کند [کامپوننت‌ها را خالص نگه دارید.](/learn/keeping-components-pure) ری‌اکت از نتیجهٔ یکی از فراخوانی‌ها استفاده می‌کند، و نتیجهٔ فراخوانی دیگر را نادیده می‌گیرد. تا زمانی که کامپوننت و توابع محاسبهٔ شما خالص هستند، این نباید بر منطق شما تأثیر بگذارد. با این حال، اگر به‌طور تصادفی ناخالص هستند، این کار به شما کمک می‌کند متوجه شده و اشتباه را رفع کنید.

برای مثال، این تابع محاسبهٔ ناخالص یک آرایه را که به‌عنوان پراپ دریافت کرده‌اید تغییر می‌دهد:

```js {2-3}
  const visibleTodos = useMemo(() => {
    // 🚩 Mistake: mutating a prop
    todos.push({ id: 'last', text: 'Go for a walk!' });
    const filtered = filterTodos(todos, tab);
    return filtered;
  }, [todos, tab]);
```

ری‌اکت تابع شما را دو بار فراخوانی می‌کند، بنابراین متوجه می‌شوید todo دو بار اضافه شده است. محاسبهٔ شما نباید هیچ object موجودی را تغییر دهد، اما تغییر هر *object جدید* که در طول محاسبه ایجاد کرده‌اید اشکالی ندارد. برای مثال، اگر تابع `filterTodos` همیشه یک آرایهٔ *متفاوت* برمی‌گرداند، می‌توانید *آن* آرایه را به‌جای آن تغییر دهید:

```js {3,4}
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(todos, tab);
    // ✅ Correct: mutating an object you created during the calculation
    filtered.push({ id: 'last', text: 'Go for a walk!' });
    return filtered;
  }, [todos, tab]);
```

برای کسب اطلاعات بیشتر دربارهٔ purity، [keeping components pure](/learn/keeping-components-pure) را بخوانید.

همچنین، راهنماهای [به‌روزرسانی objectها](/learn/updating-objects-in-state) و [به‌روزرسانی آرایه‌ها](/learn/updating-arrays-in-state) بدون mutation را بررسی کنید.

---

### فراخوانی `useMemo` من قرار است یک object برگرداند، اما undefined برمی‌گرداند {/*my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined*/}

این کد کار نمی‌کند:

```js {1-2,5}
  // 🔴 You can't return an object from an arrow function with () => {
  const searchOptions = useMemo(() => {
    matchMode: 'whole-word',
    text: text
  }, [text]);
```

در جاوااسکریپت، `() => {` بدنهٔ تابع arrow را شروع می‌کند، بنابراین `{` بخشی از object شما نیست. به این دلیل است که object برنمی‌گرداند، و منجر به اشتباه می‌شود. می‌توانید با افزودن پرانتز مانند `({` و `})` آن را رفع کنید:

```js {1-2,5}
  // This works, but is easy for someone to break again
  const searchOptions = useMemo(() => ({
    matchMode: 'whole-word',
    text: text
  }), [text]);
```

با این حال، این همچنان گیج‌کننده است و خیلی آسان است که کسی با حذف پرانتزها آن را بشکند.

برای اجتناب از این اشتباه، یک دستور `return` به‌صورت صریح بنویسید:

```js {1-3,6-7}
  // ✅ This works and is explicit
  const searchOptions = useMemo(() => {
    return {
      matchMode: 'whole-word',
      text: text
    };
  }, [text]);
```

---

### هر بار کامپوننت من رندر می‌شود، محاسبه در `useMemo` دوباره اجرا می‌شود {/*every-time-my-component-renders-the-calculation-in-usememo-re-runs*/}

مطمئن شوید آرایه وابستگی را به‌عنوان آرگومان دوم مشخص کرده‌اید!

اگر آرایه وابستگی را فراموش کنید، `useMemo` هر بار محاسبه را دوباره اجرا می‌کند:

```js {2-3}
function TodoList({ todos, tab }) {
  // 🔴 Recalculates every time: no dependency array
  const visibleTodos = useMemo(() => filterTodos(todos, tab));
  // ...
```

این نسخهٔ اصلاح‌شده است که آرایه وابستگی را به‌عنوان آرگومان دوم ارسال می‌کند:

```js {2-3}
function TodoList({ todos, tab }) {
  // ✅ Does not recalculate unnecessarily
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
```

اگر این کمک نکرد، مشکل این است که حداقل یکی از وابستگی‌های شما با رندر قبلی متفاوت است. می‌توانید این مشکل را با log کردن دستی وابستگی‌های خود به کنسول عیب‌یابی کنید:

```js
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  console.log([todos, tab]);
```

سپس می‌توانید روی آرایه‌های مختلف از رندرهای مجدد در کنسول راست‌کلیک کرده و "Store as a global variable" را برای هر دو انتخاب کنید. با فرض اینکه اولی به‌عنوان `temp1` و دومی به‌عنوان `temp2` ذخیره شده است، سپس می‌توانید از کنسول مرورگر برای بررسی اینکه آیا هر وابستگی در هر دو آرایه یکسان است استفاده کنید:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

وقتی متوجه شدید کدام وابستگی مموری‌زیشن را می‌شکند، یا راهی برای حذف آن پیدا کنید، یا [آن را نیز مموری‌زیشن کنید.](#memoizing-a-dependency-of-another-hook)

---

### نیاز دارم `useMemo` را برای هر آیتم لیست در یک حلقه فراخوانی کنم، اما این مجاز نیست {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

فرض کنید کامپوننت `Chart` در [`memo`](/reference/react/memo) پیچیده شده است. می‌خواهید وقتی کامپوننت `ReportList` مجدداً رندر می‌شود، از رندر مجدد هر `Chart` در لیست صرف‌نظر کنید. با این حال، نمی‌توانید `useMemo` را در یک حلقه فراخوانی کنید:

```js {expectedErrors: {'react-compiler': [6]}} {5-11}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 You can't call useMemo in a loop like this:
        const data = useMemo(() => calculateReport(item), [item]);
        return (
          <figure key={item.id}>
            <Chart data={data} />
          </figure>
        );
      })}
    </article>
  );
}
```

در عوض، برای هر آیتم یک کامپوننت استخراج کنید و داده‌ها را برای آیتم‌های فردی مموری‌زیشن کنید:

```js {5,12-18}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item =>
        <Report key={item.id} item={item} />
      )}
    </article>
  );
}

function Report({ item }) {
  // ✅ Call useMemo at the top level:
  const data = useMemo(() => calculateReport(item), [item]);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
}
```

همچنین، می‌توانید `useMemo` را حذف کرده و در عوض خود `Report` را در [`memo`](/reference/react/memo) بپیچید. اگر پراپ `item` تغییر نکند، `Report` از رندر مجدد صرف‌نظر خواهد کرد، بنابراین `Chart` نیز از رندر مجدد صرف‌نظر خواهد کرد:

```js {5,6,12}
function ReportList({ items }) {
  // ...
}

const Report = memo(function Report({ item }) {
  const data = calculateReport(item);
  return (
    <figure>
      <Chart data={data} />
    </figure>
  );
});
```
