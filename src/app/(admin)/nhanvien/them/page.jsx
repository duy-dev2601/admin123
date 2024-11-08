"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";

function ThemNhanVien() {
  const [loading, setLoading] = useState(false);
  const [tenNhanVien, setTenNhanVien] = useState("");
  const [chucVu, setChucVu] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Chỉnh sửa biến password
  const [soDienThoai, setSoDienThoai] = useState("");
  const [role, setRole] = useState("nhanvien"); // Thêm trạng thái cho role
  const router = useRouter();

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !tenNhanVien ||
        !chucVu ||
        !diaChi ||
        !password || // Chỉnh sửa ở đây
        !email ||
        !soDienThoai
      ) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
      }

      await axios.post(`${HTTP}nhanvien`, {
        TenNhanVien: tenNhanVien,
        ChucVu: chucVu,
        DiaChi: diaChi,
        Email: email,
        Password: password, // Chỉnh sửa ở đây
        SoDienThoai: soDienThoai,
        role: role, // Thêm role vào payload
      });

      alert("Thêm nhân viên thành công");
      router.push("/nhanvien");
    } catch (error) {
      console.log(error);
      alert("Thêm nhân viên thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2
          style={{ color: "#152c5b", fontWeight: "bold", marginBottom: "10px" }}
        >
          Thêm Nhân Viên
        </h2>
        <Link
          href="/nhanvien"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          Quay lại
        </Link>
      </div>
      <form onSubmit={handleAddEmployee} className="card p-4 shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="tenNhanVien"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Tên Nhân Viên
          </label>
          <input
            type="text"
            className="form-control"
            id="tenNhanVien"
            value={tenNhanVien}
            onChange={(e) => setTenNhanVien(e.target.value)}
            required
            placeholder="Nhập tên nhân viên..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="chucVu"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Chức Vụ
          </label>
          <input
            type="text"
            className="form-control"
            id="chucVu"
            value={chucVu}
            onChange={(e) => setChucVu(e.target.value)}
            required
            placeholder="Nhập chức vụ..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="diaChi"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Địa Chỉ
          </label>
          <input
            type="text"
            className="form-control"
            id="diaChi"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
            required
            placeholder="Nhập địa chỉ..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password} // Chỉnh sửa ở đây
            onChange={(e) => setPassword(e.target.value)} // Chỉnh sửa ở đây
            required
            placeholder="Nhập mật khẩu..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="soDienThoai"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Số Điện Thoại
          </label>
          <input
            type="text"
            className="form-control"
            id="soDienThoai"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
            required
            placeholder="Nhập số điện thoại..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Vai Trò
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
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "#152c5b",
            color: "white",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Đang thêm..." : "Thêm nhân viên"}
        </button>
      </form>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .card {
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .card:hover {
          transform: scale(1.02);
        }

        .btn {
          border: none;
          transition: background-color 0.3s, transform 0.2s;
        }

        .btn:hover {
          background-color: #0e1e4d;
          transform: translateY(-2px);
        }

        .form-control {
          border-radius: 5px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: border-color 0.2s;
        }

        .form-control:focus {
          border-color: #152c5b;
          box-shadow: 0 0 0 0.2rem rgba(21, 44, 91, 0.25);
        }

        @media (max-width: 576px) {
          .container {
            padding: 10px;
          }

          .card {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default ThemNhanVien;
