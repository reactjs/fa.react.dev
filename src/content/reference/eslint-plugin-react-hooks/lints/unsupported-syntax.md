---
title: unsupported-syntax
---

<Intro>

سینتکسی که React Compiler پشتیبانی نمی‌کند را اعتبارسنجی می‌کند. در صورت نیاز، همچنان می‌توانید از این سینتکس خارج از ری‌اکت استفاده کنید، مانند یک تابع کمکی مستقل.

</Intro>

## جزئیات قانون {/*rule-details*/}

React Compiler نیاز دارد کد شما را به‌صورت ایستا تحلیل کند تا بهینه‌سازی‌ها را اعمال کند. قابلیت‌هایی مانند `eval` و `with` غیرممکن می‌سازند که در زمان کامپایل به‌صورت ایستا فهمید چه کاری کد انجام می‌دهد، بنابراین کامپایلر نمی‌تواند کامپوننت‌هایی که از آن‌ها استفاده می‌کنند را بهینه‌سازی کند.

### نامعتبر {/*invalid*/}

نمونه‌هایی از کد نادرست برای این قانون:

```js
// ❌ Using eval in component
function Component({ code }) {
  const result = eval(code); // Can't be analyzed
  return <div>{result}</div>;
}

// ❌ Using with statement
function Component() {
  with (Math) { // Changes scope dynamically
    return <div>{sin(PI / 2)}</div>;
  }
}

// ❌ Dynamic property access with eval
function Component({propName}) {
  const value = eval(`props.${propName}`);
  return <div>{value}</div>;
}
```

### معتبر {/*valid*/}

نمونه‌هایی از کد درست برای این قانون:

```js
// ✅ Use normal property access
function Component({propName, props}) {
  const value = props[propName]; // Analyzable
  return <div>{value}</div>;
}

// ✅ Use standard Math methods
function Component() {
  return <div>{Math.sin(Math.PI / 2)}</div>;
}
```

## رفع اشکال {/*troubleshooting*/}

### نیاز به ارزیابی کد پویا دارم {/*evaluate-dynamic-code*/}

ممکن است نیاز به ارزیابی کد ارائه‌شده توسط کاربر داشته باشید:

```js {expectedErrors: {'react-compiler': [3]}}
// ❌ Wrong: eval in component
function Calculator({expression}) {
  const result = eval(expression); // Unsafe and unoptimizable
  return <div>Result: {result}</div>;
}
```

به‌جای آن از یک پارسر عبارت امن استفاده کنید:

```js
// ✅ Better: Use a safe parser
import {evaluate} from 'mathjs'; // or similar library

function Calculator({expression}) {
  const [result, setResult] = useState(null);

  const calculate = () => {
    try {
      // Safe mathematical expression evaluation
      setResult(evaluate(expression));
    } catch (error) {
      setResult('Invalid expression');
    }
  };

  return (
    <div>
      <button onClick={calculate}>Calculate</button>
      {result && <div>Result: {result}</div>}
    </div>
  );
}
```

<Note>

هرگز از `eval` با ورودی کاربر استفاده نکنید - این یک ریسک امنیتی است. برای موارد استفادهٔ خاص مانند عبارات ریاضی، تجزیهٔ JSON، یا ارزیابی قالب، از کتابخانه‌های تجزیهٔ اختصاصی استفاده کنید.

</Note>
