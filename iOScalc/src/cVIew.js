class View {

  /**@param {Element} display*/
  constructor(display) {

    /**@private {Element}*/
    this._display = display;

    /**@private {cEvent }*/
    this._digitButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._clearButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._changeSignButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._percentButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._divideButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._multipleButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._subtractButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._addButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._calculateButtonClicked = new cEvent (this);

    /**@private {cEvent }*/
    this._decimalButtonClicked = new cEvent (this);
  }

  /**@return {cEvent }*/
  onDigitButtonClicked() {
    return this._digitButtonClicked;
  }

  /**@return {cEvent }*/
  onClearButtonClicked() {
    return this._clearButtonClicked;
  }

  /**@return {cEvent }*/
  onChangeSignButtonClicked() {
    return this._changeSignButtonClicked;
  }

  /**@return {cEvent }*/
  onPercentButtonClicked() {
    return this._percentButtonClicked;
  }

  /**@return {cEvent }*/
  onDivideButtonClicked() {
    return this._divideButtonClicked;
  }

  /**@return {cEvent }*/
  onMultipleButtonClicked() {
    return this._multipleButtonClicked;
  }

  /**@return {cEvent }*/
  onSubtractButtonClicked() {
    return this._subtractButtonClicked;
  }

  /**@return {cEvent }*/
  onAddButtonClicked() {
    return this._addButtonClicked;
  }

  /**@return {cEvent }*/
  onCalculateButtonClicked() {
    return this._calculateButtonClicked;
  }

  /**@return {cEvent }*/
  onDecimalButtonClicked() {
    return this._decimalButtonClicked;
  }

  /**@param {string | number} content*/
  updateDisplay(content) {
    // content = String(Math.round(+content * 10000) / 10000);
    // if (content.length > 6) {
    //     content = String((+content).toExponential());
    // }

    this._display.textContent = String(content);
  }

}