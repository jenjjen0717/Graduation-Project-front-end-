import React, { useState, useEffect } from "react";

import FloatingBtnComponent from "../components/floatingBtn-component";
import BreadCrumbComponent from "../components/breadCrumb-component";
import ManualFormComponent from "../components/manualForm-component";
import ModalComponent from "../components/modal-component";

const IsbnComponent = () => {
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState();

  let [modalState, setModalState] = useState(false);

  let [cover, setCover] = useState();
  let [newBook, setNewBook] = useState({
    uploadCover: "",
    title: "",
    author: "",
    status: "To Read",
  });
  let [message, setMessage] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const isbnSearch = async () => {
    if (searchInput == "") {
      setSearchResult(null);
    } else {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchInput}&qt=lang_switch&lang=zh-tw`,
        { method: "GET" }
      )
        .then(async (res) => await res.json())
        .then((data) => {
          console.log(data);
          if (data.totalItems == 0) {
            setSearchResult(null);
          } else {
            setSearchResult(data.items[0].volumeInfo);
          }
          // console.log(searchResult + bookName);

          // console.log(searchResult);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  return (
    <div className="isbn-input">
      <BreadCrumbComponent content={"ISBN Search"} />
      <ModalComponent modalState={modalState} setModalState={setModalState}>
        <ManualFormComponent
          cover={cover}
          setCover={setCover}
          newBook={newBook}
          setNewBook={setNewBook}
          message={message}
          setMessage={setMessage}
          setModalState={setModalState}
        />
      </ModalComponent>
      <div className="bgPic">
        <div className="search">
          <div className="searchBar">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Input ISBN"
            />
            <button className="searchBtn" onClick={isbnSearch}>
              <i class="bx bx-search-alt-2"></i>
            </button>
          </div>
          <hr />

          {!searchResult && (
            <div className="no-result">
              <h1>No Result</h1>
            </div>
          )}

          {searchResult && (
            <div className="card">
              <div className="bookInfo">
                {!searchResult.subtitle && (
                  <p className="bookName">書名：{searchResult.title}</p>
                )}
                {searchResult.subtitle && (
                  <p className="bookName">
                    書名：{searchResult.title} ： {searchResult.subtitle}
                  </p>
                )}
                <p className="bookAuthor">作者：{searchResult.authors[0]}</p>
              </div>
              <button
                className="add-book"
                onClick={() => {
                  setModalState(true);
                  if (searchResult.subtitle) {
                    setNewBook({
                      ...newBook,
                      title: searchResult.title + "：" + searchResult.subtitle,
                      author: searchResult.authors[0],
                    });
                  } else {
                    setNewBook({
                      ...newBook,
                      title: searchResult.title,
                      author: searchResult.authors[0],
                    });
                  }
                }}
              >
                <i class="bx bxs-plus-square"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      <FloatingBtnComponent />
    </div>
  );
};

export default IsbnComponent;
