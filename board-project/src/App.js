import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { PostContextProvider } from "./context/postContext";

function App() {
  return (
    <PostContextProvider>
      <RouterProvider router={router} />
    </PostContextProvider>
  );
}

export default App;
