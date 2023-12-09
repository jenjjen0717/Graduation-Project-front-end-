import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IntroComponent = (props) => {
  const navigate = useNavigate();

  let { currentUser, setCurrentUser } = props;
  let [offset, setOffset] = useState();

  window.addEventListener("scroll", () => {
    setOffset(window.scrollY);
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="intro">
      <section className="heading">
        <div
          className="illustration-bg"
          style={{ top: offset * 0.5 + "px" }}
        ></div>
        <div className="theme-title">
          <div className="title">
            <h1 className="en-title">Bibliophile</h1>
            <h1 className="cn-title">藏書愛好者。</h1>
          </div>
          <div className="sign-up">
            <button
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Sign Up
            </button>
            <p>to start taking reading note </p>
          </div>
        </div>
        <div className="illustration"></div>
      </section>
      <section className="tutorial">
        <div className="left specific">
          <div className="content">
            <div className="image">
              <img src={require("../images/isbn.png")} alt="" />
            </div>
            <div className="description d-left">
              Write down your review of the book <br />
              with the Markdown editor
            </div>
          </div>
        </div>
        <div className="right specific">
          <div className="content">
            <div className="description d-right">Adding book by ISBN</div>
            <div className="image">
              <img src={require("../images/editor.png")} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="get-started">
        <div className="illustration">
          <img src={require("../images/Literature-pana.png")} alt="" />
        </div>
        <div className="started">
          <h1>開始使用</h1>
          <button
            onClick={() => {
              navigate("/signUp");
            }}
          >
            註冊／登入
          </button>
        </div>
      </section>
    </div>
  );
};

export default IntroComponent;
