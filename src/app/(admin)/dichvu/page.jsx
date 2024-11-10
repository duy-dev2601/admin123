"use client";
import React, { memo } from "react";
import Link from "next/link";
import useFetch from "@/hook/useFetch";
import Deleteservice from "./xoa";
import { mutate } from "swr";

const DichVu = () => {
  const { data, refetch } = useFetch("dichvu");

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
          width: 600px;
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
          Quản lý Dịch vụ
        </h2>
        <Link
          href="/dichvu/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Thêm dịch vụ
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "#152c5b" }}>STT</th>
              <th style={{ color: "#152c5b" }}>Tên Dịch vụ</th>
              <th style={{ color: "#152c5b" }}>Giá Dịch vụ</th>
              <th style={{ color: "#152c5b" }}>Mô tả</th>
              <th style={{ color: "#152c5b" }}>Hình ảnh</th>
              <th style={{ color: "#152c5b" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((service, index) => (
                <tr key={service._id} className="align-middle">
                  <td>{index + 1}</td>
                  <td>{service.TenDichVu}</td>
                  <td>{service.GiaDichVu}</td>
                  <td>{service.MoTa}</td>
                  <td>
                    <div className="image-container">
                      <img
                        src={service.image}
                        alt={service.TenDichVu}
                        className="img-fluid custom-image"
                      />
                    </div>
                  </td>
                  <td>
                    <Link
                      href={`/dichvu/sua/${service._id}`}
                      className="btn mx-1"
                      style={{ backgroundColor: "#152c5b", color: "white" }}
                    >
                      Sửa
                    </Link>
                    <Deleteservice _id={service._id} refetch={refetch} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có dữ liệu dịch vụ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(DichVu);
