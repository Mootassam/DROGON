import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthToken from "src/modules/auth/authToken";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ImpersonatePage() {
  const history = useHistory();
  const query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token) {
      // Save token like a normal login
      AuthToken.set(token, true);

      // Redirect to dashboard (or homepage)
      history.replace("/");
    } else {
      history.replace("/auth/signin");
    }
  }, [token, history]);

  return <div>Logging in as user...</div>;
}
