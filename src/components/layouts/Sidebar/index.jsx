import Link from "next/link";
import "./styles.css";
import { checkRole } from "@/constants";

const SideBar = () => {
  return (
    <div className="sidebar p-4">
      <h3 className="text-center">
        <span style={{ color: "#F4EA52", fontWeight: "bold" }}>STAR</span>
        <span style={{ color: "#152C5B", fontWeight: "bold" }}>Booking</span>
      </h3>
      <hr />
      {checkRole() === "admin" ? (
        <>
          <p>
            <i className="bi bi-house-fill"></i>
            <Link href="/">Dashboard</Link>
          </p>
          <p>
            <i className="bi bi-people-fill"></i>
            <Link href="/nguoidung">Quản lý người dùng</Link>
          </p>
          <p>
            <i className="bi bi-people-fill"></i>
            <Link href="/nhanvien">Quản lý nhân viên</Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill"></i>
            <Link href="/tintuc">Quản lý tin tuc</Link>
          </p>
          <p>
            <i className="bi bi-tag-fill"></i>
            <Link href="/danhmuc">Quản lý danh mục phòng</Link>
          </p>
          <p>
            <i className="bi bi-box-seam"></i>
            <Link href="/phong">Quản lý phòng</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/donphong">Quản lý đơn đặt phòng</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/dichvu">Quản lý dịch vụ</Link>
          </p>
          <p>
            <i className="bi bi-pie-chart-fill"></i>
            <Link href="/thongke">Quản lý thống kê</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/trangthaiphong">Quản lý trạng thái phòng</Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill"></i>
            <Link href="/binhluan">Quản lý bình luận</Link>
          </p>
        </>
      ) : (
        <>
          <p>
            <i className="bi bi-box-seam"></i>
            <Link href="/phong">Quản lý phòng</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/trangthaiphong">Quản lý trạng thái phòng</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/donphong">Quản lý đơn đặt phòng</Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill"></i>
            <Link href="/binhluan">Quản lý bình luận</Link>
          </p>
          <p>
            <i className="bi bi-chat-left-text-fill"></i>
            <Link href="/tintuc">Quản lý tin tuc</Link>
          </p>
          <p>
            <i className="bi bi-cart-fill"></i>
            <Link href="/dichvu">Quản lý dịch vụ</Link>
          </p>
        </>
      )}
      <hr />
    </div>
  );
};

export default SideBar;
