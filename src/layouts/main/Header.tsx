import { Link } from 'react-router-dom';

const Header = () => (
  <header className="text-3xl font-bold underline text-red-500">
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
