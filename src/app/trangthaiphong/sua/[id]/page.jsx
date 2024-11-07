"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { HTTP } from "../@/constants";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function EditRoom() {
  const [loading, setLoading] = useState(false);
  const [detailRoom, setDetailRoom] = useState();
  const [statusRoom, setStatusRoom] = useState();
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [listStatusRoom, setListStatusRoom] = useState([]);

  const roomId = window.location.pathname.split("/").pop();

  const navigate = useRouter();

  const fetchRoomTypes = async () => {
    setLoading(true);
    try {
      const resDetailRoom = await axios.get(`${HTTP}ttphong/${roomId}`);
      const listStatus = await axios.get(`${HTTP}trangthai`);

      setDetailRoom(resDetailRoom.data);
      setStatusRoom(resDetailRoom?.data?.id_trangthai?._id);

      // Convert date strings to Date objects
      const startDate = new Date(resDetailRoom?.data?.ngayBatDau);
      const endDate = new Date(resDetailRoom?.data?.ngayKetThuc);

      // Format the dates as strings in the desired format (e.g., YYYY-MM-DD)
      setDateStart(startDate.toISOString().split("T")[0]);
      setDateEnd(endDate.toISOString().split("T")[0]);

      setListStatusRoom(listStatus.data);
    } catch (error) {
      console.log("Error fetching room types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (key, event) => {
    if (key === "start") {
      setDateStart(event.target.value);
    } else {
      setDateEnd(event.target.value);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const startDate = new Date(dateStart);
      const endDate = new Date(dateEnd);

      const dataUpdate = {
        id_phong: detailRoom?.id_phong?._id,
        id_trangthai: statusRoom,
        ngayBatDau: startDate.toISOString(),
        ngayKetThuc: endDate.toISOString(),
      };

      await axios.put(`${HTTP}ttphong/${roomId}`, dataUpdate);

      Swal.fire({
        title: "Cap nhat trang thai thanh cong!",
        icon: "success",
      });

      navigate.back();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cap nhat that bai",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, [roomId]);

  return (
    <div
      className="container"
      style={{
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      <h1
        className="text-center mb-4"
        style={{ color: "#152c5b", fontWeight: "bold", fontSize: "2rem" }}
      >
        Chỉnh sửa Trạng Thái Phòng
      </h1>
      <form>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Tên phòng:
          </label>
          <input type="text" value={detailRoom?.id_phong?.tenPhong} disabled />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Trạng thái:
          </label>
          <select
            name="id_trangthai"
            value={statusRoom}
            onChange={(e) => {
              setStatusRoom(e.target.value);
            }}
            className="form-select"
            required
          >
            <option value="">Chọn trạng thái</option>
            {listStatusRoom.map((status) => (
              <option key={status._id} value={status._id}>
                {status.tenTrangThai}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Ngày bắt đầu:
          </label>
          <input
            type="date"
            name="ngayBatDau"
            value={dateStart}
            className="form-control"
            required
            onChange={(e) => handleDateChange("start", e)}
          />
        </div>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Ngày kết thúc:
          </label>
          <input
            type="date"
            name="ngayKetThuc"
            value={dateEnd}
            className="form-control"
            onChange={(e) => handleDateChange("end", e)}
          />
        </div>
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn"
            style={{
              backgroundColor: "#152c5b",
              color: "white",
              fontWeight: "bold",
            }}
            disabled={loading}
            onClick={handleUpdate}
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRoom;
