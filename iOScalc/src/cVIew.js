class View {

  /**@param {Element} display*/
  constructor(display) {

    /**@private {Element}*/
    this._display = display;

    /**@private {Event}*/
    this._digitButtonClicked = new Event(this);

    /**@private {Event}*/
    this._clearButtonClicked = new Event(this);

    /**@private {Event}*/
    this._changeSignButtonClicked = new Event(this);

    /**@private {Event}*/
    this._percentButtonClicked = new Event(this);

    /**@private {Event}*/
    this._divideButtonClicked = new Event(this);

    /**@private {Event}*/
    this._multipleButtonClicked = new Event(this);

    /**@private {Event}*/
    this._subtractButtonClicked = new Event(this);

    /**@private {Event}*/
    this._addButtonClicked = new Event(this);

    /**@private {Event}*/
    this._calculateButtonClicked = new Event(this);

    /**@private {Event}*/
    this._decimalButtonClicked = new Event(this);
  }

  /**@return {Event}*/
  onDigitButtonClicked() {
    return this._digitButtonClicked;
  }

  /**@return {Event}*/
  onClearButtonClicked() {
    return this._clearButtonClicked;
  }

  /**@return {Event}*/
  onChangeSignButtonClicked() {
    return this._changeSignButtonClicked;
  }

  /**@return {Event}*/
  onPercentButtonClicked() {
    return this._percentButtonClicked;
  }

  /**@return {Event}*/
  onDivideButtonClicked() {
    return this._divideButtonClicked;
  }

  /**@return {Event}*/
  onMultipleButtonClicked() {
    return this._multipleButtonClicked;
  }

  /**@return {Event}*/
  onSubtractButtonClicked() {
    return this._subtractButtonClicked;
  }

  /**@return {Event}*/
  onAddButtonClicked() {
    return this._addButtonClicked;
  }

  /**@return {Event}*/
  onCalculateButtonClicked() {
    return this._calculateButtonClicked;
  }

  /**@return {Event}*/
  onDecimalButtonClicked() {
    return this._decimalButtonClicked;
  }

  /**@param {string | number} content*/
  updateDisplay(content) {
    this._display.textContent = String(content);
  }
}