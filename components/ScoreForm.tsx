"use client";

import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const ScoreForm = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<string | File | undefined>(
    undefined,
  );

  function onDocumentLoadSuccess({ numPages }: PDFDocumentProxy) {
    setNumPages(numPages);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    if (files && files[0]) {
      setResumeFile(files[0] || undefined);
    }
  }

  return (
    <form
      action="/api/score"
      method="post"
      encType="multipart/form-data"
      className="flex flex-col w-full h-full justify-evenly items-center"
    >
      <div className="flex w-full flex-col md:flex-row h-4/5 justify-evenly items-center">
        {/* JOB DESCRIPTION */}
        <section className="flex flex-col border border-white p-4 rounded-md h-full w-full m-4 ">
          <h1 className="text-2xl lg:text-3xl font-bold">Job Description</h1>
          <textarea
            placeholder="Enter a Job Description"
            value={jobDescription}
            name="jobDescription"
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-full resize-none p-4 my-2 font-light bg-black text-white rounded-md outline-none border border-white"
            required
          />
        </section>

        {/* RESUME UPLOAD/PREVIEW */}
        <section className="border border-white p-4 rounded-md h-full w-full m-4 overflow-scroll">
          <h1 className="text-2xl lg:text-3xl font-bold">Resume Preview</h1>
          <input
            type="file"
            accept="application/pdf"
            name="resume"
            onChange={handleFileChange}
            className="my-2"
            required
          />
          <div className="w-1/2">
            {resumeFile && (
              <Document
                file={resumeFile}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            )}
          </div>
        </section>
      </div>

      <div className="flex w-full justify-center items-center">
        <button
          type="submit"
          className="bg-white text-black text-sm md:text-md border px-2 py-2 md:px-5 md:py-3 rounded-md uppercase font-semibold transition duration-300 hover:bg-black hover:text-white hover:border-white"
        >
          Check Score
        </button>
      </div>
    </form>
  );
};

export default ScoreForm;
