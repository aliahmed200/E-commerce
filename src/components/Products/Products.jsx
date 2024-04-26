import axios from "axios";
import { useContext } from "react";
import { RotatingTriangles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { AddToCart } = useContext(cartContext);

  async function addTocart(id) {
    let { data } = await AddToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.success("Prodect not Add");
    }
  }

  async function getProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("products", getProduct);
  return (
    <>
      {!isLoading ? (
        <div className="container">
          <div className="row">
            {data?.data.data.map((item) => {
              return (
                <>
                  <div className="col-md-3">
                    <div className="text-center product p-5">
                      <Link to={`/details/${item._id}`}>
                        <img
                          src={item.imageCover}
                          className="w-100"
                          alt={item.description}
                        />
                        <div className="text-main">{item.category.name}</div>
                        <div className="text-muted">
                          {item.title.split(" ").slice(0, 2).join(" ")}
                        </div>
                        <div className="d-flex justify-content-around py-3">
                          <span className="text-main fw-bold">
                            {item.price}EGP
                          </span>
                          <span className="rating-color">
                            <i className="fa-solid fa-star"></i>
                            {item.ratingsAverage}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          addTocart(item._id);
                        }}
                        className="btn bg-main text-light w-50"
                      >
                        Add+
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
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
