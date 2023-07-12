---
title: تفکر به سبک ری‌اکت
---

<Intro dir="rtl">

کتابخانه‌ی ری‌اکت می‌تواند نگاه شما به طراحی‌هایی که می بینید و برنامه‌هایی که می‌سازید را تغییر دهد.وقتی یک رابط کاربری را با ری‌اکت می‌سازید، ابتدا آن را به قسمت‌هایی به نام کامپوننت‌ها تقسیم می‌کنید. سپس، وضعیت‌های بصری مختلف را برای هر یک از کامپوننت‌هایتان توصیف می‌کنید. در نهایت، کامپوننت‌های خود را به گونه‌ای با یکدیگر ارتباط می‌دهید که داده از طریق آنها جابه‌جا شود. در این آموزش، ما مراحل ساخت یک جدول با قابلیت سرچ اطلاعات را با شما به اشتراک می‌گذاریم

</Intro>

## از mockup شروع کنید {/*از-mockup-شروع-کنید*/}

تصور کنید شما همین الان دیتایی از طریق ای پی آی و فایل ماکآپ را از دیزاینر دارید. فایل دیتا٬ اطلاعاتی مثل فایل زیر را شامل می‌شود:

```json
[
  {"category": "Fruits", "price": "$1", "stocked": true, "name": "Apple"},
  {"category": "Fruits", "price": "$1", "stocked": true, "name": "Dragonfruit"},
  {
    "category": "Fruits",
    "price": "$2",
    "stocked": false,
    "name": "Passionfruit"
  },
  {"category": "Vegetables", "price": "$2", "stocked": true, "name": "Spinach"},
  {
    "category": "Vegetables",
    "price": "$4",
    "stocked": false,
    "name": "Pumpkin"
  },
  {"category": "Vegetables", "price": "$1", "stocked": true, "name": "Peas"}
]
```

خروجی فایل شبیه تصویر زیر است:

<img
  src="/images/docs/s_thinking-in-react_ui.png"
  width="300"
  style={{margin: '0 auto'}}
/>

برای پیاده سازی هر دیزاینی ما این پنج قدم را میتوانیم برداریم:

## قدم اول: دیزاین را به سلسه مراتبی از کامپوننت ها تقسیم کنید. {/*قدم-اول-دیزاین-را-به-سلسه-مراتبی-از-کامپوننت-ها-تقسیم-کنید*/}

اول دور هر کامپوننت و زیر کامپوننت در دیزاین خط بکشید و برای آنها اسم بگذارید. اگر با یک طراح همکاری می‌کنید، ممکن است او این کامپوننت‌ها را در ابزار طراحی خود قبلاً نامگذاری کرده باشد. از او بپرسید!
بسته به بکگراند شما، می‌توانید به روش‌های مختلف درباره‌ی تقسیم یک طراحی به کامپوننت‌ها فکر کنید.

- **برنامه‌نویسی**--از تکنیک‌های مشابه برای تصمیم‌گیری در مورد اینکه آیا باید یک تابع یا شیء جدید ایجاد کنید استفاده کنید
  یکی از این تکنیک‌ها اصل single responsibility است، به این معنی که یک کامپوننت بهتر است تنها یک کار را انجام دهد. اگر کامپوننت به طور مداوم بزرگتر شود، باید به زیرکامپوننت‌های کوچکتر تجزیه شود.
  [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)

- **CSS**--بررسی کنید که برای چه عناصری از کلاس‌ها استفاده خواهید کرد. (با این حال، کامپوننت‌ها کمتر جزئیات ریز دارند.)

- **design**--
  در نظر بگیرید که چگونه لایه‌های طراحی را سازماندهی خواهید کرد
  اگر فایل جیسون شما ساختار مناسبی داشته باشد، اغلب متوجه می شوید که به طور طبیعی با ساختار کامپوننت‌های رابط کاربری شما همخوانی دارد. این به این دلیل است که مدل‌های رابط کاربری و داده اغلب همان معماری اطلاعاتی را دارند - به اصطلاح، همان شکل. رابط کاربری خود را به
  کامپوننت‌ها تقسیم کنید، به گونه‌ای که هر کامپوننت با یک قسمت از مدل داده شما مطابقت داشته باشد

اگر فایل جیسون شما ساختار مناسبی داشته باشد، اغلب متوجه می شوید که به طور طبیعی با ساختار کامپوننت‌های رابط کاربری شما همخوانی دارد. این به این دلیل است که مدل‌های رابط کاربری و داده اغلب همان معماری اطلاعاتی را دارند - به اصطلاح، همان شکل. رابط کاربری خود را به کامپوننت‌ها تقسیم کنید، به گونه‌ای که هر کامپوننت با یک قسمت از مدل داده شما مطابقت داشته باشد.

در این صفحه پنج کامپوننت هست:

<FullWidth>

<CodeDiagram flip>

<img
  src="/images/docs/s_thinking-in-react_ui_outline.png"
  width="500"
  style={{margin: '0 auto'}}
/>

1. `FilterableProductTable` به رنگ خاکستری که شامل تمام اپلیکیشن است
2. `SearchBar` به رنگ ابی. برای دریافت ورودی از کاربر
3. `ProductTable` به رنگ بنفش٬ شامل فیلترها و لیست داده ی خروجی با توجه به ورودی کاربر
4. `ProductCategoryRow` به رنگ سبز نشانده‌دهنده‌ی هدینگ برای هر گروه
5. `ProductRow` به رنگ زرد٬ برای نشان دادن هر ردیف از هر محصول

</CodeDiagram>

</FullWidth>

اگر به کامپوننت ۳(جدول محصولات) نگاه کنید، می‌بینید که هدر جدول (شامل برچسب‌های "نام" و "قیمت") قسمت جداگانه‌ای نیست. این مسئله از سلیقه‌ای است و می‌توانید هر دو را انتخاب کنید. در این مثال، این بخش جزء کامپوننت ۳است زیرا داخل لیست کامپوننت ۳ ظاهر می‌شود. با این حال، اگر این هدر به طور پیچیده‌تری رشد کند (مثلاً اگر مرتب‌سازی را اضافه کنید)، می‌توانید آن را به عنوان یک کامپوننت جداگانه با نام(هدر حدول محصولات) جابجا کنید.

هم‌اکنون که اجزای ماک‌اپ را شناسایی کرده‌اید، آن‌ها را به صورت سلسله‌مراتبی قرار دهید. کامپوننتی که در داخل یک کامپوننت دیگر در نمونه طراحی ظاهر می‌شوند، باید به عنوان زیرمجموعه در سلسله‌مراتب ظاهر شوند.

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

## قدم دوم: یک نمونه‌ی استاتیک با ری‌اکت بسازید {/*قدم-دوم-یک-نمونهی-استاتیک-با-ریاکت-بسازید*/}

هم‌اکنون که سلسله‌مراتب کامپوننت‌ها را دارید، زمان پیاده‌سازی برنامهٔ است. روش بسیار ساده ایجاد یک نسخه استاتیکی است که رابط کاربری را از مدل دادهٔ خود رندر می‌کند بدون افزودن هرگونه تعامل... برای شروع! اغلب آسانتر است که ابتدا نسخهٔ استاتیک را بسازید و سپس تعامل را اضافه کنید. ساختن یک نسخهٔ استاتیک نیازمند تایپ کردن زیاد و فکر نکردن است، اما افزودن تعاملات نیازمند فکر زیاد و تایپ کمتری است.
برای ساخت نسخه‌ای استاتیک از برنامه خود که مدل داده‌های شما را نمایش دهد، شما باید کامپوننت‌هایی بسازید که از کامپوننت‌های دیگر استفاده کنند و با استفاده از پراپ‌ها داده را منتقل کنند.[props.](/learn/passing-props-to-a-component) پراپ‌ها یک روش برای انتقال داده از والد به فرزند هستند. (اگر با مفهوم وضعیت آشنایی دارید، به هیچ وجه از وضعیت برای ساخت این نسخه استاتیک استفاده نکنید. وضعیت فقط برای تعاملاتی است که داده در طول زمان تغییر می‌کند و در این نسخه استاتیک برنامه، به آن نیاز ندارید.)




## قدم دوم: یک نمونه‌ی استاتیک با ری‌اکت بسازید {/*قدم-دوم-یک-نمونهی-استاتیک-با-ریاکت-بسازید*/}

هم‌اکنون که سلسله‌مراتب کامپوننت‌ها را دارید، زمان پیاده‌سازی برنامهٔ است. روش بسیار ساده ایجاد یک نسخه استاتیکی است که رابط کاربری را از مدل دادهٔ خود رندر می‌کند بدون افزودن هرگونه تعامل... برای شروع! اغلب آسانتر است که ابتدا نسخهٔ استاتیک را بسازید و سپس تعامل را اضافه کنید. ساختن یک نسخهٔ استاتیک نیازمند تایپ کردن زیاد و فکر نکردن است، اما افزودن تعاملات نیازمند فکر زیاد و تایپ کمتری است.
برای ساخت نسخه‌ای استاتیک از برنامه خود که مدل داده‌های شما را نمایش دهد، شما باید کامپوننت‌هایی بسازید که از کامپوننت‌های دیگر استفاده کنند  [props.](/learn/passing-props-to-a-component) و با استفاده از پراپ‌ها داده را منتقل کنند.


 پراپ‌ها   یک روش برای انتقال داده از والد به فرزند هستند. (اگر با مفهوم استیت  آشنایی دارید، به هیچ وجه از وضعیت برای ساخت این نسخه استاتیک استفاده نکنید. استیت فقط برای تعاملاتی است که داده در طول زمان تغییر می‌کند و در این نسخه استاتیک برنامه، به آن نیاز ندارید)
 
 
   [state](/learn/state-a-components-memory) لینک به


<Sandpack>

```jsx App.js
function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" /> Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({products}) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px;
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

اگر این کد برایتان ترسناک به نظر می‌رسد، ابتدا با راهنمای سریع آشنا شوید!
[Quick Start](/learn/)

<p dir="rtl">
بعد ساختن مؤلفه‌های خود، شما یک کتابخانه از مؤلفه‌های قابل استفاده مجدد خواهید داشت که مدل داده‌های شما را نمایش می‌دهند. به دلیل اینکه این برنامه از نوع استاتیک است، مؤلفه‌ها فقط JSX را بازمی‌گردانند. مؤلفه در بالای سلسله‌مراتب (FilterableProductTable) مدل داده‌های شما را به عنوان یک ویژگی دریافت می‌کند. این با نام "جریان داده یک‌طرفه" شناخته می‌شود زیرا داده‌ها از مؤلفه بالاتر در سلسله‌مراتب به مؤلفه‌های پایین‌تر در درخت جریان می‌یابد
</p>

<Pitfall>
در این نقطه، شما نباید از هیچ مقدار وضعیتی استفاده کنید. این مرحله برای مرحله بعدی است!
</Pitfall>

## مرحله سوم: یافتن نمایش حداقل اما کاملی از وضعیت رابط کاربری {/* step-3-find-the-minimal-but-complete-representation-of-ui-state */}

<p dir="rtl">
برای ایجاد تعامل در رابط کاربری، باید به کاربران امکان تغییر مدل داده‌های زیرین خود را بدهید. برای این کار از وضعیت (state) استفاده خواهید کرد.
</p>
<p dir="rtl">
وضعیت را به عنوان مجموعه حداقلی از داده‌های تغییر پذیری تصور کنید که برنامه شما نیاز دارد که به خاطر بسپارد. مهم‌ترین اصل در ساختاردهی وضعیت، حفظ اصل DRY (Don't Repeat Yourself) است. [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) کمترین حالتی که نیازهای برنامه‌ی شما از state دارد را تعیین کنید و سایر موارد را به صورت درخواستی محاسبه کنید. به عنوان مثال، اگر در حال ساختن یک لیست خرید هستید، می‌توانید موارد را به صورت یک آرایه در state ذخیره کنید. اگر می‌خواهید  تعداد موارد در لیست را نشان دهید، تعداد موارد را به عنوان یک مقدار وضعیت جدید درنظر نگیرید  - در عوض، طول آرایه‌تان را بخوانید.
</p>

Now think of all of the pieces of data in this example application:
<p dir="rtl"> حالا به تمام قسمت های دیتا در این اپلیکیشن نگاه کنید:</p>
۱-لیست اولیه ی محصولات
۲-متنی که کاربر آن را جستجو میکند
۳- مقدار چک باکس
۴- لیست فیلترشده ی محصولات

<p dir="rtl">
کدام یکی از این‌ها state هستند؟
اول آنهایی که نیستند را مشخص میکنیم:
</p>
<li dir="rtl">
ایا در طول زمان **بدون تغییر** خواهد ماند؟ اگر بله پس استیت نیست-
آیا **از یک کامپوننت والد** با پراپس پاس داده شده؟ اگر بله پس استیت نیست-
ایا میتوانید آن را خودتان به دست بیاورید؟ **براساس استیت فعلی یا پراپس کامپوننت** اگر بله پس قطعا استیت نیست!-
</li>

<p dir="rtl">
هرچه به جز این حالت ها باشد٬  استیت است  
state 
</p>
<p dir="rtl"> یکبار دیگر باهم مرور کنیم:</p>
<p dir="rtl">
آیا **از یک کامپوننت والد** با پراپس پاس داده شده؟ اگر بله پس استیت نیست-
ایا میتوانید آن را خودتان به دست بیاورید؟ **براساس استیت فعلی یا پراپس کامپوننت** اگر بله پس قطعا استیت نیست!-
</p>
<ol dir="rtl">
  <li>اگر اصل لیست محصولات به عنوان پراپس پاس داده شده٬ پس استیت یا وضعیت نیست</li>
  <li>متن جستجو به نظر استیت است چرا که به مرور زمان تغییر میکند و ما نمیتوانیم آن را محاسبه کنیم</li>
  <li>مقدار چک باکس یک استیت است زیرا محاسبه نمیشود و به مرور زمان تغییر میکند</li>
  <li>لیست محصولات فیلتر شده استیت نیست٬ زیرا میتوانیم آن را حساب کنیم! تنها به لیست اولیه و مقداری که کاربر جستجو  کرده به همراه مقدار تکس باکس نیاز داریم  </li>
</ol>
<p>
یعنی ما فقط متن جستجو شده  و مقدار تکست باکس را به عنوان استیت نگه میداریم :)
</p>
<DeepDive>

### props یا state {/* props-vs-state */}
<div dir="rtl">
  <p dir="rtl">
  دو نوع مدل دیتا در ری اکت داریم: وضعیت (state) و (props). 
  این دو باهم تفاوت زیادی دارند:
  </p>

  [**پراپس** شبیه ارگیومنت هایی که به تایع پاس میدهید](/learn/passing-props-to-a-component) . آنها به کامپوننت والد اجازه می دهند که دیتا را به فرزند خود پاس دهد و ظاهر آن را دستکاری کند. مثلا: یک `form` میتواند رنگ
  را به عنوان پراپس به کامپوننت ‍‍‍`Button` پاس دهد.
  - [**استیت** مثل حافظه ی یک کامپوننت است](/learn/state-a-components-memory) به کامپوننت این امکان را میدهد تا تغییرات اطلاعات را ثبت کند و به آنها پاسخ مناسب دهد. مثلا کامپوننت دکمه میتواند تغییراتی مثل رفتن موس روی خود را در استیت ثبت کند
  </div>

</DeepDive>

Props and state are different, but they work together. A parent component will often keep some information in state (so that it can change it), and _pass it down_ to child components as their props. It's okay if the difference still feels fuzzy on the first read. It takes a bit of practice for it to really stick!

</DeepDive>

## Step 4: Identify where your state should live {/* step-4-identify-where-your-state-should-live */}

After identifying your app’s minimal state data, you need to identify which component is responsible for changing this state, or _owns_ the state. Remember: React uses one-way data flow, passing data down the component hierarchy from parent to child component. It may not be immediately clear which component should own what state. This can be challenging if you’re new to this concept, but you can figure it out by following these steps!

For each piece of state in your application:

1. Identify _every_ component that renders something based on that state.
2. Find their closest common parent component--a component above them all in the hierarchy.
3. Decide where the state should live:
   1. Often, you can put the state directly into their common parent.
   2. You can also put the state into some component above their common parent.
   3. If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common parent component.

In the previous step, you found two pieces of state in this application: the search input text, and the value of the checkbox. In this example, they always appear together, so it makes sense to put them into the same place.

Now let's run through our strategy for them:

1. **Identify components that use state:**
   - `ProductTable` needs to filter the product list based on that state (search text and checkbox value).
   - `SearchBar` needs to display that state (search text and checkbox value).
1. **Find their common parent:** The first parent component both components share is `FilterableProductTable`.
1. **Decide where the state lives**: We'll keep the filter text and checked state values in `FilterableProductTable`.

So the state values will live in `FilterableProductTable`.

Add state to the component with the [`useState()` Hook.](/reference/react/useState) Hooks are special functions that let you "hook into" React. Add two state variables at the top of `FilterableProductTable` and specify their initial state:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as props:

```js
<div>
  <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
  <ProductTable
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly}
  />
</div>
```

You can start seeing how your application will behave. Edit the `filterText` initial value from `useState('')` to `useState('fruit')` in the sandbox code below. You'll see both the search input text and the table update:

<Sandpack>

```jsx App.js
import {useState} from 'react';

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({filterText, inStockOnly}) {
  return (
    <form>
      <input type="text" value={filterText} placeholder="Search..." />
      <label>
        <input type="checkbox" checked={inStockOnly} /> Only show products in
        stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px;
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Notice that editing the form doesn't work yet. There is a console error in the sandbox above explaining why:

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

</ConsoleBlock>

In the sandbox above, `ProductTable` and `SearchBar` read the `filterText` and `inStockOnly` props to render the table, the input, and the checkbox. For example, here is how `SearchBar` populates the input value:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```

However, you haven't added any code to respond to the user actions like typing yet. This will be your final step.

## Step 5: Add inverse data flow {/* step-5-add-inverse-data-flow */}

Currently your app renders correctly with props and state flowing down the hierarchy. But to change the state according to user input, you will need to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit, but it requires a little more typing than two-way data binding. If you try to type or check the box in the example above, you'll see that React ignores your input. This is intentional. By writing `<input value={filterText} />`, you've set the `value` prop of the `input` to always be equal to the `filterText` state passed in from `FilterableProductTable`. Since `filterText` state is never set, the input never changes.

You want to make it so whenever the user changes the form inputs, the state updates to reflect those changes. The state is owned by `FilterableProductTable`, so only it can call `setFilterText` and `setInStockOnly`. To let `SearchBar` update the `FilterableProductTable`'s state, you need to pass these functions down to `SearchBar`:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

Inside the `SearchBar`, you will add the `onChange` event handlers and set the parent state from them:

```js {5}
<input
  type="text"
  value={filterText}
  placeholder="Search..."
  onChange={(e) => onFilterTextChange(e.target.value)}
/>
```

Now the application fully works!

<Sandpack>

```jsx App.js
import {useState} from 'react';

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px;
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

You can learn all about handling events and updating state in the [Adding Interactivity](/learn/adding-interactivity) section.

## Where to go from here {/* where-to-go-from-here */}

This was a very brief introduction to how to think about building components and applications with React. You can [start a React project](/learn/installation) right now or [dive deeper on all the syntax](/learn/describing-the-ui) used in this tutorial.
