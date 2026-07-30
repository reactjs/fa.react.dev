---
title: انتقال عمیق داده‌ها با کانتکست
---

<Intro>

معمولاً شما اطلاعات را از یک کامپوننت والد به یک کامپوننت فرزند از طریق پراپس انتقال می‌دهید. اما انتقال پراپس می‌تواند طولانی و ناراحت‌کننده شود اگر مجبور باشید آن‌ها را از میان بسیاری از کامپوننت‌های میانی عبور دهید، یا اگر بسیاری از کامپوننت‌های برنامهٔ شما به یک اطلاعات مشابه نیاز داشته باشند. *کانتکست (Context)* به کامپوننت والد اجازه می‌دهد برخی اطلاعات را به هر کامپوننتی در درخت زیرین خود—بدون توجه به عمق—دسترس‌پذیر کند، بدون آنکه آن را به‌طور صریح از طریق پراپس ارسال کند.

</Intro>

<YouWillLearn>

- «prop drilling» چیست
- چگونه انتقال تکراری پراپس را با کانتکست جایگزین کنیم
- موارد استفادهٔ رایج برای کانتکست
- جایگزین‌های رایج برای کانتکست

</YouWillLearn>

## مشکل انتقال پراپس {/*the-problem-with-passing-props*/}

[انتقال پراپس](/learn/passing-props-to-a-component) راهی عالی برای انتقال صریح داده‌ها از طریق درخت رابط کاربری به کامپوننت‌هایی است که از آن استفاده می‌کنند.

اما انتقال پراپس می‌تواند طولانی و ناراحت‌کننده شود وقتی لازم باشد یک پراپس را عمیقاً در درخت عبور دهید، یا اگر بسیاری از کامپوننت‌ها به یک پراپس مشابه نیاز داشته باشند. نزدیک‌ترین جد مشترک ممکن است از کامپوننت‌هایی که به داده نیاز دارند بسیار دور باشد و [بالا بردن استیت](/learn/sharing-state-between-components) تا آن سطح می‌تواند به وضعیتی منجر شود که «prop drilling» نامیده می‌شود.

<DiagramGroup>

<Diagram name="passing_data_lifting_state" height={160} width={608} captionPosition="top" alt="Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in purple. The value flows down to each of the two children, both highlighted in purple." >

بالا بردن استیت

</Diagram>
<Diagram name="passing_data_prop_drilling" height={430} width={608} captionPosition="top" alt="Diagram with a tree of ten nodes, each node with two children or less. The root node contains a bubble representing a value highlighted in purple. The value flows down through the two children, each of which pass the value but do not contain it. The left child passes the value down to two children which are both highlighted purple. The right child of the root passes the value through to one of its two children - the right one, which is highlighted purple. That child passed the value through its single child, which passes it down to both of its two children, which are highlighted purple.">

prop drilling

</Diagram>

</DiagramGroup>

آیا خوب نمی‌شد اگر راهی برای «دورنوردی» داده‌ها به کامپوننت‌هایی در درخت که به آن نیاز دارند، بدون عبور از پراپس وجود داشت؟ با قابلیت کانتکست ری‌اکت، چنین راهی وجود دارد!

## کانتکست: جایگزینی برای انتقال پراپس {/*context-an-alternative-to-passing-props*/}

کانتکست به یک کامپوننت والد اجازه می‌دهد داده‌ها را به کل درخت زیرین خود ارائه دهد. کاربردهای زیادی برای کانتکست وجود دارد. در اینجا یک مثال آورده شده است. این کامپوننت `Heading` را در نظر بگیرید که یک `level` برای اندازهٔ خود می‌پذیرد:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Heading level={2}>Heading</Heading>
      <Heading level={3}>Sub-heading</Heading>
      <Heading level={4}>Sub-sub-heading</Heading>
      <Heading level={5}>Sub-sub-sub-heading</Heading>
      <Heading level={6}>Sub-sub-sub-sub-heading</Heading>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

فرض کنید می‌خواهید چندین عنوان درون یک `Section` یکسان همیشه اندازهٔ مشابهی داشته باشند:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

در حال حاضر، پراپس `level` را به‌طور جداگانه به هر `<Heading>` ارسال می‌کنید:

```js
<Section>
  <Heading level={3}>About</Heading>
  <Heading level={3}>Photos</Heading>
  <Heading level={3}>Videos</Heading>
</Section>
```

خوب می‌شد اگر می‌توانستید پراپس `level` را به‌جای آن به کامپوننت `<Section>` ارسال کنید و آن را از `<Heading>` حذف نمایید. به این ترتیب می‌توانستید اطمینان حاصل کنید که همهٔ عناوین در یک بخش اندازهٔ یکسانی دارند:

```js
<Section level={3}>
  <Heading>About</Heading>
  <Heading>Photos</Heading>
  <Heading>Videos</Heading>
</Section>
```

اما کامپوننت `<Heading>` چگونه می‌تواند سطح نزدیک‌ترین `<Section>` به خود را بداند؟ **این کار نیازمند روشی است که یک فرزند بتواند از somewhere بالا در درخت داده «بخواهد».**

شما نمی‌توانید این کار را تنها با پراپس انجام دهید. اینجاست که کانتکست به بازی می‌آید. شما این کار را در سه مرحله انجام خواهید داد:

1. یک کانتکست **ایجاد** کنید. (می‌توانید آن را `LevelContext` بنامید، زیرا برای سطح عنوان است.)
2. از آن کانتکست در کامپوننتی که به داده نیاز دارد **استفاده** کنید. (`Heading` از `LevelContext` استفاده خواهد کرد.)
3. آن کانتکست را از کامپوننتی که داده را تعیین می‌کند **ارائه** کنید. (`Section` ارائه‌دهندهٔ `LevelContext` خواهد بود.)

کانتکست به یک والد—حتی یک والد دور!—اجازه می‌دهد داده‌هایی را به کل درخت درون خود ارائه دهد.

<DiagramGroup>

<Diagram name="passing_data_context_close" height={160} width={608} captionPosition="top" alt="Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in orange which projects down to the two children, each highlighted in orange." >

استفاده از کانتکست در فرزندان نزدیک

</Diagram>

<Diagram name="passing_data_context_far" height={430} width={608} captionPosition="top" alt="Diagram with a tree of ten nodes, each node with two children or less. The root parent node contains a bubble representing a value highlighted in orange. The value projects down directly to four leaves and one intermediate component in the tree, which are all highlighted in orange. None of the other intermediate components are highlighted.">

استفاده از کانتکست در فرزندان دور

</Diagram>

</DiagramGroup>

### مرحلهٔ ۱: ایجاد کانتکست {/*step-1-create-the-context*/}

ابتدا باید کانتکست را ایجاد کنید. باید آن را **از یک فایل export کنید** تا کامپوننت‌های شما بتوانند از آن استفاده کنند:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading level={1}>Title</Heading>
      <Section>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Heading level={2}>Heading</Heading>
        <Section>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Heading level={3}>Sub-heading</Heading>
          <Section>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
            <Heading level={4}>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
export default function Heading({ level, children }) {
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js active
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

تنها آرگومان `createContext` مقدار _پیش‌فرض_ است. در اینجا، `1` به بزرگ‌ترین سطح عنوان اشاره دارد، اما می‌توانید هر نوع مقداری (حتی یک شیء) را ارسال کنید. اهمیت مقدار پیش‌فرض را در مرحلهٔ بعد خواهید دید.

### مرحلهٔ ۲: استفاده از کانتکست {/*step-2-use-the-context*/}

هوک `useContext` را از ری‌اکت و کانتکست خود import کنید:

```js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';
```

در حال حاضر، کامپوننت `Heading` مقدار `level` را از پراپس می‌خواند:

```js
export default function Heading({ level, children }) {
  // ...
}
```

به‌جای آن، پراپس `level` را حذف کنید و مقدار را از کانتکسی که به‌تازگی import کرده‌اید، `LevelContext`، بخوانید:

```js {2}
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```

`useContext` یک هوک است. درست مانند `useState` و `useReducer`، شما فقط می‌توانید یک هوک را مستقیماً درون یک کامپوننت ری‌اکت فراخوانی کنید (نه درون حلقه‌ها یا شرط‌ها). **`useContext` به ری‌اکت می‌گوید که کامپوننت `Heading` می‌خواهد `LevelContext` را بخواند.**

حالا که کامپوننت `Heading` پراپس `level` ندارد، دیگر نیازی نیست پراپس level را در JSX خود این‌گونه به `Heading` ارسال کنید:

```js
<Section>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
  <Heading level={4}>Sub-sub-heading</Heading>
</Section>
```

JSX را به‌گونه‌ای به‌روزرسانی کنید که `Section` آن را دریافت کند:

```jsx
<Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section>
```

به‌عنوان یادآوری، این نشانه‌گذاری‌ای است که سعی می‌کردید به‌کار بیندازید:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

توجه کنید که این مثال هنوز درست کار نمی‌کند! همهٔ عناوین اندازهٔ یکسانی دارند زیرا **با این که شما کانتکست را *استفاده* می‌کنید، هنوز آن را *ارائه* نکرده‌اید.** ری‌اکت نمی‌داند آن را از کجا بگیرد!

اگر کانتکست را ارائه نکنید، ری‌اکت از مقدار پیش‌فرضی که در مرحلهٔ قبل تعیین کرده‌اید استفاده خواهد کرد. در این مثال، شما `1` را به‌عنوان آرگومان `createContext` تعیین کرده‌اید، پس `useContext(LevelContext)` مقدار `1` را برمی‌گرداند و همهٔ آن عناوین را به `<h1>` تبدیل می‌کند. بیایید این مشکل را با اینکه هر `Section` کانتکست خود را ارائه کند، رفع کنیم.

### مرحلهٔ ۳: ارائهٔ کانتکست {/*step-3-provide-the-context*/}

کامپوننت `Section` در حال حاضر فرزندان خود را رندر می‌کند:

```js
export default function Section({ children }) {
  return (
    <section className="section">
      {children}
    </section>
  );
}
```

**آن‌ها را با یک ارائه‌دهندهٔ کانتکست (context provider) بپیچید** تا `LevelContext` را به آن‌ها ارائه دهید:

```js {1,6,8}
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

این به ری‌اکت می‌گوید: «اگر هر کامپوننتی درون این `<Section>` درخواست `LevelContext` کرد، این `level` را به آن بده.» کامپوننت از مقدار نزدیک‌ترین `<LevelContext>` در درخت رابط کاربری بالای خود استفاده خواهد کرد.

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section level={3}>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section level={4}>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(1);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

نتیجه همانند کد اصلی است، اما نیازی نداشتید پراپس `level` را به هر کامپوننت `Heading` ارسال کنید! در عوض، آن سطح عنوان خود را با پرسیدن از نزدیک‌ترین `Section` بالای خود «تشخیص می‌دهد»:

1. شما یک پراپس `level` به `<Section>` ارسال می‌کنید.
2. `Section` فرزندان خود را درون `<LevelContext value={level}>` می‌پیچد.
3. `Heading` با `useContext(LevelContext)` نزدیک‌ترین مقدار `LevelContext` بالای خود را می‌پرسد.

## استفاده و ارائهٔ کانتکست از یک کامپوننت {/*using-and-providing-context-from-the-same-component*/}

در حال حاضر، شما همچنان باید `level` هر بخش را به‌صورت دستی تعیین کنید:

```js
export default function Page() {
  return (
    <Section level={1}>
      ...
      <Section level={2}>
        ...
        <Section level={3}>
          ...
```

از آنجا که کانتکست به شما اجازه می‌دهد اطلاعات را از یک کامپوننت بالا بخوانید، هر `Section` می‌تواند `level` را از `Section` بالای خود بخواند و `level + 1` را به‌طور خودکار به پایین ارسال کند. در اینجا نحوه انجام آن آورده شده است:

```js src/Section.js {5,8}
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

با این تغییر، شما نیازی ندارید پراپس `level` را *نه* به `<Section>` و *نه* به `<Heading>` ارسال کنید:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}
```

</Sandpack>

حالا هم `Heading` و هم `Section` از `LevelContext` می‌خوانند تا بفهمند چقدر «عمیق» هستند. و `Section` فرزندان خود را درون `LevelContext` می‌پیچد تا مشخص کند هر چیزی درون آن در سطحی «عمیق‌تر» قرار دارد.

<Note>

این مثال از سطوح عنوان استفاده می‌کند زیرا به‌صورت بصری نشان می‌دهد چگونه کامپوننت‌های تودرتو می‌توانند کانتکست را بازنویسی کنند. اما کانتکست برای بسیاری از موارد استفادهٔ دیگر هم مفید است. شما می‌توانید هر اطلاعاتی که توسط کل زیردرخت نیاز است را به پایین ارسال کنید: تم رنگ فعلی، کاربر فعلاً وارد شده، و غیره.

</Note>

## کانتکست از کامپوننت‌های میانی عبور می‌کند {/*context-passes-through-intermediate-components*/}

شما می‌توانید به هر تعداد کامپوننت که می‌خواهید بین کامپوننتی که کانتکست را ارائه می‌کند و کامپوننتی که از آن استفاده می‌کند، قرار دهید. این شامل هر دو کامپوننت داخلی مانند `<div>` و کامپوننت‌هایی که خودتان ممکن است بسازید، می‌شود.

در این مثال، همان کامپوننت `Post` (با حاشیهٔ نقطه‌چین) در دو سطح تودرتویی متفاوت رندر می‌شود. توجه کنید که `<Heading>` درون آن سطح خود را به‌طور خودکار از نزدیک‌ترین `<Section>` می‌گیرد:

<Sandpack>

```js
import Heading from './Heading.js';
import Section from './Section.js';

export default function ProfilePage() {
  return (
    <Section>
      <Heading>My Profile</Heading>
      <Post
        title="Hello traveller!"
        body="Read about my adventures."
      />
      <AllPosts />
    </Section>
  );
}

function AllPosts() {
  return (
    <Section>
      <Heading>Posts</Heading>
      <RecentPosts />
    </Section>
  );
}

function RecentPosts() {
  return (
    <Section>
      <Heading>Recent Posts</Heading>
      <Post
        title="Flavors of Lisbon"
        body="...those pastéis de nata!"
      />
      <Post
        title="Buenos Aires in the rhythm of tango"
        body="I loved it!"
      />
    </Section>
  );
}

function Post({ title, body }) {
  return (
    <Section isFancy={true}>
      <Heading>
        {title}
      </Heading>
      <p><i>{body}</i></p>
    </Section>
  );
}
```

```js src/Section.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children, isFancy }) {
  const level = useContext(LevelContext);
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```

```js src/Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```js src/LevelContext.js
import { createContext } from 'react';

export const LevelContext = createContext(0);
```

```css
.section {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #aaa;
}

.fancy {
  border: 4px dashed pink;
}
```

</Sandpack>

شما برای کار کردن این مورد هیچ کار خاصی نکردید. یک `Section` کانتکست را برای درخت درون خود تعیین می‌کند، بنابراین می‌توانید یک `<Heading>` را در هر جایی قرار دهید و اندازهٔ صحیحی خواهد داشت. آن را در سندباکس بالا امتحان کنید!

**کانتکست به شما اجازه می‌دهد کامپوننت‌هایی بنویسید که «با محیط خود تطبیق می‌یابند» و بسته به _کجا_ (یا به عبارت دیگر، _در کدام کانتکست_) رندر می‌شوند، خود را متفاوت نمایش دهند.**

نحوهٔ کار کانتکست ممکن است شما را به [ارث‌بری ویژگی‌های CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) یادآوری کند. در CSS، می‌توانید `color: blue` را برای یک `<div>` تعیین کنید، و هر نود DOM درون آن، بدون توجه به عمق، آن رنگ را به ارث می‌برد مگر اینکه یک نود DOM دیگر در میانه آن را با `color: green` بازنویسی کند. به طور مشابه، در ری‌اکت، تنها راه برای بازنویسی یک کانتکست که از بالا می‌آید، پیچاندن فرزندان درون یک ارائه‌دهندهٔ کانتکست با مقدار متفاوت است.

در CSS، ویژگی‌های متفاوتی مانند `color` و `background-color` یکدیگر را بازنویسی نمی‌کنند. می‌توانید `color` همهٔ `<div>`ها را روی قرمز تنظیم کنید بدون اینکه به `background-color` تأثیری بگذارد. به طور مشابه، **کانتکست‌های متفاوت ری‌اکت یکدیگر را بازنویسی نمی‌کنند.** هر کانتکستی که با `createContext()` می‌سازید کاملاً از بقیه جدا است و کامپوننت‌هایی که از *آن کانتکست خاص* استفاده و آن را ارائه می‌کنند، به هم متصل می‌کند. یک کامپوننت می‌تواند بدون مشکل از کانتکست‌های متفاوتی استفاده یا آن‌ها را ارائه کند.

## پیش از استفاده از کانتکست {/*before-you-use-context*/}

استفاده از کانتکست بسیار وسوسه‌کننده است! با این حال، این به این معناست که بیش از حد از آن استفاده کردن آسان است. **صرفاً به این دلیل که نیاز دارید برخی پراپس‌ها را چند سطح عمیق ارسال کنید، به این معنا نیست که باید آن اطلاعات را در کانتکست قرار دهید.**

در اینجا چند جایگزین آورده شده که باید پیش از استفاده از کانتکست در نظر بگیرید:

1. **با [انتقال پراپس](/learn/passing-props-to-a-component) شروع کنید.** اگر کامپوننت‌های شما بدیهی نیستند، دور از انتظار نیست که یک دوجین پراپس را از میان یک دوجین کامپوننت عبور دهید. ممکن است خسته‌کننده به نظر برسد، اما بسیار روشن می‌کند که کدام کامپوننت‌ها از کدام داده‌ها استفاده می‌کنند! فردی که کد شما را نگهداری می‌کند خوشحال خواهد شد که جریان داده را با پراپس صریح کرده‌اید.
2. **کامپوننت‌ها را استخراج کنید و [JSX را به‌عنوان `children` به آن‌ها ارسال کنید](/learn/passing-props-to-a-component#passing-jsx-as-children).** اگر برخی داده‌ها را از میان بسیاری از لایه‌های کامپوننت‌های میانی عبور می‌دهید که از آن داده استفاده نمی‌کنند (و فقط آن را به پایین‌تر ارسال می‌کنند)، این اغلب به این معناست که فراموش کرده‌اید در مسیر برخی کامپوننت‌ها را استخراج کنید. مثلاً شاید پراپس داده‌ای مانند `posts` را به کامپوننت‌های بصری ارسال می‌کنید که مستقیماً از آن‌ها استفاده نمی‌کنند، مانند `<Layout posts={posts} />`. در عوض، `Layout` را طوری بسازید که `children` را به‌عنوان پراپس بپذیرد و `<Layout><Posts posts={posts} /></Layout>` را رندر کنید. این کار تعداد لایه‌ها بین کامپوننتی که داده را تعیین می‌کند و کامپوننتی که به آن نیاز دارد را کاهش می‌دهد.

اگر هیچ‌کدام از این رویکردها برای شما به‌خوبی کار نکرد، کانتکست را در نظر بگیرید.

## موارد استفاده برای کانتکست {/*use-cases-for-context*/}

* **تم‌پذیری (Theming):** اگر برنامهٔ شما به کاربر اجازه می‌دهد ظاهر آن را تغییر دهد (مثلاً حالت تیره)، می‌توانید یک ارائه‌دهندهٔ کانتکست در بالای برنامه خود قرار دهید و از آن کانتکست در کامپوننت‌هایی که باید ظاهر بصری خود را تنظیم کنند استفاده کنید.
* **حساب کاربری فعلی:** بسیاری از کامپوننت‌ها ممکن است نیاز داشته باشند کاربر فعلاً وارد شده را بدانند. قرار دادن آن در کانتکست، خواندن آن را در هر جایی از درخت راحت می‌کند. برخی برنامه‌ها همچنین به شما اجازه می‌دهند همزمان روی چند حساب کاربری عمل کنید (مثلاً برای گذاشتن نظر به‌عنوان کاربری متفاوت). در این موارد، می‌توان راحت بخشی از رابط کاربری را درون یک ارائه‌دهندهٔ تودرتویی با مقدار حساب کاربری فعلی متفاوت پیچید.
* **مسیریابی (Routing):** بیشتر راه‌حل‌های مسیریابی از کانتکست به‌صورت داخلی برای نگه‌داشتن مسیر فعلی استفاده می‌کنند. این روشی است که هر لینک «می‌داند» فعال است یا خیر. اگر مسیریاب خودتان را می‌سازید، ممکن است بخواهید شما هم همین کار را بکنید.
* **مدیریت استیت:** با رشد برنامهٔ شما، ممکن است با استیت زیادی نزدیک به بالای برنامهٔ خود مواجه شوید. بسیاری از کامپوننت‌های دورِ پایین ممکن است بخواهند آن را تغییر دهند. معمول است که برای مدیریت استیت پیچیده و انتقال آن به کامپوننت‌های دور بدون دردسر زیاد، [از یک ردیوسر همراه با کانتکست استفاده کنید](/learn/scaling-up-with-reducer-and-context).
  
کانتکست محدود به مقادیر ایستا نیست. اگر در رندر بعدی مقدار متفاوتی ارسال کنید، ری‌اکت همهٔ کامپوننت‌هایی که آن را در پایین می‌خوانند به‌روزرسانی خواهد کرد! به همین دلیل کانتکست اغلب در ترکیب با استیت استفاده می‌شود.

به‌طور کلی، اگر اطلاعاتی توسط کامپوننت‌های دور در بخش‌های مختلف درخت نیاز باشد، این نشان خوبی است که کانتکست به شما کمک خواهد کرد.

<Recap>

* کانتکست به یک کامپوننت اجازه می‌دهد اطلاعاتی را به کل درخت زیرین خود ارائه دهد.
* برای انتقال کانتکست:
  1. آن را با `export const MyContext = createContext(defaultValue)` ایجاد و export کنید.
  2. آن را به هوک `useContext(MyContext)` ارسال کنید تا در هر کامپوننت فرزند، بدون توجه به عمق، خوانده شود.
  3. فرزندان را درون `<MyContext value={...}>` بپیچید تا از یک والد ارائه شود.
* کانتکست از هر کامپوننت میانی عبور می‌کند.
* کانتکست به شما اجازه می‌دهد کامپوننت‌هایی بنویسید که «با محیط خود تطبیق می‌یابند».
* پیش از استفاده از کانتکست، انتقال پراپس یا ارسال JSX به‌عنوان `children` را امتحان کنید.

</Recap>

<Challenges>

#### جایگزینی prop drilling با کانتکست {/*replace-prop-drilling-with-context*/}

در این مثال، تغییر وضعیت چک‌باکس پراپس `imageSize` ارسالی به هر `<PlaceImage>` را تغییر می‌دهد. استیت چک‌باکس در کامپوننت سطح بالای `App` نگه‌داری می‌شود، اما هر `<PlaceImage>` باید از آن آگاه باشد.

در حال حاضر، `App` مقدار `imageSize` را به `List` ارسال می‌کند، که آن را به هر `Place` ارسال می‌کند، که آن را به `PlaceImage` ارسال می‌کند. پراپس `imageSize` را حذف کنید و به‌جای آن آن را مستقیماً از کامپوننت `App` به `PlaceImage` ارسال کنید.

می‌توانید کانتکست را در `Context.js` تعریف کنید.

<Sandpack>

```js src/App.js
import { useState } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List imageSize={imageSize} />
    </>
  )
}

function List({ imageSize }) {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place
        place={place}
        imageSize={imageSize}
      />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place, imageSize }) {
  return (
    <>
      <PlaceImage
        place={place}
        imageSize={imageSize}
      />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place, imageSize }) {
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
```

```js src/Context.js

```

```js src/data.js
export const places = [{
  id: 0,
  name: 'Bo-Kaap in Cape Town, South Africa',
  description: 'The tradition of choosing bright colors for houses began in the late 20th century.',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: 'Rainbow Village in Taichung, Taiwan',
  description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: 'Macromural de Pachuca, Mexico',
  description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: 'Selarón Staircase in Rio de Janeiro, Brazil',
  description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a "tribute to the Brazilian people."',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: 'Burano, Italy',
  description: 'The houses are painted following a specific color system dating back to 16th century.',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: 'Chefchaouen, Marocco',
  description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: 'Gamcheon Culture Village in Busan, South Korea',
  description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',
  imageId: 'ZfQOOzf'
}];
```

```js src/utils.js
export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
```

</Sandpack>

<Solution>

پراپس `imageSize` را از همهٔ کامپوننت‌ها حذف کنید.

`ImageSizeContext` را در `Context.js` ایجاد و export کنید. سپس `List` را درون `<ImageSizeContext value={imageSize}>` بپیچید تا مقدار را به پایین ارسال کند، و از `useContext(ImageSizeContext)` در `PlaceImage` برای خواندن آن استفاده کنید:

<Sandpack>

```js src/App.js
import { useState, useContext } from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import { ImageSizeContext } from './Context.js';

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <ImageSizeContext
      value={imageSize}
    >
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={e => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />
      <List />
    </ImageSizeContext>
  )
}

function List() {
  const listItems = places.map(place =>
    <li key={place.id}>
      <Place place={place} />
    </li>
  );
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  const imageSize = useContext(ImageSizeContext);
  return (
    <img
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
```

```js src/Context.js
import { createContext } from 'react';

export const ImageSizeContext = createContext(500);
```

```js src/data.js
export const places = [{
  id: 0,
  name: 'Bo-Kaap in Cape Town, South Africa',
  description: 'The tradition of choosing bright colors for houses began in the late 20th century.',
  imageId: 'K9HVAGH'
}, {
  id: 1, 
  name: 'Rainbow Village in Taichung, Taiwan',
  description: 'To save the houses from demolition, Huang Yung-Fu, a local resident, painted all 1,200 of them in 1924.',
  imageId: '9EAYZrt'
}, {
  id: 2, 
  name: 'Macromural de Pachuca, Mexico',
  description: 'One of the largest murals in the world covering homes in a hillside neighborhood.',
  imageId: 'DgXHVwu'
}, {
  id: 3, 
  name: 'Selarón Staircase in Rio de Janeiro, Brazil',
  description: 'This landmark was created by Jorge Selarón, a Chilean-born artist, as a "tribute to the Brazilian people".',
  imageId: 'aeO3rpI'
}, {
  id: 4, 
  name: 'Burano, Italy',
  description: 'The houses are painted following a specific color system dating back to 16th century.',
  imageId: 'kxsph5C'
}, {
  id: 5, 
  name: 'Chefchaouen, Marocco',
  description: 'There are a few theories on why the houses are painted blue, including that the color repels mosquitos or that it symbolizes sky and heaven.',
  imageId: 'rTqKo46'
}, {
  id: 6,
  name: 'Gamcheon Culture Village in Busan, South Korea',
  description: 'In 2009, the village was converted into a cultural hub by painting the houses and featuring exhibitions and art installations.',
  imageId: 'ZfQOOzf'
}];
```

```js src/utils.js
export function getImageUrl(place) {
  return (
    'https://i.imgur.com/' +
    place.imageId +
    'l.jpg'
  );
}
```

```css
ul { list-style-type: none; padding: 0px 10px; }
li { 
  margin-bottom: 10px; 
  display: grid; 
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: center;
}
```

</Sandpack>

توجه کنید که کامپوننت‌های میانی دیگر نیازی به ارسال `imageSize` ندارند.

</Solution>

</Challenges>
