class Event {

  /**@param {?Object} sender*/
  constructor(sender) {
    /**@private {?Object}*/
    this._sender = sender;

    /**@private {Array<Function>}*/
    this._listeners = [];
  }

  /**@param {?string | ?number} content*/
  notify(content = null) {
    this._listeners.forEach( (listener)=> {
      listener(content);
    });
  }

  /**@param {!Function} listener*/
  attach(listener) {
    this._listeners.push(listener);
  }
}