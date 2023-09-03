import React from "react";
import "./About.css"; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About Us - Food Express</h2>
        <p className="about-description">
          <b>Welcome to Food Express, </b>your go-to destination for convenient
          and delicious food delivery! At Food Express, we are passionate about
          bringing people together through the love of food. We believe that
          good food has the power to nourish, inspire, and create memorable
          moments.
        </p>
        <p>
          Our mission is to revolutionize the way people experience food
          delivery. We strive to provide a seamless and enjoyable dining
          experience by connecting our customers with a wide selection of local
          restaurants and delivering their favorite meals right to their
          doorstep. We aim to make every meal a delightful and convenient
          experience for our customers.
        </p>
        <p>
          <b> Quality and Customer Satisfaction:</b> We are committed to
          delivering high-quality food that exceeds our customers' expectations.
          We carefully select our partner restaurants and work closely with them
          to ensure that every dish is prepared with the finest ingredients and
          meets our strict quality standards.
        </p>
        <p>
          <b>Fast and Reliable Delivery:</b> We understand the value of time,
          and that's why we make it our priority to deliver your order promptly
          and efficiently. Our dedicated team of drivers is equipped with the
          latest technology to ensure that your food arrives fresh and on time,
          every time.
        </p>
        <p>
          <b>Easy Ordering Process: </b>We have designed our app to be
          user-friendly and intuitive, allowing you to browse through a wide
          range of cuisines, customize your order, and track its progress in
          real-time. With just a few taps, you can satisfy your cravings and
          have your favorite meal delivered in no time.
        </p>
        <p>
          <b>Supporting Local Businesses:</b> Food Express is proud to support
          local restaurants and eateries in your community. By partnering with
          these establishments, we contribute to the growth and sustainability
          of local businesses, helping to create a vibrant and diverse culinary
          scene.
        </p>
        <p>
          <b> Your Feedback Matters:</b> We value your feedback and continuously
          strive to improve our services. We welcome your suggestions, comments,
          and ideas on how we can enhance your dining experience with Food
          Express. Together, we can create a platform that truly caters to your
          needs and preferences.
        </p>
        <p>
          Whether you're looking for a quick lunch, a cozy dinner at home, or
          catering for a special event, Food Express is here to serve you.
          Download our app today and discover a world of culinary delights at
          your fingertips. Join our community of food enthusiasts and let us
          bring the flavors of your favorite restaurants directly to your door.
        </p>
        <p>
          <b>
            Thank you for choosing Food Express. We look forward to serving you!
          </b>
        </p>
      </div>
      <div className="about-images">
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/4393667/pexels-photo-4393667.jpeg"
            alt="Image 1"
          />
        </div>
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/4392039/pexels-photo-4392039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image 2"
          />
        </div>
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/4393436/pexels-photo-4393436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image 3"
          />
        </div>
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/4393532/pexels-photo-4393532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Image 4"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
