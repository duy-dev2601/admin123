"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "../@/constants";
import { useRouter } from "next/navigation";

const EditEmployee = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [tenNhanVien, setTenNhanVien] = useState(""); // Tên nhân viên
  const [chucVu, setChucVu] = useState(""); // Chức vụ
  const [diaChi, setDiaChi] = useState(""); // Địa chỉ
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Mật khẩu
  const [soDienThoai, setSoDienThoai] = useState(""); // Số điện thoại
  const [role, setRole] = useState("nhanvien"); // Vai trò
  const router = useRouter();

  // Hàm để lấy dữ liệu nhân viên từ API
  const handleShowDataEmployee = async (_id) => {
    try {
      const res = await axios.get(`${HTTP}nhanvien/${_id}`);
      setData(res?.data);
      setTenNhanVien(res?.data?.TenNhanVien);
      setChucVu(res?.data?.ChucVu);
      setDiaChi(res?.data?.DiaChi);
      setEmail(res?.data?.Email);
      setPassword(res?.data?.Password); // Không khuyến khích hiển thị mật khẩu
      setSoDienThoai(res?.data?.SoDienThoai);
      setRole(res?.data?.role);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý cập nhật nhân viên
  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (tenNhanVien.length === 0) {
          alert("Vui lòng nhập tên nhân viên");
          return;
        }
        await axios.put(`${HTTP}nhanvien/${id}`, {
          TenNhanVien: tenNhanVien,
          ChucVu: chucVu,
          DiaChi: diaChi,
          Email: email,
          Password: password, // Chỉ cần cập nhật khi cần thiết
          SoDienThoai: soDienThoai,
          role: role,
        });
        alert("Cập nhật thành công");
        router.push("/nhanvien"); // Điều hướng về trang danh mục sau khi cập nhật
      } catch (error) {
        console.log(error);
        alert("Cập nhật thất bại");
      }
    },
    [
      tenNhanVien,
      chucVu,
      diaChi,
      email,
      password,
      soDienThoai,
      role,
      id,
      router,
    ]
  );

  // Lấy ID từ URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split("/");
      const idFromUrl = urlParts[urlParts.length - 1];
      setId(idFromUrl); // Cập nhật state với ID
    }
  }, []);

  // Lấy dữ liệu nhân viên khi ID thay đổi
  useEffect(() => {
    if (id) {
      handleShowDataEmployee(id);
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <style jsx>{`
        .form-control {
          border: 1px solid #152c5b; /* Đặt màu cho viền input */
        }
        .btn-custom {
          background-color: #152c5b; /* Màu nền cho nút lưu */
          color: white; /* Màu chữ cho nút lưu */
        }
        @media (max-width: 768px) {
          .form-label {
            font-size: 14px; /* Giảm kích thước chữ nhãn cho màn hình nhỏ */
          }
          .btn {
            width: 100%; /* Nút chiếm toàn bộ chiều rộng trên màn hình nhỏ */
            margin-bottom: 10px; /* Giữa các nút có khoảng cách */
          }
        }
      `}</style>
      <h2
        style={{
          color: "#152c5b",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Sửa Thông Tin Nhân Viên
      </h2>
      <Link
        href="/danhmuc"
        className="btn mt-3"
        style={{ backgroundColor: "#152c5b", color: "white" }}
      >
        Quay lại
      </Link>
      <form onSubmit={handleUpdate} className="mt-4">
        <div className="mb-3">
          <label htmlFor="tenNhanVien" className="form-label">
            Tên nhân viên
          </label>
          <input
            type="text"
            className="form-control"
            id="tenNhanVien"
            value={tenNhanVien}
            onChange={(e) => setTenNhanVien(e.target.value)}
            placeholder="Nhập tên nhân viên"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="chucVu" className="form-label">
            Chức vụ
          </label>
          <input
            type="text"
            className="form-control"
            id="chucVu"
            value={chucVu}
            onChange={(e) => setChucVu(e.target.value)}
            placeholder="Nhập chức vụ"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="diaChi" className="form-label">
            Địa chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="diaChi"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            placeholder="Nhập địa chỉ"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="soDienThoai" className="form-label">
            Số điện thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="soDienThoai"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
            placeholder="Nhập số điện thoại"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Vai trò
          </label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="nhanvien">Nhân viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <div className="d-flex flex-column flex-sm-row">
          <button type="submit" className="btn btn-custom">
            Lưu
          </button>
          <Link href="/danhmuc" className="btn btn-secondary mx-2">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
