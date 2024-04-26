import React from "react";
import notfoundimage from "../Assets/images/error.svg";
export default function Notfound() {
  return (
    <div className="d-flex justify-content-center align-items-center bg-danger vh-100">
      <img src={notfoundimage} alt="Not Found Page" width={700} />
    </div>
  );
}
