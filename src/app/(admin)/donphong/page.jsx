"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Nhập CSS của Bootstrap

// Dữ liệu giả cho các đơn hàng
const fakeOrders = [
  {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    email: "nguyenvana@gmail.com",
    idCard: "123456789",
    roomName: "Phòng Deluxe",
    roomType: "Phòng đôi",
    roomImage:
      "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/accommodation/standard/deluxe-city-view/4252-01-2000-acc-LTHO.jpg.thumb.768.768.jpg",
    roomPrice: 500, // Giá mỗi đêm (USD)
    checkInDate: "2",
    nights: 2, // Số đêm ở
    paymentMethod: "Đã Cọc 100 USD",
    deposit: 100, // Số tiền cọc cố định
  },
  {
    name: "Trần Thị B",
    phone: "0987654321",
    email: "tranthib@gmail.com",
    idCard: "987654321",
    roomName: "Phòng Standard",
    roomType: "Phòng đơn",
    roomImage:
      "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/accommodation/standard/deluxe-city-view/4252-01-2000-acc-LTHO.jpg.thumb.768.768.jpg",
    roomPrice: 750, // Giá mỗi đêm (USD)
    checkInDate: "1",
    nights: 1, // Số đêm ở
    paymentMethod: "Thanh Toán Khi Nhận Phòng",
    deposit: 0, // Không có cọc cho đơn hàng này
  },
  {
    name: "Trần Thị C",
    phone: "0557654321",
    email: "tranthic@gmail.com",
    idCard: "999954321",
    roomName: "Phòng Standard",
    roomType: "Phòng balcon",
    roomImage:
      "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/saigon/accommodation/standard/deluxe-city-view/4252-01-2000-acc-LTHO.jpg.thumb.768.768.jpg",
    roomPrice: 750, // Giá mỗi đêm (USD)
    checkInDate: "2",
    nights: 2, // Số đêm ở
    paymentMethod: "Đã Cọc 100 USD",
    deposit: 100,
  },
];

const OrderManagement = () => {
  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        className="text-center"
        style={{ color: "#152C5B", fontWeight: "bold" }}
      >
        Quản Lý Đơn Phòng
      </h1>
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Họ Tên</th>
              <th>SĐT</th>
              <th>Email</th>
              <th>CMND</th>
              <th>Tên Phòng</th>
              <th>Loại Phòng</th>
              <th>Ảnh Phòng</th>
              <th>Giá Phòng</th>
              <th>Số ngày ở</th>
              <th>Hình Thức Thanh Toán</th>
              <th>Tổng Cộng</th>
            </tr>
          </thead>
          <tbody>
            {fakeOrders.map((order, index) => {
              const totalPrice = order.roomPrice * order.nights; // Tính tổng giá phòng
              const remainingAmount = totalPrice - order.deposit; // Tính số tiền còn lại

              return (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>{order.idCard}</td>
                  <td>{order.roomName}</td>
                  <td>{order.roomType}</td>
                  <td>
                    <img
                      src={order.roomImage}
                      alt="Phòng"
                      className="img-fluid"
                      style={{ maxWidth: "150px", height: "auto" }}
                    />{" "}
                    {/* Hình ảnh phòng với kích thước tối đa 150px */}
                  </td>
                  <td>${order.roomPrice}</td>
                  <td>{order.nights}</td>
                  <td>{order.paymentMethod}</td>
                  <td>${Math.max(remainingAmount, 0).toFixed(2)}</td>{" "}
                  {/* Hiển thị số tiền còn lại, không cho phép âm */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Thêm CSS styles vào thẻ <style> */}
      <style>
        {`
                .table th, .table td {
                    vertical-align: middle; /* Căn giữa nội dung trong ô */
                    text-align: center; /* Căn giữa nội dung trong ô */
                }

                .table th {
                    background-color: #152C5B; /* Màu nền của tiêu đề bảng */
                    color: white; /* Màu chữ tiêu đề bảng */
                }

                .table td {
                    font-size: 0.9rem; /* Kích thước chữ trong các ô */
                }

                .table img {
                    border-radius: 5px; /* Bo tròn các góc của hình ảnh */
                }

                /* Định dạng hình ảnh trong bảng để lớn hơn */
                .table td img {
                    max-width: 150px; /* Kích thước tối đa của hình ảnh */
                    height: auto; /* Chiều cao tự động để giữ tỉ lệ hình ảnh */
                }
                `}
      </style>
    </div>
  );
};

export default OrderManagement;
