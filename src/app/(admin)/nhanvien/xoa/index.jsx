import axios from "axios";
import { memo, useCallback, useState } from "react";
import { HTTP } from "@/constants";

const DeleteNhanVien = ({ _id, refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteNhanVien = async () => {
    setLoading(true);
    try {
      await axios.delete(`${HTTP}admin/${_id}`);

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
      onClick={handleDeleteNhanVien}
    >
      Xoa
    </button>
  );
};

export default memo(DeleteNhanVien);
