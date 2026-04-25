import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    role: 'RIDER', // Default role
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
