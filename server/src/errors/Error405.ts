import { i18n, i18nExists } from '../i18n';

export default class Error405 extends Error {
  code: Number;

  constructor(message?) {
    super(message);
    this.code = 400;
  }
}
