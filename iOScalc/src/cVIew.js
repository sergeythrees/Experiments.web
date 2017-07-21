class View {

  constructor() {

    /** @private {!Node} */
    this._displayContent = document.createElement("div");
    this._displayContent.className = "display__content";
    this._displayContent.textContent = "0";

    /** @private {cEvent } 
   */
    this._digitButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._clearButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._changeSignButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._percentButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._divideButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._multipleButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._subtractButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._addButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._calculateButtonClicked = new cEvent (this);

    /** @private {cEvent } 
   */
    this._decimalButtonClicked = new cEvent (this);


    const calc = document.createElement("div");
    calc.className = "calc";

    const display = document.createElement("div");
          display.className = "display";

    const keyboard = document.createElement("div");
          keyboard.className = "keyboard";

    const digitButtons = {};
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let number of numbers) {
      digitButtons[number] = document.createElement("button");
      digitButtons[number].className = "keyboard__button";
      digitButtons[number].textContent = number;
      digitButtons[number].addEventListener("click",
          ()=> this._digitButtonClicked.notify(number));
    }
    digitButtons["0"].className += " keyboard__button_wide";

    const operationsButtons = {};
    const operations = ["÷", "×", "–", "+", "="];
    for (let operation of operations) {
      operationsButtons[operation] = document.createElement("button");
      operationsButtons[operation].className = "keyboard__button keyboard__button_operation";
      operationsButtons[operation].textContent = operation;
    }
    operationsButtons["×"].className += " keyboard__button-multiply";
    operationsButtons["–"].className += " keyboard__button-subtract";

    operationsButtons["×"].addEventListener("click",
        ()=> this._multipleButtonClicked.notify());
    operationsButtons["÷"].addEventListener("click",
        ()=> this._divideButtonClicked.notify());
    operationsButtons["–"].addEventListener("click",
        ()=> this._subtractButtonClicked.notify());
    operationsButtons["+"].addEventListener("click",
        ()=> this._addButtonClicked.notify());
    operationsButtons["="].addEventListener("click",
        ()=> this._calculateButtonClicked.notify());

    const clearButton = document.createElement("button");
          clearButton.className = "keyboard__button keyboard__button_dark";
          clearButton.textContent = "AC";
          clearButton.addEventListener("click",
              ()=> this._clearButtonClicked.notify());

    const changeSignButton = document.createElement("button");
          changeSignButton.className =
              "keyboard__button keyboard__button-change-sign keyboard__button_dark";
          changeSignButton.innerHTML =
              '<sup class="change-sign-plus">+</sup>⁄<sub class="change-sign-minus">-</sub>';
          changeSignButton.addEventListener("click",
              ()=> this._changeSignButtonClicked.notify());

    const percentButton = document.createElement("button");
          percentButton.className =
              "keyboard__button keyboard__button_dark";
          percentButton.textContent = "%";
          percentButton.addEventListener("click",
              ()=> this._percentButtonClicked.notify());

    const decimalButton = document.createElement("button");
          decimalButton.className =
              "keyboard__button keyboard__button-decimal";
          decimalButton.textContent = ",";
          decimalButton.addEventListener("click",
              ()=> this._decimalButtonClicked.notify());

    document.body.appendChild(calc);

    calc.appendChild(display);
    calc.appendChild(keyboard);

    display.appendChild(this._displayContent);

    let buttonsInOrder = [
		clearButton, changeSignButton, percentButton, operationsButtons["÷"],
		digitButtons["7"], digitButtons["8"], digitButtons["9"], operationsButtons["×"],
		digitButtons["4"], digitButtons["5"], digitButtons["6"], operationsButtons["–"],
		digitButtons["1"], digitButtons["2"], digitButtons["3"], operationsButtons["+"],
		digitButtons["0"], decimalButton, operationsButtons["="],
    ];

    buttonsInOrder.forEach(
        (button)=> keyboard.appendChild(button));
  }

  /** 
   * @return {cEvent } 
   */
  onDigitButtonClicked() {
    return this._digitButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onClearButtonClicked() {
    return this._clearButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onChangeSignButtonClicked() {
    return this._changeSignButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onPercentButtonClicked() {
    return this._percentButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onDivideButtonClicked() {
    return this._divideButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onMultipleButtonClicked() {
    return this._multipleButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onSubtractButtonClicked() {
    return this._subtractButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onAddButtonClicked() {
    return this._addButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onCalculateButtonClicked() {
    return this._calculateButtonClicked;
  }

  /** 
   * @return {cEvent } 
   */
  onDecimalButtonClicked() {
    return this._decimalButtonClicked;
  }

  /** 
   * @param {string | number} content
   */
  updateDisplay(content) {
    // content = String(Math.round(+content * 10000) / 10000);
    // if (content.length > 6) {
    //     content = String((+content).toExponential());
    // }

    this._displayContent.textContent = String(content);
  }
}