import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userToken";
export default function Login() {
  let { setToken } = useContext(userContext);
  let navigate = useNavigate();
  const [errormessage, seterror] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const Validation = Yup.object({
    email: Yup.string()
      .required("email is requierd")
      .email("enter availd emial"),
    password: Yup.string()
      .required("password is requierd")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "enter availd password"),
  });
  async function logIn(values) {
    setLoading(true);
    let response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        seterror(err.response.data.message);
        setLoading(false);
      });
    if (response.data.message === "success") {
      navigate("/ ");
      setLoading(false);
      localStorage.setItem("userToken", response.data.token);
      setToken(localStorage.getItem("userToken"));
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Validation,
    onSubmit: logIn,
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
        {isLoading ? (
          <button className="btn bg-main text-light d-block ms-auto">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        ) : (
          <>
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light float-end"
            >
              Login{" "}
            </button>
            <Link to="/register">
              <span className="text-main fw-bold">go to register now...</span>
            </Link>
            <br />
            <Link to="/forgetpassword">
              <span className="text-main fw-bold">Forget Password ....</span>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
