import React from "react";
// import backgroundImage from "./photo.png"; // Adjust the path accordingly
import backgroundImage from "./photoatten.png";
// import backgroundImage from "./background2.png";

const Home = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-black text-4xl font-bold">
        <span>WELCOME TO ATTENDANCE PORTAL</span>
      </div>
    </div>
  );
};

export default Home;
