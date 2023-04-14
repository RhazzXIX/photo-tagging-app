import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Home from "./components/Home";
import Game from "./components/Game";

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
      {
        path: "game",
        element: <Game key={"normal"} />,
      },
      {
        path: "kids/game",
        element: <Game key={"kids"} version={"kids"} />,
      },
    ],
  },
]);

const App = <RouterProvider router={router} />;

export default App;
