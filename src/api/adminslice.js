import { createSlice } from '@reduxjs/toolkit';

const getAdminInfoFromStorage = () => {
  try {
    const storedAdminInfo = localStorage.getItem('adminInfo');
    return storedAdminInfo ? JSON.parse(storedAdminInfo) : null;
  } catch {
    return null;
  }
};

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch {
    return null;
  }
};

const initialState = {
  userInfo: getAdminInfoFromStorage(),
  token: getTokenFromStorage(),
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminToken: (state, action) => {
      state.token = action.payload;
      try {
        localStorage.setItem('token', action.payload);
      } catch (error) {
        console.error('Error storing token', error);
      }
    },

    setAdminInfo: (state, action) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('adminInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error storing admin info', error);
      }
    },

    clearAdminInfo: (state) => {
      state.userInfo = null;
      try {
        localStorage.removeItem('adminInfo');
      } catch (error) {
        console.error('Error removing admin info', error);
      }
    },

    clearAdminToken: (state) => {
      state.token = null;
      try {
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error removing token', error);
      }
    },

    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      try {
        localStorage.removeItem('adminInfo');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error during logout', error);
      }
    }
  },
});

export const { 
  setAdminToken, 
  setAdminInfo, 
  clearAdminInfo, 
  clearAdminToken,
  logout 
} = adminSlice.actions;

export default adminSlice.reducer;
