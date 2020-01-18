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

Fragments solve this problem.

## Usage {#usage}

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

which results in a correct `<Table />` output of:

```jsx
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### Short Syntax {#short-syntax}

There is a new, shorter syntax you can use for declaring fragments. It looks like empty tags:

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

You can use `<></>` the same way you'd use any other element except that it doesn't support keys or attributes.

### Keyed Fragments {#keyed-fragments}

Fragments declared with the explicit `<React.Fragment>` syntax may have keys. A use case for this is mapping a collection to an array of fragments -- for example, to create a description list:

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
