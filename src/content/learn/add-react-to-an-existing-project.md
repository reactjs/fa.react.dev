---
title: اضافه کردن ری‌اکت به یک پروژه موجود
---

<Intro>

اگر می‌خواهید کمی تعامل‌پذیری به پروژه موجود خود اضافه کنید، نیازی نیست آن را از ابتدا با ری‌اکت بازنویسی کنید. ری‌اکت را به پشته فعلی خود اضافه کنید و کامپوننت‌های تعاملی ری‌اکت را در هر جایی رندر کنید.

</Intro>

<Note>

**برای توسعه محلی لازم است [Node.js](https://nodejs.org/en/) را نصب کنید.** هرچند می‌توانید [ری‌اکت را امتحان کنید](/learn/installation#try-react) به صورت آنلاین یا با یک صفحه HTML ساده، اما در عمل بیشتر ابزارهای جاوااسکریپت که برای توسعه نیاز خواهید داشت، به Node.js وابسته هستند.

</Note>

## استفاده از ری‌اکت برای یک زیرمسیر کامل در وب‌سایت موجود {/*using-react-for-an-entire-subroute-of-your-existing-website*/}

فرض کنید یک اپلیکیشن وب موجود در `example.com` دارید که با یک فناوری سمت سرور دیگر (مثل Rails) ساخته شده است و می‌خواهید تمام مسیرهایی که با `example.com/some-app/` شروع می‌شوند، به طور کامل با ری‌اکت پیاده‌سازی شوند.

پیشنهاد ما برای راه‌اندازی به این صورت است:

1. **بخش ری‌اکت اپلیکیشن خود را بسازید** با استفاده از یکی از [فریم‌ورک‌های مبتنی بر ری‌اکت](/learn/start-a-new-react-project).
2. **`/some-app` را به‌عنوان *مسیر پایه*** در پیکربندی فریم‌ورک خود مشخص کنید (راهنما: [Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)، [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3. **سرور یا پروکسی خود را پیکربندی کنید** تا همه درخواست‌های زیر مسیر `/some-app/` توسط اپلیکیشن ری‌اکت شما مدیریت شوند.

<<<<<<< HEAD
این کار باعث می‌شود بخش React اپلیکیشن شما بتواند از [بهترین شیوه‌ها](/learn/build-a-react-app-from-scratch#consider-using-a-framework) که در این فریم‌ورک‌ها تعبیه شده‌اند، بهره‌مند شود.
=======
This ensures the React part of your app can [benefit from the best practices](/learn/build-a-react-app-from-scratch#consider-using-a-framework) baked into those frameworks.
>>>>>>> d271a7ac11d2bf0d6e95ebdfacaf1038421f9be0

بسیاری از فریم‌ورک‌های مبتنی بر ری‌اکت فول‌استک هستند و به اپلیکیشن ری‌اکت شما اجازه می‌دهند از قابلیت‌های سرور استفاده کند. با این حال، حتی اگر نتوانید یا نخواهید جاوااسکریپت را روی سرور اجرا کنید، می‌توانید از همان رویکرد استفاده کنید. در این حالت، خروجی HTML/CSS/JS را (خروجی [`next export`](https://nextjs.org/docs/advanced-features/static-html-export) در Next.js یا حالت پیش‌فرض در Gatsby) در مسیر `/some-app/` سرو کنید.  

## استفاده از ری‌اکت برای بخشی از یک صفحه موجود {/*using-react-for-a-part-of-your-existing-page*/}

فرض کنید یک صفحه موجود دارید که با یک فناوری دیگر ساخته شده است (چه سمت سرور مثل Rails، چه سمت کلاینت مثل Backbone) و می‌خواهید کامپوننت‌های تعاملی ری‌اکت را در جایی از آن صفحه رندر کنید. این یکی از روش‌های رایج برای یکپارچه‌سازی ری‌اکت است—در واقع، برای بسیاری از سال‌ها در Meta بیشتر استفاده‌های ری‌اکت به همین شکل بوده است!  

می‌توانید این کار را در دو گام انجام دهید:

1. **یک محیط جاوااسکریپت راه‌اندازی کنید** که به شما اجازه دهد از [سینتکس JSX](/learn/writing-markup-with-jsx) استفاده کنید، کد خود را با سینتکس [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) به ماژول‌ها تقسیم کنید، و از پکیج‌ها (برای مثال React) در رجیستری [npm](https://www.npmjs.com/) استفاده کنید.  
2. **کامپوننت‌های ری‌اکت خود را رندر کنید** در جایی که می‌خواهید آن‌ها را در صفحه ببینید.  

روش دقیق این کار به تنظیمات موجود صفحه شما بستگی دارد، پس بیایید جزئیات آن را مرور کنیم.  

### گام ۱: راه‌اندازی یک محیط ماژولار جاوااسکریپت {/*step-1-set-up-a-modular-javascript-environment*/}

یک محیط جاوااسکریپت ماژولار به شما اجازه می‌دهد کامپوننت‌های ری‌اکت خود را در فایل‌های جداگانه بنویسید، به جای اینکه همه‌ی کدهایتان را در یک فایل قرار دهید. همچنین این محیط به شما امکان استفاده از همه‌ی پکیج‌های مفیدی که توسعه‌دهندگان دیگر در رجیستری [npm](https://www.npmjs.com/) منتشر کرده‌اند—از جمله خود React—را می‌دهد! اینکه چطور این کار را انجام دهید، به تنظیمات فعلی پروژه شما بستگی دارد:  

* **اگر اپلیکیشن شما از قبل به فایل‌هایی تقسیم شده است که از دستور `import` استفاده می‌کنند،** سعی کنید از همان تنظیمات موجود استفاده کنید. بررسی کنید که نوشتن `<div />` در کد JS شما خطای سینتکسی ایجاد می‌کند یا نه. اگر خطای سینتکسی ایجاد شد، ممکن است نیاز داشته باشید [کد جاوااسکریپت خود را با Babel تبدیل کنید](https://babeljs.io/setup)، و [پریست React در Babel](https://babeljs.io/docs/babel-preset-react) را فعال کنید تا بتوانید از JSX استفاده کنید.  

* **اگر اپلیکیشن شما هیچ تنظیماتی برای کامپایل ماژول‌های جاوااسکریپت ندارد،** آن را با [Vite](https://vite.dev/) راه‌اندازی کنید. جامعه Vite [یکپارچه‌سازی‌های زیادی با فریم‌ورک‌های بک‌اند](https://github.com/vitejs/awesome-vite#integrations-with-backends) از جمله Rails، Django و Laravel دارد. اگر فریم‌ورک بک‌اند شما در لیست نبود، [این راهنما](https://vite.dev/guide/backend-integration.html) را دنبال کنید تا Vite را به صورت دستی با بک‌اند خود یکپارچه کنید.  

برای بررسی اینکه آیا تنظیمات شما درست کار می‌کند، این دستور را در پوشه پروژه خود اجرا کنید:  

<TerminalBlock>
npm install react react-dom
</TerminalBlock>

سپس این خطوط کد را در بالای فایل اصلی جاوااسکریپت خود اضافه کنید (ممکن است نام آن `index.js` یا `main.js` باشد):  

<Sandpack>

```html public/index.html hidden
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <!-- Your existing page content (in this example, it gets replaced) -->
    <div id="root"></div>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

</Sandpack>

اگر کل محتوای صفحه شما با "Hello, world!" جایگزین شد، یعنی همه‌چیز درست کار کرده است! ادامه دهید.  

<Note>

ادغام یک محیط ماژولار جاوااسکریپت در یک پروژه موجود برای اولین بار می‌تواند کمی دلهره‌آور باشد، اما ارزشش را دارد! اگر جایی گیر کردید، منابع [جامعه](/community) یا [Vite Chat](https://chat.vite.dev/) را امتحان کنید.  

</Note>

### گام ۲: رندر کردن کامپوننت‌های ری‌اکت در هر جایی از صفحه {/*step-2-render-react-components-anywhere-on-the-page*/}

در گام قبلی، این کد را در بالای فایل اصلی خود قرار دادید:

```js
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

البته که شما واقعاً نمی‌خواهید محتوای HTML موجود را پاک کنید!  

این کد را حذف کنید.  

در عوض، احتمالاً می‌خواهید کامپوننت‌های ری‌اکت را در بخش‌های مشخصی از HTML خود رندر کنید. صفحه‌ی HTML خود (یا قالب‌های سروری که آن را تولید می‌کنند) را باز کنید و به هر تگی که می‌خواهید یک ویژگی [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) منحصربه‌فرد اضافه کنید. برای مثال:

```html
<!-- ... somewhere in your html ... -->
<nav id="navigation"></nav>
<!-- ... more html ... -->
```

این کار به شما امکان می‌دهد آن عنصر HTML را با استفاده از [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) پیدا کنید و آن را به [`createRoot`](/reference/react-dom/client/createRoot) بدهید تا بتوانید کامپوننت ری‌اکت خودتان را داخل آن رندر کنید:

<Sandpack>

```html public/index.html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
```

```js src/index.js active
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```

</Sandpack>

توجه کنید که محتوای اصلی HTML از `index.html` حفظ شده است، اما کامپوننت ری‌اکت شما با نام `NavigationBar` حالا داخل تگ `<nav id="navigation">` در HTML ظاهر می‌شود. برای اطلاعات بیشتر درباره رندر کردن کامپوننت‌های ری‌اکت داخل یک صفحه HTML موجود، مستندات مربوط به استفاده از [`createRoot`](/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) را مطالعه کنید.

وقتی ری‌اکت را در یک پروژه موجود به کار می‌گیرید، معمول است که کار را با کامپوننت‌های تعاملی کوچک (مانند دکمه‌ها) شروع کنید و سپس به‌تدریج «به سمت بالا حرکت کنید» تا جایی که در نهایت کل صفحه شما با ری‌اکت ساخته شود. اگر روزی به این نقطه رسیدید، توصیه می‌کنیم بلافاصله به [یک فریم‌ورک ری‌اکت](/learn/start-a-new-react-project) مهاجرت کنید تا بیشترین بهره را از ری‌اکت ببرید.

## استفاده از ری‌اکت نیتیو در یک اپ بومی موجود {/*using-react-native-in-an-existing-native-mobile-app*/}

[ری‌اکت نیتیو](https://reactnative.dev/) نیز می‌تواند به‌صورت تدریجی در اپلیکیشن‌های بومی موجود ادغام شود. اگر یک اپ بومی موجود برای اندروید (Java یا Kotlin) یا iOS (Objective-C یا Swift) دارید، [این راهنما](https://reactnative.dev/docs/integration-with-existing-apps) را دنبال کنید تا یک صفحه ری‌اکت نیتیو به آن اضافه کنید.
