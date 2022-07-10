import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../cart/cartService";
interface Initial {
  cartElements: IProduct[];
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
  cartElements: [],
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

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string, thunkAPI) => {
    try {
      return await cartService.removeFromCart(id);
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
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
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
        const existItem = state.cartElements.find((x) => x._id === item._id);

        if (existItem) {
          state.cartElements = state.cartElements.map((x) =>
            x._id === existItem._id ? item : x
          );
        } else {
          state.cartElements = [...state.cartElements, item];
        }
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartElements = state.cartElements.filter(
          (x) => x._id !== action.payload._id
        );
      });
  },
});

export const { resetCart } = cart.actions;
export default cart.reducer;
