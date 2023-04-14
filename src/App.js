import FrontPage from "./components/FrontPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "photo-tagging-app",
    element: <Home />,
    children: [
      {
        path: "",
        element: <FrontPage key={"normal"} />,
      },
      {
        path: "kids",
        element: <FrontPage key={"kids"} version={"kids"} />,
      },
    ],
  },
]);

const App = <RouterProvider router={router} />;

export default App;
