import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import permissionCheker from "../../../modules/auth/permissionChecker";
import kycSelectors from "src/modules/kyc/list/kycListSelectors";
import LayoutPage from "src/view/layout/LayoutPage";

function PrivateRoute({ component: Component, currentTenant, currentUser, permissionRequired, requiresKyc, ...rest }) {
  const location = useLocation();
  const kycStatus = useSelector(kycSelectors.selectKycStatus);

  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new permissionCheker(currentTenant, currentUser);
        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{ pathname: "/auth/signin", state: { from: location } }}
            />
          );
        }

        if (permissionChecker.isEmptyPermissions) {
          return (
            <Redirect to="/auth/empty-permissions" />
          );
        }

        if (!permissionChecker.match(permissionRequired)) {
          return <Redirect to="/403" />;
        }

        // Skip KYC requirement for demo accounts
        if (requiresKyc && kycStatus !== 'success' && currentUser?.accountType !== 'demo') {
          return (
            <Redirect
              to={{
                pathname: "/kyc-status",
                state: {
                  from: location,
                  requiredKyc: true,
                  currentStatus: kycStatus,
                },
              }}
            />
          );
        }

        return (
          <LayoutPage>
            <Component {...props} />
          </LayoutPage>
        );
      }}
    />
  );
}

export default PrivateRoute;
