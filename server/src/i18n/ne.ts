/**
 * I18n dictionary for the ne.
 */

const ne = {
  app: {
    title: 'नेक्सस एक्सचेंज'
  },

  auth: {
    userNotFound: `माफ गर्नुहोस्, हामी तपाईंको क्रेडेन्शियलहरू चिन्न सक्दैनौं`,
    wrongPassword: `माफ गर्नुहोस्, हामी तपाईंको क्रेडेन्शियलहरू चिन्न सक्दैनौं`,
    depositExist: 'डिपोजिट विधिहरू पहिले नै सुरु गरिएको छ',
    weakPassword: 'यो पासवर्ड धेरै कमजोर छ',
    emailAlreadyInUse: 'यो यूजरनेम पहिले नै प्रयोगमा छ',
    invitationCode: 'कृपया सहि आमन्त्रण कोड लेख्नुहोस्',
    invalidEmail: 'कृपया वैध इमेल प्रदान गर्नुहोस्',
    passwordReset: {
      invalidToken:
        'पासवर्ड रिसेट लिङ्क अवैध वा म्याद सकिएको छ',
      error: `इमेल चिन्न सकिएन`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'इमेल सत्यापन लिङ्क अवैध वा म्याद सकिएको छ।',
      error: `इमेल चिन्न सकिएन।`,
      signedInAsWrongUser: `यो इमेल पुष्टिकरण {0} मा पठाइएको थियो तर तपाईंले {1} को रूपमा लगइन गर्नुभएको छ।`,
    },
    passwordChange: {
      invalidPassword: 'पुरानो पासवर्ड अवैध छ',
    },
  },

  futures: {
    alreadyFinalized: 'यो फ्युचर्स प्रविष्टि पहिले नै अन्तिम गरिएको छ र परिवर्तन गर्न सकिदैन।'
  },

  user: {
    errors: {
      userAlreadyExists:
        'यस इमेलसँग पहिले नै प्रयोगकर्ता अवस्थित छ।',
      userNotFound: 'प्रयोगकर्ता भेटिएन।',
      destroyingHimself: `तपाईं आफैलाई मेटाउन सक्नुहुन्न।`,
      revokingOwnPermission: `तपाईं आफ्नो आफ्नै प्रशासकीय अनुमतिहरू रद्द गर्न सक्नुहुन्न।`,
      revokingPlanUser: `तपाईं योजना प्रबन्धकको प्रशासकीय अनुमतिहरू रद्द गर्न सक्नुहुन्न।`,
      destroyingPlanUser: `तपाईं योजना प्रबन्धकलाई मेटाउन सक्नुहुन्न।`,
    },
  },

  tenant: {
    exists:
      'यस अनुप्रयोगमा पहिले नै कार्यक्षेत्र अवस्थित छ।',
    url: {
      exists: 'यो कार्यक्षेत्र URL पहिले नै प्रयोगमा छ।',
    },
    invitation: {
      notSameEmail: `यो आमन्त्रण {0} मा पठाइएको थियो तर तपाईंले {1} को रूपमा लगइन गर्नुभएको छ।`,
    },
    planActive: `यस कार्यक्षेत्रको लागि सक्रिय योजना छ। कृपया पहिले योजना रद्द गर्नुहोस्।`,
    stripeNotConfigured: 'स्ट्राइप कन्फिगर गरिएको छैन।',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'फाइल खाली छ',
      invalidFileExcel:
        'एक्सेल फाइलहरू मात्र अनुमति छ (.xlsx)',
      invalidFileUpload:
        'अवैध फाइल। निश्चित गर्नुहोस् कि तपाईं टेम्पलेटको नवीनतम संस्करण प्रयोग गर्दै हुनुहुन्छ।',
      importHashRequired: 'आयात ह्याश आवश्यक छ',
      importHashExistent: 'डाटा पहिले नै आयात गरिएको छ',
    },
  },

  errors: {
Invalidnonce: "अवैध नोन्स",
Invalidsignature: "अवैध हस्ताक्षर",
frozenDuringExecution: "{{operation}} कार्यान्वयन गर्न सकिदैन। तपाईंको {{currency}} पर्पेचुअल वालेट हाल जमेको छ। कृपया ग्राहक सहयोग सम्पर्क गर्नुहोस्।",
insufficientorfrozen: "प्रमाणीकरण पछि वालेटमा अपर्याप्त रकम वा वालेट जमेको छ",
notFounds: "{{currency}} वालेट भेटिएन। कृपया समर्थन सम्पर्क गर्नुहोस्।",
frozen: "तपाईंको {{currency}} वालेट हाल जमेको छ। कृपया आफ्नो खाता खोल्न ग्राहक सहयोग सम्पर्क गर्नुहोस्।",
frozenWithFunds: "तपाईंको {{currency}} वालेट जमेको छ। तपाईंसँग {{frozenAmount}} {{currency}} जमेको छ र {{availableAmount}} {{currency}} उपलब्ध छ। कृपया आफ्नो खाता खोल्न ग्राहक सहयोग सम्पर्क गर्नुहोस्।",
insufficientBalance: "अपर्याप्त {{currency}} शेष। अनुरोध गरियो: {{requested}}, उपलब्ध: {{available}}.",
insufficientWithFrozen: "अपर्याप्त उपलब्ध {{currency}} शेष। अनुरोध गरियो: {{requested}}, उपलब्ध: {{available}}, जमेको: {{frozen}}, कुल: {{total}}. कृपया आफ्नो रकम खोल्न समर्थन सम्पर्क गर्नुहोस्।",
walletNotFound: "यस सम्पत्ति को लागि वालेट भेटिएन",
withdrawinsufficientBalance: "यस निकासी को लागि अपर्याप्त शेष।",
futuresAlreadyFinalized: "यो फ्यूचर्स प्रवेश पहिले नै अन्तिम भइसकेको छ र परिवर्तन गर्न सकिदैन।",
usdtWalletNotFound: "USDT वालेट भेटिएन",
usdtWalletFrozen: "USDT व्यापार वालेट जमेको छ",
insufficientusdtWallet: "व्यापार वालेटमा अपर्याप्त USDT शेष",
usdtWalletorfrozen: "प्रमाणीकरण पछि वालेटमा अपर्याप्त रकम वा वालेट जमेको छ",
usdtWalletNotFoundForUser: "प्रयोगकर्ता {{userId}} को लागि USDT वालेट भेटिएन",
closingPriceExceedLimit: "बन्द मूल्य $१०० भन्दा बढी हुन सक्दैन",
profitAmountInvalid: "लाभ रकम शून्य वा अवैध छ।",
amountConditions: 'फ्यूचर्स रकम कम्तिमा २०० USDT हुनुपर्छ',
lossAmountInvalid: "घाटा रकम शून्य वा अवैध छ।",
passwordNotMatching: "पासवर्ड मेल खाँदैन",
insufficientBalanceUpgrade: "अपर्याप्त शेष। कृपया अपग्रेड गर्नुहोस्।",
walletNotFoundForCurrency: "{{currency}} को लागि वालेट भेटिएन",
insufficientBalanceWithAmounts: "अपर्याप्त शेष। तपाईंसँग {{currentAmount}} {{currency}} छ तर {{tryingAmount}} {{currency}} स्टेक गर्न प्रयास गर्दै हुनुहुन्छ",
stakingPlanNotAvailable: "यो स्टेकिंग योजना अझै उपलब्ध छैन",
stakingPlanExpired: "यो स्टेकिंग योजना सकिएको छ",
invalidUserBalance: "वर्तमान प्रयोगकर्ता को लागि अवैध शेष",
invalidRequestAmount: "अवैध अनुरोध रकम",
unsupportedCurrency: "असमर्थित मुद्रा",
alreadySubscribedToVip: "तपाईं पहिले नै यस VIP मा सदस्य हुनुहुन्छ",
insufficientBalancePleaseUpgrade: "अपर्याप्त शेष कृपया अपग्रेड गर्नुहोस्",
resetAccountContactSupport: "कृपया आफ्नो खाता रिसेट गर्नुहोस्। ग्राहक सहयोग सम्पर्क गर्नुहोस्",
contactCustomerService: "यसबारे ग्राहक सेवा सम्पर्क गर्नुपर्छ",
pleaseWriteAmount: "कृपया रकम लेख्नुहोस्",
withdrawalExceedsBalance: "तपाईंको निकासी रकम तपाईंको शेष भन्दा बढी देखिन्छ",
withdrawPasswordIncorrect: "तपाईंको निकासी पासवर्ड सही छैन, कृपया फेरि जाँच गर्नुहोस्",
    notFound: {
      message: 'भेटिएन',
    },
    forbidden: {
      message: 'निषेधित',
    },
    validation: {
      message: 'एउटा त्रुटि भयो',
    },
  },

  email: {
    error: `इमेल प्रदायक कन्फिगर गरिएको छैन।`,
  },

  preview: {
    error:
      'माफ गर्नुहोस्, यो अपरेशन पूर्वावलोकन मोडमा अनुमति छैन।',
  },

};

export default ne;