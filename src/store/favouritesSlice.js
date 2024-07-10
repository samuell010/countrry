// Import necessary functions from Redux and Firebase
import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

// Define the initial state
const initialState = {
  favourites: [],
};

// Create the slice
const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

// Export the action creators
export const { setFavourites } = favouritesSlice.actions;

// Thunk to initialize favourites
export const initializeFavourites = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const db = getDatabase();
    const favRef = ref(db, `favourites/${user.uid}`);
    const snapshot = await get(favRef);
    if (snapshot.exists()) {
      const favs = snapshot.val();
      const favCountries = Object.keys(favs).filter(key => favs[key]);
      dispatch(setFavourites(favCountries));
    }
  }
};

// Export the reducer
export default favouritesSlice.reducer;
