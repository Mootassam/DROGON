/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Nexus Exchanage'
  },
  validation: {
    withdrawalMethodRequired: "Please select a withdrawal method (Bank or Crypto) before submitting your request",

    withdrawNotAllowed: "Withdrawals are currently disabled for your account. Please contact customer support",

    minimumBalanceRequired: "You must maintain the minimum required balance after withdrawal",

    missingWalletDetails: "Please complete your wallet information before submitting a crypto withdrawal request",

    missingERC20Address: "Please bind your ERC20 wallet address before submitting a withdrawal request",

    missingTRC20Address: "Please bind your TRC20 wallet address before submitting a withdrawal request",

    inValidWithdrawPassword: 'Your withdraw Password is not correct please check again',
    missingBankDetails: 'Please add your bank details before making a withdrawal',
    missingWithdrawalMethod: 'Please add either a crypto wallet or bank details before making a withdrawal',
    requiredAmount: 'Please enter an amount',
    exceedsBalance: 'Your balance is insufficient for this withdrawal',
    missingWalletAddress: 'Please go to the "Wallet" section to bind your USDT (TRC20) or ERC20 address before submitting a withdrawal request.',
    notFoundTransaction: 'Transaction not found',
    permissoin: "Please try to contact the customer Support for help",
    duplicateSubsctription: 'You have already subscribed to this plan',
    InsufficientBalance: 'Insufficient balance',
    requiredSubscription: 'Please select a subscription plan',
    moretasks: 'This is your limit. Please contact customer support for more tasks',
    deposit: "Insufficient balance please contact the customer support",
    insufficientBalanceMin: "Your balance must be at least €{0} to proceed.",

    submitPendingProducts: "Please, submit the pending products ",
    noProductsAvailable: "noProductsAvailable",
    oldPasswordRequired: "Old password is required",
    newPasswordRequired: "New password is required",
    newPasswordTooShort: "New password must be at least 4 characters long",
    newPasswordTooLong: "New password must not exceed 50 characters",
    newPasswordDifferentFromOld: "New password must be different from old password",
    userNotFound: "User not found",
    invalidOldWithdrawalPassword: "The old withdrawal password is incorrect",
    updatePasswordFailed: "Failed to update password. Please try again.",
    productNotFound: "Product not found",
    invalidPriceOrCommission: "Invalid price or commission values",
    invalidPriceRange: "Invalid min or max values for price generation",
    cleanDatabaseOnlyForTest: "Clean database only allowed for test!",
    stripeLineItemPriceIdNull: "Stripe line_items.data[0].price.id is missing",
    noRecordsToComplete: "No records found to complete",
    noPendingRecord: "No pending record found"
  },
  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    depositExist: 'Deposit methods already initialized',
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Username is already in use',
    invitationCode: 'please write a correct invitationCode',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  futures: {
    alreadyFinalized: 'This futures entry is already finalized and cannot be changed.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    Invalidnonce :"Invalid nonce", 
    Invalidsignature:"Invalid signature",

      frozenDuringExecution: "Cannot execute {{operation}}. Your {{currency}} perpetual wallet is currently frozen. Please contact customer support.",
      insufficientorfrozen:"Insufficient funds in wallet after validation or wallet is frozen",
    notFounds: `{{currency}} wallet not found. Please contact support.`,
    frozen: "Your {{currency}} wallet is currently frozen. Please contact customer support to unfreeze your account.",
    frozenWithFunds: "Your {{currency}} wallet is frozen. You have {{frozenAmount}} {{currency}} frozen and {{availableAmount}} {{currency}} available. Please contact customer support to unfreeze your account.",
    insufficientBalance: "Insufficient {{currency}} balance. Requested: {{requested}}, Available: {{available}}.",
    insufficientWithFrozen: "Insufficient available {{currency}} balance. Requested: {{requested}}, Available: {{available}}, Frozen: {{frozen}}, Total: {{total}}. Please contact support to unfreeze your funds.",
    walletNotFound: "wallet bit found for this asset",
    withdrawinsufficientBalance: "Insufficient balance for this withdrawal.",
    futuresAlreadyFinalized: "This futures entry is already finalized and cannot be changed.",
    usdtWalletNotFound: "USDT wallet not found",
    usdtWalletFrozen: "USDT trade wallet is frozen",
    insufficientusdtWallet: "Insufficient USDT balance in trade wallet",
 usdtWalletorfrozen:"Insufficient funds in wallet after validation or wallet is frozen",
    usdtWalletNotFoundForUser: "USDT wallet not found for user {{userId}}",
    closingPriceExceedLimit: "Closing price cannot exceed $100",
    profitAmountInvalid: "Profit amount is zero or invalid.",
    amountConditions: 'Futures amount must be at least 200 USDT',
    lossAmountInvalid: "Loss amount is zero or invalid.",
    passwordNotMatching: "Password not matching",
    insufficientBalanceUpgrade: "Insufficient balance. Please upgrade.",
    walletNotFoundForCurrency: "Wallet not found for {{currency}}",
    insufficientBalanceWithAmounts: "Insufficient balance. You have {{currentAmount}} {{currency}} but trying to stake {{tryingAmount}} {{currency}}",
    stakingPlanNotAvailable: "This staking plan is not yet available",
    stakingPlanExpired: "This staking plan has expired",
    invalidUserBalance: "Invalid balance for the current user",
    invalidRequestAmount: "Invalid request amount",
    unsupportedCurrency: "Unsupported currency",
    alreadySubscribedToVip: "You are already subscribed to this vip",
    insufficientBalancePleaseUpgrade: "Insufficient balance please upgrade",
    resetAccountContactSupport: "Please reset your account. contact customer support",
    contactCustomerService: "Should be contact the customer service about this",
    pleaseWriteAmount: "Please write amount",
    withdrawalExceedsBalance: "It looks like your withdrawal amount exceeds your balance",
    withdrawPasswordIncorrect: "Your withdraw Password is not correct please check again",
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

};

export default en;
