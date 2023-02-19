import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import matchReducer from "../features/matches/matchSlice";
import gameCardReducer from "../features/gameCards/gameCardsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    matches: matchReducer,
    gameCards: gameCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
