import React from "react";

const BackdropComponent = (props) => {
  let { modalState, excerptModal, editExcerptModal, deleteChecked } = props;

  return (
    <React.Fragment>
      {modalState && <div className="backdrop"></div>}
      {excerptModal && <div className="backdrop"></div>}
      {editExcerptModal && <div className="backdrop"></div>}
      {deleteChecked && <div className="backdrop"></div>}
    </React.Fragment>
  );
};

export default BackdropComponent;
