// ViewerError.js
export default class ViewerError extends Error {
    constructor(message) {
      super(message);
      this.name = "ViewerError";
    }
  }
  