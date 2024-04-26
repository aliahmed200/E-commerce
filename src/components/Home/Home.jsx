import React from "react";
import Category from "../Category/Category";
import Products from "../Products/Products";
import Mainslider from "../Mainslider/Mainslider";
export default function Home() {
  return (
    <>
      <Mainslider />
      <Category />
      <Products />
    </>
  );
}
