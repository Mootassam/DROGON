/**
 * I18n dictionary for the ptBR.
 */

const ptBR = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Desculpe, não reconhecemos suas credenciais`,
    wrongPassword: `Desculpe, não reconhecemos suas credenciais`,
    depositExist: 'Métodos de depósito já inicializados',
    weakPassword: 'Esta senha é muito fraca',
    emailAlreadyInUse: 'Nome de usuário já está em uso',
    invitationCode: 'Por favor escreva um código de convite correto',
    invalidEmail: 'Por favor forneça um email válido',
    passwordReset: {
      invalidToken:
        'Link de redefinição de senha é inválido ou expirou',
      error: `Email não reconhecido`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Link de verificação de email é inválido ou expirou.',
      error: `Email não reconhecido.`,
      signedInAsWrongUser: `Esta confirmação de email foi enviada para {0} mas você está conectado como {1}.`,
    },
    passwordChange: {
      invalidPassword: 'A senha antiga é inválida',
    },
  },

  futures: {
    alreadyFinalized: 'Esta entrada de futuros já está finalizada e não pode ser alterada.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Usuário com este email já existe.',
      userNotFound: 'Usuário não encontrado.',
      destroyingHimself: `Você não pode se excluir.`,
      revokingOwnPermission: `Você não pode revogar suas próprias permissões de administrador.`,
      revokingPlanUser: `Você não pode revogar as permissões de administrador do gerente do plano.`,
      destroyingPlanUser: `Você não pode excluir o gerente do plano.`,
    },
  },

  tenant: {
    exists:
      'Já existe um workspace neste aplicativo.',
    url: {
      exists: 'Esta URL de workspace já está em uso.',
    },
    invitation: {
      notSameEmail: `Este convite foi enviado para {0} mas você está conectado como {1}.`,
    },
    planActive: `Há um plano ativo para este workspace. Por favor cancele o plano primeiro.`,
    stripeNotConfigured: 'Stripe não está configurado.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'O arquivo está vazio',
      invalidFileExcel:
        'Apenas arquivos Excel (.xlsx) são permitidos',
      invalidFileUpload:
        'Arquivo inválido. Certifique-se de estar usando a última versão do template.',
      importHashRequired: 'Hash de importação é necessário',
      importHashExistent: 'Dados já foram importados',
    },
  },

  errors: {
   Invalidnonce: "Nonce inválido",
Invalidsignature: "Assinatura inválida",
frozenDuringExecution: "Não é possível executar {{operation}}. Sua carteira perpétua {{currency}} está atualmente congelada. Entre em contato com o suporte ao cliente.",
insufficientorfrozen: "Fundos insuficientes na carteira após validação ou carteira congelada",
notFounds: "Carteira {{currency}} não encontrada. Entre em contato com o suporte.",
frozen: "Sua carteira {{currency}} está atualmente congelada. Entre em contato com o suporte ao cliente para descongelar sua conta.",
frozenWithFunds: "Sua carteira {{currency}} está congelada. Você tem {{frozenAmount}} {{currency}} congelados e {{availableAmount}} {{currency}} disponíveis. Entre em contato com o suporte ao cliente para descongelar sua conta.",
insufficientBalance: "Saldo {{currency}} insuficiente. Solicitado: {{requested}}, Disponível: {{available}}.",
insufficientWithFrozen: "Saldo disponível {{currency}} insuficiente. Solicitado: {{requested}}, Disponível: {{available}}, Congelado: {{frozen}}, Total: {{total}}. Entre em contato com o suporte para descongelar seus fundos.",
walletNotFound: "Carteira não encontrada para este ativo",
withdrawinsufficientBalance: "Saldo insuficiente para este saque.",
futuresAlreadyFinalized: "Esta entrada de futuros já está finalizada e não pode ser alterada.",
usdtWalletNotFound: "Carteira USDT não encontrada",
usdtWalletFrozen: "A carteira de trade USDT está congelada",
insufficientusdtWallet: "Saldo USDT insuficiente na carteira de trade",
usdtWalletorfrozen: "Fundos insuficientes na carteira após validação ou carteira congelada",
usdtWalletNotFoundForUser: "Carteira USDT não encontrada para o usuário {{userId}}",
closingPriceExceedLimit: "O preço de fechamento não pode exceder $100",
profitAmountInvalid: "O valor do lucro é zero ou inválido.",
amountConditions: 'O valor de futuros deve ser pelo menos 200 USDT',
lossAmountInvalid: "O valor da perda é zero ou inválido.",
passwordNotMatching: "A senha não corresponde",
insufficientBalanceUpgrade: "Saldo insuficiente. Por favor, faça upgrade.",
walletNotFoundForCurrency: "Carteira não encontrada para {{currency}}",
insufficientBalanceWithAmounts: "Saldo insuficiente. Você tem {{currentAmount}} {{currency}} mas está tentando fazer staking de {{tryingAmount}} {{currency}}",
stakingPlanNotAvailable: "Este plano de staking ainda não está disponível",
stakingPlanExpired: "Este plano de staking expirou",
invalidUserBalance: "Saldo inválido para o usuário atual",
invalidRequestAmount: "Valor da solicitação inválido",
unsupportedCurrency: "Moeda não suportada",
alreadySubscribedToVip: "Você já está inscrito neste vip",
insufficientBalancePleaseUpgrade: "Saldo insuficiente, por favor faça upgrade",
resetAccountContactSupport: "Por favor, redefina sua conta. Entre em contato com o suporte ao cliente",
contactCustomerService: "Deve entrar em contato com o serviço de atendimento ao cliente sobre isso",
pleaseWriteAmount: "Por favor, escreva o valor",
withdrawalExceedsBalance: "Parece que o valor do seu saque excede seu saldo",
withdrawPasswordIncorrect: "Sua senha de saque não está correta, por favor verifique novamente",
    notFound: {
      message: 'Não encontrado',
    },
    forbidden: {
      message: 'Proibido',
    },
    validation: {
      message: 'Ocorreu um erro',
    },
  },

  email: {
    error: `O provedor de email não está configurado.`,
  },

  preview: {
    error:
      'Desculpe, esta operação não é permitida no modo de visualização.',
  },

};

export default ptBR;