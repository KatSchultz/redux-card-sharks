import React from "react";
import "./GameBoard.css";
import Card from "../Cards/PlayingCard";
import { PlayingCard } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
  noMatchFlip: number;
  timerActive: boolean;
  gameOver: boolean;
}
export default function GameBoard({
  noMatchFlip,
  timerActive,
  gameOver,
}: Props) {
  const cardsRedux = useSelector(
    (state: RootState) => state.gameCards.gameCards
  );

  return (
    <div className="game-board">
      {cardsRedux.map((card: PlayingCard) => (
        <Card
          key={card.id}
          card={card}
          noMatchFlip={noMatchFlip}
          timerActive={timerActive}
          gameOver={gameOver}
        />
      ))}
    </div>
  );
}
