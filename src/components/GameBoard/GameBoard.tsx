import React, { Dispatch, SetStateAction } from "react";
import "./GameBoard.css";
import Card from "../Cards/PlayingCard";
import { PlayingCard } from "../../types";
import CardDirectImport from "../Cards/PlayingCardDirectImport";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

interface Props {
  cards: PlayingCard[];
  flippedCards: PlayingCard[];
  trackFlips: (card: PlayingCard) => void;
  noMatchFlip: number;
  foundPairs: string[];
  flipCount: number;
  setFlipCount: Dispatch<SetStateAction<number>>;
  timerActive: boolean;
  gameCount: number;
  gameOver: boolean;
}
export default function GameBoard({
  cards,
  flippedCards,
  trackFlips,
  noMatchFlip,
  foundPairs,
  flipCount,
  setFlipCount,
  timerActive,
  gameCount,
  gameOver,
}: Props) {
  return (
    // <div className="square">
    //   <picture>
    //     <source srcSet={process.env.PUBLIC_URL + cards[0].image} />
    //     <img
    //       src={process.env.PUBLIC_URL + cards[0].image}
    //       alt={cards[0].name}
    //     />
    //   </picture>
    // </div>
    <div className="game-board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          flippedCards={flippedCards}
          trackFlips={trackFlips}
          noMatchFlip={noMatchFlip}
          foundPairs={foundPairs}
          flipCount={flipCount}
          setFlipCount={setFlipCount}
          timerActive={timerActive}
          gameCount={gameCount}
          gameOver={gameOver}
        />
      ))}
    </div>
    // <div style={{ height: "fit-content", backgroundColor: "red" }}>
    // <Grid2 container spacing={1} sx={{ backgroundColor: "red" }}>
    //   {cards.map((card) => (
    //     <Grid2 xs={4} sm={4} lg={3} key={card.id}>
    //       <Card
    //         card={card}
    //         flippedCards={flippedCards}
    //         trackFlips={trackFlips}
    //         noMatchFlip={noMatchFlip}
    //         foundPairs={foundPairs}
    //         flipCount={flipCount}
    //         setFlipCount={setFlipCount}
    //         timerActive={timerActive}
    //         gameCount={gameCount}
    //         gameOver={gameOver}
    //       />
    //     </Grid2>
    //   ))}
    // </Grid2>
    // </div>
  );
}
