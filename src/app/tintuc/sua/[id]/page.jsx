"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { HTTP } from "../@/constants";
import { useRouter } from "next/navigation";

const EditNews = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [TenTinTuc, setTenTinTuc] = useState("");
  const [image, setImage] = useState("");
  const [NoiDung, setNoiDung] = useState("");
  const router = useRouter();

  const handleShowDataCategory = async (_id) => {
    try {
      const res = await axios.get(`${HTTP}tintuc/${_id}`);
      setData(res?.data);
      setTenTinTuc(res?.data?.TenTinTuc);
      setImage(res?.data?.image);
      setNoiDung(res?.data?.NoiDung);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (
          TenTinTuc.length === 0 ||
          image.length === 0 ||
          NoiDung.length === 0
        ) {
          alert("Vui lòng nhập đầy đủ thông tin.");
          return;
        }

        await axios.put(`${HTTP}tintuc/${id}`, {
          TenTinTuc,
          image,
          NoiDung,
        });

        alert("Cập nhật thành công");
        router.back();
      } catch (error) {
        console.log(error);
        alert("Cập nhật thất bại");
      }
    },
    [TenTinTuc, image, NoiDung]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split("/");
      const idFromUrl = urlParts[urlParts.length - 1];
      setId(idFromUrl);
    }
  }, []);

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
      <h2
        style={{
          color: "#152c5b",
          fontWeight: "bold",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Sửa Tin Tức
      </h2>
      <Link
        href="/tintuc"
        className="btn mt-3"
        style={{ backgroundColor: "#152c5b", color: "white" }}
      >
        Quay lại
      </Link>
      <form className="mt-4" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="TenTinTuc" className="form-label">
            Tên Tin Tức
          </label>
          <input
            type="text"
            id="TenTinTuc"
            className="form-control"
            value={TenTinTuc}
            onChange={(e) => setTenTinTuc(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Hình Ảnh (URL)
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="NoiDung" className="form-label">
            Nội Dung
          </label>
          <textarea
            id="NoiDung"
            className="form-control"
            value={NoiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            required
            rows="4"
          />
        </div>
        <div className="d-flex flex-column flex-sm-row">
          <button
            type="submit"
            className="btn btn-custom"
            disabled={
              TenTinTuc === data?.TenTinTuc &&
              image === data?.image &&
              NoiDung === data?.NoiDung
            }
          >
            Lưu
          </button>
          <Link href="/tintuc" className="btn btn-secondary mx-2">
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
