import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
interface Slices<E> {
  product: E;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface Initial {
  products: Slices<IProduct[]>;
  product: Slices<IProduct | undefined>;
  top: Slices<IProduct[]>
}

const initialState: Initial = {
  products: {product: [], isError: false, isSuccess: false, isLoading: false, message:""},
  product: {product: undefined, isError: false, isSuccess: false, isLoading: false, message:"" },
  top: {product: [], isError: false, isSuccess: false, isLoading: false, message:""} ,
};

// Fetch all products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get product detail
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id: string, thunkAPI) => {
    try{
      return await productService.getProductDetails(id)
    } catch(error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

// Get top rated products
export const getTopProducts = createAsyncThunk(
  "product/getTop",
  async (_, thunkAPI) => {
    try {
      return await productService.getTopProducts()
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct: (_state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products.isLoading = false;
        state.products.isSuccess = true;
        state.products.product = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products.isLoading = false;
        state.products.isError = true;
        state.products.message = action.payload as string;
      })
      .addCase(getProductDetails.pending, (state) => {
        state.product.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.product.isLoading = false;
        state.product.isSuccess = true;
        state.product.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.product.isLoading = false;
        state.product.isError = true;
        state.product.message = action.payload as string;
      })
      .addCase(getTopProducts.pending, (state) => {
        state.top.isLoading = true;
      })
      .addCase(getTopProducts.fulfilled, (state, action) => {
        state.top.isLoading = false;
        state.top.isSuccess = true;
        state.top.product = action.payload;
      })
      .addCase(getTopProducts.rejected, (state, action) => {
        state.top.isLoading = false;
        state.top.isError = true;
        state.top.message = action.payload as string;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
