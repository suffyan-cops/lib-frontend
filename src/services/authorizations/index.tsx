import { getLocalStorageItem } from "../localStorageItem";
import { getRole } from "./roleBaseAuth";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ guard, children }) => {
  const token = getLocalStorageItem("token");
  const role = getRole();

  if (guard?.includes(role) && token) {
    return children;
  }

  if (token) {
    return <Navigate to="/404" replace />;
  }
  return <Navigate to="/" replace />;
};

export default AdminGuard;
