import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.donsAttachements,
          storage.galleryPhotos,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      typeProjetImport: {
        id: 'typeProjetImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      typeProjetCreate: {
        id: 'typeProjetCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      typeProjetEdit: {
        id: 'typeProjetEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      typeProjetDestroy: {
        id: 'typeProjetDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      typeProjetRead: {
        id: 'typeProjetRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      typeProjetAutocomplete: {
        id: 'typeProjetAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.donsAttachements,
          storage.galleryPhotos,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.donsAttachements,
          storage.galleryPhotos,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.donsAttachements,
          storage.galleryPhotos,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.donsAttachements,
          storage.galleryPhotos,
        ],
      },
      userAdherantAutocomplete: {
        id: 'userAdherantAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },

      categoryImport: {
        id: 'categoryImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      categoryCreate: {
        id: 'categoryCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryEdit: {
        id: 'categoryEdit',
        allowedRoles: [roles.admin, roles.member, roles.agent],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryDestroy: {
        id: 'categoryDestroy',
        allowedRoles: [roles.admin, roles.agent],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryRead: {
        id: 'categoryRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.categoryPhoto],
      },
      categoryAutocomplete: {
        id: 'categoryAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      subcategoriesImport: {
        id: 'subcategoriesImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subcategoriesCreate: {
        id: 'subcategoriesCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subcategoriesEdit: {
        id: 'subcategoriesEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subcategoriesDestroy: {
        id: 'subcategoriesDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      subcategoriesRead: {
        id: 'subcategoriesRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      subcategoriesAutocomplete: {
        id: 'subcategoriesAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      chieldCategoriesImport: {
        id: 'chieldCategoriesImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      chieldCategoriesCreate: {
        id: 'chieldCategoriesCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      chieldCategoriesEdit: {
        id: 'chieldCategoriesEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      chieldCategoriesDestroy: {
        id: 'chieldCategoriesDestroy',
        allowedRoles: [roles.admin, , roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      chieldCategoriesRead: {
        id: 'chieldCategoriesRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      chieldCategoriesAutocomplete: {
        id: 'chieldCategoriesAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      taxesImport: {
        id: 'taxesImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      taxesCreate: {
        id: 'taxesCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      taxesEdit: {
        id: 'taxesEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      taxesDestroy: {
        id: 'taxesDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      taxesRead: {
        id: 'taxesRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      taxesAutocomplete: {
        id: 'taxesAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      brandsImport: {
        id: 'brandsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brandsCreate: {
        id: 'brandsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.brandsPhoto],
      },
      brandsEdit: {
        id: 'brandsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.brandsPhoto],
      },
      brandsDestroy: {
        id: 'brandsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.brandsPhoto],
      },
      brandsRead: {
        id: 'brandsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      brandsAutocomplete: {
        id: 'brandsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      editImport: {
        id: 'editImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      editCreate: {
        id: 'editCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      editEdit: {
        id: 'editEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      editDestroy: {
        id: 'editDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      editRead: {
        id: 'editRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      editAutocomplete: {
        id: 'editAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      campaignItemsImport: {
        id: 'campaignItemsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campaignItemsCreate: {
        id: 'campaignItemsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignItemsEdit: {
        id: 'campaignItemsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignItemsDestroy: {
        id: 'campaignItemsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignItemsRead: {
        id: 'campaignItemsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campaignItemsAutocomplete: {
        id: 'campaignItemsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      galleryImport: {
        id: 'galleryImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      galleryCreate: {
        id: 'galleryCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.galleryPhotos],
      },
      galleryEdit: {
        id: 'galleryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.galleryPhotos],
      },
      galleryDestroy: {
        id: 'galleryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.galleryPhotos],
      },
      galleryRead: {
        id: 'galleryRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      galleryAutocomplete: {
        id: 'galleryAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      productImport: {
        id: 'productImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      productCreate: {
        id: 'productCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.productPhoto,
          storage.productFile,
        ],
      },
      productEdit: {
        id: 'productEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.productPhoto,
          storage.productFile,
        ],
      },
      productDestroy: {
        id: 'productDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.productPhoto,
          storage.productFile,
        ],
      },
      productRead: {
        id: 'productRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      productAutocomplete: {
        id: 'productAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      shippingserviceImport: {
        id: 'shippingserviceImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      shippingserviceCreate: {
        id: 'shippingserviceCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      shippingserviceEdit: {
        id: 'shippingserviceEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      shippingserviceDestroy: {
        id: 'shippingserviceDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      shippingserviceRead: {
        id: 'shippingserviceRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      shippingserviceAutocomplete: {
        id: 'shippingserviceAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      couponsImport: {
        id: 'couponsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      couponsCreate: {
        id: 'couponsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      couponsEdit: {
        id: 'couponsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      couponsDestroy: {
        id: 'couponsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      couponsRead: {
        id: 'couponsRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      couponsAutocomplete: {
        id: 'couponsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      transactionImport: {
        id: 'transactionImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      transactionCreate: {
        id: 'transactionCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      transactionEdit: {
        id: 'transactionEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      transactionDestroy: {
        id: 'transactionDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      transactionRead: {
        id: 'transactionRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      transactionAutocomplete: {
        id: 'transactionAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      trackOrderImport: {
        id: 'trackOrderImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackOrderCreate: {
        id: 'trackOrderCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      trackOrderEdit: {
        id: 'trackOrderEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      trackOrderDestroy: {
        id: 'trackOrderDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      trackOrderRead: {
        id: 'trackOrderRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      trackOrderAutocomplete: {
        id: 'trackOrderAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      orderImport: {
        id: 'orderImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      orderCreate: {
        id: 'orderCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      orderEdit: {
        id: 'orderEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      orderDestroy: {
        id: 'orderDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      orderRead: {
        id: 'orderRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      orderAutocomplete: {
        id: 'orderAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      stateImport: {
        id: 'stateImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      stateCreate: {
        id: 'stateCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      stateEdit: {
        id: 'stateEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      stateDestroy: {
        id: 'stateDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      stateRead: {
        id: 'stateRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      stateAutocomplete: {
        id: 'stateAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      attributeOptionsImport: {
        id: 'attributeOptionsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      attributeOptionsCreate: {
        id: 'attributeOptionsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributeOptionsEdit: {
        id: 'attributeOptionsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributeOptionsDestroy: {
        id: 'attributeOptionsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributeOptionsRead: {
        id: 'attributeOptionsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      attributeOptionsAutocomplete: {
        id: 'attributeOptionsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      cartImport: {
        id: 'cartImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      cartCreate: {
        id: 'cartCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.cartPhoto],
      },
      cartEdit: {
        id: 'cartEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.cartPhoto],
      },
      cartDestroy: {
        id: 'cartDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.cartPhoto],
      },
      cartRead: {
        id: 'cartRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      cartAutocomplete: {
        id: 'cartAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      paymentsettingsImport: {
        id: 'paymentsettingsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentsettingsCreate: {
        id: 'paymentsettingsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.paymentsettingsPhoto],
      },
      paymentsettingsEdit: {
        id: 'paymentsettingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.paymentsettingsPhoto],
      },
      paymentsettingsDestroy: {
        id: 'paymentsettingsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.paymentsettingsPhoto],
      },
      paymentsettingsRead: {
        id: 'paymentsettingsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentsettingsAutocomplete: {
        id: 'paymentsettingsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      reviewImport: {
        id: 'reviewImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      reviewCreate: {
        id: 'reviewCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      reviewEdit: {
        id: 'reviewEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      reviewDestroy: {
        id: 'reviewDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      reviewRead: {
        id: 'reviewRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      reviewAutocomplete: {
        id: 'reviewAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      attributesImport: {
        id: 'attributesImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      attributesCreate: {
        id: 'attributesCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributesEdit: {
        id: 'attributesEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributesDestroy: {
        id: 'attributesDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      attributesRead: {
        id: 'attributesRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      attributesAutocomplete: {
        id: 'attributesAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campagneImport: {
        id: 'campagneImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campagneCreate: {
        id: 'campagneCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campagneEdit: {
        id: 'campagneEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campagneDestroy: {
        id: 'campagneDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campagneRead: {
        id: 'campagneRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campagneAutocomplete: {
        id: 'campagneAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      detailsCampagneImport: {
        id: 'detailsCampagneImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      detailsCampagneCreate: {
        id: 'detailsCampagneCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneEdit: {
        id: 'detailsCampagneEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneDestroy: {
        id: 'detailsCampagneDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.detailsCampagneFacture],
      },
      detailsCampagneRead: {
        id: 'detailsCampagneRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      detailsCampagneAutocomplete: {
        id: 'detailsCampagneAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      projetImport: {
        id: 'projetImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      projetCreate: {
        id: 'projetCreate',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetEdit: {
        id: 'projetEdit',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetDestroy: {
        id: 'projetDestroy',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.projetPhotoPrincipal,
          storage.projetPhotos,
          storage.projetAttachements,
        ],
      },
      projetRead: {
        id: 'projetRead',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      projetAutocomplete: {
        id: 'projetAutocomplete',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      votesImport: {
        id: 'votesImport',
        allowedRoles: [roles.admin, roles.member],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      votesCreate: {
        id: 'votesCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      votesEdit: {
        id: 'votesEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      votesDestroy: {
        id: 'votesDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      votesRead: {
        id: 'votesRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      votesAutocomplete: {
        id: 'votesAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      donsImport: {
        id: 'donsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      donsCreate: {
        id: 'donsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.donsAttachements],
      },
      donsEdit: {
        id: 'donsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.donsAttachements],
      },
      donsDestroy: {
        id: 'donsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.donsAttachements],
      },
      donsRead: {
        id: 'donsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      donsAutocomplete: {
        id: 'donsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      electionImport: {
        id: 'electionImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      electionCreate: {
        id: 'electionCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.electionPv],
      },
      electionEdit: {
        id: 'electionEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.electionPv],
      },
      electionDestroy: {
        id: 'electionDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.electionPv],
      },
      electionRead: {
        id: 'electionRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      electionAutocomplete: {
        id: 'electionAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      associationImport: {
        id: 'associationImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      associationCreate: {
        id: 'associationCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.associationLogo],
      },
      associationEdit: {
        id: 'associationEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.associationLogo],
      },
      associationDestroy: {
        id: 'associationDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.associationLogo],
      },
      associationRead: {
        id: 'associationRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      associationAutocomplete: {
        id: 'associationAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsCategoryImport: {
        id: 'newsCategoryImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsCategoryCreate: {
        id: 'newsCategoryCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      newsCategoryEdit: {
        id: 'newsCategoryEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      newsCategoryDestroy: {
        id: 'newsCategoryDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      newsCategoryRead: {
        id: 'newsCategoryRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsCategoryAutocomplete: {
        id: 'newsCategoryAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      tagImport: {
        id: 'tagImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tagCreate: {
        id: 'tagCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      tagEdit: {
        id: 'tagEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      tagDestroy: {
        id: 'tagDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      tagRead: {
        id: 'tagRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tagAutocomplete: {
        id: 'tagAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      newsImport: {
        id: 'newsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsCreate: {
        id: 'newsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.newsImage,
          storage.newsAttachements,
        ],
      },
      newsEdit: {
        id: 'newsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.newsImage,
          storage.newsAttachements,
        ],
      },
      newsDestroy: {
        id: 'newsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.newsImage,
          storage.newsAttachements,
        ],
      },
      newsRead: {
        id: 'newsRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      newsAutocomplete: {
        id: 'newsAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      groupImport: {
        id: 'groupImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      groupCreate: {
        id: 'groupCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.groupLogo],
      },
      groupEdit: {
        id: 'groupEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.groupLogo],
      },
      groupDestroy: {
        id: 'groupDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.groupLogo],
      },
      groupRead: {
        id: 'groupRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      groupAutocomplete: {
        id: 'groupAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      formuleImport: {
        id: 'formuleImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      formuleCreate: {
        id: 'formuleCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      formuleEdit: {
        id: 'formuleEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      formuleDestroy: {
        id: 'formuleDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      formuleRead: {
        id: 'formuleRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      formuleAutocomplete: {
        id: 'formuleAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },

      adherentshipImport: {
        id: 'adherentshipImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adherentshipCreate: {
        id: 'adherentshipCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.adherentshipAttachements],
      },
      adherentshipEdit: {
        id: 'adherentshipEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.adherentshipAttachements],
      },
      adherentshipDestroy: {
        id: 'adherentshipDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.adherentshipAttachements],
      },
      adherentshipRead: {
        id: 'adherentshipRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adherentshipAutocomplete: {
        id: 'adherentshipAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      partnerImport: {
        id: 'partnerImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      partnerCreate: {
        id: 'partnerCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.partnerLogo],
      },
      partnerEdit: {
        id: 'partnerEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.partnerLogo],
      },
      partnerDestroy: {
        id: 'partnerDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.partnerLogo],
      },
      partnerRead: {
        id: 'partnerRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      partnerAutocomplete: {
        id: 'partnerAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campaignImport: {
        id: 'campaignImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campaignCreate: {
        id: 'campaignCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignEdit: {
        id: 'campaignEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignDestroy: {
        id: 'campaignDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [],
      },
      campaignRead: {
        id: 'campaignRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      campaignAutocomplete: {
        id: 'campaignAutocomplete',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
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
