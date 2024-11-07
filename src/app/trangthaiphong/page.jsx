"use client";
import React, { memo, useState } from "react";
import Link from "next/link";
import useFetch from "@/hook/useFetch";
import DeleteRoomStartus from "./xoa";
function TinhTrangPhong() {
  const { data, loading, error, refetch } = useFetch(
    "ttphong?populate=id_phong,id_trangthai"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

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
          Quản lý Đặt Phòng
        </h2>
        <Link
          href="/trangthaiphong/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Đặt phòng
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "#152c5b" }}>STT</th>
              <th style={{ color: "#152c5b" }}>Tên phòng</th>
              <th style={{ color: "#152c5b" }}>Tầng</th>
              <th style={{ color: "#152c5b" }}>Trạng thái</th>
              <th style={{ color: "#152c5b" }}>Hình ảnh</th>
              <th style={{ color: "#152c5b" }}>Ngày bắt đầu</th>
              <th style={{ color: "#152c5b" }}>Ngày kết thúc</th>
              <th style={{ color: "#152c5b" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((ttPhong, index) => (
                <tr key={ttPhong._id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{ttPhong.id_phong?.tenPhong || "Không xác định"}</td>{" "}
                  <td>{ttPhong.id_phong?.tang || "Không xác định"}</td>{" "}
                  <td>
                    {ttPhong.id_trangthai?.tenTrangThai || "Không xác định"}
                  </td>{" "}
                  <td>
                    <div className="image-container">
                      <img
                        src={ttPhong.id_phong?.image[0] || "/default-image.jpg"}
                        alt={ttPhong.id_phong?.tenPhong || "Hình ảnh phòng"}
                        className="img-fluid custom-image"
                      />
                    </div>
                  </td>
                  <td>
                    {ttPhong.ngayBatDau
                      ? new Date(ttPhong.ngayBatDau).toLocaleDateString()
                      : "Chưa xác định"}
                  </td>
                  <td>
                    {ttPhong.ngayKetThuc
                      ? new Date(ttPhong.ngayKetThuc).toLocaleDateString()
                      : "Chưa xác định"}
                  </td>
                  <td>
                    <Link
                      href={`/trangthaiphong/sua/${ttPhong._id}`}
                      className="btn mx-1"
                      style={{ backgroundColor: "#152c5b", color: "white" }}
                    >
                      Sửa
                    </Link>
                    <DeleteRoomStartus _id={ttPhong._id} refetch={refetch} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Không có dữ liệu phòng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(TinhTrangPhong);
