---
title: useMemo
---

<Intro>

`useMemo` یک هوک React است که به شما اجازه می‌دهد نتیجه‌ی یک محاسبه را بین رندرهای مجدد cache کنید.

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) به‌صورت خودکار مقادیر و توابع را memoize می‌کند و نیاز به فراخوانی دستی `useMemo` را کاهش می‌دهد. می‌توانید از کامپایلر برای مدیریت خودکار memoization استفاده کنید.

</Note>

<InlineToc />

---

## مرجع {/*reference*/}

### `useMemo(calculateValue, dependencies)` {/*usememo*/}

برای cache کردن یک محاسبه بین رندرهای مجدد، `useMemo` را در سطح بالای کامپوننت‌تان فراخوانی کنید:

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

[نمونه‌های بیشتر را پایین ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `calculateValue`: تابعی که مقدار موردنظر شما برای cache شدن را محاسبه می‌کند. این تابع باید pure باشد، هیچ آرگومانی نگیرد و مقداری از هر نوعی را برگرداند. React هنگام رندر اولیه، تابع شما را فراخوانی می‌کند. در رندرهای بعدی، اگر `dependencies` نسبت به رندر قبلی تغییر نکرده باشند، React همان مقدار قبلی را برمی‌گرداند. در غیر این صورت، `calculateValue` را فراخوانی می‌کند، نتیجه‌اش را برمی‌گرداند و آن را ذخیره می‌کند تا بعدا قابل استفاده‌ی مجدد باشد.

* `dependencies`: لیست تمام مقادیر reactive که در کد `calculateValue` به آن‌ها ارجاع داده شده است. مقادیر reactive شامل props، state و تمام متغیرها و توابعی هستند که مستقیما داخل بدنه‌ی کامپوننت شما تعریف شده‌اند. اگر linter شما [برای React پیکربندی شده باشد](/learn/editor-setup#linting)، بررسی می‌کند که هر مقدار reactive به‌درستی به‌عنوان dependency مشخص شده باشد. لیست dependencyها باید تعداد آیتم ثابت داشته باشد و به‌صورت inline مثل `[dep1, dep2, dep3]` نوشته شود. React هر dependency را با مقدار قبلی همان dependency با مقایسه‌ی [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) بررسی می‌کند.

#### مقدار بازگشتی {/*returns*/}

در رندر اولیه، `useMemo` نتیجه‌ی فراخوانی `calculateValue` بدون آرگومان را برمی‌گرداند.

در رندرهای بعدی، یا مقدار ذخیره‌شده‌ی رندر قبلی را برمی‌گرداند (اگر dependencyها تغییر نکرده باشند)، یا `calculateValue` را دوباره فراخوانی می‌کند و نتیجه‌ی آن را برمی‌گرداند.

#### نکات مهم {/*caveats*/}

* `useMemo` یک هوک است، بنابراین فقط می‌توانید آن را **در سطح بالای کامپوننت** یا هوک‌های سفارشی خودتان فراخوانی کنید. نمی‌توانید آن را داخل حلقه‌ها یا شرط‌ها صدا بزنید. اگر به چنین چیزی نیاز دارید، یک کامپوننت جدید استخراج کنید و state را به آن منتقل کنید.
* در Strict Mode، React برای [کمک به پیدا کردن ناخالصی‌های ناخواسته](#my-calculation-runs-twice-on-every-re-render)، **تابع محاسبه‌ی شما را دو بار فراخوانی می‌کند**. این رفتار فقط در توسعه است و روی production اثر نمی‌گذارد. اگر تابع محاسبه‌ی شما pure باشد (که باید باشد)، این موضوع روی منطق برنامه‌تان تاثیر نمی‌گذارد. نتیجه‌ی یکی از این فراخوانی‌ها نادیده گرفته می‌شود.
* React **مقدار cache شده را دور نمی‌اندازد مگر دلیل مشخصی برای این کار داشته باشد.** مثلا در توسعه، وقتی فایل کامپوننت‌تان را ویرایش می‌کنید، React کش را پاک می‌کند. هم در توسعه و هم در production، اگر کامپوننت شما هنگام mount اولیه suspend شود، React کش را دور می‌اندازد. در آینده، ممکن است React قابلیت‌های بیشتری اضافه کند که از دور انداختن کش استفاده کنند؛ برای مثال، اگر پشتیبانی داخلی از لیست‌های مجازی اضافه شود، منطقی است کش آیتم‌هایی که از viewport جدول مجازی بیرون اسکرول شده‌اند پاک شود. اگر فقط به‌عنوان بهینه‌سازی عملکرد از `useMemo` استفاده می‌کنید، این رفتار مشکلی ایجاد نمی‌کند. در غیر این صورت، [متغیر state](/reference/react/useState#avoiding-recreating-the-initial-state) یا [ref](/reference/react/useRef#avoiding-recreating-the-ref-contents) ممکن است انتخاب مناسب‌تری باشد.

<Note>

Cache کردن مقادیر بازگشتی به این شکل با نام [*memoization*](https://en.wikipedia.org/wiki/Memoization) هم شناخته می‌شود و به همین دلیل این هوک `useMemo` نام دارد.

</Note>

---

## نحوه استفاده {/*usage*/}

### رد کردن محاسبات مجدد پرهزینه {/*skipping-expensive-recalculations*/}

برای cache کردن یک محاسبه بین رندرهای مجدد، آن را در سطح بالای کامپوننت داخل فراخوانی `useMemo` قرار دهید:

```js [[3, 4, "visibleTodos"], [1, 4, "() => filterTodos(todos, tab)"], [2, 4, "[todos, tab]"]]
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

باید دو چیز را به `useMemo` بدهید:

1. یک <CodeStep step={1}>تابع محاسبه</CodeStep> که آرگومان نمی‌گیرد، مثل `() =>`، و مقداری را که می‌خواهید محاسبه شود برمی‌گرداند.
2. یک <CodeStep step={2}>لیست dependencyها</CodeStep> که شامل تمام مقادیری در کامپوننت شماست که داخل محاسبه از آن‌ها استفاده شده است.

در رندر اولیه، <CodeStep step={3}>مقداری</CodeStep> که از `useMemo` می‌گیرید، نتیجه‌ی فراخوانی <CodeStep step={1}>محاسبه</CodeStep> شما است.

در هر رندر بعدی، React <CodeStep step={2}>dependencyها</CodeStep> را با dependencyهایی که در رندر قبلی داده بودید مقایسه می‌کند. اگر هیچ‌کدام از dependencyها تغییر نکرده باشند (با مقایسه‌ی [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is))، `useMemo` همان مقدار از قبل محاسبه‌شده را برمی‌گرداند. در غیر این صورت، React محاسبه‌ی شما را دوباره اجرا می‌کند و مقدار جدید را برمی‌گرداند.

به بیان دیگر، `useMemo` نتیجه‌ی یک محاسبه را بین رندرهای مجدد cache می‌کند تا زمانی که dependencyهایش تغییر کنند.

**بیایید با یک مثال ببینیم این کار چه زمانی مفید است.**

به‌صورت پیش‌فرض، React هر بار که کامپوننت دوباره رندر می‌شود، کل بدنه‌ی کامپوننت را دوباره اجرا می‌کند. برای مثال، اگر `TodoList` state خودش را به‌روزرسانی کند یا props جدیدی از والد بگیرد، تابع `filterTodos` دوباره اجرا می‌شود:

```js {2}
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab);
  // ...
}
```

معمولا این موضوع مشکل‌ساز نیست چون بیشتر محاسبات خیلی سریع‌اند. اما اگر در حال فیلتر کردن یا تبدیل یک آرایه‌ی بزرگ هستید، یا محاسبه‌ی پرهزینه‌ای انجام می‌دهید، بهتر است وقتی داده‌ها تغییر نکرده‌اند محاسبه را دوباره انجام ندهید. اگر `todos` و `tab` هر دو مثل رندر قبلی باشند، قرار دادن محاسبه در `useMemo` مثل مثال قبل به شما اجازه می‌دهد `visibleTodos` از قبل محاسبه‌شده را دوباره استفاده کنید.

به این نوع cache کردن *[memoization](https://en.wikipedia.org/wiki/Memoization)* گفته می‌شود.

<Note>

**باید فقط به‌عنوان بهینه‌سازی عملکرد روی `useMemo` حساب کنید.** اگر کد شما بدون آن درست کار نمی‌کند، اول مشکل اصلی را پیدا کنید و برطرف کنید. بعد از آن می‌توانید برای بهبود عملکرد `useMemo` را اضافه کنید.

</Note>

<DeepDive>

#### چطور بفهمیم یک محاسبه پرهزینه است؟ {/*how-to-tell-if-a-calculation-is-expensive*/}

در حالت کلی، مگر اینکه در حال ساختن یا پیمایش هزاران آبجکت باشید، احتمالا محاسبه پرهزینه نیست. اگر می‌خواهید مطمئن‌تر شوید، می‌توانید برای اندازه‌گیری زمان صرف‌شده در یک تکه کد، لاگ کنسول اضافه کنید:

```js {1,3}
console.time('filter array');
const visibleTodos = filterTodos(todos, tab);
console.timeEnd('filter array');
```

تعامل مورد نظر را انجام دهید (مثلا تایپ کردن در input). بعد از آن در کنسول لاگ‌هایی مثل `filter array: 0.15ms` می‌بینید. اگر مجموع زمان ثبت‌شده قابل توجه باشد (مثلا `1ms` یا بیشتر)، ممکن است memoize کردن آن محاسبه منطقی باشد. به‌عنوان آزمایش، می‌توانید همان محاسبه را داخل `useMemo` قرار دهید تا بررسی کنید زمان کل ثبت‌شده برای آن تعامل کم شده است یا نه:

```js
console.time('filter array');
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab); // Skipped if todos and tab haven't changed
}, [todos, tab]);
console.timeEnd('filter array');
```

`useMemo` رندر *اول* را سریع‌تر نمی‌کند. فقط کمک می‌کند در به‌روزرسانی‌ها کارهای غیرضروری را رد کنید.

در نظر داشته باشید سیستم شما احتمالا از سیستم کاربران‌تان سریع‌تر است، پس بهتر است عملکرد را با یک کندسازی مصنوعی تست کنید. برای مثال، Chrome گزینه‌ی [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) را برای این کار دارد.

همچنین توجه کنید اندازه‌گیری عملکرد در محیط توسعه دقیق‌ترین نتیجه را نمی‌دهد. (برای مثال وقتی [Strict Mode](/reference/react/StrictMode) روشن است، هر کامپوننت را به‌جای یک بار، دو بار رندر می‌بینید.) برای دقیق‌ترین زمان‌سنجی، اپلیکیشن را برای production build کنید و روی دستگاهی مشابه دستگاه کاربران‌تان تست بگیرید.

</DeepDive>

<DeepDive>

#### آیا باید همه‌جا از useMemo استفاده کنید؟ {/*should-you-add-usememo-everywhere*/}

اگر اپلیکیشن شما شبیه این سایت است و بیشتر تعامل‌ها درشت‌دانه هستند (مثل جایگزین کردن یک صفحه یا یک بخش کامل)، memoization معمولا لازم نیست. در عوض، اگر اپ شما شبیه یک ویرایشگر طراحی است و بیشتر تعامل‌ها ریزدانه‌اند (مثل جابه‌جایی شکل‌ها)، احتمالا memoization خیلی کمک‌کننده است.

بهینه‌سازی با `useMemo` فقط در چند حالت ارزشمند است:

- محاسبه‌ای که در `useMemo` می‌گذارید به‌وضوح کند است و dependencyهای آن به‌ندرت تغییر می‌کنند.
- آن را به‌عنوان prop به کامپوننتی می‌دهید که با [`memo`](/reference/react/memo) پوشانده شده است. می‌خواهید اگر مقدار تغییر نکرده، re-render رد شود. memoization اجازه می‌دهد کامپوننت فقط وقتی dependencyها یکسان نیستند دوباره رندر شود.
- مقداری که پاس می‌دهید بعدا به‌عنوان dependency یک هوک دیگر استفاده می‌شود. مثلا ممکن است مقدار یک محاسبه‌ی `useMemo` دیگر به آن وابسته باشد، یا از طریق [`useEffect`](/reference/react/useEffect) به این مقدار وابسته باشید.

در سایر حالت‌ها، قرار دادن محاسبه داخل `useMemo` سودی ندارد. البته این کار معمولا آسیب جدی هم ندارد، بنابراین بعضی تیم‌ها ترجیح می‌دهند وارد تشخیص موردی نشوند و تا حد ممکن memoize کنند. نقطه‌ضعف این رویکرد، کاهش خوانایی کد است. علاوه‌براین، همه‌ی memoizationها موثر نیستند: فقط یک مقدار که «همیشه جدید» باشد کافی است تا memoization کل کامپوننت را از کار بیندازد.

**در عمل، با رعایت چند اصل می‌توانید نیاز به memoization را تا حد زیادی کم کنید:**

1. وقتی یک کامپوننت از نظر بصری دور کامپوننت‌های دیگر را می‌گیرد، اجازه دهید [JSX را به‌صورت children بپذیرد](/learn/passing-props-to-a-component#passing-jsx-as-children). در این حالت، وقتی wrapper state خودش را به‌روزرسانی می‌کند، React می‌داند children نیازی به re-render ندارند.
1. state محلی را ترجیح دهید و بیش از حد لازم [state را بالا نکشید](/learn/sharing-state-between-components). مثلا stateهای گذرا مثل فرم‌ها یا hover بودن یک آیتم را در بالای درخت یا در کتابخانه‌ی state سراسری نگه ندارید.
1. [منطق رندر را pure نگه دارید](/learn/keeping-components-pure). اگر re-render کردن یک کامپوننت مشکل ایجاد می‌کند یا artifact بصری قابل‌توجهی می‌سازد، این یک باگ در کامپوننت شماست. به‌جای اضافه کردن memoization، باگ را رفع کنید.
1. از [Effectهای غیرضروری که state را به‌روزرسانی می‌کنند](/learn/you-might-not-need-an-effect) پرهیز کنید. بیشتر مشکلات عملکردی در اپ‌های React از زنجیره‌ی به‌روزرسانی‌هایی می‌آیند که از Effectها شروع می‌شوند و باعث رندرهای تکراری کامپوننت‌ها می‌شوند.
1. تا جای ممکن [dependencyهای غیرضروری را از Effectها حذف کنید](/learn/removing-effect-dependencies). برای مثال، به‌جای memoization معمولا ساده‌تر است یک آبجکت یا تابع را داخل Effect یا بیرون کامپوننت منتقل کنید.

اگر یک تعامل مشخص هنوز کند به نظر می‌رسد، از [پروفایلر React Developer Tools](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) استفاده کنید تا ببینید کدام کامپوننت‌ها بیشترین سود را از memoization می‌برند و همان‌جا memoization اضافه کنید. این اصول باعث می‌شوند کامپوننت‌ها راحت‌تر debug و درک شوند، پس در هر صورت رعایتشان مفید است. در بلندمدت هم در حال تحقیق روی [memoization ریزدانه‌ی خودکار](https://www.youtube.com/watch?v=lGEMwh32soc) هستیم تا این مسئله یک‌بار برای همیشه حل شود.

</DeepDive>

<Recipes titleText="تفاوت useMemo با محاسبه‌ی مستقیم مقدار" titleId="examples-recalculation">

#### رد کردن محاسبه‌ی مجدد با `useMemo` {/*skipping-recalculation-with-usememo*/}

در این مثال، پیاده‌سازی `filterTodos` را **به‌صورت مصنوعی کند** کرده‌ایم تا ببینید وقتی یک تابع JavaScript که هنگام رندر صدا می‌زنید واقعا کند باشد چه اتفاقی می‌افتد. تب‌ها را عوض کنید و theme را تغییر دهید.

تعویض تب‌ها کند به نظر می‌رسد چون باعث می‌شود `filterTodos` کندشده دوباره اجرا شود. این رفتار طبیعی است چون `tab` تغییر کرده و کل محاسبه *باید* دوباره اجرا شود. (اگر کنجکاوید چرا دو بار اجرا می‌شود، [اینجا](#my-calculation-runs-twice-on-every-re-render) توضیح داده شده است.)

حالا theme را تغییر دهید. **به لطف `useMemo`، با وجود کندسازی مصنوعی همچنان سریع است!** فراخوانی کند `filterTodos` رد شد چون هم `todos` و هم `tab` (که به‌عنوان dependency به `useMemo` می‌دهید) از رندر قبلی تغییر نکرده‌اند.

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

#### محاسبه‌ی دوباره‌ی همیشگی یک مقدار {/*always-recalculating-a-value*/}

در این مثال هم پیاده‌سازی `filterTodos` را **به‌صورت مصنوعی کند** کرده‌ایم تا ببینید وقتی یک تابع JavaScript که هنگام رندر صدا می‌زنید واقعا کند باشد چه اتفاقی می‌افتد. تب‌ها را عوض کنید و theme را تغییر دهید.

برخلاف مثال قبلی، حالا تغییر theme هم کند است! دلیلش این است که **در این نسخه فراخوانی `useMemo` وجود ندارد**، بنابراین `filterTodos` کندشده در هر re-render فراخوانی می‌شود؛ حتی اگر فقط `theme` تغییر کرده باشد.

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

اما این همان کد است **با حذف کندسازی مصنوعی**. آیا نبودن `useMemo` هنوز محسوس است یا نه؟

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

خیلی وقت‌ها کد بدون memoization هم کاملا خوب کار می‌کند. اگر تعامل‌های شما به‌اندازه‌ی کافی سریع هستند، ممکن است به memoization نیازی نداشته باشید.

می‌توانید تعداد آیتم‌های todo را در `utils.js` بیشتر کنید و ببینید رفتار چگونه تغییر می‌کند. این محاسبه‌ی خاص از ابتدا خیلی پرهزینه نبود، اما اگر تعداد todoها زیاد شود، بخش عمده‌ی سربار در re-render خواهد بود نه در خود فیلتر کردن. پایین‌تر بخوانید تا ببینید چطور می‌توانید re-render را با `useMemo` بهینه کنید.

<Solution />

</Recipes>

---

### رد کردن re-render کامپوننت‌ها {/*skipping-re-rendering-of-components*/}

در بعضی موارد، `useMemo` می‌تواند به بهینه‌سازی عملکرد re-render کامپوننت‌های فرزند هم کمک کند. برای روشن شدن موضوع، فرض کنید کامپوننت `TodoList` مقدار `visibleTodos` را به‌عنوان prop به کامپوننت فرزند `List` پاس می‌دهد:

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

متوجه شده‌اید تغییر prop مربوط به `theme` برای لحظه‌ای اپ را متوقف می‌کند، اما اگر `<List />` را از JSX حذف کنید سریع می‌شود. این یعنی بهینه‌سازی کامپوننت `List` ارزش امتحان کردن را دارد.

**به‌صورت پیش‌فرض، وقتی یک کامپوننت re-render می‌شود، React همه‌ی فرزندانش را هم بازگشتی re-render می‌کند.** به همین دلیل وقتی `TodoList` با `theme` جدید re-render می‌شود، کامپوننت `List` هم دوباره رندر می‌شود. برای کامپوننت‌هایی که رندرشان محاسبات زیادی نمی‌خواهد این طبیعی است. اما اگر تایید کرده‌اید re-render کند است، می‌توانید `List` را در [`memo`](/reference/react/memo) بپیچید تا وقتی props آن مثل دفعه‌ی قبل است re-render را رد کند:

```js {3,5}
import { memo } from 'react';

const List = memo(function List({ items }) {
  // ...
});
```

**با این تغییر، اگر همه‌ی propsهای `List` مثل رندر قبلی باشند، re-render رد می‌شود.** اینجاست که cache کردن محاسبه اهمیت پیدا می‌کند. فرض کنید `visibleTodos` را بدون `useMemo` محاسبه کنید:

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

**در مثال بالا، تابع `filterTodos` همیشه یک آرایه‌ی *متفاوت* می‌سازد،** شبیه اینکه literal آبجکت `{}` همیشه یک آبجکت جدید می‌سازد. این موضوع معمولا مشکل نیست، اما یعنی propsهای `List` هرگز یکسان نمی‌شوند و بهینه‌سازی [`memo`](/reference/react/memo) کار نخواهد کرد. اینجا `useMemo` به کمک می‌آید:

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


**با قرار دادن محاسبه‌ی `visibleTodos` داخل `useMemo`، مطمئن می‌شوید که بین re-renderها همان مقدار *یکسان* را دارد** (تا زمانی که dependencyها تغییر کنند). لازم نیست هر محاسبه‌ای را در `useMemo` بگذارید، مگر دلیل مشخصی داشته باشید. در این مثال دلیلش این است که مقدار را به کامپوننتی می‌دهید که با [`memo`](/reference/react/memo) پوشانده شده، و این اجازه می‌دهد re-render رد شود. چند دلیل دیگر هم برای افزودن `useMemo` وجود دارد که پایین‌تر همین صفحه توضیح داده شده‌اند.

<DeepDive>

#### مموایز کردن نودهای JSX به‌صورت تکی {/*memoizing-individual-jsx-nodes*/}

به‌جای پیچیدن `List` در [`memo`](/reference/react/memo)، می‌توانید خود نود JSX یعنی `<List />` را داخل `useMemo` قرار دهید:

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

رفتار یکسان خواهد بود. اگر `visibleTodos` تغییر نکرده باشد، `List` دوباره رندر نمی‌شود.

نود JSXای مثل `<List items={visibleTodos} />` در واقع آبجکتی شبیه `{ type: List, props: { items: visibleTodos } }` است. ساختن این آبجکت خیلی کم‌هزینه است، اما React نمی‌داند محتوایش دقیقا مثل دفعه‌ی قبل هست یا نه. به همین دلیل، به‌طور پیش‌فرض React کامپوننت `List` را دوباره رندر می‌کند.

اما اگر React دقیقا همان JSX دفعه‌ی قبل را ببیند، دیگر تلاش نمی‌کند کامپوننت را دوباره رندر کند. دلیلش این است که نودهای JSX [immutable](https://en.wikipedia.org/wiki/Immutable_object) هستند. آبجکت نود JSX در طول زمان نمی‌تواند تغییر کرده باشد، بنابراین React می‌داند رد کردن re-render امن است. البته برای این کار باید نود *واقعا همان آبجکت* باشد، نه اینکه فقط در کد شبیه قبلی به نظر برسد. `useMemo` در این مثال همین کار را انجام می‌دهد.

قرار دادن دستی نودهای JSX داخل `useMemo` راحت نیست. مثلا نمی‌توانید این کار را شرطی انجام دهید. به همین دلیل، معمولا به‌جای نودهای JSX، خود کامپوننت را با [`memo`](/reference/react/memo) می‌پوشانند.

</DeepDive>

<Recipes titleText="تفاوت بین رد کردن re-render و re-render شدن همیشگی" titleId="examples-rerendering">

#### رد کردن re-render با `useMemo` و `memo` {/*skipping-re-rendering-with-usememo-and-memo*/}

در این مثال، کامپوننت `List` را **به‌صورت مصنوعی کند** کرده‌ایم تا ببینید وقتی یک کامپوننت React که رندر می‌کنید واقعا کند باشد چه اتفاقی می‌افتد. تب‌ها را عوض کنید و theme را تغییر دهید.

تعویض تب‌ها کند به نظر می‌رسد چون `List` کندشده را مجبور به re-render می‌کند. این طبیعی است چون `tab` تغییر کرده و باید انتخاب جدید کاربر روی صفحه بازتاب داده شود.

حالا theme را تغییر دهید. **به لطف `useMemo` در کنار [`memo`](/reference/react/memo)، با وجود کندسازی مصنوعی همچنان سریع است!** کامپوننت `List` re-render را رد کرد چون آرایه‌ی `visibleTodos` از رندر قبلی تغییر نکرده بود. `visibleTodos` هم تغییر نکرده چون `todos` و `tab` (که به‌عنوان dependency به `useMemo` می‌دهید) از رندر قبلی ثابت مانده‌اند.

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

#### یک کامپوننت که همیشه re-render می‌شود {/*always-re-rendering-a-component*/}

در این مثال، پیاده‌سازی `List` هم **به‌صورت مصنوعی کند** شده تا ببینید وقتی یک کامپوننت React که رندر می‌کنید واقعا کند باشد چه اتفاقی می‌افتد. تب‌ها را عوض کنید و theme را تغییر دهید.

برخلاف مثال قبلی، حالا تغییر theme هم کند است! چون **در این نسخه فراخوانی `useMemo` وجود ندارد**، `visibleTodos` همیشه یک آرایه‌ی جدید است و کامپوننت `List` کندشده نمی‌تواند re-render را رد کند.

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

اما این همان کد است **با حذف کندسازی مصنوعی**. آیا نبود `useMemo` محسوس است یا نه؟

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

خیلی وقت‌ها کد بدون memoization هم کاملا خوب کار می‌کند. اگر تعامل‌ها به‌اندازه‌ی کافی سریع باشند، به memoization نیاز ندارید.

یادتان باشد برای درک واقع‌بینانه از عامل کندی اپ، باید React را در حالت production اجرا کنید، [React Developer Tools](/learn/react-developer-tools) را غیرفعال کنید و روی دستگاه‌هایی شبیه دستگاه کاربران‌تان تست بگیرید.

<Solution />

</Recipes>

---

### جلوگیری از اجرا شدن بیش‌ازحد یک Effect {/*preventing-an-effect-from-firing-too-often*/}

گاهی ممکن است بخواهید از یک مقدار داخل [Effect](/learn/synchronizing-with-effects) استفاده کنید:

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

این‌جا یک مشکل ایجاد می‌شود. [هر مقدار reactive باید به‌عنوان dependency برای Effect شما اعلام شود.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) اما اگر `options` را dependency اعلام کنید، باعث می‌شود Effect مدام به اتاق چت دوباره متصل شود:


```js {5}
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // 🔴 Problem: This dependency changes on every render
  // ...
```

برای حل این مشکل، می‌توانید آبجکتی را که در Effect نیاز دارید داخل `useMemo` قرار دهید:

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

این کار تضمین می‌کند که اگر `useMemo` آبجکت cacheشده را برگرداند، آبجکت `options` بین re-renderها یکسان بماند.

اما چون `useMemo` یک بهینه‌سازی عملکردی است و نه تضمین معنایی، React ممکن است اگر [دلیل مشخصی وجود داشته باشد](#caveats) مقدار cacheشده را دور بیندازد. این موضوع باعث اجرای دوباره‌ی Effect هم می‌شود، **پس بهتر است اصل نیاز به dependency تابع/آبجکت را حذف کنید** و آبجکت را *داخل* Effect ببرید:

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

حالا کدتان ساده‌تر است و دیگر به `useMemo` نیاز ندارد. [بیشتر درباره حذف dependencyهای Effect بخوانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)


### مموایز کردن dependency یک هوک دیگر {/*memoizing-a-dependency-of-another-hook*/}

فرض کنید محاسبه‌ای دارید که به آبجکتی وابسته است که مستقیما در بدنه‌ی کامپوننت ساخته شده:

```js {2}
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text };

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body
  // ...
```

وابستگی به آبجکتی از این نوع، هدف memoization را بی‌اثر می‌کند. وقتی یک کامپوننت re-render می‌شود، تمام کدی که مستقیما داخل بدنه‌ی آن است دوباره اجرا می‌شود. **خطوطی که آبجکت `searchOptions` را می‌سازند هم در هر re-render اجرا می‌شوند.** چون `searchOptions` dependency فراخوانی `useMemo` شما است و هر بار متفاوت است، React می‌فهمد dependencyها فرق کرده‌اند و `searchItems` را هر بار دوباره محاسبه می‌کند.

برای حل این مسئله، می‌توانید خود آبجکت `searchOptions` را memoize کنید و بعد به‌عنوان dependency پاس دهید:

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

در مثال بالا، اگر `text` تغییر نکند، آبجکت `searchOptions` هم تغییر نمی‌کند. با این حال، راه بهتر این است که تعریف `searchOptions` را *داخل* تابع محاسبه‌ی `useMemo` ببرید:

```js {3}
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes
  // ...
```

حالا محاسبه‌ی شما مستقیم به `text` وابسته است (که رشته است و نمی‌تواند به‌شکل «تصادفی» متفاوت شود).

---

### مموایز کردن یک تابع {/*memoizing-a-function*/}

فرض کنید کامپوننت `Form` داخل [`memo`](/reference/react/memo) پیچیده شده است. می‌خواهید یک تابع را به‌عنوان prop به آن پاس دهید:

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

همان‌طور که `{}` یک آبجکت جدید می‌سازد، تعریف تابع‌هایی مثل `function() {}` و عبارت‌هایی مثل `() => {}` هم در هر re-render یک تابع *متفاوت* تولید می‌کنند. خود ساختن تابع جدید مشکلی نیست و نیازی به پرهیز از آن نیست. اما اگر `Form` memoize شده باشد، احتمالا می‌خواهید وقتی props تغییر نکرده‌اند re-render نشود. propی که *همیشه* متفاوت است، هدف memoization را بی‌اثر می‌کند.

برای memoize کردن تابع با `useMemo`، تابع محاسبه‌ی شما باید یک تابع دیگر برگرداند:

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

این شکل کمی دست‌وپاگیر است. **memoize کردن تابع آن‌قدر رایج است که React یک هوک داخلی مخصوصش دارد. به‌جای `useMemo` از [`useCallback`](/reference/react/useCallback) استفاده کنید** تا مجبور به نوشتن تابع تودرتوی اضافه نباشید:

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

دو مثال بالا کاملا معادل‌اند. تنها مزیت `useCallback` این است که لازم نیست یک تابع تودرتوی اضافه بنویسید؛ کار دیگری انجام نمی‌دهد. [درباره `useCallback` بیشتر بخوانید.](/reference/react/useCallback)

---

## رفع اشکال {/*troubleshooting*/}

### محاسبه‌ی من در هر re-render دو بار اجرا می‌شود {/*my-calculation-runs-twice-on-every-re-render*/}

در [Strict Mode](/reference/react/StrictMode)، React بعضی از توابع شما را به‌جای یک بار، دو بار فراخوانی می‌کند:

```js {2,5,6}
function TodoList({ todos, tab }) {
  // This component function will run twice for every render.

  const visibleTodos = useMemo(() => {
    // This calculation will run twice if any of the dependencies change.
    return filterTodos(todos, tab);
  }, [todos, tab]);

  // ...
```

این رفتار طبیعی است و نباید باعث خراب شدن کد شما شود.

این رفتار **فقط در توسعه** است و به شما کمک می‌کند [کامپوننت‌ها را pure نگه دارید.](/learn/keeping-components-pure) React نتیجه‌ی یکی از فراخوانی‌ها را استفاده می‌کند و نتیجه‌ی دیگری را نادیده می‌گیرد. تا وقتی کامپوننت و تابع محاسبه‌ی شما pure باشند، این موضوع روی منطق برنامه اثر نمی‌گذارد. اما اگر ناخواسته impure باشند، همین رفتار به شما کمک می‌کند خطا را ببینید و رفع کنید.

برای مثال، این تابع محاسبه‌ی impure آرایه‌ای را که به‌صورت prop گرفته‌اید mutate می‌کند:

```js {2-3}
  const visibleTodos = useMemo(() => {
    // 🚩 Mistake: mutating a prop
    todos.push({ id: 'last', text: 'Go for a walk!' });
    const filtered = filterTodos(todos, tab);
    return filtered;
  }, [todos, tab]);
```

React تابع شما را دو بار صدا می‌زند، پس می‌بینید todo دوبار اضافه شده است. محاسبه‌ی شما نباید آبجکت‌های موجود را تغییر دهد، اما تغییر دادن آبجکت‌های *جدیدی* که حین محاسبه ساخته‌اید مشکلی ندارد. مثلا اگر `filterTodos` همیشه یک آرایه‌ی *متفاوت* برگرداند، می‌توانید همان آرایه را mutate کنید:

```js {3,4}
  const visibleTodos = useMemo(() => {
    const filtered = filterTodos(todos, tab);
    // ✅ Correct: mutating an object you created during the calculation
    filtered.push({ id: 'last', text: 'Go for a walk!' });
    return filtered;
  }, [todos, tab]);
```

[pure نگه داشتن کامپوننت‌ها](/learn/keeping-components-pure) را بخوانید تا درباره‌ی خلوص بیشتر یاد بگیرید.

همچنین راهنماهای [به‌روزرسانی آبجکت‌ها](/learn/updating-objects-in-state) و [به‌روزرسانی آرایه‌ها](/learn/updating-arrays-in-state) بدون mutation را هم ببینید.

---

### فراخوانی `useMemo` باید آبجکت برگرداند، اما `undefined` برمی‌گرداند {/*my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined*/}

این کد کار نمی‌کند:

```js {1-2,5}
  // 🔴 You can't return an object from an arrow function with () => {
  const searchOptions = useMemo(() => {
    matchMode: 'whole-word',
    text: text
  }, [text]);
```

در JavaScript، عبارت `() => {` بدنه‌ی arrow function را شروع می‌کند، بنابراین آکولاد `{` بخشی از آبجکت شما محسوب نمی‌شود. به همین دلیل آبجکتی برنمی‌گردد و خطا ایجاد می‌کند. می‌توانید با اضافه کردن پرانتز مثل `({` و `})` آن را اصلاح کنید:

```js {1-2,5}
  // This works, but is easy for someone to break again
  const searchOptions = useMemo(() => ({
    matchMode: 'whole-word',
    text: text
  }), [text]);
```

با این حال، این روش همچنان گیج‌کننده است و به‌راحتی ممکن است کسی با حذف پرانتزها آن را خراب کند.

برای جلوگیری از این اشتباه، `return` را صریح بنویسید:

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

### هر بار کامپوننتم رندر می‌شود، محاسبه‌ی `useMemo` دوباره اجرا می‌شود {/*every-time-my-component-renders-the-calculation-in-usememo-re-runs*/}

مطمئن شوید آرایه‌ی dependency را به‌عنوان آرگومان دوم مشخص کرده‌اید.

اگر آرایه‌ی dependency را فراموش کنید، `useMemo` هر بار محاسبه را دوباره اجرا می‌کند:

```js {2-3}
function TodoList({ todos, tab }) {
  // 🔴 Recalculates every time: no dependency array
  const visibleTodos = useMemo(() => filterTodos(todos, tab));
  // ...
```

نسخه‌ی درست، آرایه‌ی dependency را به‌عنوان آرگومان دوم می‌گیرد:

```js {2-3}
function TodoList({ todos, tab }) {
  // ✅ Does not recalculate unnecessarily
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
```

اگر این هم کمک نکرد، مشکل این است که حداقل یکی از dependencyها نسبت به رندر قبلی متفاوت است. می‌توانید با لاگ کردن دستی dependencyها در کنسول این موضوع را debug کنید:

```js
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  console.log([todos, tab]);
```

بعد می‌توانید در کنسول روی آرایه‌های مربوط به رندرهای مختلف راست‌کلیک کنید و برای هر دو گزینه‌ی "Store as a global variable" را بزنید. فرض کنید اولی با `temp1` و دومی با `temp2` ذخیره شده باشد؛ حالا می‌توانید در کنسول مرورگر بررسی کنید آیا dependencyهای دو آرایه یکسان هستند یا نه:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

وقتی dependency مشکل‌ساز را پیدا کردید، یا راهی برای حذف آن پیدا کنید یا [خودش را هم memoize کنید.](#memoizing-a-dependency-of-another-hook)

---

### لازم دارم `useMemo` را برای هر آیتم لیست داخل حلقه صدا بزنم، اما مجاز نیست {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

فرض کنید کامپوننت `Chart` با [`memo`](/reference/react/memo) پوشانده شده است. می‌خواهید وقتی `ReportList` re-render می‌شود، re-render شدن همه‌ی `Chart`ها را رد کنید. اما نمی‌توانید `useMemo` را داخل حلقه صدا بزنید:

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

در عوض، برای هر آیتم یک کامپوننت جدا استخراج کنید و داده را برای همان آیتم memoize کنید:

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

یا می‌توانید `useMemo` را حذف کنید و خود `Report` را در [`memo`](/reference/react/memo) بپیچید. اگر prop مربوط به `item` تغییر نکند، `Report` re-render نمی‌شود و در نتیجه `Chart` هم re-render نخواهد شد:

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
