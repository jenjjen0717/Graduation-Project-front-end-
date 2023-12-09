import React from "react";
import { useNavigate } from "react-router-dom";

import BackdropComponent from "./backdrop-component";
import BookService from "../services/book.service";

const DeleteCheckComponent = (props) => {
  const navigate = useNavigate();

  let { title, deleteChecked, setDeleteChecked } = props;

  const deleteBook = () => {
    let book_id = JSON.parse(localStorage.getItem("book_id"));
    BookService.deleteBook(book_id).then(() => {
      navigate("/home");
    });
  };

  return (
    <React.Fragment>
      <BackdropComponent deleteChecked={deleteChecked} />
      {deleteChecked && (
        <div className="delete-check-modal">
          <div className="modal-box">
            <div className="title">
              確定要刪除《<span style={{ fontWeight: "bold" }}>{title}</span>
              》嗎？
            </div>
            <div className="cancel-yes">
              <div
                className="cancel"
                onClick={() => {
                  setDeleteChecked(false);
                }}
              >
                Cancel
              </div>
              <div className="yes" onClick={deleteBook}>
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DeleteCheckComponent;
