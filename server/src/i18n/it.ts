
const it = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Spiacenti, non riconosciamo le tue credenziali`,
    wrongPassword: `Spiacenti, non riconosciamo le tue credenziali`,
    depositExist: 'I metodi di deposito sono già inizializzati',
    weakPassword: 'Questa password è troppo debole',
    emailAlreadyInUse: 'Nome utente già in uso',
    invitationCode: 'Si prega di scrivere un codice invito corretto',
    invalidEmail: 'Si prega di fornire un email valido',
    passwordReset: {
      invalidToken:
        'Il link di reimpostazione password non è valido o è scaduto',
      error: `Email non riconosciuta`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Il link di verifica email non è valido o è scaduto.',
      error: `Email non riconosciuta.`,
      signedInAsWrongUser: `Questa conferma email è stata inviata a {0} ma hai effettuato l'accesso come {1}.`,
    },
    passwordChange: {
      invalidPassword: 'La vecchia password non è valida',
    },
  },

  futures: {
    alreadyFinalized: 'Questa posizione futures è già finalizzata e non può essere modificata.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Utente con questa email già esistente.',
      userNotFound: 'Utente non trovato.',
      destroyingHimself: `Non puoi eliminare te stesso.`,
      revokingOwnPermission: `Non puoi revocare i tuoi permessi di amministratore.`,
      revokingPlanUser: `Non puoi revocare i permessi di amministratore del gestore piano.`,
      destroyingPlanUser: `Non puoi eliminare il gestore piano.`,
    },
  },

  tenant: {
    exists:
      'Esiste già un workspace su questa applicazione.',
    url: {
      exists: 'Questo URL workspace è già in uso.',
    },
    invitation: {
      notSameEmail: `Questo invito è stato inviato a {0} ma hai effettuato l'accesso come {1}.`,
    },
    planActive: `C\'è un piano attivo per questo workspace. Si prega di cancellare prima il piano.`,
    stripeNotConfigured: 'Stripe non è configurato.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Il file è vuoto',
      invalidFileExcel:
        'Sono consentiti solo file Excel (.xlsx)',
      invalidFileUpload:
        'File non valido. Assicurati di utilizzare l\'ultima versione del template.',
      importHashRequired: 'Hash di importazione richiesto',
      importHashExistent: 'Dati già importati',
    },
  },

  errors: {
   Invalidnonce: "Nonce non valido",
Invalidsignature: "Firma non valida",
frozenDuringExecution: "Impossibile eseguire {{operation}}. Il tuo portafoglio perpetuo {{currency}} è attualmente congelato. Contatta l'assistenza clienti.",
insufficientorfrozen: "Fondi insufficienti nel portafoglio dopo la validazione o portafoglio congelato",
notFounds: "Portafoglio {{currency}} non trovato. Contatta l'assistenza.",
frozen: "Il tuo portafoglio {{currency}} è attualmente congelato. Contatta l'assistenza clienti per sbloccare il tuo account.",
frozenWithFunds: "Il tuo portafoglio {{currency}} è congelato. Hai {{frozenAmount}} {{currency}} congelati e {{availableAmount}} {{currency}} disponibili. Contatta l'assistenza clienti per sbloccare il tuo account.",
insufficientBalance: "Saldo {{currency}} insufficiente. Richiesto: {{requested}}, Disponibile: {{available}}.",
insufficientWithFrozen: "Saldo disponibile {{currency}} insufficiente. Richiesto: {{requested}}, Disponibile: {{available}}, Congelato: {{frozen}}, Totale: {{total}}. Contatta l'assistenza per sbloccare i tuoi fondi.",
walletNotFound: "Portafoglio non trovato per questo asset",
withdrawinsufficientBalance: "Saldo insufficiente per questo prelievo.",
futuresAlreadyFinalized: "Questa voce futures è già finalizzata e non può essere modificata.",
usdtWalletNotFound: "Portafoglio USDT non trovato",
usdtWalletFrozen: "Il portafoglio trading USDT è congelato",
insufficientusdtWallet: "Saldo USDT insufficiente nel portafoglio trading",
usdtWalletorfrozen: "Fondi insufficienti nel portafoglio dopo la validazione o portafoglio congelato",
usdtWalletNotFoundForUser: "Portafoglio USDT non trovato per l'utente {{userId}}",
closingPriceExceedLimit: "Il prezzo di chiusura non può superare $100",
profitAmountInvalid: "L'importo del profitto è zero o non valido.",
amountConditions: 'L\'importo dei futures deve essere almeno 200 USDT',
lossAmountInvalid: "L'importo della perdita è zero o non valido.",
passwordNotMatching: "La password non corrisponde",
insufficientBalanceUpgrade: "Saldo insufficiente. Aggiorna.",
walletNotFoundForCurrency: "Portafoglio non trovato per {{currency}}",
insufficientBalanceWithAmounts: "Saldo insufficiente. Hai {{currentAmount}} {{currency}} ma stai cercando di fare staking di {{tryingAmount}} {{currency}}",
stakingPlanNotAvailable: "Questo piano di staking non è ancora disponibile",
stakingPlanExpired: "Questo piano di staking è scaduto",
invalidUserBalance: "Saldo non valido per l'utente corrente",
invalidRequestAmount: "Importo della richiesta non valido",
unsupportedCurrency: "Valuta non supportata",
alreadySubscribedToVip: "Sei già iscritto a questo vip",
insufficientBalancePleaseUpgrade: "Saldo insufficiente, aggiorna",
resetAccountContactSupport: "Reimposta il tuo account. Contatta l'assistenza clienti",
contactCustomerService: "Dovresti contattare il servizio clienti per questo",
pleaseWriteAmount: "Inserisci l'importo",
withdrawalExceedsBalance: "Sembra che l'importo del prelievo superi il tuo saldo",
withdrawPasswordIncorrect: "La tua password di prelievo non è corretta, controlla di nuovo",
    notFound: {
      message: 'Non trovato',
    },
    forbidden: {
      message: 'Vietato',
    },
    validation: {
      message: 'Si è verificato un errore',
    },
  },

  email: {
    error: `Il provider email non è configurato.`,
  },

  preview: {
    error:
      'Spiacenti, questa operazione non è consentita in modalità anteprima.',
  },

};

export default it;
