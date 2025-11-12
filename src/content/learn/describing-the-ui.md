---
title: توصیف رابط کاربری
---

<Intro>

ری اکت یک کتابخانه JavaScript برای رندر کردن رابط‌های کاربری (UI) است. رابط کاربری از واحدهای کوچکی مانند دکمه‌ها، متن و تصاویر ساخته می‌شود. React به شما اجازه می‌دهد آن‌ها را در *کامپوننت‌های* قابل استفاده مجدد و تو در تو ترکیب کنید. از وب‌سایت‌ها گرفته تا اپلیکیشن‌های موبایل، هر چیزی روی صفحه نمایش را می‌توان به کامپوننت‌ها تقسیم کرد. در این فصل، یاد خواهید گرفت که چگونه کامپوننت‌های React را ایجاد، سفارشی‌سازی و به صورت شرطی نمایش دهید.

</Intro>

<YouWillLearn isChapter={true}>

* [چگونه اولین کامپوننت React خود را بنویسید](/learn/your-first-component)
* [چه زمانی و چگونه فایل‌های چند کامپوننتی ایجاد کنید](/learn/importing-and-exporting-components)
* [چگونه نشانه‌گذاری را با JSX به JavaScript اضافه کنید](/learn/writing-markup-with-jsx)
* [چگونه از آکولاد با JSX برای دسترسی به قابلیت‌های JavaScript از کامپوننت‌های خود استفاده کنید](/learn/javascript-in-jsx-with-curly-braces)
* [چگونه کامپوننت‌ها را با props پیکربندی کنید](/learn/passing-props-to-a-component)
* [چگونه کامپوننت‌ها را به صورت شرطی رندر کنید](/learn/conditional-rendering)
* [چگونه چندین کامپوننت را به طور همزمان رندر کنید](/learn/rendering-lists)
* [چگونه با خالص نگه داشتن کامپوننت‌ها از باگ‌های گیج‌کننده جلوگیری کنید](/learn/keeping-components-pure)
* [چرا درک رابط کاربری شما به عنوان درخت مفید است](/learn/understanding-your-ui-as-a-tree)

</YouWillLearn>

## اولین کامپوننت شما {/*your-first-component*/}

اپلیکیشن‌های React از قطعات جدا شده رابط کاربری به نام *کامپوننت* ساخته می‌شوند. یک کامپوننت React یک تابع JavaScript است که می‌توانید آن را با نشانه‌گذاری تزئین کنید. کامپوننت‌ها می‌توانند به کوچکی یک دکمه یا به بزرگی یک صفحه کامل باشند. در اینجا یک کامپوننت `Gallery` است که سه کامپوننت `Profile` را رندر می‌کند:

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

**[اولین کامپوننت شما](/learn/your-first-component)** را بخوانید تا یاد بگیرید چگونه کامپوننت‌های React را تعریف و استفاده کنید.

</LearnMore>

## Import و export کردن کامپوننت‌ها {/*importing-and-exporting-components*/}

می‌توانید کامپوننت‌های زیادی را در یک فایل تعریف کنید، اما فایل‌های بزرگ می‌توانند پیمایش را دشوار کنند. برای حل این مشکل، می‌توانید یک کامپوننت را در فایل مخصوص به خودش *export* کنید و سپس آن کامپوننت را از فایل دیگری *import* کنید:


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

**[Import و Export کردن کامپوننت‌ها](/learn/importing-and-exporting-components)** را بخوانید تا یاد بگیرید چگونه کامپوننت‌ها را به فایل‌های مجزا تقسیم کنید.

</LearnMore>

## نوشتن نشانه‌گذاری با JSX {/*writing-markup-with-jsx*/}

هر کامپوننت React یک تابع JavaScript است که ممکن است شامل مقداری نشانه‌گذاری باشد که React آن را در مرورگر رندر می‌کند. کامپوننت‌های React از یک افزونه سینتکس به نام JSX برای نمایش آن نشانه‌گذاری استفاده می‌کنند. JSX بسیار شبیه HTML است، اما کمی سخت‌گیرانه‌تر است و می‌تواند اطلاعات پویا را نمایش دهد.

اگر نشانه‌گذاری HTML موجود را در یک کامپوننت React کپی کنیم، همیشه کار نخواهد کرد:

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

اگر HTML موجودی مانند این دارید، می‌توانید آن را با استفاده از یک [مبدل](https://transform.tools/html-to-jsx) اصلاح کنید:

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

**[نوشتن نشانه‌گذاری با JSX](/learn/writing-markup-with-jsx)** را بخوانید تا یاد بگیرید چگونه JSX معتبر بنویسید.

</LearnMore>

## JavaScript در JSX با آکولاد {/*javascript-in-jsx-with-curly-braces*/}

JSX به شما اجازه می‌دهد نشانه‌گذاری شبیه HTML را داخل یک فایل JavaScript بنویسید و منطق رندر و محتوا را در یک مکان نگه دارید. گاهی اوقات می‌خواهید کمی منطق JavaScript اضافه کنید یا به یک ویژگی پویا داخل آن نشانه‌گذاری ارجاع دهید. در این شرایط، می‌توانید از آکولاد در JSX خود استفاده کنید تا "پنجره‌ای به JavaScript باز کنید":

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

**[JavaScript در JSX با آکولاد](/learn/javascript-in-jsx-with-curly-braces)** را بخوانید تا یاد بگیرید چگونه از JSX به داده‌های JavaScript دسترسی پیدا کنید.

</LearnMore>

## انتقال props به یک کامپوننت {/*passing-props-to-a-component*/}

کامپوننت‌های React از *props* برای برقراری ارتباط با یکدیگر استفاده می‌کنند. هر کامپوننت والد می‌تواند با دادن props به کامپوننت‌های فرزند خود، اطلاعاتی را منتقل کند. Props ممکن است شما را به یاد ویژگی‌های HTML بیندازد، اما می‌توانید هر مقدار JavaScript را از طریق آن‌ها منتقل کنید، از جمله اشیاء، آرایه‌ها، توابع و حتی JSX!

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

**[انتقال Props به یک کامپوننت](/learn/passing-props-to-a-component)** را بخوانید تا یاد بگیرید چگونه props را منتقل و خوانش کنید.

</LearnMore>

## رندر شرطی {/*conditional-rendering*/}

کامپوننت‌های شما اغلب نیاز دارند که بسته به شرایط مختلف، چیزهای متفاوتی را نمایش دهند. در React، می‌توانید JSX را به صورت شرطی با استفاده از سینتکس JavaScript مانند دستورات `if`، عملگرهای `&&` و `? :` رندر کنید.

در این مثال، از عملگر `&&` در JavaScript برای رندر شرطی یک علامت تیک استفاده شده است:

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

**[رندر شرطی](/learn/conditional-rendering)** را بخوانید تا روش‌های مختلف رندر شرطی محتوا را یاد بگیرید.

</LearnMore>

## رندر کردن لیست‌ها {/*rendering-lists*/}

اغلب می‌خواهید چندین کامپوننت مشابه را از یک مجموعه داده نمایش دهید. می‌توانید از متدهای `filter()` و `map()` در JavaScript به همراه React استفاده کنید تا آرایه داده‌های خود را فیلتر و تبدیل به آرایه‌ای از کامپوننت‌ها کنید.

برای هر آیتم آرایه، باید یک `key` مشخص کنید. معمولاً می‌خواهید از یک ID از پایگاه داده به عنوان `key` استفاده کنید. کلیدها به React اجازه می‌دهند موقعیت هر آیتم را در لیست پیگیری کند، حتی اگر لیست تغییر کند.

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

**[رندر کردن لیست‌ها](/learn/rendering-lists)** را بخوانید تا یاد بگیرید چگونه لیستی از کامپوننت‌ها را رندر کنید و چگونه یک کلید انتخاب کنید.

</LearnMore>

## خالص نگه داشتن کامپوننت‌ها {/*keeping-components-pure*/}

برخی از توابع JavaScript *خالص* هستند. یک تابع خالص:

* **به کار خود می‌رسد.** هیچ شیء یا متغیری را که قبل از فراخوانی آن وجود داشته است، تغییر نمی‌دهد.
* **ورودی‌های یکسان، خروجی یکسان.** با دریافت ورودی‌های یکسان، یک تابع خالص همیشه باید نتیجه یکسانی را برگرداند.

با نوشتن کامپوننت‌های خود به صورت صرفاً توابع خالص، می‌توانید از یک دسته کامل از باگ‌های گیج‌کننده و رفتارهای غیرقابل پیش‌بینی با رشد کدبیس خود جلوگیری کنید. در اینجا نمونه‌ای از یک کامپوننت ناخالص است:

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

می‌توانید این کامپوننت را با انتقال یک prop به جای تغییر متغیر از پیش موجود، خالص کنید:

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

**[خالص نگه داشتن کامپوننت‌ها](/learn/keeping-components-pure)** را بخوانید تا یاد بگیرید چگونه کامپوننت‌ها را به عنوان توابع خالص و قابل پیش‌بینی بنویسید.

</LearnMore>

## رابط کاربری شما به عنوان یک درخت {/*your-ui-as-a-tree*/}

React از درخت‌ها برای مدل‌سازی روابط بین کامپوننت‌ها و ماژول‌ها استفاده می‌کند.

درخت رندر React نمایشی از رابطه والد و فرزند بین کامپوننت‌ها است.

<Diagram name="generic_render_tree" height={250} width={500} alt="A tree graph with five nodes, with each node representing a component. The root node is located at the top the tree graph and is labelled 'Root Component'. It has two arrows extending down to two nodes labelled 'Component A' and 'Component C'. Each of the arrows is labelled with 'renders'. 'Component A' has a single 'renders' arrow to a node labelled 'Component B'. 'Component C' has a single 'renders' arrow to a node labelled 'Component D'.">

یک نمونه درخت رندر React.

</Diagram>

کامپوننت‌هایی که نزدیک به بالای درخت، نزدیک به کامپوننت ریشه هستند، کامپوننت‌های سطح بالا در نظر گرفته می‌شوند. کامپوننت‌هایی که هیچ کامپوننت فرزندی ندارند، کامپوننت‌های برگ هستند. این دسته‌بندی کامپوننت‌ها برای درک جریان داده و عملکرد رندر مفید است.

مدل‌سازی رابطه بین ماژول‌های JavaScript، راه مفید دیگری برای درک اپلیکیشن شما است. ما به آن درخت وابستگی ماژول می‌گوییم.

<Diagram name="generic_dependency_tree" height={250} width={500} alt="A tree graph with five nodes. Each node represents a JavaScript module. The top-most node is labelled 'RootModule.js'. It has three arrows extending to the nodes: 'ModuleA.js', 'ModuleB.js', and 'ModuleC.js'. Each arrow is labelled as 'imports'. 'ModuleC.js' node has a single 'imports' arrow that points to a node labelled 'ModuleD.js'.">

یک نمونه درخت وابستگی ماژول.

</Diagram>

یک درخت وابستگی اغلب توسط ابزارهای ساخت برای بسته‌بندی تمام کدهای JavaScript مرتبط جهت دانلود و رندر توسط کلاینت استفاده می‌شود. اندازه بسته بزرگ، تجربه کاربری را برای اپلیکیشن‌های React کاهش می‌دهد. درک درخت وابستگی ماژول برای رفع اشکال چنین مشکلاتی مفید است.

<LearnMore path="/learn/understanding-your-ui-as-a-tree">

**[رابط کاربری شما به عنوان یک درخت](/learn/understanding-your-ui-as-a-tree)** را بخوانید تا یاد بگیرید چگونه درخت‌های رندر و وابستگی ماژول را برای یک اپلیکیشن React ایجاد کنید و چگونه آن‌ها مدل‌های ذهنی مفیدی برای بهبود تجربه کاربری و عملکرد هستند.

</LearnMore>


## بعدش چی؟ {/*whats-next*/}

به [اولین کامپوننت شما](/learn/your-first-component) بروید تا شروع به خواندن این فصل صفحه به صفحه کنید!

یا اگر از قبل با این موضوعات آشنا هستید، چرا درباره [افزودن تعاملی‌بودن](/learn/adding-interactivity) نخوانید؟
