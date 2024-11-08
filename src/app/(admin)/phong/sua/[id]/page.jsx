"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";

function EditRoom() {
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({
    tenPhong: "",
    tang: "",
    loaiPhong: "",
    trangThai: "Còn trống",
    moTa: "",
    imageLinks: "",
  });
  const [roomTypes, setRoomTypes] = useState([]);
  const navigate = useRouter();
  const roomId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${HTTP}loaiphong`);
        setRoomTypes(response.data);
      } catch (error) {
        console.log("Error fetching room types:", error);
      }
    };

    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${HTTP}phong/${roomId}`);
        setRoomData({
          tenPhong: response.data.tenPhong,
          tang: response.data.tang,
          loaiPhong: response.data.id_loaiphong,
          trangThai: response.data.trangthai,
          moTa: response.data.moTa,
          imageLinks: response.data.image.join(", "), // Chuyển mảng hình ảnh thành chuỗi
        });
      } catch (error) {
        console.log("Error fetching room data:", error);
      }
    };

    fetchRoomTypes();
    fetchRoomData();
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { tenPhong, tang, loaiPhong, moTa, imageLinks, trangThai } =
        roomData;
      if (!tenPhong || !tang || !loaiPhong || !imageLinks) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const formData = {
        tenPhong,
        tang: Number(tang),
        id_loaiphong: loaiPhong,
        moTa,
        image: imageLinks.split(",").map((link) => link.trim()),
        trangthai: trangThai,
      };

      await axios.put(`${HTTP}phong/${roomId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Cập nhật phòng thành công!");
      navigate.back();
    } catch (error) {
      console.log("Error response:", error.response);
      alert(
        "Cập nhật phòng thất bại: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

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
        Chỉnh sửa Phòng
      </h1>

      <form onSubmit={handleUpdateRoom}>
        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Tên phòng:
          </label>
          <input
            type="text"
            name="tenPhong"
            value={roomData.tenPhong}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Tầng:
          </label>
          <input
            type="text"
            name="tang"
            value={roomData.tang}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Loại phòng:
          </label>
          <select
            name="loaiPhong"
            value={roomData.loaiPhong}
            onChange={handleInputChange}
            className="form-select"
            required
          >
            <option value="">Chọn loại phòng</option>
            {roomTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.tenLoai}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Mô tả phòng:
          </label>
          <textarea
            name="moTa"
            value={roomData.moTa}
            onChange={handleInputChange}
            className="form-control"
            rows="3"
            required
          />
        </div>

        <div className="mb-3">
          <label
            className="form-label"
            style={{ color: "#152c5b", fontWeight: "bold" }}
          >
            Hình ảnh:
          </label>
          <input
            type="text"
            name="imageLinks"
            value={roomData.imageLinks}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Nhập liên kết hình ảnh (phân cách bằng dấu phẩy)"
          />
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#152c5b",
              color: "white",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRoom;
