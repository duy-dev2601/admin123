"use client";

import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout = ({ children }) => {
  const navigate = useRouter();
  const checkLogin = sessionStorage.getItem("role");
  useEffect(() => {
    if (!checkLogin) {
      navigate.push("/login");
    }
  });

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
