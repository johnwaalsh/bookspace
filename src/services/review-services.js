import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const REVIEW_URL = `${SERVER_API_URL}/reviews`;

const api = axios.create({ withCredentials: true });

export const createReview = async ({ book, title, author, rating, text }) => {
    const response = await api.post(`${REVIEW_URL}/create`, {
        book,
        title,
        author,
        rating,
        text
    });
    return response.data;
};

export const getReviewsForBook = async ({ id }) => {
    const response = await api.post(`${REVIEW_URL}/book`, {
        id,
    });
    return response.data;
};

export const getAllReviews = async () => {
    const response = await api.get(`${REVIEW_URL}/all`);
    return response.data;
};

export const getReviewsForUser = async ({ user }) => {
    const response = await api.post(`${REVIEW_URL}/user`, {
        user,
    });
    return response.data;
};

export const editReview = async ({ _id, book, author, rating, text }) => {
    const response = await api.put(`${REVIEW_URL}/${_id}`, {
        book,
        author,
        rating,
        text,
    });
    return response.data;
};

export const deleteReview = async ({ _id, book, author, rating, text }) => {
    const response = await api.put(`${REVIEW_URL}/delete/${_id}`, {
        book,
        author,
        rating,
        text,
    });
    return response;
};
