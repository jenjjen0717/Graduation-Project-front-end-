import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBtnComponent from "../components/floatingBtn-component";
import BreadCrumbComponent from "../components/breadCrumb-component";
import BookService from "../services/book.service";

const ManualInputComponent = () => {
  const navigate = useNavigate();

  let [cover, setCover] = useState();
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [status, setStatus] = useState("To Read");
  let [message, setMessage] = useState("");

  const getImage = (e) => {
    if (e.target.files[0]) {
      setCover(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTitle = (e) => {
    setMessage("");
    setTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setMessage("");
    setAuthor(e.target.value);
  };

  const handleStatus = (e) => {
    setMessage("");
    setStatus(e.target.value);
  };

  const postBookInfo = () => {
    BookService.postBookInfo(title, author, status)
      .then((response) => {
        localStorage.setItem("book", JSON.stringify(response.data));
        navigate("/bookNote");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="book-data">
      <BreadCrumbComponent content={"Manual Input Book's Info"} />
      <div className="bgPic">
        <div className="manualForm">
          <div className="cover">
            <div className="cover-box">
              {cover && <img src={cover} />}
              <label htmlFor="bookCover" style={{ opacity: cover ? "0" : "1" }}>
                <i class="bx bx-upload"></i>
              </label>
              <input type="file" id="bookCover" onChange={getImage}></input>
            </div>
          </div>
          {message && <div className="errorMsg">{message}</div>}
          <div className="inputContainer">
            <label htmlFor="bookTitle">書名</label>
            <input
              type="text"
              id="bookTitle"
              onChange={handleTitle}
              name="title"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="bookAuthor">作者</label>
            <input
              type="text"
              id="bookAuthor"
              onChange={handleAuthor}
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
                onChange={handleStatus}
              />
              <label htmlFor="toRead">To Read</label>
            </div>
            <div>
              <input
                type="radio"
                id="reading"
                name="status"
                value="Reading"
                onChange={handleStatus}
              />
              <label htmlFor="reading">Reading</label>
            </div>
            <div>
              <input
                type="radio"
                id="finished"
                name="status"
                value="Finished"
                onChange={handleStatus}
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
