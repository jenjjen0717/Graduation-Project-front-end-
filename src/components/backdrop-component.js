import React from "react";

const BackdropComponent = (props) => {
  let { modalState, excerptModal, editExcerptModal } = props;

  return (
    <React.Fragment>
      {modalState && <div className="backdrop"></div>}
      {excerptModal && <div className="backdrop"></div>}
      {editExcerptModal && <div className="backdrop"></div>}
    </React.Fragment>
  );
};

export default BackdropComponent;
