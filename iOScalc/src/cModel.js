class Model {

  constructor() {

    /**@private {?Function}*/
    this._currentOperation = null;

    /**@private {cEvent }*/
    this._changedNumber = new cEvent (this);

    /**@private {boolean}*/
    this._isWaitForEnter = true;

    /**@private {boolean}*/
    this._wasDecimalAdded = false;

    /**@private {?string}*/
    this._currentValue = String(0);

    /**@private {?string}*/
    this._operandValue = null;
  }

  /**@return {cEvent }*/
  onNumberChanged() {
    return this._changedNumber;
  }

  /**@return {number}*/
  getCurrentValue() {
    return +this._currentValue;
  }

  /**@param {number} value*/
  setCurrentValue(value) {
    this._currentValue = String(value);
    this._changedNumber.notify(this.getCurrentValue());
  }

  /**@return {number}*/
  getOperandValue() {
    if (!this._operandValue) {
      this._operandValue = this._currentValue;
    }
    return +this._operandValue;
  }

  /**@param {Function} operation*/
  setOperation(operation) {
    this._currentOperation = operation;
    this._operandValue = null;
    this._isWaitForEnter = true;
  }

  /**@return {Function}*/
  getOperation() {
    return this._currentOperation;
  }

  /**@return {?string}*/
  getCurrentNumber() {
    return (!this._operandValue)? this._currentValue : this._operandValue;
  }

  /**@param {string | number} newValue*/
  changeCurrentNumber(newValue) {
    !this._currentOperation ?
        this._currentValue = String(newValue) :
        this._operandValue  = String(newValue);
  }

  /**@param {number} digit*/
  addDigit(digit) {
    if (this._isWaitForEnter) {
      this.changeCurrentNumber(digit);
      this._isWaitForEnter = false;
      this._wasDecimalAdded = false;
    }
    else {
      this.changeCurrentNumber(this.getCurrentNumber() + String(digit));
    }
    this._changedNumber.notify(this.getCurrentNumber());
  }

  addDecimal() {
    if (!this._wasDecimalAdded || this._isWaitForEnter) {
      this.changeCurrentNumber(this.getCurrentNumber() + ".");
      this._wasDecimalAdded = true;
      this._isWaitForEnter = false;
      this._changedNumber.notify(this.getCurrentNumber());
    }
  }

  clear() {
    this._operandValue = null;
    this._currentValue = String(0);
    this._wasDecimalAdded = false;
    this._isWaitForEnter = true;
    this.setOperation(null);
    this._changedNumber.notify(this.getCurrentNumber());
  }

  changeSign() {
      this.changeCurrentNumber(String(-this.getCurrentNumber()));
      this._isWaitForEnter = false;
      this._changedNumber.notify(this.getCurrentNumber());
  }


  percent() {
    if (!this._operandValue) {
      this._operandValue = String(+this._operandValue / 100);
      this._changedNumber.notify(this.getCurrentNumber());
    }
  }
}