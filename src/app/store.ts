import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "../features/matches/matchSlice";
import gameCardReducer from "../features/gameCards/gameCardsSlice";
import flippedCardsReducer from "../features/flippedCards/flippedCardsSlice";

export const store = configureStore({
  reducer: {
    matches: matchReducer,
    gameCards: gameCardReducer,
    flippedCards: flippedCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
