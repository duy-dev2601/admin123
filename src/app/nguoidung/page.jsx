"use client";
import React from "react";
import useFetch from "@/hook/useFetch";
import style from "./style.css";

const Page = () => {
  const { data, loading, refetch } = useFetch("user");
  if (loading) return <div>Loading......</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <div className="user-management">
        <h1>Quản lý khách hàng</h1>

        <table className="user-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Khách Hàng</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Chức Vụ</th>
              <th>Vai Trò</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((khachhang, index) => (
              <tr key={khachhang._id}>
                <td data-label="STT">{index + 1}</td>
                <td data-label="Tên Khách Hàng">{khachhang.tenkhachhang}</td>
                <td data-label="Email">{khachhang.email}</td>
                <td data-label="Số Điện Thoại">{khachhang.phone || "N/A"}</td>
                <td data-label="Địa Chỉ">{khachhang.address || "N/A"}</td>
                <td data-label="Chức Vụ">{khachhang.position || "N/A"}</td>
                <td data-label="Vai Trò">{khachhang.role}</td>
                <td data-label="Hành Động">
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
