---
id: thinking-in-react
title: فکر کردن در چارچوب ری‌اکت
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

به عقیده ما، ری‌اکت بهترین راه برای ساخت وب اپلیکیشن هایی سریع و بزرگ، با استفاده از جاوااسکریپت است و برای ما در فیسبوک و اینستاگرام خیلی خوب جواب داده است.

ری‌اکت بخش های خیلی خوب زیادی دارد، اما یکی از بهترین آنها، چگونگی نگرش به اپ هایی است که مشغول به ساخت آنها هستید.
در این سند (Document)، به فرایند تفکر در ساخت یک جدول محصولات با قابلیت جستجو خواهیم پرداخت، و برای ساخت این جدول از ری‌اکت استفاده میکنیم.


## شروع با یک مدل  {#start-with-a-mock}

تصور کنید که ما از قبل یک JSON API و یک مدل، که توسط طراح آماده شده، داریم. مدل آماده شده، چیزی شبیه به این است:

![Mockup](../images/blog/thinking-in-react-mock.png)

و JSON API هم این اطلاعات را در خود جا داده است:

```
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];
```

## قدم اول: رابط کاربری را به یک سلسله از کامپوننت ها تقسیم کنید{#step-1-break-the-ui-into-a-component-hierarchy}

اولین کاری که باید کنید، این است که دور هر کدام از کامپوننت های موجود خط بکشید و تمامی کامپوننت ها را به همراه زیرمجموعه های آن مشخص کنید و برای هر کدام یک نام در نظر بگیرید. (هر کامپوننت ممکن است یک یا چند کامپوننت زیر مجموعه داشته باشد)

اگر به همراه یک طراح (دیزاینر) کار میکنید، ممکن است او قبلا همین کار را انجام داده باشد. نامگذاری آنها برای لایه های مختلف در فایل فتوشاپی که تهیه کرده اند، میتواند نام کامپوننت ها در کد شما هم باشد!

اما چطور بفهمیم که یک بخش باید تبدیل به یک کامپوننت جداگانه شود؟ در این موارد بهتر است از همان تکنیک هایی استفاده کنیم که زمان تصمیم گیری برای تعریف یک تابع Function یا یک شیء Object جدید به کمک مان می آمدند.
یکی از این تکنیک ها ["اصل مسئولیت واحد" یا "اصل تک وظیفگی" ](https://en.wikipedia.org/wiki/Single_responsibility_principle), است.
این اصل بیان میکند که هر کامپوننت، باید در حالت ایده آل فقط یک کار را انجام دهد و اگر وظایف آن گسترش یافت، باید برای برای آن کامپوننت های زیر مجموعه Subcomponent تعریف کرد و وظایف اضافی را به آنها سپرد.

از آنجایی که اغلب یک مدل داده جیسون (JSON Data Model) به کاربر نشان داده میشود، متوجه خواهید شد که اگر این مدل درست ساخته شده باشد، رابط کاربری و ساختار کامپوننت های شما هم به درستی قابل ترسیم و تعیین خواهد بود.
این بدان دلیل است که مدل داده (Data Model) و رابط کاربری معمولا از یک معماری اطلاعات (information architecture) یکسان تبعیت میکنند.
رابط کاربری را طوری به کامپوننت های مختلف تقسیم کنید که هر کامپوننت با بخش خاصی از مدل داده مرتبط باشد.

![Component diagram](../images/blog/thinking-in-react-components.png)

در این تصویر می بینید که ما پنج کامپوننت در برنامه خود داریم و اطلاعاتی که هر کامپوننت نمایش میدهد را با حروف ایتالیک مشخص کرده ایم:

  1. **`FilterableProductTable` (نارنجی):** شامل تمام برنامه 
  2. **`SearchBar` (آبی):** *ورودی های کاربر* را دریافت میکند
  3. **`ProductTable` (سبز):** تمامی *مجموعه اطلاعات* را با توجه به *ورودی کاربر* نمایش داده و اطلاعات را فیلتر میکند
  4. **`ProductCategoryRow` (فیروزه ای):** یک تیتر را برای هر *دسته* نمایش میدهد
  5. **`ProductRow` (قرمز):** یک ردیف را برای هر *محصول* نمایش میدهد

اگر نگاهی به کامپوننت `ProductTable`بیندازید، متوجه میشوید که تیترهای جدول (شامل "Name" و “Price”) کامپوننت جداگانه ای ندارند که بیشتر یک موضوع سلیقه ای است و دلایل و استدلال هایی برای استفاده یا عدم استفاده از یک کامپوننت جداگانه برای آنها وجود دارد.
در این مثال، آن را بخشی از  `ProductTable` قرار دادیم، چرا که جزئی از *مجموعه داده ها data collection* بوده و رندر کردن آن وظیفه `ProductTable` است.
با این حال، اگر هدر جدول پیچیده تر شود (مثلا اگر گزینه ای برای مرتب کردن لیست محصولات اضافه میکردیم)، مطمئنا منطقی تر بود که آنها در یک کامپوننت جداگانه با نام `ProductTableHeader` بگذاریم

حالا که کامپوننت های موجود در پروژه را مشخص کردیم، وقتش رسیده که سلسله مراتب آنها را نیز تعیین کنیم. کامپوننت هایی که با توجه به مدل، درون یک کامپوننت دیگر قرار میگیرند، فرزند آن محسوب میشوند:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## قدم دوم: یک نسخه ایستا (Static) در ری‌اکت بسازید {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">این بخش را در <a href="https://codepen.io/gaearon/pen/BwWzwm">فکر کردن در چارچوب ری‌اکت: گام دوم</a> روی <a href="https://codepen.io">CodePen</a>ببینید.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Now that you have your component hierarchy, it's time to implement your app. The easiest way is to build a version that takes your data model and renders the UI but has no interactivity. It's best to decouple these processes because building a static version requires a lot of typing and no thinking, and adding interactivity requires a lot of thinking and not a lot of typing. We'll see why.

To build a static version of your app that renders your data model, you'll want to build components that reuse other components and pass data using *props*. *props* are a way of passing data from parent to child. If you're familiar with the concept of *state*, **don't use state at all** to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don't need it.

You can build top-down or bottom-up. That is, you can either start with building the components higher up in the hierarchy (i.e. starting with `FilterableProductTable`) or with the ones lower in it (`ProductRow`). In simpler examples, it's usually easier to go top-down, and on larger projects, it's easier to go bottom-up and write tests as you build.

At the end of this step, you'll have a library of reusable components that render your data model. The components will only have `render()` methods since this is a static version of your app. The component at the top of the hierarchy (`FilterableProductTable`) will take your data model as a prop. If you make a change to your underlying data model and call `ReactDOM.render()` again, the UI will be updated. You can see how your UI is updated and where to make changes. React's **one-way data flow** (also called *one-way binding*) keeps everything modular and fast.

Refer to the [React docs](/docs/) if you need help executing this step.

### A Brief Interlude: Props vs State {#a-brief-interlude-props-vs-state}

There are two types of "model" data in React: props and state. It's important to understand the distinction between the two; skim [the official React docs](/docs/state-and-lifecycle.html) if you aren't sure what the difference is. See also [FAQ: What is the difference between state and props?](/docs/faq-state.html#what-is-the-difference-between-state-and-props)

## Step 3: Identify The Minimal (but complete) Representation Of UI State {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with **state**.

To build your app correctly, you first need to think of the minimal set of mutable state that your app needs. The key here is [DRY: *Don't Repeat Yourself*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you're building a TODO list, keep an array of the TODO items around; don't keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Think of all of the pieces of data in our example application. We have:

  * The original list of products
  * The search text the user has entered
  * The value of the checkbox
  * The filtered list of products

Let's go through each one and figure out which one is state. Ask three questions about each piece of data:

  1. Is it passed in from a parent via props? If so, it probably isn't state.
  2. Does it remain unchanged over time? If so, it probably isn't state.
  3. Can you compute it based on any other state or props in your component? If so, it isn't state.

The original list of products is passed in as props, so that's not state. The search text and the checkbox seem to be state since they change over time and can't be computed from anything. And finally, the filtered list of products isn't state because it can be computed by combining the original list of products with the search text and value of the checkbox.

So finally, our state is:

  * The search text the user has entered
  * The value of the checkbox

## Step 4: Identify Where Your State Should Live {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/qPrNQZ">Thinking In React: Step 4</a> on <a href="https://codepen.io">CodePen</a>.</p>

OK, so we've identified what the minimal set of app state is. Next, we need to identify which component mutates, or *owns*, this state.

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. **This is often the most challenging part for newcomers to understand,** so follow these steps to figure it out:

For each piece of state in your application:

  * Identify every component that renders something based on that state.
  * Find a common owner component (a single component above all the components that need the state in the hierarchy).
  * Either the common owner or another component higher up in the hierarchy should own the state.
  * If you can't find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

Let's run through this strategy for our application:

  * `ProductTable` needs to filter the product list based on state and `SearchBar` needs to display the search text and checked state.
  * The common owner component is `FilterableProductTable`.
  * It conceptually makes sense for the filter text and checked value to live in `FilterableProductTable`

Cool, so we've decided that our state lives in `FilterableProductTable`. First, add an instance property `this.state = {filterText: '', inStockOnly: false}` to `FilterableProductTable`'s `constructor` to reflect the initial state of your application. Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as a prop. Finally, use these props to filter the rows in `ProductTable` and set the values of the form fields in `SearchBar`.

You can start seeing how your application will behave: set `filterText` to `"ball"` and refresh your app. You'll see that the data table is updated correctly.

## Step 5: Add Inverse Data Flow {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="Thinking In React: Step 5" class="codepen">See the Pen <a href="https://codepen.io/gaearon/pen/LzWZvb">Thinking In React: Step 5</a> on <a href="https://codepen.io">CodePen</a>.</p>

So far, we've built an app that renders correctly as a function of props and state flowing down the hierarchy. Now it's time to support data flowing the other way: the form components deep in the hierarchy need to update the state in `FilterableProductTable`.

React makes this data flow explicit to help you understand how your program works, but it does require a little more typing than traditional two-way data binding.

If you try to type or check the box in the current version of the example, you'll see that React ignores your input. This is intentional, as we've set the `value` prop of the `input` to always be equal to the `state` passed in from `FilterableProductTable`.

Let's think about what we want to happen. We want to make sure that whenever the user changes the form, we update the state to reflect the user input. Since components should only update their own state, `FilterableProductTable` will pass callbacks to `SearchBar` that will fire whenever the state should be updated. We can use the `onChange` event on the inputs to be notified of it. The callbacks passed by `FilterableProductTable` will call `setState()`, and the app will be updated.

## And That's It {#and-thats-it}

Hopefully, this gives you an idea of how to think about building components and applications with React. While it may be a little more typing than you're used to, remember that code is read far more than it's written, and it's less difficult to read this modular, explicit code. As you start to build large libraries of components, you'll appreciate this explicitness and modularity, and with code reuse, your lines of code will start to shrink. :)
