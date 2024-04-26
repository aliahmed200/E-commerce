import React, { useContext } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../context/cartContext";

export default function Checkout() {
  let { onlinePayment, getLoggedUserCart } = useContext(cartContext);
  async function onlinePay(values) {
    let { data } = await getLoggedUserCart();
    let x = await onlinePayment(data.data._id, values);
    window.location.href = x.data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: onlinePay,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="mx-auto w-75 my-5">
        <h3>Online Payment</h3>
        <label htmlFor="details">Details:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
          type="text"
          id="details"
          className="form-control"
        />
        <label htmlFor="phone">Phone:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          name="phone"
          type="tel "
          id="Phone"
          className="form-control"
        />
        <label htmlFor="city">City:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          type="text"
          id="city"
          className="form-control"
        />
        <button
          onClick={() => {
            onlinePay();
          }}
          type="submit"
          className="btn bg-main text-light my-3"
        >
          Pay
        </button>
      </form>
    </div>
  );
}
