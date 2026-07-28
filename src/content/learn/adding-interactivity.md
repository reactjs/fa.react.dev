---
title: افزودن تعامل
---

<Intro>

برخی چیزها روی صفحه در پاسخ به ورودی کاربر به‌روزرسانی می‌شوند. برای مثال، کلیک روی یک گالری تصاویر، تصویر فعال را عوض می‌کند. در ری‌اکت، داده‌ای که در طول زمان تغییر می‌کند، *استیت* نامیده می‌شود. شما می‌توانید به هر کامپوننتی استیت اضافه کنید و در صورت نیاز آن را به‌روزرسانی کنید. در این فصل، خواهید آموخت که چگونه کامپوننت‌هایی بنویسید که با تعاملات کاربر می‌کنند، استیت خود را به‌روزرسانی می‌کنند و در طول زمان خروجی متفاوتی نمایش می‌دهند.

</Intro>

<YouWillLearn isChapter={true}>

* [چگونه رویدادهای آغاز شده توسط کاربر را مدیریت کنیم](/learn/responding-to-events)
* [چگونه با استیت به کامپوننت‌ها «یادآوری» اطلاعات کنیم](/learn/state-a-components-memory)
* [چگونه ری‌اکت رابط کاربری را در دو مرحله به‌روزرسانی می‌کند](/learn/render-and-commit)
* [چرا استیت بلافاصله پس از تغییرش به‌روز نمی‌شود](/learn/state-as-a-snapshot)
* [چگونه چندین به‌روزرسانی استیت را در صف قرار دهیم](/learn/queueing-a-series-of-state-updates)
* [چگونه یک شیء را در استیت به‌روزرسانی کنیم](/learn/updating-objects-in-state)
* [چگونه یک آرایه را در استیت به‌روزرسانی کنیم](/learn/updating-arrays-in-state)

</YouWillLearn>

## پاسخ به رویدادها {/*responding-to-events*/}

ری‌اکت به شما اجازه می‌دهد *مدیرکننده‌های رویداد* (event handler) را به JSX خود اضافه کنید. مدیرکننده‌های رویداد توابع خود شما هستند که در پاسخ به تعاملات کاربر مانند کلیک، حرکت موس، تمرکز روی ورودی‌های فرم و غیره اجرا می‌شوند.

کامپوننت‌های داخلی مانند `<button>` فقط از رویدادهای داخلی مرورگر مانند `onClick` پشتیبانی می‌کنند. اما شما می‌توانید کامپوننت‌های خودتان را نیز بسازید و به پراپس مدیرکننده رویداد آنها هر نامی که دوست دارید، مخصوص برنامهٔ خودتان بدهید.

<Sandpack>

```js
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

```css
button { margin-right: 10px; }
```

</Sandpack>

<LearnMore path="/learn/responding-to-events">

برای یادگیری نحوه افزودن مدیرکننده‌های رویداد، **[پاسخ به رویدادها](/learn/responding-to-events)** را بخوانید.

</LearnMore>

## استیت: حافظهٔ کامپوننت {/*state-a-components-memory*/}

کامپوننت‌ها اغلب نیاز دارند که در نتیجهٔ یک تعامل، آنچه روی صفحه است را تغییر دهند. تایپ کردن در فرم باید فیلد ورودی را به‌روزرسانی کند، کلیک روی «بعدی» در یک کاروسل تصاویر باید تصویر نمایش‌داده‌شده را عوض کند، کلیک روی «خرید» یک محصول را به سبد خرید اضافه می‌کند. کامپوننت‌ها باید چیزها را «یادآوری» کنند: مقدار ورودی فعلی، تصویر فعلی، سبد خرید. در ری‌اکت، این نوع حافظهٔ مخصوص کامپوننت، *استیت* نامیده می‌شود.

شما می‌توانید با هوک [`useState`](/reference/react/useState) به یک کامپوننت استیت اضافه کنید. *هوک‌ها* توابع خاصی هستند که به کامپوننت‌های شما اجازه می‌دهند از قابلیت‌های ری‌اکت استفاده کنند (استیت یکی از این قابلیت‌هاست). هوک `useState` به شما اجازه می‌دهد یک متغیر استیت تعریف کنید. این هوک استیت اولیه را دریافت می‌کند و یک جفت مقدار برمی‌گرداند: استیت فعلی، و یک تابع تنظیم‌کنندهٔ استیت که به شما اجازه می‌دهد آن را به‌روزرسانی کنید.

```js
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

در اینجا نحوه استفاده و به‌روزرسانی استیت در یک گالری تصاویر هنگام کلیک آورده شده است:

<Sandpack>

```js
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
    </>
  );
}
```

```js src/data.js
export const sculptureList = [{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}];
```

```css
h2 { margin-top: 10px; margin-bottom: 0; }
h3 {
 margin-top: 5px;
 font-weight: normal;
 font-size: 100%;
}
img { width: 120px; height: 120px; }
button {
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

</Sandpack>

<LearnMore path="/learn/state-a-components-memory">

برای یادگیری نحوه یادآوری یک مقدار و به‌روزرسانی آن هنگام تعامل، **[استیت: حافظهٔ یک کامپوننت](/learn/state-a-components-memory)** را بخوانید.

</LearnMore>

## رندر و کامیت {/*render-and-commit*/}

پیش از آنکه کامپوننت‌های شما روی صفحه نمایش داده شوند، باید توسط ری‌اکت رندر شوند. درک مراحل این فرایند به شما کمک می‌کند تا درباره نحوه اجرای کدتان بیندیشید و رفتار آن را توضیح دهید.

تصور کنید کامپوننت‌های شما آشپزهایی در آشپزخانه هستند که از مواد اولیه، غذاهای خوشمزه‌ای تهیه می‌کنند. در این سناریو، ری‌اکت گارسونی است که سفارش‌ها را از مشتریان می‌گیرد و سفارش‌هایشان را برایشان می‌آورد. این فرایند درخواست و سرو کردن رابط کاربری سه مرحله دارد:

1. **راه‌اندازی** یک رندر (رساندن سفارش مشتری به آشپزخانه)
2. **رندر کردن** کامپوننت (آماده‌سازی سفارش در آشپزخانه)
3. **کامیت کردن** به DOM (قرار دادن سفارش روی میز)

<IllustrationBlock sequential>
  <Illustration caption="Trigger" alt="React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen." src="/images/docs/illustrations/i_render-and-commit1.png" />
  <Illustration caption="Render" alt="The Card Chef gives React a fresh Card component." src="/images/docs/illustrations/i_render-and-commit2.png" />
  <Illustration caption="Commit" alt="React delivers the Card to the user at their table." src="/images/docs/illustrations/i_render-and-commit3.png" />
</IllustrationBlock>

<LearnMore path="/learn/render-and-commit">

برای یادگیری چرخهٔ حیات یک به‌روزرسانی رابط کاربری، **[رندر و کامیت](/learn/render-and-commit)** را بخوانید.

</LearnMore>

## استیت به‌عنوان یک عکس فوری {/*state-as-a-snapshot*/}

برخلاف متغیرهای معمولی جاوااسکریپت، استیت ری‌اکت بیشتر مانند یک عکس فوری رفتار می‌کند. تنظیم کردن آن، متغیر استیتی که هم‌اکنون دارید را تغییر نمی‌دهد، بلکه یک رندر مجدد را راه‌اندازی می‌کند. این ممکن است در ابتدا عجیب به نظر برسد!

```js
console.log(count);  // 0
setCount(count + 1); // Request a re-render with 1
console.log(count);  // Still 0!
```

این رفتار به شما کمک می‌کند از باگ‌های ظریف جلوگیری کنید.

در اینجا یک برنامهٔ چت کوچک وجود دارد. سعی کنید حدس بزنید اگر ابتدا «ارسال» را بزنید و *سپس* گیرنده را به «باب» تغییر دهید، چه اتفاقی می‌افتد. نام چه کسی پنج ثانیه بعد در `alert` ظاهر خواهد شد؟

<Sandpack>

```js
import { useState } from 'react';

export default function Form() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      alert(`You said ${message} to ${to}`);
    }, 5000);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To:{' '}
        <select
          value={to}
          onChange={e => setTo(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
      </label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

```css
label, textarea { margin-bottom: 10px; display: block; }
```

</Sandpack>


<LearnMore path="/learn/state-as-a-snapshot">

برای یادگیری اینکه چرا استیت در داخل مدیرکننده‌های رویداد «ثابت» و بدون تغییر به نظر می‌رسد، **[استیت به‌عنوان یک عکس فوری](/learn/state-as-a-snapshot)** را بخوانید.

</LearnMore>

## قرار دادن یک سری به‌روزرسانی استیت در صف {/*queueing-a-series-of-state-updates*/}

این کامپوننت باگ دارد: کلیک روی «+3» امتیاز را فقط یک بار افزایش می‌دهد.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

[استیت به‌عنوان یک عکس فوری](/learn/state-as-a-snapshot) توضیح می‌دهد که چرا این اتفاق می‌افتد. تنظیم استیت یک رندر مجدد جدید درخواست می‌کند، اما آن را در کدی که در حال اجراست تغییر نمی‌دهد. بنابراین `score` بلافاصله پس از فراخوانی `setScore(score + 1)` همچنان `0` باقی می‌ماند.

```js
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
setScore(score + 1); // setScore(0 + 1);
console.log(score);  // 0
```

شما می‌توانید با ارسال یک *تابع به‌روزرسانی* هنگام تنظیم استیت، این مشکل را برطرف کنید. توجه کنید که چگونه جایگزینی `setScore(score + 1)` با `setScore(s => s + 1)` دکمهٔ «+3» را اصلاح می‌کند. این کار به شما اجازه می‌دهد چندین به‌روزرسانی استیت را در صف قرار دهید.

<Sandpack>

```js
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

```css
button { display: inline-block; margin: 10px; font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/queueing-a-series-of-state-updates">

برای یادگیری نحوه قرار دادن یک دنباله از به‌روزرسانی‌های استیت در صف، **[قرار دادن یک سری به‌روزرسانی استیت در صف](/learn/queueing-a-series-of-state-updates)** را بخوانید.

</LearnMore>

## به‌روزرسانی اشیاء در استیت {/*updating-objects-in-state*/}

استیت می‌تواند هر نوع مقدار جاوااسکریپتی از جمله اشیاء را نگه دارد. اما نباید اشیاء و آرایه‌هایی که در استیت ری‌اکت نگه می‌دارید را مستقیماً تغییر دهید. در عوض، وقتی می‌خواهید یک شیء یا آرایه را به‌روزرسانی کنید، باید یکی جدید بسازید (یا یک کپی از یک نسخهٔ موجود تهیه کنید) و سپس استیت را به‌گونه‌ای به‌روزرسانی کنید که از آن کپی استفاده کند.

معمولاً از سینتکس spread یعنی `...` برای کپی کردن اشیاء و آرایه‌هایی که می‌خواهید تغییر دهید، استفاده خواهید کرد. برای مثال، به‌روزرسانی یک شیء تودرتو می‌تواند به این شکل باشد:

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

اگر کپی کردن اشیاء در کد خسته‌کننده می‌شود، می‌توانید از کتابخانه‌ای مانند [Immer](https://github.com/immerjs/use-immer) برای کاهش کد تکراری استفاده کنید:

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

<LearnMore path="/learn/updating-objects-in-state">

برای یادگیری نحوه به‌روزرسانی صحیح اشیاء، **[به‌روزرسانی اشیاء در استیت](/learn/updating-objects-in-state)** را بخوانید.

</LearnMore>

## به‌روزرسانی آرایه‌ها در استیت {/*updating-arrays-in-state*/}

آرایه‌ها نوع دیگری از اشیاء قابل‌تغییر جاوااسکریپت هستند که می‌توانید در استیت ذخیره کنید و باید با آنها مانند چیزی فقط‌خواندنی رفتار کنید. درست مانند اشیاء، وقتی می‌خواهید یک آرایهٔ ذخیره‌شده در استیت را به‌روزرسانی کنید، باید یکی جدید بسازید (یا یک کپی از نسخهٔ موجود تهیه کنید) و سپس استیت را برای استفاده از آرایهٔ جدید تنظیم کنید:

<Sandpack>

```js
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

</Sandpack>

اگر کپی کردن آرایه‌ها در کد خسته‌کننده می‌شود، می‌توانید از کتابخانه‌ای مانند [Immer](https://github.com/immerjs/use-immer) برای کاهش کد تکراری استفاده کنید:

<Sandpack>

```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
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

</Sandpack>

<LearnMore path="/learn/updating-arrays-in-state">

برای یادگیری نحوه به‌روزرسانی صحیح آرایه‌ها، **[به‌روزرسانی آرایه‌ها در استیت](/learn/updating-arrays-in-state)** را بخوانید.

</LearnMore>

## قدم بعدی چیست؟ {/*whats-next*/}

برای شروع خواندن این فصل صفحه به صفحه، به [پاسخ به رویدادها](/learn/responding-to-events) بروید!

یا، اگر با این مباحث از قبل آشنا هستید، چرا درباره [مدیریت استیت](/learn/managing-state) نخوانید؟
