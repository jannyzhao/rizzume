import { Button, Container, Input } from "@mui/material";

// Placeholder page.
export default function ScorePage() {
  return (
    <Container>
      <h1>Score</h1>
      <form action="/api/score" method="post" encType="multipart/form-data">
        <Input name="resume" type="file" required />
        <Button type="submit">Upload</Button>
      </form>
    </Container>
  );
}
