import en from './en';
import ptBR from './pt-BR';
import fr from './fr';
import de from './de';
import it from './it';
import es from './es';
import ru from './ru';
import tr from './ru';
import ne from './ne';
import In from './in'

import _get from 'lodash/get';

/**
 * Object with the languages available.
 */
const languages = {
  en: en,
  'pt-BR': ptBR,
  fr: fr,
  de: de,
  it: it,
  es: es,
  ru: ru,
  tr: tr,
  ne: ne,
  in: In
};

/**
 * Replaces the parameters of a message with the args.
 */
function format(message, args) {
  if (!message) {
    return null;
  }

  return message.replace(
    /{(\d+)}/g,
    function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    },
  );
}

/**
 * Checks if the key exists on the language.
 */
export const i18nExists = (languageCode, key) => {
  console.log(languageCode, "Returned Checks languageCode");

  const dictionary =
    languages[languageCode] || languages['en'];
  const message = _get(dictionary, key);
  return Boolean(message);
};

/**
 * Returns the translation based on the key.
 */
export const i18n = (languageCode, key, ...args) => {


  console.log(languageCode, "Returned languageCode");

  const dictionary =
    languages[languageCode] || languages['en'];
  const message = _get(dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
};