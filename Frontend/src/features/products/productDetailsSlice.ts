import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productDetailsService";
//import { RootState, AppThunk } from "../../app/store";

interface Initial {
  product: IProduct | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: Initial = {
  product: undefined,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Fetch single product
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: string, thunkAPI) => {
    try {
      return await productService.getProductById(id);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const product= createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (_state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { resetProduct} = product.actions;
export default product.reducer;
