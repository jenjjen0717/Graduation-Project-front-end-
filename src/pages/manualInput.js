import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBtnComponent from "../components/floatingBtn-component";
import BreadCrumbComponent from "../components/breadCrumb-component";
import BookService from "../services/book.service";

const ManualInputComponent = () => {
  const navigate = useNavigate();

  let [cover, setCover] = useState();
  let [newBook, setNewBook] = useState({
    uploadCover: "",
    title: "",
    author: "",
    status: "To Read",
  });
  let [message, setMessage] = useState("");

  const getImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setCover(URL.createObjectURL(e.target.files[0]));
      setNewBook({ ...newBook, uploadCover: e.target.files[0] });
    }
  };

  const deleteImg = () => {
    setCover();
    setNewBook({ ...newBook, uploadCover: "" });
  };

  const uploadImg = () => {
    const bookCover = document.querySelector("#bookCover");
    bookCover.click();
  };

  const handleChange = (e) => {
    setMessage("");
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const postBookInfo = () => {
    const fd = new FormData();
    if (newBook.uploadCover) {
      fd.append("cover", newBook.uploadCover);
    }
    fd.append("title", newBook.title);
    fd.append("author", newBook.author);
    fd.append("status", newBook.status);

    BookService.postBookInfo(fd)
      .then((response) => {
        localStorage.setItem("book", JSON.stringify(response.data));
        navigate("/bookNote");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response?.data);
      });
  };

  return (
    <div className="book-data">
      <BreadCrumbComponent content={"Manual Input Book's Info"} />
      <div className="bgPic">
        <div className="manualForm">
          <div className="cover">
            <form className="cover-box" encType="multipart/form-data">
              {cover && (
                <div className="deleteImg">
                  <i class="bx bx-trash" onClick={deleteImg}></i>
                  <i class="bx bx-upload" onClick={uploadImg}></i>
                </div>
              )}
              {cover && <img src={cover} />}
              <label htmlFor="bookCover" style={{ opacity: cover ? "0" : "1" }}>
                <i class="bx bx-upload"></i>
              </label>
              <input
                type="file"
                id="bookCover"
                accept="image/png, image/jpeg, image/jpg"
                onChange={getImage}
              ></input>
            </form>
          </div>
          {message && <div className="errorMsg">{message}</div>}
          <div className="inputContainer">
            <label htmlFor="bookTitle">書名</label>
            <input
              type="text"
              id="bookTitle"
              onChange={handleChange}
              name="title"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="bookAuthor">作者</label>
            <input
              type="text"
              id="bookAuthor"
              onChange={handleChange}
              name="author"
            />
          </div>
          <div className="inputContainer status">
            <div>
              <input
                type="radio"
                id="toRead"
                name="status"
                value="To Read"
                defaultChecked
                onChange={handleChange}
              />
              <label htmlFor="toRead">To Read</label>
            </div>
            <div>
              <input
                type="radio"
                id="reading"
                name="status"
                value="Reading"
                onChange={handleChange}
              />
              <label htmlFor="reading">Reading</label>
            </div>
            <div>
              <input
                type="radio"
                id="finished"
                name="status"
                value="Finished"
                onChange={handleChange}
              />
              <label htmlFor="finished">Finished</label>
            </div>
          </div>
          <button className="submitBtn" onClick={postBookInfo}>
            Submit
          </button>
        </div>
      </div>
      <FloatingBtnComponent />
    </div>
  );
};

export default ManualInputComponent;
