
const In = {
  app: {
    title: 'नेक्सस एक्सचेंज'
  },

  auth: {
    userNotFound: `क्षमा करें, हम आपकी क्रेडेंशियल्स को पहचान नहीं पा रहे हैं`,
    wrongPassword: `क्षमा करें, हम आपकी क्रेडेंशियल्स को पहचान नहीं पा रहे हैं`,
    depositExist: 'जमा विधियां पहले से ही आरंभ की जा चुकी हैं',
    weakPassword: 'यह पासवर्ड बहुत कमजोर है',
    emailAlreadyInUse: 'उपयोगकर्ता नाम पहले से ही उपयोग में है',
    invitationCode: 'कृपया एक सही आमंत्रण कोड लिखें',
    invalidEmail: 'कृपया एक वैध ईमेल प्रदान करें',
    passwordReset: {
      invalidToken:
        'पासवर्ड रीसेट लिंक अमान्य है या इसकी अवधि समाप्त हो गई है',
      error: `ईमेल अज्ञात है`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'ईमेल सत्यापन लिंक अमान्य है या इसकी अवधि समाप्त हो गई है।',
      error: `ईमेल अज्ञात है।`,
      signedInAsWrongUser: `यह ईमेल पुष्टिकरण {0} पर भेजी गई थी, लेकिन आपने {1} के रूप में लॉग इन किया है।`,
    },
    passwordChange: {
      invalidPassword: 'पिछला पासवर्ड अमान्य है',
    },
  },

  futures: {
    alreadyFinalized: 'यह फ्यूचर्स प्रविष्टि पहले ही अंतिम रूप दी जा चुकी है और इसे बदला नहीं जा सकता।'
  },

  user: {
    errors: {
      userAlreadyExists:
        'इस ईमेल के साथ पहले से ही एक उपयोगकर्ता मौजूद है।',
      userNotFound: 'उपयोगकर्ता नहीं मिला।',
      destroyingHimself: `आप स्वयं को हटा नहीं सकते।`,
      revokingOwnPermission: `आप अपने स्वयं के व्यवस्थापक अनुमतियों को नहीं रद्द कर सकते।`,
      revokingPlanUser: `आप योजना प्रबंधक के व्यवस्थापक अनुमतियों को नहीं रद्द कर सकते।`,
      destroyingPlanUser: `आप योजना प्रबंधक को हटा नहीं सकते।`,
    },
  },

  tenant: {
    exists:
      'इस एप्लिकेशन में पहले से ही एक कार्यक्षेत्र मौजूद है।',
    url: {
      exists: 'यह कार्यक्षेत्र URL पहले से ही उपयोग में है।',
    },
    invitation: {
      notSameEmail: `यह आमंत्रण {0} पर भेजा गया था लेकिन आपने {1} के रूप में लॉग इन किया है।`,
    },
    planActive: `इस कार्यक्षेत्र के लिए एक सक्रिय योजना है। कृपया पहले योजना रद्द करें।`,
    stripeNotConfigured: 'स्ट्राइप कॉन्फ़िगर नहीं है।',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'फ़ाइल खाली है',
      invalidFileExcel:
        'केवल एक्सेल फ़ाइलें (.xlsx) की अनुमति है',
      invalidFileUpload:
        'अमान्य फ़ाइल। सुनिश्चित करें कि आप टेम्पलेट के नवीनतम संस्करण का उपयोग कर रहे हैं।',
      importHashRequired: 'आयात हैश आवश्यक है',
      importHashExistent: 'डेटा पहले ही आयात किया जा चुका है',
    },
  },

  errors: {
Invalidnonce: "अमान्य नॉन्स",
Invalidsignature: "अमान्य हस्ताक्षर",
frozenDuringExecution: "{{operation}} निष्पादित नहीं कर सकता। आपका {{currency}} पर्पेचुअल वॉलेट वर्तमान में फ्रीज है। कृपया ग्राहक सहायता से संपर्क करें।",
insufficientorfrozen: "सत्यापन के बाद वॉलेट में अपर्याप्त फंड या वॉलेट फ्रीज है",
notFounds: "{{currency}} वॉलेट नहीं मिला। कृपया समर्थन से संपर्क करें।",
frozen: "आपका {{currency}} वॉलेट वर्तमान में फ्रीज है। कृपया अपने खाते को अनफ्रीज करने के लिए ग्राहक सहायता से संपर्क करें।",
frozenWithFunds: "आपका {{currency}} वॉलेट फ्रीज है। आपके पास {{frozenAmount}} {{currency}} फ्रीज है और {{availableAmount}} {{currency}} उपलब्ध है। कृपया अपने खाते को अनफ्रीज करने के लिए ग्राहक सहायता से संपर्क करें।",
insufficientBalance: "अपर्याप्त {{currency}} बैलेंस। अनुरोधित: {{requested}}, उपलब्ध: {{available}}.",
insufficientWithFrozen: "अपर्याप्त उपलब्ध {{currency}} बैलेंस। अनुरोधित: {{requested}}, उपलब्ध: {{available}}, फ्रीज: {{frozen}}, कुल: {{total}}. कृपया अपने फंड को अनफ्रीज करने के लिए समर्थन से संपर्क करें।",
walletNotFound: "इस संपत्ति के लिए वॉलेट नहीं मिला",
withdrawinsufficientBalance: "इस निकासी के लिए अपर्याप्त बैलेंस।",
futuresAlreadyFinalized: "यह फ्यूचर्स प्रविष्टि पहले ही अंतिम हो चुकी है और इसे बदला नहीं जा सकता।",
usdtWalletNotFound: "USDT वॉलेट नहीं मिला",
usdtWalletFrozen: "USDT ट्रेड वॉलेट फ्रीज है",
insufficientusdtWallet: "ट्रेड वॉलेट में अपर्याप्त USDT बैलेंस",
usdtWalletorfrozen: "सत्यापन के बाद वॉलेट में अपर्याप्त फंड या वॉलेट फ्रीज है",
usdtWalletNotFoundForUser: "उपयोगकर्ता {{userId}} के लिए USDT वॉलेट नहीं मिला",
closingPriceExceedLimit: "समापन मूल्य $100 से अधिक नहीं हो सकता",
profitAmountInvalid: "लाभ राशि शून्य या अमान्य है।",
amountConditions: 'फ्यूचर्स राशि कम से कम 200 USDT होनी चाहिए',
lossAmountInvalid: "हानि राशि शून्य या अमान्य है।",
passwordNotMatching: "पासवर्ड मेल नहीं खा रहा",
insufficientBalanceUpgrade: "अपर्याप्त बैलेंस। कृपया अपग्रेड करें।",
walletNotFoundForCurrency: "{{currency}} के लिए वॉलेट नहीं मिला",
insufficientBalanceWithAmounts: "अपर्याप्त बैलेंस। आपके पास {{currentAmount}} {{currency}} है लेकिन {{tryingAmount}} {{currency}} स्टेक करने का प्रयास कर रहे हैं",
stakingPlanNotAvailable: "यह स्टेकिंग योजना अभी उपलब्ध नहीं है",
stakingPlanExpired: "यह स्टेकिंग योजना समाप्त हो गई है",
invalidUserBalance: "वर्तमान उपयोगकर्ता के लिए अमान्य बैलेंस",
invalidRequestAmount: "अमान्य अनुरोध राशि",
unsupportedCurrency: "असमर्थित मुद्रा",
alreadySubscribedToVip: "आप पहले से ही इस VIP के सदस्य हैं",
insufficientBalancePleaseUpgrade: "अपर्याप्त बैलेंस कृपया अपग्रेड करें",
resetAccountContactSupport: "कृपया अपना खाता रीसेट करें। ग्राहक सहायता से संपर्क करें",
contactCustomerService: "इसके बारे में ग्राहक सेवा से संपर्क करना चाहिए",
pleaseWriteAmount: "कृपया राशि लिखें",
withdrawalExceedsBalance: "ऐसा लगता है कि आपकी निकासी राशि आपके बैलेंस से अधिक है",
withdrawPasswordIncorrect: "आपका निकासी पासवर्ड सही नहीं है, कृपया फिर से जांचें",
    notFound: {
      message: 'नहीं मिला',
    },
    forbidden: {
      message: 'प्रतिबंधित',
    },
    validation: {
      message: 'एक त्रुटि हुई',
    },
  },

  email: {
    error: `ईमेल प्रदाता कॉन्फ़िगर नहीं है।`,
  },

  preview: {
    error:
      'क्षमा करें, यह ऑपरेशन पूर्वावलोकन मोड में अनुमति नहीं है।',
  },

};

export default In;