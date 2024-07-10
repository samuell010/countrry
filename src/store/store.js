import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";

export default configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
  },
});
