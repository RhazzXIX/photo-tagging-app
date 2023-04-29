import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Home from "./components/Home";
import Game from "./components/Game";
import Selection from "./components/Selection";
import Leaderboard from "./components/Leaderboard";

const appRoutes = [
  {
    path: "/photo-tagging-app",
    element: <Home key={"normal"} />,
    children: [
      {
        path: "",
        element: <FrontPage key={"normal"} />,
      },
      {
        path: "game",
        element: <Selection key={"normal"} />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard key={"normal"} />,
      },
      {
        path: "game/:gameVer",
        element: <Game key={"normal"} />,
      },
    ],
  },
  {
    path: "/photo-tagging-app/kids",
    element: <Home key={"kids"} version={"kids"} />,
    children: [
      {
        path: "",
        element: <FrontPage key={"kids"} version={"kids"} />,
      },
      {
        path: "game",
        element: <Selection key={"kids"} version={"kids"} />,
      },
      {
        path: "game/:gameVer",
        element: <Game key={"kids"} version={"kids"} />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard key={"kids}"} version={"kids"} />,
      },
    ],
  },
];

const router = createBrowserRouter(appRoutes);

const App = <RouterProvider router={router} />;

export default App;

export { appRoutes };
