"use client";
import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ThemPhong() {
  const [loading, setLoading] = useState(false);
  const [tenPhong, setTenPhong] = useState("");
  const [tang, setTang] = useState("");
  const [loaiPhong, setLoaiPhong] = useState("");
  const [trangThai, setTrangThai] = useState("Còn trống");
  const [roomTypes, setRoomTypes] = useState([]);
  const [moTa, setMoTa] = useState("");
  const [imageLinks, setImageLinks] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(`${HTTP}loaiphong`);
        setRoomTypes(response.data);
      } catch (error) {
        console.log("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        tenPhong.trim() === "" ||
        tang.trim() === "" ||
        loaiPhong.trim() === "" ||
        imageLinks.trim() === ""
      ) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const formData = {
        tenPhong,
        tang: Number(tang),
        image: imageLinks.split(",").map((link) => link.trim()),
        moTa,
        id_loaiphong: loaiPhong,
        trangthai: trangThai,
      };

      await axios.post(`${HTTP}phong`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Thêm phòng thành công!");
      navigate.back();
    } catch (error) {
      console.log("Error response:", error.response);
      alert(
        "Thêm phòng thất bại: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Thêm Phòng</h2>
      <form onSubmit={handleAddRoom}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tên phòng:</label>
          <input
            type="text"
            placeholder="Nhập tên phòng"
            style={styles.input}
            value={tenPhong}
            onChange={(e) => setTenPhong(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tầng:</label>
          <input
            type="text"
            placeholder="Nhập tầng"
            style={styles.input}
            value={tang}
            onChange={(e) => setTang(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Loại phòng:</label>
          <select
            style={styles.input}
            value={loaiPhong}
            onChange={(e) => setLoaiPhong(e.target.value)}
          >
            <option value="">Chọn loại phòng</option>
            {roomTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.tenLoai}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mô tả:</label>
          <textarea
            placeholder="Nhập mô tả phòng"
            style={styles.textarea}
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Hình ảnh:</label>
          <input
            type="text"
            placeholder="Nhập liên kết hình ảnh (phân cách bằng dấu phẩy)"
            style={styles.input}
            value={imageLinks}
            onChange={(e) => setImageLinks(e.target.value)}
          />
        </div>
        <button
          type="submit"
          style={styles.submitButton}
          disabled={loading}
        >
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
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxSizing: 'border-box',
    width: '100%',
  },
  heading: {
    color: "#152c5b",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '30px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    color: "#152c5b",
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    backgroundColor: "#152c5b",
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  backButton: {
    display: 'block',
    marginTop: '15px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#152c5b',
    fontWeight: 'bold',
  },
};

export default memo(ThemPhong);