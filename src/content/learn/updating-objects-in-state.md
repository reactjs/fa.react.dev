---
title: به‌روزرسانی اشیاء در استیت
---

<Intro>

استیت می‌تواند هر نوع مقدار جاوااسکریپتی را در خود نگه دارد، از جمله اشیاء. اما شما نباید اشیایی که در استیت ری‌اکت نگه می‌دارید را مستقیماً تغییر دهید. در عوض، وقتی می‌خواهید یک شیء را به‌روزرسانی کنید، باید یک شیء جدید ایجاد کنید (یا از یک شیء موجود کپی بگیرید) و سپس استیت را طوری تنظیم کنید که از آن کپی استفاده کند.

</Intro>

<YouWillLearn>

- چگونه یک شیء را به‌درستی در استیت ری‌اکت به‌روزرسانی کنیم
- چگونه یک شیء تودرتو را بدون تغییر دادن (mutate) آن به‌روزرسانی کنیم
- تغییرناپذیری (immutability) چیست و چگونه آن را نقض نکنیم
- چگونه کپی کردن اشیاء را با Immer کمتر تکراری کنیم

</YouWillLearn>

## جهش (mutation) چیست؟ {/*whats-a-mutation*/}

شما می‌توانید هر نوع مقدار جاوااسکریپتی را در استیت ذخیره کنید.

```js
const [x, setX] = useState(0);
```

تا اینجا شما با اعداد، رشته‌ها و بولین‌ها کار کرده‌اید. این نوع مقادیر جاوااسکریپتی «تغییرناپذیر» (immutable) هستند، یعنی غیرقابل‌تغییر یا «فقط‌خواندنی». شما می‌توانید با ایجاد یک رندر مجدد، یک مقدار را _جایگزین_ کنید:

```js
setX(5);
```

استیت `x` از `0` به `5` تغییر کرد، اما _خود عدد `0`_ تغییر نکرد. ایجاد هیچ تغییری در مقادیر اولیهٔ داخلی مانند اعداد، رشته‌ها و بولین‌ها در جاوااسکریپت امکان‌پذیر نیست.

حالا یک شیء را در استیت در نظر بگیرید:

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

از نظر فنی، تغییر محتوای _خود شیء_ امکان‌پذیر است. **به این کار جهش (mutation) می‌گویند:**

```js
position.x = 5;
```

با این حال، اگرچه اشیاء در استیت ری‌اکت از نظر فنی قابل‌تغییر هستند، شما باید با آن‌ها **طوری رفتار کنید که** انگار تغییرناپذیر هستند—مانند اعداد، بولین‌ها و رشته‌ها. به‌جای تغییر دادن آن‌ها، باید همیشه آن‌ها را جایگزین کنید.

## با استیت مانند یک مقدار فقط‌خواندنی رفتار کنید {/*treat-state-as-read-only*/}

به عبارت دیگر، شما باید **با هر شیء جاوااسکریپتی که در استیت قرار می‌دهید مانند یک مقدار فقط‌خواندنی رفتار کنید.**

این مثال یک شیء را در استیت نگه می‌دارد تا موقعیت فعلی نشانگر را نمایش دهد. نقطهٔ قرمز باید وقتی نشانگر یا انگشت خود را روی ناحیهٔ پیش‌نمایش حرکت می‌دهید، جابجا شود. اما نقطه در موقعیت اولیه باقی می‌ماند:

<Sandpack>

```js {expectedErrors: {'react-compiler': [11]}}
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

مشکل در این بخش از کد است.

```js
onPointerMove={e => {
  position.x = e.clientX;
  position.y = e.clientY;
}}
```

این کد شیءای که به `position` اختصاص داده شده را از [رندر قبلی](/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time) تغییر می‌دهد. اما بدون استفاده از تابع تنظیم‌کنندهٔ استیت، ری‌اکت متوجه نمی‌شود که شیء تغییر کرده است. در نتیجه ری‌اکت هیچ کاری در پاسخ انجام نمی‌دهد. این مانند این است که بخواهید بعد از خوردن غذا سفارش را تغییر دهید. هرچند تغییر استیت در برخی موارد می‌تواند کار کند، ما آن را توصیه نمی‌کنیم. شما باید با مقدار استیتی که در یک رندر به آن دسترسی دارید مانند یک مقدار فقط‌خواندنی رفتار کنید.

برای اینکه واقعاً در این مورد [یک رندر مجدد را تحریک کنید](/learn/state-as-a-snapshot#setting-state-triggers-renders)، **یک شیء *جدید* ایجاد کنید و آن را به تابع تنظیم‌کنندهٔ استیت ارسال کنید:**

```js
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

با `setPosition`، شما به ری‌اکت می‌گویید:

* `position` را با این شیء جدید جایگزین کن
* و این کامپوننت را دوباره رندر کن

توجه کنید که حالا نقطهٔ قرمز چگونه هنگام لمس یا حرکت دادن نشانگر روی ناحیهٔ پیش‌نمایش، آن را دنبال می‌کند:

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

#### جهش محلی اشکالی ندارد {/*local-mutation-is-fine*/}

کدی مثل این مشکل دارد زیرا یک شیء *موجود* در استیت را تغییر می‌دهد:

```js
position.x = e.clientX;
position.y = e.clientY;
```

اما کدی مثل این **کاملاً درست است** زیرا شما در حال تغییر یک شیء تازه‌ای هستید که *به‌تازگی* ایجاد کرده‌اید:

```js
const nextPosition = {};
nextPosition.x = e.clientX;
nextPosition.y = e.clientY;
setPosition(nextPosition);
```

در واقع، این کد کاملاً معادل نوشتن این است:

```js
setPosition({
  x: e.clientX,
  y: e.clientY
});
```

جهش تنها زمانی مشکل است که اشیاء *موجودی* را که از قبل در استیت هستند تغییر می‌دهید. تغییر یک شیءای که به‌تازگی ایجاد کرده‌اید اشکالی ندارد زیرا *هنوز هیچ کد دیگری به آن ارجاع نداده است.* تغییر دادن آن به‌طور تصادفی روی چیزی که به آن وابسته است تأثیر نمی‌گذارد. به این کار «جهش محلی» (local mutation) می‌گویند. شما حتی می‌توانید جهش محلی را [هنگام رندر کردن](/learn/keeping-components-pure#local-mutation-your-components-little-secret) هم انجام دهید. بسیار راحت و کاملاً درست است!

</DeepDive>  

## کپی کردن اشیاء با سینتکس spread {/*copying-objects-with-the-spread-syntax*/}

در مثال قبل، شیء `position` همیشه از موقعیت فعلی نشانگر به‌طور تازه ایجاد می‌شد. اما اغلب اوقات، شما می‌خواهید *داده‌های موجود* را به‌عنوان بخشی از شیء جدیدی که ایجاد می‌کنید، لحاظ کنید. مثلاً ممکن است بخواهید *فقط یک* فیلد را در یک فرم به‌روزرسانی کنید، اما مقادیر قبلی را برای همهٔ فیلدهای دیگر نگه دارید.

این فیلدهای ورودی کار نمی‌کنند زیرا هندلرهای `onChange` استیت را تغییر می‌دهند:

<Sandpack>

```js {expectedErrors: {'react-compiler': [11, 15, 19]}}
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

مثلاً این خط، استیت مربوط به یک رندر گذشته را تغییر می‌دهد:

```js
person.firstName = e.target.value;
```

راه مطمئن برای رسیدن به رفتاری که می‌خواهید این است که یک شیء جدید ایجاد کنید و آن را به `setPerson` ارسال کنید. اما در اینجا، شما می‌خواهید **داده‌های موجود را هم در آن کپی کنید** زیرا فقط یکی از فیلدها تغییر کرده است:

```js
setPerson({
  firstName: e.target.value, // New first name from the input
  lastName: person.lastName,
  email: person.email
});
```

می‌توانید از سینتکس [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) با `...` استفاده کنید تا نیازی به کپی کردن تک‌تک ویژگی‌ها نباشد.

```js
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

حالا فرم کار می‌کند! 

توجه کنید که برای هر فیلد ورودی یک متغیر استیت جداگانه تعریف نکردید. برای فرم‌های بزرگ، نگه‌داشتن همهٔ داده‌ها در یک شیء گروه‌بندی‌شده بسیار راحت است—به‌شرطی که به‌درستی آن را به‌روزرسانی کنید!

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

توجه کنید که سینتکس spread با `...` «سطحی» است—یعنی فقط تا یک سطح عمق کپی می‌کند. این ویژگی آن را سریع می‌کند، اما به این معناست که اگر بخواهید یک ویژگی تودرتو را به‌روزرسانی کنید، باید بیش از یک بار از آن استفاده کنید. 

<DeepDive>

#### استفاده از یک هندلر رویداد برای چندین فیلد {/*using-a-single-event-handler-for-multiple-fields*/}

شما همچنین می‌توانید از آکولادهای `[` و `]` درون تعریف شیء خود برای تعیین یک ویژگی با نام پویا استفاده کنید. در اینجا همان مثال قبل آمده است، اما با یک هندلر رویداد واحد به‌جای سه هندلر متفاوت:

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

اینجا، `e.target.name` به ویژگی `name` ارجاع می‌دهد که به عنصر DOM `<input>` داده شده است.

</DeepDive>

## به‌روزرسانی یک شیء تودرتو {/*updating-a-nested-object*/}

یک ساختار شیء تودرتو مانند این را در نظر بگیرید:

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

اگر می‌خواستید `person.artwork.city` را به‌روزرسانی کنید، روش انجام آن با جهش واضح است:

```js
person.artwork.city = 'New Delhi';
```

اما در ری‌اکت، شما با استیت مانند یک مقدار تغییرناپذیر رفتار می‌کنید! برای تغییر `city`، ابتدا باید شیء `artwork` جدیدی تولید کنید (با داده‌های پرشده از شیء قبلی) و سپس شیء `person` جدیدی تولید کنید که به `artwork` جدید اشاره می‌کند:

```js
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

یا، به‌صورت یک فراخوانی تابع واحد نوشته شود:

```js
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```

این کمی طولانی می‌شود، اما برای بسیاری از موارد به‌خوبی کار می‌کند:

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

#### اشیاء در واقع تودرتو نیستند {/*objects-are-not-really-nested*/}

یک شیء مثل این در کد «تودرتو» به نظر می‌رسد:

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

با این حال، «تودرتویی» روش دقیقی برای فکر کردن دربارهٔ رفتار اشیاء نیست. وقتی کد اجرا می‌شود، چیزی به‌نام شیء «تودرتو» وجود ندارد. شما در واقع به دو شیء متفاوت نگاه می‌کنید:

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

شیء `obj1` «داخل» `obj2` نیست. مثلاً `obj3` هم می‌تواند به `obj1` «اشاره» کند:

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

اگر `obj3.artwork.city` را تغییر دهید، هم بر `obj2.artwork.city` و هم بر `obj1.city` تأثیر می‌گذارد. این به این دلیل است که `obj3.artwork`، `obj2.artwork` و `obj1` در واقع یک شیء واحد هستند. این موضوع زمانی که اشیاء را «تودرتو» تصور می‌کنید، دشوار دیده می‌شود. در واقع، اشیاء جداگانه‌ای هستند که با ویژگی‌هایشان به یکدیگر «اشاره» می‌کنند.

</DeepDive>  

### نوشتن منطق به‌روزرسانی موجز با Immer {/*write-concise-update-logic-with-immer*/}

اگر استیت شما عمیقاً تودرتو است، ممکن است بخواهید [آن را مسطح کنید.](/learn/choosing-the-state-structure#avoid-deeply-nested-state) اما اگر نمی‌خواهید ساختار استیت خود را تغییر دهید، ممکن است یک میان‌بر برای spreadهای تودرتو را ترجیح دهید. [Immer](https://github.com/immerjs/use-immer) یک کتابخانهٔ محبوب است که به شما اجازه می‌دهد با سینتکس راحت اما تغییردهنده بنویسید و کار تولید کپی‌ها را به‌عنوان مسئولیت می‌پذیرد. با Immer، کدی که می‌نویسید طوری به نظر می‌رسد که انگار در حال «نقض قوانین» و تغییر یک شیء هستید:

```js
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```

اما برخلاف یک جهش معمولی، استیت گذشته را بازنویسی نمی‌کند!

<DeepDive>

#### Immer چگونه کار می‌کند؟ {/*how-does-immer-work*/}

`draft`ای که Immer ارائه می‌دهد نوع ویژه‌ای از شیء است که [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) نامیده می‌شود و «ثبت می‌کند» که شما با آن چه می‌کنید. به همین دلیل می‌توانید آن را هر طور که دوست دارید آزادانه تغییر دهید! در پس‌زمینه، Immer تشخیص می‌دهد کدام بخش‌های `draft` تغییر کرده‌اند و یک شیء کاملاً جدید تولید می‌کند که ویرایش‌های شما را در بر دارد.

</DeepDive>

برای امتحان Immer:

1. `npm install use-immer` را اجرا کنید تا Immer به‌عنوان یک وابستگی اضافه شود
2. سپس `import { useState } from 'react'` را با `import { useImmer } from 'use-immer'` جایگزین کنید

در اینجا مثال بالا با Immer تبدیل شده است:

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

توجه کنید که هندلرهای رویداد چقدر موجزتر شده‌اند. شما می‌توانید به هر مقدار که بخواهید از `useState` و `useImmer` در یک کامپوننت واحد استفاده کنید. Immer یک راه عالی برای موجز نگه‌داشتن هندلرهای به‌روزرسانی است، به‌ویژه اگر در استیت شما تودرتویی وجود داشته باشد و کپی کردن اشیاء به کد تکراری منجر شود.

<DeepDive>

#### چرا تغییر دادن استیت در ری‌اکت توصیه نمی‌شود؟ {/*why-is-mutating-state-not-recommended-in-react*/}

چند دلیل وجود دارد:

* **دیباگ:** اگر از `console.log` استفاده می‌کنید و استیت را تغییر نمی‌دهید، لاگ‌های گذشته با تغییرات اخیر استیت بازنویسی نمی‌شوند. بنابراین می‌توانید به‌وضوح ببینید که استیت بین رندرها چگونه تغییر کرده است.
* **بهینه‌سازی:** [استراتژی‌های](/reference/react/memo) بهینه‌سازی رایج در ری‌اکت بر اساس نادیده‌گرفتن کار در صورتی که پراپس یا استیت قبلی با مقادیر بعدی یکسان باشد، کار می‌کنند. اگر هرگز استیت را تغییر ندهید، بررسی اینکه آیا تغییری رخ داده است بسیار سریع است. اگر `prevObj === obj` باشد، می‌توانید مطمئن باشید که هیچ‌چیز درون آن نمی‌توانسته تغییر کند.
* **قابلیت‌های جدید:** قابلیت‌های جدید ری‌اکت که در حال ساخت آن‌ها هستیم بر این اساس که استیت [مانند یک عکس فوری رفتار شود](/learn/state-as-a-snapshot) تکیه می‌کنند. اگر نسخه‌های گذشتهٔ استیت را تغییر می‌دهید، ممکن است استفاده از قابلیت‌های جدید برای شما ممکن نباشد.
* **تغییرات نیازمندی‌ها:** برخی قابلیت‌های برنامه مانند پیاده‌سازی Undo/Redo، نمایش تاریخچهٔ تغییرات، یا اجازه دادن به کاربر برای بازنشانی یک فرم به مقادیر قبلی، زمانی که هیچ‌چیز تغییر نمی‌کند آسان‌تر انجام می‌شوند. این به این دلیل است که می‌توانید کپی‌های گذشتهٔ استیت را در حافظه نگه دارید و در صورت لزوم دوباره از آن‌ها استفاده کنید. اگر با رویکرد تغییردهنده شروع کنید، افزودن قابلیت‌هایی مانند این در آینده می‌تواند دشوار باشد.
* **پیاده‌سازی ساده‌تر:** از آنجا که ری‌اکت به جهش تکیه نمی‌کند، نیازی به انجام کار خاصی با اشیاء شما ندارد. نیازی نیست ویژگی‌های آن‌ها را هک کند، همیشه آن‌ها را در Proxy بپیچد، یا در زمان مقداردهی اولیه کار دیگری انجام دهد، همان‌طور که بسیاری از راه‌حل‌های «واکنشی» (reactive) این کار را می‌کنند. به همین دلیل است که ری‌اکت به شما اجازه می‌دهد هر شیءای را—بدون توجه به اندازهٔ آن—در استیت قرار دهید، بدون افت عملکرد یا درستی.

در عمل، شما اغلب می‌توانید با تغییر استیت در ری‌اکت «بدون عواقب دست‌وبپا کنید»، اما ما اکیداً توصیه می‌کنیم این کار را نکنید تا بتوانید از قابلیت‌های جدید ری‌اکت که با این رویکرد در نظر گرفته شده‌اند استفاده کنید. مشارکت‌کنندگان آینده و شاید حتی خودِ آیندهٔ شما از شما قدردانی خواهند کرد!

</DeepDive>

<Recap>

* با تمام استیت در ری‌اکت مانند یک مقدار تغییرناپذیر رفتار کنید.
* وقتی اشیاء را در استیت ذخیره می‌کنید، تغییر دادن آن‌ها رندرها را تحریک نمی‌کند و استیت را در «عکس‌های فوری» رندرهای قبلی تغییر می‌دهد.
* به‌جای تغییر یک شیء، یک نسخه *جدید* از آن ایجاد کنید و با تنظیم استیت به آن، یک رندر مجدد تحریک کنید.
* می‌توانید از سینتکس object spread با `{...obj, something: 'newValue'}` برای ایجاد کپی از اشیاء استفاده کنید.
* سینتکس spread سطحی است: فقط تا یک سطح عمق کپی می‌کند.
* برای به‌روزرسانی یک شیء تودرتو، باید از محلی که در حال به‌روزرسانی آن هستید تا بالا، کپی ایجاد کنید.
* برای کاهش کد تکراری کپی کردن، از Immer استفاده کنید.

</Recap>



<Challenges>

#### رفع به‌روزرسانی‌های نادرست استیت {/*fix-incorrect-state-updates*/}

این فرم چند باگ دارد. چند بار روی دکمه‌ای که امتیاز را افزایش می‌دهد کلیک کنید. توجه کنید که افزایش نمی‌یابد. سپس نام کوچک را ویرایش کنید و توجه کنید که امتیاز ناگهان با تغییرات شما «جای گرفته است». در نهایت، نام خانوادگی را ویرایش کنید و توجه کنید که امتیاز کاملاً ناپدید شده است.

وظیفهٔ شما رفع همهٔ این باگ‌هاست. هنگام رفع آن‌ها، توضیح دهید که چرا هر کدام رخ می‌دهند.

<Sandpack>

```js {expectedErrors: {'react-compiler': [11]}}
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

در اینجا نسخه‌ای با رفع هر دو باگ آورده شده است:

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

مشکل `handlePlusClick` این بود که شیء `player` را تغییر می‌داد. در نتیجه، ری‌اکت متوجه نشد که دلیلی برای رندر مجدد وجود دارد و امتیاز را روی صفحه به‌روزرسانی نکرد. به همین دلیل است که وقتی نام کوچک را ویرایش کردید، استیت به‌روزرسانی شد و یک رندر مجدد تحریک کرد که _همچنین_ امتیاز را روی صفحه به‌روزرسانی کرد.

مشکل `handleLastNameChange` این بود که فیلدهای `...player` موجود را در شیء جدید کپی نمی‌کرد. به همین دلیل امتیاز پس از ویرایش نام خانوادگی از دست رفت.

</Solution>

#### یافتن و رفع جهش {/*find-and-fix-the-mutation*/}

یک جعبهٔ قابل‌کشیدن روی یک پس‌زمینهٔ ثابت وجود دارد. می‌توانید با استفاده از ورودی انتخاب، رنگ جعبه را تغییر دهید.

اما یک باگ وجود دارد. اگر ابتدا جعبه را جابجا کنید و سپس رنگ آن را تغییر دهید، پس‌زمینه (که نباید حرکت کند!) به موقعیت جعبه «می‌پرد». اما این نباید رخ دهد: پراپس `position` کامپوننت `Background` روی `initialPosition` تنظیم شده است، یعنی `{ x: 0, y: 0 }`. چرا پس‌زمینه پس از تغییر رنگ حرکت می‌کند؟

باگ را پیدا کرده و رفع کنید.

<Hint>

اگر چیزی به‌طور غیرمنتظره‌ای تغییر می‌کند، یک جهش رخ داده است. جهش را در `App.js` پیدا کرده و آن را رفع کنید.

</Hint>

<Sandpack>

```js {expectedErrors: {'react-compiler': [17]}} src/App.js
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

مشکل در جهش داخل `handleMove` بود. این تابع `shape.position` را تغییر می‌داد، اما این همان شیءای است که `initialPosition` به آن اشاره می‌کند. به همین دلیل هم شکل و هم پس‌زمینه حرکت می‌کنند. (این یک جهش است، بنابراین تغییر تا زمانی که یک به‌روزرسانی نامرتبط—یعنی تغییر رنگ—رندر مجدد را تحریک نکند، روی صفحه منعکس نمی‌شود.)

راه‌حل این است که جهش را از `handleMove` حذف کنید و از سینتکس spread برای کپی کردن شکل استفاده کنید. توجه کنید که `+=` یک جهش است، بنابراین باید آن را به‌گونه‌ای بازنویسی کنید که از عملیات `+` معمولی استفاده کند.

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

#### به‌روزرسانی یک شیء با Immer {/*update-an-object-with-immer*/}

این همان مثال دارای باگ چالش قبلی است. این بار، با استفاده از Immer جهش را رفع کنید. برای راحتی شما، `useImmer` از قبل وارد شده است، بنابراین باید متغیر استیت `shape` را تغییر دهید تا از آن استفاده کند.

<Sandpack>

```js {expectedErrors: {'react-compiler': [18]}} src/App.js
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

این راه‌حل با Immer بازنویسی شده است. توجه کنید که هندلرهای رویداد به سبک تغییردهنده نوشته شده‌اند، اما باگ رخ نمی‌دهد. این به این دلیل است که در پس‌زمینه، Immer هرگز اشیاء موجود را تغییر نمی‌دهد.

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
