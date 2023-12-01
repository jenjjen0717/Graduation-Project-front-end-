import React, { useState, useEffect } from "react";

import FloatingBtnComponent from "../components/floatingBtn-component";
import BackdropComponent from "../components/backdrop-component";
import BreadCrumbComponent from "../components/breadCrumb-component";

const IsbnComponent = () => {
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [bookName, setBookName] = useState("");
  let [author, setAuthor] = useState("");

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
            setBookName("");
            setAuthor("");
          } else {
            setSearchResult(data.items[0].volumeInfo);
          }
          console.log(searchResult + bookName);
          if (searchResult.subtitle) {
            setBookName(searchResult.title + "：" + searchResult.subtitle);
          } else {
            setBookName(searchResult.title);
          }

          setAuthor(searchResult.authors[0]);

          console.log(searchResult);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="isbn-input">
      <BreadCrumbComponent content={"ISBN Search"} />
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
                <p className="bookName">書名：{bookName}</p>
                <p className="bookAuthor">作者：{author}</p>
              </div>
              <button className="add-book">
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
