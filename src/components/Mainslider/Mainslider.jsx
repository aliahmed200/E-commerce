import React from "react";
import Slider from "react-slick";
import image1 from "./../Assets/images/slider-image-1.jpeg";
import image2 from "./../Assets/images/slider-image-2.jpeg";
import image3 from "./../Assets/images/slider-image-3.jpeg";
import image4 from "./../Assets/images/grocery-banner.png";
import image5 from "./../Assets/images/grocery-banner-2.jpeg";
export default function Mainslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container">
        <div className="row mb-5 mt-4 gx-0 ">
          <div className="col-md-10  ">
            <Slider {...settings}>
              <img src={image1} height={400} alt="Image1" />
              <img src={image2} height={400} alt="Image2" />
              <img src={image3} height={400} alt="Image3" />
            </Slider>
          </div>
          <div className="col-md-2">
            <img src={image4} alt="image4" height={200} className="w-100" />
            <img src={image5} alt="image4" height={200} className="w-100" />
          </div>
        </div>
      </div>
    </>
  );
}
