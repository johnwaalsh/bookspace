import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const getCreatedDetailsThunk = createAsyncThunk(
    "book/getCreatedDetails", async (bookDetails) => {
        const currentBookDetails = await authService.publicProfile(bookDetails);
        return currentBookDetails;
    }
);