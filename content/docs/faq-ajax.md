---
id: faq-ajax
title: AJAX و API ها
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### چگونه یک درخواست AJAX ایجاد کنم؟ {#how-can-i-make-an-ajax-call}

شما می‎توانید از هر کتابخانه AJAX که علاقه دارید استفاده کنید. بعضی از کتابخانه‎های معروف عبارتند از [Axios](https://github.com/axios/axios)، [jQuery AJAX](https://api.jquery.com/jQuery.ajax/) و کتابخانه موجود در خود مرورگر [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### در کدام قسمت چرخه حیات کامپوننت باید درخواست AJAX را بسازم؟ {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

شما باید داده‎ها را در متد [`componentDidMount`](/docs/react-component.html#mounting) چرخه حیات توسط درخواست های AJAX دریافت نمایید. در اینصورت می‎توانید با استفاده از `setState` کامپوننت را هنگام دریافت داده بروزرسانی نمایید.

### مثال: استفاده از نتایج AJAX برای ست کردن state محلی {#example-using-ajax-results-to-set-local-state}

کامپوننت زیر چگونگی ایجاد یک درخواست AJAX در `componentDidMount` برای پر کردن state محلی کامپوننت را نشان می‎دهد.

API استفاده شده در مثال یک شی JSON به شکل زیر برمیگرداند:

```
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

معادل همین مثال با استفاده از [Hooks](https://reactjs.org/docs/hooks-intro.html): 

```js
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```
