function main() {
  
  /**@type {string}*/
  const DISPLAY_ID = 'displayId';
  /**@type {View}*/
  const view = new View(document.getElementById(DISPLAY_ID));
  /**@type {Model}*/
  const model = new Model();
  /**@type {Controller}*/
  const controller = new Controller(view, model);

  /**@type {Array<string, Function>}*/
  let handlersMap =
      [ ["AC",  () => view.onClearButtonClicked().notify()],
        ["+/-", () => view.onChangeSignButtonClicked().notify()],
        ["%",   () => view.onPercentButtonClicked().notify()],
        ["÷",   () => view.onDivideButtonClicked().notify()],
        ["*",   () => view.onMultipleButtonClicked().notify()],
        ["-",   () => view.onSubtractButtonClicked().notify()],
        ["+",   () => view.onAddButtonClicked().notify()],
        ["=",   () => view.onCalculateButtonClicked().notify()],
        [",",   () => view.onDecimalButtonClicked().notify() ] ];

  for (let id=0; id<=9; ++id) {
    addListenerById(String(id), () =>
        view.onDigitButtonClicked().notify(id) );
  };

  handlersMap.forEach( (item)=>
    addListenerById(item[0], item[1]) );

  /**@param {string} buttonId*/
  /**@param {Function} func*/
  function addListenerById(buttonId, func) {
    document.getElementById(buttonId)
        .addEventListener("click", func);
  }
 controller;
}

main();