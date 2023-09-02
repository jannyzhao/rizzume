"use client";

import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import type { PDFDocumentProxy } from "pdfjs-dist";
import ScoreResult from "./ScoreResult";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const ScoreForm = () => {
  const [numPages, setNumPages] = useState<number>();
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File>();
  const [result, setResults] = useState<{
    score: number;
    matchedKeywords: { keyword: string; count: number }[];
    aiResponse: string;
  }>();

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      setResumeFile(files[0] || undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resumeFile) {
      return;
    }

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resumeFile", resumeFile);

    const response = await fetch("/api/score", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // Does not check for truthiness since score can be 0 and matchedKeywords can be empty.
    if (data.score === undefined || !data.matchedKeywords === undefined) {
      throw new Error("Invalid response from server");
    }

    setResults({
      score: data.score,
      matchedKeywords: data.matchedKeywords,
      aiResponse: data.aiResponse,
    });
  };

  return (
    <form
      className="flex flex-col w-full h-full justify-evenly items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col md:flex-row h-4/5 justify-evenly items-center">
        {/* JOB DESCRIPTION */}
        <section className="flex flex-col border-2 p-4 rounded-md h-full w-full m-4 overflow-auto">
          {result ? (
            <ScoreResult
              score={result.score}
              matchedKeywords={result.matchedKeywords}
              aiResponse={result.aiResponse}
            />
          ) : (
            <>
              <h1 className="text-2xl lg:text-3xl font-bold">
                Job Description
              </h1>
              <textarea
                placeholder="Enter a Job Description"
                value={jobDescription}
                name="jobDescription"
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-full resize-none p-4 my-2 font-light rounded-md outline-blue-200 border-2"
                required
              />
            </>
          )}
        </section>

        {/* RESUME UPLOAD/PREVIEW */}
        <section className="border-2 p-4 rounded-md h-full w-full m-4 overflow-scroll">
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
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className="border-2 rounded-md"
                  />
                ))}
              </Document>
            )}
          </div>
        </section>
      </div>

      <div className="flex w-full justify-center items-center">
        <button
          type="submit"
          className="bg-pink-600 text-white text-sm md:text-md border px-2 py-2 md:px-5 md:py-3 rounded-md uppercase font-semibold transition duration-300 hover:bg-pink-700"
        >
          Check Score
        </button>
      </div>
    </form>
  );
};

export default ScoreForm;
