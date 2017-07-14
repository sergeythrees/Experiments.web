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
    this._firstNumber = 0;
    this._secondNumber = null;
  }
  setOperation(operation) {
    this._currentOperation = operation;
    this._secondNumber = null;
    this._firstNumber = this._display.getContent();
    this.isWaitForEnter = true;
    // document.getElementById("=").onclick = function(){
    //   if (secondDigit == null)
    //     secondDigit = display.getContent();
    //   currentOperation();};
  }

}

var
  DISPLAY_ID = 'displayId',
  display = new Display(DISPLAY_ID),
  lastSavedDigit = 0,
  secondDigit = null,
  currentOperation = null,
  clearDisplayFlag = false,
  wasDecimalAdded = false;

//main
for (var i=0; i<=9; ++i) {
  makeDigitButtonClickHandler(i);
}

[ ["AC", clear],
  ["+/-", changeSign],
  ["%", percent],
  ["÷", function(){changeCurrentOperation(divide)}],
  ["*", function(){changeCurrentOperation(multiple)}],
  ["-", function(){changeCurrentOperation(substract)}],
  ["+", function(){changeCurrentOperation(sum)}],
  ["=", currentOperation],
  [",", addDecimal],
 ]
.forEach(function(item) {
  var
    button = document.getElementById(item[0]);
    button.onclick = item[1];
});



//functions
function changeCurrentOperation(operation) {
  currentOperation = operation;
  secondDigit = null;
  lastSavedDigit = display.getContent();
  clearDisplayFlag = false;
  document.getElementById("=").onclick = function(){
    if (secondDigit == null)
      secondDigit = display.getContent();
    currentOperation();};
}

function makeDigitButtonClickHandler(buttonId) {
  var
    button = document.getElementById(buttonId);
  button.onclick =  function (){
    displayPressedDigit(button.firstChild.data)};
}

function addDecimal() {
  if (!wasDecimalAdded)
    display.setContent(display.getContent() + ".");
  wasDecimalAdded = true;
}

function displayPressedDigit(digit) {
  if (display.getContent() == 0) {
    lastSavedDigit = display.getContent();
    display.setContent(digit);
  }
  else {
    if (currentOperation != null && clearDisplayFlag == false) {
      lastSavedDigit = display.getContent();
      display.setContent(digit);
      clearDisplayFlag = true;
      wasDecimalAdded = false;
    }
    else {
        display.setContent(display.getContent() + digit);
    }
  }
}

function displayOperationResult(digit) {
  display.setContent(digit);
  lastSavedDigit = digit;
}

function clear() {
  lastSavedDigit = 0;
  secondDigit = null;
  wasDecimalAdded = false;
  display.setContent(0);
  changeCurrentOperation(null);
}

function changeSign() {
  display.setContent(-display.getContent());
}

function percent() {
  display.setContent(+(+lastSavedDigit / 100 * +display.getContent()).toFixed(4));
  lastSavedDigit = display.getContent();
}

function divide() {
  display.setContent(+(+lastSavedDigit / +secondDigit).toFixed(6));
  lastSavedDigit = display.getContent();
}

function multiple() {
  display.setContent(+(lastSavedDigit * secondDigit).toFixed(4));
  lastSavedDigit = display.getContent();
}

function substract() {
  display.setContent(lastSavedDigit - secondDigit);
  lastSavedDigit = display.getContent();
}

function sum() {
  display.setContent(+lastSavedDigit + +secondDigit);
  lastSavedDigit = display.getContent();
}
