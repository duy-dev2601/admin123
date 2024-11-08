"use client";
import React, { memo, useState } from "react";
import Link from "next/link";
import useFetch from "@/hook/useFetch";
import DeleteProduct from "./xoa";

const Phong = () => {
  const { data, refetch } = useFetch("phong?populate=id_loaiphong");

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
      `}</style>
      <div className="mb-4">
        <h2
          className="text-center"
          style={{ color: "#152c5b", fontWeight: "bold" }}
        >
          Quản lý Phòng
        </h2>
        <Link
          href="/phong/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Thêm phòng
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "#152c5b" }}>STT</th>
              <th style={{ color: "#152c5b" }}>Tên phòng</th>
              <th style={{ color: "#152c5b" }}>Tầng</th>
              <th style={{ color: "#152c5b" }}>Loại phòng</th>
              <th style={{ color: "#152c5b" }}>Hình ảnh</th>
              <th style={{ color: "#152c5b" }}>Giá</th>
              <th style={{ color: "#152c5b" }}>Tiện Nghi</th>
              <th style={{ color: "#152c5b" }}>Mô tả</th>
              <th style={{ color: "#152c5b" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((room, index) => (
                <tr key={room._id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{room.tenPhong}</td>
                  <td>{room.tang}</td>
                  <td>{room.id_loaiphong?.tenLoai || "Không xác định"}</td>
                  <td>
                    <div className="image-container">
                      <img
                        src={room.image[0]}
                        alt={room.tenPhong}
                        className="img-fluid custom-image"
                      />
                    </div>
                  </td>
                  <td>{room.id_loaiphong?.giaTien || "Chưa có"}</td>
                  <td>{room.id_loaiphong?.tienNghi || "Không có"}</td>
                  <td>{room.moTa}</td>
                  <td>
                    <Link
                      href={`/phong/sua/${room._id}`}
                      className="btn mx-1"
                      style={{ backgroundColor: "#152c5b", color: "white" }}
                    >
                      Sửa
                    </Link>
                    <DeleteProduct _id={room._id} refetch={refetch} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  Không có dữ liệu phòng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(Phong);
