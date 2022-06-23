import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import productDetailsReducer from "../features/products/productDetailsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
