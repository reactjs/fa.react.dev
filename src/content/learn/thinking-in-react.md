---
title: تفکر به سبک ری‌اکت
---

<Intro>

کتابخانهٔ ری‌اکت می‌تواند نگاه شما به طراحی‌هایی که می‌بینید و برنامه‌هایی که می‌سازید را تغییر دهد. وقتی یک رابط کاربری را با ری‌اکت می‌سازید، ابتدا آن را به قسمت‌هایی به نام کامپوننت‌ها تقسیم می‌کنید. سپس، وضعیت‌های بصری مختلف را برای هر یک از کامپوننت‌هایتان توصیف می‌کنید. در نهایت، کامپوننت‌های خود را به گونه‌ای با یکدیگر ارتباط می‌دهید که داده از طریق آن‌ها جابه‌جا شود. در اینجا ما مراحل ساخت یک جدول با قابلیت جستجوی اطلاعات را با شما برای هدف آموزش به اشتراک می‌گذاریم.

</Intro>

## با ماک‌آپ شروع کنید {/*start-with-the-mockup*/}

تصور کنید که شما هم‌اکنون یک مدل داده از طریق یک API و یک ماک‌آپ از یک طراح دارید. فایل داده، اطلاعاتی مانند فایل زیر را شامل می‌شود:


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

خروجی ماک‌آپ شبیه تصویر زیر است:


<img
  src="/images/docs/s_thinking-in-react_ui_outline.png"
  width="300"
  style={{margin: '0 auto'}}
/>

برای پیاده‌سازی هر طراحی، ما این پنج قدم را برمی‌داریم.

## قدم ۱: رابط کاربری را به یک سلسله‌مراتب کامپوننت تقسیم کنید {/*step-1-break-the-ui-into-a-component-hierarchy*/}

اول دور هر کامپوننت و زیرکامپوننت در طراحی خط بکشید و برای آن‌ها اسم بگذارید. اگر با یک طراح همکاری می‌کنید، ممکن است او این کامپوننت‌ها را در ابزار طراحی خود قبلاً نام‌گذاری کرده باشد. از او بپرسید!

بسته به پیشینهٔ شما، می‌توانید به روش‌های مختلف دربارهٔ تقسیم یک طراحی به کامپوننت‌ها فکر کنید.

- **برنامه‌نویسی**—از تکنیک‌های مشابه برای تصمیم‌گیری در مورد اینکه آیا باید یک تابع یا شیء جدید ایجاد کنید، استفاده کنید. یکی از این تکنیک‌ها [اصل مسئولیت واحد (single responsibility principle)](https://en.wikipedia.org/wiki/Single_responsibility_principle) است، به این معنی که یک کامپوننت بهتر است تنها یک کار را انجام دهد. اگر کامپوننت به‌طور مداوم بزرگ‌تر شود، باید به زیرکامپوننت‌های کوچک‌تر تجزیه شود.
- **CSS**—بررسی کنید که برای چه عناصری از کلاس‌ها استفاده خواهید کرد. (با این حال، کامپوننت‌ها جزئیات ریزتری دارند.)
- **design**—در نظر بگیرید که چگونه لایه‌های طراحی را سازماندهی خواهید کرد.

اگر فایل JSON شما ساختار مناسبی داشته باشد، اغلب متوجه می‌شوید که به‌طور طبیعی با ساختار کامپوننت‌های رابط کاربری شما همخوانی دارد. این به این دلیل است که مدل‌های رابط کاربری و داده اغلب همان معماری اطلاعاتی را دارند—به اصطلاح، همان شکل. رابط کاربری خود را به کامپوننت‌ها تقسیم کنید، به گونه‌ای که هر کامپوننت با یک قسمت از مدل دادهٔ شما مطابقت داشته باشد.

در این صفحه پنج کامپوننت وجود دارد:

<FullWidth>

<CodeDiagram flip>

<img
  src="/images/docs/s_thinking-in-react_ui.png"
  width="500"
  style={{margin: '0 auto'}}
/>

1. `FilterableProductTable` (خاکستری) شامل کل برنامه است.
2. `SearchBar` (آبی) ورودی کاربر را دریافت می‌کند.
3. `ProductTable` (بنفش) لیست دادهٔ فیلترشده بر اساس ورودی کاربر را نمایش می‌دهد.
4. `ProductCategoryRow` (سبز) عنوان برای هر گروه را نشان می‌دهد.
5. `ProductRow` (زرد) هر ردیف محصول را نشان می‌دهد.

</CodeDiagram>

</FullWidth>


اگر به کامپوننت ۳ (جدول محصولات) نگاه کنید، می‌بینید که هدر جدول (شامل برچسب‌های «نام» و «قیمت») قسمت جداگانه‌ای نیست. این مسئله سلیقه‌ای است و می‌توانید هر دو حالت را انتخاب کنید. در این مثال، این بخش جزء کامپوننت ۳ است زیرا داخل لیست کامپوننت ۳ ظاهر می‌شود. با این حال، اگر این هدر به‌طور پیچیده‌تری رشد کند (مثلاً اگر مرتب‌سازی را اضافه کنید)، می‌توانید آن را به‌عنوان یک کامپوننت جداگانه با نام `ProductTableHeader` جابجا کنید.


هم‌اکنون که اجزای ماک‌آپ را شناسایی کرده‌اید، آن‌ها را به‌صورت سلسله‌مراتبی قرار دهید. کامپوننت‌هایی که در داخل یک کامپوننت دیگر در نمونهٔ طراحی ظاهر می‌شوند، باید به‌عنوان زیرمجموعه در سلسله‌مراتب ظاهر شوند:


- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

## قدم ۲: یک نسخهٔ استاتیک در ری‌اکت بسازید {/*step-2-build-a-static-version-in-react*/}

هم‌اکنون که سلسله‌مراتب کامپوننت‌ها را دارید، زمان پیاده‌سازی برنامه است. روش بسیار ساده، ایجاد یک نسخهٔ استاتیک است که رابط کاربری را از مدل دادهٔ خود رندر می‌کند، بدون افزودن هرگونه تعامل... برای شروع! اغلب آسان‌تر است که ابتدا نسخهٔ استاتیک را بسازید و سپس تعامل را اضافه کنید. ساختن یک نسخهٔ استاتیک نیازمند تایپ کردن زیاد و فکر نکردن است، اما افزودن تعاملات نیازمند فکر زیاد و تایپ کمتری است.

برای ساخت نسخه‌ای استاتیک از برنامهٔ خود که مدل داده‌های شما را نمایش دهد، شما باید کامپوننت‌هایی بسازید که از کامپوننت‌های دیگر استفاده کنند و با استفاده از [پراپس](/learn/passing-props-to-a-component) داده را منتقل کنند. پراپس یک روش برای انتقال داده از والد به فرزند است. (اگر با مفهوم [استیت](/learn/state-a-components-memory) آشنایی دارید، به هیچ وجه از استیت برای ساخت این نسخهٔ استاتیک استفاده نکنید. استیت فقط برای تعاملاتی است که داده در طول زمان تغییر می‌کند و در این نسخهٔ استاتیک برنامه، به آن نیاز ندارید.)

<Sandpack>

```jsx src/App.js
function ProductCategoryRow({ category }) {
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

اگر این کد برایتان ترسناک به نظر می‌رسد، ابتدا با [راهنمای سریع](/learn/) آشنا شوید!

بعد از ساختن کامپوننت‌های خود، شما یک کتابخانه از کامپوننت‌های قابل‌استفادهٔ مجدد خواهید داشت که مدل داده‌های شما را نمایش می‌دهند. به دلیل اینکه این برنامه از نوع استاتیک است، کامپوننت‌ها فقط JSX را بازمی‌گردانند. کامپوننت در بالای سلسله‌مراتب (`FilterableProductTable`) مدل داده‌های شما را به‌عنوان یک پراپ دریافت می‌کند. این با نام «جریان داده یک‌طرفه» شناخته می‌شود زیرا داده‌ها از کامپوننت‌های بالاتر در سلسله‌مراتب به کامپوننت‌های پایین‌تر در درخت جریان می‌یابند.

<Pitfall>

در این نقطه، شما نباید از هیچ مقدار استیتی استفاده کنید. این مرحله برای مرحلهٔ بعدی است!

</Pitfall>

## قدم ۳: کمینه اما کامل‌ترین نمایش استیت رابط کاربری را بیابید {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

برای ایجاد تعامل در رابط کاربری، باید به کاربران امکان تغییر مدل داده‌های زیرین خود را بدهید. برای این کار از استیت استفاده خواهید کرد.

استیت را به‌عنوان مجموعه حداقلی از داده‌های تغییرپذیر تصور کنید که برنامهٔ شما نیاز دارد به خاطر بسپارد. مهم‌ترین اصل در ساختاردهی استیت، حفظ اصل [DRY (Don't Repeat Yourself)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) است. کمترین حالتی که نیازهای برنامهٔ شما از استیت دارد را تعیین کنید و سایر موارد را به‌صورت درخواستی محاسبه کنید. به‌عنوان مثال، اگر در حال ساختن یک لیست خرید هستید، می‌توانید موارد را به‌صورت یک آرایه در استیت ذخیره کنید. اگر می‌خواهید تعداد موارد در لیست را نشان دهید، تعداد موارد را به‌عنوان یک مقدار استیت جدید در نظر نگیرید—در عوض، طول آرایهٔ خود را بخوانید.

حالا به تمام قسمت‌های داده در این برنامه نگاه کنید:

1. `FilterableProductTable`
2. `SearchBar`
3. `ProductTable`
4. `ProductCategoryRow`
5. `ProductRow`

کدام‌یک از این‌ها استیت هستند؟

اول آن‌هایی که نیستند را مشخص می‌کنیم:

- آیا در طول زمان **بدون تغییر** خواهد ماند؟ اگر بله، پس استیت نیست.
- آیا **از یک کامپوننت والد** با پراپس ارسال شده؟ اگر بله، پس استیت نیست.
- آیا می‌توانید آن را خودتان به دست بیاورید **بر اساس استیت فعلی یا پراپس کامپوننت**؟ اگر بله، پس قطعاً استیت نیست!

هرچه به جز این حالت‌ها باشد، استیت است.

بیایید یک‌بار دیگر با هم مرور کنیم:

- آیا **از یک کامپوننت والد** با پراپس ارسال شده؟ اگر بله، پس استیت نیست.
- آیا می‌توانید آن را خودتان به دست بیاورید **بر اساس استیت فعلی یا پراپس کامپوننت**؟ اگر بله، پس قطعاً استیت نیست!

1. اگر اصل لیست محصولات به‌عنوان پراپس ارسال شده، پس استیت نیست.
2. متن جستجو به نظر استیت است چرا که به‌مرور زمان تغییر می‌کند و ما نمی‌توانیم آن را محاسبه کنیم.
3. مقدار چک‌باکس یک استیت است زیرا محاسبه نمی‌شود و به‌مرور زمان تغییر می‌کند.
4. لیست محصولات فیلترشده استیت نیست، زیرا می‌توانیم آن را حساب کنیم! تنها به لیست اولیه و مقداری که کاربر جستجو کرده به‌همراه مقدار چک‌باکس نیاز داریم.

یعنی ما فقط متن جستجو شده و مقدار چک‌باکس را به‌عنوان استیت نگه می‌داریم.

<DeepDive>

#### پراپس در برابر استیت {/*props-vs-state*/}

دو نوع مدل داده در ری‌اکت داریم: پراپس و استیت. این دو با هم تفاوت زیادی دارند:

- [**پراپس** شبیه آرگومان‌هایی است که به یک تابع می‌دهید.](/learn/passing-props-to-a-component) آن‌ها به کامپوننت والد اجازه می‌دهند که داده را به فرزند خود ارسال کند و ظاهر آن را دستکاری کند. مثلاً: یک `form` می‌تواند رنگ را به‌عنوان پراپس به کامپوننت `Button` ارسال کند.
- [**استیت** مثل حافظهٔ یک کامپوننت است.](/learn/state-a-components-memory) به کامپوننت این امکان را می‌دهد تا تغییرات اطلاعات را ثبت کند و به آن‌ها پاسخ مناسب دهد. مثلاً کامپوننت دکمه می‌تواند تغییراتی مثل رفتن موس روی خود را در استیت ثبت کند.

</DeepDive>

پراپس و استیت متفاوت هستند، اما با هم کار می‌کنند. یک کامپوننت والد اغلب برخی اطلاعات را در استیت نگه می‌دارد (تا بتواند آن‌ها را تغییر دهد) و به‌عنوان پراپس به کامپوننت‌های فرزند ارسال می‌کند. اگر هنوز تفاوت بین آن‌ها برای اولین بار کاملاً روشن نشده باشد، مشکلی ندارد. برای کامل شدن درک این موضوع، نیاز به تمرین کمی دارد!



## قدم ۴: تعیین کنید استیت شما باید کجا زندگی کند {/*step-4-identify-where-your-state-should-live*/}

بعد از شناسایی داده‌های حداقلی مرتبط با برنامهٔ شما، نیاز دارید تعیین کنید که کدام کامپوننت مسئول تغییر این داده‌هاست، یا به عبارتی، مالک (owns) این داده‌ها است. به یاد داشته باشید: ری‌اکت از جریان دادهٔ یک‌طرفه استفاده می‌کند و داده‌ها را از کامپوننت والد به کامپوننت‌های فرزند در سلسله‌مراتب ارسال می‌کند. ممکن است اول برسد که کدام کامپوننت باید مالک داده‌هایی باشد که در اختیار دارد، به‌وضوح نباشد. اگر تازه با این مفهوم آشنا شده‌اید، ممکن است چالش‌برانگیز باشد، اما با دنبال کردن این مراحل می‌توانید آن را کشف کنید.

برای هر قطعه از استیت در برنامهٔ شما:

- *تمام* کامپوننت‌هایی که بر اساس آن استیت چیزی را رندر می‌کنند را شناسایی کنید.
- پدر مشترک نزدیک آن‌ها را پیدا کنید—یعنی یک کامپوننت بالاتر از همهٔ آن‌ها در سلسله‌مراتب.
- تصمیم بگیرید که استیت باید در کجا قرار بگیرد:
  - اغلب، می‌توانید استیت را مستقیماً در کامپوننت مشترک آن‌ها قرار دهید.
  - همچنین می‌توانید استیت را در یکی از کامپوننت‌های بالاتر از کامپوننت مشترک آن‌ها قرار دهید.
  - اگر نمی‌توانید کامپوننتی پیدا کنید که استیت را به‌صورت منطقی مدیریت کند، می‌توانید یک کامپوننت جدید را که تنها برای نگه‌داری استیت ایجاد شده بسازید و آن را در جایی در سلسله‌مراتب بالاتر از کامپوننت مشترک قرار دهید.

در مرحلهٔ قبلی، دو قطعه از استیت را در این برنامه پیدا کردید: متن ورودی جستجو و مقدار چک‌باکس. در این مثال، همیشه همراه یکدیگر ظاهر می‌شوند، بنابراین منطقی است که آن‌ها را در یک جایگاه قرار دهید.


حالا بیایید از راهبرد خود روی این مسئله استفاده کنیم:

- **شناسایی کامپوننت‌هایی که از استیت استفاده می‌کنند:** `ProductTable` نیاز دارد که لیست محصولات را بر اساس این استیت (متن جستجو و مقدار چک‌باکس) فیلتر کند. `SearchBar` نیاز دارد که این استیت (متن جستجو و مقدار چک‌باکس) را نمایش دهد.
- **یافتن پدر مشترک آن‌ها:** اولین کامپوننت والد که هر دو کامپوننت با هم به اشتراک می‌گذارند، `FilterableProductTable` است.
- **تصمیم برای محل قرارگیری استیت:** ما مقادیر متن فیلتر و وضعیت چک‌باکس را در `FilterableProductTable` نگه‌داری خواهیم کرد.

بنابراین مقادیر استیت در `FilterableProductTable` قرار خواهند گرفت.

استیت را درون کامپوننتی که [`useState()` Hook](/reference/react/useState) دارد اضافه کنید. هوک‌ها توابع خاصی هستند که به شما اجازه می‌دهند تا قدرت ری‌اکت را درونشان قلاب کنید. دو متغیر استیت در بالای `FilterableProductTable` تعریف و مقدار پیش‌فرض آن‌ها را مشخص کنید:


```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```

سپس `filterText` و `inStockOnly` را به `ProductTable` و `SearchBar` به‌عنوان پراپس ارسال کنید:

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

شما می‌توانید شروع به دیدن نحوهٔ رفتار برنامهٔ خود کنید. مقدار اولیهٔ `filterText` را از `useState('')` به `useState('fruit')` در کد محیط آزمایشی زیر ویرایش کنید. خواهید دید که هم ورودی جستجو و هم جدول به‌روزرسانی می‌شوند.

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

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


توجه کنید که هنوز ویرایش فرم کار نمی‌کند. یک خطا در کنسول محیط آزمایشی بالا وجود دارد که دلیل آن را توضیح می‌دهد.

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

</ConsoleBlock>

در محیط آزمایشی بالا، `ProductTable` و `SearchBar` مقادیر `filterText` و `inStockOnly` را به‌عنوان پراپس می‌خوانند تا جدول، ورودی و چک‌باکس را رندر کنند. به‌عنوان مثال، در اینجا نحوهٔ پر کردن مقدار ورودی در `SearchBar` نمایش داده شده است:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```

با این حال، هنوز کدی برای پاسخ به اقدامات کاربر مانند تایپ کردن اضافه نکرده‌اید. این مرحلهٔ آخر شما خواهد بود.

## قدم ۵: جریان دادهٔ معکوس را اضافه کنید {/*step-5-add-inverse-data-flow*/}

در حال حاضر برنامهٔ شما با پراپس و استیت که از بالا به پایین سلسله‌مراتب به‌خوبی رندر می‌شود. اما برای تغییر استیت بر اساس ورودی کاربر، شما نیاز به پشتیبانی از جریان داده به سمت دیگر دارید: کامپوننت‌های فرم که در عمق سلسله‌مراتب هستند باید استیت را در `FilterableProductTable` به‌روزرسانی کنند.

ری‌اکت این جریان داده را صریحاً اعلام می‌کند، اما نیاز به تایپ کردن بیشتری نسبت به ورودی دادهٔ دوطرفه دارد. اگر در مثال بالا سعی کنید در ورودی تایپ کنید یا چک‌باکس را انتخاب کنید، مشاهده خواهید کرد که ری‌اکت ورودی‌های شما را نادیده می‌گیرد. این عمدی است. با نوشتن `<input value={filterText} />`، شما پراپ `value` ورودی را به‌طور دائمی برابر با استیت `filterText` قرار داده‌اید که از `FilterableProductTable` به آن منتقل می‌شود. از آنجایی که استیت `filterText` هرگز تنظیم نمی‌شود، ورودی هرگز تغییر نمی‌کند.

شما می‌خواهید طوری عمل کنید که هر زمان کاربر ورودی‌های فرم را تغییر دهد، استیت به‌روزرسانی شود تا تغییرات نمایان شود. استیت توسط `FilterableProductTable` مدیریت می‌شود، بنابراین تنها این کامپوننت می‌تواند توابع `setFilterText` و `setInStockOnly` را فراخوانی کند. برای اجازه دادن به `SearchBar` برای به‌روزرسانی استیت `FilterableProductTable`، شما باید این توابع را به `SearchBar` ارسال کنید.


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

شما رویداد `onChange` را درون `SearchBar` اضافه خواهید کرد و استیت پدر را از آنجا تنظیم می‌کنید.

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
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
```

حالا برنامه کار می‌کند!

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

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

برای کسب اطلاعات بیشتر در مورد کنترل رویدادها و به‌روزرسانی استیت می‌توانید به قسمت [افزودن تعاملات](/learn/adding-interactivity) مراجعه کنید.

## از اینجا به کجا بروید {/*where-to-go-from-here*/}

این مقدمه‌ای بسیار کوتاه بود برای آشنایی با نحوهٔ فکر کردن در مورد ساخت کامپوننت‌ها و برنامه‌ها با ری‌اکت. شما می‌توانید همین حالا یک [پروژهٔ ری‌اکت راه‌اندازی کنید](/learn/installation) یا به عمق بیشتری درباره‌ی [تمام سینتکس](/learn/describing-the-ui) استفاده‌شده در این آموزش بپردازید.
