import React from "react";

import BackdropComponent from "./backdrop-component";

const ModalComponent = (props) => {
  let { modalState } = props;
  let { excerptModal } = props;
  let { editExcerptModal } = props;

  return (
    <React.Fragment>
      <BackdropComponent
        modalState={modalState}
        excerptModal={excerptModal}
        editExcerptModal={editExcerptModal}
      />
      <div
        className="modal"
        style={{
          transform: modalState ? "scale(1)" : "scale(0)",
          opacity: modalState ? "1" : "0",
        }}
      >
        {props.children}
      </div>
      <div
        className="modal"
        style={{
          transform: excerptModal ? "scale(1)" : "scale(0)",
          opacity: excerptModal ? "1" : "0",
        }}
      >
        {props.children}
      </div>
      <div
        className="modal"
        style={{
          transform: editExcerptModal ? "scale(1)" : "scale(0)",
          opacity: editExcerptModal ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default ModalComponent;
