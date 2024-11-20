import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import { useEffect, useState } from "react";
//로그인 버튼을 누르면 로컬에 아이디와 비밀번호를 {userId, userName, password}저장한다.

const Login = () => {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();
  let users = localStorage.getItem("users");
  useEffect(() => {
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    users = JSON.parse(users);
    for (const user of users) {
      //입력한 정보가 로컬스토리지 저장된 정보와 모두 일치하다면 로그인!
      if (
        login.userName === user.userName &&
        login.userId === user.userId &&
        login.password === user.password
      ) {
        resetInput();
        return navigate("/");
      }
      //아이디 혹은 닉네임이 기존에 있는데 패스워드가 틀렸을 때
      if (
        login.userName === user.userName ||
        login.userId === user.userId ||
        login.password !== user.password
      ) {
        return console.log("로그인 정보를 다시 확인해주세요.");
      }
    }
    //새로 등록되는 user은 로그인
    updateLocalStorage(users);
    resetInput();
    navigate("/");
  };
  //기존의 아이디들과 비교해서 새로운 아이디면 새로운 아이디가 현재 로그인
  //기존의 아이디들과 모두 같으면 해당 아이디가 현재 로그인한 아이디
  const currentLoginUser = () => {};

  const resetInput = () => {
    setLogin(() => {
      let copyLogin = { ...login };
      for (const key in copyLogin) {
        copyLogin[key] = "";
      }
      return copyLogin;
    });
  };
  const updateLocalStorage = (updatedUser) => {
    updatedUser.push(login);
    localStorage.setItem("users", JSON.stringify(updatedUser));
  };
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLogin(() => ({ ...login, [name]: value }));
  };
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
