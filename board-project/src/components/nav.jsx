import { Link, Outlet } from "react-router-dom";
import { useDarkMode } from "../context/darkModeContext";
import { IoMoon } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";

const Nav = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <div>
        <Link to="/">메인으로</Link>
        {/* 로그인이 돼있으면 유저 프로필 버튼 보여주기 */}
        <button onClick={toggleDarkMode}>
          {!isDarkMode && <IoMoon />}
          {isDarkMode && <MdWbSunny />}
        </button>
        <Link to="login">로그인하기</Link>
      </div>
    </>
  );
};
export default Nav;
