import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
    mobContent: "posts",
    user: null,
    posts: [],
    group: null,
    groupPosts: []
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
        },
        setMobContent: (state, action) => {
            state.mobContent = action.payload.mobContent
        }, 
        setGroup: (state, action) => {
            state.group = action.payload;
        },
        setGroupMembers: (state, action) => {
            state.group.members = action.payload;
        }
    }
});

export const { setTheme, setLogin, setLogout, setPosts, setPost, setFriends, setUpdatedProfile, setMobContent, setGroup, setGroupMembers } = authSlice.actions;
export default authSlice.reducer;