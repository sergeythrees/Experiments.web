//global

class Display {
  constructor (displayId) {
    this._display = document.getElementById(displayId);
    this.isClear = true;
  }
  setContent(content) {
    this._display.firstChild.data = content;
  }
  getContent() {
    return this._display.firstChild.data;
  }
}

class Calc {
  constructor (display) {
    this._display = display;
    this._currentOperation = null;
    this._isWaitForEnter = true;
    this._wasDecimalAdded = false;
    this._firstNumber = 0;
    this._secondNumber = null;
    display.setContent(0);
  }
  setOperation(operation) {
    this._currentOperation = operation;
    this._secondNumber = null;
    this._firstNumber = this._display.getContent();
    this._isWaitForEnter = true;
  }
  addDecimal() {
    if (!this._wasDecimalAdded || this._isWaitForEnter) {
      display.setContent(display.getContent() + ".");
      this._wasDecimalAdded = true;
      this._isWaitForEnter = false;
    }
  }
  displayPressedDigit(digit) {
    if (this._isWaitForEnter) {
      display.setContent(digit);
      this._isWaitForEnter = false;
      this._wasDecimalAdded = false;
    }
    else {
      display.setContent(display.getContent() + digit);
    }
  }
  calculate() {
    if(this._secondNumber == null)
      this._secondNumber = display.getContent();
    this._currentOperation();
  }

  clear() {
    this._firstNumber = 0;
    this._secondNumber = null;
    this._wasDecimalAdded = false;
    display.setContent(0);
    this.setOperation(null);
  }

  changeSign() {
    display.setContent(-display.getContent());
  }
  percent() {
   display.setContent(+(+this._firstNumber / 100 * +display.getContent()).toFixed(4));
   this._firstNumber = display.getContent();
  }

  divide() {
   display.setContent(+(+this._firstNumber / +this._secondNumber).toFixed(6));
   this._firstNumber = display.getContent();
  }

  multiple() {
   display.setContent(+(this._firstNumber * this._secondNumber).toFixed(4));
   this._firstNumber = display.getContent();
  }

  substract() {
   display.setContent(this._firstNumber - this._secondNumber);
   this._firstNumber = display.getContent();
  }

  sum() {
   display.setContent(+this._firstNumber + +this._secondNumber);
   this._firstNumber = display.getContent();
  }


}

var
  DISPLAY_ID = 'displayId',
  display = new Display(DISPLAY_ID),
  calc = new Calc(display);

//main
for (var i=0; i<=9; ++i) {
  makeDigitButtonClickHandler(i);
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

function makeDigitButtonClickHandler(buttonId) {
  var
    button = document.getElementById(buttonId);
  button.onclick =  function (){
    calc.displayPressedDigit(button.firstChild.data)};
}
