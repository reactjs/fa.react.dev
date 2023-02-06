---
id: uncontrolled-components
title: کامپوننت‌های کنترل‌نشده
permalink: docs/uncontrolled-components.html
---

<<<<<<< HEAD
برای پیاده‌سازی فرم‌ها، توصیه می‌کنیم در اکثر موارد از [کامپوننت‌های کنترل‌شده](/docs/forms.html#controlled-components) استفاده کنید. در یک کامپوننت کنترل‌شده، اطلاعات مربوط به فرم توسط یک کامپوننتِ ری‌اکت مدیریت می‌شود. را‌هکار دیگر استفاده از کامپوننت‌های کنترل‌نشده است که در آن‌ها اطلاعات مربوط به فرم توسط خود DOM مدیریت می‌شود.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`<input>`](https://beta.reactjs.org/reference/react-dom/components/input)
> - [`<select>`](https://beta.reactjs.org/reference/react-dom/components/select)
> - [`<textarea>`](https://beta.reactjs.org/reference/react-dom/components/textarea)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

In most cases, we recommend using [controlled components](/docs/forms.html#controlled-components) to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
>>>>>>> d4e42ab21f0cc7d8b79d1a619654e27c79e10af6

برای نوشتن یک کامپوننت کنترل‌نشده، بجای نوشتن یک event handler و آپدیت کردن state در تک تک موارد، می‌توانید [از یک رفرنس استفاده کنید](/docs/refs-and-the-dom.html) و مقادیر فرم را از DOM دریافت کنید.  

 برای مثال در کد زیر، یک کامپوننت کنترل‌نشده تنها یک نام را به عنوان ورودی می‌پذیرد: 

```javascript{5,9,18}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

از آن‌جایی که یک کامپوننت کنترل‌نشده مقادیر DOM را مبنای حقیقت قرار می‌دهد، گاهی اوقات تلفیق کردن کدهای نوشته شده با ری‌اکت و کدهای غیر ری‌اکتی آسان‌تر خواهد بود چنانچه از کامپوننت‌های کنترل‌نشده استفاده شده باشد. علاوه بر این، اگر قصد انجام کاری را دارید که در آن سرعت از دقت مهمتر است، استفاده از این روش می‌تواند منجر به نوشتن اندکی کد کمتر شود. در غیر اینصورت به طور معمول می‌بایستی از کامپوننت‌های کنترل‌شده استفاده کنید.

اگر هنوز برایتان کاملا روشن نیست که در یک شرایط خاص از کدام روش باید استفاده کنید، [این مقاله در باب مقایسه ورودی‌های کنترل‌شده و کنترل‌نشده](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) می‌تواند برایتان مفید باشد.

### مقادیر اولیه {#default-values}

در طول چرخه رندر شدن یک کامپوننت در ری‌اکت، مقادیر DOM با مقادیر صفت `value` موجود در المنت‌های مربوط به فرم جایگزین می‌شوند. در صورت استفاده از یک کامپوننت کنترل‌نشده،‌ اغلب اوقات چنین می‌خواهید که ری‌اکت یک مقدار اولیه به المنت تخصیص دهد ولی آپدیت‌های متعاقب آن را کنترل‌نشده رها کند. برای نیل به این مقصود می‌توانید صفت `defaultValue` را بجای `value` مشخص کنید. بعد از اینکه کامپوننت در DOM تعبیه شد،‌ تغییر دادن مقدار `defaultValue` موجب آپدیت شدن مقادیر DOM نخواهد شد.

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

به همین ترتیب، `<input type="checkbox">` و `<input type="radio">` از `defaultChecked` و `<select>` و `<textarea>` از `defaultValue` پشتیبانی می‌کنند.

## المنت ورودی از نوع فایل {#the-file-input-tag}

در زبان HTML، به کار بردن `<input type="file">` به کاربر اجازه می‌دهد یک یا چند فایل را از حافظه دستگاه خود انتخاب کرده آنها را بر روی یک سرور بارگذاری کند و یا از طریق [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) به اطلاعات موجود در فایل دسترسی پیدا کند. 

```html
<input type="file" />
```

در ری‌اکت، یک `<input type="file" />` همواره یک کامپوننت کنترل‌نشده است به این دلیل که تنها توسط کاربر قابل مقداردهی است و نه از طریق دستورات نوشته‌شده در برنامه.

برای کار کردن با فایل‌ها باید از File API استفاده کنید. مثال زیر چگونگی ساختن یک [رفرنس به یک نودِ DOM](/docs/refs-and-the-dom.html) به منظور دسترسی به فایل(ها) در submit handler را نشان می‌دهد: 

`embed:uncontrolled-components/input-type-file.js`

[در CodePen امتحان کنید](codepen://uncontrolled-components/input-type-file)
