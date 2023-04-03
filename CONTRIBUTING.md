<h1 dir="rtl">راهنمای مشارکت‌کنندگان</h1>
<p dir="rtl">
از علاقه شما برای توسعه اسناد ری‌اکت به زبان فارسی سپاسگذاریم و این برای ما ارزشمند است. برای شروع آماده‌اید؟
</p>
<h2 dir="rtl">
یک صفحه را انتخاب کنید
</h2>
<p dir="rtl">
در توضیحات <a href="https://github.com/reactjs/fa.reactjs.org/issues/1">موضوع 1#</a> لیست صفحاتی که نیاز به ترجمه دارد آورده‌ شده‌است. اولویت ما شروع از صفحات Core Pages، با ترتیبی است که مشخص شده‌است. یکی از صفحاتی را که به موضوع آن علاقه‌مند هستید را برای شروع انتخاب کنید.
</p>
<p dir="rtl">
<b>نکته:</b>&nbsp;ترجمه صفحاتی که با علامت ✅ مشخص شده‌اند، انجام شده‌‌است.
اگر شناسه کاربری گیت‌هاب شخصی کنار عنوان صفحه درج شده‌است، ترجمه آن صفحه به عهده اوست.
</p>
<p dir="rtl">
با نوشتن یک کامنت روی <a href="https://github.com/reactjs/fa.reactjs.org/issues/1">موضوع 1#</a>، به نگاه‌دارندگان اطلاع دهید که تمایل دارید روی ترجمه چه صفحه‌ای کار کنید. پس از تایید، نام‌کاربری گیت‌هاب شما روبروی آن درج و ترجمه آن صفحه به شما واگذار می‌شود.
</p>
<h2 dir="rtl">
یک شاخه بسازید
</h2>
<p dir="rtl">
یک انشعاب از مخزن اصلی بگیرید و یک کپی از آن را روی سیستم خود قرار دهید. مطمئن شوید که روی شاخه <code>master</code> هستید. یک شاخه جدید با نام دلخواه خود ایجاد کنید (نکته: برای ترجمه هر صفحه، شما نیاز به یک شاخه‌ی جدید دارید).
</p>

<<<<<<< HEAD
```bash
# نام کاربری گیت‌هاب خود را در آدرس زیر قرار دهید
1. git clone git@github.com:[username]/fa.reactjs.org.git
2. cd fa.reactjs.org
3. git checkout master
# نام دلخواه شاخه خود را در دستور زیر قرار دهید
4. git checkout -b [the-name-of-my-branch]
=======
Thank you for your interest in contributing to the React Docs!

## Code of Conduct

Facebook has adopted a Code of Conduct that we expect project
participants to adhere to. Please [read the full text](https://code.facebook.com/codeofconduct)
so that you can understand what actions will and will not be tolerated.

## Technical Writing Tips

This is a [good summary](https://medium.com/@kvosswinkel/coding-like-a-journalist-ee52360a16bc) for things to keep in mind when writing technical docs.

## Guidelines for Text

**Different sections intentionally have different styles.**

The documentation is divided into sections to cater to different learning styles and use cases. When editing an article, try to match the surrounding text in tone and style. When creating a new article, try to match the tone of the other articles in the same section. Learn about the motivation behind each section below.

**[Learn React](https://react.dev/learn)** is designed to introduce fundamental concepts in a step-by-step way. Each individual article in Learn React builds on the knowledge from the previous ones, so make sure not to add any "cyclical dependencies" between them. It is important that the reader can start with the first article and work their way to the last Learn React article without ever having to "look ahead" for a definition. This explains some ordering choices (e.g. that state is explained before events, or that "thinking in React" doesn't use refs). Learn React also serves as a reference manual for React concepts, so it is important to be very strict about their definitions and relationships between them.

**[API Reference](https://react.dev/reference/react)** is organized by APIs rather than concepts. It is intended to be exhaustive. Any corner cases or recommendations that were skipped for brevity in Learn React should be mentioned in the reference documentation for the corresponding APIs.

**Try to follow your own instructions.**

When writing step-by-step instructions (e.g. how to install something), try to forget everything you know about the topic, and actually follow the instructions you wrote, a single step at time. Often you will discover that there is implicit knowledge that you forgot to mention, or that there are missing or out-of-order steps in the instructions. Bonus points for getting *somebody else* to follow the steps and watching what they struggle with. Often it would be something very simple that you have not anticipated.

## Guidelines for Code Examples

### Syntax

#### Prefer JSX to `createElement`.

Ignore this if you're specifically describing `createElement`.

#### Use `const` where possible, otherwise `let`. Don't use `var`.

Ignore this if you're specifically writing about ES5.

#### Don't use ES6 features when equivalent ES5 features have no downsides.

Remember that ES6 is still new to a lot of people. While we use it in many places (`const` / `let`, classes, arrow functions), if the equivalent ES5 code is just as straightforward and readable, consider using it.

In particular, you should prefer named `function` declarations over `const myFunction = () => ...` arrows for top-level functions. However, you *should* use arrow functions where they provide a tangible improvement (such as preserving `this` context inside a component). Consider both sides of the tradeoff when deciding whether to use a new feature.

#### Don't use features that aren't standardized yet.

For example, **don't** write this:

```js
class MyComponent extends React.Component {
  state = {value: ''};
  handleChange = (e) => {
    this.setState({value: e.target.value});
  };
}
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638
```

<h2 dir="rtl">
تغییرات را انجام دهید
</h2>

<p dir="rtl">
روش اجرای پروژه در <a href="https://github.com/reactjs/fa.reactjs.org#%D9%86%D8%B5%D8%A8">README.md</a> توضیح داده شده‌است. فایل‌هایی که در آن‌ها تغییر انجام شده‌است را ذخیره کنید و نتیجه را در مرورگر مشاهده کنید. نتیجه تغییر فایل‌های مسیر <code>src</code> و <code>content</code> به صورت خودکار در مرورگر بارگذاری می‌شود.
</p>

<h2 dir="rtl">
تست کنید
</h2>

<p dir="rtl">
در صورت امکان، نتیجه تغییرات ظاهری را در مرورگر‌های متفاوت و همچنین روی صفحه‌نمایش بزرگ و موبایل آزمایش کنید. سپس با اجرای دستور زیر در شاخه اصلی پروژه، تست‌ها را اجرا کنید. اگر تغییرات فقط شامل ترجمه باید، نباید مشکلی در این مرحله رخ دهد.
</p>

```bash
1. yarn check-all
```

<h2 dir="rtl">
زمان ارسال تغییرات رسیده
</h2>

<p dir="rtl">
تغییرات را با نوشتن یک پیام مناسب، کامیت کنید و به سرور گیت‌هاب بفرستید. سپس یک پول‌ریکوست به شاخه <code>master</code> از مخزن اصلی ثبت کنید.
</p>

```bash
# پیام موردنظر خود را در دستور زیر جایگزین کنید
1. git add -A && git commit -m "[the-message]"
# نام کاربری گیت‌هاب و نام شاخه مورد نظر باید در دستور زیر قرارگیرد
2. git push [my-fork-name] [the-name-of-my-branch]
```

<h2 dir="rtl">
کمی صبر کنید تا بررسی شود
</h2>

<p dir="rtl">
تغییرات شما باید توسط <b>حداقل یک نفر</b> از نگاه‌دارندگان بررسی و تایید شود. آن‌ها در این مرحله نظر خود را با شما در میان می‌گذارند. در صورت وجود مشکل، با همکاری آن‌ها مشکل برطرف و تغییرات با شاخه <code>master</code> ادغام خواهد شد.
</p>

<<<<<<< HEAD
<hr />

<p dir="rtl">
اگر فکر می‌کنید چیزی فراموش شده‌است یا نیاز به تصحیح دارد، حتما نظر خود را با ما درمیان بگذارید.
</p>
=======
````
```js {2}
function hello() {
  // this line will get highlighted
}
```
````

A range of lines:

````
```js {2-4}
function hello() {
  // these lines
  // will get
  // highlighted
}
```
````

Or even multiple ranges:

````
```js {2-4,6}
function hello() {
  // these lines
  // will get
  // highlighted
  console.log('hello');
  // also this one
  console.log('there');
}
```
````

Be mindful that if you move some code in an example with highlighting, you also need to update the highlighting.

Don't be afraid to often use highlighting! It is very valuable when you need to focus the reader's attention on a particular detail that's easy to miss.
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638
