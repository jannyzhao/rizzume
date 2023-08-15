import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SignUpButton from "@/components/SignUpButton";

export default function Home() {
  return (
    <Container className="flex items-center justify-center h-screen">
      <div>
        <Typography variant="h2">
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
