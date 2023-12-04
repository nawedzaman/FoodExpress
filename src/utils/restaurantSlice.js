import {createSlice} from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
    name:'restaurant',
    initialState:{
        items:[],
    },
    reducers:{
        addRestaurant:(state,action)=>{
            state.items.push(action.payload)
        },
       
        removeRestaurant:(state)=>{
            state.items = [];
        }
    },
});
export const{addRestaurant,removeRestaurant}=restaurantSlice.actions;

export default restaurantSlice.reducer;