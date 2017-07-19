
class Model {
  constructor() {
    /**@private {?Function}*/
    this._currentOperation = null;

    /**@private {cEvent}*/
    this._changedNumber = new cEvent(this);

    /**@private {boolean}*/
    this._isWaitForEnter = true;

    /**@private {boolean}*/
    this._wasDecimalAdded = false;

    /**@private {?string}*/
    this._firstNumber = String(0);

    /**@private {?string}*/
    this._secondNumber = null;
  }

  /**@return {cEvent}*/
  onNumberChanged() {
    return this._changedNumber;
  }

  /**@return {?string}*/
  getCurrentNumber() {
    return ((this._secondNumber == null) ? this._firstNumber : this._secondNumber);
  }

  /**@param {string} newValue*/
  changeCurrentNumber(newValue) {
    !this._currentOperation ?
        this._firstNumber = newValue :
        this._secondNumber  = newValue;
  }

  clear() {
    this._firstNumber = "0";
    this._secondNumber = null;
    this._wasDecimalAdded = false;
    this._isWaitForEnter = true;
    this.setOperation(null);
    this._changedNumber.notify(this.getCurrentNumber());
  }

  setOperation(operation) {
    this._currentOperation = operation;
    this._secondNumber = null;
    this._isWaitForEnter = true;
  }

  addDecimal() {
    if (!this._wasDecimalAdded || this._isWaitForEnter) {
      this.changeCurrentNumber(this.getCurrentNumber() + ".");
      this._wasDecimalAdded = true;
      this._isWaitForEnter = false;
      this._changedNumber.notify(this.getCurrentNumber());
    }
  }

  /**@param {string} digit*/
  addDigit(digit) {
    if (this._isWaitForEnter) {
      this.changeCurrentNumber(digit);
      this._isWaitForEnter = false;
      this._wasDecimalAdded = false;
    }
    else {
      this.changeCurrentNumber(this.getCurrentNumber() + digit);
    }
    this._changedNumber.notify(this.getCurrentNumber());
  }

  calculate() {
    this._firstNumber = this._currentOperation(this._firstNumber, this._secondNumber);
    this._isWaitForEnter = true;
    this._changedNumber.notify(Math.round(this._firstNumber * 1000000) / 1000000);
  }

  changeSign() {
    if (this._isWaitForEnter || !this._secondNumber) {
      this._firstNumber= String(-this._firstNumber);
      this._changedNumber.notify(this._firstNumber);
    }
    else {
      this._secondNumber = String(-this._secondNumber);
      this._changedNumber.notify(this._secondNumber);
    }

  }

  percent() {
    this.changeCurrentNumber(String(this._firstNumber / 100 * +this._secondNumber));
    this._changedNumber.notify(this.getCurrentNumber());
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