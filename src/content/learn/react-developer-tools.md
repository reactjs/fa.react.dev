---
title: ابزار توسعه ری‌اکت
---

<Intro>
از ابزار توسعه ری‌اکت برای بررسی کردن [کاپوننت ها](/learn/your-first-component)، تغییرات [پراپ](/learn/passing-props-to-a-component) و [وضعیت ها](/learn/state-a-components-memory) و همچنین شناسایی مشکلات عملکردی و کارایی استفاده می شود. 
</Intro>

<YouWillLearn>

* چگونه ابزار توسعه ری‌اکت را نصب کنید.

</YouWillLearn>

## اکستنشن های مرورگر {/*browser-extension*/}

نصب کردن افزونه ابزار توسعه ری‌اکت، ساده ترین راهی است که برای اشکال زدایی کردن وبسایت های که با ری‌اکت ساخته شده اند وجود دارد. این افزونه برای مرورگر های معروف در دسترس می باشد.

* [نصب برای **Chrome**](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [نصب برای **Firefox**](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
* [نصب برای **Edge**](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil)

حالا اگر یک وب سایت که با **ری‌اکت** ساخته شده است را باز کنید، پنل های _Components_ و _Profiler_ را مشاهده خواهید کرد.

![React Developer Tools extension](/images/docs/react-devtools-extension.png)

### سافاری و سایر مرورگر ها {/*safari-and-other-browsers*/}
برای سایر مرورگر ها (مانند سافاری) پکیج [`react-devtools`](https://www.npmjs.com/package/react-devtools) را نصب کنید.
```bash
# Yarn
yarn global add react-devtools

# Npm
npm install -g react-devtools
```

بعد ابزار های توسعه را از ترمینال باز کنید:
```bash
react-devtools
```

سپس وب سایت خود را با اضافه کردن تگ `<script>` به ابتدای تگ `<head>`  به این پکیج متصل کنید.
```html {3}
<html>
  <head>
    <script src="http://localhost:8097"></script>
```

وب سایت خود را بارگیری مجدد کرده تا بتوانید آن را در ابزار توسعه مشاهده کنید.

![React Developer Tools standalone](/images/docs/react-devtools-standalone.png)

## موبایل (ری‌اکت نیتیو) {/*mobile-react-native*/}

برای بررسی کردن برنامه هایی که با [ری‌اکت نیتیو](https://reactnative.dev/) ساخته شده اند، میتوانید از [React Native DevTools](https://reactnative.dev/docs/react-native-devtools) استفاده کنید. این یک اشکال زدای درونی دارد که به صورت عمیق با ابزار توسعه ری‌اکت ادغام می شود. همه ویژگی ها به صورت کاملا یکسان با انچه در افزونه مروگر وجود دارد از جمله برجسته سازی عنصر و انتخاب شده ها کار می کند.

[در مورد اشکال زدایی در ری‌اکت نیتیو بیشتر بخوانید.](https://reactnative.dev/docs/debugging)

> برای نسخه های ری‌اکت نیتیو قبل از 0.76، لطفا از ابزار توسعه مستقل React DevTools برای [سافاری و سایر مرورگر ها](#safari-and-other-browsers) در راهنمای فوق استفاده کنید.
