import { createContext, useContext, useEffect, useState } from "react";

const isLoginContext = createContext();

export const IsLoginProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [userData, setUserInfo] = useState("");
  useEffect(() => {
    let user = localStorage.getItem("user");
    let usersInfo = localStorage.getItem("usersInfo");
    if (!user) {
      localStorage.setItem("user", JSON.stringify({}));
    }
    if (!usersInfo) {
      localStorage.setItem("usersInfo", JSON.stringify([]));
    }
  }, []);
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
