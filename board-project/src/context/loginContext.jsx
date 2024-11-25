import { createContext, useContext, useEffect, useState } from "react";

const isLoginContext = createContext();

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [userData, setUserInfo] = useState("");

  const handleLogin = () => {
    setLogin((prev) => !prev);
  };

  const settingUserLogin = (user) => {
    setUserInfo(user);
  };

  return (
    <isLoginContext.Provider
      value={{ isLogin, handleLogin, settingUserLogin, userData }}
    >
      {children}
    </isLoginContext.Provider>
  );
};
export const useLogin = () => useContext(isLoginContext);
