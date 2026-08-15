import { i18n } from 'src/i18n';

class Stat {
  static get values() {
    return {
      actif: 'actif',
      inactif: 'inactif',
      supprimé:'supprimé',
    };
  }

  static labelOf(statId) {
    if (!this.values[statId]) {
      return statId;
    }

    return i18n(`${statId}`);
  }

  static descriptionOf(statId) {
    if (!this.values[statId]) {
      return statId;
    }

    return i18n(`etat.${statId}.description`);
  }
}

export default Stat;
