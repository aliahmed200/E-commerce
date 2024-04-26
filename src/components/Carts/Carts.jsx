import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
export default function Carts() {
  let [product, setproduct] = useState("");
  let [cartDetails, setCartDetails] = useState([]);
  let { getLoggedUserCart, deleteItem, updateCountItem } =
    useContext(cartContext);

  async function deleteCart(id) {
    const { data } = await deleteItem(id);
    setCartDetails(data?.data.products);
  }

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setproduct(data?.data);
    setCartDetails(data?.data.products);
  }

  async function updateCart(id, count) {
    let { data } = await updateCountItem(id, count);
    setproduct(data?.data);
    setCartDetails(data?.data.products);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 bg-main-light p-5 my-5 rounded d-flex  align-items-center justify-content-center">
            <div className="row flex-row h-100">
              <div className="col-12 flex-shrink-1">
                <h4 className="text-muted fw-bold">Total Price:</h4>
                <h4 className="text-main fw-bold rounded bg-white p-3 text-center my-3 ">
                  {product.totalCartPrice}
                </h4>
                <Link to="/checkout">
                  <button className="btn bg-main text-light">
                    Oline Payment
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-9 p-5 my-4">
            <div className="row">
              {cartDetails.map((p) => {
                return (
                  <>
                    {p.count !== 0 ? (
                      <div className="col-md-4 product text-center">
                        <img
                          src={p.product.imageCover}
                          className="w-100"
                          alt=""
                        />
                        <h3 className="text-muted">
                          {p.product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <p className="text-main fw-bold">
                          {p.product.category.name}
                        </p>
                        <p className="text-main fw-bold">
                          Price :{p.price} EGP
                        </p>
                        <div className="btnremove">
                          <button
                            onClick={() => {
                              deleteCart(p.product._id);
                            }}
                            className="btn btn-outline-danger w-50"
                          >
                            <i className="fa-regular fa-trash-can mx-2"></i>
                            Remove
                          </button>
                        </div>
                        <div className="count d-flex justify-content-evenly my-3 align-items-baseline">
                          <button
                            onClick={() => {
                              updateCart(p.product._id, p.count + 1);
                            }}
                            className="btn btn-outline-danger w-25"
                          >
                            <i className="fa-regular fa-trash-can mx-2"></i>+
                          </button>
                          <p className="text-main">{p.count}</p>
                          <button
                            onClick={() => {
                              updateCart(p.product._id, p.count - 1);
                            }}
                            className="btn btn-outline-danger w-25"
                          >
                            <i className="fa-regular fa-trash-can mx-2"></i>-
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
