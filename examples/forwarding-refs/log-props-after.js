function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      // highlight-next-line
      const {forwardedRef, ...rest} = this.props;

       // انتصاب یک props سفارشی "forwardedRef" به عنوان یک ref
      // highlight-next-line
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // توجه کنید که دومین پارامتر "ref" توسط React.forwardRef فراهم شده است.
  // ما می توانیم آن را به عنوان یک props عادی، مانند "forwardedRef" به LogProps منتقل کنیم
  // و سپس می تواند به کامپوننت متصل شود
  // highlight-range{1-3}
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
