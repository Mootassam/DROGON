

import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';

const permissions = Permissions.values;

export default [
  // Home


  // Users Section
  {
    id: 'users-header',
    type: 'header',
    label: i18n('dashboard.users'),
    permissionRequired: permissions.userRead,
  },

  {
    id: 'user-management',
    path: '/clients',
    exact: true,
    icon: 'fas fa-users',
    label: i18n('dashboard.clients'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryDestroy,
  },

  {
    id: 'user-management',
    path: '/user',
    exact: true,
    icon: 'fas fa-users',
    label: i18n('dashboard.userManagement'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.userRead,
  },

  {
    id: 'kyc',
    path: '/kyc',
    exact: true,
    icon: 'fas fa-id-card',
    label: i18n('dashboard.kyc'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.userRead,
  },

  {
    id: 'rules',
    path: '/rules',
    exact: true,
    icon: 'fas fa-list',
    label: i18n('dashboard.rules'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.userRead,
  },



  {
    id: 'category',
    path: '/customer-support',
    exact: true,
    icon: 'fas fa-headset',
    label: i18n('dashboard.customersupport'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.userRead,
  },

  // Money Management Section
  {
    id: 'money-header',
    type: 'header',
    label: i18n('dashboard.moneyManagement'),
    permissionRequired: permissions.categoryRead,
  },

  {
    id: 'recharge-orders',
    path: '/deposit',
    exact: true,
    icon: 'fas fa-credit-card',
    label: i18n('dashboard.rechargeOrders'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },

  {
    id: 'withdrawal-management',
    path: '/withdraw',
    exact: true,
    icon: 'fas fa-money-check-alt',
    label: i18n('dashboard.withdrawalManagement'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },
  {
    id: 'balance-editor',
    path: '/assets',
    exact: true,
    icon: 'fas fa-edit',
    label: i18n('dashboard.assets'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },

  // Transaction Management Section
  {
    id: 'transaction-header',
    type: 'header',
    label: i18n('dashboard.transactionManagement'),
    permissionRequired: permissions.categoryRead,
  },

  {
    id: 'spot',
    path: '/spot',
    exact: true,
    icon: 'fas fa-coins',
    label: i18n('dashboard.spot'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },
  {
    id: 'futures',
    path: '/futures',
    exact: true,
    icon: 'fas fa-forward',
    label: i18n('dashboard.futures'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },
  {
    id: 'transaction',
    path: '/transaction',
    exact: true,
    icon: 'fas fa-wallet',
    label: i18n('dashboard.walletMonitor'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },

  // Operation Related Section
  {
    id: 'operation-header',
    type: 'header',
    label: i18n('dashboard.operationRelated'),
    permissionRequired: permissions.categoryRead,
  },


  {
    id: 'user-notifications',
    path: '/notification',
    exact: true,
    icon: 'fas fa-bell', // notification bell icon
    label: i18n('dashboard.notifications'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },
  // {
  //   id: 'user-messages',
  //   path: '/message',
  //   exact: true,
  //   icon: 'fas fa-envelope',
  //   label: i18n('dashboard.userMessages'),
  //   className: 'menu-li side-menue sub-item',
  //   permissionRequired: permissions.categoryRead,
  // },
  {
    id: 'user-messages',
    path: '/companydetail',
    exact: true,
    icon: 'fas fa-info-circle',
    label: i18n('dashboard.aboutUs'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },


  {
    id: 'user-messages',
    path: '/depositMethod',
    exact: true,
    icon: 'fas fa-university',

    label: i18n('dashboard.depositMethod'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },
  {
    id: 'recharge-orders',
    path: '/depositNetwork',
    exact: true,
    icon: 'fas fa-credit-card',
    label: i18n('dashboard.depositNetwork'),
    className: 'menu-li side-menue sub-item',
    permissionRequired: permissions.categoryRead,
  },

  // Mining Financial Management Section
  // {
  //   id: 'mining-header',
  //   type: 'header',
  //   label: i18n('dashboard.miningFinancialManagement'),
  //   permissionRequired: permissions.categoryRead,
  // },
  // {
  //   id: 'mining-project',
  //   path: '/stacking',
  //   exact: true,
  //   icon: 'fas fa-digging',
  //   label: i18n('dashboard.miningProject'),
  //   className: 'menu-li side-menue sub-item',
  //   permissionRequired: permissions.categoryRead,
  // },

  // {
  //   id: 'mining-project',
  //   path: '/stackingPlan',
  //   exact: true,
  //   icon: 'fas fa-digging',
  //   label: i18n('dashboard.plan'),
  //   className: 'menu-li side-menue sub-item',
  //   permissionRequired: permissions.categoryRead,
  // },
].filter(Boolean);