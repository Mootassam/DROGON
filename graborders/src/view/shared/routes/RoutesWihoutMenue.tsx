
import { Redirect, Route } from "react-router-dom";
import permissionCheker from "../../../modules/auth/permissionChecker";
import ScrollToTop from "src/view/layout/ScrollToTop";

function RoutesWihoutMenue({
  component: Component,
  currentTenant,
  currentUser,
  ...reset
}) {
  return (
    <Route
      {...reset}
      render={(props) => {
        return (
          <>
          <ScrollToTop />
            <Component {...props} />
          </>
        );
      }}
    />
  );
}

export default RoutesWihoutMenue;
