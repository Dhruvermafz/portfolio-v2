import React from "react";
import { PORTFOLIO_URL } from "../../config";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="text text-center">
          <p>
            © Dhruvermafz {currentYear}, Designed & Developed By{" "}
            <a href={PORTFOLIO_URL}>Dhruv Verma</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
