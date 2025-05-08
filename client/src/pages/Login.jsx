import React, { useState } from "react";
import styles from "./Login.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Sign up mutation
  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/v1/profile/signup",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.error);
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://localhost:5000/api/v1/profile/login",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message)
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/")
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation.mutate(formData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.formBox} ${isSignup ? "" : styles.loginActive}`}
      >
        {/* Sign Up Form */}
        <div className={styles.signupForm}>
          <form onSubmit={handleSignup}>
            <h2>Sign up</h2>
            <input
              type="text"
              name="username"
              placeholder="User name"
              required
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
            <button type="submit" disabled={signupMutation.isLoading}>
              {signupMutation.isLoading ? "Signing up..." : "Sign up"}
            </button>
            <div className={styles.googleBtn}>
              <img
                className={styles.googleIcon}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span>Login with Google</span>
            </div>
          </form>
          <div className={styles.toggle} onClick={() => setIsSignup(false)}>
            <p>Login</p>
          </div>
        </div>

        {/* Login Form */}
        <div className={styles.loginForm}>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="username"
              name="username"
              placeholder="Username"
              required
              onChange={handleLoginInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleLoginInputChange}
            />
            <button type="submit" disabled={loginMutation.isLoading}>
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
            <div className={styles.googleBtn}>
              <img
                className={styles.googleIcon}
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
              />
              <span>Login with Google</span>
            </div>
          </form>
          <div className={styles.toggle} onClick={() => setIsSignup(true)}>
            <p>Sign up</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
