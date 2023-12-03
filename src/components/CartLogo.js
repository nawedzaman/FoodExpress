import { useSelector } from "react-redux";
const CartLogo = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const cartLogo = (
    <svg
      className="_1GTCc _173fq"
      viewBox="-1 0 37 32"
      height="20"
      width="20"
      fill={cartQuantity > 0 ? "#60b246" : "white"}
      style={{ position: "relative", marginRight: "5px", verticalAlign: "middle" }}
    >
      <path
        d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"
        stroke={cartQuantity > 0 ? "none" : "black"}
        strokeWidth="2"
      ></path>

      <text
        style={{
          fill: `${cartQuantity > 0 ? "white" : "black"}`,
          height: "10px",
          font: "bold sans-serif",
          fontSize: `${cartQuantity > 9 ? "20px" : "25px"}`,
          position: " absolute",
        }}
        x={cartQuantity > 9 ? "5" : "10"}
        y="25"
      >
        {cartQuantity}
      </text>
    </svg>
  );
  return <>{cartLogo}</>;
};
export default CartLogo;
