import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const BOOKS_URL = `${SERVER_API_URL}/books`;

const api = axios.create({ withCredentials: true });

export const getBookCreatedDetails = async (bookDetails) => {
    const response = await api.post(`${BOOKS_URL}/${bookDetails.id}`, bookDetails);
    return response.data;
};

export const getBookIfExists = async (bookDetails) => {
    const response = await api.get(`${BOOKS_URL}/${bookDetails.id}`, bookDetails);
    return response.data;
};

export const updateBook = async (bookDetails) => {
    const response = await api.put(`${BOOKS_URL}/${bookDetails.id}`, bookDetails);
    return response.data;
};