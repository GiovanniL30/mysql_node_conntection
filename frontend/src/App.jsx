import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import Products from "./pages/Products.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";

const App = () => {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
};

export default App;
