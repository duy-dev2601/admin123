"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { HTTP } from "../@/constants";
import { useRouter } from "next/navigation";

function EditService() {
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    TenDichVu: "",
    GiaDichVu: "",
    MoTa: "",
    image: "", // Lưu trữ image dưới dạng chuỗi
  });
  const [loadingData, setLoadingData] = useState(true);
  const navigate = useRouter();
  const serviceId = window.location.pathname.split("/").pop(); // Lấy ID dịch vụ từ URL

  const fetchServiceData = useCallback(async () => {
    try {
      const response = await axios.get(`${HTTP}dichvu/${serviceId}`);
      setServiceData({
        TenDichVu: response.data.TenDichVu || "",
        GiaDichVu: response.data.GiaDichVu || "",
        MoTa: response.data.MoTa || "",
        image: response.data.image || "", // Lưu trữ image dưới dạng chuỗi
      });
    } catch (error) {
      console.log("Error fetching service data:", error);
    } finally {
      setLoadingData(false);
    }
  }, [serviceId]);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { TenDichVu, GiaDichVu, MoTa, image } = serviceData;
      if (!TenDichVu || !GiaDichVu || !image) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const formData = {
        TenDichVu,
        GiaDichVu: Number(GiaDichVu),
        MoTa,
        image: image, // Gửi image dưới dạng chuỗi
      };

      await axios.put(`${HTTP}dichvu/${serviceId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Cập nhật dịch vụ thành công!");
      navigate.back();
    } catch (error) {
      console.log("Error response:", error.response);
      alert(
        "Cập nhật dịch vụ thất bại: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div>Loading service data...</div>; // Hiển thị thông báo khi đang tải dữ liệu
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sửa Dịch Vụ</h2>
      <form onSubmit={handleUpdateService}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tên dịch vụ:</label>
          <input
            type="text"
            name="TenDichVu"
            placeholder="Nhập tên dịch vụ"
            style={styles.input}
            value={serviceData.TenDichVu}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Giá:</label>
          <input
            type="number"
            name="GiaDichVu"
            placeholder="Nhập giá dịch vụ"
            style={styles.input}
            value={serviceData.GiaDichVu}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mô tả:</label>
          <textarea
            name="MoTa"
            placeholder="Nhập mô tả dịch vụ"
            style={styles.textarea}
            value={serviceData.MoTa}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Liên kết hình ảnh:</label>
          <input
            type="text"
            name="image"
            placeholder="Nhập liên kết hình ảnh"
            style={styles.input}
            value={serviceData.image}
            onChange={handleInputChange}
          />
        </div>
        {/* Hiển thị hình ảnh xem trước */}
        <div style={styles.imagePreview}>
          {serviceData.image && (
            <img
              src={serviceData.image}
              alt="Service Image"
              style={styles.image}
            />
          )}
        </div>
        <button type="submit" style={styles.submitButton} disabled={loading}>
          {loading ? "Đang tải..." : "Cập nhật"}
        </button>
      </form>
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
  imagePreview: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  image: {
    maxWidth: "100%", // Tối đa chiều rộng của hình ảnh
    height: "auto", // Giữ tỷ lệ hình ảnh
    objectFit: "contain", // Chứa hình ảnh trong khung mà không cắt
    borderRadius: "4px",
    border: "1px solid #ccc",
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
};

export default EditService;
