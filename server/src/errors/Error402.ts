export default class Error402 extends Error {
  code: Number;

  constructor(messageCode?) {
    let message;

    if (messageCode) {
      message = messageCode;
    }

    message = message || 'errors.validation.message';

    super(message);
    this.code = 400;
  }
}
