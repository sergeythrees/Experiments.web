class Display {

  /**@param {!string} displayId*/
  constructor(displayId) {
    /**@private {?Element}*/
    this._display = document.getElementById(displayId);
  }

  /**@param {string | number} content*/
  setContent(content) {
    this._display.textContent = String(content);
  }

  getContent() {
    return this._display.textContent;
  }
}

class Calc {
  /**@param {?Display} display*/
  constructor(display) {
    /**@private*/
    this._display = display;

    /**@private {?Function}*/
    this._currentOperation = null;

    /**@private {boolean}*/
    this._isWaitForEnter = true;

    /**@private {boolean}*/
    this._wasDecimalAdded = false;

    /**@private {number}*/
    this._firstNumber = 0;

    /**@private {?number}*/
    this._secondNumber = null;

    this._display.setContent(0);
  }

  setOperation(operation) {
    this._currentOperation = operation;
    this._secondNumber = null;
    this._firstNumber = +this._display.getContent();
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
    if (!this._secondNumber) {
      this._secondNumber = this._display.getContent();
    }
    this._firstNumber = this._currentOperation(this._firstNumber, this._secondNumber);
    this._display.setContent(Math.round(this._firstNumber * 1000000) / 1000000);
  }

  clear() {
    this._firstNumber = 0;
    this._wasDecimalAdded = false;
    this._display.setContent(0);
    this.setOperation(null);
  }

  changeSign() {
    this._display.setContent(-(this._display.getContent()));
  }

  percent() {
    this._display.setContent(this._firstNumber / 100 * +this._display.getContent());
  }

  /**@param {number} first*/
  /**@param {number} second*/
  /**@return {number}*/
  divide(first, second) {
    return first / second;
  }

  /**@param {number} first*/
  /**@param {number} second*/
  /**@return {number}*/
  multiple(first, second) {
    return first * second;
  }

  /**@param {number} first*/
  /**@param {number} second*/
  /**@return {number}*/
  sum(first, second) {
    return +first + +second;
}

  /**@param {number} first*/
  /**@param {number} second*/
  /**@return {number}*/
  subtract(first, second) {
    return first - second;
  }
}