import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import "./Cart.css";

const Cart = () => {
  const cartDetails = useSelector((store) => store?.cart);
  const cartItems = cartDetails?.items
  const restaurant = useSelector((store) => store?.restaurantDetails?.items[0]); //implement logic only one restaurant in cart should be present
  //once added item must remain added
  const navigate = useNavigate();
  console.log(restaurant);
  console.log(cartDetails);
  const dispatch = useDispatch();

  const handlePay = () => {
    //handle payment here
  };
  const handleNameClick = () => {
    let path = `/restaurant/${restaurant?.id}`;
    navigate(path);
  };
  const gohomepage = () => {
    let path = "/";
    navigate(path);
  };
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };
  const deliveryCharges = restaurant?.feeDetails?.totalFee / 100;
  const cartValue = cartDetails?.cartValue+deliveryCharges
  return cartItems.length > 0 ? (
    <>
      <div className="cart-container">
        <div className="cart-name" onClick={() => handleNameClick()}>
          <div className="restaurant-name">
            <span className="span-restaurant">
              <img
                className="restaurant-name-img"
                src={
                  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
                  restaurant?.cloudinaryImageId
                }
                alt=""
              />
              <div className="restaurant-name-title">
                <p>{restaurant?.name}</p>
                <p>
                  <div className="restaurant-name-area">
                    {restaurant?.areaName}
                  </div>
                </p>
              </div>
            </span>
          </div>
        </div>
        <div className="cart-items">
          {cartItems.map((item) => {
            return (
              <div className="cart-items-key" key={item?.id}>
                <div className="veg-nonveg">
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
                <p className="cart-item-name">{item?.name}</p>
                <div className="cart-btn-container">
                  <span
                    className="cart-btn-remove"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </span>
                  <span className="cart-quantity">{item?.quantity}</span>
                  <span
                    className="cart-btn-add"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </span>
                </div>
                <div className="cart-price-container">
                  <div
                    className="cart-item-price-line-through"
                    style={{
                      textDecoration: "line-through",
                      fontSize: "13px",
                      display: "block",
                    }}
                  >
                    ₹{~~((item?.price / 100)*item?.quantity)}
                  </div>
                  <div
                    className="cart-item-price"
                  >
                    ₹{~~((item?.price / 150)*item?.quantity)}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cart-suggestions">
            <svg className="_3iLcN" viewBox="0 0 32 32">
              <path d="M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z"></path>
            </svg>
            <textarea
              className="aeGJF"
              placeholder="Any suggestions? We will pass it on..."
            ></textarea>
          </div>
          <div className="bill-container">
            <h4>Bill Details</h4>
            <p>
              <span>Item Total</span>
              <span> ₹{cartDetails?.totalPrice}</span>
            </p>
            <p>
              <span>Delivery Fee|{restaurant?.sla?.lastMileTravelString}</span>
              <span> ₹{deliveryCharges}</span>
            </p>
            <p>
              <span>Item Discount</span>
              <span>
                -₹{cartDetails?.totalPrice - cartValue}
              </span>
            </p>
            <p>
              <h4>To Pay</h4>
              <span>₹{cartValue}</span>
            </p>
          </div>
        </div>
        <div className="cart-pay-buttons">
          <button onClick={() => handlePay()} className="pay-button">
            Proceed to Pay ₹{cartValue}

          </button>
          {/* <button onClick={() => handleClearCart()} className="clear-button">
            Clear Cart
          </button> */}
        </div>
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
          <button
            className="return-homepage-button"
            onClick={() => gohomepage()}
          >
            SEE RESTAURANTS NEAR YOU
          </button>
          {/* button should return to homepage */}
        </div>
      </div>
    </>
  );
};

export default Cart;
