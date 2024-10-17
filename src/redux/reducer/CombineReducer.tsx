import {combineReducers} from 'redux';
import favoritesReducer from '../reducer/FavouriteReducer';
import AddToCartReducer from '../reducer/AddToCartReducer';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cart: AddToCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
