import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    user: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state) => {
            state.user = null
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        }
    }
});

export const { setTheme, setLogin, setLogout, setPosts } = authSlice.actions;
export default authSlice.reducer;