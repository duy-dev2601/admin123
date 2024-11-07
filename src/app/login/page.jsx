// "use client";

// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useRouter();

//   async function onSubmit(event) {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);
//     const username = formData.get("username");
//     const password = formData.get("password");

//     console.log("Username:", username);
//     console.log("Password:", password);

//     // Kiểm tra thông tin đăng nhập
//     if (username === "admin" && password === "admin") {
//       localStorage.setItem("role", "admin");
//     } else if (username === "staff" && password === "staff") {
//       localStorage.setItem("role", "staff");
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Dang nhap that bai",
//       });
//     }

//     navigate.push("/");
//   }

//   return (
//     <div
//       style={{
//         position: "fixed",
//         zIndex: 50,
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "#ffffff",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <form onSubmit={onSubmit}>
//         <input type="text" name="username" />
//         <input type="text" name="password" />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React from "react";

function page() {
  return <div>day la trang login</div>;
}

export default page;
