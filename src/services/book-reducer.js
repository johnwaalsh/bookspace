import {createSlice}
    from "@reduxjs/toolkit";
import {searchBooksThunk}
    from "./book-thunks";

const initialState = {
    books: [],
    loading: false
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    extraReducers: {
        [searchBooksThunk.pending]:
            (state) => {
                state.loading = true
                state.books = []
            },
        [searchBooksThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false
                state.books = payload
            }
    },
    reducers: { }
});

export default booksSlice.reducer;