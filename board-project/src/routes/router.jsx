import { createBrowserRouter } from "react-router-dom";
import Posts from "../pages/home/posts";
import App from "../App";
import NotFound from "../pages/not-found";
import PostDetail from "../pages/post-detail";
import Edit from "../pages/edit";
import Nav from "../components/nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Nav />
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
      {
        path: "post/:postId/edit",
        element: (
          <div>
            <Edit />
          </div>
        ),
      },
    ],
  },
]);

export default router;
