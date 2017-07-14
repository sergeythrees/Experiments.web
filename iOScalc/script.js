//global
var
  DISPLAY_ID = 'displayId',
  display = document.getElementById(DISPLAY_ID),
  lastSavedDigit = 0,
  secondDigit = null,
  currentOperation = null,
  clearDisplayFlag = false;

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
  [",", changeSign],
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
  lastSavedDigit = display.firstChild.data;
  clearDisplayFlag = false;
  document.getElementById("=").onclick = function(){
    if (secondDigit == null)
      secondDigit = display.firstChild.data;
    currentOperation();};
}

function makeDigitButtonClickHandler(buttonId) {
  var
    button = document.getElementById(buttonId);
  button.onclick =  function (){
    displayPressedDigit(button.firstChild.data)};
}

function displayPressedDigit(digit) {
  if (display.firstChild.data == 0) {
    lastSavedDigit = display.firstChild.data;
    display.firstChild.data = digit;
  }
  else {
    if (currentOperation != null && clearDisplayFlag == false) {
      lastSavedDigit = display.firstChild.data;
      display.firstChild.data = digit;
      clearDisplayFlag = true;
    }
    else {
        display.firstChild.data = display.firstChild.data + digit;
    }
  }
}

function displayOperationResult(digit) {
  display.firstChild.data = digit;
  lastSavedDigit = digit;
}

function clear() {
  lastSavedDigit = 0;
  secondDigit = null;
  display.firstChild.data = 0;
  changeCurrentOperation(null);
}

function changeSign() {
  display.firstChild.data = -display.firstChild.data;
}

function percent() {
  display.firstChild.data = +lastSavedDigit / 100 * +display.firstChild.data;
  lastSavedDigit = display.firstChild.data;
}

function divide() {
  display.firstChild.data = +lastSavedDigit / +secondDigit;
  lastSavedDigit = display.firstChild.data;
}

function multiple() {
  display.firstChild.data = lastSavedDigit * secondDigit;
  lastSavedDigit = display.firstChild.data;
}

function substract() {
  display.firstChild.data = lastSavedDigit - secondDigit;
  lastSavedDigit = display.firstChild.data;
}

function sum() {
  display.firstChild.data = +lastSavedDigit + +secondDigit;
  lastSavedDigit = display.firstChild.data;
}
