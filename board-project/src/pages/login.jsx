import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { useLogin } from "../context/loginContext";
//로그인 버튼을 누르면 로컬에 아이디와 비밀번호를 {userId, userName, password}저장한다.

const Login = () => {
  const { isLogin, handleLogin, userData, settingUserLogin } = useLogin();
  const [login, setLogin] = useState({
    userName: "",
    userId: "",
    password: "",
  });
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  let usersInfo = localStorage.getItem("usersInfo");
  //로그인된 user가 없으면
  useEffect(() => {
    if (!user) {
      localStorage.setItem("user", JSON.stringify({}));
    }
    if (!usersInfo) {
      localStorage.setItem("usersInfo", JSON.stringify([]));
    }
  }, []);

  const resetInput = () => {
    setLogin(() => {
      let copyLogin = { ...login };
      for (const key in copyLogin) {
        copyLogin[key] = "";
      }
      return copyLogin;
    });
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLogin(() => ({ ...login, [name]: value }));
  };
  //로컬스토리지에 로그인한 유저 정보를 저장한다.
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(login));
    handleLogin();
    settingUserLogin(login);
    resetInput();
  };
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="닉네임"
          name="userName"
          value={login.userName}
          onChange={handleUserInput}
        ></input>
        <input
          type="text"
          placeholder="아이디"
          name="userId"
          value={login.userId}
          onChange={handleUserInput}
        ></input>
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={login.password}
          onChange={handleUserInput}
        />
      </div>
      <span className="alert"></span>
      <Button text="로그인" />
    </form>
  );
};
export default Login;
