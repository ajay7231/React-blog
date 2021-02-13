import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userData: null,
    searchInput: "tech",
    blogData: null,
    blogLanguage: "en",
    blogSortBy: "relevance",
  },
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setBlogLanguage: (state, action) => {
      state.blogLanguage = action.payload;
    },
    setBlogSortBy: (state, action) => {
      state.blogSortBy = action.payload;
    },
  },
});

export const {
  setSignedIn,
  setUserData,
  setSearchInput,
  setBlogData,
  setBlogLanguage,
  setBlogSortBy,
} = userSlice.actions;

export const selectSignedIn = (state) => state.user.isSignedIn;
export const selectUserData = (state) => state.user.userData;
export const selectUserInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;
export const selectBlogLanguage = (state) => state.user.blogLanguage;
export const selectBlogSortBy = (state) => state.user.blogSortBy;

export default userSlice.reducer;
