/**
 * I18n dictionary for the ru.
 */

const ru = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Извините, мы не узнаем ваши учетные данные`,
    wrongPassword: `Извините, мы не узнаем ваши учетные данные`,
    depositExist: 'Методы депозита уже инициализированы',
    weakPassword: 'Этот пароль слишком слабый',
    emailAlreadyInUse: 'Имя пользователя уже используется',
    invitationCode: 'Пожалуйста, введите правильный код приглашения',
    invalidEmail: 'Пожалуйста, укажите действительный email',
    passwordReset: {
      invalidToken:
        'Ссылка для сброса пароля недействительна или истекла',
      error: `Email не распознан`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Ссылка для подтверждения email недействительна или истекла.',
      error: `Email не распознан.`,
      signedInAsWrongUser: `Это подтверждение email было отправлено на {0}, но вы вошли как {1}.`,
    },
    passwordChange: {
      invalidPassword: 'Старый пароль недействителен',
    },
  },

  futures: {
    alreadyFinalized: 'Эта позиция фьючерсов уже завершена и не может быть изменена.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Пользователь с таким email уже существует.',
      userNotFound: 'Пользователь не найден.',
      destroyingHimself: `Вы не можете удалить себя.`,
      revokingOwnPermission: `Вы не можете отозвать свои права администратора.`,
      revokingPlanUser: `Вы не можете отозвать права администратора у менеджера плана.`,
      destroyingPlanUser: `Вы не можете удалить менеджера плана.`,
    },
  },

  tenant: {
    exists:
      'В этом приложении уже есть рабочее пространство.',
    url: {
      exists: 'Этот URL рабочего пространства уже используется.',
    },
    invitation: {
      notSameEmail: `Это приглашение было отправлено на {0}, но вы вошли как {1}.`,
    },
    planActive: `Для этого рабочего пространства действует план. Пожалуйста, сначала отмените план.`,
    stripeNotConfigured: 'Stripe не настроен.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Файл пуст',
      invalidFileExcel:
        'Разрешены только файлы Excel (.xlsx)',
      invalidFileUpload:
        'Неверный файл. Убедитесь, что используете последнюю версию шаблона.',
      importHashRequired: 'Требуется хэш импорта',
      importHashExistent: 'Данные уже были импортированы',
    },
  },

  errors: {
  Invalidnonce: "Неверный одноразовый номер",
Invalidsignature: "Неверная подпись",
frozenDuringExecution: "Невозможно выполнить {{operation}}. Ваш бессрочный кошелек {{currency}} в настоящее время заморожен. Пожалуйста, обратитесь в службу поддержки клиентов.",
insufficientorfrozen: "Недостаточно средств в кошельке после проверки или кошелек заморожен",
notFounds: "Кошелек {{currency}} не найден. Пожалуйста, обратитесь в службу поддержки.",
frozen: "Ваш кошелек {{currency}} в настоящее время заморожен. Пожалуйста, обратитесь в службу поддержки клиентов, чтобы разблокировать ваш счет.",
frozenWithFunds: "Ваш кошелек {{currency}} заморожен. У вас заморожено {{frozenAmount}} {{currency}} и доступно {{availableAmount}} {{currency}}. Пожалуйста, обратитесь в службу поддержки клиентов, чтобы разблокировать ваш счет.",
insufficientBalance: "Недостаточно средств {{currency}}. Запрошено: {{requested}}, Доступно: {{available}}.",
insufficientWithFrozen: "Недостаточно доступных средств {{currency}}. Запрошено: {{requested}}, Доступно: {{available}}, Заморожено: {{frozen}}, Всего: {{total}}. Пожалуйста, обратитесь в службу поддержки, чтобы разблокировать ваши средства.",
walletNotFound: "Кошелек не найден для этого актива",
withdrawinsufficientBalance: "Недостаточно средств для этого вывода.",
futuresAlreadyFinalized: "Эта запись фьючерсов уже завершена и не может быть изменена.",
usdtWalletNotFound: "Кошелек USDT не найден",
usdtWalletFrozen: "Торговый кошелек USDT заморожен",
insufficientusdtWallet: "Недостаточно средств USDT в торговом кошельке",
usdtWalletorfrozen: "Недостаточно средств в кошельке после проверки или кошелек заморожен",
usdtWalletNotFoundForUser: "Кошелек USDT не найден для пользователя {{userId}}",
closingPriceExceedLimit: "Цена закрытия не может превышать $100",
profitAmountInvalid: "Сумма прибыли равна нулю или недействительна.",
amountConditions: 'Сумма фьючерсов должна быть не менее 200 USDT',
lossAmountInvalid: "Сумма убытка равна нулю или недействительна.",
passwordNotMatching: "Пароль не совпадает",
insufficientBalanceUpgrade: "Недостаточно средств. Пожалуйста, обновите.",
walletNotFoundForCurrency: "Кошелек не найден для {{currency}}",
insufficientBalanceWithAmounts: "Недостаточно средств. У вас есть {{currentAmount}} {{currency}}, но вы пытаетесь поставить {{tryingAmount}} {{currency}}",
stakingPlanNotAvailable: "Этот план стейкинга еще не доступен",
stakingPlanExpired: "Срок действия этого плана стейкинга истек",
invalidUserBalance: "Неверный баланс для текущего пользователя",
invalidRequestAmount: "Неверная сумма запроса",
unsupportedCurrency: "Неподдерживаемая валюта",
alreadySubscribedToVip: "Вы уже подписаны на этот VIP",
insufficientBalancePleaseUpgrade: "Недостаточно средств, пожалуйста, обновите",
resetAccountContactSupport: "Пожалуйста, сбросьте свой аккаунт. Обратитесь в службу поддержки клиентов",
contactCustomerService: "Следует обратиться в службу поддержки клиентов по этому поводу",
pleaseWriteAmount: "Пожалуйста, укажите сумму",
withdrawalExceedsBalance: "Похоже, сумма вашего вывода превышает ваш баланс",
withdrawPasswordIncorrect: "Ваш пароль для вывода неверен, пожалуйста, проверьте еще раз",
    notFound: {
      message: 'Не найдено',
    },
    forbidden: {
      message: 'Запрещено',
    },
    validation: {
      message: 'Произошла ошибка',
    },
  },

  email: {
    error: `Провайдер email не настроен.`,
  },

  preview: {
    error:
      'Извините, эта операция не разрешена в режиме предварительного просмотра.',
  },

};

export default ru;