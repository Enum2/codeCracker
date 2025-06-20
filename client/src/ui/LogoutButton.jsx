import React from "react";
import styles from "./LogoutButton.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
