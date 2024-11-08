import { checkRole } from "@/constants";
import { useRouter } from "next/navigation";

const Header = () => {
  const navigate = useRouter();

  const handleLogout = () => {
    navigate.push("/login");
    sessionStorage.removeItem("role");
  };

  return (
    <div className="header" style={{ margin: "0 0 20px 5px" }}>
      <p>Quản Lý Hệ Thống StarBooking</p>
      <div className="user-info">
        <span>{checkRole()}</span>
        <button onClick={handleLogout}>Logout</button>
        <img
          className="m-1"
          width="40"
          height="40"
          src="/images/admin.png"
          alt="Admin"
        />
      </div>
    </div>
  );
};

export default Header;
