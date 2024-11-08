"use client";

import AdminLayout from "./(AdminLayout)/layout";

export default function Home() {
  return (
    <AdminLayout>
      <div className="status-board">
        <div className="status-item">
          <h2>Phòng đến trong ngày</h2>
          <p>0</p>
        </div>
        <div className="status-item">
          <h2>Phòng đi trong ngày</h2>
          <p>1</p>
        </div>
        <div className="status-item">
          <h2>Phòng đang sử dụng</h2>
          <p>6</p>
        </div>
        <div className="status-item">
          <h2>Khách đang ở</h2>
          <p>0</p>
        </div>
      </div>

      <div className="tabs">
        <div className="tab ">Phòng đến trong ngày</div>
        <div className="tab ">Phòng đi trong ngày</div>
        <div className="tab active">Phòng đang sử dụng</div>
      </div>

      <table className="booking-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã Xác Nhận</th>
            <th>Mã Booking</th>
            <th>Khách Hàng</th>
            <th>Loại Phòng</th>
            <th>Số Phòng</th>
            <th>Ngày Đến</th>
            <th>Ngày Đi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1702</td>
            <td></td>
            <td>Bảo Duy</td>
            <td>Phòng Đơn</td>
            <td>29</td>
            <td>06/09/2023</td>
            <td>07/09/2023</td>
          </tr>
          <tr>
            <td>2</td>
            <td>1702</td>
            <td></td>
            <td>Dũng Thắng</td>
            <td>Phòng Đôi</td>
            <td>53</td>
            <td>06/09/2023</td>
            <td>07/09/2023</td>
          </tr>
          <tr>
            <td>3</td>
            <td>1702</td>
            <td></td>
            <td>Ngọc Duy</td>
            <td>Phòng Some</td>
            <td>23</td>
            <td>01/09/2023</td>
            <td>07/09/2023</td>
          </tr>
          <tr>
            <td>4</td>
            <td>1702</td>
            <td></td>
            <td>Gia Bảo</td>
            <td>Phòng Thú</td>
            <td>19</td>
            <td>06/09/2023</td>
            <td>07/09/2023</td>
          </tr>
          <tr>
            <td>5</td>
            <td>1702</td>
            <td></td>
            <td>Hoàng Hiệp</td>
            <td>Phòng Ngưu Ma Dương</td>
            <td>90</td>
            <td>06/09/2023</td>
            <td>07/09/2023</td>
          </tr>
          <tr>
            <td>6</td>
            <td>1702</td>
            <td></td>
            <td>Thành Phát</td>
            <td>Phòng Gơn Mường Thanh</td>
            <td>58</td>
            <td>06/09/2023</td>
            <td>07/09/2023</td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          padding: 20px;
          background-color: #f5f5f5;
        }

        .tabs {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 20px;
          border-bottom: 2px solid #ddd;
        }

        .tab {
          padding: 10px 20px;
          margin-right: 10px;
          cursor: pointer;
          font-weight: bold;
          color: #333;
          border-bottom: 3px solid transparent;
          transition: border-bottom 0.3s;
        }

        .tab.active {
          border-bottom: 3px solid #1e88e5;
          color: #1e88e5;
        }

        .tab:hover {
          border-bottom: 3px solid #1e88e5;
          color: #1e88e5;
        }

        .status-board {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .status-item {
          background-color: #152c5b;
          padding: 10px;
          width: 23%;
          text-align: center;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .status-item h2 {
          font-size: 16px;
          color: #fff;
          margin-bottom: 10px;
        }

        .status-item p {
          font-size: 24px;
          font-weight: bold;
          color: #fff;
        }

        .booking-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
        }

        .booking-table thead {
          background-color: #152c5b;
          color: #fff;
        }

        .booking-table th,
        .booking-table td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
        }

        .booking-table tbody tr:nth-child(odd) {
          background-color: #f9f9f9;
        }

        @media (max-width: 768px) {
          .status-board {
            display: block;
          }

          .status-item {
            width: 100%;
            margin-bottom: 10px;
          }

          .tabs {
            flex-direction: column;
            margin-bottom: 10px;
          }

          .tab {
            margin-bottom: 10px;
          }

          .booking-table {
            font-size: 12px;
          }

          .booking-table th,
          .booking-table td {
            padding: 8px;
          }
        }
      `}</style>
    </AdminLayout>
  );
}
