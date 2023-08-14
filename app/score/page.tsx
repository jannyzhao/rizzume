import { Button, Container, Input } from "@mui/material";

// Placeholder page for testing the route.
export default function ScorePage() {
  return (
    <Container>
      <h1>Score</h1>
      <form
        action="/api/score"
        className="flex flex-col"
        method="post"
        encType="multipart/form-data"
      >
        <Input name="jobDescription" type="textarea" required />
        <Input name="resume" type="file" required />
        <Button type="submit">Upload</Button>
      </form>
    </Container>
  );
}
