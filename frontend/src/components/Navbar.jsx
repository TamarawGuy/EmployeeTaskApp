import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
        <li>
          <Link to="/rankings">Ranking</Link>
        </li>
      </ul>
    </nav>
  );
}
