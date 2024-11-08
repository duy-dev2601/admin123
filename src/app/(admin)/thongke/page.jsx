"use client";
import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const stats = [
    { id: 1, title: "Tổng người dùng", count: 245, icon: "fas fa-users" },
    {
      id: 2,
      title: "Dự án đang hoạt động",
      count: 32,
      icon: "fas fa-project-diagram",
    },
    {
      id: 3,
      title: "Số nhiệm vụ hoàn thành",
      count: 120,
      icon: "fas fa-tasks",
    },
    { id: 4, title: "Doanh thu", count: "$12,400", icon: "fas fa-dollar-sign" },
  ];

  const details = [
    {
      id: 1,
      name: "Hiệp",
      project: "Căn hộ A (phòng đơn)",
      tasks: 2,
      status: "Đang thuê",
      coctien: "500",
    },
    {
      id: 2,
      name: "Phát",
      project: "Căn hộ B (phòng Balcon)",
      tasks: 6,
      status: "Đang thuê",
      coctien: "2000",
    },
    {
      id: 3,
      name: "Thắng",
      project: "Căn hộ C (phòng đôi)",
      tasks: 1,
      status: "Đặt trước",
      coctien: "500",
    },
  ];

  // Doughnut chart data
  const doughnutData = {
    labels: ["Phòng đang sử dụng", "Phòng đang chống", "Phòng đã đặt trước"],
    datasets: [
      {
        label: "Trạng thái khách sạn",
        data: [120, 32, 10],
        backgroundColor: ["#152c5b", "#ffc107", "#f44336"],
        hoverBackgroundColor: ["#152c5b", "#ffca28", "#e57373"],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: [
      "Tuần 1",
      "Tuần 2",
      "Tuần 3",
      "Tuần 4",
      "Tuần 5",
      "Tuần 6",
      "Tuần 7",
      "Tuần 8",
      "Tuần 9",
      "Tuần 10",
    ],
    datasets: [
      {
        label: "Doanh thu (đơn vị $)",
        data: [3000, 4000, 3200, 5000, 6000, 6500, 5000, 4000, 8000, 8800],
        backgroundColor: "#152c5b",
      },
    ],
  };

  return (
    <div className="container mt-5">
      {/* Statistics Cards */}
      <div className="row">
        {stats.map((stat) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={stat.id}>
            <div className="card text-center h-100">
              <div className="card-body">
                <i className={`${stat.icon} fa-2x mb-3`}></i>
                <h5 className="card-title">{stat.title}</h5>
                <p className="card-text display-4">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row mt-5">
        <div className="col-12 col-md-6 mb-4">
          <h3 className="text-center">Phân tích trạng thái khách sạn</h3>
          <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <Doughnut data={doughnutData} />
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <h3 className="text-center">Doanh thu hàng tháng</h3>
          <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <Bar data={barData} />
          </div>
        </div>
      </div>

      {/* Statistics Table */}
      <h3 className="mt-5">Thống kê chi tiết</h3>
      <div className="table-responsive">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Tên</th>
              <th scope="col">Phòng</th>
              <th scope="col">Ngày thuê</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Cọc tiền trước</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr key={detail.id}>
                <th scope="row">{detail.id}</th>
                <td>{detail.name}</td>
                <td>{detail.project}</td>
                <td>{detail.tasks} ngày</td>
                <td>{detail.status}</td>
                <td>${detail.coctien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
