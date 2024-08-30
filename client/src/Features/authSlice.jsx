import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart:(state) => {
        state.loading = true
        state.error = false
    },

    registerSuccess: (state, { payload }) => {
        state.user = {
            ...state.user, payload
        }
        state.loading = false
        state.error = false
    },

    loginSuccess: (state, { payload }) => {
        state.user = {
            ...state.user, 
        username: payload.user.username,
        firstName: payload.user.firstName,
        lastName: payload.user.lastName,
        image: payload.user.image,
        email: payload.user.email,
            
        },
        state.loading = false
        state.error = false
    },

    logoutSuccess: (state) => {
        state.user = {}
        state.token = ""
        state.loading = false
        state.error = false
    },

    fetchFail: (state) => {
        state.loading = false
        state.error = true
    }

  },
});

export const { fetchStart, fetchFail, registerSuccess, loginSuccess, logoutSuccess  } = authSlice.actions

export default authSlice.reducer