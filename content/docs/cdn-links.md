---
شناسه: cdn-links
عنوان: CDN Links
لینک دائمی: docs/cdn-links.html
قبلی: create-a-new-react-app.html
بعدی: release-channels.html
---

هر دوی React و ReactDOM بر روی یک CDN قابل دسترس هستند.

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

نسخه‌های فوق فقط برای توسعه هستند و برای تولید مناسب نیستند. نسخه‌های بهینه و فشرده شده نهایی React در مسیرهای زیر در دسترس هستند:

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

برای بارگذاری نسخه خاصی از `react` و `react-dom`, عدد `17` را با شماره نسخه جایگزین کنید.

### چرا باید خصیصه `crossorigin` را استفاده کنیم؟ {#why-the-crossorigin-attribute}

اگر از React تحت یک CDN استفاده می‌کنید, ما پیشنهاد می‌کنیم که خصیصه[`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) استفاده کنید:

```html
<script crossorigin src="..."></script>
```

ما همچنین توصیه می کنیم تأیید کنید که CDNای که استفاه می‌کنید سرآیند HTTP `Access-Control-Allow-Origin: *` را استفاده می‌کند:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

این کار باعت بهبود [تجربه کنترل خطا](/blog/2017/07/26/error-handling-in-react-16.html) در React 16 به بعد می‌شود.
