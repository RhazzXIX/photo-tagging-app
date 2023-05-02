import { Link, Outlet } from "react-router-dom";
import ghLogo from "../assets/gitW.png";
import "../styles/Home.css";

export default function Home({ version }) {
  let homeUrlRef = "/photo-tagging-app";
  if (version === "kids") homeUrlRef = "/photo-tagging-app/kids";
  return (
    <>
      <header>
        <Link to={homeUrlRef}>Home</Link>
        <Link to="leaderboard">Leaderboard</Link>
      </header>
      <Outlet />
      <footer>
        <a href="https://github.com/RhazzXIX">
          <img src={ghLogo} alt="GitHub" />
        </a>
      </footer>
    </>
  );
}
