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
    this._display.setContent(0);
  }
  setOperation(operation) {
    this._currentOperation = operation;
    this._secondNumber = null;
    this._firstNumber = this._display.getContent();
    this._isWaitForEnter = true;
  }
  addDecimal() {
    if (!this._wasDecimalAdded || this._isWaitForEnter) {
      this._display.setContent(this._display.getContent() + ".");
      this._wasDecimalAdded = true;
      this._isWaitForEnter = false;
    }
  }
  displayPressedDigit(digit) {
    if (this._isWaitForEnter) {
      this._display.setContent(digit);
      this._isWaitForEnter = false;
      this._wasDecimalAdded = false;
    }
    else {
      this._display.setContent(this._display.getContent() + digit);
    }
  }
  calculate() {
    if(this._secondNumber == null)
      this._secondNumber = this._display.getContent();
    this._currentOperation();
  }

  clear() {
    this._firstNumber = 0;
    this._secondNumber = null;
    this._wasDecimalAdded = false;
    this._display.setContent(0);
    this.setOperation(null);
  }

  changeSign() {
    this._display.setContent(-this._display.getContent());
  }
  percent() {
   this._display.setContent(+(+this._firstNumber / 100 * +this._display.getContent()).toFixed(4));
   this._firstNumber = this._display.getContent();
  }

  divide() {
   this._display.setContent(+(+this._firstNumber / +this._secondNumber).toFixed(6));
   this._firstNumber = this._display.getContent();
  }

  multiple() {
   this._display.setContent(+(this._firstNumber * this._secondNumber).toFixed(4));
   this._firstNumber = this._display.getContent();
  }

  substract() {
   this._display.setContent(this._firstNumber - this._secondNumber);
   this._firstNumber = this._display.getContent();
  }

  sum() {
   this._display.setContent(+this._firstNumber + +this._secondNumber);
   this._firstNumber = this._display.getContent();
  }
}
