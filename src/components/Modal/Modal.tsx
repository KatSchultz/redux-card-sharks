import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import MuiModal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, styled } from "@mui/material";

interface Props {
  modalDisplay: boolean;
  closeModal: () => void;
  winStatus: boolean;
  timer: number;
  moveCount: number;
}

export default function Modal({
  modalDisplay,
  closeModal,
  winStatus,
  timer,
  moveCount,
}: Props) {
  const CustomButton = styled(Button)({
    backgroundColor: "#dad806",
    ":hover": {
      backgroundColor: "#787600",
    },
    textShadow: "0 0 6px black",
    fontFamily: `"Titan One", cursive`,
  }) as typeof Button;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <MuiModal
      open={modalDisplay}
      onClose={closeModal}
      aria-labelledby="modal-game-end"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "1rem",
        }}
      >
        {winStatus ? (
          <>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", fontFamily: `"Titan One", cursive` }}
            >
              You did it!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, mb: 2, textAlign: "center" }}
            >
              You won in {moveCount} moves with {timer} seconds to spare!
            </Typography>
          </>
        ) : (
          <>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", fontFamily: `"Titan One", cursive` }}
            >
              Under the sea, try again!
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, mb: 2, textAlign: "center" }}
            >
              You checked {moveCount} pairs of cards, but you ran out of time.
            </Typography>
          </>
        )}
        <CustomButton
          onClick={closeModal}
          sx={{ textAlign: "center" }}
          variant="contained"
        >
          Play again?
        </CustomButton>
      </Box>
    </MuiModal>
  );
}
