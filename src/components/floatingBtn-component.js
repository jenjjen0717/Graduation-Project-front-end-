import React from "react";
import { Link } from "react-router-dom";

const FloatingBtnComponent = () => {
  return (
    <div className="addBtn">
      <div className="btn btn-plus">
        <i class="bx bx-plus"></i>
      </div>
      <div className="floatingBtn">
        <Link className=" btn btn-option" to="/isbnData">
          <span className="btnLabel">ISBN</span>
          <i class="bx bx-barcode"></i>
        </Link>
        <Link className="btn btn-option" to="/inputBookData">
          <span className="btnLabel">Manual</span>
          <i className="bx bx-text"></i>
        </Link>
        {/* <Link className="btn btn-option">
            <span className="btnLabel">Search</span>
            <i class="bx bx-search-alt-2"></i>{" "}
          </Link> */}
      </div>
    </div>
  );
};

export default FloatingBtnComponent;
