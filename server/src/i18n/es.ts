/**
 * I18n dictionary for the es.
 */

const es = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Lo sentimos, no reconocemos tus credenciales`,
    wrongPassword: `Lo sentimos, no reconocemos tus credenciales`,
    depositExist: 'Los métodos de depósito ya están inicializados',
    weakPassword: 'Esta contraseña es demasiado débil',
    emailAlreadyInUse: 'El nombre de usuario ya está en uso',
    invitationCode: 'Por favor escribe un código de invitación correcto',
    invalidEmail: 'Por favor proporciona un email válido',
    passwordReset: {
      invalidToken:
        'El enlace de restablecimiento de contraseña no es válido o ha expirado',
      error: `Email no reconocido`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'El enlace de verificación de email no es válido o ha expirado.',
      error: `Email no reconocido.`,
      signedInAsWrongUser: `Esta confirmación de email fue enviada a {0} pero has iniciado sesión como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'La contraseña anterior no es válida',
    },
  },

  futures: {
    alreadyFinalized: 'Esta entrada de futuros ya está finalizada y no se puede cambiar.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Ya existe un usuario con este email.',
      userNotFound: 'Usuario no encontrado.',
      destroyingHimself: `No puedes eliminarte a ti mismo.`,
      revokingOwnPermission: `No puedes revocar tus propios permisos de administrador.`,
      revokingPlanUser: `No puedes revocar los permisos de administrador del gestor del plan.`,
      destroyingPlanUser: `No puedes eliminar al gestor del plan.`,
    },
  },

  tenant: {
    exists:
      'Ya existe un espacio de trabajo en esta aplicación.',
    url: {
      exists: 'Esta URL de espacio de trabajo ya está en uso.',
    },
    invitation: {
      notSameEmail: `Esta invitación fue enviada a {0} pero has iniciado sesión como {1}.`,
    },
    planActive: `Hay un plan activo para este espacio de trabajo. Por favor cancela el plan primero.`,
    stripeNotConfigured: 'Stripe no está configurado.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'El archivo está vacío',
      invalidFileExcel:
        'Solo se permiten archivos de Excel (.xlsx)',
      invalidFileUpload:
        'Archivo no válido. Asegúrate de estar usando la última versión de la plantilla.',
      importHashRequired: 'Se requiere hash de importación',
      importHashExistent: 'Los datos ya han sido importados',
    },
  },

  errors: {
    Invalidnonce: "Nonce inválido",
Invalidsignature: "Firma inválida",
frozenDuringExecution: "No se puede ejecutar {{operation}}. Su billetera perpetua de {{currency}} está actualmente congelada. Por favor contacte al servicio de atención al cliente.",
insufficientorfrozen: "Fondos insuficientes en la billetera después de la validación o la billetera está congelada",
notFounds: "Billetera de {{currency}} no encontrada. Por favor contacte al soporte.",
frozen: "Su billetera de {{currency}} está actualmente congelada. Por favor contacte al servicio de atención al cliente para descongelar su cuenta.",
frozenWithFunds: "Su billetera de {{currency}} está congelada. Tiene {{frozenAmount}} {{currency}} congelados y {{availableAmount}} {{currency}} disponibles. Por favor contacte al servicio de atención al cliente para descongelar su cuenta.",
insufficientBalance: "Saldo de {{currency}} insuficiente. Solicitado: {{requested}}, Disponible: {{available}}.",
insufficientWithFrozen: "Saldo disponible de {{currency}} insuficiente. Solicitado: {{requested}}, Disponible: {{available}}, Congelado: {{frozen}}, Total: {{total}}. Por favor contacte al soporte para descongelar sus fondos.",
walletNotFound: "Billetera no encontrada para este activo",
withdrawinsufficientBalance: "Saldo insuficiente para este retiro.",
futuresAlreadyFinalized: "Esta entrada de futuros ya está finalizada y no se puede cambiar.",
usdtWalletNotFound: "Billetera USDT no encontrada",
usdtWalletFrozen: "La billetera de trading USDT está congelada",
insufficientusdtWallet: "Saldo USDT insuficiente en la billetera de trading",
usdtWalletorfrozen: "Fondos insuficientes en la billetera después de la validación o la billetera está congelada",
usdtWalletNotFoundForUser: "Billetera USDT no encontrada para el usuario {{userId}}",
closingPriceExceedLimit: "El precio de cierre no puede exceder $100",
profitAmountInvalid: "El monto de ganancia es cero o inválido.",
amountConditions: 'El monto de futuros debe ser al menos 200 USDT',
lossAmountInvalid: "El monto de pérdida es cero o inválido.",
passwordNotMatching: "La contraseña no coincide",
insufficientBalanceUpgrade: "Saldo insuficiente. Por favor actualice.",
walletNotFoundForCurrency: "Billetera no encontrada para {{currency}}",
insufficientBalanceWithAmounts: "Saldo insuficiente. Tiene {{currentAmount}} {{currency}} pero intenta hacer staking de {{tryingAmount}} {{currency}}",
stakingPlanNotAvailable: "Este plan de staking aún no está disponible",
stakingPlanExpired: "Este plan de staking ha expirado",
invalidUserBalance: "Saldo inválido para el usuario actual",
invalidRequestAmount: "Monto de solicitud inválido",
unsupportedCurrency: "Moneda no soportada",
alreadySubscribedToVip: "Ya está suscrito a este vip",
insufficientBalancePleaseUpgrade: "Saldo insuficiente, por favor actualice",
resetAccountContactSupport: "Por favor reinicie su cuenta. Contacte al servicio de atención al cliente",
contactCustomerService: "Debe contactar al servicio de atención al cliente sobre esto",
pleaseWriteAmount: "Por favor escriba el monto",
withdrawalExceedsBalance: "Parece que su monto de retiro excede su saldo",
withdrawPasswordIncorrect: "Su contraseña de retiro no es correcta, por favor verifique nuevamente",
    notFound: {
      message: 'No encontrado',
    },
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
  },

  email: {
    error: `El proveedor de email no está configurado.`,
  },

  preview: {
    error:
      'Lo sentimos, esta operación no está permitida en modo de vista previa.',
  },

};

export default es;