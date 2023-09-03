import "./carousel.css";
const Carousel = () => {
  const imageUrl =
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_520,h_520/rng/md/carousel/production/";
  return (
    <div className="carousel-content">
      <img
        src={imageUrl + "pneknawbadtvceqzwiep"}
        alt="Image 1"
        className="carousel-image"
      />
      <img
        src={imageUrl + "zpkkdkmvlj5cuvqbc50t"}
        alt="Image 2"
        className="carousel-image"
      />
      <img
        src={imageUrl + "lzkjv3sxwwjkzg0vxpvt"}
        alt="Image 3"
        className="carousel-image"
      />
      <img
        src={imageUrl + "tgnvusbs3fnzz7xupeno"}
        alt="Image 4"
        className="carousel-image"
      />
    </div>
  );
};

export default Carousel;
