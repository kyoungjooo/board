import Modal from "../components/modal";
import { useLogin } from "../context/loginContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { isLogin, handleLogin, settingUserLogin, userData } = useLogin();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRouter;
