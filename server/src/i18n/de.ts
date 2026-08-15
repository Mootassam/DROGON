/**
 * I18n dictionary for the de.
 */

const de = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Entschuldigung, wir erkennen Ihre Anmeldedaten nicht`,
    wrongPassword: `Entschuldigung, wir erkennen Ihre Anmeldedaten nicht`,
    depositExist: 'Einzahlungsmethoden sind bereits initialisiert',
    weakPassword: 'Dieses Passwort ist zu schwach',
    emailAlreadyInUse: 'Benutzername wird bereits verwendet',
    invitationCode: 'Bitte schreiben Sie einen korrekten Einladungscode',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse an',
    passwordReset: {
      invalidToken:
        'Passwort-Reset-Link ist ungültig oder abgelaufen',
      error: `E-Mail nicht erkannt`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'E-Mail-Bestätigungslink ist ungültig oder abgelaufen.',
      error: `E-Mail nicht erkannt.`,
      signedInAsWrongUser: `Diese E-Mail-Bestätigung wurde an {0} gesendet, aber Sie sind als {1} angemeldet.`,
    },
    passwordChange: {
      invalidPassword: 'Das alte Passwort ist ungültig',
    },
  },

  futures: {
    alreadyFinalized: 'Dieser Futures-Eintrag ist bereits abgeschlossen und kann nicht geändert werden.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Benutzer mit dieser E-Mail existiert bereits.',
      userNotFound: 'Benutzer nicht gefunden.',
      destroyingHimself: `Sie können sich nicht selbst löschen.`,
      revokingOwnPermission: `Sie können Ihre eigenen Administratorberechtigungen nicht widerrufen.`,
      revokingPlanUser: `Sie können die Administratorberechtigungen des Plan-Managers nicht widerrufen.`,
      destroyingPlanUser: `Sie können den Plan-Manager nicht löschen.`,
    },
  },

  tenant: {
    exists:
      'Es existiert bereits ein Arbeitsbereich in dieser Anwendung.',
    url: {
      exists: 'Diese Arbeitsbereich-URL wird bereits verwendet.',
    },
    invitation: {
      notSameEmail: `Diese Einladung wurde an {0} gesendet, aber Sie sind als {1} angemeldet.`,
    },
    planActive: `Es gibt einen aktiven Plan für diesen Arbeitsbereich. Bitte stornieren Sie zuerst den Plan.`,
    stripeNotConfigured: 'Stripe ist nicht konfiguriert.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Die Datei ist leer',
      invalidFileExcel:
        'Nur Excel-Dateien (.xlsx) sind erlaubt',
      invalidFileUpload:
        'Ungültige Datei. Stellen Sie sicher, dass Sie die neueste Version der Vorlage verwenden.',
      importHashRequired: 'Import-Hash ist erforderlich',
      importHashExistent: 'Daten wurden bereits importiert',
    },
  },

  errors: {
Invalidnonce: "Ungültige Nonce",
Invalidsignature: "Ungültige Signatur",
frozenDuringExecution: "Kann {{operation}} nicht ausführen. Ihr {{currency}} Perpetual-Wallet ist derzeit eingefroren. Bitte kontaktieren Sie den Kundensupport.",
insufficientorfrozen: "Unzureichende Mittel im Wallet nach Validierung oder Wallet ist eingefroren",
notFounds: "{{currency}} Wallet nicht gefunden. Bitte kontaktieren Sie den Support.",
frozen: "Ihr {{currency}} Wallet ist derzeit eingefroren. Bitte kontaktieren Sie den Kundensupport, um Ihr Konto zu entsperren.",
frozenWithFunds: "Ihr {{currency}} Wallet ist eingefroren. Sie haben {{frozenAmount}} {{currency}} eingefroren und {{availableAmount}} {{currency}} verfügbar. Bitte kontaktieren Sie den Kundensupport, um Ihr Konto zu entsperren.",
insufficientBalance: "Unzureichendes {{currency}} Guthaben. Angefordert: {{requested}}, Verfügbar: {{available}}.",
insufficientWithFrozen: "Unzureichendes verfügbares {{currency}} Guthaben. Angefordert: {{requested}}, Verfügbar: {{available}}, Eingefroren: {{frozen}}, Gesamt: {{total}}. Bitte kontaktieren Sie den Support, um Ihre Mittel zu entsperren.",
walletNotFound: "Wallet für diesen Vermögenswert nicht gefunden",
withdrawinsufficientBalance: "Unzureichendes Guthaben für diesen Abhebung.",
futuresAlreadyFinalized: "Dieser Futures-Eintrag ist bereits abgeschlossen und kann nicht geändert werden.",
usdtWalletNotFound: "USDT Wallet nicht gefunden",
usdtWalletFrozen: "USDT Handels-Wallet ist eingefroren",
insufficientusdtWallet: "Unzureichendes USDT Guthaben im Handels-Wallet",
usdtWalletorfrozen: "Unzureichende Mittel im Wallet nach Validierung oder Wallet ist eingefroren",
usdtWalletNotFoundForUser: "USDT Wallet nicht gefunden für Benutzer {{userId}}",
closingPriceExceedLimit: "Schlusskurs darf $100 nicht überschreiten",
profitAmountInvalid: "Gewinnbetrag ist null oder ungültig.",
amountConditions: 'Futures-Betrag muss mindestens 200 USDT betragen',
lossAmountInvalid: "Verlustbetrag ist null oder ungültig.",
passwordNotMatching: "Passwort stimmt nicht überein",
insufficientBalanceUpgrade: "Unzureichendes Guthaben. Bitte upgraden.",
walletNotFoundForCurrency: "Wallet nicht gefunden für {{currency}}",
insufficientBalanceWithAmounts: "Unzureichendes Guthaben. Sie haben {{currentAmount}} {{currency}}, versuchen aber {{tryingAmount}} {{currency}} zu staken",
stakingPlanNotAvailable: "Dieser Staking-Plan ist noch nicht verfügbar",
stakingPlanExpired: "Dieser Staking-Plan ist abgelaufen",
invalidUserBalance: "Ungültiges Guthaben für den aktuellen Benutzer",
invalidRequestAmount: "Ungültiger Anfragebetrag",
unsupportedCurrency: "Nicht unterstützte Währung",
alreadySubscribedToVip: "Sie sind bereits für diesen VIP abonniert",
insufficientBalancePleaseUpgrade: "Unzureichendes Guthaben, bitte upgraden",
resetAccountContactSupport: "Bitte setzen Sie Ihr Konto zurück. Kontaktieren Sie den Kundensupport",
contactCustomerService: "Sollte den Kundenservice darüber kontaktieren",
pleaseWriteAmount: "Bitte Betrag eingeben",
withdrawalExceedsBalance: "Es scheint, dass Ihr Abhebungsbetrag Ihr Guthaben übersteigt",
withdrawPasswordIncorrect: "Ihr Abhebungs-Passwort ist nicht korrekt, bitte überprüfen Sie es erneut",
    notFound: {
      message: 'Nicht gefunden',
    },
    forbidden: {
      message: 'Verboten',
    },
    validation: {
      message: 'Ein Fehler ist aufgetreten',
    },
  },

  email: {
    error: `E-Mail-Anbieter ist nicht konfiguriert.`,
  },

  preview: {
    error:
      'Entschuldigung, dieser Vorgang ist im Vorschaumodus nicht erlaubt.',
  },

};

export default de;