import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookService from "./book-services";

export const searchBooksThunk = createAsyncThunk(
    "book/search", async (query) => {
        const results = await bookService.searchBooks(query);
        return results;
    }
);

export const getBookThunk = createAsyncThunk(
    "book/get", async (id) => {
        const results = await bookService.getBook(id);
        return results;
    }
);