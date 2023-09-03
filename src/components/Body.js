// TODO: Initialize git
// TODO: Implement search bar in header.
// TODO: Fix css in responsive view
// TODO: Implement sticky header which changes to search bar on scroll(eg.Swiggy)
// TODO: Implement restaurant name in menu 
import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import InfiniteScroll from "react-infinite-scroll-component";
import Carousel from "./Carousel";
import Search from "./Search";
const Body = () => {
  const [responseData, setResponseData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState(null);
  const [showCancelIcon, setShowCancelIcon] = useState(false);

  const filterData = (searchText, responseData) => {
    const filterData = responseData.filter((item) => {
      console.log(item)
      const restaurantName = item?.info?.name.toLowerCase();
      return restaurantName.includes(searchText.toLowerCase());
    });

    return filterData;
  };
  const handleSearch = (text) => {
    setSearchText(text);
    if (text !== "") {
      const filteredData = filterData(text, originalData);
      setResponseData(filteredData);
      setShowCancelIcon(true);
    } else {
      setResponseData(originalData);
      setShowCancelIcon(false);
    }
  };

  const handleCancel = () => {
    setSearchText("");
    setShowCancelIcon(false);
    setResponseData(originalData);
  };

  useEffect(() => {
    fetchData(); //api call
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.888179812534588&lng=77.59581348084252&offset=1&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING"
      );
      const data = await response.json();
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {

          
          let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(data);
      setResponseData(resData);
      setOriginalData(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchMoreData() {
    try {
      const payload = {
        lat: "12.888622796441359",
        lng: "77.60492105036975",
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



  return responseData === null ? (
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
      {responseData?.length === 0 ? (
        <div className="no-results">No match found for "{searchText}"</div>
      ) : searchText.length === 0 ? (
        <InfiniteScroll
          dataLength={responseData.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div id="restaurant-list">
            {responseData?.map((restaurant) => {
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
          {responseData?.map((restaurant) => {
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
