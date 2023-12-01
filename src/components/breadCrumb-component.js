import React from "react";

const BreadCrumbComponent = (props) => {
  let { content } = props;
  return (
    <div className="breadCrumbs">
      <div className="breadCrumb">
        <ul>
          <li>
            <a href="/home">
              <i class="bx bx-home"></i>
            </a>
          </li>
          <li>
            <i class="bx bx-chevron-right"></i>
          </li>
          <li>{content}</li>
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbComponent;
