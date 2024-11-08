"use client";

import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const navigate = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLogin = sessionStorage.getItem("role");

    if (!checkLogin) {
      navigate.push("/login");
    } else {
      setIsAuthenticated(true); // Đảm bảo layout chỉ hiển thị khi người dùng đã đăng nhập
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Hoặc có thể hiển thị một màn hình loading nếu cần
  }
  return (
    <>
      <SideBar />
      <div className="content-area">
        <Header />
        <div className="row">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
