import { createBrowserRouter } from "react-router-dom";
import Posts from "../pages/home/posts";
import App from "../App";
import NotFound from "../pages/home/not-found";
import PostDetail from "../pages/postDetail";
import User from "../pages/user";
import Login from "../pages/login";
import Home from "../pages/home/home";
import AddPosting from "../pages/addPosting";
import ProtectedRouter from "../pages/protectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: (
      <div>
        <NotFound />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
      {
        path: "post/posting",
        element: (
          <div>
            <ProtectedRouter>
              <AddPosting />
            </ProtectedRouter>
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
        element: <Login />,
      },
    ],
  },
]);

export default router;
