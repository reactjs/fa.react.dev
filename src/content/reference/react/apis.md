---
title: "APIهای پیش‌ساختهٔ ری‌اکت"
---

<Intro>

علاوه بر [هوک‌ها](/reference/react) و [کامپوننت‌ها](/reference/react/components)، پکیج `react` چند API دیگر نیز صادر می‌کند که برای تعریف کامپوننت‌ها مفید هستند. این صفحه تمام APIهای مدرن باقی‌ماندهٔ ری‌اکت را فهرست می‌کند.

</Intro>

---

* [`createContext`](/reference/react/createContext) به شما اجازه می‌دهد برای کامپوننت‌های فرزند کانتکست تعریف و ارائه کنید. به‌همراه [`useContext`](/reference/react/useContext) استفاده می‌شود.
* [`lazy`](/reference/react/lazy) به شما اجازه می‌دهد بارگذاری کد یک کامپوننت را تا زمانی که برای اولین بار رندر شود، به تعویق بیندازید.
* [`memo`](/reference/react/memo) به کامپوننت شما اجازه می‌دهد با پراپس یکسان از رندر مجدد بپردازد. به‌همراه [`useMemo`](/reference/react/useMemo) و [`useCallback`](/reference/react/useCallback) استفاده می‌شود.
* [`startTransition`](/reference/react/startTransition) به شما اجازه می‌دهد یک به‌روزرسانی استیت را به‌عنوان غیر فوری علامت‌گذاری کنید. شبیه به [`useTransition`](/reference/react/useTransition) است.
* [`act`](/reference/react/act) به شما اجازه می‌دهد رندرها و تعاملات را در تست‌ها بپیچید تا مطمئن شوید پیش از انجام assertionها، به‌روزرسانی‌ها پردازش شده‌اند.

---

## APIهای منابع {/*resource-apis*/}

*منابع* (Resources) را می‌توان بدون اینکه بخشی از استیت کامپوننت باشند، توسط آن خواند. به‌عنوان مثال، یک کامپوننت می‌تواند پیامی را از یک Promise بخواند یا اطلاعات استایل‌دهی را از یک کانتکست بخواند.

برای خواندن مقداری از یک منبع، از این API استفاده کنید:

* [`use`](/reference/react/use) به شما اجازه می‌دهد مقدار یک منبع مانند یک [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) یا [کانتکست](/learn/passing-data-deeply-with-context) را بخوانید.
```js
function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext);
  // ...
}
```
