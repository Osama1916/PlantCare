import {createSlice, createSelector} from '@reduxjs/toolkit';

// Create the slice
export const AddToCartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      const item = {...action.payload}; // Create a new copy of the item
      const itemIndex = state.cart.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (itemIndex === -1) {
        item.quantity = 1;
        state.cart.push(item);
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const {id, quantity} = action.payload;
      const itemIndex = state.cart.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        state.cart[itemIndex].quantity = quantity;
      }
      //   else {
      //     // Optional: Update quantity if item already exists
      //     state.cart[itemIndex].quantity += 1;
      //   }
    },
  },
});

// Selector to get cart items from the state
export const selectCartItems = state => state.cart.cart;

// Selector to calculate total price
export const selectTotalPrice = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace('$', '')) * item.quantity,
    0,
  ),
);

// Export actions and reducer
export const {addToCart, removeFromCart, updateQuantity} =
  AddToCartSlice.actions;
export default AddToCartSlice.reducer;
