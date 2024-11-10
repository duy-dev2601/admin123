"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HTTP } from "@/constants";
import Swal from "sweetalert2"; 
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log("Đang gửi yêu cầu với email:", email);
    try {
      const response = await axios.post(`${HTTP}admin/dangnhap`, {
        Email: email,
        Password: password,
      });

      if (response.data?.token && response.data.admin) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.admin));
        sessionStorage.setItem("role", response.data.admin.role);
        Swal.fire({
          title: "Đăng nhập thành công!",
          icon: "success",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " thất bại",
        });
      }
    } catch (err) {
      console.error("Lỗi:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="heading">Đăng Nhập</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="input"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isClient && error && <div className="error-message">{error}</div>}
          <span className="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </span>
          <input
            className="login-button"
            type="submit"
            value="Đăng Nhập"
            disabled={isLoading}
          />
        </form>
        <div className="social-account-container">
          <span className="title">Hoặc đăng nhập bằng</span>
          <div className="social-accounts">
            <button className="social-button google">
              <svg
                className="svg"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 488 512"
              >
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
            </button>
          </div>
        </div>
        <span className="agreement">
          <a href="#">Tìm hiểu về thỏa thuận người dùng</a>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
