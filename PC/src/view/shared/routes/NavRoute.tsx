
import { Redirect, Route } from "react-router-dom";
import permissionCheker from "../../../modules/auth/permissionChecker";
import LayoutPage from "src/view/layout/LayoutPage";

function NavRoute({
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
          <LayoutPage>
            <Component {...props} />
          </LayoutPage>
        );
      }}
    />
  );
}

export default NavRoute;
