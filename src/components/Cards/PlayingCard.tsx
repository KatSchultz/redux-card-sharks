import React, { useEffect, useState } from "react";
import "./PlayingCard.css";
import { PlayingCard } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  incrementCurrentFlipCount,
  trackFlips,
} from "../../features/flippedCards/flippedCardsSlice";

interface Props {
  card: PlayingCard;
  timerActive: boolean;
  gameOver: boolean;
}

export default function Card({ card, timerActive, gameOver }: Props) {
  const flippedCardsRedux = useSelector(
    (state: RootState) => state.flippedCards.flippedCards
  );
  const currentFlipCount = useSelector(
    (state: RootState) => state.flippedCards.currentFlipCount
  );
  const matchedCardsRedux = useSelector(
    (state: RootState) => state.matches.matchedCards
  );
  const noMatch = useSelector(
    (state: RootState) => state.flippedCards.noMatchCount
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
  }, [noMatch, gameOver]);

  //remove matching cards from board
  useEffect(() => {
    if (matchedCardsRedux.includes(card.name)) {
      setAlreadyMatched(true);
      setCardRevealed(false); // makes sure cards are face down on new game
    } else {
      setAlreadyMatched(false);
    }
  }, [card.name, matchedCardsRedux]);

  // when to disable card flipping
  useEffect(() => {
    if (currentFlipCount === 2) {
      setClickable(false);
    }
    if (currentFlipCount < 2 && timerActive) {
      setClickable(true);
    }
    if (flippedCardsRedux[0] && flippedCardsRedux[0].id === card.id) {
      setClickable(false);
      //prevents flipped card from matching with itself
    }
    if (!timerActive) setClickable(false);
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
  );
}
