"use client";
import React, { memo } from "react";
import Link from "next/link";
import useFetch from "@/hook/useFetch";
import Deleteservice from "./xoa";
import { mutate } from "swr";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic({
  ssr: false,
});

const TinTuc = () => {
  const { data, refetch } = useFetch("tintuc");

  return (
    <div className="container mt-4">
      <style jsx>{`
        .image-container {
          width: 100%;
          height: 150px;
          overflow: hidden;
          border-radius: 10px;
        }
        .custom-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
        .content {
          max-height: 160px; /* Giới hạn chiều cao */
          max-width: 200px; /* Giới hạn chiều rộng */
          overflow-y: auto; /* Hiển thị cuộn nếu nội dung vượt quá chiều cao */
          overflow-x: hidden; /* Ẩn cuộn ngang */
          border: 1px solid #dee2e6; /* Viền cho ô nội dung */
          padding: 5px; /* Padding cho ô nội dung */
          border-radius: 5px; /* Bo góc cho ô nội dung */
        }
      `}</style>
      <div className="mb-4">
        <DynamicComponentWithNoSSR />
        <h2
          className="text-center"
          style={{ color: "#152c5b", fontWeight: "bold" }}
        >
          Quản lý Tin Tức
        </h2>
        <Link
          href="/tintuc/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Thêm tin tức
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "#152c5b" }}>STT</th>
              <th style={{ color: "#152c5b" }}>Tên Tin Tức</th>
              <th style={{ color: "#152c5b" }}>Nội Dung</th>
              <th style={{ color: "#152c5b" }}>Hình ảnh</th>
              <th style={{ color: "#152c5b" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((tinTuc, index) => (
                <tr key={tinTuc._id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{tinTuc.TenTinTuc}</td>
                  <td>
                    <div className="content">{tinTuc.NoiDung}</div>
                  </td>
                  <td>
                    <div className="image-container">
                      <img
                        src={tinTuc.image}
                        alt={tinTuc.TenTinTuc}
                        className="img-fluid custom-image"
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/tintuc/sua/${tinTuc._id}`}
                      className="btn mx-1"
                      style={{ backgroundColor: "#152c5b", color: "white" }}
                    >
                      Sửa
                    </Link>
                    <Deleteservice _id={tinTuc._id} refetch={refetch} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Không có dữ liệu tin tức nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(TinTuc);
