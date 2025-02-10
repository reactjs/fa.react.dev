---
title: بروزرسانی اشیا در state
---



<Intro>

State می تواند هر نوع مقدار جاوا اسکریپت، از جمله شی را در خود نگه دارد. اما شما نباید اشیا را که در state نگه می دارید، مستقیماً تغییر دهید. در عوض، وقتی می‌خواهید یک شی را به‌روزرسانی کنید، باید یک شی جدید ایجاد کنید (یا یک کپی از یک شی موجود ایجاد کنید)، و سپس state را برای استفاده از آن کپی، آپدیت کنید.

</Intro>

<YouWillLearn>


- نحوه به روز رسانی صحیح یک شی در state ری اکت
- چگونه یک شی تو در تو را بدون تغییر به روز کنیم
- اصل عدم تغییرپذیری چیست و چگونه آن را نشکنیم
- چگونه با استفاده از Immer عملیات کپی‌برداری از شی را کمتر تکرار کنیم؟


</YouWillLearn>

## تغییر پذیری چیست ؟ {/*whats-a-mutation*/}



شما می توانید هر نوع مقدار جاوا اسکریپت را در state ذخیره کنید.





```js
const [x, setX] = useState(0);
```


تا به حال شما با اعداد، رشته‌ها و مقادیر منطقی (boolean) کار کرده‌اید. این نوع از مقادیر جاوااسکریپت "غیرقابل تغییر" هستند، به این معنی که نمی‌توانید آنها را تغییر دهید یا "فقط خواندنی" هستند. شما می‌توانید با فراخوانی دوباره (re-render) مقدار را جایگزین کنید.



```js
setX(5);
```

State  `x` از `0` به `5` تغییر کرد، اما عدد `0` خود به‌صورت مستقیم تغییر نکرد. امکان تغییر دادن مقادیر ابتدایی (primitive) داخلی مانند اعداد، رشته‌ها و مقادیر منطقی (boolean) در جاوااسکریپت وجود ندارد.

حالا فرض کنید یک شی در state داریم:


```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

از نظر فنی، تغییر محتوای خود شی، امکان‌پذیر است. **به این عملیات تغییرپذیری می‌گوییم.**

```js
position.x = 5;
```


اگرچه اشیا در state از نظر فنی قابل تغییر هستند، اما باید آنها را به عنوان "غیرقابل تغییر" (immutable) در نظر بگیرید، همانند اعداد، مقادیر منطقی و رشته‌ها. به جای انجام تغییرات مستقیم در آنها، همواره باید آنها را جایگزین کنید.


## در نظر گرفتن state به عنوان فقط خواندنی {/*treat-state-as-read-only*/}

به عبارت دیگر، **باید هر شیء جاوااسکریپتی که در state قرار می‌دهید را به عنوان فقط خواندنی (read-only) در نظر بگیرید.**
این مثال یک شیء را در state نگه می‌دارد تا موقعیت فعلی نشانگر را نمایش دهد. نقطه قرمز باید زمانی که شما نشانگر را روی ناحیه پیش‌نمایش قرار می‌دهید یا آن را حرکت می‌دهید، حرکت کند. اما نقطه در موقعیت اولیه خود باقی می‌ماند.


<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>


مشکل در این یک قطعه کد است:


```js
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```


این کد، شیءی که به `position` اختصاص داده شده را از [رندر قبلی](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) تغییر می‌دهد. اما بدون استفاده از تابع تنظیم state  ، ری اکت اطلاعی از تغییر شیء ندارد. بنابراین ری اکت هیچ اقدامی انجام نمی‌دهد. این موضوع مثل تلاش برای تغییر سفارش غذا،‌بعد  از خوردن غذاست. در حالی که تغییر وضعیت به صورت تغییرپذیر در برخی موارد ممکن است کار کند، ما توصیه نمی‌کنیم. باید مقدار وضعیتی که در هر رندر دسترسی دارید را به عنوان فقط خواندنی در نظر بگیرید.
برای [فعالسازی رندر مجدد ](/learn/state-as-a-snapshot#setting-state-triggers-renders) در این مورد، **یک شیء جدید ایجاد کنید و آن را به تابع تنظیم state منتقل کنید:**



```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

با استفاده از `setPosition`، شما به ری اکت می‌گویید:
* `position` را با این شیء جدید جایگزین کن
* و این کامپوننت را دوباره رندر کن

توجه کنید که حالا نقطه قرمز زمانی که شما نشانگر را روی ناحیه پیش‌نمایش قرار می‌دهید یا آن را حرکت می‌دهید، دنبال می‌کند.


<Sandpack>

```js
import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

<DeepDive>

#### تغییر پذیری محلی اشکالی ندارد {/*local-mutation-is-fine*/}


کدهای این چنینی مشکل دارند، زیرا یک شیء **موجود** در state را تغییر می‌دهند:


```js
position.x = e.clientX;
position.y = e.clientY;
```

اما کدی که مشابه این است **کاملاً مناسب** است زیرا شما در حقیقت یک شیء تازه ایجاد شده را تغییر می‌دهید که به تازگی ساخته شده است.


```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

در واقع، این کاملا معادل نوشتن این کد است:


```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

تغییرپذیری تنها زمانی مشکل است که شما *شیء‌های موجودی* که در حال حاضر در state قرار دارند را تغییر می‌دهید. تغییر یک شیءی که به تازگی ایجاد شده است، مشکلی ندارد زیرا *هیچ کد دیگری به آن ارجاعی ندارد.* تغییر آن تأثیر ناخواسته‌ای بر روی چیزی که به آن وابسته است نخواهد داشت. این به عنوان "تغییر محلی" شناخته می‌شود. شما حتی می‌توانید در [حین رندر .](/learn/keeping-components-pure#local-mutation-your-components-little-secret) تغییرات محلی ایجاد کنید. بسیار راحت و به‌طور کامل مناسب است!

</DeepDive>  

## کپی کردن اشیا با استفاده از عملگر spread {/*copying-objects-with-the-spread-syntax*/}


در مثال قبلی، شیء `position` همواره از موقعیت فعلی نشانگر ایجاد می‌شود. اما بسیاری از زمان‌ها، شما ممکن است بخواهید داده‌های *موجود* را به عنوان بخشی از شیء جدیدی که ایجاد می‌کنید، در نظر بگیرید. به عنوان مثال، شما ممکن است بخواهید *فقط یک* فیلد در یک فرم را به‌روز کنید، اما مقادیر قبلی سایر فیلدها را حفظ کنید.
این فیلدهای ورودی کار نمی‌کنند زیرا تابع مدیریت  state, `onchange` را تغییر می‌دهد.

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>


به عنوان مثال، این خط، state را از یک رندر گذشته تغییر می‌دهد:


```js
person.firstName = e.target.value;
```

روش قابل اطمینان برای به دست آوردن رفتاری که به دنبال آن هستید، ایجاد یک شیء جدید و انتقال آن به setPerson است. اما در اینجا، شما همچنین می‌خواهید **داده‌های موجود را به آن کپی کنید** زیرا فقط یکی از فیلدها تغییر کرده است.


```js
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```


شما می‌توانید از `...‍` [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals)  استفاده کنید. بنابراین شما نیازی به کپی جداگانه هر خصوصیت ندارید.



```js
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

اکنون فرم کار می‌کند!
توجه کنید که شما برای هر فیلد ورودی، متغیر state  جداگانه‌ای را تعریف نکردید. برای فرم‌های بزرگ، نگهداشتن تمام داده‌ها در یک شیء به صورت گروهی بسیار مناسب است،  مادامی که آنها را به درستی به‌روزرسانی کنید!

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={person.lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <label>
        Email:
        <input
          value={person.email}
          onChange={handleEmailChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

توجه کنید که نحوه عملکرد نماد `...` به صورت "سطح بالا" است؛ به این معنی که تنها یک سطح از داده‌ها را کپی می‌کند. این باعث می‌شود عملیات کپی بسیار سریع انجام شود، اما در عین حال اگر می‌خواهید یک خصوصیت تو در تو را به‌روزرسانی کنید، باید از آن بیش از یک بار استفاده کنید.


<DeepDive>

#### استفاده از یک کنترل کننده رویداد برای چند فیلد {/*using-a-single-event-handler-for-multiple-fields*/}


همچنین، شما می‌توانید داخل تعریف شیء خود از براکت `[` و `]` استفاده کنید تا یک خصوصیت با نام پویا مشخص کنید. در ادامه مثالی مشابه را می‌بینید، اما با استفاده از یک تابع رویداد تکی به جای سه تابع متفاوت:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

در اینجا، `e.target.name` به خاصیت `name` ارجاع می‌کند که به عنوان مقدار `name` برای`DOM Element`،
`<input>` تعیین شده است.

</DeepDive>

## بروزرسانی یک شیء تو در تو {/*updating-a-nested-object*/}


یک ساختار شیء تو در تو مانند این، در نظر بگیرید:


```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```

اگر میخواستید `person.artwork.city` را به‌روز کنید، روش انجام آن  بسیار واضح است:



```js
person.artwork.city = 'New Delhi';
```


اما در ری اکت شما وضعیت را به عنوان غیرقابل تغییر (immutable) می‌پذیرید! برای تغییر شهر، ابتدا باید شیء جدیدی از `artwork` را تولید کنید (که با داده‌های شیء قبلی پر شده است) و سپس شیء جدیدی از فرد را تولید کنید که به `artwork` جدید اشاره دارد.



```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

یا، به صورت یک تابع تک‌خطی نوشته می‌شود:



```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

این روش کمی طولانی می‌شود، اما برای بسیاری از موارد عالی عمل می‌کند.


<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>

<DeepDive>

#### اشیا در حقیقت تو در تو نیستند {/*objects-are-not-really-nested*/}


یک شیء مانند این در کد به صورت `تو در تو` نمایش داده می‌شود.


```js
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
```

با این حال، `تو در تو` یک رویکرد نادرست برای تفسیر رفتار شیء‌ها است. وقتی کد اجرا می‌شود، مفهوم `شیء تو در تو` وجود ندارد. در واقع، شما دو شیء متفاوت را در نظر دارید.


```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

شیء `obj1` درون شیء `obj2` قرار ندارد. به عنوان مثال، شیء `obj3` می‌تواند به `obj1` نیز `اشاره` کند:



```js
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```


اگر شما `obj3.artwork.city` را به صورت mutate تغییر دهید، این تغییر هم روی `obj2.artwork.city` و هم روی `obj1.city` تأثیر خواهد گذاشت. این به این دلیل است که `obj3.artwork`، `obj2.artwork` و `obj1` یک شیء یکسان هستند. دیدن این موضوع وقتی که به اشیاء به صورت تو در تو فکر می کنید دشوار است. در مقابل ، آنها شیء‌های جداگانه‌ای هستند که با استفاده از خصوصیت‌ها به یکدیگر "اشاره" می‌کنند.

</DeepDive>  

### نوشتن منطق آپدیت مناسب با استفاده از immer {/*write-concise-update-logic-with-immer*/}


اگر state شما به طور عمیق تو در تو شده باشد، ممکن است بخواهید آن را [مسطح کنید](/learn/choosing-the-state-structure#avoid-deeply-nested-state)  . اما اگر نمی‌خواهید ساختار state خود را تغییر دهید، ممکن است ترجیح دهید از یک راهکار میانبر برای مسطح کردن تو در تو استفاده کنید. [Immer](https://github.com/immerjs/use-immer) یک کتابخانه محبوب است که به شما اجازه می‌دهد با استفاده از دستورات متحرک ولی مناسب، کد بنویسید و به تولید کپی‌ها نیز می‌پردازد. با استفاده از Immer، کدی که می‌نویسید مانند این است که "قوانین را نقض می‌کنید" و یک شیء را متحرک می‌کنید:


```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

اما برخلاف یک mutation معمولی، این روش state قبلی را بازنویسی نمی‌کند!

<DeepDive>

#### Immer چگونه کار میکند؟ {/*how-does-immer-work*/}

پیشنویسی که توسط Immer ارائه می‌شود، نوع خاصی از شیء است که به عنوان یک [پروکسی](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)  عمل می‌کند و "ثبت" می‌کند که شما با آن چه کارهایی را انجام داده‌اید. به همین دلیل، شما می‌توانید به راحتی آن را تغییر دهید. در پشت صحنه، Immer متوجه می‌شود کدام بخش‌های `پیشنویس` تغییر کرده‌اند و یک شیء کاملاً جدید را تولید می‌کند که ویرایش‌های شما را در بر می‌گیرد.


</DeepDive>


برای امتحان کردن Immer:
1.  دستور `npm install use-immer` را برای افزودن immer اجرا کنید.
2. سپس `import { useState } from 'react'` را با `import { useImmer } from 'use-immer'` جایگزین کنید.
در زیر، مثال بالا به Immer تبدیل شده است:


<Sandpack>

```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img 
        src={person.artwork.image} 
        alt={person.artwork.title}
      />
    </>
  );
}
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
img { width: 200px; height: 200px; }
```

</Sandpack>


توجه کنید که چقدر مدیریت‌کننده‌های رویداد کوتاه‌تر شده‌اند. شما می‌توانید `useState` و `useImmer` را در یک کامپوننت ترکیب و تطبیق دهید. Immer یک راه عالی برای کوتاه نگه داشتن مدیریت‌کننده‌های آپدیت است، به‌ویژه اگر  state شما تو در تو باشد و کپی کردن شیء‌ها باعث تکرار کد شود.

<DeepDive>

#### چرا تغییر state در ری اکت پیشنهاد نمیشود؟ {/*why-is-mutating-state-not-recommended-in-react*/}


چند دلیل وجود دارد:
• **اشکال‌زدایی**: اگر از `console.log` استفاده کنید و وضعیت را تغییر ندهید، لاگ‌های قبلی شما توسط تغییرات بعدی وضعیت پاک نمی‌شوند. بنابراین، شما می‌توانید به وضوح ببینید که وضعیت در بین رندرها چگونه تغییر کرده است.
• **بهینه‌سازی**: [استراتژی‌های معمول بهینه‌سازی](/reference/react/memo)  ری اکت بر اساس این ایده است که اگر پارامترها یا وضعیت قبلی با پارامترها یا وضعیت بعدی یکسان باشند، می‌توان کار را رد کرد. اگر هرگز وضعیت را تغییر ندهید، بررسی اینکه آیا تغییری رخ داده است یک عملیات بسیار سریع است. اگر `prevObj === obj` باشد، می‌توانید مطمئن باشید که درون آن تغییری رخ نداده است.
• **ویژگی‌های جدید**: ویژگی‌های جدید ری اکت که در حال ساخت هستند، بر این ایده تکیه می‌کنند که وضعیت به عنوان یک "عکس" [snapshot](/learn/state-as-a-snapshot)  تلقی شود. اگر شما نسخه‌های گذشته وضعیت را تغییر دهید، این ممکن است از استفاده از ویژگی‌های جدید مانع شود.
• **تغییر در نیازها**: برخی از ویژگی‌های برنامه مانند اجرای عملیات بازگشت به عقب/عقب‌نویسی (Undo/Redo)، نمایش تاریخچه تغییرات یا اجازه دادن به کاربر برای بازنشانی فرم به مقادیر قبلی، زمانی که هیچ چیز تغییر نکند راحت‌تر انجام می‌شوند. این به این دلیل است که شما می‌توانید نسخه‌های گذشته وضعیت را در حافظه نگه دارید و آن‌ها را در صورت لزوم مجدداً استفاده کنید. اگر با رویکرد تغییردهنده شروع کنید، اضافه کردن این ویژگی‌ها در آینده ممکن است سخت شود.
•  **پیاده‌سازی ساده‌تر**:  زیرا ری اکت به تغییر state  اعتماد نمی‌کند، همچنین هیچ کار خاصی با اشیاء شما نمی‌کند. و همچنین نیازی به تصرف کردن خصوصیت‌های آنها ندارد. همیشه آنها را در پروکسی‌ها بپوشانید یا هر کار دیگری در راه‌اندازی هر تعدادی راه حل reactive انجام دهید . به همین دلیل است که ری اکت به شما اجازه می‌دهد هر شیء را در state  بگذارید - بدون توجه به اندازه آن - بدون وجود خطرات عملکردی یا صحت اضافی.
در عمل، شما اغلب می‌توانید با تغییر وضعیت در ری اکت "بدون مشکل" کار کنید، اما ما به شدت توصیه می‌کنیم که این کار را انجام ندهید تا بتوانید از ویژگی‌های جدید React که با این رویکرد در نظر گرفته شده‌اند، استفاده کنید. مشارکت‌کنندگان آینده و شاید حتی خودتان در آینده از شما سپاسگزار خواهند شد!

</DeepDive>

<Recap>


در ری اکت، تمام state ها را به عنوان غیرقابل تغییر (immutable) در نظر بگیرید.
• وقتی شما شیء‌ها را در state  ذخیره می‌کنید، تغییر آنها منجر به رندر نمی‌شود و وضعیت در "عکس‌های" (snapshots) رندر قبلی تغییر می‌کند.
• به جای تغییر یک شیء، یک نسخه جدید از آن ایجاد کنید و با تنظیم state به آن، رندر را فراخوانی کنید.
• شما می‌توانید از ترکیب شیء `({...obj, something: 'newValue'})` برای ایجاد کپی‌هایی از شیء‌ها استفاده کنید.
• ترکیب شیء فقط یک سطح را کپی می‌کند و تا سطح یکپارچه (shallow) است.
• برای به‌روزرسانی یک شیء تو در تو، شما باید کپی‌ها را از محلی که در آن به روزرسانی انجام می‌دهید، به صورت پی در پی ایجاد کنید.
• برای کاهش کد تکراری کپی‌کردن، از کتابخانه `Immer` استفاده کنید.


</Recap>



<Challenges>

#### تصحیح بروز رسانی اشتباه state {/*fix-incorrect-state-updates*/}


این فرم چند باگ دارد. بر روی دکمه کلیک کنید تا چند بار امتیاز افزایش یابد. توجه کنید که امتیاز افزایش نمی‌یابد. سپس نام اول را ویرایش کنید و توجه کنید که امتیاز به طور ناگهانی "اصلاح" شده است. در نهایت، نام خانوادگی را ویرایش کنید و توجه کنید که امتیاز به طور کامل ناپدید شده است.
وظیفه شما این است که تمام این باگ‌ها را برطرف کنید. در هر مورد که آنها را برطرف می‌کنید، دلیل هر یک از آنها را توضیح دهید.

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 10px; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>

<Solution>

در ادامه، یک نسخه از کد آمده است که در آن هر دو باگ برطرف شده است:

<Sandpack>

```js
import { useState } from 'react';

export default function Scoreboard() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    setPlayer({
      ...player,
      score: player.score + 1,
    });
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      ...player,
      lastName: e.target.value
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
```

```css
label { display: block; }
input { margin-left: 5px; margin-bottom: 5px; }
```

</Sandpack>


مشکل در تابع `handlePlusClick` این بود که شیء `player` را تغییر داد. به عبارت دیگر، ری اکت نمی‌دانست که دلیلی برای رندر مجدد وجود دارد و امتیاز را در صفحه به‌روز نکرد. به همین دلیل، وقتی نام اول را ویرایش کردید، وضعیت بروز شد و باعث رندر مجدد شد که همچنین امتیاز را در صفحه به‌روز کرد.

مشکل در تابع `handleLastNameChange` این بود که فیلدهای موجود در `player` را در شیء جدید کپی نکرد. به همین دلیل، پس از ویرایش نام خانوادگی، امتیاز گم شد.


</Solution>

#### پیدا کردن و تصحیح تغییر پذیری {/*find-and-fix-the-mutation*/}

یک جعبه قابل جابجایی بر روی پس‌زمینه ثابت وجود دارد. با استفاده از ورودی انتخاب رنگ، می‌توانید رنگ جعبه را تغییر دهید.
اما یک باگ وجود دارد. اگر ابتدا جعبه را جابجا کنید و سپس رنگ آن را تغییر دهید، پس‌زمینه (که نباید حرکت کند!) به موقعیت جعبه "پرش" خواهد کرد. اما این نباید رخ دهد: خاصیت `background` `position` به `initialPosition` تنظیم شده است که برابر با `{ x: 0، y: 0 }` است. چرا پس‌زمینه پس از تغییر رنگ حرکت می‌کند؟

باگ را پیدا کرده و آن را اصلاح نمایید.

<Hint>


اگر چیزی به طور غیرمنتظره‌ای تغییر کند، به معنای وجود یک جابه‌جایی (mutation) است. جابجایی را در `App.js` پیدا کنید و آن را اصلاح کنید.


</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

<Solution>

مشکل در تغییر پذیری داخل `handleMove` بود. این تغییر `shape.position` را تغییر داد، اما این همان شیءی است که `initialPosition` به آن اشاره دارد. به همین دلیل هر دو شکل و پس‌زمینه حرکت می‌کنند. (این یک تغییر پذیری است، بنابراین تغییر تا زمانی که یک به‌روزرسانی بی‌ارتباط - تغییر رنگ - باعث اجرای مجدد نشود، در صفحه نمایش نمایان نمی‌شود.)

راه‌حل این است که تغییر پذیری را از `handleMove` حذف کنید و از نحوه انتشار برای کپی کردن شکل استفاده کنید. توجه داشته باشید که `+=` یک تغییر پذیری است، بنابراین باید آن را به یک عملگر `+` معمولی تغییر دهید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x + dx,
        y: shape.position.y + dy,
      }
    });
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

</Sandpack>

</Solution>

#### بروزرسانی یک شیء با استفاده از Immer {/*update-an-object-with-immer*/}

این همان مثال با مشکلی است که در چالش قبلی بود. این بار با استفاده از Immer جهش را تصحیح کنید. برای راحتی شما، `useImmer` از پیش وارد شده است، بنابراین شما باید متغیر وضعیتی `shape` را تغییر دهید تا از آن استفاده کنید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    shape.position.x += dx;
    shape.position.y += dy;
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

<Solution>

این راه‌حل با استفاده از Immer دوباره نوشته شده است. توجه کنید که کنترل‌کننده‌های رویداد به صورت جهشی نوشته شده‌اند، اما خطا رخ نمی‌دهد. این به این دلیل است که در زیرساخت، Immer هیچگاه اشیاء موجود را جهش نمی‌دهد.

<Sandpack>

```js src/App.js
import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
  x: 0,
  y: 0
};

export default function Canvas() {
  const [shape, updateShape] = useImmer({
    color: 'orange',
    position: initialPosition
  });

  function handleMove(dx, dy) {
    updateShape(draft => {
      draft.position.x += dx;
      draft.position.y += dy;
    });
  }

  function handleColorChange(e) {
    updateShape(draft => {
      draft.color = e.target.value;
    });
  }

  return (
    <>
      <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value="orange">orange</option>
        <option value="lightpink">lightpink</option>
        <option value="aliceblue">aliceblue</option>
      </select>
      <Background
        position={initialPosition}
      />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box>
    </>
  );
}
```

```js src/Box.js
import { useState } from 'react';

export default function Box({
  children,
  color,
  position,
  onMove
}) {
  const [
    lastCoordinates,
    setLastCoordinates
  ] = useState(null);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
  }

  function handlePointerMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      const dx = e.clientX - lastCoordinates.x;
      const dy = e.clientY - lastCoordinates.y;
      onMove(dx, dy);
    }
  }

  function handlePointerUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >{children}</div>
  );
}
```

```js src/Background.js
export default function Background({
  position
}) {
  return (
    <div style={{
      position: 'absolute',
      transform: `translate(
        ${position.x}px,
        ${position.y}px
      )`,
      width: 250,
      height: 250,
      backgroundColor: 'rgba(200, 200, 0, 0.2)',
    }} />
  );
};
```

```css
body { height: 280px; }
select { margin-bottom: 10px; }
```

```json package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

</Sandpack>

</Solution>

</Challenges>
