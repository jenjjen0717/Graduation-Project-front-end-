import React, { useEffect, useRef, useState } from "react";
import markdownIt from "markdown-it";
import "github-markdown-css/github-markdown.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

import BookService from "../services/book.service";

const TextEditor = (props) => {
  let { review, setReview } = props;
  let [preview, setPreview] = useState();
  let [view, setView] = useState(false);
  let [savedPopup, setSavedPopup] = useState(false);
  let textfield = useRef(null);
  let htmlContent = useRef(null);

  const md = new markdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ""; // use external default escaping
    },
  });

  //tool function
  const fontStyle = (noSelection, before, after) => {
    let { selectionStart, selectionEnd } = textfield.current;

    return selectionStart === selectionEnd
      ? review.slice(0, selectionStart) +
          noSelection +
          review.slice(selectionEnd)
      : review.slice(0, selectionStart) +
          before +
          review.slice(selectionStart, selectionEnd) +
          after +
          review.slice(selectionEnd);
  };

  const toolFunction = (noSelection) => {
    let { selectionStart, selectionEnd } = textfield.current;
    return (
      review.slice(0, selectionStart) + noSelection + review.slice(selectionEnd)
    );
  };

  const addBold = () => {
    setReview(fontStyle("**加粗**", "**", "**"));
  };

  const addItalic = () => {
    setReview(fontStyle("*斜體*", "*", "*"));
  };

  const addStrikeThrough = () => {
    setReview(fontStyle("~~刪除線~~", "~~", "~~"));
  };

  const ulList = () => {
    setReview(toolFunction("- "));
  };

  const olList = () => {
    setReview(toolFunction("1. "));
  };

  const addCodeBlock = () => {
    setReview(fontStyle("```\ncode\n```", "```", "```"));
  };

  const addQuote = () => {
    setReview(toolFunction("> "));
  };

  const addLink = () => {
    setReview(toolFunction("[](https://)"));
  };

  const addImg = () => {
    setReview(toolFunction("![]()"));
  };

  const addTable = () => {
    setReview(
      toolFunction(
        "| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n"
      )
    );
  };

  const viewMode = () => {
    setView(!view);
  };

  const handleScrollTextfield = (e) => {
    let { scrollTop, scrollHeight } = e.target;
    let scale = scrollTop / scrollHeight;
    htmlContent.current.scrollTop = scrollHeight * scale;
  };

  const handleScrollContent = (e) => {
    let { scrollTop, scrollHeight } = e.target;
    let scale = scrollTop / scrollHeight;
    textfield.current.scrollTop = scrollHeight * scale;
  };

  //save review to db
  const saveReview = () => {
    let bookTitle = JSON.parse(localStorage.getItem("book")).title;
    BookService.createReview(bookTitle, review)
      .then(() => {
        setSavedPopup(true);
        setTimeout(() => {
          setSavedPopup(false);
        }, "1500");
      })
      .catch((error) => {
        console.log(error);
        // setMessage(error.response.data);
      });
  };

  useEffect(() => {
    setPreview(md.render(review));
  }, [review]);

  return (
    <div className="text-editor">
      <div className="toolBar">
        <div className="tool">
          <div className="box font-box">
            {/* <button
              id="Heading"
              className="optionBtn"
              title="標題"
              onClick={addHeading}
            >
              <i class="bx bx-heading"></i>
            </button> */}
            <button
              id="bold"
              className="optionBtn"
              title="粗體"
              onClick={addBold}
            >
              <i class="bx bx-bold"></i>
            </button>
            <button
              id="italic"
              className="optionBtn"
              title="斜體"
              onClick={addItalic}
            >
              <i class="bx bx-italic"></i>
            </button>
            <button
              id="strikeThrough"
              className="optionBtn"
              title="刪除線"
              onClick={addStrikeThrough}
            >
              <i class="bx bx-strikethrough"></i>
            </button>
          </div>
          <div className="box list-box">
            <button
              id="list-ul"
              className="optionBtn"
              title="項目"
              onClick={ulList}
            >
              <i className="bx bx-list-ul"></i>
            </button>
            <button
              id="list-ol"
              className="optionBtn"
              title="編號"
              onClick={olList}
            >
              <i className="bx bx-list-ol"></i>
            </button>
            <button
              id="code-block"
              className="optionBtn"
              title="程式碼"
              onClick={addCodeBlock}
            >
              <i class="bx bx-code-alt"></i>
            </button>
            <button
              id="quote"
              className="optionBtn"
              title="引用"
              onClick={addQuote}
            >
              <i class="bx bxs-quote-left"></i>
            </button>
          </div>
          <div className="box link-box">
            <button
              id="link"
              className="optionBtn"
              title="連結"
              onClick={addLink}
            >
              <i class="bx bx-link-alt"></i>
            </button>
            <button
              id="add-image"
              className="optionBtn"
              title="圖片"
              onClick={addImg}
            >
              <i class="bx bx-image"></i>
            </button>
            <button
              id="add-table"
              className="optionBtn"
              title="表格"
              onClick={addTable}
            >
              <i class="bx bx-table"></i>
            </button>
          </div>
        </div>
        <div className="other-btn tool">
          <div className="box">
            <button
              id="view"
              className="optionBtn"
              title="檢視"
              onClick={viewMode}
            >
              <i class="bx bx-book-open"></i>
            </button>
          </div>
          <button onClick={saveReview} className="save-btn">
            Save
          </button>
        </div>
      </div>
      <div className="textfield-preview">
        <textarea
          className="textfield"
          ref={textfield}
          value={review}
          style={{ display: view ? "none" : "inline" }}
          onChange={(e) => {
            setReview(e.target.value);
          }}
          onScroll={handleScrollTextfield}
        />
        <div
          className="preview markdown-body"
          ref={htmlContent}
          style={{ width: view ? "100%" : "" }}
          dangerouslySetInnerHTML={{ __html: preview }}
          onScroll={handleScrollContent}
        ></div>
      </div>
      {savedPopup && (
        <div className="saved-success-popup">
          <div className="popup">
            <i class="bx bx-check-circle bx-tada"></i>
            <p>Saved</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
