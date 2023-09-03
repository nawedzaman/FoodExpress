
import { useEffect, useState } from "react";

const useResData = (API_URL) => {
  const [allRestaurants, setAllRestaurants] = useState(null);
  useEffect(() => {
    getRestaurants();
  }, []);

  
  async function getRestaurants() {
    try {
      const response = await fetch(
        API_URL
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
      setAllRestaurants(resData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return [allRestaurants]; // return allRestaurants 
};

export default useResData;