import axios from "axios";
import { memo, useCallback, useState } from "react";
import { HTTP } from "@/constants";

const Deleteservice = ({ _id, refetch }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = useCallback(async () => {
    setDeletingId(_id);
    try {
      await axios.delete(`${HTTP}dichvu/${_id}`);
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  }, [_id, refetch]);

  return (
    <button
      className="btn btn-danger mx-1"
      onClick={handleDelete}
      disabled={deletingId === _id}
    >
      {deletingId === _id ? "Deleting..." : "Xóa"}
    </button>
  );
};

export default memo(Deleteservice);
