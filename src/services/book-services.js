import axios from "axios";
const BOOK_SERVER_API_URL = "https://www.googleapis.com/books/v1/volumes"
const BOOK_API_KEY = process.env.REACT_APP_SP23_BOOK_API_KEY;

const api = axios.create({ });

export const searchBooks = async ({ query }) => {
    const response = await api.get(`${BOOK_SERVER_API_URL}?q=${query}&maxResults=20&key=${BOOK_API_KEY}`);
    const books = response.data.items;
    return books;
};

export const getBook = async ({ id }) => {
    const response = await api.get(`${BOOK_SERVER_API_URL}/${id}?key=${BOOK_API_KEY}`);
    const book = response.data;
    return book;
};