import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice";
import restaurantSlice from "./restaurantSlice";

const store = configureStore({
    reducer:{
        cart:cartSlice,
        restaurantDetails:restaurantSlice,

    }
});

export default store