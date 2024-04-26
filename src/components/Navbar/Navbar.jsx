import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/images/freshcart-logo.svg";
import { userContext } from "../../context/userToken";
export default function Navbar() {
  let { userToken, setToken } = useContext(userContext);
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/register");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Web Site Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken !== null ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="product">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="carts">
                    Carts
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
                <i className="fab fa-linkedin mx-2"></i>
              </li>
              {userToken == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="register"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    signOut
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
