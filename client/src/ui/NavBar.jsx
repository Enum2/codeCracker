import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import profile from "../assets/profile.jpg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authStore";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user)

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          <span className={styles.brandName}>
            <NavLink to={"/profile"}>Codessy</NavLink>
          </span>
        </div>
        <div
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        >
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/calender">Calender</NavLink>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/codingStats">Coding Stats</NavLink>
        </div>
      </div>

      <div className={styles.navIcons}>
        <div className={styles.login}>
          {user ? (
            <LogoutButton/>
          ) : (
            <NavLink to="/login">Login / Signup</NavLink>
          )}
        </div>

        <div
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {user && <img src={profile} alt="User" className={styles.profileImg} />}
      </div>
    </nav>
  );
};

export default Navbar;
