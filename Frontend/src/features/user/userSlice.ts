import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

interface Slice<E> {
  user: E;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface Initial {
  userLogin: Slice<IUser | null>;
  userRegister: Slice<IUser | null>;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

const initialState: Initial = {
  userLogin: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  userRegister: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (data: LoginData, thunkAPI) => {
    const { email, password } = data;
    try {
      return await userService.login(email, password);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (data: RegisterData, thunkAPI) => {
    const { name, email, password } = data;
    try {
      return await userService.register(name, email, password);
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLoginUser: (_state) => {
      initialState;
    },
    logout: (state) => {
      state.userLogin.user = null;
      state.userRegister.user = null;
      localStorage.removeItem("userInfo");
      document.location.href = "/login";
    },
    searchLocalStorage: (state) => {
      let local = localStorage.getItem("userInfo");
      if (local) {
        state.userLogin.user = JSON.parse(local);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.userLogin.isLoading = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.userLogin.isLoading = false;
        state.userLogin.isError = true;
        state.userLogin.message = action.payload as string;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userLogin.isLoading = false;
        state.userLogin.isSuccess = true;
        state.userLogin.user = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.userRegister.isLoading = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userRegister.isLoading = false;
        state.userRegister.isError = true;
        state.userRegister.message = action.payload as string;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.userRegister.isLoading = false;
        state.userRegister.isSuccess = true;
        state.userRegister.user = action.payload;
        state.userLogin.user = action.payload;
      });
  },
});

export const { resetLoginUser, logout, searchLocalStorage } = userSlice.actions;
export default userSlice.reducer;
