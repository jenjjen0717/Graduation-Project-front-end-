import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import AuthService from "../services/auth.service";
import BookService from "../services/book.service";

const NavComponent = (props) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  let { currentUser, setCurrentUser } = props;
  let { bookData, setBookData } = props;
  let [boxExpanded, setBoxExpanded] = useState(false);

  if (pathname === "/signUp") {
    return null;
  }

  const expandSearch = () => {
    setBoxExpanded(!boxExpanded);
  };

  const handleSearch = (e) => {
    if (e.target.value == "") {
      BookService.getBookList()
        .then((data) => {
          setBookData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      BookService.searchBook(e.target.value).then((data) => {
        setBookData(data.data);
      });
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setCurrentUser(null);
    localStorage.removeItem("book");
    navigate("/", { replace: true });
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to={(!currentUser && "/") || (currentUser && "/home")}>
          <img src={require("../images/logo.png")} alt="" />
        </Link>
      </div>

      <nav>
        {!currentUser && (
          <Link to="/signUp" className="loginBtn navItem">
            Login
          </Link>
        )}

        {currentUser && pathname === "/home" && (
          <div className="navItem">
            <div className="search-bar">
              <div className="search">
                <input
                  type="text"
                  className={`searchInput ${
                    boxExpanded ? "search-expanded" : ""
                  }`}
                  tabIndex={0}
                  placeholder="Search"
                  onChange={handleSearch}
                />
                <i className="bx bx-search" onClick={expandSearch}></i>
              </div>
            </div>
          </div>
        )}

        {currentUser && (
          <Link to="#" onClick={handleLogout} className="navItem">
            Log Out
          </Link>
        )}
      </nav>
    </div>
  );
};

export default NavComponent;
