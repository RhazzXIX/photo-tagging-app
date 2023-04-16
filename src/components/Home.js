import { Link, Outlet } from "react-router-dom"
import ghLogo from '../assets/gitW.png'
import '../styles/Home.css'

export default function Home (props) {
  return(
    <>
    <header>
      <Link to="/" >
        Home
      </Link>
      <Link to='/credits'>
        Credits
      </Link>
    </header>
    <Outlet />
    <footer>
      <a href="https://github.com/RhazzXIX">
        <img src={ghLogo} alt="GitHub" />
      </a>
    </footer>
    </>
  )
}