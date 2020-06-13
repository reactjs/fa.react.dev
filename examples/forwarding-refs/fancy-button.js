class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// بر خلاف اکسپورت کردن FancyButton، ما LogProps را اکسپورت می کنیم
// گرچه به هر حال FancyButton را رندر می کند
// highlight-next-line
export default logProps(FancyButton);
