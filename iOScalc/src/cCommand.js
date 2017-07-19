class cCommand {

  /**@param {Function} executeFunction*/
  /**@param {Function} unexecuteFunction*/
  constructor(executeFunction, unexecuteFunction) {

    /**@private {?Function}*/
    this._executeFunction = executeFunction;

    /**@private {?Function}*/
    this._unexecuteFunction = unexecuteFunction;
  }

  execute() {
    executeFunction();
  }

  unExecute() {
    unexecuteFunction();
  }
}

class cHistory {
  constructor() {

    /**@private {Array<cCommand>}*/
    this._commands = [];

    /**@private {?number}*/
    this._lastCommandIndex = null;
  }

  undo() {
    if (this._lastCommandIndex != null) {
      this._commands[this._lastCommandIndex].unExecute();
      this._lastCommandIndex--;
    }
  }

  redo() {
    if (this._lastCommandIndex < (this._commands.length - 1)) {
      this._commands[this._lastCommandIndex].execute();
      this._lastCommandIndex++;
    }
  }

  /**@param {cCommand} command*/
  add(command) {
    if (this._lastCommandIndex < (this._commands.length - 1)) {
      this._lastCommandIndex++;
      this._commands.length = this._lastCommandIndex + 1;
      this._commands[this._lastCommandIndex] = command;
    }
    else {
      this._commands.push(command);
      this._lastCommandIndex++;
    }

    if (this._commands.length > 10) {
      this._commands.pop();
    }
    
    command.execute();
  }
}