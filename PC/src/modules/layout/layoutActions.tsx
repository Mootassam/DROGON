import { setLanguageCode } from '../../i18n';

const prefix = 'LAYOUT';

const layoutActions = {
  MENU_TOGGLE: `${prefix}_MENU_TOGGLE`,
  MENU_HIDE: `${prefix}_MENU_HIDE`,
  MENU_SHOW: `${prefix}_MENU_SHOW`,
  MENU_SUBMENU: `${prefix}_SUBMENU_SHOW`,

  doChangeLanguage: (language) => {
    setLanguageCode(language);

    /**
     * I18n is outside Redux store,
     * no we need this hack to load it properly
     */
    window.location.reload();
  },

  doToggleMenu: () => {
    return {
      type: layoutActions.MENU_TOGGLE,
    };
  },

  doShowMenu: () => {
    return {
      type: layoutActions.MENU_SHOW,
    };
  },

  doHideMenu: () => {
    return {
      type: layoutActions.MENU_HIDE,
    };
  },
  dosubMenu: (path) => {
    return {
      type: layoutActions.MENU_SUBMENU,
      payload: path,
    };
  },
};

export default layoutActions;
