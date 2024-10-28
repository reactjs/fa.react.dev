---
title: رندر‌کردن شرطی
---

<Intro>



کامپوننت‌های شما معمولا بسته به شرایط مختلف نیاز به نمایش چیزهای مختلفی دارند. در ری‌اکت، می‌توانید ‌JSX را با سینتکس جاوااسکریپت با استفاده از دستوراتی مانند `if`،‌ `&&`،‌ و `? :` به صورت شرطی رندر کنید.

</Intro>


<YouWillLearn>

* نحوه برگرداندن JSX های مختلف بسته به یک شرط
* نحوه گنجاندن یا حذف کردن شرطی یک قطعه از JSX
* میانبرهای سینتکسی شرطی رایج که در کد‌های ری‌اکت با آنها مواجه خواهید شد

</YouWillLearn>


## برگرداندن شرطی JSX {/*conditionally-returning-jsx*/}



فرض کنید یک کامپوننت `PackingList` دارید که چندین `Item` را رندر می‌کند، که می‌توان آن‌ها را به‌عنوان بسته‌بندی‌شده یا غیر بسته‌بندی‌شده علامت‌گذاری کرد:

<Sandpack>

```js
function Item({ name, isPacked }) {
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<<<<<<< HEAD
=======
Notice that some of the `Item` components have their `isPacked` prop set to `true` instead of `false`. You want to add a checkmark (✅) to packed items if `isPacked={true}`.
>>>>>>> eb174dd932613fb0784a78ee2d9360554538cc08

توجه داشته باشید که برای برخی از کامپوننت‌های   props ،`isPacked` آن ها به جای true ،false  داده شده است. شما می‌خواهید اگر `isPacked={true}` باشد،  یک علامت (✔) به موارد بسته‌بندی شده اضافه کنید.

می توانید این را به عنوان یک عبارت <span dir="ltr">[`if`/`else` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)</span> بنویسید:


```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```


اگر prop `isPacked`،‌ `true` باشد، این کد **یک درخت JSX متفاوت را برمی‌گرداند.** با این تغییر، برخی از آیتم ها در انتها علامت چک‌مارک می‌گیرند:

<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✅</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


سعی کنید آنچه را که در هر کدام از حالت‌ها بازگردانده می شود ویرایش کنید و ببینید نتیجه چگونه تغییر می کند!

به نحوه ایجاد منطق شاخه‌ای با دستورات `if` و `return` جاوا اسکریپت توجه کنید. در ری‌اکت، control flow (مانند شرایط) توسط جاوا اسکریپت مدیریت می شود.



### برنگرداندن چیزی به صورت شرطی با `null` {/*conditionally-returning-nothing-with-null*/}



در برخی شرایط، اصلاً نمی خواهید چیزی را رندر کنید. مثلاً وقتی اصلاً نمی‌خواهید موارد بسته‌بندی شده را نشان دهید. یک کامپوننت باید چیزی را برگرداند. در این مورد، می توانید `null` را برگردانید:


```js
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```


اگر ‌true ،`isPacked`  باشد، کامپوننت چیزی را بر نمی‌گرداند، `null`. در غیر این صورت، JSX را برای رندر برمی گرداند.


<Sandpack>

```js
function Item({ name, isPacked }) {
  if (isPacked) {
    return null;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


در عمل، برگرداندن `null` از یک کامپوننت رایج نیست، زیرا ممکن است توسعه‌دهنده‌ای را که تلاش می‌کند آن را رندر کند، سورپرایز کند. بیشتر اوقات، شما به صورت شرطی کامپوننت را در JSX کامپوننت پدر قرار می دهید یا حذف می کنید. در اینجا نحوه انجام این کار آمده است!



## شامل‌شدن ‌JSX به صورت شرطی {/*conditionally-including-jsx*/}

در مثال قبلی، شما کنترل کردید که کدام درخت JSX (در صورت وجود!) توسط کامپوننت بازگردانده شود. ممکن است قبلاً متوجه مقداری تکرار در خروجی رندر شده باشید:

```js
<li className="item">{name} ✅</li>
```



بسیار مشابه است با


```js
<li className="item">{name}</li>
```


هر دو شاخه شرطی `<li className="item">...</li>` را برمی‌گردانند:


```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```



اگرچه این تکرار مضر نیست، اما می‌تواند نگهداری کد شما را سخت‌تر کند. اگر بخواهید `className` را تغییر دهید چه؟ شما باید این کار را در دو جا از کد خود انجام دهید! در چنین شرایطی، می‌توانید به صورت شرطی، کمی JSX اضافه کنید تا کدتان بیشتر [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) شود. 



### عملگر شرطی (سه تایی) (`? :`) {/*conditional-ternary-operator--*/}



جاوا اسکریپت یک سینتکس فشرده برای نوشتن یک عبارت شرطی دارد -- [عملگر شرطی](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) یا "عملگر سه تایی".

به جای این:


```js
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```


می توانید این را بنویسید:


```js
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

<<<<<<< HEAD


شما می توانید آن را به صورت *"اگر `isPacked` درست است، سپس  (`?`) `name + ' ✔'` را رندر کنید، در غیر این صورت (`:`) `name` را اجرا کنید "*  بخوانید.

=======
You can read it as *"if `isPacked` is true, then (`?`) render `name + ' ✅'`, otherwise (`:`) render `name`"*.
>>>>>>> eb174dd932613fb0784a78ee2d9360554538cc08

<DeepDive>

#### آیا این دو مثال کاملاً معادل هستند؟ {/*are-these-two-examples-fully-equivalent*/}



اگر از یک پس‌زمینه برنامه‌نویسی شی‌گرا می‌آیید، ممکن است فرض کنید که دو مثال بالا به طور ظاهری متفاوت هستند، زیرا یکی از آنها ممکن است دو "نمونه" متفاوت از `<li>` ایجاد کند. اما المنت‌های JSX "نمونه" نیستند زیرا هیچ حالت داخلی ندارند و نودهای  واقعی DOM نیستند. آنها توصیف های سبک وزن هستند، مانند blueprintها. بنابراین، این دو مثال، در واقع کاملاً معادل *هستند*. [نگهداری و بازنشانی وضعیت](/learn/preserving-and-resetting-state) به تفصیل درباره اینکه چگونه این، کار می‌کند توضیح می‌دهد.


</DeepDive>



حال فرض کنید می‌خواهید متن مورد تکمیل‌شده را در یک تگ HTML دیگری مانند `<del>` بپیچید تا روی آن خط بکشید. می‌توانید حتی خطوط جدید و پرانتز بیشتری اضافه کنید تا در هر یک از موارد، JSX بیشتری را راحت‌تر جاسازی کنید.


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {isPacked ? (
        <del>
          {name + ' ✅'}
        </del>
      ) : (
        name
      )}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


این سبک برای شرایط ساده به خوبی کار می کند، اما از آن در حد اعتدال استفاده کنید. اگر کامپوننت‌های شما با نشانه‌گذاری‌های شرطی بیش از حد تودرتو، آشفته می‌شوند، برای تمیز کردن این موارد، کامپوننت فرزند را جدا کنید. در ری‌اکت، نشانه گذاری بخشی از کد شما است، بنابراین می توانید از ابزارهایی مانند متغیرها و توابع برای مرتب کردن عبارات پیچیده استفاده کنید.



### عملگر منطقی AND (`&&`) {/*logical-and-operator-*/}



یکی دیگر از میانبرهای رایجی که با آن مواجه خواهید شد، [عملگر منطقی AND (`&&`) جاوا اسکریپت است.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.) در داخل کامپوننت های ری‌اکت، اغلب زمانی می‌آید که می خواهید مقداری JSX را وقتی شرطی درست است، رندر کنید، **یا هیچ چیزی را رندر نکنید.** با `&&`، فقط در صورتی می توانید علامت را به صورت شرطی ارائه دهید که  `true` ،`isPacked` باشد:


```js
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);
```


می توانید این را به صورت *"اگر `isPacked`، آنگاه (`&&`) علامت چک‌مارک را ارائه دهید، در غیر این صورت، هیچ چیزی را رندر نکنید"*، بخوانید.

اینجا در عمل داریم:


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


یک [عبارت && جاوااسکریپت](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) اگر سمت چپ (شرط ما) `true` است، مقدار سمت راست خود (در مورد ما، علامت چکمارک) را برمی گرداند. اما اگر شرط `false` باشد، کل عبارت `false` می شود. ری‌اکت `false` را به عنوان "سوراخ" در درخت JSX، درست مانند `null` یا `undefined` در نظر می‌گیرد و هیچ چیزی را در جای آن ارائه نمی‌کند.


<Pitfall>


**اعداد را در سمت چپ `&&` قرار ندهید.**

برای آزمایش‌کردن شرط، جاوا اسکریپت سمت چپ را به صورت خودکار به یک boolean تبدیل می کند. با این حال، اگر سمت چپ `0` باشد، کل عبارت مقدار (`0`) را می‌گیرد، و ری‌اکت با خوشحالی `0` را به جای هیچ رندر می کند. 

به عنوان مثال، یک اشتباه رایج نوشتن کدی مانند ‍‍‍‍‍‍`messageCount && <p>New messages</p>` است. به راحتی می توان فرض کرد که وقتی `messageCount` برابر با `0` است، چیزی رندر نمی کند، اما درواقع خود `0` را رندر می کند!

برای رفع آن، سمت چپ را به صورت boolean درآورید: `messageCount > 0 && <p>New messages</p>`.

</Pitfall>


### انتساب (assign) شرطی JSX به یک متغیر {/*conditionally-assigning-jsx-to-a-variable*/}

وقتی میانبرها مانع نوشتن کد ساده می شوند، سعی کنید از عبارت `if` و یک متغیر استفاده کنید. می توانید متغیرهای تعریف شده با [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) را مجدداً assign کنید، بنابراین با رندرکردن محتوای پیش فرضی که می خواهید نمایش دهید شروع کنید، نام:


```js
let itemContent = name;
```


از عبارت `if` برای تخصیص (assign) مجدد عبارت JSX به `itemContent` استفاده کنید، اگر `true` ،`isPacked` باشد:


```js
if (isPacked) {
  itemContent = name + " ✅";
}
```


[آکولادها "پنجره‌ای به جاوا اسکریپت"  باز می کنند.](/learn/javascript-in-jsx-with-curly-braces#using-curly-braces-a-window-into-the-javascript-world) متغیر را با آکولاد در درخت JSX بازگشتی قرار دهید،‌ قرار دادن عبارت محاسبه شده قبلی در JSX: 


```js
<li className="item">
  {itemContent}
</li>
```


این سبک طولانی‌ترین است، اما انعطاف پذیرترین هم می‌باشد. اینجا در عمل داریم:


<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✅";
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


مانند قبل، این نه تنها برای متن، بلکه برای JSX دلخواه نیز کار می کند:


<Sandpack>

```js
function Item({ name, isPacked }) {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del>
        {name + " ✅"}
      </del>
    );
  }
  return (
    <li className="item">
      {itemContent}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>


اگر با جاوا اسکریپت آشنایی ندارید، این تنوع سبک در ابتدا ممکن است طاقت‌فرسا به نظر برسد. با این حال، یادگیری آنها به شما کمک می کند تا هر کد جاوا اسکریپت را بخوانید و بنویسید -- و نه فقط کامپوننت‌‌های ری‌اکت را! یکی را که برای شروع ترجیح می دهید انتخاب کنید و اگر فراموش کردید که بقیه چگونه کار می کنند، دوباره با این مرجع مشورت کنید.

<Recap>


* در ری‌اکت، منطق شاخه‌بندی را با جاوا اسکریپت کنترل می‌کنید.
* می توانید یک عبارت JSX را به صورت شرطی با عبارت `if` برگردانید.
* می توانید به صورت شرطی JSX را در یک متغیر ذخیره کنید و سپس با استفاده از آکولاد آن را در داخل JSX دیگری قرار دهید.
* در JSX، عبارت  `{cond ? <A /> : <B />}` به معنای *"اگر `cond` ، آنگاه `<A />` را رندر کنید، در غیر این صورت `<B />` را"* است.
* در JSX، عبارت  `{cond && <A />}` به معنای *"اگر `cond` ، آنگاه `<A />` را رندر کنید، در غیر این صورت هیچی"* است.
* میانبرها رایج هستند، اما اگر `if`  ساده را ترجیح می دهید، نیازی به استفاده از آنها ندارید.


</Recap>

<Challenges>


#### نمادی برای مواردی که کامل‌نشده با `? :` نشان بده {/*show-an-icon-for-incomplete-items-with--*/}



اگر `true` ،`isPacked` نباشد،‌ از عملگر شرطی (`cond ? a : b`) برای رندر‌کردن ❌ استفاده کن.


<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>

<Sandpack>

```js
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

</Solution>

#### اهمیت مورد را با `&&` نشان بده {/*show-the-item-importance-with-*/}



در این مثال، هر `Item` یک `importance` عددی دریافت می‌کند. از عملگر `&&` برای نمایش "_(Importance: X)_" به صورت italics استفاده کنید، اما فقط برای مواردی که اهمیت غیر صفر دارند. لیست اقلام شما باید به این شکل باشد:

* Space suit _(Importance: 9)_
* Helmet with a golden leaf
* Photo of Tam _(Importance: 6)_

فراموش نکنید که بین دو label فاصله (space) اضافه کنید!


<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>

<Solution>



این باید کارساز باشد:


<Sandpack>

```js
function Item({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 &&
        <i>(Importance: {importance})</i>
      }
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          importance={9} 
          name="Space suit" 
        />
        <Item 
          importance={0} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          importance={6} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

</Sandpack>



توجه داشته باشید که باید به جای `importance && ...` بنویسید `importance > 0 && ...` تا اگر `importance` برابر با `0` باشد، `0` به عنوان نتیجه رندر نشود!

در این راه حل، از دو شرط مجزا برای درج فاصله بین نام و label اهمیت استفاده می شود. همچنین، می‌توانید از یک fragment با یک فاصله در ابتدا استفاده کنید: `importance > 0 && <> <i>...</i></>` یا بلافاصله یک فاصله در داخل `<i>` اضافه کنید: `importance > 0 && <i> ...</i>`.



</Solution>

#### ری‌فکتور یک سری از `? :` به `if` و متغیر‌ها {/*refactor-a-series-of---to-if-and-variables*/}



این کامپوننت `Drink` از یک سری شرط‌های `? :` برای نشان دادن اطلاعات مختلف بسته به اینکه prop `name` برابر با `"tea"` باشد یا  `"coffee"` ،‌ استفاده می‌کند. مشکل این است که اطلاعات مربوط به هر نوشیدنی در شرط‌های مختلف پخش می شود. این کد را برای استفاده از یک عبارت `if` به جای سه شرط‌ `? :` ری‌فکتور کنید 


<Sandpack>

```js
function Drink({ name }) {
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{name === 'tea' ? 'leaf' : 'bean'}</dd>
        <dt>Caffeine content</dt>
        <dd>{name === 'tea' ? '15–70 mg/cup' : '80–185 mg/cup'}</dd>
        <dt>Age</dt>
        <dd>{name === 'tea' ? '4,000+ years' : '1,000+ years'}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
  
  );
}
```

</Sandpack>


هنگامی که کد را برای استفاده از `if` ری‌فکتور کردید، آیا ایده‌های بیشتری در مورد چگونگی ساده سازی آن دارید؟


<Solution>



راه‌های مختلفی وجود دارد که می‌توانید برای این کار بروید، اما در اینجا یک نقطه شروع وجود دارد:


<Sandpack>

```js
function Drink({ name }) {
  let part, caffeine, age;
  if (name === 'tea') {
    part = 'leaf';
    caffeine = '15–70 mg/cup';
    age = '4,000+ years';
  } else if (name === 'coffee') {
    part = 'bean';
    caffeine = '80–185 mg/cup';
    age = '1,000+ years';
  }
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{part}</dd>
        <dt>Caffeine content</dt>
        <dd>{caffeine}</dd>
        <dt>Age</dt>
        <dd>{age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
  
  );
}
```

</Sandpack>



در اینجا اطلاعات مربوط به هر نوشیدنی به جای پخش شدن در شرط‌های مختلف، با هم گروه بندی می شوند. این کار اضافه کردن نوشیدنی های بیشتر را در آینده آسان می کند.

راه حل دیگر حذف کامل شرط‌ها با انتقال اطلاعات به  objectها است:


<Sandpack>

```js
const drinks = {
  tea: {
    part: 'leaf',
    caffeine: '15–70 mg/cup',
    age: '4,000+ years'
  },
  coffee: {
    part: 'bean',
    caffeine: '80–185 mg/cup',
    age: '1,000+ years'
  }
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>Part of plant</dt>
        <dd>{info.part}</dd>
        <dt>Caffeine content</dt>
        <dd>{info.caffeine}</dd>
        <dt>Age</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export default function DrinkList() {
  return (
    <div>
      <Drink name="tea" />
      <Drink name="coffee" />
  
  );
}
```

</Sandpack>

</Solution>

</Challenges>
