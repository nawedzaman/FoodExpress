// TODO: Implement search bar in header.
// TODO: Fix css in responsive view
// TODO: Implement sticky header which changes to search bar on scroll(eg.Swiggy)
// TODO: Fix  restaurant details in restaurant menu
// TODO: make footer stick to bottom
// TODO:  make header responsive
import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
// import InfiniteScroll from "react-infinite-scroll-component";
import Carousel from "./Carousel";
import Search from "./Search";
import { swiggy_api_URL } from "../constants";
import useResData from "../hooks/useResData";
import { filterData } from "../utils/helper";
const Body = () => {
  
  const [searchText, setSearchText] = useState("");
  const [allRestaurants] = useResData(swiggy_api_URL);
  const [showCancelIcon, setShowCancelIcon] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
 
  const handleSearch = (text) => {
    setSearchText(text);
    if (text !== "") {
      const filteredData = filterData(text, allRestaurants);
      setFilteredRestaurants(filteredData);
      setShowCancelIcon(true);
    } else {
      setFilteredRestaurants(allRestaurants);
      setShowCancelIcon(false);
    }
  };

  const handleCancel = () => {
    setSearchText("");
    setShowCancelIcon(false);
    setFilteredRestaurants(allRestaurants);
  };
  return allRestaurants === null ? (
    <Shimmer />
  ) : (
    <div className="container">
      <div className="carousel">
        <Carousel />
      </div>
      <div className="main">
        <Search
          handleSearch={handleSearch}
          handleCancel={handleCancel}
          searchText={searchText}
          showCancelIcon={showCancelIcon}
        />
      </div>
      {allRestaurants?.length === 0 ? (
        <div className="no-results">No match found for "{searchText}"</div>
      ) : searchText.length === 0 ? (

          <div id="restaurant-list">
            {allRestaurants?.map((restaurant) => {
              return (
                <RestaurantCard
                  key={ restaurant?.info?.id}
                  {...restaurant?.info}
                />
              );
            })}
          </div>
      ) : (
        <div id="restaurant-list">
          {filteredRestaurants?.map((restaurant) => {
            return (
             <RestaurantCard
                  key={ restaurant?.info?.id}
                  {...restaurant?.info}
                />
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Body;
