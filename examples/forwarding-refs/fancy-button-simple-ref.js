// highlight-range{1-2}
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// حالا می توانید مستقیما یک ref به DOM button بگیرید:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
