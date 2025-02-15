import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "react-bootstrap";
import pdf from "../assets/DhruvVerma_Resume.pdf";

const ResumeCard = () => {
  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card contact-card">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
                Download <span></span>
              </h1>
            </div>
          </div>
          <div className="contact-area">
            <div className="working-with-area">
              <h2 className="main-common-title">
                Working with technologies ✨ Worldwide
              </h2>
              <div className="working-with-main">
                <div className="resume d-flex justify-content-center">
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                  >
                    <Viewer fileUrl={pdf} />
                  </Worker>
                </div>
                <div style={{ justifyContent: "center", position: "relative" }}>
                  <Button
                    variant="primary"
                    href={pdf}
                    target="_blank"
                    style={{ maxWidth: "250px" }}
                  >
                    <AiOutlineDownload />
                    &nbsp;Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
