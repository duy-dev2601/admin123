"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const dynamic = "force-dynamic";

const CommentManager = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe 1",
      comment: "Đây là một bài viết tuyệt vời!",
      rating: 5,
      image:
        "https://dogolegia.vn/wp-content/uploads/2023/09/noi-that-phong-ngu-dep-hien-dai-cao-cap-LG-BPN581-0.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      comment: "Tôi thấy bài viết này rất hữu ích.",
      rating: 4,
      image:
        "https://noithatnhadepnhaxinh.com/wp-content/uploads/2022/10/Enscape_2022-10-20-15-31-53-scaled.jpg",
    },
  ]);

  const handleDeleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="container mt-5">
      {/* Title */}
      <h2
        className="mb-4 text-center"
        style={{ color: "#152c5b", fontWeight: "bold" }}
      >
        Quản lý bình luận
      </h2>
      {/* Comments List */}
      <h4 className="mb-3" style={{ color: "#152c5b", fontWeight: "bold" }}>
        Tất cả bình luận
      </h4>
      {/* Header Row */}
      <div className="d-none d-md-flex align-items-center justify-content-between border-bottom pb-2 mb-3 flex-wrap">
        <strong className="col-md-2 text-center">Tên</strong>
        <strong className="col-md-4 text-center">Bình luận</strong>
        <strong className="col-md-2 text-center">Hình ảnh</strong>
        <strong className="col-md-2 text-center">Đánh giá</strong>
        <strong className="col-md-2 text-center">Hành động</strong>
      </div>

      {comments.length > 0 ? (
        <ul className="list-group">
          {comments.map((comment) => (
            <li className="list-group-item" key={comment.id}>
              <div className="row align-items-center justify-content-between flex-wrap">
                {/* Name */}
                <strong className="col-12 col-md-2 text-center">
                  {comment.name}
                </strong>

                {/* Comment Text */}
                <p className="col-12 col-md-4 mb-0 text-center">
                  {comment.comment}
                </p>

                {/* Image */}
                {comment.image && (
                  <div className="col-12 col-md-2 text-center">
                    <img
                      src={comment.image}
                      alt={`Hình ảnh của ${comment.name}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      className="img-thumbnail"
                    />
                  </div>
                )}

                {/* Rating */}
                <p className="col-12 col-md-2 mb-0 text-center">
                  {comment.rating} ★
                </p>

                {/* Delete Button */}
                <div className="col-12 col-md-2 text-center mt-2 mt-md-0">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
      )}
    </div>
  );
};

export default CommentManager;
