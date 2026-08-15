/**
 * I18n dictionary for the fr.
 */

const fr = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Désolé, nous ne reconnaissons pas vos identifiants`,
    wrongPassword: `Désolé, nous ne reconnaissons pas vos identifiants`,
    depositExist: 'Les méthodes de dépôt sont déjà initialisées',
    weakPassword: 'Ce mot de passe est trop faible',
    emailAlreadyInUse: "Le nom d'utilisateur est déjà utilisé",
    invitationCode: 'Veuillez écrire un code de parrainage correct',
    invalidEmail: 'Veuillez fournir un email valide',
    passwordReset: {
      invalidToken:
        'Le lien de réinitialisation du mot de passe est invalide ou a expiré',
      error: `Email non reconnu`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        "Le lien de vérification d'email est invalide ou a expiré.",
      error: `Email non reconnu.`,
      signedInAsWrongUser: `Cette confirmation d'email a été envoyée à {0} mais vous êtes connecté en tant que {1}.`,
    },
    passwordChange: {
      invalidPassword: 'L\'ancien mot de passe est invalide',
    },
  },

  futures: {
    alreadyFinalized: 'Cette entrée futures est déjà finalisée et ne peut pas être modifiée.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Un utilisateur avec cet email existe déjà.',
      userNotFound: 'Utilisateur non trouvé.',
      destroyingHimself: `Vous ne pouvez pas vous supprimer vous-même.`,
      revokingOwnPermission: `Vous ne pouvez pas révoquer vos propres permissions d'administrateur.`,
      revokingPlanUser: `Vous ne pouvez pas révoquer les permissions d'administrateur du gestionnaire de plan.`,
      destroyingPlanUser: `Vous ne pouvez pas supprimer le gestionnaire de plan.`,
    },
  },

  tenant: {
    exists:
      'Il y a déjà un espace de travail sur cette application.',
    url: {
      exists: 'Cette URL d\'espace de travail est déjà utilisée.',
    },
    invitation: {
      notSameEmail: `Cette invitation a été envoyée à {0} mais vous êtes connecté en tant que {1}.`,
    },
    planActive: `Il y a un plan actif pour cet espace de travail. Veuillez d'abord annuler le plan.`,
    stripeNotConfigured: 'Stripe n\'est pas configuré.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Le fichier est vide',
      invalidFileExcel:
        'Seuls les fichiers Excel (.xlsx) sont autorisés',
      invalidFileUpload:
        'Fichier invalide. Assurez-vous d\'utiliser la dernière version du modèle.',
      importHashRequired: 'Le hachage d\'importation est requis',
      importHashExistent: 'Les données ont déjà été importées',
    },
  },

  errors: {
   Invalidnonce: "Nonce invalide",
Invalidsignature: "Signature invalide",
frozenDuringExecution: "Impossible d'exécuter {{operation}}. Votre portefeuille perpétuel {{currency}} est actuellement gelé. Veuillez contacter le service client.",
insufficientorfrozen: "Fonds insuffisants dans le portefeuille après validation ou portefeuille gelé",
notFounds: "Portefeuille {{currency}} non trouvé. Veuillez contacter le support.",
frozen: "Votre portefeuille {{currency}} est actuellement gelé. Veuillez contacter le service client pour débloquer votre compte.",
frozenWithFunds: "Votre portefeuille {{currency}} est gelé. Vous avez {{frozenAmount}} {{currency}} gelés et {{availableAmount}} {{currency}} disponibles. Veuillez contacter le service client pour débloquer votre compte.",
insufficientBalance: "Solde {{currency}} insuffisant. Demandé: {{requested}}, Disponible: {{available}}.",
insufficientWithFrozen: "Solde disponible {{currency}} insuffisant. Demandé: {{requested}}, Disponible: {{available}}, Gelé: {{frozen}}, Total: {{total}}. Veuillez contacter le support pour débloquer vos fonds.",
walletNotFound: "Portefeuille non trouvé pour cet actif",
withdrawinsufficientBalance: "Solde insuffisant pour ce retrait.",
futuresAlreadyFinalized: "Cette entrée de futures est déjà finalisée et ne peut pas être modifiée.",
usdtWalletNotFound: "Portefeuille USDT non trouvé",
usdtWalletFrozen: "Le portefeuille de trading USDT est gelé",
insufficientusdtWallet: "Solde USDT insuffisant dans le portefeuille de trading",
usdtWalletorfrozen: "Fonds insuffisants dans le portefeuille après validation ou portefeuille gelé",
usdtWalletNotFoundForUser: "Portefeuille USDT non trouvé pour l'utilisateur {{userId}}",
closingPriceExceedLimit: "Le prix de clôture ne peut pas dépasser 100$",
profitAmountInvalid: "Le montant du profit est nul ou invalide.",
amountConditions: 'Le montant des futures doit être d\'au moins 200 USDT',
lossAmountInvalid: "Le montant de la perte est nul ou invalide.",
passwordNotMatching: "Le mot de passe ne correspond pas",
insufficientBalanceUpgrade: "Solde insuffisant. Veuillez mettre à niveau.",
walletNotFoundForCurrency: "Portefeuille non trouvé pour {{currency}}",
insufficientBalanceWithAmounts: "Solde insuffisant. Vous avez {{currentAmount}} {{currency}} mais essayez de staker {{tryingAmount}} {{currency}}",
stakingPlanNotAvailable: "Ce plan de staking n'est pas encore disponible",
stakingPlanExpired: "Ce plan de staking a expiré",
invalidUserBalance: "Solde invalide pour l'utilisateur actuel",
invalidRequestAmount: "Montant de la demande invalide",
unsupportedCurrency: "Devise non supportée",
alreadySubscribedToVip: "Vous êtes déjà abonné à ce vip",
insufficientBalancePleaseUpgrade: "Solde insuffisant, veuillez mettre à niveau",
resetAccountContactSupport: "Veuillez réinitialiser votre compte. Contactez le service client",
contactCustomerService: "Devrait contacter le service client à ce sujet",
pleaseWriteAmount: "Veuillez écrire le montant",
withdrawalExceedsBalance: "Il semble que votre montant de retrait dépasse votre solde",
withdrawPasswordIncorrect: "Votre mot de passe de retrait n'est pas correct, veuillez vérifier à nouveau",
    notFound: {
      message: 'Non trouvé',
    },
    forbidden: {
      message: 'Interdit',
    },
    validation: {
      message: 'Une erreur est survenue',
    },
  },

  email: {
    error: `Le fournisseur d'email n'est pas configuré.`,
  },

  preview: {
    error:
      'Désolé, cette opération n\'est pas autorisée en mode aperçu.',
  },

};

export default fr;