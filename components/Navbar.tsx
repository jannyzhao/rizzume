"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
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
          <Link href="/">
            <Image src={logo} alt="Logo" width={150} className="select-none" />
          </Link>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.replace("/api/auth/signin")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
