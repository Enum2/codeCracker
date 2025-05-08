import React from "react";
import styles from "./LogoutButton.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/authStore";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
