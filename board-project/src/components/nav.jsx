import { Link } from "react-router-dom";
import { useDarkMode } from "../context/darkModeContext";
import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import Button from "./button";
import { useLogin } from "../context/loginContext";

const Nav = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isLogin, handleLogin, userData } = useLogin();
  const { userName, userId, password } = userData;
  const handleLogout = () => {
    handleLogin();
  };

  console.log(isLogin);
  console.log(userName);
  return (
    <>
      <div>
        <Link to="/">메인으로</Link>
        {/* 로그인이 돼있으면 유저 프로필 버튼 보여주기 */}
        <button onClick={toggleDarkMode}>
          {!isDarkMode && <IoMoon />}
          {isDarkMode && <MdWbSunny />}
        </button>
        {isLogin && <Button text="로그아웃" onClick={handleLogout}></Button>}
        {!isLogin && <Link to="login">로그인</Link>}

        <span>{userName}</span>
      </div>
    </>
  );
};
export default Nav;
