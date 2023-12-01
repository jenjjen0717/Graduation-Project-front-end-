import React from "react";
import { useLocation } from "react-router-dom";

const FooterComponent = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/signUp") {
    return null;
  }

  return (
    <div className="footer">
      <div className="social">
        <a href="#" title="Facebook">
          <i className="bx bxl-facebook"></i>
        </a>
        <a href="#" title="Twitter">
          <i className="bx bxl-twitter"></i>
        </a>
        <a href="#" title="Instagram">
          <i className="bx bxl-instagram"></i>
        </a>
        <a href="#" title="YouTube">
          <i className="bx bxl-youtube"></i>
        </a>
        <a href="#" title="Official Website">
          <i className="bx bx-globe"></i>
        </a>
      </div>
    </div>
  );
};

export default FooterComponent;
