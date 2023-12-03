import logo from "../assests/logo.png";
import { Link } from "react-router-dom";
import useOnline from "../hooks/useOnline";
import CartLogo from "./CartLogo";

const Title = () => {
  return (
    <a href="/">
      <img className="logo" src={logo} alt="FoodVilla Logo" />
    </a>
  );
};

const Header = () => {
  const isOnline = useOnline();
  return (
    <div className="header">
      <Title />
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
            <Link to="/cart"><CartLogo/>Cart</Link>
          </li>
          <li>
            <Link to="/instamart">Instamart</Link>
          </li>
          <li>
            <div className="item-veg">{isOnline ? "🟢" : "🔴"}</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
