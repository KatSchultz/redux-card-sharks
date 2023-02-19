import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Directions from "./components/Directions/Directions";
import GameBoard from "./components/GameBoard/GameBoard";
import { PlayingCard } from "./types";
import Modal from "./components/Modal/Modal";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Counter from "./features/counter/Counter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import { matchIncrement, reset } from "./features/matches/matchSlice";

function App() {
  const matchesRedux = useSelector((state: RootState) => state.matches.matches);
  const dispatch = useDispatch();

  const [activeCards, setActiveCards] = useState<PlayingCard[]>([
    { id: 1, name: "stingray", image: "/images/img-0.png" },
    { id: 2, name: "stingray", image: "/images/img-0.png" },
    { id: 3, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 4, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 5, name: "clownfish", image: "/images/img-2.png" },
    { id: 6, name: "clownfish", image: "/images/img-2.png" },
    { id: 7, name: "octopus", image: "/images/img-3.png" },
    { id: 8, name: "octopus", image: "/images/img-3.png" },
    { id: 9, name: "sea turtle", image: "/images/img-4.png" },
    { id: 10, name: "sea turtle", image: "/images/img-4.png" },
    { id: 11, name: "whale shark", image: "/images/img-5.png" },
    { id: 12, name: "whale shark", image: "/images/img-5.png" },
  ]);
  const [gameSize, setGameSize] = useState(12);
  const [flipCount, setFlipCount] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [flippedCards, setFlippedCards] = useState<PlayingCard[]>([]); // holds 2 active cards for comparison
  const [matches, setMatches] = useState(0);
  const [noMatchFlip, setNoMatchFlip] = useState(0);
  const [foundPairs, setFoundPairs] = useState<string[]>([]);
  const startTime = 25;
  const [timer, setTimer] = useState(25);
  const [timerActive, setTimerActive] = useState(false);
  const [gameOverStatus, setGameOverStatus] = useState(false);
  const [winStatus, setWinStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    setActiveCards(cards.slice(0, gameSize));
  }, [gameSize]);

  useEffect(() => {
    if (matchesRedux === gameSize / 2) {
      // if (matches === gameSize / 2) {
      setWinStatus(true);
      setTimerActive(false);
      handleOpenModal();
    }
  }, [matches, gameSize]);

  useEffect(() => {
    if (timer === 0 && winStatus !== true) {
      setGameOverStatus(true);
      handleOpenModal();
    }
  }, [timer, winStatus]);

  const cards = [
    { id: 1, name: "stingray", image: "/images/img-0.png" },
    { id: 2, name: "stingray", image: "/images/img-0.png" },
    { id: 3, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 4, name: "blue hippo tang", image: "/images/img-1.png" },
    { id: 5, name: "clownfish", image: "/images/img-2.png" },
    { id: 6, name: "clownfish", image: "/images/img-2.png" },
    { id: 7, name: "octopus", image: "/images/img-3.png" },
    { id: 8, name: "octopus", image: "/images/img-3.png" },
    { id: 9, name: "sea turtle", image: "/images/img-4.png" },
    { id: 10, name: "sea turtle", image: "/images/img-4.png" },
    { id: 11, name: "whale shark", image: "/images/img-5.png" },
    { id: 12, name: "whale shark", image: "/images/img-5.png" },
    { id: 13, name: "great white shark", image: "/images/img-6.png" },
    { id: 14, name: "great white shark", image: "/images/img-6.png" },
    { id: 15, name: "squid", image: "/images/img-7.png" },
    { id: 16, name: "squid", image: "/images/img-7.png" },
    { id: 17, name: "orca", image: "/images/img-8.png" },
    { id: 18, name: "orca", image: "/images/img-8.png" },
    { id: 19, name: "crab", image: "/images/img-9.png" },
    { id: 20, name: "crab", image: "/images/img-9.png" },
    { id: 21, name: "seahorse", image: "/images/img-10.png" },
    { id: 22, name: "seahorse", image: "/images/img-10.png" },
  ];

  function startGame() {
    setTimer(startTime);
    setGameCount((prev) => prev + 1);
    const cardArray = cards.slice(0, gameSize);
    const shuffledArray = justShuffle(cardArray);
    setActiveCards(shuffledArray);
    setGameOverStatus(false);
    setWinStatus(false);
    setFoundPairs([]);
    setFlippedCards([]);
    dispatch(reset(0));
    // setMatches(0);
    setNoMatchFlip(0);
    setFlipCount(0);
    setMoveCount(0);
  }

  function justShuffle(array: PlayingCard[]) {
    const clonedArray = array;
    const randomArray = [];
    for (let i = 0; i < gameSize; i++) {
      let randomIndex = Math.floor(Math.random() * clonedArray.length);
      randomArray.push(clonedArray[randomIndex]);
      clonedArray.splice(randomIndex, 1);
    }
    return randomArray;
  }

  function trackFlippedCards(card: PlayingCard) {
    setFlippedCards((prev: PlayingCard[]) => [...prev, card]);
  }
  //create card matching function

  function matchCheck() {
    setTimeout(() => {
      if (flippedCards[0].name === flippedCards[1].name) {
        dispatch(matchIncrement(1));
        // setMatches((prev) => prev + 1);
        setFoundPairs((prev) => [...prev, flippedCards[0].name]);
      } else {
        setNoMatchFlip((prev) => prev + 1);
      }
      setFlipCount(0);
    }, 800);
    setMoveCount((prev) => prev + 1);
    setFlippedCards([]);
  }

  flippedCards.length === 2 && matchCheck();

  function resetGame() {
    setGameOverStatus(false);
    startGame();
    setTimerActive(true);
    setGameCount((prev) => prev + 1);
  }

  // function winGame() {
  //   setWinStatus(true);
  //   //stop timer
  //   setTimerActive(false);
  //   //display modal
  //   handleOpenModal();
  //   //set all cards face down
  // }

  // function gameOver() {
  //   //turn all cards face down
  //   setGameOverStatus(true);
  //   handleOpenModal();
  // }

  function handleOpenModal() {
    setOpenModal(true);
  }
  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <div className="App">
      <Counter />
      <Modal
        modalDisplay={openModal}
        closeModal={handleCloseModal}
        winStatus={winStatus}
        timer={timer}
        moveCount={moveCount}
      />
      <Header />

      {/* <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      > */}
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
          cards={activeCards}
          flippedCards={flippedCards}
          trackFlips={trackFlippedCards}
          noMatchFlip={noMatchFlip}
          foundPairs={foundPairs}
          flipCount={flipCount}
          setFlipCount={setFlipCount}
          timerActive={timerActive}
          gameCount={gameCount}
          gameOver={gameOverStatus}
        />
        {/* </Container> */}
      </div>
    </div>
  );
}

export default App;
