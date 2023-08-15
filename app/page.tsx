import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface HomeProps {} // You can define props here if needed

const Home: React.FC<HomeProps> = () => {
  return (
    <Container className="flex items-center justify-center h-screen">
      <div>
        <Typography variant="h2">
          How Much Rizz Does Your Resume Have?
        </Typography>
        <Button variant="outlined" color="primary">
          Get Started - It's free!
        </Button>
      </div>
    </Container>
  );
};

export default Home;
