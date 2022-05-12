---
id: accessibility
title: Accessibility
permalink: docs/accessibility.html
---

## چرا دسترس پذیری؟ {#why-accessibility}

دسترس پذیری در وب (که معمولا به [**a11y**](https://en.wiktionary.org/wiki/a11y) نیز اشاره دارد)، یک طرح و نوعی ساخت صفحات وب است که هر فردی بتواند به آن دسترسی داشته باشد. پشتیبانی از دسترس پذیری یک لازمه برای تکنولوژی های کمکی است که با آن ها بتوان صفحات وب را تفسیر کرد.


ری‌اکت اغلب با استفاده از تکنیک های استاندارد HTML، پشتیبانی کاملی برای ساخت صفحات دسترس پذیر می‌کند.


## استاندادها و دستور عمل ها {#standards-and-guidelines}

### WCAG {#wcag}

برای ایجاد وب سایت های دسترس پذیر،[دستورعمل هایی برای محتواها در  وب](https://www.w3.org/WAI/standards-guidelines/wcag/) تهیه شده است.

چک لیست WCAG به صورت زیر تهیه شده است:

- [چک لیست WCAG  از Wuhcag](https://www.wuhcag.com/wcag-checklist/)
- [چک لیست WCAG از WebAIM](https://webaim.org/standards/wcag/checklist)
- [چک لیست از پروژه The A11Y ](https://a11yproject.com/checklist.html)

### WAI-ARIA {#wai-aria}

سند [ابتکار دسترسی به وب - برنامه های کاربردی اینترنت غنی در دسترس](https://www.w3.org/WAI/intro/aria)  تکنیک هایی برای ایجاد ویجت(Widgets) های دسترس پذیری با زبان جاوا اسکریپت در بر دارد.


توجه داشته باشید که تمامی attribute های  `aria-*`    در HTML  به صورت کامل در JSX  پشتیبانی می‌شود. با این که بیشتر صفت(attribute)  های DOM در ری‌اکت به صورت camelCased است این صفت  ها باید به صورت hyphen-cased (همچنین با نام های kebab-case , lisp-case  و.. نیز معروفند)  در HTML باشند:

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## HTML  معنایی (Semantic) {#semantic-html}
  Html  معنایی یکی از پایه ها در دسترس پذیری وب است. استفاده از المان های گوناگون HTML به منظور تقویت معانی اطلاعات در وب سایتها، برای ما گاهی اوقات نوعی دسترس پذیری به هصورت رایگان ایجاد می کند.

- [مرجع المان های HTML   در MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

بعضی اوقات ما قوانین وب معنایی را با اضافه کردن تگ `<div>` برای اینکه کد ما در ری‌اکت کار بدهد، می شکنیم. مخصوصا وقتی با  تگ های HTML لیست( تگ های `<ol>`، `<ul>` و `<dl>`) و یا با جدول`<table>`  کار می کنیم.در این موارد  ما باید از [فرگمنت ها در ری‌اکت](/docs/fragments.html)    برای گروه بندی کردن المان های مختلف استفاده کنیم.
برای مثال:

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

شما می‌تونید با استفاده از map روی ارایه ای از آیتم ها، از فرگمنت ها برای استفاده از المان های دیگر HTML  استفاده کنید

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // فرگمنت ها هنگام استفداده در مپ باید یک ویژگی
        // key داشته باشند

        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

زمانی هایی که ما به هیچ یکی از props  های تگ فرگمنت  نیاز نداریم می‌توانیم از [دستور کوتاه ](/docs/fragments.html#short-syntax) آن(در صورت پشتیبانی ابزار های ) استفاده کنیم :

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

برای اطلاعات بیشتر صفحه  [سند فرگمنت](/docs/fragments.html)  را مشاهده کنید.

## دسترس پذیری در فرم ها {#accessible-forms}

### برچسب ها( Labeling) {#labeling}
هر المان کنترلی در HTML مانند `<input>`  و  `<textarea>` به یک برچسب برای دسترس پذیری نیاز دارد. ما به برچسب های توضیحی که در صفحه نمایش خواننده نیز نمایش داده شود احتیاج داریم.

منابع زیر به ما چگونگی انجام این کار را توضیح می‌دهد:

- [منبع W3C برای چگونگی برچسب گذاری المان ها](https://www.w3.org/WAI/tutorials/forms/labels/)
- [منبع WebAIM برای چگونگی برچسب گذاری](https://webaim.org/techniques/forms/controls)
- [گروه Paciello که نام های دسترس پذیر را توضیح می‌دهد](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

اگرچه تمام این موارد HTML  عینا در ری‌اکت آورده می‌شود ولی توجه داشته باشید که ویژگی  `for` در JSX  به صورت `htmlFor` نوشته می شود.


```javascript{1}
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### هشدار خطا ها به کاربر {#notifying-the-user-of-errors}

وضعیت های خطا باید برای کاربر درک شود. لینک های زیر به ما نشان می دهد چطور یک خطا را در صفحه خواننده به نمایش در آوریم:

- [منبع W3C برای نمایش اعلان ها به کاربر](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [منبع WebAIM  در ارزیابی فرم ها](https://webaim.org/techniques/formvalidation/)

## کنترل تمرکز {#focus-control}

مطمئن شوید که برنامه وب شما ارتباط تعاملی کاملی با صفحه کلید دارد:

- [منبع WEbAIM که درباره دسترس پذری صفحه کلید صحبت می‌کند.](https://webaim.org/techniques/keyboard/)

### تمرکز های صفحه کلید و شکل ظاهری آن {#keyboard-focus-and-focus-outline}

در واقع تمرکز های صفحه کلید به المان هایی در DOM   اشاره دارد که برای دریافت ورودی از صفحه کلید انتخاب شده است. ما این موارد را هر کجا شکل و ظاهر آن به مانند شکل زیر باشد مشاهده می کنیم:

<img src="../images/docs/keyboard-focus.png" alt="Blue keyboard focus outline around a selected link." />

فقط با CSS  می توان این شکل و ظاهر را پاک کرد و برای مثال با تنظیم کردن `outline: 0` و جایگزین کردن ‌آن با شکل و ظاهری که مد نظرتان است.

### مکانیزمی برای رفتن به محتوای مورد نظر {#mechanisms-to-skip-to-desired-content}

مکانیزمی طراحی کنید که به کاربر اجازه رفتن به صفحات و المان های قبلی را فراهم کند چرا که این کار به پیمایش از طریق صفحه کلید کمک می‌کند و آن را سرعت می بخشد.

لینک هایی که برای این پیمایش در نظر گرفتید باید مخفی باشد و فقط زمانی که کاربر با صفحه کلید کار کرد نمایش داده شود.پیاده سازی این کار با المان ها و برخی تکنیک ها، ساده است:


- [منبع WebAIM  برای لینک هایی  به منظور پیمایش ](https://webaim.org/techniques/skipnav/)

همچنین استفاده از قواعد و المان های خاص HTML مانند `<main>`  و  `<aside>` برای مرزبندی ناحیه های مختلف صفحه که به عنوان یک تکنولوژی برای دسترس پذیری کردن، به کاربر اجازه رفتن سریع بین این نواحی را می دهد.

برای اطلاعات بیشتر در مورد دسترس پذیر کردن این المان ها به لینک زیر مراجعه کنید:


- [Landmark های دسترس پذیر](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### مدیریت تمرکز از طریق کد {#programmatically-managing-focus}

برنامه ری‌اکت ما به صورت مداوم در حال تغییر DOM  در HTML  است و گاهی اوقات باعث می‌شود که تمرکز (focus) از دست برود و یا به یک المان ناخواسته برود.برای رفع این مورد نیاز داریم که با صورت برنامه نویسی و با کد تمرکز صفحه کلید را  به مکان درست تکان دهیم.برای مثال برای تنظیم تمرکز کیبرد به دکمه ای که یک پنجره(modal) را باز می‌کند و بلافاصله بعد از اینکه ان پنجره بسته شد.

منبع MDN نگاهی به این موضوع کرده است و توضیج داده است که چطور میتوان [یک پیمایش از طریق صفحه کلید را با وی جت جاوااسکریپتی](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) ساخت.

برای تنظیم کردن تمرکز در ری‌اکت می توانیم از [Refs در DOM ](/docs/refs-and-the-dom.html)  استفاده کنیم.
برای این کار ابتدا باید یک ref به یک المان در JSX  ایجاد کنیم:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // ایجاد یک ref 
    // برای ذخیره یک المان  textInput 
    this.textInput = React.createRef();
  }
  render() {
  // استفاده از تابع برگشتی `ref` 
  // برای ذخیره یک رفرنس به المان textinput
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

سپس می تونیم تمرکز را روی این المان هر زمان که نیاز بود ببریم.

 ```javascript
 focus() {
   // با استفاده از توابع DOM 
   // میتوان تمرکز را روی این المان متنی قرار داد
   // توجه داشته باشید که برای دستیابی به نود باید از current  استفاده کرد
  
   this.textInput.current.focus();
 }
 ```

گاهی اوقات  کامپوننت پدر نیاز پیدا میکند که تمرکز را روی المانی که فرزند آن محسوب میشود ببرد. ما میتوانیم این کار را با [فرستادن DOM refs  ان المان به کامپوننت پدر](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components) به وسیله props ها انجام داد.

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// الان می‌توانید تمرکز هر وقتی نیاز است تنظیم کنید
this.inputElement.current.focus();
```

زمانیکه از [HOC](docs/higher-order-components.html)  برا ارث بری استفاده می کنید پیشنهاد میشود که ref  المان مورد نظر را به کامپونند پوششی (wrapped) از طریق  توابع  [forwardRef](/docs/forwarding-refs.html)  ری‌اکت ارسال کنید.اگر HOC دیگری داشتید که از forwardRef  استفاده نکرده بود می‌توانید از روش بالا که گفته شد استفاده کنید.


یک مدریت کننده بسیار خوب تمرکز [react-aria-modal](https://github.com/davidtheclark/react-aria-modal)  است. این یک مثال کم نظیر از یک کامپوننت پنجره با دسترس پذیری کامل است که نتنها تمرکز را بر روی دکمه بستن درهمان ابتدا تنظیم کرده (برای جلوگیری از فشاردادن تصادفی کلیدی در صفحه کلید توسط کاربر) بلکه تمرکز صفحه کلید را در داخل پنجره محدود کرده است.همچنین بعد از بسته شدن نیز تمرکز را به همان المانی که قبل از باز شدن پنجره بود باز میگرداند.


>نکته:
>
>نکته
گرچه این یکی از ویژگی های مهم از دسترس پذیری محسوب می شود اما باید عاقلانه مورد استفاده قرار بگیرد. از این ویژگی برای اطلاح تمرکز کیبرد وقتی تمرکز صفحه کلید مختل شده است استفاده کنید نه اینکه با پیشبینی رفتار کاربر بخواهید از ان استفاده کنید.
>.

## موس و رخداد های شاره گر {#mouse-and-pointer-events}

مطمعن شوید که کلیه عملکرد و رخداد هایی که با موس صدا زده میشود با استفاده از صفحه کلید نیز قابل دستیابی باشد.اگر فقط دستگاهایی که موس دارند  را در مد نظر داشته باشید، منجبر به عدم کارکرد برنامه شما  از سوی کاربرانی که با صفحه کلید کار می‌کنند می شود.

برای نمایش این مسله ، نگاهی به مسال زیر که دسترس پذیری را به وسلیه کلیک خراب می‌کند بندازید.ناحیه خارج از دکمه و منو که کاربر با کلیک بر روی آن ناحیه می‌تواند منو را ببندد.

<img src="../images/docs/outerclick-with-mouse.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with a mouse showing that the close action works." />

این کار با متصل کردن رخداد `کلیک` به ابجکت `window`  که منجبر به بستن منو میشود قابل پیاده سازی است:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

ین ممکن است برای کاربرانی که موس دارند خوب کار کندو اما با استفاده از صفحه کلید به صورت تنها باعث نقص د عملکرد میشود آن هم زمانی که با زدن tab  به المان دیگر می رویم و عملا شیء `window` هیچ رخدادی مبنی بر `کلیک` که منجر به بسته شدن منو می کند دریافت نمی کندو باعث می شود که این نکته پنهان در اپ شما باعث نقص عمکرد کارکرد کاربران شما شود.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with the keyboard showing the popover not being closed on blur and it obscuring other screen elements." />

عملکرد صحیح را می توان با رخداد هایی نظیر `onBlur`  و `onFocus`  بدست آورد:

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // در اینجا ما منوی مورد نظر را با تیک بعدی  با استفاده از setTimeout  می بندیم
  // این کار از آنجایی نیاز است که ما باید اول چک کنیم که اگر المان 
  // دیگری رخداد focus
  //  را زمانی دریافت کرده باشد که رخداد 
  // blur  صدا زده شده باشد
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // اگر المان فرزند رخداد focus 
  // را دریافت کرد. منوی را نبندد
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // ری‌اکت به ما با صدا زدن پی در پی رخداد های 
    // focus  و  blur المان پدر، کمک میکند
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

این کد نشان دهنده عملکرد صحیح همرد دستگاهای موس دار و هم در دستگاهای صفحه کلید دار است.این نکته را توجه داشته باشید که ویژگی `aria-*` برای پشتیبانی از کاربرانی که از ابزار صفحه خوان استفاده می کنند است.برای سادگی رخداد های صفحه کلید مانند `arrow key`  ها برای منوی پیاده سازی نشده است.

<img src="../images/docs/blur-popover-close.gif" alt="A popover list correctly closing for both mouse and keyboard users." />

این مسثالی از موارد زیادی که تکیه برنامه فقط به  دستگاهای با موس منجبر به عدم کارکرد مناسب برای کاربران با صفحه کلید می شود. تست همیشگی برنامه با صفحه کلید باعث می شود که مشکل سریعا برجسته تر شود و برای حل آن از رخداد های مربوط به کیبرد استفاده شود.

## ویجت های پیشرفته تر {#more-complex-widgets}

رابط کاربری های پیچیده  نباید به گونه ای باشد که دسترس پذیری کمتری پیدا کند.در حالی که دسترس پذیری به راحتی با کد ان هم نزدیک به HTML قابل دستیابی است، حتی پیچیده ترین ویجت ها نیز با کد قابل دسترسی پذیری اند.

اینجا ما دانش  و قوانین [ARIA ](https://www.w3.org/TR/wai-aria/#roles) را به همان نسبت [وضعیت و ویژگی های ARIA](https://www.w3.org/TR/wai-aria/#states_and_properties)  را نیاز داریم. این صفت  ها HTML  هستند که کاملا توسط JSX  پشتیبانی می شوند و مارا قادر می سازند که کامپوننت های کاملا دسترس پذیر با عملکرد بالا را بسازیم.

هر نوی از ویجت ها یک الگوی خاص طارحی دارد و انتظار می‌رود که عملکرد مشخصی بوسیله کاربران و همچنین مرورگر ها داشته باشد:

- [تمرین هایی از WAI-ARIA - الگو های طراحی و ویجت ها](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - نمونه های ARIA](https://heydonworks.com/practical_aria_examples/)
- [کامپوننت های فراگیر](https://inclusive-components.design/)

## موارد دیگری که باید به انها توجه داشت {#other-points-for-consideration}

### تنظیم زبان {#setting-the-language}

تنظیم زبان انسانی و متن آن صفحه که به ابزار های که متن صفحه را می خوانند کمک می کنند که صوت خود را مبا صفحه مطابقت دهند:

- [منابع زبان - WebAIM](https://webaim.org/techniques/screenreader/#language)

### تنظیم عنوان صفحه و سند {#setting-the-document-title}

مشخص کردن عنوان سند با تگ `<title>` برای توصیف صحیح محتوای صفحه به منظور اینکه کاربر از محتوای صفحه مطمئن شود:

- [WCAG - فهم نیاز عنون صفحه](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

ما می توانیم این کار را با ری‌اکت با [کامپوننت عنوان سند](https://github.com/gaearon/react-document-title) تنظیم کنیم.

### کنتراست و تضاد رنگ {#color-contrast}

مطمئن شوید که تمامی متن ها در وب سایت، تضاد رنگ مناسب داشته باشدند که حداکثر خوانایی را برای کاربران کم بینا داشته باشند:

- [WCAG - درک نیاز تصاد رنگی](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [همه چیز درباره تضاد رنگی و چرا باید شما به ان مجددا فکر کنید](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [پروژه A11y - تضاد رنگی چیست](https://a11yproject.com/posts/what-is-color-contrast/)

این خسته کننده است که تمامی رنگ های مناسب برای استفاده در وبسایت را به صورت دستی محاسبه کنیم بنابر این می‌توانیم از [ محاسبگر پالت رنگ دسترس پذیر](https://jxnblk.com/colorable/)      استفاده کنیم. 

هر دو ابزار aXe  و WAVE  که در پایین ذکر کرده ایم تصاد رنگ تست شده ای دارند.

اگر شما می خواهید توانایی تست کنتراست خود را گسترش دهید می توانید از ابزار های زیر استفاده کنید:

- [WebAIM - چک کننده کنتراست رنگ](https://webaim.org/resources/contrastchecker/)
- [گروه Paciello - آنالیز گر تضاد رنگ](https://www.paciellogroup.com/resources/contrastanalyser/)

## ابزار های توسعه و تست {#development-and-testing-tools}

چند ابزاری وجود دارند که به ما در ساخت برنامه های دسترس پذیر کمک می کنند.

### صفحه کلید {#the-keyboard}

یکی از مهمترین و البته ساده ترین تست ها ایتسن که آیا وبسایت قابل دسترس و استفاده توسط صفحه کلید به تنهایی است.برای این بررسی موارد زیر را انجام بدهید:


1. موس را قطع کنید
2. با استفاده از tab  و Shift  وارد سایت شوید
3. با دکمه Enter المان های صفحه را فعال کنید
4. در صورت نیاز با کلید های جهت دار صفحه کیبرد با المان های صفحه مانند منو  ارتباط برقرار کنید.

### دستیار توسعه {#development-assistance}

ما میتوانیم برخی ویژگی های دسترسی پذیری را مستقیما در کد چک کنیم. برخی تست های هوشمند قبلا در IDE  هایی که JSX را پشتیبانی می کند برای قواعد، وضعیت ها و ویژگی های ARIA  تهیه شده است.همچنین ما به ابزارهایی نظیر زیر دسترسی داریم :

#### eslint-plugin-jsx-a11y {#eslint-plugin-jsx-a11y}

این پلاگین برای [eslint](https://github.com/evcohen/eslint-plugin-jsx-a11y)  تهیه شده که یک بازخورد AST Linting  از موارد دسترس پذیری در کد JSX  شما را تهیه می‌کند. بیشتر IDE ها به شما اجازه ادغام و استفاده از از این ابزار های را برای کد های شما می دهد.

پکیج [Create React App](https://github.com/facebookincubator/create-react-app)  این پلاگین را با مجموعه ای از قوانین فعال شده دارد.اگر تمایل به اضافه کردن قوانین بیشتری برای دسترس پذیری دارید می توانید یک فایل `eslintrc.` در پوشه اصلی پروژه ساخته با محتوای زیر بسازید:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### تست دسترس پذیری در مرورگر {#testing-accessibility-in-the-browser}

ابزارهایی نیز هستند که موارد دسترسی پذیری را در وب سایت شما از طریق مرورگر  انجام می دهد. لطفا آنها را با ادغام با دیگر ابزار های دیگر که در اینجا ذکر شد استفاده کنید چراکه آنها موارد فنی  دسترس پذیری را فقط در نظر می گیرند.

#### aXe, aXe-core and react-axe {#axe-axe-core-and-react-axe}

سیستم Deque پیشنهاد [aXe-core](https://github.com/dequelabs/axe-core)  را می دهد که نوعی تست end-to-end دسترس پذیری است. این ماژول ادغام هایی برای Selenium دارد.

 در واقع aXe  یا [موتور دسترس پذیری](https://www.deque.com/products/axe/)  یک افزونه مروگر از نوع `inspector`  است.

همچنین شما می توانید از ماژول  [react-axe](https://github.com/dylanb/react-axe) برای گزارش دادن این موارد دسترس پذیری در کنسول توسعه دهنده در هنگام توسعه و دیباگ استفاده کنید.


#### WebAIM WAVE {#webaim-wave}

افزونه به نام  ابزار ارزیابی دسترس پذیری وب نیز از دیگر این موارد است.

#### بازرس دسترس پذیری  و درخت دسترسی  {#accessibility-inspectors-and-the-accessibility-tree}

[درخت دسترس پذیری](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) یکی از زیر مجموعه های  درخت DOM  است که شامل شیء دسترس پذیر برای هر المان DOM  است که باید در معرض دستیار ها و ابزار های مانند خواندن صفحه باشد.
در برخی مرورگر ها ما می توانیم به راحتی  اطلاعات دسترسی پذیری را برای هر المان  در درخت آن مشاهده کنیم:

 

- [دسترسی به اطلاعات دسترسی پذیری در مرورگر فایرفاکس](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [دسترسی به اطلاعات دسترسی پذیری در مرورگر کروم](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [دسترسی به اطلاعات دسترسی پذیری در مرورگر سافاری](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### ابزار های خواندن صفحه {#screen-readers}

تست با ابزار های خواندن صفحه باید بخشی از فرایند تست دسترس پذیری شما باشد.
لطفا توجه داشته باشید که ترکیب مرورگر -  ابزار خواندن صفحه موضوع اصلی است. پیشنهاد می شود که برای تست برنامه  بهترین  ابزار مناسب با مرورگر خود را انتخاب کنید.


### ابزار های خواندن صفحه رایج {#commonly-used-screen-readers}

#### NVDA در فایرفاکس {#nvda-in-firefox}

[NonVisual ابزار](https://www.nvaccess.org/) یک برنامه متن باز رایج در سیستم عامل ویندوز است که به صورت گسترده استفاده می شود.
باتوجه به مطالب گفته شده برای استفاده بهتر از این ابزار :

- [منبع WebAIM  - استفاده از NVDA  برای ارزیابی دسترس پذیری وب](https://webaim.org/articles/nvda/)
- [منبع Deque  - کلید های میانبر NVDA](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver در سافاری  {#voiceover-in-safari}

ابزار VoiceOver یک ابزار ادغامی در دستگاهای اپل است.

بر اساس انچه گفته شد برای فعال سازی و استفاده از VoiceOver :


- [منبع WebAIM - استفاده از VoiceOver برای سنجش دسترس پذیری وب](https://webaim.org/articles/voiceover/)
- [منبع Deque - ابزار VoiceOver و کلید های میانبر](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [منبع Deque  ابزار VoiceOver  و کلید های میانبر برای سیستم عامل iOS](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS درمرورگر اینترنت اکسپلورر {#jaws-in-internet-explorer}

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) یا JAWS یک ابزار پر امکانات دیگر برای سیستم عامل ویندوز است
بر اساس انچه گفته شد  برای استفاده بهتر از این ابزار :


- [منبع WebAIM - استفاده از JAWS برای ارزیابی دسترس پذیری وب](https://webaim.org/articles/jaws/)
- [منبع Deque  - کلید های میابر JAWS](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### دیگر ابزار های خواند صفحه {#other-screen-readers}

#### ChromeVox in در مرورگر کروم {#chromevox-in-google-chrome}

 [ChromeVox](https://www.chromevox.com/) یک ابزار ادغامی برای خاندن صفحه در کروم بوک ها است و به عنوان یک [افزونه](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) برای مرورگر کروم قابل استفاده است

بر اساس انچه گفته شد  برای استفاده بهتر از این ابزار :

- [آموزش  Google Chromebook - استفاده از خوانده صفحه](https://support.google.com/chromebook/answer/7031755?hl=en)
- [مرجه کیلد های میانبر  ChromeVox کلاسیک](https://www.chromevox.com/keyboard_shortcuts.html)
