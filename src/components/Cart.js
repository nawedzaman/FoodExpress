import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((store) => store?.cart?.items);
  const restaurant = useSelector((store) => store?.restaurantDetails?.items[0]); //implement logic only one restaurant in cart should be present
  //once added item must remain added
  const navigate = useNavigate();
  console.log(restaurant);
  console.log(cartItems);
  const dispatch = useDispatch();
  const billCalculations = () => {
    let total = 0;
    cartItems.map((item) => {
      total = total + (item?.price*item?.quantity);
    });
    return total;
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleNameClick=()=>{
    let path = `/restaurant/${restaurant?.id}`;
    navigate(path)
  }
  const gohomepage=()=>{
    let path='/';
    navigate(path)
  }
  return cartItems.length > 0 ? (
    <>
      <div className="cart-container">
        <div className="cart-name" onClick={()=>handleNameClick()}>
          <div className="restaurant-name">
            <span >
              <img
                className="restaurant-name-img"
                src={
                  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
                  restaurant?.cloudinaryImageId
                }
                alt=""
              />
              <div className="restaurant-name-title">{restaurant?.name}</div>
              <div className="restaurant-name-area">{restaurant?.areaName}</div>
            </span>
          </div>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div  className="cart-items-key"  key={item?.id}> 
                <h2>{item?.name}</h2>
                <div className="_1mx0r">
                  <span
                    className="_2OlEg"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "10px",
                      display: " block",
                    }}
                  >
                    ₹{~~(item?.price / 100)}
                  </span>
                  <span className="_2W2U4">₹{~~(item?.price / 150)}X{item?.quantity}</span>
                </div>
              </div>
            );
          })}
          <div className="cart-suggestions">
            <textarea class="aeGJF"></textarea>
          </div>
          <div className="bill-container">
            <h4>Bill Details</h4>
            <p>
              <span>Item Total</span>
              <span> ₹{~~(billCalculations() / 100)}</span>
            </p>
            <p>
              <span>Delivery Fee|{restaurant?.sla?.lastMileTravelString}</span>
              <span> ₹{restaurant?.feeDetails?.totalFee / 100}</span>
            </p>
            <p>
              <span>Item Discount</span>
              <span>
                -₹{~~(billCalculations() / 100 - billCalculations() / 150)}
              </span>
            </p>
            <p>
              <span>To Pay</span>
              <span>₹{~~(billCalculations() / 150)}</span>
            </p>
          </div>
        </div>

        <button onClick={() => handleClearCart()}>Clear</button>
      </div>
    </>
  ) : (
    <>
      <div className="empty-cart">
        <div className="empty-cart-img"></div>
        <div className="empty-cart-text">
          <p className="empty-cart-text-line-one">Your Cart Is Empty</p>
          <p className="empty-cart-text-line-two">
            You can go to home page to view more restaurants
          </p>
          <button className="return-homepage-button" onClick={()=>gohomepage()}>
            SEE RESTAURANTS NEAR YOU
          </button>
          {/* button should return to homepage */}
        </div>
      </div>
    </>
  );
};

export default Cart;
