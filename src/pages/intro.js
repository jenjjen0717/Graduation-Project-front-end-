import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IntroComponent = (props) => {
  const navigate = useNavigate();

  let { currentUser, setCurrentUser } = props;

  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  });
  return (
    <div>
      <h1>welcome to reading note</h1>
    </div>
  );
};

export default IntroComponent;
