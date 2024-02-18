---
title: تفکر به سبک ری‌اکت
---
<Intro>
کتابخانه‌ی ری‌اکت می‌تواند نگاه شما به طراحی‌هایی که می بینید و برنامه‌هایی که می‌سازید را٬ تغییر دهد.وقتی یک رابط کاربری را با ری‌اکت می‌سازید، ابتدا آن را به قسمت‌هایی به نام کامپوننت‌ها تقسیم می‌کنید.
 سپس، وضعیت‌های بصری مختلف را برای هر یک از کامپوننت‌هایتان توصیف می‌کنید. در نهایت، کامپوننت‌های خود را به گونه‌ای با یکدیگر ارتباط می‌دهید که داده از طریق آنها جابه‌جا شود. در اینجا ما مراحل ساخت یک جدول با قابلیت سرچ اطلاعات را با شما برای هدف اموزش به اشتراک می‌گذاریم
</Intro>
## Start with the mockup {/*start-with-the-mockup*/}

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
  src="/images/docs/s_thinking-in-react_ui_outline.png"
  width="300"
  style={{margin: '0 auto'}}
/>
برای پیاده سازی هر دیزاینی ما این پنج قدم را  برمی داریم:

## Step 1: Break the UI into a component hierarchy {/*step-1-break-the-ui-into-a-component-hierarchy*/}

اول دور هر کامپوننت و زیر کامپوننت در دیزاین خط بکشید و برای آنها اسم بگذارید. اگر با یک طراح همکاری می‌کنید، ممکن است او این کامپوننت‌ها را در ابزار طراحی خود قبلاً نامگذاری کرده باشد. از او بپرسید!
بسته به بکگراند شما، می‌توانید به روش‌های مختلف درباره‌ی تقسیم یک طراحی به کامپوننت‌ها فکر کنید.

- **برنامه‌نویسی**--از تکنیک‌های مشابه برای تصمیم‌گیری در مورد اینکه آیا باید یک تابع یا شیء جدید ایجاد کنید استفاده کنید
  یکی از این تکنیک‌ها اصل single responsibility است، به این معنی که یک کامپوننت بهتر است تنها یک کار را انجام دهد. اگر کامپوننت به طور مداوم بزرگتر شود، باید به زیرکامپوننت‌های کوچکتر تجزیه شود.
  [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)

- **CSS**--بررسی کنید که برای چه عناصری از کلاس‌ها استفاده خواهید کرد. (با این حال، کامپوننت‌ها کمتر جزئیات ریز دارند.)

- **design**--در نظر بگیرید که چگونه لایه‌های طراحی را سازماندهی خواهید کرد
  اگر فایل جیسون شما ساختار مناسبی داشته باشد، اغلب متوجه می شوید که به طور طبیعی با ساختار کامپوننت‌های رابط کاربری شما همخوانی دارد. این به این دلیل است که مدل‌های رابط کاربری و داده اغلب همان معماری اطلاعاتی را دارند - به اصطلاح، همان شکل. رابط کاربری خود را به
  کامپوننت‌ها تقسیم کنید، به گونه‌ای که هر کامپوننت با یک قسمت از مدل داده شما مطابقت داشته باشد

اگر فایل جیسون شما ساختار مناسبی داشته باشد، اغلب متوجه می شوید که به طور طبیعی با ساختار کامپوننت‌های رابط کاربری شما همخوانی دارد. این به این دلیل است که مدل‌های رابط کاربری و داده اغلب همان معماری اطلاعاتی را دارند - به اصطلاح، همان شکل. رابط کاربری خود را به کامپوننت‌ها تقسیم کنید، به گونه‌ای که هر کامپوننت با یک قسمت از مدل داده شما مطابقت داشته باشد.

در این صفحه پنج کامپوننت هست:

<FullWidth>

<CodeDiagram flip>

<img
  src="/images/docs/s_thinking-in-react_ui.png"
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


اگر به کامپوننت ۳(جدول محصولات) نگاه کنید، می‌بینید که هدر جدول (شامل برچسب‌های "نام" و "قیمت") قسمت جداگانه‌ای نیست. این مسئله سلیقه‌ای است و می‌توانید هر دو را انتخاب کنید. در این مثال، این بخش جزء کامپوننت ۳است زیرا داخل لیست کامپوننت ۳ ظاهر می‌شود. با این حال، اگر این هدر به طور پیچیده‌تری رشد کند (مثلاً اگر مرتب‌سازی را اضافه کنید)، می‌توانید آن را به عنوان یک کامپوننت جداگانه با نام(هدر جدول محصولات) جابجا کنید.


هم‌اکنون که اجزای ماک‌اپ را شناسایی کرده‌اید، آن‌ها را به صورت سلسله‌مراتبی قرار دهید. کامپوننتی که در داخل یک کامپوننت دیگر در نمونه طراحی ظاهر می‌شوند، باید به عنوان زیرمجموعه در سلسله‌مراتب ظاهر شوند.


- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

## Step 2: Build a static version in React {/*step-2-build-a-static-version-in-react*/}
<p dir="rtl">
هم‌اکنون که سلسله‌مراتب کامپوننت‌ها را دارید، زمان پیاده‌سازی برنامهٔ است. روش بسیار ساده ایجاد یک نسخه استاتیکی است که رابط کاربری را از مدل دادهٔ خود رندر می‌کند بدون افزودن هرگونه تعامل... برای شروع! اغلب آسانتر است که ابتدا نسخهٔ استاتیک را بسازید و سپس تعامل را اضافه کنید. ساختن یک نسخهٔ استاتیک نیازمند تایپ کردن زیاد و فکر نکردن است، اما افزودن تعاملات نیازمند فکر زیاد و تایپ کمتری است.
برای ساخت نسخه‌ای استاتیک از برنامه خود که مدل داده‌های شما را نمایش دهد، شما باید کامپوننت‌هایی بسازید که از کامپوننت‌های دیگر استفاده کنند  [props.](/learn/passing-props-to-a-component) و با استفاده از پراپ‌ها داده را منتقل کنند.
 پراپ‌ها   یک روش برای انتقال داده از والد به فرزند هستند. (اگر با مفهوم استیت  آشنایی دارید، به هیچ وجه از وضعیت برای ساخت این نسخه استاتیک استفاده نکنید. استیت فقط برای تعاملاتی است که داده در طول زمان تغییر می‌کند و در این نسخه استاتیک برنامه، به آن نیاز ندارید)
  
  [state](/learn/state-a-components-memory) لینک به

</p>

<Sandpack>

<<<<<<< HEAD
```jsx App.js
function ProductCategoryRow({category}) {
=======
```jsx src/App.js
function ProductCategoryRow({ category }) {
>>>>>>> 315cb7a38a1645623fc55501429285ab680b8a6a
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
بعد ساختن کامپوننت‌های خود، شما یک کتابخانه از کامپوننت‌های قابل استفاده مجدد خواهید داشت که مدل داده‌های شما را نمایش می‌دهند. به دلیل اینکه این برنامه از نوع استاتیک است، کامپوننت‌ها فقط JSX را بازمی‌گردانند. کامپوننت‌، در بالای سلسله‌مراتب (FilterableProductTable) مدل داده‌های شما را به عنوان یک ویژگی دریافت می‌کند. این با نام "جریان داده یک‌طرفه" شناخته می‌شود زیرا داده‌ها از کامپوننت‌ه بالاتر در سلسله‌مراتب به کامپوننت‌های پایین‌تر در درخت جریان می‌یابند
</p>
<Pitfall>
در این نقطه، شما نباید از هیچ مقدار وضعیتی استفاده کنید. این مرحله برای مرحله بعدی است!
</Pitfall>

## Step 3: Find the minimal but complete representation of UI state {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

برای ایجاد تعامل در رابط کاربری، باید به کاربران امکان تغییر مدل داده‌های زیرین خود را بدهید. برای این کار از وضعیت (state) استفاده خواهید کرد.

<p dir="rtl">
وضعیت را به عنوان مجموعه حداقلی از داده‌های تغییر پذیری تصور کنید که برنامه شما نیاز دارد که به خاطر بسپارد. مهم‌ترین اصل در ساختاردهی وضعیت، حفظ اصل DRY (Don't Repeat Yourself) است. [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) کمترین حالتی که نیازهای برنامه‌ی شما از state دارد را تعیین کنید و سایر موارد را به صورت درخواستی محاسبه کنید. به عنوان مثال، اگر در حال ساختن یک لیست خرید هستید، می‌توانید موارد را به صورت یک آرایه در state ذخیره کنید. اگر می‌خواهید  تعداد موارد در لیست را نشان دهید، تعداد موارد را به عنوان یک مقدار وضعیت جدید درنظر نگیرید  - در عوض، طول آرایه‌تان را بخوانید.
</p>
 حالا به تمام قسمت های دیتا در این اپلیکیشن نگاه کنید:

1-FilterableProductTable
2-SearchBar
3-ProductTable
4-ProductCategoryRow
5-ProductRow

کدام یکی از این‌ها state هستند؟
اول آنهایی که نیستند را مشخص میکنیم:

<li>
ایا در طول زمان **بدون تغییر** خواهد ماند؟ اگر بله پس استیت نیست-
آیا **از یک کامپوننت والد** با پراپس پاس داده شده؟ اگر بله پس استیت نیست-
ایا میتوانید آن را خودتان به دست بیاورید؟ **براساس استیت فعلی یا پراپس کامپوننت** اگر بله پس قطعا استیت نیست!-
</li>


هرچه به جز این حالت ها باشد٬  استیت است  
state 

 یکبار دیگر باهم مرور کنیم:

آیا **از یک کامپوننت والد** با پراپس پاس داده شده؟ اگر بله پس استیت نیست-
ایا میتوانید آن را خودتان به دست بیاورید؟ **براساس استیت فعلی یا پراپس کامپوننت** اگر بله پس قطعا استیت نیست!-

<ol>
  <li>اگر اصل لیست محصولات به عنوان پراپس پاس داده شده٬ پس استیت یا وضعیت نیست</li>
  <li>متن جستجو به نظر استیت است چرا که به مرور زمان تغییر میکند و ما نمیتوانیم آن را محاسبه کنیم</li>
  <li>مقدار چک باکس یک استیت است زیرا محاسبه نمیشود و به مرور زمان تغییر میکند</li>
  <li>لیست محصولات فیلتر شده استیت نیست٬ زیرا میتوانیم آن را حساب کنیم! تنها به لیست اولیه و مقداری که کاربر جستجو  کرده به همراه مقدار تکس باکس نیاز داریم  </li>
</ol>

یعنی ما فقط متن جستجو شده  و مقدار تکست باکس را به عنوان استیت نگه میداریم 

<DeepDive>
#### Props vs State {/*props-vs-state*/}

 
  دو نوع مدل دیتا در ری اکت داریم: وضعیت (state) و (props). 
  این دو باهم تفاوت زیادی دارند:


  [**پراپس** شبیه ارگیومنت هایی که به تایع پاس میدهید](/learn/passing-props-to-a-component) . آنها به کامپوننت والد اجازه می دهند که دیتا را به فرزند خود پاس دهد و ظاهر آن را دستکاری کند. مثلا: یک `form` میتواند رنگ
  را به عنوان پراپس به کامپوننت ‍‍‍`Button` پاس دهد.
  - [**استیت** مثل حافظه ی یک کامپوننت است](/learn/state-a-components-memory) به کامپوننت این امکان را میدهد تا تغییرات اطلاعات را ثبت کند و به آنها پاسخ مناسب دهد. مثلا کامپوننت دکمه میتواند تغییراتی مثل رفتن موس روی خود را در استیت ثبت کند


</DeepDive>

پراپ‌ها (Props) و استیت‌ها (State) متفاوت هستند، اما با هم کار می‌کنند. یک کامپوننت والد (Parent) اغلب برخی اطلاعات را در استیت نگه می‌دارد (تا بتواند آن‌ها را تغییر دهد) و به عنوان پراپ به کامپوننت‌های فرزند (Child) ارسال می‌کند. اگر هنوز تفاوت بین آن‌ها برای اولین بار کاملاً روشن نشده باشد، مشکلی ندارد. برای کامل شدن درک این موضوع، نیاز به تمرین کمی دارد!



## Step 4: Identify where your state should live {/*step-4-identify-where-your-state-should-live*/}

بعد از شناسایی داده‌های حداقلی مرتبط با برنامه‌ی شما، نیاز دارید تعیین کنید که کدام کامپوننت مسئول تغییر این داده‌هاست، یا به عبارتی، مالک (owns) این داده‌ها است. به یاد داشته باشید: ری‌اکت از جریان داده‌ی یک طرفه استفاده می‌کند و داده‌ها را از کامپوننت والد به کامپوننت‌های فرزند در سلسله‌مراتب ارسال می‌کند. ممکن است اولیه‌اش که کدام کامپوننت باید مالک داده‌هایی باشد که در اختیار دارد، به وضوح نباشد. اگر تازه با این مفهوم آشنا شده‌اید، ممکن است چالش برانگیز باشد، اما با دنبال کردن این 


برای هر قطعه از استیت (state) در برنامه‌ی شما:

*تمام* کامپوننت‌هایی که بر اساس آن استیت چیزی را رندر می‌کنند را شناسایی کنید.
پدر مشترک نزدیک آن‌ها را پیدا کنید - یعنی یک کامپوننت بالاتر از همه‌ی آن‌ها در سلسله‌مراتب.
تصمیم بگیرید که استیت باید در کجا قرار بگیرد:
اغلب، می‌توانید استیت را مستقیماً در کامپوننت مشترک آن‌ها قرار دهید.
همچنین می‌توانید استیت را در یکی از کامپوننت‌های بالاتر از کامپوننت مشترک آن‌ها قرار دهید.
اگر نمی‌توانید کامپوننتی پیدا کنید که استیت را به صورت منطقی مدیریت کند، می‌توانید یک کامپوننت جدید را که تنها برای نگه‌داری استیت ایجاد شده باشد بسازید و آن را در جایی در سلسله‌مراتب بالاتر از کامپوننت مشترک قرار دهید.
در مرحله‌ی قبلی، دو قطعه از استیت را در این برنامه پیدا کردید: متن ورودی جستجو و مقدار چک‌باکس. در این مثال، همیشه همراه یکدیگر ظاهر می‌شوند، بنابراین منطقی است که آن‌ها را در یک جایگاه قرار دهید


حالا بیایید از راهبرد ما  مسئله را بررسی کنیم

شناسایی کامپوننت‌هایی که از استیت استفاده می‌کنند: ***

ProductTable نیاز دارد که لیست محصولات را بر اساس این استیت (متن جستجو و مقدار چک‌باکس) فیلتر کند. ***
SearchBar نیاز دارد که این استیت (متن جستجو و مقدار چک‌باکس) را نمایش دهد. ***
یافتن پدر مشترک آن‌ها: اولین کامپوننت والد که هر دو کامپوننت با هم به اشتراک می‌گذارند، FilterableProductTable است. *** 
تصمیم برای محل قرارگیری استیت: ما مقادیر متن فیلتر و وضعیت چک‌باکس را در FilterableProductTable نگه‌داری خواهیم کرد. ***
بنابراین مقادیر استیت در FilterableProductTable قرار خواهند گرفت.

استیت را درون کامپوننتی که [`useState()` Hook.](/reference/react/useState) دارد اضافه کنید. Hookها توابه خاصی هستند که به شما اجازه می‌دهند تا قدرت ری‌اکت را درونشان قلاب کنید. دو متغییر استیت در بالای `FilterableProductTable`تعریف و مقدار پیش‌فرض آنها را مشخص کنید:


```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
```
<p dir="rtl">
سپس `filterText` و `inStockOnly` را به `ProductTable` و `SearchBar` به عنوان prop ارسال کنید:
</p>

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

<p dir="rtl">
شما می‌توانید شروع به دیدن نحوه‌ی رفتار برنامه‌ی خود کنید. مقدار اولیه filterText را از useState('') به useState('fruit') در کد محیط آزمایشی زیر ویرایش کنید. خواهید دید که هر دو متن ورودی جستجو و جدول به‌روزرسانی می‌شوند.
</p>

<Sandpack>

<<<<<<< HEAD
```jsx App.js
import {useState} from 'react';
=======
```jsx src/App.js
import { useState } from 'react';
>>>>>>> 315cb7a38a1645623fc55501429285ab680b8a6a

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
<p dir="rtl">
در محیط آزمایشی بالا، ProductTable و SearchBar مقادیر filterText و inStockOnly را به عنوان پراپ (props) می‌خوانند تا جدول، ورودی و چک‌باکس را رندر کنند. به عنوان مثال، اینجا نحوه‌ی پر کردن مقدار ورودی در SearchBar نمایش داده شده است:
</p>

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."/>
```
<p dir="rtl">
با این حال، هنوز کدی برای پاسخ به اقدامات کاربر مانند تایپ کردن اضافه نکرده‌اید. این مرحله آخر شما خواهد بود.
</p>

## Step 5: Add inverse data flow {/*step-5-add-inverse-data-flow*/}
<p dir="rtl">
در حال حاضر برنامه‌ی شما با پراپ‌ها و استیت‌ها که از بالا به پایین سلسله‌مراتب به‌خوبی رندر می‌شود. اما برای تغییر استیت بر اساس ورودی کاربر، شما نیاز به پشتیبانی از جریان داده به سمت دیگر دارید: کامپوننت‌های فرم (form components) که در عمق سلسله‌مراتب هستند باید استیت را در FilterableProductTable به‌روزرسانی دهنده.

ری‌اکت این جریان داده را صریحاً اعلام می‌کند، اما نیاز به تایپ کردن بیشتری نسبت به ورودی داده دوطرفه دارد. اگر در مثال بالا سعی کنید در ورودی تایپ کنید یا چک‌باکس را انتخاب کنید، مشاهده خواهید کرد که ری‌اکت ورودی‌های شما را نادیده می‌گیرد. این عمدی است. با نوشتن `<input value={filterText} />`، شما value پراپ ورودی را به طور دائمی برابر با استیت filterText قرار داده‌اید که از FilterableProductTable به آن منتقل می‌شود. از آنجایی که استیت filterText هرگز تنظیم نمی‌شود، ورودی هرگز تغییر نمی‌کند.

شما می‌خواهید طوری عمل کنید که هر زمان کاربر ورودی‌های فرم را تغییر دهد، استیت به‌روزرسانی شود تا تغییرات نمایان شود. استیت توسط FilterableProductTable مدیریت می‌شود، بنابراین تنها این کامپوننت می‌تواند توابع setFilterText و setInStockOnly را فراخوانی کند. برای اجازه دادن به SearchBar برای به‌روزرسانی استیت FilterableProductTable، شما باید این توابع را به SearchBar ارسال کنید.

</p>

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

<p dir="rtl">
شما روی‌داد `onChange` را درون `SearchBar` اضافه خواهید کرد و استیت پدر را از آنجا تنظیم می‌کنید.
</p>

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
<p dir="rtl">
حالا اپلیکیشن کار میکند !
</p>

<Sandpack>

<<<<<<< HEAD
```jsx App.js
import {useState} from 'react';
=======
```jsx src/App.js
import { useState } from 'react';
>>>>>>> 315cb7a38a1645623fc55501429285ab680b8a6a

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

برای کسب اطلاعات بیشتر در مورد کنترل روی‌داد‌ها و به روز‌رسانی استیت متوانید به قسمت [افزودن تعاملات](/learn/adding-interactivity) مراجعه کنید.

## Where to go from here {/*where-to-go-from-here*/}

این مقدمه‌ای بسیار کوتاه بود برای آشنایی با نحوه‌ی فکر کردن در مورد ساخت کامپوننت‌ها و برنامه‌ها با ری‌اکت. شما می‌توانید همین حالا یک پروژه‌ی ری‌اکت راه‌اندازی کنید یا به عمق بیشتری درباره‌ی تمام دستورالعمل‌ها (سینتکس) استفاده‌شده در این آموزش بپردازید.

You can [start a React project](/learn/installation) right now or [dive deeper on all the syntax](/learn/describing-the-ui) used in this tutorial.
