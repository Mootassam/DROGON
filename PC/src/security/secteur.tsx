import { i18n } from '../i18n';

class Secteur {
  static get values() {
    return {
      AGRO_ALIMENTAIRE: "AGRO-ALIMENTAIRE",
      ASSURANCES: "ASSURANCES",
      AUDIOVISUEL:"AUDIOVISUEL",
      BANCAIRE:"BANCAIRE",
      CHIMIE:"CHIMIE",
      COMPOSANTS_AUTOMOBILES:"COMPOSANTS AUTOMOBILES",
      DISTRIBUTION:"DISTRIBUTION",
      DISTRIBUTION_AUTOMOBILE:"DISTRIBUTION AUTOMOBILE",
      DIVERS:"DIVERS",
      FINANCIER:"FINANCIER",
      HOLDING:"HOLDING",
      IMMOBILIER:"IMMOBILIER",
      INDUSTRIEL:"INDUSTRIEL",
      LEASING:"LEASING",
      LOGISTIQUE_TRANSPORT:"LOGISTIQUE ET TRANSPORT",
      PHARMACEUTIQUE:"PHARMACEUTIQUE",
      SANTÉ:"SANTÉ",
      TOURSIME:"TOURSIME",
      INFORMATION_TECHNOLOGY : "INFORMATION TECHNOLOGY",
    };
  }

  static labelOf(secteurId) {
    if (!this.values[secteurId]) {
      return secteurId;
    }

    return i18n(`secteur.${secteurId}.label`);
  }

  static descriptionOf(secteurId) {
    if (!this.values[secteurId]) {
      return secteurId;
    }

    return i18n(`secteur.${secteurId}.description`);
  }
}

export default Secteur;
