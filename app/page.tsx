import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SignUpButton from "@/components/SignUpButton";
import Image from "next/image";
import resume from "@/public/images/resume.png";
import jobDescription from "@/public/images/job-description.png";

export default function Home() {
  return (
    <Container className="flex items-center justify-center h-screen">
      <div>
        <div className="flex gap-4">
          <Image
            alt="Resume banner"
            className="border rounded-md shadow-lg w-1/2"
            src={jobDescription}
          />
          <Image
            alt="Resume banner"
            className="border rounded-md shadow-lg w-1/2"
            src={resume}
          />
        </div>
        <Typography className="mt-8" component="h1" variant="h2">
          How Much Rizz Does Your Resume Have?
        </Typography>
        <Typography variant="body1" sx={{ color: "gray" }} className="pb-4">
          Upload resume, match with job descriptions using Rizz Score. Optimize
          job search, enhance compatibility, and boost chances for success.
          Streamlined, tailored, effective.
        </Typography>
        <SignUpButton />
      </div>
    </Container>
  );
}
