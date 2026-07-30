---
title: useCallback
---

<Intro>

`useCallback` یک هوک ری‌اکت است که به شما اجازه می‌دهد یک تعریف تابع را بین رندرهای مجدد کش کنید.

```js
const cachedFn = useCallback(fn, dependencies)
```

</Intro>

<Note>

[React Compiler](/learn/react-compiler) به‌طور خودکار مقادیر و توابع را مموری‌زیشن می‌کند، و نیاز به فراخوانی‌های دستی `useCallback` را کاهش می‌دهد. می‌توانید از کامپایلر برای انجام مموری‌زیشن به‌طور خودکار استفاده کنید.

</Note>

<InlineToc />

---

## مرجع {/*reference*/}

### `useCallback(fn, dependencies)` {/*usecallback*/}

برای کش کردن یک تعریف تابع بین رندرهای مجدد، `useCallback` را در سطح بالای کامپوننت خود فراخوانی کنید:

```js {4,9}
import { useCallback } from 'react';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
```

[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `fn`: مقدار تابعی که می‌خواهید کش کنید. می‌تواند هر آرگومانی بگیرد و هر مقداری برگرداند. ری‌اکت در طول رندر اولیه تابع شما را برمی‌گرداند (نه فراخوانی می‌کند!). در رندرهای بعدی، اگر `dependencies` از آخرین رندر تغییر نکرده باشند، ری‌اکت دوباره همان تابع را به شما می‌دهد. در غیر این صورت، تابعی را که در طول رندر کنونی ارسال کرده‌اید به شما می‌دهد، و آن را در صورتی که بعداً بتواند دوباره استفاده شود ذخیره می‌کند. ری‌اکت تابع شما را فراخوانی نمی‌کند. تابع به شما برگردانده می‌شود تا خودتان تصمیم بگیرید چه زمانی و آیا آن را فراخوانی کنید یا نه.

* `dependencies`: لیست تمام مقادیر واکنش‌گرا که درون کد `fn` به آن‌ها ارجاع شده است. مقادیر واکنش‌گرا شامل پراپس، استیت، و تمام متغیرها و توابعی است که مستقیماً در بدنهٔ کامپوننت شما تعریف شده‌اند. اگر لینتر شما [برای ری‌اکت پیکربندی شده](/learn/editor-setup#linting) باشد، تأیید می‌کند که هر مقدار واکنش‌گرا به‌درستی به‌عنوان یک وابستگی مشخص شده است. لیست وابستگی‌ها باید تعداد آیتم‌های ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی آن با استفاده از الگوریتم مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند.

#### مقدار بازگشتی {/*returns*/}

در رندر اولیه، `useCallback` تابع `fn`‌ای که ارسال کرده‌اید را برمی‌گرداند.

در رندرهای بعدی، یا یک تابع `fn` از قبل ذخیره‌شده از آخرین رندر را برمی‌گرداند (اگر وابستگی‌ها تغییر نکرده‌اند)، یا تابع `fn`‌ای را که در طول این رندر ارسال کرده‌اید برمی‌گرداند.

#### نکات {/*caveats*/}

* `useCallback` یک هوک است، بنابراین فقط می‌توانید آن را **در سطح بالای کامپوننت** یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را درون حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت جدید استخراج کنید و استیت را به آن منتقل کنید.
* ری‌اکت **تابع کش‌شده را دور نمی‌ریزد مگر اینکه دلیل خاصی برای این کار وجود داشته باشد.** مثلاً در محیط توسعه، ری‌اکت وقتی فایل کامپوننت خود را ویرایش می‌کنید، کش را دور می‌ریزد. هم در محیط توسعه و هم در محیط تولید، اگر کامپوننت شما در طول mount اولیه suspend شود، ری‌اکت کش را دور می‌ریزد. در آینده، ری‌اکت ممکن است ویژگی‌های بیشتری اضافه کند که از دور ریختن کش بهره می‌برند — مثلاً اگر ری‌اکت در آینده پشتیبانی داخلی از لیست‌های مجازی‌سازی‌شده را اضافه کند، منطقی خواهد بود که کش آیتم‌هایی که از viewport جدول مجازی‌سازی‌شده خارج می‌شوند را دور بریزد. این باید با انتظارات شما مطابقت داشته باشد اگر به `useCallback` به‌عنوان یک بهینه‌سازی عملکرد تکیه می‌کنید. در غیر این صورت، یک [متغیر استیت](/reference/react/useState#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) یا یک [رفرنس](/reference/react/useRef#avoiding-recreating-the-ref-contents) ممکن است مناسب‌تر باشد.

---

## کاربرد {/*usage*/}

### رد کردن رندر مجدد کامپوننت‌ها {/*skipping-re-rendering-of-components*/}

هنگام بهینه‌سازی عملکرد رندر، گاهی نیاز دارید توابعی را که به کامپوننت‌های فرزند ارسال می‌کنید کش کنید. بیایید ابتدا به نحوهٔ انجام این کار نگاه کنیم، و سپس ببینیم در چه مواردی مفید است.

برای کش کردن یک تابع بین رندرهای مجدد کامپوننت خود، تعریف آن را در هوک `useCallback` بپیچید:

```js [[3, 4, "handleSubmit"], [2, 9, "[productId, referrer]"]]
import { useCallback } from 'react';

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
  // ...
```

باید دو چیز را به `useCallback` ارسال کنید:

1. یک تعریف تابع که می‌خواهید بین رندرهای مجدد کش کنید.
2. یک <CodeStep step={2}>لیست وابستگی‌ها</CodeStep> که شامل هر مقداری درون کامپوننت شما که درون تابع شما استفاده می‌شود.

در رندر اولیه، <CodeStep step={3}>تابع برگردانده‌شده</CodeStep>‌ای که از `useCallback` دریافت می‌کنید همان تابعی خواهد بود که ارسال کرده‌اید.

در رندرهای بعدی، ری‌اکت <CodeStep step={2}>وابستگی‌ها</CodeStep> را با وابستگی‌هایی که در رندر قبلی ارسال کرده‌اید مقایسه می‌کند. اگر هیچ‌کدام از وابستگی‌ها تغییر نکرده باشند (مقایسه با [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is))، `useCallback` همان تابع قبلی را برمی‌گرداند. در غیر این صورت، `useCallback` تابعی را که در *این* رندر ارسال کرده‌اید برمی‌گرداند.

به عبارت دیگر، `useCallback` یک تابع را بین رندرهای مجدد تا زمانی که وابستگی‌هایش تغییر کنند کش می‌کند.

**بیایید یک مثال را مرور کنیم تا ببینیم چه زمانی این مفید است.**

فرض کنید یک تابع `handleSubmit` را از `ProductPage` به کامپوننت `ShippingForm` ارسال می‌کنید:

```js {5}
function ProductPage({ productId, referrer, theme }) {
  // ...
  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
```

متوجه شده‌اید که تغییر پراپ `theme` برای لحظه‌ای برنامه را فریز می‌کند، اما اگر `<ShippingForm />` را از JSX خود حذف کنید، سریع به نظر می‌رسد. این به شما می‌گوید که امتحان کردن بهینه‌سازی کامپوننت `ShippingForm` ارزش دارد.

**به‌طور پیش‌فرض، وقتی یک کامپوننت دوباره رندر می‌شود، ری‌اکت تمام فرزندانش را به‌صورت بازگشتی دوباره رندر می‌کند.** به همین دلیل است که وقتی `ProductPage` با `theme` متفاوتی رندر مجدد می‌شود، کامپوننت `ShippingForm` *همچنین* رندر مجدد می‌شود. این برای کامپوننت‌هایی که نیاز به محاسبهٔ زیادی برای رندر مجدد ندارند مشکلی نیست. اما اگر تأیید کردید که رندر مجدد کند است، می‌توانید با پیچیدن `ShippingForm` در [`memo`](/reference/react/memo) به آن بگویید وقتی پراپس‌هایش با رندر قبلی یکسان هستند از رندر مجدد بپرد:

```js {3,5}
import { memo } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});
```

**با این تغییر، اگر تمام پراپس‌های `ShippingForm` با رندر قبلی *یکسان* باشند، از رندر مجدد می‌پرد.** اینجاست که کش کردن یک تابع مهم می‌شود! فرض کنید `handleSubmit` را بدون `useCallback` تعریف کردید:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // Every time the theme changes, this will be a different function...
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      {/* ... so ShippingForm's props will never be the same, and it will re-render every time */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**در جاوااسکریپت، یک `function () {}` یا `() => {}` همیشه یک تابع *متفاوت* ایجاد می‌کند،** مشابه به اینکه literal شیء `{}` همیشه یک شیء جدید ایجاد می‌کند. معمولاً این مشکل ایجاد نمی‌کند، اما به این معناست که پراپس‌های `ShippingForm` هرگز یکسان نخواهند بود، و بهینه‌سازی [`memo`](/reference/react/memo) شما کار نخواهد کرد. اینجاست که `useCallback` به کار می‌آید:

```js {2,3,8,12-13}
function ProductPage({ productId, referrer, theme }) {
  // Tell React to cache your function between re-renders...
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ...so as long as these dependencies don't change...

  return (
    <div className={theme}>
      {/* ...ShippingForm will receive the same props and can skip re-rendering */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

**با پیچیدن `handleSubmit` در `useCallback`، اطمینان حاصل می‌کنید که بین رندرهای مجدد *همان* تابع است** (تا زمانی که وابستگی‌ها تغییر کنند). *لازم نیست* تابعی را در `useCallback` بپیچید مگر اینکه به دلیل خاصی این کار را انجام دهید. در این مثال، دلیل این است که آن را به کامپوننتی که در [`memo`](/reference/react/memo) پیچیده شده ارسال می‌کنید، و این به آن اجازه می‌دهد از رندر مجدد بپرد. دلایل دیگری نیز وجود دارد که ممکن است به `useCallback` نیاز داشته باشید که در ادامهٔ این صفحه توضیح داده شده‌اند.

<Note>

**فقط باید به `useCallback` به‌عنوان یک بهینه‌سازی عملکرد تکیه کنید.** اگر کد شما بدون آن کار نمی‌کند، مشکل زیربنایی را پیدا کنید و ابتدا آن را برطرف کنید. سپس می‌توانید `useCallback` را دوباره اضافه کنید.

</Note>

<DeepDive>

#### رابطهٔ `useCallback` با `useMemo` چگونه است؟ {/*how-is-usecallback-related-to-usememo*/}

اغلب [`useMemo`](/reference/react/useMemo) را در کنار `useCallback` می‌بینید. هر دو هنگام تلاش برای بهینه‌سازی یک کامپوننت فرزند مفید هستند. آن‌ها به شما اجازه می‌دهند چیزی را که ارسال می‌کنید [مموری‌زیشن](https://en.wikipedia.org/wiki/Memoization) (یا به عبارت دیگر، کش) کنید:

```js {6-8,10-15,19}
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { // Calls your function and caches its result
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // Caches your function itself
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

تفاوت در *چیزی* است که اجازه می‌دهید کش کنید:

* **[`useMemo`](/reference/react/useMemo) *نتیجهٔ* فراخوانی تابع شما را کش می‌کند.** در این مثال، نتیجهٔ فراخوانی `computeRequirements(product)` را کش می‌کند تا مگر اینکه `product` تغییر کرده باشد، تغییر نکند. این به شما اجازه می‌دهد شیء `requirements` را پایین ارسال کنید بدون اینکه `ShippingForm` به‌طور غیرضروری رندر مجدد شود. در صورت لزوم، ری‌اکت تابعی را که در طول رندر ارسال کرده‌اید فراخوانی می‌کند تا نتیجه را محاسبه کند.
* **`useCallback` *خود تابع* را کش می‌کند.** برخلاف `useMemo`، تابعی که ارائه می‌کنید را فراخوانی نمی‌کند. در عوض، تابعی که ارائه کرده‌اید را کش می‌کند تا `handleSubmit` *خودش* مگر اینکه `productId` یا `referrer` تغییر کرده باشند، تغییر نکند. این به شما اجازه می‌دهد تابع `handleSubmit` را پایین ارسال کنید بدون اینکه `ShippingForm` به‌طور غیرضروری رندر مجدد شود. کد شما تا زمانی که کاربر فرم را ارسال نکند اجرا نخواهد شد.

اگر از قبل با [`useMemo`](/reference/react/useMemo) آشنا هستید، ممکن است کمک‌کننده باشد که `useCallback` را به این صورت در نظر بگیرید:

```js {expectedErrors: {'react-compiler': [3]}}
// Simplified implementation (inside React)
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

[دربارهٔ تفاوت بین `useMemo` و `useCallback` بیشتر بخوانید.](/reference/react/useMemo#memoizing-a-function)

</DeepDive>

<DeepDive>

#### آیا باید `useCallback` را همه‌جا اضافه کنید؟ {/*should-you-add-usecallback-everywhere*/}

اگر برنامهٔ شما مانند این سایت است، و اکثر تعاملات درشت هستند (مانند جایگزینی یک صفحه یا یک بخش کامل)، معمولاً مموری‌زیشن ضروری نیست. از سوی دیگر، اگر برنامهٔ شما بیشتر شبیه به یک ویرایشگر نقاشی است، و اکثر تعاملات دانه‌دانه هستند (مانند حرکت دادن شکل‌ها)، ممکن است متوجه شوید مموری‌زیشن بسیار مفید است.

کش کردن یک تابع با `useCallback` فقط در چند مورد ارزشمند است:

- آن را به‌عنوان پراپ به کامپوننتی که در [`memo`](/reference/react/memo) پیچیده شده ارسال می‌کنید. می‌خواهید اگر مقدار تغییر نکرده از رندر مجدد بپرید. مموری‌زیشن اجازه می‌دهد کامپوننت شما فقط اگر وابستگی‌ها تغییر کرده باشند رندر مجدد شود.
- تابعی که ارسال می‌کنید بعداً به‌عنوان وابستگی یک هوک استفاده می‌شود. مثلاً تابع دیگری که در `useCallback` پیچیده شده به آن وابسته است، یا شما از [`useEffect`](/reference/react/useEffect) به این تابع وابسته هستید.

هیچ فایده‌ای در پیچیدن یک تابع در `useCallback` در موارد دیگر وجود ندارد. هیچ ضرر قابل توجهی هم در انجام آن نیست، بنابراین برخی تیم‌ها انتخاب می‌کنند که به موارد فردی فکر نکنند، و تا حد ممکن مموری‌زیشن کنند. عیب آن این است که کد کمتر خوانا می‌شود. همچنین، نه همهٔ مموری‌زیشن‌ها مؤثرند: یک مقدار واحد که «همیشه جدید» است برای خراب کردن مموری‌زیشن کل کامپوننت کافی است.

توجه کنید که `useCallback` از *ایجاد* تابع جلوگیری نمی‌کند. شما همیشه در حال ایجاد یک تابع هستید (و این مشکلی ندارد!)، اما ری‌اکت آن را نادیده می‌گیرد و اگر چیزی تغییر نکرده باشد یک تابع کش‌شده را به شما برمی‌گرداند.

**در عمل، می‌توانید با پیروی از چند اصل، بسیاری از مموری‌زیشن‌ها را غیرضروری کنید:**

1. وقتی یک کامپوننت از نظر بصری کامپوننت‌های دیگر را می‌پوشاند، اجازه دهید [JSX را به‌عنوان فرزند بپذیرد.](/learn/passing-props-to-a-component#passing-jsx-as-children) سپس، اگر کامپوننت پوشاننده استیت خودش را به‌روز کند، ری‌اکت می‌داند که فرزندانش نیازی به رندر مجدد ندارند.
1. استیت محلی را ترجیح دهید و [استیت را بالاتر از حد لازم بالا نیاورید.](/learn/sharing-state-between-components) استیت گذرایی مانند فرم‌ها و اینکه آیا یک آیتم hover شده یا نه را در بالای درخت یا در یک کتابخانهٔ استیت سراسری نگه ندارید.
1. [منطق رندر خود را خالص نگه دارید.](/learn/keeping-components-pure) اگر رندر مجدد یک کامپوننت باعث مشکل می‌شود یا برخی مصنوعات بصری قابل توجه تولید می‌کند، این یک اشکال در کامپوننت شماست! به جای اضافه کردن مموری‌زیشن، اشکال را برطرف کنید.
1. از [افکت‌های غیرضروری که استیت را به‌روز می‌کنند](/learn/you-might-not-need-an-effect) اجتناب کنید. اکثر مشکلات عملکرد در برنامه‌های ری‌اکت ناشی از زنجیره‌هایی از به‌روزرسانی‌ها هستند که از افکت‌ها سرچشمه می‌گیرند و باعث می‌شوند کامپوننت‌های شما دوباره و دوباره رندر شوند.
1. سعی کنید [وابستگی‌های غیرضروری را از افکت‌های خود حذف کنید.](/learn/removing-effect-dependencies) مثلاً به جای مموری‌زیشن، اغلب ساده‌تر است که یک شیء یا یک تابع را درون افکت یا بیرون کامپوننت منتقل کنید.

اگر یک تعامل خاص همچنان کند به نظر می‌رسد، از [React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) استفاده کنید تا ببینید کدام کامپوننت‌ها بیشترین بهره را از مموری‌زیشن می‌برند، و در صورت نیاز مموری‌زیشن اضافه کنید. این اصول کامپوننت‌های شما را آسان‌تر برای دیباگ و درک می‌کند، بنابراین به هر حال خوب است که از آن‌ها پیروی کنید. در درازمدت، ما در حال تحقیق روی [انجام مموری‌زیشن به‌طور خودکار](https://www.youtube.com/watch?v=lGEMwh32soc) هستیم تا این مشکل را یک‌بار برای همیشه حل کنیم.

</DeepDive>

<Recipes titleText="The difference between useCallback and declaring a function directly" titleId="examples-rerendering">

#### رد کردن رندر مجدد با `useCallback` و `memo` {/*skipping-re-rendering-with-usecallback-and-memo*/}

در این مثال، کامپوننت `ShippingForm` **به‌طور مصنوعی کند شده است** تا بتوانید ببینید وقتی یک کامپوننت ری‌اکتی که رندر می‌کنید واقعاً کند است چه اتفاقی می‌افتد. شمارنده را افزایش دهید و تم را تغییر دهید.

افزایش شمارنده کند به نظر می‌رسد زیرا `ShippingForm` کندشده را مجبور به رندر مجدد می‌کند. این مورد انتظار می‌رود زیرا شمارنده تغییر کرده است، و بنابراین باید انتخاب جدید کاربر را روی صفحه منعکس کنید.

سپس، تغییر تم را امتحان کنید. **به لطف `useCallback` در کنار [`memo`](/reference/react/memo)، با وجود کندی مصنوعی سریع است!** `ShippingForm` از رندر مجدد پرهیز کرد زیرا تابع `handleSubmit` تغییر نکرده است. تابع `handleSubmit` تغییر نکرده زیرا هم `productId` و هم `referrer` (وابستگی‌های `useCallback` شما) از رندر قبلی تغییر نکرده‌اند.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import { useCallback } from 'react';
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>Note: <code>ShippingForm</code> is artificially slowed down!</b></p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
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

#### رندر مجدد همیشگی یک کامپوننت {/*always-re-rendering-a-component*/}

در این مثال، پیاده‌سازی `ShippingForm` نیز **به‌طور مصنوعی کند شده است** تا بتوانید ببینید وقتی برخی کامپوننت‌های ری‌اکتی که رندر می‌کنید واقعاً کند هستند چه اتفاقی می‌افتد. شمارنده را افزایش دهید و تم را تغییر دهید.

برخلاف مثال قبلی، تغییر تم نیز اکنون کند است! این به این دلیل است که **در این نسخه هیچ فراخوانی `useCallback` وجود ندارد،** بنابراین `handleSubmit` همیشه یک تابع جدید است، و کامپوننت `ShippingForm` کندشده نمی‌تواند از رندر مجدد بپرد.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js {expectedErrors: {'react-compiler': [7, 8]}} src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('[ARTIFICIALLY SLOW] Rendering <ShippingForm />');
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><b>Note: <code>ShippingForm</code> is artificially slowed down!</b></p>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
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


با این حال، در اینجا همان کد **با حذف کندی مصنوعی** آمده است. آیا نبود `useCallback` قابل توجه است یا نه؟

<Sandpack>

```js src/App.js
import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Dark mode
      </label>
      <hr />
      <ProductPage
        referrerId="wizard_of_oz"
        productId={123}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
```

```js src/ProductPage.js active
import ShippingForm from './ShippingForm.js';

export default function ProductPage({ productId, referrer, theme }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
```

```js src/ShippingForm.js
import { memo, useState } from 'react';

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  const [count, setCount] = useState(1);

  console.log('Rendering <ShippingForm />');

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      ...Object.fromEntries(formData),
      count
    };
    onSubmit(orderDetails);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Number of items:
        <button type="button" onClick={() => setCount(count - 1)}>–</button>
        {count}
        <button type="button" onClick={() => setCount(count + 1)}>+</button>
      </label>
      <label>
        Street:
        <input name="street" />
      </label>
      <label>
        City:
        <input name="city" />
      </label>
      <label>
        Postal code:
        <input name="zipCode" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
});

export default ShippingForm;
```

```css
label {
  display: block; margin-top: 10px;
}

input {
  margin-left: 5px;
}

button[type="button"] {
  margin: 5px;
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

در نظر داشته باشید که برای درک واقع‌بینانهٔ آنچه واقعاً برنامهٔ شما را کند می‌کند، باید ری‌اکت را در حالت تولید اجرا کنید، [React Developer Tools](/learn/react-developer-tools) را غیرفعال کنید، و از دستگاه‌هایی مشابه دستگاه‌های کاربران برنامه‌تان استفاده کنید.

<Solution />

</Recipes>

---

### به‌روزرسانی استیت از یک کالبک مموری‌زیشن‌شده {/*updating-state-from-a-memoized-callback*/}

گاهی ممکن است نیاز داشته باشید استیت را بر اساس استیت قبلی از یک کالبک مموری‌زیشن‌شده به‌روز کنید.

این تابع `handleAddTodo`، `todos` را به‌عنوان وابستگی مشخص می‌کند زیرا todos بعدی را از آن محاسبه می‌کند:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

معمولاً می‌خواهید توابع مموری‌زیشن‌شده تا حد امکان وابستگی‌های کمی داشته باشند. وقتی مقداری استیت را فقط برای محاسبهٔ استیت بعدی می‌خوانید، می‌توانید با ارسال یک [تابع به‌روزرسانی](/reference/react/useState#updating-state-based-on-the-previous-state) به جای آن، آن وابستگی را حذف کنید:

```js {6,7}
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...
```

در اینجا، به جای اینکه `todos` را به‌عنوان وابستگی قرار دهید و درون آن را بخوانید، یک دستورالعمل دربارهٔ *نحوه* به‌روزرسانی استیت (`todos => [...todos, newTodo]`) به ری‌اکت ارسال می‌کنید. [دربارهٔ توابع به‌روزرسانی بیشتر بخوانید.](/reference/react/useState#updating-state-based-on-the-previous-state)

---

### جلوگیری از اجرای بیش از حد یک افکت {/*preventing-an-effect-from-firing-too-often*/}

گاهی ممکن است بخواهید تابعی را از درون یک [افکت](/learn/synchronizing-with-effects) فراخوانی کنید:

```js {4-9,12}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    // ...
```

این یک مشکل ایجاد می‌کند. [هر مقدار واکنش‌گرا باید به‌عنوان وابستگی افکت شما تعریف شود.](/learn/lifecycle-of-reactive-effects#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) با این حال، اگر `createOptions` را به‌عنوان وابستگی تعریف کنید، باعث می‌شود افکت شما دائماً به اتاق چت دوباره متصل شود:


```js {6}
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // 🔴 Problem: This dependency changes on every render
  // ...
```

برای حل این مشکل، می‌توانید تابعی که نیاز دارید از یک افکت فراخوانی کنید را در `useCallback` بپیچید:

```js {4-9,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
  // ...
```

این تضمین می‌کند که تابع `createOptions` بین رندرهای مجدد اگر `roomId` یکسان باشد، یکسان باشد. **با این حال، بهتر است نیازی به وابستگی تابع را حذف کنید.** تابع خود را *درون* افکت منتقل کنید:

```js {5-10,16}
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ No need for useCallback or function dependencies!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only changes when roomId changes
  // ...
```

اکنون کد شما ساده‌تر است و به `useCallback` نیاز ندارد. [دربارهٔ حذف وابستگی‌های افکت بیشتر بدانید.](/learn/removing-effect-dependencies#move-dynamic-objects-and-functions-inside-your-effect)

---

### بهینه‌سازی یک هوک سفارشی {/*optimizing-a-custom-hook*/}

اگر در حال نوشتن یک [هوک سفارشی](/learn/reusing-logic-with-custom-hooks) هستید، توصیه می‌شود هر تابعی که برمی‌گرداند را در `useCallback` بپیچید:

```js {4-6,8-10}
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```

این تضمین می‌کند که مصرف‌کنندگان هوک شما بتوانند در صورت نیاز کد خود را بهینه‌سازی کنند.

---

## رفع اشکال {/*troubleshooting*/}

### هر بار کامپوننت من رندر می‌شود، `useCallback` تابع متفاوتی برمی‌گرداند {/*every-time-my-component-renders-usecallback-returns-a-different-function*/}

مطمئن شوید آرایهٔ وابستگی را به‌عنوان آرگومان دوم مشخص کرده‌اید!

اگر آرایهٔ وابستگی را فراموش کنید، `useCallback` هر بار یک تابع جدید برمی‌گرداند:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }); // 🔴 Returns a new function every time: no dependency array
  // ...
```

این نسخهٔ اصلاح‌شده است که آرایهٔ وابستگی را به‌عنوان آرگومان دوم ارسال می‌کند:

```js {7}
function ProductPage({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]); // ✅ Does not return a new function unnecessarily
  // ...
```

اگر این کمک نکرد، پس مشکل این است که حداقل یکی از وابستگی‌های شما با رندر قبلی متفاوت است. می‌توانید این مشکل را با لاگ کردن دستی وابستگی‌هایتان در کنسول دیباگ کنید:

```js {5}
  const handleSubmit = useCallback((orderDetails) => {
    // ..
  }, [productId, referrer]);

  console.log([productId, referrer]);
```

سپس می‌توانید روی آرایه‌ها از رندرهای مجدد مختلف در کنسول راست‌کلیک کنید و «Store as a global variable» را برای هر دو انتخاب کنید. با فرض اینکه اولی به‌عنوان `temp1` و دومی به‌عنوان `temp2` ذخیره شده است، می‌توانید سپس از کنسول مرورگر استفاده کنید تا بررسی کنید آیا هر وابستگی در هر دو آرایه یکسان است یا نه:

```js
Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...
```

وقتی پیدا کردید کدام وابستگی مموری‌زیشن را خراب می‌کند، یا راهی برای حذف آن پیدا کنید، یا [آن را نیز مموری‌زیشن کنید.](/reference/react/useMemo#memoizing-a-dependency-of-another-hook)

---

### من باید برای هر آیتم لیست در یک حلقه `useCallback` را فراخوانی کنم، اما مجاز نیست {/*i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed*/}

فرض کنید کامپوننت `Chart` در [`memo`](/reference/react/memo) پیچیده شده است. می‌خواهید وقتی کامپوننت `ReportList` رندر مجدد می‌شود، رندر مجدد هر `Chart` در لیست را رد کنید. با این حال، نمی‌توانید `useCallback` را در یک حلقه فراخوانی کنید:

```js {expectedErrors: {'react-compiler': [6]}} {5-14}
function ReportList({ items }) {
  return (
    <article>
      {items.map(item => {
        // 🔴 You can't call useCallback in a loop like this:
        const handleClick = useCallback(() => {
          sendReport(item)
        }, [item]);

        return (
          <figure key={item.id}>
            <Chart onClick={handleClick} />
          </figure>
        );
      })}
    </article>
  );
}
```

در عوض، برای یک آیتم منفرد یک کامپوننت استخراج کنید، و `useCallback` را آنجا قرار دهید:

```js {5,12-21}
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
  // ✅ Call useCallback at the top level:
  const handleClick = useCallback(() => {
    sendReport(item)
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```

همچنین می‌توانید در قطعهٔ کد آخر `useCallback` را حذف کنید و در عوض خود `Report` را در [`memo`](/reference/react/memo) بپیچید. اگر پراپ `item` تغییر نکند، `Report` از رندر مجدد می‌پرد، بنابراین `Chart` نیز از رندر مجدد می‌پرد:

```js {5,6-8,15}
function ReportList({ items }) {
  // ...
}

const Report = memo(function Report({ item }) {
  function handleClick() {
    sendReport(item);
  }

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
});
```
