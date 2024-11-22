import Nav from "../../components/nav";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
export default Home;
