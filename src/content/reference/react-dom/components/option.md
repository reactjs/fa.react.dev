---
title: "<option>"
---

<Intro>

[کامپوننت `<option>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) به شما اجازه می‌دهد یک گزینه داخل یک جعبهٔ [`<select>`](/reference/react-dom/components/select) رندر کنید.

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

</Intro>

<InlineToc />

---

## مرجع {/*reference*/}

### `<option>` {/*option*/}

[کامپوننت `<option>` داخلی مرورگر](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option) به شما اجازه می‌دهد یک گزینه داخل یک جعبهٔ [`<select>`](/reference/react-dom/components/select) رندر کنید.

```js
<select>
  <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option>
</select>
```

[نمونه‌های بیشتر را در ادامه ببینید.](#usage)

#### پراپس {/*props*/}

`<option>` از همهٔ [پراپس‌های رایج عنصر](/reference/react-dom/components/common#common-props) پشتیبانی می‌کند.

علاوه بر این، `<option>` از این پراپس‌ها پشتیبانی می‌کند:

* [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#disabled): یک مقدار بولی. اگر `true` باشد، گزینه قابل انتخاب نخواهد بود و کم‌رنگ نمایش داده می‌شود.
* [`label`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#label): یک رشته. معنای گزینه را مشخص می‌کند. اگر مشخص نشده باشد، متن داخل گزینه استفاده می‌شود.
* [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option#value): مقداری که هنگام [ارسال `<select>` والد در یک فرم](/reference/react-dom/components/select#reading-the-select-box-value-when-submitting-a-form) اگر این گزینه انتخاب شده باشد استفاده می‌شود.

#### نکات {/*caveats*/}

* ری‌اکت از ویژگی `selected` روی `<option>` پشتیبانی نمی‌کند. به‌جای آن، برای یک select box غیرکنترل‌شده، `value` این گزینه را به [`<select defaultValue>`](/reference/react-dom/components/select#providing-an-initially-selected-option) والد پاس دهید، یا برای یک select کنترل‌شده به [`<select value>`](/reference/react-dom/components/select#controlling-a-select-box-with-a-state-variable) پاس دهید.

---

## نحوهٔ استفاده {/*usage*/}

### نمایش یک select box با گزینه‌ها {/*displaying-a-select-box-with-options*/}

یک `<select>` با فهرستی از کامپوننت‌های `<option>` داخل آن رندر کنید تا یک select box نمایش دهید. به هر `<option>` یک `value` بدهید که نمایانگر داده‌هایی باشد که با فرم ارسال می‌شوند.

[برای اطلاعات بیشتر درباره نمایش یک `<select>` با فهرستی از کامپوننت‌های `<option>` بخوانید.](/reference/react-dom/components/select)

<Sandpack>

```js
export default function FruitPicker() {
  return (
    <label>
      Pick a fruit:
      <select name="selectedFruit">
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </label>
  );
}
```

```css
select { margin: 5px; }
```

</Sandpack>
