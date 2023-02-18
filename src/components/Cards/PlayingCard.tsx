import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./PlayingCard.css";
import { PlayingCard } from "../../types";
import Paper from "@mui/material/Paper";

interface Props {
  card: PlayingCard;
  flippedCards: PlayingCard[];
  trackFlips: (card: PlayingCard) => void; // add name of card to array to check for matching
  noMatchFlip: number; //increases when pair doesnt match, triggers flip cards face down again
  foundPairs: string[];
  flipCount: number;
  setFlipCount: Dispatch<SetStateAction<number>>;
  timerActive: boolean;
  gameCount: number;
  gameOver: boolean;
}

export default function Card({
  card,
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
  const [cardRevealed, setCardRevealed] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [alreadyMatched, setAlreadyMatched] = useState(false);
  const frontOfCard = "/images/frontOfCard.png";
  const hiddenClass = alreadyMatched ? "hidden" : "";
  const animateFlip = cardRevealed ? " flip" : "";

  //flips mismatched pair back over
  useEffect(() => {
    resetCards();
  }, [noMatchFlip, gameCount, gameOver]);

  //remove matching cards from board
  useEffect(() => {
    if (foundPairs.includes(card.name)) {
      setAlreadyMatched(true);
      //line below makes sure cards are face down on new game
      setCardRevealed(false);
    } else {
      setAlreadyMatched(false);
    }
  }, [card.name, foundPairs]);

  //if two cards are showing, disable all cards from flipping
  useEffect(() => {
    if (flipCount < 2 && timerActive) {
      setClickable(true);

      if (flippedCards[0] && flippedCards[0].id === card.id) {
        setClickable(false); //prevents flipped card from matching with itself
      }
    } else {
      setClickable(false);
    }
  }, [flipCount, timerActive, flippedCards, card.id]);

  function clickHandler() {
    setCardRevealed(true);
    setClickable(false);
    trackFlips(card);
    setFlipCount((prev) => prev + 1);
  }

  function resetCards() {
    setCardRevealed(false);
    setClickable(true);
  }

  return (
    // <Paper
    //   elevation={1}
    //   sx={{
    //     background: "transparent",
    //     boxShadow: "none",
    //   }}
    //   className={"playing-card " + hiddenClass + animateFlip}
    //   onClick={clickable ? clickHandler : () => {}}
    // >
    // <div
    //   className={"playing-card " + hiddenClass + animateFlip}
    //   onClick={clickable ? clickHandler : () => {}}
    // >
    <div
      className={"card-faces playing-card " + hiddenClass + animateFlip}
      onClick={clickable ? clickHandler : () => {}}
    >
      <div className="card-front face">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + frontOfCard} />
          <img
            src={process.env.PUBLIC_URL + frontOfCard}
            alt="unknown"
            className="fish-img"
          />
        </picture>
      </div>
      <div className="card-back face">
        <picture>
          <source srcSet={process.env.PUBLIC_URL + card.image} />
          <img
            src={process.env.PUBLIC_URL + card.image}
            alt={card.name}
            className="fish-img"
          />
        </picture>
      </div>
    </div>
    // </div>
    // </Paper>
  );
}
