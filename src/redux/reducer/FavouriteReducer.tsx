import {createSlice} from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      // console.log('hhhhh', action);
      const item = action.payload;
      if (!state.favorites.find(fav => fav.id === item.id)) {
        state.favorites.push(item);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        fav => fav.id !== action.payload,
      );
    },
  },
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer;
