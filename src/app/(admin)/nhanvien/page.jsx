"use client";
import React from "react";
import useFetch from "@/hook/useFetch";
import Link from "next/link"; // Đảm bảo bạn đã nhập khẩu Link đúng cách
import DeleteNhanVien from "./xoa/index";
import style from "./style.css";

const Admin = () => {
  const { data, loading, refetch } = useFetch("admin"); // Điều chỉnh URL để lấy dữ liệu nhân viên
  if (loading) return <div>Đang tải...</div>;
  if (!data) return <div>Không có dữ liệu</div>;

  return (
    <div>
      <div className="user-management">
        <h1>Quản lý Nhân Viên</h1>
        <Link
          href="/nhanvien/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Thêm nhân viên
        </Link>
        <table className="user-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Nhân Viên</th>
              <th>Email</th>
              <th>Mật khẩu</th>

              <th>Số Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Chức Vụ</th>
              <th>Vai Trò</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((nhanvien, index) => (
              <tr key={nhanvien._id}>
                <td data-label="STT">{index + 1}</td>
                <td data-label="Tên Nhân Viên">{nhanvien.TenNhanVien}</td>
                <td data-label="Email">{nhanvien.Email}</td>
                <td data-label="Email">{nhanvien.Password}</td>

                <td data-label="Số Điện Thoại">
                  {nhanvien.SoDienThoai || "N/A"}
                </td>
                <td data-label="Địa Chỉ">{nhanvien.DiaChi || "N/A"}</td>
                <td data-label="Chức Vụ">{nhanvien.ChucVu || "N/A"}</td>
                <td data-label="Vai Trò">{nhanvien.role}</td>
                <td data-label="Hành Động">
                  <Link
                    href={`/nhanvien/sua/${nhanvien._id}`}
                    className="btn mx-1"
                    style={{ backgroundColor: "#152c5b", color: "white" }}
                  >
                    Sửa
                  </Link>
                  <DeleteNhanVien _id={nhanvien._id} refetch={refetch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
