import { i18n } from 'src/i18n';

class EtatCivil {
  static get values() {
    return {
      célébataire: 'célébataire',
      marié: 'marié',
    };
  }

  static labelOf(etatId) {
    if (!this.values[etatId]) {
      return etatId;
    }

    return i18n(`${etatId}`);
  }

  static descriptionOf(etatId) {
    if (!this.values[etatId]) {
      return etatId;
    }

    return i18n(`etat.${etatId}.description`);
  }
}

export default EtatCivil;
