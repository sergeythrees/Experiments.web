function main() {
  
  /**@type {string}*/
  const DISPLAY_ID = 'displayId';

  /**@type {Display}*/
  const display = new Display(DISPLAY_ID);

  /**@type {Calc}*/
  const calc = new Calc(display);

  /**@type {Array<string, Function>}*/
  let handlersMap =
      [ ["AC",  () => {calc.clear();}],
        ["+/-", () => {calc.changeSign();}],
        ["%",   () => {calc.percent();}],
        ["÷",   () => {calc.setOperation(calc.divide);}],
        ["*",   () => {calc.setOperation(calc.multiple);}],
        ["-",   () => {calc.setOperation(calc.subtract);}],
        ["+",   () => {calc.setOperation(calc.sum);}],
        ["=",   () => {calc.calculate();}],
        [",",   () => {calc.addDecimal();}] ];

  for (let id=0; id<=9; ++id) {
    addListenerById(String(id),
      () => {calc.displayPressedDigit(String(id));});
  };

  handlersMap.forEach(function(item) {
    addListenerById(item[0], item[1]);
  });

  /**@param {string} buttonId*/
  /**@param {Function} func*/
  function addListenerById(buttonId, func) {
    document.getElementById(buttonId)
        .addEventListener("click", func);
  }

}

main();