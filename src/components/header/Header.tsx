import { Typography } from "@mui/material";
import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <Typography
      variant="h1"
      sx={{
        fontFamily: `"Titan One", cursive`,
        fontSize: { xs: "2.5rem", sm: "3.5rem" },
      }}
      className="title"
    >
      CARD SHARKS
    </Typography>
  );
}
