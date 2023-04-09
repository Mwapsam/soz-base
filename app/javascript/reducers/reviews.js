import { createSlice } from "@reduxjs/toolkit";
import { fetchReviews, addReview } from "../services/review.service";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
      reviews: [],
      isFetching: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    },
    extraReducers: {
      [fetchReviews.fulfilled]: (state, { payload }) => {
          state.reviews = payload;
          state.isFetching = false;
          state.isSuccess = true;
          return state;
      },
      [fetchReviews.rejected]: (state, { payload }) => {
          state.isFetching = false;
          state.isError = true;
          // state.errorMessage = payload.error;
      },
      [fetchReviews.pending]: (state) => {
          state.isFetching = true;
      },
    },
  })

  export default reviewsSlice;