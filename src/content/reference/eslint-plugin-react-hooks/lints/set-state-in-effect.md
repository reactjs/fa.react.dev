---
title: set-state-in-effect
---

<Intro>

فراخوانی هم‌زمان setState در یک افکت را اعتبارسنجی می‌کند، که می‌تواند منجر به رندرهای مجدد شود که عملکرد را تخریب می‌کند.

</Intro>

## جزئیات قانون {/*rule-details*/}

تنظیم استیت بلافاصله داخل یک افکت ری‌اکت را مجبور می‌کند کل چرخهٔ رندر را دوباره آغاز کند. وقتی استیت را در یک افکت به‌روزرسانی می‌کنید، ری‌اکت باید کامپوننت شما را دوباره رندر کند، تغییرات را به DOM اعمال کند، و سپس افکت‌ها را دوباره اجرا کند. این یک پاس رندر اضافی ایجاد می‌کند که می‌توانست با تبدیل مستقیم داده‌ها در طول رندر یا استخراج استیت از پراپس اجتناب شود. به‌جای آن داده‌ها را در سطح بالای کامپوننت خود تبدیل کنید. این کد به‌طور طبیعی هنگام تغییر پراپس یا استیت دوباره اجرا می‌شود بدون اینکه چرخه‌های رندر اضافی تحریک کند.

فراخوانی‌های هم‌زمان `setState` در افکت‌ها قبل از اینکه مرورگر بتواند paint کند، رندرهای مجدد فوری تحریک می‌کنند، که باعث مشکلات عملکردی و لرزش بصری می‌شود. ری‌اکت باید دو بار رندر کند: یک‌بار برای اعمال به‌روزرسانی استیت، سپس دوباره بعد از اجرای افکت‌ها. این رندر دوگانه وقتی می‌توان همان نتیجه را با یک رندر واحد به دست آورد، اتلاف است.

در بسیاری از موارد، ممکن است اصلاً نیازی به افکت نداشته باشید. لطفاً برای اطلاعات بیشتر [شاید به افکت نیاز نداشته باشید](/learn/you-might-not-need-an-effect) را ببینید.

## نقض‌های رایج {/*common-violations*/}

این قانون چندین الگو را که در آن setState هم‌زمان به‌طور غیرضروری استفاده می‌شود، می‌گیرد:

- تنظیم استیت loading به‌صورت هم‌زمان
- استخراج استیت از پراپس در افکت‌ها
- تبدیل داده‌ها در افکت‌ها به‌جای رندر

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Synchronous setState in effect
function Component({data}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data); // Extra render, use initial state instead
  }, [data]);
}

// ❌ Setting loading state synchronously
function Component() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Synchronous, causes extra render
    fetchData().then(() => setLoading(false));
  }, []);
}

// ❌ Transforming data in effect
function Component({rawData}) {
  const [processed, setProcessed] = useState([]);

  useEffect(() => {
    setProcessed(rawData.map(transform)); // Should derive in render
  }, [rawData]);
}

// ❌ Deriving state from props
function Component({selectedId, items}) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(items.find(i => i.id === selectedId));
  }, [selectedId, items]);
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js {expectedErrors: {'react-compiler': [8]}}
// ✅ setState in an effect is fine if the value comes from a ref
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
}

// ✅ Calculate during render
function Component({selectedId, items}) {
  const selected = items.find(i => i.id === selectedId);
  return <div>{selected?.name}</div>;
}
```

**وقتی چیزی می‌تواند از پراپس یا استیت موجود محاسبه شود، آن را در استیت قرار ندهید.** به‌جای آن در طول رندر محاسبه کنید. این کار کد شما را سریع‌تر، ساده‌تر، و کم‌تر مستعد خطا می‌کند. در [شاید به افکت نیاز نداشته باشید](/learn/you-might-not-need-an-effect) بیشتر بدانید.
