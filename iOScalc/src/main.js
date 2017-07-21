function main() {

  const view = new View();
  const model = new Model();
  const controller = new Controller(view, model, new (cHistory));

  /**
   * @param {!Object} evtobj
   */
  function onKeyDown(evtobj) {
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && !evtobj.shiftKey) {
      controller.undo();
    }
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && evtobj.shiftKey) {
      controller.redo();
    }
  }

  document.addEventListener("keydown", onKeyDown);
}

main();
