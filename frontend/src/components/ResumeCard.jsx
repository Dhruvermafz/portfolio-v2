import React, { useState, useEffect } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "react-bootstrap";
import pdf from "../assets/DhruvVerma_Resume.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
                  <Document
                    file={pdf}
                    onLoadError={(error) =>
                      console.error("Error loading PDF:", error)
                    }
                  >
                    <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
                  </Document>
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
