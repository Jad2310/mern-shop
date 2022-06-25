import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../cart/cartService";
interface Initial {
  cart: IProduct[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

interface ItemAddToCart {
  id: string;
  qty: number;
}

const initialState: Initial = {
  cart: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: ItemAddToCart, thunkAPI) => {
    const { id, qty } = product;
    try {
      return await cartService.addToCart(id, qty);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.isSuccess = false
      state.isError = false
      state.isLoading = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const item = action.payload;
        const existItem = state.cart.find((x) => x._id === item._id);

        if (existItem) {
          state.cart = state.cart.map((x) =>
            x._id === existItem._id ? item : x
          );
        } else {
          state.cart = [...state.cart, item];
        }
      });
  },
});

export const { resetCart } = cart.actions;
export default cart.reducer;
