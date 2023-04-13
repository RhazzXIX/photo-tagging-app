import { Link } from "react-router-dom";

export default function FrontPage(props) {
  return (
    <main id="FrontPage">
      <h1>Seek & Click</h1>
      <button>Play!</button>
      <video width={"360px"} autoPlay loop muted>
        <source src={""} type="video/webm" />
      </video>
      <p>
        -----&gt; &nbsp;
        <Link to="kids">Kids ver.</Link>
      </p>
    </main>
  );
}
