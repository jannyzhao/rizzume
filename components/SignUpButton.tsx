"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignUpButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/api/auth/signin")}
      variant="outlined"
      color="primary"
    >
      Get Started - It&apos;s free!
    </Button>
  );
}
