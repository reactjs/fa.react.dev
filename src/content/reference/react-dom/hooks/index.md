---
title: "هوک‌های داخلی React DOM"
---

<Intro>

پکیج `react-dom` شامل هوک‌هایی است که فقط برای اپلیکیشن‌های وب (که در محیط DOM مرورگر اجرا می‌شوند) پشتیبانی می‌شوند. این هوک‌ها در محیط‌های غیر مرورگری مانند اپلیکیشن‌های iOS، Android یا Windows پشتیبانی نمی‌شوند. اگر به دنبال هوک‌هایی هستید که در مرورگرهای وب *و سایر محیط‌ها* پشتیبانی شوند، [صفحهٔ هوک‌های ری‌اکت](/reference/react) را ببینید. این صفحه همهٔ هوک‌های پکیج `react-dom` را فهرست می‌کند.

</Intro>

---

## هوک‌های فرم {/*form-hooks*/}

*فرم‌ها* به شما اجازه می‌دهند کنترل‌های تعاملی برای ارسال اطلاعات ایجاد کنید. برای مدیریت فرم‌ها در کامپوننت‌های خود، از یکی از این هوک‌ها استفاده کنید:

* [`useFormStatus`](/reference/react-dom/hooks/useFormStatus) به شما اجازه می‌دهد به‌روزرسانی‌هایی در رابط کاربری بر اساس وضعیت یک فرم انجام دهید.

```js
function Form({ action }) {
  async function increment(n) {
    return n + 1;
  }
  const [count, incrementFormAction] = useActionState(increment, 0);
  return (
    <form action={action}>
      <button formAction={incrementFormAction}>Count: {count}</button>
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      Submit
    </button>
  );
}
```
