const ptBR = {
  common: {
    or: 'ou',
    cancel: 'Cancelar',
    reset: 'Limpar',
    save: 'Salvar',
    search: 'Buscar',
    edit: 'Editar',
    new: 'Novo',
    export: 'Exportar para Excel',
    noDataToExport: 'Não há dados para exportar',
    import: 'Importar',
    discard: 'Descartar',
    yes: 'Sim',
    no: 'Não',
    pause: 'Pausar',
    areYouSure: 'Tem certeza?',
    view: 'Visualizar',
    destroy: 'Deletar',
    mustSelectARow: 'Selecine uma linha',
    start: 'Inicio',
    end: 'Fim',
    select: 'Selecionar',
    continue: 'Continuar',
    filters: 'Filtros',
  },

  app: {
    title: 'Aplicação',
  },

  api: {
    menu: 'API',
  },

  entities: {
    category: {
      name: 'Category',
      label: 'Categories',
      menu: 'Categories',
      exporterFileName: 'Category_exportados',
      list: {
        menu: 'Categories',
        title: 'Categories',
      },
      create: {
        success: 'Category salvo com sucesso',
      },
      update: {
        success: 'Category salvo com sucesso',
      },
      destroy: {
        success: 'Category deletado com sucesso',
      },
      destroyAll: {
        success: 'Category(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        slug: 'Slug',
        photo: 'Photo',
        metaKeywords: 'MetaKeywords',
        metaDescriptions: 'MetaDescriptions',
        status: 'Status',
        isFeature: 'IsFeature',
        serialRange: 'Serial',
        serial: 'Serial',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Category',
      },
      view: {
        title: 'Visualizar Category',
      },
      importer: {
        title: 'Importar Categories',
        fileName: 'category_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    subcategories: {
      name: 'Subcategories',
      label: 'Subcategories',
      menu: 'Subcategories',
      exporterFileName: 'Subcategories_exportados',
      list: {
        menu: 'Subcategories',
        title: 'Subcategories',
      },
      create: {
        success: 'Subcategories salvo com sucesso',
      },
      update: {
        success: 'Subcategories salvo com sucesso',
      },
      destroy: {
        success: 'Subcategories deletado com sucesso',
      },
      destroyAll: {
        success: 'Subcategories(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Subcategories',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        slug: 'Slug',
        status: 'Status',
        categoryId: 'Category',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Subcategories',
      },
      view: {
        title: 'Visualizar Subcategories',
      },
      importer: {
        title: 'Importar Subcategories',
        fileName: 'subcategories_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    chieldCategories: {
      name: 'ChieldCategories',
      label: 'ChieldCategories',
      menu: 'ChieldCategories',
      exporterFileName: 'ChieldCategories_exportados',
      list: {
        menu: 'ChieldCategories',
        title: 'ChieldCategories',
      },
      create: {
        success: 'ChieldCategories salvo com sucesso',
      },
      update: {
        success: 'ChieldCategories salvo com sucesso',
      },
      destroy: {
        success: 'ChieldCategories deletado com sucesso',
      },
      destroyAll: {
        success: 'ChieldCategories(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar ChieldCategories',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        slug: 'Slug',
        categoryId: 'CategoryId',
        subcategoryId: 'SubcategoryId',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {
        subcategoryId: ' ',
      },
      hints: {},
      new: {
        title: 'Novo ChieldCategories',
      },
      view: {
        title: 'Visualizar ChieldCategories',
      },
      importer: {
        title: 'Importar ChieldCategories',
        fileName: 'chieldCategories_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    taxes: {
      name: 'Taxes',
      label: 'Taxes',
      menu: 'Taxes',
      exporterFileName: 'Taxes_exportados',
      list: {
        menu: 'Taxes',
        title: 'Taxes',
      },
      create: {
        success: 'Taxes salvo com sucesso',
      },
      update: {
        success: 'Taxes salvo com sucesso',
      },
      destroy: {
        success: 'Taxes deletado com sucesso',
      },
      destroyAll: {
        success: 'Taxes(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Taxes',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        valueRange: 'Value',
        value: 'Value',
        status: 'Status',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Taxes',
      },
      view: {
        title: 'Visualizar Taxes',
      },
      importer: {
        title: 'Importar Taxes',
        fileName: 'taxes_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    brands: {
      name: 'Brands',
      label: 'Brands',
      menu: 'Brands',
      exporterFileName: 'Brands_exportados',
      list: {
        menu: 'Brands',
        title: 'Brands',
      },
      create: {
        success: 'Brands salvo com sucesso',
      },
      update: {
        success: 'Brands salvo com sucesso',
      },
      destroy: {
        success: 'Brands deletado com sucesso',
      },
      destroyAll: {
        success: 'Brands(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Brands',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        slug: 'Slug',
        photo: 'Photo',
        status: 'Status',
        isPopular: 'IsPopular',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enbale: 'Enbale',
          disable: 'Disable',
        },
        isPopular: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Brands',
      },
      view: {
        title: 'Visualizar Brands',
      },
      importer: {
        title: 'Importar Brands',
        fileName: 'brands_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    edit: {
      name: 'Edit',
      label: 'Edits',
      menu: 'Edits',
      exporterFileName: 'Edit_exportados',
      list: {
        menu: 'Edits',
        title: 'Edits',
      },
      create: {
        success: 'Edit salvo com sucesso',
      },
      update: {
        success: 'Edit salvo com sucesso',
      },
      destroy: {
        success: 'Edit deletado com sucesso',
      },
      destroyAll: {
        success: 'Edit(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Edit',
      },
      fields: {
        id: 'Id',
        campaignTitle: 'CampaignTitle',
        campaignLastDateTimeRange: 'CampaignLastDateTime',
        campaignLastDateTime: 'CampaignLastDateTime',
        status: 'Status',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Edit',
      },
      view: {
        title: 'Visualizar Edit',
      },
      importer: {
        title: 'Importar Edits',
        fileName: 'edit_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    campaignItems: {
      name: 'CampaignItems',
      label: 'CampaignItems',
      menu: 'CampaignItems',
      exporterFileName: 'CampaignItems_exportados',
      list: {
        menu: 'CampaignItems',
        title: 'CampaignItems',
      },
      create: {
        success: 'CampaignItems salvo com sucesso',
      },
      update: {
        success: 'CampaignItems salvo com sucesso',
      },
      destroy: {
        success: 'CampaignItems deletado com sucesso',
      },
      destroyAll: {
        success: 'CampaignItems(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar CampaignItems',
      },
      fields: {
        id: 'Id',
        status: 'Status',
        isFeature: 'IsFeature',
        itemId: 'ItemId',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
        isFeature: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo CampaignItems',
      },
      view: {
        title: 'Visualizar CampaignItems',
      },
      importer: {
        title: 'Importar CampaignItems',
        fileName: 'campaignItems_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    gallery: {
      name: 'Gallery',
      label: 'Galleries',
      menu: 'Galleries',
      exporterFileName: 'Gallery_exportados',
      list: {
        menu: 'Galleries',
        title: 'Galleries',
      },
      create: {
        success: 'Gallery salvo com sucesso',
      },
      update: {
        success: 'Gallery salvo com sucesso',
      },
      destroy: {
        success: 'Gallery deletado com sucesso',
      },
      destroyAll: {
        success: 'Gallery(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Gallery',
      },
      fields: {
        id: 'Id',
        photos: 'Photos',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Gallery',
      },
      view: {
        title: 'Visualizar Gallery',
      },
      importer: {
        title: 'Importar Galleries',
        fileName: 'gallery_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    product: {
      name: 'Product',
      label: 'Products',
      menu: 'Products',
      exporterFileName: 'Product_exportados',
      list: {
        menu: 'Products',
        title: 'Products',
      },
      create: {
        success: 'Product salvo com sucesso',
      },
      update: {
        success: 'Product salvo com sucesso',
      },
      destroy: {
        success: 'Product deletado com sucesso',
      },
      destroyAll: {
        success: 'Product(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Product',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        slug: 'Slug',
        tags: 'Tags',
        video: 'Video',
        specificationName: 'SpecificationName',
        specificationDesciption: 'SpecificationDesciption',
        isSpecification: 'IsSpecification',
        details: 'Details',
        photo: 'Photo',
        discountPriceRange: 'DiscountPrice',
        discountPrice: 'DiscountPrice',
        previousPriceRange: 'PreviousPrice',
        previousPrice: 'PreviousPrice',
        stockRange: 'Stock',
        stock: 'Stock',
        metaKeywords: 'MetaKeywords',
        metaDesctiption: 'MetaDesctiption',
        status: 'Status',
        isType: 'Type',
        dateRange: 'Date',
        date: 'Date',
        itemType: 'ItemType',
        file: 'File',
        link: 'Link',
        fileType: 'FileType',
        taxe: 'Taxe',
        category: 'Category',
        subcategory: 'Subcategory',
        childcategory: 'Childcategory',
        brand: 'Brand',
        gallery: 'Gallery',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
        itemType: {
          normal: 'Normal',
          digitale: 'Digitale',
        },
        fileType: {
          file: 'File',
          link: 'Link',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Product',
      },
      view: {
        title: 'Visualizar Product',
      },
      importer: {
        title: 'Importar Products',
        fileName: 'product_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    shippingservice: {
      name: 'Shippingservice',
      label: 'Shippingservices',
      menu: 'Shippingservices',
      exporterFileName: 'Shippingservice_exportados',
      list: {
        menu: 'Shippingservices',
        title: 'Shippingservices',
      },
      create: {
        success: 'Shippingservice salvo com sucesso',
      },
      update: {
        success: 'Shippingservice salvo com sucesso',
      },
      destroy: {
        success: 'Shippingservice deletado com sucesso',
      },
      destroyAll: {
        success: 'Shippingservice(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Shippingservice',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        priceRange: 'Price',
        price: 'Price',
        status: 'Status',
        minimumPriceRange: 'MinimumPrice',
        minimumPrice: 'MinimumPrice',
        isCondition: 'IsCondition',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Shippingservice',
      },
      view: {
        title: 'Visualizar Shippingservice',
      },
      importer: {
        title: 'Importar Shippingservices',
        fileName: 'shippingservice_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    coupons: {
      name: 'Coupons',
      label: 'Coupons',
      menu: 'Coupons',
      exporterFileName: 'Coupons_exportados',
      list: {
        menu: 'Coupons',
        title: 'Coupons',
      },
      create: {
        success: 'Coupons salvo com sucesso',
      },
      update: {
        success: 'Coupons salvo com sucesso',
      },
      destroy: {
        success: 'Coupons deletado com sucesso',
      },
      destroyAll: {
        success: 'Coupons(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Coupons',
      },
      fields: {
        id: 'Id',
        title: 'Title',
        codeName: 'CodeName',
        discountRange: 'Discount',
        discount: 'Discount',
        noOfTimesRange: 'NoOfTimes',
        noOfTimes: 'NoOfTimes',
        status: 'Status',
        type: 'Type',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
        type: {
          'Percentage (%)': 'Percentage (%)',
          'amount ( TND)': 'Amount ( TND)',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Coupons',
      },
      view: {
        title: 'Visualizar Coupons',
      },
      importer: {
        title: 'Importar Coupons',
        fileName: 'coupons_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    transaction: {
      name: 'Transaction',
      label: 'Transactions',
      menu: 'Transactions',
      exporterFileName: 'Transaction_exportados',
      list: {
        menu: 'Transactions',
        title: 'Transactions',
      },
      create: {
        success: 'Transaction salvo com sucesso',
      },
      update: {
        success: 'Transaction salvo com sucesso',
      },
      destroy: {
        success: 'Transaction deletado com sucesso',
      },
      destroyAll: {
        success: 'Transaction(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Transaction',
      },
      fields: {
        id: 'Id',
        amountRange: 'Amount',
        amount: 'Amount',
        email: 'Email',
        tax: 'Tax',
        currencySign: 'CurrencySign',
        currencyValue: 'CurrencyValue',
        orderId: 'OrderId',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Transaction',
      },
      view: {
        title: 'Visualizar Transaction',
      },
      importer: {
        title: 'Importar Transactions',
        fileName: 'transaction_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    trackOrder: {
      name: 'TrackOrder',
      label: 'TrackOrders',
      menu: 'TrackOrders',
      exporterFileName: 'TrackOrder_exportados',
      list: {
        menu: 'TrackOrders',
        title: 'TrackOrders',
      },
      create: {
        success: 'TrackOrder salvo com sucesso',
      },
      update: {
        success: 'TrackOrder salvo com sucesso',
      },
      destroy: {
        success: 'TrackOrder deletado com sucesso',
      },
      destroyAll: {
        success: 'TrackOrder(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar TrackOrder',
      },
      fields: {
        id: 'Id',
        title: 'Title',
        item: 'Item',
        order: 'Order',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo TrackOrder',
      },
      view: {
        title: 'Visualizar TrackOrder',
      },
      importer: {
        title: 'Importar TrackOrders',
        fileName: 'trackOrder_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    order: {
      name: 'Order',
      label: 'Orders',
      menu: 'Orders',
      exporterFileName: 'Order_exportados',
      list: {
        menu: 'Orders',
        title: 'Orders',
      },
      create: {
        success: 'Order salvo com sucesso',
      },
      update: {
        success: 'Order salvo com sucesso',
      },
      destroy: {
        success: 'Order deletado com sucesso',
      },
      destroyAll: {
        success: 'Order(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Order',
      },
      fields: {
        id: 'Id',
        userId: 'UserId',
        cart: 'Cart',
        shipping: 'Shipping',
        discountRange: 'Discount',
        discount: 'Discount',
        paymentMethod: 'PaymentMethod',
        taxe: 'Taxe',
        transactionNumber: 'TransactionNumber',
        orderStatus: 'OrderStatus',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        orderStatus: {
          pending: 'Pending',
          in_progress: 'In_progress',
          delivered: 'Delivered',
          canceled: 'Canceled',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Order',
      },
      view: {
        title: 'Visualizar Order',
      },
      importer: {
        title: 'Importar Orders',
        fileName: 'order_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    state: {
      name: 'State',
      label: 'States',
      menu: 'States',
      exporterFileName: 'State_exportados',
      list: {
        menu: 'States',
        title: 'States',
      },
      create: {
        success: 'State salvo com sucesso',
      },
      update: {
        success: 'State salvo com sucesso',
      },
      destroy: {
        success: 'State deletado com sucesso',
      },
      destroyAll: {
        success: 'State(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar State',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        priceRange: 'Price',
        price: 'Price',
        status: 'Status',
        type: 'Type',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo State',
      },
      view: {
        title: 'Visualizar State',
      },
      importer: {
        title: 'Importar States',
        fileName: 'state_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    attributeOptions: {
      name: 'AttributeOptions',
      label: 'AttributeOptions',
      menu: 'AttributeOptions',
      exporterFileName: 'AttributeOptions_exportados',
      list: {
        menu: 'AttributeOptions',
        title: 'AttributeOptions',
      },
      create: {
        success: 'AttributeOptions salvo com sucesso',
      },
      update: {
        success: 'AttributeOptions salvo com sucesso',
      },
      destroy: {
        success: 'AttributeOptions deletado com sucesso',
      },
      destroyAll: {
        success: 'AttributeOptions(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar AttributeOptions',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        priceRange: 'Price',
        price: 'Price',
        keyword: 'Keyword',
        item: 'Item',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo AttributeOptions',
      },
      view: {
        title: 'Visualizar AttributeOptions',
      },
      importer: {
        title: 'Importar AttributeOptions',
        fileName: 'attributeOptions_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    cart: {
      name: 'Cart',
      label: 'Carts',
      menu: 'Carts',
      exporterFileName: 'Cart_exportados',
      list: {
        menu: 'Carts',
        title: 'Carts',
      },
      create: {
        success: 'Cart salvo com sucesso',
      },
      update: {
        success: 'Cart salvo com sucesso',
      },
      destroy: {
        success: 'Cart deletado com sucesso',
      },
      destroyAll: {
        success: 'Cart(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Cart',
      },
      fields: {
        id: 'Id',
        optionsId: 'OptionsId',
        attribute: 'Attribute',
        name: 'Name',
        slug: 'Slug',
        qtyRange: 'Qty',
        qty: 'Qty',
        priceRange: 'Price',
        price: 'Price',
        mainPriceRange: 'MainPrice',
        mainPrice: 'MainPrice',
        photo: 'Photo',
        itemType: 'ItemType',
        itemLN: 'ItemLN',
        itemLK: 'ItemLK',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Cart',
      },
      view: {
        title: 'Visualizar Cart',
      },
      importer: {
        title: 'Importar Carts',
        fileName: 'cart_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    paymentsettings: {
      name: 'Paymentsettings',
      label: 'Paymentsettings',
      menu: 'Paymentsettings',
      exporterFileName: 'Paymentsettings_exportados',
      list: {
        menu: 'Paymentsettings',
        title: 'Paymentsettings',
      },
      create: {
        success: 'Paymentsettings salvo com sucesso',
      },
      update: {
        success: 'Paymentsettings salvo com sucesso',
      },
      destroy: {
        success: 'Paymentsettings deletado com sucesso',
      },
      destroyAll: {
        success: 'Paymentsettings(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Paymentsettings',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        information: 'Information',
        uniqueKeywords: 'UniqueKeywords',
        photo: 'Photo',
        text: 'Text',
        status: 'Status',
        type: 'Type',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Paymentsettings',
      },
      view: {
        title: 'Visualizar Paymentsettings',
      },
      importer: {
        title: 'Importar Paymentsettings',
        fileName: 'paymentsettings_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },

    review: {
      name: 'Review',
      label: 'Reviews',
      menu: 'Reviews',
      exporterFileName: 'Review_exportados',
      list: {
        menu: 'Reviews',
        title: 'Reviews',
      },
      create: {
        success: 'Review salvo com sucesso',
      },
      update: {
        success: 'Review salvo com sucesso',
      },
      destroy: {
        success: 'Review deletado com sucesso',
      },
      destroyAll: {
        success: 'Review(s) deletado com sucesso',
      },
      edit: {
        title: 'Editar Review',
      },
      fields: {
        id: 'Id',
        review: 'Review',
        ratingRange: 'Rating',
        rating: 'Rating',
        status: 'Status',
        subject: 'Subject',
        item: 'Item',
        user: 'User',
        createdAt: 'Criado em',
        updatedAt: 'Atualizado em',
        createdAtRange: 'Criado em',
      },
      enumerators: {
        status: {
          enable: 'Enable',
          disable: 'Disable',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'Novo Review',
      },
      view: {
        title: 'Visualizar Review',
      },
      importer: {
        title: 'Importar Reviews',
        fileName: 'review_template_importacao',
        hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
      },
    },
  },

  auth: {
    tenants: 'Áreas de Trabalho',
    profile: {
      title: 'Perfil',
      success: 'Perfil atualizado com sucesso',
    },
    createAnAccount: 'Criar uma conta',
    rememberMe: 'Lembrar-me',
    forgotPassword: 'Esqueci minha senha',
    signin: 'Entrar',
    signup: 'Registrar',
    signout: 'Sair',
    alreadyHaveAnAccount: 'Já possui uma conta? Entre.',
    social: {
      errors: {
        'auth-invalid-provider':
          'Este email está registrado para outro provedor.',
        'auth-no-email': `O email associado a esta conta é privado ou não existe.`,
      },
    },
    signinWithAnotherAccount: 'Entrar com outra conta',
    emailUnverified: {
      message: `Por favor, confirme seu email em <strong>{0}</strong> para continuar.`,
      submit: `Reenviar confirmação por email`,
    },
    passwordResetEmail: {
      message: 'Enviar email de redefinição de senha',
      error: `Email não encontrado`,
    },
    emptyPermissions: {
      message: `Você ainda não possui permissões. Aguarde o administrador conceder seus privilégios.`,
    },
    passwordReset: {
      message: 'Alterar senha',
    },
    passwordChange: {
      title: 'Mudar a Senha',
      success: 'Senha alterada com sucesso',
      mustMatch: 'Senhas devem ser iguais',
    },
    emailAddressVerificationEmail: {
      error: `Email não encontrado`,
    },
    verificationEmailSuccess: `Verificação de email enviada com sucesso`,
    passwordResetEmailSuccess: `Email de redefinição de senha enviado com sucesso`,
    passwordResetSuccess: `Senha alterada com sucesso`,
    verifyEmail: {
      success: 'Email verificado com sucesso.',
      message:
        'Aguarde um momento, seu email está sendo verificado...',
    },
  },

  roles: {
    admin: {
      label: 'Administrador',
      description: 'Acesso completo a todos os recursos',
    },
    adherent: {
      label: 'Perfil adherentizado',
      description: 'Acesso adherentizado',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Nome',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      status: 'Estado',
      phoneNumber: 'Telefone',
      role: 'Perfil',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
      roleUser: 'Perfil/Usuário',
      roles: 'Perfis',
      createdAtRange: 'Criado em',
      password: 'Senha',
      oldPassword: 'Senha Antiga',
      newPassword: 'Nova Senha',
      newPasswordConfirmation: 'Confirmação da Nova Senha',
      rememberMe: 'Lembrar-me',
    },
    status: {
      active: 'Ativo',
      invited: 'Convidado',
      'empty-permissions': 'Aguardando Permissões',
    },
    invite: 'Convidar',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} é inválido',
    },
    title: 'Usuários',
    menu: 'Usuários',
    doAddSuccess: 'Usuário(s) salvos com sucesso',
    doUpdateSuccess: 'Usuário salvo com sucesso',
    exporterFileName: 'usuarios_exportados',
    doDestroySuccess: 'Usuário deletado com sucesso',
    doDestroyAllSelectedSuccess:
      'Usuários deletado com sucesso',
    edit: {
      title: 'Editar usuário',
    },
    new: {
      title: 'Novo(s) Usuário(s)',
      titleModal: 'Novo Usuário',
      emailsHint:
        'Separe múltiplos endereços de e-mail usando a vírgula.',
    },
    view: {
      title: 'Visualizar Usuário',
      activity: 'Atividades',
    },
    importer: {
      title: 'Importar Usuários',
      fileName: 'usuarios_template_importacao',
      hint: 'Arquivos/Imagens devem ser as URLs dos arquivos, separados por espaço. Relacionamentos devem ser os IDs separados por espaço.',
    },
    errors: {
      userAlreadyExists: 'Usuário com este email já existe',
      userNotFound: 'Usuário não encontrado',
      revokingOwnPermission: `Você não pode revogar sua própria permissão de proprietário`,
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Área de Trabalho',
    menu: 'Áreas de Trabalho',
    list: {
      menu: 'Áreas de Trabalho',
      title: 'Áreas de Trabalho',
    },
    create: {
      button: 'Criar Área de Trabalho',
      success: 'Área de Trabalho salva com sucesso',
    },
    update: {
      success: 'Área de Trabalho salva com sucesso',
    },
    destroy: {
      success: 'Área de Trabalho deletada com sucesso',
    },
    destroyAll: {
      success: 'Área(s) de Trabalho deletadas com sucesso',
    },
    edit: {
      title: 'Editar Área de Trabalho',
    },
    fields: {
      id: 'Id',
      name: 'Nome',
      tenantName: 'Nome da Área de Trabalho',
      tenantUrl: 'URL da Área de Trabalho',
      tenantId: 'Área de Trabalho',
      plan: 'Plano',
    },
    enumerators: {},
    new: {
      title: 'Nova Área de Trabalho',
    },
    invitation: {
      view: 'Ver Convites',
      invited: 'Convidado',
      accept: 'Aceitar Convite',
      decline: 'Recusar Convite',
      declined: 'Convite recusado com sucesso',
      acceptWrongEmail: 'Aceitar Convite Com Este Email',
    },
    select: 'Selecionar Área de Trabalho',
    url: {
      exists:
        'Esta URL de área de trabalho já está em uso.',
    },
  },

  plan: {
    menu: 'Planos',
    title: 'Planos',

    free: {
      label: 'Gratuito',
      price: '$0',
    },
    growth: {
      label: 'Growth',
      price: '$10',
    },
    enterprise: {
      label: 'Enterprise',
      price: '$50',
    },

    pricingPeriod: '/mês',
    current: 'Plano Atual',
    subscribe: 'Assinar',
    manage: 'Gerenciar Assinatura',
    somethingWrong:
      'Há algo errado com sua assinatura. Por favor clique em Gerenciar Assinatura para mais informações.',
    cancelAtPeriodEnd:
      'O plano será cancelado no fim do período.',
    notPlanUser: `Esta assinatura não é controlada por você.`,
  },

  auditLog: {
    menu: 'Registros de Auditoria',
    title: 'Registros de Auditoria',
    exporterFileName: 'registros_autoria_exportados',
    entityNamesHint:
      'Separe múltiplas entidades por vírgula',
    fields: {
      id: 'Id',
      timestampRange: 'Período',
      entityName: 'Entidade',
      entityNames: 'Entidades',
      entityId: 'ID da Entidade',
      action: 'Ação',
      values: 'Valores',
      timestamp: 'Data',
      createdByEmail: 'Email do Usuário',
    },
  },
  settings: {
    title: 'Configurações',
    menu: 'Configurações',
    save: {
      success: 'Configurações salvas com sucesso.',
    },
    fields: {
      theme: 'Tema',
      logos: 'Logo',
      backgroundImages: 'Papel de Parede',
    },
    colors: {
      default: 'Escuro',
      light: 'Claro',
      cyan: 'Ciano',
      'geek-blue': 'Azul escuro',
      gold: 'Ouro',
      lime: 'Limão',
      magenta: 'Magenta',
      orange: 'Laranja',
      'polar-green': 'Verde polar',
      purple: 'Roxo',
      red: 'Vermelho',
      volcano: 'Vúlcão',
      yellow: 'Amarelo',
    },
  },
  dashboard: {
    menu: 'Inicial',
    message: `Esta página usa dados falsos apenas para fins de demonstração. Você pode editá-la em frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Dia',
      red: 'Vermelho',
      green: 'Verde',
      yellow: 'Amarelho',
      grey: 'Cinza',
      blue: 'Azul',
      orange: 'Laranja',
      months: {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
      },
      eating: 'Comendo',
      drinking: 'Bebendo',
      sleeping: 'Dormindo',
      designing: 'Projetando',
      coding: 'Codificando',
      cycling: 'Pedalando',
      running: 'Correndo',
      adherenter: 'Cliente',
    },
  },
  errors: {
    backToHome: 'Voltar a página inicial',
    403: `Desculpe, você não tem acesso a esta página`,
    404: 'Desculpe, a página que você visitou não existe',
    500: 'Desculpe, o servidor está relatando um erro',
    429: 'Muitas requisições. Por favor, tente novamente mais tarde.',
    forbidden: {
      message: 'Acesso negado',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
    defaultErrorMessage: 'Ops, ocorreu um erro',
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida em modo de demonstração.',
  },

  // See https://github.com/jquense/yup#using-a-adherent-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} é inválido',
      required: '${path} é obrigatório',
      oneOf:
        '${path} deve ser um dos seguintes valores: ${values}',
      notOneOf:
        '${path} não deve ser um dos seguintes valores: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: '${path} deve possuir ${length} caracteres',
      min: '${path} deve possuir ao menos ${min} caracteres',
      max: '${path} deve possui no máximo ${max} caracteres',
      matches:
        '${path} deve respeitar o padrão: "${regex}"',
      email: '${path} deve ser um email válido',
      url: '${path} deve ser uma URL válida',
      trim: '${path} deve ser uma palavra sem espaços em branco',
      lowercase: '${path} deve ser minúsculo',
      uppercase: '${path} deve ser maiúsculo',
      selected: '${path} deve ser selecionado',
    },
    number: {
      min: '${path} deve ser maior ou igual a ${min}',
      max: '${path} deve ser menor ou igual a ${max}',
      lessThan: '${path} deve ser menor que ${less}',
      moreThan: '${path} deve ser maior que ${more}',
      notEqual: '${path} não deve ser igual a ${notEqual}',
      positive: '${path} deve ser um número positivo',
      negative: '${path} deve ser um número negativo',
      integer: '${path} deve ser um inteiro',
    },
    date: {
      min: '${path} deve ser posterior a ${min}',
      max: '${path} deve ser mais cedo do que ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} não pode ter atributos não especificados no formato do objeto',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} é obrigatório`
          : `'${path} deve possuir ao menos ${min} itens`,
      max: '${path} deve possuir no máximo ${max} itens',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'Você deve fazer upload de uma imagem',
    size: 'O arquivo é muito grande. O tamanho máximo permitido é {0}',
    formats: `Formato inválido. Deve ser um destes: {0}.`,
  },
  importer: {
    line: 'Linha',
    status: 'Estado',
    pending: 'Pendente',
    imported: 'Importado',
    error: 'Erro',
    total: `{0} importado, {1} pendente e {2} com erro`,
    importedMessage: `Processados {0} de {1}.`,
    noNavigateAwayMessage:
      'Não saia desta página ou a importação será interrompida.',
    completed: {
      success:
        'Importação concluída. Todas as linhas foram importadas com sucesso.',
      someErrors:
        'O processamento foi concluído, mas algumas linhas não puderam ser importadas.',
      allErrors:
        'Importação falhou. Não há linhas válidas.',
    },
    form: {
      downloadTemplate: 'Baixe o modelo',
      hint: 'Clique ou arraste o arquivo para esta área para continuar.',
    },
    list: {
      discardConfirm:
        'Você tem certeza? Dados não importados serão perdidos.',
    },
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Verifique se você está usando a última versão do modelo.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  autocomplete: {
    loading: 'Carregando...',
    noOptions: 'Não foram encontrados resultados',
  },

  imagesViewer: {
    noImage: 'Sem imagem',
  },

  table: {
    noData: 'Nenhum Registro Encontrado',
    loading: 'Carregando...',
  },

  pagination: {
    items_per_page: '/ página',
    jump_to: 'Vá até',
    jump_to_confirm: 'confirme',
    page: '',

    prev_page: 'Página anterior',
    next_page: 'Próxima página',
    prev_5: '5 páginas anteriores',
    next_5: '5 próximas páginas',
    prev_3: '3 páginas anteriores',
    next_3: '3 próximas páginas',
  },
};

export default ptBR;
