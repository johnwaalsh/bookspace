import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const BOOKS_URL = `${SERVER_API_URL}/user-books`;

const api = axios.create({ withCredentials: true });

export const createUserBook = async (bookDetails) => {
    const response = await api.post(`${BOOKS_URL}/create/${bookDetails.id}`, bookDetails);
    return response.data;
};

export const getBooksForUser = async ({ user }) => {
    const response = await api.post(`${BOOKS_URL}/user`, {
        user,
    });
    return response.data;
};