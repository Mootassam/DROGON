import Withdraw from "src/view/pages/withdraw/Withdraw";

const fr = {
  app: {
    title: "Nowspeed"
  },


  common: {
timeout: "Délai de requête dépassé",
requestAborted: "Requête annulée",
fetchError: "Erreur lors de la récupération des données du marché",
dateNotAvailable: "Date non disponible",
currencyFormat: "${0}",
invalidDate: "Date invalide",
invalidTime: "Heure invalide",
unknown: "Inconnu",
na: "N/A",
back: "Retour",
close: "Fermer",
  },
  stake: {
    enterAmount: "Entrez un montant",
    insufficientBalance: "Solde insuffisant",
    minAmount: "Min: {{min}}",
    maxAmount: "Max: {{max}}",
    confirmStake: "Confirmer le Stake"
  },
pages:{
    helpCenterDetail: {
        faqNotFound: "Élément FAQ non trouvé, redirection nécessaire",

        questions: {
            aiQuantification: "Introduction à la Quantification IA",
            exploreNFTs: "Explorez les NFT avec AureX",
            bitcoinEnergy: "Elon Musk Dit que le Bitcoin est Basé sur l'Énergie, Ce qui est Impossible à Falsifier\n13/10/2025, 8:00:00 AM (UTC-8)",
            bitcoinRecordPrice: "Le Bitcoin Atteint un Prix Record au-dessus de 125 000 $\n4/10/2025, 8:00:00 AM (UTC-8)",
            trumpStatueBitcoin: "Une statue géante de Trump tenant un Bitcoin exposée devant le Capitole américain pour marquer la décision de taux de la Fed\n16/9/2025, 8:00:00 AM (UTC-8)"
        },

        answers: {
            aboutAccounts: "Les comptes formels peuvent utiliser toutes les fonctions en ligne de la plateforme, tandis que les comptes démo ne peuvent utiliser qu'une partie limitée des fonctions de la plateforme, ne peuvent pas utiliser le minage de liquidité pour réaliser des profits, et ne peuvent pas déposer et retirer des crypto-monnaies. (Les comptes démo peuvent recevoir une fois des fonds virtuels fixes le 1er de chaque mois)",
            transactionVolume: "Conformément aux dispositions pertinentes de la loi contre le blanchiment d'argent, chaque transaction nécessite un contrôle des prix, et un certain volume de transaction doit être réalisé avant que la monnaie puisse être retirée, afin d'empêcher les utilisateurs de blanchir de l'argent sur l'échange ! Par exemple, si vous déposez 10 000U, le montant de la transaction doit atteindre le montant spécifié pertinent !",
            transferFunds: "Afin de garantir l'indépendance des fonds entre vos différents comptes et faciliter votre contrôle des risques, les comptes des principaux modules de trading sont divisés. Le transfert fait référence au processus de conversion des actifs entre les différents comptes de trading.",
            whatAreFutures: "Les Futures, également appelés contrats à terme, sont une forme de trading qui s'étend dans le temps. L'acheteur et le vendeur signent un contrat pour convenir de livrer une quantité spécifiée de biens au comptant à un moment, un prix et d'autres conditions de transaction spécifiés. Les Futures sont généralement concentrés dans des bourses de futures et achetés et vendus avec des contrats standardisés. Les actifs négociés sont généralement des matières premières ou des instruments financiers. Le prix prédéterminé que les deux parties acceptent pour acheter et vendre un actif est appelé le prix à terme.",
            convertedAmountChanges: "La valeur convertie dans les actifs est la valeur de la crypto-monnaie actuellement détenue en USD. Elle change en raison des fluctuations de prix des actifs numériques, mais le montant de vos actifs numériques ne change pas.",
            realNameAuthentication: "Pour la sécurité de vos fonds, nous limitons l'association de votre compte de réception avec les informations d'identité réelle de votre compte actuel.",
            frozenAssets: "Les actifs gelés signifient que lorsque vous effectuez des transactions ou des opérations de retrait, le processus n'est pas entièrement terminé. Les actifs courants sont temporairement gérés par le système et ne peuvent pas être librement contrôlés par vous. Cela ne signifie pas que vous avez perdu l'actif ou qu'il y a une anomalie avec l'actif. Soyez rassuré.",
            futuresTradingRules: "Participez aux transactions en estimant la prochaine tendance de prix (à la hausse ou à la baisse) de la paire de trading actuelle. L'amplitude de la hausse ou de la baisse n'est pas calculée lors du règlement, et seul le revenu est calculé sur la base du résultat de la hausse ou de la baisse. Les pourcentages de profit pour le règlement à différentes échéances sont différents, et les profits seront affichés avec précision dans l'interface de trading.",
            aiQuantification: "Un robot de trading quantitatif IA est un système de trading automatisé qui combine l'intelligence artificielle (IA) avec des techniques de trading quantitatif. Sa fonction principale est d'acheter et de vendre automatiquement des produits financiers et des crypto-monnaies sur la base des données de marché et de stratégies de trading spécifiques pour réaliser des profits stables ou contrôler les risques.",
            exploreNFTs: "Plongez dans le monde des NFT avec AureX, votre portefeuille de trading d'actifs numériques tout-en-un. Conçu pour les débutants et les traders professionnels, AureX vous permet d'explorer, d'acheter, de vendre et de gérer des NFT de haute qualité de manière sécurisée et efficace.\n\nAvec une sécurité avancée, un suivi en temps réel et des transactions transparentes, AureX vous garde en plein contrôle de vos collections numériques. Des œuvres d'art exclusives aux actifs numériques en édition limitée, découvrez l'avenir de la propriété numérique — le tout au même endroit, avec confiance et facilité.",
            bitcoinEnergy: "Le PDG de Tesla et Spacex, Elon Musk, a déclaré le 14 octobre sur X que le bitcoin est basé sur l'énergie, le contrastant avec les monnaies fiduciaires que les gouvernements peuvent dévaluer. Sa remarque faisait suite à un post de Zerohedge reliant la hausse des prix de l'or, de l'argent et du bitcoin à la dévaluation monétaire provoquée par les dépenses gouvernementales dans la course mondiale aux armements de l'intelligence artificielle. Zerohedge a ajouté que l'argent peut être imprimé mais pas l'énergie. Musk a été d'accord, écrivant : 'Vrai. C'est pourquoi le bitcoin est basé sur l'énergie : vous pouvez émettre de la fausse monnaie fiduciaire, et chaque gouvernement de l'histoire l'a fait, mais il est impossible de falsifier l'énergie.'\n\nQu'a dit Elon Musk sur le bitcoin et l'énergie ?\nElon Musk a déclaré que le Bitcoin est basé sur l'énergie, soulignant que si les gouvernements peuvent imprimer de la monnaie fiduciaire, l'énergie ne peut pas être falsifiée ou créée artificiellement.\n\nPourquoi Elon Musk a-t-il contrasté le bitcoin avec les monnaies fiduciaires ?\nMusk a souligné que les monnaies fiduciaires sont sujettes à l'inflation parce que les gouvernements peuvent en émettre davantage, tandis que la fondation du bitcoin dans l'énergie lui donne une base de valeur plus tangible et limitée.\n\nQuel était le contexte du commentaire de Musk sur le bitcoin ?\nSon commentaire répondait à un post de Zerohedge suggérant que la hausse des prix de l'or, de l'argent et du bitcoin est liée aux dépenses gouvernementales mondiales et à la dévaluation monétaire causée par la course aux armements de l'IA.\n\nQuel est le principal point à retenir de la déclaration de Musk ?\nLa remarque de Musk renforce l'idée que la valeur du bitcoin est ancrée dans le coût réel de l'énergie, la contrastant avec la nature facilement manipulable de l'argent fiduciaire traditionnel.",
            bitcoinRecordPrice: "Le bitcoin atteint un nouveau sommet.\n\nLa principale crypto-monnaie a touché un record du jour au lendemain, atteignant des sommets historiques autour de 125 400 $ pour dépasser l'ancien record, établi en août autour de 124 480 $. (Il s'échange plus récemment autour de 123 000 $.)\n\nCes derniers mouvements portent la valeur marchande totale du bitcoin à environ 2,45 billions de dollars, selon CoinMarketCap, et la valeur totale des crypto-monnaies à environ 4,21 billions de dollars. Le bitcoin a connu une année dramatique, grimpant depuis des prix inférieurs à 80 000 $ observés en avril.\n\nAlors que les haussiers du bitcoin considèrent généralement la montée continue de la monnaie comme inévitable, certains ont des raisons plus spécifiques de prévoir plus de hausse fin 2025. Il a une histoire d'établissement de nouveaux records dans la fenêtre de 1 064 jours après les creux du marché baissier, le dernier étant le 21 novembre 2022.\n\nPendant ce temps, les volumes de trading du bitcoin sur les échanges de crypto-monnaies augmentent depuis un recul fin septembre. La hausse des volumes a tendance à être bonne pour les prix.\n\nCertains analystes voient des raisons de s'attendre à ce que le bitcoin continue de grimper. Les analystes de JPMorgan ont suggéré dans une note du 1er octobre que le 'trade de dévaluation' — dans lequel les investisseurs institutionnels et particuliers couvrent leurs paris avec de l'or et du bitcoin — devrait prendre de l'ampleur face aux préoccupations allant de l'incertitude géopolitique accrue à l'endettement public élevé persistant dans les économies et au déclin de la domination du dollar américain.\n\nPlus généralement, des développements récents ont suggéré que l'industrie des crypto-monnaies progresse continuellement alors qu'elle cherche à attirer plus de dollars d'investisseurs et à se positionner dans le monde de la finance — parmi eux, le lancement de plusieurs nouveaux ETF crypto et la popularité croissante des actions de trésorerie crypto.",
            trumpStatueBitcoin: "WASHINGTON (7News) — Une statue dorée de 12 pieds du président Donald Trump tenant un Bitcoin a été installée devant le Capitole américain, coïncidant avec la prochaine décision de taux d'intérêt de la Réserve fédérale mercredi.\n\nÀ 14 h, la Fed a annoncé qu'elle réduisait son taux d'intérêt clé d'un quart de point, marquant la première baisse depuis décembre 2024. La baisse ramènera le taux à court terme à environ 4,1 % contre 4,3 % auparavant. L'année dernière, la banque centrale avait baissé les taux trois fois en raison des craintes que la croissance de l'emploi ne ralentisse et que le chômage n'augmente.\n\nLa banque centrale a également révélé des plans pour deux autres baisses de taux cette année. Cependant, une seule est anticipée en 2026, ce qui pourrait décevoir Wall Street, qui s'attendait à cinq baisses d'ici l'année prochaine.\n\nL'œuvre temporaire, située sur la 3e rue de 9 h à 16 h, a été financée par un collectif d'investisseurs en crypto-monnaies. Les organisateurs ont déclaré que l'œuvre vise à provoquer un débat sur l'avenir de la monnaie numérique, la politique monétaire et le rôle du gouvernement fédéral sur les marchés financiers."
        }
    },
    transfer: {
        title: "Historique des Transferts",
        noTransferHistory: "Aucun historique de transfert disponible",

        accountTypes: {
            trade: "Compte Trading",
            perpetual: "Compte Perpétuel",
            exchange: "Compte d'Échange"
        },

        status: {
            completed: "Terminé"
        }
    },
    settings: {
        title: "Paramètres",
        language: "Langue",
        quotationCurrency: "Devise de cotation",
        colorConfiguration: "Configuration des couleurs",
        aboutUs: "À propos de nous",
        versionNumber: "Numéro de version",
        selected: "Sélectionné",

        colorSchemes: {
            greenRiseRedFall: {
                name: "Vert monte, Rouge descend",
                alt: "Schéma de couleurs de graphique Vert monte, Rouge descend",
                description: "Couleurs traditionnelles du trading : vert pour les augmentations de prix, rouge pour les baisses de prix"
            },
            redRiseGreenFall: {
                name: "Rouge monte, Vert descend",
                alt: "Schéma de couleurs de graphique Rouge monte, Vert descend",
                description: "Couleurs alternatives du trading : rouge pour les augmentations de prix, vert pour les baisses de prix"
            }
        },

        modals: {
            language: {
                title: "Sélectionner la Langue"
            },
            colorConfiguration: {
                title: "Configuration des Couleurs"
            }
        }
    },

    wallet: {
        myAssets: "Mes Actifs",
        assetValuation: "Évaluation des Actifs",
        myAccount: "Mon Compte",
        showAmounts: "Afficher les montants",
        hideAmounts: "Masquer les montants",
        usdEquivalent: "≈ USD {0}",
        noAssetsFound: "Aucun actif trouvé",

        quickActions: {
            withdraw: "Retirer",
            deposit: "Déposer",
            transfer: "Transférer",
            swap: "Échanger"
        },

        accountTabs: {
            exchange: "Échange",
            trade: "Trading",
            perpetual: "Perpétuel"
        },

        assetLabels: {
            availableBalance: "Solde disponible",
            frozenAmount: "Montant gelé",
            valuation: "Évaluation"
        },

        errors: {
            fetchAssets: "Erreur lors de la récupération des actifs :"
        }
    },

    loginPassword: {
        title: "Mot de passe de Connexion",
        cardTitle: "MODIFIER LE MOT DE PASSE DE CONNEXION",
        fields: {
            oldPassword: "Ancien Mot de passe",
            newPassword: "Nouveau Mot de passe",
            newPasswordConfirmation: "Confirmer le Mot de passe",
            mailbox: "Votre boîte mail"
        },
        placeholders: {
            oldPassword: "Entrez votre mot de passe actuel",
            newPassword: "Créez un nouveau mot de passe",
            confirmPassword: "Confirmez votre nouveau mot de passe"
        },
        buttons: {
            saveChanges: "SAUVEGARDER LES MODIFICATIONS"
        },
        warningMessage: "Pour la sécurité de vos fonds, les retraits ne sont pas autorisés dans les 24 heures suivant la modification du mot de passe de connexion.",
        validation: {
            mustMatch: "Les mots de passe doivent correspondre"
        }
    },

    futures: {
        title: "Futures",
        actions: {
            buyUp: "ACHETER À LA HAUSSE",
            buyDown: "ACHETER À LA BAISSE"
        },
        tabs: {
            openOrders: "Ordres Ouverts",
            recentOrders: "Ordres Récents"
        },
        orderDetails: {
            title: "Détails de l'Ordre",
            open: "Ouvert",
            closed: "Fermé",
            completed: "Terminé",
            futuresAmount: "Montant du Future :",
            contractDuration: "Durée du Contrat :",
            seconds: "Secondes",
            futuresStatus: "Statut du Future :",
            openPositionPrice: "Prix d'Ouverture de Position :",
            openPositionTime: "Heure d'Ouverture de Position :",
            closePositionPrice: "Prix de Fermeture de Position :",
            closePositionTime: "Heure de Fermeture de Position :",
            profitLossAmount: "Montant du Profit et de la Perte :",
            leverage: "Effet de levier :",
            done: "Terminé"
        },
        status: {
            open: "Ouvert",
            closed: "Fermé",
            completed: "Terminé"
        },
        list: {
            noOrders: "Aucun ordre"
        }
    },
    proof: {
        title: "Vérification d'Identité",
        instructions: "Vérifiez votre identité pour accéder à toutes les fonctionnalités de votre Icmarkets",
        sections: {
            documentInfo: "Informations sur le Document",
            documentUpload: "Téléchargement du Document"
        },
        fields: {
            documentType: "Type de Document",
            fullName: "Nom Complet",
            documentNumber: "Numéro de Document",
            address: "Adresse",
            frontSide: "Recto du Document",
            backSide: "Verso du Document",
            selfie: "Selfie avec Document"
        },
        placeholders: {
            fullName: "Entrez votre nom complet",
            documentNumber: "Entrez votre numéro de document",
            address: "Entrez votre adresse complète"
        },
        uploadTexts: {
            frontSide: "Téléchargez le recto de votre document",
            backSide: "Téléchargez le verso de votre document",
            selfie: "Téléchargez un selfie tenant votre document"
        },
        documentTypes: {
            passport: "Passeport",
            idCard: "Carte d'Identité",
            driversLicense: "Permis de Conduire"
        },
        security: {
            title: "Avis de Sécurité",
            text: "Vos informations sont chiffrées et sécurisées. Nous utilisons une protection de niveau bancaire et vérifions manuellement chaque document pour votre sécurité."
        },
        buttons: {
            validateDocuments: "Valider les Documents"
        },
        footer: {
            copyright: "© 2025 CryptoWallet. Tous droits réservés.",
            privacyPolicy: "Politique de Confidentialité"
        }
    },

    withdrawPassword: {
        title: "Mot de passe de Retrait",
        cardTitle: "MODIFIER LE MOT DE PASSE DE RETRAIT",
        fields: {
            currentPassword: "Mot de passe Actuel",
            newPassword: "Nouveau Mot de passe"
        },
        placeholders: {
            currentPassword: "Entrez votre ancien mot de passe",
            newPassword: "Confirmez votre nouveau mot de passe"
        },
        buttons: {
            saveChanges: "SAUVEGARDER LES MODIFICATIONS"
        },
        warningMessage: "Pour la sécurité de vos fonds, les retraits ne sont pas autorisés dans les 24 heures suivant la modification du mot de passe de connexion."
    },

    marketDetail: {
        stats: {
            high: "Max 24h",
            low: "Min 24h",
            volume: "Vol 24h"
        },
        volume: {
            billion: "Md",
            million: "M"
        },
        actions: {
            buy: "ACHETER",
            sell: "VENDRE"
        },
        recentTrades: {
            title: "Transactions Récentes (En Direct)",
            price: "Prix (USD)",
            amount: "Montant",
            time: "Heure"
        },
        tabs: {
            orderBook: "Ordre",
            transactions: "Dernière transaction"
        },
        orderBook: {
            buy: "Acheter",
            sell: "Vendre",
            quantity: "Quantité",
            price: "Prix (USD)"
        },
        coinSelector: {
            title: "Sélectionner la Paire de Trading"
        },
        setupWebsockets: "Configuration des WebSockets pour :",
        websocketConnected: "WebSocket connecté pour :",
        websocketParseError: "Erreur d'analyse des données WebSocket :",
        websocketError: "Erreur WebSocket pour",
        websocketClosed: "WebSocket fermé pour :",
        websocketCloseError: "Erreur lors de la fermeture du WebSocket :",
        websocketCreateError: "Erreur lors de la création du WebSocket :",
        code: "Code :",
        reconnecting: "Reconnexion du WebSocket pour :",
        cleaningUp: "Nettoyage des WebSockets pour :",
        initialDataLoaded: "Données initiales chargées pour :",
        fetchError: "Erreur lors de la récupération des données initiales pour",
        selectingCoin: "Sélection d'une nouvelle crypto-monnaie :"
    },

    passwordType: {
        title: "Type de Mot de passe",
        cardTitle: "SÉLECTIONNER LE TYPE DE MOT DE PASSE",
        options: {
            login: {
                title: "Mot de passe de Connexion",
                description: "Modifier le mot de passe de connexion de votre compte"
            },
            withdrawal: {
                title: "Mot de passe de Retrait",
                description: "Modifier votre mot de passe de retrait de crypto"
            }
        }
    },

    profile: {
        title: "Centre Personnel",
        user: "Utilisateur",
        userInitial: "U",
        userId: "ID",
        status: {
            verified: "Vérifié",
            unverified: "Non Vérifié"
        },
        verification: {
            kycStatus: "Statut KYC :",
            redirecting: "Redirection vers la page de vérification...",
            pendingReview: "La vérification est en attente d'examen...",
            pendingAlert: "Votre vérification est en attente d'examen. Veuillez attendre l'approbation.",
            alreadyVerified: "L'utilisateur est déjà vérifié",
            pending: {
                title: "Vérification en Attente",
                description: "La vérification de votre compte est en cours. Cela prend généralement 1 à 3 jours ouvrables.",
                status: "En Attente d'Examen",
                button: "En Attente"
            },
            alert: {
                title: "Compte Non Vérifié",
                description: "Vérifiez votre compte pour débloquer toutes les fonctionnalités et des limites plus élevées",
                verifyNow: "Vérifier Maintenant"
            }
        },
        accountInfo: {
            title: "INFORMATIONS DU COMPTE",
            email: "Email",
            creditScore: "Score de Crédit",
            invitationCode: "Code d'Invitation"
        },
        pendingVerifications: {
            title: "VÉRIFICATIONS EN ATTENTE",
            identity: {
                title: "Vérification d'Identité",
                description: "Soumettez votre pièce d'identité gouvernementale"
            },
            address: {
                title: "Vérification d'Adresse",
                description: "Vérifiez votre résidence"
            },
            status: {
                pending: "En Attente"
            }
        },
        approvedVerifications: {
            title: "VÉRIFICATIONS APPROUVÉES",
            identity: {
                title: "Vérification d'Identité"
            },
            address: {
                title: "Vérification d'Adresse"
            },
            status: {
                completed: "Terminé"
            }
        },
        limitations: {
            title: "Limitations du Compte",
            withdrawalLimit: "Limite de retrait : 1 000 $ par jour",
            stakingLimited: "Options de staking limitées",
            advancedTrading: "Fonctionnalités de trading avancées désactivées",
            fiatDeposits: "Dépôts en monnaie fiduciaire non disponibles"
        },
        menu: {
            withdrawalAddress: "Historique des modifications de compte",
            password: "Centre de sécurité",
            notifications: "Notifications",
            myInvitation: "Mes Invitations",
            language: "Langue",
            helpcenter: "Centre d'Aide",
            privacyPortal: "Portail de Confidentialité",
            aboutUs: "Présentation de la Plateforme",
            msbApproval: "Approbation MSB",
            customerSupport: "Service client en ligne",
            downloadApp: "Télécharger",
            logout: "Se Déconnecter",
            preferences: "Préférences",
            clearCache: "Vider le cache"
        },
        cache: {
            clearing: "Nettoyage du cache...",
            cleared: "Cache nettoyé avec succès !"
        },
        simulatedTrading: {
            toggle: "Trading simulé {0}"
        }
    },
    trade: {
        coinSelector: {
            title: "Sélectionner la Paire de Trading"
        },
        title: "SPOT",
        buy: "ACHETER",
        sell: "VENDRE",
        long: "ACHETER LONG",
        short: "ACHETER COURT",
        limit: "LIMITE",
        market: "MARCHÉ",
        orderType: "Type d'Ordre",
        price: "Prix (USD)",
        amount: "Montant",
        available: "Disponible",
        placing: "En cours...",
        increasePrice: "augmenter le prix",
        decreasePrice: "diminuer le prix",
        tradingPeriod: "Période de Trading",
        leverage: "Effet de levier",
        tradingMode: {
            trade: "Trading",
            perpetual: "Perpétuel"
        },
        tabs: {
            positions: "Positions",
            historyOrders: "Historique des ordres",
            transactionHistory: "Historique des transactions"
        },
        orderDetails: {
            status: "Statut",
            price: "Prix",
            amount: "Montant",
            total: "Total"
        },
        futuresDetails: {
            amount: "Montant",
            duration: "Durée",
            entryPrice: "Prix d'Entrée",
            exitPrice: "Prix de Sortie",
            pnl: "P&L",
            opened: "Ouvert",
            closed: "Fermé"
        },
        futuresStatus: {
            long: "Long",
            short: "Court",
            closed: "Fermé",
            liquidated: "Liquidé"
        },
        cancel: "Annuler",
        errors: {
            invalidQuantity: "Veuillez entrer une quantité valide.",
            invalidPrice: "Veuillez entrer un prix valide.",
            invalidAmount: "Veuillez entrer un montant valide.",
            insufficientUSD: "Solde USD insuffisant. Disponible : {0} USD",
            insufficientCoin: "Solde {1} insuffisant. Disponible : {0} {1}",
            failedOrder: "Échec de la passation de l'ordre. Veuillez réessayer.",
            createError: "Erreur de création de trade",
            placeOrderError: "Erreur de passation d'ordre"
        },
        orderBook: {
            price: "Prix (USD)",
            amount: "Montant"
        },
        noData: "Aucun(e) {0} trouvé(e)",
        noTransactionsText: "Vos transactions apparaîtront ici",
        noOrdersText: "Vos {0} apparaîtront ici",
        websocketConnected: "WebSocket connecté :",
        websocketParseError: "Erreur d'analyse des données WebSocket :",
        websocketError: "Erreur WebSocket :",
        websocketClosed: "WebSocket fermé",
        websocketCreateError: "Erreur lors de la création du WebSocket :",
        orderNumberFormat: "ORD-{0}-{1}"
    },

    market: {
        title: "MARCHÉ USD",
        noResults: "Aucune crypto-monnaie trouvée",
        volume: "Vol",
        search: {
            placeholder: "Rechercher une crypto...",
            clear: "Effacer la recherche"
        },
        tableHeaders: {
            pair: "Paire de Trading",
            latestPrice: "Dernier Prix",
            change24h: "Variation 24H"
        },
        websocketConnected: "WebSocket du marché connecté",
        websocketParseError: "Erreur d'analyse des données WebSocket",
        websocketError: "Erreur WebSocket du marché",
        websocketClosed: "WebSocket du marché fermé, code :",
        websocketSetupError: "Erreur de configuration du WebSocket"
    },
    signup: {
        title: "S'INSCRIRE",
        creatingAccount: "CRÉATION...",
        createAccount: "CRÉER UN COMPTE",
        refresh: "Rafraîchir",
        captchaMismatch: "Le captcha ne correspond pas",
        alreadyHaveAccount: "Vous avez déjà un compte ? Connectez-vous",
        terms: {
            text: "En créant un compte, vous acceptez nos",
            link: "Conditions d'Utilisation"
        },
        labels: {
            email: "Email",
            phoneNumber: "Numéro de Téléphone",
            captcha: "Captcha Graphique",
            password: "Mot de passe",
            confirmPassword: "Confirmer le Mot de passe",
            withdrawPassword: "Mot de passe de Retrait",
            invitationCode: "Code d'Invitation"
        },
        placeholders: {
            email: "Entrez votre email",
            phoneNumber: "Entrez votre numéro de téléphone",
            captcha: "Entrez le code",
            password: "Créez un mot de passe",
            confirmPassword: "Confirmez votre mot de passe",
            withdrawPassword: "Entrez le mot de passe de retrait",
            invitationCode: "Entrez le code d'invitation"
        }
    },
    home: {
        logoAlt: "Logo Icmarkets",
        headerAlt: "Plateforme de Trading de Crypto",
        slogan: "Profitez en Toute Confiance",
        promoAlt: "Bannière promo {0}",

        quickTrade: {
            highlight: "Trading",
            title: "Rapide",
            subtitle: "Transactions rapides et opération simple",
        },

        aiTrading: {
            title: "Trading Intelligent IA",
            description: "Un robot de trading quantitatif IA est un système de trading automatisé qui combine l'intelligence artificielle (IA) avec des techniques de trading quantitatif. Sa fonction principale est d'acheter et de vendre automatiquement des produits financiers et des crypto-monnaies sur la base des données de marché et de stratégies de trading spécifiques pour réaliser des profits stables ou contrôler les risques.",
        },

        nftExploration: {
            title: "Explorez les NFT avec Icmarkets",
            description: "Plongez dans le monde des NFT avec Icmarkets, votre portefeuille de trading d'actifs numériques tout-en-un. Conçu pour les débutants et les traders professionnels, Icmarkets vous permet d'explorer, d'acheter, de vendre et de",
        },

        stats: {
            title: "Notre Impact",
            users: "30M+",
            usersLabel: "Nombre d'utilisateurs",
            organizations: "6000+",
            organizationsLabel: "Organisations partenaires",
            liquidity: "7,8 Md+",
            liquidityLabel: "Liquidité",
            orders: "89M",
            ordersLabel: "Ordres traités par seconde",
        },

        services: {
            title: "Nos Services",
            subtitle: "Nous vous offrons un service client manuel spécialisé 24h/24 complet pour protéger vos transactions",
            highInterest: {
                title: "Taux d'intérêt élevé",
                desc: "Finance, taux de rendement élevé",
                alt: "Icône taux d'intérêt élevé",
            },
            liquidityMining: {
                title: "Mining de liquidité",
                desc: "La liquidité génère des profits faciles",
                alt: "Icône mining de liquidité",
            },
            service24h: {
                title: "Service 24h/24",
                desc: "Prêt à répondre à toutes vos questions",
                alt: "Icône service 24h/24",
            },
            highContract: {
                title: "Contrat élevé",
                desc: "Petit capital, effet de levier élevé, enrichissement facile",
                alt: "Icône contrat élevé",
            },
            expertTeam: {
                title: "Équipe d'experts",
                desc: "Équipe technique experte à votre service",
                alt: "Icône équipe d'experts",
            },
            securityProtection: {
                title: "Protection de sécurité",
                desc: "Des données cloud puissantes protègent votre sécurité",
                alt: "Icône protection de sécurité",
            },
        },

        demo: {
            fastSwap: {
                title: "Échange rapide - Échangez vos coins sans souci",
                subtitle: "Du Bitcoin au Dogecoin, nous rendons l'achat et la vente de crypto faciles. Protégez vos crypto avec le stockage à froid de meilleure classe.",
                alt: "Démo d'échange rapide",
            },
            advancedTraders: {
                title: "Pour les traders avancés - Outils puissants pour la conception",
                subtitle: "Des outils d'analyse puissants couplés à notre garantie de sécurité offrent l'expérience de trading ultime. Profitez de capacités de graphiques sophistiqués, de carnets d'ordres en temps réel et d'une liquidité profonde sur des centaines de marchés.",
                alt: "Démo traders avancés",
            },
            walletManagement: {
                title: "Gestion intelligente du portefeuille d'actifs - Croissance régulière des revenus",
                subtitle: "Des outils d'analyse puissants couplés à notre garantie de sécurité offrent l'expérience de trading ultime. Profitez de capacités de graphiques sophistiqués, de carnets d'ordres en temps réel et d'une liquidité profonde sur des centaines de marchés.",
                alt: "Démo gestion de portefeuille",
            },
            liquidityMining: {
                title: "Mining de liquidité, quantification IA",
                subtitle: "Plus de façons de gérer vos actifs, y compris le mining de liquidité et la quantification IA, vous donnent plus de choix pour gérer vos actifs et maintenir leur croissance",
                alt: "Démo mining de liquidité",
            },
            startTrading: {
                title: "Commencer à trader la crypto-monnaie ? - Ouvrez votre crypto maintenant",
                subtitle: "Tradez à tout moment et n'importe où pour répondre aux besoins de trading de divers scénarios à tout moment",
                alt: "Démo débuter le trading",
            },
        },

        news: {
            title: "Nouvelles du cercle",
            elonMusk: {
                date: "14-10-2025",
                title: "Elon Musk Dit que le Bitcoin est Basé sur l'Énergie, Ce qui est Impossible à Falsifier",
                alt: "Nouvelle Elon Musk Bitcoin",
            },
            bitcoinRecord: {
                date: "5-10-2025",
                title: "Le Bitcoin Atteint un Prix Record au-dessus de 125 000 $",
                alt: "Nouveau prix record du Bitcoin",
            },
            trumpStatue: {
                date: "17-9-2025",
                title: "Une statue géante de Trump tenant un Bitcoin exposée devant le Capitole américain pour marquer la décision de taux de la Fed",
                alt: "Nouvelle statue Trump Bitcoin",
            },
        },

        partners: {
            title: "Partenaire Écologique Mondial",
            description: "Établir un consensus et créer un nouvel avenir pour l'écosystème crypto",
            binance: "Binance",
            coinbase: "Coinbase",
            kraken: "Kraken",
            ftx: "FTX",
            bitfinex: "Bitfinex",
            huobi: "Huobi",
        },

        announcements: {
            maintenanceNotice: "Avis de maintenance",
            contractServerUpgrade: "Annonce de mise à niveau et de maintenance du serveur de contrats le 15 janvier 2023",
            IcmarketsOptionsMaintenance: "Annonce de maintenance du système de trading d'options Icmarkets",
            clientVersionUpgrade: "Important ! Annonce de Icmarkets sur la mise à niveau de la dernière version du client",
            platformTradingAnnouncement: "Dernière annonce de trading de la plateforme Icmarkets",
            platformUpgradeOptimization: "Annonce de mise à jour d'optimisation de la version de la plateforme Icmarkets",
            march15Upgrade: "Annonce d'optimisation de maintenance de mise à niveau du serveur de contrats de la plateforme Icmarkets le 15 mars 2023",
            optionsTradingMaintenance: "Annonce de maintenance et d'optimisation du système de trading d'options de la plateforme Icmarkets",
            latestVersionUpgrade: "Annonce importante de la plateforme Icmarkets sur la mise à niveau et l'optimisation de la dernière version du client",
            userSecurityReminder: "Rappel chaleureux sur la sécurité des informations des utilisateurs de Icmarkets",
            perpetualContractUpgrade: "Annonce de la plateforme Icmarkets sur l'optimisation et la mise à niveau du système de contrats perpétuels",
            maintenanceCompletion: "Annonce de l'achèvement de la maintenance et de l'optimisation du système de la plateforme",
            bitcoinWithdrawal: "Annonce sur le retrait de Bitcoin",
            tradingPairsUpgrade: "Annonce sur la mise à niveau de certaines paires de trading de devises sur la plateforme",
            ethWalletMaintenance: "Annonce sur la maintenance du portefeuille du réseau Ethereum (ERC20) de la plateforme",
            ethHardFork: "Annonce de l'achèvement de la mise à niveau du hard fork de l'ETH",
            identityAuthUpdate: "Annonce sur la mise à jour du service d'authentification d'identité avancée de la plateforme",
            filIncomeIssuance: "Avis sur l'émission des revenus de puissance de calcul FIL",
            apiOrderLimit: "Annonce sur l'optimisation de la limite de fréquence des ordres API",
            customerChatFunction: "Mise à jour du système - Fonction de chat client en temps réel",
            ethNetworkUpgrade: "Annonce de mise à niveau du réseau ETH",
            delistingCurrencies: "Annonce de radiation de devises",
            dotUSDLaunch: "Annonce de lancement du trading DOT/USD",
            decUSDLaunch: "Annonce de lancement du trading DEC/USD",
            USDIntroduction: "Présentation de l'USD",
            ethereumNetworkMaintenance: "Avis de maintenance du réseau Ethereum",
            projectReviewStandards: "Normes d'examen de projet Icmarkets",
            liquidityMiningUpgrade: "Mise à niveau du mining de liquidité",
            liquidityMiningFee: "Ajustement des frais de mining de liquidité",
            delistingTradingPairs: "Radiation de paires de trading",
            systemTemporaryMaintenance: "Annonce de maintenance temporaire du système",
            temporaryRechargeSuspension: "Avis de suspension temporaire de recharge",
            delistingNotification: "Notification de radiation",
            serverUpgrade: "Annonce de mise à niveau du serveur",
            serverNetworkUpgrade: "Annonce de mise à niveau du réseau serveur",
            appDownloadOpen: "Notification d'ouverture du téléchargement de l'application",
        },
    },

    withdrawAddressForm: {
        title: "Adresse de Retrait",
        currencyType: "TYPE DE DEVISE",
        withdrawalAddress: "ADRESSE DE RETRAIT",
        currencies: {
            btc: "BTC (Bitcoin)",
            eth: "ETH (Ethereum)",
            USD: "USD (Tether)",
            sol: "SOL (Solana)",
            xrp: "XRP (Ripple)"
        },
        fields: {
            address: "Adresse",
            password: "Mot de passe de Retrait Crypto"
        },
        placeholders: {
            address: "Entrez l'adresse de votre portefeuille",
            password: "Entrez votre mot de passe actuel"
        },
        buttons: {
            save: "SAUVEGARDER"
        },
        notification: {
            success: "Adresse sauvegardée avec succès !"
        }
    },

    withdrawAddress: {
        title: "Adresse de Retrait",
        cardTitle: "TYPE DE DEVISE",
        currencies: {
            btc: "BTC (Bitcoin)",
            eth: "ETH (Ethereum)",
            USD: "USD (Tether)",
            sol: "SOL (Solana)",
            xrp: "XRP (Ripple)"
        }
    },

    privacy: {
        title: "Portail de Confidentialité",
        hero: {
            title: "Portail de Confidentialité Icmarkets",
            subtitle: "Protection de vos données et de votre vie privée avec des directives strictes, une conformité légale et les meilleures pratiques de l'industrie."
        },
        principles: {
            title: "Nos Principes de Confidentialité",
            corePrinciples: "Principes Fondamentaux",
            transparency: {
                title: "Transparence",
                description: "Mises à jour régulières et informations claires sur la façon dont nous traitons vos données."
            },
            accountability: {
                title: "Responsabilité & Conformité",
                description: "Audits réguliers, certifications et adhésion aux lois mondiales sur la confidentialité."
            },
            dataSecurity: {
                title: "Sécurité des Données",
                description: "Chiffrement avancé, contrôles d'accès stricts et protocoles de vérification d'identité."
            },
            dataMinimization: {
                title: "Minimisation des Données & Limitation des Fins",
                description: "Nous collectons uniquement ce qui est nécessaire pour des fins légitimes spécifiques."
            },
            privacyByDesign: {
                title: "Confidentialité Intégrée dès la Conception",
                description: "La confidentialité est intégrée dans tous nos produits et services dès le départ."
            }
        },
        userRights: {
            title: "Vos Droits en Matière de Confidentialité",
            content: "Vous disposez d'outils pour accéder et gérer vos données via notre application ou formulaire web, avec des informations détaillées disponibles dans notre Avis de Confidentialité.",
            note: "Exercez vos droits d'accès, de correction ou de suppression de vos informations personnelles à tout moment."
        },
        personalData: {
            title: "Qu'est-ce qu'une Donnée Personnelle ?",
            definition: "Les données personnelles désignent toute information permettant d'identifier un individu.",
            examples: "Exemples : nom, identifiant Icmarkets, adresse e-mail, données de localisation, historique des transactions et informations sur l'appareil."
        },
        dataUsage: {
            title: "Comment Nous Utilisons Vos Données",
            accountManagement: {
                title: "Gestion de Compte",
                description: "Pour créer et maintenir votre compte, fournir des services et communiquer avec vous."
            },
            legalCompliance: {
                title: "Conformité Légale",
                description: "Pour remplir nos obligations en vertu des lois applicables, y compris les réglementations anti-blanchiment d'argent (AML)."
            },
            securityFraud: {
                title: "Sécurité & Prévention de la Fraude",
                description: "Pour protéger votre compte, détecter et prévenir la fraude, et assurer la sécurité de la plateforme."
            },
            customerSupport: {
                title: "Support Client",
                description: "Pour répondre à vos demandes et fournir une assistance technique en cas de besoin."
            },
            marketing: {
                title: "Marketing & Communications",
                description: "Pour vous envoyer des mises à jour pertinentes, des informations sur les produits et du matériel promotionnel (avec votre consentement)."
            },
            transactionProcessing: {
                title: "Traitement des Transactions",
                description: "Pour faciliter les transactions de crypto-monnaies et maintenir les registres de transactions."
            }
        },
        dataRetention: {
            title: "Conservation des Données",
            content: "Nous conservons vos données aussi longtemps que nécessaire pour fournir nos services, nous conformer aux obligations légales (telles que les exigences fiscales et AML), résoudre les litiges et faire respecter nos accords."
        },
        dataSharing: {
            title: "Partage des Données",
            content: "Nous pouvons partager vos données avec d'autres entités Icmarkets ou des tiers de confiance sous des garanties contractuelles strictes, uniquement lorsque cela est nécessaire aux fins décrites dans notre Avis de Confidentialité."
        },
        cookies: {
            title: "Cookies & Suivi",
            content: "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience utilisateur, fournir un marketing personnalisé et analyser l'utilisation de nos services.",
            link: "Voir notre Politique de Cookies complète"
        },
        actionCards: {
            privacyNotice: {
                title: "Avis de Confidentialité",
                description: "Lire notre politique de confidentialité complète"
            },
            manageData: {
                title: "Gérer les Données",
                description: "Accédez et contrôlez vos informations"
            },
            cookieSettings: {
                title: "Paramètres des Cookies",
                description: "Ajustez vos préférences de suivi"
            },
            helpCenter: {
                title: "Centre d'Aide",
                description: "Obtenez des réponses à vos questions sur la confidentialité"
            }
        },
        notification: "Action terminée avec succès !"
    },

    termsOfUse: {
        title: "Conditions d'Utilisation",
        hero: {
            title: "Conditions d'Utilisation Icmarkets"
        },
        agreement: {
            title: "Accord",
            content: "Il s'agit d'un accord contraignant entre vous (l'utilisateur) et Icmarkets. Il couvre tous les Services Icmarkets que vous accédez ou utilisez."
        },
        riskWarning: {
            title: "Avertissement sur les Risques",
            content: "Les actifs numériques sont volatils et peuvent fluctuer considérablement en valeur. Icmarkets n'est pas un courtier, un conseiller financier ou un conseiller en investissement. Vous devez effectuer votre propre diligence raisonnable avant de prendre toute décision financière."
        },
        aboutServices: {
            title: "À Propos de Nos Services",
            aboutIcmarkets: {
                title: "À Propos de Icmarkets",
                content: "Icmarkets fournit des services d'échange d'actifs numériques, de garde et de services financiers connexes via notre plateforme."
            },
            eligibility: {
                title: "Éligibilité",
                content: "Vous devez avoir au moins 18 ans, être légalement capable de conclure des contrats, ne pas être restreint d'utiliser nos services et ne pas vous trouver dans des juridictions interdites."
            },
            communication: {
                title: "Communication",
                content: "Vous devez maintenir vos informations de contact à jour. Icmarkets vous contactera par e-mail, SMS ou téléphone concernant votre compte et nos services."
            }
        },
        services: {
            title: "Nos Services",
            servicesProvided: {
                title: "Services Fournis",
                content: "Icmarkets propose du trading d'actifs numériques, des solutions de garde sécurisées et un support client via des bots automatisés et des représentants humains. La fonctionnalité de chat utilisateur est également disponible."
            },
            fees: {
                title: "Frais",
                content: "Tous les frais applicables sont listés sur notre page Structure des Frais et sont sujets à des mises à jour. Vous êtes responsable de consulter le barème des frais en vigueur avant d'effectuer des transactions."
            }
        },
        accountManagement: {
            title: "Gestion de Compte",
            accountCreation: {
                title: "Création de Compte",
                content: "Vous devez ouvrir un compte (individuel ou d'entreprise) pour accéder à nos services. Cela nécessite de compléter les procédures de vérification d'identité (KYC/AML) comme requis par la loi."
            },
            identityVerification: {
                title: "Vérification d'Identité",
                content: "Vous devez compléter nos processus de vérification Connaître Votre Client (KYC) et de lutte contre le blanchiment d'argent (AML) avant d'utiliser certains services."
            },
            accountRecords: {
                title: "Registres de Compte",
                content: "Vous pouvez conserver des registres et créer des sous-comptes sous des conditions spécifiques décrites dans nos politiques de gestion de compte."
            }
        },
        transactions: {
            title: "Transactions",
            sufficientBalance: {
                title: "Solde Suffisant",
                content: "Vous devez maintenir un solde suffisant sur votre compte pour toute transaction que vous initiez. Les transactions peuvent échouer ou engendrer des frais supplémentaires si les fonds sont insuffisants."
            },
            transactionCancellation: {
                title: "Annulation de Transaction",
                content: "Icmarkets se réserve le droit d'annuler ou de modifier les transactions en cas de fraude, d'erreurs ou de violations suspectées de ces Conditions."
            },
            unauthorizedTransactions: {
                title: "Transactions Non Autorisées",
                content: "Vous êtes responsable de toute transaction non autorisée sauf si vous pouvez prouver le contraire via notre processus de résolution des litiges."
            }
        },
        digitalAssets: {
            title: "Actifs Numériques",
            supportedAssets: {
                title: "Actifs Supportés",
                content: "Vous ne pouvez effectuer des transactions qu'avec les actifs numériques explicitement supportés par Icmarkets. Tenter de déposer des actifs non supportés peut entraîner une perte permanente."
            },
            forksAirdrops: {
                title: "Forks & Airdrops",
                content: "Icmarkets ne garantit pas le support des forks de blockchain, des airdrops ou d'autres événements similaires. Les décisions de support sont prises à notre seule discrétion."
            }
        },
        accountSecurity: {
            title: "Sécurité du Compte",
            securityRequirements: {
                title: "Exigences de Sécurité",
                content: "Vous devez utiliser un mot de passe fort, activer l'authentification multi-facteurs (MFA), ne jamais partager vos identifiants, surveiller régulièrement l'activité du compte et signaler immédiatement toute violation de sécurité."
            }
        },
        privacy: {
            title: "Confidentialité",
            content: "Votre confidentialité est régie par l'Avis de Confidentialité de Icmarkets, qui explique comment nous collectons, utilisons et protégeons vos informations personnelles."
        },
        termination: {
            title: "Clôture de Compte",
            terminationSuspension: {
                title: "Clôture/Suspension",
                content: "Icmarkets peut restreindre, suspendre ou clôturer des comptes pour fraude, violations de la loi, activité suspecte ou violations des Conditions. Les utilisateurs peuvent fermer des comptes à moins qu'ils ne soient gelés ou dormants."
            }
        },
        prohibitedUse: {
            title: "Utilisation Interdite",
            content: "Vous ne pouvez pas utiliser les services Icmarkets à des fins de fraude, de manipulation de marché, d'activités illégales, d'accès non autorisé ou à toute fin violant les lois applicables ou ces Conditions."
        },
        liability: {
            title: "Responsabilité & Propriété Intellectuelle",
            liability: {
                title: "Responsabilité",
                content: "Icmarkets n'est pas responsable des pertes sauf en cas de négligence grave ou de fraude avérée. Nous ne sommes pas responsables des fluctuations du marché, des problèmes techniques ou des actions de tiers."
            },
            intellectualProperty: {
                title: "Propriété Intellectuelle",
                content: "Icmarkets conserve tous les droits de propriété intellectuelle sur notre plateforme, technologie et marque. Les utilisateurs reçoivent une licence limitée pour utiliser nos services comme décrit dans ces Conditions."
            },
            indemnity: {
                title: "Indemnisation",
                content: "Vous acceptez d'indemniser et de dégager Icmarkets de toute responsabilité pour toute réclamation, perte ou dommage résultant de votre mauvaise utilisation de nos services ou de la violation de ces Conditions."
            }
        },
        importantNotice: {
            title: "Avis Important",
            content: "En utilisant les services Icmarkets, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions d'Utilisation. Si vous n'êtes pas d'accord, vous devez cesser immédiatement d'utiliser nos services."
        },
        actionCards: {
            security: {
                title: "Sécurité",
                description: "Gardez votre compte en sécurité."
            },
            helpCenter: {
                title: "Centre d'Aide",
                description: "Obtenez des réponses à vos questions"
            },
            privacyPolicy: {
                title: "Politique de Confidentialité",
                description: "Consultez nos pratiques de confidentialité"
            },
            legal: {
                title: "Légal",
                description: "Voir tous les documents légaux"
            }
        },
        footer: {
            copyright: "© 2025 Icmarkets. Tous droits réservés.",
            lastUpdated: "Dernière mise à jour : 6 mai 2025"
        }
    },

    assetsDetail: {
        title: "Détails des Actifs",
        today: "Aujourd'hui",
        yesterday: "Hier",
        filter: "Filtrer",
        transactionHistory: {
            title: "Historique des Transactions"
        },
        noTransactions: {
            title: "Aucune Transaction pour l'Instant",
            description: "Votre historique de transactions apparaîtra ici une fois que vous commencerez à trader."
        },
        status: {
            completed: "Terminée",
            pending: "En Attente",
            canceled: "Annulée"
        },
        filterModal: {
            title: "Filtrer les Transactions",
            status: "Statut",
            type: "Type",
            direction: "Sens",
            startDate: "Date de Début",
            endDate: "Date de Fin",
            allStatuses: "Tous les Statuts",
            allTypes: "Tous les Types",
            bothDirections: "Les Deux Sens",
            incoming: "Entrant",
            outgoing: "Sortant",
            completed: "Terminée",
            pending: "En Attente",
            canceled: "Annulée",
            resetFilters: "Réinitialiser les Filtres",
            applyFilters: "Appliquer les Filtres"
        },
        actions: {
            deposit: "Déposer",
            withdraw: "Retirer"
        },
        transactionTypes: {
            transaction: "Transaction",
            deposit: "Dépôt",
            withdrawal: "Retrait",
            convertedFrom: "Converti de {{asset}}",
            convertedTo: "Converti en {{asset}}",
            conversionIn: "Conversion Entrante",
            conversionOut: "Conversion Sortante",
            stakedAmount: "Montant Staké",
            stakingRewards: "Récompenses de Staking",
            futuresReserved: "Futures Réservés",
            futuresProfit: "Profit Futures",
            futuresLoss: "Perte Futures",
            futuresSettlement: "Règlement Futures",
            futuresFee: "Frais Futures",
            futuresRefund: "Remboursement Futures",
            futuresBonus: "Bonus Futures",
            futuresCommission: "Commission Futures",
            manualProfit: "Profit Manuel",
            manualLoss: "Perte Manuelle",
            manualAdjustment: "Ajustement Manuel",
            spotTradingProfit: "Profit Trading Spot",
            spotTradingLoss: "Perte Trading Spot",
            referralReward: "Récompense de Parrainage",
            bonus: "Bonus",
            referralCommission: "Commission de Parrainage",
            orderReserved: "Ordre Réservé",
            orderCancelled: "Ordre Annulé",
            orderPartialFill: "Ordre Partiellement Exécuté",
            orderCompleted: "Ordre Terminé",
            feePayment: "Paiement de Frais",
            balanceAdjustment: "Ajustement de Solde",
            transfer: "Transfert"
        }
    },

    invitation: {
        title: "Inviter des Amis",
        earnTogether: "Gagnez Ensemble",
        description: "Invitez des amis à rejoindre Icmarkets et gagnez des récompenses lorsqu'ils s'inscrivent et commencent à trader.",
        yourReferralCode: "VOTRE CODE DE PARRAINAGE",
        loading: "Chargement...",
        copied: "COPIÉ !",
        copyCode: "COPIER LE CODE",
        totalEarned: "Total Gagné",
        allTimeCommission: "Commission Totale",
        generationMembers: "Membres de Génération",
        noGenerationData: "Aucune donnée de génération disponible",
        approvedMembers: "Membres Approuvés",
        pendingMembers: "Membres en Attente",
        commissionStructure: "Structure des Commissions",
        firstGeneration: "1ère Génération",
        secondGeneration: "2ème Génération",
        thirdGeneration: "3ème Génération",
        firstDepositCommission: "Commission Premier Dépôt",
        stakingProfitsCommission: "Commission Profits Staking",
        howItWorks: "Comment Ça Marche",
        steps: {
            shareCode: {
                title: "Partagez Votre Code de Parrainage",
                description: "Envoyez votre code unique à des amis ou partagez-le sur les réseaux sociaux."
            },
            friendsSignUp: {
                title: "Les Amis S'Inscrivent",
                description: "Vos amis s'inscrivent en utilisant votre code de parrainage et vérifient leurs comptes."
            },
            earnCommissions: {
                title: "Gagnez des Commissions",
                description: "Gagnez des commissions sur les premiers dépôts et les profits de staking de votre réseau."
            }
        },
        referralCopied: "Code de parrainage copié dans le presse-papiers !",
        loadingMembers: "Chargement des membres...",
        approved: "Approuvé",
        joined: "Rejoint",
        noMembersFound: "Aucun membre trouvé"
    },

    securityTips: {
        title: "Centre de Sécurité",
        essentialTips: "Conseils de Sécurité Essentiels",
        categories: {
            passwordSecurity: "Sécurité des Mots de Passe",
            deviceSecurity: "Sécurité des Appareils",
            accountSecurity: "Sécurité du Compte"
        },
        tips: {
            strongPasswords: {
                title: "Utilisez des Mots de Passe Forts et Uniques",
                description: "Créez des mots de passe complexes avec majuscules, minuscules, chiffres et symboles."
            },
            enable2FA: {
                title: "Activez l'Authentification à Deux Facteurs",
                description: "Ajoutez une couche de sécurité supplémentaire à votre compte avec l'A2F."
            },
            changePasswords: {
                title: "Changez les Mots de Passe Régulièrement",
                description: "Mettez à jour vos mots de passe tous les 3-6 mois."
            },
            softwareUpdated: {
                title: "Maintenez les Logiciels à Jour",
                description: "Mettez régulièrement à jour votre OS, votre navigateur et votre logiciel de portefeuille."
            },
            antivirus: {
                title: "Utilisez une Protection Antivirus",
                description: "Installez un logiciel antivirus et anti-malware réputé."
            },
            publicWifi: {
                title: "Évitez le Wi-Fi Public",
                description: "N'accédez jamais à votre portefeuille sur des réseaux publics sans VPN."
            },
            loginNotifications: {
                title: "Activez les Notifications de Connexion",
                description: "Recevez des alertes pour les nouvelles connexions à votre compte."
            },
            reviewActivity: {
                title: "Examinez l'Activité du Compte",
                description: "Vérifiez régulièrement votre compte pour toute activité suspecte."
            },
            whitelisting: {
                title: "Utilisez la Liste Blanche",
                description: "Mettez sur liste blanche les adresses de retrait de confiance pour une sécurité accrue."
            }
        },
        actions: {
            enable2FA: "Activer l'A2F",
            enable2FADesc: "Ajouter une couche de sécurité supplémentaire",
            activityLog: "Journal d'Activité",
            activityLogDesc: "Examiner l'activité récente du compte",
            settings: "Paramètres",
            settingsDesc: "Configurer les préférences de sécurité",
            backupCodes: "Codes de Récupération",
            backupCodesDesc: "Sauvegardez vos codes de récupération"
        },
        emergency: {
            title: "Procédures d'Urgence",
            unauthorizedAccess: "Si vous soupçonnez un accès non autorisé à votre compte, changez immédiatement votre mot de passe et activez l'A2F si ce n'est pas déjà fait.",
            lostDevice: "Si votre appareil est perdu ou volé, révoquez immédiatement l'accès à la session depuis les paramètres de votre compte.",
            phishing: "Si vous avez été victime d'une tentative de phishing, geler votre compte et contactez immédiatement le support.",
            supportTitle: "Support Sécurité 24h/24 et 7j/7",
            supportEmail: "Icmarkets.helpdesk01@gmail.com"
        },
        resources: {
            title: "Ressources de Sécurité",
            securityGuide: "Guide de Sécurité",
            securityGuideLink: "Lire la documentation de sécurité complète",
            learningCenter: "Centre d'Apprentissage",
            learningCenterLink: "Apprenez les meilleures pratiques de sécurité crypto",
            faq: "FAQ",
            faqLink: "Trouvez des réponses aux questions de sécurité courantes"
        }
    },

    notification: {
        title: "Notification",
        loading: "Chargement",
        filters: {
            all: "Toutes",
            unread: "Non lues",
            read: "Lues"
        },
        emptyState: {
            title: "Pas encore de notifications",
            noNotifications: "Vous n'avez pas encore de notifications",
            noFilteredNotifications: "Aucune notification {0} trouvée"
        },
        types: {
            deposit: {
                title: "Dépôt Reçu",
                message: "Votre dépôt de {0} a été confirmé et crédité sur votre portefeuille."
            },
            withdraw: {
                title: "Retrait Réussi",
                message: "Votre retrait de {0} a été traité avec succès."
            },
            staking: {
                title: "Profit de Staking",
                message: "Vous avez gagné {0} grâce à vos récompenses de staking."
            },
            kyc: {
                title: "Mise à Jour KYC",
                defaultMessage: "Votre compte a été activé."
            },
            commission: {
                title: "Commission Reçue",
                message: "Vous avez reçu une commission de {0}."
            },
            futures: {
                title: "Mise à Jour Futures",
                message: "Votre montant de transaction futures {0} a été exécuté."
            },
            accountActivated: {
                title: "Vérification KYC",
                message: "Bonjour {0}, vos documents KYC ont été vérifiés, vous pouvez maintenant profiter de toutes les fonctionnalités illimitées sur Icmarkets"
            },
            custom: {
                title: "Notification",
                defaultMessage: "Vous avez une nouvelle notification."
            },
            cancelDeposit: {
                title: "Dépôt Annulé",
                message: "Votre dépôt de {0} a été annulé."
            },
            cancelWithdraw: {
                title: "Retrait Annulé",
                message: "Votre retrait de {0} a été annulé."
            },
            cancelActivated: {
                title: "Activation Annulée",
                message: "Votre KYC a été refusé par le système, veuillez réessayer ou contacter le Support Client pour obtenir de l'aide"
            }
        }
    },

    staking: {
        title: "Staking",
        totalStakedBalance: "Solde Total Staké",
        earned: "gagné",
        tabs: {
            options: "Options",
            active: "Stakes Actifs",
            completed: "Terminés"
        },
        daily: "Quotidien",
        minimumStake: "Stake Minimum",
        unstakingPeriod: "Période de Détachement",
        days: "jours",
        stakeButton: "Staker {0}",
        status: {
            active: "ACTIF",
            completed: "TERMINÉ"
        },
        remaining: "Restant",
        dailyRate: "Taux Quotidien",
        duration: "Durée",
        createdAt: "Créé Le",
        dateFinish: "Date de fin",
        totalCompletedRewards: "RÉCOMPENSES TOTALES TERMINÉES",
        stake: "STAKER",
        stakes: "STAKES",
        allRewardsFromCompleted: "Toutes les récompenses des stakes terminés",
        totalRewardsEarned: "RÉCOMPENSES TOTALES GAGNÉES",
        balance: "Solde",
        maximumStake: "Stake Maximum",
        estimatedTotalRewards: "Récompenses Totales Estimées",
        exploreStakingOptions: "Explorer les Options de Staking",
        startStaking: "Commencer le Staking",
        emptyStates: {
            options: {
                title: "Aucun Plan de Staking Disponible",
                message: "Il n'y a actuellement aucun plan de staking disponible. Veuillez vérifier plus tard pour de nouvelles opportunités de staking."
            },
            active: {
                title: "Aucun Stake Actif",
                message: "Vous n'avez pas encore de stakes actifs. Commencez le staking pour gagner des récompenses sur vos actifs crypto."
            },
            completed: {
                title: "Aucun Stake Terminé",
                message: "Vous n'avez pas encore terminé de stakes. Vos stakes terminés apparaîtront ici une fois qu'ils seront terminés."
            }
        },
        stakeModal: {
            title: "Staker",
            amountToStake: "Montant à Staker",
            enterAmount: "Entrez Le Montant"
        }
    },
    conversion: {
        title: "Convertir des Cryptos",
        loading: "Chargement des derniers prix...",
        youSend: "Vous envoyez",
        youReceive: "Vous recevez",
        balance: "Solde",
        max: "MAX",
        enterAmount: "Entrer le montant",
        insufficientBalance: "Solde insuffisant",
        estimatedConversion: "Conversion estimée",
        selectDifferentCurrencies: "Sélectionner des devises différentes",
        convertNow: "Convertir Maintenant",
        pricesUpdate: "Les prix se mettent à jour en temps réel",
        selectCurrency: "Sélectionner la Devise",
        searchCurrencies: "Rechercher des devises...",
        confirmConversion: "Confirmer la Conversion",
        confirmExchange: "Confirmer l'Échange",
        conversionDetails: "Détails de la Conversion",
        exchangeRate: "Taux de Change",
        networkFee: "Frais de Réseau",
        estimatedArrival: "Arrivée Estimée",
        arrivalTime: "~30 secondes",
        processingConversion: "Traitement de la Conversion...",
        cancel: "Annuler"
    },

    history: {
        title: "Historique des Transactions",
        emptyState: {
            title: "Aucune transaction trouvée",
            description: "Essayez de modifier vos filtres pour voir plus de transactions"
        },
        filters: {
            all: "Toutes",
            deposits: "Dépôts",
            withdrawals: "Retraits",
            profits: "Profits",
            losses: "Pertes",
            conversions: "Conversions",
            stacking: "Stacking"
        },
        statusFilters: {
            allStatus: "Tous les Statuts",
            completed: "Terminée",
            pending: "En Attente",
            canceled: "Annulée"
        },
        timeFilters: {
            allTime: "Tout le Temps",
            today: "Aujourd'hui",
            week: "Semaine",
            month: "Mois",
            year: "Année"
        },
        status: {
            completed: "Terminée",
            pending: "En Attente",
            canceled: "Annulée"
        },
        dateFormats: {
            today: "Aujourd'hui, {0}",
            yesterday: "Hier, {0}"
        },
        transactionTypes: {
            transaction: "Transaction",
            deposit: "Dépôt",
            withdrawal: "Retrait",
            convertedFrom: "Converti de {0}",
            convertedTo: "Converti en {0}",
            conversionIn: "Conversion Entrante",
            conversionOut: "Conversion Sortante",
            stakedAmount: "Montant Staké",
            stakingRewards: "Récompenses de Staking",
            futuresReserved: "Futures Réservés",
            futuresProfit: "Profit Futures",
            futuresLoss: "Perte Futures",
            futuresSettlement: "Règlement Futures",
            futuresFee: "Frais Futures",
            futuresRefund: "Remboursement Futures",
            futuresBonus: "Bonus Futures",
            futuresCommission: "Commission Futures",
            manualProfit: "Profit Manuel",
            manualLoss: "Perte Manuelle",
            manualAdjustment: "Ajustement Manuel",
            spotTradingProfit: "Profit Trading Spot",
            spotTradingLoss: "Perte Trading Spot",
            referralReward: "Récompense de Parrainage",
            bonus: "Bonus",
            referralCommission: "Commission de Parrainage",
            orderReserved: "Ordre Réservé",
            orderCancelled: "Ordre Annulé",
            orderPartialFill: "Ordre Partiellement Exécuté",
            orderCompleted: "Ordre Terminé",
            feePayment: "Paiement de Frais",
            balanceAdjustment: "Ajustement de Solde",
            transfer: "Transfert"
        }
    },

    withdraw: {
        title: "Retirer des Cryptos",
        selectCurrency: "Sélectionner la Devise",
        selectPlaceholder: "Sélectionnez une devise",
        selectHint: "Veuillez sélectionner une devise pour continuer",
        withdrawalAddress: "Adresse de Retrait",
        withdrawalAmount: "Montant du Retrait",
        withdrawalPassword: "Mot de Passe de Retrait",
        passwordPlaceholder: "Entrez le mot de passe de retrait",
        available: "Disponible",
        amountWithdrawal: "Montant du retrait",
        minimumWithdrawal: "Retrait minimum",
        networkFee: "Frais de réseau",
        youWillReceive: "Vous recevrez",
        confirmWithdrawal: "Confirmer le Retrait",
        processing: "Traitement...",
        securityVerification: "Vérification de Sécurité",
        securityMessage: "Pour votre sécurité, les retraits nécessitent une confirmation par mot de passe et peuvent être soumis à examen. Les retraits vers des adresses incorrectes ne peuvent pas être annulés.",
        networkInfo: "Réseau : {0} ({1})",
        noWalletAddress: "(Aucune adresse de portefeuille)",
        noWallet: {
            title: "Aucune Adresse de Portefeuille Trouvée",
            description: "Vous n'avez pas encore ajouté d'adresse de portefeuille. Veuillez ajouter une adresse de retrait pour procéder à votre transaction.",
            addButton: "Ajouter une Adresse de Portefeuille"
        },
        security: {
            title: "Sécurité d'Abord",
            description: "Pour votre sécurité, nous demandons une adresse de retrait vérifiée pour chaque crypto-monnaie. Cela aide à prévenir les erreurs et garantit que vos fonds atteignent la bonne destination."
        },
        errors: {
            amountNumber: "Le montant du retrait doit être un nombre",
            amountRequired: "Le montant du retrait est requis",
            amountPositive: "Le montant du retrait doit être supérieur à 0",
            amountMin: "Le montant est inférieur au retrait minimum pour cette devise",
            passwordRequired: "Le mot de passe de retrait est requis",
            noWalletAddress: "Aucune adresse de portefeuille trouvée pour {0}. Veuillez d'abord ajouter une adresse de portefeuille.",
            minimumWithdraw: "Retrait minimum pour {0} : {1} {2}",
            insufficientForFee: "Solde insuffisant pour couvrir les frais ({0} {1})"
        },
        validation: {
            selectCurrency: "Sélectionner une devise",
            enterAmount: "Entrer un montant",
            belowMin: "En dessous du minimum ({0} {1})",
            insufficientBalance: "Solde insuffisant",
            insufficientForFee: "Solde insuffisant (frais inclus)",
            enterPassword: "Entrer le mot de passe"
        }
    },
    deposit: {
        title: "Déposer des Cryptos",
        loading: "Chargement de la méthode de dépôt ...",
        selectNetwork: "Sélectionner le Réseau",
        depositAddress: "Votre adresse de dépôt",
        copyAddress: "Copier l'Adresse",
        amountLabel: "Montant du dépôt ({0})",
        amountPlaceholder: "Minimum : {0} {1}",
        txidLabel: "ID de Transaction (TXID)",
        txidPlaceholder: "Entrez Le TXID",
        minimumDeposit: "Dépôt minimum",
        importantNotice: "Avis Important",
        warningMessage: "Veuillez vous assurer de sélectionner le bon réseau pour votre dépôt. L'envoi de fonds via le mauvais réseau peut entraîner une perte permanente de vos actifs, qui ne peut être récupérée.",
        confirmDeposit: "Confirmer le Dépôt",
        network: "Réseau",
        estimatedArrival: "Arrivée estimée",
        networkConfirmations: "3 confirmations réseau",
        processingTime: "Temps de traitement",
        processingTimeValue: "10-30 minutes",
        noMethods: "Aucune méthode de dépôt disponible pour le moment.",
        addressCopied: "Adresse copiée dans le presse-papiers !",
        unknownNetwork: "Réseau Inconnu"
    },

    faq: {
        title: "Centre FAQ",
        hero: {
            title: "Foire Aux Questions",
            subtitle: "Trouvez des réponses aux questions courantes sur l'utilisation de Icmarkets"
        },
        search: {
            placeholder: "Rechercher des réponses..."
        },
        categories: {
            gettingStarted: "Pour Commencer",
            managingAccount: "Gérer Votre Compte"
        },
        questions: {
            howToCreateAccount: "Comment créer un compte ?",
            howToCompleteVerification: "Comment compléter la vérification ?",
            howToBuyCrypto: "Comment acheter de la crypto-monnaie ?",
            howToTrade: "Comment trader des crypto-monnaies ?",
            howToSendReceive: "Comment recevoir et envoyer des cryptos ?",
            howToBecomeP2PMerchant: "Comment devenir un Marchand P2P ?",
            howStakingWorks: "Comment fonctionne le staking ?"
        },
        answers: {
            verificationProcess: "Téléchargez une pièce d'identité gouvernementale et une photo selfie. La vérification est généralement approuvée en quelques heures."
        },
        steps: {
            goToWebsite: "Allez sur https://trade-Icmarkets.com",
            clickSignUp: 'Cliquez sur "S\'inscrire"',
            enterDetails: "Entrez vos coordonnées",
            verifyEmail: "Vérifiez votre adresse e-mail",
            completeVerification: "Complétez d'abord la vérification",
            clickBuyCrypto: 'Cliquez sur "Acheter des Cryptos"',
            selectCoinAndPayment: "Sélectionnez la crypto et le mode de paiement",
            confirmTransaction: "Confirmez la transaction",
            cryptoInWallet: "La crypto apparaîtra dans votre portefeuille",
            goToTradeMarkets: 'Allez dans "Trade/Marchés"',
            pickTradingPair: "Choisissez une paire de trading (ex. BTC/USD)",
            placeOrders: "Passez des ordres au marché ou à limite",
            receiveCrypto: "Allez dans Portefeuille > Recevoir → copiez l'adresse ou le QR code",
            sendCrypto: "Allez dans Portefeuille > Envoyer → entrez l'adresse/le montant → confirmez",
            applyP2P: 'Postulez dans la section "P2P"',
            meetCriteria: "Répondez aux critères d'éligibilité",
            createOffers: "Une fois approuvé, créez des offres & tradez",
            goToStaking: "Allez dans Portefeuilles > Staking",
            pickStakingPlan: "Choisissez un plan de staking",
            selectAmount: "Sélectionnez le montant à staker",
            confirmStaking: "Confirmez la transaction",
            rewardsProcessed: "Les récompenses sont traitées automatiquement à la fin de la période"
        },
        labels: {
            toReceive: "Pour recevoir :",
            toSend: "Pour envoyer :"
        },
        futures: {
            title: "Trading Futures Expliqué",
            whatAreFutures: "Que sont les contrats futures ?",
            futuresExplanation: "Accords d'acheter ou de vendre une crypto à un prix prédéterminé à une date future (règlement en espèces).",
            whatIsLeverage: "Qu'est-ce que l'effet de levier ?",
            leverageExplanation: "Possibilité de trader avec plus de capital que vous n'en avez (ex. effet de levier 10x, 20x, 50x).",
            longShortPositions: "Que sont les positions Long et Short ?",
            long: "Long",
            longExplanation: "= parier que le prix va monter",
            short: "Short",
            shortExplanation: "= parier que le prix va baisser",
            marginLiquidation: "Que sont la Marge et la Liquidation ?",
            marginExplanation: "Risque de liquidation de position si votre collatéral baisse trop pour maintenir la position.",
            fundingRate: "Qu'est-ce que le Taux de Financement ?",
            fundingRateExplanation: "Frais échangés toutes les 8 heures entre les traders long et short pour équilibrer les prix des contrats perpétuels avec les prix spot.",
            profitLossCalculation: "Comment le Profit/Perte est-il calculé ?",
            profitLossExplanation: "Calculé sur la base de la différence de prix multipliée par votre effet de levier et la taille de votre position."
        },
        benefits: {
            title: "Pourquoi Choisir les Futures Icmarkets ?",
            hedge: "Couverture contre la volatilité du marché",
            multiplyProfits: "Multipliez les profits avec l'effet de levier",
            tradeBothMarkets: "Tradez sur les marchés haussiers et baissiers",
            advancedStrategies: "Implémentez des stratégies de trading avancées"
        },
        actionCards: {
            contactSupport: "Contacter le Support",
            getHelp: "Obtenez de l'aide de notre équipe",
            community: "Communauté",
            joinDiscussions: "Rejoignez les discussions"
        },
        footer: {
            copyright: "© 2025 Icmarkets. Tous droits réservés.",
            needHelp: "Besoin de plus d'aide ? Contactez Icmarkets.helpdesk01@gmail.com"
        }
    },

    tabBottomNavigator: {
        home: "accueil",
        grap: "graphique",
        records: "historique",
        starting: "démarrer"
    },

    language: {
        title: "Langue de l'Application",
        selectLanguage: "Sélectionner la Langue",
        choosePreferred: "Choisissez votre langue préférée",
        searchPlaceholder: "Rechercher des langues...",
        currentLanguage: "Langue Actuelle",

        languages: {
            english: "Anglais",
            french: "Français",
            russian: "Russe",
            german: "Allemand",
            spanish: "Espagnol"
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


  components: {
    bottomNav: {
      home: "Accueil",
      market: "Marché",
      trade: "Échanger",
      futures: "Futures",
      wallets: "Portefeuilles"
    },
    coinListModal: {
      title: "Sélectionner une cryptomonnaie",
      loading: "Chargement des données de cryptomonnaies...",
      noResults: "Aucune cryptomonnaie trouvée",
      popular: "Populaire",
      search: {
        placeholder: "Rechercher des cryptomonnaies..."
      }
    }
  },

  auth: {
signin: {
  title: "CONNEXION",
  button: "Se connecter",
  signingIn: "Connexion en cours...",
  forgotPassword: "MOT DE PASSE OUBLIÉ ?",
  signUp: "S'INSCRIRE",
  orContinueWith: "ou continuer avec",
  downloadApp: "TÉLÉCHARGER NOTRE APPLICATION",
  appDescription: "Profitez de la meilleure expérience crypto sur votre appareil mobile",
  googlePlay: "Google Play",
  signupNow: "Inscrivez-vous maintenant",
  forgetPassword: "Mot de passe oublié",
  orSeparator: "OU",
  connectingWallet: "Connexion du portefeuille...",
  loginWithWallet: "Se connecter avec le portefeuille",
  walletNotDetected: "Portefeuille Web3 non détecté",
  installWalletMessage: "Installez MetaMask ou un autre portefeuille Web3 pour utiliser cette fonctionnalité",
  walletSupport: "Prend en charge MetaMask, Coinbase Wallet, etc.",
  mailTab: "Mail",
  phoneTab: "Téléphone",
  backButton: "Retour",
},
fields: {
  mailbox: "Votre boîte mail",
  password: "Votre mot de passe",
  emailPlaceholder: "Veuillez saisir votre adresse e-mail",
  passwordPlaceholder: "Veuillez saisir votre mot de passe",
},

wallet: {
  installRequired: "Veuillez installer MetaMask ou un autre portefeuille Web3",
  connectionRejected: "La connexion au portefeuille a été refusée",
  wrongNetwork: "Veuillez vous connecter au bon réseau",
  connectionFailed: "Échec de la connexion au portefeuille",
  nonceError: "Impossible d’obtenir le nonce depuis le serveur",
  verificationFailed: "La vérification a échoué",
},

common: {
  selectLanguage: "Sélectionner la langue",
  rememberPassword: "Se souvenir de mon mot de passe",
},

    tenants: "Espaces de travail",
    singindesc: "Entrez votre email et mot de passe pour vous connecter",
    signupdesc: "Entrez votre email et mot de passe pour vous inscrire",
    profile: {
      title: "Profil",
      success: "Profil mis à jour avec succès",
      vip: "Félicitations pour votre abonnement",
      wallet: "Paramètres de retrait complétés.",
    },
    createAnAccount: "Créer un compte",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié",

    signup: "S'inscrire",
    signout: "Se déconnecter",
    alreadyHaveAnAccount: "Vous avez déjà un compte ? Connectez-vous.",
    social: {
      errors: {
        "auth-invalid-provider": "Cet email est déjà enregistré avec un autre fournisseur.",
        "auth-no-email": "L'email associé à ce compte est privé ou inexistant.",
      },
    },
    signinWithAnotherAccount: "Se connecter avec un autre compte",
    emailUnverified: {
      message: "Veuillez confirmer votre email à <strong>{0}</strong> pour continuer.",
      submit: "Renvoyer la vérification d'email",
    },
    emptyPermissions: {
      message: "Vous n'avez pas encore de permissions. Attendez que l'administrateur vous accorde des privilèges.",
    },
    passwordResetEmail: {
      message: "Envoyer l'email de réinitialisation du mot de passe",
      error: "Email non reconnu",
    },
    passwordReset: {
      message: "Réinitialiser le mot de passe",
    },
    passwordChange: {
      title: "Changer le mot de passe",
      success: "Mot de passe changé avec succès",
      mustMatch: "Les mots de passe doivent correspondre",
    },
    emailAddressVerificationEmail: {
      error: "Email non reconnu",
    },
    verificationEmailSuccess: "Email de vérification envoyé avec succès",
    passwordResetEmailSuccess: "Email de réinitialisation du mot de passe envoyé avec succès",
    passwordResetSuccess: "Mot de passe changé avec succès",
    verifyEmail: {
      success: "Email vérifié avec succès.",
      message: "Un instant, votre email est en cours de vérification...",
    },
  },

  user: {
    fields: {
      gender: "Genre",
      captcha: "Captcha",
      username: "Nom d'utilisateur",
      walletName: "Nom du portefeuille",
      id: "ID",
      confirmPassword: "Confirmer le mot de passe",
      avatars: "Avatar",
      invitationcode: "Code d'invitation",
      email: "Email",
      emails: "Email(s)",
      erc20: "Adresse portefeuille ERC20",
      trc20: "Adresse portefeuille TRC20",
      fullName: "Nom",
      balance: "Solde",
      firstName: "Prénom",
      lastName: "Nom",
      status: "Statut",
      phoneNumber: "Numéro de téléphone",
      withdrawPassword: "Mot de passe de retrait",
      sector: "Secteur",
      employer: "Employeur",
      profession: "Profession",
      address: "Adresse",
      birthDate: "Date de naissance",
      maritalStatus: "Statut matrimonial",
      facebookLink: "Lien Facebook",
      sponsor: "Parrain",
      role: "Rôle",
      createdAt: "Créé le",
      updatedAt: "Mis à jour le",
      roleUser: "Rôle/Utilisateur",
      roles: "Rôles",
      createdAtRange: "Créé le",
      password: "Mot de passe",
      oldPassword: "Ancien mot de passe",
      newPassword: "Nouveau mot de passe",
      newPasswordConfirmation: "Confirmation du nouveau mot de passe",
      rememberMe: "Se souvenir de moi",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Industrie agroalimentaire",
      ASSURANCES: "Assurance",
      AUDIOVISUEL: "Audiovisuel",
      BANCAIRE: "Bancaire",
      CHIMIE: "Chimie",
      COMPOSANTS_AUTOMOBILES: "Composants automobiles",
      DISTRIBUTION: "Distribution",
      DISTRIBUTION_AUTOMOBILE: "Distribution automobile",
      DIVERS: "Divers",
      FINANCIER: "Financier",
      HOLDING: "Holding",
      IMMOBILIER: "Immobilier",
      INDUSTRIEL: "Industriel",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logistique et transport",
      PHARMACEUTIQUE: "Pharmaceutique",
      SANTÉ: "Santé",
      TOURSIME: "Tourisme",
      INFORMATION_TECHNOLOGY: "Technologie de l'information",
    },
    maritalStatus: {
      célébataire: "Célibataire",
      marié: "Marié",
    },
    status: {
      active: "Actif",
      invited: "Invité",
      "empty-permissions": "En attente des permissions",
      inactive: "Inactif",
    },

    enumerators: {
      status: {
        USD: "USD",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "Homme",
        female: "Femme",
      }
    },
    invite: "Inviter",
    validations: {
      email: "L'email ${value} est invalide",
    },
    title: "Utilisateurs",
    menu: "Utilisateurs",
    doAddSuccess: "Utilisateur(s) enregistré(s) avec succès",
    doUpdateSuccess: "Utilisateur enregistré avec succès",
    exporterFileName: "export_utilisateurs",
    doDestroySuccess: "Utilisateur supprimé avec succès",
    doDestroyAllSelectedSuccess: "Utilisateurs supprimés avec succès",
    edit: {
      title: "Modifier l'utilisateur",
    },
    new: {
      title: "Inviter un ou des utilisateur(s)",
      titleModal: "Inviter un utilisateur",
      emailsHint: "Séparez plusieurs adresses email par une virgule.",
    },
    view: {
      title: "Voir l'utilisateur",
      activity: "Activité",
    },
    importer: {
      title: "Importer des utilisateurs",
      fileName: "modèle_import_utilisateurs",
      hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace. Les relations doivent être les ID des enregistrements référencés séparés par un espace. Les rôles doivent être les ids de rôle séparés par un espace.",
    },
    errors: {
      userAlreadyExists: "Un utilisateur avec cet email existe déjà",
      userNotFound: "Utilisateur non trouvé",
      revokingOwnPermission: "Vous ne pouvez pas révoquer votre propre permission d'administrateur",
    },
  },


  entities: {
    record: {
      menu: "Enregistrements",
      fields: {
        user: "utilisateur",
        product: "produit",
        number: "numéro d'enregistrement",
        status: "statut",
      },
      list: {
        title: "Liste des enregistrements",
      },
      view: {
        title: "Détail de l'enregistrement",
      },
      edit: {
        title: "Modifier l'enregistrement",
      },
      create: {
        success: "Produit soumis avec succès.",
      },
      update: {
        success: "Produit soumis avec succès.",
      },
      destroy: {
        success: "Enregistrement supprimé avec succès",
      },
      destroyAll: {
        success: "Enregistrement supprimé avec succès",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Terminé",
          canceled: "Annulé",
        },
      },
    },

    category: {
      name: "catégorie",
      label: "Catégories",
      menu: "Catégories",
      exporterFileName: "export_categorie",
      list: {
        menu: "Catégories",
        title: "Catégories",
      },
      create: {
        success: "Catégorie enregistrée avec succès",
      },
      update: {
        success: "Catégorie enregistrée avec succès",
      },
      destroy: {
        success: "Catégorie supprimée avec succès",
      },
      destroyAll: {
        success: "Catégorie(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la catégorie",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        photo: "Photo",
        metaKeywords: "Mots-clés Meta",
        metaDescriptions: "Descriptions Meta",
        status: "Statut",
        isFeature: "Est en vedette",
        serialRange: "Série",
        serial: "Série",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle catégorie",
      },
      view: {
        title: "Voir la catégorie",
      },
      importer: {
        title: "Importer des catégories",
        fileName: "modèle_import_categorie",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    product: {
      name: "produit",
      label: "Produits",
      menu: "Produits",
      exporterFileName: "export_produit",
      list: {
        menu: "Produits",
        title: "Produits",
      },
      create: {
        success: "Produit enregistré avec succès",
      },
      update: {
        success: "Produit enregistré avec succès",
      },
      destroy: {
        success: "Produit supprimé avec succès",
      },
      destroyAll: {
        success: "Produit(s) supprimé(s) avec succès",
      },
      edit: {
        title: "Modifier le produit",
      },
      fields: {
        id: "Id",
        name: "Nom",
        slug: "Slug",
        tags: "Tags",
        video: "Vidéo",
        specificationName: "Nom de la spécification",
        specificationDesciption: "Description de la spécification",
        isSpecification: "Est une spécification",
        details: "Détails",
        photo: "Photo",
        discountPriceRange: "Prix remisé",
        discountPrice: "Prix actuel",
        previousPriceRange: "Prix précédent",
        previousPrice: "Prix précédent",
        stockRange: "Stock",
        stock: "Stock",
        metaKeywords: "Mots-clés Meta",
        metaDesctiption: "Description courte",
        status: "Statut",
        isType: "Type",
        dateRange: "Date",
        date: "Date",
        itemType: "Type d'article",
        file: "Fichier",
        link: "Lien",
        fileType: "Type de fichier",
        taxe: "Taxe",
        category: "Catégorie",
        subcategory: "Sous-catégorie",
        childcategory: "Sous-sous-catégorie",
        brand: "Marque",
        gallery: "Galerie",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          enable: "Activer",
          disable: "Désactiver",
        },
        itemType: {
          physical: "physique",
          digitale: "Numérique",
        },
        fileType: {
          file: "Fichier",
          link: "Lien",
        },
        isType: {
          new_arrival: "Nouvelle arrivée",
          feature_product: "Produit vedette",
          top_pdroduct: "Produit populaire",
          best_product: "Meilleur produit",
          flash_deal_product: "Produit en promotion flash",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouveau produit",
      },
      view: {
        title: "Voir le produit",
      },
      importer: {
        title: "Importer des produits",
        fileName: "modèle_import_produit",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
    transaction: {
      name: "transaction",
      label: "Transactions",
      menu: "Transactions",
      exporterFileName: "export_transaction",
      list: {
        menu: "Transactions",
        title: "Transactions",
      },
      create: {
        success: "Transaction envoyée avec succès",
      },
      update: {
        success: "Transaction enregistrée avec succès",
      },
      destroy: {
        success: "Transaction supprimée avec succès",
      },
      destroyAll: {
        success: "Transaction(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la transaction",
      },
      fields: {
        id: "Id",
        amountRange: "Montant",
        amount: "Montant",
        email: "Email",
        tax: "Taxe",
        currencySign: "Signe monétaire",
        currencyValue: "Valeur monétaire",
        orderId: "ID de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        status: {
          pending: "En attente",
          completed: "Succès",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle transaction",
      },
      view: {
        title: "Voir la transaction",
      },
      importer: {
        title: "Importer des transactions",
        fileName: "modèle_import_transaction",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },

    order: {
      name: "commande",
      label: "Commandes",
      menu: "Commandes",
      exporterFileName: "export_commande",
      list: {
        menu: "Commandes",
        title: "Commandes",
      },
      create: {
        success: "Commande enregistrée avec succès",
      },
      update: {
        success: "Commande enregistrée avec succès",
      },
      destroy: {
        success: "Commande supprimée avec succès",
      },
      destroyAll: {
        success: "Commande(s) supprimée(s) avec succès",
      },
      edit: {
        title: "Modifier la commande",
      },
      fields: {
        id: "Id",
        userId: "Utilisateur",
        cart: "Panier",
        shipping: "Livraison",
        discountRange: "Remise",
        discount: "Remise",
        paymentMethod: "Méthode de paiement",
        taxe: "Taxe",
        transactionNumber: "Numéro de transaction",
        orderStatus: "Statut de commande",
        createdAt: "Créé à",
        updatedAt: "Mis à jour à",
        createdAtRange: "Créé à",
      },
      enumerators: {
        orderStatus: {
          pending: "En attente",
          in_progress: "En cours",
          delivered: "Livré",
          canceled: "Annulé",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nouvelle commande",
      },
      view: {
        title: "Voir la commande",
      },
      importer: {
        title: "Importer des commandes",
        fileName: "modèle_import_commande",
        hint: "Les colonnes Fichiers/Images doivent être les URL des fichiers séparés par un espace.",
      },
    },
  },



  errors: {
    backToHome: "Retour à l'accueil",
    403: `Désolé, vous n'avez pas accès à cette page`,
    404: "Désolé, la page que vous avez visitée n'existe pas",
    500: "Désolé, le serveur signale une erreur",
    429: "Trop de requêtes. Veuillez réessayer plus tard.",
    forbidden: {
      message: "Interdit",
    },
    validation: {
      message: "Une erreur s'est produite",
    },
    defaultErrorMessage: "Oups, une erreur s'est produite",
  },

  withdraw: {
    withdrawamount: "Montant du retrait",
    Withdrawpassword: "Mot de passe de retrait",
    availablebalance: "Solde disponible",
    rules: "Description des règles",
    rule1: "Le retrait minimum est de 20 $",
    rule2: "Le paiement sera effectué dans les 24 heures suivant la demande de retrait",
    rule3: "L'absence de soumission des commandes quotidiennes entraîne l'impossibilité de retrait, tous les produits doivent être soumis pour retrait"
  },
  profile: {
    profile: "Profil",
    fullname: "Nom complet",
    email: "Email",
    phonenumber: "Numéro de téléphone",
    country: "Pays",
    Invitationcode: "Code d’invitation"
  },
  wallet: {
    wallet: "Portefeuille",
    info: "Informations sur la méthode de retrait",
    username: "Nom d'utilisateur",
    walletname: 'Nom du portefeuille',
    walletaddress: 'Adresse du portefeuille',
    note: "Remarque",
    notedesctiption: "Veuillez remplir ces informations avec précaution."
  },


  cs: {
    cs: "Service client",
    note: "Si vous avez des questions ou rencontrez des problèmes, veuillez nous envoyer un email ou discuter avec notre équipe de support client en ligne.",
    contactnow: "Contacter maintenant"
  },
  transaction: {
    transaction: "Transaction",
    all: "Tout",
    withdraw: "Retrait",
    dposit: "Dépôt",
    notransaction: "Aucune transaction pour le moment !"
  },
  order: {
    order: "Commande",
    completed: "Complété",
    pending: "En attente",
    canceled: "Annulé",
    ordertime: "Heure de la commande",
    ordernumber: "Numéro de commande",
    total: "Montant total de la commande",
    commission: "Commission",
    return: "Retour estimé"
  },

  security: {
    changepassword: "Changer le mot de passe",
    oldpassword: "Ancien mot de passe",
    newpassword: "Nouveau mot de passe",
    confirmpassword: "Confirmer le mot de passe",
    note: "Remarque",
    notedesc: "Veuillez remplir ces informations avec précaution"
  },



  tabbarmenue: {
    home: "Accueil",
    rate: "Évaluer",
    profile: "Profil"
  },


  validation: {
    mixed: {
      default: "${path} est invalide",
      required: "${path} est requis",
      oneOf: "${path} doit être l'une des valeurs suivantes : ${values}",
      notOneOf: "${path} ne doit pas être l'une des valeurs suivantes : ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} doit être un(e) ${type}`;
      },
    },
    string: {
      length: "${path} doit contenir exactement ${length} caractères",
      min: "${path} doit contenir au moins ${min} caractères",
      max: "${path} doit contenir au maximum ${max} caractères",
      matches: '${path} doit correspondre au format suivant : "${regex}"',
      email: "${path} doit être une adresse e-mail valide",
      url: "${path} doit être une URL valide",
      trim: "${path} doit être une chaîne sans espaces au début et à la fin",
      lowercase: "${path} doit être en minuscules",
      uppercase: "${path} doit être en majuscules",
      selected: "${path} doit être sélectionné",
    },
    number: {
      min: "${path} doit être supérieur ou égal à ${min}",
      max: "${path} doit être inférieur ou égal à ${max}",
      lessThan: "${path} doit être inférieur à ${less}",
      moreThan: "${path} doit être supérieur à ${more}",
      notEqual: "${path} ne doit pas être égal à ${notEqual}",
      positive: "${path} doit être un nombre positif",
      negative: "${path} doit être un nombre négatif",
      integer: "${path} doit être un nombre entier",
    },
    date: {
      min: "${path} doit être postérieur à ${min}",
      max: "${path} doit être antérieur à ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} ne doit pas contenir de clés non spécifiées dans l'objet",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} est requis`
          : `${path} doit contenir au moins ${min} éléments`,
      max: "${path} doit contenir au maximum ${max} éléments",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Téléverser",
    image: "Vous devez téléverser une image",
    size: "Le fichier est trop volumineux. La taille maximale autorisée est de {0}",
    formats: `Format invalide. Doit être l'un des suivants : {0}.`,
  },


};

export default fr;
