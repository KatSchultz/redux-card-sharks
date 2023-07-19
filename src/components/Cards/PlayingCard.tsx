import React, { useEffect, useState } from "react";
import "./PlayingCard.css";
import { PlayingCard } from "../../types";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  incrementCurrentFlipCount,
  trackFlips,
} from "../../features/flippedCards/flippedCardsSlice";

interface Props {
  card: PlayingCard;
  noMatchFlip: number; //increases when pair doesnt match, triggers flip cards face down again
  timerActive: boolean;
  gameOver: boolean;
}

export default function Card({
  card,
  noMatchFlip,
  timerActive,
  gameOver,
}: Props) {
  const flippedCardsRedux = useSelector(
    (state: RootState) => state.flippedCards.flippedCards
  );
  const currentFlipCount = useSelector(
    (state: RootState) => state.flippedCards.currentFlipCount
  );
  const matchedCardsRedux = useSelector(
    (state: RootState) => state.matches.matchedCards
  );

  const [cardRevealed, setCardRevealed] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [alreadyMatched, setAlreadyMatched] = useState(false);
  const frontOfCard = "/images/frontOfCard.png";
  const hiddenClass = alreadyMatched ? "hidden" : "";
  const animateFlip = cardRevealed ? " flip" : "";

  const dispatch = useDispatch();

  //flips mismatched pair back over
  useEffect(() => {
    resetCards();
  }, [noMatchFlip, gameOver]);

  //remove matching cards from board
  useEffect(() => {
    if (matchedCardsRedux.includes(card.name)) {
      setAlreadyMatched(true);
      //line below makes sure cards are face down on new game
      setCardRevealed(false);
    } else {
      setAlreadyMatched(false);
    }
  }, [card.name, matchedCardsRedux]);

  //if two cards are showing, disable all cards from flipping
  useEffect(() => {
    if (currentFlipCount === 2) {
      setClickable(false);
    }
    if (flippedCardsRedux[0] && flippedCardsRedux[0].id === card.id) {
      setClickable(false);
      //prevents flipped card from matching with itself
    }
    if (currentFlipCount < 2 && timerActive) {
      setClickable(true);
    }
  }, [currentFlipCount, timerActive, flippedCardsRedux, card.id]);

  function clickHandler() {
    setCardRevealed(true);
    setClickable(false);
    dispatch(trackFlips(card));
    dispatch(incrementCurrentFlipCount());
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
