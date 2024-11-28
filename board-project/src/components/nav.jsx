import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/darkModeContext";
import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import Button from "./button";
import { useLogin } from "../context/loginContext";

const Nav = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isLogin, handleLogin, userData } = useLogin();
  const { userName } = userData;
  const handleLogout = () => {
    handleLogin();
  };
  const navigate = useNavigate();
  return (
    <>
      <nav className="header-nav">
        <a className="link-home" href="#none" onClick={() => navigate("/")}>
          HOME
        </a>
        {/* 로그인이 돼있으면 유저 프로필 버튼 보여주기 */}
        <div className="nav-right">
          <button className="darkModeBtn" onClick={toggleDarkMode}>
            {!isDarkMode && <IoMoon />}
            {isDarkMode && <MdWbSunny />}
          </button>
          {isLogin && <Button text="로그아웃" onClick={handleLogout}></Button>}
          {!isLogin && (
            <Button text="Login" onClick={() => navigate("login")} />
          )}
          {isLogin && (
            <span className="user-name">{`반가워요 ${userName} 님`}</span>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
