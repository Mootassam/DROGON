

import Permissions from "src/security/permissions";
const permissions = Permissions.values;

// Desktop standalone routes (no mobile layout, visitor-accessible) — rendered first
const pcRoutes = [
  {
    path: "/",
    loader: () => import("src/view/pages/Pc/PcTrading"),
    exact: true,
  },
];

const privateRoutes = [
  {
    path: "/profile",
    loader: () => import("src/view/pages/profile/profile"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/news",
    loader: () => import("src/view/pages/News/News"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/approval',
    loader: () => import('src/view/pages/About/Approval'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },



  {
    path: "/",
    loader: () => import("src/view/pages/Home/Home"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/trade",
    loader: () => import("src/view/pages/Trade/trade"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/futures",
    loader: () => import("src/view/pages/Futures/futures"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },
  {
    path: "/wallets",
    loader: () => import("src/view/pages/wallet/wallet"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
    {
    path: "/ordersPage",
    loader: () => import("src/view/pages/Order/OrdersPage"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


];

const screenRoutes = [
  {
    path: "/invitation",
    loader: () => import("src/view/pages/invitation/invitation"),
    permissionRequired: permissions.categoryRead,
  },

  {
    path: "/walletSettings",
    loader: () => import("src/view/pages/wallet/withdrawWallet"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },


  {
    path: "/bind-account",
    loader: () => import("src/view/pages/bindAccount/BindAccount"),
    permissionRequired: permissions.categoryRead,
  },

  {
    path: "/wallet",
    loader: () => import("src/view/pages/wallet/withdrawWallet"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },


  {
    path: "/bank_details",
    loader: () => import("src/view/pages/BankDetails/BankDetails"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },


  {
    path: "/language",
    loader: () => import("src/view/pages/Language/Language"),
  },

  {
    path: "/currency",
    loader: () => import("src/view/pages/currency/Currency"),
  },
  {
    path: "/about",
    loader: () => import("src/view/pages/About/About"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/support",
    loader: () => import("src/view/pages/Support/Support"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/download",
    loader: () => import("src/view/pages/Playsotre/Playstore"),
  },
  {
    path: "/support/details/:id",
    loader: () => import("src/view/pages/Support/supportDetails"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


  {
    path: "/wallets/:id",
    loader: () => import("src/view/pages/wallet/assetsDetail"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/conversion",
    loader: () => import("src/view/pages/conversion/Conversion"),
    permissionRequired: permissions.categoryRead,
  },



  {
    path: "/swap",
    loader: () => import("src/view/pages/swap/swap"),

    permissionRequired: permissions.categoryRead,
  },
  {
    path: "/transfer",
    loader: () => import("src/view/pages/transfer/transfer"),
    permissionRequired: permissions.categoryRead,
  },
  {
    path: "/transferAll",
    loader: () => import("src/view/pages/transfer/transferList"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },


  {
    path: "/deposit",
    loader: () => import("src/view/pages/deposit/depositPage"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/deposit/wallet/:id",
    loader: () => import("src/view/pages/deposit/deposit"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },
  {
    path: "/history",
    loader: () => import("src/view/pages/History/History"),
    permissionRequired: permissions.categoryRead,
  },


  {
    path: "/withdrawaddress",
    loader: () => import("src/view/pages/withdraw/WirthdrawAddress"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },
  {
    path: "/formwithdrawaddress/:id",
    loader: () => import("src/view/pages/withdraw/WalletSettings"),
    permissionRequired: permissions.categoryRead,
    requiresKyc: true,
  },



  {
    path: "/Withdraw",
    loader: () => import("src/view/pages/withdraw/Withdraw"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/Withdrawaddress",
    loader: () => import("src/view/pages/withdraw/WirthdrawAddress"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/notification",
    loader: () => import("src/view/pages/Notification/Notification"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/passwordtype",
    loader: () => import("src/view/pages/profile/typepassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/settings",
    loader: () => import("src/view/pages/settings/Settings"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/loginpassword",
    loader: () => import("src/view/pages/LoginPassword/LoginPassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/withdrawPassword",
    loader: () => import("src/view/pages/LoginPassword/withdrawpassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },
  {
    path: "/p2p",
    loader: () => import("src/view/pages/p2p/p2p"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/typepassword",
    loader: () => import("src/view/pages/profile/typepassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
    requiresKyc: true,
  },

  {
    path: "/proof",
    loader: () => import("src/view/pages/proof/proof"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/stacking",
    loader: () => import("src/view/pages/stacking/stacking"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/security-tips",
    loader: () => import("src/view/pages/securitytips/securitytips"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/privacy-portal",
    loader: () => import("src/view/pages/Home/Privacy"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/terms-of-use",

    loader: () => import("src/view/pages/Home/Termeofuse"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/termservice",
    loader: () => import("src/view/pages/termservice/termservice"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/kyc-status",
    loader: () => import("src/view/pages/kycStatus/KycStatusPage"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: "/auth/signin",
    loader: () => import("src/view/pages/Auth/Signin"),
  },
    {
    path: "/get-started",
    loader: () => import("src/view/pages/Auth/GetStarted"),
  },
  {
    path: "/terms-of-uses",
    loader: () => import("src/view/pages/Terms/TermsofServicePage"),
  },
  {
    path: "/auth/signup",
    loader: () => import("src/view/pages/Auth/Signup"),
  },


  {
    path: "/impersonate",
    loader: () => import("src/view/pages/Auth/ImpersonatePage"),
  },

];
const simpleRoutes = [
  {
    path: "/403",
    loader: () => import("src/view/shared/errors/Error403Page"),
  },
  {
    path: "/500",
    loader: () => import("src/view/shared/errors/Error500Page"),
  },
  {
    path: "**",
    loader: () => import("src/view/shared/errors/Error404Page"),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: "/auth/empty-permissions",
    loader: () => import("src/view/pages/Auth/EmptyPermissionsPage"),
  },
].filter(Boolean);

const navRoutes = [
  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
  },






].filter(Boolean);

const routeswithoutmobilemenue = [

  {
    path: "/product/details/:id",
    loader: () => import("src/view/pages/product/productDetails"),
  },
  {
    path: "/market/detail/:id",
    loader: () => import("src/view/pages/Market/MarketDetail"),
  },

  {
    path: "/online-service",
    loader: () => import("src/view/pages/LiveChat/LiveChat"),
  },





].filter(Boolean);
export default {
  pcRoutes,
  privateRoutes,
  publicRoutes,
  simpleRoutes,
  screenRoutes,
  navRoutes,
  routeswithoutmobilemenue,
  emptyPermissionsRoutes,
};
