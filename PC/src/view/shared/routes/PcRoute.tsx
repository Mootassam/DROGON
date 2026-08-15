import { Route } from "react-router-dom";

/**
 * PcRoute — renders a desktop page standalone (no mobile layout, no auth gate).
 * Accessible to everyone (visitors included), which is required so non-logged-in
 * visitors can still see the live charts and admin-applied profit/loss animations.
 */
function PcRoute({ component: Component, currentTenant, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} currentUser={currentUser} currentTenant={currentTenant} />
      )}
    />
  );
}

export default PcRoute;
