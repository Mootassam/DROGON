
import Withdraw from "src/view/pages/withdraw/Withdraw";


const es = {

  common: {
timeout: "Tiempo de espera agotado",
requestAborted: "Solicitud cancelada",
fetchError: "Error al obtener datos del mercado",
dateNotAvailable: "Fecha no disponible",
currencyFormat: "${0}",
invalidDate: "Fecha inválida",
invalidTime: "Hora inválida",
unknown: "Desconocido",
na: "N/D",
back: "Atrás",
close: "Cerrar",

  },
  app: {
    title: "Nowspeed"
  },
  inputs: {
    username: "Nombre de usuario",
    password: "Contraseña",
    phoneNumber: "Número de teléfono",
    withdrawPassword: "Contraseña de retiro",
    confirmPassword: "Confirmar contraseña",
    invitationcode: "Código de invitación",
    walletaddress: "Dirección de billetera"
  },
  stake: {
    enterAmount: "Ingresa un monto",
    insufficientBalance: "Saldo insuficiente",
    minAmount: "Mín: {{min}}",
    maxAmount: "Máx: {{max}}",
    confirmStake: "Confirmar Stake"
  },


  components: {
    bottomNav: {
      home: "Inicio",
      market: "Mercado",
      trade: "Operar",
      futures: "Futuros",
      wallets: "Monederos"
    },
    coinListModal: {
      title: "Seleccionar Criptomoneda",
      loading: "Cargando datos de criptomonedas...",
      noResults: "No se encontraron criptomonedas",
      popular: "Populares",
      search: {
        placeholder: "Buscar criptomonedas..."
      }
    }
  },

  auth: {
signin: {
  title: "INICIAR SESIÓN",
  button: "Iniciar sesión",
  signingIn: "Iniciando sesión...",
  forgotPassword: "¿OLVIDÓ LA CONTRASEÑA?",
  signUp: "REGISTRARSE",
  orContinueWith: "o continuar con",
  downloadApp: "DESCARGAR NUESTRA APP",
  appDescription: "Obtén la mejor experiencia cripto en tu dispositivo móvil",
  googlePlay: "Google Play",
  signupNow: "Regístrate ahora",
  forgetPassword: "Olvidé la contraseña",
  orSeparator: "O",
  connectingWallet: "Conectando billetera...",
  loginWithWallet: "Iniciar sesión con billetera",
  walletNotDetected: "Billetera Web3 no detectada",
  installWalletMessage: "Instala MetaMask u otra billetera Web3 para usar esta función",
  walletSupport: "Soporta MetaMask, Coinbase Wallet, etc.",
  mailTab: "Correo",
  phoneTab: "Teléfono",
  backButton: "Atrás",
},
 fields: {
  mailbox: "Tu buzón",
  password: "Tu contraseña",
  emailPlaceholder: "Por favor, introduce tu correo electrónico",
  passwordPlaceholder: "Por favor, introduce tu contraseña",
},

wallet: {
  installRequired: "Por favor, instala MetaMask u otra billetera Web3",
  connectionRejected: "La conexión de la billetera fue rechazada",
  wrongNetwork: "Por favor, conéctate a la red correcta",
  connectionFailed: "No se pudo conectar la billetera",
  nonceError: "No se pudo obtener el nonce del servidor",
  verificationFailed: "La verificación falló",
},

common: {
  selectLanguage: "Seleccionar idioma",
  rememberPassword: "Recordar mi contraseña",
},

    tenants: "Espacios de Trabajo",
    singindesc: "Ingresa tu email y contraseña para iniciar sesión",
    signupdesc: "Ingresa tu email y contraseña para registrarte",
    profile: {
      title: "Perfil",
      success: "Perfil actualizado exitosamente",
      vip: "Felicitaciones por suscribirte",
      wallet: "Configuración de retiro completada.",
    },
    createAnAccount: "Crear una cuenta",
    rememberMe: "Recordarme",
    forgotPassword: "Olvidé mi contraseña",

    signup: "Registrarse",
    signout: "Cerrar Sesión",
    alreadyHaveAnAccount: "¿Ya tienes una cuenta? Inicia sesión.",
    social: {
      errors: {
        "auth-invalid-provider": "Este email ya está registrado con otro proveedor.",
        "auth-no-email": "El email asociado a esta cuenta es privado o inexistente.",
      },
    },
    signinWithAnotherAccount: "Iniciar sesión con otra cuenta",
    emailUnverified: {
      message: "Confirma tu email en <strong>{0}</strong> para continuar.",
      submit: "Reenviar verificación de email",
    },
    emptyPermissions: {
      message: "Aún no tienes permisos. Espera a que el administrador te conceda privilegios.",
    },
    passwordResetEmail: {
      message: "Enviar email de restablecimiento de contraseña",
      error: "Email no reconocido",
    },
    passwordReset: {
      message: "Restablecer contraseña",
    },
    passwordChange: {
      title: "Cambiar Contraseña",
      success: "Contraseña cambiada exitosamente",
      mustMatch: "Las contraseñas deben coincidir",
    },
    emailAddressVerificationEmail: {
      error: "Email no reconocido",
    },
    verificationEmailSuccess: "Email de verificación enviado exitosamente",
    passwordResetEmailSuccess: "Email de restablecimiento de contraseña enviado exitosamente",
    passwordResetSuccess: "Contraseña cambiada exitosamente",
    verifyEmail: {
      success: "Email verificado exitosamente.",
      message: "Un momento, tu email está siendo verificado...",
    },
  },

  user: {
    fields: {
      gender: "Género",
      captcha: "Captcha",
      username: "Nombre de Usuario",
      walletName: "Nombre del Monedero",
      id: "ID",
      confirmPassword: "Confirmar Contraseña",
      avatars: "Avatar",
      invitationcode: "Código de Invitación",
      email: "Email",
      emails: "Email(s)",
      erc20: "Dirección de monedero ERC20",
      trc20: "Dirección de monedero TRC20",
      fullName: "Nombre",
      balance: "Saldo",
      firstName: "Nombre",
      lastName: "Apellido",
      status: "Estado",
      phoneNumber: "Número de Teléfono",
      withdrawPassword: "Contraseña de Retiro",
      sector: "Sector",
      employer: "Empleador",
      profession: "Profesión",
      address: "Dirección",
      birthDate: "Fecha de Nacimiento",
      maritalStatus: "Estado Civil",
      facebookLink: "Enlace de Facebook",
      sponsor: "Patrocinador",
      role: "Rol",
      createdAt: "Creado el",
      updatedAt: "Actualizado el",
      roleUser: "Rol/Usuario",
      roles: "Roles",
      createdAtRange: "Creado el",
      password: "Contraseña",
      oldPassword: "Contraseña Anterior",
      newPassword: "Nueva Contraseña",
      newPasswordConfirmation: "Confirmar Nueva Contraseña",
      rememberMe: "Recordarme",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Industria alimentaria",
      ASSURANCES: "Seguros",
      AUDIOVISUEL: "Audiovisual",
      BANCAIRE: "Bancario",
      CHIMIE: "Química",
      COMPOSANTS_AUTOMOBILES: "Componentes automotrices",
      DISTRIBUTION: "Distribución",
      DISTRIBUTION_AUTOMOBILE: "Distribución automotriz",
      DIVERS: "Varios",
      FINANCIER: "Financiero",
      HOLDING: "Holding",
      IMMOBILIER: "Bienes Raíces",
      INDUSTRIEL: "Industrial",
      LEASING: "Arrendamiento",
      LOGISTIQUE_TRANSPORT: "Logística y Transporte",
      PHARMACEUTIQUE: "Farmacéutico",
      SANTÉ: "Salud",
      TOURSIME: "Turismo",
      INFORMATION_TECHNOLOGY: "Tecnología de la Información",
    },
    maritalStatus: {
      célébataire: "Soltero",
      marié: "Casado",
    },
    status: {
      active: "Activo",
      invited: "Invitado",
      "empty-permissions": "Esperando Permisos",
      inactive: "Inactivo",
    },

    enumerators: {
      status: {
        USD: "USD",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "Masculino",
        female: "Femenino",
      }
    },
    invite: "Invitar",
    validations: {
      email: "El email ${value} es inválido",
    },
    title: "Usuarios",
    menu: "Usuarios",
    doAddSuccess: "Usuario(s) guardado(s) exitosamente",
    doUpdateSuccess: "Usuario guardado exitosamente",
    exporterFileName: "exportacion_usuarios",
    doDestroySuccess: "Usuario eliminado exitosamente",
    doDestroyAllSelectedSuccess: "Usuarios eliminados exitosamente",
    edit: {
      title: "Editar Usuario",
    },
    new: {
      title: "Invitar Usuario(s)",
      titleModal: "Invitar Usuario",
      emailsHint: "Separa múltiples direcciones de email con coma.",
    },
    view: {
      title: "Ver Usuario",
      activity: "Actividad",
    },
    importer: {
      title: "Importar Usuarios",
      fileName: "plantilla_importacion_usuarios",
      hint: "Las columnas Archivos/Imágenes deben ser las URL de los archivos separados por espacio. Las relaciones deben ser los ID de los registros referenciados separados por espacio. Los roles deben ser los ids de rol separados por espacio.",
    },
    errors: {
      userAlreadyExists: "El usuario con este email ya existe",
      userNotFound: "Usuario no encontrado",
      revokingOwnPermission: "No puedes revocar tu propio permiso de administrador",
    },
  },




  pages: {
    helpCenter: {
      title: "Centro de Ayuda",
      faq: {
        aboutAccounts: "Sobre cuentas oficiales y cuentas demo",
        transactionVolume: "¿Qué es el volumen de transacciones?",
        transferFunds: "¿Por qué transferir fondos?",
        whatAreFutures: "¿Qué son los Futuros?",
        convertedAmountChanges: "¿Por qué cambia el monto convertido en los activos?",
        realNameAuthentication: "¿Por qué se requiere autenticación de nombre real?",
        frozenAssets: "¿Qué son los activos congelados?",
        futuresTradingRules: "¿Cuáles son las reglas del trading de futuros?"
      }
    },

    helpCenterDetail: {
      faqNotFound: "Elemento FAQ no encontrado, se necesita redirección",
      
      questions: {
        aiQuantification: "Introducción a la Cuantificación con IA",
        exploreNFTs: "Explora NFTs con AureX",
        bitcoinEnergy: "Elon Musk Dice que Bitcoin Se Basa en Energía, Lo Cual Es Imposible de Falsificar\n13/10/2025, 8:00:00 AM (UTC-8)",
        bitcoinRecordPrice: "Bitcoin Alcanza Precio Récord Por Encima de $125,000\n4/10/2025, 8:00:00 AM (UTC-8)",
        trumpStatueBitcoin: "Estatua gigante de Trump sosteniendo Bitcoin exhibida fuera del Capitolio de EE.UU. para marcar decisión de tasas de la Fed\n16/9/2025, 8:00:00 AM (UTC-8)"
      },
      
      answers: {
        aboutAccounts: "Las cuentas formales pueden usar todas las funciones en línea de la plataforma, mientras que las cuentas demo solo pueden usar algunas funciones de la plataforma de manera limitada, no pueden usar minería de liquidez para obtener ganancias y no pueden depositar y retirar monedas. (Las cuentas demo pueden recibir fondos virtuales fijos una vez el día 1 de cada mes)",
        transactionVolume: "Según las disposiciones relevantes de la Ley Antilavado de Dinero, cada transacción requiere control de precios, y se debe completar cierto volumen de transacciones antes de que se pueda retirar la moneda, para evitar que los usuarios laven dinero en el exchange. Por ejemplo, si deposita 10,000U, el monto de la transacción debe alcanzar la cantidad especificada relevante.",
        transferFunds: "Para garantizar la independencia de los fondos entre sus diversas cuentas y facilitar su control de riesgos razonable, las cuentas de los principales módulos de trading están divididas. La transferencia se refiere al proceso de convertir activos entre varias cuentas de trading.",
        whatAreFutures: "Los futuros, también conocidos como contratos de futuros, son una forma de trading que abarca tiempo. Compradores y vendedores firman un contrato para acordar entregar una cantidad especificada de bienes al contado en un tiempo, precio y otras condiciones de trading especificados. Los futuros generalmente se concentran en exchanges de futuros y se compran y venden con contratos estandarizados. Los activos negociados suelen ser productos básicos o instrumentos financieros. El precio predeterminado que ambas partes acuerdan para comprar y vender un activo se llama precio forward.",
        convertedAmountChanges: "El valor convertido en activos es el valor de la moneda digital actualmente mantenida en USD. Cambia debido a las fluctuaciones de precios de los activos digitales, pero la cantidad de sus activos digitales no cambia.",
        realNameAuthentication: "Por la seguridad de sus fondos, limitamos la asociación de su cuenta receptora con la información de nombre real de su cuenta actual.",
        frozenAssets: "Los activos congelados significan que cuando realiza transacciones u operaciones de retiro, el proceso no está completamente completado. Los activos actuales están temporalmente gestionados por el sistema y no pueden ser controlados libremente por usted. No significa que haya perdido el activo o que algo sea anormal con el activo. Por favor, quede tranquilo.",
        futuresTradingRules: "Participe en transacciones estimando la siguiente tendencia de precio (alcista o bajista) del par de trading actual. El rango del aumento o disminución no se calcula durante la liquidación, y solo se calcula el ingreso basado en el resultado del aumento o disminución. Los porcentajes de ganancia para la liquidación en diferentes tiempos de entrega son diferentes, y las ganancias se mostrarán con precisión en la interfaz de trading.",
        aiQuantification: "Un robot de trading cuantitativo con IA es un sistema de trading automatizado que combina inteligencia artificial (IA) con técnicas de trading cuantitativo. Su función principal es comprar y vender automáticamente productos financieros y criptomonedas basándose en datos de mercado y estrategias de trading específicas para lograr ganancias estables o controlar riesgos.",
        exploreNFTs: "Adéntrate en el mundo de los NFTs con AureX, tu billetera de trading de activos digitales todo en uno. Diseñada tanto para principiantes como para traders profesionales, AureX te permite explorar, comprar, vender y gestionar NFTs de alta calidad de manera segura y eficiente.\n\nCon seguridad avanzada, seguimiento en tiempo real y transacciones fluidas, AureX te mantiene en control total de tus coleccionables digitales. Desde piezas de arte exclusivas hasta activos digitales de edición limitada, descubre el futuro de la propiedad digital — todo en un solo lugar, con confianza y facilidad.",
        bitcoinEnergy: "El CEO de Tesla y SpaceX, Elon Musk, dijo el 14 de octubre en X que bitcoin se basa en energía, contrastándolo con las monedas fiduciarias que los gobiernos pueden inflar. Su comentario fue en respuesta a una publicación de Zerohedge que vinculaba el aumento en los precios del oro, la plata y bitcoin con la degradación monetaria impulsada por el gasto gubernamental en la carrera armamentista global de inteligencia artificial. Zerohedge agregó que el dinero se puede imprimir pero la energía no. Musk estuvo de acuerdo, escribiendo: 'Verdad. Es por eso que bitcoin se basa en energía: puedes emitir moneda fiduciaria falsa, y todos los gobiernos en la historia lo han hecho, pero es imposible falsificar energía.'\n\n¿Qué dijo Elon Musk sobre bitcoin y energía?\nElon Musk declaró que Bitcoin se basa en energía, enfatizando que mientras los gobiernos pueden imprimir moneda fiduciaria, la energía no se puede falsificar ni crear artificialmente.\n\n¿Por qué Elon Musk contrastó bitcoin con las monedas fiduciarias?\nMusk destacó que las monedas fiduciarias son propensas a la inflación porque los gobiernos pueden emitir más de ellas, mientras que la base de bitcoin en la energía le da una base de valor más tangible y limitada.\n\n¿Cuál fue el contexto del comentario de Musk sobre bitcoin?\nSu comentario respondió a una publicación de Zerohedge que sugería que los precios crecientes del oro, la plata y bitcoin están vinculados al gasto gubernamental global y la degradación monetaria causada por la carrera armamentista de IA.\n\n¿Cuál es la principal conclusión de la declaración de Musk?\nEl comentario de Musk refuerza la idea de que el valor de bitcoin está arraigado en el costo real de la energía, contrastándolo con la naturaleza fácilmente manipulable del dinero fiduciario tradicional.",
        bitcoinRecordPrice: "Bitcoin alcanzó un nuevo máximo.\n\nLa criptomoneda líder tocó un récord durante la noche, alcanzando máximos históricos alrededor de $125,400 para superar la antigua marca máxima de alrededor de $124,480, establecida en agosto. (Más recientemente se negociaba cerca de $123,000).\n\nLos últimos movimientos tienen el valor total de mercado de bitcoin en aproximadamente $2.45 billones, según CoinMarketCap, y el valor total de cripto en alrededor de $4.21 billones. Bitcoin ha tenido un año dramático, subiendo desde precios por debajo de $80,000 vistos en abril.\n\nSi bien los toros de bitcoin generalmente han visto el ascenso continuo de la moneda como inevitable, algunos han tenido razones más específicas para prever más alza a fines de 2025. Tiene un historial de establecer nuevos récords en la ventana de 1,064 días después de los mínimos del mercado bajista, el último de los cuales fue el 21 de noviembre de 2022.\n\nMientras tanto, los volúmenes de trading de bitcoin en los exchanges de cripto han estado aumentando desde una reducción a fines de septiembre. Los volúmenes crecientes tienden a ser buenos para los precios.\n\nAlgunos analistas ven razones para esperar que bitcoin siga subiendo. Los analistas de JPMorgan en una nota del 1 de octubre sugirieron que el 'trade de degradación' —en el que tanto inversionistas minoristas como institucionales cubren sus apuestas con oro y bitcoin— cobrará impulso en medio de preocupaciones que van desde una mayor incertidumbre geopolítica hasta una deuda gubernamental persistentemente alta en todas las economías y el dominio menguante del dólar estadounidense.\n\nEn términos más generales, los desarrollos recientes han sugerido que la industria cripto está avanzando continuamente mientras busca reclamar más dólares de inversionistas y posición en el mundo de las finanzas—entre ellos el lanzamiento de varios nuevos ETFs de cripto y el aumento en la popularidad de las acciones del tesoro de cripto.",
        trumpStatueBitcoin: "WASHINGTON (7News) — Una estatua dorada de 12 pies del presidente Donald Trump sosteniendo un Bitcoin fue instalada fuera del Capitolio de EE.UU., coincidiendo con la próxima decisión de tasas de interés de la Reserva Federal del miércoles.\n\nA las 2 p.m., la Fed anunció que redujo su tasa de interés clave en un cuarto de punto, marcando el primer recorte desde diciembre de 2024. El recorte reducirá la tasa a corto plazo a aproximadamente 4.1% desde 4.3%. El año pasado, el banco central redujo las tasas tres veces debido a preocupaciones de que el crecimiento del empleo se desaceleraba y el desempleo aumentaba.\n\nEl banco central también reveló planes para dos recortes más de tasas este año. Sin embargo, solo se anticipa uno en 2026, lo que podría decepcionar a Wall Street, ya que esperaban cinco recortes para el próximo año.\n\nLa pieza temporal, ubicada en la 3ra Calle de 9 a.m. a 4 p.m., fue financiada por un colectivo de inversionistas de criptomonedas. Los organizadores dijeron que la pieza está destinada a provocar debate sobre el futuro de la moneda digital, la política monetaria y el papel del gobierno federal en los mercados financieros."
      }
    },
    
    transfer: {
      title: "Historial de Transferencias",
      noTransferHistory: "No hay historial de transferencias disponible",
      accountTypes: {
        trade: "Cuenta de Trading",
        perpetual: "Cuenta Perpetual",
        exchange: "Cuenta de Exchange"
      },
      status: {
        completed: "Completado"
      }
    },
    
    settings: {
      title: "Configuraciones",
      language: "Idioma",
      quotationCurrency: "Moneda de cotización",
      colorConfiguration: "Configuración de colores",
      aboutUs: "Sobre nosotros",
      versionNumber: "Número de versión",
      selected: "Seleccionado",
      colorSchemes: {
        greenRiseRedFall: {
          name: "Verde sube, Rojo baja",
          alt: "Esquema de colores de gráfico Verde sube, Rojo baja",
          description: "Colores tradicionales de trading: verde para aumentos de precio, rojo para disminuciones de precio"
        },
        redRiseGreenFall: {
          name: "Rojo sube, Verde baja",
          alt: "Esquema de colores de gráfico Rojo sube, Verde baja",
          description: "Colores alternativos de trading: rojo para aumentos de precio, verde para disminuciones de precio"
        }
      },
      modals: {
        language: {
          title: "Seleccionar Idioma"
        },
        colorConfiguration: {
          title: "Configuración de Colores"
        }
      }
    },
    
    wallet: {
      myAssets: "Mis Activos",
      assetValuation: "Valuación de Activos",
      myAccount: "Mi Cuenta",
      showAmounts: "Mostrar montos",
      hideAmounts: "Ocultar montos",
      usdEquivalent: "≈ USD {0}",
      noAssetsFound: "No se encontraron activos",
      quickActions: {
        withdraw: "Retirar",
        deposit: "Depositar",
        transfer: "Transferir",
        swap: "Intercambiar"
      },
      accountTabs: {
        exchange: "Exchange",
        trade: "Trading",
        perpetual: "Perpetual"
      },
      assetLabels: {
        availableBalance: "Saldo disponible",
        frozenAmount: "Monto congelado",
        valuation: "Valuación"
      },
      errors: {
        fetchAssets: "Error al obtener activos:"
      }
    },
    
    loginPassword: {
      title: "Contraseña de Inicio de Sesión",
      cardTitle: "CAMBIAR CONTRASEÑA DE INICIO DE SESIÓN",
      fields: {
        oldPassword: "Contraseña Antigua",
        newPassword: "Nueva Contraseña",
        newPasswordConfirmation: "Confirmar Contraseña",
        mailbox: "Su buzón de correo"
      },
      placeholders: {
        oldPassword: "Ingrese su contraseña actual",
        newPassword: "Cree una nueva contraseña",
        confirmPassword: "Confirme su nueva contraseña"
      },
      buttons: {
        saveChanges: "GUARDAR CAMBIOS"
      },
      warningMessage: "Por la seguridad de sus fondos, los retiros no están permitidos dentro de las 24 horas posteriores al cambio de la contraseña de inicio de sesión.",
      validation: {
        mustMatch: "Las contraseñas deben coincidir"
      }
    },
    
    futures: {
      title: "Futuros",
      actions: {
        buyUp: "COMPRAR AL ALZA",
        buyDown: "COMPRAR A LA BAJA"
      },
      tabs: {
        openOrders: "Órdenes Abiertas",
        recentOrders: "Órdenes Recientes"
      },
      orderDetails: {
        title: "Detalles de la Orden",
        open: "Abierta",
        closed: "Cerrada",
        completed: "Completada",
        futuresAmount: "Monto de Futuros:",
        contractDuration: "Duración del Contrato:",
        seconds: "Segundos",
        futuresStatus: "Estado de Futuros:",
        openPositionPrice: "Precio de Apertura de Posición:",
        openPositionTime: "Hora de Apertura de Posición:",
        closePositionPrice: "Precio de Cierre de Posición:",
        closePositionTime: "Hora de Cierre de Posición:",
        profitLossAmount: "Monto de Ganancia y Pérdida:",
        leverage: "Apalancamiento:",
        done: "Hecho"
      },
      status: {
        open: "Abierta",
        closed: "Cerrada",
        completed: "Completada"
      },
      list: {
        noOrders: "Sin órdenes"
      }
    },
    
    proof: {
      title: "Verificación de Identidad",
      instructions: "Verifique su identidad para acceder a todas las funciones de su Icmarkets",
      sections: {
        documentInfo: "Información del Documento",
        documentUpload: "Carga de Documento"
      },
      fields: {
        documentType: "Tipo de Documento",
        fullName: "Nombre Completo",
        documentNumber: "Número de Documento",
        address: "Dirección",
        frontSide: "Frente del Documento",
        backSide: "Reverso del Documento",
        selfie: "Selfie con Documento"
      },
      placeholders: {
        fullName: "Ingrese su nombre completo",
        documentNumber: "Ingrese su número de documento",
        address: "Ingrese su dirección completa"
      },
      uploadTexts: {
        frontSide: "Cargue el frente de su documento",
        backSide: "Cargue el reverso de su documento",
        selfie: "Cargue una selfie sosteniendo su documento"
      },
      documentTypes: {
        passport: "Pasaporte",
        idCard: "Cédula de Identidad",
        driversLicense: "Licencia de Conducir"
      },
      security: {
        title: "Aviso de Seguridad",
        text: "Su información está encriptada y segura. Usamos protección de nivel bancario y verificamos manualmente cada documento por su seguridad."
      },
      buttons: {
        validateDocuments: "Validar Documentos"
      },
      footer: {
        copyright: "© 2025 CryptoWallet. Todos los derechos reservados.",
        privacyPolicy: "Política de Privacidad"
      }
    },
    
    withdrawPassword: {
      title: "Contraseña de Retiro",
      cardTitle: "CAMBIAR CONTRASEÑA DE RETIRO",
      fields: {
        currentPassword: "Contraseña Actual",
        newPassword: "Nueva Contraseña"
      },
      placeholders: {
        currentPassword: "Ingrese su contraseña antigua",
        newPassword: "Confirme su nueva contraseña"
      },
      buttons: {
        saveChanges: "GUARDAR CAMBIOS"
      },
      warningMessage: "Por la seguridad de sus fondos, los retiros no están permitidos dentro de las 24 horas posteriores al cambio de la contraseña de inicio de sesión."
    },
    
    marketDetail: {
      stats: {
        high: "Máximo 24h",
        low: "Mínimo 24h",
        volume: "Volumen 24h"
      },
      volume: {
        billion: "Mil millones",
        million: "Millones"
      },
      actions: {
        buy: "COMPRAR",
        sell: "VENDER"
      },
      recentTrades: {
        title: "Transacciones Recientes (En Vivo)",
        price: "Precio (USD)",
        amount: "Cantidad",
        time: "Hora"
      },
      tabs: {
        orderBook: "Libro de Órdenes",
        transactions: "Última transacción"
      },
      orderBook: {
        buy: "Comprar",
        sell: "Vender",
        quantity: "Cantidad",
        price: "Precio (USD)"
      },
      coinSelector: {
        title: "Seleccionar Par de Trading"
      },
      setupWebsockets: "Configurando WebSockets para:",
      websocketConnected: "WebSocket conectado para:",
      websocketParseError: "Error al analizar datos de WebSocket:",
      websocketError: "Error de WebSocket para",
      websocketClosed: "WebSocket cerrado para:",
      websocketCloseError: "Error al cerrar WebSocket:",
      websocketCreateError: "Error al crear WebSocket:",
      code: "Código:",
      reconnecting: "Reconectando WebSocket para:",
      cleaningUp: "Limpiando WebSockets para:",
      initialDataLoaded: "Datos iniciales cargados para:",
      fetchError: "Error al obtener datos iniciales para",
      selectingCoin: "Seleccionando nueva moneda:"
    },
    
    passwordType: {
      title: "Tipo de Contraseña",
      cardTitle: "SELECCIONAR TIPO DE CONTRASEÑA",
      options: {
        login: {
          title: "Contraseña de Inicio de Sesión",
          description: "Cambie la contraseña de inicio de sesión de su cuenta"
        },
        withdrawal: {
          title: "Contraseña de Retiro",
          description: "Cambie su contraseña de retiro de criptomonedas"
        }
      }
    },
    
    profile: {
      title: "Centro Personal",
      user: "Usuario",
      userInitial: "U",
      userId: "ID",
      status: {
        verified: "Verificado",
        unverified: "No Verificado"
      },
      verification: {
        kycStatus: "Estado KYC:",
        redirecting: "Redirigiendo a página de verificación...",
        pendingReview: "La verificación está pendiente de revisión...",
        pendingAlert: "Su verificación está pendiente de revisión. Por favor, espere la aprobación.",
        alreadyVerified: "El usuario ya está verificado",
        pending: {
          title: "Verificación Pendiente",
          description: "La verificación de su cuenta está en progreso. Esto generalmente toma 1-3 días hábiles.",
          status: "Revisión Pendiente",
          button: "Pendiente"
        },
        alert: {
          title: "Cuenta No Verificada",
          description: "Verifique su cuenta para desbloquear todas las funciones y límites más altos",
          verifyNow: "Verificar Ahora"
        }
      },
      accountInfo: {
        title: "INFORMACIÓN DE LA CUENTA",
        email: "Correo Electrónico",
        creditScore: "Puntuación de Crédito",
        invitationCode: "Código de Invitación"
      },
      pendingVerifications: {
        title: "VERIFICACIONES PENDIENTES",
        identity: {
          title: "Verificación de Identidad",
          description: "Envíe su identificación gubernamental"
        },
        address: {
          title: "Verificación de Domicilio",
          description: "Verifique su residencia"
        },
        status: {
          pending: "Pendiente"
        }
      },
      approvedVerifications: {
        title: "VERIFICACIONES APROBADAS",
        identity: {
          title: "Verificación de Identidad"
        },
        address: {
          title: "Verificación de Domicilio"
        },
        status: {
          completed: "Completado"
        }
      },
      limitations: {
        title: "Limitaciones de la Cuenta",
        withdrawalLimit: "Límite de retiro: $1,000 por día",
        stakingLimited: "Opciones de staking limitadas",
        advancedTrading: "Funciones avanzadas de trading deshabilitadas",
        fiatDeposits: "Depósitos en moneda fiduciaria no disponibles"
      },
      menu: {
        withdrawalAddress: "Registros de cambio de cuenta",
        password: "Centro de seguridad",
        notifications: "Notificaciones",
        myInvitation: "Mi Invitación",
        language: "Idioma",
        helpcenter: "Centro de Ayuda",
        privacyPortal: "Portal de Privacidad",
        aboutUs: "Introducción a la plataforma",
        msbApproval: "Aprobación MSB",
        customerSupport: "Servicio en línea",
        downloadApp: "Descargar",
        logout: "Cerrar Sesión",
        preferences: "Preferencias",
        clearCache: "Limpiar caché"
      },
      cache: {
        clearing: "Limpiando caché...",
        cleared: "¡Caché limpiado exitosamente!"
      },
      simulatedTrading: {
        toggle: "Trading simulado {0}"
      }
    },
    
    trade: {
      coinSelector: {
        title: "Seleccionar Par de Trading"
      },
      title: "SPOT",
      buy: "COMPRAR",
      sell: "VENDER",
      long: "COMPRAR AL ALZA",
      short: "COMPRAR A LA BAJA",
      limit: "LÍMITE",
      market: "MERCADO",
      orderType: "Tipo de Orden",
      price: "Precio (USD)",
      amount: "Cantidad",
      available: "Disponible",
      placing: "Colocando...",
      increasePrice: "aumentar precio",
      decreasePrice: "disminuir precio",
      tradingPeriod: "Período de Trading",
      leverage: "Apalancamiento",
      tradingMode: {
        trade: "Trading",
        perpetual: "Perpetual"
      },
      tabs: {
        positions: "Posiciones",
        historyOrders: "Historial de órdenes",
        transactionHistory: "Historial de transacciones"
      },
      orderDetails: {
        status: "Estado",
        price: "Precio",
        amount: "Cantidad",
        total: "Total"
      },
      futuresDetails: {
        amount: "Cantidad",
        duration: "Duración",
        entryPrice: "Precio de Entrada",
        exitPrice: "Precio de Salida",
        pnl: "Ganancia/Pérdida",
        opened: "Abierta",
        closed: "Cerrada"
      },
      futuresStatus: {
        long: "Al Alza",
        short: "A la Baja",
        closed: "Cerrada",
        liquidated: "Liquidada"
      },
      cancel: "Cancelar",
      errors: {
        invalidQuantity: "Por favor ingrese una cantidad válida.",
        invalidPrice: "Por favor ingrese un precio válido.",
        invalidAmount: "Por favor ingrese un monto válido.",
        insufficientUSD: "Saldo USD insuficiente. Disponible: {0} USD",
        insufficientCoin: "Saldo {1} insuficiente. Disponible: {0} {1}",
        failedOrder: "Error al colocar la orden. Por favor intente nuevamente.",
        createError: "Error al crear trade",
        placeOrderError: "Error al colocar orden"
      },
      orderBook: {
        price: "Precio (USD)",
        amount: "Cantidad"
      },
      noData: "No se encontró {0}",
      noTransactionsText: "Sus transacciones aparecerán aquí",
      noOrdersText: "Sus {0} aparecerán aquí",
      websocketConnected: "WebSocket conectado:",
      websocketParseError: "Error al analizar datos de WebSocket:",
      websocketError: "Error de WebSocket:",
      websocketClosed: "WebSocket cerrado",
      websocketCreateError: "Error al crear WebSocket:",
      orderNumberFormat: "ORD-{0}-{1}"
    },
    
    market: {
      title: "MERCADO USD",
      noResults: "No se encontraron criptomonedas",
      volume: "Vol",
      search: {
        placeholder: "Buscar cripto...",
        clear: "Limpiar búsqueda"
      },
      tableHeaders: {
        pair: "Par de Trading",
        latestPrice: "Último Precio",
        change24h: "Cambio 24H"
      },
      websocketConnected: "WebSocket del Mercado conectado",
      websocketParseError: "Error al analizar datos de WebSocket",
      websocketError: "Error de WebSocket del Mercado",
      websocketClosed: "WebSocket del Mercado cerrado, código:",
      websocketSetupError: "Error al configurar WebSocket"
    },
    
    signup: {
      title: "REGISTRARSE",
      creatingAccount: "CREANDO...",
      createAccount: "CREAR CUENTA",
      refresh: "Actualizar",
      captchaMismatch: "El captcha no coincide",
      alreadyHaveAccount: "¿Ya tienes una cuenta? Inicia sesión",
      terms: {
        text: "Al crear una cuenta, aceptas nuestros",
        link: "Términos de Servicio"
      },
      labels: {
        email: "Correo Electrónico",
        phoneNumber: "Número de Teléfono",
        captcha: "Captcha Gráfico",
        password: "Contraseña",
        confirmPassword: "Confirmar Contraseña",
        withdrawPassword: "Contraseña de Retiro",
        invitationCode: "Código de Invitación"
      },
      placeholders: {
        email: "Ingrese su correo electrónico",
        phoneNumber: "Ingrese su número de teléfono",
        captcha: "Ingrese el código",
        password: "Cree una contraseña",
        confirmPassword: "Confirme su contraseña",
        withdrawPassword: "Ingrese la contraseña de retiro",
        invitationCode: "Ingrese el código de invitación"
      }
    },
    
    home: {
      logoAlt: "Logo Icmarkets",
      headerAlt: "Plataforma de Trading de Criptomonedas",
      slogan: "Gana con Confianza",
      promoAlt: "Banner promocional {0}",
      quickTrade: {
        highlight: "Rápido",
        title: "Trading",
        subtitle: "Transacciones rápidas y operación simple"
      },
      aiTrading: {
        title: "Trading Inteligente con IA",
        description: "Un robot de trading cuantitativo con IA es un sistema de trading automatizado que combina inteligencia artificial (IA) con técnicas de trading cuantitativo. Su función principal es comprar y vender automáticamente productos financieros y criptomonedas basándose en datos de mercado y estrategias de trading específicas para lograr ganancias estables o controlar riesgos."
      },
      nftExploration: {
        title: "Explora NFTs con Icmarkets",
        description: "Adéntrate en el mundo de los NFTs con Icmarkets, tu billetera de trading de activos digitales todo en uno. Diseñada tanto para principiantes como para traders profesionales, Icmarkets te permite explorar, comprar, vender y"
      },
      stats: {
        title: "Nuestro Impacto",
        users: "30M+",
        usersLabel: "Número de usuarios",
        organizations: "6000+",
        organizationsLabel: "Organización cooperante",
        liquidity: "7.8B+",
        liquidityLabel: "Liquidez",
        orders: "89M",
        ordersLabel: "Órdenes procesadas por segundo"
      },
      services: {
        title: "Nuestros Servicios",
        subtitle: "Te proporcionamos servicios especializados de atención al cliente manual 24 horas para proteger tus transacciones",
        highInterest: {
          title: "Tasa de interés alta",
          desc: "Finanzas, alta tasa de retorno",
          alt: "Icono de tasa de interés alta"
        },
        liquidityMining: {
          title: "Minería de liquidez",
          desc: "La liquidez genera ganancias fáciles",
          alt: "Icono de minería de liquidez"
        },
        service24h: {
          title: "Servicio 24 horas",
          desc: "Listo para responder todas tus preguntas",
          alt: "Icono de servicio 24 horas"
        },
        highContract: {
          title: "Contrato alto",
          desc: "Pequeño capital, alto apalancamiento, enriquecerse fácilmente",
          alt: "Icono de contrato alto"
        },
        expertTeam: {
          title: "Equipo experto",
          desc: "Equipo técnico experto a su servicio",
          alt: "Icono de equipo experto"
        },
        securityProtection: {
          title: "Protección de seguridad",
          desc: "Potentes datos en la nube protegen su seguridad",
          alt: "Icono de protección de seguridad"
        }
      },
      demo: {
        fastSwap: {
          title: "Intercambio rápido - Intercambia tus monedas sin preocupaciones",
          subtitle: "Desde Bitcoin hasta Dogecoin, hacemos que comprar y vender cripto sea fácil. Protege tu cripto con el mejor almacenamiento en frío.",
          alt: "Demo de intercambio rápido"
        },
        advancedTraders: {
          title: "Para traders avanzados - Herramientas poderosas para diseño",
          subtitle: "Herramientas analíticas poderosas combinadas con nuestra garantía de seguridad proporcionan la experiencia de trading definitiva. Aprovecha capacidades sofisticadas de gráficos, libros de órdenes en tiempo real y liquidez profunda en cientos de mercados.",
          alt: "Demo para traders avanzados"
        },
        walletManagement: {
          title: "Gestión inteligente de billetera de activos - Crecimiento constante en ingresos",
          subtitle: "Herramientas analíticas poderosas combinadas con nuestra garantía de seguridad proporcionan la experiencia de trading definitiva. Aprovecha capacidades sofisticadas de gráficos, libros de órdenes en tiempo real y liquidez profunda en cientos de mercados.",
          alt: "Demo de gestión de billetera"
        },
        liquidityMining: {
          title: "Minería de liquidez, cuantificación con IA",
          subtitle: "Más formas de gestionar tus activos, incluyendo minería de liquidez y cuantificación con IA, te dan más opciones para gestionar tus activos y mantener tus activos creciendo",
          alt: "Demo de minería de liquidez"
        },
        startTrading: {
          title: "¿Comenzar a operar con criptomonedas? - Abre tu criptomoneda ahora",
          subtitle: "Opera en cualquier momento y lugar para satisfacer las necesidades de trading de varios escenarios en cualquier momento",
          alt: "Demo de inicio de trading"
        }
      },
      news: {
        title: "Noticias del círculo",
        elonMusk: {
          date: "14-10-2025",
          title: "Elon Musk Dice que Bitcoin Se Basa en Energía, Lo Cual Es Imposible de Falsificar",
          alt: "Noticias de Elon Musk Bitcoin"
        },
        bitcoinRecord: {
          date: "05-10-2025",
          title: "Bitcoin Alcanza Precio Récord Por Encima de $125,000",
          alt: "Noticias de precio récord de Bitcoin"
        },
        trumpStatue: {
          date: "17-09-2025",
          title: "Estatua gigante de Trump sosteniendo Bitcoin exhibida fuera del Capitolio de EE.UU. para marcar decisión de tasas de la Fed",
          alt: "Noticias de estatua de Trump Bitcoin"
        }
      },
      partners: {
        title: "Socio Ecológico Mundial",
        description: "Crear consenso y crear un nuevo futuro para el ecosistema cripto",
        binance: "Binance",
        coinbase: "Coinbase",
        kraken: "Kraken",
        ftx: "FTX",
        bitfinex: "Bitfinex",
        huobi: "Huobi"
      },
      announcements: {
        maintenanceNotice: "Aviso de mantenimiento",
        contractServerUpgrade: "Actualización del servidor de contratos y anuncio de mantenimiento el 15 de enero de 2023",
        IcmarketsOptionsMaintenance: "Anuncio de mantenimiento del sistema de trading de opciones de Icmarkets",
        clientVersionUpgrade: "¡Importante! Anuncio de Icmarkets sobre la última actualización de versión del cliente",
        platformTradingAnnouncement: "Último anuncio de trading de la plataforma Icmarkets",
        platformUpgradeOptimization: "Anuncio de actualización de optimización de versión de la plataforma Icmarkets",
        march15Upgrade: "15 de marzo de 2023 Anuncio de optimización de mantenimiento de actualización del servidor de contratos de la plataforma Icmarkets",
        optionsTradingMaintenance: "Anuncio de mantenimiento y optimización del sistema de trading de opciones de la plataforma Icmarkets",
        latestVersionUpgrade: "Anuncio importante de la plataforma Icmarkets sobre la actualización y optimización de la última versión del cliente",
        userSecurityReminder: "Recordatorio sobre la seguridad de la información del usuario de Icmarkets",
        perpetualContractUpgrade: "Anuncio de la plataforma Icmarkets sobre la optimización y actualización del sistema de contratos perpetuos",
        maintenanceCompletion: "Anuncio sobre la finalización del mantenimiento y optimización del sistema de la plataforma",
        bitcoinWithdrawal: "Anuncio sobre retiro de Bitcoin",
        tradingPairsUpgrade: "Anuncio sobre la actualización de algunos pares de monedas de trading en la plataforma",
        ethWalletMaintenance: "Anuncio sobre el mantenimiento de la billetera de la red Ethereum (ERC20) de la plataforma",
        ethHardFork: "Anuncio sobre la finalización de la actualización del hard fork de ETH",
        identityAuthUpdate: "Anuncio sobre la actualización del servicio avanzado de autenticación de identidad de la plataforma",
        filIncomeIssuance: "Aviso sobre la emisión de ingresos de poder computacional de FIL",
        apiOrderLimit: "Anuncio sobre la optimización del límite de frecuencia de órdenes API",
        customerChatFunction: "Actualización del sistema - Función de chat con el cliente en tiempo real",
        ethNetworkUpgrade: "Anuncio de actualización de la red ETH",
        delistingCurrencies: "Anuncio de eliminación de monedas",
        dotUSDLaunch: "Anuncio de lanzamiento de trading DOT/USD",
        decUSDLaunch: "Anuncio de lanzamiento de trading DEC/USD",
        USDIntroduction: "Introducción a USD",
        ethereumNetworkMaintenance: "Aviso de mantenimiento de la red Ethereum",
        projectReviewStandards: "Estándares de revisión de proyectos de Icmarkets",
        liquidityMiningUpgrade: "Actualización de minería de liquidez",
        liquidityMiningFee: "Ajuste de tarifas de minería de liquidez",
        delistingTradingPairs: "Eliminación de pares de trading",
        systemTemporaryMaintenance: "Anuncio de mantenimiento temporal del sistema",
        temporaryRechargeSuspension: "Aviso de suspensión temporal de recarga",
        delistingNotification: "Notificación de eliminación",
        serverUpgrade: "Anuncio de actualización del servidor",
        serverNetworkUpgrade: "Anuncio de actualización de red del servidor",
        appDownloadOpen: "Notificación de apertura de descarga de APP"
      }
    },
    
    withdrawAddressForm: {
      title: "Dirección de Retiro",
      currencyType: "TIPO DE MONEDA",
      withdrawalAddress: "DIRECCIÓN DE RETIRO",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      },
      fields: {
        address: "Dirección",
        password: "Contraseña de Retiro de Criptomonedas"
      },
      placeholders: {
        address: "Ingrese la dirección de su billetera",
        password: "Ingrese su contraseña actual"
      },
      buttons: {
        save: "GUARDAR"
      },
      notification: {
        success: "¡Dirección guardada exitosamente!"
      }
    },
    
    withdrawAddress: {
      title: "Dirección de Retiro",
      cardTitle: "TIPO DE MONEDA",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      }
    },
    
    privacy: {
      title: "Portal de Privacidad",
      hero: {
        title: "Portal de Privacidad Icmarkets",
        subtitle: "Protegiendo sus datos y privacidad con pautas estrictas, cumplimiento legal y mejores prácticas de la industria."
      },
      principles: {
        title: "Nuestros Principios de Privacidad",
        corePrinciples: "Principios Fundamentales",
        transparency: {
          title: "Transparencia",
          description: "Actualizaciones periódicas e información clara sobre cómo manejamos sus datos."
        },
        accountability: {
          title: "Responsabilidad y Cumplimiento",
          description: "Auditorías periódicas, certificaciones y adherencia a leyes globales de privacidad."
        },
        dataSecurity: {
          title: "Seguridad de Datos",
          description: "Cifrado avanzado, controles de acceso estrictos y protocolos de verificación de identidad."
        },
        dataMinimization: {
          title: "Minimización de Datos y Limitación de Propósito",
          description: "Recopilamos solo lo necesario para fines específicos y legítimos."
        },
        privacyByDesign: {
          title: "Privacidad por Diseño",
          description: "La privacidad está integrada en todos nuestros productos y servicios desde el principio."
        }
      },
      userRights: {
        title: "Sus Derechos de Privacidad",
        content: "Tiene herramientas para acceder y gestionar sus datos a través de nuestra aplicación o formulario web, con información detallada disponible en nuestro Aviso de Privacidad.",
        note: "Ejercite sus derechos para acceder, corregir o eliminar su información personal en cualquier momento."
      },
      personalData: {
        title: "¿Qué son los Datos Personales?",
        definition: "Los datos personales se refieren a cualquier información que identifique a un individuo.",
        examples: "Ejemplos incluyen: nombre, ID Icmarkets, dirección de correo electrónico, datos de ubicación, historial de transacciones e información del dispositivo."
      },
      dataUsage: {
        title: "Cómo Usamos Sus Datos",
        accountManagement: {
          title: "Gestión de Cuentas",
          description: "Para crear y mantener su cuenta, proporcionar servicios y comunicarnos con usted."
        },
        legalCompliance: {
          title: "Cumplimiento Legal",
          description: "Para cumplir con nuestras obligaciones bajo leyes aplicables, incluyendo regulaciones contra el lavado de dinero (AML)."
        },
        securityFraud: {
          title: "Seguridad y Prevención de Fraude",
          description: "Para proteger su cuenta, detectar y prevenir fraudes, y garantizar la seguridad de la plataforma."
        },
        customerSupport: {
          title: "Soporte al Cliente",
          description: "Para responder a sus consultas y proporcionar asistencia técnica cuando sea necesario."
        },
        marketing: {
          title: "Marketing y Comunicaciones",
          description: "Para enviarle actualizaciones relevantes, información de productos y materiales promocionales (con su consentimiento)."
        },
        transactionProcessing: {
          title: "Procesamiento de Transacciones",
          description: "Para facilitar transacciones de criptomonedas y mantener registros de transacciones."
        }
      },
      dataRetention: {
        title: "Retención de Datos",
        content: "Retenemos sus datos durante el tiempo necesario para proporcionar nuestros servicios, cumplir con obligaciones legales (como requisitos fiscales y AML), resolver disputas y hacer cumplir nuestros acuerdos."
      },
      dataSharing: {
        title: "Compartir Datos",
        content: "Podemos compartir sus datos con otras entidades de Icmarkets o terceros confiables bajo estrictas salvaguardas contractuales, solo cuando sea necesario para los fines descritos en nuestro Aviso de Privacidad."
      },
      cookies: {
        title: "Cookies y Seguimiento",
        content: "Utilizamos cookies y tecnologías similares para mejorar su experiencia de usuario, proporcionar marketing personalizado y analizar cómo se utilizan nuestros servicios.",
        link: "Ver nuestra política completa de cookies"
      },
      actionCards: {
        privacyNotice: {
          title: "Aviso de Privacidad",
          description: "Lea nuestra política de privacidad completa"
        },
        manageData: {
          title: "Gestionar Datos",
          description: "Acceda y controle su información"
        },
        cookieSettings: {
          title: "Configuración de Cookies",
          description: "Ajuste sus preferencias de seguimiento"
        },
        helpCenter: {
          title: "Centro de Ayuda",
          description: "Obtenga respuestas a preguntas sobre privacidad"
        }
      },
      notification: "¡Acción completada exitosamente!"
    },
    
    termsOfUse: {
      title: "Términos de Uso",
      hero: {
        title: "Términos de Uso Icmarkets"
      },
      agreement: {
        title: "Acuerdo",
        content: "Este es un acuerdo vinculante entre usted (el usuario) y Icmarkets. Cubre todos los Servicios Icmarkets a los que accede o utiliza."
      },
      riskWarning: {
        title: "Advertencia de Riesgo",
        content: "Los activos digitales son volátiles y pueden fluctuar significativamente en valor. Icmarkets no es un corredor, asesor financiero o asesor de inversiones. Debe realizar su propia debida diligencia antes de tomar cualquier decisión financiera."
      },
      aboutServices: {
        title: "Acerca de Nuestros Servicios",
        aboutIcmarkets: {
          title: "Acerca de Icmarkets",
          content: "Icmarkets proporciona intercambio de activos digitales, servicios de custodia y servicios financieros relacionados a través de nuestra plataforma."
        },
        eligibility: {
          title: "Elegibilidad",
          content: "Debe tener al menos 18 años, ser legalmente capaz de celebrar contratos, no estar restringido de usar nuestros servicios y no estar ubicado en jurisdicciones prohibidas."
        },
        communication: {
          title: "Comunicación",
          content: "Debe mantener su información de contacto actualizada. Icmarkets lo contactará por correo electrónico, SMS o teléfono con respecto a su cuenta y nuestros servicios."
        }
      },
      services: {
        title: "Nuestros Servicios",
        servicesProvided: {
          title: "Servicios Proporcionados",
          content: "Icmarkets ofrece trading de activos digitales, soluciones de custodia segura y soporte al cliente a través de bots automatizados y representantes humanos. También está disponible la funcionalidad de chat de usuario."
        },
        fees: {
          title: "Tarifas",
          content: "Todas las tarifas aplicables se enumeran en nuestra página de Estructura de Tarifas y están sujetas a actualizaciones. Es responsable de revisar el programa de tarifas actual antes de realizar transacciones."
        }
      },
      accountManagement: {
        title: "Gestión de Cuentas",
        accountCreation: {
          title: "Creación de Cuenta",
          content: "Debe abrir una cuenta (individual o corporativa) para acceder a nuestros servicios. Esto requiere completar procedimientos de verificación de identidad (KYC/AML) según lo exija la ley."
        },
        identityVerification: {
          title: "Verificación de Identidad",
          content: "Debe completar nuestros procesos de verificación Conozca a Su Cliente (KYC) y Contra el Lavado de Dinero (AML) antes de usar ciertos servicios."
        },
        accountRecords: {
          title: "Registros de Cuenta",
          content: "Puede mantener registros y crear subcuentas bajo condiciones específicas descritas en nuestras políticas de gestión de cuentas."
        }
      },
      transactions: {
        title: "Transacciones",
        sufficientBalance: {
          title: "Saldo Suficiente",
          content: "Debe mantener saldo suficiente en su cuenta para cualquier transacción que inicie. Las transacciones pueden fallar o incurrir en tarifas adicionales si no hay fondos suficientes disponibles."
        },
        transactionCancellation: {
          title: "Cancelación de Transacción",
          content: "Icmarkets se reserva el derecho de cancelar o modificar transacciones en casos de sospecha de fraude, errores o violaciones de estos Términos."
        },
        unauthorizedTransactions: {
          title: "Transacciones No Autorizadas",
          content: "Es responsable de cualquier transacción no autorizada a menos que pueda probar lo contrario a través de nuestro proceso de resolución de disputas."
        }
      },
      digitalAssets: {
        title: "Activos Digitales",
        supportedAssets: {
          title: "Activos Soportados",
          content: "Solo puede transaccionar con activos digitales explícitamente soportados por Icmarkets. Intentar depositar activos no soportados puede resultar en pérdida permanente."
        },
        forksAirdrops: {
          title: "Forks y Airdrops",
          content: "Icmarkets no garantiza soporte para forks de blockchain, airdrops u otros eventos similares. Las decisiones de soporte se toman a nuestra sola discreción."
        }
      },
      accountSecurity: {
        title: "Seguridad de la Cuenta",
        securityRequirements: {
          title: "Requisitos de Seguridad",
          content: "Debe usar una contraseña fuerte, habilitar la autenticación multifactor (MFA), nunca compartir credenciales, monitorear la actividad de la cuenta regularmente e informar inmediatamente cualquier violación de seguridad."
        }
      },
      privacy: {
        title: "Privacidad",
        content: "Su privacidad se rige por el Aviso de Privacidad de Icmarkets, que explica cómo recopilamos, usamos y protegemos su información personal."
      },
      termination: {
        title: "Terminación de Cuenta",
        terminationSuspension: {
          title: "Terminación/Suspensión",
          content: "Icmarkets puede restringir, suspender o terminar cuentas por fraude, violaciones de la ley, actividad sospechosa o violaciones de estos Términos. Los usuarios pueden cerrar cuentas a menos que estén congeladas o inactivas."
        }
      },
      prohibitedUse: {
        title: "Uso Prohibido",
        content: "No puede usar los servicios Icmarkets para fraude, manipulación del mercado, actividades ilegales, acceso no autorizado o cualquier propósito que viole las leyes aplicables o estos Términos."
      },
      liability: {
        title: "Responsabilidad y Propiedad Intelectual",
        liability: {
          title: "Responsabilidad",
          content: "Icmarkets no es responsable de pérdidas excepto en casos de negligencia grave probada o fraude. No somos responsables por fluctuaciones del mercado, problemas técnicos o acciones de terceros."
        },
        intellectualProperty: {
          title: "Propiedad Intelectual",
          content: "Icmarkets conserva todos los derechos de propiedad intelectual sobre nuestra plataforma, tecnología y marca. Los usuarios reciben una licencia limitada para usar nuestros servicios según lo descrito en estos Términos."
        },
        indemnity: {
          title: "Indemnización",
          content: "Usted acepta indemnizar y mantener indemne a Icmarkets contra cualquier reclamo, pérdida o daño resultante del uso indebido de nuestros servicios o violación de estos Términos."
        }
      },
      importantNotice: {
        title: "Aviso Importante",
        content: "Al usar los servicios de Icmarkets, reconoce que ha leído, entendido y acepta estar sujeto a estos Términos de Uso. Si no está de acuerdo, debe discontinuar el uso de nuestros servicios inmediatamente."
      },
      actionCards: {
        security: {
          title: "Seguridad",
          description: "Mantenga su cuenta segura."
        },
        helpCenter: {
          title: "Centro de Ayuda",
          description: "Obtenga respuestas a sus preguntas"
        },
        privacyPolicy: {
          title: "Política de Privacidad",
          description: "Revise nuestras prácticas de privacidad"
        },
        legal: {
          title: "Legal",
          description: "Ver todos los documentos legales"
        }
      },
      footer: {
        copyright: "© 2025 Icmarkets. Todos los derechos reservados.",
        lastUpdated: "Última actualización: 6 de mayo de 2025"
      }
    },
    
    assetsDetail: {
      title: "Detalles de Activos",
      today: "Hoy",
      yesterday: "Ayer",
      filter: "Filtro",
      transactionHistory: {
        title: "Historial de Transacciones"
      },
      noTransactions: {
        title: "Aún No Hay Transacciones",
        description: "Su historial de transacciones aparecerá aquí una vez que comience a operar."
      },
      status: {
        completed: "Completado",
        pending: "Pendiente",
        canceled: "Cancelado"
      },
      filterModal: {
        title: "Filtrar Transacciones",
        status: "Estado",
        type: "Tipo",
        direction: "Dirección",
        startDate: "Fecha de Inicio",
        endDate: "Fecha de Fin",
        allStatuses: "Todos los Estados",
        allTypes: "Todos los Tipos",
        bothDirections: "Ambas Direcciones",
        incoming: "Entrante",
        outgoing: "Saliente",
        completed: "Completado",
        pending: "Pendiente",
        canceled: "Cancelado",
        resetFilters: "Restablecer Filtros",
        applyFilters: "Aplicar Filtros"
      },
      actions: {
        deposit: "Depositar",
        withdraw: "Retirar"
      },
      transactionTypes: {
        transaction: "Transacción",
        deposit: "Depósito",
        withdrawal: "Retiro",
        convertedFrom: "Convertido desde {{asset}}",
        convertedTo: "Convertido a {{asset}}",
        conversionIn: "Conversión Entrante",
        conversionOut: "Conversión Saliente",
        stakedAmount: "Monto en Staking",
        stakingRewards: "Recompensas de Staking",
        futuresReserved: "Futuros Reservados",
        futuresProfit: "Ganancia de Futuros",
        futuresLoss: "Pérdida de Futuros",
        futuresSettlement: "Liquidación de Futuros",
        futuresFee: "Tarifa de Futuros",
        futuresRefund: "Reembolso de Futuros",
        futuresBonus: "Bono de Futuros",
        futuresCommission: "Comisión de Futuros",
        manualProfit: "Ganancia Manual",
        manualLoss: "Pérdida Manual",
        manualAdjustment: "Ajuste Manual",
        spotTradingProfit: "Ganancia de Trading Spot",
        spotTradingLoss: "Pérdida de Trading Spot",
        referralReward: "Recompensa de Referido",
        bonus: "Bono",
        referralCommission: "Comisión de Referido",
        orderReserved: "Orden Reservada",
        orderCancelled: "Orden Cancelada",
        orderPartialFill: "Orden Parcialmente Ejecutada",
        orderCompleted: "Orden Completada",
        feePayment: "Pago de Tarifa",
        balanceAdjustment: "Ajuste de Saldo",
        transfer: "Transferencia"
      }
    },
    
    invitation: {
      title: "Invitar Amigos",
      earnTogether: "Ganar Juntos",
      description: "Invita a amigos a unirse a Icmarkets y gana recompensas cuando se registren y comiencen a operar.",
      yourReferralCode: "SU CÓDIGO DE REFERIDO",
      loading: "Cargando...",
      copied: "¡COPIADO!",
      copyCode: "COPIAR CÓDIGO",
      totalEarned: "Total Ganado",
      allTimeCommission: "Comisión de Todos los Tiempos",
      generationMembers: "Miembros por Generación",
      noGenerationData: "No hay datos de generación disponibles",
      approvedMembers: "Miembros Aprobados",
      pendingMembers: "Miembros Pendientes",
      commissionStructure: "Estructura de Comisiones",
      firstGeneration: "1ra Generación",
      secondGeneration: "2da Generación",
      thirdGeneration: "3ra Generación",
      firstDepositCommission: "Comisión por Primer Depósito",
      stakingProfitsCommission: "Comisión por Ganancias de Staking",
      howItWorks: "Cómo Funciona",
      steps: {
        shareCode: {
          title: "Comparta Su Código de Referido",
          description: "Envíe su código único a amigos o compártalo en redes sociales."
        },
        friendsSignUp: {
          title: "Amigos Se Registran",
          description: "Sus amigos se registran usando su código de referido y verifican sus cuentas."
        },
        earnCommissions: {
          title: "Gane Comisiones",
          description: "Gane comisiones de los primeros depósitos y ganancias de staking de su red."
        }
      },
      referralCopied: "¡Código de referido copiado al portapapeles!",
      loadingMembers: "Cargando miembros...",
      approved: "Aprobado",
      joined: "Se Unió",
      noMembersFound: "No se encontraron miembros"
    },
    
    securityTips: {
      title: "Centro de Seguridad",
      essentialTips: "Consejos Esenciales de Seguridad",
      categories: {
        passwordSecurity: "Seguridad de Contraseñas",
        deviceSecurity: "Seguridad del Dispositivo",
        accountSecurity: "Seguridad de la Cuenta"
      },
      tips: {
        strongPasswords: {
          title: "Use Contraseñas Fuertes y Únicas",
          description: "Cree contraseñas complejas con mayúsculas, minúsculas, números y símbolos."
        },
        enable2FA: {
          title: "Habilite la Autenticación de Dos Factores",
          description: "Agregue una capa extra de seguridad a su cuenta con 2FA."
        },
        changePasswords: {
          title: "Cambie Contraseñas Regularmente",
          description: "Actualice sus contraseñas cada 3-6 meses."
        },
        softwareUpdated: {
          title: "Mantenga el Software Actualizado",
          description: "Actualice regularmente su sistema operativo, navegador y software de billetera."
        },
        antivirus: {
          title: "Use Protección Antivirus",
          description: "Instale software antivirus y antimalware confiable."
        },
        publicWifi: {
          title: "Evite WiFi Público",
          description: "Nunca acceda a su billetera en redes públicas sin VPN."
        },
        loginNotifications: {
          title: "Habilite Notificaciones de Inicio de Sesión",
          description: "Reciba alertas para nuevos inicios de sesión en su cuenta."
        },
        reviewActivity: {
          title: "Revise la Actividad de la Cuenta",
          description: "Verifique regularmente su cuenta por actividad sospechosa."
        },
        whitelisting: {
          title: "Use Lista Blanca",
          description: "Agregue direcciones de retiro confiables a la lista blanca para seguridad adicional."
        }
      },
      actions: {
        enable2FA: "Habilitar 2FA",
        enable2FADesc: "Agregue una capa extra de seguridad",
        activityLog: "Registro de Actividad",
        activityLogDesc: "Revise la actividad reciente de la cuenta",
        settings: "Configuraciones",
        settingsDesc: "Configure preferencias de seguridad",
        backupCodes: "Códigos de Respaldo",
        backupCodesDesc: "Guarde sus códigos de recuperación"
      },
      emergency: {
        title: "Procedimientos de Emergencia",
        unauthorizedAccess: "Si sospecha acceso no autorizado a su cuenta, cambie inmediatamente su contraseña y habilite 2FA si aún no está activa.",
        lostDevice: "Si pierde o le roban su dispositivo, revoque inmediatamente el acceso de sesión desde la configuración de su cuenta.",
        phishing: "Si ha sido víctima de un intento de phishing, congele su cuenta y contacte al soporte inmediatamente.",
        supportTitle: "Soporte de Seguridad 24/7",
        supportEmail: "Icmarkets.helpdesk01@gmail.com"
      },
      resources: {
        title: "Recursos de Seguridad",
        securityGuide: "Guía de Seguridad",
        securityGuideLink: "Lea documentación de seguridad integral",
        learningCenter: "Centro de Aprendizaje",
        learningCenterLink: "Aprenda sobre mejores prácticas de seguridad cripto",
        faq: "Preguntas Frecuentes",
        faqLink: "Encuentre respuestas a preguntas comunes de seguridad"
      }
    },
    
    notification: {
      title: "Notificación",
      loading: "Cargando",
      filters: {
        all: "Todas",
        unread: "No leídas",
        read: "Leídas"
      },
      emptyState: {
        title: "Aún no hay notificaciones",
        noNotifications: "Aún no tienes notificaciones",
        noFilteredNotifications: "No se encontraron notificaciones {0}"
      },
      types: {
        deposit: {
          title: "Depósito Recibido",
          message: "Su depósito de {0} ha sido confirmado y acreditado en su billetera."
        },
        withdraw: {
          title: "Retiro Exitoso",
          message: "Su retiro de {0} ha sido procesado exitosamente."
        },
        staking: {
          title: "Ganancia de Staking",
          message: "Ganó {0} de sus recompensas de staking."
        },
        kyc: {
          title: "Actualización KYC",
          defaultMessage: "Su cuenta ha sido activada."
        },
        commission: {
          title: "Comisión Recibida",
          message: "Recibió una comisión de {0}."
        },
        futures: {
          title: "Actualización de Futuros",
          message: "Su monto de transacción de futuros {0} ha sido ejecutado."
        },
        accountActivated: {
          title: "Verificación KYC",
          message: "Hola {0}, sus documentos KYC han sido verificados, ahora puede disfrutar funciones ilimitadas en Icmarkets"
        },
        custom: {
          title: "Notificación",
          defaultMessage: "Tiene una nueva notificación."
        },
        cancelDeposit: {
          title: "Depósito Cancelado",
          message: "Su depósito de {0} ha sido cancelado."
        },
        cancelWithdraw: {
          title: "Retiro Cancelado",
          message: "Su retiro de {0} ha sido cancelado."
        },
        cancelActivated: {
          title: "Activación Cancelada",
          message: "Su KYC fue rechazado por el sistema, por favor intente nuevamente o contacte al Servicio de Atención al Cliente para obtener ayuda"
        }
      }
    },
    
    staking: {
      title: "Staking",
      totalStakedBalance: "Saldo Total en Staking",
      earned: "ganado",
      tabs: {
        options: "Opciones",
        active: "Stakes Activos",
        completed: "Completados"
      },
      daily: "Diario",
      minimumStake: "Stake Mínimo",
      unstakingPeriod: "Período de Des-Staking",
      days: "días",
      stakeButton: "Hacer stake de {0}",
      status: {
        active: "ACTIVO",
        completed: "COMPLETADO"
      },
      remaining: "Restante",
      dailyRate: "Tasa Diaria",
      duration: "Duración",
      createdAt: "Creado el",
      dateFinish: "Fecha de finalización",
      totalCompletedRewards: "RECOMPENSAS TOTALES COMPLETADAS",
      stake: "HACER STAKE",
      stakes: "STAKES",
      allRewardsFromCompleted: "Todas las recompensas de stakes completados",
      totalRewardsEarned: "RECOMPENSAS TOTALES GANADAS",
      balance: "Saldo",
      maximumStake: "Stake Máximo",
      estimatedTotalRewards: "Recompensas Totales Estimadas",
      exploreStakingOptions: "Explorar Opciones de Staking",
      startStaking: "Comenzar Staking",
      emptyStates: {
        options: {
          title: "No Hay Planes de Staking Disponibles",
          message: "Actualmente no hay planes de staking disponibles. Por favor, vuelva más tarde para nuevas oportunidades de staking."
        },
        active: {
          title: "No Hay Stakes Activos",
          message: "Aún no tienes stakes activos. Comienza a hacer staking para ganar recompensas en tus activos cripto."
        },
        completed: {
          title: "No Hay Stakes Completados",
          message: "Aún no has completado ningún stake. Tus stakes completados aparecerán aquí una vez que terminen."
        }
      },
      stakeModal: {
        title: "Hacer Stake",
        amountToStake: "Monto a Hacer Stake",
        enterAmount: "Ingrese el Monto"
      }
    },
    
    conversion: {
      title: "Convertir Criptomonedas",
      loading: "Cargando últimos precios...",
      youSend: "Envías",
      youReceive: "Recibes",
      balance: "Saldo",
      max: "MÁX",
      enterAmount: "Ingresar monto",
      insufficientBalance: "Saldo insuficiente",
      estimatedConversion: "Conversión estimada",
      selectDifferentCurrencies: "Seleccionar diferentes monedas",
      convertNow: "Convertir Ahora",
      pricesUpdate: "Los precios se actualizan en tiempo real",
      selectCurrency: "Seleccionar Moneda",
      searchCurrencies: "Buscar monedas...",
      confirmConversion: "Confirmar Conversión",
      confirmExchange: "Confirmar Intercambio",
      conversionDetails: "Detalles de Conversión",
      exchangeRate: "Tipo de Cambio",
      networkFee: "Tarifa de Red",
      estimatedArrival: "Llegada Estimada",
      arrivalTime: "~30 segundos",
      processingConversion: "Procesando Conversión...",
      cancel: "Cancelar"
    },
    
    history: {
      title: "Historial de Transacciones",
      emptyState: {
        title: "No se encontraron transacciones",
        description: "Intente cambiar sus filtros para ver más transacciones"
      },
      filters: {
        all: "Todas",
        deposits: "Depósitos",
        withdrawals: "Retiros",
        profits: "Ganancias",
        losses: "Pérdidas",
        conversions: "Conversiones",
        stacking: "Stacking"
      },
      statusFilters: {
        allStatus: "Todos los Estados",
        completed: "Completado",
        pending: "Pendiente",
        canceled: "Cancelado"
      },
      timeFilters: {
        allTime: "Todo el Tiempo",
        today: "Hoy",
        week: "Semana",
        month: "Mes",
        year: "Año"
      },
      status: {
        completed: "Completado",
        pending: "Pendiente",
        canceled: "Cancelado"
      },
      dateFormats: {
        today: "Hoy, {0}",
        yesterday: "Ayer, {0}"
      },
      transactionTypes: {
        transaction: "Transacción",
        deposit: "Depósito",
        withdrawal: "Retiro",
        convertedFrom: "Convertido desde {0}",
        convertedTo: "Convertido a {0}",
        conversionIn: "Conversión Entrante",
        conversionOut: "Conversión Saliente",
        stakedAmount: "Monto en Staking",
        stakingRewards: "Recompensas de Staking",
        futuresReserved: "Futuros Reservados",
        futuresProfit: "Ganancia de Futuros",
        futuresLoss: "Pérdida de Futuros",
        futuresSettlement: "Liquidación de Futuros",
        futuresFee: "Tarifa de Futuros",
        futuresRefund: "Reembolso de Futuros",
        futuresBonus: "Bono de Futuros",
        futuresCommission: "Comisión de Futuros",
        manualProfit: "Ganancia Manual",
        manualLoss: "Pérdida Manual",
        manualAdjustment: "Ajuste Manual",
        spotTradingProfit: "Ganancia de Trading Spot",
        spotTradingLoss: "Pérdida de Trading Spot",
        referralReward: "Recompensa de Referido",
        bonus: "Bono",
        referralCommission: "Comisión de Referido",
        orderReserved: "Orden Reservada",
        orderCancelled: "Orden Cancelada",
        orderPartialFill: "Orden Parcialmente Ejecutada",
        orderCompleted: "Orden Completada",
        feePayment: "Pago de Tarifa",
        balanceAdjustment: "Ajuste de Saldo",
        transfer: "Transferencia"
      }
    },
    
    withdraw: {
      title: "Retirar Criptomonedas",
      selectCurrency: "Seleccionar Moneda",
      selectPlaceholder: "Seleccionar una moneda",
      selectHint: "Por favor seleccione una moneda para continuar",
      withdrawalAddress: "Dirección de Retiro",
      withdrawalAmount: "Monto de Retiro",
      withdrawalPassword: "Contraseña de Retiro",
      passwordPlaceholder: "Ingrese la contraseña de retiro",
      available: "Disponible",
      amountWithdrawal: "Monto de retiro",
      minimumWithdrawal: "Retiro mínimo",
      networkFee: "Tarifa de red",
      youWillReceive: "Recibirás",
      confirmWithdrawal: "Confirmar Retiro",
      processing: "Procesando...",
      securityVerification: "Verificación de Seguridad",
      securityMessage: "Para su seguridad, los retiros requieren confirmación de contraseña y pueden estar sujetos a revisión. Los retiros a direcciones incorrectas no pueden revertirse.",
      networkInfo: "Red: {0} ({1})",
      noWalletAddress: "(Sin dirección de billetera)",
      noWallet: {
        title: "No Se Encontró Dirección de Billetera",
        description: "Aún no has agregado ninguna dirección de billetera. Por favor agregue una dirección de retiro para proceder con su transacción.",
        addButton: "Agregar Dirección de Billetera"
      },
      security: {
        title: "Seguridad Primero",
        description: "Para su seguridad, requerimos una dirección de retiro verificada para cada criptomoneda. Esto ayuda a prevenir errores y asegura que sus fondos lleguen al destino correcto."
      },
      errors: {
        amountNumber: "El monto de retiro debe ser un número",
        amountRequired: "Se requiere monto de retiro",
        amountPositive: "El monto de retiro debe ser mayor que 0",
        amountMin: "El monto está por debajo del retiro mínimo para esta moneda",
        passwordRequired: "Se requiere contraseña de retiro",
        noWalletAddress: "No se encontró dirección de billetera para {0}. Por favor agregue una dirección de billetera primero.",
        minimumWithdraw: "Retiro mínimo para {0}: {1} {2}",
        insufficientForFee: "No hay saldo suficiente para cubrir la tarifa ({0} {1})"
      },
      validation: {
        selectCurrency: "Seleccionar moneda",
        enterAmount: "Ingresar monto",
        belowMin: "Por debajo del mínimo ({0} {1})",
        insufficientBalance: "Saldo insuficiente",
        insufficientForFee: "Saldo insuficiente (incluyendo tarifa)",
        enterPassword: "Ingresar contraseña"
      }
    },
    
    deposit: {
      title: "Depositar Criptomonedas",
      loading: "Método de depósito cargando ...",
      selectNetwork: "Seleccionar Red",
      depositAddress: "Su dirección de depósito",
      copyAddress: "Copiar Dirección",
      amountLabel: "Monto de depósito ({0})",
      amountPlaceholder: "Mínimo: {0} {1}",
      txidLabel: "ID de Transacción (TXID)",
      txidPlaceholder: "Ingrese el TXID",
      minimumDeposit: "Depósito mínimo",
      importantNotice: "Aviso Importante",
      warningMessage: "Por favor asegúrese de seleccionar la red correcta para su depósito. Enviar fondos a través de la red incorrecta puede resultar en pérdida permanente de sus activos, lo cual no se puede recuperar.",
      confirmDeposit: "Confirmar Depósito",
      network: "Red",
      estimatedArrival: "Llegada estimada",
      networkConfirmations: "3 confirmaciones de red",
      processingTime: "Tiempo de procesamiento",
      processingTimeValue: "10-30 minutos",
      noMethods: "No hay métodos de depósito disponibles en este momento.",
      addressCopied: "¡Dirección copiada al portapapeles!",
      unknownNetwork: "Red Desconocida"
    },
    
    faq: {
      title: "Centro de Preguntas Frecuentes",
      hero: {
        title: "Preguntas Frecuentes",
        subtitle: "Encuentre respuestas a preguntas comunes sobre el uso de Icmarkets"
      },
      search: {
        placeholder: "Buscar respuestas..."
      },
      categories: {
        gettingStarted: "Primeros Pasos",
        managingAccount: "Gestionando Su Cuenta"
      },
      questions: {
        howToCreateAccount: "¿Cómo creo una cuenta?",
        howToCompleteVerification: "¿Cómo completo la verificación?",
        howToBuyCrypto: "¿Cómo compro criptomoneda?",
        howToTrade: "¿Cómo opero con criptomonedas?",
        howToSendReceive: "¿Cómo recibo y envío criptomonedas?",
        howToBecomeP2PMerchant: "¿Cómo me convierto en un Comerciante P2P?",
        howStakingWorks: "¿Cómo funciona el staking?"
      },
      answers: {
        verificationProcess: "Cargue una identificación gubernamental y una foto selfie. La verificación generalmente se aprueba en unas horas."
      },
      steps: {
        goToWebsite: "Vaya a https://trade-Icmarkets.com",
        clickSignUp: 'Haga clic en "Registrarse"',
        enterDetails: "Ingrese sus datos",
        verifyEmail: "Verifique su dirección de correo electrónico",
        completeVerification: "Complete primero la verificación",
        clickBuyCrypto: 'Haga clic en "Comprar Cripto"',
        selectCoinAndPayment: "Seleccione moneda y método de pago",
        confirmTransaction: "Confirme la transacción",
        cryptoInWallet: "La criptomoneda aparecerá en su billetera",
        goToTradeMarkets: 'Vaya a "Trading/Mercados"',
        pickTradingPair: "Elija un par de trading (ej. BTC/USD)",
        placeOrders: "Coloque órdenes de mercado o límite",
        receiveCrypto: "Vaya a Billetera > Recibir → copie dirección o código QR",
        sendCrypto: "Vaya a Billetera > Enviar → ingrese dirección/monto → confirme",
        applyP2P: 'Solicite en la sección "P2P"',
        meetCriteria: "Cumpla con los criterios de elegibilidad",
        createOffers: "Una vez aprobado, cree ofertas y opere",
        goToStaking: "Vaya a Billeteras > Staking",
        pickStakingPlan: "Elija un plan de staking",
        selectAmount: "Seleccione el monto para hacer staking",
        confirmStaking: "Confirme la transacción",
        rewardsProcessed: "Las recompensas se procesan automáticamente al final del período"
      },
      labels: {
        toReceive: "Para recibir:",
        toSend: "Para enviar:"
      },
      futures: {
        title: "Trading de Futuros Explicado",
        whatAreFutures: "¿Qué son los contratos de futuros?",
        futuresExplanation: "Acuerdos para comprar o vender criptomonedas a un precio predeterminado en una fecha futura (liquidados en efectivo).",
        whatIsLeverage: "¿Qué es el apalancamiento?",
        leverageExplanation: "Capacidad de operar con más capital del que tiene (ej. 10x, 20x, 50x apalancamiento).",
        longShortPositions: "¿Qué son las posiciones Largo y Corto?",
        long: "Largo",
        longExplanation: "= apostar que el precio subirá",
        short: "Corto",
        shortExplanation: "= apostar que el precio bajará",
        marginLiquidation: "¿Qué son el Margen y la Liquidación?",
        marginExplanation: "Riesgo de liquidación de posición si sus garantías caen demasiado para mantener la posición.",
        fundingRate: "¿Qué es la Tasa de Financiamiento?",
        fundingRateExplanation: "Tarifa intercambiada cada 8 horas entre traders largos y cortos para equilibrar los precios de los contratos perpetuos con los precios spot.",
        profitLossCalculation: "¿Cómo se calcula la Ganancia/Pérdida?",
        profitLossExplanation: "Calculado basado en la diferencia de precio multiplicada por su apalancamiento y tamaño de posición."
      },
      benefits: {
        title: "¿Por Qué Elegir Futuros Icmarkets?",
        hedge: "Cobertura contra la volatilidad del mercado",
        multiplyProfits: "Multiplique ganancias con apalancamiento",
        tradeBothMarkets: "Opere tanto mercados en alza como en baja",
        advancedStrategies: "Implemente estrategias de trading avanzadas"
      },
      actionCards: {
        contactSupport: "Contactar Soporte",
        getHelp: "Obtenga ayuda de nuestro equipo",
        community: "Comunidad",
        joinDiscussions: "Únase a discusiones"
      },
      footer: {
        copyright: "© 2025 Icmarkets. Todos los derechos reservados.",
        needHelp: "¿Necesita más ayuda? Contacte a Icmarkets.helpdesk01@gmail.com"
      }
    },
    
    tabBottomNavigator: {
      home: "inicio",
      grap: "gráfico",
      records: "registros",
      starting: "comenzando"
    },
    
    language: {
      title: "Idioma de la App",
      selectLanguage: "Seleccionar Idioma",
      choosePreferred: "Elija su idioma preferido",
      searchPlaceholder: "Buscar idiomas...",
      currentLanguage: "Idioma Actual",
      languages: {
        english: "Inglés",
        french: "Francés",
        russian: "Ruso",
        german: "Alemán",
        spanish: "Español"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    }
  }
,



  entities: {
    record: {
      menu: "Registros",
      fields: {
        user: "usuario",
        product: "producto",
        number: "Número de registro",
        status: "estado",
      },
      list: {
        title: "Lista de registros",
      },
      view: {
        title: "Detalle del Registro",
      },
      edit: {
        title: "Editar Registro",
      },
      create: {
        success: "Producto enviado exitosamente.",
      },
      update: {
        success: "Producto enviado exitosamente.",
      },
      destroy: {
        success: "Registro eliminado exitosamente",
      },
      destroyAll: {
        success: "Registro eliminado exitosamente",
      },
      enumerators: {
        status: {
          pending: "Pendiente",
          completed: "Completado",
          canceled: "Cancelado",
        },
      },
    },

    category: {
      name: "categoría",
      label: "Categorías",
      menu: "Categorías",
      exporterFileName: "categoria_exportacion",
      list: {
        menu: "Categorías",
        title: "Categorías",
      },
      create: {
        success: "Categoría guardada exitosamente",
      },
      update: {
        success: "Categoría guardada exitosamente",
      },
      destroy: {
        success: "Categoría eliminada exitosamente",
      },
      destroyAll: {
        success: "Categoría(s) eliminada(s) exitosamente",
      },
      edit: {
        title: "Editar Categoría",
      },
      fields: {
        id: "Id",
        name: "Nombre",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "MetaKeywords",
        metaDescriptions: "MetaDescriptions",
        status: "Estado",
        isFeature: "Es Destacado",
        serialRange: "Serial",
        serial: "Serial",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          enable: "Habilitar",
          disable: "Deshabilitar",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nueva Categoría",
      },
      view: {
        title: "Ver Categoría",
      },
      importer: {
        title: "Importar Categorías",
        fileName: "plantilla_importacion_categoria",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },

    product: {
      name: "producto",
      label: "Productos",
      menu: "Productos",
      exporterFileName: "producto_exportacion",
      list: {
        menu: "Productos",
        title: "Productos",
      },
      create: {
        success: "Producto guardado exitosamente",
      },
      update: {
        success: "Producto guardado exitosamente",
      },
      destroy: {
        success: "Producto eliminado exitosamente",
      },
      destroyAll: {
        success: "Producto(s) eliminado(s) exitosamente",
      },
      edit: {
        title: "Editar Producto",
      },
      fields: {
        id: "Id",
        name: "Nombre",
        slug: "Slug",
        tags: "Etiquetas",
        video: "Video",
        specificationName: "Nombre de Especificación",
        specificationDesciption: "Descripción de Especificación",
        isSpecification: "Es Especificación",
        details: "Detalles",
        photo: "Foto",
        discountPriceRange: "Precio de Descuento",
        discountPrice: "Precio Actual",
        previousPriceRange: "Precio Anterior",
        previousPrice: "Precio Anterior",
        stockRange: "Inventario",
        stock: "Inventario",
        metaKeywords: "MetaKeywords",
        metaDesctiption: "Descripción Corta",
        status: "Estado",
        isType: "Tipo",
        dateRange: "Fecha",
        date: "Fecha",
        itemType: "Tipo de Artículo",
        file: "Archivo",
        link: "Enlace",
        fileType: "Tipo de Archivo",
        taxe: "Impuesto",
        category: "Categoría",
        subcategory: "Sub Categoría",
        childcategory: "Categoría Infantil",
        brand: "Marca",
        gallery: "Galería",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          enable: "Habilitar",
          disable: "Deshabilitar",
        },
        itemType: {
          physical: "Físico",
          digitale: "Digital",
        },
        fileType: {
          file: "Archivo",
          link: "Enlace",
        },
        isType: {
          new_arrival: "Nueva Llegada",
          feature_product: "Producto Destacado",
          top_pdroduct: "Producto Principal",
          best_product: "Mejor Producto",
          flash_deal_product: "Producto de Oferta Flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nuevo Producto",
      },
      view: {
        title: "Ver Producto",
      },
      importer: {
        title: "Importar Productos",
        fileName: "plantilla_importacion_producto",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },
    transaction: {
      name: "transacción",
      label: "Transacciones",
      menu: "Transacciones",
      exporterFileName: "transaccion_exportacion",
      list: {
        menu: "Transacciones",
        title: "Transacciones",
      },
      create: {
        success: "Transacción enviada exitosamente",
      },
      update: {
        success: "Transacción guardada exitosamente",
      },
      destroy: {
        success: "Transacción eliminada exitosamente",
      },
      destroyAll: {
        success: "Transacción(es) eliminada(s) exitosamente",
      },
      edit: {
        title: "Editar Transacción",
      },
      fields: {
        id: "Id",
        amountRange: "Monto",
        amount: "Monto",
        email: "Correo Electrónico",
        tax: "Impuesto",
        currencySign: "Signo de Moneda",
        currencyValue: "Valor de Moneda",
        orderId: "Id de Pedido",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        status: {
          pending: "Pendiente",
          completed: "Éxito",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nueva Transacción",
      },
      view: {
        title: "Ver Transacción",
      },
      importer: {
        title: "Importar Transacciones",
        fileName: "plantilla_importacion_transaccion",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },

    order: {
      name: "pedido",
      label: "Pedidos",
      menu: "Pedidos",
      exporterFileName: "pedido_exportacion",
      list: {
        menu: "Pedidos",
        title: "Pedidos",
      },
      create: {
        success: "Pedido guardado exitosamente",
      },
      update: {
        success: "Pedido guardado exitosamente",
      },
      destroy: {
        success: "Pedido eliminado exitosamente",
      },
      destroyAll: {
        success: "Pedido(s) eliminado(s) exitosamente",
      },
      edit: {
        title: "Editar Pedido",
      },
      fields: {
        id: "Id",
        userId: "Usuario",
        cart: "Carrito",
        shipping: "Envío",
        discountRange: "Descuento",
        discount: "Descuento",
        paymentMethod: "Método de Pago",
        taxe: "Impuesto",
        transactionNumber: "Número de Transacción",
        orderStatus: "Estado del Pedido",
        createdAt: "Creado en",
        updatedAt: "Actualizado en",
        createdAtRange: "Creado en",
      },
      enumerators: {
        orderStatus: {
          pending: "Pendiente",
          in_progress: "En Progreso",
          delivered: "Entregado",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nuevo Pedido",
      },
      view: {
        title: "Ver Pedido",
      },
      importer: {
        title: "Importar Pedidos",
        fileName: "plantilla_importacion_pedido",
        hint: "Las columnas de Archivos/Imágenes deben ser las URL de los archivos separadas por espacio.",
      },
    },
  },


  buttons: {
    login: "Iniciar sesión",
    registerNow: "Regístrate ahora",
    signup: "Registrarse",
    start: "Comenzar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Volver a inicio",
    confirm: "Confirmar",
    logout: "Cerrar sesión",
    getstarted: "Empezar",
  },
  text: {
    welcome: "Bienvenido",
    discover: "Descubre ofertas exclusivas solo para ti",
    signin: "Iniciar sesión",
    haveaccount: "¿Ya tienes una cuenta?",
    noaccount: "¿No tienes una cuenta?",
    showingnow: "En cartelera",
    comingsoon: "Próximamente",
    termsconditions: "Términos y condiciones",
    todayearning: "Ganancias de hoy",
    accountbalance: "Saldo de la cuenta",
    freezebalance: "Saldo congelado",
    sumbitInformation: "Enviar información",
    order: "Pedido",
    pending: "Pendiente",
    completed: "Completado",
    canceled: "Cancelado",
    notransaction: "¡No hay transacciones hasta ahora!",
    createdtime: "Hora de creación",
    creationtime: "Hora de creación",
    orderNumber: "Número de pedido",
    orderamount: "Monto del pedido",
    income: "Ingresos",
    buyerating: "Calificación del comprador",
    uid: "UID",
    promotioncode: "Código de promoción",
    walletamount: "Monto de la billetera",
    creditassesment: "Evaluación de crédito",
    myfinance: "Mis finanzas",
    withdraw: "Retirar",
    mydetails: "Mis detalles",
    profile: "Perfil",
    wallet: "Billetera",
    other: "Otro",
    customersupport: "Atención al cliente",
    transaction: "Transacción",
    taskshistory: "Historial de tareas",
    security: "Seguridad",
    sponsor: `Nuestra seguridad es nuestra máxima prioridad y queremos asegurarnos de que
              estés protegido contra cualquier posible riesgo. Ten en cuenta que
              nunca te pediremos que envíes dinero a una dirección desconocida. Antes
              de realizar cualquier pago, te pedimos que verifiques los detalles con nosotros.`,
  },
  errors: {
    backToHome: "Volver a inicio",
    403: "Lo sentimos, no tienes acceso a esta página",
    404: "Lo sentimos, la página que visitaste no existe",
    500: "Lo sentimos, el servidor está reportando un error",
    429: "Demasiadas solicitudes. Por favor, inténtalo más tarde.",
    forbidden: {
      message: "Prohibido",
    },
    validation: {
      message: "Ocurrió un error",
    },
    defaultErrorMessage: "Ups, ocurrió un error",
  },

  withdraw: {
    withdrawamount: "Monto de retiro",
    Withdrawpassword: "Contraseña de retiro",
    availablebalance: "Saldo disponible",
    rules: "Descripción de las reglas",
    rule1: "El retiro mínimo es de $20",
    rule2: "El pago se realizará dentro de las 24 horas posteriores a la solicitud de retiro",
    rule3: "La falta de envío de pedidos diarios completos impide el retiro, todos los productos deben ser enviados para su retiro"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nombre completo",
    email: "Correo electrónico",
    phonenumber: "Número de teléfono",
    country: "País",
    Invitationcode: "Código de invitación"
  },
  wallet: {
    wallet: "Billetera",
    info: "Información del método de retiro",
    username: "Nombre de usuario",
    walletname: "Nombre de la billetera",
    walletaddress: "Dirección de la billetera",
    note: "Nota",
    notedesctiption: "Por favor, ten cuidado al completar esta información."
  },

  cs: {
    cs: "Atención al cliente",
    note: "Si tienes alguna pregunta o encuentras algún problema, envíanos un correo electrónico o chatea con nuestro equipo de soporte en línea.",
    contactnow: "Contactar ahora"
  },
  transaction: {
    transaction: "Transacción",
    all: "Todo",
    withdraw: "Retiro",
    dposit: "Depósito",
    notransaction: "¡No hay transacciones hasta ahora!"
  },
  order: {
    order: "Pedido",
    completed: "Completado",
    pending: "Pendiente",
    canceled: "Cancelado",
    ordertime: "Hora del pedido",
    ordernumber: "Número de pedido",
    total: "Monto total del pedido",
    commission: "Comisión",
    return: "Retorno estimado"
  },

  security: {
    changepassword: "Cambiar contraseña",
    oldpassword: "Contraseña antigua",
    newpassword: "Nueva contraseña",
    confirmpassword: "Confirmar contraseña",
    note: "Nota",
    notedesc: "Por favor, completa esta información con cuidado"
  },



  tabbarmenue: {
    home: "Inicio",
    rate: "Calificar",
    profile: "Perfil"
  },

  validation: {
    mixed: {
      default: "${path} no es válido",
      required: "${path} es obligatorio",
      oneOf: "${path} debe ser uno de los siguientes valores: ${values}",
      notOneOf: "${path} no debe ser uno de los siguientes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} debe ser un ${type}`;
      },
    },
    string: {
      length: "${path} debe tener exactamente ${length} caracteres",
      min: "${path} debe tener al menos ${min} caracteres",
      max: "${path} debe tener como máximo ${max} caracteres",
      matches: '${path} debe coincidir con el siguiente formato: "${regex}"',
      email: "${path} debe ser un correo electrónico válido",
      url: "${path} debe ser una URL válida",
      trim: "${path} debe ser una cadena sin espacios al inicio y al final",
      lowercase: "${path} debe estar en minúsculas",
      uppercase: "${path} debe estar en mayúsculas",
      selected: "${path} debe ser seleccionado",
    },
    number: {
      min: "${path} debe ser mayor o igual a ${min}",
      max: "${path} debe ser menor o igual a ${max}",
      lessThan: "${path} debe ser menor que ${less}",
      moreThan: "${path} debe ser mayor que ${more}",
      notEqual: "${path} no debe ser igual a ${notEqual}",
      positive: "${path} debe ser un número positivo",
      negative: "${path} debe ser un número negativo",
      integer: "${path} debe ser un número entero",
    },
    date: {
      min: "${path} debe ser posterior a ${min}",
      max: "${path} debe ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} no debe contener claves no especificadas en el objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} es obligatorio`
          : `${path} debe contener al menos ${min} elementos`,
      max: "${path} debe contener como máximo ${max} elementos",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Subir",
    image: "Debe subir una imagen",
    size: "El archivo es demasiado grande. El tamaño máximo permitido es {0}",
    formats: `Formato no válido. Debe ser uno de los siguientes: {0}.`,
  },

};

export default es;
