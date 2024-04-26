import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();

  const [errormessage, seterror] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const Validation = Yup.object({
    name: Yup.string()
      .min(3, "min lenght is 3 characters")
      .max(15, "max lenght is 15 characters")
      .required("name is requierd"),
    email: Yup.string()
      .required("email is requierd")
      .email("enter availd emial"),
    phone: Yup.string()
      .required("phone is requierd")
      .matches(/^01[0125][0-9]{8}$/i, "enter availd phone number"),
    password: Yup.string()
      .required("password is requierd")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "enter availd password"),
    rePassword: Yup.string()
      .required("erPassword is requierd")
      .oneOf([Yup.ref("password")], "not matched"),
  });

  async function signUp(values) {
    setLoading(true);
    let response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        seterror(err.response.data.message);
        setLoading(false);
      });
    if (response.data.message === "success") {
      navigate("/login");
      setLoading(false);
    }
    console.log(response);
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Validation,
    onSubmit: signUp,
  });

  return (
    <div className="w-75 mx-auto my-5">
      <h2 className="text-main fw-bold mb-3">Register Now:</h2>
      {errormessage !== null ? (
        <p className="alert alert-danger">{errormessage}</p>
      ) : (
        ""
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name:</label>
          <input
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="name"
            className="form-control"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="email"
            className="form-control"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="password"
            className="form-control"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword">RePassword:</label>
          <input
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            className="form-control"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone:</label>
          <input
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            className="form-control"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          ) : null}
        </div>

        {isLoading ? (
          <button className="btn bg-main text-light d-block ms-auto">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-light float-end"
          >
            Register
          </button>
        )}
      </form>
    </div>
  );
}
