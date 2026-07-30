---
title: جاوااسکریپت در JSX با آکولادها
---

<Intro>

JSX به شما اجازه می‌دهد مارک‌آپی شبیه به HTML را داخل یک فایل جاوااسکریپت بنویسید و منطق رندر و محتوا را در یک جا نگه دارید. گاهی اوقات می‌خواهید کمی منطق جاوااسکریپت اضافه کنید یا به یک پراپرتی پویا درون آن مارک‌آپ ارجاع دهید. در این حالت، می‌توانید از آکولادها در JSX خود استفاده کنید تا پنجره‌ای به سمت جاوااسکریپت باز کنید.

</Intro>

<YouWillLearn>

* چگونه رشته‌ها را با کوتیشن پاس بدهیم
* چگونه به یک متغیر جاوااسکریپت داخل JSX با آکولادها ارجاع دهیم
* چگونه یک تابع جاوااسکریپت را داخل JSX با آکولادها فراخوانی کنیم
* چگونه از یک شیء جاوااسکریپت داخل JSX با آکولادها استفاده کنیم

</YouWillLearn>

## پاس دادن رشته‌ها با کوتیشن {/*passing-strings-with-quotes*/}

وقتی می‌خواهید یک ویژگی رشته‌ای به JSX پاس بدهید، آن را در کوتیشن تکی یا جفتی قرار می‌دهید:

<Sandpack>

```js
export default function Avatar() {
  return (
    <img
      className="avatar"
      src="https://i.imgur.com/7vQD0fPs.jpg"
      alt="Gregorio Y. Zara"
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

در اینجا، `"https://i.imgur.com/7vQD0fPs.jpg"` و `"Gregorio Y. Zara"` به‌عنوان رشته پاس داده می‌شوند.

اما اگر بخواهید به‌صورت پویا `src` یا متن `alt` را مشخص کنید چه؟ می‌توانید **از یک مقدار جاوااسکریپت با جایگزینی `"` و `"` با `{` و `}` استفاده کنید**:

<Sandpack>

```js
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```

```css
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

به تفاوت بین `className="avatar"`، که نام کلاس CSS `"avatar"` را مشخص می‌کند و تصویر را گرد می‌سازد، و `src={avatar}` که مقدار متغیر جاوااسکریپتی به نام `avatar` را می‌خواند، توجه کنید. این به‌این دلیل است که آکولادها به شما اجازه می‌دهند مستقیماً در مارک‌آپ خود با جاوااسکریپت کار کنید!

## استفاده از آکولادها: پنجره‌ای به سوی دنیای جاوااسکریپت {/*using-curly-braces-a-window-into-the-javascript-world*/}

JSX روشی ویژه برای نوشتن جاوااسکریپت است. این یعنی می‌توان از جاوااسکریپت درون آن استفاده کرد—با آکولادهای `{ }`. مثال زیر ابتدا یک نام برای دانشمند، `name`، تعریف می‌کند، سپس آن را با آکولادها درون `<h1>` قرار می‌دهد:

<Sandpack>

```js
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

</Sandpack>

مقدار `name` را از `'Gregorio Y. Zara'` به `'Hedy Lamarr'` تغییر دهید. ببینید عنوان لیست چگونه تغییر می‌کند؟

هر عبارت جاوااسکریپتی بین آکولادها کار می‌کند، از جمله فراخوانی توابع مانند `formatDate()`:

<Sandpack>

```js
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

</Sandpack>

### کجا از آکولادها استفاده کنیم {/*where-to-use-curly-braces*/}

از آکولادها در JSX فقط به دو روش می‌توان استفاده کرد:

1. **به‌عنوان متن** مستقیماً داخل یک تگ JSX: `<h1>{name}'s To Do List</h1>` کار می‌کند، اما `<{tag}>Gregorio Y. Zara's To Do List</{tag}>`  کار نخواهد کرد.
2. **به‌عنوان ویژگی** بلافاصله پس از علامت `=`: `src={avatar}` متغیر `avatar` را می‌خواند، اما `src="{avatar}"` رشته‌ی `"{avatar}"` را پاس می‌دهد.

## استفاده از «آکولاد دوتایی»: CSS و سایر اشیاء در JSX {/*using-double-curlies-css-and-other-objects-in-jsx*/}

علاوه بر رشته‌ها، اعداد و سایر عبارات جاوااسکریپتی، می‌توانید حتی اشیاء را نیز در JSX پاس بدهید. اشیاء نیز با آکولاد نمایش داده می‌شوند، مانند `{ name: "Hedy Lamarr", inventions: 5 }`. بنابراین، برای پاس دادن یک شیء JS در JSX، باید آن شیء را در یک جفت آکولاد دیگر بپیچید: `person={{ name: "Hedy Lamarr", inventions: 5 }}`.

ممکن است این را با استایل‌های درون‌خطی CSS در JSX ببینید. ری‌اکت از شما نمی‌خواهد که از استایل‌های درون‌خطی استفاده کنید (کلاس‌های CSS برای اکثر موارد عالی کار می‌کنند). اما وقتی به استایل درون‌خطی نیاز دارید، یک شیء به ویژگی `style` پاس می‌دهید:

<Sandpack>

```js
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```css
body { padding: 0; margin: 0 }
ul { padding: 20px 20px 20px 40px; margin: 0; }
```

</Sandpack>

مقادیر `backgroundColor` و `color` را تغییر دهید.

وقتی آن را به این شکل بنویسید، شیء جاوااسکریپت داخل آکولادها را واقعاً می‌بینید:

```js {2-5}
<ul style={
  {
    backgroundColor: 'black',
    color: 'pink'
  }
}>
```

دفعه‌ی بعد که `{{` و `}}` را در JSX دیدید، بدانید که این چیزی جز یک شیء داخل آکولادهای JSX نیست!

<Pitfall>

پراپرتی‌های درون‌خطی `style` به‌صورت camelCase نوشته می‌شوند. برای مثال، HTML `<ul style="background-color: black">` در کامپوننت شما به‌صورت `<ul style={{ backgroundColor: 'black' }}>`  نوشته می‌شود.

</Pitfall>

## لذت بیشتر با اشیاء جاوااسکریپت و آکولادها {/*more-fun-with-javascript-objects-and-curly-braces*/}

می‌توانید چندین عبارت را در یک شیء قرار دهید و در JSX خود داخل آکولادها به آن‌ها ارجاع کنید:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

در این مثال، شیء جاوااسکریپتی `person` شامل یک رشته‌ی `name` و یک شیء `theme` است:

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};
```

کامپوننت می‌تواند از این مقادیر `person` به این شکل استفاده کند:

```js
<div style={person.theme}>
  <h1>{person.name}'s Todos</h1>
```

JSX به‌عنوان یک زبان قالب‌بندی بسیار مینیمال است، زیرا به شما اجازه می‌دهد داده و منطق را با جاوااسکریپت سازماندهی کنید.

<Recap>

اکنون تقریباً همه‌چیز درباره‌ی JSX را می‌دانید:

* ویژگی‌های JSX داخل کوتیشن به‌عنوان رشته پاس داده می‌شوند.
* آکولادها به شما اجازه می‌دهند منطق و متغیرهای جاوااسکریپت را وارد مارک‌آپ خود کنید.
* آن‌ها در محتوای تگ JSX یا بلافاصله پس از `=` در ویژگی‌ها کار می‌کنند.
* `{{` و `}}` نحو خاصی نیست: این یک شیء جاوااسکریپتی است که داخل آکولادهای JSX قرار گرفته.

</Recap>

<Challenges>

#### رفع اشتباه {/*fix-the-mistake*/}

این کد با خطایی به این مضمون کرش می‌کند: `Objects are not valid as a React child`:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

می‌توانید مشکل را پیدا کنید؟

<Hint>ببینید چه چیزی داخل آکولادهاست. آیا چیز درستی را آنجا قرار می‌دهیم؟</Hint>

<Solution>

این اتفاق می‌افتد چون این مثال *خودِ یک شیء* را به‌جای یک رشته در مارک‌آپ رندر می‌کند: `<h1>{person}'s Todos</h1>` سعی می‌کند کل شیء `person` را رندر کند! قرار دادن اشیاء خام به‌عنوان محتوای متنی خطایی تولید می‌کند چون ری‌اکت نمی‌داند شما چگونه می‌خواهید آن‌ها را نمایش دهید.

برای رفع آن، `<h1>{person}'s Todos</h1>` را با `<h1>{person.name}'s Todos</h1>` جایگزین کنید:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### استخراج اطلاعات به یک شیء {/*extract-information-into-an-object*/}

URL تصویر را در شیء `person` استخراج کنید.

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

<Solution>

URL تصویر را به یک پراپرتی به نام `person.imageUrl` منتقل کنید و آن را از تگ `<img>` با استفاده از آکولادها بخوانید:

<Sandpack>

```js
const person = {
  name: 'Gregorio Y. Zara',
  imageUrl: "https://i.imgur.com/7vQD0fPs.jpg",
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={person.imageUrl}
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; height: 90px; }
```

</Sandpack>

</Solution>

#### نوشتن یک عبارت داخل آکولادهای JSX {/*write-an-expression-inside-jsx-curly-braces*/}

در شیء زیر، URL کامل تصویر به چهار بخش تقسیم شده است: URL پایه، `imageId`، `imageSize` و پسوند فایل.

می‌خواهیم URL تصویر این ویژگی‌ها را با هم ترکیب کند: URL پایه (همیشه `'https://i.imgur.com/'`)، `imageId` (`'7vQD0fP'`)، `imageSize` (`'s'`) و پسوند فایل (همیشه `'.jpg'`). با این حال، چیزی در نحوه‌ی مشخص کردن `src` در تگ `<img>` اشتباه است.

می‌توانید آن را اصلاح کنید؟

<Sandpack>

```js

const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="{baseUrl}{person.imageId}{person.imageSize}.jpg"
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

برای بررسی اینکه اصلاح شما کار کرده، مقدار `imageSize` را به `'b'` تغییر دهید. تصویر باید پس از ویرایش شما تغییر اندازه دهد.

<Solution>

می‌توانید آن را به‌صورت `src={baseUrl + person.imageId + person.imageSize + '.jpg'}` بنویسید.

1. `{` عبارت جاوااسکریپت را باز می‌کند
2. `baseUrl + person.imageId + person.imageSize + '.jpg'` رشته‌ی URL صحیح را تولید می‌کند
3. `}` عبارت جاوااسکریپت را می‌بندد

<Sandpack>

```js
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

همچنین می‌توانید این عبارت را به یک تابع جداگانه مانند `getImageUrl` در ادامه منتقل کنید:

<Sandpack>

```js src/App.js
import { getImageUrl } from './utils.js'

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    person.imageSize +
    '.jpg'
  );
}
```

```css
body { padding: 0; margin: 0 }
body > div > div { padding: 20px; }
.avatar { border-radius: 50%; }
```

</Sandpack>

متغیرها و توابع می‌توانند به شما کمک کنند مارک‌آپ را ساده نگه دارید!

</Solution>

</Challenges>
