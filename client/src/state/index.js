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
        },
        setPost: (state, action) => {
            // After user like the post
            const updatedPost = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post
                return post;
            });
            state.posts = updatedPost;
        },
        setFriends: (state, action) => {
            if(state.user)
                state.user.friends = action.payload.friends;
            else    
                console.error("User friends not exist");
        },
        setUpdatedProfile: (state, action) => {
            state.user = action.payload.user
        }
    }
});

export const { setTheme, setLogin, setLogout, setPosts, setPost, setFriends, setUpdatedProfile } = authSlice.actions;
export default authSlice.reducer;