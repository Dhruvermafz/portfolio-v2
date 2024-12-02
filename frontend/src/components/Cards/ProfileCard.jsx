import React from "react";
import profile from "../../assets/img/images/profile_1.jpg";
import bgprofile from "../../assets/img/profile.png";
import { MdDownload } from "react-icons/md";
import resume from "../../assets/DhruvVerma_Resume.pdf";
import socialLinks from "../../assets/data/socialLinks";

const ProfileCard = () => {
  return (
    <div className="col-xl-4">
      <div className="card profile-card">
        <div className="card-body">
          <div className="image text-center">
            {/* Set inline styles for the image */}
            <img
              src={bgprofile}
              alt="profile"
              style={{
                width: "100%", // Make image fill the width of the container
                height: "200px", // Set a fixed height for the image (adjust as needed)
                objectFit: "contain", //  objectFit: "cover", // Ensure the image covers the area of its container
              }}
            />
          </div>
          <div className="text">
            <h3 className="card-title">Dhruv Verma 👋</h3>
            <p>
              A Passionate <span>Full Stack Developer</span> 🖥️ &{" "}
              <span>Software Engineer</span> have <span>worked in major </span>{" "}
              Web Technologies and learning new technologies.
            </p>
            <div className="common-button-groups">
              <a className="btn btn-download" href={resume} download>
                <MdDownload /> Resume
              </a>
              <button
                className="btn btn-copy"
                data-clipboard-text="vermadhruv09112002@gmail.com"
              >
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H18C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 8V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V14C4 14.5304 4.21071 15.0391 4.58579 15.4142C4.96086 15.7893 5.46957 16 6 16H8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copy Email
              </button>
            </div>
            <div className="social-media-icon">
              <ul className="list-unstyled">
                {socialLinks.map((link, index) => (
                  <li key={index} className="social-icons">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
