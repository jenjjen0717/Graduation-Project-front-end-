import React, { useState } from "react";

const TextEditor = () => {
  let [review, setReview] = useState();

  return (
    <div className="text-editor">
      <div className="toolBar">
        <div className="box font-box">
          <select name="" id="font-size">
            <option value="H1">H1</option>
            <option value="H1">H2</option>
            <option value="H1">H3</option>
            <option value="H1">H4</option>
            <option value="H1">H5</option>
            <option value="H1">H6</option>
          </select>
          <button id="bold" className="optionBtn" title="粗體">
            <i class="bx bx-bold"></i>
          </button>
          <button id="italic" className="optionBtn" title="斜體">
            <i class="bx bx-italic"></i>
          </button>
          <button id="underline" className="optionBtn" title="底線">
            <i class="bx bx-underline"></i>
          </button>
        </div>
        <div className="box align-box">
          <button id="align-left" className="optionBtn" title="靠左對齊">
            <i class="bx bx-align-left"></i>
          </button>
          <button id="align-middle" className="optionBtn" title="文字置中">
            <i class="bx bx-align-middle"></i>
          </button>
          <button id="align-right" className="optionBtn" title="靠右對齊">
            <i class="bx bx-align-right"></i>
          </button>
        </div>
        <div className="box list-box">
          <button id="list-ul" className="optionBtn" title="項目">
            <i className="bx bx-list-ul"></i>
          </button>
          <button id="list-ol" className="optionBtn" title="編號">
            <i className="bx bx-list-ol"></i>
          </button>
        </div>
        <div className="box color-box">
          <label htmlFor="highlight" title="醒目提示">
            <i className="bx bx-highlight"></i>
          </label>
          <input
            type="color"
            name=""
            id="highlight"
            className="highlight-option"
          />
        </div>
      </div>
      <br />
      <div
        className="textfield"
        contentEditable
        onInput={(e) => {
          setReview(e.currentTarget.textContent);
        }}
      ></div>
      {/* <button
        onClick={() => {
          let test = document.querySelector(".test");
          test.innerHTML = review;
        }}
        style={{ height: "2rem" }}
      ></button>
      <div className="test"></div> */}
    </div>
  );
};

export default TextEditor;
