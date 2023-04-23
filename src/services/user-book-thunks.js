import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userBookServices from "./user-book-services";

export const createUserBookThunk = createAsyncThunk(
    "user-book/createbook", async (bookDetails) => {
        const currentBookDetails = await userBookServices.createUserBook(bookDetails);
        return currentBookDetails;
    }
);

export const getBooksForUserThunk = createAsyncThunk(
    "user-book/getbooks", async (user) => {
        console.log("in thunk")
        console.log(user)
        const response = await userBookServices.getBooksForUser(user);
        return response;
    }
);