import { createAsyncThunk } from "@reduxjs/toolkit";
import * as createdServices from "./created-services";

export const getCreatedDetailsThunk = createAsyncThunk(
    "book/getCreatedDetails", async (bookDetails) => {
        const currentBookDetails = await createdServices.getBookCreatedDetails(bookDetails);
        return currentBookDetails;
    }
);

export const getBookIfExistsThunk = createAsyncThunk(
    "book/getCreatedDetails", async (bookDetails) => {
        const currentBookDetails = await createdServices.getBookIfExists(bookDetails);
        return currentBookDetails;
    }
);

export const updateBookThunk = createAsyncThunk(
    "book/update", async (bookDetails) => {
        const currentBookDetails = await createdServices.updateBook(bookDetails);
        return currentBookDetails;
    }
)