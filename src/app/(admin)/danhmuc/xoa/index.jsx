import { HTTP } from "@/constants";
import axios from "axios";
import { memo, useState } from "react";
// import { HTTP } from "@/constants";


const DeleteCategory = ({ _id, refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      await axios.delete(`${HTTP}loaiphong/${_id}`);

      alert("Xoa thanh cong");

      refetch();
    } catch (error) {
      console.log(error);
      alert("Xoa that bai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-danger"
      disabled={loading}
      onClick={handleDeleteCategory}
    >
      Xoa
    </button>
  );
};

export default memo(DeleteCategory);
