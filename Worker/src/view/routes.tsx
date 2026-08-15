

import Permissions from 'src/security/permissions';
// import config from 'src/config';

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
      loader: () => import('src/view/user/client/UserPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/clients',
    loader: () => import('src/view/user/client/UserPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/password-reset/:id',
    loader: () => import('src/view/auth/PasswordReset'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/logo',
    loader: () => import('src/view/company/Logo'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/company',
    loader: () => import('src/view/company/company'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/faqs',
    loader: () => import('src/view/company/Faqs'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/companydetail',
    loader: () => import('src/view/company/companyDetails'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/tc',
    loader: () => import('src/view/company/Tc'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/category',
    loader: () =>
      import('src/view/category/list/CategoryListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/category/new',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },
  {
    path: '/category/importer',
    loader: () =>
      import(
        'src/view/category/importer/CategoryImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },
  {
    path: '/category/:id/edit',
    loader: () =>
      import('src/view/category/form/CategoryFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },
  {
    path: '/category/:id',
    loader: () =>
      import('src/view/category/view/CategoryViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


// routes for rules


{
    path: '/rules',
    loader: () =>
      import('src/view/rules/list/RulesListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/rules/new',
    loader: () =>
      import('src/view/rules/form/RulesFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },
  {
    path: '/rules/importer',
    loader: () =>
      import(
        'src/view/rules/importer/RulesImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },
  {
    path: '/rules/:id/edit',
    loader: () =>
      import('src/view/rules/form/RulesFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },
  {
    path: '/rules/:id',
    loader: () =>
      import('src/view/rules/view/RulesViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },{
    path: '/rules',
    loader: () =>
      import('src/view/rules/list/RulesListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/rules/new',
    loader: () =>
      import('src/view/rules/form/RulesFormPage'),
    permissionRequired: permissions.categoryCreate,
    exact: true,
  },
  {
    path: '/rules/importer',
    loader: () =>
      import(
        'src/view/rules/importer/RulesImporterPage'
      ),
    permissionRequired: permissions.categoryImport,
    exact: true,
  },
  {
    path: '/rules/:id/edit',
    loader: () =>
      import('src/view/rules/form/RulesFormPage'),
    permissionRequired: permissions.categoryEdit,
    exact: true,
  },
  {
    path: '/rules/:id',
    loader: () =>
      import('src/view/rules/view/RulesViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },



  // product routes
  {
    path: '/product',
    loader: () =>
      import('src/view/product/list/ProductListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/product/new',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/product/importer',
    loader: () =>
      import(
        'src/view/product/importer/ProductImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/product/:id/edit',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/product/:id',
    loader: () =>
      import('src/view/product/view/ProductViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // product routes
  {
    path: '/transaction',
    loader: () =>
      import(
        'src/view/transaction/list/TransactionListPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/transaction/new',
    loader: () =>
      import(
        'src/view/transaction/form/TransactionFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/importer',

    loader: () =>
      import(
        'src/view/transaction/importer/TransactionImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/:id/edit',
    loader: () =>
      import(
        'src/view/transaction/form/TransactionFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/:id',
    loader: () =>
      import(
        'src/view/transaction/view/TransactionViewPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // record routes
  {
    path: '/record',
    loader: () =>
      import('src/view/record/list/RecordListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/record/new',
    loader: () =>
      import('src/view/record/form/RecordFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/record/importer',
    loader: () =>
      import('src/view/record/importer/RecordImporterPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/record/:id/edit',
    loader: () =>
      import('src/view/record/form/RecordFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/record/:id',
    loader: () =>
      import('src/view/record/view/RecordViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // transaction routes

  {
    path: '/transaction',
    loader: () =>
      import(
        'src/view/transaction/list/TransactionListPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/transaction/new',
    loader: () =>
      import(
        'src/view/transaction/form/TransactionFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/importer',
    loader: () =>
      import(
        'src/view/transaction/importer/TransactionImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/:id/edit',
    loader: () =>
      import(
        'src/view/transaction/form/TransactionFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/transaction/:id',
    loader: () =>
      import(
        'src/view/transaction/view/TransactionViewPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // Kyc routes

  {
    path: '/kyc',
    loader: () => import('src/view/kyc/list/KycListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/kyc/new',
    loader: () => import('src/view/kyc/form/KycFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/kyc/importer',
    loader: () =>
      import('src/view/kyc/importer/KycImporterPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/kyc/:id/edit',
    loader: () => import('src/view/kyc/form/KycFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/kyc/:id',
    loader: () => import('src/view/kyc/view/KycViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // kyc routes

  {
    path: '/kyc',
    loader: () => import('src/view/kyc/list/KycListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/kyc/new',
    loader: () => import('src/view/kyc/form/KycFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/kyc/importer',
    loader: () =>
      import('src/view/kyc/importer/KycImporterPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/kyc/:id/edit',
    loader: () => import('src/view/kyc/form/KycFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/kyc/:id',
    loader: () => import('src/view/kyc/view/KycViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // Deposit routes

  {
    path: '/deposit',
    loader: () =>
      import('src/view/deposit/list/DepositListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/deposit/new',
    loader: () =>
      import('src/view/deposit/form/DepositFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/deposit/importer',
    loader: () =>
      import(
        'src/view/deposit/importer/DepositImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/deposit/:id/edit',
    loader: () =>
      import('src/view/deposit/form/DepositFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/deposit/:id',
    loader: () =>
      import('src/view/deposit/view/DepositViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },



  // Deposit Network routes

  {
    path: '/depositNetwork',
    loader: () =>
      import('src/view/depositNetwork/list/DepositNetworkListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/depositNetwork/new',
    loader: () =>
      import('src/view/depositNetwork/form/DepositNetworkFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/depositNetwork/importer',
    loader: () =>
      import(
        'src/view/depositNetwork/importer/DepositNetworkImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/depositNetwork/:id/edit',
    loader: () =>
      import('src/view/depositNetwork/form/DepositNetworkFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/depositNetwork/:id',
    loader: () =>
      import('src/view/depositNetwork/view/DepositNetworkViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // Notification


  {
    path: '/notification',
    loader: () =>
      import('src/view/notification/list/NotificationListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/notification/new',
    loader: () =>
      import('src/view/notification/form/NotificationFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/notification/importer',
    loader: () =>
      import(
        'src/view/notification/importer/NotificationImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/notification/:id/edit',
    loader: () =>
      import('src/view/notification/form/NotificationFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/notification/:id',
    loader: () =>
      import('src/view/notification/view/NotificationViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },











  // Withdraw routes

  {
    path: '/withdraw',
    loader: () =>
      import('src/view/withdraw/list/WithdrawListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/withdraw/new',
    loader: () =>
      import('src/view/withdraw/form/WithdrawFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/withdraw/importer',
    loader: () =>
      import(
        'src/view/withdraw/importer/WithdrawImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/withdraw/:id/edit',
    loader: () =>
      import('src/view/withdraw/form/WithdrawFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/withdraw/:id',
    loader: () =>
      import('src/view/withdraw/view/WithdrawViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // Assets routes

  {
    path: '/assets',
    loader: () =>
      import('src/view/assets/list/AssetsListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/assets/new',
    loader: () =>
      import('src/view/assets/form/AssetsFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/assets/importer',
    loader: () =>
      import(
        'src/view/deposit/importer/DepositImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/assets/:id/edit',
    loader: () =>
      import('src/view/assets/form/AssetsFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/assets/:id',
    loader: () =>
      import('src/view/assets/view/AssetsViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // spot routes

  {
    path: '/spot',
    loader: () => import('src/view/spot/list/SpotListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/spot/new',
    loader: () => import('src/view/spot/form/SpotFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/spot/importer',
    loader: () =>
      import('src/view/spot/importer/SpotImporterPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/spot/:id/edit',
    loader: () => import('src/view/spot/form/SpotFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/spot/:id',
    loader: () => import('src/view/spot/view/SpotViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // Message routes

  {
    path: '/message',
    loader: () =>
      import('src/view/message/list/MessageListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/message/new',
    loader: () =>
      import('src/view/message/form/MessageFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/message/importer',
    loader: () =>
      import(
        'src/view/message/importer/MessageImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/message/:id/edit',
    loader: () =>
      import('src/view/message/form/MessageFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/message/:id',
    loader: () =>
      import('src/view/message/view/MessageViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  // Futures routes

  {
    path: '/futures',
    loader: () =>
      import('src/view/futures/list/FuturesListPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/futures/new',
    loader: () =>
      import('src/view/futures/form/FuturesFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/futures/importer',
    loader: () =>
      import(
        'src/view/futures/importer/FuturesImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/futures/:id/edit',
    loader: () =>
      import('src/view/futures/form/FuturesFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/futures/:id',
    loader: () =>
      import('src/view/futures/view/FuturesViewPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  // Stacking routes

  {
    path: '/stacking',
    loader: () =>
      import('src/view/stacking/list/stackingListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/stacking/new',
    loader: () =>
      import('src/view/stacking/form/stackingFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/stacking/importer',
    loader: () =>
      import(
        'src/view/stacking/importer/stackingImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/stacking/:id/edit',
    loader: () =>
      import('src/view/stacking/form/stackingFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  // deposit method 
  {
    path: '/depositMethod',
    loader: () =>
      import('src/view/depositMethod/list/DepositMethodListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/depositMethod/new',
    loader: () =>
      import('src/view/depositMethod/form/DepositMethodFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/depositMethod/:id/edit',
    loader: () =>
      import('src/view/depositMethod/form/DepositMethodFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,

  },



  // {

  //   path: '/stacking/:id',
  //   loader: () =>
  //     import('src/view/stacking/view/stackingViewPage'),
  //   permissionRequired: permissions.categoryRead,
  //   exact: true,
  // },

  // Stacking routes

  {
    path: '/stackingPlan',
    loader: () =>
      import(
        'src/view/stackingPlan/list/StackingPlanListPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/stackingPlan/new',
    loader: () =>
      import(
        'src/view/stackingPlan/form/StackingPlanFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/stacking/importer',
    loader: () =>
      import(
        'src/view/stackingPlan/importer/stackingPlanImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/stackingPlan/:id/edit',
    loader: () =>
      import(
        'src/view/stackingPlan/form/StackingPlanFormPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/stackingPlan/:id',
    loader: () =>
      import(
        'src/view/stackingPlan/view/stackingPlanViewPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  //  coupons routes

  {
    path: '/coupons',
    loader: () =>
      import('src/view/coupons/list/CouponsListPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/coupons/new',
    loader: () =>
      import('src/view/coupons/form/CouponsFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/coupons/importer',
    loader: () =>
      import(
        'src/view/coupons/importer/CouponsImporterPage'
      ),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/coupons/:id/edit',
    loader: () =>
      import('src/view/coupons/form/CouponsFormPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/coupons/:id',
    loader: () =>
      import('src/view/coupons/view/CouponsViewPage'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: '/check',
    loader: () => import('src/view/visa/Check'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/password-change',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/tenant',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/new',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/tenant/:id/edit',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/user',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/user/new',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },
  {
    path: '/user/:id/edit',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },
  {
    path: '/user/:id',
    loader: () => import('src/view/user/view/UserDetails'),
    permissionRequired: permissions.categoryDestroy,
    exact: true,
  },

  {
    path: '/audit-logs',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.categoryDestroy,
  },

  {
    path: '/settings',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.categoryDestroy,
  },

  {
    path: '/customer-support',
    loader: () =>
      import('src/view/customerSupport/CustomerSupportPage'),
    permissionRequired: permissions.userRead,
  },

  {
    path: '/paymentsettings',
    loader: () =>
      import(
        'src/view/paymentsettings/list/PaymentsettingsListPage'
      ),
    permissionRequired: permissions.paymentsettingsRead,
    exact: true,
  },
  {
    path: '/paymentsettings/new',
    loader: () =>
      import(
        'src/view/paymentsettings/form/PaymentsettingsFormPage'
      ),
    permissionRequired: permissions.paymentsettingsCreate,
    exact: true,
  },
  {
    path: '/paymentsettings/importer',
    loader: () =>
      import(
        'src/view/paymentsettings/importer/PaymentsettingsImporterPage'
      ),
    permissionRequired: permissions.paymentsettingsImport,
    exact: true,
  },
  {
    path: '/paymentsettings/:id/edit',
    loader: () =>
      import(
        'src/view/paymentsettings/form/PaymentsettingsFormPage'
      ),
    permissionRequired: permissions.paymentsettingsEdit,
    exact: true,
  },
  {
    path: '/paymentsettings/:id',
    loader: () =>
      import(
        'src/view/paymentsettings/view/PaymentsettingsViewPage'
      ),
    permissionRequired: permissions.paymentsettingsRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
