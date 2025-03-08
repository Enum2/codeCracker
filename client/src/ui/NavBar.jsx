import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import profile from "../assets/profile.jpg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          <span className={styles.brandName}>
            {" "}
            <NavLink to={"/profile"}>Codessy</NavLink>
          </span>
        </div>
        <div
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        >
          <NavLink to="/profile" activeClassName={styles.active}>
            Profile
          </NavLink>
          <NavLink to="/calender">calender</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/codingStats">codingStats</NavLink>
        </div>
      </div>
      <div className={styles.navIcons}>
        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <img src={profile} alt="User" className={styles.profileImg} />
      </div>
    </nav>
  );
};

export default Navbar;
