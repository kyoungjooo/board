import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div>
        <Link to="/posts">메인으로</Link>
        <Outlet />
      </div>
    </>
  );
};
export default Nav;