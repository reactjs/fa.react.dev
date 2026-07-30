---
title: experimental_useEffectEvent
version: experimental
---

<Experimental>

**این API آزمایشی است و هنوز در نسخهٔ پایدار ری‌اکت در دسترس نیست.**

شما می‌توانید آن را با ارتقای پکیج‌های ری‌اکت به جدیدترین نسخهٔ آزمایشی امتحان کنید:

- `react@experimental`
- `react-dom@experimental`
- `eslint-plugin-react-hooks@experimental`

نسخه‌های آزمایشی ری‌اکت ممکن است حاوی باگ باشند. از آن‌ها در محیط تولید استفاده نکنید.

</Experimental>


<Intro>

`useEffectEvent` یک هوک ری‌اکت است که به شما اجازه می‌دهد منطق غیر واکنش‌گرا (non-reactive) را در یک [افکت ایونت (Effect Event)](/learn/separating-events-from-effects#declaring-an-effect-event) استخراج کنید.

```js
const onSomething = useEffectEvent(callback)
```

</Intro>

<InlineToc />
