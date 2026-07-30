---
title: توصیف رابط کاربری
---

<Intro>

ری‌اکت یک کتابخانه‌ی جاوااسکریپت برای رندر کردن رابط‌های کاربری (UI) است. رابط کاربری از واحدهای کوچکی مانند دکمه‌ها، متن و تصاویر ساخته می‌شود. ری‌اکت به شما اجازه می‌دهد آن‌ها را در قالب *کامپوننت‌هایی* قابل‌استفاده‌ی مجدد و قابل‌تودرتو ترکیب کنید. از وب‌سایت‌ها تا اپلیکیشن‌های موبایل، هر چیزی که روی صفحه می‌بینید را می‌توان به کامپوننت‌هایی تجزیه کرد. در این فصل، نحوه‌ی ساخت، سفارشی‌سازی و نمایش شرطی کامپوننت‌های ری‌اکت را یاد می‌گیرید.

</Intro>

<YouWillLearn isChapter={true}>

* [نحوه‌ی نوشتن اولین کامپوننت ری‌اکت خود](/learn/your-first-component)
* [چه زمان و چگونه فایل‌های چندکامپوننتی بسازیم](/learn/importing-and-exporting-components)
* [چگونه با JSX به جاوااسکریپت مارک‌آپ اضافه کنیم](/learn/writing-markup-with-jsx)
* [چگونه از آکولادها در JSX برای دسترسی به قابلیت‌های جاوااسکریپت در کامپوننت‌های خود استفاده کنیم](/learn/javascript-in-jsx-with-curly-braces)
* [نحوه‌ی پیکربندی کامپوننت‌ها با پراپس](/learn/passing-props-to-a-component)
* [نحوه‌ی رندر شرطی کامپوننت‌ها](/learn/conditional-rendering)
* [نحوه‌ی رندر هم‌زمان چند کامپوننت](/learn/rendering-lists)
* [نحوه‌ی جلوگیری از باگ‌های گیج‌کننده با خالص نگه‌داشتن کامپوننت‌ها](/learn/keeping-components-pure)
* [چرا درک رابط کاربری به‌صورت درخت مفید است](/learn/understanding-your-ui-as-a-tree)

</YouWillLearn>

## اولین کامپوننت شما {/*your-first-component*/}

اپلیکیشن‌های ری‌اکت از قطعات ایزوله‌شده‌ی رابط کاربری به نام *کامپوننت* ساخته می‌شوند. یک کامپوننت ری‌اکت تابعی جاوااسکریپتی است که می‌توانید روی آن کمی مارک‌آپ بپاشید. کامپوننت‌ها می‌توانند به‌اندازه‌ی یک دکمه کوچک باشند یا به‌اندازه‌ی یک صفحه‌ی کامل بزرگ باشند. در اینجا یک کامپوننت `Gallery` آمده که سه کامپوننت `Profile` را رندر می‌کند:

<Sandpack>

```js
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```css
img { margin: 0 10px 10px 0; height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/your-first-component">

برای یادگیری نحوه‌ی تعریف و استفاده از کامپوننت‌های ری‌اکت، **[اولین کامپوننت شما](/learn/your-first-component)** را بخوانید.

</LearnMore>

## ایمپورت و اکسپورت کردن کامپوننت‌ها {/*importing-and-exporting-components*/}

می‌توانید کامپوننت‌های زیادی را در یک فایل تعریف کنید، اما فایل‌های بزرگ می‌توانند برای پیمایش دشوار باشند. برای حل این مشکل، می‌توانید یک کامپوننت را در فایل خودش *اکسپورت* کنید و سپس آن را از فایل دیگری *ایمپورت* کنید:


<Sandpack>

```js src/App.js hidden
import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}
```

```js src/Gallery.js active
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

```js src/Profile.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}
```

```css
img { margin: 0 10px 10px 0; }
```

</Sandpack>

<LearnMore path="/learn/importing-and-exporting-components">

برای یادگیری نحوه‌ی تقسیم کامپوننت‌ها در فایل‌های جداگانه، **[ایمپورت و اکسپورت کردن کامپوننت‌ها](/learn/importing-and-exporting-components)** را بخوانید.

</LearnMore>

## نوشتن مارک‌آپ با JSX {/*writing-markup-with-jsx*/}

هر کامپوننت ری‌اکت یک تابع جاوااسکریپتی است که می‌تواند مقداری مارک‌آپ داشته باشد که ری‌اکت آن را در مرورگر رندر می‌کند. کامپوننت‌های ری‌اکت از یک افزونه‌ی نحوی به نام JSX برای نمایش این مارک‌آپ استفاده می‌کنند. JSX خیلی شبیه HTML است، اما کمی سخت‌گیرانه‌تر است و می‌تواند اطلاعات پویا را نمایش دهد.

اگر مارک‌آپ HTML موجود را در یک کامپوننت ری‌اکت جای‌گذاری کنیم، همیشه کار نخواهد کرد:

<Sandpack>

```js
export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1>Hedy Lamarr's Todos</h1>
    <img
      src="https://i.imgur.com/yXOvdOSs.jpg"
      alt="Hedy Lamarr"
      class="photo"
    >
    <ul>
      <li>Invent new traffic lights
      <li>Rehearse a movie scene
      <li>Improve spectrum technology
    </ul>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

اگر HTML موجود به این شکل دارید، می‌توانید با استفاده از یک [مبدل](https://transform.tools/html-to-jsx) آن را اصلاح کنید:

<Sandpack>

```js
export default function TodoList() {
  return (
    <>
      <h1>Hedy Lamarr's Todos</h1>
      <img
        src="https://i.imgur.com/yXOvdOSs.jpg"
        alt="Hedy Lamarr"
        className="photo"
      />
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve spectrum technology</li>
      </ul>
    </>
  );
}
```

```css
img { height: 90px; }
```

</Sandpack>

<LearnMore path="/learn/writing-markup-with-jsx">

برای یادگیری نحوه‌ی نوشتن JSX معتبر، **[نوشتن مارک‌آپ با JSX](/learn/writing-markup-with-jsx)** را بخوانید.

</LearnMore>

## جاوااسکریپت در JSX با آکولادها {/*javascript-in-jsx-with-curly-braces*/}

JSX به شما اجازه می‌دهد مارک‌آپی شبیه به HTML را داخل یک فایل جاوااسکریپت بنویسید و منطق رندر و محتوا را در یک جا نگه دارید. گاهی اوقات می‌خواهید کمی منطق جاوااسکریپت اضافه کنید یا به یک پراپرتی پویا درون آن مارک‌آپ ارجاع دهید. در این حالت، می‌توانید از آکولادها در JSX خود استفاده کنید تا یک «پنجره‌ای» به سمت جاوااسکریپت باز کنید:

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

<LearnMore path="/learn/javascript-in-jsx-with-curly-braces">

برای یادگیری نحوه‌ی دسترسی به داده‌های جاوااسکریپت از JSX، **[جاوااسکریپت در JSX با آکولادها](/learn/javascript-in-jsx-with-curly-braces)** را بخوانید.

</LearnMore>

## پاس دادن پراپس به یک کامپوننت {/*passing-props-to-a-component*/}

کامپوننت‌های ری‌اکت برای ارتباط با هم از *پراپس* استفاده می‌کنند. هر کامپوننت والد می‌تواند با دادن پراپس به کامپوننت‌های فرزند، مقداری اطلاعات به آن‌ها منتقل کند. پراپس ممکن است شما را به یاد ویژگی‌های HTML بیندازد، اما می‌توانید از طریق آن‌ها هر مقدار جاوااسکریپتی را پاس بدهید، از جمله اشیاء، آرایه‌ها، توابع و حتی JSX!

<Sandpack>

```js
import { getImageUrl } from './utils.js'

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

function Card({ children }) {
  return (
    <div className="card">
      {children}
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

<LearnMore path="/learn/passing-props-to-a-component">

برای یادگیری نحوه‌ی پاس دادن و خواندن پراپس، **[پاس دادن پراپس به یک کامپوننت](/learn/passing-props-to-a-component)** را بخوانید.

</LearnMore>

## رندر شرطی {/*conditional-rendering*/}

کامپوننت‌های شما اغلب بر اساس شرایط مختلف باید چیزهای متفاوتی نمایش دهند. در ری‌اکت، می‌توانید JSX را به‌صورت شرطی با استفاده از نحو جاوااسکریپت مانند دستورات `if` و عملگرهای `&&` و `? :` رندر کنید.

در این مثال، از عملگر `&&` جاوااسکریپت برای رندر شرطی یک علامت تیک استفاده شده است:

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

<LearnMore path="/learn/conditional-rendering">

برای یادگیری روش‌های مختلف رندر شرطی محتوا، **[رندر شرطی](/learn/conditional-rendering)** را بخوانید.

</LearnMore>

## رندر کردن لیست‌ها {/*rendering-lists*/}

اغلب می‌خواهید چندین کامپوننت مشابه را از یک مجموعه داده نمایش دهید. می‌توانید از `filter()` و `map()` جاوااسکریپت در کنار ری‌اکت برای فیلتر و تبدیل آرایه‌ی داده‌هایتان به آرایه‌ای از کامپوننت‌ها استفاده کنید.

برای هر آیتم آرایه، باید یک `key` مشخص کنید. معمولاً می‌خواهید از یک شناسه (ID) از پایگاه داده به‌عنوان `key` استفاده کنید. کلیدها به ری‌اکت اجازه می‌دهند جای هر آیتم در لیست را حتی اگر لیست تغییر کند پیگیری کند.

<Sandpack>

```js src/App.js
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}
```

```js src/data.js
export const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
  accomplishment: 'spaceflight calculations',
  imageId: 'MK3eW3A'
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
  accomplishment: 'discovery of Arctic ozone hole',
  imageId: 'mynHUSa'
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
  accomplishment: 'electromagnetism theory',
  imageId: 'bE7W1ji'
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
  accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
  imageId: 'IOjWm71'
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
  accomplishment: 'white dwarf star mass calculations',
  imageId: 'lrWQx8l'
}];
```

```js src/utils.js
export function getImageUrl(person) {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    's.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li {
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
img { width: 100px; height: 100px; border-radius: 50%; }
h1 { font-size: 22px; }
h2 { font-size: 20px; }
```

</Sandpack>

<LearnMore path="/learn/rendering-lists">

برای یادگیری نحوه‌ی رندر لیستی از کامپوننت‌ها و نحوه‌ی انتخاب یک کلید، **[رندر کردن لیست‌ها](/learn/rendering-lists)** را بخوانید.

</LearnMore>

## خالص نگه‌داشتن کامپوننت‌ها {/*keeping-components-pure*/}

برخی از توابع جاوااسکریپت *خالص* هستند. یک تابع خالص:

* **فقط به کار خودش می‌پردازد.** هیچ شیء یا متغیری را که پیش از فراخوانی‌اش وجود داشته تغییر نمی‌دهد.
* **ورودی یکسان، خروجی یکسان.** با ورودی‌های یکسان، یک تابع خالص باید همیشه همان نتیجه را برگرداند.

با نوشتن کامپوننت‌های خود منحصراً به‌صورت توابع خالص، می‌توانید از دسته‌ای کامل از باگ‌های گیج‌کننده و رفتارهای غیرقابل‌پیش‌بین جلوگیری کنید. در اینجا یک مثال از یک کامپوننت ناخالص آمده است:

<Sandpack>

```js {expectedErrors: {'react-compiler': [5]}}
let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```

</Sandpack>

می‌توانید با پاس دادن یک پراپ به‌جای تغییر یک متغیر ازپیش‌موجود، این کامپوننت را خالص کنید:

<Sandpack>

```js
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
```

</Sandpack>

<LearnMore path="/learn/keeping-components-pure">

برای یادگیری نحوه‌ی نوشتن کامپوننت‌ها به‌عنوان توابع خالص و قابل‌پیش‌بینی، **[خالص نگه‌داشتن کامپوننت‌ها](/learn/keeping-components-pure)** را بخوانید.

</LearnMore>

## رابط کاربری شما به‌صورت یک درخت {/*your-ui-as-a-tree*/}

ری‌اکت برای مدل‌سازی روابط بین کامپوننت‌ها و ماژول‌ها از درخت‌ها استفاده می‌کند.

درخت رندر ری‌اکت نمایشی از رابطه‌ی والد و فرزندی بین کامپوننت‌هاست.

<Diagram name="generic_render_tree" height={250} width={500} alt="A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.">

یک نمونه از درخت رندر ری‌اکت.

</Diagram>

کامپوننت‌هایی که نزدیک بالای درخت، در مجاورت کامپوننت ریشه هستند، کامپوننت‌های سطح‌بالایی در نظر گرفته می‌شوند. کامپوننت‌هایی که فرزندی ندارند، کامپوننت‌های برگ هستند. این دسته‌بندی کامپوننت‌ها برای درک جریان داده و عملکرد رندر مفید است.

مدل‌سازی رابطه‌ی بین ماژول‌های جاوااسکریپت روش مفید دیگری برای درک اپلیکیشن شماست. ما به آن درخت وابستگی ماژول می‌گوییم.

<Diagram name="generic_dependency_tree" height={250} width={500} alt="A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.">

یک نمونه از درخت وابستگی ماژول.

</Diagram>

از درخت وابستگی غالباً برای باندل کردن همه‌ی کدهای جاوااسکریپت مرتبط، توسط ابزارهای بیلد، استفاده می‌شود تا کلاینت آن‌ها را دانلود و رندر کند. حجم باندل بزرگ، تجربه‌ی کاربری اپلیکیشن‌های ری‌اکت را تنزل می‌دهد. درک درخت وابستگی ماژول برای رفع چنین مسائلی مفید است.

<LearnMore path="/learn/understanding-your-ui-as-a-tree">

برای یادگیری نحوه‌ی ساخت درخت رندر و درخت وابستگی ماژول برای یک اپلیکیشن ری‌اکت و اینکه چرا آن‌ها مدل‌های ذهنی مفیدی برای بهبود تجربه‌ی کاربری و عملکرد هستند، **[رابط کاربری شما به‌صورت یک درخت](/learn/understanding-your-ui-as-a-tree)** را بخوانید.

</LearnMore>


## ادامه‌ی کار چیست؟ {/*whats-next*/}

به [اولین کامپوننت شما](/learn/your-first-component) بروید تا خواندن این فصل را صفحه‌به‌صفحه آغاز کنید!

یا، اگر از قبل با این موضوعات آشنا هستید، چرا درباره‌ی [افزودن تعامل‌پذیری](/learn/adding-interactivity) نخوانید؟
