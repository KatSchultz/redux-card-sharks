import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Directions from "./components/Directions/Directions";
import GameBoard from "./components/GameBoard/GameBoard";
import Modal from "./components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import {
  matchIncrement,
  resetMatches,
  trackMatchedCards,
} from "./features/matches/matchSlice";
import { shuffleCards } from "./features/gameCards/gameCardsSlice";
import {
  resetFlipTracking,
  resetFlippedCards,
  incrementTotalMoveCount,
  resetCurrentFlipCount,
} from "./features/flippedCards/flippedCardsSlice";

function App() {
  const matchesRedux = useSelector((state: RootState) => state.matches.matches);
  const flippedCardsRedux = useSelector(
    (state: RootState) => state.flippedCards.flippedCards
  );
  const currentFlipCount = useSelector(
    (state: RootState) => state.flippedCards.currentFlipCount
  );
  const moveCount = useSelector(
    (state: RootState) => state.flippedCards.totalMoveCount
  );
  const dispatch = useDispatch();

  const [noMatchFlip, setNoMatchFlip] = useState(0);
  const startTime = 25;
  const [timer, setTimer] = useState(25);
  const [timerActive, setTimerActive] = useState(false);
  const [gameOverStatus, setGameOverStatus] = useState(false);
  const [winStatus, setWinStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const gameSize = 12;

  useEffect(() => {
    if (matchesRedux === gameSize / 2) {
      setWinStatus(true);
      setTimerActive(false);
      handleOpenModal();
    }
  }, [matchesRedux, gameSize]);

  useEffect(() => {
    if (timer === 0 && winStatus !== true) {
      setGameOverStatus(true);
      handleOpenModal();
    }
  }, [timer, winStatus]);

  useEffect(() => {
    if (currentFlipCount === 2) {
      matchCheck();
    }
  }, [currentFlipCount]);

  function matchCheck() {
    setTimeout(() => {
      if (flippedCardsRedux[0].name === flippedCardsRedux[1].name) {
        dispatch(matchIncrement(1));
        dispatch(trackMatchedCards(flippedCardsRedux[0].name));
      } else {
        setNoMatchFlip((prev) => prev + 1);
      }
      dispatch(resetCurrentFlipCount());
    }, 800);
    dispatch(resetFlippedCards());
    dispatch(incrementTotalMoveCount());
  }

  function startGame() {
    setGameOverStatus(false);
    setWinStatus(false);
    setTimer(startTime);
    dispatch(shuffleCards());
    dispatch(resetMatches());
    dispatch(resetFlipTracking());
    setNoMatchFlip(0);
  }

  function resetGame() {
    startGame();
    setTimerActive(true);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="App">
      <Modal
        modalDisplay={openModal}
        closeModal={handleCloseModal}
        winStatus={winStatus}
        timer={timer}
        moveCount={moveCount}
      />
      <Header />

      <div className="main-content">
        <Directions
          startGame={startGame}
          timerActive={timerActive}
          setTimerActive={setTimerActive}
          timer={timer}
          setTimer={setTimer}
          resetGame={resetGame}
        />
        <GameBoard
          noMatchFlip={noMatchFlip}
          timerActive={timerActive}
          gameOver={gameOverStatus}
        />
      </div>
    </div>
  );
}

export default App;
