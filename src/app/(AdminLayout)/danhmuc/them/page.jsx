"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";

function ThemLoaiPhong() {
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [soLuong, setSoLuong] = useState(10); 
  const [tienNghi, setTienNghi] = useState("");
  const [giaTien, setGiaTien] = useState(500000); 
  const router = useRouter();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (roomType.length === 0) {
        alert("Vui lòng nhập tên loại phòng");
        return;
      }

      await axios.post(`${HTTP}loaiphong`, {
        tenLoai: roomType,
        soLuong: soLuong,
        tienNghi: tienNghi,
        giaTien: giaTien,
      });

      alert("Thêm thành công");
      router.push('/danhmuc');
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 style={{ color: "#152c5b", fontWeight: 'bold', marginBottom: '10px' }}>
          Thêm Danh Mục Phòng
        </h2>
        <Link href="/danhmuc" className="btn mt-3" style={{ backgroundColor: '#152c5b', color: 'white' }}>
          Quay lại
        </Link>
      </div>
      <form onSubmit={handleAddCategory} className="card p-4 shadow-lg">
        <div className="mb-4">
          <label htmlFor="roomType" className="form-label" style={{ color: "#152c5b", fontWeight: 'bold' }}>Loại Phòng</label>
          <input
            type="text"
            className="form-control"
            id="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
            placeholder="Nhập loại phòng..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="soLuong" className="form-label" style={{ color: "#152c5b", fontWeight: 'bold' }}>Số Lượng</label>
          <input
            type="number"
            className="form-control"
            id="soLuong"
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
            required
            placeholder="Nhập số lượng..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tienNghi" className="form-label" style={{ color: "#152c5b", fontWeight: 'bold' }}>Tiện Nghi</label>
          <input
            type="text"
            className="form-control"
            id="tienNghi"
            value={tienNghi}
            onChange={(e) => setTienNghi(e.target.value)}
            required
            placeholder="Nhập tiện nghi..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="giaTien" className="form-label" style={{ color: "#152c5b", fontWeight: 'bold' }}>Giá Tiền</label>
          <input
            type="number"
            className="form-control"
            id="giaTien"
            value={giaTien}
            onChange={(e) => setGiaTien(e.target.value)}
            required
            placeholder="Nhập giá tiền..."
          />
        </div>
        <button 
          type="submit" 
          className="btn w-100" 
          style={{ backgroundColor: '#152c5b', color: 'white', fontWeight: 'bold' }}
          disabled={loading}
        >
          {loading ? 'Đang thêm...' : 'Thêm phòng'}
        </button>
      </form>

      {/* CSS Styles */}
      <style jsx>{`
        .container {
          max-width: 600px; /* Độ rộng tối đa của container */
          margin: auto; /* Giữa container */
          padding: 20px; /* Padding xung quanh container */
          background: #f8f9fa; /* Nền sáng để tạo độ tương phản */
          border-radius: 8px; /* Bo góc cho container */
        }

        .card {
          border-radius: 8px; /* Bo góc cho card */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Thêm bóng cho chiều sâu */
          transition: transform 0.2s; /* Chuyển tiếp mượt mà cho hiệu ứng hover */
        }

        .card:hover {
          transform: scale(1.02); /* Phóng to nhẹ khi hover */
        }

        .btn {
          border: none; /* Bỏ viền cho button */
          transition: background-color 0.3s, transform 0.2s; /* Chuyển tiếp mượt mà cho màu nền */
        }

        .btn:hover {
          background-color: #0e1e4d; /* Màu tối hơn khi hover */
          transform: translateY(-2px); /* Nâng nhẹ khi hover */
        }

        .form-control {
          border-radius: 5px; /* Bo góc cho trường nhập liệu */
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Bóng trong cho chiều sâu */
          transition: border-color 0.2s; /* Chuyển tiếp mượt mà cho màu viền */
        }

        .form-control:focus {
          border-color: #152c5b; /* Thay đổi màu viền khi tập trung */
          box-shadow: 0 0 0 0.2rem rgba(21, 44, 91, 0.25); /* Bóng khi tập trung */
        }

        @media (max-width: 576px) {
          .container {
            padding: 10px; /* Giảm padding trên thiết bị di động */
          }

          .card {
            padding: 15px; /* Giảm padding trong card */
          }
        }
      `}</style>
    </div>
  );
}

export default ThemLoaiPhong;