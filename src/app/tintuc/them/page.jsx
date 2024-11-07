"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";

function TinTuc() {
  const [loading, setLoading] = useState(false);
  const [TenTinTuc, setTenTinTuc] = useState("");
  const [image, setImage] = useState("");
  const [NoiDung, setNoiDung] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở rộng nội dung
  const navigate = useRouter();

  const handleAddTinTuc = async () => {
    setLoading(true);
    try {
      if (!TenTinTuc || !image || !NoiDung) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      await axios.post(`${HTTP}tintuc`, {
        TenTinTuc,
        image,
        NoiDung,
      });

      alert("Thêm thành công");
      navigate.back();
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
        <h2
          style={{ color: "#152c5b", fontWeight: "bold", marginBottom: "10px" }}
        >
          Thêm Tin Tức
        </h2>
        <Link
          href="/tintuc"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          Quay lại
        </Link>
      </div>
      <div className="card p-4 shadow-lg">
        <div className="mb-4">
          <label
            htmlFor="TenTinTuc"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Tên Tin Tức
          </label>
          <input
            type="text"
            className="form-control"
            id="TenTinTuc"
            value={TenTinTuc}
            onChange={(e) => setTenTinTuc(e.target.value)}
            required
            placeholder="Nhập tên tin tức..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Hình Ảnh
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="Nhập URL hình ảnh..."
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="NoiDung"
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Nội Dung
          </label>
          <div className={`content ${isExpanded ? "expanded" : ""}`}>
            <textarea
              className="form-control"
              id="NoiDung"
              value={NoiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              required
              placeholder="Nhập nội dung tin tức..."
              rows="4"
            />
          </div>
          {NoiDung.length > 100 && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ marginTop: "10px", color: "#152c5b" }}
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
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
          onClick={handleAddTinTuc}
        >
          Thêm tin tức
        </button>
      </div>

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

        .content {
          max-height: 100px; /* Giới hạn chiều cao mặc định */
          overflow: hidden; /* Ẩn phần nội dung thừa */
          transition: max-height 0.3s ease; /* Hiệu ứng chuyển tiếp khi mở rộng */
        }

        .content.expanded {
          max-height: 300px; /* Chiều cao khi mở rộng */
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

export default TinTuc;