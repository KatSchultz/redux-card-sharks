import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MatchState {
  matches: number;
}

const initialState: MatchState = {
  matches: 0,
};

export const matchSlice = createSlice({
  name: "matches",
  initialState,

  //reducers are actions
  reducers: {
    matchIncrement: (state, action: PayloadAction<number>) => {
      state.matches += action.payload;
    },
    reset: (state, action: PayloadAction<number>) => {
      state.matches = action.payload;
    },
  },
});

//Action creators are generated for each case reducer function
export const { matchIncrement, reset } = matchSlice.actions;

export default matchSlice.reducer;
