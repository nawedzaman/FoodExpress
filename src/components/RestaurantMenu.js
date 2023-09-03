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
import vegIcon from "../assests/veg-icon.png"
import nonVegIcon from "../assests/non-veg-icon.png"

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, setRestaurant] = useState(null); // call useState to store the api data in res
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    getRestaurantInfo(); // call getRestaurantInfo function so it fetch api data and set data in restaurant state variable
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();

      // Set restaurant data
      const restaurantData =
        json?.data?.cards
          ?.map((x) => x.card)
          ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
          ?.info || null;
      setRestaurant(restaurantData);

      // Set menu item data
      const menuItemsData =
        json?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
    }
  }
  console.log(menuItems);
  return (
    <>
      {menuItems.map((item) => {
        console.log(item)
        return (
          <>
            <div className="restaurant-details">
            <div className="restaurant-name"> item. </div>
            </div>
            <div className="menu-item-container">
              <div className="menu-item" key={item?.id}>
                <div className="item-veg"> <img src={item?.isVeg === 1 ? vegIcon : nonVegIcon} alt="SVG" /></div>
                <div className="item-name">{item?.name}</div>
                <div className="item-price">₹{item?.price / 100}</div>
                <div className="item-description">{item?.description}</div>
              </div>
              <div className="item-image">
                <img src={ITEM_IMG_CDN_URL + item?.imageId} alt="" />
                <button className="add-button">Add +</button>
              </div>
            </div>
          </>

        );
      })}
    </>
  );
};
export default RestaurantMenu;
