export const HTTP = "http://localhost:3002/";
export const checkRole = () => {
  const role = sessionStorage.getItem("role");
  return role;
};
