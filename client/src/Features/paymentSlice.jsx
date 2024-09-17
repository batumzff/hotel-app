import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientSecret: null,
  status: null,
  error: null,
  loading: false,
  error: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getPayments: (state, { payload }) => {
      state.clientSecret  = payload?.clientSecret;
      state.loading = false;
      state.error = false;
      // console.log(payload);
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchFail, getPayments } =
paymentSlice.actions;

export default paymentSlice.reducer;