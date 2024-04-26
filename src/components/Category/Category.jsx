import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function Category() {
  async function getCategory() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, data } = useQuery("category", getCategory);
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="container">
        <div className="category mb-5">
          <h3 className="text-muted">Shop Pouplar Category</h3>
          {!isLoading ? (
            <Slider {...settings}>
              {data?.data.data.map((categ) => {
                return <img src={categ.image} alt={categ.name} height={250} />;
              })}
            </Slider>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
