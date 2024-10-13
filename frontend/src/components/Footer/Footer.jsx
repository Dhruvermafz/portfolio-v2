import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="text text-center">
          <p>
            © Dhruvermafz {currentYear}, Designed & Developed By{" "}
            <a href="https://dhruvermafz.vercel.app/">Dhruv Verma</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
