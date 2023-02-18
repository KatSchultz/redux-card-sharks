import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./PlayingCard.css";
import { PlayingCard } from "../../types";
import Paper from "@mui/material/Paper";
import img0 from "../../images/img-0.png";
import img1 from "../../images/img-1.png";
import img2 from "../../images/img-2.png";
import img3 from "../../images/img-3.png";
import img4 from "../../images/img-4.png";
import img5 from "../../images/img-5.png";
import cardFront from "../../images/frontOfCard.png";

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

export default function CardDirectImport({
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
  const frontCardImg = cardFront;
  const cardImages = [
    { id: 1, name: "stingray", image: img0 },
    { id: 2, name: "stingray", image: img0 },
    { id: 3, name: "blue hippo tang", image: img1 },
    { id: 4, name: "blue hippo tang", image: img1 },
    { id: 5, name: "clownfish", image: img2 },
    { id: 6, name: "clownfish", image: img2 },
    { id: 7, name: "octopus", image: img3 },
    { id: 8, name: "octopus", image: img3 },
    { id: 9, name: "sea turtle", image: img4 },
    { id: 10, name: "sea turtle", image: img4 },
    { id: 11, name: "whale shark", image: img5 },
    { id: 12, name: "whale shark", image: img5 },
  ];

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

  const currentImg =
    cardImages.find((elem) => elem.id === card.id) || cardImages[0];

  return (
    <Paper
      elevation={1}
      sx={{
        background: "transparent",
        boxShadow: "none",
      }}
      className={"playing-card " + hiddenClass + animateFlip}
      onClick={clickable ? clickHandler : () => {}}
    >
      <div className="card-faces">
        <div className="card-front face">
          <div className="card-placeholder"></div>
          {/* <img src={frontCardImg} alt="unknown" className="fish-img" /> */}
        </div>
        <div className="card-back face">
          <div className="placeholder-fish-side"></div>
          {/* <img src={currentImg.image} alt={card.name} className="fish-img" /> */}
        </div>
      </div>
    </Paper>
  );
}
