function main() {
  var
    DISPLAY_ID = 'displayId',
    display = new Display(DISPLAY_ID),
    calc = new Calc(display);

    for (var i=0; i<=9; ++i) {
      makeDigitButtonClickHandler(i, calc);
    }

    [
      ["AC",  function(){calc.clear()}],
      ["+/-", function(){calc.changeSign()}],
      ["%",   function(){calc.percent()}],
      ["÷",   function(){calc.setOperation(calc.divide)}],
      ["*",   function(){calc.setOperation(calc.multiple)}],
      ["-",   function(){calc.setOperation(calc.substract)}],
      ["+",   function(){calc.setOperation(calc.sum)}],
      ["=",   function(){calc.calculate()}],
      [",",   function (){calc.addDecimal()}],
     ]
    .forEach(function(item) {
      var
        button = document.getElementById(item[0]);
        button.onclick = item[1];
    });
}



function makeDigitButtonClickHandler(buttonId, calc) {
  var
    button = document.getElementById(buttonId);
  button.onclick =  function (){
    calc.displayPressedDigit(button.firstChild.data)};
}
