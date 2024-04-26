import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { userContext } from "../../context/userToken.js";
import { Offline } from "react-detect-offline";

export default function Layout() {
  let { setToken } = useContext(userContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  return (
    <>
      <Navbar />
      <div>
        <Offline>
          <div className="network">
            Only shown offline (surprise!)
            <i className="fas fa-wifi bg-light p-3 border rounded"></i>
          </div>
        </Offline>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
