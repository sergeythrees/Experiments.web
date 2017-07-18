class Controller {

  /**@param {View} view*/
  /**@param {Model} model*/
  constructor(view, model) {

    /**@private {View}*/
    this._view = view;

    /**@private {Model}*/
    this._model = model;

    this._view.onDigitButtonClicked().attach( (digit)=>
        this._model.addDigit(digit) );

    this._view.onAddButtonClicked().attach( ()=>
        this._model.setOperation(this._model.sum));

    this._view.onDivideButtonClicked().attach( ()=>
        this._model.setOperation(this._model.divide));

    this._view.onMultipleButtonClicked().attach( ()=>
        this._model.setOperation(this._model.multiple));

    this._view.onSubtractButtonClicked().attach( ()=>
        this._model.setOperation(this._model.subtract));

    this._view.onCalculateButtonClicked().attach( ()=>
        this._model.calculate());

    this._view.onChangeSignButtonClicked().attach( ()=>
        this._model.changeSign());

    this._view.onDecimalButtonClicked().attach( ()=>
        this._model.addDecimal());

    this._view.onPercentButtonClicked().attach( ()=>
        this._model.percent());

    this._view.onClearButtonClicked().attach( ()=>
        this._model.clear());

    this._model.onNumberChanged().attach( (number)=>
        this._view.updateDisplay(String(number)));
  }
}