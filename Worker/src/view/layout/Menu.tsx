import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import actions from 'src/modules/layout/layoutActions';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import MenuWrapper from 'src/view/layout/styles/MenuWrapper';
import menus from 'src/view/menus';
import selectors from 'src/modules/auth/authSelectors';

// Define TypeScript interfaces for menu items
interface MenuItem {
  id: string;
  path?: string;
  exact?: boolean;
  icon?: string;
  label: string;
  className?: string;
  permissionRequired: any;
  type?: string;
}

function Menu(props: { url: string }) {
  const dispatch = useDispatch();

  const logoUrl = useSelector(selectors.selectLogoUrl);
  const currentTenant = useSelector(authSelectors.selectCurrentTenant);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const menuVisible = useSelector(layoutSelectors.selectMenuVisible);

  const permissionChecker = new PermissionChecker(
    currentTenant,
    currentUser,
  );

  useLayoutEffect(() => {
    const toggleMenuOnResize = () => {
      window.innerWidth < 576
        ? dispatch(actions.doHideMenu())
        : dispatch(actions.doShowMenu());
    };

    toggleMenuOnResize();

    window.addEventListener('resize', toggleMenuOnResize);

    return () => {
      window.removeEventListener('resize', toggleMenuOnResize);
    };
  }, [dispatch]);

  const selectedKeys = () => {
    const url = props.url;
    const token = url.split('/').slice(0, 2);
    return token.join('/');
  };

  const match = (permission: any) => {
    return permissionChecker.match(permission);
  };

  const lockedForCurrentPlan = (permission: any) => {
    return permissionChecker.lockedForCurrentPlan(permission);
  };

  // 🟩 ADDED: Check if user has agent role
  const hasAgentRole = () => {
    if (!currentUser?.tenants?.length) return false;
    
    const currentTenantUser = currentUser.tenants.find(
      (tenantUser: any) => tenantUser.tenant._id === currentTenant.id
    );
    
    return currentTenantUser?.roles?.includes('admin');
  };

  // Group menu items by section
  const renderMenuItems = () => {
    // 🟩 ADDED: Return empty if user is not agent
    if (!hasAgentRole()) {
      return [];
    }

    const items: JSX.Element[] = [];

    menus
      .filter((menu: MenuItem) => match(menu.permissionRequired))
      .forEach((menu: MenuItem, index: number) => {
        // Render header if it's a new section
        if (menu.type === 'header') {
          items.push(
            <li key={`header-${menu.id}`} className="sidebar-section-header">
              {menu.label}
            </li>
          );
        } else {
          // Render regular menu item
          items.push(
            <li key={index} className={menu.className || "sidebar-menu-item"}>
              <Link to={menu.path || '#'}>
                <i className={`sidebar-icon ${menu.icon}`}></i>
                <span className="sidebar-label">{menu.label}</span>
              </Link>
            </li>
          );
        }
      });

    return items;
  };

  // Render locked menu items
  const renderLockedMenuItems = () => {
    // 🟩 ADDED: Return empty if user is not agent
    if (!hasAgentRole()) {
      return [];
    }

    return menus
      .filter((menu: MenuItem) => lockedForCurrentPlan(menu.permissionRequired))
      .map((menu: MenuItem, index: number) => (
        <li
          key={`locked-${index}`}
          className="sidebar-menu-item locked"
        >
          <div className="sidebar-item-content">
            <i className={`sidebar-icon ${menu.icon}`}></i>
            <span className="sidebar-label">{menu.label}</span>
          </div>
        </li>
      ));
  };

  // 🟩 ADDED: Return null if user is not agent
  if (!hasAgentRole()) {
    return null;
  }

  return (
    <MenuWrapper
      style={{
        display: menuVisible ? 'block' : 'none',
      }}
    >
      <div className="sidebar-container">
        <div className="sidebar-logo">
          <Link to="/">
            {logoUrl ? (
              <img
                src={logoUrl}
                width="164px"
                alt={i18n('app.title')}
                className="logo-image"
              />
            ) : (
              <span className="logo-text">{i18n('app.title')}</span>
            )}
          </Link>
        </div>
        <ul className="sidebar-menu-list">
          {renderMenuItems()}
          {renderLockedMenuItems()}
        </ul>
      </div>
    </MenuWrapper>
  );
}

export default Menu;