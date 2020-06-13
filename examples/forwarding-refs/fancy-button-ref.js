import FancyButton from './FancyButton';

// highlight-next-line
const ref = React.createRef();

// کامپوننت FancyButton که ایمپورت کردیم کامپوننت مرتبه بالاتر LogProps می باشد.
// با وجود اینکه خروجی رندر شده یکسان خواهد بود،
// ref ما به جای کامپوننت داخلی FancyButton به LogPrpos اشاره خواهد کرد!
// و این یعنی برای مثال نمی توانیم تابع ref.current.focus() را فراخوانی کنیم
// highlight-range{4}
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
