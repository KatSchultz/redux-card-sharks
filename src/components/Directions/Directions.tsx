import React, { Dispatch, SetStateAction } from "react";
import "./Directions.css";
import GameButtons from "../GameButtons/GameButtons";
import {
  Button,
  Card,
  Container,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  startGame: () => void;
  timerActive: boolean;
  setTimerActive: Dispatch<SetStateAction<boolean>>;
  timer: number;
  setTimer: Dispatch<SetStateAction<number>>;
  resetGame: () => void;
}

export default function Directions({
  startGame,
  timerActive,
  setTimerActive,
  timer,
  setTimer,
  resetGame,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const CustomButton = styled(Button)({
    backgroundColor: "#dad806",
    ":hover": {
      backgroundColor: "#787600",
    },
    textShadow: "0 0 5px black",
    fontFamily: `"Titan One", cursive`,
  }) as typeof Button;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomButton
        sx={{
          display: { xs: "block", sm: "none", md: "none" },
          marginBottom: "1rem",
        }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        How to Play
      </CustomButton>
      <Popover
        sx={{ display: { xs: "block", sm: "none", md: "none" } }}
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List dense={false} sx={{ backgroundColor: "#003054" }}>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Choose two cards to compare"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="If the two cards match, they will be removed from the board"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="If the two cards do not match, they will flip over and remain on the board"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Try to match all the cards before time runs out"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="You have 25 seconds to complete the game"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Time will start once you click the start button"
            />
          </ListItem>
        </List>
      </Popover>

      <GameButtons
        startGame={startGame}
        timerActive={timerActive}
        setTimerActive={setTimerActive}
        timer={timer}
        setTimer={setTimer}
        resetGame={resetGame}
      />
      <Card
        sx={{
          backgroundColor: "#003054",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Typography
          variant="h4"
          className="title-secondary"
          sx={{ fontFamily: `"Titan One", cursive` }}
        >
          How to Play
        </Typography>
        <List dense={false}>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Choose two cards to compare"
            />
          </ListItem>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="If the two cards match, they will be removed from the board"
            />
          </ListItem>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="If the two cards do not match, they will flip over and remain on the board"
            />
          </ListItem>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Try to match all the cards before time runs out"
            />
          </ListItem>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="You have 25 seconds to complete the game"
            />
          </ListItem>
          <ListItem sx={{ padding: "0 16px" }}>
            <ListItemText
              sx={{ padding: "0", color: "white" }}
              primary="Time will start once you click the start button"
            />
          </ListItem>
        </List>
      </Card>
    </Container>
  );
}
