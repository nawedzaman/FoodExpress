import logo from "../assests/logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
import vegIcon from "../assests/veg-icon.png";
import nonVegIcon from "../assests/non-veg-icon.png";
import useOnline from "../hooks/useOnline";
import { useSelector } from "react-redux";

const Title = () => {
  return (
    <a href="/">
      <img className="logo" src={logo} alt="FoodVilla Logo" />
    </a>
  );
};

const Header = () => {
  const isOnline = useOnline();
  const cartItems = useSelector(store=>store.cart.items)
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
            <Link to="/cart">Cart -{cartItems.length}</Link>
          </li>
          <li>
            <Link to="/instamart">Instamart</Link>
          </li>
          <li>
            <div className="item-veg">
            {isOnline ?
              "🟢":"🔴" }
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
