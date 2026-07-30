---
title: پاس‌دادن پراپس‌ها به یک کامپوننت
---

<Intro>

کامپوننت‌های ری‌اکت برای ارتباط با یکدیگر از *پراپس‌ها* استفاده می‌کنند. هر کامپوننت والد می‌تواند با دادن پراپس به کامپوننت‌های فرزند خود، اطلاعاتی را به آن‌ها منتقل کند. شاید پراپس‌ها شما را به ویژگی‌های HTML یادآوری کنند، اما می‌توانید هر مقدار جاوااسکریپتی را از طریق آن‌ها منتقل کنید، از جمله اشیاء، آرایه‌ها و توابع.

</Intro>

<YouWillLearn>

* چگونه پراپس‌ها را به یک کامپوننت پاس دهید
* چگونه پراپس‌ها را از یک کامپوننت بخوانید
* چگونه مقادیر پیش‌فرض برای پراپس‌ها مشخص کنید
* چگونه مقداری JSX را به یک کامپوننت پاس دهید
* چگونه پراپس‌ها در طول زمان تغییر می‌کنند

</YouWillLearn>

## پراپس‌های آشنا {/*familiar-props*/}

پراپس‌ها اطلاعاتی هستند که شما به یک تگ JSX پاس می‌دهید. برای مثال، `className`، `src`، `alt`، `width` و `height` برخی از پراپس‌هایی هستند که می‌توانید به یک `<img>` پاس دهید:

<Sandpack>

```js
function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/1bX5QH6.jpg"
      alt="Lin Lanying"
      width={100}
      height={100}
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

پراپس‌هایی که می‌توانید به یک تگ `<img>` پاس دهید از پیش تعریف شده‌اند (ReactDOM از [استاندارد HTML](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element) پیروی می‌کند). اما می‌توانید هر پراپسی را به *کامپوننت‌های خودتان*، مانند `<Avatar>`، پاس دهید تا آن‌ها را سفارشی کنید. این‌طور!

## پاس‌دادن پراپس‌ها به یک کامپوننت {/*passing-props-to-a-component*/}

در این کد، کامپوننت `Profile` هیچ پراپسی را به کامپوننت فرزند خود، `Avatar`، پاس نمی‌دهد:

```js
export default function Profile() {
  return (
    <Avatar />
  );
}
```

می‌توانید در دو مرحله به `Avatar` چند پراپس بدهید.

### مرحلهٔ ۱: پاس‌دادن پراپس‌ها به کامپوننت فرزند {/*step-1-pass-props-to-the-child-component*/}

ابتدا، چند پراپس به `Avatar` پاس دهید. برای مثال، بیایید دو پراپس پاس دهیم: `person` (یک شیء) و `size` (یک عدد):

```js
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```

<Note>

اگر آکولادهای دوتایی بعد از `person=` شما را گیج می‌کند، به یاد بیاورید که [آن‌ها فقط یک شیء](/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx) درون آکولادهای JSX هستند.

</Note>

حالا می‌توانید این پراپس‌ها را درون کامپوننت `Avatar` بخوانید.

### مرحلهٔ ۲: خواندن پراپس‌ها درون کامپوننت فرزند {/*step-2-read-props-inside-the-child-component*/}

می‌توانید این پراپس‌ها را با فهرست کردن نام‌هایشان `person, size` که با کاما جدا شده‌اند درون `({` و `})` مستقیماً بعد از `function Avatar` می‌خوانید. این به شما اجازه می‌دهد از آن‌ها درون کد `Avatar` استفاده کنید، درست مانند یک متغیر.

```js
function Avatar({ person, size }) {
  // person and size are available here
}
```

مقداری منطق به `Avatar` اضافه کنید که از پراپس‌های `person` و `size` برای رندر استفاده کند، و کار تمام است.

حالا می‌توانید `Avatar` را به روش‌های مختلفی با پراپس‌های متفاوت پیکربندی کنید تا رندر شود. امتحان کنید مقادیر را تغییر دهید!

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
body { min-height: 120px; }
.avatar { margin: 10px; border-radius: 50%; }
```

</Sandpack>

پراپس‌ها به شما اجازه می‌دهند دربارهٔ کامپوننت‌های والد و فرزند به‌صورت مستقل فکر کنید. برای مثال، می‌توانید پراپس‌های `person` یا `size` را درون `Profile` تغییر دهید بدون اینکه نگران نحوهٔ استفادهٔ `Avatar` از آن‌ها باشید. به‌طور مشابه، می‌توانید نحوهٔ استفادهٔ `Avatar` از این پراپس‌ها را تغییر دهید، بدون اینکه به `Profile` نگاه کنید.

می‌توانید پراپس‌ها را مانند «دکمه‌ها» (knobs)‌یی که می‌توانید تنظیم کنید در نظر بگیرید. آن‌ها همان نقشی را دارند که آرگومان‌ها برای توابع دارند — در واقع، پراپس‌ها _تنها_ آرگومان کامپوننت شما هستند! توابع کامپوننتی ری‌اکت یک آرگومان منفرد، یک شیء `props` را می‌پذیرند:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

معمولاً به خود شیء `props` کامل نیاز ندارید، بنابراین آن را به پراپس‌های منفرد دیسترکچر (destructure) می‌کنید.

<Pitfall>

**جفت آکولادهای `{` و `}`** درون `(` و `)` را هنگام تعریف پراپس‌ها فراموش نکنید:

```js
function Avatar({ person, size }) {
  // ...
}
```

این سینتکس ["destructuring"](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) نامیده می‌شود و معادل خواندن ویژگی‌ها از یک پارامتر تابع است:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

</Pitfall>

## مشخص کردن یک مقدار پیش‌فرض برای یک پراپس {/*specifying-a-default-value-for-a-prop*/}

اگر می‌خواهید به یک پراپس مقدار پیش‌فرضی بدهید تا در صورت مشخص نشدن مقدار به آن رجوع شود، می‌توانید این کار را با دیسترکچرینگ و قرار دادن `=` و مقدار پیش‌فرض بلافاصله بعد از پارامتر انجام دهید:

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

حالا، اگر `<Avatar person={...} />` بدون پراپس `size` رندر شود، `size` روی `100` تنظیم خواهد شد.

مقدار پیش‌فرض فقط زمانی استفاده می‌شود که پراپس `size` غایب باشد یا `size={undefined}` پاس دهید. اما اگر `size={null}` یا `size={0}` پاس دهید، مقدار پیش‌فرض استفاده **نخواهد شد**.

## فوروارد کردن پراپس‌ها با سینتکس spread در JSX {/*forwarding-props-with-the-jsx-spread-syntax*/}

گاهی، پاس‌دادن پراپس‌ها بسیار تکراری می‌شود:

```js
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```

هیچ اشکالی در کد تکراری وجود ندارد — می‌تواند خواناتر باشد. اما گاهی ممکن است به اختصار ارزش بدهید. برخی کامپوننت‌ها همهٔ پراپس‌هایشان را به فرزندانشان فوروارد می‌کنند، مانند نحوهٔ کار این `Profile` با `Avatar`. چون آن‌ها از هیچ‌کدام از پراپس‌هایشان مستقیماً استفاده نمی‌کنند، می‌تواند منطقی باشد که از یک سینتکس «spread» موج‌تر استفاده کنید:

```js
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

این تمام پراپس‌های `Profile` را بدون فهرست کردن نام هر کدام به `Avatar` فوروارد می‌کند.

**از سینتکس spread با اعتدال استفاده کنید.** اگر در هر کامپوننت دیگر از آن استفاده می‌کنید، چیزی اشتباه است. اغلب، این نشان می‌دهد که باید کامپوننت‌هایتان را تقسیم کنید و children را به‌عنوان JSX پاس دهید. بیشتر دربارهٔ این در ادامه!

## پاس‌دادن JSX به‌عنوان children {/*passing-jsx-as-children*/}

تودرتو کردن تگ‌های داخلی مرورگر رایج است:

```js
<div>
  <img />
</div>
```

گاهی می‌خواهید کامپوننت‌های خودتان را به همین روش تودرتو کنید:

```js
<Card>
  <Avatar />
</Card>
```

وقتی محتوا را درون یک تگ JSX تودرتو می‌کنید، کامپوننت والد آن محتوا را در یک پراپس به نام `children` دریافت می‌کند. برای مثال، کامپوننت `Card` زیر پراپس `children` را با مقدار `<Avatar />` دریافت می‌کند و آن را در یک div پیچانده رندر می‌کند:

<Sandpack>

```js src/App.js
import Avatar from './Avatar.js';

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

```js src/Avatar.js
import { getImageUrl } from './utils.js';

export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.card {
  width: fit-content;
  margin: 5px;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.avatar {
  margin: 20px;
  border-radius: 50%;
}
```

</Sandpack>

امتحان کنید `<Avatar>` درون `<Card>` را با مقداری متن جایگزین کنید تا ببینید کامپوننت `Card` چگونه می‌تواند هر محتوای تودرتو را بپیچد. نیازی ندارد «بداند» چه چیزی درون آن رندر می‌شود. این الگوی انعطاف‌پذیر را در بسیاری از جاها خواهید دید.

می‌توانید کامپوننتی با پراپس `children` را به این صورت در نظر بگیرید که یک «سوراخ» دارد که می‌تواند توسط کامپوننت‌های والد با JSX دلخواه «پر شود». اغلب از پراپس `children` برای پوشش‌های بصری استفاده خواهید کرد: پنل‌ها، گریدها و غیره.

<Illustration src="/images/docs/illustrations/i_children-prop.png" alt='A puzzle-like Card tile with a slot for "children" pieces like text and Avatar' />

## چگونه پراپس‌ها در طول زمان تغییر می‌کنند {/*how-props-change-over-time*/}

کامپوننت `Clock` زیر دو پراپس از کامپوننت والد خود دریافت می‌کند: `color` و `time`. (کد کامپوننت والد حذف شده چون از [استیت](/learn/state-a-components-memory) استفاده می‌کند، که هنوز به آن نمی‌پردازیم.)

امتحان کنید رنگ را در جعبهٔ انتخاب زیر تغییر دهید:

<Sandpack>

```js src/Clock.js active
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

این مثال نشان می‌دهد که **یک کامپوننت ممکن است در طول زمان پراپس‌های متفاوتی دریافت کند.** پراپس‌ها همیشه ایستا نیستند! در اینجا، پراپس `time` هر ثانیه تغییر می‌کند، و پراپس `color` وقتی رنگ دیگری انتخاب می‌کنید تغییر می‌کند. پراپس‌ها دادهٔ یک کامپوننت را در هر نقطه از زمان منعکس می‌کنند، نه فقط در ابتدا.

با این حال، پراپس‌ها [immutable](https://en.wikipedia.org/wiki/Immutable_object) (تغییرناپذیر) هستند — اصطلاحی از علوم کامپیوتر به معنای «تغییرناپذیر». وقتی یک کامپوننت نیاز به تغییر پراپس‌هایش دارد (برای مثال، در پاسخ به یک تعامل کاربر یا دادهٔ جدید)، باید از کامپوننت والد خود «بخواهد» که _پراپس‌های متفاوتی_ — یک شیء جدید! — به آن پاس دهد. پراپس‌های قدیمی‌اش سپس کنار گذاشته می‌شوند، و در نهایت موتور جاوااسکریپت حافظهٔ اشغال‌شده توسط آن‌ها را پس می‌گیرد.

**سعی نکنید «پراپس‌ها را تغییر دهید».** وقتی نیاز به پاسخ به ورودی کاربر دارید (مانند تغییر رنگ انتخاب‌شده)، باید «استیت را تنظیم کنید»، که می‌توانید دربارهٔ آن در [استیت: حافظهٔ یک کامپوننت.](/learn/state-a-components-memory) یاد بگیرید.

<Recap>

* برای پاس‌دادن پراپس‌ها، آن‌ها را به JSX اضافه کنید، درست مانند ویژگی‌های HTML.
* برای خواندن پراپس‌ها، از سینتکس دیسترکچرینگ `function Avatar({ person, size })` استفاده کنید.
* می‌توانید یک مقدار پیش‌فرض مانند `size = 100` مشخص کنید، که برای پراپس‌های غایب و `undefined` استفاده می‌شود.
* می‌توانید همهٔ پراپس‌ها را با سینتکس spread در JSX یعنی `<Avatar {...props} />` فوروارد کنید، اما زیاده‌روی نکنید!
* JSX تودرتویی مانند `<Card><Avatar /></Card>` به‌عنوان پراپس `children` کامپوننت `Card` ظاهر می‌شود.
* پراپس‌ها اسنپ‌شات‌های فقط‌خواندنی در زمان هستند: هر رندر یک نسخهٔ جدید از پراپس‌ها دریافت می‌کند.
* نمی‌توانید پراپس‌ها را تغییر دهید. وقتی به تعامل نیاز دارید، باید استیت را تنظیم کنید.

</Recap>



<Challenges>

#### استخراج یک کامپوننت {/*extract-a-component*/}

این کامپوننت `Gallery` شامل مقداری نشانه‌گذاری بسیار مشابه برای دو پروفایل است. یک کامپوننت `Profile` از آن استخراج کنید تا تکرار را کاهش دهید. باید انتخاب کنید چه پراپس‌هایی به آن پاس دهید.

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <section className="profile">
        <h2>Maria Skłodowska-Curie</h2>
        <img
          className="avatar"
          src={getImageUrl('szV5sdG')}
          alt="Maria Skłodowska-Curie"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            physicist and chemist
          </li>
          <li>
            <b>Awards: 4 </b> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li>
          <li>
            <b>Discovered: </b>
            polonium (chemical element)
          </li>
        </ul>
      </section>
      <section className="profile">
        <h2>Katsuko Saruhashi</h2>
        <img
          className="avatar"
          src={getImageUrl('YfeOqp2')}
          alt="Katsuko Saruhashi"
          width={70}
          height={70}
        />
        <ul>
          <li>
            <b>Profession: </b> 
            geochemist
          </li>
          <li>
            <b>Awards: 2 </b> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li>
          <li>
            <b>Discovered: </b>
            a method for measuring carbon dioxide in seawater
          </li>
        </ul>
      </section>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

<Hint>

با استخراج نشانه‌گذاری برای یکی از دانشمندان شروع کنید. سپس تکه‌هایی که در مثال دوم با آن مطابقت ندارند را پیدا کنید، و آن‌ها را با پراپس‌ها قابل پیکربندی کنید.

</Hint>

<Solution>

در این راه‌حل، کامپوننت `Profile` چندین پراپس می‌پذیرد: `imageId` (یک رشته)، `name` (یک رشته)، `profession` (یک رشته)، `awards` (یک آرایه از رشته‌ها)، `discovery` (یک رشته)، و `imageSize` (یک عدد).

توجه کنید که پراپس `imageSize` یک مقدار پیش‌فرض دارد، به همین دلیل آن را به کامپوننت پاس نمی‌دهیم.

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        alt={name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li><b>Profession:</b> {profession}</li>
        <li>
          <b>Awards: {awards.length} </b>
          ({awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ]}
      />
      <Profile
        imageId='YfeOqp2'
        name='Katsuko Saruhashi'
        profession='geochemist'
        discovery="a method for measuring carbon dioxide in seawater"
        awards={[
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ]}
      />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(imageId, size = 's') {
  return (
    'https://i.imgur.com/' +
    imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

توجه کنید اگر `awards` یک آرایه باشد، به پراپس `awardCount` جداگانه نیاز ندارید. سپس می‌توانید از `awards.length` برای شمارش تعداد جوایز استفاده کنید. به یاد داشته باشید که پراپس‌ها می‌توانند هر مقداری بپذیرند، و این شامل آرایه‌ها هم می‌شود!

یک راه‌حل دیگر، که شبیه‌تر به مثال‌های اولیهٔ این صفحه است، این است که همهٔ اطلاعات مربوط به یک شخص را در یک شیء منفرد گروه‌بندی کنید، و آن شیء را به‌عنوان یک پراپس پاس دهید:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Profile({ person, imageSize = 70 }) {
  const imageSrc = getImageUrl(person)

  return (
    <section className="profile">
      <h2>{person.name}</h2>
      <img
        className="avatar"
        src={imageSrc}
        alt={person.name}
        width={imageSize}
        height={imageSize}
      />
      <ul>
        <li>
          <b>Profession:</b> {person.profession}
        </li>
        <li>
          <b>Awards: {person.awards.length} </b>
          ({person.awards.join(', ')})
        </li>
        <li>
          <b>Discovered: </b>
          {person.discovery}
        </li>
      </ul>
    </section>
  )
}

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile person={{
        imageId: 'szV5sdG',
        name: 'Maria Skłodowska-Curie',
        profession: 'physicist and chemist',
        discovery: 'polonium (chemical element)',
        awards: [
          'Nobel Prize in Physics',
          'Nobel Prize in Chemistry',
          'Davy Medal',
          'Matteucci Medal'
        ],
      }} />
      <Profile person={{
        imageId: 'YfeOqp2',
        name: 'Katsuko Saruhashi',
        profession: 'geochemist',
        discovery: 'a method for measuring carbon dioxide in seawater',
        awards: [
          'Miyake Prize for geochemistry',
          'Tanaka Prize'
        ],
      }} />
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 5px; border-radius: 50%; min-height: 70px; }
.profile {
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-top: 20px;
  padding: 10px;
}
h1, h2 { margin: 5px; }
h1 { margin-bottom: 10px; }
ul { padding: 0px 10px 0px 20px; }
li { margin: 5px; }
```

</Sandpack>

اگرچه سینتکس کمی متفاوت به‌نظر می‌رسد زیرا شما ویژگی‌های یک شیء جاوااسکریپت را توصیف می‌کنید نه مجموعه‌ای از ویژگی‌های JSX، این مثال‌ها عمدتاً معادل هستند، و می‌توانید هر رویکردی را انتخاب کنید.

</Solution>

#### تنظیم اندازهٔ تصویر بر اساس یک پراپس {/*adjust-the-image-size-based-on-a-prop*/}

در این مثال، `Avatar` یک پراپس `size` عددی دریافت می‌کند که عرض و ارتفاع `<img>` را تعیین می‌کند. پراپس `size` در این مثال روی `40` تنظیم شده است. با این حال، اگر تصویر را در یک تب جدید باز کنید، متوجه می‌شوید که خود تصویر بزرگ‌تر است (`160` پیکسل). اندازهٔ واقعی تصویر با این که چه اندازهٔ تصویر بندانگشتی را درخواست می‌کنید تعیین می‌شود.

کامپوننت `Avatar` را تغییر دهید تا نزدیک‌ترین اندازهٔ تصویر را بر اساس پراپس `size` درخواست کند. به‌طور خاص، اگر `size` کمتر از `90` است، `'s'` («small») را به‌جای `'b'` («big») به تابع `getImageUrl` پاس دهید. با رندر کردن آواتارها با مقادیر متفاوت پراپس `size` و باز کردن تصاویر در یک تب جدید، تغییرات خود را بررسی کنید.

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person, 'b')}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Avatar
      size={40}
      person={{ 
        name: 'Gregorio Y. Zara', 
        imageId: '7vQD0fP'
      }}
    />
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

<Solution>

اینجا نحوهٔ انجام آن آمده است:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size > 90) {
    thumbnailSize = 'b';
  }

  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

همچنین می‌توانید با در نظر گرفتن [`window.devicePixelRatio`](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) برای صفحات با DPI بالا تصویر واضح‌تری نشان دهید:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js';

const ratio = window.devicePixelRatio;

function Avatar({ person, size }) {
  let thumbnailSize = 's';
  if (size * ratio > 90) {
    thumbnailSize = 'b';
  }
  return (
    <img
      className="avatar"
      src={getImageUrl(person, thumbnailSize)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <>
      <Avatar
        size={40}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={70}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
      <Avatar
        size={120}
        person={{ 
          name: 'Gregorio Y. Zara', 
          imageId: '7vQD0fP'
        }}
      />
    </>
  );
}
```

```js src/utils.js
export function getImageUrl(person, size) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

```css
.avatar { margin: 20px; border-radius: 50%; }
```

</Sandpack>

پراپس‌ها به شما اجازه می‌دهند منطقی مانند این را درون کامپوننت `Avatar` کپسوله کنید (و بعداً در صورت نیاز تغییر دهید) تا همه بتوانند از کامپوننت `<Avatar>` استفاده کنند بدون اینکه نگران نحوهٔ درخواست و تغییر اندازهٔ تصاویر باشند.

</Solution>

#### پاس‌دادن JSX در یک پراپس `children` {/*passing-jsx-in-a-children-prop*/}

یک کامپوننت `Card` را از نشانه‌گذاری زیر استخراج کنید، و از پراپس `children` برای پاس‌دادن JSX متفاوت به آن استفاده کنید:

<Sandpack>

```js
export default function Profile() {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <h1>Photo</h1>
          <img
            className="avatar"
            src="https://i.imgur.com/OKS67lhm.jpg"
            alt="Aklilu Lemma"
            width={70}
            height={70}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <h1>About</h1>
          <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
        </div>
      </div>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

<Hint>

هر JSX که درون تگ یک کامپوننت قرار دهید به‌عنوان پراپس `children` به آن کامپوننت پاس داده می‌شود.

</Hint>

<Solution>

این‌گونه می‌توانید از کامپوننت `Card` در هر دو جا استفاده کنید:

<Sandpack>

```js
function Card({ children }) {
  return (
    <div className="card">
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card>
        <h1>Photo</h1>
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card>
        <h1>About</h1>
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

همچنین اگر می‌خواهید هر `Card` همیشه یک عنوان داشته باشد، می‌توانید `title` را یک پراپس جداگانه کنید:

<Sandpack>

```js
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```

```css
.card {
  width: fit-content;
  margin: 20px;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 20px;
  background: #fff;
}
.card-content {
  text-align: center;
}
.avatar {
  margin: 10px;
  border-radius: 50%;
}
h1 {
  margin: 5px;
  padding: 0;
  font-size: 24px;
}
```

</Sandpack>

</Solution>

</Challenges>
