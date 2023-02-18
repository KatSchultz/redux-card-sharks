import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Timer from "../Timer/Timer";

interface Props {
  startGame: () => void;
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  resetGame: () => void;
}

export default function GameButtons({
  startGame,
  timerActive,
  setTimerActive,
  timer,
  setTimer,
  resetGame,
}: Props) {
  const [startBtnActive, setStartBtnActive] = useState(true);

  useEffect(() => {
    if (timerActive === false) {
      setStartBtnActive(true);
    }
  }, [timerActive]);

  const CustomButton = styled(Button)({
    backgroundColor: "#dad806",
    ":hover": {
      backgroundColor: "#787600",
    },
    textShadow: "0 0 5px black",
    fontFamily: `"Titan One", cursive`,
  }) as typeof Button;

  function handleStartButton() {
    startGame();
    setTimerActive(true);
    setStartBtnActive(false);
  }

  function handleResetButton() {
    resetGame();
    setStartBtnActive(false);
  }

  return (
    <Stack
      spacing={3}
      direction="row"
      className="btn-container"
      alignItems="center"
      justifyContent="space-between"
      width={"100%"}
      mb="1rem"
    >
      <CustomButton
        variant="contained"
        onClick={startBtnActive ? handleStartButton : () => {}}
      >
        Start
      </CustomButton>

      <Timer
        timer={timer}
        setTimer={setTimer}
        timerActive={timerActive}
        setTimerActive={setTimerActive}
      />

      <CustomButton variant="contained" onClick={handleResetButton}>
        Reset
      </CustomButton>
    </Stack>
  );
}
