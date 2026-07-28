---
title: مقدمه
---

<Intro>
کامپایلر ری‌اکت یک ابزار جدید زمان بیلد است که اپلیکیشن ری‌اکت شما را به‌طور خودکار بهینه می‌کند. این ابزار با جاوااسکریپت ساده کار می‌کند و [قوانین ری‌اکت](/reference/rules) را درک می‌کند، بنابراین نیازی نیست برای استفاده از آن هیچ کدی را بازنویسی کنید.
</Intro>

<YouWillLearn>

* کامپایلر ری‌اکت چه کاری انجام می‌دهد
* شروع به کار با کامپایلر
* استراتژی‌های اتخاذ تدریجی
* دیباگ و رفع اشکال وقتی چیزها اشتباه پیش می‌رود
* استفاده از کامپایلر در کتابخانه ری‌اکت خود

</YouWillLearn>

<Note>
کامپایلر ری‌اکت در حال حاضر در مرحلهٔ Release Candidate (RC) قرار دارد. اکنون به همه توصیه می‌کنیم کامپایلر را امتحان کنند و بازخورد ارائه دهند. آخرین نسخهٔ RC را می‌توان با تگ `@rc` پیدا کرد.
</Note>

## کامپایلر ری‌اکت چه کاری انجام می‌دهد؟ {/*what-does-react-compiler-do*/}

کامپایلر ری‌اکت اپلیکیشن ری‌اکت شما را در زمان بیلد به‌طور خودکار بهینه می‌کند. ری‌اکت معمولاً بدون بهینه‌سازی به اندازهٔ کافی سریع است، اما گاهی برای پاسخگو نگه‌داشتن اپلیکیشن خود باید کامپوننت‌ها و مقادیر را به‌صورت دستی مموری‌زیشن کنید. این مموری‌زیشن دستی خسته‌کننده است، به‌راحتی اشتباه پیش می‌رود و کد اضافه‌ای برای نگهداری ایجاد می‌کند. کامپایلر ری‌اکت این بهینه‌سازی را به‌طور خودکار برای شما انجام می‌دهد و شما را از این بار ذهنی رها می‌کند تا بتوانید روی ساخت قابلیت‌ها تمرکز کنید.

### پیش از کامپایلر ری‌اکت {/*before-react-compiler*/}

بدون کامپایلر، باید کامپوننت‌ها و مقادیر را به‌صورت دستی مموری‌زیشن می‌کردید تا رندرهای مجدد بهینه شوند:

```js {expectedErrors: {'react-compiler': [4]}}
import { useMemo, useCallback, memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);

  const handleClick = useCallback((item) => {
    onClick(item.id);
  }, [onClick]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
});
```


<Note>

این مموری‌زیشن دستی یک باگ ظریف دارد که مموری‌زیشن را می‌شکند:

```js [[2, 1, "() => handleClick(item)"]]
<Item key={item.id} onClick={() => handleClick(item)} />
```

با وجود اینکه `handleClick` در `useCallback` پیچیده شده است، تابع فلش `() => handleClick(item)` هر بار که کامپوننت رندر می‌شود یک تابع جدید ایجاد می‌کند. این یعنی `Item` همیشه یک پراپ `onClick` جدید دریافت می‌کند و مموری‌زیشن می‌شکند.

کامپایلر ری‌اکت می‌تواند این مورد را چه با تابع فلش چه بدون آن به‌درستی بهینه کند و اطمینان حاصل کند که `Item` تنها زمانی مجدداً رندر می‌شود که `props.onClick` تغییر کند.

</Note>

### پس از کامپایلر ری‌اکت {/*after-react-compiler*/}

با کامپایلر ری‌اکت، همان کد را بدون مموری‌زیشن دستی می‌نویسید:

```js
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data);

  const handleClick = (item) => {
    onClick(item.id);
  };

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  );
}
```

_[این مثال را در Playground کامپایلر ری‌اکت ببینید](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAMygOzgFwJYSYAEAogB4AOCmYeAbggMIQC2Fh1OAFMEQCYBDHAIA0RQowA2eOAGsiAXwCURYAB1iROITA4iFGBERgwCPgBEhAogF4iCStVoMACoeO1MAcy6DhSgG4NDSItHT0ACwFMPkkmaTlbIi48HAQWFRsAPlUQ0PFMKRlZFLSWADo8PkC8hSDMPJgEHFhiLjzQgB4+eiyO-OADIwQTM0thcpYBClL02xz2zXz8zoBJMqJZBABPG2BU9Mq+BQKiuT2uTJyomLizkoOMk4B6PqX8pSUFfs7nnro3qEapgFCAFEA)_

کامپایلر ری‌اکت مموری‌زیشن بهینه را به‌طور خودکار اعمال می‌کند و اطمینان حاصل می‌کند که اپلیکیشن شما تنها در صورت نیاز مجدداً رندر می‌شود.

<DeepDive>
#### چه نوع مموری‌زیشنی به‌وسیلهٔ کامپایلر ری‌اکت اضافه می‌شود؟ {/*what-kind-of-memoization-does-react-compiler-add*/}

مموری‌زیشن خودکار کامپایلر ری‌اکت عمدتاً روی **بهبود عملکرد به‌روزرسانی** (رندر مجدد کامپوننت‌های موجود) متمرکز است، بنابراین روی این دو مورد استفاده تمرکز دارد:

1. **نادیده گرفتن رندر مجدد آبشاری کامپوننت‌ها**
    * رندر مجدد `<Parent />` باعث می‌شود بسیاری از کامپوننت‌ها در درخت کامپوننت آن مجدداً رندر شوند، حتی اگر تنها `<Parent />` تغییر کرده باشد
1. **نادیده گرفتن محاسبات سنگین از خارج از ری‌اکت**
    * برای مثال، فراخوانی `expensivelyProcessAReallyLargeArrayOfObjects()` داخل کامپوننت یا هوکی که به آن داده نیاز دارد

#### بهینه‌سازی رندرهای مجدد {/*optimizing-re-renders*/}

ری‌اکت به شما اجازه می‌دهد رابط کاربری خود را به‌صورت تابعی از استیت فعلی (دقیق‌تر: پراپس، استیت و کانتکست) بیان کنید. در پیاده‌سازی فعلی، وقتی استیت یک کامپوننت تغییر می‌کند، ری‌اکت آن کامپوننت _و تمام فرزندانش_ را مجدداً رندر می‌کند — مگر اینکه شکلی از مموری‌زیشن دستی را با `useMemo()`، `useCallback()` یا `React.memo()` اعمال کرده باشید. برای مثال، در مثال زیر، `<MessageButton>` هر بار که استیت `<FriendList>` تغییر می‌کند مجدداً رندر خواهد شد:

```javascript
function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount();
  if (friends.length === 0) {
    return <NoFriends />;
  }
  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map((friend) => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  );
}
```
[_این مثال را در Playground کامپایلر ری‌اکت ببینید_](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAMygOzgFwJYSYAEAYjHgpgCYAyeYOAFMEWuZVWEQL4CURwADrEicQgyKEANnkwIAwtEw4iAXiJQwCMhWoB5TDLmKsTXgG5hRInjRFGbXZwB0UygHMcACzWr1ABn4hEWsYBBxYYgAeADkIHQ4uAHoAPksRbisiMIiYYkYs6yiqPAA3FMLrIiiwAAcAQ0wU4GlZBSUcbklDNqikusaKkKrgR0TnAFt62sYHdmp+VRT7SqrqhOo6Bnl6mCoiAGsEAE9VUfmqZzwqLrHqM7ubolTVol5eTOGigFkEMDB6u4EAAhKA4HCEZ5DNZ9ErlLIWYTcEDcIA)

کامپایلر ری‌اکت معادل مموری‌زیشن دستی را به‌طور خودکار اعمال می‌کند و اطمینان حاصل می‌کند که تنها بخش‌های مرتبط یک اپلیکیشن با تغییر استیت مجدداً رندر می‌شوند، که گاهی به آن «واکنش‌گری ریزدانه (fine-grained reactivity)» گفته می‌شود. در مثال بالا، کامپایلر ری‌اکت تشخیص می‌دهد که مقدار بازگشتی `<FriendListCard />` حتی با تغییر `friends` می‌تواند بازاستفاده شود، و می‌تواند از بازایجاد این JSX _و_ از رندر مجدد `<MessageButton>` با تغییر تعداد جلوگیری کند.

#### محاسبات سنگین نیز مموری‌زیشن می‌شوند {/*expensive-calculations-also-get-memoized*/}

کامپایلر ری‌اکت همچنین می‌تواند محاسبات سنگین استفاده‌شده در حین رندر را به‌طور خودکار مموری‌زیشن کند:

```js
// **Not** memoized by React Compiler, since this is not a component or hook
function expensivelyProcessAReallyLargeArrayOfObjects() { /* ... */ }

// Memoized by React Compiler since this is a component
function TableContainer({ items }) {
  // This function call would be memoized:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items);
  // ...
}
```
[_این مثال را در Playground کامپایلر ری‌اکت ببینید_](https://playground.react.dev/#N4Igzg9grgTgxgUxALhAejQAgFTYHIQAuumAtgqRAJYBeCAJpgEYCemASggIZyGYDCEUgAcqAGwQwANJjBUAdokyEAFlTCZ1meUUxdMcIcIjyE8vhBiYVECAGsAOvIBmURYSonMCAB7CzcgBuCGIsAAowEIhgYACCnFxioQAyXDAA5gixMDBcLADyzvlMAFYIvGAAFACUmMCYaNiYAHStOFgAvk5OGJgAshTUdIysHNy8AkbikrIKSqpaWvqGIiZmhE6u7p7ymAAqXEwSguZcCpKV9VSEFBodtcBOmAYmYHz0XIT6ALzefgFUYKhCJRBAxeLcJIsVIZLI5PKFYplCqVa63aoAbm6u0wMAQhFguwAPPRAQA+YAfL4dIloUmBMlODogDpAA)

با این حال، اگر `expensivelyProcessAReallyLargeArrayOfObjects` واقعاً یک تابع سنگین باشد، ممکن است بخواهید پیاده‌سازی مموری‌زیشن اختصاصی آن را خارج از ری‌اکت در نظر بگیرید، زیرا:

- کامپایلر ری‌اکت فقط کامپوننت‌ها و هوک‌های ری‌اکت را مموری‌زیشن می‌کند، نه هر تابعی را
- مموری‌زیشن کامپایلر ری‌اکت بین چندین کامپوننت یا هوک به اشتراک گذاشته نمی‌شود

بنابراین اگر `expensivelyProcessAReallyLargeArrayOfObjects` در بسیاری از کامپوننت‌های مختلف استفاده شود، حتی اگر دقیقاً همان آیتم‌ها ارسال شوند، آن محاسبهٔ سنگین مکرراً اجرا خواهد شد. پیشنهاد می‌کنیم پیش از پیچیده‌تر کردن کد، ابتدا [پروفایلینگ](reference/react/useMemo#how-to-tell-if-a-calculation-is-expensive) انجام دهید تا ببینید آیا واقعاً به این اندازه سنگین است یا خیر.
</DeepDive>

## آیا باید کامپایلر را امتحان کنم؟ {/*should-i-try-out-the-compiler*/}

ما به همه تشویق می‌کنیم که استفاده از کامپایلر ری‌اکت را شروع کنند. اگرچه کامپایلر امروزه هنوز یک افزودنی اختیاری به ری‌اکت است، در آینده ممکن است برخی قابلیت‌ها برای کارکرد کامل به کامپایلر نیاز داشته باشند.

### آیا استفاده از آن امن است؟ {/*is-it-safe-to-use*/}

کامپایلر ری‌اکت اکنون در مرحلهٔ RC قرار دارد و به‌طور گسترده در محیط تولید آزمایش شده است. با وجود اینکه در شرکت‌هایی مانند متا در محیط تولید استفاده شده است، استقرار کامپایلر در محیط تولید برای اپلیکیشن شما به سلامت کدبیس شما و میزان رعایت [قوانین ری‌اکت](/reference/rules) توسط شما بستگی دارد.

## چه ابزارهای بیلدی پشتیبانی می‌شوند؟ {/*what-build-tools-are-supported*/}

کامپایلر ری‌اکت می‌تواند در میان [چندین ابزار بیلد](/learn/react-compiler/installation) مانند Babel، Vite، Metro و Rsbuild نصب شود.

کامپایلر ری‌اکت عمدتاً یک پوشش پلاگین سبک Babel دور کامپایلر اصلی است که برای جدا بودن از خود Babel طراحی شده است. اگرچه نسخهٔ پایدار اولیهٔ کامپایلر عمدتاً یک پلاگین Babel خواهد ماند، ما با تیم‌های swc و [oxc](https://github.com/oxc-project/oxc/issues/10048) برای ساخت پشتیبانی درجه‌یک از کامپایلر ری‌اکت همکاری می‌کنیم تا در آینده مجبور نباشید Babel را دوباره به خطوط لوله بیلد خود اضافه کنید.

کاربران Next.js می‌توانند کامپایلر ری‌اکت فراخوانی‌شده با swc را با استفاده از [v15.3.1](https://github.com/vercel/next.js/releases/tag/v15.3.1) و بالاتر فعال کنند.

## دربارهٔ useMemo، useCallback و React.memo چه باید کرد؟ {/*what-should-i-do-about-usememo-usecallback-and-reactmemo*/}

کامپایلر ری‌اکت مموری‌زیشن خودکار را دقیق‌تر و ریزدانه‌تر از آنچه با [`useMemo`](/reference/react/useMemo)، [`useCallback`](/reference/react/useCallback) و [`React.memo`](/reference/react/memo) ممکن است اضافه می‌کند. اگر تصمیم به نگه‌داشتن مموری‌زیشن دستی بگیرید، کامپایلر ری‌اکت آن‌ها را تحلیل می‌کند و تعیین می‌کند که آیا مموری‌زیشن دستی شما با مموری‌زیشن استنباط‌شدهٔ خودکارش مطابقت دارد یا خیر. اگر مطابقتی وجود نداشته باشد، کامپایلر از بهینه‌سازی آن کامپوننت صرف‌نظر می‌کند.

این کار از روی احتیاط انجام می‌شود، زیرا یک ضدالگوی رایج با مموری‌زیشن دستی این است که از آن برای درست‌کارکردن استفاده می‌شود. این یعنی اپلیکیشن شما برای کارکرد درست به مموری‌زیشن مقادیر خاصی وابسته است. برای مثال، برای جلوگیری از یک حلقهٔ بی‌نهایت، ممکن است مقداری را مموری‌زیشن کرده باشید تا از اجرای `useEffect` جلوگیری شود. این کار قوانین ری‌اکت را می‌شکند، اما از آنجا که حذف خودکار مموری‌زیشن دستی توسط کامپایلر می‌تواند بالقوه خطرناک باشد، کامپایلر به‌جای آن صرفاً صرف‌نظر می‌کند. شما باید مموری‌زیشن دست‌نویس خود را به‌صورت دستی حذف کنید و بررسی کنید که اپلیکیشن همچنان همان‌طور که انتظار می‌رود کار می‌کند.

## کامپایلر ری‌اکت را امتحان کنید {/*try-react-compiler*/}

این بخش به شما کمک می‌کند تا با کامپایلر ری‌اکت شروع کنید و درک کنید چگونه از آن به‌طور مؤثری در پروژه‌های خود استفاده کنید.

* **[نصب](/learn/react-compiler/installation)** - کامپایلر ری‌اکت را نصب و برای ابزارهای بیلد خود پیکربندی کنید
* **[سازگاری نسخهٔ ری‌اکت](/reference/react-compiler/target)** - پشتیبانی از ری‌اکت ۱۷، ۱۸ و ۱۹
* **[پیکربندی](/reference/react-compiler/configuration)** - کامپایلر را برای نیازهای خاص خود سفارشی کنید
* **[اتخاذ تدریجی](/learn/react-compiler/incremental-adoption)** - استراتژی‌هایی برای استقرار تدریجی کامپایلر در کدبیس‌های موجود
* **[دیباگ و رفع اشکال](/learn/react-compiler/debugging)** - شناسایی و رفع مشکلات هنگام استفاده از کامپایلر
* **[کامپایل کتابخانه‌ها](/reference/react-compiler/compiling-libraries)** - بهترین شیوه‌ها برای انتشار کد کامپایل‌شده
* **[مرجع API](/reference/react-compiler/configuration)** - مستندات دقیق تمام گزینه‌های پیکربندی

## منابع اضافی {/*additional-resources*/}

علاوه بر این مستندات، پیشنهاد می‌کنیم [گروه کاری کامپایلر ری‌اکت](https://github.com/reactwg/react-compiler) را برای اطلاعات بیشتر و بحث پیرامون کامپایلر بررسی کنید.
