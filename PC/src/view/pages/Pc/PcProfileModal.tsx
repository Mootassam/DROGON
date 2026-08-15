import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import kycActions from 'src/modules/kyc/list/kycListActions';
import kycSelectors from 'src/modules/kyc/list/kycListSelectors';
import routesConfig from 'src/view/shared/routes';
import lazyRouter from 'src/view/shared/Lazyroutes';
import LoadingComponent from 'src/view/shared/LoadingComponent';
import { getHistory } from 'src/modules/store';
import { i18n } from '../../../i18n';

interface Props { onClose: () => void; }

interface MenuItem { icon: string; name: string; path: string; requiresKyc?: boolean; lockWhenVerified?: boolean; }

// Menu items mirror the mobile Profile page. KYC verification + Bind Account are
// always available; the rest require a verified KYC (and are disabled for demo).
const ITEMS: MenuItem[] = [
  { icon: 'fas fa-id-card',         name: i18n('pc.kyc'),           path: '/proof', lockWhenVerified: true },
  { icon: 'fas fa-link',            name: i18n('pc.bindAccount'),   path: '/bind-account' },
  { icon: 'fas fa-list',            name: i18n('pc.orders'),        path: '/ordersPage' },
  { icon: 'fas fa-money-bill',      name: i18n('pc.deposit'),       path: '/deposit',     requiresKyc: true },
  { icon: 'fas fa-arrow-up',        name: i18n('pc.withdraw'),      path: '/Withdraw',    requiresKyc: true },
  { icon: 'fas fa-shield-alt',      name: i18n('pc.password'),      path: '/typepassword', requiresKyc: true },
  { icon: 'fas fa-file-alt',        name: i18n('pc.history'),       path: '/history',     requiresKyc: true },
  { icon: 'fas fa-bell',            name: i18n('pc.notifications'), path: '/notification' },
  { icon: 'fas fa-headset',         name: i18n('pc.onlineService'), path: '/online-service' },
  { icon: 'fas fa-building',        name: i18n('pc.aboutUs'),       path: '/about' },
  { icon: 'fas fa-question-circle', name: i18n('pc.help'),          path: '/support' },
];

// Build the in-modal route table from the app's route config so every internal
// navigation (Link / history.push) resolves to a real page INSIDE the modal.
// IMPORTANT: the lazy components are created ONCE here (module scope). Creating
// them inside render would make React.lazy() return new component types every
// render → remount storm (freeze/flash). So precompute them a single time.
const seen = new Set<string>();
const MEM_ROUTE_COMPONENTS: { path: string; Component: React.ComponentType<any> }[] = [
  ...routesConfig.privateRoutes,
  ...routesConfig.screenRoutes,
  ...routesConfig.routeswithoutmobilemenue,
  ...routesConfig.navRoutes,
]
  .filter((r: any) => {
    if (!r?.path || seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  })
  .map((r: any) => ({ path: r.path, Component: lazyRouter({ loader: r.loader }) }));

export default function PcProfileModal({ onClose }: Props) {
  const dispatch    = useDispatch();
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const kycStatus   = useSelector(kycSelectors.selectKycStatus);

  useEffect(() => { dispatch(kycActions.doFetch()); }, [dispatch]);

  // Keep the modal open on success: neutralize global redirects from action
  // creators (getHistory().push) while the modal is mounted. The success toast
  // (toastr) is independent of routing, so it still appears. Restored on unmount.
  useEffect(() => {
    const h: any = getHistory();
    const orig = { push: h.push, replace: h.replace, go: h.go, goBack: h.goBack, goForward: h.goForward };
    const noop = () => {};
    h.push = noop; h.replace = noop; h.go = noop; h.goBack = noop; h.goForward = noop;
    return () => { h.push = orig.push; h.replace = orig.replace; h.go = orig.go; h.goBack = orig.goBack; h.goForward = orig.goForward; };
  }, []);

  const isKycVerified = kycStatus === 'success';
  const isDemo = currentUser?.accountType === 'demo';

  const items = useMemo(() => ITEMS.map((it) => ({
    ...it,
    // requiresKyc items: locked until verified (and always for demo).
    // KYC Verification itself: locked once already verified.
    disabled: it.requiresKyc
      ? (!isKycVerified || isDemo)
      : (it.lockWhenVerified ? isKycVerified : false),
  })), [isKycVerified, isDemo]);

  // ── In-modal memory router ────────────────────────────────────────────────
  // Each menu selection creates a FRESH memory history rooted at that page, so
  // navigation inside the embedded page stays in the modal (no URL change) and
  // a back-arrow returns to it. `base.n` forces a new history even on re-select.
  const firstEnabled = items.find(i => !i.disabled)?.path || '/proof';
  const [base, setBase] = useState<{ path: string; n: number }>({ path: firstEnabled, n: 0 });

  const history = useMemo(
    () => createMemoryHistory({ initialEntries: [base.path] }),
    [base]
  );

  // Track whether we can go back (i.e. user navigated into a sub-page)
  const [canBack, setCanBack] = useState(false);
  useEffect(() => {
    const sync = () => setCanBack((history as any).index > 0);
    sync();
    const unlisten = history.listen(sync);
    return unlisten;
  }, [history]);

  const selectMenu = (it: typeof items[number]) => {
    if (it.disabled) return;
    setBase(prev => ({ path: it.path, n: prev.n + 1 }));
  };

  // If the currently-shown menu page becomes disabled (e.g. KYC just got
  // verified while viewing it), switch to the first enabled item.
  useEffect(() => {
    const current = items.find(i => i.path === base.path);
    if (current?.disabled) {
      const firstOk = items.find(i => !i.disabled);
      if (firstOk) setBase(prev => ({ path: firstOk.path, n: prev.n + 1 }));
    }
  }, [items, base.path]);

  const kycLabel =
    kycStatus === 'success' ? i18n('pc.verified')
    : kycStatus === 'pending' ? i18n('pc.pendingReview')
    : i18n('pc.notVerified');
  const kycColor =
    kycStatus === 'success' ? '#10b981'
    : kycStatus === 'pending' ? '#f59e0b'
    : '#ef4444';

  return (
    <div className="pc-modal-overlay" onClick={onClose}>
      <div className="pc-profile-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pc-modal-x" onClick={onClose}>✕</button>

        {/* Left: small menu sidebar */}
        <aside className="pc-profile-side">
          <div className="pc-profile-user">
            <div className="pc-profile-avatar">
              {(currentUser?.firstName || currentUser?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="pc-profile-email">{currentUser?.email || '—'}</div>
            <div className="pc-kyc-badge" style={{ color: kycColor, borderColor: kycColor }}>
              <i className={kycStatus === 'success' ? 'fas fa-check-circle' : kycStatus === 'pending' ? 'fas fa-clock' : 'fas fa-exclamation-circle'} />
              {kycLabel}
            </div>
          </div>

          {!isKycVerified && (
            <div className="pc-kyc-hint">
              {isDemo
                ? i18n('pc.demoNoFeatures')
                : i18n('pc.completeKyc')}
            </div>
          )}

          <nav className="pc-profile-menu">
            {items.map((it) => (
              <button
                key={it.name}
                className={`${base.path === it.path ? 'active' : ''} ${it.disabled ? 'disabled' : ''}`}
                onClick={() => selectMenu(it)}
                disabled={it.disabled}
              >
                <i className={it.icon} /> <span>{it.name}</span>
                {it.disabled && <i className="fas fa-lock pc-lock" />}
              </button>
            ))}
            <button className="pc-profile-logout" onClick={() => { dispatch(authActions.doSignout()); onClose(); }}>
              <i className="fas fa-sign-out-alt" /> <span>{i18n('pc.logout')}</span>
            </button>
          </nav>
        </aside>

        {/* Right: in-modal router (no URL changes) */}
        <section className={`pc-profile-content ${canBack ? 'pc-nav-sub' : 'pc-nav-root'}`}>
          {/* In-modal back bar shown only on sub-pages */}
          {canBack && (
            <div className="pc-nav-bar">
              <button className="pc-nav-back" onClick={() => history.goBack()}>
                <span className="pc-nav-back-ico">←</span> {i18n('pc.back')}
              </button>
            </div>
          )}

          <Router key={`mem-${base.n}`} history={history as any}>
            <React.Suspense fallback={<LoadingComponent />}>
              <Switch>
                {MEM_ROUTE_COMPONENTS.map((r) => (
                  <Route key={r.path} exact path={r.path} component={r.Component} />
                ))}
              </Switch>
            </React.Suspense>
          </Router>
        </section>
      </div>

      <style>{`
        .pc-profile-modal {
          background: #fff; border-radius: 16px; width: 1000px; max-width: 96vw;
          height: 660px; max-height: 92vh; position: relative; display: flex;
          overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.28);
        }
        .pc-modal-x { position: absolute; top: 12px; right: 16px; border: none; background: none; font-size: 18px; color: #9ca3af; cursor: pointer; z-index: 5; }
        .pc-profile-side {
          width: 250px; flex-shrink: 0; background: #f7f8fa; border-right: 1px solid #e5e7eb;
          padding: 22px 14px; display: flex; flex-direction: column;
        }
        .pc-profile-user { text-align: center; margin-bottom: 14px; }
        .pc-profile-avatar {
          width: 56px; height: 56px; border-radius: 50%; background: #0064FA; color: #fff;
          font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;
        }
        .pc-profile-email { font-size: 12px; color: #6b7280; word-break: break-all; margin-bottom: 8px; }
        .pc-kyc-badge {
          display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700;
          border: 1.5px solid; border-radius: 20px; padding: 3px 12px;
        }
        .pc-kyc-hint {
          background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; font-size: 11px;
          border-radius: 8px; padding: 8px 10px; margin-bottom: 12px; line-height: 1.4; text-align: center;
        }
        .pc-profile-menu { display: flex; flex-direction: column; gap: 4px; flex: 1; overflow-y: auto; }
        .pc-profile-menu button {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: none;
          background: none; border-radius: 8px; cursor: pointer; font-size: 14px; color: #374151;
          text-align: left; transition: background .15s; width: 100%;
        }
        .pc-profile-menu button i:first-child { width: 18px; color: #6b7280; }
        .pc-profile-menu button:hover:not(.disabled):not(.pc-profile-logout) { background: #eef1f5; }
        .pc-profile-menu button.active { background: #e8f0ff; color: #0064FA; font-weight: 600; }
        .pc-profile-menu button.active i:first-child { color: #0064FA; }
        .pc-profile-menu button.disabled { opacity: 0.45; cursor: not-allowed; }
        .pc-lock { margin-left: auto; font-size: 11px; color: #9ca3af; }
        .pc-profile-logout { margin-top: auto; color: #ef4444 !important; }
        .pc-profile-logout i { color: #ef4444 !important; }

        .pc-profile-content { flex: 1; overflow-y: auto; background: #fff; position: relative; }
        .pc-profile-content .container,
        .pc-profile-content .market-detail-container,
        .pc-profile-content .op-page,
        .pc-profile-content .profile-page,
        .pc-profile-content .withdraw-container { max-width: 100% !important; min-height: auto !important; }

        /* In-modal back bar (only on sub-pages) */
        .pc-nav-bar { position: sticky; top: 0; z-index: 6; background: #fff; border-bottom: 1px solid #eef1f5; padding: 8px 14px; }
        .pc-nav-back { display: inline-flex; align-items: center; gap: 8px; border: none; background: #f0f2f5; color: #0064FA; font-weight: 700; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer; }
        .pc-nav-back:hover { background: #e8f0ff; }
        .pc-nav-back-ico { font-size: 16px; line-height: 1; }

        /* Always hide the embedded pages' own back-arrows. Top-level pages are
           switched via the left menu; sub-pages use the single in-modal back bar
           above. This avoids duplicate/confusing back controls. */
        .pc-profile-content .back-arrow,
        .pc-profile-content .header-left,
        .pc-profile-content .back-button,
        .pc-profile-content .nav-back,
        .pc-profile-content .fa-arrow-left { display: none !important; }
      `}</style>
    </div>
  );
}
