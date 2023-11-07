import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer
  },
});

export default appStore;
