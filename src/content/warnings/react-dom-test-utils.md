---
title: هشدارهای منسوخ‌شدن react-dom/test-utils
---

## هشدار ReactDOMTestUtils.act() {/*reactdomtestutilsact-warning*/}

`act` از `react-dom/test-utils` به نفع `act` از `react` منسوخ شده است.

پیش از:

```js
import {act} from 'react-dom/test-utils';
```

پس از:

```js
import {act} from 'react';
```

## سایر APIهای ReactDOMTestUtils {/*rest-of-reactdomtestutils-apis*/}

تمام APIها به‌جز `act` حذف شده‌اند.

تیم ری‌اکت مهاجرت تست‌هایتان به [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) را برای یک تجربهٔ تست مدرن و به‌خوبی پشتیبانی‌شده توصیه می‌کند.

### ReactDOMTestUtils.renderIntoDocument {/*reactdomtestutilsrenderintodocument*/}

`renderIntoDocument` می‌تواند با `render` از `@testing-library/react` جایگزین شود.

پیش از:

```js
import {renderIntoDocument} from 'react-dom/test-utils';

renderIntoDocument(<Component />);
```

پس از:

```js
import {render} from '@testing-library/react';

render(<Component />);
```

### ReactDOMTestUtils.Simulate {/*reactdomtestutilssimulate*/}

`Simulate` می‌تواند با `fireEvent` از `@testing-library/react` جایگزین شود.

پیش از:

```js
import {Simulate} from 'react-dom/test-utils';

const element = document.querySelector('button');
Simulate.click(element);
```

پس از:

```js
import {fireEvent} from '@testing-library/react';

const element = document.querySelector('button');
fireEvent.click(element);
```

آگاه باشید که `fireEvent` یک رویداد واقعی را روی عنصر dispatch می‌کند و فقط مدیریت‌کنندهٔ رویداد را به‌طور مصنوعی فراخوانی نمی‌کند.

### فهرست تمام APIهای حذف‌شده {/*list-of-all-removed-apis-list-of-all-removed-apis*/}

- `mockComponent()`
- `isElement()`
- `isElementOfType()`
- `isDOMComponent()`
- `isCompositeComponent()`
- `isCompositeComponentWithType()`
- `findAllInRenderedTree()`
- `scryRenderedDOMComponentsWithClass()`
- `findRenderedDOMComponentWithClass()`
- `scryRenderedDOMComponentsWithTag()`
- `findRenderedDOMComponentWithTag()`
- `scryRenderedComponentsWithType()`
- `findRenderedComponentWithType()`
- `renderIntoDocument`
- `Simulate`
