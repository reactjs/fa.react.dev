---
title: ابزار توسعه ری‌اکت
---

<Intro>

از ابزار توسعه ری‌اکت برای بررسی [کامپوننت‌ها](/learn/your-first-component)، ویرایش [prop](/learn/passing-props-to-a-component) و [state](/learn/state-a-components-memory) و همچنین شناسایی مشکلات عملکردی استفاده می‌شود.  

</Intro>

<YouWillLearn>

* چگونه ابزار توسعه ری‌اکت را نصب کنید.

</YouWillLearn>

## اکستنشن های مرورگر {/*browser-extension*/}

نصب افزونه ابزار توسعه ری‌اکت ساده‌ترین روش برای اشکال‌زدایی وب‌سایت‌های ساخته‌شده با ری‌اکت است. این افزونه برای چند مرورگر محبوب در دسترس است.

* [نصب برای **Chrome**](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [نصب برای **Firefox**](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [نصب برای **Edge**](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

اکنون، اگر از یک وب‌سایت **ساخته‌شده با ری‌اکت** بازدید کنید، پانل‌های _Components_ و _Profiler_ را خواهید دید.

![React Developer Tools extension](/images/docs/react-devtools-extension.png)

### سافاری و سایر مرورگر ها {/*safari-and-other-browsers*/}
برای سایر مرورگر ها (مانند سافاری) پکیج [`react-devtools`](https://www.npmjs.com/package/react-devtools) را نصب کنید.
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

سپس ابزار های توسعه را از ترمینال باز کنید:
```bash
react-devtools
```

سپس با اضافه کردن تگ `<script>` زیر به ابتدای تگ `<head>` وب‌سایت خود را متصل کنید:
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

اکنون وب‌سایت خود را در مرورگر بازخوانی کنید تا بتوانید آن را در ابزار توسعه مشاهده کنید.

![React Developer Tools standalone](/images/docs/react-devtools-standalone.png)

## موبایل (ری‌اکت نیتیو) {/*mobile-react-native*/}

برای بررسی برنامه‌هایی که با [ری‌اکت نیتیو](https://reactnative.dev/) ساخته شده‌اند، می‌توانید از [React Native DevTools](https://reactnative.dev/docs/react-native-devtools) استفاده کنید. این ابزار اشکال‌زدای داخلی است که به‌طور کامل با ابزار توسعه ری‌اکت ادغام شده است. همه ویژگی‌ها، از جمله برجسته‌سازی و انتخاب عناصر بومی، به‌طور دقیق مشابه نسخه افزونه مرورگر کار می‌کنند.

[در مورد اشکال زدایی در ری‌اکت نیتیو بیشتر بخوانید.](https://reactnative.dev/docs/debugging)

> برای نسخه‌های ری‌اکت نیتیو قبل از 0.76، لطفاً از نسخه مستقل React DevTools مطابق [راهنمای سافاری و سایر مرورگرها](#safari-and-other-browsers) در بالا استفاده کنید.