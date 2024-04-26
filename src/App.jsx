import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import Register from "./components/Register/Register.jsx";
import Forgetpassword from "./components/Forgetpassword/Forgetpassword.jsx";
import Login from "./components/Login/Login.jsx";
import Carts from "./components/Carts/Carts.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import UserContextProvider from "./context/userToken.js";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter.jsx";
import Details from "./components/Details/Details.jsx";
import Category from "./components/Category/Category.jsx";
import Mainslider from "./components/Mainslider/Mainslider.jsx";
import Resetpassword from "./components/Resetpassword/Resetpassword.jsx";
import CartContextProvider from "./context/cartContext.js";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/checkout/checkout.jsx";

const Router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "home",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRouter>
            <Products />
          </ProtectedRouter>
        ),
      },
      {
        path: "carts",
        element: (
          <ProtectedRouter>
            <Carts />
          </ProtectedRouter>
        ),
      },
      {
        path: "mainslider",
        element: (
          <ProtectedRouter>
            <Mainslider />
          </ProtectedRouter>
        ),
      },
      { path: "forgetpassword", element: <Forgetpassword /> },
      { path: "resetpassword", element: <Resetpassword /> },
      {
        path: "category",
        element: (
          <ProtectedRouter>
            <Category />
          </ProtectedRouter>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRouter>
            <Checkout />
          </ProtectedRouter>
        ),
      },
      {
        path: "details/:id",
        element: (
          <ProtectedRouter>
            <Details />
          </ProtectedRouter>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={Router}></RouterProvider>
        </UserContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
