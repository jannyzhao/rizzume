import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rizzume",
  description: "Check your resume's rizz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="primary"
                sx={{ flexGrow: 1 }}
              >
                Rizzume
              </Typography>
              <Button variant="outlined" color="primary">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: ["48px", "56px", "64px"],
            p: 3,
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
