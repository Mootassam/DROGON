/**
 * I18n dictionary for the tr.
 */

const tr = {
  app: {
    title: 'Nexus Exchange'
  },

  auth: {
    userNotFound: `Üzgünüz, kimlik bilgilerinizi tanımıyoruz`,
    wrongPassword: `Üzgünüz, kimlik bilgilerinizi tanımıyoruz`,
    depositExist: 'Para yatırma yöntemleri zaten başlatıldı',
    weakPassword: 'Bu şifre çok zayıf',
    emailAlreadyInUse: 'Kullanıcı adı zaten kullanımda',
    invitationCode: 'Lütfen doğru bir davet kodu yazın',
    invalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
    passwordReset: {
      invalidToken:
        'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş',
      error: `E-posta tanınmadı`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'E-posta doğrulama bağlantısı geçersiz veya süresi dolmuş.',
      error: `E-posta tanınmadı.`,
      signedInAsWrongUser: `Bu e-posta onayı {0} adresine gönderildi ancak siz {1} olarak giriş yaptınız.`,
    },
    passwordChange: {
      invalidPassword: 'Eski şifre geçersiz',
    },
  },

  futures: {
    alreadyFinalized: 'Bu futures pozisyonu zaten sonlandırıldı ve değiştirilemez.'
  },

  user: {
    errors: {
      userAlreadyExists:
        'Bu e-posta ile zaten bir kullanıcı mevcut.',
      userNotFound: 'Kullanıcı bulunamadı.',
      destroyingHimself: `Kendinizi silemezsiniz.`,
      revokingOwnPermission: `Kendi yönetici izinlerinizi iptal edemezsiniz.`,
      revokingPlanUser: `Plan yöneticisinin yönetici izinlerini iptal edemezsiniz.`,
      destroyingPlanUser: `Plan yöneticisini silemezsiniz.`,
    },
  },

  tenant: {
    exists:
      'Bu uygulamada zaten bir çalışma alanı var.',
    url: {
      exists: 'Bu çalışma alanı URL\'si zaten kullanımda.',
    },
    invitation: {
      notSameEmail: `Bu davet {0} adresine gönderildi ancak siz {1} olarak giriş yaptınız.`,
    },
    planActive: `Bu çalışma alanı için aktif bir plan var. Lütfen önce planı iptal edin.`,
    stripeNotConfigured: 'Stripe yapılandırılmamış.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'Dosya boş',
      invalidFileExcel:
        'Sadece Excel (.xlsx) dosyalarına izin verilir',
      invalidFileUpload:
        'Geçersiz dosya. Şablonun en son sürümünü kullandığınızdan emin olun.',
      importHashRequired: 'İçe aktarma hash\'i gerekli',
      importHashExistent: 'Veriler zaten içe aktarıldı',
    },
  },

  errors: {
    Invalidnonce: "Geçersiz nonce",
Invalidsignature: "Geçersiz imza",
frozenDuringExecution: "{{operation}} yürütülemez. {{currency}} sürekli cüzdanınız şu anda dondurulmuş. Lütfen müşteri desteği ile iletişime geçin.",
insufficientorfrozen: "Doğrulama sonrası cüzdanda yetersiz fon veya cüzdan dondurulmuş",
notFounds: "{{currency}} cüzdanı bulunamadı. Lütfen destekle iletişime geçin.",
frozen: "{{currency}} cüzdanınız şu anda dondurulmuş. Lütfen hesabınızın dondurulmasını kaldırmak için müşteri desteği ile iletişime geçin.",
frozenWithFunds: "{{currency}} cüzdanınız dondurulmuş. {{frozenAmount}} {{currency}} dondurulmuş ve {{availableAmount}} {{currency}} mevcut. Lütfen hesabınızın dondurulmasını kaldırmak için müşteri desteği ile iletişime geçin.",
insufficientBalance: "Yetersiz {{currency}} bakiyesi. İstenen: {{requested}}, Mevcut: {{available}}.",
insufficientWithFrozen: "Yetersiz mevcut {{currency}} bakiyesi. İstenen: {{requested}}, Mevcut: {{available}}, Dondurulmuş: {{frozen}}, Toplam: {{total}}. Lütfen fonlarınızın dondurulmasını kaldırmak için destekle iletişime geçin.",
walletNotFound: "Bu varlık için cüzdan bulunamadı",
withdrawinsufficientBalance: "Bu çekim için yetersiz bakiye.",
futuresAlreadyFinalized: "Bu futures girişi zaten sonuçlandırıldı ve değiştirilemez.",
usdtWalletNotFound: "USDT cüzdanı bulunamadı",
usdtWalletFrozen: "USDT ticaret cüzdanı dondurulmuş",
insufficientusdtWallet: "Ticaret cüzdanında yetersiz USDT bakiyesi",
usdtWalletorfrozen: "Doğrulama sonrası cüzdanda yetersiz fon veya cüzdan dondurulmuş",
usdtWalletNotFoundForUser: "{{userId}} kullanıcısı için USDT cüzdanı bulunamadı",
closingPriceExceedLimit: "Kapanış fiyatı 100$'ı aşamaz",
profitAmountInvalid: "Kâr miktarı sıfır veya geçersiz.",
amountConditions: 'Futures miktarı en az 200 USDT olmalıdır',
lossAmountInvalid: "Zarar miktarı sıfır veya geçersiz.",
passwordNotMatching: "Şifre eşleşmiyor",
insufficientBalanceUpgrade: "Yetersiz bakiye. Lütfen yükseltin.",
walletNotFoundForCurrency: "{{currency}} için cüzdan bulunamadı",
insufficientBalanceWithAmounts: "Yetersiz bakiye. {{currentAmount}} {{currency}}'niz var ama {{tryingAmount}} {{currency}} stake etmeye çalışıyorsunuz",
stakingPlanNotAvailable: "Bu staking planı henüz mevcut değil",
stakingPlanExpired: "Bu staking planının süresi doldu",
invalidUserBalance: "Mevcut kullanıcı için geçersiz bakiye",
invalidRequestAmount: "Geçersiz istek miktarı",
unsupportedCurrency: "Desteklenmeyen para birimi",
alreadySubscribedToVip: "Zaten bu vip'e abonesiniz",
insufficientBalancePleaseUpgrade: "Yetersiz bakiye lütfen yükseltin",
resetAccountContactSupport: "Lütfen hesabınızı sıfırlayın. Müşteri desteği ile iletişime geçin",
contactCustomerService: "Bu konuda müşteri hizmetleri ile iletişime geçilmeli",
pleaseWriteAmount: "Lütfen miktarı yazın",
withdrawalExceedsBalance: "Çekim miktarınız bakiyenizi aşıyor gibi görünüyor",
withdrawPasswordIncorrect: "Çekim şifreniz doğru değil, lütfen tekrar kontrol edin",
    notFound: {
      message: 'Bulunamadı',
    },
    forbidden: {
      message: 'Yasak',
    },
    validation: {
      message: 'Bir hata oluştu',
    },
  },

  email: {
    error: `E-posta sağlayıcısı yapılandırılmamış.`,
  },

  preview: {
    error:
      'Üzgünüz, bu işleme önizleme modunda izin verilmiyor.',
  },

};

export default tr;