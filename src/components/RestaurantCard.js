import { useNavigate } from "react-router-dom";
const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  areaName,
  sla,
  lastMileTravelString,
  costForTwo,
  avgRating,
  id,
}) => {

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/restaurant/${id}`;
    navigate(path);
  };
  return (
    <div id="card" onClick={routeChange}>
      <img
        src={
          "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
          cloudinaryImageId
        }
        alt=""
      />
      <h1>{name}</h1>
      <h2>{cuisines.join(",  ")}</h2>
      <h5>{areaName}</h5>
      <span>
        <h4
          style={
            avgRating < 4
              ? {
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "5px",
                  width: "45px",
                }
              : avgRating === "--"
              ? { backgroundColor: "white", color: "white" }
              : {
                  backgroundColor: "lightGreen",
                  color: "white",
                  borderRadius: "5px",
                  width: "45px",
                }
          }
        >
          <i className="fa-solid fa-star"></i>
          {avgRating}
        </h4>
        <h4>•</h4>
        <h4>{sla?.lastMileTravelString ?? '2.0 km'}</h4>
        <h4>•</h4>
        <h4>{costForTwo ?? '₹200 for two'}</h4>
      </span>
    </div>
  );
};
export default RestaurantCard;
