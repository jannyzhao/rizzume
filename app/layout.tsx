import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "./provider";
import Image from "next/image";
import logo from "@/public/images/logo.png";

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
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: 2000 }}>
              <Toolbar
                sx={{
                  backgroundColor: "background.paper",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Image src={logo} alt="Logo" width={150} />
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
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
