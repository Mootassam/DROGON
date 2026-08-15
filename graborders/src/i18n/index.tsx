import React from 'react';
import _get from 'lodash/get';
import moment from 'moment';
import {
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';
import { setLocale as setYupLocale } from 'yup';

let currentLanguageCode = '';

const languages: {
  [key: string]: {
    id: string;
    label: string;
    flag: string;
    dateFns: any;
    dictionary: any;
  };
} = {

  de: {
    id: 'de',
    label: 'Deutsch',
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAElBMVEUAAAD/zgDdAADnAADaAAD/2AAtsSEoAAAA+ElEQVR4nO3QMQGAMAAEsYeCf8tIuI0pkZANAAAAAAAAAAAAAAAAAAAAgB8dwm6CoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKewh7CbsIipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUofMGTNC8HkSxoAAAAASUVORK5CYII=',
    dateFns: null,
    dictionary: null,
  },
  en: {
    id: 'en',
    label: 'English',
    flag: 'https://png.pngtree.com/png-vector/20230905/ourmid/pngtree-us-flag-sign-png-image_9947494.png',
    dateFns: null,
    dictionary: null,
  },
  es: {
    id: 'es',
    label: 'Español',
    flag: 'data:image/png;base64,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',
    dateFns: null,
    dictionary: null,
  },
  fr: {
    id: 'fr',
    label: 'Français',
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAFVBMVEX///8AI5XtKTkAFpJwe7nzfoXtHTDT0FIXAAAA/klEQVR4nO3QSQ0AIAADsHH6l4yKPUhaCc2oWTs9586aOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHixIkTJ06cOHHy4ckD5KrN4eD2boIAAAAASUVORK5CYII=',
    dateFns: null,
    dictionary: null,
  },
  it: {
    id: 'it',
    label: 'Italiano',
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAKlBMVEX///8AkkbOKzd2t43egYYAjz7NHy4Wlk7OND75/PoAk0j7///bhIfMKzaIpjcKAAABCklEQVR4nO3Q2RGAIBQEsIeg4NV/u1axM34kJaRazN4rZxxbTDlx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDhx4sSJEydOnDj5/8mMuXqdKffzrpgPKxrVWd5HIaUAAAAASUVORK5CYII=',
    dateFns: null,
    dictionary: null,
  },
  'pt-BR': {
    id: 'pt-BR',
    label: 'Português',
    flag: 'data:image/png;base64,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',
    dateFns: null,
    dictionary: null,
  },

  ru: {
    id: 'ru',
    label: 'Русский',
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAElBMVEX////VKx4AOaYAGJ4AOq3fKgABXnTtAAAA9UlEQVR4nO3QsQGAQAwAoejr/ivb50pbGIEZAAAAAAAAAAAAAAAAAAAAAH47bHOzOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJzUP27xsc7E5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJ+WknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aQ+2jLMGymKnQ8AAAAASUVORK5CYII=',
    dateFns: null,
    dictionary: null,
  },

  tr: {
    id: 'tr',
    label: 'Türkçe',
    flag: 'data:image/png;base64,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',
    dateFns: null,
    dictionary: null,
  },

  in: {
    id: 'in',
    label: 'Hindi',
    flag: 'data:image/png;base64,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eQndOxlwk5LKId+a0xn0UfMQqoaGSgNeWDwz1yFP5zgKUoPzEnrYf5KJIOLFfZ/jiDsrmvS+/yTF4HqeVkavrOBRIDL3BfSxdyvA9c7pxZl55Q3WBWwjw+ZxDXThOqrjpR2DDyetRClbzC2lybpmGm33OBrMnS0qke3/+iV/IV72PZpNfkJB323ahGSmjGaPI7x6wK34frb4edof20D0jHjGtqajUpjQYla6riYHL7csg1jCldu1ri887aOucfe42E05pTGdMlNlkslCs8N91Lhjxwe+9ttvP8zu8Ze9StjUQKY8FLNE7V/MzvOPraey+fuuSocvzrmo2qXZXV6aneXLthIcbyi361w/4/H7O/EOG1AgVLA46b4t216fFoHC9S8udx6/Aef1u28rbqxw7O5LKYU5QiPc7aT0Nzx/R/K6V6apPIDGpPZXv4Xy/r3RYpVyJcWEVDz9ZcHLC96dINtmta4u1XrV+Eo1v/BbOPnNePoH8Z2nfxLfefob8R1yYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYkNObMiJDTmxISc25MSGnNiQExtyYvP0L+I7T/8mvvMf/5JjunweIHoAAAAASUVORK5CYII=',
    dateFns: null,
    dictionary: null,
  },

  ne: {
    id: 'ne',
    label: 'Nepali',
    flag: 'data:image/png;base64,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',
    dateFns: null,
    dictionary: null,
  }

};

export async function init() {
  currentLanguageCode =
    localStorage.getItem('language') || 'en';
  setLanguageCode(currentLanguageCode);

  if (currentLanguageCode === 'en') {
    await initEn();
  }

  if (currentLanguageCode === 'pt-BR') {
    await initPtBr();
  }


  if (currentLanguageCode === 'fr') {
    await initFr();
  }
  if (currentLanguageCode === 'es') {
    await initEs();
  }
  if (currentLanguageCode === 'ru') {
    await initRu();
  }
  if (currentLanguageCode === 'de') {
    await initDe();
  }
  if (currentLanguageCode === 'tr') {
    await initTr();
  }
  if (currentLanguageCode === 'it') {
    await initIt();
  }
  if (currentLanguageCode === 'in') {
    await initIn();
  }
  if (currentLanguageCode === 'ne') {
    await initNe();
  }


}

async function initEs() {
  const language = languages['es'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/es'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/es')
  ).default;

  registerLocale('es', language.dateFns);
  setDefaultLocale('es');

  language.dictionary = (
    await import('./es')
  ).default;

  moment.locale('es', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initRu() {
  const language = languages['ru'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/ru'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/ru')
  ).default;

  registerLocale('ru', language.dateFns);
  setDefaultLocale('ru');

  language.dictionary = (
    await import('./ru')
  ).default;

  moment.locale('ru', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initDe() {
  const language = languages['de'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/de'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/de')
  ).default;

  registerLocale('de', language.dateFns);
  setDefaultLocale('de');

  language.dictionary = (
    await import('./de')
  ).default;

  moment.locale('de', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}


async function initTr() {
  const language = languages['tr'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/tr'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/tr')
  ).default;

  registerLocale('tr', language.dateFns);
  setDefaultLocale('tr');

  language.dictionary = (
    await import('./tr')
  ).default;

  moment.locale('tr', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}


async function initIt() {
  const language = languages['it'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/it'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/it')
  ).default;

  registerLocale('it', language.dateFns);
  setDefaultLocale('it');

  language.dictionary = (
    await import('./it')
  ).default;

  moment.locale('it', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}


async function initIn() {
  const language = languages['in'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/en-IN'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/en-IN')
  ).default;

  registerLocale('in', language.dateFns);
  setDefaultLocale('in');

  language.dictionary = (
    await import('./in')
  ).default;

  moment.locale('in', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}


async function initNe() {
  const language = languages['ne'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/nl-BE'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/nl-BE')
  ).default;

  registerLocale('ne', language.dateFns);
  setDefaultLocale('ne');

  language.dictionary = (
    await import('./ne')
  ).default;

  moment.locale('ne', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initFr() {
  const language = languages['fr'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/fr'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/fr')
  ).default;

  registerLocale('fr', language.dateFns);
  setDefaultLocale('fr');

  language.dictionary = (
    await import('./fr')
  ).default;

  moment.locale('fr', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initPtBr() {
  const language = languages['pt-BR'];

  // @ts-ignore
  const momentLocale = (await import('moment/locale/pt-br'))
    .default;

  language.dateFns = (
    await import('date-fns/locale/pt-BR')
  ).default;

  registerLocale('pt-BR', language.dateFns);
  setDefaultLocale('pt-BR');

  language.dictionary = (
    await import('./pt-BR')
  ).default;

  moment.locale('pt-BR', momentLocale);

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

async function initEn() {
  const language = languages['en'];

  language.dictionary = (
    await import('./en')
  ).default;

  if (language.dictionary.validation) {
    setYupLocale(language.dictionary.validation);
  }

  return language;
}

export function getLanguage() {
  return languages[getLanguageCode()];
}

function format(message, args) {
  if (!message) {
    return null;
  }

  try {
    return message.replace(
      /{(\d+)}/g,
      function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match;
      },
    );
  } catch (error) {
    console.error(message, error);
    throw error;
  }
}

export function getLanguages() {
  return Object.keys(languages).map((language) => {
    return languages[language];
  });
}

export function getLanguageCode() {
  return currentLanguageCode;
}

export function setLanguageCode(arg) {
  if (!languages[arg]) {
    throw new Error(`Invalid language ${arg}.`);
  }

  localStorage.setItem('language', arg);
}

export function i18nExists(key) {
  if (!getLanguage()) {
    return false;
  }

  const message = _get(getLanguage().dictionary, key);
  return Boolean(message);
}

export function i18n(key, ...args) {
  if (!getLanguage()) {
    return key;
  }

  const message = _get(getLanguage().dictionary, key);

  if (!message) {
    return key;
  }

  return format(message, args);
}

export function i18nHtml(key, ...args) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: i18n(key, ...args),
      }}
    />
  );
}
