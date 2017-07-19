class Command {

  /**@param {Function} executeFunction*/
  /**@param {Function} unexecuteFunction*/
  constructor(executeFunction, unexecuteFunction) {

    /**@private {?Function}*/
    this._executeFunction = executeFunction;

    /**@private {?Function}*/
    this._unexecuteFunction = unexecuteFunction;
  }

  execute() {
    this._executeFunction();
  }

  unExecute() {
    this._unexecuteFunction();
  }
}

class History {
  constructor() {

    /**@private {Array<Command>}*/
    this._commands = [];

    /**@private {number}*/
    this._lastCommandIndex = 0;
  }

  undo() {
    if (this._lastCommandIndex != 0) {
      this._commands[this._lastCommandIndex - 1].unExecute();
      this._lastCommandIndex--;
    }
  }

  redo() {
    if (this._lastCommandIndex < (this._commands.length)) {
      this._lastCommandIndex++;
      this._commands[this._lastCommandIndex - 1].execute();
    }
  }

  /**@param {Command} command*/
  add(command) {
    if (this._lastCommandIndex < (this._commands.length)) {
      this._lastCommandIndex++;
      this._commands.length = this._lastCommandIndex;
      this._commands[this._lastCommandIndex - 1] = command;
    }
    else {
      this._commands.push(command);
      this._lastCommandIndex++;
    }

    if (this._commands.length > 10) {
      this._commands.pop();
    }
  }

  /**@return {Command}*/
  getLastCommand() {
    return this._commands[this._lastCommandIndex - 1];
  }

  clear() {
    this._commands = [];
    this._lastCommandIndex = 0;
  }
}