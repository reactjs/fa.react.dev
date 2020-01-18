---
id: fragments
title: Fragments
permalink: docs/fragments.html
---

یک الگوی رایج در React این است که یک مؤلفه بتواند عناصر مختلف را برگرداند. قطعات به شما امکان می دهد لیستی از فرزندان را بدون اضافه کردن گره های اضافی به DOM گروه بندی کنید.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

همچنین یک [نحو کوتاه](#short-syntax) برای اعلام آنها وجود دارد.

## انگیزه {#motivation}

یک الگوی رایج برای این است که یک جزء بتواند لیستی از فرزندان را برگرداند. از این مثال نمونه React snippet بگیرید:

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

دستور `<Columns />` نیاز خواهد بود تا بتوانید چند `<td>` را برگردانید که در خروجی از لحاظ HTML معتبر باشند.
اگر در بخش ارائه از `<Columns />` استفاده کنید, خروجی HTML نادرست خواهد بود.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

منجر به خروجی `<Table />` در:

```jsx
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

قطعات این مشکل را حل می کنند.

## طریقه استفاده {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

که منجر به خروجی صحیح `<Table />` در:

```jsx
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### نحو کوتاه {#short-syntax}

یک نحو جدید و کوتاه تر وجود دارد که می توانید برای اعلام قطعات استفاده کنید. این شبیه به برچسب های خالی است:

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

می توانید از `<></>` ها به همان روشی استفاده کنید که می توانید از هر عنصر دیگری استفاده کنید به جز اینکه از ویژگی ها پشتیبانی نمی کند.

### قطعات اصلی {#keyed-fragments}

تکه های اعلام شده با نحوی صریح `<React.Fragment>` ممکن است دارای کلید باشند. مورد استفاده برای این کار ، نقشه برداری از مجموعه به مجموعه ای از قطعات است - برای مثال ، برای ایجاد یک لیست توضیحات:

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`key` is the only attribute that can be passed to `Fragment`. In the future, we may add support for additional attributes, such as event handlers.

### Live Demo {#live-demo}

You can try out the new JSX fragment syntax with this [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000).
