import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewService from "./review-services";

export const createReviewThunk = createAsyncThunk(
    "review/create", async (review) => {
        const response = await reviewService.createReview(review);
        return response;
    }
);

export const getReviewsForBookThunk = createAsyncThunk(
    "review/book", async (book) => {
        const response = await reviewService.getReviewsForBook(book);
        return response;
    }
);

export const getAllReviewsThunk = createAsyncThunk(
    "review/all", async (book) => {
        const response = await reviewService.getAllReviews(book);
        return response;
    }
);

export const getReviewsForUserThunk = createAsyncThunk(
    "review/user", async (user) => {
        const response = await reviewService.getReviewsForUser(user);
        return response;
    }
);

export const editReviewThunk = createAsyncThunk(
    "review/edit", async (review) => {
        const response = await reviewService.editReview(review);
        return response;
    }
);

export const deleteReviewThunk = createAsyncThunk(
    "review/delete", async (review) => {
        const response = await reviewService.deleteReview(review);
        return response;
    }
);