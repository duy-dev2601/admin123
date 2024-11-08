"use client";

import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StaffLayout = ({ children }) => {
  const navigate = useRouter();
  const checkLogin = sessionStorage.getItem("role");
  useEffect(() => {
    if (!checkLogin) {
      navigate.push("/");
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

export default StaffLayout;
