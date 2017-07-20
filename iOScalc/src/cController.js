class Controller {

  /**@param {View} view*/
  /**@param {Model} model*/
  /**@param {cHistory} history*/
  constructor(view, model, history) {

    /**@private {View}*/
    this._view = view;

    /**@private {Model}*/
    this._model = model;

    /**@private {cHistory}*/
    this._history = history;

    /**@const {View}*/
    const _v = this._view;

    /**@const {Model}*/
    const _m = this._model;

    _v.onDigitButtonClicked().attach( (digit)=>
        _m.addDigit(digit) );

    _v.onDecimalButtonClicked().attach( ()=>
        _m.addDecimal());

    _v.onAddButtonClicked().attach( ()=> _m.setOperation(_m.sum));

    _v.onDivideButtonClicked().attach( ()=> _m.setOperation(_m.divide));

    _v.onMultipleButtonClicked().attach( ()=> _m.setOperation(_m.multiple));

    _v.onSubtractButtonClicked().attach( ()=> _m.setOperation(_m.subtract));

    _v.onCalculateButtonClicked().attach( ()=> {
      let currentValue = this._model.getCurrentValue();
      let operandValue = this._model.getOperandValue();
      this._history.add(new Command(
          ()=> {_m.setCurrentValue(_m.getOperation()(_m.getCurrentValue(), operandValue))},
          ()=> {_m.setCurrentValue(currentValue)}));
      this._history.getLastCommand().execute();
    });

    _v.onChangeSignButtonClicked().attach( ()=>
        _m.changeSign());

    _v.onPercentButtonClicked().attach( ()=>
        _m.percent());

    _v.onClearButtonClicked().attach( ()=> {
      this._history.clear();
      _m.clear();
    });

    _m.onNumberChanged().attach( (number)=>
        _v.updateDisplay(String(number)));
  }

  undo() {
    this._history.undo();
  }

  redo() {
    this._history.redo();
  }

}