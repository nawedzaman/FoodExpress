import { useEffect, useState } from "react";
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
const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useResMenuData(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
console.log(restaurant)
  return (
    <>
      <div className="restaurant-info">
        <div className="restaurant-name">{restaurant?.name}</div>
        <div className="restaurant-img"><img
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          restaurant?.cloudinaryImageId
        }
        alt=""
      /></div>
      </div>

      {menuItems.map((item) => {
        return (
          <div className="menu-item-container">
            <div className="menu-item" key={item?.id}>
              <div className="item-veg">
                {" "}
                <img src={item?.isVeg === 1 ? vegIcon : nonVegIcon} alt="SVG" />
              </div>
              <div className="item-name">{item?.name}</div>
              <div className="item-price">₹{item?.price / 100}</div>
              <div className="item-description">{item?.description}</div>
            </div>
            <div className="item-image">
              <img src={ITEM_IMG_CDN_URL + item?.imageId} alt="" />
              <button className="add-button">Add +</button>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default RestaurantMenu;
