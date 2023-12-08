import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BookService from "../services/book.service";
import ModalComponent from "../components/modal-component";
import DeleteCheckComponent from "../components/deleteCheck-component";
import BreadCrumbComponent from "../components/breadCrumb-component";
import TextEditor from "../components/textEditor";
import defaultCover from "../images/cover.png";

const BookNoteComponent = () => {
  const navigate = useNavigate();

  let initialData = JSON.parse(localStorage.getItem("book"));

  let [modalState, setModalState] = useState(false);
  let [excerptModal, setExcerptModal] = useState(false);
  let [editExcerptModal, setEditExcerptModal] = useState(false);
  let [deleteChecked, setDeleteChecked] = useState(false);

  let [coverImg, setCoverImg] = useState("");
  let [cover, setCover] = useState();
  let [title, setTitle] = useState(initialData.title);
  let [author, setAuthor] = useState(initialData.author);
  let [status, setStatus] = useState(initialData.status);

  let [paragraph, setParagraph] = useState("");
  let [page, setPage] = useState(0);
  let [note, setNote] = useState("");
  let [excerptData, setExcerptData] = useState(null);

  let [editP, setEditP] = useState("");
  let [editPage, setEditPage] = useState(0);
  let [editNote, setEditNote] = useState("");

  let [review, setReview] = useState("");

  let [message, setMessage] = useState("");
  //edit info form
  const getImage = (e) => {
    if (e.target.files[0]) {
      setCover(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleTitle = (e) => {
    setMessage("");
    // setEditInfo({ title: e.target.value });
    setTitle(e.target.value);
  };
  const handleAuthor = (e) => {
    setMessage("");
    // setEditInfo({ author: e.target.value });
    setAuthor(e.target.value);
  };
  const handleStatus = (e) => {
    setMessage("");
    // setEditInfo({ status: e.target.value });
    setStatus(e.target.value);
  };
  //add excerpt form
  const handleParagraph = (e) => {
    setParagraph(e.target.value);
  };
  const handlePage = (e) => {
    setPage(e.target.value);
  };
  const handleNote = (e) => {
    setNote(e.target.value);
  };
  //edit excerpt form
  const handleEditP = (e) => {
    setEditP(e.target.value);
  };
  const handleEditPage = (e) => {
    setEditPage(e.target.value);
  };
  const handleEditNote = (e) => {
    setEditNote(e.target.value);
  };
  //edit info modal
  const openEditModal = () => {
    setTitle(initialData.title);
    setAuthor(initialData.author);
    setStatus(initialData.status);
    setModalState(true);
  };
  const closeEditModal = () => {
    setMessage("");
    setModalState(false);
  };
  //add excerpt modal
  const openExcerptModal = () => {
    setExcerptModal(true);
  };
  const closeExcerptModal = () => {
    // setParagraph("");
    // setPage(0);
    // setNote("");
    setExcerptModal(false);
  };
  //edit excerpt modal
  const openEditExcerpt = (e) => {
    setEditP(e.target.dataset.p);
    setEditPage(e.target.dataset.page);
    setEditNote(e.target.dataset.note);
    localStorage.setItem("excerptId", JSON.stringify(e.target.id));
    setEditExcerptModal(true);
  };
  const closeEditExcerpt = () => {
    setEditExcerptModal(false);
  };

  const editInfoSubmit = () => {
    let bookTitle = JSON.parse(localStorage.getItem("book")).title;
    BookService.editInfo(bookTitle, title, author, status)
      .then((response) => {
        localStorage.setItem("book", JSON.stringify(response.data));
        // window.location.reload(true);
        // setModalState(false);
        setModalState(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  const deleteBookModal = () => {
    setDeleteChecked(true);
  };

  const addExcerpt = () => {
    let bookTitle = JSON.parse(localStorage.getItem("book")).title;
    BookService.createExcerpt(bookTitle, paragraph, page, note)
      .then(() => {
        setExcerptModal(false);
        setParagraph("");
        setPage(0);
        setNote("");

        BookService.getInfo(bookTitle)
          .then((data) => {
            setExcerptData(data.data.excerpt);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  const deleteExcerpt = (e) => {
    // let bookTitle = JSON.parse(localStorage.getItem("book")).title;
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.classList.add("close");

    BookService.deleteExcerpt(e.target.id)
      .then(() => {
        setExcerptData(
          excerptData.filter((excerpt) => excerpt._id !== e.target.id)
        );
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  const editExcerptSubmit = () => {
    let id = JSON.parse(localStorage.getItem("excerptId"));

    BookService.editExcerpt(id, editP, editPage, editNote)
      .then(() => {
        let bookTitle = JSON.parse(localStorage.getItem("book")).title;
        BookService.getInfo(bookTitle)
          .then((data) => {
            setExcerptData(data.data.excerpt);
          })
          .catch((error) => {
            console.log(error);
          });
        setEditExcerptModal(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let bookTitle = JSON.parse(localStorage.getItem("book")).title;
    BookService.getInfo(bookTitle)
      .then((data) => {
        localStorage.setItem("book_id", JSON.stringify(data.data._id));
        setCoverImg(data.data.cover);
        setExcerptData(data.data.excerpt);
        if (data.data.review) {
          setReview(data.data.review);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="book-note">
      <BreadCrumbComponent content={initialData.title} />
      <ModalComponent modalState={modalState}>
        <div className="form">
          <button className="closeBtn" onClick={closeEditModal}>
            <i class="bx bx-x"></i>
          </button>
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
              className="textInput"
              onChange={handleTitle}
              value={title}
              name="title"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="bookAuthor">作者</label>
            <input
              type="text"
              id="bookAuthor"
              className="textInput"
              onChange={handleAuthor}
              value={author}
              name="author"
            />
          </div>
          <div className="inputContainer status">
            <form>
              <input
                type="radio"
                id="toRead"
                name="status"
                value="To Read"
                checked={status === "To Read"}
                onChange={handleStatus}
              />
              <label htmlFor="toRead">To Read</label>
            </form>
            <form>
              <input
                type="radio"
                id="reading"
                name="status"
                value="Reading"
                checked={status === "Reading"}
                onChange={handleStatus}
              />
              <label htmlFor="reading">Reading</label>
            </form>
            <form>
              <input
                type="radio"
                id="finished"
                name="status"
                value="Finished"
                checked={status === "Finished"}
                onChange={handleStatus}
              />
              <label htmlFor="finished">Finished</label>
            </form>
          </div>
          <button className="submitBtn" onClick={editInfoSubmit}>
            Submit
          </button>
        </div>
      </ModalComponent>
      <ModalComponent excerptModal={excerptModal}>
        <div className="form">
          <button className="closeBtn" onClick={closeExcerptModal}>
            <i class="bx bx-x"></i>
          </button>
          <div className="excerpt-input">
            <div className="input paragraph">
              <label htmlFor="paragraph">摘錄</label>
              <textarea
                type="text"
                id="paragraph"
                className="textInput"
                name="paragraph"
                value={paragraph}
                onChange={handleParagraph}
              ></textarea>
            </div>
            <div className="input">
              <label htmlFor="page">頁數</label>
              <input
                type="number"
                min="0"
                id="page"
                className="textInput"
                name="page"
                value={page}
                onChange={handlePage}
              />
            </div>
          </div>
          <div className="note">
            <label htmlFor="note">筆記</label>
            <br />
            <textarea
              value={note}
              type="text"
              id="note"
              name="note"
              onChange={handleNote}
            />
          </div>
          <button className="submitBtn" onClick={addExcerpt}>
            Submit
          </button>
        </div>
      </ModalComponent>
      <ModalComponent excerptModal={editExcerptModal}>
        <div className="form">
          <button className="closeBtn" onClick={closeEditExcerpt}>
            <i class="bx bx-x"></i>
          </button>
          <div className="excerpt-input">
            <div className="input paragraph">
              <label htmlFor="paragraph">摘錄</label>
              <textarea
                type="text"
                id="paragraph"
                className="textInput"
                name="paragraph"
                value={editP}
                onChange={handleEditP}
              ></textarea>
            </div>
            <div className="input">
              <label htmlFor="page">頁數</label>
              <input
                type="number"
                min="0"
                id="page"
                className="textInput"
                name="page"
                value={editPage}
                onChange={handleEditPage}
              />
            </div>
          </div>
          <div className="note">
            <label htmlFor="note">筆記</label>
            <br />
            <textarea
              value={editNote}
              type="text"
              id="note"
              name="note"
              onChange={handleEditNote}
            />
          </div>
          <button className="submitBtn" onClick={editExcerptSubmit}>
            Submit
          </button>
        </div>
      </ModalComponent>

      <DeleteCheckComponent
        title={title}
        deleteChecked={deleteChecked}
        setDeleteChecked={setDeleteChecked}
      />

      <div class="info-excerpt">
        <div class="info">
          <div class="bookCover">
            <div className="coverBg">
              {coverImg && (
                <img
                  src={`http://localhost:8080/uploads/` + coverImg}
                  alt=""
                  className="cover"
                />
              )}
              {!coverImg && <img src={defaultCover} alt="" className="cover" />}
            </div>
          </div>
          <div class="bookInfo">
            <div className="info-container">
              <h1 className="bookTitle">{initialData.title}</h1>
              <h3 className="bookAuthor">{initialData.author}</h3>
              <div className={`bookStatus ${initialData.status}`}>
                {initialData.status}
              </div>
            </div>
            <div className="edit-delete">
              <button onClick={openEditModal} className="editBtn">
                Edit
              </button>
              <button onClick={deleteBookModal} className="deleteBtn">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="excerpt">
          <div className="excerpt-title">
            <h2>Excerpt</h2>
            <button className="add-excerpt" onClick={openExcerptModal}>
              <i class="bx bx-edit"></i>
            </button>
          </div>
          <hr />
          {excerptData?.length == 0 && (
            <div className="no-result-message">
              <div className="illustrate">
                <img src="" alt="" />
              </div>
              <div className="no-result">
                這本書還沒有筆記，快去記錄一條吧！
              </div>
            </div>
          )}
          {excerptData && (
            <div className="excerpt-cards">
              <div className="cards">
                {excerptData?.map((excerpt) => (
                  <div className="card" key={excerpt._id}>
                    <div className="paragraph-block">
                      {excerpt.paragraph}
                      <div className="page-block">P.{excerpt.page}</div>
                    </div>
                    <div className="note-block">{excerpt.note}</div>
                    {/* <div className="optionBtn">
                    <i class="bx bx-dots-vertical-rounded "></i>
                  </div> */}

                    <div className="option">
                      <i
                        class="bx bx-trash"
                        onClick={deleteExcerpt}
                        id={excerpt._id}
                      ></i>
                      <i
                        class="bx bx-edit-alt"
                        onClick={openEditExcerpt}
                        data-p={excerpt.paragraph}
                        data-page={excerpt.page}
                        data-note={excerpt.note}
                        id={excerpt._id}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="review">
        <div className="review-title">
          <h2>Review</h2>
        </div>
        <hr />
        <br />
        <TextEditor review={review} setReview={setReview} />
      </div>
    </div>
  );
};

export default BookNoteComponent;
