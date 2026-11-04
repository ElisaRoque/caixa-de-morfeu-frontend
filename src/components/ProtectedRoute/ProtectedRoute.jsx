import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
