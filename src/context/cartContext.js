import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function AddToCart(id) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      },
      {
        headers: headers,
      }
    );
  }
  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    });
  }
  function deleteItem(i) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${i}`, {
      headers: headers,
    });
  }
  function updateCountItem(i, count) {
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${i}`,
      {
        count: count,
      },
      {
        headers: headers,
      }
    );
  }

  function onlinePayment(id, shippingAddress) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`,
      {
        shippingAddress: shippingAddress,
      },
      {
        headers: headers,
      }
    );
  }
  return (
    <cartContext.Provider
      value={{
        onlinePayment,
        AddToCart,
        getLoggedUserCart,
        deleteItem,
        updateCountItem,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
