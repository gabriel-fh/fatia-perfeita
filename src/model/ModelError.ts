export default class ModelError extends Error {
  constructor(err: string) {
    super(err);
    console.error(err + "\n\n" + this.stack);
  }
}
