import { useParams } from "react-router-dom";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../constants";
import "./RestaurantMenu.css";
import vegIcon from "../assests/veg-icon.png";
import nonVegIcon from "../assests/non-veg-icon.png";
import useResMenuData from "../hooks/useResMenuData";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { addRestaurant, removeRestaurant } from "../utils/restaurantSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shimmer from "./Shimmer";
const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const dispatch = useDispatch();
  const cartDetails = useSelector((store) => store?.cart);
  const cartItems = cartDetails?.items;

  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/cart`;
    navigate(path);
  };

  const handleAddItem = (item) => {
    dispatch(addRestaurant(restaurant));
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return restaurant === null ? (
    <Shimmer />
  ) : (
    <>
      <div className="restaurant-info">
        <div className="restaurant-nameBanner">
          <div className="restaurant-name">{restaurant?.name}</div>
          <div className="restaurant-cuisines">
            {restaurant?.cuisines.join(",")}
          </div>
          <div className="restaurant-areaName">{restaurant?.areaName}</div>
        </div>
        <div className="restaurant-rating">
          <span className="restaurant-starIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 20"
              width="20"
              height="25"
              fill="#4CAF50"
            >
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </span>
          <span className="restaurant-avgRating">{restaurant?.avgRating}</span>
          <div className="restaurant-totalRatingsString">
            {restaurant?.totalRatingsString}
          </div>
        </div>
      </div>
      <div className="restaurant-line">
        <span className="restaurant-slaString">
          <svg
            className="RestaurantTime-icon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle
              r="8.35"
              transform="matrix(-1 0 0 1 9 9)"
              stroke="#3E4152"
              strokeWidth="1.3"
            ></circle>
            <path
              d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
              fill="#3E4152"
            ></path>
          </svg>
          {restaurant?.sla.slaString}
        </span>
        <span className="restaurant-costForTwoMessage">
          <svg
            className="RestaurantCost-icon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <circle
              cx="9"
              cy="9"
              r="8.25"
              stroke="#3E4152"
              strokeWidth="1.5"
            ></circle>
            <path
              d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
              fill="#3E4152"
            ></path>
          </svg>
          {restaurant?.costForTwoMessage}
        </span>
      </div>

      {menuItems.map((item) => {
        console.log(item);
        const quantity =
          cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0;
        const isActive = quantity !== 0;
        const price =
          item && item?.price
            ? Math.floor(item?.price / 100)
            : item && item?.defaultPrice
            ? Math.floor(item?.defaultPrice / 100)
            : 0;
        return (
          <div className="menu-item-container" key={item?.id}>
            <div className="menu-item">
              <div className="item-veg">
                  {item?.isVeg === 1 ? (
                    <svg
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 15"
                    >
                      <path
                        x="10"
                        y="10"
                        width="80"
                        height="80"
                        stroke="green"
                        fill="transparent"
                        stroke-width="0.6"
                        d="M1.5 1.5H13.5V13.5H1.5V1.5z"
                      />
                      <path
                        cx="50"
                        cy="50"
                        r="25"
                        fill="green"
                        d="M11.25 7.5A3.75 3.75 0 0 1 7.5 11.25A3.75 3.75 0 0 1 3.75 7.5A3.75 3.75 0 0 1 11.25 7.5z"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 15"
                    >
                      <path
                        x="10"
                        y="10"
                        width="70"
                        height="70"
                        stroke="red"
                        fill="transparent"
                        stroke-width="0.44999999999999996"
                        d="M1.5 1.5H12V12H1.5V1.5z"
                      />
                      <path
                        points="45,20 70,60 20,60"
                        fill="red"
                        d="M6.75 3L10.5 9L3 9Z"
                      />
                    </svg>
                  )}
              </div>
              <div className="item-name">{item?.name}</div>
              <div className="item-price">₹{price}</div>
              <div className="item-description">{item?.description}</div>
            </div>
            <div className="item-image">
              <img src={ITEM_IMG_CDN_URL + item?.imageId} alt="" />
              {isActive ? (
                <div className="btn-container">
                  <span
                    className="btn-remove"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </span>
                  <span className="quantity">{quantity}</span>
                  <span className="btn-add" onClick={() => handleAddItem(item)}>
                    +
                  </span>
                </div>
              ) : (
                <div className="add-button" onClick={() => handleAddItem(item)}>
                  Add +
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div
        className="restaurant-footer"
        style={{
          transform:
            cartDetails?.totalItems > 0
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 100%, 0)",
          transition: "transform 0.25s ease",
          zIndex:cartDetails?.totalItems>0?"1":"-3"
        }}
        onClick={routeChange}
      >
        <span className="cart-quantity-price">
          {cartDetails?.totalItems} Items |{" "}
        </span>
        <span className="cart-quantity-price"> ₹{cartDetails?.cartValue} </span>
        <span className="cart-route">
          <span className="cart-text">View Cart </span>
          <span className="cart-logo">
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M216,36H40A20.02229,20.02229,0,0,0,20,56V200a20.02229,20.02229,0,0,0,20,20H216a20.02229,20.02229,0,0,0,20-20V56A20.02229,20.02229,0,0,0,216,36Zm-4,24V76H44V60ZM44,196V100H212v96Zm136-72a52,52,0,0,1-104,0,12,12,0,0,1,24,0,28,28,0,0,0,56,0,12,12,0,0,1,24,0Z"
                fill="#ffffff"
                stroke="#ffffff"
                stroke-width="4"
              />
            </svg>
          </span>
        </span>
      </div>
    </>
  );
};
export default RestaurantMenu;
