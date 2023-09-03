import logo from "../assests/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
const Title = () => {
  return (
    <a href="/">
      <img className="logo" src={logo} alt="FoodVilla Logo" />
    </a>
  );
};

const Header = () => {
  return (
    <div className="header">
      <Title />
      <Search />
      <div id="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
