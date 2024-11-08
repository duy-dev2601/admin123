"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log("Username:", username);
    console.log("Password:", password);

    // Kiểm tra thông tin đăng nhập
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem("role", "admin");
      router.push("/"); // Chuyển hướng đến trang admin
    } else if (username === "staff" && password === "staff") {
      sessionStorage.setItem("role", "staff");
      router.push("/"); // Chuyển hướng đến trang chủ
    } else {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
      });
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 50,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
