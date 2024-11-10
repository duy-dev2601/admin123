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
      setIsAuthenticated(true); 
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
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
