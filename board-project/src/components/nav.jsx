import { useNavigate } from "react-router-dom";

import Button from "./button";
import { useLogin } from "../context/loginContext";

const Nav = () => {
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
          {isLogin && (
            <span className="user-name">{`반가워요 ${userName} 님`}</span>
          )}
          {isLogin && <Button text="로그아웃" onClick={handleLogout}></Button>}
          {!isLogin && (
            <Button text="Login" onClick={() => navigate("login")} />
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
