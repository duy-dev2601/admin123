"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "../@/constants";
import { useRouter } from "next/navigation";

const EditRoom = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [tenLoai, setTenLoai] = useState(""); // Tên loại phòng
  const [soLuong, setSoLuong] = useState(0); // Số lượng phòng
  const [tienNghi, setTienNghi] = useState(""); // Tiện nghi
  const [giaTien, setGiaTien] = useState(0); // Giá tiền
  const router = useRouter();

  // Hàm để lấy dữ liệu loại phòng từ API
  const handleShowDataCategory = async (_id) => {
    try {
      const res = await axios.get(`${HTTP}loaiphong/${_id}`);
      setData(res?.data);
      setTenLoai(res?.data?.tenLoai);
      setSoLuong(res?.data?.soLuong);
      setTienNghi(res?.data?.tienNghi);
      setGiaTien(res?.data?.giaTien);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý cập nhật loại phòng
  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (tenLoai.length === 0) {
          alert("Vui lòng nhập tên loại phòng");
          return;
        }
        await axios.put(`${HTTP}loaiphong/${id}`, {
          tenLoai,
          soLuong,
          tienNghi,
          giaTien,
        });
        alert("Cập nhật thành công");
        router.push('/danhmuc'); // Điều hướng về trang danh mục sau khi cập nhật
      } catch (error) {
        console.log(error);
        alert("Cập nhật thất bại");
      }
    },
    [tenLoai, soLuong, tienNghi, giaTien, id, router]
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

  // Lấy dữ liệu loại phòng khi ID thay đổi
  useEffect(() => {
    if (id) {
      handleShowDataCategory(id);
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
      <h2 style={{ color: "#152c5b", fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
        Sửa Danh Mục Phòng
      </h2>
      <Link href="/danhmuc" className="btn mt-3" style={{ backgroundColor: '#152c5b', color: 'white' }}>
        Quay lại
      </Link>
      <form onSubmit={handleUpdate} className="mt-4">
        <div className="mb-3">
          <label htmlFor="tenLoai" className="form-label">Loại phòng</label>
          <input
            type="text"
            className="form-control"
            id="tenLoai"
            value={tenLoai}
            onChange={(e) => setTenLoai(e.target.value)}
            placeholder="Nhập loại phòng"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="soLuong" className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            id="soLuong"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            placeholder="Nhập số lượng"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tienNghi" className="form-label">Tiện nghi</label>
          <input
            type="text"
            className="form-control"
            id="tienNghi"
            value={tienNghi}
            onChange={(e) => setTienNghi(e.target.value)}
            placeholder="Nhập tiện nghi"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="giaTien" className="form-label">Giá tiền</label>
          <input
            type="number"
            className="form-control"
            id="giaTien"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            placeholder="Nhập giá tiền"
            required
          />
        </div>
        <div className="d-flex flex-column flex-sm-row">
          <button type="submit" className="btn btn-custom">Lưu</button>
          <Link href="/danhmuc" className="btn btn-secondary mx-2">Hủy</Link>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;