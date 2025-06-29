"use client";

import { Box } from "@mui/material";
import { HeroSection } from "./HeroSection";

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
        height: "calc(100vh - 64px)",
      }}
    >
      <HeroSection />
    </Box>
  );
}
