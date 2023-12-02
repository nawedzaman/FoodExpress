import logo from "../assests/logo.png";
import { Link } from "react-router-dom";
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
  const cartQuantity=cartItems.reduce((total, item) => total + item.quantity, 0);
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
            <Link to="/cart">Cart -{cartQuantity}</Link>
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
