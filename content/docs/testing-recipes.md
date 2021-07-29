---
id: testing-recipes
title: دستورالعمل‌های تست 
permalink: docs/testing-recipes.html
prev: testing.html
next: testing-environments.html
---

الگوهای تست رایج برای کامپوننت‌های ری‌اکت.

> یادداشت:
>
> در این صفحه فرض می‌شود که شما از [Jest](https://jestjs.io/) به عنوان یک اجرا‌کننده تست استفاده می‌کنید. اگر شما از اجرا‌کننده تست متفاوتی استفاده می‌کنید، ممکن است لازم باشد API را تنظیم کنید، اما شکل کلی راه‌حل احتمالا ً یکسان خواهد بود. جزئیات بیشتری در مورد راه‌اندازی یک محیط تست نویسی را در صفحه [محیط‌های تست نویسی](/docs/testing-environments.html) بخوانید.

در این صفحه، در ابتدا از تابع کامپوننت‌ها استفاده خواهیم کرد. با این حال ، این راهبردهای تست نویسی بستگی به جزییات پیاده‌سازی ندارند، و همینطور برای کلاس کامپوننت‌ها هم خوب عمل می‌کنند .

- [راه‌اندازی (Setup) / آزادسازی (Teardown)](#setup--teardown)
- [تابع `()act`](#act)
- [رندرکردن (rendering)](#rendering)
- [واکشی داده (Data Fetching)](#data-fetching)
- [ماژول‌های ماک (Mocking Modules)](#mocking-modules)
- [رویداد‌ها (Events)](#events)
- [تایمر‌ها (Timers)](#timers)
- [تست Snapshot](#snapshot-testing)
- [رندرکننده‌های متعدد (Multiple Renderers)](#multiple-renderers)
- [چیزی از قلم افتاده‌است؟ (?Somthing Missing)](#something-missing)

---

### راه‌اندازی (Setup) / آزادسازی (Teardown) {#setup--teardown}

برای هر تست، ما معمولا ً می‌خواهیم درخت ری‌اکت خود را به یک المنت DOM رندر کنیم که به  `سند` متصل است . این مهم است به گونه‌ای که بتواند رویدادهای DOM را دریافت کند. هنگامی که تست به پایان می‌رسد ، ما می‌خواهیم " پاک‌سازی کنیم " و درخت را از `سند` جدا کنیم .

یک روش رایج برای انجام این کار ، استفاده از یک جفت بلاک‌های  `beforeEach` و `afterEach` است به طوری که آن‌ها همیشه در حال اجرا شدن و ایزوله کردن اثرات یک تست برای خود هستند:

```jsx
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  //راه اندازی کردن یک المنت دام(DOM) به عنوان یک هدف رندر
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // پاکسازی و خروج
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```

شما ممکن است از یک الگو متفاوت استفاده کنید ، اما به خاطر داشته باشید که ما می‌خواهیم پاکسازی را اجرا کنیم 'حتی اگر یک تست شکست بخورد' . در غیر این صورت ، تست‌ها می‌توانند " نشتی (leaky) " داشته باشند و یک تست می‌تواند رفتار یک تست دیگر را تغییر دهد . به این ترتیب این کار عیب‌یابی آن‌ها را دشوار می‌‌کند.

---

### تابع `()act` {#act}

هنگام نوشتن تست‌های رابط کاربری ، وظایفی مانند رندر کردن ، رخداد کاربر ، یا واکشی داده‌ها می‌تواند به عنوان " واحدهای " تعامل با یک رابط کاربری در نظر گرفته شود . `react-dom/test-utils` یک کمک‌ کننده را فراهم می‌کند که تابع [`act()`](/docs/test-utils.html#act) نامیده می‌شود که اطمینان حاصل می‌کند که همه به روز رسانی ‌های مربوط به این "واحدها" پردازش شده‌اند و به روی DOM اعمال شده‌اند قبل از اینکه شما هرگونه ادعایی بکنید:

```js
act(() => {
  // render components
});
// make assertions
```

این کار به شما کمک می‌کند تا اجرا کردن تست‌های خود را به آنچه که کاربران واقعی هنگام استفاده از برنامه شما تجربه خواهند کرد ، نزدیک‌تر کنید . بقیه این مثال‌ها از `act()` استفاده می‌کنند تا این اطمینان را به وجود آورند.

شما ممکن است متوجه شوید استفاده مستقیم از تابع `act()` یک مقدار زیاده گویی است. برای جلوگیری کردن از برخی تکرار واضحات، شما می‌توانید از یک کتابخانه مثل  [کتابخانه تست گرفتن ری‌اکت](https://testing-library.com/react) استفاده کنید، که دستیاران آن با تابع  `act()` تنیده شده‌اند.

> یادداشت:
>
> اسم تابع `act` از الگوی [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) گرفته شده‌است.

---

### رندرکردن (rendering) {#rendering}

معمولا ً، شما ممکن است بخواهید امتحان کنید که آیا یک کامپوننت به درستی برای ویژگی استفاده شده رندر می‌شود یا نه . یک کامپوننت ساده را در نظر بگیرید که یک پیغام بر پایه یک ویژگی رندر می‌کند:

```jsx
// hello.js

import React from "react";

export default function Hello(props) {
  if (props.name) {
    return <h1>Hello، {props.name}!</h1>;
  } else {
    return <span>Hey، stranger</span>;
  }
}
```

ما می‌توانیم یک تست برای این کامپوننت بنویسیم:

```jsx{24-27}
// hello.test.js

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name"، () => {
  act(() => {
    render(<Hello />، container);
  });
  expect(container.textContent).toBe("Hey، stranger");

  act(() => {
    render(<Hello name="Jenny" />، container);
  });
  expect(container.textContent).toBe("Hello، Jenny!");

  act(() => {
    render(<Hello name="Margaret" />، container);
  });
  expect(container.textContent).toBe("Hello، Margaret!");
});
```

---

### واکشی داده (Data Fetching) {#data-fetching}

به جای صداکردن API های واقعی در تمام تست‌های خود، شما می‌توانید با استفاده از داده‌های ساختگی درخواست خود را به صورت ساختگی (mock) انجام دهید. واکشی داده‌های ساختگی (mock) با استفاده از داده‌های " جعلی " از تست‌های متزلزل (flaky tests) ناشی از در دسترس نبودن بک‌اند جلوگیری می‌کند ، و باعث می‌شود آن‌ها سریع‌تر اجرا شودند. نکته: شما ممکن است هنوز هم بخواهید یک زیرمجموعه از تست‌ها را با استفاده از یک فریم‌ورک (framework) ["end-to-end"](/docs/testing-environments.html#end-to-end-tests-aka-e2e-tests) اجرا کنید که مشخص می‌کند آیا تمام اجزای برنامه با هم کار می‌کنند.

```jsx
// user.js

import React، { useState، useEffect } from "react";

export default function User(props) {
  const [user، setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }، [props.id]);

  if (!user) {
    return "loading...";
  }

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}
```

ما می‌توانیم برای آن تست بنویسم:

```jsx{23-33،44-45}
// user.test.js

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data"، async () => {
  const fakeUser = {
    name: "Joni Baez"،
    age: "32"،
    address: "123، Charming Avenue"
  };

  jest.spyOn(global، "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />، container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
```

---

### ماژول‌های ماک (Mocking Modules) {#mocking-modules}

برخی از ماژول‌ها ممکن است در محیط تست خوب کار نکنند ، یا شاید به اندازه خود تست ضروری نباشد. استفاده از این ماژول‌ها با جایگزین‌های ساختگی می‌تواند نوشتن تست‌ها را برای کدهایتان آسان‌تر کند .

یک کامپوننت  `Contact` را در نظر بگیرید که یک کامپوننت شخص ثالث ‍`GoogleMap‍‍‍‍‍‍` را دربر دارد:

```jsx
// map.js

import React from "react";

import { LoadScript، GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}

// contact.js

import React from "react";
import Map from "./map";

export default function Contact(props) {
  return (
    <div>
      <address>
        Contact {props.name} via{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          email
        </a>
        or on their <a data-testid="site" href={props.site}>
          website
        </a>.
      </address>
      <Map center={props.center} />
    </div>
  );
}
```

اگر نخواهیم این کامپوننت را در تست‌هایمان بار‌گزاری کنیم، ما می‌توانیم این وابستگی را به یک کامپوننت ساختگی ماک کنیم (mock out) و تست‌های خود را اجرا کنیم :

```jsx{10-18}
// contact.test.js

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
import MockedMap from "./map";

jest.mock("./map"، () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render contact information"، () => {
  const center = { lat: 0، long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />،
      container
    );
  });

  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");

  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
```

---

### رویداد‌ها (Events) {#events}

ما توزیع کردن رخداد‌های DOM اصلی را بر روی المنت‌های DOM پیشنهاد می‌کنیم ، و سپس نتیجه آن را بررسی می‌کنیم. یک کامپوننت `Toggle` را در نظر بگیرید:

```jsx
// toggle.js

import React، { useState } from "react";

export default function Toggle(props) {
  const [state، setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}
```

ما می‌توانیم این تست‌ها را برای آن بنویسیم:

```jsx{13-14،35،43}
// toggle.test.js

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./toggle";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("changes value when clicked"، () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />، container);
  });

  // get a hold of the button element، and trigger some clicks on it
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn on");

  act(() => {
    button.dispatchEvent(new MouseEvent("click"، { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn off");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click"، { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn on");
});
```

رویداد‌های مختلف DOM  و ویژگی‌های آن‌ها در سایت [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) شرح داده شده‌است. توجه داشته باشید که شما باید را در هر رویدادی که ایجاد می‌کنید ` { bubbles : true }` را پاس بدهید تا به شنونده ری‌اکت برسد چون ری‌اکت بصورت خودکار رویداد‌ها را به ریشه واگذار می‌کند .

> یادداشت:
>
> یک کتابخانه تست ری‌اکت [دستیار دقیق‌تر](https://testing-library.com/docs/dom-testing-library/api-events) برای فایر کردن (firing) رویداد‌ها پیشنهاد می‌دهد.

---

### تایمر‌ها (Timers)] {#timers}

کد شما ممکن است از توابع مبتنی بر تایمر مثل `setTimeout` استفاده کند تا کار بیشتری را در آینده برنامه‌ریزی کند. در این مثال، یک صفحه انتخاب چندگانه منتظر یک انتخاب و پیشروی است، اگر انتخاب در عرض ۵ ثانیه گرفته نشود زمانبندی به پایان می‌رسد:

```jsx
// card.js

import React، { useEffect } from "react";

export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }، 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }، [props.onSelect]);

  return [1، 2، 3، 4].map(choice => (
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  ));
}
```

ما می‌توانیم آزمون‌های مربوط به این کامپوننت را با استفاده از [ماک‌های زمانبندی Jest](https://jestjs.io/docs/en/timer-mocks) بنویسیم ، و حالات مختلفی را که در آن می‌تواند قرار بگیرد مورد بررسی قرار دهیم.

```jsx{7،31،37،49،59}
// card.test.js

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Card from "./card";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it("should select null after timing out"، () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />، container);
  });

  // move ahead in time by 100ms
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // and then move ahead by 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed"، () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />، container);
  });

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // unmount the app
  act(() => {
    render(null، container);
  });

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});

it("should accept selections"، () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />، container);
  });

  act(() => {
    container
      .querySelector("[data-testid='2']")
      .dispatchEvent(new MouseEvent("click"، { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
```

شما می‌توانید از تایمرهای مصنوعی تنها در برخی تست‌ها استفاده کنید. در بالا ، ما آن‌ها را با صدا کردن  `jest.useFakeTimers()` فعال کردیم . مزیت اصلی که آن‌ها ارائه می‌کنند این است که تست شما در واقع مجبور نیست پنج ثانیه صبر کند تا اجرا شود ، و همچنین شما نیازی ندارید که کامپوننت کد را فقط برای تست گرفتن پیچیده‌تر کنید.

---

###  تست Snapshot {#snapshot-testing}

فریم‌ورک‌هایی مثل Jest به شما اجازه می‌دهند که " اسنپ‌شات‌هایی (snapshots) " از داده‌ها را با [`toMatchSnapshot` / `toMatchInlineSnapshot`](https://jestjs.io/docs/en/snapshot-testing)  ذخیره کنید. با این موارد ، ما می‌توانیم خروجی کامپوننت‌های رندرشده را "ذخیره کرده" و اطمینان حاصل کنیم که یک تغییر در آن باید به صراحت مانند یک تغییر در اسنپ‌شات (snapshot) کامیت شود.

در این مثال، ما یک کامپوننت را رندر کردیم و HTML رندر شده را با پکیج [`pretty`](https://www.npmjs.com/package/pretty) فرمت کردیم، قبل از اینکه آن را به عنوان یک اسنپ‌شات (snapshot) داخلی ذخیره کنیم:

```jsx{29-31}
// hello.test.js، again

import React from "react";
import { render، unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render a greeting"، () => {
  act(() => {
    render(<Hello />، container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Jenny" />، container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */

  act(() => {
    render(<Hello name="Margaret" />، container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
});
```

به طور معمول بهتر است که بیشتر اسرت‌های (assertions) ویژه‌ای داشته باشید تا اینکه از اسنپ‌شات‌ها (snapshots) استفاده کنید. این نوع تست‌ها شامل جزییات پیاده‌سازی هستند به طوری که به راحتی شکسته شوند، و تیم‌ها می‌توانند نسبت به برکِیج‌های اسنپ‌شات (snapshot breakages) حساسیت نداشته باشند . به طور انتخابی [ماک کردن تعدادی از کامپوننت‌های فرزند](#mocking-modules) می‌تواند به کاهش اندازه اسنپ‌شات (snapshots) کمک کند و آن‌ها را برای مرور کدها قابل خواندن نگه دارد.

---

### رندرکننده‌های متعدد (Multiple Renderers) {#multiple-renderers}

در موارد نادر ، شما ممکن است یک تست را بر روی یک کامپوننت که از رندرکننده‌های متعدد استفاده می‌کند ، اجرا کنید. به عنوان مثال، شما ممکن است تست‌های اسنپ‌شات (snapshot) را بر روی یک کامپوننت با  `react-test-renderer` اجرا کنید، که به صورت داخلی از `ReactDOM.render` درون یک کامپوننت فرزند استفاده می‌کند  تا اینکه برخی محتوا را رندر کند. در این سناریو، شما می‌توانید به‌روزرسانی‌ها را بر طبق تابع `act()` مرتبط با رندرکننده‌هایشان پوشش دهید.

```jsx
import { act as domAct } from "react-dom/test-utils";
import { act as testAct، create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```

---

### چیزی از قلم افتاده‌است؟ (?Somthing Missing) {#something-missing}

اگر تعدادی سناریوی رایج پوشش داده نشده‌است، لطفاً اجازه دهید از طریق [issue tracker](https://github.com/reactjs/reactjs.org/issues) برای مستند‌سازی وب سایت اطلاع داشته باشیم.
