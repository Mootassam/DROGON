import Roles from "./roles";
import Plans from "./plans";
import Storage from "./storage";

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: "tenantEdit",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      tenantDestroy: {
        id: "tenantDestroy",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      planEdit: {
        id: "planEdit",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      planRead: {
        id: "planRead",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      userEdit: {
        id: "userEdit",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },
      userDestroy: {
        id: "userDestroy",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },

      userCreate: {
        id: "userCreate",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },
      userImport: {
        id: "userImport",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },
      userRead: {
        id: "userRead",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },
      userAutocomplete: {
        id: "userAutocomplete",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements, storage.galleryPhotos],
      },
      auditLogRead: {
        id: "auditLogRead",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      settingsEdit: {
        id: "settingsEdit",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      categoryImport: {
        id: "categoryImport",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categoryCreate: {
        id: "categoryCreate",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryEdit: {
        id: "categoryEdit",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryDestroy: {
        id: "categoryDestroy",
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryRead: {
        id: "categoryRead",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryAutocomplete: {
        id: "categoryAutocomplete",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.categoryPhoto],
      },
      associationImport: {
        id: "associationImport",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      associationCreate: {
        id: "associationCreate",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      associationEdit: {
        id: "associationEdit",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      associationDestroy: {
        id: "associationDestroy",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      associationRead: {
        id: "associationRead",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      associationAutocomplete: {
        id: "associationAutocomplete",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      mandatImport: {
        id: "mandatImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      mandatCreate: {
        id: "mandatCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mandatPv],
      },
      mandatEdit: {
        id: "mandatEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mandatPv],
      },
      mandatDestroy: {
        id: "mandatDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mandatPv],
      },
      mandatRead: {
        id: "mandatRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      mandatAutocomplete: {
        id: "mandatAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      categorieMouvImport: {
        id: "categorieMouvImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categorieMouvCreate: {
        id: "categorieMouvCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      categorieMouvEdit: {
        id: "categorieMouvEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      categorieMouvDestroy: {
        id: "categorieMouvDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      categorieMouvRead: {
        id: "categorieMouvRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      categorieMouvAutocomplete: {
        id: "categorieMouvAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      mouvementsImport: {
        id: "mouvementsImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      mouvementsCreate: {
        id: "mouvementsCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mouvementsAttachements],
      },
      mouvementsEdit: {
        id: "mouvementsEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mouvementsAttachements],
      },
      mouvementsDestroy: {
        id: "mouvementsDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.mouvementsAttachements],
      },
      mouvementsRead: {
        id: "mouvementsRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      mouvementsAutocomplete: {
        id: "mouvementsAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      campagneImport: {
        id: "campagneImport",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      campagneCreate: {
        id: "campagneCreate",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      campagneEdit: {
        id: "campagneEdit",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      campagneDestroy: {
        id: "campagneDestroy",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      campagneRead: {
        id: "campagneRead",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      campagneAutocomplete: {
        id: "campagneAutocomplete",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      detailsCampagneImport: {
        id: "detailsCampagneImport",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      detailsCampagneCreate: {
        id: "detailsCampagneCreate",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneEdit: {
        id: "detailsCampagneEdit",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneDestroy: {
        id: "detailsCampagneDestroy",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneRead: {
        id: "detailsCampagneRead",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      detailsCampagneAutocomplete: {
        id: "detailsCampagneAutocomplete",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      palierImport: {
        id: "palierImport",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      palierCreate: {
        id: "palierCreate",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      palierEdit: {
        id: "palierEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      palierDestroy: {
        id: "palierDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      palierRead: {
        id: "palierRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      palierAutocomplete: {
        id: "palierAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      historiquePointsImport: {
        id: "historiquePointsImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      historiquePointsCreate: {
        id: "historiquePointsCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.historiquePointsAttachements],
      },
      historiquePointsEdit: {
        id: "historiquePointsEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.historiquePointsAttachements],
      },
      historiquePointsDestroy: {
        id: "historiquePointsDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.historiquePointsAttachements],
      },
      historiquePointsRead: {
        id: "historiquePointsRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      historiquePointsAutocomplete: {
        id: "historiquePointsAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      projetImport: {
        id: "projetImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      projetCreate: {
        id: "projetCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetEdit: {
        id: "projetEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetDestroy: {
        id: "projetDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetRead: {
        id: "projetRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      projetAutocomplete: {
        id: "projetAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      votesImport: {
        id: "votesImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      votesCreate: {
        id: "votesCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      votesEdit: {
        id: "votesEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      votesDestroy: {
        id: "votesDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      votesRead: {
        id: "votesRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      votesAutocomplete: {
        id: "votesAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      donsImport: {
        id: "donsImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      donsCreate: {
        id: "donsCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements],
      },
      donsEdit: {
        id: "donsEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements],
      },
      donsDestroy: {
        id: "donsDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.donsAttachements],
      },
      donsRead: {
        id: "donsRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      donsAutocomplete: {
        id: "donsAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      produitCategorieImport: {
        id: "produitCategorieImport",
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitCategorieCreate: {
        id: "produitCategorieCreate",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      produitCategorieEdit: {
        id: "produitCategorieEdit",
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      produitCategorieDestroy: {
        id: "produitCategorieDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      produitCategorieRead: {
        id: "produitCategorieRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.agent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitCategorieAutocomplete: {
        id: "produitCategorieAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.agent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      produitImport: {
        id: "produitImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitCreate: {
        id: "produitCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitPhotos],
      },
      produitEdit: {
        id: "produitEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitPhotos],
      },
      produitDestroy: {
        id: "produitDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitPhotos],
      },
      produitRead: {
        id: "produitRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitAutocomplete: {
        id: "produitAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      produitCommandeImport: {
        id: "produitCommandeImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitCommandeCreate: {
        id: "produitCommandeCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitCommandeAttachements],
      },
      produitCommandeEdit: {
        id: "produitCommandeEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitCommandeAttachements],
      },
      produitCommandeDestroy: {
        id: "produitCommandeDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [storage.produitCommandeAttachements],
      },
      produitCommandeRead: {
        id: "produitCommandeRead",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      produitCommandeAutocomplete: {
        id: "produitCommandeAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      userAdherantAutocomplete: {
        id: "userAdherantAutocomplete",
        allowedRoles: [
          roles.admin,
          roles.member,
          roles.adhérent,
          roles.sponsor,
          roles.partenaire,
        ],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      commandLineImport: {
        id: "commandLineImport",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      commandLineCreate: {
        id: "commandLineCreate",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      commandLineEdit: {
        id: "commandLineEdit",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      commandLineDestroy: {
        id: "commandLineDestroy",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [],
      },
      commandLineRead: {
        id: "commandLineRead",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      commandLineAutocomplete: {
        id: "commandLineAutocomplete",
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
