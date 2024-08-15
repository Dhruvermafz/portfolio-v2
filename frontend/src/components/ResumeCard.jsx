import React, { useState, useEffect } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "react-bootstrap";
import pdf from "../assets/DhruvVerma_Resume.pdf";

// Option 1: Local worker
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// Option 2: CDN worker (alternative)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeCard = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body portfolio-card contact-card">
          <div className="top-info">
            <div className="text">
              <h1 className="main-title">
                <span>Download My Resume</span>
              </h1>
            </div>
          </div>
          <div className="contact-area">
            <div className="working-with-area">
              <div className="working-with-main">
                <div className="resume d-flex justify-content-center">
                  <iframe
                    src={pdf}
                    width="100%"
                    height="600px"
                    style={{ border: "none" }}
                  ></iframe>
                  <Document
                    file={pdf}
                    onLoadError={(error) =>
                      console.error("Error loading PDF:", error)
                    }
                  >
                    <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
                  </Document>
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
