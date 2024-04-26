import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { RotatingTriangles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../context/cartContext";

export default function Details() {
  let id = useParams();

  let { AddToCart } = useContext(cartContext);

  async function addTocart(id) {
    let { data } = await AddToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.success("Prodect not Add");
    }
  }

  async function getProductDetails(id) {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  let { data, isLoading } = useQuery("productdetails", () =>
    getProductDetails(id.id)
  );

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {!isLoading ? (
        <div className="container">
          <div className="row d-flex align-items-center my-5">
            <div className="col-md-3">
              <Slider {...settings}>
                {data?.data.data.images.map((img) => {
                  return (
                    <img
                      src={img}
                      className="w-100"
                      alt={data?.data.data.title}
                    />
                  );
                })}
              </Slider>
            </div>
            <div className="col-md-8 offset-1">
              <div className="product-description">
                <h2 className="text-main fw-bold">{data?.data.data.title}</h2>
                <p className="textmuted">{data?.data.data.description}</p>
                <p className="textmuted">{data?.data.data.category.name}</p>
                <div className="d-flex justify-content-between py-3">
                  <span className="text-main fw-bold">
                    {data?.data.data.price}EGP
                  </span>
                  <span className="rating-color">
                    <i className="fa-solid fa-star"></i>
                    {data?.data.data.ratingsAverage}
                  </span>
                </div>
                <button
                  onClick={() => {
                    addTocart(data?.data.data._id);
                  }}
                  className="btn bg-main text-light w-100"
                >
                  Add+
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
}
