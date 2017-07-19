class Controller {

  /**@param {View} view*/
  /**@param {Model} model*/
  constructor(view, model) {

    /**@private {View}*/
    this._view = view;

    /**@private {Model}*/
    this._model = model;
    
    /**@const {View}*/
    const _v = this._view;

    /**@const {Model}*/
    const _m = this._model;

    _v.onDigitButtonClicked().attach( (digit)=>
        _m.addDigit(digit) );

    _v.onAddButtonClicked().attach( ()=>
        _m.setOperation(_m.sum));

    _v.onDivideButtonClicked().attach( ()=>
        _m.setOperation(_m.divide));

    _v.onMultipleButtonClicked().attach( ()=>
        _m.setOperation(_m.multiple));

    _v.onSubtractButtonClicked().attach( ()=>
        _m.setOperation(_m.subtract));

    _v.onCalculateButtonClicked().attach( ()=>
        _m.calculate());

    _v.onChangeSignButtonClicked().attach( ()=>
        _m.changeSign());

    _v.onDecimalButtonClicked().attach( ()=>
        _m.addDecimal());

    _v.onPercentButtonClicked().attach( ()=>
        _m.percent());

    _v.onClearButtonClicked().attach( ()=>
        _m.clear());

    _m.onNumberChanged().attach( (number)=>
        _v.updateDisplay(String(number)));
  }


}