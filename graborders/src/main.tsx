import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { i18n, init as i18nInit } from './i18n';

(async function () {

  await i18nInit();

  document.title = i18n('app.title');
  ReactDOM.render(<App />, document.getElementById('root'));
})();
