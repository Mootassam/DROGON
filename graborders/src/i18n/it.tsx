

const it = {
    app: {
        title: "The Light Cinema"
    },


    common: {
        timeout: "Timeout della richiesta",
        requestAborted: "Richiesta annullata",
        fetchError: "Errore nel recupero dei dati di mercato",
        dateNotAvailable: "Data non disponibile",
        currencyFormat: "${0}",
        invalidDate: "Data non valida",
        invalidTime: "Ora non valida",
        unknown: "Sconosciuto",
        na: "N/D",
        back: "Indietro",
        close: "Chiudi",
    },


    inputs: {
        username: "Nome utente",
        password: "password",
        phoneNumber: "Numero di telefono",
        withdrawPassword: "Password di prelievo",
        confirmPassword: "Conferma password",
        invitationcode: "Codice di invito",
        walletaddress: "Indirizzo del portafoglio"

    },


    components: {
        bottomNav: {
            home: "Home",
            market: "Mercato",
            trade: "Trading",
            futures: "Futures",
            wallets: "Portafogli"
        },
        coinListModal: {
            title: "Seleziona Criptovaluta",
            loading: "Caricamento dati criptovalute...",
            noResults: "Nessuna criptovaluta trovata",
            popular: "Popolari",
            search: {
                placeholder: "Cerca criptovalute..."
            }
        }
    },

    auth: {
signin: {
  title: "ACCESSO",
  button: "Accedi",
  signingIn: "Accesso in corso...",
  forgotPassword: "PASSWORD DIMENTICATA?",
  signUp: "REGISTRATI",
  orContinueWith: "o continua con",
  downloadApp: "SCARICA LA NOSTRA APP",
  appDescription: "Ottieni la migliore esperienza crypto sul tuo dispositivo mobile",
  googlePlay: "Google Play",
  signupNow: "Registrati ora",
  forgetPassword: "Password dimenticata",
  orSeparator: "O",
  connectingWallet: "Connessione wallet...",
  loginWithWallet: "Accedi con wallet",
  walletNotDetected: "Wallet Web3 non rilevato",
  installWalletMessage: "Installa MetaMask o un altro wallet Web3 per utilizzare questa funzione",
  walletSupport: "Supporta MetaMask, Coinbase Wallet, ecc.",
  mailTab: "Mail",
  phoneTab: "Telefono",
  backButton: "Indietro",
},fields: {
  mailbox: "La tua casella di posta",
  password: "La tua password",
  emailPlaceholder: "Inserisci il tuo indirizzo email",
  passwordPlaceholder: "Inserisci la tua password",
},

wallet: {
  installRequired: "Installa MetaMask o un altro wallet Web3",
  connectionRejected: "La connessione al wallet è stata rifiutata",
  wrongNetwork: "Connettiti alla rete corretta",
  connectionFailed: "Connessione al wallet non riuscita",
  nonceError: "Impossibile ottenere il nonce dal server",
  verificationFailed: "Verifica non riuscita",
},

common: {
  selectLanguage: "Seleziona lingua",
  rememberPassword: "Ricorda la mia password",
},




        tenants: "Workspace",
        singindesc: "Inserisci email e password per accedere",
        signupdesc: "Inserisci email e password per registrarti",
        profile: {
            title: "Profilo",
            success: "Profilo aggiornato con successo",
            vip: "Congratulazioni per l'abbonamento",
            wallet: "Impostazioni prelievo completate.",
        },
        createAnAccount: "Crea un account",
        rememberMe: "Ricordami",
        forgotPassword: "Password dimenticata",

        signup: "Registrati",
        signout: "Disconnetti",
        alreadyHaveAnAccount: "Hai già un account? Accedi.",
        social: {
            errors: {
                "auth-invalid-provider": "Questa email è già registrata con un altro provider.",
                "auth-no-email": "L'email associata a questo account è privata o inesistente.",
            },
        },
        signinWithAnotherAccount: "Accedi con un altro account",
        emailUnverified: {
            message: "Conferma la tua email a <strong>{0}</strong> per continuare.",
            submit: "Reinvia verifica email",
        },
        emptyPermissions: {
            message: "Non hai ancora permessi. Attendi che l'amministratore ti conceda i privilegi.",
        },
        passwordResetEmail: {
            message: "Invia email reset password",
            error: "Email non riconosciuta",
        },
        passwordReset: {
            message: "Reimposta password",
        },
        passwordChange: {
            title: "Cambia Password",
            success: "Password cambiata con successo",
            mustMatch: "Le password devono corrispondere",
        },
        emailAddressVerificationEmail: {
            error: "Email non riconosciuta",
        },
        verificationEmailSuccess: "Email di verifica inviata con successo",
        passwordResetEmailSuccess: "Email di reset password inviata con successo",
        passwordResetSuccess: "Password cambiata con successo",
        verifyEmail: {
            success: "Email verificata con successo.",
            message: "Un attimo, la tua email è in fase di verifica...",
        },
    },

    user: {
        fields: {
            gender: "Genere",
            captcha: "Captcha",
            username: "Nome utente",
            walletName: "Nome portafoglio",
            id: "ID",
            confirmPassword: "Conferma Password",
            avatars: "Avatar",
            invitationcode: "Codice invito",
            email: "Email",
            emails: "Email",
            erc20: "Indirizzo portafoglio ERC20",
            trc20: "Indirizzo portafoglio TRC20",
            fullName: "Nome",
            balance: "Saldo",
            firstName: "Nome",
            lastName: "Cognome",
            status: "Stato",
            phoneNumber: "Numero di telefono",
            withdrawPassword: "Password prelievo",
            sector: "Settore",
            employer: "Datore di lavoro",
            profession: "Professione",
            address: "Indirizzo",
            birthDate: "Data di nascita",
            maritalStatus: "Stato civile",
            facebookLink: "Link Facebook",
            sponsor: "Sponsor",
            role: "Ruolo",
            createdAt: "Creato il",
            updatedAt: "Aggiornato il",
            roleUser: "Ruolo/Utente",
            roles: "Ruoli",
            createdAtRange: "Creato il",
            password: "Password",
            oldPassword: "Vecchia Password",
            newPassword: "Nuova Password",
            newPasswordConfirmation: "Conferma Nuova Password",
            rememberMe: "Ricordami",
        },
        sector: {
            AGRO_ALIMENTAIRE: "Industria alimentare",
            ASSURANCES: "Assicurazioni",
            AUDIOVISUEL: "Audiovisivo",
            BANCAIRE: "Bancario",
            CHIMIE: "Chimica",
            COMPOSANTS_AUTOMOBILES: "Componenti automobilistici",
            DISTRIBUTION: "Distribuzione",
            DISTRIBUTION_AUTOMOBILE: "Distribuzione automobilistica",
            DIVERS: "Varie",
            FINANCIER: "Finanziario",
            HOLDING: "Holding",
            IMMOBILIER: "Immobiliare",
            INDUSTRIEL: "Industriale",
            LEASING: "Leasing",
            LOGISTIQUE_TRANSPORT: "Logistica e trasporti",
            PHARMACEUTIQUE: "Farmaceutico",
            SANTÉ: "Salute",
            TOURSIME: "Turismo",
            INFORMATION_TECHNOLOGY: "Tecnologia informatica",
        },
        maritalStatus: {
            célébataire: "Single",
            marié: "Sposato",
        },
        status: {
            active: "Attivo",
            invited: "Invitato",
            "empty-permissions": "In attesa di permessi",
            inactive: "Inattivo",
        },

        enumerators: {
            status: {
                USD: "USD",
                ETH: "ETH",
                BTC: "BTC",
            },
            gender: {
                male: "Maschio",
                female: "Femmina",
            }
        },
        invite: "Invita",
        validations: {
            email: "Email ${value} non valida",
        },
        title: "Utenti",
        menu: "Utenti",
        doAddSuccess: "Utente/i salvati con successo",
        doUpdateSuccess: "Utente salvato con successo",
        exporterFileName: "esportazione_utenti",
        doDestroySuccess: "Utente eliminato con successo",
        doDestroyAllSelectedSuccess: "Utenti eliminati con successo",
        edit: {
            title: "Modifica Utente",
        },
        new: {
            title: "Invita Utente/i",
            titleModal: "Invita Utente",
            emailsHint: "Separa più indirizzi email con la virgola.",
        },
        view: {
            title: "Visualizza Utente",
            activity: "Attività",
        },
        importer: {
            title: "Importa Utenti",
            fileName: "modello_importazione_utenti",
            hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio. Le relazioni devono essere gli ID dei record referenziati separati da spazio. I ruoli devono essere gli ID ruolo separati da spazio.",
        },
        errors: {
            userAlreadyExists: "Utente con questa email già esistente",
            userNotFound: "Utente non trovato",
            revokingOwnPermission: "Non puoi revocare il tuo permesso di amministratore",
        },
    },



    stake: {
        enterAmount: "Inserisci un importo",
        insufficientBalance: "Saldo insufficiente",
        minAmount: "Min: {{min}}",
        maxAmount: "Max: {{max}}",
        confirmStake: "Conferma Stake"
    },


  pages: {
    helpCenter: {
      title: "Centro Assistenza",
      faq: {
        aboutAccounts: "Informazioni su account ufficiali e demo",
        transactionVolume: "Cos'è il volume di transazioni?",
        transferFunds: "Perché trasferire fondi?",
        whatAreFutures: "Cosa sono i Futures?",
        convertedAmountChanges: "Perché l'importo convertito nelle attività cambia?",
        realNameAuthentication: "Perché è richiesta l'autenticazione del nome reale?",
        frozenAssets: "Cosa sono le attività bloccate?",
        futuresTradingRules: "Quali sono le regole del trading sui futures?"
      }
    },

    helpCenterDetail: {
      faqNotFound: "Elemento FAQ non trovato, necessaria redirezione",
      
      questions: {
        aiQuantification: "Introduzione alla Quantificazione AI",
        exploreNFTs: "Esplora NFT con AureX",
        bitcoinEnergy: "Elon Musk Dice che il Bitcoin è Basato sull'Energia, Impossibile da Falsificare\n13/10/2025, 8:00:00 AM (UTC-8)",
        bitcoinRecordPrice: "Bitcoin Toccato Prezzo Record Oltre $125.000\n4/10/2025, 8:00:00 AM (UTC-8)",
        trumpStatueBitcoin: "Statua gigante di Trump che tiene Bitcoin esposta fuori dal Campidoglio degli USA per segnare la decisione sui tassi della Fed\n16/9/2025, 8:00:00 AM (UTC-8)"
      },
      
      answers: {
        aboutAccounts: "Gli account formali possono utilizzare tutte le funzioni online della piattaforma, mentre gli account demo possono utilizzare solo alcune funzioni della piattaforma in modo limitato, non possono utilizzare il liquidity mining per realizzare profitti e non possono depositare e prelevare monete. (Gli account demo possono ricevere fondi virtuali fissi una volta al mese il giorno 1)",
        transactionVolume: "Secondo le disposizioni pertinenti della Legge Antiriciclaggio, ogni transazione richiede il controllo dei prezzi, e un certo volume di transazioni deve essere completato prima che la valuta possa essere prelevata, per impedire agli utenti di riciclare denaro sull'exchange. Ad esempio, se depositate 10.000U, l'importo della transazione deve raggiungere l'importo specificato rilevante!",
        transferFunds: "Per garantire l'indipendenza dei fondi tra i vostri vari account e facilitare il vostro ragionevole controllo del rischio, gli account dei principali moduli di trading sono divisi. Il trasferimento si riferisce al processo di conversione delle attività tra vari account di trading.",
        whatAreFutures: "I futures, noti anche come contratti a termine, sono una forma di trading che si estende nel tempo. Acquirenti e venditori firmano un contratto per concordare di consegnare una quantità specificata di beni spot a un tempo, prezzo e altre condizioni di trading specificati. I futures sono solitamente concentrati nelle borse di futures e vengono acquistati e venduti con contratti standardizzati. Le attività negoziate sono solitamente materie prime o strumenti finanziari. Il prezzo predeterminato che entrambe le parti concordano per acquistare e vendere un'attività è chiamato prezzo forward.",
        convertedAmountChanges: "Il valore convertito nelle attività è il valore della valuta digitale attualmente detenuta in USD. Cambia a causa delle fluttuazioni di prezzo delle attività digitali, ma l'importo delle vostre attività digitali non cambia.",
        realNameAuthentication: "Per la sicurezza dei vostri fondi, limitiamo l'associazione del vostro account ricevente con le informazioni del nome reale del vostro account corrente.",
        frozenAssets: "Le attività bloccate significano che quando eseguite transazioni o operazioni di prelievo, il processo non è completamente completato. Le attività correnti sono temporaneamente gestite dal sistema e non possono essere liberamente controllate da voi. Non significa che abbiate perso l'attività o che qualcosa sia anormale con l'attività. Per favore state tranquilli.",
        futuresTradingRules: "Partecipate alle transazioni stimando la prossima tendenza del prezzo (in aumento o in diminuzione) della coppia di trading corrente. L'entità dell'aumento o della diminuzione non viene calcolata durante la liquidazione, e solo il reddito viene calcolato in base al risultato dell'aumento o della diminuzione. Le percentuali di profitto per la liquidazione in diversi tempi di consegna sono diverse, e i profitti saranno accuratamente visualizzati nell'interfaccia di trading.",
        aiQuantification: "Un robot di trading quantitativo AI è un sistema di trading automatizzato che combina l'intelligenza artificiale (AI) con le tecniche di trading quantitativo. La sua funzione principale è acquistare e vendere automaticamente prodotti finanziari e criptovalute in base ai dati di mercato e a specifiche strategie di trading per ottenere profitti stabili o controllare i rischi.",
        exploreNFTs: "Entra nel mondo degli NFT con AureX, il tuo portafoglio di trading di asset digitali tutto in uno. Progettato sia per principianti che per trader professionisti, AureX ti permette di esplorare, acquistare, vendere e gestire NFT di alta qualità in modo sicuro ed efficiente.\n\nCon sicurezza avanzata, monitoraggio in tempo reale e transazioni senza interruzioni, AureX ti mantiene in pieno controllo dei tuoi oggetti da collezione digitali. Da pezzi d'arte esclusivi a asset digitali in edizione limitata, scopri il futuro della proprietà digitale — tutto in un unico posto, con fiducia e facilità.",
        bitcoinEnergy: "Il CEO di Tesla e Spacex Elon Musk ha detto il 14 ottobre su X che bitcoin è basato sull'energia, contrapponendolo alle valute fiat che i governi possono gonfiare. La sua osservazione era in risposta a un post di Zerohedge che collegava l'aumento dei prezzi di oro, argento e bitcoin alla svalutazione monetaria guidata dalla spesa governativa per la corsa agli armamenti dell'intelligenza artificiale globale. Zerohedge ha aggiunto che il denaro può essere stampato ma l'energia no. Musk ha concordato, scrivendo: 'Vero. Ecco perché bitcoin è basato sull'energia: puoi emettere valuta fiat falsa, e ogni governo nella storia lo ha fatto, ma è impossibile falsificare l'energia.'\n\nCosa ha detto Elon Musk su bitcoin ed energia?\nElon Musk ha dichiarato che Bitcoin è basato sull'energia, sottolineando che mentre i governi possono stampare valuta fiat, l'energia non può essere falsificata o creata artificialmente.\n\nPerché Elon Musk ha contrapposto bitcoin alle valute fiat?\nMusk ha evidenziato che le valute fiat sono soggette all'inflazione perché i governi possono emetterne di più, mentre la base di bitcoin nell'energia gli dà una base di valore più tangibile e limitata.\n\nQual era il contesto del commento di Musk su bitcoin?\nIl suo commento ha risposto a un post di Zerohedge che suggeriva che i prezzi crescenti di oro, argento e bitcoin sono collegati alla spesa governativa globale e alla svalutazione monetaria causata dalla corsa agli armamenti dell'IA.\n\nQual è il punto principale della dichiarazione di Musk?\nL'osservazione di Musk rafforza l'idea che il valore di bitcoin sia radicato nel costo reale dell'energia, contrapponendolo alla natura facilmente manipolabile del denaro fiat tradizionale.",
        bitcoinRecordPrice: "Bitcoin ha raggiunto un nuovo massimo.\n\nLa principale criptovaluta ha toccato un record durante la notte, raggiungendo massimi storici intorno a $125.400 per superare il precedente massimo di circa $124.480, stabilito ad agosto. (Più recentemente è stata scambiata vicino a $123.000.)\n\nGli ultimi movimenti hanno il valore di mercato totale di bitcoin a circa $2,45 trilioni, secondo CoinMarketCap, e il valore totale delle cripto a circa $4,21 trilioni. Bitcoin ha avuto un anno drammatico, risalendo da prezzi inferiori a $80.000 visti ad aprile.\n\nMentre i toro di bitcoin generalmente hanno visto la continua salita della valuta come inevitabile, alcuni hanno avuto ragioni più specifiche per prevedere ulteriori rialzi alla fine del 2025. Ha una storia di stabilire nuovi record nella finestra di 1.064 giorni dopo i minimi del mercato orso, l'ultimo dei quali è stato il 21 novembre 2022.\n\nNel frattempo, i volumi di trading di bitcoin sugli exchange di cripto sono aumentati da un calo di fine settembre. I volumi crescenti tendono ad essere buoni per i prezzi.\n\nAlcuni analisti vedono ragioni per aspettarsi che bitcoin continui a salire. Gli analisti di JPMorgan in una nota del 1 ottobre hanno suggerito che il 'trade di svalutazione' — in cui sia gli investitori al dettaglio che istituzionali coprono le loro scommesse con oro e bitcoin — prenda slancio tra preoccupazioni che vanno dall'aumentata incertezza geopolitica all'elevato debito governativo persistente tra le economie e il dominio in calo del dollaro USA.\n\nPiù in generale, gli sviluppi recenti hanno suggerito che l'industria delle cripto sta facendo progressi continui mentre cerca di rivendicare più dollari degli investitori e una posizione nel mondo della finanza — tra questi il lancio di diversi nuovi ETF cripto e l'aumento della popolarità delle azioni del tesoro cripto.",
        trumpStatueBitcoin: "WASHINGTON (7News) — Una statua dorata di 12 piedi del presidente Donald Trump che tiene un Bitcoin è stata installata fuori dal Campidoglio degli Stati Uniti, coincidendo con la prossima decisione sui tassi di interesse della Federal Reserve di mercoledì.\n\nAlle 14:00, la Fed ha annunciato di aver ridotto il suo tasso di interesse chiave di un quarto di punto, segnando il primo taglio dal dicembre 2024. Il taglio abbasserà il tasso a breve termine a circa il 4,1% dal 4,3%. L'anno scorso, la banca centrale ha abbassato i tassi tre volte a causa delle preoccupazioni che la crescita dell'occupazione stesse rallentando e la disoccupazione stesse aumentando.\n\nLa banca centrale ha anche rivelato piani per altri due tagli dei tassi quest'anno. Tuttavia, se ne prevede solo uno nel 2026, il che potrebbe deludere Wall Street, poiché si aspettavano cinque tagli entro il prossimo anno.\n\nL'opera temporanea, situata sulla 3a Strada dalle 9:00 alle 16:00, è stata finanziata da un collettivo di investitori in criptovalute. Gli organizzatori hanno detto che l'opera è intesa a provocare un dibattito sul futuro della valuta digitale, la politica monetaria e il ruolo del governo federale nei mercati finanziari."
      }
    },
    
    transfer: {
      title: "Cronologia Trasferimenti",
      noTransferHistory: "Nessuna cronologia di trasferimento disponibile",
      accountTypes: {
        trade: "Account Trading",
        perpetual: "Account Perpetual",
        exchange: "Account Exchange"
      },
      status: {
        completed: "Completato"
      }
    },
    
    settings: {
      title: "Impostazioni",
      language: "Lingua",
      quotationCurrency: "Valuta di quotazione",
      colorConfiguration: "Configurazione colori",
      aboutUs: "Chi siamo",
      versionNumber: "Numero versione",
      selected: "Selezionato",
      colorSchemes: {
        greenRiseRedFall: {
          name: "Verde sale, Rosso scende",
          alt: "Schema colori grafico Verde sale, Rosso scende",
          description: "Colori trading tradizionali: verde per aumenti di prezzo, rosso per diminuzioni di prezzo"
        },
        redRiseGreenFall: {
          name: "Rosso sale, Verde scende",
          alt: "Schema colori grafico Rosso sale, Verde scende",
          description: "Colori trading alternativi: rosso per aumenti di prezzo, verde per diminuzioni di prezzo"
        }
      },
      modals: {
        language: {
          title: "Seleziona Lingua"
        },
        colorConfiguration: {
          title: "Configurazione Colori"
        }
      }
    },
    
    wallet: {
      myAssets: "Le mie attività",
      assetValuation: "Valutazione attività",
      myAccount: "Il mio account",
      showAmounts: "Mostra importi",
      hideAmounts: "Nascondi importi",
      usdEquivalent: "≈ USD {0}",
      noAssetsFound: "Nessuna attività trovata",
      quickActions: {
        withdraw: "Preleva",
        deposit: "Deposita",
        transfer: "Trasferisci",
        swap: "Scambia"
      },
      accountTabs: {
        exchange: "Exchange",
        trade: "Trading",
        perpetual: "Perpetual"
      },
      assetLabels: {
        availableBalance: "Saldo disponibile",
        frozenAmount: "Importo bloccato",
        valuation: "Valutazione"
      },
      errors: {
        fetchAssets: "Errore nel recupero delle attività:"
      }
    },
    
    loginPassword: {
      title: "Password di Accesso",
      cardTitle: "CAMBIA PASSWORD DI ACCESSO",
      fields: {
        oldPassword: "Vecchia Password",
        newPassword: "Nuova Password",
        newPasswordConfirmation: "Conferma Password",
        mailbox: "La tua casella di posta"
      },
      placeholders: {
        oldPassword: "Inserisci la tua password attuale",
        newPassword: "Crea una nuova password",
        confirmPassword: "Conferma la tua nuova password"
      },
      buttons: {
        saveChanges: "SALVA CAMBIAMENTI"
      },
      warningMessage: "Per la sicurezza dei tuoi fondi, i prelievi non sono consentiti entro 24 ore dalla modifica della password di accesso.",
      validation: {
        mustMatch: "Le password devono corrispondere"
      }
    },
    
    futures: {
      title: "Futures",
      actions: {
        buyUp: "COMPRA AL RIALZO",
        buyDown: "COMPRA AL RIBASSO"
      },
      tabs: {
        openOrders: "Ordini Aperti",
        recentOrders: "Ordini Recenti"
      },
      orderDetails: {
        title: "Dettagli Ordine",
        open: "Aperto",
        closed: "Chiuso",
        completed: "Completato",
        futuresAmount: "Importo Futures:",
        contractDuration: "Durata Contratto:",
        seconds: "Secondi",
        futuresStatus: "Stato Futures:",
        openPositionPrice: "Prezzo Apertura Posizione:",
        openPositionTime: "Ora Apertura Posizione:",
        closePositionPrice: "Prezzo Chiusura Posizione:",
        closePositionTime: "Ora Chiusura Posizione:",
        profitLossAmount: "Importo Guadagno e Perdita:",
        leverage: "Leva:",
        done: "Fatto"
      },
      status: {
        open: "Aperto",
        closed: "Chiuso",
        completed: "Completato"
      },
      list: {
        noOrders: "Nessun ordine"
      }
    },
    
    proof: {
      title: "Verifica Identità",
      instructions: "Verifica la tua identità per accedere a tutte le funzioni del tuo Icmarkets",
      sections: {
        documentInfo: "Informazioni Documento",
        documentUpload: "Caricamento Documento"
      },
      fields: {
        documentType: "Tipo Documento",
        fullName: "Nome Completo",
        documentNumber: "Numero Documento",
        address: "Indirizzo",
        frontSide: "Fronte Documento",
        backSide: "Retro Documento",
        selfie: "Selfie con Documento"
      },
      placeholders: {
        fullName: "Inserisci il tuo nome completo",
        documentNumber: "Inserisci il numero del documento",
        address: "Inserisci il tuo indirizzo completo"
      },
      uploadTexts: {
        frontSide: "Carica il fronte del tuo documento",
        backSide: "Carica il retro del tuo documento",
        selfie: "Carica un selfie che mostra il tuo documento"
      },
      documentTypes: {
        passport: "Passaporto",
        idCard: "Carta d'Identità",
        driversLicense: "Patente di Guida"
      },
      security: {
        title: "Avviso di Sicurezza",
        text: "Le tue informazioni sono crittografate e sicure. Utilizziamo protezione di livello bancario e verifichiamo manualmente ogni documento per la tua sicurezza."
      },
      buttons: {
        validateDocuments: "Valida Documenti"
      },
      footer: {
        copyright: "© 2025 CryptoWallet. Tutti i diritti riservati.",
        privacyPolicy: "Politica sulla Privacy"
      }
    },
    
    withdrawPassword: {
      title: "Password Prelievo",
      cardTitle: "CAMBIA PASSWORD PRELIEVO",
      fields: {
        currentPassword: "Password Attuale",
        newPassword: "Nuova Password"
      },
      placeholders: {
        currentPassword: "Inserisci la tua vecchia password",
        newPassword: "Conferma la tua nuova password"
      },
      buttons: {
        saveChanges: "SALVA CAMBIAMENTI"
      },
      warningMessage: "Per la sicurezza dei tuoi fondi, i prelievi non sono consentiti entro 24 ore dalla modifica della password di accesso."
    },
    
    marketDetail: {
      stats: {
        high: "Massimo 24h",
        low: "Minimo 24h",
        volume: "Volume 24h"
      },
      volume: {
        billion: "Mld",
        million: "Mln"
      },
      actions: {
        buy: "COMPRA",
        sell: "VENDI"
      },
      recentTrades: {
        title: "Trade Recenti (Live)",
        price: "Prezzo (USD)",
        amount: "Importo",
        time: "Ora"
      },
      tabs: {
        orderBook: "Libro Ordini",
        transactions: "Ultima transazione"
      },
      orderBook: {
        buy: "Compra",
        sell: "Vendi",
        quantity: "Quantità",
        price: "Prezzo (USD)"
      },
      coinSelector: {
        title: "Seleziona Coppia di Trading"
      },
      setupWebsockets: "Configurazione WebSockets per:",
      websocketConnected: "WebSocket connesso per:",
      websocketParseError: "Errore nell'analisi dei dati WebSocket:",
      websocketError: "Errore WebSocket per",
      websocketClosed: "WebSocket chiuso per:",
      websocketCloseError: "Errore nella chiusura del WebSocket:",
      websocketCreateError: "Errore nella creazione del WebSocket:",
      code: "Codice:",
      reconnecting: "Riconnessione WebSocket per:",
      cleaningUp: "Pulizia WebSockets per:",
      initialDataLoaded: "Dati iniziali caricati per:",
      fetchError: "Errore nel recupero dei dati iniziali per",
      selectingCoin: "Selezione nuova moneta:"
    },
    
    passwordType: {
      title: "Tipo Password",
      cardTitle: "SELEZIONA TIPO PASSWORD",
      options: {
        login: {
          title: "Password di Accesso",
          description: "Cambia la password di accesso del tuo account"
        },
        withdrawal: {
          title: "Password Prelievo",
          description: "Cambia la tua password per prelievi cripto"
        }
      }
    },
    
    profile: {
      title: "Centro Personale",
      user: "Utente",
      userInitial: "U",
      userId: "ID",
      status: {
        verified: "Verificato",
        unverified: "Non Verificato"
      },
      verification: {
        kycStatus: "Stato KYC:",
        redirecting: "Reindirizzamento alla pagina di verifica...",
        pendingReview: "La verifica è in attesa di revisione...",
        pendingAlert: "La tua verifica è in attesa di revisione. Attendi l'approvazione.",
        alreadyVerified: "Utente già verificato",
        pending: {
          title: "Verifica in Attesa",
          description: "La verifica del tuo account è in corso. Di solito richiede 1-3 giorni lavorativi.",
          status: "Revisione in Attesa",
          button: "In Attesa"
        },
        alert: {
          title: "Account Non Verificato",
          description: "Verifica il tuo account per sbloccare tutte le funzioni e limiti più alti",
          verifyNow: "Verifica Ora"
        }
      },
      accountInfo: {
        title: "INFORMAZIONI ACCOUNT",
        email: "Email",
        creditScore: "Punteggio di Credito",
        invitationCode: "Codice Invito"
      },
      pendingVerifications: {
        title: "VERIFICHE IN ATTESA",
        identity: {
          title: "Verifica Identità",
          description: "Invia il tuo documento d'identità"
        },
        address: {
          title: "Verifica Indirizzo",
          description: "Verifica la tua residenza"
        },
        status: {
          pending: "In Attesa"
        }
      },
      approvedVerifications: {
        title: "VERIFICHE APPROVATE",
        identity: {
          title: "Verifica Identità"
        },
        address: {
          title: "Verifica Indirizzo"
        },
        status: {
          completed: "Completato"
        }
      },
      limitations: {
        title: "Limitazioni Account",
        withdrawalLimit: "Limite prelievo: $1.000 al giorno",
        stakingLimited: "Opzioni staking limitate",
        advancedTrading: "Funzioni trading avanzate disabilitate",
        fiatDeposits: "Depositi in valuta fiat non disponibili"
      },
      menu: {
        withdrawalAddress: "Registri cambi account",
        password: "Centro sicurezza",
        notifications: "Notifiche",
        myInvitation: "Il Mio Invito",
        language: "Lingua",
        helpcenter: "Centro Assistenza",
        privacyPortal: "Portale Privacy",
        aboutUs: "Presentazione piattaforma",
        msbApproval: "Approvazione MSB",
        customerSupport: "Servizio online",
        downloadApp: "Scarica",
        logout: "Esci",
        preferences: "Preferenze",
        clearCache: "Pulisci cache"
      },
      cache: {
        clearing: "Pulizia cache...",
        cleared: "Cache pulita con successo!"
      },
      simulatedTrading: {
        toggle: "Trading simulato {0}"
      }
    },
    
    trade: {
      coinSelector: {
        title: "Seleziona Coppia di Trading"
      },
      title: "SPOT",
      buy: "COMPRA",
      sell: "VENDI",
      long: "COMPRA AL RIALZO",
      short: "COMPRA AL RIBASSO",
      limit: "LIMITE",
      market: "MERCATO",
      orderType: "Tipo Ordine",
      price: "Prezzo (USD)",
      amount: "Importo",
      available: "Disponibile",
      placing: "Inserimento...",
      increasePrice: "aumenta prezzo",
      decreasePrice: "diminuisci prezzo",
      tradingPeriod: "Periodo Trading",
      leverage: "Leva",
      tradingMode: {
        trade: "Trading",
        perpetual: "Perpetual"
      },
      tabs: {
        positions: "Posizioni",
        historyOrders: "Cronologia ordini",
        transactionHistory: "Cronologia transazioni"
      },
      orderDetails: {
        status: "Stato",
        price: "Prezzo",
        amount: "Importo",
        total: "Totale"
      },
      futuresDetails: {
        amount: "Importo",
        duration: "Durata",
        entryPrice: "Prezzo Ingresso",
        exitPrice: "Prezzo Uscita",
        pnl: "Guadagno/Perdita",
        opened: "Aperto",
        closed: "Chiuso"
      },
      futuresStatus: {
        long: "Al Rialzo",
        short: "Al Ribasso",
        closed: "Chiuso",
        liquidated: "Liquidato"
      },
      cancel: "Annulla",
      errors: {
        invalidQuantity: "Inserisci una quantità valida.",
        invalidPrice: "Inserisci un prezzo valido.",
        invalidAmount: "Inserisci un importo valido.",
        insufficientUSD: "Saldo USD insufficiente. Disponibile: {0} USD",
        insufficientCoin: "Saldo {1} insufficiente. Disponibile: {0} {1}",
        failedOrder: "Impossibile inserire l'ordine. Riprova.",
        createError: "Errore creazione trade",
        placeOrderError: "Errore inserimento ordine"
      },
      orderBook: {
        price: "Prezzo (USD)",
        amount: "Importo"
      },
      noData: "Nessun {0} trovato",
      noTransactionsText: "Le tue transazioni appariranno qui",
      noOrdersText: "I tuoi {0} appariranno qui",
      websocketConnected: "WebSocket connesso:",
      websocketParseError: "Errore nell'analisi dei dati WebSocket:",
      websocketError: "Errore WebSocket:",
      websocketClosed: "WebSocket chiuso",
      websocketCreateError: "Errore nella creazione del WebSocket:",
      orderNumberFormat: "ORD-{0}-{1}"
    },
    
    market: {
      title: "MERCATO USD",
      noResults: "Nessuna criptovaluta trovata",
      volume: "Vol",
      search: {
        placeholder: "Cerca cripto...",
        clear: "Pulisci ricerca"
      },
      tableHeaders: {
        pair: "Coppia di Trading",
        latestPrice: "Ultimo Prezzo",
        change24h: "Variazione 24H"
      },
      websocketConnected: "WebSocket del Mercato connesso",
      websocketParseError: "Errore nell'analisi dei dati WebSocket",
      websocketError: "Errore WebSocket del Mercato",
      websocketClosed: "WebSocket del Mercato chiuso, codice:",
      websocketSetupError: "Errore nella configurazione del WebSocket"
    },
    
    signup: {
      title: "REGISTRATI",
      creatingAccount: "CREAZIONE...",
      createAccount: "CREA ACCOUNT",
      refresh: "Aggiorna",
      captchaMismatch: "Il captcha non corrisponde",
      alreadyHaveAccount: "Hai già un account? Accedi",
      terms: {
        text: "Creando un account, accetti i nostri",
        link: "Termini di Servizio"
      },
      labels: {
        email: "Email",
        phoneNumber: "Numero di Telefono",
        captcha: "Captcha Grafico",
        password: "Password",
        confirmPassword: "Conferma Password",
        withdrawPassword: "Password Prelievo",
        invitationCode: "Codice Invito"
      },
      placeholders: {
        email: "Inserisci la tua email",
        phoneNumber: "Inserisci il tuo numero di telefono",
        captcha: "Inserisci codice",
        password: "Crea una password",
        confirmPassword: "Conferma la tua password",
        withdrawPassword: "Inserisci la password prelievo",
        invitationCode: "Inserisci codice invito"
      }
    },
    
    home: {
      logoAlt: "Logo Icmarkets",
      headerAlt: "Piattaforma Trading Cripto",
      slogan: "Profitta con Sicurezza",
      promoAlt: "Banner promozionale {0}",
      quickTrade: {
        highlight: "Veloce",
        title: "Trading",
        subtitle: "Transazioni veloci e operazione semplice"
      },
      aiTrading: {
        title: "Trading Intelligente AI",
        description: "Un robot di trading quantitativo AI è un sistema di trading automatizzato che combina l'intelligenza artificiale (AI) con tecniche di trading quantitativo. La sua funzione principale è acquistare e vendere automaticamente prodotti finanziari e criptovalute in base ai dati di mercato e a specifiche strategie di trading per ottenere profitti stabili o controllare i rischi."
      },
      nftExploration: {
        title: "Esplora NFT con Icmarkets",
        description: "Entra nel mondo degli NFT con Icmarkets, il tuo portafoglio di trading di asset digitali tutto in uno. Progettato sia per principianti che per trader professionisti, Icmarkets ti permette di esplorare, acquistare, vendere e"
      },
      stats: {
        title: "Il Nostro Impatto",
        users: "30M+",
        usersLabel: "Numero di utenti",
        organizations: "6000+",
        organizationsLabel: "Organizzazione cooperante",
        liquidity: "7,8 Mld+",
        liquidityLabel: "Liquidità",
        orders: "89M",
        ordersLabel: "Ordini elaborati al secondo"
      },
      services: {
        title: "I Nostri Servizi",
        subtitle: "Ti forniamo servizi specializzati di assistenza clienti manuale 24 ore per proteggere le tue transazioni",
        highInterest: {
          title: "Alto tasso d'interesse",
          desc: "Finanza, alto tasso di rendimento",
          alt: "Icona alto tasso d'interesse"
        },
        liquidityMining: {
          title: "Liquidity mining",
          desc: "La liquidità genera profitti facili",
          alt: "Icona liquidity mining"
        },
        service24h: {
          title: "Servizio 24 ore",
          desc: "Pronto a rispondere a tutte le tue domande",
          alt: "Icona servizio 24 ore"
        },
        highContract: {
          title: "Contratto alto",
          desc: "Piccolo capitale alta leva, arricchimento facile",
          alt: "Icona contratto alto"
        },
        expertTeam: {
          title: "Team di esperti",
          desc: "Team tecnico esperto al tuo servizio",
          alt: "Icona team esperti"
        },
        securityProtection: {
          title: "Protezione sicurezza",
          desc: "Potenti dati cloud proteggono la tua sicurezza",
          alt: "Icona protezione sicurezza"
        }
      },
      demo: {
        fastSwap: {
          title: "Scambio veloce - Scambia le tue monete senza preoccupazioni",
          subtitle: "Da Bitcoin a Dogecoin, rendiamo facile comprare e vendere cripto. Proteggi la tua cripto con il miglior cold storage.",
          alt: "Demo scambio veloce"
        },
        advancedTraders: {
          title: "Per trader avanzati - Strumenti potenti per il design",
          subtitle: "Strumenti analitici potenti combinati con la nostra garanzia di sicurezza forniscono l'esperienza di trading definitiva. Approfitta di sofisticate capacità di grafici, libri ordini in tempo reale e liquidità profonda su centinaia di mercati.",
          alt: "Demo per trader avanzati"
        },
        walletManagement: {
          title: "Gestione intelligente portafoglio asset - Crescita costante del reddito",
          subtitle: "Strumenti analitici potenti combinati con la nostra garanzia di sicurezza forniscono l'esperienza di trading definitiva. Approfitta di sofisticate capacità di grafici, libri ordini in tempo reale e liquidità profonda su centinaia di mercati.",
          alt: "Demo gestione portafoglio"
        },
        liquidityMining: {
          title: "Liquidity mining, quantificazione AI",
          subtitle: "Più modi per gestire i tuoi asset, inclusi liquidity mining e quantificazione AI, ti danno più scelte per gestire i tuoi asset e mantenere i tuoi asset in crescita",
          alt: "Demo liquidity mining"
        },
        startTrading: {
          title: "Iniziare a fare trading di criptovalute? - Apri la tua criptovaluta ora",
          subtitle: "Fai trading in qualsiasi momento e luogo per soddisfare le esigenze di trading di vari scenari in qualsiasi momento",
          alt: "Demo inizio trading"
        }
      },
      news: {
        title: "Novità dal settore",
        elonMusk: {
          date: "14-10-2025",
          title: "Elon Musk Dice che il Bitcoin è Basato sull'Energia, Impossibile da Falsificare",
          alt: "Novità Elon Musk Bitcoin"
        },
        bitcoinRecord: {
          date: "05-10-2025",
          title: "Bitcoin Toccato Prezzo Record Oltre $125.000",
          alt: "Novità prezzo record Bitcoin"
        },
        trumpStatue: {
          date: "17-09-2025",
          title: "Statua gigante di Trump che tiene Bitcoin esposta fuori dal Campidoglio degli USA per segnare la decisione sui tassi della Fed",
          alt: "Novità statua Trump Bitcoin"
        }
      },
      partners: {
        title: "Partner Ecologico Mondiale",
        description: "Creare consenso e creare un nuovo futuro per l'ecosistema cripto",
        binance: "Binance",
        coinbase: "Coinbase",
        kraken: "Kraken",
        ftx: "FTX",
        bitfinex: "Bitfinex",
        huobi: "Huobi"
      },
      announcements: {
        maintenanceNotice: "Avviso di manutenzione",
        contractServerUpgrade: "Aggiornamento server contratti e avviso di manutenzione del 15 gennaio 2023",
        IcmarketsOptionsMaintenance: "Avviso di manutenzione sistema trading opzioni Icmarkets",
        clientVersionUpgrade: "Importante! Avviso di Icmarkets sull'ultimo aggiornamento versione client",
        platformTradingAnnouncement: "Ultimo annuncio trading piattaforma Icmarkets",
        platformUpgradeOptimization: "Avviso aggiornamento ottimizzazione versione piattaforma Icmarkets",
        march15Upgrade: "15 marzo 2023 Avviso ottimizzazione manutenzione aggiornamento server contratti piattaforma Icmarkets",
        optionsTradingMaintenance: "Avviso manutenzione e ottimizzazione sistema trading opzioni piattaforma Icmarkets",
        latestVersionUpgrade: "Avviso importante piattaforma Icmarkets sull'aggiornamento e ottimizzazione dell'ultima versione del client",
        userSecurityReminder: "Promemoria sulla sicurezza delle informazioni utente Icmarkets",
        perpetualContractUpgrade: "Avviso piattaforma Icmarkets sull'ottimizzazione e aggiornamento sistema contratti perpetui",
        maintenanceCompletion: "Avviso sul completamento della manutenzione e ottimizzazione del sistema piattaforma",
        bitcoinWithdrawal: "Avviso sui prelievi Bitcoin",
        tradingPairsUpgrade: "Avviso sull'aggiornamento di alcune coppie di trading sulla piattaforma",
        ethWalletMaintenance: "Avviso sulla manutenzione del portafoglio rete Ethereum (ERC20) della piattaforma",
        ethHardFork: "Avviso sul completamento dell'aggiornamento hard fork di ETH",
        identityAuthUpdate: "Avviso sull'aggiornamento del servizio avanzato di autenticazione identità della piattaforma",
        filIncomeIssuance: "Avviso sull'emissione dei ricavi potenza computazionale FIL",
        apiOrderLimit: "Avviso sull'ottimizzazione del limite frequenza ordini API",
        customerChatFunction: "Aggiornamento sistema - Funzione chat cliente in tempo reale",
        ethNetworkUpgrade: "Avviso aggiornamento rete ETH",
        delistingCurrencies: "Avviso di delist valute",
        dotUSDLaunch: "Avviso lancio trading DOT/USD",
        decUSDLaunch: "Avviso lancio trading DEC/USD",
        USDIntroduction: "Introduzione USD",
        ethereumNetworkMaintenance: "Avviso manutenzione rete Ethereum",
        projectReviewStandards: "Standard revisione progetti Icmarkets",
        liquidityMiningUpgrade: "Aggiornamento Liquidity Mining",
        liquidityMiningFee: "Adeguamento tariffe liquidity mining",
        delistingTradingPairs: "Delist coppie di trading",
        systemTemporaryMaintenance: "Avviso manutenzione temporanea sistema",
        temporaryRechargeSuspension: "Avviso sospensione temporanea ricarica",
        delistingNotification: "Notifica delist",
        serverUpgrade: "Avviso aggiornamento server",
        serverNetworkUpgrade: "Avviso aggiornamento rete server",
        appDownloadOpen: "Notifica apertura download APP"
      }
    },
    
    withdrawAddressForm: {
      title: "Indirizzo Prelievo",
      currencyType: "TIPO DI VALUTA",
      withdrawalAddress: "INDIRIZZO PRELIEVO",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      },
      fields: {
        address: "Indirizzo",
        password: "Password Prelievo Cripto"
      },
      placeholders: {
        address: "Inserisci l'indirizzo del tuo wallet",
        password: "Inserisci la tua password attuale"
      },
      buttons: {
        save: "SALVA"
      },
      notification: {
        success: "Indirizzo salvato con successo!"
      }
    },
    
    withdrawAddress: {
      title: "Indirizzo Prelievo",
      cardTitle: "TIPO DI VALUTA",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      }
    },
    
    privacy: {
      title: "Portale Privacy",
      hero: {
        title: "Portale Privacy Icmarkets",
        subtitle: "Protezione dei tuoi dati e privacy con linee guida rigorose, conformità legale e migliori pratiche del settore."
      },
      principles: {
        title: "I Nostri Principi sulla Privacy",
        corePrinciples: "Principi Fondamentali",
        transparency: {
          title: "Trasparenza",
          description: "Aggiornamenti regolari e informazioni chiare su come gestiamo i tuoi dati."
        },
        accountability: {
          title: "Responsabilità e Conformità",
          description: "Audit regolari, certificazioni e aderenza alle leggi globali sulla privacy."
        },
        dataSecurity: {
          title: "Sicurezza Dati",
          description: "Crittografia avanzata, controlli di accesso rigorosi e protocolli di verifica identità."
        },
        dataMinimization: {
          title: "Minimizzazione Dati e Limitazione dello Scopo",
          description: "Raccogliamo solo ciò che è necessario per scopi specifici e legittimi."
        },
        privacyByDesign: {
          title: "Privacy by Design",
          description: "La privacy è integrata in tutti i nostri prodotti e servizi fin dall'inizio."
        }
      },
      userRights: {
        title: "I Tuoi Diritti sulla Privacy",
        content: "Hai strumenti per accedere e gestire i tuoi dati tramite la nostra app o modulo web, con informazioni dettagliate disponibili nel nostro Avviso sulla Privacy.",
        note: "Esercita i tuoi diritti per accedere, correggere o eliminare le tue informazioni personali in qualsiasi momento."
      },
      personalData: {
        title: "Cosa Sono i Dati Personali?",
        definition: "I dati personali si riferiscono a qualsiasi informazione che identifica un individuo.",
        examples: "Esempi includono: nome, ID Icmarkets, indirizzo email, dati di localizzazione, cronologia transazioni e informazioni del dispositivo."
      },
      dataUsage: {
        title: "Come Utilizziamo i Tuoi Dati",
        accountManagement: {
          title: "Gestione Account",
          description: "Per creare e mantenere il tuo account, fornire servizi e comunicare con te."
        },
        legalCompliance: {
          title: "Conformità Legale",
          description: "Per adempiere ai nostri obblighi secondo le leggi applicabili inclusa la normativa antiriciclaggio (AML)."
        },
        securityFraud: {
          title: "Sicurezza e Prevenzione Frodi",
          description: "Per proteggere il tuo account, rilevare e prevenire frodi e garantire la sicurezza della piattaforma."
        },
        customerSupport: {
          title: "Assistenza Clienti",
          description: "Per rispondere alle tue richieste e fornire assistenza tecnica quando necessario."
        },
        marketing: {
          title: "Marketing e Comunicazioni",
          description: "Per inviarti aggiornamenti pertinenti, informazioni sui prodotti e materiali promozionali (con il tuo consenso)."
        },
        transactionProcessing: {
          title: "Elaborazione Transazioni",
          description: "Per facilitare le transazioni di criptovaluta e mantenere i registri delle transazioni."
        }
      },
      dataRetention: {
        title: "Conservazione Dati",
        content: "Conserviamo i tuoi dati per tutto il tempo necessario a fornire i nostri servizi, rispettare gli obblighi legali (come requisiti fiscali e AML), risolvere controversie e far rispettare i nostri accordi."
      },
      dataSharing: {
        title: "Condivisione Dati",
        content: "Possiamo condividere i tuoi dati con altre entità Icmarkets o terze parti fidate sotto rigorose garanzie contrattuali, solo quando necessario per gli scopi descritti nel nostro Avviso sulla Privacy."
      },
      cookies: {
        title: "Cookie e Tracciamento",
        content: "Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza utente, fornire marketing personalizzato e analizzare come vengono utilizzati i nostri servizi.",
        link: "Visualizza la nostra politica completa sui cookie"
      },
      actionCards: {
        privacyNotice: {
          title: "Avviso sulla Privacy",
          description: "Leggi la nostra politica sulla privacy completa"
        },
        manageData: {
          title: "Gestisci Dati",
          description: "Accedi e controlla le tue informazioni"
        },
        cookieSettings: {
          title: "Impostazioni Cookie",
          description: "Modifica le tue preferenze di tracciamento"
        },
        helpCenter: {
          title: "Centro Assistenza",
          description: "Ottieni risposte alle domande sulla privacy"
        }
      },
      notification: "Azione completata con successo!"
    },
    
    termsOfUse: {
      title: "Termini di Utilizzo",
      hero: {
        title: "Termini di Utilizzo Icmarkets"
      },
      agreement: {
        title: "Accordo",
        content: "Questo è un accordo vincolante tra te (l'utente) e Icmarkets. Copre tutti i Servizi Icmarkets a cui accedi o utilizzi."
      },
      riskWarning: {
        title: "Avviso di Rischio",
        content: "Gli asset digitali sono volatili e possono fluttuare significativamente di valore. Icmarkets non è un broker, consulente finanziario o consulente di investimenti. Devi condurre la tua dovuta diligenza prima di prendere qualsiasi decisione finanziaria."
      },
      aboutServices: {
        title: "Informazioni sui Nostri Servizi",
        aboutIcmarkets: {
          title: "Informazioni su Icmarkets",
          content: "Icmarkets fornisce scambio di asset digitali, servizi di custodia e servizi finanziari correlati attraverso la nostra piattaforma."
        },
        eligibility: {
          title: "Idoneità",
          content: "Devi avere almeno 18 anni, essere legalmente in grado di stipulare contratti, non essere limitato dall'utilizzo dei nostri servizi e non trovarti in giurisdizioni vietate."
        },
        communication: {
          title: "Comunicazione",
          content: "Devi mantenere aggiornate le tue informazioni di contatto. Icmarkets ti contatterà via email, SMS o telefono riguardo al tuo account e ai nostri servizi."
        }
      },
      services: {
        title: "I Nostri Servizi",
        servicesProvided: {
          title: "Servizi Forniti",
          content: "Icmarkets offre trading di asset digitali, soluzioni di custodia sicura e supporto clienti sia attraverso bot automatizzati che rappresentanti umani. È disponibile anche la funzionalità di chat utente."
        },
        fees: {
          title: "Tariffe",
          content: "Tutte le tariffe applicabili sono elencate nella nostra pagina Struttura Tariffe e sono soggette ad aggiornamenti. Sei responsabile della revisione del piano tariffario attuale prima di condurre transazioni."
        }
      },
      accountManagement: {
        title: "Gestione Account",
        accountCreation: {
          title: "Creazione Account",
          content: "Devi aprire un account (individuale o aziendale) per accedere ai nostri servizi. Ciò richiede il completamento delle procedure di verifica dell'identità (KYC/AML) come richiesto dalla legge."
        },
        identityVerification: {
          title: "Verifica Identità",
          content: "Devi completare i nostri processi di verifica Know Your Customer (KYC) e Anti-Money Laundering (AML) prima di utilizzare determinati servizi."
        },
        accountRecords: {
          title: "Registri Account",
          content: "Puoi mantenere registri e creare sotto-account in condizioni specifiche descritte nelle nostre politiche di gestione account."
        }
      },
      transactions: {
        title: "Transazioni",
        sufficientBalance: {
          title: "Saldo Sufficiente",
          content: "Devi mantenere saldo sufficiente nel tuo account per qualsiasi transazione che avvii. Le transazioni potrebbero fallire o incorrere in tariffe aggiuntive se fondi insufficienti sono disponibili."
        },
        transactionCancellation: {
          title: "Annullamento Transazione",
          content: "Icmarkets si riserva il diritto di annullare o modificare transazioni in caso di sospetto frode, errori o violazioni di questi Termini."
        },
        unauthorizedTransactions: {
          title: "Transazioni Non Autorizzate",
          content: "Sei responsabile di qualsiasi transazione non autorizzata a meno che tu non possa provare il contrario attraverso il nostro processo di risoluzione delle controversie."
        }
      },
      digitalAssets: {
        title: "Asset Digitali",
        supportedAssets: {
          title: "Asset Supportati",
          content: "Puoi effettuare transazioni solo con asset digitali esplicitamente supportati da Icmarkets. Tentare di depositare asset non supportati può risultare in perdita permanente."
        },
        forksAirdrops: {
          title: "Forks e Airdrops",
          content: "Icmarkets non garantisce supporto per fork blockchain, airdrops o altri eventi simili. Le decisioni di supporto vengono prese a nostra sola discrezione."
        }
      },
      accountSecurity: {
        title: "Sicurezza Account",
        securityRequirements: {
          title: "Requisiti di Sicurezza",
          content: "Devi utilizzare una password forte, abilitare l'autenticazione a più fattori (MFA), non condividere mai le credenziali, monitorare regolarmente l'attività dell'account e segnalare immediatamente qualsiasi violazione della sicurezza."
        }
      },
      privacy: {
        title: "Privacy",
        content: "La tua privacy è governata dall'Avviso sulla Privacy di Icmarkets, che spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali."
      },
      termination: {
        title: "Terminazione Account",
        terminationSuspension: {
          title: "Terminazione/Sospensione",
          content: "Icmarkets può limitare, sospendere o terminare account per frode, violazioni della legge, attività sospette o violazioni di questi Termini. Gli utenti possono chiudere account a meno che non siano congelati o dormienti."
        }
      },
      prohibitedUse: {
        title: "Uso Proibito",
        content: "Non puoi utilizzare i servizi Icmarkets per frode, manipolazione del mercato, attività illegali, accesso non autorizzato o qualsiasi scopo che violi le leggi applicabili o questi Termini."
      },
      liability: {
        title: "Responsabilità e Proprietà Intellettuale",
        liability: {
          title: "Responsabilità",
          content: "Icmarkets non è responsabile per perdite tranne in casi di provata negligenza grave o frode. Non siamo responsabili per fluttuazioni del mercato, problemi tecnici o azioni di terze parti."
        },
        intellectualProperty: {
          title: "Proprietà Intellettuale",
          content: "Icmarkets detiene tutti i diritti di proprietà intellettuale sulla nostra piattaforma, tecnologia e branding. Gli utenti ricevono una licenza limitata per utilizzare i nostri servizi come descritto in questi Termini."
        },
        indemnity: {
          title: "Indennizzo",
          content: "Accetti di indennizzare e tenere indenne Icmarkets da qualsiasi reclamo, perdita o danno risultante dall'uso improprio dei nostri servizi o violazione di questi Termini."
        }
      },
      importantNotice: {
        title: "Avviso Importante",
        content: "Utilizzando i servizi di Icmarkets, riconosci di aver letto, compreso e accettato di essere vincolato da questi Termini di Utilizzo. Se non sei d'accordo, devi interrompere immediatamente l'uso dei nostri servizi."
      },
      actionCards: {
        security: {
          title: "Sicurezza",
          description: "Mantieni il tuo account sicuro."
        },
        helpCenter: {
          title: "Centro Assistenza",
          description: "Ottieni risposte alle tue domande"
        },
        privacyPolicy: {
          title: "Politica sulla Privacy",
          description: "Rivedi le nostre pratiche sulla privacy"
        },
        legal: {
          title: "Legale",
          description: "Visualizza tutti i documenti legali"
        }
      },
      footer: {
        copyright: "© 2025 Icmarkets. Tutti i diritti riservati.",
        lastUpdated: "Ultimo aggiornamento: 6 maggio 2025"
      }
    },
    
    assetsDetail: {
      title: "Dettagli Asset",
      today: "Oggi",
      yesterday: "Ieri",
      filter: "Filtro",
      transactionHistory: {
        title: "Cronologia Transazioni"
      },
      noTransactions: {
        title: "Ancora Nessuna Transazione",
        description: "La tua cronologia delle transazioni apparirà qui una volta che inizi a fare trading."
      },
      status: {
        completed: "Completato",
        pending: "In Attesa",
        canceled: "Annullato"
      },
      filterModal: {
        title: "Filtra Transazioni",
        status: "Stato",
        type: "Tipo",
        direction: "Direzione",
        startDate: "Data Inizio",
        endDate: "Data Fine",
        allStatuses: "Tutti gli Stati",
        allTypes: "Tutti i Tipi",
        bothDirections: "Entrambe le Direzioni",
        incoming: "In Entrata",
        outgoing: "In Uscita",
        completed: "Completato",
        pending: "In Attesa",
        canceled: "Annullato",
        resetFilters: "Reimposta Filtri",
        applyFilters: "Applica Filtri"
      },
      actions: {
        deposit: "Deposita",
        withdraw: "Preleva"
      },
      transactionTypes: {
        transaction: "Transazione",
        deposit: "Deposito",
        withdrawal: "Prelievo",
        convertedFrom: "Convertito da {{asset}}",
        convertedTo: "Convertito in {{asset}}",
        conversionIn: "Conversione in Entrata",
        conversionOut: "Conversione in Uscita",
        stakedAmount: "Importo in Staking",
        stakingRewards: "Ricompense Staking",
        futuresReserved: "Futures Riservati",
        futuresProfit: "Profitto Futures",
        futuresLoss: "Perdita Futures",
        futuresSettlement: "Liquidazione Futures",
        futuresFee: "Commissione Futures",
        futuresRefund: "Rimborso Futures",
        futuresBonus: "Bonus Futures",
        futuresCommission: "Commissione Futures",
        manualProfit: "Profitto Manuale",
        manualLoss: "Perdita Manuale",
        manualAdjustment: "Regolazione Manuale",
        spotTradingProfit: "Profitto Trading Spot",
        spotTradingLoss: "Perdita Trading Spot",
        referralReward: "Ricompensa Referral",
        bonus: "Bonus",
        referralCommission: "Commissione Referral",
        orderReserved: "Ordine Riservato",
        orderCancelled: "Ordine Annullato",
        orderPartialFill: "Ordine Parzialmente Evaso",
        orderCompleted: "Ordine Completato",
        feePayment: "Pagamento Commissione",
        balanceAdjustment: "Regolazione Saldo",
        transfer: "Trasferimento"
      }
    },
    
    invitation: {
      title: "Invita Amici",
      earnTogether: "Guadagna Insieme",
      description: "Invita amici a unirsi a Icmarkets e guadagna ricompense quando si registrano e iniziano a fare trading.",
      yourReferralCode: "IL TUO CODICE REFERRAL",
      loading: "Caricamento...",
      copied: "COPIATO!",
      copyCode: "COPIA CODICE",
      totalEarned: "Totale Guadagnato",
      allTimeCommission: "Commissione di Tutti i Tempi",
      generationMembers: "Membri per Generazione",
      noGenerationData: "Nessun dato generazionale disponibile",
      approvedMembers: "Membri Approvati",
      pendingMembers: "Membri in Attesa",
      commissionStructure: "Struttura Commissioni",
      firstGeneration: "1a Generazione",
      secondGeneration: "2a Generazione",
      thirdGeneration: "3a Generazione",
      firstDepositCommission: "Commissione Primo Deposito",
      stakingProfitsCommission: "Commissione Profitti Staking",
      howItWorks: "Come Funziona",
      steps: {
        shareCode: {
          title: "Condividi il Tuo Codice Referral",
          description: "Invia il tuo codice unico agli amici o condividilo sui social media."
        },
        friendsSignUp: {
          title: "Amici si Registrano",
          description: "I tuoi amici si registrano usando il tuo codice referral e verificano i loro account."
        },
        earnCommissions: {
          title: "Guadagna Commissioni",
          description: "Guadagna commissioni dai primi depositi e profitti staking della tua rete."
        }
      },
      referralCopied: "Codice referral copiato negli appunti!",
      loadingMembers: "Caricamento membri...",
      approved: "Approvato",
      joined: "Iscritto",
      noMembersFound: "Nessun membro trovato"
    },
    
    securityTips: {
      title: "Centro Sicurezza",
      essentialTips: "Consigli Essenziali di Sicurezza",
      categories: {
        passwordSecurity: "Sicurezza Password",
        deviceSecurity: "Sicurezza Dispositivo",
        accountSecurity: "Sicurezza Account"
      },
      tips: {
        strongPasswords: {
          title: "Usa Password Forti e Uniche",
          description: "Crea password complesse con maiuscole, minuscole, numeri e simboli."
        },
        enable2FA: {
          title: "Abilita Autenticazione a Due Fattori",
          description: "Aggiungi un ulteriore livello di sicurezza al tuo account con 2FA."
        },
        changePasswords: {
          title: "Cambia Password Regolarmente",
          description: "Aggiorna le tue password ogni 3-6 mesi."
        },
        softwareUpdated: {
          title: "Mantieni il Software Aggiornato",
          description: "Aggiorna regolarmente il tuo sistema operativo, browser e software del wallet."
        },
        antivirus: {
          title: "Usa Protezione Antivirus",
          description: "Installa software antivirus e antimalware affidabile."
        },
        publicWifi: {
          title: "Evita WiFi Pubblico",
          description: "Non accedere mai al tuo wallet su reti pubbliche senza VPN."
        },
        loginNotifications: {
          title: "Abilita Notifiche di Accesso",
          description: "Ricevi avvisi per nuovi accessi al tuo account."
        },
        reviewActivity: {
          title: "Rivedi Attività Account",
          description: "Controlla regolarmente il tuo account per attività sospette."
        },
        whitelisting: {
          title: "Usa Whitelisting",
          description: "Aggiungi indirizzi di prelievo affidabili alla whitelist per sicurezza aggiuntiva."
        }
      },
      actions: {
        enable2FA: "Abilita 2FA",
        enable2FADesc: "Aggiungi un ulteriore livello di sicurezza",
        activityLog: "Registro Attività",
        activityLogDesc: "Rivedi attività recenti dell'account",
        settings: "Impostazioni",
        settingsDesc: "Configura preferenze di sicurezza",
        backupCodes: "Codici di Backup",
        backupCodesDesc: "Salva i tuoi codici di recupero"
      },
      emergency: {
        title: "Procedure di Emergenza",
        unauthorizedAccess: "Se sospetti accesso non autorizzato al tuo account, cambia immediatamente la password e abilita 2FA se non già attiva.",
        lostDevice: "Se il tuo dispositivo viene perso o rubato, revoca immediatamente l'accesso alla sessione dalle impostazioni del tuo account.",
        phishing: "Se sei stato vittima di un tentativo di phishing, blocca il tuo account e contatta immediatamente il supporto.",
        supportTitle: "Supporto Sicurezza 24/7",
        supportEmail: "Icmarkets.helpdesk01@gmail.com"
      },
      resources: {
        title: "Risorse di Sicurezza",
        securityGuide: "Guida alla Sicurezza",
        securityGuideLink: "Leggi documentazione di sicurezza completa",
        learningCenter: "Centro di Apprendimento",
        learningCenterLink: "Scopri le migliori pratiche di sicurezza cripto",
        faq: "FAQ",
        faqLink: "Trova risposte a domande comuni di sicurezza"
      }
    },
    
    notification: {
      title: "Notifica",
      loading: "Caricamento",
      filters: {
        all: "Tutte",
        unread: "Non lette",
        read: "Lette"
      },
      emptyState: {
        title: "Ancora nessuna notifica",
        noNotifications: "Non hai ancora notifiche",
        noFilteredNotifications: "Nessuna notifica {0} trovata"
      },
      types: {
        deposit: {
          title: "Deposito Ricevuto",
          message: "Il tuo deposito di {0} è stato confermato e accreditato sul tuo wallet."
        },
        withdraw: {
          title: "Prelievo Completato",
          message: "Il tuo prelievo di {0} è stato elaborato con successo."
        },
        staking: {
          title: "Profitto Staking",
          message: "Hai guadagnato {0} dalle tue ricompense staking."
        },
        kyc: {
          title: "Aggiornamento KYC",
          defaultMessage: "Il tuo account è stato attivato."
        },
        commission: {
          title: "Commissione Ricevuta",
          message: "Hai ricevuto una commissione di {0}."
        },
        futures: {
          title: "Aggiornamento Futures",
          message: "Il tuo importo transazione futures {0} è stato eseguito."
        },
        accountActivated: {
          title: "Verifica KYC",
          message: "Ciao {0} i tuoi documenti KYC sono stati verificati, ora puoi godere di funzioni illimitate su Icmarkets"
        },
        custom: {
          title: "Notifica",
          defaultMessage: "Hai una nuova notifica."
        },
        cancelDeposit: {
          title: "Deposito Annullato",
          message: "Il tuo deposito di {0} è stato annullato."
        },
        cancelWithdraw: {
          title: "Prelievo Annullato",
          message: "Il tuo prelievo di {0} è stato annullato."
        },
        cancelActivated: {
          title: "Attivazione Annullata",
          message: "Il tuo KYC è stato rifiutato dal sistema, riprova o contatta l'Assistenza Clienti per aiuto"
        }
      }
    },
    
    staking: {
      title: "Staking",
      totalStakedBalance: "Saldo Totale in Staking",
      earned: "guadagnato",
      tabs: {
        options: "Opzioni",
        active: "Staking Attivi",
        completed: "Completati"
      },
      daily: "Giornaliero",
      minimumStake: "Stake Minimo",
      unstakingPeriod: "Periodo di Unstaking",
      days: "giorni",
      stakeButton: "Fai staking di {0}",
      status: {
        active: "ATTIVO",
        completed: "COMPLETATO"
      },
      remaining: "Rimanente",
      dailyRate: "Tasso Giornaliero",
      duration: "Durata",
      createdAt: "Creato il",
      dateFinish: "Data fine",
      totalCompletedRewards: "RICOMPENSE TOTALI COMPLETATE",
      stake: "FAI STAKING",
      stakes: "STAKING",
      allRewardsFromCompleted: "Tutte le ricompense da staking completati",
      totalRewardsEarned: "RICOMPENSE TOTALI GUADAGNATE",
      balance: "Saldo",
      maximumStake: "Stake Massimo",
      estimatedTotalRewards: "Ricompense Totali Stimate",
      exploreStakingOptions: "Esplora Opzioni Staking",
      startStaking: "Inizia Staking",
      emptyStates: {
        options: {
          title: "Nessun Piano di Staking Disponibile",
          message: "Attualmente non ci sono piani di staking disponibili. Controlla più tardi per nuove opportunità di staking."
        },
        active: {
          title: "Nessun Staking Attivo",
          message: "Non hai ancora staking attivi. Inizia a fare staking per guadagnare ricompense sui tuoi asset cripto."
        },
        completed: {
          title: "Nessun Staking Completato",
          message: "Non hai ancora completato alcuno staking. I tuoi staking completati appariranno qui una volta terminati."
        }
      },
      stakeModal: {
        title: "Staking",
        amountToStake: "Importo da Staking",
        enterAmount: "Inserisci l'Importo"
      }
    },
    
    conversion: {
      title: "Converti Cripto",
      loading: "Caricamento ultimi prezzi...",
      youSend: "Invii",
      youReceive: "Ricevi",
      balance: "Saldo",
      max: "MAX",
      enterAmount: "Inserisci importo",
      insufficientBalance: "Saldo insufficiente",
      estimatedConversion: "Conversione stimata",
      selectDifferentCurrencies: "Seleziona valute diverse",
      convertNow: "Converti Ora",
      pricesUpdate: "I prezzi si aggiornano in tempo reale",
      selectCurrency: "Seleziona Valuta",
      searchCurrencies: "Cerca valute...",
      confirmConversion: "Conferma Conversione",
      confirmExchange: "Conferma Scambio",
      conversionDetails: "Dettagli Conversione",
      exchangeRate: "Tasso di Cambio",
      networkFee: "Commissione Rete",
      estimatedArrival: "Arrivo Stimato",
      arrivalTime: "~30 secondi",
      processingConversion: "Elaborazione Conversione...",
      cancel: "Annulla"
    },
    
    history: {
      title: "Cronologia Transazioni",
      emptyState: {
        title: "Nessuna transazione trovata",
        description: "Prova a cambiare i tuoi filtri per vedere più transazioni"
      },
      filters: {
        all: "Tutte",
        deposits: "Depositi",
        withdrawals: "Prelievi",
        profits: "Profitti",
        losses: "Perdite",
        conversions: "Conversioni",
        stacking: "Stacking"
      },
      statusFilters: {
        allStatus: "Tutti gli Stati",
        completed: "Completato",
        pending: "In Attesa",
        canceled: "Annullato"
      },
      timeFilters: {
        allTime: "Sempre",
        today: "Oggi",
        week: "Settimana",
        month: "Mese",
        year: "Anno"
      },
      status: {
        completed: "Completato",
        pending: "In Attesa",
        canceled: "Annullato"
      },
      dateFormats: {
        today: "Oggi, {0}",
        yesterday: "Ieri, {0}"
      },
      transactionTypes: {
        transaction: "Transazione",
        deposit: "Deposito",
        withdrawal: "Prelievo",
        convertedFrom: "Convertito da {0}",
        convertedTo: "Convertito in {0}",
        conversionIn: "Conversione in Entrata",
        conversionOut: "Conversione in Uscita",
        stakedAmount: "Importo in Staking",
        stakingRewards: "Ricompense Staking",
        futuresReserved: "Futures Riservati",
        futuresProfit: "Profitto Futures",
        futuresLoss: "Perdita Futures",
        futuresSettlement: "Liquidazione Futures",
        futuresFee: "Commissione Futures",
        futuresRefund: "Rimborso Futures",
        futuresBonus: "Bonus Futures",
        futuresCommission: "Commissione Futures",
        manualProfit: "Profitto Manuale",
        manualLoss: "Perdita Manuale",
        manualAdjustment: "Regolazione Manuale",
        spotTradingProfit: "Profitto Trading Spot",
        spotTradingLoss: "Perdita Trading Spot",
        referralReward: "Ricompensa Referral",
        bonus: "Bonus",
        referralCommission: "Commissione Referral",
        orderReserved: "Ordine Riservato",
        orderCancelled: "Ordine Annullato",
        orderPartialFill: "Ordine Parzialmente Evaso",
        orderCompleted: "Ordine Completato",
        feePayment: "Pagamento Commissione",
        balanceAdjustment: "Regolazione Saldo",
        transfer: "Trasferimento"
      }
    },
    
    withdraw: {
      title: "Preleva Cripto",
      selectCurrency: "Seleziona Valuta",
      selectPlaceholder: "Seleziona una valuta",
      selectHint: "Seleziona una valuta per continuare",
      withdrawalAddress: "Indirizzo Prelievo",
      withdrawalAmount: "Importo Prelievo",
      withdrawalPassword: "Password Prelievo",
      passwordPlaceholder: "Inserisci password prelievo",
      available: "Disponibile",
      amountWithdrawal: "Importo prelievo",
      minimumWithdrawal: "Prelievo minimo",
      networkFee: "Commissione rete",
      youWillReceive: "Riceverai",
      confirmWithdrawal: "Conferma Prelievo",
      processing: "Elaborazione...",
      securityVerification: "Verifica Sicurezza",
      securityMessage: "Per la tua sicurezza, i prelievi richiedono conferma della password e possono essere soggetti a revisione. I prelievi a indirizzi errati non possono essere annullati.",
      networkInfo: "Rete: {0} ({1})",
      noWalletAddress: "(Nessun indirizzo wallet)",
      noWallet: {
        title: "Nessun Indirizzo Wallet Trovato",
        description: "Non hai ancora aggiunto alcun indirizzo wallet. Aggiungi un indirizzo di prelievo per procedere con la tua transazione.",
        addButton: "Aggiungi Indirizzo Wallet"
      },
      security: {
        title: "Sicurezza Prima di Tutto",
        description: "Per la tua sicurezza, richiediamo un indirizzo di prelievo verificato per ogni criptovaluta. Questo aiuta a prevenire errori e assicura che i tuoi fondi raggiungano la destinazione corretta."
      },
      errors: {
        amountNumber: "L'importo di prelievo deve essere un numero",
        amountRequired: "L'importo di prelievo è richiesto",
        amountPositive: "L'importo di prelievo deve essere maggiore di 0",
        amountMin: "L'importo è inferiore al prelievo minimo per questa valuta",
        passwordRequired: "La password di prelievo è richiesta",
        noWalletAddress: "Nessun indirizzo wallet trovato per {0}. Aggiungi prima un indirizzo wallet.",
        minimumWithdraw: "Prelievo minimo per {0}: {1} {2}",
        insufficientForFee: "Saldo insufficiente per coprire la commissione ({0} {1})"
      },
      validation: {
        selectCurrency: "Seleziona valuta",
        enterAmount: "Inserisci importo",
        belowMin: "Sotto il minimo ({0} {1})",
        insufficientBalance: "Saldo insufficiente",
        insufficientForFee: "Saldo insufficiente (inclusa commissione)",
        enterPassword: "Inserisci password"
      }
    },
    
    deposit: {
      title: "Deposita Cripto",
      loading: "Metodo di deposito in caricamento ...",
      selectNetwork: "Seleziona Rete",
      depositAddress: "Il tuo indirizzo di deposito",
      copyAddress: "Copia Indirizzo",
      amountLabel: "Importo deposito ({0})",
      amountPlaceholder: "Minimo: {0} {1}",
      txidLabel: "ID Transazione (TXID)",
      txidPlaceholder: "Inserisci il TXID",
      minimumDeposit: "Deposito minimo",
      importantNotice: "Avviso Importante",
      warningMessage: "Assicurati di selezionare la rete corretta per il tuo deposito. Inviare fondi attraverso la rete errata può risultare in perdita permanente dei tuoi asset, che non può essere recuperata.",
      confirmDeposit: "Conferma Deposito",
      network: "Rete",
      estimatedArrival: "Arrivo stimato",
      networkConfirmations: "3 conferme di rete",
      processingTime: "Tempo di elaborazione",
      processingTimeValue: "10-30 minuti",
      noMethods: "Nessun metodo di deposito disponibile al momento.",
      addressCopied: "Indirizzo copiato negli appunti!",
      unknownNetwork: "Rete Sconosciuta"
    },
    
    faq: {
      title: "Centro FAQ",
      hero: {
        title: "Domande Frequenti",
        subtitle: "Trova risposte a domande comuni sull'uso di Icmarkets"
      },
      search: {
        placeholder: "Cerca risposte..."
      },
      categories: {
        gettingStarted: "Per Iniziare",
        managingAccount: "Gestione del Tuo Account"
      },
      questions: {
        howToCreateAccount: "Come creo un account?",
        howToCompleteVerification: "Come completo la verifica?",
        howToBuyCrypto: "Come compro criptovaluta?",
        howToTrade: "Come faccio trading con criptovalute?",
        howToSendReceive: "Come ricevo e invio cripto?",
        howToBecomeP2PMerchant: "Come divento un Commerciante P2P?",
        howStakingWorks: "Come funziona lo staking?"
      },
      answers: {
        verificationProcess: "Carica un documento d'identità governativo e una foto selfie. La verifica viene solitamente approvata entro poche ore."
      },
      steps: {
        goToWebsite: "Vai su https://trade-Icmarkets.com",
        clickSignUp: 'Clicca "Registrati"',
        enterDetails: "Inserisci i tuoi dati",
        verifyEmail: "Verifica il tuo indirizzo email",
        completeVerification: "Completa prima la verifica",
        clickBuyCrypto: 'Clicca "Compra Cripto"',
        selectCoinAndPayment: "Seleziona moneta e metodo di pagamento",
        confirmTransaction: "Conferma la transazione",
        cryptoInWallet: "La cripto apparirà nel tuo wallet",
        goToTradeMarkets: 'Vai su "Trading/Mercati"',
        pickTradingPair: "Scegli una coppia di trading (es. BTC/USD)",
        placeOrders: "Piazza ordini market o limit",
        receiveCrypto: "Vai su Wallet > Ricevi → copia indirizzo o QR code",
        sendCrypto: "Vai su Wallet > Invia → inserisci indirizzo/importo → conferma",
        applyP2P: 'Richiedi nella sezione "P2P"',
        meetCriteria: "Soddisfa i criteri di idoneità",
        createOffers: "Una volta approvato, crea offerte e fai trading",
        goToStaking: "Vai su Wallet > Staking",
        pickStakingPlan: "Scegli un piano di staking",
        selectAmount: "Seleziona l'importo da fare staking",
        confirmStaking: "Conferma la transazione",
        rewardsProcessed: "Le ricompense vengono elaborate automaticamente alla fine del periodo"
      },
      labels: {
        toReceive: "Da ricevere:",
        toSend: "Da inviare:"
      },
      futures: {
        title: "Trading Futures Spiegato",
        whatAreFutures: "Cosa sono i contratti futures?",
        futuresExplanation: "Accordi per acquistare o vendere cripto a un prezzo predeterminato in una data futura (liquidati in contanti).",
        whatIsLeverage: "Cos'è la leva?",
        leverageExplanation: "Capacità di fare trading con più capitale di quello che hai (es. 10x, 20x, 50x leva).",
        longShortPositions: "Cosa sono le posizioni Long e Short?",
        long: "Long",
        longExplanation: "= scommettere che il prezzo salirà",
        short: "Short",
        shortExplanation: "= scommettere che il prezzo scenderà",
        marginLiquidation: "Cosa sono Margine e Liquidazione?",
        marginExplanation: "Rischio di liquidazione della posizione se le tue garanzie scendono troppo per mantenere la posizione.",
        fundingRate: "Cos'è il Funding Rate?",
        fundingRateExplanation: "Commissione scambiata ogni 8 ore tra trader long e short per bilanciare i prezzi dei contratti perpetui con i prezzi spot.",
        profitLossCalculation: "Come si calcola Profitto/Perdita?",
        profitLossExplanation: "Calcolato in base alla differenza di prezzo moltiplicata per la tua leva e dimensione della posizione."
      },
      benefits: {
        title: "Perché Scegliere Futures Icmarkets?",
        hedge: "Copertura contro la volatilità del mercato",
        multiplyProfits: "Moltiplica i profitti con la leva",
        tradeBothMarkets: "Fai trading sia su mercati in rialzo che in ribasso",
        advancedStrategies: "Implementa strategie di trading avanzate"
      },
      actionCards: {
        contactSupport: "Contatta Supporto",
        getHelp: "Ottieni aiuto dal nostro team",
        community: "Community",
        joinDiscussions: "Unisciti alle discussioni"
      },
      footer: {
        copyright: "© 2025 Icmarkets. Tutti i diritti riservati.",
        needHelp: "Hai bisogno di più aiuto? Contatta Icmarkets.helpdesk01@gmail.com"
      }
    },
    
    tabBottomNavigator: {
      home: "home",
      grap: "grafico",
      records: "registri",
      starting: "inizio"
    },
    
    language: {
      title: "Lingua App",
      selectLanguage: "Seleziona Lingua",
      choosePreferred: "Scegli la tua lingua preferita",
      searchPlaceholder: "Cerca lingue...",
      currentLanguage: "Lingua Corrente",
      languages: {
        english: "Inglese",
        french: "Francese",
        russian: "Russo",
        german: "Tedesco",
        spanish: "Spagnolo"
      },
      nativeNames: {
        english: "English",
        french: "Français",
        russian: "Русский",
        german: "Deutsch",
        spanish: "Español"
      }
    }
  },


    entities: {
        record: {
            menu: "Registri",
            fields: {
                user: "utente",
                product: "prodotto",
                number: "numero di registro",
                status: "stato",
            },
            list: {
                title: "Elenco dei registri",
            },
            view: {
                title: "Dettaglio Registro",
            },
            edit: {
                title: "Modifica Registro",
            },
            create: {
                success: "Prodotto inviato con successo.",
            },
            update: {
                success: "Prodotto inviato con successo.",
            },
            destroy: {
                success: "Registro eliminato con successo",
            },
            destroyAll: {
                success: "Registro eliminato con successo",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Completato",
                    canceled: "Annullato",
                },
            },
        },

        category: {
            name: "categoria",
            label: "Categorie",
            menu: "Categorie",
            exporterFileName: "esportazione_categoria",
            list: {
                menu: "Categorie",
                title: "Categorie",
            },
            create: {
                success: "Categoria salvata con successo",
            },
            update: {
                success: "Categoria salvata con successo",
            },
            destroy: {
                success: "Categoria eliminata con successo",
            },
            destroyAll: {
                success: "Categoria/e eliminata/e con successo",
            },
            edit: {
                title: "Modifica Categoria",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                photo: "Foto",
                metaKeywords: "Parole chiave Meta",
                metaDescriptions: "Descrizioni Meta",
                status: "Stato",
                isFeature: "È in evidenza",
                serialRange: "Seriale",
                serial: "Seriale",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Categoria",
            },
            view: {
                title: "Visualizza Categoria",
            },
            importer: {
                title: "Importa Categorie",
                fileName: "modello_importazione_categoria",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        product: {
            name: "prodotto",
            label: "Prodotti",
            menu: "Prodotti",
            exporterFileName: "esportazione_prodotto",
            list: {
                menu: "Prodotti",
                title: "Prodotti",
            },
            create: {
                success: "Prodotto salvato con successo",
            },
            update: {
                success: "Prodotto salvato con successo",
            },
            destroy: {
                success: "Prodotto eliminato con successo",
            },
            destroyAll: {
                success: "Prodotto/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Prodotto",
            },
            fields: {
                id: "Id",
                name: "Nome",
                slug: "Slug",
                tags: "Tag",
                video: "Video",
                specificationName: "Nome Specifica",
                specificationDesciption: "Descrizione Specifica",
                isSpecification: "È Specifica",
                details: "Dettagli",
                photo: "Foto",
                discountPriceRange: "Prezzo Scontato",
                discountPrice: "Prezzo Attuale",
                previousPriceRange: "Prezzo Precedente",
                previousPrice: "Prezzo Precedente",
                stockRange: "Scorta",
                stock: "Scorta",
                metaKeywords: "Parole chiave Meta",
                metaDesctiption: "Descrizione Breve",
                status: "Stato",
                isType: "Tipo",
                dateRange: "Data",
                date: "Data",
                itemType: "Tipo Articolo",
                file: "File",
                link: "Link",
                fileType: "Tipo File",
                taxe: "Tassa",
                category: "Categoria",
                subcategory: "Sottocategoria",
                childcategory: "Sotto-sottocategoria",
                brand: "Marca",
                gallery: "Galleria",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    enable: "Abilita",
                    disable: "Disabilita",
                },
                itemType: {
                    physical: "fisico",
                    digitale: "Digitale",
                },
                fileType: {
                    file: "File",
                    link: "Link",
                },
                isType: {
                    new_arrival: "Nuovo Arrivo",
                    feature_product: "Prodotto in Evidenza",
                    top_pdroduct: "Prodotto Top",
                    best_product: "Miglior Prodotto",
                    flash_deal_product: "Prodotto Offerta Lampo",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Prodotto",
            },
            view: {
                title: "Visualizza Prodotto",
            },
            importer: {
                title: "Importa Prodotti",
                fileName: "modello_importazione_prodotto",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
        transaction: {
            name: "transazione",
            label: "Transazioni",
            menu: "Transazioni",
            exporterFileName: "esportazione_transazione",
            list: {
                menu: "Transazioni",
                title: "Transazioni",
            },
            create: {
                success: "Transazione inviata con successo",
            },
            update: {
                success: "Transazione salvata con successo",
            },
            destroy: {
                success: "Transazione eliminata con successo",
            },
            destroyAll: {
                success: "Transazione/i eliminata/e con successo",
            },
            edit: {
                title: "Modifica Transazione",
            },
            fields: {
                id: "Id",
                amountRange: "Importo",
                amount: "Importo",
                email: "Email",
                tax: "Tassa",
                currencySign: "Simbolo Valuta",
                currencyValue: "Valore Valuta",
                orderId: "ID Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                status: {
                    pending: "In attesa",
                    completed: "Successo",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuova Transazione",
            },
            view: {
                title: "Visualizza Transazione",
            },
            importer: {
                title: "Importa Transazioni",
                fileName: "modello_importazione_transazione",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },

        order: {
            name: "ordine",
            label: "Ordini",
            menu: "Ordini",
            exporterFileName: "esportazione_ordine",
            list: {
                menu: "Ordini",
                title: "Ordini",
            },
            create: {
                success: "Ordine salvato con successo",
            },
            update: {
                success: "Ordine salvato con successo",
            },
            destroy: {
                success: "Ordine eliminato con successo",
            },
            destroyAll: {
                success: "Ordine/i eliminato/i con successo",
            },
            edit: {
                title: "Modifica Ordine",
            },
            fields: {
                id: "Id",
                userId: "Utente",
                cart: "Carrello",
                shipping: "Spedizione",
                discountRange: "Sconto",
                discount: "Sconto",
                paymentMethod: "Metodo di Pagamento",
                taxe: "Tassa",
                transactionNumber: "Numero Transazione",
                orderStatus: "Stato Ordine",
                createdAt: "Creato il",
                updatedAt: "Aggiornato il",
                createdAtRange: "Creato il",
            },
            enumerators: {
                orderStatus: {
                    pending: "In attesa",
                    in_progress: "In corso",
                    delivered: "Consegnato",
                    canceled: "Annullato",
                },
            },
            placeholders: {},
            hints: {},
            new: {
                title: "Nuovo Ordine",
            },
            view: {
                title: "Visualizza Ordine",
            },
            importer: {
                title: "Importa Ordini",
                fileName: "modello_importazione_ordine",
                hint: "Le colonne File/Immagini devono essere gli URL dei file separati da spazio.",
            },
        },
    },


    buttons: {
        login: "Accedi",
        registerNow: "Registrati ora",
        signup: "Iscriviti",
        start: "Inizia",
        orders: "Ordini",
        submit: "Invia",
        backtohome: "Torna alla home",
        confirm: "Conferma",
        logout: "Disconnetti",
        getstarted: "Inizia",
    },
    text: {
        welcome: "Benvenuto",
        discover: "Scopri offerte esclusive solo per te",
        signin: "Accedi",
        haveaccount: "Hai già un account",
        noaccount: "Non hai un account",
        showingnow: "In programmazione",
        comingsoon: "Prossimamente",
        termsconditions: "Termini e condizioni",
        todayearning: "Guadagni di oggi",
        accountbalance: "Saldo del conto",
        freezebalance: "Saldo bloccato",
        sumbitInformation: "Invia informazioni",
        order: "Ordine",
        pending: "In sospeso",
        completed: "Completato",
        canceled: "Annullato",
        notransaction: "Nessuna transazione fino ad ora!",
        createdtime: "Ora di creazione",
        creationtime: "Tempo di creazione",
        orderNumber: "Numero d'ordine",
        orderamount: "Importo dell'ordine",
        income: "Reddito",
        buyerating: "Valutazione dell'acquirente",
        uid: "UID",
        promotioncode: "Codice promozionale",
        walletamount: "Importo portafoglio",
        creditassesment: "Valutazione del credito",
        myfinance: "Le mie finanze",
        withdraw: "Prelievo",
        mydetails: "I miei dettagli",
        profile: "Profilo",
        wallet: "Portafoglio",
        other: "Altro",
        customersupport: "Supporto clienti",
        transaction: "Transazione",
        taskshistory: "Cronologia attività",
        security: "Sicurezza",
        sponsor: "La nostra sicurezza è la nostra massima priorità e vogliamo assicurarci che tu sia protetto da eventuali rischi. Ti informiamo che non ti chiederemo mai di inviare denaro a un indirizzo sconosciuto. Prima di effettuare pagamenti, ti chiediamo gentilmente di verificare i dettagli con noi.",
    },
    errors: {
        backToHome: "Torna alla home",
        403: "Spiacente, non hai accesso a questa pagina",
        404: "Spiacente, la pagina che hai visitato non esiste",
        500: "Spiacente, il server sta segnalando un errore",
        429: "Troppe richieste. Riprova più tardi.",
        forbidden: {
            message: "Vietato",
        },
        validation: {
            message: "Si è verificato un errore",
        },
        defaultErrorMessage: "Ops, si è verificato un errore",
    },

    withdraw: {
        withdrawamount: "Importo del prelievo",
        Withdrawpassword: "Password di prelievo",
        availablebalance: "Saldo disponibile",
        rules: "Descrizione delle regole",
        rule1: "Il prelievo minimo è di 20$",
        rule2: "Il pagamento verrà effettuato entro 24 ore dalla richiesta di prelievo",
        rule3: "La mancata presentazione dell'ordine giornaliero comporta l'impossibilità di prelevare, tutti i prodotti devono essere presentati per il prelievo"
    },

    profile: {
        profile: "Profilo",
        fullname: "Nome completo",
        email: "Email",
        phonenumber: "Numero di telefono",
        country: "Paese",
        Invitationcode: "Codice di invito"
    },

    wallet: {
        wallet: "Portafoglio",
        info: "Informazioni sul metodo di prelievo",
        username: "Nome utente",
        walletname: "Nome del portafoglio",
        walletaddress: "Indirizzo del portafoglio",
        note: "Nota",
        notedesctiption: "Si prega di prestare attenzione nella compilazione di queste informazioni."
    },

    cs: {
        cs: "Servizio clienti",
        note: "Se hai domande o riscontri problemi, inviaci un'email o chatta con il nostro team di supporto online.",
        contactnow: "Contatta ora"
    },

    transaction: {
        transaction: "Transazione",
        all: "Tutti",
        withdraw: "Prelievo",
        dposit: "Deposito",
        notransaction: "Nessuna transazione fino ad ora!"
    },

    tabbarmenue: {
        home: "Home",
        rate: "Valutazione",
        profile: "Profilo"
    },

    validation: {
        mixed: {
            default: "${path} non è valido",
            required: "${path} è obbligatorio",
            oneOf: "${path} deve essere uno dei seguenti valori: ${values}",
            notOneOf: "${path} non deve essere uno dei seguenti valori: ${values}",
            notType: ({ path, type }) => `${path} deve essere un ${type}`,
        },
        string: {
            length: "${path} deve essere esattamente di ${length} caratteri",
            min: "${path} deve avere almeno ${min} caratteri",
            max: "${path} deve avere al massimo ${max} caratteri",
            matches: "${path} deve corrispondere a: \"${regex}\"",
            email: "${path} deve essere un'email valida",
            url: "${path} deve essere un URL valido",
        },
    },

    fileUploader: {
        upload: "Carica",
        image: "Devi caricare un'immagine",
        size: "Il file è troppo grande. La dimensione massima consentita è {0}",
        formats: "Formato non valido. Deve essere uno di: {0}."
    }
};

export default it;
