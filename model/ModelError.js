export default class ModelError extends Error {
  constructor(err) {
    super(err);
    console.error(err + "\n\n" + this.stack);
  }
}
