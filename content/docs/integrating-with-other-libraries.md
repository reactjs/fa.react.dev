---
id: integrating-with-other-libraries
title: ادغام کردن با دیگر کتابخانه‌ها
permalink: docs/integrating-with-other-libraries.html
---

ری‌اکت می‌تواند در هر وب اپلیکیشنی استفاده شود. می‌تواند در دیگر اپلیکیشن‌ها جاسازی شود و با کمی تلاش، دیگر اپلیکیشن‌ها می‌توانند در ری‌اکت جاسازی شوند. این راهنما موارد کاربرد رایج‌تری را، با تمرکز بر [jQuery](https://jquery.com/) و [Backbone](https://backbonejs.org/) ارزیابی می‌کند. اما همین ایده‌ها می‌توانند برای ادغام کردن کامپوننت‌ها با هر کد آماده‌ای استفاده شوند.

## ادغام کردن با پلاگین‌های تغییر DOM {#integrating-with-dom-manipulation-plugins}

ری‌اکت از تغییراتی که خارج از ری‌اکت بر DOM اعمال می‌شوند ناآگاه است. به‌روزرسانی‌ها را بر اساس اطلاعات داخلی خودش اندازه‌گیری می‌کند و در صورتی که گره‌های یکسانی در DOM توسط کتابخانه دیگری تغییر کرده باشند، ری‌اکت گیج می‌شود و راهی برای بازیابی آن نیست.

این به این معنی نیست که ترکیب ری‌اکت با دیگر راه‌های تاثیرگذاری بر روی DOM غیرممکن و یا حتی مشکل است. شما فقط باید مواظب باشید که هر کدام چه می‌کنند.

آسان‌ترین راه برای جلوگیری از تضاد و تعارض‌ها جلوگیری از کامپوننت ری‌اکت از به‌روز شدن است. شما می‌توانید این کار را با رندر کردن المان‌هایی که ری‌اکت دلیلی برای به‌روزرسانی ندارد انجام دهید. مانند یک `<div />` خالی.

### چگونه وارد مشکل شویم {#how-to-approach-the-problem}

برای نشان دادن این، بیایید یک wrapper برای یک پلاگین jQuery طراحی کنیم.


ما یک [ref](/docs/refs-and-the-dom.html) به عنصر ریشه DOM وصل می‌کنیم. درون `componentDidMount`، ما یک اشاره‌گر به آن بدست می‌آوریم بنابراین می‌توانیم آن را به پلاگین jQuery پاس دهیم.
برای جلوگیری از دستکاری DOM توسط ری‌اکت پس از ایجاد آن، ما یک `<div />` خالی از متد `render()` بازمی‌گردانیم. عنصر `<div />` هیچ مشخصه و یا فرزندی ندارد، بنابراین ری‌اکت دلیلی برای به‌روزرسانی آن ندارد و پلاگین jQuery را آزاد می‌کند تا آن قسمت از DOM را مدیریت کند.

```js{3,4,8,12}
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

در نظر داشته باشید که با هر دو [متد چرخه حیات](/docs/react-component.html#the-component-lifecycle) `componentDidMount` و `componentWillUnmount` را تعریف کردیم. بسیاری از پلاگین‌های jQuery مدیریت کننده‌های رویدادی را به DOM وصل می‌کنند که آزادسازی آن‌ها در `componentWillUnmount` بسیار مهم است. اگر پلاگین متدی را برای پاکسازی فراهم نکرده‌باشد، احتمالا شما مجبور هستید آن را برای خودتان ایجاد کنید. به یاد داشته باشید که تمامی مدیریت کننده‌های رویدادی که پلاگین ثبت کرده است را برای جلوگیری از نشت مموری پاک کنید.

### ادغام با پلاگین Chosen jQuery {#integrating-with-jquery-chosen-plugin}

برای یک مثال واضح‌تر این مبحث، بیایید یک wrapper کوچک برای پلاگین [Chosen](https://harvesthq.github.io/chosen/) که ورودی `<select>` را ارتقا می‌دهد بنویسیم.

>**نکته:**
>
>فقط برای این که ممکن است به این معنی نیست که این بهترین راه برای اپ‌های ری‌اکت است. ما شما را تضویق می‌کنیم که هر وقت می‌توانید از کامپوننت‌های ری‌اکت اسفاده کنید. کامپوننت‌های ری‌امت برای استفاده مجدد در اپلیکیشن‌های ری‌اکتی آسان‌تر هستند و در اغلب موارد کنترل بیشتری بر روی رفتار و ظاهر آن‌ها فراهم می‌کنند.

اول، بیایید نگاهی بیاندازیم به این که Chosen با DOM چه می‌کند.

اگر شما آن را روی یک گره `<select>` DOM فراخوانی کنید، آن صفت‌های گره اصلی DOM را از آن می‌خواند، آن‌ها را با style درخط پنهان می‌کند و سپس یم گره DOM مجزا با نمایش بصری خودش، درست بعد از `<select>` ضمیمه می‌کند. سپس رویدادهای jQuery را برای آگاه‌سازی ما از تغییرات اجرا می‌کند.

بیایید بگوییم این API است که ما در تلاش هستیم با wrapper کامپوننت ری‌اکت `<Chosen>` خود پیاده کنیم:

```js
function Example() {
  return (
    <Chosen onChange={value => console.log(value)}>
      <option>vanilla</option>
      <option>chocolate</option>
      <option>strawberry</option>
    </Chosen>
  );
}
```

ما برای سادگی آن را به عنوان یک [کامپوننت کنترل نشده](/docs/uncontrolled-components.html) پیاده خواهیم کرد.

ابتدا، یک کامپوننت خالی با یک متد `render()` که `<select>` پوشانده شده در یک `<div>` را برمی‌گرداند ایجاد می‌کنیم:

```js{4,5}
class Chosen extends React.Component {
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

توجه کنید که ما چگونه `<select>` را درون یک `<div>` اضافه پوشش دادیم. به خاطر اینکه Chosen درست بعد از گره `<select>` که ما پاس دادیم یک عنصر DOM اضافه می‌کند. به هر حال، تا آنجا که به ری‌اکت مربوط می‌شود، `<div>` همیشه یک فرزند تنها دارد. به این شکل ما مطمئن می‌شویم که به‌روزرسانی‌های ری‌اکت با گره DOM اضافه شده توسط Chosen ناسازگاری نخواهد داشت. این مسئله بسیار مهم است که در صورتی که DOM را خارج از جریان ری‌اکت تغییر می‌دهید، باید مطمئن شوید که ری‌اکت دلیلی برای لمس گره‌های DOM ندارد.

سپس، متدهای چرخه‌حیات را پیاده‌سازی خواهیم کرد. ما نیاز داریم که Chosen را به وسیله یک ref به گره `<select>` در `componentDidMount` راه اندازی نموده و آن را در `componentWillUnmount` نابود کنیم.

```js{2,3,7}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();
}

componentWillUnmount() {
  this.$el.chosen('destroy');
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/qmqeQx?editors=0010)

توجه داشته باشید که ری‌اکت هیچ معنای خاصی به فیلد `this.el` نمی‌دهد و تنها به این علت کار می‌کند که ما قبلا این فیلد را توسط `ref` در متد `render()` اختصاص داده‌ایم:

```js
<select className="Chosen-select" ref={el => this.el = el}>
```

این کار برای دستیابی به رندر شدن کامپوننتمان کافی‌است، اما ما می‌خواهیم از تغییرات مقدار نیز باخبر شویم. برای انجام این کار، ما یک اشتراک در رویداد `change` روی `<select>` که تحت کنترل Chosen است ایجاد می‌کنیم.

به علت اینکه ممکن است props کامپوننت در طول زمان تغییر کند، ما `this.props.onChange` را مستقیما به Chosen پاس نمی‌دهیم و این موضوع شامل event handler ها نیز می‌شود. به جای این کار، ما یک متد `handleChange()` تعریف می‌کنیم که `this.props.onChange` را صدا می‌زند و آن را در رویداد `change` در jQuery subscribe می‌کند.

```js{5,6,10,14-16}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();

  this.handleChange = this.handleChange.bind(this);
  this.$el.on('change', this.handleChange);
}

componentWillUnmount() {
  this.$el.off('change', this.handleChange);
  this.$el.chosen('destroy');
}

handleChange(e) {
  this.props.onChange(e.target.value);
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/bWgbeE?editors=0010)

در نهایت، یک کار برای انجام باقی مانده‌است. در ری‌اکت، prop ها می‌توانند در طول زمان تغییر کنند. برای مثال، در صورتی که state کامپوننت والد تغییر کند کامپوننت state می‌تواند فرزندان متفاوتی بگیرد. این به این معنی‌است که برای اهداف ادغام به‌روزرسانی دستی DOM در پاسخ به به‌روزرسانی‌های prop مهم است، بنابراین ما دیگر به ری‌اکت اجازه مدیریت DOM را نمی‌دهیم.

مستندات Chosen پیشنهاد می‌کند که برای مطلع شدن از تغییرات روی عنصر اصلی DOM می‌توانیم از API `trigger()` در jQuery استفاده کنیم. ما به ری‌اکت اجازه می‌دهیم تا وظیفه به‌روزرسانی `this.props.children` را درون `<select>` به عهده بگیرد، اما همچنین یک متد چرخه حیات `componentDidUpdate()` برای باخبر کردن Chosen از تغییرات درون لیست فرزندان نیز اضافه می‌کنیم:

```js{2,3}
componentDidUpdate(prevProps) {
  if (prevProps.children !== this.props.children) {
    this.$el.trigger("chosen:updated");
  }
}
```

به این شکل، Chosen زمانی که فرزند `<select>` مدیریت شده توسط ری‌اکت باخبر می‌شود می‌داند که باید عنصر DOM خودش را به‌روز کند.

پیاده‌سازی کامل کامپوننت `Chosen` به شکل زیر است:

```js
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger("chosen:updated");
    }
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.chosen('destroy');
  }
  
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/xdgKOz?editors=0010)

## ادغام با دیگر کتابخانه‌های View {#integrating-with-other-view-libraries}

به لطف انعطاف [`ReactDOM.render()`](/docs/react-dom.html#render)، ری‌اکت می‌تواند درون دیگر اپلیکیشن‌ها تعبیه شود.

اگرچه ری‌اکت معمولا در راه‌اندازی اولیه برای بارگذاری یک کامپوننت تنهای ری‌اکت در ریشه DOM استفاده می‌شود، `ReactDOM.render()` می‌تواند به دفعات برای قسمت‌های مستقل UI که می‌تواند به کوچکی یک دکمه و یا بزرگی یک اپ باشد صدا زده شود.

در واقع، این دقیقا روشی‌است که ری‌اکت در Facebook استفاده شده است. این به ما اجازه می‌دهد اپلیکیشن‌های ری‌اکت را قطعه قطعه بنویسیم و آن‌ها را با قالب های تولید شده توسط سرور و دیگر کد‌های client-side ترکیب کنیم.

### جایگزینی رندر کردن String-Based با ری‌اکت {#replacing-string-based-rendering-with-react}

یکی از الگوهای رایج در وب اپلیکیشن‌های قدیمی‌تر تعریف تکه‌های DOM به عنوان یک رشته متنی و تزریق آن به DOM است. مانند: `$el.html(htmlString)`. این نکات در یک کد برای معرفی ری‌اکت عالی هستند. فقط رندر کردن بر اساس رشته متنی را به عنوان یک کامپوننت ری‌اکت بازنویسی کنید.

بنابراین پیاده‌سازی jQuery زیر...

```js
$('#container').html('<button id="btn">Say Hello</button>');
$('#btn').click(function() {
  alert('Hello!');
});
```

... می‌تواند با استفاده از یک کامپوننت ری‌اکت بازنویسی شود:

```js
function Button() {
  return <button id="btn">Say Hello</button>;
}

ReactDOM.render(
  <Button />,
  document.getElementById('container'),
  function() {
    $('#btn').click(function() {
      alert('Hello!');
    });
  }
);
```

از اینجا به بعد شما می‌توانید شروع به انتقال منطق بیشتری به کامپوننت کنید و React practice های رایج بیشتری را به کار ببرید. برای مثال، در کامپوننت‌ها، بهترین کار عدم تکیه بر ID ها می‌باشد چرا که همان کامپوننت می‌تواند چندین بار رندر شود. به جای این، ما از [سیستم رویداد ری‌اکت](/docs/handling-events.html) استفاده خواهیم کرد و click handler را مستقیما روی عنصر `<button>` ری‌اکت ثبت می‌کنیم:

```js{2,6,9}
function Button(props) {
  return <button onClick={props.onClick}>Say Hello</button>;
}

function HelloButton() {
  function handleClick() {
    alert('Hello!');
  }
  return <Button onClick={handleClick} />;
}

ReactDOM.render(
  <HelloButton />,
  document.getElementById('container')
);
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/RVKbvW?editors=1010)

شما می‌توانید هر جقدر که دوست دارید چنین کامپوننت‌های ایزوله‌ای داشته باشید و از `ReactDOM.render()` برای رندر کردن آن ها در container های مختلف DOM استفاده کنید. به تدریج که شما قسمت‌های بیشتری از اپ را به ری‌اکت تبدیل می‌کنید، می‌توانید آن‌ها را در کامپوننت‌های بزرگتری ترکیب کنید و بعضی از فراخوانی‌های `ReactDOM.render()` را به بالای سلسله مراتب انتقال دهید.

### تعبیه ری‌اکت در یک Backbone View {#embedding-react-in-a-backbone-view}

view های [Backbone](https://backbonejs.org/) معمولا از رشته‌های متنی HTML یا توابع تولید قالب متنی برای ایجاد محتوا برای عناصر DOM استفاده می‌کنند. این فرایند نیز می‌تواند با رندر کردن یک کامپوننت ری‌اکت جایگزین شود.

در زیر، ما یک Backbone view که `ParagraphView` نام گرفته است را ایجاد می‌کنیم که تابع `render()` Backbone را برای رندر کردن یک کامپوننت  `<Paragraph>` ری‌اکت در عنصر DOM فراهم شده توسط Backbone را نادیده می‌گیرد(`this.el`). اینجا نیز از [`ReactDOM.render()`](/docs/react-dom.html#render) استفاده می‌کنیم.

```js{1,5,8,12}
function Paragraph(props) {
  return <p>{props.text}</p>;
}

const ParagraphView = Backbone.View.extend({
  render() {
    const text = this.model.get('text');
    ReactDOM.render(<Paragraph text={text} />, this.el);
    return this;
  },
  remove() {
    ReactDOM.unmountComponentAtNode(this.el);
    Backbone.View.prototype.remove.call(this);
  }
});
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/gWgOYL?editors=0010)

فراخوانی `ReactDOM.unmountComponentAtNode()` در متد `remove` برای اینکه ری‌اکت event handler ها و دیگر منابع مرتبط با این درخت کامپوننت را زمان جدا شدن unregister کنیم حائز اهمیت است.

زمانی که یک کامپوننت از *درون* یک درخت ری‌اکت حذف می‌شود، پاکسازی به صورت خودکار انجام می‌شود. اما چون ما تمام درخت را به صورت دستی حذف می‌کنیم، باید این متد را صدا بزنیم.

## ادغام با Model Layer ها {#integrating-with-model-layers}

با وجود اینکه به طور کلی پیشنهاد می‌شود از جریان داده یک طرفه مانند [React state](/docs/lifting-state-up.html)، [Flux](https://facebook.github.io/flux/) یا [Redux](https://redux.js.org/) استفاده شود، کامپوننت‌های ری‌اکت می‌توانند از model layer های دیگر فریم‌ورک‌ها و کتابخانه‌ها استفاده کنند.

### استفاده از مدل‌های Backbone در کامپوننت‌های ری‌اکت {#using-backbone-models-in-react-components}

آسان‌ترین راه استفاده از مدل‌ها و کالکشن‌های [Backbone](https://backbonejs.org/) از یک کامپوننت ری‌اکت گوش کردن به رویدادهای تغییر مختلف و اجبار دستی به یک به‌روزرسانی می‌باشد.

کامپوننت‌های مسئول رندر کردن مدل‌ها به رویدادهای `'change'` گوش می‌دهند. در حالی که کامپوننت‌های مسئول رندر کردن کالکشن‌ها به رویدادهای `'add'` و `'remove'` گوش می‌دهند. در هر دو مورد، [`this.forceUpdate()`](/docs/react-component.html#forceupdate) را برای دوباره رندر کردن کامپوننت با داده‌های جدید را صدا بزنید.

در مثال زیر، کامپوننت `List` با استفاده از کامپوننت `Item` برای رندر کردن هر مورد، ی کالکشن Backbone را رندر می‌کند.

```js{1,7-9,12,16,24,30-32,35,39,46}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/GmrREm?editors=0010)

### استخراج داده از مدل‌های Backbone {#extracting-data-from-backbone-models}

آگاهی کامپوننت‌های ری‌اکت شما از مدل‌ها و کالکشن‌های Backbone نیاز روش بالا است. اگر شما بعدا برنامه مهاجرت به یک راهکار مدیریت داده دیگر را داشته‌باشید، ممکن است بخواهید اطلاعات مربوط به Backbone را در کمترین بخش کد خود متمرکز کنید.

راهکار ما برای این مورد استخراج صفت‌های مدل به عنوان یک داده خام در هنگام تغییر کدن آن و حفظ منطق در یک مکان می‌باشد. این [یک کامپونت مرتبه بالا](/docs/higher-order-components.html) می‌باشد که تمام صفت‌های یک مدل Backbone را درون state استخراج می‌کند و داده را به کامپوننت پوشش داده شده ارسال می‌کند.

با این راه، تنها کامپوننت مرتبه بالا نیاز به دانستن مدل‌های داخلی Backbone دارد و بیشتر قسمت‌های اپ می‌توانند از Backbone دور بمانند.

در مثال زیر، برای شکل دادن اولیه state یک کپی از صفت‌های مدل ایجاد می‌کنیم. ما در رویداد `change` subscribe می‌کنیم (و هنگام نابودی unsubscribe می‌کنیم) و زمانی که تغییر اتفاق افتاد، ما state را با صفت‌های در لحظه مدل به‌روز می‌کنیم. در نهایت، مطمئن می‌شویم که اگر prop خود `model` تغییر کند، ما فراموش نمی‌کنیم که از مدل قدیمی unsubscribe کنیم و در مدل جدید subscribe کنیم.

در نظر داشته باشید که این مثال قرار نیست با کار کردن با Backbone طاقت فرسا باشد اما باید به شما ایده چگونه انجام دادن این راه را بدهد:

```js{1,5,10,14,16,17,22,26,32}
function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange(model) {
      this.setState(model.changedAttributes());
    }

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />;
    }
  }
}
```

برای آن که نشان دهیم چگونه از آن استفاده کنید، یک کامپوننت ری‌اکت `NameInput` به یک مدل Backbone متصل خواهیم کرد و صفت `firstName` آن را با هر تغییر ورودی به‌روز می‌کنیم:

```js{4,6,11,15,19-21}
function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      My name is {props.firstName}.
    </p>
  );
}

const BackboneNameInput = connectToBackboneModel(NameInput);

function Example(props) {
  function handleChange(e) {
    props.model.set('firstName', e.target.value);
  }

  return (
    <BackboneNameInput
      model={props.model}
      handleChange={handleChange}
    />
  );
}

const model = new Backbone.Model({ firstName: 'Frodo' });
ReactDOM.render(
  <Example model={model} />,
  document.getElementById('root')
);
```

[**در CodePen امتحان کنید**](https://codepen.io/gaearon/pen/PmWwwa?editors=0010)

این تکنیک محدود به Backbone نیست. شما می‌تونید با subscribe کردن تغییرات در هر کتابخانه مدل در متدهای چرخه‌حیات و به صورت اختیاری کپی کردن داده در state محلی ری‌اکت از آن استفاده کنید.
