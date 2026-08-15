

const ptBR = {
  app: {
    title: "Nowspeed"
  },
  common: {
    timeout: "Tempo limite da solicitação",
    requestAborted: "Solicitação cancelada",
    fetchError: "Erro ao buscar dados do mercado",
    dateNotAvailable: "Data não disponível",
    currencyFormat: "${0}",
    invalidDate: "Data inválida",
    invalidTime: "Hora inválida",
    unknown: "Desconhecido",
    na: "N/D",
    back: "Voltar",
    close: "Fechar",
  },

  inputs: {
    username: "Nome de Usuário",
    password: "Senha",
    phoneNumber: "Número de Telefone",
    withdrawPassword: "Senha de Saque",
    confirmPassword: "Confirmar Senha",
    invitationcode: "Código de Convite",
    walletaddress: "Endereço da carteira"

  },
  stake: {
    enterAmount: "Digite um valor",
    insufficientBalance: "Saldo insuficiente",
    minAmount: "Mín: {{min}}",
    maxAmount: "Máx: {{max}}",
    confirmStake: "Confirmar Stake"
  },


  components: {
    bottomNav: {
      home: "Início",
      market: "Mercado",
      trade: "Negociar",
      futures: "Futuros",
      wallets: "Carteiras"
    },
    coinListModal: {
      title: "Selecionar Criptomoeda",
      loading: "Carregando dados de criptomoedas...",
      noResults: "Nenhuma criptomoeda encontrada",
      popular: "Populares",
      search: {
        placeholder: "Pesquisar criptomoedas..."
      }
    }
  },

  auth: {
signin: {
  title: "LOGIN",
  button: "Entrar",
  signingIn: "Entrando...",
  forgotPassword: "ESQUECEU A SENHA?",
  signUp: "CADASTRAR",
  orContinueWith: "ou continuar com",
  downloadApp: "BAIXE NOSSO APP",
  appDescription: "Tenha a melhor experiência cripto no seu dispositivo móvel",
  googlePlay: "Google Play",
  signupNow: "Cadastre-se agora",
  forgetPassword: "Esqueci a senha",
  orSeparator: "OU",
  connectingWallet: "Conectando carteira...",
  loginWithWallet: "Entrar com carteira",
  walletNotDetected: "Carteira Web3 não detectada",
  installWalletMessage: "Instale a MetaMask ou outra carteira Web3 para usar este recurso",
  walletSupport: "Suporta MetaMask, Coinbase Wallet, etc.",
  mailTab: "E-mail",
  phoneTab: "Telefone",
  backButton: "Voltar",
},
    fields: {
  mailbox: "Sua caixa de correio",
  password: "Sua senha",
  emailPlaceholder: "Por favor, insira seu e-mail",
  passwordPlaceholder: "Por favor, insira sua senha",
},

wallet: {
  installRequired: "Instale o MetaMask ou outra carteira Web3",
  connectionRejected: "A conexão da carteira foi rejeitada",
  wrongNetwork: "Conecte-se à rede correta",
  connectionFailed: "Falha ao conectar a carteira",
  nonceError: "Falha ao obter o nonce do servidor",
  verificationFailed: "Falha na verificação",
},

common: {
  selectLanguage: "Selecionar idioma",
  rememberPassword: "Lembrar minha senha",
},

    tenants: "Espaços de Trabalho",
    singindesc: "Digite seu email e senha para entrar",
    signupdesc: "Digite seu email e senha para cadastrar",
    profile: {
      title: "Perfil",
      success: "Perfil atualizado com sucesso",
      vip: "Parabéns pela assinatura",
      wallet: "Configurações de saque concluídas.",
    },
    createAnAccount: "Criar uma conta",
    rememberMe: "Lembrar-me",
    forgotPassword: "Esqueci a senha",

    signup: "Cadastrar",
    signout: "Sair",
    alreadyHaveAnAccount: "Já tem uma conta? Entre.",
    social: {
      errors: {
        "auth-invalid-provider": "Este email já está registrado com outro provedor.",
        "auth-no-email": "O email associado a esta conta é privado ou inexistente.",
      },
    },
    signinWithAnotherAccount: "Entrar com outra conta",
    emailUnverified: {
      message: "Confirme seu email em <strong>{0}</strong> para continuar.",
      submit: "Reenviar verificação de email",
    },
    emptyPermissions: {
      message: "Você ainda não tem permissões. Aguarde o admin conceder privilégios.",
    },
    passwordResetEmail: {
      message: "Enviar email de redefinição de senha",
      error: "Email não reconhecido",
    },
    passwordReset: {
      message: "Redefinir senha",
    },
    passwordChange: {
      title: "Alterar Senha",
      success: "Senha alterada com sucesso",
      mustMatch: "As senhas devem coincidir",
    },
    emailAddressVerificationEmail: {
      error: "Email não reconhecido",
    },
    verificationEmailSuccess: "Email de verificação enviado com sucesso",
    passwordResetEmailSuccess: "Email de redefinição de senha enviado com sucesso",
    passwordResetSuccess: "Senha alterada com sucesso",
    verifyEmail: {
      success: "Email verificado com sucesso.",
      message: "Um momento, seu email está sendo verificado...",
    },
  },

  user: {
    fields: {
      gender: "Gênero",
      captcha: "Captcha",
      username: "Nome de usuário",
      walletName: "Nome da carteira",
      id: "ID",
      confirmPassword: "Confirmar Senha",
      avatars: "Avatar",
      invitationcode: "Código de Convite",
      email: "Email",
      emails: "Email(s)",
      erc20: "Endereço da carteira ERC20",
      trc20: "Endereço da carteira TRC20",
      fullName: "Nome",
      balance: "Saldo",
      firstName: "Nome",
      lastName: "Sobrenome",
      status: "Status",
      phoneNumber: "Telefone",
      withdrawPassword: "Senha de Saque",
      sector: "Setor",
      employer: "Empregador",
      profession: "Profissão",
      address: "Endereço",
      birthDate: "Data de Nascimento",
      maritalStatus: "Estado Civil",
      facebookLink: "Link do Facebook",
      sponsor: "Patrocinador",
      role: "Função",
      createdAt: "Criado em",
      updatedAt: "Atualizado em",
      roleUser: "Função/Usuário",
      roles: "Funções",
      createdAtRange: "Criado em",
      password: "Senha",
      oldPassword: "Senha Antiga",
      newPassword: "Nova Senha",
      newPasswordConfirmation: "Confirmar Nova Senha",
      rememberMe: "Lembrar-me",
    },
    sector: {
      AGRO_ALIMENTAIRE: "Indústria alimentícia",
      ASSURANCES: "Seguros",
      AUDIOVISUEL: "Audiovisual",
      BANCAIRE: "Bancário",
      CHIMIE: "Química",
      COMPOSANTS_AUTOMOBILES: "Componentes automotivos",
      DISTRIBUTION: "Distribuição",
      DISTRIBUTION_AUTOMOBILE: "Distribuição automotiva",
      DIVERS: "Diversos",
      FINANCIER: "Financeiro",
      HOLDING: "Holding",
      IMMOBILIER: "Imobiliário",
      INDUSTRIEL: "Industrial",
      LEASING: "Leasing",
      LOGISTIQUE_TRANSPORT: "Logística e Transporte",
      PHARMACEUTIQUE: "Farmacêutico",
      SANTÉ: "Saúde",
      TOURSIME: "Turismo",
      INFORMATION_TECHNOLOGY: "Tecnologia da Informação",
    },
    maritalStatus: {
      célébataire: "Solteiro",
      marié: "Casado",
    },
    status: {
      active: "Ativo",
      invited: "Convidado",
      "empty-permissions": "Aguardando Permissões",
      inactive: "Inativo",
    },

    enumerators: {
      status: {
        USD: "USD",
        ETH: "ETH",
        BTC: "BTC",
      },
      gender: {
        male: "Masculino",
        female: "Feminino",
      }
    },
    invite: "Convidar",
    validations: {
      email: "Email ${value} é inválido",
    },
    title: "Usuários",
    menu: "Usuários",
    doAddSuccess: "Usuário(s) salvo(s) com sucesso",
    doUpdateSuccess: "Usuário salvo com sucesso",
    exporterFileName: "exportacao_usuarios",
    doDestroySuccess: "Usuário excluído com sucesso",
    doDestroyAllSelectedSuccess: "Usuários excluídos com sucesso",
    edit: {
      title: "Editar Usuário",
    },
    new: {
      title: "Convidar Usuário(s)",
      titleModal: "Convidar Usuário",
      emailsHint: "Separe múltiplos emails usando vírgula.",
    },
    view: {
      title: "Visualizar Usuário",
      activity: "Atividade",
    },
    importer: {
      title: "Importar Usuários",
      fileName: "modelo_importacao_usuarios",
      hint: "Colunas de Arquivos/Imagens devem ser URLs separados por espaço. Relacionamentos devem ser IDs dos registros separados por espaço. Funções devem ser IDs de função separados por espaço.",
    },
    errors: {
      userAlreadyExists: "Usuário com este email já existe",
      userNotFound: "Usuário não encontrado",
      revokingOwnPermission: "Você não pode revogar sua própria permissão de admin",
    },
  },




  pages: {
    helpCenterDetail: {
      faqNotFound: "Item FAQ não encontrado, redirecionamento necessário",

      questions: {
        aiQuantification: "Introdução à Quantificação por IA",
        exploreNFTs: "Explore NFTs com AureX",
        bitcoinEnergy: "Elon Musk Diz que Bitcoin é Baseado em Energia, o que é Impossível Falsificar\n13/10/2025, 8:00:00 AM (UTC-8)",
        bitcoinRecordPrice: "Bitcoin Atinge Preço Recorde Acima de US$ 125.000\n4/10/2025, 8:00:00 AM (UTC-8)",
        trumpStatueBitcoin: "Estátua gigante de Trump segurando Bitcoin exibida fora do Capitólio dos EUA para marcar decisão de taxa do Fed\n16/9/2025, 8:00:00 AM (UTC-8)"
      },

      answers: {
        aboutAccounts: "Contas formais podem usar todas as funções online da plataforma, enquanto contas demo só podem usar algumas das funções da plataforma de forma limitada, não podem usar mineração de liquidez para obter lucros e não podem depositar e retirar criptomoedas. (Contas demo podem receber fundos virtuais fixos uma vez no dia 1º de cada mês)",
        transactionVolume: "De acordo com as disposições relevantes da Lei de Combate à Lavagem de Dinheiro, cada transação requer controle de preços, e um certo volume de transações deve ser concluído antes que a moeda possa ser retirada, para evitar que os usuários lavem dinheiro na exchange! Por exemplo, se você depositar 10.000U, o valor da transação deve atingir o valor especificado relevante!",
        transferFunds: "Para garantir a independência dos fundos entre suas várias contas e facilitar seu controle de risco razoável, as contas dos principais módulos de negociação são divididas. Transferência refere-se ao processo de converter ativos entre várias contas de negociação.",
        whatAreFutures: "Futuros, também conhecidos como contratos futuros, são uma forma de negociação que atravessa o tempo. Compradores e vendedores assinam um contrato para concordar em entregar uma quantidade especificada de bens à vista em um horário, preço e outras condições de negociação especificadas. Os futuros geralmente são concentrados em bolsas de futuros e comprados e vendidos com contratos padronizados. Os ativos negociados são normalmente commodities ou instrumentos financeiros. O preço predeterminado que ambas as partes concordam em comprar e vender um ativo é chamado de preço futuro.",
        convertedAmountChanges: "O valor convertido em ativos é o valor da criptomoeda atualmente mantida em USD. Ele muda devido às flutuações de preço dos ativos digitais, mas a quantidade dos seus ativos digitais não muda.",
        realNameAuthentication: "Para a segurança dos seus fundos, limitamos a associação da sua conta de recebimento com as informações de nome real da sua conta atual.",
        frozenAssets: "Ativos congelados significa que quando você realiza transações ou operações de retirada, o processo não está totalmente concluído. Os ativos atuais são gerenciados temporariamente pelo sistema e não podem ser controlados livremente por você. Não significa que você perdeu o ativo ou que há algo anormal com o ativo. Por favor, fique tranquilo.",
        futuresTradingRules: "Participe de transações estimando a próxima tendência de preço (alta ou baixa) do par de negociação atual. A faixa do aumento ou diminuição não é calculada durante a liquidação, e apenas a receita é calculada com base no resultado do aumento ou diminuição. As porcentagens de lucro para liquidação em diferentes horários de entrega são diferentes, e os lucros serão exibidos com precisão na interface de negociação.",
        aiQuantification: "Um robô de negociação quantitativa de IA é um sistema de negociação automatizado que combina inteligência artificial (IA) com técnicas de negociação quantitativa. Sua função principal é comprar e vender automaticamente produtos financeiros e criptomoedas com base em dados de mercado e estratégias de negociação específicas para alcançar lucros estáveis ou controlar riscos.",
        exploreNFTs: "Entre no mundo dos NFTs com AureX, sua carteira de negociação de ativos digitais tudo-em-um. Projetado para iniciantes e traders profissionais, o AureX permite que você explore, compre, venda e gerencie NFTs de alta qualidade de forma segura e eficiente.\n\nCom segurança avançada, rastreamento em tempo real e transações perfeitas, o AureX mantém você no controle total de seus colecionáveis digitais. Desde peças de arte exclusivas até ativos digitais de edição limitada, descubra o futuro da propriedade digital — tudo em um só lugar, com confiança e facilidade.",
        bitcoinEnergy: "O CEO da Tesla e Spacex, Elon Musk, disse em 14 de outubro no X que o bitcoin é baseado em energia, contrastando-o com moedas fiduciárias que os governos podem inflacionar. Sua observação foi em resposta a uma postagem do Zerohedge ligando o aumento nos preços do ouro, prata e bitcoin à desvalorização monetária impulsionada pelos gastos do governo na corrida armamentista global de inteligência artificial. O Zerohedge acrescentou que o dinheiro pode ser impresso, mas a energia não. Musk concordou, escrevendo: 'Verdade. É por isso que o bitcoin é baseado em energia: você pode emitir moeda fiduciária falsa, e todos os governos na história fizeram isso, mas é impossível falsificar energia.'\n\nO que Elon Musk disse sobre bitcoin e energia?\nElon Musk afirmou que o Bitcoin é baseado em energia, enfatizando que, embora os governos possam imprimir moeda fiduciária, a energia não pode ser falsificada ou criada artificialmente.\n\nPor que Elon Musk contrastou bitcoin com moedas fiduciárias?\nMusk destacou que as moedas fiduciárias são propensas à inflação porque os governos podem emitir mais delas, enquanto a fundação do bitcoin na energia lhe dá uma base de valor mais tangível e limitada.\n\nQual foi o contexto do comentário de Musk sobre bitcoin?\nSeu comentário respondeu a uma postagem do Zerohedge sugerindo que o aumento dos preços do ouro, prata e bitcoin está ligado aos gastos governamentais globais e à desvalorização monetária causada pela corrida armamentista de IA.\n\nQual é a principal lição da declaração de Musk?\nA observação de Musk reforça a ideia de que o valor do bitcoin está enraizado no custo real da energia, contrastando-o com a natureza facilmente manipulável do dinheiro fiduciário tradicional.",
        bitcoinRecordPrice: "Bitcoin conquistou uma nova alta.\n\nA principal criptomoeda durante a noite tocou um recorde, atingindo máximas históricas em torno de US$ 125.400 para superar a antiga marca, estabelecida em agosto em torno de US$ 124.480. (Mais recentemente, foi negociado mais perto de US$ 123.000.)\n\nOs últimos movimentos têm o valor de mercado total do bitcoin em cerca de US$ 2,45 trilhões, de acordo com o CoinMarketCap, e o valor total das criptomoedas em cerca de US$ 4,21 trilhões. O bitcoin teve um ano dramático, subindo de preços abaixo de US$ 80.000 vistos em abril.\n\nEmbora os touros do bitcoin geralmente tenham visto a subida contínua da moeda como inevitável, alguns tiveram razões mais específicas para prever mais alta no final de 2025. Tem um histórico de registrar novos recordes na janela de 1.064 dias após os mínimos do mercado em baixa, o último dos quais foi em 21 de novembro de 2022.\n\nEnquanto isso, os volumes de negociação de bitcoin em exchanges de criptomoedas têm aumentado desde uma redução no final de setembro. Volumes crescentes tendem a ser bons para os preços.\n\nAlguns analistas veem razões para esperar que o bitcoin continue subindo. Analistas do JPMorgan em uma nota de 1º de outubro sugeriram que a 'negociação de desvalorização' — na qual investidores institucionais e de varejo protegem suas apostas com ouro e bitcoin — ganhe força em meio a preocupações que vão desde o aumento da incerteza geopolítica até a dívida governamental persistentemente alta nas economias e o declínio da dominância do dólar americano.\n\nDe forma mais ampla, desenvolvimentos recentes sugeriram que a indústria de criptomoedas está fazendo progresso contínuo enquanto busca reivindicar mais dólares de investidores e posição no mundo das finanças — entre eles o lançamento de vários novos ETFs de criptomoedas e o aumento da popularidade das ações do tesouro de criptomoedas.",
        trumpStatueBitcoin: "WASHINGTON (7News) — Uma estátua dourada de 12 pés do Presidente Donald Trump segurando um Bitcoin foi instalada fora do Capitólio dos EUA, coincidindo com a próxima decisão da taxa de juros do Federal Reserve na quarta-feira.\n\nÀs 14h, o Fed anunciou que reduziu sua taxa de juros principal em um quarto de ponto, marcando o primeiro corte desde dezembro de 2024. O corte reduzirá a taxa de curto prazo para cerca de 4,1% ante 4,3%. No ano passado, o banco central reduziu as taxas três vezes devido a preocupações de que o crescimento do emprego estava desacelerando e o desemprego estava aumentando.\n\nO banco central também revelou planos para mais dois cortes de taxas este ano. No entanto, apenas um é antecipado em 2026, o que pode decepcionar Wall Street, que esperava cinco cortes até o próximo ano.\n\nA peça temporária, localizada na 3ª Rua das 9h às 16h, foi financiada por um coletivo de investidores em criptomoedas. Os organizadores disseram que a peça tem a intenção de provocar debate sobre o futuro da moeda digital, política monetária e o papel do governo federal nos mercados financeiros."
      }
    },
    transfer: {
      title: "Histórico de Transferências",
      noTransferHistory: "Nenhum histórico de transferência disponível",

      accountTypes: {
        trade: "Conta de Negociação",
        perpetual: "Conta Perpétua",
        exchange: "Conta de Exchange"
      },

      status: {
        completed: "Concluído"
      }
    },
    settings: {
      title: "Configurações",
      language: "Idioma",
      quotationCurrency: "Moeda de cotação",
      colorConfiguration: "Configuração de cores",
      aboutUs: "Sobre nós",
      versionNumber: "Número da versão",
      selected: "Selecionado",

      colorSchemes: {
        greenRiseRedFall: {
          name: "Verde sobe, Vermelho desce",
          alt: "Esquema de cores de gráfico Verde sobe, Vermelho desce",
          description: "Cores tradicionais de negociação: verde para aumentos de preço, vermelho para quedas de preço"
        },
        redRiseGreenFall: {
          name: "Vermelho sobe, Verde desce",
          alt: "Esquema de cores de gráfico Vermelho sobe, Verde desce",
          description: "Cores alternativas de negociação: vermelho para aumentos de preço, verde para quedas de preço"
        }
      },

      modals: {
        language: {
          title: "Selecionar Idioma"
        },
        colorConfiguration: {
          title: "Configuração de Cores"
        }
      }
    },

    wallet: {
      myAssets: "Meus Ativos",
      assetValuation: "Avaliação de Ativos",
      myAccount: "Minha Conta",
      showAmounts: "Mostrar valores",
      hideAmounts: "Ocultar valores",
      usdEquivalent: "≈ USD {0}",
      noAssetsFound: "Nenhum ativo encontrado",

      quickActions: {
        withdraw: "Retirar",
        deposit: "Depositar",
        transfer: "Transferir",
        swap: "Trocar"
      },

      accountTabs: {
        exchange: "Exchange",
        trade: "Negociação",
        perpetual: "Perpétua"
      },

      assetLabels: {
        availableBalance: "Saldo disponível",
        frozenAmount: "Valor congelado",
        valuation: "Avaliação"
      },

      errors: {
        fetchAssets: "Erro ao buscar ativos:"
      }
    },

    loginPassword: {
      title: "Senha de Login",
      cardTitle: "ALTERAR SENHA DE LOGIN",
      fields: {
        oldPassword: "Senha Antiga",
        newPassword: "Nova Senha",
        newPasswordConfirmation: "Confirmar Senha",
        mailbox: "Seu e-mail"
      },
      placeholders: {
        oldPassword: "Digite sua senha atual",
        newPassword: "Crie uma nova senha",
        confirmPassword: "Confirme sua nova senha"
      },
      buttons: {
        saveChanges: "SALVAR ALTERAÇÕES"
      },
      warningMessage: "Para a segurança dos seus fundos, retiradas não são permitidas dentro de 24 horas após a alteração da senha de login.",
      validation: {
        mustMatch: "As senhas devem corresponder"
      }
    },

    futures: {
      title: "Futuros",
      actions: {
        buyUp: "COMPRAR ALTA",
        buyDown: "COMPRAR BAIXA"
      },
      tabs: {
        openOrders: "Ordens Abertas",
        recentOrders: "Ordens Recentes"
      },
      orderDetails: {
        title: "Detalhes da Ordem",
        open: "Aberto",
        closed: "Fechado",
        completed: "Concluído",
        futuresAmount: "Valor do Futuro:",
        contractDuration: "Duração do Contrato:",
        seconds: "Segundos",
        futuresStatus: "Status do Futuro:",
        openPositionPrice: "Preço de Abertura de Posição:",
        openPositionTime: "Hora de Abertura de Posição:",
        closePositionPrice: "Preço de Fechamento de Posição:",
        closePositionTime: "Hora de Fechamento de Posição:",
        profitLossAmount: "Valor de Lucro e Perda:",
        leverage: "Alavancagem:",
        done: "Concluído"
      },
      status: {
        open: "Aberto",
        closed: "Fechado",
        completed: "Concluído"
      },
      list: {
        noOrders: "Nenhuma ordem"
      }
    },
    proof: {
      title: "Verificação de Identidade",
      instructions: "Verifique sua identidade para acessar todos os recursos do seu Icmarkets",
      sections: {
        documentInfo: "Informações do Documento",
        documentUpload: "Upload do Documento"
      },
      fields: {
        documentType: "Tipo de Documento",
        fullName: "Nome Completo",
        documentNumber: "Número do Documento",
        address: "Endereço",
        frontSide: "Frente do Documento",
        backSide: "Verso do Documento",
        selfie: "Selfie com Documento"
      },
      placeholders: {
        fullName: "Digite seu nome completo",
        documentNumber: "Digite seu número de documento",
        address: "Digite seu endereço completo"
      },
      uploadTexts: {
        frontSide: "Faça upload da frente do seu documento",
        backSide: "Faça upload do verso do seu documento",
        selfie: "Faça upload de uma selfie segurando seu documento"
      },
      documentTypes: {
        passport: "Passaporte",
        idCard: "Carteira de Identidade",
        driversLicense: "Carteira de Motorista"
      },
      security: {
        title: "Aviso de Segurança",
        text: "Suas informações são criptografadas e seguras. Usamos proteção de nível bancário e verificamos manualmente cada documento para sua segurança."
      },
      buttons: {
        validateDocuments: "Validar Documentos"
      },
      footer: {
        copyright: "© 2025 CryptoWallet. Todos os direitos reservados.",
        privacyPolicy: "Política de Privacidade"
      }
    },

    withdrawPassword: {
      title: "Senha de Retirada",
      cardTitle: "ALTERAR SENHA DE RETIRADA",
      fields: {
        currentPassword: "Senha Atual",
        newPassword: "Nova Senha"
      },
      placeholders: {
        currentPassword: "Digite sua senha antiga",
        newPassword: "Confirme sua nova senha"
      },
      buttons: {
        saveChanges: "SALVAR ALTERAÇÕES"
      },
      warningMessage: "Para a segurança dos seus fundos, retiradas não são permitidas dentro de 24 horas após a alteração da senha de login."
    },

    marketDetail: {
      stats: {
        high: "Máxima 24h",
        low: "Mínima 24h",
        volume: "Volume 24h"
      },
      volume: {
        billion: "Bi",
        million: "Mi"
      },
      actions: {
        buy: "COMPRAR",
        sell: "VENDER"
      },
      recentTrades: {
        title: "Negociações Recentes (Ao Vivo)",
        price: "Preço (USD)",
        amount: "Quantidade",
        time: "Hora"
      },
      tabs: {
        orderBook: "Ordem",
        transactions: "Última transação"
      },
      orderBook: {
        buy: "Comprar",
        sell: "Vender",
        quantity: "Quantidade",
        price: "Preço (USD)"
      },
      coinSelector: {
        title: "Selecionar Par de Negociação"
      },
      setupWebsockets: "Configurando WebSockets para:",
      websocketConnected: "WebSocket conectado para:",
      websocketParseError: "Erro ao analisar dados do WebSocket:",
      websocketError: "Erro WebSocket para",
      websocketClosed: "WebSocket fechado para:",
      websocketCloseError: "Erro ao fechar WebSocket:",
      websocketCreateError: "Erro ao criar WebSocket:",
      code: "Código:",
      reconnecting: "Reconectando WebSocket para:",
      cleaningUp: "Limpando WebSockets para:",
      initialDataLoaded: "Dados iniciais carregados para:",
      fetchError: "Erro ao buscar dados iniciais para",
      selectingCoin: "Selecionando nova moeda:"
    },

    passwordType: {
      title: "Tipo de Senha",
      cardTitle: "SELECIONAR TIPO DE SENHA",
      options: {
        login: {
          title: "Senha de Login",
          description: "Altere sua senha de login da conta"
        },
        withdrawal: {
          title: "Senha de Retirada",
          description: "Altere sua senha de retirada de criptomoeda"
        }
      }
    },

    profile: {
      title: "Centro Pessoal",
      user: "Usuário",
      userInitial: "U",
      userId: "ID",
      status: {
        verified: "Verificado",
        unverified: "Não Verificado"
      },
      verification: {
        kycStatus: "Status KYC:",
        redirecting: "Redirecionando para página de verificação...",
        pendingReview: "Verificação está pendente de revisão...",
        pendingAlert: "Sua verificação está pendente de revisão. Aguarde aprovação.",
        alreadyVerified: "Usuário já está verificado",
        pending: {
          title: "Verificação Pendente",
          description: "A verificação da sua conta está em andamento. Isso geralmente leva 1-3 dias úteis.",
          status: "Revisão Pendente",
          button: "Pendente"
        },
        alert: {
          title: "Conta Não Verificada",
          description: "Verifique sua conta para desbloquear todos os recursos e limites mais altos",
          verifyNow: "Verificar Agora"
        }
      },
      accountInfo: {
        title: "INFORMAÇÕES DA CONTA",
        email: "E-mail",
        creditScore: "Pontuação de Crédito",
        invitationCode: "Código de Convite"
      },
      pendingVerifications: {
        title: "VERIFICAÇÕES PENDENTES",
        identity: {
          title: "Verificação de Identidade",
          description: "Envie sua identidade governamental"
        },
        address: {
          title: "Verificação de Endereço",
          description: "Verifique sua residência"
        },
        status: {
          pending: "Pendente"
        }
      },
      approvedVerifications: {
        title: "VERIFICAÇÕES APROVADAS",
        identity: {
          title: "Verificação de Identidade"
        },
        address: {
          title: "Verificação de Endereço"
        },
        status: {
          completed: "Concluído"
        }
      },
      limitations: {
        title: "Limitações da Conta",
        withdrawalLimit: "Limite de retirada: $1.000 por dia",
        stakingLimited: "Opções de staking limitadas",
        advancedTrading: "Recursos avançados de negociação desativados",
        fiatDeposits: "Depósitos em moeda fiduciária não disponíveis"
      },
      menu: {
        withdrawalAddress: "Histórico de alterações de conta",
        password: "Central de segurança",
        notifications: "Notificações",
        myInvitation: "Meus Convites",
        language: "Idioma",
        helpcenter: "Central de Ajuda",
        privacyPortal: "Portal de Privacidade",
        aboutUs: "Introdução à Plataforma",
        msbApproval: "Aprovação MSB",
        customerSupport: "Atendimento online",
        downloadApp: "Download",
        logout: "Sair",
        preferences: "Preferências",
        clearCache: "Limpar cache"
      },
      cache: {
        clearing: "Limpando cache...",
        cleared: "Cache limpo com sucesso!"
      },
      simulatedTrading: {
        toggle: "Negociação simulada {0}"
      }
    },
    trade: {
      coinSelector: {
        title: "Selecionar Par de Negociação"
      },
      title: "SPOT",
      buy: "COMPRAR",
      sell: "VENDER",
      long: "COMPRAR LONGO",
      short: "COMPRAR CURTO",
      limit: "LIMITE",
      market: "MERCADO",
      orderType: "Tipo de Ordem",
      price: "Preço (USD)",
      amount: "Quantidade",
      available: "Disponível",
      placing: "Colocando...",
      increasePrice: "aumentar preço",
      decreasePrice: "diminuir preço",
      tradingPeriod: "Período de Negociação",
      leverage: "Alavancagem",
      tradingMode: {
        trade: "Negociação",
        perpetual: "Perpétua"
      },
      tabs: {
        positions: "Posições",
        historyOrders: "Histórico de ordens",
        transactionHistory: "Histórico de transações"
      },
      orderDetails: {
        status: "Status",
        price: "Preço",
        amount: "Quantidade",
        total: "Total"
      },
      futuresDetails: {
        amount: "Quantidade",
        duration: "Duração",
        entryPrice: "Preço de Entrada",
        exitPrice: "Preço de Saída",
        pnl: "P&L",
        opened: "Aberto",
        closed: "Fechado"
      },
      futuresStatus: {
        long: "Longo",
        short: "Curto",
        closed: "Fechado",
        liquidated: "Liquidado"
      },
      cancel: "Cancelar",
      errors: {
        invalidQuantity: "Por favor, insira uma quantidade válida.",
        invalidPrice: "Por favor, insira um preço válido.",
        invalidAmount: "Por favor, insira um valor válido.",
        insufficientUSD: "Saldo USD insuficiente. Disponível: {0} USD",
        insufficientCoin: "Saldo {1} insuficiente. Disponível: {0} {1}",
        failedOrder: "Falha ao colocar ordem. Por favor, tente novamente.",
        createError: "Erro de criação de negociação",
        placeOrderError: "Erro ao colocar ordem"
      },
      orderBook: {
        price: "Preço (USD)",
        amount: "Quantidade"
      },
      noData: "Nenhum(a) {0} encontrado(a)",
      noTransactionsText: "Suas transações aparecerão aqui",
      noOrdersText: "Suas {0} aparecerão aqui",
      websocketConnected: "WebSocket conectado:",
      websocketParseError: "Erro ao analisar dados do WebSocket:",
      websocketError: "Erro WebSocket:",
      websocketClosed: "WebSocket fechado",
      websocketCreateError: "Erro ao criar WebSocket:",
      orderNumberFormat: "ORD-{0}-{1}"
    },

    market: {
      title: "MERCADO USD",
      noResults: "Nenhuma criptomoeda encontrada",
      volume: "Vol",
      search: {
        placeholder: "Pesquisar cripto...",
        clear: "Limpar pesquisa"
      },
      tableHeaders: {
        pair: "Par de Negociação",
        latestPrice: "Último Preço",
        change24h: "Variação 24H"
      },
      websocketConnected: "WebSocket do mercado conectado",
      websocketParseError: "Erro ao analisar dados do WebSocket",
      websocketError: "Erro WebSocket do mercado",
      websocketClosed: "WebSocket do mercado fechado, código:",
      websocketSetupError: "Erro ao configurar WebSocket"
    },
    signup: {
      title: "CADASTRAR",
      creatingAccount: "CRIANDO...",
      createAccount: "CRIAR CONTA",
      refresh: "Atualizar",
      captchaMismatch: "Captcha não corresponde",
      alreadyHaveAccount: "Já tem uma conta? Faça login",
      terms: {
        text: "Ao criar uma conta, você concorda com nossos",
        link: "Termos de Serviço"
      },
      labels: {
        email: "E-mail",
        phoneNumber: "Número de Telefone",
        captcha: "Captcha Gráfico",
        password: "Senha",
        confirmPassword: "Confirmar Senha",
        withdrawPassword: "Senha de Retirada",
        invitationCode: "Código de Convite"
      },
      placeholders: {
        email: "Digite seu e-mail",
        phoneNumber: "Digite seu número de telefone",
        captcha: "Digite o código",
        password: "Crie uma senha",
        confirmPassword: "Confirme sua senha",
        withdrawPassword: "Digite a senha de retirada",
        invitationCode: "Digite o código de convite"
      }
    },
    home: {
      logoAlt: "Logo Icmarkets",
      headerAlt: "Plataforma de Negociação de Cripto",
      slogan: "Lucro Com Confiança",
      promoAlt: "Banner promocional {0}",

      quickTrade: {
        highlight: "Negociação",
        title: "Rápida",
        subtitle: "Transações rápidas e operação simples",
      },

      aiTrading: {
        title: "Negociação Inteligente por IA",
        description: "Um robô de negociação quantitativa de IA é um sistema de negociação automatizado que combina inteligência artificial (IA) com técnicas de negociação quantitativa. Sua função principal é comprar e vender automaticamente produtos financeiros e criptomoedas com base em dados de mercado e estratégias de negociação específicas para alcançar lucros estáveis ou controlar riscos.",
      },

      nftExploration: {
        title: "Explore NFTs com Icmarkets",
        description: "Entre no mundo dos NFTs com Icmarkets, sua carteira de negociação de ativos digitais tudo-em-um. Projetado para iniciantes e traders profissionais, o Icmarkets permite que você explore, compre, venda e",
      },

      stats: {
        title: "Nosso Impacto",
        users: "30M+",
        usersLabel: "Número de usuários",
        organizations: "6000+",
        organizationsLabel: "Organizações parceiras",
        liquidity: "7,8Bi+",
        liquidityLabel: "Liquidez",
        orders: "89M",
        ordersLabel: "Ordens processadas por segundo",
      },

      services: {
        title: "Nossos Serviços",
        subtitle: "Fornecemos serviços especializados de atendimento ao cliente manual 24 horas por dia para proteger suas transações",
        highInterest: {
          title: "Alta taxa de juros",
          desc: "Finanças, alta taxa de retorno",
          alt: "Ícone alta taxa de juros",
        },
        liquidityMining: {
          title: "Mineração de liquidez",
          desc: "Liquidez gera lucros fáceis",
          alt: "Ícone mineração de liquidez",
        },
        service24h: {
          title: "Serviço 24 horas",
          desc: "Pronto para responder todas as suas perguntas",
          alt: "Ícone serviço 24 horas",
        },
        highContract: {
          title: "Contrato alto",
          desc: "Pequeno capital alta alavancagem, enriqueça facilmente",
          alt: "Ícone contrato alto",
        },
        expertTeam: {
          title: "Equipe de especialistas",
          desc: "Equipe técnica especializada ao seu serviço",
          alt: "Ícone equipe de especialistas",
        },
        securityProtection: {
          title: "Proteção de segurança",
          desc: "Dados em nuvem poderosos protegem sua segurança",
          alt: "Ícone proteção de segurança",
        },
      },

      demo: {
        fastSwap: {
          title: "Troca rápida - Troque suas moedas sem preocupações",
          subtitle: "De Bitcoin a Dogecoin, tornamos a compra e venda de cripto fácil. Proteja sua cripto com armazenamento a frio de melhor classe.",
          alt: "Demonstração de troca rápida",
        },
        advancedTraders: {
          title: "Para traders avançados - Ferramentas poderosas para design",
          subtitle: "Ferramentas de análise poderosas combinadas com nossa garantia de segurança fornecem a experiência de negociação definitiva. Aproveite capacidades de gráficos sofisticados, livros de ordens em tempo real e liquidez profunda em centenas de mercados.",
          alt: "Demonstração traders avançados",
        },
        walletManagement: {
          title: "Gerenciamento inteligente de carteira de ativos - Crescimento constante na receita",
          subtitle: "Ferramentas de análise poderosas combinadas com nossa garantia de segurança fornecem a experiência de negociação definitiva. Aproveite capacidades de gráficos sofisticados, livros de ordens em tempo real e liquidez profunda em centenas de mercados.",
          alt: "Demonstração gerenciamento de carteira",
        },
        liquidityMining: {
          title: "Mineração de liquidez, quantificação por IA",
          subtitle: "Mais maneiras de gerenciar seus ativos, incluindo mineração de liquidez e quantificação por IA, dão a você mais opções para gerenciar seus ativos e manter seus ativos crescendo",
          alt: "Demonstração mineração de liquidez",
        },
        startTrading: {
          title: "Começar a negociar criptomoeda? - Abra sua criptomoeda agora",
          subtitle: "Negocie a qualquer hora e em qualquer lugar para atender às necessidades de negociação de vários cenários a qualquer momento",
          alt: "Demonstração iniciar negociação",
        },
      },

      news: {
        title: "Notícias do círculo",
        elonMusk: {
          date: "14-10-2025",
          title: "Elon Musk Diz que Bitcoin é Baseado em Energia, o que é Impossível Falsificar",
          alt: "Notícia Elon Musk Bitcoin",
        },
        bitcoinRecord: {
          date: "5-10-2025",
          title: "Bitcoin Atinge Preço Recorde Acima de US$ 125.000",
          alt: "Notícia preço recorde do Bitcoin",
        },
        trumpStatue: {
          date: "17-9-2025",
          title: "Estátua gigante de Trump segurando Bitcoin exibida fora do Capitólio dos EUA para marcar decisão de taxa do Fed",
          alt: "Notícia estátua Trump Bitcoin",
        },
      },

      partners: {
        title: "Parceiro Ecológico Mundial",
        description: "Construir consenso e criar um novo futuro para o ecossistema cripto",
        binance: "Binance",
        coinbase: "Coinbase",
        kraken: "Kraken",
        ftx: "FTX",
        bitfinex: "Bitfinex",
        huobi: "Huobi",
      },

      announcements: {
        maintenanceNotice: "Aviso de manutenção",
        contractServerUpgrade: "Anúncio de atualização e manutenção do servidor de contratos em 15 de janeiro de 2023",
        IcmarketsOptionsMaintenance: "Anúncio de manutenção do sistema de negociação de opções Icmarkets",
        clientVersionUpgrade: "Importante! Anúncio do Icmarkets sobre a atualização da versão mais recente do cliente",
        platformTradingAnnouncement: "Anúncio mais recente de negociação da plataforma Icmarkets",
        platformUpgradeOptimization: "Anúncio de atualização de otimização da versão da plataforma Icmarkets",
        march15Upgrade: "15 de março de 2023 anúncio de otimização de manutenção de atualização do servidor de contratos da plataforma Icmarkets",
        optionsTradingMaintenance: "Anúncio de manutenção e otimização do sistema de negociação de opções da plataforma Icmarkets",
        latestVersionUpgrade: "Anúncio importante da plataforma Icmarkets sobre a atualização e otimização da versão mais recente do cliente",
        userSecurityReminder: "Lembrete sobre segurança da informação do usuário Icmarkets",
        perpetualContractUpgrade: "Anúncio da plataforma Icmarkets sobre a otimização e atualização do sistema de contratos perpétuos",
        maintenanceCompletion: "Anúncio da conclusão da manutenção e otimização do sistema da plataforma",
        bitcoinWithdrawal: "Anúncio sobre Retirada de Bitcoin",
        tradingPairsUpgrade: "Anúncio sobre a atualização de alguns pares de negociação de moeda na plataforma",
        ethWalletMaintenance: "Anúncio sobre a manutenção da carteira da rede Ethereum (ERC20) da plataforma",
        ethHardFork: "Anúncio sobre a conclusão da atualização de hard fork do ETH",
        identityAuthUpdate: "Anúncio sobre a atualização do serviço de autenticação de identidade avançada da plataforma",
        filIncomeIssuance: "Aviso sobre emissão de renda de poder de computação FIL",
        apiOrderLimit: "Anúncio sobre a otimização do limite de frequência de pedidos da API",
        customerChatFunction: "Atualização do sistema - Função de chat do cliente em tempo real",
        ethNetworkUpgrade: "Anúncio de atualização da rede ETH",
        delistingCurrencies: "Anúncio de remoção de moedas",
        dotUSDLaunch: "Anúncio de lançamento de negociação DOT/USD",
        decUSDLaunch: "Anúncio de lançamento de negociação DEC/USD",
        USDIntroduction: "Introdução ao USD",
        ethereumNetworkMaintenance: "Aviso de manutenção da rede Ethereum",
        projectReviewStandards: "Padrões de revisão de projeto Icmarkets",
        liquidityMiningUpgrade: "Atualização de mineração de liquidez",
        liquidityMiningFee: "Ajuste de taxa de mineração de liquidez",
        delistingTradingPairs: "Remoção de pares de negociação",
        systemTemporaryMaintenance: "Anúncio de manutenção temporária do sistema",
        temporaryRechargeSuspension: "Aviso de suspensão temporária de recarga",
        delistingNotification: "Notificação de remoção",
        serverUpgrade: "Anúncio de atualização do servidor",
        serverNetworkUpgrade: "Anúncio de atualização da rede do servidor",
        appDownloadOpen: "Notificação de abertura de download do APP",
      },
    },

    withdrawAddressForm: {
      title: "Endereço de Retirada",
      currencyType: "TIPO DE MOEDA",
      withdrawalAddress: "ENDEREÇO DE RETIRADA",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      },
      fields: {
        address: "Endereço",
        password: "Senha de Retirada de Cripto"
      },
      placeholders: {
        address: "Digite o endereço da sua carteira",
        password: "Digite sua senha atual"
      },
      buttons: {
        save: "SALVAR"
      },
      notification: {
        success: "Endereço salvo com sucesso!"
      }
    },

    withdrawAddress: {
      title: "Endereço de Retirada",
      cardTitle: "TIPO DE MOEDA",
      currencies: {
        btc: "BTC (Bitcoin)",
        eth: "ETH (Ethereum)",
        USD: "USD (Tether)",
        sol: "SOL (Solana)",
        xrp: "XRP (Ripple)"
      }
    },

    privacy: {
      title: "Portal de Privacidade",
      hero: {
        title: "Portal de Privacidade Icmarkets",
        subtitle: "Protegendo seus dados e privacidade com diretrizes rigorosas, conformidade legal e melhores práticas do setor."
      },
      principles: {
        title: "Nossos Princípios de Privacidade",
        corePrinciples: "Princípios Fundamentais",
        transparency: {
          title: "Transparência",
          description: "Atualizações regulares e informações claras sobre como lidamos com seus dados."
        },
        accountability: {
          title: "Responsabilidade & Conformidade",
          description: "Auditorias regulares, certificações e adesão às leis globais de privacidade."
        },
        dataSecurity: {
          title: "Segurança de Dados",
          description: "Criptografia avançada, controles de acesso rigorosos e protocolos de verificação de identidade."
        },
        dataMinimization: {
          title: "Minimização de Dados & Limitação de Finalidade",
          description: "Coletamos apenas o que é necessário para fins legítimos específicos."
        },
        privacyByDesign: {
          title: "Privacidade por Design",
          description: "A privacidade é incorporada em todos os nossos produtos e serviços desde o início."
        }
      },
      userRights: {
        title: "Seus Direitos de Privacidade",
        content: "Você tem ferramentas para acessar e gerenciar seus dados através do nosso aplicativo ou formulário web, com informações detalhadas disponíveis em nosso Aviso de Privacidade.",
        note: "Exercite seus direitos de acesso, correção ou exclusão de suas informações pessoais a qualquer momento."
      },
      personalData: {
        title: "O que são Dados Pessoais?",
        definition: "Dados pessoais referem-se a qualquer informação que identifica um indivíduo.",
        examples: "Exemplos incluem: nome, ID Icmarkets, endereço de e-mail, dados de localização, histórico de transações e informações do dispositivo."
      },
      dataUsage: {
        title: "Como Usamos Seus Dados",
        accountManagement: {
          title: "Gerenciamento de Conta",
          description: "Para criar e manter sua conta, fornecer serviços e se comunicar com você."
        },
        legalCompliance: {
          title: "Conformidade Legal",
          description: "Para cumprir nossas obrigações sob leis aplicáveis, incluindo regulamentos de Combate à Lavagem de Dinheiro (AML)."
        },
        securityFraud: {
          title: "Segurança & Prevenção de Fraude",
          description: "Para proteger sua conta, detectar e prevenir fraudes e garantir a segurança da plataforma."
        },
        customerSupport: {
          title: "Suporte ao Cliente",
          description: "Para responder às suas consultas e fornecer assistência técnica quando necessário."
        },
        marketing: {
          title: "Marketing & Comunicações",
          description: "Para enviar atualizações relevantes, informações sobre produtos e materiais promocionais (com seu consentimento)."
        },
        transactionProcessing: {
          title: "Processamento de Transações",
          description: "Para facilitar transações de criptomoedas e manter registros de transações."
        }
      },
      dataRetention: {
        title: "Retenção de Dados",
        content: "Retemos seus dados pelo tempo necessário para fornecer nossos serviços, cumprir obrigações legais (como requisitos fiscais e AML), resolver disputas e fazer cumprir nossos acordos."
      },
      dataSharing: {
        title: "Compartilhamento de Dados",
        content: "Podemos compartilhar seus dados com outras entidades Icmarkets ou terceiros confiáveis sob salvaguardas contratuais rigorosas, apenas quando necessário para os fins descritos em nosso Aviso de Privacidade."
      },
      cookies: {
        title: "Cookies & Rastreamento",
        content: "Usamos cookies e tecnologias similares para melhorar sua experiência do usuário, fornecer marketing personalizado e analisar como nossos serviços são usados.",
        link: "Veja nossa Política de Cookies completa"
      },
      actionCards: {
        privacyNotice: {
          title: "Aviso de Privacidade",
          description: "Leia nossa política de privacidade completa"
        },
        manageData: {
          title: "Gerenciar Dados",
          description: "Acesse e controle suas informações"
        },
        cookieSettings: {
          title: "Configurações de Cookies",
          description: "Ajuste suas preferências de rastreamento"
        },
        helpCenter: {
          title: "Central de Ajuda",
          description: "Obtenha respostas para perguntas sobre privacidade"
        }
      },
      notification: "Ação concluída com sucesso!"
    },

    termsOfUse: {
      title: "Termos de Uso",
      hero: {
        title: "Termos de Uso Icmarkets"
      },
      agreement: {
        title: "Acordo",
        content: "Este é um acordo vinculante entre você (o usuário) e Icmarkets. Ele cobre todos os Serviços Icmarkets que você acessa ou usa."
      },
      riskWarning: {
        title: "Aviso de Risco",
        content: "Ativos digitais são voláteis e podem flutuar significativamente em valor. Icmarkets não é um corretor, consultor financeiro ou consultor de investimentos. Você deve realizar sua própria due diligence antes de tomar qualquer decisão financeira."
      },
      aboutServices: {
        title: "Sobre Nossos Serviços",
        aboutIcmarkets: {
          title: "Sobre Icmarkets",
          content: "Icmarkets fornece troca de ativos digitais, serviços de custódia e serviços financeiros relacionados através de nossa plataforma."
        },
        eligibility: {
          title: "Elegibilidade",
          content: "Você deve ter pelo menos 18 anos, ser legalmente capaz de celebrar contratos, não ter restrições para usar nossos serviços e não estar localizado em jurisdições proibidas."
        },
        communication: {
          title: "Comunicação",
          content: "Você deve manter suas informações de contato atualizadas. Icmarkets entrará em contato com você via e-mail, SMS ou telefone sobre sua conta e nossos serviços."
        }
      },
      services: {
        title: "Nossos Serviços",
        servicesProvided: {
          title: "Serviços Fornecidos",
          content: "Icmarkets oferece negociação de ativos digitais, soluções de custódia seguras e suporte ao cliente através de bots automatizados e representantes humanos. A funcionalidade de chat do usuário também está disponível."
        },
        fees: {
          title: "Taxas",
          content: "Todas as taxas aplicáveis estão listadas em nossa página Estrutura de Taxas e estão sujeitas a atualizações. Você é responsável por revisar o cronograma de taxas atual antes de realizar transações."
        }
      },
      accountManagement: {
        title: "Gerenciamento de Conta",
        accountCreation: {
          title: "Criação de Conta",
          content: "Você deve abrir uma conta (individual ou corporativa) para acessar nossos serviços. Isso requer completar procedimentos de verificação de identidade (KYC/AML) conforme exigido por lei."
        },
        identityVerification: {
          title: "Verificação de Identidade",
          content: "Você deve completar nossos processos de verificação Conheça Seu Cliente (KYC) e Combate à Lavagem de Dinheiro (AML) antes de usar certos serviços."
        },
        accountRecords: {
          title: "Registros de Conta",
          content: "Você pode manter registros e criar subcontas sob condições específicas descritas em nossas políticas de gerenciamento de conta."
        }
      },
      transactions: {
        title: "Transações",
        sufficientBalance: {
          title: "Saldo Suficiente",
          content: "Você deve manter saldo suficiente em sua conta para quaisquer transações que você iniciar. As transações podem falhar ou incorrer em taxas adicionais se fundos insuficientes estiverem disponíveis."
        },
        transactionCancellation: {
          title: "Cancelamento de Transação",
          content: "Icmarkets reserva-se o direito de cancelar ou modificar transações em casos de suspeita de fraude, erros ou violações destes Termos."
        },
        unauthorizedTransactions: {
          title: "Transações Não Autorizadas",
          content: "Você é responsável por quaisquer transações não autorizadas, a menos que possa provar o contrário através do nosso processo de resolução de disputas."
        }
      },
      digitalAssets: {
        title: "Ativos Digitais",
        supportedAssets: {
          title: "Ativos Suportados",
          content: "Você só pode transacionar com ativos digitais explicitamente suportados pelo Icmarkets. Tentar depositar ativos não suportados pode resultar em perda permanente."
        },
        forksAirdrops: {
          title: "Forks & Airdrops",
          content: "Icmarkets não garante suporte para forks de blockchain, airdrops ou outros eventos similares. Decisões de suporte são feitas a nosso critério exclusivo."
        }
      },
      accountSecurity: {
        title: "Segurança da Conta",
        securityRequirements: {
          title: "Requisitos de Segurança",
          content: "Você deve usar uma senha forte, habilitar autenticação multifator (MFA), nunca compartilhar credenciais, monitorar a atividade da conta regularmente e relatar imediatamente quaisquer violações de segurança."
        }
      },
      privacy: {
        title: "Privacidade",
        content: "Sua privacidade é regida pelo Aviso de Privacidade do Icmarkets, que explica como coletamos, usamos e protegemos suas informações pessoais."
      },
      termination: {
        title: "Encerramento de Conta",
        terminationSuspension: {
          title: "Encerramento/Suspensão",
          content: "Icmarkets pode restringir, suspender ou encerrar contas por fraude, violações da lei, atividade suspeita ou violações dos Termos. Usuários podem fechar contas, a menos que congeladas ou dormentes."
        }
      },
      prohibitedUse: {
        title: "Uso Proibido",
        content: "Você não pode usar os serviços Icmarkets para fraude, manipulação de mercado, atividades ilegais, acesso não autorizado ou qualquer finalidade que viole leis aplicáveis ou estes Termos."
      },
      liability: {
        title: "Responsabilidade & Propriedade Intelectual",
        liability: {
          title: "Responsabilidade",
          content: "Icmarkets não é responsável por perdas, exceto em casos de negligência grave comprovada ou fraude. Não somos responsáveis por flutuações de mercado, problemas técnicos ou ações de terceiros."
        },
        intellectualProperty: {
          title: "Propriedade Intelectual",
          content: "Icmarkets retém todos os direitos de propriedade intelectual sobre nossa plataforma, tecnologia e marca. Os usuários recebem uma licença limitada para usar nossos serviços conforme descrito nestes Termos."
        },
        indemnity: {
          title: "Indenização",
          content: "Você concorda em indenizar e isentar o Icmarkets de qualquer reclamação, perda ou dano resultante do uso indevido de nossos serviços ou violação destes Termos."
        }
      },
      importantNotice: {
        title: "Aviso Importante",
        content: "Ao usar os serviços Icmarkets, você reconhece que leu, entendeu e concorda em estar vinculado por estes Termos de Uso. Se você não concordar, deve descontinuar o uso de nossos serviços imediatamente."
      },
      actionCards: {
        security: {
          title: "Segurança",
          description: "Mantenha sua conta segura."
        },
        helpCenter: {
          title: "Central de Ajuda",
          description: "Obtenha respostas para suas perguntas"
        },
        privacyPolicy: {
          title: "Política de Privacidade",
          description: "Revise nossas práticas de privacidade"
        },
        legal: {
          title: "Jurídico",
          description: "Veja todos os documentos legais"
        }
      },
      footer: {
        copyright: "© 2025 Icmarkets. Todos os direitos reservados.",
        lastUpdated: "Última atualização: 6 de maio de 2025"
      }
    },

    assetsDetail: {
      title: "Detalhes dos Ativos",
      today: "Hoje",
      yesterday: "Ontem",
      filter: "Filtrar",
      transactionHistory: {
        title: "Histórico de Transações"
      },
      noTransactions: {
        title: "Nenhuma Transação Ainda",
        description: "Seu histórico de transações aparecerá aqui assim que você começar a negociar."
      },
      status: {
        completed: "Concluída",
        pending: "Pendente",
        canceled: "Cancelada"
      },
      filterModal: {
        title: "Filtrar Transações",
        status: "Status",
        type: "Tipo",
        direction: "Direção",
        startDate: "Data de Início",
        endDate: "Data de Fim",
        allStatuses: "Todos os Status",
        allTypes: "Todos os Tipos",
        bothDirections: "Ambas as Direções",
        incoming: "Entrada",
        outgoing: "Saída",
        completed: "Concluída",
        pending: "Pendente",
        canceled: "Cancelada",
        resetFilters: "Redefinir Filtros",
        applyFilters: "Aplicar Filtros"
      },
      actions: {
        deposit: "Depositar",
        withdraw: "Retirar"
      },
      transactionTypes: {
        transaction: "Transação",
        deposit: "Depósito",
        withdrawal: "Retirada",
        convertedFrom: "Convertido de {{asset}}",
        convertedTo: "Convertido para {{asset}}",
        conversionIn: "Conversão Entrada",
        conversionOut: "Conversão Saída",
        stakedAmount: "Valor Stakeado",
        stakingRewards: "Recompensas de Staking",
        futuresReserved: "Futuros Reservados",
        futuresProfit: "Lucro Futuros",
        futuresLoss: "Perda Futuros",
        futuresSettlement: "Liquidação Futuros",
        futuresFee: "Taxa Futuros",
        futuresRefund: "Reembolso Futuros",
        futuresBonus: "Bônus Futuros",
        futuresCommission: "Comissão Futuros",
        manualProfit: "Lucro Manual",
        manualLoss: "Perda Manual",
        manualAdjustment: "Ajuste Manual",
        spotTradingProfit: "Lucro Negociação Spot",
        spotTradingLoss: "Perda Negociação Spot",
        referralReward: "Recompensa de Indicação",
        bonus: "Bônus",
        referralCommission: "Comissão de Indicação",
        orderReserved: "Ordem Reservada",
        orderCancelled: "Ordem Cancelada",
        orderPartialFill: "Ordem Parcialmente Preenchida",
        orderCompleted: "Ordem Concluída",
        feePayment: "Pagamento de Taxa",
        balanceAdjustment: "Ajuste de Saldo",
        transfer: "Transferência"
      }
    },

    invitation: {
      title: "Convidar Amigos",
      earnTogether: "Ganhem Juntos",
      description: "Convide amigos para se juntarem ao Icmarkets e ganhe recompensas quando eles se cadastrarem e começarem a negociar.",
      yourReferralCode: "SEU CÓDIGO DE INDICAÇÃO",
      loading: "Carregando...",
      copied: "COPIADO!",
      copyCode: "COPIAR CÓDIGO",
      totalEarned: "Total Ganho",
      allTimeCommission: "Comissão de Todos os Tempos",
      generationMembers: "Membros de Geração",
      noGenerationData: "Nenhum dado de geração disponível",
      approvedMembers: "Membros Aprovados",
      pendingMembers: "Membros Pendentes",
      commissionStructure: "Estrutura de Comissão",
      firstGeneration: "1ª Geração",
      secondGeneration: "2ª Geração",
      thirdGeneration: "3ª Geração",
      firstDepositCommission: "Comissão Primeiro Depósito",
      stakingProfitsCommission: "Comissão Lucros Staking",
      howItWorks: "Como Funciona",
      steps: {
        shareCode: {
          title: "Compartilhe Seu Código de Indicação",
          description: "Envie seu código único para amigos ou compartilhe nas redes sociais."
        },
        friendsSignUp: {
          title: "Amigos se Cadastram",
          description: "Seus amigos se cadastram usando seu código de indicação e verificam suas contas."
        },
        earnCommissions: {
          title: "Ganhe Comissões",
          description: "Ganhe comissões dos primeiros depósitos e lucros de staking da sua rede."
        }
      },
      referralCopied: "Código de indicação copiado para a área de transferência!",
      loadingMembers: "Carregando membros...",
      approved: "Aprovado",
      joined: "Entrou",
      noMembersFound: "Nenhum membro encontrado"
    },

    securityTips: {
      title: "Central de Segurança",
      essentialTips: "Dicas Essenciais de Segurança",
      categories: {
        passwordSecurity: "Segurança de Senha",
        deviceSecurity: "Segurança do Dispositivo",
        accountSecurity: "Segurança da Conta"
      },
      tips: {
        strongPasswords: {
          title: "Use Senhas Fortes e Únicas",
          description: "Crie senhas complexas com maiúsculas, minúsculas, números e símbolos."
        },
        enable2FA: {
          title: "Ative a Autenticação de Dois Fatores",
          description: "Adicione uma camada extra de segurança à sua conta com 2FA."
        },
        changePasswords: {
          title: "Altere Senhas Regularmente",
          description: "Atualize suas senhas a cada 3-6 meses."
        },
        softwareUpdated: {
          title: "Mantenha Software Atualizado",
          description: "Atualize regularmente seu SO, navegador e software de carteira."
        },
        antivirus: {
          title: "Use Proteção Antivírus",
          description: "Instale software antivírus e anti-malware respeitável."
        },
        publicWifi: {
          title: "Evite Wi-Fi Público",
          description: "Nunca acesse sua carteira em redes públicas sem uma VPN."
        },
        loginNotifications: {
          title: "Ative Notificações de Login",
          description: "Receba alertas para novos logins na sua conta."
        },
        reviewActivity: {
          title: "Revise a Atividade da Conta",
          description: "Verifique regularmente sua conta para atividade suspeita."
        },
        whitelisting: {
          title: "Use Lista Branca",
          description: "Adicione à lista branca endereços de retirada confiáveis para segurança adicional."
        }
      },
      actions: {
        enable2FA: "Ativar 2FA",
        enable2FADesc: "Adicionar uma camada extra de segurança",
        activityLog: "Registro de Atividade",
        activityLogDesc: "Reveja a atividade recente da conta",
        settings: "Configurações",
        settingsDesc: "Configure preferências de segurança",
        backupCodes: "Códigos de Backup",
        backupCodesDesc: "Salve seus códigos de recuperação"
      },
      emergency: {
        title: "Procedimentos de Emergência",
        unauthorizedAccess: "Se você suspeitar de acesso não autorizado à sua conta, altere imediatamente sua senha e ative o 2FA se ainda não estiver ativo.",
        lostDevice: "Se seu dispositivo for perdido ou roubado, revogue imediatamente o acesso à sessão nas configurações da sua conta.",
        phishing: "Se você foi vítima de uma tentativa de phishing, congele sua conta e entre em contato com o suporte imediatamente.",
        supportTitle: "Suporte de Segurança 24/7",
        supportEmail: "Icmarkets.helpdesk01@gmail.com"
      },
      resources: {
        title: "Recursos de Segurança",
        securityGuide: "Guia de Segurança",
        securityGuideLink: "Leia a documentação de segurança abrangente",
        learningCenter: "Central de Aprendizado",
        learningCenterLink: "Aprenda sobre as melhores práticas de segurança cripto",
        faq: "FAQ",
        faqLink: "Encontre respostas para perguntas comuns de segurança"
      }
    },

    notification: {
      title: "Notificação",
      loading: "Carregando",
      filters: {
        all: "Todas",
        unread: "Não lidas",
        read: "Lidas"
      },
      emptyState: {
        title: "Nenhuma notificação ainda",
        noNotifications: "Você não tem nenhuma notificação ainda",
        noFilteredNotifications: "Nenhuma notificação {0} encontrada"
      },
      types: {
        deposit: {
          title: "Depósito Recebido",
          message: "Seu depósito de {0} foi confirmado e creditado na sua carteira."
        },
        withdraw: {
          title: "Retirada Bem-sucedida",
          message: "Sua retirada de {0} foi processada com sucesso."
        },
        staking: {
          title: "Lucro de Staking",
          message: "Você ganhou {0} das suas recompensas de staking."
        },
        kyc: {
          title: "Atualização KYC",
          defaultMessage: "Sua conta foi ativada."
        },
        commission: {
          title: "Comissão Recebida",
          message: "Você recebeu uma comissão de {0}."
        },
        futures: {
          title: "Atualização Futuros",
          message: "Seu valor de transação de futuros {0} foi executado."
        },
        accountActivated: {
          title: "Verificação KYC",
          message: "Olá {0}, seus documentos KYC foram verificados, agora você pode aproveitar recursos ilimitados no Icmarkets"
        },
        custom: {
          title: "Notificação",
          defaultMessage: "Você tem uma nova notificação."
        },
        cancelDeposit: {
          title: "Depósito Cancelado",
          message: "Seu depósito de {0} foi cancelado."
        },
        cancelWithdraw: {
          title: "Retirada Cancelada",
          message: "Sua retirada de {0} foi cancelada."
        },
        cancelActivated: {
          title: "Ativação Cancelada",
          message: "Seu KYC foi recusado pelo sistema, por favor tente novamente ou entre em contato com o Suporte ao Cliente para obter ajuda"
        }
      }
    },

    staking: {
      title: "Staking",
      totalStakedBalance: "Saldo Total em Staking",
      earned: "ganho",
      tabs: {
        options: "Opções",
        active: "Stakes Ativos",
        completed: "Concluídos"
      },
      daily: "Diário",
      minimumStake: "Stake Mínimo",
      unstakingPeriod: "Período de Desvinculação",
      days: "dias",
      stakeButton: "Stake {0}",
      status: {
        active: "ATIVO",
        completed: "CONCLUÍDO"
      },
      remaining: "Restante",
      dailyRate: "Taxa Diária",
      duration: "Duração",
      createdAt: "Criado Em",
      dateFinish: "Data de término",
      totalCompletedRewards: "RECOMPENSAS TOTAIS CONCLUÍDAS",
      stake: "STAKE",
      stakes: "STAKES",
      allRewardsFromCompleted: "Todas as recompensas de stakes concluídos",
      totalRewardsEarned: "RECOMPENSAS TOTAIS GANHAS",
      balance: "Saldo",
      maximumStake: "Stake Máximo",
      estimatedTotalRewards: "Recompensas Totais Estimadas",
      exploreStakingOptions: "Explore Opções de Staking",
      startStaking: "Iniciar Staking",
      emptyStates: {
        options: {
          title: "Nenhum Plano de Staking Disponível",
          message: "Atualmente não há planos de staking disponíveis. Por favor, verifique mais tarde para novas oportunidades de staking."
        },
        active: {
          title: "Nenhum Stake Ativo",
          message: "Você ainda não tem nenhum stake ativo. Comece a fazer staking para ganhar recompensas em seus ativos cripto."
        },
        completed: {
          title: "Nenhum Stake Concluído",
          message: "Você ainda não concluiu nenhum stake. Seus stakes concluídos aparecerão aqui quando terminarem."
        }
      },
      stakeModal: {
        title: "Stake",
        amountToStake: "Quantidade para Stake",
        enterAmount: "Digite A Quantidade"
      }
    },
    conversion: {
      title: "Converter Cripto",
      loading: "Carregando preços mais recentes...",
      youSend: "Você envia",
      youReceive: "Você recebe",
      balance: "Saldo",
      max: "MÁX",
      enterAmount: "Digite o valor",
      insufficientBalance: "Saldo insuficiente",
      estimatedConversion: "Conversão estimada",
      selectDifferentCurrencies: "Selecionar moedas diferentes",
      convertNow: "Converter Agora",
      pricesUpdate: "Os preços atualizam em tempo real",
      selectCurrency: "Selecionar Moeda",
      searchCurrencies: "Pesquisar moedas...",
      confirmConversion: "Confirmar Conversão",
      confirmExchange: "Confirmar Troca",
      conversionDetails: "Detalhes da Conversão",
      exchangeRate: "Taxa de Câmbio",
      networkFee: "Taxa de Rede",
      estimatedArrival: "Chegada Estimada",
      arrivalTime: "~30 segundos",
      processingConversion: "Processando Conversão...",
      cancel: "Cancelar"
    },

    history: {
      title: "Histórico de Transações",
      emptyState: {
        title: "Nenhuma transação encontrada",
        description: "Tente alterar seus filtros para ver mais transações"
      },
      filters: {
        all: "Todas",
        deposits: "Depósitos",
        withdrawals: "Retiradas",
        profits: "Lucros",
        losses: "Perdas",
        conversions: "Conversões",
        stacking: "Stacking"
      },
      statusFilters: {
        allStatus: "Todos os Status",
        completed: "Concluída",
        pending: "Pendente",
        canceled: "Cancelada"
      },
      timeFilters: {
        allTime: "Todo o Tempo",
        today: "Hoje",
        week: "Semana",
        month: "Mês",
        year: "Ano"
      },
      status: {
        completed: "Concluída",
        pending: "Pendente",
        canceled: "Cancelada"
      },
      dateFormats: {
        today: "Hoje, {0}",
        yesterday: "Ontem, {0}"
      },
      transactionTypes: {
        transaction: "Transação",
        deposit: "Depósito",
        withdrawal: "Retirada",
        convertedFrom: "Convertido de {0}",
        convertedTo: "Convertido para {0}",
        conversionIn: "Conversão Entrada",
        conversionOut: "Conversão Saída",
        stakedAmount: "Valor Stakeado",
        stakingRewards: "Recompensas de Staking",
        futuresReserved: "Futuros Reservados",
        futuresProfit: "Lucro Futuros",
        futuresLoss: "Perda Futuros",
        futuresSettlement: "Liquidação Futuros",
        futuresFee: "Taxa Futuros",
        futuresRefund: "Reembolso Futuros",
        futuresBonus: "Bônus Futuros",
        futuresCommission: "Comissão Futuros",
        manualProfit: "Lucro Manual",
        manualLoss: "Perda Manual",
        manualAdjustment: "Ajuste Manual",
        spotTradingProfit: "Lucro Negociação Spot",
        spotTradingLoss: "Perda Negociação Spot",
        referralReward: "Recompensa de Indicação",
        bonus: "Bônus",
        referralCommission: "Comissão de Indicação",
        orderReserved: "Ordem Reservada",
        orderCancelled: "Ordem Cancelada",
        orderPartialFill: "Ordem Parcialmente Preenchida",
        orderCompleted: "Ordem Concluída",
        feePayment: "Pagamento de Taxa",
        balanceAdjustment: "Ajuste de Saldo",
        transfer: "Transferência"
      }
    },

    withdraw: {
      title: "Retirar Cripto",
      selectCurrency: "Selecionar Moeda",
      selectPlaceholder: "Selecione uma moeda",
      selectHint: "Por favor, selecione uma moeda para continuar",
      withdrawalAddress: "Endereço de Retirada",
      withdrawalAmount: "Valor da Retirada",
      withdrawalPassword: "Senha de Retirada",
      passwordPlaceholder: "Digite a senha de retirada",
      available: "Disponível",
      amountWithdrawal: "Valor da retirada",
      minimumWithdrawal: "Retirada mínima",
      networkFee: "Taxa de rede",
      youWillReceive: "Você receberá",
      confirmWithdrawal: "Confirmar Retirada",
      processing: "Processando...",
      securityVerification: "Verificação de Segurança",
      securityMessage: "Para sua segurança, retiradas requerem confirmação por senha e podem estar sujeitas a revisão. Retiradas para endereços incorretos não podem ser revertidas.",
      networkInfo: "Rede: {0} ({1})",
      noWalletAddress: "(Nenhum endereço de carteira)",
      noWallet: {
        title: "Nenhum Endereço de Carteira Encontrado",
        description: "Você ainda não adicionou nenhum endereço de carteira. Por favor, adicione um endereço de retirada para prosseguir com sua transação.",
        addButton: "Adicionar Endereço de Carteira"
      },
      security: {
        title: "Segurança em Primeiro Lugar",
        description: "Para sua segurança, exigimos um endereço de retirada verificado para cada criptomoeda. Isso ajuda a prevenir erros e garante que seus fundos cheguem ao destino correto."
      },
      errors: {
        amountNumber: "O valor da retirada deve ser um número",
        amountRequired: "O valor da retirada é obrigatório",
        amountPositive: "O valor da retirada deve ser maior que 0",
        amountMin: "O valor está abaixo da retirada mínima para esta moeda",
        passwordRequired: "A senha de retirada é obrigatória",
        noWalletAddress: "Nenhum endereço de carteira encontrado para {0}. Por favor, adicione um endereço de carteira primeiro.",
        minimumWithdraw: "Retirada mínima para {0}: {1} {2}",
        insufficientForFee: "Saldo insuficiente para cobrir a taxa ({0} {1})"
      },
      validation: {
        selectCurrency: "Selecionar moeda",
        enterAmount: "Digitar valor",
        belowMin: "Abaixo do mínimo ({0} {1})",
        insufficientBalance: "Saldo insuficiente",
        insufficientForFee: "Saldo insuficiente (incluindo taxa)",
        enterPassword: "Digitar senha"
      }
    },
    deposit: {
      title: "Depositar Cripto",
      loading: "Carregando método de depósito ...",
      selectNetwork: "Selecionar Rede",
      depositAddress: "Seu endereço de depósito",
      copyAddress: "Copiar Endereço",
      amountLabel: "Valor do depósito ({0})",
      amountPlaceholder: "Mínimo: {0} {1}",
      txidLabel: "ID da Transação (TXID)",
      txidPlaceholder: "Digite O TXID",
      minimumDeposit: "Depósito mínimo",
      importantNotice: "Aviso Importante",
      warningMessage: "Por favor, certifique-se de selecionar a rede correta para seu depósito. Enviar fundos através da rede errada pode resultar em perda permanente de seus ativos, que não pode ser recuperada.",
      confirmDeposit: "Confirmar Depósito",
      network: "Rede",
      estimatedArrival: "Chegada estimada",
      networkConfirmations: "3 confirmações de rede",
      processingTime: "Tempo de processamento",
      processingTimeValue: "10-30 minutos",
      noMethods: "Nenhum método de depósito disponível no momento.",
      addressCopied: "Endereço copiado para a área de transferência!",
      unknownNetwork: "Rede Desconhecida"
    },

    faq: {
      title: "Central de FAQ",
      hero: {
        title: "Perguntas Frequentes",
        subtitle: "Encontre respostas para perguntas comuns sobre como usar o Icmarkets"
      },
      search: {
        placeholder: "Pesquisar por respostas..."
      },
      categories: {
        gettingStarted: "Começando",
        managingAccount: "Gerenciando Sua Conta"
      },
      questions: {
        howToCreateAccount: "Como criar uma conta?",
        howToCompleteVerification: "Como completar a verificação?",
        howToBuyCrypto: "Como comprar criptomoeda?",
        howToTrade: "Como negociar criptomoedas?",
        howToSendReceive: "Como receber e enviar cripto?",
        howToBecomeP2PMerchant: "Como me tornar um Comerciante P2P?",
        howStakingWorks: "Como funciona o staking?"
      },
      answers: {
        verificationProcess: "Faça upload de uma identidade emitida pelo governo e uma foto selfie. A verificação geralmente é aprovada em algumas horas."
      },
      steps: {
        goToWebsite: "Vá para https://trade-Icmarkets.com",
        clickSignUp: 'Clique em "Cadastrar"',
        enterDetails: "Digite seus detalhes",
        verifyEmail: "Verifique seu endereço de e-mail",
        completeVerification: "Complete primeiro a verificação",
        clickBuyCrypto: 'Clique em "Comprar Cripto"',
        selectCoinAndPayment: "Selecione a moeda e o método de pagamento",
        confirmTransaction: "Confirme a transação",
        cryptoInWallet: "A cripto aparecerá na sua carteira",
        goToTradeMarkets: 'Vá para "Negociação/Mercados"',
        pickTradingPair: "Escolha um par de negociação (ex. BTC/USD)",
        placeOrders: "Faça ordens a mercado ou limite",
        receiveCrypto: "Vá para Carteira > Receber → copie o endereço ou QR code",
        sendCrypto: "Vá para Carteira > Enviar → digite endereço/valor → confirme",
        applyP2P: 'Candidate-se na seção "P2P"',
        meetCriteria: "Atenda aos critérios de elegibilidade",
        createOffers: "Uma vez aprovado, crie ofertas & negocie",
        goToStaking: "Vá para Carteiras > Staking",
        pickStakingPlan: "Escolha um plano de staking",
        selectAmount: "Selecione o valor para stake",
        confirmStaking: "Confirme a transação",
        rewardsProcessed: "Recompensas processadas automaticamente no final do período"
      },
      labels: {
        toReceive: "Para receber:",
        toSend: "Para enviar:"
      },
      futures: {
        title: "Negociação de Futuros Explicada",
        whatAreFutures: "O que são contratos futuros?",
        futuresExplanation: "Acordos para comprar ou vender cripto a um preço predeterminado em uma data futura (liquidação em dinheiro).",
        whatIsLeverage: "O que é alavancagem?",
        leverageExplanation: "Capacidade de negociar com mais capital do que você tem (ex. alavancagem 10x, 20x, 50x).",
        longShortPositions: "O que são posições Long e Short?",
        long: "Long",
        longExplanation: "= apostar que o preço vai subir",
        short: "Short",
        shortExplanation: "= apostar que o preço vai cair",
        marginLiquidation: "O que são Margem & Liquidação?",
        marginExplanation: "Risco de liquidação da posição se seu colateral cair muito para manter a posição.",
        fundingRate: "O que é a Taxa de Financiamento?",
        fundingRateExplanation: "Taxa trocada a cada 8 horas entre traders long e short para equilibrar os preços dos contratos perpétuos com os preços spot.",
        profitLossCalculation: "Como o Lucro/Perda é calculado?",
        profitLossExplanation: "Calculado com base na diferença de preço multiplicada pela sua alavancagem e tamanho da posição."
      },
      benefits: {
        title: "Por Que Escolher Futuros Icmarkets?",
        hedge: "Proteja-se contra a volatilidade do mercado",
        multiplyProfits: "Multiplique lucros com alavancagem",
        tradeBothMarkets: "Negocie em mercados em alta e em baixa",
        advancedStrategies: "Implemente estratégias de negociação avançadas"
      },
      actionCards: {
        contactSupport: "Contatar Suporte",
        getHelp: "Obtenha ajuda da nossa equipe",
        community: "Comunidade",
        joinDiscussions: "Participe das discussões"
      },
      footer: {
        copyright: "© 2025 Icmarkets. Todos os direitos reservados.",
        needHelp: "Precisa de mais ajuda? Contate Icmarkets.helpdesk01@gmail.com"
      }
    },

    tabBottomNavigator: {
      home: "início",
      grap: "gráfico",
      records: "histórico",
      starting: "iniciar"
    },

    language: {
      title: "Idioma do Aplicativo",
      selectLanguage: "Selecionar Idioma",
      choosePreferred: "Escolha seu idioma preferido",
      searchPlaceholder: "Pesquisar idiomas...",
      currentLanguage: "Idioma Atual",

      languages: {
        english: "Inglês",
        french: "Francês",
        russian: "Russo",
        german: "Alemão",
        spanish: "Espanhol"
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
      menu: "Registros",
      fields: {
        user: "usuário",
        product: "produto",
        number: "número do registro",
        status: "status",
      },
      list: {
        title: "Lista de registros",
      },
      view: {
        title: "Detalhe do Registro",
      },
      edit: {
        title: "Editar Registro",
      },
      create: {
        success: "Produto enviado com sucesso.",
      },
      update: {
        success: "Produto enviado com sucesso.",
      },
      destroy: {
        success: "Registro excluído com sucesso",
      },
      destroyAll: {
        success: "Registro excluído com sucesso",
      },
      enumerators: {
        status: {
          pending: "Pendente",
          completed: "Concluído",
          canceled: "Cancelado",
        },
      },
    },

    category: {
      name: "categoria",
      label: "Categorias",
      menu: "Categorias",
      exporterFileName: "exportacao_categoria",
      list: {
        menu: "Categorias",
        title: "Categorias",
      },
      create: {
        success: "Categoria salva com sucesso",
      },
      update: {
        success: "Categoria salva com sucesso",
      },
      destroy: {
        success: "Categoria excluída com sucesso",
      },
      destroyAll: {
        success: "Categoria(s) excluída(s) com sucesso",
      },
      edit: {
        title: "Editar Categoria",
      },
      fields: {
        id: "Id",
        name: "Nome",
        slug: "Slug",
        photo: "Foto",
        metaKeywords: "Palavras-chave Meta",
        metaDescriptions: "Descrições Meta",
        status: "Status",
        isFeature: "É Destaque",
        serialRange: "Serial",
        serial: "Serial",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          enable: "Ativar",
          disable: "Desativar",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nova Categoria",
      },
      view: {
        title: "Ver Categoria",
      },
      importer: {
        title: "Importar Categorias",
        fileName: "modelo_importacao_categoria",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },

    product: {
      name: "produto",
      label: "Produtos",
      menu: "Produtos",
      exporterFileName: "exportacao_produto",
      list: {
        menu: "Produtos",
        title: "Produtos",
      },
      create: {
        success: "Produto salvo com sucesso",
      },
      update: {
        success: "Produto salvo com sucesso",
      },
      destroy: {
        success: "Produto excluído com sucesso",
      },
      destroyAll: {
        success: "Produto(s) excluído(s) com sucesso",
      },
      edit: {
        title: "Editar Produto",
      },
      fields: {
        id: "Id",
        name: "Nome",
        slug: "Slug",
        tags: "Tags",
        video: "Vídeo",
        specificationName: "Nome da Especificação",
        specificationDesciption: "Descrição da Especificação",
        isSpecification: "É Especificação",
        details: "Detalhes",
        photo: "Foto",
        discountPriceRange: "Preço com Desconto",
        discountPrice: "Preço Atual",
        previousPriceRange: "Preço Anterior",
        previousPrice: "Preço Anterior",
        stockRange: "Estoque",
        stock: "Estoque",
        metaKeywords: "Palavras-chave Meta",
        metaDesctiption: "Descrição Curta",
        status: "Status",
        isType: "Tipo",
        dateRange: "Data",
        date: "Data",
        itemType: "Tipo de Item",
        file: "Arquivo",
        link: "Link",
        fileType: "Tipo de Arquivo",
        taxe: "Imposto",
        category: "Categoria",
        subcategory: "Subcategoria",
        childcategory: "Sub-subcategoria",
        brand: "Marca",
        gallery: "Galeria",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          enable: "Ativar",
          disable: "Desativar",
        },
        itemType: {
          physical: "físico",
          digitale: "Digital",
        },
        fileType: {
          file: "Arquivo",
          link: "Link",
        },
        isType: {
          new_arrival: "Novo Lançamento",
          feature_product: "Produto em Destaque",
          top_pdroduct: "Produto Popular",
          best_product: "Melhor Produto",
          flash_deal_product: "Produto em Promoção Relâmpago",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Novo Produto",
      },
      view: {
        title: "Ver Produto",
      },
      importer: {
        title: "Importar Produtos",
        fileName: "modelo_importacao_produto",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },
    transaction: {
      name: "transação",
      label: "Transações",
      menu: "Transações",
      exporterFileName: "exportacao_transacao",
      list: {
        menu: "Transações",
        title: "Transações",
      },
      create: {
        success: "Transação enviada com sucesso",
      },
      update: {
        success: "Transação salva com sucesso",
      },
      destroy: {
        success: "Transação excluída com sucesso",
      },
      destroyAll: {
        success: "Transação(ões) excluída(s) com sucesso",
      },
      edit: {
        title: "Editar Transação",
      },
      fields: {
        id: "Id",
        amountRange: "Valor",
        amount: "Valor",
        email: "Email",
        tax: "Imposto",
        currencySign: "Símbolo da Moeda",
        currencyValue: "Valor da Moeda",
        orderId: "ID do Pedido",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        status: {
          pending: "Pendente",
          completed: "Sucesso",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Nova Transação",
      },
      view: {
        title: "Ver Transação",
      },
      importer: {
        title: "Importar Transações",
        fileName: "modelo_importacao_transacao",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },

    order: {
      name: "pedido",
      label: "Pedidos",
      menu: "Pedidos",
      exporterFileName: "exportacao_pedido",
      list: {
        menu: "Pedidos",
        title: "Pedidos",
      },
      create: {
        success: "Pedido salvo com sucesso",
      },
      update: {
        success: "Pedido salvo com sucesso",
      },
      destroy: {
        success: "Pedido excluído com sucesso",
      },
      destroyAll: {
        success: "Pedido(s) excluído(s) com sucesso",
      },
      edit: {
        title: "Editar Pedido",
      },
      fields: {
        id: "Id",
        userId: "Usuário",
        cart: "Carrinho",
        shipping: "Envio",
        discountRange: "Desconto",
        discount: "Desconto",
        paymentMethod: "Método de Pagamento",
        taxe: "Imposto",
        transactionNumber: "Número da Transação",
        orderStatus: "Status do Pedido",
        createdAt: "Criado em",
        updatedAt: "Atualizado em",
        createdAtRange: "Criado em",
      },
      enumerators: {
        orderStatus: {
          pending: "Pendente",
          in_progress: "Em Andamento",
          delivered: "Entregue",
          canceled: "Cancelado",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "Novo Pedido",
      },
      view: {
        title: "Ver Pedido",
      },
      importer: {
        title: "Importar Pedidos",
        fileName: "modelo_importacao_pedido",
        hint: "As colunas Arquivos/Imagens devem ser os URLs dos arquivos separados por espaço.",
      },
    },
  },



  buttons: {
    login: "Entrar",
    registerNow: "Registrar Agora",
    signup: "Cadastrar-se",
    start: "Iniciar",
    orders: "Pedidos",
    submit: "Enviar",
    backtohome: "Voltar para a Página Inicial",
    confirm: "Confirmar",
    logout: "Sair",
    getstarted: "Começar",
  },
  text: {
    welcome: "Bem-vindo",
    discover: "Descubra ofertas exclusivas para você",
    signin: "Entrar",
    haveaccount: "Já tem uma conta?",
    noaccount: "Não tem uma conta?",
    showingnow: "Em Exibição",
    comingsoon: "Em Breve",
    termsconditions: "Termos & Condições",
    todayearning: "Ganhos de Hoje",
    accountbalance: "Saldo da Conta",
    freezebalance: "Saldo Congelado",
    sumbitInformation: "Enviar Informações",
    order: "Pedido",
    pending: "Pendente",
    completed: "Concluído",
    canceled: "Cancelado",
    notransaction: "Nenhuma transação até agora!",
    createdtime: "Data de Criação",
    creationtime: "Hora de criação",
    orderNumber: "Número do Pedido",
    orderamount: "Valor do Pedido",
    income: "Rendimento",
    buyerating: "Avaliação do Comprador",
    uid: "UID",
    promotioncode: "Código Promocional",
    walletamount: "Saldo da Carteira",
    creditassesment: "Avaliação de Crédito",
    myfinance: "Minhas Finanças",
    withdraw: "Saque",
    mydetails: "Meus Dados",
    profile: "Perfil",
    wallet: "Carteira",
    other: "Outros",
    customersupport: "Atendimento ao Cliente",
    transaction: "Transação",
    taskshistory: "Histórico de Tarefas",
    security: "Segurança",
    sponsor: `Nossa segurança é nossa maior prioridade e queremos garantir que 
              você esteja protegido contra qualquer risco potencial. Lembre-se 
              de que nunca pediremos para enviar dinheiro para um endereço desconhecido. 
              Antes de fazer qualquer pagamento, pedimos que verifique as informações conosco.`,
  },
  errors: {
    backToHome: "Voltar para a Página Inicial",
    403: "Desculpe, você não tem acesso a esta página",
    404: "Desculpe, a página que você visitou não existe",
    500: "Desculpe, o servidor está reportando um erro",
    429: "Muitas solicitações. Tente novamente mais tarde.",
    forbidden: {
      message: "Acesso Negado",
    },
    validation: {
      message: "Ocorreu um erro",
    },
    defaultErrorMessage: "Ops, ocorreu um erro",
  },

  withdraw: {
    withdrawamount: "Valor do Saque",
    Withdrawpassword: "Senha de Saque",
    availablebalance: "Saldo Disponível",
    rules: "Descrição das Regras",
    rule1: "O saque mínimo é de $20",
    rule2: "O pagamento será feito dentro de 24 horas após a solicitação de saque",
    rule3: "A submissão incompleta dos pedidos diários impede o saque; todos os produtos devem ser enviados para retirada"
  },
  profile: {
    profile: "Perfil",
    fullname: "Nome Completo",
    email: "E-mail",
    phonenumber: "Número de Telefone",
    country: "País",
    Invitationcode: "Código de Convite"
  },
  wallet: {
    wallet: "Carteira",
    info: "Informações sobre o método de saque",
    username: "Nome de Usuário",
    walletname: "Nome da Carteira",
    walletaddress: "Endereço da Carteira",
    note: "Nota",
    notedesctiption: "Por favor, preencha estas informações com cuidado."
  },

  cs: {
    cs: "Atendimento ao Cliente",
    note: "Se tiver alguma dúvida ou encontrar problemas, envie-nos um e-mail ou converse com nossa equipe de suporte online.",
    contactnow: "Entre em Contato Agora"
  },
  transaction: {
    transaction: "Transação",
    all: "Todos",
    withdraw: "Saque",
    dposit: "Depósito",
    notransaction: "Nenhuma transação até agora!"
  },
  order: {
    order: "Pedido",
    completed: "Concluído",
    pending: "Pendente",
    canceled: "Cancelado",
    ordertime: "Hora do Pedido",
    ordernumber: "Número do Pedido",
    total: "Valor Total do Pedido",
    commission: "Comissão",
    return: "Retorno Estimado"
  },

  security: {
    changepassword: "Alterar Senha",
    oldpassword: "Senha Antiga",
    newpassword: "Nova Senha",
    confirmpassword: "Confirmar Senha",
    note: "Nota",
    notedesc: "Por favor, preencha estas informações com cuidado"
  },



  tabbarmenue: {
    home: "Início",
    rate: "Avaliar",
    profile: "Perfil"
  },
  validation: {
    mixed: {
      default: "${path} é inválido",
      required: "${path} é obrigatório",
      oneOf: "${path} deve ser um dos seguintes valores: ${values}",
      notOneOf: "${path} não deve ser um dos seguintes valores: ${values}",
      notType: ({ path, type, value, originalValue }) => {
        return `${path} deve ser um ${type}`;
      },
    },
    string: {
      length: "${path} deve ter exatamente ${length} caracteres",
      min: "${path} deve ter pelo menos ${min} caracteres",
      max: "${path} deve ter no máximo ${max} caracteres",
      matches: '${path} deve corresponder ao seguinte padrão: "${regex}"',
      email: "${path} deve ser um e-mail válido",
      url: "${path} deve ser um URL válido",
      trim: "${path} deve ser uma string sem espaços extras",
      lowercase: "${path} deve estar em letras minúsculas",
      uppercase: "${path} deve estar em letras maiúsculas",
      selected: "${path} deve ser selecionado",
    },
    number: {
      min: "${path} deve ser maior ou igual a ${min}",
      max: "${path} deve ser menor ou igual a ${max}",
      lessThan: "${path} deve ser menor que ${less}",
      moreThan: "${path} deve ser maior que ${more}",
      notEqual: "${path} não deve ser igual a ${notEqual}",
      positive: "${path} deve ser um número positivo",
      negative: "${path} deve ser um número negativo",
      integer: "${path} deve ser um número inteiro",
    },
    date: {
      min: "${path} deve ser posterior a ${min}",
      max: "${path} deve ser anterior a ${max}",
    },
    boolean: {},
    object: {
      noUnknown:
        "${path} não pode conter chaves não especificadas na estrutura do objeto",
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} é obrigatório`
          : `${path} deve ter pelo menos ${min} itens`,
      max: "${path} deve ter no máximo ${max} itens",
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: "Enviar",
    image: "Você deve enviar uma imagem",
    size: "O arquivo é muito grande. O tamanho máximo permitido é {0}",
    formats: `Formato inválido. Deve ser um dos seguintes: {0}.`,
  },



};

export default ptBR;
