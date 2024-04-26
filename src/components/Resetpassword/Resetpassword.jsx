import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Resetpassword() {
  let navigate = useNavigate();
  const Validation = Yup.object({
    email: Yup.string()
      .required("email is requierd")
      .email("enter availd emial"),
    password: Yup.string()
      .required("email is requierd")
      .email("enter availd emial"),
  });
  async function resetPassword(values) {
    let { data } = await axios.put(
      "https://ecommerce.routemisr.com/api/v1/users/resetPassword",
      values
    );
    if (data.token) {
      navigate("/login");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema: Validation,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="w-75 my-5 m-auto">
        <h1>Reset Password...</h1>
        <label htmlFor="email">Email</label>
        <input
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          id="email"
          className="form-control"
          values={formik.values.email}
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          value={formik.values.newPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          id="newPassword"
          className="form-control"
          values={formik.values.newPassword}
        />
        <button className="btn bg-main text-light my-3">Reset Password</button>
      </form>
    </div>
  );
}
