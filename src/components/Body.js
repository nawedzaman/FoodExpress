// TODO: Implement search bar in header.
// TODO: Fix css in responsive view
// TODO: Implement sticky header which changes to search bar on scroll(eg.Swiggy)
// TODO: Fix  restaurant details in restaurant menu
// TODO: make footer stick to bottom
// TODO:  make header responsive
import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
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



  async function fetchMoreData() {
    try {
      const payload = {
        lat: "12.1588",
        lng: "76.7324",
        nextOffset: "COVCELQ4KICAgu6yrYaoGzCnEzgB",
        widgetOffset: {
          NewListingView_Topical_Fullbleed: "",
          NewListingView_category_bar_chicletranking_TwoRows: "",
          NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
          Restaurant_Group_WebView_PB_Theme: "",
          Restaurant_Group_WebView_SEO_PB_Theme: "",
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "40",
          inlineFacetFilter: "",
          restaurantCountWidget: ""
        },
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage"
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: "e9UvJAKbj0Sm-McrozZpL-Yl28MuNTm9m22yCydo"
      };
const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/update",
        {
          method: "POST",
          body: JSON.stringify(payload)
        }
      );
  
      const data = await response.json();
      console.log(JSON.stringify(data));
      // Process the response data as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


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
        <InfiniteScroll
          dataLength={allRestaurants?.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div id="restaurant-list">
            {allRestaurants?.map((restaurant) => {
              // console.log(restaurant?.info+"here")
              return (
                <RestaurantCard
                  key={ restaurant?.info?.id}
                  {...restaurant?.info}
                />
              );
            })}
          </div>
        </InfiniteScroll>
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
