"use client";
import Link from "next/link";
import { memo } from "react";
// import useFetch from "@/hook/useFetch";
import DeleteCategory from "./xoa";
import useFetch from "@/hook/useFetch";

export const dynamic = "force-dynamic";
function DanhMuc() {
  const { data, loading, refetch } = useFetch("loaiphong");
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <style jsx>{`
        .custom-image {
          max-width: 200px; 
          height: auto; 
          border-radius: 10px;
        }
      `}</style>
      <div className="mb-4">
        <h2
          style={{ color: "#152c5b", fontWeight: "bold", textAlign: "center" }}
        >
          Quản lý Phòng
        </h2>
        <Link
          href="/danhmuc/them"
          className="btn mt-3"
          style={{ backgroundColor: "#152c5b", color: "white" }}
        >
          + Thêm loại phòng
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th style={{ color: "#152c5b" }}>STT</th>
              <th style={{ color: "#152c5b" }}>Tên loại</th>
              <th style={{ color: "#152c5b" }}>Số lượng</th>
              <th style={{ color: "#152c5b" }}>Tiện nghi</th>
              <th style={{ color: "#152c5b" }}>Giá tiền</th>
              <th style={{ color: "#152c5b" }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((room, index) => (
              <tr key={room._id} className="align-middle">
                <td>{index + 1}</td>
                <td>{room.tenLoai}</td>
                <td>{room.soLuong}</td>
                <td>{room.tienNghi}</td>
                <td>{room.giaTien}</td>
                <td>
                  <Link
                    href={`/danhmuc/sua/${room._id}`}
                    className="btn mx-1"
                    style={{ backgroundColor: "#152c5b", color: "white" }}
                  >
                    Sửa
                  </Link>
                  <DeleteCategory _id={room._id} refetch={refetch} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(DanhMuc);
