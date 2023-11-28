import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store)=>store?.cart?.items)
  console.log(cartItems)
  const dispatch = useDispatch();
  const handleClearCart=()=>{
    console.log(cartItems)
    dispatch(clearCart())
  }
  return (
    <div>
      <h2>cart-{cartItems[0]?.name}</h2>
      <button onClick={()=>handleClearCart()}>Clear</button>
    </div>
  );
};

export default Cart;
