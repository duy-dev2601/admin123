"use client";
import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ThemTrangThaiPhong() {
  const [loading, setLoading] = useState(false);
  const [phongSelected, setPhongSelected] = useState(""); // ID phòng đã chọn
  const [tang, setTang] = useState("");
  const [trangThai, setTrangThai] = useState(""); // Sẽ lấy từ API
  const [phongList, setPhongList] = useState([]);
  const [trangThaiList, setTrangThaiList] = useState([]);
  const [moTa, setMoTa] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const navigate = useRouter();

  // Lấy danh sách phòng
  useEffect(() => {
    const fetchPhongList = async () => {
      try {
        const response = await axios.get(`${HTTP}phong`);
        setPhongList(response.data);
      } catch (error) {
        console.log("Error fetching room list:", error);
      }
    };
    fetchPhongList();
  }, []);

  // Lấy danh sách trạng thái
  useEffect(() => {
    const fetchTrangThaiList = async () => {
      try {
        const response = await axios.get(`${HTTP}trangthai`);
        setTrangThaiList(response.data);
      } catch (error) {
        console.log("Error fetching status list:", error);
      }
    };
    fetchTrangThaiList();
  }, []);

  const handlePhongChange = (e) => {
    const selectedPhongId = e.target.value;
    setPhongSelected(selectedPhongId);

    // Tìm phòng đã chọn trong danh sách
    const selectedPhong = phongList.find(phong => phong._id === selectedPhongId);
    if (selectedPhong) {
      setTang(selectedPhong.tang); // Cập nhật tầng
      setMoTa(selectedPhong.moTa); // Cập nhật mô tả
    } else {
      setTang(""); // Nếu không tìm thấy, reset
      setMoTa("");
    }
  };

  const handleAddRoomStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!phongSelected || !trangThai || !ngayBatDau) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const formData = {
        id_phong: phongSelected,
        id_trangthai: trangThai,
        ngayBatDau: new Date(ngayBatDau),
        ngayKetThuc: ngayKetThuc ? new Date(ngayKetThuc) : null,
      };

      await axios.post(`${HTTP}ttphong`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Thêm trạng thái phòng thành công!");
      navigate.back();
    } catch (error) {
      console.log("Error response:", error.response);
      alert(
        "Thêm trạng thái phòng thất bại: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thêm Trạng Thái Phòng</h2>
      <form onSubmit={handleAddRoomStatus}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Chọn phòng:</label>
          <select
            style={styles.input}
            value={phongSelected}
            onChange={handlePhongChange}
          >
            <option value="">Chọn phòng</option>
            {phongList.map((phong) => (
              <option key={phong._id} value={phong._id}>
                {phong.tenPhong}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tầng:</label>
          <input
            type="text"
            placeholder="Tầng"
            style={styles.input}
            value={tang}
            readOnly // Đặt là chỉ đọc
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Trạng thái:</label>
          <select
            style={styles.input}
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
          >
            <option value="">Chọn trạng thái</option>
            {trangThaiList.map((status) => (
              <option key={status._id} value={status._id}>
                {status.tenTrangThai}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mô tả:</label>
          <textarea
            placeholder="Mô tả phòng"
            style={styles.textarea}
            value={moTa}
            readOnly // Đặt là chỉ đọc
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ngày bắt đầu:</label>
          <input
            type="date"
            style={styles.input}
            value={ngayBatDau}
            onChange={(e) => setNgayBatDau(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Ngày kết thúc:</label>
          <input
            type="date"
            style={styles.input}
            value={ngayKetThuc}
            onChange={(e) => setNgayKetThuc(e.target.value)}
          />
        </div>
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
      <Link href="/phong" style={styles.backButton}>
        Quay lại
      </Link>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxSizing: "border-box",
    width: "100%",
  },
  heading: {
    color: "#152c5b",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "30px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    color: "#152c5b",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  submitButton: {
    backgroundColor: "#152c5b",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    fontSize: "18px",
  },
  backButton: {
    display: "block",
    marginTop: "15px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#152c5b",
    fontWeight: "bold",
  },
};

export default memo(ThemTrangThaiPhong);