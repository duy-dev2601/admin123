"use client"; // Đảm bảo dòng này có ở đầu file
import React, { useState, memo } from "react";
import axios from "axios";
import { HTTP } from "@/constants";
import { useRouter } from "next/navigation";

function ThemDichVu() {
    const [loading, setLoading] = useState(false);
    const [tenDichVu, setTenDichVu] = useState("");
    const [giaDichVu, setGiaDichVu] = useState("");
    const [moTa, setMoTa] = useState("");
    const [image, setImage] = useState("");
    const navigate = useRouter();

    const handleAddDichVu = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (
                tenDichVu.trim() === "" ||
                giaDichVu.trim() === "" ||
                moTa.trim() === "" ||
                image.trim() === ""
            ) {
                alert("Vui lòng nhập đầy đủ thông tin.");
                return;
            }

            const formData = {
                TenDichVu: tenDichVu,
                GiaDichVu: Number(giaDichVu),
                MoTa: moTa,
                image: image,
            };

            await axios.post(`${HTTP}dichvu`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert("Thêm dịch vụ thành công!");
            navigate.back();
        } catch (error) {
            console.log("Error response:", error.response);
            alert(
                "Thêm dịch vụ thất bại: " +
                (error.response?.data?.message || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Thêm Dịch Vụ</h2>
            <form onSubmit={handleAddDichVu}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Tên Dịch Vụ:</label>
                    <input
                        type="text"
                        placeholder="Nhập tên dịch vụ"
                        style={styles.input}
                        value={tenDichVu}
                        onChange={(e) => setTenDichVu(e.target.value)}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Giá Dịch Vụ:</label>
                    <input
                        type="number"
                        placeholder="Nhập giá dịch vụ"
                        style={styles.input}
                        value={giaDichVu}
                        onChange={(e) => setGiaDichVu(e.target.value)}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Mô tả:</label>
                    <textarea
                        placeholder="Nhập mô tả dịch vụ"
                        style={styles.textarea}
                        value={moTa}
                        onChange={(e) => setMoTa(e.target.value)}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Hình ảnh:</label>
                    <input
                        type="text"
                        placeholder="Nhập liên kết hình ảnh"
                        style={styles.input}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
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

export default memo(ThemDichVu);