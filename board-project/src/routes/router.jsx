import { createBrowserRouter } from "react-router-dom";
import Posts from "../pages/home/posts";
import App from "../App";
import NotFound from "../pages/not-found";
import PostDetail from "../pages/post-detail";
import Edit from "../pages/edit";
import User from "../pages/user";
import Login from "../pages/login";
import Home from "../pages/home/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
    errorElement: (
      <div>
        <NotFound />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <div>
            <Posts />
          </div>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <div>
            <PostDetail />
          </div>
        ),
      },
      /* protectedRouter로 로그인이 된 상태에서만 경로 이동 가능하도록 설정 */
      {
        path: "user",
        element: (
          <div>
            <User />
          </div>
        ),
      },
      {
        path: "login",
        element: (
          <div>
            <Login />
          </div>
        ),
      },
    ],
  },
]);

export default router;
