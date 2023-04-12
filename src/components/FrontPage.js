import { Link } from "react-router-dom";

export default function FrontPage (props) {
  const { img } = props
  return(
    <main id="FrontPage">
      <h1>Seek & Click</h1>
      <button>Play!</button>
      <img src={img.src} alt={img.name} />
        <p>
          -----&gt; &nbsp;
      <Link to='kids'>
        Kids ver.
      </Link>
        </p>
    </main>
  )
}