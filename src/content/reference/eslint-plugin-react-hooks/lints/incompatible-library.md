---
title: incompatible-library
---

<Intro>

استفاده از کتابخانه‌هایی که با memoization (دستی یا خودکار) ناسازگارند را اعتبارسنجی می‌کند.

</Intro>

<Note>

این کتابخانه‌ها قبل از اینکه قوانین memoization ری‌اکت کاملاً مستند شوند، طراحی شده بودند. آن‌ها در آن زمان انتخاب‌های درستی برای بهینه‌سازی روش‌های ارگونومیک جهت نگه‌داشتن کامپوننت‌ها به‌اندازهٔ کافی واکنش‌گرا هنگام تغییر استیت اپ انجام دادند. در حالی که این الگوهای legacy کار می‌کردند، ما از آن زمان کشف کرده‌ایم که با مدل برنامه‌نویسی ری‌اکت ناسازگار است. ما به همکاری با نویسندگان کتابخانه برای مهاجرت این کتابخانه‌ها به استفاده از الگوهایی که از قوانین ری‌اکت پیروی می‌کنند، ادامه خواهیم داد.

</Note>

## جزئیات قانون {/*rule-details*/}

برخی کتابخانه‌ها از الگوهایی استفاده می‌کنند که توسط ری‌اکت پشتیبانی نمی‌شوند. وقتی لینتر استفاده از این APIها را از یک [فهرست شناخته‌شده](https://github.com/facebook/react/blob/main/compiler/packages/babel-plugin-react-compiler/src/HIR/DefaultModuleTypeProvider.ts) تشخیص می‌دهد، آن‌ها را زیر این قانون علامت‌گذاری می‌کند. این بدان معناست که React Compiler می‌تواند به‌طور خودکار از کامپوننت‌هایی که از این APIهای ناسازگار استفاده می‌کنند عبور کند، تا از شکسته شدن اپ شما جلوگیری شود.

```js
// Example of how memoization breaks with these libraries
function Form() {
  const { watch } = useForm();

  // ❌ This value will never update, even when 'name' field changes
  const name = useMemo(() => watch('name'), [watch]);

  return <div>Name: {name}</div>; // UI appears "frozen"
}
```

React Compiler به‌طور خودکار مقادیر را دنبال قوانین ری‌اکت memoize می‌کند. اگر چیزی با `useMemo` دستی شکسته شود، بهینه‌سازی خودکار کامپایلر را نیز خواهد شکست. این قانون به شناسایی این الگوهای مشکل‌دار کمک می‌کند.

<DeepDive>

#### طراحی APIهایی که از قوانین ری‌اکت پیروی می‌کنند {/*designing-apis-that-follow-the-rules-of-react*/}

یک سؤال برای فکر کردن هنگام طراحی یک API کتابخانه یا هوک این است که آیا فراخوانی API می‌تواند با `useMemo` به‌طور امن memoize شود. اگر نمی‌شود، هم memoization دستی و هم memoization خودکار React Compiler کد کاربر شما را خواهد شکست.

مثلاً یکی از الگوهای ناسازگار، «تغییرپذیری داخلی» (interior mutability) است. تغییرپذیری داخلی زمانی است که یک object یا تابع استیت پنهان خود را نگه می‌دارد که در طول زمان تغییر می‌کند، حتی اگر ارجاع به آن یکسان بماند. آن را مانند یک جعبه تصور کنید که از بیرون یکسان به نظر می‌رسد اما مخفیانه محتویات خود را بازآرایی می‌کند. ری‌اکت نمی‌تواند تشخیص دهد چیزی تغییر کرده زیرا فقط بررسی می‌کند که آیا جعبهٔ متفاوتی به آن داده‌اید، نه اینکه درونش چیست. این memoization را می‌شکند، زیرا ری‌اکت بر این اساس عمل می‌کند که object (یا تابع) بیرونی تغییر کند اگر بخشی از مقدار آن تغییر کرده باشد.

به‌عنوان قاعده‌ای کلی، هنگام طراحی APIهای ری‌اکت، فکر کنید آیا `useMemo` آن را می‌شکند:

```js
function Component() {
  const { someFunction } = useLibrary();
  // it should always be safe to memoize functions like this
  const result = useMemo(() => someFunction(), [someFunction]);
}
```

در عوض، APIهایی طراحی کنید که استیت غیرقابل تغییر را برمی‌گردانند و از تابع‌های به‌روزرسانی صریح استفاده می‌کنند:

```js
// ✅ Good: Return immutable state that changes reference when updated
function Component() {
  const { field, updateField } = useLibrary();
  // this is always safe to memo
  const greeting = useMemo(() => `Hello, ${field.name}!`, [field.name]);

  return (
    <div>
      <input
        value={field.name}
        onChange={(e) => updateField('name', e.target.value)}
      />
      <p>{greeting}</p>
    </div>
  );
}
```

</DeepDive>

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ react-hook-form `watch`
function Component() {
  const {watch} = useForm();
  const value = watch('field'); // Interior mutability
  return <div>{value}</div>;
}

// ❌ TanStack Table `useReactTable`
function Component({data}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // table instance uses interior mutability
  return <Table table={table} />;
}
```

<Pitfall>

#### MobX {/*mobx*/}

الگوهای MobX مانند `observer` نیز فرضیات memoization را می‌شکنند، اما لینتر هنوز آن‌ها را تشخیص نمی‌دهد. اگر به MobX متکی هستید و می‌یابید که اپ شما با React Compiler کار نمی‌کند، ممکن است نیاز به استفاده از دایرکتیو `"use no memo"` داشته باشید.

```js
// ❌ MobX `observer`
const Component = observer(() => {
  const [timer] = useState(() => new Timer());
  return <span>Seconds passed: {timer.secondsPassed}</span>;
});
```

</Pitfall>

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ For react-hook-form, use `useWatch`:
function Component() {
  const {register, control} = useForm();
  const watchedValue = useWatch({
    control,
    name: 'field'
  });

  return (
    <>
      <input {...register('field')} />
      <div>Current value: {watchedValue}</div>
    </>
  );
}
```

برخی کتابخانه‌های دیگر هنوز APIهای جایگزینی که با مدل memoization ری‌اکت سازگار باشند ندارند. اگر لینتر به‌طور خودکار از کامپوننت‌ها یا هوک‌های شما که این APIها را فراخوانی می‌کنند عبور نمی‌کند، لطفاً یک [issue ثبت کنید](https://github.com/facebook/react/issues) تا آن را به لینتر اضافه کنیم.
