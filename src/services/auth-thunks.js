import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
        return await authService.profile();
    });

export const publicProfileThunk = createAsyncThunk(
    "user/publicProfile", async (user) => {
        const publicUser = await authService.publicProfile(user);
        return publicUser;
    }
);

export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        return await authService.logout();
    });

export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async (user) => {
        await authService.updateUser(user);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "auth/register", async (credentials) => {
        const user = await authService.register(credentials);
        return user;
    }
);

export const registerCriticThunk = createAsyncThunk(
    "auth/registercritic", async (credentials) => {
        const user = await authService.registerCritic(credentials);
        return user;
    }
);

export const registerAuthorThunk = createAsyncThunk(
    "auth/registerauthor", async (credentials) => {
        const user = await authService.registerAuthor(credentials);
        return user;
    }
);

export const getCriticsForBookThunk = createAsyncThunk(
    "auth/getcritics", async (bookDetails) => {
        const response = await authService.getCriticsForBook(bookDetails);
        return response;
    }
)

export const getAllCriticsThunk = createAsyncThunk(
    "auth/getallcritics", async () => {
        const response = await authService.getAllCritics();
        return response;
    }
)