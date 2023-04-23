import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({ withCredentials: true });

export const login = async ({ username, password }) => {
    const response = await api.post(`${USERS_URL}/login`, {
        username,
        password,
    });
    const user = response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_URL}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.post(`${USERS_URL}/profile`);
    return response.data;
};

export const publicProfile = async (user) => {
    const response = await api.post(`${USERS_URL}/profile/${user.username}`, user);
    return response.data;
};

export const updateUser = async (user) => {
    console.log("updating user!");
    console.log(user);
    const response = await api.put(`${USERS_URL}/${user._id}`, user);
    return response.data;
};

export const register = async ({ username, password, firstname, lastname, email, favorites, currentlyReading, followers, following, reviews, role }) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username,
        password,
        firstname,
        lastname,
        email,
        favorites,
        currentlyReading,
        followers,
        following,
        reviews,
        role,
    });
    return response.data;
}

export const registerCritic = async ({ username, password, firstname, lastname, email, favorites, currentlyReading, followers, following, reviews, role, recommendation }) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username,
        password,
        firstname,
        lastname,
        email,
        favorites,
        currentlyReading,
        followers,
        following,
        reviews,
        role,
        recommendation,
    });
    return response.data;
}

export const registerAuthor = async ({ username, password, firstname, lastname, email, favorites, currentlyReading, followers, following, reviews, role, books }) => {
    const response = await api.post(`${USERS_URL}/register`, {
        username,
        password,
        firstname,
        lastname,
        email,
        favorites,
        currentlyReading,
        followers,
        following,
        reviews,
        role,
        books,
    });
    return response.data;
}

export const getCriticsForBook = async (bookDetails) => {
    const response = await api.get(`${USERS_URL}/critics/${bookDetails.id}`, {
        bookDetails
    });
    return response.data;
}

export const getAllCritics = async () => {
    const response = await api.get(`${USERS_URL}/critics`);
    return response.data;
}