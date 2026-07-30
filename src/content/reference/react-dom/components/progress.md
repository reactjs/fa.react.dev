---
title: "<progress>"
---

<Intro>

[کامپوننت `<progress>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) به شما اجازه می‌دهد یک شاخص پیشرفت رندر کنید.

```js
<progress value={0.5} />
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<progress>` {/*progress*/}

برای نمایش یک شاخص پیشرفت، [کامپوننت `<progress>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) را رندر کنید.

```js
<progress value={0.5} />
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<progress>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

علاوه بر این، `<progress>` از این پراپس‌ها پشتیبانی می‌کند:

* [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#max): یک عدد. حداکثر `value` را مشخص می‌کند. پیش‌فرض `1` است.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#value): عددی بین `0` و `max`، یا `null` برای پیشرفت نامشخص. مشخص می‌کند چقدر کار انجام شده است.

---

## نحوهٔ استفاده {/*usage*/}

### کنترل یک شاخص پیشرفت {/*controlling-a-progress-indicator*/}

برای نمایش یک شاخص پیشرفت، یک کامپوننت `<progress>` رندر کنید. می‌توانید یک عدد `value` بین `0` و مقدار `max` که مشخص کرده‌اید پاس دهید. اگر مقدار `max` پاس ندهید، به‌طور پیش‌فرض `1` فرض می‌شود.

اگر عملیات در جریان نیست، `value={null}` را پاس دهید تا شاخص پیشرفت در یک استیت نامشخص قرار گیرد.

<Sandpack>

```js
export default function App() {
  return (
    <>
      <progress value={0} />
      <progress value={0.5} />
      <progress value={0.7} />
      <progress value={75} max={100} />
      <progress value={1} />
      <progress value={null} />
    </>
  );
}
```

```css
progress { display: block; }
```

</Sandpack>
