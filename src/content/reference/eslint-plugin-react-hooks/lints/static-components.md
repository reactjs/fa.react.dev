---
title: static-components
---

<Intro>

تأیید می‌کند که کامپوننت‌ها استاتیک هستند، و در هر رندر دوباره ایجاد نمی‌شوند. کامپوننت‌هایی که به‌صورت پویا دوباره ایجاد می‌شوند می‌توانند استیت را reset کنند و رندر مکرر بیش از حد تحریک کنند.

</Intro>

## جزئیات قانون {/*rule-details*/}

کامپوننت‌هایی که داخل کامپوننت‌های دیگر تعریف می‌شوند در هر رندر دوباره ایجاد می‌شوند. ری‌اکت هر کدام را به‌عنوان یک نوع کامپوننت کاملاً جدید می‌بیند، و کامپوننت قدیمی را unmount و کامپوننت جدید را mount می‌کند، و در این فرآیند همهٔ استیت‌ها و nodeهای DOM را تخریب می‌کند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Component defined inside component
function Parent() {
  const ChildComponent = () => { // New component every render!
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  };

  return <ChildComponent />; // State resets every render
}

// ❌ Dynamic component creation
function Parent({type}) {
  const Component = type === 'button' 
    ? () => <button>Click</button>
    : () => <div>Text</div>;
  
  return <Component />;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Components at module level
const ButtonComponent = () => <button>Click</button>;
const TextComponent = () => <div>Text</div>;

function Parent({type}) {
  const Component = type === 'button' 
    ? ButtonComponent  // Reference existing component
    : TextComponent;
  
  return <Component />;
}
```

## رفع اشکال {/*troubleshooting*/}

### نیاز به رندر کامپوننت‌های متفاوت به‌صورت شرطی دارم {/*conditional-components*/}

ممکن است برای دسترسی به استیت محلی، کامپوننت‌ها را داخل تعریف کنید:

```js {expectedErrors: {'react-compiler': [13]}}
// ❌ Wrong: Inner component to access parent state
function Parent() {
  const [theme, setTheme] = useState('light');
  
  function ThemedButton() { // Recreated every render!
    return (
      <button className={theme}>
        Click me
      </button>
    );
  }
  
  return <ThemedButton />;
}
```

به‌جای آن داده‌ها را به‌عنوان پراپس پاس دهید:

```js
// ✅ Better: Pass props to static component
function ThemedButton({theme}) {
  return (
    <button className={theme}>
      Click me
    </button>
  );
}

function Parent() {
  const [theme, setTheme] = useState('light');
  return <ThemedButton theme={theme} />;
}
```

<Note>

اگر خودتان را در حال wanting به تعریف کامپوننت‌ها داخل کامپوننت‌های دیگر برای دسترسی به متغیرهای محلی یافتید، این نشانه‌ای است که باید به‌جای آن پراپس بفرستید. این کار کامپوننت‌ها را قابل استفادهٔ مجدد و قابل تست‌تر می‌کند.

</Note>
