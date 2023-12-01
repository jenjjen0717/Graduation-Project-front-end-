import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FloatingBtnComponent from "../components/floatingBtn-component";
import BookService from "../services/book.service";

const HomeComponent = (props) => {
  const navigate = useNavigate();

  let { currentUser, setCurrentUser } = props;
  let [recentBook, setRecentBook] = useState(null);
  let { bookData, setBookData } = props;

  const viewBookNote = (e) => {
    console.log(e.target.dataset.title);
    localStorage.setItem(
      "book",
      JSON.stringify({
        title: e.target.dataset.title,
        author: e.target.dataset.author,
        status: e.target.dataset.status,
      })
    );
    navigate("/bookNote");
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    BookService.getBookList()
      .then((data) => {
        setBookData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    BookService.getRecentBook()
      .then((data) => {
        setRecentBook(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="homepage">
      {recentBook?.length != 0 && (
        <div className="bookshelf-title">
          <div className="title">Bookshelf</div>
          <div className="divider"></div>
          <div className="category">Recent</div>
        </div>
      )}
      {recentBook && (
        <div className="card-container">
          <div className="cards recent">
            {recentBook?.map((book) => (
              <div className="card" key={book._id}>
                <div className="info">
                  <div className="title">{book.title}</div>
                  <div className="author">{book.author}</div>
                </div>
                <div className={`status ${book.status}`}>{book.status}</div>
                <div className="cover"></div>
                <div
                  className="handleLayer"
                  data-title={book.title}
                  data-author={book.author}
                  data-status={book.status}
                  onClick={viewBookNote}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {bookData?.length != 0 && (
        <div className="bookshelf-title">
          <div className="divider"></div>
          <div className="category">Books</div>
        </div>
      )}
      {bookData?.length == 0 && (
        <div className="no-result">add a book first</div>
      )}
      {bookData && (
        <div className="card-container">
          <div className="cards">
            {bookData?.map((book) => (
              <div className="card" key={book._id}>
                <div className="info">
                  <div className="title">{book.title}</div>
                  <div className="author">{book.author}</div>
                </div>
                <div className={`status ${book.status}`}>{book.status}</div>
                <div className="cover"></div>
                <div
                  className="handleLayer"
                  data-title={book.title}
                  data-author={book.author}
                  data-status={book.status}
                  onClick={viewBookNote}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <FloatingBtnComponent />
    </div>
  );
};

export default HomeComponent;
