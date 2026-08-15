/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: "userAvatarsProfiles",
        folder: "user/avatars/profile/:userId",
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      copyPassport: {
        id: "userPassportCopy",
        folder: "user/passport/copy/:userId",
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      settingsLogos: {
        id: "settingsLogos",
        folder: "tenant/:tenantId/settings/logos",
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: "settingsBackgroundImages",
        folder: "tenant/:tenantId/settings/backgroundImages",
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      galleryPhotos: {
        id: "galleryPhotos",
        folder: "tenant/:tenantId/gallery/photos",
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      categoryPhoto: {
        id: "categoryPhoto",
        folder: "tenant/:tenantId/category/photo",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      mandatPv: {
        id: "mandatPv",
        folder: "tenant/:tenantId/mandat/pv",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      mouvementsAttachements: {
        id: "mouvementsAttachements",
        folder: "tenant/:tenantId/mouvements/attachements",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      detailsCampagneFacture: {
        id: "detailsCampagneFacture",
        folder: "tenant/:tenantId/detailsCampagne/facture",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      historiquePointsAttachements: {
        id: "historiquePointsAttachements",
        folder: "tenant/:tenantId/historiquePoints/attachements",
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      newsImage: {
        id: 'newsImage',
        folder: 'tenant/:tenantId/news/image',
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      projetPhotoPrincipal: {
        id: "projetPhotoPrincipal",
        folder: "tenant/:tenantId/projet/photoPrincipal",
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      projetPhotos: {
        id: "projetPhotos",
        folder: "tenant/:tenantId/projet/photos",
        maxSizeInBytes: 100 * 1024 * 1024,
      },
      projetAttachements: {
        id: "projetAttachements",
        folder: "tenant/:tenantId/projet/attachements",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      donsAttachements: {
        id: "donsAttachements",
        folder: "tenant/:tenantId/dons/attachements",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      produitPhotos: {
        id: "produitPhotos",
        folder: "tenant/:tenantId/produit/photos",
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      produitCommandeAttachements: {
        id: "produitCommandeAttachements",
        folder: "tenant/:tenantId/produitCommande/attachements",
        maxSizeInBytes: 100 * 1024 * 1024,
      },
    };
  }
}
