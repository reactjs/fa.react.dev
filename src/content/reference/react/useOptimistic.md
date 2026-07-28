---
title: useOptimistic
---

<Intro>

`useOptimistic` یک هوک ری‌اکت است که به شما اجازه می‌دهد رابط کاربری را به‌صورت خوش‌بینانه (optimistic) به‌روزرسانی کنید.

```js
  const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `useOptimistic(state, updateFn)` {/*use*/}

`useOptimistic` یک هوک ری‌اکت است که به شما اجازه می‌دهد هنگام در حال انجام بودن یک اکشن ناهمگام، یک استیت متفاوت نمایش دهید. این هوک استایتی را به‌عنوان آرگومان می‌پذیرد و کپی‌ای از آن استیت را باز می‌گرداند که می‌تواند در طول یک اکشن ناهمگام (مانند یک درخواست شبکه) متفاوت باشد. شما تابعی ارائه می‌دهید که استیت فعلی و ورودیِ اکشن را می‌گیرد و استیت خوش‌بینانه‌ای که باید هنگام در حال انجام بودن اکشن استفاده شود را برمی‌گرداند.

این استیت «خوش‌بینانه» نامیده می‌شود زیرا معمولاً برای ارائهٔ فوری نتیجهٔ انجام یک اکشن به کاربر استفاده می‌شود، حتی اگر اکشن در واقع برای تکمیل شدن به زمان نیاز دارد.

```js
import { useOptimistic } from 'react';

function AppContainer() {
  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    // updateFn
    (currentState, optimisticValue) => {
      // merge and return new state
      // with optimistic value
    }
  );
}
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پارامترها {/*parameters*/}

* `state`: مقداری که در ابتدا و هر زمان که هیچ اکشنی در حال انجام نیست بازگردانده می‌شود.
* `updateFn(currentState, optimisticValue)`: تابعی که استیت فعلی و مقدار خوش‌بینانهٔ ارسال‌شده به `addOptimistic` را می‌گیرد و استیت خوش‌بینانهٔ حاصل را برمی‌گرداند. این باید یک تابع خالص (pure) باشد. `updateFn` دو پارامتر می‌گیرد: `currentState` و `optimisticValue`. مقدار بازگشتی، مقدار ادغام‌شدهٔ `currentState` و `optimisticValue` خواهد بود.


#### مقادیر بازگشتی {/*returns*/}

* `optimisticState`: استیت خوش‌بینانهٔ حاصل. این مقدار برابر `state` است مگر آنکه اکشنی در حال انجام باشد، که در این صورت برابر مقدار بازگشتی `updateFn` است.
* `addOptimistic`: `addOptimistic` تابع اعمال‌کننده‌ای (dispatch) است که وقتی یک به‌روزرسانی خوش‌بینانه دارید آن را صدا می‌زنید. این تابع یک آرگومان `optimisticValue` از هر نوعی می‌گیرد و `updateFn` را با `state` و `optimisticValue` صدا می‌زند.

---

## استفاده {/*usage*/}

### به‌روزرسانی خوش‌بینانهٔ فرم‌ها {/*optimistically-updating-with-forms*/}

هوک `useOptimistic` راهی برای به‌روزرسانی خوش‌بینانهٔ رابط کاربری پیش از تکمیل یک عملیات پس‌زمینه، مانند یک درخواست شبکه، ارائه می‌دهد. در زمینهٔ فرم‌ها، این روش به واکنش‌گرا بودن برنامه‌ها کمک می‌کند. وقتی کاربر فرمی را ارسال می‌کند، به‌جای انتظار برای پاسخ سرور جهت بازتاب تغییرات، رابط کاربری بلافاصله با نتیجهٔ مورد انتظار به‌روزرسانی می‌شود.

به‌عنوان مثال، وقتی کاربر پیامی را در فرم تایپ می‌کند و دکمهٔ «Send» را می‌زند، هوک `useOptimistic` اجازه می‌دهد پیام بلافاصله با برچسب «Sending...» در فهرست ظاهر شود، حتی پیش از آنکه پیام واقعاً به سرور ارسال شود. این رویکرد «خوش‌بینانه» حس سرعت و واکنش‌گرایی می‌دهد. سپس فرم در پس‌زمینه تلاش می‌کند پیام را واقعاً ارسال کند. هنگامی که سرور تأیید کرد پیام دریافت شده است، برچسب «Sending...» حذف می‌شود.

<Sandpack>


```js src/App.js
import { useOptimistic, useState, useRef, startTransition } from "react";
import { deliverMessage } from "./actions.js";

function Thread({ messages, sendMessageAction }) {
  const formRef = useRef();
  function formAction(formData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      {
        text: newMessage,
        sending: true
      },
      ...state,
    ]
  );

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessageAction(formData) {
    const sentMessage = await deliverMessage(formData.get("message"));
    startTransition(() => {
      setMessages((messages) => [{ text: sentMessage }, ...messages]);
    })
  }
  return <Thread messages={messages} sendMessageAction={sendMessageAction} />;
}
```

```js src/actions.js
export async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}
```


</Sandpack>
