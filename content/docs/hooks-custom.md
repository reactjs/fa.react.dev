---
id: hooks-custom
title: Building Your Own Hooks
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

*Hookها* ضمیمه جدید ری‌اکت ۱۶.۸ هستند. آن‌ها به شما اجازه می‌دهند تا از state و سایر ویژگی‌های ری‌اکت بدون نوشتن کلاس استفاده کنید.

ساختن Hookهای خودتون به شما کمک می‌کنه تا منطق برنامه را به توابعی که می‌توان مجدد استفاده کرد تبدیل کنید.

هنگامی که در حال آموختن استفاده از Effect Hook بودیم، کامپوننت زیر که به ما پیامی در خصوص وضعیت آنلاین بودن دوستمان را نشان می‌داد دیدیم:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

حالا در نظر بگیرید که برنامه گفتگوی ما یک لیست مخاطب هم داشته باشد، و ما هم می‌خواهیم لیست کاربران آنلاین را با رنگ سبز نشان بدهیم. می‌توانیم این کار را با کپی کردن منطق مشابه بالا در کامپوننت `FriendListItem`  انجام بدهیم ولی ایده‌آل نخواهد بود:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

به جای آن، میتوانیم این منطق رو بین `FriendStatus` و `FriendListItem` به اشتراک بگذاریم.

به طور سنتی در ری‌اکت، دو روش برای اشتراک گذاشتن منطق بین کامپوننت‌ها داریم: [رندر کردن props](/docs/render-props.html) و [استفاده از کامپوننت‌های higher-order](/docs/higher-order-components.html). حالا به Hookها نگاه می‌کنیم که چطور بسیاری از این مشکلات مشابه‌ را بدون اینکه مجبور به اضافه کردن کامپوننت‌های بیشتر به درخت [فایل‌ها] بشیم برایمان حل می کنند.

## خارج کردن Hookشخصی‌سازی شده {#extracting-a-custom-hook}

در جاوااسکریپت هنگامی که می‌خواهیم منطقی را بین دو تابع به اشتراک بگذاریم، آن منطق را به عنوان تابع سومی خارج می‌کنیم. کامپوننت‌ها و Hookها هر دو تابع هستند، پس این کار برای آن‌ها هم عملیست.

**Hook تابع جاواسکریپتی‌ای هست که اول نامش با "`use`" شروع می‌شود و شاید Hookهای دیگری را فرخوانی کند** برای مثال، `useFriendStatus` اولین Hook شخصی‌سازی شده ماست:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```
چیز جدیدی درونش نیست -- منطق از کامپوننت بالایی کپی شده است. درست مثل کامپوننت، دقت کنید که Hookهای دیگر را بدون شرط در بالاترین سطح Hook شخصیتان فراخوانی کنید.

برخلاف یک کامپوننت ری‌اکت، یک Hookشخصی نیازی ندارد تا با امضای خاصی مشخص شود. می‌توانیم تصمیم بگیریم که چه چیزی به عنوان آرگومان دریافت کند،و اگر چیزی هست که باید آن را برگرداند، برگرداند به عبارت دیگر، مانند تابعی معمولیست. نامش بهتر است که با `use` آغاز شود تا با یک نگاه بفهمید که [قوانین hookها](/docs/hooks-rules.html) روی آن اعمال شده است.

هدف Hook `useFriendStatus` آن است که اشتراک(subscribe) به وضعیت دوستان داشته باشد. به همین دلیل است که `friendID` را به عنوان آرگومان قبول می‌کند، و اگر دوستمان آنلاین باشد مقدارش را برمی‌گرداند:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

حالا ببینیم که Hook ما چگونه کار می‌کند.

## استفاده از Hook شخصی‌سازی شده {#using-a-custom-hook}

در ابتدا، هدف اصلی ما این بود که منطق اضافی را از کامپوننت‌های `FriendStatus` و `FriendListItem` حذف کنیم. هر دوی آنها می‌خواهند بدانند که یک دوست انلاین هست یا خیر.

حالا که ما این منطق را به عنوان یک Hook `useFriendStatus` خارج کردیم، فقط باید استفاده‌اش کنیم.

```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

**آیا این کد با مثال اصلی برابراست?** بله، دقیقا همانطور عمل می‌کند.اگر دقیق‌تر نگاه کنید، متوجه می‌شوید که ما تغییری در رفتار ایجاد نکردیم. تمام کاری که کردیم این بود که کد مشترک بین دو تابع را درون تابعی جدا قرار دادیم. **Hookهای شخصی‌سازی شده قراردیست که به طور ذاتی به جای اینکه یک ویژگیه ری‌اکتی باشد از طراحی Hookها پیروی می‌کند.**

**آیا مجبورم که حتما نام Hook شخصی خودم را با “`use`” آغاز کنم?** لطفا همین‌ کار را کنید. این قراردادی خیلی مهم است. بدون آن نمی‌توانیم به صورت خودکار نقض [قوانین Hookها را](/docs/hooks-rules.html) چک کنیم زیرا نمی‌توانیم بگوییم که یک تابع بخصوص درونش Hookهایی را فراخوانی کرده باشد.

**آیا دو کامپوننت که از Hook یکسانی استفاده می‌کنند state را به اشتراک می‌گذارند?** خیر. hookهای شخصی‌سازی شده مکانیزمی برای استفاده مجدد از منطق *با state* هستند (مانند تنظیم اشتراک و به خاطر سپردن مقدار کنونی)، ولی هربار که از Hook شخصی استفاده می‌کنید، تمام state و effectهای درونش کاملا ایزوله هستند.

**چگونه یک Hook شخصی state ایزوله می‌گیرد?** هر *فراخوانی* Hook  یک state ایزوله دریافت می‌کند. به خاطر فراخوانی مستقیم `useFriendStatus`، از دیدگاه ری‌اکت کامپوننت ما `useState` و `useEffect` را فراخوانی می‌کند.و همان گونه که [درقبل](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) [آموختیم](/docs/hooks-state.html#tip-using-multiple-state-variables)،می‌توانیم `useState` و `useEffect` هر چقدر که بخواهیم در یک کامپوننت صدا بزنیم، و همه آنها کاملا مستقل از هم خواهند بود.

### نکته: انتقال اطلاعات بین Hookها {#tip-pass-information-between-hooks}

از آنجایی که Hookها تابع هستند، می‌توانیم بین آنها اطلاعات رد و بدل کنیم.



برای نشان دادن این‌کار ، از کامپوننت دیگری در مثال فرضی چت‌مان استفاده می‌کنیم. این گیرنده پذیرش پیام است که آنلاین بودن دوست انتخاب شده را به‌ ما نشان می‌دهد:

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

ما مقدار آی‌دی دوست انتخابی را درون متغییر state `recipientID` قرار می‌دهیم، و در صورتی که کاربر دوست دیگری را از  `<select>` انتخاب کند آن را به‌روز رسانی می‌کنیم.

به دلیل اینکه فراخوانی Hook `useState` به ما مقدار آخرین متغییر state  `recipientID` را می‌دهد، می‌توانیم آن را به Hook شخصی `useFriendStatus` به عنوان آرگومان انتقال انتقال دهیم:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

این کار به ما اجازه می‌دهد تا بدانیم *دوست انتخابی* آنلاین هست یا خیر. اگر دوست دیگری انتخاب کنیم و مقدار `recipientID` را به‌روز رسانی کنیم، Hook `useFriendStatus`مان اشتراک دوستی که در قبل انتخاب کردیم را از بین می‌برد و به دوست جدیدی که انتخاب کردیم اشتراک می‌زند.

## `useتخیلتان()` {#useyourimagination}

Hookهای شخصی سازی شده راهکاری برای اشتراک گذاشتن منطق پیشنهاد می‌دهند که قبلا در کامپوننت‌های ری‌اکت امکان پذیر نبود. شما می توانید Hookهای شخصی‌سازی شده ای بنویسید که محدوده بزرگی از موارد استفاده مانند کنترل کردن، انیمیشن، پیاده سازی مشترکین، تایمر، و شاید خیلی از موارد دیگر که به آن اشاره نکردیم را پوشش دهد. چیز بیشتر اینکه، می‌توانید hookهایی بنویسید که همانند ویژگی‌های درونی ری‌اکت  به راحتی قابل استفاده باشند.



سعی کنید در قبال اینکه خیلی زود انتضاع اضافه کنید مقاومت کنید. حالا که آن کامپوننت تابعی کار بیشتری می‌تواند انجام دهد، این احتمال وجود دارد که میانگین مؤلفه عملکرد در پایه کد شما طولانی تر شود. این طبیعیست-- این احساس را نداشته باشید که *مجبورید* آن را فورا به Hook تقسیم کنید. ولی ما توصیه می‌کنیم مواردی را شروع کنید که هوک سفارشی می تواند منطق پیچیده را در پشت یک رابط ساده پنهان کند، یا به حل کردن یک کامپوننت درهم تنیده و کثیف کمک کند.

برای مثال، شاید کامپوننت پیچیده‌ای داشته باشید که شامل state های محلی زیادی باشد که به صورت موقت اداره می‌شود. `useState` به روزرسانی متمرکز منطق را راحتتر نمی‌کند شاید ترجیح دهید که از کاهش دهنده [ریداکس](https://redux.js.org/) استفاده کنید:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

کاهش دهنده‌ها (reducers) برای تست در فضای ایزوله و در مقیاس بزرگ، برای به‌روز رسانی‌های پیچیده مناسب هستند. شما می‌توانید بعدا در صورت نیاز آنها به قسمت‌های کوچکتری تقسیم کنید. ولی شاید هم بخواهید از state محلی ری‌اکت استفاده کنید، و نخواهید از کتاب خانه دیگری استفاده کنید.
پس اگر می‌توانستیم یک هوک `useReducer` بنویسیم که به ما اجازه مدیریت state *محلی* کامپوننت‌مان را با یک کاهش‌دهنده بدهد؟ یک نسخه ساده آن میتواند به شکل زیر باشد:


```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

حالا می‌توانیم از این در کامپوننت خودمان استفاده کنیم، و بگذاریم تا کاهش‌دهنده جریان state را مدیریت کند:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

نیاز مدیریت state محلی با کاهش‌دهنده در یک کامپوننت پیچیده به اندازه کافی عمومی بود که ما هوک `useReducer` را درون ری‌کت ساختیم. شما این [هوک] و دیگر هوک‌های ساخته شده در ری‌اکت را درکنار هم در صفحه [Hooks API reference](/docs/hooks-reference.html) پیدا می‌کنید.
