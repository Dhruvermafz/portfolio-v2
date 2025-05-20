import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "react-bootstrap";
import pdf from "../assets/DhruvVerma_Resume.pdf";
import * as pdfjs from "pdfjs-dist";

const ResumeCard = () => {
  // Initialize default layout plugin for toolbar (search, zoom, etc.)
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Set worker URL using pdfjs version
  const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  return (
    <div className="col-xl-8">
      <div className="card content-box-card">
        <div className="card-body">
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
                {/* PDF Viewer */}
                <div className="resume d-flex justify-content-center">
                  <Worker workerUrl={workerUrl}>
                    {pdf ? (
                      <Viewer
                        fileUrl={pdf}
                        plugins={[defaultLayoutPluginInstance]}
                        onError={(error) => {
                          console.error("PDF Viewer Error:", error);
                          alert(
                            "Failed to load resume. Please try downloading it."
                          );
                        }}
                      />
                    ) : (
                      <p>Error: Resume file not found.</p>
                    )}
                  </Worker>
                </div>
                {/* Download Button */}
                <div style={{ textAlign: "center" }}>
                  <Button
                    variant="primary"
                    href={pdf}
                    download="DhruvVerma_Resume.pdf"
                    style={{ maxWidth: "250px" }}
                  >
                    <AiOutlineDownload /> Download CV
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
