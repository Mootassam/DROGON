import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';
import useNotifications from 'src/view/shared/notificatoin/useNotifications';
import userListActions from 'src/modules/user/list/userListActions';
import UserService from 'src/modules/user/userService';
import userListSelectors from 'src/modules/user/list/userListSelectors';

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  useNotifications(currentUser.id)
  const kyccount = useSelector(userListSelectors.selectKyc);
  const futurecount = useSelector(
    userListSelectors.selectFuture,
  );
  const depositcount = useSelector(
    userListSelectors.selectDeposit,
  );
  const withdrawcount = useSelector(
    userListSelectors.selectWithdraw,
  );

  // Listen to notifications via Socket.IO
  // useNotifications(currentUser.id, true);

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () =>
    getHistory().push('/clients');
  const doNavigateToAuditLog = () =>
    getHistory().push('/audit-logs');
  const doNavigateToSettings = () =>
    getHistory().push('/settings');
  const doNavigateToPasswordChange = () =>
    getHistory().push('/password-change');
  const doNavigateToTenants = () =>
    getHistory().push('/tenant');

  const list = async () => {
    dispatch(userListActions.count());
  };

  useEffect(() => {
    list();
    return () => {};
  }, []);
  const handleClickSection = (path) => {
    getHistory().push(`/${path}`);
  };

  return (
    <HeaderWrapper className="navbar sticky-top navbar-light bg-white border-bottom">
      <button
        type="button"
        onClick={doToggleMenu}
        className="menu-toggle-button"
      >
        <i className="fas fa-bars" />
      </button>

      <div className="right__section">
        <div className="quick_actions">
          <div
            className="action"
            onClick={() => handleClickSection('kyc')}
          >
            <span>
              KYC <b>({kyccount})</b>
            </span>
          </div>
          <div
            className="action"
            onClick={() => handleClickSection('deposit')}
          >
            <span>
              Depoist <b>({depositcount})</b>
            </span>
          </div>
          <div
            className="action"
            onClick={() => handleClickSection('withdraw')}
          >
            <span>
              Withdraw Funds <b>({withdrawcount})</b>
            </span>
          </div>
          <div
            className="action"
            onClick={() => handleClickSection('futures')}
          >
            <span>
              Futures <b>({futurecount})</b>
            </span>
          </div>
        </div>

        <span className="i18n-select">
          <I18nSelect />
        </span>

        <div className="dropdown">
          <span
            className="user-dropdown"
            data-toggle="dropdown"
          >
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar
                  size="small"
                  src={userAvatar || undefined}
                  alt="avatar"
                />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                  <span className="user-dropdown-text-tenant">
                    {currentTenant && currentTenant.name}
                  </span>
                )}
              </span>
            </div>
          </span>
          <div className="dropdown-menu dropdown-menu-right">
            <button
              onClick={doNavigateToProfile}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-user" />{' '}
              {i18n('dashboard.clients')}
            </button>
            <button
              onClick={doNavigateToPasswordChange}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-lock" />{' '}
              {i18n('auth.passwordChange.title')}
            </button>
            {['multi', 'multi-with-subdomain'].includes(
              config.tenantMode,
            ) && (
              <button
                onClick={doNavigateToTenants}
                className="dropdown-item"
                type="button"
              >
                <i className="fas fa-th-large" />{' '}
                {i18n('auth.tenants')}
              </button>
            )}
            <button
              onClick={doNavigateToAuditLog}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-book" />{' '}
              {i18n('auditLog.menu')}
            </button>
            <button
              onClick={doSignout}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-sign-out-alt" />{' '}
              {i18n('auth.signout')}
            </button>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default Header;
