---
title: useLayoutEffect
---

<Pitfall>

`useLayoutEffect` می‌تواند به عملکرد آسیب برساند. وقتی ممکن است [`useEffect`](/reference/react/useEffect) را ترجیح دهید.

</Pitfall>

<Intro>

`useLayoutEffect` نسخه‌ای از [`useEffect`](/reference/react/useEffect) است که قبل از اینکه مرورگر صفحه را repaint کند، فعال می‌شود.

```js
useLayoutEffect(setup, dependencies?)
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useLayoutEffect(setup, dependencies?)` {/*useinsertioneffect*/}

برای انجام اندازه‌گیری‌های layout قبل از اینکه مرورگر صفحه را repaint کند، `useLayoutEffect` را فراخوانی کنید:

```js
import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  // ...
```


[مثال‌های بیشتری را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `setup`: تابع با منطق افکت شما. تابع setup شما همچنین به‌طور اختیاری می‌تواند یک تابع *پاکسازی* برگرداند. قبل از اینکه کامپوننت شما به DOM اضافه شود، ری‌اکت تابع setup شما را اجرا می‌کند. بعد از هر رندر مجدد با وابستگی‌های تغییر کرده، ری‌اکت ابتدا تابع پاکسازی را (اگر ارائه کرده‌اید) با مقادیر قدیمی اجرا می‌کند، و سپس تابع setup شما را با مقادیر جدید اجرا می‌کند. قبل از اینکه کامپوننت شما از DOM حذف شود، ری‌اکت تابع پاکسازی شما را اجرا می‌کند.

* **اختیاری** `dependencies`: لیست تمام مقادیر واکنش‌گرا که درون کد `setup` به آن‌ها ارجاع شده است. مقادیر واکنش‌گرا شامل پراپس، استیت، و تمام متغیرها و توابعی است که مستقیماً در بدنهٔ کامپوننت شما تعریف شده‌اند. اگر لینتر شما [برای ری‌اکت پیکربندی شده](/learn/editor-setup#linting) باشد، تأیید می‌کند که هر مقدار واکنش‌گرا به‌درستی به‌عنوان یک وابستگی مشخص شده است. لیست وابستگی‌ها باید تعداد آیتم‌های ثابتی داشته باشد و به‌صورت inline مانند `[dep1, dep2, dep3]` نوشته شود. ری‌اکت هر وابستگی را با مقدار قبلی آن با استفاده از مقایسهٔ [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) مقایسه می‌کند. اگر این آرگومان را حذف کنید، افکت شما بعد از هر رندر مجدد کامپوننت دوباره اجرا می‌شود.

#### مقدار بازگشتی {/*returns*/}

`useLayoutEffect` مقدار `undefined` برمی‌گرداند.

#### نکات {/*caveats*/}

* `useLayoutEffect` یک هوک است، بنابراین فقط می‌توانید آن را **در سطح بالای کامپوننت** یا هوک‌های خودتان فراخوانی کنید. نمی‌توانید آن را درون حلقه‌ها یا شرط‌ها فراخوانی کنید. اگر به این نیاز دارید، یک کامپوننت استخراج کنید و افکت را آنجا منتقل کنید.

* وقتی حالت سخت‌گیرانه (Strict Mode) روشن است، ری‌اکت **یک چرخهٔ اضافی setup+cleanup فقط مخصوص توسعه را قبل از اولین setup واقعی اجرا می‌کند.** این یک تست فشار است که تضمین می‌کند منطق پاکسازی شما منطق setup شما را «منعکس می‌کند» و هر کاری که setup در حال انجام آن است را متوقف یا برگشت می‌زند. اگر این باعث مشکل می‌شود، [تابع پاکسازی را پیاده‌سازی کنید.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

* اگر برخی از وابستگی‌های شما اشیاء یا توابعی هستند که درون کامپوننت تعریف شده‌اند، این خطر وجود دارد که **باعث شوند افکت بیشتر از حد لازم دوباره اجرا شود.** برای رفع این مشکل، وابستگی‌های غیرضروری [شیء](/reference/react/useEffect#removing-unnecessary-object-dependencies) و [تابع](/reference/react/useEffect#removing-unnecessary-function-dependencies) را حذف کنید. همچنین می‌توانید [به‌روزرسانی‌های استیت](/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect) و [منطق غیر واکنش‌گرا](/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect) را بیرون افکت خود استخراج کنید.

* افکت‌ها **فقط روی کلاینت اجرا می‌شوند.** آن‌ها در طول رندر سرور اجرا نمی‌شوند.

* کد درون `useLayoutEffect` و تمام به‌روزرسانی‌های استیت زمان‌بندی‌شده از آن **مرورگر را از repaint کردن صفحه مسدود می‌کنند.** وقتی به‌طور افراطی استفاده شود، این کار برنامهٔ شما را کند می‌کند. وقتی ممکن است، [`useEffect`](/reference/react/useEffect) را ترجیح دهید.

* اگر یک به‌روزرسانی استیت را درون `useLayoutEffect` فعال کنید، ری‌اکت تمام افکت‌های باقیمانده از جمله `useEffect` را بلافاصله اجرا می‌کند.

---

## کاربرد {/*usage*/}

### اندازه‌گیری layout قبل از repaint صفحه توسط مرورگر {/*measuring-layout-before-the-browser-repaints-the-screen*/}

اکثر کامپوننت‌ها برای تصمیم‌گیری دربارهٔ اینکه چه چیزی رندر کنند، نیازی ندارند موقعیت و اندازهٔ خود را روی صفحه بدانند. آنها فقط مقداری JSX برمی‌گردانند. سپس مرورگر *layout* (موقعیت و اندازه) آن‌ها را محاسبه می‌کند و صفحه را repaint می‌کند.

گاهی، این کافی نیست. تصور کنید یک tooltip که هنگام hover در کنار برخی المان‌ها ظاهر می‌شود. اگر فضای کافی وجود داشته باشد، tooltip باید بالای المان ظاهر شود، اما اگر جا نشود، باید پایین ظاهر شود. برای رندر کردن tooltip در موقعیت نهایی درست، باید ارتفاع آن را بدانید (یعنی آیا در بالا جا می‌شود یا نه).

برای این کار، باید در دو پاس رندر کنید:

1. tooltip را در هر کجا (حتی با موقعیت اشتباه) رندر کنید.
2. ارتفاع آن را اندازه بگیرید و تصمیم بگیرید tooltip را کجا قرار دهید.
3. tooltip را *دوباره* در مکان درست رندر کنید.

**همهٔ این کارها باید قبل از اینکه مرورگر صفحه را repaint کند اتفاق بیفتد.** نمی‌خواهید کاربر حرکت tooltip را ببیند. `useLayoutEffect` را فراخوانی کنید تا اندازه‌گیری‌های layout را قبل از repaint صفحه توسط مرورگر انجام دهید:

{/* TODO(@poteto) - fixed by https://github.com/facebook/react/pull/34462. need a new release */}
```js {expectedErrors: {'react-compiler': [7]}} {5-8}
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); // Re-render now that you know the real height
  }, []);

  // ...use tooltipHeight in the rendering logic below...
}
```

نحوهٔ کار این کار به این شکل است:

1. `Tooltip` با `tooltipHeight = 0` اولیه رندر می‌شود (بنابراین tooltip ممکن است به‌اشتباه موقعیت‌دهی شود).
2. ری‌اکت آن را در DOM قرار می‌دهد و کد در `useLayoutEffect` را اجرا می‌کند.
3. `useLayoutEffect` شما [ارتفاع](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) محتوای tooltip را اندازه می‌گیرد و یک رندر مجدد فوری را فعال می‌کند.
4. `Tooltip` دوباره با `tooltipHeight` واقعی رندر می‌شود (بنابراین tooltip به‌درستی موقعیت‌دهی می‌شود).
5. ری‌اکت آن را در DOM به‌روز می‌کند، و مرورگر در نهایت tooltip را نمایش می‌دهد.

روی دکمه‌های زیر hover کنید و ببینید چگونه tooltip موقعیت خود را بسته به اینکه جا می‌شود یا نه، تنظیم می‌کند:

<Sandpack>

```js
import ButtonWithTooltip from './ButtonWithTooltip.js';

export default function App() {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  );
}
```

```js src/ButtonWithTooltip.js
import { useState, useRef } from 'react';
import Tooltip from './Tooltip.js';

export default function ButtonWithTooltip({ tooltipContent, ...rest }) {
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )
    }
    </>
  );
}
```

{/* TODO(@poteto) - fixed by https://github.com/facebook/react/pull/34462. need a new release */}
```js {expectedErrors: {'react-compiler': [11]}} src/Tooltip.js active
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
    console.log('Measured tooltip height: ' + height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```

```js src/TooltipContainer.js
export default function TooltipContainer({ children, x, y, contentRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
}
```

```css
.tooltip {
  color: white;
  background: #222;
  border-radius: 4px;
  padding: 4px;
}
```

</Sandpack>

توجه کنید که حتی با اینکه کامپوننت `Tooltip` باید در دو پاس رندر شود (اولاً، با `tooltipHeight` مقداردهی‌شده به `0` و سپس با ارتفاع واقعی اندازه‌گیری‌شده)، فقط نتیجهٔ نهایی را می‌بینید. به همین دلیل است که برای این مثال به `useLayoutEffect` به جای [`useEffect`](/reference/react/useEffect) نیاز دارید. بیایید به تفاوت به‌طور دقیق در ادامه نگاه کنیم.

<Recipes titleText="useLayoutEffect vs useEffect" titleId="examples">

#### `useLayoutEffect` مرورگر را از repaint کردن مسدود می‌کند {/*uselayouteffect-blocks-the-browser-from-repainting*/}

ری‌اکت تضمین می‌کند که کد درون `useLayoutEffect` و هر به‌روزرسانی استیتی که درون آن زمان‌بندی شده، **قبل از اینکه مرورگر صفحه را repaint کند** پردازش خواهد شد. این به شما اجازه می‌دهد tooltip را رندر کنید، آن را اندازه بگیرید، و tooltip را دوباره رندر کنید بدون اینکه کاربر رندر اضافی اول را متوجه شود. به عبارت دیگر، `useLayoutEffect` مرورگر را از نقاشی کردن مسدود می‌کند.

<Sandpack>

```js
import ButtonWithTooltip from './ButtonWithTooltip.js';

export default function App() {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  );
}
```

```js src/ButtonWithTooltip.js
import { useState, useRef } from 'react';
import Tooltip from './Tooltip.js';

export default function ButtonWithTooltip({ tooltipContent, ...rest }) {
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )
    }
    </>
  );
}
```

{/* TODO(@poteto) - fixed by https://github.com/facebook/react/pull/34462. need a new release */}
```js {expectedErrors: {'react-compiler': [11]}} src/Tooltip.js active
import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```

```js src/TooltipContainer.js
export default function TooltipContainer({ children, x, y, contentRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
}
```

```css
.tooltip {
  color: white;
  background: #222;
  border-radius: 4px;
  padding: 4px;
}
```

</Sandpack>

<Solution />

#### `useEffect` مرورگر را مسدود نمی‌کند {/*useeffect-does-not-block-the-browser*/}

در اینجا همان مثال است، اما با [`useEffect`](/reference/react/useEffect) به جای `useLayoutEffect`. اگر روی دستگاه کندتری هستید، ممکن است متوجه شوید که گاهی tooltip «چشمک می‌زند» و به‌طور خلاصه موقعیت اولیهٔ آن را قبل از موقعیت اصلاح‌شده می‌بینید.

<Sandpack>

```js
import ButtonWithTooltip from './ButtonWithTooltip.js';

export default function App() {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  );
}
```

```js src/ButtonWithTooltip.js
import { useState, useRef } from 'react';
import Tooltip from './Tooltip.js';

export default function ButtonWithTooltip({ tooltipContent, ...rest }) {
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )
    }
    </>
  );
}
```

{/* TODO(@poteto) - fixed by https://github.com/facebook/react/pull/34462. need a new release */}
```js {expectedErrors: {'react-compiler': [11]}} src/Tooltip.js active
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```

```js src/TooltipContainer.js
export default function TooltipContainer({ children, x, y, contentRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
}
```

```css
.tooltip {
  color: white;
  background: #222;
  border-radius: 4px;
  padding: 4px;
}
```

</Sandpack>

برای بازتولید راحت‌تر اشکال، این نسخه یک تأخیر مصنوعی در حین رندر اضافه می‌کند. ری‌اکت به مرورگر اجازه می‌دهد صفحه را قبل از پردازش به‌روزرسانی استیت درون `useEffect` نقاشی کند. در نتیجه، tooltip چشمک می‌زند:

<Sandpack>

```js
import ButtonWithTooltip from './ButtonWithTooltip.js';

export default function App() {
  return (
    <div>
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
      <div style={{ height: 50 }} />
      <ButtonWithTooltip
        tooltipContent={
          <div>This tooltip fits above the button</div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>
    </div>
  );
}
```

```js src/ButtonWithTooltip.js
import { useState, useRef } from 'react';
import Tooltip from './Tooltip.js';

export default function ButtonWithTooltip({ tooltipContent, ...rest }) {
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          const rect = buttonRef.current.getBoundingClientRect();
          setTargetRect({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect}>
          {tooltipContent}
        </Tooltip>
      )
    }
    </>
  );
}
```

```js {expectedErrors: {'react-compiler': [10, 11]}} src/Tooltip.js active
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip({ children, targetRect }) {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  // This artificially slows down rendering
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Do nothing for a bit...
  }

  useEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.body
  );
}
```

```js src/TooltipContainer.js
export default function TooltipContainer({ children, x, y, contentRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`
      }}
    >
      <div ref={contentRef} className="tooltip">
        {children}
      </div>
    </div>
  );
}
```

```css
.tooltip {
  color: white;
  background: #222;
  border-radius: 4px;
  padding: 4px;
}
```

</Sandpack>

این مثال را به `useLayoutEffect` ویرایش کنید و مشاهده کنید که حتی اگر رندر کند شده باشد، نقاشی را مسدود می‌کند.

<Solution />

</Recipes>

<Note>

رندر در دو پاس و مسدود کردن مرورگر به عملکرد آسیب می‌زند. سعی کنید وقتی می‌توانید از این کار اجتناب کنید.

</Note>

---

## رفع اشکال {/*troubleshooting*/}

### من خطایی دریافت می‌کنم: «`useLayoutEffect` روی سرور کاری نمی‌کند» {/*im-getting-an-error-uselayouteffect-does-nothing-on-the-server*/}

هدف `useLayoutEffect` این است که به کامپوننت شما اجازه دهد [از اطلاعات layout برای رندر استفاده کند:](#measuring-layout-before-the-browser-repaints-the-screen)

1. محتوای اولیه را رندر کنید.
2. layout را *قبل از repaint صفحه توسط مرورگر* اندازه بگیرید.
3. محتوای نهایی را با استفاده از اطلاعاتی که خوانده‌اید رندر کنید.

وقتی شما یا فریم‌ورک شما از [رندر سرور](/reference/react-dom/server) استفاده می‌کند، برنامهٔ ری‌اکت شما برای رندر اولیه به HTML روی سرور رندر می‌شود. این به شما اجازه می‌دهد HTML اولیه را قبل از بارگذاری کد جاوااسکریپت نمایش دهید.

مشکل این است که روی سرور، هیچ اطلاعات layoutی وجود ندارد.

در [مثال قبلی](#measuring-layout-before-the-browser-repaints-the-screen)، فراخوانی `useLayoutEffect` در کامپوننت `Tooltip` به آن اجازه می‌دهد بسته به ارتفاع محتوا، خود را به‌درستی موقعیت‌دهی کند (یا بالای محتوا یا پایین آن). اگر سعی می‌کردید `Tooltip` را به‌عنوان بخشی از HTML اولیهٔ سرور رندر کنید، تعیین این غیرممکن بود. روی سرور، هنوز هیچ layoutی وجود ندارد! بنابراین، حتی اگر آن را روی سرور رندر می‌کردید، موقعیت آن بعد از بارگذاری و اجرای جاوااسکریپت روی کلاینت «می‌پرید».

معمولاً، کامپوننت‌هایی که به اطلاعات layout وابسته هستند، به هر حال نیازی ندارند روی سرور رندر شوند. مثلاً احتمالاً نمایش دادن یک `Tooltip` در طول رندر اولیه منطقی نیست. این توسط یک تعامل کلاینت فعال می‌شود.

با این حال، اگر با این مشکل مواجه می‌شوید، چند گزینهٔ متفاوت دارید:

- `useLayoutEffect` را با [`useEffect`](/reference/react/useEffect) جایگزین کنید. این به ری‌اکت می‌گوید که نمایش نتیجهٔ رندر اولیه بدون مسدود کردن نقاشی اشکالی ندارد (زیرا HTML اصلی قبل از اجرای افکت شما قابل مشاهده خواهد شد).

- همچنین، [کامپوننت خود را فقط کلاینت علامت بزنید.](/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content) این به ری‌اکت می‌گوید که محتوای آن را تا نزدیک‌ترین مرز [`<Suspense>`](/reference/react/Suspense) با یک fallback بارگذاری (مثلاً یک spinner یا یک glimmer) در طول رندر سرور جایگزین کند.

- همچنین، می‌توانید یک کامپوننت با `useLayoutEffect` را فقط بعد از hydration رندر کنید. یک استیت بولین `isMounted` نگه دارید که با `false` مقداردهی اولیه شده، و آن را درون یک فراخوانی `useEffect` روی `true` تنظیم کنید. سپس منطق رندر شما می‌تواند مانند `return isMounted ? <RealContent /> : <FallbackContent />` باشد. روی سرور و در طول hydration، کاربر `FallbackContent` را خواهد دید که نباید `useLayoutEffect` را فراخوانی کند. سپس ری‌اکت آن را با `RealContent` جایگزین می‌کند که فقط روی کلاینت اجرا می‌شود و می‌تواند شامل فراخوانی‌های `useLayoutEffect` باشد.

- اگر کامپوننت خود را با یک فروشگاه دادهٔ خارجی همگام می‌کنید و به دلایلی غیر از اندازه‌گیری layout به `useLayoutEffect` وابسته هستید، به [`useSyncExternalStore`](/reference/react/useSyncExternalStore) فکر کنید که [از رندر سرور پشتیبانی می‌کند.](/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
