import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/NavBar";
import Footer from "../ui/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
