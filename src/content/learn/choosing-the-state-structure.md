---
title: انتخاب ساختار استیت
---

<Intro>

ساختاردهی خوب استیت می‌تواند تفاوت میان کامپوننتی که اصلاح و دیباگ کردنش لذت‌بخش است و کامپوننتی که منبع دائمی باگ‌ها است را رقم بزند. در اینجا چند نکته وجود دارد که هنگام ساختاردهی استیت باید در نظر بگیرید.

</Intro>

<YouWillLearn>

* چه زمانی از یک متغیر استیتِ واحد یا چند متغیر استیت استفاده کنید
* چه چیزهایی را هنگام سازمان‌دهی استیت باید پرهیز کنید
* چگونه مشکلات رایج ساختار استیت را برطرف کنید

</YouWillLearn>

## اصول ساختاردهی استیت {/*principles-for-structuring-state*/}

وقتی کامپوننتی می‌نویسید که استیت را نگه می‌دارد، باید دربارهٔ اینکه چند متغیر استیت استفاده کنید و شکل داده‌هایشان چه باشد تصمیم بگیرید. هرچند حتی با ساختار استیت نابهینه هم می‌توان برنامه‌های درستی نوشت، چند اصل وجود دارد که می‌تواند شما را در انتخاب‌های بهتر راهنمایی کند:

1. **استیت‌های مرتبط را گروه کنید.** اگر همیشه دو یا چند متغیر استیت را همزمان به‌روزرسانی می‌کنید، ادغام کردن آن‌ها در یک متغیر استیتِ واحد را در نظر بگیرید.
2. **از تناقض در استیت پرهیز کنید.** وقتی استیت به‌گونه‌ای ساختاردهی شده که چند بخش از استیت ممکن است با هم تناقض داشته و «مخالف» یکدیگر باشند، راه برای اشتباهات باز می‌ماند. سعی کنید از این کار پرهیز کنید.
3. **از استیت اضافی پرهیز کنید.** اگر می‌توانید اطلاعاتی را حین رندر از پراپس کامپوننت یا متغیرهای استیت موجودش محاسبه کنید، نباید آن اطلاعات را در استیت کامپوننت قرار دهید.
4. **از تکرار در استیت پرهیز کنید.** وقتی دادهٔ یکسانی در چند متغیر استیت یا درون اشیاء تودرتو تکرار می‌شود، همگام نگه‌داشتن آن‌ها دشوار است. هرجا که می‌توانید تکرار را کاهش دهید.
5. **از استیت عمیقاً تودرتو پرهیز کنید.** استیت با سلسله‌مراتب عمیق برای به‌روزرسانی چندان مناسب نیست. هرگاه ممکن است، ساختاردهی مسطح استیت را ترجیح دهید.

هدف پشت این اصول *آسان کردن به‌روزرسانی استیت بدون ایجاد اشتباه* است. حذف داده‌های اضافی و تکراری از استیت کمک می‌کند اطمینان حاصل شود که همهٔ بخش‌های آن همگام بمانند. این شبیه به این است که یک مهندس پایگاه داده ممکن است بخواهد برای کاهش احتمال باگ، ساختار پایگاه داده را [«نرمال‌سازی»](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description) کند. به قول آلبرت اینشتین، **«استیت خود را تا حد ممکن ساده کنید — اما نه ساده‌تر.»**

اکنون ببینیم این اصول چگونه در عمل به‌کار می‌روند.

## استیت‌های مرتبط را گروه کنید {/*group-related-state*/}

گاهی ممکن است بین استفاده از یک متغیر استیتِ واحد یا چند متغیر استیت مردد باشید.

آیا باید این کار را انجام دهید؟

```js
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

یا این کار؟

```js
const [position, setPosition] = useState({ x: 0, y: 0 });
```

از نظر فنی، می‌توانید از هر رویکردی استفاده کنید. اما **اگر دو متغیر استیت همیشه با هم تغییر می‌کنند، می‌تواند ایدهٔ خوبی باشد که آن‌ها را در یک متغیر استیتِ واحد متحد کنید.** آن‌گاه فراموش نمی‌کنید که همیشه آن‌ها را همگام نگه دارید، مانند این مثال که حرکت نشانگر هر دو مختصات نقطهٔ قرمز را به‌روزرسانی می‌کند:

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
  )
}
```

```css
body { margin: 0; padding: 0; height: 250px; }
```

</Sandpack>

مورد دیگری که در آن داده‌ها را در یک شیء یا آرایه گروه می‌کنید، زمانی است که نمی‌دانید به چند بخش استیت نیاز خواهید داشت. مثلاً وقتی فرمی دارید که کاربر می‌تواند فیلدهای سفارشی اضافه کند، مفید است.

<Pitfall>

اگر متغیر استیت شما یک شیء است، به یاد داشته باشید که [نمی‌توانید فقط یک فیلد از آن را به‌روزرسانی کنید](/learn/updating-objects-in-state) بدون اینکه صریحاً سایر فیلدها را کپی کنید. مثلاً، در مثال بالا نمی‌توانید `setPosition({ x: 100 })` را انجام دهید چون اصلاً ویژگی `y` را نخواهد داشت! در عوض، اگر می‌خواهید فقط `x` را تنظیم کنید، یا `setPosition({ ...position, x: 100 })` را انجام دهید، یا آن‌ها را به دو متغیر استیت جداگانه تقسیم کنید و `setX(100)` را انجام دهید.

</Pitfall>

## از تناقض در استیت پرهیز کنید {/*avoid-contradictions-in-state*/}

در اینجا یک فرم بازخورد هتل با متغیرهای استیت `isSending` و `isSent` آمده است:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```

</Sandpack>

اگرچه این کد کار می‌کند، راه را برای استیت‌های «غیرممکن» باز می‌گذارد. مثلاً، اگر فراموش کنید `setIsSent` و `setIsSending` را با هم فراخوانی کنید، ممکن است در وضعیتی قرار بگیرید که هم `isSending` و هم `isSent` همزمان `true` باشند. هرچه کامپوننت پیچیده‌تر باشد، فهمیدن اینکه چه اتفاقی افتاده سخت‌تر است.

**از آنجا که `isSending` و `isSent` هرگز نباید همزمان `true` باشند، بهتر است آن‌ها را با یک متغیر استیتِ `status` جایگزین کنید که می‌تواند یکی از *سه* حالت معتبر را بپذیرد:** `'typing'` (اولیه)، `'sending'`، و `'sent'`:

<Sandpack>

```js
import { useState } from 'react';

export default function FeedbackForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}
```

</Sandpack>

برای خوانایی همچنان می‌توانید چند ثابت تعریف کنید:

```js
const isSending = status === 'sending';
const isSent = status === 'sent';
```

اما آن‌ها متغیر استیت نیستند، پس نیازی نیست نگران ناهمگام شدنشان با یکدیگر باشید.

## از استیت اضافی پرهیز کنید {/*avoid-redundant-state*/}

اگر می‌توانید اطلاعاتی را حین رندر از پراپس کامپوننت یا متغیرهای استیت موجودش محاسبه کنید، **نباید** آن اطلاعات را در استیت کامپوننت قرار دهید.

مثلاً این فرم را ببینید. کار می‌کند، اما آیا می‌توانید استیت اضافی در آن پیدا کنید؟

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

این فرم سه متغیر استیت دارد: `firstName`، `lastName`، و `fullName`. با این حال، `fullName` اضافی است. **همیشه می‌توانید `fullName` را حین رندر از `firstName` و `lastName` محاسبه کنید، پس آن را از استیت حذف کنید.**

به این شکل می‌توانید این کار را انجام دهید:

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
```

```css
label { display: block; margin-bottom: 5px; }
```

</Sandpack>

اینجا `fullName` *متغیر استیت نیست*. بلکه حین رندر محاسبه می‌شود:

```js
const fullName = firstName + ' ' + lastName;
```

در نتیجه، هندلرهای تغییر نیازی ندارند برای به‌روزرسانی آن کار خاصی انجام دهند. وقتی `setFirstName` یا `setLastName` را فراخوانی می‌کنید، رندر مجدد را تحریک می‌کنید و سپس `fullName` بعدی از داده‌های تازه محاسبه خواهد شد.

<DeepDive>

#### پراپس را در استیت انعکاس ندهید {/*don-t-mirror-props-in-state*/}

یک مثال رایج از استیت اضافی، کدی مثل این است:

```js
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

اینجا، متغیر استیت `color` با پراپ `messageColor` مقداردهی اولیه می‌شود. مشکل این است که **اگر کامپوننت والد بعداً مقدار متفاوتی برای `messageColor` بفرستد (مثلاً `'red'` به‌جای `'blue'`)، متغیر استیت `color` به‌روزرسانی نخواهد شد!** استیت فقط حین اولین رندر مقداردهی اولیه می‌شود.

به همین دلیل «انعکاس دادن» پراپسی در یک متغیر استیت می‌تواند به سردرگمی منجر شود. در عوض، از پراپ `messageColor` مستقیماً در کدتان استفاده کنید. اگر می‌خواهید نام کوتاه‌تری به آن بدهید، از یک ثابت استفاده کنید:

```js
function Message({ messageColor }) {
  const color = messageColor;
```

این‌گونه با پراپس عبوری از کامپوننت والد ناهمگام نخواهد شد.

«انعکاس دادن» پراپس در استیت تنها زمانی معنا دارد که *می‌خواهید* همهٔ به‌روزرسانی‌ها برای یک پراپ خاص را نادیده بگیرید. قرارداداً، نام پراپ را با `initial` یا `default` آغاز کنید تا روشن شود که مقادیر جدید آن نادیده گرفته می‌شوند:

```js
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
```

</DeepDive>

## از تکرار در استیت پرهیز کنید {/*avoid-duplication-in-state*/}

این کامپوننت فهرست منو به شما اجازه می‌دهد یک میان‌وعدهٔ سفر را از میان چند مورد انتخاب کنید:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

در حال حاضر، آیتم انتخاب‌شده را به‌عنوان یک شیء در متغیر استیت `selectedItem` ذخیره می‌کند. با این حال، این خوب نیست: **محتوای `selectedItem` همان شیءِ یکی از آیتم‌های داخل فهرست `items` است.** این یعنی اطلاعات دربارهٔ خود آیتم در دو جای مختلف تکرار شده است.

چرا این یک مشکل است؟ بگذارید هر آیتم را قابل ویرایش کنیم:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2> 
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedItem(item);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

توجه کنید که اگر ابتدا روی یک آیتم «Choose» را بزنید و *سپس* آن را ویرایش کنید، **ورودی به‌روزرسانی می‌شود اما برچسب پایین ویرایش‌ها را منعکس نمی‌کند.** این به آن دلیل است که استیت را تکرار کرده‌اید و فراموش کرده‌اید `selectedItem` را به‌روزرسانی کنید.

هرچند می‌توانستید `selectedItem` را هم به‌روزرسانی کنید، راه‌حل ساده‌تر حذف تکرار است. در این مثال، به‌جای یک شیء `selectedItem` (که با اشیاء داخل `items` تکرار ایجاد می‌کند)، `selectedId` را در استیت نگه دارید و *سپس* `selectedItem` را با جستجو در آرایهٔ `items` برای آیتمی با آن ID به‌دست آورید:

<Sandpack>

```js
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}
```

```css
button { margin-top: 10px; }
```

</Sandpack>

استیت قبلاً به این شکل تکرار می‌شد:

* `items = [{ id: 0, title: 'pretzels'}, ...]`
* `selectedItem = {id: 0, title: 'pretzels'}`

اما پس از تغییر به این شکل است:

* `items = [{ id: 0, title: 'pretzels'}, ...]`
* `selectedId = 0`

تکرار از بین رفته و فقط استیت ضروری را نگه می‌دارید!

اکنون اگر آیتم *انتخاب‌شده* را ویرایش کنید، پیام پایین بلافاصله به‌روزرسانی خواهد شد. این به آن دلیل است که `setItems` رندر مجدد را تحریک می‌کند و `items.find(...)` آیتم را با عنوان به‌روزرسانی‌شده پیدا خواهد کرد. نیازی نبود *آیتم انتخاب‌شده* را در استیت نگه دارید، چون فقط *شناسهٔ انتخاب‌شده (selected ID)* ضروری است. بقیه را می‌توان حین رندر محاسبه کرد.

## از استیت عمیقاً تودرتو پرهیز کنید {/*avoid-deeply-nested-state*/}

یک برنامهٔ سفر متشکل از سیارات، قاره‌ها و کشورها را تصور کنید. ممکن است وسوسه شوید که استیت آن را با اشیاء و آرایه‌های تودرتو ساختاردهی کنید، مانند این مثال:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map(place => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}
```

```js src/places.js active
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: []
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: []
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: []
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: []
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: []
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: []
      }]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: [{
        id: 11,
        title: 'Argentina',
        childPlaces: []
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: []
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: []
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: []
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: []
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: []
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: []
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: []
      }]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: [{
        id: 20,
        title: 'China',
        childPlaces: []
      }, {
        id: 21,
        title: 'India',
        childPlaces: []
      }, {
        id: 22,
        title: 'Singapore',
        childPlaces: []
      }, {
        id: 23,
        title: 'South Korea',
        childPlaces: []
      }, {
        id: 24,
        title: 'Thailand',
        childPlaces: []
      }, {
        id: 25,
        title: 'Vietnam',
        childPlaces: []
      }]
    }, {
      id: 26,
      title: 'Europe',
      childPlaces: [{
        id: 27,
        title: 'Croatia',
        childPlaces: [],
      }, {
        id: 28,
        title: 'France',
        childPlaces: [],
      }, {
        id: 29,
        title: 'Germany',
        childPlaces: [],
      }, {
        id: 30,
        title: 'Italy',
        childPlaces: [],
      }, {
        id: 31,
        title: 'Portugal',
        childPlaces: [],
      }, {
        id: 32,
        title: 'Spain',
        childPlaces: [],
      }, {
        id: 33,
        title: 'Turkey',
        childPlaces: [],
      }]
    }, {
      id: 34,
      title: 'Oceania',
      childPlaces: [{
        id: 35,
        title: 'Australia',
        childPlaces: [],
      }, {
        id: 36,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: [],
      }, {
        id: 37,
        title: 'Easter Island (Chile)',
        childPlaces: [],
      }, {
        id: 38,
        title: 'Fiji',
        childPlaces: [],
      }, {
        id: 39,
        title: 'Hawaii (the USA)',
        childPlaces: [],
      }, {
        id: 40,
        title: 'New Zealand',
        childPlaces: [],
      }, {
        id: 41,
        title: 'Vanuatu',
        childPlaces: [],
      }]
    }]
  }, {
    id: 42,
    title: 'Moon',
    childPlaces: [{
      id: 43,
      title: 'Rheita',
      childPlaces: []
    }, {
      id: 44,
      title: 'Piccolomini',
      childPlaces: []
    }, {
      id: 45,
      title: 'Tycho',
      childPlaces: []
    }]
  }, {
    id: 46,
    title: 'Mars',
    childPlaces: [{
      id: 47,
      title: 'Corn Town',
      childPlaces: []
    }, {
      id: 48,
      title: 'Green Hill',
      childPlaces: []      
    }]
  }]
};
```

</Sandpack>

اکنون فرض کنید می‌خواهید دکمه‌ای اضافه کنید تا مکانی را که قبلاً دیده‌اید حذف کنید. چگونه این کار را انجام می‌دهید؟ [به‌روزرسانی استیت تودرتو](/learn/updating-objects-in-state#updating-a-nested-object) شامل ساختن کپی از اشیاء تا بالاترین سطح از بخشی که تغییر کرده است. حذف یک مکان عمیقاً تودرتو شامل کپی کردن تمام زنجیرهٔ مکان‌های والد آن می‌شود. چنین کدی می‌تواند بسیار طولانی باشد.

**اگر استیت برای به‌روزرسانی آسان بیش از حد تودرتو است، «مسطح» کردن آن را در نظر بگیرید.** در اینجا یکی از راه‌هایی است که می‌توانید این داده‌ها را بازساختاردهی کنید. به‌جای ساختار درختی که در آن هر `place` آرایه‌ای از *مکان‌های فرزند خودش* دارد، می‌توانید هر مکان آرایه‌ای از *شناسهٔ مکان‌های فرزند خودش* داشته باشد. سپس یک نگاشت از هر شناسهٔ مکان به مکان مربوطه ذخیره کنید.

این بازساختاردهی داده‌ها ممکن است شما را به دیدن یک جدول پایگاه داده یادآوری کند:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              placesById={placesById}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            placesById={plan}
          />
        ))}
      </ol>
    </>
  );
}
```

```js src/places.js active
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
```

</Sandpack>

**اکنون که استیت «مسطح» است (که به آن «نرمال‌سازی شده» هم گفته می‌شود)، به‌روزرسانی آیتم‌های تودرتو آسان‌تر می‌شود.**

برای حذف یک مکان اکنون، فقط باید دو سطح از استیت را به‌روزرسانی کنید:

- نسخهٔ به‌روزرسانی‌شدهٔ مکان *والد* آن باید شناسهٔ حذف‌شده را از آرایهٔ `childIds` خود حذف کند.
- نسخهٔ به‌روزرسانی‌شدهٔ شیء «جدول» ریشه باید شامل نسخهٔ به‌روزرسانی‌شدهٔ مکان والد باشد.

در اینجا مثالی از نحوهٔ انجام این کار آمده است:

<Sandpack>

```js
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
```

```js src/places.js
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
```

```css
button { margin: 10px; }
```

</Sandpack>

می‌توانید به هر اندازه که بخواهید استیت را تودرتو کنید، اما «مسطح» کردن آن می‌تواند مشکلات متعددی را حل کند. این کار به‌روزرسانی استیت را آسان‌تر می‌کند و کمک می‌کند مطمئن شوید در بخش‌های مختلف یک شیء تودرتو تکرار ندارید.

<DeepDive>

#### بهبود مصرف حافظه {/*improving-memory-usage*/}

در حال ایده‌آل، می‌توانستید آیتم‌های حذف‌شده (و فرزندانشان!) را از شیء «جدول» حذف کنید تا مصرف حافظه بهبود یابد. این نسخه این کار را انجام می‌دهد. همچنین [از Immer](/learn/updating-objects-in-state#write-concise-update-logic-with-immer) استفاده می‌کند تا منطق به‌روزرسانی مختصرتر شود.

<Sandpack>

```js
import { useImmer } from 'use-immer';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, updatePlan] = useImmer(initialTravelPlan);

  function handleComplete(parentId, childId) {
    updatePlan(draft => {
      // Remove from the parent place's child IDs.
      const parent = draft[parentId];
      parent.childIds = parent.childIds
        .filter(id => id !== childId);

      // Forget this place and all its subtree.
      deleteAllChildren(childId);
      function deleteAllChildren(id) {
        const place = draft[id];
        place.childIds.forEach(deleteAllChildren);
        delete draft[id];
      }
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
```

```js src/places.js
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: []
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: []
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: []
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: []
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: []
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: []
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: []
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: []
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: []
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: []
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: []
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: []
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: []
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: []
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: []
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: [20, 21, 22, 23, 24, 25,],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: []
  },
  21: {
    id: 21,
    title: 'India',
    childIds: []
  },
  22: {
    id: 22,
    title: 'Singapore',
    childIds: []
  },
  23: {
    id: 23,
    title: 'South Korea',
    childIds: []
  },
  24: {
    id: 24,
    title: 'Thailand',
    childIds: []
  },
  25: {
    id: 25,
    title: 'Vietnam',
    childIds: []
  },
  26: {
    id: 26,
    title: 'Europe',
    childIds: [27, 28, 29, 30, 31, 32, 33],   
  },
  27: {
    id: 27,
    title: 'Croatia',
    childIds: []
  },
  28: {
    id: 28,
    title: 'France',
    childIds: []
  },
  29: {
    id: 29,
    title: 'Germany',
    childIds: []
  },
  30: {
    id: 30,
    title: 'Italy',
    childIds: []
  },
  31: {
    id: 31,
    title: 'Portugal',
    childIds: []
  },
  32: {
    id: 32,
    title: 'Spain',
    childIds: []
  },
  33: {
    id: 33,
    title: 'Turkey',
    childIds: []
  },
  34: {
    id: 34,
    title: 'Oceania',
    childIds: [35, 36, 37, 38, 39, 40,, 41],   
  },
  35: {
    id: 35,
    title: 'Australia',
    childIds: []
  },
  36: {
    id: 36,
    title: 'Bora Bora (French Polynesia)',
    childIds: []
  },
  37: {
    id: 37,
    title: 'Easter Island (Chile)',
    childIds: []
  },
  38: {
    id: 38,
    title: 'Fiji',
    childIds: []
  },
  39: {
    id: 39,
    title: 'Hawaii (the USA)',
    childIds: []
  },
  40: {
    id: 40,
    title: 'New Zealand',
    childIds: []
  },
  41: {
    id: 41,
    title: 'Vanuatu',
    childIds: []
  },
  42: {
    id: 42,
    title: 'Moon',
    childIds: [43, 44, 45]
  },
  43: {
    id: 43,
    title: 'Rheita',
    childIds: []
  },
  44: {
    id: 44,
    title: 'Piccolomini',
    childIds: []
  },
  45: {
    id: 45,
    title: 'Tycho',
    childIds: []
  },
  46: {
    id: 46,
    title: 'Mars',
    childIds: [47, 48]
  },
  47: {
    id: 47,
    title: 'Corn Town',
    childIds: []
  },
  48: {
    id: 48,
    title: 'Green Hill',
    childIds: []
  }
};
```

```css
button { margin: 10px; }
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

</DeepDive>

گاهی می‌توانید با منتقل کردن بخشی از استیت تودرتو به کامپوننت‌های فرزند، تودرتویی استیت را هم کاهش دهید. این برای استیت موقتی رابط کاربری که نیازی به ذخیره‌سازی ندارد، مانند اینکه آیا آیتمی هاور شده یا نه، خوب کار می‌کند.

<Recap>

* اگر دو متغیر استیت همیشه با هم به‌روزرسانی می‌شوند، ادغام آن‌ها در یکی را در نظر بگیرید.
* متغیرهای استیت خود را با دقت انتخاب کنید تا از ایجاد استیت‌های «غیرممکن» پرهیز کنید.
* استیت خود را به‌گونه‌ای ساختاردهی کنید که احتمال اشتباه کردن هنگام به‌روزرسانی آن را کاهش دهد.
* از استیت اضافی و تکراری پرهیز کنید تا نیازی به همگام نگه‌داشتن آن نباشد.
* پراپس را *در* استیت قرار ندهید مگر اینکه مخصوصاً بخواهید از به‌روزرسانی جلوگیری کنید.
* برای الگوهای رابط کاربری مانند انتخاب، شناسه (ID) یا اندیس را به‌جای خود شیء در استیت نگه دارید.
* اگر به‌روزرسانی استیت عمیقاً تودرتو پیچیده است، مسطح کردن آن را امتحان کنید.

</Recap>

<Challenges>

#### رفع کامپوننتی که به‌روزرسانی نمی‌شود {/*fix-a-component-thats-not-updating*/}

این کامپوننت `Clock` دو پراپ دریافت می‌کند: `color` و `time`. وقتی رنگ متفاوتی را در کادر انتخاب انتخاب می‌کنید، کامپوننت `Clock` پراپ `color` متفاوتی از کامپوننت والدش دریافت می‌کند. با این حال، به دلیری خاص، رنگ نمایش‌داده‌شده به‌روزرسانی نمی‌شود. چرا؟ مشکل را برطرف کنید.

<Sandpack>

```js src/Clock.js active
import { useState } from 'react';

export default function Clock(props) {
  const [color, setColor] = useState(props.color);
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

<Solution>

مشکل این است که این کامپوننت استیت `color` دارد که با مقدار اولیهٔ پراپ `color` مقداردهی اولیه شده است. اما وقتی پراپ `color` تغییر می‌کند، این روی متغیر استیت تأثیر نمی‌گذارد! پس ناهمگام می‌شوند. برای رفع این مشکل، متغیر استیت را کلاً حذف کنید و از پراپ `color` مستقیماً استفاده کنید.

<Sandpack>

```js src/Clock.js active
import { useState } from 'react';

export default function Clock(props) {
  return (
    <h1 style={{ color: props.color }}>
      {props.time}
    </h1>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

یا با استفاده از سینتکس تخریب (destructuring):

<Sandpack>

```js src/Clock.js active
import { useState } from 'react';

export default function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}
```

```js src/App.js hidden
import { useState, useEffect } from 'react';
import Clock from './Clock.js';

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState('lightcoral');
  return (
    <div>
      <p>
        Pick a color:{' '}
        <select value={color} onChange={e => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select>
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

</Sandpack>

</Solution>

#### رفع فهرست بسته‌بندی خراب {/*fix-a-broken-packing-list*/}

این فهرست بسته‌بندی پانویسی دارد که نشان می‌دهد چند آیتم بسته‌بندی شده و در مجموع چند آیتم وجود دارد. در ابتدا کار می‌کند، اما باگ دارد. مثلاً، اگر آیتمی را به‌عنوان بسته‌بندی‌شده علامت بزنید و سپس حذف کنید، شمارنده به‌درستی به‌روزرسانی نخواهد شد. شمارنده را طوری برطرف کنید که همیشه درست باشد.

<Hint>

آیا در این مثال استیت اضافی وجود دارد؟

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(3);
  const [packed, setPacked] = useState(1);

  function handleAddItem(title) {
    setTotal(total + 1);
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    if (nextItem.packed) {
      setPacked(packed + 1);
    } else {
      setPacked(packed - 1);
    }
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setTotal(total - 1);
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
```

```js src/AddItem.js hidden
import { useState } from 'react';

export default function AddItem({ onAddItem }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add item"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddItem(title);
      }}>Add</button>
    </>
  )
}
```

```js src/PackingList.js hidden
import { useState } from 'react';

export default function PackingList({
  items,
  onChangeItem,
  onDeleteItem
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={e => {
                onChangeItem({
                  ...item,
                  packed: e.target.checked
                });
              }}
            />
            {' '}
            {item.title}
          </label>
          <button onClick={() => onDeleteItem(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

<Solution>

هرچند می‌توانستید با دقت هر هندلر رویداد را طوری تغییر دهید که شمارنده‌های `total` و `packed` را به‌درستی به‌روزرسانی کند، ریشهٔ مشکل این است که این متغیرهای استیت اصلاً وجود دارند. آن‌ها اضافی هستند چون همیشه می‌توانید تعداد آیتم‌ها (بسته‌بندی‌شده یا کل) را از خود آرایهٔ `items` محاسبه کنید. برای رفع باگ، استیت اضافی را حذف کنید:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);

  const total = items.length;
  const packed = items
    .filter(item => item.packed)
    .length;

  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false
      }
    ]);
  }

  function handleChangeItem(nextItem) {
    setItems(items.map(item => {
      if (item.id === nextItem.id) {
        return nextItem;
      } else {
        return item;
      }
    }));
  }

  function handleDeleteItem(itemId) {
    setItems(
      items.filter(item => item.id !== itemId)
    );
  }

  return (
    <>  
      <AddItem
        onAddItem={handleAddItem}
      />
      <PackingList
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
      />
      <hr />
      <b>{packed} out of {total} packed!</b>
    </>
  );
}
```

```js src/AddItem.js hidden
import { useState } from 'react';

export default function AddItem({ onAddItem }) {
  const [title, setTitle] = useState('');
  return (
    <>
      <input
        placeholder="Add item"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={() => {
        setTitle('');
        onAddItem(title);
      }}>Add</button>
    </>
  )
}
```

```js src/PackingList.js hidden
import { useState } from 'react';

export default function PackingList({
  items,
  onChangeItem,
  onDeleteItem
}) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.packed}
              onChange={e => {
                onChangeItem({
                  ...item,
                  packed: e.target.checked
                });
              }}
            />
            {' '}
            {item.title}
          </label>
          <button onClick={() => onDeleteItem(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

```css
button { margin: 5px; }
li { list-style-type: none; }
ul, li { margin: 0; padding: 0; }
```

</Sandpack>

توجه کنید که هندلرهای رویداد پس از این تغییر فقط نگران فراخوانی `setItems` هستند. شمارش آیتم‌ها اکنون حین رندر بعدی از `items` محاسبه می‌شود، پس همیشه به‌روز است.

</Solution>

#### رفع انتخاب ناپدیدشده {/*fix-the-disappearing-selection*/}

فهرستی از `letters` در استیت وجود دارد. وقتی روی حرف خاصی هاور می‌کنید یا آن را فوکوس می‌کنید، برجسته می‌شود. حرف برجستهٔ فعلی در متغیر استیت `highlightedLetter` ذخیره شده است. می‌توانید حروف را «ستاره‌دار» و «بدون ستاره» کنید، که آرایهٔ `letters` در استیت را به‌روزرسانی می‌کند.

این کد کار می‌کند، اما یک ایراد جزئی رابط کاربری وجود دارد. وقتی «Star» یا «Unstar» را فشار می‌دهید، برجسته‌سازی برای لحظه‌ای ناپدید می‌شود. با این حال، به‌محض اینکه نشانگر را حرکت دهید یا با کیبورد به حرف دیگری بروید، دوباره ظاهر می‌شود. چرا این اتفاق می‌افتد؟ آن را طوری برطرف کنید که برجسته‌سازی پس از کلیک دکمه ناپدید نشود.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedLetter, setHighlightedLetter] = useState(null);

  function handleHover(letter) {
    setHighlightedLetter(letter);
  }

  function handleStar(starred) {
    setLetters(letters.map(letter => {
      if (letter.id === starred.id) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter === highlightedLetter
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
```

```js src/Letter.js
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter);        
      }}
      onPointerMove={() => {
        onHover(letter);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
```

```js src/data.js
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
button { margin: 5px; }
li { border-radius: 5px; }
.highlighted { background: #d2eaff; }
```

</Sandpack>

<Solution>

مشکل این است که شما شیء letter را در `highlightedLetter` نگه می‌دارید. اما همین اطلاعات را در آرایهٔ `letters` هم نگه می‌دارید. پس استیت شما تکرار دارد! وقتی پس از کلیک دکمه آرایهٔ `letters` را به‌روزرسانی می‌کنید، یک شیء letter جدید می‌سازید که با `highlightedLetter` متفاوت است. به همین دلیل بررسی `highlightedLetter === letter` به `false` تبدیل می‌شود و برجسته‌سازی ناپدید می‌گردد. دفعهٔ بعد که نشانگر حرکت می‌کند و `setHighlightedLetter` را فراخوانی می‌کنید، دوباره ظاهر می‌شود.

برای رفع مشکل، تکرار را از استیت حذف کنید. به‌جای ذخیرهٔ *خود letter* در دو مکان، `highlightedId` را ذخیره کنید. سپس می‌توانید `isHighlighted` را برای هر حرف با `letter.id === highlightedId` بررسی کنید، که حتی اگر شیء `letter` از آخرین رندر تغییر کرده باشد هم کار خواهد کرد.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters);
  const [highlightedId, setHighlightedId ] = useState(null);

  function handleHover(letterId) {
    setHighlightedId(letterId);
  }

  function handleStar(starredId) {
    setLetters(letters.map(letter => {
      if (letter.id === starredId) {
        return {
          ...letter,
          isStarred: !letter.isStarred
        };
      } else {
        return letter;
      }
    }));
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={
              letter.id === highlightedId
            }
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  );
}
```

```js src/Letter.js
export default function Letter({
  letter,
  isHighlighted,
  onHover,
  onToggleStar,
}) {
  return (
    <li
      className={
        isHighlighted ? 'highlighted' : ''
      }
      onFocus={() => {
        onHover(letter.id);        
      }}
      onPointerMove={() => {
        onHover(letter.id);
      }}
    >
      <button onClick={() => {
        onToggleStar(letter.id);
      }}>
        {letter.isStarred ? 'Unstar' : 'Star'}
      </button>
      {letter.subject}
    </li>
  )
}
```

```js src/data.js
export const initialLetters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
button { margin: 5px; }
li { border-radius: 5px; }
.highlighted { background: #d2eaff; }
```

</Sandpack>

</Solution>

#### پیاده‌سازی انتخاب چندگانه {/*implement-multiple-selection*/}

در این مثال، هر `Letter` یک پراپ `isSelected` و یک هندلر `onToggle` دارد که آن را به‌عنوان انتخاب‌شده علامت می‌زند. این کار می‌کند، اما استیت به‌صورت `selectedId` (یا `null` یا یک شناسه) ذخیره می‌شود، پس فقط یک حرف می‌تواند در هر زمان انتخاب شود.

ساختار استیت را به‌گونه‌ای تغییر دهید که از انتخاب چندگانه پشتیبانی کند. (چگونه آن را ساختاردهی می‌کنید؟ قبل از نوشتن کد دربارهٔ این فکر کنید.) هر چک‌باکس باید از بقیه مستقل شود. کلیک روی یک حرف انتخاب‌شده باید آن را از تیک خارج کند. در نهایت، پانویس باید تعداد درست آیتم‌های انتخاب‌شده را نشان دهد.

<Hint>

به‌جای یک شناسهٔ انتخاب‌شدهٔ واحد، شاید بخواهید یک آرایه یا یک [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) از شناسه‌های انتخاب‌شده را در استیت نگه دارید.

</Hint>

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedId, setSelectedId] = useState(null);

  // TODO: allow multiple selection
  const selectedCount = 1;

  function handleToggle(toggledId) {
    // TODO: allow multiple selection
    setSelectedId(toggledId);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              // TODO: allow multiple selection
              letter.id === selectedId
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js src/Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js src/data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

<Solution>

به‌جای یک `selectedId` واحد، یک *آرایه* `selectedIds` را در استیت نگه دارید. مثلاً، اگر اولین و آخرین حرف را انتخاب کنید، شامل `[0, 2]` خواهد بود. وقتی چیزی انتخاب نشده باشد، یک آرایهٔ خالی `[]` خواهد بود:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedCount = selectedIds.length;

  function handleToggle(toggledId) {
    // Was it previously selected?
    if (selectedIds.includes(toggledId)) {
      // Then remove this ID from the array.
      setSelectedIds(selectedIds.filter(id =>
        id !== toggledId
      ));
    } else {
      // Otherwise, add this ID to the array.
      setSelectedIds([
        ...selectedIds,
        toggledId
      ]);
    }
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.includes(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js src/Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js src/data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

یک نقطه ضعف جزئی استفاده از آرایه این است که برای هر آیتم، `selectedIds.includes(letter.id)` را فراخوانی می‌کنید تا بررسی کنید آیا انتخاب شده است. اگر آرایه بسیار بزرگ باشد، این می‌تواند به مشکل عملکرد تبدیل شود چون جستجوی آرایه با [`includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) زمان خطی می‌برد و شما این جستجو را برای هر آیتم جداگانه انجام می‌دهید.

برای رفع این موضوع، می‌توانید به‌جای آن یک [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) را در استیت نگه دارید که عملیات سریع [`has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) را فراهم می‌کند:

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
  const [selectedIds, setSelectedIds] = useState(
    new Set()
  );

  const selectedCount = selectedIds.size;

  function handleToggle(toggledId) {
    // Create a copy (to avoid mutation).
    const nextIds = new Set(selectedIds);
    if (nextIds.has(toggledId)) {
      nextIds.delete(toggledId);
    } else {
      nextIds.add(toggledId);
    }
    setSelectedIds(nextIds);
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map(letter => (
          <Letter
            key={letter.id}
            letter={letter}
            isSelected={
              selectedIds.has(letter.id)
            }
            onToggle={handleToggle}
          />
        ))}
        <hr />
        <p>
          <b>
            You selected {selectedCount} letters
          </b>
        </p>
      </ul>
    </>
  );
}
```

```js src/Letter.js
export default function Letter({
  letter,
  onToggle,
  isSelected,
}) {
  return (
    <li className={
      isSelected ? 'selected' : ''
    }>
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => {
            onToggle(letter.id);
          }}
        />
        {letter.subject}
      </label>
    </li>
  )
}
```

```js src/data.js
export const letters = [{
  id: 0,
  subject: 'Ready for adventure?',
  isStarred: true,
}, {
  id: 1,
  subject: 'Time to check in!',
  isStarred: false,
}, {
  id: 2,
  subject: 'Festival Begins in Just SEVEN Days!',
  isStarred: false,
}];
```

```css
input { margin: 5px; }
li { border-radius: 5px; }
label { width: 100%; padding: 5px; display: inline-block; }
.selected { background: #d2eaff; }
```

</Sandpack>

اکنون هر آیتم یک بررسی `selectedIds.has(letter.id)` انجام می‌دهد که بسیار سریع است.

در نظر داشته باشید که [نباید اشیاء در استیت را جهش (mutate) دهید](/learn/updating-objects-in-state)، و این شامل Setها هم می‌شود. به همین دلیل تابع `handleToggle` ابتدا یک *کپی* از Set می‌سازد و سپس آن کپی را به‌روزرسانی می‌کند.

</Solution>

</Challenges>
