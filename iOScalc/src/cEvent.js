class cEvent {

  constructor() {

    /**@private {Array<!Function>}*/
    this._handlers = [];
  }

  /**@param {?string | ?number} content*/
  notify(content = null) {
    this._handlers.forEach( (handler)=> {
      handler(content);
    });
  }

  /**@param {!Function} handler*/
  attach(handler) {
    this._handlers.push(handler);
  }
}