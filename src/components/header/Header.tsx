import { Typography } from "@mui/material";
import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <Typography
      variant="h1"
      sx={{ fontFamily: `"Titan One", cursive`, fontSize: "2.5rem" }}
      className="title"
    >
      CARD SHARKS
    </Typography>
  );

  // <h1 className="title">CARD SHARKS</h1>;
}
