import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Forgetpassword() {
  let navigate = useNavigate();
  const Validation = Yup.object({
    email: Yup.string()
      .required("email is requierd")
      .email("enter availd emial"),
  });
  async function newPassword(values) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    );
    if (data.statusMsg === "success") {
      document.querySelector(".newpass").classList.add("d-none");
      document.querySelector(".resetpass").classList.remove("d-none");
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: newPassword,
    validationSchema: Validation,
  });

  const reset = Yup.object({
    email: Yup.string()
      .required("Reset Code is requierd")
      .matches(/^[0-9]{0,6}$/i, "enter availd ResetCode"),
  });

  async function resetPassword(values) {
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com//api/v1/auth/verifyResetCode",
      values
    );
    if (data.status === "Success") {
      navigate("/resetpassword");
    }
  }

  let formikReset = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: resetPassword,
    validationSchema: reset,
  });

  return (
    <>
      <form
        className=" newpass my-5 mx-auto w-75"
        onSubmit={formik.handleSubmit}
      >
        <h1>Forgot Password..</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name="email"
          className="form-control"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger">{formik.errors.email}</div>
        ) : null}
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-light float-end my-3"
        >
          Submit{" "}
        </button>
      </form>

      <form
        className=" resetpass my-5 mx-auto w-75 d-none"
        onSubmit={formikReset.handleSubmit}
      >
        <h1>Reset Password..</h1>
        <label htmlFor="resetCode">Email</label>
        <input
          type="text"
          id="resetCode"
          value={formikReset.values.resetCode}
          onBlur={formikReset.handleBlur}
          onChange={formikReset.handleChange}
          name="resetCode"
          className="form-control"
        />
        {formikReset.errors.resetCode && formikReset.touched.resetCode ? (
          <div className="alert alert-danger">
            {formikReset.errors.resetCode}
          </div>
        ) : null}
        <button
          disabled={!(formikReset.isValid && formikReset.dirty)}
          type="submit"
          className="btn bg-main text-light float-end my-3"
        >
          Submit{" "}
        </button>
      </form>
    </>
  );
}
